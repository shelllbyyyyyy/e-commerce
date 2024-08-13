import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RegisteredUserEvent } from '../registered-user.event';

@EventsHandler(RegisteredUserEvent)
export class RegisteredUserHandler
  implements IEventHandler<RegisteredUserEvent>
{
  async handle(event: RegisteredUserEvent) {
    console.log('User registered', event.user);
  }
}
