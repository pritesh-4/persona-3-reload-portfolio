$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\HP\Documents\c_programm\Projects\Persona_port\screenshots"
$brainDir = "C:\Users\HP\.gemini\antigravity\brain\09cbefe8-2b9e-4930-b56e-7959481f00ac"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$viewports = @(
    @{ name = "1920x1080"; width = 1920; height = 1080 },
    @{ name = "1600x900";  width = 1600; height = 900 },
    @{ name = "1440x900";  width = 1440; height = 900 },
    @{ name = "1366x768";  width = 1366; height = 768 },
    @{ name = "1280x800";  width = 1280; height = 800 },
    @{ name = "1024x768";  width = 1024; height = 768 },
    @{ name = "768x1024";  width = 768;  height = 1024 },
    @{ name = "390x844";   width = 390;  height = 844 },
    @{ name = "360x800";   width = 360;  height = 800 }
)

$profile = "$env:TEMP\edge_p3r_profile"

foreach ($vp in $viewports) {
    $outFile = Join-Path $outDir "skill-$($vp.name).png"
    $brainFile = Join-Path $brainDir "skill-$($vp.name).png"
    $edgeArgs = @(
        "--headless",
        "--disable-gpu",
        "--user-data-dir=$profile",
        "--window-size=$($vp.width),$($vp.height)",
        "--screenshot=$outFile",
        "http://localhost:5197/tools"
    )
    Write-Host "Capturing $($vp.name)..."
    Start-Process -FilePath $edge -ArgumentList $edgeArgs -Wait
    if (Test-Path $outFile) {
        $size = (Get-Item $outFile).Length
        Write-Host "  [OK] Saved $outFile ($size bytes)"
        Copy-Item -Path $outFile -Destination $brainFile -Force
    } else {
        Write-Host "  [FAIL] Failed $outFile"
    }
}

# Persona page capture
$personaOut = Join-Path $outDir "persona-1440x900.png"
$personaBrain = Join-Path $brainDir "persona-1440x900.png"
$edgeArgs = @(
    "--headless",
    "--disable-gpu",
    "--user-data-dir=$profile",
    "--window-size=1440,900",
    "--screenshot=$personaOut",
    "http://localhost:5197/about"
)
Write-Host "Capturing persona 1440x900..."
Start-Process -FilePath $edge -ArgumentList $edgeArgs -Wait
if (Test-Path $personaOut) {
    $size = (Get-Item $personaOut).Length
    Write-Host "  [OK] Saved $personaOut ($size bytes)"
    Copy-Item -Path $personaOut -Destination $personaBrain -Force
}

Remove-Item -Path $profile -Recurse -Force -ErrorAction SilentlyContinue
