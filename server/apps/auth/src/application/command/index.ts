import { LoginHandler } from './login/login.handler';
import { RegisterUserHandler } from './register/register-user.handler';
import { RefreshHandler } from './refresh/refresh.handler';
import { VerifyUserHandler } from './verify-user/verify-user.handler';

export const CommandHandlers = [
  RegisterUserHandler,
  LoginHandler,
  RefreshHandler,
  VerifyUserHandler,
];
