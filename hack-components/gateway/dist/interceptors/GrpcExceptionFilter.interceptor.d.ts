import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class GrpcErrorInterceptor implements NestInterceptor {
    private errorCodeMap;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
