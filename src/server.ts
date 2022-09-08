import express from "express"
import Database from "better-sqlite3"
import cors from "cors"

const db= Database(`./db/data.db`,{verbose:console.log})
const app= express()
app.use(cors())
app.use(express.json())

const port = 3003







app.listen(port,()=>{
    console.log(`App running on:http://localhost:${port}`)
})