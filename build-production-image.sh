
# telaclass content path
TELACLASS_CONTENT_PATH=/Users/filiperocha/pcloud-sync/ufsj/disciplinas/sistemas-supervisórios/material/content-telaclass

# copying the telaclass content to its folder in public path
rsync -avz -h $TELACLASS_CONTENT_PATH/ ./app/public/content-telaclass/

# building the image for amd64 architecture
docker build -t telaclass-i -f Dockerfile.prod .

# for testing the image locally
#docker run -d -p 3000:3000 --name telaclass-container --rm telaclass-i