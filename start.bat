@echo off

start "Server" cmd /k "cd api && npm i && npm start"
start "Client" cmd /k "cd client && npm i && npm start"