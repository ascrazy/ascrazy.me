import { format, parseISO } from "date-fns";
import type { Resume } from "resume-schema-zod/dist/lib";
import { prettyUrl } from "./prettyUrl";
import { toSlug } from "./toSlug";

const DATE_FORMAT = "LLL yyyy";

export function ResumeComponent({ resume }: { resume: Resume }) {
	return (
		<main className="max-w-3xl pb-20">
			{resume.basics && (
				<>
					<h1 className="text-3xl font-bold mb-2">{resume.basics.name}</h1>
					<p className="mb-4">
						<b>{resume.basics.label}</b>
					</p>
					<p>{resume.basics.summary}</p>
					{resume.basics.profiles && resume.basics.profiles.length > 0 && (
						<section id="profiles" className="mt-4">
							<ul>
								{resume.basics.profiles.map((profile) => {
									if (!profile.url) {
										return null;
									}

									return (
										<li key={profile.url}>
											<a
												href={profile.url}
												className="text-blue-600 hover:text-blue-800"
												rel="noopener noreferrer"
											>
												{prettyUrl(profile.url)}
											</a>
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
					<h2 className="text-2xl font-bold mt-8 mb-4">Work Experience</h2>
					{resume.work.map((work, idx) => (
						// biome-ignore lint: lint/suspicious/noArrayIndexKey
						<Work key={idx} work={work} />
					))}
				</section>
			)}
		</main>
	);
}

function Work({ work }: { work: NonNullable<Resume["work"]>[number] }) {
	return (
		<article className="mb-8" id={`work-${toSlug(work.name ?? "")}}`}>
			<CompanyLink work={work}>
				<h3 className="text-xl font-semibold">{work.name}</h3>
			</CompanyLink>
			<p className="my-2">
				<span className="font-bold">{work.position}</span>{" "}
				<span className="text-gray-300 mx-2" aria-hidden="true">
					•
				</span>{" "}
				<span className="text-sm italic text-gray-600">
					{format(parseISO(work.startDate), DATE_FORMAT)} -{" "}
					{work.endDate
						? format(parseISO(work.endDate), DATE_FORMAT)
						: "Present"}
				</span>
			</p>
			<p className="text-gray-700">{work.summary}</p>
		</article>
	);
}

function CompanyLink({
	work,
	children,
}: {
	work: NonNullable<Resume["work"]>[number];
	children: React.ReactNode;
}) {
	if (work.url) {
		return (
			<a
				href={work.url}
				rel="noopener noreferrer"
				className="text-blue-600 hover:text-blue-800"
			>
				{children}
			</a>
		);
	}

	return children;
}
