const express = require('express');
const bodyParser = require('body-parser');
const RSVP = require('../models/rsvp');

const rsvpRouter = express.Router();

rsvpRouter.use(bodyParser.json());

rsvpRouter.route('/')
.get((req,res, next) => {
    RSVP.find()
    .then(rsvps => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rsvps);
    })
    .catch(err => next(err));})
.post((req, res, next) => {
    RSVP.create(req.body)
    .then(rsvp => {
        console.log('Appetizer Created', rsvp);
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
    RSVP.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

rsvpRouter.route('/:rsvpId')
.get((req, res, next) => {
    RSVP.findById(req.params.rsvpId)
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
    RSVP.findByIdAndUpdate(req.params.rsvpId, {
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
    RSVP.findByIdAndDelete(req.params.rsvpId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = rsvpRouter;