import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

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

// Brand Colors
const CHARCOAL = [25, 29, 39];
const DARK_CHARCOAL = [244, 244, 245];

// Target layout:
// 'future' + 'club' + '.' ends at x: 487 (minX: 53)
// 't' starts at 495 (w: 30) -> 495..524
// 'e' starts at 529 (w: 51) -> 529..579
// 'c' starts at 585 (w: 46) -> 585..630
// 'h' starts at 636 (w: 49) -> 636..684
const padX = 6;
const padY = 6;
const outW = (684 - 53 + 1) + padX * 2; // 644
const outH = (213 - 148 + 1) + padY * 2; // 78

const lightBuf = Buffer.alloc(outW * outH * 4);
const darkBuf = Buffer.alloc(outW * outH * 4);

function setOutPixel(outX, outY, r, g, b, a) {
  if (outX < 0 || outX >= outW || outY < 0 || outY >= outH) return;
  const idx = (outY * outW + outX) * 4;
  
  // Alpha blend over existing pixel if any
  const existingA = lightBuf[idx + 3];
  if (existingA === 0 || a >= existingA) {
    lightBuf[idx] = r;
    lightBuf[idx + 1] = g;
    lightBuf[idx + 2] = b;
    lightBuf[idx + 3] = a;
  }

  // Dark mode
  const isPurple = (b > 90 && (b - g) > 25);
  if (a > 0) {
    if (existingA === 0 || a >= existingA) {
      if (isPurple) {
        darkBuf[idx] = r;
        darkBuf[idx + 1] = g;
        darkBuf[idx + 2] = b;
        darkBuf[idx + 3] = a;
      } else {
        darkBuf[idx] = DARK_CHARCOAL[0];
        darkBuf[idx + 1] = DARK_CHARCOAL[1];
        darkBuf[idx + 2] = DARK_CHARCOAL[2];
        darkBuf[idx + 3] = a;
      }
    }
  }
}

// 1. Copy 'futureclub.' from orig x: 53..487, y: 148..213
for (let y = 148; y <= 213; y++) {
  const destY = y - 148 + padY;
  for (let x = 53; x <= 487; x++) {
    const destX = x - 53 + padX;
    const p = getPixel(x, y);
    if (p.a > 0) {
      setOutPixel(destX, destY, p.r, p.g, p.b, p.a);
    }
  }
}

// 2. Letter 't': orig 133..162
const tDestX = 495 - 53 + padX;
for (let y = 148; y <= 213; y++) {
  const destY = y - 148 + padY;
  for (let x = 133; x <= 162; x++) {
    const destX = tDestX + (x - 133);
    const p = getPixel(x, y);
    if (p.a > 0) {
      setOutPixel(destX, destY, p.r, p.g, p.b, p.a);
    }
  }
}

// 3. Letter 'e': orig 246..296
const eDestX = 529 - 53 + padX;
for (let y = 148; y <= 213; y++) {
  const destY = y - 148 + padY;
  for (let x = 246; x <= 296; x++) {
    const destX = eDestX + (x - 246);
    const p = getPixel(x, y);
    if (p.a > 0) {
      setOutPixel(destX, destY, p.r, p.g, p.b, p.a);
    }
  }
}

// 4. Letter 'c': orig 304..349, recolored to CHARCOAL
const cDestX = 585 - 53 + padX;
for (let y = 148; y <= 213; y++) {
  const destY = y - 148 + padY;
  for (let x = 304; x <= 349; x++) {
    const destX = cDestX + (x - 304);
    const p = getPixel(x, y);
    if (p.a > 0) {
      setOutPixel(destX, destY, CHARCOAL[0], CHARCOAL[1], CHARCOAL[2], p.a);
    }
  }
}

// 5. Letter 'h': constructed from 'b' (orig 424..472), recolored to CHARCOAL
const hDestX = 636 - 53 + padX;
for (let y = 150; y <= 213; y++) {
  const destY = y - 148 + padY;
  for (let relX = 0; relX <= 48; relX++) {
    const destX = hDestX + relX;
    const origX = 424 + relX;
    let a = 0;
    if (relX <= 9) {
      if (y <= 188) a = getPixel(origX, y).a;
      else if (y <= 209) a = getPixel(origX, 188).a;
      else if (y === 210) a = getPixel(origX, 210).a;
      else if (y === 211) a = getPixel(origX, 211).a;
    } else if (relX >= 35) {
      if (y <= 192) a = getPixel(origX, y).a;
      else if (y <= 209) a = getPixel(origX, 190).a;
      else if (y === 210) a = getPixel(origX, 190).a;
      else if (y === 211) a = Math.round(getPixel(origX, 190).a * 0.6);
    } else {
      if (y <= 185) a = getPixel(origX, y).a;
    }
    if (a > 0) {
      setOutPixel(destX, destY, CHARCOAL[0], CHARCOAL[1], CHARCOAL[2], a);
    }
  }
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

const lightPng = encodePng(outW, outH, lightBuf);
const darkPng = encodePng(outW, outH, darkBuf);

fs.writeFileSync(path.join(publicDir, 'logo.png'), lightPng);
fs.writeFileSync(path.join(publicDir, 'logo-dark.png'), darkPng);
console.log(`Saved public/logo.png (${lightPng.length} bytes, ${outW}x${outH})`);
console.log(`Saved public/logo-dark.png (${darkPng.length} bytes, ${outW}x${outH})`);
