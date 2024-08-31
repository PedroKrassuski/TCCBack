import express from "express";
import sql from 'mssql';
import cors from "cors";
import morgan from "morgan";
import userRouter from './Routes/usuario.js';
//C:\Users\jlpar\OneDrive\Documentos\GitHub\TCC\TCCBack\routes\usuario.js
//import userRouter from "./routes/users";

//const sql = sql();

const app = express();
//const userRouter = require("./routes/users");
//app.use(express.static("public"));
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use("/usuarios", userRouter);

const config = {
    user: 'devtcc',
    password: 'Tcc2024*',
    server: 'devtcc.database.windows.net',
    options: {
      database: 'devtcc',
      encrypt: true
    }
  };

console.log("Starting...");

const executeQuery = async (query) => {
  try {
    // Conecta ao banco de dados
    await sql.connect(config);

    // Executa a consulta
    const result = await sql.query(query);

    // Retorna o resultado da consulta
    return result.recordset;
  } catch (err) {
    // Lida com erros
    console.error('Erro na consulta:', err.message);
    throw err;
  } finally {
    // Fecha a conexão com o banco de dados
    await sql.close();
  }
};

//app.use("/usuarios", userRouter);

function logger(req, res, next) {
  console.log(req);
  next();
};

app.listen(8081, () => {
    console.log("listening");
  });

export { sql, executeQuery};
//export { sql};

//connect();

/*async function connect() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT * FROM [devtcc].[dbo].[Usuario] WHERE id = 3`);
        // var resultSet = await poolConnection.request().query(`INSERT INTO [dbo].[Usuario](nome, matricula, email, senha, telefone, status)
                                                            // VALUES ('joão komarcheuski', 88888888, 'joao.komar@gmail.com', '12345678', '41777774444', 1)`);
        //console.log(`${resultSet.recordset.length} rows returned.`);
        //console.log(resultSet.output);

        // output column headers
        //var columns = "";
       // for (var column in resultSet.recordset.columns) {
       //     columns += column + ", ";
       // }
       // console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
        //    console.log("%s\t%s", row.CategoryName, row.ProductName);
            console.log(row.nome);
        });
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}*/

