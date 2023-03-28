console.log(window.A);
console.log(document.currentScript.getAttribute('data-code'));
let code = document.currentScript.getAttribute('data-code');
eval(code);
function AA() {
  // alert(123);
  // console.log(window.abc);
  // sendMessageToContent(window.abc);
  var url = window.getUrl && window.getUrl();
  // alert(url);
  // test();
  // fetch('https://talenteye.italent.cn/static/channelsettings/KeepChannelConfig.txt')
  sendMessageToContent(url);
}

function sendMessageToContent(data) {
  document.dispatchEvent(new CustomEvent('TE-test', { detail: data }));
}