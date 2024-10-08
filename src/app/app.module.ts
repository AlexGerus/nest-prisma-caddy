import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PrismaModule, PrismaService } from './prisma';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { GraphqlModule } from './graphql/graphql.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from './config';

@Module({
  imports: [
    GraphqlModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.throttle,
    }),
    ConfigModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, UserService, PostService],
})
export class AppModule {}
