import { readdir, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const jobs = [
  {
    input: path.join(process.cwd(), "public/images"),
    output: path.join(process.cwd(), "public/images/responsive"),
    widths: [320, 480, 768, 1200, 1600],
    quality: 78,
  },
  {
    input: path.join(process.cwd(), "assets/portfolio"),
    output: path.join(process.cwd(), "public/images/portfolio/responsive"),
    widths: [480, 768, 1200, 1600],
    quality: 76,
  },
];

for (const job of jobs) {
  await rm(job.output, { recursive: true, force: true });
  await mkdir(job.output, { recursive: true });
  const files = (await readdir(job.input)).filter((file) =>
    /\.(webp|png|jpe?g)$/i.test(file),
  );

  for (const file of files) {
    const name = file.replace(/\.[^.]+$/, "");
    await Promise.all(
      job.widths.map((width) =>
        sharp(path.join(job.input, file))
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: job.quality })
          .toFile(path.join(job.output, `${name}-${width}.webp`)),
      ),
    );
  }

  console.log(
    `Imagini responsive pregătite: ${files.length} fotografii, ${job.widths.length} dimensiuni fiecare.`,
  );
}
