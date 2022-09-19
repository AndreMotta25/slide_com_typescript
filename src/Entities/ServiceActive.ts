export class ServiceActive {
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
