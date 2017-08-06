const ava = require('ava');
const spinner = require('../lib/utils/spinner.js');

ava('Spinner', () => {
  try {
    const s = spinner();

    s.stop();
  } catch (err) {
    t.fail(err);
  }
});
