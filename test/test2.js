import t from"https://esm.sh/react@canary?dev";import"https://esm.sh/react-dom@canary?dev";import e from"https://esm.sh/react-dom@canary/client?dev";import*as o from"https://esm.sh/@emotion/css@11";import r from"https://esm.sh/htm";window.html=r.bind(t.createElement);const m=a=>html`<div><button className=${s} onClick=${c=>{throw new Error(1)}}>TEST</button><pre>        test.js
        ↓
        esbuild test.js --sourcemap --outfile=test1.js
        ↓
        test1.js & test1.js.map
        ↓
        minify-template-literal test1.js --remap --outfile=test2.js
        ↓
        test2.js & remap test1.js.map
      </pre><pre>123</pre><pre>456</pre><pre>789</pre><div>abc</div><div>def</div></div>`,s=o.css`color: skyblue; background: black; padding: 1rem; .test::after { content: "/* not comment */" ; }`,n=e.createRoot(document.getElementById("app"));n.render(t.createElement(m));
//# sourceMappingURL=test1.js.map
