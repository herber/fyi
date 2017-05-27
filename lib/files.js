'use strict';

const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

/**
 * Creates list of files to be linted
 * @param {object} dir - directory to be linted
 */

module.exports = (dir) => (
  new Promise((resolve, reject) => {
    const list = [];

    if (fs.existsSync(dir)) {
      // todo add custom ignores
      const ignores = [];

      if (fs.existsSync(path.join(dir, 'package.json'))) {
        const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json')).toString());

        if (pkg.fyi !== undefined) {
          if (pkg.fyi.ignore !== undefined) {
            for (const pkgKey in pkg.fyi.ignore) {
              ignores.push(pkg.fyi.ignore[pkgKey]);
            }
          }
        }
      }

      if (fs.existsSync(path.join(dir, '.gitignore'))) {
        const git = fs.readFileSync(path.join(dir, '.gitignore')).toString().split('\n');

        for (const gitKey in git) {
          ignores.push(git[gitKey]);
        }
      }

      ignores.push('node_modules*');

      recursive(dir, ignores, (err, files) => {
        if (err) throw err;

        for (const key in files) {
          if (path.extname(files[key]) === '.js' || path.extname(files[key]) === '.jsx') {
            const o = {};

            o.filepath = files[key];
            o.filename = path.relative(dir, files[key]);

            list.push(o);
          }
        }

        resolve(list);
      });
    } else {
      reject(new Error('Directory does not exist'));
    }
  })
);
