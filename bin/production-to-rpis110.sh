#!/bin/bash

# ==> Parameters
REMOTE_USER=filgusto
REMOTE_IP=200.19.137.48
REMOTE_SSH_PORT=2269

# paths
TELACLASS_LOCAL=/Users/filgusto/git-sources/telaclass/
TELACLASS_REMOTE=/home/filgusto/app-telaclass/
TELACLASS_EXCLUDES="--exclude react-app/node_modules --exclude react-app/package-lock.json --exclude react-app/build --exclude react-app/.next --exclude .git --exclude .gitignore --exclude .gitattributes"

CONTENT_LOCAL=/Users/filgusto/pcloud-sync/ufsj/disciplinas/ENM704_sistemas-supervisorios/material/content-telaclass/
CONTENT_REMOTE=/home/filgusto/app-telaclass/react-app/public/content-telaclass/



# ==> Running the automation

# telaclass folder
rsync -avz -h -e "ssh -p $REMOTE_SSH_PORT" $TELACLASS_EXCLUDES $TELACLASS_LOCAL $REMOTE_USER@$REMOTE_IP:$TELACLASS_REMOTE

# course content
rsync -avz -h -e "ssh -p $REMOTE_SSH_PORT" $CONTENT_LOCAL $REMOTE_USER@$REMOTE_IP:$CONTENT_REMOTE
