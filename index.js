document.addEventListener('DOMContentLoaded', function () {
    const hiraganaContainer = document.getElementById('hiragana-container');//五十音の表示
    const outputContainer = document.getElementById('output-container');//出力箇所
    const clearButton = document.getElementById('clear-button');//全削除ボタン
    const yesButton = document.getElementById('yes-button');//はいボタン
    const noButton = document.getElementById('no-button');//いいえボタン
    const smallContent = document.getElementById('small-content');//小文字ボタン
    const oneback = document.getElementById('one-back');//一つ戻る
    
    let typedCharacters = '';
    let lastClickedElement = null;

    const hiraganaGroups = [
        ['あ', 'い', 'う', 'え', 'お'],
        ['か', 'き', 'く', 'け', 'こ'],
        ['さ', 'し', 'す', 'せ', 'そ'],
        ['た', 'ち', 'つ', 'て', 'と'],
        ['な', 'に', 'ぬ', 'ね', 'の'],
        ['は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま', 'み', 'む', 'め', 'も'],
        ['や', 'い', 'ゆ', 'え', 'よ'],
        ['ら', 'り', 'る', 'れ', 'ろ'],
        ['わ', 'を', 'ん','゛' , '゜']
    ];

    //ひらがな表示
    hiraganaGroups.forEach(group => {

    const hiraganaGroup = document.createElement('div');
    hiraganaGroup.className = 'hiragana-group';
    
    group.forEach(hiragana => {
        const hiraganaChar = document.createElement('div');
        hiraganaChar.className = 'hiragana-char';
        hiraganaChar.textContent = hiragana;
        hiraganaChar.addEventListener('click', function () {
            if (lastClickedElement) {
                lastClickedElement.classList.remove('clicked');
            }
                typedCharacters += hiragana;
               
                displayTypedCharacters();
                hiraganaChar.classList.add('clicked');
                lastClickedElement = hiraganaChar;
                clearButton.style.display = 'block';
            });
            hiraganaGroup.appendChild(hiraganaChar);
        });

        hiraganaContainer.appendChild(hiraganaGroup);
    });

    // 入力文字表示
    function displayTypedCharacters() {
        outputContainer.textContent = typedCharacters;
    }

    //削除ボタン
    clearButton.addEventListener('click', function () {
        typedCharacters = '';
        displayTypedCharacters();
        if (lastClickedElement) {
            lastClickedElement.classList.remove('clicked');
            lastClickedElement = null;
        }
        clearButton.style.display = 'none';
    });

    //はいボタン
    yesButton.addEventListener('click', function () {
            typedCharacters = 'はい'+ getRandomHappyEmoji() ;
            
            if (lastClickedElement) {
                lastClickedElement.classList.remove('clicked');
                lastClickedElement = null;
            }
            clearButton.style.display = 'block';
            displayTypedCharacters();
        });
    
    const happy = ["(*^-^*)","(*‘ω‘ *)","☺","(*'▽')","😊"]
    function getRandomHappyEmoji() {
        const randomIndex = Math.floor(Math.random() * happy.length);
        return happy[randomIndex];
    }

    //いいえボタン
    noButton.addEventListener('click', function () {
            typedCharacters = 'いいえ'+getRandomunHappyEmoji();
            
            if (lastClickedElement) {
                lastClickedElement.classList.remove('clicked');
                lastClickedElement = null;
            }
            clearButton.style.display = 'block';
            displayTypedCharacters(); 
        });

    const unhappy = ["(-.-)","(-_-)","(._.)","(´_ゝ｀)","(・´з`・)"]
    function getRandomunHappyEmoji() {
        const randomIndex = Math.floor(Math.random() * happy.length);
        return unhappy[randomIndex];
    }

    //一つもどる
    oneback.addEventListener('click', function () {
            if (typedCharacters.length > 0) {
                typedCharacters = typedCharacters.slice(0, -1);
                displayTypedCharacters();

                if (lastClickedElement) {
                    lastClickedElement.classList.remove('clicked');
                    lastClickedElement = null;
                }

                if (typedCharacters === '') {
                    clearButton.style.display = 'none';
                }
            }
        });
    
    //小文字ボタン
    const smallCharacters = {
        'あ': 'ぁ',
        'い': 'ぃ',
        'う': 'ぅ',
        'え': 'ぇ',
        'お': 'ぉ',
        'つ': 'っ',
        'や': 'ゃ',
        'ゆ': 'ゅ',
        'よ': 'ょ',
    };

    smallContent.addEventListener('click', function () {
        if (lastClickedElement) {
            const selectedChar = lastClickedElement.textContent;
            if (selectedChar in smallCharacters) {
                typedCharacters = typedCharacters.slice(0, -1) + smallCharacters[selectedChar];
                displayTypedCharacters();
            }
        }
    });


});
