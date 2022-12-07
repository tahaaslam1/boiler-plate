const https = require("https");
module.exports = function AuthRequestHandlers(opts) {
    const { Axios, cache, _ } = opts;

    async function getCurrencyRate(request, reply) {
        console.log("request k parameters", request.params);
        const { base } = request.params;

        try {
            const result = await cache["primary"].hgetall(`${base}`);
            if (!_.isEmpty(result)) {
                console.log("cache hit", result);
                return reply.send(result);
            } else {
                console.log("cache miss", result);
                const response = await Axios.get(
                    `https://api.exchangerate.host/latest?base=${base}&places=4`
                );

                console.log(response.data.rates);

                await cache["primary"].hset(`${base}`, response.data.rates); // saving key and value in redis cache

                await cache["primary"].expire(`${base}`, 1800); // setting an expiry for above key

                return reply.send(response.data.rates);
            }
        } catch (error) {
            console.log("Error");
            return reply.send(error);
        }
    }

    async function signup(request, response) {
        const { body } = request;
        try {
            const res = await Axios.post(
                "https://localhost:44323/api/SignUp",
                {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                    phoneNumber: body.phoneNumber,
                },
                {
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false,
                    }),
                }
            );

            console.log(res.data);

            if (res.data == "Success") {
                response.send({ response: "signed up" });
            } else {
                response.send({response : "failed to register person"});
            }
        } catch (e) {
            response.send("internal server error");
        }
    }

    async function mocksignup(request, response) {
        const { body } = request;
        console.log(body);
        response.send("ok");
    }
    return {
        getCurrencyRate,
        signup,
        mocksignup,
    };
};
