import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async criaUsuario(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity)
    }

    async buscaPorEmail(email: string) {
        const checkEmail = await this.usuarioRepository.findOne({
          where: { email },
        });

        if(checkEmail === null)
            throw new NotFoundError('O email, não foi encontrado!');

        return checkEmail;
      }


    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome)
        )

        return usuariosLista
    }

    async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
        const usuario = await this.usuarioRepository.findOneBy({ id });

        if (usuario === null) {
            throw new NotFoundException('Usuario não encontrado!')
        }
     
         Object.assign(usuario, novosDados);
     
         return this.usuarioRepository.save(usuario);
       }
     

    async deletaUsuario(id: string) {
      const result =  await this.usuarioRepository.delete(id)

      if (!result.affected)
        throw new NotFoundException('O usuário não foi encontrado!')
    }
}