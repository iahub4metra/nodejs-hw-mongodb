import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose"

export const isValidId = (reg, res, next) => {
    const { contactId } = reg.params;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, "Bad request")
    }
    next()
}