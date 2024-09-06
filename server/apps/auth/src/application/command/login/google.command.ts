import { AuthenticatedUser } from '@libs/shared';

export class GoogleCommand {
  constructor(public readonly req: { user: AuthenticatedUser }) {}
}
