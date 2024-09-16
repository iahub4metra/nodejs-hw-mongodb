export const ctrlWrapper = (controller) => {
    return async (reg, res, next) => {
        try {
            await controller(reg, res, next);
        } catch (err) {
            next(err)
        }
    }
};