import test from 'ava';
import l from '../lib/linter';
import path from 'path';

test('lints correctly', t => {
	const files = [
		{
			filepath: path.join(__dirname, 'error.js'),
			filename: 'error.js'
		}
	];

	l(files).then((errors) => {
		if (error === null) {
			t.fail();
		}

		for (var e in error) {
			if (errors[e].errorCount !== 1) {
				t.fail();
			}

			if (errors[e].warningCount !== 0) {
				t.fail();
			}
		}
	}).catch((err) => {
		t.fail(err);
	});
});
