import type { ResumeType } from "./ResumeType";
import { format, parseISO } from "date-fns";

const DATE_FORMAT = 'LLL yyyy'

export function Resume({resume}: {resume: ResumeType}) {
    return <main>
        <h1>{resume.basics.name}</h1>
        <p><b>{resume.basics.label}</b></p>
        <p>{resume.basics.summary}</p>
        <section>
            <h2>Work Experience</h2>
            {resume.work.map((work, idx) => {
                return <Work key={idx} work={work} />
            })}
        </section>
        <br />
        <br />
        <br />
        <br />
    </main>
}

function Work({work}: {work: ResumeType['work'][number]}) {
    return <article className="Work">
        <h3>{work.name}</h3>
        <p>
            <span className='Work__position'>
                {work.position}
            </span>{' '}
            <span className="Work__dates">
                {format(parseISO(work.startDate), DATE_FORMAT)} - {work.endDate || 'Present'}
            </span>
        </p>        
        <p>{work.summary}</p>
    </article>
}