import dotenv from "dotenv";
dotenv.config();
const _ENVvariable = {
  CORS_ORIGEN: process.env.CORS_ORIGEN,
};

const ENVvariable = {
  get(env) {
    let value = _ENVvariable[env];
    if (!value) {
      console.log("valiable not found");
      process.exit(1);
    }
  },
};
export default ENVvariable;
