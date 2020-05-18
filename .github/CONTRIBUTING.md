# Contributing Guide

Yoo! We're really excited that you are interested in contributing to Ergonode.
As a contributor, here are the guidelines we would like you to follow:

* [Code of Conduct](#coc)
* [Question or Problem?](#question)
* [Issues and Bugs](#issue)
* [Coding Rules](#rules)
* [Pull Request Guidelines](#submit-pr)
* [Committing Changes](#cc)

## <a name="coc"></a> Code of Conduct
Please read and follow our [Code of Conduct][coc].


## <a name="question"></a> Got a Question or Problem?

**Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.**
You've got much better chances of getting your question answered on our [slack][slack] channel.


## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our [GitHub Repository][github].

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **should be tested** by one or more specs (unit-tests).
* Add **e2e** tests if needed.
* All features should have **documentation**.


## <a name="submit-pr"></a> Pull Request Guidelines

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `develop`, and merge back against that branch.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- Make sure all tests pass. (see [development setup](#development))

- Make sure the documentation is up to date

- If adding a new feature:
  - Add accompanying test case if needed.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
  - Add `(#xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log.

- If fixing bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #1234)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## <a name="cc"></a>Committing Changes

Commit messages should follow the [commit message convention][cc].

## Credits

Thank you to all the people who have already contributed to Ergonode!

[coc]: https://github.com/ergonode/frontend/blob/develop/.github/CODE_OF_CONDUCT.md
[cc]: https://github.com/ergonode/frontend/blob/develop/.github/COMMIT_CONVENTION.md
[github]: https://github.com/ergonode/frontend
[submit-issue]: https://github.com/ergonode/frontend/issues
[slack]: https://ergonode.slack.com/join/shared_invite/enQtOTA2ODY0ODMxNTI0LThlZGE2YWE0YzY4NzU1ODk3NWRmNTJiMGI2NmM5ZTgxYTk0MWRhMjM1Y2M4MjdjZjAxY2FkOWE1M2FhZmJkMDY
