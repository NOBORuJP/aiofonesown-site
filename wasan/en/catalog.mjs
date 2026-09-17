/* AI NOBORu — https://www.aiofonesown.com/ | English editorial layer; calculation contracts remain shared. */
import {catalog as japaneseCatalog} from '../catalog.mjs';

const C = {
  sangaku:{name:'Sangaku Tangent Circles',sub:'Find a circle that fits the gap',category:'Geometry and tangency',title:'Find the circle that fits the gap',intro:'Two circles rest on the same line and touch each other. This tool finds the smaller circle that fits exactly between them.',insight:'The geometry becomes additive when radii are expressed through their reciprocal square roots.',method:'Split the distance between the two original points of contact and solve 2√ab = 2√ar + 2√br.',limits:'The two given circles must lie on the same side of one line and be externally tangent. All radii use the same unit.',history:'Sangaku were mathematical votive tablets displayed at temples and shrines. This is a modern teaching reconstruction of a common tangent-circle problem, not a transcription of one tablet.'},
  enri:{name:'Enri and Convergence Acceleration',sub:'From polygons to pi',category:'Approximation and convergence',title:'Bracket pi with polygons',intro:'Starting with a regular hexagon, repeatedly double the number of sides and compare inscribed and circumscribed bounds for pi.',insight:'Instead of measuring the circle directly, use polygons to approximate it ever more closely.',method:'For a unit circle, update the half-chord with a stable square-root recurrence, then compare inner and outer semiperimeters. A three-term extrapolation is shown separately.',limits:'The geometric inequalities are exact, but the displayed decimal values use floating-point arithmetic. The accelerated value is not itself a certified bound.',history:'Enri is the wasan study of circles and curved figures. This tool presents polygonal approximation in modern notation and distinguishes it from later convergence acceleration.'},
  shosa:{name:'Shosaho Difference Interpolation',sub:'Recover an unknown value from differences',category:'Tables and interpolation',title:'Continue a pattern through its differences',intro:'Build successive finite differences from values at equally spaced x-coordinates, then evaluate the unique interpolating polynomial.',insight:'A table of changes can reveal a simpler rule than the original list of values.',method:'Multiply the first entry in each difference row by the generalized binomial coefficient C(t,k), then add the terms exactly as rational numbers.',limits:'With n observations this chooses the polynomial of degree at most n−1 through those points. It does not prove that the underlying phenomenon is polynomial, and extrapolation needs care.',history:'Shosaho grew from East Asian calendrical interpolation and was developed within wasan. The forward-difference notation used here is modern.'},
  kaiho:{name:'Digit-by-Digit Square Root',sub:'Build a square root one digit at a time',category:'Digits and roots',title:'Construct a square root from its digits',intro:'Bring down the radicand two digits at a time and choose each new digit without using a floating-point square-root function.',insight:'Every step preserves one invariant: the square of the chosen digits must not exceed the original number.',method:'If p is the root found so far, choose the largest digit q for which (20p+q)q does not exceed the current remainder after bringing down the next two-digit group.',limits:'The result is truncated, not rounded. Inputs must be non-negative decimal numbers; complex roots and scientific notation are outside this tool.',history:'This is a teaching implementation of the digit-by-digit root extraction used in wasan and elsewhere; it is not presented as an exclusively Japanese invention.'},
  tengen:{name:'An Introduction to Tengenjutsu',sub:'Arrange coefficients and locate a root',category:'Equations',title:'Name the unknown and solve its equation',intro:'Enter a one-variable polynomial by its coefficients and locate one real root inside a chosen interval.',insight:'Tengenjutsu treats the unknown as a structured quantity; the coefficient array is a useful modern doorway into that idea.',method:'The historical coefficient idea is paired with modern bisection. Each midpoint and function value is retained for inspection.',limits:'Except when an endpoint is already a root, the endpoint values must have opposite signs. It finds one real root, not all roots. Repeated roots may be missed; complex roots are not supported.',history:'Tengenjutsu, transmitted from Chinese mathematics, is a method for equations in one unknown. Numerical bisection is clearly separated here as a modern aid.'},
  hyakugo:{name:'Hyakugo Remainder Method',sub:'Reconstruct a number from its remainders',category:'Integers and congruences',title:'Combine remainders to recover the number',intro:'Find the least non-negative integer that satisfies several remainder conditions, together with the period of all solutions.',insight:'The answer is not an isolated number but an entire periodic family.',method:'Conditions are merged one row at a time with greatest common divisors and the extended Euclidean algorithm.',limits:'Moduli need not be coprime, but incompatible conditions have no solution. Every remainder is normalized before calculation.',history:'The classic moduli 3, 5, and 7 come from the Chinese Remainder Problem and were also studied in wasan; arbitrary moduli are a modern extension.'},
  tawara:{name:'Tawara-sugi and Power Sums',sub:'Sum an entire stack at once',category:'Sums and differences',title:'Find the total without adding term by term',intro:'Move from the triangular stack 1+2+…+n to exact sums of powers as high as the twelfth.',insight:'Finite differences turn the whole accumulation into one reusable polynomial rule.',method:'Form cumulative sums from S(0)=0, take forward differences, and evaluate the resulting Newton-series expression exactly.',limits:'n must be a non-negative integer and p an integer from 0 through 12. The broader power-sum treatment is a pedagogical extension of the stacking problem.',history:'Tawara-sugi problems count bales arranged in triangular stacks. This tool uses that familiar entry point to explore the wider mathematics of power sums.'},
  tsurukame:{name:'Cranes and Turtles',sub:'Separate two populations from heads and legs',category:'Linear reasoning',title:'How many cranes and how many turtles?',intro:'Use the total number of heads and legs to recover the two populations exactly.',insight:'Pretend every animal has two legs; each remaining pair of legs identifies a turtle.',method:'Subtract twice the number of heads from the leg count, divide by two for turtles, and take the remainder as cranes.',limits:'The crane and turtle counts must be non-negative integers. The total leg count minus twice the head count must be even.',history:'Tsurukamezan is a classic East Asian problem type. The method illustrates linear equations without requiring symbolic notation.'},
  kafusoku:{name:'Surplus and Deficit',sub:'Infer a group size from two distributions',category:'Linear reasoning',title:'Find the group size from a surplus and a shortfall',intro:'Compare a distribution that leaves a surplus with one that produces a deficit.',insight:'The change per person accounts for the entire change from surplus to shortage.',method:'Divide surplus plus deficit by the difference between the two per-person shares, then reconstruct the total stock.',limits:'The larger share must exceed the smaller one, and the resulting counts must be non-negative integers.',history:'Kafusokuzan problems were widely used to teach practical proportional and linear reasoning.'},
  nezumi:{name:'Mouse Problems and Geometric Growth',sub:'Follow repeated multiplication',category:'Sequences',title:'See repeated growth at a glance',intro:'Calculate a geometric progression without carrying out every multiplication separately.',insight:'Repeated growth is controlled by one multiplier and one exponent.',method:'Raise the growth factor to the number of steps and multiply by the starting amount using exact integer arithmetic.',limits:'The starting value, multiplier, and number of steps must lie within the stated integer ranges.',history:'Nezumizan, or mouse problems, dramatized rapid multiplication through a familiar story and became a standard recreational theme.'},
  abura:{name:'The Oil-Jug Problem',sub:'Measure a quantity using only containers',category:'Search and measurement',title:'Find the shortest sequence of pours',intro:'Given three unmarked vessels, find a shortest sequence of legal pours that measures the target amount.',insight:'Each distribution of liquid is a state, and each possible pour connects two states in a finite graph.',method:'A breadth-first search explores every allowed pour between vessels until the target amount is reached.',limits:'Capacities and target must be integers in range. No sequence exists if the target is not a multiple of the greatest common divisor of the vessel capacities.',history:'Oil-measuring problems appear in Japanese recreational arithmetic as practical measurement puzzles.'},
  koko:{name:'Kōkojutsu: Right Triangles',sub:'Find a side of a right triangle',category:'Geometry',title:'Find the hypotenuse of a right triangle',intro:'Calculate the hypotenuse from the two perpendicular sides.',insight:'Squaring turns the geometric relation into an exact sum before the final root is approximated.',method:'Form a²+b² and take its non-negative square root.',limits:'Both legs must be positive and use the same unit. The displayed square root is a decimal approximation unless it is exact.',history:'The traditional terms kō and ko name the two legs of a right triangle. The relation itself belongs to the wider East Asian mathematical tradition and is not unique to Japan.'},
  sansha:{name:'Area from Three Sides',sub:'Find area without knowing the altitude',category:'Geometry',title:'Calculate a triangle’s area from its three side lengths',intro:'Use the three side lengths to obtain the area and related quantities.',insight:'The semiperimeter combines the three triangle inequalities in one symmetric expression.',method:'Apply Heron’s formula in exact squared form, then take the non-negative square root for the displayed area.',limits:'The three positive lengths must satisfy the strict triangle inequalities.',history:'Three-side area problems were prominent in wasan. The modern Heron formula provides a transparent equivalent calculation.'},
  kairitsu:{name:'Digit-by-Digit Cube Root',sub:'Build a cube root one digit at a time',category:'Digits and roots',title:'Recover an edge length from a volume',intro:'Extract a cube root by grouping digits in threes and choosing each new digit exactly.',insight:'The expansion of (10r+q)³ tells us exactly how much each new digit contributes.',method:'At each stage, choose the largest q for which (300r²+30rq+q²)q fits within the current remainder after bringing down the next three-digit group.',limits:'The result is truncated rather than rounded. This tool handles non-negative real inputs only.',history:'Kairitsu is the cube-root counterpart of traditional digit-by-digit root extraction.'},
  elimination:{name:'Elimination and Determinants',sub:'Reduce two unknowns to one',category:'Algebra and elimination',title:'Eliminate one unknown to obtain an equation in the other',intro:'Eliminate a shared variable from two quadratic expressions while keeping symbolic polynomial coefficients exact.',insight:'A determinant is useful here because it records the condition for two equations to share a solution.',method:'Construct the elimination expression and verify it against the corresponding Sylvester determinant.',limits:'The entered coefficient rows are limited to the documented degrees and integer size. The resulting equation is necessary and may include extraneous branches.',history:'In Seki’s work, determinant-like arrays served elimination rather than an abstract theory of determinants. This screen keeps that purpose in view.'},
  roots:{name:'All Real Roots of a Polynomial',sub:'Separate repeated and nearby roots',category:'Certified algebra',title:'Count and isolate every real root',intro:'Count the distinct real roots of an integer polynomial and enclose each one in a rational interval.',insight:'Sign-variation counts can certify how many roots lie in an interval without approximating them first.',method:'Use square-free decomposition and Sturm sequences, then bisect rational intervals to the requested display scale.',limits:'Coefficients must be integers within the stated bounds. Decimal midpoints are guides; the rational intervals and multiplicities carry the certification.',history:'This is a modern exact companion to historical equation work, not a claim that wasan writers used Sturm’s theorem.'},
  arc:{name:'Takebe’s Arc Series',sub:'From squared arc to length',category:'Series and bounds',title:'Recover an arc with a series and a remainder bound',intro:'Approximate a short circular arc using a series for its squared normalized length.',insight:'Working first with the square can expose a simpler coefficient pattern and a controllable remainder.',method:'Sum the requested rational terms, bound the positive tail, and take square roots of the resulting interval.',limits:'The sagitta must be positive and at most half the diameter. More terms may be needed near the edge of the permitted range.',history:'The construction is based on research into Takebe Katahiro’s circle methods and is presented in modern notation with explicit bounds.'},
  pi:{name:'Certified Digits of Pi',sub:'Turn upper and lower bounds into 50 digits',category:'Certified constants',title:'Separate plausible digits from proved digits',intro:'Compute digits of pi that are confirmed by exact rational bounds.',insight:'Long decimals become trustworthy only when both sides of a rigorous interval agree.',method:'Bound a rapidly convergent series for pi² with rational arithmetic, then extract the square root digit by digit.',limits:'The output is truncated to the requested number of certified digits, not rounded.',history:'This is a modern certification tool included to distinguish historical approximations from mathematically guaranteed decimal digits.'},
  descartes:{name:'Two Circles Tangent to Three',sub:'Read tangency through curvature',category:'Circle geometry',title:'Find both circles tangent to three given circles',intro:'Given three mutually tangent circles, calculate the two curvatures allowed by the Descartes circle relation.',insight:'Reciprocal radius turns a nonlinear contact problem into a compact quadratic identity.',method:'Convert radii to signed curvatures, solve the two branches, then reconstruct and verify tangency.',limits:'Inputs must describe the supported tangency configuration and meet the stated scale limits. Signed curvature distinguishes enclosing circles.',history:'The theorem is a modern comparative tool for tangent-circle problems; its use here does not assign the European theorem to historical wasan authors.'},
  gossett:{name:'A Fifth Sphere Tangent to Four',sub:'Extend the contact equation into space',category:'Spatial geometry',title:'Find a sphere tangent to four given spheres',intro:'Use the three-dimensional Soddy–Gossett relation to calculate two possible tangent spheres.',insight:'Curvature coordinates carry the same contact structure from circles into three dimensions.',method:'Solve the curvature equation, construct centers from distance constraints, and report the largest contact residual.',limits:'The four spheres must form a compatible tetrahedral contact configuration within the stated scale ratio.',history:'This modern theorem is used to compare spatial contact geometry with wasan sphere problems; it is not presented as a historical Japanese formula.'},
  hexlet:{name:'The Six-Sphere Chain',sub:'Return to the starting position after six contacts',category:'Spatial geometry',title:'Watch a chain of six spheres close',intro:'Construct a chain of six spheres tangent to two fixed inner spheres and an enclosing sphere.',insight:'Inversion changes the awkward three-dimensional contact pattern into a more regular one.',method:'Generate curvatures from the recurrence, place each center, and verify closure, tangency, and non-overlap.',limits:'The two inner spheres must fit inside the enclosing sphere, and their radii must satisfy the stated lower bounds. The projection can hide depth.',history:'Irisawa Shintaro Hiroatsu’s 1822 sangaku records a configuration equivalent to the six-sphere chain, predating Soddy’s later discussion.'},
  bernoulli:{name:'Bernoulli Coefficients and Power Sums',sub:'Expose the polynomial behind a large sum',category:'Exact sums',title:'Read the coefficient law inside sums of powers',intro:'Generate the Bernoulli coefficients used by the wasan sign convention and evaluate power sums exactly.',insight:'A huge finite sum can be represented by a polynomial whose coefficients obey a short recurrence.',method:'Construct rational Bernoulli coefficients with the positive one-half convention, then substitute them into Faulhaber’s formula.',limits:'N and the power must be integers within the stated ranges. The sign convention is identified explicitly to avoid comparison errors.',history:'The wasan convention used here has β₁=+1/2, whereas a common modern convention uses B₁=−1/2.'},
  enritable:{name:'Enri Tables and Definite Integrals',sub:'Turn an integral into a rational recurrence',category:'Exact integration',title:'Evaluate areas from a table of rules',intro:'Calculate two families of definite integrals by exact factorial or recurrence formulas.',insight:'A recurrence can preserve exactness while avoiding repeated symbolic integration.',method:'Use the beta-integral identity for the polynomial family and parity-aware reduction for powers of sine and cosine.',limits:'Exponents must be non-negative integers. Results involving pi are kept as exact rational multiples of pi.',history:'This is a modern reconstruction of the tabular spirit of enri calculations, with contemporary integral notation.'},
  ellipse:{name:'Perimeter of an Ellipse',sub:'Move beyond the circle to a curved length',category:'Series and bounds',title:'Bound the perimeter of an ellipse',intro:'Compute the complete elliptic-integral series together with an explicit remainder interval.',insight:'A convergent positive series lets a partial sum provide one side of the answer while the tail controls the other.',method:'Order the semiaxes, sum rational series terms, bound the remaining tail, and multiply by the exact prefactor.',limits:'Very slender ellipses converge slowly and may require many terms. Judge precision by the displayed interval width, not the number of printed digits.',history:'Ellipse perimeter is included as a modern extension of circle-series thinking; it is not attributed to a particular historical wasan text.'},
  cylinders:{name:'Intersection Volume of Two Cylinders',sub:'Integrate a spatial intersection',category:'Solid geometry',title:'Find the overlap of two perpendicular cylinders',intro:'Calculate the volume shared by two perpendicular circular cylinders, including unequal radii.',insight:'A difficult solid becomes manageable when viewed as a stack of exact cross-sections.',method:'Integrate the rectangular cross-sectional area, which is four times the product of the two half-widths. Equal radii use a closed form; unequal radii use bounded series evaluation.',limits:'Radii must be positive. For unequal radii, precision is represented by the reported interval rather than decimal length alone.',history:'The equal-radius Steinmetz solid is classical; the unequal-radius interval calculation is a modern extension for this laboratory.'},
  replacement:{name:'General Elimination by Replacement',sub:'Use Seki-style replacement with symbolic coefficients',category:'Symbolic elimination',title:'Lower the degree and remove a variable',intro:'Apply polynomial replacement steps to eliminate y from two bivariate equations.',insight:'Carefully chosen multiples cancel the leading y-term without introducing fractions prematurely.',method:'Perform exact pseudo-remainder steps and compare the final condition with the Sylvester resultant.',limits:'The displayed resultant is a necessary elimination condition; substitution back into both equations remains essential.',history:'The presentation connects Seki’s replacement procedures with modern resultant language while keeping the two viewpoints distinct.'},
  inversion:{name:'Circle Inversion',sub:'Connect circles and lines through a transformation',category:'Transformational geometry',title:'Invert a circle and recover its exact center and radius',intro:'Invert a circle in a chosen reference circle, including the limiting case that becomes a line.',insight:'Inversion can replace a complicated tangency arrangement with one whose contacts are easier to see.',method:'Evaluate the exact denominator x²+y²−r², then apply the rational center-and-radius formulas or the line case.',limits:'The original radius and inversion radius must be positive. A circle through the inversion center maps to a line.',history:'Inversion is a modern explanatory tool used here to illuminate circle chains; no claim is made that the historical construction used this formalism.'},
  steiner:{name:'A Chain Between Eccentric Circles',sub:'Determine when a ring of circles closes',category:'Circle chains',title:'Test whether unequal circles form a closed necklace',intro:'Calculate the closure angle for circles tangent to two nonconcentric boundary circles.',insight:'Inversion sends the boundaries to concentric circles, where every link advances by one fixed angle.',method:'Compute the invariant C, derive the step angle, and compare n steps with one full turn.',limits:'The inner circle must lie strictly inside the outer circle. Closure is reported with exact conditions where possible and a numerical residual otherwise.',history:'Steiner chains provide a modern framework for circle-chain questions related to, but historically distinct from, wasan contact problems.'},
  kakujutsu:{name:'Kakujutsu and Regular Polygons',sub:'Relate an angle to a polynomial',category:'Angles and algebra',title:'Express a regular polygon through coefficient recurrences',intro:'Build the polynomial recurrence for twice the cosine of a central angle and connect it to a regular polygon.',insight:'Repeated angle addition becomes a recurrence in one algebraic quantity.',method:'Generate C0=2, C1=t, and Ck=tCk−1−Ck−2, then impose Cn(t)=2.',limits:'The displayed equation can factor; it is not necessarily the minimal polynomial of t=2cos(2π/n).',history:'Inspired by Seki’s work on regular polygons, this calculator uses a modern angle recurrence. It does not reconstruct the lost historical method for predicting equation degrees.'},
  linear:{name:'Systems of Linear Equations',sub:'Solve several unknowns together',category:'Exact algebra',title:'Eliminate variables and describe the whole solution set',intro:'Solve a system of linear equations by exact rational row reduction.',insight:'Choosing a pivot and clearing one column at a time exposes rank, uniqueness, and inconsistency.',method:'Reduce the augmented matrix to reduced row-echelon form using exact rational arithmetic, then describe the unique solution, free-variable family, or inconsistency.',limits:'The matrix format is one equation per line with the constant on the right. Singular systems are reported rather than forced into a unique answer.',history:'This is a modern generalization of elimination ideas that appear throughout East Asian algebra.'},
  polygcd:{name:'Greatest Common Divisor of Polynomials',sub:'Extract the factor shared by two expressions',category:'Exact algebra',title:'Find the common polynomial factor',intro:'Compute the monic greatest common divisor of two polynomials with rational coefficients.',insight:'Repeating division and replacing a pair by divisor and remainder steadily lowers the degree.',method:'Run the Euclidean algorithm over rational coefficients and normalize the final nonzero polynomial to leading coefficient one.',limits:'Both inputs must satisfy the degree and coefficient bounds. The zero-polynomial cases follow the standard gcd convention.',history:'This modern algebraic tool supports elimination and repeated-root analysis used elsewhere in the site.'},
  discriminant:{name:'Repeated Roots and the Discriminant',sub:'Detect when roots collide',category:'Exact algebra',title:'Test whether a polynomial has a repeated root',intro:'Calculate the discriminant exactly from a polynomial and its derivative.',insight:'A repeated root is precisely a common root of f and f′, so the resultant detects it without solving the equation.',method:'Form the exact Sylvester resultant and apply the standard modern sign and leading-coefficient normalization.',limits:'The reported sign convention is modern and explicitly stated. A zero discriminant certifies repetition; a nonzero value does not locate the roots.',history:'Discriminants are used here as a modern continuation of elimination, not as terminology assigned retroactively to every historical array method.'},
  newtonsums:{name:'Power Sums of Polynomial Roots',sub:'Know sums of roots without solving for them',category:'Exact algebra',title:'Compute sums of powers of the roots from the coefficients',intro:'Find successive sums of powers of all roots, counted with multiplicity.',insight:'The coefficient relations contain symmetric information about the roots even when individual roots are inaccessible.',method:'Apply Newton’s identities in rational arithmetic, switching to the homogeneous recurrence after the polynomial degree.',limits:'The calculation includes complex roots and multiplicity algebraically; it does not approximate or list the roots themselves.',history:'This is a modern symmetric-polynomial companion to the site’s exact equation tools.'},
  nthroot:{name:'Higher-Order Root Extraction',sub:'Enclose roots up to the twentieth degree',category:'Digits and roots',title:'Find an nth root with exact decimal bounds',intro:'Calculate the real kth root and certify its decimal bounds with integer inequalities.',insight:'Scaling the radicand turns decimal root extraction into a comparison of large integers.',method:'Find the greatest integer L with L^k not exceeding the scaled radicand, then convert L and L+1 into decimal bounds.',limits:'Even roots require non-negative inputs; odd roots may be negative. An exact result is shown when available; otherwise, two adjacent decimals enclose the root.',history:'This extends the digit discipline of traditional square- and cube-root extraction with modern large-integer computation.'},
  translation:{name:'Polynomial Translation',sub:'Move the unknown closer to a root',category:'Exact algebra',title:'Rewrite an equation after shifting the variable',intro:'Substitute x=u+h and calculate every new coefficient exactly.',insight:'A change of origin can simplify coefficients and make the behavior near a chosen value easier to inspect.',method:'Expand each power with binomial coefficients and collect equal powers of u in rational arithmetic.',limits:'For a nonzero polynomial, translation preserves the degree and leading coefficient; it changes coordinates, not the roots’ relative structure.',history:'Changing the unknown’s origin is a natural companion to coefficient-based equation methods such as tengenjutsu.'},
  series:{name:'Division of Power Series',sub:'Divide through the coefficients',category:'Series',title:'Extract a series from a quotient of polynomials',intro:'Compute the Taylor coefficients of a formal quotient to a chosen order.',insight:'Once the denominator’s constant term is nonzero, each new coefficient depends only on earlier ones.',method:'Use the coefficient recurrence obtained by equating coefficients in (denominator) × (quotient) = (numerator).',limits:'Coefficients are entered from constant term upward, the reverse of the polynomial tools. The result is formal and does not by itself prove analytic convergence.',history:'This modern formal-series tool supports the arc, reversion, and rational-approximation investigations on the site.'},
  segment:{name:'Area of a Circular Segment',sub:'Measure the region between chord and arc',category:'Circle geometry',title:'Find the area cut off by a chord',intro:'Calculate the area of a circular segment from the radius and segment height.',insight:'The area separates into a sector minus a triangle once the central angle is known.',method:'Recover the half-angle from h/(2R), then evaluate R²(θ−sinθ cosθ).',limits:'The height must lie between zero and the full diameter, inclusive. Trigonometric values and the displayed area are numerical approximations.',history:'Arc-and-chord area is a natural modern counterpart to historical enri problems.'},
  ellipticarc:{name:'Elliptical Arc Length',sub:'Find the length of a selected arc of an ellipse',category:'Numerical integration',title:'Calculate the length of an ellipse between two parameters',intro:'Integrate the ellipse speed over a chosen parameter-angle interval.',insight:'Upper and lower estimates from a partition reveal the reliability of a numerical integral.',method:'Use composite Simpson’s rule for the estimate, and bound each subinterval using its minimum and maximum speed.',limits:'The bounds follow mathematical inequalities but are evaluated in floating-point arithmetic, without a guarantee covering rounding error. Very slender ellipses may need more subdivisions.',history:'This is a modern extension from complete circumference to partial curved length.'},
  revolution:{name:'Volume of Revolution',sub:'Rotate a curve to make a solid',category:'Exact integration',title:'Find the volume generated by a polynomial profile',intro:'Rotate the region between y=P(x) and the x-axis over the chosen interval, and calculate the exact coefficient of pi in the volume.',insight:'Squaring the radius converts the solid into the integral of an ordinary polynomial.',method:'Square P exactly, integrate coefficient by coefficient, and evaluate at rational endpoints.',limits:'The formula treats |P(x)| as a radius through P(x)². Inputs follow the stated degree and interval bounds.',history:'This is a modern integration tool placed alongside area and solid problems in the broader wasan laboratory.'},
  pappus:{name:'The Arbelos Circle Chain',sub:'Follow circles toward a cusp',category:'Circle chains',title:'Calculate circles deep inside an arbelos',intro:'Find the radius and center height of the nth circle in a Pappus chain.',insight:'A geometric chain with infinitely many circles collapses to a rational formula in the index.',method:'Apply the exact arbelos formula for radius and vertical position, then verify neighboring tangencies.',limits:'The two inner semicircle radii must be positive and use the same unit.',history:'Pappus chains are used as a modern comparative circle-chain example rather than attributed to a historical Japanese source.'},
  cyclic:{name:'Cyclic Quadrilateral from Four Sides',sub:'Recover area, diagonals, and circumcircle',category:'Geometry',title:'Build a cyclic quadrilateral from its sides',intro:'Use four side lengths to calculate the cyclic quadrilateral’s area and associated geometry.',insight:'Brahmagupta’s symmetric area formula extends the three-side pattern of Heron.',method:'Compute the exact squared area from the semiperimeter, then derive the diagonals and circumradius.',limits:'The positive side lengths must form a nondegenerate cyclic quadrilateral. Square roots are displayed numerically when irrational.',history:'This is a comparative modern tool for four-side geometry, not a claim of a unique wasan provenance.'},
  tetrahedron:{name:'Tetrahedron from Six Edges',sub:'Recover volume from edge lengths',category:'Solid geometry',title:'Find a tetrahedron’s volume from its six edges',intro:'Determine whether six lengths form a tetrahedron and calculate its volume.',insight:'A Gram matrix converts all six distance constraints into one determinant.',method:'Build the exact Gram matrix from squared edge lengths; det(G)/36 is the squared volume.',limits:'Every face must satisfy triangle inequalities and the Gram determinant must be positive for a genuine three-dimensional tetrahedron.',history:'This modern determinant formulation continues the site’s theme of exact area and volume reconstruction.'},
  josephus:{name:'Mamako-date and Elimination Circles',sub:'Count around a ring to find the survivors',category:'Discrete algorithms',title:'Find the final position in a counting-out process',intro:'Remove every kth person around a circle and report the requested final survivors.',insight:'A circular story becomes a compact modular recurrence when only the final survivor matters.',method:'Use the Josephus recurrence for one survivor and direct indexed simulation when several survivors are requested.',limits:'Population, step, start, and survivor count must be integers in the documented ranges.',history:'Mamako-date is a Japanese counting-out tale related to the wider Josephus family of problems.'},
  magic:{name:'Magic Squares',sub:'Make rows, columns, and diagonals agree',category:'Discrete constructions',title:'Construct a square with one common line sum',intro:'Generate a normal magic square of any supported order and verify every row, column, and main diagonal.',insight:'Odd, doubly even, and singly even orders require genuinely different constructions.',method:'Choose the standard construction for the order class, then recompute every required sum.',limits:'Order two has no normal magic square; supported orders run from 3 through 16.',history:'Magic squares were studied across Asia, and Japanese mathematicians produced notable Edo-period work on them.'},
  survey:{name:'Two-Station Surveying',sub:'Measure an inaccessible height',category:'Practical geometry',title:'Find height from two lines of sight',intro:'Use two observation points on one line and their measured slopes to infer a target’s height.',insight:'The unknown horizontal distance cancels when the two similar-triangle equations are compared.',method:'Solve the two exact slope equations for distance and height, including the observer’s eye height.',limits:'The nearer slope must exceed the farther slope and both observations must share a straight, level baseline.',history:'Surveying was an important practical application of Japanese mathematics; this screen uses a simplified two-station model.'},
  continued:{name:'Continued Fractions and Best Ratios',sub:'Approximate with a small denominator',category:'Ratios and approximation',title:'Choose the closest fraction under a denominator limit',intro:'Find the best rational approximation permitted by a maximum denominator.',insight:'Continued fractions identify exceptional approximations without testing every numerator and denominator.',method:'Expand the exact input as a continued fraction and compare the final convergent or semiconvergent at the limit.',limits:'“Best” means minimum absolute error among denominators up to the chosen bound, with deterministic tie handling.',history:'Approximation by ratios provides a modern lens for numerical practices found throughout traditional computation.'},
  pythagorean:{name:'Integer Right-Triangle Triples',sub:'Make a right triangle with integer sides',category:'Integer geometry',title:'Construct exact Pythagorean triples',intro:'Generate three integer sides satisfying the right-triangle equation.',insight:'Two integers parameterize an infinite family of exact right triangles.',method:'Calculate m²−n², 2mn, and m²+n², then apply the chosen scale and verify the square identity.',limits:'Require m>n>0. Coprimality and opposite parity are needed only when a primitive triple is desired.',history:'Integer right triangles were studied in many traditions; this tool connects them to the kō-ko terminology of East Asian mathematics.'},
  polygonarea:{name:'Polygon Area from Coordinates',sub:'Measure an irregular boundary from coordinates',category:'Practical geometry',title:'Find area and centroid from ordered vertices',intro:'Calculate the signed area, absolute area, orientation, and centroid of a simple polygon.',insight:'Cross-products of neighboring vertices accumulate the boundary’s contribution to area.',method:'Apply the shoelace sums exactly and divide the corresponding moments by six times the signed area.',limits:'Vertices must be supplied in boundary order. Self-intersections and repeated-edge ambiguities are not interpreted as a simple land parcel.',history:'Coordinate area provides a modern computational counterpart to practical survey-area problems.'},
  spherezone:{name:'Volume and Centroid of a Spherical Zone',sub:'Cut a sphere with two parallel planes',category:'Solid geometry',title:'Measure one layer of a sphere',intro:'Calculate the volume, curved surface area, and centroid between two horizontal cuts.',insight:'Horizontal cross-sections are circles whose squared radii are simple quadratic polynomials in height.',method:'Integrate π(R²−z²) and its first moment exactly between the two cut heights.',limits:'Both heights must lie within the sphere and the upper height must exceed the lower one.',history:'This is a modern calculus presentation of a natural solid-of-revolution problem.'},
  torus:{name:'Volume and Surface Area of a Torus',sub:'Rotate a circle into a ring',category:'Solid geometry',title:'Calculate a torus’s volume and surface area',intro:'Find the exact coefficients of π² in a torus’s volume and surface area.',insight:'The result can be seen either by direct integration or by moving a generating circle around a circular path.',method:'Apply V=2π²Rr² and S=4π²Rr with exact rational radii.',limits:'Both radii must be positive, with R≥r. R>r gives a ring torus; R=r gives a horn torus.',history:'This modern solid-of-revolution example broadens the site’s collection of traditional-style mensuration problems.'},
  malfatti:{name:'Three Tangent Circles in a Triangle',sub:'Fit three mutually tangent circles',category:'Triangle geometry',title:'Place three touching circles inside a triangle',intro:'Calculate the classical Malfatti circles tangent to pairs of triangle sides and to one another.',insight:'Expressing each center along an angle bisector reduces the contact conditions to equations in the radii.',method:'Construct the triangle, solve the coupled radius relations numerically, and verify side and circle contacts.',limits:'The sides must form a nondegenerate triangle. Results are numerical and should be judged by the reported residuals.',history:'The configuration is used as a modern comparison for Japanese three-side, three-circle problems; historical naming and modern theorem are kept distinct.'},
  apollonius:{name:'Circles Tangent to Three Given Circles',sub:'Enumerate internal and external contacts',category:'Circle geometry',title:'Find every supported tangent-circle candidate',intro:'Given three positioned circles, solve the sign choices for internal and external tangency.',insight:'Subtracting squared distance equations removes the quadratic center terms and leaves a linear center in the unknown radius.',method:'Solve each tangency-sign branch, substitute into the remaining quadratic, and verify every distance condition.',limits:'Degenerate and coincident configurations may have infinitely many solutions or require cases outside this solver.',history:'The Apollonius formulation is a modern general framework that helps compare many special tangent-circle problems.'},
  hermite:{name:'Hermite Interpolation',sub:'Match both values and slopes',category:'Interpolation',title:'Find a polynomial with prescribed values and slopes',intro:'For n distinct x-values, construct the unique polynomial of degree at most 2n−1 that matches the supplied values and first derivatives.',insight:'Hermite basis polynomials encode derivative information as well as point values.',method:'Construct Hermite basis polynomials for the values and slopes, then combine and evaluate them in exact rational arithmetic.',limits:'x-values must be distinct. The resulting degree is at most 2n−1 and does not guarantee behavior between or beyond the conditions.',history:'This modern extension lets visitors compare ordinary difference interpolation with a problem that also fixes slopes.'},
  squarefree:{name:'Square-Free Factorization',sub:'Separate factors by root multiplicity',category:'Exact algebra',title:'Identify which factors repeat how many times',intro:'Decompose a polynomial into factors that occur once, twice, three times, and so on.',insight:'Greatest common divisors with the derivative reveal repeated structure without solving for any root.',method:'Apply Yun’s exact square-free algorithm and normalize the factors over the rationals.',limits:'The tool separates multiplicities but does not necessarily split each square-free factor into irreducibles.',history:'This modern algebraic tool supports the certified root and discriminant screens.'},
  reversion:{name:'Reversion of a Power Series',sub:'Swap the input and output of a series',category:'Series',title:'Construct the local inverse series',intro:'Given f with zero constant term and nonzero linear term, find g so that f(g(x))=x to the requested order.',insight:'Each new inverse coefficient appears linearly once the lower-order coefficients are fixed.',method:'Compose truncated series in exact rational arithmetic and solve the coefficients in increasing order.',limits:'The result is a formal local inverse. A nonzero linear coefficient is essential, and analytic convergence is not asserted.',history:'Series reversion is a modern extension of coefficient-centered computational methods.'},
  cyclotomic:{name:'Cyclotomic Polynomials and Algebraic Degree',sub:'Explore the algebraic structure of regular polygons',category:'Angles and algebra',title:'Find the minimal polynomial of twice the cosine',intro:'Compute the minimal polynomial of t=2cos(2π/n) and verify its relation to the nth cyclotomic polynomial.',insight:'Pairing a root of unity with its reciprocal converts complex rotation into a real algebraic quantity.',method:'Construct Φn(z), eliminate reciprocal pairs, and recover the integer polynomial in t.',limits:'The tool treats n from 3 through 60. Constructibility by straightedge and compass is a separate question.',history:'This modern algebraic result sharpens the polynomial viewpoint introduced by the kakujutsu screen.'},
  boxmax:{name:'Takebe’s Maximum-Volume Box',sub:'Find the largest box allowed by two conditions',category:'Optimization',title:'Locate the dimensions that maximize volume',intro:'Maximize V(w)=w(w+D)(S−w) under the positive-dimension constraints.',insight:'A verbal geometry problem becomes a single cubic whose derivative locates the interior optimum.',method:'Solve the derivative quadratic, retain feasible critical points, and compare them with the boundary behavior.',limits:'D must be non-negative and S positive. The displayed optimum is numerical and is checked against the feasible interval.',history:'The screen is based on a maximum-volume problem associated with Takebe Katahiro, expressed here with modern variables and calculus checks.'},
  ajima4:{name:'Ajima’s Four Circles in a Triangle',sub:'Fit four circles under one contact pattern',category:'Triangle geometry',title:'Place four constrained circles inside a triangle',intro:'Construct the four-circle configuration associated with Ajima Naonobu’s advanced sangaku geometry.',insight:'An algebraic solution is valid only if it also satisfies every tangency and containment condition.',method:'Solve the diameter equation for the vertex circle, select the admissible branch, place the other centers, and measure all residuals.',limits:'The sides must form a valid triangle. The construction is numerical, and only branches passing the reported contact checks are retained.',history:'This reconstruction follows the documented four-circle problem while stating its modern coordinate choices and numerical verification explicitly.'},
  ellipsetriangle:{name:'Two Ellipses and a Minimum-Height Triangle',sub:'Solve a sangaku minimum problem',category:'Optimization',title:'Find the least height forced by two ellipses',intro:'Study the minimum triangle height compatible with two differently oriented congruent ellipses.',insight:'The excess over the minimum factors as a non-negative square ratio, making the optimum visible without a numerical search.',method:'Express height in the axis ratio k and prove H−4q=q(k−2)²/(k−1).',limits:'The short-axis length is positive and k>1. The equality case occurs at the stated ratio.',history:'The page presents a modern proof of an ellipse optimization problem in the sangaku tradition.'},
  diskcuts:{name:'Disk Cuts for Specified Area Ratios',sub:'Divide a circle with parallel lines',category:'Numerical geometry',title:'Place cuts for prescribed area ratios',intro:'Find the parallel chord positions that split a disk into specified fractional areas.',insight:'The cumulative segment area is monotone, so each requested boundary has exactly one position.',method:'Normalize to the unit disk, invert the cumulative area function by safeguarded bisection, then rescale.',limits:'All weights must be positive and not vanishingly small relative to the total. Positions are numerical and checked by area residuals.',history:'This is a modern computational extension of circle-division and mensuration themes.'},
  heronpell:{name:'Consecutive-Side Heron Triangles',sub:'Make both sides and area integral',category:'Integer geometry',title:'Generate triangles with consecutive integer sides and integer area',intro:'Produce the sequence of triangles with sides differing by one and integral Heron area.',insight:'Heron’s condition transforms into the Pell equation x²−3y²=1.',method:'Advance through Pell solutions and convert each one into three sides and an exact area.',limits:'The generator returns the first requested solutions in increasing order; integers grow rapidly.',history:'This modern number-theoretic screen links three-side mensuration with Pell recurrences.'},
  conic:{name:'Rational Parametrization of a Conic',sub:'Trace a curve from one known point',category:'Algebraic geometry',title:'Generate another rational point from a line',intro:'Intersect a line of rational slope through a known rational point with a quadratic curve.',insight:'Because one intersection is already known, the substituted quadratic factors and exposes the second point rationally.',method:'Substitute y−y0=t(x−x0), divide out the known root, and solve the remaining linear factor exactly.',limits:'The supplied base point must lie on the conic. Tangent and degenerate line cases are reported separately.',history:'This is a modern algebraic construction included to extend exact equation and geometry work.'},
  curveintersect:{name:'All Intersections of a Circle and a Parabola',sub:'Find crossings and points of tangency',category:'Certified geometry',title:'Find all real intersection points',intro:'Reduce a circle–parabola intersection to one polynomial and isolate every real x-coordinate.',insight:'Elimination turns a two-curve picture into a complete one-variable root-counting problem.',method:'Substitute the parabola into the circle, square-free factor the resulting quartic, isolate all real roots, and reconstruct y.',limits:'Tangencies are retained with multiplicity information. Decimal coordinates summarize certified rational x-intervals.',history:'This modern tool joins elimination, exact root isolation, and geometry in one calculation that can be checked step by step.'},
  extrema:{name:'Minimum and Maximum on an Interval',sub:'Certify the best values from both sides',category:'Certified optimization',title:'Inspect an entire interval for extrema',intro:'Find global minimum and maximum values of a polynomial on a closed rational interval.',insight:'Only the endpoints and real roots of the derivative can contain the global extrema.',method:'Isolate every derivative root in the interval, evaluate the endpoint and stationary-point candidates with interval arithmetic, and combine their bounds.',limits:'The polynomial degree and coefficient size are bounded. Results are certified intervals, not symbolic radical expressions.',history:'This modern optimization tool generalizes the single box problem and makes the completeness check explicit.'},
  bernstein:{name:'Bernstein Bounds for a Curve',sub:'Enclose every value on an interval',category:'Certified bounds',title:'Narrow a guaranteed range for the whole curve',intro:'Convert a polynomial on each subinterval to Bernstein form and use its coefficients as exact bounds.',insight:'On [0,1], the Bernstein basis functions are nonnegative and sum to one. A polynomial in this basis is therefore a weighted average of its coefficients.',method:'Map the interval to [0,1], convert exactly, and optionally bisect to tighten the union of bounds.',limits:'Deeper subdivision improves bounds but increases the number of intervals. The result encloses the range and need not equal the exact extrema.',history:'This modern certified technique complements derivative-based optimization.'},
  partialfractions:{name:'Partial-Fraction Decomposition',sub:'Untangle a rational expression',category:'Exact algebra',title:'Split repeated linear factors into simple fractions',intro:'Decompose a rational function whose denominator is supplied as linear factors with multiplicities.',insight:'Local principal parts at each repeated root separate interactions that are hidden in the combined denominator.',method:'Perform exact polynomial division, build a rational linear system for the coefficients, and verify recombination.',limits:'Only linear factors with rational roots are supported.',history:'This modern symbolic tool supports rational approximation and series calculations elsewhere on the site.'},
  recurrence:{name:'Fast Evaluation of Linear Recurrences',sub:'Evaluate distant terms without computing every step',category:'Discrete algorithms',title:'Calculate a term with a large index efficiently',intro:'Evaluate a constant-coefficient linear recurrence at a very large index, optionally modulo an integer.',insight:'Reducing powers of the shift modulo the characteristic polynomial replaces one trillion steps with logarithmically many squarings.',method:'Use binary exponentiation modulo the recurrence’s characteristic polynomial, then combine the initial values with the resulting coefficients.',limits:'Coefficients and initial values must be integers with absolute value at most 1,000,000. Indices start at 0. With modulus 0, calculation stops if an intermediate integer exceeds approximately 1,200 decimal digits. A positive modulus returns a non-negative remainder.',history:'This modern algorithm extends the geometric-growth idea of nezumizan to general linear recurrences.'},
  seriespower:{name:'Fractional Powers of a Series',sub:'Expand roots and negative powers',category:'Series',title:'Raise a normalized series to a rational exponent',intro:'Compute coefficients of F(x)^α when F(0)=1 and α is rational.',insight:'The differential identity Fg′=αF′g gives each new coefficient through earlier ones.',method:'Apply that identity recursively in exact rational arithmetic and verify by coefficient comparison when applicable.',limits:'The input constant term must be one. The output is a formal truncated series and makes no independent convergence claim.',history:'This modern series tool exposes the coefficient mechanism behind many root and reciprocal expansions.'},
  implicitseries:{name:'Series from an Implicit Equation',sub:'Expand a solution that is not explicitly isolated',category:'Series',title:'Recover y(x) coefficient by coefficient',intro:'Find a formal series solution of F(x,y)=0 from a chosen value y(0).',insight:'When the y-derivative at the base point is nonzero, each next coefficient is determined linearly.',method:'Substitute a truncated unknown series, collect terms by degree, and solve the next coefficient exactly.',limits:'The initial value must satisfy F(0,y0)=0 and Fy(0,y0) must be nonzero. The result is local and formal.',history:'This modern implicit-function calculation extends elimination into coefficient-by-coefficient solution.'},
  pade:{name:'Padé Approximation',sub:'Compress a series into a rational expression',category:'Series and approximation',title:'Build a fraction matching the known coefficients',intro:'Construct numerator and denominator polynomials whose quotient matches a supplied series through the requested order.',insight:'A rational function can encode poles and long-range behavior that a short polynomial truncation cannot.',method:'Solve the denominator coefficient equations exactly, recover the numerator, and verify every matched coefficient.',limits:'A requested type can be singular or non-unique. Agreement of series coefficients does not guarantee a uniform approximation away from the origin.',history:'This modern rational-approximation tool is presented beside wasan convergence ideas for comparison, not as a historical attribution.'}
};

const F = {
  sangaku:'1 / √r = 1 / √a + 1 / √b',enri:'inscribed semiperimeter < π < circumscribed semiperimeter',shosa:'P(x) = Σ C(t, k) Δᵏy₀; t = (x − x₀) / h',kaiho:'(20p + q)q ≤ the current remainder after bringing down the next two-digit group; q ∈ {0, …, 9}',tengen:'Bisect an interval whose endpoint values have opposite signs',hyakugo:'x ≡ r₁ (mod m₁), x ≡ r₂ (mod m₂), …',tawara:'S(n) = Σ ΔᵏS(0) · C(n, k)',tsurukame:'turtles = (legs − 2 × heads) / 2',kafusoku:'people = (surplus + deficit) / (larger share − smaller share)',nezumi:'final amount = initial amount × factor^steps',abura:'amount poured = min(source amount, free capacity at destination)',koko:'c² = a² + b²',sansha:'area² = s(s−a)(s−b)(s−c); s = (a+b+c)/2',kairitsu:'(300r² + 30rq + q²)q ≤ the current remainder after bringing down the next three-digit group',elimination:'R = (B−D)² + (A−C)(AD−BC)',roots:'number of real roots = V(a) − V(b) on (a,b]',arc:'(s/2d)² = Σ tₙ; t₁=z; z=c/d',pi:'π² = 18 Σ 1 / (n² C(2n,n))',descartes:'k₄ = k₁+k₂+k₃ ± 2√(k₁k₂+k₂k₃+k₃k₁)',gossett:'(Σ kᵢ)² = 3 Σ kᵢ² for five spheres',hexlet:'qₙ₊₁ = T + qₙ − qₙ₋₁; q=1/diameter',bernoulli:'Sₚ(N) = Σ C(p+1,j) βⱼ N^(p+1−j) / (p+1)',enritable:'I(p,q)=p!q!/(p+q+1)!; J(p,q)=(p−1)J(p−2,q)/(p+q)',ellipse:'L = 4aE(m) = 2πa(1−Σtₙ); m=1−b²/a²',cylinders:'V = 8∫₀ᵇ √(b²−z²)√(a²−z²) dz, a≥b',replacement:'h₁=bₘf−aₙy^(n−m)g; det H=(−1)^(nm) Resᵧ(f,g)',inversion:'Δ=x²+y²−r²; center=k²(x,y)/Δ; radius=|k²r/Δ|',steiner:'C=(R²+r²−d²)/(2Rr); δ=2 asin√((C−1)/(C+1)); nδ=2π',kakujutsu:'C₀=2, C₁=t, Cₖ=tCₖ₋₁−Cₖ₋₂; Cₙ(t)=2',linear:'Choose a pivot row and eliminate that unknown from every other row',polygcd:'gcd(f,g) = gcd(g, remainder of f divided by g)',discriminant:'D = (−1)^(n(n−1)/2) Res(f,f′) / aₙ',newtonsums:'Sₖ+a₁Sₖ₋₁+…+aₖ₋₁S₁+kaₖ=0 for k≤n',nthroot:'Lᵏ ≤ N·10^(kp) < (L+1)ᵏ',translation:'f(u+h) = Σ bₖuᵏ',series:'cₖ = (aₖ − Σⱼ₌₁ᵏ bⱼcₖ₋ⱼ) / b₀',segment:'A=R²(θ−sinθ cosθ); θ=2 asin√(h/(2R))',ellipticarc:'L = ∫ √(a²sin²t + b²cos²t) dt',revolution:'V = π∫ P(x)² dx',pappus:'rₙ=ab(a+b)/(a(a+b)+n²b²); yₙ=2nrₙ',cyclic:'K²=(s−a)(s−b)(s−c)(s−d); s=(a+b+c+d)/2',tetrahedron:'V²=det(G)/36; Gᵢⱼ=(ℓᵢ²+ℓⱼ²−ℓᵢⱼ²)/2',josephus:'j₁=0; jₙ=(jₙ₋₁+k) mod n',magic:'common line sum M = n(n²+1)/2',survey:'x=d·t_far/(t_near−t_far); H=x·t_near+eye height',continued:'x = a₀ + 1/(a₁ + 1/(a₂ + …))',pythagorean:'2mn, m²−n², m²+n²',polygonarea:'2A = |Σ(xᵢyᵢ₊₁−xᵢ₊₁yᵢ)|',spherezone:'V=π[R²z−z³/3]; curved area=2πR(z₂−z₁)',torus:'V=2π²Rr²; S=4π²Rr',malfatti:'Each circle touches two sides; center distances equal sums of radii',apollonius:'|center−centerᵢ| = |ρ+σᵢrᵢ|; σᵢ=±1',hermite:'P(xᵢ)=yᵢ, P′(xᵢ)=mᵢ; degree ≤ 2n−1',squarefree:'f = leading coefficient × F₁ × F₂² × F₃³ × …',reversion:'f(g(x))=x and g(f(x))=x through the requested order',cyclotomic:'zᵈ Ψ(z+z⁻¹)=Φₙ(z); d=φ(n)/2',boxmax:'V(w)=w(w+D)(S−w)',ajima4:'Solve the vertex-circle quadratic, then select the branch satisfying every contact',ellipsetriangle:'H−4q = q(k−2)²/(k−1) ≥ 0',diskcuts:'C(u)=u√(1−u²)+arcsin(u)+π/2',heronpell:'x²−3y²=1; sides=2x−1, 2x, 2x+1',conic:'Substitute y−y₀=t(x−x₀) into the quadratic curve',curveintersect:'(x−h)²+(ax²+bx+c−k)²=r²',extrema:'Inspect the endpoints and every real root of f′(x)',bernstein:'min(bₖ) ≤ Σ bₖBₖ,ₙ(t) ≤ max(bₖ)',partialfractions:'P(x)/D(x) = polynomial part + Σ Aᵢ,ⱼ/(x−rᵢ)ʲ',recurrence:'a(n)=c₁a(n−1)+…+c_d a(n−d)',seriespower:'Fg′ = αF′g; g(0)=1',implicitseries:'F(x,y(x))=0; Fᵧ(0,y₀)≠0',pade:'Q(x)f(x)−P(x)=O(x^(m+n+1)); Q(0)=1'
};

const fieldNames={rounds:'Number of side doublings',values:'Known values y₀, y₁, …',x0:'Starting position x₀',h:'Step size h',x:'Target position x',y:'y',value:'Value',precision:'Decimal places',coefficients:'Coefficients',lower:'Left endpoint',upper:'Right endpoint',tolerance:'Allowed interval width',conditions:'Modulus and remainder, one pair per line',n:'Upper summation limit n',power:'Power p',heads:'Total heads',legs:'Total legs',surplus:'Surplus',deficit:'Deficit',initial:'Initial value',factor:'Multiplier per step',steps:'Number of steps',target:'Target',a:'a',b:'b',c:'c',d:'d',r:'Radius r',k:'Radius k',branch:'Solution shown in the diagram',angle:'Viewing angle (degrees)',outer:'Outer radius R',sun:'Sun-sphere radius a',moon:'Moon-sphere radius b',phase:'Starting angle (degrees)',mode:'Integral family',p:'Exponent p',q:'Exponent q',terms:'Number of terms',f:'First polynomial f',g:'Second polynomial g',inner:'Inner radius r',offset:'Center offset d',number:'Number of circles',radius:'Radius R',order:'Requested order',shift:'Shift h',numerator:'Numerator coefficients',denominator:'Denominator coefficients',start:'Starting angle (degrees)',end:'Ending angle (degrees)',parts:'Number of subdivisions',points:'Vertices, one x,y pair per line',major:'Major radius R',minor:'Minor radius r',data:'Conditions, one x,value,slope row per line',difference:'Length minus width D',sum:'Width plus height S',short:'Full minor-axis length q',ratio:'Axis ratio k',weights:'Area weights from left to right',count:'Number of results',slope:'Line slope t',demand:'Demand',m:'m',modulus:'Modulus (0 for exact arithmetic)',matrix:'Augmented matrix, one equation per line',degree:'Root index k',height:'Segment height h',step:'Count every kth person',remaining:'Number of survivors',baseline:'Distance between observation points',near:'Slope from the nearer point',far:'Slope from the farther point',eye:'Observer eye height',scale:'Scale factor',circles:'Circle centers and radii, one x,y,r row per line',depth:'Subdivision depth',factors:'Denominator factors, one root,multiplicity pair per line',index:'Term index n',exponent:'Exponent α'};
const fieldOverrides={
  sangaku:{a:'Left circle radius a',b:'Right circle radius b'},
  kaiho:{value:'Number N'},tengen:{coefficients:'Coefficients, highest degree first'},
  tawara:{n:'Upper summation limit n'},kafusoku:{a:'Smaller share per person',b:'Larger share per person',surplus:'Amount left over',deficit:'Amount short'},
  abura:{a:'Capacity of vessel A (initially full)',b:'Capacity of vessel B',c:'Capacity of vessel C',target:'Amount to measure'},
  koko:{a:'Leg kō, a',b:'Leg ko, b'},sansha:{a:'Side a',b:'Side b',c:'Side c'},
  kairitsu:{value:'Number N'},elimination:{a:'Coefficients of A(x)',b:'Coefficients of B(x)',c:'Coefficients of C(x)',d:'Coefficients of D(x)'},
  roots:{coefficients:'Coefficients, highest degree first'},arc:{diameter:'Diameter d',sagitta:'Sagitta c'},
  descartes:{a:'Radius of circle A',b:'Radius of circle B',c:'Radius of circle C'},
  gossett:{a:'Radius of sphere A',b:'Radius of sphere B',c:'Radius of sphere C',d:'Radius of sphere D'},
  bernoulli:{n:'Upper summation limit N'},ellipse:{a:'Semimajor axis a',b:'Semiminor axis b'},
  cylinders:{a:'Radius of cylinder A',b:'Radius of cylinder B'},
  inversion:{x:'Original center x',y:'Original center y',r:'Original radius r',k:'Inversion radius k'},
  steiner:{number:'Number of circles n'},kakujutsu:{n:'Number of sides n',radius:'Circumradius R'},
  polygcd:{f:'Polynomial f',g:'Polynomial g'},newtonsums:{coefficients:'Equation coefficients',order:'Highest power k'},
  nthroot:{value:'Number N',degree:'Root index k'},translation:{coefficients:'Original polynomial coefficients'},
  series:{numerator:'Numerator coefficients, constant term first',denominator:'Denominator coefficients, constant term first',order:'Truncation degree N'},
  ellipticarc:{a:'Horizontal semiaxis a',b:'Vertical semiaxis b'},revolution:{coefficients:'Radius polynomial P(x)'},
  pappus:{a:'Left inner-circle radius a',b:'Right inner-circle radius b',number:'Last circle to calculate'},
  cyclic:{a:'Side AB',b:'Side BC',c:'Side CD',d:'Side DA'},
  tetrahedron:{ab:'Edge AB',ac:'Edge AC',ad:'Edge AD',bc:'Edge BC',bd:'Edge BD',cd:'Edge CD'},
  josephus:{number:'Number of people',start:'Starting position'},continued:{value:'Number to approximate',denominator:'Maximum denominator'},
  pythagorean:{m:'Larger integer m',n:'Smaller integer n'},spherezone:{lower:'Lower height z₁',upper:'Upper height z₂'},
  torus:{major:'Distance from axis to tube center R',minor:'Tube radius r'},
  malfatti:{a:'Side BC, opposite A',b:'Side CA, opposite B',c:'Side AB, opposite C'},
  hermite:{target:'Evaluation point x'},reversion:{coefficients:'Coefficients of f, constant term first',order:'Truncation degree N'},
  cyclotomic:{n:'Number of divisions n'},ajima4:{a:'Side BC',b:'Side CA',c:'Side AB'},
  conic:{coefficients:'Coefficients A, B, C, D, E, F',x:'Known point x₀',y:'Known point y₀'},
  curveintersect:{a:'Quadratic coefficient a',b:'Linear coefficient b',c:'Constant term c',h:'Circle center h',k:'Circle center k'},
  partialfractions:{factors:'Denominator factors, one root,multiplicity pair per line'},
  recurrence:{coefficients:'Recurrence coefficients c₁,c₂,…',initial:'Initial values a(0),a(1),…'},
  seriespower:{coefficients:'Series coefficients, constant term first',order:'Highest degree N'},
  implicitseries:{terms:'Terms of F(x,y), one x-power,y-power,coefficient row per line',initial:'Value y(0)',order:'Highest degree'},
  pade:{coefficients:'Series coefficients, constant term first',m:'Numerator degree m',n:'Denominator degree n',target:'Evaluation point x'}
};
const H={
  sangaku:{a:'0.000001 to 1,000,000.',b:'Use the same unit as a.'},enri:{rounds:'Computes through a polygon with 6 × 2ⁿ sides.'},
  shosa:{values:'Enter 2–12 comma-separated values; fractions are accepted.',x:'For example: 5, 0.5, or 1/2.'},
  kaiho:{value:'A non-negative integer or decimal, no more than 160 characters; scientific notation is not accepted.'},
  tengen:{coefficients:'For x²−2=0, enter 1, 0, -2. Degree 1–8; each coefficient must be no greater than 10⁶ in absolute value.'},
  hyakugo:{conditions:'Enter 1–10 rows. Each modulus must be at least 2; integers may contain up to 80 digits.'},
  tawara:{n:'A non-negative integer of up to 80 digits.'},tsurukame:{heads:'A non-negative integer of up to 80 digits.',legs:'An even integer between twice and four times the number of heads.'},
  nezumi:{initial:'A non-negative integer of up to 80 digits.',factor:'An integer from 1 to 100.',steps:'An integer from 0 to 100.'},
  abura:{a:'Each vessel capacity must be an integer from 1 to 100, measured in the same unit.',target:'An integer from 1 through the capacity of vessel A.'},
  koko:{a:'A decimal from 0.000001 to 1,000,000, no more than 30 characters.',b:'Use the same unit as a.'},
  sansha:{a:'Each side must be from 0.000001 to 1,000,000; decimals may contain up to 30 characters.'},
  kairitsu:{value:'A non-negative integer or decimal, no more than 100 characters; scientific notation is not accepted.'},
  elimination:{a:'Enter coefficients from highest degree downward. Degree 2 or less; integer coefficients from −1000 to 1000.',b:'For example, 1, 0, −2 represents x²−2.'},
  roots:{coefficients:'Degree 1–8, highest degree first; each integer coefficient must have absolute value at most 10¹⁸.'},
  arc:{diameter:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',sagitta:'At least 0.001 and no more than half the diameter.'},
  descartes:{a:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted. The largest radius may be at most 10,000 times the smallest.'},
  gossett:{a:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted. The largest radius may be at most 10,000 times the smallest.'},
  hexlet:{outer:'From 0.001 to 1,000,000. Enter a radius, not a diameter.',sun:'Require a+b≤R; each inner radius must be at least R/1000.',phase:'A decimal angle from 0° to 360°.'},
  bernoulli:{n:'A non-negative integer of up to 80 digits.',power:'An integer from 0 to 40.'},
  enritable:{p:'An integer from 0 to 40.',q:'From 0 to 40. Family 1 is xᵖ(1−x)ᑫ; family 2 is sinᵖθ cosᑫθ.'},
  ellipse:{a:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',b:'The calculator automatically identifies the larger and smaller semiaxes.',terms:'From 1 to 1,000. Slender ellipses may require many terms.'},
  cylinders:{a:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',b:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',terms:'An integer from 1 to 1,000.'},
  replacement:{f:'Enter one coefficient row for each power of y, highest first; within a row, list powers of x highest first. The example represents y³−x.',g:'Each row may be quadratic in x, with integer coefficients from −1000 to 1000. The example represents y²−1.'},
  inversion:{x:'Absolute value at most 1,000,000; decimals and fractions are accepted.',r:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',k:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.'},
  steiner:{outer:'From 0.001 to 1,000,000; integers, decimals, and fractions are accepted.',offset:'Non-negative, with d+r<R.',number:'An integer from 3 to 24; the test is for a ring closing in one revolution.',phase:'From 0° to 360°, measured on the concentric-circle image.'},
  kakujutsu:{n:'An integer from 3 to 60.',radius:'From 0.001 to 1,000,000; decimals and fractions are accepted.'},
  linear:{matrix:'Enter 2–6 rows. Each row lists the coefficients of x₁, x₂, … followed by the right-hand side. Each value may contain up to 24 characters and have absolute value at most 1,000,000.'},
  polygcd:{f:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted.',g:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted.'},
  discriminant:{coefficients:'Highest degree first; degree 1–8. Each value may contain up to 24 characters and have absolute value at most 1,000,000.'},
  newtonsums:{coefficients:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted.',order:'An integer from 1 to 30.'},
  nthroot:{value:'An integer, decimal, or fraction of up to 80 characters.',degree:'An integer from 2 to 20.',precision:'An integer from 0 to 40.'},
  translation:{coefficients:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted.',shift:'Up to 24 characters, with absolute value at most 1,000,000.'},
  series:{numerator:'Constant term first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000.',denominator:'The constant term must be nonzero. Note that this coefficient order is the reverse of the polynomial tools.',order:'An integer from 0 to 30.'},
  segment:{radius:'From 0.001 to 1,000,000; decimals and fractions are accepted.',height:'From zero through the full diameter; decimals and fractions are accepted.'},
  ellipticarc:{a:'From 0.001 to 1,000,000; decimals and fractions are accepted.',b:'From 0.001 to 1,000,000; decimals and fractions are accepted.',start:'From 0° to 360°.',end:'At least the starting angle and no more than 360°.',parts:'An integer from 16 to 4,096.'},
  revolution:{coefficients:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted.',lower:'Up to 24 characters, with absolute value at most 1,000,000.',upper:'Must be greater than the left endpoint.'},
  pappus:{a:'From 0.001 to 1,000,000; decimals and fractions are accepted.',b:'From 0.001 to 1,000,000; decimals and fractions are accepted.',number:'An integer from 1 to 100.'},
  cyclic:{a:'From 0.001 to 1,000,000; decimals and fractions are accepted.',b:'From 0.001 to 1,000,000; decimals and fractions are accepted.',c:'From 0.001 to 1,000,000; decimals and fractions are accepted.',d:'From 0.001 to 1,000,000; decimals and fractions are accepted.'},
  tetrahedron:{ab:'From 0.001 to 1,000,000; decimals and fractions are accepted.',ac:'From 0.001 to 1,000,000; decimals and fractions are accepted.',ad:'From 0.001 to 1,000,000; decimals and fractions are accepted.',bc:'From 0.001 to 1,000,000; decimals and fractions are accepted.',bd:'From 0.001 to 1,000,000; decimals and fractions are accepted.',cd:'From 0.001 to 1,000,000; decimals and fractions are accepted.'},
  josephus:{number:'An integer from 2 to 200.',step:'An integer from 1 to 1,000,000,000,000.',start:'From 1 through the number of people.',remaining:'From 1 through the number of people.'},
  magic:{order:'An integer from 3 to 16.'},
  survey:{baseline:'From 0.001 to 1,000,000; decimals and fractions are accepted.',near:'From 0.001 to 1,000,000; decimals and fractions are accepted.',far:'From 0.001 to 1,000,000; decimals and fractions are accepted.',eye:'From 0 to 1,000,000; decimals and fractions are accepted.'},
  continued:{value:'An integer, decimal, or fraction of up to 80 characters.',denominator:'An integer from 1 to 1,000,000,000,000.'},
  pythagorean:{m:'From 1 to one billion, with m>n.',n:'From 1 to one billion.',scale:'An integer from 1 to one billion.'},
  polygonarea:{points:'Enter 3–30 vertices. Each coordinate may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted. Total input is limited to 1,400 characters.'},
  spherezone:{radius:'From 0.001 to 1,000,000; decimals and fractions are accepted.',lower:'The sphere center is z=0; require z₁≥−R.',upper:'Require z₂>z₁ and z₂≤R.'},
  torus:{major:'From 0.001 to 1,000,000; decimals and fractions are accepted.',minor:'From 0.001 to 1,000,000; decimals and fractions are accepted.'},
  malfatti:{a:'From 0.001 to 1,000,000; decimals and fractions are accepted.',b:'From 0.001 to 1,000,000; decimals and fractions are accepted.',c:'From 0.001 to 1,000,000; decimals and fractions are accepted.'},
  apollonius:{circles:'Enter exactly three rows. Coordinates must have absolute value at most 1,000,000; radii must be from 0.001 to 1,000,000. Each value is limited to 24 characters and total input to 1,400 characters.'},
  hermite:{data:'Enter 2–6 rows. Each value may contain up to 24 characters and have absolute value at most 1,000,000; decimals and fractions are accepted. Total input is limited to 1,400 characters.',target:'Up to 24 characters, with absolute value at most 1,000,000.'},
  squarefree:{coefficients:'Highest degree first; degree 1–12. Each value may contain up to 24 characters and have absolute value at most 1,000,000.'},
  reversion:{coefficients:'Constant term zero and linear coefficient nonzero; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000.',order:'An integer from 1 to 20.'},
  cyclotomic:{n:'An integer from 3 to 60.'},boxmax:{difference:'From 0 to 1,000,000; decimals and fractions are accepted.',sum:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.'},
  ajima4:{a:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.',b:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.',c:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.'},
  ellipsetriangle:{short:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.',ratio:'Greater than 1 and no more than 1,000; decimals and fractions are accepted.'},
  diskcuts:{radius:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.',weights:'Enter 2–20 positive values, left to right. Each may contain up to 24 characters and have absolute value at most 1,000,000; each share must be at least one hundred-millionth of the total.'},
  heronpell:{count:'An integer from 1 to 100.'},
  conic:{coefficients:'Each value may contain up to 24 characters and have absolute value at most 1,000,000. The curve is Ax²+Bxy+Cy²+Dx+Ey+F=0.'},
  curveintersect:{radius:'From 0.001 to 1,000,000; each value is limited to 24 characters. Decimals and fractions are accepted.'},
  extrema:{coefficients:'Highest degree first; degree at most 8. Each value may contain up to 24 characters and have absolute value at most 1,000,000.'},
  bernstein:{coefficients:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000.',depth:'An integer from 0 to 7, producing at most 128 subintervals.'},
  partialfractions:{numerator:'Highest degree first; degree at most 12. Each value may contain up to 24 characters and have absolute value at most 1,000,000.',factors:'The denominator is ∏(x−r)^m. Enter one root and multiplicity per row; total degree at most 10. Each value may contain up to 24 characters and have absolute value at most 1,000,000; total input is limited to 600 characters.'},
  recurrence:{coefficients:'Enter 1–8 integers, each of up to 24 characters and absolute value at most 1,000,000.',initial:'Enter the same number of integers as recurrence coefficients; each has the same size limits.',index:'An integer from 0 to 1,000,000,000,000.',modulus:'An integer from 0 through 1,000,000,000,000,000,000.'},
  seriespower:{coefficients:'Constant term first; require constant term 1 and degree at most 20. Each value may contain up to 24 characters and have absolute value at most 1,000,000.',exponent:'From −20 to 20; decimals and fractions are accepted.',order:'An integer from 1 to 20.'},
  implicitseries:{terms:'Enter at most 16 rows defining F=0. Each row gives the x exponent, y exponent, and coefficient; exponents run from 0 to 8. Each value may contain up to 24 characters and have absolute value at most 1,000,000; total input is limited to 1,400 characters.',initial:'Up to 24 characters, with absolute value at most 1,000,000.',order:'An integer from 1 to 16.'},
  pade:{coefficients:'Constant term first; enter at most 17 values. Each may contain up to 24 characters and have absolute value at most 1,000,000.',m:'An integer from 0 to 8.',n:'An integer from 0 to 8.',target:'Up to 24 characters, with absolute value at most 1,000,000.'}
};
const exampleNames={
  "sangaku": [
    "Radii 9 and 4",
    "Equal circles",
    "Large and small circles"
  ],
  "enri": [
    "Start with a hexagon",
    "768 sides",
    "A closer approximation"
  ],
  "shosa": [
    "Continue the square numbers",
    "Between known points",
    "Cube numbers"
  ],
  "kaiho": [
    "Square root of 2",
    "Square root of 12,345",
    "A perfect square"
  ],
  "tengen": [
    "x² − 2",
    "x³ − x − 1",
    "A quintic polynomial"
  ],
  "hyakugo": [
    "The classic 3, 5, 7 problem",
    "Non-coprime moduli",
    "Incompatible conditions"
  ],
  "tawara": [
    "A stack with 10 rows",
    "Sum of squares",
    "One trillion terms"
  ],
  "tsurukame": [
    "10 heads, 28 legs",
    "All turtles",
    "A smaller group"
  ],
  "kafusoku": [
    "Shares of 3 and 5",
    "A smaller distribution"
  ],
  "nezumi": [
    "The Jinkōki 12-month example",
    "Repeated doubling",
    "No growth"
  ],
  "abura": [
    "Measure 5 with 10, 7, 3",
    "Measure 4 with 8, 5, 3",
    "An impossible target"
  ],
  "koko": [
    "3–4–5 triangle",
    "5–12–13 triangle",
    "Equal legs"
  ],
  "sansha": [
    "13–14–15 triangle",
    "3–4–5 triangle",
    "Equilateral triangle"
  ],
  "kairitsu": [
    "Cube root of 2",
    "Cube root of 27",
    "A smaller cube"
  ],
  "elimination": [
    "Eliminate y from y²=x",
    "A sixth-degree resultant",
    "A common factor"
  ],
  "roots": [
    "Two repeated roots",
    "The Sanpō Shōjo quintic",
    "Degree 8, eight real roots",
    "No real roots"
  ],
  "arc": [
    "A 120° central angle",
    "A semicircle",
    "A shallow arc"
  ],
  "pi": [
    "Start with 10 digits",
    "Forty decimal places",
    "Certify 50 digits"
  ],
  "descartes": [
    "Three equal circles",
    "An enclosing circle",
    "A straight-line solution"
  ],
  "gossett": [
    "Four equal spheres",
    "An enclosing sphere",
    "A plane solution",
    "Four coplanar centers"
  ],
  "hexlet": [
    "The recorded diameters",
    "Change the starting position",
    "Six equal spheres"
  ],
  "bernoulli": [
    "Sum of 10th powers",
    "Sum of 40th powers",
    "A trillion squared terms"
  ],
  "enritable": [
    "A traditional table form",
    "An integral involving pi",
    "Larger exponents"
  ],
  "ellipse": [
    "Semiaxes 5 and 3",
    "A slender ellipse",
    "The circle case"
  ],
  "cylinders": [
    "Radii 2 and 1",
    "Nearly equal radii",
    "Equal radii"
  ],
  "replacement": [
    "Cubic and quadratic",
    "A vanishing leading coefficient",
    "A common factor"
  ],
  "inversion": [
    "Circle to circle",
    "Circle to line",
    "A circle enclosing the origin"
  ],
  "steiner": [
    "Six unequal circles",
    "Change the starting position",
    "Five circles that do not close",
    "A four-circle ring"
  ],
  "kakujutsu": [
    "Regular heptagon",
    "Regular 20-gon",
    "Regular hexagon"
  ],
  "linear": [
    "Three unknowns",
    "A free variable",
    "No solution"
  ],
  "polygcd": [
    "A common linear factor",
    "Higher-degree common factors",
    "No nonconstant common factor"
  ],
  "discriminant": [
    "A quartic discriminant",
    "A repeated root",
    "A cubic polynomial"
  ],
  "newtonsums": [
    "Sums for three roots",
    "Including complex roots",
    "Counting repeated roots"
  ],
  "nthroot": [
    "Seventh root of 2",
    "A negative fifth root",
    "Fourth root of a fraction"
  ],
  "translation": [
    "Shift by one half",
    "Shift toward a root",
    "Separate the leading digits"
  ],
  "series": [
    "Increasing coefficients",
    "A geometric series",
    "An alternating series"
  ],
  "segment": [
    "Radius 5, sagitta 1",
    "A very shallow segment",
    "More than a semicircle"
  ],
  "ellipticarc": [
    "Part of an ellipse",
    "A quarter of the perimeter",
    "The circle case"
  ],
  "revolution": [
    "Rotate a quadratic curve",
    "The cone case",
    "Crossing the axis"
  ],
  "pappus": [
    "Ten circles",
    "Equal inner semicircles",
    "The hundredth circle"
  ],
  "cyclic": [
    "Four different sides",
    "A rectangle",
    "A square"
  ],
  "tetrahedron": [
    "Three perpendicular edges",
    "A regular tetrahedron",
    "A flat configuration"
  ],
  "josephus": [
    "Keep 15 of 30 people",
    "Seven people, every third",
    "Change the starting person"
  ],
  "magic": [
    "6×6 square",
    "3×3 square",
    "16×16 square"
  ],
  "survey": [
    "Baseline 10, slopes 1 and 1/2",
    "Eye height zero",
    "Fractional measurements"
  ],
  "continued": [
    "Denominator at most 100",
    "Denominator at most 113",
    "A negative number"
  ],
  "pythagorean": [
    "8–15–17 triangle",
    "20–21–29 triangle",
    "A common scale factor"
  ],
  "polygonarea": [
    "An L-shaped plot",
    "A triangle",
    "A tilted quadrilateral"
  ],
  "spherezone": [
    "A central slice",
    "An upper hemisphere",
    "The whole sphere"
  ],
  "torus": [
    "Major radius 3, tube radius 1",
    "The central hole closes",
    "A thin ring"
  ],
  "malfatti": [
    "An example from the source study",
    "3–4–5 triangle",
    "Equilateral triangle"
  ],
  "apollonius": [
    "Three equal radii",
    "Different radii",
    "Three separated circles"
  ],
  "hermite": [
    "Recover a cubic",
    "Prescribed slopes",
    "Three unevenly spaced points"
  ],
  "squarefree": [
    "Double and triple factors",
    "Repeated complex roots",
    "Preserve the leading coefficient"
  ],
  "reversion": [
    "Invert x−x²",
    "Alternating signs",
    "Linear coefficient 2"
  ],
  "cyclotomic": [
    "Regular 17-gon",
    "Regular 15-gon",
    "Regular 59-gon"
  ],
  "boxmax": [
    "The Tetsujutsu Sankei example",
    "Equal length and width",
    "A long box"
  ],
  "ajima4": [
    "The recorded four-circle problem",
    "Equilateral triangle",
    "3–4–5 triangle"
  ],
  "ellipsetriangle": [
    "The minimum-height ratio",
    "A slender ellipse",
    "An almost circular ellipse"
  ],
  "diskcuts": [
    "Three equal areas",
    "Four equal areas",
    "Areas in the ratio 1:2:3"
  ],
  "heronpell": [
    "First 10 triangles",
    "First 50 triangles",
    "First 3 triangles"
  ],
  "conic": [
    "The unit circle",
    "A hyperbola",
    "A parabola"
  ],
  "curveintersect": [
    "Unit circle and y=x²",
    "A single point of tangency",
    "No intersections"
  ],
  "extrema": [
    "A cubic’s peak and trough",
    "A parabola",
    "A quartic with two minima"
  ],
  "bernstein": [
    "Bound a parabola",
    "No subdivision",
    "A quartic curve"
  ],
  "partialfractions": [
    "Including a double pole",
    "With a polynomial part",
    "A triple factor"
  ],
  "recurrence": [
    "The 50th Fibonacci number",
    "Last three digits at index 10¹²",
    "Sum of the previous three terms"
  ],
  "seriespower": [
    "Square root of 1+x",
    "A cube root",
    "Exponent −2"
  ],
  "implicitseries": [
    "y−x−y²=0",
    "The other branch",
    "A cubic relation"
  ],
  "pade": [
    "[2/2] approximation to exp(x)",
    "A geometric series",
    "[2/1] square-root approximation"
  ]
};
const exampleName=(entry,values,index)=>exampleNames[entry.id]?.[index]||`Example ${index+1}`;
const sourceName=(url,index)=>{const host=new URL(url).hostname.replace(/^www\./,'');const known={'ndl.go.jp':'National Diet Library, Japan','kurims.kyoto-u.ac.jp':'Kyoto University RIMS','oit.ac.jp':'Osaka Institute of Technology'};return `Reference ${index+1} — ${known[host]||host}`;};

// Preserve the quantity and computational qualification given in the source catalog.
// Missing translations must be detected rather than replaced by a generic result label.
const resultLabels = {
  "sangaku": "Radius r of the circle in the gap",
  "enri": "Approximate bounds for π",
  "shosa": "Interpolating polynomial value P(x)",
  "kaiho": "Square root √N",
  "tengen": "A real root x in the specified interval",
  "hyakugo": "Least non-negative integer satisfying the conditions",
  "tawara": "1ᵖ + 2ᵖ + … + nᵖ",
  "tsurukame": "Numbers of cranes and turtles",
  "kafusoku": "Number of people and total number of items",
  "nezumi": "Final value",
  "abura": "Minimum number of pours",
  "koko": "Hypotenuse c",
  "sansha": "Area of the triangle",
  "kairitsu": "Cube root ∛N",
  "elimination": "Resulting elimination equation",
  "roots": "Number and locations of real roots",
  "arc": "Length s of the minor circular arc",
  "pi": "Certified digits of π",
  "descartes": "Selected tangent circle or boundary",
  "gossett": "Selected tangent sphere or boundary",
  "hexlet": "Spatial closure of the six-sphere chain",
  "bernoulli": "1ᵖ + 2ᵖ + … + Nᵖ",
  "enritable": "Exact value of the specified definite integral",
  "ellipse": "Perimeter L of the ellipse",
  "cylinders": "Intersection volume V",
  "replacement": "Necessary condition after eliminating y",
  "inversion": "Image under inversion",
  "steiner": "Closure of the circle chain",
  "kakujutsu": "Side length of the regular polygon",
  "linear": "Solution of the system",
  "polygcd": "Monic greatest common divisor",
  "discriminant": "Discriminant D, using the modern sign convention",
  "newtonsums": "Power sums of all roots, counted with multiplicity",
  "nthroot": "Real kth root",
  "translation": "Polynomial f(u+h)",
  "series": "Quotient series through the specified degree",
  "segment": "Area between the chord and circular arc",
  "ellipticarc": "Length of the selected arc of the ellipse",
  "revolution": "Volume of the solid of revolution",
  "pappus": "Radius of the final circle",
  "cyclic": "Area of the cyclic quadrilateral",
  "tetrahedron": "Volume of the tetrahedron",
  "josephus": "Numbers of the remaining participants",
  "magic": "Common sum of rows, columns and main diagonals",
  "survey": "Height of the target",
  "continued": "Closest fraction within the denominator limit",
  "pythagorean": "Integer side lengths",
  "polygonarea": "Area of the polygon",
  "spherezone": "Volume between the two planes",
  "torus": "Volume of the torus",
  "malfatti": "Radii of the circles at vertices A, B and C",
  "apollonius": "Tangent circles satisfying the conditions",
  "hermite": "Value of the interpolating polynomial",
  "squarefree": "Product of factors grouped by multiplicity",
  "reversion": "Inverse series g(x)",
  "cyclotomic": "Minimal polynomial of t = 2cos(2π/n)",
  "boxmax": "Maximum volume",
  "ajima4": "Radii of the four circles",
  "ellipsetriangle": "Height of the triangle",
  "diskcuts": "Cut positions",
  "heronpell": "Integer side lengths of the final triangle",
  "conic": "Second intersection (x, y)",
  "curveintersect": "Real intersection points",
  "extrema": "Bounds for the minimum and maximum",
  "bernstein": "Certified lower and upper bounds for the function",
  "partialfractions": "Partial-fraction decomposition",
  "recurrence": "Value of the requested term",
  "seriespower": "Series raised to the specified power",
  "implicitseries": "Series for the specified initial value",
  "pade": "Value of the rational approximant"
};
const resultBadges = new Map(Object.entries({
  "小数の近似値": "Approximate decimal value",
  "分数まで厳密": "Exact rational arithmetic",
  "桁と区間を厳密計算": "Exact digits and bounds",
  "現代の求根補助": "Modern root-finding aid",
  "大きな整数も厳密": "Exact large-integer arithmetic",
  "整数を厳密計算": "Exact integer calculation",
  "整数で最短手順": "Shortest sequence, integer states",
  "平方根は近似値": "Approximate square root",
  "面積の平方は厳密": "Exact squared area",
  "文字係数を厳密計算": "Exact symbolic coefficients",
  "個数・重複度を厳密判定": "Exact root counts and multiplicities",
  "残差を含む厳密区間": "Certified interval with remainder",
  "切り捨ての桁を保証": "Certified truncated digits",
  "二つの配置を検算": "Both configurations checked",
  "中心座標と接触を検算": "Centers and tangencies checked",
  "中心・半径・非重複を検算": "Centers, radii and non-overlap checked",
  "多項式まで厳密": "Exact polynomial result",
  "分数・πを厳密表示": "Exact fractions and π",
  "剰余込みの厳密区間": "Certified interval with tail bound",
  "断面から保証区間へ": "Certified bounds from cross-sections",
  "二つの行列式を厳密照合": "Two determinants compared exactly",
  "ゼロの判定も厳密": "Exact arithmetic and zero tests",
  "接触・戻り位置・重なり": "Tangency, closure and overlap checks",
  "係数と図形をつなぐ": "Coefficients linked to geometry",
  "厳密区間": "Certified interval",
  "係数を厳密計算": "Exact coefficient arithmetic",
  "分割と上下の見積もり": "Subdivision with lower and upper estimates",
  "πの係数を厳密計算": "Exact coefficient of π",
  "平方量を厳密計算": "Exact squared quantities",
  "存在条件も厳密判定": "Exact existence test",
  "順番を整数で計算": "Exact integer elimination order",
  "全行・列・対角を検算": "Rows, columns and diagonals checked",
  "誤差を厳密比較": "Errors compared exactly",
  "平方の関係を厳密照合": "Squared identity checked exactly",
  "π²の係数を厳密計算": "Exact coefficient of π²",
  "内外の接触を検算": "Internal and external tangencies checked",
  "整数係数で恒等式を検算": "Identities checked with integer coefficients",
  "接触条件を近似検算": "Numerical tangency checks",
  "面積比を近似検算": "Numerical area-ratio checks",
  "辺と面積を整数で検算": "Integer sides and areas checked",
  "全交点を区間で認証": "All intersections certified by intervals",
  "閉区間全体を検査": "Entire closed interval checked",
  "整数の厳密計算": "Exact integer arithmetic",
  "係数を厳密照合": "Coefficients checked exactly",
  "元の方程式へ厳密代入": "Exact substitution into original equation",
  "係数の一致を厳密照合": "Exact coefficient matching"
}));

export const catalog=japaneseCatalog.map((entry,index)=>{
  const copy=C[entry.id];
  if(!copy||!F[entry.id])throw new Error(`Missing English editorial copy for ${entry.id}`);
  const resultLabel=resultLabels[entry.id],badge=resultBadges.get(entry.badge);
  if(!resultLabel||!badge)throw new Error(`Missing English result metadata for ${entry.id}`);
  return {
    ...entry,
    no:String(index+1).padStart(2,'0'),
    ...copy,
    badge,
    fields:entry.fields.map(field=>{
      const hint=field.hint?H[entry.id]?.[field.key]:undefined;
      if(field.hint&&!hint)throw new Error(`Missing English hint for ${entry.id}.${field.key}`);
      return {...field,label:fieldOverrides[entry.id]?.[field.key]||fieldNames[field.key]||field.key,hint};
    }),
    examples:entry.examples.map((example,i)=>[exampleName(entry,example[1],i),example[1]]),
    resultLabel,
    formula:F[entry.id],
    sources:entry.sources.map((source,i)=>[sourceName(source[1],i),source[1]]),
    related:entry.related?.map(link=>({id:link.id,name:link.id==='history-stories'?'Read the background to the six-sphere chain':`Open ${C[link.id]?.name||link.id}`}))
  };
});

export const validationLabels=new Map();
for(let entryIndex=0;entryIndex<japaneseCatalog.length;entryIndex+=1){
  const source=japaneseCatalog[entryIndex],target=catalog[entryIndex];
  for(let fieldIndex=0;fieldIndex<source.fields.length;fieldIndex+=1){
    validationLabels.set(source.fields[fieldIndex].label,target.fields[fieldIndex].label);
  }
}
