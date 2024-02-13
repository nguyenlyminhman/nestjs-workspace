import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import DateScalar from './common/date-scalar';

@Module({
  imports: [
    PostModule,
    CategoryModule,
    UserModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolvers: {
        Date: DateScalar,
      },
    }),
  ],
})
export class AppModule {}
