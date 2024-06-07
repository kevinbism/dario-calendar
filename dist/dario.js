"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var days = {
  ita: ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato', 'Domenica'],
  eng: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  deu: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
  esp: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  fra: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  jap: ['月', '火', '水', '木', '金', '土', '日'],
  rus: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  ara: ['اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت', 'أحد']
};

// prettier-ignore
var months = {
  ita: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  eng: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  deu: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  esp: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  fra: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  jap: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  rus: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  ara: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
};
var defaults = {
  inline: false,
  classes: '',
  lang: 'eng',
  container: '',
  minDate: '',
  range: false,
  months: months,
  days: days,
  showSelected: false,
  minStay: 1
};
var _visible = /*#__PURE__*/new WeakMap();
var _startDate = /*#__PURE__*/new WeakMap();
var _endDate = /*#__PURE__*/new WeakMap();
var _navInit = /*#__PURE__*/new WeakMap();
var _visibleDate = /*#__PURE__*/new WeakMap();
var _visibleDateNext = /*#__PURE__*/new WeakMap();
var Dario = /*#__PURE__*/function () {
  function Dario(el, settings) {
    _classCallCheck(this, Dario);
    // Private variables
    _classPrivateFieldInitSpec(this, _visible, void 0);
    _classPrivateFieldInitSpec(this, _startDate, void 0);
    _classPrivateFieldInitSpec(this, _endDate, void 0);
    _classPrivateFieldInitSpec(this, _navInit, void 0);
    _classPrivateFieldInitSpec(this, _visibleDate, void 0);
    _classPrivateFieldInitSpec(this, _visibleDateNext, void 0);
    this.$el = getEl(el);
    if (!this.$el) return;
    var opts = _objectSpread(_objectSpread({}, defaults), settings);
    for (var prop in opts) {
      this[prop] = opts[prop];
    }
    this.lang = Object.keys(this.months).includes(this.lang) ? this.lang : 'eng';
    this.$target = this.$el;
    this.minDate = this.setMinDate();
    this.$dario = createElement({
      className: 'dario'
    });
    this["class"] = 'dario';
    _classPrivateFieldSet(_startDate, this, 0);
    _classPrivateFieldSet(_endDate, this, 0);
    _classPrivateFieldSet(_visible, this, false);
    _classPrivateFieldSet(_navInit, this, false);
    this.minStay = this.minStay < 1 ? 1 : this.minStay;
    _classPrivateFieldSet(_visibleDate, this, new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate()));
    _classPrivateFieldGet(_visibleDate, this).setDate(1);
    _classPrivateFieldSet(_visibleDateNext, this, new Date(_classPrivateFieldGet(_visibleDate, this).getFullYear(), _classPrivateFieldGet(_visibleDate, this).getMonth() + 1, 1));
    this.init();
  }
  return _createClass(Dario, [{
    key: "init",
    value: function init() {
      var _this = this;
      var $target = this.$target,
        inline = this.inline;
      this.returnCallBack();
      if (!inline) {
        $target.addEventListener('click', function () {
          _this.show();
        });
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (!_classPrivateFieldGet(_visible, this)) {
        this.createDOM();
      }
      _classPrivateFieldSet(_visible, this, true);
      this.$dario.classList.add('dario--visible');
      if (!this.inline) {
        this.setPosition();
      }
      this.renderCore();
      this.registerEvents();
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.inline) {
        this.$dario.style.cssText = 'display: none';
        this.$dario.classList.remove('dario--visible');
      }
    }
  }, {
    key: "createDOM",
    value: function createDOM() {
      var $dario = this.$dario,
        classes = this.classes,
        range = this.range;
      if (classes) {
        var _$dario$classList;
        (_$dario$classList = $dario.classList).add.apply(_$dario$classList, _toConsumableArray(classes.split(' ')));
      }
      this._buildNav();
      this._buildContainer();
      this._buildInner('dario-inner--current');
      if (range) this._buildInner('dario-inner--next');
      if (this.container) {
        getEl(this.container).appendChild($dario);
        return;
      }
      document.body.appendChild($dario);
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var $target = this.$target;
      var pos = $target.getBoundingClientRect();
      var xPos = window.innerWidth - pos.right < pos.left ? "right: ".concat(window.innerWidth - pos.right, "px;") : "left: ".concat(pos.left, "px;");
      var yPos = window.innerHeight - pos.bottom < pos.top ? "bottom: ".concat(window.innerHeight - pos.top - window.scrollY, "px;") : "top: ".concat(pos.top + (pos.bottom - pos.top) + window.scrollY, "px;");
      this.$dario.style.cssText = "display: block; ".concat(xPos, " ").concat(yPos);
    }
  }, {
    key: "setMinDate",
    value: function setMinDate() {
      if (this.$target.dataset.mindate != undefined) {
        this.minDate = new Date(this.$target.dataset.mindate);
        return this.minDate = !isNaN(this.minDate) && this.minDate.getTime() >= Date.now() ? this.minDate : new Date();
      }
      if (this.minDate) {
        return this.minDate;
      }
      return this.minDate = new Date();
    }
  }, {
    key: "_buildNav",
    value: function _buildNav() {
      var template = "<div class=\"dario-nav\">\n            <div class=\"dario-nav-arrow dario-nav-arrow--prev\"></div>\n            <div class=\"dario-nav-center\"></div>\n            <div class=\"dario-nav-arrow dario-nav-arrow--next\"></div>\n        </div>";
      this.$dario.innerHTML += template;
    }
  }, {
    key: "_buildContainer",
    value: function _buildContainer() {
      var container = createElement({
        className: 'dario-container'
      });
      if (this.range) container.classList.add('dario-container--multi');
      this.$dario.appendChild(container);
    }
  }, {
    key: "_buildInner",
    value: function _buildInner(className) {
      var inner = createElement({
        className: "dario-inner ".concat(className)
      });
      this.$dario.querySelector('.dario-container').appendChild(inner);
      this._buildHeader(inner);
      this._buildContent(inner);
    }
  }, {
    key: "_buildHeader",
    value: function _buildHeader(el) {
      var template = "<div class=\"dario-header\">\n            <div class=\"dario-header-week\"></div>\n        </div>";
      el.innerHTML += template;
    }
  }, {
    key: "_buildContent",
    value: function _buildContent(el) {
      var template = "<div class=\"dario-content\">\n            <div class=\"dario-content-days\"></div>\n        </div>";
      el.innerHTML += template;
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      if (!_classPrivateFieldGet(_navInit, this)) {
        this.registerNavEvents();
        this.registerVisibilityEvents();
        _classPrivateFieldSet(_navInit, this, true);
      }
      this.registerCellEvents();
    }
  }, {
    key: "registerVisibilityEvents",
    value: function registerVisibilityEvents() {
      var _this2 = this;
      document.addEventListener('click', function (event) {
        if (event.target.closest('.dario') === null && event.target.closest('#' + _this2.$target.id) === null) {
          _this2.hide();
        }
      });
    }
  }, {
    key: "registerNavEvents",
    value: function registerNavEvents() {
      var _this3 = this;
      var prev = getEl('.dario-nav-arrow--prev');
      var next = getEl('.dario-nav-arrow--next');
      prev.addEventListener('click', function (event) {
        event.stopPropagation();
        _classPrivateFieldGet(_visibleDate, _this3).setMonth(_classPrivateFieldGet(_visibleDate, _this3).getMonth() - 1);
        _classPrivateFieldGet(_visibleDateNext, _this3).setMonth(_classPrivateFieldGet(_visibleDateNext, _this3).getMonth() - 1);
        _this3.render();
        _this3.registerCellEvents();
      });
      next.addEventListener('click', function (event) {
        event.stopPropagation();
        _classPrivateFieldGet(_visibleDate, _this3).setMonth(_classPrivateFieldGet(_visibleDate, _this3).getMonth() + 1);
        _classPrivateFieldGet(_visibleDateNext, _this3).setMonth(_classPrivateFieldGet(_visibleDateNext, _this3).getMonth() + 1);
        _this3.render();
        _this3.registerCellEvents();
      });
    }
  }, {
    key: "registerCellEvents",
    value: function registerCellEvents() {
      var _this4 = this;
      var cellNodes = document.querySelectorAll('.dario-cell:not(.dario-cell--disable)');
      cellNodes.forEach(function (cell) {
        cell.addEventListener('click', function (e) {
          e.stopPropagation();
          if (_this4.range) {
            var checkDate = parseInt(cell.dataset.time);
            var currentMinStay = _classPrivateFieldGet(_startDate, _this4) + _this4.minStay * 86400000;
            if (_classPrivateFieldGet(_startDate, _this4) == 0) {
              _classPrivateFieldSet(_startDate, _this4, checkDate);
            } else if (_classPrivateFieldGet(_endDate, _this4) == 0) {
              if (checkDate <= _classPrivateFieldGet(_startDate, _this4)) {
                _classPrivateFieldSet(_startDate, _this4, checkDate);
              } else if (checkDate < currentMinStay) {
                return;
              } else {
                _classPrivateFieldSet(_endDate, _this4, checkDate);
                _this4.returnCallBack();
                _this4.hide();
              }
            } else {
              _classPrivateFieldSet(_startDate, _this4, checkDate);
              _classPrivateFieldSet(_endDate, _this4, 0);
            }
            _this4.render();
            _this4.registerCellEvents();
          } else {
            _classPrivateFieldSet(_startDate, _this4, parseInt(cell.dataset.time));
            _this4.returnCallBack();
            _this4.hide();
          }
        });
        if (_this4.range) {
          cell.addEventListener('mouseover', function () {
            var currentTime = parseInt(cell.dataset.time);
            for (var inner = 0; inner < cellNodes.length; inner++) {
              var innerNode = cellNodes[inner];
              innerNode.classList.remove('dario-cell--hover');
              if (currentTime > _classPrivateFieldGet(_startDate, _this4) && _this4.isSelectable(innerNode) && _classPrivateFieldGet(_startDate, _this4) > 0 && _classPrivateFieldGet(_endDate, _this4) == 0) {
                var innerTime = parseInt(innerNode.dataset.time);
                var currentMinStay = _classPrivateFieldGet(_startDate, _this4) + _this4.minStay * 86400000;
                if (innerTime > _classPrivateFieldGet(_startDate, _this4) && innerTime <= (currentTime > currentMinStay ? currentTime : currentMinStay)) {
                  innerNode.classList.add('dario-cell--hover');
                  if (innerTime < currentMinStay) {
                    innerNode.style.cssText = "cursor: not-allowed";
                  }
                }
              }
            }
          });
        }
      });
    }
  }, {
    key: "isSelectable",
    value: function isSelectable(element) {
      return !element.classList.contains('dario-cell--disable');
    }
  }, {
    key: "returnCallBack",
    value: function returnCallBack() {
      if (this.onSelect !== undefined) {
        var startDate = _classPrivateFieldGet(_startDate, this) > 0 ? new Date(_classPrivateFieldGet(_startDate, this)) : new Date(this.minDate);
        var endDate = new Date(startDate);
        if (this.range) {
          endDate.setDate(endDate.getDate() + this.minStay);
          if (_classPrivateFieldGet(_endDate, this) > 0) endDate = new Date(_classPrivateFieldGet(_endDate, this));
          this.onSelect({
            startDate: getParsedDate(startDate),
            endDate: getParsedDate(endDate),
            startMonth: this.months[this.lang][startDate.getMonth()],
            startMonthShort: this.months[this.lang][startDate.getMonth()].substring(0, 3),
            endMonth: this.months[this.lang][endDate.getMonth()],
            endMonthShort: this.months[this.lang][endDate.getMonth()].substring(0, 3),
            nights: nights(startDate, endDate)
          });
        } else {
          this.onSelect({
            startDate: getParsedDate(startDate),
            startMonth: this.months[this.lang][startDate.getMonth()],
            startMonthShort: this.months[this.lang][startDate.getMonth()].substring(0, 3)
          });
        }
      }
    }
  }, {
    key: "renderCore",
    value: function renderCore() {
      this.renderNavLeft();
      this.renderNavRight();
      this.renderNavCenter();
      this.renderHeader();
      this.renderContent();
    }
  }, {
    key: "render",
    value: function render() {
      this.renderNavLeft();
      this.renderNavCenter();
      this.renderContent();
    }
  }, {
    key: "renderNavLeft",
    value: function renderNavLeft() {
      var visible = _classPrivateFieldGet(_visibleDate, this).getTime() > this.minDate.getTime();
      var prev = getEl('.dario-nav-arrow--prev');
      prev.style.cssText = "visibility: ".concat(visible ? 'visible' : 'hidden');
      prev.innerHTML = '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>';
    }
  }, {
    key: "renderNavRight",
    value: function renderNavRight() {
      var next = getEl('.dario-nav-arrow--next');
      next.innerHTML = '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>';
    }
  }, {
    key: "renderNavCenter",
    value: function renderNavCenter() {
      this.navCenter = getEl('.dario-nav-center');
      this.navCenter.innerHTML = "".concat(this.months[this.lang][_classPrivateFieldGet(_visibleDate, this).getMonth()], " ").concat(_classPrivateFieldGet(_visibleDate, this).getFullYear());
      if (this.range) {
        this.navCenter.innerHTML += "<span class=\"dario-nav-center--next\"> - ".concat(this.months[this.lang][_classPrivateFieldGet(_visibleDateNext, this).getMonth()], " ").concat(_classPrivateFieldGet(_visibleDateNext, this).getFullYear(), "</span>");
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var header = getEl('.dario-inner--current .dario-header-week');
      var headerNext = getEl('.dario-inner--next .dario-header-week');
      header.innerHTML = '';
      if (this.range) {
        headerNext.innerHTML = '';
      }
      for (var i = 0; i < this.days[this.lang].length; i++) {
        header.innerHTML += "<div>".concat(this.days[this.lang][i].substring(0, 2), "</div>");
        if (this.range) headerNext.innerHTML += "<div>".concat(this.days[this.lang][i].substring(0, 2), "</div>");
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var content = getEl('.dario-inner--current .dario-content-days');
      var contentNext = getEl('.dario-inner--next .dario-content-days');
      content.innerHTML = this.renderCell(_classPrivateFieldGet(_visibleDate, this));
      if (this.range) contentNext.innerHTML = this.renderCell(_classPrivateFieldGet(_visibleDateNext, this));
    }
  }, {
    key: "renderCell",
    value: function renderCell(date) {
      var dow = dayOfWeek(date);
      var cell = '';
      var _getParsedDate = getParsedDate(resetTime(this.minDate)),
        today = _getParsedDate.time;
      var endDate = new Date(today);
      endDate.setDate(endDate.getDate() + this.minStay);
      var _getParsedDate2 = getParsedDate(endDate),
        tomorrow = _getParsedDate2.time;
      for (var i = 1 - dow; i <= 42 - dow; i++) {
        if (i >= 1 && i <= lastDayOfMonth(date)) {
          var _getParsedDate3 = getParsedDate(new Date(date.getFullYear(), date.getMonth(), i)),
            d = _getParsedDate3.date,
            dd = _getParsedDate3.fullDate,
            mm = _getParsedDate3.fullMonth,
            yy = _getParsedDate3.year,
            current = _getParsedDate3.time;
          var selected = current == _classPrivateFieldGet(_startDate, this) || current == _classPrivateFieldGet(_endDate, this) ? ' dario-cell--selected' : '';
          var selectedStart = (current == today || current == tomorrow && this.range) && this.showSelected && _classPrivateFieldGet(_startDate, this) == 0 ? ' dario-cell--selected' : '';
          var startInnerCheck = _classPrivateFieldGet(_startDate, this) || today;
          var endInnerCheck = _classPrivateFieldGet(_startDate, this) > 0 && _classPrivateFieldGet(_endDate, this) > 0 ? _classPrivateFieldGet(_endDate, this) : _classPrivateFieldGet(_startDate, this) > 0 ? today : tomorrow;
          var selectedInner = startInnerCheck > 0 && endInnerCheck > 0 && current > startInnerCheck && current < endInnerCheck ? ' dario-cell--inner' : '';
          var disable = current < today ? ' dario-cell--disable' : '';
          cell += "<div class=\"dario-cell".concat(selected).concat(selectedStart).concat(disable).concat(selectedInner, "\" data-time=\"").concat(current, "\" data-date=\"").concat(dd, "-").concat(mm, "-").concat(yy, "\">").concat(d, "</div>");
        } else {
          cell += '<div class="dario-cell dario-cell--disable"></div>';
        }
      }
      return cell;
    }
  }]);
}();
function getEl(el) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return typeof el === 'string' ? context['querySelector'](el) : el;
}
function createElement() {
  var _$element$classList;
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$tagName = _ref.tagName,
    tagName = _ref$tagName === void 0 ? 'div' : _ref$tagName,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id;
  var $element = document.createElement(tagName);
  if (className) (_$element$classList = $element.classList).add.apply(_$element$classList, _toConsumableArray(className.split(' ')));
  if (id) $element.id = id;
  return $element;
}
function getParsedDate(date) {
  return {
    year: date.getFullYear(),
    yearShort: date.getFullYear().toString().substr(-2),
    month: date.getMonth(),
    fullMonth: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    date: date.getDate(),
    fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    day: date.getDay(),
    time: date.getTime()
  };
}
function resetTime(date) {
  date.setHours(0, 0, 0, 0);
  return date;
}
function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function dayOfWeek(date) {
  var day = date.getDay();
  return day == 0 ? 6 : day - 1;
}
function nights(checkin, checkout) {
  return (checkout - checkout.getTimezoneOffset() * 60000 - (checkin - checkin.getTimezoneOffset() * 60000)) / 86400000;
}