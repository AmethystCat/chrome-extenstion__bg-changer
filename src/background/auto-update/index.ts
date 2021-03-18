import handleMessage from "./message-handler";
import handleCheckUpdate from "./update-handler";
import { logger } from './helper';

// 启动响应种类消息
handleMessage();
// 启动检查一次更新
handleCheckUpdate({
  whenNoUpdate: (err) => {
    logger(err);
  }
});

