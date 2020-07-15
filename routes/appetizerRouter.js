const express = require('express');
const bodyParser = require('body-parser');
const Appetizer = require('../models/appetizer');

const appetizerRouter = express.Router();

appetizerRouter.use(bodyParser.json());

appetizerRouter.route('/')
.get((req, res, next) => {
    Appetizer.find()
    .then(appetizers => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appetizers);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Appetizer.create(req.body)
    .then(appetizer => {
        console.log('Appetizer Created', appetizer);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appetizer);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /appetizers');
})
.delete((req, res, next) => {
    Appetizer.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

appetizerRouter.route('/:appetizerId')
.get((req, res, next) => {
    Appetizer.findById(req.params.appetizerId)
    .then(appetizer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appetizer);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /appetizers/${req.params.appetizerId}`);
})
.put((req, res, next) => {
    Appetizer.findByIdAndUpdate(req.params.appetizerId, {
        $set: req.body
    }, { new: true })
    .then(appetizer => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(appetizer);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Appetizer.findByIdAndDelete(req.params.appetizerId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = appetizerRouter;