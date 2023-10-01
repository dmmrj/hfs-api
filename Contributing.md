# Contributing

**Thanks for taking the time to contribute!**

PRs and bug reports are welcome, and we are actively looking for new maintainers.

## Setting Up Dev Environment

The **master** branch is the active development branch.

this api requires node.js `>=8`.

```bash
git checkout master

```


## Pull Requests

Any intended change to the code base must open a [pull request](https://help.github.com/articles/creating-a-pull-request/) and be approved. 

Generally speaking, all PRs are open against the `master` branch, unless the feature being affected no longer exists on master.

### PR Checklist


  + New code should be covered by unit tests whenever possible.
- [ ] Documentation
  + If public APIs are added/modified, update component documentation in `docs/api-reference`.
  + Breaking changes and deprecations must be added to `docs/upgrade-guide.md`.
  + Noteworthy new features should be added to `docs/whats-new.md`.
- [ ] Description on GitHub
  + Link to relevant issue.
  + Label with a milestone (latest release or vNext).
  + If public APIs are added/modified, describe the intended behavior.
  + If visual/interaction is affected, consider attaching a screenshot/GIF.


## Release

This API follows the [Semantic Versioning](https://semver.org/) guidelines. Steps for publishing releases can be found [here](https://www.github.com/visgl/tsc/tree/master/developer-process).


### Maintainers

- [Bruno Moreira](https://github.com/bmmoreira)
- [Daniel M Moreira](https://github.com/dmmrj)
- [Codex](https://github.com/CodexKoder)

Maintainers of hfs-api have commit access to this GitHub repository, and take part in the decision making process.


## Code of Conduct

Please be mindful of and adhere to the Linux Foundation's [Code of Conduct](https://lfprojects.org/policies/code-of-conduct/) when contributing to this api.
