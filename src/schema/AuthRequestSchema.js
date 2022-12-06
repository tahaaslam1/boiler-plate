module.exports = function AuthRequestSchema(opts) {
    const { authRequestHandlers, Joi } = opts;

    const reqtest = () => {
        return {
            method: "GET",
            url: "/currencyRate/:base",
            handler: authRequestHandlers.getCurrencyRate,
            schema: {
                params: Joi.object().keys({
                    base: Joi.string().max(3),
                }),
            },
        };
    };

    const signup = () => {
        return {
            method: "POST",
            url: "/signup",
            handler: authRequestHandlers.signup,
        };
    };

    const mocksignup = () => {
        return {
            method: "POST",
            url: "/mockSignup",
            handler: authRequestHandlers.mocksignup,
        };
    };

    return {
        reqtest,
        signup,
        mocksignup,
    };
};
