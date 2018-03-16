# BookSeeker
このプロジェクトはSmartphone App Projectによって始まりました。

開発への参加手順を以下に示します。適宣読みながら参加してください。

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).


## 目次
* [ローカルにクローン](#ローカルにクローン)
* [npm install or yarn install](#npm-install-or-yarn-install)
* [react-native-dotenv](#react-native-dotenv)
* [npm start or yarn start](#npm-start-or-yarn-install)
* [開発する際の制約](#開発する際の制約)

## ローカルにクローン
このコンテンツではみなさんのローカル環境にこのrepoをcloneしていただきます。

`git clone https://github.com/SmartPhoneAppsProject/BookSeeker.git`

SSHを使用している場合は

`git clone git@github.com:SmartPhoneAppsProject/BookSeeker.git`

以上のコマンドをローカル環境のrepoを置きたい層で実行してください。

## npm install or yarn install
このコンテンツではcloneしてきたrepoにライブラリのインストールを行っていただきます。

`npm install` or `yarn install`

以上のコマンドで必要なライブラリをインストールできます。

## react-native-dotenv
このコンテンツではAPIのエンドポイントを環境変数に設定していただきます。

cloneしたrepo内に.envファイルを作成し

`API_ENDPOINT=xxxxx` * xxxxxにはステージングのエンドポイントが入ります。

以上を入力してください。.envの設定はこれで終わりです。

## npm start or yarn start
このコンテンツでは実際にアプリケーションをdevelopment modeで動かしてみましょう。

`npm start` or `yarn start`

以上のコマンドを実行するとQR codeがlogに表示されます。

使っている端末にExpo Client(app store or google playから)をインストールし起動してください。

起動できたらScan QR Codeを立ち上げカメラでlogに表示されているQR Codeを読み込みましょう。

JavaScript Bundleが開始されます。

## 開発する際の制約
このコンテンツに関しては[wiki](https://github.com/SmartPhoneAppsProject/BookSeeker/wiki)に詳しく書いてあります。
参照してください。
