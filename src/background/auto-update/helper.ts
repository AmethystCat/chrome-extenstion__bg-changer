import { IMessage } from "./interface";

// proxyRef 用来在开关代理的时候缓存初始的代理设置
export const proxyRef = { current: null };

export function getRemoteVersion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const version = chrome.runtime.getManifest().version;
      resolve(version);
    }, 100);
  });
}

// Currying
export const composeMsg = (from: IMessage["from"]) => (message: {
  type: IMessage["type"];
}): IMessage => {
  return Object.assign({ from }, message);
};

// curry background
export const bgMsg = composeMsg("background");

// 用来记录插件异常日志的，
export function logger(message: any, type = 'log') {
  console[type]('%c--log-- ', 'font-size: 18px;', message);
}
