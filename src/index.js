"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var localStorageKey = "__@@__user_progress";
function getProgress() {
    return __awaiter(this, void 0, void 0, function () {
        var progressJson, progress, defaultValue, defaultValueJson;
        return __generator(this, function (_a) {
            if (localStorage) {
                progressJson = localStorage.getItem(localStorageKey);
                if (progressJson) {
                    progress = JSON.parse(progressJson);
                    return [2 /*return*/, Promise.resolve(progress)];
                }
                else {
                    defaultValue = {};
                    defaultValueJson = JSON.stringify(defaultValue);
                    localStorage.setItem(localStorageKey, defaultValueJson);
                    return [2 /*return*/, Promise.resolve(defaultValue)];
                }
            }
            return [2 /*return*/, Promise.reject()];
        });
    });
}
function setProgress(technologyId, topic, completed) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, progress, progressJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getProgress()];
                case 1:
                    progress = _b.sent();
                    if (progress) {
                        if (progress[technologyId] === undefined) {
                            progress[technologyId] = (_a = {},
                                _a[topic] = completed,
                                _a);
                        }
                        else {
                            progress[technologyId][topic] = completed;
                        }
                        progressJson = JSON.stringify(progress);
                        localStorage.setItem(localStorageKey, progressJson);
                        return [2 /*return*/, Promise.resolve(progress)];
                    }
                    return [2 /*return*/, Promise.reject()];
            }
        });
    });
}
function getParams() {
    var search = window.location.search;
    if (search) {
        var paramsStr = search.split("?")[1];
        if (paramsStr) {
            var rawParams = paramsStr.split("&");
            var params = rawParams.reduce(function (prev, curr) {
                var _a;
                var raw = curr.split("=");
                return __assign({}, prev, (_a = {},
                    _a[raw[0]] = raw[1],
                    _a));
            }, {});
            return params;
        }
    }
    return {};
}
function getTech() {
    var params = getParams();
    var tech = params["tech"];
    return tech;
}
function getUrl(tech) {
    if (tech !== undefined) {
        return "./technologies/" + tech + "/" + tech + ".json?cache=" + new Date().getTime();
    }
    return "./technologies/technologies.json?cache=" + new Date().getTime();
}
function fetchTechnologies() {
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
function fetchData(tech) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = getUrl(tech);
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
function renderContent(props, tech) {
    return __awaiter(this, void 0, void 0, function () {
        var progress, levels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProgress()];
                case 1:
                    progress = _a.sent();
                    levels = Object.keys(props.levels);
                    return [2 /*return*/, "\n        <style>\n            h1 {\n                color: " + props.theme.primaryColor + ";\n            }\n\n            a {\n                color: " + props.theme.primaryColor + ";\n            }\n\n            .level {\n                background-color: " + props.theme.primaryColor + ";\n                color: #ffffff;\n            }\n        </style>\n        <img class=\"logo\" src=\"./technologies/" + tech.id + "/" + tech.id + ".png\" />\n        <h1>\n            " + tech.displayName + " Progression Ladder\n        </h1>\n        <h4>\n            The " + tech.displayName + " progression ladder is a grouping of concepts and skills relevant to " + tech.displayName + " programming.\n            It provides aspiring TypeScript programmers with a way to track and improve their " + tech.displayName + " skills.\n        </h4>\n        <table>\n            " + levels.map(function (level) { return "\n                    <tr class=\"level\">\n                        <td colspan=\"4\">\n                            " + (function () {
                            switch (level) {
                                case "novice":
                                    return "NOVICE";
                                case "advanced beginner":
                                    return "ADVANCED BEGINNER";
                                case "competent":
                                    return "COMPETENT";
                                case "proficient":
                                    return "PROFICIENT";
                                case "expert":
                                    return "EXPERT";
                                default:
                                    throw new Error("Unknown level " + level);
                            }
                        })() + "\n                        </td>\n                    </tr>\n                    <tr class=\"level-subtitle\">\n                        <td>CONCEPTS</td>\n                        <td>SKILLS</td>\n                        <td>RESOURCES</td>\n                        <td>COMPLETED</td>\n                    </tr>\n                    " + props.levels[level].map(function (topic, topicIndex) { return "\n                            <tr class=\"topic " + (topicIndex === level.length - 1 ? "last" : "") + "\">\n                                <td>\n                                    " + topic.name + "\n                                </td>\n                                <td>\n                                    " + topic.description + "\n                                </td>\n                                <td>\n                                    " + topic.resources.map(function (resource) { return "\n                                            <a\n                                                href=\"" + resource + "\"\n                                                target=\"_blank\"\n                                                data-toggle=\"tooltip\"\n                                                data-placement=\"left\"\n                                                title=\"" + resource + "\"\n                                            >\n                                                <i class=\"material-icons\">link</i>\n                                            </a>\n                                        "; }).join("") + "\n                                </td>\n                                <td>\n                                    <input\n                                        class=\"completed_checkbox\"\n                                        type=\"checkbox\"\n                                        name=\"" + tech.id + "_" + topic.name + "\"\n                                        data-lang=\"" + tech.id + "\"\n                                        data-topic=\"" + topic.name + "\"\n                                        value=\"true\"\n                                        " + (function () {
                            if (progress[tech.id]) {
                                if (progress[tech.id][topic.name]) {
                                    return "checked=\"checked";
                                }
                            }
                        })() + "\"\n                                    >\n                                </td>\n                            </tr>\n                        "; }).join("") + "\n                "; }).join("") + "\n        <table>\n        " + props.notes.map(function (n) { return "\n                <div class=\"note\">" + n + "</div>\n            "; }).join("") + "\n        <div class=\"copyright\">\n            This guide was created by\n            " + props.contributors.map(function (contributor, index) {
                            if (props.contributors.length === 1 || index === 0) {
                                return "\n                        <a href=\"" + contributor.contact + "\">\n                            " + contributor.name + "\n                        </a>\n                    ";
                            }
                            else if (index > 0 && index < props.contributors.length - 1) {
                                return ", <a href=\"" + contributor.contact + "\">" + contributor.name + "</a>";
                            }
                            else {
                                return "and <a href=\"" + contributor.contact + "\">" + contributor.name + "</a>";
                            }
                        }).join("") + "\n            and it is licensed under\n            <a\n                href=\"https://creativecommons.org/licenses/by/4.0/\"\n                title=\"Creative Commons Attribution 4.0 International license\"\n            >Creative Commons Attribution 4.0 International<a>.\n        </div>\n    "];
            }
        });
    });
}
function renderHome(technologies) {
    technologies = technologies.sort(function (a, b) { return a.displayName.localeCompare(b.displayName); })
        .filter(function (t) { return t.isVisible; });
    return "\n        <style>\n            h1 {\n                color: #f7a80d;\n            }\n\n            a {\n                color: #f7a80d;\n            }\n\n            .level {\n                background-color: #f7a80d;\n                color: #ffffff;\n            }\n        </style>\n        <img class=\"logo\" src=\"./assets/logo.png\" />\n        <h1>Tech Ladder IO</h1>\n        <h4>\n            A community-driven grouping of concepts and skills relevant to different technologies\n            that provides aspiring programmers with a way to track and improve their skills.\n        </h4>\n        <table>\n            <tr class=\"level\">\n                <td>Technology</td>\n                <td>Description</td>\n                <td>Ladder</td>\n            </tr>\n            " + technologies.map(function (t) {
        return "\n                    <tr class=\"topic\">\n                        <td>\n                            <a href=\"/?tech=" + t.id + "\">\n                                <b>\n                                    " + t.displayName + "\n                                </b>\n                            </a>\n                        </td>\n                        <td>\n                            " + t.description + "\n                        </td>\n                        <td>\n                            <a\n                                href=\"/?tech=" + t.id + "\"\n                                data-toggle=\"tooltip\"\n                                data-placement=\"left\"\n                                title=\"" + t.displayName + "\"\n                            >\n                                <i class=\"material-icons\">link</i>\n                            </a>\n                        </td>\n                    </tr>\n                ";
    }).join("") + "\n        <table>\n        <div class=\"promo\">\n            <h1>We need your help!</h1>\n            <p>\n                This is a community-driven project, please share your feedback and\n                help us to improve it.<br>\n                Please open an issue or send us a PR on <a href=\"https://github.com/remojansen/TechLadderIO\">GitHub</a>!\n            </p>\n        </div>\n    ";
}
function renderError(e) {
    return "" + e;
}
function mount(selector, html, done) {
    var $e = document.querySelector(selector);
    if ($e) {
        $e.innerHTML = html;
        if (done) {
            done();
        }
    }
}
(function () { return __awaiter(_this, void 0, void 0, function () {
    var root, techId_1, technologies, html, data, tech, e_1, html;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                root = "#main";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                techId_1 = getTech();
                return [4 /*yield*/, fetchTechnologies()];
            case 2:
                technologies = _a.sent();
                html = "";
                if (!(techId_1 === undefined)) return [3 /*break*/, 3];
                html = renderHome(technologies);
                return [3 /*break*/, 7];
            case 3:
                if (!(technologies.find(function (t) { return t.id === techId_1; }) === undefined)) return [3 /*break*/, 4];
                html = "\n                Sorry page not found!\n            ";
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, fetchData(techId_1)];
            case 5:
                data = _a.sent();
                tech = technologies.find(function (t) { return t.id === techId_1; });
                return [4 /*yield*/, renderContent(data, tech)];
            case 6:
                html = _a.sent();
                _a.label = 7;
            case 7:
                mount(root, html, function () {
                    $("a").tooltip();
                    $(".completed_checkbox").on("change", function (e) {
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var target, data, isChecked;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        target = $(e.target);
                                        data = $(e.target).data();
                                        isChecked = target.is(":checked");
                                        return [4 /*yield*/, setProgress(data.lang, data.topic, isChecked)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })();
                    });
                });
                return [3 /*break*/, 9];
            case 8:
                e_1 = _a.sent();
                html = renderError(e_1.message);
                mount(root, html);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); })();
