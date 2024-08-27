"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//import { authentication } from "middlewares/auth";
//import { DateTime } from "luxon";
const WaterGasRoute_1 = __importDefault(require("./routes/WaterGasRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.send("Hello World");
});
app.use("/upload", WaterGasRoute_1.default);
//app.listen(process.env.PORT || 3344);
//# sourceMappingURL=index.js.map