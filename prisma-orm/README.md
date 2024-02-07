# Prisma ORM
## Description

This project using the Prisma ORM as an example demo to show how the Prisma works


In relational databases, m-n-relations are typically modelled via relation tables. m-n-relations can be either [explicit](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations#explicit-many-to-many-relations) or [implicit](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations) in the Prisma schema. We recommend using implicit m-n-relations if you do not need to store any additional meta-data in the relation table itself. 

In this project,

There is one one-to-many relation (explicit) between the User and Post models

There is one many-to-many relation (implicit) between the Category and Post models

## Installation

```bash
$ npm install
```
## Database

```bash

# init database
$ npm run db:migrate

# validate schema.prisma
$ npm run db:validate

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Man Nguyen](https://www.linkedin.com/in/ly-minh-man-nguyen-204039147/)

## License

Nest is [MIT licensed](LICENSE).
