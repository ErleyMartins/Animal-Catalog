import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginFormInput } from './dto/login-form.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async login(@Args('loginForm') loginForm: LoginFormInput): Promise<Auth> {
    const user = await this.authService.validate(
      loginForm.username,
      loginForm.password,
    );

    return this.authService.login(user);
  }
}
