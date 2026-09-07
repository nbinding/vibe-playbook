// Client-side only: builds a README + /docs bundle from whatever is saved
// in localStorage and hands the user a .zip via a normal browser download.
// No network request, no server, no GitHub account required.

import JSZip from "jszip";
import type { StepDoc } from "./steps";
import { getAllDocs, getProjectMeta } from "./storage";

function slugifyProjectName(name: string): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || "vibe-project";
}

export function buildReadme(steps: StepDoc[]): string {
	const docs = getAllDocs();
	const meta = getProjectMeta();
	const name = meta.name.trim() || "Untitled Project";
	const pitchDoc = docs["02-idea-and-pitch"];

	const lines: string[] = [
		`# ${name}`,
		"",
		"_Built with the [Vibe Coding Playbook](https://nbinding.github.io/vibe-playbook/)._",
		"",
	];

	if (pitchDoc?.content) {
		lines.push(pitchDoc.content.trim(), "");
	}

	const saved = steps.filter((s) => docs[s.id]?.content);
	if (saved.length) {
		lines.push("## Docs", "");
		for (const step of saved) {
			lines.push(`- [${step.title}](docs/${step.fileName})`);
		}
		lines.push("");
	}

	return lines.join("\n");
}

export function countSavedDocs(steps: StepDoc[]): number {
	const docs = getAllDocs();
	return steps.filter((s) => docs[s.id]?.content).length;
}

export async function exportZip(steps: StepDoc[]): Promise<void> {
	const docs = getAllDocs();
	const meta = getProjectMeta();
	const zip = new JSZip();

	zip.file("README.md", buildReadme(steps));
	const docsFolder = zip.folder("docs");
	if (docsFolder) {
		for (const step of steps) {
			const saved = docs[step.id];
			if (saved?.content) {
				docsFolder.file(step.fileName, saved.content);
			}
		}
	}

	const blob = await zip.generateAsync({ type: "blob" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${slugifyProjectName(meta.name)}.zip`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
