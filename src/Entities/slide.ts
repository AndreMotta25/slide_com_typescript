import { Dot } from "./Dot";

export abstract class Slide {
  protected readonly _elements: NodeListOf<HTMLDivElement>;
  protected readonly _numberOfElements: number;
  protected readonly _dots: Dot;

  public slide: NodeJS.Timer | null | number = null;

  constructor(targetElement: string, containerDots: string) {
    this._elements = document.querySelectorAll<HTMLDivElement>(targetElement);
    this._numberOfElements = this._elements.length - 1;
    this._dots = new Dot(containerDots, this._numberOfElements);
  }
  public addClickEvent(type: string, callback?: Function): void {
    this._dots.addClickEvent(type, this._elements, callback);
  }
}
