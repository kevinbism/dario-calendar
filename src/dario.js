let defaults = {
    inline: false,
    classes: "",
    lang: "ita",
    container: "",
    minDate: "",
    range: false,
    months: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
    ],
    days: ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"],
};

class Dario {
    constructor(el, settings) {
        this.$el = getEl(el);
        if (!this.$el) return;

        let opts = { ...defaults, ...settings };
        for (const prop in opts) {
            this[prop] = opts[prop];
        }

        if (!this.minDate) {
            this.minDate = new Date();
        }

        this.$target = this.$el;
        this.$dario = createElement({ className: "dario" });
        this.class = "dario";
        this.startDate = 0;
        this.endDate = 0;
        this.visible = false;
        this.currentDate = this.minDate;
        this.visibleDate = new Date(
            this.minDate.getFullYear(),
            this.minDate.getMonth(),
            this.minDate.getDate()
        );
        this.visibleDate.setDate(1);
        this.visibleDateNext = new Date(
            this.visibleDate.getFullYear(),
            this.visibleDate.getMonth() + 1,
            1
        );

        this.init();
    }

    init() {
        let { $target, inline, minDate } = this;
        let today = getParsedDate(minDate);

        $target.value = `${today.fullDate}-${today.fullMonth}-${today.year}`;

        if (!inline) {
            $target.addEventListener("click", () => {
                this.show();
            });
        } else {
            this.show();
        }
    }

    show = () => {
        if (!this.visible) {
            this.createDOM();
        }

        this.visible = true;
        this.$dario.classList.add("dario--visible");

        if (!this.inline) {
            this.setPosition();
        }

        this.renderCore();
        this.registerEvents();
    };

    hide = () => {
        this.$dario.style.cssText = "display: none";
        this.$dario.classList.remove("dario--visible");
    };

    createDOM = () => {
        let { $dario, classes, range } = this;

        if (classes) {
            $dario.classList.add(...classes.split(" "));
        }

        this._buildNav();
        this._buildContainer();
        this._buildInner("dario-inner--current");

        if (range) this._buildInner("dario-inner--next");

        document.body.appendChild($dario);
    };

    setPosition = () => {
        let { $target } = this;
        let pos = $target.getBoundingClientRect();
        let posX = pos.left;
        let posY = pos.top + (pos.bottom - pos.top) + window.scrollY;
        this.$dario.style.cssText = `display: block; top: ${posY}px; left: ${posX}px`;
    };

    _buildNav = () => {
        let template = `<div class="dario-nav">
            <div class="dario-nav-arrow dario-nav-arrow--prev"></div>
            <div class="dario-nav-center"></div>
            <div class="dario-nav-arrow dario-nav-arrow--next"></div>
        </div>`;

        this.$dario.innerHTML += template;
    };

    _buildContainer = () => {
        let container = createElement({ className: "dario-container" });
        if (this.range) container.classList.add("dario-container--multi");
        this.$dario.appendChild(container);
    };

    _buildInner = (className) => {
        let inner = createElement({ className: `dario-inner ${className}` });
        this.$dario.querySelector(".dario-container").appendChild(inner);
        this._buildHeader(inner);
        this._buildContent(inner);
    };

    _buildHeader = (el) => {
        let template = `<div class="dario-header">
            <div class="dario-header-week"></div>
        </div>`;

        el.innerHTML += template;
    };

    _buildContent = (el) => {
        let template = `<div class="dario-content">
            <div class="dario-content-days"></div>
        </div>`;

        el.innerHTML += template;
    };

    registerEvents = () => {
        this.registerNavEvents();
        this.registerCellEvents();
    };

    registerNavEvents = () => {
        let prev = getEl(".dario-nav-arrow--prev");
        let next = getEl(".dario-nav-arrow--next");

        prev.addEventListener("click", () => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() - 1);
            this.render();
            console.log(this.visibleDate);
        });

        next.addEventListener("click", () => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() + 1);
            this.render();
            console.log(this.visibleDate);
        });
    };

    registerCellEvents = () => {
        const cellNodes = document.querySelectorAll(".dario-cell:not(.dario-cell--disable)");

        cellNodes.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                let { date } = cell.dataset;
                let { time } = getParsedDate(new Date(date));
                removeCellSelected(cellNodes);
                cell.classList.add("dario-cell--selected");
                this.$target.value = date;
                this.hide();
                console.log(this.visibleDate);
            });
        });
    };

    renderCore = () => {
        this.renderNavLeft();
        this.renderNavRight();
        this.renderNavCenter();
        this.renderHeader();
        this.renderContent();
    };

    render = () => {
        this.renderNavLeft();
        this.renderNavCenter();
        this.renderContent();
    };

    renderNavLeft = () => {
        let visible = this.visibleDate.getTime() > this.minDate.getTime();
        let prev = getEl(".dario-nav-arrow--prev");

        prev.style.cssText = `visibility: ${visible ? "visible" : "hidden"}`;
        prev.innerHTML = '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>';
    };

    renderNavRight = () => {
        let next = getEl(".dario-nav-arrow--next");
        next.innerHTML = '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>';
    };

    renderNavCenter = () => {
        this.navCenter = getEl(".dario-nav-center");
        this.navCenter.innerHTML = `${
            this.months[this.visibleDate.getMonth()]
        } ${this.visibleDate.getFullYear()}`;
        if (this.range) {
            this.navCenter.innerHTML += `- ${
                this.months[this.visibleDateNext.getMonth()]
            } ${this.visibleDateNext.getFullYear()}`;
        }
    };

    renderHeader = () => {
        let header = getEl(".dario-inner--current .dario-header-week");
        header.innerHTML = "";

        for (let i = 0; i < this.days.length; i++) {
            header.innerHTML += `<div>${this.days[i].substring(0, 2)}</div>`;
        }
    };

    renderContent = () => {
        let content = getEl(".dario-inner--current .dario-content-days");
        content.innerHTML = this.renderCell(this.visibleDate);
    };

    renderCell = (date) => {
        let dow = dayOfWeek(date);
        let cell = "";
        let { time: today } = getParsedDate(resetTime(this.minDate));

        for (var i = 1 - dow; i <= 42 - dow; i++) {
            if (i >= 1 && i <= lastDayOfMonth(date)) {
                let {
                    date: d,
                    fullDate: dd,
                    fullMonth: mm,
                    year: yy,
                    time: current,
                } = getParsedDate(new Date(date.getFullYear(), date.getMonth(), i));
                let selected = today == current && !this.range ? " dario-cell--selected" : "";
                let disable = current < today ? " dario-cell--disable" : "";

                cell += `<div class="dario-cell${selected}${disable}" data-date="${dd}-${mm}-${yy}">${d}</div>`;
            } else {
                cell += '<div class="dario-cell dario-cell--disable"></div>';
            }
        }
        return cell;
    };
}

function getEl(el, context = document) {
    return typeof el === "string" ? context["querySelector"](el) : el;
}

function createElement({ tagName = "div", className = "", id = "" } = {}) {
    let $element = document.createElement(tagName);
    if (className) $element.classList.add(...className.split(" "));
    if (id) $element.id = id;

    return $element;
}

function getParsedDate(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        fullMonth: date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
        date: date.getDate(),
        fullDate: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
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
    return day == 0 ? 6 : day - 1;
}

function removeCellSelected(elements) {
    elements.forEach((el) => {
        el.classList.remove("dario-cell--selected");
    });
}
