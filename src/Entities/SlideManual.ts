import { ISlidePanel } from "../Interfaces/ISlidePanel";
import { Slide } from "./Slide";

export class SlideManual extends Slide implements ISlidePanel {
  initSlide(): void {
    this.addClickEvent("click");
  }
}
