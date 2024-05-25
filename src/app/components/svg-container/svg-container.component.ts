import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-svg-container',
  templateUrl: './svg-container.component.html',
  styleUrl: './svg-container.component.scss'
})
export class SvgContainerComponent {

    constructor() {
        this.svgContent = "";
    }


    @Input() svgContent = "";
}
