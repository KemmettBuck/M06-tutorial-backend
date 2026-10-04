const express = require("express")
var cors = require('cors')
const bodyParser = require('body-parser')
const Song = require("./models/songs")
const app = express()

app.use(cors())
app.use(bodyParser.json())

const router = express.Router()

/**grab songs in a database **/
router.get("/songs", async(req, res) =>{
    let query = {}
    if(req.query.genre){
        query = {genre : req.query.genre}
    }

    try {
        // use await instead of function
        const songs = await Song.find(query)
        res.json(songs)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

router.post("/songs", async(req, res) =>{
    try {
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
    res.status(400).send(err)
    }
})

app.use("/api", router)
app.listen(3000)