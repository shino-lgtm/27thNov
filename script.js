// Firebase SDKをインポートします
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// --- 重要: Firebaseプロジェクトの設定をここに貼り付けてください ---
// Firebase Consoleの「プロジェクト設定」→「一般」→「マイアプリ」からWebアプリのSDK設定を取得できます。
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // あなたのAPIキー
  authDomain: "YOUR_AUTH_DOMAIN", // あなたのAuthドメイン
  projectId: "november5th-a1336", // あなたのプロジェクトID (設定済み)
  storageBucket: "YOUR_STORAGE_BUCKET", // あなたのStorageバケット
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // あなたのMessaging Sender ID
  appId: "YOUR_APP_ID" // あなたのApp ID
};

// Firebaseアプリを初期化します
const app = initializeApp(firebaseConfig);

// Firestoreデータベースのインスタンスを取得します
const db = getFirestore(app);

// DOM要素への参照を取得します
const loadDataButton = document.getElementById('loadDataButton');
const dataContainer = document.getElementById('data-container');

// Firestoreからデータを読み込み、表示する非同期関数
async function loadFirestoreData() {
    if (!dataContainer) return;

    dataContainer.innerHTML = '<p>Firestoreからデータをロード中...</p>';

    try {
        // --- TODO: あなたのコレクション名に置き換えてください！ ---
        // 例: 'users', 'products', 'messages' など
        const collectionRef = collection(db, "my_first_collection"); // ここを変更！

        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
            dataContainer.innerHTML = '<p>指定されたコレクションにデータが見つかりませんでした。</p>';
            return;
        }

        dataContainer.innerHTML = ''; // 既存のコンテンツをクリア
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            const docId = doc.id;
            console.log(`ドキュメントID: ${docId}, データ:`, docData);

            // 取得したデータをHTMLに表示
            const div = document.createElement('div');
            div.className = 'document-item';
            div.textContent = `ID: ${docId} | データ: ${JSON.stringify(docData)}`;
            dataContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Firestoreからのデータ取得中にエラーが発生しました:", error);
        dataContainer.innerHTML = `<p style="color: red;">データのロードに失敗しました: ${error.message}</p>`;
    }
}

// ボタンがクリックされたらデータをロードします
if (loadDataButton) {
    loadDataButton.addEventListener('click', loadFirestoreData);
}

// 必要であれば、ページロード時に自動的にデータをロードすることもできます
// loadFirestoreData();
