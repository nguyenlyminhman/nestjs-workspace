import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module'; 
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './database/database.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule, 
    UserModule, 
    PostModule, 
    CategoryModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
