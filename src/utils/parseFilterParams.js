const parseContactType = (type) => {
    const isString = typeof type === "string";
    if (!isString) return 

    const isContactType = (type) => ['work', "home", "personal"].includes(type);
    if (isContactType(type)) return type
}

const parseIsFavourite = (value) => {
    const isString = typeof value === "string";
    if (!isString) return;

    const isFavourite = value;
    if (isFavourite) return value
}

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    }
}