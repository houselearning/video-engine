# HouseLearning Video Engine

A standalone, dependency-free educational animation engine for HouseLearning.org.

The project creates narrated, animated educational scenes in the browser using Canvas, SVG-friendly scene objects, Web Audio, speech synthesis, and subtitles.

## Architecture

- `src/core/` owns video documents, timeline, and scene lookup.
- `src/scenes/` contains subject-specific Canvas scenes.
- `src/definitions/` contains reusable demo data.
- `src/narration/` provides browser-speech and asset-backed narration providers.
- `src/audio/` owns the Web Audio mixer and MediaStreamDestination.
- `src/player/` owns timeline playback and scene transitions.
- `src/export/` owns MediaRecorder export.
- `src/auth/` provides test and existing-Firebase authentication adapters.

## Development

```bash
npm run dev
```

Open `http://localhost:4175/`.

## Export reliability

A verified 40-second Pythagorean WebM fallback is stored at `public/exports/pythagorean-theorem-fallback.webm`. It contains VP9 video and Opus narration and is the safe download option until browser long-duration MediaRecorder audio capture is reliable in every supported browser.

## Deployment

The production route is `https://www.houselearning.org/video-engine/`. The separate repository should publish its `dist/` directory only through the HouseLearning Pages repository workflow. This repository itself has no credentials, live deployment workflow, or cross-repository publishing configuration.

## Current scope

This Phase 2 foundation includes:

- Reusable JavaScript video definitions
- A shared animation timeline and clock
- Canvas scene rendering
- Scene transitions
- Responsive resizing and lifecycle cleanup
- A Pythagorean theorem demonstration
- Browser speech synthesis adapters
- Subtitle tracks
- Independent volume controls
- MediaRecorder export preparation
- Adapter-only authentication hooks

Live HouseLearning deployment and cross-repository publishing are intentionally not configured.
