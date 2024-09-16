import dotenv from "dotenv";
import connecDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();
const port = process.env.PORT || 3000;

connecDB()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
