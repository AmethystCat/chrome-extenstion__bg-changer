import { ENotificationType } from "../interface";
import closeProxy from "../update-handler/close-proxy";

export default function handleMessage() {
  chrome.notifications.onClicked.addListener((id) => {
    if (id === ENotificationType.applyUpdate) {
      chrome.notifications.clear(id);
      // 关闭代理后
      closeProxy(() => {
        chrome.runtime.reload();
      });
    }
  });
}
