/* eslint-disable */
const commands = ["version", "migrate", "rollback", "migration", "seed"];
const command = process.argv[2];
const di = require("../utils/di")(process);

const seed = async () => {
    const opts = di.cradle;
    console.log("opts in db.js = ", opts);

    console.log("DI REGISTRATIONS >", di.registrations);
};

seed();
