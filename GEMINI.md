# GEMINI.md

## Project Overview

This project is a personal development blog built with [Docusaurus](https://docusaurus.io/), a modern static website generator. The blog is written in Markdown (MDX) and contains articles about software development. The site is configured to use Vercel Analytics for tracking.

## Building and Running

### Prerequisites

- Node.js (version >=18.0)
- yarn

### Installation

```bash
yarn
```

### Local Development

To start the local development server:

```bash
yarn start
```

This will open a browser window with the blog running locally. Most changes will be reflected live without needing to restart the server. A prestart script (`scripts/generate-blog-data.mjs`) runs to generate blog data.

### Building

To build the static site for production:

```bash
yarn build
```

The output will be in the `build` directory. A prebuild script (`scripts/generate-blog-data.mjs`) runs to generate blog data.

### Deployment

The project can be deployed using SSH or by specifying a Git user.

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

## Development Conventions

- **Content:** Blog posts are located in the `blog` directory and are written in MDX.
- **Styling:** Custom styles are located in `src/css/custom.css`.
- **Theming:** The Docusaurus theme is customized in the `src/theme` directory. The `Root.tsx` file wraps the site with Vercel Analytics.
- **Static Assets:** Static assets like images are in the `static` directory.
- **Data:** The `scripts/generate-blog-data.mjs` script generates blog post data into `src/data/blog-posts.json`.
- **Type Checking:** The project uses TypeScript. Run `yarn typecheck` to check for type errors.
