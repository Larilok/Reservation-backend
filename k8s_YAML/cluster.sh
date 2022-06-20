#!/bin/bash
gcloud container clusters create rent-private \
--create-subnetwork name=rent-subnet \
--enable-master-authorized-networks \
--enable-ip-alias \
--enable-private-nodes \
--master-ipv4-cidr 172.16.0.0/28 \
--zone us-central1-c \
--enable-intra-node-visibility \
--enable-autoscaling \
--min-nodes=1 \
--max-nodes=3 \
--num-nodes=1 \
--disk-size=10 \
--disk-type=pd-standard \
--machine-type=n1-standard-1