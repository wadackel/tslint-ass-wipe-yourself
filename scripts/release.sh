#!/bin/sh

VERSION=$1

if [$VERSION == ""]; then
  echo ""
  echo "Please specify the version to be released."
  echo "    Example) $ yarn release 0.0.0"
  echo ""
  exit 1
fi

git-chglog --next-tag $VERSION -o CHANGELOG.md
yarn version --no-git-tag-version --new-version $VERSION
git commit -am "release: $VERSION"
git tag $VERSION

echo ""
echo "Please push to origin with the following command 🚀"
echo "    $ git push origin master --tags"
echo ""
