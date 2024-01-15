import type { ResumeType } from "./ResumeType";

export function Resume({resume}: {resume: ResumeType}) {
    return <main>
        <h1>{resume.basics.name}</h1>
        <p>{resume.basics.label}</p>
        <p>{resume.basics.summary}</p>
        <section>
            <h2>Work Experience</h2>
            {resume.work.map((work, idx) => {
                return <Work key={idx} work={work} />
            })}
        </section>
    </main>
}

function Work({work}: {work: ResumeType['work'][number]}) {
    return <article>
        <h3>{work.name}</h3>
        <p>{work.position} {work.startDate}{work.endDate && <> - {work.endDate}</>}</p>        
        <p>{work.summary}</p>
    </article>
}