import express from "express"
import { nanoid } from "nanoid"
import { baseUrl } from "./constants";
import {Urlmodal} from "./schema";


export const router = express.Router()


function isValidURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    const base = baseUrl;
  
    const urlId = nanoid();
    if (isValidURL(origUrl)) {
      try {
        let url = await Urlmodal.findOne({ origUrl });
        if (url) {
          res.json(url);
        } else {
          const shortUrl = `${base}/${urlId}`;
  
          url = new Urlmodal({
            origUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });
  
          await url.save();
          res.json(url);
        }
      } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
      }
    } else {
      res.status(400).json('Invalid Original Url');
    }
  });
  
  router.get('/all', async (req, res) => {
    try {
      const url = await Urlmodal.find({});
      if (url) {
    //  return url;
     res.json(url)
      } else res.status(404).json('Not found');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  });
  router.get('/url/:urlId', async (req, res) => {
    try {
      const url = await Urlmodal.findOne({ urlId: req.params.urlId });
      if (url) {
        url.clicks++;
        url.save();
        return res.json(url);
      } else res.status(404).json('Not found');
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  });

