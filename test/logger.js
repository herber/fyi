import test from 'ava';
import l from '../lib/utils/logger';

test('logs', t => {
  const err = [
    {
      errors: [
        {
          severity: 2,
          message: 'Strings must use singlequote.',
          line: 4,
          column: 15
        }
      ],
      filename: 'test\\helpers\\error.js',
      errorCount: 1,
      warningCount: 0
    }
  ];

  if (l(err) !== null) {
    t.pass();
  }
});
