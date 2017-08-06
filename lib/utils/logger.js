const chalk = require('chalk');
const boxen = require('boxen');
const Table = require('cli-table');

const table = new Table({
  chars: {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' '
  },
  style: { 'padding-left': 1, 'padding-right': 1 }
});

module.exports = (linted, fixed) => {
  table.push(['']);

  let errorCount = 0;
  let warningCount = 0;

  for (const key in linted) {
    if (linted[key].errorCount !== 0 || linted[key].warningCount !== 0) {
      errorCount += linted[key].errorCount;
      warningCount += linted[key].warningCount;

      table.push([linted[key].filename, chalk.gray('(Errors: ' + linted[key].errorCount + ', Warnings: ' + linted[key].warningCount + ')')]);

      const errors = linted[key].errors;

      for (const errKey in errors) {
        let color = chalk.red;

        if (errors[errKey].severity === 1) color = chalk.yellow;

        table.push(['  ' + color(errors[errKey].line + ':' + errors[errKey].column), errors[errKey].message, chalk.gray(errors[errKey].ruleId)]);
      }

      table.push(['']);
    }
  }

  let errMsg = `${errorCount} errors`;
  let warnMsg = `${warningCount} warnings`;
  let fixedMsg = `${fixed} files prettified`;

  if (errorCount === 1) {
    errMsg = `1 error`;
  }

  if (warningCount === 1) {
    warnMsg = `1 warning`;
  }

  if (fixed === 1) {
    fixedMsg = `${fixed} file prettified`;
  }

  console.log(
    boxen(
      chalk`{magenta Done! ${errorCount === 0 && warningCount === 0 ? 'Awesome - no errors' : ''}}

${errMsg}
${warnMsg}
${fixedMsg}`,
      {
        padding: 1,
        margin: 2,
        borderColor: 'magenta'
      }
    )
  );

  table.push(['']);

  console.log(table.toString());
};
