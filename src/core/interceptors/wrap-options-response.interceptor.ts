import {Injectable, NestInterceptor} from "@nestjs/common";
import {CallHandler} from "@nestjs/common/interfaces/features/nest-interceptor.interface";
import {Observable} from "rxjs/index";
import {ExecutionContext} from "@nestjs/common/interfaces/features/execution-context.interface";
import {map} from "rxjs/operators";

@Injectable()
export class WrapOptionsResponseInterceptor implements NestInterceptor {
    intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next
            .handle()
            .pipe(
                map((res: any) => {
                    return context
                        .switchToHttp()
                        .getRequest()
                        .method === 'OPTIONS' ?
                        {
                            data: {
                                fieldMap: res
                            }
                        } :
                        {
                            data: res
                        };
                })
            );
    }
}