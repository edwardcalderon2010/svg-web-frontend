import {Component, ApplicationRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {SvgFetchService} from "../../services/svg-fetch.service";
import {Observable} from "rxjs";
import {SvgResponse} from "../../model/svg-response";
import {FormControl} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {SvgContainerComponent} from "../svg-container/svg-container.component";

@Injectable()
@Component({
  selector: 'app-svg-render',
  templateUrl: './svg-render.component.html',
  styleUrl: './svg-render.component.scss'
})
export class SvgRenderComponent {

  constructor (private svgFetchService: SvgFetchService,
               private injector: EnvironmentInjector,
               private applicationRef: ApplicationRef) {
  }

  renderForm = new FormControl('');

  loading = 'true';
  svgData = '<svg></svg>';

  svgResponse$!: Observable<SvgResponse>;
  handleClick() {
    let svgText = this.renderForm.value;
    console.log('Form contents: ' + svgText);
    if (svgText != undefined && svgText?.toString().length > 0) {
      this.svgResponse$ = this.svgFetchService.getSVG(svgText);
      this.svgResponse$.subscribe( json => {
        console.log('Got json response as observable: ' + json.payload);
        this.svgData = json.payload;


        document.getElementById('targetInsertContainer')!.innerHTML = json.payload;
        var nodeList: NodeListOf<SVGGeometryElement> = document.querySelectorAll('.strokeMask');

        nodeList.forEach(elem => {
          console.log(elem.id + ' ' + elem.getTotalLength().toString());
          elem.setAttribute('stroke-dashoffset',elem.getTotalLength().toString());
          //elem.setAttribute('stroke-dasharray',elem.getTotalLength().toString());

        })

      });


    }
  }
}
