@echo off
start "Servidor backend" cmd /k "cd C:\Users\tonir\Documentos\git hub\clube-da-luta\backend && nodemon index.js"

timeout /t 2 >nul

start "React frontend" cmd /k "cd C:\Users\tonir\Documentos\git hub\clube-da-luta\clube-da-luta-react && npm start"
