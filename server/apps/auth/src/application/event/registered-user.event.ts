import { User } from '@libs/domain';

export class RegisteredUserEvent {
  constructor(public readonly user: User) {}
}
