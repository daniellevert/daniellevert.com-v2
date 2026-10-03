# Repository Instructions

## Development workflow

- Follow the branch naming convention documented in `README.md`.
- Keep changes focused and avoid unrelated dependency or formatting updates.
- Before handing off code changes, run `npm run lint`, `npm test`, `npm run build`, and `git diff --check`.
- Treat existing Sass legacy API and Vite glob deprecation messages as known warnings unless the task addresses them.

## Pull requests

- Use `.github/pull_request_template.md` as the structure for every pull request description.
- Write the description as a cohesive, current summary of the entire diff against the base branch.
- After materially updating a pull request, review the full diff and decide whether its title or description has become incomplete or stale. Update them when needed.
- Revise existing sections instead of appending a chronological bullet for every commit. The description should explain the resulting behavior and implementation, not reproduce commit history.
- Remove or rewrite statements that are no longer true, and keep testing checkboxes synchronized with checks actually performed.
- Include important user-visible behavior, architectural changes, CI or deployment changes, tests, known limitations, and follow-up work when they are relevant to the overall pull request.
- Do not change a description merely because a new commit exists when the existing description already represents the complete pull request accurately.

## Code review

- Prioritize correctness, accessibility, responsive behavior, maintainability, and regressions.
- Report actionable findings with a concrete failure case and avoid posting preference-only comments as defects.
- Confirm that pull-request checks for lint, tests, and build pass before recommending merge.
