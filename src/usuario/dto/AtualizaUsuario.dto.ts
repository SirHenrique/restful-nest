import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class AtualizaUsuarioDTO {
    
    @IsNotEmpty({ message: 'Nome não pode ser vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {message: 'O e-mail informado é invalido'})
    @EmailUnico({ message: 'Já existe usuário com email informado'})
    @IsOptional()
    email: string;

    @MinLength(6, {message: 'A senha precisa ter pelo menos 6 caracteres'})
    @IsOptional()
    senha: string;
}