import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDTO {
    
    @IsNotEmpty({ message: 'Nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined, {message: 'O e-mail informado é invalido'})
    @EmailUnico({ message: 'Já existe usuário com email informado'})
    email: string;

    @MinLength(6, {message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha: string;
}