import express from 'express';
const router = express.Router();
import {
  getSimilarTv,
  getTrendingTv,
  getTvByCategory,
  getTvDetails,
  getTvTrailers,
} from '../controllers/tv.controllers.js';

router.get('/trending', getTrendingTv);
router.get('/:id/trailers', getTvTrailers);
router.get('/:id/details', getTvDetails);
router.get('/:id/similar', getSimilarTv);
router.get('/:category', getTvByCategory);

export default router;
