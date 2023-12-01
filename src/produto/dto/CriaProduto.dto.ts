import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, Min, MaxLength, ValidateNested, IsArray, ArrayMinSize, IsNumber } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';


export class CriaProdutoDTO {

    @IsNotEmpty({message: 'Nome do Produto não pode estar vazio'})
    nome: string;



    @IsNumber({maxDecimalPlaces: 2}, {message: 'Preço deve ser número e ter no máximo 2 digitos'})
    @IsPositive({message: 'Deve ser positivo'})
    valor: number;

    @Min(0)
    quantidadeDisponivel: number;

    @IsNotEmpty({message: 'Descrição do Produto não pode estar vazio'})
    @MaxLength(1000,{message: 'Descrição pode ter no máximo 1000 caracteres'})
    descricao: string;

    @ValidateNested()
    @IsArray({message: 'Caracteristicas devem ser do formato array'})
    @Type(() => CaracteristicaProdutoDTO)
    @ArrayMinSize(3,{message: 'Pelo menos 3 caracteristicas'})
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray({message: 'Imagens devem ser do formato array'})
    @Type(() => ImagemProdutoDTO)
    @ArrayMinSize(1,{message: 'Pelo menos 1 imagem!'})
    imagens: ImagemProdutoDTO[]

    @IsNotEmpty({message: 'Categoria do Produto não pode estar vazia!'})
    categoria: string;

}

export class CaracteristicaProdutoDTO {

    id: string;

    @IsNotEmpty({message: "Nome na caracteristica do Produto não pode ser vazio"})
    nome: string;
    @IsNotEmpty({message: "Descrição na caracteristica do Produto não pode ser vazio"})
    descricao: string;

    produto: ProdutoEntity;
}

export class ImagemProdutoDTO {

    id: string;

    @IsNotEmpty({message: 'URL da imagem não pode estar vazio!'})
    url: string;
    @IsNotEmpty({message: 'Descrição da imagem deve ser obrigatória!'})
    descricao: string;

    produto: ProdutoEntity;
}