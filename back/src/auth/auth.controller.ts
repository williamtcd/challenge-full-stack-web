import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  // eslint-disable-next-line @typescript-eslint/require-await
  async me() {
    return { me: 'ok' };
  }
}
