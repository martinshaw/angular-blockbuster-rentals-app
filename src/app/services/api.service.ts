import { Injectable } from '@angular/core';

export type ApiResponseType<TResponseDataType extends any[]> = {
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

  private prepareUrl(url: string) {
    if (url.startsWith('/') === false) url = `/${url}`;

    // TODO: Get from cookie

    return `${this.defaultApiUrl}${url}`;
  }

  public async makeRequest<TResponseDataType extends any[]>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  ): Promise<ApiResponseType<TResponseDataType>> {
    return fetch(this.prepareUrl(url), {
      method,
    })
      .then((response) => response.json())
      .then((data) => ({ data, status: 200 }))
      .catch((error) => ({ data: error, status: 500 }));
  }
}
