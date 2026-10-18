var ni=Object.defineProperty;var ri=(d,a,r)=>a in d?ni(d,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[a]=r;var Ie=(d,a,r)=>ri(d,typeof a!="symbol"?a+"":a,r);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const p of s)if(p.type==="childList")for(const u of p.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(s){const p={};return s.integrity&&(p.integrity=s.integrity),s.referrerPolicy&&(p.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?p.credentials="include":s.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function i(s){if(s.ep)return;s.ep=!0;const p=r(s);fetch(s.href,p)}})();const ue=d=>typeof d=="string",Wt=()=>{let d,a;const r=new Promise((i,s)=>{d=i,a=s});return r.resolve=d,r.reject=a,r},xn=d=>d==null?"":String(d),oi=(d,a,r)=>{d.forEach(i=>{a[i]&&(r[i]=a[i])})},ii=/###/g,dr=d=>d&&d.includes("###")?d.replace(ii,"."):d,ur=d=>!d||ue(d),Jt=(d,a,r)=>{const i=ue(a)?a.split("."):a;let s=0;for(;s<i.length-1;){if(ur(d))return{};const p=dr(i[s]);!d[p]&&r&&(d[p]=new r),Object.prototype.hasOwnProperty.call(d,p)?d=d[p]:d={},++s}return ur(d)?{}:{obj:d,k:dr(i[s])}},pr=(d,a,r)=>{const{obj:i,k:s}=Jt(d,a,Object);if(i!==void 0||a.length===1){i[s]=r;return}let p=a[a.length-1],u=a.slice(0,a.length-1),m=Jt(d,u,Object);for(;m.obj===void 0&&u.length;)p=`${u[u.length-1]}.${p}`,u=u.slice(0,u.length-1),m=Jt(d,u,Object),m!=null&&m.obj&&typeof m.obj[`${m.k}.${p}`]<"u"&&(m.obj=void 0);m.obj[`${m.k}.${p}`]=r},si=(d,a,r,i)=>{const{obj:s,k:p}=Jt(d,a,Object);s[p]=s[p]||[],s[p].push(r)},Oa=(d,a)=>{const{obj:r,k:i}=Jt(d,a);if(r&&Object.prototype.hasOwnProperty.call(r,i))return r[i]},li=(d,a,r)=>{const i=Oa(d,r);return i!==void 0?i:Oa(a,r)},Dr=(d,a,r)=>{for(const i in a)i!=="__proto__"&&i!=="constructor"&&(Object.prototype.hasOwnProperty.call(d,i)?ue(d[i])||d[i]instanceof String||ue(a[i])||a[i]instanceof String?r&&(d[i]=a[i]):Dr(d[i],a[i],r):d[i]=a[i]);return d},et=d=>d.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),ci={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},di=d=>ue(d)?d.replace(/[&<>"'\/]/g,a=>ci[a]):d;class ui{constructor(a){this.capacity=a,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(a){const r=this.regExpMap.get(a);if(r!==void 0)return r;const i=new RegExp(a);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(a,i),this.regExpQueue.push(a),i}}const pi=[" ",",","?","!",";"],mi=new ui(20),fi=(d,a,r)=>{a=a||"",r=r||"";const i=pi.filter(u=>!a.includes(u)&&!r.includes(u));if(i.length===0)return!0;const s=mi.getRegExp(`(${i.map(u=>u==="?"?"\\?":u).join("|")})`);let p=!s.test(d);if(!p){const u=d.indexOf(r);u>0&&!s.test(d.substring(0,u))&&(p=!0)}return p},wn=(d,a,r=".")=>{if(!d)return;if(d[a])return Object.prototype.hasOwnProperty.call(d,a)?d[a]:void 0;const i=a.split(r);let s=d;for(let p=0;p<i.length;){if(!s||typeof s!="object")return;let u,m="";for(let b=p;b<i.length;++b)if(b!==p&&(m+=r),m+=i[b],u=s[m],u!==void 0){if(["string","number","boolean"].includes(typeof u)&&b<i.length-1)continue;p+=b-p+1;break}s=u}return s},ea=d=>d==null?void 0:d.replace(/_/g,"-"),gi={type:"logger",log(d){this.output("log",d)},warn(d){this.output("warn",d)},error(d){this.output("error",d)},output(d,a){var r,i;(i=(r=console==null?void 0:console[d])==null?void 0:r.apply)==null||i.call(r,console,a)}};class La{constructor(a,r={}){this.init(a,r)}init(a,r={}){this.prefix=r.prefix||"i18next:",this.logger=a||gi,this.options=r,this.debug=r.debug}log(...a){return this.forward(a,"log","",!0)}warn(...a){return this.forward(a,"warn","",!0)}error(...a){return this.forward(a,"error","")}deprecate(...a){return this.forward(a,"warn","WARNING DEPRECATED: ",!0)}forward(a,r,i,s){return s&&!this.debug?null:(a=a.map(p=>ue(p)?p.replace(/[\r\n\x00-\x1F\x7F]/g," "):p),ue(a[0])&&(a[0]=`${i}${this.prefix} ${a[0]}`),this.logger[r](a))}create(a){return new La(this.logger,{prefix:`${this.prefix}:${a}:`,...this.options})}clone(a){return a=a||this.options,a.prefix=a.prefix||this.prefix,new La(this.logger,a)}}var Ye=new La;class Ma{constructor(){this.observers={}}on(a,r){return a.split(" ").forEach(i=>{this.observers[i]||(this.observers[i]=new Map);const s=this.observers[i].get(r)||0;this.observers[i].set(r,s+1)}),this}off(a,r){if(this.observers[a]){if(!r){delete this.observers[a];return}this.observers[a].delete(r)}}once(a,r){const i=(...s)=>{r(...s),this.off(a,i)};return this.on(a,i),this}emit(a,...r){this.observers[a]&&Array.from(this.observers[a].entries()).forEach(([s,p])=>{for(let u=0;u<p;u++)s(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([s,p])=>{for(let u=0;u<p;u++)s(a,...r)})}}const mr=new WeakSet;class fr extends Ma{constructor(a,r={ns:["translation"],defaultNS:"translation"}){super(),this.data=a||{},this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(a){this.options.ns.includes(a)||this.options.ns.push(a)}removeNamespaces(a){const r=this.options.ns.indexOf(a);r>-1&&this.options.ns.splice(r,1)}getResource(a,r,i,s={}){var h,_;const p=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,u=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let m;a.includes(".")?m=a.split("."):(m=[a,r],i&&(Array.isArray(i)?m.push(...i):ue(i)&&p?m.push(...i.split(p)):m.push(i)));const b=Oa(this.data,m);return!b&&!r&&!i&&a.includes(".")&&(a=m[0],r=m[1],i=m.slice(2).join(".")),b||!u||!ue(i)?b:wn((_=(h=this.data)==null?void 0:h[a])==null?void 0:_[r],i,p)}addResource(a,r,i,s,p={silent:!1}){const u=p.keySeparator!==void 0?p.keySeparator:this.options.keySeparator;let m=[a,r];i&&(m=m.concat(u?i.split(u):i)),a.includes(".")&&(m=a.split("."),s=r,r=m[1]),this.addNamespaces(r),pr(this.data,m,s),p.silent||this.emit("added",a,r,i,s)}addResources(a,r,i,s={silent:!1}){for(const p in i)(ue(i[p])||Array.isArray(i[p]))&&this.addResource(a,r,p,i[p],{silent:!0});s.silent||this.emit("added",a,r,i)}addResourceBundle(a,r,i,s,p,u={silent:!1,skipCopy:!1}){let m=[a,r];a.includes(".")&&(m=a.split("."),s=i,i=r,r=m[1]),this.addNamespaces(r);let b=Oa(this.data,m)||{};u.skipCopy||(i=JSON.parse(JSON.stringify(i))),s?Dr(b,i,p):b={...b,...i},pr(this.data,m,b),u.silent||this.emit("added",a,r,i)}removeResourceBundle(a,r){this.hasResourceBundle(a,r)&&delete this.data[a][r],this.removeNamespaces(r),this.emit("removed",a,r)}hasResourceBundle(a,r){return this.getResource(a,r)!==void 0}getResourceBundle(a,r){return r||(r=this.options.defaultNS),this.getResource(a,r)}getDataByLanguage(a){return this.data[a]}hasLanguageSomeTranslations(a){const r=this.getDataByLanguage(a);return!!(r&&Object.keys(r)||[]).find(s=>{const p=r[s];return mr.has(p)?!0:!p||Object.keys(p).length===0?!1:(typeof p=="object"&&mr.add(p),!0)})}toJSON(){return this.data}}var Ir={processors:{},addPostProcessor(d){this.processors[d.name]=d},handle(d,a,r,i,s){return d.forEach(p=>{var u;a=((u=this.processors[p])==null?void 0:u.process(a,r,i,s))??a}),a}};const Or=Symbol("i18next/PATH_KEY");function bi(){const d=[],a=Object.create(null);let r;return a.get=(i,s)=>{var p;return(p=r==null?void 0:r.revoke)==null||p.call(r),s===Or?d:(d.push(s),r=Proxy.revocable(i,a),r.proxy)},Proxy.revocable(Object.create(null),a).proxy}function Ot(d,a){const{[Or]:r}=d(bi()),i=(a==null?void 0:a.keySeparator)??".",s=(a==null?void 0:a.nsSeparator)??":",p=(a==null?void 0:a.enableSelector)==="strict";if(r.length>1&&s){const u=a==null?void 0:a.ns,m=p?Array.isArray(u)?u:u?[u]:null:Array.isArray(u)?u:null;if(m&&(p?m:m.length>1?m.slice(1):[]).includes(r[0]))return`${r[0]}${s}${r.slice(1).join(i)}`}return r.join(i)}const _n=d=>!ue(d)&&typeof d!="boolean"&&typeof d!="number";class $a extends Ma{constructor(a,r={}){super(),oi(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],a,this),this.options=r,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Ye.create("translator"),this.checkedLoadedFor={}}changeLanguage(a){a&&(this.language=a)}exists(a,r={interpolation:{}}){const i={...r};if(a==null)return!1;const s=this.resolve(a,i);if((s==null?void 0:s.res)===void 0)return!1;const p=_n(s.res);return!(i.returnObjects===!1&&p)}extractFromKey(a,r){let i=r.nsSeparator!==void 0?r.nsSeparator:this.options.nsSeparator;i===void 0&&(i=":");const s=r.keySeparator!==void 0?r.keySeparator:this.options.keySeparator;let p=r.ns||this.options.defaultNS||[];const u=i&&a.includes(i),m=!this.options.userDefinedKeySeparator&&!r.keySeparator&&!this.options.userDefinedNsSeparator&&!r.nsSeparator&&!fi(a,i,s);if(u&&!m){const b=a.match(this.interpolator.nestingRegexp);if(b&&b.length>0)return{key:a,namespaces:ue(p)?[p]:p};const h=a.split(i);(i!==s||i===s&&this.options.ns.includes(h[0]))&&(p=h.shift()),a=h.join(s)}return{key:a,namespaces:ue(p)?[p]:p}}translate(a,r,i){let s=typeof r=="object"?{...r}:r;if(typeof s!="object"&&this.options.overloadTranslationOptionHandler&&(s=this.options.overloadTranslationOptionHandler(arguments)),typeof s=="object"&&(s={...s}),s||(s={}),a==null)return"";typeof a=="function"&&(a=Ot(a,{...this.options,...s})),Array.isArray(a)||(a=[String(a)]),a=a.map(ie=>typeof ie=="function"?Ot(ie,{...this.options,...s}):String(ie));const p=s.returnDetails!==void 0?s.returnDetails:this.options.returnDetails,u=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,{key:m,namespaces:b}=this.extractFromKey(a[a.length-1],s),h=b[b.length-1];let _=s.nsSeparator!==void 0?s.nsSeparator:this.options.nsSeparator;_===void 0&&(_=":");const k=s.lng||this.language,L=s.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((k==null?void 0:k.toLowerCase())==="cimode")return L?p?{res:`${h}${_}${m}`,usedKey:m,exactUsedKey:m,usedLng:k,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:`${h}${_}${m}`:p?{res:m,usedKey:m,exactUsedKey:m,usedLng:k,usedNS:h,usedParams:this.getUsedParamsDetails(s)}:m;const q=this.resolve(a,s);let j=q==null?void 0:q.res;const ee=(q==null?void 0:q.usedKey)||m,K=(q==null?void 0:q.exactUsedKey)||m,O=["[object Number]","[object Function]","[object RegExp]"],B=s.joinArrays!==void 0?s.joinArrays:this.options.joinArrays,ae=!this.i18nFormat||this.i18nFormat.handleAsObject,Y=s.count!==void 0&&!ue(s.count),V=$a.hasDefaultValue(s),W=Y?this.pluralResolver.getSuffix(k,s.count,s):"",X=s.ordinal&&Y?this.pluralResolver.getSuffix(k,s.count,{ordinal:!1}):"",se=Y&&!s.ordinal&&s.count===0,M=se&&s[`defaultValue${this.options.pluralSeparator}zero`]||s[`defaultValue${W}`]||s[`defaultValue${X}`]||s.defaultValue;let ne=j;ae&&!j&&V&&(ne=M);const be=_n(ne),ve=Object.prototype.toString.apply(ne);if(ae&&ne&&be&&!O.includes(ve)&&!(ue(B)&&Array.isArray(ne))){if(!s.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const ie=this.options.returnedObjectHandler?this.options.returnedObjectHandler(ee,ne,{...s,ns:b}):`key '${m} (${this.language})' returned an object instead of string.`;return p?(q.res=ie,q.usedParams=this.getUsedParamsDetails(s),q):ie}if(u){const ie=Array.isArray(ne),de=ie?[]:{},R=ie?K:ee;for(const Z in ne)if(Object.prototype.hasOwnProperty.call(ne,Z)){const Q=`${R}${u}${Z}`;V&&!j?de[Z]=this.translate(Q,{...s,defaultValue:_n(M)?M[Z]:void 0,joinArrays:!1,ns:b}):de[Z]=this.translate(Q,{...s,joinArrays:!1,ns:b}),de[Z]===Q&&(de[Z]=ne[Z])}j=de}}else if(ae&&ue(B)&&Array.isArray(j))j=j.join(B),j&&(j=this.extendTranslation(j,a,s,i));else{let ie=!1,de=!1;!this.isValidLookup(j)&&V&&(ie=!0,j=M),this.isValidLookup(j)||(de=!0,j=m);const Z=(s.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&de?void 0:j,Q=V&&M!==j&&this.options.updateMissing;if(de||ie||Q){if(this.logger.log(Q?"updateKey":"missingKey",k,h,Y&&!Q?`${m}${this.pluralResolver.getSuffix(k,s.count,s)}`:m,Q?M:j),u){const Pe=this.resolve(m,{...s,keySeparator:!1});Pe&&Pe.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let ce=[];const xe=this.languageUtils.getFallbackCodes(this.options.fallbackLng,s.lng||this.language);if(this.options.saveMissingTo==="fallback"&&xe&&xe[0])for(let Pe=0;Pe<xe.length;Pe++)ce.push(xe[Pe]);else this.options.saveMissingTo==="all"?ce=this.languageUtils.toResolveHierarchy(s.lng||this.language):ce.push(s.lng||this.language);const he=(Pe,Ee,He)=>{var rt;const ze=V&&He!==j?He:Z;this.options.missingKeyHandler?this.options.missingKeyHandler(Pe,h,Ee,ze,Q,s):(rt=this.backendConnector)!=null&&rt.saveMissing&&this.backendConnector.saveMissing(Pe,h,Ee,ze,Q,s),this.emit("missingKey",Pe,h,Ee,j)};this.options.saveMissing&&(this.options.saveMissingPlurals&&Y?ce.forEach(Pe=>{const Ee=this.pluralResolver.getSuffixes(Pe,s);se&&s[`defaultValue${this.options.pluralSeparator}zero`]&&!Ee.includes(`${this.options.pluralSeparator}zero`)&&Ee.push(`${this.options.pluralSeparator}zero`),Ee.forEach(He=>{he([Pe],m+He,s[`defaultValue${He}`]||M)})}):he(ce,m,M))}j=this.extendTranslation(j,a,s,q,i),de&&j===m&&this.options.appendNamespaceToMissingKey&&(j=`${h}${_}${m}`),(de||ie)&&this.options.parseMissingKeyHandler&&(j=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${h}${_}${m}`:m,ie?j:void 0,s))}return p?(q.res=j,q.usedParams=this.getUsedParamsDetails(s),q):j}extendTranslation(a,r,i,s,p){var b,h;if((b=this.i18nFormat)!=null&&b.parse)a=this.i18nFormat.parse(a,{...this.options.interpolation.defaultVariables,...i},i.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!i.skipInterpolation){i.interpolation&&this.interpolator.init({...i,interpolation:{...this.options.interpolation,...i.interpolation}});const _=ue(a)&&(((h=i==null?void 0:i.interpolation)==null?void 0:h.skipOnVariables)!==void 0?i.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let k;if(_){const q=a.match(this.interpolator.nestingRegexp);k=q&&q.length}let L=i.replace&&!ue(i.replace)?i.replace:i;if(this.options.interpolation.defaultVariables&&(L={...this.options.interpolation.defaultVariables,...L}),a=this.interpolator.interpolate(a,L,i.lng||this.language||s.usedLng,i),_){const q=a.match(this.interpolator.nestingRegexp),j=q&&q.length;k<j&&(i.nest=!1)}!i.lng&&s&&s.res&&(i.lng=this.language||s.usedLng),i.nest!==!1&&(a=this.interpolator.nest(a,(...q)=>(p==null?void 0:p[0])===q[0]&&!i.context?(this.logger.warn(`It seems you are nesting recursively key: ${q[0]} in key: ${r[0]}`),null):this.translate(...q,r),i)),i.interpolation&&this.interpolator.reset()}const u=i.postProcess||this.options.postProcess,m=ue(u)?[u]:u;return a!=null&&(m!=null&&m.length)&&i.applyPostProcessor!==!1&&(a=Ir.handle(m,a,r,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(i)},...i}:i,this)),a}resolve(a,r={}){let i,s,p,u,m;return ue(a)&&(a=[a]),Array.isArray(a)&&(a=a.map(b=>typeof b=="function"?Ot(b,{...this.options,...r}):b)),a.forEach(b=>{if(this.isValidLookup(i))return;const h=this.extractFromKey(b,r),_=h.key;s=_;let k=h.namespaces;this.options.fallbackNS&&(k=k.concat(this.options.fallbackNS));const L=r.count!==void 0&&!ue(r.count),q=L&&!r.ordinal&&r.count===0,j=r.context!==void 0&&(ue(r.context)||typeof r.context=="number")&&r.context!=="",ee=r.lngs?r.lngs:this.languageUtils.toResolveHierarchy(r.lng||this.language,r.fallbackLng);k.forEach(K=>{var O,B;this.isValidLookup(i)||(m=K,!this.checkedLoadedFor[`${ee[0]}-${K}`]&&((O=this.utils)!=null&&O.hasLoadedNamespace)&&!((B=this.utils)!=null&&B.hasLoadedNamespace(m))&&(this.checkedLoadedFor[`${ee[0]}-${K}`]=!0,this.logger.warn(`key "${s}" for languages "${ee.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),ee.forEach(ae=>{var W;if(this.isValidLookup(i))return;u=ae;const Y=[_];if((W=this.i18nFormat)!=null&&W.addLookupKeys)this.i18nFormat.addLookupKeys(Y,_,ae,K,r);else{let X;L&&(X=this.pluralResolver.getSuffix(ae,r.count,r));const se=`${this.options.pluralSeparator}zero`,M=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(L&&(r.ordinal&&X.startsWith(M)&&Y.push(_+X.replace(M,this.options.pluralSeparator)),Y.push(_+X),q&&Y.push(_+se)),j){const ne=`${_}${this.options.contextSeparator||"_"}${r.context}`;Y.push(ne),L&&(r.ordinal&&X.startsWith(M)&&Y.push(ne+X.replace(M,this.options.pluralSeparator)),Y.push(ne+X),q&&Y.push(ne+se))}}let V;for(;V=Y.pop();)this.isValidLookup(i)||(p=V,i=this.getResource(ae,K,V,r))}))})}),{res:i,usedKey:s,exactUsedKey:p,usedLng:u,usedNS:m}}isValidLookup(a){return a!==void 0&&!(!this.options.returnNull&&a===null)&&!(!this.options.returnEmptyString&&a==="")}getResource(a,r,i,s={}){var p;return(p=this.i18nFormat)!=null&&p.getResource?this.i18nFormat.getResource(a,r,i,s):this.resourceStore.getResource(a,r,i,s)}getUsedParamsDetails(a={}){const r=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],i=a.replace&&!ue(a.replace);let s=i?a.replace:a;if(i&&typeof a.count<"u"&&(s={...s,count:a.count}),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!i){s={...s};for(const p of r)delete s[p]}return s}static hasDefaultValue(a){const r="defaultValue";for(const i in a)if(Object.prototype.hasOwnProperty.call(a,i)&&i.startsWith(r)&&a[i]!==void 0)return!0;return!1}}class gr{constructor(a){this.options=a,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Ye.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(a){if(a=ea(a),!a||!a.includes("-"))return null;const r=a.split("-");return r.length===2||(r.pop(),r[r.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(r.join("-"))}getLanguagePartFromCode(a){if(a=ea(a),!a||!a.includes("-"))return a;const r=a.split("-");return this.formatLanguageCode(r[0])}formatLanguageCode(a){if(ue(a)&&a.includes("-")){let r;try{r=Intl.getCanonicalLocales(a)[0]}catch{}return r&&this.options.lowerCaseLng&&(r=r.toLowerCase()),r||(this.options.lowerCaseLng?a.toLowerCase():a)}return this.options.cleanCode||this.options.lowerCaseLng?a.toLowerCase():a}isSupportedCode(a){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(a=this.getLanguagePartFromCode(a)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(a)}getBestMatchFromCodes(a){if(!a)return null;let r;return a.forEach(i=>{if(r)return;const s=this.formatLanguageCode(i);(!this.options.supportedLngs||this.isSupportedCode(s))&&(r=s)}),!r&&this.options.supportedLngs&&a.forEach(i=>{if(r)return;const s=this.getScriptPartFromCode(i);if(this.isSupportedCode(s))return r=s;const p=this.getLanguagePartFromCode(i);if(this.isSupportedCode(p))return r=p;r=this.options.supportedLngs.find(u=>u===p?!0:!u.includes("-")&&!p.includes("-")?!1:!!(u.includes("-")&&!p.includes("-")&&u.slice(0,u.indexOf("-"))===p||u.startsWith(p)&&p.length>1))}),r||(r=this.getFallbackCodes(this.options.fallbackLng)[0]),r}getFallbackCodes(a,r){if(!a)return[];if(typeof a=="function"&&(a=a(r)),ue(a)&&(a=[a]),Array.isArray(a))return a;if(!r)return a.default||[];let i=a[r];return i||(i=a[this.getScriptPartFromCode(r)]),i||(i=a[this.formatLanguageCode(r)]),i||(i=a[this.getLanguagePartFromCode(r)]),i||(i=a.default),i||[]}toResolveHierarchy(a,r){const i=this.options.fallbackLng,s=Array.isArray(i)?i.join("|"):i;s!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=s);const p=r===void 0||r===!1||ue(r),u=r===void 0&&typeof this.options.fallbackLng=="function",m=ue(a)&&p&&!u;let b=null;if(m){let L;r===void 0?L="undefined":r===!1?L="boolean:false":L=`string:${r}`,b=`${a.length}:${a}|${L}`}if(b!==null){const L=this.resolveHierarchyCache[b];if(L!==void 0)return L.slice()}const h=this.getFallbackCodes((r===!1?[]:r)||this.options.fallbackLng||[],a),_=[],k=L=>{L&&(this.isSupportedCode(L)?_.push(L):this.logger.warn(`rejecting language code not found in supportedLngs: ${L}`))};return ue(a)&&(a.includes("-")||a.includes("_"))?(this.options.load!=="languageOnly"&&k(this.formatLanguageCode(a)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&k(this.getScriptPartFromCode(a)),this.options.load!=="currentOnly"&&k(this.getLanguagePartFromCode(a))):ue(a)&&k(this.formatLanguageCode(a)),h.forEach(L=>{_.includes(L)||k(this.formatLanguageCode(L))}),b!==null?(this.resolveHierarchyCache[b]=_,_.slice()):_}}const br={zero:0,one:1,two:2,few:3,many:4,other:5},hr={select:d=>d===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class hi{constructor(a,r={}){this.languageUtils=a,this.options=r,this.logger=Ye.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(a,r={}){const i=ea(a==="dev"?"en":a),s=r.ordinal?"ordinal":"cardinal",p=JSON.stringify({cleanedCode:i,type:s});if(p in this.pluralRulesCache)return this.pluralRulesCache[p];let u;try{u=new Intl.PluralRules(i,{type:s})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),hr;if(!a.match(/-|_/))return hr;const b=this.languageUtils.getLanguagePartFromCode(a);u=this.getRule(b,r)}return this.pluralRulesCache[p]=u,u}needsPlural(a,r={}){let i=this.getRule(a,r);return i||(i=this.getRule("dev",r)),(i==null?void 0:i.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(a,r,i={}){return this.getSuffixes(a,i).map(s=>`${r}${s}`)}getSuffixes(a,r={}){let i=this.getRule(a,r);return i||(i=this.getRule("dev",r)),i?i.resolvedOptions().pluralCategories.sort((s,p)=>br[s]-br[p]).map(s=>`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s}`):[]}getSuffix(a,r,i={}){const s=this.getRule(a,i);return s?`${this.options.prepend}${i.ordinal?`ordinal${this.options.prepend}`:""}${s.select(r)}`:(this.logger.warn(`no plural rule found for: ${a}`),this.getSuffix("dev",r,i))}}const vr=(d,a,r,i=".",s=!0)=>{let p=li(d,a,r);return!p&&s&&ue(r)&&(p=wn(d,r,i),p===void 0&&(p=wn(a,r,i))),p},yr=d=>d.replace(/\$/g,"$$$$");class xr{constructor(a={}){var r;this.logger=Ye.create("interpolator"),this.options=a,this.format=((r=a==null?void 0:a.interpolation)==null?void 0:r.format)||(i=>i),this.init(a)}init(a={}){a.interpolation||(a.interpolation={escapeValue:!0});const{escape:r,escapeValue:i,useRawValueToEscape:s,prefix:p,prefixEscaped:u,suffix:m,suffixEscaped:b,formatSeparator:h,unescapeSuffix:_,unescapePrefix:k,nestingPrefix:L,nestingPrefixEscaped:q,nestingSuffix:j,nestingSuffixEscaped:ee,nestingOptionsSeparator:K,maxReplaces:O,alwaysFormat:B}=a.interpolation;this.escape=r!==void 0?r:di,this.escapeValue=i!==void 0?i:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=p?et(p):u||"{{",this.suffix=m?et(m):b||"}}",this.formatSeparator=h||",",this.unescapePrefix=_?"":k?et(k):"-",this.unescapeSuffix=this.unescapePrefix?"":_?et(_):"",this.nestingPrefix=L?et(L):q||et("$t("),this.nestingSuffix=j?et(j):ee||et(")"),this.nestingOptionsSeparator=K||",",this.maxReplaces=O||1e3,this.alwaysFormat=B!==void 0?B:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const a=(r,i)=>(r==null?void 0:r.source)===i?(r.lastIndex=0,r):new RegExp(i,"g");this.regexp=a(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=a(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=a(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(a,r,i,s){var q;let p,u,m;const b=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},h=j=>{if(!j.includes(this.formatSeparator)){const B=vr(r,b,j,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(B,void 0,i,{...s,...r,interpolationkey:j}):B}const ee=j.split(this.formatSeparator),K=ee.shift().trim(),O=ee.join(this.formatSeparator).trim();return this.format(vr(r,b,K,this.options.keySeparator,this.options.ignoreJSONStructure),O,i,{...s,...r,interpolationkey:K})};this.resetRegExp(),!this.escapeValue&&typeof a=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(a)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const _=(s==null?void 0:s.missingInterpolationHandler)||this.options.missingInterpolationHandler,k=((q=s==null?void 0:s.interpolation)==null?void 0:q.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:j=>j},{regex:this.regexp,safeValue:j=>this.escapeValue?this.escape(j):j}].forEach(j=>{for(m=0;p=j.regex.exec(a);){const ee=p[1].trim();if(u=h(ee),u===void 0)if(typeof _=="function"){const O=_(a,p,s);u=ue(O)?O:""}else if(s&&Object.prototype.hasOwnProperty.call(s,ee))u="";else if(k){u=p[0];continue}else this.logger.warn(`missed to pass in variable ${ee} for interpolating ${a}`),u="";else!ue(u)&&!this.useRawValueToEscape&&(u=xn(u));const K=j.safeValue(u);if(a=a.replace(p[0],yr(K)),k?(j.regex.lastIndex+=K.length,j.regex.lastIndex-=p[0].length):j.regex.lastIndex=0,m++,m>=this.maxReplaces)break}}),a}nest(a,r,i={}){let s,p,u;const m=(b,h)=>{const _=this.nestingOptionsSeparator;if(!b.includes(_))return b;const k=b.split(new RegExp(`${et(_)}[ ]*{`));let L=`{${k[1]}`;b=k[0],L=this.interpolate(L,u);const q=L.match(/'/g),j=L.match(/"/g);(((q==null?void 0:q.length)??0)%2===0&&!j||((j==null?void 0:j.length)??0)%2!==0)&&(L=L.replace(/'/g,'"'));try{u=JSON.parse(L),h&&(u={...h,...u})}catch(ee){return this.logger.warn(`failed parsing options string in nesting for key ${b}`,ee),`${b}${_}${L}`}return u.defaultValue&&u.defaultValue.includes(this.prefix)&&delete u.defaultValue,b};for(;s=this.nestingRegexp.exec(a);){let b=[];u={...i},u=u.replace&&!ue(u.replace)?u.replace:u,u.applyPostProcessor=!1,delete u.defaultValue;const h=/{.*}/s.test(s[1])?s[1].lastIndexOf("}")+1:s[1].indexOf(this.formatSeparator);if(h!==-1&&(b=s[1].slice(h).split(this.formatSeparator).map(_=>_.trim()).filter(Boolean),s[1]=s[1].slice(0,h)),p=r(m.call(this,s[1].trim(),u),u),p&&s[0]===a&&!ue(p))return p;ue(p)||(p=xn(p)),p||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${a}`),p=""),b.length&&(p=b.reduce((_,k)=>this.format(_,k,i.lng,{...i,interpolationkey:s[1].trim()}),p.trim())),a=a.replace(s[0],yr(xn(p))),this.regexp.lastIndex=0}return a}}const vi=d=>{let a=d.toLowerCase().trim();const r={};if(d.includes("(")){const i=d.split("(");a=i[0].toLowerCase().trim();const s=i[1].slice(0,-1);a==="currency"&&!s.includes(":")?r.currency||(r.currency=s.trim()):a==="relativetime"&&!s.includes(":")?r.range||(r.range=s.trim()):s.split(";").forEach(u=>{if(u){const[m,...b]=u.split(":"),h=b.join(":").trim().replace(/^'+|'+$/g,""),_=m.trim();r[_]||(r[_]=h),h==="false"&&(r[_]=!1),h==="true"&&(r[_]=!0),isNaN(h)||(r[_]=parseInt(h,10))}})}return{formatName:a,formatOptions:r}},_r=d=>{const a={};return(r,i,s)=>{let p=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(p={...p,[s.interpolationkey]:void 0});const u=i+JSON.stringify(p);let m=a[u];return m||(m=d(ea(i),s),a[u]=m),m(r)}},yi=d=>(a,r,i)=>d(ea(r),i)(a);class xi{constructor(a={}){this.logger=Ye.create("formatter"),this.options=a,this.init(a)}init(a,r={interpolation:{}}){this.formatSeparator=r.interpolation.formatSeparator||",";const i=r.cacheInBuiltFormats?_r:yi;this.formats={number:i((s,p)=>{const u=new Intl.NumberFormat(s,{...p});return m=>u.format(m)}),currency:i((s,p)=>{const u=new Intl.NumberFormat(s,{...p,style:"currency"});return m=>u.format(m)}),datetime:i((s,p)=>{const u=new Intl.DateTimeFormat(s,{...p});return m=>u.format(m)}),relativetime:i((s,p)=>{const u=new Intl.RelativeTimeFormat(s,{...p});return m=>u.format(m,p.range||"day")}),list:i((s,p)=>{const u=new Intl.ListFormat(s,{...p});return m=>u.format(m)})}}add(a,r){this.formats[a.toLowerCase().trim()]=r}addCached(a,r){this.formats[a.toLowerCase().trim()]=_r(r)}format(a,r,i,s={}){if(!r||a==null)return a;const p=r.split(this.formatSeparator),u=[];for(let b=0;b<p.length;b++){let h=p[b];for(;h.indexOf("(")>-1&&!h.includes(")")&&b+1<p.length;)h=`${h}${this.formatSeparator}${p[++b]}`;u.push(h)}return u.reduce((b,h)=>{var L;const{formatName:_,formatOptions:k}=vi(h);if(this.formats[_]){let q=b;try{const j=((L=s==null?void 0:s.formatParams)==null?void 0:L[s.interpolationkey])||{},ee=j.locale||j.lng||s.locale||s.lng||i;q=this.formats[_](b,ee,{...k,...s,...j})}catch(j){this.logger.warn(j)}return q}else this.logger.warn(`there was no format function for ${_}`);return b},a)}}const _i=(d,a)=>{d.pending[a]!==void 0&&(delete d.pending[a],d.pendingCount--)};class Ci extends Ma{constructor(a,r,i,s={}){var p,u;super(),this.backend=a,this.store=r,this.services=i,this.languageUtils=i.languageUtils,this.options=s,this.logger=Ye.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],(u=(p=this.backend)==null?void 0:p.init)==null||u.call(p,i,s.backend,s)}queueLoad(a,r,i,s){const p={},u={},m={},b={};return a.forEach(h=>{let _=!0;r.forEach(k=>{const L=`${h}|${k}`;!i.reload&&this.store.hasResourceBundle(h,k)?this.state[L]=2:this.state[L]<0||(this.state[L]===1?u[L]===void 0&&(u[L]=!0):(this.state[L]=1,_=!1,u[L]===void 0&&(u[L]=!0),p[L]===void 0&&(p[L]=!0),b[k]===void 0&&(b[k]=!0)))}),_||(m[h]=!0)}),(Object.keys(p).length||Object.keys(u).length)&&this.queue.push({pending:u,pendingCount:Object.keys(u).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(p),pending:Object.keys(u),toLoadLanguages:Object.keys(m),toLoadNamespaces:Object.keys(b)}}loaded(a,r,i){const s=a.split("|"),p=s[0],u=s[1];r&&this.emit("failedLoading",p,u,r),!r&&i&&this.store.addResourceBundle(p,u,i,void 0,void 0,{skipCopy:!0}),this.state[a]=r?-1:2,r&&i&&(this.state[a]=0);const m={};this.queue.forEach(b=>{si(b.loaded,[p],u),_i(b,a),r&&b.errors.push(r),b.pendingCount===0&&!b.done&&(Object.keys(b.loaded).forEach(h=>{m[h]||(m[h]={});const _=b.loaded[h];_.length&&_.forEach(k=>{m[h][k]===void 0&&(m[h][k]=!0)})}),b.done=!0,b.errors.length?b.callback(b.errors):b.callback())}),this.emit("loaded",m),this.queue=this.queue.filter(b=>!b.done)}read(a,r,i,s=0,p=this.retryTimeout,u){if(!a.length)return u(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:a,ns:r,fcName:i,tried:s,wait:p,callback:u});return}this.readingCalls++;const m=(h,_)=>{if(this.readingCalls--,this.waitingReads.length>0){const k=this.waitingReads.shift();this.read(k.lng,k.ns,k.fcName,k.tried,k.wait,k.callback)}if(h&&_&&s<this.maxRetries){setTimeout(()=>{this.read(a,r,i,s+1,p*2,u)},p);return}u(h,_)},b=this.backend[i].bind(this.backend);if(b.length===2){try{const h=b(a,r);h&&typeof h.then=="function"?h.then(_=>m(null,_)).catch(m):m(null,h)}catch(h){m(h)}return}return b(a,r,m)}prepareLoading(a,r,i={},s){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();ue(a)&&(a=this.languageUtils.toResolveHierarchy(a)),ue(r)&&(r=[r]);const p=this.queueLoad(a,r,i,s);if(!p.toLoad.length)return p.pending.length||s(),null;p.toLoad.forEach(u=>{this.loadOne(u)})}load(a,r,i){this.prepareLoading(a,r,{},i)}reload(a,r,i){this.prepareLoading(a,r,{reload:!0},i)}loadOne(a,r=""){const i=a.split("|"),s=i[0],p=i[1];this.read(s,p,"read",void 0,void 0,(u,m)=>{u&&this.logger.warn(`${r}loading namespace ${p} for language ${s} failed`,u),!u&&m&&this.logger.log(`${r}loaded namespace ${p} for language ${s}`,m),this.loaded(a,u,m)})}saveMissing(a,r,i,s,p,u={},m=()=>{}){var b,h,_,k,L;if((h=(b=this.services)==null?void 0:b.utils)!=null&&h.hasLoadedNamespace&&!((k=(_=this.services)==null?void 0:_.utils)!=null&&k.hasLoadedNamespace(r))){this.logger.warn(`did not save key "${i}" as the namespace "${r}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(i==null||i==="")){if((L=this.backend)!=null&&L.create){const q={...u,isUpdate:p},j=this.backend.create.bind(this.backend);if(j.length<6)try{let ee;j.length===5?ee=j(a,r,i,s,q):ee=j(a,r,i,s),ee&&typeof ee.then=="function"?ee.then(K=>m(null,K)).catch(m):m(null,ee)}catch(ee){m(ee)}else j(a,r,i,s,m,q)}!a||!a[0]||this.store.addResource(a[0],r,i,s)}}}const Cn=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:d=>{let a={};if(typeof d[1]=="object"&&(a=d[1]),ue(d[1])&&(a.defaultValue=d[1]),ue(d[2])&&(a.tDescription=d[2]),typeof d[2]=="object"||typeof d[3]=="object"){const r=d[3]||d[2];Object.keys(r).forEach(i=>{a[i]=r[i]})}return a},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),Cr=d=>(ue(d.ns)&&(d.ns=[d.ns]),ue(d.fallbackLng)&&(d.fallbackLng=[d.fallbackLng]),ue(d.fallbackNS)&&(d.fallbackNS=[d.fallbackNS]),d.supportedLngs&&!d.supportedLngs.includes("cimode")&&(d.supportedLngs=d.supportedLngs.concat(["cimode"])),d),Da=()=>{},wi=d=>{Object.getOwnPropertyNames(Object.getPrototypeOf(d)).forEach(r=>{typeof d[r]=="function"&&(d[r]=d[r].bind(d))})};class Zt extends Ma{constructor(a={},r){if(super(),this.options=Cr(a),this.services={},this.logger=Ye,this.modules={external:[]},wi(this),r&&!this.isInitialized&&!a.isClone){if(!this.options.initAsync)return this.init(a,r),this;setTimeout(()=>{this.init(a,r)},0)}}init(a={},r){this.isInitializing=!0,typeof a=="function"&&(r=a,a={}),a.defaultNS==null&&a.ns&&(ue(a.ns)?a.defaultNS=a.ns:a.ns.includes("translation")||(a.defaultNS=a.ns[0]));const i=Cn();this.options={...i,...this.options,...Cr(a)},this.options.interpolation={...i.interpolation,...this.options.interpolation},a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=i.overloadTranslationOptionHandler);const s=h=>h?typeof h=="function"?new h:h:null;if(!this.options.isClone){this.modules.logger?Ye.init(s(this.modules.logger),this.options):Ye.init(null,this.options);let h;this.modules.formatter?h=this.modules.formatter:h=xi;const _=new gr(this.options);this.store=new fr(this.options.resources,this.options);const k=this.services;k.logger=Ye,k.resourceStore=this.store,k.languageUtils=_,k.pluralResolver=new hi(_,{prepend:this.options.pluralSeparator}),h&&(k.formatter=s(h),k.formatter.init&&k.formatter.init(k,this.options),this.options.interpolation.format=k.formatter.format.bind(k.formatter)),k.interpolator=new xr(this.options),k.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},k.backendConnector=new Ci(s(this.modules.backend),k.resourceStore,k,this.options),k.backendConnector.on("*",(L,...q)=>{this.emit(L,...q)}),this.modules.languageDetector&&(k.languageDetector=s(this.modules.languageDetector),k.languageDetector.init&&k.languageDetector.init(k,this.options.detection,this.options)),this.modules.i18nFormat&&(k.i18nFormat=s(this.modules.i18nFormat),k.i18nFormat.init&&k.i18nFormat.init(this)),this.translator=new $a(this.services,this.options),this.translator.on("*",(L,...q)=>{this.emit(L,...q)}),this.modules.external.forEach(L=>{L.init&&L.init(this)})}if(this.format=this.options.interpolation.format,r||(r=Da),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const h=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);h.length>0&&h[0]!=="dev"&&(this.options.lng=h[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(h=>{this[h]=(..._)=>this.store[h](..._)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(h=>{this[h]=(..._)=>(this.store[h](..._),this)});const m=Wt(),b=()=>{const h=(_,k)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),m.resolve(k),r(_,k)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return h(null,this.t.bind(this));this.changeLanguage(this.options.lng,h)};return this.options.resources||!this.options.initAsync?b():setTimeout(b,0),m}loadResources(a,r=Da){var p,u;let i=r;const s=ue(a)?a:this.language;if(typeof a=="function"&&(i=a),!this.options.resources||this.options.partialBundledLanguages){if((s==null?void 0:s.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return i();const m=[],b=h=>{if(!h||h==="cimode")return;this.services.languageUtils.toResolveHierarchy(h).forEach(k=>{k!=="cimode"&&(m.includes(k)||m.push(k))})};s?b(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(_=>b(_)),(u=(p=this.options.preload)==null?void 0:p.forEach)==null||u.call(p,h=>b(h)),this.services.backendConnector.load(m,this.options.ns,h=>{!h&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),i(h)})}else i(null)}reloadResources(a,r,i){const s=Wt();return typeof a=="function"&&(i=a,a=void 0),typeof r=="function"&&(i=r,r=void 0),a||(a=this.languages),r||(r=this.options.ns),i||(i=Da),this.services.backendConnector.reload(a,r,p=>{s.resolve(),i(p)}),s}use(a){if(!a)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!a.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return a.type==="backend"&&(this.modules.backend=a),(a.type==="logger"||a.log&&a.warn&&a.error)&&(this.modules.logger=a),a.type==="languageDetector"&&(this.modules.languageDetector=a),a.type==="i18nFormat"&&(this.modules.i18nFormat=a),a.type==="postProcessor"&&Ir.addPostProcessor(a),a.type==="formatter"&&(this.modules.formatter=a),a.type==="3rdParty"&&this.modules.external.push(a),this}setResolvedLanguage(a){if(!(!a||!this.languages)&&!["cimode","dev"].includes(a)){for(let r=0;r<this.languages.length;r++){const i=this.languages[r];if(!["cimode","dev"].includes(i)&&this.store.hasLanguageSomeTranslations(i)){this.resolvedLanguage=i;break}}!this.resolvedLanguage&&!this.languages.includes(a)&&this.store.hasLanguageSomeTranslations(a)&&(this.resolvedLanguage=a,this.languages.unshift(a))}}changeLanguage(a,r){this.isLanguageChangingTo=a;const i=Wt();this.emit("languageChanging",a);const s=m=>{this.language=m,this.languages=this.services.languageUtils.toResolveHierarchy(m),this.resolvedLanguage=void 0,this.setResolvedLanguage(m)},p=(m,b)=>{b?this.isLanguageChangingTo===a&&(s(b),this.translator.changeLanguage(b),this.isLanguageChangingTo=void 0,this.emit("languageChanged",b),this.logger.log("languageChanged",b)):this.isLanguageChangingTo=void 0,i.resolve((...h)=>this.t(...h)),r&&r(m,(...h)=>this.t(...h))},u=m=>{var _,k;!a&&!m&&this.services.languageDetector&&(m=[]);const b=ue(m)?m:m&&m[0],h=this.store.hasLanguageSomeTranslations(b)?b:this.services.languageUtils.getBestMatchFromCodes(ue(m)?[m]:m);h&&(this.language||s(h),this.translator.language||this.translator.changeLanguage(h),(k=(_=this.services.languageDetector)==null?void 0:_.cacheUserLanguage)==null||k.call(_,h)),this.loadResources(h,L=>{p(L,h)})};return!a&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!a&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(a),i}getFixedT(a,r,i,s){const p=s==null?void 0:s.scopeNs,u=(m,b,...h)=>{let _;typeof b!="object"?_=this.options.overloadTranslationOptionHandler([m,b].concat(h)):_={...b},_.lng=_.lng||u.lng,_.lngs=_.lngs||u.lngs;const k=_.ns!==void 0&&_.ns!==null;_.ns=_.ns||u.ns,_.keyPrefix!==""&&(_.keyPrefix=_.keyPrefix||i||u.keyPrefix);const L={...this.options,..._};Array.isArray(p)&&!k&&(L.ns=p),typeof _.keyPrefix=="function"&&(_.keyPrefix=Ot(_.keyPrefix,L));const q=this.options.keySeparator||".";let j;return _.keyPrefix&&Array.isArray(m)?j=m.map(ee=>(typeof ee=="function"&&(ee=Ot(ee,L)),`${_.keyPrefix}${q}${ee}`)):(typeof m=="function"&&(m=Ot(m,L)),j=_.keyPrefix?`${_.keyPrefix}${q}${m}`:m),this.t(j,_)};return ue(a)?u.lng=a:u.lngs=a,u.ns=r,u.keyPrefix=i,u}t(...a){var r;return(r=this.translator)==null?void 0:r.translate(...a)}exists(...a){var r;return(r=this.translator)==null?void 0:r.exists(...a)}setDefaultNamespace(a){this.options.defaultNS=a}hasLoadedNamespace(a,r={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const i=r.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,p=this.languages[this.languages.length-1];if(i.toLowerCase()==="cimode")return!0;const u=(m,b)=>{const h=this.services.backendConnector.state[`${m}|${b}`];return h===-1||h===0||h===2};if(r.precheck){const m=r.precheck(this,u);if(m!==void 0)return m}return!!(this.hasResourceBundle(i,a)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||u(i,a)&&(!s||u(p,a)))}loadNamespaces(a,r){const i=Wt();return this.options.ns?(ue(a)&&(a=[a]),a.forEach(s=>{this.options.ns.includes(s)||this.options.ns.push(s)}),this.loadResources(s=>{i.resolve(),r&&r(s)}),i):(r&&r(),Promise.resolve())}loadLanguages(a,r){const i=Wt();ue(a)&&(a=[a]);const s=this.options.preload||[],p=a.filter(u=>!s.includes(u)&&this.services.languageUtils.isSupportedCode(u));return p.length?(this.options.preload=s.concat(p),this.loadResources(u=>{i.resolve(),r&&r(u)}),i):(r&&r(),Promise.resolve())}dir(a){var s,p;if(a||(a=this.resolvedLanguage||(((s=this.languages)==null?void 0:s.length)>0?this.languages[0]:this.language)),!a)return"rtl";try{const u=new Intl.Locale(a);if(u&&u.getTextInfo){const m=u.getTextInfo();if(m&&m.direction)return m.direction}}catch{}const r=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],i=((p=this.services)==null?void 0:p.languageUtils)||new gr(Cn());return a.toLowerCase().indexOf("-latn")>1?"ltr":r.includes(i.getLanguagePartFromCode(a))||a.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(a={},r){const i=new Zt(a,r);return i.createInstance=Zt.createInstance,i}cloneInstance(a={},r=Da){const i=a.forkResourceStore;i&&delete a.forkResourceStore;const s={...this.options,...a,isClone:!0},p=new Zt(s);if((a.debug!==void 0||a.prefix!==void 0)&&(p.logger=p.logger.clone(a)),["store","services","language"].forEach(m=>{p[m]=this[m]}),p.services={...this.services},p.services.utils={hasLoadedNamespace:p.hasLoadedNamespace.bind(p)},i){const m=Object.keys(this.store.data).reduce((b,h)=>(b[h]={...this.store.data[h]},b[h]=Object.keys(b[h]).reduce((_,k)=>(_[k]={...b[h][k]},_),b[h]),b),{});p.store=new fr(m,s),p.services.resourceStore=p.store}if(a.interpolation){const b={...Cn().interpolation,...this.options.interpolation,...a.interpolation},h={...s,interpolation:b};p.services.interpolator=new xr(h)}return p.translator=new $a(p.services,s),p.translator.on("*",(m,...b)=>{p.emit(m,...b)}),p.init(s,r),p.translator.options=s,p.translator.backendConnector.services.utils={hasLoadedNamespace:p.hasLoadedNamespace.bind(p)},p}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const je=Zt.createInstance();je.createInstance;je.dir;je.init;je.loadResources;je.reloadResources;je.use;je.changeLanguage;je.getFixedT;je.t;je.exists;je.setDefaultNamespace;je.hasLoadedNamespace;je.loadNamespaces;je.loadLanguages;const Pi={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, no copiando",criticalThinking:"Pensamiento crítico activo • Sin trampas de IA"},Ai={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar & Drive sincronizados"},Si={agenda:"Agenda",study:"Estudio / Repaso",tasks:"Trabajos",tutorBadge:"Tutor IA"},Ei={nextMilestone:"Próximo Hito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoy",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodología activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados en tu cuenta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudio",autonomousOrg:"Organización autónoma",subtitle:"Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.",addBlock:"Añadir Bloque de Estudio",emptyTitle:"No hay bloques de estudio programados.",emptyDesc:'Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.',pendingSync:"Pendiente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Añadir Bloque de Estudio",modalSubtitle:"Planifica un hito para organizar tu tiempo de aprendizaje.",fieldActivity:"Título de la actividad",fieldSubject:"Asignatura",fieldType:"Tipo de Hito",fieldDate:"Fecha",fieldTime:"Hora Inicio",fieldNotes:"Notas u objetivo personal",cancel:"Cancelar",save:"Guardar Bloque",types:{study_session:"Sesión de estudio (45 min)",exam:"Examen lectivo",assignment_due:"Entrega de trabajo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Agenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador de Agenda",modalPlannerSubtitle:"Estructura Propia de 4 Pilares: Distribución Homogénea, Prioridad y Fechas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},ki={bannerTitle:"Marco de Aprendizaje Socrático Activo",bannerDesc:"La IA guía tu pensamiento con preguntas reflexivas. Prohibido obtener soluciones automáticas para garantizar tu crecimiento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveles: Funcional • Regulador LOMLOE • Línea Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveles)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividad / Variación:",stepPrefix:"Paso",baselineConcepts:"Línea Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Generador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inyección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarjeta de Autoevaluación",flashcardSubtitle:"Explica con tus palabras antes de ver la explicación:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar luego",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Hazme una pregunta diagnóstica",chip2:"💡 Dame una pista reflexiva",chip3:"🎯 ¿Voy por buen camino?",inputPlaceholder:"Escribe tu razonamiento o duda... (Enter para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: la IA fomenta tu propio esfuerzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Tú",taskListTitle:"Tareas de Estudio y Repaso Activo",taskListSubtitle:"Selecciona una tarea para iniciar la sesión guiada con el tutor socrático. Solo puede haber una tarea activa a la vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversación",completionBannerTitle:"¡Objetivo pedagógico completado!",completionBannerDesc:"Has revisado y asimilado todo el contenido exigido por el nivel pedagógico.",btnNextVariation:"Siguiente variación",btnReopenChat:"Seguir consultando",indexedDbSavedNotice:"Conversación y progreso guardados en tiempo real en IndexedDB",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interacciones",pedagogicalAnchor:"Fundamentación Pedagógica LOMLOE",pauseNotice:"En pausa (progreso guardado)",activeBadge:"Sesión activa",activeTaskNote:"Al iniciar otra tarea, la anterior se pausará automáticamente.",noTasks:"No hay tareas de estudio disponibles para este curso."},Ti={title:"Trabajos y Proyectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.",btnPromptProject:"Prompt Trabajos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Trabajos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista por la API educativa",btnViewTaskPrompt:"Ver Prompt del Trabajo",tooltipViewTaskPrompt:"Ver el Grafo de Prompts (4 Niveles) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operaciones Concretas",grade2batxBadge:"🟣 2º de Bachillerato • Operaciones Formales (PAU)",pedagogicalFoundation:"Fundamento Pedagógico (Piaget & Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Trabajos y Proyectos",modalProjectSubtitle:"Grafo de 4 Niveles: Metodología de 4 Fases y Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inyección Contextualizada de 4 Niveles para {{subject}}",newTask:"Nuevo Trabajo",emptyTitle:"No tienes trabajos activos registrados.",emptyDesc:'Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.',dueDate:"Fecha Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Archivo",noDriveFiles:"No hay archivos vinculados de Drive todavía.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía del Estudiante",ownEffort:"propio",modalTitle:"Nuevo Trabajo o Entregable",modalSubtitle:"Crea una ficha para organizar tu investigación y documentos.",fieldTitle:"Título del Proyecto / Trabajo",fieldSubject:"Asignatura",fieldDue:"Fecha de Entrega",fieldNotes:"Descripción u objetivo",cancel:"Cancelar",create:"Crear Trabajo"},Di={titleAssembled:"Ensamblado del Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestación Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Cerrar",sourceLabel:"Origen:",footerGraph:"Grafo de prompts por capas: evita alucinaciones y garantiza rigor curricular",footerAudit:"Metodología pedagógica y auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador & Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividad & Variación"},graphTitle:"Arquitectura del Grafo de Inferencia",graphSubtitle:"Flujo de confluencia multicapa hacia la System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Colapsar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Haz clic en cualquier nodo para saltar a su capa en el acordeón",discreteComponents:"Componentes Discretos y Ensamblado"},Ii={title:"Configuración del Modelo de IA",subtitle:"Inferencia local o en la nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidad Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL del Endpoint API",endpointHint:"Compatible con /v1/chat/completions y /v1/models",modelName:"Nombre del Modelo",apiKey:"API Key (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicamente en tu navegador (IndexedDB local).",socraticMode:"Modo Pedagógico Socrático",strictHigh:"Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)",strictBalanced:"Equilibrado: Pistas intermedias y ejemplos análogos",strictExploratory:"Exploratorio: Explicaciones conceptuales y desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Guardar Cambios"},Oi={title:"Cuenta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Cuenta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudio",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Cerrar Sesión / Desconectar",modeSelectorTitle:"Elige el método de acceso",demoOptionTitle:"Modo Demo (Recomendado para evaluación)",demoOptionDesc:"Explora toda la plataforma con datos precargados de muestra sin necesidad de credenciales.",demoButton:"Usar Modo Demo",realOptionTitle:"Conectar Cuenta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza tus eventos en tu Google Calendar real y vincula tus archivos de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ej. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Consíguelo en Google Cloud Console > APIs y Servicios > Credenciales > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar tu cuenta educativa o personal de Google permite:",benefit1:"Exportar tus sesiones de estudio a Google Calendar.",benefit2:"Adjuntar tus apuntes y borradores desde Google Drive.",benefit3:"Garantizar que tus datos permanezcan privados y bajo tu control."},Li={updateTitle:"¡Nueva versión disponible!",updateDesc:"Actualiza para recibir las últimas mejoras.",updateButton:"Actualizar"},$i={app:Pi,nav:Ai,tabs:Si,agenda:Ei,study:ki,tasks:Ti,promptModal:Di,aiModal:Ii,authModal:Oi,pwa:Li},ji={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense trampes d'IA"},Mi={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},Ri={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},Bi={nextMilestone:"Proper Hite Lectiu",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min avui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribueix l'esforç en blocs curts per garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem a "Afegir Bloc d'Estudi" per començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Desar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},qi={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtenir solucions automàtiques per garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teves paraules abans de veure l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig pel bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Objectiu pedagògic assolit!",completionBannerDesc:"Has revisat i assimilat tot el contingut exigit pel nivell pedagògic.",btnNextVariation:"Següent variació",btnReopenChat:"Seguir consultant",indexedDbSavedNotice:"Conversa i progrés desats en temps real a IndexedDB",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a aquest curs."},Ni={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per elaborar treballs rigorosos garantint la teva autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem a "Nou Treball" per començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents a Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per organitzar la teva recerca i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},zi={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},Fi={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privadesa Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Desada de forma segura únicament al teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Desar Canvis"},Ki={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconsegueix-lo a Google Cloud Console > APIs i Serveis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teves sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teves dades romanguin privades i sota el teu control."},Gi={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per rebre les darreres millores.",updateButton:"Actualitzar"},Vi={app:ji,nav:Mi,tabs:Ri,agenda:Bi,study:qi,tasks:Ni,promptModal:zi,aiModal:Fi,authModal:Ki,pwa:Gi},Hi={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, non copiando",criticalThinking:"Pensamento crítico activo • Sen trampas de IA"},Ui={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar e Drive sincronizados"},Wi={agenda:"Axenda",study:"Estudo / Repaso",tasks:"Traballos",tutorBadge:"Tutor IA"},Qi={nextMilestone:"Próximo Fito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoxe",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodoloxía activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados na túa conta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudo",autonomousOrg:"Organización autónoma",subtitle:"Distribúe o esforzo en bloques curtos para garantir a asimilación a longo prazo.",addBlock:"Engadir Bloque de Estudo",emptyTitle:"Non hai bloques de estudo programados.",emptyDesc:'Preme en "Engadir Bloque de Estudo" para comezar a organizar o teu tempo.',pendingSync:"Pendente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Engadir Bloque de Estudo",modalSubtitle:"Planifica un fito para organizar o teu tempo de aprendizaxe.",fieldActivity:"Título da actividade",fieldSubject:"Materia",fieldType:"Tipo de Fito",fieldDate:"Data",fieldTime:"Hora de Inicio",fieldNotes:"Notas ou obxectivo persoal",cancel:"Cancelar",save:"Gardar Bloque",types:{study_session:"Sesión de estudo (45 min)",exam:"Exame lectivo",assignment_due:"Entrega de traballo"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Ver Prompt de Sección: Planificador de Axenda",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",modalPlannerTitle:"Estrutura de Prompt: Planificador de Axenda",modalPlannerSubtitle:"Estrutura Propia de 4 Pilares: Distribución Homoxénea, Prioridade e Datas de Compromiso",modalCurricularSubtitle:"Directriz Curricular Departamental ({{grade}})"},Yi={bannerTitle:"Marco de Aprendizaxe Socrática Activa",bannerDesc:"A IA guía o teu pensamento con preguntas reflexivas. Prohibido obter solucións automáticas para garantir o teu crecemento intelectual.",bannerBadge:"Tutor Cognitivo Activo",bannerGraphDesc:"Grafo dinámico de 4 niveis: Funcional • Regulador LOMLOE • Liña Base Temática • Actividades con Variación",btnPromptGraph:"Grafo de Prompts (4 Niveis)",tooltipPromptGraph:"Ver Grafo de Prompts Ensamblado (4 Capas)",activityVariationLabel:"Actividade / Variación:",stepPrefix:"Paso",baselineConcepts:"Liña Base: Conceptos a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Ver Prompt de Sección: Xerador de Active Recall",modalSocraticTitle:"Grafo Dinámico de Prompts",modalSocraticSubtitle:"Inxección contextualizada para {{subject}} • {{topic}}",activeRecall:"Repaso Activo",flashcardTitle:"Tarxeta de Autoavaliación",flashcardSubtitle:"Explica coas túas palabras antes de ver a explicación:",toggleHint:"👁️ Amosar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar despois",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Faime unha pregunta diagnóstica",chip2:"💡 Dáme unha pista reflexiva",chip3:"🎯 Vou polo bo camiño?",inputPlaceholder:"Escribe o teu razoamento ou dúbida... (Intro para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: a IA fomenta o teu propio esforzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Ti",taskListTitle:"Tarefas de Estudo e Repaso Activo",taskListSubtitle:"Selecciona unha tarefa para iniciar a sesión guiada co titor socrático. Só pode haber unha tarefa activa á vez.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Por iniciar",statusActive:"En curso",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Obxectivo pedagóxico acadado!",completionBannerDesc:"Revisaches e asimilaches todo o contido exixido polo nivel pedagóxico.",btnNextVariation:"Seguinte variación",btnReopenChat:"Seguir consultando",indexedDbSavedNotice:"Conversa e progreso gardados en tempo real en IndexedDB",badgeActivities:"{{count}} actividades",badgeConcepts:"{{count}} conceptos clave",interactionsCount:"{{count}} interaccións",pedagogicalAnchor:"Fundamentación Pedagóxica LOMLOE",pauseNotice:"En pausa (sesión gardada)",activeBadge:"Sesión activa",activeTaskNote:"Ao iniciar outra tarefa, a anterior pausarase automaticamente.",noTasks:"Non hai tarefas de estudo dispoñibles para este curso."},Ji={title:"Traballos e Proxectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar traballos rigorosos garantindo a túa autoría e ideas propias.",btnPromptProject:"Prompt Traballos",tooltipPromptProject:"Ver Prompt de Sección: Mentor de Traballos",btnCurricularDirective:"Directriz API Educativa",tooltipCurricularDirective:"Ver Directriz Curricular Departamental provista pola API educativa",btnViewTaskPrompt:"Ver Prompt do Traballo",tooltipViewTaskPrompt:"Ver o Grafo de Prompts (4 Niveis) específico para {{title}}",grade1esoBadge:"🟢 1º de ESO • Operacións Concretas",grade2batxBadge:"🟣 2º de Bacharelato • Operacións Formais (PAU)",pedagogicalFoundation:"Fundamento Pedagóxico (Piaget e Guardrails):",modalProjectTitle:"Grafo Dinámico: Mentor de Traballos e Proxectos",modalProjectSubtitle:"Grafo de 4 Niveis: Metodoloxía de 4 Fases e Auditoría de Autoría",modalTaskPromptTitle:"Grafo de Prompt: {{title}}",modalTaskPromptSubtitle:"Inxección Contextualizada de 4 Niveis para {{subject}}",newTask:"Novo Traballo",emptyTitle:"Non tes traballos activos rexistrados.",emptyDesc:'Preme en "Novo Traballo" para comezar a estruturar un entregable.',dueDate:"Data Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Ficheiro",noDriveFiles:"Aínda non hai ficheiros vinculados de Drive.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía do Estudante",ownEffort:"propio",modalTitle:"Novo Traballo ou Entregable",modalSubtitle:"Crea unha ficha para organizar a túa investigación e documentos.",fieldTitle:"Título do Proxecto / Traballo",fieldSubject:"Materia",fieldDue:"Data de Entrega",fieldNotes:"Descrición ou obxectivo",cancel:"Cancelar",create:"Crear Traballo"},Zi={titleAssembled:"Ensamblado do Prompt ({{subject}})",subtitleAssembled:"Grafo de Orquestración Dinámica • {{topic}}",badge4Layers:"Grafo Dinámico 4 Capas",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Pechar",sourceLabel:"Orixe:",footerGraph:"Grafo de prompts por capas: evita alucinacións e garante rigor curricular",footerAudit:"Metodoloxía pedagóxica e auditoría transparente",tabs:{all:"Ensamblado Completo",level1:"N1: Funcional",level3:"N3: Regulador e Ética",level2A:"N2.A: Base Temática",level2B:"N2.B: Actividade e Variación"},graphTitle:"Arquitectura do Grafo de Inferencia",graphSubtitle:"Fluxo de confluencia multicapa cara á System Instruction final",graphToggleShow:"Ver Grafo",graphToggleHide:"Ocultar Grafo",expandAll:"Expandir Todo",collapseAll:"Pregar Todo",copyPrompt:"Copiar Prompt",copied:"¡Copiado!",consolidatedPill:"Consolidado",layerPill:"Capa",clickToInspect:"Fai clic en calquera nodo para saltar á súa capa no acordeón",discreteComponents:"Compoñentes Discretos e Ensamblado"},Xi={title:"Configuración do Modelo de IA",subtitle:"Inferencia local ou na nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidade Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL do Endpoint API",endpointHint:"Compatible con /v1/chat/completions e /v1/models",modelName:"Nome do Modelo",apiKey:"Chave de API (Opcional en Local)",apiKeyHint:"Gardada de forma segura unicamente no teu navegador (IndexedDB local).",socraticMode:"Modo Pedagóxico Socrático",strictHigh:"Estrito: Nunca dá solucións directas (100% preguntas de razoamento)",strictBalanced:"Equilibrado: Pistas intermedias e exemplos análogos",strictExploratory:"Exploratorio: Explicacións conceptuais e desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Gardar Cambios"},es={title:"Conta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Conta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudo",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Pechar Sesión / Desconectar",modeSelectorTitle:"Escolle o método de acceso",demoOptionTitle:"Modo Demo (Recomendado para avaliación)",demoOptionDesc:"Explora toda a plataforma con datos precargados de mostra sen necesidade de credenciais.",demoButton:"Empregar Modo Demo",realOptionTitle:"Conectar Conta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza os teus eventos no teu Google Calendar real e vincula os teus ficheiros de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Conségueo en Google Cloud Console > APIs e Servizos > Credenciais > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar a túa conta educativa ou persoal de Google permite:",benefit1:"Exportar as túas sesións de estudo a Google Calendar.",benefit2:"Xuntar os teus apuntamentos e borradores desde Google Drive.",benefit3:"Garantir que os teus datos permanezan privados e baixo o teu control."},ts={updateTitle:"Nova versión dispoñible!",updateDesc:"Actualiza para recibir as últimas melloras.",updateButton:"Actualizar"},as={app:Hi,nav:Ui,tabs:Wi,agenda:Qi,study:Yi,tasks:Ji,promptModal:Zi,aiModal:Xi,authModal:es,pwa:ts},ns={title:"Anaxagoras AI",badge:"STI Kognitiboa",tagline:"Pentsatuz ikasi, ez kopiatuz",criticalThinking:"Pentsamendu kritiko aktiboa • IA trikimailurik gabe"},rs={local:"Lokala",cloud:"Cloud",connectGoogle:"Google Konektatu",calendarDriveSync:"Google Calendar eta Drive sinkronizatuta"},os={agenda:"Agenda",study:"Ikasketa / Berrikuspena",tasks:"Lanak",tutorBadge:"IA Tutorea"},is={nextMilestone:"Hurrengo Mugarri Didaktikoa",inDays:"3 egun barru",recommendedToday:"⚡ Gomendatutako saioa: 45 min gaur",weeklyProgress:"Asteko Aurrerapena",blocksCompleted:"bloke osatuta",activeMethod:"Metodologia aktiboa",googleCalendar:"Google Calendar",syncedEvents:"Sinkronizatutako gertaerak zure kontuan",syncAll:"🔄 Dena sinkronizatu Calendar-ekin",syncing:"⏳ Sinkronizatzen...",title:"Asteko Ikasketa Plangintza",autonomousOrg:"Antolakuntza autonomoa",subtitle:"Banakatu ahalegina bloke laburretan epe luzerako barneratzea bermatzeko.",addBlock:"Ikasketa Blokea Gehitu",emptyTitle:"Ez dago programatutako ikasketa blokerik.",emptyDesc:'Sakatu "Ikasketa Blokea Gehitu" zure denbora antolatzen hasteko.',pendingSync:"Sync zain",synced:"Google Calendar",minRecommended:"minutu gomendatuta",modalTitle:"Ikasketa Blokea Gehitu",modalSubtitle:"Planifikatu mugarri bat ikasteko denbora antolatzeko.",fieldActivity:"Jardueraren izenburua",fieldSubject:"Ikasgaia",fieldType:"Mugarri Mota",fieldDate:"Data",fieldTime:"Hasiera Ordua",fieldNotes:"Oharrak edo helburu pertsonala",cancel:"Utzi",save:"Blokea Gorde",types:{study_session:"Ikasketa saioa (45 min)",exam:"Azterketa",assignment_due:"Lanaren entrega"},btnPromptPlanner:"Agenda Antolatzaile Prompt-a",tooltipPromptPlanner:"Ikusi Ataleko Prompt-a: Agendaren Antolatzailea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",modalPlannerTitle:"Prompt Egitura: Agenda Antolatzailea",modalPlannerSubtitle:"4 Zutabeko Egitura Propioa: Banaketa Homogeneoa, Lehentasuna eta Konpromiso Datak",modalCurricularSubtitle:"Departamentuko Curriculum Gidalerroa ({{grade}})"},ss={bannerTitle:"Ikaskuntza Sokratiko Aktiboaren Esparrua",bannerDesc:"IAk zure pentsamendua gidatzen du galdera gogoetatsuekin. Zure hazkunde intelektuala bermatzeko debekatuta dago soluzio automatikoak lortzea.",bannerBadge:"Tutore Kognitibo Aktiboa",bannerGraphDesc:"4 mailako grafo dinamikoa: Funtzionala • LOMLOE Arautzailea • Gai-oinarria • Aldakuntzako Jarduerak",btnPromptGraph:"Prompts Grafoa (4 Maila)",tooltipPromptGraph:"Ikusi Muntatutako Prompt Grafoa (4 Geruza)",activityVariationLabel:"Jarduera / Aldakuntza:",stepPrefix:"Urratsa",baselineConcepts:"Oinarrizko Lerroa: Menperatu Beharreko Kontzeptuak",btnRecallPrompt:"Recall Prompt-a",tooltipRecallPrompt:"Ikusi Ataleko Prompt-a: Active Recall Sortzailea",modalSocraticTitle:"Prompt Grafo Dinamikoa",modalSocraticSubtitle:"Testuinguruan kokatutako injekzioa: {{subject}} • {{topic}}",activeRecall:"Berreskuratze Aktiboa",flashcardTitle:"Autoebaluazio Txartela",flashcardSubtitle:"Azaldu zure hitzekin azalpena ikusi aurretik:",toggleHint:"👁️ Erakutsi / Ezkutatu Aztarna Azalgarria",reviewLater:"🔁 Berrikusi geroago",mastered:"✅ Menperatua",conceptsTitle:"Menperatu beharreko Kontzeptuak",consolidated:"Finkatua",toStrengthen:"Sendotzeko",chip1:"❓ Egin iezadazu galdera diagnostiko bat",chip2:"💡 Eman iezadazu aztarna gogoetatsu bat",chip3:"🎯 Bide onetik nabil?",inputPlaceholder:"Idatzi zure arrazoibidea edo zalantza... (Enter bidaltzeko)",send:"Bidali",safeMode:"🔒 Modu segurua: IAk zure ahalegina sustatzen du",openaiCompatible:"OpenAI inferentzia bateragarria",tutorRole:"Tutore Sokratikoa",userRole:"Zu",taskListTitle:"Ikasketa eta Errepaso Aktiboko Zereginak",taskListSubtitle:"Aukeratu zeregin bat tutore sokratikoarekin saio gidatua hasteko. Zeregin bakarra egon daiteke aktibo aldi berean.",btnStart:"Hasi",btnResume:"Jarraitu",btnPause:"Gelditu",statusPending:"Hasteke",statusActive:"Martxan",statusPaused:"Pausan",statusCompleted:"Osatuta",btnReviewConversation:"Elkarrizketa berrikusi",completionBannerTitle:"Helburu pedagogikoa lortuta!",completionBannerDesc:"Maila pedagogikoak eskatzen duen eduki guztia berrikusi eta barneratu duzu.",btnNextVariation:"Hurrengo aldakuntza",btnReopenChat:"Galdetzen jarraitu",indexedDbSavedNotice:"Elkarrizketa eta aurrerapena denbora errealean IndexedDBn gordeta",badgeActivities:"{{count}} jarduera",badgeConcepts:"{{count}} kontzeptu gako",interactionsCount:"{{count}} elkarrekintza",pedagogicalAnchor:"LOMLOE Oinarri Pedagogikoa",pauseNotice:"Pausan (saioa gordeta)",activeBadge:"Saio aktiboa",activeTaskNote:"Beste zeregin bat hastean, aurrekoa automatikoki pausatuko da.",noTasks:"Ez dago ikasketa zereginik ikasturte honetarako."},ls={title:"Eskolako Lanak eta Proiektuak",driveIntegration:"Google Drive Integrazioa",subtitle:"Faseren araberako laguntzailea lan zorrotzak egiteko, zure egiletza eta ideia propioak bermatuz.",btnPromptProject:"Lanak Prompt-a",tooltipPromptProject:"Ikusi Ataleko Prompt-a: Lanen Tutorea",btnCurricularDirective:"Hezkuntza API Gidalerroa",tooltipCurricularDirective:"Ikusi hezkuntza-APIak emandako Departamentuko Curriculuma",btnViewTaskPrompt:"Ikusi Lanaren Prompt-a",tooltipViewTaskPrompt:"Ikusi {{title}}-rako 4 Mailako Prompt Grafo zehatza",grade1esoBadge:"🟢 DBH 1 • Eragiketa Zehatzak",grade2batxBadge:"🟣 Batxilergo 2 • Eragiketa Formalak (PAU)",pedagogicalFoundation:"Oinarri Pedagogikoa (Piaget eta Guardrails):",modalProjectTitle:"Grafo Dinamikoa: Lanen eta Proiektuen Tutorea",modalProjectSubtitle:"4 Mailako Grafoa: 4 Faseko Metodologia eta Egiletzaren Auditoria",modalTaskPromptTitle:"Prompt Grafoa: {{title}}",modalTaskPromptSubtitle:"{{subject}}-rako 4 Mailako Testuinguratutako Injekzioa",newTask:"Lan Berria",emptyTitle:"Ez duzu lan aktiborik erregistratuta.",emptyDesc:'Sakatu "Lan Berria" entregagarri bat egituratzen hasteko.',dueDate:"Entregatzeko Data",autonomy:"Autonomia",phasesTitle:"Egite Faseak",phases:{planning:"1. Plangintza",research:"2. Ikerketa",writing:"3. Idazketa Propioa",review:"4. Azken Berrikuspena"},driveDocs:"Dokumentuak Google Driven",attachDrive:"＋ Fitxategia Lotu",noDriveFiles:"Oraindik ez dago Driveren fitxategirik lotuta.",driveSync:"Drive Sync",autonomyMeter:"Ikaslearen Autonomia Neurgailua",ownEffort:"propioa",modalTitle:"Lan Berria edo Entregagarria",modalSubtitle:"Sortu fitxa bat zure ikerketa eta dokumentuak antolatzeko.",fieldTitle:"Proiektuaren / Lanaren Izenburua",fieldSubject:"Ikasgaia",fieldDue:"Entregatzeko Data",fieldNotes:"Deskribapena edo helburua",cancel:"Utzi",create:"Lana Sortu"},cs={titleAssembled:"Prompt Muntaia ({{subject}})",subtitleAssembled:"Orkestrazio Dinamikoaren Grafoa • {{topic}}",badge4Layers:"4 Geruzako Grafo Dinamikoa",badgePrompt:"Prompt",badgeLayer:"Geruza",defaultSubtitle:"System Instruction",close:"Itxi",sourceLabel:"Jatorria:",footerGraph:"Geruzetako prompt-en grafoa: haluzinazioak saihesten ditu eta curriculum-zorroztasuna bermatzen du",footerAudit:"Metodologia pedagogikoa eta ikuskaritza gardena",tabs:{all:"Muntaia Osoa",level1:"N1: Funtzionala",level3:"N3: Arautzailea eta Etika",level2A:"N2.A: Gai-oinarria",level2B:"N2.B: Jarduera eta Aldakuntza"}},ds={title:"IA Ereduaren Konfigurazioa",subtitle:"Inferentzia lokala edo hodeian OpenAI API estandarrarekin",inferenceType:"Inferentzia Mota",localTitle:"Lokala (Pribatutasun Osoa)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"API Endpoint URL",endpointHint:"Bateragarria /v1/chat/completions eta /v1/models-ekin",modelName:"Ereduaren Izena",apiKey:"API Gakoa (Aukerakoa Lokalean)",apiKeyHint:"Segurtasunez gordeta zure arakatzailean bakarrik (IndexedDB lokala).",socraticMode:"Modu Pedagogiko Sokratikoa",strictHigh:"Zorrotza: Ez du inoiz soluzio zuzenik ematen (100% arrazoitzeko galderak)",strictBalanced:"Orekatua: Tarteko aztarnak eta adibide antzekoak",strictExploratory:"Esploratzailea: Kontzeptu azalpenak eta erronkak",testConnection:"Konexioa Probatu",testing:"Probatzen...",cancel:"Utzi",save:"Aldaketak Gorde"},us={title:"Google Kontua",subtitle:"OAuth 2.0 Konektoreak • Calendar & Drive",demoBadge:"Demo Modu Aktiboa",realBadge:"Benetako Google Kontua",authorizedResources:"Baimendutako baliabideak",calendarTitle:"Google Calendar",calendarDesc:"Ikasketa blokeen sinkronizazioa",driveTitle:"Google Drive",driveDesc:"Entregagaien dokumentuak lotzea",statusActive:"Aktiboa",statusReal:"Benetako Sinkronizazioa",statusDemo:"Simulazio Lokala",disconnect:"Saioa Itxi / Deskonektatu",modeSelectorTitle:"Aukeratu sarbide metodoa",demoOptionTitle:"Demo Modua (Ebaluaziorako gomendatua)",demoOptionDesc:"Arakatu plataforma osoa aurrez kargatutako datuekin kredentzialik sortu beharrik gabe.",demoButton:"Demo Modua Erabili",realOptionTitle:"Konektatu Benetako Google Kontua (OAuth 2.0)",realOptionDesc:"Sinkronizatu zure gertaerak Google Calendarrean eta lotu zure Google Driveko fitxategiak.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"adib. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Lortu Google Cloud Console > APIs eta Zerbitzuak > Kredentzialak > OAuth bezeroaren IDa.",realButton:"Hasi Saioa Google OAuth-ekin",connectExplanation:"Zure hezkuntza edo Google kontu pertsonala konektatzeak aukera ematen du:",benefit1:"Esportatu zure ikasketa saioak Google Calendarrera.",benefit2:"Erantsi zure oharrak eta zirriborroak Google Drivetik.",benefit3:"Bermatu zure datuak pribatuak eta zure kontrolpean geratzen direla."},ps={updateTitle:"Bertsio berria eskuragarri!",updateDesc:"Eguneratu azken hobekuntzak jasotzeko.",updateButton:"Eguneratu"},ms={app:ns,nav:rs,tabs:os,agenda:is,study:ss,tasks:ls,promptModal:cs,aiModal:ds,authModal:us,pwa:ps},fs={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense paranys d'IA"},gs={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},bs={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},hs={nextMilestone:"Pròxima Fita Lectiva",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min hui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribuïx l'esforç en blocs curts per a garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem en "Afegir Bloc d'Estudi" per a començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per a organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Guardar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"},btnPromptPlanner:"Prompt Planificador",tooltipPromptPlanner:"Veure Prompt de Secció: Planificador d'Agenda",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",modalPlannerTitle:"Estructura de Prompt: Planificador d'Agenda",modalPlannerSubtitle:"Estructura Pròpia de 4 Pilars: Distribució Homogènia, Prioritat i Dates de Compromís",modalCurricularSubtitle:"Directriu Curricular Departamental ({{grade}})"},vs={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtindre solucions automàtiques per a garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",bannerGraphDesc:"Graf dinàmic de 4 nivells: Funcional • Regulador LOMLOE • Línia Base Temàtica • Activitats amb Variació",btnPromptGraph:"Graf de Prompts (4 Nivells)",tooltipPromptGraph:"Veure Graf de Prompts Ensamblat (4 Capes)",activityVariationLabel:"Activitat / Variació:",stepPrefix:"Pas",baselineConcepts:"Línia Base: Conceptes a Dominar",btnRecallPrompt:"Prompt Recall",tooltipRecallPrompt:"Veure Prompt de Secció: Generador d'Active Recall",modalSocraticTitle:"Graf Dinàmic de Prompts",modalSocraticSubtitle:"Injecció contextualitzada per a {{subject}} • {{topic}}",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teues paraules abans de vore l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig per bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per a enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu",taskListTitle:"Tasques d'Estudi i Repàs Actiu",taskListSubtitle:"Selecciona una tasca per a iniciar la sessió guiada amb el tutor socràtic. Només pot haver-hi una tasca activa alhora.",btnStart:"Iniciar",btnResume:"Continuar",btnPause:"Pausar",statusPending:"Per iniciar",statusActive:"En curs",statusPaused:"En pausa",statusCompleted:"Completada",btnReviewConversation:"Revisar conversa",completionBannerTitle:"Objectiu pedagògic assolit!",completionBannerDesc:"Has revisat i assimilat tot el contingut exigit pel nivell pedagògic.",btnNextVariation:"Següent variació",btnReopenChat:"Seguir consultant",indexedDbSavedNotice:"Conversa i progrés guardats en temps real en IndexedDB",badgeActivities:"{{count}} activitats",badgeConcepts:"{{count}} conceptes clau",interactionsCount:"{{count}} interaccions",pedagogicalAnchor:"Fonamentació Pedagògica LOMLOE",pauseNotice:"En pausa (progrés guardat)",activeBadge:"Sessió activa",activeTaskNote:"En iniciar una altra tasca, l'anterior es pausarà automàticament.",noTasks:"No hi ha tasques d'estudi disponibles per a este curs."},ys={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per a elaborar treballs rigorosos garantint la teua autoria i idees pròpies.",btnPromptProject:"Prompt Treballs",tooltipPromptProject:"Veure Prompt de Secció: Mentor de Treballs",btnCurricularDirective:"Directriu API Educativa",tooltipCurricularDirective:"Veure Directriu Curricular Departamental proveïda per l'API educativa",btnViewTaskPrompt:"Veure Prompt del Treball",tooltipViewTaskPrompt:"Veure el Graf de Prompts (4 Nivells) específic per a {{title}}",grade1esoBadge:"🟢 1r d'ESO • Operacions Concretes",grade2batxBadge:"🟣 2n de Batxillerat • Operacions Formals (PAU)",pedagogicalFoundation:"Fonament Pedagògic (Piaget i Guardrails):",modalProjectTitle:"Graf Dinàmic: Mentor de Treballs i Projectes",modalProjectSubtitle:"Graf de 4 Nivells: Metodologia de 4 Fases i Auditoria d'Autoria",modalTaskPromptTitle:"Graf de Prompt: {{title}}",modalTaskPromptSubtitle:"Injecció Contextualitzada de 4 Nivells per a {{subject}}",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem en "Nou Treball" per a començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents en Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per a organitzar la teua investigació i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},xs={titleAssembled:"Ensamblatge del Prompt ({{subject}})",subtitleAssembled:"Graf d'Orquestració Dinàmica • {{topic}}",badge4Layers:"Graf Dinàmic 4 Capes",badgePrompt:"Prompt",badgeLayer:"Capa",defaultSubtitle:"System Instruction",close:"Tancar",sourceLabel:"Origen:",footerGraph:"Graf de prompts per capes: evita al·lucinacions i garanteix rigor curricular",footerAudit:"Metodologia pedagògica i auditoria transparent",tabs:{all:"Ensamblatge Complet",level1:"N1: Funcional",level3:"N3: Regulador i Ètica",level2A:"N2.A: Base Temàtica",level2B:"N2.B: Activitat i Variació"}},_s={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privacitat Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicament en el teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Guardar Canvis"},Cs={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconseguix-lo en Google Cloud Console > APIs i Servicis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teues sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teues dades romanguen privades i sota el teu control."},ws={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per a rebre les últimes millores.",updateButton:"Actualitzar"},Ps={app:fs,nav:gs,tabs:bs,agenda:hs,study:vs,tasks:ys,promptModal:xs,aiModal:_s,authModal:Cs,pwa:ws},wr="anaxagoras_lang";class As{constructor(){Ie(this,"initialized",!1);Ie(this,"listeners",[])}async init(){if(this.initialized)return;const a=localStorage.getItem(wr)||"es";await je.init({lng:a,fallbackLng:"es",debug:!1,resources:{es:{translation:$i},ca:{translation:Vi},ga:{translation:as},eu:{translation:ms},va:{translation:Ps}},interpolation:{escapeValue:!1}}),this.initialized=!0}t(a,r){return je.t(a,r)}async changeLanguage(a){await je.changeLanguage(a),localStorage.setItem(wr,a);for(const r of this.listeners)r(a)}getCurrentLanguage(){return je.language||"es"}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}}const ta=new As,A=(d,a)=>ta.t(d,a);class Ss{constructor(){Ie(this,"registration",null);Ie(this,"updateWaiting",!1)}hasUpdateWaiting(){return this.updateWaiting}async register(a){if(!("serviceWorker"in navigator)){console.log("[PWA] Service Worker no soportado en este navegador.");return}try{const i=await navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"});this.registration=i,i.waiting&&(this.updateWaiting=!0,this.notifyUpdate(a)),i.addEventListener("updatefound",()=>{const p=i.installing;p&&p.addEventListener("statechange",()=>{p.state==="installed"&&navigator.serviceWorker.controller&&(this.updateWaiting=!0,this.notifyUpdate(a))})});let s=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{s||(s=!0,window.location.reload())}),i.update().catch(()=>{}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&i.update().catch(()=>{})}),window.addEventListener("focus",()=>{i.update().catch(()=>{})}),window.addEventListener("online",()=>{i.update().catch(()=>{})}),setInterval(()=>{i.update().catch(()=>{})},1e3*60*5)}catch(r){console.warn("[PWA] Error registrando Service Worker:",r)}}notifyUpdate(a){a!=null&&a.onUpdateAvailable?a.onUpdateAvailable(()=>this.applyUpdate()):this.showDefaultUpdateToast()}applyUpdate(){this.registration&&this.registration.waiting?this.registration.waiting.postMessage({type:"SKIP_WAITING"}):window.location.reload()}async checkForUpdates(a=!1){if(!this.registration){a&&alert("El servicio de actualización no está activo en este navegador.");return}let r=null;a&&(r=document.createElement("div"),r.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse",r.innerHTML="<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>",document.body.appendChild(r));try{await this.registration.update();const i=await fetch(`./version.json?t=${Date.now()}`,{cache:"no-store"});if(i.ok){const s=await i.json();console.log("[PWA] Versión desplegada en servidor:",s)}if(a)if(await new Promise(s=>setTimeout(s,900)),r==null||r.remove(),this.updateWaiting)this.showDefaultUpdateToast();else{const s=document.createElement("div");s.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2",s.innerHTML="<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>",document.body.appendChild(s),setTimeout(()=>s.remove(),3500)}}catch{r==null||r.remove(),a&&alert("No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.")}}async forceHardReset(){try{const a=await navigator.serviceWorker.getRegistrations();for(const i of a)await i.unregister();const r=await caches.keys();for(const i of r)await caches.delete(i)}catch(a){console.warn("[PWA] Error en hard reset:",a)}window.location.reload()}showDefaultUpdateToast(){var r,i;if(document.getElementById("pwa-update-toast"))return;const a=document.createElement("div");a.id="pwa-update-toast",a.className="fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md",a.innerHTML=`
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
    `,document.body.appendChild(a),(r=a.querySelector("#btn-pwa-apply"))==null||r.addEventListener("click",()=>{this.applyUpdate()}),(i=a.querySelector("#btn-pwa-dismiss"))==null||i.addEventListener("click",()=>{a.remove()})}}const Pn=new Ss;var Es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ks(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var Ia={exports:{}},Ts=Ia.exports,Pr;function Ds(){return Pr||(Pr=1,(function(d,a){((r,i)=>{d.exports=i()})(Ts,function(){var r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(n,o){n.__proto__=o}:function(n,o){for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(n[l]=o[l])}))(e,t)},i=function(){return(i=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};function s(e,t,n){for(var o,l=0,c=t.length;l<c;l++)!o&&l in t||((o=o||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(o||Array.prototype.slice.call(t))}var p=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Es,u=Object.keys,m=Array.isArray;function b(e,t){return typeof t=="object"&&u(t).forEach(function(n){e[n]=t[n]}),e}typeof Promise>"u"||p.Promise||(p.Promise=Promise);var h=Object.getPrototypeOf,_={}.hasOwnProperty;function k(e,t){return _.call(e,t)}function L(e,t){typeof t=="function"&&(t=t(h(e))),(typeof Reflect>"u"?u:Reflect.ownKeys)(t).forEach(function(n){j(e,n,t[n])})}var q=Object.defineProperty;function j(e,t,n,o){q(e,t,b(n&&k(n,"get")&&typeof n.get=="function"?{get:n.get,set:n.set,configurable:!0}:{value:n,configurable:!0,writable:!0},o))}function ee(e){return{from:function(t){return e.prototype=Object.create(t.prototype),j(e.prototype,"constructor",e),{extend:L.bind(null,e.prototype)}}}}var K=Object.getOwnPropertyDescriptor,O=[].slice;function B(e,t,n){return O.call(e,t,n)}function ae(e,t){return t(e)}function Y(e){if(!e)throw new Error("Assertion Failed")}function V(e){p.setImmediate?setImmediate(e):setTimeout(e,0)}function W(e,t){if(typeof t=="string"&&k(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var n=[],o=0,l=t.length;o<l;++o){var c=W(e,t[o]);n.push(c)}return n}var f,g=t.indexOf(".");return g===-1||(f=e[t.substr(0,g)])==null?void 0:W(f,t.substr(g+1))}function X(e,t,n){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){Y(typeof n!="string"&&"length"in n);for(var o=0,l=t.length;o<l;++o)X(e,t[o],n[o])}else{var c=t.indexOf(".");if(c!==-1){var f=t.substr(0,c),c=t.substr(c+1);if(c==="")n===void 0?m(e)&&!isNaN(parseInt(f))?e.splice(f,1):delete e[f]:e[f]=n;else{var g=e[f];if(!g||!k(e,f)){if(n===void 0)return;g=e[f]={}}X(g,c,n)}}else n===void 0?m(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n}}function se(e){var t,n={};for(t in e)k(e,t)&&(n[t]=e[t]);return n}var M=[].concat;function ne(e){return M.apply([],e)}var Ee="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(ne([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return p[e]}),be=new Set(Ee.map(function(e){return p[e]})),ve=null;function ie(e){return ve=new WeakMap,e=(function t(n){if(!n||typeof n!="object")return n;var o=ve.get(n);if(o)return o;if(m(n)){o=[],ve.set(n,o);for(var l=0,c=n.length;l<c;++l)o.push(t(n[l]))}else if(be.has(n.constructor))o=n;else{var f,g=h(n);for(f in o=g===Object.prototype?{}:Object.create(g),ve.set(n,o),n)k(n,f)&&(o[f]=t(n[f]))}return o})(e),ve=null,e}var de={}.toString;function R(e){return de.call(e).slice(8,-1)}var Z=typeof Symbol<"u"?Symbol.iterator:"@@iterator",Q=typeof Z=="symbol"?function(e){var t;return e!=null&&(t=e[Z])&&t.apply(e)}:function(){return null};function ce(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var xe={};function he(e){var t,n,o,l;if(arguments.length===1){if(m(e))return e.slice();if(this===xe&&typeof e=="string")return[e];if(l=Q(e))for(n=[];!(o=l.next()).done;)n.push(o.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(n=new Array(t);t--;)n[t]=e[t]}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var Pe=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},Ee=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],Fe=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(Ee),He={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function ze(e,t){this.name=e,this.message=t}function rt(e,t){return e+". Errors: "+Object.keys(t).map(function(n){return t[n].toString()}).filter(function(n,o,l){return l.indexOf(n)===o}).join(`
`)}function aa(e,t,n,o){this.failures=t,this.failedKeys=o,this.successCount=n,this.message=rt(e,t)}function wt(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(n){return t[n]}),this.failuresByPos=t,this.message=rt(e,this.failures)}ee(ze).from(Error).extend({toString:function(){return this.name+": "+this.message}}),ee(aa).from(ze),ee(wt).from(ze);var Ra=Fe.reduce(function(e,t){return e[t]=t+"Error",e},{}),So=ze,le=Fe.reduce(function(e,t){var n=t+"Error";function o(l,c){this.name=n,l?typeof l=="string"?(this.message="".concat(l).concat(c?`
 `+c:""),this.inner=c||null):typeof l=="object"&&(this.message="".concat(l.name," ").concat(l.message),this.inner=l):(this.message=He[t]||n,this.inner=null)}return ee(o).from(So),e[t]=o,e},{}),kn=(le.Syntax=SyntaxError,le.Type=TypeError,le.Range=RangeError,Ee.reduce(function(e,t){return e[t+"Error"]=le[t],e},{}));Ee=Fe.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=le[t]),e},{});function Ae(){}function $t(e){return e}function Eo(e,t){return e==null||e===$t?t:function(n){return t(e(n))}}function pt(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function ko(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments),o=(n!==void 0&&(arguments[0]=n),this.onsuccess),l=this.onerror,c=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return o&&(this.onsuccess=this.onsuccess?pt(o,this.onsuccess):o),l&&(this.onerror=this.onerror?pt(l,this.onerror):l),c!==void 0?c:n}}function To(e,t){return e===Ae?t:function(){e.apply(this,arguments);var n=this.onsuccess,o=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),n&&(this.onsuccess=this.onsuccess?pt(n,this.onsuccess):n),o&&(this.onerror=this.onerror?pt(o,this.onerror):o)}}function Do(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments),o=(b(arguments[0],n),this.onsuccess),l=this.onerror,c=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return o&&(this.onsuccess=this.onsuccess?pt(o,this.onsuccess):o),l&&(this.onerror=this.onerror?pt(l,this.onerror):l),n===void 0?c===void 0?void 0:c:b(n,c)}}function Io(e,t){return e===Ae?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function Ba(e,t){return e===Ae?t:function(){var n=e.apply(this,arguments);if(n&&typeof n.then=="function"){for(var o=this,l=arguments.length,c=new Array(l);l--;)c[l]=arguments[l];return n.then(function(){return t.apply(o,c)})}return t.apply(this,arguments)}}Ee.ModifyError=aa,Ee.DexieError=ze,Ee.BulkError=wt;var We=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function Tn(e){We=e}var jt={},Dn=100,Mt=typeof Promise>"u"?[]:(Fe=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Mt=crypto.subtle.digest("SHA-512",new Uint8Array([0])),h(Mt),Fe]:[Fe,h(Fe),Fe]),Fe=Mt[0],Dt=Mt[1],Dt=Dt&&Dt.then,mt=Fe&&Fe.constructor,qa=!!Mt[2],Rt=function(e,t){Bt.push([e,t]),na&&(queueMicrotask(Lo),na=!1)},Na=!0,na=!0,ft=[],ra=[],za=$t,Je={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:Ae,pgp:!1,env:{},finalize:Ae},oe=Je,Bt=[],gt=0,oa=[];function J(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=oe;if(typeof e!="function"){if(e!==jt)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&Ka(this,this._value)}else this._state=null,this._value=null,++t.ref,(function n(o,l){try{l(function(c){if(o._state===null){if(c===o)throw new TypeError("A promise cannot be resolved with itself.");var f=o._lib&&Pt();c&&typeof c.then=="function"?n(o,function(g,y){c instanceof J?c._then(g,y):c.then(g,y)}):(o._state=!0,o._value=c,On(o)),f&&At()}},Ka.bind(null,o))}catch(c){Ka(o,c)}})(this,e)}var Fa={get:function(){var e=oe,t=ca;function n(o,l){var c=this,f=!e.global&&(e!==oe||t!==ca),g=f&&!it(),y=new J(function(T,C){Ga(c,new In($n(o,e,f,g),$n(l,e,f,g),T,C,e))});return this._consoleTask&&(y._consoleTask=this._consoleTask),y}return n.prototype=jt,n},set:function(e){j(this,"then",e&&e.prototype===jt?Fa:{get:function(){return e},set:Fa.set})}};function In(e,t,n,o,l){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=n,this.reject=o,this.psd=l}function Ka(e,t){var n,o;ra.push(t),e._state===null&&(n=e._lib&&Pt(),t=za(t),e._state=!1,e._value=t,o=e,ft.some(function(l){return l._value===o._value})||ft.push(o),On(e),n)&&At()}function On(e){var t=e._listeners;e._listeners=[];for(var n=0,o=t.length;n<o;++n)Ga(e,t[n]);var l=e._PSD;--l.ref||l.finalize(),gt===0&&(++gt,Rt(function(){--gt==0&&Va()},[]))}function Ga(e,t){if(e._state===null)e._listeners.push(t);else{var n=e._state?t.onFulfilled:t.onRejected;if(n===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++gt,Rt(Oo,[n,e,t])}}function Oo(e,t,n){try{var o,l=t._value;!t._state&&ra.length&&(ra=[]),o=We&&t._consoleTask?t._consoleTask.run(function(){return e(l)}):e(l),t._state||ra.indexOf(l)!==-1||(c=>{for(var f=ft.length;f;)if(ft[--f]._value===c._value)return ft.splice(f,1)})(t),n.resolve(o)}catch(c){n.reject(c)}finally{--gt==0&&Va(),--n.psd.ref||n.psd.finalize()}}function Lo(){bt(Je,function(){Pt()&&At()})}function Pt(){var e=Na;return na=Na=!1,e}function At(){var e,t,n;do for(;0<Bt.length;)for(e=Bt,Bt=[],n=e.length,t=0;t<n;++t){var o=e[t];o[0].apply(null,o[1])}while(0<Bt.length);na=Na=!0}function Va(){for(var e=ft,t=(ft=[],e.forEach(function(o){o._PSD.onunhandled.call(null,o._value,o)}),oa.slice(0)),n=t.length;n;)t[--n]()}function ia(e){return new J(jt,!1,e)}function ke(e,t){var n=oe;return function(){var o=Pt(),l=oe;try{return st(n,!0),e.apply(this,arguments)}catch(c){t&&t(c)}finally{st(l,!1),o&&At()}}}L(J.prototype,{then:Fa,_then:function(e,t){Ga(this,new In(null,null,e,t,oe))},catch:function(e){var t,n;return arguments.length===1?this.then(null,e):(t=e,n=arguments[1],typeof t=="function"?this.then(null,function(o){return(o instanceof t?n:ia)(o)}):this.then(null,function(o){return(o&&o.name===t?n:ia)(o)}))},finally:function(e){return this.then(function(t){return J.resolve(e()).then(function(){return t})},function(t){return J.resolve(e()).then(function(){return ia(t)})})},timeout:function(e,t){var n=this;return e<1/0?new J(function(o,l){var c=setTimeout(function(){return l(new le.Timeout(t))},e);n.then(o,l).finally(clearTimeout.bind(null,c))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&j(J.prototype,Symbol.toStringTag,"Dexie.Promise"),Je.env=Ln(),L(J,{all:function(){var e=he.apply(null,arguments).map(da);return new J(function(t,n){e.length===0&&t([]);var o=e.length;e.forEach(function(l,c){return J.resolve(l).then(function(f){e[c]=f,--o||t(e)},n)})})},resolve:function(e){return e instanceof J?e:e&&typeof e.then=="function"?new J(function(t,n){e.then(t,n)}):new J(jt,!0,e)},reject:ia,race:function(){var e=he.apply(null,arguments).map(da);return new J(function(t,n){e.map(function(o){return J.resolve(o).then(t,n)})})},PSD:{get:function(){return oe},set:function(e){return oe=e}},totalEchoes:{get:function(){return ca}},newPSD:ot,usePSD:bt,scheduler:{get:function(){return Rt},set:function(e){Rt=e}},rejectionMapper:{get:function(){return za},set:function(e){za=e}},follow:function(e,t){return new J(function(n,o){return ot(function(l,c){var f=oe;f.unhandleds=[],f.onunhandled=c,f.finalize=pt(function(){var g,y=this;g=function(){y.unhandleds.length===0?l():c(y.unhandleds[0])},oa.push(function T(){g(),oa.splice(oa.indexOf(T),1)}),++gt,Rt(function(){--gt==0&&Va()},[])},f.finalize),e()},t,n,o)})}}),mt&&(mt.allSettled&&j(J,"allSettled",function(){var e=he.apply(null,arguments).map(da);return new J(function(t){e.length===0&&t([]);var n=e.length,o=new Array(n);e.forEach(function(l,c){return J.resolve(l).then(function(f){return o[c]={status:"fulfilled",value:f}},function(f){return o[c]={status:"rejected",reason:f}}).then(function(){return--n||t(o)})})})}),mt.any&&typeof AggregateError<"u"&&j(J,"any",function(){var e=he.apply(null,arguments).map(da);return new J(function(t,n){e.length===0&&n(new AggregateError([]));var o=e.length,l=new Array(o);e.forEach(function(c,f){return J.resolve(c).then(function(g){return t(g)},function(g){l[f]=g,--o||n(new AggregateError(l))})})})}),mt.withResolvers)&&(J.withResolvers=mt.withResolvers);var Oe={awaits:0,echoes:0,id:0},$o=0,sa=[],la=0,ca=0,jo=0;function ot(e,f,n,o){var l=oe,c=Object.create(l),f=(c.parent=l,c.ref=0,c.global=!1,c.id=++jo,Je.env,c.env=qa?{Promise:J,PromiseProp:{value:J,configurable:!0,writable:!0},all:J.all,race:J.race,allSettled:J.allSettled,any:J.any,resolve:J.resolve,reject:J.reject}:{},f&&b(c,f),++l.ref,c.finalize=function(){--this.parent.ref||this.parent.finalize()},bt(c,e,n,o));return c.ref===0&&c.finalize(),f}function St(){return Oe.id||(Oe.id=++$o),++Oe.awaits,Oe.echoes+=Dn,Oe.id}function it(){return!!Oe.awaits&&(--Oe.awaits==0&&(Oe.id=0),Oe.echoes=Oe.awaits*Dn,!0)}function da(e){return Oe.echoes&&e&&e.constructor===mt?(St(),e.then(function(t){return it(),t},function(t){return it(),Te(t)})):e}function Mo(){var e=sa[sa.length-1];sa.pop(),st(e,!1)}function st(e,t){var n,o,l=oe;(t?!Oe.echoes||la++&&e===oe:!la||--la&&e===oe)||queueMicrotask(t?(function(c){++ca,Oe.echoes&&--Oe.echoes!=0||(Oe.echoes=Oe.awaits=Oe.id=0),sa.push(oe),st(c,!0)}).bind(null,e):Mo),e!==oe&&(oe=e,l===Je&&(Je.env=Ln()),qa)&&(n=Je.env.Promise,o=e.env,l.global||e.global)&&(Object.defineProperty(p,"Promise",o.PromiseProp),n.all=o.all,n.race=o.race,n.resolve=o.resolve,n.reject=o.reject,o.allSettled&&(n.allSettled=o.allSettled),o.any)&&(n.any=o.any)}function Ln(){var e=p.Promise;return qa?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(p,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function bt(e,t,n,o,l){var c=oe;try{return st(e,!0),t(n,o,l)}finally{st(c,!1)}}function $n(e,t,n,o){return typeof e!="function"?e:function(){var l=oe;n&&St(),st(t,!0);try{return e.apply(this,arguments)}finally{st(l,!1),o&&queueMicrotask(it)}}}function Ha(e){Promise===mt&&Oe.echoes===0?la===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+Dt).indexOf("[native code]")===-1&&(St=it=Ae);var Te=J.reject,ht="￿",Ze="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",jn="String expected.",ua="__dbnames",Ua="readonly",Wa="readwrite";function vt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var Mn={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function pa(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=ie(t))[e],t}}function Rn(){throw le.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function _e(e,t){try{var n=Bn(e),o=Bn(t);if(n!==o)return n==="Array"?1:o==="Array"?-1:n==="binary"?1:o==="binary"?-1:n==="string"?1:o==="string"?-1:n==="Date"?1:o!=="Date"?NaN:-1;switch(n){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var l=qn(e),c=qn(t),f=l.length,g=c.length,y=f<g?f:g,T=0;T<y;++T)if(l[T]!==c[T])return l[T]<c[T]?-1:1;return f===g?0:f<g?-1:1;case"Array":for(var C=e,v=t,x=C.length,E=v.length,P=x<E?x:E,w=0;w<P;++w){var S=_e(C[w],v[w]);if(S!==0)return S}return x===E?0:x<E?-1:1}}catch{}return NaN}function Bn(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=R(e))==="ArrayBuffer")?"binary":t}function qn(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function ma(e,t,n){var o=e.schema.yProps;return o?(t&&0<n.numFailures&&(t=t.filter(function(l,c){return!n.failures[c]})),Promise.all(o.map(function(l){return l=l.updatesTable,t?e.db.table(l).where("k").anyOf(t).delete():e.db.table(l).clear()})).then(function(){return n})):n}Nn.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var n=t.add;if(m(n))return s(s([],m(e)?e:[],!0),n).sort();if(typeof n=="number")return(Number(e)||0)+n;if(typeof n=="bigint")try{return BigInt(e)+n}catch{return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(t.remove!==void 0){var o=t.remove;if(m(o))return m(e)?e.filter(function(l){return!o.includes(l)}).sort():[];if(typeof o=="number")return Number(e)-o;if(typeof o=="bigint")try{return BigInt(e)-o}catch{return BigInt(0)-o}throw new TypeError("Invalid subtrahend ".concat(o))}return n=(n=t.replacePrefix)==null?void 0:n[0],n&&typeof e=="string"&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var qt=Nn;function Nn(e){this["@@propmod"]=e}function zn(e,t){for(var n=u(t),o=n.length,l=!1,c=0;c<o;++c){var f=n[c],g=t[f],y=W(e,f);g instanceof qt?(X(e,f,g.execute(y)),l=!0):y!==g&&(X(e,f,g),l=!0)}return l}Se.prototype._trans=function(e,t,n){var o=this._tx||oe.trans,l=this.name,c=We&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function f(T,C,v){if(v.schema[l])return t(v.idbtrans,v);throw new le.NotFound("Table "+l+" not part of transaction")}var g=Pt();try{var y=o&&o.db._novip===this.db._novip?o===oe.trans?o._promise(e,f,n):ot(function(){return o._promise(e,f,n)},{trans:o,transless:oe.transless||oe}):(function T(C,v,x,E){if(C.idbdb&&(C._state.openComplete||oe.letThrough||C._vip)){var P=C._createTransaction(v,x,C._dbSchema);try{P.create(),C._state.PR1398_maxLoop=3}catch(w){return w.name===Ra.InvalidState&&C.isOpen()&&0<--C._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),C.close({disableAutoOpen:!1}),C.open().then(function(){return T(C,v,x,E)})):Te(w)}return P._promise(v,function(w,S){return ot(function(){return oe.trans=P,E(w,S,P)})}).then(function(w){if(v==="readwrite")try{P.idbtrans.commit()}catch{}return v==="readonly"?w:P._completion.then(function(){return w})})}if(C._state.openComplete)return Te(new le.DatabaseClosed(C._state.dbOpenError));if(!C._state.isBeingOpened){if(!C._state.autoOpen)return Te(new le.DatabaseClosed);C.open().catch(Ae)}return C._state.dbReadyPromise.then(function(){return T(C,v,x,E)})})(this.db,e,[this.name],f);return c&&(y._consoleTask=c,y=y.catch(function(T){return console.trace(T),Te(T)})),y}finally{g&&At()}},Se.prototype.get=function(e,t){var n=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?Te(new le.Type("Invalid argument to Table.get()")):this._trans("readonly",function(o){return n.core.get({trans:o,key:e}).then(function(l){return n.hook.reading.fire(l)})}).then(t)},Se.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(m(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=u(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var n=this.schema.indexes.concat(this.schema.primKey).filter(function(g){if(g.compound&&t.every(function(T){return 0<=g.keyPath.indexOf(T)})){for(var y=0;y<t.length;++y)if(t.indexOf(g.keyPath[y])===-1)return!1;return!0}return!1}).sort(function(g,y){return g.keyPath.length-y.keyPath.length})[0];if(n&&this.db._maxKey!==ht)return f=n.keyPath.slice(0,t.length),this.where(f).equals(f.map(function(g){return e[g]}));!n&&We&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var o=this.schema.idxByName;function l(g,y){return _e(g,y)===0}var f=t.reduce(function(C,y){var T=C[0],C=C[1],v=o[y],x=e[y];return[T||v,T||!v?vt(C,v&&v.multi?function(E){return E=W(E,y),m(E)&&E.some(function(P){return l(x,P)})}:function(E){return l(x,W(E,y))}):C]},[null,null]),c=f[0],f=f[1];return c?this.where(c.name).equals(e[c.keyPath]).filter(f):n?this.filter(f):this.where(t).equals("")},Se.prototype.filter=function(e){return this.toCollection().and(e)},Se.prototype.count=function(e){return this.toCollection().count(e)},Se.prototype.offset=function(e){return this.toCollection().offset(e)},Se.prototype.limit=function(e){return this.toCollection().limit(e)},Se.prototype.each=function(e){return this.toCollection().each(e)},Se.prototype.toArray=function(e){return this.toCollection().toArray(e)},Se.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},Se.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,m(e)?"[".concat(e.join("+"),"]"):e))},Se.prototype.reverse=function(){return this.toCollection().reverse()},Se.prototype.mapToClass=function(e){for(var t=this.db,n=this.name,o=((this.schema.mappedClass=e).prototype instanceof Rn&&(e=(f=>{var g=C,y=f;if(typeof y!="function"&&y!==null)throw new TypeError("Class extends value "+String(y)+" is not a constructor or null");function T(){this.constructor=g}function C(){return f!==null&&f.apply(this,arguments)||this}return r(g,y),g.prototype=y===null?Object.create(y):(T.prototype=y.prototype,new T),Object.defineProperty(C.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),C.prototype.table=function(){return n},C})(e)),new Set),l=e.prototype;l;l=h(l))Object.getOwnPropertyNames(l).forEach(function(f){return o.add(f)});function c(f){if(!f)return f;var g,y=Object.create(e.prototype);for(g in f)if(!o.has(g))try{y[g]=f[g]}catch{}return y}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=c,this.hook("reading",c),e},Se.prototype.defineClass=function(){return this.mapToClass(function(e){b(this,e)})},Se.prototype.add=function(e,t){var n=this,o=this.schema.primKey,l=o.auto,c=o.keyPath,f=e;return c&&l&&(f=pa(c)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"add",keys:t!=null?[t]:null,values:[f]})}).then(function(g){return g.numFailures?J.reject(g.failures[0]):g.lastResult}).then(function(g){if(c)try{X(e,c,g)}catch{}return g})},Se.prototype.upsert=function(e,t){var n=this,o=this.schema.primKey.keyPath;return this._trans("readwrite",function(l){return n.core.get({trans:l,key:e}).then(function(c){var f=c??{};return zn(f,t),o&&X(f,o,e),n.core.mutate({trans:l,type:"put",values:[f],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(g){return g.numFailures?J.reject(g.failures[0]):!!c})})})},Se.prototype.update=function(e,t){return typeof e!="object"||m(e)?this.where(":id").equals(e).modify(t):(e=W(e,this.schema.primKey.keyPath))===void 0?Te(new le.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},Se.prototype.put=function(e,t){var n=this,o=this.schema.primKey,l=o.auto,c=o.keyPath,f=e;return c&&l&&(f=pa(c)(e)),this._trans("readwrite",function(g){return n.core.mutate({trans:g,type:"put",values:[f],keys:t!=null?[t]:null})}).then(function(g){return g.numFailures?J.reject(g.failures[0]):g.lastResult}).then(function(g){if(c)try{X(e,c,g)}catch{}return g})},Se.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(n){return t.core.mutate({trans:n,type:"delete",keys:[e]}).then(function(o){return ma(t,[e],o)}).then(function(o){return o.numFailures?J.reject(o.failures[0]):void 0})})},Se.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:Mn}).then(function(n){return ma(e,null,n)})}).then(function(t){return t.numFailures?J.reject(t.failures[0]):void 0})},Se.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(n){return t.core.getMany({keys:e,trans:n}).then(function(o){return o.map(function(l){return t.hook.reading.fire(l)})})})},Se.prototype.bulkAdd=function(e,t,n){var o=this,l=Array.isArray(t)?t:void 0,c=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(f){var g=o.schema.primKey,T=g.auto,g=g.keyPath;if(g&&l)throw new le.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new le.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,T=g&&T?e.map(pa(g)):e;return o.core.mutate({trans:f,type:"add",keys:l,values:T,wantResults:c}).then(function(C){var v=C.numFailures,x=C.failures;if(v===0)return c?C.results:C.lastResult;throw new wt("".concat(o.name,".bulkAdd(): ").concat(v," of ").concat(y," operations failed"),x)})})},Se.prototype.bulkPut=function(e,t,n){var o=this,l=Array.isArray(t)?t:void 0,c=(n=n||(l?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(f){var g=o.schema.primKey,T=g.auto,g=g.keyPath;if(g&&l)throw new le.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(l&&l.length!==e.length)throw new le.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,T=g&&T?e.map(pa(g)):e;return o.core.mutate({trans:f,type:"put",keys:l,values:T,wantResults:c}).then(function(C){var v=C.numFailures,x=C.failures;if(v===0)return c?C.results:C.lastResult;throw new wt("".concat(o.name,".bulkPut(): ").concat(v," of ").concat(y," operations failed"),x)})})},Se.prototype.bulkUpdate=function(e){var t=this,n=this.core,o=e.map(function(f){return f.key}),l=e.map(function(f){return f.changes}),c=[];return this._trans("readwrite",function(f){return n.getMany({trans:f,keys:o,cache:"clone"}).then(function(g){var y=[],T=[],C=(e.forEach(function(v,x){var E=v.key,P=v.changes,w=g[x];if(w){for(var S=0,I=Object.keys(P);S<I.length;S++){var D=I[S],$=P[D];if(D===t.schema.primKey.keyPath){if(_e($,E)!==0)throw new le.Constraint("Cannot update primary key in bulkUpdate()")}else X(w,D,$)}c.push(x),y.push(E),T.push(w)}}),y.length);return n.mutate({trans:f,type:"put",keys:y,values:T,updates:{keys:o,changeSpecs:l}}).then(function(v){var x=v.numFailures,E=v.failures;if(x===0)return C;for(var P=0,w=Object.keys(E);P<w.length;P++){var S,I=w[P],D=c[Number(I)];D!=null&&(S=E[I],delete E[I],E[D]=S)}throw new wt("".concat(t.name,".bulkUpdate(): ").concat(x," of ").concat(C," operations failed"),E)})})})},Se.prototype.bulkDelete=function(e){var t=this,n=e.length;return this._trans("readwrite",function(o){return t.core.mutate({trans:o,type:"delete",keys:e}).then(function(l){return ma(t,e,l)})}).then(function(o){var l=o.numFailures,c=o.failures;if(l===0)return o.lastResult;throw new wt("".concat(t.name,".bulkDelete(): ").concat(l," of ").concat(n," operations failed"),c)})};var Fn=Se;function Se(){}function Nt(e){function t(f,g){if(g){for(var y=arguments.length,T=new Array(y-1);--y;)T[y-1]=arguments[y];return n[f].subscribe.apply(null,T),e}if(typeof f=="string")return n[f]}var n={};t.addEventType=c;for(var o=1,l=arguments.length;o<l;++o)c(arguments[o]);return t;function c(f,g,y){var T,C;if(typeof f!="object")return g=g||Io,C={subscribers:[],fire:y=y||Ae,subscribe:function(v){C.subscribers.indexOf(v)===-1&&(C.subscribers.push(v),C.fire=g(C.fire,v))},unsubscribe:function(v){C.subscribers=C.subscribers.filter(function(x){return x!==v}),C.fire=C.subscribers.reduce(g,y)}},n[f]=t[f]=C;u(T=f).forEach(function(v){var x=T[v];if(m(x))c(v,T[v][0],T[v][1]);else{if(x!=="asap")throw new le.InvalidArgument("Invalid event config");var E=c(v,$t,function(){for(var P=arguments.length,w=new Array(P);P--;)w[P]=arguments[P];E.subscribers.forEach(function(S){V(function(){S.apply(null,w)})})})}})}}function zt(e,t){return ee(t).from({prototype:e}),t}function Et(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Qa(e,t){e.filter=vt(e.filter,t)}function Ya(e,t,n){var o=e.replayFilter;e.replayFilter=o?function(){return vt(o(),t())}:t,e.justLimit=n&&!o}function fa(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new le.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function Kn(e,t,n){var o=fa(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:o,range:e.range}})}function ga(e,t,n,o){var l,c,f=e.replayFilter?vt(e.filter,e.replayFilter()):e.filter;return e.or?(l={},c=function(g,y,T){var C,v;f&&!f(y,T,function(x){return y.stop(x)},function(x){return y.fail(x)})||((v=""+(C=y.primaryKey))=="[object ArrayBuffer]"&&(v=""+new Uint8Array(C)),k(l,v))||(l[v]=!0,t(g,y,T))},Promise.all([e.or._iterate(c,n),Gn(Kn(e,o,n),e.algorithm,c,!e.keysOnly&&e.valueMapper)])):Gn(Kn(e,o,n),vt(e.algorithm,f),t,!e.keysOnly&&e.valueMapper)}function Gn(e,t,n,o){var l=ke(o?function(c,f,g){return n(o(c),f,g)}:n);return e.then(function(c){if(c)return c.start(function(){var f=function(){return c.continue()};t&&!t(c,function(g){return f=g},function(g){c.stop(g),f=Ae},function(g){c.fail(g),f=Ae})||l(c.value,c,function(g){return f=g}),f()})})}Ce.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,Te.bind(null,n.error)):n.table._trans("readonly",e).then(t)},Ce.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,Te.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},Ce.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=vt(t.algorithm,e)},Ce.prototype._iterate=function(e,t){return ga(this._ctx,e,t,this._ctx.table.core)},Ce.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&b(n,e),t._ctx=n,t},Ce.prototype.raw=function(){return this._ctx.valueMapper=null,this},Ce.prototype.each=function(e){var t=this._ctx;return this._read(function(n){return ga(t,e,n,t.table.core)})},Ce.prototype.count=function(e){var t=this;return this._read(function(n){var o,l=t._ctx,c=l.table.core;return Et(l,!0)?c.count({trans:n,query:{index:fa(l,c.schema),range:l.range}}).then(function(f){return Math.min(f,l.limit)}):(o=0,ga(l,function(){return++o,!1},n,c).then(function(){return o}))}).then(e)},Ce.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),o=n[0],l=n.length-1;function c(y,T){return T?c(y[n[T]],T-1):y[o]}var f=this._ctx.dir==="next"?1:-1;function g(y,T){return _e(c(y,l),c(T,l))*f}return this.toArray(function(y){return y.slice().sort(g)}).then(t)},Ce.prototype.toArray=function(e){var t=this;return this._read(function(n){var o,l,c,f=t._ctx;return Et(f,!0)&&0<f.limit?(o=f.valueMapper,l=fa(f,f.table.core.schema),f.table.core.query({trans:n,limit:f.limit,values:!0,direction:f.dir==="prev"?"prev":void 0,query:{index:l,range:f.range}}).then(function(g){return g=g.result,o?g.map(o):g})):(c=[],ga(f,function(g){return c.push(g)},n,f.table.core).then(function(){return c}))},e)},Ce.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,Et(t)?Ya(t,function(){var n=e;return function(o,l){return n===0||(n===1?--n:l(function(){o.advance(n),n=0}),!1)}}):Ya(t,function(){var n=e;return function(){return--n<0}})),this},Ce.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Ya(this._ctx,function(){var t=e;return function(n,o,l){return--t<=0&&o(l),0<=t}},!0),this},Ce.prototype.until=function(e,t){return Qa(this._ctx,function(n,o,l){return!e(n.value)||(o(l),t)}),this},Ce.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},Ce.prototype.last=function(e){return this.reverse().first(e)},Ce.prototype.filter=function(e){var t;return Qa(this._ctx,function(n){return e(n.value)}),(t=this._ctx).isMatch=vt(t.isMatch,e),this},Ce.prototype.and=function(e){return this.filter(e)},Ce.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},Ce.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},Ce.prototype.desc=function(){return this.reverse()},Ce.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,o){e(o.key,o)})},Ce.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},Ce.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,o){e(o.primaryKey,o)})},Ce.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(o,l){n.push(l.key)}).then(function(){return n}).then(e)},Ce.prototype.primaryKeys=function(e){var t=this._ctx;if(Et(t,!0)&&0<t.limit)return this._read(function(o){var l=fa(t,t.table.core.schema);return t.table.core.query({trans:o,values:!1,limit:t.limit,direction:t.dir==="prev"?"prev":void 0,query:{index:l,range:t.range}})}).then(function(o){return o.result}).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(o,l){n.push(l.primaryKey)}).then(function(){return n}).then(e)},Ce.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},Ce.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},Ce.prototype.lastKey=function(e){return this.reverse().firstKey(e)},Ce.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Qa(this._ctx,function(o){var o=o.primaryKey.toString(),l=k(e,o);return e[o]=!0,!l})),this},Ce.prototype.modify=function(e){var t=this,n=this._ctx;return this._write(function(o){function l(w,S){var I=S.failures;x+=w-S.numFailures;for(var D=0,$=u(I);D<$.length;D++){var N=$[D];v.push(I[N])}}var c=typeof e=="function"?e:function(w){return zn(w,e)},f=n.table.core,C=f.schema.primaryKey,g=C.outbound,y=C.extractKey,T=200,C=t.db._options.modifyChunkSize,v=(C&&(T=typeof C=="object"?C[f.name]||C["*"]||200:C),[]),x=0,E=[],P=e===Vn;return t.clone().primaryKeys().then(function(w){function S(D){var $=Math.min(T,w.length-D),N=w.slice(D,D+$);return(P?Promise.resolve([]):f.getMany({trans:o,keys:N,cache:"immutable"})).then(function(F){var U=[],G=[],te=g?[]:null,H=P?N:[];if(!P)for(var re=0;re<$;++re){var z=F[re],pe={value:ie(z),primKey:w[D+re]};c.call(pe,pe.value,pe)!==!1&&(pe.value==null?H.push(w[D+re]):g||_e(y(z),y(pe.value))===0?(G.push(pe.value),g&&te.push(w[D+re])):(H.push(w[D+re]),U.push(pe.value)))}return Promise.resolve(0<U.length&&f.mutate({trans:o,type:"add",values:U}).then(function(me){for(var ge in me.failures)H.splice(parseInt(ge),1);l(U.length,me)})).then(function(){return(0<G.length||I&&typeof e=="object")&&f.mutate({trans:o,type:"put",keys:te,values:G,criteria:I,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<D}).then(function(me){return l(G.length,me)})}).then(function(){return(0<H.length||I&&P)&&f.mutate({trans:o,type:"delete",keys:H,criteria:I,isAdditionalChunk:0<D}).then(function(me){return ma(n.table,H,me)}).then(function(me){return l(H.length,me)})}).then(function(){return w.length>D+$&&S(D+T)})})}var I=Et(n)&&n.limit===1/0&&(typeof e!="function"||P)&&{index:n.index,range:n.range};return S(0).then(function(){if(0<v.length)throw new aa("Error modifying one or more objects",v,x,E);return w.length})})})},Ce.prototype.delete=function(){var e=this._ctx,t=e.range;return!Et(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(Vn):this._write(function(n){var o=e.table.core.schema.primaryKey,l=t;return e.table.core.count({trans:n,query:{index:o,range:l}}).then(function(c){return e.table.core.mutate({trans:n,type:"deleteRange",range:l}).then(function(y){var g=y.failures,y=y.numFailures;if(y)throw new aa("Could not delete some values",Object.keys(g).map(function(T){return g[T]}),c-y);return c-y})})})};var Ro=Ce;function Ce(){}var Vn=function(e,t){return t.value=null};function Bo(e,t){return e<t?-1:e===t?0:1}function qo(e,t){return t<e?-1:e===t?0:1}function Ke(e,t,n){return e=e instanceof Un?new e.Collection(e):e,e._ctx.error=new(n||TypeError)(t),e}function kt(e){return new e.Collection(e,function(){return Hn("")}).limit(0)}function ba(E,t,n,o){var l,c,f,g,y,T,C,v=n.length;if(!n.every(function(w){return typeof w=="string"}))return Ke(E,jn);function x(w){l=w==="next"?function(I){return I.toUpperCase()}:function(I){return I.toLowerCase()},c=w==="next"?function(I){return I.toLowerCase()}:function(I){return I.toUpperCase()},f=w==="next"?Bo:qo;var S=n.map(function(I){return{lower:c(I),upper:l(I)}}).sort(function(I,D){return f(I.lower,D.lower)});g=S.map(function(I){return I.upper}),y=S.map(function(I){return I.lower}),C=(T=w)==="next"?"":o}x("next");var E=new E.Collection(E,function(){return lt(g[0],y[v-1]+o)}),P=(E._ondirectionchange=function(w){x(w)},0);return E._addAlgorithm(function(w,S,I){var D=w.key;if(typeof D=="string"){var $=c(D);if(t($,y,P))return!0;for(var N=null,F=P;F<v;++F){var U=((G,te,H,re,z,pe)=>{for(var me=Math.min(G.length,re.length),ge=-1,ye=0;ye<me;++ye){var Ge=te[ye];if(Ge!==re[ye])return z(G[ye],H[ye])<0?G.substr(0,ye)+H[ye]+H.substr(ye+1):z(G[ye],re[ye])<0?G.substr(0,ye)+re[ye]+H.substr(ye+1):0<=ge?G.substr(0,ge)+te[ge]+H.substr(ge+1):null;z(G[ye],Ge)<0&&(ge=ye)}return me<re.length&&pe==="next"?G+H.substr(G.length):me<G.length&&pe==="prev"?G.substr(0,H.length):ge<0?null:G.substr(0,ge)+re[ge]+H.substr(ge+1)})(D,$,g[F],y[F],f,T);U===null&&N===null?P=F+1:(N===null||0<f(N,U))&&(N=U)}S(N!==null?function(){w.continue(N+C)}:I)}return!1}),E}function lt(e,t,n,o){return{type:2,lower:e,upper:t,lowerOpen:n,upperOpen:o}}function Hn(e){return{type:1,lower:e,upper:e}}Object.defineProperty(Le.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Le.prototype.between=function(e,t,n,o){n=n!==!1,o=o===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(n||o)&&(!n||!o)?kt(this):new this.Collection(this,function(){return lt(e,t,!n,!o)})}catch{return Ke(this,Ze)}},Le.prototype.equals=function(e){return e==null?Ke(this,Ze):new this.Collection(this,function(){return Hn(e)})},Le.prototype.above=function(e){return e==null?Ke(this,Ze):new this.Collection(this,function(){return lt(e,void 0,!0)})},Le.prototype.aboveOrEqual=function(e){return e==null?Ke(this,Ze):new this.Collection(this,function(){return lt(e,void 0,!1)})},Le.prototype.below=function(e){return e==null?Ke(this,Ze):new this.Collection(this,function(){return lt(void 0,e,!1,!0)})},Le.prototype.belowOrEqual=function(e){return e==null?Ke(this,Ze):new this.Collection(this,function(){return lt(void 0,e)})},Le.prototype.startsWith=function(e){return typeof e!="string"?Ke(this,jn):this.between(e,e+ht,!0,!0)},Le.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):ba(this,function(t,n){return t.indexOf(n[0])===0},[e],ht)},Le.prototype.equalsIgnoreCase=function(e){return ba(this,function(t,n){return t===n[0]},[e],"")},Le.prototype.anyOfIgnoreCase=function(){var e=he.apply(xe,arguments);return e.length===0?kt(this):ba(this,function(t,n){return n.indexOf(t)!==-1},e,"")},Le.prototype.startsWithAnyOfIgnoreCase=function(){var e=he.apply(xe,arguments);return e.length===0?kt(this):ba(this,function(t,n){return n.some(function(o){return t.indexOf(o)===0})},e,ht)},Le.prototype.anyOf=function(){var e,t,n=this,o=he.apply(xe,arguments),l=this._cmp;try{o.sort(l)}catch{return Ke(this,Ze)}return o.length===0?kt(this):((e=new this.Collection(this,function(){return lt(o[0],o[o.length-1])}))._ondirectionchange=function(c){l=c==="next"?n._ascending:n._descending,o.sort(l)},t=0,e._addAlgorithm(function(c,f,g){for(var y=c.key;0<l(y,o[t]);)if(++t===o.length)return f(g),!1;return l(y,o[t])===0||(f(function(){c.continue(o[t])}),!1)}),e)},Le.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Le.prototype.noneOf=function(){var e=he.apply(xe,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return Ke(this,Ze)}var t=e.reduce(function(n,o){return n?n.concat([[n[n.length-1][1],o]]):[[-1/0,o]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},Le.prototype.inAnyRange=function(e,I){var n=this,o=this._cmp,l=this._ascending,c=this._descending,f=this._min,g=this._max;if(e.length===0)return kt(this);if(!e.every(function(D){return D[0]!==void 0&&D[1]!==void 0&&l(D[0],D[1])<=0}))return Ke(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",le.InvalidArgument);var y=!I||I.includeLowers!==!1,T=I&&I.includeUppers===!0,C,v=l;function x(D,$){return v(D[0],$[0])}try{(C=e.reduce(function(D,$){for(var N=0,F=D.length;N<F;++N){var U=D[N];if(o($[0],U[1])<0&&0<o($[1],U[0])){U[0]=f(U[0],$[0]),U[1]=g(U[1],$[1]);break}}return N===F&&D.push($),D},[])).sort(x)}catch{return Ke(this,Ze)}var E=0,P=T?function(D){return 0<l(D,C[E][1])}:function(D){return 0<=l(D,C[E][1])},w=y?function(D){return 0<c(D,C[E][0])}:function(D){return 0<=c(D,C[E][0])},S=P,I=new this.Collection(this,function(){return lt(C[0][0],C[C.length-1][1],!y,!T)});return I._ondirectionchange=function(D){v=D==="next"?(S=P,l):(S=w,c),C.sort(x)},I._addAlgorithm(function(D,$,N){for(var F,U=D.key;S(U);)if(++E===C.length)return $(N),!1;return!P(F=U)&&!w(F)||(n._cmp(U,C[E][1])===0||n._cmp(U,C[E][0])===0||$(function(){v===l?D.continue(C[E][0]):D.continue(C[E][1])}),!1)}),I},Le.prototype.startsWithAnyOf=function(){var e=he.apply(xe,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?kt(this):this.inAnyRange(e.map(function(t){return[t,t+ht]})):Ke(this,"startsWithAnyOf() only works with strings")};var Un=Le;function Le(){}function Ue(e){return ke(function(t){return Ft(t),e(t.target.error),!1})}function Ft(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var ha="storagemutated",Ja="x-storagemutated-1",ct=Nt(null,ha),No=(Qe.prototype._lock=function(){return Y(!oe.global),++this._reculock,this._reculock!==1||oe.global||(oe.lockOwnerFor=this),this},Qe.prototype._unlock=function(){if(Y(!oe.global),--this._reculock==0)for(oe.global||(oe.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{bt(e[1],e[0])}catch{}}return this},Qe.prototype._locked=function(){return this._reculock&&oe.lockOwnerFor!==this},Qe.prototype.create=function(e){var t=this;if(this.mode){var n=this.db.idbdb,o=this.db._state.dbOpenError;if(Y(!this.idbtrans),!e&&!n)switch(o&&o.name){case"DatabaseClosedError":throw new le.DatabaseClosed(o);case"MissingAPIError":throw new le.MissingAPI(o.message,o);default:throw new le.OpenFailed(o)}if(!this.active)throw new le.TransactionInactive;Y(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||n).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=ke(function(l){Ft(l),t._reject(e.error)}),e.onabort=ke(function(l){Ft(l),t.active&&t._reject(new le.Abort(e.error)),t.active=!1,t.on("abort").fire(l)}),e.oncomplete=ke(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&ct.storagemutated.fire(e.mutatedParts)})}return this},Qe.prototype._promise=function(e,t,n){var o,l=this;return e==="readwrite"&&this.mode!=="readwrite"?Te(new le.ReadOnly("Transaction is readonly")):this.active?this._locked()?new J(function(c,f){l._blockedFuncs.push([function(){l._promise(e,t,n).then(c,f)},oe])}):n?ot(function(){var c=new J(function(f,g){l._lock();var y=t(f,g,l);y&&y.then&&y.then(f,g)});return c.finally(function(){return l._unlock()}),c._lib=!0,c}):((o=new J(function(c,f){var g=t(c,f,l);g&&g.then&&g.then(c,f)}))._lib=!0,o):Te(new le.TransactionInactive)},Qe.prototype._root=function(){return this.parent?this.parent._root():this},Qe.prototype.waitFor=function(e){var t,n=this._root(),o=J.resolve(e),l=(n._waitingFor?n._waitingFor=n._waitingFor.then(function(){return o}):(n._waitingFor=o,n._waitingQueue=[],t=n.idbtrans.objectStore(n.storeNames[0]),(function c(){for(++n._spinCount;n._waitingQueue.length;)n._waitingQueue.shift()();n._waitingFor&&(t.get(-1/0).onsuccess=c)})()),n._waitingFor);return new J(function(c,f){o.then(function(g){return n._waitingQueue.push(ke(c.bind(null,g)))},function(g){return n._waitingQueue.push(ke(f.bind(null,g)))}).finally(function(){n._waitingFor===l&&(n._waitingFor=null)})})},Qe.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new le.Abort))},Qe.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(k(t,e))return t[e];var n=this.schema[e];if(n)return(n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new le.NotFound("Table "+e+" not part of transaction")},Qe);function Qe(){}function Za(e,t,n,o,l,c,f,g){return{name:e,keyPath:t,unique:n,multi:o,auto:l,compound:c,src:(n&&!f?"&":"")+(o?"*":"")+(l?"++":"")+Wn(t),type:g}}function Wn(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function Xa(e,t,n){return{name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(o=function(l){return[l.name,l]},n.reduce(function(l,c,f){return c=o(c,f),c&&(l[c[0]]=c[1]),l},{}))};var o}var Kt=function(e){try{return e.only([[]]),Kt=function(){return[[]]},[[]]}catch{return Kt=function(){return ht},ht}};function en(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(n){return n[t]}:function(n){return W(n,t)}:function(n){return W(n,e)};var t}function Qn(e){return[].slice.call(e)}var zo=0;function Gt(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function Fo(e,t,f){function o(S){if(S.type===3)return null;if(S.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var E=S.lower,P=S.upper,w=S.lowerOpen,S=S.upperOpen;return E===void 0?P===void 0?null:t.upperBound(P,!!S):P===void 0?t.lowerBound(E,!!w):t.bound(E,P,!!w,!!S)}function l(x){var E,P,w=x.name;return{name:w,schema:x,mutate:function(S){var I=S.trans,D=S.type,$=S.keys,N=S.values,F=S.range;return new Promise(function(U,G){U=ke(U);var te=I.objectStore(w),H=te.keyPath==null,re=D==="put"||D==="add";if(!re&&D!=="delete"&&D!=="deleteRange")throw new Error("Invalid operation type: "+D);var z,pe=($||N||{length:1}).length;if($&&N&&$.length!==N.length)throw new Error("Given keys array must have same length as given values array.");if(pe===0)return U({numFailures:0,failures:{},results:[],lastResult:void 0});function me(Ne){++Ge,Ft(Ne)}var ge=[],ye=[],Ge=0;if(D==="deleteRange"){if(F.type===4)return U({numFailures:Ge,failures:ye,results:[],lastResult:void 0});F.type===3?ge.push(z=te.clear()):ge.push(z=te.delete(o(F)))}else{var H=re?H?[N,$]:[N,null]:[$,null],fe=H[0],Re=H[1];if(re)for(var Be=0;Be<pe;++Be)ge.push(z=Re&&Re[Be]!==void 0?te[D](fe[Be],Re[Be]):te[D](fe[Be])),z.onerror=me;else for(Be=0;Be<pe;++Be)ge.push(z=te[D](fe[Be])),z.onerror=me}function Ta(Ne){Ne=Ne.target.result,ge.forEach(function(_t,yn){return _t.error!=null&&(ye[yn]=_t.error)}),U({numFailures:Ge,failures:ye,results:D==="delete"?$:ge.map(function(_t){return _t.result}),lastResult:Ne})}z.onerror=function(Ne){me(Ne),Ta(Ne)},z.onsuccess=Ta})},getMany:function(S){var I=S.trans,D=S.keys;return new Promise(function($,N){$=ke($);for(var F,U=I.objectStore(w),G=D.length,te=new Array(G),H=0,re=0,z=function(ge){ge=ge.target,te[ge._pos]=ge.result,++re===H&&$(te)},pe=Ue(N),me=0;me<G;++me)D[me]!=null&&((F=U.get(D[me]))._pos=me,F.onsuccess=z,F.onerror=pe,++H);H===0&&$(te)})},get:function(S){var I=S.trans,D=S.key;return new Promise(function($,N){$=ke($);var F=I.objectStore(w).get(D);F.onsuccess=function(U){return $(U.target.result)},F.onerror=Ue(N)})},query:(E=y,P=T,function(S){return new Promise(function(I,D){I=ke(I);var $,N,F,U,pe=S.trans,G=S.values,te=S.limit,z=S.query,H=(H=S.direction)!=null?H:"next",re=te===1/0?void 0:te,me=z.index,z=z.range,pe=pe.objectStore(w),pe=me.isPrimaryKey?pe:pe.index(me.name),me=o(z);if(te===0)return I({result:[]});P?(z={query:me,count:re,direction:H},($=G?pe.getAll(z):pe.getAllKeys(z)).onsuccess=function(ge){return I({result:ge.target.result})},$.onerror=Ue(D)):E&&H==="next"?(($=G?pe.getAll(me,re):pe.getAllKeys(me,re)).onsuccess=function(ge){return I({result:ge.target.result})},$.onerror=Ue(D)):(N=0,F=!G&&"openKeyCursor"in pe?pe.openKeyCursor(me,H):pe.openCursor(me,H),U=[],F.onsuccess=function(){var ge=F.result;return!ge||(U.push(G?ge.value:ge.primaryKey),++N===te)?I({result:U}):void ge.continue()},F.onerror=Ue(D))})}),openCursor:function(S){var I=S.trans,D=S.values,$=S.query,N=S.reverse,F=S.unique;return new Promise(function(U,G){U=ke(U);var re=$.index,te=$.range,H=I.objectStore(w),H=re.isPrimaryKey?H:H.index(re.name),re=N?F?"prevunique":"prev":F?"nextunique":"next",z=!D&&"openKeyCursor"in H?H.openKeyCursor(o(te),re):H.openCursor(o(te),re);z.onerror=Ue(G),z.onsuccess=ke(function(pe){var me,ge,ye,Ge,fe=z.result;fe?(fe.___id=++zo,fe.done=!1,me=fe.continue.bind(fe),ge=(ge=fe.continuePrimaryKey)&&ge.bind(fe),ye=fe.advance.bind(fe),Ge=function(){throw new Error("Cursor not stopped")},fe.trans=I,fe.stop=fe.continue=fe.continuePrimaryKey=fe.advance=function(){throw new Error("Cursor not started")},fe.fail=ke(G),fe.next=function(){var Re=this,Be=1;return this.start(function(){return Be--?Re.continue():Re.stop()}).then(function(){return Re})},fe.start=function(Re){function Be(){if(z.result)try{Re()}catch(Ne){fe.fail(Ne)}else fe.done=!0,fe.start=function(){throw new Error("Cursor behind last entry")},fe.stop()}var Ta=new Promise(function(Ne,_t){Ne=ke(Ne),z.onerror=Ue(_t),fe.fail=_t,fe.stop=function(yn){fe.stop=fe.continue=fe.continuePrimaryKey=fe.advance=Ge,Ne(yn)}});return z.onsuccess=ke(function(Ne){z.onsuccess=Be,Be()}),fe.continue=me,fe.continuePrimaryKey=ge,fe.advance=ye,Be(),Ta},U(fe)):U(null)},G)})},count:function(S){var I=S.query,D=S.trans,$=I.index,N=I.range;return new Promise(function(F,U){var G=D.objectStore(w),G=$.isPrimaryKey?G:G.index($.name),te=o(N),te=te?G.count(te):G.count();te.onsuccess=ke(function(H){return F(H.target.result)}),te.onerror=Ue(U)})}}}c=f,g=Qn((f=e).objectStoreNames),C=0<g.length?c.objectStore(g[0]):{};var c,f={schema:{name:f.name,tables:g.map(function(x){return c.objectStore(x)}).map(function(x){var E=x.keyPath,P=x.autoIncrement,S=m(E),w={},S={name:x.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:E==null,compound:S,keyPath:E,autoIncrement:P,unique:!0,extractKey:en(E)},indexes:Qn(x.indexNames).map(function(I){return x.index(I)}).map(function(N){var F=N.name,D=N.unique,$=N.multiEntry,N=N.keyPath,F={name:F,compound:m(N),keyPath:N,unique:D,multiEntry:$,extractKey:en(N)};return w[Gt(N)]=F}),getIndexByKeyPath:function(I){return w[Gt(I)]}};return w[":id"]=S.primaryKey,E!=null&&(w[Gt(E)]=S.primaryKey),S})},hasGetAll:0<g.length&&"getAll"in C&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in C},g=f.schema,y=f.hasGetAll,T=f.hasIdb3Features,C=g.tables.map(l),v={};return C.forEach(function(x){return v[x.name]=x}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(x){if(v[x])return v[x];throw new Error("Table '".concat(x,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Kt(t),schema:g}}function Ko(e,t,n,o){return n=n.IDBKeyRange,t=Fo(t,n,o),{dbcore:e.dbcore.reduce(function(l,c){return c=c.create,i(i({},l),c(l))},t)}}function va(e,t){var n=t.db,n=Ko(e._middlewares,n,e._deps,t);e.core=n.dbcore,e.tables.forEach(function(o){var l=o.name;e.core.schema.tables.some(function(c){return c.name===l})&&(o.core=e.core.table(l),e[l]instanceof e.Table)&&(e[l].core=o.core)})}function ya(e,t,n,o){n.forEach(function(l){var c=o[l];t.forEach(function(f){var g=(function y(T,C){return K(T,C)||(T=h(T))&&y(T,C)})(f,l);(!g||"value"in g&&g.value===void 0)&&(f===e.Transaction.prototype||f instanceof e.Transaction?j(f,l,{get:function(){return this.table(l)},set:function(y){q(this,l,{value:y,writable:!0,configurable:!0,enumerable:!0})}}):f[l]=new e.Table(l,c))})})}function tn(e,t){t.forEach(function(n){for(var o in n)n[o]instanceof e.Table&&delete n[o]})}function Go(e,t){return e._cfg.version-t._cfg.version}function Vo(e,t,n,o){var l=e._dbSchema,c=(n.objectStoreNames.contains("$meta")&&!l.$meta&&(l.$meta=Xa("$meta",Jn("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,l)),f=(c.create(n),c._completion.catch(o),c._reject.bind(c)),g=oe.transless||oe;ot(function(){if(oe.trans=c,oe.transless=g,t!==0)return va(e,n),T=t,((y=c).storeNames.includes("$meta")?y.table("$meta").get("version").then(function(C){return C??T}):J.resolve(T)).then(function(S){var v=e,x=S,E=c,P=n,w=[],S=v._versions,I=v._dbSchema=_a(0,v.idbdb,P);return(S=S.filter(function(D){return D._cfg.version>=x})).length===0?J.resolve():(S.forEach(function(D){w.push(function(){var $,N,F,U=I,G=D._cfg.dbschema,te=(Ca(v,U,P),Ca(v,G,P),I=v._dbSchema=G,an(U,G)),H=(te.add.forEach(function(re){nn(P,re[0],re[1].primKey,re[1].indexes)}),te.change.forEach(function(re){if(re.recreate)throw new le.Upgrade("Not yet support for changing primary key");var z=P.objectStore(re.name);re.add.forEach(function(pe){return xa(z,pe)}),re.change.forEach(function(pe){z.deleteIndex(pe.name),xa(z,pe)}),re.del.forEach(function(pe){return z.deleteIndex(pe)})}),D._cfg.contentUpgrade);if(H&&D._cfg.version>x)return va(v,P),E._memoizedTables={},$=se(G),te.del.forEach(function(re){$[re]=U[re]}),tn(v,[v.Transaction.prototype]),ya(v,[v.Transaction.prototype],u($),$),E.schema=$,(N=Pe(H))&&St(),G=J.follow(function(){var re;(F=H(E))&&N&&(re=it.bind(null,null),F.then(re,re))}),F&&typeof F.then=="function"?J.resolve(F):G.then(function(){return F})}),w.push(function($){var N,F,U=D._cfg.dbschema;N=U,F=$,[].slice.call(F.db.objectStoreNames).forEach(function(G){return N[G]==null&&F.db.deleteObjectStore(G)}),tn(v,[v.Transaction.prototype]),ya(v,[v.Transaction.prototype],v._storeNames,v._dbSchema),E.schema=v._dbSchema}),w.push(function($){v.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(v.idbdb.version/10)===D._cfg.version?(v.idbdb.deleteObjectStore("$meta"),delete v._dbSchema.$meta,v._storeNames=v._storeNames.filter(function(N){return N!=="$meta"})):$.objectStore("$meta").put(D._cfg.version,"version"))})}),(function D(){return w.length?J.resolve(w.shift()(E.idbtrans)).then(D):J.resolve()})().then(function(){Yn(I,P)}))}).catch(f);var y,T;u(l).forEach(function(C){nn(n,C,l[C].primKey,l[C].indexes)}),va(e,n),J.follow(function(){return e.on.populate.fire(c)}).catch(f)})}function Ho(e,t){Yn(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var n=_a(0,e.idbdb,t);Ca(e,e._dbSchema,t);for(var o=0,l=an(n,e._dbSchema).change;o<l.length;o++){var c=(f=>{if(f.change.length||f.recreate)return console.warn("Unable to patch indexes of table ".concat(f.name," because it has changes on the type of index or primary key.")),{value:void 0};var g=t.objectStore(f.name);f.add.forEach(function(y){We&&console.debug("Dexie upgrade patch: Creating missing index ".concat(f.name,".").concat(y.src)),xa(g,y)})})(l[o]);if(typeof c=="object")return c.value}}function an(e,t){var n,o={del:[],add:[],change:[]};for(n in e)t[n]||o.del.push(n);for(n in t){var l=e[n],c=t[n];if(l){var f={name:n,def:c,recreate:!1,del:[],add:[],change:[]};if(""+(l.primKey.keyPath||"")!=""+(c.primKey.keyPath||"")||l.primKey.auto!==c.primKey.auto)f.recreate=!0,o.change.push(f);else{var g=l.idxByName,y=c.idxByName,T=void 0;for(T in g)y[T]||f.del.push(T);for(T in y){var C=g[T],v=y[T];C?C.src!==v.src&&f.change.push(v):f.add.push(v)}(0<f.del.length||0<f.add.length||0<f.change.length)&&o.change.push(f)}}else o.add.push([n,c])}return o}function nn(e,t,n,o){var l=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});o.forEach(function(c){return xa(l,c)})}function Yn(e,t){u(e).forEach(function(n){t.db.objectStoreNames.contains(n)||(We&&console.debug("Dexie: Creating missing table",n),nn(t,n,e[n].primKey,e[n].indexes))})}function xa(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function _a(e,t,n){var o={};return B(t.objectStoreNames,0).forEach(function(l){for(var c=n.objectStore(l),f=Za(Wn(T=c.keyPath),T||"",!0,!1,!!c.autoIncrement,T&&typeof T!="string",!0),g=[],y=0;y<c.indexNames.length;++y){var C=c.index(c.indexNames[y]),T=C.keyPath,C=Za(C.name,T,!!C.unique,!!C.multiEntry,!1,T&&typeof T!="string",!1);g.push(C)}o[l]=Xa(l,f,g)}),o}function Ca(e,t,n){for(var o=n.db.objectStoreNames,l=0;l<o.length;++l){var c=o[l],f=n.objectStore(c);e._hasGetAll="getAll"in f;for(var g=0;g<f.indexNames.length;++g){var y,T=f.indexNames[g],C=f.index(T).keyPath,C=typeof C=="string"?C:"["+B(C).join("+")+"]";t[c]&&(y=t[c].idxByName[C])&&(y.name=T,delete t[c].idxByName[C],t[c].idxByName[T]=y)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&p.WorkerGlobalScope&&p instanceof p.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function Jn(e){return e.split(",").map(function(t,n){var l=t.split(":"),o=(o=l[1])==null?void 0:o.trim(),l=(t=l[0].trim()).replace(/([&*]|\+\+)/g,""),c=/^\[/.test(l)?l.match(/^\[(.*)\]$/)[1].split("+"):l;return Za(l,c||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),m(c),n===0,o)})}Tt.prototype._createTableSchema=Xa,Tt.prototype._parseIndexSyntax=Jn,Tt.prototype._parseStoresSpec=function(e,t){var n=this;u(e).forEach(function(o){if(e[o]!==null){var l=n._parseIndexSyntax(e[o]),c=l.shift();if(!c)throw new le.Schema("Invalid schema for table "+o+": "+e[o]);if(c.unique=!0,c.multi)throw new le.Schema("Primary key cannot be multiEntry*");l.forEach(function(f){if(f.auto)throw new le.Schema("Only primary key can be marked as autoIncrement (++)");if(!f.keyPath)throw new le.Schema("Index must have a name and cannot be an empty string")}),c=n._createTableSchema(o,c,l),t[o]=c}})},Tt.prototype.stores=function(n){var t=this.db,n=(this._cfg.storesSource=this._cfg.storesSource?b(this._cfg.storesSource,n):n,t._versions),o={},l={};return n.forEach(function(c){b(o,c._cfg.storesSource),l=c._cfg.dbschema={},c._parseStoresSpec(o,l)}),t._dbSchema=l,tn(t,[t._allTables,t,t.Transaction.prototype]),ya(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],u(l),l),t._storeNames=u(l),this},Tt.prototype.upgrade=function(e){return this._cfg.contentUpgrade=Ba(this._cfg.contentUpgrade||Ae,e),this};var Uo=Tt;function Tt(){}var Vt=(()=>{var e,t,n;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(e=new Set,t=new FinalizationRegistry(function(o){e.delete(o)}),{toArray:function(){return Array.from(e).map(function(o){return o.deref()}).filter(function(o){return o!==void 0})},add:function(o){var l=new WeakRef(o._novip);e.add(l),t.register(o._novip,l,l),e.size>o._options.maxConnections&&(l=e.values().next().value,e.delete(l),t.unregister(l))},remove:function(o){if(o)for(var l=e.values(),c=l.next();!c.done;){var f=c.value;if(f.deref()===o._novip)return e.delete(f),void t.unregister(f);c=l.next()}}}):(n=[],{toArray:function(){return n},add:function(o){n.push(o._novip)},remove:function(o){o&&(o=n.indexOf(o._novip))!==-1&&n.splice(o,1)}})})();function rn(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new Xe(ua,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function on(e){return e&&typeof e.databases=="function"}function sn(e){return ot(function(){return oe.letThrough=!0,e()})}function ln(e){return!("from"in e)}var Me=function(e,t){var n;if(!this)return n=new Me,e&&"d"in e&&b(n,e),n;b(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Ht(e,t,n){var o=_e(t,n);if(!isNaN(o)){if(0<o)throw RangeError();if(ln(e))return b(e,{from:t,to:n,d:1});var o=e.l,l=e.r;if(_e(n,e.from)<0)return o?Ht(o,t,n):e.l={from:t,to:n,d:1,l:null,r:null},Xn(e);if(0<_e(t,e.to))return l?Ht(l,t,n):e.r={from:t,to:n,d:1,l:null,r:null},Xn(e);_e(t,e.from)<0&&(e.from=t,e.l=null,e.d=l?l.d+1:1),0<_e(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,o&&!e.l&&Ut(e,o),l&&t&&Ut(e,l)}}function Ut(e,t){ln(t)||(function n(o,l){var c=l.from,f=l.l,g=l.r;Ht(o,c,l.to),f&&n(o,f),g&&n(o,g)})(e,t)}function Zn(e,t){var n=wa(t),o=n.next();if(!o.done)for(var l=o.value,c=wa(e),f=c.next(l.from),g=f.value;!o.done&&!f.done;){if(_e(g.from,l.to)<=0&&0<=_e(g.to,l.from))return!0;_e(l.from,g.from)<0?l=(o=n.next(g.from)).value:g=(f=c.next(l.from)).value}return!1}function wa(e){var t=ln(e)?null:{s:0,n:e};return{next:function(n){for(var o=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,o)for(;t.n.l&&_e(n,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!o||_e(n,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function Xn(e){var t,n,o,l=(((l=e.r)==null?void 0:l.d)||0)-(((l=e.l)==null?void 0:l.d)||0),l=1<l?"r":l<-1?"l":"";l&&(t=l=="r"?"l":"r",n=i({},e),o=e[l],e.from=o.from,e.to=o.to,e[l]=o[l],n[l]=o[t],(e[t]=n).d=er(n)),e.d=er(e)}function er(n){var t=n.r,n=n.l;return(t?n?Math.max(t.d,n.d):t.d:n?n.d:0)+1}function Pa(e,t){return u(t).forEach(function(n){e[n]?Ut(e[n],t[n]):e[n]=(function o(l){var c,f,g={};for(c in l)k(l,c)&&(f=l[c],g[c]=!f||typeof f!="object"||be.has(f.constructor)?f:o(f));return g})(t[n])}),e}function cn(e,t){return e.all||t.all||Object.keys(e).some(function(n){return t[n]&&Zn(t[n],e[n])})}L(Me.prototype,((Fe={add:function(e){return Ut(this,e),this},addKey:function(e){return Ht(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(n){return Ht(t,n,n)}),this},hasKey:function(e){var t=wa(this).next(e).value;return t&&_e(t.from,e)<=0&&0<=_e(t.to,e)}})[Z]=function(){return wa(this)},Fe));var yt={},dn={},un=!1;function Aa(e){Pa(dn,e),un||(un=!0,setTimeout(function(){un=!1,pn(dn,!(dn={}))},0))}function pn(e,t){t===void 0&&(t=!1);var n=new Set;if(e.all)for(var o=0,l=Object.values(yt);o<l.length;o++)tr(g=l[o],e,n,t);else for(var c in e){var f,g,c=/^idb\:\/\/(.*)\/(.*)\//.exec(c);c&&(f=c[1],c=c[2],g=yt["idb://".concat(f,"/").concat(c)])&&tr(g,e,n,t)}n.forEach(function(y){return y()})}function tr(e,t,n,o){for(var l=[],c=0,f=Object.entries(e.queries.query);c<f.length;c++){for(var g=f[c],y=g[0],T=[],C=0,v=g[1];C<v.length;C++){var x=v[C];cn(t,x.obsSet)?x.subscribers.forEach(function(S){return n.add(S)}):o&&T.push(x)}o&&l.push([y,T])}if(o)for(var E=0,P=l;E<P.length;E++){var w=P[E],y=w[0],T=w[1];e.queries.query[y]=T}}function Wo(e){var t=e._state,n=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?Te(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var o=t.openCanceller,l=Math.round(10*e.verno),c=!1;function f(){if(t.openCanceller!==o)throw new le.DatabaseClosed("db.open() was cancelled")}function g(){return new J(function(x,E){if(f(),!n)throw new le.MissingAPI;var P=e.name,w=t.autoSchema||!l?n.open(P):n.open(P,l);if(!w)throw new le.MissingAPI;w.onerror=Ue(E),w.onblocked=ke(e._fireOnBlocked),w.onupgradeneeded=ke(function(S){var I;C=w.transaction,t.autoSchema&&!e._options.allowEmptyDB?(w.onerror=Ft,C.abort(),w.result.close(),(I=n.deleteDatabase(P)).onsuccess=I.onerror=ke(function(){E(new le.NoSuchDatabase("Database ".concat(P," doesnt exist")))})):(C.onerror=Ue(E),I=S.oldVersion>Math.pow(2,62)?0:S.oldVersion,v=I<1,e.idbdb=w.result,c&&Ho(e,C),Vo(e,I/10,C,E))},E),w.onsuccess=ke(function(){C=null;var S,I,D,$,N,F,U=e.idbdb=w.result,G=B(U.objectStoreNames);if(0<G.length)try{var te=U.transaction((N=G).length===1?N[0]:N,"readonly");if(t.autoSchema)F=U,$=te,(D=e).verno=F.version/10,$=D._dbSchema=_a(0,F,$),D._storeNames=B(F.objectStoreNames,0),ya(D,[D._allTables],u($),$);else if(Ca(e,e._dbSchema,te),I=te,((I=an(_a(0,(S=e).idbdb,I),S._dbSchema)).add.length||I.change.some(function(H){return H.add.length||H.change.length}))&&!c)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),U.close(),l=U.version+1,c=!0,x(g());va(e,te)}catch{}Vt.add(e),U.onversionchange=ke(function(H){t.vcFired=!0,e.on("versionchange").fire(H)}),U.onclose=ke(function(){e.close({disableAutoOpen:!1})}),v&&(G=e._deps,N=P,on(F=G.indexedDB)||N===ua||rn(F,G.IDBKeyRange).put({name:N}).catch(Ae)),x()},E)}).catch(function(x){switch(x==null?void 0:x.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),g();break;case"VersionError":if(0<l)return l=0,g()}return J.reject(x)})}var y,T=t.dbReadyResolve,C=null,v=!1;return J.race([o,(typeof navigator>"u"?J.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(x){function E(){return indexedDB.databases().finally(x)}y=setInterval(E,100),E()}).finally(function(){return clearInterval(y)}):Promise.resolve()).then(g)]).then(function(){return f(),t.onReadyBeingFired=[],J.resolve(sn(function(){return e.on.ready.fire(e.vip)})).then(function x(){var E;if(0<t.onReadyBeingFired.length)return E=t.onReadyBeingFired.reduce(Ba,Ae),t.onReadyBeingFired=[],J.resolve(sn(function(){return E(e.vip)})).then(x)})}).finally(function(){t.openCanceller===o&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(x){t.dbOpenError=x;try{C&&C.abort()}catch{}return o===t.openCanceller&&e._close(),Te(x)}).finally(function(){t.openComplete=!0,T()}).then(function(){var x;return v&&(x={},e.tables.forEach(function(E){E.schema.indexes.forEach(function(P){P.name&&(x["idb://".concat(e.name,"/").concat(E.name,"/").concat(P.name)]=new Me(-1/0,[[[]]]))}),x["idb://".concat(e.name,"/").concat(E.name,"/")]=x["idb://".concat(e.name,"/").concat(E.name,"/:dels")]=new Me(-1/0,[[[]]])}),ct(ha).fire(x),pn(x,!0)),e})}function mn(e){function t(c){return e.next(c)}var n=l(t),o=l(function(c){return e.throw(c)});function l(c){return function(g){var g=c(g),y=g.value;return g.done?y:y&&typeof y.then=="function"?y.then(n,o):m(y)?Promise.all(y).then(n,o):n(y)}}return l(t)()}function Sa(e,t,n){for(var o=m(e)?e.slice():[e],l=0;l<n;++l)o.push(t);return o}var Qo={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return i(i({},e),{table:function(o){var n=e.table(o),o=n.schema,l=Object.create(null),c=[];function f(x,E,P){var D=Gt(x),w=l[D]=l[D]||[],S=x==null?0:typeof x=="string"?1:x.length,I=0<E,D=i(i({},P),{name:I?"".concat(D,"(virtual-from:").concat(P.name,")"):P.name,lowLevelIndex:P,isVirtual:I,keyTail:E,keyLength:S,extractKey:en(x),unique:!I&&P.unique});return w.push(D),D.isPrimaryKey||c.push(D),1<S&&f(S===2?x[0]:x.slice(0,S-1),E+1,P),w.sort(function($,N){return $.keyTail-N.keyTail}),D}var g=f(o.primaryKey.keyPath,0,o.primaryKey);l[":id"]=[g];for(var y=0,T=o.indexes;y<T.length;y++){var C=T[y];f(C.keyPath,0,C)}function v(x){var E,P=x.query.index;return P.isVirtual?i(i({},x),{query:{index:P.lowLevelIndex,range:(E=x.query.range,P=P.keyTail,{type:E.type===1?2:E.type,lower:Sa(E.lower,E.lowerOpen?e.MAX_KEY:e.MIN_KEY,P),lowerOpen:!0,upper:Sa(E.upper,E.upperOpen?e.MIN_KEY:e.MAX_KEY,P),upperOpen:!0})}}):x}return i(i({},n),{schema:i(i({},o),{primaryKey:g,indexes:c,getIndexByKeyPath:function(x){return(x=l[Gt(x)])&&x[0]}}),count:function(x){return n.count(v(x))},query:function(x){return n.query(v(x))},openCursor:function(x){var E=x.query.index,P=E.keyTail,w=E.keyLength;return E.isVirtual?n.openCursor(v(x)).then(function(I){return I&&S(I)}):n.openCursor(x);function S(I){return Object.create(I,{continue:{value:function(D){D!=null?I.continue(Sa(D,x.reverse?e.MAX_KEY:e.MIN_KEY,P)):x.unique?I.continue(I.key.slice(0,w).concat(x.reverse?e.MIN_KEY:e.MAX_KEY,P)):I.continue()}},continuePrimaryKey:{value:function(D,$){I.continuePrimaryKey(Sa(D,e.MAX_KEY,P),$)}},primaryKey:{get:function(){return I.primaryKey}},key:{get:function(){var D=I.key;return w===1?D[0]:D.slice(0,w)}},value:{get:function(){return I.value}}})}}})}})}};function fn(e,t,n,o){return n=n||{},o=o||"",u(e).forEach(function(l){var c,f,g;k(t,l)?(c=e[l],f=t[l],typeof c=="object"&&typeof f=="object"&&c&&f?(g=R(c))!==R(f)?n[o+l]=t[l]:g==="Object"?fn(c,f,n,o+l+"."):c!==f&&(n[o+l]=t[l]):c!==f&&(n[o+l]=t[l])):n[o+l]=void 0}),u(t).forEach(function(l){k(e,l)||(n[o+l]=t[l])}),n}function gn(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var Yo={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return i(i({},e),{table:function(t){var n=e.table(t),o=n.schema.primaryKey;return i(i({},n),{mutate:function(l){var c=oe.trans,f=c.table(t).hook,g=f.deleting,y=f.creating,T=f.updating;switch(l.type){case"add":if(y.fire===Ae)break;return c._promise("readwrite",function(){return C(l)},!0);case"put":if(y.fire===Ae&&T.fire===Ae)break;return c._promise("readwrite",function(){return C(l)},!0);case"delete":if(g.fire===Ae)break;return c._promise("readwrite",function(){return C(l)},!0);case"deleteRange":if(g.fire===Ae)break;return c._promise("readwrite",function(){return(function v(x,E,P){return n.query({trans:x,values:!1,query:{index:o,range:E},limit:P}).then(function(w){var S=w.result;return C({type:"delete",keys:S,trans:x}).then(function(I){return 0<I.numFailures?Promise.reject(I.failures[0]):S.length<P?{failures:[],numFailures:0,lastResult:void 0}:v(x,i(i({},E),{lower:S[S.length-1],lowerOpen:!0}),P)})})})(l.trans,l.range,1e4)},!0)}return n.mutate(l);function C(v){var x,E,P,w=oe.trans,S=v.keys||gn(o,v);if(S)return(v=v.type==="add"||v.type==="put"?i(i({},v),{keys:S}):i({},v)).type!=="delete"&&(v.values=s([],v.values)),v.keys&&(v.keys=s([],v.keys)),x=n,P=S,((E=v).type==="add"?Promise.resolve([]):x.getMany({trans:E.trans,keys:P,cache:"immutable"})).then(function(I){var D=S.map(function($,N){var F,U,G,te=I[N],H={onerror:null,onsuccess:null};return v.type==="delete"?g.fire.call(H,$,te,w):v.type==="add"||te===void 0?(F=y.fire.call(H,$,v.values[N],w),$==null&&F!=null&&(v.keys[N]=$=F,o.outbound||X(v.values[N],o.keyPath,$))):(F=fn(te,v.values[N]),(U=T.fire.call(H,F,$,te,w))&&(G=v.values[N],Object.keys(U).forEach(function(re){k(G,re)?G[re]=U[re]:X(G,re,U[re])}))),H});return n.mutate(v).then(function($){for(var N=$.failures,F=$.results,U=$.numFailures,$=$.lastResult,G=0;G<S.length;++G){var te=(F||S)[G],H=D[G];te==null?H.onerror&&H.onerror(N[G]):H.onsuccess&&H.onsuccess(v.type==="put"&&I[G]?v.values[G]:te)}return{failures:N,results:F,numFailures:U,lastResult:$}}).catch(function($){return D.forEach(function(N){return N.onerror&&N.onerror($)}),Promise.reject($)})});throw new Error("Keys missing")}}})}})}};function ar(e,t,n){try{if(!t||t.keys.length<e.length)return null;for(var o=[],l=0,c=0;l<t.keys.length&&c<e.length;++l)_e(t.keys[l],e[c])===0&&(o.push(n?ie(t.values[l]):t.values[l]),++c);return o.length===e.length?o:null}catch{return null}}var Jo={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var n=e.table(t);return i(i({},n),{getMany:function(o){var l;return o.cache?(l=ar(o.keys,o.trans._cache,o.cache==="clone"))?J.resolve(l):n.getMany(o).then(function(c){return o.trans._cache={keys:o.keys,values:o.cache==="clone"?ie(c):c},c}):n.getMany(o)},mutate:function(o){return o.type!=="add"&&(o.trans._cache=null),n.mutate(o)}})}}}};function nr(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function rr(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var Zo={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,n=new Me(e.MIN_KEY,e.MAX_KEY);return i(i({},e),{transaction:function(o,l,c){if(oe.subscr&&l!=="readonly")throw new le.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(oe.querier));return e.transaction(o,l,c)},table:function(o){function l(S){var w,S=S.query;return[w=S.index,new Me((w=(S=S.range).lower)!=null?w:e.MIN_KEY,(w=S.upper)!=null?w:e.MAX_KEY)]}var c=e.table(o),f=c.schema,g=f.primaryKey,y=f.indexes,T=g.extractKey,C=g.outbound,v=g.autoIncrement&&y.filter(function(P){return P.compound&&P.keyPath.includes(g.keyPath)}),x=i(i({},c),{mutate:function(P){function w(z){return z="idb://".concat(t,"/").concat(o,"/").concat(z),N[z]||(N[z]=new Me)}var S,I,D,$=P.trans,N=P.mutatedParts||(P.mutatedParts={}),F=w(""),U=w(":dels"),G=P.type,H=P.type==="deleteRange"?[P.range]:P.type==="delete"?[P.keys]:P.values.length<50?[gn(g,P).filter(function(z){return z}),P.values]:[],te=H[0],H=H[1],re=P.trans._cache;return m(te)?(F.addKeys(te),(G=G==="delete"||te.length===H.length?ar(te,re):null)||U.addKeys(te),(G||H)&&(S=w,I=G,D=H,f.indexes.forEach(function(z){var pe=S(z.name||"");function me(ye){return ye!=null?z.extractKey(ye):null}function ge(ye){z.multiEntry&&m(ye)?ye.forEach(function(Ge){return pe.addKey(Ge)}):pe.addKey(ye)}(I||D).forEach(function(ye,Re){var fe=I&&me(I[Re]),Re=D&&me(D[Re]);_e(fe,Re)!==0&&(fe!=null&&ge(fe),Re!=null)&&ge(Re)})}))):te?(H={from:(re=te.lower)!=null?re:e.MIN_KEY,to:(G=te.upper)!=null?G:e.MAX_KEY},U.add(H),F.add(H)):(F.add(n),U.add(n),f.indexes.forEach(function(z){return w(z.name).add(n)})),c.mutate(P).then(function(z){return!te||P.type!=="add"&&P.type!=="put"||(F.addKeys(z.results),v&&v.forEach(function(pe){for(var me=P.values.map(function(fe){return pe.extractKey(fe)}),ge=pe.keyPath.findIndex(function(fe){return fe===g.keyPath}),ye=0,Ge=z.results.length;ye<Ge;++ye)me[ye][ge]=z.results[ye];w(pe.name).addKeys(me)})),$.mutatedParts=Pa($.mutatedParts||{},N),z})}}),E={get:function(P){return[g,new Me(P.key)]},getMany:function(P){return[g,new Me().addKeys(P.keys)]},count:l,query:l,openCursor:l};return u(E).forEach(function(P){x[P]=function(w){var S=oe.subscr,I=!!S,D=nr(oe,c)&&rr(P,w)?w.obsSet={}:S;if(I){var $,S=function(H){return H="idb://".concat(t,"/").concat(o,"/").concat(H),D[H]||(D[H]=new Me)},N=S(""),F=S(":dels"),I=E[P](w),U=I[0],I=I[1];if((P==="query"&&U.isPrimaryKey&&!w.values?F:S(U.name||"")).add(I),!U.isPrimaryKey){if(P!=="count")return $=P==="query"&&C&&w.values&&c.query(i(i({},w),{values:!1})),c[P].apply(this,arguments).then(function(H){if(P==="query"){if(C&&w.values)return $.then(function(me){return me=me.result,N.addKeys(me),H});var re=w.values?H.result.map(T):H.result;(w.values?N:F).addKeys(re)}else{var z,pe;if(P==="openCursor")return pe=w.values,(z=H)&&Object.create(z,{key:{get:function(){return F.addKey(z.primaryKey),z.key}},primaryKey:{get:function(){var me=z.primaryKey;return F.addKey(me),me}},value:{get:function(){return pe&&N.addKey(z.primaryKey),z.value}}})}return H});F.add(n)}}return c[P].apply(this,arguments)}}),x}})}};function or(e,t,n){var o;return n.numFailures===0?t:t.type==="deleteRange"||(o=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===o)?null:(o=i({},t),m(o.keys)&&(o.keys=o.keys.filter(function(l,c){return!(c in n.failures)})),"values"in o&&m(o.values)&&(o.values=o.values.filter(function(l,c){return!(c in n.failures)})),o)}function bn(e,t){return n=e,((o=t).lower===void 0||(o.lowerOpen?0<_e(n,o.lower):0<=_e(n,o.lower)))&&(n=e,(o=t).upper===void 0||(o.upperOpen?_e(n,o.upper)<0:_e(n,o.upper)<=0));var n,o}function ir(e,t,n,o,l,c){var f,g,y,T,C,v,x;return!n||n.length===0||(f=t.query.index,g=f.multiEntry,y=t.query.range,T=o.schema.primaryKey.extractKey,C=f.extractKey,v=(f.lowLevelIndex||f).extractKey,(o=n.reduce(function(E,P){var w=E,S=[];if(P.type==="add"||P.type==="put")for(var I=new Me,D=P.values.length-1;0<=D;--D){var $,N=P.values[D],F=T(N);!I.hasKey(F)&&($=C(N),g&&m($)?$.some(function(re){return bn(re,y)}):bn($,y))&&(I.addKey(F),S.push(N))}switch(P.type){case"add":var U=new Me().addKeys(t.values?E.map(function(z){return T(z)}):E),w=E.concat(t.values?S.filter(function(z){return z=T(z),!U.hasKey(z)&&(U.addKey(z),!0)}):S.map(function(z){return T(z)}).filter(function(z){return!U.hasKey(z)&&(U.addKey(z),!0)}));break;case"put":var G=new Me().addKeys(P.values.map(function(z){return T(z)}));w=E.filter(function(z){return!G.hasKey(t.values?T(z):z)}).concat(t.values?S:S.map(function(z){return T(z)}));break;case"delete":var te=new Me().addKeys(P.keys);w=E.filter(function(z){return!te.hasKey(t.values?T(z):z)});break;case"deleteRange":var H=P.range;w=E.filter(function(z){return!bn(T(z),H)})}return w},e))===e)?e:(x=function(E,P){return _e(v(E),v(P))||_e(T(E),T(P))},o.sort(t.direction==="prev"||t.direction==="prevunique"?function(E,P){return x(P,E)}:x),t.limit&&t.limit<1/0&&(o.length>t.limit?o.length=t.limit:e.length===t.limit&&o.length<t.limit&&(l.dirty=!0)),c?Object.freeze(o):o)}function sr(e,t){return _e(e.lower,t.lower)===0&&_e(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function Xo(e,t){return((n,o,l,c)=>{if(n===void 0)return o!==void 0?-1:0;if(o===void 0)return 1;if((n=_e(n,o))===0){if(l&&c)return 0;if(l)return 1;if(c)return-1}return n})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((n,o,l,c)=>{if(n===void 0)return o!==void 0?1:0;if(o===void 0)return-1;if((n=_e(n,o))===0){if(l&&c)return 0;if(l)return-1;if(c)return 1}return n})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function ei(e,t,n,o){e.subscribers.add(n),o.addEventListener("abort",function(){var l,c;e.subscribers.delete(n),e.subscribers.size===0&&(l=e,c=t,setTimeout(function(){l.subscribers.size===0&&ce(c,l)},3e3))})}var ti={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return i(i({},e),{transaction:function(n,o,l){var c,f,g=e.transaction(n,o,l);return o==="readwrite"&&(l=(c=new AbortController).signal,g.addEventListener("abort",(f=function(y){return function(){if(c.abort(),o==="readwrite"){for(var T=new Set,C=0,v=n;C<v.length;C++){var x=v[C],E=yt["idb://".concat(t,"/").concat(x)];if(E){var P=e.table(x),w=E.optimisticOps.filter(function(z){return z.trans===g});if(g._explicit&&y&&g.mutatedParts)for(var S=0,I=Object.values(E.queries.query);S<I.length;S++)for(var D=0,$=(U=I[S]).slice();D<$.length;D++)cn((G=$[D]).obsSet,g.mutatedParts)&&(ce(U,G),G.subscribers.forEach(function(z){return T.add(z)}));else if(0<w.length){E.optimisticOps=E.optimisticOps.filter(function(z){return z.trans!==g});for(var N=0,F=Object.values(E.queries.query);N<F.length;N++)for(var U,G,te,H=0,re=(U=F[N]).slice();H<re.length;H++)(G=re[H]).res!=null&&g.mutatedParts&&(y&&!G.dirty?(te=Object.isFrozen(G.res),te=ir(G.res,G.req,w,P,G,te),G.dirty?(ce(U,G),G.subscribers.forEach(function(z){return T.add(z)})):te!==G.res&&(G.res=te,G.promise=J.resolve({result:te}))):(G.dirty&&ce(U,G),G.subscribers.forEach(function(z){return T.add(z)})))}}}T.forEach(function(z){return z()})}}})(!1),{signal:l}),g.addEventListener("error",f(!1),{signal:l}),g.addEventListener("complete",f(!0),{signal:l})),g},table:function(n){var o=e.table(n),l=o.schema.primaryKey;return i(i({},o),{mutate:function(c){var f,g=oe.trans;return!l.outbound&&g.db._options.cache!=="disabled"&&!g.explicit&&g.idbtrans.mode==="readwrite"&&(f=yt["idb://".concat(t,"/").concat(n)])?(g=o.mutate(c),c.type!=="add"&&c.type!=="put"||!(50<=c.values.length||gn(l,c).some(function(y){return y==null}))?(f.optimisticOps.push(c),c.mutatedParts&&Aa(c.mutatedParts),g.then(function(y){0<y.numFailures&&(ce(f.optimisticOps,c),(y=or(0,c,y))&&f.optimisticOps.push(y),c.mutatedParts)&&Aa(c.mutatedParts)}),g.catch(function(){ce(f.optimisticOps,c),c.mutatedParts&&Aa(c.mutatedParts)})):g.then(function(y){var T=or(0,i(i({},c),{values:c.values.map(function(C,v){var x;return y.failures[v]?C:(X(x=(x=l.keyPath)!=null&&x.includes(".")?ie(C):i({},C),l.keyPath,y.results[v]),x)})}),y);f.optimisticOps.push(T),queueMicrotask(function(){return c.mutatedParts&&Aa(c.mutatedParts)})}),g):o.mutate(c)},query:function(c){var f,g,y,T,C,v,x;return nr(oe,o)&&rr("query",c)?(f=((y=oe.trans)==null?void 0:y.db._options.cache)==="immutable",g=(y=oe).requery,y=y.signal,v=((E,P,w,S)=>{var I=yt["idb://".concat(E,"/").concat(P)];if(!I)return[];if(!(E=I.queries[w]))return[null,!1,I,null];var D=E[(S.query?S.query.index.name:null)||""];if(!D)return[null,!1,I,null];switch(w){case"query":var $=(N=S.direction)!=null?N:"next",N=D.find(function(F){var U;return F.req.limit===S.limit&&F.req.values===S.values&&((U=F.req.direction)!=null?U:"next")===$&&sr(F.req.query.range,S.query.range)});return N?[N,!0,I,D]:[D.find(function(F){var U;return("limit"in F.req?F.req.limit:1/0)>=S.limit&&((U=F.req.direction)!=null?U:"next")===$&&(!S.values||F.req.values)&&Xo(F.req.query.range,S.query.range)}),!1,I,D];case"count":return N=D.find(function(F){return sr(F.req.query.range,S.query.range)}),[N,!!N,I,D]}})(t,n,"query",c),x=v[0],T=v[2],C=v[3],x&&v[1]?x.obsSet=c.obsSet:(v=o.query(c).then(function(E){var P=E.result;if(x&&(x.res=P),f){for(var w=0,S=P.length;w<S;++w)Object.freeze(P[w]);Object.freeze(P)}return E}).catch(function(E){return C&&x&&ce(C,x),Promise.reject(E)}),x={obsSet:c.obsSet,promise:v,subscribers:new Set,type:"query",req:c,dirty:!1},C?C.push(x):(C=[x],(T=T||(yt["idb://".concat(t,"/").concat(n)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[c.query.index.name||""]=C)),ei(x,C,g,y),x.promise.then(function(E){return E=ir(E.result,c,T==null?void 0:T.optimisticOps,o,x,f),{result:f?E:ie(E)}})):o.query(c)}})}})}};function Ea(e,t){return new Proxy(e,{get:function(n,o,l){return o==="db"?t:Reflect.get(n,o,l)}})}De.prototype.version=function(e){if(isNaN(e)||e<.1)throw new le.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new le.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,n=t.filter(function(o){return o._cfg.version===e})[0];return n||(n=new this.Version(e),t.push(n),t.sort(Go),n.stores({}),this._state.autoSchema=!1),n},De.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||oe.letThrough||this._vip)?e():new J(function(n,o){if(t._state.openComplete)return o(new le.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void o(new le.DatabaseClosed);t.open().catch(Ae)}t._state.dbReadyPromise.then(n,o)}).then(e)},De.prototype.use=function(l){var t=l.stack,n=l.create,o=l.level,l=l.name,c=(l&&this.unuse({stack:t,name:l}),this._middlewares[t]||(this._middlewares[t]=[]));return c.push({stack:t,create:n,level:o??10,name:l}),c.sort(function(f,g){return f.level-g.level}),this},De.prototype.unuse=function(e){var t=e.stack,n=e.name,o=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(l){return o?l.create!==o:!!n&&l.name!==n})),this},De.prototype.open=function(){var e=this;return bt(Je,function(){return Wo(e)})},De.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state;if(Vt.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new J(function(t){e.dbReadyResolve=t}),e.openCanceller=new J(function(t,n){e.cancelOpen=n}))},De.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,n=this._state;t?(n.isBeingOpened&&n.cancelOpen(new le.DatabaseClosed),this._close(),n.autoOpen=!1,n.dbOpenError=new le.DatabaseClosed):(this._close(),n.autoOpen=this._options.autoOpen||n.isBeingOpened,n.openComplete=!1,n.dbOpenError=null)},De.prototype.delete=function(e){var t=this,n=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),o=this._state;return new J(function(l,c){function f(){t.close(e);var g=t._deps.indexedDB.deleteDatabase(t.name);g.onsuccess=ke(function(){var y,T,C;y=t._deps,T=t.name,on(C=y.indexedDB)||T===ua||rn(C,y.IDBKeyRange).delete(T).catch(Ae),l()}),g.onerror=Ue(c),g.onblocked=t._fireOnBlocked}if(n)throw new le.InvalidArgument("Invalid closeOptions argument to db.delete()");o.isBeingOpened?o.dbReadyPromise.then(f):f()})},De.prototype.backendDB=function(){return this.idbdb},De.prototype.isOpen=function(){return this.idbdb!==null},De.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},De.prototype.hasFailed=function(){return this._state.dbOpenError!==null},De.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(De.prototype,"tables",{get:function(){var e=this;return u(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),De.prototype.transaction=function(){var e=(function(t,n,o){var l=arguments.length;if(l<2)throw new le.InvalidArgument("Too few arguments");for(var c=new Array(l-1);--l;)c[l-1]=arguments[l];return o=c.pop(),[t,ne(c),o]}).apply(this,arguments);return this._transaction.apply(this,e)},De.prototype._transaction=function(e,t,n){var o,l,c=this,f=oe.trans,g=(f&&f.db===this&&e.indexOf("!")===-1||(f=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(l=t.map(function(T){if(T=T instanceof c.Table?T.name:T,typeof T!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return T}),e=="r"||e===Ua)o=Ua;else{if(e!="rw"&&e!=Wa)throw new le.InvalidArgument("Invalid transaction mode: "+e);o=Wa}if(f){if(f.mode===Ua&&o===Wa){if(!g)throw new le.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");f=null}f&&l.forEach(function(T){if(f&&f.storeNames.indexOf(T)===-1){if(!g)throw new le.SubTransaction("Table "+T+" not included in parent transaction.");f=null}}),g&&f&&!f.active&&(f=null)}}catch(T){return f?f._promise(null,function(C,v){v(T)}):Te(T)}var y=(function T(C,v,x,E,P){return J.resolve().then(function(){var D=oe.transless||oe,w=C._createTransaction(v,x,C._dbSchema,E),D=(w.explicit=!0,{trans:w,transless:D});if(E)w.idbtrans=E.idbtrans;else try{w.create(),w.idbtrans._explicit=!0,C._state.PR1398_maxLoop=3}catch($){return $.name===Ra.InvalidState&&C.isOpen()&&0<--C._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),C.close({disableAutoOpen:!1}),C.open().then(function(){return T(C,v,x,null,P)})):Te($)}var S,I=Pe(P),D=(I&&St(),J.follow(function(){var $;(S=P.call(w,w))&&(I?($=it.bind(null,null),S.then($,$)):typeof S.next=="function"&&typeof S.throw=="function"&&(S=mn(S)))},D));return(S&&typeof S.then=="function"?J.resolve(S).then(function($){return w.active?$:Te(new le.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):D.then(function(){return S})).then(function($){return E&&w._resolve(),w._completion.then(function(){return $})}).catch(function($){return w._reject($),Te($)})})}).bind(null,this,o,l,f,n);return f?f._promise(o,y,"lock"):oe.trans?bt(oe.transless,function(){return c._whenReady(y)}):this._whenReady(y)},De.prototype.table=function(e){if(k(this._allTables,e))return this._allTables[e];throw new le.InvalidTable("Table ".concat(e," does not exist"))};var Xe=De;function De(e,t){var n,o,l,c,f,g=this,y=(this._middlewares={},this.verno=0,De.dependencies),y=(this._options=t=i({addons:De.addons,autoOpen:!0,indexedDB:y.indexedDB,IDBKeyRange:y.IDBKeyRange,cache:"cloned",maxConnections:1e3},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),T=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:Ae,dbReadyPromise:null,cancelOpen:Ae,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),C=(T.dbReadyPromise=new J(function(v){T.dbReadyResolve=v}),T.openCanceller=new J(function(v,x){T.cancelOpen=x}),this._state=T,this.name=e,this.on=Nt(this,"populate","blocked","versionchange","close",{ready:[Ba,Ae]}),this.once=function(v,x){var E=function(){for(var P=[],w=0;w<arguments.length;w++)P[w]=arguments[w];g.on(v).unsubscribe(E),x.apply(g,P)};return g.on(v,E)},this.on.ready.subscribe=ae(this.on.ready.subscribe,function(v){return function(x,E){De.vip(function(){var P,w=g._state;w.openComplete?(w.dbOpenError||J.resolve().then(x),E&&v(x)):w.onReadyBeingFired?(w.onReadyBeingFired.push(x),E&&v(x)):(v(x),P=g,E||v(function S(){P.on.ready.unsubscribe(x),P.on.ready.unsubscribe(S)}))})}}),this.Collection=(n=this,zt(Ro.prototype,function(S,w){this.db=n;var E=Mn,P=null;if(w)try{E=w()}catch(D){P=D}var w=S._ctx,S=w.table,I=S.hook.reading.fire;this._ctx={table:S,index:w.index,isPrimKey:!w.index||S.schema.primKey.keyPath&&w.index===S.schema.primKey.name,range:E,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:P,or:w.or,valueMapper:I!==$t?I:null}})),this.Table=(o=this,zt(Fn.prototype,function(v,x,E){this.db=o,this._tx=E,this.name=v,this.schema=x,this.hook=o._allTables[v]?o._allTables[v].hook:Nt(null,{creating:[ko,Ae],reading:[Eo,$t],updating:[Do,Ae],deleting:[To,Ae]})})),this.Transaction=(l=this,zt(No.prototype,function(v,x,E,P,w){var S=this;v!=="readonly"&&x.forEach(function(I){I=(I=E[I])==null?void 0:I.yProps,I&&(x=x.concat(I.map(function(D){return D.updatesTable})))}),this.db=l,this.mode=v,this.storeNames=x,this.schema=E,this.chromeTransactionDurability=P,this.idbtrans=null,this.on=Nt(this,"complete","error","abort"),this.parent=w||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new J(function(I,D){S._resolve=I,S._reject=D}),this._completion.then(function(){S.active=!1,S.on.complete.fire()},function(I){var D=S.active;return S.active=!1,S.on.error.fire(I),S.parent?S.parent._reject(I):D&&S.idbtrans&&S.idbtrans.abort(),Te(I)})})),this.Version=(c=this,zt(Uo.prototype,function(v){this.db=c,this._cfg={version:v,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(f=this,zt(Un.prototype,function(v,x,E){if(this.db=f,this._ctx={table:v,index:x===":id"?null:x,or:E},this._cmp=this._ascending=_e,this._descending=function(P,w){return _e(w,P)},this._max=function(P,w){return 0<_e(P,w)?P:w},this._min=function(P,w){return _e(P,w)<0?P:w},this._IDBKeyRange=f._deps.IDBKeyRange,!this._IDBKeyRange)throw new le.MissingAPI})),this.on("versionchange",function(v){0<v.newVersion?console.warn("Another connection wants to upgrade database '".concat(g.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(g.name,"'. Closing db now to resume the delete request.")),g.close({disableAutoOpen:!1})}),this.on("blocked",function(v){!v.newVersion||v.newVersion<v.oldVersion?console.warn("Dexie.delete('".concat(g.name,"') was blocked")):console.warn("Upgrade '".concat(g.name,"' blocked by other connection holding version ").concat(v.oldVersion/10))}),this._maxKey=Kt(t.IDBKeyRange),this._createTransaction=function(v,x,E,P){return new g.Transaction(v,x,E,g._options.chromeTransactionDurability,P)},this._fireOnBlocked=function(v){g.on("blocked").fire(v),Vt.toArray().filter(function(x){return x.name===g.name&&x!==g&&!x._state.vcFired}).map(function(x){return x.on("versionchange").fire(v)})},this.use(Jo),this.use(ti),this.use(Zo),this.use(Qo),this.use(Yo),new Proxy(this,{get:function(v,x,E){var P;return x==="_vip"||(x==="table"?function(w){return Ea(g.table(w),C)}:(P=Reflect.get(v,x,E))instanceof Fn?Ea(P,C):x==="tables"?P.map(function(w){return Ea(w,C)}):x==="_createTransaction"?function(){return Ea(P.apply(this,arguments),C)}:P)}}));this.vip=C,y.forEach(function(v){return v(g)})}var ka,Dt=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",ai=(hn.prototype.subscribe=function(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})},hn.prototype[Dt]=function(){return this},hn);function hn(e){this._subscribe=e}try{ka={indexedDB:p.indexedDB||p.mozIndexedDB||p.webkitIndexedDB||p.msIndexedDB,IDBKeyRange:p.IDBKeyRange||p.webkitIDBKeyRange}}catch{ka={indexedDB:null,IDBKeyRange:null}}function lr(e){var t,n=!1,o=new ai(function(l){var c=Pe(e),f,g=!1,y={},T={},C={get closed(){return g},unsubscribe:function(){g||(g=!0,f&&f.abort(),v&&ct.storagemutated.unsubscribe(P))}},v=(l.start&&l.start(C),!1),x=function(){return Ha(w)};function E(){return cn(T,y)}var P=function(S){Pa(y,S),E()&&x()},w=function(){var S,I,D;!g&&ka.indexedDB&&(y={},S={},f&&f.abort(),f=new AbortController,D=($=>{var N=Pt();try{c&&St();var F=ot(e,$);return F=c?F.finally(it):F}finally{N&&At()}})(I={subscr:S,signal:f.signal,requery:x,querier:e,trans:null}),v||(ct.storagemutated.subscribe(P),v=!0),Promise.resolve(D).then(function($){n=!0,t=$,g||I.signal.aborted||(E()||(T=S,E())?x():(y={},Ha(function(){return!g&&l.next&&l.next($)})))},function($){n=!1,["DatabaseClosedError","AbortError"].includes($==null?void 0:$.name)||g||Ha(function(){g||l.error&&l.error($)})}))};return setTimeout(x,0),C});return o.hasValue=function(){return n},o.getValue=function(){return t},o}var xt=Xe;function vn(e){var t=dt;try{dt=!0,ct.storagemutated.fire(e),pn(e,!0)}finally{dt=t}}L(xt,i(i({},Ee),{delete:function(e){return new xt(e,{addons:[]}).delete()},exists:function(e){return new xt(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=xt.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(on(n)?Promise.resolve(n.databases()).then(function(o){return o.map(function(l){return l.name}).filter(function(l){return l!==ua})}):rn(n,t).toCollection().primaryKeys()).then(e)}catch{return Te(new le.MissingAPI)}var t,n},defineClass:function(){return function(e){b(this,e)}},ignoreTransaction:function(e){return oe.trans?bt(oe.transless||Je,e):e()},vip:sn,async:function(e){return function(){try{var t=mn(e.apply(this,arguments));return t&&typeof t.then=="function"?t:J.resolve(t)}catch(n){return Te(n)}}},spawn:function(e,t,n){try{var o=mn(e.apply(n,t||[]));return o&&typeof o.then=="function"?o:J.resolve(o)}catch(l){return Te(l)}},currentTransaction:{get:function(){return oe.trans||null}},waitFor:function(e,t){return e=J.resolve(typeof e=="function"?xt.ignoreTransaction(e):e).timeout(t||6e4),oe.trans?oe.trans.waitFor(e):e},Promise:J,debug:{get:function(){return We},set:function(e){Tn(e)}},derive:ee,extend:b,props:L,override:ae,Events:Nt,on:ct,liveQuery:lr,extendObservabilitySet:Pa,getByKeyPath:W,setByKeyPath:X,delByKeyPath:function(e,t){typeof t=="string"?X(e,t,void 0):"length"in t&&[].map.call(t,function(n){X(e,n,void 0)})},shallowClone:se,deepClone:ie,getObjectDiff:fn,cmp:_e,asap:V,minKey:-1/0,addons:[],connections:{get:Vt.toArray},errnames:Ra,dependencies:ka,cache:yt,semVer:"4.4.6",version:"4.4.6".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),xt.maxKey=Kt(xt.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(ct(ha,function(e){dt||(e=new CustomEvent(Ja,{detail:e}),dt=!0,dispatchEvent(e),dt=!1)}),addEventListener(Ja,function(e){e=e.detail,dt||vn(e)}));var It,dt=!1,cr=function(){};return typeof BroadcastChannel<"u"&&((cr=function(){(It=new BroadcastChannel(Ja)).onmessage=function(e){return e.data&&vn(e.data)}})(),typeof It.unref=="function"&&It.unref(),ct(ha,function(e){dt||It.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!Xe.disableBfCache&&e.persisted){We&&console.debug("Dexie: handling persisted pagehide"),It!=null&&It.close();for(var t=0,n=Vt.toArray();t<n.length;t++)n[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!Xe.disableBfCache&&e.persisted&&(We&&console.debug("Dexie: handling persisted pageshow"),cr(),vn({all:new Me(-1/0,[[]])}))})),J.rejectionMapper=function(e,t){return!e||e instanceof ze||e instanceof TypeError||e instanceof SyntaxError||!e.name||!kn[e.name]?e:(t=new kn[e.name](t||e.message,e),"stack"in e&&j(t,"stack",{get:function(){return this.inner.stack}}),t)},Tn(We),i(Xe,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:Xe,Entity:Rn,PropModification:qt,RangeSet:Me,add:function(e){return new qt({add:e})},cmp:_e,default:Xe,liveQuery:lr,mergeRanges:Ut,rangesOverlap:Zn,remove:function(e){return new qt({remove:e})},replacePrefix:function(e,t){return new qt({replacePrefix:[e,t]})}}),{default:Xe}),Xe})})(Ia)),Ia.exports}var Is=Ds();const An=ks(Is),Ar=Symbol.for("Dexie"),ja=globalThis[Ar]||(globalThis[Ar]=An);if(An.semVer!==ja.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${An.semVer} and ${ja.semVer}`);const{liveQuery:il,mergeRanges:sl,rangesOverlap:ll,RangeSet:cl,cmp:dl,Entity:ul,PropModification:pl,replacePrefix:ml,add:fl,remove:gl,DexieYProvider:bl}=ja;class Os extends ja{constructor(){super("AnaxagorasAIDatabase");Ie(this,"aiSettings");Ie(this,"studyBlocks");Ie(this,"projectTasks");Ie(this,"userProfile");Ie(this,"studyTaskSessions");this.version(1).stores({aiSettings:"++id, provider, modelName",studyBlocks:"++id, date, subject, completed, syncedWithGoogle",projectTasks:"++id, subject, currentPhase, dueDate",userProfile:"id, email"}),this.version(2).stores({studyTaskSessions:"topicId, status, selectedActivityId, updatedAt"})}}const we=new Os;async function tt(d){try{const a={...d,lastActiveAt:d.lastActiveAt instanceof Date?d.lastActiveAt.toISOString():d.lastActiveAt,updatedAt:new Date().toISOString()};await we.studyTaskSessions.put(a)}catch(a){console.warn("[Storage] Error persisting studyTaskSession:",a)}}async function Ls(){try{return await we.studyTaskSessions.toArray()}catch(d){return console.warn("[Storage] Error retrieving studyTaskSessions:",d),[]}}async function $s(d,a){try{const i=(await we.studyBlocks.toArray()).find(s=>!s.completed&&(s.subject.toLowerCase().includes(d.toLowerCase())||d.toLowerCase().includes(s.subject.toLowerCase())||a.toLowerCase().includes(s.title.toLowerCase())||s.title.toLowerCase().includes(a.toLowerCase())));if(i&&i.id)return await we.studyBlocks.update(i.id,{completed:!0}),i.completed=!0,i}catch(r){console.warn("[Storage] Error marking matching study block completed:",r)}return null}async function js(){await we.aiSettings.count()===0&&await we.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}),await Ms(),await Lr()}async function Ms(){const d=await we.studyBlocks.filter(b=>!b.gradeKey).toArray();if(d.length>0)for(const b of d)b.id&&await we.studyBlocks.delete(b.id);const a=await we.studyBlocks.filter(b=>b.gradeKey==="1eso").count(),r=await we.studyBlocks.filter(b=>b.gradeKey==="2batx").count(),i=new Date().toISOString().split("T")[0],s=new Date(Date.now()+864e5).toISOString().split("T")[0],p=new Date(Date.now()+864e5*2).toISOString().split("T")[0],u=new Date(Date.now()+864e5*3).toISOString().split("T")[0],m=new Date(Date.now()+864e5*4).toISOString().split("T")[0];a===0&&await we.studyBlocks.bulkAdd([{title:"Análisis de Oraciones: Sujeto y Complemento Verbal",subject:"Lengua Castellana",date:i,startTime:"17:00",durationMinutes:45,type:"assignment_due",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.",notes:"Identificación del predicado y localización del Complemento Verbal (CV) en bloque.",syncedWithGoogle:!0,googleEventId:"gcal_eso_castellano"},{title:"Ciencias Naturales: El Reino Animal y los Ecosistemas",subject:"Ciencias Naturales",date:s,startTime:"16:30",durationMinutes:40,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.",notes:"Repaso con esquemas visuales de vertebrados e invertebrados.",syncedWithGoogle:!1},{title:"Matemáticas: Fracciones y Operaciones Básicas",subject:"Matemáticas",date:p,startTime:"17:15",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.",notes:"Ejercicios de suma y resta con común denominador.",syncedWithGoogle:!0,googleEventId:"gcal_eso_mates"},{title:"Control Tema 2: Egipto y las Civilizaciones Fluviales",subject:"Ciencias Sociales",date:u,startTime:"09:00",durationMinutes:50,type:"exam",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Control trimestral de departamento programado por el centro educativo.",notes:"Llevar mapa histórico de Mesopotamia y el Nilo.",syncedWithGoogle:!1},{title:"Lectura Guiada: Crónicas Juveniles y Vocabulario",subject:"Tutoría / Lectura",date:m,startTime:"16:00",durationMinutes:30,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.",notes:"Lectura de 2 capítulos y ficha de comprensión lectora.",syncedWithGoogle:!1}]),r===0&&await we.studyBlocks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",subject:"Lengua Castellana",date:i,startTime:"17:00",durationMinutes:55,type:"assignment_due",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).",notes:"Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.",syncedWithGoogle:!0,googleEventId:"gcal_batx_castellano"},{title:"Historia de España: La Constitución de 1812 y la Guerra de la Independencia",subject:"Historia de España",date:s,startTime:"18:00",durationMinutes:50,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.",notes:"Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.",syncedWithGoogle:!1},{title:"Matemáticas II: Matrices, Determinantes y Sistemas de Cramer (PAU)",subject:"Matemáticas II",date:p,startTime:"16:30",durationMinutes:60,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo matricial.",notes:"Resolución de problemas de selectividad con discusión según parámetro k.",syncedWithGoogle:!0,googleEventId:"gcal_batx_mates"},{title:"Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)",subject:"Filosofía",date:u,startTime:"11:30",durationMinutes:60,type:"exam",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Prueba oficial de simulacro de Selectividad coordinada por el departamento.",notes:"Comparativa ontológica y epistemológica entre Platón y Descartes.",syncedWithGoogle:!1},{title:"Química: Termodinámica y Cinética Química (PAU)",subject:"Química",date:m,startTime:"17:30",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.",notes:"Cálculo de entalpía estándar y entropía de reacción.",syncedWithGoogle:!1}])}async function Lr(){const d=await we.projectTasks.filter(u=>!u.gradeKey).toArray();if(d.length>0)for(const u of d)u.id&&await we.projectTasks.delete(u.id);const a=await we.projectTasks.filter(u=>!u.topicId).toArray();for(const u of a)u.id&&(u.gradeKey==="1eso"?u.subject.includes("Lengua")?await we.projectTasks.update(u.id,{topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1"}):await we.projectTasks.update(u.id,{topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1"}):u.gradeKey==="2batx"&&(u.subject.includes("Lengua")?await we.projectTasks.update(u.id,{topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1"}):await we.projectTasks.update(u.id,{topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1"})));const r=await we.projectTasks.filter(u=>u.gradeKey==="1eso").count(),i=await we.projectTasks.filter(u=>u.gradeKey==="2batx").count(),s=new Date(Date.now()+864e5*5).toISOString().split("T")[0],p=new Date(Date.now()+864e5*12).toISOString().split("T")[0];r===0&&await we.projectTasks.bulkAdd([{title:"Análisis Sintáctico: El Predicado y el Complemento Verbal",subject:"Lengua Castellana y Literatura",gradeKey:"1eso",topicId:"topic_lengua_1eso",activityId:"act_lengua_1eso_1",dueDate:s,currentPhase:"writing",autonomyScore:75,pedagogicalNote:"Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.",notes:'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',driveFiles:[{fileId:"drive_doc_sintaxis_1eso",name:"Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 1 día"}],criteria:[{id:"c_eso_1",label:'Identificación del Sujeto ("El tren") y el Predicado',checked:!0,explanation:"Diferenciado correctamente quién realiza la acción."},{id:"c_eso_2",label:'Localización del verbo principal ("llegó")',checked:!0,explanation:"Núcleo del predicado identificado."},{id:"c_eso_3",label:'Reconocimiento del Complemento Verbal ("puntual a la estación")',checked:!0,explanation:"Identificado en bloque como acompañante del verbo, sin clasificar subtipos."},{id:"c_eso_4",label:"Redacción de una oración propia con complemento verbal similar",checked:!1,explanation:"Pendiente de redactar y enviar al tutor."}]},{title:"Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad",subject:"Ciencias Naturales",gradeKey:"1eso",topicId:"topic_naturales_1eso",activityId:"act_naturales_1eso_1",dueDate:p,currentPhase:"research",autonomyScore:50,pedagogicalNote:"Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.",notes:"Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.",driveFiles:[{fileId:"drive_doc_ecosistemas_1eso",name:"Guia_Maqueta_Ecosistemas.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 días"}],criteria:[{id:"c_eco_1",label:"Elección del ecosistema a representar (bosque, río o costa)",checked:!0,explanation:"Seleccionado bosque mediterráneo."},{id:"c_eco_2",label:"Lista de 5 especies autóctonas con su rol trófico",checked:!0,explanation:"Identificados productores, herbívoros y carnívoros."},{id:"c_eco_3",label:"Diseño visual de la maqueta y materiales reciclables",checked:!1,explanation:"En proceso de preparación."}]}]),i===0&&await we.projectTasks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)",subject:"Lengua Castellana y Literatura",gradeKey:"2batx",topicId:"topic_lengua_2batx",activityId:"act_lengua_2batx_1",dueDate:s,currentPhase:"writing",autonomyScore:60,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.",notes:'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',driveFiles:[{fileId:"drive_doc_sintaxis_2batx",name:"Guia_PAU_Tipologia_Complementos_Verbales.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 3 horas"},{fileId:"drive_sheet_pruebas",name:"Matriz_Pruebas_Sintacticas_RAE.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c_batx_1",label:"Segmentación en Sintagmas y delimitación oracional formal",checked:!0,explanation:"SN Sujeto y SV Predicado identificados con precisión."},{id:"c_batx_2",label:'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',checked:!0,explanation:"Diferenciación estricta de la tipología de complementos del predicado."},{id:"c_batx_3",label:"Prueba sintáctica de concordancia para el CPredicativo",checked:!1,explanation:'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'},{id:"c_batx_4",label:"Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC",checked:!1,explanation:"Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales."}]},{title:"Monografía: Energías Renovables en el Mediterráneo",subject:"Ciencias y Tecnología",gradeKey:"2batx",topicId:"topic_tecnologia_2batx",activityId:"act_tecnologia_2batx_1",dueDate:p,currentPhase:"research",autonomyScore:75,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.",notes:"Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.",driveFiles:[{fileId:"drive_doc_01",name:"Borrador_Esquema_Energias.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 horas"},{fileId:"drive_sheet_02",name:"Datos_Produccion_2025.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c1",label:"Formulación de la pregunta de investigación con mis palabras",checked:!0,explanation:"Definido el objetivo sin copia directa de internet."},{id:"c2",label:"Búsqueda y contraste de 3 fuentes académicas fiables",checked:!0,explanation:"Artículos de revistas científicas guardados en Drive."},{id:"c3",label:"Redacción de conclusiones propias basadas en los datos",checked:!1,explanation:"En proceso: reflexionar sobre los resultados sin pedir resumen a la IA."}]}])}const Rs=Lr,Sr="anaxagoras_auth_state",Bs=["openid","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive.readonly"].join(" ");class qs{constructor(){Ie(this,"state",{isAuthenticated:!0,mode:"demo",user:null,clientId:"",scopes:{calendar:!0,drive:!0,profile:!0}});Ie(this,"listeners",[]);this.loadPersistedState()}loadPersistedState(){try{const a=localStorage.getItem(Sr);a?(this.state=JSON.parse(a),this.state.mode==="demo"&&this.state.user&&(this.state.user.gradeKey==="2batx"?(this.state.user.id="google_user_demo_2batx",this.state.user.name="Álvaro Martín (2º Bachillerato)",this.state.user.email="alvaro.martin@ies-catalunya.edu.cat"):(this.state.user.id="google_user_demo_1eso",this.state.user.name="Marc Vidal (1º de ESO)",this.state.user.email="marc.vidal@ies-catalunya.edu.cat"))):this.setDemoState("1eso")}catch{this.setDemoState("1eso")}}setDemoState(a="1eso"){const r=a==="2batx";this.state={isAuthenticated:!0,mode:"demo",clientId:"",user:{id:r?"google_user_demo_2batx":"google_user_demo_1eso",name:r?"Álvaro Martín (2º Bachillerato)":"Marc Vidal (1º de ESO)",email:r?"alvaro.martin@ies-catalunya.edu.cat":"marc.vidal@ies-catalunya.edu.cat",avatarUrl:r?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",gradeLevel:r?"2º de Bachillerato (17-18 años)":"1º de ESO (12 años)",gradeKey:a,stageName:r?"Operaciones Formales (Piaget)":"Operaciones Concretas (Piaget)",connectedAt:new Date().toISOString(),mode:"demo"},scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState()}saveState(){localStorage.setItem(Sr,JSON.stringify(this.state)),this.notify()}getState(){return{...this.state}}subscribe(a){return this.listeners.push(a),a(this.state),()=>{this.listeners=this.listeners.filter(r=>r!==a)}}notify(){for(const a of this.listeners)a(this.state)}setClientId(a){this.state.clientId=a.trim(),this.saveState()}async connectDemo(a="1eso"){return this.setDemoState(a),this.state.user}setGradeProfile(a){if(!this.state.user){this.setDemoState(a);return}a==="1eso"?this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_1eso":this.state.user.id,name:this.state.mode==="demo"?"Marc Vidal (1º de ESO)":this.state.user.name,email:this.state.mode==="demo"?"marc.vidal@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"1º de ESO (12 años)",gradeKey:"1eso",stageName:"Operaciones Concretas (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl}:this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_2batx":this.state.user.id,name:this.state.mode==="demo"?"Álvaro Martín (2º Bachillerato)":this.state.user.name,email:this.state.mode==="demo"?"alvaro.martin@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl},this.saveState()}toggleGradeProfile(){var r;const a=((r=this.state.user)==null?void 0:r.gradeKey)||"1eso";this.setGradeProfile(a==="1eso"?"2batx":"1eso")}async connectRealGoogle(a){var i,s;const r=a||this.state.clientId;if(!r)throw new Error("Debes introducir un Google OAuth Client ID válido para conectar en modo real.");if(this.state.clientId=r,await this.ensureGoogleSDKLoaded(),!((s=(i=window.google)==null?void 0:i.accounts)!=null&&s.oauth2))throw new Error("La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.");return new Promise((p,u)=>{try{window.google.accounts.oauth2.initTokenClient({client_id:r,scope:Bs,callback:async b=>{if(b.error){u(new Error(`Error de autenticación Google: ${b.error}`));return}if(!b.access_token){u(new Error("No se recibió token de acceso de Google."));return}try{const h=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${b.access_token}`}});if(!h.ok)throw new Error("Fallo al obtener información del perfil del usuario de Google.");const _=await h.json(),k={id:_.sub||`google_${Date.now()}`,name:_.name||"Álvaro Martín (2º de Bachillerato)",email:_.email||"alvaro.estudiante@batxillerat.cat",avatarUrl:_.picture||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",connectedAt:new Date().toISOString(),mode:"real"};this.state={isAuthenticated:!0,mode:"real",clientId:r,accessToken:b.access_token,tokenExpiry:Date.now()+(b.expires_in||3600)*1e3,user:k,scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState(),p(k)}catch(h){u(h)}},error_callback:b=>{u(new Error((b==null?void 0:b.message)||"Error en el diálogo de inicio de sesión de Google."))}}).requestAccessToken({prompt:"consent"})}catch(m){u(m)}})}async ensureGoogleSDKLoaded(){var a,r;if(!((r=(a=window.google)==null?void 0:a.accounts)!=null&&r.oauth2))return new Promise(i=>{let s=0;const p=setInterval(()=>{var u,m;s++,((m=(u=window.google)==null?void 0:u.accounts)!=null&&m.oauth2||s>25)&&(clearInterval(p),i())},100)})}getAccessToken(){return this.state.mode==="real"&&this.state.accessToken?this.state.tokenExpiry&&Date.now()>this.state.tokenExpiry?(console.warn("[GoogleAuth] Token de acceso expirado."),null):this.state.accessToken:null}disconnect(){this.state={isAuthenticated:!1,mode:"demo",user:null,accessToken:void 0,tokenExpiry:void 0,clientId:this.state.clientId,scopes:{calendar:!1,drive:!1,profile:!1}},this.saveState()}}const $e=new qs,$r=`# ⚡ Prompt de Sistema: Generador de Desafíos de Memoria Activa (Active Recall)\r
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
`,jr=`# ⏱️ Pilar 1: Distribución Homogénea del Tiempo y Carga Cognitiva Equilibrada
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
`,Mr=`# 🎯 Pilar 2: Ordenación por Prioridad y Balance de Materias
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
`,Rr=`# 📅 Pilar 3: Fechas de Compromiso: Exámenes y Entregas de Trabajos
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
`,Br=`# 🔄 Pilar 4: Adaptabilidad Dinámica, Novedades Docentes y Persistencia Local
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
`,qr=`# 🧠 Arquitectura de Prompt de Agenda: Mentor Socrático de Tiempo y Hábitos
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
`,Nr=`# 🧠 Prompt de Sistema: Planificador Inteligente de Agenda y Estudio (STI)\r
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
`,En=`# ⚡ Nivel 1: Generador de Desafíos de Recuperación Activa (Active Recall)
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
`,zr=`# 🧠 Nivel 1: Planificador Inteligente de Agenda y Hábitos de Estudio
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
`,Fr=`# 📝 Nivel 1: Asistente Pedagógico de Trabajos y Proyectos
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
`,Kr=`# 🧠 Nivel 1: Tutor Socrático Inteligente (STI)
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

`,Gr=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Sujeto y Complemento Verbal en Bloque
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
`,Vr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Sujeto Pospuesto
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
`,Hr=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Plural y Contexto Narrativo
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
`,Ur=`# 🎯 Nivel 2.B: Foco de Actividad — Problema de Reparto Cotidiano con Fracciones
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
`,Wr=`# 🎯 Nivel 2.B: Foco de Actividad — Suma y Resta de Fracciones con Común Denominador
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
`,Qr=`# 🎯 Nivel 2.B: Foco de Actividad — Maqueta de Ecosistemas y Cadenas Tróficas
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
`,Jr=`# 🎯 Nivel 2.B: Foco de Actividad — Ficha de Lectura y Deducción Léxica
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
`,Zr=`# 🏛️ Nivel 2.A: Línea Base Temática — Sintaxis de la Oración Simple
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
`,Xr=`# 🏛️ Nivel 2.A: Línea Base Temática — Fracciones y Operaciones Básicas
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
`,eo=`# 🏛️ Nivel 2.A: Línea Base Temática — Ecosistemas y Cadenas Tróficas
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
`,to=`# 🏛️ Nivel 2.A: Línea Base Temática — Primeras Civilizaciones Fluviales
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
`,ao=`# 🏛️ Nivel 2.A: Línea Base Temática — Comprensión Lectora y Hábitos Literarios
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
`,no=`# 🎯 Nivel 2.B: Foco de Actividad — Redacción Comparativa: Caverna Platónica vs Genio Maligno
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
`,ro=`# 🎯 Nivel 2.B: Foco de Actividad — Comentario Histórico: El Manifiesto de los Persas (1814)
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
`,oo=`# 🎯 Nivel 2.B: Foco de Actividad — Caso Base: Complemento Predicativo del Sujeto
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
`,io=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 1: Complemento Predicativo de Complemento Directo
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
`,so=`# 🎯 Nivel 2.B: Foco de Actividad — Variación 2: Contraste Riguroso entre CPred y CCM
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
`,lo=`# 🎯 Nivel 2.B: Foco de Actividad — Discusión de un Sistema Lineal según el Parámetro k (PAU)
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
`,co=`# 🎯 Nivel 2.B: Foco de Actividad — Desplazamiento de Equilibrio por Efecto de Presión y Temperatura
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
`,uo=`# 🎯 Nivel 2.B: Foco de Actividad — Monografía: Viabilidad de la Eólica Marina Flotante en el Mediterráneo
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
`,po=`# 🏛️ Nivel 2.A: Línea Base Temática — Teoría del Conocimiento: Platón y Descartes (PAU)
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
`,mo=`# 🏛️ Nivel 2.A: Línea Base Temática — Crisis del Antiguo Régimen y Cortes de Cádiz
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
`,fo=`# 🏛️ Nivel 2.A: Línea Base Temática — Tipología y Pruebas de Complementos Verbales (PAU)
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
`,go=`# 🏛️ Nivel 2.A: Línea Base Temática — Sistemas de Ecuaciones Lineales y Matrices (PAU)
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
`,bo=`# 🏛️ Nivel 2.A: Línea Base Temática — Termodinámica Química y Equilibrio Químico (PAU)
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
`,ho=`# 🏛️ Nivel 2.A: Línea Base Temática — Transición Energética y Energías Renovables
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
`,vo=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 1º de Educación Secundaria Obligatoria (ESO)
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
`,yo=`# 🏛️ Nivel 3: Criterios Reguladores Generales — 2º de Bachillerato (Preparación PAU)
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
`,xo=`# ⚖️ Nivel 3: Marco Regulador Ético y Deontológico de la Inteligencia Artificial en Educación
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
`,_o=`# 📝 Prompt de Sistema: Asistente Pedagógico de Trabajos y Proyectos (STI)\r
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
`,Co=`# 🧠 Prompt de Sistema: Tutor Socrático Inteligente (STI)\r
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
`,Ns=Object.assign({"../prompts/active_recall_generator.md":$r,"../prompts/agenda/1_distribucion_homogenea.md":jr,"../prompts/agenda/2_orden_prioridad.md":Mr,"../prompts/agenda/3_fechas_compromiso.md":Rr,"../prompts/agenda/4_adaptabilidad_ocio.md":Br,"../prompts/agenda/agenda_planner_master.md":qr,"../prompts/agenda_planner.md":Nr,"../prompts/nivel_1_funcional/active_recall_generator.md":En,"../prompts/nivel_1_funcional/agenda_planner.md":zr,"../prompts/nivel_1_funcional/project_guide.md":Fr,"../prompts/nivel_1_funcional/socratic_tutor.md":Kr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":eo,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":to,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ao,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":no,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":ro,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":oo,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":io,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":so,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":lo,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":co,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":uo,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":po,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":mo,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":fo,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":go,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":bo,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":ho,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":vo,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":yo,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":xo,"../prompts/project_guide.md":_o,"../prompts/socratic_tutor.md":Co});function Qt(d){const a=d.replace(/\\/g,"/").toLowerCase();for(const[r,i]of Object.entries(Ns))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return i;return""}class zs{assembleAgendaPrompt(a="1eso"){const r=a==="2batx",i=r?"2º de Bachillerato (PAU)":"1º de ESO",s=Qt("agenda/1_distribucion_homogenea.md"),p=Qt("agenda/2_orden_prioridad.md"),u=Qt("agenda/3_fechas_compromiso.md"),m=Qt("agenda/4_adaptabilidad_ocio.md"),b=Qt("agenda/agenda_planner_master.md"),h={id:"time_distribution",badge:"Pilar 1: Distribución Homogénea",title:"Distribución Homogénea del Tiempo y Carga Cognitiva",subtitle:`Práctica espaciada, límite diario (${r?"90-135 min":"45-75 min"}) y blindaje del ocio`,source:"src/prompts/agenda/1_distribucion_homogenea.md",content:s},_={id:"priority_order",badge:"Pilar 2: Ordenación por Prioridad",title:"Ordenación por Prioridad y Alternancia Cognitiva (Interleaving)",subtitle:"Ponderación según dificultad relativa, balance de materias y avance de tareas",source:"src/prompts/agenda/2_orden_prioridad.md",content:p},k={id:"commitment_deadlines",badge:"Pilar 3: Fechas de Compromiso",title:"Fechas de Compromiso: Exámenes y Entregas de Trabajos",subtitle:"Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento",source:"src/prompts/agenda/3_fechas_compromiso.md",content:u},L={id:"adaptive_flexibility",badge:"Pilar 4: Adaptabilidad y Formato",title:"Adaptabilidad Dinámica, Novedades Docentes (+1d) y JSON Local",subtitle:"Flexibilidad ante imprevistos, escucha empática y persistencia en IndexedDB",source:"src/prompts/agenda/4_adaptabilidad_ocio.md",content:m},q=`
${b}

---
=== [PILAR 1: DISTRIBUCIÓN HOMOGÉNEA DEL TIEMPO Y PROTECCIÓN DEL DESCANSO] ===
${s}
=============================================================================

---
=== [PILAR 2: ORDENACIÓN MULTIVARIABLE POR PRIORIDAD E INTERLEAVING] ===
${p}
========================================================================

---
=== [PILAR 3: GESTIÓN DE FECHAS DE COMPROMISO (EXÁMENES Y ENTREGAS)] ===
${u}
=======================================================================

---
=== [PILAR 4: ADAPTABILIDAD, RESPUESTA EMPÁTICA Y FORMATO DE EMISIÓN] ===
${m}
=========================================================================

CONTEXTO INSTITUCIONAL DE ETAPA DEL ESTUDIANTE:
- Curso Académico: ${i}
- Límite diario vespertino aconsejado: ${r?"Máximo 135 minutos repartidos en 2-3 bloques de 45 min":"Máximo 75 minutos repartidos en 1-2 bloques de 45 min"}
- Tiempo de descanso y ocio protegido tras las 15:00: Mínimo 3.5 a 4 horas libres para desconexión y deporte
- Compromisos prioritarios: Atender de forma preferente hitos con vencimiento inferior a 72 horas.
`.trim();return{role:"agenda",gradeKey:a,title:`Planificador Neuroeducativo de Agenda (${i})`,subtitle:"Distribución homogénea, ordenación por prioridad y gestión de compromisos (exámenes y entregas)",systemInstruction:q,pillars:{timeDistribution:h,priorityOrder:_,commitmentDeadlines:k,adaptiveFlexibility:L}}}getCurricularDirective(a="1eso"){return a==="2batx"?{title:"Directriz Curricular sobre Gestión del Tiempo, Preparación PAU y Prevención del Burnout",subtitle:"Departament d'Educació / Coordinació de les Proves d'Accés a la Universitat (2º de Batxillerat)",institution:"Consell Interuniversitari de Catalunya & Departament d'Educació",sourceApi:"https://api.educacio.gencat.cat/v1/agenda/directrius?curs=2batx",content:`
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
`.trim()}}}const wo=new zs,Fs=Object.assign({"../prompts/active_recall_generator.md":$r,"../prompts/agenda/1_distribucion_homogenea.md":jr,"../prompts/agenda/2_orden_prioridad.md":Mr,"../prompts/agenda/3_fechas_compromiso.md":Rr,"../prompts/agenda/4_adaptabilidad_ocio.md":Br,"../prompts/agenda/agenda_planner_master.md":qr,"../prompts/agenda_planner.md":Nr,"../prompts/nivel_1_funcional/active_recall_generator.md":En,"../prompts/nivel_1_funcional/agenda_planner.md":zr,"../prompts/nivel_1_funcional/project_guide.md":Fr,"../prompts/nivel_1_funcional/socratic_tutor.md":Kr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md":Gr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md":Vr,"../prompts/nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md":Hr,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md":Ur,"../prompts/nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md":Wr,"../prompts/nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md":Qr,"../prompts/nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md":Yr,"../prompts/nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md":Jr,"../prompts/nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md":Zr,"../prompts/nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md":Xr,"../prompts/nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md":eo,"../prompts/nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md":to,"../prompts/nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md":ao,"../prompts/nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md":no,"../prompts/nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md":ro,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md":oo,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md":io,"../prompts/nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md":so,"../prompts/nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md":lo,"../prompts/nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md":co,"../prompts/nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md":uo,"../prompts/nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md":po,"../prompts/nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md":mo,"../prompts/nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md":fo,"../prompts/nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md":go,"../prompts/nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md":bo,"../prompts/nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md":ho,"../prompts/nivel_3_regulador/criterios_generales_1eso.md":vo,"../prompts/nivel_3_regulador/criterios_generales_2batx.md":yo,"../prompts/nivel_3_regulador/etica_y_principios_ia.md":xo,"../prompts/project_guide.md":_o,"../prompts/socratic_tutor.md":Co});function at(d){const a=d.replace(/\\/g,"/").toLowerCase();for(const[r,i]of Object.entries(Fs))if(r.replace(/\\/g,"/").toLowerCase().includes(a))return i;return""}class Ks{constructor(){Ie(this,"TOPIC_DEFINITIONS",[{id:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",name:"Sintaxis de la Oración Simple: Sujeto y Complemento Verbal",fileKey:"nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md",keyConcepts:["Sujeto y Predicado","Verbo","Complemento Verbal (en bloque)"],pedagogicalNote:'Estadio de Operaciones Concretas (Piaget): Identificación visual y holística del Sujeto y el Complemento Verbal en bloque ("locomotora y vagones"), sin clasificaciones abstractas prematuras.'},{id:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",name:"Ecosistemas y Cadenas Tróficas en el Bosque Mediterráneo",fileKey:"nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md",keyConcepts:["Biotopo y Biocenosis","Niveles Tróficos","Equilibrio Ecológico"],pedagogicalNote:"Modelado intuitivo y visual de las relaciones interespecíficas y flujo de materia/energía a partir de observaciones directas del bosque mediterráneo."},{id:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",name:"Fracciones y Operaciones Básicas en Problemas Cotidianos",fileKey:"nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md",keyConcepts:["Fracciones Equivalentes","Común Denominador","Reparto Proporcional"],pedagogicalNote:"Aproximación geométrica y tangible al concepto de parte-todo y proporcionalidad antes de la abstracción algorítmica formal."},{id:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",name:"Primeras Civilizaciones Fluviales: Mesopotamia y Egipto",fileKey:"nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md",keyConcepts:["El Río como Motor","Sociedad Jerarquizada","Escritura Cuneiforme/Jeroglífica"],pedagogicalNote:"Causalidad histórica fundamental: comprensión del condicionamiento geográfico en la aparición de los primeros estados y códigos normativos."},{id:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",name:"Comprensión Lectora y Deducción Léxica en Novela Juvenil",fileKey:"nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md",keyConcepts:["Estructura Narrativa","Vocabulario por Contexto","Paráfrasis"],pedagogicalNote:"Fomento del razonamiento inferencial y deducción léxica mediante el diálogo socrático guiado sin recurrir a definiciones pasivas."},{id:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",name:"Tipología y Pruebas de Complementos Verbales (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md",keyConcepts:["CPredicativo (concordancia)","CRV vs CC","Pruebas sintácticas PAU"],pedagogicalNote:"Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor filológico con pruebas morfosintácticas estrictas (concordancia, conmutación) para las PAU."},{id:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",name:"Crisis del Antiguo Régimen, Constitución de 1812 y Fernando VII",fileKey:"nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md",keyConcepts:["Cortes de Cádiz","Constitución de 1812","Manifiesto de los Persas"],pedagogicalNote:"Análisis historiográfico dialéctico: contraste de textos y decretos originales bajo los criterios de rigor conceptual de las pruebas PAU."},{id:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",name:"Sistemas de Ecuaciones Lineales y Matrices con Parámetros (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/mates_sistemas_cramer_rouche.md",keyConcepts:["Rouché-Frobenius","Regla de Cramer","Discusión con Parámetro k"],pedagogicalNote:"Razonamiento deductivo y generalización formal de rangos matriciales ante sistemas indeterminados con parámetros."},{id:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",name:"Teoría del Conocimiento: Platón vs Descartes (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md",keyConcepts:["Mito de la Caverna","Duda Metódica y Cogito","Ideas Innatas"],pedagogicalNote:"Pensamiento crítico y dialéctica epistemológica: formulación de tesis, antítesis y justificación argumentativa estructurada."},{id:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",name:"Termodinámica Química y Principio de Le Chatelier (PAU)",fileKey:"nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md",keyConcepts:["Entalpía y Entropía","Equilibrio Químico Kc/Kp","Le Chatelier"],pedagogicalNote:"Predicción fisicoquímica cuantitativa y cualitativa del equilibrio ante perturbaciones en reactores cerrados."},{id:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",name:"Transición Energética y Viabilidad de Eólica Marina en el Mediterráneo",fileKey:"nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md",keyConcepts:["Eólica Marina Flotante","LCOE y Descarbonización","Impacto Ambiental"],pedagogicalNote:"Pensamiento de ingeniería y sostenibilidad: análisis multidimensional de viabilidad técnica, energética y ambiental."}]);Ie(this,"ACTIVITY_DEFINITIONS",[{id:"act_lengua_1eso_1",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: "El tren llegó puntual a la estación"',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base (Sujeto inicial + CV en bloque)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md"},{id:"act_lengua_1eso_2",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: Sujeto pospuesto ("Por la mañana sonó ruidosa la alarma")',sentenceOrCase:"Por la mañana sonó ruidosa la alarma en el pasillo.",variationType:"Variación de orden oracional (Sujeto pospuesto)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md"},{id:"act_lengua_1eso_3",topicId:"topic_lengua_1eso",gradeKey:"1eso",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Plural y contexto ("Los jóvenes exploradores regresaron...")',sentenceOrCase:"Los jóvenes exploradores regresaron cansados al campamento al anochecer.",variationType:"Variación léxica y plural (Consolidación y transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md"},{id:"act_naturales_1eso_1",topicId:"topic_naturales_1eso",gradeKey:"1eso",subject:"Ciencias Naturales",order:1,title:"Maqueta de Ecosistemas y Cadenas Tróficas",sentenceOrCase:"Diseño de maqueta de bosque mediterráneo con 4 niveles tróficos.",variationType:"Proyecto Guiado de Aula",fileKey:"nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md"},{id:"act_mates_1eso_1",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:1,title:"Suma y Resta de Fracciones con Común Denominador",sentenceOrCase:"Calcular: 3/8 + 7/8 - 2/8 y simplificar.",variationType:"Cálculo Aritmético Visual",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md"},{id:"act_mates_1eso_2",topicId:"topic_mates_1eso",gradeKey:"1eso",subject:"Matemáticas",order:2,title:"Problema Cotidiano de Reparto Proporcional",sentenceOrCase:"En una clase de 24 alumnos, 2/3 practican deporte y 1/6 música.",variationType:"Variación Contextualizada (Transferencia)",fileKey:"nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md"},{id:"act_sociales_1eso_1",topicId:"topic_sociales_1eso",gradeKey:"1eso",subject:"Ciencias Sociales",order:1,title:"Mapa Histórico: Nilo y Tigris-Éufrates",sentenceOrCase:"Localización del Creciente Fértil y función agrícola del limo fluvial.",variationType:"Análisis Cartográfico y Causal",fileKey:"nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md"},{id:"act_tutoria_1eso_1",topicId:"topic_tutoria_1eso",gradeKey:"1eso",subject:"Tutoría / Lectura",order:1,title:"Ficha de Lectura y Deducción Léxica",sentenceOrCase:"Resumen propio y deducción de vocabulario en contexto de novela juvenil.",variationType:"Lectura Crítica y Vocabulario",fileKey:"nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md"},{id:"act_lengua_2batx_1",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:1,title:'Caso Base: CPred de Sujeto ("El tren llegó puntual a la estación")',sentenceOrCase:"El tren llegó puntual a la estación.",variationType:"Caso Base PAU (Prueba de concordancia con Sujeto)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md"},{id:"act_lengua_2batx_2",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:2,title:'Variación 1: CPred de CD ("El tribunal consideró inocente al acusado")',sentenceOrCase:"El tribunal consideró inocente al acusado tras el juicio.",variationType:"Variación de doble predicación (Concordancia con CD)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md"},{id:"act_lengua_2batx_3",topicId:"topic_lengua_2batx",gradeKey:"2batx",subject:"Lengua Castellana y Literatura",order:3,title:'Variación 2: Contraste Riguroso CPred vs CCM ("puntual" vs "puntualmente")',sentenceOrCase:"El tren llegó puntual / puntualmente a la estación.",variationType:"Contraejemplo Trampa (Adjetivo variable vs Adverbio invariable)",fileKey:"nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md"},{id:"act_historia_2batx_1",topicId:"topic_historia_2batx",gradeKey:"2batx",subject:"Historia de España",order:1,title:"Comentario Histórico: Manifiesto de los Persas (1814)",sentenceOrCase:"Comentario guiado del fragmento absolutista de 1814 presentado a Fernando VII.",variationType:"Comentario PAU de Fuente Primaria",fileKey:"nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md"},{id:"act_mates_2batx_1",topicId:"topic_mates_2batx",gradeKey:"2batx",subject:"Matemáticas II",order:1,title:"Discusión de Sistema con Parámetro k (Rouché-Frobenius)",sentenceOrCase:"Discutir y resolver para SCI el sistema 3x3 en función de k.",variationType:"Problema Oficial PAU de Álgebra Matricial",fileKey:"nivel_2_centro_educativo/2batx/actividades/mates_act_discusion_parametro_k.md"},{id:"act_filosofia_2batx_1",topicId:"topic_filosofia_2batx",gradeKey:"2batx",subject:"Filosofía",order:1,title:"Ensayo Comparativo: Caverna Platónica vs Genio Maligno",sentenceOrCase:"Superación del engaño sensorial en Platón (anamnesis) y Descartes (cogito).",variationType:"Redacción Contrastiva PAU",fileKey:"nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md"},{id:"act_quimica_2batx_1",topicId:"topic_quimica_2batx",gradeKey:"2batx",subject:"Química",order:1,title:"Desplazamiento de Equilibrio por Presión y Temperatura (Haber-Bosch)",sentenceOrCase:"Predicción razonada en síntesis de NH3 según Le Chatelier y termodinámica.",variationType:"Problema Razonado PAU de Equilibrio Químico",fileKey:"nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md"},{id:"act_tecnologia_2batx_1",topicId:"topic_tecnologia_2batx",gradeKey:"2batx",subject:"Ciencias y Tecnología",order:1,title:"Monografía: Viabilidad de Eólica Marina Flotante en el Mediterráneo",sentenceOrCase:"Análisis de LCOE, batimetría y evacuación HVDC frente a costa valenciana y balear.",variationType:"Monografía de Investigación Científica",fileKey:"nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md"}])}getTopicsForGrade(a){return this.TOPIC_DEFINITIONS.filter(r=>r.gradeKey===a).map(r=>({...r,markdownContent:at(r.fileKey)}))}getActivitiesForTopic(a){return this.ACTIVITY_DEFINITIONS.filter(r=>r.topicId===a).map(r=>({...r,markdownContent:at(r.fileKey)})).sort((r,i)=>r.order-i.order)}findTopicById(a){const r=this.TOPIC_DEFINITIONS.find(i=>i.id===a);if(r)return{...r,markdownContent:at(r.fileKey)}}findTopicBySubjectOrKeyword(a,r,i=""){const s=this.getTopicsForGrade(r),p=a.toLowerCase(),u=i.toLowerCase();if(u){const b=s.find(h=>h.name.toLowerCase().includes(u)||h.keyConcepts.some(_=>_.toLowerCase().includes(u)));if(b)return b}const m=s.find(b=>b.subject.toLowerCase().includes(p)||p.includes(b.subject.toLowerCase()));return m||s[0]}findActivityById(a){const r=this.ACTIVITY_DEFINITIONS.find(i=>i.id===a);if(r)return{...r,markdownContent:at(r.fileKey)}}assemblePrompt(a){const{role:r,gradeKey:i}=a,s=r==="agenda"?"nivel_1_funcional/agenda_planner.md":r==="project"?"nivel_1_funcional/project_guide.md":r==="recall"?"nivel_1_funcional/active_recall_generator.md":"nivel_1_funcional/socratic_tutor.md",p=at(s),u={level:"level1",badge:"Nivel 1: Funcional",title:r==="agenda"?"Planificador de Agenda":r==="project"?"Mentor de Trabajos":r==="recall"?"Generador de Active Recall":"Tutor Socrático Inteligente",subtitle:"Metodología pedagógica y guardrails no negociables",source:`src/prompts/${s}`,content:p},m=at("nivel_3_regulador/etica_y_principios_ia.md"),h=at(i==="2batx"?"nivel_3_regulador/criterios_generales_2batx.md":"nivel_3_regulador/criterios_generales_1eso.md"),_=`${m}

---

${h}`.trim(),k={level:"level3",badge:"Nivel 3: Marco Regulador",title:i==="2batx"?"Criterios Preuniversitarios (PAU) y Ética de la IA":"Criterios LOMLOE (1º ESO) y Ética de la IA",subtitle:"Ministerio de Educación / Deontología de Inteligencia Artificial",source:"src/prompts/nivel_3_regulador/",content:_};let L;a.topicId?L=this.findTopicById(a.topicId)||this.findTopicBySubjectOrKeyword(a.subject||"Lengua",i):L=this.findTopicBySubjectOrKeyword(a.subject||"Lengua",i);const q=L.markdownContent||at(L.fileKey),j={level:"level2A",badge:"Nivel 2.A: Línea Base Temática",title:L.name,subtitle:`${L.subject} • ${i==="2batx"?"2º de Bachillerato":"1º de ESO"}`,source:`src/prompts/${L.fileKey}`,content:q},ee=this.getActivitiesForTopic(L.id);let K;a.activityId?K=this.findActivityById(a.activityId)||ee[0]:ee.length>0&&(K=ee[0]);let O;if(K){const ae=K.markdownContent||at(K.fileKey);O={level:"level2B",badge:"Nivel 2.B: Tarea y Variación",title:K.title,subtitle:`Variación: ${K.variationType}`,source:`src/prompts/${K.fileKey}`,content:ae}}const B=`
${u.content}

---
=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===
${k.content}
==================================================

---
=== [DIRECTRIZ Y LÍNEA BASE TEMÁTICA - NIVEL 2.A] ===
Materia: ${L.subject}
Tema Base: ${L.name}
${j.content}
======================================================

${O?`
---
=== [FOCO DE LA ACTIVIDAD CONCRETA Y VARIACIÓN - NIVEL 2.B] ===
Actividad: ${O.title}
Tipo de Variación: ${(K==null?void 0:K.variationType)||"Caso de Estudio"}
${O.content}
================================================================
`:""}

CONTEXTO DINÁMICO DE EJECUCIÓN:
- Grado del Estudiante: ${i==="2batx"?"2º de Bachillerato (17-18 años - PAU)":"1º de ESO (12 años - Operaciones Concretas)"}
- Asignatura: ${L.subject}
- Tema Curricular Activo: ${L.name}
${K?`- Actividad Específica en Curso: ${K.title} ("${K.sentenceOrCase}")`:""}
`.trim();return{role:r,gradeKey:i,subject:L.subject,topicId:L.id,topicName:L.name,activityId:K==null?void 0:K.id,activityTitle:K==null?void 0:K.title,systemInstruction:B,layers:{level1Functional:u,level3Regulatory:k,level2BaseTopic:j,level2SpecificActivity:O}}}assembleAgendaPrompt(a="1eso"){return wo.assembleAgendaPrompt(a)}}const qe=new Ks,Po={recall:En};class Gs{async getSettings(){const a=await we.aiSettings.toCollection().first();return a||{provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}}async updateSettings(a){const r=await we.aiSettings.toCollection().first();r&&r.id?await we.aiSettings.update(r.id,{...a,updatedAt:new Date().toISOString()}):await we.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString(),...a})}async testConnection(a){try{const r=`${a.endpointUrl.replace(/\/+$/,"")}/models`,i={"Content-Type":"application/json"};a.apiKey&&(i.Authorization=`Bearer ${a.apiKey.trim()}`);const s=new AbortController,p=setTimeout(()=>s.abort(),4e3),u=await fetch(r,{method:"GET",headers:i,signal:s.signal});return clearTimeout(p),u.ok?{success:!0,message:`Conexión exitosa con ${a.endpointUrl}`}:{success:!1,message:`El servidor respondió con código ${u.status}: ${u.statusText}`}}catch{return{success:!1,message:`No se pudo conectar con ${a.endpointUrl}. Modo socrático local simulado activo.`}}}async callLLM(a,r){var s,p,u;const i=await this.getSettings();try{const m=`${i.endpointUrl.replace(/\/+$/,"")}/chat/completions`,b={"Content-Type":"application/json"};i.apiKey&&(b.Authorization=`Bearer ${i.apiKey.trim()}`);const h=[];for(const q of r){if(!q.content||!q.content.trim())continue;const j=h[h.length-1];j&&j.role===q.role?j.content.trim()!==q.content.trim()&&(j.content=`${j.content}

${q.content.trim()}`):h.push({role:q.role,content:q.content.trim()})}const _=new AbortController,k=setTimeout(()=>_.abort(),3e4),L=await fetch(m,{method:"POST",headers:b,signal:_.signal,body:JSON.stringify({model:i.modelName,messages:[{role:"system",content:a},...h],temperature:i.temperature})});if(clearTimeout(k),L.ok){const j=(u=(p=(s=(await L.json()).choices)==null?void 0:s[0])==null?void 0:p.message)==null?void 0:u.content;if(j)return j.trim()}else{const q=await L.text();console.error(`[AI Client] Error HTTP ${L.status} (${L.statusText}) en ${m}:`,q)}}catch(m){console.warn("[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:",m)}return null}async generateSocraticResponse(a,r,i,s,p){const m=$e.getState().user,b=(m==null?void 0:m.gradeKey)||"1eso",_=qe.assemblePrompt({role:"socratic",gradeKey:b,subject:r,topicId:i.startsWith("topic_")||i.startsWith("t_")?i:void 0,activityId:p}).systemInstruction,L=s.filter((j,ee)=>!(ee===s.length-1&&j.role==="student"&&j.content.trim()===a.trim())).slice(-6).map(j=>({role:j.role==="tutor"?"assistant":"user",content:j.content})),q=await this.callLLM(_,[...L,{role:"user",content:a}]);if(q){const ee=!!q.match(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/i),K=q.replace(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/gi,"").trim();return{id:`msg_${Date.now()}`,role:"tutor",content:K,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!ee,isTaskCompleted:ee,suggestedPrompts:ee?["🎉 ¡Objetivo pedagógico conseguido!","Avanzar a la siguiente variación","Volver a la Agenda"]:["¿Cómo relaciono esto con la teoría?","Quiero resolver el siguiente paso","Dame un ejemplo similar"]}}return await new Promise(j=>setTimeout(j,500)),this.createSimulatedSocraticResponse(a,r,i,b,p,s)}calculateAgendaStats(a){const r=new Date().toISOString().split("T")[0],i=a.filter(K=>!K.completed&&(K.type==="exam"||K.type==="assignment_due")).map(K=>{const O=new Date(K.date).getTime()-new Date(r).getTime(),B=Math.ceil(O/864e5);return{title:K.title,subject:K.subject,date:K.date,type:K.type,daysLeft:B}}).sort((K,O)=>K.daysLeft-O.daysLeft),s=a.filter(K=>K.date===r),p=s.filter(K=>!K.completed&&K.type!=="class").reduce((K,O)=>K+(O.durationMinutes||45),0),m=Math.max(0,390-p),b=Math.round(m/60*10)/10,h=new Map;let _=0;for(const K of a){if(K.type==="class")continue;const O=K.durationMinutes||45;_+=O;const B=h.get(K.subject)||{minutes:0,count:0};B.minutes+=O,B.count+=1,h.set(K.subject,B)}const k=Array.from(h.entries()).map(([K,O])=>({subject:K,minutes:O.minutes,blockCount:O.count,percentage:_>0?Math.round(O.minutes/_*100):0})).sort((K,O)=>O.minutes-K.minutes),L=a.filter(K=>K.type==="assignment_due"),q=L.filter(K=>K.completed).length,j=L.length,ee=j>0?Math.round(q/j*100):100;return{urgentPriorities:i,afternoonDistribution:{classesEndTime:"15:00",todayStudyMinutes:p,freeTimeHours:b,totalBlocksToday:s.length},subjectBreakdown:k,homeworkProgress:{completed:q,total:j,percentage:ee}}}async generatePlanificationDialogue(a,r,i){var ee,K,O;const s=this.calculateAgendaStats(a),p=$e.getState(),u=((ee=p.user)==null?void 0:ee.name)||"Estudiante",m=((K=p.user)==null?void 0:K.gradeLevel)||"1º de ESO",b=((O=p.user)==null?void 0:O.gradeKey)||"1eso",h=new Date().toISOString().split("T")[0],k=`
${wo.assembleAgendaPrompt(b).systemInstruction}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${u} (${m}).
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
`.trim(),L=`
DATOS DE LA AGENDA DE ${u.toUpperCase()}:
- Prioridades urgentes:
${s.urgentPriorities.map(B=>`  • [${B.type==="exam"?"Examen":"Entrega"}] ${B.subject}: "${B.title}" (${B.daysLeft===0?"¡Hoy!":B.daysLeft===1?"Mañana":`en ${B.daysLeft} días`})`).join(`
`)||"  • No hay hitos inmediatos"}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${s.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${s.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${s.subjectBreakdown.map(B=>`${B.subject}: ${B.minutes} min (${B.percentage}%)`).join(", ")||"Sin bloques"}
- Avance de deberes: ${s.homeworkProgress.completed}/${s.homeworkProgress.total} completados (${s.homeworkProgress.percentage}%).
${r?`MENSAJE DEL ALUMNO: "${r}"`:"(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)"}
`.trim(),q=[...(i||[]).map(B=>({role:B.role==="assistant"?"assistant":"user",content:B.content})),{role:"user",content:L}],j=await this.callLLM(k,q);if(j){let B=this.createDefaultSuggestedBlocks(a,s,r,b);try{const Y=j.match(/```json\s*([\s\S]*?)\s*```/)||j.match(/\[[\s\S]*\]/);if(Y){const V=JSON.parse(Y[1]||Y[0]);Array.isArray(V)&&V.length>0&&(B=V.map(W=>({title:W.title||"Sesión de estudio activo",subject:W.subject||"General",date:W.date||h,startTime:W.startTime||"17:00",durationMinutes:W.durationMinutes||45,type:W.type||"study_session",completed:!1,notes:W.notes||"Planificado por Anaxagoras AI",gradeKey:b,syncedWithGoogle:!1})))}}catch(Y){console.warn("[AI Client] No se pudo parsear JSON del planificador LLM:",Y)}return{message:j.replace(/```json[\s\S]*?```/,"").trim(),suggestedBlocks:B}}return this.createSimulatedPlanificationResponse(a,s,u,m,b,r)}createDefaultSuggestedBlocks(a,r,i,s="1eso"){const p=new Date().toISOString().split("T")[0],u=new Date(Date.now()+864e5).toISOString().split("T")[0],m=new Date(Date.now()+864e5*2).toISOString().split("T")[0],b=(i||"").toLowerCase(),h=b.includes("retras")||b.includes("posp")||b.includes("profe")||b.includes("aplaza"),_=b.includes("descans")||b.includes("libre")||b.includes("cansad")||b.includes("menos"),k=b.includes("mate")||b.includes("cálculo"),L=b.includes("lengua")||b.includes("sintaxis"),q=_?30:45;return s==="1eso"?[{title:L||h?"Práctica de Oraciones: Sujeto y Predicado en Bloque":"Repaso Activo: Ciencias Naturales (Ecosistemas)",subject:L||h?"Lengua Castellana":"Ciencias Naturales",date:h?u:p,startTime:"17:15",durationMinutes:q,type:"study_session",completed:!1,notes:h?"📅 Tarea reprogramada respetando el aviso del profesor.":"Hacer mapa visual de 1 página sin mirar el libro.",gradeKey:"1eso",syncedWithGoogle:!1},{title:k?"Fracciones Básicas: Resolución de 4 Ejercicios":"Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)",subject:k?"Matemáticas":"Ciencias Sociales",date:h?m:u,startTime:"18:15",durationMinutes:q,type:"study_session",completed:!1,notes:"Preparación espaciada para asentar conceptos antes del examen.",gradeKey:"1eso",syncedWithGoogle:!1}]:[{title:k||h?"Matemáticas II: Discusión de Sistemas de Cramer con Parámetro":"Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)",subject:k||h?"Matemáticas II":"Filosofía",date:h?u:p,startTime:"17:00",durationMinutes:_?40:50,type:"study_session",completed:!1,notes:h?"📅 Reprogramado según nueva directriz del profesor.":"Redacción de síntesis conceptual para la prueba de Selectividad.",gradeKey:"2batx",syncedWithGoogle:!1},{title:"Lengua Castellana: Pruebas de Concordancia de CPred (PAU)",subject:"Lengua Castellana",date:m,startTime:"18:15",durationMinutes:_?40:50,type:"study_session",completed:!1,notes:"Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.",gradeKey:"2batx",syncedWithGoogle:!1}]}createSimulatedPlanificationResponse(a,r,i,s,p,u){const m=this.createDefaultSuggestedBlocks(a,r,u,p),b=(u||"").toLowerCase(),h=r.urgentPriorities[0],_=r.subjectBreakdown[0];let k="";return b.includes("retras")||b.includes("posp")||b.includes("profe")?k=`¡Comprendido, ${i}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.

• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.
• **Tu tarde protegida:** Hoy mantendrás **${r.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.
• **Prioridad activa:** Tu foco principal sigue siendo ${h?`el examen de **${h.subject}** (${h.title}) en ${h.daysLeft} días`:"mantener un ritmo espaciado"}.

¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`:k=`¡Hola, ${i}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${s}**:

🎯 **1. Qué es más prioritario hoy:**
`+(h?`Lo más urgente es **${h.subject}**: *"${h.title}"*, que vence ${h.daysLeft===0?"¡hoy mismo!":h.daysLeft===1?"mañana":`en ${h.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.

`:`No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.

`)+`⏱️ **2. Distribución de tu tiempo esta tarde:**
Tus clases lectivas finalizan a las 15:00. Te he programado **${r.afternoonDistribution.todayStudyMinutes>0?`${r.afternoonDistribution.todayStudyMinutes} minutos`:"45 minutos"} de estudio activo**, lo que te deja **${r.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪

📊 **3. Balance por asignaturas:**
`+(_?`La materia con más tiempo acumulado es **${_.subject}** (${_.minutes} min). ${r.subjectBreakdown.length>1?`Recomiendo alternar con materias que llevan menos minutos (${r.subjectBreakdown[r.subjectBreakdown.length-1].subject}) para entrenar el entrelazado cognitivo.`:""}

`:`Aún no hay suficiente historial de minutos registrados esta semana.

`)+`📝 **4. Avance de tus deberes:**
Llevas completados el **${r.homeworkProgress.percentage}% de tus entregas** (${r.homeworkProgress.completed} de ${r.homeworkProgress.total}).

Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`,{message:k,suggestedBlocks:m}}async generateStudyPlan(a,r){var u;const s=((u=$e.getState().user)==null?void 0:u.gradeKey)||"1eso",p=this.calculateAgendaStats([]);return this.createDefaultSuggestedBlocks([],p,void 0,s)}async generateActiveRecallCard(a,r){var m;const s=((m=$e.getState().user)==null?void 0:m.gradeKey)||"1eso",p=`${Po.recall}

Genera una tarjeta conceptual de autoevaluación para la materia ${a} y tema ${r} adaptada al nivel ${s==="1eso"?"1º de ESO":"2º de Bachillerato"}. Formato JSON estricto.`,u=await this.callLLM(p,[{role:"user",content:`Crear desafío de active recall sobre ${r}`}]);if(u)try{const b=u.match(/\{[\s\S]*\}/);if(b){const h=JSON.parse(b[0]);return{id:`card_${Date.now()}`,concept:h.concept||`¿Cómo definirías la clave de ${r}?`,hint:h.hint||"Piensa en las causas fundamentales y consecuencias.",explanation:h.explanation||"Resumen conceptual para verificar comprensión activa.",masteryScore:0}}}catch(b){console.warn("[AI Client] Fallo al parsear flashcard de LLM:",b)}return a.toLowerCase().includes("lengua")?s==="1eso"?{id:`card_${Date.now()}`,concept:'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',hint:'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',explanation:'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',masteryScore:0}:{id:`card_${Date.now()}`,concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',hint:'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',explanation:'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',masteryScore:0}:{id:`card_${Date.now()}`,concept:`¿Cómo influyen los factores limitantes en ${r} (${a})?`,hint:"Recuerda qué variable impide que el proceso aumente indefinidamente.",explanation:"El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.",masteryScore:0}}createSimulatedSocraticResponse(a,r,i="",s="1eso",p,u){const m=a.toLowerCase();let b="",h=[];const _=m.includes("dame la respuesta")||m.includes("solucion")||m.includes("solución")||m.includes("hazmelo")||m.includes("resuelve")||m.includes("escribe el texto")||m.includes("dime el resultado"),k=m.includes("termin")||m.includes("listo")||m.includes("ya está")||m.includes("completad")||m.includes("entendido todo")||m.includes("ya lo sé")||m.includes("ya lo entiendo");r.toLowerCase().includes("lengua")||i.toLowerCase().includes("oraci")||i.toLowerCase().includes("sintaxis")?s==="1eso"?m.includes("modo")||m.includes("lugar")||m.includes("tren")||m.includes("sujeto")||m.includes("complemento verbal")||m.includes("cv")||m.includes("alarma")||m.includes("exploradores")||m.includes("estación")||k?b=`¡Brillante deducción, Marc! 🎯 Has completado todos los objetivos didácticos exigidos en este nivel de 1º de ESO:

1. **Sujeto:** *"El tren"* (concuerda con el verbo).
2. **Verbo:** *"llegó"* (núcleo del predicado).
3. **Complemento Verbal (CV) en bloque:** *"puntual a la estación"*, aportando información sobre cómo y hacia dónde se produce la acción sin necesidad de clasificaciones abstractas prematuras.

¡Has alcanzado la meta pedagógica de esta tarea con total rigor y autonomía! Tómate un merecido descanso o pasa a la siguiente variación cuando te sientas preparado. 💪

[TAREA_COMPLETADA: ${p||"act_lengua_1eso_1"}]`:_?(b=`¡Me encantaría ahorrarte tiempo Marc, pero si te doy el resultado te quitaría la oportunidad de entrenar tu mente! 💪

Vamos a descubrirlo paso a paso. En *"El tren llegó puntual a la estación"*, ¿quién realiza la acción de llegar?`,h=['El sujeto es "El tren"',"¿Cómo reconozco el sujeto?","¿Cuál es el verbo?"]):(b=`¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨

En la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.

¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`,h=["Aporta información del modo y el lugar del viaje",'El sujeto es "El tren" y el CV es "puntual a la estación"',"¿Por qué en 1º de ESO no distinguimos subtipos?"]):m.includes("concordancia")||m.includes("plural")||m.includes("locomotoras")||m.includes("puntuales")||m.includes("cpred")||m.includes("predicativo")||m.includes("invariable")||k?b=`¡Excelente rigor filológico, Álvaro! 🎓⚖️ Has demostrado formalmente la prueba morfosintáctica requerida en las PAU:

1. **Prueba de concordancia obligatoria:** Al cambiar el sujeto a plural (*"Las locomotoras..."*), el adjetivo varía obligatoriamente (*"Las locomotoras llegaron **puntuales**"*).
2. **Deducción formal:** Esa concordancia en género y número demuestra de forma irrefutable que **"puntual"** es un **Complemento Predicativo (CPred)** del sujeto, y no un CCM (los adverbios como *"puntualmente"* son siempre invariables).
3. **Complemento circunstancial:** *"a la estación"* funciona como Sintagma Preposicional en función de Complemento Circunstancial de Lugar (CCL).

¡Has alcanzado la meta pedagógica preuniversitaria para esta actividad con máxima solvencia! La sesión de estudio queda formalmente finalizada y consolidada. 👏

[TAREA_COMPLETADA: ${p||"act_lengua_2batx_1"}]`:_?(b=`¡Álvaro, en 2º de Bachillerato la PAU exige justificación formal propia! 🎓

Prueba a cambiar el sujeto *"El tren"* por el plural *"Las locomotoras"*. ¿Qué le ocurre al adjetivo *"puntual"*?`,h=['Cambia a plural ("llegaron puntuales")',"¿Por qué un adjetivo no puede ser CCM?","Es una prueba de concordancia"]):(b=`¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚

En la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.

Fíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`,h=['Concuerda con el sujeto ("llegaron puntuales"), es CPred','¿Y qué función sintáctica tiene "a la estación"?',"¿Qué diferencia hay entre CPred y Atributo?"]):k?b=`¡Magnífico trabajo de asimilación! 🧠✨ Has revisado con éxito los conceptos clave de **${r}** (${i||"tema curricular"}) demostrando una comprensión sólida y justificada.

Damos por finalizada esta sesión de estudio y repaso para consolidar la memoria a largo plazo y evitar la sobrecarga cognitiva. ¡Enhorabuena por tu constancia! 🎉

[TAREA_COMPLETADA: ${p||"task_general"}]`:u&&u.length>=8?b=`¡Gran esfuerzo durante esta sesión de estudio en **${r}**! 👏 Hemos cubierto los aspectos fundamentales del temario previsto. Para evitar la fatiga mental y fijar lo aprendido, cerramos aquí el bloque de trabajo de hoy.

Descansa un rato y celebra los progresos que has conseguido razonando paso a paso. ¡Objetivo alcanzado! 🚀

[TAREA_COMPLETADA: ${p||"task_pacing"}]`:_?(b=`¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`,h=["Los datos son...","No entiendo bien qué significa este dato","¿Qué fórmula podemos usar?"]):m.includes("no entiendo")||m.includes("duda")||m.includes("dificil")||m.includes("difícil")?(b=`Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${r}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`,h=["Entiendo la teoría pero me cuesta aplicarlo","¿Puedes darme una pista visual o ejemplo?","Creo que el primer paso es identificar las variables"]):(b=`¡Excelente razonamiento! Estás conectando muy bien las ideas en **${r}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`,h=["Creo que aumentaría proporcionalmente","¿Podría haber una excepción a esa regla?","Quiero comprobarlo con otro ejemplo práctico"]);const q=!!b.match(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/i),j=b.replace(/\[TAREA_COMPLETADA(?::\s*([a-zA-Z0-9_\-]+))?\]/gi,"").trim();return{id:`msg_${Date.now()}`,role:"tutor",content:j,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!q,isTaskCompleted:q,suggestedPrompts:q?["🎉 ¡Objetivo pedagógico conseguido!","Avanzar a la siguiente variación","Volver a la Agenda"]:h}}}const Lt=new Gs;function Vs(d,a){const r=ta.getCurrentLanguage();d.innerHTML=`
    <div class="w-full transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <img src="./icons/icon-192.png" alt="Anaxagoras AI Logo" class="w-10 h-10 rounded-2xl shadow-md shadow-brand-500/20 object-cover border border-slate-200/80 bg-slate-900" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${A("app.title")}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${A("app.badge")}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${A("app.tagline")}</p>
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
            <span id="ai-model-label" class="hidden md:inline">Ollama (${A("nav.local")})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </div>
  `;const i=d.querySelector("#lang-selector");i==null||i.addEventListener("change",async u=>{const m=u.target.value;await ta.changeLanguage(m),a.onLanguageChange(m)});const s=d.querySelector("#btn-ai-settings");s==null||s.addEventListener("click",()=>a.onOpenAISettings());const p=d.querySelector("#auth-container");p&&$e.subscribe(u=>{var m,b,h;u.isAuthenticated&&u.user?(p.innerHTML=`
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
        `,(m=p.querySelector("#btn-quick-switch-grade"))==null||m.addEventListener("click",()=>{$e.toggleGradeProfile()}),(b=p.querySelector("#btn-user-profile"))==null||b.addEventListener("click",a.onOpenAuth)):(p.innerHTML=`
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${A("nav.connectGoogle")}</span>
          </button>
        `,(h=p.querySelector("#btn-connect-google"))==null||h.addEventListener("click",a.onOpenAuth))}),Lt.getSettings().then(u=>{const m=d.querySelector("#ai-model-label");m&&(m.textContent=u.provider==="local"?`${u.modelName} (${A("nav.local")})`:`${u.modelName} (${A("nav.cloud")})`)})}function Hs(d,a,r){d.innerHTML=`
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0">
      <div class="flex items-center justify-between border-b border-slate-200/80">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="study"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">💡</span>
            <span>${A("tabs.study")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              ${A("tabs.tutorBadge")}
            </span>
          </button>

          <!-- Tab 2: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="tasks"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📝</span>
            <span>${A("tabs.tasks")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="tasks"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>${A("app.criticalThinking")}</span>
        </div>
      </div>
    </nav>
  `,d.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const p=s.dataset.tab;r.onTabChange(p)})})}function Us(d,a){Lt.getSettings().then(r=>{var u,m;d.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 border border-slate-100 transition-all my-auto max-h-[92vh] flex flex-col">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">${A("aiModal.title")}</h3>
                <p class="text-xs text-slate-500">${A("aiModal.subtitle")}</p>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">${A("aiModal.inferenceType")}</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="local"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${r.provider==="local"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${A("aiModal.localTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${A("aiModal.localDesc")}</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${r.provider==="cloud"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${r.provider==="cloud"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${A("aiModal.cloudTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${A("aiModal.cloudDesc")}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${A("aiModal.endpointUrl")}</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${r.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${A("aiModal.endpointHint")}</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${A("aiModal.modelName")}</label>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${A("aiModal.apiKey")}</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${r.apiKey||""}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${A("aiModal.apiKeyHint")}</span>
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
                <span>${A("aiModal.testConnection")}</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  ${A("aiModal.cancel")}
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  ${A("aiModal.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,(u=d.querySelector("#btn-close-modal"))==null||u.addEventListener("click",a.onClose),(m=d.querySelector("#btn-cancel"))==null||m.addEventListener("click",a.onClose);const i=d.querySelector("#btn-test-connection"),s=d.querySelector("#test-result-box");i==null||i.addEventListener("click",async()=>{const b=d.querySelector("#input-endpoint").value,h=d.querySelector("#input-model").value,_=d.querySelector("#input-apikey").value.trim(),k=d.querySelector('input[name="provider"]:checked');i&&(i.innerHTML=`<span>⏳</span><span>${A("aiModal.testing")}</span>`);const L=await Lt.testConnection({provider:(k==null?void 0:k.value)||"local",endpointUrl:b.trim(),modelName:h.trim(),apiKey:_,temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()});i&&(i.innerHTML=`<span>⚡</span><span>${A("aiModal.testConnection")}</span>`),s&&(s.classList.remove("hidden","bg-emerald-50","text-emerald-700","bg-amber-50","text-amber-700"),L.success?(s.classList.add("bg-emerald-50","text-emerald-700"),s.textContent=`✅ ${L.message}`):(s.classList.add("bg-amber-50","text-amber-700"),s.textContent=`ℹ️ ${L.message}`))});const p=d.querySelector("#ai-settings-form");p==null||p.addEventListener("submit",async b=>{b.preventDefault();const h=d.querySelector("#input-endpoint").value.trim(),_=d.querySelector("#input-model").value.trim(),k=d.querySelector("#input-apikey").value.trim(),L=d.querySelector('input[name="provider"]:checked');await Lt.updateSettings({provider:(L==null?void 0:L.value)||"local",endpointUrl:h,modelName:_,apiKey:k,socraticStrictness:"high"}),a.onSaved()})})}function Sn(d,a){var p,u,m,b,h,_,k,L,q;const r=$e.getState();d.innerHTML=`
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
              <h3 class="font-display font-bold text-lg text-slate-900">${A("authModal.title")}</h3>
              <p class="text-xs text-slate-500">${A("authModal.subtitle")}</p>
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
                          ${A("authModal.realBadge")}
                        </span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${A("authModal.demoBadge")}
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
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${A("authModal.authorizedResources")}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${A("authModal.calendarTitle")}</p>
                      <p class="text-[11px] text-slate-500">${A("authModal.calendarDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?A("authModal.statusReal"):A("authModal.statusDemo")}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${A("authModal.driveTitle")}</p>
                      <p class="text-[11px] text-slate-500">${A("authModal.driveDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${r.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${r.mode==="real"?A("authModal.statusReal"):A("authModal.statusDemo")}
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
                      <span>${A("authModal.realOptionTitle")}</span>
                    </button>
                  `:`
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${A("authModal.demoButton")}</span>
                    </button>
                  `}

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${A("authModal.disconnect")}
                </button>
              </div>
            `:""}

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${r.isAuthenticated?"hidden":"block"} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${A("authModal.realOptionTitle")}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${A("authModal.realOptionDesc")}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${A("authModal.clientIdLabel")}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${r.clientId||""}" 
                placeholder="${A("authModal.clientIdPlaceholder")}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${A("authModal.clientIdHelp")}</span>
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
              <span>${A("authModal.realButton")}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${A("authModal.demoButton")}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `,(p=d.querySelector("#btn-close-auth"))==null||p.addEventListener("click",a.onClose),(u=d.querySelector("#btn-show-real-connect"))==null||u.addEventListener("click",()=>{var j;(j=d.querySelector("#real-connect-box"))==null||j.classList.remove("hidden")}),(m=d.querySelector("#btn-modal-set-1eso"))==null||m.addEventListener("click",()=>{$e.setGradeProfile("1eso"),a.onStateChanged(),Sn(d,a)}),(b=d.querySelector("#btn-modal-set-2batx"))==null||b.addEventListener("click",()=>{$e.setGradeProfile("2batx"),a.onStateChanged(),Sn(d,a)}),(h=d.querySelector("#btn-manual-check-update"))==null||h.addEventListener("click",async()=>{await Pn.checkForUpdates(!0)}),(_=d.querySelector("#btn-force-hard-reset"))==null||_.addEventListener("click",async()=>{confirm("¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.")&&await Pn.forceHardReset()}),(k=d.querySelector("#btn-switch-to-demo"))==null||k.addEventListener("click",async()=>{await $e.connectDemo(),a.onStateChanged(),a.onClose()}),(L=d.querySelector("#btn-activate-demo"))==null||L.addEventListener("click",async()=>{await $e.connectDemo(),a.onStateChanged(),a.onClose()}),(q=d.querySelector("#btn-disconnect-google"))==null||q.addEventListener("click",()=>{$e.disconnect(),a.onStateChanged(),a.onClose()});const i=d.querySelector("#btn-do-connect-real"),s=d.querySelector("#auth-error-box");i==null||i.addEventListener("click",async()=>{const j=d.querySelector("#input-client-id"),ee=j==null?void 0:j.value.trim();if(!ee){s&&(s.classList.remove("hidden"),s.textContent="Por favor, introduce tu Google OAuth Client ID.");return}i&&(i.innerHTML="<span>⏳ Conectando con Google...</span>");try{await $e.connectRealGoogle(ee),a.onStateChanged(),a.onClose()}catch(K){i&&(i.innerHTML=`<span>${A("authModal.realButton")}</span>`),s&&(s.classList.remove("hidden"),s.textContent=K.message||"Error al conectar con Google OAuth 2.0.")}})}function Er(d){return String(d||"").replace(/<[^>]*>/g,"").trim()}function Ao(d,a,r){const i=`${Er(d)}/${Er(a)}`;return`<span class="math-fraction inline-flex flex-col items-center justify-center align-middle mx-1 font-serif text-[0.88em] leading-none select-all transition-transform hover:scale-105" aria-label="${i}" title="${i}"><span class="math-num border-b-[1.5px] border-current pb-0.5 px-1 font-bold text-center leading-none">${d}</span><span class="math-den pt-0.5 px-1 font-bold text-center leading-none">${a}</span></span>`}function Ws(d){let a=d;return d==="-"||d==="&minus;"?a="&minus;":d==="*"||d==="x"||d==="\\times"?a="&times;":d==="/"||d==="\\div"?a="&divide;":d==="!="||d==="\\ne"||d==="\\neq"?a="&ne;":d==="<="||d==="\\le"||d==="\\leq"?a="&le;":d===">="||d==="\\ge"||d==="\\geq"?a="&ge;":d==="\\approx"?a="&asymp;":d==="\\pm"?a="&plusmn;":(d==="\\rightarrow"||d==="->")&&(a="&rarr;"),`<span class="math-operator mx-1 font-sans font-bold opacity-80 select-none">${a}</span>`}function Yt(d,a={}){let r=String(d||"").trim();if(r.includes("\\begin{cases}"))return r.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g,(p,u)=>`<div class="inline-flex items-center gap-2 font-serif my-1 bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-brand-200/60 shadow-xs"><span class="text-3xl sm:text-4xl font-light text-brand-600 select-none leading-none">{</span><div class="flex flex-col gap-1 text-left text-xs sm:text-sm font-medium text-slate-800">${u.split("\\\\").map(h=>h.trim()).filter(Boolean).map(h=>`<div>${Yt(h,{inner:!0})}</div>`).join("")}</div></div>`);r=r.replace(/\\sqrt\{([^{}]+)\}|sqrt\(([^()]+)\)/g,(p,u,m)=>`§SQRT§${u||m}§ENDSQRT§`),r=r.replace(/\\text\{([^{}]+)\}/g,"§TEXT§$1§ENDTEXT§"),r=r.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g,"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(new RegExp("(?<!\\d\\/)\\b(\\d+)\\/(\\d+)\\b(?!\\/\\d)","g"),"§FRAC§$1§OVER§$2§ENDFRAC§"),r=r.replace(/\^\{([^{}]+)\}|\^([0-9a-zA-Z\+\-]+)/g,(p,u,m)=>`§SUP§${u||m}§ENDSUP§`),r=r.replace(/_\{([^{}]+)\}|_([0-9a-zA-Z\+\-]+)/g,(p,u,m)=>`§SUB§${u||m}§ENDSUB§`);const i={"\\times":"§OP§\\times§ENDOP§","\\div":"§OP§\\div§ENDOP§","\\neq":"§OP§\\neq§ENDOP§","\\ne":"§OP§\\ne§ENDOP§","\\approx":"§OP§\\approx§ENDOP§","\\leq":"§OP§\\leq§ENDOP§","\\le":"§OP§\\le§ENDOP§","\\geq":"§OP§\\geq§ENDOP§","\\ge":"§OP§\\ge§ENDOP§","\\pm":"§OP§\\pm§ENDOP§","\\rightarrow":"§OP§\\rightarrow§ENDOP§","->":"§OP§->§ENDOP§","!=":"§OP§!=§ENDOP§","<=":"§OP§<=§ENDOP§",">=":"§OP§>=§ENDOP§","+":"§OP§+§ENDOP§","-":"§OP§-§ENDOP§","*":"§OP§*§ENDOP§","=":"§OP§=§ENDOP§"},s=Object.keys(i).sort((p,u)=>u.length-p.length);for(const p of s){const u=p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),m=new RegExp(`(^|\\s|[a-zA-Z0-9§])(${u})($|\\s|[a-zA-Z0-9§])`,"g");r=r.replace(m,`$1${i[p]}$3`)}return r=r.replace(/§FRAC§(.*?)§OVER§(.*?)§ENDFRAC§/g,(p,u,m)=>Ao(u.trim(),m.trim())),r=r.replace(/§OP§(.*?)§ENDOP§/g,(p,u)=>Ws(u)),r=r.replace(/§SQRT§(.*?)§ENDSQRT§/g,(p,u)=>`<span class="inline-flex items-center align-middle mx-1 font-serif"><span class="text-[1.15em] font-serif leading-none mr-0.5">&radic;</span><span class="border-t border-current px-1 leading-tight">${u}</span></span>`),r=r.replace(/§TEXT§(.*?)§ENDTEXT§/g,'<span class="font-sans font-normal mx-1">$1</span>'),r=r.replace(/§SUP§(.*?)§ENDSUP§/g,'<sup class="text-[0.72em] font-bold px-0.5">$1</sup>'),r=r.replace(/§SUB§(.*?)§ENDSUB§/g,'<sub class="text-[0.72em] font-semibold px-0.5">$1</sub>'),a.inner?r:a.badge?`<span class="math-badge inline-flex items-center flex-wrap gap-1 px-3 py-1.5 rounded-2xl bg-brand-50/90 border border-brand-200/90 text-brand-950 font-serif shadow-xs text-xs sm:text-sm ${a.className||""}">${r}</span>`:`<span class="math-expr inline-flex items-center flex-wrap font-serif align-middle ${a.className||""}">${r}</span>`}function Ct(d,a={}){if(!d)return"";const r=[];let i=d.replace(/<[^>]+>/g,_=>{const k=`§§HTML_TAG_${r.length}§§`;return r.push({key:k,tag:_}),k});const s=[];function p(_){const k=`§§MATH_TOKEN_${s.length}§§`;return s.push({key:k,html:_}),k}const u=/\b(?:Real\s+Decreto|Decreto|Decret|RD|Ley(?:\s+Orgánica)?|Llei|Orden|Ordre|Resolución|BOE|DOGV|DOGC|núm\.|número)\s+[A-Za-z0-9\.\-\/]*\s*\d+\/\d+/gi;i=i.replace(u,_=>p(_));const m=new RegExp("(?<![a-zA-Z0-9\\-\\/])\\d{1,4}\\/(?:19|20)\\d{2}(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(m,_=>p(_)),i=i.replace(/\$\$([\s\S]*?)\$\$/g,(_,k)=>p(`<div class="my-2.5 flex justify-center w-full overflow-x-auto py-1">${Yt(k,{badge:!0,className:"shadow-sm border-brand-300"})}</div>`)),i=i.replace(/\$([^\$\n]+)\$/g,(_,k)=>p(Yt(k,{badge:!1,inner:!1})));const b=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+\\/\\d+)(\\s*[\\+\\-\\*\\/=]\\s*\\d+\\/\\d+)+(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(b,_=>p(a.badge?Yt(_,{badge:!0}):Yt(_,{badge:!1})));const h=new RegExp("(?<![a-zA-Z0-9\\-\\/])(\\d+)\\/(?!(?:19|20)\\d{2}\\b)(\\d+)(?![a-zA-Z0-9\\-\\/])","g");i=i.replace(h,(_,k,L)=>p(Ao(k,L)));for(const{key:_,html:k}of s)i=i.replace(_,k);for(const{key:_,tag:k}of r)i=i.replace(_,k);return i}function Qs(d,a,r){return`
    <div class="math-card flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-brand-50/90 via-indigo-50/70 to-cyan-50/40 border border-brand-200/90 shadow-sm transition-all hover:shadow-md">
      <div class="flex items-center gap-2.5 flex-wrap flex-1">
        <span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-2.5 py-1 rounded-xl border border-brand-200/80 shadow-2xs flex-shrink-0">
          ${d}
        </span>
        <div class="font-serif text-sm sm:text-base text-slate-900 flex items-center flex-wrap gap-1">
          ${Ct(a)}
        </div>
      </div>
      ${r?`<span class="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-white text-brand-700 border border-brand-200 shadow-2xs whitespace-nowrap">${r}</span>`:""}
    </div>
  `}function Ve(d,a=!0){const r=d.replace(/^# (.*$)/gim,'<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200/80">$1</h2>').replace(/^## (.*$)/gim,'<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>').replace(/^### (.*$)/gim,'<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1 text-brand-700">$1</h4>').replace(/\*\*(.*?)\*\*/gim,'<strong class="font-bold text-slate-900">$1</strong>').replace(/\*(.*?)\*/gim,'<em class="italic text-slate-700">$1</em>').replace(/```json([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/```([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/^\- (.*$)/gim,'<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>').replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>').replace(/\n\n/gim,"<br/><br/>");return a?Ct(r):r}function Ys(d,a){return d.includes("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?d.split(/(=== \[MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3\] ===[\s\S]*?==================================================)/).map(i=>i.startsWith("=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===")?Ve(i,!1):Ve(i,!0)).join(""):Ve(d,!0)}function Xt(d,a,r,i){var Y;const s=i,p=s.assembledPrompt,u=s.assembledAgendaPrompt;let m=!0;const b=[];if(p){b.push({id:"consolidated",isConsolidated:!0,icon:"🔀",levelBadge:A("promptModal.tabs.all"),badgeClass:"bg-slate-900 text-white border-slate-700",title:A("promptModal.titleAssembled",{subject:p.subject}),subtitle:A("promptModal.subtitleAssembled",{topic:p.topicName}),source:"Pipeline de Memoria en Ejecución (Orquestador Dinámico)",rawContent:p.systemInstruction,formattedHtml:Ys(p.systemInstruction),isOpen:!0,accentColor:"#3b82f6",nodeRingClass:"focus:ring-brand-500 border-slate-700 hover:border-brand-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const V=p.layers.level1Functional;b.push({id:"level1",isConsolidated:!1,icon:"🧠",levelBadge:V.badge||A("promptModal.tabs.level1"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:V.title,subtitle:V.subtitle,source:V.source,rawContent:V.content,formattedHtml:Ve(V.content,!0),isOpen:!1,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-brand-200 hover:border-brand-400 hover:bg-brand-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-brand-200"});const W=p.layers.level3Regulatory;b.push({id:"level3",isConsolidated:!1,icon:"⚖️",levelBadge:W.badge||A("promptModal.tabs.level3"),badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:W.title,subtitle:W.subtitle,source:W.source,rawContent:W.content,formattedHtml:Ve(W.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const X=p.layers.level2BaseTopic;if(b.push({id:"level2A",isConsolidated:!1,icon:"🏛️",levelBadge:X.badge||A("promptModal.tabs.level2A"),badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:X.title,subtitle:X.subtitle,source:X.source,rawContent:X.content,formattedHtml:Ve(X.content,!0),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"}),p.layers.level2SpecificActivity){const se=p.layers.level2SpecificActivity;b.push({id:"level2B",isConsolidated:!1,icon:"🎯",levelBadge:se.badge||A("promptModal.tabs.level2B"),badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:se.title,subtitle:se.subtitle,source:se.source,rawContent:se.content,formattedHtml:Ve(se.content,!0),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}}else if(u){b.push({id:"agenda_consolidated",isConsolidated:!0,icon:"🔀",levelBadge:"Consolidado Agenda",badgeClass:"bg-slate-900 text-white border-slate-700",title:u.title,subtitle:u.subtitle,source:"Consolidación Multivariable de Agenda Escolar",rawContent:u.systemInstruction,formattedHtml:Ve(u.systemInstruction,!1),isOpen:!0,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-slate-700 hover:border-cyan-400",nodeBgClass:"bg-gradient-to-br from-slate-900 to-slate-800 text-white",nodeBorderClass:"border-slate-700"});const V=u.pillars.timeDistribution;b.push({id:"agenda_time",isConsolidated:!1,icon:"⏱️",levelBadge:V.badge,badgeClass:"bg-cyan-50 text-cyan-700 border-cyan-200",title:V.title,subtitle:V.subtitle,source:V.source,rawContent:V.content,formattedHtml:Ve(V.content,!1),isOpen:!1,accentColor:"#06b6d4",nodeRingClass:"focus:ring-cyan-500 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-cyan-200"});const W=u.pillars.priorityOrder;b.push({id:"agenda_priority",isConsolidated:!1,icon:"🎯",levelBadge:W.badge,badgeClass:"bg-amber-50 text-amber-700 border-amber-200",title:W.title,subtitle:W.subtitle,source:W.source,rawContent:W.content,formattedHtml:Ve(W.content,!1),isOpen:!1,accentColor:"#f59e0b",nodeRingClass:"focus:ring-amber-500 border-amber-200 hover:border-amber-400 hover:bg-amber-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-amber-200"});const X=u.pillars.commitmentDeadlines;b.push({id:"agenda_deadlines",isConsolidated:!1,icon:"📅",levelBadge:X.badge,badgeClass:"bg-purple-50 text-purple-700 border-purple-200",title:X.title,subtitle:X.subtitle,source:X.source,rawContent:X.content,formattedHtml:Ve(X.content,!1),isOpen:!1,accentColor:"#a855f7",nodeRingClass:"focus:ring-purple-500 border-purple-200 hover:border-purple-400 hover:bg-purple-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-purple-200"});const se=u.pillars.adaptiveFlexibility;b.push({id:"agenda_adaptive",isConsolidated:!1,icon:"🔄",levelBadge:se.badge,badgeClass:"bg-emerald-50 text-emerald-700 border-emerald-200",title:se.title,subtitle:se.subtitle,source:se.source,rawContent:se.content,formattedHtml:Ve(se.content,!1),isOpen:!1,accentColor:"#10b981",nodeRingClass:"focus:ring-emerald-500 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/70",nodeBgClass:"bg-white text-slate-800",nodeBorderClass:"border-emerald-200"})}else{const V=a.includes("Nivel 3")||a.includes("Regulador")||(s.subtitle||"").includes("Regulador");b.push({id:"standalone",isConsolidated:!0,icon:s.institution?"🏛️":"📄",levelBadge:((Y=s.badge)==null?void 0:Y.text)||A("promptModal.badgePrompt"),badgeClass:"bg-brand-50 text-brand-700 border-brand-200",title:a,subtitle:s.subtitle||A("promptModal.defaultSubtitle"),source:s.sourceApi||s.institution,rawContent:r,formattedHtml:Ve(r,!V),isOpen:!0,accentColor:"#6366f1",nodeRingClass:"focus:ring-brand-500 border-slate-700",nodeBgClass:"bg-slate-900 text-white",nodeBorderClass:"border-slate-700"})}const h=b.find(V=>V.isConsolidated),_=b.filter(V=>!V.isConsolidated),k=_.length>0;function L(){var se;const V=p?A("promptModal.titleAssembled",{subject:p.subject}):u?u.title:a,W=p?A("promptModal.subtitleAssembled",{topic:p.topicName}):s.subtitle||A("promptModal.defaultSubtitle"),X=p?A("promptModal.badge4Layers"):u?"Estructura Propia de Agenda":((se=s.badge)==null?void 0:se.text)||A("promptModal.badgePrompt");return`
      <div id="prompt-modal-backdrop" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 border border-slate-100 max-h-[92vh] flex flex-col transition-all my-auto">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                ${u?"⏱️":p?"🧩":s.institution?"🏛️":"📄"}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${V}</h3>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
                    ${X}
                  </span>
                </div>
                <p class="text-xs text-slate-500">${W}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              ${k?`
                <button id="btn-toggle-graph" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${m?"bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100":"bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}" title="${A(m?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}">
                  <span>📐</span>
                  <span class="hidden sm:inline">${A(m?"promptModal.graphToggleHide":"promptModal.graphToggleShow")}</span>
                </button>
              `:""}
              <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors" title="${A("promptModal.close")}">
                ✕
              </button>
            </div>
          </div>

          <!-- Scrollable Body -->
          <div class="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 py-3 custom-scrollbar">

            ${k?`
              <!-- Seccion Grafo Visual SVG / HTML -->
              <div id="graph-panel-wrapper" class="bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 transition-all shadow-xs ${m?"block":"hidden"}">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">📐</span>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900">${A("promptModal.graphTitle")}</h4>
                      <p class="text-[11px] text-slate-500">${A("promptModal.graphSubtitle")}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    ${_.length} Capas ➔ 1 Ensamblado
                  </span>
                </div>

                <div class="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5 italic">
                  <span>💡</span>
                  <span>${A("promptModal.clickToInspect")}</span>
                </div>

                <!-- Canvas del Grafo -->
                <div id="prompt-graph-canvas" class="relative rounded-xl p-3 sm:p-4 bg-slate-900/[0.02] border border-slate-200/60 overflow-hidden">
                  
                  <!-- Conectores SVG Dinámicos -->
                  <svg id="prompt-graph-svg" class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                  </svg>

                  <div class="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-center">
                    
                    <!-- Columna Izquierda: Nodos de Entrada Discretos -->
                    <div class="sm:col-span-6 flex flex-col gap-2.5">
                      ${_.map(M=>`
                        <div 
                          data-node-id="${M.id}"
                          data-node-color="${M.accentColor}"
                          class="graph-input-node p-2.5 sm:p-3 rounded-xl border ${M.nodeBorderClass} bg-white shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between group hover:scale-[1.01]"
                          title="Clic para ver detalles de ${M.levelBadge}"
                        >
                          <div class="flex items-center gap-2.5 min-w-0">
                            <span class="text-lg p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors">
                              ${M.icon}
                            </span>
                            <div class="min-w-0">
                              <div class="flex items-center gap-1.5">
                                <span class="text-xs font-bold text-slate-800 truncate">${M.title}</span>
                              </div>
                              <span class="text-[10px] font-medium text-slate-500 truncate block">${M.subtitle}</span>
                            </div>
                          </div>
                          <span class="px-2 py-0.5 rounded-md text-[9px] font-bold ${M.badgeClass} flex-shrink-0 ml-2">
                            ${M.levelBadge}
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
                            <span>Confluencia de ${_.length} capas curriculares</span>
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
                <span class="font-bold text-slate-700 text-xs">${A("promptModal.discreteComponents")}:</span>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0 ml-auto">
                <button id="btn-expand-all" class="text-[11px] font-bold text-brand-700 hover:text-brand-800 hover:underline">
                  ${A("promptModal.expandAll")}
                </button>
                <span class="text-slate-300">|</span>
                <button id="btn-collapse-all" class="text-[11px] font-bold text-slate-500 hover:text-slate-700 hover:underline">
                  ${A("promptModal.collapseAll")}
                </button>
              </div>
            </div>

            <!-- Lista de Acordeón con Contenido Markdown de cada Capa -->
            <div class="space-y-3">
              ${b.map(M=>`
                <div 
                  id="accordion-section-${M.id}"
                  class="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-all duration-200"
                >
                  <!-- Cabecera del Acordeón -->
                  <div 
                    data-toggle-id="${M.id}"
                    class="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${M.isConsolidated?"bg-slate-900 text-white shadow-sm":"bg-slate-100 text-slate-700 border border-slate-200"}">
                        ${M.icon}
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <h4 class="font-bold text-xs sm:text-sm text-slate-900 truncate">${M.title}</h4>
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${M.badgeClass}">
                            ${M.levelBadge}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500 truncate">${M.subtitle}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                      <button 
                        data-copy-id="${M.id}" 
                        class="btn-copy-prompt px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1 shadow-2xs transition-all"
                        title="${A("promptModal.copyPrompt")}"
                      >
                        <span>📋</span>
                        <span class="copy-label hidden sm:inline">${A("promptModal.copyPrompt")}</span>
                      </button>

                      <div 
                        id="chevron-${M.id}" 
                        class="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs transition-transform duration-200 ${M.isOpen?"rotate-180 bg-slate-200 text-slate-800":""}"
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  <!-- Cuerpo Markdown Desplegable -->
                  <div 
                    id="body-${M.id}" 
                    class="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition-all ${M.isOpen?"block":"hidden"}"
                  >
                    ${M.source?`
                      <div class="mb-3 text-[11px] font-mono text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-xl truncate flex items-center gap-2">
                        <span class="font-bold text-slate-600">${A("promptModal.sourceLabel")}</span>
                        <span class="truncate text-slate-700">${M.source}</span>
                      </div>
                    `:""}

                    <div class="leading-relaxed text-xs text-slate-700 space-y-2.5 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto">
                      ${M.formattedHtml}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="pt-3.5 mt-2 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
            <span class="text-[11px] text-slate-500 truncate max-w-[280px] sm:max-w-none">
              ${A(p?"promptModal.footerGraph":"promptModal.footerAudit")}
            </span>
            <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              ${A("promptModal.close")}
            </button>
          </div>

        </div>
      </div>
    `}function q(){if(!k||!m)return;const V=d.querySelector("#prompt-graph-svg"),W=d.querySelector("#prompt-graph-canvas"),X=d.querySelector("#node-consolidated");if(!V||!W||!X)return;const se=V.getBoundingClientRect();if(se.width===0||se.height===0)return;const M=X.getBoundingClientRect(),ne=d.querySelectorAll(".graph-input-node");if(ne.length===0)return;const be=M.left>=ne[0].getBoundingClientRect().right-20;let ve=`
      <defs>
        <marker id="arrow-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
        </marker>
    `;ne.forEach(ie=>{const de=ie.dataset.nodeId,R=ie.dataset.nodeColor||"#6366f1";ve+=`
        <marker id="arrow-${de}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${R}" />
        </marker>
      `}),ve+="</defs>",ne.forEach(ie=>{const de=ie.dataset.nodeId,R=ie.dataset.nodeColor||"#6366f1",Z=ie.getBoundingClientRect();if(be){const Q=Z.right-se.left,ce=Z.top+Z.height/2-se.top,xe=M.left-se.left,he=M.top+M.height/2-se.top,Pe=Math.max(20,xe-Q),Ee=Q+Pe*.45,He=ce,ze=xe-Pe*.45;ve+=`
          <path id="path-${de}" d="M ${Q} ${ce} C ${Ee} ${He}, ${ze} ${he}, ${xe} ${he}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${R}"
            class="transition-all duration-300 connector-path" />
        `}else{const Q=Z.left+Z.width/2-se.left,ce=Z.bottom-se.top,xe=M.left+M.width/2-se.left,he=M.top-se.top,Pe=Math.max(20,he-ce),Ee=Q,He=ce+Pe*.45,ze=xe,rt=he-Pe*.45;ve+=`
          <path id="path-${de}" d="M ${Q} ${ce} C ${Ee} ${He}, ${ze} ${rt}, ${xe} ${he}"
            fill="none" stroke="#cbd5e1" stroke-width="2" marker-end="url(#arrow-default)"
            data-default-stroke="#cbd5e1" data-accent-color="${R}"
            class="transition-all duration-300 connector-path" />
        `}}),V.innerHTML=ve}function j(){b.forEach(V=>{const W=d.querySelector(`#body-${V.id}`),X=d.querySelector(`#chevron-${V.id}`),se=d.querySelector(`[data-jump-to="${V.id}"]`);W&&(V.isOpen?(W.classList.remove("hidden"),W.classList.add("block")):(W.classList.remove("block"),W.classList.add("hidden"))),X&&(V.isOpen?X.classList.add("rotate-180","bg-slate-200","text-slate-800"):X.classList.remove("rotate-180","bg-slate-200","text-slate-800")),se&&(V.isOpen?se.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-900 text-white border-slate-900 shadow-xs":se.className="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200")})}function ee(V){const W=b.find(X=>X.id===V);W&&(W.isOpen=!0,j(),setTimeout(()=>{const X=d.querySelector(`#accordion-section-${V}`);X&&(X.scrollIntoView({behavior:"smooth",block:"nearest"}),X.classList.add("ring-2","ring-brand-500","shadow-md"),setTimeout(()=>{X.classList.remove("ring-2","ring-brand-500","shadow-md")},1500))},40))}function K(){document.removeEventListener("keydown",O),B&&B.disconnect(),s.onClose()}function O(V){V.key==="Escape"&&K()}d.innerHTML=L();let B=null;function ae(){var be,ve,ie,de;document.addEventListener("keydown",O),(be=d.querySelector("#btn-close-prompt-modal"))==null||be.addEventListener("click",K),(ve=d.querySelector("#btn-close-prompt-btn"))==null||ve.addEventListener("click",K);const V=d.querySelector("#prompt-modal-backdrop");V==null||V.addEventListener("click",R=>{R.target===V&&K()});const W=d.querySelector("#btn-toggle-graph");W==null||W.addEventListener("click",()=>{m=!m;const R=d.querySelector("#graph-panel-wrapper");R&&(m?(R.classList.remove("hidden"),R.classList.add("block"),W.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100",requestAnimationFrame(()=>q())):(R.classList.remove("block"),R.classList.add("hidden"),W.className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"))}),(ie=d.querySelector("#btn-expand-all"))==null||ie.addEventListener("click",()=>{b.forEach(R=>R.isOpen=!0),j()}),(de=d.querySelector("#btn-collapse-all"))==null||de.addEventListener("click",()=>{b.forEach(R=>R.isOpen=!1),j()}),d.querySelectorAll("[data-toggle-id]").forEach(R=>{R.addEventListener("click",Z=>{if(Z.target.closest(".btn-copy-prompt"))return;const Q=R.dataset.toggleId,ce=b.find(xe=>xe.id===Q);ce&&(ce.isOpen=!ce.isOpen,j())})}),d.querySelectorAll("[data-jump-to]").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.jumpTo;Z&&ee(Z)})}),d.querySelectorAll(".btn-copy-prompt").forEach(R=>{R.addEventListener("click",async Z=>{Z.stopPropagation();const Q=R,ce=Q.dataset.copyId,xe=b.find(he=>he.id===ce);if(xe)try{await navigator.clipboard.writeText(xe.rawContent);const he=Q.querySelector(".copy-label"),Pe=he?he.textContent:"";he&&(he.textContent=A("promptModal.copied")),Q.classList.remove("text-slate-600","bg-white"),Q.classList.add("text-emerald-700","bg-emerald-50","border-emerald-300"),setTimeout(()=>{he&&(he.textContent=Pe),Q.classList.remove("text-emerald-700","bg-emerald-50","border-emerald-300"),Q.classList.add("text-slate-600","bg-white")},2e3)}catch(he){console.error("Error al copiar al portapapeles:",he)}})});const X=d.querySelectorAll(".graph-input-node"),se=d.querySelector("#node-consolidated"),M=d.querySelector("#prompt-graph-svg");X.forEach(R=>{const Z=R.dataset.nodeId;R.addEventListener("mouseenter",()=>{if(!M)return;const Q=M.querySelector(`#path-${Z}`);Q&&(Q.setAttribute("stroke",Q.dataset.accentColor||"#6366f1"),Q.setAttribute("stroke-width","3.5"),Q.setAttribute("marker-end",`url(#arrow-${Z})`))}),R.addEventListener("mouseleave",()=>{if(!M)return;const Q=M.querySelector(`#path-${Z}`);Q&&(Q.setAttribute("stroke",Q.dataset.defaultStroke||"#cbd5e1"),Q.setAttribute("stroke-width","2"),Q.setAttribute("marker-end","url(#arrow-default)"))}),R.addEventListener("click",()=>{Z&&ee(Z)})}),se&&M&&(se.addEventListener("mouseenter",()=>{M.querySelectorAll(".connector-path").forEach(R=>{R.setAttribute("stroke",R.dataset.accentColor||"#6366f1"),R.setAttribute("stroke-width","3");const Z=R.id.replace("path-","");R.setAttribute("marker-end",`url(#arrow-${Z})`)})}),se.addEventListener("mouseleave",()=>{M.querySelectorAll(".connector-path").forEach(R=>{R.setAttribute("stroke",R.dataset.defaultStroke||"#cbd5e1"),R.setAttribute("stroke-width","2"),R.setAttribute("marker-end","url(#arrow-default)")})}),se.addEventListener("click",()=>{const R=se.dataset.nodeId;R&&ee(R)}));const ne=d.querySelector("#prompt-graph-canvas");ne&&typeof ResizeObserver<"u"&&(B=new ResizeObserver(()=>{requestAnimationFrame(()=>q())}),B.observe(ne))}ae(),requestAnimationFrame(()=>q())}const nt=new Map;let ut=null,kr=!1;function Js(d){return d.includes("Lengua")?"📖":d.includes("Naturales")||d.includes("Ciencias")?"🌿":d.includes("Matemáticas")||d.includes("Mates")?"📐":d.includes("Sociales")||d.includes("Historia")?"🏛️":d.includes("Filosofía")?"🧠":d.includes("Química")?"🧪":d.includes("Tecnología")?"⚙️":d.includes("Tutoría")||d.includes("Lectura")?"📚":"💡"}function Zs(d){return d.includes("Lengua")?"bg-cyan-50 text-cyan-700 border border-cyan-200":d.includes("Naturales")||d.includes("Química")?"bg-emerald-50 text-emerald-700 border border-emerald-200":d.includes("Matemáticas")||d.includes("Mates")?"bg-indigo-50 text-indigo-700 border border-indigo-200":d.includes("Sociales")||d.includes("Historia")||d.includes("Filosofía")?"bg-amber-50 text-amber-800 border border-amber-200":d.includes("Tutoría")||d.includes("Lectura")?"bg-purple-50 text-purple-700 border border-purple-200":"bg-slate-100 text-slate-700 border border-slate-200"}function Xs(d,a){const r=d.subject.includes("Lengua"),i=d.gradeKey==="2batx";let s=`¡Hola! Soy tu tutor socrático en **${d.subject}** (*${d.name}*).

Aquí no te daré soluciones directas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.

`;a?s+=`🎯 **Reto activo:** *${a.title}*
*"${a.sentenceOrCase}"*

¿Por dónde te gustaría empezar a razonarlo?`:s+="¿Qué duda o ejercicio estás abordando ahora mismo?";let p=["No sé cómo empezar el ejercicio","Tengo dudas con el primer paso","Quiero repasar la teoría básica"];return r&&!i?(a==null?void 0:a.order)===2?(s=`¡Hola Marc! Pasamos a la **Variación 1** de sintaxis oracional: 🚂🔄

Fíjate en esta oración: *"Por la mañana sonó ruidosa la alarma en el pasillo"*

Aquí el orden ha cambiado y la oración no empieza por el sujeto. ¿Qué palabra realiza la acción y con cuál concuerda el verbo *sonó*?`,p=['El sujeto es "la alarma", concuerda con "sonó"','¿Por qué "Por la mañana" no es el sujeto?',"¿Qué forma el complemento verbal en bloque?"]):(a==null?void 0:a.order)===3?(s=`¡Excelente avance Marc! Vamos con la **Variación 2** (Transferencia a contexto narrativo): 🎒🌲

Oración: *"Los jóvenes exploradores regresaron cansados al campamento al anochecer"*

¿Quién es el sujeto plural y qué palabras acompañan al verbo *regresaron* explicando cómo y hacia dónde se mueven?`,p=['El sujeto es "Los jóvenes exploradores"','El complemento verbal es "cansados al campamento al anochecer"',"¿Por qué no separamos los tipos de complementos?"]):(s=`¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨

En 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con clasificaciones abstractas.

Por ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`,p=['El sujeto es "El tren" y el verbo "llegó"',"¿Qué palabras forman el complemento verbal?","¿Cómo distingo el sujeto del predicado?"]):r&&i&&((a==null?void 0:a.order)===2?(s=`¡Hola Álvaro! Abordamos la **Variación 1** (Doble predicación sobre el CD - PAU): 🎓⚖️

Oración: *"El tribunal consideró inocente al acusado tras el juicio"*

Aquí el adjetivo *inocente* no se refiere al sujeto (*El tribunal*), sino al CD (*al acusado*). ¿Qué prueba sintáctica formal demuestra la concordancia entre el CD y el Complemento Predicativo?`,p=['Si fuera plural: "consideró inocentes a los acusados"','¿Cómo demuestro que "al acusado" es CD?',"¿Por qué no es una oración atributiva?"]):(a==null?void 0:a.order)===3?(s=`¡Hola Álvaro! Desafío de **Variación 2** (Contraste formal CPred vs CCM): 🎓🔍

Compara estas dos oraciones de examen PAU:
- A: *"El tren llegó puntual a la estación."*
- B: *"El tren llegó puntualmente a la estación."*

¿Qué prueba morfosintáctica demuestra que en A tenemos un CPred y en B un CC de Modo?`,p=['"Puntual" concuerda en plural; "puntualmente" es invariable',"¿Por qué un adjetivo no puede ser CCM según la RAE?",'¿Qué función tiene "a la estación" en ambas?']):(s=`¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚

En este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal y demostrarlo con pruebas formales.

Considera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica demuestra que es un **Complemento Predicativo (CPred)**?`,p=['"Puntual" concuerda con el sujeto en género y número','¿Y qué función sintáctica tiene "a la estación"?',"¿Cómo distingo un CPred de un Atributo?"])),{id:`msg_welcome_${Date.now()}`,role:"tutor",content:s,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:p}}function Tr(d,a){return d.subject.includes("Lengua")?a==="1eso"?{concept:'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?',explanation:'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'}:{concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?',explanation:'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'}:{concept:`¿Cómo definirías la idea clave o causa fundamental de ${d.name}?`,explanation:`Comprender los principios de ${d.name} articulando sus conceptos base: ${d.keyConcepts.join(", ")}.`}}function el(d){var K;const a=$e.getState(),r=((K=a.user)==null?void 0:K.gradeKey)||"1eso",i=a.user,s=qe.getTopicsForGrade(r);async function p(){if(!kr)try{const O=await Ls();for(const B of O)nt.set(B.topicId,B);kr=!0}catch(O){console.warn("[StudyView] Error loading from IndexedDB:",O)}if(s.forEach(O=>{var B;if(!nt.has(O.id)){const ae=qe.getActivitiesForTopic(O.id),Y=Tr(O,r),V={topicId:O.id,status:"pending",selectedActivityId:((B=ae[0])==null?void 0:B.id)||"",messages:[],flashcardConcept:Y.concept,flashcardExplanation:Y.explanation,flashcardRevealed:!1};nt.set(O.id,V)}}),!ut){for(const[O,B]of nt.entries())if(B.status==="active"){ut=O;break}}q()}function u(O){var ae;let B=nt.get(O);if(!B){const Y=s.find(X=>X.id===O)||s[0],V=qe.getActivitiesForTopic(Y.id),W=Tr(Y,r);B={topicId:Y.id,status:"pending",selectedActivityId:((ae=V[0])==null?void 0:ae.id)||"",messages:[],flashcardConcept:W.concept,flashcardExplanation:W.explanation,flashcardRevealed:!1},nt.set(O,B)}return B}async function m(O){for(const[ae,Y]of nt.entries())ae!==O&&Y.status==="active"&&(Y.status="paused",await tt(Y));ut=O;const B=u(O);if(B.status!=="completed"&&(B.status="active"),B.lastActiveAt=new Date().toISOString(),B.messages.length===0){const ae=s.find(Y=>Y.id===O);if(ae){const Y=qe.getActivitiesForTopic(ae.id),V=Y.find(W=>W.id===B.selectedActivityId)||Y[0];B.messages=[Xs(ae,V)]}}await tt(B),q(),requestAnimationFrame(()=>{const ae=d.querySelector(`#task-card-${O}`);ae&&ae.scrollIntoView({behavior:"smooth",block:"start"})})}async function b(O){const B=u(O);B.status==="active"&&(B.status="paused"),ut=null,await tt(B),q()}async function h(O,B){const ae=u(O);ae.selectedActivityId=B,ae.status==="completed"&&(ae.status="active");const Y=s.find(V=>V.id===O);if(Y){const W=qe.getActivitiesForTopic(Y.id).find(X=>X.id===B);if(W){const X={id:`msg_var_${Date.now()}`,role:"tutor",content:`🎯 **Activitat actualitzada a ${W.title}:**
*"${W.sentenceOrCase}"*

¿Por dónde empezamos a analizar esta nueva variación?`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Qué cambia respecto al paso anterior?","Identifiquemos el sujeto y el verbo primero","Dame una pista sobre este reto"]};ae.messages.push(X)}}await tt(ae),q()}async function _(O,B){const ae=u(O),Y=s.find(se=>se.id===O);if(!Y)return;const V={id:`msg_u_${Date.now()}`,role:"student",content:B,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};ae.messages.push(V),ae.lastActiveAt=new Date().toISOString(),await tt(ae),q();const W=d.querySelector(`#btn-send-message-${O}`);W&&(W.innerHTML="<span>⏳</span>");const X=await Lt.generateSocraticResponse(B,Y.subject,Y.id,ae.messages,ae.selectedActivityId);ae.messages.push(X),X.isTaskCompleted&&(ae.status="completed",ae.completedAt=new Date().toISOString(),ae.completionSummary=X.content,await $s(Y.subject,Y.name)),await tt(ae),q()}function k(O){const B=O.role==="tutor";return`
      <div class="flex gap-3 ${B?"items-start":"items-start flex-row-reverse"}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${B?"bg-brand-500 text-white shadow-md shadow-brand-500/25":"bg-slate-800 text-white"}">
          ${B?"🧠":"👤"}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${B?"bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60":"bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10"}">
            <div class="prose prose-sm max-w-none">
              ${L(O.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${B?"pl-1":"justify-end pr-1"}">
            <span>${A(B?"study.tutorRole":"study.userRole")}</span>
            <span>•</span>
            <span>${O.timestamp}</span>
          </div>
        </div>
      </div>
    `}function L(O){const B=O.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>");return Ct(B)}function q(){const O=ut?nt.get(ut):Array.from(nt.values()).find(W=>W.status==="active"),B=O?s.find(W=>W.id===O.topicId):null,ae=d.querySelector("#study-tasks-list"),Y=ae?ae.scrollTop:0;d.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera fija de la vista de Estudio (mantenida fija en la parte superior) -->
        <div id="study-view-header" class="flex-shrink-0 pt-4 pb-3 space-y-3">
          
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-display font-bold text-slate-900">
                  ${A("study.taskListTitle")}
                </h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full ${r==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                  ${(i==null?void 0:i.name)||"Estudiant"} • ${(i==null?void 0:i.gradeLevel)||(r==="2batx"?"2º Batx PAU":"1º de ESO")}
                </span>
                ${B?`<span class="text-xs px-2.5 py-0.5 rounded-full ${(O==null?void 0:O.status)==="completed"?"bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold":"bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold"} flex items-center gap-1.5">
                         <span class="w-1.5 h-1.5 rounded-full ${(O==null?void 0:O.status)==="completed"?"bg-emerald-600":"bg-emerald-500 animate-pulse"}"></span>
                         <span>${(O==null?void 0:O.status)==="completed"?A("study.statusCompleted"):`1 ${A("study.activeBadge")}`}: ${B.subject}</span>
                       </span>`:`<span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                         ${A("study.statusPaused")} / ${A("study.statusPending")}
                       </span>`}
              </div>
              <p class="text-xs text-slate-500 mt-1">${A("study.taskListSubtitle")}</p>
            </div>

            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <span class="text-xs px-3 py-1.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 font-semibold flex items-center gap-1">
                <span>🛡️</span>
                <span>${A("study.safeMode")}</span>
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
                <h3 class="font-display font-bold text-sm sm:text-base">${A("study.bannerTitle")}</h3>
                <p class="text-[11px] sm:text-xs text-white/90">${A("study.bannerGraphDesc")}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3 py-1 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold self-stretch md:self-auto justify-center">
              <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span>${r==="2batx"?"Álvaro Martín (2º Batx PAU)":"Marc Vidal (1º ESO)"}</span>
            </div>
          </div>

        </div>

        <!-- Study Tasks Accordion List: Solo se mueven las pastillas -->
        <div class="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 pb-16 pt-1" id="study-tasks-list">
          ${s.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📚</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${A("study.noTasks")}</p>
              </div>
            `:s.map(W=>j(W)).join("")}
        </div>

      </div>
    `,ee();const V=d.querySelector("#study-tasks-list");V&&Y>0&&(V.scrollTop=Y)}function j(O){const B=u(O.id),ae=qe.getActivitiesForTopic(O.id),Y=ae.find(de=>de.id===B.selectedActivityId)||ae[0],V=B.status==="completed",W=B.status==="paused",X=B.status==="active",se=ut===O.id||ut===null&&X,M=Js(O.subject),ne=Zs(O.subject),be=B.messages.filter(de=>de.role==="student").length,ve=ae.findIndex(de=>de.id===(Y==null?void 0:Y.id)),ie=ve>=0&&ve<ae.length-1?ae[ve+1]:null;return se?`
        <div 
          id="task-card-${O.id}" 
          class="glass-panel p-6 rounded-3xl border-2 ${V?"border-emerald-500/70 bg-white/95 shadow-xl shadow-emerald-500/10":"border-brand-500/70 bg-white/95 shadow-xl shadow-brand-500/10"} glow-card space-y-5 transition-all duration-300"
        >
          <!-- Active Task Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-2xl">${M}</span>
                <h3 class="font-display font-bold text-lg text-slate-900">${O.name}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${ne}">
                  ${O.subject}
                </span>
                ${V?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                         <span>🏆</span>
                         <span>${A("study.statusCompleted")}</span>
                       </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                         <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         <span>${A("study.statusActive")}</span>
                       </span>`}
              </div>
              <p class="text-xs text-slate-600">${O.pedagogicalNote||""}</p>
            </div>

            <!-- Header Controls -->
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button 
                data-pause-topic-id="${O.id}" 
                class="btn-pause-task px-3.5 py-2 rounded-xl ${V?"bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200":"bg-slate-100 hover:bg-slate-200 text-slate-700"} text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${V?"Plegar tarea completada":A("study.btnPause")}"
              >
                <span>${V?"📁":"⏸️"}</span>
                <span>${V?"Plegar":A("study.btnPause")}</span>
              </button>
              <button 
                data-topic-prompt-id="${O.id}" 
                class="btn-view-topic-prompt px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                title="${A("study.tooltipPromptGraph")}"
              >
                <span>🧩</span>
                <span>${A("study.btnPromptGraph")}</span>
              </button>
            </div>
          </div>

          <!-- Pedagogical Foundation Callout (Piaget / LOMLOE Anchor, identical to Tasks view) -->
          ${O.pedagogicalNote?`
            <div class="p-3.5 rounded-2xl ${r==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">🧠</span>
              <div>
                <span class="font-bold block">${A("study.pedagogicalAnchor")}</span>
                <span class="leading-relaxed">${O.pedagogicalNote}</span>
              </div>
            </div>
          `:""}

          <!-- Activities / Variations Stepper (Repetición con Variación) -->
          ${ae.length>0?`
            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>${A("study.activityVariationLabel")}</span>
                </span>
                <span class="text-[11px] text-slate-400 font-mono">Repetición con Variación • ${ae.length} niveles</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${ae.map(de=>{const R=de.id===(Y==null?void 0:Y.id);return`
                    <button 
                      data-topic-id="${O.id}"
                      data-select-activity-id="${de.id}"
                      class="btn-select-activity text-left p-2.5 rounded-xl border text-xs transition-all ${R?"bg-brand-50 border-brand-300 text-brand-900 font-bold shadow-sm ring-1 ring-brand-400/40":"bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] uppercase font-mono font-bold ${R?"text-brand-600":"text-slate-400"}">${A("study.stepPrefix")} ${de.order}</span>
                        ${R?'<span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>':""}
                      </div>
                      <div class="truncate text-xs ${R?"font-bold":"font-medium"}">${de.title}</div>
                    </button>
                  `}).join("")}
              </div>

              ${Y?Qs("Cas Actiu:",Y.sentenceOrCase,Y.variationType):""}
            </div>
          `:""}

          <!-- Socratic Interaction Workspace (2 Columns Grid) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            
            <!-- Socratic Chat Interface (8 cols) -->
            <div class="lg:col-span-8 flex flex-col rounded-2xl border border-slate-200 overflow-hidden h-[620px] bg-slate-50/50">
              
              <!-- Chat Stream -->
              <div id="chat-stream-${O.id}" class="chat-stream flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                ${B.messages.map(de=>k(de)).join("")}
              </div>

              ${V?`
                <!-- Guardrail de Cierre Pedagógico: Banner de Finalización -->
                <div class="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-white border-t border-emerald-200 space-y-3">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-500/20 flex-shrink-0">
                        🎉
                      </div>
                      <div>
                        <h4 class="font-display font-bold text-sm text-emerald-950">${A("study.completionBannerTitle")}</h4>
                        <p class="text-xs text-emerald-800/80 leading-relaxed">${A("study.completionBannerDesc")}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2 flex-wrap self-stretch sm:self-auto justify-end">
                      ${ie?`
                        <button 
                          data-topic-id="${O.id}" 
                          data-next-act-id="${ie.id}" 
                          class="btn-advance-variation px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span>${A("study.btnNextVariation")} (${ie.title})</span>
                          <span>➡️</span>
                        </button>
                      `:""}
                      <button 
                        data-reopen-topic-id="${O.id}" 
                        class="btn-reopen-task px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        title="Volver a abrir el diálogo socrático si te surge una nueva duda"
                      >
                        <span>💬</span>
                        <span>${A("study.btnReopenChat")}</span>
                      </button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between text-[11px] text-emerald-700/80 pt-2 border-t border-emerald-100/80">
                    <span class="flex items-center gap-1.5 font-medium">
                      <span>💾</span>
                      <span>${A("study.indexedDbSavedNotice")}</span>
                    </span>
                    <span class="font-mono text-[10px] text-emerald-600 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                      IndexedDB v2 • Local-First
                    </span>
                  </div>
                </div>
              `:`
                <!-- Quick Socratic Prompts (Chips) -->
                <div class="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
                  <button data-topic-id="${O.id}" data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${A("study.chip1")}
                  </button>
                  <button data-topic-id="${O.id}" data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${A("study.chip2")}
                  </button>
                  <button data-topic-id="${O.id}" data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                    ${A("study.chip3")}
                  </button>
                </div>

                <!-- Chat Input Area -->
                <div class="p-4 bg-white border-t border-slate-200">
                  <form data-topic-id="${O.id}" class="chat-form flex items-center gap-2">
                    <input 
                      type="text" 
                      id="chat-input-${O.id}" 
                      placeholder="${A("study.inputPlaceholder")}" 
                      required
                      class="chat-input flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                    <button 
                      type="submit" 
                      id="btn-send-message-${O.id}"
                      class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>${A("study.send")}</span>
                      <span>➤</span>
                    </button>
                  </form>
                  <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                    <span>${A("study.safeMode")}</span>
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
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${A("study.activeRecall")}</span>
                  <button data-view-recall-topic="${O.id}" class="btn-view-recall-prompt text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    <span>📄</span>
                    <span>${A("study.btnRecallPrompt")}</span>
                  </button>
                </div>

                <div>
                  <h4 class="font-bold text-sm text-slate-900">${A("study.flashcardTitle")}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${A("study.flashcardSubtitle")}</p>
                </div>

                <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                  <span id="flashcard-concept-${O.id}" class="text-xs font-bold text-brand-700 block leading-relaxed">
                    ${Ct(B.flashcardConcept||"¿Cómo definirías el concepto principal de esta tarea?")}
                  </span>
                  
                  <div id="flashcard-answer-${O.id}" class="${B.flashcardRevealed?"":"hidden"} text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                    <p id="flashcard-explanation-${O.id}" class="leading-relaxed">
                      ${Ct(B.flashcardExplanation||"")}
                    </p>
                  </div>

                  <button 
                    data-topic-id="${O.id}"
                    class="btn-toggle-answer w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    ${A("study.toggleHint")}
                  </button>
                </div>

                <!-- AI Card Generator -->
                <button 
                  data-topic-id="${O.id}" 
                  class="btn-generate-card-ai w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>⚡ Generar Nuevo Desafío con IA</span>
                </button>

                <div class="flex items-center justify-between gap-2 pt-1">
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    ${A("study.reviewLater")}
                  </button>
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    ${A("study.mastered")}
                  </button>
                </div>
              </div>

              <!-- Card 2: Conceptos Clave (Línea Base) -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${A("study.baselineConcepts")}</span>
                <ul class="space-y-2 text-xs">
                  ${O.keyConcepts.map((de,R)=>`
                    <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="font-medium text-slate-800">${de}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${R===0?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                        ${A(R===0?"study.consolidated":"study.toStrengthen")}
                      </span>
                    </li>
                  `).join("")}
                </ul>
              </div>

              <!-- Single Active Task Helper Callout -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>ℹ️</span>
                <span>${A("study.activeTaskNote")}</span>
              </div>

            </div>

          </div>

        </div>
      `:`
      <div 
        id="task-card-${O.id}" 
        class="glass-panel p-5 sm:p-6 rounded-3xl border ${V?"border-emerald-300/80 bg-emerald-50/20 shadow-md shadow-emerald-500/5":W?"border-amber-300/80 bg-amber-50/20 shadow-md shadow-amber-500/5":"border-slate-200 hover:border-slate-300 bg-white/70"} glow-card space-y-4 transition-all duration-300"
      >
        <!-- Task Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl">${M}</span>
              <h3 class="font-display font-bold text-base text-slate-900">${O.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${ne}">
                ${O.subject}
              </span>
              ${V?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                       <span>🏆</span>
                       <span>${A("study.statusCompleted")}</span>
                     </span>`:W?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                       <span class="text-xs">⏸️</span>
                       <span>${A("study.statusPaused")}</span>
                     </span>`:`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                       ${A("study.statusPending")}
                     </span>`}
            </div>
            <p class="text-xs text-slate-500">${O.pedagogicalNote||""}</p>
          </div>

          <!-- Actions & Status Info -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            ${V?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-emerald-900">${A("study.interactionsCount",{count:be})}</span>
                <span class="text-[11px] text-emerald-700 font-medium truncate max-w-[150px] block">${(Y==null?void 0:Y.title)||""}</span>
              </div>
            `:W?`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-amber-900">${A("study.interactionsCount",{count:be})}</span>
                <span class="text-[11px] text-amber-700 font-medium truncate max-w-[150px] block">${(Y==null?void 0:Y.title)||""}</span>
              </div>
            `:`
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-slate-700">${A("study.badgeActivities",{count:ae.length})}</span>
                <span class="text-[11px] text-slate-400 font-medium">${A("study.badgeConcepts",{count:O.keyConcepts.length})}</span>
              </div>
            `}

            <button 
              data-topic-prompt-id="${O.id}" 
              class="btn-view-topic-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              title="${A("study.tooltipPromptGraph")}"
            >
              <span>🧩</span>
              <span>${A("study.btnPromptGraph")}</span>
            </button>

            <button 
              data-start-topic-id="${O.id}" 
              class="btn-start-task px-4 py-2 rounded-2xl ${V?"bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20":W?"bg-amber-600 hover:bg-amber-700 shadow-amber-500/20":"bg-brand-600 hover:bg-brand-700 shadow-brand-500/20"} text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${V?"👁️":W?"▶️":"🚀"}</span>
              <span>${A(V?"study.btnReviewConversation":W?"study.btnResume":"study.btnStart")}</span>
            </button>
          </div>
        </div>

        <!-- Task Preview Footer -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Conceptes:</span>
            ${O.keyConcepts.map(de=>`
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80">
                ${de}
              </span>
            `).join("")}
          </div>

          ${V?`
            <span class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${A("study.indexedDbSavedNotice")}</span>
            </span>
          `:W?`
            <span class="text-[11px] text-amber-700/90 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${A("study.pauseNotice")}</span>
            </span>
          `:""}
        </div>
      </div>
    `}function ee(){d.querySelectorAll(".btn-start-task").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.startTopicId;Z&&m(Z)})}),d.querySelectorAll(".btn-pause-task").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.pauseTopicId;Z&&b(Z)})}),d.querySelectorAll(".btn-select-activity").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.topicId,Q=R.dataset.selectActivityId;Z&&Q&&h(Z,Q)})}),d.querySelectorAll(".btn-advance-variation").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.topicId,Q=R.dataset.nextActId;Z&&Q&&h(Z,Q)})}),d.querySelectorAll(".btn-reopen-task").forEach(R=>{R.addEventListener("click",async()=>{const Z=R.dataset.reopenTopicId;if(Z){const Q=u(Z);Q.status="active",await tt(Q),q()}})}),d.querySelectorAll(".btn-view-topic-prompt").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.topicPromptId,Q=s.find(ce=>ce.id===Z);if(Q){const ce=u(Q.id),xe=document.getElementById("modal-root")||document.body,he=qe.assemblePrompt({role:"socratic",gradeKey:r,subject:Q.subject,topicId:Q.id,activityId:ce.selectedActivityId});Xt(xe,A("study.modalSocraticTitle"),he.systemInstruction,{assembledPrompt:he,subtitle:A("study.modalSocraticSubtitle",{subject:Q.subject,topic:Q.name}),onClose:()=>{xe.innerHTML=""}})}})}),d.querySelectorAll(".btn-view-recall-prompt").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.viewRecallTopic,Q=s.find(he=>he.id===Z)||s[0],ce=document.getElementById("modal-root")||document.body,xe=qe.assemblePrompt({role:"recall",gradeKey:r,subject:Q.subject,topicId:Q.id});Xt(ce,"Prompt Estático: Generador de Active Recall (active_recall_generator.md)",Po.recall,{assembledPrompt:xe,subtitle:"Prompt Transversal de Sección (Generación de Flashcards Conceptuales)",onClose:()=>{ce.innerHTML=""}})})}),d.querySelectorAll(".btn-toggle-answer").forEach(R=>{R.addEventListener("click",async()=>{const Z=R.dataset.topicId;if(Z){const Q=u(Z);Q.flashcardRevealed=!Q.flashcardRevealed;const ce=d.querySelector(`#flashcard-answer-${Z}`);ce==null||ce.classList.toggle("hidden",!Q.flashcardRevealed),await tt(Q)}})}),d.querySelectorAll(".btn-generate-card-ai").forEach(R=>{R.addEventListener("click",async()=>{const Z=R.dataset.topicId,Q=s.find(ce=>ce.id===Z);if(Q){R.innerHTML="<span>⏳ Generando desafío...</span>";try{const ce=await Lt.generateActiveRecallCard(Q.subject,Q.name),xe=u(Q.id);xe.flashcardConcept=ce.concept,xe.flashcardExplanation=ce.explanation,xe.flashcardRevealed=!1,await tt(xe);const he=d.querySelector(`#flashcard-concept-${Q.id}`),Pe=d.querySelector(`#flashcard-explanation-${Q.id}`),Ee=d.querySelector(`#flashcard-answer-${Q.id}`);he&&(he.innerHTML=Ct(ce.concept)),Pe&&(Pe.innerHTML=Ct(ce.explanation)),Ee==null||Ee.classList.add("hidden")}catch(ce){alert(ce.message||"Error al generar tarjeta con IA")}finally{R.innerHTML="<span>⚡ Generar Nuevo Desafío con IA</span>"}}})}),d.querySelectorAll(".chip-btn").forEach(R=>{R.addEventListener("click",()=>{const Z=R.dataset.topicId,Q=R.dataset.prompt;Z&&Q&&_(Z,Q)})}),d.querySelectorAll(".chat-form").forEach(R=>{R.addEventListener("submit",Z=>{Z.preventDefault();const Q=R.dataset.topicId;if(Q){const ce=d.querySelector(`#chat-input-${Q}`);if(ce&&ce.value.trim()){const xe=ce.value.trim();ce.value="",_(Q,xe)}}})}),d.querySelectorAll(".chat-stream").forEach(R=>{R.scrollTo({top:R.scrollHeight,behavior:"smooth"})});const ie=d.querySelector("#study-view-header"),de=d.querySelector("#study-tasks-list");ie&&de&&ie.addEventListener("wheel",R=>{const Z=R;de.scrollTop+=Z.deltaY},{passive:!0})}p()}class tl{async getAvailableFiles(){var h;const a=$e.getState();if(!a.isAuthenticated||!a.scopes.drive)throw new Error("Debes conectar tu cuenta de Google con acceso a Google Drive");if(a.mode==="demo")return[{fileId:"drv_demo_01",name:"Ensayo_Energia_Sostenible_Borrador.gdoc",mimeType:"application/vnd.google-apps.document",webViewLink:"https://docs.google.com/document",lastModified:"Hoy, 10:30"},{fileId:"drv_demo_02",name:"Presentacion_Historia_Siglo_XX.gslides",mimeType:"application/vnd.google-apps.presentation",webViewLink:"https://docs.google.com/presentation",lastModified:"Ayer"},{fileId:"drv_demo_03",name:"Apuntes_Biologia_Genetica.pdf",mimeType:"application/pdf",webViewLink:"https://drive.google.com",lastModified:"Hace 3 días"},{fileId:"drv_demo_04",name:"Datos_Graficos_Matematicas.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",webViewLink:"https://docs.google.com/spreadsheets",lastModified:"Hace 1 semana"}];const r=$e.getAccessToken();if(!r)throw new Error("El token de sesión de Google ha caducado. Vuelve a iniciar sesión.");const i=encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')"),s=encodeURIComponent("files(id,name,mimeType,webViewLink,iconLink,modifiedTime)"),p=`https://www.googleapis.com/drive/v3/files?pageSize=25&q=${i}&fields=${s}&orderBy=modifiedTime desc`,u=await fetch(p,{headers:{Authorization:`Bearer ${r}`}});if(!u.ok){const _=await u.json().catch(()=>({}));throw new Error(`Error de Google Drive API (${u.status}): ${((h=_.error)==null?void 0:h.message)||u.statusText}`)}return((await u.json()).files||[]).map(_=>({fileId:_.id,name:_.name,mimeType:_.mimeType,iconUrl:_.iconLink,webViewLink:_.webViewLink||`https://drive.google.com/open?id=${_.id}`,lastModified:_.modifiedTime?new Date(_.modifiedTime).toLocaleDateString():"Drive Sync"}))}}const al=new tl;function nl(d){async function a(){await Rs();const u=await we.projectTasks.toArray();r(u)}function r(u){var V,W,X,se;const b=$e.getState().user,h=(b==null?void 0:b.gradeKey)||"1eso",_=u.filter(M=>!M.gradeKey||M.gradeKey===h||M.gradeKey==="both"),k=d.querySelector("#tasks-list"),L=k?k.scrollTop:0;d.innerHTML=`
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera fija de la vista de Trabajos (mantenida fija en la parte superior) -->
        <div id="tasks-view-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-display font-bold text-slate-900">
                  ${A("tasks.title")}
                </h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full ${h==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                  ${(b==null?void 0:b.name)||"Estudiante"} • ${(b==null?void 0:b.gradeLevel)||"1º de ESO"}
                </span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${A("tasks.driveIntegration")}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">${A("tasks.subtitle")}</p>
            </div>

            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <button id="btn-view-project-prompt" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${A("tasks.tooltipPromptProject")}">
                <span>📄</span>
                <span>${A("tasks.btnPromptProject")}</span>
              </button>
              <button id="btn-view-project-curricular" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${A("tasks.tooltipCurricularDirective")}">
                <span>🏛️</span>
                <span>${A("tasks.btnCurricularDirective")}</span>
              </button>
              <button id="btn-new-task" class="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
                <span>＋</span>
                <span>${A("tasks.newTask")}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Task Deliverables List: Solo se mueven las pastillas -->
        <div class="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1 pb-16 pt-1" id="tasks-list">
          ${_.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${A("tasks.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${A("tasks.emptyDesc")}</p>
              </div>
            `:_.map(M=>`
              <div class="glass-panel p-6 rounded-3xl border ${M.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":M.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-5">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${M.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${M.subject}
                      </span>
                      ${M.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ${A("tasks.grade1esoBadge")}
                            </span>`:M.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                              ${A("tasks.grade2batxBadge")}
                            </span>`:""}
                    </div>
                    <p class="text-xs text-slate-600 mt-1">${M.notes}</p>
                  </div>

                  <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">${A("tasks.dueDate")}: ${M.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">${A("tasks.autonomy")}: ${i(M)}%</span>
                    </div>
                    <button 
                      data-task-prompt-id="${M.id}" 
                      class="btn-view-task-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      title="${A("tasks.tooltipViewTaskPrompt",{title:M.title})}"
                    >
                      <span>🧩</span>
                      <span>${A("tasks.btnViewTaskPrompt")}</span>
                    </button>
                  </div>
                </div>

                ${M.pedagogicalNote?`
                  <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
                  <div class="p-3.5 rounded-2xl ${M.gradeKey==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
                    <span class="text-base flex-shrink-0">🧠</span>
                    <div>
                      <span class="font-bold block">${A("tasks.pedagogicalFoundation")}</span>
                      <span class="leading-relaxed">${M.pedagogicalNote}</span>
                    </div>
                  </div>
                `:""}

                <!-- 4-Phases Progression Stepper -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${A("tasks.phasesTitle")}</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${s(M.id,"planning",A("tasks.phases.planning"),M.currentPhase)}
                    ${s(M.id,"research",A("tasks.phases.research"),M.currentPhase)}
                    ${s(M.id,"writing",A("tasks.phases.writing"),M.currentPhase)}
                    ${s(M.id,"review",A("tasks.phases.review"),M.currentPhase)}
                  </div>
                </div>

                <!-- Google Drive Resources & Autonomy Checklist Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                  
                  <!-- Left: Google Drive Attached Files -->
                  <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">📁</span>
                        <h4 class="font-bold text-xs text-slate-800">${A("tasks.driveDocs")}</h4>
                      </div>
                      <button data-task-drive="${M.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>${A("tasks.attachDrive")}</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      ${M.driveFiles.length===0?`<p class="text-xs text-slate-400 py-2">${A("tasks.noDriveFiles")}</p>`:M.driveFiles.map(ne=>`
                          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                            <div class="flex items-center gap-2 overflow-hidden">
                              <span class="text-base flex-shrink-0">${p(ne.mimeType)}</span>
                              <div class="truncate">
                                <a href="${ne.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${ne.name}</a>
                                <span class="text-[10px] text-slate-400 font-mono">${ne.lastModified||"Sincronizado"}</span>
                              </div>
                            </div>
                            <a href="${ne.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                              ${A("tasks.driveSync")} ↗
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
                        <h4 class="font-bold text-xs text-brand-900">${A("tasks.autonomyMeter")}</h4>
                      </div>
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                        ${i(M)}% ${A("tasks.ownEffort")}
                      </span>
                    </div>

                    <div class="space-y-2">
                      ${M.criteria.map(ne=>`
                        <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                          <input 
                            type="checkbox" 
                            data-task-id="${M.id}" 
                            data-crit-id="${ne.id}" 
                            class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                            ${ne.checked?"checked":""} 
                          />
                          <div>
                            <span class="font-semibold text-slate-800 block ${ne.checked?"line-through text-slate-400":""}">${ne.label}</span>
                            <span class="text-[11px] text-slate-500">${ne.explanation}</span>
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
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${A("tasks.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${A("tasks.modalSubtitle")}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${A("tasks.fieldTitle")}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${A("tasks.fieldSubject")}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${A("tasks.fieldDue")}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now()+864e5*10).toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${A("tasks.fieldNotes")}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${A("tasks.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${A("tasks.create")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,d.querySelectorAll(".crit-checkbox").forEach(M=>{M.addEventListener("change",async()=>{const ne=Number(M.dataset.taskId),be=M.dataset.critId,ve=u.find(ie=>ie.id===ne);if(ve){const ie=ve.criteria.find(de=>de.id===be);ie&&(ie.checked=M.checked,ve.autonomyScore=i(ve),await we.projectTasks.update(ne,{criteria:ve.criteria,autonomyScore:ve.autonomyScore}),a())}})}),d.querySelectorAll(".phase-badge-btn").forEach(M=>{M.addEventListener("click",async()=>{const ne=Number(M.dataset.taskId),be=M.dataset.phase;await we.projectTasks.update(ne,{currentPhase:be}),a()})}),d.querySelectorAll(".btn-attach-drive").forEach(M=>{M.addEventListener("click",async()=>{const ne=Number(M.dataset.taskDrive);try{const be=await al.getAvailableFiles(),ve=u.find(ie=>ie.id===ne);if(ve&&be.length>0){const ie=be.find(R=>!ve.driveFiles.some(Z=>Z.fileId===R.fileId))||be[0],de=[...ve.driveFiles,ie];await we.projectTasks.update(ne,{driveFiles:de}),a()}}catch(be){alert(be.message||"Error al conectar con Google Drive")}})});const K=d.querySelector("#new-task-modal");(V=d.querySelector("#btn-new-task"))==null||V.addEventListener("click",()=>{K==null||K.classList.remove("hidden")}),(W=d.querySelector("#btn-cancel-nt"))==null||W.addEventListener("click",()=>{K==null||K.classList.add("hidden")}),d.querySelectorAll(".btn-view-task-prompt").forEach(M=>{M.addEventListener("click",()=>{const ne=Number(M.dataset.taskPromptId),be=u.find(Q=>Q.id===ne);if(!be)return;const ve=be.gradeKey==="2batx"||be.gradeKey==="1eso"?be.gradeKey:h,ie=be.topicId?qe.findTopicById(be.topicId):qe.findTopicBySubjectOrKeyword(be.subject,ve,be.title),de=be.activityId?qe.findActivityById(be.activityId):ie?qe.getActivitiesForTopic(ie.id)[0]:void 0,R=qe.assemblePrompt({role:"project",gradeKey:ve,subject:be.subject,topicId:ie==null?void 0:ie.id,activityId:de==null?void 0:de.id}),Z=document.getElementById("modal-root")||document.body;Xt(Z,A("tasks.modalTaskPromptTitle",{title:be.title}),R.systemInstruction,{assembledPrompt:R,subtitle:A("tasks.modalTaskPromptSubtitle",{subject:be.subject}),onClose:()=>{Z.innerHTML=""}})})}),(X=d.querySelector("#btn-view-project-prompt"))==null||X.addEventListener("click",()=>{const M=document.getElementById("modal-root")||document.body,ne=qe.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});Xt(M,A("tasks.modalProjectTitle"),ne.systemInstruction,{assembledPrompt:ne,subtitle:A("tasks.modalProjectSubtitle"),onClose:()=>{M.innerHTML=""}})}),(se=d.querySelector("#btn-view-project-curricular"))==null||se.addEventListener("click",async()=>{const M=document.getElementById("modal-root")||document.body,ne=qe.assemblePrompt({role:"project",gradeKey:h,subject:"Lengua Castellana y Literatura"});Xt(M,ne.layers.level2BaseTopic.title,ne.layers.level2BaseTopic.content,{assembledPrompt:ne,subtitle:A("agenda.modalCurricularSubtitle",{grade:h==="2batx"?"2º Bachillerato":"1º de ESO"}),institution:"Departament d'Educació de la Generalitat de Catalunya (Esfer@)",sourceApi:`https://api.educacio.gencat.cat/v1/curriculum/guardrails?grade=${h}`,gradeLevel:h==="2batx"?"2º de Bachillerato":"1º de ESO",onClose:()=>{M.innerHTML=""}})});const O=d.querySelector("#new-task-form");O==null||O.addEventListener("submit",async M=>{M.preventDefault();const ne=d.querySelector("#nt-title").value,be=d.querySelector("#nt-subject").value,ve=d.querySelector("#nt-due").value,ie=d.querySelector("#nt-notes").value;await we.projectTasks.add({title:ne,subject:be,gradeKey:h,dueDate:ve,currentPhase:"planning",autonomyScore:25,notes:ie,driveFiles:[{fileId:`drive_${Date.now()}`,name:`${ne.replace(/\s+/g,"_")}_Borrador.gdoc`,mimeType:"application/vnd.google-apps.document",lastModified:"Recién creado"}],criteria:[{id:"c1",label:"Formulación y alcance del proyecto con mis palabras",checked:!0,explanation:"Definido el objetivo inicial de manera autónoma."},{id:"c2",label:"Búsqueda activa y contraste de fuentes fiables",checked:!1,explanation:"Seleccionar fuentes antes de escribir."},{id:"c3",label:"Redacción propia evitando generación automática por IA",checked:!1,explanation:"El texto debe ser fruto de la reflexión del estudiante."},{id:"c4",label:"Revisión crítica de estructura y conclusiones",checked:!1,explanation:"Validar que las conclusiones responden a la hipótesis."}]}),K==null||K.classList.add("hidden"),a()});const B=d.querySelector("#tasks-view-header"),ae=d.querySelector("#tasks-list");B&&ae&&B.addEventListener("wheel",M=>{const ne=M;ae.scrollTop+=ne.deltaY},{passive:!0});const Y=d.querySelector("#tasks-list");Y&&L>0&&(Y.scrollTop=L)}function i(u){if(!u.criteria||u.criteria.length===0)return 100;const m=u.criteria.filter(b=>b.checked).length;return Math.round(m/u.criteria.length*100)}function s(u,m,b,h){return`
      <button 
        data-task-id="${u}" 
        data-phase="${m}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${h===m?"bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20":"bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}"
      >
        ${b}
      </button>
    `}function p(u){return u.includes("document")?"📄":u.includes("presentation")||u.includes("slides")?"📊":u.includes("spreadsheet")||u.includes("sheet")?"📈":"📑"}a()}class rl{constructor(){Ie(this,"activeTab","study");Ie(this,"navbarRoot");Ie(this,"tabsRoot");Ie(this,"viewContainer");Ie(this,"modalRoot");Ie(this,"isReady",!1);this.navbarRoot=document.getElementById("navbar-root"),this.tabsRoot=document.getElementById("tabs-root"),this.viewContainer=document.getElementById("app-view-container"),this.modalRoot=document.getElementById("modal-root")}async start(){await ta.init(),await js(),await Pn.register(),ta.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),$e.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),this.renderHeaderAndTabs(),this.switchView(this.activeTab),this.isReady=!0;const a=document.getElementById("app-top-header");a&&a.addEventListener("wheel",r=>{const i=document.querySelector("#study-tasks-list, #tasks-list");i&&(i.scrollTop+=r.deltaY)},{passive:!0})}renderHeaderAndTabs(){Vs(this.navbarRoot,{onOpenAISettings:()=>this.openAISettingsModal(),onOpenAuth:()=>this.openAuthModal(),onLanguageChange:()=>{}}),Hs(this.tabsRoot,this.activeTab,{onTabChange:a=>{this.activeTab=a,this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}switchView(a){switch(this.viewContainer.innerHTML="",a){case"study":el(this.viewContainer);break;case"tasks":nl(this.viewContainer);break}}openAISettingsModal(){Us(this.modalRoot,{onSaved:()=>{this.modalRoot.innerHTML="",this.renderHeaderAndTabs()},onClose:()=>{this.modalRoot.innerHTML=""}})}openAuthModal(){Sn(this.modalRoot,{onClose:()=>{this.modalRoot.innerHTML=""},onStateChanged:()=>{this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}}document.addEventListener("DOMContentLoaded",()=>{new rl().start().catch(a=>{console.error("[Anaxagoras AI] Error al inicializar la aplicación:",a)})});
//# sourceMappingURL=index-Dhvra_gW.js.map
