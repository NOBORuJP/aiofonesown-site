/* AI NOBORu — https://www.aiofonesown.com/ | English entry point. */
import {installEnglishInterface,translateEnglishText,localizeWasanTool} from './locale.mjs';
window.__wasanLocalize=translateEnglishText;
// Localize only this site's optional AI tool while the shared app registers it.
// Restore the platform method immediately; unrelated registrations are untouched.
const context=document.modelContext;
let restoreRegistration=()=>{};
if(context&&typeof context.registerTool==='function'){
  const descriptor=Object.getOwnPropertyDescriptor(context,'registerTool');
  const register=context.registerTool;
  const localizedRegister=function(tool,...args){
    return register.call(this,localizeWasanTool(tool),...args);
  };
  try{
    Object.defineProperty(context,'registerTool',{configurable:true,writable:true,value:localizedRegister});
    restoreRegistration=()=>{
      if(context.registerTool!==localizedRegister)return;
      if(descriptor)Object.defineProperty(context,'registerTool',descriptor);
      else delete context.registerTool;
    };
  }catch{
    // A non-extensible optional API must not prevent the ordinary site from loading.
    console.warn('WASAN: the optional AI tool could not be localized. The calculator interface is unaffected.');
  }
}
try{await import('../app.mjs');}
finally{restoreRegistration();}
installEnglishInterface();
