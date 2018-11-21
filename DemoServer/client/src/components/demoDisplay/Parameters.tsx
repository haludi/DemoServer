import * as React from "react";
import { DemoParameter } from "../../models/demoModels";
import { DemoThunkDispatch } from "../../store";
import { connect } from "react-redux";
import { changeDemoParams, initDemoParams } from "../../store/actions/demoActions";

export interface ParameterItem {
    type: "text" | "date" | "number";
    name: string;
    placeholder: string;
    datatype?: "integer" | "float"
}

export interface ParameterOwnProps {
    paramDefinitions: ParameterItem[];
}

interface ParameterDispatchProps {
    initParams: (parameters: DemoParameter[]) => void;
    handleValueChange: (paramName: string, value: any) => void;
}

type ParametersProps = ParameterOwnProps & ParameterDispatchProps;

function toDemoParameter({ name, placeholder, type }: ParameterItem): DemoParameter {
    return {
        name,
        value: placeholder,
        type
    };
}

class ParametersDisplay extends React.Component<ParametersProps, {}> {
    componentDidMount() {
        const { initParams, paramDefinitions } = this.props;
        const paramPairs = paramDefinitions.map(toDemoParameter);
        initParams(paramPairs);
    }

    displayItem(item: ParameterItem, index: number) {
        const { type, name, placeholder, datatype } = item;
        const { handleValueChange } = this.props;

        return <div className="parameter" key={`parameter_${name}_${index}`}>
            <input type={type} datatype={datatype}
                className="parameter-input"
                placeholder={placeholder}
                onChange={e => handleValueChange(name, e.target.value)} />
            <div className="parameter-label">
                <div className="name">{name}</div>
                <div className="type"></div>
            </div>
        </div>;
    }

    render() {
        const { paramDefinitions } = this.props;
        return <div className="parameters">
            {paramDefinitions.map((x, i) => this.displayItem(x, i))}
        </div>;
    }
}

function mapDispatchToProps(dispatch: DemoThunkDispatch): ParameterDispatchProps {
    return {
        initParams: (parameters: DemoParameter[]) => dispatch(initDemoParams(parameters)),
        handleValueChange: (paramName: string, value: any) => dispatch(changeDemoParams(paramName, value))
    };
}

export const Parameters = connect<{}, ParameterDispatchProps, ParameterOwnProps>(null, mapDispatchToProps)(ParametersDisplay);