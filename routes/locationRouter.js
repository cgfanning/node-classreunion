const express = require('express');
const bodyParser = require('body-parser');
const Location = require('../models/location');

const locationRouter = express.Router();

locationRouter.use(bodyParser.json());

locationRouter.route('/')
.get((req, res, next) => {
    Location.find()
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    Location.create(req.body)
    .then(location => {
        console.log('Location Created', location);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /locations');
})
.delete((req, res, next) => {
    Location.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

locationRouter.route('/:locationId')
.get((req, res, next) => {
    Location.findById(req.params.locationId)
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /location/${req.params.locationId}`);
})
.put((req, res, next) => {
    Location.findByIdAndUpdate(req.params.locationId, {
        $set: req.body
    }, { new: true })
    .then(location => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Location.findByIdAndDelete(req.params.locationId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = locationRouter;