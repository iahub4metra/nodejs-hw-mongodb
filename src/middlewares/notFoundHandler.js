import createHttpError from "http-errors"

export const notFoundHandler = (reg, res, next) => {
    next(createHttpError(404, "Route not found"))
}