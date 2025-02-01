import { promises as fs } from "fs";
import tailwindPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import { renderToString } from "react-dom/server";
import { type Resume } from "resume-schema-zod/dist/lib";
import { ResumeComponent } from "./ResumeComponent";

export default async function render(resume: Resume) {
	// Process Tailwind CSS
	const rawCss = await fs.readFile(`${import.meta.dir}/main.css`, "utf-8");
	const result = await postcss([
		tailwindPostcss({ base: __dirname }),
		autoprefixer,
	]).process(rawCss, {
		from: `${import.meta.dir}/main.css`,
	});

	const css = result.css;

	return renderToString(
		<html lang="en">
			<head>
				<title>{resume.basics?.name}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<style>{css}</style>
			</head>
			<body className="p-4">
				<div className="flex flex-col items-center">
					<ResumeComponent resume={resume} />
				</div>
			</body>
		</html>,
	);
}
