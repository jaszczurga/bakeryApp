


# How does localstack S3 bucket work?

For purpose of storing photos we will use localstack S3 bucket.
All work for bucket creation is done automatically in READy stage by execution init scripts from ./localstack/init-scripts


## How to can you check configuration of S3 bucket?

You can check configuration of S3 bucket by running command:
```bash
 aws --profile localstack --endpoint-url=http://localhost:4566 s3 ls
```

Check images in bucket 
```bash
 aws s3 ls photos --profile localstack --endpoint-url http://localhost:4566
```




remember about creating profile simple by running configure in AWS CLI on you local machine

For more information go to https://docs.localstack.cloud/references/init-hooks/
or https://medium.com/@pradeeptiwari.bhumca10/uploading-an-image-to-s3-using-localstack-831efe9e7c78