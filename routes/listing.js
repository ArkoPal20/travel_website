const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingConroller = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index and Create Route
router.route("/")
.get(wrapAsync(listingConroller.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync(listingConroller.createListing));

//new route
router.get("/new",isLoggedIn, listingConroller.renderNewForm);

//Show, Edit and Delete Route
router.route("/:id")
.get(wrapAsync(listingConroller.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingConroller.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingConroller.destroyListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingConroller.renderEditForm));

module.exports=router;