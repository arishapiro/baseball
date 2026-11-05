// Builds the app's web bundle (www/) from the two tools that live elsewhere in this repo,
// so pitchpathlab/index.html and lineupsimulator/index.html stay the single source of truth.
// Each tool page gets the app's top bar (with a Home button), safe-area padding and app.js.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = join(here, "..");
const repo = join(app, "..");
const www = join(app, "www");

const TOOLS = [
  { src: "pitchpathlab/index.html",    out: "pitch.html",  title: "Pitch Path Lab" },
  { src: "lineupsimulator/index.html", out: "lineup.html", title: "Batting Lineup" },
];

rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

// Home screen, shared CSS and JS.
for (const f of readdirSync(join(app, "src"))) copyFileSync(join(app, "src", f), join(www, f));

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const t of TOOLS) {
  let html = readFileSync(join(repo, t.src), "utf8");

  // Let the page run under the notch / status bar; the app bar pads itself by the safe-area insets.
  const vp = /<meta\s+name="viewport"[^>]*>/i;
  const vpTag = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">';
  html = vp.test(html) ? html.replace(vp, vpTag) : html.replace(/<head[^>]*>/i, m => `${m}\n${vpTag}`);

  if (!/<\/head>/i.test(html) || !/<body[^>]*>/i.test(html) || !/<\/body>/i.test(html)) {
    throw new Error(`${t.src} needs <head>, <body> and </body> tags`);
  }
  html = html.replace(/<\/head>/i, '<link rel="stylesheet" href="app.css">\n</head>');
  html = html.replace(/<body([^>]*)>/i, (m, attrs) =>
    `<body${attrs} data-dc-tool="${t.out}">\n<header class="dc-bar"><a class="dc-home" href="index.html" aria-label="Back to home">‹ Home</a><span class="dc-title">${esc(t.title)}</span></header>`);
  html = html.replace(/<\/body>/i, '<script src="app.js"></script>\n</body>');

  writeFileSync(join(www, t.out), html);
  console.log(`built www/${t.out} from ${t.src}`);
}
console.log("www/ is ready");
