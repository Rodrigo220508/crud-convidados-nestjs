import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto.js';
import { ConvidadosService } from './convidados.service.js';

@Controller('convidados')
export class ConvidadosController {
  constructor(private readonly service: ConvidadosService) {}

  @Get()
  listar() {
    return this.service.findAll();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  criar(@Body() dados: CreateConvidadoDto) {
    console.log(`Convidado recebido: ${dados.nome}`);

    const convidado = this.service.create(dados);

    return {
      mensagem: `Convidado ${dados.nome} recebido!`,
      dados: convidado,
    };
  }
}