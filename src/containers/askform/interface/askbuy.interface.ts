import { RouteComponentProps } from "react-router";

export interface IAskBuyStore{
    askBuyStep:number, // 求购挂单步骤
}

export interface IAskBuyProps extends RouteComponentProps{
    askbuy:IAskBuyStore,
    intl: any,
}