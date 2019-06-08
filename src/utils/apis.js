/**
 * Created by Xinhe on 2019-05-25.
 */
const EosApi = require("eosjs-api"); // Or EosApi = require('./src')

// everything is optional
// eslint-disable-next-line no-unused-vars
const options = {
  httpEndpoint: "" // default, null for cold-storage
};

const eos = EosApi(options);

export default eos;
