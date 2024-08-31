//mport { connect } from "./server.js";
//import dbModule from '../server.js';
import { executeQuery } from '../server.js';
import express from "express";


const userRouter = express.Router();
//userRouter.use(logger);


userRouter.get('/', async (req, res) => {
    const query = 'SELECT * FROM [dbo].[Usuario]'; // Ajuste a consulta conforme necessário
    try {
      const results = await executeQuery(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

userRouter
  .route("/:id")
  .get( async (req, res) => {
    const query = `SELECT * FROM [dbo].[Usuario] WHERE id = ${req.params.id}`;
    try {
      const results = await executeQuery(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete( async (req, res) => {
    const query = `DELETE FROM [dbo].[Usuario] WHERE id = ${req.params.id}`;
    try {
      const results = await executeQuery(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  
  
  

//  function logger(req, res, next) {
//    console.log(req);
//    next();
//  }

  export default userRouter;