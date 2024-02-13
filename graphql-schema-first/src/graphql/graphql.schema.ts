
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCategoryInput {
    name?: Nullable<string>;
}

export class CreatePostInput {
    title?: Nullable<string>;
    content?: Nullable<string>;
    author?: Nullable<number>;
    category?: Nullable<number>;
}

export class CreateUserInput {
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export abstract class IQuery {
    abstract categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createCategory(createCategoryInput?: Nullable<CreateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createPost(createPostInput?: Nullable<CreatePostInput>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract categoryCreated(): Nullable<Category> | Promise<Nullable<Category>>;

    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;

    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class Category {
    id: number;
    name: string;
}

export class Post {
    id: number;
    title: string;
    content: string;
    user: Nullable<User>[];
    categories: Nullable<Category>[];
}

export class User {
    id: number;
    fullname: string;
    email: string;
    password: string;
}

type Nullable<T> = T | null;
