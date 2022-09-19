import { ISlidePanel } from "../Interfaces/ISlidePanel";
import { ServiceActive } from "./ServiceActive";
import { Slide } from "./Slide";

export class SlideAutoManual extends Slide implements ISlidePanel {
  static pause = false;

  initSlide(): void {
    this.addClickEvent("click", () => {
      SlideAutoManual.pause = true;
    });

    this.autoSlide();
  }

  private autoSlide(initial = 0): void {
    this.slide = setInterval(() => {
      if (!SlideAutoManual.pause) {
        if (initial > this._numberOfElements) initial = 0;
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
