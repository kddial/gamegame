export const formatGameSocketInfo = (id: string) => {
  return `${id}__`;
};

export const formatSelfInfo = (bodyInfo) => {
  return `SELF::${bodyInfo}`;
};

export const formatBroadcastMessage = (broadcastMessage) => {
  return `BROADCAST::${broadcastMessage}`;
};
