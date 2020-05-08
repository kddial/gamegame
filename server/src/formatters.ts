import {
  MSG_SELF,
  MSG_BROADCAST,
  MSG_TYPE_DELIM,
} from './client/socket-constants';

export const formatGameSocketInfo = (id: number) => {
  return `${id}__`;
};

export const formatSelfInfo = (bodyInfo: string) => {
  return `${MSG_SELF}${MSG_TYPE_DELIM}${bodyInfo}`;
};

export const formatBroadcastMessage = (broadcastMessage: string) => {
  return `${MSG_BROADCAST}${MSG_TYPE_DELIM}${broadcastMessage}`;
};
