import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideTemplate(AppComponent, '')
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be ready component', () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
});
