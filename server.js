const express = require('express')
const path = require('path')
const {mergePdfs} = require('./merge')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const app = express()
const {emptyFolder} = require('./remove')
app.use('/static', express.static('public'))

const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array("pdfs", 2),async (req, res, next)=>{
let d = await mergePdfs(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path));
res.redirect(`http://localhost:3000/static/${d}.pdf`)
await emptyFolder('./uploads');
setTimeout(()=>{
 emptyFolder('./public');
},2000)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})