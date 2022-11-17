module.exports = function AuthRequestSchema(opts) {
    const { authRequestHandlers, Joi } = opts;

    const reqtest = () => {
        return {
            method: "GET",
            url: "/currencyRate/:base",
            handler: authRequestHandlers.getCurrencyRate,
        };
    };

    return {
        reqtest,
    };
};
