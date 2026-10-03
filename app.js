const express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const Song = require("./models/songs")
const app = express()

app.use(cors())
app.use(bodyParser.json())

const router = express.Router()

/**grab songs in a database - apparently Mongoose no longer supports callbacks and requires async and await commands. this is different from the tutorial **/
router.get("/songs", async function(req, res){
    let query = {}
    if(req.query.genre){
        query = {genre : req.query.genre}
    }

    try {
        // use await instead of function
        const songs = await Song.find(query)
        res.json(songs)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.use("/api", router)
app.listen(3000)