import { ISlidePanel } from "../Interfaces/ISlidePanel";
import { ServiceActive } from "./ServiceActive";
import { Slide } from "./Slide";

export class SlideAutoManual extends Slide implements ISlidePanel {
  static pause = false;
  private _typeEvent: string;

  constructor(
    targetElement: string,
    containerDots: string,
    typeEvent: string = "click"
  ) {
    super(targetElement, containerDots);
    this._typeEvent = typeEvent;
  }

  // posso tentar pegar o numero que está no span pelo data e colocar a ativaçao na callback abaixo. vai ser melhor do que usar o -1
  initSlide(): void {
    this.addClickEvent(this._typeEvent, () => {
      SlideAutoManual.pause = true;
    });

    this.autoSlide();
  }

  private autoSlide(initial = 0): void {
    this.slide = setInterval(() => {
      if (!SlideAutoManual.pause) {
        if (initial > this._numberOfElements || initial < 0) initial = 0;
        ServiceActive.makeActive(initial, this._elements);
        ServiceActive.makeActive(initial, this._dots.getDots());
      } else if (this.slide && SlideAutoManual.pause) {
        clearInterval(this.slide);
        SlideAutoManual.pause = false;
        this.autoSlide(initial - 1);
      }
      initial += 1;
    }, 2000);
  }
}
