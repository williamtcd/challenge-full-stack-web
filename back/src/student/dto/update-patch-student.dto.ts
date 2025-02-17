import { UpdatePutStudentDTO } from './update-put-student.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchStudentDTO extends PartialType(UpdatePutStudentDTO) {}
