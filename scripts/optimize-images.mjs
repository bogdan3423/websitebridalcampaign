import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const root = path.join(process.cwd(), "public/images");
const output = path.join(root, "responsive");
await mkdir(output, { recursive: true });
const files = (await readdir(root)).filter((file) =>
  /\.(webp|png|jpe?g)$/i.test(file),
);
for (const file of files) {
  const name = file.replace(/\.[^.]+$/, "");
  await Promise.all(
    [320, 480, 768, 1200, 1600].map((width) =>
      sharp(path.join(root, file))
        .rotate()
        .resize({ width })
        .webp({ quality: 78 })
        .toFile(path.join(output, `${name}-${width}.webp`)),
    ),
  );
}
console.log(
  `Imagini responsive pregătite: ${files.length} fotografii, 5 dimensiuni fiecare.`,
);
