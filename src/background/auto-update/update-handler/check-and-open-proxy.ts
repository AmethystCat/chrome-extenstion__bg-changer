import {logger} from "../helper";
import {
  controllable_by_this_extension,
  controlled_by_this_extension,
  sock5Proxy,
} from "../const";
import isEqual from "lodash.isequal";

// 检查代理状态，并在可用状态下打开代理，
export default function checkProxy(): Promise<any> {
  return new Promise((resolve, reject) => {
    // 获取当前chrome代理设置
    chrome.proxy.settings.get(
      { incognito: false },
      ({ levelOfControl, value: initialValue }) => {
        // 创建一个resolve当前设置的闭包函数，方便调用
        const configResolve = () => {
          resolve(initialValue);
        };

        // 如果插件有权限对代理进行配置，检测代理设置
        if (
          levelOfControl === controlled_by_this_extension ||
          levelOfControl === controllable_by_this_extension
        ) {
          // 如果当前代理设置与代理设置相同，侧代表代理已经打开。直接resolve，并返回
          if (isEqual(initialValue, sock5Proxy.value)) {
            configResolve();
            return;
          }

          //打开内置代理
          chrome.proxy.settings.set(sock5Proxy, () => {
            configResolve();
          });
        } else {
          // 插件无权限进行配置代理，记录日志
          logger("插件无法配置代理，检查更新可能会失败");
          reject("插件无权限配置代理");
        }
      }
    );
  });
}
