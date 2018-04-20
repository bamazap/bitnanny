ng build --prod --bh /bitnanny/
scp -r dist/* .htaccess $1@athena.dialup.mit.edu:web_scripts/bitnanny
