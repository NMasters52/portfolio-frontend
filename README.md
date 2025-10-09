# Portfolio Website


Welcome to my webdevelopment frontend portfolio. Built with React Router v7 for seamless navigation, server-side rendering (SSR) for fast initial loads, and Strapi as a headless CMS for dynamic content management. The frontend and backend are decoupled for scalability, with smooth animations and optimized performance.

Live Demo: [View it here!](https://portfolio-frontend-omega-indol.vercel.app)

## Features

- Dynamic Content: Blog posts and project details loaded via Strapi CMS, with loaders for efficient data fetching and error handling (e.g., 404s for missing content).

- Projects Section: Interactive filtering with Framer Motion animations for smooth transitions between categories (e.g., all, web, mobile).

- Contact Form: Powered by Formspree.io for serverless form submissions, with client-side validation and success/error feedback.

- SSR Optimization: Server-side rendering ensures fast first-page loads, SEO-friendly content, and hydration on the client.

- Responsive Design: Mobile-first layout built using Tailwind CSS.

- Media Handling: Project images stored and optimized on Cloudinary for quick loading and CDN delivery.

## Tech Stack

- Frontend Framework: React with React Router v7 (SSR mode, loaders/actions for data management)

- Styling: Tailwind CSS (with Typography plugin for markdown rendering)

- Animations: Framer Motion (for project filtering and subtle UI transitions)

- CMS/Backend: Strapi (headless CMS for blog posts and project data)

- Forms: Formspree.io (serverless contact form handling)

- Images: Cloudinary (cloud storage and optimization for portfolio assets)

- TypeScript: Full type safety for props, loaders, and API responses

- Other: React Markdown (for blog post rendering), React Icons (for UI elements)

Architecture


## This project uses a decoupled architecture:

- Backend (Strapi): A separate repo handling content via REST APIs. Hosted on Render for easy scaling and environment variables (e.g., API keys).

- Frontend: This repo fetches data from Strapi using Promise.all in loaders for parallel API calls. SSR is enabled via React Router's server-side capabilities, ensuring content is pre-rendered on the server.

- Data Flow:
	1. Loaders fetch Strapi data (e.g., projects, blog posts) during navigation/SSR.

	2. Actions handle form submissions (e.g., contact form via Formspree).

	3. Errors (e.g., 404s) are thrown as Response objects for clean HTTP handling.


- Why Decoupled?: Allows independent scaling—update Strapi content without touching the frontend, and vice versa. Integrates well with headless tools like Cloudinary for media.

### Repo Structure (Frontend):


	src/
	├── app/          # React Router v7 routes (e.g., /projects, /blog)
	├── components/   # Reusable UI (e.g., ProjectCard, ContactForm)
	├── types/        # TypeScript definitions (e.g., Project, PostMeta)
	├── posts/        # Markdown files for blog (imported dynamically)
	└── utils/        # Helpers (e.g., date formatting)
