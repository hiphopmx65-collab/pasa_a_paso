import { Logger } from '@nestjs/common';
import { SOCKET_ROOMS } from '@paso-a-paso/config';
import { NormalizedGpsPosition } from '@paso-a-paso/types';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/realtime',
  cors: {
    origin: true,
    credentials: true,
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  handleConnection(client: Socket): void {
    this.logger.log(`Socket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Socket disconnected: ${client.id}`);
  }

  publishTrackerPosition(ownerId: string, walkId: string, payload: NormalizedGpsPosition): void {
    this.server.to(SOCKET_ROOMS.owner(ownerId)).emit('tracker.position', payload);
    this.server.to(SOCKET_ROOMS.walk(walkId)).emit('tracker.position', payload);
    this.server.to(SOCKET_ROOMS.adminGlobal).emit('tracker.position', payload);
  }

  publishWalkerPosition(walkerId: string, walkId: string, payload: Record<string, unknown>): void {
    this.server.to(SOCKET_ROOMS.walker(walkerId)).emit('walker.position', payload);
    this.server.to(SOCKET_ROOMS.walk(walkId)).emit('walker.position', payload);
    this.server.to(SOCKET_ROOMS.adminGlobal).emit('walker.position', payload);
  }
}
