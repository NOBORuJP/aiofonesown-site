import {chapterForIndex} from './chapters.mjs';
export function learningPathMeta(catalog,id,english=false){
  const index=catalog.findIndex(item=>item.id===id);
  if(index<0)return null;
  const chapter=chapterForIndex(index);
  return {
    index,
    chapter:english?chapter.en:chapter.ja,
    previous:index>0?catalog[index-1]:null,
    next:index<catalog.length-1?catalog[index+1]:null,
    previousLabel:english?'Previous tool':'前の術',
    nextLabel:english?'Next tool':'次の術',
    chapterLabel:english?'Learning path':'学び順'
  };
}
