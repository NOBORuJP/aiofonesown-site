/* AI NOBORU — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {eliminate,allRealRoots} from './advanced-algebra.mjs';
import {takebeArc,certifiedPi} from './advanced-analysis.mjs';
import {tangentCircles,tangentSpheres,hexlet} from './advanced-geometry.mjs';
export const advancedEngines={elimination:p=>eliminate(p.a,p.b,p.c,p.d),roots:p=>allRealRoots(p.coefficients,p.precision),arc:p=>takebeArc(p.diameter,p.sagitta,p.terms),pi:p=>certifiedPi(p.precision),descartes:p=>tangentCircles(p.a,p.b,p.c,p.branch),gossett:p=>tangentSpheres(p.a,p.b,p.c,p.d,p.branch,p.angle),hexlet:p=>hexlet(p.outer,p.sun,p.moon,p.phase,p.angle)};
