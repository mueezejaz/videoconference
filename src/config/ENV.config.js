import dotenv from "dotenv";
dotenv.config();
const _ENVvariable = {
  CORS_ORIGEN: "http://127.0.0.1:5173",
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
