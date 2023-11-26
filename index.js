const express = require('express') //commonJS module
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(express.static("build"))
let notes = [
    {
        id:1,
        content:"Hello how are you",
        important:true
    },
    {
        id:2,
        content:"I am fine thanks",
        important:true
    }
]
// '/api/notes' route
app.get('/api/notes', (request, response) => {
    console.log(notes);
    response.json(notes)
})
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/notes', bodyParser.json(), (request, response) => {
    const body = request.body
    // console.log('backend object', body)
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
})
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})