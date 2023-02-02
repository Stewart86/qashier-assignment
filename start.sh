#!/bin/bash

if [[ "$(docker image inspect stewart86/qashier --format='ignored')" != "ignored" ]]
then
  echo "building image.."
  docker build . -t stewart86/qashier
fi
echo "starting nginx server at http://localhost:8000"
echo "to shutdown server press ctrl+c"
docker run  -p 8000:8000 -t stewart86/qashier