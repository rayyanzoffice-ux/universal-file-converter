# Universal File Converter

**Convert everyday file formats instantly, privately, and entirely in your browser.**

Universal File Converter is a responsive React application for common file and text transformations. There is no account, backend, database, or upload step.

## Features

| Converter | Capabilities |
| --- | --- |
| CSV → JSON | Header-aware CSV parsing and pretty JSON output |
| JSON → CSV | Convert objects or arrays of objects to CSV |
| JSON Formatter | Beautify or minify JSON safely |
| Markdown → HTML | Standards-friendly Markdown rendering |
| Text Case | Upper, lower, title, sentence, camel, snake, and kebab case |
| Image Converter | Convert JPG, PNG, and WebP in-browser |
| Image Resizer | Resize images with custom pixel dimensions |
| Base64 | Unicode-safe text encoding and decoding |
| URL | Encode and decode URL components |
| XML Formatter | Validate and pretty-print XML |

Every tool includes drag-and-drop input, clear errors, samples, reset controls, copy/download actions, responsive design, and light/dark themes.

## Privacy promise

> **Processed locally in your browser. Files are never uploaded.**

All conversions use browser APIs and client-side JavaScript. No file content is transmitted to a server.

## Install

```bash
git clone https://github.com/your-username/universal-file-converter.git
cd universal-file-converter
npm install
```

## Development

```bash
npm run dev
```

Preview the production build locally with `npm run preview`.

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Add a workflow that installs dependencies, runs `npm run build`, and deploys `dist/` with the official Pages actions.
4. Push the workflow to the default branch. Vite uses a relative base path, so project pages work without changing the repository name.

## Roadmap

- [ ] YAML conversion
- [ ] PDF utility tools
- [ ] Batch image processing
- [ ] Conversion history stored locally
- [ ] Additional locale-aware text transformations

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md), then open an issue or pull request.

## License

Released under the [MIT License](LICENSE).
