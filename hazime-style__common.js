(() => {

  'use strict'

  window.HAZIME_STYLE__SCT = window.HAZIME_STYLE__SCT || {};

  // 関連するアプリ
  HAZIME_STYLE__SCT.apps = {
    memberManagementAppId: XXX,
    sckLogAppId: XXX
  };

  // リンゴゲージの閾値(最大100)
  HAZIME_STYLE__SCT.threshold = 100;

  // 素材のURL
  HAZIME_STYLE__SCT.material = {

    normal: {
      maruwatashiImg: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      akogareiImg: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      chappyGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
    },
    special: {
      nehaIssaiGassaiGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      nehaYoyuuyoneGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      asamiyaKireruImg: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      asamiyaBgGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      yuriAdCtrlSGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      yuriAdEGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      akogareiAdQestionGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      yumeoAdGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      asamiyaAdGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
      congratulateMp: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.mp3',
      congratulateGif: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.gif',
    },
    icon: {
      ringo: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      kitomi: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      sorasido: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      yuri: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      akoga: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      yumeo: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
      asamiya: 'https://dl.dropboxusercontent.com/s/XXXXXXXXXXXXXX/XXX.png',
    }

  };



  //=============================================================================
  // function
  //=============================================================================

  // ***************************************
  // リンゴゲージ、祝福イベント
  // ***************************************

  // ===リンゴゲージ===
  HAZIME_STYLE__SCT.funcRingo = async (recLength, kintoneEvt) => {

    // 要素を追加するスペースを取得し、初期化
    let el;
    if (kintoneEvt === 'index.show') {
      el = kintone.app.getHeaderSpaceElement();
    } else if (kintoneEvt === 'space.portal.show') {
      el = kintone.space.portal.getContentSpaceElement();
    } else {
      el = kintone.app.record.getHeaderMenuSpaceElement();
    }
    el.innerHTML = '';

    // リンゴゲージの出力
    let tag = '';
    for (let i = 0; i < recLength; i++) {
      tag += `<img src="${HAZIME_STYLE__SCT.material.icon.ringo}" width="35px"></img>`;
    }
    el.innerHTML = `<div style="padding:10px">${tag}<p>現在 ${recLength} ringo!___※単位は"リンゴ"です。</p></div>`;

    // ===リンゴゲージが閾値以上のとき->祝福イベント===
    if (recLength >= HAZIME_STYLE__SCT.threshold) {
      el.innerHTML = `<audio type="audio/mpeg" src="${HAZIME_STYLE__SCT.material.special.congratulateMp}" autoplay></audio><div class="hazime-style__firework"></div><div class="hazime-style__firework"></div><div class="hazime-style__firework"></div><div class="hazime-style__firework"></div><div class="hazime-style__firework"></div>`;;
      // ボタンを配置するdiv要素を生成
      const divBtn = document.createElement('div');
      divBtn.style.marginLeft = '50px';
      divBtn.style.marginTop = '50px';

      // ボタンの装飾用のアイコンの生成（きとみちゃん）
      const iconKitomi = document.createElement('img');
      iconKitomi.src = HAZIME_STYLE__SCT.material.icon.kitomi;
      iconKitomi.width = 80;

      // ボタンの装飾用のアイコンの生成（そらしど）
      const iconSorashido = document.createElement('img');
      iconSorashido.src = HAZIME_STYLE__SCT.material.icon.sorasido;
      iconSorashido.width = 80;


      // 修了ボタン生成
      const compButton = new Kuc.Button({
        text: 'ショートカットキートレーニングを修了する',
        type: 'submit'
      });
      compButton.style.padding = '30px';

      // 修了ボタンクリック時の処理
      compButton.addEventListener('click', async () => {

        // メンバー管理アプリからログインユーザーのレコードを取得する        
        const getMemberRecordsBody = {
          'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
          'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
        };

        const getMemberRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getMemberRecordsBody);
        console.log(getMemberRecords.records);

        // メンバー管理アプリのログインユーザーのレコードについて、マウス操作許可フィールドの値を可に変更する
        const putMemberRecordBody = {
          'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
          'id': getMemberRecords.records[0].$id.value,
          'record': {
            'マウス操作許可': { value: '可' }
          }
        }

        const putMemberRecord = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'PUT', putMemberRecordBody);
        console.log(putMemberRecord);

        location.reload();

      });


      // 各要素を追加する
      el.appendChild(divBtn);
      divBtn.appendChild(iconKitomi);
      divBtn.appendChild(compButton);
      divBtn.appendChild(iconSorashido);

      // 祝福の画像を表示させる要素の生成
      const divEventMainImage = document.createElement('div');
      divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.congratulateGif}" class="hazime-style__event_main_image"></img>`;

      el.appendChild(divEventMainImage);

    }

  };


  // ***************************************
  // ショートカットキーの使用ログ取得/登録
  // ***************************************

  // ===ログ取得===
  HAZIME_STYLE__SCT.funcGetLog = async (kintoneEvt) => {

    const getLogRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.sckLogAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    const getLogRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getLogRecordsBody);
    console.log(getLogRecords);

    await HAZIME_STYLE__SCT.funcRingo(getLogRecords.records.length, kintoneEvt);
  };

  // ===ログ登録===
  HAZIME_STYLE__SCT.funcPostLog = async (kintoneEvt, kintoneOpe) => {

    const getLogRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.sckLogAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    const beforGetLogRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getLogRecordsBody);
    console.log(beforGetLogRecords);

    const postLogRecordBody = {
      app: HAZIME_STYLE__SCT.apps.sckLogAppId,
      record: {
        ユーザー: { value: [{ code: kintone.getLoginUser().code }] },
        アプリID: { value: kintone.app.getId() },
        ユーザーCD: { value: kintone.getLoginUser().code },
        イベント: { value: kintoneEvt },
        操作内容: { value: kintoneOpe }
      }
    };

    const postLogRecord = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'POST', postLogRecordBody);
    console.log(postLogRecord);

    if (beforGetLogRecords.records.length < HAZIME_STYLE__SCT.threshold) {

      const getLogRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getLogRecordsBody);
      console.log(getLogRecords);

      await HAZIME_STYLE__SCT.funcRingo(getLogRecords.records.length, kintoneEvt);

    }

  };


  // ***************************************
  // 各種イベント
  // ***************************************

  // ===ノーマルイベント_チャッピー（汎用）===
  HAZIME_STYLE__SCT.chappyAdvice = async (coment) => {

    const dialog = new Kuc.Dialog({
      title: 'このボタンのクリック操作は無効中だよ',
      content: `<div><p class="hazime-style__normal_coment">${coment}</p></div>` +
        `<div><img src="${HAZIME_STYLE__SCT.material.normal.chappyGif}" alt="チャッピー" width="700px"></div>`

    });

    const speak = new SpeechSynthesisUtterance();
    speak.text = `このボタンのクリック操作は無効中だよ！${coment}`;
    speechSynthesis.speak(speak);

    dialog.open();

  };

  // ===ノーマルイベント_亜湖雅（汎用）===
  HAZIME_STYLE__SCT.akogaAdvice = async (coment) => {

    const dialog = new Kuc.Dialog({
      title: '亜湖雅先輩が助けてくれた！',
      content: `<div><p class="hazime-style__normal_coment">${coment}</p></div>` +
        `<div><img src="${HAZIME_STYLE__SCT.material.normal.akogareiImg}" alt="亜湖雅先輩" width="700px"></div>`

    });

    const speak = new SpeechSynthesisUtterance();
    speak.text = `君大丈夫?${coment}`;
    speechSynthesis.speak(speak);

    dialog.open();

  };

  // ===ノーマルイベント_丸渡（汎用）===
  HAZIME_STYLE__SCT.maruwatashiAdvice = async (coment) => {

    const dialog = new Kuc.Dialog({
      title: '丸渡部長に呆れられてしまった。。。',
      content: `<div><p class="hazime-style__normal_coment">${coment}</p></div>` +
        `<div><img src="${HAZIME_STYLE__SCT.material.normal.maruwatashiImg}" alt="丸渡部長" width="700px"></div>`

    });

    const speak = new SpeechSynthesisUtterance();
    speak.text = `君には失望したよ。。。${coment}`;
    speechSynthesis.speak(speak);

    dialog.open();

  };

  // ===スペシャルイベント===
  HAZIME_STYLE__SCT.funcSpecialEvt = async (kintoneEvt, btn) => {

    const divEventMainImage = document.createElement('div');
    divEventMainImage.classList.add('hazime-style__event_main_image');

    let el;
    if (kintoneEvt === 'index.show') {
      el = kintone.app.getHeaderSpaceElement();
    } else if (kintoneEvt === 'space.portal.show') {
      el = kintone.space.portal.getContentSpaceElement();
    } else {
      el = kintone.app.record.getHeaderMenuSpaceElement();
    }
    el.innerHTML = '';

    const divAdBtn = document.createElement('div');
    divAdBtn.id = 'hazime-style__div_btn';
    divAdBtn.style.marginLeft = '50px';
    el.appendChild(divAdBtn);

    const iconAsamiya = document.createElement('img');
    iconAsamiya.src = HAZIME_STYLE__SCT.material.icon.asamiya;
    iconAsamiya.id = 'hazime-style__asamiya_btn'
    iconAsamiya.title = '麻宮さんに聞いてみる'
    iconAsamiya.width = 80;

    const iconYumeo = document.createElement('img');
    iconYumeo.src = HAZIME_STYLE__SCT.material.icon.yumeo;
    iconYumeo.title = 'ゆめお君に聞いてみる';
    iconYumeo.id = 'hazime-style__yumeo_btn'
    iconYumeo.width = 80;

    const iconYuri = document.createElement('img');
    iconYuri.src = HAZIME_STYLE__SCT.material.icon.yuri;
    iconYuri.title = '教えて ゆりちゃん！';
    iconYuri.id = 'hazime-style__yuri_btn';
    iconYuri.width = 80;

    const iconAkoga = document.createElement('img');
    iconAkoga.src = HAZIME_STYLE__SCT.material.icon.akoga;
    iconAkoga.title = 'あっ… あこがれの 亜湖雅麗先輩…！！';
    iconAkoga.id = 'hazime-style__akoga_btn';
    iconAkoga.width = 80;

    // ===お助けイベント_麻宮===
    iconAsamiya.addEventListener('click', async () => {

      divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.asamiyaAdGif}" class="hazime-style__kitomi_friends_image"></img>`;

      const speak = new SpeechSynthesisUtterance();
      speak.text = 'あの、あさみやさん、ちょっとお手伝いしてほしいんですけど！ ギロ  おっかない、おっかなすぎる…とてもじゃないけど聞けないわ';
      speechSynthesis.speak(speak);

    });

    // ===お助けイベント_ゆめお===
    iconYumeo.addEventListener('click', async () => {

      divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.yumeoAdGif}" class="hazime-style__kitomi_friends_image"></img>`;

      const speak = new SpeechSynthesisUtterance();
      speak.text = 'きらめく なぎさは ファンタジー ！！！！どんなゆめよりきみはエトワール ！！！！！！！！！！';
      const speak2 = new SpeechSynthesisUtterance();
      speak2.text = '！！！！！！！！！！この先ゆめおくんといっしょにいてだいじょうぶなのかしら';
      speechSynthesis.speak(speak);
      speechSynthesis.speak(speak2);

    });

    // ===お助けイベント_ゆりちゃん===
    iconYuri.addEventListener('click', async () => {

      if (btn === 'save') {

        divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.yuriAdCtrlSGif}" class="hazime-style__kitomi_friends_image"></img>`;
        const speak = new SpeechSynthesisUtterance();
        speak.text = 'コントロール S で レコードの保存ができるわよ。しごく、とうぜんよ。';
        speechSynthesis.speak(speak);

      } else if (btn === 'edit') {

        divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.yuriAdEGif}" class="hazime-style__kitomi_friends_image"></img>`;
        const speak = new SpeechSynthesisUtterance();
        speak.text = 'E で レコードの編集ができるわよ。しごく、とうぜんよ。';
        speechSynthesis.speak(speak);

      }


    });

    // ===お助けイベント_亜湖雅===
    iconAkoga.addEventListener('click', async () => {

      divEventMainImage.innerHTML = `<img src="${HAZIME_STYLE__SCT.material.special.akogareiAdQestionGif}" class="hazime-style__kitomi_friends_image"></img>`;
      const speak = new SpeechSynthesisUtterance();
      speak.text = 'クエッションキーをおすと、キントーンのショートカットキー一覧を表示させることができる。よおく覚えておきたまえ。';
      speechSynthesis.speak(speak);

    });

    const reloadBtn = new Kuc.Button({
      text: '戻る',
      type: 'normal'
    });

    reloadBtn.style.padding = '30px';


    reloadBtn.addEventListener('click', async () => {

      location.reload();
    });

    divAdBtn.appendChild(iconAsamiya);
    divAdBtn.appendChild(iconYumeo);
    divAdBtn.appendChild(iconYuri);
    divAdBtn.appendChild(iconAkoga);
    divAdBtn.appendChild(reloadBtn);


    let mainHtml = '';
    let speakText = '';
    if (btn === 'save') {
      mainHtml = `<img src="${HAZIME_STYLE__SCT.material.special.nehaYoyuuyoneGif}" class="hazime-style__event_main_image"></img>`
      speakText = '保存ボタンは無効にしてあるわ。あんたはわかいんだから余裕よね。ほほほほ ほほ ほほほ';
    } else {
      mainHtml = `<img src="${HAZIME_STYLE__SCT.material.special.asamiyaBgGif}" class="hazime-style__event_main_image2"></img><img src="${HAZIME_STYLE__SCT.material.special.asamiyaKireruImg}" class="hazime-style__event_main_image"></img>`
      speakText = 'ショートカットキーをなんでつかわねえんだよ';
    }

    divEventMainImage.innerHTML = mainHtml;
    el.appendChild(divEventMainImage);

    const speak = new SpeechSynthesisUtterance();
    speak.text = speakText;
    speechSynthesis.speak(speak);

  };


})();