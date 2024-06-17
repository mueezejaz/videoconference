import dotenv from "dotenv";
dotenv.config();
const _ENVvariable = {
  CORS_ORIGEN: process.env.CORS_ORIGEN,
  ENV: process.env.ENV,
};
const ENVvariable = {
  get(env) {
    let value = _ENVvariable[env];
    if (!value) {
      console.log(`valiable ${env} not found`);
      process.exit(1);
    }
    return value;
  },
};
export default ENVvariable;
