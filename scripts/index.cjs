"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var renovateChangesets_1 = require("./renovateChangesets.cjs");
var path_1 = require("path");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var isMultipleWorkspaces, branchName, allPackages, publicPackages, packageList, changedFiles, changedFilesByWorkspace, changedWorkspacesWithChangeset, changedPackageJsons, bumps, changesetFilename, changesetFiles, _i, bumps_1, bump, changesetFilePath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    core.info('Running Renovate Changesets');
                    isMultipleWorkspaces = true;
                    return [4 /*yield*/, (0, renovateChangesets_1.getBranchName)()];
                case 1:
                    branchName = _a.sent();
                    console.log("branch name");
                    console.log(branchName);
                    if (!branchName.startsWith('renovate/')) {
                        core.info('Not a renovate branch, skipping');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, renovateChangesets_1.listPackages)({
                            isMultipleWorkspaces: isMultipleWorkspaces,
                            includeRoots: true,
                        })];
                case 2:
                    allPackages = _a.sent();
                    console.log(`allPackages`);
                    console.log(allPackages);
                    publicPackages = allPackages.filter(function (p) { return !p.packageJson.private; });
                    packageList = isMultipleWorkspaces
                        ? publicPackages.filter(function (p) { return p.dir !== process.cwd(); })
                        : publicPackages;
                    console.log('publicPackages');
                    console.log(publicPackages);
                    console.log('packageList');
                    console.log(packageList);
                    return [4 /*yield*/, (0, renovateChangesets_1.getChangedFiles)()];
                case 3:
                    changedFiles = _a.sent();
                    console.log('changedFiles');
                    console.log(changedFiles);
                    changedFilesByWorkspace = new Map(packageList
                        .filter(function (p) {
                            console.log('Checking package:', p.dir, 'isRoot:', !p.isRoot); // Log each package's directory and its isRoot status
                            return !p.isRoot; 
                        })
                        .map(function (p) {
                            const workspaceFiles = changedFiles
                                .filter(function (f) {
                                    const fullPath=`/home/kmittal/repos/test-repo/`+f
                                    const startsWith = fullPath.startsWith(p.dir);
                                    console.log(`relativeDir`);
                                    console.log(p.dir);

                                    console.log('Filtering changed files for workspace:', p.dir, 'File:', f, 'Starts with relativeDir:', startsWith); // Log each file being checked
                                    return startsWith;
                                })
                                .map(function (f) {
                                    const relativeFilePath = (0, path_1.relative)(p.dir, f);
                                    console.log('Relative file path for workspace:', p.dir, 'File:', f, 'Relative Path:', relativeFilePath); // Log the relative file path
                                    return relativeFilePath;
                                });
                    
                            console.log('Changed files for workspace:', p.dir, workspaceFiles); // Log the changed files for the current workspace
                    
                            return [
                                p.dir,
                                workspaceFiles,
                            ];
                        })
                        .filter(function (workspaceChanges) {
                            var _ = workspaceChanges[0], files = workspaceChanges[1];
                            const hasChanges = files.length > 0;
                            console.log('Workspace:', _, 'has changes:', hasChanges); // Log each workspace and if it has changes
                            return hasChanges;
                        })
                    );
                    
                    console.log('changedFilesByWorkspace');
                    console.log(changedFilesByWorkspace)
                    changedWorkspacesWithChangeset = new Map(Array.from(changedFilesByWorkspace.entries()).map(function (_a) {
                        var workspace = _a[0], files = _a[1];
                        return [
                            workspace,
                            files.some(function (f) { return f.startsWith('.changeset/'); }),
                        ];
                    }));
                    console.log(changedWorkspacesWithChangeset);
                    console.log("changedWorkspacesWithChangeset");
                    // If all packages have a changeset already then exit early.
                    if (!changedWorkspacesWithChangeset.size ||
                        Array.from(changedWorkspacesWithChangeset.values()).every(function (v) { return v; })) {
                        core.info('No changesets to create, or all workspaces have changesets already');
                        return [2 /*return*/];
                    }
                    changedPackageJsons = new Map(Array.from(changedFilesByWorkspace.entries())
                        .map(function (_a) {
                        var workspace = _a[0], files = _a[1];
                        return [
                            workspace,
                            // Ignore root package.json from the workspace, and check for package.json in the subfolders
                            files.filter(function (f) { return f !== 'package.json' && f.endsWith('package.json'); }),
                        ];
                    })
                        .filter(function (workspaceChanges) {
                        var _ = workspaceChanges[0], files = workspaceChanges[1];
                        return files.length > 0;
                    })
                        .map(function (_a) {
                        var workspace = _a[0], files = _a[1];
                        return [
                            workspace,
                            files.map(function (f) { 
                                console.log(f)
                                console.log(workspace)
                                return ({
                                path: `/home/kmittal/repos/test-repo/packages/package-b/package.json`,
                                localPath: (0, path_1.relative)(process.cwd(), (0, path_1.resolve)(workspace, f)),
                                packageJson: require((0, path_1.resolve)(workspace, 'package.json')),
                            }); }),
                        ];
                    }));
                    console.log('changedPackageJsons')
                    console.log(changedPackageJsons)
                    if (!changedPackageJsons.size) {
                        core.info('Seems that no package.jsons were changed in this PR');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all(Array.from(changedPackageJsons.entries()).map(function (_a) {
                            var workspace = _a[0], packages = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var changes;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, (0, renovateChangesets_1.getBumps)(packages.map(function (p) { return p.path; }))];
                                        case 1:
                                            changes = _b.sent();
                                            return [2 /*return*/, {
                                                    workspace: workspace,
                                                    packages: packages,
                                                    changes: changes,
                                                }];
                                    }
                                });
                            });
                        }))];
                case 4:
                  
                    bumps = _a.sent();
                    bumps = bumps.filter(({ changes }) => changes.size > 0);
                    return [4 /*yield*/, (0, renovateChangesets_1.getChangesetFilename)()];
                case 5:
                    changesetFilename = _a.sent();
                    changesetFiles = [];
                    _i = 0, bumps_1 = bumps;
                    _a.label = 6;
                case 6:
                    if (!(_i < bumps_1.length)) return [3 /*break*/, 9];
                    bump = bumps_1[_i];
                    changesetFilePath = (0, path_1.resolve)(bump.workspace, changesetFilename);
                    changesetFiles.push(changesetFilePath);
                    return [4 /*yield*/, (0, renovateChangesets_1.createChangeset)(changesetFilePath, bump.changes, bump.packages.map(function (p) { return p.packageJson.name; }))];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: 
                // Commit and push all the changesets.
                return [4 /*yield*/, (0, renovateChangesets_1.commitAndPush)(changesetFiles)];
                case 10:
                    // Commit and push all the changesets.
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    core.error(error.stack);
    core.setFailed(String(error));
    process.exit(1);
});
