import { SlideManual } from "./Entities/SlideManual";
import { SlideAutoManual } from "./Entities/SlideAutoManual";

// const teste = new Slide("[data-slide]", ".dots");
// teste.initSlide();
const slideManual = new SlideAutoManual("[data-slide]", ".dots");
slideManual.initSlide();
