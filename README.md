# KCC Newsroom

> Jekyll + Webpack + Sass + Autoprefixer + etc...

-----

## Requirements
- rbenv (<http://rbenv.org/>) — use ruby version specified in `.ruby-version` file.
- NVM (<https://github.com/nvm-sh/nvm>) — use node version specified in `.nvmrc` file.

## Installation

```bash
git clone git@github.com:KankakeeCommunityCollege/newsroom.git
cd newsroom
## install gem deps like Jekyll
bundle i
## install npm deps
npm i
```

## Development

***Do not push a development build to Github!***

```bash
npm run development
```

Development build does ***not*** minify HTML, CSS, and JS. It ***does*** create a development JS bundle and injects inline styles into the document head (for performance).

## Production

```bash
npm run production
```

Production build minifies HTML, CSS, and JS.

After development, a production build should be run and the resulting production asset files pushed to Github.
