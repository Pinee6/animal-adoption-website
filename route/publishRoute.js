const express = require('express');
const router = express.Router();

const { createIndividualAnimal, createOrganizationAnimal } = require('./publishController');
const { checkAuth, checkOrganizationAuth } = require('./checkAuth');

router.get('/individual_publish', checkAuth, (req, res) => {
    res.render('individual_publish');
});

router.post('/individual_publish', checkAuth,(req, res) => {
    createIndividualAnimal(req, res);
});

router.get('/organization_publish',checkOrganizationAuth, (req, res) => {
    res.render('organization_publish');
});

router.post('/organization_publish',checkOrganizationAuth,(req, res) => {
    console.log('进入组织发布路由');
    // console.log(req.body);
    createOrganizationAnimal(req, res);
});



module.exports = router;
