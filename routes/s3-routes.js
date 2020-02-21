const aws = require("aws-sdk");

aws.config.region = "eu-west-1";

const S3_BUCKET = process.env.S3_BUCKET;


module.exports = function (app) {
  app.get("/new", (req, res) => res.render("new.html"));


  app.get("/sign-s3", (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query["file-name"];
    const fileType = req.query["file-type"];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read"
    };

    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

  /*
     * Respond to POST requests to /submit_form.
     * This function needs to be completed to handle the information in
     * a way that suits your application.
     */
  //app.post("/finish-story", (req, res) => {
  // TODO: Read POSTed form data and do something useful
  //});
};
