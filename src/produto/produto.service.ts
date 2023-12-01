import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
      const produtoEntity = new ProdutoEntity();
  
      Object.assign(produtoEntity, dadosProduto as ProdutoEntity)

  
      return this.produtoRepository.save(produtoEntity);
  
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();

    return produtosSalvos;
  }

  async deletaProduto(id: string) {
    const result = await this.produtoRepository.delete(id);

    if(!result.affected) throw new NotFoundException('Produto não foi encontrado!')
  }

  async atualizaProduto(id:string, produtoEntity: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({id})

    if (entityName === null) {
      throw new NotFoundException('O Produto não foi encontrado')
    }
      Object.assign(entityName, produtoEntity as ProdutoEntity)

    await this.produtoRepository.save(entityName)
  }
}
