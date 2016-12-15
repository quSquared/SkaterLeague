import {Directive, ElementRef, Renderer} from '@angular/core';

import {MediaMonitor} from '../../media-query/media-monitor';
import {BaseFxDirective} from './base';

const FLEX_FILL_CSS = {
  'margin': 0,
  'width': '100%',
  'height': '100%',
  'min-width': '100%',
  'min-height': '100%'
};

/**
 * 'qu-fill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: qu-fill is NOT responsive API!!
 */
@Directive({selector: `
  [qu-fill],
  [qu-fill.xs]
  [qu-fill.gt-xs],
  [qu-fill.sm],
  [qu-fill.gt-sm]
  [qu-fill.md],
  [qu-fill.gt-md]
  [qu-fill.lg],
  [qu-fill.gt-lg],
  [qu-fill.xl]
`})
export class FlexFillDirective extends BaseFxDirective {
  constructor(monitor : MediaMonitor, public elRef: ElementRef, public renderer: Renderer) {
    super(monitor, elRef, renderer);
    this._applyStyleToElement(FLEX_FILL_CSS);
  }
}
