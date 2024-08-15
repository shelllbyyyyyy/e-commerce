import { AddAddressHandler } from './address/add-address.handler';
import { DeleteAddressHandler } from './address/delete-address.handler';
import { UpdateAddressHandler } from './address/update-address.handler';

export const CommandHandlers = [
  AddAddressHandler,
  DeleteAddressHandler,
  UpdateAddressHandler,
];
