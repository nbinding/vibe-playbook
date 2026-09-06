// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://nbinding.github.io',
	base: '/vibe-playbook',
	integrations: [
		starlight({
			title: 'Vibe Coding Playbook',
			description:
				'A versioned, step-by-step process for going from a raw idea to a published app with an AI coding partner — with a template and an LLM prompt for every step.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nbinding/vibe-playbook' },
			],
			editLink: {
				baseUrl: 'https://github.com/nbinding/vibe-playbook/edit/approval/',
			},
			lastUpdated: true,
			sidebar: [
				{ label: 'Start here', slug: 'index' },
				{ label: 'How to use this playbook', slug: 'how-to-use' },
				{
					label: '1 · Discover',
					items: [
						{ label: '01 · Problem & Opportunity', slug: 'playbook/01-problem-opportunity' },
						{ label: '02 · Idea & Pitch', slug: 'playbook/02-idea-and-pitch' },
					],
				},
				{
					label: '2 · Design',
					items: [
						{ label: '03 · UX', slug: 'playbook/03-ux' },
						{ label: '04 · UI & Design System', slug: 'playbook/04-ui-design-system' },
						{ label: '05 · Prototype', slug: 'playbook/05-prototype' },
					],
				},
				{
					label: '3 · Build',
					items: [
						{ label: '06 · Full Build', slug: 'playbook/06-full-build' },
						{ label: '07 · Testing', slug: 'playbook/07-testing' },
					],
				},
				{
					label: '4 · Launch',
					items: [
						{ label: '08 · App Profile', slug: 'playbook/08-app-profile' },
						{ label: '09 · Marketing', slug: 'playbook/09-marketing' },
						{ label: '10 · Publishing', slug: 'playbook/10-publishing' },
						{ label: '11 · Feedback Loop', slug: 'playbook/11-feedback-loop' },
					],
				},
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
	],
});
