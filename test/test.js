import React from "https://esm.sh/react@canary?dev";
import ReactDOM from "https://esm.sh/react-dom@canary?dev";
import ReactDOMClient from "https://esm.sh/react-dom@canary/client?dev";
// import ReactDOMServer from "https://esm.sh/react-dom@canary/server.browser?dev";
import * as emotion from "https://esm.sh/@emotion/css@11";
import htm from "https://esm.sh/htm";

// window.html = htm.bind(React.createElement);
const html = htm.bind(React.createElement);

const Page = props => {
  return html`
    <div>
      <button className=${cssPage} onClick=${e => { throw new Error(1) }}>
        TEST
      </button>

      <!-- comment 1 -->
      <pre>        test.js
        ↓
        esbuild test.js --sourcemap --outfile=test1.js
        ↓
        test1.js & test1.js.map
        ↓
        minify-template-literal test1.js --remap --outfile=test2.js
        ↓
        test2.js & remap test1.js.map
      </pre>
      <pre>123</pre>
      <pre>456</pre><pre>789</pre><div>abc</div><div>def</div>
    </div>
  `;
}

const cssPage = emotion.css`
  /* 
    comment1 
  */
  color: skyblue; /* comment2 */
  background: black;
  padding: 1rem;
  .test::after {
    content: "/* not comment */";
  }
`;

const root = ReactDOMClient.createRoot(document.getElementById("app"));
root.render(React.createElement(Page));
