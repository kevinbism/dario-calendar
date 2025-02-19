const daysDario = {
  ita: {
    long: ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato', 'Domenica'],
    short: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
  },
  eng: {
    long: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    short: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  deu: {
    long: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    short: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  },
  esp: {
    long: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    short: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
  },
  fra: {
    long: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    short: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
  },
  jap: {
    long: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
    short: ['月', '火', '水', '木', '金', '土', '日'],
  },
  rus: {
    long: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    short: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  },
  ara: {
    long: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    short: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
  },
};

// prettier-ignore
const monthsDario = {
  ita: {
    long: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    short: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
  },
  eng: {
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  deu: {
    long: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    short: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
  },
  esp: {
    long: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  fra: {
    long: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    short: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
  },
  jap: {
    long: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  rus: {
    long: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    short: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  },
  ara: {
    long: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    short: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس']
  }
};

const defaults = {
  inline: false,
  classes: '',
  lang: 'eng',
  container: '',
  minDate: '',
  range: false,
  months: monthsDario,
  days: daysDario,
  showSelected: false,
  minStay: 1,
  center: false,
  positionType: 'fixed',
};

class Dario {
  // Private variables
  #visible;
  #startDate;
  #endDate;
  #navInit;
  #visibleDate;
  #visibleDateNext;

  constructor(el, settings) {
    this.$el = getEl(el);
    if (!this.$el) return;

    const opts = { ...defaults, ...settings };
    for (const prop in opts) {
      this[prop] = opts[prop];
    }

    this.lang = Object.keys(this.months).includes(this.lang) ? this.lang : 'eng';
    this.$target = this.$el;
    this.minDate = this.setMinDate();
    this.$dario = createElement({ className: 'dario' });
    this.class = 'dario';
    this.#startDate = 0;
    this.#endDate = 0;
    this.#visible = false;
    this.#navInit = false;
    this.minStay = this.minStay < 1 ? 1 : this.minStay;
    this.#visibleDate = new Date(
      this.minDate.getFullYear(),
      this.minDate.getMonth(),
      this.minDate.getDate()
    );
    this.#visibleDate.setDate(1);
    this.#visibleDateNext = new Date(
      this.#visibleDate.getFullYear(),
      this.#visibleDate.getMonth() + 1,
      1
    );

    this.init();
  }

  init() {
    const { $target, inline } = this;
    this.returnCallBack();

    if (!inline) {
      $target.addEventListener('click', () => {
        this.show();
      });
    } else {
      this.show();
    }
  }

  show() {
    if (!this.#visible) {
      this.createDOM();
    }

    this.$dario.classList.add('dario--visible');

    // Quando il calendario è inline aggiunge altrimenti, altrimenti setta la posizione
    if (this.inline) {
      this.$dario.classList.add('dario--inline');
    } else {
      this.setPosition();
    }

    this.renderCore();
    this.registerEvents();
    this.#visible = true;
  }

  hide() {
    if (!this.inline) {
      this.$dario.style.cssText = 'display: none';
      this.$dario.classList.remove('dario--visible');
    }
  }

  destroy() {
    // Controlla se esiste this.$target e sostituiscilo con un suo clone
    if (this.$target) {
      const clonedTarget = this.$target.cloneNode(true);
      this.$target.replaceWith(clonedTarget);
    }

    // Controlla se esiste this.$dario e rimuovilo
    if (this.$dario) {
      this.$dario.remove();
    }
  }

  createDOM() {
    const { $dario, classes, range, inline, container } = this;

    if (classes) {
      $dario.classList.add(...classes.split(' '));
    }

    // Se il calendario è inline crea 12 mesi, altrimenti solo 2
    if (inline) {
      this._buildNav();
      this._buildContainer();

      for (let i = 0; i < 12; i++) {
        this._buildInner(`dario-inner--${i}`);
      }
    } else {
      this._buildNav();
      this._buildContainer();
      this._buildInner('dario-inner--current');

      if (range) this._buildInner('dario-inner--next');
    }

    if (container) {
      getEl(container).appendChild($dario);
      return;
    }

    document.body.appendChild($dario);
  }

  setPosition() {
    const { $target } = this;
    const pos = $target.getBoundingClientRect();
    const xPos =
      window.innerWidth - pos.right < pos.left
        ? `right: ${window.innerWidth - pos.right}px;`
        : `left: ${pos.left}px;`;
    const yPos =
      window.innerHeight - pos.bottom < pos.top
        ? `bottom: ${window.innerHeight - pos.top - window.scrollY}px;`
        : `top: ${pos.top + (pos.bottom - pos.top) + window.scrollY}px;`;

    this.$dario.style.cssText = `display: block; position: ${this.positionType};`;

    if (this.center) {
      this.$dario.style.cssText += 'left: 50%; top: 50%; transform: translate(-50%, -50%);';
    } else {
      this.$dario.style.cssText += `${xPos} ${yPos}`;
    }
  }

  setMinDate() {
    if (this.$target.dataset.mindate !== undefined) {
      this.minDate = new Date(this.$target.dataset.mindate);
      this.minDate =
        !Number.isNaN(this.minDate) && this.minDate.getTime() >= Date.now()
          ? this.minDate
          : new Date();
      return this.minDate;
    }

    if (this.minDate) {
      return this.minDate;
    }

    this.minDate = new Date();
    return this.minDate;
  }

  _buildNav() {
    const template = `<div class="dario-nav">
            <div class="dario-nav-arrow dario-nav-arrow--prev"></div>
            <div class="dario-nav-center"></div>
            <div class="dario-nav-arrow dario-nav-arrow--next"></div>
        </div>`;

    this.$dario.innerHTML += template;
  }

  _buildContainer() {
    const container = createElement({ className: 'dario-container' });
    if (this.range && !this.inline) container.classList.add('dario-container--multi');
    this.$dario.appendChild(container);
  }

  _buildInner(className) {
    const inner = createElement({ className: `dario-inner ${className}` });
    this.$dario.querySelector('.dario-container').appendChild(inner);
    if (this.inline) this._buildMonths(inner);
    this._buildHeader(inner);
    this._buildContent(inner);
  }

  _buildHeader(el) {
    const template = `<div class="dario-header">
            <div class="dario-header-week"></div>
        </div>`;

    el.innerHTML += template;
  }

  _buildMonths(el) {
    const template = `<div class="dario-month"></div>`;

    el.innerHTML += template;
  }

  _buildContent(el) {
    const template = `<div class="dario-content">
            <div class="dario-content-days"></div>
        </div>`;

    el.innerHTML += template;
  }

  registerEvents() {
    if (!this.#navInit) {
      this.registerNavEvents();
      this.registerVisibilityEvents();
      this.#navInit = true;
    }
    this.registerCellEvents();
  }

  registerVisibilityEvents() {
    document.addEventListener('click', event => {
      if (
        event.target.closest('.dario') === null &&
        event.target.closest(`#${this.$target.id}`) === null
      ) {
        this.hide();
      }
    });
  }

  registerNavEvents() {
    const prev = getEl('.dario-nav-arrow--prev');
    const next = getEl('.dario-nav-arrow--next');

    prev.addEventListener('click', event => {
      event.stopPropagation();
      this.#visibleDate.setMonth(this.#visibleDate.getMonth() - 1);
      this.#visibleDateNext.setMonth(this.#visibleDateNext.getMonth() - 1);
      this.render();
      this.registerCellEvents();
    });

    next.addEventListener('click', event => {
      event.stopPropagation();
      this.#visibleDate.setMonth(this.#visibleDate.getMonth() + 1);
      this.#visibleDateNext.setMonth(this.#visibleDateNext.getMonth() + 1);
      this.render();
      this.registerCellEvents();
    });
  }

  registerCellEvents() {
    const cellNodes = document.querySelectorAll('.dario-cell:not(.dario-cell--disable)');

    for (const cell of cellNodes) {
      cell.addEventListener('click', e => {
        e.stopPropagation();
        if (this.range) {
          const checkDate = Number.parseInt(cell.dataset.time);
          const currentMinStay = this.#startDate + this.minStay * 86400000;

          if (this.#startDate === 0) {
            this.#startDate = checkDate;
          } else if (this.#endDate === 0) {
            if (checkDate <= this.#startDate) {
              this.#startDate = checkDate;
            } else if (checkDate < currentMinStay) {
              return;
            } else {
              this.#endDate = checkDate;
              this.returnCallBack();
              this.hide();
            }
          } else {
            this.#startDate = checkDate;
            this.#endDate = 0;
          }
          this.render();
          this.registerCellEvents();
        } else {
          this.#startDate = Number.parseInt(cell.dataset.time);
          this.returnCallBack();
          this.hide();
        }
      });

      if (this.range) {
        cell.addEventListener('mouseover', () => {
          const currentTime = Number.parseInt(cell.dataset.time);
          for (let inner = 0; inner < cellNodes.length; inner++) {
            const innerNode = cellNodes[inner];
            innerNode.classList.remove('dario-cell--hover');
            if (
              currentTime > this.#startDate &&
              this.isSelectable(innerNode) &&
              this.#startDate > 0 &&
              this.#endDate === 0
            ) {
              const innerTime = Number.parseInt(innerNode.dataset.time);
              const currentMinStay = this.#startDate + this.minStay * 86400000;
              if (
                innerTime > this.#startDate &&
                innerTime <= (currentTime > currentMinStay ? currentTime : currentMinStay)
              ) {
                innerNode.classList.add('dario-cell--hover');
                if (innerTime < currentMinStay) {
                  innerNode.style.cssText = 'cursor: not-allowed';
                }
              }
            }
          }
        });
      }
    }
  }

  isSelectable(element) {
    return !element.classList.contains('dario-cell--disable');
  }

  returnCallBack() {
    if (this.onSelect !== undefined) {
      const startDate = this.#startDate > 0 ? new Date(this.#startDate) : new Date(this.minDate);
      let endDate = new Date(startDate);

      if (this.range) {
        endDate.setDate(endDate.getDate() + this.minStay);
        if (this.#endDate > 0) endDate = new Date(this.#endDate);

        this.onSelect({
          startDate: getParsedDate(startDate),
          endDate: getParsedDate(endDate),
          startMonth: this.months[this.lang].long[startDate.getMonth()],
          startMonthShort: this.months[this.lang].short[startDate.getMonth()],
          endMonth: this.months[this.lang].long[endDate.getMonth()],
          endMonthShort: this.months[this.lang].short[endDate.getMonth()],
          nights: nights(startDate, endDate),
        });
      } else {
        this.onSelect({
          startDate: getParsedDate(startDate),
          startMonth: this.months[this.lang].long[startDate.getMonth()],
          startMonthShort: this.months[this.lang].short[startDate.getMonth()],
        });
      }
    }
  }

  renderCore() {
    this.renderNavLeft();
    this.renderNavRight();
    this.renderNavCenter();
    this.renderHeader();
    this.renderMonths();
    this.renderContent();
  }

  render() {
    this.renderNavLeft();
    this.renderNavCenter();
    this.renderContent();
  }

  renderNavLeft() {
    const visible = this.#visibleDate.getTime() > this.minDate.getTime();
    const prev = getEl('.dario-nav-arrow--prev');

    prev.style.cssText = `visibility: ${visible ? 'visible' : 'hidden'}`;
    prev.innerHTML = '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>';
  }

  renderNavRight() {
    const next = getEl('.dario-nav-arrow--next');
    next.innerHTML = '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>';
  }

  renderNavCenter() {
    this.navCenter = getEl('.dario-nav-center');
    this.navCenter.innerHTML = `${
      this.months[this.lang].long[this.#visibleDate.getMonth()]
    } ${this.#visibleDate.getFullYear()}`;
    if (this.range) {
      this.navCenter.innerHTML += `<span class="dario-nav-center--next"> - ${
        this.months[this.lang].long[this.#visibleDateNext.getMonth()]
      } ${this.#visibleDateNext.getFullYear()}</span>`;
    }
  }

  renderHeader() {
    if (this.#visible) return;
    const headers = document.querySelectorAll('.dario-inner .dario-header-week');

    for (const header of headers) {
      for (let i = 0; i < 7; i++) {
        header.innerHTML += `<div>${this.days[this.lang].short[i]}</div>`;
      }
    }
  }

  renderMonths() {
    if (this.#visible) return;
    const months = document.querySelectorAll('.dario-inner .dario-month');
    const currentVisibleDate = new Date(this.#visibleDate);

    months.forEach((month, index) => {
      const dateToRender = new Date(currentVisibleDate);
      dateToRender.setMonth(currentVisibleDate.getMonth() + index);

      month.innerHTML = `${
        this.months[this.lang].long[dateToRender.getMonth()]
      } ${dateToRender.getFullYear()}`;
    });
  }

  renderContent() {
    const contents = document.querySelectorAll('.dario-inner .dario-content-days');

    // Crea una copia della data iniziale
    const currentVisibleDate = new Date(this.#visibleDate);

    contents.forEach((content, index) => {
      // Aggiorna il mese in base all'indice dell'iterazione
      const dateToRender = new Date(currentVisibleDate);
      dateToRender.setMonth(currentVisibleDate.getMonth() + index);

      // Passa la data modificata alla funzione renderCell
      content.innerHTML = this.renderCell(dateToRender);
    });
  }

  renderCell(date) {
    const dow = dayOfWeek(date);
    let cell = '';
    const { time: today } = getParsedDate(resetTime(this.minDate));
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + this.minStay);
    const { time: tomorrow } = getParsedDate(endDate);

    for (let i = 1 - dow; i <= 42 - dow; i++) {
      if (i >= 1 && i <= lastDayOfMonth(date)) {
        const {
          date: d,
          fullDate: dd,
          fullMonth: mm,
          year: yy,
          time: current,
        } = getParsedDate(new Date(date.getFullYear(), date.getMonth(), i));
        const selected =
          current === this.#startDate || current === this.#endDate ? ' dario-cell--selected' : '';
        const selectedStart =
          (current === today || (current === tomorrow && this.range)) &&
          this.showSelected &&
          this.#startDate === 0
            ? ' dario-cell--selected'
            : '';
        const startInnerCheck = this.#startDate || today;
        const endInnerCheck =
          this.#startDate > 0 && this.#endDate > 0
            ? this.#endDate
            : this.#startDate > 0
            ? today
            : tomorrow;
        const selectedInner =
          startInnerCheck > 0 &&
          endInnerCheck > 0 &&
          current > startInnerCheck &&
          current < endInnerCheck
            ? ' dario-cell--inner'
            : '';
        const disable = current < today ? ' dario-cell--disable' : '';

        cell += `<div class="dario-cell${selected}${selectedStart}${disable}${selectedInner}" data-time="${current}" data-date="${dd}-${mm}-${yy}">${d}</div>`;
      } else {
        cell += '<div class="dario-cell dario-cell--disable"></div>';
      }
    }
    return cell;
  }
}

function getEl(el, context = document) {
  return typeof el === 'string' ? context.querySelector(el) : el;
}

function createElement({ tagName = 'div', className = '', id = '' } = {}) {
  const $element = document.createElement(tagName);
  if (className) $element.classList.add(...className.split(' '));
  if (id) $element.id = id;

  return $element;
}

function getParsedDate(date) {
  return {
    year: date.getFullYear(),
    yearShort: date.getFullYear().toString().substr(-2),
    month: date.getMonth(),
    fullMonth: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    date: date.getDate(),
    fullDate: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    day: date.getDay(),
    time: date.getTime(),
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
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function nights(checkin, checkout) {
  return (
    (checkout -
      checkout.getTimezoneOffset() * 60000 -
      (checkin - checkin.getTimezoneOffset() * 60000)) /
    86400000
  );
}
