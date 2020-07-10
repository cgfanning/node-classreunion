const express = require('express');

const rsvpRouter = express.Router();


rsvpRouter.route('/')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send all the RSVPs to you');
})
.post((req, res) => {
    res.end(`Will add the RSVP: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation no supported on /rsvps');
})
.delete((req, res) => {
    res.end('Deleting all RSVPs');
});

rsvpRouter.route('/:rsvpId')
.all((req, res, next) => {
    res.statusMessage = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send detils of the rsvp: ${req.params.rsvpId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /rsvp/${req.params.rsvpId}`);
})
.put((req, res) => {
    res.write(`Updating the RSVP: ${req.params.rsvpId}\n`);
    res.end(`Will update the RSVP: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting RSVP: ${req.params.rsvpId}`);
});

module.exports = rsvpRouter;