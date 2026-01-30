# KCC Newsroom

> Jekyll + Webpack + Sass + Autoprefixer + etc...

-----

## Requirements
- rbenv (<http://rbenv.org/>) — use ruby version specified in `.ruby-version` file.
- NVM (<https://github.com/nvm-sh/nvm>) — use node version specified in `.nvmrc` file.

-----

<br>

## Installation

```bash
git clone git@github.com:KankakeeCommunityCollege/newsroom.git
cd newsroom
## install gem deps like Jekyll
bundle install
## install npm deps
npm install
```

-----

<br>

## Development

***Do not push a development build to Github!***

```bash
npm run development
```

Development build does ***not*** minify HTML, CSS, and JS. It ***does*** create a development JS bundle and injects inline styles into the document head (for performance).

-----

<br>

## Production

```bash
npm run production
```

Production build minifies HTML, CSS, and JS.

After development, a production build should be run and the resulting production asset files pushed to Github.

-----

<br>

## Accessibility testing with Pa11y

Pa11y is used for automated and manual accessibility testing.

### Automated testing

The GitHub repo uses an action to automatically run pa11y after every commit to the `master` branch. This helps catch
things like missing alt text or other issues introduced by non-technical editors of the site in CloudCannon.

### Manual testing

`pa11y` and `pa11y-ci` are used in the local project files to test for accessibility issues. The `pa11y` script will run
on a local build of the project and test the files in `_site/` for accessibility issues. The `pa11y-ci` script runs using
the live `sitemap.xml` file of the website.

At this time, **the `pa11y-ci` script picks up more issues than the plain `pa11y` script.** The `pa11y` script doesn't seem to render or test all the dynamic content built with JavaScript so `pa11y-ci` will usually give more accurate results. The hope is to get `pa11y` configured better so that JS is rendered and dynamic content tested.

```bash
## Run pa11y on the local build
npm run test:pa11y
## Run pa11y-ci on the live sitemap
npm run test:pa11y-ci
```

Both scripts take the same arguments:

| Argument | Name | Description |
| ---------|------|-------------|
| `-o`     | Output     | Output the results to a log file (`pa11y-log.*.txt` and `pa11y-ci-log.*.txt`) |
| `-s`     | Skip build | Skip doing a Jekyll build prior to running `pa11y` (does not apply to `pa11y-ci`) |

Examples:

```bash
# Pa11y examples:
## Run pa11y and output the results to a log file
npm run test:pa11y -- -o
## Run pa11y, skip the jekyll build, and output the results to a log file
npm run test:pa11y -- -s -o

# Pa11y CI examples:
## Run pa11y-ci and output the results to a log file
npm run test:pa11y-ci -- -o
## This script does the same as passing the `-o` flag to `test:pa11-ci`
npm run test:pa11y-ci-log
```

### `pa11y-ci-sitemap.xml`

Since the sitemap contains PDF files, there is a separate sitemap file for use with `pa11y-ci` that excludes them.
The file `pa11y-ci-sitemap.xml` is used for this purpose. You can run `pa11y-ci` against the standard `sitemap.xml`
file but it will take a lot longer and the resulting PDF errors are not helpful.

### Pa11y CI logs/reporting

When running `npm run test:pa11y-ci -- -o` or `npm run test:pa11y-ci-log`, the log file is created in the `./pa11y-ci-logs/` folder. These logs *should* be committed to GitHub to document our ongoing accessibility testing and results.

**If any errors are found, the log file should be duplicated with the filename suffix `_remediation.txt` and the fix documented there.**

-----

<br>
