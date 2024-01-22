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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = void 0;
const prisma_1 = require("../../lib/prisma");
const createUser_schema_1 = require("../../schemas/createUser.schema");
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        createUser_schema_1.createUserSchema.parse({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    }
    catch (err) {
        return res.status(400).json({ msg: err.issues[0].message });
    }
    const userId = req.params.id;
    const findUser = yield prisma_1.prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });
    if (!findUser) {
        return res.status(401).json({ msg: "User not Found!" });
    }
    const user = yield prisma_1.prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        },
    });
    return res.status(201).json({ msg: "User Updated Successfully!" });
});
exports.updateUserById = updateUserById;
