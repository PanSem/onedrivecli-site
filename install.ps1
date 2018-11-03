$p = &{python -V} 2>&1
$location = Get-Location

if($p -is [System.Management.Automation.ErrorRecord]){

    Write-Host "Install python" -ForeGround Green
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    choco install python3
    $k = 1
}
else
{
    $b = $p | Select-String -Pattern "3"

    if(-not $b){
      Write-Host "You must have python 3" -ForeGround Red
      $k = 0
    }else{
      Write-Host $p -ForeGround Red
      $k = 1
    }
}

if($k -eq 1){
  New-Item -Path $env:USERPROFILE -Name "onedrivecli" -ItemType "directory" -Force

  $download = New-Object System.Net.WebClient
  $url = "https://drive.google.com/uc?authuser=0&id=11ZELmmNRJCWiAzU2qTbEbs1ixfvDKBvc&export=download"

  Write-Host "Install python libraries" -ForeGround Green
  $file = $env:USERPROFILE + "\onedrivecli" + "\require_lib.py"
  $download.DownloadFile($url, $file)
  Start-Sleep -s 5
  python require_lib.py

  $url = "https://drive.google.com/uc?authuser=0&id=1PJyX0ATmrEZSzTw1WAiV7a0yPU0SXgwh&export=download"

  Write-Host "Download files" -ForeGround Green
  $file = $env:USERPROFILE + "\onedrivecli" + "\p_onedrivecli.py"
  $download.DownloadFile($url, $file)

  $url = "https://drive.google.com/uc?authuser=0&id=1INPQo61QriQymETqgzuctlBvx9yBbw6p&export=download"

  $file = $env:USERPROFILE + "\onedrivecli" + "\onedrivecli.py"
  $download.DownloadFile($url, $file)

  if(Test-Path $PsHome"\Modules") {
    Write-Output ""
  }else{
    New-Item -Path $PsHome -Name "Modules" -ItemType "directory"
  }

  $url = "https://drive.google.com/uc?authuser=0&id=1xyI7msemLmL-M3fyFI7frt5HOAeukfwM&export=download"

  $m = $PsHome + "\Modules"
  New-Item -Path $m -Name "onedrivecli" -ItemType "directory" -Force
  $file = $m + "\onedrivecli\" + "onedrivecli.psm1"
  $download.DownloadFile($url, $file)
}
