# Solve the smallest problem first

Keep your Android devices and data. Reset/Wipe is a last resort, not the default fix.
For help email **rohan1ttg2001@gmail.com**. No response-time guarantee is promised.

## macOS blocks the app

Read the exact alert. The release is not Apple-notarized. Check the trusted release,
filename and [SHA-256](../SHA256SUMS.txt). For an unverified-app alert, follow the
[app-specific guidance](PRIVACY_AND_SAFETY.md) only if you trust the download.
For a malware or unexplained damage warning, stop and request help. Do not disable
system-wide security. Your annotated [settings image](../assets/guides/open-anyway.png)
shows an example; labels vary by macOS version.

## Installer does not run

Extract the entire download, not just its .command file. Keep support files beside
the app. Stop Android and quit the old dashboard. If the trusted script itself is
blocked, type `bash` and a space in Terminal, drag it in and press Return. A wrong-
architecture error means you need the other Mac ZIP. macOS older than 13 is unsupported.

## Setup or boot stalls

Check at least 20 GB free, internet and the download/Activity status. First setup
downloads the engine and an Android image and first boot can take time. Cancelled
partial downloads can be resumed. Stop any running session before setup/repair.
Try a cold restart, then Automatic or Software graphics if the engine reports a
backend problem. Native virtualization must work on the host. Run the Apple
silicon build on an M-series Mac; do not use Intel Android through Rosetta.

If it repeats, record the exact Activity error. Do not wipe the device as a first step.

## Android feels slow

Stop the session, choose Settings → Mac Fast and try the smaller 540p display.
2 GB is a guest RAM allocation target, with more host memory needed by the engine.
Use Focus/Auto Focus, close heavy apps/other VMs and reduce in-game graphics. Try
Low load if needed. Automatic or Software can help graphics compatibility, but
Software may use more CPU. There is no guarantee of a measured 60 FPS.

## An APK will not install

- **NO_MATCHING_ABIS:** use ARM64/arm64-v8a on Apple silicon, x86_64 on Intel, or a compatible universal APK.
- **MISSING_SPLIT:** collect all pieces from the same split set and use the Pro split installer.
- **Newer Android required:** try an appropriate supported Android version; Android 14 is Pro.
- **DRM, extra game data, store or emulator restrictions:** follow the publisher's requirements. OrbitDroid cannot remove them.
- Free supports individual APK installs. Batch installs are Pro.

## Google Play or network issues

Wait for Android to finish booting, check internet inside it and complete any store
account/terms steps. Check region, Android version and architecture availability.
Some apps exclude emulators. Try restarting Android and record the exact store
error. Ask the store/publisher about account and billing problems; never send
Google or payment passwords to OrbitDroid support.

## License or Pro feature is locked

Paste the complete key issued for this physical Mac. Keep the Mac date/time
accurate. Check the agreed expiry. If the key belongs to another Mac, expired or
still fails, contact Rahul privately. A reissued key may be needed after moving
hardware. Never post a key in a public issue.

Free runs the first Android 11 device. Existing Android 14 and additional devices
are retained but need Pro to start. App source is a separate paid agreement.

## Files or captures seem unavailable

OrbitDroid's dashboard sharing/capture export are Pro features and need a running
selected device. Choose a writable destination. A device selected in the sidebar
may differ from the currently running one. Stop that session before switching.
macOS capture tools and Google's own controls retain their separate capabilities.

## How to uninstall

1. Stop Android and quit OrbitDroid.
2. Remove OrbitDroid.app from your user Applications folder (`~/Applications/`),
   or the location where you manually installed it.
3. Optional: in Finder's Go → Go to Folder, inspect
   `~/Library/Application Support/OrbitDroid/`.
4. Back up first. Deleting that specific folder permanently removes local Android
   devices, apps, accounts, preferences, logs and the stored key. It is not required
   just to update or reinstall the application. Do not delete an unrelated Android SDK.

## A useful support message

Include: Mac chip/model, macOS version, OrbitDroid version, Android version,
what you clicked, the exact error and whether it reproduces after a restart.
Share only redacted relevant logs/screenshots. Remove license keys, account details,
passwords and private file paths. Send Device IDs only privately for license support.
