import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kana.component.html',
  styleUrl: './kana.component.sass'
})
export class KanaComponent implements OnInit {

  
  constructor() {}

  ngOnInit(): void {}

  title = 'ことばのせんせい - kotoba no sensei - Hiragana & Katakana';

  hiraganaTableHeaderItems = [
    { class: 'row-header',                        content: '' },
    { class: 'column-header row-header',          content: '-a' },
    { class: 'column-header',                     content: '-i' },
    { class: 'column-header',                     content: '-u' },
    { class: 'column-header',                     content: '-e' },
    { class: 'column-header',                     content: '-o' },
    { class: 'column-header',                     content: '' },
    { class: 'column-header',                     content: '-ya' },
    { class: 'column-header',                     content: '-yu' },
    { class: 'column-header',                     content: '-yo' },
  ];


  public hiraganaTableItems: any[] = [
    {
      '': [
        { content: '<div>あ<p>a</p></div>',      class: '', },
        { content: '<div>い<p>i</p></div>',      class: '', },
        { content: '<div>う<p>u</p></div>',      class: '', },
        { content: '<div>え<p>e</p></div>',      class: '', },
        { content: '<div>お<p>o</p></div>',      class: '', },
      ],
      'k': [
        { content: '<div>か<p>ka</p></div>',      class: '', },
        { content: '<div>き<p>ki</p></div>',      class: '', },
        { content: '<div>く<p>ku</p></div>',      class: '', },
        { content: '<div>け<p>ke</p></div>',      class: '', },
        { content: '<div>こ<p>ko</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>きゃ<p>kya</p></div>',   class: '', },
        { content: '<div>きゅ<p>kyu</p></div>',   class: '', },
        { content: '<div>きょ<p>kyo</p></div>',    class: '', },	
      ],
      's': [
        { content: '<div>さ<p>sa</p></div>',      class: '', },
        { content: '<div>し<p>shi</p></div>',      class: '', },
        { content: '<div>す<p>su</p></div>',      class: '', },
        { content: '<div>せ<p>se</p></div>',      class: '', },
        { content: '<div>そ<p>so</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>しゃ<p>sha</p></div>',   class: '', },
        { content: '<div>しゅ<p>shu</p></div>',   class: '', },
        { content: '<div>しょ<p>sho</p></div>',    class: '', },	
      ],
      't': [
        { content: '<div>>た<p>ta</p></div>',      class: '', },
        { content: '<div>ち<p>chi</p></div>',      class: '', },
        { content: '<div>つ<p>tsu</p></div>',      class: '', },
        { content: '<div>て<p>te</p></div>',      class: '', },
        { content: '<div>と<p>to</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>ちゃ<p>tya</p></div>',   class: '', },
        { content: '<div>ちゅ<p>tyu</p></div>',   class: '', },
        { content: '<div>ちょ<p>tyo</p></div>',    class: '', },	
      ],
      'n': [
        { content: '<div>な<p>na</p></div>',      class: '', },
        { content: '<div>に<p>ni</p></div>',      class: '', },
        { content: '<div>ぬ<p>nu</p></div>',      class: '', },
        { content: '<div>ね<p>ne</p></div>',      class: '', },
        { content: '<div>の<p>no</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>にゃ<p>nya</p></div>',   class: '', },
        { content: '<div>にゅ<p>nyu</p></div>',   class: '', },
        { content: '<div>にょ<p>nyo</p></div>',    class: '', },	
      ],
      'h': [
        { content: '<div>は<p>ha</p></div>',      class: '', },
        { content: '<div>ひ<p>hi</p></div>',      class: '', },
        { content: '<div>ふ<p>fu</p></div>',      class: '', },
        { content: '<div>へ<p>he</p></div>',      class: '', },
        { content: '<div>ほ<p>ho</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>ひゃ<p>hya</p></div>',   class: '', },
        { content: '<div>ひゅ<p>hyu</p></div>',   class: '', },
        { content: '<div>ひょ<p>hyo</p></div>',    class: '', },	
      ],
      'm': [
        { content: '<div>ま<p>ma</p></div>',      class: '', },
        { content: '<div>み<p>mi</p></div>',      class: '', },
        { content: '<div>む<p>mu</p></div>',      class: '', },
        { content: '<div>め<p>me</p></div>',      class: '', },
        { content: '<div>も<p>mo</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>みゃ<p>mya<</p></div>',   class: '', },
        { content: '<div>みゅ<p>myu</p></div>',   class: '', },
        { content: '<div>みょ<p>myo</p></div>',    class: '', },	
      ],
      'y': [
        { content: '<div>や<p>ya</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>ゆ<p>y</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>よ<p>yo</p></div>',      class: '', },
      ],
      
      'r': [
        { content: '<div>ら<p>ra</p></div>',      class: '', },
        { content: '<div>り<p>ri</p></div>',      class: '', },
        { content: '<div>る<p>ru</p></div>',      class: '', },
        { content: '<div>れ<p>re</p></div>',      class: '', },
        { content: '<div>ろ<p>ro</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>りゃ<p>rya</p></div>',   class: '', },
        { content: '<div>りゅ<p>ryu</p></div>',   class: '', },
        { content: '<div>りょ<p>ryo</p></div>',    class: '', },	
      ],
      'w': [
        { content: '<div>わ<p>wa</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '',      class: 'cell-empty', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>を<p>wo</p></div>',   class: '', },
	
      ],
      ' ': [
        { content: ' ',      class: 'cell-empty', },
      ],
      'g': [
        { content: '<div>が<p>ga</p></div>',      class: '', },
        { content: '<div>ぎ<p>gi</p></div>',      class: '', },
        { content: '<div>ぐ<p>gu</p></div>',      class: '', },
        { content: '<div>げ<p>ge</p></div>',      class: '', },
        { content: '<div>ご<p>go</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>ぎゃ<p>gya</p></div>',   class: '', },
        { content: '<div>ぎゅ<p>gyu</p></div>',   class: '', },
        { content: '<div>ぎょ<p>gyo</p></div>',    class: '', },	
      ],
      'z': [
        { content: '<div>ざ<p>za</p></div>',      class: '', },
        { content: '<div>じ<p>ji</p></div>',      class: '', },
        { content: '<div>ず<p>zu</p></div>',      class: '', },
        { content: '<div>ぜ<p>ze</p></div>',      class: '', },
        { content: '<div>ぞ<p>zo</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>じゃ<p>ja</p></div>',   class: '', },
        { content: '<div>じゅ<p>ju</p></div>',   class: '', },
        { content: '<div>じょ<p>jo</p></div>',    class: '', },	
      ],
      'd': [
        { content: '<div>だ<p>da</p></div>',      class: '', },
        { content: '<div>ぢ<p>di</p></div>',      class: '', },
        { content: '<div>づ<p>du</p></div>',      class: '', },
        { content: '<div>で<p>de</p></div>',      class: '', },
        { content: '<div>ど<p>do</p></div>',      class: '', },
      ],
      'b': [
        { content: '<div>ば<p>ba</p></div>',      class: '', },
        { content: '<div>び<p>bi</p></div>',      class: '', },
        { content: '<div>ぶ<p>bu</p></div>',      class: '', },
        { content: '<div>べ<p>be</p></div>',      class: '', },
        { content: '<div>ぼ<p>bo</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>びゃ<p>bya</p></div>',   class: '', },
        { content: '<div>びゅ<p>byu</p></div>',   class: '', },
        { content: '<div>びょ<p>byo</p></div>',    class: '', },	
      ],
      'p': [
        { content: '<div>ぱ<p>pa</p></div>',      class: '', },
        { content: '<div>ぴ<p>pi</p></div>',      class: '', },
        { content: '<div>ぷ<p>pu</p></div>',      class: '', },
        { content: '<div>ぺ<p>pe</p></div>',      class: '', },
        { content: '<div>ぽ<p>po</p></div>',      class: '', },
        { content: '',      class: 'cell-empty', },
        { content: '<div>ぴゃ<p>pya</p></div>',   class: '', },
        { content: '<div>ぴゅ<p>pyu</p></div>',   class: '', },
        { content: '<div>ぴょ<p>pyo</p></div>',    class: '', },	
      ],
    },
  ]; 


  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  trackByContent(index: number, item: any): any {
    return item.content;
  }






  
}
