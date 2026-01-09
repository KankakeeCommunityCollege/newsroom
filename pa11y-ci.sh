#!/usr/bin/env bash

SITEMAP='https://news.kcc.edu/sitemap.xml'

echo "## ===================================== ##"
echo "##   Checking if Pa11y CI is installed.  ##"
echo "## ===================================== ##"
echo ""
if command -v pa11y-ci >/dev/null 2>&1; then
  echo "## ===================================== ##"
  echo "##        Pa11y CI is installed.         ##"
  echo "## ===================================== ##"
else
  echo "## ===================================== ##"
  echo "##      Pa11y CI is not installed.       ##"
  echo "##                ...                    ##"
  echo "##         installing pa11y.             ##"
  echo "## ===================================== ##"
  npm install -g pa11y-ci
fi
echo ""

OUTPUT_ARG_PASSED=false
# SITEMAP_ARG_PASSED=false

while getopts ":os" opt; do
  case $opt in
    o)
      OUTPUT_ARG_PASSED=true
      ;;
    # s)
    #   SITEMAP_ARG_PASSED=true
    #   ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done
shift $((OPTIND-1))

# if $SITEMAP_ARG_PASSED; then
#   echo "## ================================== ##"
#   echo "##       Skipping Jekyll build.       ##"
#   echo "## ================================== ##"
#   echo ""
# else
#   echo "## ================================== ##"
#   echo "##        Running Jekyll build.       ##"
#   echo "## ================================== ##"
#   echo ""
#   bundle exec jekyll build
#   echo ""
# fi

echo "## ================================== ##"
echo "##          Running Pa11y CI          ##"
echo "## ================================== ##"
echo ""

if $OUTPUT_ARG_PASSED; then
  echo ""
  echo "Argument '-o' was passed. Writing Pa11y output to log file."
  echo ""
  # Add commands for when the specific argument is passed
  timestamp=$(date +"%Y-%m-%dT%H:%M:%S")
  filename="pa11y-ci-log.$timestamp.txt"

  echo "##     Pa11y CI results     ##" > $filename
  echo "" >> $filename

  pa11y-ci --sitemap "$SITEMAP" 2>&1 | tee -a $filename
  # Find all HTML files recursively within the _site directory
  # and loop through each file

  # find _site -name "*.html" | while read file; do
  #   echo "Checking accessibility for: $file"
  #   # Run Pa11y on the current HTML file
  #   # --reporter cli outputs results in a human-readable format
  #   # || true prevents the script from exiting immediately if Pa11y finds issues
  #   # pa11y-ci --sitemap "$SITEMAP" 2>&1 | tee -a $filename
  # done
else
  echo ""
  echo "Argument '-o' was missing. Pa11y will output to stdout."
  echo ""

  pa11y-ci --sitemap "$SITEMAP"
  # # Add commands for when the argument is missing
  # # Find all HTML files recursively within the _site directory
  # # and loop through each file
  # find _site -name "*.html" | while read file; do
  #   echo "Checking accessibility for: $file"
  #   # Run Pa11y on the current HTML file
  #   # --reporter cli outputs results in a human-readable format
  #   # || true prevents the script from exiting immediately if Pa11y finds issues
  #   pa11y "$file" --config ./pa11y.dev.json
  # done
fi

echo ""
echo "## ================================== ##"
echo "##               DONE                 ##"
echo "## ================================== ##"
echo ""
