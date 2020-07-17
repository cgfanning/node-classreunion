const express = require('express');
const bodyParser = require('body-parser');
const Rsvp = require('../models/rsvp');

const rsvpRouter = express.Router();

rsvpRouter.use(bodyParser.json());

rsvpRouter.route('/')
.get((req,res, next) => {
    Rsvp.find()
    .then(rsvps => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rsvps);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Rsvp.create(req.body)
    .then(rsvp => {
        console.log('RSVP Created', rsvp);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rsvp);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /rsvps');
})
.delete((req, res, next) => {
    Rsvp.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

rsvpRouter.route('/:rsvpId')
.get((req, res, next) => {
    Rsvp.findById(req.params.rsvpId)
    .then(rsvp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rsvp);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /rsvps/${req.params.rsvpId}`);
})
.put((req, res, next) => {
    Rsvp.findByIdAndUpdate(req.params.rsvpId, {
        $set: req.body
    }, { new: true })
    .then(rsvp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rsvp);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Rsvp.findByIdAndDelete(req.params.rsvpId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = rsvpRouter;