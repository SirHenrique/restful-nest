import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoRepository } from "./produto.repository";
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { v4 as uuid } from 'uuid';


@Controller('/produtos')
export class ProdutoController {

    constructor(private produtoRepository: ProdutoRepository) {

    }

    @Post()
    async criaProduto(@Body() dadosDoProduto : CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.id = uuid();
        produtoEntity.usuarioId = dadosDoProduto.usuarioId;
        produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
        produtoEntity.imagens = dadosDoProduto.imagens;
        produtoEntity.categoria = dadosDoProduto.categoria;
        produtoEntity.descricao = dadosDoProduto.descricao;
        produtoEntity.nome = dadosDoProduto.nome;
        produtoEntity.valor = dadosDoProduto.valor;
        produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
        produtoEntity.dataCriacao = dadosDoProduto.dataCriacao;
        produtoEntity.dataAtualizacao = dadosDoProduto.dataAtualizacao;

        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: produtoEntity,
            message: 'produto criado com sucesso!'
        };
    }

    @Get()
    async listaUsuarios() {
        return this.produtoRepository.listar();
    }

    @Put('/:id')
    async atualizaProduto (@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO ) {
        const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);

        return {
            produto: produtoAtualizado,
            message: 'Produto atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id:string){
        const produtoRemovido = await this.produtoRepository.remove(id);

        return {
            produto: produtoRemovido,
            message: 'Produto removido com sucesso'
        }
    }
}