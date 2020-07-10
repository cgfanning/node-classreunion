const express = require('express');

const locationRouter = express.Router();


locationRouter.route('/')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the locations to you');
})
.post((req, res) => {
    res.end(`Will add the location: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /locations');
})
.delete((req, res) => {
    res.end('Deleting all locations');
});

locationRouter.route('/:locationId')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send detils of the location: ${req.params.locationId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /location/${req.params.locationId}`);
})
.put((req, res) => {
    res.write(`Updating the location: ${req.params.locationId}\n`);
    res.end(`Will update the location: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting location: ${req.params.locationId}`);
});

module.exports = locationRouter;