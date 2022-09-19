/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Entities/Dot.ts":
/*!*****************************!*\
  !*** ./src/Entities/Dot.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dot = void 0;
const MakeComponent_1 = __webpack_require__(/*! ./MakeComponent */ "./src/Entities/MakeComponent.ts");
const ServiceActive_1 = __webpack_require__(/*! ./ServiceActive */ "./src/Entities/ServiceActive.ts");
class Dot {
    constructor(containerDots, amount) {
        this._containerDots = null;
        this._elements = [];
        this._containerDots = document.querySelector(containerDots);
        this._componenteGenerator = new MakeComponent_1.MakeComponent();
        if (this._containerDots) {
            const elements = this._componenteGenerator.makeElement(amount, "span", this._containerDots);
            this._elements = elements;
        }
    }
    addClickEvent(type, elementos, callback) {
        this._elements.forEach((span, index) => {
            span.addEventListener(type, () => {
                ServiceActive_1.ServiceActive.makeActive(index, elementos);
                ServiceActive_1.ServiceActive.makeActive(index, this._elements);
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
exports.Dot = Dot;


/***/ }),

/***/ "./src/Entities/MakeComponent.ts":
/*!***************************************!*\
  !*** ./src/Entities/MakeComponent.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MakeComponent = void 0;
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


/***/ }),

/***/ "./src/Entities/ServiceActive.ts":
/*!***************************************!*\
  !*** ./src/Entities/ServiceActive.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceActive = void 0;
class ServiceActive {
    static makeActive(contador, elements) {
        this.resetActive(elements);
        elements[contador].classList.add("active");
    }
    static resetActive(elements) {
        elements.forEach((slide) => slide.classList.remove("active"));
    }
}
exports.ServiceActive = ServiceActive;


/***/ }),

/***/ "./src/Entities/Slide.ts":
/*!*******************************!*\
  !*** ./src/Entities/Slide.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Slide = void 0;
const Dot_1 = __webpack_require__(/*! ./Dot */ "./src/Entities/Dot.ts");
class Slide {
    constructor(targetElement, containerDots) {
        this.slide = null;
        this._elements = document.querySelectorAll(targetElement);
        this._numberOfElements = this._elements.length - 1;
        this._dots = new Dot_1.Dot(containerDots, this._numberOfElements);
    }
    addClickEvent(type, callback) {
        this._dots.addClickEvent(type, this._elements, callback);
    }
}
exports.Slide = Slide;


/***/ }),

/***/ "./src/Entities/SlideAutoManual.ts":
/*!*****************************************!*\
  !*** ./src/Entities/SlideAutoManual.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlideAutoManual = void 0;
const ServiceActive_1 = __webpack_require__(/*! ./ServiceActive */ "./src/Entities/ServiceActive.ts");
const Slide_1 = __webpack_require__(/*! ./Slide */ "./src/Entities/Slide.ts");
class SlideAutoManual extends Slide_1.Slide {
    constructor(targetElement, containerDots, typeEvent = "click") {
        super(targetElement, containerDots);
        this._typeEvent = typeEvent;
    }
    initSlide() {
        this.addClickEvent(this._typeEvent, () => {
            SlideAutoManual.pause = true;
        });
        this.autoSlide();
    }
    autoSlide(initial = 0) {
        this.slide = setInterval(() => {
            if (!SlideAutoManual.pause) {
                if (initial > this._numberOfElements || initial < 0)
                    initial = 0;
                ServiceActive_1.ServiceActive.makeActive(initial, this._elements);
                ServiceActive_1.ServiceActive.makeActive(initial, this._dots.getDots());
            }
            else if (this.slide && SlideAutoManual.pause) {
                clearInterval(this.slide);
                SlideAutoManual.pause = false;
                this.autoSlide(initial - 1);
            }
            initial += 1;
        }, 2000);
    }
}
exports.SlideAutoManual = SlideAutoManual;
SlideAutoManual.pause = false;


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
const SlideAutoManual_1 = __webpack_require__(/*! ./Entities/SlideAutoManual */ "./src/Entities/SlideAutoManual.ts");
const slideManual = new SlideAutoManual_1.SlideAutoManual("[data-slide]", ".dots", "click");
slideManual.initSlide();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map