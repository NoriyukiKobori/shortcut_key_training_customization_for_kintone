# shortcut_key_training_customization_for_kintone
kintone show+case unlimited 2022 で発表したカスタマイズです。  

# Description
- ショートカットキーを必ず使わないとならない状況をつくる
  - ショートカットキーが割り振られているボタンを無効化する
- ショートカットキーがわからなくても、すぐに確認できるようにする
  - お助け機能をつける
- 楽しい演出を用意する
- ショートカットキーの使用履歴を登録する

# Demo
本カスタマイズのデモ及び、その他詳細ついては、ブログを参照ください。  
 [kintone show+case unlimited 2022 に登壇しました 〜kintone ショートカットキー トレーニング カスタマイズ〜](https://hazime-style.com/?p=2628)

# Requirement
- [kintone UI Component](https://kintone-ui-component.netlify.app/ja/)  を利用しています。

# Usage
- kintone全体のカスマイズに適用させます。
- Dropboxにイベントで使用する素材（画像、音声ファイルなど）アップして、それを参照させるようにします。

# Note
- 本カスタマイズでは、kintoneカスタマイズで非推奨とされている、「スコープ間での変数の共有」や「DOM操作」を行っております。
- 動作最終確認日は2022年11月25日です。今後のkintoneのフロントエンド基盤の刷新にともない、動作しなくなる可能性があります。

# References
- kintone show+case unlimited 2022 では、以下より素材をダウンロードし使用させていただきました。
  - [ポップ☆ステップきとみちゃん](https://kintone.cybozu.co.jp/jp/kitomi/) 
  - [ポップ☆ステップきとみちゃんプレゼンツ たのしくなるなる10Days](https://kintone.cybozu.co.jp/jp/kitomi/10days/) 
  - [ICONE](https://icone.unique-work.com/) 
- コーディングにおいて、以下の記事を参考にさせていただきました。
  - 花火のアニメーションによる演出部分
    - [HTMLとCSSだけで花火をつくる【canvas/JavaScript不使用】（ゆるけー氏）](https://zenn.dev/yurukei20/articles/30f6fb5bbd91e3)
  - スコープ間での変数の共有部分
    - [kintone JavaScript コーディングガイドライン（cybozu developer network）](https://developer.cybozu.io/hc/ja/articles/201793484-kintone-JavaScript-%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%AC%E3%82%A4%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3)
    - [複数jsファイルで共通の変数・定数を使う方法【kintone】（Ribbit's works）](https://ribbit.konomi.app/blog/kintone-global-variable)