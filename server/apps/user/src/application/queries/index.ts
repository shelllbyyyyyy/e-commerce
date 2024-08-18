import { GetAddressByUserHandler } from './address/get-address-by-user.handler';
import { GetAddressHandler } from './address/get-address.handler';
import { GetUserByIdHandler } from './user/get-user-by-id.handler';
import { GetUserHandler } from './user/get-user.handler';

export const QueryHandlers = [
  GetAddressHandler,
  GetAddressByUserHandler,
  GetUserHandler,
  GetUserByIdHandler,
];
