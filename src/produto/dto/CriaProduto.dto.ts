import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, Min, MaxLength, ValidateNested, IsArray, ArrayMinSize, IsString, IsNumber, IsUUID } from 'class-validator';


export class CriaProdutoDTO {

    @IsNotEmpty({message: 'Nome do Produto não pode estar vazio'})
    nome: string;

    @IsUUID(undefined, {message: 'ID de usuário inválido'})
    usuarioId: string;

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

    @IsString()
    @IsNotEmpty({message: 'DataCriacao do Produto não pode estar vazia!'})
    dataCriacao: Date;

    @IsString()
    @IsNotEmpty({message: 'DataAtualizacao do Produto não pode estar vazia!'})
    dataAtualizacao: Date;

}

export class CaracteristicaProdutoDTO {
    @IsNotEmpty({message: "Nome na caracteristica do Produto não pode ser vazio"})
    nome: string;
    @IsNotEmpty({message: "Descrição na caracteristica do Produto não pode ser vazio"})
    descricao: string;
}

export class ImagemProdutoDTO {
    @IsNotEmpty({message: 'URL da imagem não pode estar vazio!'})
    url: string;
    @IsNotEmpty({message: 'Descrição da imagem deve ser obrigatória!'})
    descricao: string;
}