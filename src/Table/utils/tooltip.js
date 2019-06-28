/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import Popper from 'popper.js';

const CSS = {
  HIDDEN: 'vue-tooltip-hidden',
  VISIBLE: 'vue-tooltip-visible',
};
const BASE_CLASS = `h-tooltip  ${CSS.HIDDEN}`;
const PLACEMENT = ['top', 'left', 'right', 'bottom', 'auto'];
const SUB_PLACEMENT = ['start', 'end'];

const EVENTS = {
  ADD: 1,
  REMOVE: 2,
};

const DEFAULT_OPTIONS = {
  container: false,
  delay: 200,
  instance: null, // the popper.js instance
  fixIosSafari: false,
  eventsEnabled: false,
  html: false,
  modifiers: {
    arrow: {
      element: '.tooltip-arrow',
    },
  },
  placement: '',
  placementPostfix: null, // start | end
  removeOnDestroy: true,
  title: '',
  class: '', // ex: 'tooltip-custom tooltip-other-custom'
  triggers: ['hover', 'focus'],
  offset: 5,
};

const includes = (stack, needle) => stack.indexOf(needle) > -1;

export default class Tooltip {
  constructor(el, options = {}) {
    // Tooltip._defaults = DEFAULT_OPTIONS;
    this._options = {
      ...Tooltip._defaults,
      ...{
        onCreate: (data) => {
          this.content(this.tooltip.options.title);
          // this._$tt.update();
        },
        onUpdate: (data) => {
          this.content(this.tooltip.options.title);
          // this._$tt.update();
        },
      },
      ...Tooltip.filterOptions(options),
    };

    this._$el = el;

    this._$tpl = this._createTooltipElement(this.options);
    this._$tt = new Popper(el, this._$tpl, this._options);
    this.setupPopper();
  }

  setupPopper() {
    // this._$el.insertAdjacentElement('afterend', this._$tpl);
    this.disabled = false;
    this._visible = false;
    this._clearDelay = null;
    this._$tt.disableEventListeners();
    this._setEvents();
  }

  destroy() {
    this._cleanEvents();
    if (this._$tpl && this._$tpl.parentNode) {
      this._$tpl.parentNode.removeChild(this._$tpl);
    }
  }

  get options() {
    return { ...this._options };
  }

  get tooltip() {
    return this._$tt;
  }

  get visible() {
    return this._visible;
  }

  set visible(val) {
    if (typeof val === 'boolean') {
      this._visible = val;
    }
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    if (typeof val === 'boolean') {
      this._disabled = val;
    }
  }

  show() {
    this.toggle(true);
  }

  hide() {
    this.toggle(false);
  }

  toggle(visible, autoHide = true) {
    let delay = this._options.delay;

    if (this.disabled === true) {
      visible = false;
      delay = 0;
    }

    if (typeof visible !== 'boolean') {
      visible = !this._visible;
    }

    if (visible === true) {
      delay = 0;
    }

    clearTimeout(this._clearDelay);

    if (autoHide === true) {
      this._clearDelay = setTimeout(() => {
        this.visible = visible;
        if (this.visible === true && this.disabled !== true) {
          // add tooltip node
          this._$el.insertAdjacentElement('afterend', this._$tpl);

          // Need the timeout to be sure that the element is inserted in the DOM
          setTimeout(() => {
            // enable eventListeners
            this._$tt.enableEventListeners();
            // only update if the tooltip is visible
            this._$tt.scheduleUpdate();
            // switch CSS
            this._$tpl.classList.replace(CSS.HIDDEN, CSS.VISIBLE);
          }, 60);
        } else {
          this._$tpl.classList.replace(CSS.VISIBLE, CSS.HIDDEN);
          // remove tooltip node
          if (this._$tpl && this._$tpl.parentNode) {
            this._$tpl.parentNode.removeChild(this._$tpl);
          }

          this._$tt.disableEventListeners();
        }
      }, delay);
    }
  }

  _createTooltipElement(options) {
    // wrapper
    const $popper = document.createElement('div');
    $popper.setAttribute('id', `tooltip-${randomId()}`);
    $popper.setAttribute('class', `${BASE_CLASS} ${this._options.class}`);

    // make arrow
    const $arrow = document.createElement('div');
    $arrow.setAttribute('class', 'tooltip-arrow');
    $arrow.setAttribute('x-arrow', '');
    $popper.appendChild($arrow);

    // make content container
    const $content = document.createElement('div');
    $content.setAttribute('class', 'tooltip-content');
    $popper.appendChild($content);

    return $popper;
  }

  _events(type = EVENTS.ADD) {
    const evtType =
      type === EVENTS.ADD ? 'addEventListener' : 'removeEventListener';
    if (!Array.isArray(this.options.triggers)) {
      console.error("trigger should be an array", this.options.triggers); // eslint-disable-line
      return;
    }

    const lis = (...params) => this._$el[evtType](...params);

    if (includes(this.options.triggers, 'manual')) {
      lis('click', this._onToggle.bind(this), false);
    } else {
      // For the strange iOS/safari behaviour, we remove any
      // 'hover' and replace it by a 'click' event
      if (
        this.options.fixIosSafari &&
        Tooltip.isIosSafari() &&
        includes(this.options.triggers, 'hover')
      ) {
        const pos = this.options.triggers.indexOf('hover');
        const click = includes(this.options.triggers, 'click');
        this._options.triggers[pos] = click !== -1 ? 'click' : null;
      }

      // eslint-disable-next-line array-callback-return
      this.options.triggers.map((evt) => {
        switch (evt) {
          case 'click':
            lis(
              'click',
              (e) => {
                this._onToggle(e);
              },
              false,
            );
            // document[evtType]('click', this._onDeactivate.bind(this), false);
            break;
          case 'hover':
            lis('mouseenter', this._onActivate.bind(this), false);
            lis('mouseleave', this._onDeactivate.bind(this), false);
            break;
          case 'focus':
            lis('focus', this._onActivate.bind(this), false);
            lis('blur', this._onDeactivate.bind(this), true);
            break;
          default:
            break;
        }
      });

      if (
        includes(this.options.triggers, 'hover') ||
        includes(this.options.triggers, 'focus')
      ) {
        this._$tpl[evtType](
          'mouseenter',
          this._onMouseOverTooltip.bind(this),
          false,
        );
        this._$tpl[evtType](
          'mouseleave',
          this._onMouseOutTooltip.bind(this),
          false,
        );
      }
    }
  }

  _setEvents() {
    this._events();
  }

  _cleanEvents() {
    this._events(EVENTS.REMOVE);
  }

  _onActivate(e) {
    this.show();
  }

  _onDeactivate(e) {
    this.hide();
  }

  _onToggle(e) {
    e.stopPropagation();
    e.preventDefault();
    this.toggle();
  }

  _onMouseOverTooltip(e) {
    this.toggle(true, false);
  }

  _onMouseOutTooltip(e) {
    this.toggle(false);
  }

  content(content) {
    const wrapper = this.tooltip.popper.querySelector('.tooltip-content');
    if (typeof content === 'string') {
      this.tooltip.options.title = content;
      wrapper.textContent = content;
    } else if (isElement(content)) {
      if (content !== wrapper.children[0]) {
        wrapper.innerHTML = '';
        // this.tooltip.htmlContent = content.cloneNode(true);
        this.tooltip.htmlContent = content;
        wrapper.appendChild(this.tooltip.htmlContent);
      }
    } else {
      console.error("unsupported content type", content); // eslint-disable-line
    }
  }

  set class(val) {
    if (typeof val === 'string') {
      const classList = this._$tpl.classList.value.replace(
        this.options.class,
        val,
      );
      this._options.class = classList;
      this._$tpl.setAttribute('class', classList);
    }
  }

  static filterOptions(options) {
    const opt = { ...options };

    opt.modifiers = {};
    let head = null;
    let tail = null;
    if (opt.placement.indexOf('-') > -1) {
      [head, tail] = opt.placement.split('-');
      opt.placement =
        includes(PLACEMENT, head) && includes(SUB_PLACEMENT, tail)
          ? opt.placement
          : Tooltip._defaults.placement;
    } else {
      opt.placement = includes(PLACEMENT, opt.placement)
        ? opt.placement
        : Tooltip._defaults.placement;
    }

    opt.modifiers.offset = {
      fn: Tooltip._setOffset,
    };

    return opt;
  }

  static _setOffset(data, opts) {
    let offset = data.instance.options.offset;

    if (window.isNaN(offset) || offset < 0) {
      offset = Tooltip._defaults.offset;
    }

    if (data.placement.indexOf('top') !== -1) {
      data.offsets.popper.top -= offset;
    } else if (data.placement.indexOf('right') !== -1) {
      data.offsets.popper.left += offset;
    } else if (data.placement.indexOf('bottom') !== -1) {
      data.offsets.popper.top += offset;
    } else if (data.placement.indexOf('left') !== -1) {
      data.offsets.popper.left -= offset;
    }

    return data;
  }

  static isIosSafari() {
    return (
      includes(navigator.userAgent.toLowerCase(), 'mobile') &&
      includes(navigator.userAgent.toLowerCase(), 'safari') &&
      (navigator.platform.toLowerCase() === 'iphone' ||
        navigator.platform.toLowerCase() === 'ipad')
    );
  }

  static defaults(data) {
    // if (data.placement) {
    //     data.originalPlacement = data.placement;
    // }
    Tooltip._defaults = { ...Tooltip._defaults, ...data };
  }
}

Tooltip._defaults = { ...DEFAULT_OPTIONS };

function randomId() {
  return `${Date.now()}-${Math.round(Math.random() * 100000000)}`;
}

/**
 * Check if the variable is an html element
 * @param {*} value
 * @return Boolean
 */
function isElement(value) {
  return value instanceof window.Element;
}
