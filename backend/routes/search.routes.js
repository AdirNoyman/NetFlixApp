import express from "express";
import { getSearchHistory, removeItemFromSearchHistory, searchMovie,searchPerson,searchTv } from "../controllers/search.controllers.js";


const router = express.Router();

router.get('/person', searchPerson);
router.get('/movie', searchMovie);
router.get("/tvshow", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/remove/:id", removeItemFromSearchHistory);

export default router;