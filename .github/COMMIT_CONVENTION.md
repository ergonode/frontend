## Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).


### Commit Message Format

Each commit message consists of a **header**, and **body**.

The message header is a single line that contains a succinct description of the change containing a **type**, an *OPTIONAL* **scope**, and a **subject**.


The commit message should be structured as follows:

```
<type>(<optional scope>): <subject>
<BLANK LINE>
<optional body>
```

1. Commits *MUST* be prefixed with a **type**, which consists of a noun, `feature`, `bugfix`, etc., followed by the *OPTIONAL* **scope**.
2. Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.


### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.


### Type

*MUST* be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and scripts
* **docs**: Documentation only changes
* **feature**: Introduces a new feature to the codebase
* **bugfix**: Patches a bug in codebase
* **performance**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope

A **scope** *MUST* consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., `bugfix(core):`

The following is the list of examples scopes:

* **core**
* **microservices**
* **attributes**
* **products**
* **categories**
* **templates**
* **e.g.**


### Subject

The subject contains a succinct description of the change:

1. A **subject** *MUST* use the imperative, present tense: "change" not "changed" nor "changes"
2. A **subject** *MUST* immediately follow the colon and space after the **type/scope** prefix. The **subject** is a short summary of the code changes, e.g., `fix: array parsing issue when multiple spaces were contained in string`.
3. A **subject** *SHOULD NOT* capitalize the first letter
4. A **subject** *SHOULD NOT* dot (.) at the end of the line.

### Body

1. Just as in the **subject**, **body** *MUST* use the imperative, present tense: "change" not "changed" nor "changes".
2. The **body** should include the motivation for the change and contrast this with previous behavior.
2. A longer commit **body** *MAY* be provided after the **subject**, providing additional contextual information about the code changes. The **body** *MUST* begin one blank line after the description.
3. A commit **body** is free-form and *MAY* consists of any number of newline-separated paragraphs.


### Examples

Appears under "Features" header, `compiler` subheader:


```
feat(compiler): add 'comments' option
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(core): improve v-model diffing by removing 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.


```
revert: feat(compiler): add 'comments' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
