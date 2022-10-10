rm -r dist/
npm run build && aws s3 cp dist/ s3://kiekkohamsteri-dev-c56dfdd --recursive
