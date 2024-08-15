import { LoginHandler } from './login/login.handler';
import { RegisterUserHandler } from './register/register-user.handler';
import { RefreshHandler } from './refresh/refresh.handler';

export const CommandHandlers = [
  RegisterUserHandler,
  LoginHandler,
  RefreshHandler,
];
