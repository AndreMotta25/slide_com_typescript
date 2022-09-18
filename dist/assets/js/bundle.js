/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Entities/slide.ts":
/*!*******************************!*\
  !*** ./src/Entities/slide.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlideManual = exports.SlideAutoManual = exports.MakeComponent = void 0;
class Slide {
    constructor(targetElement, containerDots) {
        this.slide = null;
        this._elements = document.querySelectorAll(targetElement);
        this._numberOfElements = this._elements.length - 1;
        this._dots = new Dot(containerDots, this._numberOfElements);
    }
    addClickEvent(type, callback) {
        this._dots.addClickEvent(type, this._elements, callback);
    }
}
class Dot {
    constructor(containerDots, amount) {
        this._containerDots = null;
        this._elements = [];
        this._containerDots = document.querySelector(containerDots);
        this._componenteGenerator = new MakeComponent();
        if (this._containerDots) {
            const elements = this._componenteGenerator.makeElement(amount, "span", this._containerDots);
            this._elements = elements;
        }
    }
    addClickEvent(type, elementos, callback) {
        this._elements.forEach((span, index) => {
            span.addEventListener(type, () => {
                ServiceActive.makeActive(index, elementos);
                ServiceActive.makeActive(index, this._elements);
                if (typeof callback === "function") {
                    callback();
                }
                return;
            });
        });
    }
    getDots() {
        return this._elements;
    }
}
class MakeComponent {
    constructor() {
        this._elements = [];
    }
    makeElement(qtd, tag, container) {
        for (let index = 0; index <= qtd; index++) {
            let element = document.createElement(tag);
            element.classList.add("dot");
            this._elements.push(element);
            container === null || container === void 0 ? void 0 : container.appendChild(element);
        }
        return this._elements;
    }
}
exports.MakeComponent = MakeComponent;
class ServiceActive {
    static makeActive(contador, elements) {
        this.resetActive(elements);
        elements[contador].classList.add("active");
    }
    static resetActive(elements) {
        elements.forEach((slide) => slide.classList.remove("active"));
    }
}
class SlideAutoManual extends Slide {
    constructor() {
        super(...arguments);
        this._previewValue = 0;
        this._actualValue = 0;
    }
    initSlide() {
        this.addClickEvent("click", () => {
            SlideAutoManual.pause = true;
            this._previewValue = this._actualValue;
        });
        this.autoSlide();
    }
    autoSlide(initial = 0) {
        this._actualValue = initial;
        let slide = setInterval(() => {
            if (!SlideAutoManual.pause) {
                if (initial > this._numberOfElements)
                    initial = 0;
                ServiceActive.makeActive(initial, this._elements);
                ServiceActive.makeActive(initial, this._dots.getDots());
                console.log(initial);
                initial++;
            }
            else if (slide && SlideAutoManual.pause) {
                SlideAutoManual.pause = false;
                console.log("pausando", initial);
                this.autoSlide(this._previewValue);
            }
        }, 5000);
    }
}
exports.SlideAutoManual = SlideAutoManual;
SlideAutoManual.pause = false;
class SlideManual extends Slide {
    initSlide() {
        this.addClickEvent("click");
    }
}
exports.SlideManual = SlideManual;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const slide_1 = __webpack_require__(/*! ./Entities/slide */ "./src/Entities/slide.ts");
const slideManual = new slide_1.SlideAutoManual("[data-slide]", ".dots");
slideManual.initSlide();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map