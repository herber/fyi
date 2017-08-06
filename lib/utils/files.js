const fs = require('fs');
const path = require('path');
const globby = require('globby');

module.exports = () =>
  new Promise((resolve, reject) => {
    const match = ['**/**.js', '!node_modules/**'];

    try {
      if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')).toString());

        if (pkg.fyi !== undefined) {
          if (pkg.fyi.ignore !== undefined) {
            for (const pkgKey in pkg.fyi.ignore) {
              match.push('!' + pkg.fyi.ignore[pkgKey]);
            }
          }
        }
      }
    } catch (err) {
      reject(err);
    }

    globby(match).then(paths => {
      resolve(paths);
    });
  });
