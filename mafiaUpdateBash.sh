cd C:/Users/lewis/Documents/GitHub/kolmafia
git checkout origin/main
git pull upstream main
git push origin HEAD:main
git checkout stupidmanny
git pull upstream main
git push
./gradlew shadowJar
cd dist
mv *.jar kolmafia-latest.jar
mv -f kolmafia-latest.jar C:/Users/lewis/Desktop/Mafia