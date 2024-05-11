const express = require('express')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')

const SiteRouter = express.Router();
// const app = express()
let sitemap

SiteRouter.get('/', function(req, res) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://barista101.co.za' })
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    smStream.write({ url: 'https://barista101.co.za/',  changefreq: 'yearly', priority: 0.8 })
    smStream.write({ url: 'https://barista101.co.za/About',  changefreq: 'yearly', priority: 0.6 }) 
    smStream.write({ url: 'https://barista101.co.za/Contact',  changefreq: 'yearly', priority: 0.5 })
    

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})
//makes siterouter available to index.js as a middleware function
module.exports = SiteRouter;