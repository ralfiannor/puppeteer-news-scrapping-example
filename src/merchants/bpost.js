const puppeteer = require('puppeteer');
const slug = require('slug');

class Bpost {

  async get (category = 'kalsel') {
    const url = `https://banjarmasin.tribunnews.com/${category}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 320, height: 568 });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == 'video') {
        req.abort();
      }
      else {
        req.continue();
      }
    });
    // page.on('console', msg => console.log(msg.text()));
    await page.exposeFunction('slugText', async text => {
      return slug(text);
    });

    await page.exposeFunction('url', () => {
      return url;
    });

    await page.goto(url);

    // manipulate data
    let newsData = await page.evaluate(async() => {
      // get the hotel elements
      let listNews = document.querySelectorAll('li.pos_rel[data-sort]');
      let news = [];
      // console.log(await window.slugText('tes ting pala buntuing'));
      for (let index = 0; index < listNews.length; index++) {
        const element = listNews[index];
        let jsonMapping = {};
        try {
          jsonMapping.name = element.querySelector('h3').innerText;
          jsonMapping.slug = await window.slugText(jsonMapping.name.toLowerCase());
          jsonMapping.category = element.querySelector('h4').innerText;
          jsonMapping.thumbnail = element.querySelector('div.fr > a > img').getAttribute('src');
          jsonMapping.link = element.querySelector('h3 > a').getAttribute('href');
          jsonMapping.textDisplay = element.querySelector('div.grey2').innerText;
          jsonMapping.sourceName = 'bpost';
          jsonMapping.sourceLink = await window.url();
          jsonMapping.postDate = element.querySelector('time.timeago').getAttribute('title');
        }
        catch (e){
          throw new Error(e);
        }
        news.push(jsonMapping);
      };
      return news;
    });

    await page.close();
    await browser.close();
    return newsData;
  }

  async detail (link) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 320, height: 568 });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || req.resourceType() == 'video'){
        req.abort();
      }
      else {
        req.continue();
      }
    });

    await page.goto(link+'?page=all', {
      timeout: 0
    });
    // manipulate data
    let newsData = await page.evaluate(async () => {
      const image = document.querySelector('img.imgfull').getAttribute('src');
      const text = document.querySelector('div.side-article.txt-article').innerText;
      return {
        image,
        text
      };
    });
    await page.close();
    await browser.close();
    return newsData;
  }
}

module.exports = new Bpost;