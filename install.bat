@echo off

:: Configuration

set App=%LocalAppdata%\Programs\deezer-desktop
set js=%cd%\app.js
set modules=%cd%\node_modules


:: Code

echo Create Asar Backup...

cd %App%\resources
xcopy app.asar backup.asar* /Y
cls

echo Extract Asar File...

cmd /c npx asar extract app.asar temp
cls


echo Copying node modules...

xcopy %modules% %App%\resources\temp\node_modules\ /E /Y
cls


echo Edit javascript file...

cd %App%\resources\temp\build
type %js% >> renderer.js
cls


echo Pack Asar File...

cd %App%\resources\
cmd /c npx asar pack temp app.asar
cls


echo Delete temp folder...

rmdir /Q /S %App%\resources\temp
cls


echo Finish !

pause