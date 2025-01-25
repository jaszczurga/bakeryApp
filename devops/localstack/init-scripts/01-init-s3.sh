#!/bin/bash

awslocal s3api create-bucket --bucket photos --region us-east-1
echo "S3 bucket 'photos' created successfully."
