#!/usr/bin/env node

'use strict';

const args = require('args');
const chokidar = require('chokidar');

const linter = require('../lib/linter');
const logger = require('../lib/logger');
const files = require('../lib/files');
const spinner = require('../lib/spinner');

/**
 * Execure linting process
 */

function lint() {
	const spin = spinner();

	files(process.cwd()).then((files) => {
		linter(files).then((errors) => {
			setTimeout(function () {
				spin.stop();
				console.log(logger(errors));
			}, 1000);
		}).catch((err) => {
			spin.fail(err.message);
		});
	}).catch(function (err) {
		spin.fail(err.message);
	});
}

args.option('watch', 'Relint on filechange', false);

const flags = args.parse(process.argv, { name: 'fyi' });

if (flags.watch) {
	lint();

	chokidar.watch('.', { ignored: /node_modules/ }).on('change', () => {
	  lint();
	});
} else {
	lint();
}
