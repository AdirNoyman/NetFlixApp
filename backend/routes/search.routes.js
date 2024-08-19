import express from "express";
import { searchMovie,searchPerson,searchTv } from "../controllers/search.controllers.js";


const router = express.Router();

router.get('/person/:query', searchPerson);
router.get('/person/:query', searchMovie);
router.get("/tv/:query", searchTv);


export default router;