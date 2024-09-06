import { LoginHandler } from './login/login.handler';
import { RegisterUserHandler } from './register/register-user.handler';
import { RefreshHandler } from './refresh/refresh.handler';
import { VerifyUserHandler } from './verify-user/verify-user.handler';
import { GooglerHandler } from './login/google.handler';

export const CommandHandlers = [
  RegisterUserHandler,
  LoginHandler,
  GooglerHandler,
  RefreshHandler,
  VerifyUserHandler,
];
