BookSeeker
==========
このアプリケーションはSmartphone App Projectで所持している本を管理するアプリケーションです。

* [Description](#Description)
* [Contribution](#Contribution)
    * [ローカルにクローン](#ローカルにクローン)
    * [npm install or yarn install](#npm-install-or-yarn-install)
    * [react-native-dotenv](#react-native-dotenv)
    * [npm start or yarn start](#npm-start-or-yarn-install)
    * [開発する際の制約](#開発する際の制約)

## Description
このプロジェクトはSmartphone App Projectに所属しているプロジェクトです。

開発への参加手順を以下に示します。

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Demo
<style type="text/css">
     <!-- img {width : 100px; height : 100px;} -->
</style>

<table cellpadding="0" cellspacing="30">
    <tbody>
        <tr>
            <td>
                <img src="https://github.com/SmartPhoneAppsProject/BookSeeker/wiki/images/load.jpg" />
            </td>
            <td>
                <img src="https://github.com/SmartPhoneAppsProject/BookSeeker/wiki/images/list.jpeg" />
            </td>
            <td>
                <img src="https://github.com/SmartPhoneAppsProject/BookSeeker/wiki/images/detail.jpg" />
            </td>
            <td>
                <img src="https://github.com/SmartPhoneAppsProject/BookSeeker/wiki/images/entry.jpg" />
            </td>
        </tr>
    </tbody>
</table>


## Contribution

### ローカルにクローン
このコンテンツではみなさんのローカル環境にこのrepoをcloneしていただきます。

`git clone https://github.com/SmartPhoneAppsProject/BookSeeker.git`

SSHを使用している場合は

`git clone git@github.com:SmartPhoneAppsProject/BookSeeker.git`

以上のコマンドをローカル環境のrepoを置きたい層で実行してください。

### npm install or yarn install
このコンテンツではcloneしてきたrepoにライブラリのインストールを行ってください。

`npm install` or `yarn install`

以上のコマンドで必要なライブラリをインストールできます。

### react-native-dotenv
このコンテンツではAPIのエンドポイントを環境変数に設定してください。

cloneしたrepo内に.envファイルを作成し

`API_ENDPOINT=xxxxx`

以上を入力してください。

### npm start or yarn start
このコンテンツでは実際にアプリケーションをdevelopment modeで動かしてみましょう。

`npm start` or `yarn start`

以上のコマンドを実行するとQR codeがlogに表示されます。

使っている端末にExpo Client(app store or google playから)をインストールし起動してください。

起動できたらScan QR Codeを立ち上げカメラでlogに表示されているQR Codeを読み込みましょう。

JavaScript Bundleが開始されます。

### 開発する際の制約
このコンテンツに関しては[wiki](https://github.com/SmartPhoneAppsProject/BookSeeker/wiki)に詳しく書いてあります。
参照してください。
