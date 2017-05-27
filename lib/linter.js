'use strict';

const { linter } = require('eslint');
const fs = require('fs');

const config = require('../eslintrc.js');

/**
 * Lint specified code.
 * @param {object} files - list of files with additional rules
 */

module.exports = (files) => (
  new Promise(function(resolve, reject) {
    const linted = [];

    for (const key in files) {
      if (fs.existsSync(files[key].filepath)) {
        const src = fs.readFileSync(files[key].filepath).toString();

        var messages = linter.verify(src, config, { filename: files[key].filename });

        let errorCount = 0;
        let warningCount = 0;

        for (const msgKey in messages) {
          if (messages[msgKey].severity === 1) warningCount++;

          if (messages[msgKey].severity === 2) errorCount++;
        }

        const lint = {
          errors: messages,
          filename: files[key].filename,
          filepath: files[key].filepath,
          errorCount,
          warningCount
        };

        linted.push(lint);
      } else {
        reject(new Error('File ' + files[key].filename + 'does not exist'));
      }
    }

    resolve(linted);
  })
);
