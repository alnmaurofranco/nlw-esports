import axios, { Axios, AxiosRequestConfig } from "axios";
import HttpClient from "./http-client";

export default class AxiosHttpClientAdapter implements HttpClient {
  readonly #options: AxiosRequestConfig | undefined;
  readonly #httpClient: Axios;

  constructor(options?: AxiosRequestConfig) {
    if (options) {
      this.#options = options;
      this.#httpClient = axios.create(this.#options);
    }
    this.#httpClient = axios.create();
  }

  async get<T>(url: string, options: any): Promise<T> {
    return await this.#httpClient.get(url, options);
  }

  async post<T>(url: string, data: any, options?: any): Promise<T> {
    return await this.#httpClient.post(url, data, options);
  }
}
