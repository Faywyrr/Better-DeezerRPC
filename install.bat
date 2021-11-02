@echo off

:: Configuration

set App=%LocalAppdata%\Programs\deezer-desktop
set js=%cd%\app.js
set node=%cd%\node
set modules=%cd%\node_modules


:: Code

if not exist %App%\resources\backup.asar (
	echo Create Asar Backup...

	xcopy %App%\resources\app.asar %App%\resources\backup.asar* /Y
	cls
)


echo Extract Asar File...

cmd /c %node%\npx asar extract %App%\resources\app.asar %App%\resources\temp\
cls


echo Copying node modules...

xcopy %modules% %App%\resources\temp\node_modules\ /E /Y
cls


echo Edit javascript file...

type %js% >> %App%\resources\temp\build\renderer.js
cls


echo Pack Asar File...

cmd /c %node%\npx asar pack %App%\resources\temp\ %App%\resources\app.asar
cls


echo Delete temp folder...

rmdir /Q /S %App%\resources\temp
cls


echo Finish !

pause