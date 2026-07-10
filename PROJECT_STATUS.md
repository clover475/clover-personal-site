# Project Status

Updated: 2026-07-11

## Current state

- Public repository: `clover475/clover-personal-site`
- Current prototype uses the approved long-page reference UI for Hero, About, Projects, Thinking, and Contact.
- About Me is kept as a separate page.
- Vercel review URL: https://youtube-murex-xi.vercel.app

## This session

- Rebuilt Hero as an independent layer instead of using the low-resolution `hello` baked into the reference screenshot.
- Added generated asset `assets/hero-art.png` (1672×941) with the highland manga composition.
- Added an independent SVG `hello` with pointer parallax, turbulence displacement, and scroll-velocity deformation.
- Added Lenis-like rAF wheel damping and curved scroll feedback without adding a third-party runtime dependency.
- Replaced the static Contact fireworks with a visible igniter: hover guidance, then click-to-launch Canvas particle bursts.
- Kept reduced-motion behavior and did not change the page information architecture.

## Validation

- Command: `node --check app.js` and `git diff --check`
- Result: passed
- Command: `curl -I -L https://youtube-murex-xi.vercel.app`, `.../about.html`, and `.../assets/home-reference.png`
- Result: all returned HTTP 200 from Vercel.
- Manual check: scroll curve and Contact fireworks still need visual review in your browser.
- Asset generation: `imagegen` generated `assets/hero-art.png`; the project-specific image2 entrypoint was unavailable, so this is not an image2 result.
- Remaining gap: Projects and Thinking still use the approved reference long image and should be converted to real DOM UI after Hero review.

## Next smallest task

Review the new independent Hero and Contact interactions; then convert Projects into real DOM cards while preserving the approved visual layout.
