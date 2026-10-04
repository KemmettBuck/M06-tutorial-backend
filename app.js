const express = require("express")
var cors = require('cors')
const Song = require("./models/songs")
const app = express()

app.use(cors())
app.use(express.json())

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

//grab single song in db
router.get("/songs/:id", async (req, res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message })
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

//update is to update existing record/resource/db entry using a put request
router.put("/songs/:id", async(req, res) =>{
    //first need to find and update song the frontend wants us to update
    //to do this we need to request the id of the song from request
    //and then find it in the db and update it
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
            res.status(400).send(err)
        }
})

app.use("/api", router)
app.listen(3000)