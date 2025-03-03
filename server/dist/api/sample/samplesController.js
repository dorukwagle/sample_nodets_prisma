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
const samplesModel_1 = require("./samplesModel");
const samples = express_1.default.Router();
samples.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, statusCode, data } = yield (0, samplesModel_1.createSample)(req.session.userId, req.body);
    res.status(statusCode).json(error || data);
}));
samples.delete("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, samplesModel_1.deleteSample)(req.session.userId, req.params.todoId);
    res.status(200).end();
}));
samples.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, statusCode, data, info } = yield (0, samplesModel_1.paginateSamples)(req.session.userId, req.query);
    res.status(statusCode).json(error ? error : { data, info });
}));
exports.default = samples;
