export default function (): Promise<chrome.runtime.RequestUpdateCheckStatus> {
  // 如果更新
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('检测超时，请稍后再试');
    }, 1 * 60 * 1000);

    chrome.runtime.requestUpdateCheck((status) => {
      if (status === 'update_available') {
        resolve('update_available');
      } else {
        reject('update_not_available');
      }
    });
  });
}
