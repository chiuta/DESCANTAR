// DESCÂNTAR: trei metode de dat în bobi, rezultat, istoric, descântece, ghid, generator, 8 limbi, fără rețea.
import path from "node:path"; import {fileURLToPath} from "node:url"; import {createRequire} from "node:module";
const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
const FILE = "file://" + path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let ok = 0, bad = 0; const check = (n, c, x) => { if (c) { ok++; console.log("  ok   " + n); } else { bad++; console.log("  FAIL " + n + (x !== undefined ? " -> " + JSON.stringify(x) : "")); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"]});
const errs = [], net = []; const ctx = await b.newContext({serviceWorkers: "block"}); await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const p = await ctx.newPage(); p.on("pageerror", e => errs.push(e.message)); p.on("dialog", d => d.dismiss()); await p.goto(FILE); await p.waitForTimeout(600);
for (const m of ["carte", "oltenia", "trei"]) {
  await p.click(`#modes [data-m="${m}"]`); await p.waitForTimeout(100);
  await p.click("#brow"); await p.waitForTimeout(100); await p.click("#brand"); await p.waitForTimeout(100); await p.click("#bcount"); await p.waitForTimeout(200);
  const txt = await p.locator("#result").innerText();
  check("metoda " + m + ": rezultat afișat", txt.length > 100, txt.length);
  if (m !== "trei") check("metoda " + m + ": 9 celule în matrice", (await p.locator("#stage .mc").count()) === 9);
  if (m === "oltenia") check("Oltenia: descântec de menire în rezultat", /Oltenia/.test(txt));
}
await p.click('nav [data-tab="hist"]'); check("istoricul conține 3 citiri", (await p.locator("#hlist button[data-h]").count()) === 3);
await p.locator("#hlist button[data-h]").first().click(); await p.waitForTimeout(150); check("redeschiderea din istoric arată rezultatul", (await p.locator("#result").innerText()).length > 100);
await p.click('nav [data-tab="bobi"]'); await p.locator("#guide summary").click(); check("ghidul se deschide", /41 de boabe/.test(await p.locator("#gtext").innerText()));
await p.click('nav [data-tab="desc"]'); check("12 descântece listate", (await p.locator("#dlist > *").count()) >= 12);
const langs = await p.evaluate(() => [...document.querySelectorAll("#lang option")].map(o => o.value)); check("8 limbi", langs.length === 8, langs);
for (let i = 0; i < langs.length; i++) { await p.selectOption("#lang", {index: i}); await p.waitForTimeout(100); }
check("localStorage cu prefix", (await p.evaluate(() => Object.keys(localStorage))).every(k => /^(descantar|fff)/.test(k)));
check("fără erori JS", errs.length === 0, errs); check("fără cereri de rețea", net.length === 0, net);
await b.close(); console.log(`\n${ok} ok, ${bad} eșuate`); process.exit(bad ? 1 : 0);
