import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GraphEditorComponent } from './graph-editor.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        NgxGraphModule,
        FormsModule
    ],
    declarations: [
        GraphEditorComponent
    ],
    exports: [
        GraphEditorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GraphEditorModule {}
