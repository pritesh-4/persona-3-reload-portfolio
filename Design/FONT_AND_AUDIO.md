# Fonts and audio sourcing

## Fonts
GameFontLibrary maintains a Persona 3 Reload font reference page and links to font sources. Treat this as identification research, not automatic permission to bundle the fonts. Check the publisher's font license (web embedding, self-hosting, commercial use, redistribution) before adding a font file to `public/fonts/`.

Reference page: https://www.gamefontlibrary.com/games/persona-3-reload

Practical web fallback choices already used by the sample repo:
- Anton: compressed, high-impact headings.
- Bebas Neue: nav labels, metadata and section codes.
- Montserrat: body copy and longer descriptions.

Use Google Fonts CSS imports only where network policy and licensing allow; for production, self-host properly licensed font files.

## Audio
The game's official website confirms that the Reload soundtrack is an ATLUS Sound Team production and includes 60 tracks. It is not a free-to-use website BGM library. Use an official purchase/streaming provider's permitted embed/link or commission original music. Never include a YouTube-to-MP3 rip, game-file rip or extracted SFX in the public repo.

Official reference: https://asia.sega.com/p3r/en/

Implementation notes:
- Browsers generally prevent audible autoplay until user input; present a clear `SOUND ON/OFF` control.
- Store a local user preference only after consent / interaction.
- Keep sound effects subtle and original: hover tick, confirm snap, transition sweep, back/cancel.
- Provide reduced-motion and audio-off states.
