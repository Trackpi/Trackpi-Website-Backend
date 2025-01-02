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

router.get("/", internController.getAllInterns);

router.get("/:id", internController.getInternById);

router.put(
  "/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "Certificate", maxCount: 1 },
  ]),
  internController.updateIntern
);

router.delete("/:id", internController.deleteIntern);

module.exports = router;
