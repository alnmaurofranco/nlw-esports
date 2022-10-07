import TokenManager, {
  TokenManagerOptions,
} from "../../domain/manager/token-manager";

import jwt from "jsonwebtoken";

export default class JwtTokenManager implements TokenManager {
  generate(
    data: string | object,
    options?: TokenManagerOptions | undefined
  ): string {
    return jwt.sign(data, String(process.env.JWT_SECRET_KEY), {
      ...options,
    });
  }
}
