"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
// below higher order function the get one function in parameter and return another function
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(err);
        next(err);
    });
};
exports.catchAsync = catchAsync;
