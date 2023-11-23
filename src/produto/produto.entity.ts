
export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaEntity[];
    imagens: ImagemEntity[];
    categoria: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

export class CaracteristicaEntity {
    nome: string;
    descricao: string;
}

export class ImagemEntity {
    url: string;
    descricao: string;
}