# Architecture

## Video Document

`src/core/VideoDocument.js` normalizes title, subject, grade range, narrator, scenes, and subtitles. A lesson author should add a definition rather than a new player implementation.

## Rendering

`CanvasRenderer` owns canvas sizing, pixel ratio, and the active subject scene. Subject scenes receive scene time and normalized progress. `SVGRenderer` remains an optional fallback interface.

## Timeline

`AnimationClock` owns timeline state. `SceneManager` maps timeline time to scenes. `PlayerController` owns play, pause, seek, and scene-transition callbacks.

## Audio

`AudioMixer` separates narration, music, effects, and overall gain. `AssetNarrationProvider` loads synchronized WAV assets. `BrowserSpeechProvider` remains a fallback.

## Export

`MediaRecorderExporter` captures the canvas and optional mixed audio tracks. The production download code does not claim authentication protection; it only checks the HouseLearning auth adapter.

## Authentication

`FirebaseAuthAdapter` observes the existing public Firebase project state. It does not initialize authentication providers or modify rules. Test authentication is query-param controlled only for local verification.

## Deployment

The main Pages repository owns the custom domain and builds this repository into `/video-engine/` during its Pages workflow.
