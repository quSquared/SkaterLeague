import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer,
  SimpleChanges,
} from '@angular/core';

import {BaseFxDirective} from './base';
import {MediaChange} from '../../media-query/media-change';
import {MediaMonitor} from '../../media-query/media-monitor';

/**
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
@Directive({selector: `
  [qu-layout-wrap],
  [qu-layout-wrap.xs]
  [qu-layout-wrap.gt-xs],
  [qu-layout-wrap.sm],
  [qu-layout-wrap.gt-sm]
  [qu-layout-wrap.md],
  [qu-layout-wrap.gt-md]
  [qu-layout-wrap.lg],
  [qu-layout-wrap.gt-lg],
  [qu-layout-wrap.xl]
`})
export class LayoutWrapDirective extends BaseFxDirective implements OnInit, OnChanges, OnDestroy {

  @Input('qu-layout-wrap')       set wrap(val)     { this._cacheInput("wrap", val); }
  @Input('qu-layout-wrap.xs')    set wrapXs(val)   { this._cacheInput('wrapXs', val); }
  @Input('qu-layout-wrap.gt-xs') set wrapGtXs(val) { this._cacheInput('wrapGtXs', val); };
  @Input('qu-layout-wrap.sm')    set wrapSm(val)   { this._cacheInput('wrapSm', val); };
  @Input('qu-layout-wrap.gt-sm') set wrapGtSm(val) { this._cacheInput('wrapGtSm', val); };
  @Input('qu-layout-wrap.md')    set wrapMd(val)   { this._cacheInput('wrapMd', val); };
  @Input('qu-layout-wrap.gt-md') set wrapGtMd(val) { this._cacheInput('wrapGtMd', val); };
  @Input('qu-layout-wrap.lg')    set wrapLg(val)   { this._cacheInput('wrapLg', val); };
  @Input('qu-layout-wrap.gt-lg') set wrapGtLg(val) { this._cacheInput('wrapGtLg', val); };
  @Input('qu-layout-wrap.xl')    set wrapXl(val)   { this._cacheInput('wrapXl', val); };

  constructor(monitor : MediaMonitor, elRef: ElementRef, renderer: Renderer) {
    super(monitor, elRef, renderer)
  }

  // *********************************************
  // Lifecycle Methods
  // *********************************************

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wrap'] != null || this._mqActivation) {
      this._updateWithValue();
    }
  }

  /**
   * After the initial onChanges, build an mqActivation object that bridges
   * mql change events to onMediaQueryChange handlers
   */
  ngOnInit() {
    this._listenForMediaQueryChanges('wrap', 'wrap', (changes: MediaChange) =>{
      this._updateWithValue(changes.value);
    });
    this._updateWithValue();
  }


  // *********************************************
  // Protected methods
  // *********************************************

  _updateWithValue(value?: string) {
    value = value || this._queryInput("wrap") || 'wrap';
    if (this._mqActivation) {
      value = this._mqActivation.activatedInput;
    }
    value = this._validateValue(value);

    this._applyStyleToElement(this._buildCSS(value));
  }


  /**
   * Build the CSS that should be assigned to the element instance
   */
  _buildCSS(value) {
    return { 'flex-wrap': value };
  }

  /**
   * Convert layout-wrap="<value>" to expected flex-wrap style
   */
  _validateValue(value) {
    switch (value.toLowerCase()) {
      case 'reverse':
      case 'wrap-reverse':
        value = 'wrap-reverse';
        break;

      case 'no':
      case 'none':
      case 'nowrap':
        value = 'nowrap';
        break;

      // All other values fallback to "wrap"
      default:
        value = 'wrap';
        break;
    }
    return value;
  }
}
