import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { GraphEditorComponent } from './graph-editor.component';

describe('GraphEditorComponent', () => {
    let component: GraphEditorComponent;
    let fixture: ComponentFixture<GraphEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GraphEditorComponent],
            providers: [
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideTemplate(GraphEditorComponent, '')
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GraphEditorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be ready component', () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
});
