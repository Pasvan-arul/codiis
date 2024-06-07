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
const dotenv_1 = require("dotenv");
const nodemailer_1 = __importDefault(require("nodemailer"));
(0, dotenv_1.config)();
const smtp = {
    name: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: `cgwebservices7@gmail.com`,
        pass: `hgmq fxcg nqvf llsa`,
    },
};
let transporter = nodemailer_1.default.createTransport(smtp);
exports.default = {
    enqu: (d) => __awaiter(void 0, void 0, void 0, function* () {
        yield transporter
            .sendMail({
            from: "cgwebservices7@gmail.com",
            to: "reachus@as2kdigital.com",
            bcc: "mohan16895@gmail.com",
            subject: `AS2K DIGITAL Register Details`,
            html: `<table width='100%' cellspacing='0' cellpadding='0' border='0' bgcolor='#f6f5f1' align='center'><tbody><tr><td align='center'><table width='668' cellspacing='0' cellpadding='0' border='0' bgcolor='#f6f5f1' align='center'><tbody><tr><td width='650' bgcolor='#ffffff' align='left'><table width='570' cellspacing='0' cellpadding='0' border='0' bgcolor='#ffffff' align='center' style='font-size:13px; color:#852927; font-family:calibri; '><tbody><tr><td height='10' colspan='3' align='left'><b> AS2K DIGITAL Register Details</b></td></tr><tr><td height='10' colspan='3'></td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='10' colspan='3'></td></tr><tr><td colspan='3'>Hi&nbsp;AS2K DIGITAL,</td></tr><tr><td height='15' colspan='3'></td></tr><tr><td align='left'>Name</td><td>:</td><td align='left'>${d.name}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='10' colspan='3'></td></tr><tr><td align='left' width='100'>Email Id</td><td width='20'>:</td><td align='left'>${d.email}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='15' colspan='3'></td></tr><tr><td align='left' width='100'>Mobile</td><td width='20'>:</td><td align='left'>${d.phone}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='15' colspan='3'></td></tr><tr><td align='left' width='100'>Country</td><td width='20'>:</td><td align='left'>${d.country}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='15' colspan='3'></td></tr><tr><td align='left' width='100'>Message</td><td width='20'>:</td><td align='left'>${d.message}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='15' colspan='3'></td></tr><tr><td align='left' width='100'>Subject</td><td width='20'>:</td><td align='left'>${d.subject}</td></tr><tr><td colspan='3'><hr></td></tr><tr><td height='15' colspan='3'></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>`,
        })
            .then((r) => console.log("Success: ", r.messageId))
            .catch((err) => {
            console.log("Error from Local: ", err.response);
        });
    }),
};
//# sourceMappingURL=Mailer.js.map