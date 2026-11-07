# Put this README directly on your GitHub repository

This package is made for the **README panel beneath the repository file list**.
It does not need GitHub Pages, a website, hosting, an API key or a build command.
Every included file is intended to be public.

## 1. Extract and upload

1. Extract this ZIP.
2. In your repository, choose **Add file → Upload files**.
3. Upload all extracted files/folders to the repository root, preserving `assets/`
   and `docs/`. `README.md` must be in the root, not inside another wrapper folder.
4. Commit the upload. If replacing the previous package, replace the old README
   and matching public assets/docs. The README renders immediately on the Code tab.

The uploaded ZIP by itself is not a rendered README. Upload its extracted contents.
Git/VS Code also preserves `.github/`, `.vscode/` and `.gitignore` reliably.
In Mac Finder, **⇧⌘.** shows hidden files/folders if you need to select them.

## 2. Add the Mac app downloads separately

Create a GitHub Release tagged **v0.4.0**, initially marked pre-release, and attach:

- `OrbitDroid_Mac_Apple_Silicon.zip`
- `OrbitDroid_Mac_Intel.zip`
- `SHA256SUMS.txt` (included in this package)

The README's repository-relative download links target those filenames and tag.
The two app ZIPs are provided separately. This small documentation package does
not contain emulator binaries or private app source. Do not upload the private
source ZIP, Owner License Manager, signing keys or customer activation data.

## 3. View and edit in VS Code

Open this extracted folder. Open `README.md` and choose **Markdown: Open Preview**
from the Command Palette, or use **⇧⌘V** on Mac / **Ctrl+Shift+V** on Windows/Linux.
Use **Markdown: Open Preview to the Side** to edit and inspect together.
GitHub's spacing and theme can differ slightly from VS Code's preview.

No npm install or web server is needed to view the README. The optional public
package check uses Node.js 18+:

```bash
npm run check
```

The check looks for broken local links/assets, missing guides and known private
file/credential patterns. It does not certify app security. Keep private app
development in a different folder. Edit the `.md` files and replace public media
directly; there are no generated website pages to keep in sync.

## 4. What belongs in this repository?

| Include from this ZIP | Keep outside the public repository |
|---|---|
| README and Markdown guides | Private OrbitDroid app source |
| Public PNG/SVG/WebP images and GIFs | Owner key issuer / License Manager |
| Supplied annotated PDF | Signing private keys, customer keys or Device IDs |
| Current and earlier license notices | `.env`, tokens, developer logs and local user data |
| VS Code settings, public checker and issue template | `node_modules`, app build internals and caches |

If the earlier website package is already uploaded, its `index.html`, website CSS,
browser scripts and `.nojekyll` are not required for this README. Review your
repository before removing any unrelated files. Keep any separate Releases.

[GitHub's official Markdown and image instructions](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
