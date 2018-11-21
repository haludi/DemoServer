import { DemoParamsDto } from "./dtos";

export interface Demo {
    slug: string;
    title: string;
}

export interface DemoWithProgress extends Demo {
    completed?: boolean;
}

export interface DemoCategory {
    slug: string;
    demos: DemoWithProgress[];
}

export type ParameterType = "text" | "date" | "number";

export interface DemoParameter {
    name: string;
    value: any;
    type: ParameterType;
}

export function toDemoParamsDto(parameters: DemoParameter[]): DemoParamsDto {
    return parameters.reduce((acc, current) => {
        return {...acc, [current.name]: current.value}
    }, {});
}