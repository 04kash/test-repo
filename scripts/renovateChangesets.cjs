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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPackages = exports.commitAndPush = exports.getBumps = exports.getChangedFiles = exports.createChangeset = exports.getChangesetFilename = exports.getBranchName = void 0;
var exec_1 = require("@actions/exec");
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
var path_1 = require("path");
var get_packages_1 = require("@manypkg/get-packages");
function getBranchName() {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exec_1.getExecOutput)('git', ['branch', '--show-current'])];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getBranchName = getBranchName;
var findPackagesInDir = function (_a) {
    var dir = _a.dir, includeRoots = _a.includeRoots;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, packages, rootPackage;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, get_packages_1.getPackages)(dir).catch(function () { return ({
                        packages: [],
                        rootPackage: undefined,
                    }); })];
                case 1:
                    _b = _c.sent(), packages = _b.packages, rootPackage = _b.rootPackage;
                    return [2 /*return*/, __spreadArray(__spreadArray([], packages, true), [rootPackage && __assign(__assign({}, rootPackage), { isRoot: true })], false).filter(function (p) { console.log('p');console.log(p); return Boolean(p); })
                            .map(function (p) {
                            var _a;
                            return (__assign(__assign({}, p), { isRoot: (_a = p.isRoot) !== null && _a !== void 0 ? _a : false, relativeDir: (0, path_1.relative)(process.cwd(), (0, path_1.resolve)(p.dir)) }));
                        })
                            .filter(function (_a) {
                            var isRoot = _a.isRoot;
                            return (!includeRoots ? !isRoot : true);
                        })];
            }
        });
    });
};
function getChangesetFilename() {
    return __awaiter(this, void 0, void 0, function () {
        var shortHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exec_1.getExecOutput)('git rev-parse --short HEAD')];
                case 1:
                    shortHash = (_a.sent()).stdout;
                    return [2 /*return*/, ".changeset/renovate-".concat(shortHash.trim(), ".md")];
            }
        });
    });
}
exports.getChangesetFilename = getChangesetFilename;
function createChangeset(fileName, packageBumps, packages) {
    return __awaiter(this, void 0, void 0, function () {
        var message, _i, packageBumps_1, _a, pkg, bump, pkgs, body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = '';
                    for (_i = 0, packageBumps_1 = packageBumps; _i < packageBumps_1.length; _i++) {
                        _a = packageBumps_1[_i], pkg = _a[0], bump = _a[1];
                        message = message + "Updated dependency `".concat(pkg, "` to `").concat(bump, "`.\n");
                    }
                    pkgs = packages.map(function (pkg) { return "'".concat(pkg, "': patch"); }).join('\n');
                    body = "---\n".concat(pkgs, "\n---\n\n").concat(message.trim(), "\n");
                    return [4 /*yield*/, promises_1.writeFile(fileName, body)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createChangeset = createChangeset;
var getChangedFiles = function () { return __awaiter(void 0, void 0, void 0, function () {
    var diffOutput;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exec_1.getExecOutput)('git diff --name-only HEAD~1')];
            case 1:
                diffOutput = _a.sent();
                return [2 /*return*/, diffOutput.stdout.split('\n')];
        }
    });
}); };
exports.getChangedFiles = getChangedFiles;
function getBumps(files) {
    return __awaiter(this, void 0, void 0, function () {
        var bumps, _i, files_1, file, changes, packageJsonPath, packageJson, devDependencies, _a, _b, change, match, deps, depsVersion;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    bumps = new Map();
                    _i = 0, files_1 = files;
                    _c.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 4];
                    file = files_1[_i];
                    return [4 /*yield*/, (0, exec_1.getExecOutput)('git', ['show', file])];
                case 2:
                    changes = (_c.sent()).stdout;
                    packageJsonPath = (0, path_1.resolve)((0, path_1.dirname)(file), 'package.json');
                    packageJson = JSON.parse((0, fs_1.readFileSync)(packageJsonPath, 'utf8'));
                    devDependencies = packageJson.devDependencies || {};
                    console.log(devDependencies);
                    for (_a = 0, _b = changes.split('\n'); _a < _b.length; _a++) {
                        change = _b[_a];
                        if (!change.startsWith('+ ')) {
                            continue;
                        }
                        match = change.match(/"(.*?)"/g);
                        console.log(match);
                        if (match) {
                            deps = match[0].replace(/"/g, '');
                            depsVersion = match[1].replace(/"/g, '');
                            // Only add to bumps if it's not a devDependency
                            if (!devDependencies[deps]) {
                                bumps.set(deps, depsVersion);
                            }
                        }
                    }
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, bumps];
            }
        });
    });
}
exports.getBumps = getBumps;
function commitAndPush(fileNames) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exec_1.exec)('git', __spreadArray(['add'], fileNames, true))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, exec_1.exec)('git commit -C HEAD --amend --no-edit')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, exec_1.exec)('git push --force')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.commitAndPush = commitAndPush;
function listPackages(_a) {
    var isMultipleWorkspaces = _a.isMultipleWorkspaces, _b = _a.includeRoots, includeRoots = _b === void 0 ? false : _b;
    return __awaiter(this, void 0, void 0, function () {
        var workspacesRoot, workspaceDirs;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!isMultipleWorkspaces) {
                        return [2 /*return*/, findPackagesInDir({ dir: process.cwd(), includeRoots: includeRoots })];
                    }
                    workspacesRoot = `/home/kmittal/repos/test-repo/packages`;
                    return [4 /*yield*/, promises_1.readdir(workspacesRoot)];
                case 1:
                    workspaceDirs = _c.sent();
                    return [4 /*yield*/, Promise.all(workspaceDirs.map(function (workspace) {
                            return findPackagesInDir({
                                dir: (0, path_1.resolve)(workspacesRoot, workspace),
                                includeRoots: includeRoots,
                            });
                        })).then(function (packages) { return packages.flat(); })];
                case 2: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
exports.listPackages = listPackages;
