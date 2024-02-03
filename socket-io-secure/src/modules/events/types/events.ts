import { Message } from "src/objects/entities/message.entity";

export interface ServerToClients {
    newMessage: (payload: Message) => void;
}