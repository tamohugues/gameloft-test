import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const gqlContext = GqlExecutionContext.create(context);
    const now = Date.now();

    return context.getType() === 'http'
      ? next
          .handle()
          .pipe(
            tap(() => Logger.log(`${request.method} ${request.url} ${Date.now() - now}ms`, context.getClass().name)),
          )
      : next
          .handle()
          .pipe(
            tap(() =>
              Logger.log(
                `${gqlContext.getInfo().operation.operation} ${gqlContext.getInfo().path.key} ${Date.now() - now}ms`,
                gqlContext.getClass().name,
              ),
            ),
          );
  }
}
