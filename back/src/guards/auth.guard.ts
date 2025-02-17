import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const { authorization } = context.switchToHttp().getRequest().headers;
    // console.log({ authorization });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.checkToken((authorization ?? '').split(' ')[1]);
  }
}
