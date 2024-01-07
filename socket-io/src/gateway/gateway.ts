import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('connected id: ', socket.id);
        })
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() payload: any) {
        this.server.emit('onMessage', {
            msg: 'new message',
            content: payload
        })
        console.log(payload);
    }
}