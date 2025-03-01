# PowerShell script to copy images to the public/images directory
# Usage: 
# 1. Save the images from the conversation to your local machine
# 2. Run this script and provide the path to the saved images when prompted

$sourceDir = Read-Host -Prompt "Enter the directory where you saved the images"

# Create destination directory if it doesn't exist
$destDir = ".\public\images"
if (-not (Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Copy and rename the images
$imageFiles = Get-ChildItem -Path $sourceDir -Filter "*.png" | Sort-Object Name

if ($imageFiles.Count -lt 3) {
    Write-Host "Error: Found fewer than 3 images in the specified directory." -ForegroundColor Red
    Write-Host "Please make sure you've saved all three badminton court images." -ForegroundColor Red
    exit
}

# Define the target file names
$targetNames = @(
    "Angle 1 MPH.png",
    "Angle 2 MPH.png",
    "Angle 3.png"
)

# Copy the first 3 images with the correct names
for ($i = 0; $i -lt 3; $i++) {
    $destPath = Join-Path -Path $destDir -ChildPath $targetNames[$i]
    
    Copy-Item -Path $imageFiles[$i].FullName -Destination $destPath -Force
    Write-Host "Copied $($imageFiles[$i].Name) to $destPath" -ForegroundColor Green
}

Write-Host "`nImages have been successfully copied to the public/images directory." -ForegroundColor Cyan
Write-Host "You can now run your application to see the gallery." -ForegroundColor Cyan 