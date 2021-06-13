#!/bin/bash

LOAD_BALANCERS=('api-gateway' 'db')
DEPLOYMENTS=('api-gateway' 'auth' 'posts' 'users')

for i in "${LOAD_BALANCERS[@]}"
do 
  kubectl delete service "$i"
done

for i in "${DEPLOYMENTS[@]}"
do 
  kubectl delete deployment "$i"
done
