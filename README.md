# Sravan Kumar & Sreelekha

A static wedding invitation. No build step, framework, account, or server is required to view it locally.

## Preview

Open `index.html` in a browser. Keep the other files and the `assets` folder beside it.

VS Code's embedded browser can block recorded audio when opened through `file://`. For a preview with music, run this from Downloads:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory wedding-invitation
```

Open http://127.0.0.1:8765/index.html and tap the music button. This preview is local to your Mac, not a public sharing link.

## Publish and Share on WhatsApp

The local file and `127.0.0.1` preview cannot be opened by other people.

1. Sign in at https://app.netlify.com/drop using your own account.
2. Upload the entire `wedding-invitation` folder, not just `index.html`.
3. Netlify will provide an HTTPS website address. Open it on your phone using mobile data to confirm it is public.
4. Share that HTTPS address in WhatsApp. Guests do not need an account or an app.

The Share button includes the website address when hosted publicly. In a local preview, it shares only the wedding details. Updating the files on the same Netlify site keeps the same address. Publishing makes the invitation and its event details publicly accessible to anyone with the link.

## Details

- Groom: Sravan Kumar. Bride: Sreelekha. These roles and the photo assignments were confirmed by the user.
- Bride ceremony: November 19, 2026, 6:54 AM IST.
- Groom ceremony: November 19, 2026, 6:52 AM IST.
- Haldi: November 20, 2026, 10:00 AM IST.
- Mehendi: November 20, 2026, 7:00 PM IST.
- Wedding: November 21, 2026, 7:30 PM IST.
- Wedding venue: Kusuma Satya Convention Hall - 2, Nadakuduru, Kakinada.
- Venues for the other ceremonies were not supplied and are not assumed.

## Reference and Assets

The background artwork, border, and peacock were extracted from the supplied WhatsApp video. The recording limits their resolution and includes its original watermark. The website closely recreates its traditional appearance, but is not the original template or an exact reconstruction of its animation timing. Original high-resolution artwork and the original font files would be needed for an exact match.

The typeface is the open-source Cormorant Garamond. Its license is in `assets/FONT-LICENSE.txt`. Icons use Lucide, with its license in `assets/ICON-LICENSE.txt`. All fonts and icons are hosted locally.

The current background music is the user-provided "Thana Pranale Neevani" recording. `assets/thana-pranale-neevani.mp3` is an unchanged copy of the supplied `Thana-Pranale-Neevani.mp3` download, approximately 2 minutes 3 seconds long. The original download remains untouched. The site plays the local MP3, not a YouTube stream. Obtain any permissions needed before publicly hosting the recording.

The song loops at a gentle volume, starts only when the guest taps the music button, and pauses when they leave the tab or open the engagement film. Reduced-motion preferences disable decorative animations. To publish the music replacement, upload the updated `index.html` and `invitation.js` to the repository root, and `thana-pranale-neevani.mp3` into `assets/`.

The previous, now-unused `assets/traditional-wedding.m4a` and `assets/traditional-wedding.wav` files are preserved. They contain a 54-second excerpt of [Thakil & Nadaswaram during temple Deeparadhana](https://commons.wikimedia.org/wiki/File:Thakil_%26_Nadaswaram_during_temple_Deeparadhana.ogg) by Vis M, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), converted to AAC/WAV with fade-in and fade-out. This attribution applies to those earlier recordings, not to the replacement song.

The couple portraits are enhanced copies of the two supplied WhatsApp photos. Only subtle tone/color correction and light sharpening were applied, without facial reshaping, skin smoothing, generative edits, or changing expressions. The originals in Downloads are untouched. The full 1067-by-1600 framing is preserved in the image files; the invitation displays them in gold arches, with a full-photo view on selection. Source EXIF/GPS metadata was not copied to the exported JPEGs. Obtain permission for the supplied artwork before publishing it publicly.

The celebrations follow a curved, scroll-driven path of original barefoot illustrations in alternating vermilion and antique gold. Each ceremony fades in when the footsteps reach its stop and stays visible afterward. On smaller screens, the path runs beside the event details. With reduced motion enabled or JavaScript disabled, all event details remain readable.

## Engagement Film

The Our Engagement Film section follows the venue's View location button and links to the user-provided [Sravan & Sreelekha engagement teaser by Vizagities Photography](https://www.youtube.com/watch?v=RL_vc6218Oc). Its original YouTube thumbnail is hosted locally as `assets/engagement-poster.jpg`. Both the preview and the Watch on YouTube link open the original video in a new tab. The video itself is not downloaded or rehosted, and its original audio is unchanged.

Opening either film link pauses the invitation music. YouTube reported the video unavailable in both standard and privacy-enhanced embedded players during the local preview check, so the section uses direct links instead; these also work without JavaScript. To publish this section, upload the updated HTML, CSS, JavaScript, and the new poster image to their existing locations in the personal repository.

## Editing

Update names and event details in `index.html`. Update the wedding countdown date in `invitation.js` and the downloadable calendar event in `wedding.ics` whenever the wedding date changes. Calendar timestamps are UTC; `20261121T140000Z` is November 21, 2026 at 7:30 PM IST.

## Publish the Photo Update

Using only the personal `sravan2720` account in the user's incognito browser, replace `index.html`, `styles.css`, and `invitation.js` at the GitHub repository root. Add `sravan-kumar-portrait.jpg` and `sreelekha-portrait.jpg` inside the existing `assets` folder. Keep the other assets in place. Commit to the Pages publishing branch and wait for deployment. These changes have been prepared locally; no GitHub account credentials are used by the assistant.