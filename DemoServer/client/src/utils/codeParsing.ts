import { DemoParameter } from "../models/demoModels";

export function sliceIntoTwo(text: string, pivotLineNum: number): string[] {
    const newLineRegex = /\r?\n/gm;

    let i = 1;
    let sliceIndex = 0;
    let match = null;

    while (match = newLineRegex.exec(text)) {
        if (i === pivotLineNum) {
            sliceIndex = match.index;
            break;
        }
        i++;
    }

    const firstResult = text.substr(0, sliceIndex);
    const secondResult = text.substr(sliceIndex + 2);

    return [firstResult, secondResult];
}

function getReplacementValue(param: DemoParameter) {
    const { value, type } = param;

    if (type === "text") {
        return `"${value}"`;
    }

    return value;
}

export function applyReplacementToken(code: string, param: DemoParameter) {
    if (!code || !param) {
        return code;
    }

    const toReplace = `[[${param.name}]]`;
    const value = getReplacementValue(param);
    return code.replace(toReplace, value);
}