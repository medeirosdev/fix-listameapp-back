"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = require("express");
require("express-async-errors");
var upload_1 = require("../../../config/upload");
var AppError_1 = require("../../../config/upload");
var AppErrorCodeEnum_1 = require("../../errors/AppErrorCodeEnum");
var routes_1 = require("./routes");
require("@shared/infra/typeorm");
require("@shared/container");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
app.use(function (err, req, res, next) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            code: err.code,
        });
    }
    console.error(err);
    return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        code: AppErrorCodeEnum_1.AppErrorCodeEnum.INTERNAL_SERVER_ERROR,
    });
});
app.listen(3333, function () {
    console.log('Server started on port 3333');
});
