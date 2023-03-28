import handleMessage from "./message-handler";
import handleCheckUpdate, { handleCheckLocalVersion } from "./update-handler";
import { logger } from './helper';
try {
  // 启动响应种类消息
  handleMessage();
  // 启动检查一次更新
  handleCheckUpdate({
    whenNoUpdate: (msg) => {
      logger(msg);
      handleCheckLocalVersion();
    }
  });
} catch (err) {
  logger(err, 'error');
}


