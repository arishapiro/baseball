# Dugout Coach (app MVP)

One iOS and Android app for Little League coaches that puts two tools behind a home screen:

- **Pitch Path Lab**: `../pitchpathlab/index.html`
- **Batting Lineup**: `../lineupsimulator/index.html`

By Ari Shapiro, PhD · ariyshapiro@gmail.com

The app is a [Capacitor](https://capacitorjs.com) wrapper. The two tool pages stay the single source of truth. When you change either one, rebuild the app and it picks up the change.

## How it fits together

```
app/
  src/index.html        home screen (two tool cards)
  src/app.css           top bar with a Home button, safe-area padding, phone tweaks
  src/app.js            Android back button; Pitch Path Lab diagram scrolls sideways on phones
  scripts/build-www.mjs copies both tools into www/ and adds the top bar to each
  assets/               app icon and splash source images
  capacitor.config.json app id com.arishapiro.dugoutcoach, name "Dugout Coach"
```

`www/`, `android/` and `ios/` are generated, so they aren't committed.

## Android: get an APK without installing anything

The GitHub workflow `.github/workflows/android-apk.yml` builds a debug APK whenever `app/`, `pitchpathlab/` or `lineupsimulator/` changes on `main`. You can also start it by hand from the repo's **Actions** tab (**Android APK → Run workflow**).

1. Open the finished run on GitHub and download **dugout-coach-debug-apk** under **Artifacts**. It arrives as a zip containing `app-debug.apk`.
2. Copy the APK to your Android phone, open it, and allow installing from that source when asked.

A debug APK is for you and your coaches to test. The Play Store needs a signed release build (see below).

## Building on your own computer

You need Node.js 20 or newer. For Android you also need Android Studio; for iOS you need a Mac with Xcode 16 or newer.

```bash
cd app
npm install
npm run build                 # creates www/ from the two tools
npx cap add android           # first time only
npx cap add ios               # first time only, on a Mac
npm run assets                # icons and splash screens from assets/
npm run android               # rebuild, sync, open Android Studio
npm run ios                   # rebuild, sync, open Xcode
```

Then press Run in Android Studio or Xcode to put the app on a connected phone or simulator. For iOS, Xcode asks you to choose a signing team. Your free Apple ID works for running on your own iPhone.

After you edit either tool or the home screen, run `npm run sync` (or `npm run android` / `npm run ios`) again.

## Publishing (later)

- **Google Play**: one-time $25 developer account. In Android Studio, use **Build → Generate Signed App Bundle** and upload the `.aab`.
- **Apple App Store**: $99/year Apple Developer Program. In Xcode, use **Product → Archive**, then upload through the Organizer to App Store Connect and TestFlight.
- Both stores need a privacy policy URL, screenshots and a store description. The app collects no data and makes no network calls, which keeps the privacy answers simple.
- Settle the app name and the app id `com.arishapiro.dugoutcoach` before the first store upload. The id can't be changed after that.
- Apple sometimes rejects apps that are only a website in a wrapper. Both tools run fully offline on the device, which helps. Native touches like saved teams make the case stronger.

## Known MVP limits

- **Lineup data isn't saved.** The lineup simulator forgets the loaded team and results when you leave the page or close the app.
- **Long lineup searches can freeze the screen.** They run on the main thread, so the screen stops responding while they run, and the phone may stop them if the app is sent to the background.
- **Pitch Path Lab's diagram scrolls sideways on a phone.** It opens at the home plate end. Turn the phone sideways to see the whole field.
- **Truncated player names can't be read on touch screens.** The full name is only in a hover tooltip.

## Next steps

Save teams on the device, open GameChanger CSVs shared from email or Files, share a lineup with parents, and run lineup searches in a background worker.
