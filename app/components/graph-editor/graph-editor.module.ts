import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphEditorComponent } from './graph-editor.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GraphEditorComponent
    ],
    exports: [
        GraphEditorComponent
    ]
})
export class GraphEditorModule {}
