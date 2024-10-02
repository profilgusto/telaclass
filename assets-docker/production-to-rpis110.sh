#!/bin/bash

# ==> Parameters
REMOTE_USER=filgusto
REMOTE_IP=192.168.31.110
REMOTE_SSH_PORT=2269

# paths
TELACLASS_LOCAL=/Users/filgusto/git-sources/telaclass/
TELACLASS_REMOTE=/home/filgusto/app-telaclass/

CONTENT_LOCAL=/Users/filgusto/pcloud-sync/ufsj/disciplinas/ENM704_sistemas-supervisorios/material/content-telaclass/
CONTENT_REMOTE=/home/filgusto/app-telaclass/react-app/public/content-telaclass/


# ==> Running the automation

# telaclass folder
rsync -avz -e "ssh -p $REMOTE_SSH_PORT" $TELACLASS_LOCAL $REMOTE_USER@$REMOTE_IP:$TELACLASS_REMOTE

# course content
# rsync -avz /Users/filgusto/pcloud-sync/ufsj/disciplinas/ENM704_sistemas-supervisorios/material/obsidian/content_supervisorios filgusto@rpis110:/home/filgusto/telaclass-main/content-data
rsync -avz -e "ssh -p $REMOTE_SSH_PORT" $CONTENT_LOCAL $REMOTE_USER@$REMOTE_IP:$CONTENT_REMOTE

# REMOVE node_modules
ssh -p $REMOTE_SSH_PORT $REMOTE_USER@$REMOTE_IP "cd $TELACLASS_REMOTE && rm -rf ./react-app/node_modules"
ssh -p $REMOTE_SSH_PORT $REMOTE_USER@$REMOTE_IP "cd $TELACLASS_REMOTE && rm -rf ./react-app/package-lock.json"
ssh -p $REMOTE_SSH_PORT $REMOTE_USER@$REMOTE_IP "cd $TELACLASS_REMOTE && rm -rf ./react-app/build"