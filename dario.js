let defaults = {
    inline: false,
    classes: "",
    lang: "eng",
    container: "",
    minDate: "",
    range: false,
    months: { 
        ita: [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ],
        eng: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        deu: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
    },
    days:{
        ita: ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"],
        eng: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        deu: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
    }
};

class Dario {
    constructor(el, settings) {
        this.$el = getEl(el);
        if (!this.$el) return;

        let opts = { ...defaults, ...settings };
        for (const prop in opts) {
            this[prop] = opts[prop];
        }
        
        this.lang = Object.keys(this.months).includes(this.lang) ? this.lang : 'eng';
        this.$target = this.$el;

        this.minDate = this.setMinDate();

        this.$dario = createElement({ className: "dario" });
        this.class = "dario";
        this.startDate = 0;
        this.endDate = 0;
        this.visible = false;
        this.navInit = false;
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

        this.returnCallBack();
        
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
        //let posX = pos.left;
        //let posY = pos.top + (pos.bottom - pos.top) + window.scrollY;
        var xPos = window.innerWidth - pos.right < pos.left ? `right: ${window.innerWidth - pos.right}px;` : `left: ${pos.left}px;`;
        var yPos = window.innerHeight - pos.bottom < pos.top ? `bottom: ${(window.innerHeight - pos.top) - window.scrollY}px;` : `top: ${pos.top + (pos.bottom - pos.top) + window.scrollY}px;`;
        this.$dario.style.cssText = `display: block; ${xPos} ${yPos}`;
    };

    setMinDate = () => {
        if (this.$target.dataset.mindate != undefined) {
            this.minDate = new Date(this.$target.dataset.mindate);
            return (this.minDate = !isNaN(this.minDate) ? this.minDate : new Date());
        }

        if (this.minDate) {
            return this.minDate;
        }

        return (this.minDate = new Date());
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
        if (!this.navInit) {
            this.registerNavEvents();
            this.registerVisibilityEvents();
            this.navInit = true;
        }
        this.registerCellEvents();
    };

    registerVisibilityEvents = () => {
        document.addEventListener('click', (event) => {
            if(event.target.closest('.dario') === null && event.target.closest('#'+this.$target.id) === null) {
                this.hide();
            }
        });
    }

    registerNavEvents = () => {
        let prev = getEl(".dario-nav-arrow--prev");
        let next = getEl(".dario-nav-arrow--next");

        prev.addEventListener("click", (event) => {
            event.stopPropagation();
            this.visibleDate.setMonth(this.visibleDate.getMonth() - 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() - 1);
            this.render();
            this.registerCellEvents();
        });

        next.addEventListener("click", () => {
            event.stopPropagation();
            this.visibleDate.setMonth(this.visibleDate.getMonth() + 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() + 1);
            this.render();
            this.registerCellEvents();
        });
    };

    registerCellEvents = () => {
        const cellNodes = document.querySelectorAll(".dario-cell:not(.dario-cell--disable)");

        cellNodes.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                e.stopPropagation();
                if (this.range) {
                    let checkDate = parseInt(cell.dataset.time);

                    if (this.startDate == 0) {
                        this.startDate = checkDate;
                    } else if (this.endDate == 0) {
                        if (checkDate <= this.startDate) {
                            this.startDate = checkDate;
                        } else {
                            this.endDate = checkDate;
                            this.returnCallBack();
                            this.hide();
                        }
                    } else {
                        this.startDate = checkDate;
                        this.endDate = 0;
                    }
                    this.render();
                    this.registerCellEvents();
                } else {
                    this.startDate = parseInt(cell.dataset.time);
                    this.returnCallBack();
                    this.hide();
                }
            });

            if (this.range) {
                cell.addEventListener("mouseover", () => {
                    let currentTime = parseInt(cell.dataset.time);
                    for (var inner = 0; inner < cellNodes.length; inner++) {
                        const innerNode = cellNodes[inner];
                        innerNode.classList.remove("dario-cell--hover");
                        if (
                            currentTime > this.startDate &&
                            this.isSelectable(innerNode) &&
                            this.startDate > 0 &&
                            this.endDate == 0
                        ) {
                            const innerTime = parseInt(innerNode.dataset.time);
                            if (innerTime > this.startDate && innerTime <= currentTime) {
                                innerNode.classList.add("dario-cell--hover");
                            }
                        }
                    }
                });
            }
        });
    };

    isSelectable = (element) => {
        return !element.classList.contains("dario-cell--disable");
    };

    returnCallBack = () => {
        if(this.onSelect !== undefined) {
            if(this.range) {
                let startDate = this.startDate > 0 ? new Date(this.startDate) : new Date();
                let endDate =  new Date(startDate);
                endDate.setDate(endDate.getDate()+1);
                if(this.endDate > 0) {
                    endDate = new Date(this.endDate);
                }
                this.onSelect({
                    startDate: getParsedDate(startDate), 
                    endDate: getParsedDate(endDate),
                    startMonth: this.months[this.lang][startDate.getMonth()],
                    endMonth: this.months[this.lang][endDate.getMonth()],
                    nights: ((endDate - endDate.getTimezoneOffset() * 60000 ) - (startDate - startDate.getTimezoneOffset() * 60000 ))/86400000
                });
            } else {
                let startDate = this.startDate > 0 ? new Date(this.startDate) : new Date();
                this.onSelect({
                    startDate: getParsedDate(startDate), 
                    startMonth: this.months[this.lang][startDate.getMonth()],
                });
            }
        }
    }

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
            this.months[this.lang][this.visibleDate.getMonth()]
        } ${this.visibleDate.getFullYear()}`;
        if (this.range) {
            this.navCenter.innerHTML += ` - ${
                this.months[this.lang][this.visibleDateNext.getMonth()]
            } ${this.visibleDateNext.getFullYear()}`;
        }
    };

    renderHeader = () => {
        let header = getEl(".dario-inner--current .dario-header-week");
        let headerNext = getEl(".dario-inner--next .dario-header-week");
        header.innerHTML = "";

        if (this.range) {
            headerNext.innerHTML = "";
        }

        for (let i = 0; i < this.days[this.lang].length; i++) {
            header.innerHTML += `<div>${this.days[this.lang][i].substring(0, 2)}</div>`;
            if (this.range) headerNext.innerHTML += `<div>${this.days[this.lang][i].substring(0, 2)}</div>`;
        }
    };

    renderContent = () => {
        let content = getEl(".dario-inner--current .dario-content-days");
        let contentNext = getEl(".dario-inner--next .dario-content-days");
        content.innerHTML = this.renderCell(this.visibleDate);
        if (this.range) contentNext.innerHTML = this.renderCell(this.visibleDateNext);
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
                let selected =
                    current == this.startDate || current == this.endDate
                        ? " dario-cell--selected"
                        : "";
                let selectedInner =
                    this.startDate > 0 &&
                    this.endDate > 0 &&
                    current > this.startDate &&
                    current < this.endDate
                        ? " dario-cell--inner"
                        : "";
                let disable = current < today ? " dario-cell--disable" : "";

                cell += `<div class="dario-cell${selected}${disable}${selectedInner}" data-time="${current}" data-date="${dd}-${mm}-${yy}">${d}</div>`;
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