import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ServerToClients } from "./types/events";
import { Message } from "src/objects/entities/message.entity";
import { UseGuards } from "@nestjs/common";
import { WsJwtGuard } from "src/modules/auth/ws-jwt/ws-jwt.guard";
import { SocketAuthMiddleware } from "src/modules/auth/ws.mw";

@WebSocketGateway({namespace: 'events'})
@UseGuards(WsJwtGuard) 
export class EventGateway{

    @WebSocketServer()
    server: Server<any, ServerToClients>;

    afterInit(client: Socket){
        client.use(SocketAuthMiddleware() as any)
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any) {
        return  'Hello world';
    }

    sendMessage(message: Message) {
        this.server.emit('newMessage', message)
    }
}