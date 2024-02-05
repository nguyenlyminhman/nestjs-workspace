export interface CreateMessageDto {
    id?: string;
    message?: string;
    authorId?: number;
    conversationId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}