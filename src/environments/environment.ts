export const environment = {
  production: false,
  url_api: 'http://localhost:3000',
  socket: {
    baseUrl: 'http://localhost:4000',
    config: {
      path: '/wss',
      forceNew: true,
      secure: true,
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      rejectUnauthorized: false,
      agent: false,
      upgrade: false,
      transports: [ 'websocket', 'polling', 'flashsocket' ],
    }
  }
};

