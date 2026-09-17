/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
// Public historical reading and beginner arithmetic.
import {renderKids} from './kids.mjs';
import {historyNotes,researchDetails,questionDetails} from './reading-supplement.mjs';
const sources = {
  kyotoExhibit:['京都大学附属図書館｜和算の時代（2003）','https://repository.kulib.kyoto-u.ac.jp/server/api/core/bitstreams/4df6cc6b-d94f-4405-a054-4f6d99e1b63f/content'],
  kataakira:['京都大学附属図書館｜『大成算経』の解説（項目75）','https://repository.kulib.kyoto-u.ac.jp/server/api/core/bitstreams/4df6cc6b-d94f-4405-a054-4f6d99e1b63f/content'],
  yoshida:['国立国会図書館｜吉田光由の著者典拠（『塵劫記』書誌）','https://ndlsearch.ndl.go.jp/books/R100000002-I000002596398'],
  ajima:['国立国会図書館｜安島直円の典拠','https://id.ndl.go.jp/auth/ndlna/00269283'],
  uchida:['国立国会図書館｜内田五観の典拠','https://id.ndl.go.jp/auth/ndlna/00403459'],
  early:['国立国会図書館｜江戸時代初期','https://www.ndl.go.jp/math/s1/1.html'],
  china:['国立国会図書館｜中国の数学の影響','https://www.ndl.go.jp/math/s1/c1.html'],
  seki:['国立国会図書館｜関孝和','https://www.ndl.go.jp/math/s1/2.html'],
  schools:['国立国会図書館｜家元制度・趣味としての和算','https://www.ndl.go.jp/math/s1/3.html'],
  sangaku:['国立国会図書館｜算額','https://www.ndl.go.jp/math/s1/c5.html'],
  modern:['国立国会図書館｜和算から洋算へ','https://www.ndl.go.jp/math/s1/6.html'],
  chronology:['国立国会図書館｜和算の年表','https://www.ndl.go.jp/math/chronology.html'],
  collection:['国立国会図書館｜関孝和・関流の資料','https://www.ndl.go.jp/math/s2/2.html'],
  later:['国立国会図書館｜江戸後期の和算書','https://www.ndl.go.jp/math/s2/3.html'],
  pi:['国立国会図書館｜円周率','https://www.ndl.go.jp/math/s1/c4.html'],
  philosophy:['森本光生｜建部賢弘の数学哲学（2011）','https://www.kurims.kyoto-u.ac.jp/~kyodo/kokyuroku/contents/pdf/1739-07.pdf'],
  takebe:['森本・小川｜『綴術算経』校訂英訳（2012）','https://www.sciamvs.org/files/SCIAMVS_13_157-286_Morimoto_Ogawa.pdf'],
  acceleration:['長田直樹｜収束の加速法の歴史（2012）','https://www.kurims.kyoto-u.ac.jp/~kyodo/kokyuroku/contents/pdf/1787-07.pdf'],
  bridges:['深川・堀部｜Sangaku（2014）、117頁','https://archive.bridgesmathart.org/2014/bridges2014-111.pdf'],
  kokon:['京都大学｜『古今算鑑』1832年刊','https://rmda.kulib.kyoto-u.ac.jp/item/rb00028467'],
  soddy:['Nature｜The Hexlet（1936年12月5日）','https://www.nature.com/articles/138958a0'],
  terminology:['武正泰史｜「点竄」の由来と成立（2023）','https://www.jstage.jst.go.jp/article/jhsj/61/304/61_301/_pdf/-char/ja'],
  bernoulli:['北川智子｜ベルヌーイ数の起源（2022）','https://link.springer.com/article/10.1007/s00283-021-10072-y'],
  sums:['国立国会図書館｜垜術・累乗和','https://www.ndl.go.jp/math/s1/question2.html'],
  crt:['国立国会図書館｜中国式剰余定理','https://www.ndl.go.jp/math/s1/c2.html'],
  archive:['東北大学｜和算資料・『綴術』','https://touda.tohoku.ac.jp/collection/database/library/10020000006009'],
  restoration:['国立国会図書館｜明治以降の和算史研究','https://www.ndl.go.jp/math/s1/c9.html'],
};
const cite=(...keys)=>`<div class="reading-citations">${keys.map(k=>`<a href="${sources[k][1]}" target="_blank" rel="noopener noreferrer">${sources[k][0]} ↗</a>`).join('')}</div>`;
const tryTool=(id,text)=>`<a class="reading-try" href="#${id}">${text} <span aria-hidden="true">→</span></a>`;
const section=(label,title,body)=>`<section class="reading-section"><p class="reading-label">${label}</p><h2>${title}</h2>${body}</section>`;
const next=(id,title)=>`<nav class="reading-next" aria-label="次の読み物"><span>つづきを読む</span><a href="#${id}">${title} <span aria-hidden="true">→</span></a></nav>`;

export const readingPages = [
  {id:'history',no:'序',name:'和算とは',sub:'暮らしから、難問へ',title:'江戸の人は、何を計算した？',intro:'米俵はいくつ。田んぼはどれくらい。円の隙間には、どんな円が入る。暮らしの問いと、解く楽しさが出会った日本の数学です。',body:()=>`
    <div class="reading-lead"><p>お寺や神社で見上げた額に、絵と一緒に数学の問題が書いてある。そんな風景が、江戸時代の日本にはありました。</p><p>それが<strong>算額</strong>です。図形を眺め、答えを考え、別の問題へ進む。和算には、計算を仕事に使う顔と、考えることそのものを楽しむ顔がありました。</p>${cite('sangaku')}</div>
    ${section('まず知りたいこと','「和算」は、どんな数学？',`<p>主に江戸時代に発達した、日本の伝統的な数学を指します。そろばんによる日々の計算から、未知数を含む方程式、円周率や曲線の長さまで、扱う範囲は広いものでした。</p><p>土台には中国の数学書や暦の計算法があります。それを読み解き、新しい問題に使い、独自の算法を育てました。日本だけで無から生まれた数学でも、昔のそろばんだけの話でもありません。</p>${cite('early','china')}`)}
    ${tryTool('history-first','はじめての和算：まると たしざんで あそぼう')}
    <div class="reading-triptych">
      <section><span class="reading-label">暮らし</span><h2>数を使う</h2><p>売買、田畑の面積、堤を築く量。答えが分かると、仕事を進められる。</p>${tryTool('tawara','積み重なった俵を数える')}</section>
      <section><span class="reading-label">遊びと探究</span><h2>数で驚く</h2><p>円と円の隙間にも、思いがけない規則がある。図を見ながら理由を探す。</p>${tryTool('sangaku','円の隙間を調べる')}</section>
      <section><span class="reading-label">算法</span><h2>数から考える</h2><p>計算した値を並べ、差を取り、規則を探す。答えの先に、計算法を見つける。</p>${tryTool('shosa','差分の規則を試す')}</section>
    </div>
    ${section('なぜ発達したのか','難問が、次の道具を育てた',`<p>本の末尾に問題を残す「遺題」、学び合う塾、手で写す本、寺社の算額。答えを受け取るだけでなく、自分でも解いて次の人へ渡す経路が重なっていました。</p><p>生活の計算需要、出版、学習の場、算法の工夫が支え合った――このサイトでは、そうした複数の条件から和算の発達を考えます。ひとつの原因だけで説明しきれるものではありません。</p>${cite('early','schools')}`)}
    ${section('言葉の小さな辞典','道具と算法を、分けて読む',`<dl class="reading-glossary"><div><dt>算盤（そろばん）</dt><dd>珠を動かして、具体的な数を計算する道具。</dd></div><div><dt>算木（さんぎ）</dt><dd>棒の並べ方で数を表す道具。方程式では係数の配置にも使います。</dd></div><div><dt>天元術（てんげんじゅつ）</dt><dd>未知の量を一つ置き、関係を方程式へ表す方法。</dd></div><div><dt>円理（えんり）</dt><dd>円周率、弧の長さ、面積・体積などを求める研究の広がり。</dd></div></dl>${cite('early','pi')}`)}
    ${next('history-timeline','時代をたどる')}`},
  {id:'history-first',no:'遊',name:'はじめての和算',sub:'まると たしざんで あそぼう',title:'かずで、あそぼう。',intro:'7さいから。かずを かえると、こたえと まるも かわるよ。',body:renderKids},
  {id:'history-timeline',no:'史',name:'時代をたどる',sub:'書物と問いのリレー',title:'一冊から、次の問いへ。',intro:'本が出る。誰かが解説する。別の人が新しい問題を残す。発見日と刊行日を分けながら、和算の歩みをたどります。',body:()=>`
    <ol class="reading-timeline">
      <li><div class="timeline-year">1299<span>中国の数学書</span></div><div><h2>朱世傑『算学啓蒙』</h2><p>のちに日本で天元術を学ぶ重要な手掛かりとなる書物。日本での受容・刊行は、この年そのものとは別です。</p>${cite('kyotoExhibit','china')}</div></li>
      <li><div class="timeline-year">1627<span>初版刊行</span></div><div><h2>吉田光由『塵劫記』</h2><p>そろばんの計算を、実用的な問いや数学遊戯とともに広めます。版を重ねたため、後の本を初版と取り違えないことも大切です。</p>${cite('early','chronology')}</div></li>
      <li><div class="timeline-year">1641<span>遺題</span></div><div><h2>答えを載せない12問</h2><p>この年の『塵劫記』に遺題が置かれます。読者が解答を出し、さらに新しい問題を残す継承につながりました。</p>${cite('chronology','early')}</div></li>
      <li><div class="timeline-year">1674<span>刊行</span></div><div><h2>関孝和『発微算法』</h2><p>沢口一之『古今算法記』の遺題15問に答えます。既存の難問を解くことが、新しい表現や算法へ進む足場になります。</p>${cite('seki','chronology')}</div></li>
      <li><div class="timeline-year">1685<span>解説の刊行</span></div><div><h2>建部賢弘『発微算法演段諺解』</h2><p>関の『発微算法』を解説する本。成果を理解し、次の人が使えるようにする仕事も、数学の発展を支えました。</p>${cite('collection','seki')}</div></li>
      <li><div class="timeline-year">1710<span>編纂の節目</span></div><div><h2>『大成算経』</h2><p>関と建部兄弟の研究を集めた大きな体系。年表に示される成立の年と、個々の研究の発見年・写本の書写年は区別します。</p>${cite('chronology','seki')}</div></li>
      <li><div class="timeline-year">1712<span>死後刊行</span></div><div><h2>『括要算法』</h2><p>1708年に没した関の成果を門人たちが刊行。有限級数、正多角形、円周率などの仕事が伝えられます。</p>${cite('collection','seki')}</div></li>
      <li><div class="timeline-year">1722<span>序文の年記</span></div><div><h2>建部賢弘『綴術算経』</h2><p>円周率・円弧の研究と、研究方法そのものを記します。序文は1722年。内閣本には1725年の付録があり、本全体の成立を一つの日付にまとめない読み方が必要です。</p>${cite('philosophy')}</div></li>
      <li><div class="timeline-year">1822<span>算額奉納</span></div><div><h2>入澤新太郎の六球連鎖</h2><p>寒川神社に奉納された接球問題。原額は失われ、1832年の『古今算鑑』の記録などから内容が伝わります。</p>${cite('bridges','kokon')}</div></li>
      <li><div class="timeline-year">1832<span>刊行</span></div><div><h2>内田五観編『古今算鑑』</h2><p>京都大学に画像と書誌が公開される和算書。失われた算額の問題をたどるためにも、こうした記録が重要になります。</p>${cite('kokon','bridges')}</div></li>
      <li><div class="timeline-year">1872<span>教育の転換</span></div><div><h2>学校教育で洋算を採用する方針へ</h2><p>学制による転換です。和算を学んだ人々は初期の学校教育にも参加し、一部の地域では後まで和算塾が続きました。数学と人のつながりが一夜で消えたわけではありません。</p>${cite('modern')}</div></li>
    </ol>
    ${next('history-people','和算をつないだ人々')}`},
  {id:'history-people',no:'人',name:'和算家たち',sub:'ひとりの天才を越えて',title:'問いを受け取り、先へ渡す人。',intro:'本を書く人、算法を広げる人、記録を残す人。何をした人なのかから、和算家たちに出会ってみましょう。',body:()=>`
    <div class="reading-people">
      <article><p class="reading-label">暮らしの計算を広める</p><h2>吉田光由 <span>よしだ みつよし</span></h2><p class="reading-dates">1598–1672</p><p>『塵劫記』の著者。そろばんの使い方と実用・遊戯の問題を結び、計算を学ぶ入口を広げました。遺題による問題の受け渡しも、後の研究を刺激します。</p><p>没年は国立国会図書館の著者典拠では1672年、同館の展示解説では1673年と記されています。</p>${cite('yoshida','early','china')}${tryTool('tawara','俵の積み重なりを計算')}</article>
      <article><p class="reading-label">式を扱う力を広げる</p><h2>関孝和 <span>せき たかかず</span></h2><p class="reading-dates">生年未詳–1708 <span>「こうわ」とも読む</span></p><p>数字と文字を組み合わせる傍書法を発展させ、複数の未知数を含む問題の消去を進めました。円周率や累乗和などにも仕事を残しています。生年には異説があるため、確定した年として掲げません。</p>${cite('seki')}${tryTool('tengen','未知数と係数の考え方に触れる')}${tryTool('elimination','上級：二つの未知数から、一つを消す')}${tryTool('bernoulli','極み：和を作る係数を調べる')}${tryTool('replacement','極意：関の換式を使う')}</article>
      <article><p class="reading-label">数から計算法を探る</p><h2>建部賢弘 <span>たけべ かたひろ</span></h2><p class="reading-dates">1664–1739</p><p>関の門人。関の著作を解説・継承し、自身も円周率や円弧を研究しました。『綴術算経』では、何を調べ、どのように調べるかという数学研究の方法にも目を向けています。</p>${cite('seki','philosophy')}${tryTool('enri','近似値の変わり方を比べる')}${tryTool('arc','上級：円弧の級数を計算する')}</article>
      <article><p class="reading-label">共に体系を編む</p><h2>建部賢明 <span>たけべ かたあきら（かたあき、とも）</span></h2><p class="reading-dates">1661–1716</p><p>賢弘の兄。関・建部兄弟による『大成算経』の編纂に関わりました。兄弟を取り違えず、一人の研究だけに集約しないことが、継承の実像へ近づく一歩です。</p>${cite('kataakira','takebe')}</article>
      <article><p class="reading-label">円理を次の世代へ</p><h2>松永良弼 <span>まつなが よしすけ</span></h2><p class="reading-dates">生年未詳–1744（1690年頃とする辞典あり）</p><p>関の没後の世代に円理を発展させた和算家。関・建部で話を終わらせず、その後の円周率や級数の研究へ目を向けるときに重要な人物です。</p>${cite('kyotoExhibit','pi')}</article>
      <article><p class="reading-label">接円と求積を深める</p><h2>安島直円 <span>あじま なおのぶ</span></h2><p class="reading-dates">1732–1798</p><p>江戸後期の和算家。接円や円理・求積などに独自の成果を残しました。『六円無有竒術』の円の問題と、入澤の六球連鎖は別の研究として読みます。</p>${cite('ajima','later')}</article>
      <article><p class="reading-label">後期円理を押し広げる</p><h2>和田寧 <span>わだ やすし</span></h2><p class="reading-dates">1787–1840</p><p>円理の計算法を発展させ、後続の和算家に大きな影響を与えました。「円理」は関の時代だけで完成した一つの公式ではなく、世代を重ねて育った研究分野です。</p>${cite('later','chronology')}</article>
      <article><p class="reading-label">球がつながる不思議を問う</p><h2>入澤新太郎 <span>いりさわ しんたろう</span></h2><p class="reading-dates">1822年の算額に名を残す</p><p>六球連鎖の問題で知られます。球の大きさだけでなく、置かれた位置まで含めて元へ戻ることが要点。生没年を推測で補わず、記録で確認できる仕事から紹介します。</p>${cite('bridges')}${tryTool('history-stories','六球連鎖の話を読む')}</article>
      <article><p class="reading-label">記録を残し、近代へつなぐ</p><h2>内田五観 <span>うちだ いつみ</span></h2><p class="reading-dates">1805–1882</p><p>『古今算鑑』の編者。書誌では内田彌太郎恭という名も見られます。幕末から明治を生き、洋算や暦にも関わりました。本に記録する仕事が、失われた算額の内容を後世へ残しています。</p>${cite('uchida','kokon','modern')}</article>
    </div><p class="reading-footnote">人名の読みには資料差があります。生没年も、掲載した典拠での表記を基本としています。この一覧は師弟系図ではありません。並び順や時代が近いことだけで、直接の師弟関係を意味しません。</p>
    ${historyNotes()}
    ${next('history-stories','思わず誰かに話したくなる話')}`},
  {id:'history-stories',no:'話',name:'和算の蘊蓄',sub:'知るほど面白い小話',title:'計算の向こうに、人がいる。',intro:'答えを載せない本。数学を運ぶ旅人。元の額がなくても生き残った問題。和算の面白さは、式の外にもあります。',body:()=>`
    <div class="reading-stories">
      <article><p class="reading-label">01 / 遺題</p><h2>解答のない巻末が、次の本を生んだ。</h2><p>1641年の『塵劫記』には、答えを示さない12問が置かれました。解いた人が解答と新しい難問を発表し、さらに別の人へ問いが渡る。学ぶだけの本が、研究を始めるきっかけにもなったのです。</p><details><summary>今の何に似ている？</summary><div class="story-detail"><p>公開された挑戦問題に、いろいろな人が挑む点では、現代の数学コンテストにも似ています。ただし同じ制度ではなく、当時は流派や秘伝、写本による伝授も同居していました。</p></div></details>${cite('early','schools')}</article>
      <article><p class="reading-label">02 / 算額</p><h2>数学の問題を、寺社に掲げる。</h2><p>算額は数学の問題を記した絵馬です。円や三角形が色鮮やかに描かれ、問題や答えが添えられました。奉納の文化の中に、解けた喜びや学びのつながりが残っています。</p><details><summary>昔の問題は、今も全部残っている？</summary><div class="story-detail"><p>火災や破損、紛失で残らなかった額もあります。実物、後世の複製、書物への転記は別の資料。写真を見るときにも、何を撮ったものかを確かめる必要があります。</p></div></details>${cite('sangaku')}${tryTool('sangaku','接円問題を自分でも試す')}</article>
      <article><p class="reading-label">03 / 遊歴算家</p><h2>旅日記の中に、数学が324題。</h2><p>各地を旅して数学を教えた「遊歴算家」がいました。山口和の『道中日記』には、遊歴中に見た算額の問題が324題、書き写されています。人が歩くことも、数学を伝える方法でした。</p>${cite('sangaku')}</article>
      <article><p class="reading-label">04 / 円周率</p><h2>速く計算するために、「誤差」を読む。</h2><p>円に近い多角形を作り、辺を増やすだけでも円周率へ近づけます。関や建部の研究で面白いのは、近似値の変わり方を調べ、計算の進め方そのものを工夫したことです。</p><details><summary>建部は円周率を何桁求めた？</summary><div class="story-detail"><p>ここでは「四十桁級」と表します。書かれた桁数、正しく一致する桁数、途中の計算に使った桁数は別だからです。関の三つの値を使う増約と、建部の平方周長による工夫も、一つの算法に混ぜません。</p><p>計算室の「円理と増約」は、その一部を現代の小数計算で体験するもの。建部の全手順・全作業桁を復元した装置ではありません。</p></div></details>${cite('takebe','acceleration')}${tryTool('enri','多角形と増約を比べる')}${tryTool('pi','上級：円周率50桁を確かめる')}</article>
      <article><p class="reading-label">05 / 六球連鎖</p><h2>六つ進むと、同じ球に戻る。</h2><p>大きな球の内側に、その内面と互いに接する二つの固定球を置く。この三つの球面と前の小球に接するよう、引き返さずに次の小球をつなぐ。退化していない配置では、一周すると六つで輪が閉じるのが六球連鎖です。いつでも好きな六球を並べればよい、という話ではありません。</p><p>入澤新太郎の1822年の算額として伝わる問題は、1832年の『古今算鑑』にも記録されます。Soddyの初報は1936年12月5日。年の差は114年です。1937年の後続論考と初報を取り違えないようにします。</p><details><summary>大きさが戻れば、証明になる？</summary><div class="story-detail"><p>同じ大きさのボールでも、別の場所に置けます。だから、球の径が繰り返すことと、中心の位置まで元に戻ることは別に確かめます。現代の反転幾何による説明を、そのまま入澤本人の証明として語ることもできません。</p><p>計算室の「六球連鎖」では、開始位置を変えて、6球の半径と中心座標を計算できます。24組の接触、非隣接球の非重複、7番目の球が最初の位置へ戻ることを検算します。</p></div></details>${cite('bridges','kokon','soddy')}${tryTool('hexlet','上級：六球連鎖を動かして確かめる')}${tryTool('steiner','極意：平面の円の輪は、いつ閉じる？')}</article>
      <article><p class="reading-label">06 / 数列</p><h2>江戸とバーゼルで、同じ係数が現れた。</h2><p>1の平方、2の平方、3の平方……をまとめて足すには？ さらに三乗、四乗へ進むと、共通する係数が現れます。関の研究と、ヤコブ・ベルヌーイの研究には、現在ベルヌーイ数と呼ぶ数列に対応する成果があります。</p><details><summary>1712年と1713年は、何の差？</summary><div class="story-detail"><p>『括要算法』は1712年、『Ars Conjectandi』は1713年の死後刊行です。出版が一年早いことだけで、発見日まで一年早いとは決められません。比べるのは、数式の内容と史料に残る記録です。</p></div></details>${cite('bernoulli','collection')}${tryTool('tawara','累乗和を計算してみる')}</article>
      <article><p class="reading-label">07 / 百五減算</p><h2>余りだけで、数が分かる？</h2><p>3で割ると2余り、5で割ると3余り、7で割ると2余る。最小の非負整数は23です。でも答えは23だけではなく、105ずつ増やしても同じ余り。3 × 5 × 7 = 105 が、その繰り返しを決めています。</p><p>この問題の源流は中国の『孫子算経』。日本でも「百五減算」として親しまれました。日本で育った数学を知ることは、知識が渡ってきた道を知ることでもあります。</p>${cite('crt')}${tryTool('hyakugo','余りから数を復元する')}</article>
      <article><p class="reading-label">08 / 継承</p><h2>明治になった翌日、消えたわけではない。</h2><p>学校の方針が洋算へ移っても、和算で学んだ人が教壇に立ち、地域の塾も続きました。和算を調べ、資料を集め、次の世代に残した人々もいます。今、私たちが原典を読めるのは、その仕事があるからです。</p>${cite('modern','restoration')}</article>
    </div>${next('history-research','先人の問いを受け継ぐ研究')}`},
  {id:'history-research',no:'継',name:'受け継ぐ研究',sub:'先人の問いの、その先へ',title:'和算から、次の問いへ。',intro:'答えだけでなく、どう計算し、どこまで確かめられるか。先人の算法を、いま調べ直せる形へつなぎます。',body:()=>`
    <div class="reading-lead"><p><strong>先人の問いを引き受け、計算し、成立する理由と使える範囲まで確かめる。</strong>それが、この計算室につながる研究の出発点です。</p><p>AI NOBORuは、和算の史料と現代数学を照らし合わせ、算法・証明・計算コードをつなぐ研究に取り組んでいます。このページでは、積の並べ方を使う「交式・斜乗」を例に、受け継いだ仕事と、確かめ直した内容を紹介します。</p><p>まずは四つの数の並べ替えから。数式に慣れている方は、各節の「定義と一般証明」「式変形」を開くと、詳しい検査までたどれます。</p></div>
    ${researchDetails()}
    ${questionDetails()}
    ${next('history-sources','出典と、読み方の約束')}`},
  {id:'history-sources',no:'典',name:'出典・読み方',sub:'原典へ戻れる入口',title:'どこに書かれているのか。',intro:'読み物の各所から根拠へ戻れます。史料の記述、後世の解釈、このサイトでの再構成を分けて読んでください。',body:()=>`
    ${section('読み方の約束','同じ答えでも、同じ歴史とは限らない',`<dl class="reading-glossary"><div><dt>史料に残ること</dt><dd>書名、刊行年、問題や数値。写本・原額・復元物を区別します。</dd></div><div><dt>研究者による解釈</dt><dd>当時の算法の意味や成立過程。異説や復元仮説を含みます。</dd></div><div><dt>現代的な再構成</dt><dd>現代記号・プログラムで理解する方法。当人の発見手順とは限りません。</dd></div></dl>`)}
    ${section('読みやすい入口','国立国会図書館「江戸の数学」',`<p>時代背景、人物、具体的な問題、デジタル資料への入口がつながる展示です。</p>${cite('early','china','seki','schools','sangaku','modern','chronology')}`)}
    ${section('書物を開く','所蔵資料と校訂研究',`<p>『古今算鑑』は京都大学の書誌と画像へ。『綴術算経』は写本を比較する研究と、原文を伴う校訂英訳へ。全資料・全写本を、このサイトで網羅したものではありません。</p>${cite('kokon','collection','later','archive','takebe','philosophy','kyotoExhibit','kataakira','ajima','uchida')}`)}
    ${section('もう一歩深く','算法と歴史を照合する',`${cite('acceleration','terminology','bernoulli','bridges','soddy')}`)}
    ${section('このサイトの編集方針','小さな違いを、省かない',`<ul class="reading-list"><li>関孝和の生年は未詳として扱い、確定した西暦を補いません。</li><li>『綴術算経』の1722年の序文と、内閣本の1725年の付録を区別します。</li><li>建部の円周率は四十桁級と表し、記載桁・正しい桁・作業桁を混ぜません。</li><li>六球連鎖は1822年の奉納、1832年の記録、1936年のSoddy初報を分けます。</li><li>「和算は計算、西洋は証明」という二分法や、根拠のない師弟線を使いません。</li><li>現代数学で表せる成果を尊重しつつ、現代の理論全体を先人へ帰属させません。</li></ul>`)}
    ${section('計算の読み方','厳密な値と、近似値を使い分ける',`<p>この計算室には、史料を参考にした算法の再構成と、現代数学による比較・補助教材があります。各術の見出し近くにある「史料と計算法の位置づけ」で、その関係を確認できます。</p><dl class="reading-glossary"><div><dt>厳密な計算</dt><dd>入力した整数・有限小数・分数に対する値を、整数や有理数で求めます。入力前の測定誤差を取り除くものではありません。</dd></div><div><dt>近似値と保証区間</dt><dd>長い小数の全ての桁が確かとは限りません。保証区間がある術ではその幅、近似だけの術では成立条件と制限を確認してください。</dd></div></dl>`)}
    ${section('更新内容','説明と検証を、読みやすく',`<details class="research-detail"><summary>2026年9月15日の更新内容</summary><div class="research-detail-body"><p>研究の入口を、並べ替えの具体例、先行研究、一般証明、計算結果の順に整理しました。史料の帰属と数学的な成立の区別は維持しています。</p><p>読み物への直接リンク、数式の文字サイズ、狭い画面での比較表を改善し、計算の位置づけと近似精度の案内を追加しました。既存の70術の計算エンジンと研究検算の保存結果は変更していません。</p></div></details>`)}
    ${tryTool('sangaku','計算室で、ひとつ試してみる')}`},
];

export function renderReading(page){return `<article class="reading"><header class="workspace-heading"><p class="kicker">和算を知る / ${page.name}</p><div class="title-row"><h1>${page.title}</h1><span class="mode-number" aria-hidden="true">${page.no}</span></div><p class="intro">${page.intro}</p></header><p class="reading-permalink"><a href="./${page.id.replace('history','about')}.html">この読み物の固定リンク</a><span>共有・再訪には、このリンクを使えます。</span></p>${page.body()}</article>`;}
