var ei=Object.defineProperty;var ti=(p,a,r)=>a in p?ei(p,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):p[a]=r;var $e=(p,a,r)=>ti(p,typeof a!="symbol"?a+"":a,r);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(s){if(s.ep)return;s.ep=!0;const c=r(s);fetch(s.href,c)}})();const le=p=>typeof p=="string",Ht=()=>{let p,a;const r=new Promise((i,s)=>{p=i,a=s});return r.resolve=p,r.reject=a,r},vn=p=>p==null?"":String(p),ai=(p,a,r)=>{p.forEach(i=>{a[i]&&(r[i]=a[i])})},ni=/###/g,lr=p=>p&&p.includes("###")?p.replace(ni,"."):p,cr=p=>!p||le(p),Qt=(p,a,r)=>{const i=le(a)?a.split("."):a;let s=0;for(;s<i.length-1;){if(cr(p))return{};const c=lr(i[s]);!p[c]&&r&&(p[c]=new r),Object.prototype.hasOwnProperty.call(p,c)?p=p[c]:p={},++s}return cr(p)?{}:{obj:p,k:lr(i[s])}},dr=(p,a,r)=>{const{obj:i,k:s}=Qt(p,a,Object);if(i!==void 0||a.length===1){i[s]=r;return}let c=a[a.length-1],u=a.slice(0,a.length-1),f=Qt(p,u,Object);for(;f.obj===void 0&&u.length;)c=`${u[u.length-1]}.${c}`,u=u.slice(0,u.length-1),f=Qt(p,u,Object),f!=null&&f.obj&&typeof f.obj[`${f.k}.${c}`]<"u"&&(f.obj=void 0);f.obj[`${f.k}.${c}`]=r},ri=(p,a,r,i)=>{const{obj:s,k:c}=Qt(p,a,Object);s[c]=s[c]||[],s[c].push(r)},Da=(p,a)=>{const{obj:r,k:i}=Qt(p,a);if(r&&Object.prototype.hasOwnProperty.call(r,i))return r[i]},oi=(p,a,r)=>{const i=Da(p,r);return i!==void 0?i:Da(a,r)},Er=(p,a,r)=>{for(const i in a)i!=="__proto__"&&i!=="constructor"&&(Object.prototype.hasOwnProperty.call(p,i)?le(p[i])||p[i]instanceof String||le(a[i])||a[i]instanceof String?r&&(p[i]=a[i]):Er(p[i],a[i],r):p[i]=a[i]);return p},et=p=>p.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),ii={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},si=p=>le(p)?p.replace(/[&<>"'\/]/g,a=>ii[a]):p;class li{constructor(a){this.capacity=a,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(a){const r=this.regExpMap.get(a);if(r!==void 0)return r;const i=new RegExp(a);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(a,i),this.regExpQueue.push(a),i}}const ci=[" ",",","?","!",";"],di=new li(20),ui=(p,a,r)=>{a=a||"",r=r||"";const i=ci.filter(u=>!a.includes(u)&&!r.includes(u));if(i.length===0)return!0;const s=di.getRegExp(`(${i.map(u=>u==="?"?"\\?":u).join("|")})`);let c=!s.test(p);if(!c){const u=p.indexOf(r);u>0&&!s.test(p.substring(0,u))&&(c=!0)}return c},_n=(p,a,r=".")=>{if(!p)return;if(p[a])return Object.prototype.hasOwnProperty.call(p,a)?p[a]:void 0;const i=a.split(r);let s=p;for(let c=0;c<i.length;){if(!s||typeof s!="object")return;let u,f="";for(let b=c;b<i.length;++b)if(b!==c&&(f+=r),f+=i[b],u=s[f],u!==void 0){if(["string","number","boolean"].includes(typeof u)&&b<i.length-1)continue;c+=b-c+1;break}s=u}return s},Xt=p=>p==null?void 0:p.replace(/_/g,"-"),pi={type:"logger",log(p){this.output("log",p)},warn(p){this.output("warn",p)},error(p){this.output("error",p)},output(p,a){var r,i;(i=(r=console==null?void 0:console[p])==null?void 0:r.apply)==null||i.call(r,console,a)}};class $a{constructor(a,r={}){this.init(a,r)}init(a,r={}){this.prefix=r.prefix||"i18next:",this.logger=a||pi,this.options=r,this.debug=r.debug}log(...a){return this.forward(a,"log","",!0)}warn(...a){return this.forward(a,"warn","",!0)}error(...a){return this.forward(a,"error","")}deprecate(...a){return this.forward(a,"warn","WARNING DEPRECATED: ",!0)}forward(a,r,i,s){return s&&!this.debug?null:(a=a.map(c=>le(c)?c.replace(/[\r\n\x00-\x1F\x7F]/g," "):c),le(a[0])&&(a[0]=`${i}${this.prefix} ${a[0]}`),this.logger[r](a))}create(a){return new $a(this.logger,{prefix:`${this.prefix}:${a}:`,...this.options})}clone(a){return a=a||this.options,a.prefix=a.prefix||this.prefix,new $a(this.logger,a)}}var Ye=new $a;class La{constructor(){this.observers={}}on(a,r){return a.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);const s=this.observers[i].get(r)||0;this.observers[i].set(r,s+1)}),this}off(a,r){if(this.observers[a]){if(!r){delete this.observers[a];return}this.observers[a].delete(r)}}once(a,r){const i=(...s)=>{r(...s),this.off(a,i)};return this.on(a,i),this}emit(a,...r){this.observers[a]&&Array.from(this.observers[a].entries()).forEach(([s,c])=>{for(let u=0;u<c;u++)s(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,c])=>{for(let u=0;u<c;u++)s(a,...r)})}}const ur=new WeakSet;class pr extends La{constructor(a,r={ns:["translation"],defaultNS:"translation"}){super(),this.data=a||{},this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(a){this.options.ns.includes(a)||this.options.ns.push(a)}removeNamespaces(a){const r=this.options.ns.indexOf(a);r>-1&&this.options.ns.splice(r,1)}getResource(a,r,i,s={}){var h,C;const c=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,u=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let f;a.includes(".")?f=a.split("."):(f=[a,r],i&&(Array.isArray(i)?f.push(...i):le(i)&&c?f.push(...i.split(c)):f.push(i)));const b=Da(this.data,f);return!b&&!r&&!i&&a.includes(".")&&(a=f[0],r=f[1],i=f.slice(2).join(".")),b||!u||!le(i)?b:_n((C=(h=this.data)==null?void 0:h[a])==null?void 0:C[r],i,c)}addResource(a,r,i,s,c={silent:!1}){const u=c.keySeparator!==void 0?c.keySeparator:this.options.keySeparator;let f=[a,r];i&&(f=f.concat(u?i.split(u):i)),a.includes(".")&&(f=a.split("."),s=r,r=f[1]),this.addNamespaces(r),dr(this.data,f,s),c.silent||this.emit("added",a,r,i,s)}addResources(a,r,i,s={silent:!1}){for(const c in i)(le(i[c])||Array.isArray(i[c]))&&this.addResource(a,r,c,i[c],{silent:!0});s.silent||this.emit("added",a,r,i)}addResourceBundle(a,r,i,s,c,u={silent:!1,skipCopy:!1}){let f=[a,r];a.includes(".")&&(f=a.split("."),s=i,i=r,r=f[1]),this.addNamespaces(r);let b=Da(this.data,f)||{};u.skipCopy||(i=JSON.parse(JSON.stringify(i))),s?Er(b,i,c):b={...b,...i},dr(this.data,f,b),u.silent||this.emit("added",a,r,i)}removeResourceBundle(a,r){this.hasResourceBundle(a,r)&&delete this.data[a][r],this.removeNamespaces(r),this.emit("removed",a,r)}hasResourceBundle(a,r){return this.getResource(a,r)!==void 0}getResourceBundle(a,r){return r||(r=this.options.defaultNS),this.getResource(a,r)}getDataByLanguage(a){return this.data[a]}hasLanguageSomeTranslations(a){const r=this.getDataByLanguage(a);return!!(r&&Object.keys(r)||[]).find(s=>{const c=r[s];return ur.has(c)?!0:!c||Object.keys(c).length===0?!1:(typeof c=="object"&&ur.add(c),!0)})}toJSON(){return this.data}}var kr={processors:{},addPostProcessor(p){this.processors[p.name]=p},handle(p,a,r,i,s){return p.forEach(c=>{var u;a=((u=this.processors[c])==null?void 0:u.process(a,r,i,s))??a}),a}};const Tr=Symbol("i18next/PATH_KEY");function mi(){const p=[],a=Object.create(null);let r;return a.get=(i,s)=>{var c;return(c=r==null?void 0:r.revoke)==null||c.call(r),s===Tr?p:(p.push(s),r=Proxy.revocable(i,a),r.proxy)},Proxy.revocable(Object.create(null),a).proxy}function Dt(p,a){const{[Tr]:r}=p(mi()),i=(a==null?void 0:a.keySeparator)??".",s=(a==null?void 0:a.nsSeparator)??":",c=(a==null?void 0:a.enableSelector)==="strict";if(r.length>1&&s){const u=a==null?void 0:a.ns,f=c?Array.isArray(u)?u:u?[u]:null:Array.isArray(u)?u:null;if(f&&(c?f:f.length>1?f.slice(1):[]).includes(r[0]))return`${r[0]}${s}${r.slice(1).join(i)}`}return r.join(i)}const yn=p=>!le(p)&&typeof p!="boolean"&&typeof p!="number";class Oa extends La{constructor(a,r={}){super(),ai(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],a,this),this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Ye.create("translator"),this.checkedLoadedFor={}}changeLanguage(a){a&&(this.language=a)}exists(a,r={interpolation:{}}){const i={...r};if(a==null)return!1;const s=this.resolve(a,i);if((s==null?void 0:s.res)===void 0)return!1;const c=yn(s.res);return!(i.returnObjects===!1&&c)}extractFromKey(a,r){let i=r.nsSeparator!==void 0?r.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");const s=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator;let c=r.ns||this.options.defaultNS||[];const u=i&&a.includes(i),f=!this.options.userDefinedKeySeparator&&!r.keySeparator&&!this.options.userDefinedNsSeparator&&!r.nsSeparator&&!ui(a,i,s);if(u&&!f){const b=a.match(this.interpolator.nestingRegexp);if(b&&b.length>0)return{key:a,namespaces:le(c)?[c]:c};const h=a.split(i);(i!==s||i===s&&this.options.ns.includes(h[0]))&&(c=h.shift()),a=h.join(s)}return{key:a,namespaces:le(c)?[c]:c}}translate(a,r,i){let s=typeof r=="object"?{...r}:r;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),a==null)return"";typeof a=="function"&&(a=Dt(a,{...this.options,...s})),Array.isArray(a)||(a=[String(a)]),a=a.map(re=>typeof re=="function"?Dt(re,{...this.options,...s}):String(re));const c=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,u=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:f,namespaces:b}=this.extractFromKey(a[a.length-1],s),h=b[b.length-1];let C=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;C===void 0&&(C=":");const T=s.lng||this.language,I=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((T==null?void 0:T.toLowerCase())==="cimode")return I?c?{res:`${h}${C}${f}`,usedKey:f,exactUsedKey:f,usedLng:T,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:`${h}${C}${f}`:c?{res:f,usedKey:f,exactUsedKey:f,usedLng:T,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:f;const K=this.resolve(a,s);let L=K==null?void 0:K.res;const X=(K==null?void 0:K.usedKey)||f,$=(K==null?void 0:K.exactUsedKey)||f,V=["[object Number]","[object Function]","[object RegExp]"],U=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,ie=!this.i18nFormat||this.i18nFormat.handleAsObject,R=s.count!==void 0&&!le(s.count),M=Oa.hasDefaultValue(s),z=R?this.pluralResolver.getSuffix(T,s.count,s):"",Q=s.ordinal&&R?this.pluralResolver.getSuffix(T,s.count,{ordinal:!1}):"",Z=R&&!s.ordinal&&s.count===0,W=Z&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${z}`]||s[`defaultValue${Q}`]||s.defaultValue;let J=L;ie&&!L&&M&&(J=W);const ge=yn(J),se=Object.prototype.toString.apply(J);if(ie&&J&&ge&&!V.includes(se)&&!(le(U)&&Array.isArray(J))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const re=this.options.returnedObjectHandler?this.options.returnedObjectHandler(X,J,{...s,ns:b}):`key '${f} (${this.language})' returned an object instead of string.`;return c?(K.res=re,K.usedParams=this.getUsedParamsDetails(s),K):re}if(u){const re=Array.isArray(J),ve=re?[]:{},ae=re?$:X;for(const fe in J)if(Object.prototype.hasOwnProperty.call(J,fe)){const ue=`${ae}${u}${fe}`;M&&!L?ve[fe]=this.translate(ue,{...s,defaultValue:yn(W)?W[fe]:void 0,joinArrays:!1,ns:b}):ve[fe]=this.translate(ue,{...s,joinArrays:!1,ns:b}),ve[fe]===ue&&(ve[fe]=J[fe])}L=ve}}else if(ie&&le(U)&&Array.isArray(L))L=L.join(U),L&&(L=this.extendTranslation(L,a,s,i));else{let re=!1,ve=!1;!this.isValidLookup(L)&&M&&(re=!0,L=W),this.isValidLookup(L)||(ve=!0,L=f);const fe=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&ve?void 0:L,ue=M&&W!==L&&this.options.updateMissing;if(ve||re||ue){if(this.logger.log(ue?"updateKey":"missingKey",T,h,R&&!ue?`${f}${this.pluralResolver.getSuffix(T,s.count,s)}`:f,ue?W:L),u){const Se=this.resolve(f,{...s,keySeparator:!1});Se&&Se.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let we=[];const Ee=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Ee&&Ee[0])for(let Se=0;Se<Ee.length;Se++)we.push(Ee[Se]);else this.options.saveMissingTo==="all"?we=this.languageUtils.toResolveHierarchy(s.lng||this.language):we.push(s.lng||this.language);const xe=(Se,ke,He)=>{var at;const ze=M&&He!==L?He:fe;this.options.missingKeyHandler?this.options.missingKeyHandler(Se,h,ke,ze,ue,s):(at=this.backendConnector)!=null&&at.saveMissing&&this.backendConnector.saveMissing(Se,h,ke,ze,ue,s),this.emit("missingKey",Se,h,ke,L)};this.options.saveMissing&&(this.options.saveMissingPlurals&&R?we.forEach(Se=>{const ke=this.pluralResolver.getSuffixes(Se,s);Z&&s[`defaultValue${this.options.pluralSeparator}zero`]&&!ke.includes(`${this.options.pluralSeparator}zero`)&&ke.push(`${this.options.pluralSeparator}zero`),ke.forEach(He=>{xe([Se],f+He,s[`defaultValue${He}`]||W)})}):xe(we,f,W))}L=this.extendTranslation(L,a,s,K,i),ve&&L===f&&this.options.appendNamespaceToMissingKey&&(L=`${h}${C}${f}`),(ve||re)&&this.options.parseMissingKeyHandler&&(L=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${h}${C}${f}`:f,re?L:void 0,s))}return c?(K.res=L,K.usedParams=this.getUsedParamsDetails(s),K):L}extendTranslation(a,r,i,s,c){var b,h;if((b=this.i18nFormat)!=null&&b.parse)a=this.i18nFormat.parse(a,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});const C=le(a)&&(((h=i==null?void 0:i.interpolation)==null?void 0:h.skipOnVariables)!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let T;if(C){const K=a.match(this.interpolator.nestingRegexp);T=K&&K.length}let I=i.replace&&!le(i.replace)?i.replace:i;if(this.options.interpolation.defaultVariables&&(I={...this.options.interpolation.defaultVariables,...I}),a=this.interpolator.interpolate(a,I,i.lng||this.language||s.usedLng,i),C){const K=a.match(this.interpolator.nestingRegexp),L=K&&K.length;T<L&&(i.nest=!1)}!i.lng&&s&&s.res&&(i.lng=this.language||s.usedLng),i.nest!==!1&&(a=this.interpolator.nest(a,(...K)=>(c==null?void 0:c[0])===K[0]&&!i.context?(this.logger.warn(`It seems you are nesting recursively key: ${K[0]} in key: ${r[0]}`),null):this.translate(...K,r),i)),i.interpolation&&this.interpolator.reset()}const u=i.postProcess||this.options.postProcess,f=le(u)?[u]:u;return a!=null&&(f!=null&&f.length)&&i.applyPostProcessor!==!1&&(a=kr.handle(f,a,r,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),a}resolve(a,r={}){let i,s,c,u,f;return le(a)&&(a=[a]),Array.isArray(a)&&(a=a.map(b=>typeof b=="function"?Dt(b,{...this.options,...r}):b)),a.forEach(b=>{if(this.isValidLookup(i))return;const h=this.extractFromKey(b,r),C=h.key;s=C;let T=h.namespaces;this.options.fallbackNS&&(T=T.concat(this.options.fallbackNS));const I=r.count!==void 0&&!le(r.count),K=I&&!r.ordinal&&r.count===0,L=r.context!==void 0&&(le(r.context)||typeof r.context=="number")&&r.context!=="",X=r.lngs?r.lngs:this.languageUtils.toResolveHierarchy(r.lng||this.language,r.fallbackLng);T.forEach($=>{var V,U;this.isValidLookup(i)||(f=$,!this.checkedLoadedFor[`${X[0]}-${$}`]&&((V=this.utils)!=null&&V.hasLoadedNamespace)&&!((U=this.utils)!=null&&U.hasLoadedNamespace(f))&&(this.checkedLoadedFor[`${X[0]}-${$}`]=!0,this.logger.warn(`key "${s}" for languages "${X.join(", ")}" won't get resolved as namespace "${f}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),X.forEach(ie=>{var z;if(this.isValidLookup(i))return;u=ie;const R=[C];if((z=this.i18nFormat)!=null&&z.addLookupKeys)this.i18nFormat.addLookupKeys(R,C,ie,$,r);else{let Q;I&&(Q=this.pluralResolver.getSuffix(ie,r.count,r));const Z=`${this.options.pluralSeparator}zero`,W=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(I&&(r.ordinal&&Q.startsWith(W)&&R.push(C+Q.replace(W,this.options.pluralSeparator)),R.push(C+Q),K&&R.push(C+Z)),L){const J=`${C}${this.options.contextSeparator||"_"}${r.context}`;R.push(J),I&&(r.ordinal&&Q.startsWith(W)&&R.push(J+Q.replace(W,this.options.pluralSeparator)),R.push(J+Q),K&&R.push(J+Z))}}let M;for(;M=R.pop();)this.isValidLookup(i)||(c=M,i=this.getResource(ie,$,M,r))}))})}),{res:i,usedKey:s,exactUsedKey:c,usedLng:u,usedNS:f}}isValidLookup(a){return a!==void 0&&!(!this.options.returnNull&&a===null)&&!(!this.options.returnEmptyString&&a==="")}getResource(a,r,i,s={}){var c;return(c=this.i18nFormat)!=null&&c.getResource?this.i18nFormat.getResource(a,r,i,s):this.resourceStore.getResource(a,r,i,s)}getUsedParamsDetails(a={}){const r=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=a.replace&&!le(a.replace);let s=i?a.replace:a;if(i&&typeof a.count<"u"&&(s={...s,count:a.count}),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!i){s={...s};for(const c of r)delete s[c]}return s}static hasDefaultValue(a){const r="defaultValue";for(const i in a)if(Object.prototype.hasOwnProperty.call(a,i)&&i.startsWith(r)&&a[i]!==void 0)return!0;return!1}}class mr{constructor(a){this.options=a,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Ye.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(a){if(a=Xt(a),!a||!a.includes("-"))return null;const r=a.split("-");return r.length===2||(r.pop(),r[r.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(r.join("-"))}getLanguagePartFromCode(a){if(a=Xt(a),!a||!a.includes("-"))return a;const r=a.split("-");return this.formatLanguageCode(r[0])}formatLanguageCode(a){if(le(a)&&a.includes("-")){let r;try{r=Intl.getCanonicalLocales(a)[0]}catch{}return r&&this.options.lowerCaseLng&&(r=r.toLowerCase()),r||(this.options.lowerCaseLng?a.toLowerCase():a)}return this.options.cleanCode||this.options.lowerCaseLng?a.toLowerCase():a}isSupportedCode(a){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(a=this.getLanguagePartFromCode(a)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(a)}getBestMatchFromCodes(a){if(!a)return null;let r;return a.forEach(i=>{if(r)return;const s=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(s))&&(r=s)}),!r&&this.options.supportedLngs&&a.forEach(i=>{if(r)return;const s=this.getScriptPartFromCode(i);if(this.isSupportedCode(s))return r=s;const c=this.getLanguagePartFromCode(i);if(this.isSupportedCode(c))return r=c;r=this.options.supportedLngs.find(u=>u===c?!0:!u.includes("-")&&!c.includes("-")?!1:!!(u.includes("-")&&!c.includes("-")&&u.slice(0,u.indexOf("-"))===c||u.startsWith(c)&&c.length>1))}),r||(r=this.getFallbackCodes(this.options.fallbackLng)[0]),r}getFallbackCodes(a,r){if(!a)return[];if(typeof a=="function"&&(a=a(r)),le(a)&&(a=[a]),Array.isArray(a))return a;if(!r)return a.default||[];let i=a[r];return i||(i=a[this.getScriptPartFromCode(r)]),i||(i=a[this.formatLanguageCode(r)]),i||(i=a[this.getLanguagePartFromCode(r)]),i||(i=a.default),i||[]}toResolveHierarchy(a,r){const i=this.options.fallbackLng,s=Array.isArray(i)?i.join("|"):i;s!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=s);const c=r===void 0||r===!1||le(r),u=r===void 0&&typeof this.options.fallbackLng=="function",f=le(a)&&c&&!u;let b=null;if(f){let I;r===void 0?I="undefined":r===!1?I="boolean:false":I=`string:${r}`,b=`${a.length}:${a}|${I}`}if(b!==null){const I=this.resolveHierarchyCache[b];if(I!==void 0)return I.slice()}const h=this.getFallbackCodes((r===!1?[]:r)||this.options.fallbackLng||[],a),C=[],T=I=>{I&&(this.isSupportedCode(I)?C.push(I):this.logger.warn(`rejecting language code not found in supportedLngs: ${I}`))};return le(a)&&(a.includes("-")||a.includes("_"))?(this.options.load!=="languageOnly"&&T(this.formatLanguageCode(a)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&T(this.getScriptPartFromCode(a)),this.options.load!=="currentOnly"&&T(this.getLanguagePartFromCode(a))):le(a)&&T(this.formatLanguageCode(a)),h.forEach(I=>{C.includes(I)||T(this.formatLanguageCode(I))}),b!==null?(this.resolveHierarchyCache[b]=C,C.slice()):C}}const fr={zero:0,one:1,two:2,few:3,many:4,other:5},gr={select:p=>p===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class fi{constructor(a,r={}){this.languageUtils=a,this.options=r,this.logger=Ye.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(a,r={}){const i=Xt(a==="dev"?"en":a),s=r.ordinal?"ordinal":"cardinal",c=JSON.stringify({cleanedCode:i,type:s});if(c in this.pluralRulesCache)return this.pluralRulesCache[c];let u;try{u=new Intl.PluralRules(i,{type:s})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),gr;if(!a.match(/-|_/))return gr;const b=this.languageUtils.getLanguagePartFromCode(a);u=this.getRule(b,r)}return this.pluralRulesCache[c]=u,u}needsPlural(a,r={}){let i=this.getRule(a,r);return i||(i=this.getRule("dev",r)),(i==null?void 0:i.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(a,r,i={}){return this.getSuffixes(a,i).map(s=>`${r}${s}`)}getSuffixes(a,r={}){let i=this.getRule(a,r);return i||(i=this.getRule("dev",r)),i?i.resolvedOptions().pluralCategories.sort((s,c)=>fr[s]-fr[c]).map(s=>`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(a,r,i={}){const s=this.getRule(a,i);return s?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${s.select(r)}`:(this.logger.warn(`no plural rule found for: ${a}`),this.getSuffix("dev",r,i))}}const br=(p,a,r,i=".",s=!0)=>{let c=oi(p,a,r);return!c&&s&&le(r)&&(c=_n(p,r,i),c===void 0&&(c=_n(a,r,i))),c},hr=p=>p.replace(/\$/g,"$$$$");class vr{constructor(a={}){var r;this.logger=Ye.create("interpolator"),this.options=a,this.format=((r=a==null?void 0:a.interpolation)==null?void 0:r.format)||(i=>i),this.init(a)}init(a={}){a.interpolation||(a.interpolation={escapeValue:!0});const{escape:r,escapeValue:i,useRawValueToEscape:s,prefix:c,prefixEscaped:u,suffix:f,suffixEscaped:b,formatSeparator:h,unescapeSuffix:C,unescapePrefix:T,nestingPrefix:I,nestingPrefixEscaped:K,nestingSuffix:L,nestingSuffixEscaped:X,nestingOptionsSeparator:$,maxReplaces:V,alwaysFormat:U}=a.interpolation;this.escape=r!==void 0?r:si,this.escapeValue=i!==void 0?i:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=c?et(c):u||"{{",this.suffix=f?et(f):b||"}}",this.formatSeparator=h||",",this.unescapePrefix=C?"":T?et(T):"-",this.unescapeSuffix=this.unescapePrefix?"":C?et(C):"",this.nestingPrefix=I?et(I):K||et("$t("),this.nestingSuffix=L?et(L):X||et(")"),this.nestingOptionsSeparator=$||",",this.maxReplaces=V||1e3,this.alwaysFormat=U!==void 0?U:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const a=(r,i)=>(r==null?void 0:r.source)===i?(r.lastIndex=0,r):new RegExp(i,"g");this.regexp=a(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=a(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=a(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(a,r,i,s){var K;let c,u,f;const b=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},h=L=>{if(!L.includes(this.formatSeparator)){const U=br(r,b,L,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(U,void 0,i,{...s,...r,interpolationkey:L}):U}const X=L.split(this.formatSeparator),$=X.shift().trim(),V=X.join(this.formatSeparator).trim();return this.format(br(r,b,$,this.options.keySeparator,this.options.ignoreJSONStructure),V,i,{...s,...r,interpolationkey:$})};this.resetRegExp(),!this.escapeValue&&typeof a=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(a)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const C=(s==null?void 0:s.missingInterpolationHandler)||this.options.missingInterpolationHandler,T=((K=s==null?void 0:s.interpolation)==null?void 0:K.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:L=>L},{regex:this.regexp,safeValue:L=>this.escapeValue?this.escape(L):L}].forEach(L=>{for(f=0;c=L.regex.exec(a);){const X=c[1].trim();if(u=h(X),u===void 0)if(typeof C=="function"){const V=C(a,c,s);u=le(V)?V:""}else if(s&&Object.prototype.hasOwnProperty.call(s,X))u="";else if(T){u=c[0];continue}else this.logger.warn(`missed to pass in variable ${X} for interpolating ${a}`),u="";else!le(u)&&!this.useRawValueToEscape&&(u=vn(u));const $=L.safeValue(u);if(a=a.replace(c[0],hr($)),T?(L.regex.lastIndex+=$.length,L.regex.lastIndex-=c[0].length):L.regex.lastIndex=0,f++,f>=this.maxReplaces)break}}),a}nest(a,r,i={}){let s,c,u;const f=(b,h)=>{const C=this.nestingOptionsSeparator;if(!b.includes(C))return b;const T=b.split(new RegExp(`${et(C)}[ ]*{`));let I=`{${T[1]}`;b=T[0],I=this.interpolate(I,u);const K=I.match(/'/g),L=I.match(/"/g);(((K==null?void 0:K.length)??0)%2===0&&!L||((L==null?void 0:L.length)??0)%2!==0)&&(I=I.replace(/'/g,'"'));try{u=JSON.parse(I),h&&(u={...h,...u})}catch(X){return this.logger.warn(`failed parsing options string in nesting for key ${b}`,X),`${b}${C}${I}`}return u.defaultValue&&u.defaultValue.includes(this.prefix)&&delete u.defaultValue,b};for(;s=this.nestingRegexp.exec(a);){let b=[];u={...i},u=u.replace&&!le(u.replace)?u.replace:u,u.applyPostProcessor=!1,delete u.defaultValue;const h=/{.*}/s.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(h!==-1&&(b=s[1].slice(h).split(this.formatSeparator).map(C=>C.trim()).filter(Boolean),s[1]=s[1].slice(0,h)),c=r(f.call(this,s[1].trim(),u),u),c&&s[0]===a&&!le(c))return c;le(c)||(c=vn(c)),c||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${a}`),c=""),b.length&&(c=b.reduce((C,T)=>this.format(C,T,i.lng,{...i,interpolationkey:s[1].trim()}),c.trim())),a=a.replace(s[0],hr(vn(c))),this.regexp.lastIndex=0}return a}}const gi=p=>{let a=p.toLowerCase().trim();const r={};if(p.includes("(")){const i=p.split("(");a=i[0].toLowerCase().trim();const s=i[1].slice(0,-1);a==="currency"&&!s.includes(":")?r.currency||(r.currency=s.trim()):a==="relativetime"&&!s.includes(":")?r.range||(r.range=s.trim()):s.split(";").forEach(u=>{if(u){const[f,...b]=u.split(":"),h=b.join(":").trim().replace(/^'+|'+$/g,""),C=f.trim();r[C]||(r[C]=h),h==="false"&&(r[C]=!1),h==="true"&&(r[C]=!0),isNaN(h)||(r[C]=parseInt(h,10))}})}return{formatName:a,formatOptions:r}},yr=p=>{const a={};return(r,i,s)=>{let c=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(c={...c,[s.interpolationkey]:void 0});const u=i+JSON.stringify(c);let f=a[u];return f||(f=p(Xt(i),s),a[u]=f),f(r)}},bi=p=>(a,r,i)=>p(Xt(r),i)(a);class hi{constructor(a={}){this.logger=Ye.create("formatter"),this.options=a,this.init(a)}init(a,r={interpolation:{}}){this.formatSeparator=r.interpolation.formatSeparator||",";const i=r.cacheInBuiltFormats?yr:bi;this.formats={number:i((s,c)=>{const u=new Intl.NumberFormat(s,{...c});return f=>u.format(f)}),currency:i((s,c)=>{const u=new Intl.NumberFormat(s,{...c,style:"currency"});return f=>u.format(f)}),datetime:i((s,c)=>{const u=new Intl.DateTimeFormat(s,{...c});return f=>u.format(f)}),relativetime:i((s,c)=>{const u=new Intl.RelativeTimeFormat(s,{...c});return f=>u.format(f,c.range||"day")}),list:i((s,c)=>{const u=new Intl.ListFormat(s,{...c});return f=>u.format(f)})}}add(a,r){this.formats[a.toLowerCase().trim()]=r}addCached(a,r){this.formats[a.toLowerCase().trim()]=yr(r)}format(a,r,i,s={}){if(!r||a==null)return a;const c=r.split(this.formatSeparator),u=[];for(let b=0;b<c.length;b++){let h=c[b];for(;h.indexOf("(")>-1&&!h.includes(")")&&b+1<c.length;)h=`${h}${this.formatSeparator}${c[++b]}`;u.push(h)}return u.reduce((b,h)=>{var I;const{formatName:C,formatOptions:T}=gi(h);if(this.formats[C]){let K=b;try{const L=((I=s==null?void 0:s.formatParams)==null?void 0:I[s.interpolationkey])||{},X=L.locale||L.lng||s.locale||s.lng||i;K=this.formats[C](b,X,{...T,...s,...L})}catch(L){this.logger.warn(L)}return K}else this.logger.warn(`there was no format function for ${C}`);return b},a)}}const vi=(p,a)=>{p.pending[a]!==void 0&&(delete p.pending[a],p.pendingCount--)};class yi extends La{constructor(a,r,i,s={}){var c,u;super(),this.backend=a,this.store=r,this.services=i,this.languageUtils=i.languageUtils,this.options=s,this.logger=Ye.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],(u=(c=this.backend)==null?void 0:c.init)==null||u.call(c,i,s.backend,s)}queueLoad(a,r,i,s){const c={},u={},f={},b={};return a.forEach(h=>{let C=!0;r.forEach(T=>{const I=`${h}|${T}`;!i.reload&&this.store.hasResourceBundle(h,T)?this.state[I]=2:this.state[I]<0||(this.state[I]===1?u[I]===void 0&&(u[I]=!0):(this.state[I]=1,C=!1,u[I]===void 0&&(u[I]=!0),c[I]===void 0&&(c[I]=!0),b[T]===void 0&&(b[T]=!0)))}),C||(f[h]=!0)}),(Object.keys(c).length||Object.keys(u).length)&&this.queue.push({pending:u,pendingCount:Object.keys(u).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(c),pending:Object.keys(u),toLoadLanguages:Object.keys(f),toLoadNamespaces:Object.keys(b)}}loaded(a,r,i){const s=a.split("|"),c=s[0],u=s[1];r&&this.emit("failedLoading",c,u,r),!r&&i&&this.store.addResourceBundle(c,u,i,void 0,void 0,{skipCopy:!0}),this.state[a]=r?-1:2,r&&i&&(this.state[a]=0);const f={};this.queue.forEach(b=>{ri(b.loaded,[c],u),vi(b,a),r&&b.errors.push(r),b.pendingCount===0&&!b.done&&(Object.keys(b.loaded).forEach(h=>{f[h]||(f[h]={});const C=b.loaded[h];C.length&&C.forEach(T=>{f[h][T]===void 0&&(f[h][T]=!0)})}),b.done=!0,b.errors.length?b.callback(b.errors):b.callback())}),this.emit("loaded",f),this.queue=this.queue.filter(b=>!b.done)}read(a,r,i,s=0,c=this.retryTimeout,u){if(!a.length)return u(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:a,ns:r,fcName:i,tried:s,wait:c,callback:u});return}this.readingCalls++;const f=(h,C)=>{if(this.readingCalls--,this.waitingReads.length>0){const T=this.waitingReads.shift();this.read(T.lng,T.ns,T.fcName,T.tried,T.wait,T.callback)}if(h&&C&&s<this.maxRetries){setTimeout(()=>{this.read(a,r,i,s+1,c*2,u)},c);return}u(h,C)},b=this.backend[i].bind(this.backend);if(b.length===2){try{const h=b(a,r);h&&typeof h.then=="function"?h.then(C=>f(null,C)).catch(f):f(null,h)}catch(h){f(h)}return}return b(a,r,f)}prepareLoading(a,r,i={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();le(a)&&(a=this.languageUtils.toResolveHierarchy(a)),le(r)&&(r=[r]);const c=this.queueLoad(a,r,i,s);if(!c.toLoad.length)return c.pending.length||s(),null;c.toLoad.forEach(u=>{this.loadOne(u)})}load(a,r,i){this.prepareLoading(a,r,{},i)}reload(a,r,i){this.prepareLoading(a,r,{reload:!0},i)}loadOne(a,r=""){const i=a.split("|"),s=i[0],c=i[1];this.read(s,c,"read",void 0,void 0,(u,f)=>{u&&this.logger.warn(`${r}loading namespace ${c} for language ${s} failed`,u),!u&&f&&this.logger.log(`${r}loaded namespace ${c} for language ${s}`,f),this.loaded(a,u,f)})}saveMissing(a,r,i,s,c,u={},f=()=>{}){var b,h,C,T,I;if((h=(b=this.services)==null?void 0:b.utils)!=null&&h.hasLoadedNamespace&&!((T=(C=this.services)==null?void 0:C.utils)!=null&&T.hasLoadedNamespace(r))){this.logger.warn(`did not save key "${i}" as the namespace "${r}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if((I=this.backend)!=null&&I.create){const K={...u,isUpdate:c},L=this.backend.create.bind(this.backend);if(L.length<6)try{let X;L.length===5?X=L(a,r,i,s,K):X=L(a,r,i,s),X&&typeof X.then=="function"?X.then($=>f(null,$)).catch(f):f(null,X)}catch(X){f(X)}else L(a,r,i,s,f,K)}!a||!a[0]||this.store.addResource(a[0],r,i,s)}}}const xn=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:p=>{let a={};if(typeof p[1]=="object"&&(a=p[1]),le(p[1])&&(a.defaultValue=p[1]),le(p[2])&&(a.tDescription=p[2]),typeof p[2]=="object"||typeof p[3]=="object"){const r=p[3]||p[2];Object.keys(r).forEach(i=>{a[i]=r[i]})}return a},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),xr=p=>(le(p.ns)&&(p.ns=[p.ns]),le(p.fallbackLng)&&(p.fallbackLng=[p.fallbackLng]),le(p.fallbackNS)&&(p.fallbackNS=[p.fallbackNS]),p.supportedLngs&&!p.supportedLngs.includes("cimode")&&(p.supportedLngs=p.supportedLngs.concat(["cimode"])),p),ka=()=>{},xi=p=>{Object.getOwnPropertyNames(Object.getPrototypeOf(p)).forEach(r=>{typeof p[r]=="function"&&(p[r]=p[r].bind(p))})};class Yt extends La{constructor(a={},r){if(super(),this.options=xr(a),this.services={},this.logger=Ye,this.modules={external:[]},xi(this),r&&!this.isInitialized&&!a.isClone){if(!this.options.initAsync)return this.init(a,r),this;setTimeout(()=>{this.init(a,r)},0)}}init(a={},r){this.isInitializing=!0,typeof a=="function"&&(r=a,a={}),a.defaultNS==null&&a.ns&&(le(a.ns)?a.defaultNS=a.ns:a.ns.includes("translation")||(a.defaultNS=a.ns[0]));const i=xn();this.options={...i,...this.options,...xr(a)},this.options.interpolation={...i.interpolation,...this.options.interpolation},a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=i.overloadTranslationOptionHandler);const s=h=>h?typeof h=="function"?new h:h:null;if(!this.options.isClone){this.modules.logger?Ye.init(s(this.modules.logger),this.options):Ye.init(null,this.options);let h;this.modules.formatter?h=this.modules.formatter:h=hi;const C=new mr(this.options);this.store=new pr(this.options.resources,this.options);const T=this.services;T.logger=Ye,T.resourceStore=this.store,T.languageUtils=C,T.pluralResolver=new fi(C,{prepend:this.options.pluralSeparator}),h&&(T.formatter=s(h),T.formatter.init&&T.formatter.init(T,this.options),this.options.interpolation.format=T.formatter.format.bind(T.formatter)),T.interpolator=new vr(this.options),T.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},T.backendConnector=new yi(s(this.modules.backend),T.resourceStore,T,this.options),T.backendConnector.on("*",(I,...K)=>{this.emit(I,...K)}),this.modules.languageDetector&&(T.languageDetector=s(this.modules.languageDetector),T.languageDetector.init&&T.languageDetector.init(T,this.options.detection,this.options)),this.modules.i18nFormat&&(T.i18nFormat=s(this.modules.i18nFormat),T.i18nFormat.init&&T.i18nFormat.init(this)),this.translator=new Oa(this.services,this.options),this.translator.on("*",(I,...K)=>{this.emit(I,...K)}),this.modules.external.forEach(I=>{I.init&&I.init(this)})}if(this.format=this.options.interpolation.format,r||(r=ka),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const h=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);h.length>0&&h[0]!=="dev"&&(this.options.lng=h[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(h=>{this[h]=(...C)=>this.store[h](...C)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(h=>{this[h]=(...C)=>(this.store[h](...C),this)});const f=Ht(),b=()=>{const h=(C,T)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),f.resolve(T),r(C,T)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return h(null,this.t.bind(this));this.changeLanguage(this.options.lng,h)};return this.options.resources||!this.options.initAsync?b():setTimeout(b,0),f}loadResources(a,r=ka){var c,u;let i=r;const s=le(a)?a:this.language;if(typeof a=="function"&&(i=a),!this.options.resources||this.options.partialBundledLanguages){if((s==null?void 0:s.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();const f=[],b=h=>{if(!h||h==="cimode")return;this.services.languageUtils.toResolveHierarchy(h).forEach(T=>{T!=="cimode"&&(f.includes(T)||f.push(T))})};s?b(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(C=>b(C)),(u=(c=this.options.preload)==null?void 0:c.forEach)==null||u.call(c,h=>b(h)),this.services.backendConnector.load(f,this.options.ns,h=>{!h&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(h)})}else i(null)}reloadResources(a,r,i){const s=Ht();return typeof a=="function"&&(i=a,a=void 0),typeof r=="function"&&(i=r,r=void 0),a||(a=this.languages),r||(r=this.options.ns),i||(i=ka),this.services.backendConnector.reload(a,r,c=>{s.resolve(),i(c)}),s}use(a){if(!a)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!a.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return a.type==="backend"&&(this.modules.backend=a),(a.type==="logger"||a.log&&a.warn&&a.error)&&(this.modules.logger=a),a.type==="languageDetector"&&(this.modules.languageDetector=a),a.type==="i18nFormat"&&(this.modules.i18nFormat=a),a.type==="postProcessor"&&kr.addPostProcessor(a),a.type==="formatter"&&(this.modules.formatter=a),a.type==="3rdParty"&&this.modules.external.push(a),this}setResolvedLanguage(a){if(!(!a||!this.languages)&&!["cimode","dev"].includes(a)){for(let r=0;r<this.languages.length;r++){const i=this.languages[r];if(!["cimode","dev"].includes(i)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}!this.resolvedLanguage&&!this.languages.includes(a)&&this.store.hasLanguageSomeTranslations(a)&&(this.resolvedLanguage=a,this.languages.unshift(a))}}changeLanguage(a,r){this.isLanguageChangingTo=a;const i=Ht();this.emit("languageChanging",a);const s=f=>{this.language=f,this.languages=this.services.languageUtils.toResolveHierarchy(f),this.resolvedLanguage=void 0,this.setResolvedLanguage(f)},c=(f,b)=>{b?this.isLanguageChangingTo===a&&(s(b),this.translator.changeLanguage(b),this.isLanguageChangingTo=void 0,this.emit("languageChanged",b),this.logger.log("languageChanged",b)):this.isLanguageChangingTo=void 0,i.resolve((...h)=>this.t(...h)),r&&r(f,(...h)=>this.t(...h))},u=f=>{var C,T;!a&&!f&&this.services.languageDetector&&(f=[]);const b=le(f)?f:f&&f[0],h=this.store.hasLanguageSomeTranslations(b)?b:this.services.languageUtils.getBestMatchFromCodes(le(f)?[f]:f);h&&(this.language||s(h),this.translator.language||this.translator.changeLanguage(h),(T=(C=this.services.languageDetector)==null?void 0:C.cacheUserLanguage)==null||T.call(C,h)),this.loadResources(h,I=>{c(I,h)})};return!a&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!a&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(a),i}getFixedT(a,r,i,s){const c=s==null?void 0:s.scopeNs,u=(f,b,...h)=>{let C;typeof b!="object"?C=this.options.overloadTranslationOptionHandler([f,b].concat(h)):C={...b},C.lng=C.lng||u.lng,C.lngs=C.lngs||u.lngs;const T=C.ns!==void 0&&C.ns!==null;C.ns=C.ns||u.ns,C.keyPrefix!==""&&(C.keyPrefix=C.keyPrefix||i||u.keyPrefix);const I={...this.options,...C};Array.isArray(c)&&!T&&(I.ns=c),typeof C.keyPrefix=="function"&&(C.keyPrefix=Dt(C.keyPrefix,I));const K=this.options.keySeparator||".";let L;return C.keyPrefix&&Array.isArray(f)?L=f.map(X=>(typeof X=="function"&&(X=Dt(X,I)),`${C.keyPrefix}${K}${X}`)):(typeof f=="function"&&(f=Dt(f,I)),L=C.keyPrefix?`${C.keyPrefix}${K}${f}`:f),this.t(L,C)};return le(a)?u.lng=a:u.lngs=a,u.ns=r,u.keyPrefix=i,u}t(...a){var r;return(r=this.translator)==null?void 0:r.translate(...a)}exists(...a){var r;return(r=this.translator)==null?void 0:r.exists(...a)}setDefaultNamespace(a){this.options.defaultNS=a}hasLoadedNamespace(a,r={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const i=r.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,c=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;const u=(f,b)=>{const h=this.services.backendConnector.state[`${f}|${b}`];return h===-1||h===0||h===2};if(r.precheck){const f=r.precheck(this,u);if(f!==void 0)return f}return!!(this.hasResourceBundle(i,a)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||u(i,a)&&(!s||u(c,a)))}loadNamespaces(a,r){const i=Ht();return this.options.ns?(le(a)&&(a=[a]),a.forEach(s=>{this.options.ns.includes(s)||this.options.ns.push(s)}),this.loadResources(s=>{i.resolve(),r&&r(s)}),i):(r&&r(),Promise.resolve())}loadLanguages(a,r){const i=Ht();le(a)&&(a=[a]);const s=this.options.preload||[],c=a.filter(u=>!s.includes(u)&&this.services.languageUtils.isSupportedCode(u));return c.length?(this.options.preload=s.concat(c),this.loadResources(u=>{i.resolve(),r&&r(u)}),i):(r&&r(),Promise.resolve())}dir(a){var s,c;if(a||(a=this.resolvedLanguage||(((s=this.languages)==null?void 0:s.length)>0?this.languages[0]:this.language)),!a)return"rtl";try{const u=new Intl.Locale(a);if(u&&u.getTextInfo){const f=u.getTextInfo();if(f&&f.direction)return f.direction}}catch{}const r=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=((c=this.services)==null?void 0:c.languageUtils)||new mr(xn());return a.toLowerCase().indexOf("-latn")>1?"ltr":r.includes(i.getLanguagePartFromCode(a))||a.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(a={},r){const i=new Yt(a,r);return i.createInstance=Yt.createInstance,i}cloneInstance(a={},r=ka){const i=a.forkResourceStore;i&&delete a.forkResourceStore;const s={...this.options,...a,isClone:!0},c=new Yt(s);if((a.debug!==void 0||a.prefix!==void 0)&&(c.logger=c.logger.clone(a)),["store","services","language"].forEach(f=>{c[f]=this[f]}),c.services={...this.services},c.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},i){const f=Object.keys(this.store.data).reduce((b,h)=>(b[h]={...this.store.data[h]},b[h]=Object.keys(b[h]).reduce((C,T)=>(C[T]={...b[h][T]},C),b[h]),b),{});c.store=new pr(f,s),c.services.resourceStore=c.store}if(a.interpolation){const b={...xn().interpolation,...this.options.interpolation,...a.interpolation},h={...s,interpolation:b};c.services.interpolator=new vr(h)}return c.translator=new Oa(c.services,s),c.translator.on("*",(f,...b)=>{c.emit(f,...b)}),c.init(s,r),c.translator.options=s,c.translator.backendConnector.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},c}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const je=Yt.createInstance();je.createInstance;je.dir;je.init;je.loadResources;je.reloadResources;je.use;je.changeLanguage;je.getFixedT;je.t;je.exists;je.setDefaultNamespace;je.hasLoadedNamespace;je.loadNamespaces;je.loadLanguages;const _i={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, no copiando",criticalThinking:"Pensamiento crítico activo • Sin trampas de IA"},Ci={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar & Drive sincronizados"},wi={agenda:"Agenda",study:"Estudio / Repaso",tasks:"Trabajos",tutorBadge:"Tutor IA"},Pi={nextMilestone:"Próximo Hito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoy",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodología activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados en tu cuenta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudio",autonomousOrg:"Organización autónoma",subtitle:"Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.",addBlock:"Añadir Bloque de Estudio",emptyTitle:"No hay bloques de estudio programados.",emptyDesc:'Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.',pendingSync:"Pendiente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Añadir Bloque de Estudio",modalSubtitle:"Planifica un hito para organizar tu tiempo de aprendizaje.",fieldActivity:"Título de la actividad",fieldSubject:"Asignatura",fieldType:"Tipo de Hito",fieldDate:"Fecha",fieldTime:"Hora Inicio",fieldNotes:"Notas u objetivo personal",cancel:"Cancelar",save:"Guardar Bloque",types:{study_session:"Sesión de estudio (45 min)",exam:"Examen lectivo",assignment_due:"Entrega de trabajo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Agenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador de Agenda",modalPlannerSubtitle:"Estructura Propia de 4 Pilares: Distribución Homogénea, Prioridad y Fechas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},Si={bannerTitle:"Marco de Aprendizaje Socrático Activo",bannerDesc:"La IA guía tu pensamiento con preguntas reflexivas. Prohibido obtener soluciones automáticas para garantizar tu crecimiento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveles: Funcional • Regulador LOMLOE • Línea Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveles)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividad / Variación:",stepPrefix:"Paso",baselineConcepts:"Línea Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Generador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inyección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarjeta de Autoevaluación",flashcardSubtitle:"Explica con tus palabras antes de ver la explicación:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar luego",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Hazme una pregunta diagnóstica",chip2:"💡 Dame una pista reflexiva",chip3:"🎯 ¿Voy por buen camino?",inputPlaceholder:"Escribe tu razonamiento o duda... (Enter para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: la IA fomenta tu propio esfuerzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Tú",taskListTitle:"Tareas de Estudio y Repaso Activo",taskListSubtitle:"Selecciona una tarea para iniciar la sesión guiada con el tutor socrático. Solo puede haber una tarea activa a la vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interacciones",pedagogicalAnchor:"Fundamentación Pedagógica LOMLOE",pauseNotice:"En pausa (progreso guardado)",activeBadge:"Sesión activa",activeTaskNote:"Al iniciar otra tarea, la anterior se pausará automáticamente.",noTasks:"No hay tareas de estudio disponibles para este curso."},Ai={title:"Trabajos y Proyectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.",btnPromptProject:"Prompt Trabajos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Trabajos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",btnViewTaskPrompt:"Ver Prompt del Trabajo",tooltipViewTaskPrompt:"Ver el Grafo de Prompts (4 Niveles) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operaciones Concretas",grade2batxBadge:"🟣 2º de Bachillerato • Operaciones Formales (PAU)",pedagogicalFoundation:"Fundamento Pedagógico (Piaget & Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Trabajos y Proyectos",modalProjectSubtitle:"Grafo de 4 Niveles: Metodología de 4 Fases y Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inyección Contextualizada de 4 Niveles para {{subject}}",newTask:"Nuevo Trabajo",emptyTitle:"No tienes trabajos activos registrados.",emptyDesc:'Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.',dueDate:"Fecha Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Archivo",noDriveFiles:"No hay archivos vinculados de Drive todavía.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía del Estudiante",ownEffort:"propio",modalTitle:"Nuevo Trabajo o Entregable",modalSubtitle:"Crea una ficha para organizar tu investigación y documentos.",fieldTitle:"Título del Proyecto / Trabajo",fieldSubject:"Asignatura",fieldDue:"Fecha de Entrega",fieldNotes:"Descripción u objetivo",cancel:"Cancelar",create:"Crear Trabajo"},Ei={titleAssembled:"Ensamblado del Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestación Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Cerrar",sourceLabel:"Origen:",footerGraph:"Grafo de prompts por capas: evita alucinaciones y garantiza rigor curricular",footerAudit:"Metodología pedagógica y auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador & Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividad & Variación"},graphTitle:"Arquitectura del Grafo de Inferencia",graphSubtitle:"Flujo de confluencia multicapa hacia la System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Colapsar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Haz clic en cualquier nodo para saltar a su capa en el acordeón",discreteComponents:"Componentes Discretos y Ensamblado"},ki={title:"Configuración del Modelo de IA",subtitle:"Inferencia local o en la nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidad Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL del Endpoint API",endpointHint:"Compatible con /v1/chat/completions y /v1/models",modelName:"Nombre del Modelo",apiKey:"API Key (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicamente en tu navegador (IndexedDB local).",socraticMode:"Modo Pedagógico Socrático",strictHigh:"Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)",strictBalanced:"Equilibrado: Pistas intermedias y ejemplos análogos",strictExploratory:"Exploratorio: Explicaciones conceptuales y desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Guardar Cambios"},Ti={title:"Cuenta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Cuenta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudio",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Cerrar Sesión / Desconectar",modeSelectorTitle:"Elige el método de acceso",demoOptionTitle:"Modo Demo (Recomendado para evaluación)",demoOptionDesc:"Explora toda la plataforma con datos precargados de muestra sin necesidad de credenciales.",demoButton:"Usar Modo Demo",realOptionTitle:"Conectar Cuenta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza tus eventos en tu Google Calendar real y vincula tus archivos de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ej. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Consíguelo en Google Cloud Console > APIs y Servicios > Credenciales > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar tu cuenta educativa o personal de Google permite:",benefit1:"Exportar tus sesiones de estudio a Google Calendar.",benefit2:"Adjuntar tus apuntes y borradores desde Google Drive.",benefit3:"Garantizar que tus datos permanezcan privados y bajo tu control."},Di={updateTitle:"¡Nueva versión disponible!",updateDesc:"Actualiza para recibir las últimas mejoras.",updateButton:"Actualizar"},$i={app:_i,nav:Ci,tabs:wi,agenda:Pi,study:Si,tasks:Ai,promptModal:Ei,aiModal:ki,authModal:Ti,pwa:Di},Oi={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense trampes d'IA"},Ii={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},Li={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},ji={nextMilestone:"Proper Hite Lectiu",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min avui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribueix l'esforç en blocs curts per garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem a "Afegir Bloc d'Estudi" per començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Desar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},Mi={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtenir solucions automàtiques per garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teves paraules abans de veure l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig pel bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a aquest curs."},Ri={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per elaborar treballs rigorosos garantint la teva autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem a "Nou Treball" per començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents a Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per organitzar la teva recerca i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},Bi={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},qi={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privadesa Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Desada de forma segura únicament al teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Desar Canvis"},Ni={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconsegueix-lo a Google Cloud Console > APIs i Serveis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teves sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teves dades romanguin privades i sota el teu control."},zi={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per rebre les darreres millores.",updateButton:"Actualitzar"},Fi={app:Oi,nav:Ii,tabs:Li,agenda:ji,study:Mi,tasks:Ri,promptModal:Bi,aiModal:qi,authModal:Ni,pwa:zi},Ki={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, non copiando",criticalThinking:"Pensamento crítico activo • Sen trampas de IA"},Gi={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar e Drive sincronizados"},Vi={agenda:"Axenda",study:"Estudo / Repaso",tasks:"Traballos",tutorBadge:"Tutor IA"},Hi={nextMilestone:"Próximo Fito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoxe",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodoloxía activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados na túa conta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudo",autonomousOrg:"Organización autónoma",subtitle:"Distribúe o esforzo en bloques curtos para garantir a asimilación a longo prazo.",addBlock:"Engadir Bloque de Estudo",emptyTitle:"Non hai bloques de estudo programados.",emptyDesc:'Preme en "Engadir Bloque de Estudo" para comezar a organizar o teu tempo.',pendingSync:"Pendente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Engadir Bloque de Estudo",modalSubtitle:"Planifica un fito para organizar o teu tempo de aprendizaxe.",fieldActivity:"Título da actividade",fieldSubject:"Materia",fieldType:"Tipo de Fito",fieldDate:"Data",fieldTime:"Hora de Inicio",fieldNotes:"Notas ou obxectivo persoal",cancel:"Cancelar",save:"Gardar Bloque",types:{study_session:"Sesión de estudo (45 min)",exam:"Exame lectivo",assignment_due:"Entrega de traballo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Axenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",modalPlannerTitle:"Estrutura de Prompt: Planificador de Axenda",modalPlannerSubtitle:"Estrutura Propia de 4 Pilares: Distribución Homoxénea, Prioridade e Datas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},Ui={bannerTitle:"Marco de Aprendizaxe Socrática Activa",bannerDesc:"A IA guía o teu pensamento con preguntas reflexivas. Prohibido obter solucións automáticas para garantir o teu crecemento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveis: Funcional • Regulador LOMLOE • Liña Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveis)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividade / Variación:",stepPrefix:"Paso",baselineConcepts:"Liña Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Xerador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inxección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarxeta de Autoavaliación",flashcardSubtitle:"Explica coas túas palabras antes de ver a explicación:",toggleHint:"👁️ Amosar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar despois",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Faime unha pregunta diagnóstica",chip2:"💡 Dáme unha pista reflexiva",chip3:"🎯 Vou polo bo camiño?",inputPlaceholder:"Escribe o teu razoamento ou dúbida... (Intro para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: a IA fomenta o teu propio esforzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Ti",taskListTitle:"Tarefas de Estudo e Repaso Activo",taskListSubtitle:"Selecciona unha tarefa para iniciar a sesión guiada co titor socrático. Só pode haber unha tarefa activa á vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interaccións",pedagogicalAnchor:"Fundamentación Pedagóxica LOMLOE",pauseNotice:"En pausa (sesión gardada)",activeBadge:"Sesión activa",activeTaskNote:"Ao iniciar outra tarefa, a anterior pausarase automaticamente.",noTasks:"Non hai tarefas de estudo dispoñibles para este curso."},Wi={title:"Traballos e Proxectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar traballos rigorosos garantindo a túa autoría e ideas propias.",btnPromptProject:"Prompt Traballos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Traballos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",btnViewTaskPrompt:"Ver Prompt do Traballo",tooltipViewTaskPrompt:"Ver o Grafo de Prompts (4 Niveis) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operacións Concretas",grade2batxBadge:"🟣 2º de Bacharelato • Operacións Formais (PAU)",pedagogicalFoundation:"Fundamento Pedagóxico (Piaget e Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Traballos e Proxectos",modalProjectSubtitle:"Grafo de 4 Niveis: Metodoloxía de 4 Fases e Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inxección Contextualizada de 4 Niveis para {{subject}}",newTask:"Novo Traballo",emptyTitle:"Non tes traballos activos rexistrados.",emptyDesc:'Preme en "Novo Traballo" para comezar a estruturar un entregable.',dueDate:"Data Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Ficheiro",noDriveFiles:"Aínda non hai ficheiros vinculados de Drive.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía do Estudante",ownEffort:"propio",modalTitle:"Novo Traballo ou Entregable",modalSubtitle:"Crea unha ficha para organizar a túa investigación e documentos.",fieldTitle:"Título do Proxecto / Traballo",fieldSubject:"Materia",fieldDue:"Data de Entrega",fieldNotes:"Descrición ou obxectivo",cancel:"Cancelar",create:"Crear Traballo"},Qi={titleAssembled:"Ensamblado do Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestración Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Pechar",sourceLabel:"Orixe:",footerGraph:"Grafo de prompts por capas: evita alucinacións e garante rigor curricular",footerAudit:"Metodoloxía pedagóxica e auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador e Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividade e Variación"},graphTitle:"Arquitectura do Grafo de Inferencia",graphSubtitle:"Fluxo de confluencia multicapa cara á System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Pregar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Fai clic en calquera nodo para saltar á súa capa no acordeón",discreteComponents:"Compoñentes Discretos e Ensamblado"},Yi={title:"Configuración do Modelo de IA",subtitle:"Inferencia local ou na nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidade Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL do Endpoint API",endpointHint:"Compatible con /v1/chat/completions e /v1/models",modelName:"Nome do Modelo",apiKey:"Chave de API (Opcional en Local)",apiKeyHint:"Gardada de forma segura unicamente no teu navegador (IndexedDB local).",socraticMode:"Modo Pedagóxico Socrático",strictHigh:"Estrito: Nunca dá solucións directas (100% preguntas de razoamento)",strictBalanced:"Equilibrado: Pistas intermedias e exemplos análogos",strictExploratory:"Exploratorio: Explicacións conceptuais e desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Gardar Cambios"},Ji={title:"Conta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Conta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudo",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Pechar Sesión / Desconectar",modeSelectorTitle:"Escolle o método de acceso",demoOptionTitle:"Modo Demo (Recomendado para avaliación)",demoOptionDesc:"Explora toda a plataforma con datos precargados de mostra sen necesidade de credenciais.",demoButton:"Empregar Modo Demo",realOptionTitle:"Conectar Conta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza os teus eventos no teu Google Calendar real e vincula os teus ficheiros de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Conségueo en Google Cloud Console > APIs e Servizos > Credenciais > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar a túa conta educativa ou persoal de Google permite:",benefit1:"Exportar as túas sesións de estudo a Google Calendar.",benefit2:"Xuntar os teus apuntamentos e borradores desde Google Drive.",benefit3:"Garantir que os teus datos permanezan privados e baixo o teu control."},Xi={updateTitle:"Nova versión dispoñible!",updateDesc:"Actualiza para recibir as últimas melloras.",updateButton:"Actualizar"},Zi={app:Ki,nav:Gi,tabs:Vi,agenda:Hi,study:Ui,tasks:Wi,promptModal:Qi,aiModal:Yi,authModal:Ji,pwa:Xi},es={title:"Anaxagoras AI",badge:"STI Kognitiboa",tagline:"Pentsatuz ikasi, ez kopiatuz",criticalThinking:"Pentsamendu kritiko aktiboa • IA trikimailurik gabe"},ts={local:"Lokala",cloud:"Cloud",connectGoogle:"Google Konektatu",calendarDriveSync:"Google Calendar eta Drive sinkronizatuta"},as={agenda:"Agenda",study:"Ikasketa / Berrikuspena",tasks:"Lanak",tutorBadge:"IA Tutorea"},ns={nextMilestone:"Hurrengo Mugarri Didaktikoa",inDays:"3 egun barru",recommendedToday:"⚡ Gomendatutako saioa: 45 min gaur",weeklyProgress:"Asteko Aurrerapena",blocksCompleted:"bloke osatuta",activeMethod:"Metodologia aktiboa",googleCalendar:"Google Calendar",syncedEvents:"Sinkronizatutako gertaerak zure kontuan",syncAll:"🔄 Dena sinkronizatu Calendar-ekin",syncing:"⏳ Sinkronizatzen...",title:"Asteko Ikasketa Plangintza",autonomousOrg:"Antolakuntza autonomoa",subtitle:"Banakatu ahalegina bloke laburretan epe luzerako barneratzea bermatzeko.",addBlock:"Ikasketa Blokea Gehitu",emptyTitle:"Ez dago programatutako ikasketa blokerik.",emptyDesc:'Sakatu "Ikasketa Blokea Gehitu" zure denbora antolatzen hasteko.',pendingSync:"Sync zain",synced:"Google Calendar",minRecommended:"minutu gomendatuta",modalTitle:"Ikasketa Blokea Gehitu",modalSubtitle:"Planifikatu mugarri bat ikasteko denbora antolatzeko.",fieldActivity:"Jardueraren izenburua",fieldSubject:"Ikasgaia",fieldType:"Mugarri Mota",fieldDate:"Data",fieldTime:"Hasiera Ordua",fieldNotes:"Oharrak edo helburu pertsonala",cancel:"Utzi",save:"Blokea Gorde",types:{study_session:"Ikasketa saioa (45 min)",exam:"Azterketa",assignment_due:"Lanaren entrega"},btnPromptPlanner:"Agenda Antolatzaile Prompt-a",tooltipPromptPlanner:"Ikusi Ataleko Prompt-a: Agendaren Antolatzailea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",modalPlannerTitle:"Prompt Egitura: Agenda Antolatzailea",modalPlannerSubtitle:"4 Zutabeko Egitura Propioa: Banaketa Homogeneoa, Lehentasuna eta Konpromiso Datak",modalCurricularSubtitle:"Departamentuko Curriculum Gidalerroa ({{grade}})"},rs={bannerTitle:"Ikaskuntza Sokratiko Aktiboaren Esparrua",bannerDesc:"IAk zure pentsamendua gidatzen du galdera gogoetatsuekin. Zure hazkunde intelektuala bermatzeko debekatuta dago soluzio automatikoak lortzea.",bannerBadge:"Tutore Kognitibo Aktiboa",bannerGraphDesc:"4 mailako grafo dinamikoa: Funtzionala • LOMLOE Arautzailea • Gai-oinarria • Aldakuntzako Jarduerak",btnPromptGraph:"Prompts Grafoa (4 Maila)",tooltipPromptGraph:"Ikusi Muntatutako Prompt Grafoa (4 Geruza)",activityVariationLabel:"Jarduera / Aldakuntza:",stepPrefix:"Urratsa",baselineConcepts:"Oinarrizko Lerroa: Menperatu Beharreko Kontzeptuak",btnRecallPrompt:"Recall Prompt-a",tooltipRecallPrompt:"Ikusi Ataleko Prompt-a: Active Recall Sortzailea",modalSocraticTitle:"Prompt Grafo Dinamikoa",modalSocraticSubtitle:"Testuinguruan kokatutako injekzioa: {{subject}} • {{topic}}",activeRecall:"Berreskuratze Aktiboa",flashcardTitle:"Autoebaluazio Txartela",flashcardSubtitle:"Azaldu zure hitzekin azalpena ikusi aurretik:",toggleHint:"👁️ Erakutsi / Ezkutatu Aztarna Azalgarria",reviewLater:"🔁 Berrikusi geroago",mastered:"✅ Menperatua",conceptsTitle:"Menperatu beharreko Kontzeptuak",consolidated:"Finkatua",toStrengthen:"Sendotzeko",chip1:"❓ Egin iezadazu galdera diagnostiko bat",chip2:"💡 Eman iezadazu aztarna gogoetatsu bat",chip3:"🎯 Bide onetik nabil?",inputPlaceholder:"Idatzi zure arrazoibidea edo zalantza... (Enter bidaltzeko)",send:"Bidali",safeMode:"🔒 Modu segurua: IAk zure ahalegina sustatzen du",openaiCompatible:"OpenAI inferentzia bateragarria",tutorRole:"Tutore Sokratikoa",userRole:"Zu",taskListTitle:"Ikasketa eta Errepaso Aktiboko Zereginak",taskListSubtitle:"Aukeratu zeregin bat tutore sokratikoarekin saio gidatua hasteko. Zeregin bakarra egon daiteke aktibo aldi berean.",btnStart:"Hasi",btnResume:"Jarraitu",btnPause:"Gelditu",statusPending:"Hasteke",statusActive:"Martxan",statusPaused:"Pausan",badgeActivities:"{{count}} jarduera",badgeConcepts:"{{count}} kontzeptu gako",interactionsCount:"{{count}} elkarrekintza",pedagogicalAnchor:"LOMLOE Oinarri Pedagogikoa",pauseNotice:"Pausan (saioa gordeta)",activeBadge:"Saio aktiboa",activeTaskNote:"Beste zeregin bat hastean, aurrekoa automatikoki pausatuko da.",noTasks:"Ez dago ikasketa zereginik ikasturte honetarako."},os={title:"Eskolako Lanak eta Proiektuak",driveIntegration:"Google Drive Integrazioa",subtitle:"Faseren araberako laguntzailea lan zorrotzak egiteko, zure egiletza eta ideia propioak bermatuz.",btnPromptProject:"Lanak Prompt-a",tooltipPromptProject:"Ikusi Ataleko Prompt-a: Lanen Tutorea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",btnViewTaskPrompt:"Ikusi Lanaren Prompt-a",tooltipViewTaskPrompt:"Ikusi {{title}}-rako 4 Mailako Prompt Grafo zehatza",grade1esoBadge:"🟢 DBH 1 • Eragiketa Zehatzak",grade2batxBadge:"🟣 Batxilergo 2 • Eragiketa Formalak (PAU)",pedagogicalFoundation:"Oinarri Pedagogikoa (Piaget eta Guardrails):",modalProjectTitle:"Grafo Dinamikoa: Lanen eta Proiektuen Tutorea",modalProjectSubtitle:"4 Mailako Grafoa: 4 Faseko Metodologia eta Egiletzaren Auditoria",modalTaskPromptTitle:"Prompt Grafoa: {{title}}",modalTaskPromptSubtitle:"{{subject}}-rako 4 Mailako Testuinguratutako Injekzioa",newTask:"Lan Berria",emptyTitle:"Ez duzu lan aktiborik erregistratuta.",emptyDesc:'Sakatu "Lan Berria" entregagarri bat egituratzen hasteko.',dueDate:"Entregatzeko Data",autonomy:"Autonomia",phasesTitle:"Egite Faseak",phases:{planning:"1. Plangintza",research:"2. Ikerketa",writing:"3. Idazketa Propioa",review:"4. Azken Berrikuspena"},driveDocs:"Dokumentuak Google Driven",attachDrive:"＋ Fitxategia Lotu",noDriveFiles:"Oraindik ez dago Driveren fitxategirik lotuta.",driveSync:"Drive Sync",autonomyMeter:"Ikaslearen Autonomia Neurgailua",ownEffort:"propioa",modalTitle:"Lan Berria edo Entregagarria",modalSubtitle:"Sortu fitxa bat zure ikerketa eta dokumentuak antolatzeko.",fieldTitle:"Proiektuaren / Lanaren Izenburua",fieldSubject:"Ikasgaia",fieldDue:"Entregatzeko Data",fieldNotes:"Deskribapena edo helburua",cancel:"Utzi",create:"Lana Sortu"},is={titleAssembled:"Prompt Muntaia ({{subject}})",subtitleAssembled:"Orkestrazio Dinamikoaren Grafoa • {{topic}}",badge4Layers:"4 Geruzako Grafo Dinamikoa",badgePrompt:"Prompt",badgeLayer:"Geruza",defaultSubtitle:"System Instruction",close:"Itxi",sourceLabel:"Jatorria:",footerGraph:"Geruzetako prompt-en grafoa: haluzinazioak saihesten ditu eta curriculum-zorroztasuna bermatzen du",footerAudit:"Metodologia pedagogikoa eta ikuskaritza gardena",tabs:{all:"Muntaia Osoa",level1:"N1: Funtzionala",level3:"N3: Arautzailea eta Etika",level2A:"N2.A: Gai-oinarria",level2B:"N2.B: Jarduera eta Aldakuntza"}},ss={title:"IA Ereduaren Konfigurazioa",subtitle:"Inferentzia lokala edo hodeian OpenAI API estandarrarekin",inferenceType:"Inferentzia Mota",localTitle:"Lokala (Pribatutasun Osoa)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"API Endpoint URL",endpointHint:"Bateragarria /v1/chat/completions eta /v1/models-ekin",modelName:"Ereduaren Izena",apiKey:"API Gakoa (Aukerakoa Lokalean)",apiKeyHint:"Segurtasunez gordeta zure arakatzailean bakarrik (IndexedDB lokala).",socraticMode:"Modu Pedagogiko Sokratikoa",strictHigh:"Zorrotza: Ez du inoiz soluzio zuzenik ematen (100% arrazoitzeko galderak)",strictBalanced:"Orekatua: Tarteko aztarnak eta adibide antzekoak",strictExploratory:"Esploratzailea: Kontzeptu azalpenak eta erronkak",testConnection:"Konexioa Probatu",testing:"Probatzen...",cancel:"Utzi",save:"Aldaketak Gorde"},ls={title:"Google Kontua",subtitle:"OAuth 2.0 Konektoreak • Calendar & Drive",demoBadge:"Demo Modu Aktiboa",realBadge:"Benetako Google Kontua",authorizedResources:"Baimendutako baliabideak",calendarTitle:"Google Calendar",calendarDesc:"Ikasketa blokeen sinkronizazioa",driveTitle:"Google Drive",driveDesc:"Entregagaien dokumentuak lotzea",statusActive:"Aktiboa",statusReal:"Benetako Sinkronizazioa",statusDemo:"Simulazio Lokala",disconnect:"Saioa Itxi / Deskonektatu",modeSelectorTitle:"Aukeratu sarbide metodoa",demoOptionTitle:"Demo Modua (Ebaluaziorako gomendatua)",demoOptionDesc:"Arakatu plataforma osoa aurrez kargatutako datuekin kredentzialik sortu beharrik gabe.",demoButton:"Demo Modua Erabili",realOptionTitle:"Konektatu Benetako Google Kontua (OAuth 2.0)",realOptionDesc:"Sinkronizatu zure gertaerak Google Calendarrean eta lotu zure Google Driveko fitxategiak.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"adib. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Lortu Google Cloud Console > APIs eta Zerbitzuak > Kredentzialak > OAuth bezeroaren IDa.",realButton:"Hasi Saioa Google OAuth-ekin",connectExplanation:"Zure hezkuntza edo Google kontu pertsonala konektatzeak aukera ematen du:",benefit1:"Esportatu zure ikasketa saioak Google Calendarrera.",benefit2:"Erantsi zure oharrak eta zirriborroak Google Drivetik.",benefit3:"Bermatu zure datuak pribatuak eta zure kontrolpean geratzen direla."},cs={updateTitle:"Bertsio berria eskuragarri!",updateDesc:"Eguneratu azken hobekuntzak jasotzeko.",updateButton:"Eguneratu"},ds={app:es,nav:ts,tabs:as,agenda:ns,study:rs,tasks:os,promptModal:is,aiModal:ss,authModal:ls,pwa:cs},us={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense paranys d'IA"},ps={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},ms={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},fs={nextMilestone:"Pròxima Fita Lectiva",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min hui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribuïx l'esforç en blocs curts per a garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem en "Afegir Bloc d'Estudi" per a començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per a organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Guardar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},gs={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtindre solucions automàtiques per a garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teues paraules abans de vore l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig per bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per a enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per a iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a este curs."},bs={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per a elaborar treballs rigorosos garantint la teua autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem en "Nou Treball" per a començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents en Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per a organitzar la teua investigació i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},hs={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},vs={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privacitat Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicament en el teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Guardar Canvis"},ys={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconseguix-lo en Google Cloud Console > APIs i Servicis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teues sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teues dades romanguen privades i sota el teu control."},xs={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per a rebre les últimes millores.",updateButton:"Actualitzar"},_s={app:us,nav:ps,tabs:ms,agenda:fs,study:gs,tasks:bs,promptModal:hs,aiModal:vs,authModal:ys,pwa:xs},_r="anaxagoras_lang";class Cs{constructor(){$e(this,"initialized",!1);$e(this,"listeners",[])}async init(){if(this.initialized)return;const a=localStorage.getItem(_r)||"es";await je.init({lng:a,fallbackLng:"es",debug:!1,resources:{es:{translation:$i},ca:{translation:Fi},ga:{translation:Zi},eu:{translation:ds},va:{translation:_s}},interpolation:{escapeValue:!1}}),this.initialized=!0}t(a,r){return je.t(a,r)}async changeLanguage(a){await je.changeLanguage(a),localStorage.setItem(_r,a);for(const r of this.listeners)r(a)}getCurrentLanguage(){return je.language||"es"}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}}const Zt=new Cs,E=(p,a)=>Zt.t(p,a);class ws{constructor(){$e(this,"registration",null);$e(this,"updateWaiting",!1)}hasUpdateWaiting(){return this.updateWaiting}async register(a){if(!("serviceWorker"in navigator)){console.log("[PWA] Service Worker no soportado en este navegador.");return}try{const i=await navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"});this.registration=i,i.waiting&&(this.updateWaiting=!0,this.notifyUpdate(a)),i.addEventListener("updatefound",()=>{const c=i.installing;c&&c.addEventListener("statechange",()=>{c.state==="installed"&&navigator.serviceWorker.controller&&(this.updateWaiting=!0,this.notifyUpdate(a))})});let s=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{s||(s=!0,window.location.reload())}),i.update().catch(()=>{}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&i.update().catch(()=>{})}),window.addEventListener("focus",()=>{i.update().catch(()=>{})}),window.addEventListener("online",()=>{i.update().catch(()=>{})}),setInterval(()=>{i.update().catch(()=>{})},1e3*60*5)}catch(r){console.warn("[PWA] Error registrando Service Worker:",r)}}notifyUpdate(a){a!=null&&a.onUpdateAvailable?a.onUpdateAvailable(()=>this.applyUpdate()):this.showDefaultUpdateToast()}applyUpdate(){this.registration&&this.registration.waiting?this.registration.waiting.postMessage({type:"SKIP_WAITING"}):window.location.reload()}async checkForUpdates(a=!1){if(!this.registration){a&&alert("El servicio de actualización no está activo en este navegador.");return}let r=null;a&&(r=document.createElement("div"),r.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse",r.innerHTML="<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>",document.body.appendChild(r));try{await this.registration.update();const i=await fetch(`./version.json?t=${Date.now()}`,{cache:"no-store"});if(i.ok){const s=await i.json();console.log("[PWA] Versión desplegada en servidor:",s)}if(a)if(await new Promise(s=>setTimeout(s,900)),r==null||r.remove(),this.updateWaiting)this.showDefaultUpdateToast();else{const s=document.createElement("div");s.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2",s.innerHTML="<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>",document.body.appendChild(s),setTimeout(()=>s.remove(),3500)}}catch{r==null||r.remove(),a&&alert("No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.")}}async forceHardReset(){try{const a=await navigator.serviceWorker.getRegistrations();for(const i of a)await i.unregister();const r=await caches.keys();for(const i of r)await caches.delete(i)}catch(a){console.warn("[PWA] Error en hard reset:",a)}window.location.reload()}showDefaultUpdateToast(){var r,i;if(document.getElementById("pwa-update-toast"))return;const a=document.createElement("div");a.id="pwa-update-toast",a.className="fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md",a.innerHTML=`
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
    `,document.body.appendChild(a),(r=a.querySelector("#btn-pwa-apply"))==null||r.addEventListener("click",()=>{this.applyUpdate()}),(i=a.querySelector("#btn-pwa-dismiss"))==null||i.addEventListener("click",()=>{a.remove()})}}const Cn=new ws;var Ps=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ss(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var Ta={exports:{}},As=Ta.exports,Cr;function Es(){return Cr||(Cr=1,(function(p,a){((r,i)=>{p.exports=i()})(As,function(){var r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(n,o){n.__proto__=o}:function(n,o){for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(n[l]=o[l])}))(e,t)},i=function(){return(i=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};function s(e,t,n){for(var o,l=0,d=t.length;l<d;l++)!o&&l in t||((o=o||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(o||Array.prototype.slice.call(t))}var c=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Ps,u=Object.keys,f=Array.isArray;function b(e,t){return typeof t=="object"&&u(t).forEach(function(n){e[n]=t[n]}),e}typeof Promise>"u"||c.Promise||(c.Promise=Promise);var h=Object.getPrototypeOf,C={}.hasOwnProperty;function T(e,t){return C.call(e,t)}function I(e,t){typeof t=="function"&&(t=t(h(e))),(typeof Reflect>"u"?u:Reflect.ownKeys)(t).forEach(function(n){L(e,n,t[n])})}var K=Object.defineProperty;function L(e,t,n,o){K(e,t,b(n&&T(n,"get")&&typeof n.get=="function"?{get:n.get,set:n.set,configurable:!0}:{value:n,configurable:!0,writable:!0},o))}function X(e){return{from:function(t){return e.prototype=Object.create(t.prototype),L(e.prototype,"constructor",e),{extend:I.bind(null,e.prototype)}}}}var $=Object.getOwnPropertyDescriptor,V=[].slice;function U(e,t,n){return V.call(e,t,n)}function ie(e,t){return t(e)}function R(e){if(!e)throw new Error("Assertion Failed")}function M(e){c.setImmediate?setImmediate(e):setTimeout(e,0)}function z(e,t){if(typeof t=="string"&&T(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var n=[],o=0,l=t.length;o<l;++o){var d=z(e,t[o]);n.push(d)}return n}var m,g=t.indexOf(".");return g===-1||(m=e[t.substr(0,g)])==null?void 0:z(m,t.substr(g+1))}function Q(e,t,n){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){R(typeof n!="string"&&"length"in n);for(var o=0,l=t.length;o<l;++o)Q(e,t[o],n[o])}else{var d=t.indexOf(".");if(d!==-1){var m=t.substr(0,d),d=t.substr(d+1);if(d==="")n===void 0?f(e)&&!isNaN(parseInt(m))?e.splice(m,1):delete e[m]:e[m]=n;else{var g=e[m];if(!g||!T(e,m)){if(n===void 0)return;g=e[m]={}}Q(g,d,n)}}else n===void 0?f(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n}}function Z(e){var t,n={};for(t in e)T(e,t)&&(n[t]=e[t]);return n}var W=[].concat;function J(e){return W.apply([],e)}var ke="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(J([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return c[e]}),ge=new Set(ke.map(function(e){return c[e]})),se=null;function re(e){return se=new WeakMap,e=(function t(n){if(!n||typeof n!="object")return n;var o=se.get(n);if(o)return o;if(f(n)){o=[],se.set(n,o);for(var l=0,d=n.length;l<d;++l)o.push(t(n[l]))}else if(ge.has(n.constructor))o=n;else{var m,g=h(n);for(m in o=g===Object.prototype?{}:Object.create(g),se.set(n,o),n)T(n,m)&&(o[m]=t(n[m]))}return o})(e),se=null,e}var ve={}.toString;function ae(e){return ve.call(e).slice(8,-1)}var fe=typeof Symbol<"u"?Symbol.iterator:"@@iterator",ue=typeof fe=="symbol"?function(e){var t;return e!=null&&(t=e[fe])&&t.apply(e)}:function(){return null};function we(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var Ee={};function xe(e){var t,n,o,l;if(arguments.length===1){if(f(e))return e.slice();if(this===Ee&&typeof e=="string")return[e];if(l=ue(e))for(n=[];!(o=l.next()).done;)n.push(o.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(n=new Array(t);t--;)n[t]=e[t]}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var Se=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},ke=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],Fe=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(ke),He={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function ze(e,t){this.name=e,this.message=t}function at(e,t){return e+". Errors: "+Object.keys(t).map(function(n){return t[n].toString()}).filter(function(n,o,l){return l.indexOf(n)===o}).join(`
`)}function ea(e,t,n,o){this.failures=t,this.failedKeys=o,this.successCount=n,this.message=at(e,t)}function xt(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(n){return t[n]}),this.failuresByPos=t,this.message=at(e,this.failures)}X(ze).from(Error).extend({toString:function(){return this.name+": "+this.message}}),X(ea).from(ze),X(xt).from(ze);var ja=Fe.reduce(function(e,t){return e[t]=t+"Error",e},{}),wo=ze,oe=Fe.reduce(function(e,t){var n=t+"Error";function o(l,d){this.name=n,l?typeof l=="string"?(this.message="".concat(l).concat(d?`
 `+d:""),this.inner=d||null):typeof l=="object"&&(this.message="".concat(l.name," ").concat(l.message),this.inner=l):(this.message=He[t]||n,this.inner=null)}return X(o).from(wo),e[t]=o,e},{}),An=(oe.Syntax=SyntaxError,oe.Type=TypeError,oe.Range=RangeError,ke.reduce(function(e,t){return e[t+"Error"]=oe[t],e},{}));ke=Fe.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=oe[t]),e},{});function _e(){}function Ot(e){return e}function Po(e,t){return e==null||e===Ot?t:function(n){return t(e(n))}}function ct(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function So(e,t){return e===_e?t:function(){var n=e.apply(this,arguments),o=(n!==void 0&&(arguments[0]=n),this.onsuccess),l=this.onerror,d=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return o&&(this.onsuccess=this.onsuccess?ct(o,this.onsuccess):o),l&&(this.onerror=this.onerror?ct(l,this.onerror):l),d!==void 0?d:n}}function Ao(e,t){return e===_e?t:function(){e.apply(this,arguments);var n=this.onsuccess,o=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),n&&(this.onsuccess=this.onsuccess?ct(n,this.onsuccess):n),o&&(this.onerror=this.onerror?ct(o,this.onerror):o)}}function Eo(e,t){return e===_e?t:function(){var n=e.apply(this,arguments),o=(b(arguments[0],n),this.onsuccess),l=this.onerror,d=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return o&&(this.onsuccess=this.onsuccess?ct(o,this.onsuccess):o),l&&(this.onerror=this.onerror?ct(l,this.onerror):l),n===void 0?d===void 0?void 0:d:b(n,d)}}function ko(e,t){return e===_e?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function Ma(e,t){return e===_e?t:function(){var n=e.apply(this,arguments);if(n&&typeof n.then=="function"){for(var o=this,l=arguments.length,d=new Array(l);l--;)d[l]=arguments[l];return n.then(function(){return t.apply(o,d)})}return t.apply(this,arguments)}}ke.ModifyError=ea,ke.DexieError=ze,ke.BulkError=xt;var We=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function En(e){We=e}var It={},kn=100,Lt=typeof Promise>"u"?[]:(Fe=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Lt=crypto.subtle.digest("SHA-512",new Uint8Array([0])),h(Lt),Fe]:[Fe,h(Fe),Fe]),Fe=Lt[0],Et=Lt[1],Et=Et&&Et.then,dt=Fe&&Fe.constructor,Ra=!!Lt[2],jt=function(e,t){Mt.push([e,t]),ta&&(queueMicrotask(Do),ta=!1)},Ba=!0,ta=!0,ut=[],aa=[],qa=Ot,Je={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:_e,pgp:!1,env:{},finalize:_e},ne=Je,Mt=[],pt=0,na=[];function Y(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=ne;if(typeof e!="function"){if(e!==It)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&za(this,this._value)}else this._state=null,this._value=null,++t.ref,(function n(o,l){try{l(function(d){if(o._state===null){if(d===o)throw new TypeError("A promise cannot be resolved with itself.");var m=o._lib&&_t();d&&typeof d.then=="function"?n(o,function(g,y){d instanceof Y?d._then(g,y):d.then(g,y)}):(o._state=!0,o._value=d,Dn(o)),m&&Ct()}},za.bind(null,o))}catch(d){za(o,d)}})(this,e)}var Na={get:function(){var e=ne,t=sa;function n(o,l){var d=this,m=!e.global&&(e!==ne||t!==sa),g=m&&!rt(),y=new Y(function(k,_){Fa(d,new Tn(On(o,e,m,g),On(l,e,m,g),k,_,e))});return this._consoleTask&&(y._consoleTask=this._consoleTask),y}return n.prototype=It,n},set:function(e){L(this,"then",e&&e.prototype===It?Na:{get:function(){return e},set:Na.set})}};function Tn(e,t,n,o,l){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=n,this.reject=o,this.psd=l}function za(e,t){var n,o;aa.push(t),e._state===null&&(n=e._lib&&_t(),t=qa(t),e._state=!1,e._value=t,o=e,ut.some(function(l){return l._value===o._value})||ut.push(o),Dn(e),n)&&Ct()}function Dn(e){var t=e._listeners;e._listeners=[];for(var n=0,o=t.length;n<o;++n)Fa(e,t[n]);var l=e._PSD;--l.ref||l.finalize(),pt===0&&(++pt,jt(function(){--pt==0&&Ka()},[]))}function Fa(e,t){if(e._state===null)e._listeners.push(t);else{var n=e._state?t.onFulfilled:t.onRejected;if(n===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++pt,jt(To,[n,e,t])}}function To(e,t,n){try{var o,l=t._value;!t._state&&aa.length&&(aa=[]),o=We&&t._consoleTask?t._consoleTask.run(function(){return e(l)}):e(l),t._state||aa.indexOf(l)!==-1||(d=>{for(var m=ut.length;m;)if(ut[--m]._value===d._value)return ut.splice(m,1)})(t),n.resolve(o)}catch(d){n.reject(d)}finally{--pt==0&&Ka(),--n.psd.ref||n.psd.finalize()}}function Do(){mt(Je,function(){_t()&&Ct()})}function _t(){var e=Ba;return ta=Ba=!1,e}function Ct(){var e,t,n;do for(;0<Mt.length;)for(e=Mt,Mt=[],n=e.length,t=0;t<n;++t){var o=e[t];o[0].apply(null,o[1])}while(0<Mt.length);ta=Ba=!0}function Ka(){for(var e=ut,t=(ut=[],e.forEach(function(o){o._PSD.onunhandled.call(null,o._value,o)}),na.slice(0)),n=t.length;n;)t[--n]()}function ra(e){return new Y(It,!1,e)}function Ae(e,t){var n=ne;return function(){var o=_t(),l=ne;try{return ot(n,!0),e.apply(this,arguments)}catch(d){t&&t(d)}finally{ot(l,!1),o&&Ct()}}}I(Y.prototype,{then:Na,_then:function(e,t){Fa(this,new Tn(null,null,e,t,ne))},catch:function(e){var t,n;return arguments.length===1?this.then(null,e):(t=e,n=arguments[1],typeof t=="function"?this.then(null,function(o){return(o instanceof t?n:ra)(o)}):this.then(null,function(o){return(o&&o.name===t?n:ra)(o)}))},finally:function(e){return this.then(function(t){return Y.resolve(e()).then(function(){return t})},function(t){return Y.resolve(e()).then(function(){return ra(t)})})},timeout:function(e,t){var n=this;return e<1/0?new Y(function(o,l){var d=setTimeout(function(){return l(new oe.Timeout(t))},e);n.then(o,l).finally(clearTimeout.bind(null,d))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&L(Y.prototype,Symbol.toStringTag,"Dexie.Promise"),Je.env=$n(),I(Y,{all:function(){var e=xe.apply(null,arguments).map(la);return new Y(function(t,n){e.length===0&&t([]);var o=e.length;e.forEach(function(l,d){return Y.resolve(l).then(function(m){e[d]=m,--o||t(e)},n)})})},resolve:function(e){return e instanceof Y?e:e&&typeof e.then=="function"?new Y(function(t,n){e.then(t,n)}):new Y(It,!0,e)},reject:ra,race:function(){var e=xe.apply(null,arguments).map(la);return new Y(function(t,n){e.map(function(o){return Y.resolve(o).then(t,n)})})},PSD:{get:function(){return ne},set:function(e){return ne=e}},totalEchoes:{get:function(){return sa}},newPSD:nt,usePSD:mt,scheduler:{get:function(){return jt},set:function(e){jt=e}},rejectionMapper:{get:function(){return qa},set:function(e){qa=e}},follow:function(e,t){return new Y(function(n,o){return nt(function(l,d){var m=ne;m.unhandleds=[],m.onunhandled=d,m.finalize=ct(function(){var g,y=this;g=function(){y.unhandleds.length===0?l():d(y.unhandleds[0])},na.push(function k(){g(),na.splice(na.indexOf(k),1)}),++pt,jt(function(){--pt==0&&Ka()},[])},m.finalize),e()},t,n,o)})}}),dt&&(dt.allSettled&&L(Y,"allSettled",function(){var e=xe.apply(null,arguments).map(la);return new Y(function(t){e.length===0&&t([]);var n=e.length,o=new Array(n);e.forEach(function(l,d){return Y.resolve(l).then(function(m){return o[d]={status:"fulfilled",value:m}},function(m){return o[d]={status:"rejected",reason:m}}).then(function(){return--n||t(o)})})})}),dt.any&&typeof AggregateError<"u"&&L(Y,"any",function(){var e=xe.apply(null,arguments).map(la);return new Y(function(t,n){e.length===0&&n(new AggregateError([]));var o=e.length,l=new Array(o);e.forEach(function(d,m){return Y.resolve(d).then(function(g){return t(g)},function(g){l[m]=g,--o||n(new AggregateError(l))})})})}),dt.withResolvers)&&(Y.withResolvers=dt.withResolvers);var Oe={awaits:0,echoes:0,id:0},$o=0,oa=[],ia=0,sa=0,Oo=0;function nt(e,m,n,o){var l=ne,d=Object.create(l),m=(d.parent=l,d.ref=0,d.global=!1,d.id=++Oo,Je.env,d.env=Ra?{Promise:Y,PromiseProp:{value:Y,configurable:!0,writable:!0},all:Y.all,race:Y.race,allSettled:Y.allSettled,any:Y.any,resolve:Y.resolve,reject:Y.reject}:{},m&&b(d,m),++l.ref,d.finalize=function(){--this.parent.ref||this.parent.finalize()},mt(d,e,n,o));return d.ref===0&&d.finalize(),m}function wt(){return Oe.id||(Oe.id=++$o),++Oe.awaits,Oe.echoes+=kn,Oe.id}function rt(){return!!Oe.awaits&&(--Oe.awaits==0&&(Oe.id=0),Oe.echoes=Oe.awaits*kn,!0)}function la(e){return Oe.echoes&&e&&e.constructor===dt?(wt(),e.then(function(t){return rt(),t},function(t){return rt(),Te(t)})):e}function Io(){var e=oa[oa.length-1];oa.pop(),ot(e,!1)}function ot(e,t){var n,o,l=ne;(t?!Oe.echoes||ia++&&e===ne:!ia||--ia&&e===ne)||queueMicrotask(t?(function(d){++sa,Oe.echoes&&--Oe.echoes!=0||(Oe.echoes=Oe.awaits=Oe.id=0),oa.push(ne),ot(d,!0)}).bind(null,e):Io),e!==ne&&(ne=e,l===Je&&(Je.env=$n()),Ra)&&(n=Je.env.Promise,o=e.env,l.global||e.global)&&(Object.defineProperty(c,"Promise",o.PromiseProp),n.all=o.all,n.race=o.race,n.resolve=o.resolve,n.reject=o.reject,o.allSettled&&(n.allSettled=o.allSettled),o.any)&&(n.any=o.any)}function $n(){var e=c.Promise;return Ra?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(c,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function mt(e,t,n,o,l){var d=ne;try{return ot(e,!0),t(n,o,l)}finally{ot(d,!1)}}function On(e,t,n,o){return typeof e!="function"?e:function(){var l=ne;n&&wt(),ot(t,!0);try{return e.apply(this,arguments)}finally{ot(l,!1),o&&queueMicrotask(rt)}}}function Ga(e){Promise===dt&&Oe.echoes===0?ia===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+Et).indexOf("[native code]")===-1&&(wt=rt=_e);var Te=Y.reject,ft="￿",Xe="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",In="String expected.",ca="__dbnames",Va="readonly",Ha="readwrite";function gt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var Ln={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function da(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=re(t))[e],t}}function jn(){throw oe.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function he(e,t){try{var n=Mn(e),o=Mn(t);if(n!==o)return n==="Array"?1:o==="Array"?-1:n==="binary"?1:o==="binary"?-1:n==="string"?1:o==="string"?-1:n==="Date"?1:o!=="Date"?NaN:-1;switch(n){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var l=Rn(e),d=Rn(t),m=l.length,g=d.length,y=m<g?m:g,k=0;k<y;++k)if(l[k]!==d[k])return l[k]<d[k]?-1:1;return m===g?0:m<g?-1:1;case"Array":for(var _=e,v=t,x=_.length,A=v.length,P=x<A?x:A,w=0;w<P;++w){var S=he(_[w],v[w]);if(S!==0)return S}return x===A?0:x<A?-1:1}}catch{}return NaN}function Mn(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=ae(e))==="ArrayBuffer")?"binary":t}function Rn(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function ua(e,t,n){var o=e.schema.yProps;return o?(t&&0<n.numFailures&&(t=t.filter(function(l,d){return!n.failures[d]})),Promise.all(o.map(function(l){return l=l.updatesTable,t?e.db.table(l).where("k").anyOf(t).delete():e.db.table(l).clear()})).then(function(){return n})):n}Bn.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var n=t.add;if(f(n))return s(s([],f(e)?e:[],!0),n).sort();if(typeof n=="number")return(Number(e)||0)+n;if(typeof n=="bigint")try{return BigInt(e)+n}catch{return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(t.remove!==void 0){var o=t.remove;if(f(o))return f(e)?e.filter(function(l){return!o.includes(l)}).sort():[];if(typeof o=="number")return Number(e)-o;if(typeof o=="bigint")try{return BigInt(e)-o}catch{return BigInt(0)-o}throw new TypeError("Invalid subtrahend ".concat(o))}return n=(n=t.replacePrefix)==null?void 0:n[0],n&&typeof e=="string"&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var Rt=Bn;function Bn(e){this["@@propmod"]=e}function qn(e,t){for(var n=u(t),o=n.length,l=!1,d=0;d<o;++d){var m=n[d],g=t[m],y=z(e,m);g instanceof Rt?(Q(e,m,g.execute(y)),l=!0):y!==g&&(Q(e,m,g),l=!0)}return l}Pe.prototype._trans=function(e,t,n){var o=this._tx||ne.trans,l=this.name,d=We&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function m(k,_,v){if(v.schema[l])return t(v.idbtrans,v);throw new oe.NotFound("Table "+l+" not part of transaction")}var g=_t();try{var y=o&&o.db._novip===this.db._novip?o===ne.trans?o._promise(e,m,n):nt(function(){return o._promise(e,m,n)},{trans:o,transless:ne.transless||ne}):(function k(_,v,x,A){if(_.idbdb&&(_._state.openComplete||ne.letThrough||_._vip)){var P=_._createTransaction(v,x,_._dbSchema);try{P.create(),_._state.PR1398_maxLoop=3}catch(w){return w.name===ja.InvalidState&&_.isOpen()&&0<--_._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),_.close({disableAutoOpen:!1}),_.open().then(function(){return k(_,v,x,A)})):Te(w)}return P._promise(v,function(w,S){return nt(function(){return ne.trans=P,A(w,S,P)})}).then(function(w){if(v==="readwrite")try{P.idbtrans.commit()}catch{}return v==="readonly"?w:P._completion.then(function(){return w})})}if(_._state.openComplete)return Te(new oe.DatabaseClosed(_._state.dbOpenError));if(!_._state.isBeingOpened){if(!_._state.autoOpen)return Te(new oe.DatabaseClosed);_.open().catch(_e)}return _._state.dbReadyPromise.then(function(){return k(_,v,x,A)})})(this.db,e,[this.name],m);return d&&(y._consoleTask=d,y=y.catch(function(k){return console.trace(k),Te(k)})),y}finally{g&&Ct()}},Pe.prototype.get=function(e,t){var n=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?Te(new oe.Type("Invalid argument to Table.get()")):this._trans("readonly",function(o){return n.core.get({trans:o,key:e}).then(function(l){return n.hook.reading.fire(l)})}).then(t)},Pe.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(f(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=u(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var n=this.schema.indexes.concat(this.schema.primKey).filter(function(g){if(g.compound&&t.every(function(k){return 0<=g.keyPath.indexOf(k)})){for(var y=0;y<t.length;++y)if(t.indexOf(g.keyPath[y])===-1)return!1;return!0}return!1}).sort(function(g,y){return g.keyPath.length-y.keyPath.length})[0];if(n&&this.db._maxKey!==ft)return m=n.keyPath.slice(0,t.length),this.where(m).equals(m.map(function(g){return e[g]}));!n&&We&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var o=this.schema.idxByName;function l(g,y){return he(g,y)===0}var m=t.reduce(function(_,y){var k=_[0],_=_[1],v=o[y],x=e[y];return[k||v,k||!v?gt(_,v&&v.multi?function(A){return A=z(A,y),f(A)&&A.some(function(P){return l(x,P)})}:function(A){return l(x,z(A,y))}):_]},[null,null]),d=m[0],m=m[1];return d?this.where(d.name).equals(e[d.keyPath]).filter(m):n?this.filter(m):this.where(t).equals("")},Pe.prototype.filter=function(e){return this.toCollection().and(e)},Pe.prototype.count=function(e){return this.toCollection().count(e)},Pe.prototype.offset=function(e){return this.toCollection().offset(e)},Pe.prototype.limit=function(e){return this.toCollection().limit(e)},Pe.prototype.each=function(e){return this.toCollection().each(e)},Pe.prototype.toArray=function(e){return this.toCollection().toArray(e)},Pe.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},Pe.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,f(e)?"[".concat(e.join("+"),"]"):e))},Pe.prototype.reverse=function(){return this.toCollection().reverse()},Pe.prototype.mapToClass=function(e){for(var t=this.db,n=this.name,o=((this.schema.mappedClass=e).prototype instanceof jn&&(e=(m=>{var g=_,y=m;if(typeof y!="function"&&y!==null)throw new TypeError("Class extends value "+String(y)+" is not a constructor or null");function k(){this.constructor=g}function _(){return m!==null&&m.apply(this,arguments)||this}return r(g,y),g.prototype=y===null?Object.create(y):(k.prototype=y.prototype,new k),Object.defineProperty(_.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),_.prototype.table=function(){return n},_})(e)),new Set),l=e.prototype;l;l=h(l))Object.getOwnPropertyNames(l).forEach(function(m){return o.add(m)});function d(m){if(!m)return m;var g,y=Object.create(e.prototype);for(g in m)if(!o.has(g))try{y[g]=m[g]}catch{}return y}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=d,this.hook("reading",d),e},Pe.prototype.defineClass=function(){return this.mapToClass(function(e){b(this,e)})},Pe.prototype.add=function(e,t){var n=this,o=this.schema.primKey,l=o.auto,d=o.keyPath,m=e;return d&&l&&(m=da(d)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"add",keys:t!=null?[t]:null,values:[m]})}).then(function(g){return g.numFailures?Y.reject(g.failures[0]):g.lastResult}).then(function(g){if(d)try{Q(e,d,g)}catch{}return g})},Pe.prototype.upsert=function(e,t){var n=this,o=this.schema.primKey.keyPath;return this._trans("readwrite",function(l){return n.core.get({trans:l,key:e}).then(function(d){var m=d??{};return qn(m,t),o&&Q(m,o,e),n.core.mutate({trans:l,type:"put",values:[m],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(g){return g.numFailures?Y.reject(g.failures[0]):!!d})})})},Pe.prototype.update=function(e,t){return typeof e!="object"||f(e)?this.where(":id").equals(e).modify(t):(e=z(e,this.schema.primKey.keyPath))===void 0?Te(new oe.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},Pe.prototype.put=function(e,t){var n=this,o=this.schema.primKey,l=o.auto,d=o.keyPath,m=e;return d&&l&&(m=da(d)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"put",values:[m],keys:t!=null?[t]:null})}).then(function(g){return g.numFailures?Y.reject(g.failures[0]):g.lastResult}).then(function(g){if(d)try{Q(e,d,g)}catch{}return g})},Pe.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(n){return t.core.mutate({trans:n,type:"delete",keys:[e]}).then(function(o){return ua(t,[e],o)}).then(function(o){return o.numFailures?Y.reject(o.failures[0]):void 0})})},Pe.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:Ln}).then(function(n){return ua(e,null,n)})}).then(function(t){return t.numFailures?Y.reject(t.failures[0]):void 0})},Pe.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(n){return t.core.getMany({keys:e,trans:n}).then(function(o){return o.map(function(l){return t.hook.reading.fire(l)})})})},Pe.prototype.bulkAdd=function(e,t,n){var o=this,l=Array.isArray(t)?t:void 0,d=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(m){var g=o.schema.primKey,k=g.auto,g=g.keyPath;if(g&&l)throw new oe.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new oe.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,k=g&&k?e.map(da(g)):e;return o.core.mutate({trans:m,type:"add",keys:l,values:k,wantResults:d}).then(function(_){var v=_.numFailures,x=_.failures;if(v===0)return d?_.results:_.lastResult;throw new xt("".concat(o.name,".bulkAdd(): ").concat(v," of ").concat(y," operations failed"),x)})})},Pe.prototype.bulkPut=function(e,t,n){var o=this,l=Array.isArray(t)?t:void 0,d=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(m){var g=o.schema.primKey,k=g.auto,g=g.keyPath;if(g&&l)throw new oe.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new oe.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,k=g&&k?e.map(da(g)):e;return o.core.mutate({trans:m,type:"put",keys:l,values:k,wantResults:d}).then(function(_){var v=_.numFailures,x=_.failures;if(v===0)return d?_.results:_.lastResult;throw new xt("".concat(o.name,".bulkPut(): ").concat(v," of ").concat(y," operations failed"),x)})})},Pe.prototype.bulkUpdate=function(e){var t=this,n=this.core,o=e.map(function(m){return m.key}),l=e.map(function(m){return m.changes}),d=[];return this._trans("readwrite",function(m){return n.getMany({trans:m,keys:o,cache:"clone"}).then(function(g){var y=[],k=[],_=(e.forEach(function(v,x){var A=v.key,P=v.changes,w=g[x];if(w){for(var S=0,O=Object.keys(P);S<O.length;S++){var D=O[S],j=P[D];if(D===t.schema.primKey.keyPath){if(he(j,A)!==0)throw new oe.Constraint("Cannot update primary key in bulkUpdate()")}else Q(w,D,j)}d.push(x),y.push(A),k.push(w)}}),y.length);return n.mutate({trans:m,type:"put",keys:y,values:k,updates:{keys:o,changeSpecs:l}}).then(function(v){var x=v.numFailures,A=v.failures;if(x===0)return _;for(var P=0,w=Object.keys(A);P<w.length;P++){var S,O=w[P],D=d[Number(O)];D!=null&&(S=A[O],delete A[O],A[D]=S)}throw new xt("".concat(t.name,".bulkUpdate(): ").concat(x," of ").concat(_," operations failed"),A)})})})},Pe.prototype.bulkDelete=function(e){var t=this,n=e.length;return this._trans("readwrite",function(o){return t.core.mutate({trans:o,type:"delete",keys:e}).then(function(l){return ua(t,e,l)})}).then(function(o){var l=o.numFailures,d=o.failures;if(l===0)return o.lastResult;throw new xt("".concat(t.name,".bulkDelete(): ").concat(l," of ").concat(n," operations failed"),d)})};var Nn=Pe;function Pe(){}function Bt(e){function t(m,g){if(g){for(var y=arguments.length,k=new Array(y-1);--y;)k[y-1]=arguments[y];return n[m].subscribe.apply(null,k),e}if(typeof m=="string")return n[m]}var n={};t.addEventType=d;for(var o=1,l=arguments.length;o<l;++o)d(arguments[o]);return t;function d(m,g,y){var k,_;if(typeof m!="object")return g=g||ko,_={subscribers:[],fire:y=y||_e,subscribe:function(v){_.subscribers.indexOf(v)===-1&&(_.subscribers.push(v),_.fire=g(_.fire,v))},unsubscribe:function(v){_.subscribers=_.subscribers.filter(function(x){return x!==v}),_.fire=_.subscribers.reduce(g,y)}},n[m]=t[m]=_;u(k=m).forEach(function(v){var x=k[v];if(f(x))d(v,k[v][0],k[v][1]);else{if(x!=="asap")throw new oe.InvalidArgument("Invalid event config");var A=d(v,Ot,function(){for(var P=arguments.length,w=new Array(P);P--;)w[P]=arguments[P];A.subscribers.forEach(function(S){M(function(){S.apply(null,w)})})})}})}}function qt(e,t){return X(t).from({prototype:e}),t}function Pt(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Ua(e,t){e.filter=gt(e.filter,t)}function Wa(e,t,n){var o=e.replayFilter;e.replayFilter=o?function(){return gt(o(),t())}:t,e.justLimit=n&&!o}function pa(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new oe.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function zn(e,t,n){var o=pa(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:o,range:e.range}})}function ma(e,t,n,o){var l,d,m=e.replayFilter?gt(e.filter,e.replayFilter()):e.filter;return e.or?(l={},d=function(g,y,k){var _,v;m&&!m(y,k,function(x){return y.stop(x)},function(x){return y.fail(x)})||((v=""+(_=y.primaryKey))=="[object ArrayBuffer]"&&(v=""+new Uint8Array(_)),T(l,v))||(l[v]=!0,t(g,y,k))},Promise.all([e.or._iterate(d,n),Fn(zn(e,o,n),e.algorithm,d,!e.keysOnly&&e.valueMapper)])):Fn(zn(e,o,n),gt(e.algorithm,m),t,!e.keysOnly&&e.valueMapper)}function Fn(e,t,n,o){var l=Ae(o?function(d,m,g){return n(o(d),m,g)}:n);return e.then(function(d){if(d)return d.start(function(){var m=function(){return d.continue()};t&&!t(d,function(g){return m=g},function(g){d.stop(g),m=_e},function(g){d.fail(g),m=_e})||l(d.value,d,function(g){return m=g}),m()})})}ye.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,Te.bind(null,n.error)):n.table._trans("readonly",e).then(t)},ye.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,Te.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},ye.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=gt(t.algorithm,e)},ye.prototype._iterate=function(e,t){return ma(this._ctx,e,t,this._ctx.table.core)},ye.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&b(n,e),t._ctx=n,t},ye.prototype.raw=function(){return this._ctx.valueMapper=null,this},ye.prototype.each=function(e){var t=this._ctx;return this._read(function(n){return ma(t,e,n,t.table.core)})},ye.prototype.count=function(e){var t=this;return this._read(function(n){var o,l=t._ctx,d=l.table.core;return Pt(l,!0)?d.count({trans:n,query:{index:pa(l,d.schema),range:l.range}}).then(function(m){return Math.min(m,l.limit)}):(o=0,ma(l,function(){return++o,!1},n,d).then(function(){return o}))}).then(e)},ye.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),o=n[0],l=n.length-1;function d(y,k){return k?d(y[n[k]],k-1):y[o]}var m=this._ctx.dir==="next"?1:-1;function g(y,k){return he(d(y,l),d(k,l))*m}return this.toArray(function(y){return y.slice().sort(g)}).then(t)},ye.prototype.toArray=function(e){var t=this;return this._read(function(n){var o,l,d,m=t._ctx;return Pt(m,!0)&&0<m.limit?(o=m.valueMapper,l=pa(m,m.table.core.schema),m.table.core.query({trans:n,limit:m.limit,values:!0,direction:m.dir==="prev"?"prev":void 0,query:{index:l,range:m.range}}).then(function(g){return g=g.result,o?g.map(o):g})):(d=[],ma(m,function(g){return d.push(g)},n,m.table.core).then(function(){return d}))},e)},ye.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,Pt(t)?Wa(t,function(){var n=e;return function(o,l){return n===0||(n===1?--n:l(function(){o.advance(n),n=0}),!1)}}):Wa(t,function(){var n=e;return function(){return--n<0}})),this},ye.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Wa(this._ctx,function(){var t=e;return function(n,o,l){return--t<=0&&o(l),0<=t}},!0),this},ye.prototype.until=function(e,t){return Ua(this._ctx,function(n,o,l){return!e(n.value)||(o(l),t)}),this},ye.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},ye.prototype.last=function(e){return this.reverse().first(e)},ye.prototype.filter=function(e){var t;return Ua(this._ctx,function(n){return e(n.value)}),(t=this._ctx).isMatch=gt(t.isMatch,e),this},ye.prototype.and=function(e){return this.filter(e)},ye.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},ye.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},ye.prototype.desc=function(){return this.reverse()},ye.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,o){e(o.key,o)})},ye.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},ye.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,o){e(o.primaryKey,o)})},ye.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(o,l){n.push(l.key)}).then(function(){return n}).then(e)},ye.prototype.primaryKeys=function(e){var t=this._ctx;if(Pt(t,!0)&&0<t.limit)return this._read(function(o){var l=pa(t,t.table.core.schema);return t.table.core.query({trans:o,values:!1,limit:t.limit,direction:t.dir==="prev"?"prev":void 0,query:{index:l,range:t.range}})}).then(function(o){return o.result}).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(o,l){n.push(l.primaryKey)}).then(function(){return n}).then(e)},ye.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},ye.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},ye.prototype.lastKey=function(e){return this.reverse().firstKey(e)},ye.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Ua(this._ctx,function(o){var o=o.primaryKey.toString(),l=T(e,o);return e[o]=!0,!l})),this},ye.prototype.modify=function(e){var t=this,n=this._ctx;return this._write(function(o){function l(w,S){var O=S.failures;x+=w-S.numFailures;for(var D=0,j=u(O);D<j.length;D++){var B=j[D];v.push(O[B])}}var d=typeof e=="function"?e:function(w){return qn(w,e)},m=n.table.core,_=m.schema.primaryKey,g=_.outbound,y=_.extractKey,k=200,_=t.db._options.modifyChunkSize,v=(_&&(k=typeof _=="object"?_[m.name]||_["*"]||200:_),[]),x=0,A=[],P=e===Kn;return t.clone().primaryKeys().then(function(w){function S(D){var j=Math.min(k,w.length-D),B=w.slice(D,D+j);return(P?Promise.resolve([]):m.getMany({trans:o,keys:B,cache:"immutable"})).then(function(N){var H=[],F=[],ee=g?[]:null,G=P?B:[];if(!P)for(var te=0;te<j;++te){var q=N[te],ce={value:re(q),primKey:w[D+te]};d.call(ce,ce.value,ce)!==!1&&(ce.value==null?G.push(w[D+te]):g||he(y(q),y(ce.value))===0?(F.push(ce.value),g&&ee.push(w[D+te])):(G.push(w[D+te]),H.push(ce.value)))}return Promise.resolve(0<H.length&&m.mutate({trans:o,type:"add",values:H}).then(function(de){for(var me in de.failures)G.splice(parseInt(me),1);l(H.length,de)})).then(function(){return(0<F.length||O&&typeof e=="object")&&m.mutate({trans:o,type:"put",keys:ee,values:F,criteria:O,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<D}).then(function(de){return l(F.length,de)})}).then(function(){return(0<G.length||O&&P)&&m.mutate({trans:o,type:"delete",keys:G,criteria:O,isAdditionalChunk:0<D}).then(function(de){return ua(n.table,G,de)}).then(function(de){return l(G.length,de)})}).then(function(){return w.length>D+j&&S(D+k)})})}var O=Pt(n)&&n.limit===1/0&&(typeof e!="function"||P)&&{index:n.index,range:n.range};return S(0).then(function(){if(0<v.length)throw new ea("Error modifying one or more objects",v,x,A);return w.length})})})},ye.prototype.delete=function(){var e=this._ctx,t=e.range;return!Pt(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(Kn):this._write(function(n){var o=e.table.core.schema.primaryKey,l=t;return e.table.core.count({trans:n,query:{index:o,range:l}}).then(function(d){return e.table.core.mutate({trans:n,type:"deleteRange",range:l}).then(function(y){var g=y.failures,y=y.numFailures;if(y)throw new ea("Could not delete some values",Object.keys(g).map(function(k){return g[k]}),d-y);return d-y})})})};var Lo=ye;function ye(){}var Kn=function(e,t){return t.value=null};function jo(e,t){return e<t?-1:e===t?0:1}function Mo(e,t){return t<e?-1:e===t?0:1}function Ke(e,t,n){return e=e instanceof Vn?new e.Collection(e):e,e._ctx.error=new(n||TypeError)(t),e}function St(e){return new e.Collection(e,function(){return Gn("")}).limit(0)}function fa(A,t,n,o){var l,d,m,g,y,k,_,v=n.length;if(!n.every(function(w){return typeof w=="string"}))return Ke(A,In);function x(w){l=w==="next"?function(O){return O.toUpperCase()}:function(O){return O.toLowerCase()},d=w==="next"?function(O){return O.toLowerCase()}:function(O){return O.toUpperCase()},m=w==="next"?jo:Mo;var S=n.map(function(O){return{lower:d(O),upper:l(O)}}).sort(function(O,D){return m(O.lower,D.lower)});g=S.map(function(O){return O.upper}),y=S.map(function(O){return O.lower}),_=(k=w)==="next"?"":o}x("next");var A=new A.Collection(A,function(){return it(g[0],y[v-1]+o)}),P=(A._ondirectionchange=function(w){x(w)},0);return A._addAlgorithm(function(w,S,O){var D=w.key;if(typeof D=="string"){var j=d(D);if(t(j,y,P))return!0;for(var B=null,N=P;N<v;++N){var H=((F,ee,G,te,q,ce)=>{for(var de=Math.min(F.length,te.length),me=-1,be=0;be<de;++be){var Ge=ee[be];if(Ge!==te[be])return q(F[be],G[be])<0?F.substr(0,be)+G[be]+G.substr(be+1):q(F[be],te[be])<0?F.substr(0,be)+te[be]+G.substr(be+1):0<=me?F.substr(0,me)+ee[me]+G.substr(me+1):null;q(F[be],Ge)<0&&(me=be)}return de<te.length&&ce==="next"?F+G.substr(F.length):de<F.length&&ce==="prev"?F.substr(0,G.length):me<0?null:F.substr(0,me)+te[me]+G.substr(me+1)})(D,j,g[N],y[N],m,k);H===null&&B===null?P=N+1:(B===null||0<m(B,H))&&(B=H)}S(B!==null?function(){w.continue(B+_)}:O)}return!1}),A}function it(e,t,n,o){return{type:2,lower:e,upper:t,lowerOpen:n,upperOpen:o}}function Gn(e){return{type:1,lower:e,upper:e}}Object.defineProperty(Ie.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Ie.prototype.between=function(e,t,n,o){n=n!==!1,o=o===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(n||o)&&(!n||!o)?St(this):new this.Collection(this,function(){return it(e,t,!n,!o)})}catch{return Ke(this,Xe)}},Ie.prototype.equals=function(e){return e==null?Ke(this,Xe):new this.Collection(this,function(){return Gn(e)})},Ie.prototype.above=function(e){return e==null?Ke(this,Xe):new this.Collection(this,function(){return it(e,void 0,!0)})},Ie.prototype.aboveOrEqual=function(e){return e==null?Ke(this,Xe):new this.Collection(this,function(){return it(e,void 0,!1)})},Ie.prototype.below=function(e){return e==null?Ke(this,Xe):new this.Collection(this,function(){return it(void 0,e,!1,!0)})},Ie.prototype.belowOrEqual=function(e){return e==null?Ke(this,Xe):new this.Collection(this,function(){return it(void 0,e)})},Ie.prototype.startsWith=function(e){return typeof e!="string"?Ke(this,In):this.between(e,e+ft,!0,!0)},Ie.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):fa(this,function(t,n){return t.indexOf(n[0])===0},[e],ft)},Ie.prototype.equalsIgnoreCase=function(e){return fa(this,function(t,n){return t===n[0]},[e],"")},Ie.prototype.anyOfIgnoreCase=function(){var e=xe.apply(Ee,arguments);return e.length===0?St(this):fa(this,function(t,n){return n.indexOf(t)!==-1},e,"")},Ie.prototype.startsWithAnyOfIgnoreCase=function(){var e=xe.apply(Ee,arguments);return e.length===0?St(this):fa(this,function(t,n){return n.some(function(o){return t.indexOf(o)===0})},e,ft)},Ie.prototype.anyOf=function(){var e,t,n=this,o=xe.apply(Ee,arguments),l=this._cmp;try{o.sort(l)}catch{return Ke(this,Xe)}return o.length===0?St(this):((e=new this.Collection(this,function(){return it(o[0],o[o.length-1])}))._ondirectionchange=function(d){l=d==="next"?n._ascending:n._descending,o.sort(l)},t=0,e._addAlgorithm(function(d,m,g){for(var y=d.key;0<l(y,o[t]);)if(++t===o.length)return m(g),!1;return l(y,o[t])===0||(m(function(){d.continue(o[t])}),!1)}),e)},Ie.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Ie.prototype.noneOf=function(){var e=xe.apply(Ee,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return Ke(this,Xe)}var t=e.reduce(function(n,o){return n?n.concat([[n[n.length-1][1],o]]):[[-1/0,o]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},Ie.prototype.inAnyRange=function(e,O){var n=this,o=this._cmp,l=this._ascending,d=this._descending,m=this._min,g=this._max;if(e.length===0)return St(this);if(!e.every(function(D){return D[0]!==void 0&&D[1]!==void 0&&l(D[0],D[1])<=0}))return Ke(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",oe.InvalidArgument);var y=!O||O.includeLowers!==!1,k=O&&O.includeUppers===!0,_,v=l;function x(D,j){return v(D[0],j[0])}try{(_=e.reduce(function(D,j){for(var B=0,N=D.length;B<N;++B){var H=D[B];if(o(j[0],H[1])<0&&0<o(j[1],H[0])){H[0]=m(H[0],j[0]),H[1]=g(H[1],j[1]);break}}return B===N&&D.push(j),D},[])).sort(x)}catch{return Ke(this,Xe)}var A=0,P=k?function(D){return 0<l(D,_[A][1])}:function(D){return 0<=l(D,_[A][1])},w=y?function(D){return 0<d(D,_[A][0])}:function(D){return 0<=d(D,_[A][0])},S=P,O=new this.Collection(this,function(){return it(_[0][0],_[_.length-1][1],!y,!k)});return O._ondirectionchange=function(D){v=D==="next"?(S=P,l):(S=w,d),_.sort(x)},O._addAlgorithm(function(D,j,B){for(var N,H=D.key;S(H);)if(++A===_.length)return j(B),!1;return!P(N=H)&&!w(N)||(n._cmp(H,_[A][1])===0||n._cmp(H,_[A][0])===0||j(function(){v===l?D.continue(_[A][0]):D.continue(_[A][1])}),!1)}),O},Ie.prototype.startsWithAnyOf=function(){var e=xe.apply(Ee,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?St(this):this.inAnyRange(e.map(function(t){return[t,t+ft]})):Ke(this,"startsWithAnyOf() only works with strings")};var Vn=Ie;function Ie(){}function Ue(e){return Ae(function(t){return Nt(t),e(t.target.error),!1})}function Nt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var ga="storagemutated",Qa="x-storagemutated-1",st=Bt(null,ga),Ro=(Qe.prototype._lock=function(){return R(!ne.global),++this._reculock,this._reculock!==1||ne.global||(ne.lockOwnerFor=this),this},Qe.prototype._unlock=function(){if(R(!ne.global),--this._reculock==0)for(ne.global||(ne.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{mt(e[1],e[0])}catch{}}return this},Qe.prototype._locked=function(){return this._reculock&&ne.lockOwnerFor!==this},Qe.prototype.create=function(e){var t=this;if(this.mode){var n=this.db.idbdb,o=this.db._state.dbOpenError;if(R(!this.idbtrans),!e&&!n)switch(o&&o.name){case"DatabaseClosedError":throw new oe.DatabaseClosed(o);case"MissingAPIError":throw new oe.MissingAPI(o.message,o);default:throw new oe.OpenFailed(o)}if(!this.active)throw new oe.TransactionInactive;R(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||n).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=Ae(function(l){Nt(l),t._reject(e.error)}),e.onabort=Ae(function(l){Nt(l),t.active&&t._reject(new oe.Abort(e.error)),t.active=!1,t.on("abort").fire(l)}),e.oncomplete=Ae(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&st.storagemutated.fire(e.mutatedParts)})}return this},Qe.prototype._promise=function(e,t,n){var o,l=this;return e==="readwrite"&&this.mode!=="readwrite"?Te(new oe.ReadOnly("Transaction is readonly")):this.active?this._locked()?new Y(function(d,m){l._blockedFuncs.push([function(){l._promise(e,t,n).then(d,m)},ne])}):n?nt(function(){var d=new Y(function(m,g){l._lock();var y=t(m,g,l);y&&y.then&&y.then(m,g)});return d.finally(function(){return l._unlock()}),d._lib=!0,d}):((o=new Y(function(d,m){var g=t(d,m,l);g&&g.then&&g.then(d,m)}))._lib=!0,o):Te(new oe.TransactionInactive)},Qe.prototype._root=function(){return this.parent?this.parent._root():this},Qe.prototype.waitFor=function(e){var t,n=this._root(),o=Y.resolve(e),l=(n._waitingFor?n._waitingFor=n._waitingFor.then(function(){return o}):(n._waitingFor=o,n._waitingQueue=[],t=n.idbtrans.objectStore(n.storeNames[0]),(function d(){for(++n._spinCount;n._waitingQueue.length;)n._waitingQueue.shift()();n._waitingFor&&(t.get(-1/0).onsuccess=d)})()),n._waitingFor);return new Y(function(d,m){o.then(function(g){return n._waitingQueue.push(Ae(d.bind(null,g)))},function(g){return n._waitingQueue.push(Ae(m.bind(null,g)))}).finally(function(){n._waitingFor===l&&(n._waitingFor=null)})})},Qe.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new oe.Abort))},Qe.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(T(t,e))return t[e];var n=this.schema[e];if(n)return(n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new oe.NotFound("Table "+e+" not part of transaction")},Qe);function Qe(){}function Ya(e,t,n,o,l,d,m,g){return{name:e,keyPath:t,unique:n,multi:o,auto:l,compound:d,src:(n&&!m?"&":"")+(o?"*":"")+(l?"++":"")+Hn(t),type:g}}function Hn(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function Ja(e,t,n){return{name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(o=function(l){return[l.name,l]},n.reduce(function(l,d,m){return d=o(d,m),d&&(l[d[0]]=d[1]),l},{}))};var o}var zt=function(e){try{return e.only([[]]),zt=function(){return[[]]},[[]]}catch{return zt=function(){return ft},ft}};function Xa(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(n){return n[t]}:function(n){return z(n,t)}:function(n){return z(n,e)};var t}function Un(e){return[].slice.call(e)}var Bo=0;function Ft(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function qo(e,t,m){function o(S){if(S.type===3)return null;if(S.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var A=S.lower,P=S.upper,w=S.lowerOpen,S=S.upperOpen;return A===void 0?P===void 0?null:t.upperBound(P,!!S):P===void 0?t.lowerBound(A,!!w):t.bound(A,P,!!w,!!S)}function l(x){var A,P,w=x.name;return{name:w,schema:x,mutate:function(S){var O=S.trans,D=S.type,j=S.keys,B=S.values,N=S.range;return new Promise(function(H,F){H=Ae(H);var ee=O.objectStore(w),G=ee.keyPath==null,te=D==="put"||D==="add";if(!te&&D!=="delete"&&D!=="deleteRange")throw new Error("Invalid operation type: "+D);var q,ce=(j||B||{length:1}).length;if(j&&B&&j.length!==B.length)throw new Error("Given keys array must have same length as given values array.");if(ce===0)return H({numFailures:0,failures:{},results:[],lastResult:void 0});function de(Ne){++Ge,Nt(Ne)}var me=[],be=[],Ge=0;if(D==="deleteRange"){if(N.type===4)return H({numFailures:Ge,failures:be,results:[],lastResult:void 0});N.type===3?me.push(q=ee.clear()):me.push(q=ee.delete(o(N)))}else{var G=te?G?[B,j]:[B,null]:[j,null],pe=G[0],Re=G[1];if(te)for(var Be=0;Be<ce;++Be)me.push(q=Re&&Re[Be]!==void 0?ee[D](pe[Be],Re[Be]):ee[D](pe[Be])),q.onerror=de;else for(Be=0;Be<ce;++Be)me.push(q=ee[D](pe[Be])),q.onerror=de}function Ea(Ne){Ne=Ne.target.result,me.forEach(function(vt,hn){return vt.error!=null&&(be[hn]=vt.error)}),H({numFailures:Ge,failures:be,results:D==="delete"?j:me.map(function(vt){return vt.result}),lastResult:Ne})}q.onerror=function(Ne){de(Ne),Ea(Ne)},q.onsuccess=Ea})},getMany:function(S){var O=S.trans,D=S.keys;return new Promise(function(j,B){j=Ae(j);for(var N,H=O.objectStore(w),F=D.length,ee=new Array(F),G=0,te=0,q=function(me){me=me.target,ee[me._pos]=me.result,++te===G&&j(ee)},ce=Ue(B),de=0;de<F;++de)D[de]!=null&&((N=H.get(D[de]))._pos=de,N.onsuccess=q,N.onerror=ce,++G);G===0&&j(ee)})},get:function(S){var O=S.trans,D=S.key;return new Promise(function(j,B){j=Ae(j);var N=O.objectStore(w).get(D);N.onsuccess=function(H){return j(H.target.result)},N.onerror=Ue(B)})},query:(A=y,P=k,function(S){return new Promise(function(O,D){O=Ae(O);var j,B,N,H,ce=S.trans,F=S.values,ee=S.limit,q=S.query,G=(G=S.direction)!=null?G:"next",te=ee===1/0?void 0:ee,de=q.index,q=q.range,ce=ce.objectStore(w),ce=de.isPrimaryKey?ce:ce.index(de.name),de=o(q);if(ee===0)return O({result:[]});P?(q={query:de,count:te,direction:G},(j=F?ce.getAll(q):ce.getAllKeys(q)).onsuccess=function(me){return O({result:me.target.result})},j.onerror=Ue(D)):A&&G==="next"?((j=F?ce.getAll(de,te):ce.getAllKeys(de,te)).onsuccess=function(me){return O({result:me.target.result})},j.onerror=Ue(D)):(B=0,N=!F&&"openKeyCursor"in ce?ce.openKeyCursor(de,G):ce.openCursor(de,G),H=[],N.onsuccess=function(){var me=N.result;return!me||(H.push(F?me.value:me.primaryKey),++B===ee)?O({result:H}):void me.continue()},N.onerror=Ue(D))})}),openCursor:function(S){var O=S.trans,D=S.values,j=S.query,B=S.reverse,N=S.unique;return new Promise(function(H,F){H=Ae(H);var te=j.index,ee=j.range,G=O.objectStore(w),G=te.isPrimaryKey?G:G.index(te.name),te=B?N?"prevunique":"prev":N?"nextunique":"next",q=!D&&"openKeyCursor"in G?G.openKeyCursor(o(ee),te):G.openCursor(o(ee),te);q.onerror=Ue(F),q.onsuccess=Ae(function(ce){var de,me,be,Ge,pe=q.result;pe?(pe.___id=++Bo,pe.done=!1,de=pe.continue.bind(pe),me=(me=pe.continuePrimaryKey)&&me.bind(pe),be=pe.advance.bind(pe),Ge=function(){throw new Error("Cursor not stopped")},pe.trans=O,pe.stop=pe.continue=pe.continuePrimaryKey=pe.advance=function(){throw new Error("Cursor not started")},pe.fail=Ae(F),pe.next=function(){var Re=this,Be=1;return this.start(function(){return Be--?Re.continue():Re.stop()}).then(function(){return Re})},pe.start=function(Re){function Be(){if(q.result)try{Re()}catch(Ne){pe.fail(Ne)}else pe.done=!0,pe.start=function(){throw new Error("Cursor behind last entry")},pe.stop()}var Ea=new Promise(function(Ne,vt){Ne=Ae(Ne),q.onerror=Ue(vt),pe.fail=vt,pe.stop=function(hn){pe.stop=pe.continue=pe.continuePrimaryKey=pe.advance=Ge,Ne(hn)}});return q.onsuccess=Ae(function(Ne){q.onsuccess=Be,Be()}),pe.continue=de,pe.continuePrimaryKey=me,pe.advance=be,Be(),Ea},H(pe)):H(null)},F)})},count:function(S){var O=S.query,D=S.trans,j=O.index,B=O.range;return new Promise(function(N,H){var F=D.objectStore(w),F=j.isPrimaryKey?F:F.index(j.name),ee=o(B),ee=ee?F.count(ee):F.count();ee.onsuccess=Ae(function(G){return N(G.target.result)}),ee.onerror=Ue(H)})}}}d=m,g=Un((m=e).objectStoreNames),_=0<g.length?d.objectStore(g[0]):{};var d,m={schema:{name:m.name,tables:g.map(function(x){return d.objectStore(x)}).map(function(x){var A=x.keyPath,P=x.autoIncrement,S=f(A),w={},S={name:x.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:A==null,compound:S,keyPath:A,autoIncrement:P,unique:!0,extractKey:Xa(A)},indexes:Un(x.indexNames).map(function(O){return x.index(O)}).map(function(B){var N=B.name,D=B.unique,j=B.multiEntry,B=B.keyPath,N={name:N,compound:f(B),keyPath:B,unique:D,multiEntry:j,extractKey:Xa(B)};return w[Ft(B)]=N}),getIndexByKeyPath:function(O){return w[Ft(O)]}};return w[":id"]=S.primaryKey,A!=null&&(w[Ft(A)]=S.primaryKey),S})},hasGetAll:0<g.length&&"getAll"in _&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in _},g=m.schema,y=m.hasGetAll,k=m.hasIdb3Features,_=g.tables.map(l),v={};return _.forEach(function(x){return v[x.name]=x}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(x){if(v[x])return v[x];throw new Error("Table '".concat(x,"' not found"))},MIN_KEY:-1/0,MAX_KEY:zt(t),schema:g}}function No(e,t,n,o){return n=n.IDBKeyRange,t=qo(t,n,o),{dbcore:e.dbcore.reduce(function(l,d){return d=d.create,i(i({},l),d(l))},t)}}function ba(e,t){var n=t.db,n=No(e._middlewares,n,e._deps,t);e.core=n.dbcore,e.tables.forEach(function(o){var l=o.name;e.core.schema.tables.some(function(d){return d.name===l})&&(o.core=e.core.table(l),e[l]instanceof e.Table)&&(e[l].core=o.core)})}function ha(e,t,n,o){n.forEach(function(l){var d=o[l];t.forEach(function(m){var g=(function y(k,_){return $(k,_)||(k=h(k))&&y(k,_)})(m,l);(!g||"value"in g&&g.value===void 0)&&(m===e.Transaction.prototype||m instanceof e.Transaction?L(m,l,{get:function(){return this.table(l)},set:function(y){K(this,l,{value:y,writable:!0,configurable:!0,enumerable:!0})}}):m[l]=new e.Table(l,d))})})}function Za(e,t){t.forEach(function(n){for(var o in n)n[o]instanceof e.Table&&delete n[o]})}function zo(e,t){return e._cfg.version-t._cfg.version}function Fo(e,t,n,o){var l=e._dbSchema,d=(n.objectStoreNames.contains("$meta")&&!l.$meta&&(l.$meta=Ja("$meta",Qn("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,l)),m=(d.create(n),d._completion.catch(o),d._reject.bind(d)),g=ne.transless||ne;nt(function(){if(ne.trans=d,ne.transless=g,t!==0)return ba(e,n),k=t,((y=d).storeNames.includes("$meta")?y.table("$meta").get("version").then(function(_){return _??k}):Y.resolve(k)).then(function(S){var v=e,x=S,A=d,P=n,w=[],S=v._versions,O=v._dbSchema=ya(0,v.idbdb,P);return(S=S.filter(function(D){return D._cfg.version>=x})).length===0?Y.resolve():(S.forEach(function(D){w.push(function(){var j,B,N,H=O,F=D._cfg.dbschema,ee=(xa(v,H,P),xa(v,F,P),O=v._dbSchema=F,en(H,F)),G=(ee.add.forEach(function(te){tn(P,te[0],te[1].primKey,te[1].indexes)}),ee.change.forEach(function(te){if(te.recreate)throw new oe.Upgrade("Not yet support for changing primary key");var q=P.objectStore(te.name);te.add.forEach(function(ce){return va(q,ce)}),te.change.forEach(function(ce){q.deleteIndex(ce.name),va(q,ce)}),te.del.forEach(function(ce){return q.deleteIndex(ce)})}),D._cfg.contentUpgrade);if(G&&D._cfg.version>x)return ba(v,P),A._memoizedTables={},j=Z(F),ee.del.forEach(function(te){j[te]=H[te]}),Za(v,[v.Transaction.prototype]),ha(v,[v.Transaction.prototype],u(j),j),A.schema=j,(B=Se(G))&&wt(),F=Y.follow(function(){var te;(N=G(A))&&B&&(te=rt.bind(null,null),N.then(te,te))}),N&&typeof N.then=="function"?Y.resolve(N):F.then(function(){return N})}),w.push(function(j){var B,N,H=D._cfg.dbschema;B=H,N=j,[].slice.call(N.db.objectStoreNames).forEach(function(F){return B[F]==null&&N.db.deleteObjectStore(F)}),Za(v,[v.Transaction.prototype]),ha(v,[v.Transaction.prototype],v._storeNames,v._dbSchema),A.schema=v._dbSchema}),w.push(function(j){v.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(v.idbdb.version/10)===D._cfg.version?(v.idbdb.deleteObjectStore("$meta"),delete v._dbSchema.$meta,v._storeNames=v._storeNames.filter(function(B){return B!=="$meta"})):j.objectStore("$meta").put(D._cfg.version,"version"))})}),(function D(){return w.length?Y.resolve(w.shift()(A.idbtrans)).then(D):Y.resolve()})().then(function(){Wn(O,P)}))}).catch(m);var y,k;u(l).forEach(function(_){tn(n,_,l[_].primKey,l[_].indexes)}),ba(e,n),Y.follow(function(){return e.on.populate.fire(d)}).catch(m)})}function Ko(e,t){Wn(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var n=ya(0,e.idbdb,t);xa(e,e._dbSchema,t);for(var o=0,l=en(n,e._dbSchema).change;o<l.length;o++){var d=(m=>{if(m.change.length||m.recreate)return console.warn("Unable to patch indexes of table ".concat(m.name," because it has changes on the type of index or primary key.")),{value:void 0};var g=t.objectStore(m.name);m.add.forEach(function(y){We&&console.debug("Dexie upgrade patch: Creating missing index ".concat(m.name,".").concat(y.src)),va(g,y)})})(l[o]);if(typeof d=="object")return d.value}}function en(e,t){var n,o={del:[],add:[],change:[]};for(n in e)t[n]||o.del.push(n);for(n in t){var l=e[n],d=t[n];if(l){var m={name:n,def:d,recreate:!1,del:[],add:[],change:[]};if(""+(l.primKey.keyPath||"")!=""+(d.primKey.keyPath||"")||l.primKey.auto!==d.primKey.auto)m.recreate=!0,o.change.push(m);else{var g=l.idxByName,y=d.idxByName,k=void 0;for(k in g)y[k]||m.del.push(k);for(k in y){var _=g[k],v=y[k];_?_.src!==v.src&&m.change.push(v):m.add.push(v)}(0<m.del.length||0<m.add.length||0<m.change.length)&&o.change.push(m)}}else o.add.push([n,d])}return o}function tn(e,t,n,o){var l=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});o.forEach(function(d){return va(l,d)})}function Wn(e,t){u(e).forEach(function(n){t.db.objectStoreNames.contains(n)||(We&&console.debug("Dexie: Creating missing table",n),tn(t,n,e[n].primKey,e[n].indexes))})}function va(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function ya(e,t,n){var o={};return U(t.objectStoreNames,0).forEach(function(l){for(var d=n.objectStore(l),m=Ya(Hn(k=d.keyPath),k||"",!0,!1,!!d.autoIncrement,k&&typeof k!="string",!0),g=[],y=0;y<d.indexNames.length;++y){var _=d.index(d.indexNames[y]),k=_.keyPath,_=Ya(_.name,k,!!_.unique,!!_.multiEntry,!1,k&&typeof k!="string",!1);g.push(_)}o[l]=Ja(l,m,g)}),o}function xa(e,t,n){for(var o=n.db.objectStoreNames,l=0;l<o.length;++l){var d=o[l],m=n.objectStore(d);e._hasGetAll="getAll"in m;for(var g=0;g<m.indexNames.length;++g){var y,k=m.indexNames[g],_=m.index(k).keyPath,_=typeof _=="string"?_:"["+U(_).join("+")+"]";t[d]&&(y=t[d].idxByName[_])&&(y.name=k,delete t[d].idxByName[_],t[d].idxByName[k]=y)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&c.WorkerGlobalScope&&c instanceof c.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function Qn(e){return e.split(",").map(function(t,n){var l=t.split(":"),o=(o=l[1])==null?void 0:o.trim(),l=(t=l[0].trim()).replace(/([&*]|\+\+)/g,""),d=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Ya(l,d||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),f(d),n===0,o)})}At.prototype._createTableSchema=Ja,At.prototype._parseIndexSyntax=Qn,At.prototype._parseStoresSpec=function(e,t){var n=this;u(e).forEach(function(o){if(e[o]!==null){var l=n._parseIndexSyntax(e[o]),d=l.shift();if(!d)throw new oe.Schema("Invalid schema for table "+o+": "+e[o]);if(d.unique=!0,d.multi)throw new oe.Schema("Primary key cannot be multiEntry*");l.forEach(function(m){if(m.auto)throw new oe.Schema("Only primary key can be marked as autoIncrement (++)");if(!m.keyPath)throw new oe.Schema("Index must have a name and cannot be an empty string")}),d=n._createTableSchema(o,d,l),t[o]=d}})},At.prototype.stores=function(n){var t=this.db,n=(this._cfg.storesSource=this._cfg.storesSource?b(this._cfg.storesSource,n):n,t._versions),o={},l={};return n.forEach(function(d){b(o,d._cfg.storesSource),l=d._cfg.dbschema={},d._parseStoresSpec(o,l)}),t._dbSchema=l,Za(t,[t._allTables,t,t.Transaction.prototype]),ha(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],u(l),l),t._storeNames=u(l),this},At.prototype.upgrade=function(e){return this._cfg.contentUpgrade=Ma(this._cfg.contentUpgrade||_e,e),this};var Go=At;function At(){}var Kt=(()=>{var e,t,n;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(e=new Set,t=new FinalizationRegistry(function(o){e.delete(o)}),{toArray:function(){return Array.from(e).map(function(o){return o.deref()}).filter(function(o){return o!==void 0})},add:function(o){var l=new WeakRef(o._novip);e.add(l),t.register(o._novip,l,l),e.size>o._options.maxConnections&&(l=e.values().next().value,e.delete(l),t.unregister(l))},remove:function(o){if(o)for(var l=e.values(),d=l.next();!d.done;){var m=d.value;if(m.deref()===o._novip)return e.delete(m),void t.unregister(m);d=l.next()}}}):(n=[],{toArray:function(){return n},add:function(o){n.push(o._novip)},remove:function(o){o&&(o=n.indexOf(o._novip))!==-1&&n.splice(o,1)}})})();function an(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new Ze(ca,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function nn(e){return e&&typeof e.databases=="function"}function rn(e){return nt(function(){return ne.letThrough=!0,e()})}function on(e){return!("from"in e)}var Me=function(e,t){var n;if(!this)return n=new Me,e&&"d"in e&&b(n,e),n;b(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Gt(e,t,n){var o=he(t,n);if(!isNaN(o)){if(0<o)throw RangeError();if(on(e))return b(e,{from:t,to:n,d:1});var o=e.l,l=e.r;if(he(n,e.from)<0)return o?Gt(o,t,n):e.l={from:t,to:n,d:1,l:null,r:null},Jn(e);if(0<he(t,e.to))return l?Gt(l,t,n):e.r={from:t,to:n,d:1,l:null,r:null},Jn(e);he(t,e.from)<0&&(e.from=t,e.l=null,e.d=l?l.d+1:1),0<he(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,o&&!e.l&&Vt(e,o),l&&t&&Vt(e,l)}}function Vt(e,t){on(t)||(function n(o,l){var d=l.from,m=l.l,g=l.r;Gt(o,d,l.to),m&&n(o,m),g&&n(o,g)})(e,t)}function Yn(e,t){var n=_a(t),o=n.next();if(!o.done)for(var l=o.value,d=_a(e),m=d.next(l.from),g=m.value;!o.done&&!m.done;){if(he(g.from,l.to)<=0&&0<=he(g.to,l.from))return!0;he(l.from,g.from)<0?l=(o=n.next(g.from)).value:g=(m=d.next(l.from)).value}return!1}function _a(e){var t=on(e)?null:{s:0,n:e};return{next:function(n){for(var o=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,o)for(;t.n.l&&he(n,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!o||he(n,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function Jn(e){var t,n,o,l=(((l=e.r)==null?void 0:l.d)||0)-(((l=e.l)==null?void 0:l.d)||0),l=1<l?"r":l<-1?"l":"";l&&(t=l=="r"?"l":"r",n=i({},e),o=e[l],e.from=o.from,e.to=o.to,e[l]=o[l],n[l]=o[t],(e[t]=n).d=Xn(n)),e.d=Xn(e)}function Xn(n){var t=n.r,n=n.l;return(t?n?Math.max(t.d,n.d):t.d:n?n.d:0)+1}function Ca(e,t){return u(t).forEach(function(n){e[n]?Vt(e[n],t[n]):e[n]=(function o(l){var d,m,g={};for(d in l)T(l,d)&&(m=l[d],g[d]=!m||typeof m!="object"||ge.has(m.constructor)?m:o(m));return g})(t[n])}),e}function sn(e,t){return e.all||t.all||Object.keys(e).some(function(n){return t[n]&&Yn(t[n],e[n])})}I(Me.prototype,((Fe={add:function(e){return Vt(this,e),this},addKey:function(e){return Gt(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(n){return Gt(t,n,n)}),this},hasKey:function(e){var t=_a(this).next(e).value;return t&&he(t.from,e)<=0&&0<=he(t.to,e)}})[fe]=function(){return _a(this)},Fe));var bt={},ln={},cn=!1;function wa(e){Ca(ln,e),cn||(cn=!0,setTimeout(function(){cn=!1,dn(ln,!(ln={}))},0))}function dn(e,t){t===void 0&&(t=!1);var n=new Set;if(e.all)for(var o=0,l=Object.values(bt);o<l.length;o++)Zn(g=l[o],e,n,t);else for(var d in e){var m,g,d=/^idb\:\/\/(.*)\/(.*)\//.exec(d);d&&(m=d[1],d=d[2],g=bt["idb://".concat(m,"/").concat(d)])&&Zn(g,e,n,t)}n.forEach(function(y){return y()})}function Zn(e,t,n,o){for(var l=[],d=0,m=Object.entries(e.queries.query);d<m.length;d++){for(var g=m[d],y=g[0],k=[],_=0,v=g[1];_<v.length;_++){var x=v[_];sn(t,x.obsSet)?x.subscribers.forEach(function(S){return n.add(S)}):o&&k.push(x)}o&&l.push([y,k])}if(o)for(var A=0,P=l;A<P.length;A++){var w=P[A],y=w[0],k=w[1];e.queries.query[y]=k}}function Vo(e){var t=e._state,n=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?Te(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var o=t.openCanceller,l=Math.round(10*e.verno),d=!1;function m(){if(t.openCanceller!==o)throw new oe.DatabaseClosed("db.open() was cancelled")}function g(){return new Y(function(x,A){if(m(),!n)throw new oe.MissingAPI;var P=e.name,w=t.autoSchema||!l?n.open(P):n.open(P,l);if(!w)throw new oe.MissingAPI;w.onerror=Ue(A),w.onblocked=Ae(e._fireOnBlocked),w.onupgradeneeded=Ae(function(S){var O;_=w.transaction,t.autoSchema&&!e._options.allowEmptyDB?(w.onerror=Nt,_.abort(),w.result.close(),(O=n.deleteDatabase(P)).onsuccess=O.onerror=Ae(function(){A(new oe.NoSuchDatabase("Database ".concat(P," doesnt exist")))})):(_.onerror=Ue(A),O=S.oldVersion>Math.pow(2,62)?0:S.oldVersion,v=O<1,e.idbdb=w.result,d&&Ko(e,_),Fo(e,O/10,_,A))},A),w.onsuccess=Ae(function(){_=null;var S,O,D,j,B,N,H=e.idbdb=w.result,F=U(H.objectStoreNames);if(0<F.length)try{var ee=H.transaction((B=F).length===1?B[0]:B,"readonly");if(t.autoSchema)N=H,j=ee,(D=e).verno=N.version/10,j=D._dbSchema=ya(0,N,j),D._storeNames=U(N.objectStoreNames,0),ha(D,[D._allTables],u(j),j);else if(xa(e,e._dbSchema,ee),O=ee,((O=en(ya(0,(S=e).idbdb,O),S._dbSchema)).add.length||O.change.some(function(G){return G.add.length||G.change.length}))&&!d)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),H.close(),l=H.version+1,d=!0,x(g());ba(e,ee)}catch{}Kt.add(e),H.onversionchange=Ae(function(G){t.vcFired=!0,e.on("versionchange").fire(G)}),H.onclose=Ae(function(){e.close({disableAutoOpen:!1})}),v&&(F=e._deps,B=P,nn(N=F.indexedDB)||B===ca||an(N,F.IDBKeyRange).put({name:B}).catch(_e)),x()},A)}).catch(function(x){switch(x==null?void 0:x.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),g();break;case"VersionError":if(0<l)return l=0,g()}return Y.reject(x)})}var y,k=t.dbReadyResolve,_=null,v=!1;return Y.race([o,(typeof navigator>"u"?Y.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(x){function A(){return indexedDB.databases().finally(x)}y=setInterval(A,100),A()}).finally(function(){return clearInterval(y)}):Promise.resolve()).then(g)]).then(function(){return m(),t.onReadyBeingFired=[],Y.resolve(rn(function(){return e.on.ready.fire(e.vip)})).then(function x(){var A;if(0<t.onReadyBeingFired.length)return A=t.onReadyBeingFired.reduce(Ma,_e),t.onReadyBeingFired=[],Y.resolve(rn(function(){return A(e.vip)})).then(x)})}).finally(function(){t.openCanceller===o&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(x){t.dbOpenError=x;try{_&&_.abort()}catch{}return o===t.openCanceller&&e._close(),Te(x)}).finally(function(){t.openComplete=!0,k()}).then(function(){var x;return v&&(x={},e.tables.forEach(function(A){A.schema.indexes.forEach(function(P){P.name&&(x["idb://".concat(e.name,"/").concat(A.name,"/").concat(P.name)]=new Me(-1/0,[[[]]]))}),x["idb://".concat(e.name,"/").concat(A.name,"/")]=x["idb://".concat(e.name,"/").concat(A.name,"/:dels")]=new Me(-1/0,[[[]]])}),st(ga).fire(x),dn(x,!0)),e})}function un(e){function t(d){return e.next(d)}var n=l(t),o=l(function(d){return e.throw(d)});function l(d){return function(g){var g=d(g),y=g.value;return g.done?y:y&&typeof y.then=="function"?y.then(n,o):f(y)?Promise.all(y).then(n,o):n(y)}}return l(t)()}function Pa(e,t,n){for(var o=f(e)?e.slice():[e],l=0;l<n;++l)o.push(t);return o}var Ho={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return i(i({},e),{table:function(o){var n=e.table(o),o=n.schema,l=Object.create(null),d=[];function m(x,A,P){var D=Ft(x),w=l[D]=l[D]||[],S=x==null?0:typeof x=="string"?1:x.length,O=0<A,D=i(i({},P),{name:O?"".concat(D,"(virtual-from:").concat(P.name,")"):P.name,lowLevelIndex:P,isVirtual:O,keyTail:A,keyLength:S,extractKey:Xa(x),unique:!O&&P.unique});return w.push(D),D.isPrimaryKey||d.push(D),1<S&&m(S===2?x[0]:x.slice(0,S-1),A+1,P),w.sort(function(j,B){return j.keyTail-B.keyTail}),D}var g=m(o.primaryKey.keyPath,0,o.primaryKey);l[":id"]=[g];for(var y=0,k=o.indexes;y<k.length;y++){var _=k[y];m(_.keyPath,0,_)}function v(x){var A,P=x.query.index;return P.isVirtual?i(i({},x),{query:{index:P.lowLevelIndex,range:(A=x.query.range,P=P.keyTail,{type:A.type===1?2:A.type,lower:Pa(A.lower,A.lowerOpen?e.MAX_KEY:e.MIN_KEY,P),lowerOpen:!0,upper:Pa(A.upper,A.upperOpen?e.MIN_KEY:e.MAX_KEY,P),upperOpen:!0})}}):x}return i(i({},n),{schema:i(i({},o),{primaryKey:g,indexes:d,getIndexByKeyPath:function(x){return(x=l[Ft(x)])&&x[0]}}),count:function(x){return n.count(v(x))},query:function(x){return n.query(v(x))},openCursor:function(x){var A=x.query.index,P=A.keyTail,w=A.keyLength;return A.isVirtual?n.openCursor(v(x)).then(function(O){return O&&S(O)}):n.openCursor(x);function S(O){return Object.create(O,{continue:{value:function(D){D!=null?O.continue(Pa(D,x.reverse?e.MAX_KEY:e.MIN_KEY,P)):x.unique?O.continue(O.key.slice(0,w).concat(x.reverse?e.MIN_KEY:e.MAX_KEY,P)):O.continue()}},continuePrimaryKey:{value:function(D,j){O.continuePrimaryKey(Pa(D,e.MAX_KEY,P),j)}},primaryKey:{get:function(){return O.primaryKey}},key:{get:function(){var D=O.key;return w===1?D[0]:D.slice(0,w)}},value:{get:function(){return O.value}}})}}})}})}};function pn(e,t,n,o){return n=n||{},o=o||"",u(e).forEach(function(l){var d,m,g;T(t,l)?(d=e[l],m=t[l],typeof d=="object"&&typeof m=="object"&&d&&m?(g=ae(d))!==ae(m)?n[o+l]=t[l]:g==="Object"?pn(d,m,n,o+l+"."):d!==m&&(n[o+l]=t[l]):d!==m&&(n[o+l]=t[l])):n[o+l]=void 0}),u(t).forEach(function(l){T(e,l)||(n[o+l]=t[l])}),n}function mn(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var Uo={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return i(i({},e),{table:function(t){var n=e.table(t),o=n.schema.primaryKey;return i(i({},n),{mutate:function(l){var d=ne.trans,m=d.table(t).hook,g=m.deleting,y=m.creating,k=m.updating;switch(l.type){case"add":if(y.fire===_e)break;return d._promise("readwrite",function(){return _(l)},!0);case"put":if(y.fire===_e&&k.fire===_e)break;return d._promise("readwrite",function(){return _(l)},!0);case"delete":if(g.fire===_e)break;return d._promise("readwrite",function(){return _(l)},!0);case"deleteRange":if(g.fire===_e)break;return d._promise("readwrite",function(){return(function v(x,A,P){return n.query({trans:x,values:!1,query:{index:o,range:A},limit:P}).then(function(w){var S=w.result;return _({type:"delete",keys:S,trans:x}).then(function(O){return 0<O.numFailures?Promise.reject(O.failures[0]):S.length<P?{failures:[],numFailures:0,lastResult:void 0}:v(x,i(i({},A),{lower:S[S.length-1],lowerOpen:!0}),P)})})})(l.trans,l.range,1e4)},!0)}return n.mutate(l);function _(v){var x,A,P,w=ne.trans,S=v.keys||mn(o,v);if(S)return(v=v.type==="add"||v.type==="put"?i(i({},v),{keys:S}):i({},v)).type!=="delete"&&(v.values=s([],v.values)),v.keys&&(v.keys=s([],v.keys)),x=n,P=S,((A=v).type==="add"?Promise.resolve([]):x.getMany({trans:A.trans,keys:P,cache:"immutable"})).then(function(O){var D=S.map(function(j,B){var N,H,F,ee=O[B],G={onerror:null,onsuccess:null};return v.type==="delete"?g.fire.call(G,j,ee,w):v.type==="add"||ee===void 0?(N=y.fire.call(G,j,v.values[B],w),j==null&&N!=null&&(v.keys[B]=j=N,o.outbound||Q(v.values[B],o.keyPath,j))):(N=pn(ee,v.values[B]),(H=k.fire.call(G,N,j,ee,w))&&(F=v.values[B],Object.keys(H).forEach(function(te){T(F,te)?F[te]=H[te]:Q(F,te,H[te])}))),G});return n.mutate(v).then(function(j){for(var B=j.failures,N=j.results,H=j.numFailures,j=j.lastResult,F=0;F<S.length;++F){var ee=(N||S)[F],G=D[F];ee==null?G.onerror&&G.onerror(B[F]):G.onsuccess&&G.onsuccess(v.type==="put"&&O[F]?v.values[F]:ee)}return{failures:B,results:N,numFailures:H,lastResult:j}}).catch(function(j){return D.forEach(function(B){return B.onerror&&B.onerror(j)}),Promise.reject(j)})});throw new Error("Keys missing")}}})}})}};function er(e,t,n){try{if(!t||t.keys.length<e.length)return null;for(var o=[],l=0,d=0;l<t.keys.length&&d<e.length;++l)he(t.keys[l],e[d])===0&&(o.push(n?re(t.values[l]):t.values[l]),++d);return o.length===e.length?o:null}catch{return null}}var Wo={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var n=e.table(t);return i(i({},n),{getMany:function(o){var l;return o.cache?(l=er(o.keys,o.trans._cache,o.cache==="clone"))?Y.resolve(l):n.getMany(o).then(function(d){return o.trans._cache={keys:o.keys,values:o.cache==="clone"?re(d):d},d}):n.getMany(o)},mutate:function(o){return o.type!=="add"&&(o.trans._cache=null),n.mutate(o)}})}}}};function tr(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function ar(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var Qo={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,n=new Me(e.MIN_KEY,e.MAX_KEY);return i(i({},e),{transaction:function(o,l,d){if(ne.subscr&&l!=="readonly")throw new oe.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(ne.querier));return e.transaction(o,l,d)},table:function(o){function l(S){var w,S=S.query;return[w=S.index,new Me((w=(S=S.range).lower)!=null?w:e.MIN_KEY,(w=S.upper)!=null?w:e.MAX_KEY)]}var d=e.table(o),m=d.schema,g=m.primaryKey,y=m.indexes,k=g.extractKey,_=g.outbound,v=g.autoIncrement&&y.filter(function(P){return P.compound&&P.keyPath.includes(g.keyPath)}),x=i(i({},d),{mutate:function(P){function w(q){return q="idb://".concat(t,"/").concat(o,"/").concat(q),B[q]||(B[q]=new Me)}var S,O,D,j=P.trans,B=P.mutatedParts||(P.mutatedParts={}),N=w(""),H=w(":dels"),F=P.type,G=P.type==="deleteRange"?[P.range]:P.type==="delete"?[P.keys]:P.values.length<50?[mn(g,P).filter(function(q){return q}),P.values]:[],ee=G[0],G=G[1],te=P.trans._cache;return f(ee)?(N.addKeys(ee),(F=F==="delete"||ee.length===G.length?er(ee,te):null)||H.addKeys(ee),(F||G)&&(S=w,O=F,D=G,m.indexes.forEach(function(q){var ce=S(q.name||"");function de(be){return be!=null?q.extractKey(be):null}function me(be){q.multiEntry&&f(be)?be.forEach(function(Ge){return ce.addKey(Ge)}):ce.addKey(be)}(O||D).forEach(function(be,Re){var pe=O&&de(O[Re]),Re=D&&de(D[Re]);he(pe,Re)!==0&&(pe!=null&&me(pe),Re!=null)&&me(Re)})}))):ee?(G={from:(te=ee.lower)!=null?te:e.MIN_KEY,to:(F=ee.upper)!=null?F:e.MAX_KEY},H.add(G),N.add(G)):(N.add(n),H.add(n),m.indexes.forEach(function(q){return w(q.name).add(n)})),d.mutate(P).then(function(q){return!ee||P.type!=="add"&&P.type!=="put"||(N.addKeys(q.results),v&&v.forEach(function(ce){for(var de=P.values.map(function(pe){return ce.extractKey(pe)}),me=ce.keyPath.findIndex(function(pe){return pe===g.keyPath}),be=0,Ge=q.results.length;be<Ge;++be)de[be][me]=q.results[be];w(ce.name).addKeys(de)})),j.mutatedParts=Ca(j.mutatedParts||{},B),q})}}),A={get:function(P){return[g,new Me(P.key)]},getMany:function(P){return[g,new Me().addKeys(P.keys)]},count:l,query:l,openCursor:l};return u(A).forEach(function(P){x[P]=function(w){var S=ne.subscr,O=!!S,D=tr(ne,d)&&ar(P,w)?w.obsSet={}:S;if(O){var j,S=function(G){return G="idb://".concat(t,"/").concat(o,"/").concat(G),D[G]||(D[G]=new Me)},B=S(""),N=S(":dels"),O=A[P](w),H=O[0],O=O[1];if((P==="query"&&H.isPrimaryKey&&!w.values?N:S(H.name||"")).add(O),!H.isPrimaryKey){if(P!=="count")return j=P==="query"&&_&&w.values&&d.query(i(i({},w),{values:!1})),d[P].apply(this,arguments).then(function(G){if(P==="query"){if(_&&w.values)return j.then(function(de){return de=de.result,B.addKeys(de),G});var te=w.values?G.result.map(k):G.result;(w.values?B:N).addKeys(te)}else{var q,ce;if(P==="openCursor")return ce=w.values,(q=G)&&Object.create(q,{key:{get:function(){return N.addKey(q.primaryKey),q.key}},primaryKey:{get:function(){var de=q.primaryKey;return N.addKey(de),de}},value:{get:function(){return ce&&B.addKey(q.primaryKey),q.value}}})}return G});N.add(n)}}return d[P].apply(this,arguments)}}),x}})}};function nr(e,t,n){var o;return n.numFailures===0?t:t.type==="deleteRange"||(o=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===o)?null:(o=i({},t),f(o.keys)&&(o.keys=o.keys.filter(function(l,d){return!(d in n.failures)})),"values"in o&&f(o.values)&&(o.values=o.values.filter(function(l,d){return!(d in n.failures)})),o)}function fn(e,t){return n=e,((o=t).lower===void 0||(o.lowerOpen?0<he(n,o.lower):0<=he(n,o.lower)))&&(n=e,(o=t).upper===void 0||(o.upperOpen?he(n,o.upper)<0:he(n,o.upper)<=0));var n,o}function rr(e,t,n,o,l,d){var m,g,y,k,_,v,x;return!n||n.length===0||(m=t.query.index,g=m.multiEntry,y=t.query.range,k=o.schema.primaryKey.extractKey,_=m.extractKey,v=(m.lowLevelIndex||m).extractKey,(o=n.reduce(function(A,P){var w=A,S=[];if(P.type==="add"||P.type==="put")for(var O=new Me,D=P.values.length-1;0<=D;--D){var j,B=P.values[D],N=k(B);!O.hasKey(N)&&(j=_(B),g&&f(j)?j.some(function(te){return fn(te,y)}):fn(j,y))&&(O.addKey(N),S.push(B))}switch(P.type){case"add":var H=new Me().addKeys(t.values?A.map(function(q){return k(q)}):A),w=A.concat(t.values?S.filter(function(q){return q=k(q),!H.hasKey(q)&&(H.addKey(q),!0)}):S.map(function(q){return k(q)}).filter(function(q){return!H.hasKey(q)&&(H.addKey(q),!0)}));break;case"put":var F=new Me().addKeys(P.values.map(function(q){return k(q)}));w=A.filter(function(q){return!F.hasKey(t.values?k(q):q)}).concat(t.values?S:S.map(function(q){return k(q)}));break;case"delete":var ee=new Me().addKeys(P.keys);w=A.filter(function(q){return!ee.hasKey(t.values?k(q):q)});break;case"deleteRange":var G=P.range;w=A.filter(function(q){return!fn(k(q),G)})}return w},e))===e)?e:(x=function(A,P){return he(v(A),v(P))||he(k(A),k(P))},o.sort(t.direction==="prev"||t.direction==="prevunique"?function(A,P){return x(P,A)}:x),t.limit&&t.limit<1/0&&(o.length>t.limit?o.length=t.limit:e.length===t.limit&&o.length<t.limit&&(l.dirty=!0)),d?Object.freeze(o):o)}function or(e,t){return he(e.lower,t.lower)===0&&he(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function Yo(e,t){return((n,o,l,d)=>{if(n===void 0)return o!==void 0?-1:0;if(o===void 0)return 1;if((n=he(n,o))===0){if(l&&d)return 0;if(l)return 1;if(d)return-1}return n})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((n,o,l,d)=>{if(n===void 0)return o!==void 0?1:0;if(o===void 0)return-1;if((n=he(n,o))===0){if(l&&d)return 0;if(l)return-1;if(d)return 1}return n})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function Jo(e,t,n,o){e.subscribers.add(n),o.addEventListener("abort",function(){var l,d;e.subscribers.delete(n),e.subscribers.size===0&&(l=e,d=t,setTimeout(function(){l.subscribers.size===0&&we(d,l)},3e3))})}var Xo={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return i(i({},e),{transaction:function(n,o,l){var d,m,g=e.transaction(n,o,l);return o==="readwrite"&&(l=(d=new AbortController).signal,g.addEventListener("abort",(m=function(y){return function(){if(d.abort(),o==="readwrite"){for(var k=new Set,_=0,v=n;_<v.length;_++){var x=v[_],A=bt["idb://".concat(t,"/").concat(x)];if(A){var P=e.table(x),w=A.optimisticOps.filter(function(q){return q.trans===g});if(g._explicit&&y&&g.mutatedParts)for(var S=0,O=Object.values(A.queries.query);S<O.length;S++)for(var D=0,j=(H=O[S]).slice();D<j.length;D++)sn((F=j[D]).obsSet,g.mutatedParts)&&(we(H,F),F.subscribers.forEach(function(q){return k.add(q)}));else if(0<w.length){A.optimisticOps=A.optimisticOps.filter(function(q){return q.trans!==g});for(var B=0,N=Object.values(A.queries.query);B<N.length;B++)for(var H,F,ee,G=0,te=(H=N[B]).slice();G<te.length;G++)(F=te[G]).res!=null&&g.mutatedParts&&(y&&!F.dirty?(ee=Object.isFrozen(F.res),ee=rr(F.res,F.req,w,P,F,ee),F.dirty?(we(H,F),F.subscribers.forEach(function(q){return k.add(q)})):ee!==F.res&&(F.res=ee,F.promise=Y.resolve({result:ee}))):(F.dirty&&we(H,F),F.subscribers.forEach(function(q){return k.add(q)})))}}}k.forEach(function(q){return q()})}}})(!1),{signal:l}),g.addEventListener("error",m(!1),{signal:l}),g.addEventListener("complete",m(!0),{signal:l})),g},table:function(n){var o=e.table(n),l=o.schema.primaryKey;return i(i({},o),{mutate:function(d){var m,g=ne.trans;return!l.outbound&&g.db._options.cache!=="disabled"&&!g.explicit&&g.idbtrans.mode==="readwrite"&&(m=bt["idb://".concat(t,"/").concat(n)])?(g=o.mutate(d),d.type!=="add"&&d.type!=="put"||!(50<=d.values.length||mn(l,d).some(function(y){return y==null}))?(m.optimisticOps.push(d),d.mutatedParts&&wa(d.mutatedParts),g.then(function(y){0<y.numFailures&&(we(m.optimisticOps,d),(y=nr(0,d,y))&&m.optimisticOps.push(y),d.mutatedParts)&&wa(d.mutatedParts)}),g.catch(function(){we(m.optimisticOps,d),d.mutatedParts&&wa(d.mutatedParts)})):g.then(function(y){var k=nr(0,i(i({},d),{values:d.values.map(function(_,v){var x;return y.failures[v]?_:(Q(x=(x=l.keyPath)!=null&&x.includes(".")?re(_):i({},_),l.keyPath,y.results[v]),x)})}),y);m.optimisticOps.push(k),queueMicrotask(function(){return d.mutatedParts&&wa(d.mutatedParts)})}),g):o.mutate(d)},query:function(d){var m,g,y,k,_,v,x;return tr(ne,o)&&ar("query",d)?(m=((y=ne.trans)==null?void 0:y.db._options.cache)==="immutable",g=(y=ne).requery,y=y.signal,v=((A,P,w,S)=>{var O=bt["idb://".concat(A,"/").concat(P)];if(!O)return[];if(!(A=O.queries[w]))return[null,!1,O,null];var D=A[(S.query?S.query.index.name:null)||""];if(!D)return[null,!1,O,null];switch(w){case"query":var j=(B=S.direction)!=null?B:"next",B=D.find(function(N){var H;return N.req.limit===S.limit&&N.req.values===S.values&&((H=N.req.direction)!=null?H:"next")===j&&or(N.req.query.range,S.query.range)});return B?[B,!0,O,D]:[D.find(function(N){var H;return("limit"in N.req?N.req.limit:1/0)>=S.limit&&((H=N.req.direction)!=null?H:"next")===j&&(!S.values||N.req.values)&&Yo(N.req.query.range,S.query.range)}),!1,O,D];case"count":return B=D.find(function(N){return or(N.req.query.range,S.query.range)}),[B,!!B,O,D]}})(t,n,"query",d),x=v[0],k=v[2],_=v[3],x&&v[1]?x.obsSet=d.obsSet:(v=o.query(d).then(function(A){var P=A.result;if(x&&(x.res=P),m){for(var w=0,S=P.length;w<S;++w)Object.freeze(P[w]);Object.freeze(P)}return A}).catch(function(A){return _&&x&&we(_,x),Promise.reject(A)}),x={obsSet:d.obsSet,promise:v,subscribers:new Set,type:"query",req:d,dirty:!1},_?_.push(x):(_=[x],(k=k||(bt["idb://".concat(t,"/").concat(n)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[d.query.index.name||""]=_)),Jo(x,_,g,y),x.promise.then(function(A){return A=rr(A.result,d,k==null?void 0:k.optimisticOps,o,x,m),{result:m?A:re(A)}})):o.query(d)}})}})}};function Sa(e,t){return new Proxy(e,{get:function(n,o,l){return o==="db"?t:Reflect.get(n,o,l)}})}De.prototype.version=function(e){if(isNaN(e)||e<.1)throw new oe.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new oe.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,n=t.filter(function(o){return o._cfg.version===e})[0];return n||(n=new this.Version(e),t.push(n),t.sort(zo),n.stores({}),this._state.autoSchema=!1),n},De.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||ne.letThrough||this._vip)?e():new Y(function(n,o){if(t._state.openComplete)return o(new oe.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void o(new oe.DatabaseClosed);t.open().catch(_e)}t._state.dbReadyPromise.then(n,o)}).then(e)},De.prototype.use=function(l){var t=l.stack,n=l.create,o=l.level,l=l.name,d=(l&&this.unuse({stack:t,name:l}),this._middlewares[t]||(this._middlewares[t]=[]));return d.push({stack:t,create:n,level:o??10,name:l}),d.sort(function(m,g){return m.level-g.level}),this},De.prototype.unuse=function(e){var t=e.stack,n=e.name,o=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(l){return o?l.create!==o:!!n&&l.name!==n})),this},De.prototype.open=function(){var e=this;return mt(Je,function(){return Vo(e)})},De.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state;if(Kt.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new Y(function(t){e.dbReadyResolve=t}),e.openCanceller=new Y(function(t,n){e.cancelOpen=n}))},De.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,n=this._state;t?(n.isBeingOpened&&n.cancelOpen(new oe.DatabaseClosed),this._close(),n.autoOpen=!1,n.dbOpenError=new oe.DatabaseClosed):(this._close(),n.autoOpen=this._options.autoOpen||n.isBeingOpened,n.openComplete=!1,n.dbOpenError=null)},De.prototype.delete=function(e){var t=this,n=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),o=this._state;return new Y(function(l,d){function m(){t.close(e);var g=t._deps.indexedDB.deleteDatabase(t.name);g.onsuccess=Ae(function(){var y,k,_;y=t._deps,k=t.name,nn(_=y.indexedDB)||k===ca||an(_,y.IDBKeyRange).delete(k).catch(_e),l()}),g.onerror=Ue(d),g.onblocked=t._fireOnBlocked}if(n)throw new oe.InvalidArgument("Invalid closeOptions argument to db.delete()");o.isBeingOpened?o.dbReadyPromise.then(m):m()})},De.prototype.backendDB=function(){return this.idbdb},De.prototype.isOpen=function(){return this.idbdb!==null},De.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},De.prototype.hasFailed=function(){return this._state.dbOpenError!==null},De.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(De.prototype,"tables",{get:function(){var e=this;return u(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),De.prototype.transaction=function(){var e=(function(t,n,o){var l=arguments.length;if(l<2)throw new oe.InvalidArgument("Too few arguments");for(var d=new Array(l-1);--l;)d[l-1]=arguments[l];return o=d.pop(),[t,J(d),o]}).apply(this,arguments);return this._transaction.apply(this,e)},De.prototype._transaction=function(e,t,n){var o,l,d=this,m=ne.trans,g=(m&&m.db===this&&e.indexOf("!")===-1||(m=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(l=t.map(function(k){if(k=k instanceof d.Table?k.name:k,typeof k!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return k}),e=="r"||e===Va)o=Va;else{if(e!="rw"&&e!=Ha)throw new oe.InvalidArgument("Invalid transaction mode: "+e);o=Ha}if(m){if(m.mode===Va&&o===Ha){if(!g)throw new oe.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");m=null}m&&l.forEach(function(k){if(m&&m.storeNames.indexOf(k)===-1){if(!g)throw new oe.SubTransaction("Table "+k+" not included in parent transaction.");m=null}}),g&&m&&!m.active&&(m=null)}}catch(k){return m?m._promise(null,function(_,v){v(k)}):Te(k)}var y=(function k(_,v,x,A,P){return Y.resolve().then(function(){var D=ne.transless||ne,w=_._createTransaction(v,x,_._dbSchema,A),D=(w.explicit=!0,{trans:w,transless:D});if(A)w.idbtrans=A.idbtrans;else try{w.create(),w.idbtrans._explicit=!0,_._state.PR1398_maxLoop=3}catch(j){return j.name===ja.InvalidState&&_.isOpen()&&0<--_._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),_.close({disableAutoOpen:!1}),_.open().then(function(){return k(_,v,x,null,P)})):Te(j)}var S,O=Se(P),D=(O&&wt(),Y.follow(function(){var j;(S=P.call(w,w))&&(O?(j=rt.bind(null,null),S.then(j,j)):typeof S.next=="function"&&typeof S.throw=="function"&&(S=un(S)))},D));return(S&&typeof S.then=="function"?Y.resolve(S).then(function(j){return w.active?j:Te(new oe.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):D.then(function(){return S})).then(function(j){return A&&w._resolve(),w._completion.then(function(){return j})}).catch(function(j){return w._reject(j),Te(j)})})}).bind(null,this,o,l,m,n);return m?m._promise(o,y,"lock"):ne.trans?mt(ne.transless,function(){return d._whenReady(y)}):this._whenReady(y)},De.prototype.table=function(e){if(T(this._allTables,e))return this._allTables[e];throw new oe.InvalidTable("Table ".concat(e," does not exist"))};var Ze=De;function De(e,t){var n,o,l,d,m,g=this,y=(this._middlewares={},this.verno=0,De.dependencies),y=(this._options=t=i({addons:De.addons,autoOpen:!0,indexedDB:y.indexedDB,IDBKeyRange:y.IDBKeyRange,cache:"cloned",maxConnections:1e3},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),k=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:_e,dbReadyPromise:null,cancelOpen:_e,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),_=(k.dbReadyPromise=new Y(function(v){k.dbReadyResolve=v}),k.openCanceller=new Y(function(v,x){k.cancelOpen=x}),this._state=k,this.name=e,this.on=Bt(this,"populate","blocked","versionchange","close",{ready:[Ma,_e]}),this.once=function(v,x){var A=function(){for(var P=[],w=0;w<arguments.length;w++)P[w]=arguments[w];g.on(v).unsubscribe(A),x.apply(g,P)};return g.on(v,A)},this.on.ready.subscribe=ie(this.on.ready.subscribe,function(v){return function(x,A){De.vip(function(){var P,w=g._state;w.openComplete?(w.dbOpenError||Y.resolve().then(x),A&&v(x)):w.onReadyBeingFired?(w.onReadyBeingFired.push(x),A&&v(x)):(v(x),P=g,A||v(function S(){P.on.ready.unsubscribe(x),P.on.ready.unsubscribe(S)}))})}}),this.Collection=(n=this,qt(Lo.prototype,function(S,w){this.db=n;var A=Ln,P=null;if(w)try{A=w()}catch(D){P=D}var w=S._ctx,S=w.table,O=S.hook.reading.fire;this._ctx={table:S,index:w.index,isPrimKey:!w.index||S.schema.primKey.keyPath&&w.index===S.schema.primKey.name,range:A,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:P,or:w.or,valueMapper:O!==Ot?O:null}})),this.Table=(o=this,qt(Nn.prototype,function(v,x,A){this.db=o,this._tx=A,this.name=v,this.schema=x,this.hook=o._allTables[v]?o._allTables[v].hook:Bt(null,{creating:[So,_e],reading:[Po,Ot],updating:[Eo,_e],deleting:[Ao,_e]})})),this.Transaction=(l=this,qt(Ro.prototype,function(v,x,A,P,w){var S=this;v!=="readonly"&&x.forEach(function(O){O=(O=A[O])==null?void 0:O.yProps,O&&(x=x.concat(O.map(function(D){return D.updatesTable})))}),this.db=l,this.mode=v,this.storeNames=x,this.schema=A,this.chromeTransactionDurability=P,this.idbtrans=null,this.on=Bt(this,"complete","error","abort"),this.parent=w||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new Y(function(O,D){S._resolve=O,S._reject=D}),this._completion.then(function(){S.active=!1,S.on.complete.fire()},function(O){var D=S.active;return S.active=!1,S.on.error.fire(O),S.parent?S.parent._reject(O):D&&S.idbtrans&&S.idbtrans.abort(),Te(O)})})),this.Version=(d=this,qt(Go.prototype,function(v){this.db=d,this._cfg={version:v,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(m=this,qt(Vn.prototype,function(v,x,A){if(this.db=m,this._ctx={table:v,index:x===":id"?null:x,or:A},this._cmp=this._ascending=he,this._descending=function(P,w){return he(w,P)},this._max=function(P,w){return 0<he(P,w)?P:w},this._min=function(P,w){return he(P,w)<0?P:w},this._IDBKeyRange=m._deps.IDBKeyRange,!this._IDBKeyRange)throw new oe.MissingAPI})),this.on("versionchange",function(v){0<v.newVersion?console.warn("Another connection wants to upgrade database '".concat(g.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(g.name,"'. Closing db now to resume the delete request.")),g.close({disableAutoOpen:!1})}),this.on("blocked",function(v){!v.newVersion||v.newVersion<v.oldVersion?console.warn("Dexie.delete('".concat(g.name,"') was blocked")):console.warn("Upgrade '".concat(g.name,"' blocked by other connection holding version ").concat(v.oldVersion/10))}),this._maxKey=zt(t.IDBKeyRange),this._createTransaction=function(v,x,A,P){return new g.Transaction(v,x,A,g._options.chromeTransactionDurability,P)},this._fireOnBlocked=function(v){g.on("blocked").fire(v),Kt.toArray().filter(function(x){return x.name===g.name&&x!==g&&!x._state.vcFired}).map(function(x){return x.on("versionchange").fire(v)})},this.use(Wo),this.use(Xo),this.use(Qo),this.use(Ho),this.use(Uo),new Proxy(this,{get:function(v,x,A){var P;return x==="_vip"||(x==="table"?function(w){return Sa(g.table(w),_)}:(P=Reflect.get(v,x,A))instanceof Nn?Sa(P,_):x==="tables"?P.map(function(w){return Sa(w,_)}):x==="_createTransaction"?function(){return Sa(P.apply(this,arguments),_)}:P)}}));this.vip=_,y.forEach(function(v){return v(g)})}var Aa,Et=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",Zo=(gn.prototype.subscribe=function(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})},gn.prototype[Et]=function(){return this},gn);function gn(e){this._subscribe=e}try{Aa={indexedDB:c.indexedDB||c.mozIndexedDB||c.webkitIndexedDB||c.msIndexedDB,IDBKeyRange:c.IDBKeyRange||c.webkitIDBKeyRange}}catch{Aa={indexedDB:null,IDBKeyRange:null}}function ir(e){var t,n=!1,o=new Zo(function(l){var d=Se(e),m,g=!1,y={},k={},_={get closed(){return g},unsubscribe:function(){g||(g=!0,m&&m.abort(),v&&st.storagemutated.unsubscribe(P))}},v=(l.start&&l.start(_),!1),x=function(){return Ga(w)};function A(){return sn(k,y)}var P=function(S){Ca(y,S),A()&&x()},w=function(){var S,O,D;!g&&Aa.indexedDB&&(y={},S={},m&&m.abort(),m=new AbortController,D=(j=>{var B=_t();try{d&&wt();var N=nt(e,j);return N=d?N.finally(rt):N}finally{B&&Ct()}})(O={subscr:S,signal:m.signal,requery:x,querier:e,trans:null}),v||(st.storagemutated.subscribe(P),v=!0),Promise.resolve(D).then(function(j){n=!0,t=j,g||O.signal.aborted||(A()||(k=S,A())?x():(y={},Ga(function(){return!g&&l.next&&l.next(j)})))},function(j){n=!1,["DatabaseClosedError","AbortError"].includes(j==null?void 0:j.name)||g||Ga(function(){g||l.error&&l.error(j)})}))};return setTimeout(x,0),_});return o.hasValue=function(){return n},o.getValue=function(){return t},o}var ht=Ze;function bn(e){var t=lt;try{lt=!0,st.storagemutated.fire(e),dn(e,!0)}finally{lt=t}}I(ht,i(i({},ke),{delete:function(e){return new ht(e,{addons:[]}).delete()},exists:function(e){return new ht(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=ht.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(nn(n)?Promise.resolve(n.databases()).then(function(o){return o.map(function(l){return l.name}).filter(function(l){return l!==ca})}):an(n,t).toCollection().primaryKeys()).then(e)}catch{return Te(new oe.MissingAPI)}var t,n},defineClass:function(){return function(e){b(this,e)}},ignoreTransaction:function(e){return ne.trans?mt(ne.transless||Je,e):e()},vip:rn,async:function(e){return function(){try{var t=un(e.apply(this,arguments));return t&&typeof t.then=="function"?t:Y.resolve(t)}catch(n){return Te(n)}}},spawn:function(e,t,n){try{var o=un(e.apply(n,t||[]));return o&&typeof o.then=="function"?o:Y.resolve(o)}catch(l){return Te(l)}},currentTransaction:{get:function(){return ne.trans||null}},waitFor:function(e,t){return e=Y.resolve(typeof e=="function"?ht.ignoreTransaction(e):e).timeout(t||6e4),ne.trans?ne.trans.waitFor(e):e},Promise:Y,debug:{get:function(){return We},set:function(e){En(e)}},derive:X,extend:b,props:I,override:ie,Events:Bt,on:st,liveQuery:ir,extendObservabilitySet:Ca,getByKeyPath:z,setByKeyPath:Q,delByKeyPath:function(e,t){typeof t=="string"?Q(e,t,void 0):"length"in t&&[].map.call(t,function(n){Q(e,n,void 0)})},shallowClone:Z,deepClone:re,getObjectDiff:pn,cmp:he,asap:M,minKey:-1/0,addons:[],connections:{get:Kt.toArray},errnames:ja,dependencies:Aa,cache:bt,semVer:"4.4.6",version:"4.4.6".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),ht.maxKey=zt(ht.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(st(ga,function(e){lt||(e=new CustomEvent(Qa,{detail:e}),lt=!0,dispatchEvent(e),lt=!1)}),addEventListener(Qa,function(e){e=e.detail,lt||bn(e)}));var kt,lt=!1,sr=function(){};return typeof BroadcastChannel<"u"&&((sr=function(){(kt=new BroadcastChannel(Qa)).onmessage=function(e){return e.data&&bn(e.data)}})(),typeof kt.unref=="function"&&kt.unref(),st(ga,function(e){lt||kt.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!Ze.disableBfCache&&e.persisted){We&&console.debug("Dexie: handling persisted pagehide"),kt!=null&&kt.close();for(var t=0,n=Kt.toArray();t<n.length;t++)n[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!Ze.disableBfCache&&e.persisted&&(We&&console.debug("Dexie: handling persisted pageshow"),sr(),bn({all:new Me(-1/0,[[]])}))})),Y.rejectionMapper=function(e,t){return!e||e instanceof ze||e instanceof TypeError||e instanceof SyntaxError||!e.name||!An[e.name]?e:(t=new An[e.name](t||e.message,e),"stack"in e&&L(t,"stack",{get:function(){return this.inner.stack}}),t)},En(We),i(Ze,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:Ze,Entity:jn,PropModification:Rt,RangeSet:Me,add:function(e){return new Rt({add:e})},cmp:he,default:Ze,liveQuery:ir,mergeRanges:Vt,rangesOverlap:Yn,remove:function(e){return new Rt({remove:e})},replacePrefix:function(e,t){return new Rt({replacePrefix:[e,t]})}}),{default:Ze}),Ze})})(Ta)),Ta.exports}var ks=Es();const wn=Ss(ks),wr=Symbol.for("Dexie"),Ia=globalThis[wr]||(globalThis[wr]=wn);if(wn.semVer!==Ia.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${wn.semVer} and ${Ia.semVer}`);const{liveQuery:tl,mergeRanges:al,rangesOverlap:nl,RangeSet:rl,cmp:ol,Entity:il,PropModification:sl,replacePrefix:ll,add:cl,remove:dl,DexieYProvider:ul}=Ia;class Ts extends Ia{constructor(){super("AnaxagorasAIDatabase");$e(this,"aiSettings");$e(this,"studyBlocks");$e(this,"projectTasks");$e(this,"userProfile");this.version(1).stores({aiSettings:"++id, provider, modelName",studyBlocks:"++id, date, subject, completed, syncedWithGoogle",projectTasks:"++id, subject, currentPhase, dueDate",userProfile:"id, email"})}}const Ce=new Ts;async function Ds(){await Ce.aiSettings.count()===0&&await Ce.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}),await $s(),await Dr()}async function $s(){const p=await Ce.studyBlocks.filter(b=>!b.gradeKey).toArray();if(p.length>0)for(const b of p)b.id&&await Ce.studyBlocks.delete(b.id);const a=await Ce.studyBlocks.filter(b=>b.gradeKey==="1eso").count(),r=await Ce.studyBlocks.filter(b=>b.gradeKey==="2batx").count(),i=new Date().toISOString().split("T")[0],s=new Date(Date.now()+864e5).toISOString().split("T")[0],c=new Date(Date.now()+864e5*2).toISOString().split("T")[0],u=new Date(Date.now()+864e5*3).toISOString().split("T")[0],f=new Date(Date.now()+864e5*4).toISOString().split("T")[0];a===0&&await Ce.studyBlocks.bulkAdd([{title:"Análisis de Oraciones: Sujeto y Complemento Verbal",subject:"Lengua Castellana",date:i,startTime:"17:00",durationMinutes:45,type:"assignment_due",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.",notes:"Identificación del predicado y localización del Complemento Verbal (CV) en bloque.",syncedWithGoogle:!0,googleEventId:"gcal_eso_castellano"},{title:"Ciencias Naturales: El Reino Animal y los Ecosistemas",subject:"Ciencias Naturales",date:s,startTime:"16:30",durationMinutes:40,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.",notes:"Repaso con esquemas visuales de vertebrados e invertebrados.",syncedWithGoogle:!1},{title:"Matemáticas: Fracciones y Operaciones Básicas",subject:"Matemáticas",date:c,startTime:"17:15",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.",notes:"Ejercicios de suma y resta con común denominador.",syncedWithGoogle:!0,googleEventId:"gcal_eso_mates"},{title:"Control Tema 2: Egipto y las Civilizaciones Fluviales",subject:"Ciencias Sociales",date:u,startTime:"09:00",durationMinutes:50,type:"exam",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Control trimestral de departamento programado por el centro educativo.",notes:"Llevar mapa histórico de Mesopotamia y el Nilo.",syncedWithGoogle:!1},{title:"Lectura Guiada: Crónicas Juveniles y Vocabulario",subject:"Tutoría / Lectura",date:f,startTime:"16:00",durationMinutes:30,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.",notes:"Lectura de 2 capítulos y ficha de comprensión lectora.",syncedWithGoogle:!1}]),r===0&&await Ce.studyBlocks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",subject:"Lengua Castellana",date:i,startTime:"17:00",durationMinutes:55,type:"assignment_due",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).",notes:"Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.",syncedWithGoogle:!0,googleEventId:"gcal_batx_castellano"},{title:"Historia de España: La Constitución de 1812 y la Guerra de la Independencia",subject:"Historia de España",date:s,startTime:"18:00",durationMinutes:50,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.",notes:"Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.",syncedWithGoogle:!1},{title:"Matemáticas II: Matrices, Determinantes y Sistemas de Cramer (PAU)",subject:"Matemáticas II",date:c,startTime:"16:30",durationMinutes:60,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo matricial.",notes:"Resolución de problemas de selectividad con discusión según parámetro k.",syncedWithGoogle:!0,googleEventId:"gcal_batx_mates"},{title:"Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)",subject:"Filosofía",date:u,startTime:"11:30",durationMinutes:60,type:"exam",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Prueba oficial de simulacro de Selectividad coordinada por el departamento.",notes:"Comparativa ontológica y epistemológica entre Platón y Descartes.",syncedWithGoogle:!1},{title:"Química: Termodinámica y Cinética Química (PAU)",subject:"Química",date:f,startTime:"17:30",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.",notes:"Cálculo de entalpía estándar y entropía de reacción.",syncedWithGoogle:!1}])}async function Dr(){const p=await Ce.projectTasks.filter(u=>!u.gradeKey).toArray();if(p.length>0)for(const u of p)u.id&&await Ce.projectTasks.delete(u.id);const a=await Ce.projectTasks.filter(u=>!u.topicId).toArray();for(const u of a)u.id&&(u.gradeKey==="1eso"?u.subject.includes("Lengua")?await Ce.projectTasks.update(u.id,{topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1"}):await Ce.projectTasks.update(u.id,{topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1"}):u.gradeKey==="2batx"&&(u.subject.includes("Lengua")?await Ce.projectTasks.update(u.id,{topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1"}):await Ce.projectTasks.update(u.id,{topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1"})));const r=await Ce.projectTasks.filter(u=>u.gradeKey==="1eso").count(),i=await Ce.projectTasks.filter(u=>u.gradeKey==="2batx").count(),s=new Date(Date.now()+864e5*5).toISOString().split("T")[0],c=new Date(Date.now()+864e5*12).toISOString().split("T")[0];r===0&&await Ce.projectTasks.bulkAdd([{title:"Análisis Sintáctico: El Predicado y el Complemento Verbal",subject:"Lengua Castellana y Literatura",gradeKey:"1eso",topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1",dueDate:s,currentPhase:"writing",autonomyScore:75,pedagogicalNote:"Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.",notes:'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',driveFiles:[{fileId:"drive_doc_sintaxis_1eso",name:"Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 1 día"}],criteria:[{id:"c_eso_1",label:'Identificación del Sujeto ("El tren") y el Predicado',checked:!0,explanation:"Diferenciado correctamente quién realiza la acción."},{id:"c_eso_2",label:'Localización del verbo principal ("llegó")',checked:!0,explanation:"Núcleo del predicado identificado."},{id:"c_eso_3",label:'Reconocimiento del Complemento Verbal ("puntual a la estación")',checked:!0,explanation:"Identificado en bloque como acompañante del verbo, sin clasificar subtipos."},{id:"c_eso_4",label:"Redacción de una oración propia con complemento verbal similar",checked:!1,explanation:"Pendiente de redactar y enviar al tutor."}]},{title:"Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad",subject:"Ciencias Naturales",gradeKey:"1eso",topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1",dueDate:c,currentPhase:"research",autonomyScore:50,pedagogicalNote:"Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.",notes:"Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.",driveFiles:[{fileId:"drive_doc_ecosistemas_1eso",name:"Guia_Maqueta_Ecosistemas.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 días"}],criteria:[{id:"c_eco_1",label:"Elección del ecosistema a representar (bosque, río o costa)",checked:!0,explanation:"Seleccionado bosque mediterráneo."},{id:"c_eco_2",label:"Lista de 5 especies autóctonas con su rol trófico",checked:!0,explanation:"Identificados productores, herbívoros y carnívoros."},{id:"c_eco_3",label:"Diseño visual de la maqueta y materiales reciclables",checked:!1,explanation:"En proceso de preparación."}]}]),i===0&&await Ce.projectTasks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)",subject:"Lengua Castellana y Literatura",gradeKey:"2batx",topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1",dueDate:s,currentPhase:"writing",autonomyScore:60,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.",notes:'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',driveFiles:[{fileId:"drive_doc_sintaxis_2batx",name:"Guia_PAU_Tipologia_Complementos_Verbales.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 3 horas"},{fileId:"drive_sheet_pruebas",name:"Matriz_Pruebas_Sintacticas_RAE.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c_batx_1",label:"Segmentación en Sintagmas y delimitación oracional formal",checked:!0,explanation:"SN Sujeto y SV Predicado identificados con precisión."},{id:"c_batx_2",label:'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',checked:!0,explanation:"Diferenciación estricta de la tipología de complementos del predicado."},{id:"c_batx_3",label:"Prueba sintáctica de concordancia para el CPredicativo",checked:!1,explanation:'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'},{id:"c_batx_4",label:"Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC",checked:!1,explanation:"Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales."}]},{title:"Monografía: Energías Renovables en el Mediterráneo",subject:"Ciencias y Tecnología",gradeKey:"2batx",topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1",dueDate:c,currentPhase:"research",autonomyScore:75,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.",notes:"Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.",driveFiles:[{fileId:"drive_doc_01",name:"Borrador_Esquema_Energias.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 horas"},{fileId:"drive_sheet_02",name:"Datos_Produccion_2025.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c1",label:"Formulación de la pregunta de investigación con mis palabras",checked:!0,explanation:"Definido el objetivo sin copia directa de internet."},{id:"c2",label:"Búsqueda y contraste de 3 fuentes académicas fiables",checked:!0,explanation:"Artículos de revistas científicas guardados en Drive."},{id:"c3",label:"Redacción de conclusiones propias basadas en los datos",checked:!1,explanation:"En proceso: reflexionar sobre los resultados sin pedir resumen a la IA."}]}])}const Os=Dr,Pr="anaxagoras_auth_state",Is=["openid","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive.readonly"].join(" ");class Ls{constructor(){$e(this,"state",{isAuthenticated:!0,mode:"demo",user:null,clientId:"",scopes:{calendar:!0,drive:!0,profile:!0}});$e(this,"listeners",[]);this.loadPersistedState()}loadPersistedState(){try{const a=localStorage.getItem(Pr);a?(this.state=JSON.parse(a),this.state.mode==="demo"&&this.state.user&&(this.state.user.gradeKey==="2batx"?(this.state.user.id="google_user_demo_2batx",this.state.user.name="Álvaro Martín (2º Bachillerato)",this.state.user.email="alvaro.martin@ies-catalunya.edu.cat"):(this.state.user.id="google_user_demo_1eso",this.state.user.name="Marc Vidal (1º de ESO)",this.state.user.email="marc.vidal@ies-catalunya.edu.cat"))):this.setDemoState("1eso")}catch{this.setDemoState("1eso")}}setDemoState(a="1eso"){const r=a==="2batx";this.state={isAuthenticated:!0,mode:"demo",clientId:"",user:{id:r?"google_user_demo_2batx":"google_user_demo_1eso",name:r?"Álvaro Martín (2º Bachillerato)":"Marc Vidal (1º de ESO)",email:r?"alvaro.martin@ies-catalunya.edu.cat":"marc.vidal@ies-catalunya.edu.cat",avatarUrl:r?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",gradeLevel:r?"2º de Bachillerato (17-18 años)":"1º de ESO (12 años)",gradeKey:a,stageName:r?"Operaciones Formales (Piaget)":"Operaciones Concretas (Piaget)",connectedAt:new Date().toISOString(),mode:"demo"},scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState()}saveState(){localStorage.setItem(Pr,JSON.stringify(this.state)),this.notify()}getState(){return{...this.state}}subscribe(a){return this.listeners.push(a),a(this.state),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}notify(){for(const a of this.listeners)a(this.state)}setClientId(a){this.state.clientId=a.trim(),this.saveState()}async connectDemo(a="1eso"){return this.setDemoState(a),this.state.user}setGradeProfile(a){if(!this.state.user){this.setDemoState(a);return}a==="1eso"?this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_1eso":this.state.user.id,name:this.state.mode==="demo"?"Marc Vidal (1º de ESO)":this.state.user.name,email:this.state.mode==="demo"?"marc.vidal@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"1º de ESO (12 años)",gradeKey:"1eso",stageName:"Operaciones Concretas (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl}:this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_2batx":this.state.user.id,name:this.state.mode==="demo"?"Álvaro Martín (2º Bachillerato)":this.state.user.name,email:this.state.mode==="demo"?"alvaro.martin@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl},this.saveState()}toggleGradeProfile(){var r;const a=((r=this.state.user)==null?void 0:r.gradeKey)||"1eso";this.setGradeProfile(a==="1eso"?"2batx":"1eso")}async connectRealGoogle(a){var i,s;const r=a||this.state.clientId;if(!r)throw new Error("Debes introducir un Google OAuth Client ID válido para conectar en modo real.");if(this.state.clientId=r,await this.ensureGoogleSDKLoaded(),!((s=(i=window.google)==null?void 0:i.accounts)!=null&&s.oauth2))throw new Error("La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.");return new Promise((c,u)=>{try{window.google.accounts.oauth2.initTokenClient({client_id:r,scope:Is,callback:async b=>{if(b.error){u(new Error(`Error de autenticación Google: ${b.error}`));return}if(!b.access_token){u(new Error("No se recibió token de acceso de Google."));return}try{const h=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${b.access_token}`}});if(!h.ok)throw new Error("Fallo al obtener información del perfil del usuario de Google.");const C=await h.json(),T={id:C.sub||`google_${Date.now()}`,name:C.name||"Álvaro Martín (2º de Bachillerato)",email:C.email||"alvaro.estudiante@batxillerat.cat",avatarUrl:C.picture||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",connectedAt:new Date().toISOString(),mode:"real"};this.state={isAuthenticated:!0,mode:"real",clientId:r,accessToken:b.access_token,tokenExpiry:Date.now()+(b.expires_in||3600)*1e3,user:T,scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState(),c(T)}catch(h){u(h)}},error_callback:b=>{u(new Error((b==null?void 0:b.message)||"Error en el diálogo de inicio de sesión de Google."))}}).requestAccessToken({prompt:"consent"})}catch(f){u(f)}})}async ensureGoogleSDKLoaded(){var a,r;if(!((r=(a=window.google)==null?void 0:a.accounts)!=null&&r.oauth2))return new Promise(i=>{let s=0;const c=setInterval(()=>{var u,f;s++,((f=(u=window.google)==null?void 0:u.accounts)!=null&&f.oauth2||s>25)&&(clearInterval(c),i())},100)})}getAccessToken(){return this.state.mode==="real"&&this.state.accessToken?this.state.tokenExpiry&&Date.now()>this.state.tokenExpiry?(console.warn("[GoogleAuth] Token de acceso expirado."),null):this.state.accessToken:null}disconnect(){this.state={isAuthenticated:!1,mode:"demo",user:null,accessToken:void 0,tokenExpiry:void 0,clientId:this.state.clientId,scopes:{calendar:!1,drive:!1,profile:!1}},this.saveState()}}const Le=new Ls,$r=`# ⚡ Prompt de Sistema: Generador de Desafíos de Memoria Activa (Active Recall)\r
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
`,Or=`# ⏱️ Pilar 1: Distribución Homogénea del Tiempo y Carga Cognitiva Equilibrada
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
`,Ir=`# 🎯 Pilar 2: Ordenación por Prioridad y Balance de Materias
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
`,Lr=`# 📅 Pilar 3: Fechas de Compromiso: Exámenes y Entregas de Trabajos
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
`,jr=`# 🔄 Pilar 4: Adaptabilidad Dinámica, Novedades Docentes y Persistencia Local
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
`,Mr=`# 🧠 Arquitectura de Prompt de Agenda: Mentor Socrático de Tiempo y Hábitos
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
`,Rr=`# 🧠 Prompt de Sistema: Planificador Inteligente de Agenda y Estudio (STI)\r
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
`,Sn=`# ⚡ Nivel 1: Generador de Desafíos de Recuperación Activa (Active Recall)
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
`,Br=`# 🧠 Nivel 1: Planificador Inteligente de Agenda y Hábitos de Estudio
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
`,qr=`# 📝 Nivel 1: Asistente Pedagógico de Trabajos y Proyectos
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
`,Nr=`# 🧠 Nivel 1: Tutor Socrático Inteligente (STI)
*Rol: Mentor Metodológico y Andamiaje Cognitivo*

Eres **Anaxagoras Socratic AI**, el Sistema de Tutoría Inteligente (STI) basado en el método socrático y la pedagogía activa para estudiantes de 6 a 18 años.

---

## 🚫 REGLA SAGRADA (NON-NEGOTIABLE)
**NUNCA proporciones la respuesta directa, el resultado numérico, la traducción final ni el texto redactado al estudiante.**

Si el alumno solicita la resolución directa (*"dame la solución"*, *"resuélvemelo"*, *"dime qué pongo"*):
1. **Rechazo empático y motivador:** Felicita su iniciativa pero explícale que darle el resultado anularía su entrenamiento cognitivo.
2. **Descomposición:** Divide el problema en micro-pasos alcanzables.
3. **Pregunta guía única:** Concluye siempre formulando una única pregunta reflexiva para que él dé el siguiente paso.

---

## 🧩 Protocolo Socrático de Interacción
1. **Diagnóstico Activo:** Pregunta qué sabe o qué ha intentado hasta ahora en lugar de asumir su punto de partida.
2. **Andamiaje Progresivo (Scaffolding):** Ofrece pistas contextuales, analogías cotidianas o contraejemplos; jamás afirmaciones categóricas concluyentes.
3. **Verificación de Metacognición:** Cuando el estudiante alcance la deducción correcta, pídele que justifique brevemente **por qué** es válida para consolidar la memoria a largo plazo.
4. **Tono y Lenguaje:** Cálido, estimulante, empático y libre de condescendencia. Adapta la complejidad léxica a la edad y estadio del alumno.
5. **Idioma:** Responde en el idioma vehicular en que se comunique el estudiante (Castellano, Català, Galego, Euskera o Valencià).
`,zr=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Sujeto y Complemento Verbal en Bloque
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
- **Criterio de éxito:** El alumno debe señalar por sí mismo las 3 partes (Sujeto, Verbo y CV en bloque).
`,Fr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Sujeto Pospuesto
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
`,Kr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Plural y Contexto Narrativo
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
`,Gr=`# 🎯 Nivel 2.B: Foco de Actividad — Problema de Reparto Cotidiano con Fracciones
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
`,Vr=`# 🎯 Nivel 2.B: Foco de Actividad — Suma y Resta de Fracciones con Común Denominador
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
`,Hr=`# 🎯 Nivel 2.B: Foco de Actividad — Maqueta de Ecosistemas y Cadenas Tróficas
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
`,Ur=`# 🎯 Nivel 2.B: Foco de Actividad — Mapa Comparativo: Nilo y Tigris-Éufrates
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
`,Wr=`# 🎯 Nivel 2.B: Foco de Actividad — Ficha de Lectura y Deducción Léxica
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
`,Qr=`# 🏛️ Nivel 2.A: Línea Base Temática — Sintaxis de la Oración Simple
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
`,Yr=`# 🏛️ Nivel 2.A: Línea Base Temática — Fracciones y Operaciones Básicas
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
`,Jr=`# 🏛️ Nivel 2.A: Línea Base Temática — Ecosistemas y Cadenas Tróficas
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
`,Xr=`# 🏛️ Nivel 2.A: Línea Base Temática — Primeras Civilizaciones Fluviales
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
`,Zr=`# 🏛️ Nivel 2.A: Línea Base Temática — Comprensión Lectora y Hábitos Literarios
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
`,eo=`# 🎯 Nivel 2.B: Foco de Actividad — Redacción Comparativa: Caverna Platónica vs Genio Maligno
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
`,to=`# 🎯 Nivel 2.B: Foco de Actividad — Comentario Histórico: El Manifiesto de los Persas (1814)
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
`,ao=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Complemento Predicativo del Sujeto
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
`,no=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Complemento Predicativo de Complemento Directo
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
`,ro=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Contraste Riguroso entre CPred y CCM
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
`,oo=`# 🎯 Nivel 2.B: Foco de Actividad — Discusión de un Sistema Lineal según el Parámetro k (PAU)
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
`,io=`# 🎯 Nivel 2.B: Foco de Actividad — Desplazamiento de Equilibrio por Efecto de Presión y Temperatura
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
`,so=`# 🎯 Nivel 2.B: Foco de Actividad — Monografía: Viabilidad de la Eólica Marina Flotante en el Mediterráneo
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
`,lo=`# 🏛️ Nivel 2.A: Línea Base Temática — Teoría del Conocimiento: Platón y Descartes (PAU)
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
`,co=`# 🏛️ Nivel 2.A: Línea Base Temática — Crisis del Antiguo Régimen y Cortes de Cádiz
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
`,uo=`# 🏛️ Nivel 2.A: Línea Base Temática — Tipología y Pruebas de Complementos Verbales (PAU)
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
`,po=`# 🏛️ Nivel 2.A: Línea Base Temática — Sistemas de Ecuaciones Lineales y Matrices (PAU)
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
`,mo=`# 🏛️ Nivel 2.A: Línea Base Temática — Termodinámica Química y Equilibrio Químico (PAU)
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
`,fo=`# 🏛️ Nivel 2.A: Línea Base Temática — Transición Energética y Energías Renovables
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
`,go=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 1º de Educación Secundaria Obligatoria (ESO)
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
`,bo=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 2º de Bachillerato (Preparación PAU)
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
`,ho=`# ⚖️ Nivel 3: Marco Regulador Ético y Deontológico de la Inteligencia Artificial en Educación
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
`,vo=`# 📝 Prompt de Sistema: Asistente Pedagógico de Trabajos y Proyectos (STI)\r
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
`,yo=`# 🧠 Prompt de Sistema: Tutor Socrático Inteligente (STI)\r
\r
Eres **Anaxagoras AI**, un Sistema de Tutoría Inteligente (STI) diseñado para estudiantes de 6 a 18 años, basado en los principios de la pedagogía activa y el método socrático.\r
\r
---\r
\r
## 🚫 REGLA SAGRADA (NON-NEGOTIABLE)\r
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
## 🧩 Protocolo Socrático de Interacción\r
1. **Diagnóstico inicial:** Formula una pregunta breve para evaluar qué sabe y qué no sabe el alumno sobre el problema.\r
2. **Descomposición:** Si el problema es complejo, divídelo en pasos sencillos e interactivos.\r
3. **Pistas reflexivas (Scaffolding):** Brinda analogías visuales o preguntas orientativas, jamás la respuesta.\r
4. **Verificación de asimilación:** Cuando el estudiante llegue a la respuesta correcta por sí mismo, felicítale y pídele que explique brevemente **por qué** es correcta para afianzar el aprendizaje significativo.\r
5. **Idioma:** Responde siempre en el idioma que esté utilizando el estudiante (Castellano, Català, Galego, Euskera o Valencià).\r
6. **Formato:** Respuestas breves (máximo 2-3 párrafos cortos). Termina SIEMPRE con UNA sola pregunta estimulante.\r
\r
---\r
\r
## 🏛️ Inyección de Directrices Curriculares\r
Este System Prompt general de sección define la metodología socrática transversal. En tiempo de ejecución se combina dinámicamente con la **Directriz Curricular Departamental** específica de la materia y del curso del alumno (proporcionada por la API educativa institucional, e.g. Esfer@).\r
`,js=Object.assign({"../prompts/active_recall_generator.md":$r,"../prompts/agenda/1_distribucion_homogenea.md":Or,"../prompts/agenda/2_orden_prioridad.md":Ir,"../prompts/agenda/3_fechas_compromiso.md":Lr,"../prompts/agenda/4_adaptabilidad_ocio.md":jr,"../prompts/agenda/agenda_planner_master.md":Mr,"../prompts/agenda_planner.md":Rr,"../prompts/nivel_1_funcional/active_recall_generator.md":Sn,"../prompts/nivel_1_funcional/agenda_planner.md":Br,"../prompts/nivel_1_funcional/project_guide.md":qr,"../prompts/nivel_1_funcional/socratic_tutor.md":Nr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":zr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Fr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Kr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":Zr,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":eo,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":to,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":ao,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":no,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":ro,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":oo,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":io,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":so,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":lo,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":co,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":uo,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":po,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":mo,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":fo,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":go,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":bo,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":ho,"../prompts/project_guide.md":vo,"../prompts/socratic_tutor.md":yo});function Ut(p){const a=p.replace(/\\/g,"/").toLowerCase();for(const[r,i]of Object.entries(js))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return i;return""}class Ms{assembleAgendaPrompt(a="1eso"){const r=a==="2batx",i=r?"2º de Bachillerato (PAU)":"1º de ESO",s=Ut("agenda/1_distribucion_homogenea.md"),c=Ut("agenda/2_orden_prioridad.md"),u=Ut("agenda/3_fechas_compromiso.md"),f=Ut("agenda/4_adaptabilidad_ocio.md"),b=Ut("agenda/agenda_planner_master.md"),h={id:"time_distribution",badge:"Pilar 1: Distribución Homogénea",title:"Distribución Homogénea del Tiempo y Carga Cognitiva",subtitle:`Práctica espaciada, límite diario (${r?"90-135 min":"45-75 min"}) y blindaje del ocio`,source:"src/prompts/agenda/1_distribucion_homogenea.md",content:s},C={id:"priority_order",badge:"Pilar 2: Ordenación por Prioridad",title:"Ordenación por Prioridad y Alternancia Cognitiva (Interleaving)",subtitle:"Ponderación según dificultad relativa, balance de materias y avance de tareas",source:"src/prompts/agenda/2_orden_prioridad.md",content:c},T={id:"commitment_deadlines",badge:"Pilar 3: Fechas de Compromiso",title:"Fechas de Compromiso: Exámenes y Entregas de Trabajos",subtitle:"Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento",source:"src/prompts/agenda/3_fechas_compromiso.md",content:u},I={id:"adaptive_flexibility",badge:"Pilar 4: Adaptabilidad y Formato",title:"Adaptabilidad Dinámica, Novedades Docentes (+1d) y JSON Local",subtitle:"Flexibilidad ante imprevistos, escucha empática y persistencia en IndexedDB",source:"src/prompts/agenda/4_adaptabilidad_ocio.md",content:f},K=`
${b}

---
=== [PILAR 1: DISTRIBUCIÓN HOMOGÉNEA DEL TIEMPO Y PROTECCIÓN DEL DESCANSO] ===
${s}
=============================================================================

---
=== [PILAR 2: ORDENACIÓN MULTIVARIABLE POR PRIORIDAD E INTERLEAVING] ===
${c}
========================================================================

---
=== [PILAR 3: GESTIÓN DE FECHAS DE COMPROMISO (EXÁMENES Y ENTREGAS)] ===
${u}
=======================================================================

---
=== [PILAR 4: ADAPTABILIDAD, RESPUESTA EMPÁTICA Y FORMATO DE EMISIÓN] ===
${f}
=========================================================================

CONTEXTO INSTITUCIONAL DE ETAPA DEL ESTUDIANTE:
- Curso Académico: ${i}
- Límite diario vespertino aconsejado: ${r?"Máximo 135 minutos repartidos en 2-3 bloques de 45 min":"Máximo 75 minutos repartidos en 1-2 bloques de 45 min"}
- Tiempo de descanso y ocio protegido tras las 15:00: Mínimo 3.5 a 4 horas libres para desconexión y deporte
- Compromisos prioritarios: Atender de forma preferente hitos con vencimiento inferior a 72 horas.
`.trim();return{role:"agenda",gradeKey:a,title:`Planificador Neuroeducativo de Agenda (${i})`,subtitle:"Distribución homogénea, ordenación por prioridad y gestión de compromisos (exámenes y entregas)",systemInstruction:K,pillars:{timeDistribution:h,priorityOrder:C,commitmentDeadlines:T,adaptiveFlexibility:I}}}getCurricularDirective(a="1eso"){return a==="2batx"?{title:"Directriz Curricular sobre Gestión del Tiempo, Preparación PAU y Prevención del Burnout",subtitle:"Departament d'Educació / Coordinació de les Proves d'Accés a la Universitat (2º de Batxillerat)",institution:"Consell Interuniversitari de Catalunya & Departament d'Educació",sourceApi:"https://api.educacio.gencat.cat/v1/agenda/directrius?curs=2batx",content:`
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
`.trim()}}}const xo=new Ms,Rs=Object.assign({"../prompts/active_recall_generator.md":$r,"../prompts/agenda/1_distribucion_homogenea.md":Or,"../prompts/agenda/2_orden_prioridad.md":Ir,"../prompts/agenda/3_fechas_compromiso.md":Lr,"../prompts/agenda/4_adaptabilidad_ocio.md":jr,"../prompts/agenda/agenda_planner_master.md":Mr,"../prompts/agenda_planner.md":Rr,"../prompts/nivel_1_funcional/active_recall_generator.md":Sn,"../prompts/nivel_1_funcional/agenda_planner.md":Br,"../prompts/nivel_1_funcional/project_guide.md":qr,"../prompts/nivel_1_funcional/socratic_tutor.md":Nr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":zr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Fr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Kr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":Zr,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":eo,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":to,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":ao,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":no,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":ro,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":oo,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":io,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":so,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":lo,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":co,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":uo,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":po,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":mo,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":fo,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":go,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":bo,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":ho,"../prompts/project_guide.md":vo,"../prompts/socratic_tutor.md":yo});function tt(p){const a=p.replace(/\\/g,"/").toLowerCase();for(const[r,i]of Object.entries(Rs))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return i;return""}class Bs{constructor(){$e(this,"TOPIC_DEFINITIONS",[{id:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",name:"Sintaxis de la Oración Simple: Sujeto y Complemento Verbal",fileKey:"nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md",keyConcepts:["Sujeto y Predicado","Verbo","Complemento Verbal (en bloque)"],pedagogicalNote:'Estadio de Operaciones Concretas (Piaget): Identificación visual y holística del Sujeto y el Complemento Verbal en bloque ("locomotora y vagones"), sin clasificaciones abstractas prematuras.'},{id:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",name:"Ecosistemas y Cadenas Tróficas en el Bosque Mediterráneo",fileKey:"nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md",keyConcepts:["Biotopo y Biocenosis","Niveles Tróficos","Equilibrio Ecológico"],pedagogicalNote:"Modelado intuitivo y visual de las relaciones interespecíficas y flujo de materia/energía a partir de observaciones directas del bosque mediterráneo."},{id:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",name:"Fracciones y Operaciones Básicas en Problemas Cotidianos",fileKey:"nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md",keyConcepts:["Fracciones Equivalentes","Común Denominador","Reparto Proporcional"],pedagogicalNote:"Aproximación geométrica y tangible al concepto de parte-todo y proporcionalidad antes de la abstracción algorítmica formal."},{id:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",name:"Primeras Civilizaciones Fluviales: Mesopotamia y Egipto",fileKey:"nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md",keyConcepts:["El Río como Motor","Sociedad Jerarquizada","Escritura Cuneiforme/Jeroglífica"],pedagogicalNote:"Causalidad histórica fundamental: comprensión del condicionamiento geográfico en la aparición de los primeros estados y códigos normativos."},{id:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",name:"Comprensión Lectora y Deducción Léxica en Novela Juvenil",fileKey:"nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md",keyConcepts:["Estructura Narrativa","Vocabulario por Contexto","Paráfrasis"],pedagogicalNote:"Fomento del razonamiento inferencial y deducción léxica mediante el diálogo socrático guiado sin recurrir a definiciones pasivas."},{id:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",name:"Tipología y Pruebas de Complementos Verbales (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md",keyConcepts:["CPredicativo (concordancia)","CRV vs CC","Pruebas sintácticas PAU"],pedagogicalNote:"Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor filológico con pruebas morfosintácticas estrictas (concordancia, conmutación) para las PAU."},{id:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",name:"Crisis del Antiguo Régimen, Constitución de 1812 y Fernando VII",fileKey:"nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md",keyConcepts:["Cortes de Cádiz","Constitución de 1812","Manifiesto de los Persas"],pedagogicalNote:"Análisis historiográfico dialéctico: contraste de textos y decretos originales bajo los criterios de rigor conceptual de las pruebas PAU."},{id:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",name:"Sistemas de Ecuaciones Lineales y Matrices con Parámetros (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md",keyConcepts:["Rouché-Frobenius","Regla de Cramer","Discusión con Parámetro k"],pedagogicalNote:"Razonamiento deductivo y generalización formal de rangos matriciales ante sistemas indeterminados con parámetros."},{id:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",name:"Teoría del Conocimiento: Platón vs Descartes (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md",keyConcepts:["Mito de la Caverna","Duda Metódica y Cogito","Ideas Innatas"],pedagogicalNote:"Pensamiento crítico y dialéctica epistemológica: formulación de tesis, antítesis y justificación argumentativa estructurada."},{id:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",name:"Termodinámica Química y Principio de Le Chatelier (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md",keyConcepts:["Entalpía y Entropía","Equilibrio Químico Kc/Kp","Le Chatelier"],pedagogicalNote:"Predicción fisicoquímica cuantitativa y cualitativa del equilibrio ante perturbaciones en reactores cerrados."},{id:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",name:"Transición Energética y Viabilidad de Eólica Marina en el Mediterráneo",fileKey:"nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md",keyConcepts:["Eólica Marina Flotante","LCOE y Descarbonización","Impacto Ambiental"],pedagogicalNote:"Pensamiento de ingeniería y sostenibilidad: análisis multidimensional de viabilidad técnica, energética y ambiental."}]);$e(this,"ACTIVITY_DEFINITIONS",[{id:"act_lengua_1eso_1",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: "El tren llegó puntual a la estación"',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base (Sujeto inicial + CV en bloque)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md"},{id:"act_lengua_1eso_2",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: Sujeto pospuesto ("Por la mañana sonó ruidosa la alarma")',sentenceOrCase:"Por la mañana sonó ruidosa la alarma en el pasillo.",variationType:"Variación de orden oracional (Sujeto pospuesto)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md"},{id:"act_lengua_1eso_3",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Plural y contexto ("Los jóvenes exploradores regresaron...")',sentenceOrCase:"Los jóvenes exploradores regresaron cansados al campamento al anochecer.",variationType:"Variación léxica y plural (Consolidación y transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md"},{id:"act_naturales_1eso_1",topicId:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",order:1,title:"Maqueta de Ecosistemas y Cadenas Tróficas",sentenceOrCase:"Diseño de maqueta de bosque mediterráneo con 4 niveles tróficos.",variationType:"Proyecto Guiado de Aula",fileKey:"nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md"},{id:"act_mates_1eso_1",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:1,title:"Suma y Resta de Fracciones con Común Denominador",sentenceOrCase:"Calcular: 3/8 + 7/8 - 2/8 y simplificar.",variationType:"Cálculo Aritmético Visual",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md"},{id:"act_mates_1eso_2",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:2,title:"Problema Cotidiano de Reparto Proporcional",sentenceOrCase:"En una clase de 24 alumnos, 2/3 practican deporte y 1/6 música.",variationType:"Variación Contextualizada (Transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md"},{id:"act_sociales_1eso_1",topicId:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",order:1,title:"Mapa Histórico: Nilo y Tigris-Éufrates",sentenceOrCase:"Localización del Creciente Fértil y función agrícola del limo fluvial.",variationType:"Análisis Cartográfico y Causal",fileKey:"nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md"},{id:"act_tutoria_1eso_1",topicId:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",order:1,title:"Ficha de Lectura y Deducción Léxica",sentenceOrCase:"Resumen propio y deducción de vocabulario en contexto de novela juvenil.",variationType:"Lectura Crítica y Vocabulario",fileKey:"nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md"},{id:"act_lengua_2batx_1",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: CPred de Sujeto ("El tren llegó puntual a la estación")',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base PAU (Prueba de concordancia con Sujeto)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md"},{id:"act_lengua_2batx_2",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: CPred de CD ("El tribunal consideró inocente al acusado")',sentenceOrCase:"El tribunal consideró inocente al acusado tras el juicio.",variationType:"Variación de doble predicación (Concordancia con CD)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md"},{id:"act_lengua_2batx_3",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Contraste Riguroso CPred vs CCM ("puntual" vs "puntualmente")',sentenceOrCase:"El tren llegó puntual / puntualmente a la estación.",variationType:"Contraejemplo Trampa (Adjetivo variable vs Adverbio invariable)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md"},{id:"act_historia_2batx_1",topicId:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",order:1,title:"Comentario Histórico: Manifiesto de los Persas (1814)",sentenceOrCase:"Comentario guiado del fragmento absolutista de 1814 presentado a Fernando VII.",variationType:"Comentario PAU de Fuente Primaria",fileKey:"nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md"},{id:"act_mates_2batx_1",topicId:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",order:1,title:"Discusión de Sistema con Parámetro k (Rouché-Frobenius)",sentenceOrCase:"Discutir y resolver para SCI el sistema 3x3 en función de k.",variationType:"Problema Oficial PAU de Álgebra Matricial",fileKey:"nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md"},{id:"act_filosofia_2batx_1",topicId:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",order:1,title:"Ensayo Comparativo: Caverna Platónica vs Genio Maligno",sentenceOrCase:"Superación del engaño sensorial en Platón (anamnesis) y Descartes (cogito).",variationType:"Redacción Contrastiva PAU",fileKey:"nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md"},{id:"act_quimica_2batx_1",topicId:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",order:1,title:"Desplazamiento de Equilibrio por Presión y Temperatura (Haber-Bosch)",sentenceOrCase:"Predicción razonada en síntesis de NH3 según Le Chatelier y termodinámica.",variationType:"Problema Razonado PAU de Equilibrio Químico",fileKey:"nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md"},{id:"act_tecnologia_2batx_1",topicId:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",order:1,title:"Monografía: Viabilidad de Eólica Marina Flotante en el Mediterráneo",sentenceOrCase:"Análisis de LCOE, batimetría y evacuación HVDC frente a costa valenciana y balear.",variationType:"Monografía de Investigación Científica",fileKey:"nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md"}])}getTopicsForGrade(a){return this.TOPIC_DEFINITIONS.filter(r=>r.gradeKey===a).map(r=>({...r,markdownContent:tt(r.fileKey)}))}getActivitiesForTopic(a){return this.ACTIVITY_DEFINITIONS.filter(r=>r.topicId===a).map(r=>({...r,markdownContent:tt(r.fileKey)})).sort((r,i)=>r.order-i.order)}findTopicById(a){const r=this.TOPIC_DEFINITIONS.find(i=>i.id===a);if(r)return{...r,markdownContent:tt(r.fileKey)}}findTopicBySubjectOrKeyword(a,r,i=""){const s=this.getTopicsForGrade(r),c=a.toLowerCase(),u=i.toLowerCase();if(u){const b=s.find(h=>h.name.toLowerCase().includes(u)||h.keyConcepts.some(C=>C.toLowerCase().includes(u)));if(b)return b}const f=s.find(b=>b.subject.toLowerCase().includes(c)||c.includes(b.subject.toLowerCase()));return f||s[0]}findActivityById(a){const r=this.ACTIVITY_DEFINITIONS.find(i=>i.id===a);if(r)return{...r,markdownContent:tt(r.fileKey)}}assemblePrompt(a){const{role:r,gradeKey:i}=a,s=r==="agenda"?"nivel_1_funcional/agenda_planner.md":r==="project"?"nivel_1_funcional/project_guide.md":r==="recall"?"nivel_1_funcional/active_recall_generator.md":"nivel_1_funcional/socratic_tutor.md",c=tt(s),u={level:"level1",badge:"Nivel 1: Funcional",title:r==="agenda"?"Planificador de Agenda":r==="project"?"Mentor de Trabajos":r==="recall"?"Generador de Active Recall":"Tutor Socrático Inteligente",subtitle:"Metodología pedagógica y guardrails no negociables",source:`src/prompts/${s}`,content:c},f=tt("nivel_3_regulador/etica_y_principios_ia.md"),h=tt(i==="2batx"?"nivel_3_regulador/criterios_generales_2batx.md":"nivel_3_regulador/criterios_generales_1eso.md"),C=`${f}

---

${h}`.trim(),T={level:"level3",badge:"Nivel 3: Marco Regulador",title:i==="2batx"?"Criterios Preuniversitarios (PAU) y Ética de la IA":"Criterios LOMLOE (1º ESO) y Ética de la IA",subtitle:"Ministerio de Educación / Deontología de Inteligencia Artificial",source:"src/prompts/nivel_3_regulador/",content:C};let I;a.topicId?I=this.findTopicById(a.topicId)||this.findTopicBySubjectOrKeyword(a.subject||"Lengua",i):I=this.findTopicBySubjectOrKeyword(a.subject||"Lengua",i);const K=I.markdownContent||tt(I.fileKey),L={level:"level2A",badge:"Nivel 2.A: Línea Base Temática",title:I.name,subtitle:`${I.subject} • ${i==="2batx"?"2º de Bachillerato":"1º de ESO"}`,source:`src/prompts/${I.fileKey}`,content:K},X=this.getActivitiesForTopic(I.id);let $;a.activityId?$=this.findActivityById(a.activityId)||X[0]:X.length>0&&($=X[0]);let V;if($){const ie=$.markdownContent||tt($.fileKey);V={level:"level2B",badge:"Nivel 2.B: Tarea y Variación",title:$.title,subtitle:`Variación: ${$.variationType}`,source:`src/prompts/${$.fileKey}`,content:ie}}const U=`
${u.content}

---
=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===
${T.content}
==================================================

---
=== [DIRECTRIZ Y LÍNEA BASE TEMÁTICA - NIVEL 2.A] ===
Materia: ${I.subject}
Tema Base: ${I.name}
${L.content}
======================================================

${V?`
---
=== [FOCO DE LA ACTIVIDAD CONCRETA Y VARIACIÓN - NIVEL 2.B] ===
Actividad: ${V.title}
Tipo de Variación: ${($==null?void 0:$.variationType)||"Caso de Estudio"}
${V.content}
================================================================
`:""}

CONTEXTO DINÁMICO DE EJECUCIÓN:
- Grado del Estudiante: ${i==="2batx"?"2º de Bachillerato (17-18 años - PAU)":"1º de ESO (12 años - Operaciones Concretas)"}
- Asignatura: ${I.subject}
- Tema Curricular Activo: ${I.name}
${$?`- Actividad Específica en Curso: ${$.title} ("${$.sentenceOrCase}")`:""}
`.trim();return{role:r,gradeKey:i,subject:I.subject,topicId:I.id,topicName:I.name,activityId:$==null?void 0:$.id,activityTitle:$==null?void 0:$.title,systemInstruction:U,layers:{level1Functional:u,level3Regulatory:T,level2BaseTopic:L,level2SpecificActivity:V}}}assembleAgendaPrompt(a="1eso"){return xo.assembleAgendaPrompt(a)}}const qe=new Bs,_o={recall:Sn};class qs{async getSettings(){const a=await Ce.aiSettings.toCollection().first();return a||{provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}}async updateSettings(a){const r=await Ce.aiSettings.toCollection().first();r&&r.id?await Ce.aiSettings.update(r.id,{...a,updatedAt:new Date().toISOString()}):await Ce.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString(),...a})}async testConnection(a){try{const r=`${a.endpointUrl.replace(/\/+$/,"")}/models`,i={"Content-Type":"application/json"};a.apiKey&&(i.Authorization=`Bearer ${a.apiKey.trim()}`);const s=new AbortController,c=setTimeout(()=>s.abort(),4e3),u=await fetch(r,{method:"GET",headers:i,signal:s.signal});return clearTimeout(c),u.ok?{success:!0,message:`Conexión exitosa con ${a.endpointUrl}`}:{success:!1,message:`El servidor respondió con código ${u.status}: ${u.statusText}`}}catch{return{success:!1,message:`No se pudo conectar con ${a.endpointUrl}. Modo socrático local simulado activo.`}}}async callLLM(a,r){var s,c,u;const i=await this.getSettings();try{const f=`${i.endpointUrl.replace(/\/+$/,"")}/chat/completions`,b={"Content-Type":"application/json"};i.apiKey&&(b.Authorization=`Bearer ${i.apiKey.trim()}`);const h=[];for(const K of r){if(!K.content||!K.content.trim())continue;const L=h[h.length-1];L&&L.role===K.role?L.content.trim()!==K.content.trim()&&(L.content=`${L.content}

${K.content.trim()}`):h.push({role:K.role,content:K.content.trim()})}const C=new AbortController,T=setTimeout(()=>C.abort(),3e4),I=await fetch(f,{method:"POST",headers:b,signal:C.signal,body:JSON.stringify({model:i.modelName,messages:[{role:"system",content:a},...h],temperature:i.temperature})});if(clearTimeout(T),I.ok){const L=(u=(c=(s=(await I.json()).choices)==null?void 0:s[0])==null?void 0:c.message)==null?void 0:u.content;if(L)return L.trim()}else{const K=await I.text();console.error(`[AI Client] Error HTTP ${I.status} (${I.statusText}) en ${f}:`,K)}}catch(f){console.warn("[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:",f)}return null}async generateSocraticResponse(a,r,i,s,c){const f=Le.getState().user,b=(f==null?void 0:f.gradeKey)||"1eso",C=qe.assemblePrompt({role:"socratic",gradeKey:b,subject:r,topicId:i.startsWith("topic_")||i.startsWith("t_")?i:void 0,activityId:c}).systemInstruction,I=s.filter((L,X)=>!(X===s.length-1&&L.role==="student"&&L.content.trim()===a.trim())).slice(-6).map(L=>({role:L.role==="tutor"?"assistant":"user",content:L.content})),K=await this.callLLM(C,[...I,{role:"user",content:a}]);return K?{id:`msg_${Date.now()}`,role:"tutor",content:K,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Cómo relaciono esto con la teoría?","Quiero resolver el siguiente paso","Dame un ejemplo similar"]}:(await new Promise(L=>setTimeout(L,500)),this.createSimulatedSocraticResponse(a,r,i,b))}calculateAgendaStats(a){const r=new Date().toISOString().split("T")[0],i=a.filter($=>!$.completed&&($.type==="exam"||$.type==="assignment_due")).map($=>{const V=new Date($.date).getTime()-new Date(r).getTime(),U=Math.ceil(V/864e5);return{title:$.title,subject:$.subject,date:$.date,type:$.type,daysLeft:U}}).sort(($,V)=>$.daysLeft-V.daysLeft),s=a.filter($=>$.date===r),c=s.filter($=>!$.completed&&$.type!=="class").reduce(($,V)=>$+(V.durationMinutes||45),0),f=Math.max(0,390-c),b=Math.round(f/60*10)/10,h=new Map;let C=0;for(const $ of a){if($.type==="class")continue;const V=$.durationMinutes||45;C+=V;const U=h.get($.subject)||{minutes:0,count:0};U.minutes+=V,U.count+=1,h.set($.subject,U)}const T=Array.from(h.entries()).map(([$,V])=>({subject:$,minutes:V.minutes,blockCount:V.count,percentage:C>0?Math.round(V.minutes/C*100):0})).sort(($,V)=>V.minutes-$.minutes),I=a.filter($=>$.type==="assignment_due"),K=I.filter($=>$.completed).length,L=I.length,X=L>0?Math.round(K/L*100):100;return{urgentPriorities:i,afternoonDistribution:{classesEndTime:"15:00",todayStudyMinutes:c,freeTimeHours:b,totalBlocksToday:s.length},subjectBreakdown:T,homeworkProgress:{completed:K,total:L,percentage:X}}}async generatePlanificationDialogue(a,r,i){var X,$,V;const s=this.calculateAgendaStats(a),c=Le.getState(),u=((X=c.user)==null?void 0:X.name)||"Estudiante",f=(($=c.user)==null?void 0:$.gradeLevel)||"1º de ESO",b=((V=c.user)==null?void 0:V.gradeKey)||"1eso",h=new Date().toISOString().split("T")[0],T=`
${xo.assembleAgendaPrompt(b).systemInstruction}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${u} (${f}).
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
`.trim(),I=`
DATOS DE LA AGENDA DE ${u.toUpperCase()}:
- Prioridades urgentes:
${s.urgentPriorities.map(U=>`  • [${U.type==="exam"?"Examen":"Entrega"}] ${U.subject}: "${U.title}" (${U.daysLeft===0?"¡Hoy!":U.daysLeft===1?"Mañana":`en ${U.daysLeft} días`})`).join(`
`)||"  • No hay hitos inmediatos"}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${s.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${s.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${s.subjectBreakdown.map(U=>`${U.subject}: ${U.minutes} min (${U.percentage}%)`).join(", ")||"Sin bloques"}
- Avance de deberes: ${s.homeworkProgress.completed}/${s.homeworkProgress.total} completados (${s.homeworkProgress.percentage}%).
${r?`MENSAJE DEL ALUMNO: "${r}"`:"(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)"}
`.trim(),K=[...(i||[]).map(U=>({role:U.role==="assistant"?"assistant":"user",content:U.content})),{role:"user",content:I}],L=await this.callLLM(T,K);if(L){let U=this.createDefaultSuggestedBlocks(a,s,r,b);try{const R=L.match(/```json\s*([\s\S]*?)\s*```/)||L.match(/\[[\s\S]*\]/);if(R){const M=JSON.parse(R[1]||R[0]);Array.isArray(M)&&M.length>0&&(U=M.map(z=>({title:z.title||"Sesión de estudio activo",subject:z.subject||"General",date:z.date||h,startTime:z.startTime||"17:00",durationMinutes:z.durationMinutes||45,type:z.type||"study_session",completed:!1,notes:z.notes||"Planificado por Anaxagoras AI",gradeKey:b,syncedWithGoogle:!1})))}}catch(R){console.warn("[AI Client] No se pudo parsear JSON del planificador LLM:",R)}return{message:L.replace(/```json[\s\S]*?```/,"").trim(),suggestedBlocks:U}}return this.createSimulatedPlanificationResponse(a,s,u,f,b,r)}createDefaultSuggestedBlocks(a,r,i,s="1eso"){const c=new Date().toISOString().split("T")[0],u=new Date(Date.now()+864e5).toISOString().split("T")[0],f=new Date(Date.now()+864e5*2).toISOString().split("T")[0],b=(i||"").toLowerCase(),h=b.includes("retras")||b.includes("posp")||b.includes("profe")||b.includes("aplaza"),C=b.includes("descans")||b.includes("libre")||b.includes("cansad")||b.includes("menos"),T=b.includes("mate")||b.includes("cálculo"),I=b.includes("lengua")||b.includes("sintaxis"),K=C?30:45;return s==="1eso"?[{title:I||h?"Práctica de Oraciones: Sujeto y Predicado en Bloque":"Repaso Activo: Ciencias Naturales (Ecosistemas)",subject:I||h?"Lengua Castellana":"Ciencias Naturales",date:h?u:c,startTime:"17:15",durationMinutes:K,type:"study_session",completed:!1,notes:h?"📅 Tarea reprogramada respetando el aviso del profesor.":"Hacer mapa visual de 1 página sin mirar el libro.",gradeKey:"1eso",syncedWithGoogle:!1},{title:T?"Fracciones Básicas: Resolución de 4 Ejercicios":"Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)",subject:T?"Matemáticas":"Ciencias Sociales",date:h?f:u,startTime:"18:15",durationMinutes:K,type:"study_session",completed:!1,notes:"Preparación espaciada para asentar conceptos antes del examen.",gradeKey:"1eso",syncedWithGoogle:!1}]:[{title:T||h?"Matemáticas II: Discusión de Sistemas de Cramer con Parámetro":"Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)",subject:T||h?"Matemáticas II":"Filosofía",date:h?u:c,startTime:"17:00",durationMinutes:C?40:50,type:"study_session",completed:!1,notes:h?"📅 Reprogramado según nueva directriz del profesor.":"Redacción de síntesis conceptual para la prueba de Selectividad.",gradeKey:"2batx",syncedWithGoogle:!1},{title:"Lengua Castellana: Pruebas de Concordancia de CPred (PAU)",subject:"Lengua Castellana",date:f,startTime:"18:15",durationMinutes:C?40:50,type:"study_session",completed:!1,notes:"Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.",gradeKey:"2batx",syncedWithGoogle:!1}]}createSimulatedPlanificationResponse(a,r,i,s,c,u){const f=this.createDefaultSuggestedBlocks(a,r,u,c),b=(u||"").toLowerCase(),h=r.urgentPriorities[0],C=r.subjectBreakdown[0];let T="";return b.includes("retras")||b.includes("posp")||b.includes("profe")?T=`¡Comprendido, ${i}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.

• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.
• **Tu tarde protegida:** Hoy mantendrás **${r.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.
• **Prioridad activa:** Tu foco principal sigue siendo ${h?`el examen de **${h.subject}** (${h.title}) en ${h.daysLeft} días`:"mantener un ritmo espaciado"}.

¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`:T=`¡Hola, ${i}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${s}**:

🎯 **1. Qué es más prioritario hoy:**
`+(h?`Lo más urgente es **${h.subject}**: *"${h.title}"*, que vence ${h.daysLeft===0?"¡hoy mismo!":h.daysLeft===1?"mañana":`en ${h.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.

`:`No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.

`)+`⏱️ **2. Distribución de tu tiempo esta tarde:**
Tus clases lectivas finalizan a las 15:00. Te he programado **${r.afternoonDistribution.todayStudyMinutes>0?`${r.afternoonDistribution.todayStudyMinutes} minutos`:"45 minutos"} de estudio activo**, lo que te deja **${r.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪

📊 **3. Balance por asignaturas:**
`+(C?`La materia con más tiempo acumulado es **${C.subject}** (${C.minutes} min). ${r.subjectBreakdown.length>1?`Recomiendo alternar con materias que llevan menos minutos (${r.subjectBreakdown[r.subjectBreakdown.length-1].subject}) para entrenar el entrelazado cognitivo.`:""}

`:`Aún no hay suficiente historial de minutos registrados esta semana.

`)+`📝 **4. Avance de tus deberes:**
Llevas completados el **${r.homeworkProgress.percentage}% de tus entregas** (${r.homeworkProgress.completed} de ${r.homeworkProgress.total}).

Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`,{message:T,suggestedBlocks:f}}async generateStudyPlan(a,r){var u;const s=((u=Le.getState().user)==null?void 0:u.gradeKey)||"1eso",c=this.calculateAgendaStats([]);return this.createDefaultSuggestedBlocks([],c,void 0,s)}async generateActiveRecallCard(a,r){var f;const s=((f=Le.getState().user)==null?void 0:f.gradeKey)||"1eso",c=`${_o.recall}

Genera una tarjeta conceptual de autoevaluación para la materia ${a} y tema ${r} adaptada al nivel ${s==="1eso"?"1º de ESO":"2º de Bachillerato"}. Formato JSON estricto.`,u=await this.callLLM(c,[{role:"user",content:`Crear desafío de active recall sobre ${r}`}]);if(u)try{const b=u.match(/\{[\s\S]*\}/);if(b){const h=JSON.parse(b[0]);return{id:`card_${Date.now()}`,concept:h.concept||`¿Cómo definirías la clave de ${r}?`,hint:h.hint||"Piensa en las causas fundamentales y consecuencias.",explanation:h.explanation||"Resumen conceptual para verificar comprensión activa.",masteryScore:0}}}catch(b){console.warn("[AI Client] Fallo al parsear flashcard de LLM:",b)}return a.toLowerCase().includes("lengua")?s==="1eso"?{id:`card_${Date.now()}`,concept:'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',hint:'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',explanation:'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',masteryScore:0}:{id:`card_${Date.now()}`,concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',hint:'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',explanation:'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',masteryScore:0}:{id:`card_${Date.now()}`,concept:`¿Cómo influyen los factores limitantes en ${r} (${a})?`,hint:"Recuerda qué variable impide que el proceso aumente indefinidamente.",explanation:"El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.",masteryScore:0}}createSimulatedSocraticResponse(a,r,i="",s="1eso"){const c=a.toLowerCase();let u="",f=[];return r.toLowerCase().includes("lengua")||i.toLowerCase().includes("oraci")||i.toLowerCase().includes("sintaxis")?s==="1eso"?(u=`¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨

En la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.

¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`,f=["Aporta información del modo y el lugar del viaje","¿Por qué en 1º de ESO no distinguimos subtipos?","¿Cómo encuentro el sujeto si va al final?"],{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:f}):(u=`¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚

En la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.

Fíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`,f=['Concuerda con el sujeto ("llegaron puntuales"), es CPred','¿Y qué función sintáctica tiene "a la estación"?',"¿Qué diferencia hay entre CPred y Atributo?"],{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:f}):(c.includes("dame la respuesta")||c.includes("solucion")||c.includes("solución")||c.includes("hazmelo")||c.includes("resuelve")||c.includes("escribe el texto")||c.includes("dime el resultado")?(u=`¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`,f=["Los datos son...","No entiendo bien qué significa este dato","¿Qué fórmula podemos usar?"]):c.includes("no entiendo")||c.includes("duda")||c.includes("dificil")||c.includes("difícil")?(u=`Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${r}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`,f=["Entiendo la teoría pero me cuesta aplicarlo","¿Puedes darme una pista visual o ejemplo?","Creo que el primer paso es identificar las variables"]):(u=`¡Excelente razonamiento! Estás conectando muy bien las ideas en **${r}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`,f=["Creo que aumentaría proporcionalmente","¿Podría haber una excepción a esa regla?","Quiero comprobarlo con otro ejemplo práctico"]),{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:f})}}const $t=new qs;function Ns(p,a){const r=Zt.getCurrentLanguage();p.innerHTML=`
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <img src="./icons/icon-192.png" alt="Anaxagoras AI Logo" class="w-10 h-10 rounded-2xl shadow-md shadow-brand-500/20 object-cover border border-slate-200/80 bg-slate-900" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${E("app.title")}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${E("app.badge")}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${E("app.tagline")}</p>
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
            <span id="ai-model-label" class="hidden md:inline">Ollama (${E("nav.local")})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </header>
  `;const i=p.querySelector("#lang-selector");i==null||i.addEventListener("change",async u=>{const f=u.target.value;await Zt.changeLanguage(f),a.onLanguageChange(f)});const s=p.querySelector("#btn-ai-settings");s==null||s.addEventListener("click",()=>a.onOpenAISettings());const c=p.querySelector("#auth-container");c&&Le.subscribe(u=>{var f,b,h;u.isAuthenticated&&u.user?(c.innerHTML=`
          <div class="flex items-center gap-1.5">
            ${u.mode==="demo"?`
              <button id="btn-quick-switch-grade" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold ${u.user.gradeKey==="1eso"?"bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100":"bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100"} transition-all" title="Cambiar rápidamente entre los dos perfiles de prueba de la presentación">
                <span>🔄</span>
                <span>${u.user.gradeKey==="1eso"?"1º ESO":"2º Batx"}</span>
              </button>
            `:""}
            <button id="btn-user-profile" class="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all">
              <img src="${u.user.avatarUrl}" alt="${u.user.name}" class="w-6 h-6 rounded-full object-cover border border-brand-200" />
              <div class="text-left hidden sm:block">
                <span class="block text-xs font-semibold text-slate-800 leading-none">${u.user.name}</span>
                <span class="text-[10px] text-slate-500 leading-none">${u.user.gradeLevel}</span>
              </div>
              <span class="w-2 h-2 rounded-full ${u.mode==="real"?"bg-emerald-500 animate-pulse":"bg-amber-500"} ml-1" title="${u.mode==="real"?"Cuenta Google Real":"Modo Demo Activo"}"></span>
            </button>
          </div>
        `,(f=c.querySelector("#btn-quick-switch-grade"))==null||f.addEventListener("click",()=>{Le.toggleGradeProfile()}),(b=c.querySelector("#btn-user-profile"))==null||b.addEventListener("click",a.onOpenAuth)):(c.innerHTML=`
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${E("nav.connectGoogle")}</span>
          </button>
        `,(h=c.querySelector("#btn-connect-google"))==null||h.addEventListener("click",a.onOpenAuth))}),$t.getSettings().then(u=>{const f=p.querySelector("#ai-model-label");f&&(f.textContent=u.provider==="local"?`${u.modelName} (${E("nav.local")})`:`${u.modelName} (${E("nav.cloud")})`)})}function zs(p,a,r){p.innerHTML=`
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div class="flex items-center justify-between border-b border-slate-200">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="study"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">💡</span>
            <span>${E("tabs.study")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              ${E("tabs.tutorBadge")}
            </span>
          </button>

          <!-- Tab 2: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="tasks"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📝</span>
            <span>${E("tabs.tasks")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="tasks"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>${E("app.criticalThinking")}</span>
        </div>
      </div>
    </nav>
  `,p.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const c=s.dataset.tab;r.onTabChange(c)})})}function Fs(p,a){$t.getSettings().then(r=>{var u,f;p.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 border border-slate-100 transition-all my-auto max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">${E("aiModal.title")}</h3>
                <p class="text-xs text-slate-500">${E("aiModal.subtitle")}</p>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">${E("aiModal.inferenceType")}</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="local"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${r.provider==="local"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${E("aiModal.localTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${E("aiModal.localDesc")}</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="cloud"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${r.provider==="cloud"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${E("aiModal.cloudTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${E("aiModal.cloudDesc")}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${E("aiModal.endpointUrl")}</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${r.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${E("aiModal.endpointHint")}</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${E("aiModal.modelName")}</label>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${E("aiModal.apiKey")}</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${r.apiKey||""}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${E("aiModal.apiKeyHint")}</span>
            </div>

            <!-- Socratic Strictness -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${E("aiModal.socraticMode")}</label>
              <select id="select-strictness" class="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none">
                <option value="high" ${r.socraticStrictness==="high"?"selected":""}>${E("aiModal.strictHigh")}</option>
                <option value="balanced" ${r.socraticStrictness==="balanced"?"selected":""}>${E("aiModal.strictBalanced")}</option>
                <option value="exploratory" ${r.socraticStrictness==="exploratory"?"selected":""}>${E("aiModal.strictExploratory")}</option>
              </select>
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
                <span>${E("aiModal.testConnection")}</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  ${E("aiModal.cancel")}
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  ${E("aiModal.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,(u=p.querySelector("#btn-close-modal"))==null||u.addEventListener("click",a.onClose),(f=p.querySelector("#btn-cancel"))==null||f.addEventListener("click",a.onClose);const i=p.querySelector("#btn-test-connection"),s=p.querySelector("#test-result-box");i==null||i.addEventListener("click",async()=>{const b=p.querySelector("#input-endpoint").value,h=p.querySelector("#input-model").value,C=p.querySelector("#input-apikey").value.trim(),T=p.querySelector('input[name="provider"]:checked');i&&(i.innerHTML=`<span>⏳</span><span>${E("aiModal.testing")}</span>`);const I=await $t.testConnection({provider:(T==null?void 0:T.value)||"local",endpointUrl:b.trim(),modelName:h.trim(),apiKey:C,temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()});i&&(i.innerHTML=`<span>⚡</span><span>${E("aiModal.testConnection")}</span>`),s&&(s.classList.remove("hidden","bg-emerald-50","text-emerald-700","bg-amber-50","text-amber-700"),I.success?(s.classList.add("bg-emerald-50","text-emerald-700"),s.textContent=`✅ ${I.message}`):(s.classList.add("bg-amber-50","text-amber-700"),s.textContent=`ℹ️ ${I.message}`))});const c=p.querySelector("#ai-settings-form");c==null||c.addEventListener("submit",async b=>{b.preventDefault();const h=p.querySelector("#input-endpoint").value.trim(),C=p.querySelector("#input-model").value.trim(),T=p.querySelector("#input-apikey").value.trim(),I=p.querySelector('input[name="provider"]:checked'),K=p.querySelector("#select-strictness").value;await $t.updateSettings({provider:(I==null?void 0:I.value)||"local",endpointUrl:h,modelName:C,apiKey:T,socraticStrictness:K}),a.onSaved()})})}function Pn(p,a){var c,u,f,b,h,C,T,I,K;const r=Le.getState();p.innerHTML=`
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
              <h3 class="font-display font-bold text-lg text-slate-900">${E("authModal.title")}</h3>
              <p class="text-xs text-slate-500">${E("authModal.subtitle")}</p>
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
                          ${E("authModal.realBadge")}
                        </span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${E("authModal.demoBadge")}
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
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${E("authModal.authorizedResources")}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${E("authModal.calendarTitle")}</p>
                      <p class="text-[11px] text-slate-500">${E("authModal.calendarDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?E("authModal.statusReal"):E("authModal.statusDemo")}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${E("authModal.driveTitle")}</p>
                      <p class="text-[11px] text-slate-500">${E("authModal.driveDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?E("authModal.statusReal"):E("authModal.statusDemo")}
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
                      <span>${E("authModal.realOptionTitle")}</span>
                    </button>
                  `:`
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${E("authModal.demoButton")}</span>
                    </button>
                  `}

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${E("authModal.disconnect")}
                </button>
              </div>
            `:""}

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${r.isAuthenticated?"hidden":"block"} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${E("authModal.realOptionTitle")}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${E("authModal.realOptionDesc")}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${E("authModal.clientIdLabel")}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${r.clientId||""}" 
                placeholder="${E("authModal.clientIdPlaceholder")}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${E("authModal.clientIdHelp")}</span>
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
              <span>${E("authModal.realButton")}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${E("authModal.demoButton")}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `,(c=p.querySelector("#btn-close-auth"))==null||c.addEventListener("click",a.onClose),(u=p.querySelector("#btn-show-real-connect"))==null||u.addEventListener("click",()=>{var L;(L=p.querySelector("#real-connect-box"))==null||L.classList.remove("hidden")}),(f=p.querySelector("#btn-modal-set-1eso"))==null||f.addEventListener("click",()=>{Le.setGradeProfile("1eso"),a.onStateChanged(),Pn(p,a)}),(b=p.querySelector("#btn-modal-set-2batx"))==null||b.addEventListener("click",()=>{Le.setGradeProfile("2batx"),a.onStateChanged(),Pn(p,a)}),(h=p.querySelector("#btn-manual-check-update"))==null||h.addEventListener("click",async()=>{await Cn.checkForUpdates(!0)}),(C=p.querySelector("#btn-force-hard-reset"))==null||C.addEventListener("click",async()=>{confirm("¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.")&&await Cn.forceHardReset()}),(T=p.querySelector("#btn-switch-to-demo"))==null||T.addEventListener("click",async()=>{await Le.connectDemo(),a.onStateChanged(),a.onClose()}),(I=p.querySelector("#btn-activate-demo"))==null||I.addEventListener("click",async()=>{await Le.connectDemo(),a.onStateChanged(),a.onClose()}),(K=p.querySelector("#btn-disconnect-google"))==null||K.addEventListener("click",()=>{Le.disconnect(),a.onStateChanged(),a.onClose()});const i=p.querySelector("#btn-do-connect-real"),s=p.querySelector("#auth-error-box");i==null||i.addEventListener("click",async()=>{const L=p.querySelector("#input-client-id"),X=L==null?void 0:L.value.trim();if(!X){s&&(s.classList.remove("hidden"),s.textContent="Por favor, introduce tu Google OAuth Client ID.");return}i&&(i.innerHTML="<span>⏳ Conectando con Google...</span>");try{await Le.connectRealGoogle(X),a.onStateChanged(),a.onClose()}catch($){i&&(i.innerHTML=`<span>${E("authModal.realButton")}</span>`),s&&(s.classList.remove("hidden"),s.textContent=$.message||"Error al conectar con Google OAuth 2.0.")}})}function Sr(p){return String(p||"").replace(/<[^>]*>/g,"").trim()}function Co(p,a,r){const i=`${Sr(p)}/${Sr(a)}`;return`<span class="math-fraction inline-flex flex-col items-center justify-center align-middle mx-1 font-serif text-[0.88em] leading-none select-all transition-transform hover:scale-105" aria-label="${i}" title="${i}"><span class="math-num border-b-[1.5px] border-current pb-0.5 px-1 font-bold text-center leading-none">${p}</span><span class="math-den pt-0.5 px-1 font-bold text-center leading-none">${a}</span></span>`}function Ks(p){let a=p;return p==="-"||p==="&minus;"?a="&minus;":p==="*"||p==="x"||p==="\\times"?a="&times;":p==="/"||p==="\\div"?a="&divide;":p==="!="||p==="\\ne"||p==="\\neq"?a="&ne;":p==="<="||p==="\\le"||p==="\\leq"?a="&le;":p===">="||p==="\\ge"||p==="\\geq"?a="&ge;":p==="\\approx"?a="&asymp;":p==="\\pm"?a="&plusmn;":(p==="\\rightarrow"||p==="->")&&(a="&rarr;"),`<span class="math-operator mx-1 font-sans font-bold opacity-80 select-none">${a}</span>`}function Wt(p,a={}){let r=String(p||"").trim();if(r.includes("\\begin{cases}"))return r.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g,(c,u)=>`<div class="inline-flex items-center gap-2 font-serif my-1 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-brand-200/60 shadow-xs"><span class="text-3xl sm:text-4xl font-light text-brand-600 select-none leading-none">{</span><div class="flex flex-col gap-1 text-left text-xs sm:text-sm font-medium text-slate-800">${u.split("\\\\").map(h=>h.trim()).filter(Boolean).map(h=>`<div>${Wt(h,{inner:!0})}</div>`).join("")}</div></div>`);r=r.replace(/\\sqrt\{([^{}]+)\}|sqrt\(([^()]+)\)/g,(c,u,f)=>`§SQRT§${u||f}§ENDSQRT§`),r=r.replace(/\\text\{([^{}]+)\}/g,"§TEXT§$1§ENDTEXT§"),r=r.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(new RegExp("(?<!\\d\\/)\\b(\\d+)\\/(\\d+)\\b(?!\\/\\d)","g"),"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z\+\-]+)/g,(c,u,f)=>`§SUP§${u||f}§ENDSUP§`),r=r.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z\+\-]+)/g,(c,u,f)=>`§SUB§${u||f}§ENDSUB§`);const i={"\\times":"§OP§\\times§ENDOP§","\\div":"§OP§\\div§ENDOP§","\\neq":"§OP§\\neq§ENDOP§","\\ne":"§OP§\\ne§ENDOP§","\\approx":"§OP§\\approx§ENDOP§","\\leq":"§OP§\\leq§ENDOP§","\\le":"§OP§\\le§ENDOP§","\\geq":"§OP§\\geq§ENDOP§","\\ge":"§OP§\\ge§ENDOP§","\\pm":"§OP§\\pm§ENDOP§","\\rightarrow":"§OP§\\rightarrow§ENDOP§","->":"§OP§->§ENDOP§","!=":"§OP§!=§ENDOP§","<=":"§OP§<=§ENDOP§",">=":"§OP§>=§ENDOP§","+":"§OP§+§ENDOP§","-":"§OP§-§ENDOP§","*":"§OP§*§ENDOP§","=":"§OP§=§ENDOP§"},s=Object.keys(i).sort((c,u)=>u.length-c.length);for(const c of s){const u=c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),f=new RegExp(`(^|\\s|[a-zA-Z0-9§])(${u})($|\\s|[a-zA-Z0-9§])`,"g");r=r.replace(f,`$1${i[c]}$3`)}return r=r.replace(/§FRAC§(.*?)§OVER§(.*?)§ENDFRAC§/g,(c,u,f)=>Co(u.trim(),f.trim())),r=r.replace(/§OP§(.*?)§ENDOP§/g,(c,u)=>Ks(u)),r=r.replace(/§SQRT§(.*?)§ENDSQRT§/g,(c,u)=>`<span class="inline-flex items-center align-middle mx-1 font-serif"><span class="text-[1.15em] font-serif leading-none mr-0.5">&radic;</span><span class="border-t border-current px-1 leading-tight">${u}</span></span>`),r=r.replace(/§TEXT§(.*?)§ENDTEXT§/g,'<span class="font-sans font-normal mx-1">$1</span>'),r=r.replace(/§SUP§(.*?)§ENDSUP§/g,'<sup class="text-[0.72em] font-bold px-0.5">$1</sup>'),r=r.replace(/§SUB§(.*?)§ENDSUB§/g,'<sub class="text-[0.72em] font-semibold px-0.5">$1</sub>'),a.inner?r:a.badge?`<span class="math-badge inline-flex items-center flex-wrap gap-1 px-3 py-1.5 rounded-2xl bg-brand-50/90 border border-brand-200/90 text-brand-950 font-serif shadow-xs text-xs sm:text-sm ${a.className||""}">${r}</span>`:`<span class="math-expr inline-flex items-center flex-wrap font-serif align-middle ${a.className||""}">${r}</span>`}function yt(p,a={}){if(!p)return"";const r=[];let i=p.replace(/<[^>]+>/g,C=>{const T=`§§HTML_TAG_${r.length}§§`;return r.push({key:T,tag:C}),T});const s=[];function c(C){const T=`§§MATH_TOKEN_${s.length}§§`;return s.push({key:T,html:C}),T}const u=/\b(?:Real\s+Decreto|Decreto|Decret|RD|Ley(?:\s+Orgánica)?|Llei|Orden|Ordre|Resolución|BOE|DOGV|DOGC|núm\.|número)\s+[A-Za-z0-9\.\-\/]*\s*\d+\/\d+/gi;i=i.replace(u,C=>c(C));const f=new RegExp("(?<![a-zA-Z0-9\\-\\/])\\d{1,4}\\/(?:19|20)\\d{2}(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(f,C=>c(C)),i=i.replace(/\$\$([\s\S]*?)\$\$/g,(C,T)=>c(`<div class="my-2.5 flex justify-center w-full overflow-x-auto py-1">${Wt(T,{badge:!0,className:"shadow-sm border-brand-300"})}</div>`)),i=i.replace(/\$([^\$\n]+)\$/g,(C,T)=>c(Wt(T,{badge:!1,inner:!1})));const b=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+\\/\\d+)(\\s*[\\+\\-\\*\\/=]\\s*\\d+\\/\\d+)+(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(b,C=>c(a.badge?Wt(C,{badge:!0}):Wt(C,{badge:!1})));const h=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+)\\/(?!(?:19|20)\\d{2}\\b)(\\d+)(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(h,(C,T,I)=>c(Co(T,I)));for(const{key:C,html:T}of s)i=i.replace(C,T);for(const{key:C,tag:T}of r)i=i.replace(C,T);return i}function Gs(p,a,r){return`
    <div class="math-card flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-50/90 via-indigo-50/70 to-cyan-50/40 border border-brand-200/90 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center gap-2.5 flex-wrap flex-1">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200/80 shadow-2xs flex-shrink-0">
          ${p}
        </span>
        <div class="font-serif text-sm sm:text-base text-slate-900 flex items-center flex-wrap gap-1">
          ${yt(a)}
        </div>
      </div>
      ${r?`<span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white text-brand-700 border border-brand-200 shadow-2xs whitespace-nowrap">${r}</span>`:""}
    </div>
  `}function Ve(p,a=!0){const r=p.replace(/^# (.*$)/gim,'<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200/80">$1</h2>').replace(/^## (.*$)/gim,'<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>').replace(/^### (.*$)/gim,'<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1 text-brand-700">$1</h4>').replace(/\*\*(.*?)\*\*/gim,'<strong class="font-bold text-slate-900">$1</strong>').replace(/\*(.*?)\*/gim,'<em class="italic text-slate-700">$1</em>').replace(/```json([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/```([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/^\- (.*$)/gim,'<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>').replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>').replace(/\n\n/gim,"<br/><br/>");return a?yt(r):r}function Vs(p,a){return p.includes("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?p.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/).map(i=>i.startsWith("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?Ve(i,!1):Ve(i,!0)).join(""):Ve(p,!0)}function Jt(p,a,r,i){var R;const s=i,c=s.assembledPrompt,u=s.assembledAgendaPrompt;let f=!0;const b=[];if(c){b.push({id:"consolidated",isConsolidated:!0,icon:"🔀",levelBadge:E("promptModal.tabs.all"),badgeClass:"bg-slate-900 text-white border-slate-700",title:E("promptModal.titleAssembled",{subject:c.subject}),subtitle:E("promptModal.subtitleAssembled",{topic:c.topicName}),source:"Pipeline de Memoria en Ejecución (Orquestador Dinámico)",rawContent:c.systemInstruction,formattedHtml:Vs(c.systemInstruction),isOpen:!0,accentColor:"#3b82f6",nodeRingClass:"focus:ring-brand-500 border-slate-700 hover:border-brand-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const M=c.layers.level1Functional;b.push({id:"level1",isConsolidated:!1,icon:"🧠",levelBadge:M.badge||E("promptModal.tabs.level1"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:M.title,subtitle:M.subtitle,source:M.source,rawContent:M.content,formattedHtml:Ve(M.content,!0),isOpen:!1,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-brand-200 hover:border-brand-400 hover:bg-brand-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-brand-200"});const z=c.layers.level3Regulatory;b.push({id:"level3",isConsolidated:!1,icon:"⚖️",levelBadge:z.badge||E("promptModal.tabs.level3"),badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:z.title,subtitle:z.subtitle,source:z.source,rawContent:z.content,formattedHtml:Ve(z.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const Q=c.layers.level2BaseTopic;if(b.push({id:"level2A",isConsolidated:!1,icon:"🏛️",levelBadge:Q.badge||E("promptModal.tabs.level2A"),badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:Q.title,subtitle:Q.subtitle,source:Q.source,rawContent:Q.content,formattedHtml:Ve(Q.content,!0),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"}),c.layers.level2SpecificActivity){const Z=c.layers.level2SpecificActivity;b.push({id:"level2B",isConsolidated:!1,icon:"🎯",levelBadge:Z.badge||E("promptModal.tabs.level2B"),badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:Z.title,subtitle:Z.subtitle,source:Z.source,rawContent:Z.content,formattedHtml:Ve(Z.content,!0),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}}else if(u){b.push({id:"agenda_consolidated",isConsolidated:!0,icon:"🔀",levelBadge:"Consolidado Agenda",badgeClass:"bg-slate-900 text-white border-slate-700",title:u.title,subtitle:u.subtitle,source:"Consolidación Multivariable de Agenda Escolar",rawContent:u.systemInstruction,formattedHtml:Ve(u.systemInstruction,!1),isOpen:!0,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-slate-700 hover:border-cyan-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const M=u.pillars.timeDistribution;b.push({id:"agenda_time",isConsolidated:!1,icon:"⏱️",levelBadge:M.badge,badgeClass:"bg-cyan-50 text-cyan-700 border-cyan-200",title:M.title,subtitle:M.subtitle,source:M.source,rawContent:M.content,formattedHtml:Ve(M.content,!1),isOpen:!1,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-cyan-200"});const z=u.pillars.priorityOrder;b.push({id:"agenda_priority",isConsolidated:!1,icon:"🎯",levelBadge:z.badge,badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:z.title,subtitle:z.subtitle,source:z.source,rawContent:z.content,formattedHtml:Ve(z.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const Q=u.pillars.commitmentDeadlines;b.push({id:"agenda_deadlines",isConsolidated:!1,icon:"📅",levelBadge:Q.badge,badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:Q.title,subtitle:Q.subtitle,source:Q.source,rawContent:Q.content,formattedHtml:Ve(Q.content,!1),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"});const Z=u.pillars.adaptiveFlexibility;b.push({id:"agenda_adaptive",isConsolidated:!1,icon:"🔄",levelBadge:Z.badge,badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:Z.title,subtitle:Z.subtitle,source:Z.source,rawContent:Z.content,formattedHtml:Ve(Z.content,!1),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}else{const M=a.includes("Nivel 3")||a.includes("Regulador")||(s.subtitle||"").includes("Regulador");b.push({id:"standalone",isConsolidated:!0,icon:s.institution?"🏛️":"📄",levelBadge:((R=s.badge)==null?void 0:R.text)||E("promptModal.badgePrompt"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:a,subtitle:s.subtitle||E("promptModal.defaultSubtitle"),source:s.sourceApi||s.institution,rawContent:r,formattedHtml:Ve(r,!M),isOpen:!0,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-slate-700",nodeBgClass:"bg-slate-900 text-white",nodeBorderClass:"border-slate-700"})}const h=b.find(M=>M.isConsolidated),C=b.filter(M=>!M.isConsolidated),T=C.length>0;function I(){var Z;const M=c?E("promptModal.titleAssembled",{subject:c.subject}):u?u.title:a,z=c?E("promptModal.subtitleAssembled",{topic:c.topicName}):s.subtitle||E("promptModal.defaultSubtitle"),Q=c?E("promptModal.badge4Layers"):u?"Estructura Propia de Agenda":((Z=s.badge)==null?void 0:Z.text)||E("promptModal.badgePrompt");return`
      <div id="prompt-modal-backdrop" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 border border-slate-100 max-h-[92vh] flex flex-col transition-all my-auto">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${u?"⏱️":c?"🧩":s.institution?"🏛️":"📄"}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${M}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${Q}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${z}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              ${T?`
                <button id="btn-toggle-graph" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${f?"bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100":"bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}" title="${E(f?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}">
                  <span>📐</span>
                  <span class="hidden sm:inline">${E(f?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}</span>
                </button>
              `:""}
              <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${E("promptModal.close")}">
                ✕
              </button>
            </div>
          </div>

          <!-- Scrollable Body -->
          <div class="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 py-3 custom-scrollbar">

            ${T?`
              <!-- Seccion Grafo Visual SVG / HTML -->
              <div id="graph-panel-wrapper" class="bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 transition-all shadow-xs ${f?"block":"hidden"}">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">📐</span>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900">${E("promptModal.graphTitle")}</h4>
                      <p class="text-[11px] text-slate-500">${E("promptModal.graphSubtitle")}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    ${C.length} Capas ➔ 1 Ensamblado
                  </span>
                </div>

                <div class="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5 italic">
                  <span>💡</span>
                  <span>${E("promptModal.clickToInspect")}</span>
                </div>

                <!-- Canvas del Grafo -->
                <div id="prompt-graph-canvas" class="relative rounded-xl p-3 sm:p-4 bg-slate-900/[0.02] border border-slate-200/60 overflow-hidden">
                  
                  <!-- Conectores SVG Dinámicos -->
                  <svg id="prompt-graph-svg" class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  </svg>

                  <div class="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center">
                    
                    <!-- Columna Izquierda: Nodos de Entrada Discretos -->
                    <div class="sm:col-span-6 flex flex-col gap-2.5">
                      ${C.map(W=>`
                        <div 
                          data-node-id="${W.id}"
                          data-node-color="${W.accentColor}"
                          class="graph-input-node p-2.5 sm:p-3 rounded-xl border ${W.nodeBorderClass} bg-white shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between group hover:scale-[1.01]"
                          title="Clic para ver detalles de ${W.levelBadge}"
                        >
                          <div class="flex items-center gap-2.5 min-w-0">
                            <span class="text-lg p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                              ${W.icon}
                            </span>
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5">
                                <span class="text-xs font-bold text-slate-800 truncate">${W.title}</span>
                              </div>
                              <span class="text-[10px] font-medium text-slate-500 truncate block">${W.subtitle}</span>
                            </div>
                          </div>
                          <span class="px-2 py-0.5 rounded-md text-[9px] font-bold ${W.badgeClass} flex-shrink-0 ml-2">
                            ${W.levelBadge}
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
                            <span>Confluencia de ${C.length} capas curriculares</span>
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
                <span class="font-bold text-slate-700 text-xs">${E("promptModal.discreteComponents")}:</span>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button id="btn-expand-all" class="text-[11px] font-bold text-brand-700 hover:text-brand-800 hover:underline">
                  ${E("promptModal.expandAll")}
                </button>
                <span class="text-slate-300">|</span>
                <button id="btn-collapse-all" class="text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:underline">
                  ${E("promptModal.collapseAll")}
                </button>
              </div>
            </div>

            <!-- Lista de Acordeón con Contenido Markdown de cada Capa -->
            <div class="space-y-3">
              ${b.map(W=>`
                <div 
                  id="accordion-section-${W.id}"
                  class="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-all duration-200"
                >
                  <!-- Cabecera del Acordeón -->
                  <div 
                    data-toggle-id="${W.id}"
                    class="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${W.isConsolidated?"bg-slate-900 text-white shadow-sm":"bg-slate-100 text-slate-700 border border-slate-200"}">
                        ${W.icon}
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${W.title}</h4>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${W.badgeClass}">
                            ${W.levelBadge}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500 truncate">${W.subtitle}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button 
                        data-copy-id="${W.id}" 
                        class="btn-copy-prompt px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 shadow-2xs transition-all"
                        title="${E("promptModal.copyPrompt")}"
                      >
                        <span>📋</span>
                        <span class="copy-label hidden sm:inline">${E("promptModal.copyPrompt")}</span>
                      </button>

                      <div 
                        id="chevron-${W.id}" 
                        class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs transition-transform duration-200 ${W.isOpen?"rotate-180 bg-slate-200 text-slate-800":""}"
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  <!-- Cuerpo Markdown Desplegable -->
                  <div 
                    id="body-${W.id}" 
                    class="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition-all ${W.isOpen?"block":"hidden"}"
                  >
                    ${W.source?`
                      <div class="mb-3 text-[11px] font-mono text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-xl truncate flex items-center gap-2">
                        <span class="font-bold text-slate-600">${E("promptModal.sourceLabel")}</span>
                        <span class="truncate text-slate-700">${W.source}</span>
                      </div>
                    `:""}

                    <div class="leading-relaxed text-xs text-slate-700 space-y-2.5 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto">
                      ${W.formattedHtml}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="pt-3.5 mt-2 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500 truncate max-w-[280px] sm:max-w-none">
              ${E(c?"promptModal.footerGraph":"promptModal.footerAudit")}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${E("promptModal.close")}
            </button>
          </div>

        </div>
      </div>
    `}function K(){if(!T||!f)return;const M=p.querySelector("#prompt-graph-svg"),z=p.querySelector("#prompt-graph-canvas"),Q=p.querySelector("#node-consolidated");if(!M||!z||!Q)return;const Z=M.getBoundingClientRect();if(Z.width===0||Z.height===0)return;const W=Q.getBoundingClientRect(),J=p.querySelectorAll(".graph-input-node");if(J.length===0)return;const ge=W.left>=J[0].getBoundingClientRect().right-20;let se=`
      <defs>
        <marker id="arrow-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
        </marker>
    `;J.forEach(re=>{const ve=re.dataset.nodeId,ae=re.dataset.nodeColor||"#6366f1";se+=`
        <marker id="arrow-${ve}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${ae}" />
        </marker>
      `}),se+="</defs>",J.forEach(re=>{const ve=re.dataset.nodeId,ae=re.dataset.nodeColor||"#6366f1",fe=re.getBoundingClientRect();if(ge){const ue=fe.right-Z.left,we=fe.top+fe.height/2-Z.top,Ee=W.left-Z.left,xe=W.top+W.height/2-Z.top,Se=Math.max(20,Ee-ue),ke=ue+Se*.45,He=we,ze=Ee-Se*.45;se+=`
          <path id="path-${ve}" d="M ${ue} ${we} C ${ke} ${He}, ${ze} ${xe}, ${Ee} ${xe}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${ae}"
            class="transition-all duration-300 connector-path" />
        `}else{const ue=fe.left+fe.width/2-Z.left,we=fe.bottom-Z.top,Ee=W.left+W.width/2-Z.left,xe=W.top-Z.top,Se=Math.max(20,xe-we),ke=ue,He=we+Se*.45,ze=Ee,at=xe-Se*.45;se+=`
          <path id="path-${ve}" d="M ${ue} ${we} C ${ke} ${He}, ${ze} ${at}, ${Ee} ${xe}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${ae}"
            class="transition-all duration-300 connector-path" />
        `}}),M.innerHTML=se}function L(){b.forEach(M=>{const z=p.querySelector(`#body-${M.id}`),Q=p.querySelector(`#chevron-${M.id}`),Z=p.querySelector(`[data-jump-to="${M.id}"]`);z&&(M.isOpen?(z.classList.remove("hidden"),z.classList.add("block")):(z.classList.remove("block"),z.classList.add("hidden"))),Q&&(M.isOpen?Q.classList.add("rotate-180","bg-slate-200","text-slate-800"):Q.classList.remove("rotate-180","bg-slate-200","text-slate-800")),Z&&(M.isOpen?Z.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-900 text-white border-slate-900 shadow-xs":Z.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200")})}function X(M){const z=b.find(Q=>Q.id===M);z&&(z.isOpen=!0,L(),setTimeout(()=>{const Q=p.querySelector(`#accordion-section-${M}`);Q&&(Q.scrollIntoView({behavior:"smooth",block:"nearest"}),Q.classList.add("ring-2","ring-brand-500","shadow-md"),setTimeout(()=>{Q.classList.remove("ring-2","ring-brand-500","shadow-md")},1500))},40))}function $(){document.removeEventListener("keydown",V),U&&U.disconnect(),s.onClose()}function V(M){M.key==="Escape"&&$()}p.innerHTML=I();let U=null;function ie(){var ge,se,re,ve;document.addEventListener("keydown",V),(ge=p.querySelector("#btn-close-prompt-modal"))==null||ge.addEventListener("click",$),(se=p.querySelector("#btn-close-prompt-btn"))==null||se.addEventListener("click",$);const M=p.querySelector("#prompt-modal-backdrop");M==null||M.addEventListener("click",ae=>{ae.target===M&&$()});const z=p.querySelector("#btn-toggle-graph");z==null||z.addEventListener("click",()=>{f=!f;const ae=p.querySelector("#graph-panel-wrapper");ae&&(f?(ae.classList.remove("hidden"),ae.classList.add("block"),z.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100",requestAnimationFrame(()=>K())):(ae.classList.remove("block"),ae.classList.add("hidden"),z.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"))}),(re=p.querySelector("#btn-expand-all"))==null||re.addEventListener("click",()=>{b.forEach(ae=>ae.isOpen=!0),L()}),(ve=p.querySelector("#btn-collapse-all"))==null||ve.addEventListener("click",()=>{b.forEach(ae=>ae.isOpen=!1),L()}),p.querySelectorAll("[data-toggle-id]").forEach(ae=>{ae.addEventListener("click",fe=>{if(fe.target.closest(".btn-copy-prompt"))return;const ue=ae.dataset.toggleId,we=b.find(Ee=>Ee.id===ue);we&&(we.isOpen=!we.isOpen,L())})}),p.querySelectorAll("[data-jump-to]").forEach(ae=>{ae.addEventListener("click",()=>{const fe=ae.dataset.jumpTo;fe&&X(fe)})}),p.querySelectorAll(".btn-copy-prompt").forEach(ae=>{ae.addEventListener("click",async fe=>{fe.stopPropagation();const ue=ae,we=ue.dataset.copyId,Ee=b.find(xe=>xe.id===we);if(Ee)try{await navigator.clipboard.writeText(Ee.rawContent);const xe=ue.querySelector(".copy-label"),Se=xe?xe.textContent:"";xe&&(xe.textContent=E("promptModal.copied")),ue.classList.remove("text-slate-600","bg-white"),ue.classList.add("text-emerald-700","bg-emerald-50","border-emerald-300"),setTimeout(()=>{xe&&(xe.textContent=Se),ue.classList.remove("text-emerald-700","bg-emerald-50","border-emerald-300"),ue.classList.add("text-slate-600","bg-white")},2e3)}catch(xe){console.error("Error al copiar al portapapeles:",xe)}})});const Q=p.querySelectorAll(".graph-input-node"),Z=p.querySelector("#node-consolidated"),W=p.querySelector("#prompt-graph-svg");Q.forEach(ae=>{const fe=ae.dataset.nodeId;ae.addEventListener("mouseenter",()=>{if(!W)return;const ue=W.querySelector(`#path-${fe}`);ue&&(ue.setAttribute("stroke",ue.dataset.accentColor||"#6366f1"),ue.setAttribute("stroke-width","3.5"),ue.setAttribute("marker-end",`url(#arrow-${fe})`))}),ae.addEventListener("mouseleave",()=>{if(!W)return;const ue=W.querySelector(`#path-${fe}`);ue&&(ue.setAttribute("stroke",ue.dataset.defaultStroke||"#cbd5e1"),ue.setAttribute("stroke-width","2"),ue.setAttribute("marker-end","url(#arrow-default)"))}),ae.addEventListener("click",()=>{fe&&X(fe)})}),Z&&W&&(Z.addEventListener("mouseenter",()=>{W.querySelectorAll(".connector-path").forEach(ae=>{ae.setAttribute("stroke",ae.dataset.accentColor||"#6366f1"),ae.setAttribute("stroke-width","3");const fe=ae.id.replace("path-","");ae.setAttribute("marker-end",`url(#arrow-${fe})`)})}),Z.addEventListener("mouseleave",()=>{W.querySelectorAll(".connector-path").forEach(ae=>{ae.setAttribute("stroke",ae.dataset.defaultStroke||"#cbd5e1"),ae.setAttribute("stroke-width","2"),ae.setAttribute("marker-end","url(#arrow-default)")})}),Z.addEventListener("click",()=>{const ae=Z.dataset.nodeId;ae&&X(ae)}));const J=p.querySelector("#prompt-graph-canvas");J&&typeof ResizeObserver<"u"&&(U=new ResizeObserver(()=>{requestAnimationFrame(()=>K())}),U.observe(J))}ie(),requestAnimationFrame(()=>K())}const Tt=new Map;function Hs(p){return p.includes("Lengua")?"📖":p.includes("Naturales")||p.includes("Ciencias")?"🌿":p.includes("Matemáticas")||p.includes("Mates")?"📐":p.includes("Sociales")||p.includes("Historia")?"🏛️":p.includes("Filosofía")?"🧠":p.includes("Química")?"🧪":p.includes("Tecnología")?"⚙️":p.includes("Tutoría")||p.includes("Lectura")?"📚":"💡"}function Us(p){return p.includes("Lengua")?"bg-cyan-50 text-cyan-700 border border-cyan-200":p.includes("Naturales")||p.includes("Química")?"bg-emerald-50 text-emerald-700 border border-emerald-200":p.includes("Matemáticas")||p.includes("Mates")?"bg-indigo-50 text-indigo-700 border border-indigo-200":p.includes("Sociales")||p.includes("Historia")||p.includes("Filosofía")?"bg-amber-50 text-amber-800 border border-amber-200":p.includes("Tutoría")||p.includes("Lectura")?"bg-purple-50 text-purple-700 border border-purple-200":"bg-slate-100 text-slate-700 border border-slate-200"}function Ws(p,a){const r=p.subject.includes("Lengua"),i=p.gradeKey==="2batx";let s=`¡Hola! Soy tu tutor socrático en **${p.subject}** (*${p.name}*).

Aquí no te daré soluciones directas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.

`;a?s+=`🎯 **Reto activo:** *${a.title}*
*"${a.sentenceOrCase}"*

¿Por dónde te gustaría empezar a razonarlo?`:s+="¿Qué duda o ejercicio estás abordando ahora mismo?";let c=["No sé cómo empezar el ejercicio","Tengo dudas con el primer paso","Quiero repasar la teoría básica"];return r&&!i?(a==null?void 0:a.order)===2?(s=`¡Hola Marc! Pasamos a la **Variación 1** de sintaxis oracional: 🚂🔄

Fíjate en esta oración: *"Por la mañana sonó ruidosa la alarma en el pasillo"*

Aquí el orden ha cambiado y la oración no empieza por el sujeto. ¿Qué palabra realiza la acción y con cuál concuerda el verbo *sonó*?`,c=['El sujeto es "la alarma", concuerda con "sonó"','¿Por qué "Por la mañana" no es el sujeto?',"¿Qué forma el complemento verbal en bloque?"]):(a==null?void 0:a.order)===3?(s=`¡Excelente avance Marc! Vamos con la **Variación 2** (Transferencia a contexto narrativo): 🎒🌲

Oración: *"Los jóvenes exploradores regresaron cansados al campamento al anochecer"*

¿Quién es el sujeto plural y qué palabras acompañan al verbo *regresaron* explicando cómo y hacia dónde se mueven?`,c=['El sujeto es "Los jóvenes exploradores"','El complemento verbal es "cansados al campamento al anochecer"',"¿Por qué no separamos los tipos de complementos?"]):(s=`¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨

En 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con clasificaciones abstractas.

Por ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`,c=['El sujeto es "El tren" y el verbo "llegó"',"¿Qué palabras forman el complemento verbal?","¿Cómo distingo el sujeto del predicado?"]):r&&i&&((a==null?void 0:a.order)===2?(s=`¡Hola Álvaro! Abordamos la **Variación 1** (Doble predicación sobre el CD - PAU): 🎓⚖️

Oración: *"El tribunal consideró inocente al acusado tras el juicio"*

Aquí el adjetivo *inocente* no se refiere al sujeto (*El tribunal*), sino al CD (*al acusado*). ¿Qué prueba sintáctica formal demuestra la concordancia entre el CD y el Complemento Predicativo?`,c=['Si fuera plural: "consideró inocentes a los acusados"','¿Cómo demuestro que "al acusado" es CD?',"¿Por qué no es una oración atributiva?"]):(a==null?void 0:a.order)===3?(s=`¡Hola Álvaro! Desafío de **Variación 2** (Contraste formal CPred vs CCM): 🎓🔍

Compara estas dos oraciones de examen PAU:
- A: *"El tren llegó puntual a la estación."*
- B: *"El tren llegó puntualmente a la estación."*

¿Qué prueba morfosintáctica demuestra que en A tenemos un CPred y en B un CC de Modo?`,c=['"Puntual" concuerda en plural; "puntualmente" es invariable',"¿Por qué un adjetivo no puede ser CCM según la RAE?",'¿Qué función tiene "a la estación" en ambas?']):(s=`¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚

En este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal y demostrarlo con pruebas formales.

Considera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica demuestra que es un **Complemento Predicativo (CPred)**?`,c=['"Puntual" concuerda con el sujeto en género y número','¿Y qué función sintáctica tiene "a la estación"?',"¿Cómo distingo un CPred de un Atributo?"])),{id:`msg_welcome_${Date.now()}`,role:"tutor",content:s,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:c}}function Ar(p,a){return p.subject.includes("Lengua")?a==="1eso"?{concept:'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?',explanation:'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'}:{concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?',explanation:'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'}:{concept:`¿Cómo definirías la idea clave o causa fundamental de ${p.name}?`,explanation:`Comprender los principios de ${p.name} articulando sus conceptos base: ${p.keyConcepts.join(", ")}.`}}function Qs(p){var X;const a=Le.getState(),r=((X=a.user)==null?void 0:X.gradeKey)||"1eso",i=a.user,s=qe.getTopicsForGrade(r);s.forEach($=>{var V;if(!Tt.has($.id)){const U=qe.getActivitiesForTopic($.id),ie=Ar($,r);Tt.set($.id,{topicId:$.id,status:"pending",selectedActivityId:((V=U[0])==null?void 0:V.id)||"",messages:[],flashcardConcept:ie.concept,flashcardExplanation:ie.explanation,flashcardRevealed:!1})}});function c($){var U;let V=Tt.get($);if(!V){const ie=s.find(z=>z.id===$)||s[0],R=qe.getActivitiesForTopic(ie.id),M=Ar(ie,r);V={topicId:ie.id,status:"pending",selectedActivityId:((U=R[0])==null?void 0:U.id)||"",messages:[],flashcardConcept:M.concept,flashcardExplanation:M.explanation,flashcardRevealed:!1},Tt.set($,V)}return V}function u($){for(const[U,ie]of Tt.entries())U!==$&&ie.status==="active"&&(ie.status="paused");const V=c($);if(V.status="active",V.lastActiveAt=new Date,V.messages.length===0){const U=s.find(ie=>ie.id===$);if(U){const ie=qe.getActivitiesForTopic(U.id),R=ie.find(M=>M.id===V.selectedActivityId)||ie[0];V.messages=[Ws(U,R)]}}I(),requestAnimationFrame(()=>{const U=p.querySelector(`#task-card-${$}`);U&&U.scrollIntoView({behavior:"smooth",block:"nearest"})})}function f($){const V=c($);V.status="paused",I()}function b($,V){const U=c($);U.selectedActivityId=V;const ie=s.find(R=>R.id===$);if(ie){const M=qe.getActivitiesForTopic(ie.id).find(z=>z.id===V);if(M){const z={id:`msg_var_${Date.now()}`,role:"tutor",content:`🎯 **Activitat actualitzada a ${M.title}:**
*"${M.sentenceOrCase}"*

¿Por dónde empezamos a analizar esta nueva variación?`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Qué cambia respecto al paso anterior?","Identifiquemos el sujeto y el verbo primero","Dame una pista sobre este reto"]};U.messages.push(z)}}I()}async function h($,V){const U=c($),ie=s.find(Q=>Q.id===$);if(!ie)return;const R={id:`msg_u_${Date.now()}`,role:"student",content:V,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};U.messages.push(R),I();const M=p.querySelector(`#btn-send-message-${$}`);M&&(M.innerHTML="<span>⏳</span>");const z=await $t.generateSocraticResponse(V,ie.subject,ie.id,U.messages,U.selectedActivityId);U.messages.push(z),I()}function C($){const V=$.role==="tutor";return`
      <div class="flex gap-3 ${V?"items-start":"items-start flex-row-reverse"}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${V?"bg-brand-500 text-white shadow-md shadow-brand-500/25":"bg-slate-800 text-white"}">
          ${V?"🧠":"👤"}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${V?"bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60":"bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10"}">
            <div class="prose prose-sm max-w-none">
              ${T($.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${V?"pl-1":"justify-end pr-1"}">
            <span>${E(V?"study.tutorRole":"study.userRole")}</span>
            <span>•</span>
            <span>${$.timestamp}</span>
          </div>
        </div>
      </div>
    `}function T($){const V=$.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>");return yt(V)}function I(){const $=Array.from(Tt.values()).find(U=>U.status==="active"),V=$?s.find(U=>U.id===$.topicId):null;p.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header (Consistent with Tasks/Projects view) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${E("study.taskListTitle")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${r==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(i==null?void 0:i.name)||"Estudiant"} • ${(i==null?void 0:i.gradeLevel)||(r==="2batx"?"2º Batx PAU":"1º de ESO")}
              </span>
              ${V?`<span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold flex items-center gap-1.5">
                       <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span>1 ${E("study.activeBadge")}: ${V.subject}</span>
                     </span>`:`<span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                       ${E("study.statusPaused")} / ${E("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500 mt-1">${E("study.taskListSubtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <span class="text-xs px-3 py-1.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 font-semibold flex items-center gap-1">
              <span>🛡️</span>
              <span>${E("study.safeMode")}</span>
            </span>
          </div>
        </div>

        <!-- Pedagogical Guarantee Banner -->
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan text-white shadow-lg shadow-brand-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h3 class="font-display font-bold text-base sm:text-lg">${E("study.bannerTitle")}</h3>
              <p class="text-xs text-white/90">${E("study.bannerGraphDesc")}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-semibold self-stretch md:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>${r==="2batx"?"Álvaro Martín (2º Batx PAU)":"Marc Vidal (1º ESO)"}</span>
          </div>
        </div>

        <!-- Study Tasks Accordion List -->
        <div class="space-y-5" id="study-tasks-list">
          ${s.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📚</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${E("study.noTasks")}</p>
              </div>
            `:s.map(U=>K(U)).join("")}
        </div>

      </div>
    `,L()}function K($){const V=c($.id),U=qe.getActivitiesForTopic($.id),ie=U.find(W=>W.id===V.selectedActivityId)||U[0],R=V.status==="paused",M=V.status==="active",z=Hs($.subject),Q=Us($.subject),Z=V.messages.filter(W=>W.role==="student").length;return M?`
        <div 
          id="task-card-${$.id}" 
          class="glass-panel p-6 rounded-3xl border-2 border-brand-500/70 bg-white/95 shadow-xl shadow-brand-500/10 glow-card space-y-5 transition-all duration-300"
        >
          <!-- Active Task Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-2xl">${z}</span>
                <h3 class="font-display font-bold text-lg text-slate-900">${$.name}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${Q}">
                  ${$.subject}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>${E("study.statusActive")}</span>
                </span>
              </div>
              <p class="text-xs text-slate-600">${$.pedagogicalNote||""}</p>
            </div>

            <!-- Header Controls -->
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button 
                data-pause-topic-id="${$.id}" 
                class="btn-pause-task px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${E("study.btnPause")}"
              >
                <span>⏸️</span>
                <span>${E("study.btnPause")}</span>
              </button>
              <button 
                data-topic-prompt-id="${$.id}" 
                class="btn-view-topic-prompt px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                title="${E("study.tooltipPromptGraph")}"
              >
                <span>🧩</span>
                <span>${E("study.btnPromptGraph")}</span>
              </button>
            </div>
          </div>

          <!-- Pedagogical Foundation Callout (Piaget / LOMLOE Anchor, identical to Tasks view) -->
          ${$.pedagogicalNote?`
            <div class="p-3.5 rounded-2xl ${r==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">🧠</span>
              <div>
                <span class="font-bold block">${E("study.pedagogicalAnchor")}</span>
                <span class="leading-relaxed">${$.pedagogicalNote}</span>
              </div>
            </div>
          `:""}

          <!-- Activities / Variations Stepper (Repetición con Variación) -->
          ${U.length>0?`
            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>${E("study.activityVariationLabel")}</span>
                </span>
                <span class="text-[11px] text-slate-400 font-mono">Repetición con Variación • ${U.length} niveles</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${U.map(W=>{const J=W.id===(ie==null?void 0:ie.id);return`
                    <button 
                      data-topic-id="${$.id}"
                      data-select-activity-id="${W.id}"
                      class="btn-select-activity text-left p-2.5 rounded-xl border text-xs transition-all ${J?"bg-brand-50 border-brand-300 text-brand-900 font-bold shadow-sm ring-1 ring-brand-400/40":"bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] uppercase font-mono font-bold ${J?"text-brand-600":"text-slate-400"}">${E("study.stepPrefix")} ${W.order}</span>
                        ${J?'<span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>':""}
                      </div>
                      <div class="truncate text-xs ${J?"font-bold":"font-medium"}">${W.title}</div>
                    </button>
                  `}).join("")}
              </div>

              ${ie?Gs("Cas Actiu:",ie.sentenceOrCase,ie.variationType):""}
            </div>
          `:""}

          <!-- Socratic Interaction Workspace (2 Columns Grid) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            
            <!-- Socratic Chat Interface (8 cols) -->
            <div class="lg:col-span-8 flex flex-col rounded-2xl border border-slate-200 overflow-hidden h-[620px] bg-slate-50/50">
              
              <!-- Chat Stream -->
              <div id="chat-stream-${$.id}" class="chat-stream flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                ${V.messages.map(W=>C(W)).join("")}
              </div>

              <!-- Quick Socratic Prompts (Chips) -->
              <div class="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
                <button data-topic-id="${$.id}" data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${E("study.chip1")}
                </button>
                <button data-topic-id="${$.id}" data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${E("study.chip2")}
                </button>
                <button data-topic-id="${$.id}" data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${E("study.chip3")}
                </button>
              </div>

              <!-- Chat Input Area -->
              <div class="p-4 bg-white border-t border-slate-200">
                <form data-topic-id="${$.id}" class="chat-form flex items-center gap-2">
                  <input 
                    type="text" 
                    id="chat-input-${$.id}" 
                    placeholder="${E("study.inputPlaceholder")}" 
                    required
                    class="chat-input flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    id="btn-send-message-${$.id}"
                    class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>${E("study.send")}</span>
                    <span>➤</span>
                  </button>
                </form>
                <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>${E("study.safeMode")}</span>
                  <span>${E("study.openaiCompatible")}</span>
                </div>
              </div>

            </div>

            <!-- Active Recall & Concept Cards (4 cols) -->
            <div class="lg:col-span-4 space-y-4">
              
              <!-- Card 1: Active Recall Flashcard -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${E("study.activeRecall")}</span>
                  <button data-view-recall-topic="${$.id}" class="btn-view-recall-prompt text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    <span>📄</span>
                    <span>${E("study.btnRecallPrompt")}</span>
                  </button>
                </div>

                <div>
                  <h4 class="font-bold text-sm text-slate-900">${E("study.flashcardTitle")}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${E("study.flashcardSubtitle")}</p>
                </div>

                <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                  <span id="flashcard-concept-${$.id}" class="text-xs font-bold text-brand-700 block leading-relaxed">
                    ${yt(V.flashcardConcept||"¿Cómo definirías el concepto principal de esta tarea?")}
                  </span>
                  
                  <div id="flashcard-answer-${$.id}" class="${V.flashcardRevealed?"":"hidden"} text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                    <p id="flashcard-explanation-${$.id}" class="leading-relaxed">
                      ${yt(V.flashcardExplanation||"")}
                    </p>
                  </div>

                  <button 
                    data-topic-id="${$.id}"
                    class="btn-toggle-answer w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    ${E("study.toggleHint")}
                  </button>
                </div>

                <!-- AI Card Generator -->
                <button 
                  data-topic-id="${$.id}" 
                  class="btn-generate-card-ai w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>⚡ Generar Nuevo Desafío con IA</span>
                </button>

                <div class="flex items-center justify-between gap-2 pt-1">
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    ${E("study.reviewLater")}
                  </button>
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    ${E("study.mastered")}
                  </button>
                </div>
              </div>

              <!-- Card 2: Conceptos Clave (Línea Base) -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${E("study.baselineConcepts")}</span>
                <ul class="space-y-2 text-xs">
                  ${$.keyConcepts.map((W,J)=>`
                    <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="font-medium text-slate-800">${W}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${J===0?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                        ${E(J===0?"study.consolidated":"study.toStrengthen")}
                      </span>
                    </li>
                  `).join("")}
                </ul>
              </div>

              <!-- Single Active Task Helper Callout -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>ℹ️</span>
                <span>${E("study.activeTaskNote")}</span>
              </div>

            </div>

          </div>

        </div>
      `:`
      <div 
        id="task-card-${$.id}" 
        class="glass-panel p-5 sm:p-6 rounded-3xl border ${R?"border-amber-300/80 bg-amber-50/20 shadow-md shadow-amber-500/5":"border-slate-200 hover:border-slate-300 bg-white/70"} glow-card space-y-4 transition-all duration-300"
      >
        <!-- Task Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl">${z}</span>
              <h3 class="font-display font-bold text-base text-slate-900">${$.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${Q}">
                ${$.subject}
              </span>
              ${R?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                       <span class="text-xs">⏸️</span>
                       <span>${E("study.statusPaused")}</span>
                     </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                       ${E("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500">${$.pedagogicalNote||""}</p>
          </div>

          <!-- Actions & Status Info -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            ${R?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-amber-900">${E("study.interactionsCount",{count:Z})}</span>
                <span class="text-[11px] text-amber-700 font-medium truncate max-w-[150px] block">${(ie==null?void 0:ie.title)||""}</span>
              </div>
            `:`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-slate-700">${E("study.badgeActivities",{count:U.length})}</span>
                <span class="text-[11px] text-slate-400 font-medium">${E("study.badgeConcepts",{count:$.keyConcepts.length})}</span>
              </div>
            `}

            <button 
              data-topic-prompt-id="${$.id}" 
              class="btn-view-topic-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              title="${E("study.tooltipPromptGraph")}"
            >
              <span>🧩</span>
              <span>${E("study.btnPromptGraph")}</span>
            </button>

            <button 
              data-start-topic-id="${$.id}" 
              class="btn-start-task px-4 py-2 rounded-2xl ${R?"bg-amber-600 hover:bg-amber-700 shadow-amber-500/20":"bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"} text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${R?"▶️":"🚀"}</span>
              <span>${E(R?"study.btnResume":"study.btnStart")}</span>
            </button>
          </div>
        </div>

        <!-- Task Preview Footer -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Conceptes:</span>
            ${$.keyConcepts.map(W=>`
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80">
                ${W}
              </span>
            `).join("")}
          </div>

          ${R?`
            <span class="text-[11px] text-amber-700/90 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${E("study.pauseNotice")}</span>
            </span>
          `:""}
        </div>
      </div>
    `}function L(){p.querySelectorAll(".btn-start-task").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.startTopicId;ge&&u(ge)})}),p.querySelectorAll(".btn-pause-task").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.pauseTopicId;ge&&f(ge)})}),p.querySelectorAll(".btn-select-activity").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.topicId,se=J.dataset.selectActivityId;ge&&se&&b(ge,se)})}),p.querySelectorAll(".btn-view-topic-prompt").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.topicPromptId,se=s.find(re=>re.id===ge);if(se){const re=c(se.id),ve=document.getElementById("modal-root")||document.body,ae=qe.assemblePrompt({role:"socratic",gradeKey:r,subject:se.subject,topicId:se.id,activityId:re.selectedActivityId});Jt(ve,E("study.modalSocraticTitle"),ae.systemInstruction,{assembledPrompt:ae,subtitle:E("study.modalSocraticSubtitle",{subject:se.subject,topic:se.name}),onClose:()=>{ve.innerHTML=""}})}})}),p.querySelectorAll(".btn-view-recall-prompt").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.viewRecallTopic,se=s.find(ae=>ae.id===ge)||s[0],re=document.getElementById("modal-root")||document.body,ve=qe.assemblePrompt({role:"recall",gradeKey:r,subject:se.subject,topicId:se.id});Jt(re,"Prompt Estático: Generador de Active Recall (active_recall_generator.md)",_o.recall,{assembledPrompt:ve,subtitle:"Prompt Transversal de Sección (Generación de Flashcards Conceptuales)",onClose:()=>{re.innerHTML=""}})})}),p.querySelectorAll(".btn-toggle-answer").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.topicId;if(ge){const se=c(ge);se.flashcardRevealed=!se.flashcardRevealed;const re=p.querySelector(`#flashcard-answer-${ge}`);re==null||re.classList.toggle("hidden",!se.flashcardRevealed)}})}),p.querySelectorAll(".btn-generate-card-ai").forEach(J=>{J.addEventListener("click",async()=>{const ge=J.dataset.topicId,se=s.find(re=>re.id===ge);if(se){J.innerHTML="<span>⏳ Generando desafío...</span>";try{const re=await $t.generateActiveRecallCard(se.subject,se.name),ve=c(se.id);ve.flashcardConcept=re.concept,ve.flashcardExplanation=re.explanation,ve.flashcardRevealed=!1;const ae=p.querySelector(`#flashcard-concept-${se.id}`),fe=p.querySelector(`#flashcard-explanation-${se.id}`),ue=p.querySelector(`#flashcard-answer-${se.id}`);ae&&(ae.innerHTML=yt(re.concept)),fe&&(fe.innerHTML=yt(re.explanation)),ue==null||ue.classList.add("hidden")}catch(re){alert(re.message||"Error al generar tarjeta con IA")}finally{J.innerHTML="<span>⚡ Generar Nuevo Desafío con IA</span>"}}})}),p.querySelectorAll(".chip-btn").forEach(J=>{J.addEventListener("click",()=>{const ge=J.dataset.topicId,se=J.dataset.prompt;ge&&se&&h(ge,se)})}),p.querySelectorAll(".chat-form").forEach(J=>{J.addEventListener("submit",ge=>{ge.preventDefault();const se=J.dataset.topicId;if(se){const re=p.querySelector(`#chat-input-${se}`);if(re&&re.value.trim()){const ve=re.value.trim();re.value="",h(se,ve)}}})}),p.querySelectorAll(".chat-stream").forEach(J=>{J.scrollTo({top:J.scrollHeight,behavior:"smooth"})})}I()}class Ys{async getAvailableFiles(){var h;const a=Le.getState();if(!a.isAuthenticated||!a.scopes.drive)throw new Error("Debes conectar tu cuenta de Google con acceso a Google Drive");if(a.mode==="demo")return[{fileId:"drv_demo_01",name:"Ensayo_Energia_Sostenible_Borrador.gdoc",mimeType:"application/vnd.google-apps.document",webViewLink:"https://docs.google.com/document",lastModified:"Hoy, 10:30"},{fileId:"drv_demo_02",name:"Presentacion_Historia_Siglo_XX.gslides",mimeType:"application/vnd.google-apps.presentation",webViewLink:"https://docs.google.com/presentation",lastModified:"Ayer"},{fileId:"drv_demo_03",name:"Apuntes_Biologia_Genetica.pdf",mimeType:"application/pdf",webViewLink:"https://drive.google.com",lastModified:"Hace 3 días"},{fileId:"drv_demo_04",name:"Datos_Graficos_Matematicas.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",webViewLink:"https://docs.google.com/spreadsheets",lastModified:"Hace 1 semana"}];const r=Le.getAccessToken();if(!r)throw new Error("El token de sesión de Google ha caducado. Vuelve a iniciar sesión.");const i=encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')"),s=encodeURIComponent("files(id,name,mimeType,webViewLink,iconLink,modifiedTime)"),c=`https://www.googleapis.com/drive/v3/files?pageSize=25&q=${i}&fields=${s}&orderBy=modifiedTime desc`,u=await fetch(c,{headers:{Authorization:`Bearer ${r}`}});if(!u.ok){const C=await u.json().catch(()=>({}));throw new Error(`Error de Google Drive API (${u.status}): ${((h=C.error)==null?void 0:h.message)||u.statusText}`)}return((await u.json()).files||[]).map(C=>({fileId:C.id,name:C.name,mimeType:C.mimeType,iconUrl:C.iconLink,webViewLink:C.webViewLink||`https://drive.google.com/open?id=${C.id}`,lastModified:C.modifiedTime?new Date(C.modifiedTime).toLocaleDateString():"Drive Sync"}))}}const Js=new Ys;function Xs(p){async function a(){await Os();const u=await Ce.projectTasks.toArray();r(u)}function r(u){var $,V,U,ie;const b=Le.getState().user,h=(b==null?void 0:b.gradeKey)||"1eso",C=u.filter(R=>!R.gradeKey||R.gradeKey===h||R.gradeKey==="both");p.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${E("tasks.title")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${h==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(b==null?void 0:b.name)||"Estudiante"} • ${(b==null?void 0:b.gradeLevel)||"1º de ESO"}
              </span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${E("tasks.driveIntegration")}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${E("tasks.subtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button id="btn-view-project-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${E("tasks.tooltipPromptProject")}">
              <span>📄</span>
              <span>${E("tasks.btnPromptProject")}</span>
            </button>
            <button id="btn-view-project-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${E("tasks.tooltipCurricularDirective")}">
              <span>🏛️</span>
              <span>${E("tasks.btnCurricularDirective")}</span>
            </button>
            <button id="btn-new-task" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${E("tasks.newTask")}</span>
            </button>
          </div>
        </div>

        <!-- Task Deliverables List -->
        <div class="space-y-6">
          ${C.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${E("tasks.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${E("tasks.emptyDesc")}</p>
              </div>
            `:C.map(R=>`
              <div class="glass-panel p-6 rounded-3xl border ${R.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":R.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-5">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${R.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${R.subject}
                      </span>
                      ${R.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ${E("tasks.grade1esoBadge")}
                            </span>`:R.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                              ${E("tasks.grade2batxBadge")}
                            </span>`:""}
                    </div>
                    <p class="text-xs text-slate-600 mt-1">${R.notes}</p>
                  </div>

                  <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">${E("tasks.dueDate")}: ${R.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">${E("tasks.autonomy")}: ${i(R)}%</span>
                    </div>
                    <button 
                      data-task-prompt-id="${R.id}" 
                      class="btn-view-task-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      title="${E("tasks.tooltipViewTaskPrompt",{title:R.title})}"
                    >
                      <span>🧩</span>
                      <span>${E("tasks.btnViewTaskPrompt")}</span>
                    </button>
                  </div>
                </div>

                ${R.pedagogicalNote?`
                  <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
                  <div class="p-3.5 rounded-2xl ${R.gradeKey==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
                    <span class="text-base flex-shrink-0">🧠</span>
                    <div>
                      <span class="font-bold block">${E("tasks.pedagogicalFoundation")}</span>
                      <span class="leading-relaxed">${R.pedagogicalNote}</span>
                    </div>
                  </div>
                `:""}

                <!-- 4-Phases Progression Stepper -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${E("tasks.phasesTitle")}</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${s(R.id,"planning",E("tasks.phases.planning"),R.currentPhase)}
                    ${s(R.id,"research",E("tasks.phases.research"),R.currentPhase)}
                    ${s(R.id,"writing",E("tasks.phases.writing"),R.currentPhase)}
                    ${s(R.id,"review",E("tasks.phases.review"),R.currentPhase)}
                  </div>
                </div>

                <!-- Google Drive Resources & Autonomy Checklist Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                  
                  <!-- Left: Google Drive Attached Files -->
                  <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">📁</span>
                        <h4 class="font-bold text-xs text-slate-800">${E("tasks.driveDocs")}</h4>
                      </div>
                      <button data-task-drive="${R.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>${E("tasks.attachDrive")}</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      ${R.driveFiles.length===0?`<p class="text-xs text-slate-400 py-2">${E("tasks.noDriveFiles")}</p>`:R.driveFiles.map(M=>`
                          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                            <div class="flex items-center gap-2 overflow-hidden">
                              <span class="text-base flex-shrink-0">${c(M.mimeType)}</span>
                              <div class="truncate">
                                <a href="${M.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${M.name}</a>
                                <span class="text-[10px] text-slate-400 font-mono">${M.lastModified||"Sincronizado"}</span>
                              </div>
                            </div>
                            <a href="${M.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                              ${E("tasks.driveSync")} ↗
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
                        <h4 class="font-bold text-xs text-brand-900">${E("tasks.autonomyMeter")}</h4>
                      </div>
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                        ${i(R)}% ${E("tasks.ownEffort")}
                      </span>
                    </div>

                    <div class="space-y-2">
                      ${R.criteria.map(M=>`
                        <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                          <input 
                            type="checkbox" 
                            data-task-id="${R.id}" 
                            data-crit-id="${M.id}" 
                            class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                            ${M.checked?"checked":""} 
                          />
                          <div>
                            <span class="font-semibold text-slate-800 block ${M.checked?"line-through text-slate-400":""}">${M.label}</span>
                            <span class="text-[11px] text-slate-500">${M.explanation}</span>
                          </div>
                        </label>
                      `).join("")}
                    </div>
                  </div>

                </div>

              </div>
            `).join("")}
        </div>

        <!-- New Task Modal -->
        <div id="new-task-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${E("tasks.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${E("tasks.modalSubtitle")}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${E("tasks.fieldTitle")}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${E("tasks.fieldSubject")}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${E("tasks.fieldDue")}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now()+864e5*10).toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${E("tasks.fieldNotes")}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${E("tasks.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${E("tasks.create")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,p.querySelectorAll(".crit-checkbox").forEach(R=>{R.addEventListener("change",async()=>{const M=Number(R.dataset.taskId),z=R.dataset.critId,Q=u.find(Z=>Z.id===M);if(Q){const Z=Q.criteria.find(W=>W.id===z);Z&&(Z.checked=R.checked,Q.autonomyScore=i(Q),await Ce.projectTasks.update(M,{criteria:Q.criteria,autonomyScore:Q.autonomyScore}),a())}})}),p.querySelectorAll(".phase-badge-btn").forEach(R=>{R.addEventListener("click",async()=>{const M=Number(R.dataset.taskId),z=R.dataset.phase;await Ce.projectTasks.update(M,{currentPhase:z}),a()})}),p.querySelectorAll(".btn-attach-drive").forEach(R=>{R.addEventListener("click",async()=>{const M=Number(R.dataset.taskDrive);try{const z=await Js.getAvailableFiles(),Q=u.find(Z=>Z.id===M);if(Q&&z.length>0){const Z=z.find(J=>!Q.driveFiles.some(ge=>ge.fileId===J.fileId))||z[0],W=[...Q.driveFiles,Z];await Ce.projectTasks.update(M,{driveFiles:W}),a()}}catch(z){alert(z.message||"Error al conectar con Google Drive")}})});const L=p.querySelector("#new-task-modal");($=p.querySelector("#btn-new-task"))==null||$.addEventListener("click",()=>{L==null||L.classList.remove("hidden")}),(V=p.querySelector("#btn-cancel-nt"))==null||V.addEventListener("click",()=>{L==null||L.classList.add("hidden")}),p.querySelectorAll(".btn-view-task-prompt").forEach(R=>{R.addEventListener("click",()=>{const M=Number(R.dataset.taskPromptId),z=u.find(se=>se.id===M);if(!z)return;const Q=z.gradeKey==="2batx"||z.gradeKey==="1eso"?z.gradeKey:h,Z=z.topicId?qe.findTopicById(z.topicId):qe.findTopicBySubjectOrKeyword(z.subject,Q,z.title),W=z.activityId?qe.findActivityById(z.activityId):Z?qe.getActivitiesForTopic(Z.id)[0]:void 0,J=qe.assemblePrompt({role:"project",gradeKey:Q,subject:z.subject,topicId:Z==null?void 0:Z.id,activityId:W==null?void 0:W.id}),ge=document.getElementById("modal-root")||document.body;Jt(ge,E("tasks.modalTaskPromptTitle",{title:z.title}),J.systemInstruction,{assembledPrompt:J,subtitle:E("tasks.modalTaskPromptSubtitle",{subject:z.subject}),onClose:()=>{ge.innerHTML=""}})})}),(U=p.querySelector("#btn-view-project-prompt"))==null||U.addEventListener("click",()=>{const R=document.getElementById("modal-root")||document.body,M=qe.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});Jt(R,E("tasks.modalProjectTitle"),M.systemInstruction,{assembledPrompt:M,subtitle:E("tasks.modalProjectSubtitle"),onClose:()=>{R.innerHTML=""}})}),(ie=p.querySelector("#btn-view-project-curricular"))==null||ie.addEventListener("click",async()=>{const R=document.getElementById("modal-root")||document.body,M=qe.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});Jt(R,M.layers.level2BaseTopic.title,M.layers.level2BaseTopic.content,{assembledPrompt:M,subtitle:E("agenda.modalCurricularSubtitle",{grade:h==="2batx"?"2º Bachillerato":"1º de ESO"}),institution:"Departament d'Educació de la Generalitat de Catalunya (Esfer@)",sourceApi:`https://api.educacio.gencat.cat/v1/curriculum/guardrails?grade=${h}`,gradeLevel:h==="2batx"?"2º de Bachillerato":"1º de ESO",onClose:()=>{R.innerHTML=""}})});const X=p.querySelector("#new-task-form");X==null||X.addEventListener("submit",async R=>{R.preventDefault();const M=p.querySelector("#nt-title").value,z=p.querySelector("#nt-subject").value,Q=p.querySelector("#nt-due").value,Z=p.querySelector("#nt-notes").value;await Ce.projectTasks.add({title:M,subject:z,gradeKey:h,dueDate:Q,currentPhase:"planning",autonomyScore:25,notes:Z,driveFiles:[{fileId:`drive_${Date.now()}`,name:`${M.replace(/\s+/g,"_")}_Borrador.gdoc`,mimeType:"application/vnd.google-apps.document",lastModified:"Recién creado"}],criteria:[{id:"c1",label:"Formulación y alcance del proyecto con mis palabras",checked:!0,explanation:"Definido el objetivo inicial de manera autónoma."},{id:"c2",label:"Búsqueda activa y contraste de fuentes fiables",checked:!1,explanation:"Seleccionar fuentes antes de escribir."},{id:"c3",label:"Redacción propia evitando generación automática por IA",checked:!1,explanation:"El texto debe ser fruto de la reflexión del estudiante."},{id:"c4",label:"Revisión crítica de estructura y conclusiones",checked:!1,explanation:"Validar que las conclusiones responden a la hipótesis."}]}),L==null||L.classList.add("hidden"),a()})}function i(u){if(!u.criteria||u.criteria.length===0)return 100;const f=u.criteria.filter(b=>b.checked).length;return Math.round(f/u.criteria.length*100)}function s(u,f,b,h){return`
      <button 
        data-task-id="${u}" 
        data-phase="${f}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${h===f?"bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20":"bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}"
      >
        ${b}
      </button>
    `}function c(u){return u.includes("document")?"📄":u.includes("presentation")||u.includes("slides")?"📊":u.includes("spreadsheet")||u.includes("sheet")?"📈":"📑"}a()}class Zs{constructor(){$e(this,"activeTab","study");$e(this,"navbarRoot");$e(this,"tabsRoot");$e(this,"viewContainer");$e(this,"modalRoot");$e(this,"isReady",!1);this.navbarRoot=document.getElementById("navbar-root"),this.tabsRoot=document.getElementById("tabs-root"),this.viewContainer=document.getElementById("app-view-container"),this.modalRoot=document.getElementById("modal-root")}async start(){await Zt.init(),await Ds(),await Cn.register(),Zt.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),Le.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),this.renderHeaderAndTabs(),this.switchView(this.activeTab),this.isReady=!0}renderHeaderAndTabs(){Ns(this.navbarRoot,{onOpenAISettings:()=>this.openAISettingsModal(),onOpenAuth:()=>this.openAuthModal(),onLanguageChange:()=>{}}),zs(this.tabsRoot,this.activeTab,{onTabChange:a=>{this.activeTab=a,this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}switchView(a){switch(this.viewContainer.innerHTML="",a){case"study":Qs(this.viewContainer);break;case"tasks":Xs(this.viewContainer);break}}openAISettingsModal(){Fs(this.modalRoot,{onSaved:()=>{this.modalRoot.innerHTML="",this.renderHeaderAndTabs()},onClose:()=>{this.modalRoot.innerHTML=""}})}openAuthModal(){Pn(this.modalRoot,{onClose:()=>{this.modalRoot.innerHTML=""},onStateChanged:()=>{this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}}document.addEventListener("DOMContentLoaded",()=>{new Zs().start().catch(a=>{console.error("[Anaxagoras AI] Error al inicializar la aplicación:",a)})});
//# sourceMappingURL=index-1r-rLpOy.js.map
