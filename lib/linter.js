const { linter } = require('eslint');
const fs = require('fs');

const config = require('./eslint-config.js');

module.exports = files =>
  new Promise((resolve, reject) => {
    const linted = [];

    for (const key in files) {
      if (fs.existsSync(files[key])) {
        const src = fs.readFileSync(files[key]).toString();

        var messages = linter.verify(src, config, { filename: files[key] });

        let errorCount = 0;
        let warningCount = 0;

        for (const msgKey in messages) {
          if (messages[msgKey].severity === 1) warningCount++;

          if (messages[msgKey].severity === 2) errorCount++;
        }

        const lint = {
          errors: messages,
          filename: files[key],
          filepath: files[key],
          errorCount,
          warningCount
        };

        linted.push(lint);
      } else {
        reject(new Error('File ' + files[key] + 'does not exist'));
      }
    }

    resolve(linted);
  });
