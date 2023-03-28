export enum IMessageType {
  requestUpdateCheck, // 请求更新
  requestUpdateNoUpdate, // 没有更新
  updateAvailable, //检测到更新
  canNotOpenProxy,
}

export enum ENotificationType {
  applyUpdate = "applyUpdate",
  alreadyUpdate = "alreadyUpdate",
}

export interface IMessage {
  type: IMessageType;
  from: "popup" | "content" | "background";
  param?: {
    [key: string]: any;
  };
}
