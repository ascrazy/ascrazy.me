import { promises as fs } from "fs";
import { renderToString } from "react-dom/server";
import { type Resume } from "resume-schema-zod/dist/lib";
import { ResumeComponent } from "./ResumeComponent";

export default async function render(resume: Resume) {
	const css = await fs.readFile(`${import.meta.dir}/style.css`, "utf-8");
	return await renderToString(
		<html lang="en">
			<head>
				<title>{resume.basics?.name}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<style>{css}</style>
			</head>
			<body>
				<div
					style={{
						maxWidth: "768px",
						margin: "0 auto",
						padding: "0 16px",
					}}
				>
					<ResumeComponent resume={resume} />
				</div>
			</body>
		</html>,
	);
}
