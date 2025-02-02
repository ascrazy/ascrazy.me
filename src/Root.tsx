import { ResumeComponent } from "./ResumeComponent";

import resume from "./resume.json";

export function Root() {
	return <ResumeComponent resume={resume} />;
}
