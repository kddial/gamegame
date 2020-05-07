export const formatGameSocketInfo = (id: number) => {
  return `${id}__`;
};

export const formatSelfInfo = (bodyInfo: string) => {
  return `SELF::${bodyInfo}`;
};

export const formatBroadcastMessage = (broadcastMessage: string) => {
  return `BROADCAST::${broadcastMessage}`;
};
