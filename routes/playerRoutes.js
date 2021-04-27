const express = require('express');
const Player = require('../models/players');

const router = express.Router();

router.get('/', (req, res) => {
    
    Player.find().sort({ createdAt: -1 })
      .then((result) => {
        const players = result;
        res.render('index', { title: 'All players', players});
      })
      .catch((err) => {
          console.log(err);
      })
});

router.post('/', (req, res) => {
    const player = new Player(req.body);
    player.save()
      .then((result) => {
          console.log(result);
          res.redirect('/');
      })
      .catch((err) => {
          console.log(err);
      })
});

router.get('/create', (req, res) => {
    console.log("create");
    res.render('create', { title: 'Create a new player' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Player.findById(id)
      .then((result) => {
          res.render('detail', { title: 'player Details', player: result});
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

router.post('/:id', (req, res) => {
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