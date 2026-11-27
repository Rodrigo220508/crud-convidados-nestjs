import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

@Controller('media')
export class MediaController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const nomeUnico = `${randomUUID()}${extname(file.originalname)}`;

          callback(null, nomeUnico);
        },
      }),

      fileFilter: (req, file, callback) => {
        const extensao = extname(file.originalname).toLowerCase();

        const permitido =
          ['.jpg', '.jpeg', '.png'].includes(extensao) &&
          ['image/jpeg', 'image/png'].includes(file.mimetype);

        if (!permitido) {
          return callback(
            new BadRequestException('Apenas arquivos JPG e PNG são permitidos.'),
            false,
          );
        }

        callback(null, true);
      },

      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Envie uma imagem JPG ou PNG de até 2 MB.');
    }

    return {
      url: `/uploads/${file.filename}`,
    };
  }
}