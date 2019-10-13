const { Router } = require('express');
const router = Router();
const config = require('config');
const ScrapService = require('../services/scrapService.js');

const endpoint = config.api.v1;

// GET
router.get(`/${endpoint}/crawl`, async (req, res) => {
  try {
    const data = await ScrapService.crawlBpost(req.query);
    res.status(200).send(data);  
  }
  catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message
    });
  }
});


module.exports = router;