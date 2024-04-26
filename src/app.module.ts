import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core'
import { FiltroDeExcecaoGlobal } from './filtros/filtro-de-excecao-global';
import { HealthModule } from './healthcheck/health.module';


@Module({
  imports: [
    UsuarioModule, 
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }
    ),
    PedidoModule,
    HealthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal
    }
  ]
})
export class AppModule {}
