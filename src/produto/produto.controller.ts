import { ProdutoService } from './produto.service';
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

@Controller('/produtos')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService) {

    }

    @Post()
    async criaProduto(@Body() dadosDoProduto : CriaProdutoDTO) {
        const produtoCadastrado = await this.produtoService.criaProduto(dadosDoProduto)

        return {
            produto: produtoCadastrado,
            message: 'produto criado com sucesso!'
        };
    }

    @Get()
    async listaUsuarios() {
        return this.produtoService.listaProdutos();
    }

    @Put('/:id')
    async atualizaProduto (@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO ) {
        const produtoAtualizado = await this.produtoService.atualizaProduto(id, novosDados);

        return {
            produto: produtoAtualizado,
            message: 'Produto atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id:string){
        const produtoRemovido = await this.produtoService.deletaProduto(id);

        return {
            produto: produtoRemovido,
            message: 'Produto removido com sucesso'
        }
    }
}