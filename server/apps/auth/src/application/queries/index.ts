import { CheckEmailHandler } from './check-email/check-email.handler';
import { ResendVerificationHandler } from './resend-verification/resend-verification.handler';

export const QueryHandlers = [ResendVerificationHandler, CheckEmailHandler];
