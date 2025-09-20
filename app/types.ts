export type Project = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  date: string;
  featured: boolean;
};

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image?: {
    formats?: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
    url?: string;
  };
  url: string;
  category: string;
  date: string;
  featured: boolean;
};
