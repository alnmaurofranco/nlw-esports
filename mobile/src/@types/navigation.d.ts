import { Game } from "../types";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: Game;
    }
  }
}
