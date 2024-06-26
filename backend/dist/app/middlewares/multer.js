"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/images');
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path_1.default.extname(file.originalname); // Fájl kiterjesztésének meghatározása
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Fájl név összeállítása kiterjesztéssel
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
/*
Example

app.post('/image', upload.single('image'), (req: Request, res: Response) => {})
*/ 
