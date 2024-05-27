import {Component, ApplicationRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {SvgFetchService} from "../../services/svg-fetch.service";
import {Observable} from "rxjs";
import {SvgResponse} from "../../model/svg-response";
import {FormControl} from "@angular/forms";
import {
    useAnimation,
    AnimationBuilder,
    AnimationPlayer
} from '@angular/animations';
import {dynamicFontRenderAnimation} from "../../app.animations";


@Injectable()
@Component({
  selector: 'app-svg-render',
  templateUrl: './svg-render.component.html',
  styleUrl: './svg-render.component.scss',

})
export class SvgRenderComponent {

  constructor (private svgFetchService: SvgFetchService,
               private injector: EnvironmentInjector,
               private applicationRef: ApplicationRef,
               private _builder: AnimationBuilder) {
  }

  renderForm = new FormControl('');

  svgData = '<svg></svg>';

  svgResponse$!: Observable<SvgResponse>;
  handleClick() {
    let svgText = this.renderForm.value;
    //console.log('Form contents: ' + svgText);
    if (svgText != undefined && svgText?.toString().length > 0) {
      this.svgResponse$ = this.svgFetchService.getSVG(svgText);
      this.svgResponse$.subscribe( json => {
        //console.log('Got json response as observable: ' + json.payload);
        this.svgData = json.payload;

        document.getElementById('targetInsertContainer')!.innerHTML = json.payload;
        var nodeList: NodeListOf<SVGGeometryElement> = document.querySelectorAll('.strokeMask');

        nodeList.forEach(elem => {
          console.log(elem.id + ' ' + elem.getTotalLength().toString());
          elem.setAttribute('stroke-dashoffset',elem.getTotalLength().toString());
          elem.setAttribute('stroke-dasharray',elem.getTotalLength().toString());
        });

        this.groupAnimate();
      });


    }
  }



  groupAnimate() {
      let nodeList: NodeListOf<SVGGeometryElement> = document.querySelectorAll('.strokeMask');
      let totalLength = 0;
      nodeList.forEach(elem => {
          totalLength += elem.getTotalLength();
      });
      console.log('Got total length: ' + totalLength);
      console.log('Got mod diff: ' + (totalLength - totalLength%1000));
      let duration = (totalLength - totalLength%1000) * (300/500);

      const playerMap = new Map<string,AnimationPlayer>();
      let elemIdx: number = 1;
      let tempPlayer: AnimationPlayer;
      let lastKey: string = '';
      let tempDelay = 0;

      for (elemIdx = 1; (nodeList.length - elemIdx) >= 0; elemIdx++) {
          let tempElem: SVGGeometryElement = nodeList.item(nodeList.length - elemIdx);
          const subDuration = (tempElem.getTotalLength() / totalLength) * duration;
          tempDelay += subDuration;
          const animeDelay = duration - tempDelay;

          tempPlayer = this.nestedAnimator(tempElem, tempElem.getTotalLength(), subDuration, (animeDelay < 1 ? 0:animeDelay));
          playerMap.set(tempElem.id,tempPlayer);

          tempPlayer.play();
      }
  }
  nestedAnimator(targetElem: SVGGeometryElement, subLength: number, subDuration: number, delay: number): AnimationPlayer {

      const timeVal = subDuration + 'ms' + ' ' + delay + 'ms';
      console.log('Time set: ' + timeVal + ' for ' + targetElem.id);

      let player1 = this._builder.build([
          useAnimation(dynamicFontRenderAnimation)]).create(targetElem, {params:{
              time:timeVal,
              resetDash:subLength
          }});

      return player1;

  }
}
