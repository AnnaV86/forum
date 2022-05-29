import { ThunkAction } from 'redux-thunk';

declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
    <T extends ThunkAction<any, any, any, any>>(
      action: T
    ): T extends ThunkAction<infer K, any, any, any> ? K : never;
  }
}
