const express = require('express');

const appetizerRouter = express.Router();

appetizerRouter.route('/')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the appetizers to you');
})
.post((req, res) => {
    res.end(`Will add the appetizer: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /appetizers');
})
.delete((req, res) => {
    res.end('Deleting all appetizers');
});

appetizerRouter.route('/:appetizerId')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send detils of the appetizer: ${req.params.appetizerId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /appetizers/${req.params.appetizerId}`);
})
.put((req, res) => {
    res.write(`Updating the appetizer: ${req.params.appetizerId}\n`);
    res.end(`Will update the appetizer: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting appetizer: ${req.params.appetizerId}`);
});

module.exports = appetizerRouter;