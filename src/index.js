const express = require("express");

const app = express();

app.get("/api/usuarios", (req, res) => {
    return res.json([
        {id: 1, name: "Admin", email: "admin@mail.com"},
        {id: 2, name: "Juan", email: "juan@mail.com"}
    ]);
})

app.listen(3000, () => {
    console.log("Servidor iniciado de NODE");
})
