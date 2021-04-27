const express = require('express');
const Player = require('../models/players');

const router = express.Router();

let playernames =[];

router.get('/', (req, res) => {
    Player.find().sort({ createdAt: -1 })
      .then((result) => {
        const players = result;
        players.forEach(player => {
          if(!playernames.indexOf(player.name)){
            playernames.push(player.name)
          }
        });
        console.log(playernames);
        res.render('index', { title: 'All players', players});
      })
      .catch((err) => {
          console.log(err);
      })
});

router.post('/', (req, res) => {
  let name = req.body.name;
    console.log(req.body);
    const player = new Player(req.body);
    player.save()
      .then((result) => {
           res.redirect('/');
      })
      .catch((err) => {
          console.log(err);
      })
});

router.put('/', (req, res) => {
    const player = new Player(req.body);
    player.findOneAndUpdate({name: player.name}, {transform_x: player.transform_x, transform_y: player.transform_y, transform_z: player.transform_z})
      .then((result) => {
      })
      .catch((err) => {
          console.log(err);
      })
});


router.get('/create', (req, res) => {
    console.log("create");
    res.render('create', { title: 'Create a new player' });
});

//html演示用
router.get('/:name', (req, res) => {
    const name = req.params.name;
    Player.findOne({name: name})
      .then((result) => {
          console.log(result);
          res.render('detail', { title: 'player Details', player: result});
      })
      .catch((err) => {
          console.log(err);
      })
});

//unity实际用
router.get('/unity/:name', (req, res) => {
  const name = req.params.name;
  Player.findOne({name: name})
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Player.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: '/players' });
      })
      .catch((err) => {
          console.log(err);
      })
});

//unity前后端连接用
router.post('/:name', (req, res) => {
    const name = req.params.name;
    const player = req.body;
    Player.findOneAndUpdate({name: name}, {transform_x: player.transform_x, transform_y: player.transform_y, transform_z: player.transform_z})
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
          console.log(err);
      })
});

//html演示用
router.post('/change/:id', (req, res) => {
  const id = req.params.id;
  const player = req.body;
  console.log(id,player)
  Player.findByIdAndUpdate({_id: id}, player)
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;