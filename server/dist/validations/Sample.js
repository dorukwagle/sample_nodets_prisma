"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Sample = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters long"),
    body: zod_1.z.string().min(3, "Body must be at least 3 characters long").optional(),
    status: zod_1.z.enum(["Pending", "Completed"]).optional(),
});
exports.default = Sample;
