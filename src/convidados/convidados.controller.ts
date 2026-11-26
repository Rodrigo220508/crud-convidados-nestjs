import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateConvidadoDto } from './dto/create-convidado.dto.js';
import { UpdateConvidadoDto } from './dto/update-convidado.dto.js';
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

  @Put(':id')
  substituir(
    @Param('id') id: string,
    @Body() dados: { nome: string; idade: number; email?: string },
  ) {
    return this.service.replace(+id, dados);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dados: UpdateConvidadoDto) {
    return this.service.update(+id, dados);
  }

  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id') id: string) {
    this.service.remove(+id);
  }
}