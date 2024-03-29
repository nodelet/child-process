# child-process

[![CircleCI](https://circleci.com/gh/nodelet/child-process/tree/master.svg?style=svg)](https://circleci.com/gh/nodelet/child-process/tree/master)
[![NPM Downloads](https://img.shields.io/npm/dm/@nodelet/child-process)](https://www.npmjs.com/package/@nodelet/child-process)
[![node](https://img.shields.io/node/v/@nodelet/child-process.svg)](https://www.npmjs.com/package/@nodelet/child-process)
[![License MIT](https://img.shields.io/github/license/nodelet/child-process.svg)](https://github.com/nodelet/child-process/blob/master/LICENSE)

child-process with rxjs observable interface

## Highlights

- Written in Typescript

- Observable interface

- Reactive

## Installation

npm:

```shell
$ npm install @nodelet/child-process
```

yarn:

```shell
$ yarn add @nodelet/child-process
```

## Usage

> child-process with rxjs observable interface

```js
  //spawn
  const { spawn } = require('@nodelet/child-process');

  const childProcess$ = spawn('node', ['-v']);

    let processSubscription = childProcess$.subscribe(
    ({stdout, stderr}) => {
        if(stdout){
            process.stdout.write(stdout)
        } else if(stderr) {
            process.stderr.write(stderr)
        }
    },
    e => console.error(e)
  );

  //exec
  const { exec } = require('@nodelet/child-process');

  const childProcess$ = exec('node -v');

  let processSubscription = childProcess$.subscribe(
    ({stdout, stderr}) => {
        if(stdout){
            process.stdout.write(stdout)
        } else if(stderr) {
            process.stderr.write(stderr)
        }
      },
    e => console.error(e)
  );

```

## License

MIT © [Nivrith](https://github.com/nivrith)
