const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/travel_website";

main()
    .then(() => {
    console.log("connect to DB");
    })
    .catch((err) => {   
    console.log(err);
    });

    async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj) =>({...obj, owner:"67b0abb306a7b6f8ce7414d1"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();