// function inject(code) {
//   var s = document.createElement('script');
//   s.src = chrome.runtime.getURL('script.js');
//   s.setAttribute('data-code', code);
//   // s.id = 'hc';
//   s.onload = function () {
//     this.remove();
//   };
//   (document.head || document.documentElement).appendChild(s);
// }

function loadCode() {
  chrome.runtime.sendMessage({ type: 'code' }, function (res) {
    console.log(res);
  })
}
loadCode();

document.addEventListener('TE-test', function (e) {
  var data = e.detail;
  console.log('received: ', data);
});
// -----
