$(function() {
  var data = [
  {
    action: 'type',
    strings: ["npm install -g fyi^400"],
    output: '<span class="gray">+fyi@0.0.0 installed</span><br>&nbsp;',
    postDelay: 1000
  },
  {
    action: 'type',
    strings: ["ls^400"],
    output: 'package.json app.js lib/ node_modules/<br />&nbsp;',
    postDelay: 1000
  },
  {
    action: 'type',
    strings: ["fyi^400"],
    output: 'lib/usr.js&nbsp;(Errors: 1, Warnings: 0)<br />&nbsp;&nbsp;5:4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Strings must use single quotes.<br /><br />Errors: 1<br />Warnings: 0&nbsp;',
    postDelay: 1000
  },
  {
    action: 'type',
    strings: [''],
    postDelay: 2000
  }

];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html('');
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}
