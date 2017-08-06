#!/usr/bin/env node

const mri = require('mri');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');

const linter = require('../lib/linter.js');
const prettify = require('../lib/prettify.js');
const logger = require('../lib/utils/logger.js');
const files = require('../lib/utils/files.js');
const spinner = require('../lib/utils/spinner.js');

const pkg = require('../package.json');

const parsed = mri(process.argv.slice(2), {
  boolean: ['noPrettify', 'version', 'debug'],
  alias: {
    noPrettify: ['p'],
    version: 'v',
    debug: 'd'
  },
  unknown() {
    console.log(`
Usage: fyi [options]

Options:
  --debug, -d            Get detailed error messages
  --noPrettify, -p       Disable automatic code fixing
    `);

    process.exit(1);
  }
});

if (parsed.version) {
  console.log(pkg.version);
  process.exit(0);
}

updateNotifier({ pkg }).notify();

const lint = pretty => {
  const spin = spinner();

  files()
    .then(files => {
      if (!pretty) {
        prettify(files)
          .then(fixed => {
            linter(files)
              .then(errors => {
                setTimeout(() => {
                  spin.stop();
                  logger(errors, fixed);
                }, 500);
              })
              .catch(err => {
                spin.stop();
                console.error(chalk`
{red Linting error.}
          `);

                if (parsed.debug) {
                  console.log(err);
                }
              });
          })
          .catch(err => {
            spin.stop();
            console.error(chalk`
{red Prettifier error. Try \`fyi --noPrettify\`}
        `);

            if (parsed.debug) {
              console.log(err);
            }
          });
      } else {
        linter(files)
          .then(errors => {
            setTimeout(() => {
              spin.stop();
              logger(errors, 0);
            }, 500);
          })
          .catch(err => {
            spin.stop();
            console.error(chalk`
{red Linting error.}
      `);

            if (parsed.debug) {
              console.log(err);
            }
          });
      }
    })
    .catch(err => {
      spin.stop();
      console.error(chalk`
{red File error.}
    `);

      if (parsed.debug) {
        console.log(err);
      }
    });
};

lint(parsed.noPrettify);
