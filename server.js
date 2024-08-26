import express from "express";
import mysql from "mysql";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (companyName, email, password) VALUES (?)";
  const values = [req.body.companyName, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("error");
    }
    if (data.length > 0) {
      return res.json("Sucess");
    } else {
      return res.json("Failed");
    }
  });
});

app.post("/validacao", (req, res) => {
  const sql = "SELECT * FROM validacao WHERE name = ? AND password = ?";
  db.query(sql, [req.body.name, req.body.password], (err, data) => {
    if (err) {
      return res.json("error");
    }
    if (data.length > 0) {
      return res.json("Sucess");
    } else {
      return res.json("Failed");
    }
  });
});

// app.post("/cadastroArtefato", (req, res) => {
//   let { nome, descricao, tipo_reuso, arquivo } = req.body;
//   arquivo = "teste";
//   const sql =
//     "INSERT INTO artefatos (nome, descricao, tipo_reuso, arquivo) VALUES (?, ?, ?, ?)";
//   db.query(sql, [nome, descricao, tipo_reuso, arquivo], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json("error");
//     }
//     return res.json(data);
//   });
// });

app.post("/cadastroArtefato", (req, res) => {
  let { nome, descricaoBreve, descricaoDetalhada, tipoReuso, versao } =
    req.body;
  const validacao = "Pendente";
  const downloads = 0;

  const sql = `
    INSERT INTO artefato (nome, descricaoBreve, descricaoDetalhada, tipoReuso, validacao, downloads, dataPublicacao, versao) 
    VALUES (?, ?, ?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'), ?)
  `;

  db.query(
    sql,
    [
      nome,
      descricaoBreve,
      descricaoDetalhada,
      tipoReuso,
      validacao,
      downloads,
      versao,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database insertion error" });
      }
      console.log("Artefato cadastrado com sucesso!");
      return res
        .status(200)
        .json({ message: "Artefato cadastrado com sucesso!" });
    }
  );
});

app.get("/consultarArtefatos", (req, res) => {
  const sql = "SELECT * FROM artefato";
  db.query(sql, (err, data) => {
    if (err) return app.json(err);
    return res.json(data);
  });
});

app.put("/aprovarArtefato/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE artefato SET validacao = 'Aprovado' WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Artefato aprovado com sucesso!" });
  });
});

app.put("/recusarArtefato/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE artefato SET validacao = 'Recusado' WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "Artefato recusado com sucesso!" });
  });
});

app.get("/validarArtefatos", (req, res) => {
  const sql = "SELECT * FROM artefato WHERE validacao = 'Pendente'";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log("listening");
});
