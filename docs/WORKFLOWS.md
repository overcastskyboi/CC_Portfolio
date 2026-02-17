# GitHub Actions Workflows

This project uses GitHub Actions for continuous integration and deployment. The following workflows are available:

## ci-cd.yml

This workflow runs on every push and pull request to the main branch. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Runs tests
5. Builds the application

### Triggers
- Push to any branch
- Pull request to main branch

### Jobs
- **test**: Runs tests on Node.js versions 18.x and 20.x
- **deploy**: Deploys to GitHub Pages when changes are pushed to main branch

## publish.yml

This workflow runs when a new GitHub release is created. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Publishes to npm registry
5. Publishes to GitHub Packages

### Triggers
- Release created

### Jobs
- **build**: Runs tests and builds the application
- **publish-npm**: Publishes to npm registry
- **publish-gpr**: Publishes to GitHub Packages

## Workflow Configuration

Both workflows are configured to:
- Use Ubuntu latest runners
- Cache npm dependencies for faster builds
- Use Node.js 20 for the main build process
- Run tests before deployment
- Deploy to GitHub Pages on successful builds