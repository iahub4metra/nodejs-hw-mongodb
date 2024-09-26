export const validateBody = (schema) => async (reg, res, next) => {
    try {
        await schema.validateAsync(reg.body, { abortEarly: false })
        next()
    } catch (err) {
        const error = createHttpError(400, "Bad request", { errors: err.details })
        next(error)
    }
}