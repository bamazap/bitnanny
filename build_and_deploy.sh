ng build --prod --bh /bitnanny/
afplay /System/Library/Sounds/Glass.aiff
scp -r dist/* .htaccess $1@athena.dialup.mit.edu:web_scripts/bitnanny
