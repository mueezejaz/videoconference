import { server } from "./app.js";
import workerManager from "./libs/worker.manager.js";
const workers = new workerManager();

workers.createWorkersForEachCore();

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
