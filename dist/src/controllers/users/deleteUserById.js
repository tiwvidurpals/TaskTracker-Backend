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
exports.deleteUserById = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const findUser = yield prisma_1.prisma.user.findUnique({
        where: { id: parseInt(userId) },
    });
    if (!findUser) {
        return res.status(401).json({ msg: "User not Found!" });
    }
    const user = yield prisma_1.prisma.user.delete({
        where: { id: parseInt(userId) },
    });
    return res.status(201).json({ msg: "User Deleted Successfully!" });
});
exports.deleteUserById = deleteUserById;
