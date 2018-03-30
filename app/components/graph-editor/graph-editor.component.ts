import * as shape from 'd3-shape';
import {
    Component,
    forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    IGraph,
    IGraphLink,
    IGraphNode,
    IGraphNodeView,
    ISelectOption
} from './graph-editor.interface';

export const LINK_LABEL_TITLE_MAP: ISelectOption[] = [
    {
        label: '',
        title: '...'
    },
    {
        label: 'founder',
        title: 'Учредитель'
    },
    {
        label: 'parent',
        title: 'Материнская'
    }
];

@Component({
    selector: 'graph-editor',
    templateUrl: 'graph-editor.component.pug',
    styleUrls: ['./graph-editor.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GraphEditorComponent),
        multi: true
    }]
})
export class GraphEditorComponent implements ControlValueAccessor {
    public curve: any = shape.curveBundle.beta(1);
    public graphView: [number, number] = [600, 250];
    public readonly options: ISelectOption[] = LINK_LABEL_TITLE_MAP;
    public changingLinkedNodeId: string;

    private readyForChangeInputElement: HTMLElement;
    private cache = {};

    // Base models:
    public graph: IGraph = {
        nodes: [],
        links: []
    };
    public graphNodesView: IGraphNodeView[] = [];

    // For ngModule (ControlValueAccessor):
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;

    // From ControlValueAccessor interface:

    public writeValue(value: any) {
        if (value && value.nodes && value.links && value !== this.graph) {
            this.graph = value;

            this.graphNodesView = this.graph.nodes.map((node): IGraphNodeView => {
                const foundLink: IGraphLink = this.graph.links.find((link) => link.target === node.id);
                const foundNode: IGraphNode = this.graph.nodes.find((linkedNode) =>
                    foundLink && linkedNode.id === foundLink.source);

                return {
                    nodeId: node.id,
                    nodeLabel: node.label,
                    linkLabel: foundLink ? foundLink.label : '',
                    linkedNodeId: foundNode ? foundNode.id : '',
                    linkedNodeLabel: foundNode ? foundNode.label : ''
                };
            });
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // Public methods:

    public getLinkTitle(linkLabel): string {
        const foundLink: ISelectOption = LINK_LABEL_TITLE_MAP.find((link) => link.label === linkLabel);

        return foundLink && foundLink.title ? foundLink.title : '';
    }

    public addNewNode() {
        const nodeId = this.generateNodeId();
        const nodeLabel = 'Новая Компания';

        this.graphNodesView.push({
            nodeId: nodeId,
            nodeLabel: nodeLabel,
            linkLabel: '',
            linkedNodeId: '',
            linkedNodeLabel: ''
        });

        this.graph.nodes.push({
            id: nodeId,
            label: nodeLabel
        });

        this.graph.nodes = [...this.graph.nodes];

        this.onChangeCallback(this.graph);
    }

    public changeNodeLabel($event, nodeId) {
        this.graph.nodes = this.graph.nodes.map((node) => {
            if (node.id === nodeId) {
                node.label = $event.target.value;
            }

            return node;
        });

        this.onChangeCallback(this.graph);
    }

    public setChangingLinkedNode($event, nodeId): void {
        const isCurrentLinkedNode = this.changingLinkedNodeId && this.changingLinkedNodeId === nodeId;

        if (!isCurrentLinkedNode || !this.changingLinkedNodeId) {
            this.changingLinkedNodeId = nodeId;
            this.readyForChangeInputElement = $event.target;
        } else if (isCurrentLinkedNode) {
            this.stopChangingLinkedNode();
        }
    }

    public changeLinkedNode($event, nodeId, nodeLabel): void {
        const isCurrentLinkedNode = nodeId
            && this.changingLinkedNodeId
            && this.changingLinkedNodeId === nodeId;

        if (!isCurrentLinkedNode && this.changingLinkedNodeId) {
            const foundNodeView: IGraphNodeView = this.graphNodesView.find((node) => {
                return node.nodeId === this.changingLinkedNodeId;
            });

            if (foundNodeView) {
                if (foundNodeView.linkedNodeId === '') {
                    const foundNodeView: IGraphNodeView = this.graphNodesView.find((node) => {
                        return node.nodeId === this.changingLinkedNodeId;
                    });

                    this.graph.links.push({
                        source: nodeId,
                        target: this.changingLinkedNodeId,
                        label: foundNodeView.linkLabel
                    });
                }

                this.graph.links = this.graph.links.map((link) => {
                    if (link.target === this.changingLinkedNodeId) {
                        link.source = nodeId;
                    }

                    return link;
                });

                foundNodeView.linkedNodeId = nodeId;
                foundNodeView.linkedNodeLabel = nodeLabel;

                this.onChangeCallback(this.graph);
            }

            this.readyForChangeInputElement.focus();
            $event.stopPropagation();
            this.stopChangingLinkedNode();
        }
    }

    public changeLinkLabel($event, nodeId) {
        // TODO: Разобраться с багом - не работает изменение связи. Точнее не перерендеривается надпись на графе.
        this.graph.links = this.graph.links.map((link) => {
            if (link.target === nodeId) {
                link.label = $event.target.value;
            }

            return link;
        });

        this.onChangeCallback(this.graph);
    }

    public deleteNode(nodeId) {
        this.graph.links = this.graph.links
            .filter((link) => link.source !== nodeId && link.target !== nodeId);
        this.graph.nodes = this.graph.nodes.filter((node) => node.id !== nodeId);

        while (true) {
            const foundNodeView: IGraphNodeView = this.graphNodesView.find((item) => {
                return item.linkedNodeId === nodeId;
            });

            if (!foundNodeView) {
                break;
            }

            foundNodeView.linkedNodeId = '';
            foundNodeView.linkedNodeLabel = '';
            foundNodeView.linkLabel = '';
        }

        this.graphNodesView = this.graphNodesView.filter((node) => node.nodeId !== nodeId);

        this.graph.nodes = [...this.graph.nodes];
        this.graph.links = [...this.graph.links];

        this.onChangeCallback(this.graph);
    }

    public deleteLink(node) {
        this.graph.links = this.graph.links.filter((link) => link.target !== node.nodeId);

        node.linkLabel = '';
        node.linkedNodeId = '';
        node.linkedNodeLabel = '';

        this.graph.links = [...this.graph.links];

        this.onChangeCallback(this.graph);
    }

    // Private methods:

    private stopChangingLinkedNode(): void {
        this.changingLinkedNodeId = undefined;
        this.readyForChangeInputElement = undefined;
    }

    private generateNodeId(): string {
        let newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
        newId = `a${newId}`;

        if (!this.cache[newId]) {
            this.cache[newId] = true;
            return newId;
        }

        return this.generateNodeId();
    }
}