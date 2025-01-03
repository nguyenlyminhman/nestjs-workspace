
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Permissions {
    ALL = "ALL",
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

export class AuthInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class CreateUserInput {
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    permissions?: Nullable<Nullable<string>[]>;
}

export class CreateCategoryInput {
    name?: Nullable<string>;
}

export class CreatePostInput {
    title?: Nullable<string>;
    content?: Nullable<string>;
    author?: Nullable<number>;
    category?: Nullable<number>;
}

export abstract class IQuery {
    abstract auth(authInput?: Nullable<AuthInput>): Nullable<AuthInfo> | Promise<Nullable<AuthInfo>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}

export class AuthInfo {
    token?: Nullable<string>;
    user: User[];
}

export class User {
    id: number;
    fullname: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    password: string;
    permissions: Nullable<Permissions>[];
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createCategory(createCategoryInput?: Nullable<CreateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createPost(createPostInput?: Nullable<CreatePostInput>): Nullable<Post> | Promise<Nullable<Post>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract categoryCreated(): Nullable<Category> | Promise<Nullable<Category>>;

    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;
}

export class Category {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export class Post {
    id: number;
    title: string;
    content: string;
    user: User[];
    categories: Category[];
    created_at: Date;
    updated_at: Date;
}

type Nullable<T> = T | null;
