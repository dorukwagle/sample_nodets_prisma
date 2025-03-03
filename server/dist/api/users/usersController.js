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
const express_1 = __importDefault(require("express"));
const usersModel_1 = require("./usersModel");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users = express_1.default.Router();
users.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, statusCode, data } = yield (0, usersModel_1.registerUser)(req.body);
    res.status(statusCode).json({ error, data });
}));
users.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield (0, usersModel_1.getUser)(req.session.userId)); }));
exports.default = users;
