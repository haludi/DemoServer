import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store/state";
import { getCurrentWalkthrough } from "../../../store/state/DemoState";
import { Markdown } from "../../helpers/Markdown";

interface Props {
    descriptionHtml: string;
    title: string;
    slug: string;
}

function WalkthroughDescriptionComponent(props: Props) {
    const { descriptionHtml, title, slug } = props;

    const stepNumber = slug && slug.split("-")[1];

    return <div className="walkthrough-step">
        <h2>Step {stepNumber} : {title}</h2>
        <div className="description">
            <Markdown>{descriptionHtml}</Markdown>
        </div>
    </div>;
}

export const WalkthroughDescription = connect<Props>(
    ({ demos }: AppState): Props => {
        const wt = getCurrentWalkthrough(demos);
        return {
            descriptionHtml: wt && wt.descriptionHtml,
            title: wt && wt.title,
            slug: wt && wt.slug
        };
    }
)(WalkthroughDescriptionComponent);