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
const prismaClient_1 = __importDefault(require("./prismaClient"));
const PaginationParams_1 = __importDefault(require("../validations/PaginationParams"));
const constants_1 = require("../entities/constants");
const paginateItems = (model, args, params) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = PaginationParams_1.default.pick({ page: true, pageSize: true }).safeParse(params).data;
    const page = (validation === null || validation === void 0 ? void 0 : validation.page) || 1;
    const pageSize = (validation === null || validation === void 0 ? void 0 : validation.pageSize) || constants_1.DEFAULT_PAGE_SIZE;
    // @ts-ignore
    const count = yield prismaClient_1.default[model].count({ where: args.where });
    // @ts-ignore
    const data = yield prismaClient_1.default[model].findMany(Object.assign(Object.assign({}, args), { take: pageSize, skip: (page - 1) * pageSize }));
    return {
        data,
        statusCode: 200,
        info: {
            total: count,
            lastPage: Math.ceil(count / pageSize),
            prev: page > 1 ? page - 1 : null,
            next: page < Math.ceil(count / pageSize) ? page + 1 : null,
        },
    };
});
exports.default = paginateItems;
