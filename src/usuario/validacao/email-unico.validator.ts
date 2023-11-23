import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {

   constructor(private usuarioRepository: UsuarioRepository) {

   } 

    async validate(value: any): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value);
        return !usuarioComEmailExiste;
    }
    
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        })
    }
}