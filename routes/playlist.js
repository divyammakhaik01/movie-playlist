const express = require("express");
const router = express.Router();
const PlaylistController = require('../controller/PlaylistController');
const check = require('../middleware/check')
const auth = require('../middleware/auth')

router.post("/playlist/?p_id=p_id & uid = u_id",check , PlaylistController.get_playlist_byID);

router.get("/playlist/:u_id",auth , PlaylistController.get_playlist_byUserID);
router.get("/playlist",auth , PlaylistController.create_playlist);
router.get("/add_movie/p_id",auth , PlaylistController.add_movie);


module.exports = router;