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
git commit -m "Update: Fix deployment workflow"

echo.
echo Verificando conexion remota...
git remote remove origin 2>nul
git remote add origin https://github.com/Gemay1984/mision-merito-2026.git

echo Subiendo cambios a GitHub (Repo: Gemay1984/mision-merito-2026)...
git branch -M main
git push -u origin main

echo.
echo [LISTO] Los cambios se han subido.
echo Ahora ve a GitHub -> Settings -> Pages y asegúrate de que Source sea 'GitHub Actions'.
pause
