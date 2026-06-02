#!/bin/bash
cd /home/ubuntu/Appforsale-deploy
export REACT_APP_API_URL=http://65.1.250.114:8080
npx expo start --web --host lan --port 8081 -c
