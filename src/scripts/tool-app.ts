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
	settingsBackdrop: document.getElementById("settings-backdrop") as HTMLDivElement,
	settingsClose: document.getElementById("settings-close") as HTMLButtonElement,
	projectName: document.getElementById("project-name") as HTMLInputElement,
	providerSelect: document.getElementById("provider-select") as HTMLSelectElement,
	apiKey: document.getElementById("api-key") as HTMLInputElement,
	modelInput: document.getElementById("model-input") as HTMLInputElement,
	clearData: document.getElementById("clear-data") as HTMLButtonElement,
	stepList: document.getElementById("step-list") as HTMLElement,
	progressFill: document.getElementById("progress-fill") as HTMLDivElement,
	progressLabel: document.getElementById("progress-label") as HTMLParagraphElement,
	stepTitle: document.getElementById("step-title") as HTMLHeadingElement,
	stepReadmore: document.getElementById("step-readmore") as HTMLAnchorElement,
	contextNote: document.getElementById("step-context-note") as HTMLParagraphElement,
	notesLabel: document.getElementById("notes-label") as HTMLLabelElement,
	notesInput: document.getElementById("notes-input") as HTMLTextAreaElement,
	draftBtn: document.getElementById("draft-btn") as HTMLButtonElement,
	draftBtnLabel: document.getElementById("draft-btn-label") as HTMLSpanElement,
	draftStatus: document.getElementById("draft-status") as HTMLSpanElement,
	draftProgress: document.getElementById("draft-progress") as HTMLDivElement,
	docEditor: document.getElementById("doc-editor") as HTMLTextAreaElement,
	saveBtn: document.getElementById("save-btn") as HTMLButtonElement,
	resetBtn: document.getElementById("reset-btn") as HTMLButtonElement,
	saveStatus: document.getElementById("save-status") as HTMLSpanElement,
	prevBtn: document.getElementById("prev-step-btn") as HTMLButtonElement,
	nextBtn: document.getElementById("next-step-btn") as HTMLButtonElement,
	stepperPosition: document.getElementById("stepper-position") as HTMLSpanElement,
	exportBtn: document.getElementById("export-btn") as HTMLButtonElement,
	exportSummary: document.getElementById("export-summary") as HTMLSpanElement,
};

let currentStepId = STEPS[0]?.id;
let isDrafting = false;

function getStep(id: string): StepDoc {
	const step = STEPS.find((s) => s.id === id);
	if (!step) throw new Error(`Unknown step: ${id}`);
	return step;
}

function getPreviousStep(step: StepDoc): StepDoc | undefined {
	if (step.order === 0) return undefined;
	return STEPS.find((s) => s.order === step.order - 1);
}

function getNextStep(step: StepDoc): StepDoc | undefined {
	return STEPS.find((s) => s.order === step.order + 1);
}

/** Saves whatever's currently in the editor for the given step, silently (no status text change). */
function silentSave(stepId: string): void {
	saveDoc(stepId, el.docEditor.value);
	renderStepList();
	renderExportSummary();
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

		btn.addEventListener("click", () => goToStep(step.id, { saveCurrent: true }));
		el.stepList.appendChild(btn);
	}
}

function renderExportSummary(): void {
	el.exportSummary.textContent = `${countSavedDocs(STEPS)} of ${STEPS.length} documents saved`;
}

function renderStep(): void {
	const step = getStep(currentStepId);
	const previous = getPreviousStep(step);
	const next = getNextStep(step);
	const previousDoc = previous ? getDoc(previous.id) : undefined;

	el.progressFill.style.width = `${(step.order / (STEPS.length - 1)) * 100}%`;
	el.progressLabel.textContent = `Step ${step.order + 1} of ${STEPS.length}`;
	el.stepperPosition.textContent = `${step.order + 1} / ${STEPS.length}`;
	el.prevBtn.disabled = !previous;
	el.nextBtn.disabled = !next;
	el.nextBtn.textContent = next ? "Next ▶" : "That's the last step ✓";

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

function goToStep(id: string, options: { saveCurrent: boolean }): void {
	if (isDrafting) return;
	if (options.saveCurrent) silentSave(currentStepId);
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

function openSettings(): void {
	el.settingsPanel.classList.add("open");
	el.settingsBackdrop.classList.add("open");
	el.settingsPanel.inert = false;
	el.settingsToggle.setAttribute("aria-expanded", "true");
}

function closeSettings(): void {
	el.settingsPanel.classList.remove("open");
	el.settingsBackdrop.classList.remove("open");
	el.settingsPanel.inert = true;
	el.settingsToggle.setAttribute("aria-expanded", "false");
}

el.settingsPanel.inert = true;

el.settingsToggle.addEventListener("click", () => {
	if (el.settingsPanel.classList.contains("open")) closeSettings();
	else openSettings();
});
el.settingsClose.addEventListener("click", closeSettings);
el.settingsBackdrop.addEventListener("click", closeSettings);
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && el.settingsPanel.classList.contains("open")) closeSettings();
});

for (const input of [el.providerSelect, el.apiKey, el.modelInput]) {
	input.addEventListener("change", persistSettingsFromForm);
}
el.apiKey.addEventListener("input", persistSettingsFromForm);
el.modelInput.addEventListener("input", persistSettingsFromForm);

el.projectName.addEventListener("input", () => {
	saveProjectMeta({ name: el.projectName.value });
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
		openSettings();
		return;
	}

	const hasExistingContent = el.docEditor.value.trim() && el.docEditor.value !== step.template;
	if (hasExistingContent && !confirm("This will replace the current text in the document box. Continue?")) {
		return;
	}

	const previous = getPreviousStep(step);
	const previousDoc = previous ? getDoc(previous.id) : undefined;
	const prompt = buildUserPrompt(step, previousDoc, previous?.fileName, el.notesInput.value);
	const draftingForStep = currentStepId;

	isDrafting = true;
	el.draftBtn.disabled = true;
	el.saveBtn.disabled = true;
	el.resetBtn.disabled = true;
	el.prevBtn.disabled = true;
	el.nextBtn.disabled = true;
	el.draftBtnLabel.textContent = "Drafting…";
	el.draftStatus.textContent = "Waking up the model…";
	el.draftStatus.classList.remove("error");
	el.draftProgress.hidden = false;
	el.docEditor.classList.add("drafting");
	el.docEditor.readOnly = true;
	el.docEditor.value = "";

	try {
		const draft = await draftDocument(settings, prompt, (partial) => {
			if (currentStepId !== draftingForStep) return; // user navigated away mid-stream
			el.docEditor.value = partial;
			el.docEditor.scrollTop = el.docEditor.scrollHeight;
			el.draftStatus.textContent = `Drafting… ${partial.length.toLocaleString()} characters so far`;
		});
		if (currentStepId === draftingForStep) {
			el.docEditor.value = draft;
			el.draftStatus.textContent = "Drafted — review it, then Save.";
		}
	} catch (err) {
		if (currentStepId === draftingForStep) {
			el.draftStatus.textContent = err instanceof ProviderError ? err.message : "Something went wrong.";
			el.draftStatus.classList.add("error");
		}
	} finally {
		isDrafting = false;
		el.draftBtn.disabled = false;
		el.saveBtn.disabled = false;
		el.resetBtn.disabled = false;
		el.draftBtnLabel.textContent = "Draft with AI";
		el.draftProgress.hidden = true;
		el.docEditor.classList.remove("drafting");
		el.docEditor.readOnly = false;
		const step = getStep(currentStepId);
		el.prevBtn.disabled = !getPreviousStep(step);
		el.nextBtn.disabled = !getNextStep(step);
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

el.prevBtn.addEventListener("click", () => {
	const previous = getPreviousStep(getStep(currentStepId));
	if (previous) goToStep(previous.id, { saveCurrent: true });
});

el.nextBtn.addEventListener("click", () => {
	const next = getNextStep(getStep(currentStepId));
	if (next) goToStep(next.id, { saveCurrent: true });
});

el.exportBtn.addEventListener("click", () => {
	void exportZip(STEPS);
});

loadSettingsIntoForm();
renderStepList();
renderExportSummary();
renderStep();
