npm i react-native-eject --force
npm i @react-native-community/cli --force
npx react-native eject
npm install --force
npm cache clear --force
npx npm-check-updates -u && npm i

cd android
gradlew clean
gradle cleanBuildCache
gradlew build --refresh-dependencies
cd ..
npx react-native start --reset-cache
npx react-native run-android

