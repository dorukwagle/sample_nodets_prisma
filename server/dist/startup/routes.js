"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authController_1 = __importDefault(require("../api/auth/authController"));
const usersController_1 = __importDefault(require("../api/users/usersController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const samplesController_1 = __importDefault(require("../api/sample/samplesController"));
const api = (p) => `/api/${p}`;
const initializeRoutes = (app) => {
    app.use((0, cookie_parser_1.default)());
    app.use(api("users"), usersController_1.default);
    app.use(api("auth"), authController_1.default);
    app.use(api("samples"), auth_1.default, samplesController_1.default);
};
exports.default = initializeRoutes;
