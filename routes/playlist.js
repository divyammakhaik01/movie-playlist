const express = require("express");
const router = express.Router();
const PlaylistController = require('../controller/PlaylistController');
const check = require('../middleware/check')

router.post("/playlist/?p_id=p_id & uid = u_id",check , PlaylistController.get_playlist_byID);

router.route("/playlist/:u_id").get(PlaylistController.get_playlist_byUserID);

router.route("/playlist").post(PlaylistController.create_playlist);


module.exports = router;