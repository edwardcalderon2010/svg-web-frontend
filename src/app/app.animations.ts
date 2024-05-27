import {animation, style, animate, trigger, transition, useAnimation} from "@angular/animations";

export const dynamicFontRenderAnimation = animation([
    style({ strokeDashoffset: '{{resetDash}}' }),
    animate('{{time}}', style({ strokeDashoffset: 0 }))
]);