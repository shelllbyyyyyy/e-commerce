import { AddAddressHandler } from './address/add-address.handler';
import { DeleteAddressHandler } from './address/delete-address.handler';
import { UpdateAddressHandler } from './address/update-address.handler';
import { CreateUserHandler } from './user/create-user.handler';
import { DeleteUserHandler } from './user/delete-user.handler';
import { NewUserHandler } from './user/new-user.handler';
import { UpdateUserHandler } from './user/update-user.handler';
import { VerifyUserHandler } from './user/verify-user.handler';

export const CommandHandlers = [
  AddAddressHandler,
  DeleteAddressHandler,
  UpdateAddressHandler,
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
  VerifyUserHandler,
  NewUserHandler,
];
