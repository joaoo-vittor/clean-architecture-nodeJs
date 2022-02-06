const express = require('express')
const app = express()

app.listen(5858, () => {
  console.log('Server Running')
  console.log('\nCtrl + Click http://localhost:5858\ns')
})
