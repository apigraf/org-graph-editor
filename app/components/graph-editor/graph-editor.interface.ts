export interface IGraphNode {
    id?: string;
    label?: string;
}

export interface IGraphLink {
    source: string;
    target: string;
    label?: string;
}

export interface IGraph {
    nodes: IGraphNode[];
    links: IGraphLink[];
}

export interface IGraphNodeView {
    nodeId: string;
    nodeLabel: string;
    linkLabel: string;
    linkedNodeId: string;
    linkedNodeLabel: string;
}

export interface ISelectOption {
    label: string;
    title: string;
}