import { CriaProdutoDTO } from './CriaProduto.dto';
import { PartialType } from '@nestjs/mapped-types';


export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {


}

