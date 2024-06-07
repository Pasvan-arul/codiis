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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const Mailer_1 = __importDefault(require("./Mailer"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/test", (_, res) => {
    res.send("Welcome to CG WebServices API");
});
app.post("/cgweb_mail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Mailer_1.default.enqu(req.body);
    res.send("Mail sended successfully");
}));
const port = process.env.PORT || 5000;
const date = new Date();
app.listen(port, () => console.log(`${date} - Server is running on ${port}`));
//# sourceMappingURL=index.js.map