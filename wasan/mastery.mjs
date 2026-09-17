/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {bernoulli,enriTable,ellipse,cylinders} from './mastery-analysis.mjs';
import {replacement} from './mastery-algebra.mjs';
import {inversion,steiner} from './mastery-geometry.mjs';
export const masteryEngines={bernoulli:p=>bernoulli(p.n,p.power),enritable:p=>enriTable(p.p,p.q,p.mode),ellipse:p=>ellipse(p.a,p.b,p.terms),cylinders:p=>cylinders(p.a,p.b,p.terms),replacement:p=>replacement(p.f,p.g),inversion:p=>inversion(p.x,p.y,p.r,p.k),steiner:p=>steiner(p.outer,p.inner,p.offset,p.number,p.phase)};
