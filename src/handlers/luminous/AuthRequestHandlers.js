module.exports = function AuthRequestHandlers(opts) {
    console.log("next k baad");
    const { authMediator } = opts;

    async function test(request, reply) {
        const { body, elSession } = request;
        console.log("test");
        const sent = await authMediator.test({ ...body, session: elSession });
        reply.send(JSON.stringify(sent));
    }
    return {
        test,
    };
};
