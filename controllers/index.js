// Import the necessary dependencies
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoute");

// Use the homeRoutes for the root path "/"
router.use("/", homeRoutes);

// Use the apiRoutes for the "/api" path
router.use("/api", apiRoutes);

// Export the router
module.exports = router;
