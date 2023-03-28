import checkProxy from "./check-and-open-proxy";
import checkUpdate from "./check-update";
import { proxyRef } from "../helper";
import closeProxy from "./close-proxy";
import { ENotificationType } from "../interface";

// 如果检测到chrome插件可以更新的话，恢复默认代理并且重新加载插件
chrome.runtime.onUpdateAvailable.addListener(() => {

  chrome.notifications.create(ENotificationType.applyUpdate, {
    type: "basic",
    title: "更新已就绪，点击此消息马上更新",
    message: "忽略或者直接关闭此消息，更新会在重启浏览器后生效",
    iconUrl: "images/icon_48.png",
  });
  
});

export default function handleUpdate({
  whenHasUpdate,
  whenNoUpdate,
  proxyError,
}: {
  whenHasUpdate?: () => void;
  whenNoUpdate?: (message?: string) => void;
  proxyError?: () => void;
} = {}) {
  checkProxy()
    .then((prevProxyConfig) => {
      // checkproxy 之后代理会被打开，把之前的代理配置写到缓存里
      proxyRef.current = proxyRef.current || prevProxyConfig;
      //代理打开一秒后才, 开始检查更新
      setTimeout(() => {
        checkUpdate()
          .then(() => {
            //有更新
            if (typeof whenHasUpdate === "function") whenHasUpdate();
          })
          .catch((err) => {
            // 没更新
            if (typeof whenNoUpdate === "function") whenNoUpdate(err);
            closeProxy();
          });
      }, 1000);
    })
    .catch(() => {
      if (typeof proxyError === "function") proxyError();
      //打开代理失败
    });
}

export function handleCheckLocalVersion() {
  const key = 'version';
  const manifestData = chrome.runtime.getManifest();
  const version = manifestData.version;
  const versionCache = localStorage.getItem(key);

  if (!versionCache) {
    localStorage.setItem(key, version);
    return;
  }

  if (version > versionCache) {
    localStorage.setItem(key, version);
    chrome.notifications.create(ENotificationType.alreadyUpdate, {
      type: "basic",
      title: "Talent Eye更新成功",
      message: "您的插件已升级到最新版",
      iconUrl: "images/icon_48.png",
    });
  }
}