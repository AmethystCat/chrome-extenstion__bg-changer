import { proxyRef } from "../helper";
import { system_default } from "../const";

export default function closeProxy(callback?: () => void) {
  const recoverProxy = proxyRef.current
    ? { value: proxyRef.current }
    : system_default;

  chrome.proxy.settings.set(recoverProxy, () => {
    proxyRef.current = null;
    typeof callback === "function" && callback();
  });
}
