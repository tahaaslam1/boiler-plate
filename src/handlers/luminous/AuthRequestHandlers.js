module.exports = function AuthRequestHandlers(opts) {
    const { Axios, cache } = opts;

    async function getCurrencyRate(request, reply) {
        try {
            const { base } = request.params;

            await cache["primary"]
                .hgetall(`${base}`)
                .then((result) => {
                    reply.send(result);
                })
                .catch((error) => {
                    console.log("cache error", error);
                });

            // await Axios.get(`https://api.exchangerate.host/latest?base=${base}`)
            //     .then(async function (response) {
            //         console.log(response.data.rates);
            //         await cache["primary"].hmset(
            //             `${base}`,
            //             response.data.rates
            //         );
            //         reply.send(response.data.rates);
            //     })
            //     .catch(function (error) {
            //         console.log("idher arha he");
            //         console.log(error);
            //     });
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getCurrencyRate,
    };
};
