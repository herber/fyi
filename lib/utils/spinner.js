const logUpdate = require('log-update');
const frames = ['-', '\\', '|', '/'];
let i = 0;

module.exports = () => {
  const interval = setInterval(() => {
    const frame = frames[(i = ++i % frames.length)];

    logUpdate(
      `
      ${frame}
      `
    );
  }, 80);

  return {
    stop() {
      clearInterval(interval);
      logUpdate('');
    }
  };
};
