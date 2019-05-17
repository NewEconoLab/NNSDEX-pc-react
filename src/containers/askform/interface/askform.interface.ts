import { RouteComponentProps } from "react-router";

export interface IAskFormStore{
    stepNumber:number, // 普通挂单步骤
}

export interface IAskFormProps extends RouteComponentProps{
    askform:IAskFormStore,
    intl: any,
}