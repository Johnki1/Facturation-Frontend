import { Client } from '@stomp/stompjs';

const SOCKET_URL = 'wss://apiunoigualados.up.railway.app/ws';

let client = null;

const connect = (onMessageReceived, onDashboardUpdate) => {
  const token = localStorage.getItem('jwtToken');
  
  client = new Client({
    brokerURL: SOCKET_URL,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('✅ Conectado al WebSocket');
      client.subscribe('/topic/notificaciones', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
      client.subscribe('/topic/dashboard', (message) => {
        onDashboardUpdate(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error('❌ Error STOMP:', frame);
    },
    onWebSocketError: (error) => {
      console.error('Error en WebSocket:', error);
    }
  });

  try {
    client.activate();
  } catch (error) {
    console.error('Error al activar el cliente:', error);
  }
};

const disconnect = () => {
  if (client && client.active) {
    client.deactivate();
  }
};

export default {
  connect,
  disconnect
};