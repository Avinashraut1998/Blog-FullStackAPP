
import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) =>  res.json({ message: "App is Working" }))


app.use((req, res) => {
    console.log(import.meta.dirname)
    res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});