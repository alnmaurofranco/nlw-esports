type BaseOAuthStrategyProps = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  grantType: string;
};

export default abstract class BaseOAuthStrategy {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;
  readonly grantType: string;

  constructor(props: BaseOAuthStrategyProps) {
    this.clientId = props.clientId;
    this.clientSecret = props.clientSecret;
    this.redirectUri = props.redirectUri;
    this.grantType = props.grantType;
  }
}
