/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ["#2185C5", "#7ECEFD", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Particles

var Particle = function () {
  function Particle(x, y, radius, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: 0.08 * (0, _utils.randomIntFromRange)(-1, 1),
      y: 0.08 * (0, _utils.randomIntFromRange)(-1, 1)
    };
    this.mass = 1;
    this.alpha = 0.2;
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.save();
      c.globalAlpha = this.alpha;
      c.fillStyle = this.color;
      c.fill();
      c.restore();
      c.strokeStyle = this.color;
      c.stroke();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update(particles) {
      var _this = this;

      this.draw();

      var x = mouse.x,
          y = mouse.y;

      if ((0, _utils.distance)(x, y, this.x, this.y) < 100) {
        this.alpha += 0.02;
      } else if (this.alpha > 0.2) {
        this.alpha -= 0.02;
      }

      //collapsed effect
      particles.map(function (item, i) {
        if (item === _this) return item;

        if (_this.x + _this.radius > innerWidth || _this.x - _this.radius < 0) {
          _this.velocity.x = -_this.velocity.x;
        }

        if (_this.y + _this.radius > innerHeight || _this.y - _this.radius < 0) {
          _this.velocity.y = -_this.velocity.y;
        }

        if ((0, _utils.distance)(_this.x, _this.y, item.x, item.y) - _this.radius * 2 < 0) {
          // console.log(1);
          (0, _utils.resolveCollision)(_this, item);
        }
        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(_ref) {
      var x = _ref.x,
          y = _ref.y;

      this.x = x;
      this.y = y;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }]);

  return Particle;
}();

// Implementation


var particles = void 0;
function init() {
  var caordinates = [];

  var generateValidPosition = function generateValidPosition(x1, y1, radius1) {
    var isValid = caordinates.reduce(function (valid, caord) {
      var _caord = _slicedToArray(caord, 3),
          x2 = _caord[0],
          y2 = _caord[1],
          radius2 = _caord[2];

      if ((0, _utils.distance)(x1, y1, x2, y2) <= radius1 + radius2) {
        valid = false;
      }
      return valid;
    }, true);

    if (isValid) {
      caordinates.push([x1, y1, radius1]);

      return [x1, y1, radius1];
    } else {
      var x = (0, _utils.randomIntFromRange)(radius1, innerWidth - radius1);
      var y = (0, _utils.randomIntFromRange)(radius1, innerHeight - radius1);

      return generateValidPosition(x, y, radius1);
    }
  };

  particles = Array(50).fill("").map(function (item, i) {
    var defaultRadius = 20;

    var _generateValidPositio = generateValidPosition((0, _utils.randomIntFromRange)(defaultRadius, innerWidth - defaultRadius), (0, _utils.randomIntFromRange)(100, innerHeight - defaultRadius), defaultRadius),
        _generateValidPositio2 = _slicedToArray(_generateValidPositio, 3),
        x = _generateValidPositio2[0],
        y = _generateValidPositio2[1],
        radius = _generateValidPositio2[2];

    return new Particle(x, y, radius, colors[(0, _utils.randomIntFromRange)(0, colors.length - 1)]);
  });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (element, i, self) {
    element.update(self);
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*
* @param  Object | particle      | A particle object with x and y coordinates, plus velocity
* @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
* @return Null | Does not return a value
*/

function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

    // Store mass in var for better readability in collision equation
    var m1 = particle.mass;
    var m2 = otherParticle.mass;

    // Velocity before equation
    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after rotating axis back to original location
    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance, resolveCollision: resolveCollision };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map