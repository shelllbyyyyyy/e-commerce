import { GetAddressByUserHandler } from './address/get-address-by-user.handler';
import { GetAddressHandler } from './address/get-address.handler';
import { GetUserByEmailHandler } from './user/get-user-by-email.handler';
import { GetUserByIdHandler } from './user/get-user-by-id.handler';
import { GetUserHandler } from './user/get-user.handler';

export const QueryHandlers = [
  GetAddressHandler,
  GetAddressByUserHandler,
  GetUserHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
];
