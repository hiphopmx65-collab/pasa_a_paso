import { Logger } from '@nestjs/common';
import { SOCKET_ROOMS } from '@paso-a-paso/config';
import {
  NormalizedGpsPosition,
  RealtimeConnectionContext,
  WalkerRealtimePosition,
} from '@paso-a-paso/types';
import { getAllowedCorsOrigins } from '../../common/cors-origins';
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/realtime',
  cors: {
    origin: [],
    credentials: true,
  },
})
export class RealtimeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  afterInit(server: Server): void {
    if (!server.engine?.opts) {
      return;
    }

    server.engine.opts.cors = {
      ...server.engine.opts.cors,
      origin: getAllowedCorsOrigins(),
      credentials: true,
    };
  }

  handleConnection(client: Socket): void {
    const origin = client.handshake.headers.origin;
    const authorization = client.handshake.headers.authorization;
    const expectedToken = process.env.REALTIME_DEV_AUTH_TOKEN ?? 'paso-a-paso-dev-token';
    const context = client.handshake.auth as RealtimeConnectionContext | undefined;

    if (origin && !getAllowedCorsOrigins().includes(origin)) {
      this.logger.warn(`Rejected socket origin: ${origin}`);
      client.disconnect(true);
      return;
    }

    if (authorization !== 'Bearer ' + expectedToken || !context?.role) {
      this.logger.warn(`Rejected unauthenticated socket: ${client.id}`);
      client.disconnect(true);
      return;
    }

    if (!this.assignRooms(client, context)) {
      this.logger.warn(`Rejected socket without room context: ${client.id}`);
      client.disconnect(true);
      return;
    }

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

  publishWalkerPosition(walkerId: string, walkId: string, payload: WalkerRealtimePosition): void {
    this.server.to(SOCKET_ROOMS.walker(walkerId)).emit('walker.position', payload);
    this.server.to(SOCKET_ROOMS.walk(walkId)).emit('walker.position', payload);
    this.server.to(SOCKET_ROOMS.adminGlobal).emit('walker.position', payload);
  }

  private assignRooms(client: Socket, context: RealtimeConnectionContext): boolean {
    if (context.role === 'ADMIN') {
      client.join(SOCKET_ROOMS.adminGlobal);
      if (context.walkId) {
        client.join(SOCKET_ROOMS.walk(context.walkId));
      }
      return true;
    }

    if (!context.userId) {
      return false;
    }

    if (context.role === 'OWNER') {
      client.join(SOCKET_ROOMS.owner(context.userId));
    }

    if (context.role === 'WALKER') {
      client.join(SOCKET_ROOMS.walker(context.userId));
    }

    if (context.walkId) {
      client.join(SOCKET_ROOMS.walk(context.walkId));
    }

    return true;
  }
}
