import { AddAddressHandler } from './address/add-address.handler';
import { DeleteAddressHandler } from './address/delete-address.handler';
import { UpdateAddressHandler } from './address/update-address.handler';
import { DeleteUserHandler } from './user/delete-user.handler';
import { UpdateUserHandler } from './user/update-user.handler';

export const CommandHandlers = [
  AddAddressHandler,
  DeleteAddressHandler,
  UpdateAddressHandler,
  DeleteUserHandler,
  UpdateUserHandler,
];
