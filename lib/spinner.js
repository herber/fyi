'use strict';

const ora = require('ora');
const spinner = ora('Linting').start();

spinner.color = 'magenta';
spinner.spinner = {
	interval: 50,
	frames: [
		'⠋',
		'⠹',
		'⠙',
		'⠸',
		'⠼',
		'⠴',
		'⠦',
		'⠧',
		'⠇',
		'⠏'
	]
};

module.exports = () => spinner;
