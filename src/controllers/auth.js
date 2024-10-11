import { THIRTY_DAYS } from "../constants/index.js"
import { loginUser, logoutUser, refreshUserSession, registerUser, resetPwd, sendResetEmail } from "../services/auth.js"


export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body)
    res.status(201).json({
        status: 201,
        message: "successfully registered an user",
        data: user
    })
}

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body)

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now()+ THIRTY_DAYS),
    })

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS)
    })

    res.json({
        status: 200,
        message: "Successfully loged in user",
        data: {
            accessToken: session.accessToken
        },
    })
}

const setupSession = (res, session) => {
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now()+ THIRTY_DAYS),
    })
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now()+ THIRTY_DAYS),
    })
}

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUserSession({ sessionId: req.cookies.sessionId, refreshToken: req.cookies.refreshToken })
    
    setupSession(res, session)

    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken
        },
    })
}

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId)
    }

    res.clearCookie('sessionID');
    res.clearCookie("refreshToken");

    res.status(204).send()
}

export const sendResetEmailController = async (req, res) => {
    await sendResetEmail(req.body.email)

    res.json({
        message: "Email successfully sent",
        status: 200,
        data:{}
    })
}

export const resetPwdController = async (req, res) => {
    await resetPwd(req.body)

    res.json({
        status: 200,
        message: "Password was successfully reset",
        data:{}
    })
}