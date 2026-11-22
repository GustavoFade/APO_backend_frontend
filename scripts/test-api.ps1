$ErrorActionPreference = "Continue"
$Base = "http://localhost:3000"
$JsonHeader = "Content-Type: application/json"

function Invoke-CurlComCorpoJson {
    param(
        [string]$Metodo,
        [string]$Url,
        [string]$CorpoJson
    )
    $arquivo = New-TemporaryFile
    try {
        Set-Content -Path $arquivo -Value $CorpoJson -NoNewline -Encoding utf8
        curl.exe -s -X $Metodo $Url -H $JsonHeader -d "@$arquivo"
    } finally {
        Remove-Item $arquivo -ErrorAction SilentlyContinue
    }
}

$bodyCriarAna = @{
    nome     = "Ana"
    email    = "ana@ex.com"
    telefone = "11999999999"
} | ConvertTo-Json -Compress

$bodyAtualizarAna = @{
    nome     = "Ana Silva"
    email    = "ana@ex.com"
    telefone = "11888888888"
} | ConvertTo-Json -Compress

$bodyInvalido = @{
    nome  = ""
    email = ""
} | ConvertTo-Json -Compress

Write-Host "=== GET /clientes (lista inicial) ==="
curl.exe -s "$Base/clientes"
Write-Host ""

Write-Host "=== POST /clientes (criar Ana) ==="
Invoke-CurlComCorpoJson -Metodo POST -Url "$Base/clientes" -CorpoJson $bodyCriarAna
Write-Host ""

Write-Host "=== GET /clientes/1 ==="
curl.exe -s "$Base/clientes/1"
Write-Host ""

Write-Host "=== PUT /clientes/1 ==="
Invoke-CurlComCorpoJson -Metodo PUT -Url "$Base/clientes/1" -CorpoJson $bodyAtualizarAna
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
$arquivoInvalido = New-TemporaryFile
try {
    Set-Content -Path $arquivoInvalido -Value $bodyInvalido -NoNewline -Encoding utf8
    curl.exe -s -X POST "$Base/clientes" -H $JsonHeader -d "@$arquivoInvalido" -w "`nHTTP %{http_code}`n"
} finally {
    Remove-Item $arquivoInvalido -ErrorAction SilentlyContinue
}
Write-Host ""

Write-Host "=== Rota inexistente ==="
curl.exe -s "$Base/rotas-invalidas" -w "`nHTTP %{http_code}`n"