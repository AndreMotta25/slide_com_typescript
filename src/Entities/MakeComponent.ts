export class MakeComponent {
  private readonly _elements: HTMLSpanElement[] = [];

  constructor() {}

  makeElement(qtd: number, tag: string, container: HTMLElement): HTMLElement[] {
    for (let index = 0; index <= qtd; index++) {
      let element = document.createElement(tag);
      element.classList.add("dot");
      this._elements.push(element);
      container?.appendChild(element);
    }
    return this._elements;
  }
}
