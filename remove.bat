@echo off

:: Configuration

set App=%LocalAppdata%\Programs\deezer-desktop


:: Code

echo Restore Asar backup...

cd %App%\resources
xcopy backup.asar app.asar* /Y
cls


echo Delete Asar backup...

del /f backup.asar
cls


echo Finish !
pause