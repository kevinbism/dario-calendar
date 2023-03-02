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
        let { $target, inline } = this;

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
        let { range } = this;
        let container = createElement({ className: "dario-container" });

        if (range) container.classList.add("dario-container--multi");

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
        this.navLeft.addEventListener("click", () => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() - 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() - 1);
            this.render();
            this.registerCellEvents();
        });
        this.navRight.addEventListener("click", () => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() + 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() + 1);
            this.render();
            this.registerCellEvents();
        });
    };

    registerCellEvents = () => {
        const cellNodes = document.querySelectorAll(".dario-cell:not(.dario-cell--disable)");
        console.log(cellNodes);
        cellNodes.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                // console.log(typeof cell.dataset.date);
                let { date } = cell.dataset;
                let { time } = getParsedDate(new Date(date));
                removeCellSelected(cellNodes);
                console.log(time);
                cell.classList.add("dario-cell--selected");
            });
        });
        // for (let i = 0; i < cellNodes.length; i++) {
        //     if (this.isSelectable(cellNodes[i])) {
        //         cellNodes[i].addEventListener("click", (event) => {
        //             const checkDate = new Date(parseInt(event.target.getAttribute("data-day")));
        //             if (this.startDate == 0) {
        //                 this.startDate = checkDate.getTime();
        //             } else if (this.endDate == 0) {
        //                 if (checkDate.getTime() <= this.startDate) {
        //                     this.startDate = checkDate.getTime();
        //                 } else {
        //                     this.endDate = checkDate.getTime();
        //                 }
        //             } else {
        //                 this.startDate = checkDate.getTime();
        //                 this.endDate = 0;
        //             }
        //             this.render();
        //             this.registerCellEvents();
        //         });
        //         cellNodes[i].addEventListener("mouseover", (event) => {
        //             const currentTime = parseInt(event.target.getAttribute("data-day"));
        //             for (var inner = 0; inner < cellNodes.length; inner++) {
        //                 const innerNode = cellNodes[inner];
        //                 innerNode.classList.remove("selected-innerh");
        //                 if (
        //                     currentTime > this.startDate &&
        //                     this.isSelectable(innerNode) &&
        //                     this.startDate > 0 &&
        //                     this.endDate == 0
        //                 ) {
        //                     const innerTime = parseInt(innerNode.getAttribute("data-day"));
        //                     if (innerTime > this.startDate && innerTime <= currentTime) {
        //                         innerNode.classList.add("selected-innerh");
        //                     }
        //                 }
        //             }
        //         });
        //     }
        // }
    };

    renderCore = () => {
        this.renderNavLeft();
        this.renderNavRight();
        this.renderNavCenter();
        this.renderHeader();
        // this.renderContent();
    };

    render = () => {
        this.renderNavLeft();
        this.renderNavCenter();
        this.renderContent();
    };

    renderNavLeft = () => {
        let visible = this.visibleDate.getMonth() > this.minDate.getMonth();
        this.navLeft = getEl(".dario-nav-arrow--prev");

        this.navLeft.style.cssText = `visibility: ${visible ? "visible" : "hidden"}`;
        this.navLeft.innerHTML = '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>';
    };

    renderNavRight = () => {
        this.navRight = getEl(".dario-nav-arrow--next");
        this.navRight.innerHTML = '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>';
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

        for (let i = 0; i < 7; i++) {
            header.innerHTML += `<div>${this.days[i].substring(0, 2)}</div>`;
        }
    };

    renderContent = () => {
        this.contentCurrent = getEl(".dario-content--current");
        this.contentNext = getEl(".dario-content--next");
        this.contentCurrent.innerHTML = this.renderCell(this.visibleDate);

        if (this.range) {
            this.contentNext.innerHTML = this.renderCell(this.visibleDateNext);
        }
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

                cell += `<div class="dario-cell${selected}${disable}" data-date="${yy}-${mm}-${dd}">${d}</div>`;
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

// let darioInstance = null;
// const initDario = (inlineElement = null) => {
//     if (inlineElement === null) {
//         document.getElementById("dario").addEventListener("click", (event) => {
//             if (darioInstance == null) {
//                 darioInstance = new Dario({
//                     target: event.target,
//                     cbEnd: dateSelected,
//                 });
//                 darioInstance.show();
//             } else {
//                 darioInstance.show();
//             }
//             // console.log(darioInstance);
//         });
//     } else {
//         darioInstance = new Dario({
//             inline: true,
//             target: inlineElement,
//             cbEnd: dateSelected,
//         });
//     }
// };
