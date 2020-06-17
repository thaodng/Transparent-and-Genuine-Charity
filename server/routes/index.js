const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
});


/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true, 
    data: {
      message: 'Everything ok!'
    }
  })
});


router.post('/getUrl', (req, res) => {
  const s3 = new AWS.S3();
  const { name, type } = req.body;
  const S3_BUCKET = process.env.bucketName;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: name,
    Expires: 100,
    ContentType: type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err
      })
    }

    const returnUrl = {
      signedUrl: url,
      imageUrl: `https://${S3_BUCKET}.s3-${process.env.region}.amazonaws.com/${name}`
    };

    res.status(200).json({
      success: true,
      returnUrl
    });
  });
});

module.exports = router;
