## Structure

This app is organized around a `layout + pages + reusable components` pattern so new
pages can be added without reshuffling existing files.

1. Shared page chrome goes in `src/layouts/SiteLayout.jsx`.
2. Reusable site parts (header, footer, links) stay in `src/components`.
3. Route-level pages live in `src/pages`.
4. Site-wide constants (nav links, social links, metadata) live in `src/config`.
5. `src/App.jsx` only defines routes and keeps no page-specific markup.

## Directory Shape

```text
src/
	components/
		layout/
			SiteHeader.jsx
			SiteHeader.css
			SiteFooter.jsx
			SiteFooter.css
		links/
			NavLinkItem.jsx
			SocialLinkItem.jsx
			header-links.css
	config/
		siteConfig.js
	layouts/
		SiteLayout.jsx
		SiteLayout.css
	pages/
		HomePage.jsx
		AboutPage.jsx
		NewsPage.jsx
		NotFoundPage.jsx
		page-shell.css
	App.jsx
	main.jsx
	index.css
```
## Run

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
