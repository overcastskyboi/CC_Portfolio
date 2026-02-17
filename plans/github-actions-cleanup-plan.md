# GitHub Actions Cleanup Plan for CherryOS

## Project Overview
CherryOS is a React + Vite application with Tailwind CSS that simulates a desktop OS environment in the browser.

## Current Workflows Analysis
1. `.github/workflows/astro.yml` - Not relevant (Astro static site generator)
2. `.github/workflows/jekyll-docker.yml` - Not relevant (Jekyll static site generator)
3. `.github/workflows/npm-publish-github-packages.yml` - Relevant for publishing (GitHub Packages)
4. `.github/workflows/npm-publish.yml` - Relevant for publishing (NPM Registry)
5. `.github/workflows/webpack.yml` - Not relevant (Webpack bundler)

## Recommended Actions

### 1. Remove Irrelevant Workflows
Delete the following files as they don't apply to this React + Vite project:
- `.github/workflows/astro.yml`
- `.github/workflows/jekyll-docker.yml`
- `.github/workflows/webpack.yml`

### 2. Consolidate Publishing Workflows
Merge the two publishing workflows into a single workflow that can publish to both NPM and GitHub Packages:
- `.github/workflows/npm-publish-github-packages.yml`
- `.github/workflows/npm-publish.yml`

### 3. Create Proper CI/CD Workflow
Create a new CI/CD workflow for the React application that includes:
- Dependency installation
- Code linting/testing
- Build verification
- Deployment to GitHub Pages

## Proposed New Workflow Structure

### cherryos-ci-cd.yml
This workflow will handle continuous integration and deployment for the CherryOS React application:
- Run on push to main branch and pull requests
- Install dependencies
- Run build to verify no errors
- Deploy to GitHub Pages on push to main

```yaml
name: CherryOS CI/CD

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  ci:
    name: CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run build
        run: npm run build

  deploy:
    name: Deploy to GitHub Pages
    needs: ci
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      pages: write
      id-token: write
    concurrency:
      group: "pages"
      cancel-in-progress: false
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### publish.yml
This workflow will handle package publishing:
- Trigger on release creation
- Publish to both NPM and GitHub Packages

```yaml
name: Publish CherryOS

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}

  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://npm.pkg.github.com/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

## Implementation Steps
1. Remove irrelevant workflow files
2. Create consolidated publishing workflow
3. Create CI/CD workflow for the React application
4. Update workflow names and descriptions to match project
5. Test workflows to ensure proper functionality