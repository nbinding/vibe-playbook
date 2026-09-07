/**
 * A single fillable document in the playbook (e.g. "01-problem-opportunity",
 * or one of the four sub-documents inside 06-full-build: "06a-prd" etc).
 * Parsed at build time from the docs content so the tool and the docs site
 * can never drift out of sync — this file is not hand-authored data.
 */
export interface StepDoc {
	/** e.g. "06a-prd" — matches the output filename without extension */
	id: string;
	/** Output filename inside the generated /docs folder, e.g. "06a-prd.md" */
	fileName: string;
	/** e.g. "6a · Product requirements (PRD)" or "03 · UX" */
	title: string;
	/** The blank fill-in template, exactly as shown on the docs site */
	template: string;
	/** The LLM prompt that drafts this document from prior context */
	prompt: string;
	/** Path to the docs page this came from, for a "read more" link */
	pageSlug: string;
	/** Position in the overall chain (0-based) */
	order: number;
}

// Resolved and inlined by Vite at build time — independent of where the
// compiled module ends up on disk, unlike a node:fs + import.meta.url path.
const PLAYBOOK_FILES = import.meta.glob("../content/docs/playbook/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

function stripMarkdownEmphasis(text: string): string {
	return text
		.replace(/\*\*(.+?)\*\*/g, "$1")
		.replace(/_(.+?)_/g, "$1")
		.replace(/`(.+?)`/g, "$1")
		.trim();
}

function parseFile(filePath: string, raw: string): Omit<StepDoc, "order">[] {
	const fileName = filePath.split("/").pop()!;
	const titleMatch = raw.match(/^title:\s*(.+)$/m);
	const pageTitle = titleMatch ? stripMarkdownEmphasis(titleMatch[1]) : fileName;
	const pageSlug = "playbook/" + fileName.replace(/\.md$/, "");

	const copyRe = /Copy (?:this )?into `(docs\/[^`]+)`/g;
	const markers = [...raw.matchAll(copyRe)];
	const docs: Omit<StepDoc, "order">[] = [];

	for (let i = 0; i < markers.length; i++) {
		const marker = markers[i];
		const outFile = marker[1].replace(/^docs\//, "");
		const start = marker.index ?? 0;
		const end = i + 1 < markers.length ? (markers[i + 1].index ?? raw.length) : raw.length;
		const chunk = raw.slice(start, end);

		const templateMatch = chunk.match(/```markdown\n([\s\S]*?)\n```/);
		const promptMatch = chunk.match(/```text\n([\s\S]*?)\n```/);
		if (!templateMatch || !promptMatch) continue;

		const before = raw.slice(0, start);
		const subHeadingMatches = [...before.matchAll(/^##\s+(\d+[a-z]?\s*·.+)$/gm)];
		const title = subHeadingMatches.length
			? stripMarkdownEmphasis(subHeadingMatches[subHeadingMatches.length - 1][1])
			: pageTitle;

		docs.push({
			id: outFile.replace(/\.md$/, ""),
			fileName: outFile,
			title,
			template: templateMatch[1],
			prompt: promptMatch[1],
			pageSlug,
		});
	}

	return docs;
}

function loadAllSteps(): StepDoc[] {
	const paths = Object.keys(PLAYBOOK_FILES).sort();
	const docs = paths.flatMap((p) => parseFile(p, PLAYBOOK_FILES[p]));
	return docs.map((doc, order) => ({ ...doc, order }));
}

/** All 14 fillable documents, in playbook order. Computed once at build time. */
export const STEPS: StepDoc[] = loadAllSteps();
