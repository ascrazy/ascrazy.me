import { promises as fs } from 'fs'
import { renderToString } from "react-dom/server";
import type { ResumeType } from "./ResumeType";
import { Resume } from "./Resume";

export async function render(resume: ResumeType) {
    const css = await fs.readFile(import.meta.dir + '/style.css', 'utf-8')
    return await renderToString(
        <html>
            <head>
                <title>{resume.basics.name}</title>
                <style>
                    {css}                    
                </style>
            </head>
            <body>
                <Resume resume={resume} />
            </body>
        </html>        
    )
}

