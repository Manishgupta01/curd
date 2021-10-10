const express = require('express')
const router = express.Router()
const database = require('../models/alien')


router.get('/',function(req,res){
        res.sendFile(`C://Users//ManishGuptA//Downloads//NodeCode-master//CrudJS//static//index.html`)
})

//read all record
router.get('/show-all', async function (req,res) {
    try{
           const data = await database.find()
           let table = '<table>'
           for(let d of data){
               table +=  `<tr> <td>name = ${d.name} | </td> <td>technology =  ${d.tech} | </td> <td>subject =  ${d.sub}</td>  <td>${d._id}</td></tr>`
           }
           table = table +  "</table>"
           res.send(table)
    }catch(err){
        res.send('Error ' + err)
    }
})

//read one record
/* router.get('/find/:id', async(req,res) => {
    try{
           const data = await database.findById(req.params.id)
           res.json(data)
    }catch(err){
        res.send('Error ' + err)
    }
}) */


//create 
router.post('/', async(req,res) => {
    const data = new database({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        await data.save() 
        res.redirect('/show-all')
    }catch(err){
        res.send('Error')
    }
})


//update
 router.get('/:id',async(req,res)=> {
    try{
        const data = await database.findById(req.params.id) 
        data.sub = "Default Subject"
        const a1 = await data.save()
        res.redirect('/show-all')
    }catch(err){
        res.send('Error')
    }

})



//delete one
router.get('/delete/:id', async (req,res)=>{
    let id = req.params.id;
  try {
      let del = await database.deleteOne({_id:id})  //
      console.log(del)
      res.redirect('/show-all')
  } catch (error) {
      res.send(error)
  }
})


//delete many
router.get('/delete',async (req, res)=>{
    try {
        await database.deleteMany();
        res.redirect('/show-all')
    } catch (error) {
        res.send(error)
    }
})

module.exports = router