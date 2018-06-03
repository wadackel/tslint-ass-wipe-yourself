# @tsuyoshiwada/tslint-ass-wipe-yourself

[![npm](https://img.shields.io/npm/v/@tsuyoshiwada/tslint-ass-wipe-yourself.svg)](https://www.npmjs.com/package/@tsuyoshiwada/tslint-ass-wipe-yourself)
[![CircleCI](https://circleci.com/gh/tsuyoshiwada/tslint-ass-wipe-yourself.svg?style=svg)](https://circleci.com/gh/tsuyoshiwada/tslint-ass-wipe-yourself)

> **[EXPERIMENTAL RULE]** A TSLint rule. annotation comment are requires assignee name.

A rule that requires Assignee as an annotation comment such as `TODO` or`FIXME` as follows.

```typescript
class Clazz {
  public static foo(): void {
    // TODO @tsuyoshiwada Add super features.
    //      ^^^^^^^^^^^^^ Should be enter an account name beginning with `@`
  }
}
```

By leaving a clear Assignee in the comment, we will eliminate the code that will become untouched.

## Installation

```bash
$ npm install --save-dev @tsuyoshiwada/tslint-ass-wipe-yourself
```

## Configuration

### Basic config

By default, Assertee is required for `TODO` and `FIXME`.

```json
{
  "extends": {
    "@tsuyoshiwada/ass-wipe-yourself"
  }
}
```

### Customize config

For example, to add `NOTE`, pass the array as follows.

```json
{
  "extends": {
    "@tsuyoshiwada/ass-wipe-yourself"
  },
  "rules": {
    "ass-wipe-yourself": [true, ["TODO", "FIXME", "NOTE"]]
  }
}
```

### Schema

```json
{
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

## Contribute

1.  Fork it!
2.  Create your feature branch: `$ git checkout -b my-new-feature`
3.  Commit your changes: `$ git commit -am 'Add some feature'`
4.  Push to the branch: `$ git push origin my-new-feature`
5.  Submit a pull request :muscle:

## CHANGELOG

See [CHANGELOG.md](./CHANGELOG.md)

## Development

We will develop using the following npm scripts.

### `yarn test`

Execute TSLint `--test`.

## License

[MIT @ tsuyoshiwada](./LICENSE)
