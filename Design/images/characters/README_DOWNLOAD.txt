The official character image files are NOT bundled in this ZIP because the file-transfer runtime cannot reach SEGA's image CDN. To populate this folder:

Windows: run ..\..\tools\download-official-art.ps1 in PowerShell.
Node:    node ..\..\tools\download-official-art.mjs

Both scripts attempt to fetch the ten official character promotional images listed in assets/manifest.json and one wide promotional key art image into ../backgrounds.

IMPORTANT: source availability does not equal permission to re-host, crop, modify, or publicly display Atlus/SEGA artwork. Confirm your intended portfolio use with the rights holder first.
