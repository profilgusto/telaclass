
# telaclass content path
TELACLASS_CONTENT_PATH=/Users/filgusto/pcloud-sync/ufsj/disciplinas/ENM704_sistemas-supervisorios/material/content-telaclass

# copying the telaclass content to its folder in public path
rsync -avz -h $TELACLASS_CONTENT_PATH/ ./app/public/content-telaclass/

# building the image
docker build -t telaclass-i -f Dockerfile.prod .

# running the image
#docker run -d -p 3000:3000 --name telaclass-container telaclass-i