export type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    category: string;
    date: string;
    featured: boolean;
}

export type PostMeta = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
}