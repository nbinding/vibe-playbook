// Client-side only. Every function here calls the provider's API directly
// from the browser using a key the user supplies — nothing is sent to, or
// stored by, any server this project runs. See the Settings panel copy in
// tool-app.ts for what to tell users about that trust model.

export type Provider = "claude" | "openrouter";

export interface ProviderSettings {
	provider: Provider;
	apiKey: string;
	model: string;
}

export const DEFAULT_MODEL: Record<Provider, string> = {
	claude: "claude-sonnet-5",
	openrouter: "openrouter/auto",
};

const SYSTEM_PROMPT =
	"You are helping someone fill in a lightweight product-development template. " +
	"Output ONLY the completed markdown document, following the section headings " +
	"in the template you're given as closely as possible. Do not include any " +
	"preamble, sign-off, or commentary outside the document itself.";

export class ProviderError extends Error {}

/** A callback fired with the full text drafted so far, each time more arrives. */
export type OnChunk = (textSoFar: string) => void;

/** Parses a `text/event-stream` response body into raw `data: ...` payloads. */
async function* sseEvents(res: Response): AsyncGenerator<string> {
	const reader = res.body?.getReader();
	if (!reader) return;
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const events = buffer.split("\n\n");
		buffer = events.pop() ?? "";
		for (const event of events) {
			for (const line of event.split("\n")) {
				if (line.startsWith("data:")) {
					yield line.slice(5).trim();
				}
			}
		}
	}
}

async function readErrorMessage(res: Response, fallback: string): Promise<string> {
	const data = await res.json().catch(() => null);
	return data?.error?.message || fallback;
}

async function callClaude(
	settings: ProviderSettings,
	userPrompt: string,
	onChunk: OnChunk,
): Promise<string> {
	const res = await fetch("https://api.anthropic.com/v1/messages", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-api-key": settings.apiKey,
			"anthropic-version": "2023-06-01",
			"anthropic-dangerous-direct-browser-access": "true",
		},
		body: JSON.stringify({
			model: settings.model || DEFAULT_MODEL.claude,
			max_tokens: 4096,
			system: SYSTEM_PROMPT,
			messages: [{ role: "user", content: userPrompt }],
			stream: true,
		}),
	});

	if (!res.ok) {
		throw new ProviderError(await readErrorMessage(res, `Claude API request failed (${res.status})`));
	}

	let text = "";
	for await (const payload of sseEvents(res)) {
		const event = JSON.parse(payload);
		if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
			text += event.delta.text;
			onChunk(text);
		} else if (event.type === "error") {
			throw new ProviderError(event.error?.message ?? "Claude returned an error mid-stream.");
		}
	}
	if (!text) throw new ProviderError("Claude returned an empty response.");
	return text;
}

async function callOpenRouter(
	settings: ProviderSettings,
	userPrompt: string,
	onChunk: OnChunk,
): Promise<string> {
	const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${settings.apiKey}`,
			"HTTP-Referer": typeof location !== "undefined" ? location.origin : "",
			"X-Title": "Vibe Coding Playbook",
		},
		body: JSON.stringify({
			model: settings.model || DEFAULT_MODEL.openrouter,
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{ role: "user", content: userPrompt },
			],
			stream: true,
		}),
	});

	if (!res.ok) {
		throw new ProviderError(
			await readErrorMessage(res, `OpenRouter request failed (${res.status})`),
		);
	}

	let text = "";
	for await (const payload of sseEvents(res)) {
		if (payload === "[DONE]") break;
		const event = JSON.parse(payload);
		const delta = event.choices?.[0]?.delta?.content;
		if (delta) {
			text += delta;
			onChunk(text);
		}
	}
	if (!text) throw new ProviderError("OpenRouter returned an empty response.");
	return text;
}

export async function draftDocument(
	settings: ProviderSettings,
	userPrompt: string,
	onChunk: OnChunk,
): Promise<string> {
	if (!settings.apiKey.trim()) {
		throw new ProviderError("Add an API key in Settings first.");
	}
	switch (settings.provider) {
		case "claude":
			return callClaude(settings, userPrompt, onChunk);
		case "openrouter":
			return callOpenRouter(settings, userPrompt, onChunk);
	}
}
