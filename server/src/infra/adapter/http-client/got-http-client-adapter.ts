import HttpClient from "./http-client";
import got, { ExtendOptions, Got, Options } from "got";

export default class GotHttpClientAdapter implements HttpClient {
  #options: Options;
  readonly #httpClient: Got;

  constructor(options?: Options) {
    this.#options = new Options(options);
    this.#httpClient = got.extend(this.#options);
  }

  async get<T>(url: string, options?: any): Promise<T> {
    return await this.#httpClient.get(url, options).json();
  }

  async post<T>(url: string, data: any, options?: any): Promise<T> {
    return await this.#httpClient.post(url, { body: data, ...options }).json();
  }
}
