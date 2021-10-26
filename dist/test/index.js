"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var transformer = new index_1.default();
transformer.setTenant(1);
var rule = {
    all: [
        { fact: "name", operator: "equal", value: "siva" },
        { fact: "age", operator: "equal", value: 21 },
    ],
};
try {
    transformer.setRule(rule);
}
catch (error) {
    // console.log(error);
}
transformer.transform().then(function (data) {
    console.log(data);
    console.log(JSON.stringify(data));
});
