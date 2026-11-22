$ErrorActionPreference = "Continue"
$Base = "http://localhost:3000"

Write-Host "=== GET /clientes (lista inicial) ==="
curl.exe -s "$Base/clientes"
Write-Host ""

Write-Host "=== POST /clientes (criar Ana) ==="
curl.exe -s -X POST "$Base/clientes" -H "Content-Type: application/json" -d '{"nome":"Ana","email":"ana@ex.com","telefone":"11999999999"}'
Write-Host ""

Write-Host "=== GET /clientes/1 ==="
curl.exe -s "$Base/clientes/1"
Write-Host ""

Write-Host "=== PUT /clientes/1 ==="
curl.exe -s -X PUT "$Base/clientes/1" -H "Content-Type: application/json" -d '{"nome":"Ana Silva","email":"ana@ex.com","telefone":"11888888888"}'
Write-Host ""

Write-Host "=== GET /clientes (após alteração) ==="
curl.exe -s "$Base/clientes"
Write-Host ""

Write-Host "=== DELETE /clientes/1 ==="
curl.exe -s -X DELETE "$Base/clientes/1" -w "`nHTTP %{http_code}`n"
Write-Host ""

Write-Host "=== GET /clientes/1 (deve 404) ==="
curl.exe -s "$Base/clientes/1" -w "`nHTTP %{http_code}`n"
Write-Host ""

Write-Host "=== POST inválido (nome/email vazios) ==="
curl.exe -s -X POST "$Base/clientes" -H "Content-Type: application/json" -d '{"nome":"","email":""}' -w "`nHTTP %{http_code}`n"
Write-Host ""

Write-Host "=== Rota inexistente ==="
curl.exe -s "$Base/rotas-invalidas" -w "`nHTTP %{http_code}`n"