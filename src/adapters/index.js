const redis = require("./redis");

module.exports = async (opts) => ({
    cache: {
        primary: await redis(opts),
    },
});
