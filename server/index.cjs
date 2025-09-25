const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: "*"
}))

const USERS = []

app.post('/api/forms', (req, res) => {

  if(!req.body) {
    return res.status(400).json({ error: 'No form data provided' })
  }

  // Simulate form submission handling
  const { firstName, lastName, emailAddress, password } = req.body

  // Here you would typically handle the form data, e.g., save it to a database
  console.log('Form submitted:', { firstName, lastName, emailAddress, password })

  USERS.push({
    firstName,
    lastName,
    emailAddress,
    password
  })

  // Respond with a success message
  res.json({ message: 'Form submitted successfully!' })
})

app.get('/api/users', (req, res) => {
  // Respond with the list of users

  res.json(USERS)
})

app.listen(port, () => {
  console.log(`Server is running at 🛫 http://localhost:${port}`)
})