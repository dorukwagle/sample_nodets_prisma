"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const PaginationParams = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).optional(),
    pageSize: zod_1.z.coerce
        .number()
        .min(3, "Page size must be at least 3")
        .optional(),
    seed: zod_1.z.string().optional(), // for text search
    number: zod_1.z.coerce.number().optional(),
    status: zod_1.z.enum(["Pending", "Completed"]).optional(),
});
exports.default = PaginationParams;
