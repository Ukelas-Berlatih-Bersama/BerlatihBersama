import { QoreClient } from "@feedloop/qore-client";
import createQoreContext from "@feedloop/qore-react";
import config from "./qore.config.json";
import schema from "./qore.schema.json";

export const client = new QoreClient({
  ...config,
  onError: (error) => {
    switch (error.message) {
      case "Request failed with status code 500":
        console.info("An error has occured");
        break;
      case "Request failed with status code 401":
        console.info("Email or Password wrong");
        break;
    }
  },
  getToken: () => localStorage.getItem("token"),
});
client.init(schema);

const qoreContext = createQoreContext(client);
export default qoreContext;
