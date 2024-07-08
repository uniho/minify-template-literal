# minify-template-literal

Minify the Template Literals with like Emotion, developit/htm, ...

[Emotion](https://emotion.sh/docs/introduction) is a library designed for writing css styles with JavaScript.

[developit/htm](https://github.com/developit/htm) is JSX-like syntax in plain JavaScript - no transpiler necessary.

## Installation

```bash
npm install --save-dev minify-template-literal
```

## Basic Usage 1

hoge.js:

```js

import * as emotion from "https://esm.sh/@emotion/css@11";
import htm from "https://esm.sh/htm";
window.html = htm.bind(React.createElement);

// Page Component for React
const Page = props => html`
  <!-- Some Comments -->
  <button className=${cssPage} onClick=${e => { throw new Error(1) }}>
    TEST
  </button>
`;

// 
const cssPage = emotion.css`
  /* Some Comments */
  color: skyblue;
  background: black;
  padding: 1rem;
`;

```

Run minify-template-literal:

```bash
minify-template-literal hoge.js
```

Output like that:

```js

import * as emotion from "https://esm.sh/@emotion/css@11";
import htm from "https://esm.sh/htm";
window.html = htm.bind(React.createElement);

// Page Component for React
const Page = props => html`<button className=${cssPage} onClick=${e => { throw new Error(1) }}>TEST</button>`;

// 
const cssPage = emotion.css`color: skyblue; background: black; padding: 1rem;`;

```

## Basic Usage 2

```bash
minify-template-literal hoge.js --outfile=out.js
```

## Advanced Usage with esbuild

```bash
esbuild hoge.js --sourcemap --outfile=out.js
```

And then, you can take a new source map.

```bash
minify-template-literal out.js --remap --outfile=out.js
```

## Contribution

1. Fork it
1. Create your feature branch
1. Commit your changes
1. Push to the branch
1. Create new Pull Request

## License

MIT
