import { type Resume } from 'resume-schema-zod/dist/lib'

export function ResumeComponent({ resume }: { resume: Resume }) {
    return <main>
        <h1>{resume.basics?.name}</h1>
        <p>{resume.basics?.label}</p>
        <p>{resume.basics?.summary}</p>
        <section>
            <h2>Work Experience</h2>
            {resume.work?.map((work, idx) => {
                return <Work key={idx} work={work} />
            })}
        </section>
    </main>
}

function Work({ work }: { work: NonNullable<Resume['work']>[number] }) {
    return <article>
        <h3>{work.name}</h3>
        <p>
            <span className='position'>
                {work.position}
            </span>{' '}
            <span className="dates">
                {work.startDate} - {work.endDate || 'Present'}
            </span>
        </p>
        <p>{work.summary}</p>
    </article>
}