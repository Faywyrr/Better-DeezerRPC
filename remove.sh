#!/usr/bin/sh

APP="/usr/share/deezer"


echo "Restore Asar backup..."

cd "$APP"
cp backup.asar app.asar

echo "Delete Asar backup..."

rm backup.asar

echo "Finish !"
echo "If it didn't work, you should re-try using 'sudo ./remove.sh'"
