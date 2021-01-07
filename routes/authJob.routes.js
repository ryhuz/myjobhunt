const router = require("express").Router();
const jwtDecode = require("jwt-decode");
const { DateTime } = require("luxon");

const Hunt = require("../models/hunt.model");
const Job = require("../models/job.model");

router.get('/retrieve_all', async (req, res) => {
    let token = jwtDecode(req.headers.token);
    let userID = token.data.ref;

    let hunts = await Hunt.find({ hunter: userID });
    let jobs = await Job.find({ inHuntGroup: { "$in": hunts } });

    return res.status(200).json({ hunts, jobs });
})

router.post('/add_hunt', async (req, res) => {
    let token = jwtDecode(req.headers.token);
    let userID = token.data.ref;

    let { huntTitle, huntDesc, huntExpire } = req.body;

    let newHunt = new Hunt({ hunter: userID, huntTitle, huntDesc });
    await newHunt.save()

    let expiry = DateTime.fromObject(newHunt.huntStart).plus({ months: huntExpire })
    newHunt.huntExpire = new Date(expiry.toJSDate())
    await newHunt.save()

    return res.status(200).json({ newHunt });
})

module.exports = router;