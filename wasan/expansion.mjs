/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {linearSystem,commonFactor,discriminant,rootPowers,nthRoot,translatePolynomial,divideSeries,revolution} from './expansion-algebra.mjs';
import {regularPolygon,circularSegment,ellipticArc,pappusChain,cyclicQuadrilateral,tetrahedron} from './expansion-geometry.mjs';
export {linearSystem,commonFactor,discriminant,rootPowers,nthRoot,translatePolynomial,divideSeries,revolution,regularPolygon,circularSegment,ellipticArc,pappusChain,cyclicQuadrilateral,tetrahedron};
export const expansionEngines={
 kakujutsu:p=>regularPolygon(p.n,p.radius),linear:p=>linearSystem(p.matrix),polygcd:p=>commonFactor(p.f,p.g),discriminant:p=>discriminant(p.coefficients),newtonsums:p=>rootPowers(p.coefficients,p.order),nthroot:p=>nthRoot(p.value,p.degree,p.precision),translation:p=>translatePolynomial(p.coefficients,p.shift),series:p=>divideSeries(p.numerator,p.denominator,p.order),segment:p=>circularSegment(p.radius,p.height),ellipticarc:p=>ellipticArc(p.a,p.b,p.start,p.end,p.parts),revolution:p=>revolution(p.coefficients,p.lower,p.upper),pappus:p=>pappusChain(p.a,p.b,p.number),cyclic:p=>cyclicQuadrilateral(p.a,p.b,p.c,p.d),tetrahedron:p=>tetrahedron(p.ab,p.ac,p.ad,p.bc,p.bd,p.cd)
};
