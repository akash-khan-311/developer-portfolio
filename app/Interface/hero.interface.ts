

export type TSocialLink = {
    facebook: string;
    twitter: string;
    linkedin: string;
    github: string;
}

export type THero = {
    name: string;
    slug: string[];
    socialLinks:TSocialLink;
    resume: string;
}