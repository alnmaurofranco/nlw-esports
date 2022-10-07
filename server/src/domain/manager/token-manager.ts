export type TokenManagerOptions = Record<string, any>;

export default interface TokenManager {
  generate(data: object | string, options?: TokenManagerOptions): string;
}
