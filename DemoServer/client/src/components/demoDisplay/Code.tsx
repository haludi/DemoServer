import * as React from "react";
import { Language } from "../../models/commonModels";
import { Usings } from "./Usings";
import { CodePreview } from "../helpers/CodePreview";
import { CodeHighlight } from "../helpers/CodeHighlight";
import { sliceIntoTwo, applyReplacementToken } from "../../utils/codeParsing";
import { AppState } from "../../store/state";
import { connect } from "react-redux";
import { getCurrentWalkthrough } from "../../store/state/DemoState";
import { LinesRangeDto } from "../../models/dtos";
import { DemoParameter } from "../../models/demoModels";

interface CodeProps {
    language: Language;
    parameters: DemoParameter[];
    sourceCode: string;
    highlightLinesRange?: LinesRangeDto;
    usingsLastLine: number;
}

class CodeDisplay extends React.Component<CodeProps, {}> {
    replaceParameterValues(code: string): string {
        const { parameters } = this.props;
        if (!parameters) {
            return code;
        }

        let result = code;
        for (const param of parameters) {
            result = applyReplacementToken(result, param);
        }

        return result;
    }

    render() {
        const { language, usingsLastLine, sourceCode, highlightLinesRange } = this.props;
        if (!sourceCode) {
            return null;
        }

        const [ usings, mainCode] = sliceIntoTwo(sourceCode, usingsLastLine);
        const linesStart = usingsLastLine + 1;
        const displayCode = this.replaceParameterValues(mainCode);

        const code = highlightLinesRange
            ? <CodeHighlight id="preview-source-code" {...this.props} linesStart={linesStart} highlightLinesRange={highlightLinesRange}>
                {displayCode}
            </CodeHighlight>
            : <CodePreview id="preview-source-code" {...this.props} linesStart={linesStart}>
                {displayCode}
            </CodePreview>;

        return <div className="demo-code">
            <Usings language={language}>{usings}</Usings>
            {code}
        </div>;
    }
}

function mapStateToProps({ demos }: AppState): CodeProps {
    const { demo: dto } = demos;
    const wt = getCurrentWalkthrough(demos);
    return {
        language: demos.language,
        parameters: demos.parameters,
        sourceCode: dto && dto.sourceCode,
        usingsLastLine: dto && dto.usingsLastLine,
        highlightLinesRange: wt && wt.lines
    };
}

export const Code = connect<CodeProps>(mapStateToProps)(CodeDisplay);