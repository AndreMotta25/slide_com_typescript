import { MakeComponent } from "./MakeComponent";
import { ServiceActive } from "./ServiceActive";

export class Dot {
  private readonly _componenteGenerator: MakeComponent;
  private readonly _containerDots: HTMLDivElement | null = null;
  private readonly _elements: HTMLElement[] = [];

  constructor(containerDots: string, amount: number) {
    this._containerDots = document.querySelector<HTMLDivElement>(containerDots);
    this._componenteGenerator = new MakeComponent();

    if (this._containerDots) {
      const elements = this._componenteGenerator.makeElement(
        amount,
        "span",
        this._containerDots
      );
      this._elements = elements;
    }
  }

  addClickEvent(
    type: string,
    elementos: NodeListOf<HTMLDivElement>,
    callback?: Function
  ): void {
    this._elements.forEach((span, index) => {
      span.addEventListener(type, () => {
        ServiceActive.makeActive(index, elementos); // slide
        ServiceActive.makeActive(index, this._elements); // dots
        if (typeof callback === "function") {
          callback();
        }
        return;
      });
    });
  }

  getDots(): HTMLSpanElement[] {
    return this._elements;
  }
}
