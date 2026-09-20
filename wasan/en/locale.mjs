/* AI NOBORU — https://www.aiofonesown.com/ | Runtime translation of shared renderer output. */
import {engineCopy} from './engine-copy.mjs';
import {heritageExact,heritageRules} from './heritage-engine-copy.mjs';
import {validationLabels as catalogValidationLabels} from './catalog.mjs';
const exact=new Map(Object.entries({
  '表示範囲外':'outside the display range','上級へ：消去と行列式':'Advanced: elimination and determinants','すべての実根を調べる':'Find every real root','上級へ：建部の円弧級数':'Advanced: Takebe’s arc series','円周率50桁を確定する':'Certify 50 digits of pi','上級へ：三円から二つの接円':'Advanced: two circles tangent to three','極み：和を作る係数へ':'Mastery: coefficients that generate power sums','極み：楕円の周長へ':'Mastery: perimeter of an ellipse','極み：円から楕円へ':'Mastery: from circles to ellipses','極意：一般の換式へ':'Mastery: general elimination by replacement','極意：反転の仕組みへ':'Mastery: the structure of inversion','極意：平面の円の連鎖へ':'Mastery: planar circle chains','角術と正多角形へ':'Continue to kakujutsu and regular polygons','共通因子を取り出す':'Extract a common factor','重根と判別式へ':'Continue to repeated roots and the discriminant','方程式を転位する':'Translate an equation','一部分の弧長を求める':'Find the length of a selected arc','曲線を回して求積する':'Find a volume by rotating a curve','半円の内側の連鎖へ':'Continue to the arbelos chain','深化へ：継子立てと算脱':'Discovery: mamako-date and counting-out','三角形の中の三円へ':'Continue to three circles in a triangle','角を表す最小多項式へ':'Find the minimal polynomial of twice the cosine','値と傾きの補間へ':'Interpolate values and slopes','逆級数を求める':'Find an inverse series','重複度ごとに因子を分ける':'Separate factors by multiplicity','探究へ：建部の極大体積':'Frontier: Takebe’s maximum-volume problem','安島の四円配置へ':'Continue to Ajima’s four-circle configuration','楕円の接触と最小高さへ':'Continue to ellipse tangency and minimum height','面積から切断位置を求める':'Find cut positions from areas','整数面積の三角形へ':'Continue to integer-area triangles','一般の方程式を級数にする':'Expand a general implicit equation as a series','つながる術':'Related tools','史料と計算法の位置づけ':'Historical source and computational status','史料を参考にした再構成と、現代数学による比較・補助を区別しています。具体的な出典は「参考資料」から読めます。':'Historical reconstructions are distinguished from modern comparisons and computational aids. See “Sources and further reading” for the specific references.','数を置く':'Enter values','入力例':'Examples','計算する':'Calculate','この術の鍵':'Key relation','和算の着眼点':'Wasan perspective','成立条件と範囲':'Conditions and scope','途中式を読む':'Show the steps','参考資料':'Sources and further reading','和算の背景と、受け継ぐ研究 →':'About the history of wasan and the research carried forward →','入力を変更しました。計算するボタンで結果を更新します。':'The input has changed. Press Calculate to update the result.','前回の計算結果':'Previous result','図で見る':'Diagram','この数値の読み方':'How to read this number','結果をコピー ⧉':'Copy result ⧉','コピーしました':'Copied','答えを選択してコピー':'Select the answer and copy it','この式の実根を調べる →':'Find all real roots of this equation →','入力の条件を確認してください。':'Check the input requirements.','修正すると、ここに図表が表示されます。':'Once corrected, the diagram or table will appear here.','有効な入力で計算すると途中式を表示します。':'Enter valid values to display the calculation steps.','本文へ移動':'Skip to the article','計算へ移動':'Skip to the calculator','和算の読み物':'Articles about wasan','計算の種類':'Calculation tools','計算の一覧ページ':'Calculation index pages','和算を知る':'About Wasan','読み物':'Reading','術を選ぶ':'Choose a tool','問いは、受け継がれる。':'Questions pass from one generation to the next.','歴史を読み、数を動かし、また考える。':'Read the history, work the numbers, and ask again.','答えから、考え方へ。':'Move from the answer to the idea.','各計算に途中式・成立条件・出典を添えています。':'Each calculator includes step-by-step calculations, conditions, and sources.','計算室':'Calculators','使い方':'How to use','閉じる':'Close','図は中心座標に基づく正投影。見る向きを変えられます。見かけの重なりは衝突を意味しません。':'The drawing is an orthographic projection from the calculated centers. Change the viewing angle to inspect depth; apparent overlap does not imply collision.','小数15桁程度の表示':'Displayed to about 15 decimal digits','約分した有理数':'Reduced rational value','厳密値':'Exact value','指定した桁で切り捨て':'Truncated at the requested place','二分法で確認した厳密な根':'Exact root confirmed during bisection','二分法の最終中点（根の近似）':'Final bisection midpoint (root approximation)','最小の非負整数':'Least non-negative integer','整数演算による厳密値':'Exact integer result','接触条件から計算':'Calculated from the tangency conditions','関数のグラフ':'Graph of the function','値が大きいため、グラフ表示を省略しています。':'The values are too large to draw safely.','厳密な値は答えと表で確認できます。':'Use the answer and table for the exact values.','小数では点の間隔を区別できないため、図示を省略しています。':'The points cannot be distinguished at floating-point display precision, so the plot is omitted.','答えと表を参照してください。':'See the answer and table.','図示できる数値範囲を超えています。答えと表を参照してください。':'The values exceed the drawable range. See the answer and table.','半径 1':'radius 1','次数 k':'order k','先頭差分 Δᵏ':'leading difference Δᵏ','二項係数 C':'binomial coefficient C','掛けた値':'contribution','円 a':'circle a','円 b':'circle b','求める円 r':'required circle r','辺の数':'number of sides','内接値':'inscribed value','外接値':'circumscribed value','幅':'width','増約による3項の外挿':'three-term convergence acceleration','直前3つの内接値から計算。保証された上下界ではありません。':'Calculated from the three latest inscribed values; this is not a certified bound.','増約を比べるには、辺を倍にする回数を2以上にします。':'Use at least two doublings to compare the accelerated estimate.','既知の点と求めた点':'Known and evaluated points','既知の点':'known points','計算した点':'evaluated point','図は小数による表示。答えと差分表は分数まで厳密に計算しています。':'The diagram uses decimals; the answer and difference table remain exact rational calculations.','差分の段':'difference order','各段の値':'values in the row','求めた位置は既知の点の範囲外です。これは外挿であり、実際の数列や現象の続きを保証しません。':'The requested position lies outside the known data. This is extrapolation: it does not establish how the original sequence or phenomenon continues.','一桁ずつ決める':'Choosing one digit at a time','下ろす2桁':'next two-digit group','選ぶ桁 q':'chosen digit q','余り':'remainder','段':'step','既決の桁 p':'digits already fixed, p','比較する数':'current value','次の桁 q':'next digit q','引く数':'amount subtracted','係数と関数の形':'Coefficients and the shape of the function','定数':'constant','指定区間の多項式と求めた根の位置。グラフは81点の標本を直線で結んだもの。':'The polynomial on the chosen interval and the located root. The curve joins 81 sampled points.','係数は現代的転写。グラフは81点を結ぶ概形で、すべての根を示すものではありません。':'Coefficients are shown in modern notation. The 81-point sketch does not display every root.','回':'iteration','左端':'left endpoint','右端':'right endpoint','中点 x':'midpoint x','f(x) の近似':'approximate f(x)','条件を一つずつ重ねる':'Combining the conditions one at a time','割る数':'modulus','統合後の最小値':'least solution after merging','周期':'period','条件をすべて満たす周期':'Period satisfying every condition','各条件の割る数の最小公倍数':'Least common multiple of the moduli','互いに素でない割る数も、余りの条件が両立すれば計算できます。':'Non-coprime moduli are supported when their remainder conditions are compatible.','正規化した余り':'normalized remainder','ここまでの gcd':'gcd so far','統合結果':'merged solution','和の規則を取り出す':'Extracting the rule for the sum','空の和':'empty sum','計算の図表':'Calculation diagram or table','和算 計算室':'WASAN Mathematics Laboratory','入力：':'Input:','結果：':'Result:'
}));

const countIsOne=value=>Number(String(value).replaceAll(',',''))===1;
const counted=(value,singular,plural=`${singular}s`)=>`${value} ${countIsOne(value)?singular:plural}`;

// Engine validators sometimes abbreviate the corresponding catalog field label.
const validationLabels=new Map(catalogValidationLabels);
for(const [source,target] of catalogValidationLabels){
  const short=source.replace(/[（(].*$/,'').trim();
  if(!validationLabels.has(short))validationLabels.set(short,target);
  const withoutSymbol=short.replace(/\s+[A-Za-zα-ω][₀-₉₁₂]*$/u,'').trim();
  if(!validationLabels.has(withoutSymbol))validationLabels.set(withoutSymbol,target);
}
for(const pair of Object.entries({
  '数':'Value','数値':'Value','係数':'Coefficient','各係数':'Each coefficient','各半径':'Each radius',
  '半径':'Radius','頭の数':'Number of heads','足の数':'Number of legs','少ない配り方':'Smaller share per person',
  '多い配り方':'Larger share per person','余る数':'Surplus','足りない数':'Deficit','増える倍率':'Growth factor',
  '倍率':'Multiplier','回数':'Number of steps','量りたい量':'Target amount','円の直径 d':'Diameter d',
  '円の半径 r':'Radius r','終了角':'Ending angle',
  '半径・半長軸 a':'Radius or semimajor axis a','半径・半短軸 b':'Radius or semiminor axis b',
  '弧の高さ':'Sagitta','目の高さ':'Eye height','回転軸から断面中心までの距離':'Distance from the axis to the tube center',
  '長さと幅の差':'Length minus width','幅と高さの和':'Width plus height','長軸と短軸の比':'Major-to-minor axis ratio',
  '条件':'Conditions','入力':'Input','項':'Terms','式':'Polynomial input','開く数':'Radicand',
  '求める位置':'Evaluation point','基準点x':'Base point x-coordinate','基準点y':'Base point y-coordinate',
  '傾き':'Slope','二次係数':'Quadratic coefficient','一次係数':'Linear coefficient','定数項':'Constant term',
  '円の中心x':'Circle center x-coordinate','円の中心y':'Circle center y-coordinate','初期値':'Initial value',
  '代入する値':'Evaluation point','次数':'Degree','法':'Modulus','項番号':'Term index',
  '大きい数 m':'Larger parameter m','小さい数 n':'Smaller parameter n',
  '中心 x':'Center x-coordinate','中心 y':'Center y-coordinate','左端':'Left endpoint','右端':'Right endpoint',
  '重複度':'Multiplicity','残す人数':'Number of survivors',
  '割る数':'Modulus','余り':'Remainder','係数・右辺':'Coefficients and right-hand sides',
  '座標・条件の数':'Coordinates and constraint values','条件の数':'Constraint values','根':'Root',
  'xの指数':'Exponent of x','yの指数':'Exponent of y'
}))validationLabels.set(...pair);
function validationLabel(source){
  const label=source.trim();
  if(validationLabels.has(label))return validationLabels.get(label);
  if(/^容器[A-C]$/.test(label))return `Capacity of vessel ${label.at(-1)}`;
  if(/^半径\s*\d+$/.test(label))return label.replace(/^半径\s*/,'Radius ');
  if(/^係数\s*\d+$/.test(label))return label.replace(/^係数\s*/,'Coefficient ');
  return label;
}

// Mathematical guards retain their specific reason and recovery guidance.
const validationCopy={
  '係数の入力が長すぎます。':'The coefficient input is too long.',
  '零多項式では割れません。':'Division by the zero polynomial is undefined.',
  '零多項式で割ることはできません。':'Division by the zero polynomial is undefined.',
  '多項式の割り切れ条件を満たしません。':'The polynomial division has a nonzero remainder where exact divisibility is required.',
  '0でない最高次係数を持つ1〜8次式にしてください。':'Enter a polynomial of degree 1–8 with a nonzero leading coefficient.',
  '根の分離に必要な計算量が上限を超えました。係数の尺度や共通因子を整理してください。未確認の解は表示しません。':'Root isolation exceeded the computation limit. Rescale the coefficients or simplify common factors. Unverified roots will not be displayed.',
  '根の個数の検算に失敗しました。':'The root-count verification failed.',
  '短い円弧を扱います。矢 c は直径 d の半分以下にしてください。':'This tool handles minor arcs. The sagitta c must not exceed half the diameter d.',
  '指定桁を確定できませんでした。未確定の値は表示しません。':'The requested digits could not be certified. Uncertified values will not be displayed.',
  '表示できる数値の範囲を超えました。':'The value exceeds the supported display range.',
  '平方根の中は0以上が必要です。':'The quantity under the square root must be non-negative.',
  '半径の最大と最小の比は10,000倍以内にしてください。':'The largest radius must be no more than 10,000 times the smallest.',
  '包み込む解の半径が成立しません。':'The candidate enclosing radius is not valid for this configuration.',
  '解の曲率が0に近すぎるため、小数で接触を確認できません。半径の比を変えてください。直線・平面になる正確な分数は入力できます。':'The solution curvature is too close to zero for a reliable numerical tangency check. Change the radius ratios. Exact fractional inputs that produce a line or plane are supported.',
  '接触条件の数値検算が成立しません。半径の比を変えてください。':'The numerical tangency check failed. Change the radius ratios.',
  'この4つの半径では、互いに外接する4球を配置できません。':'These four radii cannot form four mutually externally tangent spheres.',
  '同一平面の球配置が数値的に退化しています。':'The coplanar sphere configuration is numerically degenerate.',
  '4球の中心が同一平面に近すぎます。半径の比を変えてください。':'The four sphere centers are too nearly coplanar. Change the radius ratios.',
  '与えた4球の接触条件を確認できません。':'The tangency conditions for the four input spheres could not be verified.',
  '日球と月球の半径の和は、外球の半径以下にしてください。':'The sum of the Sun-sphere and Moon-sphere radii must not exceed the outer-sphere radius.',
  '日球と月球は、それぞれ外球の半径の1/1000以上にしてください。':'The Sun-sphere and Moon-sphere radii must each be at least 1/1000 of the outer-sphere radius.',
  '球の接触・非重複・閉鎖条件の検算が成立しません。':'Verification of the sphere tangencies, non-overlap, and closure conditions failed.',
  'mode と input を指定してください。':'Specify mode and input.',
  '有効なモードと入力オブジェクトが必要です。':'A valid mode and input object are required.',
  '多項式の割り戻しが一致しません。':'Multiplying back after polynomial division did not reproduce the original polynomial.',
  'xはすべて異なる値にしてください。':'All x-values must be distinct.',
  '補間条件の検算が一致しません。':'Verification of the interpolation conditions failed.',
  '因子分解の反復上限に達しました。':'The factorization iteration limit was reached.',
  '因子の検算が一致しません。':'Factor verification failed.',
  '係数が大きくなりすぎるため計算を停止しました。次数を下げるか、係数を簡単な数にしてください。':'Calculation stopped because the coefficients became too large. Lower the degree or simplify the coefficients.',
  '定数項は0、一次の係数は0以外にしてください。':'The constant term must be zero and the linear coefficient must be nonzero.',
  '逆級数の合成検算が一致しません。':'The composition check for the inverse series failed.',
  '円分多項式の対称性が一致しません。':'The cyclotomic polynomial failed the symmetry check.',
  '円分多項式への置換の検算が一致しません。':'The substitution check against the cyclotomic polynomial failed.',
  '三つの中心が一直線上、または非常に近い配置です。中心が作る三角形を広げてください。':'The three centers are collinear or nearly collinear. Widen the triangle formed by the centers.',
  '接円が一意に列挙できない退化した配置です。入力円を動かしてください。':'This degenerate configuration does not allow a uniquely determined list of tangent circles. Move the input circles.',
  '解の半径が表示範囲を超えています。配置を変えてください。':'The solution radius exceeds the display range. Change the configuration.',
  '接円の厳密な距離検算が一致しません。':'The exact distance check for the tangent circle failed.',
  '接円と入力円の半径差が小さく、内接の向きを十分な精度で判定できません。入力円を動かしてください。':'The tangent-circle and input-circle radii are too close to determine reliably which circle encloses the other. Move the input circles.',
  '接触距離の精度を確保できない解があります。入力円の位置や半径を近づけてください。':'Some solutions do not permit sufficiently accurate tangency-distance checks. Reduce the differences between the input circles’ positions or radii.',
  '順番の検算が一致しません。':'Verification of the counting-out order failed.',
  '方陣の検算が一致しません。':'Magic-square verification failed.',
  'mはnより大きくしてください。':'m must be greater than n.',
  '勾股の検算が一致しません。':'Verification of the right-triangle identity failed.',
  '近い地点の傾きは、遠い地点の傾きより大きくしてください。':'The slope from the nearer observation point must exceed the slope from the farther point.',
  '遠い地点からの検算が一致しません。':'The check using the farther observation point failed.',
  '異なる頂点を3〜30個にしてください。':'Enter 3–30 distinct vertices.',
  '頂点の重複があります。':'The vertex list contains duplicates.',
  '辺の折り返しや重なりがあります。':'Some edges double back or overlap.',
  '隣り合わない辺が交差・接触しています。':'Non-adjacent edges cross or touch.',
  '面積が0になる配置です。':'This configuration has zero area.',
  '高さは −R ≤ 下側 < 上側 ≤ R にしてください。':'The heights must satisfy −R ≤ lower height < upper height ≤ R.',
  '回転軸までの距離 R は断面半径 r 以上にしてください。':'The distance R to the axis of revolution must be at least the cross-sectional radius r.',
  '各辺は、ほかの二辺の和より小さくしてください。':'Each side must be shorter than the sum of the other two sides.',
  '非常に扁平な三角形です。安定した図と接触精度のため、各 (半周長−辺)/半周長 は 0.00000001 以上にしてください。':'The triangle is too flat for stable drawing and tangency checks. For each side, (semiperimeter − side)/semiperimeter must be at least 0.00000001.',
  '円が三角形の外へ出ています。':'A circle extends outside the triangle.',
  'この細長い配置では十分な接触精度を確保できません。辺の比を近づけてください。':'This slender configuration does not allow sufficiently accurate tangency checks. Use more similar side lengths.',
  '各行は2〜6個の未知数の係数と右辺。すべて同じ個数にしてください。':'Each row must contain the coefficients of 2–6 unknowns followed by the right-hand side. All rows must have the same number of entries.',
  '解の再代入に失敗しました。':'Substitution of the solution into the original equations failed verification.',
  '自由変数の検算に失敗しました。':'Verification of the free-variable directions failed.',
  '少なくとも一方は零多項式以外にしてください。':'At least one input polynomial must be nonzero.',
  '共通因子の検算に失敗しました。':'Verification of the common factor failed.',
  '負の数の偶数乗根は実数ではありません。':'An even root of a negative number is not real.',
  '逆向きの転位の検算に失敗しました。':'The inverse-shift verification failed.',
  '分母の定数項は0以外にしてください。':'The denominator’s constant term must be nonzero.',
  '級数を掛け戻す検算に失敗しました。':'Multiplying the series back did not reproduce the required coefficients.',
  '左端は右端より小さくしてください。':'The left endpoint must be less than the right endpoint.',
  '弧の高さは直径以下にしてください。':'The sagitta must not exceed the diameter.',
  '開始角は終了角以下にしてください。':'The starting angle must not exceed the ending angle.',
  '円の接触条件の検算に失敗しました。':'Verification of the circle tangency conditions failed.',
  'どの一辺も、残り三辺の和より小さくしてください。':'Each side must be shorter than the sum of the other three sides.',
  '三辺が三角形を作れない面があります。':'At least one face has edge lengths that cannot form a triangle.',
  '各面の三角形条件だけでは足りません。この六辺を持つ実数の四面体は作れません。':'The face triangle inequalities alone are not sufficient. These six edge lengths cannot form a real tetrahedron.',
  '足は頭の数の2倍〜4倍で、偶数にしてください。鶴と亀の数が整数になりません。':'The leg count must be even and between twice and four times the head count. Otherwise, valid integer counts of cranes and turtles cannot be obtained.',
  '1人に配る数は正の整数で、多い配り方を少ない配り方より大きくしてください。':'Both per-person shares must be positive integers, and the larger share must exceed the smaller share.',
  'この条件では人数が正の整数になりません。余りと不足を確認してください。':'These conditions do not give a positive integer number of people. Check the surplus and deficit.',
  '三角形になりません。どの2辺の和も、残りの1辺より大きくしてください。':'These sides do not form a triangle. The sum of any two sides must exceed the third side.',
  'この細さは表示範囲外です。辺の尺度を変更してください。':'The triangle is too thin for the supported display range. Rescale the sides.',
  'A,B,C,D,E,Fの6係数で二次曲線を入力してください。':'Enter the conic using its six coefficients A, B, C, D, E, F.',
  '二本の直線などに退化する二次曲線は対象外です。非退化な円・楕円・双曲線・放物線を入力してください。':'Degenerate conics, such as pairs of lines, are not supported. Enter a nondegenerate circle, ellipse, hyperbola, or parabola.',
  '基準点が二次曲線上にありません。':'The base point does not lie on the conic.',
  '基準点が特異点です。通常の有理媒介式を定められません。':'The base point is singular, so the standard rational parametrization cannot be constructed.',
  '媒介式の代入検算が一致しません。':'The substitution check for the parametrization failed.',
  '交点の検算が一致しません。':'Intersection verification failed.',
  '放物線の二次係数は0以外にしてください。':'The parabola’s quadratic coefficient must be nonzero.',
  '左端より大きい右端を入力してください。':'Enter a right endpoint greater than the left endpoint.',
  '因子は10行以内です。':'Enter at most 10 rows of factors.',
  '各行に根rと重複度mを入力してください。':'Enter a root r and its multiplicity m on each row.',
  '分母の合計次数は10以下にしてください。':'The total degree of the denominator must not exceed 10.',
  '同じ根は一行にまとめてください。':'Combine repeated entries for the same root into one row.',
  '部分分数の復元が一致しません。':'Recombining the partial fractions did not reproduce the original expression.',
  '途中の分数が約300桁を超えました。係数や次数を小さくしてください。':'An intermediate fraction exceeded approximately 300 digits. Reduce the coefficients or degree.',
  '係数の絶対値は100万以下にしてください。':'Each coefficient must have absolute value at most 1,000,000.',
  'この条件では一意な正規化解が定まりません。次数や係数を変えてください。':'These conditions do not determine a unique normalized solution. Change the degree or coefficients.',
  '係数の分母をそろえる計算が上限を超えました。':'Computing a common denominator for the coefficients exceeded the calculation limit.',
  '根を分離する整数係数が10の18乗を超えました。係数の分母や尺度を整理してください。':'The integer coefficients required for root isolation exceed 1,000,000,000,000,000,000 in absolute value. Simplify the denominators or rescale the coefficients.',
  '十分な精度で極大を計算できません。':'The maximum could not be computed with sufficient accuracy.',
  '軸の比は1より大きくしてください。':'The axis ratio must be greater than 1.',
  '楕円と辺の接触を十分な精度で確認できません。':'Tangency between the ellipses and the sides could not be verified with sufficient accuracy.',
  '正の面積比を2〜20個入力してください。':'Enter 2–20 positive area weights.',
  '各面積比は全体の1億分の1以上にしてください。':'Each area share must be at least one hundred-millionth of the total.',
  '指定した面積比を十分な精度で分割できません。':'The requested area ratios could not be achieved with sufficient accuracy.',
  'Pell方程式の検算が一致しません。':'Verification of the Pell equation failed.',
  '三角形の面積検算が一致しません。':'Verification of the triangle’s area failed.',
  '三角形を作れる三辺にしてください。':'Enter three side lengths that form a triangle.',
  '非常に扁平な三角形では接触精度を確保できません。':'The triangle is too flat for sufficiently accurate tangency checks.',
  '二次式の根が近く、この配置は安定して分離できません。':'The quadratic roots are too close to distinguish the configurations reliably.',
  '指定した接触配置を十分な精度で確認できません。三辺の比を変えてください。':'The specified tangency configuration could not be verified with sufficient accuracy. Change the side-length ratios.',
  '定数項は1にしてください。':'The constant term must be 1.',
  '級数の微分関係の検算が一致しません。':'Verification of the series differential identity failed.',
  '項は16行以内です。':'Enter at most 16 rows of terms.',
  '指定した初期値がF(0,y₀)=0を満たしません。':'The specified initial value does not satisfy F(0,y₀)=0.',
  'この初期値ではFのy微分が0です。通常の冪級数として枝を一意に決められません。':'The y-derivative of F is zero at this initial value. A unique ordinary power-series branch cannot be determined.',
  '元の方程式への代入検算が一致しません。':'Substitution into the original equation failed verification.',
  '分子次数＋分母次数＋1個以上の係数を入力してください。':'Enter at least as many series coefficients as numerator degree + denominator degree + 1.',
  '係数一致の検算が失敗しました。':'Verification of coefficient agreement failed.',
  '係数と初期値は同じ個数にしてください。':'Enter the same number of recurrence coefficients and initial values.',
  '漸化式の係数・初期値は整数にしてください。':'The recurrence coefficients and initial values must be integers.',
  '整数が約1200桁を超えました。項番号を小さくするか、法を指定してください。':'An integer exceeded approximately 1,200 digits. Reduce the term index or specify a modulus.',
  '式の入力は1400文字以内です。':'Keep the polynomial input within 1,400 characters.',
  '各行は x の2次以下。係数は−1000〜1000の整数を最高次から並べてください。':'Each row must be a polynomial in x of degree at most 2. Enter integer coefficients from −1000 to 1000 in descending order of degree.',
  'y の次数が1〜4の式を入力してください。':'Enter a polynomial of degree 1–4 in y.',
  '換式の次数を下げる検算に失敗しました。':'Verification of the degree reduction in the elimination expressions failed.',
  '換式とシルベスター行列式の照合に失敗しました。':'The elimination expression did not agree with the Sylvester determinant.',
  '和が整数になる条件の検算に失敗しました。':'Verification that the sum is an integer failed.',
  '和の多項式の差分検算に失敗しました。':'Verification of the sum polynomial’s finite-difference identity failed.',
  '区間計算の符号条件に反しました。':'A sign condition required for the interval calculation was violated.',
  '下界を正にできませんでした。項数を増やしてください。':'A positive lower bound could not be established. Increase the number of terms.',
  '2回の反転で元へ戻る検算に失敗しました。':'The check that two inversions restore the original figure failed.',
  'd は0以上、内円は外円の内側に離して置きます（d+r<R）。':'d must be non-negative, and the inner circle must lie strictly inside the outer circle without touching it (d+r<R).',
  '開始角は0〜360度にしてください。':'The starting angle must be from 0° to 360°.',
  '安定して図示するため、r≥R/1,000,000、円の間隔 R−d−r≥R/10,000,000 としてください。':'For a stable diagram, require r≥R/1,000,000 and a gap of R−d−r≥R/10,000,000 between the circles.',
  '中心座標と接触の数値検算が安定しません。円の間隔を広げてください。':'The numerical checks of centers and tangencies are unstable. Increase the gap between the circles.',
  '閉鎖条件は成立しますが、配置の数値検算が安定しません。':'The closure condition holds, but numerical verification of the configuration is unstable.',
  '分母を 0 にはできません。':'The denominator must not be zero.',
  '1つの数は100文字以内で入力してください。':'Enter each number using no more than 100 characters.',
  '数値を入力してください。':'Enter a numerical value.',
  '指数が大きすぎます。':'The exponent is too large.',
  '式の計算途中の値が小さすぎて、小数で表示できません。係数や変数の尺度を変更してください。':'An intermediate value is too small for decimal display. Rescale the coefficients or variables.',
  '式の計算結果が表示できる範囲を超えました。':'The calculation result exceeds the supported display range.',
  '刻み幅 h を 0 にはできません。':'The step size h must not be zero.',
  '係数は全体で1400文字以内で入力してください。':'Keep the complete coefficient input within 1,400 characters.',
  '0でない最高次係数を持つ1次以上の式を入力してください。':'Enter a polynomial of degree at least 1 with a nonzero leading coefficient.',
  '両端の符号が同じです。符号が変わる区間に変更してください。重根などはこの方法では検出できない場合があります。':'The endpoint values have the same sign. Choose an interval whose endpoint values have opposite signs. This method may not detect repeated roots.',
  '割る数は2以上にしてください。':'Each modulus must be at least 2.',
  'n は0以上の整数で指定してください。':'n must be a non-negative integer.'
};
for(const pair of Object.entries(validationCopy))exact.set(...pair);


// Labels and parameterized messages also occur in individual DOM text nodes.
for(const [source,target] of Object.entries({
  '実根はありません':'No real roots',
  '接する平面':'Tangent plane',
  '平面':'Plane',
  '非零定数なので、共通解はありません。':'The resultant is a nonzero constant, so there is no common solution.',
  '整数の剰余演算':'Exact modular arithmetic',
  "接線の傾き：第2の点は基準点に重なります":"The line is tangent: the second point coincides with the base point.",
  "この傾きでは第2の有限交点がありません。別の傾きを入力してください。":"There is no second finite intersection for this slope. Enter a different slope.",
  "この直線全体が曲線に含まれ、第2の交点を一つに定められません。":"The entire line lies on the curve, so there is no unique second intersection.",
  "この点は分母が0です":"The denominator is zero at this point.",
  "分母が0の点では値を表示しません。":"No value is displayed where the denominator is zero.",
  "非零定数なので、2式に共通する根はありません。":"The resultant is a nonzero constant, so the two equations have no common root.",
  "y の次数が高い方を前式 f として入れ替えました。":"The inputs have been swapped so that f has the higher degree in y.",
  "この配置には正の半径の接円がありません":"This configuration has no tangent circle with a positive radius.",
  "負の曲率は全体を包む境界を表します。":"Negative curvature denotes an enclosing boundary.",
  "指定幅には到達していません。":"The requested interval width has not been reached.",
  "直角に交わる円柱の共通体積":"Intersection volume of perpendicular cylinders"
}))exact.set(source,target);

const rules=[
  ...heritageRules,
  [/^(\d+) 個$/,(m,n)=>counted(n,'solution')],
  [/^鶴 (.+)羽$/,(m,n)=>counted(n,'crane')],
  [/^亀 (.+)匹$/,(m,n)=>counted(n,'turtle')],
  [/^中心 \((.+)\)$/,'Center ($1)'],
  [/^≤ (\d+)乗根 <$/,(m,n)=>`≤ ${ordinal(n)} root <`],
  [/^反転の中心は原点、半径 k=(.+)。点 P の像は k²P\/\|P\|²。$/,'The center of inversion is the origin, with radius k=$1. The image of point P is k²P/|P|².'],
  [/^分子 A\(x\)=(.+)。$/,'Numerator A(x)=$1.'],
  [/^連分数の商：\[(.*)\]$/,'Continued-fraction quotients: [$1]'],
  [/^a\((.+)\) を (.+) で割った余り$/,'Remainder of a($1) divided by $2'],
  // This character is a list separator in the shared engines, not the mathematical dot (·).
  [/^[-−]?\d+(?:\.\d+|\/\d+)?(?:e[+-]?\d+)?(?:・[-−]?\d+(?:\.\d+|\/\d+)?(?:e[+-]?\d+)?)+$/i,text=>text.replaceAll('・',', ')],

  [/^(.+)は\s*(\d+)文字以内(?:で入力してください|にしてください)。$/,(m,label,limit)=>`Use no more than ${limit} characters for “${validationLabel(label)}”.`],
  [/^(.+)の絶対値は(.+)以下にしてください。$/,(m,label,limit)=>`The absolute value of “${validationLabel(label)}” must be at most ${limit}.`],
  [/^(.+)は浮動小数で扱うには小さすぎます。$/,(m,label)=>`The value for “${validationLabel(label)}” is too small for floating-point arithmetic.`],
  [/^(.+)は\s*([^〜]+?)\s*〜\s*(.+?)\s*の整数(?:で入力してください|にしてください)。$/,(m,label,min,max)=>`Enter an integer from ${min} to ${max} for “${validationLabel(label)}”.`],
  [/^(.+)は\s*([^〜]+?)\s*〜\s*(.+?)\s*の整数・小数・分数で入力してください。$/,(m,label,min,max)=>`Enter an integer, decimal, or fraction from ${min} to ${max} for “${validationLabel(label)}”.`],
  [/^(.+)は\s*([^〜]+?)\s*〜\s*(.+?)\s*(?:の数を入力してください|で入力してください|にしてください)。$/,(m,label,min,max)=>`Enter a value from ${min} to ${max} for “${validationLabel(label)}”.`],
  [/^(.+)は整数で指定してください。$/,(m,label)=>`Enter an integer for “${validationLabel(label)}”.`],
  [/^(.+)は(\d+)桁以内の(0以上の)?整数で入力してください。$/,(m,label,digits,nonnegative)=>`Enter ${nonnegative?'a non-negative':'an'} integer of no more than ${digits} digits for “${validationLabel(label)}”.`],
  [/^係数は最高次から、(\d+)個以内の整数で入力してください。$/,(m,count)=>`Enter no more than ${counted(count,'integer coefficient')}, in descending order of degree.`],
  [/^各係数の絶対値は(.+)以下にしてください。$/,'Each coefficient must have absolute value at most $1.'],
  [/^係数は(\d+)文字以内の整数・小数・分数にしてください。$/,(m,limit)=>`Enter each coefficient as an integer, decimal, or fraction using no more than ${limit} characters.`],
  [/^係数は(\d+)個以内で入力してください。$/,(m,count)=>`Enter no more than ${counted(count,'coefficient')}.`],
  [/^係数は(\d+)個以内、各(\d+)文字以内で入力してください。$/,(m,count,chars)=>`Enter no more than ${counted(count,'coefficient')}, each using at most ${chars} characters.`],
  [/^(\d+)〜(\d+)行で入力してください。$/,(m,min,max)=>min===max?`Enter exactly ${counted(min,'row')}.`:`Enter ${min}–${max} rows.`],
  [/^(\d+)行目は(\d+)個の数にしてください。$/,(m,row,count)=>`Row ${row} must contain ${counted(count,'number')}.`],
  [/^(\d+)行目は x、値、傾き の3個にしてください。$/,'Row $1 must contain exactly three values: x, function value, and slope.'],
  [/^(\d+)行目は「割る数, 余り」の2つを入力してください。$/,'Row $1 must contain two values: modulus and remainder.'],
  [/^(\d+)行目の条件が、それまでの条件と矛盾しています。共通する整数解はありません。$/,'Condition $1 conflicts with the preceding conditions; there is no common integer solution.'],
  [/^(\d+)〜(\d+)次の(?:多項式|式)にしてください。$/,'Enter a polynomial of degree $1–$2.'],
  [/^必須の文字列キー：(.+)$/,'Required string-valued key: $1'],
  [/^(.+)を入力してください。$/,(m,label)=>`Enter a value for “${validationLabel(label)}”.`],
  [/^和算 計算室｜(.+)$/,'WASAN Mathematics Laboratory | $1'],[/^入力：(.*)$/,'Input: $1'],[/^結果：(.*)$/,'Result: $1'],
  [/^(.+)｜和算 WASAN 計算室$/,'$1 | WASAN Mathematics Laboratory'],[/^(.+)｜和算 WASAN$/,'$1 | WASAN'],
  [/^(\d[\d,]*)角形$/,'$1-gon'],[/^図は96角形で表示 \/ 計算は([\d,]+)角形$/,'Drawing: 96-gon / calculation: $1-gon'],[/^円と内外接(\d+)角形。計算には([\d,]+)角形を使用。$/,'Circle with inscribed and circumscribed $1-gons; the calculation uses a $2-gon.'],
  [/^半径(.+)と(.+)の円と直線の隙間に、半径(.+)の円が接しています。$/,'A circle of radius $3 is tangent in the gap between circles of radii $1 and $2 and their common line.'],
  [/^a = (.+)、b = (.+) と同じ単位$/,'a = $1 and b = $2, in the same unit'],
  [/^大きい2円の接点間距離：(.+)$/,'Distance between the two original points of contact: $1'],[/^隙間で分ける：(.+)$/,'Split the distance across the gap: $1'],[/^√r で括る：(.+)$/,'Factor out √r: $1'],[/^中心間距離と半径の和の最大差：(.+)（浮動小数での検算）$/,'Largest difference between center distance and sum of radii: $1 (floating-point check)'],
  [/^([\d,]+)角形 \/ 範囲の幅 (.+)$/,'$1-gon / interval width $2'],[/^3つの連続する内接値を a, b, c として、(.+)。この変換は現代では Aitken の Δ² 法としても知られます。$/,'For three successive inscribed values a, b, and c, use $1. This transformation is also known as Aitken’s Δ² process.'],
  [/^t = (.+) \/ 零多項式( \/ 外挿)?$/,(m,t,extra)=>`t = ${t} / zero polynomial${extra?' / extrapolation':''}`],[/^t = (.+) \/ 補間多項式の次数 (\d+)( \/ 外挿)?$/,(m,t,n,extra)=>`t = ${t} / interpolating polynomial degree ${n}${extra?' / extrapolation':''}`],[/^t = (.+) \/ interpolating polynomial degree (\d+) \/ 外挿$/,'t = $1 / interpolating polynomial degree $2 / extrapolation'],[/^Δ(\d+)$/,'Δ$1'],[/^最終区間：\[(.+), (.+)\]。幅 ([^。\n]+)。(.+)$/,(match,lower,upper,width,reason)=>`Final interval: [${lower}, ${upper}]. Width ${width}. ${translateEnglishText(reason)}`],
  [/^f\(x\) ≈ (.+) \/ (\d+)回の区間分割( \/ 指定幅に未到達)?$/,(m,value,count,warning)=>`f(x) ≈ ${value} / ${count} bisection steps${warning?' / requested width not reached':''}`],
  [/^すべての整数解：(.+) \+ (.+) × k（k は整数）$/,'All integer solutions: $1 + $2 × k, where k is an integer'],[/^再代入：(.+)$/,'Substitution check: $1'],
  [/^n = (.+)、p = (.+) \/ 空の和$/,'n = $1, p = $2 / empty sum'],[/^n = (.+)、p = (.+) \/ (.+)$/,'n = $1, p = $2 / $3'],
  [/^最初の(\d+)段を表示。全(\d+)段は「途中式を読む」で確認できます。$/,(m,shown,total)=>`Showing the first ${counted(shown,'step')}. Open “Show the steps” for all ${counted(total,'step')}.`],
  [/^指定した区間内の実数解 x$/,'Real root x in the selected interval'],[/^全角数字も入力できます。$/,'Full-width digits are accepted.'],

  [/^鶴 (.+)羽\n亀 (.+)匹$/,(m,cranes,turtles)=>`${counted(cranes,'crane')}\n${counted(turtles,'turtle')}`],
  [/^頭 (.+)、足 (.+)$/,(m,heads,legs)=>`${counted(heads,'head')}, ${counted(legs,'leg')}`],
  [/^全部を鶴と考えると、足は (.+) × 2 = (.+) 本。$/,(m,animals,legs)=>`If all ${counted(animals,'animal')} were cranes, they would have ${animals} × 2 = ${counted(legs,'leg')}.`],
  [/^実際との差は (.+) − (.+) = (.+) 本。$/,'The difference from the actual total is $1 − $2 = $3 legs.'],
  [/^鶴を亀に替えると2本増えるので、亀は (.+) ÷ 2 = (.+) 匹。$/,(m,difference,turtles)=>`Replacing a crane with a turtle adds two legs, so ${difference} ÷ 2 = ${counted(turtles,'turtle')}.`],
  [/^検算：(.+) \+ (.+) = (.+)、2 × (.+) \+ 4 × (.+) = (.+)。$/,'Check: $1 + $2 = $3, and 2 × $4 + 4 × $5 = $6.'],
  [/^(.+)人$/,(m,value)=>counted(value,'person','people')],[/^品物の合計 (.+)個$/,(m,value)=>`${counted(value,'item')} in all`],[/^(.+)個ずつ$/,'$1 each'],
  [/^余りと不足を合わせる：(.+) \+ (.+) = (.+)。$/,'Combine the surplus and the shortfall: $1 + $2 = $3.'],
  [/^1人分の差：(.+) − (.+) = (.+)。$/,'Difference per person: $1 − $2 = $3.'],
  [/^人数：(.+) ÷ (.+) = (.+)。$/,'Number of people: $1 ÷ $2 = $3.'],
  [/^品物：(.+) × (.+) \+ (.+) = (.+)。$/,'Number of items: $1 × $2 + $3 = $4.'],
  [/^(.+) から、(.+)倍を (.+)回$/,(m,initial,factor,times)=>`Start at ${initial} and multiply by ${factor} for ${counted(times,'step')}.`],
  [/^0回目は (.+)。$/,'At step 0, the value is $1.'],[/^次の数 = 今の数 × (.+)。$/,'Next value = current value × $1.'],
  [/^最後の数 = (.+) × (.+)\^(.+) = (.+)。$/,'Final value = $1 × $2^$3 = $4.'],
  [/^(.+)回$/,(m,value)=>counted(value,'step')],[/^いずれかの容器に (.+) を量る最短の注ぎ回数$/,'Fewest pours needed to measure $1 in any one container'],
  [/^初めは A に (.+)、B と C は空。$/,'Begin with $1 in A; B and C are empty.'],
  [/^最後の量：(.+)。合計は常に (.+)。$/,'Final amounts: $1. Their total remains $2 throughout.'],
  [/^この容器と注ぎ方では (.+) を量れません。$/,'The target amount $1 cannot be measured with these containers and pouring rules.'],
  [/^半周 s = \(a \+ b \+ c\) ÷ 2 = (.+)。$/,'Semiperimeter s = (a + b + c) ÷ 2 = $1.'],
  [/^面積の平方 = s\(s−a\)\(s−b\)\(s−c\) = (.+)。$/,'Area squared = s(s−a)(s−b)(s−c) = $1.'],
  [/^面積 = √\((.+)\) ≈ (.+)。$/,'Area = √($1) ≈ $2.'],
  [/^(.+) ≤ ∛N < (.+)（指定桁で切り捨て）$/,'$1 ≤ ∛N < $2 (truncated to the requested precision)'],
  [/^y を消去した (.+)次式。実数の候補は元の2式への代入が必要です。$/,'A degree-$1 polynomial obtained by eliminating y. Candidate real roots must be checked in the two original equations.'],
  [/^(.+)個の異なる実根$/,(m,value)=>`${value} distinct real ${countIsOne(value)?'root':'roots'}`],[/^次数 (.+) ／ 重複を数えた実根 (.+)個$/,(m,degree,count)=>`Degree ${degree} / ${counted(count,'real root')} counted with multiplicity`],
  [/^式：(.+) = 0。$/,'Equation: $1 = 0.'],[/^全実根は \(−(.+), (.+)\) にあります。$/,'All real roots lie in (−$1, $2).'],
  [/^(.+)回の区間分割で、各区間を1根ずつに分離しました。$/,(m,value)=>`${counted(value,'interval subdivision')} ${countIsOne(value)?'isolates':'isolate'} one root in each interval.`],
  [/^(.+)項の級数から得た円弧長の厳密な包含区間$/,'Certified enclosure for the arc length from a $1-term series'],
  [/^z=c\/d=(.+)。弧長の平方を s²=4d² Σ tₙ と表します。$/,'Set z=c/d=$1 and write the squared arc length as s²=4d² Σ tₙ.'],
  [/^残りの項の和は (.+) より小さい（正項かつ項比<z）。$/,'The sum of the remaining terms is less than $1 (all terms are positive and the term ratio is <z).'],
  [/^小数(.+)桁を切り捨てで確定 ／ (.+)項$/,(m,places,terms)=>`${counted(places,'decimal place')} certified by truncation / ${counted(terms,'term')}`],
  [/^半径 (.+)$/,'Radius $1'],[/^表示：解(.+)。2つの解は別々の配置です。(.*)$/,(m,n,tail)=>`Showing solution ${n}. The two solutions are separate configurations.${tail?' Negative curvature represents a boundary enclosing the entire configuration.':''}`],
  [/^(.+)（包囲）$/,'$1 (enclosing boundary)'],
  [/^接触24組・非隣接9組を検算 ／ 閉鎖誤差\/R (.+)$/,'Checked 24 tangencies and 9 non-adjacent pairs / closure residual divided by R: $1'],
  [/^最大接触誤差\/R：(.+)。非隣接球の最小の隙間\/R：(.+)。$/,'Maximum tangency residual / R: $1. Minimum gap between non-adjacent spheres / R: $2.'],
  [/^1\^(.+) から (.+)\^(.+) までの厳密な和$/,'Exact sum from 1^$1 through $2^$3'],
  [/^表は p≤(.+)、q≤(.+) の部分。指定した指数の答えは上の結果です。$/,'The table shows the portion with p≤$1 and q≤$2; the result for the requested exponents appears above.'],
  [/^(.+)項 ／ 楕円の周長の保証された区間$/,(m,value)=>`${counted(value,'term')} / certified interval for the perimeter of the ellipse`],
  [/^(.+)項 ／ 直角に交わる円柱の共通体積の保証された区間$/,(m,value)=>`${counted(value,'term')} / certified interval for the common volume of two perpendicular cylinders`],
  [/^大きい半径・半長軸 a=(.+)、小さい半径・半短軸 b=(.+)。m=(.+)。$/,'Major radius or semimajor axis a=$1; minor radius or semiminor axis b=$2. m=$3.'],
  [/^正の残差は \(N\+2\)t_\(N\+1\) 以下。m<1 では t_\(N\+1\)\/\(1−m\) と比べ小さい上限を使います。N=(.+)。$/,'The positive remainder is at most (N+2)t_(N+1). When m<1, the smaller of this bound and t_(N+1)/(1−m) is used. N=$1.'],
  [/^区間の幅：(.+)。表示24桁すべてが確定桁という意味ではありません。$/,'Interval width: $1. This does not mean that all 24 displayed decimal places are certified digits.'],
  [/^(.+)次の必要条件。最高次係数が消える x と、実数の y の存在は元の式で確認します。$/,'A necessary condition of degree $1. Values of x that make a leading coefficient vanish, and the existence of a real y, must be checked in the original equations.'],
  [/^前式の y 次数 n=(.+)、後式 m=(.+)。係数 aⱼ,bⱼ は x の多項式です。$/,'The degree in y is n=$1 for f and m=$2 for g. The coefficients aⱼ and bⱼ are polynomials in x.'],
  [/^(.+)×(.+) の換式行列の行列式：(.+)。$/,'Determinant of the $1×$2 elimination matrix: $3.'],
  [/^(.+)×(.+) のシルベスター行列式とも、符号 \(−1\)\^\(nm\) を含め厳密に一致しました。$/,'It agrees exactly with the $1×$2 Sylvester determinant, including the sign factor (−1)^(nm).'],
  [/^最高次係数 aₙ\(x\)=(.+)、bₘ\(x\)=(.+)。これらが消える候補では、次数が落ちて見かけの解が出ることがあります。$/,'The leading coefficients are aₙ(x)=$1 and bₘ(x)=$2. At candidate values where either vanishes, a drop in degree can produce an extraneous solution.'],
  [/^中心 \((.+), (.+)\)\n半径 (.+)$/,'Center ($1, $2)\nRadius $3'],
  [/^(.+)円で閉鎖（条件は厳密）$/,'Closes after $1 circles (exact condition)'],[/^(.+)円で閉鎖（数値判定）$/,'Closes after $1 circles (numerical test)'],[/^(.+)円では一周の輪が閉じません$/,'A one-revolution ring does not close with $1 circles'],
  [/^戻り位置 (.+)$/,'Return position $1'],[/^閉鎖を決める量 C=\(R²\+r²−d²\)\/\(2Rr\)=(.+)。$/,'The closure parameter is C=(R²+r²−d²)/(2Rr)=$1.'],
  [/^同心円へ移したときの1歩 δ=(.+)度。1周に必要な個数 (?:2π|360°)\/δ≈(.+)。$/,'After transforming the two boundary circles into concentric circles, the angular step is δ=$1 degrees, so 360°/δ≈$2 circles are needed for one revolution.'],
  [/^nδ−360°=(.+)度。必要な個数を丸めて閉鎖と判定することはありません。$/,'nδ−360°=$1 degrees. Closure is not decided by rounding the required number of circles.'],
  [/^n=(.+) では C=(.+) が厳密な閉鎖条件。今回の分数による判定：(一致|不一致)。$/,(m,n,c,result)=>`For n=${n}, C=${c} is the exact closure condition. Exact fractional test for this input: ${result==='一致'?'satisfied':'not satisfied'}.`],
  [/^生成した各円の内外接と次の円との接触：最大誤差\/R=(.+)。$/,'Tangency of every generated circle to both boundaries and to the next circle: maximum residual / R=$1.'],
  [/^最後と最初の接触誤差\/R=(.+)。独立に生成した(.+)番目と最初の中心・半径の差\/R=(.+)。$/,'Tangency residual between the last and first circles / R=$1. Difference between the independently generated circle $2 and the first in center and radius / R=$3.'],
  [/^非隣接(.+)組と最初・最後の円の重なり：(検出なし|あり)。最小すき間\/R=(.+)。$/,(m,n,state,gap)=>`Overlap among ${n} non-adjacent pairs and the first and last circles: ${state==='検出なし'?'none detected':'detected'}. Minimum gap / R=${gap}.`],
  [/^正(.+)角形の一辺 ／ 外接円の半径 (.+)$/,'Side length of a regular $1-gon / circumradius $2'],[/^t=2cos\(2π\/(.+)\) と置きます。$/,'Set t=2cos(2π/$1).'],
  [/^係数行列の階数 (.+) ／ 未知数 (.+)個$/,'Coefficient-matrix rank $1 / $2 unknowns'],
  [/^x(.+) の係数を1にし、他の行から消去。$/,'Scale the pivot coefficient of x$1 to 1, then eliminate x$1 from the other rows.'],
  [/^特解：\((.+)\)。$/,'Particular solution: ($1).'],[/^任意の実数 t(.+) × \((.+)\) を足せます。$/,'Add any real multiple t$1 × ($2).'],
  [/^共通因子の次数 (.+)。最高次係数を1にそろえています。$/,'The common factor has degree $1 and has been normalized to leading coefficient 1.'],
  [/^(.+)行のシルベスター行列式から終結式を計算。$/,'Compute the resultant from the determinant of the $1×$1 Sylvester matrix.'],
  [/^重複を含む(.+)個の根の(.+)乗和$/,(m,count,power)=>`Sum of the ${ordinal(power)} powers of the ${count} roots, counted with multiplicity`],
  [/^(.+)\n≤ (.+)乗根 <\n(.+)$/,(m,lower,degree,upper)=>`${lower}\n≤ ${ordinal(degree)} root <\n${upper}`],[/^対象：(.+) の実数の(.+)乗根。$/,(m,value,degree)=>`Target: the real ${ordinal(degree)} root of ${value}.`],
  [/^x = u \+ \((.+)\) と置いた式$/,'Polynomial after setting x = u + ($1)'],[/^元の式：(.+)。$/,'Original polynomial: $1.'],
  [/^x\^(.+)まで。これより高い次数の項は省略。$/,'Through x^$1; higher-degree terms are omitted.'],[/^分母 B\(x\)=(.+)。$/,'Denominator B(x)=$1.'],
  [/^円の半径 R=(.+)、弦から円弧までの高さ h=(.+)。$/,'Circle radius R=$1; sagitta from the chord to the arc h=$2.'],
  [/^x=a cos t、y=b sin t ／ (.+)° から (.+)°$/,'x=a cos t, y=b sin t / $1° to $2°'],
  [/^(.+)分割し、それぞれの速度の最小・最大から挟み込みます。$/,'Divide the interval into $1 parts and bound each one using the minimum and maximum speed.'],
  [/^下界 ≈ (.+)、上界 ≈ (.+)。数学上の上下界を小数で近似表示しています。$/,'Lower bound ≈ $1; upper bound ≈ $2. These are decimal approximations to mathematical bounds.'],
  [/^区間 \[(.+), (.+)\] を x 軸のまわりに回した体積$/,'Volume obtained by revolving the region between y=P(x) and the x-axis over [$1, $2] about the x-axis'],
  [/^(.+)番目の円の半径 ／ 原点は大きい半円の左端$/,'Radius of circle $1 / origin at the left end of the large semicircle'],
  [/^大きい半円の半径 R=a\+b=(.+)。左の内円中心は\(a,0\)、最初の右の内円はn=0。$/,'The large semicircle has radius R=a+b=$1. The left inner circle is centered at (a,0), and the first right inner circle is indexed n=0.'],
  [/^辺は順に AB=(.+)、BC=(.+)、CD=(.+)、DA=(.+)。$/,'The sides in order are AB=$1, BC=$2, CD=$3, and DA=$4.'],
  [/^半周 s=(.+)、面積²=\(s−a\)\(s−b\)\(s−c\)\(s−d\)=(.+)。$/,'Semiperimeter s=$1, and area²=(s−a)(s−b)(s−c)(s−d)=$2.'],
  [/^Gram行列式=(.+)。体積²=det\(G\)\/36=(.+)。$/,'Gram determinant=$1. Volume²=det(G)/36=$2.'],
  [/^全(.+)人から(.+)人を残す$/,'Keep $2 of $1 people'],[/^(.+)×(.+)の方陣：どの縦・横・二本の対角線もこの和$/,'$1×$2 magic square: every row, column, and main diagonal has this sum'],
  [/^(.+)列$/,'Column $1'],[/^1から(.+)までを一度ずつ配置。$/,'Place each integer from 1 through $1 exactly once.'],
  [/^分母 (.+) 以下で、入力した数との差が最小$/,'Closest value to the input with denominator at most $1'],[/^連分数の商：\[(.*)\]（上限に達した段まで）$/,'Continued-fraction quotients: [$1] (through the stage at which the bound is reached)'],[/^入力値との差：(.+)$/,'Difference from the input: $1'],
  [/^符号付き面積の2倍：(.+)$/,'Twice the signed area: $1'],[/^面積重心 = \((.+)\)。一様な厚さ・密度の図形を想定。$/,'Area centroid = ($1), assuming uniform thickness and density.'],
  [/^A=\(0,0\)、B=\((.+),0\)、Cは上側に配置。$/,'Place A=(0,0), B=($1,0), and C above the baseline.'],
  [/^互いの外接・各円と二辺の接触を距離で検算。最大相対残差：(.+)$/,'Check mutual external tangency and each circle’s tangency to two sides by distance. Maximum relative residual: $1'],
  [/^二乗する前の距離式で全解を再検算。最大相対残差：(.+)$/,'Recheck every solution in the unsquared distance equations. Maximum relative residual: $1'],
  [/^差の原点は円1の中心 \((.+)\)。大きな座標中の小さなずれは、差の列を使ってください。$/,'Offsets are measured from the center of circle 1 at ($1). Use the offset column to read small displacements within large coordinates.'],
  [/^P\((.+)\) ／ 次数 (.+)$/,'P($1) / degree $2'],[/^全(.+)点の値と傾きを元の条件へ再代入し、一致を確認。$/,'Substitution verifies the values and slopes at all $1 input points.'],
  [/^元の最高次係数：(.+)$/,'Original leading coefficient: $1'],[/^(.+)次までの合成逆 g\(x\)$/,'Compositional inverse g(x) through degree $1'],[/^f\(g\(x\)\) と g\(f\(x\)\) が、ともに (.+)次まで x と一致することを確認。$/,'Verify that both f(g(x)) and g(f(x)) agree with x through degree $1.'],
  [/^t = 2cos\(2π\/(.+)\) の最小多項式 ／ 次数 (.+)$/,'Minimal polynomial of t = 2cos(2π/$1) / degree $2'],[/^z\^(.+)−1 から、真の約数に対応する円分多項式を順に割って Φ_(.+) を構成。$/,'Construct Φ_$2 from z^$1−1 by successively dividing out the cyclotomic polynomials corresponding to proper divisors.'],[/^z\^(.+) Ψ\(z\+1\/z\) = Φ_(.+)\(z\) を展開し、全係数が一致することを確認。$/,'Expand z^$1 Ψ(z+1/z) = Φ_$2(z) and verify that every coefficient agrees.'],
  [/^最大相対残差：(.+)。成立した配置：(.+)組。$/,'Maximum relative residual: $1. Valid configurations: $2.'],[/^割合の最大絶対残差：(.+)$/,'Maximum absolute residual in the ratios: $1'],
  [/^(.+)番目の連続する整数三辺$/,'Triangle $1 with consecutive integer side lengths'],
  [/^(.+)個の交点$/,(m,value)=>counted(value,'intersection point')],[/^得られた多項式：(.+)$/,'Resulting polynomial: $1'],
  [/^最小 (.+) ～ (.+) ／ 最大 (.+) ～ (.+)$/,'Minimum $1 to $2 / maximum $3 to $4'],[/^導関数：(.+)$/,'Derivative: $1'],[/^最小値の厳密区間：(.+) ～ (.+)$/,'Exact interval for the minimum: $1 to $2'],[/^最大値の厳密区間：(.+) ～ (.+)$/,'Exact interval for the maximum: $1 to $2'],
  [/^分母：(.+)$/,'Denominator: $1'],[/^xの(.+)次までの形式的な級数$/,'Formal power series through degree $1 in x'],
  [/^F\(x,y\(x\)\) の0〜(.+)次がすべて0になることを検算済み。$/,'Verified that every coefficient of F(x,y(x)) from degree 0 through $1 is zero.'],
  [/^Q\(0\)=1とし、Qf−Pの(.+)次までの係数を0にします。$/,'Set Q(0)=1 and make the coefficients of Qf−P vanish through degree $1.'],
  [/^正投影・見る向き (.+)° ／ 表の中心座標で接触を確認$/,'Orthographic projection at viewing angle $1° / tangencies checked from the tabulated centers'],
  [/^正(.+)角形 ／ 同じ外接円上の頂点$/,'Regular $1-gon / vertices on the same circumcircle'],
  [/^図は最初の(.+)円 ／ 全(.+)円は表に表示$/,'Diagram: first $1 circles / table: all $2 circles'],
  [/^(.+)の計算$/,'$1 calculation'],
  [/^n = (.+), p = (.+) \/ 1(.+) から n(.*) まで$/,'n = $1, p = $2 / from 1$3 through n$4'],
  [/^表示値は根を含む最終区間の中点です。区間 \[(.+), (.+)\]、幅 (.+)。表示した全桁が根の確定桁ではありません。根の一意性も保証しません。(.*)$/,(m,lower,upper,width,warning)=>`The displayed value is the midpoint of the final interval containing a root: [${lower}, ${upper}], width ${width}. Not every displayed digit is certified, and uniqueness of the root is not guaranteed.${warning?' The requested width was not reached.':''}`]
];

for(const [source,translation] of engineCopy)exact.set(source,translation);
for(const [source,translation] of heritageExact)exact.set(source,translation);

function ordinal(value){
  const text=String(value),number=Number(text),mod100=number%100;
  if(!Number.isInteger(number))return `${text}th`;
  if(mod100>=11&&mod100<=13)return `${text}th`;
  return `${text}${number%10===1?'st':number%10===2?'nd':number%10===3?'rd':'th'}`;
}

export function localizeWasanTool(tool){
  // The shared optional AI interface validates before rendering, so its thrown
  // errors do not pass through the DOM translator. Keep its schema and results.
  if(tool?.name!=='calculate_wasan')return tool;
  const translateFailure=error=>{
    if(error instanceof Error){
      const original=error.message,stack=error.stack,translated=translateEnglishText(original);
      if(translated!==original){
        error.message=translated;
        if(typeof stack==='string')error.stack=stack.replace(original,translated);
      }
    }
    throw error;
  };
  return {...tool,
    title:'Run a WASAN calculation',
    description:typeof tool.description==='string'?tool.description.replace(
      /^指定した和算モードで計算し、入力・答え・図表を画面に反映する。各モードの必須キー: (.+)。input内の値はすべて文字列。$/u,
      'Run the selected WASAN calculator and update the inputs, answer, and diagram on the page. Required input keys by mode: $1. All input values must be strings.'
    ):tool.description,
    execute(...args){
      try{
        const result=tool.execute.apply(this,args);
        return result&&typeof result.then==='function'?Promise.resolve(result).catch(translateFailure):result;
      }catch(error){return translateFailure(error);}
    }
  };
}
function normalizeEnglishPunctuation(text){
  // Shared engines also emit math-only text. Normalize presentation punctuation,
  // but never conceal an untranslated Japanese message or change math operators.
  if(/[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/u.test(text))return text;
  return text
    .replace(/、[ \t]*/gu,', ')
    .replace(/。[ \t]*/gu,'. ')
    .replace(/：[ \t]*/gu,': ')
    .replace(/（/gu,'(').replace(/）/gu,')')
    .replace(/「/gu,'“').replace(/」/gu,'”')
    .replace(/『/gu,'‘').replace(/』/gu,'’')
    .replace(/／/gu,'/')
    .replace(/[ \t]*＋[ \t]*/gu,' + ')
    .replace(/(\d)[ \t]*[～〜][ \t]*([+\-−]?\d)/gu,'$1 to $2')
    .replace(/　/gu,' ')
    .replace(/[ \t]+$/u,'');
}
function translateSingle(text){
  // HTML splits a label around spans and <br>. Match its content without losing spacing.
  const core=text.trim();
  if(!core)return text;
  const leading=text.slice(0,text.indexOf(core)),trailing=text.slice(text.indexOf(core)+core.length);
  // The shared copy payload prefixes the first value line with an English label.
  const resultLine=core.match(/^(Result:\s*)(.+)$/u);
  if(resultLine)return leading+resultLine[1]+translateSingle(resultLine[2])+trailing;
  let out=exact.get(core);
  if(out===undefined){
    const link=core.match(/^(.*?)(\s+→)$/u);
    out=link&&exact.has(link[1])?exact.get(link[1])+link[2]:core;
  }
  for(const [pattern,replacement] of rules)out=out.replace(pattern,replacement);
  return leading+normalizeEnglishPunctuation(out)+trailing;
}
export function translateEnglishText(value){
  const text=String(value??'');
  const out=translateSingle(text);
  return out.includes('\n')?out.split('\n').map(translateSingle).join('\n'):out;
}
function translateNode(node){
  if(node.nodeType===Node.TEXT_NODE){const next=translateEnglishText(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;return;}
  if(node.nodeType!==Node.ELEMENT_NODE&&node.nodeType!==Node.DOCUMENT_NODE&&node.nodeType!==Node.DOCUMENT_FRAGMENT_NODE)return;
  // The shared catalog uses an in-app reading route; English articles are separate pages.
  if(node.nodeType===Node.ELEMENT_NODE&&node.tagName==='A'&&node.getAttribute('href')==='#history-stories'){
    node.setAttribute('href','./about-stories.html#six-sphere-chain');
  }
  if(node.nodeType===Node.ELEMENT_NODE){for(const name of ['aria-label','title','placeholder']){if(node.hasAttribute(name)){const current=node.getAttribute(name),next=translateEnglishText(current);if(next!==current)node.setAttribute(name,next);}}}
  node.childNodes.forEach(translateNode);
}
export function installEnglishInterface(){
  document.documentElement.lang='en';
  try{
    const clipboard=navigator.clipboard;
    if(clipboard?.writeText&&!clipboard.__ainoboruEnglish){
      const writeText=clipboard.writeText.bind(clipboard);
      Object.defineProperty(clipboard,'writeText',{configurable:true,value:text=>writeText(translateEnglishText(String(text)))});
      Object.defineProperty(clipboard,'__ainoboruEnglish',{value:true});
    }
  }catch{}
  translateNode(document);
  document.title=translateEnglishText(document.title);
  const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData'||record.type==='attributes')translateNode(record.target);else record.addedNodes.forEach(translateNode);}});
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
}
