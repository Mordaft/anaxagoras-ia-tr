var so=Object.defineProperty;var lo=(c,a,r)=>a in c?so(c,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):c[a]=r;var $e=(c,a,r)=>lo(c,typeof a!="symbol"?a+"":a,r);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const p of u.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function r(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerPolicy&&(u.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?u.credentials="include":s.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function o(s){if(s.ep)return;s.ep=!0;const u=r(s);fetch(s.href,u)}})();const le=c=>typeof c=="string",Yt=()=>{let c,a;const r=new Promise((o,s)=>{c=o,a=s});return r.resolve=c,r.reject=a,r},_n=c=>c==null?"":String(c),co=(c,a,r)=>{c.forEach(o=>{a[o]&&(r[o]=a[o])})},uo=/###/g,ur=c=>c&&c.includes("###")?c.replace(uo,"."):c,pr=c=>!c||le(c),Xt=(c,a,r)=>{const o=le(a)?a.split("."):a;let s=0;for(;s<o.length-1;){if(pr(c))return{};const u=ur(o[s]);!c[u]&&r&&(c[u]=new r),Object.prototype.hasOwnProperty.call(c,u)?c=c[u]:c={},++s}return pr(c)?{}:{obj:c,k:ur(o[s])}},mr=(c,a,r)=>{const{obj:o,k:s}=Xt(c,a,Object);if(o!==void 0||a.length===1){o[s]=r;return}let u=a[a.length-1],p=a.slice(0,a.length-1),m=Xt(c,p,Object);for(;m.obj===void 0&&p.length;)u=`${p[p.length-1]}.${u}`,p=p.slice(0,p.length-1),m=Xt(c,p,Object),m!=null&&m.obj&&typeof m.obj[`${m.k}.${u}`]<"u"&&(m.obj=void 0);m.obj[`${m.k}.${u}`]=r},po=(c,a,r,o)=>{const{obj:s,k:u}=Xt(c,a,Object);s[u]=s[u]||[],s[u].push(r)},Ia=(c,a)=>{const{obj:r,k:o}=Xt(c,a);if(r&&Object.prototype.hasOwnProperty.call(r,o))return r[o]},mo=(c,a,r)=>{const o=Ia(c,r);return o!==void 0?o:Ia(a,r)},Ir=(c,a,r)=>{for(const o in a)o!=="__proto__"&&o!=="constructor"&&(Object.prototype.hasOwnProperty.call(c,o)?le(c[o])||c[o]instanceof String||le(a[o])||a[o]instanceof String?r&&(c[o]=a[o]):Ir(c[o],a[o],r):c[o]=a[o]);return c},at=c=>c.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),fo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},go=c=>le(c)?c.replace(/[&<>"'\/]/g,a=>fo[a]):c;class bo{constructor(a){this.capacity=a,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(a){const r=this.regExpMap.get(a);if(r!==void 0)return r;const o=new RegExp(a);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(a,o),this.regExpQueue.push(a),o}}const ho=[" ",",","?","!",";"],vo=new bo(20),yo=(c,a,r)=>{a=a||"",r=r||"";const o=ho.filter(p=>!a.includes(p)&&!r.includes(p));if(o.length===0)return!0;const s=vo.getRegExp(`(${o.map(p=>p==="?"?"\\?":p).join("|")})`);let u=!s.test(c);if(!u){const p=c.indexOf(r);p>0&&!s.test(c.substring(0,p))&&(u=!0)}return u},Pn=(c,a,r=".")=>{if(!c)return;if(c[a])return Object.prototype.hasOwnProperty.call(c,a)?c[a]:void 0;const o=a.split(r);let s=c;for(let u=0;u<o.length;){if(!s||typeof s!="object")return;let p,m="";for(let b=u;b<o.length;++b)if(b!==u&&(m+=r),m+=o[b],p=s[m],p!==void 0){if(["string","number","boolean"].includes(typeof p)&&b<o.length-1)continue;u+=b-u+1;break}s=p}return s},ta=c=>c==null?void 0:c.replace(/_/g,"-"),xo={type:"logger",log(c){this.output("log",c)},warn(c){this.output("warn",c)},error(c){this.output("error",c)},output(c,a){var r,o;(o=(r=console==null?void 0:console[c])==null?void 0:r.apply)==null||o.call(r,console,a)}};class Oa{constructor(a,r={}){this.init(a,r)}init(a,r={}){this.prefix=r.prefix||"i18next:",this.logger=a||xo,this.options=r,this.debug=r.debug}log(...a){return this.forward(a,"log","",!0)}warn(...a){return this.forward(a,"warn","",!0)}error(...a){return this.forward(a,"error","")}deprecate(...a){return this.forward(a,"warn","WARNING DEPRECATED: ",!0)}forward(a,r,o,s){return s&&!this.debug?null:(a=a.map(u=>le(u)?u.replace(/[\r\n\x00-\x1F\x7F]/g," "):u),le(a[0])&&(a[0]=`${o}${this.prefix} ${a[0]}`),this.logger[r](a))}create(a){return new Oa(this.logger,{prefix:`${this.prefix}:${a}:`,...this.options})}clone(a){return a=a||this.options,a.prefix=a.prefix||this.prefix,new Oa(this.logger,a)}}var Ze=new Oa;class Ra{constructor(){this.observers={}}on(a,r){return a.split(" ").forEach(o=>{this.observers[o]||(this.observers[o]=new Map);const s=this.observers[o].get(r)||0;this.observers[o].set(r,s+1)}),this}off(a,r){if(this.observers[a]){if(!r){delete this.observers[a];return}this.observers[a].delete(r)}}once(a,r){const o=(...s)=>{r(...s),this.off(a,o)};return this.on(a,o),this}emit(a,...r){this.observers[a]&&Array.from(this.observers[a].entries()).forEach(([s,u])=>{for(let p=0;p<u;p++)s(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,u])=>{for(let p=0;p<u;p++)s(a,...r)})}}const fr=new WeakSet;class gr extends Ra{constructor(a,r={ns:["translation"],defaultNS:"translation"}){super(),this.data=a||{},this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(a){this.options.ns.includes(a)||this.options.ns.push(a)}removeNamespaces(a){const r=this.options.ns.indexOf(a);r>-1&&this.options.ns.splice(r,1)}getResource(a,r,o,s={}){var h,w;const u=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,p=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let m;a.includes(".")?m=a.split("."):(m=[a,r],o&&(Array.isArray(o)?m.push(...o):le(o)&&u?m.push(...o.split(u)):m.push(o)));const b=Ia(this.data,m);return!b&&!r&&!o&&a.includes(".")&&(a=m[0],r=m[1],o=m.slice(2).join(".")),b||!p||!le(o)?b:Pn((w=(h=this.data)==null?void 0:h[a])==null?void 0:w[r],o,u)}addResource(a,r,o,s,u={silent:!1}){const p=u.keySeparator!==void 0?u.keySeparator:this.options.keySeparator;let m=[a,r];o&&(m=m.concat(p?o.split(p):o)),a.includes(".")&&(m=a.split("."),s=r,r=m[1]),this.addNamespaces(r),mr(this.data,m,s),u.silent||this.emit("added",a,r,o,s)}addResources(a,r,o,s={silent:!1}){for(const u in o)(le(o[u])||Array.isArray(o[u]))&&this.addResource(a,r,u,o[u],{silent:!0});s.silent||this.emit("added",a,r,o)}addResourceBundle(a,r,o,s,u,p={silent:!1,skipCopy:!1}){let m=[a,r];a.includes(".")&&(m=a.split("."),s=o,o=r,r=m[1]),this.addNamespaces(r);let b=Ia(this.data,m)||{};p.skipCopy||(o=JSON.parse(JSON.stringify(o))),s?Ir(b,o,u):b={...b,...o},mr(this.data,m,b),p.silent||this.emit("added",a,r,o)}removeResourceBundle(a,r){this.hasResourceBundle(a,r)&&delete this.data[a][r],this.removeNamespaces(r),this.emit("removed",a,r)}hasResourceBundle(a,r){return this.getResource(a,r)!==void 0}getResourceBundle(a,r){return r||(r=this.options.defaultNS),this.getResource(a,r)}getDataByLanguage(a){return this.data[a]}hasLanguageSomeTranslations(a){const r=this.getDataByLanguage(a);return!!(r&&Object.keys(r)||[]).find(s=>{const u=r[s];return fr.has(u)?!0:!u||Object.keys(u).length===0?!1:(typeof u=="object"&&fr.add(u),!0)})}toJSON(){return this.data}}var Or={processors:{},addPostProcessor(c){this.processors[c.name]=c},handle(c,a,r,o,s){return c.forEach(u=>{var p;a=((p=this.processors[u])==null?void 0:p.process(a,r,o,s))??a}),a}};const jr=Symbol("i18next/PATH_KEY");function _o(){const c=[],a=Object.create(null);let r;return a.get=(o,s)=>{var u;return(u=r==null?void 0:r.revoke)==null||u.call(r),s===jr?c:(c.push(s),r=Proxy.revocable(o,a),r.proxy)},Proxy.revocable(Object.create(null),a).proxy}function It(c,a){const{[jr]:r}=c(_o()),o=(a==null?void 0:a.keySeparator)??".",s=(a==null?void 0:a.nsSeparator)??":",u=(a==null?void 0:a.enableSelector)==="strict";if(r.length>1&&s){const p=a==null?void 0:a.ns,m=u?Array.isArray(p)?p:p?[p]:null:Array.isArray(p)?p:null;if(m&&(u?m:m.length>1?m.slice(1):[]).includes(r[0]))return`${r[0]}${s}${r.slice(1).join(o)}`}return r.join(o)}const Cn=c=>!le(c)&&typeof c!="boolean"&&typeof c!="number";class ja extends Ra{constructor(a,r={}){super(),co(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],a,this),this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Ze.create("translator"),this.checkedLoadedFor={}}changeLanguage(a){a&&(this.language=a)}exists(a,r={interpolation:{}}){const o={...r};if(a==null)return!1;const s=this.resolve(a,o);if((s==null?void 0:s.res)===void 0)return!1;const u=Cn(s.res);return!(o.returnObjects===!1&&u)}extractFromKey(a,r){let o=r.nsSeparator!==void 0?r.nsSeparator:this.options.nsSeparator;o===void 0&&(o=":");const s=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator;let u=r.ns||this.options.defaultNS||[];const p=o&&a.includes(o),m=!this.options.userDefinedKeySeparator&&!r.keySeparator&&!this.options.userDefinedNsSeparator&&!r.nsSeparator&&!yo(a,o,s);if(p&&!m){const b=a.match(this.interpolator.nestingRegexp);if(b&&b.length>0)return{key:a,namespaces:le(u)?[u]:u};const h=a.split(o);(o!==s||o===s&&this.options.ns.includes(h[0]))&&(u=h.shift()),a=h.join(s)}return{key:a,namespaces:le(u)?[u]:u}}translate(a,r,o){let s=typeof r=="object"?{...r}:r;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),a==null)return"";typeof a=="function"&&(a=It(a,{...this.options,...s})),Array.isArray(a)||(a=[String(a)]),a=a.map(ce=>typeof ce=="function"?It(ce,{...this.options,...s}):String(ce));const u=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,p=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:m,namespaces:b}=this.extractFromKey(a[a.length-1],s),h=b[b.length-1];let w=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;w===void 0&&(w=":");const T=s.lng||this.language,O=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((T==null?void 0:T.toLowerCase())==="cimode")return O?u?{res:`${h}${w}${m}`,usedKey:m,exactUsedKey:m,usedLng:T,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:`${h}${w}${m}`:u?{res:m,usedKey:m,exactUsedKey:m,usedLng:T,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:m;const F=this.resolve(a,s);let v=F==null?void 0:F.res;const H=(F==null?void 0:F.usedKey)||m,z=(F==null?void 0:F.exactUsedKey)||m,Y=["[object Number]","[object Function]","[object RegExp]"],J=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,fe=!this.i18nFormat||this.i18nFormat.handleAsObject,L=s.count!==void 0&&!le(s.count),M=ja.hasDefaultValue(s),q=L?this.pluralResolver.getSuffix(T,s.count,s):"",j=s.ordinal&&L?this.pluralResolver.getSuffix(T,s.count,{ordinal:!1}):"",N=L&&!s.ordinal&&s.count===0,B=N&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${q}`]||s[`defaultValue${j}`]||s.defaultValue;let te=v;fe&&!v&&M&&(te=B);const Ee=Cn(te),Ce=Object.prototype.toString.apply(te);if(fe&&te&&Ee&&!Y.includes(Ce)&&!(le(J)&&Array.isArray(te))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const ce=this.options.returnedObjectHandler?this.options.returnedObjectHandler(H,te,{...s,ns:b}):`key '${m} (${this.language})' returned an object instead of string.`;return u?(F.res=ce,F.usedParams=this.getUsedParamsDetails(s),F):ce}if(p){const ce=Array.isArray(te),be=ce?[]:{},ne=ce?z:H;for(const ve in te)if(Object.prototype.hasOwnProperty.call(te,ve)){const pe=`${ne}${p}${ve}`;M&&!v?be[ve]=this.translate(pe,{...s,defaultValue:Cn(B)?B[ve]:void 0,joinArrays:!1,ns:b}):be[ve]=this.translate(pe,{...s,joinArrays:!1,ns:b}),be[ve]===pe&&(be[ve]=te[ve])}v=be}}else if(fe&&le(J)&&Array.isArray(v))v=v.join(J),v&&(v=this.extendTranslation(v,a,s,o));else{let ce=!1,be=!1;!this.isValidLookup(v)&&M&&(ce=!0,v=B),this.isValidLookup(v)||(be=!0,v=m);const ve=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&be?void 0:v,pe=M&&B!==v&&this.options.updateMissing;if(be||ce||pe){if(this.logger.log(pe?"updateKey":"missingKey",T,h,L&&!pe?`${m}${this.pluralResolver.getSuffix(T,s.count,s)}`:m,pe?B:v),p){const ie=this.resolve(m,{...s,keySeparator:!1});ie&&ie.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let Pe=[];const ae=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&ae&&ae[0])for(let ie=0;ie<ae.length;ie++)Pe.push(ae[ie]);else this.options.saveMissingTo==="all"?Pe=this.languageUtils.toResolveHierarchy(s.lng||this.language):Pe.push(s.lng||this.language);const re=(ie,he,Re)=>{var Ue;const Be=M&&Re!==v?Re:ve;this.options.missingKeyHandler?this.options.missingKeyHandler(ie,h,he,Be,pe,s):(Ue=this.backendConnector)!=null&&Ue.saveMissing&&this.backendConnector.saveMissing(ie,h,he,Be,pe,s),this.emit("missingKey",ie,h,he,v)};this.options.saveMissing&&(this.options.saveMissingPlurals&&L?Pe.forEach(ie=>{const he=this.pluralResolver.getSuffixes(ie,s);N&&s[`defaultValue${this.options.pluralSeparator}zero`]&&!he.includes(`${this.options.pluralSeparator}zero`)&&he.push(`${this.options.pluralSeparator}zero`),he.forEach(Re=>{re([ie],m+Re,s[`defaultValue${Re}`]||B)})}):re(Pe,m,B))}v=this.extendTranslation(v,a,s,F,o),be&&v===m&&this.options.appendNamespaceToMissingKey&&(v=`${h}${w}${m}`),(be||ce)&&this.options.parseMissingKeyHandler&&(v=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${h}${w}${m}`:m,ce?v:void 0,s))}return u?(F.res=v,F.usedParams=this.getUsedParamsDetails(s),F):v}extendTranslation(a,r,o,s,u){var b,h;if((b=this.i18nFormat)!=null&&b.parse)a=this.i18nFormat.parse(a,{...this.options.interpolation.defaultVariables,...o},o.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!o.skipInterpolation){o.interpolation&&this.interpolator.init({...o,interpolation:{...this.options.interpolation,...o.interpolation}});const w=le(a)&&(((h=o==null?void 0:o.interpolation)==null?void 0:h.skipOnVariables)!==void 0?o.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let T;if(w){const F=a.match(this.interpolator.nestingRegexp);T=F&&F.length}let O=o.replace&&!le(o.replace)?o.replace:o;if(this.options.interpolation.defaultVariables&&(O={...this.options.interpolation.defaultVariables,...O}),a=this.interpolator.interpolate(a,O,o.lng||this.language||s.usedLng,o),w){const F=a.match(this.interpolator.nestingRegexp),v=F&&F.length;T<v&&(o.nest=!1)}!o.lng&&s&&s.res&&(o.lng=this.language||s.usedLng),o.nest!==!1&&(a=this.interpolator.nest(a,(...F)=>(u==null?void 0:u[0])===F[0]&&!o.context?(this.logger.warn(`It seems you are nesting recursively key: ${F[0]} in key: ${r[0]}`),null):this.translate(...F,r),o)),o.interpolation&&this.interpolator.reset()}const p=o.postProcess||this.options.postProcess,m=le(p)?[p]:p;return a!=null&&(m!=null&&m.length)&&o.applyPostProcessor!==!1&&(a=Or.handle(m,a,r,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(o)},...o}:o,this)),a}resolve(a,r={}){let o,s,u,p,m;return le(a)&&(a=[a]),Array.isArray(a)&&(a=a.map(b=>typeof b=="function"?It(b,{...this.options,...r}):b)),a.forEach(b=>{if(this.isValidLookup(o))return;const h=this.extractFromKey(b,r),w=h.key;s=w;let T=h.namespaces;this.options.fallbackNS&&(T=T.concat(this.options.fallbackNS));const O=r.count!==void 0&&!le(r.count),F=O&&!r.ordinal&&r.count===0,v=r.context!==void 0&&(le(r.context)||typeof r.context=="number")&&r.context!=="",H=r.lngs?r.lngs:this.languageUtils.toResolveHierarchy(r.lng||this.language,r.fallbackLng);T.forEach(z=>{var Y,J;this.isValidLookup(o)||(m=z,!this.checkedLoadedFor[`${H[0]}-${z}`]&&((Y=this.utils)!=null&&Y.hasLoadedNamespace)&&!((J=this.utils)!=null&&J.hasLoadedNamespace(m))&&(this.checkedLoadedFor[`${H[0]}-${z}`]=!0,this.logger.warn(`key "${s}" for languages "${H.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),H.forEach(fe=>{var q;if(this.isValidLookup(o))return;p=fe;const L=[w];if((q=this.i18nFormat)!=null&&q.addLookupKeys)this.i18nFormat.addLookupKeys(L,w,fe,z,r);else{let j;O&&(j=this.pluralResolver.getSuffix(fe,r.count,r));const N=`${this.options.pluralSeparator}zero`,B=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(O&&(r.ordinal&&j.startsWith(B)&&L.push(w+j.replace(B,this.options.pluralSeparator)),L.push(w+j),F&&L.push(w+N)),v){const te=`${w}${this.options.contextSeparator||"_"}${r.context}`;L.push(te),O&&(r.ordinal&&j.startsWith(B)&&L.push(te+j.replace(B,this.options.pluralSeparator)),L.push(te+j),F&&L.push(te+N))}}let M;for(;M=L.pop();)this.isValidLookup(o)||(u=M,o=this.getResource(fe,z,M,r))}))})}),{res:o,usedKey:s,exactUsedKey:u,usedLng:p,usedNS:m}}isValidLookup(a){return a!==void 0&&!(!this.options.returnNull&&a===null)&&!(!this.options.returnEmptyString&&a==="")}getResource(a,r,o,s={}){var u;return(u=this.i18nFormat)!=null&&u.getResource?this.i18nFormat.getResource(a,r,o,s):this.resourceStore.getResource(a,r,o,s)}getUsedParamsDetails(a={}){const r=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],o=a.replace&&!le(a.replace);let s=o?a.replace:a;if(o&&typeof a.count<"u"&&(s={...s,count:a.count}),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!o){s={...s};for(const u of r)delete s[u]}return s}static hasDefaultValue(a){const r="defaultValue";for(const o in a)if(Object.prototype.hasOwnProperty.call(a,o)&&o.startsWith(r)&&a[o]!==void 0)return!0;return!1}}class br{constructor(a){this.options=a,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Ze.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(a){if(a=ta(a),!a||!a.includes("-"))return null;const r=a.split("-");return r.length===2||(r.pop(),r[r.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(r.join("-"))}getLanguagePartFromCode(a){if(a=ta(a),!a||!a.includes("-"))return a;const r=a.split("-");return this.formatLanguageCode(r[0])}formatLanguageCode(a){if(le(a)&&a.includes("-")){let r;try{r=Intl.getCanonicalLocales(a)[0]}catch{}return r&&this.options.lowerCaseLng&&(r=r.toLowerCase()),r||(this.options.lowerCaseLng?a.toLowerCase():a)}return this.options.cleanCode||this.options.lowerCaseLng?a.toLowerCase():a}isSupportedCode(a){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(a=this.getLanguagePartFromCode(a)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(a)}getBestMatchFromCodes(a){if(!a)return null;let r;return a.forEach(o=>{if(r)return;const s=this.formatLanguageCode(o);(!this.options.supportedLngs||this.isSupportedCode(s))&&(r=s)}),!r&&this.options.supportedLngs&&a.forEach(o=>{if(r)return;const s=this.getScriptPartFromCode(o);if(this.isSupportedCode(s))return r=s;const u=this.getLanguagePartFromCode(o);if(this.isSupportedCode(u))return r=u;r=this.options.supportedLngs.find(p=>p===u?!0:!p.includes("-")&&!u.includes("-")?!1:!!(p.includes("-")&&!u.includes("-")&&p.slice(0,p.indexOf("-"))===u||p.startsWith(u)&&u.length>1))}),r||(r=this.getFallbackCodes(this.options.fallbackLng)[0]),r}getFallbackCodes(a,r){if(!a)return[];if(typeof a=="function"&&(a=a(r)),le(a)&&(a=[a]),Array.isArray(a))return a;if(!r)return a.default||[];let o=a[r];return o||(o=a[this.getScriptPartFromCode(r)]),o||(o=a[this.formatLanguageCode(r)]),o||(o=a[this.getLanguagePartFromCode(r)]),o||(o=a.default),o||[]}toResolveHierarchy(a,r){const o=this.options.fallbackLng,s=Array.isArray(o)?o.join("|"):o;s!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=s);const u=r===void 0||r===!1||le(r),p=r===void 0&&typeof this.options.fallbackLng=="function",m=le(a)&&u&&!p;let b=null;if(m){let O;r===void 0?O="undefined":r===!1?O="boolean:false":O=`string:${r}`,b=`${a.length}:${a}|${O}`}if(b!==null){const O=this.resolveHierarchyCache[b];if(O!==void 0)return O.slice()}const h=this.getFallbackCodes((r===!1?[]:r)||this.options.fallbackLng||[],a),w=[],T=O=>{O&&(this.isSupportedCode(O)?w.push(O):this.logger.warn(`rejecting language code not found in supportedLngs: ${O}`))};return le(a)&&(a.includes("-")||a.includes("_"))?(this.options.load!=="languageOnly"&&T(this.formatLanguageCode(a)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&T(this.getScriptPartFromCode(a)),this.options.load!=="currentOnly"&&T(this.getLanguagePartFromCode(a))):le(a)&&T(this.formatLanguageCode(a)),h.forEach(O=>{w.includes(O)||T(this.formatLanguageCode(O))}),b!==null?(this.resolveHierarchyCache[b]=w,w.slice()):w}}const hr={zero:0,one:1,two:2,few:3,many:4,other:5},vr={select:c=>c===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class Co{constructor(a,r={}){this.languageUtils=a,this.options=r,this.logger=Ze.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(a,r={}){const o=ta(a==="dev"?"en":a),s=r.ordinal?"ordinal":"cardinal",u=JSON.stringify({cleanedCode:o,type:s});if(u in this.pluralRulesCache)return this.pluralRulesCache[u];let p;try{p=new Intl.PluralRules(o,{type:s})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),vr;if(!a.match(/-|_/))return vr;const b=this.languageUtils.getLanguagePartFromCode(a);p=this.getRule(b,r)}return this.pluralRulesCache[u]=p,p}needsPlural(a,r={}){let o=this.getRule(a,r);return o||(o=this.getRule("dev",r)),(o==null?void 0:o.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(a,r,o={}){return this.getSuffixes(a,o).map(s=>`${r}${s}`)}getSuffixes(a,r={}){let o=this.getRule(a,r);return o||(o=this.getRule("dev",r)),o?o.resolvedOptions().pluralCategories.sort((s,u)=>hr[s]-hr[u]).map(s=>`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(a,r,o={}){const s=this.getRule(a,o);return s?`${this.options.prepend}${o.ordinal?`ordinal${this.options.prepend}`:""}${s.select(r)}`:(this.logger.warn(`no plural rule found for: ${a}`),this.getSuffix("dev",r,o))}}const yr=(c,a,r,o=".",s=!0)=>{let u=mo(c,a,r);return!u&&s&&le(r)&&(u=Pn(c,r,o),u===void 0&&(u=Pn(a,r,o))),u},xr=c=>c.replace(/\$/g,"$$$$");class _r{constructor(a={}){var r;this.logger=Ze.create("interpolator"),this.options=a,this.format=((r=a==null?void 0:a.interpolation)==null?void 0:r.format)||(o=>o),this.init(a)}init(a={}){a.interpolation||(a.interpolation={escapeValue:!0});const{escape:r,escapeValue:o,useRawValueToEscape:s,prefix:u,prefixEscaped:p,suffix:m,suffixEscaped:b,formatSeparator:h,unescapeSuffix:w,unescapePrefix:T,nestingPrefix:O,nestingPrefixEscaped:F,nestingSuffix:v,nestingSuffixEscaped:H,nestingOptionsSeparator:z,maxReplaces:Y,alwaysFormat:J}=a.interpolation;this.escape=r!==void 0?r:go,this.escapeValue=o!==void 0?o:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=u?at(u):p||"{{",this.suffix=m?at(m):b||"}}",this.formatSeparator=h||",",this.unescapePrefix=w?"":T?at(T):"-",this.unescapeSuffix=this.unescapePrefix?"":w?at(w):"",this.nestingPrefix=O?at(O):F||at("$t("),this.nestingSuffix=v?at(v):H||at(")"),this.nestingOptionsSeparator=z||",",this.maxReplaces=Y||1e3,this.alwaysFormat=J!==void 0?J:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const a=(r,o)=>(r==null?void 0:r.source)===o?(r.lastIndex=0,r):new RegExp(o,"g");this.regexp=a(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=a(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=a(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(a,r,o,s){var F;let u,p,m;const b=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},h=v=>{if(!v.includes(this.formatSeparator)){const J=yr(r,b,v,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(J,void 0,o,{...s,...r,interpolationkey:v}):J}const H=v.split(this.formatSeparator),z=H.shift().trim(),Y=H.join(this.formatSeparator).trim();return this.format(yr(r,b,z,this.options.keySeparator,this.options.ignoreJSONStructure),Y,o,{...s,...r,interpolationkey:z})};this.resetRegExp(),!this.escapeValue&&typeof a=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(a)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const w=(s==null?void 0:s.missingInterpolationHandler)||this.options.missingInterpolationHandler,T=((F=s==null?void 0:s.interpolation)==null?void 0:F.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:v=>v},{regex:this.regexp,safeValue:v=>this.escapeValue?this.escape(v):v}].forEach(v=>{for(m=0;u=v.regex.exec(a);){const H=u[1].trim();if(p=h(H),p===void 0)if(typeof w=="function"){const Y=w(a,u,s);p=le(Y)?Y:""}else if(s&&Object.prototype.hasOwnProperty.call(s,H))p="";else if(T){p=u[0];continue}else this.logger.warn(`missed to pass in variable ${H} for interpolating ${a}`),p="";else!le(p)&&!this.useRawValueToEscape&&(p=_n(p));const z=v.safeValue(p);if(a=a.replace(u[0],xr(z)),T?(v.regex.lastIndex+=z.length,v.regex.lastIndex-=u[0].length):v.regex.lastIndex=0,m++,m>=this.maxReplaces)break}}),a}nest(a,r,o={}){let s,u,p;const m=(b,h)=>{const w=this.nestingOptionsSeparator;if(!b.includes(w))return b;const T=b.split(new RegExp(`${at(w)}[ ]*{`));let O=`{${T[1]}`;b=T[0],O=this.interpolate(O,p);const F=O.match(/'/g),v=O.match(/"/g);(((F==null?void 0:F.length)??0)%2===0&&!v||((v==null?void 0:v.length)??0)%2!==0)&&(O=O.replace(/'/g,'"'));try{p=JSON.parse(O),h&&(p={...h,...p})}catch(H){return this.logger.warn(`failed parsing options string in nesting for key ${b}`,H),`${b}${w}${O}`}return p.defaultValue&&p.defaultValue.includes(this.prefix)&&delete p.defaultValue,b};for(;s=this.nestingRegexp.exec(a);){let b=[];p={...o},p=p.replace&&!le(p.replace)?p.replace:p,p.applyPostProcessor=!1,delete p.defaultValue;const h=/{.*}/s.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(h!==-1&&(b=s[1].slice(h).split(this.formatSeparator).map(w=>w.trim()).filter(Boolean),s[1]=s[1].slice(0,h)),u=r(m.call(this,s[1].trim(),p),p),u&&s[0]===a&&!le(u))return u;le(u)||(u=_n(u)),u||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${a}`),u=""),b.length&&(u=b.reduce((w,T)=>this.format(w,T,o.lng,{...o,interpolationkey:s[1].trim()}),u.trim())),a=a.replace(s[0],xr(_n(u))),this.regexp.lastIndex=0}return a}}const wo=c=>{let a=c.toLowerCase().trim();const r={};if(c.includes("(")){const o=c.split("(");a=o[0].toLowerCase().trim();const s=o[1].slice(0,-1);a==="currency"&&!s.includes(":")?r.currency||(r.currency=s.trim()):a==="relativetime"&&!s.includes(":")?r.range||(r.range=s.trim()):s.split(";").forEach(p=>{if(p){const[m,...b]=p.split(":"),h=b.join(":").trim().replace(/^'+|'+$/g,""),w=m.trim();r[w]||(r[w]=h),h==="false"&&(r[w]=!1),h==="true"&&(r[w]=!0),isNaN(h)||(r[w]=parseInt(h,10))}})}return{formatName:a,formatOptions:r}},Cr=c=>{const a={};return(r,o,s)=>{let u=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(u={...u,[s.interpolationkey]:void 0});const p=o+JSON.stringify(u);let m=a[p];return m||(m=c(ta(o),s),a[p]=m),m(r)}},Po=c=>(a,r,o)=>c(ta(r),o)(a);class Ao{constructor(a={}){this.logger=Ze.create("formatter"),this.options=a,this.init(a)}init(a,r={interpolation:{}}){this.formatSeparator=r.interpolation.formatSeparator||",";const o=r.cacheInBuiltFormats?Cr:Po;this.formats={number:o((s,u)=>{const p=new Intl.NumberFormat(s,{...u});return m=>p.format(m)}),currency:o((s,u)=>{const p=new Intl.NumberFormat(s,{...u,style:"currency"});return m=>p.format(m)}),datetime:o((s,u)=>{const p=new Intl.DateTimeFormat(s,{...u});return m=>p.format(m)}),relativetime:o((s,u)=>{const p=new Intl.RelativeTimeFormat(s,{...u});return m=>p.format(m,u.range||"day")}),list:o((s,u)=>{const p=new Intl.ListFormat(s,{...u});return m=>p.format(m)})}}add(a,r){this.formats[a.toLowerCase().trim()]=r}addCached(a,r){this.formats[a.toLowerCase().trim()]=Cr(r)}format(a,r,o,s={}){if(!r||a==null)return a;const u=r.split(this.formatSeparator),p=[];for(let b=0;b<u.length;b++){let h=u[b];for(;h.indexOf("(")>-1&&!h.includes(")")&&b+1<u.length;)h=`${h}${this.formatSeparator}${u[++b]}`;p.push(h)}return p.reduce((b,h)=>{var O;const{formatName:w,formatOptions:T}=wo(h);if(this.formats[w]){let F=b;try{const v=((O=s==null?void 0:s.formatParams)==null?void 0:O[s.interpolationkey])||{},H=v.locale||v.lng||s.locale||s.lng||o;F=this.formats[w](b,H,{...T,...s,...v})}catch(v){this.logger.warn(v)}return F}else this.logger.warn(`there was no format function for ${w}`);return b},a)}}const Eo=(c,a)=>{c.pending[a]!==void 0&&(delete c.pending[a],c.pendingCount--)};class So extends Ra{constructor(a,r,o,s={}){var u,p;super(),this.backend=a,this.store=r,this.services=o,this.languageUtils=o.languageUtils,this.options=s,this.logger=Ze.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],(p=(u=this.backend)==null?void 0:u.init)==null||p.call(u,o,s.backend,s)}queueLoad(a,r,o,s){const u={},p={},m={},b={};return a.forEach(h=>{let w=!0;r.forEach(T=>{const O=`${h}|${T}`;!o.reload&&this.store.hasResourceBundle(h,T)?this.state[O]=2:this.state[O]<0||(this.state[O]===1?p[O]===void 0&&(p[O]=!0):(this.state[O]=1,w=!1,p[O]===void 0&&(p[O]=!0),u[O]===void 0&&(u[O]=!0),b[T]===void 0&&(b[T]=!0)))}),w||(m[h]=!0)}),(Object.keys(u).length||Object.keys(p).length)&&this.queue.push({pending:p,pendingCount:Object.keys(p).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(u),pending:Object.keys(p),toLoadLanguages:Object.keys(m),toLoadNamespaces:Object.keys(b)}}loaded(a,r,o){const s=a.split("|"),u=s[0],p=s[1];r&&this.emit("failedLoading",u,p,r),!r&&o&&this.store.addResourceBundle(u,p,o,void 0,void 0,{skipCopy:!0}),this.state[a]=r?-1:2,r&&o&&(this.state[a]=0);const m={};this.queue.forEach(b=>{po(b.loaded,[u],p),Eo(b,a),r&&b.errors.push(r),b.pendingCount===0&&!b.done&&(Object.keys(b.loaded).forEach(h=>{m[h]||(m[h]={});const w=b.loaded[h];w.length&&w.forEach(T=>{m[h][T]===void 0&&(m[h][T]=!0)})}),b.done=!0,b.errors.length?b.callback(b.errors):b.callback())}),this.emit("loaded",m),this.queue=this.queue.filter(b=>!b.done)}read(a,r,o,s=0,u=this.retryTimeout,p){if(!a.length)return p(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:a,ns:r,fcName:o,tried:s,wait:u,callback:p});return}this.readingCalls++;const m=(h,w)=>{if(this.readingCalls--,this.waitingReads.length>0){const T=this.waitingReads.shift();this.read(T.lng,T.ns,T.fcName,T.tried,T.wait,T.callback)}if(h&&w&&s<this.maxRetries){setTimeout(()=>{this.read(a,r,o,s+1,u*2,p)},u);return}p(h,w)},b=this.backend[o].bind(this.backend);if(b.length===2){try{const h=b(a,r);h&&typeof h.then=="function"?h.then(w=>m(null,w)).catch(m):m(null,h)}catch(h){m(h)}return}return b(a,r,m)}prepareLoading(a,r,o={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();le(a)&&(a=this.languageUtils.toResolveHierarchy(a)),le(r)&&(r=[r]);const u=this.queueLoad(a,r,o,s);if(!u.toLoad.length)return u.pending.length||s(),null;u.toLoad.forEach(p=>{this.loadOne(p)})}load(a,r,o){this.prepareLoading(a,r,{},o)}reload(a,r,o){this.prepareLoading(a,r,{reload:!0},o)}loadOne(a,r=""){const o=a.split("|"),s=o[0],u=o[1];this.read(s,u,"read",void 0,void 0,(p,m)=>{p&&this.logger.warn(`${r}loading namespace ${u} for language ${s} failed`,p),!p&&m&&this.logger.log(`${r}loaded namespace ${u} for language ${s}`,m),this.loaded(a,p,m)})}saveMissing(a,r,o,s,u,p={},m=()=>{}){var b,h,w,T,O;if((h=(b=this.services)==null?void 0:b.utils)!=null&&h.hasLoadedNamespace&&!((T=(w=this.services)==null?void 0:w.utils)!=null&&T.hasLoadedNamespace(r))){this.logger.warn(`did not save key "${o}" as the namespace "${r}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(o==null||o==="")){if((O=this.backend)!=null&&O.create){const F={...p,isUpdate:u},v=this.backend.create.bind(this.backend);if(v.length<6)try{let H;v.length===5?H=v(a,r,o,s,F):H=v(a,r,o,s),H&&typeof H.then=="function"?H.then(z=>m(null,z)).catch(m):m(null,H)}catch(H){m(H)}else v(a,r,o,s,m,F)}!a||!a[0]||this.store.addResource(a[0],r,o,s)}}}const wn=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:c=>{let a={};if(typeof c[1]=="object"&&(a=c[1]),le(c[1])&&(a.defaultValue=c[1]),le(c[2])&&(a.tDescription=c[2]),typeof c[2]=="object"||typeof c[3]=="object"){const r=c[3]||c[2];Object.keys(r).forEach(o=>{a[o]=r[o]})}return a},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),wr=c=>(le(c.ns)&&(c.ns=[c.ns]),le(c.fallbackLng)&&(c.fallbackLng=[c.fallbackLng]),le(c.fallbackNS)&&(c.fallbackNS=[c.fallbackNS]),c.supportedLngs&&!c.supportedLngs.includes("cimode")&&(c.supportedLngs=c.supportedLngs.concat(["cimode"])),c),$a=()=>{},ko=c=>{Object.getOwnPropertyNames(Object.getPrototypeOf(c)).forEach(r=>{typeof c[r]=="function"&&(c[r]=c[r].bind(c))})};class ea extends Ra{constructor(a={},r){if(super(),this.options=wr(a),this.services={},this.logger=Ze,this.modules={external:[]},ko(this),r&&!this.isInitialized&&!a.isClone){if(!this.options.initAsync)return this.init(a,r),this;setTimeout(()=>{this.init(a,r)},0)}}init(a={},r){this.isInitializing=!0,typeof a=="function"&&(r=a,a={}),a.defaultNS==null&&a.ns&&(le(a.ns)?a.defaultNS=a.ns:a.ns.includes("translation")||(a.defaultNS=a.ns[0]));const o=wn();this.options={...o,...this.options,...wr(a)},this.options.interpolation={...o.interpolation,...this.options.interpolation},a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=o.overloadTranslationOptionHandler);const s=h=>h?typeof h=="function"?new h:h:null;if(!this.options.isClone){this.modules.logger?Ze.init(s(this.modules.logger),this.options):Ze.init(null,this.options);let h;this.modules.formatter?h=this.modules.formatter:h=Ao;const w=new br(this.options);this.store=new gr(this.options.resources,this.options);const T=this.services;T.logger=Ze,T.resourceStore=this.store,T.languageUtils=w,T.pluralResolver=new Co(w,{prepend:this.options.pluralSeparator}),h&&(T.formatter=s(h),T.formatter.init&&T.formatter.init(T,this.options),this.options.interpolation.format=T.formatter.format.bind(T.formatter)),T.interpolator=new _r(this.options),T.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},T.backendConnector=new So(s(this.modules.backend),T.resourceStore,T,this.options),T.backendConnector.on("*",(O,...F)=>{this.emit(O,...F)}),this.modules.languageDetector&&(T.languageDetector=s(this.modules.languageDetector),T.languageDetector.init&&T.languageDetector.init(T,this.options.detection,this.options)),this.modules.i18nFormat&&(T.i18nFormat=s(this.modules.i18nFormat),T.i18nFormat.init&&T.i18nFormat.init(this)),this.translator=new ja(this.services,this.options),this.translator.on("*",(O,...F)=>{this.emit(O,...F)}),this.modules.external.forEach(O=>{O.init&&O.init(this)})}if(this.format=this.options.interpolation.format,r||(r=$a),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const h=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);h.length>0&&h[0]!=="dev"&&(this.options.lng=h[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(h=>{this[h]=(...w)=>this.store[h](...w)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(h=>{this[h]=(...w)=>(this.store[h](...w),this)});const m=Yt(),b=()=>{const h=(w,T)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),m.resolve(T),r(w,T)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return h(null,this.t.bind(this));this.changeLanguage(this.options.lng,h)};return this.options.resources||!this.options.initAsync?b():setTimeout(b,0),m}loadResources(a,r=$a){var u,p;let o=r;const s=le(a)?a:this.language;if(typeof a=="function"&&(o=a),!this.options.resources||this.options.partialBundledLanguages){if((s==null?void 0:s.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return o();const m=[],b=h=>{if(!h||h==="cimode")return;this.services.languageUtils.toResolveHierarchy(h).forEach(T=>{T!=="cimode"&&(m.includes(T)||m.push(T))})};s?b(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(w=>b(w)),(p=(u=this.options.preload)==null?void 0:u.forEach)==null||p.call(u,h=>b(h)),this.services.backendConnector.load(m,this.options.ns,h=>{!h&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),o(h)})}else o(null)}reloadResources(a,r,o){const s=Yt();return typeof a=="function"&&(o=a,a=void 0),typeof r=="function"&&(o=r,r=void 0),a||(a=this.languages),r||(r=this.options.ns),o||(o=$a),this.services.backendConnector.reload(a,r,u=>{s.resolve(),o(u)}),s}use(a){if(!a)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!a.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return a.type==="backend"&&(this.modules.backend=a),(a.type==="logger"||a.log&&a.warn&&a.error)&&(this.modules.logger=a),a.type==="languageDetector"&&(this.modules.languageDetector=a),a.type==="i18nFormat"&&(this.modules.i18nFormat=a),a.type==="postProcessor"&&Or.addPostProcessor(a),a.type==="formatter"&&(this.modules.formatter=a),a.type==="3rdParty"&&this.modules.external.push(a),this}setResolvedLanguage(a){if(!(!a||!this.languages)&&!["cimode","dev"].includes(a)){for(let r=0;r<this.languages.length;r++){const o=this.languages[r];if(!["cimode","dev"].includes(o)&&this.store.hasLanguageSomeTranslations(o)){this.resolvedLanguage=o;break}}!this.resolvedLanguage&&!this.languages.includes(a)&&this.store.hasLanguageSomeTranslations(a)&&(this.resolvedLanguage=a,this.languages.unshift(a))}}changeLanguage(a,r){this.isLanguageChangingTo=a;const o=Yt();this.emit("languageChanging",a);const s=m=>{this.language=m,this.languages=this.services.languageUtils.toResolveHierarchy(m),this.resolvedLanguage=void 0,this.setResolvedLanguage(m)},u=(m,b)=>{b?this.isLanguageChangingTo===a&&(s(b),this.translator.changeLanguage(b),this.isLanguageChangingTo=void 0,this.emit("languageChanged",b),this.logger.log("languageChanged",b)):this.isLanguageChangingTo=void 0,o.resolve((...h)=>this.t(...h)),r&&r(m,(...h)=>this.t(...h))},p=m=>{var w,T;!a&&!m&&this.services.languageDetector&&(m=[]);const b=le(m)?m:m&&m[0],h=this.store.hasLanguageSomeTranslations(b)?b:this.services.languageUtils.getBestMatchFromCodes(le(m)?[m]:m);h&&(this.language||s(h),this.translator.language||this.translator.changeLanguage(h),(T=(w=this.services.languageDetector)==null?void 0:w.cacheUserLanguage)==null||T.call(w,h)),this.loadResources(h,O=>{u(O,h)})};return!a&&this.services.languageDetector&&!this.services.languageDetector.async?p(this.services.languageDetector.detect()):!a&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(p):this.services.languageDetector.detect(p):p(a),o}getFixedT(a,r,o,s){const u=s==null?void 0:s.scopeNs,p=(m,b,...h)=>{let w;typeof b!="object"?w=this.options.overloadTranslationOptionHandler([m,b].concat(h)):w={...b},w.lng=w.lng||p.lng,w.lngs=w.lngs||p.lngs;const T=w.ns!==void 0&&w.ns!==null;w.ns=w.ns||p.ns,w.keyPrefix!==""&&(w.keyPrefix=w.keyPrefix||o||p.keyPrefix);const O={...this.options,...w};Array.isArray(u)&&!T&&(O.ns=u),typeof w.keyPrefix=="function"&&(w.keyPrefix=It(w.keyPrefix,O));const F=this.options.keySeparator||".";let v;return w.keyPrefix&&Array.isArray(m)?v=m.map(H=>(typeof H=="function"&&(H=It(H,O)),`${w.keyPrefix}${F}${H}`)):(typeof m=="function"&&(m=It(m,O)),v=w.keyPrefix?`${w.keyPrefix}${F}${m}`:m),this.t(v,w)};return le(a)?p.lng=a:p.lngs=a,p.ns=r,p.keyPrefix=o,p}t(...a){var r;return(r=this.translator)==null?void 0:r.translate(...a)}exists(...a){var r;return(r=this.translator)==null?void 0:r.exists(...a)}setDefaultNamespace(a){this.options.defaultNS=a}hasLoadedNamespace(a,r={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const o=r.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,u=this.languages[this.languages.length-1];if(o.toLowerCase()==="cimode")return!0;const p=(m,b)=>{const h=this.services.backendConnector.state[`${m}|${b}`];return h===-1||h===0||h===2};if(r.precheck){const m=r.precheck(this,p);if(m!==void 0)return m}return!!(this.hasResourceBundle(o,a)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||p(o,a)&&(!s||p(u,a)))}loadNamespaces(a,r){const o=Yt();return this.options.ns?(le(a)&&(a=[a]),a.forEach(s=>{this.options.ns.includes(s)||this.options.ns.push(s)}),this.loadResources(s=>{o.resolve(),r&&r(s)}),o):(r&&r(),Promise.resolve())}loadLanguages(a,r){const o=Yt();le(a)&&(a=[a]);const s=this.options.preload||[],u=a.filter(p=>!s.includes(p)&&this.services.languageUtils.isSupportedCode(p));return u.length?(this.options.preload=s.concat(u),this.loadResources(p=>{o.resolve(),r&&r(p)}),o):(r&&r(),Promise.resolve())}dir(a){var s,u;if(a||(a=this.resolvedLanguage||(((s=this.languages)==null?void 0:s.length)>0?this.languages[0]:this.language)),!a)return"rtl";try{const p=new Intl.Locale(a);if(p&&p.getTextInfo){const m=p.getTextInfo();if(m&&m.direction)return m.direction}}catch{}const r=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],o=((u=this.services)==null?void 0:u.languageUtils)||new br(wn());return a.toLowerCase().indexOf("-latn")>1?"ltr":r.includes(o.getLanguagePartFromCode(a))||a.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(a={},r){const o=new ea(a,r);return o.createInstance=ea.createInstance,o}cloneInstance(a={},r=$a){const o=a.forkResourceStore;o&&delete a.forkResourceStore;const s={...this.options,...a,isClone:!0},u=new ea(s);if((a.debug!==void 0||a.prefix!==void 0)&&(u.logger=u.logger.clone(a)),["store","services","language"].forEach(m=>{u[m]=this[m]}),u.services={...this.services},u.services.utils={hasLoadedNamespace:u.hasLoadedNamespace.bind(u)},o){const m=Object.keys(this.store.data).reduce((b,h)=>(b[h]={...this.store.data[h]},b[h]=Object.keys(b[h]).reduce((w,T)=>(w[T]={...b[h][T]},w),b[h]),b),{});u.store=new gr(m,s),u.services.resourceStore=u.store}if(a.interpolation){const b={...wn().interpolation,...this.options.interpolation,...a.interpolation},h={...s,interpolation:b};u.services.interpolator=new _r(h)}return u.translator=new ja(u.services,s),u.translator.on("*",(m,...b)=>{u.emit(m,...b)}),u.init(s,r),u.translator.options=s,u.translator.backendConnector.services.utils={hasLoadedNamespace:u.hasLoadedNamespace.bind(u)},u}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Me=ea.createInstance();Me.createInstance;Me.dir;Me.init;Me.loadResources;Me.reloadResources;Me.use;Me.changeLanguage;Me.getFixedT;Me.t;Me.exists;Me.setDefaultNamespace;Me.hasLoadedNamespace;Me.loadNamespaces;Me.loadLanguages;const To={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, no copiando",criticalThinking:"Pensamiento crítico activo • Sin trampas de IA"},Do={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar & Drive sincronizados"},$o={agenda:"Agenda",study:"Estudio / Repaso",tasks:"Trabajos",tutorBadge:"Tutor IA"},Lo={nextMilestone:"Próximo Hito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoy",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodología activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados en tu cuenta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudio",autonomousOrg:"Organización autónoma",subtitle:"Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.",addBlock:"Añadir Bloque de Estudio",emptyTitle:"No hay bloques de estudio programados.",emptyDesc:'Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.',pendingSync:"Pendiente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Añadir Bloque de Estudio",modalSubtitle:"Planifica un hito para organizar tu tiempo de aprendizaje.",fieldActivity:"Título de la actividad",fieldSubject:"Asignatura",fieldType:"Tipo de Hito",fieldDate:"Fecha",fieldTime:"Hora Inicio",fieldNotes:"Notas u objetivo personal",cancel:"Cancelar",save:"Guardar Bloque",types:{study_session:"Sesión de estudio (45 min)",exam:"Examen lectivo",assignment_due:"Entrega de trabajo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Agenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador de Agenda",modalPlannerSubtitle:"Estructura Propia de 4 Pilares: Distribución Homogénea, Prioridad y Fechas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},Io={bannerTitle:"Marco de Aprendizaje Socrático Activo",bannerDesc:"La IA guía tu pensamiento con preguntas reflexivas. Prohibido obtener soluciones automáticas para garantizar tu crecimiento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveles: Funcional • Regulador LOMLOE • Línea Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveles)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividad / Variación:",stepPrefix:"Paso",baselineConcepts:"Línea Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Generador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inyección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarjeta de Autoevaluación",flashcardSubtitle:"Explica con tus palabras antes de ver la explicación:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar luego",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Hazme una pregunta diagnóstica",chip2:"💡 Dame una pista reflexiva",chip3:"🎯 ¿Voy por buen camino?",inputPlaceholder:"Escribe tu razonamiento o duda... (Enter para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: la IA fomenta tu propio esfuerzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Tú",taskListTitle:"Tareas de Estudio y Repaso Activo",taskListSubtitle:"Selecciona una tarea para iniciar la sesión guiada con el tutor socrático. Solo puede haber una tarea activa a la vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversación",completionBannerTitle:"¡Objetivo pedagógico completado!",completionBannerDesc:"Has revisado y asimilado todo el contenido exigido por el nivel pedagógico.",btnNextVariation:"Siguiente variación",btnReopenChat:"Seguir consultando",indexedDbSavedNotice:"Conversación y progreso guardados en tiempo real en IndexedDB",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interacciones",pedagogicalAnchor:"Fundamentación Pedagógica LOMLOE",pauseNotice:"En pausa (progreso guardado)",activeBadge:"Sesión activa",activeTaskNote:"Al iniciar otra tarea, la anterior se pausará automáticamente.",noTasks:"No hay tareas de estudio disponibles para este curso.",btnBackToList:"← Volver a la lista de tareas",btnPauseAndExit:"Pausar y salir",btnFold:"Volver a la lista"},Oo={title:"Trabajos y Proyectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.",btnPromptProject:"Prompt Trabajos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Trabajos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",btnViewTaskPrompt:"Ver Prompt del Trabajo",tooltipViewTaskPrompt:"Ver el Grafo de Prompts (4 Niveles) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operaciones Concretas",grade2batxBadge:"🟣 2º de Bachillerato • Operaciones Formales (PAU)",pedagogicalFoundation:"Fundamento Pedagógico (Piaget & Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Trabajos y Proyectos",modalProjectSubtitle:"Grafo de 4 Niveles: Metodología de 4 Fases y Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inyección Contextualizada de 4 Niveles para {{subject}}",newTask:"Nuevo Trabajo",emptyTitle:"No tienes trabajos activos registrados.",emptyDesc:'Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.',dueDate:"Fecha Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Archivo",noDriveFiles:"No hay archivos vinculados de Drive todavía.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía del Estudiante",ownEffort:"propio",modalTitle:"Nuevo Trabajo o Entregable",modalSubtitle:"Crea una ficha para organizar tu investigación y documentos.",fieldTitle:"Título del Proyecto / Trabajo",fieldSubject:"Asignatura",fieldDue:"Fecha de Entrega",fieldNotes:"Descripción u objetivo",cancel:"Cancelar",create:"Crear Trabajo",btnBackToList:"← Volver a la lista de trabajos",btnStart:"Iniciar",btnResume:"Continuar",btnReview:"Revisar entrega",criteriaCompleted:"{{completed}} de {{total}} criterios de autoría",driveFilesCount:"{{count}} documentos de Drive",noDriveFilesShort:"Sin archivos vinculados"},jo={titleAssembled:"Ensamblado del Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestación Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Cerrar",sourceLabel:"Origen:",footerGraph:"Grafo de prompts por capas: evita alucinaciones y garantiza rigor curricular",footerAudit:"Metodología pedagógica y auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador & Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividad & Variación"},graphTitle:"Arquitectura del Grafo de Inferencia",graphSubtitle:"Flujo de confluencia multicapa hacia la System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Colapsar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Haz clic en cualquier nodo para saltar a su capa en el acordeón",discreteComponents:"Componentes Discretos y Ensamblado"},Mo={title:"Configuración del Modelo de IA",subtitle:"Inferencia local o en la nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidad Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL del Endpoint API",endpointHint:"Compatible con /v1/chat/completions y /v1/models",modelName:"Nombre del Modelo",apiKey:"API Key (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicamente en tu navegador (IndexedDB local).",socraticMode:"Modo Pedagógico Socrático",strictHigh:"Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)",strictBalanced:"Equilibrado: Pistas intermedias y ejemplos análogos",strictExploratory:"Exploratorio: Explicaciones conceptuales y desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Guardar Cambios"},Ro={title:"Cuenta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Cuenta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudio",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Cerrar Sesión / Desconectar",modeSelectorTitle:"Elige el método de acceso",demoOptionTitle:"Modo Demo (Recomendado para evaluación)",demoOptionDesc:"Explora toda la plataforma con datos precargados de muestra sin necesidad de credenciales.",demoButton:"Usar Modo Demo",realOptionTitle:"Conectar Cuenta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza tus eventos en tu Google Calendar real y vincula tus archivos de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ej. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Consíguelo en Google Cloud Console > APIs y Servicios > Credenciales > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar tu cuenta educativa o personal de Google permite:",benefit1:"Exportar tus sesiones de estudio a Google Calendar.",benefit2:"Adjuntar tus apuntes y borradores desde Google Drive.",benefit3:"Garantizar que tus datos permanezcan privados y bajo tu control."},Bo={updateTitle:"¡Nueva versión disponible!",updateDesc:"Actualiza para recibir las últimas mejoras.",updateButton:"Actualizar"},qo={app:To,nav:Do,tabs:$o,agenda:Lo,study:Io,tasks:Oo,promptModal:jo,aiModal:Mo,authModal:Ro,pwa:Bo},zo={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense trampes d'IA"},No={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},Fo={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},Ko={nextMilestone:"Proper Hite Lectiu",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min avui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribueix l'esforç en blocs curts per garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem a "Afegir Bloc d'Estudi" per començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Desar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},Go={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtenir solucions automàtiques per garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teves paraules abans de veure l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig pel bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Objectiu pedagògic assolit!",completionBannerDesc:"Has revisat i assimilat tot el contingut exigit pel nivell pedagògic.",btnNextVariation:"Següent variació",btnReopenChat:"Seguir consultant",indexedDbSavedNotice:"Conversa i progrés desats en temps real a IndexedDB",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a aquest curs.",btnBackToList:"← Tornar a la llista de tasques",btnPauseAndExit:"Pausar i sortir",btnFold:"Tornar a la llista"},Vo={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per elaborar treballs rigorosos garantint la teva autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem a "Nou Treball" per començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents a Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per organitzar la teva recerca i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball",btnBackToList:"← Tornar a la llista de treballs",btnStart:"Iniciar",btnResume:"Continuar",btnReview:"Revisar treball",criteriaCompleted:"{{completed}} de {{total}} criteris d'autoria",driveFilesCount:"{{count}} documents de Drive",noDriveFilesShort:"Sense fitxers de Drive"},Ho={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},Uo={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privadesa Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Desada de forma segura únicament al teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Desar Canvis"},Wo={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconsegueix-lo a Google Cloud Console > APIs i Serveis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teves sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teves dades romanguin privades i sota el teu control."},Qo={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per rebre les darreres millores.",updateButton:"Actualitzar"},Yo={app:zo,nav:No,tabs:Fo,agenda:Ko,study:Go,tasks:Vo,promptModal:Ho,aiModal:Uo,authModal:Wo,pwa:Qo},Jo={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, non copiando",criticalThinking:"Pensamento crítico activo • Sen trampas de IA"},Zo={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar e Drive sincronizados"},Xo={agenda:"Axenda",study:"Estudo / Repaso",tasks:"Traballos",tutorBadge:"Tutor IA"},es={nextMilestone:"Próximo Fito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoxe",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodoloxía activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados na túa conta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudo",autonomousOrg:"Organización autónoma",subtitle:"Distribúe o esforzo en bloques curtos para garantir a asimilación a longo prazo.",addBlock:"Engadir Bloque de Estudo",emptyTitle:"Non hai bloques de estudo programados.",emptyDesc:'Preme en "Engadir Bloque de Estudo" para comezar a organizar o teu tempo.',pendingSync:"Pendente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Engadir Bloque de Estudo",modalSubtitle:"Planifica un fito para organizar o teu tempo de aprendizaxe.",fieldActivity:"Título da actividade",fieldSubject:"Materia",fieldType:"Tipo de Fito",fieldDate:"Data",fieldTime:"Hora de Inicio",fieldNotes:"Notas ou obxectivo persoal",cancel:"Cancelar",save:"Gardar Bloque",types:{study_session:"Sesión de estudo (45 min)",exam:"Exame lectivo",assignment_due:"Entrega de traballo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Axenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",modalPlannerTitle:"Estrutura de Prompt: Planificador de Axenda",modalPlannerSubtitle:"Estrutura Propia de 4 Pilares: Distribución Homoxénea, Prioridade e Datas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},ts={bannerTitle:"Marco de Aprendizaxe Socrática Activa",bannerDesc:"A IA guía o teu pensamento con preguntas reflexivas. Prohibido obter solucións automáticas para garantir o teu crecemento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveis: Funcional • Regulador LOMLOE • Liña Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveis)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividade / Variación:",stepPrefix:"Paso",baselineConcepts:"Liña Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Xerador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inxección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarxeta de Autoavaliación",flashcardSubtitle:"Explica coas túas palabras antes de ver a explicación:",toggleHint:"👁️ Amosar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar despois",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Faime unha pregunta diagnóstica",chip2:"💡 Dáme unha pista reflexiva",chip3:"🎯 Vou polo bo camiño?",inputPlaceholder:"Escribe o teu razoamento ou dúbida... (Intro para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: a IA fomenta o teu propio esforzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Ti",taskListTitle:"Tarefas de Estudo e Repaso Activo",taskListSubtitle:"Selecciona unha tarefa para iniciar a sesión guiada co titor socrático. Só pode haber unha tarefa activa á vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Obxectivo pedagóxico acadado!",completionBannerDesc:"Revisaches e asimilaches todo o contido exixido polo nivel pedagóxico.",btnNextVariation:"Seguinte variación",btnReopenChat:"Seguir consultando",indexedDbSavedNotice:"Conversa e progreso gardados en tempo real en IndexedDB",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interaccións",pedagogicalAnchor:"Fundamentación Pedagóxica LOMLOE",pauseNotice:"En pausa (sesión gardada)",activeBadge:"Sesión activa",activeTaskNote:"Ao iniciar outra tarefa, a anterior pausarase automaticamente.",noTasks:"Non hai tarefas de estudo dispoñibles para este curso.",btnBackToList:"← Volver á lista de tarefas",btnPauseAndExit:"Pausar e saír",btnFold:"Volver á lista"},as={title:"Traballos e Proxectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar traballos rigorosos garantindo a túa autoría e ideas propias.",btnPromptProject:"Prompt Traballos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Traballos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",btnViewTaskPrompt:"Ver Prompt do Traballo",tooltipViewTaskPrompt:"Ver o Grafo de Prompts (4 Niveis) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operacións Concretas",grade2batxBadge:"🟣 2º de Bacharelato • Operacións Formais (PAU)",pedagogicalFoundation:"Fundamento Pedagóxico (Piaget e Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Traballos e Proxectos",modalProjectSubtitle:"Grafo de 4 Niveis: Metodoloxía de 4 Fases e Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inxección Contextualizada de 4 Niveis para {{subject}}",newTask:"Novo Traballo",emptyTitle:"Non tes traballos activos rexistrados.",emptyDesc:'Preme en "Novo Traballo" para comezar a estruturar un entregable.',dueDate:"Data Límite",autonomy:"Autonomia",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Ficheiro",noDriveFiles:"Aínda non hai ficheiros vinculados de Drive.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía do Estudante",ownEffort:"propio",modalTitle:"Novo Traballo ou Entregable",modalSubtitle:"Crea unha ficha para organizar a túa investigación e documentos.",fieldTitle:"Título do Proxecto / Traballo",fieldSubject:"Materia",fieldDue:"Data de Entrega",fieldNotes:"Descrición ou obxectivo",cancel:"Cancelar",create:"Crear Traballo",btnBackToList:"← Volver á lista de traballos",btnStart:"Iniciar",btnResume:"Continuar",btnReview:"Revisar traballo",criteriaCompleted:"{{completed}} de {{total}} criterios de autoría",driveFilesCount:"{{count}} documentos de Drive",noDriveFilesShort:"Sen ficheiros de Drive"},ns={titleAssembled:"Ensamblado do Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestración Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Pechar",sourceLabel:"Orixe:",footerGraph:"Grafo de prompts por capas: evita alucinacións e garante rigor curricular",footerAudit:"Metodoloxía pedagóxica e auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador e Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividade e Variación"},graphTitle:"Arquitectura do Grafo de Inferencia",graphSubtitle:"Fluxo de confluencia multicapa cara á System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Pregar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Fai clic en calquera nodo para saltar á súa capa no acordeón",discreteComponents:"Compoñentes Discretos e Ensamblado"},rs={title:"Configuración do Modelo de IA",subtitle:"Inferencia local ou na nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidade Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL do Endpoint API",endpointHint:"Compatible con /v1/chat/completions e /v1/models",modelName:"Nome do Modelo",apiKey:"Chave de API (Opcional en Local)",apiKeyHint:"Gardada de forma segura unicamente no teu navegador (IndexedDB local).",socraticMode:"Modo Pedagóxico Socrático",strictHigh:"Estrito: Nunca dá solucións directas (100% preguntas de razoamento)",strictBalanced:"Equilibrado: Pistas intermedias e exemplos análogos",strictExploratory:"Exploratorio: Explicacións conceptuais e desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Gardar Cambios"},is={title:"Conta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Conta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudo",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Pechar Sesión / Desconectar",modeSelectorTitle:"Escolle o método de acceso",demoOptionTitle:"Modo Demo (Recomendado para avaliación)",demoOptionDesc:"Explora toda a plataforma con datos precargados de mostra sen necesidade de credenciais.",demoButton:"Empregar Modo Demo",realOptionTitle:"Conectar Conta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza os teus eventos no teu Google Calendar real e vincula os teus ficheiros de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Conségueo en Google Cloud Console > APIs e Servizos > Credenciais > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar a túa conta educativa ou persoal de Google permite:",benefit1:"Exportar as túas sesións de estudo a Google Calendar.",benefit2:"Xuntar os teus apuntamentos e borradores desde Google Drive.",benefit3:"Garantir que os teus datos permanezan privados e baixo o teu control."},os={updateTitle:"Nova versión dispoñible!",updateDesc:"Actualiza para recibir as últimas melloras.",updateButton:"Actualizar"},ss={app:Jo,nav:Zo,tabs:Xo,agenda:es,study:ts,tasks:as,promptModal:ns,aiModal:rs,authModal:is,pwa:os},ls={title:"Anaxagoras AI",badge:"STI Kognitiboa",tagline:"Pentsatuz ikasi, ez kopiatuz",criticalThinking:"Pentsamendu kritiko aktiboa • IA trikimailurik gabe"},cs={local:"Lokala",cloud:"Cloud",connectGoogle:"Google Konektatu",calendarDriveSync:"Google Calendar eta Drive sinkronizatuta"},ds={agenda:"Agenda",study:"Ikasketa / Berrikuspena",tasks:"Lanak",tutorBadge:"IA Tutorea"},us={nextMilestone:"Hurrengo Mugarri Didaktikoa",inDays:"3 egun barru",recommendedToday:"⚡ Gomendatutako saioa: 45 min gaur",weeklyProgress:"Asteko Aurrerapena",blocksCompleted:"bloke osatuta",activeMethod:"Metodologia aktiboa",googleCalendar:"Google Calendar",syncedEvents:"Sinkronizatutako gertaerak zure kontuan",syncAll:"🔄 Dena sinkronizatu Calendar-ekin",syncing:"⏳ Sinkronizatzen...",title:"Asteko Ikasketa Plangintza",autonomousOrg:"Antolakuntza autonomoa",subtitle:"Banakatu ahalegina bloke laburretan epe luzerako barneratzea bermatzeko.",addBlock:"Ikasketa Blokea Gehitu",emptyTitle:"Ez dago programatutako ikasketa blokerik.",emptyDesc:'Sakatu "Ikasketa Blokea Gehitu" zure denbora antolatzen hasteko.',pendingSync:"Sync zain",synced:"Google Calendar",minRecommended:"minutu gomendatuta",modalTitle:"Ikasketa Blokea Gehitu",modalSubtitle:"Planifikatu mugarri bat ikasteko denbora antolatzeko.",fieldActivity:"Jardueraren izenburua",fieldSubject:"Ikasgaia",fieldType:"Mugarri Mota",fieldDate:"Data",fieldTime:"Hasiera Ordua",fieldNotes:"Oharrak edo helburu pertsonala",cancel:"Utzi",save:"Blokea Gorde",types:{study_session:"Ikasketa saioa (45 min)",exam:"Azterketa",assignment_due:"Lanaren entrega"},btnPromptPlanner:"Agenda Antolatzaile Prompt-a",tooltipPromptPlanner:"Ikusi Ataleko Prompt-a: Agendaren Antolatzailea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",modalPlannerTitle:"Prompt Egitura: Agenda Antolatzailea",modalPlannerSubtitle:"4 Zutabeko Egitura Propioa: Banaketa Homogeneoa, Lehentasuna eta Konpromiso Datak",modalCurricularSubtitle:"Departamentuko Curriculum Gidalerroa ({{grade}})"},ps={bannerTitle:"Ikaskuntza Sokratiko Aktiboaren Esparrua",bannerDesc:"IAk zure pentsamendua gidatzen du galdera gogoetatsuekin. Zure hazkunde intelektuala bermatzeko debekatuta dago soluzio automatikoak lortzea.",bannerBadge:"Tutore Kognitibo Aktiboa",bannerGraphDesc:"4 mailako grafo dinamikoa: Funtzionala • LOMLOE Arautzailea • Gai-oinarria • Aldakuntzako Jarduerak",btnPromptGraph:"Prompts Grafoa (4 Maila)",tooltipPromptGraph:"Ikusi Muntatutako Prompt Grafoa (4 Geruza)",activityVariationLabel:"Jarduera / Aldakuntza:",stepPrefix:"Urratsa",baselineConcepts:"Oinarrizko Lerroa: Menperatu Beharreko Kontzeptuak",btnRecallPrompt:"Recall Prompt-a",tooltipRecallPrompt:"Ikusi Ataleko Prompt-a: Active Recall Sortzailea",modalSocraticTitle:"Prompt Grafo Dinamikoa",modalSocraticSubtitle:"Testuinguruan kokatutako injekzioa: {{subject}} • {{topic}}",activeRecall:"Berreskuratze Aktiboa",flashcardTitle:"Autoebaluazio Txartela",flashcardSubtitle:"Azaldu zure hitzekin azalpena ikusi aurretik:",toggleHint:"👁️ Erakutsi / Ezkutatu Aztarna Azalgarria",reviewLater:"🔁 Berrikusi geroago",mastered:"✅ Menperatua",conceptsTitle:"Menperatu beharreko Kontzeptuak",consolidated:"Finkatua",toStrengthen:"Sendotzeko",chip1:"❓ Egin iezadazu galdera diagnostiko bat",chip2:"💡 Eman iezadazu aztarna gogoetatsu bat",chip3:"🎯 Bide onetik nabil?",inputPlaceholder:"Idatzi zure arrazoibidea edo zalantza... (Enter bidaltzeko)",send:"Bidali",safeMode:"🔒 Modu segurua: IAk zure ahalegina sustatzen du",openaiCompatible:"OpenAI inferentzia bateragarria",tutorRole:"Tutore Sokratikoa",userRole:"Zu",taskListTitle:"Ikasketa eta Errepaso Aktiboko Zereginak",taskListSubtitle:"Aukeratu zeregin bat tutore sokratikoarekin saio gidatua hasteko. Zeregin bakarra egon daiteke aktibo aldi berean.",btnStart:"Hasi",btnResume:"Jarraitu",btnPause:"Gelditu",statusPending:"Hasteke",statusActive:"Martxan",statusPaused:"Pausan",statusCompleted:"Osatuta",btnReviewConversation:"Elkarrizketa berrikusi",completionBannerTitle:"Helburu pedagogikoa lortuta!",completionBannerDesc:"Maila pedagogikoak eskatzen duen eduki guztia berrikusi eta barneratu duzu.",btnNextVariation:"Hurrengo aldakuntza",btnReopenChat:"Galdetzen jarraitu",indexedDbSavedNotice:"Elkarrizketa eta aurrerapena denbora errealean IndexedDBn gordeta",badgeActivities:"{{count}} jarduera",badgeConcepts:"{{count}} kontzeptu gako",interactionsCount:"{{count}} elkarrekintza",pedagogicalAnchor:"LOMLOE Oinarri Pedagogikoa",pauseNotice:"Pausan (saioa gordeta)",activeBadge:"Saio aktiboa",activeTaskNote:"Beste zeregin bat hastean, aurrekoa automatikoki pausatuko da.",noTasks:"Ez dago ikasketa zereginik ikasturte honetarako.",btnBackToList:"← Itzuli zereginen zerrendara",btnPauseAndExit:"Pausatu eta irten",btnFold:"Zerrendara itzuli"},ms={title:"Eskolako Lanak eta Proiektuak",driveIntegration:"Google Drive Integrazioa",subtitle:"Faseren araberako laguntzailea lan zorrotzak egiteko, zure egiletza eta ideia propioak bermatuz.",btnPromptProject:"Lanak Prompt-a",tooltipPromptProject:"Ikusi Ataleko Prompt-a: Lanen Tutorea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",btnViewTaskPrompt:"Ikusi Lanaren Prompt-a",tooltipViewTaskPrompt:"Ikusi {{title}}-rako 4 Mailako Prompt Grafo zehatza",grade1esoBadge:"🟢 DBH 1 • Eragiketa Zehatzak",grade2batxBadge:"🟣 Batxilergo 2 • Eragiketa Formalak (PAU)",pedagogicalFoundation:"Oinarri Pedagogikoa (Piaget eta Guardrails):",modalProjectTitle:"Grafo Dinamikoa: Lanen eta Proiektuen Tutorea",modalProjectSubtitle:"4 Mailako Grafoa: 4 Faseko Metodologia eta Egiletzaren Auditoria",modalTaskPromptTitle:"Prompt Grafoa: {{title}}",modalTaskPromptSubtitle:"{{subject}}-rako 4 Mailako Testuinguratutako Injekzioa",newTask:"Lan Berria",emptyTitle:"Ez duzu lan aktiborik erregistratuta.",emptyDesc:'Sakatu "Lan Berria" entregagarri bat egituratzen hasteko.',dueDate:"Entregatzeko Data",autonomy:"Autonomia",phasesTitle:"Egite Faseak",phases:{planning:"1. Plangintza",research:"2. Ikerketa",writing:"3. Idazketa Propioa",review:"4. Azken Berrikuspena"},driveDocs:"Dokumentuak Google Driven",attachDrive:"＋ Fitxategia Lotu",noDriveFiles:"Oraindik ez dago Driveren fitxategirik lotuta.",driveSync:"Drive Sync",autonomyMeter:"Ikaslearen Autonomia Neurgailua",ownEffort:"propioa",modalTitle:"Lan Berria edo Entregagarria",modalSubtitle:"Sortu fitxa bat zure ikerketa eta dokumentuak antolatzeko.",fieldTitle:"Proiektuaren / Lanaren Izenburua",fieldSubject:"Ikasgaia",fieldDue:"Entregatzeko Data",fieldNotes:"Deskribapena edo helburua",cancel:"Utzi",create:"Lana Sortu",btnBackToList:"← Itzuli lanen zerrendara",btnStart:"Hasi",btnResume:"Jarraitu",btnReview:"Lana berrikusi",criteriaCompleted:"Egiletzaren {{completed}} / {{total}} irizpide",driveFilesCount:"Drive-ko {{count}} dokumentu",noDriveFilesShort:"Drive fitxategirik gabe"},fs={titleAssembled:"Prompt Muntaia ({{subject}})",subtitleAssembled:"Orkestrazio Dinamikoaren Grafoa • {{topic}}",badge4Layers:"4 Geruzako Grafo Dinamikoa",badgePrompt:"Prompt",badgeLayer:"Geruza",defaultSubtitle:"System Instruction",close:"Itxi",sourceLabel:"Jatorria:",footerGraph:"Geruzetako prompt-en grafoa: haluzinazioak saihesten ditu eta curriculum-zorroztasuna bermatzen du",footerAudit:"Metodologia pedagogikoa eta ikuskaritza gardena",tabs:{all:"Muntaia Osoa",level1:"N1: Funtzionala",level3:"N3: Arautzailea eta Etika",level2A:"N2.A: Gai-oinarria",level2B:"N2.B: Jarduera eta Aldakuntza"}},gs={title:"IA Ereduaren Konfigurazioa",subtitle:"Inferentzia lokala edo hodeian OpenAI API estandarrarekin",inferenceType:"Inferentzia Mota",localTitle:"Lokala (Pribatutasun Osoa)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"API Endpoint URL",endpointHint:"Bateragarria /v1/chat/completions eta /v1/models-ekin",modelName:"Ereduaren Izena",apiKey:"API Gakoa (Aukerakoa Lokalean)",apiKeyHint:"Segurtasunez gordeta zure arakatzailean bakarrik (IndexedDB lokala).",socraticMode:"Modu Pedagogiko Sokratikoa",strictHigh:"Zorrotza: Ez du inoiz soluzio zuzenik ematen (100% arrazoitzeko galderak)",strictBalanced:"Orekatua: Tarteko aztarnak eta adibide antzekoak",strictExploratory:"Esploratzailea: Kontzeptu azalpenak eta erronkak",testConnection:"Konexioa Probatu",testing:"Probatzen...",cancel:"Utzi",save:"Aldaketak Gorde"},bs={title:"Google Kontua",subtitle:"OAuth 2.0 Konektoreak • Calendar & Drive",demoBadge:"Demo Modu Aktiboa",realBadge:"Benetako Google Kontua",authorizedResources:"Baimendutako baliabideak",calendarTitle:"Google Calendar",calendarDesc:"Ikasketa blokeen sinkronizazioa",driveTitle:"Google Drive",driveDesc:"Entregagaien dokumentuak lotzea",statusActive:"Aktiboa",statusReal:"Benetako Sinkronizazioa",statusDemo:"Simulazio Lokala",disconnect:"Saioa Itxi / Deskonektatu",modeSelectorTitle:"Aukeratu sarbide metodoa",demoOptionTitle:"Demo Modua (Ebaluaziorako gomendatua)",demoOptionDesc:"Arakatu plataforma osoa aurrez kargatutako datuekin kredentzialik sortu beharrik gabe.",demoButton:"Demo Modua Erabili",realOptionTitle:"Konektatu Benetako Google Kontua (OAuth 2.0)",realOptionDesc:"Sinkronizatu zure gertaerak Google Calendarrean eta lotu zure Google Driveko fitxategiak.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"adib. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Lortu Google Cloud Console > APIs eta Zerbitzuak > Kredentzialak > OAuth bezeroaren IDa.",realButton:"Hasi Saioa Google OAuth-ekin",connectExplanation:"Zure hezkuntza edo Google kontu pertsonala konektatzeak aukera ematen du:",benefit1:"Esportatu zure ikasketa saioak Google Calendarrera.",benefit2:"Erantsi zure oharrak eta zirriborroak Google Drivetik.",benefit3:"Bermatu zure datuak pribatuak eta zure kontrolpean geratzen direla."},hs={updateTitle:"Bertsio berria eskuragarri!",updateDesc:"Eguneratu azken hobekuntzak jasotzeko.",updateButton:"Eguneratu"},vs={app:ls,nav:cs,tabs:ds,agenda:us,study:ps,tasks:ms,promptModal:fs,aiModal:gs,authModal:bs,pwa:hs},ys={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense paranys d'IA"},xs={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},_s={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},Cs={nextMilestone:"Pròxima Fita Lectiva",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min hui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribuïx l'esforç en blocs curts per a garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem en "Afegir Bloc d'Estudi" per a començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per a organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Guardar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},ws={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtindre solucions automàtiques per a garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teues paraules abans de vore l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig per bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per a enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per a iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Objectiu pedagògic assolit!",completionBannerDesc:"Has revisat i assimilat tot el contingut exigit pel nivell pedagògic.",btnNextVariation:"Següent variació",btnReopenChat:"Seguir consultant",indexedDbSavedNotice:"Conversa i progrés guardats en temps real en IndexedDB",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a este curs.",btnBackToList:"← Tornar a la llista de tasques",btnPauseAndExit:"Pausar i eixir",btnFold:"Tornar a la llista"},Ps={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per a elaborar treballs rigorosos garantint la teua autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem en "Nou Treball" per a començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents en Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per a organitzar la teua investigació i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball",btnBackToList:"← Tornar a la llista de treballs",btnStart:"Iniciar",btnResume:"Continuar",btnReview:"Revisar treball",criteriaCompleted:"{{completed}} de {{total}} criteris d'autoria",driveFilesCount:"{{count}} documents de Drive",noDriveFilesShort:"Sense fitxers de Drive"},As={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},Es={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privacitat Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicament en el teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Guardar Canvis"},Ss={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconseguix-lo en Google Cloud Console > APIs i Servicis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teues sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teues dades romanguen privades i sota el teu control."},ks={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per a rebre les últimes millores.",updateButton:"Actualitzar"},Ts={app:ys,nav:xs,tabs:_s,agenda:Cs,study:ws,tasks:Ps,promptModal:As,aiModal:Es,authModal:Ss,pwa:ks},Pr="anaxagoras_lang";class Ds{constructor(){$e(this,"initialized",!1);$e(this,"listeners",[])}async init(){if(this.initialized)return;const a=localStorage.getItem(Pr)||"es";await Me.init({lng:a,fallbackLng:"es",debug:!1,resources:{es:{translation:qo},ca:{translation:Yo},ga:{translation:ss},eu:{translation:vs},va:{translation:Ts}},interpolation:{escapeValue:!1}}),this.initialized=!0}t(a,r){return Me.t(a,r)}async changeLanguage(a){await Me.changeLanguage(a),localStorage.setItem(Pr,a);for(const r of this.listeners)r(a)}getCurrentLanguage(){return Me.language||"es"}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}}const aa=new Ds,y=(c,a)=>aa.t(c,a);class $s{constructor(){$e(this,"registration",null);$e(this,"updateWaiting",!1)}hasUpdateWaiting(){return this.updateWaiting}async register(a){if(!("serviceWorker"in navigator)){console.log("[PWA] Service Worker no soportado en este navegador.");return}try{const o=await navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"});this.registration=o,o.waiting&&(this.updateWaiting=!0,this.notifyUpdate(a)),o.addEventListener("updatefound",()=>{const u=o.installing;u&&u.addEventListener("statechange",()=>{u.state==="installed"&&navigator.serviceWorker.controller&&(this.updateWaiting=!0,this.notifyUpdate(a))})});let s=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{s||(s=!0,window.location.reload())}),o.update().catch(()=>{}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&o.update().catch(()=>{})}),window.addEventListener("focus",()=>{o.update().catch(()=>{})}),window.addEventListener("online",()=>{o.update().catch(()=>{})}),setInterval(()=>{o.update().catch(()=>{})},1e3*60*5)}catch(r){console.warn("[PWA] Error registrando Service Worker:",r)}}notifyUpdate(a){a!=null&&a.onUpdateAvailable?a.onUpdateAvailable(()=>this.applyUpdate()):this.showDefaultUpdateToast()}applyUpdate(){this.registration&&this.registration.waiting?this.registration.waiting.postMessage({type:"SKIP_WAITING"}):window.location.reload()}async checkForUpdates(a=!1){if(!this.registration){a&&alert("El servicio de actualización no está activo en este navegador.");return}let r=null;a&&(r=document.createElement("div"),r.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse",r.innerHTML="<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>",document.body.appendChild(r));try{await this.registration.update();const o=await fetch(`./version.json?t=${Date.now()}`,{cache:"no-store"});if(o.ok){const s=await o.json();console.log("[PWA] Versión desplegada en servidor:",s)}if(a)if(await new Promise(s=>setTimeout(s,900)),r==null||r.remove(),this.updateWaiting)this.showDefaultUpdateToast();else{const s=document.createElement("div");s.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2",s.innerHTML="<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>",document.body.appendChild(s),setTimeout(()=>s.remove(),3500)}}catch{r==null||r.remove(),a&&alert("No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.")}}async forceHardReset(){try{const a=await navigator.serviceWorker.getRegistrations();for(const o of a)await o.unregister();const r=await caches.keys();for(const o of r)await caches.delete(o)}catch(a){console.warn("[PWA] Error en hard reset:",a)}window.location.reload()}showDefaultUpdateToast(){var r,o;if(document.getElementById("pwa-update-toast"))return;const a=document.createElement("div");a.id="pwa-update-toast",a.className="fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md",a.innerHTML=`
      <div class="flex items-center gap-3">
        <span class="text-2xl p-2 rounded-2xl bg-brand-50 border border-brand-100 flex-shrink-0">🚀</span>
        <div>
          <h4 class="font-bold text-xs text-slate-900 leading-tight">¡Nueva versión disponible!</h4>
          <p class="text-[11px] text-slate-500 mt-0.5">Se han desplegado mejoras en Anaxagoras AI.</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button id="btn-pwa-apply" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all whitespace-nowrap">
          Actualizar
        </button>
        <button id="btn-pwa-dismiss" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Descartar">
          ✕
        </button>
      </div>
    `,document.body.appendChild(a),(r=a.querySelector("#btn-pwa-apply"))==null||r.addEventListener("click",()=>{this.applyUpdate()}),(o=a.querySelector("#btn-pwa-dismiss"))==null||o.addEventListener("click",()=>{a.remove()})}}const An=new $s;var Ls=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Is(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var La={exports:{}},Os=La.exports,Ar;function js(){return Ar||(Ar=1,(function(c,a){((r,o)=>{c.exports=o()})(Os,function(){var r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(n,i){n.__proto__=i}:function(n,i){for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(n[l]=i[l])}))(e,t)},o=function(){return(o=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};function s(e,t,n){for(var i,l=0,d=t.length;l<d;l++)!i&&l in t||((i=i||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(i||Array.prototype.slice.call(t))}var u=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Ls,p=Object.keys,m=Array.isArray;function b(e,t){return typeof t=="object"&&p(t).forEach(function(n){e[n]=t[n]}),e}typeof Promise>"u"||u.Promise||(u.Promise=Promise);var h=Object.getPrototypeOf,w={}.hasOwnProperty;function T(e,t){return w.call(e,t)}function O(e,t){typeof t=="function"&&(t=t(h(e))),(typeof Reflect>"u"?p:Reflect.ownKeys)(t).forEach(function(n){v(e,n,t[n])})}var F=Object.defineProperty;function v(e,t,n,i){F(e,t,b(n&&T(n,"get")&&typeof n.get=="function"?{get:n.get,set:n.set,configurable:!0}:{value:n,configurable:!0,writable:!0},i))}function H(e){return{from:function(t){return e.prototype=Object.create(t.prototype),v(e.prototype,"constructor",e),{extend:O.bind(null,e.prototype)}}}}var z=Object.getOwnPropertyDescriptor,Y=[].slice;function J(e,t,n){return Y.call(e,t,n)}function fe(e,t){return t(e)}function L(e){if(!e)throw new Error("Assertion Failed")}function M(e){u.setImmediate?setImmediate(e):setTimeout(e,0)}function q(e,t){if(typeof t=="string"&&T(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var n=[],i=0,l=t.length;i<l;++i){var d=q(e,t[i]);n.push(d)}return n}var f,g=t.indexOf(".");return g===-1||(f=e[t.substr(0,g)])==null?void 0:q(f,t.substr(g+1))}function j(e,t,n){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){L(typeof n!="string"&&"length"in n);for(var i=0,l=t.length;i<l;++i)j(e,t[i],n[i])}else{var d=t.indexOf(".");if(d!==-1){var f=t.substr(0,d),d=t.substr(d+1);if(d==="")n===void 0?m(e)&&!isNaN(parseInt(f))?e.splice(f,1):delete e[f]:e[f]=n;else{var g=e[f];if(!g||!T(e,f)){if(n===void 0)return;g=e[f]={}}j(g,d,n)}}else n===void 0?m(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n}}function N(e){var t,n={};for(t in e)T(e,t)&&(n[t]=e[t]);return n}var B=[].concat;function te(e){return B.apply([],e)}var he="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(te([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return u[e]}),Ee=new Set(he.map(function(e){return u[e]})),Ce=null;function ce(e){return Ce=new WeakMap,e=(function t(n){if(!n||typeof n!="object")return n;var i=Ce.get(n);if(i)return i;if(m(n)){i=[],Ce.set(n,i);for(var l=0,d=n.length;l<d;++l)i.push(t(n[l]))}else if(Ee.has(n.constructor))i=n;else{var f,g=h(n);for(f in i=g===Object.prototype?{}:Object.create(g),Ce.set(n,i),n)T(n,f)&&(i[f]=t(n[f]))}return i})(e),Ce=null,e}var be={}.toString;function ne(e){return be.call(e).slice(8,-1)}var ve=typeof Symbol<"u"?Symbol.iterator:"@@iterator",pe=typeof ve=="symbol"?function(e){var t;return e!=null&&(t=e[ve])&&t.apply(e)}:function(){return null};function Pe(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var ae={};function re(e){var t,n,i,l;if(arguments.length===1){if(m(e))return e.slice();if(this===ae&&typeof e=="string")return[e];if(l=pe(e))for(n=[];!(i=l.next()).done;)n.push(i.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(n=new Array(t);t--;)n[t]=e[t]}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var ie=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},he=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],Ke=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(he),Re={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Be(e,t){this.name=e,this.message=t}function Ue(e,t){return e+". Errors: "+Object.keys(t).map(function(n){return t[n].toString()}).filter(function(n,i,l){return l.indexOf(n)===i}).join(`
`)}function na(e,t,n,i){this.failures=t,this.failedKeys=i,this.successCount=n,this.message=Ue(e,t)}function wt(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(n){return t[n]}),this.failuresByPos=t,this.message=Ue(e,this.failures)}H(Be).from(Error).extend({toString:function(){return this.name+": "+this.message}}),H(na).from(Be),H(wt).from(Be);var Ba=Ke.reduce(function(e,t){return e[t]=t+"Error",e},{}),Di=Be,se=Ke.reduce(function(e,t){var n=t+"Error";function i(l,d){this.name=n,l?typeof l=="string"?(this.message="".concat(l).concat(d?`
 `+d:""),this.inner=d||null):typeof l=="object"&&(this.message="".concat(l.name," ").concat(l.message),this.inner=l):(this.message=Re[t]||n,this.inner=null)}return H(i).from(Di),e[t]=i,e},{}),Tn=(se.Syntax=SyntaxError,se.Type=TypeError,se.Range=RangeError,he.reduce(function(e,t){return e[t+"Error"]=se[t],e},{}));he=Ke.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=se[t]),e},{});function Ae(){}function Mt(e){return e}function $i(e,t){return e==null||e===Mt?t:function(n){return t(e(n))}}function dt(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function Li(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments),i=(n!==void 0&&(arguments[0]=n),this.onsuccess),l=this.onerror,d=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return i&&(this.onsuccess=this.onsuccess?dt(i,this.onsuccess):i),l&&(this.onerror=this.onerror?dt(l,this.onerror):l),d!==void 0?d:n}}function Ii(e,t){return e===Ae?t:function(){e.apply(this,arguments);var n=this.onsuccess,i=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),n&&(this.onsuccess=this.onsuccess?dt(n,this.onsuccess):n),i&&(this.onerror=this.onerror?dt(i,this.onerror):i)}}function Oi(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments),i=(b(arguments[0],n),this.onsuccess),l=this.onerror,d=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return i&&(this.onsuccess=this.onsuccess?dt(i,this.onsuccess):i),l&&(this.onerror=this.onerror?dt(l,this.onerror):l),n===void 0?d===void 0?void 0:d:b(n,d)}}function ji(e,t){return e===Ae?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function qa(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments);if(n&&typeof n.then=="function"){for(var i=this,l=arguments.length,d=new Array(l);l--;)d[l]=arguments[l];return n.then(function(){return t.apply(i,d)})}return t.apply(this,arguments)}}he.ModifyError=na,he.DexieError=Be,he.BulkError=wt;var Qe=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Dn(e){Qe=e}var Rt={},$n=100,Bt=typeof Promise>"u"?[]:(Ke=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Bt=crypto.subtle.digest("SHA-512",new Uint8Array([0])),h(Bt),Ke]:[Ke,h(Ke),Ke]),Ke=Bt[0],Dt=Bt[1],Dt=Dt&&Dt.then,ut=Ke&&Ke.constructor,za=!!Bt[2],qt=function(e,t){zt.push([e,t]),ra&&(queueMicrotask(Ri),ra=!1)},Na=!0,ra=!0,pt=[],ia=[],Fa=Mt,Xe={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:Ae,pgp:!1,env:{},finalize:Ae},oe=Xe,zt=[],mt=0,oa=[];function Z(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=oe;if(typeof e!="function"){if(e!==Rt)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&Ga(this,this._value)}else this._state=null,this._value=null,++t.ref,(function n(i,l){try{l(function(d){if(i._state===null){if(d===i)throw new TypeError("A promise cannot be resolved with itself.");var f=i._lib&&Pt();d&&typeof d.then=="function"?n(i,function(g,_){d instanceof Z?d._then(g,_):d.then(g,_)}):(i._state=!0,i._value=d,In(i)),f&&At()}},Ga.bind(null,i))}catch(d){Ga(i,d)}})(this,e)}var Ka={get:function(){var e=oe,t=da;function n(i,l){var d=this,f=!e.global&&(e!==oe||t!==da),g=f&&!it(),_=new Z(function(D,P){Va(d,new Ln(jn(i,e,f,g),jn(l,e,f,g),D,P,e))});return this._consoleTask&&(_._consoleTask=this._consoleTask),_}return n.prototype=Rt,n},set:function(e){v(this,"then",e&&e.prototype===Rt?Ka:{get:function(){return e},set:Ka.set})}};function Ln(e,t,n,i,l){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=n,this.reject=i,this.psd=l}function Ga(e,t){var n,i;ia.push(t),e._state===null&&(n=e._lib&&Pt(),t=Fa(t),e._state=!1,e._value=t,i=e,pt.some(function(l){return l._value===i._value})||pt.push(i),In(e),n)&&At()}function In(e){var t=e._listeners;e._listeners=[];for(var n=0,i=t.length;n<i;++n)Va(e,t[n]);var l=e._PSD;--l.ref||l.finalize(),mt===0&&(++mt,qt(function(){--mt==0&&Ha()},[]))}function Va(e,t){if(e._state===null)e._listeners.push(t);else{var n=e._state?t.onFulfilled:t.onRejected;if(n===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++mt,qt(Mi,[n,e,t])}}function Mi(e,t,n){try{var i,l=t._value;!t._state&&ia.length&&(ia=[]),i=Qe&&t._consoleTask?t._consoleTask.run(function(){return e(l)}):e(l),t._state||ia.indexOf(l)!==-1||(d=>{for(var f=pt.length;f;)if(pt[--f]._value===d._value)return pt.splice(f,1)})(t),n.resolve(i)}catch(d){n.reject(d)}finally{--mt==0&&Ha(),--n.psd.ref||n.psd.finalize()}}function Ri(){ft(Xe,function(){Pt()&&At()})}function Pt(){var e=Na;return ra=Na=!1,e}function At(){var e,t,n;do for(;0<zt.length;)for(e=zt,zt=[],n=e.length,t=0;t<n;++t){var i=e[t];i[0].apply(null,i[1])}while(0<zt.length);ra=Na=!0}function Ha(){for(var e=pt,t=(pt=[],e.forEach(function(i){i._PSD.onunhandled.call(null,i._value,i)}),oa.slice(0)),n=t.length;n;)t[--n]()}function sa(e){return new Z(Rt,!1,e)}function ke(e,t){var n=oe;return function(){var i=Pt(),l=oe;try{return ot(n,!0),e.apply(this,arguments)}catch(d){t&&t(d)}finally{ot(l,!1),i&&At()}}}O(Z.prototype,{then:Ka,_then:function(e,t){Va(this,new Ln(null,null,e,t,oe))},catch:function(e){var t,n;return arguments.length===1?this.then(null,e):(t=e,n=arguments[1],typeof t=="function"?this.then(null,function(i){return(i instanceof t?n:sa)(i)}):this.then(null,function(i){return(i&&i.name===t?n:sa)(i)}))},finally:function(e){return this.then(function(t){return Z.resolve(e()).then(function(){return t})},function(t){return Z.resolve(e()).then(function(){return sa(t)})})},timeout:function(e,t){var n=this;return e<1/0?new Z(function(i,l){var d=setTimeout(function(){return l(new se.Timeout(t))},e);n.then(i,l).finally(clearTimeout.bind(null,d))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&v(Z.prototype,Symbol.toStringTag,"Dexie.Promise"),Xe.env=On(),O(Z,{all:function(){var e=re.apply(null,arguments).map(ua);return new Z(function(t,n){e.length===0&&t([]);var i=e.length;e.forEach(function(l,d){return Z.resolve(l).then(function(f){e[d]=f,--i||t(e)},n)})})},resolve:function(e){return e instanceof Z?e:e&&typeof e.then=="function"?new Z(function(t,n){e.then(t,n)}):new Z(Rt,!0,e)},reject:sa,race:function(){var e=re.apply(null,arguments).map(ua);return new Z(function(t,n){e.map(function(i){return Z.resolve(i).then(t,n)})})},PSD:{get:function(){return oe},set:function(e){return oe=e}},totalEchoes:{get:function(){return da}},newPSD:rt,usePSD:ft,scheduler:{get:function(){return qt},set:function(e){qt=e}},rejectionMapper:{get:function(){return Fa},set:function(e){Fa=e}},follow:function(e,t){return new Z(function(n,i){return rt(function(l,d){var f=oe;f.unhandleds=[],f.onunhandled=d,f.finalize=dt(function(){var g,_=this;g=function(){_.unhandleds.length===0?l():d(_.unhandleds[0])},oa.push(function D(){g(),oa.splice(oa.indexOf(D),1)}),++mt,qt(function(){--mt==0&&Ha()},[])},f.finalize),e()},t,n,i)})}}),ut&&(ut.allSettled&&v(Z,"allSettled",function(){var e=re.apply(null,arguments).map(ua);return new Z(function(t){e.length===0&&t([]);var n=e.length,i=new Array(n);e.forEach(function(l,d){return Z.resolve(l).then(function(f){return i[d]={status:"fulfilled",value:f}},function(f){return i[d]={status:"rejected",reason:f}}).then(function(){return--n||t(i)})})})}),ut.any&&typeof AggregateError<"u"&&v(Z,"any",function(){var e=re.apply(null,arguments).map(ua);return new Z(function(t,n){e.length===0&&n(new AggregateError([]));var i=e.length,l=new Array(i);e.forEach(function(d,f){return Z.resolve(d).then(function(g){return t(g)},function(g){l[f]=g,--i||n(new AggregateError(l))})})})}),ut.withResolvers)&&(Z.withResolvers=ut.withResolvers);var Le={awaits:0,echoes:0,id:0},Bi=0,la=[],ca=0,da=0,qi=0;function rt(e,f,n,i){var l=oe,d=Object.create(l),f=(d.parent=l,d.ref=0,d.global=!1,d.id=++qi,Xe.env,d.env=za?{Promise:Z,PromiseProp:{value:Z,configurable:!0,writable:!0},all:Z.all,race:Z.race,allSettled:Z.allSettled,any:Z.any,resolve:Z.resolve,reject:Z.reject}:{},f&&b(d,f),++l.ref,d.finalize=function(){--this.parent.ref||this.parent.finalize()},ft(d,e,n,i));return d.ref===0&&d.finalize(),f}function Et(){return Le.id||(Le.id=++Bi),++Le.awaits,Le.echoes+=$n,Le.id}function it(){return!!Le.awaits&&(--Le.awaits==0&&(Le.id=0),Le.echoes=Le.awaits*$n,!0)}function ua(e){return Le.echoes&&e&&e.constructor===ut?(Et(),e.then(function(t){return it(),t},function(t){return it(),Te(t)})):e}function zi(){var e=la[la.length-1];la.pop(),ot(e,!1)}function ot(e,t){var n,i,l=oe;(t?!Le.echoes||ca++&&e===oe:!ca||--ca&&e===oe)||queueMicrotask(t?(function(d){++da,Le.echoes&&--Le.echoes!=0||(Le.echoes=Le.awaits=Le.id=0),la.push(oe),ot(d,!0)}).bind(null,e):zi),e!==oe&&(oe=e,l===Xe&&(Xe.env=On()),za)&&(n=Xe.env.Promise,i=e.env,l.global||e.global)&&(Object.defineProperty(u,"Promise",i.PromiseProp),n.all=i.all,n.race=i.race,n.resolve=i.resolve,n.reject=i.reject,i.allSettled&&(n.allSettled=i.allSettled),i.any)&&(n.any=i.any)}function On(){var e=u.Promise;return za?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(u,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function ft(e,t,n,i,l){var d=oe;try{return ot(e,!0),t(n,i,l)}finally{ot(d,!1)}}function jn(e,t,n,i){return typeof e!="function"?e:function(){var l=oe;n&&Et(),ot(t,!0);try{return e.apply(this,arguments)}finally{ot(l,!1),i&&queueMicrotask(it)}}}function Ua(e){Promise===ut&&Le.echoes===0?ca===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+Dt).indexOf("[native code]")===-1&&(Et=it=Ae);var Te=Z.reject,gt="￿",et="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",Mn="String expected.",pa="__dbnames",Wa="readonly",Qa="readwrite";function bt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var Rn={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function ma(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=ce(t))[e],t}}function Bn(){throw se.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function xe(e,t){try{var n=qn(e),i=qn(t);if(n!==i)return n==="Array"?1:i==="Array"?-1:n==="binary"?1:i==="binary"?-1:n==="string"?1:i==="string"?-1:n==="Date"?1:i!=="Date"?NaN:-1;switch(n){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var l=zn(e),d=zn(t),f=l.length,g=d.length,_=f<g?f:g,D=0;D<_;++D)if(l[D]!==d[D])return l[D]<d[D]?-1:1;return f===g?0:f<g?-1:1;case"Array":for(var P=e,x=t,C=P.length,k=x.length,E=C<k?C:k,A=0;A<E;++A){var S=xe(P[A],x[A]);if(S!==0)return S}return C===k?0:C<k?-1:1}}catch{}return NaN}function qn(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=ne(e))==="ArrayBuffer")?"binary":t}function zn(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function fa(e,t,n){var i=e.schema.yProps;return i?(t&&0<n.numFailures&&(t=t.filter(function(l,d){return!n.failures[d]})),Promise.all(i.map(function(l){return l=l.updatesTable,t?e.db.table(l).where("k").anyOf(t).delete():e.db.table(l).clear()})).then(function(){return n})):n}Nn.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var n=t.add;if(m(n))return s(s([],m(e)?e:[],!0),n).sort();if(typeof n=="number")return(Number(e)||0)+n;if(typeof n=="bigint")try{return BigInt(e)+n}catch{return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(t.remove!==void 0){var i=t.remove;if(m(i))return m(e)?e.filter(function(l){return!i.includes(l)}).sort():[];if(typeof i=="number")return Number(e)-i;if(typeof i=="bigint")try{return BigInt(e)-i}catch{return BigInt(0)-i}throw new TypeError("Invalid subtrahend ".concat(i))}return n=(n=t.replacePrefix)==null?void 0:n[0],n&&typeof e=="string"&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var Nt=Nn;function Nn(e){this["@@propmod"]=e}function Fn(e,t){for(var n=p(t),i=n.length,l=!1,d=0;d<i;++d){var f=n[d],g=t[f],_=q(e,f);g instanceof Nt?(j(e,f,g.execute(_)),l=!0):_!==g&&(j(e,f,g),l=!0)}return l}Se.prototype._trans=function(e,t,n){var i=this._tx||oe.trans,l=this.name,d=Qe&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function f(D,P,x){if(x.schema[l])return t(x.idbtrans,x);throw new se.NotFound("Table "+l+" not part of transaction")}var g=Pt();try{var _=i&&i.db._novip===this.db._novip?i===oe.trans?i._promise(e,f,n):rt(function(){return i._promise(e,f,n)},{trans:i,transless:oe.transless||oe}):(function D(P,x,C,k){if(P.idbdb&&(P._state.openComplete||oe.letThrough||P._vip)){var E=P._createTransaction(x,C,P._dbSchema);try{E.create(),P._state.PR1398_maxLoop=3}catch(A){return A.name===Ba.InvalidState&&P.isOpen()&&0<--P._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),P.close({disableAutoOpen:!1}),P.open().then(function(){return D(P,x,C,k)})):Te(A)}return E._promise(x,function(A,S){return rt(function(){return oe.trans=E,k(A,S,E)})}).then(function(A){if(x==="readwrite")try{E.idbtrans.commit()}catch{}return x==="readonly"?A:E._completion.then(function(){return A})})}if(P._state.openComplete)return Te(new se.DatabaseClosed(P._state.dbOpenError));if(!P._state.isBeingOpened){if(!P._state.autoOpen)return Te(new se.DatabaseClosed);P.open().catch(Ae)}return P._state.dbReadyPromise.then(function(){return D(P,x,C,k)})})(this.db,e,[this.name],f);return d&&(_._consoleTask=d,_=_.catch(function(D){return console.trace(D),Te(D)})),_}finally{g&&At()}},Se.prototype.get=function(e,t){var n=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?Te(new se.Type("Invalid argument to Table.get()")):this._trans("readonly",function(i){return n.core.get({trans:i,key:e}).then(function(l){return n.hook.reading.fire(l)})}).then(t)},Se.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(m(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=p(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var n=this.schema.indexes.concat(this.schema.primKey).filter(function(g){if(g.compound&&t.every(function(D){return 0<=g.keyPath.indexOf(D)})){for(var _=0;_<t.length;++_)if(t.indexOf(g.keyPath[_])===-1)return!1;return!0}return!1}).sort(function(g,_){return g.keyPath.length-_.keyPath.length})[0];if(n&&this.db._maxKey!==gt)return f=n.keyPath.slice(0,t.length),this.where(f).equals(f.map(function(g){return e[g]}));!n&&Qe&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var i=this.schema.idxByName;function l(g,_){return xe(g,_)===0}var f=t.reduce(function(P,_){var D=P[0],P=P[1],x=i[_],C=e[_];return[D||x,D||!x?bt(P,x&&x.multi?function(k){return k=q(k,_),m(k)&&k.some(function(E){return l(C,E)})}:function(k){return l(C,q(k,_))}):P]},[null,null]),d=f[0],f=f[1];return d?this.where(d.name).equals(e[d.keyPath]).filter(f):n?this.filter(f):this.where(t).equals("")},Se.prototype.filter=function(e){return this.toCollection().and(e)},Se.prototype.count=function(e){return this.toCollection().count(e)},Se.prototype.offset=function(e){return this.toCollection().offset(e)},Se.prototype.limit=function(e){return this.toCollection().limit(e)},Se.prototype.each=function(e){return this.toCollection().each(e)},Se.prototype.toArray=function(e){return this.toCollection().toArray(e)},Se.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},Se.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,m(e)?"[".concat(e.join("+"),"]"):e))},Se.prototype.reverse=function(){return this.toCollection().reverse()},Se.prototype.mapToClass=function(e){for(var t=this.db,n=this.name,i=((this.schema.mappedClass=e).prototype instanceof Bn&&(e=(f=>{var g=P,_=f;if(typeof _!="function"&&_!==null)throw new TypeError("Class extends value "+String(_)+" is not a constructor or null");function D(){this.constructor=g}function P(){return f!==null&&f.apply(this,arguments)||this}return r(g,_),g.prototype=_===null?Object.create(_):(D.prototype=_.prototype,new D),Object.defineProperty(P.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),P.prototype.table=function(){return n},P})(e)),new Set),l=e.prototype;l;l=h(l))Object.getOwnPropertyNames(l).forEach(function(f){return i.add(f)});function d(f){if(!f)return f;var g,_=Object.create(e.prototype);for(g in f)if(!i.has(g))try{_[g]=f[g]}catch{}return _}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=d,this.hook("reading",d),e},Se.prototype.defineClass=function(){return this.mapToClass(function(e){b(this,e)})},Se.prototype.add=function(e,t){var n=this,i=this.schema.primKey,l=i.auto,d=i.keyPath,f=e;return d&&l&&(f=ma(d)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"add",keys:t!=null?[t]:null,values:[f]})}).then(function(g){return g.numFailures?Z.reject(g.failures[0]):g.lastResult}).then(function(g){if(d)try{j(e,d,g)}catch{}return g})},Se.prototype.upsert=function(e,t){var n=this,i=this.schema.primKey.keyPath;return this._trans("readwrite",function(l){return n.core.get({trans:l,key:e}).then(function(d){var f=d??{};return Fn(f,t),i&&j(f,i,e),n.core.mutate({trans:l,type:"put",values:[f],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(g){return g.numFailures?Z.reject(g.failures[0]):!!d})})})},Se.prototype.update=function(e,t){return typeof e!="object"||m(e)?this.where(":id").equals(e).modify(t):(e=q(e,this.schema.primKey.keyPath))===void 0?Te(new se.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},Se.prototype.put=function(e,t){var n=this,i=this.schema.primKey,l=i.auto,d=i.keyPath,f=e;return d&&l&&(f=ma(d)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"put",values:[f],keys:t!=null?[t]:null})}).then(function(g){return g.numFailures?Z.reject(g.failures[0]):g.lastResult}).then(function(g){if(d)try{j(e,d,g)}catch{}return g})},Se.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(n){return t.core.mutate({trans:n,type:"delete",keys:[e]}).then(function(i){return fa(t,[e],i)}).then(function(i){return i.numFailures?Z.reject(i.failures[0]):void 0})})},Se.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:Rn}).then(function(n){return fa(e,null,n)})}).then(function(t){return t.numFailures?Z.reject(t.failures[0]):void 0})},Se.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(n){return t.core.getMany({keys:e,trans:n}).then(function(i){return i.map(function(l){return t.hook.reading.fire(l)})})})},Se.prototype.bulkAdd=function(e,t,n){var i=this,l=Array.isArray(t)?t:void 0,d=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(f){var g=i.schema.primKey,D=g.auto,g=g.keyPath;if(g&&l)throw new se.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new se.InvalidArgument("Arguments objects and keys must have the same length");var _=e.length,D=g&&D?e.map(ma(g)):e;return i.core.mutate({trans:f,type:"add",keys:l,values:D,wantResults:d}).then(function(P){var x=P.numFailures,C=P.failures;if(x===0)return d?P.results:P.lastResult;throw new wt("".concat(i.name,".bulkAdd(): ").concat(x," of ").concat(_," operations failed"),C)})})},Se.prototype.bulkPut=function(e,t,n){var i=this,l=Array.isArray(t)?t:void 0,d=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(f){var g=i.schema.primKey,D=g.auto,g=g.keyPath;if(g&&l)throw new se.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new se.InvalidArgument("Arguments objects and keys must have the same length");var _=e.length,D=g&&D?e.map(ma(g)):e;return i.core.mutate({trans:f,type:"put",keys:l,values:D,wantResults:d}).then(function(P){var x=P.numFailures,C=P.failures;if(x===0)return d?P.results:P.lastResult;throw new wt("".concat(i.name,".bulkPut(): ").concat(x," of ").concat(_," operations failed"),C)})})},Se.prototype.bulkUpdate=function(e){var t=this,n=this.core,i=e.map(function(f){return f.key}),l=e.map(function(f){return f.changes}),d=[];return this._trans("readwrite",function(f){return n.getMany({trans:f,keys:i,cache:"clone"}).then(function(g){var _=[],D=[],P=(e.forEach(function(x,C){var k=x.key,E=x.changes,A=g[C];if(A){for(var S=0,I=Object.keys(E);S<I.length;S++){var $=I[S],R=E[$];if($===t.schema.primKey.keyPath){if(xe(R,k)!==0)throw new se.Constraint("Cannot update primary key in bulkUpdate()")}else j(A,$,R)}d.push(C),_.push(k),D.push(A)}}),_.length);return n.mutate({trans:f,type:"put",keys:_,values:D,updates:{keys:i,changeSpecs:l}}).then(function(x){var C=x.numFailures,k=x.failures;if(C===0)return P;for(var E=0,A=Object.keys(k);E<A.length;E++){var S,I=A[E],$=d[Number(I)];$!=null&&(S=k[I],delete k[I],k[$]=S)}throw new wt("".concat(t.name,".bulkUpdate(): ").concat(C," of ").concat(P," operations failed"),k)})})})},Se.prototype.bulkDelete=function(e){var t=this,n=e.length;return this._trans("readwrite",function(i){return t.core.mutate({trans:i,type:"delete",keys:e}).then(function(l){return fa(t,e,l)})}).then(function(i){var l=i.numFailures,d=i.failures;if(l===0)return i.lastResult;throw new wt("".concat(t.name,".bulkDelete(): ").concat(l," of ").concat(n," operations failed"),d)})};var Kn=Se;function Se(){}function Ft(e){function t(f,g){if(g){for(var _=arguments.length,D=new Array(_-1);--_;)D[_-1]=arguments[_];return n[f].subscribe.apply(null,D),e}if(typeof f=="string")return n[f]}var n={};t.addEventType=d;for(var i=1,l=arguments.length;i<l;++i)d(arguments[i]);return t;function d(f,g,_){var D,P;if(typeof f!="object")return g=g||ji,P={subscribers:[],fire:_=_||Ae,subscribe:function(x){P.subscribers.indexOf(x)===-1&&(P.subscribers.push(x),P.fire=g(P.fire,x))},unsubscribe:function(x){P.subscribers=P.subscribers.filter(function(C){return C!==x}),P.fire=P.subscribers.reduce(g,_)}},n[f]=t[f]=P;p(D=f).forEach(function(x){var C=D[x];if(m(C))d(x,D[x][0],D[x][1]);else{if(C!=="asap")throw new se.InvalidArgument("Invalid event config");var k=d(x,Mt,function(){for(var E=arguments.length,A=new Array(E);E--;)A[E]=arguments[E];k.subscribers.forEach(function(S){M(function(){S.apply(null,A)})})})}})}}function Kt(e,t){return H(t).from({prototype:e}),t}function St(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Ya(e,t){e.filter=bt(e.filter,t)}function Ja(e,t,n){var i=e.replayFilter;e.replayFilter=i?function(){return bt(i(),t())}:t,e.justLimit=n&&!i}function ga(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new se.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function Gn(e,t,n){var i=ga(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:i,range:e.range}})}function ba(e,t,n,i){var l,d,f=e.replayFilter?bt(e.filter,e.replayFilter()):e.filter;return e.or?(l={},d=function(g,_,D){var P,x;f&&!f(_,D,function(C){return _.stop(C)},function(C){return _.fail(C)})||((x=""+(P=_.primaryKey))=="[object ArrayBuffer]"&&(x=""+new Uint8Array(P)),T(l,x))||(l[x]=!0,t(g,_,D))},Promise.all([e.or._iterate(d,n),Vn(Gn(e,i,n),e.algorithm,d,!e.keysOnly&&e.valueMapper)])):Vn(Gn(e,i,n),bt(e.algorithm,f),t,!e.keysOnly&&e.valueMapper)}function Vn(e,t,n,i){var l=ke(i?function(d,f,g){return n(i(d),f,g)}:n);return e.then(function(d){if(d)return d.start(function(){var f=function(){return d.continue()};t&&!t(d,function(g){return f=g},function(g){d.stop(g),f=Ae},function(g){d.fail(g),f=Ae})||l(d.value,d,function(g){return f=g}),f()})})}we.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,Te.bind(null,n.error)):n.table._trans("readonly",e).then(t)},we.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,Te.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},we.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=bt(t.algorithm,e)},we.prototype._iterate=function(e,t){return ba(this._ctx,e,t,this._ctx.table.core)},we.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&b(n,e),t._ctx=n,t},we.prototype.raw=function(){return this._ctx.valueMapper=null,this},we.prototype.each=function(e){var t=this._ctx;return this._read(function(n){return ba(t,e,n,t.table.core)})},we.prototype.count=function(e){var t=this;return this._read(function(n){var i,l=t._ctx,d=l.table.core;return St(l,!0)?d.count({trans:n,query:{index:ga(l,d.schema),range:l.range}}).then(function(f){return Math.min(f,l.limit)}):(i=0,ba(l,function(){return++i,!1},n,d).then(function(){return i}))}).then(e)},we.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),i=n[0],l=n.length-1;function d(_,D){return D?d(_[n[D]],D-1):_[i]}var f=this._ctx.dir==="next"?1:-1;function g(_,D){return xe(d(_,l),d(D,l))*f}return this.toArray(function(_){return _.slice().sort(g)}).then(t)},we.prototype.toArray=function(e){var t=this;return this._read(function(n){var i,l,d,f=t._ctx;return St(f,!0)&&0<f.limit?(i=f.valueMapper,l=ga(f,f.table.core.schema),f.table.core.query({trans:n,limit:f.limit,values:!0,direction:f.dir==="prev"?"prev":void 0,query:{index:l,range:f.range}}).then(function(g){return g=g.result,i?g.map(i):g})):(d=[],ba(f,function(g){return d.push(g)},n,f.table.core).then(function(){return d}))},e)},we.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,St(t)?Ja(t,function(){var n=e;return function(i,l){return n===0||(n===1?--n:l(function(){i.advance(n),n=0}),!1)}}):Ja(t,function(){var n=e;return function(){return--n<0}})),this},we.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Ja(this._ctx,function(){var t=e;return function(n,i,l){return--t<=0&&i(l),0<=t}},!0),this},we.prototype.until=function(e,t){return Ya(this._ctx,function(n,i,l){return!e(n.value)||(i(l),t)}),this},we.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},we.prototype.last=function(e){return this.reverse().first(e)},we.prototype.filter=function(e){var t;return Ya(this._ctx,function(n){return e(n.value)}),(t=this._ctx).isMatch=bt(t.isMatch,e),this},we.prototype.and=function(e){return this.filter(e)},we.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},we.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},we.prototype.desc=function(){return this.reverse()},we.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,i){e(i.key,i)})},we.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},we.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,i){e(i.primaryKey,i)})},we.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(i,l){n.push(l.key)}).then(function(){return n}).then(e)},we.prototype.primaryKeys=function(e){var t=this._ctx;if(St(t,!0)&&0<t.limit)return this._read(function(i){var l=ga(t,t.table.core.schema);return t.table.core.query({trans:i,values:!1,limit:t.limit,direction:t.dir==="prev"?"prev":void 0,query:{index:l,range:t.range}})}).then(function(i){return i.result}).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(i,l){n.push(l.primaryKey)}).then(function(){return n}).then(e)},we.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},we.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},we.prototype.lastKey=function(e){return this.reverse().firstKey(e)},we.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Ya(this._ctx,function(i){var i=i.primaryKey.toString(),l=T(e,i);return e[i]=!0,!l})),this},we.prototype.modify=function(e){var t=this,n=this._ctx;return this._write(function(i){function l(A,S){var I=S.failures;C+=A-S.numFailures;for(var $=0,R=p(I);$<R.length;$++){var K=R[$];x.push(I[K])}}var d=typeof e=="function"?e:function(A){return Fn(A,e)},f=n.table.core,P=f.schema.primaryKey,g=P.outbound,_=P.extractKey,D=200,P=t.db._options.modifyChunkSize,x=(P&&(D=typeof P=="object"?P[f.name]||P["*"]||200:P),[]),C=0,k=[],E=e===Hn;return t.clone().primaryKeys().then(function(A){function S($){var R=Math.min(D,A.length-$),K=A.slice($,$+R);return(E?Promise.resolve([]):f.getMany({trans:i,keys:K,cache:"immutable"})).then(function(V){var Q=[],U=[],X=g?[]:null,W=E?K:[];if(!E)for(var ee=0;ee<R;++ee){var G=V[ee],de={value:ce(G),primKey:A[$+ee]};d.call(de,de.value,de)!==!1&&(de.value==null?W.push(A[$+ee]):g||xe(_(G),_(de.value))===0?(U.push(de.value),g&&X.push(A[$+ee])):(W.push(A[$+ee]),Q.push(de.value)))}return Promise.resolve(0<Q.length&&f.mutate({trans:i,type:"add",values:Q}).then(function(ue){for(var ge in ue.failures)W.splice(parseInt(ge),1);l(Q.length,ue)})).then(function(){return(0<U.length||I&&typeof e=="object")&&f.mutate({trans:i,type:"put",keys:X,values:U,criteria:I,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<$}).then(function(ue){return l(U.length,ue)})}).then(function(){return(0<W.length||I&&E)&&f.mutate({trans:i,type:"delete",keys:W,criteria:I,isAdditionalChunk:0<$}).then(function(ue){return fa(n.table,W,ue)}).then(function(ue){return l(W.length,ue)})}).then(function(){return A.length>$+R&&S($+D)})})}var I=St(n)&&n.limit===1/0&&(typeof e!="function"||E)&&{index:n.index,range:n.range};return S(0).then(function(){if(0<x.length)throw new na("Error modifying one or more objects",x,C,k);return A.length})})})},we.prototype.delete=function(){var e=this._ctx,t=e.range;return!St(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(Hn):this._write(function(n){var i=e.table.core.schema.primaryKey,l=t;return e.table.core.count({trans:n,query:{index:i,range:l}}).then(function(d){return e.table.core.mutate({trans:n,type:"deleteRange",range:l}).then(function(_){var g=_.failures,_=_.numFailures;if(_)throw new na("Could not delete some values",Object.keys(g).map(function(D){return g[D]}),d-_);return d-_})})})};var Ni=we;function we(){}var Hn=function(e,t){return t.value=null};function Fi(e,t){return e<t?-1:e===t?0:1}function Ki(e,t){return t<e?-1:e===t?0:1}function Ge(e,t,n){return e=e instanceof Wn?new e.Collection(e):e,e._ctx.error=new(n||TypeError)(t),e}function kt(e){return new e.Collection(e,function(){return Un("")}).limit(0)}function ha(k,t,n,i){var l,d,f,g,_,D,P,x=n.length;if(!n.every(function(A){return typeof A=="string"}))return Ge(k,Mn);function C(A){l=A==="next"?function(I){return I.toUpperCase()}:function(I){return I.toLowerCase()},d=A==="next"?function(I){return I.toLowerCase()}:function(I){return I.toUpperCase()},f=A==="next"?Fi:Ki;var S=n.map(function(I){return{lower:d(I),upper:l(I)}}).sort(function(I,$){return f(I.lower,$.lower)});g=S.map(function(I){return I.upper}),_=S.map(function(I){return I.lower}),P=(D=A)==="next"?"":i}C("next");var k=new k.Collection(k,function(){return st(g[0],_[x-1]+i)}),E=(k._ondirectionchange=function(A){C(A)},0);return k._addAlgorithm(function(A,S,I){var $=A.key;if(typeof $=="string"){var R=d($);if(t(R,_,E))return!0;for(var K=null,V=E;V<x;++V){var Q=((U,X,W,ee,G,de)=>{for(var ue=Math.min(U.length,ee.length),ge=-1,ye=0;ye<ue;++ye){var Ve=X[ye];if(Ve!==ee[ye])return G(U[ye],W[ye])<0?U.substr(0,ye)+W[ye]+W.substr(ye+1):G(U[ye],ee[ye])<0?U.substr(0,ye)+ee[ye]+W.substr(ye+1):0<=ge?U.substr(0,ge)+X[ge]+W.substr(ge+1):null;G(U[ye],Ve)<0&&(ge=ye)}return ue<ee.length&&de==="next"?U+W.substr(U.length):ue<U.length&&de==="prev"?U.substr(0,W.length):ge<0?null:U.substr(0,ge)+ee[ge]+W.substr(ge+1)})($,R,g[V],_[V],f,D);Q===null&&K===null?E=V+1:(K===null||0<f(K,Q))&&(K=Q)}S(K!==null?function(){A.continue(K+P)}:I)}return!1}),k}function st(e,t,n,i){return{type:2,lower:e,upper:t,lowerOpen:n,upperOpen:i}}function Un(e){return{type:1,lower:e,upper:e}}Object.defineProperty(Ie.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Ie.prototype.between=function(e,t,n,i){n=n!==!1,i=i===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(n||i)&&(!n||!i)?kt(this):new this.Collection(this,function(){return st(e,t,!n,!i)})}catch{return Ge(this,et)}},Ie.prototype.equals=function(e){return e==null?Ge(this,et):new this.Collection(this,function(){return Un(e)})},Ie.prototype.above=function(e){return e==null?Ge(this,et):new this.Collection(this,function(){return st(e,void 0,!0)})},Ie.prototype.aboveOrEqual=function(e){return e==null?Ge(this,et):new this.Collection(this,function(){return st(e,void 0,!1)})},Ie.prototype.below=function(e){return e==null?Ge(this,et):new this.Collection(this,function(){return st(void 0,e,!1,!0)})},Ie.prototype.belowOrEqual=function(e){return e==null?Ge(this,et):new this.Collection(this,function(){return st(void 0,e)})},Ie.prototype.startsWith=function(e){return typeof e!="string"?Ge(this,Mn):this.between(e,e+gt,!0,!0)},Ie.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):ha(this,function(t,n){return t.indexOf(n[0])===0},[e],gt)},Ie.prototype.equalsIgnoreCase=function(e){return ha(this,function(t,n){return t===n[0]},[e],"")},Ie.prototype.anyOfIgnoreCase=function(){var e=re.apply(ae,arguments);return e.length===0?kt(this):ha(this,function(t,n){return n.indexOf(t)!==-1},e,"")},Ie.prototype.startsWithAnyOfIgnoreCase=function(){var e=re.apply(ae,arguments);return e.length===0?kt(this):ha(this,function(t,n){return n.some(function(i){return t.indexOf(i)===0})},e,gt)},Ie.prototype.anyOf=function(){var e,t,n=this,i=re.apply(ae,arguments),l=this._cmp;try{i.sort(l)}catch{return Ge(this,et)}return i.length===0?kt(this):((e=new this.Collection(this,function(){return st(i[0],i[i.length-1])}))._ondirectionchange=function(d){l=d==="next"?n._ascending:n._descending,i.sort(l)},t=0,e._addAlgorithm(function(d,f,g){for(var _=d.key;0<l(_,i[t]);)if(++t===i.length)return f(g),!1;return l(_,i[t])===0||(f(function(){d.continue(i[t])}),!1)}),e)},Ie.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Ie.prototype.noneOf=function(){var e=re.apply(ae,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return Ge(this,et)}var t=e.reduce(function(n,i){return n?n.concat([[n[n.length-1][1],i]]):[[-1/0,i]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},Ie.prototype.inAnyRange=function(e,I){var n=this,i=this._cmp,l=this._ascending,d=this._descending,f=this._min,g=this._max;if(e.length===0)return kt(this);if(!e.every(function($){return $[0]!==void 0&&$[1]!==void 0&&l($[0],$[1])<=0}))return Ge(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",se.InvalidArgument);var _=!I||I.includeLowers!==!1,D=I&&I.includeUppers===!0,P,x=l;function C($,R){return x($[0],R[0])}try{(P=e.reduce(function($,R){for(var K=0,V=$.length;K<V;++K){var Q=$[K];if(i(R[0],Q[1])<0&&0<i(R[1],Q[0])){Q[0]=f(Q[0],R[0]),Q[1]=g(Q[1],R[1]);break}}return K===V&&$.push(R),$},[])).sort(C)}catch{return Ge(this,et)}var k=0,E=D?function($){return 0<l($,P[k][1])}:function($){return 0<=l($,P[k][1])},A=_?function($){return 0<d($,P[k][0])}:function($){return 0<=d($,P[k][0])},S=E,I=new this.Collection(this,function(){return st(P[0][0],P[P.length-1][1],!_,!D)});return I._ondirectionchange=function($){x=$==="next"?(S=E,l):(S=A,d),P.sort(C)},I._addAlgorithm(function($,R,K){for(var V,Q=$.key;S(Q);)if(++k===P.length)return R(K),!1;return!E(V=Q)&&!A(V)||(n._cmp(Q,P[k][1])===0||n._cmp(Q,P[k][0])===0||R(function(){x===l?$.continue(P[k][0]):$.continue(P[k][1])}),!1)}),I},Ie.prototype.startsWithAnyOf=function(){var e=re.apply(ae,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?kt(this):this.inAnyRange(e.map(function(t){return[t,t+gt]})):Ge(this,"startsWithAnyOf() only works with strings")};var Wn=Ie;function Ie(){}function We(e){return ke(function(t){return Gt(t),e(t.target.error),!1})}function Gt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var va="storagemutated",Za="x-storagemutated-1",lt=Ft(null,va),Gi=(Ye.prototype._lock=function(){return L(!oe.global),++this._reculock,this._reculock!==1||oe.global||(oe.lockOwnerFor=this),this},Ye.prototype._unlock=function(){if(L(!oe.global),--this._reculock==0)for(oe.global||(oe.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{ft(e[1],e[0])}catch{}}return this},Ye.prototype._locked=function(){return this._reculock&&oe.lockOwnerFor!==this},Ye.prototype.create=function(e){var t=this;if(this.mode){var n=this.db.idbdb,i=this.db._state.dbOpenError;if(L(!this.idbtrans),!e&&!n)switch(i&&i.name){case"DatabaseClosedError":throw new se.DatabaseClosed(i);case"MissingAPIError":throw new se.MissingAPI(i.message,i);default:throw new se.OpenFailed(i)}if(!this.active)throw new se.TransactionInactive;L(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||n).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=ke(function(l){Gt(l),t._reject(e.error)}),e.onabort=ke(function(l){Gt(l),t.active&&t._reject(new se.Abort(e.error)),t.active=!1,t.on("abort").fire(l)}),e.oncomplete=ke(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&lt.storagemutated.fire(e.mutatedParts)})}return this},Ye.prototype._promise=function(e,t,n){var i,l=this;return e==="readwrite"&&this.mode!=="readwrite"?Te(new se.ReadOnly("Transaction is readonly")):this.active?this._locked()?new Z(function(d,f){l._blockedFuncs.push([function(){l._promise(e,t,n).then(d,f)},oe])}):n?rt(function(){var d=new Z(function(f,g){l._lock();var _=t(f,g,l);_&&_.then&&_.then(f,g)});return d.finally(function(){return l._unlock()}),d._lib=!0,d}):((i=new Z(function(d,f){var g=t(d,f,l);g&&g.then&&g.then(d,f)}))._lib=!0,i):Te(new se.TransactionInactive)},Ye.prototype._root=function(){return this.parent?this.parent._root():this},Ye.prototype.waitFor=function(e){var t,n=this._root(),i=Z.resolve(e),l=(n._waitingFor?n._waitingFor=n._waitingFor.then(function(){return i}):(n._waitingFor=i,n._waitingQueue=[],t=n.idbtrans.objectStore(n.storeNames[0]),(function d(){for(++n._spinCount;n._waitingQueue.length;)n._waitingQueue.shift()();n._waitingFor&&(t.get(-1/0).onsuccess=d)})()),n._waitingFor);return new Z(function(d,f){i.then(function(g){return n._waitingQueue.push(ke(d.bind(null,g)))},function(g){return n._waitingQueue.push(ke(f.bind(null,g)))}).finally(function(){n._waitingFor===l&&(n._waitingFor=null)})})},Ye.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new se.Abort))},Ye.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(T(t,e))return t[e];var n=this.schema[e];if(n)return(n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new se.NotFound("Table "+e+" not part of transaction")},Ye);function Ye(){}function Xa(e,t,n,i,l,d,f,g){return{name:e,keyPath:t,unique:n,multi:i,auto:l,compound:d,src:(n&&!f?"&":"")+(i?"*":"")+(l?"++":"")+Qn(t),type:g}}function Qn(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function en(e,t,n){return{name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(i=function(l){return[l.name,l]},n.reduce(function(l,d,f){return d=i(d,f),d&&(l[d[0]]=d[1]),l},{}))};var i}var Vt=function(e){try{return e.only([[]]),Vt=function(){return[[]]},[[]]}catch{return Vt=function(){return gt},gt}};function tn(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(n){return n[t]}:function(n){return q(n,t)}:function(n){return q(n,e)};var t}function Yn(e){return[].slice.call(e)}var Vi=0;function Ht(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function Hi(e,t,f){function i(S){if(S.type===3)return null;if(S.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var k=S.lower,E=S.upper,A=S.lowerOpen,S=S.upperOpen;return k===void 0?E===void 0?null:t.upperBound(E,!!S):E===void 0?t.lowerBound(k,!!A):t.bound(k,E,!!A,!!S)}function l(C){var k,E,A=C.name;return{name:A,schema:C,mutate:function(S){var I=S.trans,$=S.type,R=S.keys,K=S.values,V=S.range;return new Promise(function(Q,U){Q=ke(Q);var X=I.objectStore(A),W=X.keyPath==null,ee=$==="put"||$==="add";if(!ee&&$!=="delete"&&$!=="deleteRange")throw new Error("Invalid operation type: "+$);var G,de=(R||K||{length:1}).length;if(R&&K&&R.length!==K.length)throw new Error("Given keys array must have same length as given values array.");if(de===0)return Q({numFailures:0,failures:{},results:[],lastResult:void 0});function ue(Fe){++Ve,Gt(Fe)}var ge=[],ye=[],Ve=0;if($==="deleteRange"){if(V.type===4)return Q({numFailures:Ve,failures:ye,results:[],lastResult:void 0});V.type===3?ge.push(G=X.clear()):ge.push(G=X.delete(i(V)))}else{var W=ee?W?[K,R]:[K,null]:[R,null],me=W[0],ze=W[1];if(ee)for(var Ne=0;Ne<de;++Ne)ge.push(G=ze&&ze[Ne]!==void 0?X[$](me[Ne],ze[Ne]):X[$](me[Ne])),G.onerror=ue;else for(Ne=0;Ne<de;++Ne)ge.push(G=X[$](me[Ne])),G.onerror=ue}function Da(Fe){Fe=Fe.target.result,ge.forEach(function(yt,xn){return yt.error!=null&&(ye[xn]=yt.error)}),Q({numFailures:Ve,failures:ye,results:$==="delete"?R:ge.map(function(yt){return yt.result}),lastResult:Fe})}G.onerror=function(Fe){ue(Fe),Da(Fe)},G.onsuccess=Da})},getMany:function(S){var I=S.trans,$=S.keys;return new Promise(function(R,K){R=ke(R);for(var V,Q=I.objectStore(A),U=$.length,X=new Array(U),W=0,ee=0,G=function(ge){ge=ge.target,X[ge._pos]=ge.result,++ee===W&&R(X)},de=We(K),ue=0;ue<U;++ue)$[ue]!=null&&((V=Q.get($[ue]))._pos=ue,V.onsuccess=G,V.onerror=de,++W);W===0&&R(X)})},get:function(S){var I=S.trans,$=S.key;return new Promise(function(R,K){R=ke(R);var V=I.objectStore(A).get($);V.onsuccess=function(Q){return R(Q.target.result)},V.onerror=We(K)})},query:(k=_,E=D,function(S){return new Promise(function(I,$){I=ke(I);var R,K,V,Q,de=S.trans,U=S.values,X=S.limit,G=S.query,W=(W=S.direction)!=null?W:"next",ee=X===1/0?void 0:X,ue=G.index,G=G.range,de=de.objectStore(A),de=ue.isPrimaryKey?de:de.index(ue.name),ue=i(G);if(X===0)return I({result:[]});E?(G={query:ue,count:ee,direction:W},(R=U?de.getAll(G):de.getAllKeys(G)).onsuccess=function(ge){return I({result:ge.target.result})},R.onerror=We($)):k&&W==="next"?((R=U?de.getAll(ue,ee):de.getAllKeys(ue,ee)).onsuccess=function(ge){return I({result:ge.target.result})},R.onerror=We($)):(K=0,V=!U&&"openKeyCursor"in de?de.openKeyCursor(ue,W):de.openCursor(ue,W),Q=[],V.onsuccess=function(){var ge=V.result;return!ge||(Q.push(U?ge.value:ge.primaryKey),++K===X)?I({result:Q}):void ge.continue()},V.onerror=We($))})}),openCursor:function(S){var I=S.trans,$=S.values,R=S.query,K=S.reverse,V=S.unique;return new Promise(function(Q,U){Q=ke(Q);var ee=R.index,X=R.range,W=I.objectStore(A),W=ee.isPrimaryKey?W:W.index(ee.name),ee=K?V?"prevunique":"prev":V?"nextunique":"next",G=!$&&"openKeyCursor"in W?W.openKeyCursor(i(X),ee):W.openCursor(i(X),ee);G.onerror=We(U),G.onsuccess=ke(function(de){var ue,ge,ye,Ve,me=G.result;me?(me.___id=++Vi,me.done=!1,ue=me.continue.bind(me),ge=(ge=me.continuePrimaryKey)&&ge.bind(me),ye=me.advance.bind(me),Ve=function(){throw new Error("Cursor not stopped")},me.trans=I,me.stop=me.continue=me.continuePrimaryKey=me.advance=function(){throw new Error("Cursor not started")},me.fail=ke(U),me.next=function(){var ze=this,Ne=1;return this.start(function(){return Ne--?ze.continue():ze.stop()}).then(function(){return ze})},me.start=function(ze){function Ne(){if(G.result)try{ze()}catch(Fe){me.fail(Fe)}else me.done=!0,me.start=function(){throw new Error("Cursor behind last entry")},me.stop()}var Da=new Promise(function(Fe,yt){Fe=ke(Fe),G.onerror=We(yt),me.fail=yt,me.stop=function(xn){me.stop=me.continue=me.continuePrimaryKey=me.advance=Ve,Fe(xn)}});return G.onsuccess=ke(function(Fe){G.onsuccess=Ne,Ne()}),me.continue=ue,me.continuePrimaryKey=ge,me.advance=ye,Ne(),Da},Q(me)):Q(null)},U)})},count:function(S){var I=S.query,$=S.trans,R=I.index,K=I.range;return new Promise(function(V,Q){var U=$.objectStore(A),U=R.isPrimaryKey?U:U.index(R.name),X=i(K),X=X?U.count(X):U.count();X.onsuccess=ke(function(W){return V(W.target.result)}),X.onerror=We(Q)})}}}d=f,g=Yn((f=e).objectStoreNames),P=0<g.length?d.objectStore(g[0]):{};var d,f={schema:{name:f.name,tables:g.map(function(C){return d.objectStore(C)}).map(function(C){var k=C.keyPath,E=C.autoIncrement,S=m(k),A={},S={name:C.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:k==null,compound:S,keyPath:k,autoIncrement:E,unique:!0,extractKey:tn(k)},indexes:Yn(C.indexNames).map(function(I){return C.index(I)}).map(function(K){var V=K.name,$=K.unique,R=K.multiEntry,K=K.keyPath,V={name:V,compound:m(K),keyPath:K,unique:$,multiEntry:R,extractKey:tn(K)};return A[Ht(K)]=V}),getIndexByKeyPath:function(I){return A[Ht(I)]}};return A[":id"]=S.primaryKey,k!=null&&(A[Ht(k)]=S.primaryKey),S})},hasGetAll:0<g.length&&"getAll"in P&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in P},g=f.schema,_=f.hasGetAll,D=f.hasIdb3Features,P=g.tables.map(l),x={};return P.forEach(function(C){return x[C.name]=C}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(C){if(x[C])return x[C];throw new Error("Table '".concat(C,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Vt(t),schema:g}}function Ui(e,t,n,i){return n=n.IDBKeyRange,t=Hi(t,n,i),{dbcore:e.dbcore.reduce(function(l,d){return d=d.create,o(o({},l),d(l))},t)}}function ya(e,t){var n=t.db,n=Ui(e._middlewares,n,e._deps,t);e.core=n.dbcore,e.tables.forEach(function(i){var l=i.name;e.core.schema.tables.some(function(d){return d.name===l})&&(i.core=e.core.table(l),e[l]instanceof e.Table)&&(e[l].core=i.core)})}function xa(e,t,n,i){n.forEach(function(l){var d=i[l];t.forEach(function(f){var g=(function _(D,P){return z(D,P)||(D=h(D))&&_(D,P)})(f,l);(!g||"value"in g&&g.value===void 0)&&(f===e.Transaction.prototype||f instanceof e.Transaction?v(f,l,{get:function(){return this.table(l)},set:function(_){F(this,l,{value:_,writable:!0,configurable:!0,enumerable:!0})}}):f[l]=new e.Table(l,d))})})}function an(e,t){t.forEach(function(n){for(var i in n)n[i]instanceof e.Table&&delete n[i]})}function Wi(e,t){return e._cfg.version-t._cfg.version}function Qi(e,t,n,i){var l=e._dbSchema,d=(n.objectStoreNames.contains("$meta")&&!l.$meta&&(l.$meta=en("$meta",Zn("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,l)),f=(d.create(n),d._completion.catch(i),d._reject.bind(d)),g=oe.transless||oe;rt(function(){if(oe.trans=d,oe.transless=g,t!==0)return ya(e,n),D=t,((_=d).storeNames.includes("$meta")?_.table("$meta").get("version").then(function(P){return P??D}):Z.resolve(D)).then(function(S){var x=e,C=S,k=d,E=n,A=[],S=x._versions,I=x._dbSchema=Ca(0,x.idbdb,E);return(S=S.filter(function($){return $._cfg.version>=C})).length===0?Z.resolve():(S.forEach(function($){A.push(function(){var R,K,V,Q=I,U=$._cfg.dbschema,X=(wa(x,Q,E),wa(x,U,E),I=x._dbSchema=U,nn(Q,U)),W=(X.add.forEach(function(ee){rn(E,ee[0],ee[1].primKey,ee[1].indexes)}),X.change.forEach(function(ee){if(ee.recreate)throw new se.Upgrade("Not yet support for changing primary key");var G=E.objectStore(ee.name);ee.add.forEach(function(de){return _a(G,de)}),ee.change.forEach(function(de){G.deleteIndex(de.name),_a(G,de)}),ee.del.forEach(function(de){return G.deleteIndex(de)})}),$._cfg.contentUpgrade);if(W&&$._cfg.version>C)return ya(x,E),k._memoizedTables={},R=N(U),X.del.forEach(function(ee){R[ee]=Q[ee]}),an(x,[x.Transaction.prototype]),xa(x,[x.Transaction.prototype],p(R),R),k.schema=R,(K=ie(W))&&Et(),U=Z.follow(function(){var ee;(V=W(k))&&K&&(ee=it.bind(null,null),V.then(ee,ee))}),V&&typeof V.then=="function"?Z.resolve(V):U.then(function(){return V})}),A.push(function(R){var K,V,Q=$._cfg.dbschema;K=Q,V=R,[].slice.call(V.db.objectStoreNames).forEach(function(U){return K[U]==null&&V.db.deleteObjectStore(U)}),an(x,[x.Transaction.prototype]),xa(x,[x.Transaction.prototype],x._storeNames,x._dbSchema),k.schema=x._dbSchema}),A.push(function(R){x.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(x.idbdb.version/10)===$._cfg.version?(x.idbdb.deleteObjectStore("$meta"),delete x._dbSchema.$meta,x._storeNames=x._storeNames.filter(function(K){return K!=="$meta"})):R.objectStore("$meta").put($._cfg.version,"version"))})}),(function $(){return A.length?Z.resolve(A.shift()(k.idbtrans)).then($):Z.resolve()})().then(function(){Jn(I,E)}))}).catch(f);var _,D;p(l).forEach(function(P){rn(n,P,l[P].primKey,l[P].indexes)}),ya(e,n),Z.follow(function(){return e.on.populate.fire(d)}).catch(f)})}function Yi(e,t){Jn(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var n=Ca(0,e.idbdb,t);wa(e,e._dbSchema,t);for(var i=0,l=nn(n,e._dbSchema).change;i<l.length;i++){var d=(f=>{if(f.change.length||f.recreate)return console.warn("Unable to patch indexes of table ".concat(f.name," because it has changes on the type of index or primary key.")),{value:void 0};var g=t.objectStore(f.name);f.add.forEach(function(_){Qe&&console.debug("Dexie upgrade patch: Creating missing index ".concat(f.name,".").concat(_.src)),_a(g,_)})})(l[i]);if(typeof d=="object")return d.value}}function nn(e,t){var n,i={del:[],add:[],change:[]};for(n in e)t[n]||i.del.push(n);for(n in t){var l=e[n],d=t[n];if(l){var f={name:n,def:d,recreate:!1,del:[],add:[],change:[]};if(""+(l.primKey.keyPath||"")!=""+(d.primKey.keyPath||"")||l.primKey.auto!==d.primKey.auto)f.recreate=!0,i.change.push(f);else{var g=l.idxByName,_=d.idxByName,D=void 0;for(D in g)_[D]||f.del.push(D);for(D in _){var P=g[D],x=_[D];P?P.src!==x.src&&f.change.push(x):f.add.push(x)}(0<f.del.length||0<f.add.length||0<f.change.length)&&i.change.push(f)}}else i.add.push([n,d])}return i}function rn(e,t,n,i){var l=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});i.forEach(function(d){return _a(l,d)})}function Jn(e,t){p(e).forEach(function(n){t.db.objectStoreNames.contains(n)||(Qe&&console.debug("Dexie: Creating missing table",n),rn(t,n,e[n].primKey,e[n].indexes))})}function _a(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function Ca(e,t,n){var i={};return J(t.objectStoreNames,0).forEach(function(l){for(var d=n.objectStore(l),f=Xa(Qn(D=d.keyPath),D||"",!0,!1,!!d.autoIncrement,D&&typeof D!="string",!0),g=[],_=0;_<d.indexNames.length;++_){var P=d.index(d.indexNames[_]),D=P.keyPath,P=Xa(P.name,D,!!P.unique,!!P.multiEntry,!1,D&&typeof D!="string",!1);g.push(P)}i[l]=en(l,f,g)}),i}function wa(e,t,n){for(var i=n.db.objectStoreNames,l=0;l<i.length;++l){var d=i[l],f=n.objectStore(d);e._hasGetAll="getAll"in f;for(var g=0;g<f.indexNames.length;++g){var _,D=f.indexNames[g],P=f.index(D).keyPath,P=typeof P=="string"?P:"["+J(P).join("+")+"]";t[d]&&(_=t[d].idxByName[P])&&(_.name=D,delete t[d].idxByName[P],t[d].idxByName[D]=_)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&u.WorkerGlobalScope&&u instanceof u.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function Zn(e){return e.split(",").map(function(t,n){var l=t.split(":"),i=(i=l[1])==null?void 0:i.trim(),l=(t=l[0].trim()).replace(/([&*]|\+\+)/g,""),d=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Xa(l,d||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),m(d),n===0,i)})}Tt.prototype._createTableSchema=en,Tt.prototype._parseIndexSyntax=Zn,Tt.prototype._parseStoresSpec=function(e,t){var n=this;p(e).forEach(function(i){if(e[i]!==null){var l=n._parseIndexSyntax(e[i]),d=l.shift();if(!d)throw new se.Schema("Invalid schema for table "+i+": "+e[i]);if(d.unique=!0,d.multi)throw new se.Schema("Primary key cannot be multiEntry*");l.forEach(function(f){if(f.auto)throw new se.Schema("Only primary key can be marked as autoIncrement (++)");if(!f.keyPath)throw new se.Schema("Index must have a name and cannot be an empty string")}),d=n._createTableSchema(i,d,l),t[i]=d}})},Tt.prototype.stores=function(n){var t=this.db,n=(this._cfg.storesSource=this._cfg.storesSource?b(this._cfg.storesSource,n):n,t._versions),i={},l={};return n.forEach(function(d){b(i,d._cfg.storesSource),l=d._cfg.dbschema={},d._parseStoresSpec(i,l)}),t._dbSchema=l,an(t,[t._allTables,t,t.Transaction.prototype]),xa(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],p(l),l),t._storeNames=p(l),this},Tt.prototype.upgrade=function(e){return this._cfg.contentUpgrade=qa(this._cfg.contentUpgrade||Ae,e),this};var Ji=Tt;function Tt(){}var Ut=(()=>{var e,t,n;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(e=new Set,t=new FinalizationRegistry(function(i){e.delete(i)}),{toArray:function(){return Array.from(e).map(function(i){return i.deref()}).filter(function(i){return i!==void 0})},add:function(i){var l=new WeakRef(i._novip);e.add(l),t.register(i._novip,l,l),e.size>i._options.maxConnections&&(l=e.values().next().value,e.delete(l),t.unregister(l))},remove:function(i){if(i)for(var l=e.values(),d=l.next();!d.done;){var f=d.value;if(f.deref()===i._novip)return e.delete(f),void t.unregister(f);d=l.next()}}}):(n=[],{toArray:function(){return n},add:function(i){n.push(i._novip)},remove:function(i){i&&(i=n.indexOf(i._novip))!==-1&&n.splice(i,1)}})})();function on(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new tt(pa,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function sn(e){return e&&typeof e.databases=="function"}function ln(e){return rt(function(){return oe.letThrough=!0,e()})}function cn(e){return!("from"in e)}var qe=function(e,t){var n;if(!this)return n=new qe,e&&"d"in e&&b(n,e),n;b(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Wt(e,t,n){var i=xe(t,n);if(!isNaN(i)){if(0<i)throw RangeError();if(cn(e))return b(e,{from:t,to:n,d:1});var i=e.l,l=e.r;if(xe(n,e.from)<0)return i?Wt(i,t,n):e.l={from:t,to:n,d:1,l:null,r:null},er(e);if(0<xe(t,e.to))return l?Wt(l,t,n):e.r={from:t,to:n,d:1,l:null,r:null},er(e);xe(t,e.from)<0&&(e.from=t,e.l=null,e.d=l?l.d+1:1),0<xe(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,i&&!e.l&&Qt(e,i),l&&t&&Qt(e,l)}}function Qt(e,t){cn(t)||(function n(i,l){var d=l.from,f=l.l,g=l.r;Wt(i,d,l.to),f&&n(i,f),g&&n(i,g)})(e,t)}function Xn(e,t){var n=Pa(t),i=n.next();if(!i.done)for(var l=i.value,d=Pa(e),f=d.next(l.from),g=f.value;!i.done&&!f.done;){if(xe(g.from,l.to)<=0&&0<=xe(g.to,l.from))return!0;xe(l.from,g.from)<0?l=(i=n.next(g.from)).value:g=(f=d.next(l.from)).value}return!1}function Pa(e){var t=cn(e)?null:{s:0,n:e};return{next:function(n){for(var i=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,i)for(;t.n.l&&xe(n,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!i||xe(n,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function er(e){var t,n,i,l=(((l=e.r)==null?void 0:l.d)||0)-(((l=e.l)==null?void 0:l.d)||0),l=1<l?"r":l<-1?"l":"";l&&(t=l=="r"?"l":"r",n=o({},e),i=e[l],e.from=i.from,e.to=i.to,e[l]=i[l],n[l]=i[t],(e[t]=n).d=tr(n)),e.d=tr(e)}function tr(n){var t=n.r,n=n.l;return(t?n?Math.max(t.d,n.d):t.d:n?n.d:0)+1}function Aa(e,t){return p(t).forEach(function(n){e[n]?Qt(e[n],t[n]):e[n]=(function i(l){var d,f,g={};for(d in l)T(l,d)&&(f=l[d],g[d]=!f||typeof f!="object"||Ee.has(f.constructor)?f:i(f));return g})(t[n])}),e}function dn(e,t){return e.all||t.all||Object.keys(e).some(function(n){return t[n]&&Xn(t[n],e[n])})}O(qe.prototype,((Ke={add:function(e){return Qt(this,e),this},addKey:function(e){return Wt(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(n){return Wt(t,n,n)}),this},hasKey:function(e){var t=Pa(this).next(e).value;return t&&xe(t.from,e)<=0&&0<=xe(t.to,e)}})[ve]=function(){return Pa(this)},Ke));var ht={},un={},pn=!1;function Ea(e){Aa(un,e),pn||(pn=!0,setTimeout(function(){pn=!1,mn(un,!(un={}))},0))}function mn(e,t){t===void 0&&(t=!1);var n=new Set;if(e.all)for(var i=0,l=Object.values(ht);i<l.length;i++)ar(g=l[i],e,n,t);else for(var d in e){var f,g,d=/^idb\:\/\/(.*)\/(.*)\//.exec(d);d&&(f=d[1],d=d[2],g=ht["idb://".concat(f,"/").concat(d)])&&ar(g,e,n,t)}n.forEach(function(_){return _()})}function ar(e,t,n,i){for(var l=[],d=0,f=Object.entries(e.queries.query);d<f.length;d++){for(var g=f[d],_=g[0],D=[],P=0,x=g[1];P<x.length;P++){var C=x[P];dn(t,C.obsSet)?C.subscribers.forEach(function(S){return n.add(S)}):i&&D.push(C)}i&&l.push([_,D])}if(i)for(var k=0,E=l;k<E.length;k++){var A=E[k],_=A[0],D=A[1];e.queries.query[_]=D}}function Zi(e){var t=e._state,n=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?Te(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var i=t.openCanceller,l=Math.round(10*e.verno),d=!1;function f(){if(t.openCanceller!==i)throw new se.DatabaseClosed("db.open() was cancelled")}function g(){return new Z(function(C,k){if(f(),!n)throw new se.MissingAPI;var E=e.name,A=t.autoSchema||!l?n.open(E):n.open(E,l);if(!A)throw new se.MissingAPI;A.onerror=We(k),A.onblocked=ke(e._fireOnBlocked),A.onupgradeneeded=ke(function(S){var I;P=A.transaction,t.autoSchema&&!e._options.allowEmptyDB?(A.onerror=Gt,P.abort(),A.result.close(),(I=n.deleteDatabase(E)).onsuccess=I.onerror=ke(function(){k(new se.NoSuchDatabase("Database ".concat(E," doesnt exist")))})):(P.onerror=We(k),I=S.oldVersion>Math.pow(2,62)?0:S.oldVersion,x=I<1,e.idbdb=A.result,d&&Yi(e,P),Qi(e,I/10,P,k))},k),A.onsuccess=ke(function(){P=null;var S,I,$,R,K,V,Q=e.idbdb=A.result,U=J(Q.objectStoreNames);if(0<U.length)try{var X=Q.transaction((K=U).length===1?K[0]:K,"readonly");if(t.autoSchema)V=Q,R=X,($=e).verno=V.version/10,R=$._dbSchema=Ca(0,V,R),$._storeNames=J(V.objectStoreNames,0),xa($,[$._allTables],p(R),R);else if(wa(e,e._dbSchema,X),I=X,((I=nn(Ca(0,(S=e).idbdb,I),S._dbSchema)).add.length||I.change.some(function(W){return W.add.length||W.change.length}))&&!d)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),Q.close(),l=Q.version+1,d=!0,C(g());ya(e,X)}catch{}Ut.add(e),Q.onversionchange=ke(function(W){t.vcFired=!0,e.on("versionchange").fire(W)}),Q.onclose=ke(function(){e.close({disableAutoOpen:!1})}),x&&(U=e._deps,K=E,sn(V=U.indexedDB)||K===pa||on(V,U.IDBKeyRange).put({name:K}).catch(Ae)),C()},k)}).catch(function(C){switch(C==null?void 0:C.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),g();break;case"VersionError":if(0<l)return l=0,g()}return Z.reject(C)})}var _,D=t.dbReadyResolve,P=null,x=!1;return Z.race([i,(typeof navigator>"u"?Z.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(C){function k(){return indexedDB.databases().finally(C)}_=setInterval(k,100),k()}).finally(function(){return clearInterval(_)}):Promise.resolve()).then(g)]).then(function(){return f(),t.onReadyBeingFired=[],Z.resolve(ln(function(){return e.on.ready.fire(e.vip)})).then(function C(){var k;if(0<t.onReadyBeingFired.length)return k=t.onReadyBeingFired.reduce(qa,Ae),t.onReadyBeingFired=[],Z.resolve(ln(function(){return k(e.vip)})).then(C)})}).finally(function(){t.openCanceller===i&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(C){t.dbOpenError=C;try{P&&P.abort()}catch{}return i===t.openCanceller&&e._close(),Te(C)}).finally(function(){t.openComplete=!0,D()}).then(function(){var C;return x&&(C={},e.tables.forEach(function(k){k.schema.indexes.forEach(function(E){E.name&&(C["idb://".concat(e.name,"/").concat(k.name,"/").concat(E.name)]=new qe(-1/0,[[[]]]))}),C["idb://".concat(e.name,"/").concat(k.name,"/")]=C["idb://".concat(e.name,"/").concat(k.name,"/:dels")]=new qe(-1/0,[[[]]])}),lt(va).fire(C),mn(C,!0)),e})}function fn(e){function t(d){return e.next(d)}var n=l(t),i=l(function(d){return e.throw(d)});function l(d){return function(g){var g=d(g),_=g.value;return g.done?_:_&&typeof _.then=="function"?_.then(n,i):m(_)?Promise.all(_).then(n,i):n(_)}}return l(t)()}function Sa(e,t,n){for(var i=m(e)?e.slice():[e],l=0;l<n;++l)i.push(t);return i}var Xi={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return o(o({},e),{table:function(i){var n=e.table(i),i=n.schema,l=Object.create(null),d=[];function f(C,k,E){var $=Ht(C),A=l[$]=l[$]||[],S=C==null?0:typeof C=="string"?1:C.length,I=0<k,$=o(o({},E),{name:I?"".concat($,"(virtual-from:").concat(E.name,")"):E.name,lowLevelIndex:E,isVirtual:I,keyTail:k,keyLength:S,extractKey:tn(C),unique:!I&&E.unique});return A.push($),$.isPrimaryKey||d.push($),1<S&&f(S===2?C[0]:C.slice(0,S-1),k+1,E),A.sort(function(R,K){return R.keyTail-K.keyTail}),$}var g=f(i.primaryKey.keyPath,0,i.primaryKey);l[":id"]=[g];for(var _=0,D=i.indexes;_<D.length;_++){var P=D[_];f(P.keyPath,0,P)}function x(C){var k,E=C.query.index;return E.isVirtual?o(o({},C),{query:{index:E.lowLevelIndex,range:(k=C.query.range,E=E.keyTail,{type:k.type===1?2:k.type,lower:Sa(k.lower,k.lowerOpen?e.MAX_KEY:e.MIN_KEY,E),lowerOpen:!0,upper:Sa(k.upper,k.upperOpen?e.MIN_KEY:e.MAX_KEY,E),upperOpen:!0})}}):C}return o(o({},n),{schema:o(o({},i),{primaryKey:g,indexes:d,getIndexByKeyPath:function(C){return(C=l[Ht(C)])&&C[0]}}),count:function(C){return n.count(x(C))},query:function(C){return n.query(x(C))},openCursor:function(C){var k=C.query.index,E=k.keyTail,A=k.keyLength;return k.isVirtual?n.openCursor(x(C)).then(function(I){return I&&S(I)}):n.openCursor(C);function S(I){return Object.create(I,{continue:{value:function($){$!=null?I.continue(Sa($,C.reverse?e.MAX_KEY:e.MIN_KEY,E)):C.unique?I.continue(I.key.slice(0,A).concat(C.reverse?e.MIN_KEY:e.MAX_KEY,E)):I.continue()}},continuePrimaryKey:{value:function($,R){I.continuePrimaryKey(Sa($,e.MAX_KEY,E),R)}},primaryKey:{get:function(){return I.primaryKey}},key:{get:function(){var $=I.key;return A===1?$[0]:$.slice(0,A)}},value:{get:function(){return I.value}}})}}})}})}};function gn(e,t,n,i){return n=n||{},i=i||"",p(e).forEach(function(l){var d,f,g;T(t,l)?(d=e[l],f=t[l],typeof d=="object"&&typeof f=="object"&&d&&f?(g=ne(d))!==ne(f)?n[i+l]=t[l]:g==="Object"?gn(d,f,n,i+l+"."):d!==f&&(n[i+l]=t[l]):d!==f&&(n[i+l]=t[l])):n[i+l]=void 0}),p(t).forEach(function(l){T(e,l)||(n[i+l]=t[l])}),n}function bn(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var eo={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return o(o({},e),{table:function(t){var n=e.table(t),i=n.schema.primaryKey;return o(o({},n),{mutate:function(l){var d=oe.trans,f=d.table(t).hook,g=f.deleting,_=f.creating,D=f.updating;switch(l.type){case"add":if(_.fire===Ae)break;return d._promise("readwrite",function(){return P(l)},!0);case"put":if(_.fire===Ae&&D.fire===Ae)break;return d._promise("readwrite",function(){return P(l)},!0);case"delete":if(g.fire===Ae)break;return d._promise("readwrite",function(){return P(l)},!0);case"deleteRange":if(g.fire===Ae)break;return d._promise("readwrite",function(){return(function x(C,k,E){return n.query({trans:C,values:!1,query:{index:i,range:k},limit:E}).then(function(A){var S=A.result;return P({type:"delete",keys:S,trans:C}).then(function(I){return 0<I.numFailures?Promise.reject(I.failures[0]):S.length<E?{failures:[],numFailures:0,lastResult:void 0}:x(C,o(o({},k),{lower:S[S.length-1],lowerOpen:!0}),E)})})})(l.trans,l.range,1e4)},!0)}return n.mutate(l);function P(x){var C,k,E,A=oe.trans,S=x.keys||bn(i,x);if(S)return(x=x.type==="add"||x.type==="put"?o(o({},x),{keys:S}):o({},x)).type!=="delete"&&(x.values=s([],x.values)),x.keys&&(x.keys=s([],x.keys)),C=n,E=S,((k=x).type==="add"?Promise.resolve([]):C.getMany({trans:k.trans,keys:E,cache:"immutable"})).then(function(I){var $=S.map(function(R,K){var V,Q,U,X=I[K],W={onerror:null,onsuccess:null};return x.type==="delete"?g.fire.call(W,R,X,A):x.type==="add"||X===void 0?(V=_.fire.call(W,R,x.values[K],A),R==null&&V!=null&&(x.keys[K]=R=V,i.outbound||j(x.values[K],i.keyPath,R))):(V=gn(X,x.values[K]),(Q=D.fire.call(W,V,R,X,A))&&(U=x.values[K],Object.keys(Q).forEach(function(ee){T(U,ee)?U[ee]=Q[ee]:j(U,ee,Q[ee])}))),W});return n.mutate(x).then(function(R){for(var K=R.failures,V=R.results,Q=R.numFailures,R=R.lastResult,U=0;U<S.length;++U){var X=(V||S)[U],W=$[U];X==null?W.onerror&&W.onerror(K[U]):W.onsuccess&&W.onsuccess(x.type==="put"&&I[U]?x.values[U]:X)}return{failures:K,results:V,numFailures:Q,lastResult:R}}).catch(function(R){return $.forEach(function(K){return K.onerror&&K.onerror(R)}),Promise.reject(R)})});throw new Error("Keys missing")}}})}})}};function nr(e,t,n){try{if(!t||t.keys.length<e.length)return null;for(var i=[],l=0,d=0;l<t.keys.length&&d<e.length;++l)xe(t.keys[l],e[d])===0&&(i.push(n?ce(t.values[l]):t.values[l]),++d);return i.length===e.length?i:null}catch{return null}}var to={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var n=e.table(t);return o(o({},n),{getMany:function(i){var l;return i.cache?(l=nr(i.keys,i.trans._cache,i.cache==="clone"))?Z.resolve(l):n.getMany(i).then(function(d){return i.trans._cache={keys:i.keys,values:i.cache==="clone"?ce(d):d},d}):n.getMany(i)},mutate:function(i){return i.type!=="add"&&(i.trans._cache=null),n.mutate(i)}})}}}};function rr(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function ir(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var ao={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,n=new qe(e.MIN_KEY,e.MAX_KEY);return o(o({},e),{transaction:function(i,l,d){if(oe.subscr&&l!=="readonly")throw new se.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(oe.querier));return e.transaction(i,l,d)},table:function(i){function l(S){var A,S=S.query;return[A=S.index,new qe((A=(S=S.range).lower)!=null?A:e.MIN_KEY,(A=S.upper)!=null?A:e.MAX_KEY)]}var d=e.table(i),f=d.schema,g=f.primaryKey,_=f.indexes,D=g.extractKey,P=g.outbound,x=g.autoIncrement&&_.filter(function(E){return E.compound&&E.keyPath.includes(g.keyPath)}),C=o(o({},d),{mutate:function(E){function A(G){return G="idb://".concat(t,"/").concat(i,"/").concat(G),K[G]||(K[G]=new qe)}var S,I,$,R=E.trans,K=E.mutatedParts||(E.mutatedParts={}),V=A(""),Q=A(":dels"),U=E.type,W=E.type==="deleteRange"?[E.range]:E.type==="delete"?[E.keys]:E.values.length<50?[bn(g,E).filter(function(G){return G}),E.values]:[],X=W[0],W=W[1],ee=E.trans._cache;return m(X)?(V.addKeys(X),(U=U==="delete"||X.length===W.length?nr(X,ee):null)||Q.addKeys(X),(U||W)&&(S=A,I=U,$=W,f.indexes.forEach(function(G){var de=S(G.name||"");function ue(ye){return ye!=null?G.extractKey(ye):null}function ge(ye){G.multiEntry&&m(ye)?ye.forEach(function(Ve){return de.addKey(Ve)}):de.addKey(ye)}(I||$).forEach(function(ye,ze){var me=I&&ue(I[ze]),ze=$&&ue($[ze]);xe(me,ze)!==0&&(me!=null&&ge(me),ze!=null)&&ge(ze)})}))):X?(W={from:(ee=X.lower)!=null?ee:e.MIN_KEY,to:(U=X.upper)!=null?U:e.MAX_KEY},Q.add(W),V.add(W)):(V.add(n),Q.add(n),f.indexes.forEach(function(G){return A(G.name).add(n)})),d.mutate(E).then(function(G){return!X||E.type!=="add"&&E.type!=="put"||(V.addKeys(G.results),x&&x.forEach(function(de){for(var ue=E.values.map(function(me){return de.extractKey(me)}),ge=de.keyPath.findIndex(function(me){return me===g.keyPath}),ye=0,Ve=G.results.length;ye<Ve;++ye)ue[ye][ge]=G.results[ye];A(de.name).addKeys(ue)})),R.mutatedParts=Aa(R.mutatedParts||{},K),G})}}),k={get:function(E){return[g,new qe(E.key)]},getMany:function(E){return[g,new qe().addKeys(E.keys)]},count:l,query:l,openCursor:l};return p(k).forEach(function(E){C[E]=function(A){var S=oe.subscr,I=!!S,$=rr(oe,d)&&ir(E,A)?A.obsSet={}:S;if(I){var R,S=function(W){return W="idb://".concat(t,"/").concat(i,"/").concat(W),$[W]||($[W]=new qe)},K=S(""),V=S(":dels"),I=k[E](A),Q=I[0],I=I[1];if((E==="query"&&Q.isPrimaryKey&&!A.values?V:S(Q.name||"")).add(I),!Q.isPrimaryKey){if(E!=="count")return R=E==="query"&&P&&A.values&&d.query(o(o({},A),{values:!1})),d[E].apply(this,arguments).then(function(W){if(E==="query"){if(P&&A.values)return R.then(function(ue){return ue=ue.result,K.addKeys(ue),W});var ee=A.values?W.result.map(D):W.result;(A.values?K:V).addKeys(ee)}else{var G,de;if(E==="openCursor")return de=A.values,(G=W)&&Object.create(G,{key:{get:function(){return V.addKey(G.primaryKey),G.key}},primaryKey:{get:function(){var ue=G.primaryKey;return V.addKey(ue),ue}},value:{get:function(){return de&&K.addKey(G.primaryKey),G.value}}})}return W});V.add(n)}}return d[E].apply(this,arguments)}}),C}})}};function or(e,t,n){var i;return n.numFailures===0?t:t.type==="deleteRange"||(i=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===i)?null:(i=o({},t),m(i.keys)&&(i.keys=i.keys.filter(function(l,d){return!(d in n.failures)})),"values"in i&&m(i.values)&&(i.values=i.values.filter(function(l,d){return!(d in n.failures)})),i)}function hn(e,t){return n=e,((i=t).lower===void 0||(i.lowerOpen?0<xe(n,i.lower):0<=xe(n,i.lower)))&&(n=e,(i=t).upper===void 0||(i.upperOpen?xe(n,i.upper)<0:xe(n,i.upper)<=0));var n,i}function sr(e,t,n,i,l,d){var f,g,_,D,P,x,C;return!n||n.length===0||(f=t.query.index,g=f.multiEntry,_=t.query.range,D=i.schema.primaryKey.extractKey,P=f.extractKey,x=(f.lowLevelIndex||f).extractKey,(i=n.reduce(function(k,E){var A=k,S=[];if(E.type==="add"||E.type==="put")for(var I=new qe,$=E.values.length-1;0<=$;--$){var R,K=E.values[$],V=D(K);!I.hasKey(V)&&(R=P(K),g&&m(R)?R.some(function(ee){return hn(ee,_)}):hn(R,_))&&(I.addKey(V),S.push(K))}switch(E.type){case"add":var Q=new qe().addKeys(t.values?k.map(function(G){return D(G)}):k),A=k.concat(t.values?S.filter(function(G){return G=D(G),!Q.hasKey(G)&&(Q.addKey(G),!0)}):S.map(function(G){return D(G)}).filter(function(G){return!Q.hasKey(G)&&(Q.addKey(G),!0)}));break;case"put":var U=new qe().addKeys(E.values.map(function(G){return D(G)}));A=k.filter(function(G){return!U.hasKey(t.values?D(G):G)}).concat(t.values?S:S.map(function(G){return D(G)}));break;case"delete":var X=new qe().addKeys(E.keys);A=k.filter(function(G){return!X.hasKey(t.values?D(G):G)});break;case"deleteRange":var W=E.range;A=k.filter(function(G){return!hn(D(G),W)})}return A},e))===e)?e:(C=function(k,E){return xe(x(k),x(E))||xe(D(k),D(E))},i.sort(t.direction==="prev"||t.direction==="prevunique"?function(k,E){return C(E,k)}:C),t.limit&&t.limit<1/0&&(i.length>t.limit?i.length=t.limit:e.length===t.limit&&i.length<t.limit&&(l.dirty=!0)),d?Object.freeze(i):i)}function lr(e,t){return xe(e.lower,t.lower)===0&&xe(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function no(e,t){return((n,i,l,d)=>{if(n===void 0)return i!==void 0?-1:0;if(i===void 0)return 1;if((n=xe(n,i))===0){if(l&&d)return 0;if(l)return 1;if(d)return-1}return n})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((n,i,l,d)=>{if(n===void 0)return i!==void 0?1:0;if(i===void 0)return-1;if((n=xe(n,i))===0){if(l&&d)return 0;if(l)return-1;if(d)return 1}return n})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function ro(e,t,n,i){e.subscribers.add(n),i.addEventListener("abort",function(){var l,d;e.subscribers.delete(n),e.subscribers.size===0&&(l=e,d=t,setTimeout(function(){l.subscribers.size===0&&Pe(d,l)},3e3))})}var io={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return o(o({},e),{transaction:function(n,i,l){var d,f,g=e.transaction(n,i,l);return i==="readwrite"&&(l=(d=new AbortController).signal,g.addEventListener("abort",(f=function(_){return function(){if(d.abort(),i==="readwrite"){for(var D=new Set,P=0,x=n;P<x.length;P++){var C=x[P],k=ht["idb://".concat(t,"/").concat(C)];if(k){var E=e.table(C),A=k.optimisticOps.filter(function(G){return G.trans===g});if(g._explicit&&_&&g.mutatedParts)for(var S=0,I=Object.values(k.queries.query);S<I.length;S++)for(var $=0,R=(Q=I[S]).slice();$<R.length;$++)dn((U=R[$]).obsSet,g.mutatedParts)&&(Pe(Q,U),U.subscribers.forEach(function(G){return D.add(G)}));else if(0<A.length){k.optimisticOps=k.optimisticOps.filter(function(G){return G.trans!==g});for(var K=0,V=Object.values(k.queries.query);K<V.length;K++)for(var Q,U,X,W=0,ee=(Q=V[K]).slice();W<ee.length;W++)(U=ee[W]).res!=null&&g.mutatedParts&&(_&&!U.dirty?(X=Object.isFrozen(U.res),X=sr(U.res,U.req,A,E,U,X),U.dirty?(Pe(Q,U),U.subscribers.forEach(function(G){return D.add(G)})):X!==U.res&&(U.res=X,U.promise=Z.resolve({result:X}))):(U.dirty&&Pe(Q,U),U.subscribers.forEach(function(G){return D.add(G)})))}}}D.forEach(function(G){return G()})}}})(!1),{signal:l}),g.addEventListener("error",f(!1),{signal:l}),g.addEventListener("complete",f(!0),{signal:l})),g},table:function(n){var i=e.table(n),l=i.schema.primaryKey;return o(o({},i),{mutate:function(d){var f,g=oe.trans;return!l.outbound&&g.db._options.cache!=="disabled"&&!g.explicit&&g.idbtrans.mode==="readwrite"&&(f=ht["idb://".concat(t,"/").concat(n)])?(g=i.mutate(d),d.type!=="add"&&d.type!=="put"||!(50<=d.values.length||bn(l,d).some(function(_){return _==null}))?(f.optimisticOps.push(d),d.mutatedParts&&Ea(d.mutatedParts),g.then(function(_){0<_.numFailures&&(Pe(f.optimisticOps,d),(_=or(0,d,_))&&f.optimisticOps.push(_),d.mutatedParts)&&Ea(d.mutatedParts)}),g.catch(function(){Pe(f.optimisticOps,d),d.mutatedParts&&Ea(d.mutatedParts)})):g.then(function(_){var D=or(0,o(o({},d),{values:d.values.map(function(P,x){var C;return _.failures[x]?P:(j(C=(C=l.keyPath)!=null&&C.includes(".")?ce(P):o({},P),l.keyPath,_.results[x]),C)})}),_);f.optimisticOps.push(D),queueMicrotask(function(){return d.mutatedParts&&Ea(d.mutatedParts)})}),g):i.mutate(d)},query:function(d){var f,g,_,D,P,x,C;return rr(oe,i)&&ir("query",d)?(f=((_=oe.trans)==null?void 0:_.db._options.cache)==="immutable",g=(_=oe).requery,_=_.signal,x=((k,E,A,S)=>{var I=ht["idb://".concat(k,"/").concat(E)];if(!I)return[];if(!(k=I.queries[A]))return[null,!1,I,null];var $=k[(S.query?S.query.index.name:null)||""];if(!$)return[null,!1,I,null];switch(A){case"query":var R=(K=S.direction)!=null?K:"next",K=$.find(function(V){var Q;return V.req.limit===S.limit&&V.req.values===S.values&&((Q=V.req.direction)!=null?Q:"next")===R&&lr(V.req.query.range,S.query.range)});return K?[K,!0,I,$]:[$.find(function(V){var Q;return("limit"in V.req?V.req.limit:1/0)>=S.limit&&((Q=V.req.direction)!=null?Q:"next")===R&&(!S.values||V.req.values)&&no(V.req.query.range,S.query.range)}),!1,I,$];case"count":return K=$.find(function(V){return lr(V.req.query.range,S.query.range)}),[K,!!K,I,$]}})(t,n,"query",d),C=x[0],D=x[2],P=x[3],C&&x[1]?C.obsSet=d.obsSet:(x=i.query(d).then(function(k){var E=k.result;if(C&&(C.res=E),f){for(var A=0,S=E.length;A<S;++A)Object.freeze(E[A]);Object.freeze(E)}return k}).catch(function(k){return P&&C&&Pe(P,C),Promise.reject(k)}),C={obsSet:d.obsSet,promise:x,subscribers:new Set,type:"query",req:d,dirty:!1},P?P.push(C):(P=[C],(D=D||(ht["idb://".concat(t,"/").concat(n)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[d.query.index.name||""]=P)),ro(C,P,g,_),C.promise.then(function(k){return k=sr(k.result,d,D==null?void 0:D.optimisticOps,i,C,f),{result:f?k:ce(k)}})):i.query(d)}})}})}};function ka(e,t){return new Proxy(e,{get:function(n,i,l){return i==="db"?t:Reflect.get(n,i,l)}})}De.prototype.version=function(e){if(isNaN(e)||e<.1)throw new se.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new se.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,n=t.filter(function(i){return i._cfg.version===e})[0];return n||(n=new this.Version(e),t.push(n),t.sort(Wi),n.stores({}),this._state.autoSchema=!1),n},De.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||oe.letThrough||this._vip)?e():new Z(function(n,i){if(t._state.openComplete)return i(new se.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void i(new se.DatabaseClosed);t.open().catch(Ae)}t._state.dbReadyPromise.then(n,i)}).then(e)},De.prototype.use=function(l){var t=l.stack,n=l.create,i=l.level,l=l.name,d=(l&&this.unuse({stack:t,name:l}),this._middlewares[t]||(this._middlewares[t]=[]));return d.push({stack:t,create:n,level:i??10,name:l}),d.sort(function(f,g){return f.level-g.level}),this},De.prototype.unuse=function(e){var t=e.stack,n=e.name,i=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(l){return i?l.create!==i:!!n&&l.name!==n})),this},De.prototype.open=function(){var e=this;return ft(Xe,function(){return Zi(e)})},De.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state;if(Ut.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new Z(function(t){e.dbReadyResolve=t}),e.openCanceller=new Z(function(t,n){e.cancelOpen=n}))},De.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,n=this._state;t?(n.isBeingOpened&&n.cancelOpen(new se.DatabaseClosed),this._close(),n.autoOpen=!1,n.dbOpenError=new se.DatabaseClosed):(this._close(),n.autoOpen=this._options.autoOpen||n.isBeingOpened,n.openComplete=!1,n.dbOpenError=null)},De.prototype.delete=function(e){var t=this,n=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),i=this._state;return new Z(function(l,d){function f(){t.close(e);var g=t._deps.indexedDB.deleteDatabase(t.name);g.onsuccess=ke(function(){var _,D,P;_=t._deps,D=t.name,sn(P=_.indexedDB)||D===pa||on(P,_.IDBKeyRange).delete(D).catch(Ae),l()}),g.onerror=We(d),g.onblocked=t._fireOnBlocked}if(n)throw new se.InvalidArgument("Invalid closeOptions argument to db.delete()");i.isBeingOpened?i.dbReadyPromise.then(f):f()})},De.prototype.backendDB=function(){return this.idbdb},De.prototype.isOpen=function(){return this.idbdb!==null},De.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},De.prototype.hasFailed=function(){return this._state.dbOpenError!==null},De.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(De.prototype,"tables",{get:function(){var e=this;return p(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),De.prototype.transaction=function(){var e=(function(t,n,i){var l=arguments.length;if(l<2)throw new se.InvalidArgument("Too few arguments");for(var d=new Array(l-1);--l;)d[l-1]=arguments[l];return i=d.pop(),[t,te(d),i]}).apply(this,arguments);return this._transaction.apply(this,e)},De.prototype._transaction=function(e,t,n){var i,l,d=this,f=oe.trans,g=(f&&f.db===this&&e.indexOf("!")===-1||(f=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(l=t.map(function(D){if(D=D instanceof d.Table?D.name:D,typeof D!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return D}),e=="r"||e===Wa)i=Wa;else{if(e!="rw"&&e!=Qa)throw new se.InvalidArgument("Invalid transaction mode: "+e);i=Qa}if(f){if(f.mode===Wa&&i===Qa){if(!g)throw new se.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");f=null}f&&l.forEach(function(D){if(f&&f.storeNames.indexOf(D)===-1){if(!g)throw new se.SubTransaction("Table "+D+" not included in parent transaction.");f=null}}),g&&f&&!f.active&&(f=null)}}catch(D){return f?f._promise(null,function(P,x){x(D)}):Te(D)}var _=(function D(P,x,C,k,E){return Z.resolve().then(function(){var $=oe.transless||oe,A=P._createTransaction(x,C,P._dbSchema,k),$=(A.explicit=!0,{trans:A,transless:$});if(k)A.idbtrans=k.idbtrans;else try{A.create(),A.idbtrans._explicit=!0,P._state.PR1398_maxLoop=3}catch(R){return R.name===Ba.InvalidState&&P.isOpen()&&0<--P._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),P.close({disableAutoOpen:!1}),P.open().then(function(){return D(P,x,C,null,E)})):Te(R)}var S,I=ie(E),$=(I&&Et(),Z.follow(function(){var R;(S=E.call(A,A))&&(I?(R=it.bind(null,null),S.then(R,R)):typeof S.next=="function"&&typeof S.throw=="function"&&(S=fn(S)))},$));return(S&&typeof S.then=="function"?Z.resolve(S).then(function(R){return A.active?R:Te(new se.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):$.then(function(){return S})).then(function(R){return k&&A._resolve(),A._completion.then(function(){return R})}).catch(function(R){return A._reject(R),Te(R)})})}).bind(null,this,i,l,f,n);return f?f._promise(i,_,"lock"):oe.trans?ft(oe.transless,function(){return d._whenReady(_)}):this._whenReady(_)},De.prototype.table=function(e){if(T(this._allTables,e))return this._allTables[e];throw new se.InvalidTable("Table ".concat(e," does not exist"))};var tt=De;function De(e,t){var n,i,l,d,f,g=this,_=(this._middlewares={},this.verno=0,De.dependencies),_=(this._options=t=o({addons:De.addons,autoOpen:!0,indexedDB:_.indexedDB,IDBKeyRange:_.IDBKeyRange,cache:"cloned",maxConnections:1e3},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),D=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:Ae,dbReadyPromise:null,cancelOpen:Ae,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),P=(D.dbReadyPromise=new Z(function(x){D.dbReadyResolve=x}),D.openCanceller=new Z(function(x,C){D.cancelOpen=C}),this._state=D,this.name=e,this.on=Ft(this,"populate","blocked","versionchange","close",{ready:[qa,Ae]}),this.once=function(x,C){var k=function(){for(var E=[],A=0;A<arguments.length;A++)E[A]=arguments[A];g.on(x).unsubscribe(k),C.apply(g,E)};return g.on(x,k)},this.on.ready.subscribe=fe(this.on.ready.subscribe,function(x){return function(C,k){De.vip(function(){var E,A=g._state;A.openComplete?(A.dbOpenError||Z.resolve().then(C),k&&x(C)):A.onReadyBeingFired?(A.onReadyBeingFired.push(C),k&&x(C)):(x(C),E=g,k||x(function S(){E.on.ready.unsubscribe(C),E.on.ready.unsubscribe(S)}))})}}),this.Collection=(n=this,Kt(Ni.prototype,function(S,A){this.db=n;var k=Rn,E=null;if(A)try{k=A()}catch($){E=$}var A=S._ctx,S=A.table,I=S.hook.reading.fire;this._ctx={table:S,index:A.index,isPrimKey:!A.index||S.schema.primKey.keyPath&&A.index===S.schema.primKey.name,range:k,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:E,or:A.or,valueMapper:I!==Mt?I:null}})),this.Table=(i=this,Kt(Kn.prototype,function(x,C,k){this.db=i,this._tx=k,this.name=x,this.schema=C,this.hook=i._allTables[x]?i._allTables[x].hook:Ft(null,{creating:[Li,Ae],reading:[$i,Mt],updating:[Oi,Ae],deleting:[Ii,Ae]})})),this.Transaction=(l=this,Kt(Gi.prototype,function(x,C,k,E,A){var S=this;x!=="readonly"&&C.forEach(function(I){I=(I=k[I])==null?void 0:I.yProps,I&&(C=C.concat(I.map(function($){return $.updatesTable})))}),this.db=l,this.mode=x,this.storeNames=C,this.schema=k,this.chromeTransactionDurability=E,this.idbtrans=null,this.on=Ft(this,"complete","error","abort"),this.parent=A||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new Z(function(I,$){S._resolve=I,S._reject=$}),this._completion.then(function(){S.active=!1,S.on.complete.fire()},function(I){var $=S.active;return S.active=!1,S.on.error.fire(I),S.parent?S.parent._reject(I):$&&S.idbtrans&&S.idbtrans.abort(),Te(I)})})),this.Version=(d=this,Kt(Ji.prototype,function(x){this.db=d,this._cfg={version:x,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(f=this,Kt(Wn.prototype,function(x,C,k){if(this.db=f,this._ctx={table:x,index:C===":id"?null:C,or:k},this._cmp=this._ascending=xe,this._descending=function(E,A){return xe(A,E)},this._max=function(E,A){return 0<xe(E,A)?E:A},this._min=function(E,A){return xe(E,A)<0?E:A},this._IDBKeyRange=f._deps.IDBKeyRange,!this._IDBKeyRange)throw new se.MissingAPI})),this.on("versionchange",function(x){0<x.newVersion?console.warn("Another connection wants to upgrade database '".concat(g.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(g.name,"'. Closing db now to resume the delete request.")),g.close({disableAutoOpen:!1})}),this.on("blocked",function(x){!x.newVersion||x.newVersion<x.oldVersion?console.warn("Dexie.delete('".concat(g.name,"') was blocked")):console.warn("Upgrade '".concat(g.name,"' blocked by other connection holding version ").concat(x.oldVersion/10))}),this._maxKey=Vt(t.IDBKeyRange),this._createTransaction=function(x,C,k,E){return new g.Transaction(x,C,k,g._options.chromeTransactionDurability,E)},this._fireOnBlocked=function(x){g.on("blocked").fire(x),Ut.toArray().filter(function(C){return C.name===g.name&&C!==g&&!C._state.vcFired}).map(function(C){return C.on("versionchange").fire(x)})},this.use(to),this.use(io),this.use(ao),this.use(Xi),this.use(eo),new Proxy(this,{get:function(x,C,k){var E;return C==="_vip"||(C==="table"?function(A){return ka(g.table(A),P)}:(E=Reflect.get(x,C,k))instanceof Kn?ka(E,P):C==="tables"?E.map(function(A){return ka(A,P)}):C==="_createTransaction"?function(){return ka(E.apply(this,arguments),P)}:E)}}));this.vip=P,_.forEach(function(x){return x(g)})}var Ta,Dt=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",oo=(vn.prototype.subscribe=function(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})},vn.prototype[Dt]=function(){return this},vn);function vn(e){this._subscribe=e}try{Ta={indexedDB:u.indexedDB||u.mozIndexedDB||u.webkitIndexedDB||u.msIndexedDB,IDBKeyRange:u.IDBKeyRange||u.webkitIDBKeyRange}}catch{Ta={indexedDB:null,IDBKeyRange:null}}function cr(e){var t,n=!1,i=new oo(function(l){var d=ie(e),f,g=!1,_={},D={},P={get closed(){return g},unsubscribe:function(){g||(g=!0,f&&f.abort(),x&&lt.storagemutated.unsubscribe(E))}},x=(l.start&&l.start(P),!1),C=function(){return Ua(A)};function k(){return dn(D,_)}var E=function(S){Aa(_,S),k()&&C()},A=function(){var S,I,$;!g&&Ta.indexedDB&&(_={},S={},f&&f.abort(),f=new AbortController,$=(R=>{var K=Pt();try{d&&Et();var V=rt(e,R);return V=d?V.finally(it):V}finally{K&&At()}})(I={subscr:S,signal:f.signal,requery:C,querier:e,trans:null}),x||(lt.storagemutated.subscribe(E),x=!0),Promise.resolve($).then(function(R){n=!0,t=R,g||I.signal.aborted||(k()||(D=S,k())?C():(_={},Ua(function(){return!g&&l.next&&l.next(R)})))},function(R){n=!1,["DatabaseClosedError","AbortError"].includes(R==null?void 0:R.name)||g||Ua(function(){g||l.error&&l.error(R)})}))};return setTimeout(C,0),P});return i.hasValue=function(){return n},i.getValue=function(){return t},i}var vt=tt;function yn(e){var t=ct;try{ct=!0,lt.storagemutated.fire(e),mn(e,!0)}finally{ct=t}}O(vt,o(o({},he),{delete:function(e){return new vt(e,{addons:[]}).delete()},exists:function(e){return new vt(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=vt.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(sn(n)?Promise.resolve(n.databases()).then(function(i){return i.map(function(l){return l.name}).filter(function(l){return l!==pa})}):on(n,t).toCollection().primaryKeys()).then(e)}catch{return Te(new se.MissingAPI)}var t,n},defineClass:function(){return function(e){b(this,e)}},ignoreTransaction:function(e){return oe.trans?ft(oe.transless||Xe,e):e()},vip:ln,async:function(e){return function(){try{var t=fn(e.apply(this,arguments));return t&&typeof t.then=="function"?t:Z.resolve(t)}catch(n){return Te(n)}}},spawn:function(e,t,n){try{var i=fn(e.apply(n,t||[]));return i&&typeof i.then=="function"?i:Z.resolve(i)}catch(l){return Te(l)}},currentTransaction:{get:function(){return oe.trans||null}},waitFor:function(e,t){return e=Z.resolve(typeof e=="function"?vt.ignoreTransaction(e):e).timeout(t||6e4),oe.trans?oe.trans.waitFor(e):e},Promise:Z,debug:{get:function(){return Qe},set:function(e){Dn(e)}},derive:H,extend:b,props:O,override:fe,Events:Ft,on:lt,liveQuery:cr,extendObservabilitySet:Aa,getByKeyPath:q,setByKeyPath:j,delByKeyPath:function(e,t){typeof t=="string"?j(e,t,void 0):"length"in t&&[].map.call(t,function(n){j(e,n,void 0)})},shallowClone:N,deepClone:ce,getObjectDiff:gn,cmp:xe,asap:M,minKey:-1/0,addons:[],connections:{get:Ut.toArray},errnames:Ba,dependencies:Ta,cache:ht,semVer:"4.4.6",version:"4.4.6".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),vt.maxKey=Vt(vt.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(lt(va,function(e){ct||(e=new CustomEvent(Za,{detail:e}),ct=!0,dispatchEvent(e),ct=!1)}),addEventListener(Za,function(e){e=e.detail,ct||yn(e)}));var $t,ct=!1,dr=function(){};return typeof BroadcastChannel<"u"&&((dr=function(){($t=new BroadcastChannel(Za)).onmessage=function(e){return e.data&&yn(e.data)}})(),typeof $t.unref=="function"&&$t.unref(),lt(va,function(e){ct||$t.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!tt.disableBfCache&&e.persisted){Qe&&console.debug("Dexie: handling persisted pagehide"),$t!=null&&$t.close();for(var t=0,n=Ut.toArray();t<n.length;t++)n[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!tt.disableBfCache&&e.persisted&&(Qe&&console.debug("Dexie: handling persisted pageshow"),dr(),yn({all:new qe(-1/0,[[]])}))})),Z.rejectionMapper=function(e,t){return!e||e instanceof Be||e instanceof TypeError||e instanceof SyntaxError||!e.name||!Tn[e.name]?e:(t=new Tn[e.name](t||e.message,e),"stack"in e&&v(t,"stack",{get:function(){return this.inner.stack}}),t)},Dn(Qe),o(tt,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:tt,Entity:Bn,PropModification:Nt,RangeSet:qe,add:function(e){return new Nt({add:e})},cmp:xe,default:tt,liveQuery:cr,mergeRanges:Qt,rangesOverlap:Xn,remove:function(e){return new Nt({remove:e})},replacePrefix:function(e,t){return new Nt({replacePrefix:[e,t]})}}),{default:tt}),tt})})(La)),La.exports}var Ms=js();const En=Is(Ms),Er=Symbol.for("Dexie"),Ma=globalThis[Er]||(globalThis[Er]=En);if(En.semVer!==Ma.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${En.semVer} and ${Ma.semVer}`);const{liveQuery:dl,mergeRanges:ul,rangesOverlap:pl,RangeSet:ml,cmp:fl,Entity:gl,PropModification:bl,replacePrefix:hl,add:vl,remove:yl,DexieYProvider:xl}=Ma;class Rs extends Ma{constructor(){super("AnaxagorasAIDatabase");$e(this,"aiSettings");$e(this,"studyBlocks");$e(this,"projectTasks");$e(this,"userProfile");$e(this,"studyTaskSessions");this.version(1).stores({aiSettings:"++id, provider, modelName",studyBlocks:"++id, date, subject, completed, syncedWithGoogle",projectTasks:"++id, subject, currentPhase, dueDate",userProfile:"id, email"}),this.version(2).stores({studyTaskSessions:"topicId, status, selectedActivityId, updatedAt"})}}const _e=new Rs;async function Je(c){try{const a={...c,lastActiveAt:c.lastActiveAt instanceof Date?c.lastActiveAt.toISOString():c.lastActiveAt,updatedAt:new Date().toISOString()};await _e.studyTaskSessions.put(a)}catch(a){console.warn("[Storage] Error persisting studyTaskSession:",a)}}async function Bs(){try{return await _e.studyTaskSessions.toArray()}catch(c){return console.warn("[Storage] Error retrieving studyTaskSessions:",c),[]}}async function qs(c,a){try{const o=(await _e.studyBlocks.toArray()).find(s=>!s.completed&&(s.subject.toLowerCase().includes(c.toLowerCase())||c.toLowerCase().includes(s.subject.toLowerCase())||a.toLowerCase().includes(s.title.toLowerCase())||s.title.toLowerCase().includes(a.toLowerCase())));if(o&&o.id)return await _e.studyBlocks.update(o.id,{completed:!0}),o.completed=!0,o}catch(r){console.warn("[Storage] Error marking matching study block completed:",r)}return null}async function zs(){await _e.aiSettings.count()===0&&await _e.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}),await Ns(),await Mr()}async function Ns(){const c=await _e.studyBlocks.filter(h=>!h.gradeKey).toArray();if(c.length>0)for(const h of c)h.id&&await _e.studyBlocks.delete(h.id);const a=await _e.studyBlocks.filter(h=>h.gradeKey==="1eso").count(),r=await _e.studyBlocks.filter(h=>h.gradeKey==="2batx").count(),o=await _e.studyBlocks.filter(h=>h.gradeKey==="2batx"&&(h.title.includes("Matrices")||h.title.includes("Cramer"))).toArray();for(const h of o)h.id&&await _e.studyBlocks.update(h.id,{title:"Matemáticas II: Derivadas, Recta Tangente y Optimización (PAU)",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo diferencial y aplicaciones de la derivada.",notes:"Cálculo de la recta tangente a f(x) en x=1 y justificación de extremos relativos mediante la segunda derivada."});const s=new Date().toISOString().split("T")[0],u=new Date(Date.now()+864e5).toISOString().split("T")[0],p=new Date(Date.now()+864e5*2).toISOString().split("T")[0],m=new Date(Date.now()+864e5*3).toISOString().split("T")[0],b=new Date(Date.now()+864e5*4).toISOString().split("T")[0];a===0&&await _e.studyBlocks.bulkAdd([{title:"Análisis de Oraciones: Sujeto y Complemento Verbal",subject:"Lengua Castellana",date:s,startTime:"17:00",durationMinutes:45,type:"assignment_due",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.",notes:"Identificación del predicado y localización del Complemento Verbal (CV) en bloque.",syncedWithGoogle:!0,googleEventId:"gcal_eso_castellano"},{title:"Ciencias Naturales: El Reino Animal y los Ecosistemas",subject:"Ciencias Naturales",date:u,startTime:"16:30",durationMinutes:40,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.",notes:"Repaso con esquemas visuales de vertebrados e invertebrados.",syncedWithGoogle:!1},{title:"Matemáticas: Fracciones y Operaciones Básicas",subject:"Matemáticas",date:p,startTime:"17:15",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.",notes:"Ejercicios de suma y resta con común denominador.",syncedWithGoogle:!0,googleEventId:"gcal_eso_mates"},{title:"Control Tema 2: Egipto y las Civilizaciones Fluviales",subject:"Ciencias Sociales",date:m,startTime:"09:00",durationMinutes:50,type:"exam",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Control trimestral de departamento programado por el centro educativo.",notes:"Llevar mapa histórico de Mesopotamia y el Nilo.",syncedWithGoogle:!1},{title:"Lectura Guiada: Crónicas Juveniles y Vocabulario",subject:"Tutoría / Lectura",date:b,startTime:"16:00",durationMinutes:30,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.",notes:"Lectura de 2 capítulos y ficha de comprensión lectora.",syncedWithGoogle:!1}]),r===0&&await _e.studyBlocks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",subject:"Lengua Castellana",date:s,startTime:"17:00",durationMinutes:55,type:"assignment_due",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).",notes:"Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.",syncedWithGoogle:!0,googleEventId:"gcal_batx_castellano"},{title:"Historia de España: La Constitución de 1812 y la Guerra de la Independencia",subject:"Historia de España",date:u,startTime:"18:00",durationMinutes:50,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.",notes:"Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.",syncedWithGoogle:!1},{title:"Matemáticas II: Derivadas, Recta Tangente y Optimización (PAU)",subject:"Matemáticas II",date:p,startTime:"16:30",durationMinutes:60,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo diferencial y aplicaciones de la derivada.",notes:"Cálculo de la recta tangente a f(x) en x=1 y justificación de extremos relativos mediante la segunda derivada.",syncedWithGoogle:!0,googleEventId:"gcal_batx_mates"},{title:"Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)",subject:"Filosofía",date:m,startTime:"11:30",durationMinutes:60,type:"exam",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Prueba oficial de simulacro de Selectividad coordinada por el departamento.",notes:"Comparativa ontológica y epistemológica entre Platón y Descartes.",syncedWithGoogle:!1},{title:"Química: Termodinámica y Cinética Química (PAU)",subject:"Química",date:b,startTime:"17:30",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.",notes:"Cálculo de entalpía estándar y entropía de reacción.",syncedWithGoogle:!1}])}async function Mr(){const c=await _e.projectTasks.filter(p=>!p.gradeKey).toArray();if(c.length>0)for(const p of c)p.id&&await _e.projectTasks.delete(p.id);const a=await _e.projectTasks.filter(p=>!p.topicId).toArray();for(const p of a)p.id&&(p.gradeKey==="1eso"?p.subject.includes("Lengua")?await _e.projectTasks.update(p.id,{topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1"}):await _e.projectTasks.update(p.id,{topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1"}):p.gradeKey==="2batx"&&(p.subject.includes("Lengua")?await _e.projectTasks.update(p.id,{topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1"}):await _e.projectTasks.update(p.id,{topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1"})));const r=await _e.projectTasks.filter(p=>p.gradeKey==="1eso").count(),o=await _e.projectTasks.filter(p=>p.gradeKey==="2batx").count(),s=new Date(Date.now()+864e5*5).toISOString().split("T")[0],u=new Date(Date.now()+864e5*12).toISOString().split("T")[0];r===0&&await _e.projectTasks.bulkAdd([{title:"Análisis Sintáctico: El Predicado y el Complemento Verbal",subject:"Lengua Castellana y Literatura",gradeKey:"1eso",topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1",dueDate:s,currentPhase:"writing",autonomyScore:75,pedagogicalNote:"Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.",notes:'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',driveFiles:[{fileId:"drive_doc_sintaxis_1eso",name:"Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 1 día"}],criteria:[{id:"c_eso_1",label:'Identificación del Sujeto ("El tren") y el Predicado',checked:!0,explanation:"Diferenciado correctamente quién realiza la acción."},{id:"c_eso_2",label:'Localización del verbo principal ("llegó")',checked:!0,explanation:"Núcleo del predicado identificado."},{id:"c_eso_3",label:'Reconocimiento del Complemento Verbal ("puntual a la estación")',checked:!0,explanation:"Identificado en bloque como acompañante del verbo, sin clasificar subtipos."},{id:"c_eso_4",label:"Redacción de una oración propia con complemento verbal similar",checked:!1,explanation:"Pendiente de redactar y enviar al tutor."}]},{title:"Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad",subject:"Ciencias Naturales",gradeKey:"1eso",topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1",dueDate:u,currentPhase:"research",autonomyScore:50,pedagogicalNote:"Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.",notes:"Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.",driveFiles:[{fileId:"drive_doc_ecosistemas_1eso",name:"Guia_Maqueta_Ecosistemas.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 días"}],criteria:[{id:"c_eco_1",label:"Elección del ecosistema a representar (bosque, río o costa)",checked:!0,explanation:"Seleccionado bosque mediterráneo."},{id:"c_eco_2",label:"Lista de 5 especies autóctonas con su rol trófico",checked:!0,explanation:"Identificados productores, herbívoros y carnívoros."},{id:"c_eco_3",label:"Diseño visual de la maqueta y materiales reciclables",checked:!1,explanation:"En proceso de preparación."}]}]),o===0&&await _e.projectTasks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)",subject:"Lengua Castellana y Literatura",gradeKey:"2batx",topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1",dueDate:s,currentPhase:"writing",autonomyScore:60,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.",notes:'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',driveFiles:[{fileId:"drive_doc_sintaxis_2batx",name:"Guia_PAU_Tipologia_Complementos_Verbales.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 3 horas"},{fileId:"drive_sheet_pruebas",name:"Matriz_Pruebas_Sintacticas_RAE.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c_batx_1",label:"Segmentación en Sintagmas y delimitación oracional formal",checked:!0,explanation:"SN Sujeto y SV Predicado identificados con precisión."},{id:"c_batx_2",label:'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',checked:!0,explanation:"Diferenciación estricta de la tipología de complementos del predicado."},{id:"c_batx_3",label:"Prueba sintáctica de concordancia para el CPredicativo",checked:!1,explanation:'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'},{id:"c_batx_4",label:"Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC",checked:!1,explanation:"Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales."}]},{title:"Monografía: Energías Renovables en el Mediterráneo",subject:"Ciencias y Tecnología",gradeKey:"2batx",topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1",dueDate:u,currentPhase:"research",autonomyScore:75,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.",notes:"Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.",driveFiles:[{fileId:"drive_doc_01",name:"Borrador_Esquema_Energias.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 horas"},{fileId:"drive_sheet_02",name:"Datos_Produccion_2025.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c1",label:"Formulación de la pregunta de investigación con mis palabras",checked:!0,explanation:"Definido el objetivo sin copia directa de internet."},{id:"c2",label:"Búsqueda y contraste de 3 fuentes académicas fiables",checked:!0,explanation:"Artículos de revistas científicas guardados en Drive."},{id:"c3",label:"Redacción de conclusiones propias basadas en los datos",checked:!1,explanation:"En proceso: reflexionar sobre los resultados sin pedir resumen a la IA."}]}])}const Fs=Mr,Sr="anaxagoras_auth_state",Ks=["openid","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive.readonly"].join(" ");class Gs{constructor(){$e(this,"state",{isAuthenticated:!0,mode:"demo",user:null,clientId:"",scopes:{calendar:!0,drive:!0,profile:!0}});$e(this,"listeners",[]);this.loadPersistedState()}loadPersistedState(){try{const a=localStorage.getItem(Sr);a?(this.state=JSON.parse(a),this.state.mode==="demo"&&this.state.user&&(this.state.user.gradeKey==="2batx"?(this.state.user.id="google_user_demo_2batx",this.state.user.name="Álvaro Martín (2º Bachillerato)",this.state.user.email="alvaro.martin@ies-catalunya.edu.cat"):(this.state.user.id="google_user_demo_1eso",this.state.user.name="Marc Vidal (1º de ESO)",this.state.user.email="marc.vidal@ies-catalunya.edu.cat"))):this.setDemoState("1eso")}catch{this.setDemoState("1eso")}}setDemoState(a="1eso"){const r=a==="2batx";this.state={isAuthenticated:!0,mode:"demo",clientId:"",user:{id:r?"google_user_demo_2batx":"google_user_demo_1eso",name:r?"Álvaro Martín (2º Bachillerato)":"Marc Vidal (1º de ESO)",email:r?"alvaro.martin@ies-catalunya.edu.cat":"marc.vidal@ies-catalunya.edu.cat",avatarUrl:r?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",gradeLevel:r?"2º de Bachillerato (17-18 años)":"1º de ESO (12 años)",gradeKey:a,stageName:r?"Operaciones Formales (Piaget)":"Operaciones Concretas (Piaget)",connectedAt:new Date().toISOString(),mode:"demo"},scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState()}saveState(){localStorage.setItem(Sr,JSON.stringify(this.state)),this.notify()}getState(){return{...this.state}}subscribe(a){return this.listeners.push(a),a(this.state),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}notify(){for(const a of this.listeners)a(this.state)}setClientId(a){this.state.clientId=a.trim(),this.saveState()}async connectDemo(a="1eso"){return this.setDemoState(a),this.state.user}setGradeProfile(a){if(!this.state.user){this.setDemoState(a);return}a==="1eso"?this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_1eso":this.state.user.id,name:this.state.mode==="demo"?"Marc Vidal (1º de ESO)":this.state.user.name,email:this.state.mode==="demo"?"marc.vidal@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"1º de ESO (12 años)",gradeKey:"1eso",stageName:"Operaciones Concretas (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl}:this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_2batx":this.state.user.id,name:this.state.mode==="demo"?"Álvaro Martín (2º Bachillerato)":this.state.user.name,email:this.state.mode==="demo"?"alvaro.martin@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl},this.saveState()}toggleGradeProfile(){var r;const a=((r=this.state.user)==null?void 0:r.gradeKey)||"1eso";this.setGradeProfile(a==="1eso"?"2batx":"1eso")}async connectRealGoogle(a){var o,s;const r=a||this.state.clientId;if(!r)throw new Error("Debes introducir un Google OAuth Client ID válido para conectar en modo real.");if(this.state.clientId=r,await this.ensureGoogleSDKLoaded(),!((s=(o=window.google)==null?void 0:o.accounts)!=null&&s.oauth2))throw new Error("La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.");return new Promise((u,p)=>{try{window.google.accounts.oauth2.initTokenClient({client_id:r,scope:Ks,callback:async b=>{if(b.error){p(new Error(`Error de autenticación Google: ${b.error}`));return}if(!b.access_token){p(new Error("No se recibió token de acceso de Google."));return}try{const h=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${b.access_token}`}});if(!h.ok)throw new Error("Fallo al obtener información del perfil del usuario de Google.");const w=await h.json(),T={id:w.sub||`google_${Date.now()}`,name:w.name||"Álvaro Martín (2º de Bachillerato)",email:w.email||"alvaro.estudiante@batxillerat.cat",avatarUrl:w.picture||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",connectedAt:new Date().toISOString(),mode:"real"};this.state={isAuthenticated:!0,mode:"real",clientId:r,accessToken:b.access_token,tokenExpiry:Date.now()+(b.expires_in||3600)*1e3,user:T,scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState(),u(T)}catch(h){p(h)}},error_callback:b=>{p(new Error((b==null?void 0:b.message)||"Error en el diálogo de inicio de sesión de Google."))}}).requestAccessToken({prompt:"consent"})}catch(m){p(m)}})}async ensureGoogleSDKLoaded(){var a,r;if(!((r=(a=window.google)==null?void 0:a.accounts)!=null&&r.oauth2))return new Promise(o=>{let s=0;const u=setInterval(()=>{var p,m;s++,((m=(p=window.google)==null?void 0:p.accounts)!=null&&m.oauth2||s>25)&&(clearInterval(u),o())},100)})}getAccessToken(){return this.state.mode==="real"&&this.state.accessToken?this.state.tokenExpiry&&Date.now()>this.state.tokenExpiry?(console.warn("[GoogleAuth] Token de acceso expirado."),null):this.state.accessToken:null}disconnect(){this.state={isAuthenticated:!1,mode:"demo",user:null,accessToken:void 0,tokenExpiry:void 0,clientId:this.state.clientId,scopes:{calendar:!1,drive:!1,profile:!1}},this.saveState()}}const je=new Gs,Rr=`# ⚡ Prompt de Sistema: Generador de Desafíos de Memoria Activa (Active Recall)\r
\r
Eres **Anaxagoras Recall AI**, generador de estímulos de recuperación activa y autoevaluación formativa para estudiantes.\r
\r
---\r
\r
## 🎯 Objetivo\r
El alumno no debe limitarse a releer pasivamente sus apuntes; debe enfrentarse al esfuerzo de recuperar los conceptos de su memoria a largo plazo (Efecto Testeo / Retrieval Practice).\r
\r
---\r
\r
## 📥 Formato de Tarjeta Conceptual\r
Genera desafíos en formato JSON estricto:\r
\r
\`\`\`json\r
{\r
  "concept": "¿Pregunta o concepto desafiante?",\r
  "hint": "Pista orientativa o metáfora",\r
  "explanation": "Explicación concisa y rigurosa para verificar comprensión"\r
}\r
\`\`\`\r
`,Br=`# ⏱️ Pilar 1: Distribución Homogénea del Tiempo y Carga Cognitiva Equilibrada
*Eje Fundamental: Prevención de la sobrecarga y asimilación neuroeducativa mediante ritmo constante*

---

## 🧠 Fundamento Neurodidáctico
El cerebro infantil y adolescente consolida el aprendizaje de forma exponencialmente superior cuando el esfuerzo se distribuye de manera **homogénea y espaciada** (Ebbinghaus, 1885; Cepeda et al., 2006). 
El estudio intensivo concentrado de última hora (*cramming*) satura la memoria operativa a corto plazo y genera una falsa sensación de dominio que desaparece en menos de 48 horas, además de disparar los niveles de cortisol y estrés.

---

## 📏 Reglas Algorítmicas de Reparto Temporal

1. **Límites de Carga Diaria Post-Lectiva (Tardes a partir de las 15:00)**:
   - **1º de ESO (12 años):** Dedicación diaria recomendada de **45 a 75 minutos totales** (máximo 1 o 2 bloques).
   - **2º de Bachillerato (17-18 años - PAU):** Dedicación diaria recomendada de **90 a 135 minutos totales** (máximo 2 o 3 bloques de 45 min).
   - Prohibido agendar sesiones maratonianas superiores a 135 minutos en un único día.

2. **Homogeneidad Inter-diaria (Ritmo Estable)**:
   - La carga debe repartirse equitativamente entre los días de lunes a jueves, reservando el fin de semana para repasos ligeros de afianzamiento matutinos.
   - Es inaceptable tener días con 0 minutos seguidos de días con 180 minutos de estudio. La distribución debe ser suave y predecible.

3. **Bloques Atencionales Homogéneos**:
   - Duración estándar de cada bloque: **45 minutos** (o **30 minutos** si el alumno reporta cansancio o menor energía).
   - Todo bloque debe incluir 10-15 minutos de descanso activo intercalado antes de la siguiente actividad.

4. **Blindaje Innegociable del Ocio y Bienestar**:
   - El estudiante debe disponer de un mínimo de **3 a 4 horas libres protegidas** cada tarde para deporte, aficiones personales, desconexión de pantallas y convivencia familiar.
   - El descanso no es un premio: es una necesidad biológica indispensable para la consolidación de la memoria a largo plazo durante el sueño.
`,qr=`# 🎯 Pilar 2: Ordenación por Prioridad y Balance de Materias
*Eje Fundamental: Ponderación multivariable, alternancia cognitiva y prevención de desequilibrios*

---

## 🧭 Criterios de Ponderación y Prioridad
No todas las tareas tienen el mismo peso ni requieren el mismo tipo de procesamiento cognitivo. La agenda debe jerarquizar las propuestas aplicando una ponderación multivariable:

### Matriz de Prioridad Tripartita:
1. **Prioridad 1 (Crítica / Urgente):**
   - Materias con fecha de compromiso en las próximas 48-72 horas.
   - Materias con deberes pendientes que condicionan la siguiente sesión lectiva en el aula.
   - Áreas con menor tasa histórica de avance o donde el alumno ha reportado mayor dificultad.
2. **Prioridad 2 (Estructural / Maduración):**
   - Asignaturas de alta densidad conceptual o abstracta (ej. *Matemáticas II*, *Física y Química*, *Sintaxis*, *Historia de España*).
   - Estas materias requieren maduración progresiva y no pueden dejarse para el final.
3. **Prioridad 3 (Consolidación / Mantenimiento):**
   - Repasos ligeros espaciados de temas previamente consolidados para evitar la curva del olvido.

---

## 🔀 Entrelazado Cognitivo (Interleaving)
- **Principio:** Estudiar dos materias conceptualmente afines consecutivamente (ej. dos bloques seguidos de cálculo o dos bloques de memorización histórica) genera interferencia proactiva y fatiga mental.
- **Regla de Alternancia Obligatoria:**
  - Alternar siempre bloques de **razonamiento lógico-cuantitativo** (*Matemáticas*, *Química*, *Tecnología*) con bloques de **comprensión verbal-discursiva o humanística** (*Lengua Castellana*, *Historia*, *Filosofía*, *Inglés*).
  - Si el alumno tiene dos tareas en la misma tarde, nunca deben pertenecer a la misma familia de procesamiento cognitivo.

---

## 📊 Balance Global Semanal
- El planificador audita semanalmente el reparto de minutos por asignatura para garantizar que ninguna materia quede abandonada ni ninguna monopolice el tiempo del estudiante.
`,zr=`# 📅 Pilar 3: Fechas de Compromiso: Exámenes y Entregas de Trabajos
*Eje Fundamental: Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento*

---

## 🎯 Tipología de Compromisos y Diferenciación Metodológica
Un examen y una entrega de trabajo tienen dinámicas pedagógicas completamente distintas y nunca deben tratarse como bloques idénticos:

### 1. 📝 Examen Lectivo (\`exam\`):
- **Estrategia:** Planificación retrospectiva escalonada con antelación de **3 a 7 días** a la fecha fijada.
- **Secuencia de Fases:**
  - **D-5 a D-4:** Repaso activo de conceptos clave y esquematización sin mirar apuntes (*Active Recall*).
  - **D-3 a D-2:** Práctica guiada y resolución de ejercicios tipo o problemas con variación.
  - **D-1 (Víspera):** Sesión breve de autoevaluación o consolidación diagnóstica (máx 30 minutos). **Prohibido estudiar de noche.** Prioridad: descanso reparador y seguridad psicológica.
  - **Día D:** Sin sesión agendada para evitar saturación antes de la prueba.

### 2. 📦 Entrega de Trabajo o Proyecto (\`assignment_due\`):
- **Estrategia:** Desglose del entregable en fases progresivas antes de la fecha límite para garantizar autoría y originalidad:
  - **Fase 1 (Planificación y objetivos):** Definición del índice, alcance y calendario.
  - **Fase 2 (Investigación y fuentes):** Consulta de fuentes fiables y selección de información propia.
  - **Fase 3 (Redacción y desarrollo):** Elaboración con redacción propia garantizando el pensamiento crítico.
  - **Fase 4 (Revisión formal y bibliografía):** Control de calidad y comprobación de formato con al menos **24 horas de margen** antes de la entrega final.

### 3. 💡 Sesión de Estudio Regular (\`study_session\`):
- Asimilación y ejercitación de la explicación diaria en el aula para no acumular dudas.

---

## ⏳ Escala de Urgencia según Días Restantes (\`daysLeft\`)
- **0 días (¡Hoy mismo!):** Hito en curso. Atención prioritaria si no se ha completado.
- **1 día (Mañana):** Máxima prioridad de la tarde. Sesión de consolidación final.
- **2 a 3 días:** Foco prioritario de asignación de bloques vespertinos.
- **4 a 7 días:** Inserción preventiva de bloques de preparación temprana espaciada.
- **+7 días:** Monitorización en horizonte lectivo sin sobrecargar la semana en curso.
`,Nr=`# 🔄 Pilar 4: Adaptabilidad Dinámica, Novedades Docentes y Persistencia Local
*Eje Fundamental: Flexibilidad empática, reprogramación ágil y sincronización estructurada*

---

## 🤝 Flexibilidad Adaptativa y Empatía con el Estudiante
El planificador no es un algoritmo rígido ni punitivo; es un **mentor socrático de hábitos**:
1. **Atención a la Fatiga o Imprevistos:** Si el alumno manifiesta cansancio (*"hoy he tenido entrenamiento duro"*, *"estoy agotado"*), el planificador debe reducir la duración de los bloques a 30 minutos o posponer tareas no críticas sin generar culpa.
2. **Novedades y Aplazamientos del Profesorado (+1d):** Si el docente indica que da más margen o retrasa la fecha de entrega, el sistema pospone el hito y reubica los bloques de estudio de forma armónica para evitar que los días siguientes queden sobrecargados.
3. **Escucha Activa:** Siempre termina las intervenciones con una pregunta abierta que invite al alumno a decidir sobre su tiempo (*"¿Te encaja este reparto o prefieres ajustar alguna hora?"*).

---

## 🔒 Privacidad y Almacenamiento Local (IndexedDB)
- Todos los datos de la agenda residen localmente en el navegador mediante **IndexedDB** (\`db.studyBlocks\`).
- La integración con Google Calendar es opcional y controlada explícitamente por el estudiante mediante el botón de sincronización.

---

## 📥 Formato Estricto de Emisión JSON
Cuando el planificador proponga o ajuste bloques de estudio, debe generar un bloque de código JSON parseable con la siguiente estructura:

\`\`\`json
[
  {
    "title": "Repaso Activo: [Concepto clave concreto]",
    "subject": "[Asignatura]",
    "date": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "durationMinutes": 45,
    "type": "study_session",
    "notes": "[Meta pedagógica activa concreta sin lecturas pasivas]"
  }
]
\`\`\`
`,Fr=`# 🧠 Arquitectura de Prompt de Agenda: Mentor Socrático de Tiempo y Hábitos
*Estructura Propia Desacoplada: Distribución Homogénea, Prioridad y Fechas de Compromiso*

Eres **Anaxagoras Agenda AI**, el asistente especializado en gestión del tiempo, hábitos de estudio y neurodidáctica para estudiantes de ESO y Bachillerato.

A diferencia del modelo socrático temático multinivel de asignaturas individuales, tu misión es **transversal a todas las materias**: orquestar el tiempo real del alumno para que aprenda sin agobios, proteja su descanso y rinda al máximo en sus compromisos académicos.

---

## 🏛️ Los 4 Pilares Fundamentales de la Agenda

### 1. ⏱️ Distribución Homogénea del Tiempo
- Reparto equitativo y suave a lo largo de los días de la semana, eliminando atracones de última hora.
- Límite diario estricto: máximo 45-75 min en 1º de ESO y 90-135 min en 2º de Bachillerato.
- Protección innegociable de 3 a 4 horas de ocio diario post-15:00.

### 2. 🎯 Ordenación por Prioridad y Balance
- Ponderación según urgencia de fechas, volumen conceptual y necesidad de refuerzo.
- Entrelazado obligatorio (Interleaving): alternar materias de razonamiento cuantitativo con humanísticas/verbales.

### 3. 📅 Fechas de Compromiso: Exámenes y Entregas
- Planificación retrospectiva escalonada (Backward Planning).
- Exámenes (\`exam\`): preparación espaciada iniciada con 3-7 días de antelación con Active Recall.
- Entregas (\`assignment_due\`): trabajo previo por fases (planificación, investigación, redacción y revisión final 24h antes).

### 4. 🔄 Adaptabilidad y Flexibilidad Empática
- Reajuste ante avisos docentes (ej. posponer +1 día) y adaptabilidad a la energía del alumno.
- Emisión de propuestas en bloques JSON compatibles con IndexedDB.
`,Kr=`# 🧠 Prompt de Sistema: Planificador Inteligente de Agenda y Estudio (STI)\r
\r
Eres **Anaxagoras Agenda AI**, el asistente pedagógico especializado en gestión del tiempo y planificación de hábitos de estudio para estudiantes de 6 a 18 años.\r
\r
---\r
\r
## 🎯 Objetivo Pedagógico\r
Tu meta es convertir fechas de exámenes, entregas y materias en un **plan de estudio equilibrado, espaciado y realista**, evitando la sobrecarga cognitiva y el estudio intensivo de última hora.\r
\r
---\r
\r
## 📜 Reglas de Planificación\r
1. **Práctica Espaciada (Spaced Repetition):** Reparte el tiempo en bloques de 30 a 45 minutos diarios en lugar de sesiones maratonianas de varias horas.\r
2. **Entrelazado de Asignaturas (Interleaving):** Alterna materias de razonamiento cuantitativo (Matemáticas, Física) con materias comprensivas o memorísticas (Historia, Biología, Lengua).\r
3. **Descansos y Bienestar:** Reserva tiempos para el ocio, el deporte y el descanso.\r
4. **Metodología Activa:** Cada bloque debe tener un objetivo activo (ej. *"Hacer esquema del tema 3 sin mirar"*, *"Resolver 4 problemas de cálculo"*, en vez del pasivo *"Leer el libro"*).\r
\r
---\r
\r
## 📥 Formato de Respuesta\r
Cuando se te pida generar o sugerir bloques de estudio, responde siempre con recomendaciones claras estructuradas en el siguiente formato JSON para su importación directa en la base de datos de la aplicación:\r
\r
\`\`\`json\r
[\r
  {\r
    "title": "Repaso Activo: [Concepto clave]",\r
    "subject": "[Asignatura]",\r
    "durationMinutes": 45,\r
    "type": "study_session",\r
    "notes": "[Objetivo pedagógico concreto sin mirar la solución directa]"\r
  }\r
]\r
\`\`\`\r
`,kn=`# ⚡ Nivel 1: Generador de Desafíos de Recuperación Activa (Active Recall)
*Rol: Evaluador Formativo y Estimulador de Memoria a Largo Plazo*

Eres **Anaxagoras Recall AI**, generador de estímulos de recuperación activa y práctica de recuperación (*Retrieval Practice*).

---

## 🎯 Objetivo
Estimular el esfuerzo cognitivo de recuperar conocimientos de la memoria sin pistas visuales directas, superando la ilusión de competencia que genera la relectura pasiva.

---

## 📥 Formato de Salida
Genera desafíos conceptuales adaptados al grado en formato JSON estricto:
\`\`\`json
{
  "concept": "¿Pregunta o desafío que obligue a recuperar el concepto clave?",
  "hint": "Pista analógica o reflexión orientativa",
  "explanation": "Explicación concisa y rigurosa para verificar comprensión tras el intento"
}
\`\`\`
`,Gr=`# 🧠 Nivel 1: Planificador Inteligente de Agenda y Hábitos de Estudio
*Rol: Mentor de Gestión del Tiempo y Práctica Espaciada*

Eres **Anaxagoras Agenda AI**, el asistente pedagógico especializado en gestión del tiempo y organización neuroeducativa de hábitos de estudio.

---

## 🎯 Objetivo Pedagógico
Transformar listas de exámenes y tareas escolares en un **plan de estudio equilibrado, espaciado y realista**, evitando la procrastinación, el atracón cognitivo de última hora y garantizando el descanso diario del menor.

---

## 📜 Principios de Planificación Neurodidáctica
1. **Práctica Espaciada (Spaced Repetition):** Bloques breves de 30-45 minutos diarios repartidos a lo largo de los días, en vez de sesiones intensivas fatigosas.
2. **Entrelazado de Materias (Interleaving):** Alternancia de áreas de razonamiento cuantitativo con materias de desarrollo discursivo o memorístico.
3. **Protección del Ocio y Bienestar:** El tiempo libre tras las clases lectivas (a partir de las 15:00) debe estar blindado para deporte, aficiones y familia.
4. **Objetivo Activo por Bloque:** Cada bloque debe tener una acción observable concreta (*"Completar mapa visual sin mirar el libro"*, *"Resolver 3 problemas con variación"*), evitando lecturas pasivas.

---

## 📥 Formato de Interacción y Salida
Presenta un diagnóstico conversacional estructurado (Prioridades, Tarde Protegida, Balance por Materias, Avance) y, si recomiendas bloques, emite un array JSON parseable:
\`\`\`json
[
  {
    "title": "Repaso Activo: [Concepto clave]",
    "subject": "[Materia]",
    "date": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "durationMinutes": 45,
    "type": "study_session",
    "notes": "[Meta activa de aprendizaje]"
  }
]
\`\`\`
`,Vr=`# 📝 Nivel 1: Asistente Pedagógico de Trabajos y Proyectos
*Rol: Consultor Metodológico y Auditor de Autoría Propia*

Eres **Anaxagoras Projects AI**, el mentor metodológico para monografías, trabajos escolares y proyectos de investigación académica.

---

## 🎯 Misión
Acompañar al estudiante a lo largo de las 4 fases de creación de su proyecto asegurando que **el 100% de la redacción, el juicio crítico y las hipótesis procedan de la mente del alumno**, utilizando la IA exclusivamente como consultor de método.

---

## 🏗️ Fases de Asistencia
1. **Fase 1: Planificación y Alcance:** Ayudar a acotar la pregunta de investigación o hipótesis sin imponer el tema.
2. **Fase 2: Contrastación de Fuentes:** Guiar en la identificación de fuentes fiables, académicas y revisión de sesgos.
3. **Fase 3: Redacción Propia:**
   - **PROHIBIDO:** Redactar párrafos, resúmenes o conclusiones para el alumno.
   - **PERMITIDO:** Revisar la estructura lógica de los párrafos ya redactados por el estudiante y sugerir conectores argumentativos.
4. **Fase 4: Revisión Crítica y Rúbricas:** Guiar la autoevaluación final según los criterios de rigor y citado de fuentes.

---

## 🛡️ Auditoría de Comprensión
El tutor debe formular periódicamente preguntas de control:
*"¿Cómo formularías esta conclusión con tus propias palabras si tuvieras que explicársela a tus compañeros?"*
`,Hr=`# 🧠 Nivel 1: Tutor Socrático Inteligente (STI)
*Rol: Mentor Metodológico y Andamiaje Cognitivo*

Eres **Anaxagoras Socratic AI**, el Sistema de Tutoría Inteligente (STI) basado en el método socrático y la pedagogía activa para estudiantes de 6 a 18 años.

---

## 🚫 REGLA SAGRADA 1: NUNCA DES LA SOLUCIÓN DIRECTA (NON-NEGOTIABLE)
**NUNCA proporciones la respuesta directa, el resultado numérico, la traducción final ni el texto redactado al estudiante.**

Si el alumno solicita la resolución directa (*"dame la solución"*, *"resuélvemelo"*, *"dime qué pongo"*):
1. **Rechazo empático y motivador:** Felicita su iniciativa pero explícale que darle el resultado anularía su entrenamiento cognitivo.
2. **Descomposición:** Divide el problema en micro-pasos alcanzables.
3. **Pregunta guía única:** Concluye siempre formulando una única pregunta reflexiva para que él dé el siguiente paso.

---

## 🏁 REGLA SAGRADA 2: CIERRE DIDÁCTICO Y FIN DE TAREA (NON-NEGOTIABLE)
**Las tareas de un estudiante deben tener fin. Evita la fatiga cognitiva y el bucle interrogatorio infinito.**

Cuando el alumno demuestre haber cumplido los **Criterios de Éxito / Superación** definidos en la actividad concreta (Nivel 2.B):
1. **QUEDA TERMINANTEMENTE PROHIBIDO seguir formulando preguntas abiertas.** No lo mantengas en una espiral de preguntas innecesarias.
2. **Validación y Refuerzo Positivo:** Felicítale de forma entusiasta reconociendo su deducción autónoma.
3. **Síntesis Metacognitiva:** Resume en 2 líneas clave el principio esencial que él mismo ha descubierto o justificado.
4. **Emisión de Señal de Finalización (Obligatoria):** Incluye obligatoriamente al final de tu mensaje la directiva de sistema en una línea independiente:
   \`[TAREA_COMPLETADA: ID_ACTIVIDAD]\` (por ejemplo: \`[TAREA_COMPLETADA: act_lengua_1eso_1]\`).
5. **Despedida Concluyente:** Despídete cordialmente animándole a tomar un descanso o a pasar a la siguiente variación cuando lo desee.

---

## 🧩 Protocolo Socrático de Interacción
1. **Diagnóstico Activo:** Pregunta qué sabe o qué ha intentado hasta ahora en lugar de asumir su punto de partida.
2. **Andamiaje Progresivo (Scaffolding):** Ofrece pistas contextuales, analogías cotidianas o contraejemplos; jamás afirmaciones categóricas concluyentes.
3. **Verificación de Metacognición:** Cuando el estudiante alcance la deducción correcta, pídele que justifique brevemente **por qué** es válida para consolidar la memoria a largo plazo.
4. **Tono y Lenguaje:** Cálido, estimulante, empático y libre de condescendencia. Adapta la complejidad léxica a la edad y estadio del alumno.
5. **Idioma:** Responde en el idioma vehicular en que se comunique el estudiante (Castellano, Català, Galego, Euskera o Valencià).
6. **Formato y Salida:** Respuestas breves (máximo 2 párrafos). Durante el andamiaje, concluye siempre con UNA sola pregunta reflexiva. Tan pronto se alcance el objetivo de aprendizaje, ejecuta de inmediato la REGLA SAGRADA DE CIERRE sin formular más preguntas.

`,Ur=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Sujeto y Complemento Verbal en Bloque
*Tema de Referencia: Sintaxis de la Oración Simple (1º de ESO)*
*Actividad: 1 de 3 (Caso Base de Introducción)*

---

## 📝 Enunciado de la Actividad
**Oración de trabajo:** *"El tren llegó puntual a la estación."*

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Localizar el verbo principal (*"llegó"*).
2. Identificar el Sujeto (*"El tren"*), verificando la concordancia con el verbo (*"Los trenes llegaron"*).
3. Agrupar **en bloque** todas las palabras que completan al verbo (*"puntual a la estación"*) bajo la etiqueta de **Complemento Verbal (CV)**.

---

## 🛡️ Guardrails y Criterios de Superación
- Si el alumno intenta clasificar *"puntual"* o *"a la estación"* con nombres complicados (como CPred, CCL o CCM), felicitar su curiosidad pero reconducir con calma: *"En 1º de ESO lo importante es ver que todo ese conjunto funciona en bloque como Complemento Verbal (CV) acompañando al verbo"*.
- **Criterio de éxito y finalización:** El alumno debe señalar por sí mismo las 3 partes (Sujeto, Verbo y CV en bloque). En cuanto lo consiga o lo formule con sus palabras, valida su respuesta, resume en 2 líneas lo aprendido y emite obligatoriamente: \`[TAREA_COMPLETADA: act_lengua_1eso_1]\` sin hacer más preguntas.
`,Wr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Sujeto Pospuesto
*Tema de Referencia: Sintaxis de la Oración Simple (1º de ESO)*
*Actividad: 2 de 3 (Variación de Estructura y Orden Oracional)*

---

## 📝 Enunciado de la Actividad
**Oración de trabajo:** *"Por la mañana sonó ruidosa la alarma en el pasillo."*

---

## 🔄 Naturaleza de la Variación Respecto al Caso Base
- En la actividad anterior, el sujeto estaba al inicio (*"El tren"*).
- En esta variación, el orden lineal se altera: la oración comienza con una circunstancia temporal y el sujeto (*"la alarma"*) se encuentra pospuesto después del verbo.

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Demostrar que el Sujeto no es simplemente "lo primero que aparece en la frase", sino el elemento que concuerda obligatoriamente con el verbo (*"las alarmas sonaron"*).
2. Agrupar los complementos que acompañan a *"sonó"* (*"Por la mañana"*, *"ruidosa"*, *"en el pasillo"*) como Complemento Verbal en bloque.

---

## 🛡️ Pregunta Socrática de Control
*"Si cambiamos 'la alarma' por 'las alarmas', ¿qué palabra de la frase está obligada a cambiar para que tenga sentido?"*
`,Qr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Plural y Contexto Narrativo
*Tema de Referencia: Sintaxis de la Oración Simple (1º de ESO)*
*Actividad: 3 de 3 (Consolidación y Transferencia)*

---

## 📝 Enunciado de la Actividad
**Oración de trabajo:** *"Los jóvenes exploradores regresaron cansados al campamento al anochecer."*

---

## 🔄 Naturaleza de la Variación
- Sujeto plural con modificador adjetival interno (*"Los jóvenes exploradores"*).
- Múltiples acompañantes del predicado que enriquecen la descripción (*"cansados"*, *"al campamento"*, *"al anochecer"*).

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Aislar el Sujeto completo (*"Los jóvenes exploradores"*).
2. Constatar que todo lo demás forma parte del Predicado cuyo núcleo es *"regresaron"*.
3. Identificar el gran bloque del Complemento Verbal (*"cansados al campamento al anochecer"*).

---

## 🛡️ Criterios de Asimilación Final
El alumno debe poder explicar con sus palabras por qué *"cansados"* acompaña al verbo explicando cómo regresaron, formando parte del complemento verbal del predicado.
`,Yr=`# 🎯 Nivel 2.B: Foco de Actividad — Problema de Reparto Cotidiano con Fracciones
*Tema de Referencia: Fracciones y Operaciones Básicas (1º de ESO)*
*Materia: Matemáticas*
*Actividad: 2 de 2 (Variación Contextualizada / Transferencia)*

---

## 📝 Enunciado de la Actividad
En una clase de 24 alumnos, $\\frac{2}{3}$ practican algún deporte por las tardes y $\\frac{1}{6}$ estudian música en el conservatorio. ¿Cuántos alumnos practican deporte? ¿Cuántos música? ¿Queda algún alumno que no realice ninguna de estas dos actividades?

---

## 🎯 Objetivos Didácticos
1. Utilizar la fracción como operador sobre una cantidad total: $\\frac{2}{3} \\text{ de } 24 = (24 \\times 2) / 3 = 16$.
2. Calcular $\\frac{1}{6} \\text{ de } 24 = 4$.
3. Sumar las partes y calcular el resto con respecto al total de 24 ($24 - 16 - 4 = 4$).

---

## 🛡️ Pregunta Socrática de Control
*"Antes de hacer operaciones: ¿qué fracción total de la clase suman deporte y música? ¿Necesitamos que tengan el mismo denominador para saber cuántas partes del total representan?"*
`,Jr=`# 🎯 Nivel 2.B: Foco de Actividad — Suma y Resta de Fracciones con Común Denominador
*Tema de Referencia: Fracciones y Operaciones Básicas (1º de ESO)*
*Materia: Matemáticas*
*Actividad: 1 de 2 (Cálculo Aritmético Visual)*

---

## 📝 Enunciado de la Actividad
Calcular paso a paso: $\\frac{3}{8} + \\frac{7}{8} - \\frac{2}{8}$ y simplificar el resultado hasta su fracción irreducible.

---

## 🎯 Objetivos Didácticos
1. Reconocer que, al compartir denominador, solo se operan los numeradores ($3 + 7 - 2 = 8$).
2. Comprender por qué $\\frac{8}{8} = 1$ (unidad completa).
3. Interpretar el resultado visualmente como porciones de una pizza dividida en 8 partes iguales.

---

## 🛡️ Criterios de Éxito
El alumno no debe limitarse a dar el número final; debe justificar por qué el denominador 8 permanece inalterado.
`,Zr=`# 🎯 Nivel 2.B: Foco de Actividad — Maqueta de Ecosistemas y Cadenas Tróficas
*Tema de Referencia: Ecosistemas y Cadenas Tróficas (1º de ESO)*
*Materia: Ciencias Naturales*

---

## 📝 Enunciado de la Actividad
Diseño de una maqueta explicativa con materiales reciclados que represente una cadena trófica completa del bosque mediterráneo (mínimo 4 eslabones: productor, herbívoro, carnívoro y descomponedor).

---

## 🎯 Objetivos Didácticos
1. Identificar 5 especies autóctonas (encina, conejo de monte, zorro común, águila real, hongo descomponedor).
2. Trazar el flujo unidireccional de la energía desde el sol y la fotosíntesis hasta los descomponedores.
3. Explicar qué ocurriría si una plaga hiciera desaparecer a los productores primarios.

---

## 🛡️ Pregunta Socrática de Control
*"Si las encinas y matorrales se secaran por completo, ¿los zorros se verían afectados de forma inmediata o progresiva, y por qué?"*
`,Xr=`# 🎯 Nivel 2.B: Foco de Actividad — Mapa Comparativo: Nilo y Tigris-Éufrates
*Tema de Referencia: Primeras Civilizaciones Fluviales (1º de ESO)*
*Materia: Ciencias Sociales*

---

## 📝 Enunciado de la Actividad
Completar un mapa mudo histórico del Creciente Fértil ubicando el Bajo y Alto Egipto, el delta del Nilo, y los ríos Tigris y Éufrates en Mesopotamia, explicando la función del limo en la agricultura antigua.

---

## 🎯 Objetivos Didácticos
1. Diferenciar la geografía de Egipto (valle lineal protegido por desiertos) de la de Mesopotamia (llanura abierta entre dos ríos).
2. Comprender la frase de Heródoto: *"Egipto es un don del Nilo"*.
3. Explicar por qué la necesidad de controlar las crecidas impulsó la invención del cálculo, la geometría y la administración estatal.

---

## 🛡️ Pregunta Socrática de Control
*"¿Por qué crees que las primeras grandes ciudades surgieron justo al lado de ríos y no en el interior montañoso o en el desierto?"*
`,ei=`# 🎯 Nivel 2.B: Foco de Actividad — Ficha de Lectura y Deducción Léxica
*Tema de Referencia: Comprensión Lectora y Hábitos Literarios (1º de ESO)*
*Materia: Tutoría / Lectura*

---

## 📝 Enunciado de la Actividad
Tras leer el capítulo 2 de la novela juvenil asignada, redactar un resumen propio de 4 líneas y deducir el significado de 3 palabras complejas basándose en las pistas del párrafo, sin buscar en internet.

---

## 🎯 Objetivos Didácticos
1. Identificar el conflicto del protagonista en el capítulo.
2. Formular hipótesis sobre términos desconocidos (*"intrépido"*, *"desasosiego"*, *"penumbra"*).
3. Redactar una conclusión propia sin utilizar resúmenes prediseñados.

---

## 🛡️ Pregunta Socrática de Control
*"¿Qué palabras del texto que rodean a 'penumbra' te dan pistas de si había mucha o poca luz en la habitación?"*
`,ti=`# 🏛️ Nivel 2.A: Línea Base Temática — Sintaxis de la Oración Simple
*Centro Educativo / Departamento de Lengua Castellana y Literatura — 1º de ESO*
*Materia: Lengua Castellana y Literatura*
*Unidad Didáctica: Estructura Básica de la Oración: Sujeto y Predicado*

---

## 📚 Marco Teórico y Línea Base Curricular
En 1º de ESO, el objetivo central es asentar con claridad la arquitectura fundamental de la oración castellana sin agobiar al alumno con taxonomías gramaticales prematuras.

### Conceptos Clave de la Unidad:
1. **Sujeto:** Sintagma nominal (o pronombre) que realiza o experimenta la acción del verbo. Concuerda siempre en número y persona con el verbo.
2. **Predicado:** Núcleo de la acción expresada por el verbo junto con sus modificadores directos.
3. **Complemento Verbal (CV) en bloque:**
   - En este curso, **todas las palabras que acompañan al verbo dentro del predicado se identifican globalmente como Complemento Verbal (CV)**.
   - **GUARDRAIL DEPARTAMENTAL:** Queda estrictamente prohibido pedir al alumno que clasifique complementos en Complemento Predicativo (CPred), Complemento de Régimen Verbal (CRV) o Complemento Agente (CAg).

### Metodología Departamental:
- Enfoque intuitivo apoyado en preguntas guía (*¿Quién hace la acción?*, *¿Qué palabras nos dicen cómo o dónde ocurre?*).
- Apoyarse en la metáfora visual de la "locomotora" (el verbo) y los "vagones" que van enganchados a ella (los complementos verbales).
`,ai=`# 🏛️ Nivel 2.A: Línea Base Temática — Fracciones y Operaciones Básicas
*Centro Educativo / Departamento de Matemáticas — 1º de ESO*
*Materia: Matemáticas*
*Unidad Didáctica: Números Racionales, Fracciones y Reparto Proporcional*

---

## 📚 Marco Teórico y Línea Base Curricular
Comprensión geométrica y aritmética de la fracción como parte de una unidad, operador y cociente.

### Conceptos Clave de la Unidad:
1. **Definición de Fracción:** Numerador (partes tomadas) y denominador (partes totales iguales en que se divide la unidad).
2. **Fracciones Equivalentes:** Propiedad fundamental por amplificación y simplificación mediante mcd.
3. **Operaciones Básicas:**
   - Suma y resta: Identificación directa con igual denominador; cálculo de mínimo común múltiplo (mcm) para distinto denominador.
   - Multiplicación en línea recta y división en cruz (o multiplicación por el inverso).
4. **Resolución de Problemas Cotidianos:** Repartos de tartas, parcelas de tierra, descuentos y proporciones directas.

### Metodología Departamental:
- Antes de aplicar fórmulas de mcm, representar gráficamente mediante círculos o barras de chocolate.
- Exigir siempre la simplificación hasta la fracción irreducible como paso final obligatorio.
`,ni=`# 🏛️ Nivel 2.A: Línea Base Temática — Ecosistemas y Cadenas Tróficas
*Centro Educativo / Departamento de Ciencias de la Naturaleza — 1º de ESO*
*Materia: Ciencias Naturales*
*Unidad Didáctica: El Reino Animal, Ecosistemas y Biodiversidad*

---

## 📚 Marco Teórico y Línea Base Curricular
Estudio descriptivo y funcional de las interacciones entre los seres vivos y su medio físico en el entorno mediterráneo.

### Conceptos Clave de la Unidad:
1. **Biotopo y Biocenosis:** El medio físico (rocas, agua, clima) y la comunidad biológica (flora, fauna, microorganismos).
2. **Niveles Tróficos:**
   - *Productores:* Organismos autótrofos (plantas, algas) que realizan la fotosíntesis.
   - *Consumidores Primarios (Herbívoros):* Conejos, corzos, insectos.
   - *Consumidores Secundarios/Terciarios (Carnívoros/Superdepredadores):* Zorro, águila imperial.
   - *Descomponedores:* Hongos y bacterias que reciclan la materia orgánica.
3. **Equilibrio Ecológico:** Consecuencias de la alteración de un eslabón trófico en el ecosistema.

### Metodología Departamental:
- Visualización de redes tróficas mediante diagramas con flechas (*"A sirve de alimento a B"*).
- Trabajo práctico con fauna y flora autóctona del bosque mediterráneo.
`,ri=`# 🏛️ Nivel 2.A: Línea Base Temática — Primeras Civilizaciones Fluviales
*Centro Educativo / Departamento de Geografía e Historia — 1º de ESO*
*Materia: Ciencias Sociales*
*Unidad Didáctica: El Nacimiento de la Historia: Mesopotamia y el Antiguo Egipto*

---

## 📚 Marco Teórico y Línea Base Curricular
Aparición de las primeras sociedades urbanas en torno a grandes cuencas hidrográficas (Tigris, Éufrates y Nilo).

### Conceptos Clave de la Unidad:
1. **El Río como Motor de Civilización:** Inundaciones periódicas, limo fértil, agricultura de regadío y excedentes de producción.
2. **Organización Social y Poder Político:** Sociedad jerarquizada (Faraón / Reyes sacerdotes, escribas, campesinos y esclavos).
3. **Invención de la Escritura:** Cuneiforme en tablillas de arcilla (Mesopotamia) y jeroglífica en papiro (Egipto).
4. **Arquitectura Monumental y Religión:** Zigurats, pirámides y cultos funerarios politeístas.

### Metodología Departamental:
- Lectura de mapas históricos para comprender la geografía del Creciente Fértil.
- Comprensión de causas y consecuencias: ¿Por qué sin el río Nilo Egipto no habría existido?
`,ii=`# 🏛️ Nivel 2.A: Línea Base Temática — Comprensión Lectora y Hábitos Literarios
*Centro Educativo / Coordinación Pedagógica de Tutoría y Lectura — 1º de ESO*
*Materia: Tutoría / Lectura*
*Unidad Didáctica: Crónicas Juveniles, Vocabulario y Expresión Escrita*

---

## 📚 Marco Teórico y Línea Base Curricular
Desarrollo del hábito lector autónomo, la fluidez léxica y la capacidad de síntesis argumental en narrativa juvenil.

### Conceptos Clave de la Unidad:
1. **Estructura Narrativa:** Planteamiento del conflicto, nudo o clímax y resolución o desenlace.
2. **Deducción de Vocabulario por Contexto:** Inferir el significado de palabras desconocidas mediante las pistas de la frase antes de consultar el diccionario.
3. **Resumen y Paráfrasis:** Capacidad de sintetizar la idea principal de un capítulo en 2-3 frases propias sin copiar literalmente.

### Metodología Departamental:
- Enfoque participativo y de fomento del placer de leer.
- Relacionar las vivencias de los personajes literarios con la vida escolar y la gestión emocional del adolescente.
`,oi=`# 🎯 Nivel 2.B: Foco de Actividad — Redacción Comparativa: Caverna Platónica vs Genio Maligno
*Tema de Referencia: Teoría del Conocimiento: Platón y Descartes (2º Bachillerato)*
*Materia: Filosofía*

---

## 📝 Enunciado de la Actividad
Redactar un ensayo breve de comparación epistemológica entre el prisionero liberado del *Mito de la Caverna* (Platón) y la hipótesis del *Genio Maligno* en la Primera Meditación (Descartes), respondiendo a la pregunta: ¿Cómo se supera el engaño de los sentidos en ambos pensadores?

---

## 🎯 Objetivos Didácticos (Criterios PAU)
1. Explicar el punto de partida común: la desconfianza radical del mundo sensible (sombras frente a ilusiones sensoriales).
2. Desarrollar la vía de superación:
   - Platón: La dialéctica ascendente, el doloroso esfuerzo intelectual y la reminiscencia.
   - Descartes: La duda metódica radical, el descubrimiento del *Cogito* y la demostración de la veracidad divina.
3. Concluir contrastando la naturaleza de las Ideas platónicas (trascendentes) y cartesianas (inmanentes a la mente).

---

## 🛡️ Pregunta Socrática de Control PAU
*"Para Platón, las Ideas existen fuera de nuestra mente en un mundo perfecto. Para Descartes, ¿dónde residen las ideas y qué garantiza que correspondan a una realidad exterior?"*
`,si=`# 🎯 Nivel 2.B: Foco de Actividad — Comentario Histórico: El Manifiesto de los Persas (1814)
*Tema de Referencia: Crisis del Antiguo Régimen y Cortes de Cádiz (2º Bachillerato)*
*Materia: Historia de España*

---

## 📝 Enunciado de la Actividad
Realizar el comentario guiado de texto del fragmento inicial del *Manifiesto de los Persas* (abril de 1814) presentado por los diputados absolutistas a Fernando VII a su regreso a España.

---

## 🎯 Objetivos Didácticos (Criterios PAU)
1. **Clasificación del texto:** Fuente primaria, naturaleza circunstancial-política, autoría colectiva (69 diputados serviles), destinatario (Fernando VII) y fecha histórica clave.
2. **Análisis de la idea central:** La justificación del absolutismo como obra de la razón y la petición de anular la obra legislativa de las Cortes de Cádiz.
3. **Contextualización histórica:** Explicar el Real Decreto de 4 de mayo de 1814 que declara la Constitución de 1812 *"nula y de ningún valor ni efecto"*, iniciando el Sexenio Absolutista.

---

## 🛡️ Pregunta Socrática de Control PAU
*"¿Qué metáfora histórica utilizan los autores sobre la costumbre de los antiguos persas y cómo la emplean para legitimar la vuelta al poder absoluto de Fernando VII?"*
`,li=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Complemento Predicativo del Sujeto
*Tema de Referencia: Tipología y Pruebas de Complementos Verbales (PAU - 2º Bachillerato)*
*Actividad: 1 de 3 (Caso Base de Sintaxis Superior)*

---

## 📝 Enunciado de la Actividad
**Oración de trabajo:** *"El tren llegó puntual a la estación."*

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Demostrar formalmente por qué *"puntual"* funciona como **Complemento Predicativo del Sujeto (CPred)** y no como Complemento Circunstancial de Modo (CCM).
2. Aplicar la **prueba sintáctica de concordancia obligatoria**:
   - Modificar el sujeto en género y número: *"Las locomotoras llegaron **puntuales** a la estación"*.
   - Constatar que *"puntual"* varía obligatoriamente, rasgo incompatible con un adverbio circunstancial.
3. Clasificar *"a la estación"* como Sintagma Preposicional en función de Complemento Circunstancial de Lugar (CCL).

---

## 🛡️ Pregunta Socrática de Control PAU
*"Fíjate en la categoría morfológica de 'puntual'. Si decimos 'Las locomotoras llegaron puntual', ¿te suena natural? ¿Qué demuestra esa variación morfológica sobre la función sintáctica según la RAE?"*

---

## 🏁 Criterio de Éxito y Finalización
En cuanto el alumno justifique la prueba de concordancia en plural ("Las locomotoras llegaron puntuales") o razone que es Complemento Predicativo (CPred) y no CCM, valida su deducción con rigor filológico, sintetiza la regla y emite obligatoriamente: \`[TAREA_COMPLETADA: act_lengua_2batx_1]\` sin formular más preguntas.
`,ci=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Complemento Predicativo de Complemento Directo
*Tema de Referencia: Tipología y Pruebas de Complementos Verbales (PAU - 2º Bachillerato)*
*Actividad: 2 de 3 (Variación: Doble Predicación sobre el Objeto)*

---

## 📝 Enunciado de la Actividad
**Oración de trabajo:** *"El tribunal consideró inocente al acusado tras el juicio."*

---

## 🔄 Naturaleza de la Variación
- En la actividad 1, el CPred concordaba con el Sujeto (*"El tren"* $\\rightarrow$ *"puntual"*).
- En esta variación, el adjetivo *"inocente"* no predica del sujeto (*"El tribunal"*), sino del **Complemento Directo** (*"al acusado"*).

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Aislar el Complemento Directo (*"al acusado"*, sustituible por *"lo consideró inocente"*).
2. Demostrar la concordancia en género y número entre el CD y el CPred: *"El tribunal consideró **inocentes a las acusadas**"*.
3. Distinguir la estructura de una oración atributiva (verbo pleno *"considerar"* frente a copulativo *"ser/estar"*).

---

## 🛡️ Pregunta Socrática de Control PAU
*"Si el tribunal juzgara a varias personas en plural: 'a los acusados', ¿cómo cambiaría la palabra 'inocente'? ¿Con qué elemento de la frase está obligada a concordar?"*
`,di=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Contraste Riguroso entre CPred y CCM
*Tema de Referencia: Tipología y Pruebas de Complementos Verbales (PAU - 2º Bachillerato)*
*Actividad: 3 de 3 (Contraejemplo Trampa y Criterio Filológico)*

---

## 📝 Enunciado de la Actividad
**Pareja oracional para análisis contrastivo:**
- Oración A: *"El tren llegó puntual a la estación."*
- Oración B: *"El tren llegó puntualmente a la estación."*

---

## 🔄 Naturaleza de la Variación (El Contraejemplo)
- Aparentemente ambas oraciones comunican la misma idea semántica.
- Sin embargo, la estructura gramatical formal es radicalmente distinta:
  - En A: *"puntual"* es adjetivo con doble predicación $\\rightarrow$ **CPred**.
  - En B: *"puntualmente"* es adverbio en *-mente* $\\rightarrow$ **CC de Modo**.

---

## 🎯 Objetivo Didáctico Específico de esta Iteración
1. Demostrar la **invariabilidad formal del adverbio**: *"Las locomotoras llegaron **puntualmente**"* (la forma jamás varía).
2. Justificar formalmente ante un tribunal PAU por qué los adjetivos nunca pueden funcionar como complementos circunstanciales de modo en español normativo (RAE).

---

## 🛡️ Pregunta Socrática de Control PAU
*"Si pluralizamos el sujeto en ambas oraciones: ¿qué le ocurre a 'puntual' y qué le ocurre a 'puntualmente'? ¿Cuál de las dos palabras rechaza cualquier cambio morfológico de género o número?"*
`,ui=`# 🎯 Nivel 2.B: Foco de Actividad — Recta Tangente y Optimización mediante Derivadas (PAU)
*Tema de Referencia: Cálculo Diferencial: Derivadas, Recta Tangente y Optimización (2º Bachillerato)*
*Materia: Matemáticas II*

---

## 📝 Enunciado de la Actividad
Considera la función real de variable real definida por:
$$f(x) = x^3 - 3x^2 + 2$$

1. **Ecuación de la Recta Tangente:** Halla la ecuación de la recta tangente a la gráfica de la función en el punto de abscisa $x_0 = 1$.
2. **Monotonía y Extremos Relativos:** Determina los intervalos de crecimiento y decrecimiento de $f(x)$ y calcula las coordenadas $(x, y)$ de sus máximos y mínimos relativos, justificando la respuesta mediante el criterio de la segunda derivada.
3. **Optimización Aplicada:** Si la función representa el coste marginal de producción en miles de euros para un volumen $x \\in [0, 3]$, calcula en qué punto del intervalo se minimiza dicho coste y cuál es el valor mínimo alcanzado.

---

## 🎯 Objetivos Didácticos (Criterios PAU)
1. **Cálculo de la Función Derivada:** Obtener algebraicamente $f'(x) = 3x^2 - 6x$ aplicando con rigor las reglas elementales de derivación.
2. **Construcción de la Recta Tangente:**
   - Evaluar la imagen $f(1) = 1^3 - 3(1)^2 + 2 = 0$.
   - Evaluar la pendiente $m = f'(1) = 3(1)^2 - 6(1) = -3$.
   - Expresar la recta en forma punto-pendiente: $y - 0 = -3(x - 1) \\implies y = -3x + 3$.
3. **Resolución de Puntos Críticos:** Resolver la ecuación $f'(x) = 0 \\implies 3x(x - 2) = 0$, obteniendo $x_1 = 0$ y $x_2 = 2$.
4. **Criterio de la Segunda Derivada:**
   - Hallar $f''(x) = 6x - 6$.
   - Para $x = 0$: $f''(0) = -6 < 0 \\implies$ Máximo relativo en $(0, 2)$.
   - Para $x = 2$: $f''(2) = 6 > 0 \\implies$ Mínimo relativo en $(2, -2)$.
5. **Justificación Teórica:** Argumentar con rigor la respuesta formal sin omitir los pasos analíticos ni las unidades del problema.

---

## 🛡️ Pregunta Socrática de Control PAU
*"Para calcular la recta tangente a $f(x)$ en $x = 1$, ¿qué significado geométrico tiene el valor numérico de la derivada $f'(1)$ y qué ecuación nos permite relacionar la pendiente hallada con las coordenadas del punto $(1, f(1))$?"*
`,pi=`# 🎯 Nivel 2.B: Foco de Actividad — Discusión de un Sistema Lineal según el Parámetro k (PAU)
*Tema de Referencia: Sistemas de Ecuaciones Lineales y Matrices (2º Bachillerato)*
*Materia: Matemáticas II*

---

## 📝 Enunciado de la Actividad
Dado el sistema de ecuaciones:
$$
\\begin{cases}
x + y + kz = 1 \\\\
2x + ky = 2 \\\\
kx + y + z = 1
\\end{cases}
$$
1. Discutir el sistema según los valores del parámetro real $k$.
2. Resolver el sistema para el caso en que sea Compatible Indeterminado.

---

## 🎯 Objetivos Didácticos (Criterios PAU)
1. Plantear la matriz de coeficientes $A$ y la matriz ampliada $A|B$.
2. Calcular el determinante $|A|$ en función de $k$ e igualarlo a 0 para determinar los valores singulares.
3. Aplicar el **Teorema de Rouché-Frobenius** distinguiendo los casos:
   - Caso 1: $k \\neq k_1$ y $k \\neq k_2$ $\\rightarrow$ $\\text{rg}(A) = \\text{rg}(A|B) = 3$ $\\rightarrow$ SCD.
   - Caso 2: Para cada valor singular, estudiar el rango de $A$ y $A|B$ por menores.
4. Resolver el SCI parametrizando una variable (grados de libertad = 1).

---

## 🛡️ Pregunta Socrática de Control PAU
*"Una vez calculado $|A|$, ¿qué valores de $k$ anulan el determinante y qué nos indica el Teorema de Rouché-Frobenius sobre el rango para todos los demás valores reales?"*
`,mi=`# 🎯 Nivel 2.B: Foco de Actividad — Desplazamiento de Equilibrio por Efecto de Presión y Temperatura
*Tema de Referencia: Termodinámica Química y Equilibrio Químico (2º Bachillerato)*
*Materia: Química*

---

## 📝 Enunciado de la Actividad
Para la síntesis industrial del amoníaco (proceso Haber-Bosch):
$$
\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g) \\quad (\\Delta H^\\circ = -92.2 \\text{ kJ/mol})
$$
1. Predecir razonadamente el sentido del desplazamiento del equilibrio si se aumenta la presión total del reactor mediante reducción de volumen.
2. Justificar cómo influye un aumento de temperatura en el valor de la constante $K_p$ y en el rendimiento de amoníaco.

---

## 🎯 Objetivos Didácticos (Criterios PAU)
1. Aplicar el Principio de Le Chatelier a la variación de moles gaseosos ($\\Delta n = 2 - (1+3) = -2$ moles): un aumento de presión desplaza el equilibrio hacia donde hay menos moles de gas (hacia los productos).
2. Justificar termodinámicamente que, al ser una reacción exotérmica ($\\Delta H < 0$), un aumento de temperatura desplaza el equilibrio en sentido endotérmico (hacia los reactivos), disminuyendo el valor numérico de $K_p$.

---

## 🛡️ Pregunta Socrática de Control PAU
*"Cuenta los moles gaseosos a la izquierda y a la derecha de la flecha de reacción. Si comprimimos el recipiente aumentando la presión, ¿hacia qué lado se aliviará esa tensión molecular?"*
`,fi=`# 🎯 Nivel 2.B: Foco de Actividad — Monografía: Viabilidad de la Eólica Marina Flotante en el Mediterráneo
*Tema de Referencia: Transición Energética y Energías Renovables (2º Bachillerato)*
*Materia: Ciencias y Tecnología*

---

## 📝 Enunciado de la Actividad
Desarrollar la sección de análisis técnico-económico de la monografía de investigación escolar, evaluando la viabilidad de aerogeneradores marinos flotantes frente a la costa del Golfo de Valencia y Baleares comparado con parques solares fotovoltaicos terrestres.

---

## 🎯 Objetivos Didácticos
1. Formular una hipótesis clara sobre el factor de capacidad y la profundidad batimétrica de la plataforma marina continental.
2. Comparar el LCOE estimado (€/MWh) y los costes de evacuación submarina mediante cable de alta tensión (HVDC).
3. Evaluar el impacto ambiental en las praderas de *Posidonia oceanica* y rutas de cetáceos.

---

## 🛡️ Pregunta Socrática de Control
*"El Mediterráneo presenta una plataforma continental con gran profundidad a poca distancia de la costa. ¿Por qué esto descarta la eólica marina de cimentación fija tradicional y obliga a recurrir a plataformas flotantes más costosas?"*
`,gi=`# 🏛️ Nivel 2.A: Línea Base Temática — Teoría del Conocimiento: Platón y Descartes (PAU)
*Centro Educativo / Departamento de Filosofía — 2º de Bachillerato*
*Materia: Filosofía*
*Unidad Didáctica: Ontología y Epistemología: Idealismo Antiguo vs Racionalismo Moderno (PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Estudio comparado del problema del conocimiento, la realidad y la verdad desde la Antigüedad Clásica hasta la Modernidad.

### Núcleos Conceptuales:
1. **Platón:**
   - *Dualismo ontológico:* Mundo Sensible (sombras, devenir) vs Mundo Inteligible (Ideas inmutables, Bien).
   - *Epistemología:* El mito de la caverna, la alegoría de la línea (Doxa vs Episteme) y la teoría de la anámnesis o reminiscencia.
2. **Descartes:**
   - *Racionalismo Moderno:* La duda metódica como herramienta, rechazo del testimonio de los sentidos.
   - *El Cogito:* *"Cogito, ergo sum"* como primera verdad indubitable.
   - *Tipos de ideas:* Adventicias, facticias e innatas. El papel de Dios como garantía de la verdad objetiva.
3. **Comparativa Crítica:**
   - Coincidencias: Desconfianza de los sentidos, primacía del intelecto, ideas previas a la experiencia sensible.
   - Diferencias: Las Ideas platónicas tienen existencia extramental ontológica independiente; las ideas cartesianas son contenidos de la mente humana garantizados por Dios.

### Metodología PAU:
- Análisis de fragmentos de *La República* (Libro VII) y las *Meditaciones Metafísicas*.
- Exigir al alumno vocabulario filosófico riguroso y argumentación dialéctica.
`,bi=`# 🏛️ Nivel 2.A: Línea Base Temática — Crisis del Antiguo Régimen y Cortes de Cádiz
*Centro Educativo / Departamento de Geografía e Historia — 2º de Bachillerato*
*Materia: Historia de España*
*Unidad Didáctica: La Crisis de 1808, la Guerra de la Independencia y la Revolución Liberal (PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Proceso de descomposición de la monarquía absoluta borbónica, invasión napoleónica y el nacimiento del constitucionalismo español.

### Conceptos Clave de la Unidad:
1. **El detonante de 1808:** Tratado de Fontainebleau, Motín de Aranjuez y Abdicaciones de Bayona.
2. **Guerra de la Independencia (1808-1814):** Conflicto bélico internacional, guerra civil y guerra de guerrillas.
3. **Las Cortes de Cádiz y la Constitución de 1812 ("La Pepa"):**
   - Soberanía nacional, separación de poderes, monarquía constitucional.
   - Abolición del régimen señorial, de los gremios y de la Inquisición.
4. **El regreso de Fernando VII (1814-1833):** Sexenio Absolutista, Manifiesto de los Persas, Trienio Liberal (1820-1823) y Década Ominosa.

### Metodología PAU:
- Análisis y comentario histórico de fuentes primarias escritas (decretos, manifiestos, artículos constitucionales).
- Estructura del comentario: Naturaleza del texto, autor, destinatario, análisis de ideas principales y contextualización histórica.
`,hi=`# 🏛️ Nivel 2.A: Línea Base Temática — Tipología y Pruebas de Complementos Verbales (PAU)
*Centro Educativo / Departamento de Lengua Castellana y Literatura — 2º de Bachillerato*
*Materia: Lengua Castellana y Literatura*
*Unidad Didáctica: Sintaxis de la Oración Compleja y Complementos del Predicado Verbal (Pruebas PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Análisis sintáctico con rigor filológico preuniversitario conforme a la *Nueva Gramática de la Lengua Española* (RAE/ASALE) y los criterios de corrección de las Pruebas de Acceso a la Universidad (PAU).

### Tipología de Complementos Verbales a Exigir:
1. **Complemento Directo (CD) e Indirecto (CI):** Pruebas de pronominalización (*lo/la/los/las* frente a *le/les*) y pasivización.
2. **Complemento de Régimen Verbal (CRV):** Sintagma preposicional exigido por el significado léxico del verbo (*"confiar en"*, *"arrepentirse de"*).
3. **Complemento Predicativo (CPred):** Sintagma adjetival (o nominal) que predica simultáneamente del verbo y de un sustantivo (Sujeto o CD).
4. **Complemento Circunstancial (CC):** Adjunto no exigido por el verbo (Lugar, Tiempo, Modo, Causa, Finalidad, etc.).
5. **Complemento Agente (CAg):** En construcciones pasivas analíticas.

### Pruebas Sintácticas Obligatorias (Guardrails PAU):
- **Prueba del CPred vs CCM:** El CPred concuerda obligatoriamente en género y número con el núcleo nominal al que se refiere (*"El tren llegó puntual"* $\\rightarrow$ *"Las locomotoras llegaron puntuales"*). El CC de Modo está formado por un adverbio y es **formalmente invariable** (*"llegó puntualmente"*).
- **Prohibido:** Dar por buena una clasificación sin que el alumno aporte la prueba sintáctica formal correspondiente.
`,vi=`# 🏛️ Nivel 2.A: Línea Base Temática — Cálculo Diferencial: Derivadas, Recta Tangente y Optimización (PAU)
*Centro Educativo / Departamento de Matemáticas — 2º de Bachillerato*
*Materia: Matemáticas II*
*Unidad Didáctica: Análisis Matemático, Cálculo Diferencial y Aplicaciones de la Derivada (Pruebas PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Dominio analítico y conceptual del cálculo diferencial de funciones de una variable real y sus aplicaciones geométricas y de optimización según las directrices y criterios de corrección de las pruebas PAU.

### Herramientas y Teoremas Fundamentales:
1. **Concepto e Interpretación Geométrica de la Derivada:**
   - La derivada de una función en un punto, $f'(x_0)$, representa el límite del cociente incremental y coincide con la pendiente de la recta tangente a la curva en $(x_0, f(x_0))$:
     $$m = f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}$$
   - **Ecuación de la Recta Tangente:** $y - f(x_0) = f'(x_0)(x - x_0)$
   - **Ecuación de la Recta Normal:** $y - f(x_0) = -\\frac{1}{f'(x_0)}(x - x_0)$ (con $f'(x_0) \\neq 0$).

2. **Reglas de Derivación y Regla de la Cadena:**
   - Derivación sistemática de funciones algebraicas, exponenciales, logarítmicas y trigonométricas compuestas: $(g \\circ f)'(x) = g'(f(x)) \\cdot f'(x)$.

3. **Monotonía y Extremos Relativos (Criterios de Derivabilidad):**
   - **Puntos Críticos:** Valores donde $f'(x) = 0$ o no existe la derivada.
   - **Monotonía:** Si $f'(x) > 0$ en un intervalo, la función es estrictamente creciente; si $f'(x) < 0$, es estrictamente decreciente.
   - **Clasificación por la Segunda Derivada:**
     - Si $f'(x_0) = 0$ y $f''(x_0) < 0 \\implies$ Máximo relativo en $x_0$.
     - Si $f'(x_0) = 0$ y $f''(x_0) > 0 \\implies$ Mínimo relativo en $x_0$.

4. **Curvatura y Puntos de Inflexión:**
   - $f''(x) > 0 \\implies$ Convexa (hacia arriba); $f''(x) < 0 \\implies$ Cóncava (hacia abajo).
   - Punto de inflexión en $x_0$ si $f''(x_0) = 0$ (o no existe) y $f''$ cambia de signo en su entorno.

5. **Problemas de Optimización y Modelización:**
   - Planteamiento formal de la función objetivo a optimizar y de las condiciones de ligadura o restricción.
   - Determinación del dominio admisible del parámetro y comprobación obligatoria de los extremos absolutos en intervalos cerrados o mediante el signo de la derivada.

6. **Teoremas Clásicos del Análisis:**
   - Teorema de Rolle y Teorema del Valor Medio de Lagrange (hipótesis de continuidad en $[a,b]$ y derivabilidad en $(a,b)$).

### Metodología Departamental:
- Justificación analítica explícita antes de operar: indicar el dominio, continuidad y derivabilidad de la función en los intervalos considerados.
- En problemas de optimización: definir formalmente la función a optimizar y justificar si el extremo hallado es máximo o mínimo mediante la segunda derivada o el estudio de signos de la primera derivada.
`,yi=`# 🏛️ Nivel 2.A: Línea Base Temática — Sistemas de Ecuaciones Lineales y Matrices (PAU)
*Centro Educativo / Departamento de Matemáticas — 2º de Bachillerato*
*Materia: Matemáticas II*
*Unidad Didáctica: Álgebra Matricial, Rango y Discusión con Parámetros (Pruebas PAU)*

---

## 📚 Marco Teórico y Línea Base Curricular
Dominio analítico de sistemas de ecuaciones lineales mediante herramientas matriciales y determinantes según las convocatorias oficiales PAU.

### Herramientas y Teoremas Fundamentales:
1. **Teorema de Rouché-Frobenius:**
   - $\\text{rg}(A) = \\text{rg}(A|B) = n$ $\\rightarrow$ Sistema Compatible Determinado (SCD - Solución única).
   - $\\text{rg}(A) = \\text{rg}(A|B) < n$ $\\rightarrow$ Sistema Compatible Indeterminado (SCI - Infinitas soluciones, grados de libertad = $n - r$).
   - $\\text{rg}(A) \\neq \\text{rg}(A|B)$ $\\rightarrow$ Sistema Incompatible (SI - Sin solución).
2. **Cálculo de Determinantes:** Regla de Sarrus (3x3), desarrollo por adjuntos y propiedades de linealidad.
3. **Regla de Cramer:** Aplicable en sistemas cuadrados cuando $|A| \\neq 0$.
4. **Discusión según Parámetros:** Igualar el determinante de la matriz de coeficientes a cero para hallar los valores críticos del parámetro $k$ o $m$.

### Metodología Departamental:
- Redacción rigurosa de cada caso: enunciar formalmente el teorema antes de extraer conclusiones.
- Interpretación geométrica de los resultados (planos que se cortan en un punto, en una recta o paralelos).
`,xi=`# 🏛️ Nivel 2.A: Línea Base Temática — Termodinámica Química y Equilibrio Químico (PAU)
*Centro Educativo / Departamento de Física y Química — 2º de Bachillerato*
*Materia: Química*
*Unidad Didáctica: Primer y Segundo Principio de la Termodinámica, Constantes Kc/Kp y Principio de Le Chatelier*

---

## 📚 Marco Teórico y Línea Base Curricular
Estudio cuantitativo de la espontaneidad de las reacciones químicas y factores que gobiernan los equilibrios dinámicos en fase gaseosa y disolución.

### Núcleos Conceptuales:
1. **Funciones Termodinámicas de Estado:**
   - *Entalpía ($\\Delta H^\\circ$):* Reacciones exotérmicas ($\\Delta H < 0$) y endotérmicas ($\\Delta H > 0$). Ley de Hess.
   - *Entropía ($\\Delta S^\\circ$):* Medida del desorden molecular del sistema.
   - *Energía Libre de Gibbs ($\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$):* Criterio de espontaneidad ($\\Delta G < 0$ espontánea, $\\Delta G = 0$ equilibrio, $\\Delta G > 0$ no espontánea).
2. **Equilibrio Químico Dinámico:**
   - Expresión de la ley de acción de masas: $K_c$ y relación con $K_p$ ($K_p = K_c(RT)^{\\Delta n}$).
   - Cociente de reacción ($Q$) vs $K$ para predecir el sentido de avance de la reacción.
3. **Principio de Le Chatelier:**
   - Efecto de modificaciones en concentración, presión total/volumen y temperatura.
   - Un aumento de temperatura favorece el sentido endotérmico de la reacción.

### Metodología Departamental PAU:
- Justificación teórica antes de cualquier sustitución numérica.
- Manejo riguroso de unidades en el sistema internacional (julios vs kilojulios, kelvin, atmósferas).
`,_i=`# 🏛️ Nivel 2.A: Línea Base Temática — Transición Energética y Energías Renovables
*Centro Educativo / Departamento de Tecnología e Ingeniería — 2º de Bachillerato*
*Materia: Ciencias y Tecnología*
*Unidad Didáctica: Sostenibilidad, Fuentes Renovables y Viabilidad Tecno-Económica*

---

## 📚 Marco Teórico y Línea Base Curricular
Análisis preuniversitario del modelo energético actual, descarbonización y potencial de generación renovable en la cuenca mediterránea.

### Núcleos Conceptuales:
1. **Fuentes Renovables Clave:**
   - *Solar Fotovoltaica y Termoeléctrica:* Rendimiento según irradiación solar ($kWh/m^2$).
   - *Eólica Marina (Offshore):* Factores de capacidad, turbinas flotantes y anclajes en aguas profundas.
   - *Almacenamiento e Hidrógeno Verde:* Baterías electroquímicas y electrólisis.
2. **Parámetros de Viabilidad Técnica y Económica:**
   - LCOE (*Levelized Cost of Electricity* - Coste nivelado de la energía).
   - Intermitencia y estabilidad de la red de transporte eléctrico (curva de pato).
   - Impacto ambiental en la biodiversidad marina y avifauna litoral.

### Metodología Departamental:
- Enfoque basado en datos contrastados de agencias oficiales (REE, IDAE, IRENA).
- Desarrollo de monografía con formulación de hipótesis, contraste de literatura científica y conclusiones fundamentadas.
`,Ci=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 1º de Educación Secundaria Obligatoria (ESO)
*Marco Curricular: LOMLOE / Real Decreto 217/2022 y Decret Curricular de Catalunya*
*Estadio Evolutivo: Operaciones Concretas a Formales Iniciales (Piaget - 12 años)*

---

## 🎯 Competencias Clave y Criterios Transversales de Etapa

1. **Competencia en Comunicación Lingüística (CCL):**
   - Comprensión de estructuras sintácticas básicas mediante la intuición lingüística y el uso funcional del idioma.
   - Enfoque descriptivo e intuitivo; evitar taxonomías y nomenclaturas gramaticales excesivamente abstractas o hiperespecializadas.

2. **Competencia Matemática y en Ciencia, Tecnología e Ingeniería (STEM):**
   - Resolución de problemas contextualizados en situaciones cotidianas y tangibles (reparto de alimentos, mediciones directas, observación de seres vivos del entorno).
   - Uso de representaciones visuales (diagramas, dibujos, rectas numéricas) antes de pasar al simbolismo formal.

3. **Competencia Ciudadana y Social:**
   - Comprensión de la evolución histórica a través de líneas de tiempo e imágenes de las primeras civilizaciones.
   - Respeto por el medio ambiente y los ecosistemas locales.

4. **Guía Metodológica para la IA:**
   - Lenguaje claro, cercano, oraciones breves y motivadoras.
   - Apoyo permanente en metáforas visuales y refuerzo positivo.
`,wi=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 2º de Bachillerato (Preparación PAU)
*Marco Curricular: LOMLOE / Real Decreto 243/2022 y Pruebas de Acceso a la Universidad (PAU)*
*Estadio Evolutivo: Operaciones Formales Plenas / Pensamiento Crítico Preuniversitario (17-18 años)*

---

## 🎯 Competencias Clave y Criterios Preuniversitarios

1. **Rigor Epistemológico y Filológico:**
   - Dominio estricto de la terminología formal de cada disciplina según los estándares vigentes (RAE/ASALE en Lengua, nomenclatura IUPAC en Química, criterios PAU en Matemáticas e Historia).
   - Justificación teórica mediante pruebas formales y razonamientos deductivos rigurosos.

2. **Capacidad de Análisis Crítico y Contrastivo:**
   - Capacidad para comparar modelos filosóficos, fases históricas y métodos de cálculo alternativos.
   - Comprensión de los límites de las teorías y discusión de soluciones en función de parámetros.

3. **Autonomía y Madurez Académica:**
   - La IA debe exigir al alumno que elabore hipótesis fundamentadas antes de ofrecer orientación.
   - Fomentar la argumentación metacognitiva: no basta con encontrar la solución, se debe argumentar el porqué de cada paso.

4. **Guía Metodológica para la IA:**
   - Tono académico, respetuoso y desafiante intelectualmente.
   - Preguntas que inviten al análisis estructural, a la generalización y al rigor metodológico.
`,Pi=`# ⚖️ Nivel 3: Marco Regulador Ético y Deontológico de la Inteligencia Artificial en Educación
*Fuente: Ministerio de Educación y Formación Profesional / Recomendaciones UNESCO sobre Ética de la IA*

Este marco ético es de **cumplimiento obligatorio y transversal** en todas las interacciones con el estudiante.

---

## 🏛️ Principios Éticos Sagrados

1. **Integridad Académica y Prevención de Plagio:**
   - La IA debe actuar exclusivamente como andamiaje y catalizador del pensamiento, jamás como sustituto de la autoría del alumno.
   - Prohibido redactar textos finales o suministrar resoluciones que el alumno pueda copiar directamente.

2. **Fomento del Juicio Crítico y Verificación de Fuentes:**
   - La IA debe enseñar activamente a dudar, a contrastar información y a no asumir sus propias respuestas como infalibles.
   - En tareas de investigación, exigir al alumno la comprobación en fuentes primarias o libros de texto.

3. **Protección del Menor y Privacidad:**
   - No solicitar ni registrar datos personales identificables fuera de los estrictamente necesarios en la base de datos local (IndexedDB).
   - Mantener un entorno seguro, libre de contenidos no aptos para la edad del estudiante.

4. **Inclusión, Equidad y Adaptación Neurodidáctica:**
   - El sistema debe evitar cualquier sesgo de género, cultural o socioeconómico.
   - Fomentar la mentalidad de crecimiento (*Growth Mindset*): el error es una oportunidad de aprendizaje, no una debilidad.

5. **Prevención de Fatiga Cognitiva y Límite de Sesión (Derecho al Cierre y Descanso):**
   - Las tareas escolares guiadas por IA deben tener un objetivo acotado y un final nítido para salvaguardar el bienestar del menor.
   - Guardrail de turnos máximos: Un micro-reto formativo no debe prolongarse indefinidamente (máximo 4-6 intercambios de diálogo). Si tras 5 turnos el alumno continúa bloqueado, el tutor no debe interrogarlo más; debe realizar un *Cierre Asistido*, modelando amablemente el razonamiento, resumiendo el concepto clave y cerrando la actividad (\`[TAREA_COMPLETADA: ID_ACTIVIDAD]\`) para preservar la motivación y autoeficacia.
`,Ai=`# 📝 Prompt de Sistema: Asistente Pedagógico de Trabajos y Proyectos (STI)\r
\r
Eres **Anaxagoras Projects AI**, el mentor metodológico para trabajos escolares, monografías y proyectos de investigación de estudiantes de 6 a 18 años.\r
\r
---\r
\r
## 🎯 Misión\r
Acompañar al estudiante a lo largo de las 4 fases de creación de un trabajo académico asegurando que **el 100% de la redacción, las ideas y el pensamiento crítico procedan del propio alumno**, utilizando la IA únicamente como consultor metodológico.\r
\r
---\r
\r
## 🏗️ Fases de Asistencia\r
1. **Fase 1: Planificación y Alcance:**\r
   - Ayuda al estudiante a acotar la pregunta de investigación o hipótesis.\r
   - Plantea preguntas guía para delimitar qué aspectos investigará y cuáles descartará.\r
2. **Fase 2: Búsqueda y Contrastación de Fuentes:**\r
   - Enseña al alumno a identificar fuentes fiables y académicas (evitar bulos).\r
   - Guía la organización de notas en documentos de Google Drive.\r
3. **Fase 3: Redacción Propia y Argumentación:**\r
   - **PROHIBIDO:** Escribir párrafos o resúmenes para el trabajo.\r
   - **PERMITIDO:** Revisar esquemas conceptuales y sugerir conectores lógicos entre párrafos redactados por el estudiante.\r
4. **Fase 4: Revisión Crítica y Formato:**\r
   - Proporciona una rúbrica de autoevaluación: ¿Responden las conclusiones a la pregunta inicial? ¿Están citadas las fuentes según el estándar requerido?\r
\r
---\r
\r
## 🛡️ Auditoría de Autonomía\r
Evalúa periódicamente si el estudiante está demostrando comprensión genuina del tema mediante preguntas de control:\r
*"¿Cómo le explicarías esta conclusión a un compañero de clase en tus propias palabras?"*\r
\r
---\r
\r
## 🏛️ Inyección de Directrices Curriculares\r
Este System Prompt general de proyectos guía las 4 fases de trabajo y la auditoría de autoría. Se combina dinámicamente con las **Rúbricas y Directrices Departamentales** específicas de la materia proporcionadas por la API institucional educativa.\r
`,Ei=`# 🧠 Prompt de Sistema: Tutor Socrático Inteligente (STI)\r
\r
Eres **Anaxagoras AI**, un Sistema de Tutoría Inteligente (STI) diseñado para estudiantes de 6 a 18 años, basado en los principios de la pedagogía activa y el método socrático.\r
\r
---\r
\r
## 🚫 REGLA SAGRADA 1: NUNCA DES LA SOLUCIÓN DIRECTA (NON-NEGOTIABLE)\r
**NUNCA des la solución directa, el resultado numérico, la traducción completa ni el texto redactado al estudiante.**\r
Si el estudiante te dice:\r
- *"Dame la respuesta al problema 3"*\r
- *"Resuélveme esta ecuación"*\r
- *"Escríbeme el ensayo de historia"*\r
- *"¿Cuánto da 4x + 8 = 20?"*\r
\r
Debes negarte de forma entusiasta y pedagógica:\r
*"¡Me encantaría ahorrarte tiempo, pero si te doy el resultado te quitaría la oportunidad de entrenar tu mente para el examen! 💪 Vamos a razonarlo juntos..."*\r
\r
---\r
\r
## 🏁 REGLA SAGRADA 2: CIERRE DIDÁCTICO Y FIN DE TAREA (NON-NEGOTIABLE)\r
**Las tareas de un estudiante deben tener fin. No mantengas al alumno en bucles interrogatorios infinitos.**\r
Cuando el alumno cumpla los Criterios de Éxito / Superación de la actividad (Nivel 2.B):\r
1. **QUEDA TERMINANTEMENTE PROHIBIDO seguir formulando preguntas abiertas.**\r
2. Valida su deducción con refuerzo positivo y resume en 2 líneas el concepto clave aprendido.\r
3. Emite obligatoriamente al final: \`[TAREA_COMPLETADA: ID_ACTIVIDAD]\`.\r
4. Concluye la interacción animándole a descansar o a pasar al siguiente reto.\r
\r
---\r
\r
## 🧩 Protocolo Socrático de Interacción\r
1. **Diagnóstico inicial:** Formula una pregunta breve para evaluar qué sabe y qué no sabe el alumno sobre el problema.\r
2. **Descomposición:** Si el problema es complejo, divídelo en pasos sencillos e interactivos.\r
3. **Pistas reflexivas (Scaffolding):** Brinda analogías visuales o preguntas orientativas, jamás la respuesta.\r
4. **Verificación de asimilación:** Cuando el estudiante llegue a la respuesta correcta por sí mismo, felicítale y pídele que explique brevemente **por qué** es correcta para afianzar el aprendizaje significativo.\r
5. **Idioma:** Responde siempre en el idioma que esté utilizando el estudiante (Castellano, Català, Galego, Euskera o Valencià).\r
6. **Formato y Conclusión:** Respuestas breves (máximo 2-3 párrafos cortos). Durante el andamiaje termina con UNA sola pregunta. Al cumplirse el objetivo didáctico, aplica la Regla de Cierre sin nuevas preguntas.\r
\r
\r
---\r
\r
## 🏛️ Inyección de Directrices Curriculares\r
Este System Prompt general de sección define la metodología socrática transversal. En tiempo de ejecución se combina dinámicamente con la **Directriz Curricular Departamental** específica de la materia y del curso del alumno (proporcionada por la API educativa institucional, e.g. Esfer@).\r
`,Vs=Object.assign({"../prompts/active_recall_generator.md":Rr,"../prompts/agenda/1_distribucion_homogenea.md":Br,"../prompts/agenda/2_orden_prioridad.md":qr,"../prompts/agenda/3_fechas_compromiso.md":zr,"../prompts/agenda/4_adaptabilidad_ocio.md":Nr,"../prompts/agenda/agenda_planner_master.md":Fr,"../prompts/agenda_planner.md":Kr,"../prompts/nivel_1_funcional/active_recall_generator.md":kn,"../prompts/nivel_1_funcional/agenda_planner.md":Gr,"../prompts/nivel_1_funcional/project_guide.md":Vr,"../prompts/nivel_1_funcional/socratic_tutor.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":ei,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":ti,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":ai,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":ni,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":ri,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ii,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":oi,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":si,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":li,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":ci,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":di,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_derivadas_optimizacion.md":ui,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":pi,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":mi,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":fi,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":gi,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":bi,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":hi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_derivadas_optimizacion.md":vi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":yi,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":xi,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":_i,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":Ci,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":wi,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":Pi,"../prompts/project_guide.md":Ai,"../prompts/socratic_tutor.md":Ei});function Jt(c){const a=c.replace(/\\/g,"/").toLowerCase();for(const[r,o]of Object.entries(Vs))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return o;return""}class Hs{assembleAgendaPrompt(a="1eso"){const r=a==="2batx",o=r?"2º de Bachillerato (PAU)":"1º de ESO",s=Jt("agenda/1_distribucion_homogenea.md"),u=Jt("agenda/2_orden_prioridad.md"),p=Jt("agenda/3_fechas_compromiso.md"),m=Jt("agenda/4_adaptabilidad_ocio.md"),b=Jt("agenda/agenda_planner_master.md"),h={id:"time_distribution",badge:"Pilar 1: Distribución Homogénea",title:"Distribución Homogénea del Tiempo y Carga Cognitiva",subtitle:`Práctica espaciada, límite diario (${r?"90-135 min":"45-75 min"}) y blindaje del ocio`,source:"src/prompts/agenda/1_distribucion_homogenea.md",content:s},w={id:"priority_order",badge:"Pilar 2: Ordenación por Prioridad",title:"Ordenación por Prioridad y Alternancia Cognitiva (Interleaving)",subtitle:"Ponderación según dificultad relativa, balance de materias y avance de tareas",source:"src/prompts/agenda/2_orden_prioridad.md",content:u},T={id:"commitment_deadlines",badge:"Pilar 3: Fechas de Compromiso",title:"Fechas de Compromiso: Exámenes y Entregas de Trabajos",subtitle:"Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento",source:"src/prompts/agenda/3_fechas_compromiso.md",content:p},O={id:"adaptive_flexibility",badge:"Pilar 4: Adaptabilidad y Formato",title:"Adaptabilidad Dinámica, Novedades Docentes (+1d) y JSON Local",subtitle:"Flexibilidad ante imprevistos, escucha empática y persistencia en IndexedDB",source:"src/prompts/agenda/4_adaptabilidad_ocio.md",content:m},F=`
${b}

---
=== [PILAR 1: DISTRIBUCIÓN HOMOGÉNEA DEL TIEMPO Y PROTECCIÓN DEL DESCANSO] ===
${s}
=============================================================================

---
=== [PILAR 2: ORDENACIÓN MULTIVARIABLE POR PRIORIDAD E INTERLEAVING] ===
${u}
========================================================================

---
=== [PILAR 3: GESTIÓN DE FECHAS DE COMPROMISO (EXÁMENES Y ENTREGAS)] ===
${p}
=======================================================================

---
=== [PILAR 4: ADAPTABILIDAD, RESPUESTA EMPÁTICA Y FORMATO DE EMISIÓN] ===
${m}
=========================================================================

CONTEXTO INSTITUCIONAL DE ETAPA DEL ESTUDIANTE:
- Curso Académico: ${o}
- Límite diario vespertino aconsejado: ${r?"Máximo 135 minutos repartidos en 2-3 bloques de 45 min":"Máximo 75 minutos repartidos en 1-2 bloques de 45 min"}
- Tiempo de descanso y ocio protegido tras las 15:00: Mínimo 3.5 a 4 horas libres para desconexión y deporte
- Compromisos prioritarios: Atender de forma preferente hitos con vencimiento inferior a 72 horas.
`.trim();return{role:"agenda",gradeKey:a,title:`Planificador Neuroeducativo de Agenda (${o})`,subtitle:"Distribución homogénea, ordenación por prioridad y gestión de compromisos (exámenes y entregas)",systemInstruction:F,pillars:{timeDistribution:h,priorityOrder:w,commitmentDeadlines:T,adaptiveFlexibility:O}}}getCurricularDirective(a="1eso"){return a==="2batx"?{title:"Directriz Curricular sobre Gestión del Tiempo, Preparación PAU y Prevención del Burnout",subtitle:"Departament d'Educació / Coordinació de les Proves d'Accés a la Universitat (2º de Batxillerat)",institution:"Consell Interuniversitari de Catalunya & Departament d'Educació",sourceApi:"https://api.educacio.gencat.cat/v1/agenda/directrius?curs=2batx",content:`
# 🏛️ Directriu Departamental: Gestió del Temps i Preparació Equilibrada per a les PAU
*Nivell: 2n de Batxillerat (17-18 anys)*

## 1. Objectius de Conciliació i Rendiment Acadèmic
1. **Prevenció del Burnout Estudiantil:**
   - La preparació de les PAU requereix una distribució constant i sostinguda de l'esforç, evitant l'acumulació de sessions intensives els dies previs als exàmens.
   - Es recomana una dedicació màxima d'estudi autònom de **90 a 135 minuts diaris** fora de l'horari lectiu escolar, distribuïts en blocs de 45 minuts.

2. **Planificació Retrospectiva per a les Proves:**
   - Tot examen o simulacre PAU ha de comptar amb una finestra de preparació espaiada d'entre 5 i 7 dies d'antelació.
   - Les tasques de redacció i treballs de recerca han de lliurar-se amb un marge de revisió d'almenys 24 hores respecte a la data límit.

3. **Garantia del Descans Neurocognitiu:**
   - Està estrictament desaconsellat estudiar més enllà de les 22:30 hores per protegir la fase REM del son, fonamental per a la consolidació de la memòria a llarg termini.
   - Cal reservar almenys un dia complet del cap de setmana amb descans total d'estudi.
`.trim()}:{title:"Directriz Curricular sobre Deberes Escolares, Conciliación Familiar y Descanso",subtitle:"Departament d'Educació / Marc LOMLOE sobre Hàbits d'Estudi en l'Educació Secundària Obligatòria",institution:"Departament d'Educació de la Generalitat de Catalunya",sourceApi:"https://api.educacio.gencat.cat/v1/agenda/directrius?curs=1eso",content:`
# 🏛️ Directriu Departamental sobre Deures Escolars i Protecció del Temps d'Oci
*Nivell: 1r d'Educació Secundària Obligatòria (12 anys)*

## 1. Criteris Normatius de Racionalització del Temps d'Estudi
1. **Límit de Càrrega Diària Extraescolar:**
   - En concordança amb les recomanacions de l'Organització Mundial de la Salut (OMS) i el Departament d'Educació, la càrrega diària de deures i repàs no ha de superar els **45 a 60 minuts diaris** a 1r d'ESO.
   - Els deures han de ser una eina d'afiançament autònom i mai una prolongació de la jornada escolar.

2. **Diferenciació d'Activitats i Compromisos:**
   - Els exàmens han d'avisar-se amb un mínim de 5 dies hàbils per permetre un repàs progressiu i evitar l'ansietat escolar.
   - Els lliuraments de feines escolars han de disposar de pautes clares de planificació per fases.

3. **Protecció de la Desconnexió Digital i Oci Familiar:**
   - La tarda posterior a les classes ha de garantir temps lliure per a la pràctica d'activitat física, el joc i la convivència familiar.
   - A partir de les 21:00 hores es recomana la desconnexió completa de pantalles per afavorir el ritme circadià.
`.trim()}}}const Si=new Hs,Us=Object.assign({"../prompts/active_recall_generator.md":Rr,"../prompts/agenda/1_distribucion_homogenea.md":Br,"../prompts/agenda/2_orden_prioridad.md":qr,"../prompts/agenda/3_fechas_compromiso.md":zr,"../prompts/agenda/4_adaptabilidad_ocio.md":Nr,"../prompts/agenda/agenda_planner_master.md":Fr,"../prompts/agenda_planner.md":Kr,"../prompts/nivel_1_funcional/active_recall_generator.md":kn,"../prompts/nivel_1_funcional/agenda_planner.md":Gr,"../prompts/nivel_1_funcional/project_guide.md":Vr,"../prompts/nivel_1_funcional/socratic_tutor.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":ei,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":ti,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":ai,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":ni,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":ri,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ii,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":oi,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":si,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":li,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":ci,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":di,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_derivadas_optimizacion.md":ui,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":pi,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":mi,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":fi,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":gi,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":bi,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":hi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_derivadas_optimizacion.md":vi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":yi,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":xi,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":_i,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":Ci,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":wi,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":Pi,"../prompts/project_guide.md":Ai,"../prompts/socratic_tutor.md":Ei});function nt(c){const a=c.replace(/\\/g,"/").toLowerCase();for(const[r,o]of Object.entries(Us))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return o;return""}class Ws{constructor(){$e(this,"TOPIC_DEFINITIONS",[{id:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",name:"Sintaxis de la Oración Simple: Sujeto y Complemento Verbal",fileKey:"nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md",keyConcepts:["Sujeto y Predicado","Verbo","Complemento Verbal (en bloque)"],pedagogicalNote:'Estadio de Operaciones Concretas (Piaget): Identificación visual y holística del Sujeto y el Complemento Verbal en bloque ("locomotora y vagones"), sin clasificaciones abstractas prematuras.'},{id:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",name:"Ecosistemas y Cadenas Tróficas en el Bosque Mediterráneo",fileKey:"nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md",keyConcepts:["Biotopo y Biocenosis","Niveles Tróficos","Equilibrio Ecológico"],pedagogicalNote:"Modelado intuitivo y visual de las relaciones interespecíficas y flujo de materia/energía a partir de observaciones directas del bosque mediterráneo."},{id:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",name:"Fracciones y Operaciones Básicas en Problemas Cotidianos",fileKey:"nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md",keyConcepts:["Fracciones Equivalentes","Común Denominador","Reparto Proporcional"],pedagogicalNote:"Aproximación geométrica y tangible al concepto de parte-todo y proporcionalidad antes de la abstracción algorítmica formal."},{id:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",name:"Primeras Civilizaciones Fluviales: Mesopotamia y Egipto",fileKey:"nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md",keyConcepts:["El Río como Motor","Sociedad Jerarquizada","Escritura Cuneiforme/Jeroglífica"],pedagogicalNote:"Causalidad histórica fundamental: comprensión del condicionamiento geográfico en la aparición de los primeros estados y códigos normativos."},{id:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",name:"Comprensión Lectora y Deducción Léxica en Novela Juvenil",fileKey:"nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md",keyConcepts:["Estructura Narrativa","Vocabulario por Contexto","Paráfrasis"],pedagogicalNote:"Fomento del razonamiento inferencial y deducción léxica mediante el diálogo socrático guiado sin recurrir a definiciones pasivas."},{id:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",name:"Tipología y Pruebas de Complementos Verbales (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md",keyConcepts:["CPredicativo (concordancia)","CRV vs CC","Pruebas sintácticas PAU"],pedagogicalNote:"Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor filológico con pruebas morfosintácticas estrictas (concordancia, conmutación) para las PAU."},{id:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",name:"Crisis del Antiguo Régimen, Constitución de 1812 y Fernando VII",fileKey:"nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md",keyConcepts:["Cortes de Cádiz","Constitución de 1812","Manifiesto de los Persas"],pedagogicalNote:"Análisis historiográfico dialéctico: contraste de textos y decretos originales bajo los criterios de rigor conceptual de las pruebas PAU."},{id:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",name:"Cálculo Diferencial: Derivadas, Recta Tangente y Optimización (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/mates_derivadas_optimizacion.md",keyConcepts:["Reglas de Derivación","Ecuación de la Recta Tangente","Criterio de Primera y Segunda Derivada","Problemas de Optimización"],pedagogicalNote:"Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor analítico en la interpretación geométrica de la derivada como pendiente, deducción formal de extremos y modelización de problemas de optimización para las PAU."},{id:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",name:"Teoría del Conocimiento: Platón vs Descartes (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md",keyConcepts:["Mito de la Caverna","Duda Metódica y Cogito","Ideas Innatas"],pedagogicalNote:"Pensamiento crítico y dialéctica epistemológica: formulación de tesis, antítesis y justificación argumentativa estructurada."},{id:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",name:"Termodinámica Química y Principio de Le Chatelier (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md",keyConcepts:["Entalpía y Entropía","Equilibrio Químico Kc/Kp","Le Chatelier"],pedagogicalNote:"Predicción fisicoquímica cuantitativa y cualitativa del equilibrio ante perturbaciones en reactores cerrados."},{id:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",name:"Transición Energética y Viabilidad de Eólica Marina en el Mediterráneo",fileKey:"nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md",keyConcepts:["Eólica Marina Flotante","LCOE y Descarbonización","Impacto Ambiental"],pedagogicalNote:"Pensamiento de ingeniería y sostenibilidad: análisis multidimensional de viabilidad técnica, energética y ambiental."}]);$e(this,"ACTIVITY_DEFINITIONS",[{id:"act_lengua_1eso_1",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: "El tren llegó puntual a la estación"',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base (Sujeto inicial + CV en bloque)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md"},{id:"act_lengua_1eso_2",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: Sujeto pospuesto ("Por la mañana sonó ruidosa la alarma")',sentenceOrCase:"Por la mañana sonó ruidosa la alarma en el pasillo.",variationType:"Variación de orden oracional (Sujeto pospuesto)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md"},{id:"act_lengua_1eso_3",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Plural y contexto ("Los jóvenes exploradores regresaron...")',sentenceOrCase:"Los jóvenes exploradores regresaron cansados al campamento al anochecer.",variationType:"Variación léxica y plural (Consolidación y transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md"},{id:"act_naturales_1eso_1",topicId:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",order:1,title:"Maqueta de Ecosistemas y Cadenas Tróficas",sentenceOrCase:"Diseño de maqueta de bosque mediterráneo con 4 niveles tróficos.",variationType:"Proyecto Guiado de Aula",fileKey:"nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md"},{id:"act_mates_1eso_1",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:1,title:"Suma y Resta de Fracciones con Común Denominador",sentenceOrCase:"Calcular: 3/8 + 7/8 - 2/8 y simplificar.",variationType:"Cálculo Aritmético Visual",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md"},{id:"act_mates_1eso_2",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:2,title:"Problema Cotidiano de Reparto Proporcional",sentenceOrCase:"En una clase de 24 alumnos, 2/3 practican deporte y 1/6 música.",variationType:"Variación Contextualizada (Transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md"},{id:"act_sociales_1eso_1",topicId:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",order:1,title:"Mapa Histórico: Nilo y Tigris-Éufrates",sentenceOrCase:"Localización del Creciente Fértil y función agrícola del limo fluvial.",variationType:"Análisis Cartográfico y Causal",fileKey:"nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md"},{id:"act_tutoria_1eso_1",topicId:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",order:1,title:"Ficha de Lectura y Deducción Léxica",sentenceOrCase:"Resumen propio y deducción de vocabulario en contexto de novela juvenil.",variationType:"Lectura Crítica y Vocabulario",fileKey:"nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md"},{id:"act_lengua_2batx_1",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: CPred de Sujeto ("El tren llegó puntual a la estación")',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base PAU (Prueba de concordancia con Sujeto)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md"},{id:"act_lengua_2batx_2",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: CPred de CD ("El tribunal consideró inocente al acusado")',sentenceOrCase:"El tribunal consideró inocente al acusado tras el juicio.",variationType:"Variación de doble predicación (Concordancia con CD)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md"},{id:"act_lengua_2batx_3",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Contraste Riguroso CPred vs CCM ("puntual" vs "puntualmente")',sentenceOrCase:"El tren llegó puntual / puntualmente a la estación.",variationType:"Contraejemplo Trampa (Adjetivo variable vs Adverbio invariable)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md"},{id:"act_historia_2batx_1",topicId:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",order:1,title:"Comentario Histórico: Manifiesto de los Persas (1814)",sentenceOrCase:"Comentario guiado del fragmento absolutista de 1814 presentado a Fernando VII.",variationType:"Comentario PAU de Fuente Primaria",fileKey:"nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md"},{id:"act_mates_2batx_1",topicId:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",order:1,title:"Recta Tangente y Optimización con Derivadas (PAU)",sentenceOrCase:"Calcular la recta tangente a f(x) = x³ - 3x² + 2 en x = 1 y justificar extremos relativos mediante f''(x).",variationType:"Problema Oficial PAU de Análisis y Cálculo Diferencial",fileKey:"nivel_2_centro_educativo/2batx/actividades/mates_act_derivadas_optimizacion.md"},{id:"act_filosofia_2batx_1",topicId:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",order:1,title:"Ensayo Comparativo: Caverna Platónica vs Genio Maligno",sentenceOrCase:"Superación del engaño sensorial en Platón (anamnesis) y Descartes (cogito).",variationType:"Redacción Contrastiva PAU",fileKey:"nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md"},{id:"act_quimica_2batx_1",topicId:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",order:1,title:"Desplazamiento de Equilibrio por Presión y Temperatura (Haber-Bosch)",sentenceOrCase:"Predicción razonada en síntesis de NH3 según Le Chatelier y termodinámica.",variationType:"Problema Razonado PAU de Equilibrio Químico",fileKey:"nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md"},{id:"act_tecnologia_2batx_1",topicId:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",order:1,title:"Monografía: Viabilidad de Eólica Marina Flotante en el Mediterráneo",sentenceOrCase:"Análisis de LCOE, batimetría y evacuación HVDC frente a costa valenciana y balear.",variationType:"Monografía de Investigación Científica",fileKey:"nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md"}])}getTopicsForGrade(a){return this.TOPIC_DEFINITIONS.filter(r=>r.gradeKey===a).map(r=>({...r,markdownContent:nt(r.fileKey)}))}getActivitiesForTopic(a){return this.ACTIVITY_DEFINITIONS.filter(r=>r.topicId===a).map(r=>({...r,markdownContent:nt(r.fileKey)})).sort((r,o)=>r.order-o.order)}findTopicById(a){const r=this.TOPIC_DEFINITIONS.find(o=>o.id===a);if(r)return{...r,markdownContent:nt(r.fileKey)}}findTopicBySubjectOrKeyword(a,r,o=""){const s=this.getTopicsForGrade(r),u=a.toLowerCase(),p=o.toLowerCase();if(p){const b=s.find(h=>h.name.toLowerCase().includes(p)||h.keyConcepts.some(w=>w.toLowerCase().includes(p)));if(b)return b}const m=s.find(b=>b.subject.toLowerCase().includes(u)||u.includes(b.subject.toLowerCase()));return m||s[0]}findActivityById(a){const r=this.ACTIVITY_DEFINITIONS.find(o=>o.id===a);if(r)return{...r,markdownContent:nt(r.fileKey)}}assemblePrompt(a){const{role:r,gradeKey:o}=a,s=r==="agenda"?"nivel_1_funcional/agenda_planner.md":r==="project"?"nivel_1_funcional/project_guide.md":r==="recall"?"nivel_1_funcional/active_recall_generator.md":"nivel_1_funcional/socratic_tutor.md",u=nt(s),p={level:"level1",badge:"Nivel 1: Funcional",title:r==="agenda"?"Planificador de Agenda":r==="project"?"Mentor de Trabajos":r==="recall"?"Generador de Active Recall":"Tutor Socrático Inteligente",subtitle:"Metodología pedagógica y guardrails no negociables",source:`src/prompts/${s}`,content:u},m=nt("nivel_3_regulador/etica_y_principios_ia.md"),h=nt(o==="2batx"?"nivel_3_regulador/criterios_generales_2batx.md":"nivel_3_regulador/criterios_generales_1eso.md"),w=`${m}

---

${h}`.trim(),T={level:"level3",badge:"Nivel 3: Marco Regulador",title:o==="2batx"?"Criterios Preuniversitarios (PAU) y Ética de la IA":"Criterios LOMLOE (1º ESO) y Ética de la IA",subtitle:"Ministerio de Educación / Deontología de Inteligencia Artificial",source:"src/prompts/nivel_3_regulador/",content:w};let O;a.topicId?O=this.findTopicById(a.topicId)||this.findTopicBySubjectOrKeyword(a.subject||"Lengua",o):O=this.findTopicBySubjectOrKeyword(a.subject||"Lengua",o);const F=O.markdownContent||nt(O.fileKey),v={level:"level2A",badge:"Nivel 2.A: Línea Base Temática",title:O.name,subtitle:`${O.subject} • ${o==="2batx"?"2º de Bachillerato":"1º de ESO"}`,source:`src/prompts/${O.fileKey}`,content:F},H=this.getActivitiesForTopic(O.id);let z;a.activityId?z=this.findActivityById(a.activityId)||H[0]:H.length>0&&(z=H[0]);let Y;if(z){const fe=z.markdownContent||nt(z.fileKey);Y={level:"level2B",badge:"Nivel 2.B: Tarea y Variación",title:z.title,subtitle:`Variación: ${z.variationType}`,source:`src/prompts/${z.fileKey}`,content:fe}}const J=`
${p.content}

---
=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===
${T.content}
==================================================

---
=== [DIRECTRIZ Y LÍNEA BASE TEMÁTICA - NIVEL 2.A] ===
Materia: ${O.subject}
Tema Base: ${O.name}
${v.content}
======================================================

${Y?`
---
=== [FOCO DE LA ACTIVIDAD CONCRETA Y VARIACIÓN - NIVEL 2.B] ===
Actividad: ${Y.title}
Tipo de Variación: ${(z==null?void 0:z.variationType)||"Caso de Estudio"}
${Y.content}
================================================================
`:""}

CONTEXTO DINÁMICO DE EJECUCIÓN:
- Grado del Estudiante: ${o==="2batx"?"2º de Bachillerato (17-18 años - PAU)":"1º de ESO (12 años - Operaciones Concretas)"}
- Asignatura: ${O.subject}
- Tema Curricular Activo: ${O.name}
${z?`- Actividad Específica en Curso: ${z.title} ("${z.sentenceOrCase}")`:""}
`.trim();return{role:r,gradeKey:o,subject:O.subject,topicId:O.id,topicName:O.name,activityId:z==null?void 0:z.id,activityTitle:z==null?void 0:z.title,systemInstruction:J,layers:{level1Functional:p,level3Regulatory:T,level2BaseTopic:v,level2SpecificActivity:Y}}}assembleAgendaPrompt(a="1eso"){return Si.assembleAgendaPrompt(a)}}const Oe=new Ws,ki={recall:kn};class Qs{async getSettings(){const a=await _e.aiSettings.toCollection().first();return a||{provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}}async updateSettings(a){const r=await _e.aiSettings.toCollection().first();r&&r.id?await _e.aiSettings.update(r.id,{...a,updatedAt:new Date().toISOString()}):await _e.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString(),...a})}async testConnection(a){try{const r=`${a.endpointUrl.replace(/\/+$/,"")}/models`,o={"Content-Type":"application/json"};a.apiKey&&(o.Authorization=`Bearer ${a.apiKey.trim()}`);const s=new AbortController,u=setTimeout(()=>s.abort(),4e3),p=await fetch(r,{method:"GET",headers:o,signal:s.signal});return clearTimeout(u),p.ok?{success:!0,message:`Conexión exitosa con ${a.endpointUrl}`}:{success:!1,message:`El servidor respondió con código ${p.status}: ${p.statusText}`}}catch{return{success:!1,message:`No se pudo conectar con ${a.endpointUrl}. Modo socrático local simulado activo.`}}}async callLLM(a,r){var s,u,p;const o=await this.getSettings();try{const m=`${o.endpointUrl.replace(/\/+$/,"")}/chat/completions`,b={"Content-Type":"application/json"};o.apiKey&&(b.Authorization=`Bearer ${o.apiKey.trim()}`);const h=[];for(const F of r){if(!F.content||!F.content.trim())continue;const v=h[h.length-1];v&&v.role===F.role?v.content.trim()!==F.content.trim()&&(v.content=`${v.content}

${F.content.trim()}`):h.push({role:F.role,content:F.content.trim()})}const w=new AbortController,T=setTimeout(()=>w.abort(),3e4),O=await fetch(m,{method:"POST",headers:b,signal:w.signal,body:JSON.stringify({model:o.modelName,messages:[{role:"system",content:a},...h],temperature:o.temperature})});if(clearTimeout(T),O.ok){const v=(p=(u=(s=(await O.json()).choices)==null?void 0:s[0])==null?void 0:u.message)==null?void 0:p.content;if(v)return v.trim()}else{const F=await O.text();console.error(`[AI Client] Error HTTP ${O.status} (${O.statusText}) en ${m}:`,F)}}catch(m){console.warn("[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:",m)}return null}async generateSocraticResponse(a,r,o,s,u){const m=je.getState().user,b=(m==null?void 0:m.gradeKey)||"1eso",w=Oe.assemblePrompt({role:"socratic",gradeKey:b,subject:r,topicId:o.startsWith("topic_")||o.startsWith("t_")?o:void 0,activityId:u}).systemInstruction,O=s.filter((v,H)=>!(H===s.length-1&&v.role==="student"&&v.content.trim()===a.trim())).slice(-6).map(v=>({role:v.role==="tutor"?"assistant":"user",content:v.content})),F=await this.callLLM(w,[...O,{role:"user",content:a}]);if(F){const H=!!F.match(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/i),z=F.replace(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/gi,"").trim();return{id:`msg_${Date.now()}`,role:"tutor",content:z,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!H,isTaskCompleted:H,suggestedPrompts:H?["🎉 ¡Objetivo pedagógico conseguido!","Avanzar a la siguiente variación","Volver a la Agenda"]:["¿Cómo relaciono esto con la teoría?","Quiero resolver el siguiente paso","Dame un ejemplo similar"]}}return await new Promise(v=>setTimeout(v,500)),this.createSimulatedSocraticResponse(a,r,o,b,u,s)}calculateAgendaStats(a){const r=new Date().toISOString().split("T")[0],o=a.filter(z=>!z.completed&&(z.type==="exam"||z.type==="assignment_due")).map(z=>{const Y=new Date(z.date).getTime()-new Date(r).getTime(),J=Math.ceil(Y/864e5);return{title:z.title,subject:z.subject,date:z.date,type:z.type,daysLeft:J}}).sort((z,Y)=>z.daysLeft-Y.daysLeft),s=a.filter(z=>z.date===r),u=s.filter(z=>!z.completed&&z.type!=="class").reduce((z,Y)=>z+(Y.durationMinutes||45),0),m=Math.max(0,390-u),b=Math.round(m/60*10)/10,h=new Map;let w=0;for(const z of a){if(z.type==="class")continue;const Y=z.durationMinutes||45;w+=Y;const J=h.get(z.subject)||{minutes:0,count:0};J.minutes+=Y,J.count+=1,h.set(z.subject,J)}const T=Array.from(h.entries()).map(([z,Y])=>({subject:z,minutes:Y.minutes,blockCount:Y.count,percentage:w>0?Math.round(Y.minutes/w*100):0})).sort((z,Y)=>Y.minutes-z.minutes),O=a.filter(z=>z.type==="assignment_due"),F=O.filter(z=>z.completed).length,v=O.length,H=v>0?Math.round(F/v*100):100;return{urgentPriorities:o,afternoonDistribution:{classesEndTime:"15:00",todayStudyMinutes:u,freeTimeHours:b,totalBlocksToday:s.length},subjectBreakdown:T,homeworkProgress:{completed:F,total:v,percentage:H}}}async generatePlanificationDialogue(a,r,o){var H,z,Y;const s=this.calculateAgendaStats(a),u=je.getState(),p=((H=u.user)==null?void 0:H.name)||"Estudiante",m=((z=u.user)==null?void 0:z.gradeLevel)||"1º de ESO",b=((Y=u.user)==null?void 0:Y.gradeKey)||"1eso",h=new Date().toISOString().split("T")[0],T=`
${Si.assembleAgendaPrompt(b).systemInstruction}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${p} (${m}).
Tu objetivo es analizar la situación real del estudiante con base en los datos de su agenda local en IndexedDB y presentarle un resumen conversacional muy claro:
1. 🎯 Prioridades Clave: Cuáles son los exámenes y entregas más urgentes.
2. ⏱️ Distribución de la Tarde: Explicar cómo queda su tiempo tras salir del instituto a las 15:00, asegurando que su tiempo libre para descansar, deporte y familia esté protegido.
3. 📊 Balance por Asignatura: Si hay materias con examen cercano que necesitan más atención o si hay desequilibrios.
4. 📝 Avance de Deberes: Cuántas tareas ha completado y qué falta.
5. 🔄 Flexibilidad y Ajustes: Atender de forma entusiasta y adaptativa peticiones del alumno (ej. si el profesor ha pospuesto una tarea, o si le pide hacer otra cosa antes).

Responde siempre en español, con un tono motivador, empático y estructurado en párrafos breves. Termina siempre con una pregunta reflexiva orientada a si desea confirmar la propuesta o hacer algún cambio.
Si propones o modificas bloques de estudio, incluye al final de tu respuesta un bloque JSON con los bloques recomendados:
\`\`\`json
[
  {
    "title": "...",
    "subject": "...",
    "date": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "durationMinutes": 45,
    "type": "study_session",
    "notes": "..."
  }
]
\`\`\`
`.trim(),O=`
DATOS DE LA AGENDA DE ${p.toUpperCase()}:
- Prioridades urgentes:
${s.urgentPriorities.map(J=>`  • [${J.type==="exam"?"Examen":"Entrega"}] ${J.subject}: "${J.title}" (${J.daysLeft===0?"¡Hoy!":J.daysLeft===1?"Mañana":`en ${J.daysLeft} días`})`).join(`
`)||"  • No hay hitos inmediatos"}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${s.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${s.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${s.subjectBreakdown.map(J=>`${J.subject}: ${J.minutes} min (${J.percentage}%)`).join(", ")||"Sin bloques"}
- Avance de deberes: ${s.homeworkProgress.completed}/${s.homeworkProgress.total} completados (${s.homeworkProgress.percentage}%).
${r?`MENSAJE DEL ALUMNO: "${r}"`:"(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)"}
`.trim(),F=[...(o||[]).map(J=>({role:J.role==="assistant"?"assistant":"user",content:J.content})),{role:"user",content:O}],v=await this.callLLM(T,F);if(v){let J=this.createDefaultSuggestedBlocks(a,s,r,b);try{const L=v.match(/```json\s*([\s\S]*?)\s*```/)||v.match(/\[[\s\S]*\]/);if(L){const M=JSON.parse(L[1]||L[0]);Array.isArray(M)&&M.length>0&&(J=M.map(q=>({title:q.title||"Sesión de estudio activo",subject:q.subject||"General",date:q.date||h,startTime:q.startTime||"17:00",durationMinutes:q.durationMinutes||45,type:q.type||"study_session",completed:!1,notes:q.notes||"Planificado por Anaxagoras AI",gradeKey:b,syncedWithGoogle:!1})))}}catch(L){console.warn("[AI Client] No se pudo parsear JSON del planificador LLM:",L)}return{message:v.replace(/```json[\s\S]*?```/,"").trim(),suggestedBlocks:J}}return this.createSimulatedPlanificationResponse(a,s,p,m,b,r)}createDefaultSuggestedBlocks(a,r,o,s="1eso"){const u=new Date().toISOString().split("T")[0],p=new Date(Date.now()+864e5).toISOString().split("T")[0],m=new Date(Date.now()+864e5*2).toISOString().split("T")[0],b=(o||"").toLowerCase(),h=b.includes("retras")||b.includes("posp")||b.includes("profe")||b.includes("aplaza"),w=b.includes("descans")||b.includes("libre")||b.includes("cansad")||b.includes("menos"),T=b.includes("mate")||b.includes("cálculo"),O=b.includes("lengua")||b.includes("sintaxis"),F=w?30:45;return s==="1eso"?[{title:O||h?"Práctica de Oraciones: Sujeto y Predicado en Bloque":"Repaso Activo: Ciencias Naturales (Ecosistemas)",subject:O||h?"Lengua Castellana":"Ciencias Naturales",date:h?p:u,startTime:"17:15",durationMinutes:F,type:"study_session",completed:!1,notes:h?"📅 Tarea reprogramada respetando el aviso del profesor.":"Hacer mapa visual de 1 página sin mirar el libro.",gradeKey:"1eso",syncedWithGoogle:!1},{title:T?"Fracciones Básicas: Resolución de 4 Ejercicios":"Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)",subject:T?"Matemáticas":"Ciencias Sociales",date:h?m:p,startTime:"18:15",durationMinutes:F,type:"study_session",completed:!1,notes:"Preparación espaciada para asentar conceptos antes del examen.",gradeKey:"1eso",syncedWithGoogle:!1}]:[{title:T||h?"Matemáticas II: Derivadas, Recta Tangente y Optimización (PAU)":"Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)",subject:T||h?"Matemáticas II":"Filosofía",date:h?p:u,startTime:"17:00",durationMinutes:w?40:50,type:"study_session",completed:!1,notes:h?"📅 Reprogramado según nueva directriz del profesor.":"Redacción de síntesis conceptual para la prueba de Selectividad.",gradeKey:"2batx",syncedWithGoogle:!1},{title:"Lengua Castellana: Pruebas de Concordancia de CPred (PAU)",subject:"Lengua Castellana",date:m,startTime:"18:15",durationMinutes:w?40:50,type:"study_session",completed:!1,notes:"Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.",gradeKey:"2batx",syncedWithGoogle:!1}]}createSimulatedPlanificationResponse(a,r,o,s,u,p){const m=this.createDefaultSuggestedBlocks(a,r,p,u),b=(p||"").toLowerCase(),h=r.urgentPriorities[0],w=r.subjectBreakdown[0];let T="";return b.includes("retras")||b.includes("posp")||b.includes("profe")?T=`¡Comprendido, ${o}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.

• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.
• **Tu tarde protegida:** Hoy mantendrás **${r.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.
• **Prioridad activa:** Tu foco principal sigue siendo ${h?`el examen de **${h.subject}** (${h.title}) en ${h.daysLeft} días`:"mantener un ritmo espaciado"}.

¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`:T=`¡Hola, ${o}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${s}**:

🎯 **1. Qué es más prioritario hoy:**
`+(h?`Lo más urgente es **${h.subject}**: *"${h.title}"*, que vence ${h.daysLeft===0?"¡hoy mismo!":h.daysLeft===1?"mañana":`en ${h.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.

`:`No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.

`)+`⏱️ **2. Distribución de tu tiempo esta tarde:**
Tus clases lectivas finalizan a las 15:00. Te he programado **${r.afternoonDistribution.todayStudyMinutes>0?`${r.afternoonDistribution.todayStudyMinutes} minutos`:"45 minutos"} de estudio activo**, lo que te deja **${r.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪

📊 **3. Balance por asignaturas:**
`+(w?`La materia con más tiempo acumulado es **${w.subject}** (${w.minutes} min). ${r.subjectBreakdown.length>1?`Recomiendo alternar con materias que llevan menos minutos (${r.subjectBreakdown[r.subjectBreakdown.length-1].subject}) para entrenar el entrelazado cognitivo.`:""}

`:`Aún no hay suficiente historial de minutos registrados esta semana.

`)+`📝 **4. Avance de tus deberes:**
Llevas completados el **${r.homeworkProgress.percentage}% de tus entregas** (${r.homeworkProgress.completed} de ${r.homeworkProgress.total}).

Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`,{message:T,suggestedBlocks:m}}async generateStudyPlan(a,r){var p;const s=((p=je.getState().user)==null?void 0:p.gradeKey)||"1eso",u=this.calculateAgendaStats([]);return this.createDefaultSuggestedBlocks([],u,void 0,s)}async generateActiveRecallCard(a,r){var m;const s=((m=je.getState().user)==null?void 0:m.gradeKey)||"1eso",u=`${ki.recall}

Genera una tarjeta conceptual de autoevaluación para la materia ${a} y tema ${r} adaptada al nivel ${s==="1eso"?"1º de ESO":"2º de Bachillerato"}. Formato JSON estricto.`,p=await this.callLLM(u,[{role:"user",content:`Crear desafío de active recall sobre ${r}`}]);if(p)try{const b=p.match(/\{[\s\S]*\}/);if(b){const h=JSON.parse(b[0]);return{id:`card_${Date.now()}`,concept:h.concept||`¿Cómo definirías la clave de ${r}?`,hint:h.hint||"Piensa en las causas fundamentales y consecuencias.",explanation:h.explanation||"Resumen conceptual para verificar comprensión activa.",masteryScore:0}}}catch(b){console.warn("[AI Client] Fallo al parsear flashcard de LLM:",b)}return a.toLowerCase().includes("lengua")?s==="1eso"?{id:`card_${Date.now()}`,concept:'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',hint:'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',explanation:'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',masteryScore:0}:{id:`card_${Date.now()}`,concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',hint:'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',explanation:'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',masteryScore:0}:{id:`card_${Date.now()}`,concept:`¿Cómo influyen los factores limitantes en ${r} (${a})?`,hint:"Recuerda qué variable impide que el proceso aumente indefinidamente.",explanation:"El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.",masteryScore:0}}createSimulatedSocraticResponse(a,r,o="",s="1eso",u,p){const m=a.toLowerCase();let b="",h=[];const w=m.includes("dame la respuesta")||m.includes("solucion")||m.includes("solución")||m.includes("hazmelo")||m.includes("resuelve")||m.includes("escribe el texto")||m.includes("dime el resultado"),T=m.includes("termin")||m.includes("listo")||m.includes("ya está")||m.includes("completad")||m.includes("entendido todo")||m.includes("ya lo sé")||m.includes("ya lo entiendo");r.toLowerCase().includes("lengua")||o.toLowerCase().includes("oraci")||o.toLowerCase().includes("sintaxis")?s==="1eso"?m.includes("modo")||m.includes("lugar")||m.includes("tren")||m.includes("sujeto")||m.includes("complemento verbal")||m.includes("cv")||m.includes("alarma")||m.includes("exploradores")||m.includes("estación")||T?b=`¡Brillante deducción, Marc! 🎯 Has completado todos los objetivos didácticos exigidos en este nivel de 1º de ESO:

1. **Sujeto:** *"El tren"* (concuerda con el verbo).
2. **Verbo:** *"llegó"* (núcleo del predicado).
3. **Complemento Verbal (CV) en bloque:** *"puntual a la estación"*, aportando información sobre cómo y hacia dónde se produce la acción sin necesidad de clasificaciones abstractas prematuras.

¡Has alcanzado la meta pedagógica de esta tarea con total rigor y autonomía! Tómate un merecido descanso o pasa a la siguiente variación cuando te sientas preparado. 💪

[TAREA_COMPLETADA: ${u||"act_lengua_1eso_1"}]`:w?(b=`¡Me encantaría ahorrarte tiempo Marc, pero si te doy el resultado te quitaría la oportunidad de entrenar tu mente! 💪

Vamos a descubrirlo paso a paso. En *"El tren llegó puntual a la estación"*, ¿quién realiza la acción de llegar?`,h=['El sujeto es "El tren"',"¿Cómo reconozco el sujeto?","¿Cuál es el verbo?"]):(b=`¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨

En la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.

¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`,h=["Aporta información del modo y el lugar del viaje",'El sujeto es "El tren" y el CV es "puntual a la estación"',"¿Por qué en 1º de ESO no distinguimos subtipos?"]):m.includes("concordancia")||m.includes("plural")||m.includes("locomotoras")||m.includes("puntuales")||m.includes("cpred")||m.includes("predicativo")||m.includes("invariable")||T?b=`¡Excelente rigor filológico, Álvaro! 🎓⚖️ Has demostrado formalmente la prueba morfosintáctica requerida en las PAU:

1. **Prueba de concordancia obligatoria:** Al cambiar el sujeto a plural (*"Las locomotoras..."*), el adjetivo varía obligatoriamente (*"Las locomotoras llegaron **puntuales**"*).
2. **Deducción formal:** Esa concordancia en género y número demuestra de forma irrefutable que **"puntual"** es un **Complemento Predicativo (CPred)** del sujeto, y no un CCM (los adverbios como *"puntualmente"* son siempre invariables).
3. **Complemento circunstancial:** *"a la estación"* funciona como Sintagma Preposicional en función de Complemento Circunstancial de Lugar (CCL).

¡Has alcanzado la meta pedagógica preuniversitaria para esta actividad con máxima solvencia! La sesión de estudio queda formalmente finalizada y consolidada. 👏

[TAREA_COMPLETADA: ${u||"act_lengua_2batx_1"}]`:w?(b=`¡Álvaro, en 2º de Bachillerato la PAU exige justificación formal propia! 🎓

Prueba a cambiar el sujeto *"El tren"* por el plural *"Las locomotoras"*. ¿Qué le ocurre al adjetivo *"puntual"*?`,h=['Cambia a plural ("llegaron puntuales")',"¿Por qué un adjetivo no puede ser CCM?","Es una prueba de concordancia"]):(b=`¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚

En la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.

Fíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`,h=['Concuerda con el sujeto ("llegaron puntuales"), es CPred','¿Y qué función sintáctica tiene "a la estación"?',"¿Qué diferencia hay entre CPred y Atributo?"]):(r.toLowerCase().includes("matemática")||r.toLowerCase().includes("mates")||o.toLowerCase().includes("derivada"))&&s==="2batx"?m.includes("3x^2")||m.includes("3x²")||m.includes("-3")||m.includes("tangente")||m.includes("segunda derivada")||m.includes("mínimo")||m.includes("minimo")||m.includes("máximo")||m.includes("maximo")||T?b=`¡Impecable deducción matemática, Álvaro! 📐🎓 Has completado con máximo rigor el análisis de cálculo diferencial exigido en las PAU:

1. **Función derivada:** $f'(x) = 3x^2 - 6x$.
2. **Pendiente y Recta Tangente en $x=1$:** $f(1) = 0$, $m = f'(1) = -3 \\implies y = -3x + 3$.
3. **Puntos críticos:** $f'(x) = 0 \\implies x = 0$ y $x = 2$.
4. **Criterio de la 2ª derivada:** $f''(x) = 6x - 6$. En $x=0$, $f''(0) = -6 < 0$ (Máximo local en $(0,2)$); en $x=2$, $f''(2) = 6 > 0$ (Mínimo local en $(2,-2)$).

¡Has demostrado dominio formal y analítico de las derivadas preuniversitarias! Cerramos con éxito la sesión de hoy. 🎉

[TAREA_COMPLETADA: ${u||"act_mates_2batx_1"}]`:w?(b=`¡Álvaro, en la PAU cada paso de derivación debe justificarse! 💪

Empecemos por el principio: para la función $f(x) = x^3 - 3x^2 + 2$, ¿cuál es su derivada $f'(x)$ aplicando la regla de las potencias?`,h=["La derivada es f'(x) = 3x² - 6x","¿Cómo derivo x³ y -3x²?","¿Cuánto vale f(1) y f'(1)?"]):(b=`¡Hola, Álvaro! En 2º de Bachillerato abordamos el cálculo diferencial con rigor analítico. 📐📚

En la función $f(x) = x^3 - 3x^2 + 2$, para hallar la recta tangente en $x = 1$, necesitamos calcular el punto por el que pasa $(1, f(1))$ y la pendiente de la recta tangente $m = f'(1)$.

¿Cuánto te da la derivada $f'(x)$ y qué valor toma en $x = 1$?`,h=["f'(x) = 3x² - 6x, y f'(1) = -3","¿Cuál es la fórmula punto-pendiente?","¿Cómo encuentro los máximos y mínimos?"]):T?b=`¡Magnífico trabajo de asimilación! 🧠✨ Has revisado con éxito los conceptos clave de **${r}** (${o||"tema curricular"}) demostrando una comprensión sólida y justificada.

Damos por finalizada esta sesión de estudio y repaso para consolidar la memoria a largo plazo y evitar la sobrecarga cognitiva. ¡Enhorabuena por tu constancia! 🎉

[TAREA_COMPLETADA: ${u||"task_general"}]`:p&&p.length>=8?b=`¡Gran esfuerzo durante esta sesión de estudio en **${r}**! 👏 Hemos cubierto los aspectos fundamentales del temario previsto. Para evitar la fatiga mental y fijar lo aprendido, cerramos aquí el bloque de trabajo de hoy.

Descansa un rato y celebra los progresos que has conseguido razonando paso a paso. ¡Objetivo alcanzado! 🚀

[TAREA_COMPLETADA: ${u||"task_pacing"}]`:w?(b=`¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`,h=["Los datos son...","No entiendo bien qué significa este dato","¿Qué fórmula podemos usar?"]):m.includes("no entiendo")||m.includes("duda")||m.includes("dificil")||m.includes("difícil")?(b=`Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${r}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`,h=["Entiendo la teoría pero me cuesta aplicarlo","¿Puedes darme una pista visual o ejemplo?","Creo que el primer paso es identificar las variables"]):(b=`¡Excelente razonamiento! Estás conectando muy bien las ideas en **${r}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`,h=["Creo que aumentaría proporcionalmente","¿Podría haber una excepción a esa regla?","Quiero comprobarlo con otro ejemplo práctico"]);const F=!!b.match(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/i),v=b.replace(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/gi,"").trim();return{id:`msg_${Date.now()}`,role:"tutor",content:v,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!F,isTaskCompleted:F,suggestedPrompts:F?["🎉 ¡Objetivo pedagógico conseguido!","Avanzar a la siguiente variación","Volver a la Agenda"]:h}}}const Ot=new Qs;function Ys(c,a){const r=aa.getCurrentLanguage();c.innerHTML=`
    <div class="w-full transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <img src="./icons/icon-192.png" alt="Anaxagoras AI Logo" class="w-10 h-10 rounded-2xl shadow-md shadow-brand-500/20 object-cover border border-slate-200/80 bg-slate-900" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${y("app.title")}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${y("app.badge")}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${y("app.tagline")}</p>
          </div>
        </div>

        <!-- Global Action Controls -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Standard i18n Language Selector -->
          <div class="relative">
            <select id="lang-selector" class="text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-none rounded-xl py-1.5 px-2.5 cursor-pointer focus:ring-2 focus:ring-brand-500 focus:outline-none transition-colors">
              <option value="es" ${r==="es"?"selected":""}>🇪🇸 Castellano</option>
              <option value="ca" ${r==="ca"?"selected":""}>Català</option>
              <option value="ga" ${r==="ga"?"selected":""}>Galego</option>
              <option value="eu" ${r==="eu"?"selected":""}>Euskera</option>
              <option value="va" ${r==="va"?"selected":""}>Valencià</option>
            </select>
          </div>

          <!-- AI Model Status Pill -->
          <button id="btn-ai-settings" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition-all text-slate-700 hover:border-brand-300">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-soft-pulse"></span>
            <span id="ai-model-label" class="hidden md:inline">Ollama (${y("nav.local")})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </div>
  `;const o=c.querySelector("#lang-selector");o==null||o.addEventListener("change",async p=>{const m=p.target.value;await aa.changeLanguage(m),a.onLanguageChange(m)});const s=c.querySelector("#btn-ai-settings");s==null||s.addEventListener("click",()=>a.onOpenAISettings());const u=c.querySelector("#auth-container");u&&je.subscribe(p=>{var m,b,h;p.isAuthenticated&&p.user?(u.innerHTML=`
          <div class="flex items-center gap-1.5">
            ${p.mode==="demo"?`
              <button id="btn-quick-switch-grade" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold ${p.user.gradeKey==="1eso"?"bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100":"bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100"} transition-all" title="Cambiar rápidamente entre los dos perfiles de prueba de la presentación">
                <span>🔄</span>
                <span>${p.user.gradeKey==="1eso"?"1º ESO":"2º Batx"}</span>
              </button>
            `:""}
            <button id="btn-user-profile" class="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all">
              <img src="${p.user.avatarUrl}" alt="${p.user.name}" class="w-6 h-6 rounded-full object-cover border border-brand-200" />
              <div class="text-left hidden sm:block">
                <span class="block text-xs font-semibold text-slate-800 leading-none">${p.user.name}</span>
                <span class="text-[10px] text-slate-500 leading-none">${p.user.gradeLevel}</span>
              </div>
              <span class="w-2 h-2 rounded-full ${p.mode==="real"?"bg-emerald-500 animate-pulse":"bg-amber-500"} ml-1" title="${p.mode==="real"?"Cuenta Google Real":"Modo Demo Activo"}"></span>
            </button>
          </div>
        `,(m=u.querySelector("#btn-quick-switch-grade"))==null||m.addEventListener("click",()=>{je.toggleGradeProfile()}),(b=u.querySelector("#btn-user-profile"))==null||b.addEventListener("click",a.onOpenAuth)):(u.innerHTML=`
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${y("nav.connectGoogle")}</span>
          </button>
        `,(h=u.querySelector("#btn-connect-google"))==null||h.addEventListener("click",a.onOpenAuth))}),Ot.getSettings().then(p=>{const m=c.querySelector("#ai-model-label");m&&(m.textContent=p.provider==="local"?`${p.modelName} (${y("nav.local")})`:`${p.modelName} (${y("nav.cloud")})`)})}function Js(c,a,r){c.innerHTML=`
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0">
      <div class="flex items-center justify-between border-b border-slate-200/80">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="study"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">💡</span>
            <span>${y("tabs.study")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              ${y("tabs.tutorBadge")}
            </span>
          </button>

          <!-- Tab 2: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="tasks"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📝</span>
            <span>${y("tabs.tasks")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="tasks"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>${y("app.criticalThinking")}</span>
        </div>
      </div>
    </nav>
  `,c.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const u=s.dataset.tab;r.onTabChange(u)})})}function Zs(c,a){Ot.getSettings().then(r=>{var p,m;c.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 border border-slate-100 transition-all my-auto max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">${y("aiModal.title")}</h3>
                <p class="text-xs text-slate-500">${y("aiModal.subtitle")}</p>
              </div>
            </div>
            <button id="btn-close-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              ✕
            </button>
          </div>

          <!-- Form -->
          <form id="ai-settings-form" class="mt-4 sm:mt-6 space-y-4 flex-1 overflow-y-auto pr-1">
            
            <!-- Provider Selector -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">${y("aiModal.inferenceType")}</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="local"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${r.provider==="local"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${y("aiModal.localTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${y("aiModal.localDesc")}</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="cloud"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${r.provider==="cloud"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${y("aiModal.cloudTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${y("aiModal.cloudDesc")}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${y("aiModal.endpointUrl")}</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${r.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${y("aiModal.endpointHint")}</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${y("aiModal.modelName")}</label>
              <input 
                type="text" 
                id="input-model" 
                value="${r.modelName}" 
                placeholder="llama3:latest, gemma2, gpt-4o-mini"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>

            <!-- API Key (Optional) -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${y("aiModal.apiKey")}</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${r.apiKey||""}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${y("aiModal.apiKeyHint")}</span>
            </div>

            <!-- Live Status Alert -->
            <div id="test-result-box" class="hidden p-3 rounded-xl text-xs font-medium"></div>

            <!-- Actions -->
            <div class="pt-4 flex items-center justify-between gap-3 border-t border-slate-100 flex-shrink-0">
              <button 
                type="button" 
                id="btn-test-connection" 
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>⚡</span>
                <span>${y("aiModal.testConnection")}</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  ${y("aiModal.cancel")}
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  ${y("aiModal.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,(p=c.querySelector("#btn-close-modal"))==null||p.addEventListener("click",a.onClose),(m=c.querySelector("#btn-cancel"))==null||m.addEventListener("click",a.onClose);const o=c.querySelector("#btn-test-connection"),s=c.querySelector("#test-result-box");o==null||o.addEventListener("click",async()=>{const b=c.querySelector("#input-endpoint").value,h=c.querySelector("#input-model").value,w=c.querySelector("#input-apikey").value.trim(),T=c.querySelector('input[name="provider"]:checked');o&&(o.innerHTML=`<span>⏳</span><span>${y("aiModal.testing")}</span>`);const O=await Ot.testConnection({provider:(T==null?void 0:T.value)||"local",endpointUrl:b.trim(),modelName:h.trim(),apiKey:w,temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()});o&&(o.innerHTML=`<span>⚡</span><span>${y("aiModal.testConnection")}</span>`),s&&(s.classList.remove("hidden","bg-emerald-50","text-emerald-700","bg-amber-50","text-amber-700"),O.success?(s.classList.add("bg-emerald-50","text-emerald-700"),s.textContent=`✅ ${O.message}`):(s.classList.add("bg-amber-50","text-amber-700"),s.textContent=`ℹ️ ${O.message}`))});const u=c.querySelector("#ai-settings-form");u==null||u.addEventListener("submit",async b=>{b.preventDefault();const h=c.querySelector("#input-endpoint").value.trim(),w=c.querySelector("#input-model").value.trim(),T=c.querySelector("#input-apikey").value.trim(),O=c.querySelector('input[name="provider"]:checked');await Ot.updateSettings({provider:(O==null?void 0:O.value)||"local",endpointUrl:h,modelName:w,apiKey:T,socraticStrictness:"high"}),a.onSaved()})})}function Sn(c,a){var u,p,m,b,h,w,T,O,F;const r=je.getState();c.innerHTML=`
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 border border-slate-100 transition-all my-auto max-h-[92vh] flex flex-col">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <h3 class="font-display font-bold text-lg text-slate-900">${y("authModal.title")}</h3>
              <p class="text-xs text-slate-500">${y("authModal.subtitle")}</p>
            </div>
          </div>
          <button id="btn-close-auth" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-4 sm:mt-6 space-y-5 flex-1 overflow-y-auto pr-1">
          ${r.isAuthenticated&&r.user?`
              <!-- User Profile Card -->
              <div class="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3.5 overflow-hidden">
                  <img src="${r.user.avatarUrl}" alt="${r.user.name}" class="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  <div class="truncate">
                    <h4 class="font-bold text-sm text-slate-900 truncate">${r.user.name}</h4>
                    <p class="text-xs text-slate-500 font-mono truncate">${r.user.email}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                      ${r.user.gradeLevel}
                    </span>
                  </div>
                </div>

                <!-- Mode Badge -->
                <div class="flex-shrink-0">
                  ${r.mode==="real"?`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          ${y("authModal.realBadge")}
                        </span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${y("authModal.demoBadge")}
                        </span>`}
                </div>
              </div>

              <!-- Grade Switcher for TR Live Defense -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
                <div class="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span>🎓</span>
                  <span>Nivel Escolar (Demostración TR):</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button id="btn-modal-set-1eso" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${r.user.gradeKey==="1eso"?"bg-emerald-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟢 1º ESO (12 años)
                  </button>
                  <button id="btn-modal-set-2batx" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${r.user.gradeKey==="2batx"?"bg-purple-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟣 2º Bachillerato (17-18)
                  </button>
                </div>
              </div>

              <!-- Connected Services Status -->
              <div class="space-y-2">
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${y("authModal.authorizedResources")}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${y("authModal.calendarTitle")}</p>
                      <p class="text-[11px] text-slate-500">${y("authModal.calendarDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?y("authModal.statusReal"):y("authModal.statusDemo")}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${y("authModal.driveTitle")}</p>
                      <p class="text-[11px] text-slate-500">${y("authModal.driveDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?y("authModal.statusReal"):y("authModal.statusDemo")}
                  </span>
                </div>
              </div>

              <!-- PWA Version and Update Management -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="text-base">📱</span>
                  <div>
                    <span class="block text-xs font-bold text-slate-800">Actualizaciones de la Aplicación</span>
                    <span class="text-[10px] text-slate-500">PWA instalable • Caché Network-First</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button id="btn-manual-check-update" class="px-3 py-1.5 rounded-xl text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <span>🔄</span>
                    <span>Buscar actualización</span>
                  </button>
                  <button id="btn-force-hard-reset" class="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors" title="Limpiar caché local y forzar descarga limpia">
                    🧹 Limpiar
                  </button>
                </div>
              </div>

              <!-- Switch or Disconnect Actions -->
              <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
                ${r.mode==="demo"?`
                    <button id="btn-show-real-connect" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
                      <span>🔐</span>
                      <span>${y("authModal.realOptionTitle")}</span>
                    </button>
                  `:`
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${y("authModal.demoButton")}</span>
                    </button>
                  `}

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${y("authModal.disconnect")}
                </button>
              </div>
            `:""}

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${r.isAuthenticated?"hidden":"block"} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${y("authModal.realOptionTitle")}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${y("authModal.realOptionDesc")}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${y("authModal.clientIdLabel")}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${r.clientId||""}" 
                placeholder="${y("authModal.clientIdPlaceholder")}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${y("authModal.clientIdHelp")}</span>
            </div>

            <!-- Error message container -->
            <div id="auth-error-box" class="hidden p-3 rounded-xl text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200"></div>

            <!-- Real Connect Button -->
            <button id="btn-do-connect-real" class="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 flex items-center justify-center gap-2 shadow-md shadow-brand-500/25 transition-all">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>${y("authModal.realButton")}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${y("authModal.demoButton")}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `,(u=c.querySelector("#btn-close-auth"))==null||u.addEventListener("click",a.onClose),(p=c.querySelector("#btn-show-real-connect"))==null||p.addEventListener("click",()=>{var v;(v=c.querySelector("#real-connect-box"))==null||v.classList.remove("hidden")}),(m=c.querySelector("#btn-modal-set-1eso"))==null||m.addEventListener("click",()=>{je.setGradeProfile("1eso"),a.onStateChanged(),Sn(c,a)}),(b=c.querySelector("#btn-modal-set-2batx"))==null||b.addEventListener("click",()=>{je.setGradeProfile("2batx"),a.onStateChanged(),Sn(c,a)}),(h=c.querySelector("#btn-manual-check-update"))==null||h.addEventListener("click",async()=>{await An.checkForUpdates(!0)}),(w=c.querySelector("#btn-force-hard-reset"))==null||w.addEventListener("click",async()=>{confirm("¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.")&&await An.forceHardReset()}),(T=c.querySelector("#btn-switch-to-demo"))==null||T.addEventListener("click",async()=>{await je.connectDemo(),a.onStateChanged(),a.onClose()}),(O=c.querySelector("#btn-activate-demo"))==null||O.addEventListener("click",async()=>{await je.connectDemo(),a.onStateChanged(),a.onClose()}),(F=c.querySelector("#btn-disconnect-google"))==null||F.addEventListener("click",()=>{je.disconnect(),a.onStateChanged(),a.onClose()});const o=c.querySelector("#btn-do-connect-real"),s=c.querySelector("#auth-error-box");o==null||o.addEventListener("click",async()=>{const v=c.querySelector("#input-client-id"),H=v==null?void 0:v.value.trim();if(!H){s&&(s.classList.remove("hidden"),s.textContent="Por favor, introduce tu Google OAuth Client ID.");return}o&&(o.innerHTML="<span>⏳ Conectando con Google...</span>");try{await je.connectRealGoogle(H),a.onStateChanged(),a.onClose()}catch(z){o&&(o.innerHTML=`<span>${y("authModal.realButton")}</span>`),s&&(s.classList.remove("hidden"),s.textContent=z.message||"Error al conectar con Google OAuth 2.0.")}})}function kr(c){return String(c||"").replace(/<[^>]*>/g,"").trim()}function Ti(c,a,r){const o=`${kr(c)}/${kr(a)}`;return`<span class="math-fraction inline-flex flex-col items-center justify-center align-middle mx-1 font-serif text-[0.88em] leading-none select-all transition-transform hover:scale-105" aria-label="${o}" title="${o}"><span class="math-num border-b-[1.5px] border-current pb-0.5 px-1 font-bold text-center leading-none">${c}</span><span class="math-den pt-0.5 px-1 font-bold text-center leading-none">${a}</span></span>`}function Xs(c){let a=c;return c==="-"||c==="&minus;"?a="&minus;":c==="*"||c==="x"||c==="\\times"?a="&times;":c==="/"||c==="\\div"?a="&divide;":c==="!="||c==="\\ne"||c==="\\neq"?a="&ne;":c==="<="||c==="\\le"||c==="\\leq"?a="&le;":c===">="||c==="\\ge"||c==="\\geq"?a="&ge;":c==="\\approx"?a="&asymp;":c==="\\pm"?a="&plusmn;":(c==="\\rightarrow"||c==="->")&&(a="&rarr;"),`<span class="math-operator mx-1 font-sans font-bold opacity-80 select-none">${a}</span>`}function Zt(c,a={}){let r=String(c||"").trim();if(r.includes("\\begin{cases}"))return r.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g,(u,p)=>`<div class="inline-flex items-center gap-2 font-serif my-1 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-brand-200/60 shadow-xs"><span class="text-3xl sm:text-4xl font-light text-brand-600 select-none leading-none">{</span><div class="flex flex-col gap-1 text-left text-xs sm:text-sm font-medium text-slate-800">${p.split("\\\\").map(h=>h.trim()).filter(Boolean).map(h=>`<div>${Zt(h,{inner:!0})}</div>`).join("")}</div></div>`);r=r.replace(/\\sqrt\{([^{}]+)\}|sqrt\(([^()]+)\)/g,(u,p,m)=>`§SQRT§${p||m}§ENDSQRT§`),r=r.replace(/\\text\{([^{}]+)\}/g,"§TEXT§$1§ENDTEXT§"),r=r.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(new RegExp("(?<!\\d\\/)\\b(\\d+)\\/(\\d+)\\b(?!\\/\\d)","g"),"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z\+\-]+)/g,(u,p,m)=>`§SUP§${p||m}§ENDSUP§`),r=r.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z\+\-]+)/g,(u,p,m)=>`§SUB§${p||m}§ENDSUB§`);const o={"\\times":"§OP§\\times§ENDOP§","\\div":"§OP§\\div§ENDOP§","\\neq":"§OP§\\neq§ENDOP§","\\ne":"§OP§\\ne§ENDOP§","\\approx":"§OP§\\approx§ENDOP§","\\leq":"§OP§\\leq§ENDOP§","\\le":"§OP§\\le§ENDOP§","\\geq":"§OP§\\geq§ENDOP§","\\ge":"§OP§\\ge§ENDOP§","\\pm":"§OP§\\pm§ENDOP§","\\rightarrow":"§OP§\\rightarrow§ENDOP§","->":"§OP§->§ENDOP§","!=":"§OP§!=§ENDOP§","<=":"§OP§<=§ENDOP§",">=":"§OP§>=§ENDOP§","+":"§OP§+§ENDOP§","-":"§OP§-§ENDOP§","*":"§OP§*§ENDOP§","=":"§OP§=§ENDOP§"},s=Object.keys(o).sort((u,p)=>p.length-u.length);for(const u of s){const p=u.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),m=new RegExp(`(^|\\s|[a-zA-Z0-9§])(${p})($|\\s|[a-zA-Z0-9§])`,"g");r=r.replace(m,`$1${o[u]}$3`)}return r=r.replace(/§FRAC§(.*?)§OVER§(.*?)§ENDFRAC§/g,(u,p,m)=>Ti(p.trim(),m.trim())),r=r.replace(/§OP§(.*?)§ENDOP§/g,(u,p)=>Xs(p)),r=r.replace(/§SQRT§(.*?)§ENDSQRT§/g,(u,p)=>`<span class="inline-flex items-center align-middle mx-1 font-serif"><span class="text-[1.15em] font-serif leading-none mr-0.5">&radic;</span><span class="border-t border-current px-1 leading-tight">${p}</span></span>`),r=r.replace(/§TEXT§(.*?)§ENDTEXT§/g,'<span class="font-sans font-normal mx-1">$1</span>'),r=r.replace(/§SUP§(.*?)§ENDSUP§/g,'<sup class="text-[0.72em] font-bold px-0.5">$1</sup>'),r=r.replace(/§SUB§(.*?)§ENDSUB§/g,'<sub class="text-[0.72em] font-semibold px-0.5">$1</sub>'),a.inner?r:a.badge?`<span class="math-badge inline-flex items-center flex-wrap gap-1 px-3 py-1.5 rounded-2xl bg-brand-50/90 border border-brand-200/90 text-brand-950 font-serif shadow-xs text-xs sm:text-sm ${a.className||""}">${r}</span>`:`<span class="math-expr inline-flex items-center flex-wrap font-serif align-middle ${a.className||""}">${r}</span>`}function Ct(c,a={}){if(!c)return"";const r=[];let o=c.replace(/<[^>]+>/g,w=>{const T=`§§HTML_TAG_${r.length}§§`;return r.push({key:T,tag:w}),T});const s=[];function u(w){const T=`§§MATH_TOKEN_${s.length}§§`;return s.push({key:T,html:w}),T}const p=/\b(?:Real\s+Decreto|Decreto|Decret|RD|Ley(?:\s+Orgánica)?|Llei|Orden|Ordre|Resolución|BOE|DOGV|DOGC|núm\.|número)\s+[A-Za-z0-9\.\-\/]*\s*\d+\/\d+/gi;o=o.replace(p,w=>u(w));const m=new RegExp("(?<![a-zA-Z0-9\\-\\/])\\d{1,4}\\/(?:19|20)\\d{2}(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(m,w=>u(w)),o=o.replace(/\$\$([\s\S]*?)\$\$/g,(w,T)=>u(`<div class="my-2.5 flex justify-center w-full overflow-x-auto py-1">${Zt(T,{badge:!0,className:"shadow-sm border-brand-300"})}</div>`)),o=o.replace(/\$([^\$\n]+)\$/g,(w,T)=>u(Zt(T,{badge:!1,inner:!1})));const b=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+\\/\\d+)(\\s*[\\+\\-\\*\\/=]\\s*\\d+\\/\\d+)+(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(b,w=>u(a.badge?Zt(w,{badge:!0}):Zt(w,{badge:!1})));const h=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+)\\/(?!(?:19|20)\\d{2}\\b)(\\d+)(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(h,(w,T,O)=>u(Ti(T,O)));for(const{key:w,html:T}of s)o=o.replace(w,T);for(const{key:w,tag:T}of r)o=o.replace(w,T);return o}function el(c,a,r){return`
    <div class="math-card flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-50/90 via-indigo-50/70 to-cyan-50/40 border border-brand-200/90 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center gap-2.5 flex-wrap flex-1">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200/80 shadow-2xs flex-shrink-0">
          ${c}
        </span>
        <div class="font-serif text-sm sm:text-base text-slate-900 flex items-center flex-wrap gap-1">
          ${Ct(a)}
        </div>
      </div>
      ${r?`<span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white text-brand-700 border border-brand-200 shadow-2xs whitespace-nowrap">${r}</span>`:""}
    </div>
  `}function He(c,a=!0){const r=c.replace(/^# (.*$)/gim,'<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200/80">$1</h2>').replace(/^## (.*$)/gim,'<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>').replace(/^### (.*$)/gim,'<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1 text-brand-700">$1</h4>').replace(/\*\*(.*?)\*\*/gim,'<strong class="font-bold text-slate-900">$1</strong>').replace(/\*(.*?)\*/gim,'<em class="italic text-slate-700">$1</em>').replace(/```json([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/```([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/^\- (.*$)/gim,'<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>').replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>').replace(/\n\n/gim,"<br/><br/>");return a?Ct(r):r}function tl(c,a){return c.includes("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?c.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/).map(o=>o.startsWith("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?He(o,!1):He(o,!0)).join(""):He(c,!0)}function jt(c,a,r,o){var L;const s=o,u=s.assembledPrompt,p=s.assembledAgendaPrompt;let m=!0;const b=[];if(u){b.push({id:"consolidated",isConsolidated:!0,icon:"🔀",levelBadge:y("promptModal.tabs.all"),badgeClass:"bg-slate-900 text-white border-slate-700",title:y("promptModal.titleAssembled",{subject:u.subject}),subtitle:y("promptModal.subtitleAssembled",{topic:u.topicName}),source:"Pipeline de Memoria en Ejecución (Orquestador Dinámico)",rawContent:u.systemInstruction,formattedHtml:tl(u.systemInstruction),isOpen:!0,accentColor:"#3b82f6",nodeRingClass:"focus:ring-brand-500 border-slate-700 hover:border-brand-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const M=u.layers.level1Functional;b.push({id:"level1",isConsolidated:!1,icon:"🧠",levelBadge:M.badge||y("promptModal.tabs.level1"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:M.title,subtitle:M.subtitle,source:M.source,rawContent:M.content,formattedHtml:He(M.content,!0),isOpen:!1,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-brand-200 hover:border-brand-400 hover:bg-brand-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-brand-200"});const q=u.layers.level3Regulatory;b.push({id:"level3",isConsolidated:!1,icon:"⚖️",levelBadge:q.badge||y("promptModal.tabs.level3"),badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:q.title,subtitle:q.subtitle,source:q.source,rawContent:q.content,formattedHtml:He(q.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const j=u.layers.level2BaseTopic;if(b.push({id:"level2A",isConsolidated:!1,icon:"🏛️",levelBadge:j.badge||y("promptModal.tabs.level2A"),badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:j.title,subtitle:j.subtitle,source:j.source,rawContent:j.content,formattedHtml:He(j.content,!0),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"}),u.layers.level2SpecificActivity){const N=u.layers.level2SpecificActivity;b.push({id:"level2B",isConsolidated:!1,icon:"🎯",levelBadge:N.badge||y("promptModal.tabs.level2B"),badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:N.title,subtitle:N.subtitle,source:N.source,rawContent:N.content,formattedHtml:He(N.content,!0),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}}else if(p){b.push({id:"agenda_consolidated",isConsolidated:!0,icon:"🔀",levelBadge:"Consolidado Agenda",badgeClass:"bg-slate-900 text-white border-slate-700",title:p.title,subtitle:p.subtitle,source:"Consolidación Multivariable de Agenda Escolar",rawContent:p.systemInstruction,formattedHtml:He(p.systemInstruction,!1),isOpen:!0,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-slate-700 hover:border-cyan-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const M=p.pillars.timeDistribution;b.push({id:"agenda_time",isConsolidated:!1,icon:"⏱️",levelBadge:M.badge,badgeClass:"bg-cyan-50 text-cyan-700 border-cyan-200",title:M.title,subtitle:M.subtitle,source:M.source,rawContent:M.content,formattedHtml:He(M.content,!1),isOpen:!1,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-cyan-200"});const q=p.pillars.priorityOrder;b.push({id:"agenda_priority",isConsolidated:!1,icon:"🎯",levelBadge:q.badge,badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:q.title,subtitle:q.subtitle,source:q.source,rawContent:q.content,formattedHtml:He(q.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const j=p.pillars.commitmentDeadlines;b.push({id:"agenda_deadlines",isConsolidated:!1,icon:"📅",levelBadge:j.badge,badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:j.title,subtitle:j.subtitle,source:j.source,rawContent:j.content,formattedHtml:He(j.content,!1),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"});const N=p.pillars.adaptiveFlexibility;b.push({id:"agenda_adaptive",isConsolidated:!1,icon:"🔄",levelBadge:N.badge,badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:N.title,subtitle:N.subtitle,source:N.source,rawContent:N.content,formattedHtml:He(N.content,!1),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}else{const M=a.includes("Nivel 3")||a.includes("Regulador")||(s.subtitle||"").includes("Regulador");b.push({id:"standalone",isConsolidated:!0,icon:s.institution?"🏛️":"📄",levelBadge:((L=s.badge)==null?void 0:L.text)||y("promptModal.badgePrompt"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:a,subtitle:s.subtitle||y("promptModal.defaultSubtitle"),source:s.sourceApi||s.institution,rawContent:r,formattedHtml:He(r,!M),isOpen:!0,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-slate-700",nodeBgClass:"bg-slate-900 text-white",nodeBorderClass:"border-slate-700"})}const h=b.find(M=>M.isConsolidated),w=b.filter(M=>!M.isConsolidated),T=w.length>0;function O(){var N;const M=u?y("promptModal.titleAssembled",{subject:u.subject}):p?p.title:a,q=u?y("promptModal.subtitleAssembled",{topic:u.topicName}):s.subtitle||y("promptModal.defaultSubtitle"),j=u?y("promptModal.badge4Layers"):p?"Estructura Propia de Agenda":((N=s.badge)==null?void 0:N.text)||y("promptModal.badgePrompt");return`
      <div id="prompt-modal-backdrop" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 border border-slate-100 max-h-[92vh] flex flex-col transition-all my-auto">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${p?"⏱️":u?"🧩":s.institution?"🏛️":"📄"}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${M}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${j}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${q}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              ${T?`
                <button id="btn-toggle-graph" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${m?"bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100":"bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}" title="${y(m?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}">
                  <span>📐</span>
                  <span class="hidden sm:inline">${y(m?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}</span>
                </button>
              `:""}
              <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${y("promptModal.close")}">
                ✕
              </button>
            </div>
          </div>

          <!-- Scrollable Body -->
          <div class="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 py-3 custom-scrollbar">

            ${T?`
              <!-- Seccion Grafo Visual SVG / HTML -->
              <div id="graph-panel-wrapper" class="bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 transition-all shadow-xs ${m?"block":"hidden"}">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">📐</span>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900">${y("promptModal.graphTitle")}</h4>
                      <p class="text-[11px] text-slate-500">${y("promptModal.graphSubtitle")}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    ${w.length} Capas ➔ 1 Ensamblado
                  </span>
                </div>

                <div class="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5 italic">
                  <span>💡</span>
                  <span>${y("promptModal.clickToInspect")}</span>
                </div>

                <!-- Canvas del Grafo -->
                <div id="prompt-graph-canvas" class="relative rounded-xl p-3 sm:p-4 bg-slate-900/[0.02] border border-slate-200/60 overflow-hidden">
                  
                  <!-- Conectores SVG Dinámicos -->
                  <svg id="prompt-graph-svg" class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  </svg>

                  <div class="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center">
                    
                    <!-- Columna Izquierda: Nodos de Entrada Discretos -->
                    <div class="sm:col-span-6 flex flex-col gap-2.5">
                      ${w.map(B=>`
                        <div 
                          data-node-id="${B.id}"
                          data-node-color="${B.accentColor}"
                          class="graph-input-node p-2.5 sm:p-3 rounded-xl border ${B.nodeBorderClass} bg-white shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between group hover:scale-[1.01]"
                          title="Clic para ver detalles de ${B.levelBadge}"
                        >
                          <div class="flex items-center gap-2.5 min-w-0">
                            <span class="text-lg p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                              ${B.icon}
                            </span>
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5">
                                <span class="text-xs font-bold text-slate-800 truncate">${B.title}</span>
                              </div>
                              <span class="text-[10px] font-medium text-slate-500 truncate block">${B.subtitle}</span>
                            </div>
                          </div>
                          <span class="px-2 py-0.5 rounded-md text-[9px] font-bold ${B.badgeClass} flex-shrink-0 ml-2">
                            ${B.levelBadge}
                          </span>
                        </div>
                      `).join("")}
                    </div>

                    <!-- Columna Derecha: Nodo de Ensamblado Consolidado -->
                    <div class="sm:col-span-6 flex flex-col justify-center items-center">
                      ${h?`
                        <div 
                          id="node-consolidated"
                          data-node-id="${h.id}"
                          data-node-color="${h.accentColor}"
                          class="w-full p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10 border border-slate-700/80 cursor-pointer hover:border-brand-400 hover:shadow-brand-500/20 transition-all duration-200 group hover:scale-[1.01]"
                          title="Clic para ver el Ensamblado Completo en el acordeón"
                        >
                          <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                              <span class="text-xl p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-brand-400">🔀</span>
                              <div>
                                <span class="text-xs font-extrabold uppercase tracking-wider text-brand-300">Ensamblado Final</span>
                                <h4 class="text-sm font-bold text-white">${h.title}</h4>
                              </div>
                            </div>
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                              Prompt Consolidado
                            </span>
                          </div>
                          <p class="text-[11px] text-slate-300 line-clamp-2 mt-1">
                            ${h.subtitle}
                          </p>
                          <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Confluencia de ${w.length} capas curriculares</span>
                            <span class="text-brand-300 font-bold group-hover:underline flex items-center gap-1">
                              Inspeccionar ➔
                            </span>
                          </div>
                        </div>
                      `:""}
                    </div>

                  </div>
                </div>
              </div>
            `:""}

            <!-- Barra de Acciones del Acordeón -->
            <div class="flex items-center justify-between gap-2 pt-1 pb-1 flex-wrap">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-slate-700 text-xs">${y("promptModal.discreteComponents")}:</span>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button id="btn-expand-all" class="text-[11px] font-bold text-brand-700 hover:text-brand-800 hover:underline">
                  ${y("promptModal.expandAll")}
                </button>
                <span class="text-slate-300">|</span>
                <button id="btn-collapse-all" class="text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:underline">
                  ${y("promptModal.collapseAll")}
                </button>
              </div>
            </div>

            <!-- Lista de Acordeón con Contenido Markdown de cada Capa -->
            <div class="space-y-3">
              ${b.map(B=>`
                <div 
                  id="accordion-section-${B.id}"
                  class="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-all duration-200"
                >
                  <!-- Cabecera del Acordeón -->
                  <div 
                    data-toggle-id="${B.id}"
                    class="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${B.isConsolidated?"bg-slate-900 text-white shadow-sm":"bg-slate-100 text-slate-700 border border-slate-200"}">
                        ${B.icon}
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${B.title}</h4>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${B.badgeClass}">
                            ${B.levelBadge}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500 truncate">${B.subtitle}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button 
                        data-copy-id="${B.id}" 
                        class="btn-copy-prompt px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 shadow-2xs transition-all"
                        title="${y("promptModal.copyPrompt")}"
                      >
                        <span>📋</span>
                        <span class="copy-label hidden sm:inline">${y("promptModal.copyPrompt")}</span>
                      </button>

                      <div 
                        id="chevron-${B.id}" 
                        class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs transition-transform duration-200 ${B.isOpen?"rotate-180 bg-slate-200 text-slate-800":""}"
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  <!-- Cuerpo Markdown Desplegable -->
                  <div 
                    id="body-${B.id}" 
                    class="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition-all ${B.isOpen?"block":"hidden"}"
                  >
                    ${B.source?`
                      <div class="mb-3 text-[11px] font-mono text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-xl truncate flex items-center gap-2">
                        <span class="font-bold text-slate-600">${y("promptModal.sourceLabel")}</span>
                        <span class="truncate text-slate-700">${B.source}</span>
                      </div>
                    `:""}

                    <div class="leading-relaxed text-xs text-slate-700 space-y-2.5 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto">
                      ${B.formattedHtml}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="pt-3.5 mt-2 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500 truncate max-w-[280px] sm:max-w-none">
              ${y(u?"promptModal.footerGraph":"promptModal.footerAudit")}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${y("promptModal.close")}
            </button>
          </div>

        </div>
      </div>
    `}function F(){if(!T||!m)return;const M=c.querySelector("#prompt-graph-svg"),q=c.querySelector("#prompt-graph-canvas"),j=c.querySelector("#node-consolidated");if(!M||!q||!j)return;const N=M.getBoundingClientRect();if(N.width===0||N.height===0)return;const B=j.getBoundingClientRect(),te=c.querySelectorAll(".graph-input-node");if(te.length===0)return;const Ee=B.left>=te[0].getBoundingClientRect().right-20;let Ce=`
      <defs>
        <marker id="arrow-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
        </marker>
    `;te.forEach(ce=>{const be=ce.dataset.nodeId,ne=ce.dataset.nodeColor||"#6366f1";Ce+=`
        <marker id="arrow-${be}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${ne}" />
        </marker>
      `}),Ce+="</defs>",te.forEach(ce=>{const be=ce.dataset.nodeId,ne=ce.dataset.nodeColor||"#6366f1",ve=ce.getBoundingClientRect();if(Ee){const pe=ve.right-N.left,Pe=ve.top+ve.height/2-N.top,ae=B.left-N.left,re=B.top+B.height/2-N.top,ie=Math.max(20,ae-pe),he=pe+ie*.45,Re=Pe,Be=ae-ie*.45;Ce+=`
          <path id="path-${be}" d="M ${pe} ${Pe} C ${he} ${Re}, ${Be} ${re}, ${ae} ${re}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${ne}"
            class="transition-all duration-300 connector-path" />
        `}else{const pe=ve.left+ve.width/2-N.left,Pe=ve.bottom-N.top,ae=B.left+B.width/2-N.left,re=B.top-N.top,ie=Math.max(20,re-Pe),he=pe,Re=Pe+ie*.45,Be=ae,Ue=re-ie*.45;Ce+=`
          <path id="path-${be}" d="M ${pe} ${Pe} C ${he} ${Re}, ${Be} ${Ue}, ${ae} ${re}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${ne}"
            class="transition-all duration-300 connector-path" />
        `}}),M.innerHTML=Ce}function v(){b.forEach(M=>{const q=c.querySelector(`#body-${M.id}`),j=c.querySelector(`#chevron-${M.id}`),N=c.querySelector(`[data-jump-to="${M.id}"]`);q&&(M.isOpen?(q.classList.remove("hidden"),q.classList.add("block")):(q.classList.remove("block"),q.classList.add("hidden"))),j&&(M.isOpen?j.classList.add("rotate-180","bg-slate-200","text-slate-800"):j.classList.remove("rotate-180","bg-slate-200","text-slate-800")),N&&(M.isOpen?N.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-900 text-white border-slate-900 shadow-xs":N.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200")})}function H(M){const q=b.find(j=>j.id===M);q&&(q.isOpen=!0,v(),setTimeout(()=>{const j=c.querySelector(`#accordion-section-${M}`);j&&(j.scrollIntoView({behavior:"smooth",block:"nearest"}),j.classList.add("ring-2","ring-brand-500","shadow-md"),setTimeout(()=>{j.classList.remove("ring-2","ring-brand-500","shadow-md")},1500))},40))}function z(){document.removeEventListener("keydown",Y),J&&J.disconnect(),s.onClose()}function Y(M){M.key==="Escape"&&z()}c.innerHTML=O();let J=null;function fe(){var Ee,Ce,ce,be;document.addEventListener("keydown",Y),(Ee=c.querySelector("#btn-close-prompt-modal"))==null||Ee.addEventListener("click",z),(Ce=c.querySelector("#btn-close-prompt-btn"))==null||Ce.addEventListener("click",z);const M=c.querySelector("#prompt-modal-backdrop");M==null||M.addEventListener("click",ne=>{ne.target===M&&z()});const q=c.querySelector("#btn-toggle-graph");q==null||q.addEventListener("click",()=>{m=!m;const ne=c.querySelector("#graph-panel-wrapper");ne&&(m?(ne.classList.remove("hidden"),ne.classList.add("block"),q.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100",requestAnimationFrame(()=>F())):(ne.classList.remove("block"),ne.classList.add("hidden"),q.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"))}),(ce=c.querySelector("#btn-expand-all"))==null||ce.addEventListener("click",()=>{b.forEach(ne=>ne.isOpen=!0),v()}),(be=c.querySelector("#btn-collapse-all"))==null||be.addEventListener("click",()=>{b.forEach(ne=>ne.isOpen=!1),v()}),c.querySelectorAll("[data-toggle-id]").forEach(ne=>{ne.addEventListener("click",ve=>{if(ve.target.closest(".btn-copy-prompt"))return;const pe=ne.dataset.toggleId,Pe=b.find(ae=>ae.id===pe);Pe&&(Pe.isOpen=!Pe.isOpen,v())})}),c.querySelectorAll("[data-jump-to]").forEach(ne=>{ne.addEventListener("click",()=>{const ve=ne.dataset.jumpTo;ve&&H(ve)})}),c.querySelectorAll(".btn-copy-prompt").forEach(ne=>{ne.addEventListener("click",async ve=>{ve.stopPropagation();const pe=ne,Pe=pe.dataset.copyId,ae=b.find(re=>re.id===Pe);if(ae)try{await navigator.clipboard.writeText(ae.rawContent);const re=pe.querySelector(".copy-label"),ie=re?re.textContent:"";re&&(re.textContent=y("promptModal.copied")),pe.classList.remove("text-slate-600","bg-white"),pe.classList.add("text-emerald-700","bg-emerald-50","border-emerald-300"),setTimeout(()=>{re&&(re.textContent=ie),pe.classList.remove("text-emerald-700","bg-emerald-50","border-emerald-300"),pe.classList.add("text-slate-600","bg-white")},2e3)}catch(re){console.error("Error al copiar al portapapeles:",re)}})});const j=c.querySelectorAll(".graph-input-node"),N=c.querySelector("#node-consolidated"),B=c.querySelector("#prompt-graph-svg");j.forEach(ne=>{const ve=ne.dataset.nodeId;ne.addEventListener("mouseenter",()=>{if(!B)return;const pe=B.querySelector(`#path-${ve}`);pe&&(pe.setAttribute("stroke",pe.dataset.accentColor||"#6366f1"),pe.setAttribute("stroke-width","3.5"),pe.setAttribute("marker-end",`url(#arrow-${ve})`))}),ne.addEventListener("mouseleave",()=>{if(!B)return;const pe=B.querySelector(`#path-${ve}`);pe&&(pe.setAttribute("stroke",pe.dataset.defaultStroke||"#cbd5e1"),pe.setAttribute("stroke-width","2"),pe.setAttribute("marker-end","url(#arrow-default)"))}),ne.addEventListener("click",()=>{ve&&H(ve)})}),N&&B&&(N.addEventListener("mouseenter",()=>{B.querySelectorAll(".connector-path").forEach(ne=>{ne.setAttribute("stroke",ne.dataset.accentColor||"#6366f1"),ne.setAttribute("stroke-width","3");const ve=ne.id.replace("path-","");ne.setAttribute("marker-end",`url(#arrow-${ve})`)})}),N.addEventListener("mouseleave",()=>{B.querySelectorAll(".connector-path").forEach(ne=>{ne.setAttribute("stroke",ne.dataset.defaultStroke||"#cbd5e1"),ne.setAttribute("stroke-width","2"),ne.setAttribute("marker-end","url(#arrow-default)")})}),N.addEventListener("click",()=>{const ne=N.dataset.nodeId;ne&&H(ne)}));const te=c.querySelector("#prompt-graph-canvas");te&&typeof ResizeObserver<"u"&&(J=new ResizeObserver(()=>{requestAnimationFrame(()=>F())}),J.observe(te))}fe(),requestAnimationFrame(()=>F())}const xt=new Map;let Lt=null,Tr=!1;function Dr(c){return c.includes("Lengua")?"📖":c.includes("Naturales")||c.includes("Ciencias")?"🌿":c.includes("Matemáticas")||c.includes("Mates")?"📐":c.includes("Sociales")||c.includes("Historia")?"🏛️":c.includes("Filosofía")?"🧠":c.includes("Química")?"🧪":c.includes("Tecnología")?"⚙️":c.includes("Tutoría")||c.includes("Lectura")?"📚":"💡"}function $r(c){return c.includes("Lengua")?"bg-cyan-50 text-cyan-700 border border-cyan-200":c.includes("Naturales")||c.includes("Química")?"bg-emerald-50 text-emerald-700 border border-emerald-200":c.includes("Matemáticas")||c.includes("Mates")?"bg-indigo-50 text-indigo-700 border border-indigo-200":c.includes("Sociales")||c.includes("Historia")||c.includes("Filosofía")?"bg-amber-50 text-amber-800 border border-amber-200":c.includes("Tutoría")||c.includes("Lectura")?"bg-purple-50 text-purple-700 border border-purple-200":"bg-slate-100 text-slate-700 border border-slate-200"}function al(c,a){const r=c.subject.includes("Lengua"),o=c.gradeKey==="2batx";let s=`¡Hola! Soy tu tutor socrático en **${c.subject}** (*${c.name}*).

Aquí no te daré soluciones directas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.

`;a?s+=`🎯 **Reto activo:** *${a.title}*
*"${a.sentenceOrCase}"*

¿Por dónde te gustaría empezar a razonarlo?`:s+="¿Qué duda o ejercicio estás abordando ahora mismo?";let u=["No sé cómo empezar el ejercicio","Tengo dudas con el primer paso","Quiero repasar la teoría básica"];return r&&!o?(a==null?void 0:a.order)===2?(s=`¡Hola Marc! Pasamos a la **Variación 1** de sintaxis oracional: 🚂🔄

Fíjate en esta oración: *"Por la mañana sonó ruidosa la alarma en el pasillo"*

Aquí el orden ha cambiado y la oración no empieza por el sujeto. ¿Qué palabra realiza la acción y con cuál concuerda el verbo *sonó*?`,u=['El sujeto es "la alarma", concuerda con "sonó"','¿Por qué "Por la mañana" no es el sujeto?',"¿Qué forma el complemento verbal en bloque?"]):(a==null?void 0:a.order)===3?(s=`¡Excelente avance Marc! Vamos con la **Variación 2** (Transferencia a contexto narrativo): 🎒🌲

Oración: *"Los jóvenes exploradores regresaron cansados al campamento al anochecer"*

¿Quién es el sujeto plural y qué palabras acompañan al verbo *regresaron* explicando cómo y hacia dónde se mueven?`,u=['El sujeto es "Los jóvenes exploradores"','El complemento verbal es "cansados al campamento al anochecer"',"¿Por qué no separamos los tipos de complementos?"]):(s=`¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨

En 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con clasificaciones abstractas.

Por ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`,u=['El sujeto es "El tren" y el verbo "llegó"',"¿Qué palabras forman el complemento verbal?","¿Cómo distingo el sujeto del predicado?"]):r&&o?(a==null?void 0:a.order)===2?(s=`¡Hola Álvaro! Abordamos la **Variación 1** (Doble predicación sobre el CD - PAU): 🎓⚖️

Oración: *"El tribunal consideró inocente al acusado tras el juicio"*

Aquí el adjetivo *inocente* no se refiere al sujeto (*El tribunal*), sino al CD (*al acusado*). ¿Qué prueba sintáctica formal demuestra la concordancia entre el CD y el Complemento Predicativo?`,u=['Si fuera plural: "consideró inocentes a los acusados"','¿Cómo demuestro que "al acusado" es CD?',"¿Por qué no es una oración atributiva?"]):(a==null?void 0:a.order)===3?(s=`¡Hola Álvaro! Desafío de **Variación 2** (Contraste formal CPred vs CCM): 🎓🔍

Compara estas dos oraciones de examen PAU:
- A: *"El tren llegó puntual a la estación."*
- B: *"El tren llegó puntualmente a la estación."*

¿Qué prueba morfosintáctica demuestra que en A tenemos un CPred y en B un CC de Modo?`,u=['"Puntual" concuerda en plural; "puntualmente" es invariable',"¿Por qué un adjetivo no puede ser CCM según la RAE?",'¿Qué función tiene "a la estación" en ambas?']):(s=`¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚

En este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal y demostrarlo con pruebas formales.

Considera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica demuestra que es un **Complemento Predicativo (CPred)**?`,u=['"Puntual" concuerda con el sujeto en género y número','¿Y qué función sintáctica tiene "a la estación"?',"¿Cómo distingo un CPred de un Atributo?"]):(c.id==="topic_mates_2batx"||c.subject.includes("Matemática"))&&o&&(s=`¡Hola, Álvaro! Soy tu tutor socrático en **Matemáticas II (2º de Bachillerato - Preparación PAU)**. 📐🎓

Abordamos el bloque de análisis y cálculo diferencial con la función $f(x) = x^3 - 3x^2 + 2$.

Para hallar la recta tangente a la curva en $x = 1$, ¿qué dos valores necesitamos calcular primero y cómo se relacionan con la derivada?`,u=["Necesitamos el punto f(1) y la pendiente f'(1)","¿Cómo calculo la derivada f'(x)?","¿Cuál es la fórmula punto-pendiente?"]),{id:`msg_welcome_${Date.now()}`,role:"tutor",content:s,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:u}}function Lr(c,a){return c.subject.includes("Lengua")?a==="1eso"?{concept:'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?',explanation:'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'}:{concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?',explanation:'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'}:c.id==="topic_mates_2batx"||c.subject.includes("Matemática")&&a==="2batx"?{concept:"En 2º de Bachillerato, ¿cuál es el significado geométrico de la derivada f'(a) y qué condición de la 2ª derivada determina un mínimo?",explanation:"f'(a) es la pendiente de la recta tangente a la curva en x=a. Para un mínimo local, f'(a)=0 y f''(a) > 0 (curvatura hacia arriba)."}:{concept:`¿Cómo definirías la idea clave o causa fundamental de ${c.name}?`,explanation:`Comprender los principios de ${c.name} articulando sus conceptos base: ${c.keyConcepts.join(", ")}.`}}function nl(c){const a=c.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>");return Ct(a)}function rl(c){var fe;const a=je.getState(),r=((fe=a.user)==null?void 0:fe.gradeKey)||"1eso",o=a.user,s=Oe.getTopicsForGrade(r);async function u(){if(!Tr)try{const L=await Bs();for(const M of L)xt.set(M.topicId,M);Tr=!0}catch(L){console.warn("[StudyView] Error loading from IndexedDB:",L)}s.forEach(L=>{var N,B,te,Ee,Ce;const M=Oe.getActivitiesForTopic(L.id),q=Lr(L,r),j=xt.get(L.id);if(j)L.id==="topic_mates_2batx"&&((B=j.flashcardConcept)!=null&&B.includes("Sistemas")||(te=j.flashcardConcept)!=null&&te.includes("Matrices")||(Ee=j.selectedActivityId)!=null&&Ee.includes("parametro_k"))&&(j.selectedActivityId=((Ce=M[0])==null?void 0:Ce.id)||"",j.flashcardConcept=q.concept,j.flashcardExplanation=q.explanation,j.messages=[],j.status="pending",Je(j));else{const ce={topicId:L.id,status:"pending",selectedActivityId:((N=M[0])==null?void 0:N.id)||"",messages:[],flashcardConcept:q.concept,flashcardExplanation:q.explanation,flashcardRevealed:!1};xt.set(L.id,ce)}}),F()}function p(L){var q;let M=xt.get(L);if(!M){const j=s.find(te=>te.id===L)||s[0],N=Oe.getActivitiesForTopic(j.id),B=Lr(j,r);M={topicId:j.id,status:"pending",selectedActivityId:((q=N[0])==null?void 0:q.id)||"",messages:[],flashcardConcept:B.concept,flashcardExplanation:B.explanation,flashcardRevealed:!1},xt.set(L,M)}return M}async function m(L){for(const[q,j]of xt.entries())q!==L&&j.status==="active"&&(j.status="paused",await Je(j));Lt=L;const M=p(L);if(M.status!=="completed"&&(M.status="active"),M.lastActiveAt=new Date().toISOString(),M.messages.length===0){const q=s.find(j=>j.id===L);if(q){const j=Oe.getActivitiesForTopic(q.id),N=j.find(B=>B.id===M.selectedActivityId)||j[0];M.messages=[al(q,N)]}}await Je(M),F()}async function b(L){const M=p(L);M.status==="active"&&(M.status="paused"),Lt=null,await Je(M),F()}function h(){Lt=null,F()}async function w(L,M){const q=p(L);q.selectedActivityId=M,q.status==="completed"&&(q.status="active");const j=s.find(N=>N.id===L);if(j){const B=Oe.getActivitiesForTopic(j.id).find(te=>te.id===M);if(B){const te={id:`msg_var_${Date.now()}`,role:"tutor",content:`🎯 **Activitat actualitzada a ${B.title}:**
*"${B.sentenceOrCase}"*

¿Por dónde empezamos a analizar esta nueva variación?`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Qué cambia respecto al paso anterior?","Identifiquemos el sujeto y el verbo primero","Dame una pista sobre este reto"]};q.messages.push(te)}}await Je(q),F()}async function T(L,M){const q=p(L),j=s.find(Ee=>Ee.id===L);if(!j)return;const N={id:`msg_u_${Date.now()}`,role:"student",content:M,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};q.messages.push(N),q.lastActiveAt=new Date().toISOString(),await Je(q),F();const B=c.querySelector(`#btn-send-message-${L}`);B&&(B.innerHTML="<span>⏳</span>");const te=await Ot.generateSocraticResponse(M,j.subject,j.id,q.messages,q.selectedActivityId);q.messages.push(te),te.isTaskCompleted&&(q.status="completed",q.completedAt=new Date().toISOString(),q.completionSummary=te.content,await qs(j.subject,j.name)),await Je(q),F()}function O(L){const M=L.role==="tutor";return`
      <div class="flex gap-3 ${M?"items-start":"items-start flex-row-reverse"}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${M?"bg-brand-500 text-white shadow-md shadow-brand-500/25":"bg-slate-800 text-white"}">
          ${M?"🧠":"👤"}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${M?"bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60":"bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10"}">
            <div class="prose prose-sm max-w-none">
              ${nl(L.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${M?"pl-1":"justify-end pr-1"}">
            <span>${y(M?"study.tutorRole":"study.userRole")}</span>
            <span>•</span>
            <span>${L.timestamp}</span>
          </div>
        </div>
      </div>
    `}function F(){if(Lt){const L=s.find(M=>M.id===Lt);if(L){z(L);return}else Lt=null}v()}function v(){const L=Array.from(xt.values()).find(B=>B.status==="active"),M=L?s.find(B=>B.id===L.topicId):null,q=c.querySelector("#study-tasks-list"),j=q?q.scrollTop:0;c.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera fija de la vista de Estudio (mantenida fija en la parte superior) -->
        <div id="study-view-header" class="flex-shrink-0 pt-4 pb-3 space-y-3">
          
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-display font-bold text-slate-900">
                  ${y("study.taskListTitle")}
                </h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full ${r==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                  ${(o==null?void 0:o.name)||"Estudiant"} • ${(o==null?void 0:o.gradeLevel)||(r==="2batx"?"2º Batx PAU":"1º de ESO")}
                </span>
                ${M?`<span class="text-xs px-2.5 py-0.5 rounded-full ${(L==null?void 0:L.status)==="completed"?"bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold":"bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold"} flex items-center gap-1.5">
                         <span class="w-1.5 h-1.5 rounded-full ${(L==null?void 0:L.status)==="completed"?"bg-emerald-600":"bg-emerald-500 animate-pulse"}"></span>
                         <span>${(L==null?void 0:L.status)==="completed"?y("study.statusCompleted"):`1 ${y("study.activeBadge")}`}: ${M.subject}</span>
                       </span>`:`<span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                         ${y("study.statusPending")}
                       </span>`}
              </div>
              <p class="text-xs text-slate-500 mt-1">${y("study.taskListSubtitle")}</p>
            </div>

            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <span class="text-xs px-3 py-1.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 font-semibold flex items-center gap-1">
                <span>🛡️</span>
                <span>${y("study.safeMode")}</span>
              </span>
            </div>
          </div>

          <!-- Pedagogical Guarantee Banner -->
          <div class="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan text-white shadow-md shadow-brand-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                💡
              </div>
              <div>
                <h3 class="font-display font-bold text-sm sm:text-base">${y("study.bannerTitle")}</h3>
                <p class="text-[11px] sm:text-xs text-white/90">${y("study.bannerGraphDesc")}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3 py-1 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold self-stretch md:self-auto justify-center">
              <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span>${r==="2batx"?"Álvaro Martín (2º Batx PAU)":"Marc Vidal (1º ESO)"}</span>
            </div>
          </div>

        </div>

        <!-- Lista de tareas en modo resumen: Solo se visualizan y mueven las pastillas -->
        <div class="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 pb-16 pt-1" id="study-tasks-list">
          ${s.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📚</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${y("study.noTasks")}</p>
              </div>
            `:s.map(B=>H(B)).join("")}
        </div>

      </div>
    `,Y();const N=c.querySelector("#study-tasks-list");N&&j>0&&(N.scrollTop=j)}function H(L){const M=p(L.id),q=Oe.getActivitiesForTopic(L.id),j=q.find(be=>be.id===M.selectedActivityId)||q[0],N=M.status==="completed",B=M.status==="paused",te=M.status==="active",Ee=Dr(L.subject),Ce=$r(L.subject),ce=M.messages.filter(be=>be.role==="student").length;return`
      <div 
        id="task-card-${L.id}" 
        class="glass-panel p-5 sm:p-6 rounded-3xl border ${N?"border-emerald-300/80 bg-emerald-50/20 shadow-md shadow-emerald-500/5":te?"border-brand-400 bg-brand-50/25 shadow-md shadow-brand-500/10":B?"border-amber-300/80 bg-amber-50/20 shadow-md shadow-amber-500/5":"border-slate-200 hover:border-slate-300 bg-white/70"} glow-card space-y-4 transition-all duration-300"
      >
        <!-- Task Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl">${Ee}</span>
              <h3 class="font-display font-bold text-base text-slate-900">${L.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${Ce}">
                ${L.subject}
              </span>
              ${N?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                       <span>🏆</span>
                       <span>${y("study.statusCompleted")}</span>
                     </span>`:te?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                       <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span>${y("study.statusActive")}</span>
                     </span>`:B?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                       <span class="text-xs">⏸️</span>
                       <span>${y("study.statusPaused")}</span>
                     </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                       ${y("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500">${L.pedagogicalNote||""}</p>
          </div>

          <!-- Actions & Status Info -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            ${N?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-emerald-900">${y("study.interactionsCount",{count:ce})}</span>
                <span class="text-[11px] text-emerald-700 font-medium truncate max-w-[150px] block">${(j==null?void 0:j.title)||""}</span>
              </div>
            `:B||te?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-brand-900">${y("study.interactionsCount",{count:ce})}</span>
                <span class="text-[11px] text-brand-700 font-medium truncate max-w-[150px] block">${(j==null?void 0:j.title)||""}</span>
              </div>
            `:`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-slate-700">${y("study.badgeActivities",{count:q.length})}</span>
                <span class="text-[11px] text-slate-400 font-medium">${y("study.badgeConcepts",{count:L.keyConcepts.length})}</span>
              </div>
            `}

            <button 
              data-topic-prompt-id="${L.id}" 
              class="btn-view-topic-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
              title="${y("study.tooltipPromptGraph")}"
            >
              <span>🧩</span>
              <span>${y("study.btnPromptGraph")}</span>
            </button>

            <button 
              data-start-topic-id="${L.id}" 
              class="btn-start-task px-4 py-2 rounded-2xl ${N?"bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20":"bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"} text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${N?"👁️":B||te?"▶️":"🚀"}</span>
              <span>${y(N?"study.btnReviewConversation":B||te?"study.btnResume":"study.btnStart")}</span>
            </button>
          </div>
        </div>

        <!-- Task Preview Footer -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Conceptes:</span>
            ${L.keyConcepts.map(be=>`
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80">
                ${be}
              </span>
            `).join("")}
          </div>

          ${N?`
            <span class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${y("study.indexedDbSavedNotice")}</span>
            </span>
          `:B?`
            <span class="text-[11px] text-amber-700/90 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${y("study.pauseNotice")}</span>
            </span>
          `:`
            <span class="text-[11px] text-slate-400 font-medium">
              ${q.length} ${y("study.badgeActivities",{count:q.length})}
            </span>
          `}
        </div>
      </div>
    `}function z(L){const M=p(L.id),q=Oe.getActivitiesForTopic(L.id),j=q.find(be=>be.id===M.selectedActivityId)||q[0],N=M.status==="completed",B=M.status==="active",te=Dr(L.subject),Ee=$r(L.subject),Ce=q.findIndex(be=>be.id===(j==null?void 0:j.id)),ce=Ce>=0&&Ce<q.length-1?q[Ce+1]:null;c.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera de navegación de la pantalla individual de tarea -->
        <div id="study-detail-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            
            <!-- Botón Volver y Ruta / Título -->
            <div class="flex items-center gap-3 flex-wrap">
              <button 
                id="btn-back-to-task-list" 
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="${y("study.btnBackToList")}"
              >
                <span>←</span>
                <span>${y("study.btnBackToList")}</span>
              </button>

              <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>

              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xl">${te}</span>
                <h2 class="text-base sm:text-lg font-display font-bold text-slate-900">${L.name}</h2>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${Ee}">
                  ${L.subject}
                </span>
                ${N?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                         <span>🏆</span>
                         <span>${y("study.statusCompleted")}</span>
                       </span>`:B?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                         <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         <span>${y("study.statusActive")}</span>
                       </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                         <span>⏸️</span>
                         <span>${y("study.statusPaused")}</span>
                       </span>`}
              </div>
            </div>

            <!-- Acciones de cabecera -->
            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <button 
                data-pause-topic-id="${L.id}" 
                class="btn-pause-task px-3.5 py-1.5 rounded-xl ${N?"bg-slate-100 hover:bg-slate-200 text-slate-700":"bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"} text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="${y(N?"study.btnFold":"study.btnPauseAndExit")}"
              >
                <span>${N?"📁":"⏸️"}</span>
                <span>${y(N?"study.btnFold":"study.btnPauseAndExit")}</span>
              </button>

              <button 
                data-topic-prompt-id="${L.id}" 
                class="btn-view-topic-prompt px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="${y("study.tooltipPromptGraph")}"
              >
                <span>🧩</span>
                <span>${y("study.btnPromptGraph")}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- Área de trabajo individual (El scroll sólo se aplica a esta tarea individual) -->
        <div id="study-task-detail" class="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1 pb-16 pt-1">
          
          <!-- Pedagogical Foundation Callout (Piaget / LOMLOE Anchor) -->
          ${L.pedagogicalNote?`
            <div class="p-3.5 rounded-2xl ${r==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">🧠</span>
              <div>
                <span class="font-bold block">${y("study.pedagogicalAnchor")}</span>
                <span class="leading-relaxed">${L.pedagogicalNote}</span>
              </div>
            </div>
          `:""}

          <!-- Activities / Variations Stepper (Repetición con Variación) -->
          ${q.length>0?`
            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>${y("study.activityVariationLabel")}</span>
                </span>
                <span class="text-[11px] text-slate-400 font-mono">Repetición con Variación • ${q.length} niveles</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${q.map(be=>{const ne=be.id===(j==null?void 0:j.id);return`
                    <button 
                      data-topic-id="${L.id}"
                      data-select-activity-id="${be.id}"
                      class="btn-select-activity text-left p-2.5 rounded-xl border text-xs transition-all ${ne?"bg-brand-50 border-brand-300 text-brand-900 font-bold shadow-sm ring-1 ring-brand-400/40":"bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] uppercase font-mono font-bold ${ne?"text-brand-600":"text-slate-400"}">${y("study.stepPrefix")} ${be.order}</span>
                        ${ne?'<span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>':""}
                      </div>
                      <div class="truncate text-xs ${ne?"font-bold":"font-medium"}">${be.title}</div>
                    </button>
                  `}).join("")}
              </div>

              ${j?el("Cas Actiu:",j.sentenceOrCase,j.variationType):""}
            </div>
          `:""}

          <!-- Socratic Interaction Workspace (2 Columns Grid) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            
            <!-- Socratic Chat Interface (8 cols) -->
            <div class="lg:col-span-8 flex flex-col rounded-2xl border border-slate-200 overflow-hidden h-[620px] bg-slate-50/50">
              
              <!-- Chat Stream -->
              <div id="chat-stream-${L.id}" class="chat-stream flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                ${M.messages.map(be=>O(be)).join("")}
              </div>

              ${N?`
                <!-- Guardrail de Cierre Pedagógico: Banner de Finalización -->
                <div class="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-white border-t border-emerald-200 space-y-3">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20 flex-shrink-0">
                        🎉
                      </div>
                      <div>
                        <h4 class="font-display font-bold text-sm text-emerald-950">${y("study.completionBannerTitle")}</h4>
                        <p class="text-xs text-emerald-800/80 leading-relaxed">${y("study.completionBannerDesc")}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2 flex-wrap self-stretch sm:self-auto justify-end">
                      ${ce?`
                        <button 
                          data-topic-id="${L.id}" 
                          data-next-act-id="${ce.id}" 
                          class="btn-advance-variation px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span>${y("study.btnNextVariation")} (${ce.title})</span>
                          <span>➡️</span>
                        </button>
                      `:""}
                      <button 
                        data-reopen-topic-id="${L.id}" 
                        class="btn-reopen-task px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        title="Volver a abrir el diálogo socrático si te surge una nueva duda"
                      >
                        <span>💬</span>
                        <span>${y("study.btnReopenChat")}</span>
                      </button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between text-[11px] text-emerald-700/80 pt-2 border-t border-emerald-100/80">
                    <span class="flex items-center gap-1.5 font-medium">
                      <span>💾</span>
                      <span>${y("study.indexedDbSavedNotice")}</span>
                    </span>
                    <span class="font-mono text-[10px] text-emerald-600 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      IndexedDB v2 • Local-First
                    </span>
                  </div>
                </div>
              `:`
                <!-- Quick Socratic Prompts (Chips) -->
                <div class="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
                  <button data-topic-id="${L.id}" data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${y("study.chip1")}
                  </button>
                  <button data-topic-id="${L.id}" data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${y("study.chip2")}
                  </button>
                  <button data-topic-id="${L.id}" data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${y("study.chip3")}
                  </button>
                </div>

                <!-- Chat Input Area -->
                <div class="p-4 bg-white border-t border-slate-200">
                  <form data-topic-id="${L.id}" class="chat-form flex items-center gap-2" autocomplete="off">
                    <input 
                      type="text" 
                      id="chat-input-${L.id}" 
                      name="anaxagoras_socratic_${L.id}"
                      placeholder="${y("study.inputPlaceholder")}" 
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="true"
                      data-lpignore="true"
                      data-form-type="other"
                      required
                      class="chat-input flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                    <button 
                      type="submit" 
                      id="btn-send-message-${L.id}"
                      class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>${y("study.send")}</span>
                      <span>➤</span>
                    </button>
                  </form>
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                    <span>${y("study.safeMode")}</span>
                    <span class="flex items-center gap-1 text-emerald-600 font-medium">
                      <span>💾</span>
                      <span>Auto-guardado en IndexedDB</span>
                    </span>
                  </div>
                </div>
              `}

            </div>

            <!-- Active Recall & Concept Cards (4 cols) -->
            <div class="lg:col-span-4 space-y-4">
              
              <!-- Card 1: Active Recall Flashcard -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${y("study.activeRecall")}</span>
                  <button data-view-recall-topic="${L.id}" class="btn-view-recall-prompt text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    <span>📄</span>
                    <span>${y("study.btnRecallPrompt")}</span>
                  </button>
                </div>

                <div>
                  <h4 class="font-bold text-sm text-slate-900">${y("study.flashcardTitle")}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${y("study.flashcardSubtitle")}</p>
                </div>

                <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                  <span id="flashcard-concept-${L.id}" class="text-xs font-bold text-brand-700 block leading-relaxed">
                    ${Ct(M.flashcardConcept||"¿Cómo definirías el concepto principal de esta tarea?")}
                  </span>
                  
                  <div id="flashcard-answer-${L.id}" class="${M.flashcardRevealed?"":"hidden"} text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                    <p id="flashcard-explanation-${L.id}" class="leading-relaxed">
                      ${Ct(M.flashcardExplanation||"")}
                    </p>
                  </div>

                  <button 
                    data-topic-id="${L.id}"
                    class="btn-toggle-answer w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    ${y("study.toggleHint")}
                  </button>
                </div>

                <!-- AI Card Generator -->
                <button 
                  data-topic-id="${L.id}" 
                  class="btn-generate-card-ai w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>⚡ Generar Nuevo Desafío con IA</span>
                </button>

                <div class="flex items-center justify-between gap-2 pt-1">
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    ${y("study.reviewLater")}
                  </button>
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    ${y("study.mastered")}
                  </button>
                </div>
              </div>

              <!-- Card 2: Conceptos Clave (Línea Base) -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${y("study.baselineConcepts")}</span>
                <ul class="space-y-2 text-xs">
                  ${L.keyConcepts.map((be,ne)=>`
                    <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="font-medium text-slate-800">${be}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${ne===0?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                        ${y(ne===0?"study.consolidated":"study.toStrengthen")}
                      </span>
                    </li>
                  `).join("")}
                </ul>
              </div>

              <!-- Single Active Task Helper Callout -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>ℹ️</span>
                <span>${y("study.activeTaskNote")}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    `,J(L)}function Y(){c.querySelectorAll(".btn-start-task").forEach(N=>{N.addEventListener("click",()=>{const B=N.dataset.startTopicId;B&&m(B)})}),c.querySelectorAll(".btn-view-topic-prompt").forEach(N=>{N.addEventListener("click",()=>{const B=N.dataset.topicPromptId,te=s.find(Ee=>Ee.id===B);if(te){const Ee=p(te.id),Ce=document.getElementById("modal-root")||document.body,ce=Oe.assemblePrompt({role:"socratic",gradeKey:r,subject:te.subject,topicId:te.id,activityId:Ee.selectedActivityId});jt(Ce,y("study.modalSocraticTitle"),ce.systemInstruction,{assembledPrompt:ce,subtitle:y("study.modalSocraticSubtitle",{subject:te.subject,topic:te.name}),onClose:()=>{Ce.innerHTML=""}})}})});const q=c.querySelector("#study-view-header"),j=c.querySelector("#study-tasks-list");q&&j&&q.addEventListener("wheel",N=>{const B=N;j.scrollTop+=B.deltaY},{passive:!0})}function J(L){const M=c.querySelector("#btn-back-to-task-list");M==null||M.addEventListener("click",()=>{h()}),c.querySelectorAll(".btn-pause-task").forEach(ae=>{ae.addEventListener("click",()=>{const re=ae.dataset.pauseTopicId;re&&b(re)})}),c.querySelectorAll(".btn-select-activity").forEach(ae=>{ae.addEventListener("click",()=>{const re=ae.dataset.topicId,ie=ae.dataset.selectActivityId;re&&ie&&w(re,ie)})}),c.querySelectorAll(".btn-advance-variation").forEach(ae=>{ae.addEventListener("click",()=>{const re=ae.dataset.topicId,ie=ae.dataset.nextActId;re&&ie&&w(re,ie)})}),c.querySelectorAll(".btn-reopen-task").forEach(ae=>{ae.addEventListener("click",async()=>{const re=ae.dataset.reopenTopicId;if(re){const ie=p(re);ie.status="active",await Je(ie),F()}})}),c.querySelectorAll(".btn-view-topic-prompt").forEach(ae=>{ae.addEventListener("click",()=>{const re=p(L.id),ie=document.getElementById("modal-root")||document.body,he=Oe.assemblePrompt({role:"socratic",gradeKey:r,subject:L.subject,topicId:L.id,activityId:re.selectedActivityId});jt(ie,y("study.modalSocraticTitle"),he.systemInstruction,{assembledPrompt:he,subtitle:y("study.modalSocraticSubtitle",{subject:L.subject,topic:L.name}),onClose:()=>{ie.innerHTML=""}})})}),c.querySelectorAll(".btn-view-recall-prompt").forEach(ae=>{ae.addEventListener("click",()=>{const re=document.getElementById("modal-root")||document.body,ie=Oe.assemblePrompt({role:"recall",gradeKey:r,subject:L.subject,topicId:L.id});jt(re,"Prompt Estático: Generador de Active Recall (active_recall_generator.md)",ki.recall,{assembledPrompt:ie,subtitle:"Prompt Transversal de Sección (Generación de Flashcards Conceptuales)",onClose:()=>{re.innerHTML=""}})})}),c.querySelectorAll(".btn-toggle-answer").forEach(ae=>{ae.addEventListener("click",async()=>{const re=ae.dataset.topicId;if(re){const ie=p(re);ie.flashcardRevealed=!ie.flashcardRevealed;const he=c.querySelector(`#flashcard-answer-${re}`);he==null||he.classList.toggle("hidden",!ie.flashcardRevealed),await Je(ie)}})}),c.querySelectorAll(".btn-generate-card-ai").forEach(ae=>{ae.addEventListener("click",async()=>{if(ae.dataset.topicId){ae.innerHTML="<span>⏳ Generando desafío...</span>";try{const ie=await Ot.generateActiveRecallCard(L.subject,L.name),he=p(L.id);he.flashcardConcept=ie.concept,he.flashcardExplanation=ie.explanation,he.flashcardRevealed=!1,await Je(he);const Re=c.querySelector(`#flashcard-concept-${L.id}`),Be=c.querySelector(`#flashcard-explanation-${L.id}`),Ue=c.querySelector(`#flashcard-answer-${L.id}`);Re&&(Re.innerHTML=Ct(ie.concept)),Be&&(Be.innerHTML=Ct(ie.explanation)),Ue==null||Ue.classList.add("hidden")}catch(ie){alert(ie.message||"Error al generar tarjeta con IA")}finally{ae.innerHTML="<span>⚡ Generar Nuevo Desafío con IA</span>"}}})}),c.querySelectorAll(".chip-btn").forEach(ae=>{ae.addEventListener("click",()=>{const re=ae.dataset.topicId,ie=ae.dataset.prompt;re&&ie&&T(re,ie)})}),c.querySelectorAll(".chat-form").forEach(ae=>{ae.addEventListener("submit",re=>{re.preventDefault();const ie=ae.dataset.topicId;if(ie){const he=c.querySelector(`#chat-input-${ie}`);if(he&&he.value.trim()){const Re=he.value.trim();he.value="",T(ie,Re)}}})}),c.querySelectorAll(".chat-stream").forEach(ae=>{ae.scrollTo({top:ae.scrollHeight,behavior:"smooth"})});const pe=c.querySelector("#study-detail-header"),Pe=c.querySelector("#study-task-detail");pe&&Pe&&pe.addEventListener("wheel",ae=>{const re=ae;Pe.scrollTop+=re.deltaY},{passive:!0})}u()}class il{async getAvailableFiles(){var h;const a=je.getState();if(!a.isAuthenticated||!a.scopes.drive)throw new Error("Debes conectar tu cuenta de Google con acceso a Google Drive");if(a.mode==="demo")return[{fileId:"drv_demo_01",name:"Ensayo_Energia_Sostenible_Borrador.gdoc",mimeType:"application/vnd.google-apps.document",webViewLink:"https://docs.google.com/document",lastModified:"Hoy, 10:30"},{fileId:"drv_demo_02",name:"Presentacion_Historia_Siglo_XX.gslides",mimeType:"application/vnd.google-apps.presentation",webViewLink:"https://docs.google.com/presentation",lastModified:"Ayer"},{fileId:"drv_demo_03",name:"Apuntes_Biologia_Genetica.pdf",mimeType:"application/pdf",webViewLink:"https://drive.google.com",lastModified:"Hace 3 días"},{fileId:"drv_demo_04",name:"Datos_Graficos_Matematicas.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",webViewLink:"https://docs.google.com/spreadsheets",lastModified:"Hace 1 semana"}];const r=je.getAccessToken();if(!r)throw new Error("El token de sesión de Google ha caducado. Vuelve a iniciar sesión.");const o=encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')"),s=encodeURIComponent("files(id,name,mimeType,webViewLink,iconLink,modifiedTime)"),u=`https://www.googleapis.com/drive/v3/files?pageSize=25&q=${o}&fields=${s}&orderBy=modifiedTime desc`,p=await fetch(u,{headers:{Authorization:`Bearer ${r}`}});if(!p.ok){const w=await p.json().catch(()=>({}));throw new Error(`Error de Google Drive API (${p.status}): ${((h=w.error)==null?void 0:h.message)||p.statusText}`)}return((await p.json()).files||[]).map(w=>({fileId:w.id,name:w.name,mimeType:w.mimeType,iconUrl:w.iconLink,webViewLink:w.webViewLink||`https://drive.google.com/open?id=${w.id}`,lastModified:w.modifiedTime?new Date(w.modifiedTime).toLocaleDateString():"Drive Sync"}))}}const ol=new il;let _t=null;function sl(c){async function a(){await Fs();const v=await _e.projectTasks.toArray();m(v)}function r(v){if(!v.criteria||v.criteria.length===0)return 100;const H=v.criteria.filter(z=>z.checked).length;return Math.round(H/v.criteria.length*100)}function o(v){return v.includes("document")?"📄":v.includes("presentation")||v.includes("slides")?"📊":v.includes("spreadsheet")||v.includes("sheet")?"📈":"📑"}function s(v){switch(v){case"planning":return y("tasks.phases.planning");case"research":return y("tasks.phases.research");case"writing":return y("tasks.phases.writing");case"review":return y("tasks.phases.review");default:return v}}function u(v){switch(v){case"planning":return"bg-indigo-50 text-indigo-700 border-indigo-200";case"research":return"bg-cyan-50 text-cyan-700 border-cyan-200";case"writing":return"bg-amber-50 text-amber-800 border-amber-200";case"review":return"bg-emerald-50 text-emerald-800 border-emerald-200";default:return"bg-slate-50 text-slate-700 border-slate-200"}}function p(v,H,z,Y){return`
      <button 
        data-task-id="${v}" 
        data-phase="${H}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${Y===H?"bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20":"bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}"
      >
        ${z}
      </button>
    `}function m(v){const z=je.getState().user,Y=(z==null?void 0:z.gradeKey)==="2batx"?"2batx":"1eso",J=v.filter(fe=>!fe.gradeKey||fe.gradeKey===Y||fe.gradeKey==="both");if(_t!==null){const fe=J.find(L=>L.id===_t)||v.find(L=>L.id===_t);if(fe){w(fe,v,Y);return}else _t=null}b(J,v,Y,z)}function b(v,H,z,Y){const J=c.querySelector("#tasks-list"),fe=J?J.scrollTop:0;c.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera fija de la vista de Trabajos -->
        <div id="tasks-view-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-display font-bold text-slate-900">
                  ${y("tasks.title")}
                </h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full ${z==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                  ${(Y==null?void 0:Y.name)||"Estudiante"} • ${(Y==null?void 0:Y.gradeLevel)||"1º de ESO"}
                </span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${y("tasks.driveIntegration")}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">${y("tasks.subtitle")}</p>
            </div>

            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <button id="btn-view-project-prompt" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${y("tasks.tooltipPromptProject")}">
                <span>📄</span>
                <span>${y("tasks.btnPromptProject")}</span>
              </button>
              <button id="btn-view-project-curricular" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${y("tasks.tooltipCurricularDirective")}">
                <span>🏛️</span>
                <span>${y("tasks.btnCurricularDirective")}</span>
              </button>
              <button id="btn-new-task" class="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 active:scale-95">
                <span>＋</span>
                <span>${y("tasks.newTask")}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Task Deliverables List: Pastillas compactas en modo lista -->
        <div class="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 pb-16 pt-1" id="tasks-list">
          ${v.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${y("tasks.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${y("tasks.emptyDesc")}</p>
              </div>
            `:v.map(M=>h(M)).join("")}
        </div>

        <!-- Modal Nuevo Trabajo -->
        <div id="new-task-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${y("tasks.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${y("tasks.modalSubtitle")}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${y("tasks.fieldTitle")}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${y("tasks.fieldSubject")}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${y("tasks.fieldDue")}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now()+864e5*10).toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${y("tasks.fieldNotes")}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${y("tasks.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${y("tasks.create")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,T(H,z);const L=c.querySelector("#tasks-list");L&&fe>0&&(L.scrollTop=fe)}function h(v){const H=r(v),z=v.criteria?v.criteria.filter(L=>L.checked).length:0,Y=v.criteria?v.criteria.length:0,J=H===100&&v.currentPhase==="review",fe=H>0||v.currentPhase!=="planning";return`
      <div class="glass-panel p-5 sm:p-6 rounded-3xl border ${v.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":v.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-4 transition-all duration-300">
        
        <!-- Header row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-display font-bold text-base text-slate-900">${v.title}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                ${v.subject}
              </span>
              ${v.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ${y("tasks.grade1esoBadge")}
                    </span>`:v.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                      ${y("tasks.grade2batxBadge")}
                    </span>`:""}
            </div>
            ${v.notes?`<p class="text-xs text-slate-600 line-clamp-2 mt-1">${v.notes}</p>`:""}
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <div class="text-left sm:text-right">
              <span class="block text-xs font-bold text-slate-700">${y("tasks.dueDate")}: ${v.dueDate}</span>
              <span class="text-[11px] text-brand-600 font-semibold">${y("tasks.autonomy")}: ${H}%</span>
            </div>

            <button 
              data-task-prompt-id="${v.id}" 
              class="btn-view-task-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
              title="${y("tasks.tooltipViewTaskPrompt",{title:v.title})}"
            >
              <span>🧩</span>
              <span>${y("tasks.btnViewTaskPrompt")}</span>
            </button>

            <button 
              data-open-task-id="${v.id}" 
              class="btn-open-task-detail px-4 py-2 rounded-2xl ${J?"bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20":"bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"} text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${J?"👁️":fe?"▶️":"🚀"}</span>
              <span>${y(J?"tasks.btnReview":fe?"tasks.btnResume":"tasks.btnStart")}</span>
            </button>
          </div>
        </div>

        <!-- Meta status row -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap text-xs">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${u(v.currentPhase)}">
              ${s(v.currentPhase)}
            </span>
            <span class="text-[11px] font-semibold text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/80">
              <span>📁</span>
              <span>${v.driveFiles.length>0?y("tasks.driveFilesCount",{count:v.driveFiles.length}):y("tasks.noDriveFilesShort")}</span>
            </span>
            <span class="text-[11px] font-semibold text-brand-700 flex items-center gap-1 bg-brand-50/50 px-2 py-0.5 rounded-lg border border-brand-100">
              <span>🛡️</span>
              <span>${y("tasks.criteriaCompleted",{completed:z,total:Y})}</span>
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] text-slate-400 font-mono">Autonomía</span>
            <div class="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${H}%"></div>
            </div>
            <span class="text-[11px] font-bold text-slate-700">${H}%</span>
          </div>
        </div>

      </div>
    `}function w(v,H,z){const Y=r(v);c.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera de navegación de la pantalla individual de trabajo -->
        <div id="task-detail-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            
            <!-- Botón Volver y Ruta / Título -->
            <div class="flex items-center gap-3 flex-wrap">
              <button 
                id="btn-back-to-tasks" 
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="${y("tasks.btnBackToList")}"
              >
                <span>←</span>
                <span>${y("tasks.btnBackToList")}</span>
              </button>

              <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>

              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base sm:text-lg font-display font-bold text-slate-900">${v.title}</h2>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                  ${v.subject}
                </span>
                ${v.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ${y("tasks.grade1esoBadge")}
                      </span>`:v.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                        ${y("tasks.grade2batxBadge")}
                      </span>`:""}
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-bold">
                  🛡️ ${Y}% ${y("tasks.ownEffort")}
                </span>
              </div>
            </div>

            <!-- Acciones de cabecera -->
            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <span class="text-xs font-bold text-slate-600 mr-1">${y("tasks.dueDate")}: ${v.dueDate}</span>
              <button 
                data-task-prompt-id="${v.id}" 
                class="btn-view-task-prompt px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${y("tasks.tooltipViewTaskPrompt",{title:v.title})}"
              >
                <span>🧩</span>
                <span>${y("tasks.btnViewTaskPrompt")}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- Área de trabajo individual (El scroll sólo se aplica a este trabajo específico) -->
        <div id="task-detail-scroll" class="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1 pb-16 pt-1">
          
          <!-- Task Detail Overview Card -->
          <div class="glass-panel p-6 rounded-3xl border ${v.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":v.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-5">
            
            <div class="border-b border-slate-100 pb-3">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${v.title}</h3>
                  <p class="text-xs text-slate-600 mt-1">${v.notes||""}</p>
                </div>
                <div class="text-right">
                  <span class="block text-xs font-bold text-slate-700">${y("tasks.dueDate")}: ${v.dueDate}</span>
                  <span class="text-xs text-brand-600 font-semibold">${y("tasks.autonomy")}: ${Y}%</span>
                </div>
              </div>
            </div>

            ${v.pedagogicalNote?`
              <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
              <div class="p-3.5 rounded-2xl ${v.gradeKey==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
                <span class="text-base flex-shrink-0">🧠</span>
                <div>
                  <span class="font-bold block">${y("tasks.pedagogicalFoundation")}</span>
                  <span class="leading-relaxed">${v.pedagogicalNote}</span>
                </div>
              </div>
            `:""}

            <!-- 4-Phases Progression Stepper -->
            <div>
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${y("tasks.phasesTitle")}</span>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                ${p(v.id,"planning",y("tasks.phases.planning"),v.currentPhase)}
                ${p(v.id,"research",y("tasks.phases.research"),v.currentPhase)}
                ${p(v.id,"writing",y("tasks.phases.writing"),v.currentPhase)}
                ${p(v.id,"review",y("tasks.phases.review"),v.currentPhase)}
              </div>
            </div>

            <!-- Google Drive Resources & Autonomy Checklist Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              
              <!-- Left: Google Drive Attached Files -->
              <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">📁</span>
                    <h4 class="font-bold text-xs text-slate-800">${y("tasks.driveDocs")}</h4>
                  </div>
                  <button data-task-drive="${v.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 active:scale-95">
                    <span>${y("tasks.attachDrive")}</span>
                  </button>
                </div>

                <div class="space-y-2">
                  ${v.driveFiles.length===0?`<p class="text-xs text-slate-400 py-2">${y("tasks.noDriveFiles")}</p>`:v.driveFiles.map(J=>`
                      <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                        <div class="flex items-center gap-2 overflow-hidden">
                          <span class="text-base flex-shrink-0">${o(J.mimeType)}</span>
                          <div class="truncate">
                            <a href="${J.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${J.name}</a>
                            <span class="text-[10px] text-slate-400 font-mono">${J.lastModified||"Sincronizado"}</span>
                          </div>
                        </div>
                        <a href="${J.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                          ${y("tasks.driveSync")} ↗
                        </a>
                      </div>
                    `).join("")}
                </div>
              </div>

              <!-- Right: Autonomy Guarantee Checklist -->
              <div class="p-4 rounded-2xl bg-brand-50/30 border border-brand-100 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🛡️</span>
                    <h4 class="font-bold text-xs text-brand-900">${y("tasks.autonomyMeter")}</h4>
                  </div>
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                    ${Y}% ${y("tasks.ownEffort")}
                  </span>
                </div>

                <div class="space-y-2">
                  ${v.criteria.map(J=>`
                    <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                      <input 
                        type="checkbox" 
                        data-task-id="${v.id}" 
                        data-crit-id="${J.id}" 
                        class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                        ${J.checked?"checked":""} 
                      />
                      <div>
                        <span class="font-semibold text-slate-800 block ${J.checked?"line-through text-slate-400":""}">${J.label}</span>
                        <span class="text-[11px] text-slate-500">${J.explanation}</span>
                      </div>
                    </label>
                  `).join("")}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `,O(v,H,z)}function T(v,H){var L,M,q,j;c.querySelectorAll(".btn-open-task-detail").forEach(N=>{N.addEventListener("click",()=>{const B=Number(N.dataset.openTaskId);B&&(_t=B,m(v))})}),c.querySelectorAll(".btn-view-task-prompt").forEach(N=>{N.addEventListener("click",()=>{const B=Number(N.dataset.taskPromptId);F(B,v,H)})}),(L=c.querySelector("#btn-view-project-prompt"))==null||L.addEventListener("click",()=>{const N=document.getElementById("modal-root")||document.body,B=Oe.assemblePrompt({role:"project",gradeKey:H,subject:"Lengua Castellana y Literatura"});jt(N,y("tasks.modalProjectTitle"),B.systemInstruction,{assembledPrompt:B,subtitle:y("tasks.modalProjectSubtitle"),onClose:()=>{N.innerHTML=""}})}),(M=c.querySelector("#btn-view-project-curricular"))==null||M.addEventListener("click",async()=>{const N=document.getElementById("modal-root")||document.body,B=Oe.assemblePrompt({role:"project",gradeKey:H,subject:"Lengua Castellana y Literatura"});jt(N,B.layers.level2BaseTopic.title,B.layers.level2BaseTopic.content,{assembledPrompt:B,subtitle:y("agenda.modalCurricularSubtitle",{grade:H==="2batx"?"2º Bachillerato":"1º de ESO"}),institution:"Departament d'Educació de la Generalitat de Catalunya (Esfer@)",sourceApi:`https://api.educacio.gencat.cat/v1/curriculum/guardrails?grade=${H}`,gradeLevel:H==="2batx"?"2º de Bachillerato":"1º de ESO",onClose:()=>{N.innerHTML=""}})});const z=c.querySelector("#new-task-modal");(q=c.querySelector("#btn-new-task"))==null||q.addEventListener("click",()=>{z==null||z.classList.remove("hidden")}),(j=c.querySelector("#btn-cancel-nt"))==null||j.addEventListener("click",()=>{z==null||z.classList.add("hidden")});const Y=c.querySelector("#new-task-form");Y==null||Y.addEventListener("submit",async N=>{N.preventDefault();const B=c.querySelector("#nt-title").value,te=c.querySelector("#nt-subject").value,Ee=c.querySelector("#nt-due").value,Ce=c.querySelector("#nt-notes").value,ce=await _e.projectTasks.add({title:B,subject:te,gradeKey:H,dueDate:Ee,currentPhase:"planning",autonomyScore:25,notes:Ce,driveFiles:[{fileId:`drive_${Date.now()}`,name:`${B.replace(/\s+/g,"_")}_Borrador.gdoc`,mimeType:"application/vnd.google-apps.document",lastModified:"Recién creado"}],criteria:[{id:"c1",label:"Formulación y alcance del proyecto con mis palabras",checked:!0,explanation:"Definido el objetivo inicial de manera autónoma."},{id:"c2",label:"Búsqueda activa y contraste de fuentes fiables",checked:!1,explanation:"Seleccionar fuentes antes de escribir."},{id:"c3",label:"Redacción propia evitando generación automática por IA",checked:!1,explanation:"El texto debe ser fruto de la reflexión del estudiante."},{id:"c4",label:"Revisión crítica de estructura y conclusiones",checked:!1,explanation:"Validar que las conclusiones responden a la hipótesis."}]});z==null||z.classList.add("hidden"),_t=typeof ce=="number"?ce:null,a()});const J=c.querySelector("#tasks-view-header"),fe=c.querySelector("#tasks-list");J&&fe&&J.addEventListener("wheel",N=>{const B=N;fe.scrollTop+=B.deltaY},{passive:!0})}function O(v,H,z){var q;(q=c.querySelector("#btn-back-to-tasks"))==null||q.addEventListener("click",()=>{_t=null,m(H)}),c.querySelectorAll(".crit-checkbox").forEach(j=>{j.addEventListener("change",async()=>{const N=j.dataset.critId,B=v.criteria.find(te=>te.id===N);B&&(B.checked=j.checked,v.autonomyScore=r(v),await _e.projectTasks.update(v.id,{criteria:v.criteria,autonomyScore:v.autonomyScore}),a())})}),c.querySelectorAll(".phase-badge-btn").forEach(j=>{j.addEventListener("click",async()=>{const N=j.dataset.phase;await _e.projectTasks.update(v.id,{currentPhase:N}),a()})}),c.querySelectorAll(".btn-attach-drive").forEach(j=>{j.addEventListener("click",async()=>{try{const N=await ol.getAvailableFiles();if(N.length>0){const B=N.find(Ee=>!v.driveFiles.some(Ce=>Ce.fileId===Ee.fileId))||N[0],te=[...v.driveFiles,B];await _e.projectTasks.update(v.id,{driveFiles:te}),a()}}catch(N){alert(N.message||"Error al conectar con Google Drive")}})}),c.querySelectorAll(".btn-view-task-prompt").forEach(j=>{j.addEventListener("click",()=>{F(v.id,H,z)})});const L=c.querySelector("#task-detail-header"),M=c.querySelector("#task-detail-scroll");L&&M&&L.addEventListener("wheel",j=>{const N=j;M.scrollTop+=N.deltaY},{passive:!0})}function F(v,H,z){const Y=H.find(j=>j.id===v);if(!Y)return;const J=Y.gradeKey==="2batx"||Y.gradeKey==="1eso"?Y.gradeKey:z,fe=Y.topicId?Oe.findTopicById(Y.topicId):Oe.findTopicBySubjectOrKeyword(Y.subject,J,Y.title),L=Y.activityId?Oe.findActivityById(Y.activityId):fe?Oe.getActivitiesForTopic(fe.id)[0]:void 0,M=Oe.assemblePrompt({role:"project",gradeKey:J,subject:Y.subject,topicId:fe==null?void 0:fe.id,activityId:L==null?void 0:L.id}),q=document.getElementById("modal-root")||document.body;jt(q,y("tasks.modalTaskPromptTitle",{title:Y.title}),M.systemInstruction,{assembledPrompt:M,subtitle:y("tasks.modalTaskPromptSubtitle",{subject:Y.subject}),onClose:()=>{q.innerHTML=""}})}a()}class ll{constructor(){$e(this,"activeTab","study");$e(this,"navbarRoot");$e(this,"tabsRoot");$e(this,"viewContainer");$e(this,"modalRoot");$e(this,"isReady",!1);this.navbarRoot=document.getElementById("navbar-root"),this.tabsRoot=document.getElementById("tabs-root"),this.viewContainer=document.getElementById("app-view-container"),this.modalRoot=document.getElementById("modal-root")}async start(){await aa.init(),await zs(),await An.register(),aa.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),je.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),this.renderHeaderAndTabs(),this.switchView(this.activeTab),this.isReady=!0;const a=document.getElementById("app-top-header");a&&a.addEventListener("wheel",r=>{const o=document.querySelector("#study-tasks-list, #tasks-list, #study-task-detail, #task-detail-scroll");o&&(o.scrollTop+=r.deltaY)},{passive:!0})}renderHeaderAndTabs(){Ys(this.navbarRoot,{onOpenAISettings:()=>this.openAISettingsModal(),onOpenAuth:()=>this.openAuthModal(),onLanguageChange:()=>{}}),Js(this.tabsRoot,this.activeTab,{onTabChange:a=>{this.activeTab=a,this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}switchView(a){switch(this.viewContainer.innerHTML="",a){case"study":rl(this.viewContainer);break;case"tasks":sl(this.viewContainer);break}}openAISettingsModal(){Zs(this.modalRoot,{onSaved:()=>{this.modalRoot.innerHTML="",this.renderHeaderAndTabs()},onClose:()=>{this.modalRoot.innerHTML=""}})}openAuthModal(){Sn(this.modalRoot,{onClose:()=>{this.modalRoot.innerHTML=""},onStateChanged:()=>{this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}}document.addEventListener("DOMContentLoaded",()=>{new ll().start().catch(a=>{console.error("[Anaxagoras AI] Error al inicializar la aplicación:",a)})});
//# sourceMappingURL=index-BKBUXdqB.js.map
