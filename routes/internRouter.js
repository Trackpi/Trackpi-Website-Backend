const express = require("express");
const upload = require("../middlewares/multer");
const verifyJWT = require("../middlewares/jwtMiddleware")

const router = express.Router();
const internController = require("../controllers/internController");

router.post(
  "/add",verifyJWT,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "Certificate", maxCount: 1 },
  ]),
  internController.addIntern
);

router.get("/internemp", internController.getAllInterns);

router.get("/internemp/:id", internController.getInternById);

router.put(
  "/internemp/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "Certificate", maxCount: 1 },
  ]),
  internController.updateIntern
);

router.delete("/internemp/:id", internController.deleteIntern);

module.exports = router;
