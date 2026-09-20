/* AI NOBORU — https://www.aiofonesown.com/
 * English editorial copy for calculators 71–83.
 * Historical attribution follows the Japanese source catalog; modern notation is identified as modern.
 */
export const heritageC={
 daseki:{
  name:'Keida-seki: Stacked Sums',sub:'Sum an entire stack at once',category:'Wasan / stacked sums',title:'Turn a layered stack into one exact formula',
  intro:'From the triangular sum 1+2+…+n to sums of fifth powers, evaluate a whole stack exactly from its base size instead of counting layer by layer.',
  insight:'Once a stack of stones or bales is described by how many objects occur on each level, even an enormous stack can be counted with a small number of operations.',
  method:'For powers 1 through 5, evaluate closed-form power-sum formulas with BigInt arithmetic. The table shows selected levels and cumulative totals for inspection.',
  limits:'n must be non-negative. The formulas are implemented in modern notation; this calculator does not reenact the historical counting-rod or tenzan procedures.',
  history:'Wasan developed methods for stacked sums (daseki). A modern commentary on Sanpō Tenzan Shinanroku discusses square and cubic stacks, including a cubic-stack example with base size 5 and total 225. This tool presents those cases in the unified modern language of power sums.'
 },
 polygonal:{
  name:'Polygonal Numbers',sub:'Unify triangular, pentagonal and hexagonal numbers',category:'From wasan to modern mathematics / figurate numbers',title:'Arrange points into triangles, pentagons and hexagons',
  intro:'Triangular, square, pentagonal, hexagonal and higher polygonal numbers all follow one rule. Compute any term exactly for k from 3 through 30.',
  insight:'Sequences that look different become one quadratic family when we track how the increment changes from one term to the next.',
  method:'Evaluate the modern general polygonal-number formula using exact integer arithmetic.',
  limits:'k must be from 3 through 30 and n must be non-negative. Treating every case as a single family of “k-gonal numbers” is a modern organization; this page does not claim that Edo-period wasan used the same terminology or unified all k in this way.',
  history:'Wasan includes studies of stacked sums and regular polygons, both of which connect numerical patterns with geometry. This page connects those themes to the modern theory of polygonal numbers.'
 },
 combinatorics:{
  name:'Factorials, Permutations and Combinations',sub:'Count arrangements and selections',category:'From wasan to modern mathematics / combinatorics',title:'Count how many ways something can be arranged or chosen',
  intro:'Compute n!, nPr and nCr from the same inputs. Modern notation is used here to present counting ideas that also appear in wasan.',
  insight:'Distinguishing between ordered arrangements and unordered selections lets the same basic components solve many different counting problems.',
  method:'Compute factorials, permutations and binomial coefficients exactly with BigInt arithmetic.',
  limits:'0≤n≤500 and 0≤r≤n. The symbols n!, nPr and nCr are modern notation, not transcriptions of historical wasan notation.',
  history:'Wasan includes work corresponding to permutations, combinations and other counting problems. This page presents those ideas using modern factorial, permutation and combination notation.'
 },
 jiyaku:{
  name:'Jiyaku: Prime Factorization',sub:'Break an integer into primes and list primes',category:'Wasan / number theory',title:'Find the prime factors of an integer',
  intro:'Factor an integer into primes and list all primes up to a chosen limit. This modern implementation is presented alongside wasan work on jiyaku and prime numbers.',
  insight:'Once an integer is decomposed into factors that cannot be split further, divisibility, common factors and coprimality become much easier to see.',
  method:'Use modern trial division by 2, 3 and then candidates of the form 6m±1, plus a sieve for the prime list. This is not a reconstruction of the historical jiyaku procedure.',
  limits:'The integer to factor must be from 2 through 1 trillion; the prime-list limit is at most 5,000. This is not a general high-performance factorization engine for arbitrarily large integers.',
  history:'Wasan sources and later scholarship discuss jiyaku in connection with factorization and prime numbers. Modern studies examine sources including Matsunaga Yoshisuke’s Sanpō Ruijū.'
 },
 primecount:{
  name:'Prime Counting',sub:'How many primes are at most N?',category:'Wasan / number theory',title:'Count primes instead of merely listing them',
  intro:'Use a sieve to count the primes from 2 through N and compute the prime-counting function π(N) exactly.',
  insight:'Counting how frequently primes occur turns a list of individual primes into a question about the distribution of integers.',
  method:'Use the Sieve of Eratosthenes to mark composites and count the remaining primes up to N.',
  limits:'N must not exceed 5,000,000. This is a modern sieve implementation, not a reconstruction of Kurushima’s historical procedure.',
  history:'Kurushima Yoshihiro’s surviving work includes questions related to primes and number theory. Later scholarship has also discussed his work in relation to counting primes. This calculator expresses that question with the modern notation π(N).'
 },
 totient:{
  name:'Kurushima and the Totient Function',sub:'Count integers coprime to N',category:'Wasan / number theory',title:'How many positive integers are coprime to N?',
  intro:'Use the prime factorization of N to count the positive integers from 1 through N that are coprime to it.',
  insight:'Once the prime factors are known, all integers sharing those factors can be removed in groups. Factorization becomes a counting tool.',
  method:'Factor N and, for each distinct prime factor p, update the count by multiplying by (p−1)/p.',
  limits:'1≤N≤1 trillion, with φ(1)=1. The symbol φ and the product formula are modern notation.',
  history:'Later scholarship has compared a result in Kurushima Yoshihiro’s Kyūshi Ikō with Euler’s totient function; the correspondence is sometimes discussed under the label “Kurushima–Euler function.” This page separates the Japanese manuscript tradition from the European publication history rather than reducing the question to a simple priority claim.'
 },
 bell:{
  name:'Bell Numbers and Genjikō',sub:'Count the 52 Genjikō patterns',category:'From wasan to modern mathematics / counting',title:'Partition distinct objects into unlabeled groups',
  intro:'Compute Bₙ, the number of ways to partition n distinct objects into nonempty unlabeled groups. For n=5, the answer is 52.',
  insight:'Only group membership matters; the groups themselves are not ordered. With five objects, this gives 52 set partitions.',
  method:'Starting with B₀=1, use the binomial-coefficient recurrence to compute successive Bell numbers exactly with BigInt arithmetic.',
  limits:'n≤30. “Bell number” and the symbol Bₙ are modern terminology; this page does not claim that Edo-period sources used that name.',
  history:'Later scholarship has compared counting results in wasan, including work by Matsunaga Yoshisuke, with the sequence now called the Bell numbers. The 52 Genjikō patterns record which of five incense samples are judged to have the same scent.'
 },
 stirling:{
  name:'Stirling Numbers',sub:'Count partitions and permutation cycles',category:'From wasan to modern mathematics / counting',title:'Track how n objects can be organized into exactly k groups',
  intro:'Compute Stirling numbers of the second kind S(n,k) and unsigned Stirling numbers of the first kind c(n,k) exactly by recurrence.',
  insight:'Bell numbers count all set partitions; Stirling numbers of the second kind refine that count by requiring exactly k groups.',
  method:'Build the triangular table from the boundary value (0,0)=1. The unsigned first kind uses its own recurrence.',
  limits:'n≤25. The name “Stirling number” and the symbols used here are modern. Equivalences with historical wasan sequences are presented as comparisons made by later scholarship.',
  history:'Later researchers studying wasan combinatorics have identified correspondences between results by practitioners such as Saka Masanaga and results that can now be expressed in terms of Stirling numbers.'
 },
 logarithm:{
  name:'Logarithm Tables',sub:'Turn multiplication into addition',category:'Late Edo period / reception of Western mathematics',title:'Approximate a product by adding logarithms',
  intro:'Round the common logarithms of a and b to the chosen number of table digits, add them, then take the antilogarithm. The tool simulates the logic of calculation with logarithm tables.',
  insight:'Instead of multiplying directly, look up two logarithms, add them, and convert back. A numerical table acts as a calculating instrument.',
  method:'Use Math.log10 only to obtain a modern floating-point reference value. Round that value to the selected table precision, and use only the rounded logarithms to reconstruct the product.',
  limits:'a and b must be positive decimal numbers from 10^-100 through 10^100; scientific notation is not accepted. This simulates the principle of table-based calculation and is not a transcription of a historical logarithm table.',
  history:'Late-Edo wasan practitioners received logarithm tables through Western mathematics and used them in fields such as calendrical calculation and surveying. This page does not present logarithms as an independent Japanese invention.'
 },
 takebetrig:{
  name:'Takebe’s Trigonometric Table',sub:'Tabulate arc, half-chord and sagitta',category:'Wasan / numerical tables and calendrical calculation',title:'Compute the half-chord for each angle in a unit-diameter circle',
  intro:'Choose an angle and recompute the arc length, half-chord and sagitta of a circle of diameter 1 with modern trigonometric functions. The table also shows nearby integer-degree entries on either side.',
  insight:'If values for each angle are tabulated in advance, surveying and calendrical work do not have to repeat the same difficult calculation from scratch.',
  method:'Recompute the values with modern sin, cos and π. This does not reconstruct Takebe’s historical calculation procedure.',
  limits:'The angle must be an integer from 0° through 90°. Values are floating-point approximations. The selected display precision must not be confused with the certified accuracy of a historical table.',
  history:'The National Diet Library describes Takebe Katahiro’s Sanreki Zakkō as Japan’s first trigonometric table and notes that it gives half-chords for a diameter-1 circle at one-degree intervals to 11 decimal places. Takebe’s table is distinguished here from later imported and translated Western trigonometric tables.'
 },
 chikusaku:{
  name:'Chikusaku: Exhaustive Enumeration',sub:'Follow every candidate branch',category:'Wasan / counting',title:'Enumerate every choice and check it against the formula',
  intro:'Enumerate every r-element selection from n objects, then verify that the total agrees with nCr.',
  insight:'A closed formula gives the total immediately, but exhaustive enumeration can reveal omissions and double-counting by tracing every candidate.',
  method:'Generate combinations in increasing order by depth-first enumeration, then verify the final count against the binomial coefficient.',
  limits:'n≤10. This combination enumerator is a modern teaching model of chikusaku-style exhaustive search; it is not a line-by-line reconstruction of a particular problem from Sanpō Chikusakujutsu.',
  history:'Wasan includes a family of exhaustive-search and counting methods called chikusakujutsu. Surviving works include Aida Yasuaki’s Sanpō Chikusakujutsu and the manuscript Chikusaku Kihō.'
 },
 looksay:{
  name:'Look-and-Say',sub:'Read the digits to generate the next term',category:'Modern sequence / not historical wasan',title:'Read “one 1” as 11 and watch a sequence grow',
  intro:'Read each run of identical digits as “how many, then which digit” and use that description as the next string.',
  insight:'Even a very simple rewriting rule can generate unexpectedly rich structure in the lengths and digit patterns of later terms.',
  method:'Scan left to right, count each maximal run of equal digits, and replace it with “count + digit.”',
  limits:'This is not historical wasan. A finite computation here is neither evidence that wasan practitioners studied this sequence nor a proof of any general property.',
  history:'The look-and-say sequence belongs to modern mathematics. It appears here in a clearly separate comparison section: a contemporary example of starting from computed terms and looking for structure, not a historical continuation claim.'
 },
 collatz:{
  name:'The Collatz Conjecture',sub:'Halve evens; triple odds and add one',category:'Modern open problem / not historical wasan',title:'Does every positive starting value eventually reach 1?',
  intro:'Start with a positive integer. If it is even, divide by 2; if it is odd, replace it by 3n+1. Trace a finite orbit exactly and report its peak and the number of steps needed to reach 1.',
  insight:'The rule is extremely simple, but checking individual starting values is fundamentally different from proving that every positive integer reaches 1.',
  method:'Use BigInt arithmetic to follow the orbit for a finite number of steps. If 1 is reached, record the number of steps and the largest value encountered.',
  limits:'This is not historical wasan. Reaching 1 for finitely many inputs does not prove the conjecture, and failure to reach 1 before the selected cutoff is not necessarily a counterexample.',
  history:'The Collatz conjecture is a twentieth-century open problem in modern mathematics. Because accounts of its precise early history vary, this page makes no claim of historical continuity with Edo-period mathematics. It is included to illustrate the difference between computation, pattern finding and proof.'
 }
};

export const heritageF={
 daseki:'Σ kᵖ (p=1,…,5)',
 polygonal:'Pₖ(n)=((k−2)n²−(k−4)n)/2',
 combinatorics:'nPr=n!/(n−r)! / nCr=n!/(r!(n−r)!)',
 jiyaku:'N=∏pᵉ',
 primecount:'π(N)=#{p≤N : p is prime}',
 totient:'φ(N)=N∏ₚ|N(1−1/p)',
 bell:'Bₙ₊₁=Σₖ C(n,k)Bₖ',
 stirling:'S(n,k)=S(n−1,k−1)+kS(n−1,k)',
 logarithm:'log(ab)=log(a)+log(b)',
 takebetrig:'half-chord=(1/2)sinθ / sagitta=(1/2)(1−cosθ)',
 chikusaku:'enumerated count = C(n,r)',
 looksay:'111221 → “three 1s, two 2s, one 1” → 312211',
 collatz:'n→n/2 (even) / 3n+1 (odd)'
};

export const heritageFieldOverrides={
 daseki:{n:'Base size n',power:'Power on each level'},
 polygonal:{order:'Polygon order k',n:'Term index n'},
 combinatorics:{n:'Total number n',r:'Number selected r'},
 jiyaku:{n:'Integer N to factor',limit:'Prime-list upper limit'},
 primecount:{n:'Upper limit N'},
 totient:{n:'Integer N'},
 bell:{n:'Number of objects n'},
 stirling:{n:'n',k:'k',kind:'Kind'},
 logarithm:{a:'a',b:'b',digits:'Decimal places in the log table'},
 takebetrig:{degree:'Angle (degrees)',digits:'Displayed decimal places'},
 chikusaku:{n:'Number of objects n',r:'Number selected r'},
 looksay:{seed:'Starting digit string',steps:'Number of iterations'},
 collatz:{start:'Starting value n',maxSteps:'Maximum number of steps'}
};

export const heritageH={
 daseki:{n:'A non-negative integer of up to 80 digits.',power:'Powers 1 through 5.'},
 polygonal:{order:'3 = triangular, 5 = pentagonal, 6 = hexagonal; choose a value from 3 through 30.',n:'A non-negative integer of up to 60 digits.'},
 combinatorics:{n:'An integer from 0 through 500.',r:'An integer from 0 through n.'},
 jiyaku:{n:'An integer from 2 through 1 trillion.',limit:'An integer from 2 through 5,000.'},
 primecount:{n:'An integer from 0 through 5,000,000.'},
 totient:{n:'An integer from 1 through 1 trillion.'},
 bell:{n:'An integer from 0 through 30.'},
 stirling:{n:'An integer from 0 through 25.',k:'An integer from 0 through n.',kind:'Second kind = set partitions into exactly k blocks; unsigned first kind = permutations with exactly k cycles.'},
 logarithm:{a:'A positive decimal number.',b:'A positive decimal number.',digits:'4–12 decimal places.'},
 takebetrig:{degree:'An integer from 0° through 90°.',digits:'6–13 decimal places.'},
 chikusaku:{n:'An integer from 1 through 10.',r:'An integer from 0 through n.'},
 looksay:{seed:'Digits only, 1–40 characters.',steps:'An integer from 0 through 20.'},
 collatz:{start:'A positive integer of up to 100 digits.',maxSteps:'Stop the calculation at this many steps.'}
};

export const heritageExamples={
 daseki:['Triangular stack 1+…+10','Cubic stack with base 5','Triangular stack through one trillion'],
 polygonal:['10th pentagonal number','10th hexagonal number','100th triangular number'],
 combinatorics:['Choose 3 from 10','Choose 5 cards from 52','Choose 0 from 0'],
 jiyaku:['Factor 360','Is 997 prime?','A large composite integer'],
 primecount:['Primes up to 100','Primes up to 1,000','Primes up to one million'],
 totient:['N=36','Prime N=97','N=1'],
 bell:['Five objects: the Genjikō count','Partition 10 objects','The empty set'],
 stirling:['S(5,2)','c(5,2)','S(10,5)'],
 logarithm:['1034 × 2213','Use a coarser table','Multiply decimals'],
 takebetrig:['30 degrees','45 degrees','1 degree'],
 chikusaku:['Choose 3 from 5','Choose 2 from 6','Choose 5 from 10'],
 looksay:['Five steps from 1','Six steps from 22','Four steps from 123'],
 collatz:['The famous starting value 27','Start from 1','Start from 97']
};

export const heritageResultLabels={
 daseki:'1ᵖ + 2ᵖ + … + nᵖ',
 polygonal:'The nth k-gonal number',
 combinatorics:'n!, nPr and nCr',
 jiyaku:'Prime factorization of N',
 primecount:'π(N) — number of primes at most N',
 totient:'φ(N)',
 bell:'Bell number Bₙ',
 stirling:'Stirling number',
 logarithm:'Product reconstructed from rounded logarithms',
 takebetrig:'Half-chord in a circle of diameter 1',
 chikusaku:'Number of choices enumerated',
 looksay:'Final look-and-say string',
 collatz:'Orbit to 1 or cutoff result'
};

export const heritageResultBadges={
 '対数表を模した近似値':'Approximation using a simulated logarithm table',
 '現代三角関数による再計算':'Recomputed with modern trigonometric functions',
 '全候補を厳密列挙':'All candidates enumerated exactly',
 '現代の数列（和算ではない）':'Modern sequence — not historical wasan',
 '現代の未解決問題（和算ではない）':'Modern open problem — not historical wasan'
};
