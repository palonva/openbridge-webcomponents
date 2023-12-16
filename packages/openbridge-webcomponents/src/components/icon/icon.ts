import {LitElement, html, TemplateResult, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {until} from 'lit-html/directives/until.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {iconIds} from '../../icons';
import componentStyle from './icon.css?inline';

@customElement('obc-icon')
export class Icon extends LitElement {
  @property({type: String}) icon = '01-placeholder';
  @property({type: Number}) size = 24;
  @property({type: Boolean}) useCssColor = false;

  async iconSvg(icon: string): Promise<TemplateResult> {
    if (!iconIds.includes(icon)) {
      console.warn(`Icon ${icon} not found. Using placeholder instead.`);
      icon = '01-placeholder';
    }
    if (this.useCssColor) {
      const svg = await import(`../../assets/icons-css/${icon}.svg?raw`);
      return html`${unsafeSVG(svg.default)}`;
    } else {
      const svg = await import(`../../assets/icons/${icon}.svg?raw`);
      return html`${unsafeSVG(svg.default)}`;
    }
  }

  render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${until(
          this.iconSvg(this.icon).then((res) => html`${res}`),
          html``
        )}
      </div>
    `;
  }

  static styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon': Icon;
  }
}
