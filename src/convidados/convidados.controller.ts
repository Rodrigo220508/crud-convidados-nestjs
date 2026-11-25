import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto.js';

@Controller('convidados')
export class ConvidadosController {
  @Get()
  listar(): string[] {
    return ['Ana', 'Bruno', 'Carlos'];
  }

  @Post()
  criar(@Body() dados: CreateConvidadoDto) {
    console.log(`Convidado recebido: ${dados.nome}`);

    return {
      mensagem: `Convidado ${dados.nome} confirmado!`,
    };
  }
}