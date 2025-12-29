## Installation

This component uses Tailwind CSS for styling.

Consumer must either generate the CSS using Tailwind CSS or import the precompiled CSS.

**Choose any one of the options below:**

---

### Option 1 — Tailwind CSS users (recommended)

Use this option if your application already uses Tailwind CSS.

#### Requirements
- Tailwind CSS v3+
- Add the Code Editor Tailwind preset
- Allow Tailwind to scan the Code Editor package files

#### Setup

```js
// tailwind.config.cjs
module.exports = {
  presets: [
    require('code-editor/tailwind-preset'),
  ],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/code-editor/**/*.{js,ts,jsx,tsx}',
  ],
};
```

---

### Option 2 — Non-Tailwind users (standalone CSS)

Use this option if your application does **not** use Tailwind CSS.

#### Setup

Import the compiled CSS once in your app entry file.

```ts
// main.tsx
import 'code-editor/css';
```

---
