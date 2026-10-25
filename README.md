# Sravan Kumar & Sreelekha

A static wedding invitation. No build step, framework, account, or server is required to view it locally.

## Preview

Open `index.html` in a browser. Keep the other files and the `assets` folder beside it.

VS Code's embedded browser can block recorded audio when opened through `file://`. For a preview with music, run this from Downloads:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory wedding-invitation
```

Open http://127.0.0.1:8765/index.html and tap the opening seal. The song starts with the opening; the music button pauses or resumes it. This preview is local to your Mac, not a public sharing link.

## Publish and Share on WhatsApp

The local file and `127.0.0.1` preview cannot be opened by other people.

1. Open the existing `sravan2720/wedding-invitation` GitHub repository in an incognito browser signed into the personal `sravan2720` account. Do not use work accounts, VS Code sign-in, or stored Git credentials.
2. Upload the contents of the local `wedding-invitation` folder to the repository root, including the complete `assets` folder. Do not nest another `wedding-invitation` folder inside the repository.
3. Commit to the configured Pages publishing branch, normally `main`, and wait for its Pages deployment to finish successfully.
4. Open https://sravan2720.github.io/wedding-invitation/ on a phone using mobile data, then share that public address in WhatsApp. Guests do not need an account or an app.

The Share button includes the website address when hosted publicly. In a local preview, it shares only the wedding details. Updating the same repository keeps the website address unchanged. Publishing makes the invitation, photos, and audio publicly accessible. The social-preview URLs in `index.html` point to this personal GitHub Pages site; update them if the hosting address changes. WhatsApp may cache previous link previews.

## Details

- Groom: Sravan Kumar. Bride: Sreelekha. These roles and the photo assignments were confirmed by the user.
- Groom ceremony: November 19, 2026, 6:52 AM IST.
- Bride ceremony: November 19, 2026, 6:54 AM IST.
- Haldi: November 20, 2026, 10:00 AM IST.
- Mehendi: November 20, 2026, 7:00 PM IST.
- Wedding: November 21, 2026, 7:30 PM IST.
- Wedding venue: Kusuma Satya Convention Hall - 2, Nadakuduru, Kakinada.
- Venues for the other ceremonies were not supplied and are not assumed.

## Reference and Assets

The temple masthead artwork was extracted from the supplied WhatsApp video. The page uses `assets/blessings-enhanced.jpg`: the marked outer edges were trimmed (20px left, 30px right, 16px bottom), preserving the central Sita Rama scene, then the remaining artwork was enlarged 4x with Lanczos resampling and mild sharpening to 1352 by 724 pixels. No generative reconstruction was used; the original 388-by-197 recording crop limits recoverable detail. The unchanged source remains in `assets/blessings.jpg`. The updated design uses peach and blush paper, sage accents, a fine gold frame, and original botanical corner artwork in `assets/botanical-corner.svg`. Peacocks are no longer displayed. Previous border and peacock assets are preserved but unused.

Great Vibes is used for names, Bodoni Moda for headings, and DM Sans for practical details. Their local font files are `great-vibes.ttf`, `bodoni-moda.ttf`, and `dm-sans.ttf` under `assets/`. Their SIL Open Font Licenses are included as `GREAT-VIBES-LICENSE.txt`, `BODONI-LICENSE.txt`, and `DM-SANS-LICENSE.txt`. Icons use Lucide, with its license in `assets/ICON-LICENSE.txt`. All fonts and icons are hosted locally. The old Cormorant font files are retained but unused.

The current background music is the user-provided "Thana Pranale Neevani" recording. `assets/thana-pranale-neevani.mp3` is an unchanged copy of the supplied `Thana-Pranale-Neevani.mp3` download, approximately 2 minutes 3 seconds long. The original download remains untouched. The site plays the local MP3, not a YouTube stream. Obtain any permissions needed before publicly hosting the recording.

The song plays at a gentle volume and starts at 0:04 when the guest taps the seal or Skip opening, skipping the first four seconds. Each repeat also starts at 0:04. The music button pauses or resumes from the current position, without restarting the song. The MP3 file itself is unchanged. Browsers generally require that first interaction before allowing sound; if playback is blocked, the guest can retry with the music button. Music also pauses when they leave the tab or open the engagement film, without automatically restarting afterward. Reduced-motion preferences disable decorative animations. To publish this behavior, upload the updated `index.html`, `invitation.js`, and `opening.js` to the repository root, with `thana-pranale-neevani.mp3` in `assets/`.

The previous, now-unused `assets/traditional-wedding.m4a` and `assets/traditional-wedding.wav` files are preserved. They contain a 54-second excerpt of [Thakil & Nadaswaram during temple Deeparadhana](https://commons.wikimedia.org/wiki/File:Thakil_%26_Nadaswaram_during_temple_Deeparadhana.ogg) by Vis M, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), converted to AAC/WAV with fade-in and fade-out. This attribution applies to those earlier recordings, not to the replacement song.

The couple portraits are enhanced copies of the two supplied WhatsApp photos. Only subtle tone/color correction and light sharpening were applied, without facial reshaping, skin smoothing, generative edits, or changing expressions. The originals in Downloads are untouched. The full 1067-by-1600 framing is preserved in the image files; the invitation displays them in oval frames with a double-gold border, with a full-photo view on selection. Source EXIF/GPS metadata was not copied to the exported JPEGs. Both parent captions use three lines: the S/O or D/O prefix and father's full name, an ampersand, then the mother's name. Obtain permission for the supplied artwork before publishing it publicly.

The celebrations follow a curved, scroll-driven path of original barefoot illustrations in alternating rose and sage. Each ceremony fades in when the footsteps reach its stop and stays visible afterward. On smaller screens, the path runs beside the event details. With reduced motion enabled or JavaScript disabled, all event details remain readable.

## Ganesha Seal Opening

On a fresh page load, the invitation opens with a full-screen sealed-paper design. A small inline startup script shows the static seal and hides the inside before the deferred scripts load, preventing a flash of the invitation. Selecting the Ganesha seal lifts it and swings the two paper panels open in 3D when the opening script is ready. An earlier tap opens the static cover immediately; a late-loading script cannot close it again. `opening.js` uses the locally hosted Three.js 0.160.1 library in `assets/three.min.js`; its MIT license is in `assets/THREE-LICENSE.txt`. The seal displays the user-supplied gold Ganesha artwork surrounded by flowers on a white medallion inside a rose-and-gold Canvas frame. Paper textures are generated locally; no external image service is needed at runtime.

The opening uses `assets/ganesha-floral-enhanced.jpg`, a 1252-by-1226 copy of the supplied floral artwork, enlarged 2x with Lanczos resampling and mild unsharp masking. No generative changes were made; enlargement cannot recover detail absent from the original. The unchanged 626-by-613 source is preserved as `assets/ganesha-floral.jpg`, copied from `WhatsApp Image 2026-10-23 at 22.08.13.jpeg` in Downloads. The complete floral artwork is fitted into a 1024-by-1024 seal texture, and the 3D renderer uses a pixel density between 2 and 3 for sharper presentation. The original download is untouched, and the earlier orange artwork in `assets/ganesha-artwork.jpg` is preserved but unused. Confirm any required reuse permissions before publishing this supplied artwork. The original line drawing remains a fallback while the image loads or if it is unavailable.

The previous, now-unused `assets/ganesha-seal.jpg` is a resized copy of [Dagdusheth Ganpati 02.JPG](https://commons.wikimedia.org/wiki/File:Dagdusheth_Ganpati_02.JPG) by Meghavbafana, licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). It and its attribution in `assets/GANESHA-LICENSE.txt` are preserved. That license applies to the earlier photograph, not to the replacement artwork.

The opening supports keyboard activation, Escape, and a Skip opening button. The underlying invitation is hidden until the opening interaction and inert while the initialized cover is displayed; focus is restored after opening without a box around the name heading. Reduced-motion users skip the animation, devices without WebGL receive a short fade, and the cover stays hidden when JavaScript is unavailable. Losing WebGL before a tap keeps the static seal closed rather than revealing the inside automatically. Rendering resources are released after opening. Music is requested immediately from the opening interaction, before the animation begins, to preserve browser user activation when the music script is available.

## Engagement Film

The Our Engagement Film section follows the venue's View location button and links to the user-provided [Sravan & Sreelekha engagement teaser by Vizagities Photography](https://www.youtube.com/watch?v=RL_vc6218Oc). Its original YouTube thumbnail is hosted locally as `assets/engagement-poster.jpg`. Both the preview and the Watch on YouTube link open the original video in a new tab. The video itself is not downloaded or rehosted, and its original audio is unchanged.

Opening either film link pauses the invitation music. YouTube reported the video unavailable in both standard and privacy-enhanced embedded players during the local preview check, so the section uses direct links instead; these also work without JavaScript. To publish this section, upload the updated HTML, CSS, JavaScript, and the new poster image to their existing locations in the personal repository.

## Editing

Update names and event details in `index.html`. Update the wedding countdown date in `invitation.js` and the downloadable calendar event in `wedding.ics` whenever the wedding date changes. Calendar timestamps are UTC; `20261121T140000Z` is November 21, 2026 at 7:30 PM IST.

## Publish the Latest Design

At the repository root, upload `index.html`, `styles.css`, `invitation.js`, the new `opening.js`, `wedding.ics`, and this README. Upload all files from the local `assets` folder into the repository's `assets` folder, preserving their names. This includes the three new fonts and their licenses, Three.js and its license, `botanical-corner.svg`, `ganesha-floral-enhanced.jpg`, the existing photos and artwork, and `thana-pranale-neevani.mp3`. Keeping older unused assets and their licenses is harmless. Commit to the Pages publishing branch and wait for deployment. These changes have been prepared locally; no GitHub account credentials or publishing actions are performed by the assistant.