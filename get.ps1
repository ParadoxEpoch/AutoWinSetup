# Download the latest version of AutoWinSetup and run the start.bat batch file

# Define the URL of the zip file and the temporary directory path
$zipUrl = "https://codeload.github.com/ParadoxEpoch/AutoWinSetup/zip/refs/heads/main"
$tempDir = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
$zipFile = "$tempDir\AutoWinSetup.zip"

# Create a temporary directory to store the downloaded zip file
New-Item -ItemType Directory -Force -Path $tempDir

# Download the zip file
Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile

# Extract the zip file
Expand-Archive -LiteralPath $zipFile -DestinationPath $tempDir

# Find the start.bat path (assuming it's in the root of the extracted folder)
$startBatPath = Get-ChildItem -Path $tempDir -Filter start.bat -Recurse | Select-Object -First 1 -ExpandProperty FullName

# Check if start.bat exists before attempting to run
if (Test-Path $startBatPath) {
    # Change directory to the script's location to ensure any relative paths in the bat file work correctly
    Set-Location -Path (Split-Path $startBatPath)

    # Execute the start.bat batch file
    Start-Process cmd.exe -ArgumentList "/c `"$startBatPath`"" -Wait
} else {
    Write-Host "The start.bat file was not found in the extracted contents."
}

# Cleanup: delete the temporary directory after the batch script has finished running
Remove-Item -Recurse -Force $tempDir

Write-Host "Script completed."