abstract class Slide {
  protected readonly _elements: NodeListOf<HTMLDivElement>;
  protected readonly _numberOfElements: number;
  protected readonly _dots: Dot;

  public slide: NodeJS.Timer | null = null;

  constructor(targetElement: string, containerDots: string) {
    this._elements = document.querySelectorAll<HTMLDivElement>(targetElement);
    this._numberOfElements = this._elements.length - 1;
    this._dots = new Dot(containerDots, this._numberOfElements);
  }
  public addClickEvent(type: string, callback?: Function): void {
    this._dots.addClickEvent(type, this._elements, callback);
  }

  // public initSlide(): void {
  //   this._dots.addClickEvent(this._elements);
  //   this.autoSlide();
  // }

  // public autoSlide(initial = 0): void {
  //   // let contador = 0;
  //   this.slide = setInterval(() => {
  //     if (!Slide.pause) {
  //       if (initial > this._numberOfElements) initial = 0;

  //       ServiceActive.makeActive(initial, this._elements);
  //       ServiceActive.makeActive(initial, this._dots.getDots());

  //       initial++;
  //     } else if (this.slide && Slide.pause) {
  //       clearInterval(this.slide);
  //       Slide.pause = false;
  //       this.autoSlide(initial);
  //     }
  //   }, 2000);
  // }
}

class Dot {
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

export class MakeComponent {
  private readonly _elements: HTMLSpanElement[] = [];

  // constructor(containerDots: string, qtd: number) {
  //   this._containerDots = document.querySelector<HTMLDivElement>(containerDots);
  //   if (this._containerDots) this.makeElement(qtd);
  // }

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

  // makeDotActive(contador: number): void {
  //   this.resetDot();
  //   this._elements[contador].classList.add("active");
  // }

  // resetDot(): void {
  //   this._elements.forEach((dot) => {
  //     dot.classList.remove("ativo");
  //   });
  // }

  //   vou mudar o nome depois
  // atribuiEvento(elementos: NodeListOf<HTMLDivElement>): void {
  //   this._elements.forEach((span, index) => {
  //     span.addEventListener("click", () => {
  //       ServiceActive.makeActive(index, elementos);
  //       ServiceActive.makeActive(index, this._elements);
  //       Slide.pause = true;
  //       return;
  //     });
  //   });
  // }

  // getDots(): HTMLSpanElement[] {
  //   return this._elements;
  // }
}

// depois podemos colocar um enum para saber se o slide vai ser automatico ou manual ou os dois
// quero fazer um servico depois que manipule os dois

// Essa classe é responsavel por adicionar e retirar a classe active
class ServiceActive {
  static makeActive(
    contador: number,
    elements: NodeListOf<HTMLElement> | HTMLSpanElement[]
  ): void {
    this.resetActive(elements);
    elements[contador].classList.add("active");
  }

  static resetActive(
    elements: NodeListOf<HTMLElement> | HTMLSpanElement[]
  ): void {
    elements.forEach((slide) => slide.classList.remove("active"));
  }
}

interface ISlidePanel {
  initSlide(): void;
}

export class SlideAutoManual extends Slide implements ISlidePanel {
  static pause = false;
  private _previewValue = 0;
  private _actualValue = 0;

  initSlide(): void {
    this.addClickEvent("click", () => {
      SlideAutoManual.pause = true;
      this._previewValue = this._actualValue;
    });
    this.autoSlide();
  }

  private autoSlide(initial = 0): void {
    this._actualValue = initial;
    let slide = setInterval(() => {
      if (!SlideAutoManual.pause) {
        if (initial > this._numberOfElements) initial = 0;
        ServiceActive.makeActive(initial, this._elements);
        ServiceActive.makeActive(initial, this._dots.getDots());
        console.log(initial);
        initial++;
      } else if (slide && SlideAutoManual.pause) {
        // clearInterval(slide);
        SlideAutoManual.pause = false;
        console.log("pausando", initial);
        this.autoSlide(this._previewValue);
      }
      // console.log(initial);
    }, 5000);
  }
}

export class SlideManual extends Slide implements ISlidePanel {
  initSlide(): void {
    this.addClickEvent("click");
  }
}
