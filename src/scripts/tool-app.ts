import type { StepDoc } from "../lib/steps";
import { draftDocument, ProviderError, type Provider } from "../lib/providers";
import {
	getSettings,
	saveSettings,
	getDoc,
	saveDoc,
	getProjectMeta,
	saveProjectMeta,
	clearEverything,
} from "../lib/storage";
import { buildUserPrompt } from "../lib/prompt";
import { exportZip, countSavedDocs } from "../lib/export";

const STEPS: StepDoc[] = JSON.parse(
	document.getElementById("steps-data")!.textContent ?? "[]",
);

// import.meta.env.BASE_URL isn't guaranteed to carry a trailing slash — normalize it.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

const el = {
	settingsToggle: document.getElementById("settings-toggle") as HTMLButtonElement,
	settingsPanel: document.getElementById("settings-panel") as HTMLDivElement,
	projectName: document.getElementById("project-name") as HTMLInputElement,
	providerSelect: document.getElementById("provider-select") as HTMLSelectElement,
	apiKey: document.getElementById("api-key") as HTMLInputElement,
	modelInput: document.getElementById("model-input") as HTMLInputElement,
	clearData: document.getElementById("clear-data") as HTMLButtonElement,
	stepList: document.getElementById("step-list") as HTMLElement,
	stepTitle: document.getElementById("step-title") as HTMLHeadingElement,
	stepReadmore: document.getElementById("step-readmore") as HTMLAnchorElement,
	contextNote: document.getElementById("step-context-note") as HTMLParagraphElement,
	notesLabel: document.getElementById("notes-label") as HTMLLabelElement,
	notesInput: document.getElementById("notes-input") as HTMLTextAreaElement,
	draftBtn: document.getElementById("draft-btn") as HTMLButtonElement,
	draftStatus: document.getElementById("draft-status") as HTMLSpanElement,
	docEditor: document.getElementById("doc-editor") as HTMLTextAreaElement,
	saveBtn: document.getElementById("save-btn") as HTMLButtonElement,
	resetBtn: document.getElementById("reset-btn") as HTMLButtonElement,
	saveStatus: document.getElementById("save-status") as HTMLSpanElement,
	exportBtn: document.getElementById("export-btn") as HTMLButtonElement,
	exportSummary: document.getElementById("export-summary") as HTMLSpanElement,
};

let currentStepId = STEPS[0]?.id;

function getStep(id: string): StepDoc {
	const step = STEPS.find((s) => s.id === id);
	if (!step) throw new Error(`Unknown step: ${id}`);
	return step;
}

function getPreviousStep(step: StepDoc): StepDoc | undefined {
	if (step.order === 0) return undefined;
	return STEPS.find((s) => s.order === step.order - 1);
}

function renderStepList(): void {
	el.stepList.innerHTML = "";
	for (const step of STEPS) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.dataset.stepId = step.id;
		btn.setAttribute("aria-current", String(step.id === currentStepId));

		const dot = document.createElement("span");
		dot.className = "step-dot" + (getDoc(step.id) ? " saved" : "");
		btn.appendChild(dot);
		btn.appendChild(document.createTextNode(step.title));

		btn.addEventListener("click", () => selectStep(step.id));
		el.stepList.appendChild(btn);
	}
}

function renderExportSummary(): void {
	el.exportSummary.textContent = `${countSavedDocs(STEPS)} of ${STEPS.length} documents saved`;
}

function renderStep(): void {
	const step = getStep(currentStepId);
	const previous = getPreviousStep(step);
	const previousDoc = previous ? getDoc(previous.id) : undefined;

	el.stepTitle.textContent = step.title;
	el.stepReadmore.href = `${BASE}${step.pageSlug}/`;

	if (!previous) {
		el.contextNote.textContent =
			"This is the first document — there's nothing to chain from yet.";
		el.notesLabel.textContent = "Your raw idea";
		el.notesInput.placeholder = "Describe your idea in a few sentences";
	} else if (previousDoc?.content) {
		el.contextNote.textContent = `Using "${previous.title}" as context for the draft.`;
		el.notesLabel.textContent = "Additional notes (optional)";
		el.notesInput.placeholder = "Anything you want the AI to know before drafting this step";
	} else {
		el.contextNote.textContent = `"${previous.title}" hasn't been saved yet — drafting will skip that context.`;
		el.notesLabel.textContent = "Additional notes (optional)";
		el.notesInput.placeholder = "Anything you want the AI to know before drafting this step";
	}

	const saved = getDoc(step.id);
	el.docEditor.value = saved?.content ?? step.template;
	el.saveStatus.textContent = saved ? `Saved ${formatRelativeTime(saved.savedAt)}` : "Not saved yet";
	el.saveStatus.classList.remove("error");
	el.draftStatus.textContent = "";
	el.draftStatus.classList.remove("error");
	el.notesInput.value = "";

	for (const btn of el.stepList.querySelectorAll("button")) {
		btn.setAttribute("aria-current", String(btn.dataset.stepId === currentStepId));
	}
}

function formatRelativeTime(iso: string): string {
	const diffMs = Date.now() - new Date(iso).getTime();
	const minutes = Math.round(diffMs / 60000);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return new Date(iso).toLocaleDateString();
}

function selectStep(id: string): void {
	currentStepId = id;
	renderStep();
}

function loadSettingsIntoForm(): void {
	const settings = getSettings();
	el.providerSelect.value = settings.provider;
	el.apiKey.value = settings.apiKey;
	el.modelInput.value = settings.model;
	el.projectName.value = getProjectMeta().name;
}

function persistSettingsFromForm(): void {
	saveSettings({
		provider: el.providerSelect.value as Provider,
		apiKey: el.apiKey.value,
		model: el.modelInput.value,
	});
}

el.settingsToggle.addEventListener("click", () => {
	el.settingsPanel.hidden = !el.settingsPanel.hidden;
});

for (const input of [el.providerSelect, el.apiKey, el.modelInput]) {
	input.addEventListener("change", persistSettingsFromForm);
}
el.apiKey.addEventListener("input", persistSettingsFromForm);
el.modelInput.addEventListener("input", persistSettingsFromForm);

el.projectName.addEventListener("input", () => {
	saveProjectMeta({ name: el.projectName.value });
	renderStep();
});

el.clearData.addEventListener("click", () => {
	if (!confirm("Clear every saved document and setting from this browser? This can't be undone.")) {
		return;
	}
	clearEverything();
	location.reload();
});

el.draftBtn.addEventListener("click", async () => {
	const step = getStep(currentStepId);
	const settings = getSettings();

	if (!settings.apiKey.trim()) {
		el.draftStatus.textContent = "Add an API key in Settings first.";
		el.draftStatus.classList.add("error");
		el.settingsPanel.hidden = false;
		return;
	}

	const hasExistingContent = el.docEditor.value.trim() && el.docEditor.value !== step.template;
	if (hasExistingContent && !confirm("This will replace the current text in the document box. Continue?")) {
		return;
	}

	const previous = getPreviousStep(step);
	const previousDoc = previous ? getDoc(previous.id) : undefined;
	const prompt = buildUserPrompt(step, previousDoc, previous?.fileName, el.notesInput.value);

	el.draftBtn.disabled = true;
	el.draftStatus.textContent = "Drafting…";
	el.draftStatus.classList.remove("error");

	try {
		const draft = await draftDocument(settings, prompt);
		el.docEditor.value = draft;
		el.draftStatus.textContent = "Drafted — review it, then Save.";
	} catch (err) {
		el.draftStatus.textContent = err instanceof ProviderError ? err.message : "Something went wrong.";
		el.draftStatus.classList.add("error");
	} finally {
		el.draftBtn.disabled = false;
	}
});

el.saveBtn.addEventListener("click", () => {
	saveDoc(currentStepId, el.docEditor.value);
	el.saveStatus.textContent = "Saved just now";
	el.saveStatus.classList.remove("error");
	renderStepList();
	renderExportSummary();
});

el.resetBtn.addEventListener("click", () => {
	const step = getStep(currentStepId);
	if (!confirm("Reset this document back to the blank template? Unsaved changes will be lost.")) {
		return;
	}
	el.docEditor.value = step.template;
});

el.exportBtn.addEventListener("click", () => {
	void exportZip(STEPS);
});

loadSettingsIntoForm();
renderStepList();
renderExportSummary();
renderStep();
