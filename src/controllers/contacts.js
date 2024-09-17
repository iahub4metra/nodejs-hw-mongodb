import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js"
import createHttpError from "http-errors"

export const getContactsController = async (reg, res) => {
    const contacts = await getAllContacts()

    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    })
}

export const getContactByIdController = async (reg, res) => {
    const { contactId } = reg.params;
    const contact = await getContactById(contactId)

    if (!contact) {
        throw createHttpError(404, "Contact not found")
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
    })
}

export const createContactController = async (reg, res,) => {
    const contact = await createContact(reg.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created contact!",
        data: contact,
    })
}

export const patchContactController = async (reg, res, next) => {
    const { contactId } = reg.params;
    const result = await patchContact(contactId, reg.body);

    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data:result.contact,
    })
}

export const deleteContactController = async (reg, res, next) => {
    const { contactId } = reg.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.status(204).send()
}