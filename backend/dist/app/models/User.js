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
exports.deleteUserById = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });
const User = mongoose_1.default.model('User', exports.userSchema);
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield User.find(); });
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findById(id); });
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findOne({ email: email }); });
exports.getUserByEmail = getUserByEmail;
const createUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.create(values);
});
exports.createUser = createUser;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield User.findOneAndDelete({ _id: id }); });
exports.deleteUserById = deleteUserById;
