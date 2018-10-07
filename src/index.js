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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./data/data.json", {
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
    return "\n        <img class=\"logo\" src=\"./assets/ts.png\" />\n        <h1>" + props.title + "</h1>\n        <h4>" + props.subtitle + "</h4>\n        <table>\n            " + props.levels.map(function (l) { return "\n                    <tr class=\"level\">\n                        <td colspan=\"3\">" + l.name + "</td>\n                    </tr>\n                    <tr class=\"level-subtitle\">\n                        <td>CONCEPTS</td>\n                        <td>SKILLS</td>\n                        <td>RESOURCES</td>\n                    </tr>\n                    " + l.topics.map(function (t, i) { return "\n                            <tr class=\"topic " + (i === l.topics.length - 1 ? "last" : "") + "\">\n                                <td>\n                                    " + t.name + "\n                                </td>\n                                <td>\n                                    " + t.description + "\n                                </td>\n                                <td>\n                                    " + t.resources.map(function (r) { return "\n                                            <a\n                                                href=\"" + r + "\"\n                                                target=\"_blank\"\n                                            >\n                                                <i class=\"material-icons\">link</i>\n                                            </a>\n                                        "; }).join("") + "\n                                </td>\n                            </tr>\n                        "; }).join("") + "\n                "; }).join("") + "\n        <table>\n        " + props.notes.map(function (n) { return "\n                <div class=\"note\">" + n + "</div>\n            "; }).join("") + "\n    ";
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
