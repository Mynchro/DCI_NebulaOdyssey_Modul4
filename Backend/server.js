import express from "express";
import { connectDB } from "./libs/db.js";
//import { Planet } from "./models/Planet.js";
//import { Building } from "./models/Buildings.js";

const app = express();
app.use(express.json());

const port = 3000;

//await connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    //calculateResources();
});
