import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Language } from './language/entities/language.entity.js';
import { LanguageModule } from './language/language.module.js';
import { LanguageResource } from './language/language.resource.js';
import { User } from './user/entities/user.entity.js';
import { UserModule } from './user/user.module.js';
import { UserResource } from './user/user.resource.js';

AdminJS.registerAdapter({
  Database: AdminJSTypeorm.Database,
  Resource: AdminJSTypeorm.Resource,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [UserResource, LanguageResource],
            branding: {
              companyName: 'Saar Admin',
              logo: '',
              softwareBrothers: false,
            },
          },
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Language],
      synchronize: true,
      ssl: true,
    }),
    UserModule,
    LanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
