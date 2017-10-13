import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'field',
    moduleId: module.id,
    templateUrl: 'field.component.html'
})

export class FieldComponent implements OnInit {
    @Input() label: String;
    @Input() value: String;
    @Input() clazz: String;

    ngOnInit(): void {
        console.log(this.value);
        if(this.clazz === null || this.clazz === undefined) {
            this.clazz = 'col-md-6';
        }
    }
}
