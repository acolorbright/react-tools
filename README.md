# ACB React tools

This repo contains ACB's tools used with React

## Installation

```
npm install
npx lerna bootstrap
```

`npm install` installs the root dependencies of the project
`npx lerna bootstrap` installs the packages in the `packages` folder and locally links them where necessary

## Usage

For more information see [Lerna documentation](https://github.com/lerna/lerna)

### Adding dependencies

In order to add a local or remote dependency for a specific package run `npx lerna add <package> --scope=<target_package>`

This works the same as `npm install <package>` would in a regular repo.

For more info and options see [the documentation](https://github.com/lerna/lerna/tree/main/commands/add#readme)

### Removing dependencies

Since `lerna` doesn't have a `remove` command the way to remove a package is by running
`npx lerna exec "npm uninstall <package>" --scope=<target_package>`.

`lerna exec` is used to run arbitrary commands in each package, for more info see [the docs](https://github.com/lerna/lerna/tree/main/commands/exec).

#### Removing dependencies issue

When using linked packages, the method for removing dependencies mentioned here sometimes throws an error. This is a bug in `lerna` that happens because local dependencies get removed from `package-lock.json` which then throws an error when running `npm uninstall`.

The solution to this is deleting the target package's local `package-lock.json`, and then running the aforementioned command.

For more info see the provided links:\
https://github.com/lerna/lerna/issues/1886#issuecomment-718880049 \
https://github.com/lfre/lerna-add-remove-issue

### Testing

In order to run eslint tests on all packages run `npx lerna run test`, this runs `npm run test` on each package.

For more info on `lerna run` check [the docs](https://github.com/lerna/lerna/tree/main/commands/run)

### Publishing

To publish all changes run `npx lerna publish`.

Packages are published using [Fixed/Locked mode](https://github.com/lerna/lerna#fixedlocked-mode-default)

You have to be logged into `npm` from within the terminal in order for the changes to be published to the registry.
If this part fails you can retry publishing it by running `npx lerna publish from-package`. It will compare the package versions in `package.json` to the ones in the registry. If they don't match it will trigger the publish.
