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

- Bride: Sravan Kumar. Groom: Sreelekha. These labels are preserved exactly as supplied; please confirm before publishing.
- Bride ceremony: November 19, 2026, 6:52 AM IST.
- Groom ceremony: November 19, 2026, 6:54 AM IST.
- Haldi: November 20, 2026, 10:00 AM IST.
- Mehendi: November 20, 2026, 7:00 PM IST.
- Wedding: November 21, 2026, 7:30 PM IST.
- Wedding venue: Kusuma Satya Convention Hall - 2, Nadakuduru, Kakinada.
- Venues for the other ceremonies were not supplied and are not assumed.

## Reference and Assets

The background artwork, border, and peacock were extracted from the supplied WhatsApp video. The recording limits their resolution and includes its original watermark. The website closely recreates its traditional appearance, but is not the original template or an exact reconstruction of its animation timing. Original high-resolution artwork and the original font files would be needed for an exact match.

The typeface is the open-source Cormorant Garamond. Its license is in `assets/FONT-LICENSE.txt`. Icons use Lucide, with its license in `assets/ICON-LICENSE.txt`. All fonts and icons are hosted locally.

The music is an actual nadaswaram and thavil recording, replacing the earlier synthesized flute. It uses a 54-second excerpt of [Thakil & Nadaswaram during temple Deeparadhana](https://commons.wikimedia.org/wiki/File:Thakil_%26_Nadaswaram_during_temple_Deeparadhana.ogg) by Vis M, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The excerpt was converted to AAC and given a short fade-in and fade-out. The original recording is South Indian temple instrumental music, not a Telugu vocal song. Attribution is also shown in the invitation footer. Keep this attribution when publishing.

The audio is stored locally as `assets/traditional-wedding.m4a`, with `assets/traditional-wedding.wav` as a fallback for browsers without AAC support, so guests do not need to connect to a separate music service. It loops at a gentle volume, starts only when the guest taps the music button, and pauses when they leave the tab. Reduced-motion preferences disable decorative animations.

No personal photos were supplied, so the couple section uses initials. The video's sample celebrity photographs are not used. Obtain permission for the supplied artwork before publishing it publicly.

The celebrations follow a curved, scroll-driven path of original barefoot illustrations in alternating vermilion and antique gold. Each ceremony fades in when the footsteps reach its stop and stays visible afterward. On smaller screens, the path runs beside the event details. With reduced motion enabled or JavaScript disabled, all event details remain readable.

## Editing

Update names and event details in `index.html`. Update the wedding countdown date in `invitation.js` and the downloadable calendar event in `wedding.ics` whenever the wedding date changes. Calendar timestamps are UTC; `20261121T140000Z` is November 21, 2026 at 7:30 PM IST.