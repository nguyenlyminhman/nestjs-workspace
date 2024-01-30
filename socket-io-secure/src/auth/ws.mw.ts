import { WsJwtGuard } from "./ws-jwt/ws-jwt.guard";
import { Socket } from "socket.io";


type SocketIOMiddleware = {
    (client: Socket, next: (err?: Error)=> void)
}

export const SocketAuthMiddleware = () => {
    return (client, next) => {
        try {
            WsJwtGuard.validateToken(client);
            next();
        } catch (err) {
            next(err);
        }
    }
}