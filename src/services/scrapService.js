// actived this to enable mongo
// const NewsModel = require('../models/news');
const { bpost } = require('../merchants');

class ScrapService {

  async crawlBpost() {
    try {
      const getList = await bpost.get();
      return getList;
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async crawl (params) {
    try {
      return;
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async get (params) {
    let option = {};

    if (params.slug) {
      option.slug = params.slug;
    }

    return NewsModel.findOne(option);
  }

  async create (params) {
    return NewsModel.create(params);
  }

}

module.exports = new ScrapService;