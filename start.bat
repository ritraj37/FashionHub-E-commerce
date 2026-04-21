@echo off
echo Starting FashionHub E-commerce Server...
echo.
cd backend
echo Installing dependencies...
call npm install
echo.
echo Initializing database...
call node utils/initDatabase.js
echo.
echo Starting server on http://localhost:3001
echo Press Ctrl+C to stop the server
echo.
node server.js