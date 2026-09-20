/* AI NOBORU — learning-order chapters for the 83-tool WASAN laboratory. */
export const chapters=[
  {id:'foundations',ja:'数と計算の基礎',en:'Foundations',range:[1,14]},
  {id:'patterns',ja:'数の規則・数え上げ・整数',en:'Patterns, Counting & Integers',range:[15,28]},
  {id:'algebra',ja:'方程式・代数・消去',en:'Equations & Algebra',range:[29,42]},
  {id:'circle',ja:'測量・円理・数表',en:'Measurement, Circles & Tables',range:[43,56]},
  {id:'solid',ja:'立体と接触',en:'Solids & Tangency',range:[57,70]},
  {id:'deep',ja:'深い探究',en:'Deeper Explorations',range:[71,83]},
];
export const storyOrder=[
  ...'tsurukame kafusoku nezumi abura kaiho kairitsu koko pythagorean sansha hyakugo josephus magic daseki polygonal'.split(' '),
  ...'combinatorics chikusaku bell stirling jiyaku primecount totient tawara shosa hermite continued recurrence looksay collatz'.split(' '),
  ...'tengen elimination linear roots discriminant polygcd squarefree replacement translation newtonsums nthroot partialfractions conic curveintersect'.split(' '),
  ...'survey polygonarea kakujutsu cyclotomic enri pi arc enritable segment ellipse ellipticarc diskcuts logarithm takebetrig'.split(' '),
  ...'sangaku descartes malfatti ajima4 apollonius pappus inversion steiner gossett hexlet tetrahedron cylinders spherezone torus'.split(' '),
  ...'bernoulli series reversion seriespower implicitseries pade extrema bernstein boxmax ellipsetriangle heronpell cyclic revolution'.split(' '),
];
export function chapterForIndex(index){return chapters[Math.min(chapters.length-1,Math.floor(index/14))];}
