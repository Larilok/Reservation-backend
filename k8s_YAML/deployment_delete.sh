#!/bin/bash

for i in "$@"
do 
  kubectl delete deployment "$i"
done