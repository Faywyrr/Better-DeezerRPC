#!/usr/bin/sh
#Configuration

APP="/usr/share/deezer"
JS="$PWD/app.js"
MODULES="$PWD/node_modules"


#Code

echo Create Asar Backup...

cd "$APP"
cp app.asar backup.asar


echo Extract Asar File...

npx asar extract app.asar temp



echo Copying node modules...
mkdir "$APP/resources"
mkdir "$APP/resources/temp"
mkdir "$APP/resources/temp/node_modules"
cp "$MODULES" "$APP/resources/temp/node_modules/" -r



echo Edit javascript file...

mkdir "$APP/resources/temp/build"
cd "$APP/resources/temp/build"
cat $JS >> renderer.js



echo Pack Asar File...

cd "$APP/resources/"
npx asar pack temp app.asar



echo Delete temp folder...

rm -r "$APP/resources/temp"



echo Finish !
echo "If it didn't work, you should re-try using 'sudo ./install.sh'"
