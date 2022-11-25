(() => {

  'use strict'

  // ---------------------------------------------
  // EVENT:create.show
  // ---------------------------------------------  
  kintone.events.on('app.record.create.show', async event => {

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getMemberRecordsBody);
    console.log(getMemberRecords.records);

    // 取得したレコードのマウス操作許可フィールドの値が'可'のときはリターン
    if (getMemberRecords.records[0].マウス操作許可.value === '可') {
      return event;
    }

    // ショートカットキー_logアプリからログインユーザーのレコードを取得し、リンゴゲージを表示する
    await HAZIME_STYLE__SCT.funcGetLog('create.show');

    // ***************************************
    // クリック操作の無効化とイベント発火
    // ***************************************

    const elmDiv = document.getElementsByClassName('gaia-argoui-app-edit-buttons')[0];

    // 補足2022年11月20日時点では、レコードの追加画面にでキャンセルのショートカットキーは設定されていなかったのでこの部分はコメントアウト
    // // ===キャンセル===
    // // キャンセルボタンを非表示にして、ダミーのキャンセルボタンを代わりに表示させる
    // const elmRecordCancel = document.getElementsByClassName('gaia-ui-actionmenu-cancel');
    // elmRecordCancel[0].style.display = 'none';

    // const dummyCancel = document.createElement('button');
    // dummyCancel.type = 'button';
    // dummyCancel.className = 'gaia-ui-actionmenu-cancel';
    // dummyCancel.style = 'user-select: none';
    // dummyCancel.textContent = 'キャンセル';
    // elmDiv.appendChild(dummyCancel);
    // console.log(elmRecordCancel);

    // dummyCancel.addEventListener('click', () => {
    //   HAZIME_STYLE__SCT.chappyAdvice('キャンセルは ESC をおしてみて！');
    // });

    // ===保存===
    // 保存ボタンを非表示にして、ダミーの保存ボタンを代わりに表示させる
    const elmRecordSave = document.getElementsByClassName('gaia-ui-actionmenu-save');
    elmRecordSave[0].style.display = 'none';

    const dummySave = document.createElement('button');
    dummySave.type = 'button';
    dummySave.className = 'gaia-ui-actionmenu-save';
    dummySave.style = 'user-select: none';
    dummySave.textContent = '保存';
    elmDiv.appendChild(dummySave);
    console.log(elmRecordSave);

    dummySave.addEventListener('click', () => {
      HAZIME_STYLE__SCT.funcSpecialEvt('create.show', 'save');
    });


    // *****ショートカットキーの一覧**************
    // / : 検索キーワードを入力する
    // ? : このウインドウの表示/非表示を切り換える
    // Ctrl+s : 保存する
    // ***************************************

    // ショートカットキーを使用した際の処理
    window.document.onkeydown = (evt) => {
      const acvTagName = document.activeElement.tagName;
      console.log(acvTagName);
      console.log(evt.code);

      const kintoneEvt = 'create.show';

      // ショートカットキーを使用したらログを登録する
      if (evt.ctrlKey === true && evt.code === 'KeyS') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'Ctrl+s : 変更を保存する'); return; }

      // インプット状態のフィールドがアクティブのときはreturn
      if (acvTagName === 'INPUT') { return; }

      // if (evt.code === 'Escape') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'esc : 編集をキャンセルする'); return; }
      if (evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '/ : 検索キーワードを入力する'); return; }
      if (evt.shiftKey === true && evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '? : このウインドウの表示／非表示を切り替える'); return; }

    }

  });

  // ---------------------------------------------
  // EVENT:edit.show
  // ---------------------------------------------  
  kintone.events.on('app.record.edit.show', async event => {

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getMemberRecordsBody);
    console.log(getMemberRecords.records);

    // 取得したレコードのマウス操作許可フィールドの値が'可'のときはリターン
    if (getMemberRecords.records[0].マウス操作許可.value === '可') {
      return event;
    }

    // ショートカットキー_logアプリからログインユーザーのレコードを取得し、リンゴゲージを表示する
    await HAZIME_STYLE__SCT.funcGetLog('edit.show');

    // ***************************************
    // クリック操作の無効化とイベント発火
    // ***************************************

    const elmDiv = document.getElementsByClassName('gaia-argoui-app-edit-buttons')[0];

    // ===キャンセル===
    // キャンセルボタンを非表示にして、ダミーのキャンセルボタンを代わりに表示させる
    const elmRecordCancel = document.getElementsByClassName('gaia-ui-actionmenu-cancel');
    elmRecordCancel[0].style.display = 'none';

    const dummyCancel = document.createElement('button');
    dummyCancel.type = 'button';
    dummyCancel.className = 'gaia-ui-actionmenu-cancel';
    dummyCancel.style = 'user-select: none';
    dummyCancel.textContent = 'キャンセル';
    elmDiv.appendChild(dummyCancel);
    console.log(elmRecordCancel);

    dummyCancel.addEventListener('click', () => {
      HAZIME_STYLE__SCT.chappyAdvice('キャンセルは ESC をおしてみて！');
    });

    // ===保存===
    // 保存ボタンを非表示にして、ダミーの保存ボタンを代わりに表示させる
    const elmRecordSave = document.getElementsByClassName('gaia-ui-actionmenu-save');
    elmRecordSave[0].style.display = 'none';

    const dummySave = document.createElement('button');
    dummySave.type = 'button';
    dummySave.className = 'gaia-ui-actionmenu-save';
    dummySave.style = 'user-select: none';
    dummySave.textContent = '保存';
    elmDiv.appendChild(dummySave);
    console.log(elmRecordSave);

    dummySave.addEventListener('click', () => {
      HAZIME_STYLE__SCT.funcSpecialEvt('edit.show', 'save');
    });


    // *****ショートカットキーの一覧**************
    // / : 検索キーワードを入力する
    // esc : 編集をキャンセルする
    // ? : このウインドウの表示/非表示を切り換える
    // c : レコードを追加する
    // e : 選択したレコードを編集する
    // g a : レコード一覧に戻る
    // g i : 絞り込み結果に戻る
    // j : 次のレコードを選択する
    // k : 前のレコードを選択する
    // Ctrl+s : 変更を保存する
    // ***************************************

    // ショートカットキーを使用した際の処理
    window.document.onkeydown = (evt) => {

      const acvTagName = document.activeElement.tagName;
      console.log(acvTagName);
      console.log(evt.code);

      let kintoneEvt = 'edit.show';

      // ショートカットキーを使用したらログを登録する
      if (evt.ctrlKey === true && evt.code === 'KeyS') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'Ctrl+s : 変更を保存する'); return; }

      // インプット状態のフィールドがアクティブのときはreturn
      if (acvTagName === 'INPUT') { return; }

      if (evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '/ : 検索キーワードを入力する'); return; }
      if (evt.code === 'Escape') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'esc : 編集をキャンセルする'); return; }

      if (evt.shiftKey === true && evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '? : このウインドウの表示／非表示を切り替える'); return; }
      if (evt.code === 'KeyC') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'c : レコードを追加する'); return; }
      if (evt.code === 'KeyE') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'e : 選択したレコードを編集する'); return; }
      if (evt.code === 'KeyJ') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'j : 次のレコードを選択する'); return; }
      if (evt.code === 'KeyK') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'k : 前のレコードを選択する'); return; }

      if (evt.code === 'KeyG') {
        window.document.onkeydown = (afterEvt) => {
          if (afterEvt.code === 'KeyA') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'g a : レコード一覧に戻る'); return; }
          if (afterEvt.code === 'KeyI') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'g i : 絞り込み結果に戻る'); return; }
        }
      }

    }

  });



  // ---------------------------------------------
  // EVENT:detail.show
  // ---------------------------------------------
  kintone.events.on('app.record.detail.show', async event => {

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getMemberRecordsBody);
    console.log(getMemberRecords.records);

    // 取得したレコードのマウス操作許可フィールドの値が'可'のときはリターン
    if (getMemberRecords.records[0].マウス操作許可.value === '可') {
      return event;
    }

    // ショートカットキー_logアプリからログインユーザーのレコードを取得し、リンゴゲージを表示する
    await HAZIME_STYLE__SCT.funcGetLog('detail.show');

    // ***************************************
    // クリック操作の無効化とイベント発火
    // ***************************************

    // ツールバーメニューのdiv要素取得
    const elmDivToolbar = document.getElementsByClassName('gaia-argoui-app-toolbar-menu')[0];
    // ページャーのdiv要素取得
    const elmDivPager = document.getElementsByClassName('gaia-argoui-app-pager')[0];


    // ===前のレコードに移動する===
    // prevボタンを非表示にして、ダミーのprevボタンを代わりに表示させる
    const elmPrev = document.getElementsByClassName('gaia-argoui-app-pager-prev')[0];
    const elmDummyPrev = document.getElementById('dummy_prev');
    console.log(elmPrev);

    if (!elmDummyPrev) {
      const dummyPrev = document.createElement('button');

      elmPrev.style.display = 'none';

      dummyPrev.className = 'gaia-argoui-app-pager-prev';
      dummyPrev.title = '前のレコードに移動する';
      dummyPrev.ariaLevel = '前のレコードに移動する'
      dummyPrev.type = 'button';
      dummyPrev.style = 'user-select: none';
      dummyPrev.id = 'dummy_prev';
      elmDivPager.insertBefore(dummyPrev, elmPrev);

      dummyPrev.addEventListener('click', () => {

        HAZIME_STYLE__SCT.chappyAdvice('K で次のレコードに移動できるよ！！');

      });

    }

    // ===次のレコードに移動する===
    // nextボタンを非表示にして、ダミーのnextボタンを代わりに表示させる
    const elmNext = document.getElementsByClassName('gaia-argoui-app-pager-next')[0];
    const elmDummyNext = document.getElementById('dummy_next');
    console.log(elmNext);

    if (!elmDummyNext) {

      elmNext.style.display = 'none';

      const dummyNext = document.createElement('button');
      dummyNext.className = 'gaia-argoui-app-pager-next';
      dummyNext.title = '次のレコードに移動する';
      dummyNext.ariaLevel = '次のレコードに移動する'
      dummyNext.type = 'button';
      dummyNext.style = 'user-select: none';
      dummyNext.id = 'dummy_next'
      elmDivPager.insertBefore(dummyNext, elmPrev);

      dummyNext.addEventListener('click', () => {

        HAZIME_STYLE__SCT.chappyAdvice('J で次のレコードに移動できるよ！！');

      });

    }


    // ===レコードの追加===
    // 追加ボタンのhref属性を削除して無効化させる
    const elmCreate = document.getElementsByClassName('gaia-argoui-app-menu-add')[0];

    elmCreate.addEventListener('click', () => {
      elmCreate.removeAttribute('href');
      HAZIME_STYLE__SCT.chappyAdvice('C で次のレコードの追加ができるよ！！');
    });


    // ===レコードの編集===
    // 編集ボタンを非表示にして、ダミーの編集ボタンを代わりに表示させる
    const elmEdit = document.getElementsByClassName('gaia-argoui-app-menu-edit')[0];
    elmEdit.style.display = 'none';

    const dummyEdit = document.createElement('a');
    dummyEdit.role = 'menuitem';
    dummyEdit.tabIndex = 0;
    dummyEdit.className = 'gaia-argoui-app-menu-edit gaia-argoui-app-menu';
    dummyEdit.style = 'user-select: none';
    dummyEdit.title = 'レコードを編集する';
    elmDivToolbar.insertBefore(dummyEdit, elmEdit);

    dummyEdit.addEventListener('click', () => {
      HAZIME_STYLE__SCT.funcSpecialEvt('create.show', 'edit');
    });


    // *****ショートカットキーの一覧**************
    // / : 検索キーワードを入力する
    // ? : このウインドウの表示/非表示を切り換える
    // c : レコードを追加する
    // e : 選択したレコードを編集する
    // g a : レコード一覧に戻る
    // g i : 絞り込み結果に戻る
    // j : 次のレコードを選択する
    // k : 前のレコードを選択する
    // // Ctrl+s : 変更を保存する //
    // ***************************************


    window.document.onkeydown = (evt) => {

      const acvTagName = document.activeElement.tagName;
      console.log(acvTagName);
      console.log(evt.code);

      let kintoneEvt = 'detail.show';

      // インプット状態のフィールドがアクティブのときはreturn
      if (acvTagName === 'INPUT') { return; }

      if (evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '/ : 検索キーワードを入力する'); return; }
      if (evt.shiftKey === true && evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '? : このウインドウの表示／非表示を切り替える'); return; }
      if (evt.code === 'KeyC') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'c : レコードを追加する'); return; }
      if (evt.code === 'KeyE') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'e : 選択したレコードを編集する'); return; }
      if (evt.code === 'KeyJ') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'j : 次のレコードを選択する'); return; }
      if (evt.code === 'KeyK') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'k : 前のレコードを選択する'); return; }

      if (evt.code === 'KeyG') {
        window.document.onkeydown = (afterEvt) => {
          if (afterEvt.code === 'KeyA') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'g a : レコード一覧に戻る'); return; }
          if (afterEvt.code === 'KeyI') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'g i : 絞り込み結果に戻る'); return; }
        }
      }

    }

  });


  // ---------------------------------------------
  // EVENT:index.show
  // ---------------------------------------------
  kintone.events.on('app.record.index.show', async event => {

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecordsBody = {
      'app': HAZIME_STYLE__SCT.apps.memberManagementAppId,
      'query': 'ユーザーCD="' + kintone.getLoginUser().code + '"'
    };

    // メンバー管理アプリからログインユーザーのレコードを取得する
    const getMemberRecords = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', getMemberRecordsBody);
    console.log(getMemberRecords.records);

    // 取得したレコードのマウス操作許可フィールドの値が'可'のときはリターン
    if (getMemberRecords.records[0].マウス操作許可.value === '可') {
      return event;
    }

    // ショートカットキー_logアプリからログインユーザーのレコードを取得し、リンゴゲージを表示する
    await HAZIME_STYLE__SCT.funcGetLog('index.show');


    // ***************************************
    // クリック操作の無効化とイベント発火
    // ***************************************

    // ===レコードの詳細===
    // レコードの詳細ボタンのhref属性を削除して無効化させる
    const elmRecordShow = document.getElementsByClassName('recordlist-show-gaia');
    console.log(elmRecordShow);
    if (elmRecordShow.length > 0) {
      for (let i = 0; i < elmRecordShow.length; i++) {
        console.log(elmRecordShow[i]);
        elmRecordShow[i].addEventListener('click', () => {
          elmRecordShow[i].removeAttribute('href');
          HAZIME_STYLE__SCT.chappyAdvice('jかkキーで対象のレコード行を選択してからoキーを押してみて！');
        });
      }
    }

    // ===レコードの追加===
    // レコードの追加ボタンのhref属性を削除して無効化させる
    const elmAddRecord = document.getElementsByClassName('gaia-argoui-app-menu-add');
    console.log(elmAddRecord);
    elmAddRecord[0].addEventListener('click', () => {
      elmAddRecord[0].removeAttribute('href');
      HAZIME_STYLE__SCT.maruwatashiAdvice('レコードの追加はCだよ');
    });


    // ===レコードの編集===
    // 編集ボタンを非表示にして、ダミーの編集ボタンを代わりに表示させる
    const elmEditRecord = document.getElementsByClassName('recordlist-edit-gaia');
    console.log(elmEditRecord);
    if (elmEditRecord.length > 0) {
      for (let i = 0; i < elmEditRecord.length; i++) {
        const elmParent = elmEditRecord[i].parentElement;
        console.log(elmEditRecord[i]);
        console.log(elmParent);

        elmEditRecord[i].style.display = 'none';

        const dummyEdit = document.createElement('button');
        dummyEdit.className = 'hazime-style__recordlist-edit-gaia';
        dummyEdit.title = '編集する';
        dummyEdit.innerHTML = '<img class="recordlist-edit-icon-gaia" src="https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-edit.png" alt="">'
        elmParent.insertBefore(dummyEdit, elmEditRecord[i]);

        dummyEdit.addEventListener('click', () => {
          HAZIME_STYLE__SCT.akogaAdvice('レコードの編集はEをおしてみたまえ');
        });

      }
    }

    // ===次のページへ===
    // nextボタンを非表示にして、ダミーのnextボタンを代わりに表示させる
    const elmNextPage = document.getElementsByClassName('gaia-ui-listtable-pagercomponent-next');
    const elmDummyNextPage = document.getElementsByClassName('hazime-style__dummy_next_page');
    console.log(elmNextPage);
    console.log(elmDummyNextPage);

    if (elmNextPage.length > 0 && elmDummyNextPage.length === 0) {  // 増殖バグ防止

      // 上部と下部の2箇所にnextボタンがあるため、そこへの対応
      for (let i = 0; i < elmNextPage.length; i++) {

        if (i === 0 || i === 2) {

          const elmParent = elmNextPage[i].parentElement;
          console.log(elmNextPage[i]);
          console.log(elmParent);

          elmNextPage[i].style.display = 'none';

          const dummyNext = document.createElement('button');
          dummyNext.className = 'gaia-ui-listtable-pagercomponent-next hazime-style__dummy_next_page';
          dummyNext.ariaLabel = '次へ';
          dummyNext.title = '次へ';

          elmParent.insertBefore(dummyNext, elmNextPage[i]);

          dummyNext.addEventListener('click', () => {
            HAZIME_STYLE__SCT.chappyAdvice('次のページはnをおしてみて');
          });

        }
      }

    }

    // ===前のページへ===
    // prevボタンを非表示にして、ダミーのprevボタンを代わりに表示させる
    const elmPrevPage = document.getElementsByClassName('gaia-ui-listtable-pagercomponent-prev');
    const elmDummyPrevPage = document.getElementsByClassName('hazime-style__dummy_prev_page');
    console.log(elmPrevPage);
    console.log(elmDummyPrevPage);

    if (elmPrevPage.length > 0 && elmDummyPrevPage.length === 0) {  // 増殖バグ防止

      // 上部と下部の2箇所にprevボタンがあるため、そこへの対応
      for (let i = 0; i < elmPrevPage.length; i++) {

        if (i === 0 || i === 2) {

          const elmParent = elmPrevPage[i].parentElement;
          console.log(elmPrevPage[i]);
          console.log(elmParent);

          elmPrevPage[i].style.display = 'none';

          const dummyPrevPage = document.createElement('button');
          dummyPrevPage.className = 'gaia-ui-listtable-pagercomponent-prev hazime-style__dummy_prev_page';
          dummyPrevPage.ariaLabel = '前へ';
          dummyPrevPage.title = '前へ';

          elmParent.insertBefore(dummyPrevPage, elmPrevPage[i]);

          dummyPrevPage.addEventListener('click', () => {
            HAZIME_STYLE__SCT.chappyAdvice('前のページはpをおしてみて');
          });

        }

      }

    }


    // *****ショートカットキーの一覧**************
    // enter : 選択したレコードの詳細を表示する
    // / : 検索キーワードを入力する
    // ? : このウインドウの表示/非表示を切り換える
    // c : レコードを追加する
    // e : 選択したレコードを編集する
    // j : 次のレコードを選択する
    // k : 前のレコードを選択する
    // n : 次のページを表示する
    // o : 選択したレコードの詳細を表示する
    // p : 前のページを表示する
    // ***************************************

    window.document.onkeydown = (evt) => {
      const acvTagName = document.activeElement.tagName;
      console.log(acvTagName);
      console.log(evt.code);

      const kintoneEvt = 'index.show';

      // インプット状態のフィールドがアクティブのときはreturn
      if (acvTagName === 'INPUT') { return; }

      if (evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '/ : 検索キーワードを入力する'); return; }
      if (evt.shiftKey === true && evt.code === 'Slash') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, '? : このウインドウの表示/非表示を切り換える'); return; }
      if (evt.code === 'KeyC') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'c : レコードを追加する'); return; }
      if (evt.code === 'KeyJ') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'j : 次のレコードを選択する'); return; }
      if (evt.code === 'KeyK') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'k : 前のレコードを選択する'); return; }
      if (evt.code === 'KeyN') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'n : 次のページを表示する'); return; }
      if (evt.code === 'KeyP') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'p : 前のページを表示する'); return; }

      if (document.getElementsByClassName('selected-row-gaia').length > 0) {
        if (evt.code === 'Enter') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'enter : 選択したレコードの詳細を表示する'); return; }
        if (evt.code === 'KeyE') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'e : 選択したレコードを編集する'); return; }
        if (evt.code === 'KeyO') { HAZIME_STYLE__SCT.funcPostLog(kintoneEvt, 'o : 選択したレコードの詳細を表示する'); return; }
      }

    };

  });


})();