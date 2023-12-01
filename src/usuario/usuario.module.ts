import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailUnicoValidator]
})
export class UsuarioModule {

}