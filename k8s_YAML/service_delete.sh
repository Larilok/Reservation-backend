#!/bin/bash

for i in "$@"
do 
  kubectl delete service "$i"
done