import { promises as fs } from 'fs'
import { renderToString } from "react-dom/server";
import { type Resume } from "resume-schema-zod/dist/lib";
import { ResumeComponent } from './ResumeComponent';

export default async function render(resume: Resume) {
    const css = await fs.readFile(import.meta.dir + '/style.css', 'utf-8')
    return await renderToString(
        <html>
            <head>
                <title>{resume.basics?.name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <style>
                    {css}
                </style>
            </head>
            <body>
                <ResumeComponent resume={resume} />
            </body>
        </html>
    )
}

