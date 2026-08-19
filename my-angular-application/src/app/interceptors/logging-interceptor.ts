import {
  HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';

import {
  tap
} from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn =
  (req, next) => {

    console.log(
      'HTTP Request:',
      req.method,
      req.url
    );

    return next(req).pipe(

      tap({
        next: response => {

          if (response instanceof HttpResponse) {

            console.log(
              'HTTP Response:',
              response.status,
              req.url
            );

          }

        }
      })

    );
  };