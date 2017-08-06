const fs = require('fs');
const prettier = require('prettier');
const leven = require('leven');

module.exports = files =>
  new Promise(function(resolve, reject) {
    let fixed = 0;

    for (const key in files) {
      if (fs.existsSync(files[key])) {
        if (fs.lstatSync(files[key]).isFile()) {
          const file = fs.readFileSync(files[key]).toString();
          const result = prettier.format(file, {
            semi: true,
            printWidth: 3000,
            tabWidth: 2,
            useTabs: false,
            singleQuote: true,
            trailingComma: 'none',
            bracketSpacing: true
          });

          fs.writeFileSync(files[key], result);

          if (leven(file, result) !== 0) {
            fixed++;
          }
        }
      } else {
        reject(new Error('File ' + files[key] + 'does not exist'));
      }
    }

    resolve(fixed);
  });
