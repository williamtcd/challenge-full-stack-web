import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  createToken(user: users) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '30 days',
          subject: String(user.id),
          issuer: 'login',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'login',
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('email ou senha incorretos');
    }

    return this.createToken(user);
  }
}
