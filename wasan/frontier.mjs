/* AI NOBORu — https://www.aiofonesown.com/ | 出典を示す配布用表示。参照史料・第三者の権利表示は各記載を参照。 */
import {boxMax,ellipseTriangle,diskCuts,heronPell,ajimaFour} from './frontier-geometry.mjs';
import {conic,curveIntersect,extrema,bernstein,partialFractions} from './frontier-algebra.mjs';
import {seriesPower,implicitSeries,pade,recurrence} from './frontier-series.mjs';
export const frontierEngines={boxmax:boxMax,ajima4:ajimaFour,ellipsetriangle:ellipseTriangle,diskcuts:diskCuts,heronpell:heronPell,conic,curveintersect:curveIntersect,extrema,bernstein,partialfractions:partialFractions,recurrence,seriespower:seriesPower,implicitseries:implicitSeries,pade};
