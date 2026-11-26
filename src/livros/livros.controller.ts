import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

@Controller('livros')
export class LivrosController {
      private livros = [
    {
      id: 1,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      ano: 1899,
    },
    {
      id: 2,
      titulo: 'Memórias Póstumas de Brás Cubas',
      autor: 'Machado de Assis',
      ano: 1881,
    },
    {
      id: 3,
      titulo: 'O Cortiço',
      autor: 'Aluísio Azevedo',
      ano: 1890,
    },
    {
      id: 4,
      titulo: 'Capitães da Areia',
      autor: 'Jorge Amado',
      ano: 1937,
    },
    {
      id: 5,
      titulo: 'A Hora da Estrela',
      autor: 'Clarice Lispector',
      ano: 1977,
    },
  ];

    @Get()
  listar(
    @Query('autor') autor?: string,
    @Query('ano') ano?: string,
  ) {
    let resultado = this.livros;

    if (autor) {
      resultado = resultado.filter((livro) =>
        livro.autor.toLowerCase().includes(autor.toLowerCase()),
      );
    }

    if (ano) {
      resultado = resultado.filter(
        (livro) => livro.ano === Number(ano),
      );
    }

    return resultado;
  }

    @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    const livro = this.livros.find((item) => item.id === id);

    if (!livro) {
      throw new NotFoundException(
        `Livro com ID ${id} não localizado em nosso acervo`,
      );
    }

    return livro;
  }
}
