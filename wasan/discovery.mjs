/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {josephus,magicSquare,continuedFraction,pythagorean} from './discovery-discrete.mjs';
import {survey,polygonArea,sphericalZone,torus,malfatti} from './discovery-geometry.mjs';
import {apollonius} from './discovery-apollonius.mjs';
import {hermite,squareFreeFactors,revertSeries,cyclotomic} from './discovery-algebra.mjs';
export {josephus,magicSquare,continuedFraction,pythagorean,survey,polygonArea,sphericalZone,torus,malfatti,apollonius,hermite,squareFreeFactors,revertSeries,cyclotomic};
export const discoveryEngines={
 josephus:p=>josephus(p.number,p.step,p.start,p.remaining),magic:p=>magicSquare(p.order),survey:p=>survey(p.baseline,p.near,p.far,p.eye),continued:p=>continuedFraction(p.value,p.denominator),pythagorean:p=>pythagorean(p.m,p.n,p.scale),polygonarea:p=>polygonArea(p.points),spherezone:p=>sphericalZone(p.radius,p.lower,p.upper),torus:p=>torus(p.major,p.minor),malfatti:p=>malfatti(p.a,p.b,p.c),apollonius:p=>apollonius(p.circles),hermite:p=>hermite(p.data,p.target),squarefree:p=>squareFreeFactors(p.coefficients),reversion:p=>revertSeries(p.coefficients,p.order),cyclotomic:p=>cyclotomic(p.n)
};
