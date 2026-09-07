// Everything here lives in the browser's localStorage only. Nothing is
// sent anywhere except when the user explicitly triggers a draft (straight
// to the model provider) or an export (straight to their own downloads /
// GitHub account). Clearing site data removes it completely.

import type { Provider } from "./providers";

const KEYS = {
	settings: "vibe-spec:settings",
	docs: "vibe-spec:docs",
	project: "vibe-spec:project",
} as const;

export interface Settings {
	provider: Provider;
	apiKey: string;
	model: string;
}

export interface SavedDoc {
	content: string;
	savedAt: string;
}

export interface ProjectMeta {
	name: string;
}

function readJSON<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function writeJSON(key: string, value: unknown): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage unavailable (private browsing, quota, etc.) — fail silently,
		// the UI still works for the current session.
	}
}

export function getSettings(): Settings {
	return readJSON<Settings>(KEYS.settings, { provider: "claude", apiKey: "", model: "" });
}

export function saveSettings(settings: Settings): void {
	writeJSON(KEYS.settings, settings);
}

export function getAllDocs(): Record<string, SavedDoc> {
	return readJSON<Record<string, SavedDoc>>(KEYS.docs, {});
}

export function getDoc(stepId: string): SavedDoc | undefined {
	return getAllDocs()[stepId];
}

export function saveDoc(stepId: string, content: string): void {
	const all = getAllDocs();
	all[stepId] = { content, savedAt: new Date().toISOString() };
	writeJSON(KEYS.docs, all);
}

export function clearDoc(stepId: string): void {
	const all = getAllDocs();
	delete all[stepId];
	writeJSON(KEYS.docs, all);
}

export function getProjectMeta(): ProjectMeta {
	return readJSON<ProjectMeta>(KEYS.project, { name: "" });
}

export function saveProjectMeta(meta: ProjectMeta): void {
	writeJSON(KEYS.project, meta);
}

export function clearEverything(): void {
	try {
		localStorage.removeItem(KEYS.settings);
		localStorage.removeItem(KEYS.docs);
		localStorage.removeItem(KEYS.project);
	} catch {
		// ignore
	}
}
