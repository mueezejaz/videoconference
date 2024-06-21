import { server } from "./app.js";
import WorkerManager from "./libs/worker.manager.js";
let workers;
let routers;
export { workers };
server.listen(3000, async () => {
  console.log("Server is running on port 3000");
  workers = new WorkerManager();
  await workers.createWorkersForEachCore();
});
