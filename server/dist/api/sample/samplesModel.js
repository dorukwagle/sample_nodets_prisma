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
exports.paginateSamples = exports.deleteSample = exports.createSample = void 0;
const formatValidationErrors_1 = __importDefault(require("../../utils/formatValidationErrors"));
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const Sample_1 = __importDefault(require("../../validations/Sample"));
const PaginationParams_1 = __importDefault(require("../../validations/PaginationParams"));
const paginator_1 = __importDefault(require("../../utils/paginator"));
const createSample = (userId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const res = { statusCode: 201 };
    const validation = Sample_1.default.safeParse(body);
    const error = (0, formatValidationErrors_1.default)(validation);
    if (error)
        return error;
    const data = validation.data;
    res.data = yield prismaClient_1.default.samples.create({
        data: Object.assign(Object.assign({}, data), { userId }),
    });
    return res;
});
exports.createSample = createSample;
const deleteSample = (userId, sampleId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.samples.update({
        where: {
            userId,
            sampleId,
        },
        data: {
            deletedAt: new Date(),
        }
    });
});
exports.deleteSample = deleteSample;
const paginateSamples = (userId, params) => __awaiter(void 0, void 0, void 0, function* () {
    const res = { statusCode: 400 };
    const validation = PaginationParams_1.default.safeParse(params);
    const error = (0, formatValidationErrors_1.default)(validation);
    if (error) {
        res.error = error.error;
        return res;
    }
    const data = validation.data;
    return (0, paginator_1.default)("samples", {
        where: {
            userId,
        },
        select: {
            sampleId: true,
            title: true,
            body: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        }
    }, data);
});
exports.paginateSamples = paginateSamples;
