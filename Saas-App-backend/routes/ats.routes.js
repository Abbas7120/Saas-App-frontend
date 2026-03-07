const express = require("express")
const router = express.Router()

const { analyzeResume } = require("../controllers/ats.controller")

router.post("/analyze-text", analyzeResume)

module.exports = router