import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext();
  if (ctx['userId']) {
    return ctx['userId'];
  }
  return null;
});
