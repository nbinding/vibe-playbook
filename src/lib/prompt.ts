import type { StepDoc } from "./steps";
import type { SavedDoc } from "./storage";

/**
 * Combines a step's LLM prompt with the previous step's saved document (if
 * any) and free-form notes from the user, into the single user message sent
 * to the model provider.
 */
export function buildUserPrompt(
	step: StepDoc,
	previousDoc: SavedDoc | undefined,
	previousFileName: string | undefined,
	notes: string,
): string {
	const parts = [step.prompt.trim()];

	if (previousDoc?.content && previousFileName) {
		parts.push(
			`---\n\nHere is the previous step's document (\`${previousFileName}\`) to use as context:\n\n${previousDoc.content.trim()}`,
		);
	}

	if (notes.trim()) {
		parts.push(`---\n\nAdditional notes from me:\n\n${notes.trim()}`);
	}

	return parts.join("\n\n");
}
