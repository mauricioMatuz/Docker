const { Pool } = require("pg");
require("dotenv").config();
var cors = require("cors");
const express = require("express");
const app = express();

const config = {
  host: "database-1.c6qsfre4unft.us-east-2.rds.amazonaws.com",
  user: "postgres",
  password: "1eduardo",
  port: 5432,
  database: "coldward",
};
const pool = new Pool(config);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.get("/api/meta/rifle", cors(), async (req, res) => {
//   try {
//     console.log("SI ENTRO A GET");
//     const users = await pool.query(
//       "select image,nombre from rifle ORDER BY ttK asc fetch first 2 rows only;"
//     );
//     // return res.send(users.rows);
//     res.send(users.rows);
//   } catch (error) {
//     console.log("ERROR");
//     console.log(error);
//   }
// });

app.get("/", cors(), (req, res) => {
  try {
    res.send("SOLO ES EL INDEX MARCA ERROR SI nO LO TIENE XD");
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/meta/:busqueda", cors(), async (req, res) => {
  try {
    console.log(`esto es busqueda ${req.params.busqueda}`);
    const user = await pool.query(
      `select image,nombre from ${req.params.busqueda} ORDER BY ttK asc fetch first 2 rows only;`
    );
    res.send(user.rows);
  } catch (error) {
    print(`Error en busqueda`);
  }
});

app.get("/api/rifle/arm/cargador", cors(), async (req, res) => {
  console.log("AAAAAA");
  const user = await pool.query(
    "select r.image, cr.nombre,cr.ventaja,cr.desventaja from rifle as r inner join cargador as cr on r.id_mira = cr.id_ammo where cr.nombre = 'Cargador rapido salvo de 50 balas'"
  );
  res.send(user.rows);
});

app.get("/api/sniper", cors(), async (req, res) => {
  try {
    console.log("SI ENTRO A GET");
    const users = await pool.query("select * from sniper");
    // return res.send(users.rows);
    res.send(users.rows);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
  }
});

app.get("/api/ammo/:id", cors(), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Esto es id ` + id);
    const arma = await pool.query("select * from rifle where id = $1 ", [id]);
    console.log("si entro el flutter");
    return res.send(arma.rows);
  } catch (error) {
    console.log("ERROR", error);
  }
});

app.listen(PORT, () => console.log("servidor activo: " + PORT));
