@echo off
title Daily Brief Database Sync
cd /d "%~dp0"

REM Run our Node.js bridge script to handle the pipeline safely
node build_dashboard.js

echo.
pause