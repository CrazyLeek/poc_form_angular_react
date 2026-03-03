import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const COUPON_ENDPOINT = '/api/coupon/validate';
const NETWORK_LATENCY_MS = 700;

export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (req.method !== 'POST' || !isCouponEndpoint(req.url)) {
    return next(req);
  }

  const rawCode = extractCouponCode(req.body);
  const normalizedCode = rawCode.trim().toUpperCase();

  return timer(NETWORK_LATENCY_MS).pipe(
    mergeMap(() => {
      if (normalizedCode === 'SOLUTAP2026') {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              valid: true,
              code: normalizedCode,
              message: 'Code promo appliqué !',
              discountPercent: 25,
            },
          }),
        );
      }

      if (normalizedCode === 'SERVER500') {
        return throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              statusText: 'Internal Server Error',
              error: {
                message: 'Erreur technique, veuillez réessayer plus tard.',
              },
            }),
        );
      }

      return of(
        new HttpResponse({
          status: 200,
          body: {
            valid: false,
            code: normalizedCode,
            message: 'Code promo invalide.',
          },
        }),
      );
    }),
  );
};

function isCouponEndpoint(url: string): boolean {
  try {
    const parsedUrl = new URL(url, window.location.origin);
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/, '');
    return normalizedPath === COUPON_ENDPOINT;
  } catch {
    const normalizedUrl = url.split('?')[0].replace(/\/+$/, '');
    return normalizedUrl === COUPON_ENDPOINT || normalizedUrl.endsWith(COUPON_ENDPOINT);
  }
}

function extractCouponCode(body: unknown): string {
  if (typeof body !== 'object' || body === null || !('code' in body)) {
    return '';
  }

  const code = (body as { code?: unknown }).code;
  return typeof code === 'string' ? code : '';
}
