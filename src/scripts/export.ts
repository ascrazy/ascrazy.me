import fs from 'node:fs/promises';
import { parseFromString } from 'resume-schema-zod/dist/lib'
import render from '../theme'

const INPUT_FILE = './data/resume.json'
const OUTPUT_FILE = './public/index.html'

const tag = `exported ${INPUT_FILE} to ${OUTPUT_FILE}`

async function main() {
  console.time(tag)
  const buffer = await fs.readFile(INPUT_FILE)
  const resume = parseFromString(buffer.toString())
  const html = await render(resume)
  await fs.writeFile(OUTPUT_FILE, html)
  console.timeEnd(tag)
}

main()