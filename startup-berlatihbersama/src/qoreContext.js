import { QoreClient } from "@feedloop/qore-client";
import createQoreContext from "@feedloop/qore-react";
import config from "./qore.config.json";
// import schema from "./qore.schema.json";

const client = new QoreClient({
  ...config,
  getToken: () => localStorage.getItem("token"),
});

const qoreContext = createQoreContext(client);
export default qoreContext;
