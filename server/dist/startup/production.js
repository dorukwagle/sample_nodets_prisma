"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const prod = (app) => {
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
};
exports.default = prod;
