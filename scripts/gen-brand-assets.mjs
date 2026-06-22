// Generates the favicon, app icons, and social share images from the brand
// logo, rendered on the brand dark-green "void" so the white wordmark pops
// (consistent with the intro loader). Re-run after the logo changes:
//   node scripts/gen-brand-assets.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOGO = path.join(root, "public/brand/logo.png");
const APP = path.join(root, "app");

const VOID = "#0E3420";
const CREAM = "#FCEDD8";
const PINK = "#F92C6E";
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function makeIcon(size, outName) {
  const radius = Math.round(size * 0.22);
  const logoSize = Math.round(size * 0.78);
  const offset = Math.round((size - logoSize) / 2);
  const logo = await sharp(LOGO)
    .resize(logoSize, logoSize, { fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${VOID}"/>
     </svg>`,
  );
  await sharp(bg)
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(path.join(APP, outName));
  console.log("wrote app/" + outName);
}

async function makeShare(outName) {
  const W = 1200;
  const H = 630;
  const logoH = 290;
  const logo = await sharp(LOGO)
    .resize(logoH, logoH, { fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="32%" r="62%">
        <stop offset="0%" stop-color="${PINK}" stop-opacity="0.24"/>
        <stop offset="70%" stop-color="${VOID}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${VOID}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <text x="${W / 2}" y="486" text-anchor="middle" font-style="italic"
      font-family="'Plus Jakarta Sans','Trebuchet MS',Arial,sans-serif"
      font-size="36" fill="${CREAM}">made fresh. made simple. made for you.</text>
    <text x="${W / 2}" y="548" text-anchor="middle" font-weight="700"
      font-family="'Plus Jakarta Sans',Arial,sans-serif"
      font-size="25" letter-spacing="3" fill="${PINK}">JULY 11 · LARCHMONT VILLAGE · LOS ANGELES</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: 112, left: Math.round((W - logoH) / 2) }])
    .png()
    .toFile(path.join(APP, outName));
  console.log("wrote app/" + outName);
}

await makeIcon(512, "icon.png");
await makeIcon(180, "apple-icon.png");
await makeShare("opengraph-image.png");
await makeShare("twitter-image.png");
console.log("done");
