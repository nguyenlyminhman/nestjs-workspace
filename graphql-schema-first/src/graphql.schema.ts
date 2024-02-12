
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    fullname?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class CreateCategoryInput {
    name?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract categories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createCategory(createCategoryInput?: Nullable<CreateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract categoryCreated(): Nullable<Category> | Promise<Nullable<Category>>;
}

export class User {
    id: number;
    fullname: string;
    email: string;
    password: string;
}

export class Category {
    id: number;
    name: string;
}

type Nullable<T> = T | null;
