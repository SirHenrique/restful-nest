import { IsEnum } from "class-validator";
import { StatusPedido } from "../enum/statuspedido.enum";

export class AtualizaPedidoDTO {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}