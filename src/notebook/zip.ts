// Copyright © 2026 Christopher Snow
import type { NotebookFile } from "./model";
const table = Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function crc(data: Uint8Array) {
  let n = 0xffffffff;
  for (const b of data) n = table[(n ^ b) & 255]! ^ (n >>> 8);
  return (n ^ 0xffffffff) >>> 0;
}
/** Standard uncompressed ZIP, retaining relative paths and UTF-8 filenames. */
export async function zipFiles(files: NotebookFile[]) {
  const parts: Uint8Array<ArrayBuffer>[] = [],
    central: Uint8Array<ArrayBuffer>[] = [];
  let offset = 0;
  for (const file of files) {
    const name = new TextEncoder().encode(file.name),
      data = new Uint8Array(await file.blob.arrayBuffer()),
      sum = crc(data);
    // Unicode path extra field keeps names readable in older native unzip tools too.
    const extra = new Uint8Array(9 + name.length),
      ev = new DataView(extra.buffer);
    ev.setUint16(0, 0x7075, true);
    ev.setUint16(2, 5 + name.length, true);
    extra[4] = 1;
    ev.setUint32(5, crc(name), true);
    extra.set(name, 9);
    const h = new Uint8Array(30 + name.length + extra.length),
      v = new DataView(h.buffer);
    v.setUint32(0, 0x04034b50, true);
    v.setUint16(4, 20, true);
    v.setUint16(6, 0x800, true);
    v.setUint32(14, sum, true);
    v.setUint32(18, data.length, true);
    v.setUint32(22, data.length, true);
    v.setUint16(26, name.length, true);
    v.setUint16(28, extra.length, true);
    h.set(name, 30);
    h.set(extra, 30 + name.length);
    parts.push(h, data);
    const c = new Uint8Array(46 + name.length + extra.length),
      w = new DataView(c.buffer);
    w.setUint32(0, 0x02014b50, true);
    w.setUint16(4, 20, true);
    w.setUint16(6, 20, true);
    w.setUint16(8, 0x800, true);
    w.setUint32(16, sum, true);
    w.setUint32(20, data.length, true);
    w.setUint32(24, data.length, true);
    w.setUint16(28, name.length, true);
    w.setUint32(42, offset, true);
    w.setUint16(30, extra.length, true);
    c.set(name, 46);
    c.set(extra, 46 + name.length);
    central.push(c);
    offset += h.length + data.length;
  }
  const size = central.reduce((n, c) => n + c.length, 0),
    end = new Uint8Array(22),
    v = new DataView(end.buffer);
  v.setUint32(0, 0x06054b50, true);
  v.setUint16(8, files.length, true);
  v.setUint16(10, files.length, true);
  v.setUint32(12, size, true);
  v.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], { type: "application/zip" });
}
