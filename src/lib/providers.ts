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

async function callClaude(settings: ProviderSettings, userPrompt: string): Promise<string> {
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
		}),
	});

	const data = await res.json().catch(() => null);
	if (!res.ok) {
		const message = data?.error?.message || `Claude API request failed (${res.status})`;
		throw new ProviderError(message);
	}
	const text = (data?.content ?? [])
		.filter((block: { type: string }) => block.type === "text")
		.map((block: { text: string }) => block.text)
		.join("\n");
	if (!text) throw new ProviderError("Claude returned an empty response.");
	return text;
}

async function callOpenRouter(settings: ProviderSettings, userPrompt: string): Promise<string> {
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
		}),
	});

	const data = await res.json().catch(() => null);
	if (!res.ok) {
		const message = data?.error?.message || `OpenRouter request failed (${res.status})`;
		throw new ProviderError(message);
	}
	const text = data?.choices?.[0]?.message?.content;
	if (!text) throw new ProviderError("OpenRouter returned an empty response.");
	return text;
}

export async function draftDocument(
	settings: ProviderSettings,
	userPrompt: string,
): Promise<string> {
	if (!settings.apiKey.trim()) {
		throw new ProviderError("Add an API key in Settings first.");
	}
	switch (settings.provider) {
		case "claude":
			return callClaude(settings, userPrompt);
		case "openrouter":
			return callOpenRouter(settings, userPrompt);
	}
}
