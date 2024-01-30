import { Message } from "src/messages/entities/message.entity";

export interface ServerToClients {
    newMessage: (payload: Message) => void;
}