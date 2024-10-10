import express from "express";
import userRoute from "./routes/userRoute.js";

const port = 3000;
const app = express();

//Middleware
app.use(express.json());

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server hört auf port ${port}`);
});
