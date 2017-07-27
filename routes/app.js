const express = require('express');
const router = express.Router();
const queries = require('../db/queries.js');

function validWine(wine){
  console.log('checking if valid');
  const validSerial = typeof wine.serial_number == 'string' && wine.serial_number.trim() != '';
  const validVineyard = typeof wine.vineyard == 'string' && wine.vineyard.trim() != '';
  const validOwner = !isNaN(wine.owner_id);
  return validSerial && validVineyard && validOwner;
}

router.get('/', (req, res) => {
  console.log('request sent');
  queries.getAllWines().then(wines=>{
    res.json(wines);
  });
});

router.post('/', (req, res, next) => {
console.log('here');
  if(validWine(req.body)){
    queries
      .createWine(req.body)
      .then(wine => {
      res.json(wine);
    });
    } else{
      console.log('should error');
      next(new Error('Invalid wine creation'));
    }
});

router.get('/:id', (req,res) => {
  queries.getOneWine(req.params.id).then(wine=>{
    res.json(wine);
  });
});

router.put('/:id', (req, res, next) => {
    if(validWine(req.body)){
      //check to see if email is unique
      queries
        .updateWine(req.params.id,req.body)
        .then(wine => {
        res.json(wine);
      });
    } else {
      next(new Error('Invalid wine update'));
    }
});


router.delete('/:id', (req,res) => {
  queries.deleteOneWine(req.params.id).then(wine=>{
    res.json({
    deleted:true
    });
  });
});

module.exports = router;
