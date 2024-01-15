export type ResumeType = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
        name: string;
        label: string;
        image: string;
        email: string;
        phone: string;
        url: string;
        summary: string;
        location: {
            countryCode: string;
            address: string;
        };
        profiles: {
            network: string;
            username: string;
            url: string;
        }[];
    };
    work: {
        name: string;
        position: string;
        startDate: string;
        endDate: string;
        highlights: unknown[];
        summary: string;
        url: string;
    }[];
    volunteer: unknown[];
    education: {        
        institution: string;
        area: string;
        studyType: string;
        startDate: string;
        endDate: string;
        score: string;
        courses: unknown[]          
    }[];
    awards: unknown[];
    certificates:{
        name: string;
        issuer: string;
        startDate: string;
        url: string;
        
    }[];
    publications: unknown[];
    skills: {
        name: string;
        level: string;
        keywords: unknown[]
    }[];
    languages: {
        language: string;
        fluency: string;
    }[];
    interests: unknown[];
    references: unknown[];
    projects: unknown[];
    meta: {
        version: "v1.0.0",
        canonical: "https://github.com/jsonresume/resume-schema/blob/v1.0.0/schema.json"
    }
}