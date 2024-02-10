import { format, parseISO } from "date-fns";
import { type Resume } from "resume-schema-zod/dist/lib";
import { prettyUrl } from "./prettyUrl";
import { toSlug } from "./toSlug";

const DATE_FORMAT = "LLL yyyy";

export function ResumeComponent({ resume }: { resume: Resume }) {
	return (
		<main>
			{resume.basics && (
				<>
					<h1>{resume.basics.name}</h1>
					<p>
						<b>{resume.basics.label}</b>
					</p>
					<p>{resume.basics.summary}</p>
					{resume.basics.profiles && resume.basics.profiles.length > 0 && (
						<section id="profiles">
							<ul>
								{resume.basics.profiles.map((profile, idx) => {
									if (!profile.url) {
										return null;
									}

									return (
										<li key={profile.url}>
											<a href={profile.url}>{prettyUrl(profile.url)}</a>
										</li>
									);
								})}
							</ul>
						</section>
					)}
				</>
			)}
			{resume.work && resume.work.length > 0 && (
				<section id="work">
					<h2>Work Experience</h2>
					{resume.work.map((work, idx) => {
						// biome-ignore lint: lint/suspicious/noArrayIndexKey
						return <Work key={idx} work={work} />;
					})}
				</section>
			)}
		</main>
	);
}

function Work({ work }: { work: NonNullable<Resume["work"]>[number] }) {
	return (
		<article className="Work" id={`work-${toSlug(work.name ?? "")}}`}>
			<CompanyLink work={work}>
				<h3>{work.name}</h3>
			</CompanyLink>
			<p>
				<span className="Work__meta__position">{work.position}</span>{" "}
				<span className="Work__meta__divider" aria-hidden="true">
					•
				</span>{" "}
				<span className="Work__meta__dates">
					{format(parseISO(work.startDate), DATE_FORMAT)} -{" "}
					{work.endDate || "Present"}
				</span>
			</p>
			<p>{work.summary}</p>
		</article>
	);
}

function CompanyLink({
	work,
	children,
}: { work: NonNullable<Resume["work"]>[number]; children: React.ReactNode }) {
	if (work.url) {
		return (
			<a href={work.url} rel="noopener noreferrer">
				{children}
			</a>
		);
	}

	return children;
}
