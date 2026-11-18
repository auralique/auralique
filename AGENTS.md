<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the single-page navigation and Journal modal experience; crawlable article bodies live in native closed details on their existing cards to preserve the layout without hidden SEO-only text.
- Derive sitemap URLs from explicit required route sitemap decisions with the versioned helper; omit lastmod without an authoritative page-specific timestamp.
- Keep accurate public schema in the SEO module, excluding unverified contacts, locations, reviews and ratings; analytics receives only predefined non-identifying event labels.
- Keep mobile layout overrides below the desktop breakpoint; reviews use the same two opposing marquee rows on phone and desktop, with hover pausing limited to hover-capable devices.
- Use the shared dialog-focus hook for menu and reading/booking dialogs to restore focus, trap tab navigation and restore prior body scrolling.
- Render the platform ecosystem as duplicated equal-width lists in a CSS marquee on every viewport; hide the duplicate from assistive technology and disable automatic motion for reduced-motion preferences to keep the loop accessible.
- Service cards open per-service detail dialogs from structured detail data; the same detail content is server-rendered in native closed details on each card for crawlability.
- Blog, service and case-study popups are URL-driven (/blog/$slug, /services/$slug, /work/$slug routes render the homepage with the matching modal open, via use-modal-route); slugs live in content-urls and are permanent, and the sitemap appends their paths, so the homepage stays one page while each item is SSR-indexable.
