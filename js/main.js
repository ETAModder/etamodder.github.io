const term = new Terminal({
  convertEol: true,
  disableStdin: true,
  theme: {
    background: "#000000",
    foreground: "#cccccc",
  },
  fontFamily: "monospace",
  fontSize: 14,
});
term.open(document.getElementById("terminal"));

let lines = [];
let scrollPos = 0;
const viewHeight = 30;

fetch("manpage.txt")
  .then(r => r.text())
  .then(txt => {
    lines = txt.split("\n");
    render();
  });

function render() {
  term.reset();
  const slice = lines.slice(scrollPos, scrollPos + viewHeight);
  slice.forEach(line => term.writeln(line));
  document.getElementById("bottombar").textContent =
    `Manual page MAN(1) line ${scrollPos + 1}/${lines.length}`;
}

function scrollUp() {
  if (scrollPos > 0) {
    scrollPos--;
    render();
  }
}

function scrollDown() {
  if (scrollPos < lines.length - viewHeight) {
    scrollPos++;
    render();
  }
}

window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") scrollUp();
  if (e.key === "ArrowDown") scrollDown();
  if (e.key === "PageUp") { scrollPos = Math.max(0, scrollPos - viewHeight); render(); }
  if (e.key === "PageDown") { scrollPos = Math.min(lines.length - viewHeight, scrollPos + viewHeight); render(); }
});

window.addEventListener("wheel", e => {
  if (e.deltaY > 0) scrollDown();
  if (e.deltaY < 0) scrollUp();
});
