'use strict';

const chalk = require('chalk');

const Table = require('cli-table');
var table = new Table({
  chars: {
    'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
    'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
    'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
    'right': '', 'right-mid': '', 'middle': ' '
  },
  style: { 'padding-left': 1, 'padding-right': 1 }
});

/**
 * Makes linter messages beautiful for logging.
 * @param {object} linted - linter result
 */

module.exports = (linted) => {
  table.push(['']);

  let errorCount = 0;
  let warningCount = 0;

  for (const key in linted) {
    if (linted[key].errorCount !== 0 || linted[key].warningCount !== 0) {
      errorCount += linted[key].errorCount;
      warningCount += linted[key].warningCount;

      table.push(
        [
          linted[key].filename,
          chalk.gray('(Errors: ' + linted[key].errorCount + ', Warnings: ' + linted[key].warningCount + ')')
        ]
      );

      const errors = linted[key].errors;

      for (const errKey in errors) {
        let color = chalk.red;

        if (errors[errKey].severity === 1) color = chalk.yellow;

        table.push(
          [
            '  ' + color(errors[errKey].line + ':' + errors[errKey].column),
            errors[errKey].message,
            chalk.gray(errors[errKey].ruleId)
          ]
        );
      }

      table.push(['']);
    }
  }

  table.push(
    [
      chalk.red('Errors: ' + errorCount)
    ]
  );

  table.push(
    [
      chalk.yellow('Warnings: ' + warningCount)
    ]
  );

  table.push(['']);

  return table.toString();
};
