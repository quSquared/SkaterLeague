import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Renderer,
  SimpleChanges,
} from '@angular/core';

import {BaseFxDirective} from './base';
import {MediaChange} from '../../media-query/media-change';
import {MediaMonitor} from '../../media-query/media-monitor';

/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
@Directive({selector:`
  [qu-flex-align],
  [qu-flex-align.xs]
  [qu-flex-align.gt-xs],
  [qu-flex-align.sm],
  [qu-flex-align.gt-sm]
  [qu-flex-align.md],
  [qu-flex-align.gt-md]
  [qu-flex-align.lg],
  [qu-flex-align.gt-lg],
  [qu-flex-align.xl]
`
})
export class FlexAlignDirective extends BaseFxDirective implements OnInit, OnChanges, OnDestroy {

  @Input('qu-flex-align')       set align(val)     { this._cacheInput('align', val); }
  @Input('qu-flex-align.xs')    set alignXs(val)   { this._cacheInput('alignXs', val); }
  @Input('qu-flex-align.gt-xs') set alignGtXs(val) { this._cacheInput('alignGtXs', val); };
  @Input('qu-flex-align.sm')    set alignSm(val)   { this._cacheInput('alignSm', val); };
  @Input('qu-flex-align.gt-sm') set alignGtSm(val) { this._cacheInput('alignGtSm', val); };
  @Input('qu-flex-align.md')    set alignMd(val)   { this._cacheInput('alignMd', val); };
  @Input('qu-flex-align.gt-md') set alignGtMd(val) { this._cacheInput('alignGtMd', val); };
  @Input('qu-flex-align.lg')    set alignLg(val)   { this._cacheInput('alignLg', val); };
  @Input('qu-flex-align.gt-lg') set alignGtLg(val) { this._cacheInput('alignGtLg', val); };
  @Input('qu-flex-align.xl')    set alignXl(val)   { this._cacheInput('alignXl', val); };

  constructor(monitor : MediaMonitor, elRef: ElementRef, renderer: Renderer) {
    super(monitor, elRef, renderer);
  }


  // *********************************************
  // Lifecycle Methods
  // *********************************************

  /**
   * For @Input changes on the current mq activation property, see onMediaQueryChanges()
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['align'] != null || this._mqActivation) {
      this._updateWithValue();
    }
  }

  /**
   * After the initial onChanges, build an mqActivation object that bridges
   * mql change events to onMediaQueryChange handlers
   */
  ngOnInit() {
    this._listenForMediaQueryChanges('align', 'stretch', (changes: MediaChange) =>{
      this._updateWithValue(changes.value);
    });
    this._updateWithValue();
  }

  // *********************************************
  // Protected methods
  // *********************************************

  _updateWithValue(value?: string|number) {
    value = value || this._queryInput("align") || 'stretch';
    if (this._mqActivation) {
      value = this._mqActivation.activatedInput;
    }

    this._applyStyleToElement(this._buildCSS(value));
  }

  _buildCSS(align) {
    let css = {};

    // Cross-axis
    switch (align) {
      case 'start':
        css['align-self'] = 'flex-start';
        break;
      case 'baseline':
        css['align-self'] = 'baseline';
        break;
      case 'center':
        css['align-self'] = 'center';
        break;
      case 'end':
        css['align-self'] = 'flex-end';
        break;
      default:
        css['align-self'] = 'stretch';
        break;  // default
    }

    return css;
  }
}
