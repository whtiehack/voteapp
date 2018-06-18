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
Object.defineProperty(exports, "__esModule", { value: true });
var EnumVoteManageResultCode;
(function (EnumVoteManageResultCode) {
    EnumVoteManageResultCode[EnumVoteManageResultCode["SUCCESS"] = 0] = "SUCCESS";
    EnumVoteManageResultCode["NODATA"] = "no vote data";
    EnumVoteManageResultCode["VOTE_OUTDATED"] = "vote outdated";
    EnumVoteManageResultCode["VOTE_NO_OPINION"] = "no opinion";
    EnumVoteManageResultCode["VOTE_HAS_VOTED"] = "has voted";
})(EnumVoteManageResultCode = exports.EnumVoteManageResultCode || (exports.EnumVoteManageResultCode = {}));
var VoteManager = /** @class */ (function () {
    function VoteManager() {
        this.voteDatas = {};
        this.voteIdxIncr = 0;
    }
    VoteManager.prototype.createVote = function (voteData) {
        return __awaiter(this, void 0, void 0, function () {
            var voteId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateNewVoteId()];
                    case 1:
                        voteId = _a.sent();
                        voteData.id = voteId;
                        this.voteDatas[voteId] = voteData;
                        return [2 /*return*/, voteId];
                }
            });
        });
    };
    VoteManager.prototype.trans2SmallVote = function (voteData) {
        return {
            id: voteData.id,
            title: voteData.title,
            time: voteData.time,
            endTime: voteData.endTime,
        };
    };
    VoteManager.prototype.getVoteDatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, voteId;
            return __generator(this, function (_a) {
                result = {};
                for (voteId in this.voteDatas) {
                    if (!this.voteDatas[voteId].hide) {
                        result[voteId] = this.voteDatas[voteId];
                    }
                }
                return [2 /*return*/, result];
            });
        });
    };
    // showlist
    VoteManager.prototype.getVoteList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, id, item;
            return __generator(this, function (_a) {
                result = [];
                for (id in this.voteDatas) {
                    item = this.voteDatas[id];
                    if (item.hide) {
                        continue;
                    }
                    result.push({
                        id: id,
                        title: item.title,
                        time: item.time,
                        endTime: item.endTime
                    });
                }
                return [2 /*return*/, result];
            });
        });
    };
    VoteManager.prototype.getVoteData = function (voteId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.voteDatas[voteId]];
            });
        });
    };
    VoteManager.prototype.userVote = function (voteId, voteIdx, name, remarks) {
        return __awaiter(this, void 0, void 0, function () {
            var voteData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVoteData(voteId)];
                    case 1:
                        voteData = _a.sent();
                        if (!voteData) {
                            return [2 /*return*/, EnumVoteManageResultCode.NODATA];
                        }
                        if (voteData.endTime < Date.now()) {
                            return [2 /*return*/, EnumVoteManageResultCode.VOTE_OUTDATED];
                        }
                        if (!voteData.opinions[voteIdx]) {
                            return [2 /*return*/, EnumVoteManageResultCode.VOTE_NO_OPINION];
                        }
                        // check has voted
                        if (voteData.votedNames[name] || voteData.votedNames[name] == 0) {
                            return [2 /*return*/, EnumVoteManageResultCode.VOTE_HAS_VOTED];
                        }
                        voteData.votedNames[name] = voteIdx;
                        voteData.votes[voteIdx].push([name, remarks]);
                        return [2 /*return*/, EnumVoteManageResultCode.SUCCESS];
                }
            });
        });
    };
    VoteManager.prototype.generateNewVoteId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ++this.voteIdxIncr + ''];
            });
        });
    };
    return VoteManager;
}());
exports.VoteManager = VoteManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZS5tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZvdGUubWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBWSx3QkFNWDtBQU5ELFdBQVksd0JBQXdCO0lBQ2hDLDZFQUFPLENBQUE7SUFDUCxtREFBdUIsQ0FBQTtJQUN2QiwyREFBK0IsQ0FBQTtJQUMvQiwwREFBOEIsQ0FBQTtJQUM5Qix3REFBNEIsQ0FBQTtBQUNoQyxDQUFDLEVBTlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFNbkM7QUFFRDtJQUFBO1FBQ0ksY0FBUyxHQUEyQixFQUFFLENBQUM7UUFDdkMsZ0JBQVcsR0FBVSxDQUFDLENBQUM7SUF3RTNCLENBQUM7SUF2RVMsZ0NBQVUsR0FBaEIsVUFBaUIsUUFBaUI7Ozs7OzRCQUNmLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFBOzt3QkFBdkMsTUFBTSxHQUFHLFNBQThCO3dCQUM3QyxRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7d0JBQ2xDLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNqQjtJQUVELHFDQUFlLEdBQWYsVUFBZ0IsUUFBaUI7UUFDN0IsT0FBTztZQUNILEVBQUUsRUFBQyxRQUFRLENBQUMsRUFBRTtZQUNkLEtBQUssRUFBQyxRQUFRLENBQUMsS0FBSztZQUNwQixJQUFJLEVBQUMsUUFBUSxDQUFDLElBQUk7WUFDbEIsT0FBTyxFQUFDLFFBQVEsQ0FBQyxPQUFPO1NBQzNCLENBQUE7SUFDTCxDQUFDO0lBRUssa0NBQVksR0FBbEI7Ozs7Z0JBQ1UsTUFBTSxHQUEyQixFQUFTLENBQUM7Z0JBQ2pELEtBQVEsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7b0JBQzdCLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBQzt3QkFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzNDO2lCQUNKO2dCQUNELHNCQUFPLE1BQU0sRUFBQzs7O0tBQ2pCO0lBRUQsV0FBVztJQUNMLGlDQUFXLEdBQWpCOzs7O2dCQUNVLE1BQU0sR0FBZSxFQUFTLENBQUM7Z0JBQ3JDLEtBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7b0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoQyxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUM7d0JBQ1QsU0FBUztxQkFDWjtvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNSLEVBQUUsSUFBQTt3QkFDRixLQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUs7d0JBQ2hCLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSTt3QkFDZCxPQUFPLEVBQUMsSUFBSSxDQUFDLE9BQU87cUJBQ3ZCLENBQUMsQ0FBQTtpQkFDTDtnQkFDRCxzQkFBTyxNQUFNLEVBQUM7OztLQUNqQjtJQUVLLGlDQUFXLEdBQWpCLFVBQWtCLE1BQWE7OztnQkFDM0Isc0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBQzs7O0tBQ2pDO0lBRUssOEJBQVEsR0FBZCxVQUFlLE1BQU0sRUFBQyxPQUFPLEVBQUMsSUFBVyxFQUFDLE9BQWM7Ozs7OzRCQUNuQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBekMsUUFBUSxHQUFHLFNBQThCO3dCQUMvQyxJQUFHLENBQUMsUUFBUSxFQUFDOzRCQUNULHNCQUFPLHdCQUF3QixDQUFDLE1BQU0sRUFBQzt5QkFDMUM7d0JBQ0QsSUFBRyxRQUFRLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBQzs0QkFDM0Isc0JBQU8sd0JBQXdCLENBQUMsYUFBYSxFQUFDO3lCQUNqRDt3QkFDRCxJQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQzs0QkFDM0Isc0JBQU8sd0JBQXdCLENBQUMsZUFBZSxFQUFDO3lCQUNuRDt3QkFDRCxrQkFBa0I7d0JBQ2xCLElBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQzs0QkFDM0Qsc0JBQU8sd0JBQXdCLENBQUMsY0FBYyxFQUFDO3lCQUNsRDt3QkFDRCxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQzt3QkFDcEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0Msc0JBQU8sd0JBQXdCLENBQUMsT0FBTyxFQUFDOzs7O0tBQzNDO0lBRWEsdUNBQWlCLEdBQS9COzs7Z0JBQ0ksc0JBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBQzs7O0tBQ2xDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBMUVELElBMEVDO0FBMUVZLGtDQUFXIn0=