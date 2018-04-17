if [ $# -ne 1 ]; then
  echo "usage: "$0" yourkerb"
  exit 1
fi
ng build --prod --bh /$1/www/bitnanny/
scp -r dist/* $1@athena.dialup.mit.edu:www/bitnanny
