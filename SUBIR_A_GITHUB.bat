@echo off
echo Configurando repositorio para GitHub...

cd /d "%~dp0"

if not exist .git (
    git init
    echo Repositorio inicializado.
) else (
    echo El repositorio ya esta inicializado.
)

git add .
git commit -m "Initial commit: Mision Merito 2026 App"

echo.
echo ========================================================
echo PARA CONTINUAR, NECESITAS CREAR UN REPOSITORIO EN GITHUB
echo ========================================================
echo 1. Ve a https://github.com/new
echo 2. Crea un repositorio llamado: mision-merito-2026
echo 3. Copia el comando que dice:
echo    "git remote add origin https://github.com/TU_USUARIO/mision-merito-2026.git"
echo.
set /p REMOTE_URL="Pega aqui el comando 'git remote add origin...' y presiona ENTER: "

%REMOTE_URL%
git branch -M main
git push -u origin main

echo.
echo Si todo salio bien, tu proyecto esta en GitHub.
echo La pagina estara visible en unos minutos en:
echo https://TU_USUARIO.github.io/mision-merito-2026/
pause
