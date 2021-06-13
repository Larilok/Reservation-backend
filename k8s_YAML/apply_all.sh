#!/bin/bash

for i in *.yml
do
  kubectl apply -f "$i"
done