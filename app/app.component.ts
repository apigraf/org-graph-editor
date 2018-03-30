import { Component, ViewEncapsulation } from '@angular/core';
import { IGraph } from './components/graph-editor/graph-editor.interface';

@Component({
    selector: 'app',
    templateUrl: 'app.component.pug',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public graph: IGraph = {
        nodes: [
            {
                id: '1',
                label: 'ООО Апельсин'
            },
            {
                id: '2',
                label: 'ООО Виноград'
            },
            {
                id: '3',
                label: 'ИП Виноградов'
            },
            {
                id: '4',
                label: 'АО Супер Арбуз'
            },
            {
                id: '5',
                label: 'ООО Кокос'
            },
        ],
        links: [
            {
                source: '1',
                target: '2',
                label: 'founder'
            },
            {
                source: '2',
                target: '3',
                label: 'founder'
            },
            {
                source: '2',
                target: '4',
                label: 'parent'
            },
            {
                source: '1',
                target: '5',
                label: 'parent'
            },
        ]
    };

    public graph2: IGraph = {
        nodes: [
            {
                id: '1',
                label: 'ООО Марс'
            },
            {
                id: '2',
                label: 'ООО Земля'
            },
            {
                id: '3',
                label: 'ООО Венера'
            },
            {
                id: '4',
                label: 'ООО Нептун'
            },
            {
                id: '5',
                label: 'ООО Сатурн'
            },
        ],
        links: [
            {
                source: '1',
                target: '2',
                label: 'founder'
            },
            {
                source: '1',
                target: '3',
                label: 'founder'
            },
            {
                source: '3',
                target: '4',
                label: 'parent'
            },
            {
                source: '2',
                target: '5',
                label: 'founder'
            },
        ]
    };

    public logGraphsData() {
        console.log(this.graph);
        console.log(this.graph2);
    }
}
