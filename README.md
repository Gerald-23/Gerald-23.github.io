# Landing Page Lead Funnel

This project contains a Meta ads landing page that:

1. Collects lead details with a form.
2. Sends the form data to a Google Sheet through Google Apps Script.
3. Redirects the visitor to WhatsApp after a successful submission.

## Files

- `index.html` - landing page markup
- `styles.css` - page styling
- `script.js` - form submission and WhatsApp redirect logic
- `google-apps-script/lead-capture.gs` - Apps Script code that writes leads to Google Sheets

## What you need to change

### 1. Connect WhatsApp

Open `script.js` and replace:

- `WHATSAPP_NUMBER` with your WhatsApp Business number in international format without `+`
- `WHATSAPP_MESSAGE` if you want a different opening message

Example:

```js
const WHATSAPP_NUMBER = "233551234567";
```

### 2. Connect the spreadsheet

1. Open Google Sheets and create a new sheet.
2. Go to `Extensions > Apps Script`.
3. Paste the code from `google-apps-script/lead-capture.gs`.
4. Deploy it as a `Web app`.
5. Set access to `Anyone`.
6. Copy the web app URL.
7. Paste that URL into `SCRIPT_URL` inside `script.js`.

## Tracking included

The form also stores:

- current landing page URL
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

That makes it easier to identify which Meta ad or campaign produced each lead.

## Excel note

The leads will be stored in Google Sheets, which can be downloaded as an Excel file (`.xlsx`) at any time.

## GitHub Pages hosting

This project is compatible with GitHub Pages because it is a static site:

- `index.html`
- `styles.css`
- `script.js`

The Google Apps Script endpoint will still work after hosting as long as `SCRIPT_URL` in `script.js` is set to your deployed web app URL.

### Before you publish

Update `script.js`:

```js
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

Your WhatsApp number is already set to:

```js
const WHATSAPP_NUMBER = "233597190189";
```

### Publish steps

1. Create a new GitHub repository.
2. Upload this project to the repository root.
3. In GitHub, open `Settings > Pages`.
4. Under `Build and deployment`, choose:
   - `Source: Deploy from a branch`
   - `Branch: main`
   - `Folder: / (root)`
5. Save.
6. Wait for GitHub Pages to publish the site.

### Your Pages URL

If your repository is a project repo, the site URL will be:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

If you instead create a special user site repository named:

```text
YOUR_GITHUB_USERNAME.github.io
```

then the site URL will be:

```text
https://YOUR_GITHUB_USERNAME.github.io/
```

### Recommendation

For this landing page, a dedicated project repository is usually safer unless you want this to be your main GitHub profile website.
"# Gerald-23.github.io" 
