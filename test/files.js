import test from 'ava';
import f from '../lib/files';
import path from 'path';

test('ignores files in gitignore', t => {
	f(path.join(process.cwd(), 'helpers')).then((files) => {
		for (var key in files) {
			if (files[key].filename === 'ignore.js') {
				t.fail();
			}
		}

		t.pass();
	}).catch(function (err) {
		t.fail(err);
	});
});

test('does not lint nodemodules', t => {
	f(path.join(process.cwd(), 'helpers')).then((files) => {
		for (var key in files) {
			if (files[key].filename === path.join('node_modules', 'module.js')) {
				t.fail();
			}
		}

		t.pass();
	}).catch(function (err) {
		t.fail(err);
	});
});
