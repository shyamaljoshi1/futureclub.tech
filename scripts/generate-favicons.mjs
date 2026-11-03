import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 1. Generate public/favicon.svg
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181920" />
      <stop offset="100%" stop-color="#0a0b0e" />
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5d2fb5" />
    </linearGradient>
  </defs>
  
  <!-- Base Squircle -->
  <rect width="512" height="512" rx="120" fill="url(#bgGrad)" />
  <rect width="504" height="504" x="4" y="4" rx="116" fill="none" stroke="#2a2c36" stroke-width="6" opacity="0.7" />
  
  <!-- fc Monogram in bold geometric styling -->
  <g font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="252" letter-spacing="-6">
    <text x="86" y="348" fill="#ffffff">f</text>
    <text x="210" y="348" fill="url(#purpleGrad)">c</text>
  </g>
  
  <!-- Minimalist accent dot -->
  <circle cx="406" cy="336" r="18" fill="url(#purpleGrad)" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
console.log('Saved public/favicon.svg');

// 2. Decode source logo to extract original 'f' and 'c'
const srcPath = 'C:/Users/Shyamal/.gemini/antigravity/brain/909f2b05-f45c-4431-bead-d76be13a88b0/.user_uploaded/media_1793697832324_0bdd09ec.png';
const buf = fs.readFileSync(srcPath);

const srcWidth = buf.readUInt32BE(16);
const srcHeight = buf.readUInt32BE(20);

let pos = 8;
const idatChunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);

const bpp = 4;
const stride = 1 + srcWidth * bpp;
const uncompressed = Buffer.alloc(srcWidth * srcHeight * 4);

for (let y = 0; y < srcHeight; y++) {
  const filter = raw[y * stride];
  const rowStart = y * stride + 1;
  const outStart = y * srcWidth * bpp;
  
  for (let x = 0; x < srcWidth * bpp; x++) {
    const rawVal = raw[rowStart + x];
    const left = x >= bpp ? uncompressed[outStart + x - bpp] : 0;
    const up = y > 0 ? uncompressed[outStart - srcWidth * bpp + x] : 0;
    const upLeft = (y > 0 && x >= bpp) ? uncompressed[outStart - srcWidth * bpp + x - bpp] : 0;
    
    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + left) & 0xff;
    else if (filter === 2) val = (rawVal + up) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((left + up) / 2)) & 0xff;
    else if (filter === 4) {
      const p = left + up - upLeft;
      const pa = Math.abs(p - left);
      const pb = Math.abs(p - up);
      const pc = Math.abs(p - upLeft);
      const pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upLeft);
      val = (rawVal + pr) & 0xff;
    }
    uncompressed[outStart + x] = val;
  }
}

function getPixel(x, y) {
  if (x < 0 || x >= srcWidth || y < 0 || y >= srcHeight) return { r: 0, g: 0, b: 0, a: 0 };
  const idx = (y * srcWidth + x) * 4;
  return { r: uncompressed[idx], g: uncompressed[idx + 1], b: uncompressed[idx + 2], a: uncompressed[idx + 3] };
}

// Render Master Icon at 96x96
// 'f': x: 53..80 (w: 28), y: 149..213 (h: 65)
// 'c': x: 304..349 (w: 46), y: 149..213 (h: 65)
// Total content width: 28 + 4 + 46 = 78px
// Content height: 65px
const masterSize = 96;
const masterBuf = Buffer.alloc(masterSize * masterSize * 4);

// Background squircle helper
function isInsideSquircle(x, y, size, r) {
  // Center is size/2, check distance from rounded rect corners
  const cx = size / 2;
  const cy = size / 2;
  const hw = size / 2;
  const hh = size / 2;
  
  const dx = Math.abs(x + 0.5 - cx);
  const dy = Math.abs(y + 0.5 - cy);
  
  if (dx > hw || dy > hh) return 0;
  if (dx <= hw - r || dy <= hh - r) return 1;
  
  const cornerDist = Math.sqrt((dx - (hw - r)) ** 2 + (dy - (hh - r)) ** 2);
  if (cornerDist <= r - 0.5) return 1;
  if (cornerDist >= r + 0.5) return 0;
  return Math.max(0, Math.min(1, r + 0.5 - cornerDist));
}

// Fill master background
const radius = 22; // ~23% squircle
for (let y = 0; y < masterSize; y++) {
  for (let x = 0; x < masterSize; x++) {
    const alpha = isInsideSquircle(x, y, masterSize, radius);
    if (alpha > 0) {
      const idx = (y * masterSize + x) * 4;
      // Slight vertical gradient from #181920 to #0a0b0e
      const t = y / masterSize;
      const r = Math.round(24 * (1 - t) + 10 * t);
      const g = Math.round(25 * (1 - t) + 11 * t);
      const b = Math.round(32 * (1 - t) + 14 * t);
      masterBuf[idx] = r;
      masterBuf[idx + 1] = g;
      masterBuf[idx + 2] = b;
      masterBuf[idx + 3] = Math.round(alpha * 255);
    }
  }
}

// Alpha blend pixel helper
function blendPixel(buf, w, h, x, y, r, g, b, a) {
  if (x < 0 || x >= w || y < 0 || y >= h || a === 0) return;
  const idx = (y * w + x) * 4;
  const bgA = buf[idx + 3] / 255;
  const fgA = a / 255;
  const outA = fgA + bgA * (1 - fgA);
  if (outA > 0) {
    buf[idx] = Math.round((r * fgA + buf[idx] * bgA * (1 - fgA)) / outA);
    buf[idx + 1] = Math.round((g * fgA + buf[idx + 1] * bgA * (1 - fgA)) / outA);
    buf[idx + 2] = Math.round((b * fgA + buf[idx + 2] * bgA * (1 - fgA)) / outA);
    buf[idx + 3] = Math.round(outA * 255);
  }
}

// Render 'f' (recolored to crisp white #ffffff)
const fOffsetX = Math.floor((masterSize - 78) / 2); // 9
const fOffsetY = Math.floor((masterSize - 65) / 2); // 15
for (let y = 149; y <= 213; y++) {
  const destY = fOffsetY + (y - 149);
  for (let x = 53; x <= 80; x++) {
    const destX = fOffsetX + (x - 53);
    const p = getPixel(x, y);
    if (p.a > 0) {
      blendPixel(masterBuf, masterSize, masterSize, destX, destY, 255, 255, 255, p.a);
    }
  }
}

// Render 'c' (recolored to vibrant brand purple #8b5cf6 / #5d2fb5)
const cOffsetX = fOffsetX + 28 + 4; // 41
for (let y = 149; y <= 213; y++) {
  const destY = fOffsetY + (y - 149);
  for (let x = 304; x <= 349; x++) {
    const destX = cOffsetX + (x - 304);
    const p = getPixel(x, y);
    if (p.a > 0) {
      // Use original purple RGB with subtle vibrancy boost
      const r = Math.min(255, Math.round(p.r * 1.05 + 10));
      const g = Math.min(255, Math.round(p.g * 1.05));
      const b = Math.min(255, Math.round(p.b * 1.1 + 15));
      blendPixel(masterBuf, masterSize, masterSize, destX, destY, r, g, b, p.a);
    }
  }
}

// Resampling helper: Box / Area averaging for pristine downsampling
function resample(srcBuf, srcW, srcH, destW, destH) {
  const out = Buffer.alloc(destW * destH * 4);
  const scaleX = srcW / destW;
  const scaleY = srcH / destH;

  for (let dy = 0; dy < destH; dy++) {
    const sy1 = dy * scaleY;
    const sy2 = (dy + 1) * scaleY;
    
    for (let dx = 0; dx < destW; dx++) {
      const sx1 = dx * scaleX;
      const sx2 = (dx + 1) * scaleX;
      
      let totalR = 0, totalG = 0, totalB = 0, totalA = 0, totalWeight = 0;

      const yStart = Math.floor(sy1);
      const yEnd = Math.min(srcH - 1, Math.floor(sy2));
      const xStart = Math.floor(sx1);
      const xEnd = Math.min(srcW - 1, Math.floor(sx2));

      for (let sy = yStart; sy <= yEnd; sy++) {
        const wy = Math.min(sy + 1, sy2) - Math.max(sy, sy1);
        for (let sx = xStart; sx <= xEnd; sx++) {
          const wx = Math.min(sx + 1, sx2) - Math.max(sx, sx1);
          const w = wx * wy;
          const sIdx = (sy * srcW + sx) * 4;
          const a = srcBuf[sIdx + 3];
          
          totalR += srcBuf[sIdx] * (a / 255) * w;
          totalG += srcBuf[sIdx + 1] * (a / 255) * w;
          totalB += srcBuf[sIdx + 2] * (a / 255) * w;
          totalA += a * w;
          totalWeight += w;
        }
      }

      const dIdx = (dy * destW + dx) * 4;
      const avgA = totalA / totalWeight;
      out[dIdx + 3] = Math.round(avgA);
      if (avgA > 0) {
        out[dIdx] = Math.round((totalR / totalWeight) / (avgA / 255));
        out[dIdx + 1] = Math.round((totalG / totalWeight) / (avgA / 255));
        out[dIdx + 2] = Math.round((totalB / totalWeight) / (avgA / 255));
      }
    }
  }
  return out;
}

// Upsampling helper for Apple touch icon (180x180)
function resampleUp(srcBuf, srcW, srcH, destW, destH) {
  const out = Buffer.alloc(destW * destH * 4);
  const scale = srcW / destW;
  const radius = destW * 0.22;

  // Background squircle for 180x180
  for (let y = 0; y < destH; y++) {
    for (let x = 0; x < destW; x++) {
      const alpha = isInsideSquircle(x, y, destW, radius);
      if (alpha > 0) {
        const idx = (y * destW + x) * 4;
        const t = y / destH;
        const r = Math.round(24 * (1 - t) + 10 * t);
        const g = Math.round(25 * (1 - t) + 11 * t);
        const b = Math.round(32 * (1 - t) + 14 * t);
        out[idx] = r;
        out[idx + 1] = g;
        out[idx + 2] = b;
        out[idx + 3] = Math.round(alpha * 255);
      }
    }
  }

  // Draw scaled letters
  const srcScale = destW / srcW;
  for (let sy = 0; sy < srcH; sy++) {
    for (let sx = 0; sx < srcW; sx++) {
      const sIdx = (sy * srcW + sx) * 4;
      const sa = srcBuf[sIdx + 3];
      // Only blend letter pixels (where background was overwritten)
      // Check if pixel is distinct from background:
      if (sa > 0) {
        const sr = srcBuf[sIdx];
        const sg = srcBuf[sIdx + 1];
        const sb = srcBuf[sIdx + 2];
        const isLetter = (sr > 40 || sg > 40 || sb > 50);
        if (isLetter) {
          const dx = Math.round(sx * srcScale);
          const dy = Math.round(sy * srcScale);
          for (let py = 0; py <= Math.ceil(srcScale); py++) {
            for (let px = 0; px <= Math.ceil(srcScale); px++) {
              blendPixel(out, destW, destH, dx + px, dy + py, sr, sg, sb, sa);
            }
          }
        }
      }
    }
  }
  return out;
}

// PNG Encoder helpers
function makeCrcTable() {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const toHash = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toHash), 0);
  return Buffer.concat([len, toHash, crcBuf]);
}

function encodePng(w, h, rgba) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  
  const scanlines = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    const srcRow = y * w * 4;
    const destRow = y * (1 + w * 4);
    scanlines[destRow] = 0;
    rgba.copy(scanlines, destRow + 1, srcRow, srcRow + w * 4);
  }
  
  const idat = zlib.deflateSync(scanlines);
  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// Generate PNG sizes
const buf48 = resample(masterBuf, masterSize, masterSize, 48, 48);
const buf32 = resample(masterBuf, masterSize, masterSize, 32, 32);
const buf16 = resample(masterBuf, masterSize, masterSize, 16, 16);
const buf180 = resampleUp(masterBuf, masterSize, masterSize, 180, 180);

const png16 = encodePng(16, 16, buf16);
const png32 = encodePng(32, 32, buf32);
const png48 = encodePng(48, 48, buf48);
const png180 = encodePng(180, 180, buf180);

fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
console.log('Saved favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png');

// Build Binary ICO containing 16x16, 32x32, 48x48
function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(pngBuffers.length, 4); // count

  let offset = 6 + 16 * pngBuffers.length;
  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map(b => b.buffer)]);
}

const icoBuffer = createIco([
  { width: 16, height: 16, buffer: png16 },
  { width: 32, height: 32, buffer: png32 },
  { width: 48, height: 48, buffer: png48 }
]);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log(`Saved public/favicon.ico (${icoBuffer.length} bytes, 3 image sizes: 16, 32, 48)`);
