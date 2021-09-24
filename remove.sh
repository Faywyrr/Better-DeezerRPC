#!/usr/bin/sh

APP="/usr/share/deezer"


//Code

echo "Restore Asar backup..."

cd "$APP/resources"
cp backup.asar app.asar

echo "Delete Asar backup..."

rm backup.asar

echo "Finish !"
echo "If it didn't work, you should re-try using 'sudo ./install.sh'"
