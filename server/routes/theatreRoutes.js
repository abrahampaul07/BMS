const router = require("express").Router();
const Theatre = require("../models/theatreModel");
const authMiddleware = require("../middlewares/authMiddleware");

//Create
router.post("/add-theatre", authMiddleware, async (request, response) => {
  try {
    const newTheatre = new Theatre(request.body);
    await newTheatre.save();

    response.status(200).send({
      success: true,
      message: "Theatre added successfully!",
    });
  } catch (err) {
    response.status(500).send({
      success: false,
      message: "Something went wrong. Please, try again in sometime",
    });
  }
});

//Read
router.get(
  "/get-all-theatres-by-owner",
  authMiddleware,
  async (request, response) => {
    try {
      const theatres = await Theatre.find({ owner: request.body.userId });

      response.status(200).send({       
        success: true,
        message: "Theatres fetched successfully!",
        data: theatres,
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: "Something went wrong. Please, try again in sometime",
      });
    }
  }
);

router.get("/get-all-theatres", authMiddleware, async (_, response) => {
  try {
    const theatres = await Theatre.find().populate('owner').select("-password");

    response.status(200).send({
      success: true,
      message: "Theatres fetched successfully!",
      data: theatres,
    });
  } catch (err) {
    response.status(500).send({
      success: false,
      message: "Something went wrong. Please, try again in sometime",
    });
  }
});

//Update
router.put("/update-theatre", authMiddleware, async (request, response) => {
  try {
    await Theatre.findByIdAndUpdate(request.body.theatreId, request.body);
    response.send({
      success: true,
      message: "Theatre updated successfully!",
    });
  } catch (err) {
    response.send(500).send({
      success: false,
      message: err.message,
    });
  }
});

//Delete
router.delete("/delete-theatre", authMiddleware, async (request, response) => {
  try {
    await Theatre.findByIdAndDelete(request.query.theatreId);
    response.send({
      success: true,
      message: "Theatre deleted successfully!",
    });
  } catch (err) {
    response.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
