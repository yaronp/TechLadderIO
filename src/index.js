"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function getUrl() {
    var lang = getLang();
    return "./data/data." + lang + ".json";
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = getUrl();
                    return [4 /*yield*/, fetch(url, {
                            method: "GET"
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function renderContent(props) {
    return "\n        <img class=\"logo\" src=\"./assets/ts.png\" />\n        <h1>" + props.title + "</h1>\n        <h4>" + props.subtitle + "</h4>\n        <table>\n            " + props.levels.map(function (l) { return "\n                    <tr class=\"level\">\n                        <td colspan=\"3\">" + l.name + "</td>\n                    </tr>\n                    <tr class=\"level-subtitle\">\n                        <td>CONCEPTS</td>\n                        <td>SKILLS</td>\n                        <td>RESOURCES</td>\n                    </tr>\n                    " + l.topics.map(function (t, i) { return "\n                            <tr class=\"topic " + (i === l.topics.length - 1 ? "last" : "") + "\">\n                                <td>\n                                    " + t.name + "\n                                </td>\n                                <td>\n                                    " + t.description + "\n                                </td>\n                                <td>\n                                    " + t.resources.map(function (r) { return "\n                                            <a\n                                                href=\"" + r + "\"\n                                                target=\"_blank\"\n                                                title=\"" + r + "\"\n                                            >\n                                                <i class=\"material-icons\">link</i>\n                                            </a>\n                                        "; }).join("") + "\n                                </td>\n                            </tr>\n                        "; }).join("") + "\n                "; }).join("") + "\n        <table>\n        " + props.notes.map(function (n) { return "\n                <div class=\"note\">" + n + "</div>\n            "; }).join("") + "\n        <div class=\"promo\">\n            <h1>" + props.promo.title + "</h1>\n            <p>\n                " + props.promo.p1 + " <b>Learning TypeScript 2.x (2nd edition)</b> " + props.promo.p2 + "\n            </p>\n            <a href=\"http://www.learningtypescript.com/\">\n                <img src=\"./assets/book.png\"/>\n            </a>\n            <p>\n                " + props.promo.p3 + " <a href=\"http://www.learningtypescript.com/\">www.learningtypescript.com</a>\n            </p>\n        </div>\n        <div class=\"copyright\">\n            Copyright &copy; 2018 <a href=\"https://twitter.com/RemoHJansen\">Remo H. Jansen</a>.\n            " + props.copyright.p1 + "\n            <a\n                href=\"https://github.com/remojansen/TSPL/blob/master/LICENSE\"\n            >MIT</a>.\n            <br/>\n            " + props.copyright.p2 + "\n            <a\n                href=\"https://creativecommons.org/licenses/by/4.0/\"\n                title=\"Creative Commons Attribution 4.0 International license\"\n            >Creative Commons Attribution 4.0 International<a>.\n        </div>\n    ";
}
function renderError(e) {
    return "" + e;
}
function mount(selector, html) {
    var $e = document.querySelector(selector);
    if ($e) {
        $e.innerHTML = html;
    }
}
function getLang() {
    /*
        At the moment we only support one language
        but people can contribute more language by
        submmiting new data files. Once a new file
        is created we need to add an entry here.
    */
    var supportedLang = ["en"];
    var defaultLang = supportedLang[0];
    var raw = navigator.language.split("-");
    var lang = raw[0];
    if (supportedLang.indexOf(lang) !== -1) {
        return lang;
    }
    else {
        return defaultLang;
    }
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var root, data, html, e_1, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                root = "#main";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchData()];
            case 2:
                data = _a.sent();
                html = renderContent(data);
                mount(root, html);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                html = renderError(e_1.message);
                mount(root, html);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=index.js.map