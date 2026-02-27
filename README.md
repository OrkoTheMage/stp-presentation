# Network CLI Presenter

Network CLI Presenter — terminal-based presentations for network engineering. Displays presentations as ASCII diagrams in the terminal with keyboard-driven navigation. Supports multiple presentations and a presentation selector; the repository currently includes an example presentation on STP.

## Features
- Interactive, terminal-first presentations rendered as ASCII diagrams
- Keyboard navigation and focused highlights for diagram sections
- Extensible diagram sources (add more presentations later)

## How to use

Prerequisites: Node.js (LTS recommended).

Install dependencies:

```bash
npm install
```

Start the presentation selector (recommended):

```bash
npm run present
```

Then pick a presentation from the interactive list (use Tab/arrow keys and Enter to select).

Or run a presentation directly by pointing Node at the presentation's `index.js` under `src`:

```bash
node src/<presentation>/index.js
# example:
node src/stp/index.js
```

## Controls
- `Tab` — Next diagram
- `Backspace` — Previous diagram
- `Z` — Cycle next highlighted (hash) line within the current diagram
- `Ctrl+C` — Exit

## Tech stack
- Node.js (ES Modules)
 - Libraries:
	 - `blessed`
	 - `blessed-contrib`
	 - `chalk`
	 - `enquirer` (interactive selector)

Scripts:
- `npm run present` — interactive presentation selector

Key source files:
 - [src/stp/index.js](src/stp/index.js)
 - [src/stp/diagrams.js](src/stp/diagrams.js)
 - [src/stp/ui.js](src/stp/ui.js)
 - [src/stp/renderer.js](src/stp/renderer.js)
 - [src/stp/state.js](src/stp/state.js)
 - [src/stp/styles/colorDiagram.js](src/stp/styles/colorDiagram.js)
 - [src/stp/utils/controls.js](src/stp/utils/controls.js)
 - [src/stp/utils/helpers.js](src/stp/utils/helpers.js)

## Current content
- Presentation on STP. More presentations will be added in future updates.
