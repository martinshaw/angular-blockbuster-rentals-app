import { Injectable } from '@angular/core';

export type ApiResponseType<TResponseDataType extends any[] | Record<string, any>> = {
  data: TResponseDataType;
  status: number;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {
    //
  }

  private defaultApiUrl = 'http://localhost:4202';

  private prepareUrl(url: string, urlParams?: Record<string, string | string[]>) {
    if (url.startsWith('/') === false) url = `/${url}`;
    url = `/api${url}`;

    // TODO: Get host from cookie

    let urlSearchParamsString = '';
    if (urlParams != null) {
      const urlSearchParams = new URLSearchParams();

      for (const [key, value] of Object.entries(urlParams)) {
        if (Array.isArray(value)) {
          [...new Set(value)].forEach((item) => urlSearchParams.append(key, item));
        }
        else {
          urlSearchParams.append(key, value);
        }
      }

      urlSearchParamsString = urlSearchParams.toString();
    }

    return `${this.defaultApiUrl}${url}?${urlSearchParamsString}`;
  }

  public async makeRequest<TResponseDataType extends any[] | Record<string, any>>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    urlParams?: Record<string, string | string[]>,
  ): Promise<ApiResponseType<TResponseDataType>> {
    return fetch(this.prepareUrl(url, urlParams), {
      method,
    })
      .then((response) => response.json())
      .then((data) => ({ data, status: 200 }))
      .catch((error) => ({ data: error, status: 500 }));
  }
}
