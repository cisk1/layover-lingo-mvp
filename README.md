# Layover Lingo MVP

A Next.js application for language learning during layovers.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Prerequisites

1. Push your code to a GitHub repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically by the workflow)
   - Folder: `/ (root)`

### Automatic Deployment

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:
1. Build the Next.js application
2. Export it as static files
3. Deploy to GitHub Pages

Simply push to the `main` branch and the deployment will happen automatically.

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The static files will be in the `out/` directory
# You can then upload these files to GitHub Pages
```

## Configuration

The project is configured for static export with:
- `output: 'export'` in `next.config.mjs`
- `basePath` set for GitHub Pages deployment
- `trailingSlash: true` for proper routing

## Local Testing

To test the production build locally:

```bash
npm run build
npx serve out
```

Your site will be available at `http://localhost:3000` 