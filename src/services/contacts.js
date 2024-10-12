import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js"
import { SORT_ORDER } from "../constants/index.js";

export const getAllContacts = async ({ page=1, perPage=10, sortBy='_id', sortOrder=SORT_ORDER.ASC, filter={}, user}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId:user._id})

    if (filter.contactType) {
        contactsQuery.where("contactType").equals(filter.contactType)
    }

    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite)
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find({userId:user._id}).merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder}).exec()
    ])

    const paginationData = calculatePaginationData(contactsCount, perPage, page)

    return {
        data: contacts,
        ...paginationData,
    };
}

export const getContactById = async (contactId, user) => {
    const contact = await ContactsCollection.findOne({_id:contactId, userId: user._id});
    return contact;
}

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
}

export const patchContact = async (contactData, data, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(contactData, data, {new: true, includeResultMetadata: true, ...options,});

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
    }
}

export const deleteContact = async (contactId, user) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId: user._id })
    return contact;
}

