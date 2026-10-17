var ao=Object.defineProperty;var no=(p,a,n)=>a in p?ao(p,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):p[a]=n;var we=(p,a,n)=>no(p,typeof a!="symbol"?a+"":a,n);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=n(s);fetch(s.href,c)}})();const se=p=>typeof p=="string",Ut=()=>{let p,a;const n=new Promise((o,s)=>{p=o,a=s});return n.resolve=p,n.reject=a,n},yn=p=>p==null?"":String(p),ro=(p,a,n)=>{p.forEach(o=>{a[o]&&(n[o]=a[o])})},io=/###/g,cr=p=>p&&p.includes("###")?p.replace(io,"."):p,dr=p=>!p||se(p),Jt=(p,a,n)=>{const o=se(a)?a.split("."):a;let s=0;for(;s<o.length-1;){if(dr(p))return{};const c=cr(o[s]);!p[c]&&n&&(p[c]=new n),Object.prototype.hasOwnProperty.call(p,c)?p=p[c]:p={},++s}return dr(p)?{}:{obj:p,k:cr(o[s])}},ur=(p,a,n)=>{const{obj:o,k:s}=Jt(p,a,Object);if(o!==void 0||a.length===1){o[s]=n;return}let c=a[a.length-1],d=a.slice(0,a.length-1),m=Jt(p,d,Object);for(;m.obj===void 0&&d.length;)c=`${d[d.length-1]}.${c}`,d=d.slice(0,d.length-1),m=Jt(p,d,Object),m!=null&&m.obj&&typeof m.obj[`${m.k}.${c}`]<"u"&&(m.obj=void 0);m.obj[`${m.k}.${c}`]=n},oo=(p,a,n,o)=>{const{obj:s,k:c}=Jt(p,a,Object);s[c]=s[c]||[],s[c].push(n)},Da=(p,a)=>{const{obj:n,k:o}=Jt(p,a);if(n&&Object.prototype.hasOwnProperty.call(n,o))return n[o]},so=(p,a,n)=>{const o=Da(p,n);return o!==void 0?o:Da(a,n)},kr=(p,a,n)=>{for(const o in a)o!=="__proto__"&&o!=="constructor"&&(Object.prototype.hasOwnProperty.call(p,o)?se(p[o])||p[o]instanceof String||se(a[o])||a[o]instanceof String?n&&(p[o]=a[o]):kr(p[o],a[o],n):p[o]=a[o]);return p},Xe=p=>p.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),lo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},co=p=>se(p)?p.replace(/[&<>"'\/]/g,a=>lo[a]):p;class uo{constructor(a){this.capacity=a,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(a){const n=this.regExpMap.get(a);if(n!==void 0)return n;const o=new RegExp(a);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(a,o),this.regExpQueue.push(a),o}}const po=[" ",",","?","!",";"],mo=new uo(20),fo=(p,a,n)=>{a=a||"",n=n||"";const o=po.filter(d=>!a.includes(d)&&!n.includes(d));if(o.length===0)return!0;const s=mo.getRegExp(`(${o.map(d=>d==="?"?"\\?":d).join("|")})`);let c=!s.test(p);if(!c){const d=p.indexOf(n);d>0&&!s.test(p.substring(0,d))&&(c=!0)}return c},wn=(p,a,n=".")=>{if(!p)return;if(p[a])return Object.prototype.hasOwnProperty.call(p,a)?p[a]:void 0;const o=a.split(n);let s=p;for(let c=0;c<o.length;){if(!s||typeof s!="object")return;let d,m="";for(let b=c;b<o.length;++b)if(b!==c&&(m+=n),m+=o[b],d=s[m],d!==void 0){if(["string","number","boolean"].includes(typeof d)&&b<o.length-1)continue;c+=b-c+1;break}s=d}return s},Zt=p=>p==null?void 0:p.replace(/_/g,"-"),go={type:"logger",log(p){this.output("log",p)},warn(p){this.output("warn",p)},error(p){this.output("error",p)},output(p,a){var n,o;(o=(n=console==null?void 0:console[p])==null?void 0:n.apply)==null||o.call(n,console,a)}};class $a{constructor(a,n={}){this.init(a,n)}init(a,n={}){this.prefix=n.prefix||"i18next:",this.logger=a||go,this.options=n,this.debug=n.debug}log(...a){return this.forward(a,"log","",!0)}warn(...a){return this.forward(a,"warn","",!0)}error(...a){return this.forward(a,"error","")}deprecate(...a){return this.forward(a,"warn","WARNING DEPRECATED: ",!0)}forward(a,n,o,s){return s&&!this.debug?null:(a=a.map(c=>se(c)?c.replace(/[\r\n\x00-\x1F\x7F]/g," "):c),se(a[0])&&(a[0]=`${o}${this.prefix} ${a[0]}`),this.logger[n](a))}create(a){return new $a(this.logger,{prefix:`${this.prefix}:${a}:`,...this.options})}clone(a){return a=a||this.options,a.prefix=a.prefix||this.prefix,new $a(this.logger,a)}}var Ue=new $a;class Oa{constructor(){this.observers={}}on(a,n){return a.split(" ").forEach(o=>{this.observers[o]||(this.observers[o]=new Map);const s=this.observers[o].get(n)||0;this.observers[o].set(n,s+1)}),this}off(a,n){if(this.observers[a]){if(!n){delete this.observers[a];return}this.observers[a].delete(n)}}once(a,n){const o=(...s)=>{n(...s),this.off(a,o)};return this.on(a,o),this}emit(a,...n){this.observers[a]&&Array.from(this.observers[a].entries()).forEach(([s,c])=>{for(let d=0;d<c;d++)s(...n)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,c])=>{for(let d=0;d<c;d++)s(a,...n)})}}const pr=new WeakSet;class mr extends Oa{constructor(a,n={ns:["translation"],defaultNS:"translation"}){super(),this.data=a||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(a){this.options.ns.includes(a)||this.options.ns.push(a)}removeNamespaces(a){const n=this.options.ns.indexOf(a);n>-1&&this.options.ns.splice(n,1)}getResource(a,n,o,s={}){var h,v;const c=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,d=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let m;a.includes(".")?m=a.split("."):(m=[a,n],o&&(Array.isArray(o)?m.push(...o):se(o)&&c?m.push(...o.split(c)):m.push(o)));const b=Da(this.data,m);return!b&&!n&&!o&&a.includes(".")&&(a=m[0],n=m[1],o=m.slice(2).join(".")),b||!d||!se(o)?b:wn((v=(h=this.data)==null?void 0:h[a])==null?void 0:v[n],o,c)}addResource(a,n,o,s,c={silent:!1}){const d=c.keySeparator!==void 0?c.keySeparator:this.options.keySeparator;let m=[a,n];o&&(m=m.concat(d?o.split(d):o)),a.includes(".")&&(m=a.split("."),s=n,n=m[1]),this.addNamespaces(n),ur(this.data,m,s),c.silent||this.emit("added",a,n,o,s)}addResources(a,n,o,s={silent:!1}){for(const c in o)(se(o[c])||Array.isArray(o[c]))&&this.addResource(a,n,c,o[c],{silent:!0});s.silent||this.emit("added",a,n,o)}addResourceBundle(a,n,o,s,c,d={silent:!1,skipCopy:!1}){let m=[a,n];a.includes(".")&&(m=a.split("."),s=o,o=n,n=m[1]),this.addNamespaces(n);let b=Da(this.data,m)||{};d.skipCopy||(o=JSON.parse(JSON.stringify(o))),s?kr(b,o,c):b={...b,...o},ur(this.data,m,b),d.silent||this.emit("added",a,n,o)}removeResourceBundle(a,n){this.hasResourceBundle(a,n)&&delete this.data[a][n],this.removeNamespaces(n),this.emit("removed",a,n)}hasResourceBundle(a,n){return this.getResource(a,n)!==void 0}getResourceBundle(a,n){return n||(n=this.options.defaultNS),this.getResource(a,n)}getDataByLanguage(a){return this.data[a]}hasLanguageSomeTranslations(a){const n=this.getDataByLanguage(a);return!!(n&&Object.keys(n)||[]).find(s=>{const c=n[s];return pr.has(c)?!0:!c||Object.keys(c).length===0?!1:(typeof c=="object"&&pr.add(c),!0)})}toJSON(){return this.data}}var Tr={processors:{},addPostProcessor(p){this.processors[p.name]=p},handle(p,a,n,o,s){return p.forEach(c=>{var d;a=((d=this.processors[c])==null?void 0:d.process(a,n,o,s))??a}),a}};const Dr=Symbol("i18next/PATH_KEY");function bo(){const p=[],a=Object.create(null);let n;return a.get=(o,s)=>{var c;return(c=n==null?void 0:n.revoke)==null||c.call(n),s===Dr?p:(p.push(s),n=Proxy.revocable(o,a),n.proxy)},Proxy.revocable(Object.create(null),a).proxy}function $t(p,a){const{[Dr]:n}=p(bo()),o=(a==null?void 0:a.keySeparator)??".",s=(a==null?void 0:a.nsSeparator)??":",c=(a==null?void 0:a.enableSelector)==="strict";if(n.length>1&&s){const d=a==null?void 0:a.ns,m=c?Array.isArray(d)?d:d?[d]:null:Array.isArray(d)?d:null;if(m&&(c?m:m.length>1?m.slice(1):[]).includes(n[0]))return`${n[0]}${s}${n.slice(1).join(o)}`}return n.join(o)}const xn=p=>!se(p)&&typeof p!="boolean"&&typeof p!="number";class Ia extends Oa{constructor(a,n={}){super(),ro(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],a,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Ue.create("translator"),this.checkedLoadedFor={}}changeLanguage(a){a&&(this.language=a)}exists(a,n={interpolation:{}}){const o={...n};if(a==null)return!1;const s=this.resolve(a,o);if((s==null?void 0:s.res)===void 0)return!1;const c=xn(s.res);return!(o.returnObjects===!1&&c)}extractFromKey(a,n){let o=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;o===void 0&&(o=":");const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let c=n.ns||this.options.defaultNS||[];const d=o&&a.includes(o),m=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!fo(a,o,s);if(d&&!m){const b=a.match(this.interpolator.nestingRegexp);if(b&&b.length>0)return{key:a,namespaces:se(c)?[c]:c};const h=a.split(o);(o!==s||o===s&&this.options.ns.includes(h[0]))&&(c=h.shift()),a=h.join(s)}return{key:a,namespaces:se(c)?[c]:c}}translate(a,n,o){let s=typeof n=="object"?{...n}:n;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),a==null)return"";typeof a=="function"&&(a=$t(a,{...this.options,...s})),Array.isArray(a)||(a=[String(a)]),a=a.map(ne=>typeof ne=="function"?$t(ne,{...this.options,...s}):String(ne));const c=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,d=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:m,namespaces:b}=this.extractFromKey(a[a.length-1],s),h=b[b.length-1];let v=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;v===void 0&&(v=":");const x=s.lng||this.language,j=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((x==null?void 0:x.toLowerCase())==="cimode")return j?c?{res:`${h}${v}${m}`,usedKey:m,exactUsedKey:m,usedLng:x,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:`${h}${v}${m}`:c?{res:m,usedKey:m,exactUsedKey:m,usedLng:x,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:m;const R=this.resolve(a,s);let L=R==null?void 0:R.res;const Q=(R==null?void 0:R.usedKey)||m,$=(R==null?void 0:R.exactUsedKey)||m,B=["[object Number]","[object Function]","[object RegExp]"],K=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,re=!this.i18nFormat||this.i18nFormat.handleAsObject,q=s.count!==void 0&&!se(s.count),Z=Ia.hasDefaultValue(s),J=q?this.pluralResolver.getSuffix(x,s.count,s):"",oe=s.ordinal&&q?this.pluralResolver.getSuffix(x,s.count,{ordinal:!1}):"",ge=q&&!s.ordinal&&s.count===0,G=ge&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${J}`]||s[`defaultValue${oe}`]||s.defaultValue;let M=L;re&&!L&&Z&&(M=G);const Y=xn(M),te=Object.prototype.toString.apply(M);if(re&&M&&Y&&!B.includes(te)&&!(se(K)&&Array.isArray(M))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const ne=this.options.returnedObjectHandler?this.options.returnedObjectHandler(Q,M,{...s,ns:b}):`key '${m} (${this.language})' returned an object instead of string.`;return c?(R.res=ne,R.usedParams=this.getUsedParamsDetails(s),R):ne}if(d){const ne=Array.isArray(M),ve=ne?[]:{},Ie=ne?$:Q;for(const ke in M)if(Object.prototype.hasOwnProperty.call(M,ke)){const je=`${Ie}${d}${ke}`;Z&&!L?ve[ke]=this.translate(je,{...s,defaultValue:xn(G)?G[ke]:void 0,joinArrays:!1,ns:b}):ve[ke]=this.translate(je,{...s,joinArrays:!1,ns:b}),ve[ke]===je&&(ve[ke]=M[ke])}L=ve}}else if(re&&se(K)&&Array.isArray(L))L=L.join(K),L&&(L=this.extendTranslation(L,a,s,o));else{let ne=!1,ve=!1;!this.isValidLookup(L)&&Z&&(ne=!0,L=G),this.isValidLookup(L)||(ve=!0,L=m);const ke=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&ve?void 0:L,je=Z&&G!==L&&this.options.updateMissing;if(ve||ne||je){if(this.logger.log(je?"updateKey":"missingKey",x,h,q&&!je?`${m}${this.pluralResolver.getSuffix(x,s.count,s)}`:m,je?G:L),d){const Te=this.resolve(m,{...s,keySeparator:!1});Te&&Te.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let Be=[];const Ke=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Ke&&Ke[0])for(let Te=0;Te<Ke.length;Te++)Be.push(Ke[Te]);else this.options.saveMissingTo==="all"?Be=this.languageUtils.toResolveHierarchy(s.lng||this.language):Be.push(s.lng||this.language);const Fe=(Te,De,lt)=>{var It;const Qe=Z&&lt!==L?lt:ke;this.options.missingKeyHandler?this.options.missingKeyHandler(Te,h,De,Qe,je,s):(It=this.backendConnector)!=null&&It.saveMissing&&this.backendConnector.saveMissing(Te,h,De,Qe,je,s),this.emit("missingKey",Te,h,De,L)};this.options.saveMissing&&(this.options.saveMissingPlurals&&q?Be.forEach(Te=>{const De=this.pluralResolver.getSuffixes(Te,s);ge&&s[`defaultValue${this.options.pluralSeparator}zero`]&&!De.includes(`${this.options.pluralSeparator}zero`)&&De.push(`${this.options.pluralSeparator}zero`),De.forEach(lt=>{Fe([Te],m+lt,s[`defaultValue${lt}`]||G)})}):Fe(Be,m,G))}L=this.extendTranslation(L,a,s,R,o),ve&&L===m&&this.options.appendNamespaceToMissingKey&&(L=`${h}${v}${m}`),(ve||ne)&&this.options.parseMissingKeyHandler&&(L=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${h}${v}${m}`:m,ne?L:void 0,s))}return c?(R.res=L,R.usedParams=this.getUsedParamsDetails(s),R):L}extendTranslation(a,n,o,s,c){var b,h;if((b=this.i18nFormat)!=null&&b.parse)a=this.i18nFormat.parse(a,{...this.options.interpolation.defaultVariables,...o},o.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!o.skipInterpolation){o.interpolation&&this.interpolator.init({...o,interpolation:{...this.options.interpolation,...o.interpolation}});const v=se(a)&&(((h=o==null?void 0:o.interpolation)==null?void 0:h.skipOnVariables)!==void 0?o.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let x;if(v){const R=a.match(this.interpolator.nestingRegexp);x=R&&R.length}let j=o.replace&&!se(o.replace)?o.replace:o;if(this.options.interpolation.defaultVariables&&(j={...this.options.interpolation.defaultVariables,...j}),a=this.interpolator.interpolate(a,j,o.lng||this.language||s.usedLng,o),v){const R=a.match(this.interpolator.nestingRegexp),L=R&&R.length;x<L&&(o.nest=!1)}!o.lng&&s&&s.res&&(o.lng=this.language||s.usedLng),o.nest!==!1&&(a=this.interpolator.nest(a,(...R)=>(c==null?void 0:c[0])===R[0]&&!o.context?(this.logger.warn(`It seems you are nesting recursively key: ${R[0]} in key: ${n[0]}`),null):this.translate(...R,n),o)),o.interpolation&&this.interpolator.reset()}const d=o.postProcess||this.options.postProcess,m=se(d)?[d]:d;return a!=null&&(m!=null&&m.length)&&o.applyPostProcessor!==!1&&(a=Tr.handle(m,a,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(o)},...o}:o,this)),a}resolve(a,n={}){let o,s,c,d,m;return se(a)&&(a=[a]),Array.isArray(a)&&(a=a.map(b=>typeof b=="function"?$t(b,{...this.options,...n}):b)),a.forEach(b=>{if(this.isValidLookup(o))return;const h=this.extractFromKey(b,n),v=h.key;s=v;let x=h.namespaces;this.options.fallbackNS&&(x=x.concat(this.options.fallbackNS));const j=n.count!==void 0&&!se(n.count),R=j&&!n.ordinal&&n.count===0,L=n.context!==void 0&&(se(n.context)||typeof n.context=="number")&&n.context!=="",Q=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);x.forEach($=>{var B,K;this.isValidLookup(o)||(m=$,!this.checkedLoadedFor[`${Q[0]}-${$}`]&&((B=this.utils)!=null&&B.hasLoadedNamespace)&&!((K=this.utils)!=null&&K.hasLoadedNamespace(m))&&(this.checkedLoadedFor[`${Q[0]}-${$}`]=!0,this.logger.warn(`key "${s}" for languages "${Q.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),Q.forEach(re=>{var J;if(this.isValidLookup(o))return;d=re;const q=[v];if((J=this.i18nFormat)!=null&&J.addLookupKeys)this.i18nFormat.addLookupKeys(q,v,re,$,n);else{let oe;j&&(oe=this.pluralResolver.getSuffix(re,n.count,n));const ge=`${this.options.pluralSeparator}zero`,G=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(j&&(n.ordinal&&oe.startsWith(G)&&q.push(v+oe.replace(G,this.options.pluralSeparator)),q.push(v+oe),R&&q.push(v+ge)),L){const M=`${v}${this.options.contextSeparator||"_"}${n.context}`;q.push(M),j&&(n.ordinal&&oe.startsWith(G)&&q.push(M+oe.replace(G,this.options.pluralSeparator)),q.push(M+oe),R&&q.push(M+ge))}}let Z;for(;Z=q.pop();)this.isValidLookup(o)||(c=Z,o=this.getResource(re,$,Z,n))}))})}),{res:o,usedKey:s,exactUsedKey:c,usedLng:d,usedNS:m}}isValidLookup(a){return a!==void 0&&!(!this.options.returnNull&&a===null)&&!(!this.options.returnEmptyString&&a==="")}getResource(a,n,o,s={}){var c;return(c=this.i18nFormat)!=null&&c.getResource?this.i18nFormat.getResource(a,n,o,s):this.resourceStore.getResource(a,n,o,s)}getUsedParamsDetails(a={}){const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],o=a.replace&&!se(a.replace);let s=o?a.replace:a;if(o&&typeof a.count<"u"&&(s={...s,count:a.count}),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!o){s={...s};for(const c of n)delete s[c]}return s}static hasDefaultValue(a){const n="defaultValue";for(const o in a)if(Object.prototype.hasOwnProperty.call(a,o)&&o.startsWith(n)&&a[o]!==void 0)return!0;return!1}}class fr{constructor(a){this.options=a,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Ue.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(a){if(a=Zt(a),!a||!a.includes("-"))return null;const n=a.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(a){if(a=Zt(a),!a||!a.includes("-"))return a;const n=a.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(a){if(se(a)&&a.includes("-")){let n;try{n=Intl.getCanonicalLocales(a)[0]}catch{}return n&&this.options.lowerCaseLng&&(n=n.toLowerCase()),n||(this.options.lowerCaseLng?a.toLowerCase():a)}return this.options.cleanCode||this.options.lowerCaseLng?a.toLowerCase():a}isSupportedCode(a){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(a=this.getLanguagePartFromCode(a)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(a)}getBestMatchFromCodes(a){if(!a)return null;let n;return a.forEach(o=>{if(n)return;const s=this.formatLanguageCode(o);(!this.options.supportedLngs||this.isSupportedCode(s))&&(n=s)}),!n&&this.options.supportedLngs&&a.forEach(o=>{if(n)return;const s=this.getScriptPartFromCode(o);if(this.isSupportedCode(s))return n=s;const c=this.getLanguagePartFromCode(o);if(this.isSupportedCode(c))return n=c;n=this.options.supportedLngs.find(d=>d===c?!0:!d.includes("-")&&!c.includes("-")?!1:!!(d.includes("-")&&!c.includes("-")&&d.slice(0,d.indexOf("-"))===c||d.startsWith(c)&&c.length>1))}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(a,n){if(!a)return[];if(typeof a=="function"&&(a=a(n)),se(a)&&(a=[a]),Array.isArray(a))return a;if(!n)return a.default||[];let o=a[n];return o||(o=a[this.getScriptPartFromCode(n)]),o||(o=a[this.formatLanguageCode(n)]),o||(o=a[this.getLanguagePartFromCode(n)]),o||(o=a.default),o||[]}toResolveHierarchy(a,n){const o=this.options.fallbackLng,s=Array.isArray(o)?o.join("|"):o;s!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=s);const c=n===void 0||n===!1||se(n),d=n===void 0&&typeof this.options.fallbackLng=="function",m=se(a)&&c&&!d;let b=null;if(m){let j;n===void 0?j="undefined":n===!1?j="boolean:false":j=`string:${n}`,b=`${a.length}:${a}|${j}`}if(b!==null){const j=this.resolveHierarchyCache[b];if(j!==void 0)return j.slice()}const h=this.getFallbackCodes((n===!1?[]:n)||this.options.fallbackLng||[],a),v=[],x=j=>{j&&(this.isSupportedCode(j)?v.push(j):this.logger.warn(`rejecting language code not found in supportedLngs: ${j}`))};return se(a)&&(a.includes("-")||a.includes("_"))?(this.options.load!=="languageOnly"&&x(this.formatLanguageCode(a)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&x(this.getScriptPartFromCode(a)),this.options.load!=="currentOnly"&&x(this.getLanguagePartFromCode(a))):se(a)&&x(this.formatLanguageCode(a)),h.forEach(j=>{v.includes(j)||x(this.formatLanguageCode(j))}),b!==null?(this.resolveHierarchyCache[b]=v,v.slice()):v}}const gr={zero:0,one:1,two:2,few:3,many:4,other:5},br={select:p=>p===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class ho{constructor(a,n={}){this.languageUtils=a,this.options=n,this.logger=Ue.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(a,n={}){const o=Zt(a==="dev"?"en":a),s=n.ordinal?"ordinal":"cardinal",c=JSON.stringify({cleanedCode:o,type:s});if(c in this.pluralRulesCache)return this.pluralRulesCache[c];let d;try{d=new Intl.PluralRules(o,{type:s})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),br;if(!a.match(/-|_/))return br;const b=this.languageUtils.getLanguagePartFromCode(a);d=this.getRule(b,n)}return this.pluralRulesCache[c]=d,d}needsPlural(a,n={}){let o=this.getRule(a,n);return o||(o=this.getRule("dev",n)),(o==null?void 0:o.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(a,n,o={}){return this.getSuffixes(a,o).map(s=>`${n}${s}`)}getSuffixes(a,n={}){let o=this.getRule(a,n);return o||(o=this.getRule("dev",n)),o?o.resolvedOptions().pluralCategories.sort((s,c)=>gr[s]-gr[c]).map(s=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(a,n,o={}){const s=this.getRule(a,o);return s?`${this.options.prepend}${o.ordinal?`ordinal${this.options.prepend}`:""}${s.select(n)}`:(this.logger.warn(`no plural rule found for: ${a}`),this.getSuffix("dev",n,o))}}const hr=(p,a,n,o=".",s=!0)=>{let c=so(p,a,n);return!c&&s&&se(n)&&(c=wn(p,n,o),c===void 0&&(c=wn(a,n,o))),c},vr=p=>p.replace(/\$/g,"$$$$");class yr{constructor(a={}){var n;this.logger=Ue.create("interpolator"),this.options=a,this.format=((n=a==null?void 0:a.interpolation)==null?void 0:n.format)||(o=>o),this.init(a)}init(a={}){a.interpolation||(a.interpolation={escapeValue:!0});const{escape:n,escapeValue:o,useRawValueToEscape:s,prefix:c,prefixEscaped:d,suffix:m,suffixEscaped:b,formatSeparator:h,unescapeSuffix:v,unescapePrefix:x,nestingPrefix:j,nestingPrefixEscaped:R,nestingSuffix:L,nestingSuffixEscaped:Q,nestingOptionsSeparator:$,maxReplaces:B,alwaysFormat:K}=a.interpolation;this.escape=n!==void 0?n:co,this.escapeValue=o!==void 0?o:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=c?Xe(c):d||"{{",this.suffix=m?Xe(m):b||"}}",this.formatSeparator=h||",",this.unescapePrefix=v?"":x?Xe(x):"-",this.unescapeSuffix=this.unescapePrefix?"":v?Xe(v):"",this.nestingPrefix=j?Xe(j):R||Xe("$t("),this.nestingSuffix=L?Xe(L):Q||Xe(")"),this.nestingOptionsSeparator=$||",",this.maxReplaces=B||1e3,this.alwaysFormat=K!==void 0?K:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const a=(n,o)=>(n==null?void 0:n.source)===o?(n.lastIndex=0,n):new RegExp(o,"g");this.regexp=a(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=a(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=a(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(a,n,o,s){var R;let c,d,m;const b=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},h=L=>{if(!L.includes(this.formatSeparator)){const K=hr(n,b,L,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(K,void 0,o,{...s,...n,interpolationkey:L}):K}const Q=L.split(this.formatSeparator),$=Q.shift().trim(),B=Q.join(this.formatSeparator).trim();return this.format(hr(n,b,$,this.options.keySeparator,this.options.ignoreJSONStructure),B,o,{...s,...n,interpolationkey:$})};this.resetRegExp(),!this.escapeValue&&typeof a=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(a)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const v=(s==null?void 0:s.missingInterpolationHandler)||this.options.missingInterpolationHandler,x=((R=s==null?void 0:s.interpolation)==null?void 0:R.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:L=>L},{regex:this.regexp,safeValue:L=>this.escapeValue?this.escape(L):L}].forEach(L=>{for(m=0;c=L.regex.exec(a);){const Q=c[1].trim();if(d=h(Q),d===void 0)if(typeof v=="function"){const B=v(a,c,s);d=se(B)?B:""}else if(s&&Object.prototype.hasOwnProperty.call(s,Q))d="";else if(x){d=c[0];continue}else this.logger.warn(`missed to pass in variable ${Q} for interpolating ${a}`),d="";else!se(d)&&!this.useRawValueToEscape&&(d=yn(d));const $=L.safeValue(d);if(a=a.replace(c[0],vr($)),x?(L.regex.lastIndex+=$.length,L.regex.lastIndex-=c[0].length):L.regex.lastIndex=0,m++,m>=this.maxReplaces)break}}),a}nest(a,n,o={}){let s,c,d;const m=(b,h)=>{const v=this.nestingOptionsSeparator;if(!b.includes(v))return b;const x=b.split(new RegExp(`${Xe(v)}[ ]*{`));let j=`{${x[1]}`;b=x[0],j=this.interpolate(j,d);const R=j.match(/'/g),L=j.match(/"/g);(((R==null?void 0:R.length)??0)%2===0&&!L||((L==null?void 0:L.length)??0)%2!==0)&&(j=j.replace(/'/g,'"'));try{d=JSON.parse(j),h&&(d={...h,...d})}catch(Q){return this.logger.warn(`failed parsing options string in nesting for key ${b}`,Q),`${b}${v}${j}`}return d.defaultValue&&d.defaultValue.includes(this.prefix)&&delete d.defaultValue,b};for(;s=this.nestingRegexp.exec(a);){let b=[];d={...o},d=d.replace&&!se(d.replace)?d.replace:d,d.applyPostProcessor=!1,delete d.defaultValue;const h=/{.*}/s.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(h!==-1&&(b=s[1].slice(h).split(this.formatSeparator).map(v=>v.trim()).filter(Boolean),s[1]=s[1].slice(0,h)),c=n(m.call(this,s[1].trim(),d),d),c&&s[0]===a&&!se(c))return c;se(c)||(c=yn(c)),c||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${a}`),c=""),b.length&&(c=b.reduce((v,x)=>this.format(v,x,o.lng,{...o,interpolationkey:s[1].trim()}),c.trim())),a=a.replace(s[0],vr(yn(c))),this.regexp.lastIndex=0}return a}}const vo=p=>{let a=p.toLowerCase().trim();const n={};if(p.includes("(")){const o=p.split("(");a=o[0].toLowerCase().trim();const s=o[1].slice(0,-1);a==="currency"&&!s.includes(":")?n.currency||(n.currency=s.trim()):a==="relativetime"&&!s.includes(":")?n.range||(n.range=s.trim()):s.split(";").forEach(d=>{if(d){const[m,...b]=d.split(":"),h=b.join(":").trim().replace(/^'+|'+$/g,""),v=m.trim();n[v]||(n[v]=h),h==="false"&&(n[v]=!1),h==="true"&&(n[v]=!0),isNaN(h)||(n[v]=parseInt(h,10))}})}return{formatName:a,formatOptions:n}},xr=p=>{const a={};return(n,o,s)=>{let c=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(c={...c,[s.interpolationkey]:void 0});const d=o+JSON.stringify(c);let m=a[d];return m||(m=p(Zt(o),s),a[d]=m),m(n)}},yo=p=>(a,n,o)=>p(Zt(n),o)(a);class xo{constructor(a={}){this.logger=Ue.create("formatter"),this.options=a,this.init(a)}init(a,n={interpolation:{}}){this.formatSeparator=n.interpolation.formatSeparator||",";const o=n.cacheInBuiltFormats?xr:yo;this.formats={number:o((s,c)=>{const d=new Intl.NumberFormat(s,{...c});return m=>d.format(m)}),currency:o((s,c)=>{const d=new Intl.NumberFormat(s,{...c,style:"currency"});return m=>d.format(m)}),datetime:o((s,c)=>{const d=new Intl.DateTimeFormat(s,{...c});return m=>d.format(m)}),relativetime:o((s,c)=>{const d=new Intl.RelativeTimeFormat(s,{...c});return m=>d.format(m,c.range||"day")}),list:o((s,c)=>{const d=new Intl.ListFormat(s,{...c});return m=>d.format(m)})}}add(a,n){this.formats[a.toLowerCase().trim()]=n}addCached(a,n){this.formats[a.toLowerCase().trim()]=xr(n)}format(a,n,o,s={}){if(!n||a==null)return a;const c=n.split(this.formatSeparator),d=[];for(let b=0;b<c.length;b++){let h=c[b];for(;h.indexOf("(")>-1&&!h.includes(")")&&b+1<c.length;)h=`${h}${this.formatSeparator}${c[++b]}`;d.push(h)}return d.reduce((b,h)=>{var j;const{formatName:v,formatOptions:x}=vo(h);if(this.formats[v]){let R=b;try{const L=((j=s==null?void 0:s.formatParams)==null?void 0:j[s.interpolationkey])||{},Q=L.locale||L.lng||s.locale||s.lng||o;R=this.formats[v](b,Q,{...x,...s,...L})}catch(L){this.logger.warn(L)}return R}else this.logger.warn(`there was no format function for ${v}`);return b},a)}}const _o=(p,a)=>{p.pending[a]!==void 0&&(delete p.pending[a],p.pendingCount--)};class wo extends Oa{constructor(a,n,o,s={}){var c,d;super(),this.backend=a,this.store=n,this.services=o,this.languageUtils=o.languageUtils,this.options=s,this.logger=Ue.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],(d=(c=this.backend)==null?void 0:c.init)==null||d.call(c,o,s.backend,s)}queueLoad(a,n,o,s){const c={},d={},m={},b={};return a.forEach(h=>{let v=!0;n.forEach(x=>{const j=`${h}|${x}`;!o.reload&&this.store.hasResourceBundle(h,x)?this.state[j]=2:this.state[j]<0||(this.state[j]===1?d[j]===void 0&&(d[j]=!0):(this.state[j]=1,v=!1,d[j]===void 0&&(d[j]=!0),c[j]===void 0&&(c[j]=!0),b[x]===void 0&&(b[x]=!0)))}),v||(m[h]=!0)}),(Object.keys(c).length||Object.keys(d).length)&&this.queue.push({pending:d,pendingCount:Object.keys(d).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(c),pending:Object.keys(d),toLoadLanguages:Object.keys(m),toLoadNamespaces:Object.keys(b)}}loaded(a,n,o){const s=a.split("|"),c=s[0],d=s[1];n&&this.emit("failedLoading",c,d,n),!n&&o&&this.store.addResourceBundle(c,d,o,void 0,void 0,{skipCopy:!0}),this.state[a]=n?-1:2,n&&o&&(this.state[a]=0);const m={};this.queue.forEach(b=>{oo(b.loaded,[c],d),_o(b,a),n&&b.errors.push(n),b.pendingCount===0&&!b.done&&(Object.keys(b.loaded).forEach(h=>{m[h]||(m[h]={});const v=b.loaded[h];v.length&&v.forEach(x=>{m[h][x]===void 0&&(m[h][x]=!0)})}),b.done=!0,b.errors.length?b.callback(b.errors):b.callback())}),this.emit("loaded",m),this.queue=this.queue.filter(b=>!b.done)}read(a,n,o,s=0,c=this.retryTimeout,d){if(!a.length)return d(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:a,ns:n,fcName:o,tried:s,wait:c,callback:d});return}this.readingCalls++;const m=(h,v)=>{if(this.readingCalls--,this.waitingReads.length>0){const x=this.waitingReads.shift();this.read(x.lng,x.ns,x.fcName,x.tried,x.wait,x.callback)}if(h&&v&&s<this.maxRetries){setTimeout(()=>{this.read(a,n,o,s+1,c*2,d)},c);return}d(h,v)},b=this.backend[o].bind(this.backend);if(b.length===2){try{const h=b(a,n);h&&typeof h.then=="function"?h.then(v=>m(null,v)).catch(m):m(null,h)}catch(h){m(h)}return}return b(a,n,m)}prepareLoading(a,n,o={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();se(a)&&(a=this.languageUtils.toResolveHierarchy(a)),se(n)&&(n=[n]);const c=this.queueLoad(a,n,o,s);if(!c.toLoad.length)return c.pending.length||s(),null;c.toLoad.forEach(d=>{this.loadOne(d)})}load(a,n,o){this.prepareLoading(a,n,{},o)}reload(a,n,o){this.prepareLoading(a,n,{reload:!0},o)}loadOne(a,n=""){const o=a.split("|"),s=o[0],c=o[1];this.read(s,c,"read",void 0,void 0,(d,m)=>{d&&this.logger.warn(`${n}loading namespace ${c} for language ${s} failed`,d),!d&&m&&this.logger.log(`${n}loaded namespace ${c} for language ${s}`,m),this.loaded(a,d,m)})}saveMissing(a,n,o,s,c,d={},m=()=>{}){var b,h,v,x,j;if((h=(b=this.services)==null?void 0:b.utils)!=null&&h.hasLoadedNamespace&&!((x=(v=this.services)==null?void 0:v.utils)!=null&&x.hasLoadedNamespace(n))){this.logger.warn(`did not save key "${o}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(o==null||o==="")){if((j=this.backend)!=null&&j.create){const R={...d,isUpdate:c},L=this.backend.create.bind(this.backend);if(L.length<6)try{let Q;L.length===5?Q=L(a,n,o,s,R):Q=L(a,n,o,s),Q&&typeof Q.then=="function"?Q.then($=>m(null,$)).catch(m):m(null,Q)}catch(Q){m(Q)}else L(a,n,o,s,m,R)}!a||!a[0]||this.store.addResource(a[0],n,o,s)}}}const _n=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:p=>{let a={};if(typeof p[1]=="object"&&(a=p[1]),se(p[1])&&(a.defaultValue=p[1]),se(p[2])&&(a.tDescription=p[2]),typeof p[2]=="object"||typeof p[3]=="object"){const n=p[3]||p[2];Object.keys(n).forEach(o=>{a[o]=n[o]})}return a},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),_r=p=>(se(p.ns)&&(p.ns=[p.ns]),se(p.fallbackLng)&&(p.fallbackLng=[p.fallbackLng]),se(p.fallbackNS)&&(p.fallbackNS=[p.fallbackNS]),p.supportedLngs&&!p.supportedLngs.includes("cimode")&&(p.supportedLngs=p.supportedLngs.concat(["cimode"])),p),ka=()=>{},Co=p=>{Object.getOwnPropertyNames(Object.getPrototypeOf(p)).forEach(n=>{typeof p[n]=="function"&&(p[n]=p[n].bind(p))})};class Yt extends Oa{constructor(a={},n){if(super(),this.options=_r(a),this.services={},this.logger=Ue,this.modules={external:[]},Co(this),n&&!this.isInitialized&&!a.isClone){if(!this.options.initAsync)return this.init(a,n),this;setTimeout(()=>{this.init(a,n)},0)}}init(a={},n){this.isInitializing=!0,typeof a=="function"&&(n=a,a={}),a.defaultNS==null&&a.ns&&(se(a.ns)?a.defaultNS=a.ns:a.ns.includes("translation")||(a.defaultNS=a.ns[0]));const o=_n();this.options={...o,...this.options,..._r(a)},this.options.interpolation={...o.interpolation,...this.options.interpolation},a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=o.overloadTranslationOptionHandler);const s=h=>h?typeof h=="function"?new h:h:null;if(!this.options.isClone){this.modules.logger?Ue.init(s(this.modules.logger),this.options):Ue.init(null,this.options);let h;this.modules.formatter?h=this.modules.formatter:h=xo;const v=new fr(this.options);this.store=new mr(this.options.resources,this.options);const x=this.services;x.logger=Ue,x.resourceStore=this.store,x.languageUtils=v,x.pluralResolver=new ho(v,{prepend:this.options.pluralSeparator}),h&&(x.formatter=s(h),x.formatter.init&&x.formatter.init(x,this.options),this.options.interpolation.format=x.formatter.format.bind(x.formatter)),x.interpolator=new yr(this.options),x.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},x.backendConnector=new wo(s(this.modules.backend),x.resourceStore,x,this.options),x.backendConnector.on("*",(j,...R)=>{this.emit(j,...R)}),this.modules.languageDetector&&(x.languageDetector=s(this.modules.languageDetector),x.languageDetector.init&&x.languageDetector.init(x,this.options.detection,this.options)),this.modules.i18nFormat&&(x.i18nFormat=s(this.modules.i18nFormat),x.i18nFormat.init&&x.i18nFormat.init(this)),this.translator=new Ia(this.services,this.options),this.translator.on("*",(j,...R)=>{this.emit(j,...R)}),this.modules.external.forEach(j=>{j.init&&j.init(this)})}if(this.format=this.options.interpolation.format,n||(n=ka),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const h=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);h.length>0&&h[0]!=="dev"&&(this.options.lng=h[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(h=>{this[h]=(...v)=>this.store[h](...v)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(h=>{this[h]=(...v)=>(this.store[h](...v),this)});const m=Ut(),b=()=>{const h=(v,x)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),m.resolve(x),n(v,x)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return h(null,this.t.bind(this));this.changeLanguage(this.options.lng,h)};return this.options.resources||!this.options.initAsync?b():setTimeout(b,0),m}loadResources(a,n=ka){var c,d;let o=n;const s=se(a)?a:this.language;if(typeof a=="function"&&(o=a),!this.options.resources||this.options.partialBundledLanguages){if((s==null?void 0:s.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return o();const m=[],b=h=>{if(!h||h==="cimode")return;this.services.languageUtils.toResolveHierarchy(h).forEach(x=>{x!=="cimode"&&(m.includes(x)||m.push(x))})};s?b(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(v=>b(v)),(d=(c=this.options.preload)==null?void 0:c.forEach)==null||d.call(c,h=>b(h)),this.services.backendConnector.load(m,this.options.ns,h=>{!h&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),o(h)})}else o(null)}reloadResources(a,n,o){const s=Ut();return typeof a=="function"&&(o=a,a=void 0),typeof n=="function"&&(o=n,n=void 0),a||(a=this.languages),n||(n=this.options.ns),o||(o=ka),this.services.backendConnector.reload(a,n,c=>{s.resolve(),o(c)}),s}use(a){if(!a)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!a.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return a.type==="backend"&&(this.modules.backend=a),(a.type==="logger"||a.log&&a.warn&&a.error)&&(this.modules.logger=a),a.type==="languageDetector"&&(this.modules.languageDetector=a),a.type==="i18nFormat"&&(this.modules.i18nFormat=a),a.type==="postProcessor"&&Tr.addPostProcessor(a),a.type==="formatter"&&(this.modules.formatter=a),a.type==="3rdParty"&&this.modules.external.push(a),this}setResolvedLanguage(a){if(!(!a||!this.languages)&&!["cimode","dev"].includes(a)){for(let n=0;n<this.languages.length;n++){const o=this.languages[n];if(!["cimode","dev"].includes(o)&&this.store.hasLanguageSomeTranslations(o)){this.resolvedLanguage=o;break}}!this.resolvedLanguage&&!this.languages.includes(a)&&this.store.hasLanguageSomeTranslations(a)&&(this.resolvedLanguage=a,this.languages.unshift(a))}}changeLanguage(a,n){this.isLanguageChangingTo=a;const o=Ut();this.emit("languageChanging",a);const s=m=>{this.language=m,this.languages=this.services.languageUtils.toResolveHierarchy(m),this.resolvedLanguage=void 0,this.setResolvedLanguage(m)},c=(m,b)=>{b?this.isLanguageChangingTo===a&&(s(b),this.translator.changeLanguage(b),this.isLanguageChangingTo=void 0,this.emit("languageChanged",b),this.logger.log("languageChanged",b)):this.isLanguageChangingTo=void 0,o.resolve((...h)=>this.t(...h)),n&&n(m,(...h)=>this.t(...h))},d=m=>{var v,x;!a&&!m&&this.services.languageDetector&&(m=[]);const b=se(m)?m:m&&m[0],h=this.store.hasLanguageSomeTranslations(b)?b:this.services.languageUtils.getBestMatchFromCodes(se(m)?[m]:m);h&&(this.language||s(h),this.translator.language||this.translator.changeLanguage(h),(x=(v=this.services.languageDetector)==null?void 0:v.cacheUserLanguage)==null||x.call(v,h)),this.loadResources(h,j=>{c(j,h)})};return!a&&this.services.languageDetector&&!this.services.languageDetector.async?d(this.services.languageDetector.detect()):!a&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(d):this.services.languageDetector.detect(d):d(a),o}getFixedT(a,n,o,s){const c=s==null?void 0:s.scopeNs,d=(m,b,...h)=>{let v;typeof b!="object"?v=this.options.overloadTranslationOptionHandler([m,b].concat(h)):v={...b},v.lng=v.lng||d.lng,v.lngs=v.lngs||d.lngs;const x=v.ns!==void 0&&v.ns!==null;v.ns=v.ns||d.ns,v.keyPrefix!==""&&(v.keyPrefix=v.keyPrefix||o||d.keyPrefix);const j={...this.options,...v};Array.isArray(c)&&!x&&(j.ns=c),typeof v.keyPrefix=="function"&&(v.keyPrefix=$t(v.keyPrefix,j));const R=this.options.keySeparator||".";let L;return v.keyPrefix&&Array.isArray(m)?L=m.map(Q=>(typeof Q=="function"&&(Q=$t(Q,j)),`${v.keyPrefix}${R}${Q}`)):(typeof m=="function"&&(m=$t(m,j)),L=v.keyPrefix?`${v.keyPrefix}${R}${m}`:m),this.t(L,v)};return se(a)?d.lng=a:d.lngs=a,d.ns=n,d.keyPrefix=o,d}t(...a){var n;return(n=this.translator)==null?void 0:n.translate(...a)}exists(...a){var n;return(n=this.translator)==null?void 0:n.exists(...a)}setDefaultNamespace(a){this.options.defaultNS=a}hasLoadedNamespace(a,n={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const o=n.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,c=this.languages[this.languages.length-1];if(o.toLowerCase()==="cimode")return!0;const d=(m,b)=>{const h=this.services.backendConnector.state[`${m}|${b}`];return h===-1||h===0||h===2};if(n.precheck){const m=n.precheck(this,d);if(m!==void 0)return m}return!!(this.hasResourceBundle(o,a)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||d(o,a)&&(!s||d(c,a)))}loadNamespaces(a,n){const o=Ut();return this.options.ns?(se(a)&&(a=[a]),a.forEach(s=>{this.options.ns.includes(s)||this.options.ns.push(s)}),this.loadResources(s=>{o.resolve(),n&&n(s)}),o):(n&&n(),Promise.resolve())}loadLanguages(a,n){const o=Ut();se(a)&&(a=[a]);const s=this.options.preload||[],c=a.filter(d=>!s.includes(d)&&this.services.languageUtils.isSupportedCode(d));return c.length?(this.options.preload=s.concat(c),this.loadResources(d=>{o.resolve(),n&&n(d)}),o):(n&&n(),Promise.resolve())}dir(a){var s,c;if(a||(a=this.resolvedLanguage||(((s=this.languages)==null?void 0:s.length)>0?this.languages[0]:this.language)),!a)return"rtl";try{const d=new Intl.Locale(a);if(d&&d.getTextInfo){const m=d.getTextInfo();if(m&&m.direction)return m.direction}}catch{}const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],o=((c=this.services)==null?void 0:c.languageUtils)||new fr(_n());return a.toLowerCase().indexOf("-latn")>1?"ltr":n.includes(o.getLanguagePartFromCode(a))||a.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(a={},n){const o=new Yt(a,n);return o.createInstance=Yt.createInstance,o}cloneInstance(a={},n=ka){const o=a.forkResourceStore;o&&delete a.forkResourceStore;const s={...this.options,...a,isClone:!0},c=new Yt(s);if((a.debug!==void 0||a.prefix!==void 0)&&(c.logger=c.logger.clone(a)),["store","services","language"].forEach(m=>{c[m]=this[m]}),c.services={...this.services},c.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},o){const m=Object.keys(this.store.data).reduce((b,h)=>(b[h]={...this.store.data[h]},b[h]=Object.keys(b[h]).reduce((v,x)=>(v[x]={...b[h][x]},v),b[h]),b),{});c.store=new mr(m,s),c.services.resourceStore=c.store}if(a.interpolation){const b={..._n().interpolation,...this.options.interpolation,...a.interpolation},h={...s,interpolation:b};c.services.interpolator=new yr(h)}return c.translator=new Ia(c.services,s),c.translator.on("*",(m,...b)=>{c.emit(m,...b)}),c.init(s,n),c.translator.options=s,c.translator.backendConnector.services.utils={hasLoadedNamespace:c.hasLoadedNamespace.bind(c)},c}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Ee=Yt.createInstance();Ee.createInstance;Ee.dir;Ee.init;Ee.loadResources;Ee.reloadResources;Ee.use;Ee.changeLanguage;Ee.getFixedT;Ee.t;Ee.exists;Ee.setDefaultNamespace;Ee.hasLoadedNamespace;Ee.loadNamespaces;Ee.loadLanguages;const Po={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, no copiando",criticalThinking:"Pensamiento crítico activo • Sin trampas de IA"},So={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar & Drive sincronizados"},Ao={agenda:"Agenda",study:"Estudio / Repaso",tasks:"Trabajos",tutorBadge:"Tutor IA"},Eo={nextMilestone:"Próximo Hito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoy",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodología activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados en tu cuenta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudio",autonomousOrg:"Organización autónoma",subtitle:"Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.",addBlock:"Añadir Bloque de Estudio",emptyTitle:"No hay bloques de estudio programados.",emptyDesc:'Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.',pendingSync:"Pendiente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Añadir Bloque de Estudio",modalSubtitle:"Planifica un hito para organizar tu tiempo de aprendizaje.",fieldActivity:"Título de la actividad",fieldSubject:"Asignatura",fieldType:"Tipo de Hito",fieldDate:"Fecha",fieldTime:"Hora Inicio",fieldNotes:"Notas u objetivo personal",cancel:"Cancelar",save:"Guardar Bloque",types:{study_session:"Sesión de estudio (45 min)",exam:"Examen lectivo",assignment_due:"Entrega de trabajo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Agenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador de Agenda",modalPlannerSubtitle:"Estructura Propia de 4 Pilares: Distribución Homogénea, Prioridad y Fechas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},ko={bannerTitle:"Marco de Aprendizaje Socrático Activo",bannerDesc:"La IA guía tu pensamiento con preguntas reflexivas. Prohibido obtener soluciones automáticas para garantizar tu crecimiento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveles: Funcional • Regulador LOMLOE • Línea Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveles)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividad / Variación:",stepPrefix:"Paso",baselineConcepts:"Línea Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Generador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inyección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarjeta de Autoevaluación",flashcardSubtitle:"Explica con tus palabras antes de ver la explicación:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar luego",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Hazme una pregunta diagnóstica",chip2:"💡 Dame una pista reflexiva",chip3:"🎯 ¿Voy por buen camino?",inputPlaceholder:"Escribe tu razonamiento o duda... (Enter para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: la IA fomenta tu propio esfuerzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Tú",taskListTitle:"Tareas de Estudio y Repaso Activo",taskListSubtitle:"Selecciona una tarea para iniciar la sesión guiada con el tutor socrático. Solo puede haber una tarea activa a la vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interacciones",pedagogicalAnchor:"Fundamentación Pedagógica LOMLOE",pauseNotice:"En pausa (progreso guardado)",activeBadge:"Sesión activa",activeTaskNote:"Al iniciar otra tarea, la anterior se pausará automáticamente.",noTasks:"No hay tareas de estudio disponibles para este curso."},To={title:"Trabajos y Proyectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.",btnPromptProject:"Prompt Trabajos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Trabajos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",btnViewTaskPrompt:"Ver Prompt del Trabajo",tooltipViewTaskPrompt:"Ver el Grafo de Prompts (4 Niveles) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operaciones Concretas",grade2batxBadge:"🟣 2º de Bachillerato • Operaciones Formales (PAU)",pedagogicalFoundation:"Fundamento Pedagógico (Piaget & Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Trabajos y Proyectos",modalProjectSubtitle:"Grafo de 4 Niveles: Metodología de 4 Fases y Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inyección Contextualizada de 4 Niveles para {{subject}}",newTask:"Nuevo Trabajo",emptyTitle:"No tienes trabajos activos registrados.",emptyDesc:'Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.',dueDate:"Fecha Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Archivo",noDriveFiles:"No hay archivos vinculados de Drive todavía.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía del Estudiante",ownEffort:"propio",modalTitle:"Nuevo Trabajo o Entregable",modalSubtitle:"Crea una ficha para organizar tu investigación y documentos.",fieldTitle:"Título del Proyecto / Trabajo",fieldSubject:"Asignatura",fieldDue:"Fecha de Entrega",fieldNotes:"Descripción u objetivo",cancel:"Cancelar",create:"Crear Trabajo"},Do={titleAssembled:"Ensamblado del Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestación Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Cerrar",sourceLabel:"Origen:",footerGraph:"Grafo de prompts por capas: evita alucinaciones y garantiza rigor curricular",footerAudit:"Metodología pedagógica y auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador & Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividad & Variación"}},$o={title:"Configuración del Modelo de IA",subtitle:"Inferencia local o en la nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidad Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL del Endpoint API",endpointHint:"Compatible con /v1/chat/completions y /v1/models",modelName:"Nombre del Modelo",apiKey:"API Key (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicamente en tu navegador (IndexedDB local).",socraticMode:"Modo Pedagógico Socrático",strictHigh:"Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)",strictBalanced:"Equilibrado: Pistas intermedias y ejemplos análogos",strictExploratory:"Exploratorio: Explicaciones conceptuales y desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Guardar Cambios"},Io={title:"Cuenta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Cuenta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudio",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Cerrar Sesión / Desconectar",modeSelectorTitle:"Elige el método de acceso",demoOptionTitle:"Modo Demo (Recomendado para evaluación)",demoOptionDesc:"Explora toda la plataforma con datos precargados de muestra sin necesidad de credenciales.",demoButton:"Usar Modo Demo",realOptionTitle:"Conectar Cuenta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza tus eventos en tu Google Calendar real y vincula tus archivos de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ej. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Consíguelo en Google Cloud Console > APIs y Servicios > Credenciales > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar tu cuenta educativa o personal de Google permite:",benefit1:"Exportar tus sesiones de estudio a Google Calendar.",benefit2:"Adjuntar tus apuntes y borradores desde Google Drive.",benefit3:"Garantizar que tus datos permanezcan privados y bajo tu control."},jo={updateTitle:"¡Nueva versión disponible!",updateDesc:"Actualiza para recibir las últimas mejoras.",updateButton:"Actualizar"},Lo={app:Po,nav:So,tabs:Ao,agenda:Eo,study:ko,tasks:To,promptModal:Do,aiModal:$o,authModal:Io,pwa:jo},Oo={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense trampes d'IA"},Mo={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},Ro={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},Bo={nextMilestone:"Proper Hite Lectiu",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min avui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribueix l'esforç en blocs curts per garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem a "Afegir Bloc d'Estudi" per començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Desar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},qo={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtenir solucions automàtiques per garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teves paraules abans de veure l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig pel bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a aquest curs."},No={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per elaborar treballs rigorosos garantint la teva autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem a "Nou Treball" per començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents a Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per organitzar la teva recerca i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},zo={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},Fo={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privadesa Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Desada de forma segura únicament al teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Desar Canvis"},Ko={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconsegueix-lo a Google Cloud Console > APIs i Serveis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teves sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teves dades romanguin privades i sota el teu control."},Go={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per rebre les darreres millores.",updateButton:"Actualitzar"},Vo={app:Oo,nav:Mo,tabs:Ro,agenda:Bo,study:qo,tasks:No,promptModal:zo,aiModal:Fo,authModal:Ko,pwa:Go},Ho={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, non copiando",criticalThinking:"Pensamento crítico activo • Sen trampas de IA"},Uo={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar e Drive sincronizados"},Wo={agenda:"Axenda",study:"Estudo / Repaso",tasks:"Traballos",tutorBadge:"Tutor IA"},Qo={nextMilestone:"Próximo Fito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoxe",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodoloxía activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados na túa conta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudo",autonomousOrg:"Organización autónoma",subtitle:"Distribúe o esforzo en bloques curtos para garantir a asimilación a longo prazo.",addBlock:"Engadir Bloque de Estudo",emptyTitle:"Non hai bloques de estudo programados.",emptyDesc:'Preme en "Engadir Bloque de Estudo" para comezar a organizar o teu tempo.',pendingSync:"Pendente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Engadir Bloque de Estudo",modalSubtitle:"Planifica un fito para organizar o teu tempo de aprendizaxe.",fieldActivity:"Título da actividade",fieldSubject:"Materia",fieldType:"Tipo de Fito",fieldDate:"Data",fieldTime:"Hora de Inicio",fieldNotes:"Notas ou obxectivo persoal",cancel:"Cancelar",save:"Gardar Bloque",types:{study_session:"Sesión de estudo (45 min)",exam:"Exame lectivo",assignment_due:"Entrega de traballo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Axenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",modalPlannerTitle:"Estrutura de Prompt: Planificador de Axenda",modalPlannerSubtitle:"Estrutura Propia de 4 Pilares: Distribución Homoxénea, Prioridade e Datas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},Jo={bannerTitle:"Marco de Aprendizaxe Socrática Activa",bannerDesc:"A IA guía o teu pensamento con preguntas reflexivas. Prohibido obter solucións automáticas para garantir o teu crecemento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveis: Funcional • Regulador LOMLOE • Liña Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveis)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividade / Variación:",stepPrefix:"Paso",baselineConcepts:"Liña Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Xerador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inxección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarxeta de Autoavaliación",flashcardSubtitle:"Explica coas túas palabras antes de ver a explicación:",toggleHint:"👁️ Amosar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar despois",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Faime unha pregunta diagnóstica",chip2:"💡 Dáme unha pista reflexiva",chip3:"🎯 Vou polo bo camiño?",inputPlaceholder:"Escribe o teu razoamento ou dúbida... (Intro para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: a IA fomenta o teu propio esforzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Ti",taskListTitle:"Tarefas de Estudo e Repaso Activo",taskListSubtitle:"Selecciona unha tarefa para iniciar a sesión guiada co titor socrático. Só pode haber unha tarefa activa á vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interaccións",pedagogicalAnchor:"Fundamentación Pedagóxica LOMLOE",pauseNotice:"En pausa (sesión gardada)",activeBadge:"Sesión activa",activeTaskNote:"Ao iniciar outra tarefa, a anterior pausarase automaticamente.",noTasks:"Non hai tarefas de estudo dispoñibles para este curso."},Yo={title:"Traballos e Proxectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar traballos rigorosos garantindo a túa autoría e ideas propias.",btnPromptProject:"Prompt Traballos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Traballos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",btnViewTaskPrompt:"Ver Prompt do Traballo",tooltipViewTaskPrompt:"Ver o Grafo de Prompts (4 Niveis) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operacións Concretas",grade2batxBadge:"🟣 2º de Bacharelato • Operacións Formais (PAU)",pedagogicalFoundation:"Fundamento Pedagóxico (Piaget e Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Traballos e Proxectos",modalProjectSubtitle:"Grafo de 4 Niveis: Metodoloxía de 4 Fases e Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inxección Contextualizada de 4 Niveis para {{subject}}",newTask:"Novo Traballo",emptyTitle:"Non tes traballos activos rexistrados.",emptyDesc:'Preme en "Novo Traballo" para comezar a estruturar un entregable.',dueDate:"Data Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Ficheiro",noDriveFiles:"Aínda non hai ficheiros vinculados de Drive.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía do Estudante",ownEffort:"propio",modalTitle:"Novo Traballo ou Entregable",modalSubtitle:"Crea unha ficha para organizar a túa investigación e documentos.",fieldTitle:"Título do Proxecto / Traballo",fieldSubject:"Materia",fieldDue:"Data de Entrega",fieldNotes:"Descrición ou obxectivo",cancel:"Cancelar",create:"Crear Traballo"},Zo={titleAssembled:"Ensamblado do Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestración Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Pechar",sourceLabel:"Orixe:",footerGraph:"Grafo de prompts por capas: evita alucinacións e garante rigor curricular",footerAudit:"Metodoloxía pedagóxica e auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador e Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividade e Variación"}},Xo={title:"Configuración do Modelo de IA",subtitle:"Inferencia local ou na nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidade Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL do Endpoint API",endpointHint:"Compatible con /v1/chat/completions e /v1/models",modelName:"Nome do Modelo",apiKey:"Chave de API (Opcional en Local)",apiKeyHint:"Gardada de forma segura unicamente no teu navegador (IndexedDB local).",socraticMode:"Modo Pedagóxico Socrático",strictHigh:"Estrito: Nunca dá solucións directas (100% preguntas de razoamento)",strictBalanced:"Equilibrado: Pistas intermedias e exemplos análogos",strictExploratory:"Exploratorio: Explicacións conceptuais e desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Gardar Cambios"},es={title:"Conta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Conta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudo",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Pechar Sesión / Desconectar",modeSelectorTitle:"Escolle o método de acceso",demoOptionTitle:"Modo Demo (Recomendado para avaliación)",demoOptionDesc:"Explora toda a plataforma con datos precargados de mostra sen necesidade de credenciais.",demoButton:"Empregar Modo Demo",realOptionTitle:"Conectar Conta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza os teus eventos no teu Google Calendar real e vincula os teus ficheiros de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Conségueo en Google Cloud Console > APIs e Servizos > Credenciais > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar a túa conta educativa ou persoal de Google permite:",benefit1:"Exportar as túas sesións de estudo a Google Calendar.",benefit2:"Xuntar os teus apuntamentos e borradores desde Google Drive.",benefit3:"Garantir que os teus datos permanezan privados e baixo o teu control."},ts={updateTitle:"Nova versión dispoñible!",updateDesc:"Actualiza para recibir as últimas melloras.",updateButton:"Actualizar"},as={app:Ho,nav:Uo,tabs:Wo,agenda:Qo,study:Jo,tasks:Yo,promptModal:Zo,aiModal:Xo,authModal:es,pwa:ts},ns={title:"Anaxagoras AI",badge:"STI Kognitiboa",tagline:"Pentsatuz ikasi, ez kopiatuz",criticalThinking:"Pentsamendu kritiko aktiboa • IA trikimailurik gabe"},rs={local:"Lokala",cloud:"Cloud",connectGoogle:"Google Konektatu",calendarDriveSync:"Google Calendar eta Drive sinkronizatuta"},is={agenda:"Agenda",study:"Ikasketa / Berrikuspena",tasks:"Lanak",tutorBadge:"IA Tutorea"},os={nextMilestone:"Hurrengo Mugarri Didaktikoa",inDays:"3 egun barru",recommendedToday:"⚡ Gomendatutako saioa: 45 min gaur",weeklyProgress:"Asteko Aurrerapena",blocksCompleted:"bloke osatuta",activeMethod:"Metodologia aktiboa",googleCalendar:"Google Calendar",syncedEvents:"Sinkronizatutako gertaerak zure kontuan",syncAll:"🔄 Dena sinkronizatu Calendar-ekin",syncing:"⏳ Sinkronizatzen...",title:"Asteko Ikasketa Plangintza",autonomousOrg:"Antolakuntza autonomoa",subtitle:"Banakatu ahalegina bloke laburretan epe luzerako barneratzea bermatzeko.",addBlock:"Ikasketa Blokea Gehitu",emptyTitle:"Ez dago programatutako ikasketa blokerik.",emptyDesc:'Sakatu "Ikasketa Blokea Gehitu" zure denbora antolatzen hasteko.',pendingSync:"Sync zain",synced:"Google Calendar",minRecommended:"minutu gomendatuta",modalTitle:"Ikasketa Blokea Gehitu",modalSubtitle:"Planifikatu mugarri bat ikasteko denbora antolatzeko.",fieldActivity:"Jardueraren izenburua",fieldSubject:"Ikasgaia",fieldType:"Mugarri Mota",fieldDate:"Data",fieldTime:"Hasiera Ordua",fieldNotes:"Oharrak edo helburu pertsonala",cancel:"Utzi",save:"Blokea Gorde",types:{study_session:"Ikasketa saioa (45 min)",exam:"Azterketa",assignment_due:"Lanaren entrega"},btnPromptPlanner:"Agenda Antolatzaile Prompt-a",tooltipPromptPlanner:"Ikusi Ataleko Prompt-a: Agendaren Antolatzailea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",modalPlannerTitle:"Prompt Egitura: Agenda Antolatzailea",modalPlannerSubtitle:"4 Zutabeko Egitura Propioa: Banaketa Homogeneoa, Lehentasuna eta Konpromiso Datak",modalCurricularSubtitle:"Departamentuko Curriculum Gidalerroa ({{grade}})"},ss={bannerTitle:"Ikaskuntza Sokratiko Aktiboaren Esparrua",bannerDesc:"IAk zure pentsamendua gidatzen du galdera gogoetatsuekin. Zure hazkunde intelektuala bermatzeko debekatuta dago soluzio automatikoak lortzea.",bannerBadge:"Tutore Kognitibo Aktiboa",bannerGraphDesc:"4 mailako grafo dinamikoa: Funtzionala • LOMLOE Arautzailea • Gai-oinarria • Aldakuntzako Jarduerak",btnPromptGraph:"Prompts Grafoa (4 Maila)",tooltipPromptGraph:"Ikusi Muntatutako Prompt Grafoa (4 Geruza)",activityVariationLabel:"Jarduera / Aldakuntza:",stepPrefix:"Urratsa",baselineConcepts:"Oinarrizko Lerroa: Menperatu Beharreko Kontzeptuak",btnRecallPrompt:"Recall Prompt-a",tooltipRecallPrompt:"Ikusi Ataleko Prompt-a: Active Recall Sortzailea",modalSocraticTitle:"Prompt Grafo Dinamikoa",modalSocraticSubtitle:"Testuinguruan kokatutako injekzioa: {{subject}} • {{topic}}",activeRecall:"Berreskuratze Aktiboa",flashcardTitle:"Autoebaluazio Txartela",flashcardSubtitle:"Azaldu zure hitzekin azalpena ikusi aurretik:",toggleHint:"👁️ Erakutsi / Ezkutatu Aztarna Azalgarria",reviewLater:"🔁 Berrikusi geroago",mastered:"✅ Menperatua",conceptsTitle:"Menperatu beharreko Kontzeptuak",consolidated:"Finkatua",toStrengthen:"Sendotzeko",chip1:"❓ Egin iezadazu galdera diagnostiko bat",chip2:"💡 Eman iezadazu aztarna gogoetatsu bat",chip3:"🎯 Bide onetik nabil?",inputPlaceholder:"Idatzi zure arrazoibidea edo zalantza... (Enter bidaltzeko)",send:"Bidali",safeMode:"🔒 Modu segurua: IAk zure ahalegina sustatzen du",openaiCompatible:"OpenAI inferentzia bateragarria",tutorRole:"Tutore Sokratikoa",userRole:"Zu",taskListTitle:"Ikasketa eta Errepaso Aktiboko Zereginak",taskListSubtitle:"Aukeratu zeregin bat tutore sokratikoarekin saio gidatua hasteko. Zeregin bakarra egon daiteke aktibo aldi berean.",btnStart:"Hasi",btnResume:"Jarraitu",btnPause:"Gelditu",statusPending:"Hasteke",statusActive:"Martxan",statusPaused:"Pausan",badgeActivities:"{{count}} jarduera",badgeConcepts:"{{count}} kontzeptu gako",interactionsCount:"{{count}} elkarrekintza",pedagogicalAnchor:"LOMLOE Oinarri Pedagogikoa",pauseNotice:"Pausan (saioa gordeta)",activeBadge:"Saio aktiboa",activeTaskNote:"Beste zeregin bat hastean, aurrekoa automatikoki pausatuko da.",noTasks:"Ez dago ikasketa zereginik ikasturte honetarako."},ls={title:"Eskolako Lanak eta Proiektuak",driveIntegration:"Google Drive Integrazioa",subtitle:"Faseren araberako laguntzailea lan zorrotzak egiteko, zure egiletza eta ideia propioak bermatuz.",btnPromptProject:"Lanak Prompt-a",tooltipPromptProject:"Ikusi Ataleko Prompt-a: Lanen Tutorea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",btnViewTaskPrompt:"Ikusi Lanaren Prompt-a",tooltipViewTaskPrompt:"Ikusi {{title}}-rako 4 Mailako Prompt Grafo zehatza",grade1esoBadge:"🟢 DBH 1 • Eragiketa Zehatzak",grade2batxBadge:"🟣 Batxilergo 2 • Eragiketa Formalak (PAU)",pedagogicalFoundation:"Oinarri Pedagogikoa (Piaget eta Guardrails):",modalProjectTitle:"Grafo Dinamikoa: Lanen eta Proiektuen Tutorea",modalProjectSubtitle:"4 Mailako Grafoa: 4 Faseko Metodologia eta Egiletzaren Auditoria",modalTaskPromptTitle:"Prompt Grafoa: {{title}}",modalTaskPromptSubtitle:"{{subject}}-rako 4 Mailako Testuinguratutako Injekzioa",newTask:"Lan Berria",emptyTitle:"Ez duzu lan aktiborik erregistratuta.",emptyDesc:'Sakatu "Lan Berria" entregagarri bat egituratzen hasteko.',dueDate:"Entregatzeko Data",autonomy:"Autonomia",phasesTitle:"Egite Faseak",phases:{planning:"1. Plangintza",research:"2. Ikerketa",writing:"3. Idazketa Propioa",review:"4. Azken Berrikuspena"},driveDocs:"Dokumentuak Google Driven",attachDrive:"＋ Fitxategia Lotu",noDriveFiles:"Oraindik ez dago Driveren fitxategirik lotuta.",driveSync:"Drive Sync",autonomyMeter:"Ikaslearen Autonomia Neurgailua",ownEffort:"propioa",modalTitle:"Lan Berria edo Entregagarria",modalSubtitle:"Sortu fitxa bat zure ikerketa eta dokumentuak antolatzeko.",fieldTitle:"Proiektuaren / Lanaren Izenburua",fieldSubject:"Ikasgaia",fieldDue:"Entregatzeko Data",fieldNotes:"Deskribapena edo helburua",cancel:"Utzi",create:"Lana Sortu"},cs={titleAssembled:"Prompt Muntaia ({{subject}})",subtitleAssembled:"Orkestrazio Dinamikoaren Grafoa • {{topic}}",badge4Layers:"4 Geruzako Grafo Dinamikoa",badgePrompt:"Prompt",badgeLayer:"Geruza",defaultSubtitle:"System Instruction",close:"Itxi",sourceLabel:"Jatorria:",footerGraph:"Geruzetako prompt-en grafoa: haluzinazioak saihesten ditu eta curriculum-zorroztasuna bermatzen du",footerAudit:"Metodologia pedagogikoa eta ikuskaritza gardena",tabs:{all:"Muntaia Osoa",level1:"N1: Funtzionala",level3:"N3: Arautzailea eta Etika",level2A:"N2.A: Gai-oinarria",level2B:"N2.B: Jarduera eta Aldakuntza"}},ds={title:"IA Ereduaren Konfigurazioa",subtitle:"Inferentzia lokala edo hodeian OpenAI API estandarrarekin",inferenceType:"Inferentzia Mota",localTitle:"Lokala (Pribatutasun Osoa)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"API Endpoint URL",endpointHint:"Bateragarria /v1/chat/completions eta /v1/models-ekin",modelName:"Ereduaren Izena",apiKey:"API Gakoa (Aukerakoa Lokalean)",apiKeyHint:"Segurtasunez gordeta zure arakatzailean bakarrik (IndexedDB lokala).",socraticMode:"Modu Pedagogiko Sokratikoa",strictHigh:"Zorrotza: Ez du inoiz soluzio zuzenik ematen (100% arrazoitzeko galderak)",strictBalanced:"Orekatua: Tarteko aztarnak eta adibide antzekoak",strictExploratory:"Esploratzailea: Kontzeptu azalpenak eta erronkak",testConnection:"Konexioa Probatu",testing:"Probatzen...",cancel:"Utzi",save:"Aldaketak Gorde"},us={title:"Google Kontua",subtitle:"OAuth 2.0 Konektoreak • Calendar & Drive",demoBadge:"Demo Modu Aktiboa",realBadge:"Benetako Google Kontua",authorizedResources:"Baimendutako baliabideak",calendarTitle:"Google Calendar",calendarDesc:"Ikasketa blokeen sinkronizazioa",driveTitle:"Google Drive",driveDesc:"Entregagaien dokumentuak lotzea",statusActive:"Aktiboa",statusReal:"Benetako Sinkronizazioa",statusDemo:"Simulazio Lokala",disconnect:"Saioa Itxi / Deskonektatu",modeSelectorTitle:"Aukeratu sarbide metodoa",demoOptionTitle:"Demo Modua (Ebaluaziorako gomendatua)",demoOptionDesc:"Arakatu plataforma osoa aurrez kargatutako datuekin kredentzialik sortu beharrik gabe.",demoButton:"Demo Modua Erabili",realOptionTitle:"Konektatu Benetako Google Kontua (OAuth 2.0)",realOptionDesc:"Sinkronizatu zure gertaerak Google Calendarrean eta lotu zure Google Driveko fitxategiak.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"adib. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Lortu Google Cloud Console > APIs eta Zerbitzuak > Kredentzialak > OAuth bezeroaren IDa.",realButton:"Hasi Saioa Google OAuth-ekin",connectExplanation:"Zure hezkuntza edo Google kontu pertsonala konektatzeak aukera ematen du:",benefit1:"Esportatu zure ikasketa saioak Google Calendarrera.",benefit2:"Erantsi zure oharrak eta zirriborroak Google Drivetik.",benefit3:"Bermatu zure datuak pribatuak eta zure kontrolpean geratzen direla."},ps={updateTitle:"Bertsio berria eskuragarri!",updateDesc:"Eguneratu azken hobekuntzak jasotzeko.",updateButton:"Eguneratu"},ms={app:ns,nav:rs,tabs:is,agenda:os,study:ss,tasks:ls,promptModal:cs,aiModal:ds,authModal:us,pwa:ps},fs={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense paranys d'IA"},gs={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},bs={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},hs={nextMilestone:"Pròxima Fita Lectiva",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min hui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribuïx l'esforç en blocs curts per a garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem en "Afegir Bloc d'Estudi" per a començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per a organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Guardar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},vs={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtindre solucions automàtiques per a garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teues paraules abans de vore l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig per bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per a enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per a iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a este curs."},ys={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per a elaborar treballs rigorosos garantint la teua autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem en "Nou Treball" per a començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents en Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per a organitzar la teua investigació i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},xs={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},_s={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privacitat Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicament en el teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Guardar Canvis"},ws={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconseguix-lo en Google Cloud Console > APIs i Servicis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teues sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teues dades romanguen privades i sota el teu control."},Cs={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per a rebre les últimes millores.",updateButton:"Actualitzar"},Ps={app:fs,nav:gs,tabs:bs,agenda:hs,study:vs,tasks:ys,promptModal:xs,aiModal:_s,authModal:ws,pwa:Cs},wr="anaxagoras_lang";class Ss{constructor(){we(this,"initialized",!1);we(this,"listeners",[])}async init(){if(this.initialized)return;const a=localStorage.getItem(wr)||"es";await Ee.init({lng:a,fallbackLng:"es",debug:!1,resources:{es:{translation:Lo},ca:{translation:Vo},ga:{translation:as},eu:{translation:ms},va:{translation:Ps}},interpolation:{escapeValue:!1}}),this.initialized=!0}t(a,n){return Ee.t(a,n)}async changeLanguage(a){await Ee.changeLanguage(a),localStorage.setItem(wr,a);for(const n of this.listeners)n(a)}getCurrentLanguage(){return Ee.language||"es"}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(n=>n!==a)}}}const Xt=new Ss,C=(p,a)=>Xt.t(p,a);class As{constructor(){we(this,"registration",null);we(this,"updateWaiting",!1)}hasUpdateWaiting(){return this.updateWaiting}async register(a){if(!("serviceWorker"in navigator)){console.log("[PWA] Service Worker no soportado en este navegador.");return}try{const o=await navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"});this.registration=o,o.waiting&&(this.updateWaiting=!0,this.notifyUpdate(a)),o.addEventListener("updatefound",()=>{const c=o.installing;c&&c.addEventListener("statechange",()=>{c.state==="installed"&&navigator.serviceWorker.controller&&(this.updateWaiting=!0,this.notifyUpdate(a))})});let s=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{s||(s=!0,window.location.reload())}),o.update().catch(()=>{}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&o.update().catch(()=>{})}),window.addEventListener("focus",()=>{o.update().catch(()=>{})}),window.addEventListener("online",()=>{o.update().catch(()=>{})}),setInterval(()=>{o.update().catch(()=>{})},1e3*60*5)}catch(n){console.warn("[PWA] Error registrando Service Worker:",n)}}notifyUpdate(a){a!=null&&a.onUpdateAvailable?a.onUpdateAvailable(()=>this.applyUpdate()):this.showDefaultUpdateToast()}applyUpdate(){this.registration&&this.registration.waiting?this.registration.waiting.postMessage({type:"SKIP_WAITING"}):window.location.reload()}async checkForUpdates(a=!1){if(!this.registration){a&&alert("El servicio de actualización no está activo en este navegador.");return}let n=null;a&&(n=document.createElement("div"),n.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse",n.innerHTML="<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>",document.body.appendChild(n));try{await this.registration.update();const o=await fetch(`./version.json?t=${Date.now()}`,{cache:"no-store"});if(o.ok){const s=await o.json();console.log("[PWA] Versión desplegada en servidor:",s)}if(a)if(await new Promise(s=>setTimeout(s,900)),n==null||n.remove(),this.updateWaiting)this.showDefaultUpdateToast();else{const s=document.createElement("div");s.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2",s.innerHTML="<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>",document.body.appendChild(s),setTimeout(()=>s.remove(),3500)}}catch{n==null||n.remove(),a&&alert("No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.")}}async forceHardReset(){try{const a=await navigator.serviceWorker.getRegistrations();for(const o of a)await o.unregister();const n=await caches.keys();for(const o of n)await caches.delete(o)}catch(a){console.warn("[PWA] Error en hard reset:",a)}window.location.reload()}showDefaultUpdateToast(){var n,o;if(document.getElementById("pwa-update-toast"))return;const a=document.createElement("div");a.id="pwa-update-toast",a.className="fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md",a.innerHTML=`
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
    `,document.body.appendChild(a),(n=a.querySelector("#btn-pwa-apply"))==null||n.addEventListener("click",()=>{this.applyUpdate()}),(o=a.querySelector("#btn-pwa-dismiss"))==null||o.addEventListener("click",()=>{a.remove()})}}const Cn=new As;var Es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ks(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var Ta={exports:{}},Ts=Ta.exports,Cr;function Ds(){return Cr||(Cr=1,(function(p,a){((n,o)=>{p.exports=o()})(Ts,function(){var n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(r,i){r.__proto__=i}:function(r,i){for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(r[l]=i[l])}))(e,t)},o=function(){return(o=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var l in t=arguments[r])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};function s(e,t,r){for(var i,l=0,u=t.length;l<u;l++)!i&&l in t||((i=i||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(i||Array.prototype.slice.call(t))}var c=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Es,d=Object.keys,m=Array.isArray;function b(e,t){return typeof t=="object"&&d(t).forEach(function(r){e[r]=t[r]}),e}typeof Promise>"u"||c.Promise||(c.Promise=Promise);var h=Object.getPrototypeOf,v={}.hasOwnProperty;function x(e,t){return v.call(e,t)}function j(e,t){typeof t=="function"&&(t=t(h(e))),(typeof Reflect>"u"?d:Reflect.ownKeys)(t).forEach(function(r){L(e,r,t[r])})}var R=Object.defineProperty;function L(e,t,r,i){R(e,t,b(r&&x(r,"get")&&typeof r.get=="function"?{get:r.get,set:r.set,configurable:!0}:{value:r,configurable:!0,writable:!0},i))}function Q(e){return{from:function(t){return e.prototype=Object.create(t.prototype),L(e.prototype,"constructor",e),{extend:j.bind(null,e.prototype)}}}}var $=Object.getOwnPropertyDescriptor,B=[].slice;function K(e,t,r){return B.call(e,t,r)}function re(e,t){return t(e)}function q(e){if(!e)throw new Error("Assertion Failed")}function Z(e){c.setImmediate?setImmediate(e):setTimeout(e,0)}function J(e,t){if(typeof t=="string"&&x(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var r=[],i=0,l=t.length;i<l;++i){var u=J(e,t[i]);r.push(u)}return r}var f,g=t.indexOf(".");return g===-1||(f=e[t.substr(0,g)])==null?void 0:J(f,t.substr(g+1))}function oe(e,t,r){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){q(typeof r!="string"&&"length"in r);for(var i=0,l=t.length;i<l;++i)oe(e,t[i],r[i])}else{var u=t.indexOf(".");if(u!==-1){var f=t.substr(0,u),u=t.substr(u+1);if(u==="")r===void 0?m(e)&&!isNaN(parseInt(f))?e.splice(f,1):delete e[f]:e[f]=r;else{var g=e[f];if(!g||!x(e,f)){if(r===void 0)return;g=e[f]={}}oe(g,u,r)}}else r===void 0?m(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=r}}function ge(e){var t,r={};for(t in e)x(e,t)&&(r[t]=e[t]);return r}var G=[].concat;function M(e){return G.apply([],e)}var De="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(M([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return c[e]}),Y=new Set(De.map(function(e){return c[e]})),te=null;function ne(e){return te=new WeakMap,e=(function t(r){if(!r||typeof r!="object")return r;var i=te.get(r);if(i)return i;if(m(r)){i=[],te.set(r,i);for(var l=0,u=r.length;l<u;++l)i.push(t(r[l]))}else if(Y.has(r.constructor))i=r;else{var f,g=h(r);for(f in i=g===Object.prototype?{}:Object.create(g),te.set(r,i),r)x(r,f)&&(i[f]=t(r[f]))}return i})(e),te=null,e}var ve={}.toString;function Ie(e){return ve.call(e).slice(8,-1)}var ke=typeof Symbol<"u"?Symbol.iterator:"@@iterator",je=typeof ke=="symbol"?function(e){var t;return e!=null&&(t=e[ke])&&t.apply(e)}:function(){return null};function Be(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var Ke={};function Fe(e){var t,r,i,l;if(arguments.length===1){if(m(e))return e.slice();if(this===Ke&&typeof e=="string")return[e];if(l=je(e))for(r=[];!(i=l.next()).done;)r.push(i.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(r=new Array(t);t--;)r[t]=e[t]}}else for(t=arguments.length,r=new Array(t);t--;)r[t]=arguments[t];return r}var Te=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},De=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],qe=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(De),lt={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Qe(e,t){this.name=e,this.message=t}function It(e,t){return e+". Errors: "+Object.keys(t).map(function(r){return t[r].toString()}).filter(function(r,i,l){return l.indexOf(r)===i}).join(`
`)}function ea(e,t,r,i){this.failures=t,this.failedKeys=i,this.successCount=r,this.message=It(e,t)}function _t(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(r){return t[r]}),this.failuresByPos=t,this.message=It(e,this.failures)}Q(Qe).from(Error).extend({toString:function(){return this.name+": "+this.message}}),Q(ea).from(Qe),Q(_t).from(Qe);var Ma=qe.reduce(function(e,t){return e[t]=t+"Error",e},{}),Si=Qe,ie=qe.reduce(function(e,t){var r=t+"Error";function i(l,u){this.name=r,l?typeof l=="string"?(this.message="".concat(l).concat(u?`
 `+u:""),this.inner=u||null):typeof l=="object"&&(this.message="".concat(l.name," ").concat(l.message),this.inner=l):(this.message=lt[t]||r,this.inner=null)}return Q(i).from(Si),e[t]=i,e},{}),En=(ie.Syntax=SyntaxError,ie.Type=TypeError,ie.Range=RangeError,De.reduce(function(e,t){return e[t+"Error"]=ie[t],e},{}));De=qe.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=ie[t]),e},{});function he(){}function jt(e){return e}function Ai(e,t){return e==null||e===jt?t:function(r){return t(e(r))}}function ct(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function Ei(e,t){return e===he?t:function(){var r=e.apply(this,arguments),i=(r!==void 0&&(arguments[0]=r),this.onsuccess),l=this.onerror,u=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return i&&(this.onsuccess=this.onsuccess?ct(i,this.onsuccess):i),l&&(this.onerror=this.onerror?ct(l,this.onerror):l),u!==void 0?u:r}}function ki(e,t){return e===he?t:function(){e.apply(this,arguments);var r=this.onsuccess,i=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),r&&(this.onsuccess=this.onsuccess?ct(r,this.onsuccess):r),i&&(this.onerror=this.onerror?ct(i,this.onerror):i)}}function Ti(e,t){return e===he?t:function(){var r=e.apply(this,arguments),i=(b(arguments[0],r),this.onsuccess),l=this.onerror,u=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return i&&(this.onsuccess=this.onsuccess?ct(i,this.onsuccess):i),l&&(this.onerror=this.onerror?ct(l,this.onerror):l),r===void 0?u===void 0?void 0:u:b(r,u)}}function Di(e,t){return e===he?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function Ra(e,t){return e===he?t:function(){var r=e.apply(this,arguments);if(r&&typeof r.then=="function"){for(var i=this,l=arguments.length,u=new Array(l);l--;)u[l]=arguments[l];return r.then(function(){return t.apply(i,u)})}return t.apply(this,arguments)}}De.ModifyError=ea,De.DexieError=Qe,De.BulkError=_t;var Ve=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function kn(e){Ve=e}var Lt={},Tn=100,Ot=typeof Promise>"u"?[]:(qe=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Ot=crypto.subtle.digest("SHA-512",new Uint8Array([0])),h(Ot),qe]:[qe,h(qe),qe]),qe=Ot[0],kt=Ot[1],kt=kt&&kt.then,dt=qe&&qe.constructor,Ba=!!Ot[2],Mt=function(e,t){Rt.push([e,t]),ta&&(queueMicrotask(Ii),ta=!1)},qa=!0,ta=!0,ut=[],aa=[],Na=jt,Je={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:he,pgp:!1,env:{},finalize:he},ae=Je,Rt=[],pt=0,na=[];function W(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=ae;if(typeof e!="function"){if(e!==Lt)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&Fa(this,this._value)}else this._state=null,this._value=null,++t.ref,(function r(i,l){try{l(function(u){if(i._state===null){if(u===i)throw new TypeError("A promise cannot be resolved with itself.");var f=i._lib&&wt();u&&typeof u.then=="function"?r(i,function(g,_){u instanceof W?u._then(g,_):u.then(g,_)}):(i._state=!0,i._value=u,$n(i)),f&&Ct()}},Fa.bind(null,i))}catch(u){Fa(i,u)}})(this,e)}var za={get:function(){var e=ae,t=sa;function r(i,l){var u=this,f=!e.global&&(e!==ae||t!==sa),g=f&&!at(),_=new W(function(T,P){Ka(u,new Dn(jn(i,e,f,g),jn(l,e,f,g),T,P,e))});return this._consoleTask&&(_._consoleTask=this._consoleTask),_}return r.prototype=Lt,r},set:function(e){L(this,"then",e&&e.prototype===Lt?za:{get:function(){return e},set:za.set})}};function Dn(e,t,r,i,l){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=r,this.reject=i,this.psd=l}function Fa(e,t){var r,i;aa.push(t),e._state===null&&(r=e._lib&&wt(),t=Na(t),e._state=!1,e._value=t,i=e,ut.some(function(l){return l._value===i._value})||ut.push(i),$n(e),r)&&Ct()}function $n(e){var t=e._listeners;e._listeners=[];for(var r=0,i=t.length;r<i;++r)Ka(e,t[r]);var l=e._PSD;--l.ref||l.finalize(),pt===0&&(++pt,Mt(function(){--pt==0&&Ga()},[]))}function Ka(e,t){if(e._state===null)e._listeners.push(t);else{var r=e._state?t.onFulfilled:t.onRejected;if(r===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++pt,Mt($i,[r,e,t])}}function $i(e,t,r){try{var i,l=t._value;!t._state&&aa.length&&(aa=[]),i=Ve&&t._consoleTask?t._consoleTask.run(function(){return e(l)}):e(l),t._state||aa.indexOf(l)!==-1||(u=>{for(var f=ut.length;f;)if(ut[--f]._value===u._value)return ut.splice(f,1)})(t),r.resolve(i)}catch(u){r.reject(u)}finally{--pt==0&&Ga(),--r.psd.ref||r.psd.finalize()}}function Ii(){mt(Je,function(){wt()&&Ct()})}function wt(){var e=qa;return ta=qa=!1,e}function Ct(){var e,t,r;do for(;0<Rt.length;)for(e=Rt,Rt=[],r=e.length,t=0;t<r;++t){var i=e[t];i[0].apply(null,i[1])}while(0<Rt.length);ta=qa=!0}function Ga(){for(var e=ut,t=(ut=[],e.forEach(function(i){i._PSD.onunhandled.call(null,i._value,i)}),na.slice(0)),r=t.length;r;)t[--r]()}function ra(e){return new W(Lt,!1,e)}function _e(e,t){var r=ae;return function(){var i=wt(),l=ae;try{return nt(r,!0),e.apply(this,arguments)}catch(u){t&&t(u)}finally{nt(l,!1),i&&Ct()}}}j(W.prototype,{then:za,_then:function(e,t){Ka(this,new Dn(null,null,e,t,ae))},catch:function(e){var t,r;return arguments.length===1?this.then(null,e):(t=e,r=arguments[1],typeof t=="function"?this.then(null,function(i){return(i instanceof t?r:ra)(i)}):this.then(null,function(i){return(i&&i.name===t?r:ra)(i)}))},finally:function(e){return this.then(function(t){return W.resolve(e()).then(function(){return t})},function(t){return W.resolve(e()).then(function(){return ra(t)})})},timeout:function(e,t){var r=this;return e<1/0?new W(function(i,l){var u=setTimeout(function(){return l(new ie.Timeout(t))},e);r.then(i,l).finally(clearTimeout.bind(null,u))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&L(W.prototype,Symbol.toStringTag,"Dexie.Promise"),Je.env=In(),j(W,{all:function(){var e=Fe.apply(null,arguments).map(la);return new W(function(t,r){e.length===0&&t([]);var i=e.length;e.forEach(function(l,u){return W.resolve(l).then(function(f){e[u]=f,--i||t(e)},r)})})},resolve:function(e){return e instanceof W?e:e&&typeof e.then=="function"?new W(function(t,r){e.then(t,r)}):new W(Lt,!0,e)},reject:ra,race:function(){var e=Fe.apply(null,arguments).map(la);return new W(function(t,r){e.map(function(i){return W.resolve(i).then(t,r)})})},PSD:{get:function(){return ae},set:function(e){return ae=e}},totalEchoes:{get:function(){return sa}},newPSD:tt,usePSD:mt,scheduler:{get:function(){return Mt},set:function(e){Mt=e}},rejectionMapper:{get:function(){return Na},set:function(e){Na=e}},follow:function(e,t){return new W(function(r,i){return tt(function(l,u){var f=ae;f.unhandleds=[],f.onunhandled=u,f.finalize=ct(function(){var g,_=this;g=function(){_.unhandleds.length===0?l():u(_.unhandleds[0])},na.push(function T(){g(),na.splice(na.indexOf(T),1)}),++pt,Mt(function(){--pt==0&&Ga()},[])},f.finalize),e()},t,r,i)})}}),dt&&(dt.allSettled&&L(W,"allSettled",function(){var e=Fe.apply(null,arguments).map(la);return new W(function(t){e.length===0&&t([]);var r=e.length,i=new Array(r);e.forEach(function(l,u){return W.resolve(l).then(function(f){return i[u]={status:"fulfilled",value:f}},function(f){return i[u]={status:"rejected",reason:f}}).then(function(){return--r||t(i)})})})}),dt.any&&typeof AggregateError<"u"&&L(W,"any",function(){var e=Fe.apply(null,arguments).map(la);return new W(function(t,r){e.length===0&&r(new AggregateError([]));var i=e.length,l=new Array(i);e.forEach(function(u,f){return W.resolve(u).then(function(g){return t(g)},function(g){l[f]=g,--i||r(new AggregateError(l))})})})}),dt.withResolvers)&&(W.withResolvers=dt.withResolvers);var Se={awaits:0,echoes:0,id:0},ji=0,ia=[],oa=0,sa=0,Li=0;function tt(e,f,r,i){var l=ae,u=Object.create(l),f=(u.parent=l,u.ref=0,u.global=!1,u.id=++Li,Je.env,u.env=Ba?{Promise:W,PromiseProp:{value:W,configurable:!0,writable:!0},all:W.all,race:W.race,allSettled:W.allSettled,any:W.any,resolve:W.resolve,reject:W.reject}:{},f&&b(u,f),++l.ref,u.finalize=function(){--this.parent.ref||this.parent.finalize()},mt(u,e,r,i));return u.ref===0&&u.finalize(),f}function Pt(){return Se.id||(Se.id=++ji),++Se.awaits,Se.echoes+=Tn,Se.id}function at(){return!!Se.awaits&&(--Se.awaits==0&&(Se.id=0),Se.echoes=Se.awaits*Tn,!0)}function la(e){return Se.echoes&&e&&e.constructor===dt?(Pt(),e.then(function(t){return at(),t},function(t){return at(),Ce(t)})):e}function Oi(){var e=ia[ia.length-1];ia.pop(),nt(e,!1)}function nt(e,t){var r,i,l=ae;(t?!Se.echoes||oa++&&e===ae:!oa||--oa&&e===ae)||queueMicrotask(t?(function(u){++sa,Se.echoes&&--Se.echoes!=0||(Se.echoes=Se.awaits=Se.id=0),ia.push(ae),nt(u,!0)}).bind(null,e):Oi),e!==ae&&(ae=e,l===Je&&(Je.env=In()),Ba)&&(r=Je.env.Promise,i=e.env,l.global||e.global)&&(Object.defineProperty(c,"Promise",i.PromiseProp),r.all=i.all,r.race=i.race,r.resolve=i.resolve,r.reject=i.reject,i.allSettled&&(r.allSettled=i.allSettled),i.any)&&(r.any=i.any)}function In(){var e=c.Promise;return Ba?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(c,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function mt(e,t,r,i,l){var u=ae;try{return nt(e,!0),t(r,i,l)}finally{nt(u,!1)}}function jn(e,t,r,i){return typeof e!="function"?e:function(){var l=ae;r&&Pt(),nt(t,!0);try{return e.apply(this,arguments)}finally{nt(l,!1),i&&queueMicrotask(at)}}}function Va(e){Promise===dt&&Se.echoes===0?oa===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+kt).indexOf("[native code]")===-1&&(Pt=at=he);var Ce=W.reject,ft="￿",Ye="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",Ln="String expected.",ca="__dbnames",Ha="readonly",Ua="readwrite";function gt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var On={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function da(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=ne(t))[e],t}}function Mn(){throw ie.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function fe(e,t){try{var r=Rn(e),i=Rn(t);if(r!==i)return r==="Array"?1:i==="Array"?-1:r==="binary"?1:i==="binary"?-1:r==="string"?1:i==="string"?-1:r==="Date"?1:i!=="Date"?NaN:-1;switch(r){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var l=Bn(e),u=Bn(t),f=l.length,g=u.length,_=f<g?f:g,T=0;T<_;++T)if(l[T]!==u[T])return l[T]<u[T]?-1:1;return f===g?0:f<g?-1:1;case"Array":for(var P=e,y=t,w=P.length,k=y.length,A=w<k?w:k,S=0;S<A;++S){var E=fe(P[S],y[S]);if(E!==0)return E}return w===k?0:w<k?-1:1}}catch{}return NaN}function Rn(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=Ie(e))==="ArrayBuffer")?"binary":t}function Bn(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function ua(e,t,r){var i=e.schema.yProps;return i?(t&&0<r.numFailures&&(t=t.filter(function(l,u){return!r.failures[u]})),Promise.all(i.map(function(l){return l=l.updatesTable,t?e.db.table(l).where("k").anyOf(t).delete():e.db.table(l).clear()})).then(function(){return r})):r}qn.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var r=t.add;if(m(r))return s(s([],m(e)?e:[],!0),r).sort();if(typeof r=="number")return(Number(e)||0)+r;if(typeof r=="bigint")try{return BigInt(e)+r}catch{return BigInt(0)+r}throw new TypeError("Invalid term ".concat(r))}if(t.remove!==void 0){var i=t.remove;if(m(i))return m(e)?e.filter(function(l){return!i.includes(l)}).sort():[];if(typeof i=="number")return Number(e)-i;if(typeof i=="bigint")try{return BigInt(e)-i}catch{return BigInt(0)-i}throw new TypeError("Invalid subtrahend ".concat(i))}return r=(r=t.replacePrefix)==null?void 0:r[0],r&&typeof e=="string"&&e.startsWith(r)?t.replacePrefix[1]+e.substring(r.length):e};var Bt=qn;function qn(e){this["@@propmod"]=e}function Nn(e,t){for(var r=d(t),i=r.length,l=!1,u=0;u<i;++u){var f=r[u],g=t[f],_=J(e,f);g instanceof Bt?(oe(e,f,g.execute(_)),l=!0):_!==g&&(oe(e,f,g),l=!0)}return l}ye.prototype._trans=function(e,t,r){var i=this._tx||ae.trans,l=this.name,u=Ve&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function f(T,P,y){if(y.schema[l])return t(y.idbtrans,y);throw new ie.NotFound("Table "+l+" not part of transaction")}var g=wt();try{var _=i&&i.db._novip===this.db._novip?i===ae.trans?i._promise(e,f,r):tt(function(){return i._promise(e,f,r)},{trans:i,transless:ae.transless||ae}):(function T(P,y,w,k){if(P.idbdb&&(P._state.openComplete||ae.letThrough||P._vip)){var A=P._createTransaction(y,w,P._dbSchema);try{A.create(),P._state.PR1398_maxLoop=3}catch(S){return S.name===Ma.InvalidState&&P.isOpen()&&0<--P._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),P.close({disableAutoOpen:!1}),P.open().then(function(){return T(P,y,w,k)})):Ce(S)}return A._promise(y,function(S,E){return tt(function(){return ae.trans=A,k(S,E,A)})}).then(function(S){if(y==="readwrite")try{A.idbtrans.commit()}catch{}return y==="readonly"?S:A._completion.then(function(){return S})})}if(P._state.openComplete)return Ce(new ie.DatabaseClosed(P._state.dbOpenError));if(!P._state.isBeingOpened){if(!P._state.autoOpen)return Ce(new ie.DatabaseClosed);P.open().catch(he)}return P._state.dbReadyPromise.then(function(){return T(P,y,w,k)})})(this.db,e,[this.name],f);return u&&(_._consoleTask=u,_=_.catch(function(T){return console.trace(T),Ce(T)})),_}finally{g&&Ct()}},ye.prototype.get=function(e,t){var r=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?Ce(new ie.Type("Invalid argument to Table.get()")):this._trans("readonly",function(i){return r.core.get({trans:i,key:e}).then(function(l){return r.hook.reading.fire(l)})}).then(t)},ye.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(m(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=d(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var r=this.schema.indexes.concat(this.schema.primKey).filter(function(g){if(g.compound&&t.every(function(T){return 0<=g.keyPath.indexOf(T)})){for(var _=0;_<t.length;++_)if(t.indexOf(g.keyPath[_])===-1)return!1;return!0}return!1}).sort(function(g,_){return g.keyPath.length-_.keyPath.length})[0];if(r&&this.db._maxKey!==ft)return f=r.keyPath.slice(0,t.length),this.where(f).equals(f.map(function(g){return e[g]}));!r&&Ve&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var i=this.schema.idxByName;function l(g,_){return fe(g,_)===0}var f=t.reduce(function(P,_){var T=P[0],P=P[1],y=i[_],w=e[_];return[T||y,T||!y?gt(P,y&&y.multi?function(k){return k=J(k,_),m(k)&&k.some(function(A){return l(w,A)})}:function(k){return l(w,J(k,_))}):P]},[null,null]),u=f[0],f=f[1];return u?this.where(u.name).equals(e[u.keyPath]).filter(f):r?this.filter(f):this.where(t).equals("")},ye.prototype.filter=function(e){return this.toCollection().and(e)},ye.prototype.count=function(e){return this.toCollection().count(e)},ye.prototype.offset=function(e){return this.toCollection().offset(e)},ye.prototype.limit=function(e){return this.toCollection().limit(e)},ye.prototype.each=function(e){return this.toCollection().each(e)},ye.prototype.toArray=function(e){return this.toCollection().toArray(e)},ye.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},ye.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,m(e)?"[".concat(e.join("+"),"]"):e))},ye.prototype.reverse=function(){return this.toCollection().reverse()},ye.prototype.mapToClass=function(e){for(var t=this.db,r=this.name,i=((this.schema.mappedClass=e).prototype instanceof Mn&&(e=(f=>{var g=P,_=f;if(typeof _!="function"&&_!==null)throw new TypeError("Class extends value "+String(_)+" is not a constructor or null");function T(){this.constructor=g}function P(){return f!==null&&f.apply(this,arguments)||this}return n(g,_),g.prototype=_===null?Object.create(_):(T.prototype=_.prototype,new T),Object.defineProperty(P.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),P.prototype.table=function(){return r},P})(e)),new Set),l=e.prototype;l;l=h(l))Object.getOwnPropertyNames(l).forEach(function(f){return i.add(f)});function u(f){if(!f)return f;var g,_=Object.create(e.prototype);for(g in f)if(!i.has(g))try{_[g]=f[g]}catch{}return _}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=u,this.hook("reading",u),e},ye.prototype.defineClass=function(){return this.mapToClass(function(e){b(this,e)})},ye.prototype.add=function(e,t){var r=this,i=this.schema.primKey,l=i.auto,u=i.keyPath,f=e;return u&&l&&(f=da(u)(e)),this._trans("readwrite",function(g){return r.core.mutate({trans:g,type:"add",keys:t!=null?[t]:null,values:[f]})}).then(function(g){return g.numFailures?W.reject(g.failures[0]):g.lastResult}).then(function(g){if(u)try{oe(e,u,g)}catch{}return g})},ye.prototype.upsert=function(e,t){var r=this,i=this.schema.primKey.keyPath;return this._trans("readwrite",function(l){return r.core.get({trans:l,key:e}).then(function(u){var f=u??{};return Nn(f,t),i&&oe(f,i,e),r.core.mutate({trans:l,type:"put",values:[f],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(g){return g.numFailures?W.reject(g.failures[0]):!!u})})})},ye.prototype.update=function(e,t){return typeof e!="object"||m(e)?this.where(":id").equals(e).modify(t):(e=J(e,this.schema.primKey.keyPath))===void 0?Ce(new ie.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},ye.prototype.put=function(e,t){var r=this,i=this.schema.primKey,l=i.auto,u=i.keyPath,f=e;return u&&l&&(f=da(u)(e)),this._trans("readwrite",function(g){return r.core.mutate({trans:g,type:"put",values:[f],keys:t!=null?[t]:null})}).then(function(g){return g.numFailures?W.reject(g.failures[0]):g.lastResult}).then(function(g){if(u)try{oe(e,u,g)}catch{}return g})},ye.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(r){return t.core.mutate({trans:r,type:"delete",keys:[e]}).then(function(i){return ua(t,[e],i)}).then(function(i){return i.numFailures?W.reject(i.failures[0]):void 0})})},ye.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:On}).then(function(r){return ua(e,null,r)})}).then(function(t){return t.numFailures?W.reject(t.failures[0]):void 0})},ye.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(r){return t.core.getMany({keys:e,trans:r}).then(function(i){return i.map(function(l){return t.hook.reading.fire(l)})})})},ye.prototype.bulkAdd=function(e,t,r){var i=this,l=Array.isArray(t)?t:void 0,u=(r=r||(l?void 0:t))?r.allKeys:void 0;return this._trans("readwrite",function(f){var g=i.schema.primKey,T=g.auto,g=g.keyPath;if(g&&l)throw new ie.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new ie.InvalidArgument("Arguments objects and keys must have the same length");var _=e.length,T=g&&T?e.map(da(g)):e;return i.core.mutate({trans:f,type:"add",keys:l,values:T,wantResults:u}).then(function(P){var y=P.numFailures,w=P.failures;if(y===0)return u?P.results:P.lastResult;throw new _t("".concat(i.name,".bulkAdd(): ").concat(y," of ").concat(_," operations failed"),w)})})},ye.prototype.bulkPut=function(e,t,r){var i=this,l=Array.isArray(t)?t:void 0,u=(r=r||(l?void 0:t))?r.allKeys:void 0;return this._trans("readwrite",function(f){var g=i.schema.primKey,T=g.auto,g=g.keyPath;if(g&&l)throw new ie.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new ie.InvalidArgument("Arguments objects and keys must have the same length");var _=e.length,T=g&&T?e.map(da(g)):e;return i.core.mutate({trans:f,type:"put",keys:l,values:T,wantResults:u}).then(function(P){var y=P.numFailures,w=P.failures;if(y===0)return u?P.results:P.lastResult;throw new _t("".concat(i.name,".bulkPut(): ").concat(y," of ").concat(_," operations failed"),w)})})},ye.prototype.bulkUpdate=function(e){var t=this,r=this.core,i=e.map(function(f){return f.key}),l=e.map(function(f){return f.changes}),u=[];return this._trans("readwrite",function(f){return r.getMany({trans:f,keys:i,cache:"clone"}).then(function(g){var _=[],T=[],P=(e.forEach(function(y,w){var k=y.key,A=y.changes,S=g[w];if(S){for(var E=0,I=Object.keys(A);E<I.length;E++){var D=I[E],O=A[D];if(D===t.schema.primKey.keyPath){if(fe(O,k)!==0)throw new ie.Constraint("Cannot update primary key in bulkUpdate()")}else oe(S,D,O)}u.push(w),_.push(k),T.push(S)}}),_.length);return r.mutate({trans:f,type:"put",keys:_,values:T,updates:{keys:i,changeSpecs:l}}).then(function(y){var w=y.numFailures,k=y.failures;if(w===0)return P;for(var A=0,S=Object.keys(k);A<S.length;A++){var E,I=S[A],D=u[Number(I)];D!=null&&(E=k[I],delete k[I],k[D]=E)}throw new _t("".concat(t.name,".bulkUpdate(): ").concat(w," of ").concat(P," operations failed"),k)})})})},ye.prototype.bulkDelete=function(e){var t=this,r=e.length;return this._trans("readwrite",function(i){return t.core.mutate({trans:i,type:"delete",keys:e}).then(function(l){return ua(t,e,l)})}).then(function(i){var l=i.numFailures,u=i.failures;if(l===0)return i.lastResult;throw new _t("".concat(t.name,".bulkDelete(): ").concat(l," of ").concat(r," operations failed"),u)})};var zn=ye;function ye(){}function qt(e){function t(f,g){if(g){for(var _=arguments.length,T=new Array(_-1);--_;)T[_-1]=arguments[_];return r[f].subscribe.apply(null,T),e}if(typeof f=="string")return r[f]}var r={};t.addEventType=u;for(var i=1,l=arguments.length;i<l;++i)u(arguments[i]);return t;function u(f,g,_){var T,P;if(typeof f!="object")return g=g||Di,P={subscribers:[],fire:_=_||he,subscribe:function(y){P.subscribers.indexOf(y)===-1&&(P.subscribers.push(y),P.fire=g(P.fire,y))},unsubscribe:function(y){P.subscribers=P.subscribers.filter(function(w){return w!==y}),P.fire=P.subscribers.reduce(g,_)}},r[f]=t[f]=P;d(T=f).forEach(function(y){var w=T[y];if(m(w))u(y,T[y][0],T[y][1]);else{if(w!=="asap")throw new ie.InvalidArgument("Invalid event config");var k=u(y,jt,function(){for(var A=arguments.length,S=new Array(A);A--;)S[A]=arguments[A];k.subscribers.forEach(function(E){Z(function(){E.apply(null,S)})})})}})}}function Nt(e,t){return Q(t).from({prototype:e}),t}function St(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Wa(e,t){e.filter=gt(e.filter,t)}function Qa(e,t,r){var i=e.replayFilter;e.replayFilter=i?function(){return gt(i(),t())}:t,e.justLimit=r&&!i}function pa(e,t){if(e.isPrimKey)return t.primaryKey;var r=t.getIndexByKeyPath(e.index);if(r)return r;throw new ie.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function Fn(e,t,r){var i=pa(e,t.schema);return t.openCursor({trans:r,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:i,range:e.range}})}function ma(e,t,r,i){var l,u,f=e.replayFilter?gt(e.filter,e.replayFilter()):e.filter;return e.or?(l={},u=function(g,_,T){var P,y;f&&!f(_,T,function(w){return _.stop(w)},function(w){return _.fail(w)})||((y=""+(P=_.primaryKey))=="[object ArrayBuffer]"&&(y=""+new Uint8Array(P)),x(l,y))||(l[y]=!0,t(g,_,T))},Promise.all([e.or._iterate(u,r),Kn(Fn(e,i,r),e.algorithm,u,!e.keysOnly&&e.valueMapper)])):Kn(Fn(e,i,r),gt(e.algorithm,f),t,!e.keysOnly&&e.valueMapper)}function Kn(e,t,r,i){var l=_e(i?function(u,f,g){return r(i(u),f,g)}:r);return e.then(function(u){if(u)return u.start(function(){var f=function(){return u.continue()};t&&!t(u,function(g){return f=g},function(g){u.stop(g),f=he},function(g){u.fail(g),f=he})||l(u.value,u,function(g){return f=g}),f()})})}be.prototype._read=function(e,t){var r=this._ctx;return r.error?r.table._trans(null,Ce.bind(null,r.error)):r.table._trans("readonly",e).then(t)},be.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,Ce.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},be.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=gt(t.algorithm,e)},be.prototype._iterate=function(e,t){return ma(this._ctx,e,t,this._ctx.table.core)},be.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),r=Object.create(this._ctx);return e&&b(r,e),t._ctx=r,t},be.prototype.raw=function(){return this._ctx.valueMapper=null,this},be.prototype.each=function(e){var t=this._ctx;return this._read(function(r){return ma(t,e,r,t.table.core)})},be.prototype.count=function(e){var t=this;return this._read(function(r){var i,l=t._ctx,u=l.table.core;return St(l,!0)?u.count({trans:r,query:{index:pa(l,u.schema),range:l.range}}).then(function(f){return Math.min(f,l.limit)}):(i=0,ma(l,function(){return++i,!1},r,u).then(function(){return i}))}).then(e)},be.prototype.sortBy=function(e,t){var r=e.split(".").reverse(),i=r[0],l=r.length-1;function u(_,T){return T?u(_[r[T]],T-1):_[i]}var f=this._ctx.dir==="next"?1:-1;function g(_,T){return fe(u(_,l),u(T,l))*f}return this.toArray(function(_){return _.slice().sort(g)}).then(t)},be.prototype.toArray=function(e){var t=this;return this._read(function(r){var i,l,u,f=t._ctx;return St(f,!0)&&0<f.limit?(i=f.valueMapper,l=pa(f,f.table.core.schema),f.table.core.query({trans:r,limit:f.limit,values:!0,direction:f.dir==="prev"?"prev":void 0,query:{index:l,range:f.range}}).then(function(g){return g=g.result,i?g.map(i):g})):(u=[],ma(f,function(g){return u.push(g)},r,f.table.core).then(function(){return u}))},e)},be.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,St(t)?Qa(t,function(){var r=e;return function(i,l){return r===0||(r===1?--r:l(function(){i.advance(r),r=0}),!1)}}):Qa(t,function(){var r=e;return function(){return--r<0}})),this},be.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Qa(this._ctx,function(){var t=e;return function(r,i,l){return--t<=0&&i(l),0<=t}},!0),this},be.prototype.until=function(e,t){return Wa(this._ctx,function(r,i,l){return!e(r.value)||(i(l),t)}),this},be.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},be.prototype.last=function(e){return this.reverse().first(e)},be.prototype.filter=function(e){var t;return Wa(this._ctx,function(r){return e(r.value)}),(t=this._ctx).isMatch=gt(t.isMatch,e),this},be.prototype.and=function(e){return this.filter(e)},be.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},be.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},be.prototype.desc=function(){return this.reverse()},be.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(r,i){e(i.key,i)})},be.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},be.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(r,i){e(i.primaryKey,i)})},be.prototype.keys=function(e){var t=this._ctx,r=(t.keysOnly=!t.isMatch,[]);return this.each(function(i,l){r.push(l.key)}).then(function(){return r}).then(e)},be.prototype.primaryKeys=function(e){var t=this._ctx;if(St(t,!0)&&0<t.limit)return this._read(function(i){var l=pa(t,t.table.core.schema);return t.table.core.query({trans:i,values:!1,limit:t.limit,direction:t.dir==="prev"?"prev":void 0,query:{index:l,range:t.range}})}).then(function(i){return i.result}).then(e);t.keysOnly=!t.isMatch;var r=[];return this.each(function(i,l){r.push(l.primaryKey)}).then(function(){return r}).then(e)},be.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},be.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},be.prototype.lastKey=function(e){return this.reverse().firstKey(e)},be.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Wa(this._ctx,function(i){var i=i.primaryKey.toString(),l=x(e,i);return e[i]=!0,!l})),this},be.prototype.modify=function(e){var t=this,r=this._ctx;return this._write(function(i){function l(S,E){var I=E.failures;w+=S-E.numFailures;for(var D=0,O=d(I);D<O.length;D++){var N=O[D];y.push(I[N])}}var u=typeof e=="function"?e:function(S){return Nn(S,e)},f=r.table.core,P=f.schema.primaryKey,g=P.outbound,_=P.extractKey,T=200,P=t.db._options.modifyChunkSize,y=(P&&(T=typeof P=="object"?P[f.name]||P["*"]||200:P),[]),w=0,k=[],A=e===Gn;return t.clone().primaryKeys().then(function(S){function E(D){var O=Math.min(T,S.length-D),N=S.slice(D,D+O);return(A?Promise.resolve([]):f.getMany({trans:i,keys:N,cache:"immutable"})).then(function(F){var U=[],V=[],X=g?[]:null,H=A?N:[];if(!A)for(var ee=0;ee<O;++ee){var z=F[ee],le={value:ne(z),primKey:S[D+ee]};u.call(le,le.value,le)!==!1&&(le.value==null?H.push(S[D+ee]):g||fe(_(z),_(le.value))===0?(V.push(le.value),g&&X.push(S[D+ee])):(H.push(S[D+ee]),U.push(le.value)))}return Promise.resolve(0<U.length&&f.mutate({trans:i,type:"add",values:U}).then(function(ce){for(var ue in ce.failures)H.splice(parseInt(ue),1);l(U.length,ce)})).then(function(){return(0<V.length||I&&typeof e=="object")&&f.mutate({trans:i,type:"put",keys:X,values:V,criteria:I,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<D}).then(function(ce){return l(V.length,ce)})}).then(function(){return(0<H.length||I&&A)&&f.mutate({trans:i,type:"delete",keys:H,criteria:I,isAdditionalChunk:0<D}).then(function(ce){return ua(r.table,H,ce)}).then(function(ce){return l(H.length,ce)})}).then(function(){return S.length>D+O&&E(D+T)})})}var I=St(r)&&r.limit===1/0&&(typeof e!="function"||A)&&{index:r.index,range:r.range};return E(0).then(function(){if(0<y.length)throw new ea("Error modifying one or more objects",y,w,k);return S.length})})})},be.prototype.delete=function(){var e=this._ctx,t=e.range;return!St(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(Gn):this._write(function(r){var i=e.table.core.schema.primaryKey,l=t;return e.table.core.count({trans:r,query:{index:i,range:l}}).then(function(u){return e.table.core.mutate({trans:r,type:"deleteRange",range:l}).then(function(_){var g=_.failures,_=_.numFailures;if(_)throw new ea("Could not delete some values",Object.keys(g).map(function(T){return g[T]}),u-_);return u-_})})})};var Mi=be;function be(){}var Gn=function(e,t){return t.value=null};function Ri(e,t){return e<t?-1:e===t?0:1}function Bi(e,t){return t<e?-1:e===t?0:1}function Ne(e,t,r){return e=e instanceof Hn?new e.Collection(e):e,e._ctx.error=new(r||TypeError)(t),e}function At(e){return new e.Collection(e,function(){return Vn("")}).limit(0)}function fa(k,t,r,i){var l,u,f,g,_,T,P,y=r.length;if(!r.every(function(S){return typeof S=="string"}))return Ne(k,Ln);function w(S){l=S==="next"?function(I){return I.toUpperCase()}:function(I){return I.toLowerCase()},u=S==="next"?function(I){return I.toLowerCase()}:function(I){return I.toUpperCase()},f=S==="next"?Ri:Bi;var E=r.map(function(I){return{lower:u(I),upper:l(I)}}).sort(function(I,D){return f(I.lower,D.lower)});g=E.map(function(I){return I.upper}),_=E.map(function(I){return I.lower}),P=(T=S)==="next"?"":i}w("next");var k=new k.Collection(k,function(){return rt(g[0],_[y-1]+i)}),A=(k._ondirectionchange=function(S){w(S)},0);return k._addAlgorithm(function(S,E,I){var D=S.key;if(typeof D=="string"){var O=u(D);if(t(O,_,A))return!0;for(var N=null,F=A;F<y;++F){var U=((V,X,H,ee,z,le)=>{for(var ce=Math.min(V.length,ee.length),ue=-1,me=0;me<ce;++me){var ze=X[me];if(ze!==ee[me])return z(V[me],H[me])<0?V.substr(0,me)+H[me]+H.substr(me+1):z(V[me],ee[me])<0?V.substr(0,me)+ee[me]+H.substr(me+1):0<=ue?V.substr(0,ue)+X[ue]+H.substr(ue+1):null;z(V[me],ze)<0&&(ue=me)}return ce<ee.length&&le==="next"?V+H.substr(V.length):ce<V.length&&le==="prev"?V.substr(0,H.length):ue<0?null:V.substr(0,ue)+ee[ue]+H.substr(ue+1)})(D,O,g[F],_[F],f,T);U===null&&N===null?A=F+1:(N===null||0<f(N,U))&&(N=U)}E(N!==null?function(){S.continue(N+P)}:I)}return!1}),k}function rt(e,t,r,i){return{type:2,lower:e,upper:t,lowerOpen:r,upperOpen:i}}function Vn(e){return{type:1,lower:e,upper:e}}Object.defineProperty(Ae.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Ae.prototype.between=function(e,t,r,i){r=r!==!1,i=i===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(r||i)&&(!r||!i)?At(this):new this.Collection(this,function(){return rt(e,t,!r,!i)})}catch{return Ne(this,Ye)}},Ae.prototype.equals=function(e){return e==null?Ne(this,Ye):new this.Collection(this,function(){return Vn(e)})},Ae.prototype.above=function(e){return e==null?Ne(this,Ye):new this.Collection(this,function(){return rt(e,void 0,!0)})},Ae.prototype.aboveOrEqual=function(e){return e==null?Ne(this,Ye):new this.Collection(this,function(){return rt(e,void 0,!1)})},Ae.prototype.below=function(e){return e==null?Ne(this,Ye):new this.Collection(this,function(){return rt(void 0,e,!1,!0)})},Ae.prototype.belowOrEqual=function(e){return e==null?Ne(this,Ye):new this.Collection(this,function(){return rt(void 0,e)})},Ae.prototype.startsWith=function(e){return typeof e!="string"?Ne(this,Ln):this.between(e,e+ft,!0,!0)},Ae.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):fa(this,function(t,r){return t.indexOf(r[0])===0},[e],ft)},Ae.prototype.equalsIgnoreCase=function(e){return fa(this,function(t,r){return t===r[0]},[e],"")},Ae.prototype.anyOfIgnoreCase=function(){var e=Fe.apply(Ke,arguments);return e.length===0?At(this):fa(this,function(t,r){return r.indexOf(t)!==-1},e,"")},Ae.prototype.startsWithAnyOfIgnoreCase=function(){var e=Fe.apply(Ke,arguments);return e.length===0?At(this):fa(this,function(t,r){return r.some(function(i){return t.indexOf(i)===0})},e,ft)},Ae.prototype.anyOf=function(){var e,t,r=this,i=Fe.apply(Ke,arguments),l=this._cmp;try{i.sort(l)}catch{return Ne(this,Ye)}return i.length===0?At(this):((e=new this.Collection(this,function(){return rt(i[0],i[i.length-1])}))._ondirectionchange=function(u){l=u==="next"?r._ascending:r._descending,i.sort(l)},t=0,e._addAlgorithm(function(u,f,g){for(var _=u.key;0<l(_,i[t]);)if(++t===i.length)return f(g),!1;return l(_,i[t])===0||(f(function(){u.continue(i[t])}),!1)}),e)},Ae.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Ae.prototype.noneOf=function(){var e=Fe.apply(Ke,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return Ne(this,Ye)}var t=e.reduce(function(r,i){return r?r.concat([[r[r.length-1][1],i]]):[[-1/0,i]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},Ae.prototype.inAnyRange=function(e,I){var r=this,i=this._cmp,l=this._ascending,u=this._descending,f=this._min,g=this._max;if(e.length===0)return At(this);if(!e.every(function(D){return D[0]!==void 0&&D[1]!==void 0&&l(D[0],D[1])<=0}))return Ne(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",ie.InvalidArgument);var _=!I||I.includeLowers!==!1,T=I&&I.includeUppers===!0,P,y=l;function w(D,O){return y(D[0],O[0])}try{(P=e.reduce(function(D,O){for(var N=0,F=D.length;N<F;++N){var U=D[N];if(i(O[0],U[1])<0&&0<i(O[1],U[0])){U[0]=f(U[0],O[0]),U[1]=g(U[1],O[1]);break}}return N===F&&D.push(O),D},[])).sort(w)}catch{return Ne(this,Ye)}var k=0,A=T?function(D){return 0<l(D,P[k][1])}:function(D){return 0<=l(D,P[k][1])},S=_?function(D){return 0<u(D,P[k][0])}:function(D){return 0<=u(D,P[k][0])},E=A,I=new this.Collection(this,function(){return rt(P[0][0],P[P.length-1][1],!_,!T)});return I._ondirectionchange=function(D){y=D==="next"?(E=A,l):(E=S,u),P.sort(w)},I._addAlgorithm(function(D,O,N){for(var F,U=D.key;E(U);)if(++k===P.length)return O(N),!1;return!A(F=U)&&!S(F)||(r._cmp(U,P[k][1])===0||r._cmp(U,P[k][0])===0||O(function(){y===l?D.continue(P[k][0]):D.continue(P[k][1])}),!1)}),I},Ae.prototype.startsWithAnyOf=function(){var e=Fe.apply(Ke,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?At(this):this.inAnyRange(e.map(function(t){return[t,t+ft]})):Ne(this,"startsWithAnyOf() only works with strings")};var Hn=Ae;function Ae(){}function Ge(e){return _e(function(t){return zt(t),e(t.target.error),!1})}function zt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var ga="storagemutated",Ja="x-storagemutated-1",it=qt(null,ga),qi=(He.prototype._lock=function(){return q(!ae.global),++this._reculock,this._reculock!==1||ae.global||(ae.lockOwnerFor=this),this},He.prototype._unlock=function(){if(q(!ae.global),--this._reculock==0)for(ae.global||(ae.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{mt(e[1],e[0])}catch{}}return this},He.prototype._locked=function(){return this._reculock&&ae.lockOwnerFor!==this},He.prototype.create=function(e){var t=this;if(this.mode){var r=this.db.idbdb,i=this.db._state.dbOpenError;if(q(!this.idbtrans),!e&&!r)switch(i&&i.name){case"DatabaseClosedError":throw new ie.DatabaseClosed(i);case"MissingAPIError":throw new ie.MissingAPI(i.message,i);default:throw new ie.OpenFailed(i)}if(!this.active)throw new ie.TransactionInactive;q(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||r).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=_e(function(l){zt(l),t._reject(e.error)}),e.onabort=_e(function(l){zt(l),t.active&&t._reject(new ie.Abort(e.error)),t.active=!1,t.on("abort").fire(l)}),e.oncomplete=_e(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&it.storagemutated.fire(e.mutatedParts)})}return this},He.prototype._promise=function(e,t,r){var i,l=this;return e==="readwrite"&&this.mode!=="readwrite"?Ce(new ie.ReadOnly("Transaction is readonly")):this.active?this._locked()?new W(function(u,f){l._blockedFuncs.push([function(){l._promise(e,t,r).then(u,f)},ae])}):r?tt(function(){var u=new W(function(f,g){l._lock();var _=t(f,g,l);_&&_.then&&_.then(f,g)});return u.finally(function(){return l._unlock()}),u._lib=!0,u}):((i=new W(function(u,f){var g=t(u,f,l);g&&g.then&&g.then(u,f)}))._lib=!0,i):Ce(new ie.TransactionInactive)},He.prototype._root=function(){return this.parent?this.parent._root():this},He.prototype.waitFor=function(e){var t,r=this._root(),i=W.resolve(e),l=(r._waitingFor?r._waitingFor=r._waitingFor.then(function(){return i}):(r._waitingFor=i,r._waitingQueue=[],t=r.idbtrans.objectStore(r.storeNames[0]),(function u(){for(++r._spinCount;r._waitingQueue.length;)r._waitingQueue.shift()();r._waitingFor&&(t.get(-1/0).onsuccess=u)})()),r._waitingFor);return new W(function(u,f){i.then(function(g){return r._waitingQueue.push(_e(u.bind(null,g)))},function(g){return r._waitingQueue.push(_e(f.bind(null,g)))}).finally(function(){r._waitingFor===l&&(r._waitingFor=null)})})},He.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new ie.Abort))},He.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(x(t,e))return t[e];var r=this.schema[e];if(r)return(r=new this.db.Table(e,r,this)).core=this.db.core.table(e),t[e]=r;throw new ie.NotFound("Table "+e+" not part of transaction")},He);function He(){}function Ya(e,t,r,i,l,u,f,g){return{name:e,keyPath:t,unique:r,multi:i,auto:l,compound:u,src:(r&&!f?"&":"")+(i?"*":"")+(l?"++":"")+Un(t),type:g}}function Un(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function Za(e,t,r){return{name:e,primKey:t,indexes:r,mappedClass:null,idxByName:(i=function(l){return[l.name,l]},r.reduce(function(l,u,f){return u=i(u,f),u&&(l[u[0]]=u[1]),l},{}))};var i}var Ft=function(e){try{return e.only([[]]),Ft=function(){return[[]]},[[]]}catch{return Ft=function(){return ft},ft}};function Xa(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(r){return r[t]}:function(r){return J(r,t)}:function(r){return J(r,e)};var t}function Wn(e){return[].slice.call(e)}var Ni=0;function Kt(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function zi(e,t,f){function i(E){if(E.type===3)return null;if(E.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var k=E.lower,A=E.upper,S=E.lowerOpen,E=E.upperOpen;return k===void 0?A===void 0?null:t.upperBound(A,!!E):A===void 0?t.lowerBound(k,!!S):t.bound(k,A,!!S,!!E)}function l(w){var k,A,S=w.name;return{name:S,schema:w,mutate:function(E){var I=E.trans,D=E.type,O=E.keys,N=E.values,F=E.range;return new Promise(function(U,V){U=_e(U);var X=I.objectStore(S),H=X.keyPath==null,ee=D==="put"||D==="add";if(!ee&&D!=="delete"&&D!=="deleteRange")throw new Error("Invalid operation type: "+D);var z,le=(O||N||{length:1}).length;if(O&&N&&O.length!==N.length)throw new Error("Given keys array must have same length as given values array.");if(le===0)return U({numFailures:0,failures:{},results:[],lastResult:void 0});function ce(Re){++ze,zt(Re)}var ue=[],me=[],ze=0;if(D==="deleteRange"){if(F.type===4)return U({numFailures:ze,failures:me,results:[],lastResult:void 0});F.type===3?ue.push(z=X.clear()):ue.push(z=X.delete(i(F)))}else{var H=ee?H?[N,O]:[N,null]:[O,null],de=H[0],Oe=H[1];if(ee)for(var Me=0;Me<le;++Me)ue.push(z=Oe&&Oe[Me]!==void 0?X[D](de[Me],Oe[Me]):X[D](de[Me])),z.onerror=ce;else for(Me=0;Me<le;++Me)ue.push(z=X[D](de[Me])),z.onerror=ce}function Ea(Re){Re=Re.target.result,ue.forEach(function(vt,vn){return vt.error!=null&&(me[vn]=vt.error)}),U({numFailures:ze,failures:me,results:D==="delete"?O:ue.map(function(vt){return vt.result}),lastResult:Re})}z.onerror=function(Re){ce(Re),Ea(Re)},z.onsuccess=Ea})},getMany:function(E){var I=E.trans,D=E.keys;return new Promise(function(O,N){O=_e(O);for(var F,U=I.objectStore(S),V=D.length,X=new Array(V),H=0,ee=0,z=function(ue){ue=ue.target,X[ue._pos]=ue.result,++ee===H&&O(X)},le=Ge(N),ce=0;ce<V;++ce)D[ce]!=null&&((F=U.get(D[ce]))._pos=ce,F.onsuccess=z,F.onerror=le,++H);H===0&&O(X)})},get:function(E){var I=E.trans,D=E.key;return new Promise(function(O,N){O=_e(O);var F=I.objectStore(S).get(D);F.onsuccess=function(U){return O(U.target.result)},F.onerror=Ge(N)})},query:(k=_,A=T,function(E){return new Promise(function(I,D){I=_e(I);var O,N,F,U,le=E.trans,V=E.values,X=E.limit,z=E.query,H=(H=E.direction)!=null?H:"next",ee=X===1/0?void 0:X,ce=z.index,z=z.range,le=le.objectStore(S),le=ce.isPrimaryKey?le:le.index(ce.name),ce=i(z);if(X===0)return I({result:[]});A?(z={query:ce,count:ee,direction:H},(O=V?le.getAll(z):le.getAllKeys(z)).onsuccess=function(ue){return I({result:ue.target.result})},O.onerror=Ge(D)):k&&H==="next"?((O=V?le.getAll(ce,ee):le.getAllKeys(ce,ee)).onsuccess=function(ue){return I({result:ue.target.result})},O.onerror=Ge(D)):(N=0,F=!V&&"openKeyCursor"in le?le.openKeyCursor(ce,H):le.openCursor(ce,H),U=[],F.onsuccess=function(){var ue=F.result;return!ue||(U.push(V?ue.value:ue.primaryKey),++N===X)?I({result:U}):void ue.continue()},F.onerror=Ge(D))})}),openCursor:function(E){var I=E.trans,D=E.values,O=E.query,N=E.reverse,F=E.unique;return new Promise(function(U,V){U=_e(U);var ee=O.index,X=O.range,H=I.objectStore(S),H=ee.isPrimaryKey?H:H.index(ee.name),ee=N?F?"prevunique":"prev":F?"nextunique":"next",z=!D&&"openKeyCursor"in H?H.openKeyCursor(i(X),ee):H.openCursor(i(X),ee);z.onerror=Ge(V),z.onsuccess=_e(function(le){var ce,ue,me,ze,de=z.result;de?(de.___id=++Ni,de.done=!1,ce=de.continue.bind(de),ue=(ue=de.continuePrimaryKey)&&ue.bind(de),me=de.advance.bind(de),ze=function(){throw new Error("Cursor not stopped")},de.trans=I,de.stop=de.continue=de.continuePrimaryKey=de.advance=function(){throw new Error("Cursor not started")},de.fail=_e(V),de.next=function(){var Oe=this,Me=1;return this.start(function(){return Me--?Oe.continue():Oe.stop()}).then(function(){return Oe})},de.start=function(Oe){function Me(){if(z.result)try{Oe()}catch(Re){de.fail(Re)}else de.done=!0,de.start=function(){throw new Error("Cursor behind last entry")},de.stop()}var Ea=new Promise(function(Re,vt){Re=_e(Re),z.onerror=Ge(vt),de.fail=vt,de.stop=function(vn){de.stop=de.continue=de.continuePrimaryKey=de.advance=ze,Re(vn)}});return z.onsuccess=_e(function(Re){z.onsuccess=Me,Me()}),de.continue=ce,de.continuePrimaryKey=ue,de.advance=me,Me(),Ea},U(de)):U(null)},V)})},count:function(E){var I=E.query,D=E.trans,O=I.index,N=I.range;return new Promise(function(F,U){var V=D.objectStore(S),V=O.isPrimaryKey?V:V.index(O.name),X=i(N),X=X?V.count(X):V.count();X.onsuccess=_e(function(H){return F(H.target.result)}),X.onerror=Ge(U)})}}}u=f,g=Wn((f=e).objectStoreNames),P=0<g.length?u.objectStore(g[0]):{};var u,f={schema:{name:f.name,tables:g.map(function(w){return u.objectStore(w)}).map(function(w){var k=w.keyPath,A=w.autoIncrement,E=m(k),S={},E={name:w.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:k==null,compound:E,keyPath:k,autoIncrement:A,unique:!0,extractKey:Xa(k)},indexes:Wn(w.indexNames).map(function(I){return w.index(I)}).map(function(N){var F=N.name,D=N.unique,O=N.multiEntry,N=N.keyPath,F={name:F,compound:m(N),keyPath:N,unique:D,multiEntry:O,extractKey:Xa(N)};return S[Kt(N)]=F}),getIndexByKeyPath:function(I){return S[Kt(I)]}};return S[":id"]=E.primaryKey,k!=null&&(S[Kt(k)]=E.primaryKey),E})},hasGetAll:0<g.length&&"getAll"in P&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in P},g=f.schema,_=f.hasGetAll,T=f.hasIdb3Features,P=g.tables.map(l),y={};return P.forEach(function(w){return y[w.name]=w}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(w){if(y[w])return y[w];throw new Error("Table '".concat(w,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Ft(t),schema:g}}function Fi(e,t,r,i){return r=r.IDBKeyRange,t=zi(t,r,i),{dbcore:e.dbcore.reduce(function(l,u){return u=u.create,o(o({},l),u(l))},t)}}function ba(e,t){var r=t.db,r=Fi(e._middlewares,r,e._deps,t);e.core=r.dbcore,e.tables.forEach(function(i){var l=i.name;e.core.schema.tables.some(function(u){return u.name===l})&&(i.core=e.core.table(l),e[l]instanceof e.Table)&&(e[l].core=i.core)})}function ha(e,t,r,i){r.forEach(function(l){var u=i[l];t.forEach(function(f){var g=(function _(T,P){return $(T,P)||(T=h(T))&&_(T,P)})(f,l);(!g||"value"in g&&g.value===void 0)&&(f===e.Transaction.prototype||f instanceof e.Transaction?L(f,l,{get:function(){return this.table(l)},set:function(_){R(this,l,{value:_,writable:!0,configurable:!0,enumerable:!0})}}):f[l]=new e.Table(l,u))})})}function en(e,t){t.forEach(function(r){for(var i in r)r[i]instanceof e.Table&&delete r[i]})}function Ki(e,t){return e._cfg.version-t._cfg.version}function Gi(e,t,r,i){var l=e._dbSchema,u=(r.objectStoreNames.contains("$meta")&&!l.$meta&&(l.$meta=Za("$meta",Jn("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,l)),f=(u.create(r),u._completion.catch(i),u._reject.bind(u)),g=ae.transless||ae;tt(function(){if(ae.trans=u,ae.transless=g,t!==0)return ba(e,r),T=t,((_=u).storeNames.includes("$meta")?_.table("$meta").get("version").then(function(P){return P??T}):W.resolve(T)).then(function(E){var y=e,w=E,k=u,A=r,S=[],E=y._versions,I=y._dbSchema=ya(0,y.idbdb,A);return(E=E.filter(function(D){return D._cfg.version>=w})).length===0?W.resolve():(E.forEach(function(D){S.push(function(){var O,N,F,U=I,V=D._cfg.dbschema,X=(xa(y,U,A),xa(y,V,A),I=y._dbSchema=V,tn(U,V)),H=(X.add.forEach(function(ee){an(A,ee[0],ee[1].primKey,ee[1].indexes)}),X.change.forEach(function(ee){if(ee.recreate)throw new ie.Upgrade("Not yet support for changing primary key");var z=A.objectStore(ee.name);ee.add.forEach(function(le){return va(z,le)}),ee.change.forEach(function(le){z.deleteIndex(le.name),va(z,le)}),ee.del.forEach(function(le){return z.deleteIndex(le)})}),D._cfg.contentUpgrade);if(H&&D._cfg.version>w)return ba(y,A),k._memoizedTables={},O=ge(V),X.del.forEach(function(ee){O[ee]=U[ee]}),en(y,[y.Transaction.prototype]),ha(y,[y.Transaction.prototype],d(O),O),k.schema=O,(N=Te(H))&&Pt(),V=W.follow(function(){var ee;(F=H(k))&&N&&(ee=at.bind(null,null),F.then(ee,ee))}),F&&typeof F.then=="function"?W.resolve(F):V.then(function(){return F})}),S.push(function(O){var N,F,U=D._cfg.dbschema;N=U,F=O,[].slice.call(F.db.objectStoreNames).forEach(function(V){return N[V]==null&&F.db.deleteObjectStore(V)}),en(y,[y.Transaction.prototype]),ha(y,[y.Transaction.prototype],y._storeNames,y._dbSchema),k.schema=y._dbSchema}),S.push(function(O){y.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(y.idbdb.version/10)===D._cfg.version?(y.idbdb.deleteObjectStore("$meta"),delete y._dbSchema.$meta,y._storeNames=y._storeNames.filter(function(N){return N!=="$meta"})):O.objectStore("$meta").put(D._cfg.version,"version"))})}),(function D(){return S.length?W.resolve(S.shift()(k.idbtrans)).then(D):W.resolve()})().then(function(){Qn(I,A)}))}).catch(f);var _,T;d(l).forEach(function(P){an(r,P,l[P].primKey,l[P].indexes)}),ba(e,r),W.follow(function(){return e.on.populate.fire(u)}).catch(f)})}function Vi(e,t){Qn(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var r=ya(0,e.idbdb,t);xa(e,e._dbSchema,t);for(var i=0,l=tn(r,e._dbSchema).change;i<l.length;i++){var u=(f=>{if(f.change.length||f.recreate)return console.warn("Unable to patch indexes of table ".concat(f.name," because it has changes on the type of index or primary key.")),{value:void 0};var g=t.objectStore(f.name);f.add.forEach(function(_){Ve&&console.debug("Dexie upgrade patch: Creating missing index ".concat(f.name,".").concat(_.src)),va(g,_)})})(l[i]);if(typeof u=="object")return u.value}}function tn(e,t){var r,i={del:[],add:[],change:[]};for(r in e)t[r]||i.del.push(r);for(r in t){var l=e[r],u=t[r];if(l){var f={name:r,def:u,recreate:!1,del:[],add:[],change:[]};if(""+(l.primKey.keyPath||"")!=""+(u.primKey.keyPath||"")||l.primKey.auto!==u.primKey.auto)f.recreate=!0,i.change.push(f);else{var g=l.idxByName,_=u.idxByName,T=void 0;for(T in g)_[T]||f.del.push(T);for(T in _){var P=g[T],y=_[T];P?P.src!==y.src&&f.change.push(y):f.add.push(y)}(0<f.del.length||0<f.add.length||0<f.change.length)&&i.change.push(f)}}else i.add.push([r,u])}return i}function an(e,t,r,i){var l=e.db.createObjectStore(t,r.keyPath?{keyPath:r.keyPath,autoIncrement:r.auto}:{autoIncrement:r.auto});i.forEach(function(u){return va(l,u)})}function Qn(e,t){d(e).forEach(function(r){t.db.objectStoreNames.contains(r)||(Ve&&console.debug("Dexie: Creating missing table",r),an(t,r,e[r].primKey,e[r].indexes))})}function va(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function ya(e,t,r){var i={};return K(t.objectStoreNames,0).forEach(function(l){for(var u=r.objectStore(l),f=Ya(Un(T=u.keyPath),T||"",!0,!1,!!u.autoIncrement,T&&typeof T!="string",!0),g=[],_=0;_<u.indexNames.length;++_){var P=u.index(u.indexNames[_]),T=P.keyPath,P=Ya(P.name,T,!!P.unique,!!P.multiEntry,!1,T&&typeof T!="string",!1);g.push(P)}i[l]=Za(l,f,g)}),i}function xa(e,t,r){for(var i=r.db.objectStoreNames,l=0;l<i.length;++l){var u=i[l],f=r.objectStore(u);e._hasGetAll="getAll"in f;for(var g=0;g<f.indexNames.length;++g){var _,T=f.indexNames[g],P=f.index(T).keyPath,P=typeof P=="string"?P:"["+K(P).join("+")+"]";t[u]&&(_=t[u].idxByName[P])&&(_.name=T,delete t[u].idxByName[P],t[u].idxByName[T]=_)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&c.WorkerGlobalScope&&c instanceof c.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function Jn(e){return e.split(",").map(function(t,r){var l=t.split(":"),i=(i=l[1])==null?void 0:i.trim(),l=(t=l[0].trim()).replace(/([&*]|\+\+)/g,""),u=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Ya(l,u||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),m(u),r===0,i)})}Et.prototype._createTableSchema=Za,Et.prototype._parseIndexSyntax=Jn,Et.prototype._parseStoresSpec=function(e,t){var r=this;d(e).forEach(function(i){if(e[i]!==null){var l=r._parseIndexSyntax(e[i]),u=l.shift();if(!u)throw new ie.Schema("Invalid schema for table "+i+": "+e[i]);if(u.unique=!0,u.multi)throw new ie.Schema("Primary key cannot be multiEntry*");l.forEach(function(f){if(f.auto)throw new ie.Schema("Only primary key can be marked as autoIncrement (++)");if(!f.keyPath)throw new ie.Schema("Index must have a name and cannot be an empty string")}),u=r._createTableSchema(i,u,l),t[i]=u}})},Et.prototype.stores=function(r){var t=this.db,r=(this._cfg.storesSource=this._cfg.storesSource?b(this._cfg.storesSource,r):r,t._versions),i={},l={};return r.forEach(function(u){b(i,u._cfg.storesSource),l=u._cfg.dbschema={},u._parseStoresSpec(i,l)}),t._dbSchema=l,en(t,[t._allTables,t,t.Transaction.prototype]),ha(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],d(l),l),t._storeNames=d(l),this},Et.prototype.upgrade=function(e){return this._cfg.contentUpgrade=Ra(this._cfg.contentUpgrade||he,e),this};var Hi=Et;function Et(){}var Gt=(()=>{var e,t,r;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(e=new Set,t=new FinalizationRegistry(function(i){e.delete(i)}),{toArray:function(){return Array.from(e).map(function(i){return i.deref()}).filter(function(i){return i!==void 0})},add:function(i){var l=new WeakRef(i._novip);e.add(l),t.register(i._novip,l,l),e.size>i._options.maxConnections&&(l=e.values().next().value,e.delete(l),t.unregister(l))},remove:function(i){if(i)for(var l=e.values(),u=l.next();!u.done;){var f=u.value;if(f.deref()===i._novip)return e.delete(f),void t.unregister(f);u=l.next()}}}):(r=[],{toArray:function(){return r},add:function(i){r.push(i._novip)},remove:function(i){i&&(i=r.indexOf(i._novip))!==-1&&r.splice(i,1)}})})();function nn(e,t){var r=e._dbNamesDB;return r||(r=e._dbNamesDB=new Ze(ca,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),r.table("dbnames")}function rn(e){return e&&typeof e.databases=="function"}function on(e){return tt(function(){return ae.letThrough=!0,e()})}function sn(e){return!("from"in e)}var Le=function(e,t){var r;if(!this)return r=new Le,e&&"d"in e&&b(r,e),r;b(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Vt(e,t,r){var i=fe(t,r);if(!isNaN(i)){if(0<i)throw RangeError();if(sn(e))return b(e,{from:t,to:r,d:1});var i=e.l,l=e.r;if(fe(r,e.from)<0)return i?Vt(i,t,r):e.l={from:t,to:r,d:1,l:null,r:null},Zn(e);if(0<fe(t,e.to))return l?Vt(l,t,r):e.r={from:t,to:r,d:1,l:null,r:null},Zn(e);fe(t,e.from)<0&&(e.from=t,e.l=null,e.d=l?l.d+1:1),0<fe(r,e.to)&&(e.to=r,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,i&&!e.l&&Ht(e,i),l&&t&&Ht(e,l)}}function Ht(e,t){sn(t)||(function r(i,l){var u=l.from,f=l.l,g=l.r;Vt(i,u,l.to),f&&r(i,f),g&&r(i,g)})(e,t)}function Yn(e,t){var r=_a(t),i=r.next();if(!i.done)for(var l=i.value,u=_a(e),f=u.next(l.from),g=f.value;!i.done&&!f.done;){if(fe(g.from,l.to)<=0&&0<=fe(g.to,l.from))return!0;fe(l.from,g.from)<0?l=(i=r.next(g.from)).value:g=(f=u.next(l.from)).value}return!1}function _a(e){var t=sn(e)?null:{s:0,n:e};return{next:function(r){for(var i=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,i)for(;t.n.l&&fe(r,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!i||fe(r,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function Zn(e){var t,r,i,l=(((l=e.r)==null?void 0:l.d)||0)-(((l=e.l)==null?void 0:l.d)||0),l=1<l?"r":l<-1?"l":"";l&&(t=l=="r"?"l":"r",r=o({},e),i=e[l],e.from=i.from,e.to=i.to,e[l]=i[l],r[l]=i[t],(e[t]=r).d=Xn(r)),e.d=Xn(e)}function Xn(r){var t=r.r,r=r.l;return(t?r?Math.max(t.d,r.d):t.d:r?r.d:0)+1}function wa(e,t){return d(t).forEach(function(r){e[r]?Ht(e[r],t[r]):e[r]=(function i(l){var u,f,g={};for(u in l)x(l,u)&&(f=l[u],g[u]=!f||typeof f!="object"||Y.has(f.constructor)?f:i(f));return g})(t[r])}),e}function ln(e,t){return e.all||t.all||Object.keys(e).some(function(r){return t[r]&&Yn(t[r],e[r])})}j(Le.prototype,((qe={add:function(e){return Ht(this,e),this},addKey:function(e){return Vt(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(r){return Vt(t,r,r)}),this},hasKey:function(e){var t=_a(this).next(e).value;return t&&fe(t.from,e)<=0&&0<=fe(t.to,e)}})[ke]=function(){return _a(this)},qe));var bt={},cn={},dn=!1;function Ca(e){wa(cn,e),dn||(dn=!0,setTimeout(function(){dn=!1,un(cn,!(cn={}))},0))}function un(e,t){t===void 0&&(t=!1);var r=new Set;if(e.all)for(var i=0,l=Object.values(bt);i<l.length;i++)er(g=l[i],e,r,t);else for(var u in e){var f,g,u=/^idb\:\/\/(.*)\/(.*)\//.exec(u);u&&(f=u[1],u=u[2],g=bt["idb://".concat(f,"/").concat(u)])&&er(g,e,r,t)}r.forEach(function(_){return _()})}function er(e,t,r,i){for(var l=[],u=0,f=Object.entries(e.queries.query);u<f.length;u++){for(var g=f[u],_=g[0],T=[],P=0,y=g[1];P<y.length;P++){var w=y[P];ln(t,w.obsSet)?w.subscribers.forEach(function(E){return r.add(E)}):i&&T.push(w)}i&&l.push([_,T])}if(i)for(var k=0,A=l;k<A.length;k++){var S=A[k],_=S[0],T=S[1];e.queries.query[_]=T}}function Ui(e){var t=e._state,r=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?Ce(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var i=t.openCanceller,l=Math.round(10*e.verno),u=!1;function f(){if(t.openCanceller!==i)throw new ie.DatabaseClosed("db.open() was cancelled")}function g(){return new W(function(w,k){if(f(),!r)throw new ie.MissingAPI;var A=e.name,S=t.autoSchema||!l?r.open(A):r.open(A,l);if(!S)throw new ie.MissingAPI;S.onerror=Ge(k),S.onblocked=_e(e._fireOnBlocked),S.onupgradeneeded=_e(function(E){var I;P=S.transaction,t.autoSchema&&!e._options.allowEmptyDB?(S.onerror=zt,P.abort(),S.result.close(),(I=r.deleteDatabase(A)).onsuccess=I.onerror=_e(function(){k(new ie.NoSuchDatabase("Database ".concat(A," doesnt exist")))})):(P.onerror=Ge(k),I=E.oldVersion>Math.pow(2,62)?0:E.oldVersion,y=I<1,e.idbdb=S.result,u&&Vi(e,P),Gi(e,I/10,P,k))},k),S.onsuccess=_e(function(){P=null;var E,I,D,O,N,F,U=e.idbdb=S.result,V=K(U.objectStoreNames);if(0<V.length)try{var X=U.transaction((N=V).length===1?N[0]:N,"readonly");if(t.autoSchema)F=U,O=X,(D=e).verno=F.version/10,O=D._dbSchema=ya(0,F,O),D._storeNames=K(F.objectStoreNames,0),ha(D,[D._allTables],d(O),O);else if(xa(e,e._dbSchema,X),I=X,((I=tn(ya(0,(E=e).idbdb,I),E._dbSchema)).add.length||I.change.some(function(H){return H.add.length||H.change.length}))&&!u)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),U.close(),l=U.version+1,u=!0,w(g());ba(e,X)}catch{}Gt.add(e),U.onversionchange=_e(function(H){t.vcFired=!0,e.on("versionchange").fire(H)}),U.onclose=_e(function(){e.close({disableAutoOpen:!1})}),y&&(V=e._deps,N=A,rn(F=V.indexedDB)||N===ca||nn(F,V.IDBKeyRange).put({name:N}).catch(he)),w()},k)}).catch(function(w){switch(w==null?void 0:w.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),g();break;case"VersionError":if(0<l)return l=0,g()}return W.reject(w)})}var _,T=t.dbReadyResolve,P=null,y=!1;return W.race([i,(typeof navigator>"u"?W.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(w){function k(){return indexedDB.databases().finally(w)}_=setInterval(k,100),k()}).finally(function(){return clearInterval(_)}):Promise.resolve()).then(g)]).then(function(){return f(),t.onReadyBeingFired=[],W.resolve(on(function(){return e.on.ready.fire(e.vip)})).then(function w(){var k;if(0<t.onReadyBeingFired.length)return k=t.onReadyBeingFired.reduce(Ra,he),t.onReadyBeingFired=[],W.resolve(on(function(){return k(e.vip)})).then(w)})}).finally(function(){t.openCanceller===i&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(w){t.dbOpenError=w;try{P&&P.abort()}catch{}return i===t.openCanceller&&e._close(),Ce(w)}).finally(function(){t.openComplete=!0,T()}).then(function(){var w;return y&&(w={},e.tables.forEach(function(k){k.schema.indexes.forEach(function(A){A.name&&(w["idb://".concat(e.name,"/").concat(k.name,"/").concat(A.name)]=new Le(-1/0,[[[]]]))}),w["idb://".concat(e.name,"/").concat(k.name,"/")]=w["idb://".concat(e.name,"/").concat(k.name,"/:dels")]=new Le(-1/0,[[[]]])}),it(ga).fire(w),un(w,!0)),e})}function pn(e){function t(u){return e.next(u)}var r=l(t),i=l(function(u){return e.throw(u)});function l(u){return function(g){var g=u(g),_=g.value;return g.done?_:_&&typeof _.then=="function"?_.then(r,i):m(_)?Promise.all(_).then(r,i):r(_)}}return l(t)()}function Pa(e,t,r){for(var i=m(e)?e.slice():[e],l=0;l<r;++l)i.push(t);return i}var Wi={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return o(o({},e),{table:function(i){var r=e.table(i),i=r.schema,l=Object.create(null),u=[];function f(w,k,A){var D=Kt(w),S=l[D]=l[D]||[],E=w==null?0:typeof w=="string"?1:w.length,I=0<k,D=o(o({},A),{name:I?"".concat(D,"(virtual-from:").concat(A.name,")"):A.name,lowLevelIndex:A,isVirtual:I,keyTail:k,keyLength:E,extractKey:Xa(w),unique:!I&&A.unique});return S.push(D),D.isPrimaryKey||u.push(D),1<E&&f(E===2?w[0]:w.slice(0,E-1),k+1,A),S.sort(function(O,N){return O.keyTail-N.keyTail}),D}var g=f(i.primaryKey.keyPath,0,i.primaryKey);l[":id"]=[g];for(var _=0,T=i.indexes;_<T.length;_++){var P=T[_];f(P.keyPath,0,P)}function y(w){var k,A=w.query.index;return A.isVirtual?o(o({},w),{query:{index:A.lowLevelIndex,range:(k=w.query.range,A=A.keyTail,{type:k.type===1?2:k.type,lower:Pa(k.lower,k.lowerOpen?e.MAX_KEY:e.MIN_KEY,A),lowerOpen:!0,upper:Pa(k.upper,k.upperOpen?e.MIN_KEY:e.MAX_KEY,A),upperOpen:!0})}}):w}return o(o({},r),{schema:o(o({},i),{primaryKey:g,indexes:u,getIndexByKeyPath:function(w){return(w=l[Kt(w)])&&w[0]}}),count:function(w){return r.count(y(w))},query:function(w){return r.query(y(w))},openCursor:function(w){var k=w.query.index,A=k.keyTail,S=k.keyLength;return k.isVirtual?r.openCursor(y(w)).then(function(I){return I&&E(I)}):r.openCursor(w);function E(I){return Object.create(I,{continue:{value:function(D){D!=null?I.continue(Pa(D,w.reverse?e.MAX_KEY:e.MIN_KEY,A)):w.unique?I.continue(I.key.slice(0,S).concat(w.reverse?e.MIN_KEY:e.MAX_KEY,A)):I.continue()}},continuePrimaryKey:{value:function(D,O){I.continuePrimaryKey(Pa(D,e.MAX_KEY,A),O)}},primaryKey:{get:function(){return I.primaryKey}},key:{get:function(){var D=I.key;return S===1?D[0]:D.slice(0,S)}},value:{get:function(){return I.value}}})}}})}})}};function mn(e,t,r,i){return r=r||{},i=i||"",d(e).forEach(function(l){var u,f,g;x(t,l)?(u=e[l],f=t[l],typeof u=="object"&&typeof f=="object"&&u&&f?(g=Ie(u))!==Ie(f)?r[i+l]=t[l]:g==="Object"?mn(u,f,r,i+l+"."):u!==f&&(r[i+l]=t[l]):u!==f&&(r[i+l]=t[l])):r[i+l]=void 0}),d(t).forEach(function(l){x(e,l)||(r[i+l]=t[l])}),r}function fn(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var Qi={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return o(o({},e),{table:function(t){var r=e.table(t),i=r.schema.primaryKey;return o(o({},r),{mutate:function(l){var u=ae.trans,f=u.table(t).hook,g=f.deleting,_=f.creating,T=f.updating;switch(l.type){case"add":if(_.fire===he)break;return u._promise("readwrite",function(){return P(l)},!0);case"put":if(_.fire===he&&T.fire===he)break;return u._promise("readwrite",function(){return P(l)},!0);case"delete":if(g.fire===he)break;return u._promise("readwrite",function(){return P(l)},!0);case"deleteRange":if(g.fire===he)break;return u._promise("readwrite",function(){return(function y(w,k,A){return r.query({trans:w,values:!1,query:{index:i,range:k},limit:A}).then(function(S){var E=S.result;return P({type:"delete",keys:E,trans:w}).then(function(I){return 0<I.numFailures?Promise.reject(I.failures[0]):E.length<A?{failures:[],numFailures:0,lastResult:void 0}:y(w,o(o({},k),{lower:E[E.length-1],lowerOpen:!0}),A)})})})(l.trans,l.range,1e4)},!0)}return r.mutate(l);function P(y){var w,k,A,S=ae.trans,E=y.keys||fn(i,y);if(E)return(y=y.type==="add"||y.type==="put"?o(o({},y),{keys:E}):o({},y)).type!=="delete"&&(y.values=s([],y.values)),y.keys&&(y.keys=s([],y.keys)),w=r,A=E,((k=y).type==="add"?Promise.resolve([]):w.getMany({trans:k.trans,keys:A,cache:"immutable"})).then(function(I){var D=E.map(function(O,N){var F,U,V,X=I[N],H={onerror:null,onsuccess:null};return y.type==="delete"?g.fire.call(H,O,X,S):y.type==="add"||X===void 0?(F=_.fire.call(H,O,y.values[N],S),O==null&&F!=null&&(y.keys[N]=O=F,i.outbound||oe(y.values[N],i.keyPath,O))):(F=mn(X,y.values[N]),(U=T.fire.call(H,F,O,X,S))&&(V=y.values[N],Object.keys(U).forEach(function(ee){x(V,ee)?V[ee]=U[ee]:oe(V,ee,U[ee])}))),H});return r.mutate(y).then(function(O){for(var N=O.failures,F=O.results,U=O.numFailures,O=O.lastResult,V=0;V<E.length;++V){var X=(F||E)[V],H=D[V];X==null?H.onerror&&H.onerror(N[V]):H.onsuccess&&H.onsuccess(y.type==="put"&&I[V]?y.values[V]:X)}return{failures:N,results:F,numFailures:U,lastResult:O}}).catch(function(O){return D.forEach(function(N){return N.onerror&&N.onerror(O)}),Promise.reject(O)})});throw new Error("Keys missing")}}})}})}};function tr(e,t,r){try{if(!t||t.keys.length<e.length)return null;for(var i=[],l=0,u=0;l<t.keys.length&&u<e.length;++l)fe(t.keys[l],e[u])===0&&(i.push(r?ne(t.values[l]):t.values[l]),++u);return i.length===e.length?i:null}catch{return null}}var Ji={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var r=e.table(t);return o(o({},r),{getMany:function(i){var l;return i.cache?(l=tr(i.keys,i.trans._cache,i.cache==="clone"))?W.resolve(l):r.getMany(i).then(function(u){return i.trans._cache={keys:i.keys,values:i.cache==="clone"?ne(u):u},u}):r.getMany(i)},mutate:function(i){return i.type!=="add"&&(i.trans._cache=null),r.mutate(i)}})}}}};function ar(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function nr(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var Yi={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,r=new Le(e.MIN_KEY,e.MAX_KEY);return o(o({},e),{transaction:function(i,l,u){if(ae.subscr&&l!=="readonly")throw new ie.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(ae.querier));return e.transaction(i,l,u)},table:function(i){function l(E){var S,E=E.query;return[S=E.index,new Le((S=(E=E.range).lower)!=null?S:e.MIN_KEY,(S=E.upper)!=null?S:e.MAX_KEY)]}var u=e.table(i),f=u.schema,g=f.primaryKey,_=f.indexes,T=g.extractKey,P=g.outbound,y=g.autoIncrement&&_.filter(function(A){return A.compound&&A.keyPath.includes(g.keyPath)}),w=o(o({},u),{mutate:function(A){function S(z){return z="idb://".concat(t,"/").concat(i,"/").concat(z),N[z]||(N[z]=new Le)}var E,I,D,O=A.trans,N=A.mutatedParts||(A.mutatedParts={}),F=S(""),U=S(":dels"),V=A.type,H=A.type==="deleteRange"?[A.range]:A.type==="delete"?[A.keys]:A.values.length<50?[fn(g,A).filter(function(z){return z}),A.values]:[],X=H[0],H=H[1],ee=A.trans._cache;return m(X)?(F.addKeys(X),(V=V==="delete"||X.length===H.length?tr(X,ee):null)||U.addKeys(X),(V||H)&&(E=S,I=V,D=H,f.indexes.forEach(function(z){var le=E(z.name||"");function ce(me){return me!=null?z.extractKey(me):null}function ue(me){z.multiEntry&&m(me)?me.forEach(function(ze){return le.addKey(ze)}):le.addKey(me)}(I||D).forEach(function(me,Oe){var de=I&&ce(I[Oe]),Oe=D&&ce(D[Oe]);fe(de,Oe)!==0&&(de!=null&&ue(de),Oe!=null)&&ue(Oe)})}))):X?(H={from:(ee=X.lower)!=null?ee:e.MIN_KEY,to:(V=X.upper)!=null?V:e.MAX_KEY},U.add(H),F.add(H)):(F.add(r),U.add(r),f.indexes.forEach(function(z){return S(z.name).add(r)})),u.mutate(A).then(function(z){return!X||A.type!=="add"&&A.type!=="put"||(F.addKeys(z.results),y&&y.forEach(function(le){for(var ce=A.values.map(function(de){return le.extractKey(de)}),ue=le.keyPath.findIndex(function(de){return de===g.keyPath}),me=0,ze=z.results.length;me<ze;++me)ce[me][ue]=z.results[me];S(le.name).addKeys(ce)})),O.mutatedParts=wa(O.mutatedParts||{},N),z})}}),k={get:function(A){return[g,new Le(A.key)]},getMany:function(A){return[g,new Le().addKeys(A.keys)]},count:l,query:l,openCursor:l};return d(k).forEach(function(A){w[A]=function(S){var E=ae.subscr,I=!!E,D=ar(ae,u)&&nr(A,S)?S.obsSet={}:E;if(I){var O,E=function(H){return H="idb://".concat(t,"/").concat(i,"/").concat(H),D[H]||(D[H]=new Le)},N=E(""),F=E(":dels"),I=k[A](S),U=I[0],I=I[1];if((A==="query"&&U.isPrimaryKey&&!S.values?F:E(U.name||"")).add(I),!U.isPrimaryKey){if(A!=="count")return O=A==="query"&&P&&S.values&&u.query(o(o({},S),{values:!1})),u[A].apply(this,arguments).then(function(H){if(A==="query"){if(P&&S.values)return O.then(function(ce){return ce=ce.result,N.addKeys(ce),H});var ee=S.values?H.result.map(T):H.result;(S.values?N:F).addKeys(ee)}else{var z,le;if(A==="openCursor")return le=S.values,(z=H)&&Object.create(z,{key:{get:function(){return F.addKey(z.primaryKey),z.key}},primaryKey:{get:function(){var ce=z.primaryKey;return F.addKey(ce),ce}},value:{get:function(){return le&&N.addKey(z.primaryKey),z.value}}})}return H});F.add(r)}}return u[A].apply(this,arguments)}}),w}})}};function rr(e,t,r){var i;return r.numFailures===0?t:t.type==="deleteRange"||(i=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,r.numFailures===i)?null:(i=o({},t),m(i.keys)&&(i.keys=i.keys.filter(function(l,u){return!(u in r.failures)})),"values"in i&&m(i.values)&&(i.values=i.values.filter(function(l,u){return!(u in r.failures)})),i)}function gn(e,t){return r=e,((i=t).lower===void 0||(i.lowerOpen?0<fe(r,i.lower):0<=fe(r,i.lower)))&&(r=e,(i=t).upper===void 0||(i.upperOpen?fe(r,i.upper)<0:fe(r,i.upper)<=0));var r,i}function ir(e,t,r,i,l,u){var f,g,_,T,P,y,w;return!r||r.length===0||(f=t.query.index,g=f.multiEntry,_=t.query.range,T=i.schema.primaryKey.extractKey,P=f.extractKey,y=(f.lowLevelIndex||f).extractKey,(i=r.reduce(function(k,A){var S=k,E=[];if(A.type==="add"||A.type==="put")for(var I=new Le,D=A.values.length-1;0<=D;--D){var O,N=A.values[D],F=T(N);!I.hasKey(F)&&(O=P(N),g&&m(O)?O.some(function(ee){return gn(ee,_)}):gn(O,_))&&(I.addKey(F),E.push(N))}switch(A.type){case"add":var U=new Le().addKeys(t.values?k.map(function(z){return T(z)}):k),S=k.concat(t.values?E.filter(function(z){return z=T(z),!U.hasKey(z)&&(U.addKey(z),!0)}):E.map(function(z){return T(z)}).filter(function(z){return!U.hasKey(z)&&(U.addKey(z),!0)}));break;case"put":var V=new Le().addKeys(A.values.map(function(z){return T(z)}));S=k.filter(function(z){return!V.hasKey(t.values?T(z):z)}).concat(t.values?E:E.map(function(z){return T(z)}));break;case"delete":var X=new Le().addKeys(A.keys);S=k.filter(function(z){return!X.hasKey(t.values?T(z):z)});break;case"deleteRange":var H=A.range;S=k.filter(function(z){return!gn(T(z),H)})}return S},e))===e)?e:(w=function(k,A){return fe(y(k),y(A))||fe(T(k),T(A))},i.sort(t.direction==="prev"||t.direction==="prevunique"?function(k,A){return w(A,k)}:w),t.limit&&t.limit<1/0&&(i.length>t.limit?i.length=t.limit:e.length===t.limit&&i.length<t.limit&&(l.dirty=!0)),u?Object.freeze(i):i)}function or(e,t){return fe(e.lower,t.lower)===0&&fe(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function Zi(e,t){return((r,i,l,u)=>{if(r===void 0)return i!==void 0?-1:0;if(i===void 0)return 1;if((r=fe(r,i))===0){if(l&&u)return 0;if(l)return 1;if(u)return-1}return r})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((r,i,l,u)=>{if(r===void 0)return i!==void 0?1:0;if(i===void 0)return-1;if((r=fe(r,i))===0){if(l&&u)return 0;if(l)return-1;if(u)return 1}return r})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function Xi(e,t,r,i){e.subscribers.add(r),i.addEventListener("abort",function(){var l,u;e.subscribers.delete(r),e.subscribers.size===0&&(l=e,u=t,setTimeout(function(){l.subscribers.size===0&&Be(u,l)},3e3))})}var eo={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return o(o({},e),{transaction:function(r,i,l){var u,f,g=e.transaction(r,i,l);return i==="readwrite"&&(l=(u=new AbortController).signal,g.addEventListener("abort",(f=function(_){return function(){if(u.abort(),i==="readwrite"){for(var T=new Set,P=0,y=r;P<y.length;P++){var w=y[P],k=bt["idb://".concat(t,"/").concat(w)];if(k){var A=e.table(w),S=k.optimisticOps.filter(function(z){return z.trans===g});if(g._explicit&&_&&g.mutatedParts)for(var E=0,I=Object.values(k.queries.query);E<I.length;E++)for(var D=0,O=(U=I[E]).slice();D<O.length;D++)ln((V=O[D]).obsSet,g.mutatedParts)&&(Be(U,V),V.subscribers.forEach(function(z){return T.add(z)}));else if(0<S.length){k.optimisticOps=k.optimisticOps.filter(function(z){return z.trans!==g});for(var N=0,F=Object.values(k.queries.query);N<F.length;N++)for(var U,V,X,H=0,ee=(U=F[N]).slice();H<ee.length;H++)(V=ee[H]).res!=null&&g.mutatedParts&&(_&&!V.dirty?(X=Object.isFrozen(V.res),X=ir(V.res,V.req,S,A,V,X),V.dirty?(Be(U,V),V.subscribers.forEach(function(z){return T.add(z)})):X!==V.res&&(V.res=X,V.promise=W.resolve({result:X}))):(V.dirty&&Be(U,V),V.subscribers.forEach(function(z){return T.add(z)})))}}}T.forEach(function(z){return z()})}}})(!1),{signal:l}),g.addEventListener("error",f(!1),{signal:l}),g.addEventListener("complete",f(!0),{signal:l})),g},table:function(r){var i=e.table(r),l=i.schema.primaryKey;return o(o({},i),{mutate:function(u){var f,g=ae.trans;return!l.outbound&&g.db._options.cache!=="disabled"&&!g.explicit&&g.idbtrans.mode==="readwrite"&&(f=bt["idb://".concat(t,"/").concat(r)])?(g=i.mutate(u),u.type!=="add"&&u.type!=="put"||!(50<=u.values.length||fn(l,u).some(function(_){return _==null}))?(f.optimisticOps.push(u),u.mutatedParts&&Ca(u.mutatedParts),g.then(function(_){0<_.numFailures&&(Be(f.optimisticOps,u),(_=rr(0,u,_))&&f.optimisticOps.push(_),u.mutatedParts)&&Ca(u.mutatedParts)}),g.catch(function(){Be(f.optimisticOps,u),u.mutatedParts&&Ca(u.mutatedParts)})):g.then(function(_){var T=rr(0,o(o({},u),{values:u.values.map(function(P,y){var w;return _.failures[y]?P:(oe(w=(w=l.keyPath)!=null&&w.includes(".")?ne(P):o({},P),l.keyPath,_.results[y]),w)})}),_);f.optimisticOps.push(T),queueMicrotask(function(){return u.mutatedParts&&Ca(u.mutatedParts)})}),g):i.mutate(u)},query:function(u){var f,g,_,T,P,y,w;return ar(ae,i)&&nr("query",u)?(f=((_=ae.trans)==null?void 0:_.db._options.cache)==="immutable",g=(_=ae).requery,_=_.signal,y=((k,A,S,E)=>{var I=bt["idb://".concat(k,"/").concat(A)];if(!I)return[];if(!(k=I.queries[S]))return[null,!1,I,null];var D=k[(E.query?E.query.index.name:null)||""];if(!D)return[null,!1,I,null];switch(S){case"query":var O=(N=E.direction)!=null?N:"next",N=D.find(function(F){var U;return F.req.limit===E.limit&&F.req.values===E.values&&((U=F.req.direction)!=null?U:"next")===O&&or(F.req.query.range,E.query.range)});return N?[N,!0,I,D]:[D.find(function(F){var U;return("limit"in F.req?F.req.limit:1/0)>=E.limit&&((U=F.req.direction)!=null?U:"next")===O&&(!E.values||F.req.values)&&Zi(F.req.query.range,E.query.range)}),!1,I,D];case"count":return N=D.find(function(F){return or(F.req.query.range,E.query.range)}),[N,!!N,I,D]}})(t,r,"query",u),w=y[0],T=y[2],P=y[3],w&&y[1]?w.obsSet=u.obsSet:(y=i.query(u).then(function(k){var A=k.result;if(w&&(w.res=A),f){for(var S=0,E=A.length;S<E;++S)Object.freeze(A[S]);Object.freeze(A)}return k}).catch(function(k){return P&&w&&Be(P,w),Promise.reject(k)}),w={obsSet:u.obsSet,promise:y,subscribers:new Set,type:"query",req:u,dirty:!1},P?P.push(w):(P=[w],(T=T||(bt["idb://".concat(t,"/").concat(r)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[u.query.index.name||""]=P)),Xi(w,P,g,_),w.promise.then(function(k){return k=ir(k.result,u,T==null?void 0:T.optimisticOps,i,w,f),{result:f?k:ne(k)}})):i.query(u)}})}})}};function Sa(e,t){return new Proxy(e,{get:function(r,i,l){return i==="db"?t:Reflect.get(r,i,l)}})}Pe.prototype.version=function(e){if(isNaN(e)||e<.1)throw new ie.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new ie.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,r=t.filter(function(i){return i._cfg.version===e})[0];return r||(r=new this.Version(e),t.push(r),t.sort(Ki),r.stores({}),this._state.autoSchema=!1),r},Pe.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||ae.letThrough||this._vip)?e():new W(function(r,i){if(t._state.openComplete)return i(new ie.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void i(new ie.DatabaseClosed);t.open().catch(he)}t._state.dbReadyPromise.then(r,i)}).then(e)},Pe.prototype.use=function(l){var t=l.stack,r=l.create,i=l.level,l=l.name,u=(l&&this.unuse({stack:t,name:l}),this._middlewares[t]||(this._middlewares[t]=[]));return u.push({stack:t,create:r,level:i??10,name:l}),u.sort(function(f,g){return f.level-g.level}),this},Pe.prototype.unuse=function(e){var t=e.stack,r=e.name,i=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(l){return i?l.create!==i:!!r&&l.name!==r})),this},Pe.prototype.open=function(){var e=this;return mt(Je,function(){return Ui(e)})},Pe.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state;if(Gt.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new W(function(t){e.dbReadyResolve=t}),e.openCanceller=new W(function(t,r){e.cancelOpen=r}))},Pe.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,r=this._state;t?(r.isBeingOpened&&r.cancelOpen(new ie.DatabaseClosed),this._close(),r.autoOpen=!1,r.dbOpenError=new ie.DatabaseClosed):(this._close(),r.autoOpen=this._options.autoOpen||r.isBeingOpened,r.openComplete=!1,r.dbOpenError=null)},Pe.prototype.delete=function(e){var t=this,r=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),i=this._state;return new W(function(l,u){function f(){t.close(e);var g=t._deps.indexedDB.deleteDatabase(t.name);g.onsuccess=_e(function(){var _,T,P;_=t._deps,T=t.name,rn(P=_.indexedDB)||T===ca||nn(P,_.IDBKeyRange).delete(T).catch(he),l()}),g.onerror=Ge(u),g.onblocked=t._fireOnBlocked}if(r)throw new ie.InvalidArgument("Invalid closeOptions argument to db.delete()");i.isBeingOpened?i.dbReadyPromise.then(f):f()})},Pe.prototype.backendDB=function(){return this.idbdb},Pe.prototype.isOpen=function(){return this.idbdb!==null},Pe.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},Pe.prototype.hasFailed=function(){return this._state.dbOpenError!==null},Pe.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(Pe.prototype,"tables",{get:function(){var e=this;return d(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),Pe.prototype.transaction=function(){var e=(function(t,r,i){var l=arguments.length;if(l<2)throw new ie.InvalidArgument("Too few arguments");for(var u=new Array(l-1);--l;)u[l-1]=arguments[l];return i=u.pop(),[t,M(u),i]}).apply(this,arguments);return this._transaction.apply(this,e)},Pe.prototype._transaction=function(e,t,r){var i,l,u=this,f=ae.trans,g=(f&&f.db===this&&e.indexOf("!")===-1||(f=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(l=t.map(function(T){if(T=T instanceof u.Table?T.name:T,typeof T!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return T}),e=="r"||e===Ha)i=Ha;else{if(e!="rw"&&e!=Ua)throw new ie.InvalidArgument("Invalid transaction mode: "+e);i=Ua}if(f){if(f.mode===Ha&&i===Ua){if(!g)throw new ie.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");f=null}f&&l.forEach(function(T){if(f&&f.storeNames.indexOf(T)===-1){if(!g)throw new ie.SubTransaction("Table "+T+" not included in parent transaction.");f=null}}),g&&f&&!f.active&&(f=null)}}catch(T){return f?f._promise(null,function(P,y){y(T)}):Ce(T)}var _=(function T(P,y,w,k,A){return W.resolve().then(function(){var D=ae.transless||ae,S=P._createTransaction(y,w,P._dbSchema,k),D=(S.explicit=!0,{trans:S,transless:D});if(k)S.idbtrans=k.idbtrans;else try{S.create(),S.idbtrans._explicit=!0,P._state.PR1398_maxLoop=3}catch(O){return O.name===Ma.InvalidState&&P.isOpen()&&0<--P._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),P.close({disableAutoOpen:!1}),P.open().then(function(){return T(P,y,w,null,A)})):Ce(O)}var E,I=Te(A),D=(I&&Pt(),W.follow(function(){var O;(E=A.call(S,S))&&(I?(O=at.bind(null,null),E.then(O,O)):typeof E.next=="function"&&typeof E.throw=="function"&&(E=pn(E)))},D));return(E&&typeof E.then=="function"?W.resolve(E).then(function(O){return S.active?O:Ce(new ie.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):D.then(function(){return E})).then(function(O){return k&&S._resolve(),S._completion.then(function(){return O})}).catch(function(O){return S._reject(O),Ce(O)})})}).bind(null,this,i,l,f,r);return f?f._promise(i,_,"lock"):ae.trans?mt(ae.transless,function(){return u._whenReady(_)}):this._whenReady(_)},Pe.prototype.table=function(e){if(x(this._allTables,e))return this._allTables[e];throw new ie.InvalidTable("Table ".concat(e," does not exist"))};var Ze=Pe;function Pe(e,t){var r,i,l,u,f,g=this,_=(this._middlewares={},this.verno=0,Pe.dependencies),_=(this._options=t=o({addons:Pe.addons,autoOpen:!0,indexedDB:_.indexedDB,IDBKeyRange:_.IDBKeyRange,cache:"cloned",maxConnections:1e3},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),T=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:he,dbReadyPromise:null,cancelOpen:he,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),P=(T.dbReadyPromise=new W(function(y){T.dbReadyResolve=y}),T.openCanceller=new W(function(y,w){T.cancelOpen=w}),this._state=T,this.name=e,this.on=qt(this,"populate","blocked","versionchange","close",{ready:[Ra,he]}),this.once=function(y,w){var k=function(){for(var A=[],S=0;S<arguments.length;S++)A[S]=arguments[S];g.on(y).unsubscribe(k),w.apply(g,A)};return g.on(y,k)},this.on.ready.subscribe=re(this.on.ready.subscribe,function(y){return function(w,k){Pe.vip(function(){var A,S=g._state;S.openComplete?(S.dbOpenError||W.resolve().then(w),k&&y(w)):S.onReadyBeingFired?(S.onReadyBeingFired.push(w),k&&y(w)):(y(w),A=g,k||y(function E(){A.on.ready.unsubscribe(w),A.on.ready.unsubscribe(E)}))})}}),this.Collection=(r=this,Nt(Mi.prototype,function(E,S){this.db=r;var k=On,A=null;if(S)try{k=S()}catch(D){A=D}var S=E._ctx,E=S.table,I=E.hook.reading.fire;this._ctx={table:E,index:S.index,isPrimKey:!S.index||E.schema.primKey.keyPath&&S.index===E.schema.primKey.name,range:k,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:A,or:S.or,valueMapper:I!==jt?I:null}})),this.Table=(i=this,Nt(zn.prototype,function(y,w,k){this.db=i,this._tx=k,this.name=y,this.schema=w,this.hook=i._allTables[y]?i._allTables[y].hook:qt(null,{creating:[Ei,he],reading:[Ai,jt],updating:[Ti,he],deleting:[ki,he]})})),this.Transaction=(l=this,Nt(qi.prototype,function(y,w,k,A,S){var E=this;y!=="readonly"&&w.forEach(function(I){I=(I=k[I])==null?void 0:I.yProps,I&&(w=w.concat(I.map(function(D){return D.updatesTable})))}),this.db=l,this.mode=y,this.storeNames=w,this.schema=k,this.chromeTransactionDurability=A,this.idbtrans=null,this.on=qt(this,"complete","error","abort"),this.parent=S||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new W(function(I,D){E._resolve=I,E._reject=D}),this._completion.then(function(){E.active=!1,E.on.complete.fire()},function(I){var D=E.active;return E.active=!1,E.on.error.fire(I),E.parent?E.parent._reject(I):D&&E.idbtrans&&E.idbtrans.abort(),Ce(I)})})),this.Version=(u=this,Nt(Hi.prototype,function(y){this.db=u,this._cfg={version:y,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(f=this,Nt(Hn.prototype,function(y,w,k){if(this.db=f,this._ctx={table:y,index:w===":id"?null:w,or:k},this._cmp=this._ascending=fe,this._descending=function(A,S){return fe(S,A)},this._max=function(A,S){return 0<fe(A,S)?A:S},this._min=function(A,S){return fe(A,S)<0?A:S},this._IDBKeyRange=f._deps.IDBKeyRange,!this._IDBKeyRange)throw new ie.MissingAPI})),this.on("versionchange",function(y){0<y.newVersion?console.warn("Another connection wants to upgrade database '".concat(g.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(g.name,"'. Closing db now to resume the delete request.")),g.close({disableAutoOpen:!1})}),this.on("blocked",function(y){!y.newVersion||y.newVersion<y.oldVersion?console.warn("Dexie.delete('".concat(g.name,"') was blocked")):console.warn("Upgrade '".concat(g.name,"' blocked by other connection holding version ").concat(y.oldVersion/10))}),this._maxKey=Ft(t.IDBKeyRange),this._createTransaction=function(y,w,k,A){return new g.Transaction(y,w,k,g._options.chromeTransactionDurability,A)},this._fireOnBlocked=function(y){g.on("blocked").fire(y),Gt.toArray().filter(function(w){return w.name===g.name&&w!==g&&!w._state.vcFired}).map(function(w){return w.on("versionchange").fire(y)})},this.use(Ji),this.use(eo),this.use(Yi),this.use(Wi),this.use(Qi),new Proxy(this,{get:function(y,w,k){var A;return w==="_vip"||(w==="table"?function(S){return Sa(g.table(S),P)}:(A=Reflect.get(y,w,k))instanceof zn?Sa(A,P):w==="tables"?A.map(function(S){return Sa(S,P)}):w==="_createTransaction"?function(){return Sa(A.apply(this,arguments),P)}:A)}}));this.vip=P,_.forEach(function(y){return y(g)})}var Aa,kt=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",to=(bn.prototype.subscribe=function(e,t,r){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:r})},bn.prototype[kt]=function(){return this},bn);function bn(e){this._subscribe=e}try{Aa={indexedDB:c.indexedDB||c.mozIndexedDB||c.webkitIndexedDB||c.msIndexedDB,IDBKeyRange:c.IDBKeyRange||c.webkitIDBKeyRange}}catch{Aa={indexedDB:null,IDBKeyRange:null}}function sr(e){var t,r=!1,i=new to(function(l){var u=Te(e),f,g=!1,_={},T={},P={get closed(){return g},unsubscribe:function(){g||(g=!0,f&&f.abort(),y&&it.storagemutated.unsubscribe(A))}},y=(l.start&&l.start(P),!1),w=function(){return Va(S)};function k(){return ln(T,_)}var A=function(E){wa(_,E),k()&&w()},S=function(){var E,I,D;!g&&Aa.indexedDB&&(_={},E={},f&&f.abort(),f=new AbortController,D=(O=>{var N=wt();try{u&&Pt();var F=tt(e,O);return F=u?F.finally(at):F}finally{N&&Ct()}})(I={subscr:E,signal:f.signal,requery:w,querier:e,trans:null}),y||(it.storagemutated.subscribe(A),y=!0),Promise.resolve(D).then(function(O){r=!0,t=O,g||I.signal.aborted||(k()||(T=E,k())?w():(_={},Va(function(){return!g&&l.next&&l.next(O)})))},function(O){r=!1,["DatabaseClosedError","AbortError"].includes(O==null?void 0:O.name)||g||Va(function(){g||l.error&&l.error(O)})}))};return setTimeout(w,0),P});return i.hasValue=function(){return r},i.getValue=function(){return t},i}var ht=Ze;function hn(e){var t=ot;try{ot=!0,it.storagemutated.fire(e),un(e,!0)}finally{ot=t}}j(ht,o(o({},De),{delete:function(e){return new ht(e,{addons:[]}).delete()},exists:function(e){return new ht(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=ht.dependencies,r=t.indexedDB,t=t.IDBKeyRange,(rn(r)?Promise.resolve(r.databases()).then(function(i){return i.map(function(l){return l.name}).filter(function(l){return l!==ca})}):nn(r,t).toCollection().primaryKeys()).then(e)}catch{return Ce(new ie.MissingAPI)}var t,r},defineClass:function(){return function(e){b(this,e)}},ignoreTransaction:function(e){return ae.trans?mt(ae.transless||Je,e):e()},vip:on,async:function(e){return function(){try{var t=pn(e.apply(this,arguments));return t&&typeof t.then=="function"?t:W.resolve(t)}catch(r){return Ce(r)}}},spawn:function(e,t,r){try{var i=pn(e.apply(r,t||[]));return i&&typeof i.then=="function"?i:W.resolve(i)}catch(l){return Ce(l)}},currentTransaction:{get:function(){return ae.trans||null}},waitFor:function(e,t){return e=W.resolve(typeof e=="function"?ht.ignoreTransaction(e):e).timeout(t||6e4),ae.trans?ae.trans.waitFor(e):e},Promise:W,debug:{get:function(){return Ve},set:function(e){kn(e)}},derive:Q,extend:b,props:j,override:re,Events:qt,on:it,liveQuery:sr,extendObservabilitySet:wa,getByKeyPath:J,setByKeyPath:oe,delByKeyPath:function(e,t){typeof t=="string"?oe(e,t,void 0):"length"in t&&[].map.call(t,function(r){oe(e,r,void 0)})},shallowClone:ge,deepClone:ne,getObjectDiff:mn,cmp:fe,asap:Z,minKey:-1/0,addons:[],connections:{get:Gt.toArray},errnames:Ma,dependencies:Aa,cache:bt,semVer:"4.4.6",version:"4.4.6".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,r){return e+t/Math.pow(10,2*r)})})),ht.maxKey=Ft(ht.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(it(ga,function(e){ot||(e=new CustomEvent(Ja,{detail:e}),ot=!0,dispatchEvent(e),ot=!1)}),addEventListener(Ja,function(e){e=e.detail,ot||hn(e)}));var Tt,ot=!1,lr=function(){};return typeof BroadcastChannel<"u"&&((lr=function(){(Tt=new BroadcastChannel(Ja)).onmessage=function(e){return e.data&&hn(e.data)}})(),typeof Tt.unref=="function"&&Tt.unref(),it(ga,function(e){ot||Tt.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!Ze.disableBfCache&&e.persisted){Ve&&console.debug("Dexie: handling persisted pagehide"),Tt!=null&&Tt.close();for(var t=0,r=Gt.toArray();t<r.length;t++)r[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!Ze.disableBfCache&&e.persisted&&(Ve&&console.debug("Dexie: handling persisted pageshow"),lr(),hn({all:new Le(-1/0,[[]])}))})),W.rejectionMapper=function(e,t){return!e||e instanceof Qe||e instanceof TypeError||e instanceof SyntaxError||!e.name||!En[e.name]?e:(t=new En[e.name](t||e.message,e),"stack"in e&&L(t,"stack",{get:function(){return this.inner.stack}}),t)},kn(Ve),o(Ze,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:Ze,Entity:Mn,PropModification:Bt,RangeSet:Le,add:function(e){return new Bt({add:e})},cmp:fe,default:Ze,liveQuery:sr,mergeRanges:Ht,rangesOverlap:Yn,remove:function(e){return new Bt({remove:e})},replacePrefix:function(e,t){return new Bt({replacePrefix:[e,t]})}}),{default:Ze}),Ze})})(Ta)),Ta.exports}var $s=Ds();const Pn=ks($s),Pr=Symbol.for("Dexie"),ja=globalThis[Pr]||(globalThis[Pr]=Pn);if(Pn.semVer!==ja.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${Pn.semVer} and ${ja.semVer}`);const{liveQuery:ll,mergeRanges:cl,rangesOverlap:dl,RangeSet:ul,cmp:pl,Entity:ml,PropModification:fl,replacePrefix:gl,add:bl,remove:hl,DexieYProvider:vl}=ja;class Is extends ja{constructor(){super("AnaxagorasAIDatabase");we(this,"aiSettings");we(this,"studyBlocks");we(this,"projectTasks");we(this,"userProfile");this.version(1).stores({aiSettings:"++id, provider, modelName",studyBlocks:"++id, date, subject, completed, syncedWithGoogle",projectTasks:"++id, subject, currentPhase, dueDate",userProfile:"id, email"})}}const pe=new Is;async function js(){await pe.aiSettings.count()===0&&await pe.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}),await $r(),await Ir()}async function $r(){const p=await pe.studyBlocks.filter(b=>!b.gradeKey).toArray();if(p.length>0)for(const b of p)b.id&&await pe.studyBlocks.delete(b.id);const a=await pe.studyBlocks.filter(b=>b.gradeKey==="1eso").count(),n=await pe.studyBlocks.filter(b=>b.gradeKey==="2batx").count(),o=new Date().toISOString().split("T")[0],s=new Date(Date.now()+864e5).toISOString().split("T")[0],c=new Date(Date.now()+864e5*2).toISOString().split("T")[0],d=new Date(Date.now()+864e5*3).toISOString().split("T")[0],m=new Date(Date.now()+864e5*4).toISOString().split("T")[0];a===0&&await pe.studyBlocks.bulkAdd([{title:"Análisis de Oraciones: Sujeto y Complemento Verbal",subject:"Lengua Castellana",date:o,startTime:"17:00",durationMinutes:45,type:"assignment_due",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.",notes:"Identificación del predicado y localización del Complemento Verbal (CV) en bloque.",syncedWithGoogle:!0,googleEventId:"gcal_eso_castellano"},{title:"Ciencias Naturales: El Reino Animal y los Ecosistemas",subject:"Ciencias Naturales",date:s,startTime:"16:30",durationMinutes:40,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.",notes:"Repaso con esquemas visuales de vertebrados e invertebrados.",syncedWithGoogle:!1},{title:"Matemáticas: Fracciones y Operaciones Básicas",subject:"Matemáticas",date:c,startTime:"17:15",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.",notes:"Ejercicios de suma y resta con común denominador.",syncedWithGoogle:!0,googleEventId:"gcal_eso_mates"},{title:"Control Tema 2: Egipto y las Civilizaciones Fluviales",subject:"Ciencias Sociales",date:d,startTime:"09:00",durationMinutes:50,type:"exam",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Control trimestral de departamento programado por el centro educativo.",notes:"Llevar mapa histórico de Mesopotamia y el Nilo.",syncedWithGoogle:!1},{title:"Lectura Guiada: Crónicas Juveniles y Vocabulario",subject:"Tutoría / Lectura",date:m,startTime:"16:00",durationMinutes:30,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.",notes:"Lectura de 2 capítulos y ficha de comprensión lectora.",syncedWithGoogle:!1}]),n===0&&await pe.studyBlocks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",subject:"Lengua Castellana",date:o,startTime:"17:00",durationMinutes:55,type:"assignment_due",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).",notes:"Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.",syncedWithGoogle:!0,googleEventId:"gcal_batx_castellano"},{title:"Historia de España: La Constitución de 1812 y la Guerra de la Independencia",subject:"Historia de España",date:s,startTime:"18:00",durationMinutes:50,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.",notes:"Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.",syncedWithGoogle:!1},{title:"Matemáticas II: Matrices, Determinantes y Sistemas de Cramer (PAU)",subject:"Matemáticas II",date:c,startTime:"16:30",durationMinutes:60,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo matricial.",notes:"Resolución de problemas de selectividad con discusión según parámetro k.",syncedWithGoogle:!0,googleEventId:"gcal_batx_mates"},{title:"Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)",subject:"Filosofía",date:d,startTime:"11:30",durationMinutes:60,type:"exam",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Prueba oficial de simulacro de Selectividad coordinada por el departamento.",notes:"Comparativa ontológica y epistemológica entre Platón y Descartes.",syncedWithGoogle:!1},{title:"Química: Termodinámica y Cinética Química (PAU)",subject:"Química",date:m,startTime:"17:30",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.",notes:"Cálculo de entalpía estándar y entropía de reacción.",syncedWithGoogle:!1}])}async function Ir(){const p=await pe.projectTasks.filter(d=>!d.gradeKey).toArray();if(p.length>0)for(const d of p)d.id&&await pe.projectTasks.delete(d.id);const a=await pe.projectTasks.filter(d=>!d.topicId).toArray();for(const d of a)d.id&&(d.gradeKey==="1eso"?d.subject.includes("Lengua")?await pe.projectTasks.update(d.id,{topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1"}):await pe.projectTasks.update(d.id,{topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1"}):d.gradeKey==="2batx"&&(d.subject.includes("Lengua")?await pe.projectTasks.update(d.id,{topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1"}):await pe.projectTasks.update(d.id,{topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1"})));const n=await pe.projectTasks.filter(d=>d.gradeKey==="1eso").count(),o=await pe.projectTasks.filter(d=>d.gradeKey==="2batx").count(),s=new Date(Date.now()+864e5*5).toISOString().split("T")[0],c=new Date(Date.now()+864e5*12).toISOString().split("T")[0];n===0&&await pe.projectTasks.bulkAdd([{title:"Análisis Sintáctico: El Predicado y el Complemento Verbal",subject:"Lengua Castellana y Literatura",gradeKey:"1eso",topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1",dueDate:s,currentPhase:"writing",autonomyScore:75,pedagogicalNote:"Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.",notes:'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',driveFiles:[{fileId:"drive_doc_sintaxis_1eso",name:"Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 1 día"}],criteria:[{id:"c_eso_1",label:'Identificación del Sujeto ("El tren") y el Predicado',checked:!0,explanation:"Diferenciado correctamente quién realiza la acción."},{id:"c_eso_2",label:'Localización del verbo principal ("llegó")',checked:!0,explanation:"Núcleo del predicado identificado."},{id:"c_eso_3",label:'Reconocimiento del Complemento Verbal ("puntual a la estación")',checked:!0,explanation:"Identificado en bloque como acompañante del verbo, sin clasificar subtipos."},{id:"c_eso_4",label:"Redacción de una oración propia con complemento verbal similar",checked:!1,explanation:"Pendiente de redactar y enviar al tutor."}]},{title:"Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad",subject:"Ciencias Naturales",gradeKey:"1eso",topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1",dueDate:c,currentPhase:"research",autonomyScore:50,pedagogicalNote:"Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.",notes:"Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.",driveFiles:[{fileId:"drive_doc_ecosistemas_1eso",name:"Guia_Maqueta_Ecosistemas.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 días"}],criteria:[{id:"c_eco_1",label:"Elección del ecosistema a representar (bosque, río o costa)",checked:!0,explanation:"Seleccionado bosque mediterráneo."},{id:"c_eco_2",label:"Lista de 5 especies autóctonas con su rol trófico",checked:!0,explanation:"Identificados productores, herbívoros y carnívoros."},{id:"c_eco_3",label:"Diseño visual de la maqueta y materiales reciclables",checked:!1,explanation:"En proceso de preparación."}]}]),o===0&&await pe.projectTasks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)",subject:"Lengua Castellana y Literatura",gradeKey:"2batx",topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1",dueDate:s,currentPhase:"writing",autonomyScore:60,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.",notes:'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',driveFiles:[{fileId:"drive_doc_sintaxis_2batx",name:"Guia_PAU_Tipologia_Complementos_Verbales.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 3 horas"},{fileId:"drive_sheet_pruebas",name:"Matriz_Pruebas_Sintacticas_RAE.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c_batx_1",label:"Segmentación en Sintagmas y delimitación oracional formal",checked:!0,explanation:"SN Sujeto y SV Predicado identificados con precisión."},{id:"c_batx_2",label:'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',checked:!0,explanation:"Diferenciación estricta de la tipología de complementos del predicado."},{id:"c_batx_3",label:"Prueba sintáctica de concordancia para el CPredicativo",checked:!1,explanation:'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'},{id:"c_batx_4",label:"Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC",checked:!1,explanation:"Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales."}]},{title:"Monografía: Energías Renovables en el Mediterráneo",subject:"Ciencias y Tecnología",gradeKey:"2batx",topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1",dueDate:c,currentPhase:"research",autonomyScore:75,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.",notes:"Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.",driveFiles:[{fileId:"drive_doc_01",name:"Borrador_Esquema_Energias.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 horas"},{fileId:"drive_sheet_02",name:"Datos_Produccion_2025.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c1",label:"Formulación de la pregunta de investigación con mis palabras",checked:!0,explanation:"Definido el objetivo sin copia directa de internet."},{id:"c2",label:"Búsqueda y contraste de 3 fuentes académicas fiables",checked:!0,explanation:"Artículos de revistas científicas guardados en Drive."},{id:"c3",label:"Redacción de conclusiones propias basadas en los datos",checked:!1,explanation:"En proceso: reflexionar sobre los resultados sin pedir resumen a la IA."}]}])}const Ls=Ir,Sr="anaxagoras_auth_state",Os=["openid","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive.readonly"].join(" ");class Ms{constructor(){we(this,"state",{isAuthenticated:!0,mode:"demo",user:null,clientId:"",scopes:{calendar:!0,drive:!0,profile:!0}});we(this,"listeners",[]);this.loadPersistedState()}loadPersistedState(){try{const a=localStorage.getItem(Sr);a?(this.state=JSON.parse(a),this.state.mode==="demo"&&this.state.user&&(this.state.user.gradeKey==="2batx"?(this.state.user.id="google_user_demo_2batx",this.state.user.name="Álvaro Martín (2º Bachillerato)",this.state.user.email="alvaro.martin@ies-catalunya.edu.cat"):(this.state.user.id="google_user_demo_1eso",this.state.user.name="Marc Vidal (1º de ESO)",this.state.user.email="marc.vidal@ies-catalunya.edu.cat"))):this.setDemoState("1eso")}catch{this.setDemoState("1eso")}}setDemoState(a="1eso"){const n=a==="2batx";this.state={isAuthenticated:!0,mode:"demo",clientId:"",user:{id:n?"google_user_demo_2batx":"google_user_demo_1eso",name:n?"Álvaro Martín (2º Bachillerato)":"Marc Vidal (1º de ESO)",email:n?"alvaro.martin@ies-catalunya.edu.cat":"marc.vidal@ies-catalunya.edu.cat",avatarUrl:n?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",gradeLevel:n?"2º de Bachillerato (17-18 años)":"1º de ESO (12 años)",gradeKey:a,stageName:n?"Operaciones Formales (Piaget)":"Operaciones Concretas (Piaget)",connectedAt:new Date().toISOString(),mode:"demo"},scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState()}saveState(){localStorage.setItem(Sr,JSON.stringify(this.state)),this.notify()}getState(){return{...this.state}}subscribe(a){return this.listeners.push(a),a(this.state),()=>{this.listeners=this.listeners.filter(n=>n!==a)}}notify(){for(const a of this.listeners)a(this.state)}setClientId(a){this.state.clientId=a.trim(),this.saveState()}async connectDemo(a="1eso"){return this.setDemoState(a),this.state.user}setGradeProfile(a){if(!this.state.user){this.setDemoState(a);return}a==="1eso"?this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_1eso":this.state.user.id,name:this.state.mode==="demo"?"Marc Vidal (1º de ESO)":this.state.user.name,email:this.state.mode==="demo"?"marc.vidal@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"1º de ESO (12 años)",gradeKey:"1eso",stageName:"Operaciones Concretas (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl}:this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_2batx":this.state.user.id,name:this.state.mode==="demo"?"Álvaro Martín (2º Bachillerato)":this.state.user.name,email:this.state.mode==="demo"?"alvaro.martin@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl},this.saveState()}toggleGradeProfile(){var n;const a=((n=this.state.user)==null?void 0:n.gradeKey)||"1eso";this.setGradeProfile(a==="1eso"?"2batx":"1eso")}async connectRealGoogle(a){var o,s;const n=a||this.state.clientId;if(!n)throw new Error("Debes introducir un Google OAuth Client ID válido para conectar en modo real.");if(this.state.clientId=n,await this.ensureGoogleSDKLoaded(),!((s=(o=window.google)==null?void 0:o.accounts)!=null&&s.oauth2))throw new Error("La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.");return new Promise((c,d)=>{try{window.google.accounts.oauth2.initTokenClient({client_id:n,scope:Os,callback:async b=>{if(b.error){d(new Error(`Error de autenticación Google: ${b.error}`));return}if(!b.access_token){d(new Error("No se recibió token de acceso de Google."));return}try{const h=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${b.access_token}`}});if(!h.ok)throw new Error("Fallo al obtener información del perfil del usuario de Google.");const v=await h.json(),x={id:v.sub||`google_${Date.now()}`,name:v.name||"Álvaro Martín (2º de Bachillerato)",email:v.email||"alvaro.estudiante@batxillerat.cat",avatarUrl:v.picture||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",connectedAt:new Date().toISOString(),mode:"real"};this.state={isAuthenticated:!0,mode:"real",clientId:n,accessToken:b.access_token,tokenExpiry:Date.now()+(b.expires_in||3600)*1e3,user:x,scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState(),c(x)}catch(h){d(h)}},error_callback:b=>{d(new Error((b==null?void 0:b.message)||"Error en el diálogo de inicio de sesión de Google."))}}).requestAccessToken({prompt:"consent"})}catch(m){d(m)}})}async ensureGoogleSDKLoaded(){var a,n;if(!((n=(a=window.google)==null?void 0:a.accounts)!=null&&n.oauth2))return new Promise(o=>{let s=0;const c=setInterval(()=>{var d,m;s++,((m=(d=window.google)==null?void 0:d.accounts)!=null&&m.oauth2||s>25)&&(clearInterval(c),o())},100)})}getAccessToken(){return this.state.mode==="real"&&this.state.accessToken?this.state.tokenExpiry&&Date.now()>this.state.tokenExpiry?(console.warn("[GoogleAuth] Token de acceso expirado."),null):this.state.accessToken:null}disconnect(){this.state={isAuthenticated:!1,mode:"demo",user:null,accessToken:void 0,tokenExpiry:void 0,clientId:this.state.clientId,scopes:{calendar:!1,drive:!1,profile:!1}},this.saveState()}}const xe=new Ms,jr=`# ⚡ Prompt de Sistema: Generador de Desafíos de Memoria Activa (Active Recall)\r
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
`,Lr=`# ⏱️ Pilar 1: Distribución Homogénea del Tiempo y Carga Cognitiva Equilibrada
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
`,Or=`# 🎯 Pilar 2: Ordenación por Prioridad y Balance de Materias
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
`,Mr=`# 📅 Pilar 3: Fechas de Compromiso: Exámenes y Entregas de Trabajos
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
`,Rr=`# 🔄 Pilar 4: Adaptabilidad Dinámica, Novedades Docentes y Persistencia Local
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
`,Br=`# 🧠 Arquitectura de Prompt de Agenda: Mentor Socrático de Tiempo y Hábitos
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
`,qr=`# 🧠 Prompt de Sistema: Planificador Inteligente de Agenda y Estudio (STI)\r
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
`,Nr=`# 🏛️ Directriz Curricular Departamental: Lengua Castellana y Literatura (1º de ESO)\r
*Fuente: API de la Entidad Educativa / Departament d'Educació (Esfer@)*\r
*Nivel: 1º de ESO (11-12 años) • Estadio de Operaciones Concretas / Transición (Piaget)*\r
\r
---\r
\r
## 🎯 Objetivo Curricular y Metodología\r
En 1º de Educación Secundaria Obligatoria, el objetivo del análisis gramatical es asentar la estructura básica de la predicación oracional, desarrollando la intuición lingüística del estudiante sin sobrecargarlo con clasificaciones abstractas.\r
\r
---\r
\r
## 🛡️ Guardrails Curriculares Específicos de 1º de ESO\r
\r
1. **Tratamiento del Complemento Verbal (CV):**\r
   - Todos los elementos que completan o modifican al núcleo del predicado (el verbo) deben tratarse **en bloque** bajo la etiqueta general de **Complemento Verbal (CV)** o "palabras que acompañan al verbo".\r
   - **PROHIBIDO:** Exigir o forzar al alumno a clasificar subtipos sintácticos complejos como *Complemento de Régimen Verbal (CRV)*, *Complemento Predicativo (CPred)* o *Complemento Agente (CAg)*.\r
\r
2. **Núcleos Oracionales Básicos:**\r
   - Priorizar la diferenciación nítida entre **Sujeto** (quién o qué realiza la acción) y **Predicado** (la acción y sus circunstancias).\r
   - Reforzar la localización del verbo principal como motor de la oración.\r
\r
3. **Oración Modelo de Referencia:**\r
   - En oraciones como *"El tren llegó puntual a la estación"*:\r
     - Sujeto: *"El tren"*\r
     - Verbo: *"llegó"*\r
     - Complemento Verbal en bloque: *"puntual a la estación"* (nos explica cómo y hacia dónde se desplaza el tren).\r
\r
4. **Tono y Andamiaje Pedagógico:**\r
   - Lenguaje accesible y motivador, oraciones directas.\r
   - Apoyarse en metáforas cotidianas (ej. la locomotora y los vagones que la acompañan).\r
   - Refuerzo positivo constante ante cada deducción correcta.\r
`,zr=`# 🏛️ Directriz Curricular Departamental: Lengua Castellana y Literatura (2º de Bachillerato)\r
*Fuente: API de la Entidad Educativa / Departament d'Educació (Esfer@)*\r
*Nivel: 2º de Bachillerato (17-18 años) • Estadio de Operaciones Formales / Preuniversitario (PAU)*\r
\r
---\r
\r
## 🎯 Objetivo Curricular y Metodología\r
En 2º de Bachillerato, el análisis sintáctico debe cumplir con los estándares de rigor filológico y gramatical exigidos en las Pruebas de Acceso a la Universidad (PAU), según la Nueva Gramática de la Lengua Española (RAE/ASALE).\r
\r
---\r
\r
## 🛡️ Guardrails Curriculares Específicos de 2º de Bachillerato\r
\r
1. **Tipificación Exhaustiva de Complementos Verbales:**\r
   - Es **estrictamente obligatorio** desglosar y clasificar la tipología precisa de cada complemento que integra el sintagma verbal predicado:\r
     - *Complemento Directo (CD)*\r
     - *Complemento Indirecto (CI)*\r
     - *Complemento de Régimen Verbal (CRV)*\r
     - *Complemento Circunstancial (CC: CCL, CCT, CCM, CCCau, CCFin, etc.)*\r
     - *Complemento Predicativo (CPred)*\r
     - *Complemento Agente (CAg)*\r
\r
2. **Justificación Mediante Pruebas Sintácticas Formales:**\r
   - El tutor socrático debe exigir al alumno la aplicación de pruebas gramaticales contrastadas:\r
     - **Prueba del CPredicativo:** Demostrar que concuerda en género y número con el Sujeto o con el CD (*"El tren llegó puntual"* -> *"Las locomotoras llegaron puntuales"*).\r
     - **Contraste CPred vs CCM:** Explicar por qué un adjetivo no puede cumplir función adverbial circunstancial, justificando la doble predicación (del verbo y del sustantivo).\r
     - **Pronominalización y Pasivización:** Pruebas de sustitución por pronombres átonos (*lo, la, los, las / le, les*) y transformación pasiva.\r
\r
3. **Oración Modelo de Referencia:**\r
   - En oraciones como *"El tren llegó puntual a la estación"*:\r
     - Sintagma Nominal Sujeto: *"El tren"*\r
     - Sintagma Verbal Predicado: *"llegó puntual a la estación"*\r
     - Núcleo verbal: *"llegó"*\r
     - *"puntual"*: Sintagma Adjetival en función de **Complemento Predicativo del Sujeto (CPred)**.\r
     - *"a la estación"*: Sintagma Preposicional en función de **Complemento Circunstancial de Lugar (CCL)**.\r
\r
4. **Tono y Estilo:**\r
   - Rigor académico preuniversitario, terminología gramatical formal.\r
   - Plantear preguntas de análisis contrastivo y fomentar la argumentación metacognitiva del estudiante.\r
`,An=`# ⚡ Nivel 1: Generador de Desafíos de Recuperación Activa (Active Recall)
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
`,Fr=`# 🧠 Nivel 1: Planificador Inteligente de Agenda y Hábitos de Estudio
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
`,Kr=`# 📝 Nivel 1: Asistente Pedagógico de Trabajos y Proyectos
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
`,Gr=`# 🧠 Nivel 1: Tutor Socrático Inteligente (STI)
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
`,Vr=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Sujeto y Complemento Verbal en Bloque
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
`,Hr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Sujeto Pospuesto
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
`,Ur=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Plural y Contexto Narrativo
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
`,Wr=`# 🎯 Nivel 2.B: Foco de Actividad — Problema de Reparto Cotidiano con Fracciones
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
`,Qr=`# 🎯 Nivel 2.B: Foco de Actividad — Suma y Resta de Fracciones con Común Denominador
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
`,Jr=`# 🎯 Nivel 2.B: Foco de Actividad — Maqueta de Ecosistemas y Cadenas Tróficas
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
`,Yr=`# 🎯 Nivel 2.B: Foco de Actividad — Mapa Comparativo: Nilo y Tigris-Éufrates
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
`,Zr=`# 🎯 Nivel 2.B: Foco de Actividad — Ficha de Lectura y Deducción Léxica
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
`,Xr=`# 🏛️ Nivel 2.A: Línea Base Temática — Sintaxis de la Oración Simple
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
`,ei=`# 🏛️ Nivel 2.A: Línea Base Temática — Fracciones y Operaciones Básicas
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
`,ti=`# 🏛️ Nivel 2.A: Línea Base Temática — Ecosistemas y Cadenas Tróficas
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
`,ai=`# 🏛️ Nivel 2.A: Línea Base Temática — Primeras Civilizaciones Fluviales
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
`,ni=`# 🏛️ Nivel 2.A: Línea Base Temática — Comprensión Lectora y Hábitos Literarios
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
`,ri=`# 🎯 Nivel 2.B: Foco de Actividad — Redacción Comparativa: Caverna Platónica vs Genio Maligno
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
`,ii=`# 🎯 Nivel 2.B: Foco de Actividad — Comentario Histórico: El Manifiesto de los Persas (1814)
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
`,oi=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Complemento Predicativo del Sujeto
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
`,si=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Complemento Predicativo de Complemento Directo
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
`,li=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Contraste Riguroso entre CPred y CCM
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
`,ci=`# 🎯 Nivel 2.B: Foco de Actividad — Discusión de un Sistema Lineal según el Parámetro k (PAU)
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
`,di=`# 🎯 Nivel 2.B: Foco de Actividad — Desplazamiento de Equilibrio por Efecto de Presión y Temperatura
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
`,ui=`# 🎯 Nivel 2.B: Foco de Actividad — Monografía: Viabilidad de la Eólica Marina Flotante en el Mediterráneo
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
`,pi=`# 🏛️ Nivel 2.A: Línea Base Temática — Teoría del Conocimiento: Platón y Descartes (PAU)
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
`,mi=`# 🏛️ Nivel 2.A: Línea Base Temática — Crisis del Antiguo Régimen y Cortes de Cádiz
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
`,fi=`# 🏛️ Nivel 2.A: Línea Base Temática — Tipología y Pruebas de Complementos Verbales (PAU)
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
`,gi=`# 🏛️ Nivel 2.A: Línea Base Temática — Sistemas de Ecuaciones Lineales y Matrices (PAU)
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
`,bi=`# 🏛️ Nivel 2.A: Línea Base Temática — Termodinámica Química y Equilibrio Químico (PAU)
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
`,hi=`# 🏛️ Nivel 2.A: Línea Base Temática — Transición Energética y Energías Renovables
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
`,vi=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 1º de Educación Secundaria Obligatoria (ESO)
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
`,yi=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 2º de Bachillerato (Preparación PAU)
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
`,xi=`# ⚖️ Nivel 3: Marco Regulador Ético y Deontológico de la Inteligencia Artificial en Educación
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
`,_i=`# 📝 Prompt de Sistema: Asistente Pedagógico de Trabajos y Proyectos (STI)\r
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
`,wi=`# 🧠 Prompt de Sistema: Tutor Socrático Inteligente (STI)\r
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
`,Rs=Object.assign({"../prompts/active_recall_generator.md":jr,"../prompts/agenda/1_distribucion_homogenea.md":Lr,"../prompts/agenda/2_orden_prioridad.md":Or,"../prompts/agenda/3_fechas_compromiso.md":Mr,"../prompts/agenda/4_adaptabilidad_ocio.md":Rr,"../prompts/agenda/agenda_planner_master.md":Br,"../prompts/agenda_planner.md":qr,"../prompts/curriculares/lengua_castellana_1eso.md":Nr,"../prompts/curriculares/lengua_castellana_2batx.md":zr,"../prompts/nivel_1_funcional/active_recall_generator.md":An,"../prompts/nivel_1_funcional/agenda_planner.md":Fr,"../prompts/nivel_1_funcional/project_guide.md":Kr,"../prompts/nivel_1_funcional/socratic_tutor.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":ei,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":ti,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":ai,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ni,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":ri,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":ii,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":oi,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":si,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":li,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":ci,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":di,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":ui,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":pi,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":mi,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":fi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":gi,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":bi,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":hi,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":vi,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":yi,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":xi,"../prompts/project_guide.md":_i,"../prompts/socratic_tutor.md":wi});function Wt(p){const a=p.replace(/\\/g,"/").toLowerCase();for(const[n,o]of Object.entries(Rs))if(n.replace(/\\/g,"/").toLowerCase().includes(a))return o;return""}class Bs{assembleAgendaPrompt(a="1eso"){const n=a==="2batx",o=n?"2º de Bachillerato (PAU)":"1º de ESO",s=Wt("agenda/1_distribucion_homogenea.md"),c=Wt("agenda/2_orden_prioridad.md"),d=Wt("agenda/3_fechas_compromiso.md"),m=Wt("agenda/4_adaptabilidad_ocio.md"),b=Wt("agenda/agenda_planner_master.md"),h={id:"time_distribution",badge:"Pilar 1: Distribución Homogénea",title:"Distribución Homogénea del Tiempo y Carga Cognitiva",subtitle:`Práctica espaciada, límite diario (${n?"90-135 min":"45-75 min"}) y blindaje del ocio`,source:"src/prompts/agenda/1_distribucion_homogenea.md",content:s},v={id:"priority_order",badge:"Pilar 2: Ordenación por Prioridad",title:"Ordenación por Prioridad y Alternancia Cognitiva (Interleaving)",subtitle:"Ponderación según dificultad relativa, balance de materias y avance de tareas",source:"src/prompts/agenda/2_orden_prioridad.md",content:c},x={id:"commitment_deadlines",badge:"Pilar 3: Fechas de Compromiso",title:"Fechas de Compromiso: Exámenes y Entregas de Trabajos",subtitle:"Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento",source:"src/prompts/agenda/3_fechas_compromiso.md",content:d},j={id:"adaptive_flexibility",badge:"Pilar 4: Adaptabilidad y Formato",title:"Adaptabilidad Dinámica, Novedades Docentes (+1d) y JSON Local",subtitle:"Flexibilidad ante imprevistos, escucha empática y persistencia en IndexedDB",source:"src/prompts/agenda/4_adaptabilidad_ocio.md",content:m},R=`
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
${d}
=======================================================================

---
=== [PILAR 4: ADAPTABILIDAD, RESPUESTA EMPÁTICA Y FORMATO DE EMISIÓN] ===
${m}
=========================================================================

CONTEXTO INSTITUCIONAL DE ETAPA DEL ESTUDIANTE:
- Curso Académico: ${o}
- Límite diario vespertino aconsejado: ${n?"Máximo 135 minutos repartidos en 2-3 bloques de 45 min":"Máximo 75 minutos repartidos en 1-2 bloques de 45 min"}
- Tiempo de descanso y ocio protegido tras las 15:00: Mínimo 3.5 a 4 horas libres para desconexión y deporte
- Compromisos prioritarios: Atender de forma preferente hitos con vencimiento inferior a 72 horas.
`.trim();return{role:"agenda",gradeKey:a,title:`Planificador Neuroeducativo de Agenda (${o})`,subtitle:"Distribución homogénea, ordenación por prioridad y gestión de compromisos (exámenes y entregas)",systemInstruction:R,pillars:{timeDistribution:h,priorityOrder:v,commitmentDeadlines:x,adaptiveFlexibility:j}}}getCurricularDirective(a="1eso"){return a==="2batx"?{title:"Directriz Curricular sobre Gestión del Tiempo, Preparación PAU y Prevención del Burnout",subtitle:"Departament d'Educació / Coordinació de les Proves d'Accés a la Universitat (2º de Batxillerat)",institution:"Consell Interuniversitari de Catalunya & Departament d'Educació",sourceApi:"https://api.educacio.gencat.cat/v1/agenda/directrius?curs=2batx",content:`
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
`.trim()}}}const La=new Bs,qs=Object.assign({"../prompts/active_recall_generator.md":jr,"../prompts/agenda/1_distribucion_homogenea.md":Lr,"../prompts/agenda/2_orden_prioridad.md":Or,"../prompts/agenda/3_fechas_compromiso.md":Mr,"../prompts/agenda/4_adaptabilidad_ocio.md":Rr,"../prompts/agenda/agenda_planner_master.md":Br,"../prompts/agenda_planner.md":qr,"../prompts/curriculares/lengua_castellana_1eso.md":Nr,"../prompts/curriculares/lengua_castellana_2batx.md":zr,"../prompts/nivel_1_funcional/active_recall_generator.md":An,"../prompts/nivel_1_funcional/agenda_planner.md":Fr,"../prompts/nivel_1_funcional/project_guide.md":Kr,"../prompts/nivel_1_funcional/socratic_tutor.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":ei,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":ti,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":ai,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ni,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":ri,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":ii,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":oi,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":si,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":li,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":ci,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":di,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":ui,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":pi,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":mi,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":fi,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":gi,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":bi,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":hi,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":vi,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":yi,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":xi,"../prompts/project_guide.md":_i,"../prompts/socratic_tutor.md":wi});function et(p){const a=p.replace(/\\/g,"/").toLowerCase();for(const[n,o]of Object.entries(qs))if(n.replace(/\\/g,"/").toLowerCase().includes(a))return o;return""}class Ns{constructor(){we(this,"TOPIC_DEFINITIONS",[{id:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",name:"Sintaxis de la Oración Simple: Sujeto y Complemento Verbal",fileKey:"nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md",keyConcepts:["Sujeto y Predicado","Verbo","Complemento Verbal (en bloque)"],pedagogicalNote:'Estadio de Operaciones Concretas (Piaget): Identificación visual y holística del Sujeto y el Complemento Verbal en bloque ("locomotora y vagones"), sin clasificaciones abstractas prematuras.'},{id:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",name:"Ecosistemas y Cadenas Tróficas en el Bosque Mediterráneo",fileKey:"nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md",keyConcepts:["Biotopo y Biocenosis","Niveles Tróficos","Equilibrio Ecológico"],pedagogicalNote:"Modelado intuitivo y visual de las relaciones interespecíficas y flujo de materia/energía a partir de observaciones directas del bosque mediterráneo."},{id:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",name:"Fracciones y Operaciones Básicas en Problemas Cotidianos",fileKey:"nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md",keyConcepts:["Fracciones Equivalentes","Común Denominador","Reparto Proporcional"],pedagogicalNote:"Aproximación geométrica y tangible al concepto de parte-todo y proporcionalidad antes de la abstracción algorítmica formal."},{id:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",name:"Primeras Civilizaciones Fluviales: Mesopotamia y Egipto",fileKey:"nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md",keyConcepts:["El Río como Motor","Sociedad Jerarquizada","Escritura Cuneiforme/Jeroglífica"],pedagogicalNote:"Causalidad histórica fundamental: comprensión del condicionamiento geográfico en la aparición de los primeros estados y códigos normativos."},{id:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",name:"Comprensión Lectora y Deducción Léxica en Novela Juvenil",fileKey:"nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md",keyConcepts:["Estructura Narrativa","Vocabulario por Contexto","Paráfrasis"],pedagogicalNote:"Fomento del razonamiento inferencial y deducción léxica mediante el diálogo socrático guiado sin recurrir a definiciones pasivas."},{id:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",name:"Tipología y Pruebas de Complementos Verbales (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md",keyConcepts:["CPredicativo (concordancia)","CRV vs CC","Pruebas sintácticas PAU"],pedagogicalNote:"Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor filológico con pruebas morfosintácticas estrictas (concordancia, conmutación) para las PAU."},{id:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",name:"Crisis del Antiguo Régimen, Constitución de 1812 y Fernando VII",fileKey:"nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md",keyConcepts:["Cortes de Cádiz","Constitución de 1812","Manifiesto de los Persas"],pedagogicalNote:"Análisis historiográfico dialéctico: contraste de textos y decretos originales bajo los criterios de rigor conceptual de las pruebas PAU."},{id:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",name:"Sistemas de Ecuaciones Lineales y Matrices con Parámetros (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md",keyConcepts:["Rouché-Frobenius","Regla de Cramer","Discusión con Parámetro k"],pedagogicalNote:"Razonamiento deductivo y generalización formal de rangos matriciales ante sistemas indeterminados con parámetros."},{id:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",name:"Teoría del Conocimiento: Platón vs Descartes (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md",keyConcepts:["Mito de la Caverna","Duda Metódica y Cogito","Ideas Innatas"],pedagogicalNote:"Pensamiento crítico y dialéctica epistemológica: formulación de tesis, antítesis y justificación argumentativa estructurada."},{id:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",name:"Termodinámica Química y Principio de Le Chatelier (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md",keyConcepts:["Entalpía y Entropía","Equilibrio Químico Kc/Kp","Le Chatelier"],pedagogicalNote:"Predicción fisicoquímica cuantitativa y cualitativa del equilibrio ante perturbaciones en reactores cerrados."},{id:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",name:"Transición Energética y Viabilidad de Eólica Marina en el Mediterráneo",fileKey:"nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md",keyConcepts:["Eólica Marina Flotante","LCOE y Descarbonización","Impacto Ambiental"],pedagogicalNote:"Pensamiento de ingeniería y sostenibilidad: análisis multidimensional de viabilidad técnica, energética y ambiental."}]);we(this,"ACTIVITY_DEFINITIONS",[{id:"act_lengua_1eso_1",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: "El tren llegó puntual a la estación"',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base (Sujeto inicial + CV en bloque)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md"},{id:"act_lengua_1eso_2",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: Sujeto pospuesto ("Por la mañana sonó ruidosa la alarma")',sentenceOrCase:"Por la mañana sonó ruidosa la alarma en el pasillo.",variationType:"Variación de orden oracional (Sujeto pospuesto)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md"},{id:"act_lengua_1eso_3",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Plural y contexto ("Los jóvenes exploradores regresaron...")',sentenceOrCase:"Los jóvenes exploradores regresaron cansados al campamento al anochecer.",variationType:"Variación léxica y plural (Consolidación y transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md"},{id:"act_naturales_1eso_1",topicId:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",order:1,title:"Maqueta de Ecosistemas y Cadenas Tróficas",sentenceOrCase:"Diseño de maqueta de bosque mediterráneo con 4 niveles tróficos.",variationType:"Proyecto Guiado de Aula",fileKey:"nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md"},{id:"act_mates_1eso_1",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:1,title:"Suma y Resta de Fracciones con Común Denominador",sentenceOrCase:"Calcular: 3/8 + 7/8 - 2/8 y simplificar.",variationType:"Cálculo Aritmético Visual",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md"},{id:"act_mates_1eso_2",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:2,title:"Problema Cotidiano de Reparto Proporcional",sentenceOrCase:"En una clase de 24 alumnos, 2/3 practican deporte y 1/6 música.",variationType:"Variación Contextualizada (Transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md"},{id:"act_sociales_1eso_1",topicId:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",order:1,title:"Mapa Histórico: Nilo y Tigris-Éufrates",sentenceOrCase:"Localización del Creciente Fértil y función agrícola del limo fluvial.",variationType:"Análisis Cartográfico y Causal",fileKey:"nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md"},{id:"act_tutoria_1eso_1",topicId:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",order:1,title:"Ficha de Lectura y Deducción Léxica",sentenceOrCase:"Resumen propio y deducción de vocabulario en contexto de novela juvenil.",variationType:"Lectura Crítica y Vocabulario",fileKey:"nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md"},{id:"act_lengua_2batx_1",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: CPred de Sujeto ("El tren llegó puntual a la estación")',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base PAU (Prueba de concordancia con Sujeto)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md"},{id:"act_lengua_2batx_2",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: CPred de CD ("El tribunal consideró inocente al acusado")',sentenceOrCase:"El tribunal consideró inocente al acusado tras el juicio.",variationType:"Variación de doble predicación (Concordancia con CD)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md"},{id:"act_lengua_2batx_3",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Contraste Riguroso CPred vs CCM ("puntual" vs "puntualmente")',sentenceOrCase:"El tren llegó puntual / puntualmente a la estación.",variationType:"Contraejemplo Trampa (Adjetivo variable vs Adverbio invariable)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md"},{id:"act_historia_2batx_1",topicId:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",order:1,title:"Comentario Histórico: Manifiesto de los Persas (1814)",sentenceOrCase:"Comentario guiado del fragmento absolutista de 1814 presentado a Fernando VII.",variationType:"Comentario PAU de Fuente Primaria",fileKey:"nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md"},{id:"act_mates_2batx_1",topicId:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",order:1,title:"Discusión de Sistema con Parámetro k (Rouché-Frobenius)",sentenceOrCase:"Discutir y resolver para SCI el sistema 3x3 en función de k.",variationType:"Problema Oficial PAU de Álgebra Matricial",fileKey:"nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md"},{id:"act_filosofia_2batx_1",topicId:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",order:1,title:"Ensayo Comparativo: Caverna Platónica vs Genio Maligno",sentenceOrCase:"Superación del engaño sensorial en Platón (anamnesis) y Descartes (cogito).",variationType:"Redacción Contrastiva PAU",fileKey:"nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md"},{id:"act_quimica_2batx_1",topicId:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",order:1,title:"Desplazamiento de Equilibrio por Presión y Temperatura (Haber-Bosch)",sentenceOrCase:"Predicción razonada en síntesis de NH3 según Le Chatelier y termodinámica.",variationType:"Problema Razonado PAU de Equilibrio Químico",fileKey:"nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md"},{id:"act_tecnologia_2batx_1",topicId:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",order:1,title:"Monografía: Viabilidad de Eólica Marina Flotante en el Mediterráneo",sentenceOrCase:"Análisis de LCOE, batimetría y evacuación HVDC frente a costa valenciana y balear.",variationType:"Monografía de Investigación Científica",fileKey:"nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md"}])}getTopicsForGrade(a){return this.TOPIC_DEFINITIONS.filter(n=>n.gradeKey===a).map(n=>({...n,markdownContent:et(n.fileKey)}))}getActivitiesForTopic(a){return this.ACTIVITY_DEFINITIONS.filter(n=>n.topicId===a).map(n=>({...n,markdownContent:et(n.fileKey)})).sort((n,o)=>n.order-o.order)}findTopicById(a){const n=this.TOPIC_DEFINITIONS.find(o=>o.id===a);if(n)return{...n,markdownContent:et(n.fileKey)}}findTopicBySubjectOrKeyword(a,n,o=""){const s=this.getTopicsForGrade(n),c=a.toLowerCase(),d=o.toLowerCase();if(d){const b=s.find(h=>h.name.toLowerCase().includes(d)||h.keyConcepts.some(v=>v.toLowerCase().includes(d)));if(b)return b}const m=s.find(b=>b.subject.toLowerCase().includes(c)||c.includes(b.subject.toLowerCase()));return m||s[0]}findActivityById(a){const n=this.ACTIVITY_DEFINITIONS.find(o=>o.id===a);if(n)return{...n,markdownContent:et(n.fileKey)}}assemblePrompt(a){const{role:n,gradeKey:o}=a,s=n==="agenda"?"nivel_1_funcional/agenda_planner.md":n==="project"?"nivel_1_funcional/project_guide.md":n==="recall"?"nivel_1_funcional/active_recall_generator.md":"nivel_1_funcional/socratic_tutor.md",c=et(s),d={level:"level1",badge:"Nivel 1: Funcional",title:n==="agenda"?"Planificador de Agenda":n==="project"?"Mentor de Trabajos":n==="recall"?"Generador de Active Recall":"Tutor Socrático Inteligente",subtitle:"Metodología pedagógica y guardrails no negociables",source:`src/prompts/${s}`,content:c},m=et("nivel_3_regulador/etica_y_principios_ia.md"),h=et(o==="2batx"?"nivel_3_regulador/criterios_generales_2batx.md":"nivel_3_regulador/criterios_generales_1eso.md"),v=`${m}

---

${h}`.trim(),x={level:"level3",badge:"Nivel 3: Marco Regulador",title:o==="2batx"?"Criterios Preuniversitarios (PAU) y Ética de la IA":"Criterios LOMLOE (1º ESO) y Ética de la IA",subtitle:"Ministerio de Educación / Deontología de Inteligencia Artificial",source:"src/prompts/nivel_3_regulador/",content:v};let j;a.topicId?j=this.findTopicById(a.topicId)||this.findTopicBySubjectOrKeyword(a.subject||"Lengua",o):j=this.findTopicBySubjectOrKeyword(a.subject||"Lengua",o);const R=j.markdownContent||et(j.fileKey),L={level:"level2A",badge:"Nivel 2.A: Línea Base Temática",title:j.name,subtitle:`${j.subject} • ${o==="2batx"?"2º de Bachillerato":"1º de ESO"}`,source:`src/prompts/${j.fileKey}`,content:R},Q=this.getActivitiesForTopic(j.id);let $;a.activityId?$=this.findActivityById(a.activityId)||Q[0]:Q.length>0&&($=Q[0]);let B;if($){const re=$.markdownContent||et($.fileKey);B={level:"level2B",badge:"Nivel 2.B: Tarea y Variación",title:$.title,subtitle:`Variación: ${$.variationType}`,source:`src/prompts/${$.fileKey}`,content:re}}const K=`
${d.content}

---
=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===
${x.content}
==================================================

---
=== [DIRECTRIZ Y LÍNEA BASE TEMÁTICA - NIVEL 2.A] ===
Materia: ${j.subject}
Tema Base: ${j.name}
${L.content}
======================================================

${B?`
---
=== [FOCO DE LA ACTIVIDAD CONCRETA Y VARIACIÓN - NIVEL 2.B] ===
Actividad: ${B.title}
Tipo de Variación: ${($==null?void 0:$.variationType)||"Caso de Estudio"}
${B.content}
================================================================
`:""}

CONTEXTO DINÁMICO DE EJECUCIÓN:
- Grado del Estudiante: ${o==="2batx"?"2º de Bachillerato (17-18 años - PAU)":"1º de ESO (12 años - Operaciones Concretas)"}
- Asignatura: ${j.subject}
- Tema Curricular Activo: ${j.name}
${$?`- Actividad Específica en Curso: ${$.title} ("${$.sentenceOrCase}")`:""}
`.trim();return{role:n,gradeKey:o,subject:j.subject,topicId:j.id,topicName:j.name,activityId:$==null?void 0:$.id,activityTitle:$==null?void 0:$.title,systemInstruction:K,layers:{level1Functional:d,level3Regulatory:x,level2BaseTopic:L,level2SpecificActivity:B}}}assembleAgendaPrompt(a="1eso"){return La.assembleAgendaPrompt(a)}}const $e=new Ns,Ci={recall:An};class zs{async getSettings(){const a=await pe.aiSettings.toCollection().first();return a||{provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}}async updateSettings(a){const n=await pe.aiSettings.toCollection().first();n&&n.id?await pe.aiSettings.update(n.id,{...a,updatedAt:new Date().toISOString()}):await pe.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString(),...a})}async testConnection(a){try{const n=`${a.endpointUrl.replace(/\/+$/,"")}/models`,o={"Content-Type":"application/json"};a.apiKey&&(o.Authorization=`Bearer ${a.apiKey.trim()}`);const s=new AbortController,c=setTimeout(()=>s.abort(),4e3),d=await fetch(n,{method:"GET",headers:o,signal:s.signal});return clearTimeout(c),d.ok?{success:!0,message:`Conexión exitosa con ${a.endpointUrl}`}:{success:!1,message:`El servidor respondió con código ${d.status}: ${d.statusText}`}}catch{return{success:!1,message:`No se pudo conectar con ${a.endpointUrl}. Modo socrático local simulado activo.`}}}async callLLM(a,n){var s,c,d;const o=await this.getSettings();try{const m=`${o.endpointUrl.replace(/\/+$/,"")}/chat/completions`,b={"Content-Type":"application/json"};o.apiKey&&(b.Authorization=`Bearer ${o.apiKey.trim()}`);const h=[];for(const R of n){if(!R.content||!R.content.trim())continue;const L=h[h.length-1];L&&L.role===R.role?L.content.trim()!==R.content.trim()&&(L.content=`${L.content}

${R.content.trim()}`):h.push({role:R.role,content:R.content.trim()})}const v=new AbortController,x=setTimeout(()=>v.abort(),3e4),j=await fetch(m,{method:"POST",headers:b,signal:v.signal,body:JSON.stringify({model:o.modelName,messages:[{role:"system",content:a},...h],temperature:o.temperature})});if(clearTimeout(x),j.ok){const L=(d=(c=(s=(await j.json()).choices)==null?void 0:s[0])==null?void 0:c.message)==null?void 0:d.content;if(L)return L.trim()}else{const R=await j.text();console.error(`[AI Client] Error HTTP ${j.status} (${j.statusText}) en ${m}:`,R)}}catch(m){console.warn("[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:",m)}return null}async generateSocraticResponse(a,n,o,s,c){const m=xe.getState().user,b=(m==null?void 0:m.gradeKey)||"1eso",v=$e.assemblePrompt({role:"socratic",gradeKey:b,subject:n,topicId:o.startsWith("topic_")||o.startsWith("t_")?o:void 0,activityId:c}).systemInstruction,j=s.filter((L,Q)=>!(Q===s.length-1&&L.role==="student"&&L.content.trim()===a.trim())).slice(-6).map(L=>({role:L.role==="tutor"?"assistant":"user",content:L.content})),R=await this.callLLM(v,[...j,{role:"user",content:a}]);return R?{id:`msg_${Date.now()}`,role:"tutor",content:R,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Cómo relaciono esto con la teoría?","Quiero resolver el siguiente paso","Dame un ejemplo similar"]}:(await new Promise(L=>setTimeout(L,500)),this.createSimulatedSocraticResponse(a,n,o,b))}calculateAgendaStats(a){const n=new Date().toISOString().split("T")[0],o=a.filter($=>!$.completed&&($.type==="exam"||$.type==="assignment_due")).map($=>{const B=new Date($.date).getTime()-new Date(n).getTime(),K=Math.ceil(B/864e5);return{title:$.title,subject:$.subject,date:$.date,type:$.type,daysLeft:K}}).sort(($,B)=>$.daysLeft-B.daysLeft),s=a.filter($=>$.date===n),c=s.filter($=>!$.completed&&$.type!=="class").reduce(($,B)=>$+(B.durationMinutes||45),0),m=Math.max(0,390-c),b=Math.round(m/60*10)/10,h=new Map;let v=0;for(const $ of a){if($.type==="class")continue;const B=$.durationMinutes||45;v+=B;const K=h.get($.subject)||{minutes:0,count:0};K.minutes+=B,K.count+=1,h.set($.subject,K)}const x=Array.from(h.entries()).map(([$,B])=>({subject:$,minutes:B.minutes,blockCount:B.count,percentage:v>0?Math.round(B.minutes/v*100):0})).sort(($,B)=>B.minutes-$.minutes),j=a.filter($=>$.type==="assignment_due"),R=j.filter($=>$.completed).length,L=j.length,Q=L>0?Math.round(R/L*100):100;return{urgentPriorities:o,afternoonDistribution:{classesEndTime:"15:00",todayStudyMinutes:c,freeTimeHours:b,totalBlocksToday:s.length},subjectBreakdown:x,homeworkProgress:{completed:R,total:L,percentage:Q}}}async generatePlanificationDialogue(a,n,o){var Q,$,B;const s=this.calculateAgendaStats(a),c=xe.getState(),d=((Q=c.user)==null?void 0:Q.name)||"Estudiante",m=(($=c.user)==null?void 0:$.gradeLevel)||"1º de ESO",b=((B=c.user)==null?void 0:B.gradeKey)||"1eso",h=new Date().toISOString().split("T")[0],x=`
${La.assembleAgendaPrompt(b).systemInstruction}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${d} (${m}).
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
`.trim(),j=`
DATOS DE LA AGENDA DE ${d.toUpperCase()}:
- Prioridades urgentes:
${s.urgentPriorities.map(K=>`  • [${K.type==="exam"?"Examen":"Entrega"}] ${K.subject}: "${K.title}" (${K.daysLeft===0?"¡Hoy!":K.daysLeft===1?"Mañana":`en ${K.daysLeft} días`})`).join(`
`)||"  • No hay hitos inmediatos"}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${s.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${s.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${s.subjectBreakdown.map(K=>`${K.subject}: ${K.minutes} min (${K.percentage}%)`).join(", ")||"Sin bloques"}
- Avance de deberes: ${s.homeworkProgress.completed}/${s.homeworkProgress.total} completados (${s.homeworkProgress.percentage}%).
${n?`MENSAJE DEL ALUMNO: "${n}"`:"(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)"}
`.trim(),R=[...(o||[]).map(K=>({role:K.role==="assistant"?"assistant":"user",content:K.content})),{role:"user",content:j}],L=await this.callLLM(x,R);if(L){let K=this.createDefaultSuggestedBlocks(a,s,n,b);try{const q=L.match(/```json\s*([\s\S]*?)\s*```/)||L.match(/\[[\s\S]*\]/);if(q){const Z=JSON.parse(q[1]||q[0]);Array.isArray(Z)&&Z.length>0&&(K=Z.map(J=>({title:J.title||"Sesión de estudio activo",subject:J.subject||"General",date:J.date||h,startTime:J.startTime||"17:00",durationMinutes:J.durationMinutes||45,type:J.type||"study_session",completed:!1,notes:J.notes||"Planificado por Anaxagoras AI",gradeKey:b,syncedWithGoogle:!1})))}}catch(q){console.warn("[AI Client] No se pudo parsear JSON del planificador LLM:",q)}return{message:L.replace(/```json[\s\S]*?```/,"").trim(),suggestedBlocks:K}}return this.createSimulatedPlanificationResponse(a,s,d,m,b,n)}createDefaultSuggestedBlocks(a,n,o,s="1eso"){const c=new Date().toISOString().split("T")[0],d=new Date(Date.now()+864e5).toISOString().split("T")[0],m=new Date(Date.now()+864e5*2).toISOString().split("T")[0],b=(o||"").toLowerCase(),h=b.includes("retras")||b.includes("posp")||b.includes("profe")||b.includes("aplaza"),v=b.includes("descans")||b.includes("libre")||b.includes("cansad")||b.includes("menos"),x=b.includes("mate")||b.includes("cálculo"),j=b.includes("lengua")||b.includes("sintaxis"),R=v?30:45;return s==="1eso"?[{title:j||h?"Práctica de Oraciones: Sujeto y Predicado en Bloque":"Repaso Activo: Ciencias Naturales (Ecosistemas)",subject:j||h?"Lengua Castellana":"Ciencias Naturales",date:h?d:c,startTime:"17:15",durationMinutes:R,type:"study_session",completed:!1,notes:h?"📅 Tarea reprogramada respetando el aviso del profesor.":"Hacer mapa visual de 1 página sin mirar el libro.",gradeKey:"1eso",syncedWithGoogle:!1},{title:x?"Fracciones Básicas: Resolución de 4 Ejercicios":"Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)",subject:x?"Matemáticas":"Ciencias Sociales",date:h?m:d,startTime:"18:15",durationMinutes:R,type:"study_session",completed:!1,notes:"Preparación espaciada para asentar conceptos antes del examen.",gradeKey:"1eso",syncedWithGoogle:!1}]:[{title:x||h?"Matemáticas II: Discusión de Sistemas de Cramer con Parámetro":"Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)",subject:x||h?"Matemáticas II":"Filosofía",date:h?d:c,startTime:"17:00",durationMinutes:v?40:50,type:"study_session",completed:!1,notes:h?"📅 Reprogramado según nueva directriz del profesor.":"Redacción de síntesis conceptual para la prueba de Selectividad.",gradeKey:"2batx",syncedWithGoogle:!1},{title:"Lengua Castellana: Pruebas de Concordancia de CPred (PAU)",subject:"Lengua Castellana",date:m,startTime:"18:15",durationMinutes:v?40:50,type:"study_session",completed:!1,notes:"Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.",gradeKey:"2batx",syncedWithGoogle:!1}]}createSimulatedPlanificationResponse(a,n,o,s,c,d){const m=this.createDefaultSuggestedBlocks(a,n,d,c),b=(d||"").toLowerCase(),h=n.urgentPriorities[0],v=n.subjectBreakdown[0];let x="";return b.includes("retras")||b.includes("posp")||b.includes("profe")?x=`¡Comprendido, ${o}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.

• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.
• **Tu tarde protegida:** Hoy mantendrás **${n.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.
• **Prioridad activa:** Tu foco principal sigue siendo ${h?`el examen de **${h.subject}** (${h.title}) en ${h.daysLeft} días`:"mantener un ritmo espaciado"}.

¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`:x=`¡Hola, ${o}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${s}**:

🎯 **1. Qué es más prioritario hoy:**
`+(h?`Lo más urgente es **${h.subject}**: *"${h.title}"*, que vence ${h.daysLeft===0?"¡hoy mismo!":h.daysLeft===1?"mañana":`en ${h.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.

`:`No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.

`)+`⏱️ **2. Distribución de tu tiempo esta tarde:**
Tus clases lectivas finalizan a las 15:00. Te he programado **${n.afternoonDistribution.todayStudyMinutes>0?`${n.afternoonDistribution.todayStudyMinutes} minutos`:"45 minutos"} de estudio activo**, lo que te deja **${n.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪

📊 **3. Balance por asignaturas:**
`+(v?`La materia con más tiempo acumulado es **${v.subject}** (${v.minutes} min). ${n.subjectBreakdown.length>1?`Recomiendo alternar con materias que llevan menos minutos (${n.subjectBreakdown[n.subjectBreakdown.length-1].subject}) para entrenar el entrelazado cognitivo.`:""}

`:`Aún no hay suficiente historial de minutos registrados esta semana.

`)+`📝 **4. Avance de tus deberes:**
Llevas completados el **${n.homeworkProgress.percentage}% de tus entregas** (${n.homeworkProgress.completed} de ${n.homeworkProgress.total}).

Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`,{message:x,suggestedBlocks:m}}async generateStudyPlan(a,n){var d;const s=((d=xe.getState().user)==null?void 0:d.gradeKey)||"1eso",c=this.calculateAgendaStats([]);return this.createDefaultSuggestedBlocks([],c,void 0,s)}async generateActiveRecallCard(a,n){var m;const s=((m=xe.getState().user)==null?void 0:m.gradeKey)||"1eso",c=`${Ci.recall}

Genera una tarjeta conceptual de autoevaluación para la materia ${a} y tema ${n} adaptada al nivel ${s==="1eso"?"1º de ESO":"2º de Bachillerato"}. Formato JSON estricto.`,d=await this.callLLM(c,[{role:"user",content:`Crear desafío de active recall sobre ${n}`}]);if(d)try{const b=d.match(/\{[\s\S]*\}/);if(b){const h=JSON.parse(b[0]);return{id:`card_${Date.now()}`,concept:h.concept||`¿Cómo definirías la clave de ${n}?`,hint:h.hint||"Piensa en las causas fundamentales y consecuencias.",explanation:h.explanation||"Resumen conceptual para verificar comprensión activa.",masteryScore:0}}}catch(b){console.warn("[AI Client] Fallo al parsear flashcard de LLM:",b)}return a.toLowerCase().includes("lengua")?s==="1eso"?{id:`card_${Date.now()}`,concept:'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',hint:'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',explanation:'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',masteryScore:0}:{id:`card_${Date.now()}`,concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',hint:'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',explanation:'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',masteryScore:0}:{id:`card_${Date.now()}`,concept:`¿Cómo influyen los factores limitantes en ${n} (${a})?`,hint:"Recuerda qué variable impide que el proceso aumente indefinidamente.",explanation:"El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.",masteryScore:0}}createSimulatedSocraticResponse(a,n,o="",s="1eso"){const c=a.toLowerCase();let d="",m=[];return n.toLowerCase().includes("lengua")||o.toLowerCase().includes("oraci")||o.toLowerCase().includes("sintaxis")?s==="1eso"?(d=`¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨

En la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.

¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`,m=["Aporta información del modo y el lugar del viaje","¿Por qué en 1º de ESO no distinguimos subtipos?","¿Cómo encuentro el sujeto si va al final?"],{id:`msg_${Date.now()}`,role:"tutor",content:d,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:m}):(d=`¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚

En la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.

Fíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`,m=['Concuerda con el sujeto ("llegaron puntuales"), es CPred','¿Y qué función sintáctica tiene "a la estación"?',"¿Qué diferencia hay entre CPred y Atributo?"],{id:`msg_${Date.now()}`,role:"tutor",content:d,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:m}):(c.includes("dame la respuesta")||c.includes("solucion")||c.includes("solución")||c.includes("hazmelo")||c.includes("resuelve")||c.includes("escribe el texto")||c.includes("dime el resultado")?(d=`¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`,m=["Los datos son...","No entiendo bien qué significa este dato","¿Qué fórmula podemos usar?"]):c.includes("no entiendo")||c.includes("duda")||c.includes("dificil")||c.includes("difícil")?(d=`Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${n}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`,m=["Entiendo la teoría pero me cuesta aplicarlo","¿Puedes darme una pista visual o ejemplo?","Creo que el primer paso es identificar las variables"]):(d=`¡Excelente razonamiento! Estás conectando muy bien las ideas en **${n}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`,m=["Creo que aumentaría proporcionalmente","¿Podría haber una excepción a esa regla?","Quiero comprobarlo con otro ejemplo práctico"]),{id:`msg_${Date.now()}`,role:"tutor",content:d,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:m})}}const We=new zs;function Fs(p,a){const n=Xt.getCurrentLanguage();p.innerHTML=`
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <img src="./icons/icon-192.png" alt="Anaxagoras AI Logo" class="w-10 h-10 rounded-2xl shadow-md shadow-brand-500/20 object-cover border border-slate-200/80 bg-slate-900" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${C("app.title")}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${C("app.badge")}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${C("app.tagline")}</p>
          </div>
        </div>

        <!-- Global Action Controls -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Standard i18n Language Selector -->
          <div class="relative">
            <select id="lang-selector" class="text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-none rounded-xl py-1.5 px-2.5 cursor-pointer focus:ring-2 focus:ring-brand-500 focus:outline-none transition-colors">
              <option value="es" ${n==="es"?"selected":""}>🇪🇸 Castellano</option>
              <option value="ca" ${n==="ca"?"selected":""}>Català</option>
              <option value="ga" ${n==="ga"?"selected":""}>Galego</option>
              <option value="eu" ${n==="eu"?"selected":""}>Euskera</option>
              <option value="va" ${n==="va"?"selected":""}>Valencià</option>
            </select>
          </div>

          <!-- AI Model Status Pill -->
          <button id="btn-ai-settings" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition-all text-slate-700 hover:border-brand-300">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-soft-pulse"></span>
            <span id="ai-model-label" class="hidden md:inline">Ollama (${C("nav.local")})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </header>
  `;const o=p.querySelector("#lang-selector");o==null||o.addEventListener("change",async d=>{const m=d.target.value;await Xt.changeLanguage(m),a.onLanguageChange(m)});const s=p.querySelector("#btn-ai-settings");s==null||s.addEventListener("click",()=>a.onOpenAISettings());const c=p.querySelector("#auth-container");c&&xe.subscribe(d=>{var m,b,h;d.isAuthenticated&&d.user?(c.innerHTML=`
          <div class="flex items-center gap-1.5">
            ${d.mode==="demo"?`
              <button id="btn-quick-switch-grade" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold ${d.user.gradeKey==="1eso"?"bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100":"bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100"} transition-all" title="Cambiar rápidamente entre los dos perfiles de prueba de la presentación">
                <span>🔄</span>
                <span>${d.user.gradeKey==="1eso"?"1º ESO":"2º Batx"}</span>
              </button>
            `:""}
            <button id="btn-user-profile" class="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all">
              <img src="${d.user.avatarUrl}" alt="${d.user.name}" class="w-6 h-6 rounded-full object-cover border border-brand-200" />
              <div class="text-left hidden sm:block">
                <span class="block text-xs font-semibold text-slate-800 leading-none">${d.user.name}</span>
                <span class="text-[10px] text-slate-500 leading-none">${d.user.gradeLevel}</span>
              </div>
              <span class="w-2 h-2 rounded-full ${d.mode==="real"?"bg-emerald-500 animate-pulse":"bg-amber-500"} ml-1" title="${d.mode==="real"?"Cuenta Google Real":"Modo Demo Activo"}"></span>
            </button>
          </div>
        `,(m=c.querySelector("#btn-quick-switch-grade"))==null||m.addEventListener("click",()=>{xe.toggleGradeProfile()}),(b=c.querySelector("#btn-user-profile"))==null||b.addEventListener("click",a.onOpenAuth)):(c.innerHTML=`
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${C("nav.connectGoogle")}</span>
          </button>
        `,(h=c.querySelector("#btn-connect-google"))==null||h.addEventListener("click",a.onOpenAuth))}),We.getSettings().then(d=>{const m=p.querySelector("#ai-model-label");m&&(m.textContent=d.provider==="local"?`${d.modelName} (${C("nav.local")})`:`${d.modelName} (${C("nav.cloud")})`)})}function Ks(p,a,n){p.innerHTML=`
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div class="flex items-center justify-between border-b border-slate-200">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Agenda -->
          <button data-tab="agenda" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="agenda"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📅</span>
            <span>${C("tabs.agenda")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="agenda"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">3</span>
          </button>

          <!-- Tab 2: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="study"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">💡</span>
            <span>${C("tabs.study")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              ${C("tabs.tutorBadge")}
            </span>
          </button>

          <!-- Tab 3: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="tasks"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📝</span>
            <span>${C("tabs.tasks")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="tasks"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>${C("app.criticalThinking")}</span>
        </div>
      </div>
    </nav>
  `,p.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const c=s.dataset.tab;n.onTabChange(c)})})}function Gs(p,a){We.getSettings().then(n=>{var d,m;p.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">${C("aiModal.title")}</h3>
                <p class="text-xs text-slate-500">${C("aiModal.subtitle")}</p>
              </div>
            </div>
            <button id="btn-close-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              ✕
            </button>
          </div>

          <!-- Form -->
          <form id="ai-settings-form" class="mt-6 space-y-4">
            
            <!-- Provider Selector -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">${C("aiModal.inferenceType")}</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${n.provider==="local"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${n.provider==="local"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${C("aiModal.localTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${C("aiModal.localDesc")}</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${n.provider==="cloud"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${n.provider==="cloud"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${C("aiModal.cloudTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${C("aiModal.cloudDesc")}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${C("aiModal.endpointUrl")}</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${n.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${C("aiModal.endpointHint")}</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${C("aiModal.modelName")}</label>
              <input 
                type="text" 
                id="input-model" 
                value="${n.modelName}" 
                placeholder="llama3:latest, gemma2, gpt-4o-mini"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>

            <!-- API Key (Optional) -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${C("aiModal.apiKey")}</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${n.apiKey||""}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${C("aiModal.apiKeyHint")}</span>
            </div>

            <!-- Socratic Strictness -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${C("aiModal.socraticMode")}</label>
              <select id="select-strictness" class="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none">
                <option value="high" ${n.socraticStrictness==="high"?"selected":""}>${C("aiModal.strictHigh")}</option>
                <option value="balanced" ${n.socraticStrictness==="balanced"?"selected":""}>${C("aiModal.strictBalanced")}</option>
                <option value="exploratory" ${n.socraticStrictness==="exploratory"?"selected":""}>${C("aiModal.strictExploratory")}</option>
              </select>
            </div>

            <!-- Live Status Alert -->
            <div id="test-result-box" class="hidden p-3 rounded-xl text-xs font-medium"></div>

            <!-- Actions -->
            <div class="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
              <button 
                type="button" 
                id="btn-test-connection" 
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>⚡</span>
                <span>${C("aiModal.testConnection")}</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  ${C("aiModal.cancel")}
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  ${C("aiModal.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,(d=p.querySelector("#btn-close-modal"))==null||d.addEventListener("click",a.onClose),(m=p.querySelector("#btn-cancel"))==null||m.addEventListener("click",a.onClose);const o=p.querySelector("#btn-test-connection"),s=p.querySelector("#test-result-box");o==null||o.addEventListener("click",async()=>{const b=p.querySelector("#input-endpoint").value,h=p.querySelector("#input-model").value,v=p.querySelector("#input-apikey").value.trim(),x=p.querySelector('input[name="provider"]:checked');o&&(o.innerHTML=`<span>⏳</span><span>${C("aiModal.testing")}</span>`);const j=await We.testConnection({provider:(x==null?void 0:x.value)||"local",endpointUrl:b.trim(),modelName:h.trim(),apiKey:v,temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()});o&&(o.innerHTML=`<span>⚡</span><span>${C("aiModal.testConnection")}</span>`),s&&(s.classList.remove("hidden","bg-emerald-50","text-emerald-700","bg-amber-50","text-amber-700"),j.success?(s.classList.add("bg-emerald-50","text-emerald-700"),s.textContent=`✅ ${j.message}`):(s.classList.add("bg-amber-50","text-amber-700"),s.textContent=`ℹ️ ${j.message}`))});const c=p.querySelector("#ai-settings-form");c==null||c.addEventListener("submit",async b=>{b.preventDefault();const h=p.querySelector("#input-endpoint").value.trim(),v=p.querySelector("#input-model").value.trim(),x=p.querySelector("#input-apikey").value.trim(),j=p.querySelector('input[name="provider"]:checked'),R=p.querySelector("#select-strictness").value;await We.updateSettings({provider:(j==null?void 0:j.value)||"local",endpointUrl:h,modelName:v,apiKey:x,socraticStrictness:R}),a.onSaved()})})}function Sn(p,a){var c,d,m,b,h,v,x,j,R;const n=xe.getState();p.innerHTML=`
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 transition-all">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
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
              <h3 class="font-display font-bold text-lg text-slate-900">${C("authModal.title")}</h3>
              <p class="text-xs text-slate-500">${C("authModal.subtitle")}</p>
            </div>
          </div>
          <button id="btn-close-auth" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-6 space-y-5">
          ${n.isAuthenticated&&n.user?`
              <!-- User Profile Card -->
              <div class="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3.5 overflow-hidden">
                  <img src="${n.user.avatarUrl}" alt="${n.user.name}" class="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  <div class="truncate">
                    <h4 class="font-bold text-sm text-slate-900 truncate">${n.user.name}</h4>
                    <p class="text-xs text-slate-500 font-mono truncate">${n.user.email}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                      ${n.user.gradeLevel}
                    </span>
                  </div>
                </div>

                <!-- Mode Badge -->
                <div class="flex-shrink-0">
                  ${n.mode==="real"?`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          ${C("authModal.realBadge")}
                        </span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${C("authModal.demoBadge")}
                        </span>`}
                </div>
              </div>

              <!-- Grade Switcher for TR Live Defense -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>🎓</span>
                    <span>Nivel Escolar (Demostración TR):</span>
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    ${n.user.stageName||"Piaget"}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button id="btn-modal-set-1eso" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${n.user.gradeKey==="1eso"?"bg-emerald-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟢 1º ESO (12 años)
                  </button>
                  <button id="btn-modal-set-2batx" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${n.user.gradeKey==="2batx"?"bg-purple-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟣 2º Bachillerato (17-18)
                  </button>
                </div>
                <p class="text-[11px] text-slate-500 leading-tight">
                  ${n.user.gradeKey==="1eso"?"• 1º de ESO: Operaciones Concretas. El complemento verbal se identifica en bloque sin exigir tipos.":"• 2º de Bachillerato: Operaciones Formales. Obligatorio indicar el tipo de complemento verbal (CPred vs CCL) y justificar con pruebas."}
                </p>
              </div>

              <!-- Connected Services Status -->
              <div class="space-y-2">
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${C("authModal.authorizedResources")}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${C("authModal.calendarTitle")}</p>
                      <p class="text-[11px] text-slate-500">${C("authModal.calendarDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${n.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${n.mode==="real"?C("authModal.statusReal"):C("authModal.statusDemo")}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${C("authModal.driveTitle")}</p>
                      <p class="text-[11px] text-slate-500">${C("authModal.driveDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${n.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${n.mode==="real"?C("authModal.statusReal"):C("authModal.statusDemo")}
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
                ${n.mode==="demo"?`
                    <button id="btn-show-real-connect" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
                      <span>🔐</span>
                      <span>${C("authModal.realOptionTitle")}</span>
                    </button>
                  `:`
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${C("authModal.demoButton")}</span>
                    </button>
                  `}

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${C("authModal.disconnect")}
                </button>
              </div>
            `:""}

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${n.isAuthenticated?"hidden":"block"} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${C("authModal.realOptionTitle")}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${C("authModal.realOptionDesc")}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${C("authModal.clientIdLabel")}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${n.clientId||""}" 
                placeholder="${C("authModal.clientIdPlaceholder")}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${C("authModal.clientIdHelp")}</span>
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
              <span>${C("authModal.realButton")}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${C("authModal.demoButton")}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `,(c=p.querySelector("#btn-close-auth"))==null||c.addEventListener("click",a.onClose),(d=p.querySelector("#btn-show-real-connect"))==null||d.addEventListener("click",()=>{var L;(L=p.querySelector("#real-connect-box"))==null||L.classList.remove("hidden")}),(m=p.querySelector("#btn-modal-set-1eso"))==null||m.addEventListener("click",()=>{xe.setGradeProfile("1eso"),a.onStateChanged(),Sn(p,a)}),(b=p.querySelector("#btn-modal-set-2batx"))==null||b.addEventListener("click",()=>{xe.setGradeProfile("2batx"),a.onStateChanged(),Sn(p,a)}),(h=p.querySelector("#btn-manual-check-update"))==null||h.addEventListener("click",async()=>{await Cn.checkForUpdates(!0)}),(v=p.querySelector("#btn-force-hard-reset"))==null||v.addEventListener("click",async()=>{confirm("¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.")&&await Cn.forceHardReset()}),(x=p.querySelector("#btn-switch-to-demo"))==null||x.addEventListener("click",async()=>{await xe.connectDemo(),a.onStateChanged(),a.onClose()}),(j=p.querySelector("#btn-activate-demo"))==null||j.addEventListener("click",async()=>{await xe.connectDemo(),a.onStateChanged(),a.onClose()}),(R=p.querySelector("#btn-disconnect-google"))==null||R.addEventListener("click",()=>{xe.disconnect(),a.onStateChanged(),a.onClose()});const o=p.querySelector("#btn-do-connect-real"),s=p.querySelector("#auth-error-box");o==null||o.addEventListener("click",async()=>{const L=p.querySelector("#input-client-id"),Q=L==null?void 0:L.value.trim();if(!Q){s&&(s.classList.remove("hidden"),s.textContent="Por favor, introduce tu Google OAuth Client ID.");return}o&&(o.innerHTML="<span>⏳ Conectando con Google...</span>");try{await xe.connectRealGoogle(Q),a.onStateChanged(),a.onClose()}catch($){o&&(o.innerHTML=`<span>${C("authModal.realButton")}</span>`),s&&(s.classList.remove("hidden"),s.textContent=$.message||"Error al conectar con Google OAuth 2.0.")}})}class Vs{async syncBlockToCalendar(a){var v;const n=xe.getState();if(!n.isAuthenticated||!n.scopes.calendar)throw new Error("Debes conectar tu cuenta de Google con permisos de Google Calendar");if(n.mode==="demo"){await new Promise(j=>setTimeout(j,500));const x=`gcal_demo_${Date.now()}`;return a.id&&await pe.studyBlocks.update(a.id,{syncedWithGoogle:!0,googleEventId:x}),!0}const o=xe.getAccessToken();if(!o)throw new Error("El token de sesión de Google ha caducado. Vuelve a conectar tu cuenta.");const s=`${a.date}T${a.startTime}:00`,c=new Date(s),d=new Date(c.getTime()+a.durationMinutes*60*1e3),m={summary:`[Anaxagoras AI] ${a.title}`,description:`Asignatura: ${a.subject}
Notas: ${a.notes||"Sesión de aprendizaje autónomo"}

Creado con Anaxagoras AI Sistema de Tutoría Inteligente`,start:{dateTime:c.toISOString(),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone},end:{dateTime:d.toISOString(),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone},reminders:{useDefault:!1,overrides:[{method:"popup",minutes:15},{method:"popup",minutes:60}]}},b=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(m)});if(!b.ok){const x=await b.json().catch(()=>({}));throw new Error(`Error de Google Calendar API (${b.status}): ${((v=x.error)==null?void 0:v.message)||b.statusText}`)}const h=await b.json();return a.id&&await pe.studyBlocks.update(a.id,{syncedWithGoogle:!0,googleEventId:h.id}),!0}async syncAllPendingBlocks(){const a=await pe.studyBlocks.filter(n=>!n.syncedWithGoogle).toArray();for(const n of a)await this.syncBlockToCalendar(n);return a.length}async fetchRealUpcomingEvents(){if(xe.getState().mode!=="real")return[];const n=xe.getAccessToken();if(!n)return[];const o=new Date().toISOString(),s=`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(o)}&maxResults=10&singleEvents=true&orderBy=startTime`,c=await fetch(s,{headers:{Authorization:`Bearer ${n}`}});return c.ok?(await c.json()).items||[]:[]}}const Hs=new Vs;class Us{constructor(){we(this,"INSTITUTION_NAME","Departament d'Educació de la Generalitat de Catalunya");we(this,"API_ENDPOINT","https://api.educacio.gencat.cat/v1/curriculum/guardrails");we(this,"progressionRules",[{gradeKey:"1eso",triggerKeywords:["sujeto","complemento","verbal","oracion","oraciones"],nextBlock:()=>({title:"Práctica de Aula: Complemento Verbal en Textos Narrativos",subject:"Lengua Castellana",type:"assignment_due",durationMinutes:45,daysAhead:2,startTime:"17:00",notes:"Identificar el Complemento Verbal (CV) en bloque en 3 oraciones de la lectura.",teacherNotes:"El profesor ha finalizado la explicación del tema 1 en el aula. Entregar ficha de análisis.",reason:"assignment_published",notification:"El profesor de Lengua Castellana ha registrado en Esfer@ que el tema 1 ha sido completado en clase y ha publicado una entrega de ejercicios."})},{gradeKey:"1eso",triggerKeywords:["fraccion","fracciones","operaciones basicas"],nextBlock:()=>({title:"Problemas de Reparto Proporcional con Fracciones",subject:"Matemáticas",type:"study_session",durationMinutes:40,daysAhead:2,startTime:"17:30",notes:"Problemas cotidianos de reparto y fracciones. Resolver los 4 problemas de la página 38.",teacherNotes:"El profesor ha avanzado a la resolución de problemas en el aula hoy. Repasar antes de la próxima clase.",reason:"topic_completed",notification:"El profesor de Matemáticas ha comunicado un nuevo bloque de estudio para afianzar problemas de fracciones."})},{gradeKey:"1eso",triggerKeywords:["animal","ecosistema","vertebrad"],nextBlock:()=>({title:"Esquema de Cadenas Tróficas y Especies Autóctonas",subject:"Ciencias Naturales",type:"study_session",durationMinutes:40,daysAhead:2,startTime:"16:30",notes:"Dibujar pirámide trófica con productores, herbívoros y descomponedores del ecosistema mediterráneo.",teacherNotes:"Tema 2 impartido en el aula de ciencias. Completar esquema conceptual de biodiversidad.",reason:"topic_completed",notification:"El Departamento de Ciencias Naturales ha agendado una sesión de consolidación de cadenas tróficas."})},{gradeKey:"1eso",triggerKeywords:["egipto","mesopotamia","civilizacion"],nextBlock:()=>({title:"Grecia Clásica: Polis, Democracia Ateniense y Esparta",subject:"Ciencias Sociales",type:"study_session",durationMinutes:45,daysAhead:3,startTime:"17:00",notes:"Leer páginas 48-52 del libro y hacer tabla comparativa entre el modelo ateniense y espartano.",teacherNotes:"El centro ha abierto la unidad 3 tras completar las civilizaciones fluviales.",reason:"topic_completed",notification:"El centro educativo ha programado el inicio del Tema 3 (Grecia Clásica) en tu agenda escolar."})},{gradeKey:"1eso",triggerKeywords:["cronicas","lectura","vocabulario"],nextBlock:()=>({title:"Past Simple Narrative: Writing a Short Story",subject:"Inglés",type:"assignment_due",durationMinutes:35,daysAhead:2,startTime:"16:00",notes:"Redactar historia breve de 60 palabras usando verbos regulares e irregulares en pasado.",teacherNotes:"Tarea semanal asignada en la clase de inglés de hoy por el Departamento de Lenguas Extranjeras.",reason:"assignment_published",notification:"El profesor de Inglés ha agendado la redacción de la historia corta semanal en tu calendario escolar."})},{gradeKey:"2batx",triggerKeywords:["sintaxis","cpred","complementos","pau"],nextBlock:()=>({title:'Práctica PAU: Valores de "Se" y Oraciones Subordinadas',subject:"Lengua Castellana",type:"study_session",durationMinutes:50,daysAhead:2,startTime:"17:00",notes:"Análisis de 3 oraciones complejas de convocatorias PAU (2022-2024). Pruebas formales de pasiva refleja e impersonal.",teacherNotes:'Directriz curricular PAU: Explicación de aula completada hoy. Practicar valores sintácticos de "se".',reason:"topic_completed",notification:"El Departamento de Lengua Castellana ha comunicado una nueva sesión preparatoria PAU."})},{gradeKey:"2batx",triggerKeywords:["constitucion","1812","independencia","cadiz"],nextBlock:()=>({title:"El Reinado de Fernando VII: Sexenio Absolutista y Trienio Liberal",subject:"Historia de España",type:"study_session",durationMinutes:50,daysAhead:2,startTime:"18:00",notes:"Comentario obligatorio del Manifiesto de los Persas (1814) y esquema de las fases del reinado de Fernando VII.",teacherNotes:"El profesor ha concluido el tema de las Cortes de Cádiz en clase y avanza a Fernando VII.",reason:"topic_completed",notification:"El profesor de Historia de España ha registrado en la plataforma escolar el avance de contenido curricular."})},{gradeKey:"2batx",triggerKeywords:["matrices","determinantes","cramer","algebra"],nextBlock:()=>({title:"Discusión de Sistemas con Parámetros: Teorema de Rouché-Frobenius (PAU)",subject:"Matemáticas II",type:"study_session",durationMinutes:55,daysAhead:2,startTime:"16:30",notes:"Resolución de problemas de selectividad explicados en clase. Discusión para k = 1 y k = -2.",teacherNotes:"Ejercicios de la pizarra trabajados hoy en el aula. Consolidar el cálculo de determinantes 3x3.",reason:"topic_completed",notification:"El profesor de Matemáticas II ha agendado problemas de Selectividad para afianzar la clase de hoy."})},{gradeKey:"2batx",triggerKeywords:["platon","descartes","caverna","filosofia"],nextBlock:()=>({title:"La Teoría del Conocimiento en Kant: Giro Copernicano e Ilustración (PAU)",subject:"Filosofía",type:"study_session",durationMinutes:50,daysAhead:3,startTime:"17:15",notes:"Esquema de las preguntas kantianas: ¿Qué puedo saber?, ¿Qué debo hacer?, ¿Qué me cabe esperar?",teacherNotes:"Tema 4 impartido en el aula de filosofía. Comparativa obligatoria con el empirismo de Hume.",reason:"topic_completed",notification:"El centro escolar ha programado el estudio de Kant tras concluir la unidad de Platón."})},{gradeKey:"2batx",triggerKeywords:["quimica","termodinamica","cinetica"],nextBlock:()=>({title:"Equilibrio Químico: Principio de Le Chatelier y Cálculo de Kc/Kp",subject:"Química",type:"study_session",durationMinutes:45,daysAhead:2,startTime:"17:30",notes:"Cálculo de cociente de reacción (Qc) y desplazamiento del equilibrio por efecto de temperatura y presión.",teacherNotes:"Práctica de laboratorio finalizada. Resolver problemas 5 al 8 del boletín de Química.",reason:"topic_completed",notification:"El profesor de Química ha agendado la resolución de problemas de equilibrio químico tras la práctica de hoy."})}])}async checkAndTriggerCollaborativeProgression(a){if(!a.completed)return null;const n=a.gradeKey==="2batx"?"2batx":"1eso",o=`${a.title} ${a.subject} ${a.notes||""}`.toLowerCase(),s=this.progressionRules.find(h=>h.gradeKey!==n?!1:h.triggerKeywords.some(v=>o.includes(v.toLowerCase())));let c;if(s?c=s.nextBlock():c={title:`Consolidación Curricular: ${a.subject}`,subject:a.subject,type:"study_session",durationMinutes:40,daysAhead:2,startTime:"17:00",notes:`El profesor ha registrado la finalización de los ejercicios de aula de ${a.subject}. Repaso activo recomendado.`,teacherNotes:"Registrado desde la plataforma institucional escolar tras el fin de la sesión lectiva.",reason:"topic_completed",notification:`El centro educativo ha registrado tu avance en ${a.subject} y ha agendado una sesión de consolidación.`},await pe.studyBlocks.filter(h=>h.title===c.title&&h.gradeKey===n).first())return null;const m=new Date(Date.now()+864e5*c.daysAhead).toISOString().split("T")[0],b={title:c.title,subject:c.subject,date:m,startTime:c.startTime,durationMinutes:c.durationMinutes,type:c.type,completed:!1,gradeKey:n,notes:c.notes,teacherNotes:c.teacherNotes,origin:"institutional",syncedWithGoogle:!1};return await pe.studyBlocks.add(b),{block:b,notificationMessage:c.notification,sourceSubject:c.subject,reason:c.reason}}async getDepartmentalPrompt(a,n,o=""){await new Promise(c=>setTimeout(c,80));const s=$e.findTopicBySubjectOrKeyword(a,n,o);return{subject:s.subject,gradeKey:n,gradeLevel:n==="1eso"?"1º de ESO (12 años)":"2º de Bachillerato (17-18 años)",stageName:n==="1eso"?"Operaciones Concretas / Transición (Piaget)":"Operaciones Formales / Preuniversitario PAU (Piaget)",promptMarkdown:s.markdownContent||"",institution:this.INSTITUTION_NAME,sourceApi:`${this.API_ENDPOINT}?subject=${encodeURIComponent(s.subject)}&grade=${n}&topic=${encodeURIComponent(s.id)}`,fetchedAt:new Date().toISOString()}}}const Ws=new Us;function Ar(p){return String(p||"").replace(/<[^>]*>/g,"").trim()}function Pi(p,a,n){const o=`${Ar(p)}/${Ar(a)}`;return`<span class="math-fraction inline-flex flex-col items-center justify-center align-middle mx-1 font-serif text-[0.88em] leading-none select-all transition-transform hover:scale-105" aria-label="${o}" title="${o}"><span class="math-num border-b-[1.5px] border-current pb-0.5 px-1 font-bold text-center leading-none">${p}</span><span class="math-den pt-0.5 px-1 font-bold text-center leading-none">${a}</span></span>`}function Qs(p){let a=p;return p==="-"||p==="&minus;"?a="&minus;":p==="*"||p==="x"||p==="\\times"?a="&times;":p==="/"||p==="\\div"?a="&divide;":p==="!="||p==="\\ne"||p==="\\neq"?a="&ne;":p==="<="||p==="\\le"||p==="\\leq"?a="&le;":p===">="||p==="\\ge"||p==="\\geq"?a="&ge;":p==="\\approx"?a="&asymp;":p==="\\pm"?a="&plusmn;":(p==="\\rightarrow"||p==="->")&&(a="&rarr;"),`<span class="math-operator mx-1 font-sans font-bold opacity-80 select-none">${a}</span>`}function Qt(p,a={}){let n=String(p||"").trim();if(n.includes("\\begin{cases}"))return n.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g,(c,d)=>`<div class="inline-flex items-center gap-2 font-serif my-1 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-brand-200/60 shadow-xs"><span class="text-3xl sm:text-4xl font-light text-brand-600 select-none leading-none">{</span><div class="flex flex-col gap-1 text-left text-xs sm:text-sm font-medium text-slate-800">${d.split("\\\\").map(h=>h.trim()).filter(Boolean).map(h=>`<div>${Qt(h,{inner:!0})}</div>`).join("")}</div></div>`);n=n.replace(/\\sqrt\{([^{}]+)\}|sqrt\(([^()]+)\)/g,(c,d,m)=>`§SQRT§${d||m}§ENDSQRT§`),n=n.replace(/\\text\{([^{}]+)\}/g,"§TEXT§$1§ENDTEXT§"),n=n.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,"§FRAC§$1§OVER§$2§ENDFRAC§"),n=n.replace(new RegExp("(?<!\\d\\/)\\b(\\d+)\\/(\\d+)\\b(?!\\/\\d)","g"),"§FRAC§$1§OVER§$2§ENDFRAC§"),n=n.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z\+\-]+)/g,(c,d,m)=>`§SUP§${d||m}§ENDSUP§`),n=n.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z\+\-]+)/g,(c,d,m)=>`§SUB§${d||m}§ENDSUB§`);const o={"\\times":"§OP§\\times§ENDOP§","\\div":"§OP§\\div§ENDOP§","\\neq":"§OP§\\neq§ENDOP§","\\ne":"§OP§\\ne§ENDOP§","\\approx":"§OP§\\approx§ENDOP§","\\leq":"§OP§\\leq§ENDOP§","\\le":"§OP§\\le§ENDOP§","\\geq":"§OP§\\geq§ENDOP§","\\ge":"§OP§\\ge§ENDOP§","\\pm":"§OP§\\pm§ENDOP§","\\rightarrow":"§OP§\\rightarrow§ENDOP§","->":"§OP§->§ENDOP§","!=":"§OP§!=§ENDOP§","<=":"§OP§<=§ENDOP§",">=":"§OP§>=§ENDOP§","+":"§OP§+§ENDOP§","-":"§OP§-§ENDOP§","*":"§OP§*§ENDOP§","=":"§OP§=§ENDOP§"},s=Object.keys(o).sort((c,d)=>d.length-c.length);for(const c of s){const d=c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),m=new RegExp(`(^|\\s|[a-zA-Z0-9§])(${d})($|\\s|[a-zA-Z0-9§])`,"g");n=n.replace(m,`$1${o[c]}$3`)}return n=n.replace(/§FRAC§(.*?)§OVER§(.*?)§ENDFRAC§/g,(c,d,m)=>Pi(d.trim(),m.trim())),n=n.replace(/§OP§(.*?)§ENDOP§/g,(c,d)=>Qs(d)),n=n.replace(/§SQRT§(.*?)§ENDSQRT§/g,(c,d)=>`<span class="inline-flex items-center align-middle mx-1 font-serif"><span class="text-[1.15em] font-serif leading-none mr-0.5">&radic;</span><span class="border-t border-current px-1 leading-tight">${d}</span></span>`),n=n.replace(/§TEXT§(.*?)§ENDTEXT§/g,'<span class="font-sans font-normal mx-1">$1</span>'),n=n.replace(/§SUP§(.*?)§ENDSUP§/g,'<sup class="text-[0.72em] font-bold px-0.5">$1</sup>'),n=n.replace(/§SUB§(.*?)§ENDSUB§/g,'<sub class="text-[0.72em] font-semibold px-0.5">$1</sub>'),a.inner?n:a.badge?`<span class="math-badge inline-flex items-center flex-wrap gap-1 px-3 py-1.5 rounded-2xl bg-brand-50/90 border border-brand-200/90 text-brand-950 font-serif shadow-xs text-xs sm:text-sm ${a.className||""}">${n}</span>`:`<span class="math-expr inline-flex items-center flex-wrap font-serif align-middle ${a.className||""}">${n}</span>`}function yt(p,a={}){if(!p)return"";const n=[];let o=p.replace(/<[^>]+>/g,v=>{const x=`§§HTML_TAG_${n.length}§§`;return n.push({key:x,tag:v}),x});const s=[];function c(v){const x=`§§MATH_TOKEN_${s.length}§§`;return s.push({key:x,html:v}),x}const d=/\b(?:Real\s+Decreto|Decreto|Decret|RD|Ley(?:\s+Orgánica)?|Llei|Orden|Ordre|Resolución|BOE|DOGV|DOGC|núm\.|número)\s+[A-Za-z0-9\.\-\/]*\s*\d+\/\d+/gi;o=o.replace(d,v=>c(v));const m=new RegExp("(?<![a-zA-Z0-9\\-\\/])\\d{1,4}\\/(?:19|20)\\d{2}(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(m,v=>c(v)),o=o.replace(/\$\$([\s\S]*?)\$\$/g,(v,x)=>c(`<div class="my-2.5 flex justify-center w-full overflow-x-auto py-1">${Qt(x,{badge:!0,className:"shadow-sm border-brand-300"})}</div>`)),o=o.replace(/\$([^\$\n]+)\$/g,(v,x)=>c(Qt(x,{badge:!1,inner:!1})));const b=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+\\/\\d+)(\\s*[\\+\\-\\*\\/=]\\s*\\d+\\/\\d+)+(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(b,v=>c(a.badge?Qt(v,{badge:!0}):Qt(v,{badge:!1})));const h=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+)\\/(?!(?:19|20)\\d{2}\\b)(\\d+)(?![a-zA-Z0-9\\-\\/])","g");o=o.replace(h,(v,x,j)=>c(Pi(x,j)));for(const{key:v,html:x}of s)o=o.replace(v,x);for(const{key:v,tag:x}of n)o=o.replace(v,x);return o}function Js(p,a,n){return`
    <div class="math-card flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-50/90 via-indigo-50/70 to-cyan-50/40 border border-brand-200/90 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center gap-2.5 flex-wrap flex-1">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200/80 shadow-2xs flex-shrink-0">
          ${p}
        </span>
        <div class="font-serif text-sm sm:text-base text-slate-900 flex items-center flex-wrap gap-1">
          ${yt(a)}
        </div>
      </div>
      ${n?`<span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white text-brand-700 border border-brand-200 shadow-2xs whitespace-nowrap">${n}</span>`:""}
    </div>
  `}function st(p,a=!0){const n=p.replace(/^# (.*$)/gim,'<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200/80">$1</h2>').replace(/^## (.*$)/gim,'<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>').replace(/^### (.*$)/gim,'<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1 text-brand-700">$1</h4>').replace(/\*\*(.*?)\*\*/gim,'<strong class="font-bold text-slate-900">$1</strong>').replace(/\*(.*?)\*/gim,'<em class="italic text-slate-700">$1</em>').replace(/```json([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/```([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/^\- (.*$)/gim,'<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>').replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>').replace(/\n\n/gim,"<br/><br/>");return a?yt(n):n}function xt(p,a,n,o){const s=o,c=s.assembledPrompt,d=s.assembledAgendaPrompt;let m="all";function b(){var j;if(d){if(m==="all")return{title:d.title,subtitle:d.subtitle,badge:"Estructura Propia de Agenda",html:st(d.systemInstruction,!1)};let R;if(m==="agenda_time"&&(R=d.pillars.timeDistribution),m==="agenda_priority"&&(R=d.pillars.priorityOrder),m==="agenda_deadlines"&&(R=d.pillars.commitmentDeadlines),m==="agenda_adaptive"&&(R=d.pillars.adaptiveFlexibility),R)return{title:R.title,subtitle:R.subtitle,source:R.source,badge:R.badge,html:st(R.content,!1)}}if(!c||m==="all"){const R=c?c.systemInstruction:n,L=!c&&(a.includes("Nivel 3")||a.includes("Regulador")||(s.subtitle||"").includes("Regulador"));let Q;return L?Q=st(R,!1):c&&R.includes("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?Q=R.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/).map(B=>B.startsWith("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?st(B,!1):st(B,!0)).join(""):Q=st(R,!0),{title:c?C("promptModal.titleAssembled",{subject:c.subject}):a,subtitle:c?C("promptModal.subtitleAssembled",{topic:c.topicName}):s.subtitle||C("promptModal.defaultSubtitle"),badge:c?C("promptModal.badge4Layers"):((j=s.badge)==null?void 0:j.text)||C("promptModal.badgePrompt"),html:Q}}let v;m==="level1"&&(v=c.layers.level1Functional),m==="level3"&&(v=c.layers.level3Regulatory),m==="level2A"&&(v=c.layers.level2BaseTopic),m==="level2B"&&(v=c.layers.level2SpecificActivity);const x=m==="level3"||(v==null?void 0:v.level)==="level3";return v?{title:v.title,subtitle:v.subtitle,source:v.source,badge:v.badge,html:st(v.content,!x)}:{title:a,subtitle:s.subtitle||"",badge:C("promptModal.badgeLayer"),html:st(n,!x)}}function h(){var x,j;const v=b();p.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-5 sm:p-7 border border-slate-100 max-h-[90vh] flex flex-col transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${d?"⏱️":c?"🧩":s.institution?"🏛️":"📄"}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${v.title}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${v.badge}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${v.subtitle}</p>
              </div>
            </div>
            <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${C("promptModal.close")}">
              ✕
            </button>
          </div>

          <!-- Specialized Agenda Tabs (Estructura Propia de Agenda) -->
          ${d?`
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 text-xs font-semibold">
              <button data-tab="all" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="all"?"bg-slate-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
                <span>🔀</span>
                <span>Completo (Visión General)</span>
              </button>
              <button data-tab="agenda_time" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="agenda_time"?"bg-cyan-600 text-white shadow-sm shadow-cyan-500/20":"bg-cyan-50 text-cyan-700 hover:bg-cyan-100"}">
                <span>⏱️</span>
                <span>1. Distribución Homogénea</span>
              </button>
              <button data-tab="agenda_priority" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="agenda_priority"?"bg-amber-600 text-white shadow-sm shadow-amber-500/20":"bg-amber-50 text-amber-700 hover:bg-amber-100"}">
                <span>🎯</span>
                <span>2. Orden de Prioridad</span>
              </button>
              <button data-tab="agenda_deadlines" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="agenda_deadlines"?"bg-purple-600 text-white shadow-sm shadow-purple-500/20":"bg-purple-50 text-purple-700 hover:bg-purple-100"}">
                <span>📅</span>
                <span>3. Fechas de Compromiso</span>
              </button>
              <button data-tab="agenda_adaptive" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="agenda_adaptive"?"bg-emerald-600 text-white shadow-sm shadow-emerald-500/20":"bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}">
                <span>🔄</span>
                <span>4. Adaptabilidad y JSON</span>
              </button>
            </div>
          `:""}

          <!-- Multi-Level Tabs (Grafo de Prompts Socrático / Proyectos) -->
          ${c?`
            <div class="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 flex-shrink-0 text-xs font-semibold">
              <button data-tab="all" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="all"?"bg-slate-900 text-white shadow-sm":"bg-slate-100 text-slate-600 hover:bg-slate-200"}">
                <span>🔀</span>
                <span>${C("promptModal.tabs.all")}</span>
              </button>
              <button data-tab="level1" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="level1"?"bg-brand-600 text-white shadow-sm shadow-brand-500/20":"bg-brand-50 text-brand-700 hover:bg-brand-100"}">
                <span>🧠</span>
                <span>${C("promptModal.tabs.level1")}</span>
              </button>
              <button data-tab="level3" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="level3"?"bg-amber-600 text-white shadow-sm shadow-amber-500/20":"bg-amber-50 text-amber-700 hover:bg-amber-100"}">
                <span>⚖️</span>
                <span>${C("promptModal.tabs.level3")}</span>
              </button>
              <button data-tab="level2A" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="level2A"?"bg-purple-600 text-white shadow-sm shadow-purple-500/20":"bg-purple-50 text-purple-700 hover:bg-purple-100"}">
                <span>🏛️</span>
                <span>${C("promptModal.tabs.level2A")}</span>
              </button>
              ${c.layers.level2SpecificActivity?`
                <button data-tab="level2B" class="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${m==="level2B"?"bg-emerald-600 text-white shadow-sm shadow-emerald-500/20":"bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}">
                  <span>🎯</span>
                  <span>${C("promptModal.tabs.level2B")}</span>
                </button>
              `:""}
            </div>
          `:""}

          ${v.source?`
            <div class="mt-2 text-[11px] font-mono text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-xl truncate flex items-center gap-2 flex-shrink-0">
              <span class="font-bold text-slate-600">${C("promptModal.sourceLabel")}</span>
              <span class="truncate text-slate-700">${v.source}</span>
            </div>
          `:""}

          <!-- Scrollable Markdown Content -->
          <div class="mt-3 flex-1 overflow-y-auto pr-2 space-y-3 leading-relaxed text-xs text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
            ${v.html}
          </div>

          <!-- Footer -->
          <div class="pt-3.5 mt-3 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500">
              ${C(c?"promptModal.footerGraph":"promptModal.footerAudit")}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${C("promptModal.close")}
            </button>
          </div>

        </div>
      </div>
    `,(x=p.querySelector("#btn-close-prompt-modal"))==null||x.addEventListener("click",s.onClose),(j=p.querySelector("#btn-close-prompt-btn"))==null||j.addEventListener("click",s.onClose),p.querySelectorAll("[data-tab]").forEach(R=>{R.addEventListener("click",()=>{m=R.dataset.tab,h()})})}h()}async function Ys(p,a){const o=xe.getState().user,s=(o==null?void 0:o.gradeKey)||"1eso",c=(o==null?void 0:o.name)||"Estudiante",d=(o==null?void 0:o.gradeLevel)||"1º de ESO",b=(await pe.studyBlocks.toArray()).filter(B=>B.gradeKey===s||B.gradeKey==="both"||!B.gradeKey);let h=We.calculateAgendaStats(b),v=[],x=[],j=!0;function R(){var ge,G;p.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
          
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                🤖
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">Planificador Socrático de Tiempo y Hábitos</h3>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    🔒 100% Local (IndexedDB)
                  </span>
                </div>
                <p class="text-xs text-slate-500">
                  ${c} • ${d} • Organización personal privada
                </p>
              </div>
            </div>
            <button id="btn-close-plan-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 transition-colors">
              ✕
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            
            <!-- Top Grid: 4 Ejes Fundamentales de Avance y Tiempo -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              <!-- 1. Prioridades Urgentes -->
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-amber-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">🎯 Prioridad Urgente</span>
                  <span class="text-sm">⚡</span>
                </div>
                <div class="mt-2">
                  ${h.urgentPriorities.length>0?`
                      <span class="text-xs font-bold text-slate-900 block truncate" title="${h.urgentPriorities[0].title}">
                        ${h.urgentPriorities[0].subject}
                      </span>
                      <p class="text-[11px] text-amber-800 font-semibold mt-0.5">
                        ${h.urgentPriorities[0].daysLeft===0?"¡Vence hoy!":h.urgentPriorities[0].daysLeft===1?"Mañana":`En ${h.urgentPriorities[0].daysLeft} días`}
                      </p>
                    `:`
                      <span class="text-xs font-bold text-emerald-700">Sin exámenes inmediatos</span>
                      <p class="text-[10px] text-slate-500 mt-0.5">Ritmo tranquilo</p>
                    `}
                </div>
              </div>

              <!-- 2. Distribución Post-Clases (Tarde) -->
              <div class="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-brand-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">⏱️ Tu Tarde (Hoy)</span>
                  <span class="text-sm">🏖️</span>
                </div>
                <div class="mt-2">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold font-display text-brand-900">${h.afternoonDistribution.freeTimeHours} h</span>
                    <span class="text-[10px] text-brand-700 font-medium">libres protegidas</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-0.5">
                    Estudio: <strong class="text-slate-800">${h.afternoonDistribution.todayStudyMinutes} min</strong> (tras las 15:00)
                  </p>
                </div>
              </div>

              <!-- 3. Balance por Asignatura -->
              <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-purple-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">📊 Balance Materias</span>
                  <span class="text-sm">⚖️</span>
                </div>
                <div class="mt-2">
                  ${h.subjectBreakdown.length>0?`
                      <span class="text-xs font-bold text-slate-900 block truncate">
                        ${h.subjectBreakdown[0].subject} (${h.subjectBreakdown[0].percentage}%)
                      </span>
                      <p class="text-[10px] text-purple-700 mt-0.5">
                        ${h.subjectBreakdown.length} asignaturas con bloques
                      </p>
                    `:`
                      <span class="text-xs text-slate-500">Sin datos de minutos</span>
                    `}
                </div>
              </div>

              <!-- 4. Avance de Deberes -->
              <div class="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-cyan-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">📝 Avance Deberes</span>
                  <span class="text-sm">📋</span>
                </div>
                <div class="mt-2">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold font-display text-cyan-900">${h.homeworkProgress.completed}/${h.homeworkProgress.total}</span>
                    <span class="text-[10px] text-cyan-700 font-medium">completados</span>
                  </div>
                  <div class="w-full bg-cyan-200/50 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div class="bg-cyan-600 h-1.5 rounded-full transition-all" style="width: ${h.homeworkProgress.percentage}%"></div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Diálogo con el Asistente Socrático -->
            <div class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-lg">💬</span>
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-700">Conversación y Negociación con el Tutor</span>
                </div>
                <span class="text-[11px] text-slate-400">Metodología Spaced Repetition</span>
              </div>

              <!-- Historial de Conversación -->
              <div class="space-y-3 max-h-56 overflow-y-auto pr-1" id="plan-dialog-history">
                ${j?`
                    <div class="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                      <span class="animate-spin text-base">⏳</span>
                      <span>Analizando tu agenda, horario escolar y balance de prioridades...</span>
                    </div>
                  `:v.map(M=>`
                    <div class="flex gap-3 ${M.role==="assistant"?"items-start":"items-start flex-row-reverse"}">
                      <div class="w-7 h-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${M.role==="assistant"?"bg-brand-500 text-white":"bg-slate-800 text-white"}">
                        ${M.role==="assistant"?"🤖":"👤"}
                      </div>
                      <div class="max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${M.role==="assistant"?"bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm shadow-sm":"bg-brand-600 text-white rounded-tr-sm"}">
                        ${$(M.content)}
                      </div>
                    </div>
                  `).join("")}
              </div>

              <!-- Chips de Ajuste Rápido -->
              <div class="pt-2 border-t border-slate-200/60">
                <span class="text-[11px] font-semibold text-slate-500 block mb-1.5">Sugerencias de ajuste rápido:</span>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="El profesor ha retrasado la entrega para más adelante, reajusta las fechas">
                    🔄 El profesor ha pospuesto la entrega
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Hoy estoy cansado, deja más tiempo libre y reduce el estudio a 30 minutos">
                    ⚖️ Dejar más tiempo libre hoy
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Prioriza un repaso activo para el examen más cercano">
                    🎯 Reforzar examen más cercano
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Añade 30 minutos de ejercicios de Matemáticas">
                    ➕ Añadir repaso de Matemáticas
                  </button>
                </div>
              </div>

              <!-- Input de diálogo interactivo -->
              <form id="plan-dialog-form" class="flex gap-2">
                <input 
                  type="text" 
                  id="plan-dialog-input" 
                  placeholder="Escribe aquí un cambio (ej: 'El profe nos ha dicho que hagamos antes los problemas de Matemáticas')..."
                  class="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
                <button 
                  type="submit" 
                  class="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Enviar</span>
                  <span>💬</span>
                </button>
              </form>
            </div>

            <!-- Previsualización de Bloques Sugeridos con Acciones Directas -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700">Bloques de Estudio Recomendados</h4>
                  <p class="text-[11px] text-slate-500">Puedes retrasar fechas o cambiar duraciones directamente antes de guardarlos.</p>
                </div>
                <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-100">
                  ${x.length} sesiones planificadas
                </span>
              </div>

              <div class="space-y-2.5" id="suggested-blocks-list">
                ${x.length===0?`
                    <div class="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
                      No hay nuevos bloques recomendados por ahora.
                    </div>
                  `:x.map((M,Y)=>`
                    <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-brand-300 transition-all">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-bold text-xs text-slate-900">${M.title}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                            ${M.subject}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500">${M.notes||""}</p>
                      </div>

                      <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div class="text-left sm:text-right pr-2">
                          <span class="block text-xs font-bold text-slate-800">${M.date} • ${M.startTime}</span>
                          <span class="text-[10px] text-slate-400">${M.durationMinutes} min</span>
                        </div>

                        <!-- Botón directo: Posponer / Retrasar +1 día -->
                        <button 
                          type="button" 
                          data-block-idx="${Y}" 
                          class="btn-postpone-suggested px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1"
                          title="Retrasar tarea 1 día (porque el profe lo ha indicado)"
                        >
                          <span>📅 +1d Retrasar</span>
                        </button>

                        <!-- Botón directo: Alternar Duración -->
                        <button 
                          type="button" 
                          data-block-idx="${Y}" 
                          class="btn-toggle-duration px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                          title="Alternar duración (30 min / 45 min / 60 min)"
                        >
                          <span>⏱️ ${M.durationMinutes}m</span>
                        </button>

                        <!-- Botón directo: Descartar bloque -->
                        <button 
                          type="button" 
                          data-block-idx="${Y}" 
                          class="btn-remove-suggested p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar este bloque de la propuesta"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  `).join("")}
              </div>
            </div>

          </div>

          <!-- Modal Footer: Guardado en IndexedDB -->
          <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 text-xs text-slate-500">
              <span class="text-emerald-600 font-bold">🔒 Privacidad:</span>
              <span>Guardado en local (IndexedDB) • Tus hábitos son confidenciales</span>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button 
                type="button" 
                id="btn-cancel-plan-modal" 
                class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
              >
                Descartar
              </button>
              <button 
                type="button" 
                id="btn-apply-plan-modal" 
                class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5"
              >
                <span>💾 Guardar en mi Agenda Personal (IndexedDB)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `,(ge=p.querySelector("#btn-close-plan-modal"))==null||ge.addEventListener("click",a.onClose),(G=p.querySelector("#btn-cancel-plan-modal"))==null||G.addEventListener("click",a.onClose);const B=p.querySelector("#plan-dialog-form");B==null||B.addEventListener("submit",async M=>{M.preventDefault();const Y=p.querySelector("#plan-dialog-input");if(Y&&Y.value.trim()){const te=Y.value.trim();Y.value="",await Q(te)}}),p.querySelectorAll(".plan-chip").forEach(M=>{M.addEventListener("click",async()=>{const Y=M.dataset.prompt;Y&&await Q(Y)})}),p.querySelectorAll(".btn-postpone-suggested").forEach(M=>{M.addEventListener("click",()=>{const Y=Number(M.dataset.blockIdx);if(x[Y]){const te=new Date(x[Y].date);te.setDate(te.getDate()+1),x[Y].date=te.toISOString().split("T")[0],x[Y].notes=`${x[Y].notes||""} (Poscurrido 1 día por indicación del profesor)`.trim(),R()}})}),p.querySelectorAll(".btn-toggle-duration").forEach(M=>{M.addEventListener("click",()=>{const Y=Number(M.dataset.blockIdx);if(x[Y]){const te=x[Y].durationMinutes;x[Y].durationMinutes=te===30?45:te===45?60:30,R()}})}),p.querySelectorAll(".btn-remove-suggested").forEach(M=>{M.addEventListener("click",()=>{const Y=Number(M.dataset.blockIdx);x.splice(Y,1),R()})});const J=p.querySelector("#btn-apply-plan-modal");J==null||J.addEventListener("click",async()=>{J&&(J.innerHTML="<span>⏳ Guardando en IndexedDB...</span>");try{for(const M of x)await pe.studyBlocks.add({...M,gradeKey:s,origin:M.origin||"student",syncedWithGoogle:!1});a.onApplied()}catch(M){alert(M.message||"Error al persistir en IndexedDB")}});const oe=p.querySelector("#plan-dialog-history");oe&&(oe.scrollTop=oe.scrollHeight)}async function L(){j=!0,R();const B=await We.generatePlanificationDialogue(b);v.push({id:`msg_plan_${Date.now()}`,role:"assistant",content:B.message,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),x=B.suggestedBlocks,j=!1,R()}async function Q(B){v.push({id:`msg_u_${Date.now()}`,role:"student",content:B,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),j=!0,R();const K=await We.generatePlanificationDialogue(b,B,v);v.push({id:`msg_a_${Date.now()}`,role:"assistant",content:K.message,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),K.suggestedBlocks&&K.suggestedBlocks.length>0&&(x=K.suggestedBlocks),j=!1,R()}function $(B){return B.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>")}L()}function Zs(p){let a=null;async function n(){var b;await $r();const s=await pe.studyBlocks.toArray(),d=((b=xe.getState().user)==null?void 0:b.gradeKey)||"1eso",m=s.filter(h=>h.gradeKey===d||h.gradeKey==="both"||!h.gradeKey);o(m)}function o(s){var q,Z,J,oe,ge;const d=xe.getState().user,m=(d==null?void 0:d.gradeKey)||"1eso",b=s.length,h=s.filter(G=>G.syncedWithGoogle).length,v=We.calculateAgendaStats(s),x=v.urgentPriorities[0],j=m==="2batx"?["Lengua Castellana","Historia de España","Matemáticas II","Filosofía","Química","Inglés"]:["Lengua Castellana","Matemáticas","Ciencias Naturales","Ciencias Sociales","Inglés"];p.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Top Banner / Summary Cards: Los 4 pilares de avance y tiempo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Card 1: Próximos Exámenes e Hitos Urgentes -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">🎯 Prioridad Urgente</span>
              <span class="text-xl">⚡</span>
            </div>
            <div class="mt-3">
              ${x?`
                  <span class="text-2xl font-display font-extrabold text-slate-900 block truncate" title="${x.title}">
                    ${x.subject}
                  </span>
                  <p class="text-xs text-amber-800 font-semibold mt-1">
                    ${x.type==="exam"?"📝 Examen":"📦 Entrega"} • ${x.daysLeft===0?"¡Hoy mismo!":x.daysLeft===1?"Mañana":`En ${x.daysLeft} días`}
                  </p>
                `:`
                  <span class="text-xl font-display font-extrabold text-emerald-700">Sin urgencias</span>
                  <p class="text-xs text-slate-500 mt-1">Ritmo constante y espaciado</p>
                `}
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 border-t border-slate-100 pt-2">
              <span>${x?x.title:"Organización autónoma al día"}</span>
            </div>
          </div>

          <!-- Card 2: Distribución de la Tarde (Post-Clases) -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">⏱️ Tu Tarde (Hoy)</span>
              <span class="text-xl">🏖️</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-1.5">
                <span class="text-2xl font-display font-extrabold text-slate-900">${v.afternoonDistribution.freeTimeHours} h</span>
                <span class="text-xs text-brand-700 font-bold">tiempo libre</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                Salida a las 15:00 • <strong>${v.afternoonDistribution.todayStudyMinutes} min</strong> estudio hoy
              </p>
            </div>
            <div class="mt-3 text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
              <span class="text-emerald-700 font-semibold">✓ Descanso protegido</span>
              <span class="text-slate-400">Sin saturación</span>
            </div>
          </div>

          <!-- Card 3: Avance de Deberes y Entregas -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">📝 Avance de Deberes</span>
              <span class="text-xl">📋</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-display font-extrabold text-slate-900">${v.homeworkProgress.completed} / ${v.homeworkProgress.total}</span>
                <span class="text-xs text-slate-500 font-medium">entregas listas</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div class="bg-cyan-500 h-2 rounded-full transition-all duration-500" style="width: ${v.homeworkProgress.percentage}%"></div>
              </div>
            </div>
            <div class="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
              <span>Tasa de entrega</span>
              <span class="font-bold text-slate-700">${v.homeworkProgress.percentage}%</span>
            </div>
          </div>

          <!-- Card 4: Sincronización Google Calendar & Privacidad Local -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">🔒 IndexedDB & Calendar</span>
              <span class="text-xl">📅</span>
            </div>
            <div class="mt-3">
              <div class="flex items-center gap-1.5">
                <span class="text-2xl font-display font-extrabold text-slate-900">${h} / ${b}</span>
                <span class="text-xs text-slate-500">sincronizados</span>
              </div>
              <p class="text-[11px] text-emerald-700 font-semibold mt-1">100% guardado en tu navegador</p>
            </div>
            <div class="mt-3 border-t border-slate-100 pt-2">
              <button id="btn-sync-calendar" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5">
                <span>${C("agenda.syncAll")}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Barra Visual de Balance de Repaso por Asignatura -->
        ${v.subjectBreakdown.length>0?`
            <div class="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-base">📊</span>
                <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Dedicación por Asignatura:</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap flex-1 sm:justify-end">
                ${v.subjectBreakdown.map((G,M)=>`
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold border ${M===0?"bg-brand-50 text-brand-700 border-brand-200":M===1?"bg-purple-50 text-purple-700 border-purple-200":"bg-slate-100 text-slate-700 border-slate-200"}">
                    <span>${G.subject}:</span>
                    <strong class="font-bold">${G.minutes} min</strong>
                    <span class="text-[10px] text-slate-400">(${G.percentage}%)</span>
                  </span>
                `).join("")}
              </div>
            </div>
          `:""}

        <!-- Section Header & Filter / Add Block -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${C("agenda.title")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${m==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(d==null?void 0:d.name)||"Estudiante"} • ${(d==null?void 0:d.gradeLevel)||"1º de ESO"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${C("agenda.subtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button id="btn-view-agenda-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${C("agenda.tooltipPromptPlanner")}">
              <span>📄</span>
              <span>${C("agenda.btnPromptPlanner")}</span>
            </button>
            <button id="btn-view-agenda-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${C("agenda.tooltipCurricularDirective")}">
              <span>🏛️</span>
              <span>${C("agenda.btnCurricularDirective")}</span>
            </button>
            <button id="btn-ai-plan" class="px-3.5 py-2 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold transition-all flex items-center gap-1.5">
              <span>🤖</span>
              <span>Planificar con IA</span>
            </button>
            <button id="btn-new-block" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${C("agenda.addBlock")}</span>
            </button>
          </div>
        </div>

        <!-- Alerta colaborativa de avance comunicada por el centro educativo -->
        ${a?`
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-5 text-white shadow-xl border border-purple-500/30 animate-fadeIn">
              <div class="absolute -right-6 -bottom-6 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>
              <div class="flex items-start justify-between gap-4 relative z-10">
                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                    🏛️
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs uppercase tracking-wider font-extrabold text-purple-300">
                        Novedad Colaborativa Escolar • ${a.subject}
                      </span>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                        Avance Curricular Docente
                      </span>
                    </div>
                    <p class="text-sm font-semibold text-white mt-1">
                      ${a.message}
                    </p>
                    <div class="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-purple-100">
                      <span>📌 Agendada nueva tarea en tu agenda escolar:</span>
                      <strong class="font-bold text-white">${a.title}</strong>
                    </div>
                  </div>
                </div>
                <button 
                  id="btn-dismiss-inst-alert" 
                  class="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 text-sm font-bold"
                  title="Cerrar notificación"
                >
                  ✕
                </button>
              </div>
            </div>
          `:""}

        <!-- Schedule Items List -->
        <div class="space-y-3" id="blocks-list">
          ${s.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📅</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${C("agenda.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${C("agenda.emptyDesc")}</p>
              </div>
            `:s.map(G=>`
              <div class="glass-panel p-4 sm:p-5 rounded-2xl glow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 ${G.type==="exam"?"border-l-accent-amber":G.type==="assignment_due"?"border-l-accent-cyan":"border-l-brand-500"} ${G.completed?"opacity-60 bg-slate-50/50":""}">
                
                <!-- Left Details -->
                <div class="flex items-start gap-3.5">
                  <input 
                    type="checkbox" 
                    data-id="${G.id}" 
                    class="block-checkbox mt-1 w-5 h-5 rounded-lg text-brand-600 focus:ring-brand-500 cursor-pointer border-slate-300"
                    ${G.completed?"checked":""} 
                  />
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-bold text-sm text-slate-900 ${G.completed?"line-through text-slate-500":""}">${G.title}</span>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${G.type==="exam"?"bg-amber-50 text-amber-700 border border-amber-200":G.type==="assignment_due"?"bg-cyan-50 text-cyan-700 border border-cyan-200":"bg-brand-50 text-brand-700 border border-brand-200"}">
                        ${G.subject}
                      </span>
                      ${G.origin==="student"?`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md" title="Tarea planificada autónomamente por el alumno">
                              <span>👤</span> Personal
                            </span>`:`<span class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md" title="Comunicado por el centro educativo (Esfer@ / Departament d'Educació)">
                              <span>🏛️</span> Entidad Educativa
                            </span>`}
                      ${G.syncedWithGoogle?`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <span>✓</span> ${C("agenda.synced")}
                            </span>`:`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              ${C("agenda.pendingSync")}
                            </span>`}
                    </div>
                    <p class="text-xs text-slate-500 mt-1">${G.notes||""}</p>
                    ${G.teacherNotes?`
                        <div class="mt-1.5 p-2 rounded-xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-1.5 text-[11px] text-purple-900">
                          <span class="text-xs flex-shrink-0">📢</span>
                          <span><strong>Profesor:</strong> ${G.teacherNotes}</span>
                        </div>
                      `:""}
                  </div>
                </div>

                <!-- Right Timing & Actions -->
                <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div class="text-left sm:text-right pr-1">
                    <span class="block text-xs font-bold text-slate-800">${G.date} • ${G.startTime}</span>
                    <span class="text-[11px] text-slate-400">${G.durationMinutes} ${C("agenda.minRecommended")}</span>
                  </div>

                  <!-- Acción directa: Posponer +1 día -->
                  <button 
                    data-postpone-id="${G.id}" 
                    class="btn-postpone-block px-2.5 py-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1" 
                    title="Posponer / Retrasar 1 día en IndexedDB (si el profesor ha dado más margen)"
                  >
                    <span>📅 +1d</span>
                  </button>

                  <button data-delete-id="${G.id}" class="btn-delete-block p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors" title="Eliminar">
                    🗑️
                  </button>
                </div>

              </div>
            `).join("")}
        </div>

        <!-- Add Block Modal Container -->
        <div id="new-block-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${C("agenda.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${C("agenda.modalSubtitle")}</p>

            <form id="new-block-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldActivity")}</label>
                <input type="text" id="nb-title" placeholder="Ej. Repaso de vocabulario" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldSubject")}</label>
                  <select id="nb-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    ${j.map(G=>`<option value="${G}">${G}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldType")}</label>
                  <select id="nb-type" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="study_session">${C("agenda.types.study_session")}</option>
                    <option value="exam">${C("agenda.types.exam")}</option>
                    <option value="assignment_due">${C("agenda.types.assignment_due")}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldDate")}</label>
                  <input type="date" id="nb-date" value="${new Date().toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldTime")}</label>
                  <input type="time" id="nb-time" value="17:00" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${C("agenda.fieldNotes")}</label>
                <input type="text" id="nb-notes" placeholder="Ej. Resolver 3 ejercicios de examen" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nb" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${C("agenda.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${C("agenda.save")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,(q=p.querySelector("#btn-dismiss-inst-alert"))==null||q.addEventListener("click",()=>{a=null,n()}),p.querySelectorAll(".block-checkbox").forEach(G=>{G.addEventListener("change",async()=>{const M=Number(G.dataset.id),Y=G.checked;if(await pe.studyBlocks.update(M,{completed:Y}),Y){const te=await pe.studyBlocks.get(M);if(te){const ne=await Ws.checkAndTriggerCollaborativeProgression(te);ne&&(a={message:ne.notificationMessage,title:ne.block.title,subject:ne.sourceSubject})}}n()})}),p.querySelectorAll(".btn-delete-block").forEach(G=>{G.addEventListener("click",async()=>{const M=Number(G.dataset.deleteId);await pe.studyBlocks.delete(M),n()})}),p.querySelectorAll(".btn-postpone-block").forEach(G=>{G.addEventListener("click",async()=>{const M=Number(G.dataset.postponeId),Y=await pe.studyBlocks.get(M);if(Y){const te=new Date(Y.date);te.setDate(te.getDate()+1);const ne=te.toISOString().split("T")[0];await pe.studyBlocks.update(M,{date:ne,rescheduledCount:(Y.rescheduledCount||0)+1,notes:`${Y.notes?Y.notes+" • ":""}📅 Pospuesto +1d`.trim()}),n()}})});const $=p.querySelector("#btn-sync-calendar");$==null||$.addEventListener("click",async()=>{$&&($.innerHTML=`<span>${C("agenda.syncing")}</span>`);try{await Hs.syncAllPendingBlocks(),await n()}catch(G){alert(G.message||"Error al sincronizar con Google Calendar")}}),(Z=p.querySelector("#btn-view-agenda-prompt"))==null||Z.addEventListener("click",()=>{const G=document.getElementById("modal-root")||document.body,M=La.assembleAgendaPrompt(m);xt(G,C("agenda.modalPlannerTitle"),M.systemInstruction,{assembledAgendaPrompt:M,subtitle:C("agenda.modalPlannerSubtitle"),onClose:()=>{G.innerHTML=""}})}),(J=p.querySelector("#btn-view-agenda-curricular"))==null||J.addEventListener("click",()=>{const G=document.getElementById("modal-root")||document.body,M=La.getCurricularDirective(m);xt(G,M.title,M.content,{subtitle:M.subtitle,institution:M.institution,sourceApi:M.sourceApi,onClose:()=>{G.innerHTML=""}})});const B=p.querySelector("#btn-ai-plan");B==null||B.addEventListener("click",()=>{const G=document.getElementById("modal-root")||document.body;Ys(G,{onApplied:()=>{G.innerHTML="",n()},onClose:()=>{G.innerHTML=""}})});const K=p.querySelector("#new-block-modal");(oe=p.querySelector("#btn-new-block"))==null||oe.addEventListener("click",()=>{K==null||K.classList.remove("hidden")}),(ge=p.querySelector("#btn-cancel-nb"))==null||ge.addEventListener("click",()=>{K==null||K.classList.add("hidden")});const re=p.querySelector("#new-block-form");re==null||re.addEventListener("submit",async G=>{G.preventDefault();const M=p.querySelector("#nb-title").value,Y=p.querySelector("#nb-subject").value,te=p.querySelector("#nb-type").value,ne=p.querySelector("#nb-date").value,ve=p.querySelector("#nb-time").value,Ie=p.querySelector("#nb-notes").value;await pe.studyBlocks.add({title:M,subject:Y,type:te,date:ne,startTime:ve,durationMinutes:45,completed:!1,gradeKey:m,origin:"student",notes:Ie,syncedWithGoogle:!0,googleEventId:`gcal_${Date.now()}`}),K==null||K.classList.add("hidden"),n()})}n()}const Dt=new Map;function Xs(p){return p.includes("Lengua")?"📖":p.includes("Naturales")||p.includes("Ciencias")?"🌿":p.includes("Matemáticas")||p.includes("Mates")?"📐":p.includes("Sociales")||p.includes("Historia")?"🏛️":p.includes("Filosofía")?"🧠":p.includes("Química")?"🧪":p.includes("Tecnología")?"⚙️":p.includes("Tutoría")||p.includes("Lectura")?"📚":"💡"}function el(p){return p.includes("Lengua")?"bg-cyan-50 text-cyan-700 border border-cyan-200":p.includes("Naturales")||p.includes("Química")?"bg-emerald-50 text-emerald-700 border border-emerald-200":p.includes("Matemáticas")||p.includes("Mates")?"bg-indigo-50 text-indigo-700 border border-indigo-200":p.includes("Sociales")||p.includes("Historia")||p.includes("Filosofía")?"bg-amber-50 text-amber-800 border border-amber-200":p.includes("Tutoría")||p.includes("Lectura")?"bg-purple-50 text-purple-700 border border-purple-200":"bg-slate-100 text-slate-700 border border-slate-200"}function tl(p,a){const n=p.subject.includes("Lengua"),o=p.gradeKey==="2batx";let s=`¡Hola! Soy tu tutor socrático en **${p.subject}** (*${p.name}*).

Aquí no te daré soluciones directas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.

`;a?s+=`🎯 **Reto activo:** *${a.title}*
*"${a.sentenceOrCase}"*

¿Por dónde te gustaría empezar a razonarlo?`:s+="¿Qué duda o ejercicio estás abordando ahora mismo?";let c=["No sé cómo empezar el ejercicio","Tengo dudas con el primer paso","Quiero repasar la teoría básica"];return n&&!o?(a==null?void 0:a.order)===2?(s=`¡Hola Marc! Pasamos a la **Variación 1** de sintaxis oracional: 🚂🔄

Fíjate en esta oración: *"Por la mañana sonó ruidosa la alarma en el pasillo"*

Aquí el orden ha cambiado y la oración no empieza por el sujeto. ¿Qué palabra realiza la acción y con cuál concuerda el verbo *sonó*?`,c=['El sujeto es "la alarma", concuerda con "sonó"','¿Por qué "Por la mañana" no es el sujeto?',"¿Qué forma el complemento verbal en bloque?"]):(a==null?void 0:a.order)===3?(s=`¡Excelente avance Marc! Vamos con la **Variación 2** (Transferencia a contexto narrativo): 🎒🌲

Oración: *"Los jóvenes exploradores regresaron cansados al campamento al anochecer"*

¿Quién es el sujeto plural y qué palabras acompañan al verbo *regresaron* explicando cómo y hacia dónde se mueven?`,c=['El sujeto es "Los jóvenes exploradores"','El complemento verbal es "cansados al campamento al anochecer"',"¿Por qué no separamos los tipos de complementos?"]):(s=`¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨

En 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con clasificaciones abstractas.

Por ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`,c=['El sujeto es "El tren" y el verbo "llegó"',"¿Qué palabras forman el complemento verbal?","¿Cómo distingo el sujeto del predicado?"]):n&&o&&((a==null?void 0:a.order)===2?(s=`¡Hola Álvaro! Abordamos la **Variación 1** (Doble predicación sobre el CD - PAU): 🎓⚖️

Oración: *"El tribunal consideró inocente al acusado tras el juicio"*

Aquí el adjetivo *inocente* no se refiere al sujeto (*El tribunal*), sino al CD (*al acusado*). ¿Qué prueba sintáctica formal demuestra la concordancia entre el CD y el Complemento Predicativo?`,c=['Si fuera plural: "consideró inocentes a los acusados"','¿Cómo demuestro que "al acusado" es CD?',"¿Por qué no es una oración atributiva?"]):(a==null?void 0:a.order)===3?(s=`¡Hola Álvaro! Desafío de **Variación 2** (Contraste formal CPred vs CCM): 🎓🔍

Compara estas dos oraciones de examen PAU:
- A: *"El tren llegó puntual a la estación."*
- B: *"El tren llegó puntualmente a la estación."*

¿Qué prueba morfosintáctica demuestra que en A tenemos un CPred y en B un CC de Modo?`,c=['"Puntual" concuerda en plural; "puntualmente" es invariable',"¿Por qué un adjetivo no puede ser CCM según la RAE?",'¿Qué función tiene "a la estación" en ambas?']):(s=`¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚

En este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal y demostrarlo con pruebas formales.

Considera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica demuestra que es un **Complemento Predicativo (CPred)**?`,c=['"Puntual" concuerda con el sujeto en género y número','¿Y qué función sintáctica tiene "a la estación"?',"¿Cómo distingo un CPred de un Atributo?"])),{id:`msg_welcome_${Date.now()}`,role:"tutor",content:s,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:c}}function Er(p,a){return p.subject.includes("Lengua")?a==="1eso"?{concept:'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?',explanation:'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'}:{concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?',explanation:'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'}:{concept:`¿Cómo definirías la idea clave o causa fundamental de ${p.name}?`,explanation:`Comprender los principios de ${p.name} articulando sus conceptos base: ${p.keyConcepts.join(", ")}.`}}function al(p){var Q;const a=xe.getState(),n=((Q=a.user)==null?void 0:Q.gradeKey)||"1eso",o=a.user,s=$e.getTopicsForGrade(n);s.forEach($=>{var B;if(!Dt.has($.id)){const K=$e.getActivitiesForTopic($.id),re=Er($,n);Dt.set($.id,{topicId:$.id,status:"pending",selectedActivityId:((B=K[0])==null?void 0:B.id)||"",messages:[],flashcardConcept:re.concept,flashcardExplanation:re.explanation,flashcardRevealed:!1})}});function c($){var K;let B=Dt.get($);if(!B){const re=s.find(J=>J.id===$)||s[0],q=$e.getActivitiesForTopic(re.id),Z=Er(re,n);B={topicId:re.id,status:"pending",selectedActivityId:((K=q[0])==null?void 0:K.id)||"",messages:[],flashcardConcept:Z.concept,flashcardExplanation:Z.explanation,flashcardRevealed:!1},Dt.set($,B)}return B}function d($){for(const[K,re]of Dt.entries())K!==$&&re.status==="active"&&(re.status="paused");const B=c($);if(B.status="active",B.lastActiveAt=new Date,B.messages.length===0){const K=s.find(re=>re.id===$);if(K){const re=$e.getActivitiesForTopic(K.id),q=re.find(Z=>Z.id===B.selectedActivityId)||re[0];B.messages=[tl(K,q)]}}j(),requestAnimationFrame(()=>{const K=p.querySelector(`#task-card-${$}`);K&&K.scrollIntoView({behavior:"smooth",block:"nearest"})})}function m($){const B=c($);B.status="paused",j()}function b($,B){const K=c($);K.selectedActivityId=B;const re=s.find(q=>q.id===$);if(re){const Z=$e.getActivitiesForTopic(re.id).find(J=>J.id===B);if(Z){const J={id:`msg_var_${Date.now()}`,role:"tutor",content:`🎯 **Activitat actualitzada a ${Z.title}:**
*"${Z.sentenceOrCase}"*

¿Por dónde empezamos a analizar esta nueva variación?`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Qué cambia respecto al paso anterior?","Identifiquemos el sujeto y el verbo primero","Dame una pista sobre este reto"]};K.messages.push(J)}}j()}async function h($,B){const K=c($),re=s.find(oe=>oe.id===$);if(!re)return;const q={id:`msg_u_${Date.now()}`,role:"student",content:B,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};K.messages.push(q),j();const Z=p.querySelector(`#btn-send-message-${$}`);Z&&(Z.innerHTML="<span>⏳</span>");const J=await We.generateSocraticResponse(B,re.subject,re.id,K.messages,K.selectedActivityId);K.messages.push(J),j()}function v($){const B=$.role==="tutor";return`
      <div class="flex gap-3 ${B?"items-start":"items-start flex-row-reverse"}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${B?"bg-brand-500 text-white shadow-md shadow-brand-500/25":"bg-slate-800 text-white"}">
          ${B?"🧠":"👤"}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${B?"bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60":"bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10"}">
            <div class="prose prose-sm max-w-none">
              ${x($.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${B?"pl-1":"justify-end pr-1"}">
            <span>${C(B?"study.tutorRole":"study.userRole")}</span>
            <span>•</span>
            <span>${$.timestamp}</span>
          </div>
        </div>
      </div>
    `}function x($){const B=$.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>");return yt(B)}function j(){const $=Array.from(Dt.values()).find(K=>K.status==="active"),B=$?s.find(K=>K.id===$.topicId):null;p.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header (Consistent with Tasks/Projects view) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${C("study.taskListTitle")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${n==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(o==null?void 0:o.name)||"Estudiant"} • ${(o==null?void 0:o.gradeLevel)||(n==="2batx"?"2º Batx PAU":"1º de ESO")}
              </span>
              ${B?`<span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold flex items-center gap-1.5">
                       <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span>1 ${C("study.activeBadge")}: ${B.subject}</span>
                     </span>`:`<span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                       ${C("study.statusPaused")} / ${C("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500 mt-1">${C("study.taskListSubtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <span class="text-xs px-3 py-1.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 font-semibold flex items-center gap-1">
              <span>🛡️</span>
              <span>${C("study.safeMode")}</span>
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
              <h3 class="font-display font-bold text-base sm:text-lg">${C("study.bannerTitle")}</h3>
              <p class="text-xs text-white/90">${C("study.bannerGraphDesc")}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-semibold self-stretch md:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>${n==="2batx"?"Álvaro Martín (2º Batx PAU)":"Marc Vidal (1º ESO)"}</span>
          </div>
        </div>

        <!-- Study Tasks Accordion List -->
        <div class="space-y-5" id="study-tasks-list">
          ${s.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📚</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${C("study.noTasks")}</p>
              </div>
            `:s.map(K=>R(K)).join("")}
        </div>

      </div>
    `,L()}function R($){const B=c($.id),K=$e.getActivitiesForTopic($.id),re=K.find(G=>G.id===B.selectedActivityId)||K[0],q=B.status==="paused",Z=B.status==="active",J=Xs($.subject),oe=el($.subject),ge=B.messages.filter(G=>G.role==="student").length;return Z?`
        <div 
          id="task-card-${$.id}" 
          class="glass-panel p-6 rounded-3xl border-2 border-brand-500/70 bg-white/95 shadow-xl shadow-brand-500/10 glow-card space-y-5 transition-all duration-300"
        >
          <!-- Active Task Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-2xl">${J}</span>
                <h3 class="font-display font-bold text-lg text-slate-900">${$.name}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${oe}">
                  ${$.subject}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>${C("study.statusActive")}</span>
                </span>
              </div>
              <p class="text-xs text-slate-600">${$.pedagogicalNote||""}</p>
            </div>

            <!-- Header Controls -->
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button 
                data-pause-topic-id="${$.id}" 
                class="btn-pause-task px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${C("study.btnPause")}"
              >
                <span>⏸️</span>
                <span>${C("study.btnPause")}</span>
              </button>
              <button 
                data-topic-prompt-id="${$.id}" 
                class="btn-view-topic-prompt px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                title="${C("study.tooltipPromptGraph")}"
              >
                <span>🧩</span>
                <span>${C("study.btnPromptGraph")}</span>
              </button>
            </div>
          </div>

          <!-- Pedagogical Foundation Callout (Piaget / LOMLOE Anchor, identical to Tasks view) -->
          ${$.pedagogicalNote?`
            <div class="p-3.5 rounded-2xl ${n==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">🧠</span>
              <div>
                <span class="font-bold block">${C("study.pedagogicalAnchor")}</span>
                <span class="leading-relaxed">${$.pedagogicalNote}</span>
              </div>
            </div>
          `:""}

          <!-- Activities / Variations Stepper (Repetición con Variación) -->
          ${K.length>0?`
            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>${C("study.activityVariationLabel")}</span>
                </span>
                <span class="text-[11px] text-slate-400 font-mono">Repetición con Variación • ${K.length} niveles</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${K.map(G=>{const M=G.id===(re==null?void 0:re.id);return`
                    <button 
                      data-topic-id="${$.id}"
                      data-select-activity-id="${G.id}"
                      class="btn-select-activity text-left p-2.5 rounded-xl border text-xs transition-all ${M?"bg-brand-50 border-brand-300 text-brand-900 font-bold shadow-sm ring-1 ring-brand-400/40":"bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] uppercase font-mono font-bold ${M?"text-brand-600":"text-slate-400"}">${C("study.stepPrefix")} ${G.order}</span>
                        ${M?'<span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>':""}
                      </div>
                      <div class="truncate text-xs ${M?"font-bold":"font-medium"}">${G.title}</div>
                    </button>
                  `}).join("")}
              </div>

              ${re?Js("Cas Actiu:",re.sentenceOrCase,re.variationType):""}
            </div>
          `:""}

          <!-- Socratic Interaction Workspace (2 Columns Grid) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            
            <!-- Socratic Chat Interface (8 cols) -->
            <div class="lg:col-span-8 flex flex-col rounded-2xl border border-slate-200 overflow-hidden h-[620px] bg-slate-50/50">
              
              <!-- Chat Stream -->
              <div id="chat-stream-${$.id}" class="chat-stream flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                ${B.messages.map(G=>v(G)).join("")}
              </div>

              <!-- Quick Socratic Prompts (Chips) -->
              <div class="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
                <button data-topic-id="${$.id}" data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${C("study.chip1")}
                </button>
                <button data-topic-id="${$.id}" data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${C("study.chip2")}
                </button>
                <button data-topic-id="${$.id}" data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${C("study.chip3")}
                </button>
              </div>

              <!-- Chat Input Area -->
              <div class="p-4 bg-white border-t border-slate-200">
                <form data-topic-id="${$.id}" class="chat-form flex items-center gap-2">
                  <input 
                    type="text" 
                    id="chat-input-${$.id}" 
                    placeholder="${C("study.inputPlaceholder")}" 
                    required
                    class="chat-input flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    id="btn-send-message-${$.id}"
                    class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>${C("study.send")}</span>
                    <span>➤</span>
                  </button>
                </form>
                <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>${C("study.safeMode")}</span>
                  <span>${C("study.openaiCompatible")}</span>
                </div>
              </div>

            </div>

            <!-- Active Recall & Concept Cards (4 cols) -->
            <div class="lg:col-span-4 space-y-4">
              
              <!-- Card 1: Active Recall Flashcard -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${C("study.activeRecall")}</span>
                  <button data-view-recall-topic="${$.id}" class="btn-view-recall-prompt text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    <span>📄</span>
                    <span>${C("study.btnRecallPrompt")}</span>
                  </button>
                </div>

                <div>
                  <h4 class="font-bold text-sm text-slate-900">${C("study.flashcardTitle")}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${C("study.flashcardSubtitle")}</p>
                </div>

                <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                  <span id="flashcard-concept-${$.id}" class="text-xs font-bold text-brand-700 block leading-relaxed">
                    ${yt(B.flashcardConcept||"¿Cómo definirías el concepto principal de esta tarea?")}
                  </span>
                  
                  <div id="flashcard-answer-${$.id}" class="${B.flashcardRevealed?"":"hidden"} text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                    <p id="flashcard-explanation-${$.id}" class="leading-relaxed">
                      ${yt(B.flashcardExplanation||"")}
                    </p>
                  </div>

                  <button 
                    data-topic-id="${$.id}"
                    class="btn-toggle-answer w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    ${C("study.toggleHint")}
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
                    ${C("study.reviewLater")}
                  </button>
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    ${C("study.mastered")}
                  </button>
                </div>
              </div>

              <!-- Card 2: Conceptos Clave (Línea Base) -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${C("study.baselineConcepts")}</span>
                <ul class="space-y-2 text-xs">
                  ${$.keyConcepts.map((G,M)=>`
                    <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="font-medium text-slate-800">${G}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${M===0?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                        ${C(M===0?"study.consolidated":"study.toStrengthen")}
                      </span>
                    </li>
                  `).join("")}
                </ul>
              </div>

              <!-- Single Active Task Helper Callout -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>ℹ️</span>
                <span>${C("study.activeTaskNote")}</span>
              </div>

            </div>

          </div>

        </div>
      `:`
      <div 
        id="task-card-${$.id}" 
        class="glass-panel p-5 sm:p-6 rounded-3xl border ${q?"border-amber-300/80 bg-amber-50/20 shadow-md shadow-amber-500/5":"border-slate-200 hover:border-slate-300 bg-white/70"} glow-card space-y-4 transition-all duration-300"
      >
        <!-- Task Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl">${J}</span>
              <h3 class="font-display font-bold text-base text-slate-900">${$.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${oe}">
                ${$.subject}
              </span>
              ${q?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                       <span class="text-xs">⏸️</span>
                       <span>${C("study.statusPaused")}</span>
                     </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                       ${C("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500">${$.pedagogicalNote||""}</p>
          </div>

          <!-- Actions & Status Info -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            ${q?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-amber-900">${C("study.interactionsCount",{count:ge})}</span>
                <span class="text-[11px] text-amber-700 font-medium truncate max-w-[150px] block">${(re==null?void 0:re.title)||""}</span>
              </div>
            `:`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-slate-700">${C("study.badgeActivities",{count:K.length})}</span>
                <span class="text-[11px] text-slate-400 font-medium">${C("study.badgeConcepts",{count:$.keyConcepts.length})}</span>
              </div>
            `}

            <button 
              data-topic-prompt-id="${$.id}" 
              class="btn-view-topic-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              title="${C("study.tooltipPromptGraph")}"
            >
              <span>🧩</span>
              <span>${C("study.btnPromptGraph")}</span>
            </button>

            <button 
              data-start-topic-id="${$.id}" 
              class="btn-start-task px-4 py-2 rounded-2xl ${q?"bg-amber-600 hover:bg-amber-700 shadow-amber-500/20":"bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"} text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${q?"▶️":"🚀"}</span>
              <span>${C(q?"study.btnResume":"study.btnStart")}</span>
            </button>
          </div>
        </div>

        <!-- Task Preview Footer -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Conceptes:</span>
            ${$.keyConcepts.map(G=>`
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80">
                ${G}
              </span>
            `).join("")}
          </div>

          ${q?`
            <span class="text-[11px] text-amber-700/90 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${C("study.pauseNotice")}</span>
            </span>
          `:""}
        </div>
      </div>
    `}function L(){p.querySelectorAll(".btn-start-task").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.startTopicId;Y&&d(Y)})}),p.querySelectorAll(".btn-pause-task").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.pauseTopicId;Y&&m(Y)})}),p.querySelectorAll(".btn-select-activity").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.topicId,te=M.dataset.selectActivityId;Y&&te&&b(Y,te)})}),p.querySelectorAll(".btn-view-topic-prompt").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.topicPromptId,te=s.find(ne=>ne.id===Y);if(te){const ne=c(te.id),ve=document.getElementById("modal-root")||document.body,Ie=$e.assemblePrompt({role:"socratic",gradeKey:n,subject:te.subject,topicId:te.id,activityId:ne.selectedActivityId});xt(ve,C("study.modalSocraticTitle"),Ie.systemInstruction,{assembledPrompt:Ie,subtitle:C("study.modalSocraticSubtitle",{subject:te.subject,topic:te.name}),onClose:()=>{ve.innerHTML=""}})}})}),p.querySelectorAll(".btn-view-recall-prompt").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.viewRecallTopic,te=s.find(Ie=>Ie.id===Y)||s[0],ne=document.getElementById("modal-root")||document.body,ve=$e.assemblePrompt({role:"recall",gradeKey:n,subject:te.subject,topicId:te.id});xt(ne,"Prompt Estático: Generador de Active Recall (active_recall_generator.md)",Ci.recall,{assembledPrompt:ve,subtitle:"Prompt Transversal de Sección (Generación de Flashcards Conceptuales)",onClose:()=>{ne.innerHTML=""}})})}),p.querySelectorAll(".btn-toggle-answer").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.topicId;if(Y){const te=c(Y);te.flashcardRevealed=!te.flashcardRevealed;const ne=p.querySelector(`#flashcard-answer-${Y}`);ne==null||ne.classList.toggle("hidden",!te.flashcardRevealed)}})}),p.querySelectorAll(".btn-generate-card-ai").forEach(M=>{M.addEventListener("click",async()=>{const Y=M.dataset.topicId,te=s.find(ne=>ne.id===Y);if(te){M.innerHTML="<span>⏳ Generando desafío...</span>";try{const ne=await We.generateActiveRecallCard(te.subject,te.name),ve=c(te.id);ve.flashcardConcept=ne.concept,ve.flashcardExplanation=ne.explanation,ve.flashcardRevealed=!1;const Ie=p.querySelector(`#flashcard-concept-${te.id}`),ke=p.querySelector(`#flashcard-explanation-${te.id}`),je=p.querySelector(`#flashcard-answer-${te.id}`);Ie&&(Ie.innerHTML=yt(ne.concept)),ke&&(ke.innerHTML=yt(ne.explanation)),je==null||je.classList.add("hidden")}catch(ne){alert(ne.message||"Error al generar tarjeta con IA")}finally{M.innerHTML="<span>⚡ Generar Nuevo Desafío con IA</span>"}}})}),p.querySelectorAll(".chip-btn").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.topicId,te=M.dataset.prompt;Y&&te&&h(Y,te)})}),p.querySelectorAll(".chat-form").forEach(M=>{M.addEventListener("submit",Y=>{Y.preventDefault();const te=M.dataset.topicId;if(te){const ne=p.querySelector(`#chat-input-${te}`);if(ne&&ne.value.trim()){const ve=ne.value.trim();ne.value="",h(te,ve)}}})}),p.querySelectorAll(".chat-stream").forEach(M=>{M.scrollTo({top:M.scrollHeight,behavior:"smooth"})})}j()}class nl{async getAvailableFiles(){var h;const a=xe.getState();if(!a.isAuthenticated||!a.scopes.drive)throw new Error("Debes conectar tu cuenta de Google con acceso a Google Drive");if(a.mode==="demo")return[{fileId:"drv_demo_01",name:"Ensayo_Energia_Sostenible_Borrador.gdoc",mimeType:"application/vnd.google-apps.document",webViewLink:"https://docs.google.com/document",lastModified:"Hoy, 10:30"},{fileId:"drv_demo_02",name:"Presentacion_Historia_Siglo_XX.gslides",mimeType:"application/vnd.google-apps.presentation",webViewLink:"https://docs.google.com/presentation",lastModified:"Ayer"},{fileId:"drv_demo_03",name:"Apuntes_Biologia_Genetica.pdf",mimeType:"application/pdf",webViewLink:"https://drive.google.com",lastModified:"Hace 3 días"},{fileId:"drv_demo_04",name:"Datos_Graficos_Matematicas.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",webViewLink:"https://docs.google.com/spreadsheets",lastModified:"Hace 1 semana"}];const n=xe.getAccessToken();if(!n)throw new Error("El token de sesión de Google ha caducado. Vuelve a iniciar sesión.");const o=encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')"),s=encodeURIComponent("files(id,name,mimeType,webViewLink,iconLink,modifiedTime)"),c=`https://www.googleapis.com/drive/v3/files?pageSize=25&q=${o}&fields=${s}&orderBy=modifiedTime desc`,d=await fetch(c,{headers:{Authorization:`Bearer ${n}`}});if(!d.ok){const v=await d.json().catch(()=>({}));throw new Error(`Error de Google Drive API (${d.status}): ${((h=v.error)==null?void 0:h.message)||d.statusText}`)}return((await d.json()).files||[]).map(v=>({fileId:v.id,name:v.name,mimeType:v.mimeType,iconUrl:v.iconLink,webViewLink:v.webViewLink||`https://drive.google.com/open?id=${v.id}`,lastModified:v.modifiedTime?new Date(v.modifiedTime).toLocaleDateString():"Drive Sync"}))}}const rl=new nl;function il(p){async function a(){await Ls();const d=await pe.projectTasks.toArray();n(d)}function n(d){var $,B,K,re;const b=xe.getState().user,h=(b==null?void 0:b.gradeKey)||"1eso",v=d.filter(q=>!q.gradeKey||q.gradeKey===h||q.gradeKey==="both");p.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${C("tasks.title")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${h==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(b==null?void 0:b.name)||"Estudiante"} • ${(b==null?void 0:b.gradeLevel)||"1º de ESO"}
              </span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${C("tasks.driveIntegration")}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${C("tasks.subtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button id="btn-view-project-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${C("tasks.tooltipPromptProject")}">
              <span>📄</span>
              <span>${C("tasks.btnPromptProject")}</span>
            </button>
            <button id="btn-view-project-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${C("tasks.tooltipCurricularDirective")}">
              <span>🏛️</span>
              <span>${C("tasks.btnCurricularDirective")}</span>
            </button>
            <button id="btn-new-task" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${C("tasks.newTask")}</span>
            </button>
          </div>
        </div>

        <!-- Task Deliverables List -->
        <div class="space-y-6">
          ${v.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${C("tasks.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${C("tasks.emptyDesc")}</p>
              </div>
            `:v.map(q=>`
              <div class="glass-panel p-6 rounded-3xl border ${q.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":q.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-5">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${q.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${q.subject}
                      </span>
                      ${q.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ${C("tasks.grade1esoBadge")}
                            </span>`:q.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                              ${C("tasks.grade2batxBadge")}
                            </span>`:""}
                    </div>
                    <p class="text-xs text-slate-600 mt-1">${q.notes}</p>
                  </div>

                  <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">${C("tasks.dueDate")}: ${q.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">${C("tasks.autonomy")}: ${o(q)}%</span>
                    </div>
                    <button 
                      data-task-prompt-id="${q.id}" 
                      class="btn-view-task-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      title="${C("tasks.tooltipViewTaskPrompt",{title:q.title})}"
                    >
                      <span>🧩</span>
                      <span>${C("tasks.btnViewTaskPrompt")}</span>
                    </button>
                  </div>
                </div>

                ${q.pedagogicalNote?`
                  <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
                  <div class="p-3.5 rounded-2xl ${q.gradeKey==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
                    <span class="text-base flex-shrink-0">🧠</span>
                    <div>
                      <span class="font-bold block">${C("tasks.pedagogicalFoundation")}</span>
                      <span class="leading-relaxed">${q.pedagogicalNote}</span>
                    </div>
                  </div>
                `:""}

                <!-- 4-Phases Progression Stepper -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${C("tasks.phasesTitle")}</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${s(q.id,"planning",C("tasks.phases.planning"),q.currentPhase)}
                    ${s(q.id,"research",C("tasks.phases.research"),q.currentPhase)}
                    ${s(q.id,"writing",C("tasks.phases.writing"),q.currentPhase)}
                    ${s(q.id,"review",C("tasks.phases.review"),q.currentPhase)}
                  </div>
                </div>

                <!-- Google Drive Resources & Autonomy Checklist Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                  
                  <!-- Left: Google Drive Attached Files -->
                  <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">📁</span>
                        <h4 class="font-bold text-xs text-slate-800">${C("tasks.driveDocs")}</h4>
                      </div>
                      <button data-task-drive="${q.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>${C("tasks.attachDrive")}</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      ${q.driveFiles.length===0?`<p class="text-xs text-slate-400 py-2">${C("tasks.noDriveFiles")}</p>`:q.driveFiles.map(Z=>`
                          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                            <div class="flex items-center gap-2 overflow-hidden">
                              <span class="text-base flex-shrink-0">${c(Z.mimeType)}</span>
                              <div class="truncate">
                                <a href="${Z.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${Z.name}</a>
                                <span class="text-[10px] text-slate-400 font-mono">${Z.lastModified||"Sincronizado"}</span>
                              </div>
                            </div>
                            <a href="${Z.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                              ${C("tasks.driveSync")} ↗
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
                        <h4 class="font-bold text-xs text-brand-900">${C("tasks.autonomyMeter")}</h4>
                      </div>
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                        ${o(q)}% ${C("tasks.ownEffort")}
                      </span>
                    </div>

                    <div class="space-y-2">
                      ${q.criteria.map(Z=>`
                        <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                          <input 
                            type="checkbox" 
                            data-task-id="${q.id}" 
                            data-crit-id="${Z.id}" 
                            class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                            ${Z.checked?"checked":""} 
                          />
                          <div>
                            <span class="font-semibold text-slate-800 block ${Z.checked?"line-through text-slate-400":""}">${Z.label}</span>
                            <span class="text-[11px] text-slate-500">${Z.explanation}</span>
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
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${C("tasks.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${C("tasks.modalSubtitle")}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${C("tasks.fieldTitle")}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("tasks.fieldSubject")}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${C("tasks.fieldDue")}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now()+864e5*10).toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${C("tasks.fieldNotes")}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${C("tasks.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${C("tasks.create")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,p.querySelectorAll(".crit-checkbox").forEach(q=>{q.addEventListener("change",async()=>{const Z=Number(q.dataset.taskId),J=q.dataset.critId,oe=d.find(ge=>ge.id===Z);if(oe){const ge=oe.criteria.find(G=>G.id===J);ge&&(ge.checked=q.checked,oe.autonomyScore=o(oe),await pe.projectTasks.update(Z,{criteria:oe.criteria,autonomyScore:oe.autonomyScore}),a())}})}),p.querySelectorAll(".phase-badge-btn").forEach(q=>{q.addEventListener("click",async()=>{const Z=Number(q.dataset.taskId),J=q.dataset.phase;await pe.projectTasks.update(Z,{currentPhase:J}),a()})}),p.querySelectorAll(".btn-attach-drive").forEach(q=>{q.addEventListener("click",async()=>{const Z=Number(q.dataset.taskDrive);try{const J=await rl.getAvailableFiles(),oe=d.find(ge=>ge.id===Z);if(oe&&J.length>0){const ge=J.find(M=>!oe.driveFiles.some(Y=>Y.fileId===M.fileId))||J[0],G=[...oe.driveFiles,ge];await pe.projectTasks.update(Z,{driveFiles:G}),a()}}catch(J){alert(J.message||"Error al conectar con Google Drive")}})});const L=p.querySelector("#new-task-modal");($=p.querySelector("#btn-new-task"))==null||$.addEventListener("click",()=>{L==null||L.classList.remove("hidden")}),(B=p.querySelector("#btn-cancel-nt"))==null||B.addEventListener("click",()=>{L==null||L.classList.add("hidden")}),p.querySelectorAll(".btn-view-task-prompt").forEach(q=>{q.addEventListener("click",()=>{const Z=Number(q.dataset.taskPromptId),J=d.find(te=>te.id===Z);if(!J)return;const oe=J.gradeKey==="2batx"||J.gradeKey==="1eso"?J.gradeKey:h,ge=J.topicId?$e.findTopicById(J.topicId):$e.findTopicBySubjectOrKeyword(J.subject,oe,J.title),G=J.activityId?$e.findActivityById(J.activityId):ge?$e.getActivitiesForTopic(ge.id)[0]:void 0,M=$e.assemblePrompt({role:"project",gradeKey:oe,subject:J.subject,topicId:ge==null?void 0:ge.id,activityId:G==null?void 0:G.id}),Y=document.getElementById("modal-root")||document.body;xt(Y,C("tasks.modalTaskPromptTitle",{title:J.title}),M.systemInstruction,{assembledPrompt:M,subtitle:C("tasks.modalTaskPromptSubtitle",{subject:J.subject}),onClose:()=>{Y.innerHTML=""}})})}),(K=p.querySelector("#btn-view-project-prompt"))==null||K.addEventListener("click",()=>{const q=document.getElementById("modal-root")||document.body,Z=$e.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});xt(q,C("tasks.modalProjectTitle"),Z.systemInstruction,{assembledPrompt:Z,subtitle:C("tasks.modalProjectSubtitle"),onClose:()=>{q.innerHTML=""}})}),(re=p.querySelector("#btn-view-project-curricular"))==null||re.addEventListener("click",async()=>{const q=document.getElementById("modal-root")||document.body,Z=$e.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});xt(q,Z.layers.level2BaseTopic.title,Z.layers.level2BaseTopic.content,{assembledPrompt:Z,subtitle:C("agenda.modalCurricularSubtitle",{grade:h==="2batx"?"2º Bachillerato":"1º de ESO"}),institution:"Departament d'Educació de la Generalitat de Catalunya (Esfer@)",onClose:()=>{q.innerHTML=""}})});const Q=p.querySelector("#new-task-form");Q==null||Q.addEventListener("submit",async q=>{q.preventDefault();const Z=p.querySelector("#nt-title").value,J=p.querySelector("#nt-subject").value,oe=p.querySelector("#nt-due").value,ge=p.querySelector("#nt-notes").value;await pe.projectTasks.add({title:Z,subject:J,gradeKey:h,dueDate:oe,currentPhase:"planning",autonomyScore:25,notes:ge,driveFiles:[{fileId:`drive_${Date.now()}`,name:`${Z.replace(/\s+/g,"_")}_Borrador.gdoc`,mimeType:"application/vnd.google-apps.document",lastModified:"Recién creado"}],criteria:[{id:"c1",label:"Formulación y alcance del proyecto con mis palabras",checked:!0,explanation:"Definido el objetivo inicial de manera autónoma."},{id:"c2",label:"Búsqueda activa y contraste de fuentes fiables",checked:!1,explanation:"Seleccionar fuentes antes de escribir."},{id:"c3",label:"Redacción propia evitando generación automática por IA",checked:!1,explanation:"El texto debe ser fruto de la reflexión del estudiante."},{id:"c4",label:"Revisión crítica de estructura y conclusiones",checked:!1,explanation:"Validar que las conclusiones responden a la hipótesis."}]}),L==null||L.classList.add("hidden"),a()})}function o(d){if(!d.criteria||d.criteria.length===0)return 100;const m=d.criteria.filter(b=>b.checked).length;return Math.round(m/d.criteria.length*100)}function s(d,m,b,h){return`
      <button 
        data-task-id="${d}" 
        data-phase="${m}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${h===m?"bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20":"bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}"
      >
        ${b}
      </button>
    `}function c(d){return d.includes("document")?"📄":d.includes("presentation")||d.includes("slides")?"📊":d.includes("spreadsheet")||d.includes("sheet")?"📈":"📑"}a()}class ol{constructor(){we(this,"activeTab","agenda");we(this,"navbarRoot");we(this,"tabsRoot");we(this,"viewContainer");we(this,"modalRoot");we(this,"isReady",!1);this.navbarRoot=document.getElementById("navbar-root"),this.tabsRoot=document.getElementById("tabs-root"),this.viewContainer=document.getElementById("app-view-container"),this.modalRoot=document.getElementById("modal-root")}async start(){await Xt.init(),await js(),await Cn.register(),Xt.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),xe.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),this.renderHeaderAndTabs(),this.switchView(this.activeTab),this.isReady=!0}renderHeaderAndTabs(){Fs(this.navbarRoot,{onOpenAISettings:()=>this.openAISettingsModal(),onOpenAuth:()=>this.openAuthModal(),onLanguageChange:()=>{}}),Ks(this.tabsRoot,this.activeTab,{onTabChange:a=>{this.activeTab=a,this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}switchView(a){switch(this.viewContainer.innerHTML="",a){case"agenda":Zs(this.viewContainer);break;case"study":al(this.viewContainer);break;case"tasks":il(this.viewContainer);break}}openAISettingsModal(){Gs(this.modalRoot,{onSaved:()=>{this.modalRoot.innerHTML="",this.renderHeaderAndTabs()},onClose:()=>{this.modalRoot.innerHTML=""}})}openAuthModal(){Sn(this.modalRoot,{onClose:()=>{this.modalRoot.innerHTML=""},onStateChanged:()=>{this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}}document.addEventListener("DOMContentLoaded",()=>{new ol().start().catch(a=>{console.error("[Anaxagoras AI] Error al inicializar la aplicación:",a)})});
//# sourceMappingURL=index-BQLcD-BD.js.map
