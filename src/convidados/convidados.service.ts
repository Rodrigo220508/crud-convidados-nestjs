import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConvidadoDto } from './dto/create-convidado.dto.js';
import { UpdateConvidadoDto } from './dto/update-convidado.dto.js';

@Injectable()
export class ConvidadosService {
  private convidados: {
    id: number;
    nome: string;
    idade: number;
    email?: string;
  }[] = [
    { id: 1, nome: 'Ana', idade: 28, email: 'ana@email.com' },
    { id: 2, nome: 'Bruno', idade: 17, email: 'bruno@email' },
  ];

  findAll() {
    return this.convidados;
  }

  findOne(id: number) {
    const convidado = this.convidados.find((item) => item.id === id);

    if (!convidado) {
      throw new NotFoundException(`Convidado ${id} não encontrado`);
    }

    return convidado;
  }

  replace(
    id: number,
    dados: { nome: string; idade: number; email?: string },
  ) {
    const atual = this.findOne(id);
    const i = this.convidados.indexOf(atual);

    this.convidados[i] = { id, ...dados };

    return this.convidados[i];
  }

  update(id: number, dados: UpdateConvidadoDto) {
    const atual = this.findOne(id);

    return Object.assign(atual, dados);
  }

  create(dados: CreateConvidadoDto) {
    const novo = {
      id: this.convidados.length + 1,
      ...dados,
    };

    this.convidados.push(novo);

    return novo;
  }
}