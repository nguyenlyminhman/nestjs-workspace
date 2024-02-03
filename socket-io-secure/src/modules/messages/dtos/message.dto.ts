export interface CreateMessageDto {
    id?: string;
    message?: string;
    authorId?: string;
    conversationId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}