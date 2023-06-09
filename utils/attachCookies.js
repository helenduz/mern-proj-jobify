const attachCookies = ({ res, userJWT }) => {
    // send token as cookie
    const dayMS = 24 * 3600 * 1000; // milliseconds
    res.cookie("token", userJWT, {
        expires: new Date(Date.now() + dayMS),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // use cookie only in HTTPS when in production
    });
};

export default attachCookies;
