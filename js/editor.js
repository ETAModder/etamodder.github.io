import { EditorView, basicSetup } from "https://cdn.jsdelivr.net/npm/@codemirror/basic-setup@0.20.2/+esm";
import { javascript } from "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript@6.1.4/+esm";
import { oneDark } from "https://cdn.jsdelivr.net/npm/@codemirror/theme-one-dark@6.2.0/+esm";

let editor = new EditorView({
  doc: `console.log("hello");`,
  extensions: [basicSetup, javascript(), oneDark],
  parent: document.getElementById('editor')
});

window.runCode = () => {
  let outputEl = document.getElementById('output');
  try {
    let code = editor.state.doc.toString();
    let result = eval(code);
    outputEl.textContent = result !== undefined ? result : '✓ Executed without return value';
  } catch (e) {
    outputEl.textContent = "Error: " + e.message;
  }
}
