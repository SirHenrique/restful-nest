import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedidoDto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedidoDto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const pedidoCriado = await this.pedidoService.cadastraPedido(
      usuarioId,
      dadosDoPedido
      );

    return pedidoCriado
  }

  @Patch(':id')
  async atualizaPedido(@Param('id') pedidoId: string, @Body() dadosDeAtualizacao: AtualizaPedidoDTO) {
    const pedidoAtualizado = await this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao)

    return pedidoAtualizado;
  }

  @Get()
  async listaPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos
  }

  
}
