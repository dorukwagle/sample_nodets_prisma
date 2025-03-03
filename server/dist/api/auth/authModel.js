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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyAllSessions = exports.destroySession = exports.createSession = exports.authenticate = void 0;
const hash_1 = require("../../utils/hash");
const uuid_1 = require("uuid");
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.users.findUnique({
        where: {
            username
        }
    });
    return user;
});
const authenticate = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUser(username);
    if (!user)
        return null;
    if (!(yield (0, hash_1.comparePassword)(password, (user.password || ''))))
        return null;
    delete user.password;
    return user;
});
exports.authenticate = authenticate;
const createSession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prismaClient_1.default.users.findUnique({
        where: {
            userId: user.userId
        }
    });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 5); // 5 days validity
    const session = yield prismaClient_1.default.sessions.create({
        data: {
            userId: userInfo.userId,
            session: (0, uuid_1.v7)(),
            expiresAt: expiryDate
        }
    });
    return session.session;
});
exports.createSession = createSession;
const destroySession = (session) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.sessions.delete({
        where: {
            sessionId: session.sessionId
        }
    });
    return true;
});
exports.destroySession = destroySession;
const destroyAllSessions = (session) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.sessions.deleteMany({
        where: {
            userId: session.userId
        }
    });
    return true;
});
exports.destroyAllSessions = destroyAllSessions;
