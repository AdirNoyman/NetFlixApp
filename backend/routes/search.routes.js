import express from "express";
import { searchMovie,searchPerson,searchTv } from "../controllers/search.controllers.js";


const router = express.Router();

router.get('/person', searchPerson);
router.get('/movie', searchMovie);
router.get("/tvshow", searchTv);


export default router;