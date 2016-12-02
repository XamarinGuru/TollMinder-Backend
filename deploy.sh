#!/usr/bin/env bash
cd dist
mkdir Uploads
chmod 0777 Uploads
tar -zcvf ./../dist.tar.gz * ./../node_modules ./../Documentation
cd ..
scp -i ./deployKey.pem dist.tar.gz ubuntu@54.152.103.212:/home/ubuntu
ssh -i ./deployKey.pem ubuntu@54.152.103.212 "\
mkdir -p backend && \
cd backend && \
tar -xzvf ./../dist.tar.gz && \
cd .. && \
rm -f dist.tar.gz && \
exit"
rm -f dist.tar.gz
