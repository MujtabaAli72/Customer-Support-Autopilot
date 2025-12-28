@echo off
REM This script will clean up the frontend-new directory

REM Navigate to the project directory
cd /d "%~dp0"

REM Remove files and directories that were copied from the frontend directory
rmdir /s /q "frontend-new\node_modules"
rmdir /s /q "frontend-new\public"
rmdir /s /q "frontend-new\src"

echo Cleanup complete! The frontend-new directory has been restored to its original state.
pause
