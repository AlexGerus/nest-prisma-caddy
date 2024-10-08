import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from '../prisma';
import { GqlConfigService } from './gql-config.service';
import { ConfigModule } from '../config';

@Global()
@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [PrismaModule, ConfigModule],
    }),
  ],
})
export class GraphqlModule {}
