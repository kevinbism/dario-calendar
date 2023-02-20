let defaults = {
    inline: false,
    classes: "",
    lang: "ita",
    cbStart: null,
    cbEnd: null,
    // minDate: new Date(),
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

        this.$target = this.$el;
        this.$dario = createElement({ className: "dario" });
        this.class = "dario";
        this.container = null;
        this.navLeft = null;
        this.navCenter = null;
        this.navRight = null;
        this.header = null;
        this.content = null;
        this.startDate = 0;
        this.endDate = 0;
        this.minDate = this.setMinDate();
        this.currentDate = new Date(
            this.minDate.getFullYear(),
            this.minDate.getMonth(),
            this.minDate.getDate()
        );
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
        let { $target } = this;

        $target.addEventListener("click", () => {
            this.show();
        });
    }

    setMinDate = () => {
        if (
            this.target == null ||
            this.target.getAttribute("data-mindate") == null ||
            this.target.getAttribute("data-mindate") == ""
        )
            return new Date();
        return new Date(target.getAttribute("data-mindate"));
    };

    lastDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    dayOfWeek = (date) => {
        const day = date.getDay();
        return day == 0 ? 6 : day - 1;
    };

    show = () => {
        let { $target } = this;

        if (this.container == null) {
            this.create();
        }
        const rect = $target.getBoundingClientRect();
        let positionX = rect.left;
        let positionY = rect.top + (rect.bottom - rect.top) + window.scrollY;
        this.container.setAttribute(
            "style",
            "display: block;top:" + positionY + "px;left:" + positionX + "px;"
        );

        this.render();
        this.registerEvents();
    };

    hide = () => {
        this.container.setAttribute("style", "display: none;");
    };

    create = () => {
        let { $dario, classes } = this;

        if (classes) {
            $dario.classList.add(...classes.split(" "));
        }

        $dario.innerHTML +=
            '<div class="' +
            this.class +
            '-nav"><div class="' +
            this.class +
            '-nav__left"></div><div class="' +
            this.class +
            '-nav__center"></div><div class="' +
            this.class +
            '-nav__right"></div></div>';
        $dario.innerHTML +=
            '<div class="' +
            this.class +
            '-header"><div class="' +
            this.class +
            '-header__current"></div><div class="' +
            this.class +
            '-header__next"></div></div>';
        $dario.innerHTML +=
            '<div class="' +
            this.class +
            '-content"><div class="' +
            this.class +
            '-content__current"></div><div class="' +
            this.class +
            '-content__next"></div></div>';
        document.body.appendChild($dario);
        this.container = document.getElementsByClassName(this.class)[0];
        this.navLeft = document.getElementsByClassName(this.class + "-nav__left")[0];
        this.navCenter = document.getElementsByClassName(this.class + "-nav__center")[0];
        this.navRight = document.getElementsByClassName(this.class + "-nav__right")[0];
        this.headerCurrent = document.getElementsByClassName(this.class + "-header__current")[0];
        this.headerNext = document.getElementsByClassName(this.class + "-header__next")[0];
        this.contentCurrent = document.getElementsByClassName(this.class + "-content__current")[0];
        this.contentNext = document.getElementsByClassName(this.class + "-content__next")[0];
    };

    registerEvents = () => {
        this.registerNavEvents();
        this.registerCellEvents();
    };

    registerNavEvents = () => {
        this.navLeft.addEventListener("click", (event) => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() - 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() - 1);
            this.render();
            this.registerCellEvents();
        });
        this.navRight.addEventListener("click", (event) => {
            this.visibleDate.setMonth(this.visibleDate.getMonth() + 1);
            this.visibleDateNext.setMonth(this.visibleDateNext.getMonth() + 1);
            this.render();
            this.registerCellEvents();
        });
    };

    registerCellEvents = () => {
        const cellNodes = document.querySelectorAll(
            "." + this.class + "-content div.cell.selectable"
        );
        for (var i = 0; i < cellNodes.length; i++) {
            if (this.isSelectable(cellNodes[i])) {
                cellNodes[i].addEventListener("click", (event) => {
                    const checkDate = new Date(parseInt(event.target.getAttribute("data-day")));
                    if (this.startDate == 0) {
                        this.startDate = checkDate.getTime();
                    } else if (this.endDate == 0) {
                        if (checkDate.getTime() <= this.startDate) {
                            this.startDate = checkDate.getTime();
                        } else {
                            this.endDate = checkDate.getTime();
                            this.cbEnd(this.startDate, this.endDate);
                        }
                    } else {
                        this.startDate = checkDate.getTime();
                        this.endDate = 0;
                    }
                    this.render();
                    this.registerCellEvents();
                });
                cellNodes[i].addEventListener("mouseover", (event) => {
                    const currentTime = parseInt(event.target.getAttribute("data-day"));
                    for (var inner = 0; inner < cellNodes.length; inner++) {
                        const innerNode = cellNodes[inner];
                        innerNode.classList.remove("selected-innerh");
                        if (
                            currentTime > this.startDate &&
                            this.isSelectable(innerNode) &&
                            this.startDate > 0 &&
                            this.endDate == 0
                        ) {
                            const innerTime = parseInt(innerNode.getAttribute("data-day"));
                            if (innerTime > this.startDate && innerTime <= currentTime) {
                                innerNode.classList.add("selected-innerh");
                            }
                        }
                    }
                });
            }
        }
    };

    isSelectable = (element) => {
        return element.getAttribute("data-selectable") != "";
    };

    render = () => {
        this.renderNavLeft();
        this.renderNavRight();
        this.renderNavCenter();
        this.renderHeader();
        this.renderContent();
    };

    renderNavLeft = () => {
        const isVisible = this.visibleDate.getMonth() > this.minDate.getMonth();
        this.navLeft.setAttribute(
            "style",
            "visibility:" +
                (isVisible ? "visible" : "hidden") +
                ";pointer-events:" +
                (isVisible ? "unset" : "none")
        );
        this.navLeft.innerHTML = "<";
    };

    renderNavRight = () => {
        this.navRight.innerHTML = ">";
    };

    renderNavCenter = () => {
        this.navCenter.innerHTML =
            this.months[this.visibleDate.getMonth()] +
            " " +
            this.visibleDate.getFullYear() +
            " - " +
            this.months[this.visibleDateNext.getMonth()] +
            " " +
            this.visibleDateNext.getFullYear();
    };

    renderHeader = () => {
        this.headerCurrent.innerHTML = "";
        this.headerNext.innerHTML = "";
        for (var i = 0; i < 7; i++) {
            this.headerCurrent.innerHTML += "<div>" + this.days[i].substring(0, 2) + "</div>";
            this.headerNext.innerHTML += "<div>" + this.days[i].substring(0, 2) + "</div>";
        }
    };

    renderContent = () => {
        this.contentCurrent.innerHTML = this.renderContentMonth(this.visibleDate);
        this.contentNext.innerHTML = this.renderContentMonth(this.visibleDateNext);
    };

    renderContentMonth = (date) => {
        const dayOfWeek = this.dayOfWeek(date);
        let domData = "";
        for (var i = 1 - dayOfWeek; i <= 42 - dayOfWeek; i++) {
            if (i >= 1 && i <= this.lastDayOfMonth(date)) {
                const current = new Date(date.getFullYear(), date.getMonth(), i).getTime();
                const selected =
                    current == this.startDate || current == this.endDate ? "selected" : "";
                const selectedInner =
                    this.startDate > 0 &&
                    this.endDate > 0 &&
                    current > this.startDate &&
                    current < this.endDate
                        ? "selected-inner"
                        : "";
                domData +=
                    '<div data-selectable="true" data-day="' +
                    current +
                    '" class="cell selectable ' +
                    selected +
                    " " +
                    selectedInner +
                    '">' +
                    i +
                    "</div>";
            } else {
                domData += '<div class="cell nomonth">&nbsp;</div>';
            }
        }
        return domData;
    };
}

function getEl(el, context = document) {
    return typeof el === "string" ? context["querySelector"](el) : el;
}

function createElement({ tagName = "div", className = "", innerHtml = "", id = "" } = {}) {
    let $element = document.createElement(tagName);
    if (className) $element.classList.add(...className.split(" "));
    if (id) $element.id = id;

    if (innerHtml) {
        $element.innerHTML = innerHtml;
    }

    return $element;
}

const dateSelected = (start, end) => {
    console.log(start, end);
};

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
