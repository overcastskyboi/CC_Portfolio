# CherryOS Version Control Best Practices

This document outlines the version control strategies and best practices for the CherryOS project.

## Table of Contents

1. [Branching Strategy](#branching-strategy)
2. [Commit Message Conventions](#commit-message-conventions)
3. [Release Management](#release-management)
4. [Git Workflow](#git-workflow)
5. [Code Review Process](#code-review-process)
6. [Tagging Conventions](#tagging-conventions)
7. [Repository Organization](#repository-organization)
8. [Collaboration Guidelines](#collaboration-guidelines)

## Branching Strategy

CherryOS follows a simplified Git branching model based on GitHub Flow:

### Main Branches

- **main**: Production-ready code only
  - Always stable
  - Direct deployment source
  - Protected branch with required reviews

### Supporting Branches

- **feature/*: New feature development
  - Branched from main
  - Merged back via pull request
  - Named descriptively (e.g., feature/user-authentication)

- **bugfix/*: Bug fixes for production issues
  - Branched from main
  - Merged back via pull request
  - Named with issue reference (e.g., bugfix/issue-123-login-error)

- **hotfix/*: Urgent production fixes
  - Branched from the latest tag
  - Merged to both main and development
  - Named with issue reference (e.g., hotfix/critical-security-patch)

### Branch Naming Conventions

```
feature/add-user-profile
feature/improve-terminal-ui
bugfix/fix-window-drag-issue
hotfix/security-vulnerability-patch
```

## Commit Message Conventions

Follow the conventional commits specification for consistent, readable commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Maintenance tasks
- **revert**: Reverting previous commits

### Examples

```
feat(terminal): add command history navigation

Users can now use up/down arrows to navigate through command history
in the terminal application.

Resolves #123
```

```
fix(windows): resolve drag positioning issue on mobile

Fixed incorrect positioning calculation when dragging windows on
mobile devices due to touch event coordinate differences.

Fixes #456
```

```
docs(readme): update deployment instructions

Added detailed deployment procedures and environment variable
configuration examples.
```

## Release Management

### Versioning Scheme

CherryOS follows Semantic Versioning (SemVer):

```
MAJOR.MINOR.PATCH

Major: Breaking changes
Minor: New features (backward compatible)
Patch: Bug fixes (backward compatible)
```

### Release Process

1. **Pre-release Checklist**
   - All features complete and tested
   - Documentation updated
   - CHANGELOG.md updated
   - Version numbers updated

2. **Create Release Branch**
   ```bash
   git checkout -b release/v2.1.0 main
   ```

3. **Version Bump**
   - Update package.json version
   - Update any version references in documentation

4. **Final Testing**
   - Run complete test suite
   - Manual testing of critical paths
   - Performance checks

5. **Merge to Main**
   ```bash
   git checkout main
   git merge release/v2.1.0
   ```

6. **Create Tag**
   ```bash
   git tag -a v2.1.0 -m "Release version 2.1.0"
   git push origin v2.1.0
   ```

7. **Publish Release**
   - Create GitHub release
   - Upload build artifacts
   - Announce release

## Git Workflow

### Daily Development Workflow

1. **Sync with upstream**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/new-component-design
   ```

3. **Develop and commit**
   ```bash
   git add .
   git commit -m "feat(components): add new window component"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/new-component-design
   ```

5. **Address feedback and merge**
   - Address code review comments
   - Rebase if needed
   - Merge via GitHub UI

### Handling Conflicts

When rebasing on main:
```bash
git fetch origin
git rebase origin/main
# Resolve conflicts
git rebase --continue
git push --force-with-lease
```

### Keeping Branches Up-to-date

```bash
git checkout feature/my-feature
git fetch origin
git rebase origin/main
```

## Code Review Process

### Review Checklist

**Functionality**
- [ ] Code meets requirements
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] Performance considerations addressed

**Code Quality**
- [ ] Follows project coding standards
- [ ] Adequate comments and documentation
- [ ] Consistent naming conventions
- [ ] No unnecessary complexity

**Testing**
- [ ] Unit tests added/updated
- [ ] Component tests cover new functionality
- [ ] Integration tests updated if needed
- [ ] Test coverage maintained

**Security**
- [ ] No hardcoded secrets
- [ ] Input validation in place
- [ ] XSS/CSRF protections considered
- [ ] Authentication/authorization reviewed

### Review Process

1. **Author** creates PR with:
   - Clear title and description
   - Related issue references
   - Screenshots for UI changes
   - Test results summary

2. **Reviewers** assigned based on:
   - Component ownership
   - Expertise areas
   - Availability

3. **Review iterations**:
   - Address comments with new commits
   - Request re-review when ready
   - Approve when satisfied

4. **Merge requirements**:
   - Minimum 1 approval
   - All discussions resolved
   - CI checks passing
   - Up-to-date with main branch

## Tagging Conventions

### Release Tags

Format: `v<MAJOR>.<MINOR>.<PATCH>`

Examples:
- v1.0.0 (initial release)
- v1.2.3 (patch release)
- v2.0.0 (major version)

### Pre-release Tags

Format: `v<MAJOR>.<MINOR>.<PATCH>-<pre-release>`

Examples:
- v2.0.0-alpha.1
- v2.0.0-beta.2
- v2.0.0-rc.1

### Annotation

All tags should be annotated with meaningful messages:
```bash
git tag -a v2.1.0 -m "Version 2.1.0 - Enhanced window management and new applications"
```

## Repository Organization

### Directory Structure

```
cherryos/
├── docs/                    # Documentation files
├── public/                  # Static assets
├── src/                     # Source code
│   ├── components/          # Shared components
│   ├── apps/                # Application components
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── styles.css           # Global styles
├── .github/                 # GitHub configurations
│   └── workflows/           # CI/CD workflows
├── .vscode/                 # VS Code settings
├── docs/                    # Project documentation
├── tests/                   # Test files
├── .gitignore
├── package.json
└── README.md
```

### Documentation Organization

All documentation files reside in the `docs/` directory:
- README.md (symlink or copy in root)
- CONTRIBUTING.md
- ARCHITECTURE.md
- API_REFERENCE.md
- DEPLOYMENT.md
- TESTING.md
- VERSION_CONTROL.md

## Collaboration Guidelines

### Communication

- Use GitHub Issues for feature requests and bug reports
- Use GitHub Discussions for general questions and community interaction
- Use Pull Request descriptions for implementation details
- Update project boards regularly

### Issue Management

**Labels:**
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority-high`: Should be addressed soon
- `priority-low`: Nice to have but not urgent

**Milestones:**
- Group related issues for releases
- Set target dates
- Track progress

### Pull Request Etiquette

1. **Keep PRs focused**
   - One feature/bug fix per PR
   - Small, incremental changes preferred
   - Clear scope and objective

2. **Provide context**
   - Link to related issues
   - Explain the problem being solved
   - Describe the solution approach
   - Include screenshots for UI changes

3. **Write good descriptions**
   - Use template if available
   - Include testing instructions
   - Mention breaking changes
   - Note dependencies

4. **Respond to feedback**
   - Address all comments
   - Ask questions if unclear
   - Make requested changes promptly
   - Thank reviewers for their time

### Conflict Resolution

When disagreements arise:

1. **Technical discussions**
   - Focus on facts and data
   - Consider alternatives objectively
   - Seek consensus through discussion
   - Escalate to maintainers if needed

2. **Process issues**
   - Document recurring problems
   - Propose process improvements
   - Get team agreement on changes
   - Update this document accordingly

## Best Practices Summary

### DOs

- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Update documentation with code changes
- Follow established coding standards
- Test your changes thoroughly
- Use feature branches for all work
- Keep PRs small and focused
- Respond promptly to review feedback

### DON'Ts

- Don't commit directly to main branch
- Don't include unrelated changes in commits
- Don't ignore failing tests
- Don't merge未经 review的代码
- Don't use vague commit messages
- Don't leave debugging code in production
- Don't force push to shared branches
- Don't skip the CI/CD pipeline

## Tools and Integrations

### Git Hooks

Recommended pre-commit hooks:
- ESLint/Prettier for code formatting
- Test execution
- Security scanning
- Commit message validation

### GitHub Integrations

- Dependabot for dependency updates
- Code coverage reporting
- CI/CD status checks
- Automated release notes

### Local Development Tools

- Git GUI clients for visual history
- Diff tools for reviewing changes
- Git aliases for common operations
- Pre-commit hook frameworks

## Conclusion

Following these version control best practices will help maintain a clean, organized, and collaborative development environment for CherryOS. Consistency in branching, committing, and reviewing ensures that the project history remains valuable for both current and future contributors.