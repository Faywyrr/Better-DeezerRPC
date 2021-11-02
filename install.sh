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
mkdir -p "$APP/temp/node_modules"
cp "$MODULES" "$APP/temp/node_modules/" -r



echo Edit javascript file...

mkdir "$APP/temp/build"
cd "$APP/temp/build"
cat $JS >> renderer.js



echo Pack Asar File...

cd "$APP/"
npx asar pack temp app.asar



echo Delete temp folder...

rm -rf "$APP/temp/"



echo Finish !
echo "If it didn't work, you should re-try using 'sudo ./install.sh'"
