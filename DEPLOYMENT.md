# Portfolio Deployment

## Free Analytics

This site supports Google Analytics 4 and Microsoft Clarity through Vite environment variables.

1. Create a free Google Analytics 4 web stream and copy the measurement ID, which looks like `G-XXXXXXXXXX`.
2. Create a free Microsoft Clarity project and copy the project ID from the tracking code URL, which looks like `https://www.clarity.ms/tag/PROJECT_ID`.
3. Add these variables before building:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_CLARITY_PROJECT_ID=XXXXXXXXXX
```

Analytics are disabled automatically in Vite dev mode and on local hosts like `localhost`, `127.0.0.1`, and `::1`, even when `.env.local` contains those values. To opt a personal browser out on the live site, visit the site once with `?analytics=off`; the preference is saved in `localStorage`. Visit once with `?analytics=on` to clear the opt-out. Browsers with Do Not Track enabled are also skipped.

For GitHub Pages deployments, the deploy workflow already passes the Clarity project ID into the build.
