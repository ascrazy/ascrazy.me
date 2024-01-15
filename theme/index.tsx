import { renderToString } from "react-dom/server";
import type { ResumeType } from "./ResumeType";
import { Resume } from "./Resume";

export async function render(resume: ResumeType) {
    return await renderToString(
        <html>
            <head>
                <title>{resume.basics.name}</title>
            </head>
            <body>
                <Resume resume={resume} />
            </body>
        </html>        
    )
}

