import express from "express";
import Constants from "./src/constants/Constants";

const app = express();

app.use(express.static("public"));

app.listen(Constants.PORT, () => {
    console.log(`Web server started. Listening on http://localhost:${Constants.PORT}`);
});