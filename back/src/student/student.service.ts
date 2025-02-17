import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/create-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutStudentDTO } from './dto/update-put-student.dto';
import { UpdatePatchStudentDTO } from './dto/update-patch-student.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateStudentDTO) {
    try {
      return await this.prisma.students.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta?.target === 'ra') {
            throw new ConflictException('Este RA já está cadastrado.');
          }
          if (error.meta?.target === 'email') {
            throw new ConflictException('Este e-mail já está cadastrado.');
          }
          if (error.meta?.target === 'cpf') {
            throw new ConflictException('Este cpf já está cadastrado.');
          }
          throw new ConflictException('Dados já cadastrados.');
        }
      }
      throw new InternalServerErrorException('Erro ao criar estudante.');
    }
  }
  async list() {
    return this.prisma.students.findMany();
  }

  async read(id: number) {
    await this.exists(id);
    return this.prisma.students.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePutStudentDTO) {
    await this.exists(id);
    return this.prisma.students.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchStudentDTO) {
    await this.exists(id);
    return this.prisma.students.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.students.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.students.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`o usuário ${id} não existe`);
    }
  }
}
