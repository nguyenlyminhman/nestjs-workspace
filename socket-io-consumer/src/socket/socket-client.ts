import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from 'socket.io-client'

@Injectable()
export class SocketClient implements OnModuleInit {

    public socketClient: Socket;

    constructor() {
        this.socketClient = io('http://localhost:3000');
    }

    onModuleInit() {
        this.registerConsumerEvent();
    }


    private registerConsumerEvent() {
        this.socketClient.on('connect', () => console.log('Connected to gateway')
        )
        this.socketClient.on('onMessage', (payload: any) => {
            console.log('Socket Client Class !!!');
            console.log('Payload from gateway:', payload);            
        })
    }
}
