var to=Object.defineProperty;var ao=(f,a,o)=>a in f?to(f,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):f[a]=o;var ke=(f,a,o)=>ao(f,typeof a!="symbol"?a+"":a,o);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function o(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(l){if(l.ep)return;l.ep=!0;const d=o(l);fetch(l.href,d)}})();const ae=f=>typeof f=="string",Ft=()=>{let f,a;const o=new Promise((s,l)=>{f=s,a=l});return o.resolve=f,o.reject=a,o},fn=f=>f==null?"":String(f),no=(f,a,o)=>{f.forEach(s=>{a[s]&&(o[s]=a[s])})},ro=/###/g,ar=f=>f&&f.includes("###")?f.replace(ro,"."):f,nr=f=>!f||ae(f),Gt=(f,a,o)=>{const s=ae(a)?a.split("."):a;let l=0;for(;l<s.length-1;){if(nr(f))return{};const d=ar(s[l]);!f[d]&&o&&(f[d]=new o),Object.prototype.hasOwnProperty.call(f,d)?f=f[d]:f={},++l}return nr(f)?{}:{obj:f,k:ar(s[l])}},rr=(f,a,o)=>{const{obj:s,k:l}=Gt(f,a,Object);if(s!==void 0||a.length===1){s[l]=o;return}let d=a[a.length-1],u=a.slice(0,a.length-1),g=Gt(f,u,Object);for(;g.obj===void 0&&u.length;)d=`${u[u.length-1]}.${d}`,u=u.slice(0,u.length-1),g=Gt(f,u,Object),g!=null&&g.obj&&typeof g.obj[`${g.k}.${d}`]<"u"&&(g.obj=void 0);g.obj[`${g.k}.${d}`]=o},oo=(f,a,o,s)=>{const{obj:l,k:d}=Gt(f,a,Object);l[d]=l[d]||[],l[d].push(o)},Aa=(f,a)=>{const{obj:o,k:s}=Gt(f,a);if(o&&Object.prototype.hasOwnProperty.call(o,s))return o[s]},so=(f,a,o)=>{const s=Aa(f,o);return s!==void 0?s:Aa(a,o)},yr=(f,a,o)=>{for(const s in a)s!=="__proto__"&&s!=="constructor"&&(Object.prototype.hasOwnProperty.call(f,s)?ae(f[s])||f[s]instanceof String||ae(a[s])||a[s]instanceof String?o&&(f[s]=a[s]):yr(f[s],a[s],o):f[s]=a[s]);return f},Je=f=>f.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),io={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},lo=f=>ae(f)?f.replace(/[&<>"'\/]/g,a=>io[a]):f;class co{constructor(a){this.capacity=a,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(a){const o=this.regExpMap.get(a);if(o!==void 0)return o;const s=new RegExp(a);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(a,s),this.regExpQueue.push(a),s}}const uo=[" ",",","?","!",";"],po=new co(20),fo=(f,a,o)=>{a=a||"",o=o||"";const s=uo.filter(u=>!a.includes(u)&&!o.includes(u));if(s.length===0)return!0;const l=po.getRegExp(`(${s.map(u=>u==="?"?"\\?":u).join("|")})`);let d=!l.test(f);if(!d){const u=f.indexOf(o);u>0&&!l.test(f.substring(0,u))&&(d=!0)}return d},hn=(f,a,o=".")=>{if(!f)return;if(f[a])return Object.prototype.hasOwnProperty.call(f,a)?f[a]:void 0;const s=a.split(o);let l=f;for(let d=0;d<s.length;){if(!l||typeof l!="object")return;let u,g="";for(let h=d;h<s.length;++h)if(h!==d&&(g+=o),g+=s[h],u=l[g],u!==void 0){if(["string","number","boolean"].includes(typeof u)&&h<s.length-1)continue;d+=h-d+1;break}l=u}return l},Vt=f=>f==null?void 0:f.replace(/_/g,"-"),mo={type:"logger",log(f){this.output("log",f)},warn(f){this.output("warn",f)},error(f){this.output("error",f)},output(f,a){var o,s;(s=(o=console==null?void 0:console[f])==null?void 0:o.apply)==null||s.call(o,console,a)}};class Ea{constructor(a,o={}){this.init(a,o)}init(a,o={}){this.prefix=o.prefix||"i18next:",this.logger=a||mo,this.options=o,this.debug=o.debug}log(...a){return this.forward(a,"log","",!0)}warn(...a){return this.forward(a,"warn","",!0)}error(...a){return this.forward(a,"error","")}deprecate(...a){return this.forward(a,"warn","WARNING DEPRECATED: ",!0)}forward(a,o,s,l){return l&&!this.debug?null:(a=a.map(d=>ae(d)?d.replace(/[\r\n\x00-\x1F\x7F]/g," "):d),ae(a[0])&&(a[0]=`${s}${this.prefix} ${a[0]}`),this.logger[o](a))}create(a){return new Ea(this.logger,{prefix:`${this.prefix}:${a}:`,...this.options})}clone(a){return a=a||this.options,a.prefix=a.prefix||this.prefix,new Ea(this.logger,a)}}var He=new Ea;class Da{constructor(){this.observers={}}on(a,o){return a.split(" ").forEach(s=>{this.observers[s]||(this.observers[s]=new Map);const l=this.observers[s].get(o)||0;this.observers[s].set(o,l+1)}),this}off(a,o){if(this.observers[a]){if(!o){delete this.observers[a];return}this.observers[a].delete(o)}}once(a,o){const s=(...l)=>{o(...l),this.off(a,s)};return this.on(a,s),this}emit(a,...o){this.observers[a]&&Array.from(this.observers[a].entries()).forEach(([l,d])=>{for(let u=0;u<d;u++)l(...o)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([l,d])=>{for(let u=0;u<d;u++)l(a,...o)})}}const or=new WeakSet;class sr extends Da{constructor(a,o={ns:["translation"],defaultNS:"translation"}){super(),this.data=a||{},this.options=o,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(a){this.options.ns.includes(a)||this.options.ns.push(a)}removeNamespaces(a){const o=this.options.ns.indexOf(a);o>-1&&this.options.ns.splice(o,1)}getResource(a,o,s,l={}){var b,k;const d=l.keySeparator!==void 0?l.keySeparator:this.options.keySeparator,u=l.ignoreJSONStructure!==void 0?l.ignoreJSONStructure:this.options.ignoreJSONStructure;let g;a.includes(".")?g=a.split("."):(g=[a,o],s&&(Array.isArray(s)?g.push(...s):ae(s)&&d?g.push(...s.split(d)):g.push(s)));const h=Aa(this.data,g);return!h&&!o&&!s&&a.includes(".")&&(a=g[0],o=g[1],s=g.slice(2).join(".")),h||!u||!ae(s)?h:hn((k=(b=this.data)==null?void 0:b[a])==null?void 0:k[o],s,d)}addResource(a,o,s,l,d={silent:!1}){const u=d.keySeparator!==void 0?d.keySeparator:this.options.keySeparator;let g=[a,o];s&&(g=g.concat(u?s.split(u):s)),a.includes(".")&&(g=a.split("."),l=o,o=g[1]),this.addNamespaces(o),rr(this.data,g,l),d.silent||this.emit("added",a,o,s,l)}addResources(a,o,s,l={silent:!1}){for(const d in s)(ae(s[d])||Array.isArray(s[d]))&&this.addResource(a,o,d,s[d],{silent:!0});l.silent||this.emit("added",a,o,s)}addResourceBundle(a,o,s,l,d,u={silent:!1,skipCopy:!1}){let g=[a,o];a.includes(".")&&(g=a.split("."),l=s,s=o,o=g[1]),this.addNamespaces(o);let h=Aa(this.data,g)||{};u.skipCopy||(s=JSON.parse(JSON.stringify(s))),l?yr(h,s,d):h={...h,...s},rr(this.data,g,h),u.silent||this.emit("added",a,o,s)}removeResourceBundle(a,o){this.hasResourceBundle(a,o)&&delete this.data[a][o],this.removeNamespaces(o),this.emit("removed",a,o)}hasResourceBundle(a,o){return this.getResource(a,o)!==void 0}getResourceBundle(a,o){return o||(o=this.options.defaultNS),this.getResource(a,o)}getDataByLanguage(a){return this.data[a]}hasLanguageSomeTranslations(a){const o=this.getDataByLanguage(a);return!!(o&&Object.keys(o)||[]).find(l=>{const d=o[l];return or.has(d)?!0:!d||Object.keys(d).length===0?!1:(typeof d=="object"&&or.add(d),!0)})}toJSON(){return this.data}}var xr={processors:{},addPostProcessor(f){this.processors[f.name]=f},handle(f,a,o,s,l){return f.forEach(d=>{var u;a=((u=this.processors[d])==null?void 0:u.process(a,o,s,l))??a}),a}};const wr=Symbol("i18next/PATH_KEY");function go(){const f=[],a=Object.create(null);let o;return a.get=(s,l)=>{var d;return(d=o==null?void 0:o.revoke)==null||d.call(o),l===wr?f:(f.push(l),o=Proxy.revocable(s,a),o.proxy)},Proxy.revocable(Object.create(null),a).proxy}function Pt(f,a){const{[wr]:o}=f(go()),s=(a==null?void 0:a.keySeparator)??".",l=(a==null?void 0:a.nsSeparator)??":",d=(a==null?void 0:a.enableSelector)==="strict";if(o.length>1&&l){const u=a==null?void 0:a.ns,g=d?Array.isArray(u)?u:u?[u]:null:Array.isArray(u)?u:null;if(g&&(d?g:g.length>1?g.slice(1):[]).includes(o[0]))return`${o[0]}${l}${o.slice(1).join(s)}`}return o.join(s)}const mn=f=>!ae(f)&&typeof f!="boolean"&&typeof f!="number";class Pa extends Da{constructor(a,o={}){super(),no(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],a,this),this.options=o,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=He.create("translator"),this.checkedLoadedFor={}}changeLanguage(a){a&&(this.language=a)}exists(a,o={interpolation:{}}){const s={...o};if(a==null)return!1;const l=this.resolve(a,s);if((l==null?void 0:l.res)===void 0)return!1;const d=mn(l.res);return!(s.returnObjects===!1&&d)}extractFromKey(a,o){let s=o.nsSeparator!==void 0?o.nsSeparator:this.options.nsSeparator;s===void 0&&(s=":");const l=o.keySeparator!==void 0?o.keySeparator:this.options.keySeparator;let d=o.ns||this.options.defaultNS||[];const u=s&&a.includes(s),g=!this.options.userDefinedKeySeparator&&!o.keySeparator&&!this.options.userDefinedNsSeparator&&!o.nsSeparator&&!fo(a,s,l);if(u&&!g){const h=a.match(this.interpolator.nestingRegexp);if(h&&h.length>0)return{key:a,namespaces:ae(d)?[d]:d};const b=a.split(s);(s!==l||s===l&&this.options.ns.includes(b[0]))&&(d=b.shift()),a=b.join(l)}return{key:a,namespaces:ae(d)?[d]:d}}translate(a,o,s){let l=typeof o=="object"?{...o}:o;if(typeof l!="object"&&this.options.overloadTranslationOptionHandler&&(l=this.options.overloadTranslationOptionHandler(arguments)),typeof l=="object"&&(l={...l}),l||(l={}),a==null)return"";typeof a=="function"&&(a=Pt(a,{...this.options,...l})),Array.isArray(a)||(a=[String(a)]),a=a.map(me=>typeof me=="function"?Pt(me,{...this.options,...l}):String(me));const d=l.returnDetails!==void 0?l.returnDetails:this.options.returnDetails,u=l.keySeparator!==void 0?l.keySeparator:this.options.keySeparator,{key:g,namespaces:h}=this.extractFromKey(a[a.length-1],l),b=h[h.length-1];let k=l.nsSeparator!==void 0?l.nsSeparator:this.options.nsSeparator;k===void 0&&(k=":");const P=l.lng||this.language,$=l.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((P==null?void 0:P.toLowerCase())==="cimode")return $?d?{res:`${b}${k}${g}`,usedKey:g,exactUsedKey:g,usedLng:P,usedNS:b,usedParams:this.getUsedParamsDetails(l)}:`${b}${k}${g}`:d?{res:g,usedKey:g,exactUsedKey:g,usedLng:P,usedNS:b,usedParams:this.getUsedParamsDetails(l)}:g;const O=this.resolve(a,l);let I=O==null?void 0:O.res;const V=(O==null?void 0:O.usedKey)||g,G=(O==null?void 0:O.exactUsedKey)||g,Q=["[object Number]","[object Function]","[object RegExp]"],oe=l.joinArrays!==void 0?l.joinArrays:this.options.joinArrays,ge=!this.i18nFormat||this.i18nFormat.handleAsObject,F=l.count!==void 0&&!ae(l.count),z=Pa.hasDefaultValue(l),X=F?this.pluralResolver.getSuffix(P,l.count,l):"",te=l.ordinal&&F?this.pluralResolver.getSuffix(P,l.count,{ordinal:!1}):"",fe=F&&!l.ordinal&&l.count===0,H=fe&&l[`defaultValue${this.options.pluralSeparator}zero`]||l[`defaultValue${X}`]||l[`defaultValue${te}`]||l.defaultValue;let W=I;ge&&!I&&z&&(W=H);const le=mn(W),ve=Object.prototype.toString.apply(W);if(ge&&W&&le&&!Q.includes(ve)&&!(ae(oe)&&Array.isArray(W))){if(!l.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const me=this.options.returnedObjectHandler?this.options.returnedObjectHandler(V,W,{...l,ns:h}):`key '${g} (${this.language})' returned an object instead of string.`;return d?(O.res=me,O.usedParams=this.getUsedParamsDetails(l),O):me}if(u){const me=Array.isArray(W),je=me?[]:{},Xe=me?G:V;for(const Ie in W)if(Object.prototype.hasOwnProperty.call(W,Ie)){const qe=`${Xe}${u}${Ie}`;z&&!I?je[Ie]=this.translate(qe,{...l,defaultValue:mn(H)?H[Ie]:void 0,joinArrays:!1,ns:h}):je[Ie]=this.translate(qe,{...l,joinArrays:!1,ns:h}),je[Ie]===qe&&(je[Ie]=W[Ie])}I=je}}else if(ge&&ae(oe)&&Array.isArray(I))I=I.join(oe),I&&(I=this.extendTranslation(I,a,l,s));else{let me=!1,je=!1;!this.isValidLookup(I)&&z&&(me=!0,I=H),this.isValidLookup(I)||(je=!0,I=g);const Ie=(l.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&je?void 0:I,qe=z&&H!==I&&this.options.updateMissing;if(je||me||qe){if(this.logger.log(qe?"updateKey":"missingKey",P,b,F&&!qe?`${g}${this.pluralResolver.getSuffix(P,l.count,l)}`:g,qe?H:I),u){const Pe=this.resolve(g,{...l,keySeparator:!1});Pe&&Pe.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let Oe=[];const Ne=this.languageUtils.getFallbackCodes(this.options.fallbackLng,l.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Ne&&Ne[0])for(let Pe=0;Pe<Ne.length;Pe++)Oe.push(Ne[Pe]);else this.options.saveMissingTo==="all"?Oe=this.languageUtils.toResolveHierarchy(l.lng||this.language):Oe.push(l.lng||this.language);const ze=(Pe,Te,ot)=>{var Tt;const Ue=z&&ot!==I?ot:Ie;this.options.missingKeyHandler?this.options.missingKeyHandler(Pe,b,Te,Ue,qe,l):(Tt=this.backendConnector)!=null&&Tt.saveMissing&&this.backendConnector.saveMissing(Pe,b,Te,Ue,qe,l),this.emit("missingKey",Pe,b,Te,I)};this.options.saveMissing&&(this.options.saveMissingPlurals&&F?Oe.forEach(Pe=>{const Te=this.pluralResolver.getSuffixes(Pe,l);fe&&l[`defaultValue${this.options.pluralSeparator}zero`]&&!Te.includes(`${this.options.pluralSeparator}zero`)&&Te.push(`${this.options.pluralSeparator}zero`),Te.forEach(ot=>{ze([Pe],g+ot,l[`defaultValue${ot}`]||H)})}):ze(Oe,g,H))}I=this.extendTranslation(I,a,l,O,s),je&&I===g&&this.options.appendNamespaceToMissingKey&&(I=`${b}${k}${g}`),(je||me)&&this.options.parseMissingKeyHandler&&(I=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${b}${k}${g}`:g,me?I:void 0,l))}return d?(O.res=I,O.usedParams=this.getUsedParamsDetails(l),O):I}extendTranslation(a,o,s,l,d){var h,b;if((h=this.i18nFormat)!=null&&h.parse)a=this.i18nFormat.parse(a,{...this.options.interpolation.defaultVariables,...s},s.lng||this.language||l.usedLng,l.usedNS,l.usedKey,{resolved:l});else if(!s.skipInterpolation){s.interpolation&&this.interpolator.init({...s,interpolation:{...this.options.interpolation,...s.interpolation}});const k=ae(a)&&(((b=s==null?void 0:s.interpolation)==null?void 0:b.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let P;if(k){const O=a.match(this.interpolator.nestingRegexp);P=O&&O.length}let $=s.replace&&!ae(s.replace)?s.replace:s;if(this.options.interpolation.defaultVariables&&($={...this.options.interpolation.defaultVariables,...$}),a=this.interpolator.interpolate(a,$,s.lng||this.language||l.usedLng,s),k){const O=a.match(this.interpolator.nestingRegexp),I=O&&O.length;P<I&&(s.nest=!1)}!s.lng&&l&&l.res&&(s.lng=this.language||l.usedLng),s.nest!==!1&&(a=this.interpolator.nest(a,(...O)=>(d==null?void 0:d[0])===O[0]&&!s.context?(this.logger.warn(`It seems you are nesting recursively key: ${O[0]} in key: ${o[0]}`),null):this.translate(...O,o),s)),s.interpolation&&this.interpolator.reset()}const u=s.postProcess||this.options.postProcess,g=ae(u)?[u]:u;return a!=null&&(g!=null&&g.length)&&s.applyPostProcessor!==!1&&(a=xr.handle(g,a,o,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...l,usedParams:this.getUsedParamsDetails(s)},...s}:s,this)),a}resolve(a,o={}){let s,l,d,u,g;return ae(a)&&(a=[a]),Array.isArray(a)&&(a=a.map(h=>typeof h=="function"?Pt(h,{...this.options,...o}):h)),a.forEach(h=>{if(this.isValidLookup(s))return;const b=this.extractFromKey(h,o),k=b.key;l=k;let P=b.namespaces;this.options.fallbackNS&&(P=P.concat(this.options.fallbackNS));const $=o.count!==void 0&&!ae(o.count),O=$&&!o.ordinal&&o.count===0,I=o.context!==void 0&&(ae(o.context)||typeof o.context=="number")&&o.context!=="",V=o.lngs?o.lngs:this.languageUtils.toResolveHierarchy(o.lng||this.language,o.fallbackLng);P.forEach(G=>{var Q,oe;this.isValidLookup(s)||(g=G,!this.checkedLoadedFor[`${V[0]}-${G}`]&&((Q=this.utils)!=null&&Q.hasLoadedNamespace)&&!((oe=this.utils)!=null&&oe.hasLoadedNamespace(g))&&(this.checkedLoadedFor[`${V[0]}-${G}`]=!0,this.logger.warn(`key "${l}" for languages "${V.join(", ")}" won't get resolved as namespace "${g}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),V.forEach(ge=>{var X;if(this.isValidLookup(s))return;u=ge;const F=[k];if((X=this.i18nFormat)!=null&&X.addLookupKeys)this.i18nFormat.addLookupKeys(F,k,ge,G,o);else{let te;$&&(te=this.pluralResolver.getSuffix(ge,o.count,o));const fe=`${this.options.pluralSeparator}zero`,H=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if($&&(o.ordinal&&te.startsWith(H)&&F.push(k+te.replace(H,this.options.pluralSeparator)),F.push(k+te),O&&F.push(k+fe)),I){const W=`${k}${this.options.contextSeparator||"_"}${o.context}`;F.push(W),$&&(o.ordinal&&te.startsWith(H)&&F.push(W+te.replace(H,this.options.pluralSeparator)),F.push(W+te),O&&F.push(W+fe))}}let z;for(;z=F.pop();)this.isValidLookup(s)||(d=z,s=this.getResource(ge,G,z,o))}))})}),{res:s,usedKey:l,exactUsedKey:d,usedLng:u,usedNS:g}}isValidLookup(a){return a!==void 0&&!(!this.options.returnNull&&a===null)&&!(!this.options.returnEmptyString&&a==="")}getResource(a,o,s,l={}){var d;return(d=this.i18nFormat)!=null&&d.getResource?this.i18nFormat.getResource(a,o,s,l):this.resourceStore.getResource(a,o,s,l)}getUsedParamsDetails(a={}){const o=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],s=a.replace&&!ae(a.replace);let l=s?a.replace:a;if(s&&typeof a.count<"u"&&(l={...l,count:a.count}),this.options.interpolation.defaultVariables&&(l={...this.options.interpolation.defaultVariables,...l}),!s){l={...l};for(const d of o)delete l[d]}return l}static hasDefaultValue(a){const o="defaultValue";for(const s in a)if(Object.prototype.hasOwnProperty.call(a,s)&&s.startsWith(o)&&a[s]!==void 0)return!0;return!1}}class ir{constructor(a){this.options=a,this.supportedLngs=this.options.supportedLngs||!1,this.logger=He.create("languageUtils"),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(a){if(a=Vt(a),!a||!a.includes("-"))return null;const o=a.split("-");return o.length===2||(o.pop(),o[o.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(o.join("-"))}getLanguagePartFromCode(a){if(a=Vt(a),!a||!a.includes("-"))return a;const o=a.split("-");return this.formatLanguageCode(o[0])}formatLanguageCode(a){if(ae(a)&&a.includes("-")){let o;try{o=Intl.getCanonicalLocales(a)[0]}catch{}return o&&this.options.lowerCaseLng&&(o=o.toLowerCase()),o||(this.options.lowerCaseLng?a.toLowerCase():a)}return this.options.cleanCode||this.options.lowerCaseLng?a.toLowerCase():a}isSupportedCode(a){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(a=this.getLanguagePartFromCode(a)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(a)}getBestMatchFromCodes(a){if(!a)return null;let o;return a.forEach(s=>{if(o)return;const l=this.formatLanguageCode(s);(!this.options.supportedLngs||this.isSupportedCode(l))&&(o=l)}),!o&&this.options.supportedLngs&&a.forEach(s=>{if(o)return;const l=this.getScriptPartFromCode(s);if(this.isSupportedCode(l))return o=l;const d=this.getLanguagePartFromCode(s);if(this.isSupportedCode(d))return o=d;o=this.options.supportedLngs.find(u=>u===d?!0:!u.includes("-")&&!d.includes("-")?!1:!!(u.includes("-")&&!d.includes("-")&&u.slice(0,u.indexOf("-"))===d||u.startsWith(d)&&d.length>1))}),o||(o=this.getFallbackCodes(this.options.fallbackLng)[0]),o}getFallbackCodes(a,o){if(!a)return[];if(typeof a=="function"&&(a=a(o)),ae(a)&&(a=[a]),Array.isArray(a))return a;if(!o)return a.default||[];let s=a[o];return s||(s=a[this.getScriptPartFromCode(o)]),s||(s=a[this.formatLanguageCode(o)]),s||(s=a[this.getLanguagePartFromCode(o)]),s||(s=a.default),s||[]}toResolveHierarchy(a,o){const s=this.options.fallbackLng,l=Array.isArray(s)?s.join("|"):s;l!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=l);const d=o===void 0||o===!1||ae(o),u=o===void 0&&typeof this.options.fallbackLng=="function",g=ae(a)&&d&&!u;let h=null;if(g){let $;o===void 0?$="undefined":o===!1?$="boolean:false":$=`string:${o}`,h=`${a.length}:${a}|${$}`}if(h!==null){const $=this.resolveHierarchyCache[h];if($!==void 0)return $.slice()}const b=this.getFallbackCodes((o===!1?[]:o)||this.options.fallbackLng||[],a),k=[],P=$=>{$&&(this.isSupportedCode($)?k.push($):this.logger.warn(`rejecting language code not found in supportedLngs: ${$}`))};return ae(a)&&(a.includes("-")||a.includes("_"))?(this.options.load!=="languageOnly"&&P(this.formatLanguageCode(a)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&P(this.getScriptPartFromCode(a)),this.options.load!=="currentOnly"&&P(this.getLanguagePartFromCode(a))):ae(a)&&P(this.formatLanguageCode(a)),b.forEach($=>{k.includes($)||P(this.formatLanguageCode($))}),h!==null?(this.resolveHierarchyCache[h]=k,k.slice()):k}}const lr={zero:0,one:1,two:2,few:3,many:4,other:5},cr={select:f=>f===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class ho{constructor(a,o={}){this.languageUtils=a,this.options=o,this.logger=He.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(a,o={}){const s=Vt(a==="dev"?"en":a),l=o.ordinal?"ordinal":"cardinal",d=JSON.stringify({cleanedCode:s,type:l});if(d in this.pluralRulesCache)return this.pluralRulesCache[d];let u;try{u=new Intl.PluralRules(s,{type:l})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),cr;if(!a.match(/-|_/))return cr;const h=this.languageUtils.getLanguagePartFromCode(a);u=this.getRule(h,o)}return this.pluralRulesCache[d]=u,u}needsPlural(a,o={}){let s=this.getRule(a,o);return s||(s=this.getRule("dev",o)),(s==null?void 0:s.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(a,o,s={}){return this.getSuffixes(a,s).map(l=>`${o}${l}`)}getSuffixes(a,o={}){let s=this.getRule(a,o);return s||(s=this.getRule("dev",o)),s?s.resolvedOptions().pluralCategories.sort((l,d)=>lr[l]-lr[d]).map(l=>`${this.options.prepend}${o.ordinal?`ordinal${this.options.prepend}`:""}${l}`):[]}getSuffix(a,o,s={}){const l=this.getRule(a,s);return l?`${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${l.select(o)}`:(this.logger.warn(`no plural rule found for: ${a}`),this.getSuffix("dev",o,s))}}const dr=(f,a,o,s=".",l=!0)=>{let d=so(f,a,o);return!d&&l&&ae(o)&&(d=hn(f,o,s),d===void 0&&(d=hn(a,o,s))),d},ur=f=>f.replace(/\$/g,"$$$$");class pr{constructor(a={}){var o;this.logger=He.create("interpolator"),this.options=a,this.format=((o=a==null?void 0:a.interpolation)==null?void 0:o.format)||(s=>s),this.init(a)}init(a={}){a.interpolation||(a.interpolation={escapeValue:!0});const{escape:o,escapeValue:s,useRawValueToEscape:l,prefix:d,prefixEscaped:u,suffix:g,suffixEscaped:h,formatSeparator:b,unescapeSuffix:k,unescapePrefix:P,nestingPrefix:$,nestingPrefixEscaped:O,nestingSuffix:I,nestingSuffixEscaped:V,nestingOptionsSeparator:G,maxReplaces:Q,alwaysFormat:oe}=a.interpolation;this.escape=o!==void 0?o:lo,this.escapeValue=s!==void 0?s:!0,this.useRawValueToEscape=l!==void 0?l:!1,this.prefix=d?Je(d):u||"{{",this.suffix=g?Je(g):h||"}}",this.formatSeparator=b||",",this.unescapePrefix=k?"":P?Je(P):"-",this.unescapeSuffix=this.unescapePrefix?"":k?Je(k):"",this.nestingPrefix=$?Je($):O||Je("$t("),this.nestingSuffix=I?Je(I):V||Je(")"),this.nestingOptionsSeparator=G||",",this.maxReplaces=Q||1e3,this.alwaysFormat=oe!==void 0?oe:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const a=(o,s)=>(o==null?void 0:o.source)===s?(o.lastIndex=0,o):new RegExp(s,"g");this.regexp=a(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=a(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=a(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(a,o,s,l){var O;let d,u,g;const h=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},b=I=>{if(!I.includes(this.formatSeparator)){const oe=dr(o,h,I,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(oe,void 0,s,{...l,...o,interpolationkey:I}):oe}const V=I.split(this.formatSeparator),G=V.shift().trim(),Q=V.join(this.formatSeparator).trim();return this.format(dr(o,h,G,this.options.keySeparator,this.options.ignoreJSONStructure),Q,s,{...l,...o,interpolationkey:G})};this.resetRegExp(),!this.escapeValue&&typeof a=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(a)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const k=(l==null?void 0:l.missingInterpolationHandler)||this.options.missingInterpolationHandler,P=((O=l==null?void 0:l.interpolation)==null?void 0:O.skipOnVariables)!==void 0?l.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:I=>I},{regex:this.regexp,safeValue:I=>this.escapeValue?this.escape(I):I}].forEach(I=>{for(g=0;d=I.regex.exec(a);){const V=d[1].trim();if(u=b(V),u===void 0)if(typeof k=="function"){const Q=k(a,d,l);u=ae(Q)?Q:""}else if(l&&Object.prototype.hasOwnProperty.call(l,V))u="";else if(P){u=d[0];continue}else this.logger.warn(`missed to pass in variable ${V} for interpolating ${a}`),u="";else!ae(u)&&!this.useRawValueToEscape&&(u=fn(u));const G=I.safeValue(u);if(a=a.replace(d[0],ur(G)),P?(I.regex.lastIndex+=G.length,I.regex.lastIndex-=d[0].length):I.regex.lastIndex=0,g++,g>=this.maxReplaces)break}}),a}nest(a,o,s={}){let l,d,u;const g=(h,b)=>{const k=this.nestingOptionsSeparator;if(!h.includes(k))return h;const P=h.split(new RegExp(`${Je(k)}[ ]*{`));let $=`{${P[1]}`;h=P[0],$=this.interpolate($,u);const O=$.match(/'/g),I=$.match(/"/g);(((O==null?void 0:O.length)??0)%2===0&&!I||((I==null?void 0:I.length)??0)%2!==0)&&($=$.replace(/'/g,'"'));try{u=JSON.parse($),b&&(u={...b,...u})}catch(V){return this.logger.warn(`failed parsing options string in nesting for key ${h}`,V),`${h}${k}${$}`}return u.defaultValue&&u.defaultValue.includes(this.prefix)&&delete u.defaultValue,h};for(;l=this.nestingRegexp.exec(a);){let h=[];u={...s},u=u.replace&&!ae(u.replace)?u.replace:u,u.applyPostProcessor=!1,delete u.defaultValue;const b=/{.*}/s.test(l[1])?l[1].lastIndexOf("}")+1:l[1].indexOf(this.formatSeparator);if(b!==-1&&(h=l[1].slice(b).split(this.formatSeparator).map(k=>k.trim()).filter(Boolean),l[1]=l[1].slice(0,b)),d=o(g.call(this,l[1].trim(),u),u),d&&l[0]===a&&!ae(d))return d;ae(d)||(d=fn(d)),d||(this.logger.warn(`missed to resolve ${l[1]} for nesting ${a}`),d=""),h.length&&(d=h.reduce((k,P)=>this.format(k,P,s.lng,{...s,interpolationkey:l[1].trim()}),d.trim())),a=a.replace(l[0],ur(fn(d))),this.regexp.lastIndex=0}return a}}const bo=f=>{let a=f.toLowerCase().trim();const o={};if(f.includes("(")){const s=f.split("(");a=s[0].toLowerCase().trim();const l=s[1].slice(0,-1);a==="currency"&&!l.includes(":")?o.currency||(o.currency=l.trim()):a==="relativetime"&&!l.includes(":")?o.range||(o.range=l.trim()):l.split(";").forEach(u=>{if(u){const[g,...h]=u.split(":"),b=h.join(":").trim().replace(/^'+|'+$/g,""),k=g.trim();o[k]||(o[k]=b),b==="false"&&(o[k]=!1),b==="true"&&(o[k]=!0),isNaN(b)||(o[k]=parseInt(b,10))}})}return{formatName:a,formatOptions:o}},fr=f=>{const a={};return(o,s,l)=>{let d=l;l&&l.interpolationkey&&l.formatParams&&l.formatParams[l.interpolationkey]&&l[l.interpolationkey]&&(d={...d,[l.interpolationkey]:void 0});const u=s+JSON.stringify(d);let g=a[u];return g||(g=f(Vt(s),l),a[u]=g),g(o)}},vo=f=>(a,o,s)=>f(Vt(o),s)(a);class yo{constructor(a={}){this.logger=He.create("formatter"),this.options=a,this.init(a)}init(a,o={interpolation:{}}){this.formatSeparator=o.interpolation.formatSeparator||",";const s=o.cacheInBuiltFormats?fr:vo;this.formats={number:s((l,d)=>{const u=new Intl.NumberFormat(l,{...d});return g=>u.format(g)}),currency:s((l,d)=>{const u=new Intl.NumberFormat(l,{...d,style:"currency"});return g=>u.format(g)}),datetime:s((l,d)=>{const u=new Intl.DateTimeFormat(l,{...d});return g=>u.format(g)}),relativetime:s((l,d)=>{const u=new Intl.RelativeTimeFormat(l,{...d});return g=>u.format(g,d.range||"day")}),list:s((l,d)=>{const u=new Intl.ListFormat(l,{...d});return g=>u.format(g)})}}add(a,o){this.formats[a.toLowerCase().trim()]=o}addCached(a,o){this.formats[a.toLowerCase().trim()]=fr(o)}format(a,o,s,l={}){if(!o||a==null)return a;const d=o.split(this.formatSeparator),u=[];for(let h=0;h<d.length;h++){let b=d[h];for(;b.indexOf("(")>-1&&!b.includes(")")&&h+1<d.length;)b=`${b}${this.formatSeparator}${d[++h]}`;u.push(b)}return u.reduce((h,b)=>{var $;const{formatName:k,formatOptions:P}=bo(b);if(this.formats[k]){let O=h;try{const I=(($=l==null?void 0:l.formatParams)==null?void 0:$[l.interpolationkey])||{},V=I.locale||I.lng||l.locale||l.lng||s;O=this.formats[k](h,V,{...P,...l,...I})}catch(I){this.logger.warn(I)}return O}else this.logger.warn(`there was no format function for ${k}`);return h},a)}}const xo=(f,a)=>{f.pending[a]!==void 0&&(delete f.pending[a],f.pendingCount--)};class wo extends Da{constructor(a,o,s,l={}){var d,u;super(),this.backend=a,this.store=o,this.services=s,this.languageUtils=s.languageUtils,this.options=l,this.logger=He.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=l.maxParallelReads||10,this.readingCalls=0,this.maxRetries=l.maxRetries>=0?l.maxRetries:5,this.retryTimeout=l.retryTimeout>=1?l.retryTimeout:350,this.state={},this.queue=[],(u=(d=this.backend)==null?void 0:d.init)==null||u.call(d,s,l.backend,l)}queueLoad(a,o,s,l){const d={},u={},g={},h={};return a.forEach(b=>{let k=!0;o.forEach(P=>{const $=`${b}|${P}`;!s.reload&&this.store.hasResourceBundle(b,P)?this.state[$]=2:this.state[$]<0||(this.state[$]===1?u[$]===void 0&&(u[$]=!0):(this.state[$]=1,k=!1,u[$]===void 0&&(u[$]=!0),d[$]===void 0&&(d[$]=!0),h[P]===void 0&&(h[P]=!0)))}),k||(g[b]=!0)}),(Object.keys(d).length||Object.keys(u).length)&&this.queue.push({pending:u,pendingCount:Object.keys(u).length,loaded:{},errors:[],callback:l}),{toLoad:Object.keys(d),pending:Object.keys(u),toLoadLanguages:Object.keys(g),toLoadNamespaces:Object.keys(h)}}loaded(a,o,s){const l=a.split("|"),d=l[0],u=l[1];o&&this.emit("failedLoading",d,u,o),!o&&s&&this.store.addResourceBundle(d,u,s,void 0,void 0,{skipCopy:!0}),this.state[a]=o?-1:2,o&&s&&(this.state[a]=0);const g={};this.queue.forEach(h=>{oo(h.loaded,[d],u),xo(h,a),o&&h.errors.push(o),h.pendingCount===0&&!h.done&&(Object.keys(h.loaded).forEach(b=>{g[b]||(g[b]={});const k=h.loaded[b];k.length&&k.forEach(P=>{g[b][P]===void 0&&(g[b][P]=!0)})}),h.done=!0,h.errors.length?h.callback(h.errors):h.callback())}),this.emit("loaded",g),this.queue=this.queue.filter(h=>!h.done)}read(a,o,s,l=0,d=this.retryTimeout,u){if(!a.length)return u(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:a,ns:o,fcName:s,tried:l,wait:d,callback:u});return}this.readingCalls++;const g=(b,k)=>{if(this.readingCalls--,this.waitingReads.length>0){const P=this.waitingReads.shift();this.read(P.lng,P.ns,P.fcName,P.tried,P.wait,P.callback)}if(b&&k&&l<this.maxRetries){setTimeout(()=>{this.read(a,o,s,l+1,d*2,u)},d);return}u(b,k)},h=this.backend[s].bind(this.backend);if(h.length===2){try{const b=h(a,o);b&&typeof b.then=="function"?b.then(k=>g(null,k)).catch(g):g(null,b)}catch(b){g(b)}return}return h(a,o,g)}prepareLoading(a,o,s={},l){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),l&&l();ae(a)&&(a=this.languageUtils.toResolveHierarchy(a)),ae(o)&&(o=[o]);const d=this.queueLoad(a,o,s,l);if(!d.toLoad.length)return d.pending.length||l(),null;d.toLoad.forEach(u=>{this.loadOne(u)})}load(a,o,s){this.prepareLoading(a,o,{},s)}reload(a,o,s){this.prepareLoading(a,o,{reload:!0},s)}loadOne(a,o=""){const s=a.split("|"),l=s[0],d=s[1];this.read(l,d,"read",void 0,void 0,(u,g)=>{u&&this.logger.warn(`${o}loading namespace ${d} for language ${l} failed`,u),!u&&g&&this.logger.log(`${o}loaded namespace ${d} for language ${l}`,g),this.loaded(a,u,g)})}saveMissing(a,o,s,l,d,u={},g=()=>{}){var h,b,k,P,$;if((b=(h=this.services)==null?void 0:h.utils)!=null&&b.hasLoadedNamespace&&!((P=(k=this.services)==null?void 0:k.utils)!=null&&P.hasLoadedNamespace(o))){this.logger.warn(`did not save key "${s}" as the namespace "${o}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(s==null||s==="")){if(($=this.backend)!=null&&$.create){const O={...u,isUpdate:d},I=this.backend.create.bind(this.backend);if(I.length<6)try{let V;I.length===5?V=I(a,o,s,l,O):V=I(a,o,s,l),V&&typeof V.then=="function"?V.then(G=>g(null,G)).catch(g):g(null,V)}catch(V){g(V)}else I(a,o,s,l,g,O)}!a||!a[0]||this.store.addResource(a[0],o,s,l)}}}const gn=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:f=>{let a={};if(typeof f[1]=="object"&&(a=f[1]),ae(f[1])&&(a.defaultValue=f[1]),ae(f[2])&&(a.tDescription=f[2]),typeof f[2]=="object"||typeof f[3]=="object"){const o=f[3]||f[2];Object.keys(o).forEach(s=>{a[s]=o[s]})}return a},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),mr=f=>(ae(f.ns)&&(f.ns=[f.ns]),ae(f.fallbackLng)&&(f.fallbackLng=[f.fallbackLng]),ae(f.fallbackNS)&&(f.fallbackNS=[f.fallbackNS]),f.supportedLngs&&!f.supportedLngs.includes("cimode")&&(f.supportedLngs=f.supportedLngs.concat(["cimode"])),f),ka=()=>{},So=f=>{Object.getOwnPropertyNames(Object.getPrototypeOf(f)).forEach(o=>{typeof f[o]=="function"&&(f[o]=f[o].bind(f))})};class Ht extends Da{constructor(a={},o){if(super(),this.options=mr(a),this.services={},this.logger=He,this.modules={external:[]},So(this),o&&!this.isInitialized&&!a.isClone){if(!this.options.initAsync)return this.init(a,o),this;setTimeout(()=>{this.init(a,o)},0)}}init(a={},o){this.isInitializing=!0,typeof a=="function"&&(o=a,a={}),a.defaultNS==null&&a.ns&&(ae(a.ns)?a.defaultNS=a.ns:a.ns.includes("translation")||(a.defaultNS=a.ns[0]));const s=gn();this.options={...s,...this.options,...mr(a)},this.options.interpolation={...s.interpolation,...this.options.interpolation},a.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=a.keySeparator),a.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=a.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=s.overloadTranslationOptionHandler);const l=b=>b?typeof b=="function"?new b:b:null;if(!this.options.isClone){this.modules.logger?He.init(l(this.modules.logger),this.options):He.init(null,this.options);let b;this.modules.formatter?b=this.modules.formatter:b=yo;const k=new ir(this.options);this.store=new sr(this.options.resources,this.options);const P=this.services;P.logger=He,P.resourceStore=this.store,P.languageUtils=k,P.pluralResolver=new ho(k,{prepend:this.options.pluralSeparator}),b&&(P.formatter=l(b),P.formatter.init&&P.formatter.init(P,this.options),this.options.interpolation.format=P.formatter.format.bind(P.formatter)),P.interpolator=new pr(this.options),P.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},P.backendConnector=new wo(l(this.modules.backend),P.resourceStore,P,this.options),P.backendConnector.on("*",($,...O)=>{this.emit($,...O)}),this.modules.languageDetector&&(P.languageDetector=l(this.modules.languageDetector),P.languageDetector.init&&P.languageDetector.init(P,this.options.detection,this.options)),this.modules.i18nFormat&&(P.i18nFormat=l(this.modules.i18nFormat),P.i18nFormat.init&&P.i18nFormat.init(this)),this.translator=new Pa(this.services,this.options),this.translator.on("*",($,...O)=>{this.emit($,...O)}),this.modules.external.forEach($=>{$.init&&$.init(this)})}if(this.format=this.options.interpolation.format,o||(o=ka),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const b=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);b.length>0&&b[0]!=="dev"&&(this.options.lng=b[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(b=>{this[b]=(...k)=>this.store[b](...k)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(b=>{this[b]=(...k)=>(this.store[b](...k),this)});const g=Ft(),h=()=>{const b=(k,P)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),g.resolve(P),o(k,P)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return b(null,this.t.bind(this));this.changeLanguage(this.options.lng,b)};return this.options.resources||!this.options.initAsync?h():setTimeout(h,0),g}loadResources(a,o=ka){var d,u;let s=o;const l=ae(a)?a:this.language;if(typeof a=="function"&&(s=a),!this.options.resources||this.options.partialBundledLanguages){if((l==null?void 0:l.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return s();const g=[],h=b=>{if(!b||b==="cimode")return;this.services.languageUtils.toResolveHierarchy(b).forEach(P=>{P!=="cimode"&&(g.includes(P)||g.push(P))})};l?h(l):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(k=>h(k)),(u=(d=this.options.preload)==null?void 0:d.forEach)==null||u.call(d,b=>h(b)),this.services.backendConnector.load(g,this.options.ns,b=>{!b&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),s(b)})}else s(null)}reloadResources(a,o,s){const l=Ft();return typeof a=="function"&&(s=a,a=void 0),typeof o=="function"&&(s=o,o=void 0),a||(a=this.languages),o||(o=this.options.ns),s||(s=ka),this.services.backendConnector.reload(a,o,d=>{l.resolve(),s(d)}),l}use(a){if(!a)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!a.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return a.type==="backend"&&(this.modules.backend=a),(a.type==="logger"||a.log&&a.warn&&a.error)&&(this.modules.logger=a),a.type==="languageDetector"&&(this.modules.languageDetector=a),a.type==="i18nFormat"&&(this.modules.i18nFormat=a),a.type==="postProcessor"&&xr.addPostProcessor(a),a.type==="formatter"&&(this.modules.formatter=a),a.type==="3rdParty"&&this.modules.external.push(a),this}setResolvedLanguage(a){if(!(!a||!this.languages)&&!["cimode","dev"].includes(a)){for(let o=0;o<this.languages.length;o++){const s=this.languages[o];if(!["cimode","dev"].includes(s)&&this.store.hasLanguageSomeTranslations(s)){this.resolvedLanguage=s;break}}!this.resolvedLanguage&&!this.languages.includes(a)&&this.store.hasLanguageSomeTranslations(a)&&(this.resolvedLanguage=a,this.languages.unshift(a))}}changeLanguage(a,o){this.isLanguageChangingTo=a;const s=Ft();this.emit("languageChanging",a);const l=g=>{this.language=g,this.languages=this.services.languageUtils.toResolveHierarchy(g),this.resolvedLanguage=void 0,this.setResolvedLanguage(g)},d=(g,h)=>{h?this.isLanguageChangingTo===a&&(l(h),this.translator.changeLanguage(h),this.isLanguageChangingTo=void 0,this.emit("languageChanged",h),this.logger.log("languageChanged",h)):this.isLanguageChangingTo=void 0,s.resolve((...b)=>this.t(...b)),o&&o(g,(...b)=>this.t(...b))},u=g=>{var k,P;!a&&!g&&this.services.languageDetector&&(g=[]);const h=ae(g)?g:g&&g[0],b=this.store.hasLanguageSomeTranslations(h)?h:this.services.languageUtils.getBestMatchFromCodes(ae(g)?[g]:g);b&&(this.language||l(b),this.translator.language||this.translator.changeLanguage(b),(P=(k=this.services.languageDetector)==null?void 0:k.cacheUserLanguage)==null||P.call(k,b)),this.loadResources(b,$=>{d($,b)})};return!a&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!a&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(a),s}getFixedT(a,o,s,l){const d=l==null?void 0:l.scopeNs,u=(g,h,...b)=>{let k;typeof h!="object"?k=this.options.overloadTranslationOptionHandler([g,h].concat(b)):k={...h},k.lng=k.lng||u.lng,k.lngs=k.lngs||u.lngs;const P=k.ns!==void 0&&k.ns!==null;k.ns=k.ns||u.ns,k.keyPrefix!==""&&(k.keyPrefix=k.keyPrefix||s||u.keyPrefix);const $={...this.options,...k};Array.isArray(d)&&!P&&($.ns=d),typeof k.keyPrefix=="function"&&(k.keyPrefix=Pt(k.keyPrefix,$));const O=this.options.keySeparator||".";let I;return k.keyPrefix&&Array.isArray(g)?I=g.map(V=>(typeof V=="function"&&(V=Pt(V,$)),`${k.keyPrefix}${O}${V}`)):(typeof g=="function"&&(g=Pt(g,$)),I=k.keyPrefix?`${k.keyPrefix}${O}${g}`:g),this.t(I,k)};return ae(a)?u.lng=a:u.lngs=a,u.ns=o,u.keyPrefix=s,u}t(...a){var o;return(o=this.translator)==null?void 0:o.translate(...a)}exists(...a){var o;return(o=this.translator)==null?void 0:o.exists(...a)}setDefaultNamespace(a){this.options.defaultNS=a}hasLoadedNamespace(a,o={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const s=o.lng||this.resolvedLanguage||this.languages[0],l=this.options?this.options.fallbackLng:!1,d=this.languages[this.languages.length-1];if(s.toLowerCase()==="cimode")return!0;const u=(g,h)=>{const b=this.services.backendConnector.state[`${g}|${h}`];return b===-1||b===0||b===2};if(o.precheck){const g=o.precheck(this,u);if(g!==void 0)return g}return!!(this.hasResourceBundle(s,a)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||u(s,a)&&(!l||u(d,a)))}loadNamespaces(a,o){const s=Ft();return this.options.ns?(ae(a)&&(a=[a]),a.forEach(l=>{this.options.ns.includes(l)||this.options.ns.push(l)}),this.loadResources(l=>{s.resolve(),o&&o(l)}),s):(o&&o(),Promise.resolve())}loadLanguages(a,o){const s=Ft();ae(a)&&(a=[a]);const l=this.options.preload||[],d=a.filter(u=>!l.includes(u)&&this.services.languageUtils.isSupportedCode(u));return d.length?(this.options.preload=l.concat(d),this.loadResources(u=>{s.resolve(),o&&o(u)}),s):(o&&o(),Promise.resolve())}dir(a){var l,d;if(a||(a=this.resolvedLanguage||(((l=this.languages)==null?void 0:l.length)>0?this.languages[0]:this.language)),!a)return"rtl";try{const u=new Intl.Locale(a);if(u&&u.getTextInfo){const g=u.getTextInfo();if(g&&g.direction)return g.direction}}catch{}const o=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],s=((d=this.services)==null?void 0:d.languageUtils)||new ir(gn());return a.toLowerCase().indexOf("-latn")>1?"ltr":o.includes(s.getLanguagePartFromCode(a))||a.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(a={},o){const s=new Ht(a,o);return s.createInstance=Ht.createInstance,s}cloneInstance(a={},o=ka){const s=a.forkResourceStore;s&&delete a.forkResourceStore;const l={...this.options,...a,isClone:!0},d=new Ht(l);if((a.debug!==void 0||a.prefix!==void 0)&&(d.logger=d.logger.clone(a)),["store","services","language"].forEach(g=>{d[g]=this[g]}),d.services={...this.services},d.services.utils={hasLoadedNamespace:d.hasLoadedNamespace.bind(d)},s){const g=Object.keys(this.store.data).reduce((h,b)=>(h[b]={...this.store.data[b]},h[b]=Object.keys(h[b]).reduce((k,P)=>(k[P]={...h[b][P]},k),h[b]),h),{});d.store=new sr(g,l),d.services.resourceStore=d.store}if(a.interpolation){const h={...gn().interpolation,...this.options.interpolation,...a.interpolation},b={...l,interpolation:h};d.services.interpolator=new pr(b)}return d.translator=new Pa(d.services,l),d.translator.on("*",(g,...h)=>{d.emit(g,...h)}),d.init(l,o),d.translator.options=l,d.translator.backendConnector.services.utils={hasLoadedNamespace:d.hasLoadedNamespace.bind(d)},d}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Ee=Ht.createInstance();Ee.createInstance;Ee.dir;Ee.init;Ee.loadResources;Ee.reloadResources;Ee.use;Ee.changeLanguage;Ee.getFixedT;Ee.t;Ee.exists;Ee.setDefaultNamespace;Ee.hasLoadedNamespace;Ee.loadNamespaces;Ee.loadLanguages;const ko={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, no copiando",criticalThinking:"Pensamiento crítico activo • Sin trampas de IA"},Co={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar & Drive sincronizados"},Ao={agenda:"Agenda",study:"Estudio / Repaso",tasks:"Trabajos",tutorBadge:"Tutor IA"},Eo={nextMilestone:"Próximo Hito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoy",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodología activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados en tu cuenta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudio",autonomousOrg:"Organización autónoma",subtitle:"Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.",addBlock:"Añadir Bloque de Estudio",emptyTitle:"No hay bloques de estudio programados.",emptyDesc:'Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.',pendingSync:"Pendiente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Añadir Bloque de Estudio",modalSubtitle:"Planifica un hito para organizar tu tiempo de aprendizaje.",fieldActivity:"Título de la actividad",fieldSubject:"Asignatura",fieldType:"Tipo de Hito",fieldDate:"Fecha",fieldTime:"Hora Inicio",fieldNotes:"Notas u objetivo personal",cancel:"Cancelar",save:"Guardar Bloque",types:{study_session:"Sesión de estudio (45 min)",exam:"Examen lectivo",assignment_due:"Entrega de trabajo"}},Po={bannerTitle:"Marco de Aprendizaje Socrático Activo",bannerDesc:"La IA guía tu pensamiento con preguntas reflexivas. Prohibido obtener soluciones automáticas para garantizar tu crecimiento intelectual.",bannerBadge:"Tutor Cognitivo Activo",activeRecall:"Repaso Activo",flashcardTitle:"Tarjeta de Autoevaluación",flashcardSubtitle:"Explica con tus palabras antes de ver la explicación:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar luego",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Hazme una pregunta diagnóstica",chip2:"💡 Dame una pista reflexiva",chip3:"🎯 ¿Voy por buen camino?",inputPlaceholder:"Escribe tu razonamiento o duda... (Enter para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: la IA fomenta tu propio esfuerzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Tú"},To={title:"Trabajos y Proyectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.",newTask:"Nuevo Trabajo",emptyTitle:"No tienes trabajos activos registrados.",emptyDesc:'Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.',dueDate:"Fecha Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Archivo",noDriveFiles:"No hay archivos vinculados de Drive todavía.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía del Estudiante",ownEffort:"propio",modalTitle:"Nuevo Trabajo o Entregable",modalSubtitle:"Crea una ficha para organizar tu investigación y documentos.",fieldTitle:"Título del Proyecto / Trabajo",fieldSubject:"Asignatura",fieldDue:"Fecha de Entrega",fieldNotes:"Descripción u objetivo",cancel:"Cancelar",create:"Crear Trabajo"},Do={title:"Configuración del Modelo de IA",subtitle:"Inferencia local o en la nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidad Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL del Endpoint API",endpointHint:"Compatible con /v1/chat/completions y /v1/models",modelName:"Nombre del Modelo",apiKey:"API Key (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicamente en tu navegador (IndexedDB local).",socraticMode:"Modo Pedagógico Socrático",strictHigh:"Estricto: Nunca da soluciones directas (100% preguntas de razonamiento)",strictBalanced:"Equilibrado: Pistas intermedias y ejemplos análogos",strictExploratory:"Exploratorio: Explicaciones conceptuales y desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Guardar Cambios"},_o={title:"Cuenta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Cuenta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudio",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Cerrar Sesión / Desconectar",modeSelectorTitle:"Elige el método de acceso",demoOptionTitle:"Modo Demo (Recomendado para evaluación)",demoOptionDesc:"Explora toda la plataforma con datos precargados de muestra sin necesidad de credenciales.",demoButton:"Usar Modo Demo",realOptionTitle:"Conectar Cuenta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza tus eventos en tu Google Calendar real y vincula tus archivos de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ej. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Consíguelo en Google Cloud Console > APIs y Servicios > Credenciales > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar tu cuenta educativa o personal de Google permite:",benefit1:"Exportar tus sesiones de estudio a Google Calendar.",benefit2:"Adjuntar tus apuntes y borradores desde Google Drive.",benefit3:"Garantizar que tus datos permanezcan privados y bajo tu control."},$o={updateTitle:"¡Nueva versión disponible!",updateDesc:"Actualiza para recibir las últimas mejoras.",updateButton:"Actualizar"},jo={app:ko,nav:Co,tabs:Ao,agenda:Eo,study:Po,tasks:To,aiModal:Do,authModal:_o,pwa:$o},Lo={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense trampes d'IA"},Io={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},Oo={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},Mo={nextMilestone:"Proper Hite Lectiu",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min avui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribueix l'esforç en blocs curts per garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem a "Afegir Bloc d'Estudi" per començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Desar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"}},Ro={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtenir solucions automàtiques per garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teves paraules abans de veure l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig pel bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu"},Bo={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per elaborar treballs rigorosos garantint la teva autoria i idees pròpies.",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem a "Nou Treball" per començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents a Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per organitzar la teva recerca i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},qo={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privadesa Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Desada de forma segura únicament al teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Desar Canvis"},zo={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconsegueix-lo a Google Cloud Console > APIs i Serveis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teves sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teves dades romanguin privades i sota el teu control."},No={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per rebre les darreres millores.",updateButton:"Actualitzar"},Ko={app:Lo,nav:Io,tabs:Oo,agenda:Mo,study:Ro,tasks:Bo,aiModal:qo,authModal:zo,pwa:No},Fo={title:"Anaxagoras AI",badge:"STI Cognitivo",tagline:"Aprende pensando, non copiando",criticalThinking:"Pensamento crítico activo • Sen trampas de IA"},Go={local:"Local",cloud:"Cloud",connectGoogle:"Conectar Google",calendarDriveSync:"Google Calendar e Drive sincronizados"},Ho={agenda:"Axenda",study:"Estudo / Repaso",tasks:"Traballos",tutorBadge:"Tutor IA"},Vo={nextMilestone:"Próximo Fito Lectivo",inDays:"En 3 días",recommendedToday:"⚡ Sesión recomendada: 45 min hoxe",weeklyProgress:"Progreso Semanal",blocksCompleted:"bloques completados",activeMethod:"Metodoloxía activa",googleCalendar:"Google Calendar",syncedEvents:"Eventos sincronizados na túa conta",syncAll:"🔄 Sincronizar Todo con Calendar",syncing:"⏳ Sincronizando...",title:"Planificación Semanal de Estudo",autonomousOrg:"Organización autónoma",subtitle:"Distribúe o esforzo en bloques curtos para garantir a asimilación a longo prazo.",addBlock:"Engadir Bloque de Estudo",emptyTitle:"Non hai bloques de estudo programados.",emptyDesc:'Preme en "Engadir Bloque de Estudo" para comezar a organizar o teu tempo.',pendingSync:"Pendente sync",synced:"Google Calendar",minRecommended:"minutos recomendados",modalTitle:"Engadir Bloque de Estudo",modalSubtitle:"Planifica un fito para organizar o teu tempo de aprendizaxe.",fieldActivity:"Título da actividade",fieldSubject:"Materia",fieldType:"Tipo de Fito",fieldDate:"Data",fieldTime:"Hora de Inicio",fieldNotes:"Notas ou obxectivo persoal",cancel:"Cancelar",save:"Gardar Bloque",types:{study_session:"Sesión de estudo (45 min)",exam:"Exame lectivo",assignment_due:"Entrega de traballo"}},Uo={bannerTitle:"Marco de Aprendizaxe Socrática Activa",bannerDesc:"A IA guía o teu pensamento con preguntas reflexivas. Prohibido obter solucións automáticas para garantir o teu crecemento intelectual.",bannerBadge:"Tutor Cognitivo Activo",activeRecall:"Repaso Activo",flashcardTitle:"Tarxeta de Autoavaliación",flashcardSubtitle:"Explica coas túas palabras antes de ver a explicación:",toggleHint:"👁️ Amosar / Ocultar Pista Explicativa",reviewLater:"🔁 Repasar despois",mastered:"✅ Dominado",conceptsTitle:"Conceptos a Dominar",consolidated:"Consolidado",toStrengthen:"Por afianzar",chip1:"❓ Faime unha pregunta diagnóstica",chip2:"💡 Dáme unha pista reflexiva",chip3:"🎯 Vou polo bo camiño?",inputPlaceholder:"Escribe o teu razoamento ou dúbida... (Intro para enviar)",send:"Enviar",safeMode:"🔒 Modo seguro: a IA fomenta o teu propio esforzo",openaiCompatible:"Inferencia compatible OpenAI",tutorRole:"Tutor Socrático",userRole:"Ti"},Wo={title:"Traballos e Proxectos Escolares",driveIntegration:"Integración Google Drive",subtitle:"Asistente por fases para elaborar traballos rigorosos garantindo a túa autoría e ideas propias.",newTask:"Novo Traballo",emptyTitle:"Non tes traballos activos rexistrados.",emptyDesc:'Preme en "Novo Traballo" para comezar a estruturar un entregable.',dueDate:"Data Límite",autonomy:"Autonomía",phasesTitle:"Fases de Elaboración",phases:{planning:"1. Planificación",research:"2. Investigación",writing:"3. Redacción Propia",review:"4. Revisión Final"},driveDocs:"Documentos en Google Drive",attachDrive:"＋ Vincular Ficheiro",noDriveFiles:"Aínda non hai ficheiros vinculados de Drive.",driveSync:"Drive Sync",autonomyMeter:"Medidor de Autonomía do Estudante",ownEffort:"propio",modalTitle:"Novo Traballo ou Entregable",modalSubtitle:"Crea unha ficha para organizar a túa investigación e documentos.",fieldTitle:"Título do Proxecto / Traballo",fieldSubject:"Materia",fieldDue:"Data de Entrega",fieldNotes:"Descrición ou obxectivo",cancel:"Cancelar",create:"Crear Traballo"},Qo={title:"Configuración do Modelo de IA",subtitle:"Inferencia local ou na nube con API estándar OpenAI",inferenceType:"Tipo de Inferencia",localTitle:"Local (Privacidade Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL do Endpoint API",endpointHint:"Compatible con /v1/chat/completions e /v1/models",modelName:"Nome do Modelo",apiKey:"Chave de API (Opcional en Local)",apiKeyHint:"Gardada de forma segura unicamente no teu navegador (IndexedDB local).",socraticMode:"Modo Pedagóxico Socrático",strictHigh:"Estrito: Nunca dá solucións directas (100% preguntas de razoamento)",strictBalanced:"Equilibrado: Pistas intermedias e exemplos análogos",strictExploratory:"Exploratorio: Explicacións conceptuais e desafíos",testConnection:"Probar Conexión",testing:"Probando...",cancel:"Cancelar",save:"Gardar Cambios"},Yo={title:"Conta de Google",subtitle:"Conectores OAuth 2.0 • Calendar & Drive",demoBadge:"Modo Demo Activo",realBadge:"Conta Real Google",authorizedResources:"Recursos autorizados",calendarTitle:"Google Calendar",calendarDesc:"Sincronización de bloques de estudo",driveTitle:"Google Drive",driveDesc:"Vinculación de documentos de entregables",statusActive:"Activo",statusReal:"Sincronización Real",statusDemo:"Simulación Local",disconnect:"Pechar Sesión / Desconectar",modeSelectorTitle:"Escolle o método de acceso",demoOptionTitle:"Modo Demo (Recomendado para avaliación)",demoOptionDesc:"Explora toda a plataforma con datos precargados de mostra sen necesidade de credenciais.",demoButton:"Empregar Modo Demo",realOptionTitle:"Conectar Conta Real de Google (OAuth 2.0)",realOptionDesc:"Sincroniza os teus eventos no teu Google Calendar real e vincula os teus ficheiros de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Conségueo en Google Cloud Console > APIs e Servizos > Credenciais > ID de cliente de OAuth.",realButton:"Iniciar Sesión con Google OAuth",connectExplanation:"Conectar a túa conta educativa ou persoal de Google permite:",benefit1:"Exportar as túas sesións de estudo a Google Calendar.",benefit2:"Xuntar os teus apuntamentos e borradores desde Google Drive.",benefit3:"Garantir que os teus datos permanezan privados e baixo o teu control."},Jo={updateTitle:"Nova versión dispoñible!",updateDesc:"Actualiza para recibir as últimas melloras.",updateButton:"Actualizar"},Xo={app:Fo,nav:Go,tabs:Ho,agenda:Vo,study:Uo,tasks:Wo,aiModal:Qo,authModal:Yo,pwa:Jo},Zo={title:"Anaxagoras AI",badge:"STI Kognitiboa",tagline:"Pentsatuz ikasi, ez kopiatuz",criticalThinking:"Pentsamendu kritiko aktiboa • IA trikimailurik gabe"},es={local:"Lokala",cloud:"Cloud",connectGoogle:"Google Konektatu",calendarDriveSync:"Google Calendar eta Drive sinkronizatuta"},ts={agenda:"Agenda",study:"Ikasketa / Berrikuspena",tasks:"Lanak",tutorBadge:"IA Tutorea"},as={nextMilestone:"Hurrengo Mugarri Didaktikoa",inDays:"3 egun barru",recommendedToday:"⚡ Gomendatutako saioa: 45 min gaur",weeklyProgress:"Asteko Aurrerapena",blocksCompleted:"bloke osatuta",activeMethod:"Metodologia aktiboa",googleCalendar:"Google Calendar",syncedEvents:"Sinkronizatutako gertaerak zure kontuan",syncAll:"🔄 Dena sinkronizatu Calendar-ekin",syncing:"⏳ Sinkronizatzen...",title:"Asteko Ikasketa Plangintza",autonomousOrg:"Antolakuntza autonomoa",subtitle:"Banakatu ahalegina bloke laburretan epe luzerako barneratzea bermatzeko.",addBlock:"Ikasketa Blokea Gehitu",emptyTitle:"Ez dago programatutako ikasketa blokerik.",emptyDesc:'Sakatu "Ikasketa Blokea Gehitu" zure denbora antolatzen hasteko.',pendingSync:"Sync zain",synced:"Google Calendar",minRecommended:"minutu gomendatuta",modalTitle:"Ikasketa Blokea Gehitu",modalSubtitle:"Planifikatu mugarri bat ikasteko denbora antolatzeko.",fieldActivity:"Jardueraren izenburua",fieldSubject:"Ikasgaia",fieldType:"Mugarri Mota",fieldDate:"Data",fieldTime:"Hasiera Ordua",fieldNotes:"Oharrak edo helburu pertsonala",cancel:"Utzi",save:"Blokea Gorde",types:{study_session:"Ikasketa saioa (45 min)",exam:"Azterketa",assignment_due:"Lanaren entrega"}},ns={bannerTitle:"Ikaskuntza Sokratiko Aktiboaren Esparrua",bannerDesc:"IAk zure pentsamendua gidatzen du galdera gogoetatsuekin. Zure hazkunde intelektuala bermatzeko debekatuta dago soluzio automatikoak lortzea.",bannerBadge:"Tutore Kognitibo Aktiboa",activeRecall:"Berreskuratze Aktiboa",flashcardTitle:"Autoebaluazio Txartela",flashcardSubtitle:"Azaldu zure hitzekin azalpena ikusi aurretik:",toggleHint:"👁️ Erakutsi / Ezkutatu Aztarna Azalgarria",reviewLater:"🔁 Berrikusi geroago",mastered:"✅ Menperatua",conceptsTitle:"Menperatu beharreko Kontzeptuak",consolidated:"Finkatua",toStrengthen:"Sendotzeko",chip1:"❓ Egin iezadazu galdera diagnostiko bat",chip2:"💡 Eman iezadazu aztarna gogoetatsu bat",chip3:"🎯 Bide onetik nabil?",inputPlaceholder:"Idatzi zure arrazoibidea edo zalantza... (Enter bidaltzeko)",send:"Bidali",safeMode:"🔒 Modu segurua: IAk zure ahalegina sustatzen du",openaiCompatible:"OpenAI inferentzia bateragarria",tutorRole:"Tutore Sokratikoa",userRole:"Zu"},rs={title:"Eskolako Lanak eta Proiektuak",driveIntegration:"Google Drive Integrazioa",subtitle:"Faseren araberako laguntzailea lan zorrotzak egiteko, zure egiletza eta ideia propioak bermatuz.",newTask:"Lan Berria",emptyTitle:"Ez duzu lan aktiborik erregistratuta.",emptyDesc:'Sakatu "Lan Berria" entregagarri bat egituratzen hasteko.',dueDate:"Entregatzeko Data",autonomy:"Autonomia",phasesTitle:"Egite Faseak",phases:{planning:"1. Plangintza",research:"2. Ikerketa",writing:"3. Idazketa Propioa",review:"4. Azken Berrikuspena"},driveDocs:"Dokumentuak Google Driven",attachDrive:"＋ Fitxategia Lotu",noDriveFiles:"Oraindik ez dago Driveren fitxategirik lotuta.",driveSync:"Drive Sync",autonomyMeter:"Ikaslearen Autonomia Neurgailua",ownEffort:"propioa",modalTitle:"Lan Berria edo Entregagarria",modalSubtitle:"Sortu fitxa bat zure ikerketa eta dokumentuak antolatzeko.",fieldTitle:"Proiektuaren / Lanaren Izenburua",fieldSubject:"Ikasgaia",fieldDue:"Entregatzeko Data",fieldNotes:"Deskribapena edo helburua",cancel:"Utzi",create:"Lana Sortu"},os={title:"IA Ereduaren Konfigurazioa",subtitle:"Inferentzia lokala edo hodeian OpenAI API estandarrarekin",inferenceType:"Inferentzia Mota",localTitle:"Lokala (Pribatutasun Osoa)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"API Endpoint URL",endpointHint:"Bateragarria /v1/chat/completions eta /v1/models-ekin",modelName:"Ereduaren Izena",apiKey:"API Gakoa (Aukerakoa Lokalean)",apiKeyHint:"Segurtasunez gordeta zure arakatzailean bakarrik (IndexedDB lokala).",socraticMode:"Modu Pedagogiko Sokratikoa",strictHigh:"Zorrotza: Ez du inoiz soluzio zuzenik ematen (100% arrazoitzeko galderak)",strictBalanced:"Orekatua: Tarteko aztarnak eta adibide antzekoak",strictExploratory:"Esploratzailea: Kontzeptu azalpenak eta erronkak",testConnection:"Konexioa Probatu",testing:"Probatzen...",cancel:"Utzi",save:"Aldaketak Gorde"},ss={title:"Google Kontua",subtitle:"OAuth 2.0 Konektoreak • Calendar & Drive",demoBadge:"Demo Modu Aktiboa",realBadge:"Benetako Google Kontua",authorizedResources:"Baimendutako baliabideak",calendarTitle:"Google Calendar",calendarDesc:"Ikasketa blokeen sinkronizazioa",driveTitle:"Google Drive",driveDesc:"Entregagaien dokumentuak lotzea",statusActive:"Aktiboa",statusReal:"Benetako Sinkronizazioa",statusDemo:"Simulazio Lokala",disconnect:"Saioa Itxi / Deskonektatu",modeSelectorTitle:"Aukeratu sarbide metodoa",demoOptionTitle:"Demo Modua (Ebaluaziorako gomendatua)",demoOptionDesc:"Arakatu plataforma osoa aurrez kargatutako datuekin kredentzialik sortu beharrik gabe.",demoButton:"Demo Modua Erabili",realOptionTitle:"Konektatu Benetako Google Kontua (OAuth 2.0)",realOptionDesc:"Sinkronizatu zure gertaerak Google Calendarrean eta lotu zure Google Driveko fitxategiak.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"adib. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Lortu Google Cloud Console > APIs eta Zerbitzuak > Kredentzialak > OAuth bezeroaren IDa.",realButton:"Hasi Saioa Google OAuth-ekin",connectExplanation:"Zure hezkuntza edo Google kontu pertsonala konektatzeak aukera ematen du:",benefit1:"Esportatu zure ikasketa saioak Google Calendarrera.",benefit2:"Erantsi zure oharrak eta zirriborroak Google Drivetik.",benefit3:"Bermatu zure datuak pribatuak eta zure kontrolpean geratzen direla."},is={updateTitle:"Bertsio berria eskuragarri!",updateDesc:"Eguneratu azken hobekuntzak jasotzeko.",updateButton:"Eguneratu"},ls={app:Zo,nav:es,tabs:ts,agenda:as,study:ns,tasks:rs,aiModal:os,authModal:ss,pwa:is},cs={title:"Anaxagoras AI",badge:"STI Cognitiu",tagline:"Aprèn pensant, no copiant",criticalThinking:"Pensament crític actiu • Sense paranys d'IA"},ds={local:"Local",cloud:"Cloud",connectGoogle:"Connectar Google",calendarDriveSync:"Google Calendar i Drive sincronitzats"},us={agenda:"Agenda",study:"Estudi / Repàs",tasks:"Treballs",tutorBadge:"Tutor IA"},ps={nextMilestone:"Pròxima Fita Lectiva",inDays:"En 3 dies",recommendedToday:"⚡ Sessió recomanada: 45 min hui",weeklyProgress:"Progrés Setmanal",blocksCompleted:"blocs completats",activeMethod:"Metodologia activa",googleCalendar:"Google Calendar",syncedEvents:"Esdeveniments sincronitzats al teu compte",syncAll:"🔄 Sincronitzar Tot amb Calendar",syncing:"⏳ Sincronitzant...",title:"Planificació Setmanal d'Estudi",autonomousOrg:"Organització autònoma",subtitle:"Distribuïx l'esforç en blocs curts per a garantir l'assimilació a llarg termini.",addBlock:"Afegir Bloc d'Estudi",emptyTitle:"No hi ha blocs d'estudi programats.",emptyDesc:`Prem en "Afegir Bloc d'Estudi" per a començar a organitzar el teu temps.`,pendingSync:"Pendent sync",synced:"Google Calendar",minRecommended:"minuts recomanats",modalTitle:"Afegir Bloc d'Estudi",modalSubtitle:"Planifica una fita per a organitzar el teu temps d'aprenentatge.",fieldActivity:"Títol de l'activitat",fieldSubject:"Assignatura",fieldType:"Tipus de Fita",fieldDate:"Data",fieldTime:"Hora d'Inici",fieldNotes:"Notes o objectiu personal",cancel:"Cancel·lar",save:"Guardar Bloc",types:{study_session:"Sessió d'estudi (45 min)",exam:"Examen lectiu",assignment_due:"Lliurament de treball"}},fs={bannerTitle:"Marc d'Aprenentatge Socràtic Actiu",bannerDesc:"La IA guia el teu pensament amb preguntes reflexives. Prohibit obtindre solucions automàtiques per a garantir el teu creixement intel·lectual.",bannerBadge:"Tutor Cognitiu Actiu",activeRecall:"Repàs Actiu",flashcardTitle:"Targeta d'Autoavaluació",flashcardSubtitle:"Explica amb les teues paraules abans de vore l'explicació:",toggleHint:"👁️ Mostrar / Ocultar Pista Explicativa",reviewLater:"🔁 Repassar després",mastered:"✅ Dominat",conceptsTitle:"Conceptes a Dominar",consolidated:"Consolidat",toStrengthen:"Per afermar",chip1:"❓ Fes-me una pregunta diagnòstica",chip2:"💡 Dóna'm una pista reflexiva",chip3:"🎯 Vaig per bon camí?",inputPlaceholder:"Escriu el teu raonament o dubte... (Retorn per a enviar)",send:"Enviar",safeMode:"🔒 Mode segur: la IA fomenta el teu propi esforç",openaiCompatible:"Inferència compatible OpenAI",tutorRole:"Tutor Socràtic",userRole:"Tu"},ms={title:"Treballs i Projectes Escolars",driveIntegration:"Integració Google Drive",subtitle:"Assistent per fases per a elaborar treballs rigorosos garantint la teua autoria i idees pròpies.",newTask:"Nou Treball",emptyTitle:"No tens treballs actius registrats.",emptyDesc:'Prem en "Nou Treball" per a començar a estructurar un lliurable.',dueDate:"Data Límit",autonomy:"Autonomia",phasesTitle:"Fases d'Elaboració",phases:{planning:"1. Planificació",research:"2. Investigació",writing:"3. Redacció Pròpia",review:"4. Revisió Final"},driveDocs:"Documents en Google Drive",attachDrive:"＋ Vincular Fitxer",noDriveFiles:"Encara no hi ha fitxers vinculats de Drive.",driveSync:"Drive Sync",autonomyMeter:"Mesurador d'Autonomia de l'Estudiant",ownEffort:"propi",modalTitle:"Nou Treball o Lliurable",modalSubtitle:"Crea una fitxa per a organitzar la teua investigació i documents.",fieldTitle:"Títol del Projecte / Treball",fieldSubject:"Assignatura",fieldDue:"Data de Lliurament",fieldNotes:"Descripció o objectiu",cancel:"Cancel·lar",create:"Crear Treball"},gs={title:"Configuració del Model d'IA",subtitle:"Inferència local o al núvol amb API estàndard OpenAI",inferenceType:"Tipus d'Inferència",localTitle:"Local (Privacitat Total)",localDesc:"Ollama, LM Studio, vLLM",cloudTitle:"Cloud (OpenAI API)",cloudDesc:"OpenAI, Groq, OpenRouter",endpointUrl:"URL de l'Endpoint API",endpointHint:"Compatible amb /v1/chat/completions i /v1/models",modelName:"Nom del Model",apiKey:"Clau d'API (Opcional en Local)",apiKeyHint:"Guardada de forma segura únicament en el teu navegador (IndexedDB local).",socraticMode:"Mode Pedagògic Socràtic",strictHigh:"Estricte: Mai dóna solucions directes (100% preguntes de raonament)",strictBalanced:"Equilibrat: Pistes intermèdies i exemples anàlegs",strictExploratory:"Exploratori: Explicacions conceptuals i desafiaments",testConnection:"Provar Connexió",testing:"Provant...",cancel:"Cancel·lar",save:"Guardar Canvis"},hs={title:"Compte de Google",subtitle:"Connectors OAuth 2.0 • Calendar & Drive",demoBadge:"Mode Demo Actiu",realBadge:"Compte Real Google",authorizedResources:"Recursos autoritzats",calendarTitle:"Google Calendar",calendarDesc:"Sincronització de blocs d'estudi",driveTitle:"Google Drive",driveDesc:"Vinculació de documents de lliurables",statusActive:"Actiu",statusReal:"Sincronització Real",statusDemo:"Simulació Local",disconnect:"Tancar Sessió / Desconnectar",modeSelectorTitle:"Tria el mètode d'accés",demoOptionTitle:"Mode Demo (Recomanat per a avaluació)",demoOptionDesc:"Explora tota la plataforma amb dades precarregades de mostra sense necessitat de credencials.",demoButton:"Utilitzar Mode Demo",realOptionTitle:"Connectar Compte Real de Google (OAuth 2.0)",realOptionDesc:"Sincronitza els teus esdeveniments al teu Google Calendar real i vincula els teus fitxers de Google Drive.",clientIdLabel:"Google OAuth Client ID (Web Application)",clientIdPlaceholder:"ex. 123456789-abc.apps.googleusercontent.com",clientIdHelp:"Aconseguix-lo en Google Cloud Console > APIs i Servicis > Credencials > ID de client d'OAuth.",realButton:"Iniciar Sessió amb Google OAuth",connectExplanation:"Connectar el teu compte educatiu o personal de Google permet:",benefit1:"Exportar les teues sessions d'estudi a Google Calendar.",benefit2:"Adjuntar els teus apunts i esborranys des de Google Drive.",benefit3:"Garantir que les teues dades romanguen privades i sota el teu control."},bs={updateTitle:"Nova versió disponible!",updateDesc:"Actualitza per a rebre les últimes millores.",updateButton:"Actualitzar"},vs={app:cs,nav:ds,tabs:us,agenda:ps,study:fs,tasks:ms,aiModal:gs,authModal:hs,pwa:bs},gr="anaxagoras_lang";class ys{constructor(){ke(this,"initialized",!1);ke(this,"listeners",[])}async init(){if(this.initialized)return;const a=localStorage.getItem(gr)||"es";await Ee.init({lng:a,fallbackLng:"es",debug:!1,resources:{es:{translation:jo},ca:{translation:Ko},ga:{translation:Xo},eu:{translation:ls},va:{translation:vs}},interpolation:{escapeValue:!1}}),this.initialized=!0}t(a,o){return Ee.t(a,o)}async changeLanguage(a){await Ee.changeLanguage(a),localStorage.setItem(gr,a);for(const o of this.listeners)o(a)}getCurrentLanguage(){return Ee.language||"es"}subscribe(a){return this.listeners.push(a),()=>{this.listeners=this.listeners.filter(o=>o!==a)}}}const Ut=new ys,L=(f,a)=>Ut.t(f,a);class xs{constructor(){ke(this,"registration",null);ke(this,"updateWaiting",!1)}hasUpdateWaiting(){return this.updateWaiting}async register(a){if(!("serviceWorker"in navigator)){console.log("[PWA] Service Worker no soportado en este navegador.");return}try{const s=await navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"});this.registration=s,s.waiting&&(this.updateWaiting=!0,this.notifyUpdate(a)),s.addEventListener("updatefound",()=>{const d=s.installing;d&&d.addEventListener("statechange",()=>{d.state==="installed"&&navigator.serviceWorker.controller&&(this.updateWaiting=!0,this.notifyUpdate(a))})});let l=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{l||(l=!0,window.location.reload())}),s.update().catch(()=>{}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&s.update().catch(()=>{})}),window.addEventListener("focus",()=>{s.update().catch(()=>{})}),window.addEventListener("online",()=>{s.update().catch(()=>{})}),setInterval(()=>{s.update().catch(()=>{})},1e3*60*5)}catch(o){console.warn("[PWA] Error registrando Service Worker:",o)}}notifyUpdate(a){a!=null&&a.onUpdateAvailable?a.onUpdateAvailable(()=>this.applyUpdate()):this.showDefaultUpdateToast()}applyUpdate(){this.registration&&this.registration.waiting?this.registration.waiting.postMessage({type:"SKIP_WAITING"}):window.location.reload()}async checkForUpdates(a=!1){if(!this.registration){a&&alert("El servicio de actualización no está activo en este navegador.");return}let o=null;a&&(o=document.createElement("div"),o.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse",o.innerHTML="<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>",document.body.appendChild(o));try{await this.registration.update();const s=await fetch(`./version.json?t=${Date.now()}`,{cache:"no-store"});if(s.ok){const l=await s.json();console.log("[PWA] Versión desplegada en servidor:",l)}if(a)if(await new Promise(l=>setTimeout(l,900)),o==null||o.remove(),this.updateWaiting)this.showDefaultUpdateToast();else{const l=document.createElement("div");l.className="fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2",l.innerHTML="<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>",document.body.appendChild(l),setTimeout(()=>l.remove(),3500)}}catch{o==null||o.remove(),a&&alert("No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.")}}async forceHardReset(){try{const a=await navigator.serviceWorker.getRegistrations();for(const s of a)await s.unregister();const o=await caches.keys();for(const s of o)await caches.delete(s)}catch(a){console.warn("[PWA] Error en hard reset:",a)}window.location.reload()}showDefaultUpdateToast(){var o,s;if(document.getElementById("pwa-update-toast"))return;const a=document.createElement("div");a.id="pwa-update-toast",a.className="fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md",a.innerHTML=`
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
    `,document.body.appendChild(a),(o=a.querySelector("#btn-pwa-apply"))==null||o.addEventListener("click",()=>{this.applyUpdate()}),(s=a.querySelector("#btn-pwa-dismiss"))==null||s.addEventListener("click",()=>{a.remove()})}}const bn=new xs;var ws=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ss(f){return f&&f.__esModule&&Object.prototype.hasOwnProperty.call(f,"default")?f.default:f}var Ca={exports:{}},ks=Ca.exports,hr;function Cs(){return hr||(hr=1,(function(f,a){((o,s)=>{f.exports=s()})(ks,function(){var o=function(e,t){return(o=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(n,r){n.__proto__=r}:function(n,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}))(e,t)},s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function l(e,t,n){for(var r,i=0,c=t.length;i<c;i++)!r&&i in t||((r=r||Array.prototype.slice.call(t,0,i))[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}var d=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:ws,u=Object.keys,g=Array.isArray;function h(e,t){return typeof t=="object"&&u(t).forEach(function(n){e[n]=t[n]}),e}typeof Promise>"u"||d.Promise||(d.Promise=Promise);var b=Object.getPrototypeOf,k={}.hasOwnProperty;function P(e,t){return k.call(e,t)}function $(e,t){typeof t=="function"&&(t=t(b(e))),(typeof Reflect>"u"?u:Reflect.ownKeys)(t).forEach(function(n){I(e,n,t[n])})}var O=Object.defineProperty;function I(e,t,n,r){O(e,t,h(n&&P(n,"get")&&typeof n.get=="function"?{get:n.get,set:n.set,configurable:!0}:{value:n,configurable:!0,writable:!0},r))}function V(e){return{from:function(t){return e.prototype=Object.create(t.prototype),I(e.prototype,"constructor",e),{extend:$.bind(null,e.prototype)}}}}var G=Object.getOwnPropertyDescriptor,Q=[].slice;function oe(e,t,n){return Q.call(e,t,n)}function ge(e,t){return t(e)}function F(e){if(!e)throw new Error("Assertion Failed")}function z(e){d.setImmediate?setImmediate(e):setTimeout(e,0)}function X(e,t){if(typeof t=="string"&&P(e,t))return e[t];if(!t)return e;if(typeof t!="string"){for(var n=[],r=0,i=t.length;r<i;++r){var c=X(e,t[r]);n.push(c)}return n}var p,m=t.indexOf(".");return m===-1||(p=e[t.substr(0,m)])==null?void 0:X(p,t.substr(m+1))}function te(e,t,n){if(e&&t!==void 0&&!("isFrozen"in Object&&Object.isFrozen(e)))if(typeof t!="string"&&"length"in t){F(typeof n!="string"&&"length"in n);for(var r=0,i=t.length;r<i;++r)te(e,t[r],n[r])}else{var c=t.indexOf(".");if(c!==-1){var p=t.substr(0,c),c=t.substr(c+1);if(c==="")n===void 0?g(e)&&!isNaN(parseInt(p))?e.splice(p,1):delete e[p]:e[p]=n;else{var m=e[p];if(!m||!P(e,p)){if(n===void 0)return;m=e[p]={}}te(m,c,n)}}else n===void 0?g(e)&&!isNaN(parseInt(t))?e.splice(t,1):delete e[t]:e[t]=n}}function fe(e){var t,n={};for(t in e)P(e,t)&&(n[t]=e[t]);return n}var H=[].concat;function W(e){return H.apply([],e)}var Te="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(W([8,16,32,64].map(function(e){return["Int","Uint","Float"].map(function(t){return t+e+"Array"})}))).filter(function(e){return d[e]}),le=new Set(Te.map(function(e){return d[e]})),ve=null;function me(e){return ve=new WeakMap,e=(function t(n){if(!n||typeof n!="object")return n;var r=ve.get(n);if(r)return r;if(g(n)){r=[],ve.set(n,r);for(var i=0,c=n.length;i<c;++i)r.push(t(n[i]))}else if(le.has(n.constructor))r=n;else{var p,m=b(n);for(p in r=m===Object.prototype?{}:Object.create(m),ve.set(n,r),n)P(n,p)&&(r[p]=t(n[p]))}return r})(e),ve=null,e}var je={}.toString;function Xe(e){return je.call(e).slice(8,-1)}var Ie=typeof Symbol<"u"?Symbol.iterator:"@@iterator",qe=typeof Ie=="symbol"?function(e){var t;return e!=null&&(t=e[Ie])&&t.apply(e)}:function(){return null};function Oe(e,t){t=e.indexOf(t),0<=t&&e.splice(t,1)}var Ne={};function ze(e){var t,n,r,i;if(arguments.length===1){if(g(e))return e.slice();if(this===Ne&&typeof e=="string")return[e];if(i=qe(e))for(n=[];!(r=i.next()).done;)n.push(r.value);else{if(e==null)return[e];if(typeof(t=e.length)!="number")return[e];for(n=new Array(t);t--;)n[t]=e[t]}}else for(t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return n}var Pe=typeof Symbol<"u"?function(e){return e[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},Te=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],Me=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(Te),ot={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Ue(e,t){this.name=e,this.message=t}function Tt(e,t){return e+". Errors: "+Object.keys(t).map(function(n){return t[n].toString()}).filter(function(n,r,i){return i.indexOf(n)===r}).join(`
`)}function Qt(e,t,n,r){this.failures=t,this.failedKeys=r,this.successCount=n,this.message=Tt(e,t)}function vt(e,t){this.name="BulkError",this.failures=Object.keys(t).map(function(n){return t[n]}),this.failuresByPos=t,this.message=Tt(e,this.failures)}V(Ue).from(Error).extend({toString:function(){return this.name+": "+this.message}}),V(Qt).from(Ue),V(vt).from(Ue);var _a=Me.reduce(function(e,t){return e[t]=t+"Error",e},{}),Cr=Ue,ee=Me.reduce(function(e,t){var n=t+"Error";function r(i,c){this.name=n,i?typeof i=="string"?(this.message="".concat(i).concat(c?`
 `+c:""),this.inner=c||null):typeof i=="object"&&(this.message="".concat(i.name," ").concat(i.message),this.inner=i):(this.message=ot[t]||n,this.inner=null)}return V(r).from(Cr),e[t]=r,e},{}),xn=(ee.Syntax=SyntaxError,ee.Type=TypeError,ee.Range=RangeError,Te.reduce(function(e,t){return e[t+"Error"]=ee[t],e},{}));Te=Me.reduce(function(e,t){return["Syntax","Type","Range"].indexOf(t)===-1&&(e[t+"Error"]=ee[t]),e},{});function he(){}function Dt(e){return e}function Ar(e,t){return e==null||e===Dt?t:function(n){return t(e(n))}}function st(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}function Er(e,t){return e===he?t:function(){var n=e.apply(this,arguments),r=(n!==void 0&&(arguments[0]=n),this.onsuccess),i=this.onerror,c=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return r&&(this.onsuccess=this.onsuccess?st(r,this.onsuccess):r),i&&(this.onerror=this.onerror?st(i,this.onerror):i),c!==void 0?c:n}}function Pr(e,t){return e===he?t:function(){e.apply(this,arguments);var n=this.onsuccess,r=this.onerror;this.onsuccess=this.onerror=null,t.apply(this,arguments),n&&(this.onsuccess=this.onsuccess?st(n,this.onsuccess):n),r&&(this.onerror=this.onerror?st(r,this.onerror):r)}}function Tr(e,t){return e===he?t:function(){var n=e.apply(this,arguments),r=(h(arguments[0],n),this.onsuccess),i=this.onerror,c=(this.onsuccess=null,this.onerror=null,t.apply(this,arguments));return r&&(this.onsuccess=this.onsuccess?st(r,this.onsuccess):r),i&&(this.onerror=this.onerror?st(i,this.onerror):i),n===void 0?c===void 0?void 0:c:h(n,c)}}function Dr(e,t){return e===he?t:function(){return t.apply(this,arguments)!==!1&&e.apply(this,arguments)}}function $a(e,t){return e===he?t:function(){var n=e.apply(this,arguments);if(n&&typeof n.then=="function"){for(var r=this,i=arguments.length,c=new Array(i);i--;)c[i]=arguments[i];return n.then(function(){return t.apply(r,c)})}return t.apply(this,arguments)}}Te.ModifyError=Qt,Te.DexieError=Ue,Te.BulkError=vt;var Fe=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function wn(e){Fe=e}var _t={},Sn=100,$t=typeof Promise>"u"?[]:(Me=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[$t=crypto.subtle.digest("SHA-512",new Uint8Array([0])),b($t),Me]:[Me,b(Me),Me]),Me=$t[0],At=$t[1],At=At&&At.then,it=Me&&Me.constructor,ja=!!$t[2],jt=function(e,t){Lt.push([e,t]),Yt&&(queueMicrotask($r),Yt=!1)},La=!0,Yt=!0,lt=[],Jt=[],Ia=Dt,We={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:he,pgp:!1,env:{},finalize:he},Z=We,Lt=[],ct=0,Xt=[];function U(e){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var t=this._PSD=Z;if(typeof e!="function"){if(e!==_t)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&Ma(this,this._value)}else this._state=null,this._value=null,++t.ref,(function n(r,i){try{i(function(c){if(r._state===null){if(c===r)throw new TypeError("A promise cannot be resolved with itself.");var p=r._lib&&yt();c&&typeof c.then=="function"?n(r,function(m,y){c instanceof U?c._then(m,y):c.then(m,y)}):(r._state=!0,r._value=c,Cn(r)),p&&xt()}},Ma.bind(null,r))}catch(c){Ma(r,c)}})(this,e)}var Oa={get:function(){var e=Z,t=aa;function n(r,i){var c=this,p=!e.global&&(e!==Z||t!==aa),m=p&&!et(),y=new U(function(T,w){Ra(c,new kn(En(r,e,p,m),En(i,e,p,m),T,w,e))});return this._consoleTask&&(y._consoleTask=this._consoleTask),y}return n.prototype=_t,n},set:function(e){I(this,"then",e&&e.prototype===_t?Oa:{get:function(){return e},set:Oa.set})}};function kn(e,t,n,r,i){this.onFulfilled=typeof e=="function"?e:null,this.onRejected=typeof t=="function"?t:null,this.resolve=n,this.reject=r,this.psd=i}function Ma(e,t){var n,r;Jt.push(t),e._state===null&&(n=e._lib&&yt(),t=Ia(t),e._state=!1,e._value=t,r=e,lt.some(function(i){return i._value===r._value})||lt.push(r),Cn(e),n)&&xt()}function Cn(e){var t=e._listeners;e._listeners=[];for(var n=0,r=t.length;n<r;++n)Ra(e,t[n]);var i=e._PSD;--i.ref||i.finalize(),ct===0&&(++ct,jt(function(){--ct==0&&Ba()},[]))}function Ra(e,t){if(e._state===null)e._listeners.push(t);else{var n=e._state?t.onFulfilled:t.onRejected;if(n===null)return(e._state?t.resolve:t.reject)(e._value);++t.psd.ref,++ct,jt(_r,[n,e,t])}}function _r(e,t,n){try{var r,i=t._value;!t._state&&Jt.length&&(Jt=[]),r=Fe&&t._consoleTask?t._consoleTask.run(function(){return e(i)}):e(i),t._state||Jt.indexOf(i)!==-1||(c=>{for(var p=lt.length;p;)if(lt[--p]._value===c._value)return lt.splice(p,1)})(t),n.resolve(r)}catch(c){n.reject(c)}finally{--ct==0&&Ba(),--n.psd.ref||n.psd.finalize()}}function $r(){dt(We,function(){yt()&&xt()})}function yt(){var e=La;return Yt=La=!1,e}function xt(){var e,t,n;do for(;0<Lt.length;)for(e=Lt,Lt=[],n=e.length,t=0;t<n;++t){var r=e[t];r[0].apply(null,r[1])}while(0<Lt.length);Yt=La=!0}function Ba(){for(var e=lt,t=(lt=[],e.forEach(function(r){r._PSD.onunhandled.call(null,r._value,r)}),Xt.slice(0)),n=t.length;n;)t[--n]()}function Zt(e){return new U(_t,!1,e)}function xe(e,t){var n=Z;return function(){var r=yt(),i=Z;try{return tt(n,!0),e.apply(this,arguments)}catch(c){t&&t(c)}finally{tt(i,!1),r&&xt()}}}$(U.prototype,{then:Oa,_then:function(e,t){Ra(this,new kn(null,null,e,t,Z))},catch:function(e){var t,n;return arguments.length===1?this.then(null,e):(t=e,n=arguments[1],typeof t=="function"?this.then(null,function(r){return(r instanceof t?n:Zt)(r)}):this.then(null,function(r){return(r&&r.name===t?n:Zt)(r)}))},finally:function(e){return this.then(function(t){return U.resolve(e()).then(function(){return t})},function(t){return U.resolve(e()).then(function(){return Zt(t)})})},timeout:function(e,t){var n=this;return e<1/0?new U(function(r,i){var c=setTimeout(function(){return i(new ee.Timeout(t))},e);n.then(r,i).finally(clearTimeout.bind(null,c))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&I(U.prototype,Symbol.toStringTag,"Dexie.Promise"),We.env=An(),$(U,{all:function(){var e=ze.apply(null,arguments).map(na);return new U(function(t,n){e.length===0&&t([]);var r=e.length;e.forEach(function(i,c){return U.resolve(i).then(function(p){e[c]=p,--r||t(e)},n)})})},resolve:function(e){return e instanceof U?e:e&&typeof e.then=="function"?new U(function(t,n){e.then(t,n)}):new U(_t,!0,e)},reject:Zt,race:function(){var e=ze.apply(null,arguments).map(na);return new U(function(t,n){e.map(function(r){return U.resolve(r).then(t,n)})})},PSD:{get:function(){return Z},set:function(e){return Z=e}},totalEchoes:{get:function(){return aa}},newPSD:Ze,usePSD:dt,scheduler:{get:function(){return jt},set:function(e){jt=e}},rejectionMapper:{get:function(){return Ia},set:function(e){Ia=e}},follow:function(e,t){return new U(function(n,r){return Ze(function(i,c){var p=Z;p.unhandleds=[],p.onunhandled=c,p.finalize=st(function(){var m,y=this;m=function(){y.unhandleds.length===0?i():c(y.unhandleds[0])},Xt.push(function T(){m(),Xt.splice(Xt.indexOf(T),1)}),++ct,jt(function(){--ct==0&&Ba()},[])},p.finalize),e()},t,n,r)})}}),it&&(it.allSettled&&I(U,"allSettled",function(){var e=ze.apply(null,arguments).map(na);return new U(function(t){e.length===0&&t([]);var n=e.length,r=new Array(n);e.forEach(function(i,c){return U.resolve(i).then(function(p){return r[c]={status:"fulfilled",value:p}},function(p){return r[c]={status:"rejected",reason:p}}).then(function(){return--n||t(r)})})})}),it.any&&typeof AggregateError<"u"&&I(U,"any",function(){var e=ze.apply(null,arguments).map(na);return new U(function(t,n){e.length===0&&n(new AggregateError([]));var r=e.length,i=new Array(r);e.forEach(function(c,p){return U.resolve(c).then(function(m){return t(m)},function(m){i[p]=m,--r||n(new AggregateError(i))})})})}),it.withResolvers)&&(U.withResolvers=it.withResolvers);var Ce={awaits:0,echoes:0,id:0},jr=0,ea=[],ta=0,aa=0,Lr=0;function Ze(e,p,n,r){var i=Z,c=Object.create(i),p=(c.parent=i,c.ref=0,c.global=!1,c.id=++Lr,We.env,c.env=ja?{Promise:U,PromiseProp:{value:U,configurable:!0,writable:!0},all:U.all,race:U.race,allSettled:U.allSettled,any:U.any,resolve:U.resolve,reject:U.reject}:{},p&&h(c,p),++i.ref,c.finalize=function(){--this.parent.ref||this.parent.finalize()},dt(c,e,n,r));return c.ref===0&&c.finalize(),p}function wt(){return Ce.id||(Ce.id=++jr),++Ce.awaits,Ce.echoes+=Sn,Ce.id}function et(){return!!Ce.awaits&&(--Ce.awaits==0&&(Ce.id=0),Ce.echoes=Ce.awaits*Sn,!0)}function na(e){return Ce.echoes&&e&&e.constructor===it?(wt(),e.then(function(t){return et(),t},function(t){return et(),we(t)})):e}function Ir(){var e=ea[ea.length-1];ea.pop(),tt(e,!1)}function tt(e,t){var n,r,i=Z;(t?!Ce.echoes||ta++&&e===Z:!ta||--ta&&e===Z)||queueMicrotask(t?(function(c){++aa,Ce.echoes&&--Ce.echoes!=0||(Ce.echoes=Ce.awaits=Ce.id=0),ea.push(Z),tt(c,!0)}).bind(null,e):Ir),e!==Z&&(Z=e,i===We&&(We.env=An()),ja)&&(n=We.env.Promise,r=e.env,i.global||e.global)&&(Object.defineProperty(d,"Promise",r.PromiseProp),n.all=r.all,n.race=r.race,n.resolve=r.resolve,n.reject=r.reject,r.allSettled&&(n.allSettled=r.allSettled),r.any)&&(n.any=r.any)}function An(){var e=d.Promise;return ja?{Promise:e,PromiseProp:Object.getOwnPropertyDescriptor(d,"Promise"),all:e.all,race:e.race,allSettled:e.allSettled,any:e.any,resolve:e.resolve,reject:e.reject}:{}}function dt(e,t,n,r,i){var c=Z;try{return tt(e,!0),t(n,r,i)}finally{tt(c,!1)}}function En(e,t,n,r){return typeof e!="function"?e:function(){var i=Z;n&&wt(),tt(t,!0);try{return e.apply(this,arguments)}finally{tt(i,!1),r&&queueMicrotask(et)}}}function qa(e){Promise===it&&Ce.echoes===0?ta===0?e():enqueueNativeMicroTask(e):setTimeout(e,0)}(""+At).indexOf("[native code]")===-1&&(wt=et=he);var we=U.reject,ut="￿",Qe="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",Pn="String expected.",ra="__dbnames",za="readonly",Na="readwrite";function pt(e,t){return e?t?function(){return e.apply(this,arguments)&&t.apply(this,arguments)}:e:t}var Tn={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function oa(e){return typeof e!="string"||/\./.test(e)?function(t){return t}:function(t){return t[e]===void 0&&e in t&&delete(t=me(t))[e],t}}function Dn(){throw ee.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function ue(e,t){try{var n=_n(e),r=_n(t);if(n!==r)return n==="Array"?1:r==="Array"?-1:n==="binary"?1:r==="binary"?-1:n==="string"?1:r==="string"?-1:n==="Date"?1:r!=="Date"?NaN:-1;switch(n){case"number":case"Date":case"string":return t<e?1:e<t?-1:0;case"binary":for(var i=$n(e),c=$n(t),p=i.length,m=c.length,y=p<m?p:m,T=0;T<y;++T)if(i[T]!==c[T])return i[T]<c[T]?-1:1;return p===m?0:p<m?-1:1;case"Array":for(var w=e,v=t,x=w.length,E=v.length,C=x<E?x:E,S=0;S<C;++S){var A=ue(w[S],v[S]);if(A!==0)return A}return x===E?0:x<E?-1:1}}catch{}return NaN}function _n(e){var t=typeof e;return t=="object"&&(ArrayBuffer.isView(e)||(t=Xe(e))==="ArrayBuffer")?"binary":t}function $n(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}function sa(e,t,n){var r=e.schema.yProps;return r?(t&&0<n.numFailures&&(t=t.filter(function(i,c){return!n.failures[c]})),Promise.all(r.map(function(i){return i=i.updatesTable,t?e.db.table(i).where("k").anyOf(t).delete():e.db.table(i).clear()})).then(function(){return n})):n}jn.prototype.execute=function(e){var t=this["@@propmod"];if(t.add!==void 0){var n=t.add;if(g(n))return l(l([],g(e)?e:[],!0),n).sort();if(typeof n=="number")return(Number(e)||0)+n;if(typeof n=="bigint")try{return BigInt(e)+n}catch{return BigInt(0)+n}throw new TypeError("Invalid term ".concat(n))}if(t.remove!==void 0){var r=t.remove;if(g(r))return g(e)?e.filter(function(i){return!r.includes(i)}).sort():[];if(typeof r=="number")return Number(e)-r;if(typeof r=="bigint")try{return BigInt(e)-r}catch{return BigInt(0)-r}throw new TypeError("Invalid subtrahend ".concat(r))}return n=(n=t.replacePrefix)==null?void 0:n[0],n&&typeof e=="string"&&e.startsWith(n)?t.replacePrefix[1]+e.substring(n.length):e};var It=jn;function jn(e){this["@@propmod"]=e}function Ln(e,t){for(var n=u(t),r=n.length,i=!1,c=0;c<r;++c){var p=n[c],m=t[p],y=X(e,p);m instanceof It?(te(e,p,m.execute(y)),i=!0):y!==m&&(te(e,p,m),i=!0)}return i}be.prototype._trans=function(e,t,n){var r=this._tx||Z.trans,i=this.name,c=Fe&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(e==="readonly"?"read":"write"," ").concat(this.name));function p(T,w,v){if(v.schema[i])return t(v.idbtrans,v);throw new ee.NotFound("Table "+i+" not part of transaction")}var m=yt();try{var y=r&&r.db._novip===this.db._novip?r===Z.trans?r._promise(e,p,n):Ze(function(){return r._promise(e,p,n)},{trans:r,transless:Z.transless||Z}):(function T(w,v,x,E){if(w.idbdb&&(w._state.openComplete||Z.letThrough||w._vip)){var C=w._createTransaction(v,x,w._dbSchema);try{C.create(),w._state.PR1398_maxLoop=3}catch(S){return S.name===_a.InvalidState&&w.isOpen()&&0<--w._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),w.close({disableAutoOpen:!1}),w.open().then(function(){return T(w,v,x,E)})):we(S)}return C._promise(v,function(S,A){return Ze(function(){return Z.trans=C,E(S,A,C)})}).then(function(S){if(v==="readwrite")try{C.idbtrans.commit()}catch{}return v==="readonly"?S:C._completion.then(function(){return S})})}if(w._state.openComplete)return we(new ee.DatabaseClosed(w._state.dbOpenError));if(!w._state.isBeingOpened){if(!w._state.autoOpen)return we(new ee.DatabaseClosed);w.open().catch(he)}return w._state.dbReadyPromise.then(function(){return T(w,v,x,E)})})(this.db,e,[this.name],p);return c&&(y._consoleTask=c,y=y.catch(function(T){return console.trace(T),we(T)})),y}finally{m&&xt()}},be.prototype.get=function(e,t){var n=this;return e&&e.constructor===Object?this.where(e).first(t):e==null?we(new ee.Type("Invalid argument to Table.get()")):this._trans("readonly",function(r){return n.core.get({trans:r,key:e}).then(function(i){return n.hook.reading.fire(i)})}).then(t)},be.prototype.where=function(e){if(typeof e=="string")return new this.db.WhereClause(this,e);if(g(e))return new this.db.WhereClause(this,"[".concat(e.join("+"),"]"));var t=u(e);if(t.length===1)return this.where(t[0]).equals(e[t[0]]);var n=this.schema.indexes.concat(this.schema.primKey).filter(function(m){if(m.compound&&t.every(function(T){return 0<=m.keyPath.indexOf(T)})){for(var y=0;y<t.length;++y)if(t.indexOf(m.keyPath[y])===-1)return!1;return!0}return!1}).sort(function(m,y){return m.keyPath.length-y.keyPath.length})[0];if(n&&this.db._maxKey!==ut)return p=n.keyPath.slice(0,t.length),this.where(p).equals(p.map(function(m){return e[m]}));!n&&Fe&&console.warn("The query ".concat(JSON.stringify(e)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(t.join("+"),"]"));var r=this.schema.idxByName;function i(m,y){return ue(m,y)===0}var p=t.reduce(function(w,y){var T=w[0],w=w[1],v=r[y],x=e[y];return[T||v,T||!v?pt(w,v&&v.multi?function(E){return E=X(E,y),g(E)&&E.some(function(C){return i(x,C)})}:function(E){return i(x,X(E,y))}):w]},[null,null]),c=p[0],p=p[1];return c?this.where(c.name).equals(e[c.keyPath]).filter(p):n?this.filter(p):this.where(t).equals("")},be.prototype.filter=function(e){return this.toCollection().and(e)},be.prototype.count=function(e){return this.toCollection().count(e)},be.prototype.offset=function(e){return this.toCollection().offset(e)},be.prototype.limit=function(e){return this.toCollection().limit(e)},be.prototype.each=function(e){return this.toCollection().each(e)},be.prototype.toArray=function(e){return this.toCollection().toArray(e)},be.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},be.prototype.orderBy=function(e){return new this.db.Collection(new this.db.WhereClause(this,g(e)?"[".concat(e.join("+"),"]"):e))},be.prototype.reverse=function(){return this.toCollection().reverse()},be.prototype.mapToClass=function(e){for(var t=this.db,n=this.name,r=((this.schema.mappedClass=e).prototype instanceof Dn&&(e=(p=>{var m=w,y=p;if(typeof y!="function"&&y!==null)throw new TypeError("Class extends value "+String(y)+" is not a constructor or null");function T(){this.constructor=m}function w(){return p!==null&&p.apply(this,arguments)||this}return o(m,y),m.prototype=y===null?Object.create(y):(T.prototype=y.prototype,new T),Object.defineProperty(w.prototype,"db",{get:function(){return t},enumerable:!1,configurable:!0}),w.prototype.table=function(){return n},w})(e)),new Set),i=e.prototype;i;i=b(i))Object.getOwnPropertyNames(i).forEach(function(p){return r.add(p)});function c(p){if(!p)return p;var m,y=Object.create(e.prototype);for(m in p)if(!r.has(m))try{y[m]=p[m]}catch{}return y}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=c,this.hook("reading",c),e},be.prototype.defineClass=function(){return this.mapToClass(function(e){h(this,e)})},be.prototype.add=function(e,t){var n=this,r=this.schema.primKey,i=r.auto,c=r.keyPath,p=e;return c&&i&&(p=oa(c)(e)),this._trans("readwrite",function(m){return n.core.mutate({trans:m,type:"add",keys:t!=null?[t]:null,values:[p]})}).then(function(m){return m.numFailures?U.reject(m.failures[0]):m.lastResult}).then(function(m){if(c)try{te(e,c,m)}catch{}return m})},be.prototype.upsert=function(e,t){var n=this,r=this.schema.primKey.keyPath;return this._trans("readwrite",function(i){return n.core.get({trans:i,key:e}).then(function(c){var p=c??{};return Ln(p,t),r&&te(p,r,e),n.core.mutate({trans:i,type:"put",values:[p],keys:[e],upsert:!0,updates:{keys:[e],changeSpecs:[t]}}).then(function(m){return m.numFailures?U.reject(m.failures[0]):!!c})})})},be.prototype.update=function(e,t){return typeof e!="object"||g(e)?this.where(":id").equals(e).modify(t):(e=X(e,this.schema.primKey.keyPath))===void 0?we(new ee.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(e).modify(t)},be.prototype.put=function(e,t){var n=this,r=this.schema.primKey,i=r.auto,c=r.keyPath,p=e;return c&&i&&(p=oa(c)(e)),this._trans("readwrite",function(m){return n.core.mutate({trans:m,type:"put",values:[p],keys:t!=null?[t]:null})}).then(function(m){return m.numFailures?U.reject(m.failures[0]):m.lastResult}).then(function(m){if(c)try{te(e,c,m)}catch{}return m})},be.prototype.delete=function(e){var t=this;return this._trans("readwrite",function(n){return t.core.mutate({trans:n,type:"delete",keys:[e]}).then(function(r){return sa(t,[e],r)}).then(function(r){return r.numFailures?U.reject(r.failures[0]):void 0})})},be.prototype.clear=function(){var e=this;return this._trans("readwrite",function(t){return e.core.mutate({trans:t,type:"deleteRange",range:Tn}).then(function(n){return sa(e,null,n)})}).then(function(t){return t.numFailures?U.reject(t.failures[0]):void 0})},be.prototype.bulkGet=function(e){var t=this;return this._trans("readonly",function(n){return t.core.getMany({keys:e,trans:n}).then(function(r){return r.map(function(i){return t.hook.reading.fire(i)})})})},be.prototype.bulkAdd=function(e,t,n){var r=this,i=Array.isArray(t)?t:void 0,c=(n=n||(i?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(p){var m=r.schema.primKey,T=m.auto,m=m.keyPath;if(m&&i)throw new ee.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(i&&i.length!==e.length)throw new ee.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,T=m&&T?e.map(oa(m)):e;return r.core.mutate({trans:p,type:"add",keys:i,values:T,wantResults:c}).then(function(w){var v=w.numFailures,x=w.failures;if(v===0)return c?w.results:w.lastResult;throw new vt("".concat(r.name,".bulkAdd(): ").concat(v," of ").concat(y," operations failed"),x)})})},be.prototype.bulkPut=function(e,t,n){var r=this,i=Array.isArray(t)?t:void 0,c=(n=n||(i?void 0:t))?n.allKeys:void 0;return this._trans("readwrite",function(p){var m=r.schema.primKey,T=m.auto,m=m.keyPath;if(m&&i)throw new ee.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(i&&i.length!==e.length)throw new ee.InvalidArgument("Arguments objects and keys must have the same length");var y=e.length,T=m&&T?e.map(oa(m)):e;return r.core.mutate({trans:p,type:"put",keys:i,values:T,wantResults:c}).then(function(w){var v=w.numFailures,x=w.failures;if(v===0)return c?w.results:w.lastResult;throw new vt("".concat(r.name,".bulkPut(): ").concat(v," of ").concat(y," operations failed"),x)})})},be.prototype.bulkUpdate=function(e){var t=this,n=this.core,r=e.map(function(p){return p.key}),i=e.map(function(p){return p.changes}),c=[];return this._trans("readwrite",function(p){return n.getMany({trans:p,keys:r,cache:"clone"}).then(function(m){var y=[],T=[],w=(e.forEach(function(v,x){var E=v.key,C=v.changes,S=m[x];if(S){for(var A=0,_=Object.keys(C);A<_.length;A++){var D=_[A],j=C[D];if(D===t.schema.primKey.keyPath){if(ue(j,E)!==0)throw new ee.Constraint("Cannot update primary key in bulkUpdate()")}else te(S,D,j)}c.push(x),y.push(E),T.push(S)}}),y.length);return n.mutate({trans:p,type:"put",keys:y,values:T,updates:{keys:r,changeSpecs:i}}).then(function(v){var x=v.numFailures,E=v.failures;if(x===0)return w;for(var C=0,S=Object.keys(E);C<S.length;C++){var A,_=S[C],D=c[Number(_)];D!=null&&(A=E[_],delete E[_],E[D]=A)}throw new vt("".concat(t.name,".bulkUpdate(): ").concat(x," of ").concat(w," operations failed"),E)})})})},be.prototype.bulkDelete=function(e){var t=this,n=e.length;return this._trans("readwrite",function(r){return t.core.mutate({trans:r,type:"delete",keys:e}).then(function(i){return sa(t,e,i)})}).then(function(r){var i=r.numFailures,c=r.failures;if(i===0)return r.lastResult;throw new vt("".concat(t.name,".bulkDelete(): ").concat(i," of ").concat(n," operations failed"),c)})};var In=be;function be(){}function Ot(e){function t(p,m){if(m){for(var y=arguments.length,T=new Array(y-1);--y;)T[y-1]=arguments[y];return n[p].subscribe.apply(null,T),e}if(typeof p=="string")return n[p]}var n={};t.addEventType=c;for(var r=1,i=arguments.length;r<i;++r)c(arguments[r]);return t;function c(p,m,y){var T,w;if(typeof p!="object")return m=m||Dr,w={subscribers:[],fire:y=y||he,subscribe:function(v){w.subscribers.indexOf(v)===-1&&(w.subscribers.push(v),w.fire=m(w.fire,v))},unsubscribe:function(v){w.subscribers=w.subscribers.filter(function(x){return x!==v}),w.fire=w.subscribers.reduce(m,y)}},n[p]=t[p]=w;u(T=p).forEach(function(v){var x=T[v];if(g(x))c(v,T[v][0],T[v][1]);else{if(x!=="asap")throw new ee.InvalidArgument("Invalid event config");var E=c(v,Dt,function(){for(var C=arguments.length,S=new Array(C);C--;)S[C]=arguments[C];E.subscribers.forEach(function(A){z(function(){A.apply(null,S)})})})}})}}function Mt(e,t){return V(t).from({prototype:e}),t}function St(e,t){return!(e.filter||e.algorithm||e.or)&&(t?e.justLimit:!e.replayFilter)}function Ka(e,t){e.filter=pt(e.filter,t)}function Fa(e,t,n){var r=e.replayFilter;e.replayFilter=r?function(){return pt(r(),t())}:t,e.justLimit=n&&!r}function ia(e,t){if(e.isPrimKey)return t.primaryKey;var n=t.getIndexByKeyPath(e.index);if(n)return n;throw new ee.Schema("KeyPath "+e.index+" on object store "+t.name+" is not indexed")}function On(e,t,n){var r=ia(e,t.schema);return t.openCursor({trans:n,values:!e.keysOnly,reverse:e.dir==="prev",unique:!!e.unique,query:{index:r,range:e.range}})}function la(e,t,n,r){var i,c,p=e.replayFilter?pt(e.filter,e.replayFilter()):e.filter;return e.or?(i={},c=function(m,y,T){var w,v;p&&!p(y,T,function(x){return y.stop(x)},function(x){return y.fail(x)})||((v=""+(w=y.primaryKey))=="[object ArrayBuffer]"&&(v=""+new Uint8Array(w)),P(i,v))||(i[v]=!0,t(m,y,T))},Promise.all([e.or._iterate(c,n),Mn(On(e,r,n),e.algorithm,c,!e.keysOnly&&e.valueMapper)])):Mn(On(e,r,n),pt(e.algorithm,p),t,!e.keysOnly&&e.valueMapper)}function Mn(e,t,n,r){var i=xe(r?function(c,p,m){return n(r(c),p,m)}:n);return e.then(function(c){if(c)return c.start(function(){var p=function(){return c.continue()};t&&!t(c,function(m){return p=m},function(m){c.stop(m),p=he},function(m){c.fail(m),p=he})||i(c.value,c,function(m){return p=m}),p()})})}pe.prototype._read=function(e,t){var n=this._ctx;return n.error?n.table._trans(null,we.bind(null,n.error)):n.table._trans("readonly",e).then(t)},pe.prototype._write=function(e){var t=this._ctx;return t.error?t.table._trans(null,we.bind(null,t.error)):t.table._trans("readwrite",e,"locked")},pe.prototype._addAlgorithm=function(e){var t=this._ctx;t.algorithm=pt(t.algorithm,e)},pe.prototype._iterate=function(e,t){return la(this._ctx,e,t,this._ctx.table.core)},pe.prototype.clone=function(e){var t=Object.create(this.constructor.prototype),n=Object.create(this._ctx);return e&&h(n,e),t._ctx=n,t},pe.prototype.raw=function(){return this._ctx.valueMapper=null,this},pe.prototype.each=function(e){var t=this._ctx;return this._read(function(n){return la(t,e,n,t.table.core)})},pe.prototype.count=function(e){var t=this;return this._read(function(n){var r,i=t._ctx,c=i.table.core;return St(i,!0)?c.count({trans:n,query:{index:ia(i,c.schema),range:i.range}}).then(function(p){return Math.min(p,i.limit)}):(r=0,la(i,function(){return++r,!1},n,c).then(function(){return r}))}).then(e)},pe.prototype.sortBy=function(e,t){var n=e.split(".").reverse(),r=n[0],i=n.length-1;function c(y,T){return T?c(y[n[T]],T-1):y[r]}var p=this._ctx.dir==="next"?1:-1;function m(y,T){return ue(c(y,i),c(T,i))*p}return this.toArray(function(y){return y.slice().sort(m)}).then(t)},pe.prototype.toArray=function(e){var t=this;return this._read(function(n){var r,i,c,p=t._ctx;return St(p,!0)&&0<p.limit?(r=p.valueMapper,i=ia(p,p.table.core.schema),p.table.core.query({trans:n,limit:p.limit,values:!0,direction:p.dir==="prev"?"prev":void 0,query:{index:i,range:p.range}}).then(function(m){return m=m.result,r?m.map(r):m})):(c=[],la(p,function(m){return c.push(m)},n,p.table.core).then(function(){return c}))},e)},pe.prototype.offset=function(e){var t=this._ctx;return e<=0||(t.offset+=e,St(t)?Fa(t,function(){var n=e;return function(r,i){return n===0||(n===1?--n:i(function(){r.advance(n),n=0}),!1)}}):Fa(t,function(){var n=e;return function(){return--n<0}})),this},pe.prototype.limit=function(e){return this._ctx.limit=Math.min(this._ctx.limit,e),Fa(this._ctx,function(){var t=e;return function(n,r,i){return--t<=0&&r(i),0<=t}},!0),this},pe.prototype.until=function(e,t){return Ka(this._ctx,function(n,r,i){return!e(n.value)||(r(i),t)}),this},pe.prototype.first=function(e){return this.limit(1).toArray(function(t){return t[0]}).then(e)},pe.prototype.last=function(e){return this.reverse().first(e)},pe.prototype.filter=function(e){var t;return Ka(this._ctx,function(n){return e(n.value)}),(t=this._ctx).isMatch=pt(t.isMatch,e),this},pe.prototype.and=function(e){return this.filter(e)},pe.prototype.or=function(e){return new this.db.WhereClause(this._ctx.table,e,this)},pe.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},pe.prototype.desc=function(){return this.reverse()},pe.prototype.eachKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,r){e(r.key,r)})},pe.prototype.eachUniqueKey=function(e){return this._ctx.unique="unique",this.eachKey(e)},pe.prototype.eachPrimaryKey=function(e){var t=this._ctx;return t.keysOnly=!t.isMatch,this.each(function(n,r){e(r.primaryKey,r)})},pe.prototype.keys=function(e){var t=this._ctx,n=(t.keysOnly=!t.isMatch,[]);return this.each(function(r,i){n.push(i.key)}).then(function(){return n}).then(e)},pe.prototype.primaryKeys=function(e){var t=this._ctx;if(St(t,!0)&&0<t.limit)return this._read(function(r){var i=ia(t,t.table.core.schema);return t.table.core.query({trans:r,values:!1,limit:t.limit,direction:t.dir==="prev"?"prev":void 0,query:{index:i,range:t.range}})}).then(function(r){return r.result}).then(e);t.keysOnly=!t.isMatch;var n=[];return this.each(function(r,i){n.push(i.primaryKey)}).then(function(){return n}).then(e)},pe.prototype.uniqueKeys=function(e){return this._ctx.unique="unique",this.keys(e)},pe.prototype.firstKey=function(e){return this.limit(1).keys(function(t){return t[0]}).then(e)},pe.prototype.lastKey=function(e){return this.reverse().firstKey(e)},pe.prototype.distinct=function(){var e,t=this._ctx,t=t.index&&t.table.schema.idxByName[t.index];return t&&t.multi&&(e={},Ka(this._ctx,function(r){var r=r.primaryKey.toString(),i=P(e,r);return e[r]=!0,!i})),this},pe.prototype.modify=function(e){var t=this,n=this._ctx;return this._write(function(r){function i(S,A){var _=A.failures;x+=S-A.numFailures;for(var D=0,j=u(_);D<j.length;D++){var M=j[D];v.push(_[M])}}var c=typeof e=="function"?e:function(S){return Ln(S,e)},p=n.table.core,w=p.schema.primaryKey,m=w.outbound,y=w.extractKey,T=200,w=t.db._options.modifyChunkSize,v=(w&&(T=typeof w=="object"?w[p.name]||w["*"]||200:w),[]),x=0,E=[],C=e===Rn;return t.clone().primaryKeys().then(function(S){function A(D){var j=Math.min(T,S.length-D),M=S.slice(D,D+j);return(C?Promise.resolve([]):p.getMany({trans:r,keys:M,cache:"immutable"})).then(function(B){var K=[],q=[],Y=m?[]:null,N=C?M:[];if(!C)for(var J=0;J<j;++J){var R=B[J],ne={value:me(R),primKey:S[D+J]};c.call(ne,ne.value,ne)!==!1&&(ne.value==null?N.push(S[D+J]):m||ue(y(R),y(ne.value))===0?(q.push(ne.value),m&&Y.push(S[D+J])):(N.push(S[D+J]),K.push(ne.value)))}return Promise.resolve(0<K.length&&p.mutate({trans:r,type:"add",values:K}).then(function(re){for(var ie in re.failures)N.splice(parseInt(ie),1);i(K.length,re)})).then(function(){return(0<q.length||_&&typeof e=="object")&&p.mutate({trans:r,type:"put",keys:Y,values:q,criteria:_,changeSpec:typeof e!="function"&&e,isAdditionalChunk:0<D}).then(function(re){return i(q.length,re)})}).then(function(){return(0<N.length||_&&C)&&p.mutate({trans:r,type:"delete",keys:N,criteria:_,isAdditionalChunk:0<D}).then(function(re){return sa(n.table,N,re)}).then(function(re){return i(N.length,re)})}).then(function(){return S.length>D+j&&A(D+T)})})}var _=St(n)&&n.limit===1/0&&(typeof e!="function"||C)&&{index:n.index,range:n.range};return A(0).then(function(){if(0<v.length)throw new Qt("Error modifying one or more objects",v,x,E);return S.length})})})},pe.prototype.delete=function(){var e=this._ctx,t=e.range;return!St(e)||e.table.schema.yProps||!e.isPrimKey&&t.type!==3?this.modify(Rn):this._write(function(n){var r=e.table.core.schema.primaryKey,i=t;return e.table.core.count({trans:n,query:{index:r,range:i}}).then(function(c){return e.table.core.mutate({trans:n,type:"deleteRange",range:i}).then(function(y){var m=y.failures,y=y.numFailures;if(y)throw new Qt("Could not delete some values",Object.keys(m).map(function(T){return m[T]}),c-y);return c-y})})})};var Or=pe;function pe(){}var Rn=function(e,t){return t.value=null};function Mr(e,t){return e<t?-1:e===t?0:1}function Rr(e,t){return t<e?-1:e===t?0:1}function Re(e,t,n){return e=e instanceof qn?new e.Collection(e):e,e._ctx.error=new(n||TypeError)(t),e}function kt(e){return new e.Collection(e,function(){return Bn("")}).limit(0)}function ca(E,t,n,r){var i,c,p,m,y,T,w,v=n.length;if(!n.every(function(S){return typeof S=="string"}))return Re(E,Pn);function x(S){i=S==="next"?function(_){return _.toUpperCase()}:function(_){return _.toLowerCase()},c=S==="next"?function(_){return _.toLowerCase()}:function(_){return _.toUpperCase()},p=S==="next"?Mr:Rr;var A=n.map(function(_){return{lower:c(_),upper:i(_)}}).sort(function(_,D){return p(_.lower,D.lower)});m=A.map(function(_){return _.upper}),y=A.map(function(_){return _.lower}),w=(T=S)==="next"?"":r}x("next");var E=new E.Collection(E,function(){return at(m[0],y[v-1]+r)}),C=(E._ondirectionchange=function(S){x(S)},0);return E._addAlgorithm(function(S,A,_){var D=S.key;if(typeof D=="string"){var j=c(D);if(t(j,y,C))return!0;for(var M=null,B=C;B<v;++B){var K=((q,Y,N,J,R,ne)=>{for(var re=Math.min(q.length,J.length),ie=-1,de=0;de<re;++de){var Be=Y[de];if(Be!==J[de])return R(q[de],N[de])<0?q.substr(0,de)+N[de]+N.substr(de+1):R(q[de],J[de])<0?q.substr(0,de)+J[de]+N.substr(de+1):0<=ie?q.substr(0,ie)+Y[ie]+N.substr(ie+1):null;R(q[de],Be)<0&&(ie=de)}return re<J.length&&ne==="next"?q+N.substr(q.length):re<q.length&&ne==="prev"?q.substr(0,N.length):ie<0?null:q.substr(0,ie)+J[ie]+N.substr(ie+1)})(D,j,m[B],y[B],p,T);K===null&&M===null?C=B+1:(M===null||0<p(M,K))&&(M=K)}A(M!==null?function(){S.continue(M+w)}:_)}return!1}),E}function at(e,t,n,r){return{type:2,lower:e,upper:t,lowerOpen:n,upperOpen:r}}function Bn(e){return{type:1,lower:e,upper:e}}Object.defineProperty(Ae.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),Ae.prototype.between=function(e,t,n,r){n=n!==!1,r=r===!0;try{return 0<this._cmp(e,t)||this._cmp(e,t)===0&&(n||r)&&(!n||!r)?kt(this):new this.Collection(this,function(){return at(e,t,!n,!r)})}catch{return Re(this,Qe)}},Ae.prototype.equals=function(e){return e==null?Re(this,Qe):new this.Collection(this,function(){return Bn(e)})},Ae.prototype.above=function(e){return e==null?Re(this,Qe):new this.Collection(this,function(){return at(e,void 0,!0)})},Ae.prototype.aboveOrEqual=function(e){return e==null?Re(this,Qe):new this.Collection(this,function(){return at(e,void 0,!1)})},Ae.prototype.below=function(e){return e==null?Re(this,Qe):new this.Collection(this,function(){return at(void 0,e,!1,!0)})},Ae.prototype.belowOrEqual=function(e){return e==null?Re(this,Qe):new this.Collection(this,function(){return at(void 0,e)})},Ae.prototype.startsWith=function(e){return typeof e!="string"?Re(this,Pn):this.between(e,e+ut,!0,!0)},Ae.prototype.startsWithIgnoreCase=function(e){return e===""?this.startsWith(e):ca(this,function(t,n){return t.indexOf(n[0])===0},[e],ut)},Ae.prototype.equalsIgnoreCase=function(e){return ca(this,function(t,n){return t===n[0]},[e],"")},Ae.prototype.anyOfIgnoreCase=function(){var e=ze.apply(Ne,arguments);return e.length===0?kt(this):ca(this,function(t,n){return n.indexOf(t)!==-1},e,"")},Ae.prototype.startsWithAnyOfIgnoreCase=function(){var e=ze.apply(Ne,arguments);return e.length===0?kt(this):ca(this,function(t,n){return n.some(function(r){return t.indexOf(r)===0})},e,ut)},Ae.prototype.anyOf=function(){var e,t,n=this,r=ze.apply(Ne,arguments),i=this._cmp;try{r.sort(i)}catch{return Re(this,Qe)}return r.length===0?kt(this):((e=new this.Collection(this,function(){return at(r[0],r[r.length-1])}))._ondirectionchange=function(c){i=c==="next"?n._ascending:n._descending,r.sort(i)},t=0,e._addAlgorithm(function(c,p,m){for(var y=c.key;0<i(y,r[t]);)if(++t===r.length)return p(m),!1;return i(y,r[t])===0||(p(function(){c.continue(r[t])}),!1)}),e)},Ae.prototype.notEqual=function(e){return this.inAnyRange([[-1/0,e],[e,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},Ae.prototype.noneOf=function(){var e=ze.apply(Ne,arguments);if(e.length===0)return new this.Collection(this);try{e.sort(this._ascending)}catch{return Re(this,Qe)}var t=e.reduce(function(n,r){return n?n.concat([[n[n.length-1][1],r]]):[[-1/0,r]]},null);return t.push([e[e.length-1],this.db._maxKey]),this.inAnyRange(t,{includeLowers:!1,includeUppers:!1})},Ae.prototype.inAnyRange=function(e,_){var n=this,r=this._cmp,i=this._ascending,c=this._descending,p=this._min,m=this._max;if(e.length===0)return kt(this);if(!e.every(function(D){return D[0]!==void 0&&D[1]!==void 0&&i(D[0],D[1])<=0}))return Re(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",ee.InvalidArgument);var y=!_||_.includeLowers!==!1,T=_&&_.includeUppers===!0,w,v=i;function x(D,j){return v(D[0],j[0])}try{(w=e.reduce(function(D,j){for(var M=0,B=D.length;M<B;++M){var K=D[M];if(r(j[0],K[1])<0&&0<r(j[1],K[0])){K[0]=p(K[0],j[0]),K[1]=m(K[1],j[1]);break}}return M===B&&D.push(j),D},[])).sort(x)}catch{return Re(this,Qe)}var E=0,C=T?function(D){return 0<i(D,w[E][1])}:function(D){return 0<=i(D,w[E][1])},S=y?function(D){return 0<c(D,w[E][0])}:function(D){return 0<=c(D,w[E][0])},A=C,_=new this.Collection(this,function(){return at(w[0][0],w[w.length-1][1],!y,!T)});return _._ondirectionchange=function(D){v=D==="next"?(A=C,i):(A=S,c),w.sort(x)},_._addAlgorithm(function(D,j,M){for(var B,K=D.key;A(K);)if(++E===w.length)return j(M),!1;return!C(B=K)&&!S(B)||(n._cmp(K,w[E][1])===0||n._cmp(K,w[E][0])===0||j(function(){v===i?D.continue(w[E][0]):D.continue(w[E][1])}),!1)}),_},Ae.prototype.startsWithAnyOf=function(){var e=ze.apply(Ne,arguments);return e.every(function(t){return typeof t=="string"})?e.length===0?kt(this):this.inAnyRange(e.map(function(t){return[t,t+ut]})):Re(this,"startsWithAnyOf() only works with strings")};var qn=Ae;function Ae(){}function Ke(e){return xe(function(t){return Rt(t),e(t.target.error),!1})}function Rt(e){e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()}var da="storagemutated",Ga="x-storagemutated-1",nt=Ot(null,da),Br=(Ge.prototype._lock=function(){return F(!Z.global),++this._reculock,this._reculock!==1||Z.global||(Z.lockOwnerFor=this),this},Ge.prototype._unlock=function(){if(F(!Z.global),--this._reculock==0)for(Z.global||(Z.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var e=this._blockedFuncs.shift();try{dt(e[1],e[0])}catch{}}return this},Ge.prototype._locked=function(){return this._reculock&&Z.lockOwnerFor!==this},Ge.prototype.create=function(e){var t=this;if(this.mode){var n=this.db.idbdb,r=this.db._state.dbOpenError;if(F(!this.idbtrans),!e&&!n)switch(r&&r.name){case"DatabaseClosedError":throw new ee.DatabaseClosed(r);case"MissingAPIError":throw new ee.MissingAPI(r.message,r);default:throw new ee.OpenFailed(r)}if(!this.active)throw new ee.TransactionInactive;F(this._completion._state===null),(e=this.idbtrans=e||(this.db.core||n).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=xe(function(i){Rt(i),t._reject(e.error)}),e.onabort=xe(function(i){Rt(i),t.active&&t._reject(new ee.Abort(e.error)),t.active=!1,t.on("abort").fire(i)}),e.oncomplete=xe(function(){t.active=!1,t._resolve(),"mutatedParts"in e&&nt.storagemutated.fire(e.mutatedParts)})}return this},Ge.prototype._promise=function(e,t,n){var r,i=this;return e==="readwrite"&&this.mode!=="readwrite"?we(new ee.ReadOnly("Transaction is readonly")):this.active?this._locked()?new U(function(c,p){i._blockedFuncs.push([function(){i._promise(e,t,n).then(c,p)},Z])}):n?Ze(function(){var c=new U(function(p,m){i._lock();var y=t(p,m,i);y&&y.then&&y.then(p,m)});return c.finally(function(){return i._unlock()}),c._lib=!0,c}):((r=new U(function(c,p){var m=t(c,p,i);m&&m.then&&m.then(c,p)}))._lib=!0,r):we(new ee.TransactionInactive)},Ge.prototype._root=function(){return this.parent?this.parent._root():this},Ge.prototype.waitFor=function(e){var t,n=this._root(),r=U.resolve(e),i=(n._waitingFor?n._waitingFor=n._waitingFor.then(function(){return r}):(n._waitingFor=r,n._waitingQueue=[],t=n.idbtrans.objectStore(n.storeNames[0]),(function c(){for(++n._spinCount;n._waitingQueue.length;)n._waitingQueue.shift()();n._waitingFor&&(t.get(-1/0).onsuccess=c)})()),n._waitingFor);return new U(function(c,p){r.then(function(m){return n._waitingQueue.push(xe(c.bind(null,m)))},function(m){return n._waitingQueue.push(xe(p.bind(null,m)))}).finally(function(){n._waitingFor===i&&(n._waitingFor=null)})})},Ge.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new ee.Abort))},Ge.prototype.table=function(e){var t=this._memoizedTables||(this._memoizedTables={});if(P(t,e))return t[e];var n=this.schema[e];if(n)return(n=new this.db.Table(e,n,this)).core=this.db.core.table(e),t[e]=n;throw new ee.NotFound("Table "+e+" not part of transaction")},Ge);function Ge(){}function Ha(e,t,n,r,i,c,p,m){return{name:e,keyPath:t,unique:n,multi:r,auto:i,compound:c,src:(n&&!p?"&":"")+(r?"*":"")+(i?"++":"")+zn(t),type:m}}function zn(e){return typeof e=="string"?e:e?"["+[].join.call(e,"+")+"]":""}function Va(e,t,n){return{name:e,primKey:t,indexes:n,mappedClass:null,idxByName:(r=function(i){return[i.name,i]},n.reduce(function(i,c,p){return c=r(c,p),c&&(i[c[0]]=c[1]),i},{}))};var r}var Bt=function(e){try{return e.only([[]]),Bt=function(){return[[]]},[[]]}catch{return Bt=function(){return ut},ut}};function Ua(e){return e==null?function(){}:typeof e=="string"?(t=e).split(".").length===1?function(n){return n[t]}:function(n){return X(n,t)}:function(n){return X(n,e)};var t}function Nn(e){return[].slice.call(e)}var qr=0;function qt(e){return e==null?":id":typeof e=="string"?e:"[".concat(e.join("+"),"]")}function zr(e,t,p){function r(A){if(A.type===3)return null;if(A.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var E=A.lower,C=A.upper,S=A.lowerOpen,A=A.upperOpen;return E===void 0?C===void 0?null:t.upperBound(C,!!A):C===void 0?t.lowerBound(E,!!S):t.bound(E,C,!!S,!!A)}function i(x){var E,C,S=x.name;return{name:S,schema:x,mutate:function(A){var _=A.trans,D=A.type,j=A.keys,M=A.values,B=A.range;return new Promise(function(K,q){K=xe(K);var Y=_.objectStore(S),N=Y.keyPath==null,J=D==="put"||D==="add";if(!J&&D!=="delete"&&D!=="deleteRange")throw new Error("Invalid operation type: "+D);var R,ne=(j||M||{length:1}).length;if(j&&M&&j.length!==M.length)throw new Error("Given keys array must have same length as given values array.");if(ne===0)return K({numFailures:0,failures:{},results:[],lastResult:void 0});function re(Le){++Be,Rt(Le)}var ie=[],de=[],Be=0;if(D==="deleteRange"){if(B.type===4)return K({numFailures:Be,failures:de,results:[],lastResult:void 0});B.type===3?ie.push(R=Y.clear()):ie.push(R=Y.delete(r(B)))}else{var N=J?N?[M,j]:[M,null]:[j,null],se=N[0],_e=N[1];if(J)for(var $e=0;$e<ne;++$e)ie.push(R=_e&&_e[$e]!==void 0?Y[D](se[$e],_e[$e]):Y[D](se[$e])),R.onerror=re;else for($e=0;$e<ne;++$e)ie.push(R=Y[D](se[$e])),R.onerror=re}function Sa(Le){Le=Le.target.result,ie.forEach(function(gt,pn){return gt.error!=null&&(de[pn]=gt.error)}),K({numFailures:Be,failures:de,results:D==="delete"?j:ie.map(function(gt){return gt.result}),lastResult:Le})}R.onerror=function(Le){re(Le),Sa(Le)},R.onsuccess=Sa})},getMany:function(A){var _=A.trans,D=A.keys;return new Promise(function(j,M){j=xe(j);for(var B,K=_.objectStore(S),q=D.length,Y=new Array(q),N=0,J=0,R=function(ie){ie=ie.target,Y[ie._pos]=ie.result,++J===N&&j(Y)},ne=Ke(M),re=0;re<q;++re)D[re]!=null&&((B=K.get(D[re]))._pos=re,B.onsuccess=R,B.onerror=ne,++N);N===0&&j(Y)})},get:function(A){var _=A.trans,D=A.key;return new Promise(function(j,M){j=xe(j);var B=_.objectStore(S).get(D);B.onsuccess=function(K){return j(K.target.result)},B.onerror=Ke(M)})},query:(E=y,C=T,function(A){return new Promise(function(_,D){_=xe(_);var j,M,B,K,ne=A.trans,q=A.values,Y=A.limit,R=A.query,N=(N=A.direction)!=null?N:"next",J=Y===1/0?void 0:Y,re=R.index,R=R.range,ne=ne.objectStore(S),ne=re.isPrimaryKey?ne:ne.index(re.name),re=r(R);if(Y===0)return _({result:[]});C?(R={query:re,count:J,direction:N},(j=q?ne.getAll(R):ne.getAllKeys(R)).onsuccess=function(ie){return _({result:ie.target.result})},j.onerror=Ke(D)):E&&N==="next"?((j=q?ne.getAll(re,J):ne.getAllKeys(re,J)).onsuccess=function(ie){return _({result:ie.target.result})},j.onerror=Ke(D)):(M=0,B=!q&&"openKeyCursor"in ne?ne.openKeyCursor(re,N):ne.openCursor(re,N),K=[],B.onsuccess=function(){var ie=B.result;return!ie||(K.push(q?ie.value:ie.primaryKey),++M===Y)?_({result:K}):void ie.continue()},B.onerror=Ke(D))})}),openCursor:function(A){var _=A.trans,D=A.values,j=A.query,M=A.reverse,B=A.unique;return new Promise(function(K,q){K=xe(K);var J=j.index,Y=j.range,N=_.objectStore(S),N=J.isPrimaryKey?N:N.index(J.name),J=M?B?"prevunique":"prev":B?"nextunique":"next",R=!D&&"openKeyCursor"in N?N.openKeyCursor(r(Y),J):N.openCursor(r(Y),J);R.onerror=Ke(q),R.onsuccess=xe(function(ne){var re,ie,de,Be,se=R.result;se?(se.___id=++qr,se.done=!1,re=se.continue.bind(se),ie=(ie=se.continuePrimaryKey)&&ie.bind(se),de=se.advance.bind(se),Be=function(){throw new Error("Cursor not stopped")},se.trans=_,se.stop=se.continue=se.continuePrimaryKey=se.advance=function(){throw new Error("Cursor not started")},se.fail=xe(q),se.next=function(){var _e=this,$e=1;return this.start(function(){return $e--?_e.continue():_e.stop()}).then(function(){return _e})},se.start=function(_e){function $e(){if(R.result)try{_e()}catch(Le){se.fail(Le)}else se.done=!0,se.start=function(){throw new Error("Cursor behind last entry")},se.stop()}var Sa=new Promise(function(Le,gt){Le=xe(Le),R.onerror=Ke(gt),se.fail=gt,se.stop=function(pn){se.stop=se.continue=se.continuePrimaryKey=se.advance=Be,Le(pn)}});return R.onsuccess=xe(function(Le){R.onsuccess=$e,$e()}),se.continue=re,se.continuePrimaryKey=ie,se.advance=de,$e(),Sa},K(se)):K(null)},q)})},count:function(A){var _=A.query,D=A.trans,j=_.index,M=_.range;return new Promise(function(B,K){var q=D.objectStore(S),q=j.isPrimaryKey?q:q.index(j.name),Y=r(M),Y=Y?q.count(Y):q.count();Y.onsuccess=xe(function(N){return B(N.target.result)}),Y.onerror=Ke(K)})}}}c=p,m=Nn((p=e).objectStoreNames),w=0<m.length?c.objectStore(m[0]):{};var c,p={schema:{name:p.name,tables:m.map(function(x){return c.objectStore(x)}).map(function(x){var E=x.keyPath,C=x.autoIncrement,A=g(E),S={},A={name:x.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:E==null,compound:A,keyPath:E,autoIncrement:C,unique:!0,extractKey:Ua(E)},indexes:Nn(x.indexNames).map(function(_){return x.index(_)}).map(function(M){var B=M.name,D=M.unique,j=M.multiEntry,M=M.keyPath,B={name:B,compound:g(M),keyPath:M,unique:D,multiEntry:j,extractKey:Ua(M)};return S[qt(M)]=B}),getIndexByKeyPath:function(_){return S[qt(_)]}};return S[":id"]=A.primaryKey,E!=null&&(S[qt(E)]=A.primaryKey),A})},hasGetAll:0<m.length&&"getAll"in w&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in w},m=p.schema,y=p.hasGetAll,T=p.hasIdb3Features,w=m.tables.map(i),v={};return w.forEach(function(x){return v[x.name]=x}),{stack:"dbcore",transaction:e.transaction.bind(e),table:function(x){if(v[x])return v[x];throw new Error("Table '".concat(x,"' not found"))},MIN_KEY:-1/0,MAX_KEY:Bt(t),schema:m}}function Nr(e,t,n,r){return n=n.IDBKeyRange,t=zr(t,n,r),{dbcore:e.dbcore.reduce(function(i,c){return c=c.create,s(s({},i),c(i))},t)}}function ua(e,t){var n=t.db,n=Nr(e._middlewares,n,e._deps,t);e.core=n.dbcore,e.tables.forEach(function(r){var i=r.name;e.core.schema.tables.some(function(c){return c.name===i})&&(r.core=e.core.table(i),e[i]instanceof e.Table)&&(e[i].core=r.core)})}function pa(e,t,n,r){n.forEach(function(i){var c=r[i];t.forEach(function(p){var m=(function y(T,w){return G(T,w)||(T=b(T))&&y(T,w)})(p,i);(!m||"value"in m&&m.value===void 0)&&(p===e.Transaction.prototype||p instanceof e.Transaction?I(p,i,{get:function(){return this.table(i)},set:function(y){O(this,i,{value:y,writable:!0,configurable:!0,enumerable:!0})}}):p[i]=new e.Table(i,c))})})}function Wa(e,t){t.forEach(function(n){for(var r in n)n[r]instanceof e.Table&&delete n[r]})}function Kr(e,t){return e._cfg.version-t._cfg.version}function Fr(e,t,n,r){var i=e._dbSchema,c=(n.objectStoreNames.contains("$meta")&&!i.$meta&&(i.$meta=Va("$meta",Fn("")[0],[]),e._storeNames.push("$meta")),e._createTransaction("readwrite",e._storeNames,i)),p=(c.create(n),c._completion.catch(r),c._reject.bind(c)),m=Z.transless||Z;Ze(function(){if(Z.trans=c,Z.transless=m,t!==0)return ua(e,n),T=t,((y=c).storeNames.includes("$meta")?y.table("$meta").get("version").then(function(w){return w??T}):U.resolve(T)).then(function(A){var v=e,x=A,E=c,C=n,S=[],A=v._versions,_=v._dbSchema=ma(0,v.idbdb,C);return(A=A.filter(function(D){return D._cfg.version>=x})).length===0?U.resolve():(A.forEach(function(D){S.push(function(){var j,M,B,K=_,q=D._cfg.dbschema,Y=(ga(v,K,C),ga(v,q,C),_=v._dbSchema=q,Qa(K,q)),N=(Y.add.forEach(function(J){Ya(C,J[0],J[1].primKey,J[1].indexes)}),Y.change.forEach(function(J){if(J.recreate)throw new ee.Upgrade("Not yet support for changing primary key");var R=C.objectStore(J.name);J.add.forEach(function(ne){return fa(R,ne)}),J.change.forEach(function(ne){R.deleteIndex(ne.name),fa(R,ne)}),J.del.forEach(function(ne){return R.deleteIndex(ne)})}),D._cfg.contentUpgrade);if(N&&D._cfg.version>x)return ua(v,C),E._memoizedTables={},j=fe(q),Y.del.forEach(function(J){j[J]=K[J]}),Wa(v,[v.Transaction.prototype]),pa(v,[v.Transaction.prototype],u(j),j),E.schema=j,(M=Pe(N))&&wt(),q=U.follow(function(){var J;(B=N(E))&&M&&(J=et.bind(null,null),B.then(J,J))}),B&&typeof B.then=="function"?U.resolve(B):q.then(function(){return B})}),S.push(function(j){var M,B,K=D._cfg.dbschema;M=K,B=j,[].slice.call(B.db.objectStoreNames).forEach(function(q){return M[q]==null&&B.db.deleteObjectStore(q)}),Wa(v,[v.Transaction.prototype]),pa(v,[v.Transaction.prototype],v._storeNames,v._dbSchema),E.schema=v._dbSchema}),S.push(function(j){v.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(v.idbdb.version/10)===D._cfg.version?(v.idbdb.deleteObjectStore("$meta"),delete v._dbSchema.$meta,v._storeNames=v._storeNames.filter(function(M){return M!=="$meta"})):j.objectStore("$meta").put(D._cfg.version,"version"))})}),(function D(){return S.length?U.resolve(S.shift()(E.idbtrans)).then(D):U.resolve()})().then(function(){Kn(_,C)}))}).catch(p);var y,T;u(i).forEach(function(w){Ya(n,w,i[w].primKey,i[w].indexes)}),ua(e,n),U.follow(function(){return e.on.populate.fire(c)}).catch(p)})}function Gr(e,t){Kn(e._dbSchema,t),t.db.version%10!=0||t.objectStoreNames.contains("$meta")||t.db.createObjectStore("$meta").add(Math.ceil(t.db.version/10-1),"version");var n=ma(0,e.idbdb,t);ga(e,e._dbSchema,t);for(var r=0,i=Qa(n,e._dbSchema).change;r<i.length;r++){var c=(p=>{if(p.change.length||p.recreate)return console.warn("Unable to patch indexes of table ".concat(p.name," because it has changes on the type of index or primary key.")),{value:void 0};var m=t.objectStore(p.name);p.add.forEach(function(y){Fe&&console.debug("Dexie upgrade patch: Creating missing index ".concat(p.name,".").concat(y.src)),fa(m,y)})})(i[r]);if(typeof c=="object")return c.value}}function Qa(e,t){var n,r={del:[],add:[],change:[]};for(n in e)t[n]||r.del.push(n);for(n in t){var i=e[n],c=t[n];if(i){var p={name:n,def:c,recreate:!1,del:[],add:[],change:[]};if(""+(i.primKey.keyPath||"")!=""+(c.primKey.keyPath||"")||i.primKey.auto!==c.primKey.auto)p.recreate=!0,r.change.push(p);else{var m=i.idxByName,y=c.idxByName,T=void 0;for(T in m)y[T]||p.del.push(T);for(T in y){var w=m[T],v=y[T];w?w.src!==v.src&&p.change.push(v):p.add.push(v)}(0<p.del.length||0<p.add.length||0<p.change.length)&&r.change.push(p)}}else r.add.push([n,c])}return r}function Ya(e,t,n,r){var i=e.db.createObjectStore(t,n.keyPath?{keyPath:n.keyPath,autoIncrement:n.auto}:{autoIncrement:n.auto});r.forEach(function(c){return fa(i,c)})}function Kn(e,t){u(e).forEach(function(n){t.db.objectStoreNames.contains(n)||(Fe&&console.debug("Dexie: Creating missing table",n),Ya(t,n,e[n].primKey,e[n].indexes))})}function fa(e,t){e.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function ma(e,t,n){var r={};return oe(t.objectStoreNames,0).forEach(function(i){for(var c=n.objectStore(i),p=Ha(zn(T=c.keyPath),T||"",!0,!1,!!c.autoIncrement,T&&typeof T!="string",!0),m=[],y=0;y<c.indexNames.length;++y){var w=c.index(c.indexNames[y]),T=w.keyPath,w=Ha(w.name,T,!!w.unique,!!w.multiEntry,!1,T&&typeof T!="string",!1);m.push(w)}r[i]=Va(i,p,m)}),r}function ga(e,t,n){for(var r=n.db.objectStoreNames,i=0;i<r.length;++i){var c=r[i],p=n.objectStore(c);e._hasGetAll="getAll"in p;for(var m=0;m<p.indexNames.length;++m){var y,T=p.indexNames[m],w=p.index(T).keyPath,w=typeof w=="string"?w:"["+oe(w).join("+")+"]";t[c]&&(y=t[c].idxByName[w])&&(y.name=T,delete t[c].idxByName[w],t[c].idxByName[T]=y)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&d.WorkerGlobalScope&&d instanceof d.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(e._hasGetAll=!1)}function Fn(e){return e.split(",").map(function(t,n){var i=t.split(":"),r=(r=i[1])==null?void 0:r.trim(),i=(t=i[0].trim()).replace(/([&*]|\+\+)/g,""),c=/^\[/.test(i)?i.match(/^\[(.*)\]$/)[1].split("+"):i;return Ha(i,c||null,/\&/.test(t),/\*/.test(t),/\+\+/.test(t),g(c),n===0,r)})}Ct.prototype._createTableSchema=Va,Ct.prototype._parseIndexSyntax=Fn,Ct.prototype._parseStoresSpec=function(e,t){var n=this;u(e).forEach(function(r){if(e[r]!==null){var i=n._parseIndexSyntax(e[r]),c=i.shift();if(!c)throw new ee.Schema("Invalid schema for table "+r+": "+e[r]);if(c.unique=!0,c.multi)throw new ee.Schema("Primary key cannot be multiEntry*");i.forEach(function(p){if(p.auto)throw new ee.Schema("Only primary key can be marked as autoIncrement (++)");if(!p.keyPath)throw new ee.Schema("Index must have a name and cannot be an empty string")}),c=n._createTableSchema(r,c,i),t[r]=c}})},Ct.prototype.stores=function(n){var t=this.db,n=(this._cfg.storesSource=this._cfg.storesSource?h(this._cfg.storesSource,n):n,t._versions),r={},i={};return n.forEach(function(c){h(r,c._cfg.storesSource),i=c._cfg.dbschema={},c._parseStoresSpec(r,i)}),t._dbSchema=i,Wa(t,[t._allTables,t,t.Transaction.prototype]),pa(t,[t._allTables,t,t.Transaction.prototype,this._cfg.tables],u(i),i),t._storeNames=u(i),this},Ct.prototype.upgrade=function(e){return this._cfg.contentUpgrade=$a(this._cfg.contentUpgrade||he,e),this};var Hr=Ct;function Ct(){}var zt=(()=>{var e,t,n;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(e=new Set,t=new FinalizationRegistry(function(r){e.delete(r)}),{toArray:function(){return Array.from(e).map(function(r){return r.deref()}).filter(function(r){return r!==void 0})},add:function(r){var i=new WeakRef(r._novip);e.add(i),t.register(r._novip,i,i),e.size>r._options.maxConnections&&(i=e.values().next().value,e.delete(i),t.unregister(i))},remove:function(r){if(r)for(var i=e.values(),c=i.next();!c.done;){var p=c.value;if(p.deref()===r._novip)return e.delete(p),void t.unregister(p);c=i.next()}}}):(n=[],{toArray:function(){return n},add:function(r){n.push(r._novip)},remove:function(r){r&&(r=n.indexOf(r._novip))!==-1&&n.splice(r,1)}})})();function Ja(e,t){var n=e._dbNamesDB;return n||(n=e._dbNamesDB=new Ye(ra,{addons:[],indexedDB:e,IDBKeyRange:t})).version(1).stores({dbnames:"name"}),n.table("dbnames")}function Xa(e){return e&&typeof e.databases=="function"}function Za(e){return Ze(function(){return Z.letThrough=!0,e()})}function en(e){return!("from"in e)}var De=function(e,t){var n;if(!this)return n=new De,e&&"d"in e&&h(n,e),n;h(this,arguments.length?{d:1,from:e,to:1<arguments.length?t:e}:{d:0})};function Nt(e,t,n){var r=ue(t,n);if(!isNaN(r)){if(0<r)throw RangeError();if(en(e))return h(e,{from:t,to:n,d:1});var r=e.l,i=e.r;if(ue(n,e.from)<0)return r?Nt(r,t,n):e.l={from:t,to:n,d:1,l:null,r:null},Hn(e);if(0<ue(t,e.to))return i?Nt(i,t,n):e.r={from:t,to:n,d:1,l:null,r:null},Hn(e);ue(t,e.from)<0&&(e.from=t,e.l=null,e.d=i?i.d+1:1),0<ue(n,e.to)&&(e.to=n,e.r=null,e.d=e.l?e.l.d+1:1),t=!e.r,r&&!e.l&&Kt(e,r),i&&t&&Kt(e,i)}}function Kt(e,t){en(t)||(function n(r,i){var c=i.from,p=i.l,m=i.r;Nt(r,c,i.to),p&&n(r,p),m&&n(r,m)})(e,t)}function Gn(e,t){var n=ha(t),r=n.next();if(!r.done)for(var i=r.value,c=ha(e),p=c.next(i.from),m=p.value;!r.done&&!p.done;){if(ue(m.from,i.to)<=0&&0<=ue(m.to,i.from))return!0;ue(i.from,m.from)<0?i=(r=n.next(m.from)).value:m=(p=c.next(i.from)).value}return!1}function ha(e){var t=en(e)?null:{s:0,n:e};return{next:function(n){for(var r=0<arguments.length;t;)switch(t.s){case 0:if(t.s=1,r)for(;t.n.l&&ue(n,t.n.from)<0;)t={up:t,n:t.n.l,s:1};else for(;t.n.l;)t={up:t,n:t.n.l,s:1};case 1:if(t.s=2,!r||ue(n,t.n.to)<=0)return{value:t.n,done:!1};case 2:if(t.n.r){t.s=3,t={up:t,n:t.n.r,s:0};continue}case 3:t=t.up}return{done:!0}}}}function Hn(e){var t,n,r,i=(((i=e.r)==null?void 0:i.d)||0)-(((i=e.l)==null?void 0:i.d)||0),i=1<i?"r":i<-1?"l":"";i&&(t=i=="r"?"l":"r",n=s({},e),r=e[i],e.from=r.from,e.to=r.to,e[i]=r[i],n[i]=r[t],(e[t]=n).d=Vn(n)),e.d=Vn(e)}function Vn(n){var t=n.r,n=n.l;return(t?n?Math.max(t.d,n.d):t.d:n?n.d:0)+1}function ba(e,t){return u(t).forEach(function(n){e[n]?Kt(e[n],t[n]):e[n]=(function r(i){var c,p,m={};for(c in i)P(i,c)&&(p=i[c],m[c]=!p||typeof p!="object"||le.has(p.constructor)?p:r(p));return m})(t[n])}),e}function tn(e,t){return e.all||t.all||Object.keys(e).some(function(n){return t[n]&&Gn(t[n],e[n])})}$(De.prototype,((Me={add:function(e){return Kt(this,e),this},addKey:function(e){return Nt(this,e,e),this},addKeys:function(e){var t=this;return e.forEach(function(n){return Nt(t,n,n)}),this},hasKey:function(e){var t=ha(this).next(e).value;return t&&ue(t.from,e)<=0&&0<=ue(t.to,e)}})[Ie]=function(){return ha(this)},Me));var ft={},an={},nn=!1;function va(e){ba(an,e),nn||(nn=!0,setTimeout(function(){nn=!1,rn(an,!(an={}))},0))}function rn(e,t){t===void 0&&(t=!1);var n=new Set;if(e.all)for(var r=0,i=Object.values(ft);r<i.length;r++)Un(m=i[r],e,n,t);else for(var c in e){var p,m,c=/^idb\:\/\/(.*)\/(.*)\//.exec(c);c&&(p=c[1],c=c[2],m=ft["idb://".concat(p,"/").concat(c)])&&Un(m,e,n,t)}n.forEach(function(y){return y()})}function Un(e,t,n,r){for(var i=[],c=0,p=Object.entries(e.queries.query);c<p.length;c++){for(var m=p[c],y=m[0],T=[],w=0,v=m[1];w<v.length;w++){var x=v[w];tn(t,x.obsSet)?x.subscribers.forEach(function(A){return n.add(A)}):r&&T.push(x)}r&&i.push([y,T])}if(r)for(var E=0,C=i;E<C.length;E++){var S=C[E],y=S[0],T=S[1];e.queries.query[y]=T}}function Vr(e){var t=e._state,n=e._deps.indexedDB;if(t.isBeingOpened||e.idbdb)return t.dbReadyPromise.then(function(){return t.dbOpenError?we(t.dbOpenError):e});t.isBeingOpened=!0,t.dbOpenError=null,t.openComplete=!1;var r=t.openCanceller,i=Math.round(10*e.verno),c=!1;function p(){if(t.openCanceller!==r)throw new ee.DatabaseClosed("db.open() was cancelled")}function m(){return new U(function(x,E){if(p(),!n)throw new ee.MissingAPI;var C=e.name,S=t.autoSchema||!i?n.open(C):n.open(C,i);if(!S)throw new ee.MissingAPI;S.onerror=Ke(E),S.onblocked=xe(e._fireOnBlocked),S.onupgradeneeded=xe(function(A){var _;w=S.transaction,t.autoSchema&&!e._options.allowEmptyDB?(S.onerror=Rt,w.abort(),S.result.close(),(_=n.deleteDatabase(C)).onsuccess=_.onerror=xe(function(){E(new ee.NoSuchDatabase("Database ".concat(C," doesnt exist")))})):(w.onerror=Ke(E),_=A.oldVersion>Math.pow(2,62)?0:A.oldVersion,v=_<1,e.idbdb=S.result,c&&Gr(e,w),Fr(e,_/10,w,E))},E),S.onsuccess=xe(function(){w=null;var A,_,D,j,M,B,K=e.idbdb=S.result,q=oe(K.objectStoreNames);if(0<q.length)try{var Y=K.transaction((M=q).length===1?M[0]:M,"readonly");if(t.autoSchema)B=K,j=Y,(D=e).verno=B.version/10,j=D._dbSchema=ma(0,B,j),D._storeNames=oe(B.objectStoreNames,0),pa(D,[D._allTables],u(j),j);else if(ga(e,e._dbSchema,Y),_=Y,((_=Qa(ma(0,(A=e).idbdb,_),A._dbSchema)).add.length||_.change.some(function(N){return N.add.length||N.change.length}))&&!c)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),K.close(),i=K.version+1,c=!0,x(m());ua(e,Y)}catch{}zt.add(e),K.onversionchange=xe(function(N){t.vcFired=!0,e.on("versionchange").fire(N)}),K.onclose=xe(function(){e.close({disableAutoOpen:!1})}),v&&(q=e._deps,M=C,Xa(B=q.indexedDB)||M===ra||Ja(B,q.IDBKeyRange).put({name:M}).catch(he)),x()},E)}).catch(function(x){switch(x==null?void 0:x.name){case"UnknownError":if(0<t.PR1398_maxLoop)return t.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),m();break;case"VersionError":if(0<i)return i=0,m()}return U.reject(x)})}var y,T=t.dbReadyResolve,w=null,v=!1;return U.race([r,(typeof navigator>"u"?U.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(x){function E(){return indexedDB.databases().finally(x)}y=setInterval(E,100),E()}).finally(function(){return clearInterval(y)}):Promise.resolve()).then(m)]).then(function(){return p(),t.onReadyBeingFired=[],U.resolve(Za(function(){return e.on.ready.fire(e.vip)})).then(function x(){var E;if(0<t.onReadyBeingFired.length)return E=t.onReadyBeingFired.reduce($a,he),t.onReadyBeingFired=[],U.resolve(Za(function(){return E(e.vip)})).then(x)})}).finally(function(){t.openCanceller===r&&(t.onReadyBeingFired=null,t.isBeingOpened=!1)}).catch(function(x){t.dbOpenError=x;try{w&&w.abort()}catch{}return r===t.openCanceller&&e._close(),we(x)}).finally(function(){t.openComplete=!0,T()}).then(function(){var x;return v&&(x={},e.tables.forEach(function(E){E.schema.indexes.forEach(function(C){C.name&&(x["idb://".concat(e.name,"/").concat(E.name,"/").concat(C.name)]=new De(-1/0,[[[]]]))}),x["idb://".concat(e.name,"/").concat(E.name,"/")]=x["idb://".concat(e.name,"/").concat(E.name,"/:dels")]=new De(-1/0,[[[]]])}),nt(da).fire(x),rn(x,!0)),e})}function on(e){function t(c){return e.next(c)}var n=i(t),r=i(function(c){return e.throw(c)});function i(c){return function(m){var m=c(m),y=m.value;return m.done?y:y&&typeof y.then=="function"?y.then(n,r):g(y)?Promise.all(y).then(n,r):n(y)}}return i(t)()}function ya(e,t,n){for(var r=g(e)?e.slice():[e],i=0;i<n;++i)r.push(t);return r}var Ur={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(e){return s(s({},e),{table:function(r){var n=e.table(r),r=n.schema,i=Object.create(null),c=[];function p(x,E,C){var D=qt(x),S=i[D]=i[D]||[],A=x==null?0:typeof x=="string"?1:x.length,_=0<E,D=s(s({},C),{name:_?"".concat(D,"(virtual-from:").concat(C.name,")"):C.name,lowLevelIndex:C,isVirtual:_,keyTail:E,keyLength:A,extractKey:Ua(x),unique:!_&&C.unique});return S.push(D),D.isPrimaryKey||c.push(D),1<A&&p(A===2?x[0]:x.slice(0,A-1),E+1,C),S.sort(function(j,M){return j.keyTail-M.keyTail}),D}var m=p(r.primaryKey.keyPath,0,r.primaryKey);i[":id"]=[m];for(var y=0,T=r.indexes;y<T.length;y++){var w=T[y];p(w.keyPath,0,w)}function v(x){var E,C=x.query.index;return C.isVirtual?s(s({},x),{query:{index:C.lowLevelIndex,range:(E=x.query.range,C=C.keyTail,{type:E.type===1?2:E.type,lower:ya(E.lower,E.lowerOpen?e.MAX_KEY:e.MIN_KEY,C),lowerOpen:!0,upper:ya(E.upper,E.upperOpen?e.MIN_KEY:e.MAX_KEY,C),upperOpen:!0})}}):x}return s(s({},n),{schema:s(s({},r),{primaryKey:m,indexes:c,getIndexByKeyPath:function(x){return(x=i[qt(x)])&&x[0]}}),count:function(x){return n.count(v(x))},query:function(x){return n.query(v(x))},openCursor:function(x){var E=x.query.index,C=E.keyTail,S=E.keyLength;return E.isVirtual?n.openCursor(v(x)).then(function(_){return _&&A(_)}):n.openCursor(x);function A(_){return Object.create(_,{continue:{value:function(D){D!=null?_.continue(ya(D,x.reverse?e.MAX_KEY:e.MIN_KEY,C)):x.unique?_.continue(_.key.slice(0,S).concat(x.reverse?e.MIN_KEY:e.MAX_KEY,C)):_.continue()}},continuePrimaryKey:{value:function(D,j){_.continuePrimaryKey(ya(D,e.MAX_KEY,C),j)}},primaryKey:{get:function(){return _.primaryKey}},key:{get:function(){var D=_.key;return S===1?D[0]:D.slice(0,S)}},value:{get:function(){return _.value}}})}}})}})}};function sn(e,t,n,r){return n=n||{},r=r||"",u(e).forEach(function(i){var c,p,m;P(t,i)?(c=e[i],p=t[i],typeof c=="object"&&typeof p=="object"&&c&&p?(m=Xe(c))!==Xe(p)?n[r+i]=t[i]:m==="Object"?sn(c,p,n,r+i+"."):c!==p&&(n[r+i]=t[i]):c!==p&&(n[r+i]=t[i])):n[r+i]=void 0}),u(t).forEach(function(i){P(e,i)||(n[r+i]=t[i])}),n}function ln(e,t){return t.type==="delete"?t.keys:t.keys||t.values.map(e.extractKey)}var Wr={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(e){return s(s({},e),{table:function(t){var n=e.table(t),r=n.schema.primaryKey;return s(s({},n),{mutate:function(i){var c=Z.trans,p=c.table(t).hook,m=p.deleting,y=p.creating,T=p.updating;switch(i.type){case"add":if(y.fire===he)break;return c._promise("readwrite",function(){return w(i)},!0);case"put":if(y.fire===he&&T.fire===he)break;return c._promise("readwrite",function(){return w(i)},!0);case"delete":if(m.fire===he)break;return c._promise("readwrite",function(){return w(i)},!0);case"deleteRange":if(m.fire===he)break;return c._promise("readwrite",function(){return(function v(x,E,C){return n.query({trans:x,values:!1,query:{index:r,range:E},limit:C}).then(function(S){var A=S.result;return w({type:"delete",keys:A,trans:x}).then(function(_){return 0<_.numFailures?Promise.reject(_.failures[0]):A.length<C?{failures:[],numFailures:0,lastResult:void 0}:v(x,s(s({},E),{lower:A[A.length-1],lowerOpen:!0}),C)})})})(i.trans,i.range,1e4)},!0)}return n.mutate(i);function w(v){var x,E,C,S=Z.trans,A=v.keys||ln(r,v);if(A)return(v=v.type==="add"||v.type==="put"?s(s({},v),{keys:A}):s({},v)).type!=="delete"&&(v.values=l([],v.values)),v.keys&&(v.keys=l([],v.keys)),x=n,C=A,((E=v).type==="add"?Promise.resolve([]):x.getMany({trans:E.trans,keys:C,cache:"immutable"})).then(function(_){var D=A.map(function(j,M){var B,K,q,Y=_[M],N={onerror:null,onsuccess:null};return v.type==="delete"?m.fire.call(N,j,Y,S):v.type==="add"||Y===void 0?(B=y.fire.call(N,j,v.values[M],S),j==null&&B!=null&&(v.keys[M]=j=B,r.outbound||te(v.values[M],r.keyPath,j))):(B=sn(Y,v.values[M]),(K=T.fire.call(N,B,j,Y,S))&&(q=v.values[M],Object.keys(K).forEach(function(J){P(q,J)?q[J]=K[J]:te(q,J,K[J])}))),N});return n.mutate(v).then(function(j){for(var M=j.failures,B=j.results,K=j.numFailures,j=j.lastResult,q=0;q<A.length;++q){var Y=(B||A)[q],N=D[q];Y==null?N.onerror&&N.onerror(M[q]):N.onsuccess&&N.onsuccess(v.type==="put"&&_[q]?v.values[q]:Y)}return{failures:M,results:B,numFailures:K,lastResult:j}}).catch(function(j){return D.forEach(function(M){return M.onerror&&M.onerror(j)}),Promise.reject(j)})});throw new Error("Keys missing")}}})}})}};function Wn(e,t,n){try{if(!t||t.keys.length<e.length)return null;for(var r=[],i=0,c=0;i<t.keys.length&&c<e.length;++i)ue(t.keys[i],e[c])===0&&(r.push(n?me(t.values[i]):t.values[i]),++c);return r.length===e.length?r:null}catch{return null}}var Qr={stack:"dbcore",level:-1,create:function(e){return{table:function(t){var n=e.table(t);return s(s({},n),{getMany:function(r){var i;return r.cache?(i=Wn(r.keys,r.trans._cache,r.cache==="clone"))?U.resolve(i):n.getMany(r).then(function(c){return r.trans._cache={keys:r.keys,values:r.cache==="clone"?me(c):c},c}):n.getMany(r)},mutate:function(r){return r.type!=="add"&&(r.trans._cache=null),n.mutate(r)}})}}}};function Qn(e,t){return e.trans.mode==="readonly"&&!!e.subscr&&!e.trans.explicit&&e.trans.db._options.cache!=="disabled"&&!t.schema.primaryKey.outbound}function Yn(e,t){switch(e){case"query":return t.values&&!t.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var Yr={stack:"dbcore",level:0,name:"Observability",create:function(e){var t=e.schema.name,n=new De(e.MIN_KEY,e.MAX_KEY);return s(s({},e),{transaction:function(r,i,c){if(Z.subscr&&i!=="readonly")throw new ee.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(Z.querier));return e.transaction(r,i,c)},table:function(r){function i(A){var S,A=A.query;return[S=A.index,new De((S=(A=A.range).lower)!=null?S:e.MIN_KEY,(S=A.upper)!=null?S:e.MAX_KEY)]}var c=e.table(r),p=c.schema,m=p.primaryKey,y=p.indexes,T=m.extractKey,w=m.outbound,v=m.autoIncrement&&y.filter(function(C){return C.compound&&C.keyPath.includes(m.keyPath)}),x=s(s({},c),{mutate:function(C){function S(R){return R="idb://".concat(t,"/").concat(r,"/").concat(R),M[R]||(M[R]=new De)}var A,_,D,j=C.trans,M=C.mutatedParts||(C.mutatedParts={}),B=S(""),K=S(":dels"),q=C.type,N=C.type==="deleteRange"?[C.range]:C.type==="delete"?[C.keys]:C.values.length<50?[ln(m,C).filter(function(R){return R}),C.values]:[],Y=N[0],N=N[1],J=C.trans._cache;return g(Y)?(B.addKeys(Y),(q=q==="delete"||Y.length===N.length?Wn(Y,J):null)||K.addKeys(Y),(q||N)&&(A=S,_=q,D=N,p.indexes.forEach(function(R){var ne=A(R.name||"");function re(de){return de!=null?R.extractKey(de):null}function ie(de){R.multiEntry&&g(de)?de.forEach(function(Be){return ne.addKey(Be)}):ne.addKey(de)}(_||D).forEach(function(de,_e){var se=_&&re(_[_e]),_e=D&&re(D[_e]);ue(se,_e)!==0&&(se!=null&&ie(se),_e!=null)&&ie(_e)})}))):Y?(N={from:(J=Y.lower)!=null?J:e.MIN_KEY,to:(q=Y.upper)!=null?q:e.MAX_KEY},K.add(N),B.add(N)):(B.add(n),K.add(n),p.indexes.forEach(function(R){return S(R.name).add(n)})),c.mutate(C).then(function(R){return!Y||C.type!=="add"&&C.type!=="put"||(B.addKeys(R.results),v&&v.forEach(function(ne){for(var re=C.values.map(function(se){return ne.extractKey(se)}),ie=ne.keyPath.findIndex(function(se){return se===m.keyPath}),de=0,Be=R.results.length;de<Be;++de)re[de][ie]=R.results[de];S(ne.name).addKeys(re)})),j.mutatedParts=ba(j.mutatedParts||{},M),R})}}),E={get:function(C){return[m,new De(C.key)]},getMany:function(C){return[m,new De().addKeys(C.keys)]},count:i,query:i,openCursor:i};return u(E).forEach(function(C){x[C]=function(S){var A=Z.subscr,_=!!A,D=Qn(Z,c)&&Yn(C,S)?S.obsSet={}:A;if(_){var j,A=function(N){return N="idb://".concat(t,"/").concat(r,"/").concat(N),D[N]||(D[N]=new De)},M=A(""),B=A(":dels"),_=E[C](S),K=_[0],_=_[1];if((C==="query"&&K.isPrimaryKey&&!S.values?B:A(K.name||"")).add(_),!K.isPrimaryKey){if(C!=="count")return j=C==="query"&&w&&S.values&&c.query(s(s({},S),{values:!1})),c[C].apply(this,arguments).then(function(N){if(C==="query"){if(w&&S.values)return j.then(function(re){return re=re.result,M.addKeys(re),N});var J=S.values?N.result.map(T):N.result;(S.values?M:B).addKeys(J)}else{var R,ne;if(C==="openCursor")return ne=S.values,(R=N)&&Object.create(R,{key:{get:function(){return B.addKey(R.primaryKey),R.key}},primaryKey:{get:function(){var re=R.primaryKey;return B.addKey(re),re}},value:{get:function(){return ne&&M.addKey(R.primaryKey),R.value}}})}return N});B.add(n)}}return c[C].apply(this,arguments)}}),x}})}};function Jn(e,t,n){var r;return n.numFailures===0?t:t.type==="deleteRange"||(r=t.keys?t.keys.length:"values"in t&&t.values?t.values.length:1,n.numFailures===r)?null:(r=s({},t),g(r.keys)&&(r.keys=r.keys.filter(function(i,c){return!(c in n.failures)})),"values"in r&&g(r.values)&&(r.values=r.values.filter(function(i,c){return!(c in n.failures)})),r)}function cn(e,t){return n=e,((r=t).lower===void 0||(r.lowerOpen?0<ue(n,r.lower):0<=ue(n,r.lower)))&&(n=e,(r=t).upper===void 0||(r.upperOpen?ue(n,r.upper)<0:ue(n,r.upper)<=0));var n,r}function Xn(e,t,n,r,i,c){var p,m,y,T,w,v,x;return!n||n.length===0||(p=t.query.index,m=p.multiEntry,y=t.query.range,T=r.schema.primaryKey.extractKey,w=p.extractKey,v=(p.lowLevelIndex||p).extractKey,(r=n.reduce(function(E,C){var S=E,A=[];if(C.type==="add"||C.type==="put")for(var _=new De,D=C.values.length-1;0<=D;--D){var j,M=C.values[D],B=T(M);!_.hasKey(B)&&(j=w(M),m&&g(j)?j.some(function(J){return cn(J,y)}):cn(j,y))&&(_.addKey(B),A.push(M))}switch(C.type){case"add":var K=new De().addKeys(t.values?E.map(function(R){return T(R)}):E),S=E.concat(t.values?A.filter(function(R){return R=T(R),!K.hasKey(R)&&(K.addKey(R),!0)}):A.map(function(R){return T(R)}).filter(function(R){return!K.hasKey(R)&&(K.addKey(R),!0)}));break;case"put":var q=new De().addKeys(C.values.map(function(R){return T(R)}));S=E.filter(function(R){return!q.hasKey(t.values?T(R):R)}).concat(t.values?A:A.map(function(R){return T(R)}));break;case"delete":var Y=new De().addKeys(C.keys);S=E.filter(function(R){return!Y.hasKey(t.values?T(R):R)});break;case"deleteRange":var N=C.range;S=E.filter(function(R){return!cn(T(R),N)})}return S},e))===e)?e:(x=function(E,C){return ue(v(E),v(C))||ue(T(E),T(C))},r.sort(t.direction==="prev"||t.direction==="prevunique"?function(E,C){return x(C,E)}:x),t.limit&&t.limit<1/0&&(r.length>t.limit?r.length=t.limit:e.length===t.limit&&r.length<t.limit&&(i.dirty=!0)),c?Object.freeze(r):r)}function Zn(e,t){return ue(e.lower,t.lower)===0&&ue(e.upper,t.upper)===0&&!!e.lowerOpen==!!t.lowerOpen&&!!e.upperOpen==!!t.upperOpen}function Jr(e,t){return((n,r,i,c)=>{if(n===void 0)return r!==void 0?-1:0;if(r===void 0)return 1;if((n=ue(n,r))===0){if(i&&c)return 0;if(i)return 1;if(c)return-1}return n})(e.lower,t.lower,e.lowerOpen,t.lowerOpen)<=0&&0<=((n,r,i,c)=>{if(n===void 0)return r!==void 0?1:0;if(r===void 0)return-1;if((n=ue(n,r))===0){if(i&&c)return 0;if(i)return-1;if(c)return 1}return n})(e.upper,t.upper,e.upperOpen,t.upperOpen)}function Xr(e,t,n,r){e.subscribers.add(n),r.addEventListener("abort",function(){var i,c;e.subscribers.delete(n),e.subscribers.size===0&&(i=e,c=t,setTimeout(function(){i.subscribers.size===0&&Oe(c,i)},3e3))})}var Zr={stack:"dbcore",level:0,name:"Cache",create:function(e){var t=e.schema.name;return s(s({},e),{transaction:function(n,r,i){var c,p,m=e.transaction(n,r,i);return r==="readwrite"&&(i=(c=new AbortController).signal,m.addEventListener("abort",(p=function(y){return function(){if(c.abort(),r==="readwrite"){for(var T=new Set,w=0,v=n;w<v.length;w++){var x=v[w],E=ft["idb://".concat(t,"/").concat(x)];if(E){var C=e.table(x),S=E.optimisticOps.filter(function(R){return R.trans===m});if(m._explicit&&y&&m.mutatedParts)for(var A=0,_=Object.values(E.queries.query);A<_.length;A++)for(var D=0,j=(K=_[A]).slice();D<j.length;D++)tn((q=j[D]).obsSet,m.mutatedParts)&&(Oe(K,q),q.subscribers.forEach(function(R){return T.add(R)}));else if(0<S.length){E.optimisticOps=E.optimisticOps.filter(function(R){return R.trans!==m});for(var M=0,B=Object.values(E.queries.query);M<B.length;M++)for(var K,q,Y,N=0,J=(K=B[M]).slice();N<J.length;N++)(q=J[N]).res!=null&&m.mutatedParts&&(y&&!q.dirty?(Y=Object.isFrozen(q.res),Y=Xn(q.res,q.req,S,C,q,Y),q.dirty?(Oe(K,q),q.subscribers.forEach(function(R){return T.add(R)})):Y!==q.res&&(q.res=Y,q.promise=U.resolve({result:Y}))):(q.dirty&&Oe(K,q),q.subscribers.forEach(function(R){return T.add(R)})))}}}T.forEach(function(R){return R()})}}})(!1),{signal:i}),m.addEventListener("error",p(!1),{signal:i}),m.addEventListener("complete",p(!0),{signal:i})),m},table:function(n){var r=e.table(n),i=r.schema.primaryKey;return s(s({},r),{mutate:function(c){var p,m=Z.trans;return!i.outbound&&m.db._options.cache!=="disabled"&&!m.explicit&&m.idbtrans.mode==="readwrite"&&(p=ft["idb://".concat(t,"/").concat(n)])?(m=r.mutate(c),c.type!=="add"&&c.type!=="put"||!(50<=c.values.length||ln(i,c).some(function(y){return y==null}))?(p.optimisticOps.push(c),c.mutatedParts&&va(c.mutatedParts),m.then(function(y){0<y.numFailures&&(Oe(p.optimisticOps,c),(y=Jn(0,c,y))&&p.optimisticOps.push(y),c.mutatedParts)&&va(c.mutatedParts)}),m.catch(function(){Oe(p.optimisticOps,c),c.mutatedParts&&va(c.mutatedParts)})):m.then(function(y){var T=Jn(0,s(s({},c),{values:c.values.map(function(w,v){var x;return y.failures[v]?w:(te(x=(x=i.keyPath)!=null&&x.includes(".")?me(w):s({},w),i.keyPath,y.results[v]),x)})}),y);p.optimisticOps.push(T),queueMicrotask(function(){return c.mutatedParts&&va(c.mutatedParts)})}),m):r.mutate(c)},query:function(c){var p,m,y,T,w,v,x;return Qn(Z,r)&&Yn("query",c)?(p=((y=Z.trans)==null?void 0:y.db._options.cache)==="immutable",m=(y=Z).requery,y=y.signal,v=((E,C,S,A)=>{var _=ft["idb://".concat(E,"/").concat(C)];if(!_)return[];if(!(E=_.queries[S]))return[null,!1,_,null];var D=E[(A.query?A.query.index.name:null)||""];if(!D)return[null,!1,_,null];switch(S){case"query":var j=(M=A.direction)!=null?M:"next",M=D.find(function(B){var K;return B.req.limit===A.limit&&B.req.values===A.values&&((K=B.req.direction)!=null?K:"next")===j&&Zn(B.req.query.range,A.query.range)});return M?[M,!0,_,D]:[D.find(function(B){var K;return("limit"in B.req?B.req.limit:1/0)>=A.limit&&((K=B.req.direction)!=null?K:"next")===j&&(!A.values||B.req.values)&&Jr(B.req.query.range,A.query.range)}),!1,_,D];case"count":return M=D.find(function(B){return Zn(B.req.query.range,A.query.range)}),[M,!!M,_,D]}})(t,n,"query",c),x=v[0],T=v[2],w=v[3],x&&v[1]?x.obsSet=c.obsSet:(v=r.query(c).then(function(E){var C=E.result;if(x&&(x.res=C),p){for(var S=0,A=C.length;S<A;++S)Object.freeze(C[S]);Object.freeze(C)}return E}).catch(function(E){return w&&x&&Oe(w,x),Promise.reject(E)}),x={obsSet:c.obsSet,promise:v,subscribers:new Set,type:"query",req:c,dirty:!1},w?w.push(x):(w=[x],(T=T||(ft["idb://".concat(t,"/").concat(n)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[c.query.index.name||""]=w)),Xr(x,w,m,y),x.promise.then(function(E){return E=Xn(E.result,c,T==null?void 0:T.optimisticOps,r,x,p),{result:p?E:me(E)}})):r.query(c)}})}})}};function xa(e,t){return new Proxy(e,{get:function(n,r,i){return r==="db"?t:Reflect.get(n,r,i)}})}Se.prototype.version=function(e){if(isNaN(e)||e<.1)throw new ee.Type("Given version is not a positive number");if(e=Math.round(10*e)/10,this.idbdb||this._state.isBeingOpened)throw new ee.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,e);var t=this._versions,n=t.filter(function(r){return r._cfg.version===e})[0];return n||(n=new this.Version(e),t.push(n),t.sort(Kr),n.stores({}),this._state.autoSchema=!1),n},Se.prototype._whenReady=function(e){var t=this;return this.idbdb&&(this._state.openComplete||Z.letThrough||this._vip)?e():new U(function(n,r){if(t._state.openComplete)return r(new ee.DatabaseClosed(t._state.dbOpenError));if(!t._state.isBeingOpened){if(!t._state.autoOpen)return void r(new ee.DatabaseClosed);t.open().catch(he)}t._state.dbReadyPromise.then(n,r)}).then(e)},Se.prototype.use=function(i){var t=i.stack,n=i.create,r=i.level,i=i.name,c=(i&&this.unuse({stack:t,name:i}),this._middlewares[t]||(this._middlewares[t]=[]));return c.push({stack:t,create:n,level:r??10,name:i}),c.sort(function(p,m){return p.level-m.level}),this},Se.prototype.unuse=function(e){var t=e.stack,n=e.name,r=e.create;return t&&this._middlewares[t]&&(this._middlewares[t]=this._middlewares[t].filter(function(i){return r?i.create!==r:!!n&&i.name!==n})),this},Se.prototype.open=function(){var e=this;return dt(We,function(){return Vr(e)})},Se.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var e=this._state;if(zt.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}e.isBeingOpened||(e.dbReadyPromise=new U(function(t){e.dbReadyResolve=t}),e.openCanceller=new U(function(t,n){e.cancelOpen=n}))},Se.prototype.close=function(t){var t=(t===void 0?{disableAutoOpen:!0}:t).disableAutoOpen,n=this._state;t?(n.isBeingOpened&&n.cancelOpen(new ee.DatabaseClosed),this._close(),n.autoOpen=!1,n.dbOpenError=new ee.DatabaseClosed):(this._close(),n.autoOpen=this._options.autoOpen||n.isBeingOpened,n.openComplete=!1,n.dbOpenError=null)},Se.prototype.delete=function(e){var t=this,n=(e===void 0&&(e={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),r=this._state;return new U(function(i,c){function p(){t.close(e);var m=t._deps.indexedDB.deleteDatabase(t.name);m.onsuccess=xe(function(){var y,T,w;y=t._deps,T=t.name,Xa(w=y.indexedDB)||T===ra||Ja(w,y.IDBKeyRange).delete(T).catch(he),i()}),m.onerror=Ke(c),m.onblocked=t._fireOnBlocked}if(n)throw new ee.InvalidArgument("Invalid closeOptions argument to db.delete()");r.isBeingOpened?r.dbReadyPromise.then(p):p()})},Se.prototype.backendDB=function(){return this.idbdb},Se.prototype.isOpen=function(){return this.idbdb!==null},Se.prototype.hasBeenClosed=function(){var e=this._state.dbOpenError;return e&&e.name==="DatabaseClosed"},Se.prototype.hasFailed=function(){return this._state.dbOpenError!==null},Se.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(Se.prototype,"tables",{get:function(){var e=this;return u(this._allTables).map(function(t){return e._allTables[t]})},enumerable:!1,configurable:!0}),Se.prototype.transaction=function(){var e=(function(t,n,r){var i=arguments.length;if(i<2)throw new ee.InvalidArgument("Too few arguments");for(var c=new Array(i-1);--i;)c[i-1]=arguments[i];return r=c.pop(),[t,W(c),r]}).apply(this,arguments);return this._transaction.apply(this,e)},Se.prototype._transaction=function(e,t,n){var r,i,c=this,p=Z.trans,m=(p&&p.db===this&&e.indexOf("!")===-1||(p=null),e.indexOf("?")!==-1);e=e.replace("!","").replace("?","");try{if(i=t.map(function(T){if(T=T instanceof c.Table?T.name:T,typeof T!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return T}),e=="r"||e===za)r=za;else{if(e!="rw"&&e!=Na)throw new ee.InvalidArgument("Invalid transaction mode: "+e);r=Na}if(p){if(p.mode===za&&r===Na){if(!m)throw new ee.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");p=null}p&&i.forEach(function(T){if(p&&p.storeNames.indexOf(T)===-1){if(!m)throw new ee.SubTransaction("Table "+T+" not included in parent transaction.");p=null}}),m&&p&&!p.active&&(p=null)}}catch(T){return p?p._promise(null,function(w,v){v(T)}):we(T)}var y=(function T(w,v,x,E,C){return U.resolve().then(function(){var D=Z.transless||Z,S=w._createTransaction(v,x,w._dbSchema,E),D=(S.explicit=!0,{trans:S,transless:D});if(E)S.idbtrans=E.idbtrans;else try{S.create(),S.idbtrans._explicit=!0,w._state.PR1398_maxLoop=3}catch(j){return j.name===_a.InvalidState&&w.isOpen()&&0<--w._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),w.close({disableAutoOpen:!1}),w.open().then(function(){return T(w,v,x,null,C)})):we(j)}var A,_=Pe(C),D=(_&&wt(),U.follow(function(){var j;(A=C.call(S,S))&&(_?(j=et.bind(null,null),A.then(j,j)):typeof A.next=="function"&&typeof A.throw=="function"&&(A=on(A)))},D));return(A&&typeof A.then=="function"?U.resolve(A).then(function(j){return S.active?j:we(new ee.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):D.then(function(){return A})).then(function(j){return E&&S._resolve(),S._completion.then(function(){return j})}).catch(function(j){return S._reject(j),we(j)})})}).bind(null,this,r,i,p,n);return p?p._promise(r,y,"lock"):Z.trans?dt(Z.transless,function(){return c._whenReady(y)}):this._whenReady(y)},Se.prototype.table=function(e){if(P(this._allTables,e))return this._allTables[e];throw new ee.InvalidTable("Table ".concat(e," does not exist"))};var Ye=Se;function Se(e,t){var n,r,i,c,p,m=this,y=(this._middlewares={},this.verno=0,Se.dependencies),y=(this._options=t=s({addons:Se.addons,autoOpen:!0,indexedDB:y.indexedDB,IDBKeyRange:y.IDBKeyRange,cache:"cloned",maxConnections:1e3},t),this._deps={indexedDB:t.indexedDB,IDBKeyRange:t.IDBKeyRange},t.addons),T=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:he,dbReadyPromise:null,cancelOpen:he,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:t.autoOpen}),w=(T.dbReadyPromise=new U(function(v){T.dbReadyResolve=v}),T.openCanceller=new U(function(v,x){T.cancelOpen=x}),this._state=T,this.name=e,this.on=Ot(this,"populate","blocked","versionchange","close",{ready:[$a,he]}),this.once=function(v,x){var E=function(){for(var C=[],S=0;S<arguments.length;S++)C[S]=arguments[S];m.on(v).unsubscribe(E),x.apply(m,C)};return m.on(v,E)},this.on.ready.subscribe=ge(this.on.ready.subscribe,function(v){return function(x,E){Se.vip(function(){var C,S=m._state;S.openComplete?(S.dbOpenError||U.resolve().then(x),E&&v(x)):S.onReadyBeingFired?(S.onReadyBeingFired.push(x),E&&v(x)):(v(x),C=m,E||v(function A(){C.on.ready.unsubscribe(x),C.on.ready.unsubscribe(A)}))})}}),this.Collection=(n=this,Mt(Or.prototype,function(A,S){this.db=n;var E=Tn,C=null;if(S)try{E=S()}catch(D){C=D}var S=A._ctx,A=S.table,_=A.hook.reading.fire;this._ctx={table:A,index:S.index,isPrimKey:!S.index||A.schema.primKey.keyPath&&S.index===A.schema.primKey.name,range:E,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:C,or:S.or,valueMapper:_!==Dt?_:null}})),this.Table=(r=this,Mt(In.prototype,function(v,x,E){this.db=r,this._tx=E,this.name=v,this.schema=x,this.hook=r._allTables[v]?r._allTables[v].hook:Ot(null,{creating:[Er,he],reading:[Ar,Dt],updating:[Tr,he],deleting:[Pr,he]})})),this.Transaction=(i=this,Mt(Br.prototype,function(v,x,E,C,S){var A=this;v!=="readonly"&&x.forEach(function(_){_=(_=E[_])==null?void 0:_.yProps,_&&(x=x.concat(_.map(function(D){return D.updatesTable})))}),this.db=i,this.mode=v,this.storeNames=x,this.schema=E,this.chromeTransactionDurability=C,this.idbtrans=null,this.on=Ot(this,"complete","error","abort"),this.parent=S||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new U(function(_,D){A._resolve=_,A._reject=D}),this._completion.then(function(){A.active=!1,A.on.complete.fire()},function(_){var D=A.active;return A.active=!1,A.on.error.fire(_),A.parent?A.parent._reject(_):D&&A.idbtrans&&A.idbtrans.abort(),we(_)})})),this.Version=(c=this,Mt(Hr.prototype,function(v){this.db=c,this._cfg={version:v,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(p=this,Mt(qn.prototype,function(v,x,E){if(this.db=p,this._ctx={table:v,index:x===":id"?null:x,or:E},this._cmp=this._ascending=ue,this._descending=function(C,S){return ue(S,C)},this._max=function(C,S){return 0<ue(C,S)?C:S},this._min=function(C,S){return ue(C,S)<0?C:S},this._IDBKeyRange=p._deps.IDBKeyRange,!this._IDBKeyRange)throw new ee.MissingAPI})),this.on("versionchange",function(v){0<v.newVersion?console.warn("Another connection wants to upgrade database '".concat(m.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(m.name,"'. Closing db now to resume the delete request.")),m.close({disableAutoOpen:!1})}),this.on("blocked",function(v){!v.newVersion||v.newVersion<v.oldVersion?console.warn("Dexie.delete('".concat(m.name,"') was blocked")):console.warn("Upgrade '".concat(m.name,"' blocked by other connection holding version ").concat(v.oldVersion/10))}),this._maxKey=Bt(t.IDBKeyRange),this._createTransaction=function(v,x,E,C){return new m.Transaction(v,x,E,m._options.chromeTransactionDurability,C)},this._fireOnBlocked=function(v){m.on("blocked").fire(v),zt.toArray().filter(function(x){return x.name===m.name&&x!==m&&!x._state.vcFired}).map(function(x){return x.on("versionchange").fire(v)})},this.use(Qr),this.use(Zr),this.use(Yr),this.use(Ur),this.use(Wr),new Proxy(this,{get:function(v,x,E){var C;return x==="_vip"||(x==="table"?function(S){return xa(m.table(S),w)}:(C=Reflect.get(v,x,E))instanceof In?xa(C,w):x==="tables"?C.map(function(S){return xa(S,w)}):x==="_createTransaction"?function(){return xa(C.apply(this,arguments),w)}:C)}}));this.vip=w,y.forEach(function(v){return v(m)})}var wa,At=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",eo=(dn.prototype.subscribe=function(e,t,n){return this._subscribe(e&&typeof e!="function"?e:{next:e,error:t,complete:n})},dn.prototype[At]=function(){return this},dn);function dn(e){this._subscribe=e}try{wa={indexedDB:d.indexedDB||d.mozIndexedDB||d.webkitIndexedDB||d.msIndexedDB,IDBKeyRange:d.IDBKeyRange||d.webkitIDBKeyRange}}catch{wa={indexedDB:null,IDBKeyRange:null}}function er(e){var t,n=!1,r=new eo(function(i){var c=Pe(e),p,m=!1,y={},T={},w={get closed(){return m},unsubscribe:function(){m||(m=!0,p&&p.abort(),v&&nt.storagemutated.unsubscribe(C))}},v=(i.start&&i.start(w),!1),x=function(){return qa(S)};function E(){return tn(T,y)}var C=function(A){ba(y,A),E()&&x()},S=function(){var A,_,D;!m&&wa.indexedDB&&(y={},A={},p&&p.abort(),p=new AbortController,D=(j=>{var M=yt();try{c&&wt();var B=Ze(e,j);return B=c?B.finally(et):B}finally{M&&xt()}})(_={subscr:A,signal:p.signal,requery:x,querier:e,trans:null}),v||(nt.storagemutated.subscribe(C),v=!0),Promise.resolve(D).then(function(j){n=!0,t=j,m||_.signal.aborted||(E()||(T=A,E())?x():(y={},qa(function(){return!m&&i.next&&i.next(j)})))},function(j){n=!1,["DatabaseClosedError","AbortError"].includes(j==null?void 0:j.name)||m||qa(function(){m||i.error&&i.error(j)})}))};return setTimeout(x,0),w});return r.hasValue=function(){return n},r.getValue=function(){return t},r}var mt=Ye;function un(e){var t=rt;try{rt=!0,nt.storagemutated.fire(e),rn(e,!0)}finally{rt=t}}$(mt,s(s({},Te),{delete:function(e){return new mt(e,{addons:[]}).delete()},exists:function(e){return new mt(e,{addons:[]}).open().then(function(t){return t.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(e){try{return t=mt.dependencies,n=t.indexedDB,t=t.IDBKeyRange,(Xa(n)?Promise.resolve(n.databases()).then(function(r){return r.map(function(i){return i.name}).filter(function(i){return i!==ra})}):Ja(n,t).toCollection().primaryKeys()).then(e)}catch{return we(new ee.MissingAPI)}var t,n},defineClass:function(){return function(e){h(this,e)}},ignoreTransaction:function(e){return Z.trans?dt(Z.transless||We,e):e()},vip:Za,async:function(e){return function(){try{var t=on(e.apply(this,arguments));return t&&typeof t.then=="function"?t:U.resolve(t)}catch(n){return we(n)}}},spawn:function(e,t,n){try{var r=on(e.apply(n,t||[]));return r&&typeof r.then=="function"?r:U.resolve(r)}catch(i){return we(i)}},currentTransaction:{get:function(){return Z.trans||null}},waitFor:function(e,t){return e=U.resolve(typeof e=="function"?mt.ignoreTransaction(e):e).timeout(t||6e4),Z.trans?Z.trans.waitFor(e):e},Promise:U,debug:{get:function(){return Fe},set:function(e){wn(e)}},derive:V,extend:h,props:$,override:ge,Events:Ot,on:nt,liveQuery:er,extendObservabilitySet:ba,getByKeyPath:X,setByKeyPath:te,delByKeyPath:function(e,t){typeof t=="string"?te(e,t,void 0):"length"in t&&[].map.call(t,function(n){te(e,n,void 0)})},shallowClone:fe,deepClone:me,getObjectDiff:sn,cmp:ue,asap:z,minKey:-1/0,addons:[],connections:{get:zt.toArray},errnames:_a,dependencies:wa,cache:ft,semVer:"4.4.6",version:"4.4.6".split(".").map(function(e){return parseInt(e)}).reduce(function(e,t,n){return e+t/Math.pow(10,2*n)})})),mt.maxKey=Bt(mt.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(nt(da,function(e){rt||(e=new CustomEvent(Ga,{detail:e}),rt=!0,dispatchEvent(e),rt=!1)}),addEventListener(Ga,function(e){e=e.detail,rt||un(e)}));var Et,rt=!1,tr=function(){};return typeof BroadcastChannel<"u"&&((tr=function(){(Et=new BroadcastChannel(Ga)).onmessage=function(e){return e.data&&un(e.data)}})(),typeof Et.unref=="function"&&Et.unref(),nt(da,function(e){rt||Et.postMessage(e)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(e){if(!Ye.disableBfCache&&e.persisted){Fe&&console.debug("Dexie: handling persisted pagehide"),Et!=null&&Et.close();for(var t=0,n=zt.toArray();t<n.length;t++)n[t].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(e){!Ye.disableBfCache&&e.persisted&&(Fe&&console.debug("Dexie: handling persisted pageshow"),tr(),un({all:new De(-1/0,[[]])}))})),U.rejectionMapper=function(e,t){return!e||e instanceof Ue||e instanceof TypeError||e instanceof SyntaxError||!e.name||!xn[e.name]?e:(t=new xn[e.name](t||e.message,e),"stack"in e&&I(t,"stack",{get:function(){return this.inner.stack}}),t)},wn(Fe),s(Ye,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:Ye,Entity:Dn,PropModification:It,RangeSet:De,add:function(e){return new It({add:e})},cmp:ue,default:Ye,liveQuery:er,mergeRanges:Kt,rangesOverlap:Gn,remove:function(e){return new It({remove:e})},replacePrefix:function(e,t){return new It({replacePrefix:[e,t]})}}),{default:Ye}),Ye})})(Ca)),Ca.exports}var As=Cs();const vn=Ss(As),br=Symbol.for("Dexie"),Ta=globalThis[br]||(globalThis[br]=vn);if(vn.semVer!==Ta.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${vn.semVer} and ${Ta.semVer}`);const{liveQuery:Zs,mergeRanges:ei,rangesOverlap:ti,RangeSet:ai,cmp:ni,Entity:ri,PropModification:oi,replacePrefix:si,add:ii,remove:li,DexieYProvider:ci}=Ta;class Es extends Ta{constructor(){super("AnaxagorasAIDatabase");ke(this,"aiSettings");ke(this,"studyBlocks");ke(this,"projectTasks");ke(this,"userProfile");this.version(1).stores({aiSettings:"++id, provider, modelName",studyBlocks:"++id, date, subject, completed, syncedWithGoogle",projectTasks:"++id, subject, currentPhase, dueDate",userProfile:"id, email"})}}const ce=new Es;async function Ps(){await ce.aiSettings.count()===0&&await ce.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}),await Sr(),await kr()}async function Sr(){const f=await ce.studyBlocks.filter(h=>!h.gradeKey).toArray();if(f.length>0)for(const h of f)h.id&&await ce.studyBlocks.delete(h.id);const a=await ce.studyBlocks.filter(h=>h.gradeKey==="1eso").count(),o=await ce.studyBlocks.filter(h=>h.gradeKey==="2batx").count(),s=new Date().toISOString().split("T")[0],l=new Date(Date.now()+864e5).toISOString().split("T")[0],d=new Date(Date.now()+864e5*2).toISOString().split("T")[0],u=new Date(Date.now()+864e5*3).toISOString().split("T")[0],g=new Date(Date.now()+864e5*4).toISOString().split("T")[0];a===0&&await ce.studyBlocks.bulkAdd([{title:"Análisis de Oraciones: Sujeto y Complemento Verbal",subject:"Lengua Castellana",date:s,startTime:"17:00",durationMinutes:45,type:"assignment_due",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.",notes:"Identificación del predicado y localización del Complemento Verbal (CV) en bloque.",syncedWithGoogle:!0,googleEventId:"gcal_eso_castellano"},{title:"Ciencias Naturales: El Reino Animal y los Ecosistemas",subject:"Ciencias Naturales",date:l,startTime:"16:30",durationMinutes:40,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.",notes:"Repaso con esquemas visuales de vertebrados e invertebrados.",syncedWithGoogle:!1},{title:"Matemáticas: Fracciones y Operaciones Básicas",subject:"Matemáticas",date:d,startTime:"17:15",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.",notes:"Ejercicios de suma y resta con común denominador.",syncedWithGoogle:!0,googleEventId:"gcal_eso_mates"},{title:"Control Tema 2: Egipto y las Civilizaciones Fluviales",subject:"Ciencias Sociales",date:u,startTime:"09:00",durationMinutes:50,type:"exam",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Control trimestral de departamento programado por el centro educativo.",notes:"Llevar mapa histórico de Mesopotamia y el Nilo.",syncedWithGoogle:!1},{title:"Lectura Guiada: Crónicas Juveniles y Vocabulario",subject:"Tutoría / Lectura",date:g,startTime:"16:00",durationMinutes:30,type:"study_session",completed:!1,gradeKey:"1eso",origin:"institutional",teacherNotes:"Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.",notes:"Lectura de 2 capítulos y ficha de comprensión lectora.",syncedWithGoogle:!1}]),o===0&&await ce.studyBlocks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",subject:"Lengua Castellana",date:s,startTime:"17:00",durationMinutes:55,type:"assignment_due",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).",notes:"Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.",syncedWithGoogle:!0,googleEventId:"gcal_batx_castellano"},{title:"Historia de España: La Constitución de 1812 y la Guerra de la Independencia",subject:"Historia de España",date:l,startTime:"18:00",durationMinutes:50,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.",notes:"Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.",syncedWithGoogle:!1},{title:"Matemáticas II: Matrices, Determinantes y Sistemas de Cramer (PAU)",subject:"Matemáticas II",date:d,startTime:"16:30",durationMinutes:60,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Práctica de selectividad asignada en clase para consolidar cálculo matricial.",notes:"Resolución de problemas de selectividad con discusión según parámetro k.",syncedWithGoogle:!0,googleEventId:"gcal_batx_mates"},{title:"Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)",subject:"Filosofía",date:u,startTime:"11:30",durationMinutes:60,type:"exam",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Prueba oficial de simulacro de Selectividad coordinada por el departamento.",notes:"Comparativa ontológica y epistemológica entre Platón y Descartes.",syncedWithGoogle:!1},{title:"Química: Termodinámica y Cinética Química (PAU)",subject:"Química",date:g,startTime:"17:30",durationMinutes:45,type:"study_session",completed:!1,gradeKey:"2batx",origin:"institutional",teacherNotes:"Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.",notes:"Cálculo de entalpía estándar y entropía de reacción.",syncedWithGoogle:!1}])}async function kr(){const f=await ce.projectTasks.filter(d=>!d.gradeKey).toArray();if(f.length>0)for(const d of f)d.id&&await ce.projectTasks.delete(d.id);const a=await ce.projectTasks.filter(d=>d.gradeKey==="1eso").count(),o=await ce.projectTasks.filter(d=>d.gradeKey==="2batx").count(),s=new Date(Date.now()+864e5*5).toISOString().split("T")[0],l=new Date(Date.now()+864e5*12).toISOString().split("T")[0];a===0&&await ce.projectTasks.bulkAdd([{title:"Análisis Sintáctico: El Predicado y el Complemento Verbal",subject:"Lengua Castellana y Literatura",gradeKey:"1eso",dueDate:s,currentPhase:"writing",autonomyScore:75,pedagogicalNote:"Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.",notes:'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',driveFiles:[{fileId:"drive_doc_sintaxis_1eso",name:"Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 1 día"}],criteria:[{id:"c_eso_1",label:'Identificación del Sujeto ("El tren") y el Predicado',checked:!0,explanation:"Diferenciado correctamente quién realiza la acción."},{id:"c_eso_2",label:'Localización del verbo principal ("llegó")',checked:!0,explanation:"Núcleo del predicado identificado."},{id:"c_eso_3",label:'Reconocimiento del Complemento Verbal ("puntual a la estación")',checked:!0,explanation:"Identificado en bloque como acompañante del verbo, sin clasificar subtipos."},{id:"c_eso_4",label:"Redacción de una oración propia con complemento verbal similar",checked:!1,explanation:"Pendiente de redactar y enviar al tutor."}]},{title:"Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad",subject:"Ciencias Naturales",gradeKey:"1eso",dueDate:l,currentPhase:"research",autonomyScore:50,pedagogicalNote:"Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.",notes:"Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.",driveFiles:[{fileId:"drive_doc_ecosistemas_1eso",name:"Guia_Maqueta_Ecosistemas.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 días"}],criteria:[{id:"c_eco_1",label:"Elección del ecosistema a representar (bosque, río o costa)",checked:!0,explanation:"Seleccionado bosque mediterráneo."},{id:"c_eco_2",label:"Lista de 5 especies autóctonas con su rol trófico",checked:!0,explanation:"Identificados productores, herbívoros y carnívoros."},{id:"c_eco_3",label:"Diseño visual de la maqueta y materiales reciclables",checked:!1,explanation:"En proceso de preparación."}]}]),o===0&&await ce.projectTasks.bulkAdd([{title:"Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)",subject:"Lengua Castellana y Literatura",gradeKey:"2batx",dueDate:s,currentPhase:"writing",autonomyScore:60,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.",notes:'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',driveFiles:[{fileId:"drive_doc_sintaxis_2batx",name:"Guia_PAU_Tipologia_Complementos_Verbales.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 3 horas"},{fileId:"drive_sheet_pruebas",name:"Matriz_Pruebas_Sintacticas_RAE.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c_batx_1",label:"Segmentación en Sintagmas y delimitación oracional formal",checked:!0,explanation:"SN Sujeto y SV Predicado identificados con precisión."},{id:"c_batx_2",label:'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',checked:!0,explanation:"Diferenciación estricta de la tipología de complementos del predicado."},{id:"c_batx_3",label:"Prueba sintáctica de concordancia para el CPredicativo",checked:!1,explanation:'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'},{id:"c_batx_4",label:"Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC",checked:!1,explanation:"Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales."}]},{title:"Monografía: Energías Renovables en el Mediterráneo",subject:"Ciencias y Tecnología",gradeKey:"2batx",dueDate:l,currentPhase:"research",autonomyScore:75,pedagogicalNote:"Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.",notes:"Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.",driveFiles:[{fileId:"drive_doc_01",name:"Borrador_Esquema_Energias.gdoc",mimeType:"application/vnd.google-apps.document",lastModified:"Hace 2 horas"},{fileId:"drive_sheet_02",name:"Datos_Produccion_2025.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",lastModified:"Ayer"}],criteria:[{id:"c1",label:"Formulación de la pregunta de investigación con mis palabras",checked:!0,explanation:"Definido el objetivo sin copia directa de internet."},{id:"c2",label:"Búsqueda y contraste de 3 fuentes académicas fiables",checked:!0,explanation:"Artículos de revistas científicas guardados en Drive."},{id:"c3",label:"Redacción de conclusiones propias basadas en los datos",checked:!1,explanation:"En proceso: reflexionar sobre los resultados sin pedir resumen a la IA."}]}])}const Ts=kr,vr="anaxagoras_auth_state",Ds=["openid","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/drive.readonly"].join(" ");class _s{constructor(){ke(this,"state",{isAuthenticated:!0,mode:"demo",user:null,clientId:"",scopes:{calendar:!0,drive:!0,profile:!0}});ke(this,"listeners",[]);this.loadPersistedState()}loadPersistedState(){try{const a=localStorage.getItem(vr);a?(this.state=JSON.parse(a),this.state.mode==="demo"&&this.state.user&&(this.state.user.gradeKey==="2batx"?(this.state.user.id="google_user_demo_2batx",this.state.user.name="Álvaro Martín (2º Bachillerato)",this.state.user.email="alvaro.martin@ies-catalunya.edu.cat"):(this.state.user.id="google_user_demo_1eso",this.state.user.name="Marc Vidal (1º de ESO)",this.state.user.email="marc.vidal@ies-catalunya.edu.cat"))):this.setDemoState("1eso")}catch{this.setDemoState("1eso")}}setDemoState(a="1eso"){const o=a==="2batx";this.state={isAuthenticated:!0,mode:"demo",clientId:"",user:{id:o?"google_user_demo_2batx":"google_user_demo_1eso",name:o?"Álvaro Martín (2º Bachillerato)":"Marc Vidal (1º de ESO)",email:o?"alvaro.martin@ies-catalunya.edu.cat":"marc.vidal@ies-catalunya.edu.cat",avatarUrl:o?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",gradeLevel:o?"2º de Bachillerato (17-18 años)":"1º de ESO (12 años)",gradeKey:a,stageName:o?"Operaciones Formales (Piaget)":"Operaciones Concretas (Piaget)",connectedAt:new Date().toISOString(),mode:"demo"},scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState()}saveState(){localStorage.setItem(vr,JSON.stringify(this.state)),this.notify()}getState(){return{...this.state}}subscribe(a){return this.listeners.push(a),a(this.state),()=>{this.listeners=this.listeners.filter(o=>o!==a)}}notify(){for(const a of this.listeners)a(this.state)}setClientId(a){this.state.clientId=a.trim(),this.saveState()}async connectDemo(a="1eso"){return this.setDemoState(a),this.state.user}setGradeProfile(a){if(!this.state.user){this.setDemoState(a);return}a==="1eso"?this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_1eso":this.state.user.id,name:this.state.mode==="demo"?"Marc Vidal (1º de ESO)":this.state.user.name,email:this.state.mode==="demo"?"marc.vidal@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"1º de ESO (12 años)",gradeKey:"1eso",stageName:"Operaciones Concretas (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl}:this.state.user={...this.state.user,id:this.state.mode==="demo"?"google_user_demo_2batx":this.state.user.id,name:this.state.mode==="demo"?"Álvaro Martín (2º Bachillerato)":this.state.user.name,email:this.state.mode==="demo"?"alvaro.martin@ies-catalunya.edu.cat":this.state.user.email,gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",avatarUrl:this.state.mode==="demo"?"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80":this.state.user.avatarUrl},this.saveState()}toggleGradeProfile(){var o;const a=((o=this.state.user)==null?void 0:o.gradeKey)||"1eso";this.setGradeProfile(a==="1eso"?"2batx":"1eso")}async connectRealGoogle(a){var s,l;const o=a||this.state.clientId;if(!o)throw new Error("Debes introducir un Google OAuth Client ID válido para conectar en modo real.");if(this.state.clientId=o,await this.ensureGoogleSDKLoaded(),!((l=(s=window.google)==null?void 0:s.accounts)!=null&&l.oauth2))throw new Error("La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.");return new Promise((d,u)=>{try{window.google.accounts.oauth2.initTokenClient({client_id:o,scope:Ds,callback:async h=>{if(h.error){u(new Error(`Error de autenticación Google: ${h.error}`));return}if(!h.access_token){u(new Error("No se recibió token de acceso de Google."));return}try{const b=await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${h.access_token}`}});if(!b.ok)throw new Error("Fallo al obtener información del perfil del usuario de Google.");const k=await b.json(),P={id:k.sub||`google_${Date.now()}`,name:k.name||"Álvaro Martín (2º de Bachillerato)",email:k.email||"alvaro.estudiante@batxillerat.cat",avatarUrl:k.picture||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",gradeLevel:"2º de Bachillerato (17-18 años)",gradeKey:"2batx",stageName:"Operaciones Formales (Piaget)",connectedAt:new Date().toISOString(),mode:"real"};this.state={isAuthenticated:!0,mode:"real",clientId:o,accessToken:h.access_token,tokenExpiry:Date.now()+(h.expires_in||3600)*1e3,user:P,scopes:{calendar:!0,drive:!0,profile:!0}},this.saveState(),d(P)}catch(b){u(b)}},error_callback:h=>{u(new Error((h==null?void 0:h.message)||"Error en el diálogo de inicio de sesión de Google."))}}).requestAccessToken({prompt:"consent"})}catch(g){u(g)}})}async ensureGoogleSDKLoaded(){var a,o;if(!((o=(a=window.google)==null?void 0:a.accounts)!=null&&o.oauth2))return new Promise(s=>{let l=0;const d=setInterval(()=>{var u,g;l++,((g=(u=window.google)==null?void 0:u.accounts)!=null&&g.oauth2||l>25)&&(clearInterval(d),s())},100)})}getAccessToken(){return this.state.mode==="real"&&this.state.accessToken?this.state.tokenExpiry&&Date.now()>this.state.tokenExpiry?(console.warn("[GoogleAuth] Token de acceso expirado."),null):this.state.accessToken:null}disconnect(){this.state={isAuthenticated:!1,mode:"demo",user:null,accessToken:void 0,tokenExpiry:void 0,clientId:this.state.clientId,scopes:{calendar:!1,drive:!1,profile:!1}},this.saveState()}}const ye=new _s,$s=`# 🏛️ Directriz Curricular Departamental: Lengua Castellana y Literatura (1º de ESO)\r
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
`,js=`# 🏛️ Directriz Curricular Departamental: Lengua Castellana y Literatura (2º de Bachillerato)\r
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
`;class Ls{constructor(){ke(this,"INSTITUTION_NAME","Departament d'Educació de la Generalitat de Catalunya");ke(this,"API_ENDPOINT","https://api.educacio.gencat.cat/v1/curriculum/guardrails");ke(this,"progressionRules",[{gradeKey:"1eso",triggerKeywords:["sujeto","complemento","verbal","oracion","oraciones"],nextBlock:()=>({title:"Práctica de Aula: Complemento Verbal en Textos Narrativos",subject:"Lengua Castellana",type:"assignment_due",durationMinutes:45,daysAhead:2,startTime:"17:00",notes:"Identificar el Complemento Verbal (CV) en bloque en 3 oraciones de la lectura.",teacherNotes:"El profesor ha finalizado la explicación del tema 1 en el aula. Entregar ficha de análisis.",reason:"assignment_published",notification:"El profesor de Lengua Castellana ha registrado en Esfer@ que el tema 1 ha sido completado en clase y ha publicado una entrega de ejercicios."})},{gradeKey:"1eso",triggerKeywords:["fraccion","fracciones","operaciones basicas"],nextBlock:()=>({title:"Problemas de Reparto Proporcional con Fracciones",subject:"Matemáticas",type:"study_session",durationMinutes:40,daysAhead:2,startTime:"17:30",notes:"Problemas cotidianos de reparto y fracciones. Resolver los 4 problemas de la página 38.",teacherNotes:"El profesor ha avanzado a la resolución de problemas en el aula hoy. Repasar antes de la próxima clase.",reason:"topic_completed",notification:"El profesor de Matemáticas ha comunicado un nuevo bloque de estudio para afianzar problemas de fracciones."})},{gradeKey:"1eso",triggerKeywords:["animal","ecosistema","vertebrad"],nextBlock:()=>({title:"Esquema de Cadenas Tróficas y Especies Autóctonas",subject:"Ciencias Naturales",type:"study_session",durationMinutes:40,daysAhead:2,startTime:"16:30",notes:"Dibujar pirámide trófica con productores, herbívoros y descomponedores del ecosistema mediterráneo.",teacherNotes:"Tema 2 impartido en el aula de ciencias. Completar esquema conceptual de biodiversidad.",reason:"topic_completed",notification:"El Departamento de Ciencias Naturales ha agendado una sesión de consolidación de cadenas tróficas."})},{gradeKey:"1eso",triggerKeywords:["egipto","mesopotamia","civilizacion"],nextBlock:()=>({title:"Grecia Clásica: Polis, Democracia Ateniense y Esparta",subject:"Ciencias Sociales",type:"study_session",durationMinutes:45,daysAhead:3,startTime:"17:00",notes:"Leer páginas 48-52 del libro y hacer tabla comparativa entre el modelo ateniense y espartano.",teacherNotes:"El centro ha abierto la unidad 3 tras completar las civilizaciones fluviales.",reason:"topic_completed",notification:"El centro educativo ha programado el inicio del Tema 3 (Grecia Clásica) en tu agenda escolar."})},{gradeKey:"1eso",triggerKeywords:["cronicas","lectura","vocabulario"],nextBlock:()=>({title:"Past Simple Narrative: Writing a Short Story",subject:"Inglés",type:"assignment_due",durationMinutes:35,daysAhead:2,startTime:"16:00",notes:"Redactar historia breve de 60 palabras usando verbos regulares e irregulares en pasado.",teacherNotes:"Tarea semanal asignada en la clase de inglés de hoy por el Departamento de Lenguas Extranjeras.",reason:"assignment_published",notification:"El profesor de Inglés ha agendado la redacción de la historia corta semanal en tu calendario escolar."})},{gradeKey:"2batx",triggerKeywords:["sintaxis","cpred","complementos","pau"],nextBlock:()=>({title:'Práctica PAU: Valores de "Se" y Oraciones Subordinadas',subject:"Lengua Castellana",type:"study_session",durationMinutes:50,daysAhead:2,startTime:"17:00",notes:"Análisis de 3 oraciones complejas de convocatorias PAU (2022-2024). Pruebas formales de pasiva refleja e impersonal.",teacherNotes:'Directriz curricular PAU: Explicación de aula completada hoy. Practicar valores sintácticos de "se".',reason:"topic_completed",notification:"El Departamento de Lengua Castellana ha comunicado una nueva sesión preparatoria PAU."})},{gradeKey:"2batx",triggerKeywords:["constitucion","1812","independencia","cadiz"],nextBlock:()=>({title:"El Reinado de Fernando VII: Sexenio Absolutista y Trienio Liberal",subject:"Historia de España",type:"study_session",durationMinutes:50,daysAhead:2,startTime:"18:00",notes:"Comentario obligatorio del Manifiesto de los Persas (1814) y esquema de las fases del reinado de Fernando VII.",teacherNotes:"El profesor ha concluido el tema de las Cortes de Cádiz en clase y avanza a Fernando VII.",reason:"topic_completed",notification:"El profesor de Historia de España ha registrado en la plataforma escolar el avance de contenido curricular."})},{gradeKey:"2batx",triggerKeywords:["matrices","determinantes","cramer","algebra"],nextBlock:()=>({title:"Discusión de Sistemas con Parámetros: Teorema de Rouché-Frobenius (PAU)",subject:"Matemáticas II",type:"study_session",durationMinutes:55,daysAhead:2,startTime:"16:30",notes:"Resolución de problemas de selectividad explicados en clase. Discusión para k = 1 y k = -2.",teacherNotes:"Ejercicios de la pizarra trabajados hoy en el aula. Consolidar el cálculo de determinantes 3x3.",reason:"topic_completed",notification:"El profesor de Matemáticas II ha agendado problemas de Selectividad para afianzar la clase de hoy."})},{gradeKey:"2batx",triggerKeywords:["platon","descartes","caverna","filosofia"],nextBlock:()=>({title:"La Teoría del Conocimiento en Kant: Giro Copernicano e Ilustración (PAU)",subject:"Filosofía",type:"study_session",durationMinutes:50,daysAhead:3,startTime:"17:15",notes:"Esquema de las preguntas kantianas: ¿Qué puedo saber?, ¿Qué debo hacer?, ¿Qué me cabe esperar?",teacherNotes:"Tema 4 impartido en el aula de filosofía. Comparativa obligatoria con el empirismo de Hume.",reason:"topic_completed",notification:"El centro escolar ha programado el estudio de Kant tras concluir la unidad de Platón."})},{gradeKey:"2batx",triggerKeywords:["quimica","termodinamica","cinetica"],nextBlock:()=>({title:"Equilibrio Químico: Principio de Le Chatelier y Cálculo de Kc/Kp",subject:"Química",type:"study_session",durationMinutes:45,daysAhead:2,startTime:"17:30",notes:"Cálculo de cociente de reacción (Qc) y desplazamiento del equilibrio por efecto de temperatura y presión.",teacherNotes:"Práctica de laboratorio finalizada. Resolver problemas 5 al 8 del boletín de Química.",reason:"topic_completed",notification:"El profesor de Química ha agendado la resolución de problemas de equilibrio químico tras la práctica de hoy."})}])}async checkAndTriggerCollaborativeProgression(a){if(!a.completed)return null;const o=a.gradeKey==="2batx"?"2batx":"1eso",s=`${a.title} ${a.subject} ${a.notes||""}`.toLowerCase(),l=this.progressionRules.find(b=>b.gradeKey!==o?!1:b.triggerKeywords.some(k=>s.includes(k.toLowerCase())));let d;if(l?d=l.nextBlock():d={title:`Consolidación Curricular: ${a.subject}`,subject:a.subject,type:"study_session",durationMinutes:40,daysAhead:2,startTime:"17:00",notes:`El profesor ha registrado la finalización de los ejercicios de aula de ${a.subject}. Repaso activo recomendado.`,teacherNotes:"Registrado desde la plataforma institucional escolar tras el fin de la sesión lectiva.",reason:"topic_completed",notification:`El centro educativo ha registrado tu avance en ${a.subject} y ha agendado una sesión de consolidación.`},await ce.studyBlocks.filter(b=>b.title===d.title&&b.gradeKey===o).first())return null;const g=new Date(Date.now()+864e5*d.daysAhead).toISOString().split("T")[0],h={title:d.title,subject:d.subject,date:g,startTime:d.startTime,durationMinutes:d.durationMinutes,type:d.type,completed:!1,gradeKey:o,notes:d.notes,teacherNotes:d.teacherNotes,origin:"institutional",syncedWithGoogle:!1};return await ce.studyBlocks.add(h),{block:h,notificationMessage:d.notification,sourceSubject:d.subject,reason:d.reason}}async getDepartmentalPrompt(a,o){if(await new Promise(d=>setTimeout(d,80)),a.toLowerCase().includes("lengua"))return o==="1eso"?{subject:"Lengua Castellana y Literatura",gradeKey:"1eso",gradeLevel:"1º de ESO (12 años)",stageName:"Operaciones Concretas / Transición (Piaget)",promptMarkdown:$s,institution:this.INSTITUTION_NAME,sourceApi:`${this.API_ENDPOINT}?subject=lengua_castellana&grade=1eso`,fetchedAt:new Date().toISOString()}:{subject:"Lengua Castellana y Literatura",gradeKey:"2batx",gradeLevel:"2º de Bachillerato (17-18 años)",stageName:"Operaciones Formales / Preuniversitario PAU (Piaget)",promptMarkdown:js,institution:this.INSTITUTION_NAME,sourceApi:`${this.API_ENDPOINT}?subject=lengua_castellana&grade=2batx`,fetchedAt:new Date().toISOString()};const l=`
# 🏛️ Directriz Curricular: ${a} (${o==="1eso"?"1º de ESO":"2º de Bachillerato"})
*Fuente: ${this.INSTITUTION_NAME}*

1. **Adaptación de Nivel:** Aplicar el nivel de abstracción correspondiente a ${o==="1eso"?"1º de ESO (enfoque guiado y visual)":"2º de Bachillerato (rigor preuniversitario)"}.
2. **Guardrails Metodológicos:** Fomentar el descubrimiento autónomo y la resolución razonada.
`.trim();return{subject:a,gradeKey:o,gradeLevel:o==="1eso"?"1º de ESO (12 años)":"2º de Bachillerato (17-18 años)",stageName:o==="1eso"?"Operaciones Concretas":"Operaciones Formales",promptMarkdown:l,institution:this.INSTITUTION_NAME,sourceApi:`${this.API_ENDPOINT}?subject=${encodeURIComponent(a)}&grade=${o}`,fetchedAt:new Date().toISOString()}}}const Wt=new Ls,Is=`# 🧠 Prompt de Sistema: Tutor Socrático Inteligente (STI)\r
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
`,Os=`# 🧠 Prompt de Sistema: Planificador Inteligente de Agenda y Estudio (STI)\r
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
`,Ms=`# 📝 Prompt de Sistema: Asistente Pedagógico de Trabajos y Proyectos (STI)\r
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
`,Rs=`# ⚡ Prompt de Sistema: Generador de Desafíos de Memoria Activa (Active Recall)\r
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
`,ht={socratic:Is,agenda:Os,project:Ms,recall:Rs};class Bs{async getSettings(){const a=await ce.aiSettings.toCollection().first();return a||{provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()}}async updateSettings(a){const o=await ce.aiSettings.toCollection().first();o&&o.id?await ce.aiSettings.update(o.id,{...a,updatedAt:new Date().toISOString()}):await ce.aiSettings.add({provider:"local",endpointUrl:"http://localhost:11434/v1",modelName:"llama3:latest",temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString(),...a})}async testConnection(a){try{const o=`${a.endpointUrl.replace(/\/+$/,"")}/models`,s={"Content-Type":"application/json"};a.apiKey&&(s.Authorization=`Bearer ${a.apiKey.trim()}`);const l=new AbortController,d=setTimeout(()=>l.abort(),4e3),u=await fetch(o,{method:"GET",headers:s,signal:l.signal});return clearTimeout(d),u.ok?{success:!0,message:`Conexión exitosa con ${a.endpointUrl}`}:{success:!1,message:`El servidor respondió con código ${u.status}: ${u.statusText}`}}catch{return{success:!1,message:`No se pudo conectar con ${a.endpointUrl}. Modo socrático local simulado activo.`}}}async callLLM(a,o){var l,d,u;const s=await this.getSettings();try{const g=`${s.endpointUrl.replace(/\/+$/,"")}/chat/completions`,h={"Content-Type":"application/json"};s.apiKey&&(h.Authorization=`Bearer ${s.apiKey.trim()}`);const b=[];for(const O of o){if(!O.content||!O.content.trim())continue;const I=b[b.length-1];I&&I.role===O.role?I.content.trim()!==O.content.trim()&&(I.content=`${I.content}

${O.content.trim()}`):b.push({role:O.role,content:O.content.trim()})}const k=new AbortController,P=setTimeout(()=>k.abort(),3e4),$=await fetch(g,{method:"POST",headers:h,signal:k.signal,body:JSON.stringify({model:s.modelName,messages:[{role:"system",content:a},...b],temperature:s.temperature})});if(clearTimeout(P),$.ok){const I=(u=(d=(l=(await $.json()).choices)==null?void 0:l[0])==null?void 0:d.message)==null?void 0:u.content;if(I)return I.trim()}else{const O=await $.text();console.error(`[AI Client] Error HTTP ${$.status} (${$.statusText}) en ${g}:`,O)}}catch(g){console.warn("[AI Client] Conexión directa no disponible, ejecutando motor socrático integrado:",g)}return null}async generateSocraticResponse(a,o,s,l){const u=ye.getState().user,g=(u==null?void 0:u.gradeLevel)||"1º de ESO",h=(u==null?void 0:u.stageName)||"Operaciones Concretas",b=(u==null?void 0:u.gradeKey)||"1eso",k=await Wt.getDepartmentalPrompt(o,b),P=`
${ht.socratic}

---
=== DIRECTRIZ CURRICULAR DEPARTAMENTAL ===
Fuente: ${k.institution}
Endpoint API: ${k.sourceApi}
Nivel Asignado: ${k.gradeLevel} (${k.stageName})

${k.promptMarkdown}
==========================================

CONTEXTO DE LA SESIÓN:
- Alumno Conectado: ${(u==null?void 0:u.name)||"Estudiante"} (${g} • ${h})
- Asignatura: ${o}
- Tema Actual: ${s}
`.trim(),O=l.filter((V,G)=>!(G===l.length-1&&V.role==="student"&&V.content.trim()===a.trim())).slice(-6).map(V=>({role:V.role==="tutor"?"assistant":"user",content:V.content})),I=await this.callLLM(P,[...O,{role:"user",content:a}]);return I?{id:`msg_${Date.now()}`,role:"tutor",content:I,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:["¿Cómo relaciono esto con la teoría?","Quiero resolver el siguiente paso","Dame un ejemplo similar"]}:(await new Promise(V=>setTimeout(V,500)),this.createSimulatedSocraticResponse(a,o,s,b))}calculateAgendaStats(a){const o=new Date().toISOString().split("T")[0],s=a.filter(G=>!G.completed&&(G.type==="exam"||G.type==="assignment_due")).map(G=>{const Q=new Date(G.date).getTime()-new Date(o).getTime(),oe=Math.ceil(Q/864e5);return{title:G.title,subject:G.subject,date:G.date,type:G.type,daysLeft:oe}}).sort((G,Q)=>G.daysLeft-Q.daysLeft),l=a.filter(G=>G.date===o),d=l.filter(G=>!G.completed&&G.type!=="class").reduce((G,Q)=>G+(Q.durationMinutes||45),0),g=Math.max(0,390-d),h=Math.round(g/60*10)/10,b=new Map;let k=0;for(const G of a){if(G.type==="class")continue;const Q=G.durationMinutes||45;k+=Q;const oe=b.get(G.subject)||{minutes:0,count:0};oe.minutes+=Q,oe.count+=1,b.set(G.subject,oe)}const P=Array.from(b.entries()).map(([G,Q])=>({subject:G,minutes:Q.minutes,blockCount:Q.count,percentage:k>0?Math.round(Q.minutes/k*100):0})).sort((G,Q)=>Q.minutes-G.minutes),$=a.filter(G=>G.type==="assignment_due"),O=$.filter(G=>G.completed).length,I=$.length,V=I>0?Math.round(O/I*100):100;return{urgentPriorities:s,afternoonDistribution:{classesEndTime:"15:00",todayStudyMinutes:d,freeTimeHours:h,totalBlocksToday:l.length},subjectBreakdown:P,homeworkProgress:{completed:O,total:I,percentage:V}}}async generatePlanificationDialogue(a,o,s){var I,V,G;const l=this.calculateAgendaStats(a),d=ye.getState(),u=((I=d.user)==null?void 0:I.name)||"Estudiante",g=((V=d.user)==null?void 0:V.gradeLevel)||"1º de ESO",h=((G=d.user)==null?void 0:G.gradeKey)||"1eso",b=new Date().toISOString().split("T")[0],k=`
${ht.agenda}

Eres el tutor socrático y mentor de gestión del tiempo de Anaxagoras AI para ${u} (${g}).
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
`.trim(),P=`
DATOS DE LA AGENDA DE ${u.toUpperCase()}:
- Prioridades urgentes:
${l.urgentPriorities.map(Q=>`  • [${Q.type==="exam"?"Examen":"Entrega"}] ${Q.subject}: "${Q.title}" (${Q.daysLeft===0?"¡Hoy!":Q.daysLeft===1?"Mañana":`en ${Q.daysLeft} días`})`).join(`
`)||"  • No hay hitos inmediatos"}
- Tarde post-clases (Hoy): Fin de clases a las 15:00. Estudio planificado: ${l.afternoonDistribution.todayStudyMinutes} min. Tiempo libre protegido: ${l.afternoonDistribution.freeTimeHours} h.
- Balance por asignaturas: ${l.subjectBreakdown.map(Q=>`${Q.subject}: ${Q.minutes} min (${Q.percentage}%)`).join(", ")||"Sin bloques"}
- Avance de deberes: ${l.homeworkProgress.completed}/${l.homeworkProgress.total} completados (${l.homeworkProgress.percentage}%).
${o?`MENSAJE DEL ALUMNO: "${o}"`:"(El alumno abre el planificador para revisar su organización personal y recibir recomendaciones)"}
`.trim(),$=[...(s||[]).map(Q=>({role:Q.role==="assistant"?"assistant":"user",content:Q.content})),{role:"user",content:P}],O=await this.callLLM(k,$);if(O){let Q=this.createDefaultSuggestedBlocks(a,l,o,h);try{const ge=O.match(/```json\s*([\s\S]*?)\s*```/)||O.match(/\[[\s\S]*\]/);if(ge){const F=JSON.parse(ge[1]||ge[0]);Array.isArray(F)&&F.length>0&&(Q=F.map(z=>({title:z.title||"Sesión de estudio activo",subject:z.subject||"General",date:z.date||b,startTime:z.startTime||"17:00",durationMinutes:z.durationMinutes||45,type:z.type||"study_session",completed:!1,notes:z.notes||"Planificado por Anaxagoras AI",gradeKey:h,syncedWithGoogle:!1})))}}catch(ge){console.warn("[AI Client] No se pudo parsear JSON del planificador LLM:",ge)}return{message:O.replace(/```json[\s\S]*?```/,"").trim(),suggestedBlocks:Q}}return this.createSimulatedPlanificationResponse(a,l,u,g,h,o)}createDefaultSuggestedBlocks(a,o,s,l="1eso"){const d=new Date().toISOString().split("T")[0],u=new Date(Date.now()+864e5).toISOString().split("T")[0],g=new Date(Date.now()+864e5*2).toISOString().split("T")[0],h=(s||"").toLowerCase(),b=h.includes("retras")||h.includes("posp")||h.includes("profe")||h.includes("aplaza"),k=h.includes("descans")||h.includes("libre")||h.includes("cansad")||h.includes("menos"),P=h.includes("mate")||h.includes("cálculo"),$=h.includes("lengua")||h.includes("sintaxis"),O=k?30:45;return l==="1eso"?[{title:$||b?"Práctica de Oraciones: Sujeto y Predicado en Bloque":"Repaso Activo: Ciencias Naturales (Ecosistemas)",subject:$||b?"Lengua Castellana":"Ciencias Naturales",date:b?u:d,startTime:"17:15",durationMinutes:O,type:"study_session",completed:!1,notes:b?"📅 Tarea reprogramada respetando el aviso del profesor.":"Hacer mapa visual de 1 página sin mirar el libro.",gradeKey:"1eso",syncedWithGoogle:!1},{title:P?"Fracciones Básicas: Resolución de 4 Ejercicios":"Ciencias Sociales: Mesopotamia y Egipto (Línea de Tiempo)",subject:P?"Matemáticas":"Ciencias Sociales",date:b?g:u,startTime:"18:15",durationMinutes:O,type:"study_session",completed:!1,notes:"Preparación espaciada para asentar conceptos antes del examen.",gradeKey:"1eso",syncedWithGoogle:!1}]:[{title:P||b?"Matemáticas II: Discusión de Sistemas de Cramer con Parámetro":"Filosofía: Cuadro Comparativo Platón vs Descartes (PAU)",subject:P||b?"Matemáticas II":"Filosofía",date:b?u:d,startTime:"17:00",durationMinutes:k?40:50,type:"study_session",completed:!1,notes:b?"📅 Reprogramado según nueva directriz del profesor.":"Redacción de síntesis conceptual para la prueba de Selectividad.",gradeKey:"2batx",syncedWithGoogle:!1},{title:"Lengua Castellana: Pruebas de Concordancia de CPred (PAU)",subject:"Lengua Castellana",date:g,startTime:"18:15",durationMinutes:k?40:50,type:"study_session",completed:!1,notes:"Análisis de 3 oraciones de exámenes PAU de convocatorias anteriores.",gradeKey:"2batx",syncedWithGoogle:!1}]}createSimulatedPlanificationResponse(a,o,s,l,d,u){const g=this.createDefaultSuggestedBlocks(a,o,u,d),h=(u||"").toLowerCase(),b=o.urgentPriorities[0],k=o.subjectBreakdown[0];let P="";return h.includes("retras")||h.includes("posp")||h.includes("profe")?P=`¡Comprendido, ${s}! 🤝 He reorganizado tu planificación tras el cambio de fecha que te indicó el profesor.

• **Ajuste aplicado:** Hemos retrasado la entrega y reubicado el bloque de repaso para que no se te acumule con otras asignaturas.
• **Tu tarde protegida:** Hoy mantendrás **${o.afternoonDistribution.freeTimeHours} horas libres** después de clases (15:00) para desconectar y hacer deporte.
• **Prioridad activa:** Tu foco principal sigue siendo ${b?`el examen de **${b.subject}** (${b.title}) en ${b.daysLeft} días`:"mantener un ritmo espaciado"}.

¿Te parece bien cómo queda la propuesta de bloques para guardarla en tu base de datos local (IndexedDB)?`:P=`¡Hola, ${s}! Aquí tienes el análisis de tu tiempo y hábitos de estudio para **${l}**:

🎯 **1. Qué es más prioritario hoy:**
`+(b?`Lo más urgente es **${b.subject}**: *"${b.title}"*, que vence ${b.daysLeft===0?"¡hoy mismo!":b.daysLeft===1?"mañana":`en ${b.daysLeft} días`}. Conviene dedicarle un bloque corto antes de dispersarte.

`:`No tienes exámenes en las próximas 48 horas, lo cual es ideal para trabajar con calma y técnica de práctica espaciada.

`)+`⏱️ **2. Distribución de tu tiempo esta tarde:**
Tus clases lectivas finalizan a las 15:00. Te he programado **${o.afternoonDistribution.todayStudyMinutes>0?`${o.afternoonDistribution.todayStudyMinutes} minutos`:"45 minutos"} de estudio activo**, lo que te deja **${o.afternoonDistribution.freeTimeHours} horas de tiempo libre garantizado** para descansar, deporte y tus aficiones. ¡El cerebro necesita descanso para consolidar la memoria a largo plazo! 💪

📊 **3. Balance por asignaturas:**
`+(k?`La materia con más tiempo acumulado es **${k.subject}** (${k.minutes} min). ${o.subjectBreakdown.length>1?`Recomiendo alternar con materias que llevan menos minutos (${o.subjectBreakdown[o.subjectBreakdown.length-1].subject}) para entrenar el entrelazado cognitivo.`:""}

`:`Aún no hay suficiente historial de minutos registrados esta semana.

`)+`📝 **4. Avance de tus deberes:**
Llevas completados el **${o.homeworkProgress.percentage}% de tus entregas** (${o.homeworkProgress.completed} de ${o.homeworkProgress.total}).

Revisa abajo los bloques sugeridos. Puedes **posponer cualquier tarea si el profe te ha dado más días**, cambiar duraciones o pedirme ajustes escribiéndome aquí abajo. ¿Guardamos esta distribución en tu agenda personal?`,{message:P,suggestedBlocks:g}}async generateStudyPlan(a,o){var u;const l=((u=ye.getState().user)==null?void 0:u.gradeKey)||"1eso",d=this.calculateAgendaStats([]);return this.createDefaultSuggestedBlocks([],d,void 0,l)}async generateActiveRecallCard(a,o){var g;const l=((g=ye.getState().user)==null?void 0:g.gradeKey)||"1eso",d=`${ht.recall}

Genera una tarjeta conceptual de autoevaluación para la materia ${a} y tema ${o} adaptada al nivel ${l==="1eso"?"1º de ESO":"2º de Bachillerato"}. Formato JSON estricto.`,u=await this.callLLM(d,[{role:"user",content:`Crear desafío de active recall sobre ${o}`}]);if(u)try{const h=u.match(/\{[\s\S]*\}/);if(h){const b=JSON.parse(h[0]);return{id:`card_${Date.now()}`,concept:b.concept||`¿Cómo definirías la clave de ${o}?`,hint:b.hint||"Piensa en las causas fundamentales y consecuencias.",explanation:b.explanation||"Resumen conceptual para verificar comprensión activa.",masteryScore:0}}}catch(h){console.warn("[AI Client] Fallo al parsear flashcard de LLM:",h)}return a.toLowerCase().includes("lengua")?l==="1eso"?{id:`card_${Date.now()}`,concept:'En 1º de ESO, ¿cómo reconocemos el Complemento Verbal en "El tren llegó puntual a la estación"?',hint:'Localiza qué palabras acompañan al verbo "llegó" para completar la acción, sin clasificarlas en subtipos.',explanation:'En 1º de ESO, "puntual a la estación" se identifica en bloque como Complemento Verbal (CV) que acompaña al verbo dentro del predicado.',masteryScore:0}:{id:`card_${Date.now()}`,concept:'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es Complemento Predicativo (CPred) y no CCM?',hint:'Comprueba qué ocurre al cambiar el sujeto a plural ("Las locomotoras...").',explanation:'La prueba de concordancia: "puntual" es un adjetivo que concuerda en género y número con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred frente a la inmutabilidad del CCM.',masteryScore:0}:{id:`card_${Date.now()}`,concept:`¿Cómo influyen los factores limitantes en ${o} (${a})?`,hint:"Recuerda qué variable impide que el proceso aumente indefinidamente.",explanation:"El factor más escaso o alejado del óptimo determinará el rendimiento máximo del sistema.",masteryScore:0}}createSimulatedSocraticResponse(a,o,s="",l="1eso"){const d=a.toLowerCase();let u="",g=[];return o.toLowerCase().includes("lengua")||s.toLowerCase().includes("oraci")||s.toLowerCase().includes("sintaxis")?l==="1eso"?(u=`¡Hola Marc! En 1º de ESO lo importante es entender la estructura básica sin liarnos con nombres difíciles. 🚂✨

En la oración *"El tren llegó puntual a la estación"*, primero encontramos el verbo (*llegó*) y quién realiza la acción (*El tren*, que es el Sujeto). Todas las palabras que acompañan al verbo (*"puntual a la estación"*) las identificamos como **Complemento Verbal (CV)** en bloque.

¿Qué información nos aporta este complemento verbal sobre cómo y hacia dónde se mueve el tren?`,g=["Aporta información del modo y el lugar del viaje","¿Por qué en 1º de ESO no distinguimos subtipos?","¿Cómo encuentro el sujeto si va al final?"],{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:g}):(u=`¡Hola Álvaro! En 2º de Bachillerato abordamos el análisis sintáctico con rigor preuniversitario (PAU). 🎓📚

En la oración *"El tren llegó puntual a la estación"*, no basta con señalar un complemento verbal global: debemos clasificar cada elemento con exactitud gramatical.

Fíjate en *"puntual"*: ¿es un adjetivo o un adverbio? Si cambiamos el sujeto por *"Las locomotoras"*, ¿qué le ocurre a *"puntual"*? ¿Qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)** y no un CC de Modo?`,g=['Concuerda con el sujeto ("llegaron puntuales"), es CPred','¿Y qué función sintáctica tiene "a la estación"?',"¿Qué diferencia hay entre CPred y Atributo?"],{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:g}):(d.includes("dame la respuesta")||d.includes("solucion")||d.includes("solución")||d.includes("hazmelo")||d.includes("resuelve")||d.includes("escribe el texto")||d.includes("dime el resultado")?(u=`¡Me encantaría ahorrarte tiempo, pero si te doy la respuesta directa te quitaría la oportunidad de entrenar tu mente para el examen! 💪

Vamos a descubrirlo paso a paso. Cuéntame: **¿Qué datos conocidos nos da el enunciado y cuál es la incógnita que nos piden averiguar?**`,g=["Los datos son...","No entiendo bien qué significa este dato","¿Qué fórmula podemos usar?"]):d.includes("no entiendo")||d.includes("duda")||d.includes("dificil")||d.includes("difícil")?(u=`Es completamente normal dudar, ¡así es exactamente como se construye el aprendizaje significativo! 🧠✨

Para abordar ${o}, descompongamos el problema en partes más pequeñas. ¿Qué parte del concepto te resulta más clara hasta ahora y en cuál sientes que te quedas atascado?`,g=["Entiendo la teoría pero me cuesta aplicarlo","¿Puedes darme una pista visual o ejemplo?","Creo que el primer paso es identificar las variables"]):(u=`¡Excelente razonamiento! Estás conectando muy bien las ideas en **${o}**.

Siguiendo esa lógica: si aplicas eso al siguiente paso, **¿qué crees que ocurriría con el resultado final?** Intenta formular tu hipótesis antes de comprobarla.`,g=["Creo que aumentaría proporcionalmente","¿Podría haber una excepción a esa regla?","Quiero comprobarlo con otro ejemplo práctico"]),{id:`msg_${Date.now()}`,role:"tutor",content:u,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:g})}}const Ve=new Bs;function qs(f,a){const o=Ut.getCurrentLanguage();f.innerHTML=`
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <img src="./icons/icon-192.png" alt="Anaxagoras AI Logo" class="w-10 h-10 rounded-2xl shadow-md shadow-brand-500/20 object-cover border border-slate-200/80 bg-slate-900" />
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${L("app.title")}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${L("app.badge")}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${L("app.tagline")}</p>
          </div>
        </div>

        <!-- Global Action Controls -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Standard i18n Language Selector -->
          <div class="relative">
            <select id="lang-selector" class="text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-none rounded-xl py-1.5 px-2.5 cursor-pointer focus:ring-2 focus:ring-brand-500 focus:outline-none transition-colors">
              <option value="es" ${o==="es"?"selected":""}>🇪🇸 Castellano</option>
              <option value="ca" ${o==="ca"?"selected":""}>Català</option>
              <option value="ga" ${o==="ga"?"selected":""}>Galego</option>
              <option value="eu" ${o==="eu"?"selected":""}>Euskera</option>
              <option value="va" ${o==="va"?"selected":""}>Valencià</option>
            </select>
          </div>

          <!-- AI Model Status Pill -->
          <button id="btn-ai-settings" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition-all text-slate-700 hover:border-brand-300">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-soft-pulse"></span>
            <span id="ai-model-label" class="hidden md:inline">Ollama (${L("nav.local")})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </header>
  `;const s=f.querySelector("#lang-selector");s==null||s.addEventListener("change",async u=>{const g=u.target.value;await Ut.changeLanguage(g),a.onLanguageChange(g)});const l=f.querySelector("#btn-ai-settings");l==null||l.addEventListener("click",()=>a.onOpenAISettings());const d=f.querySelector("#auth-container");d&&ye.subscribe(u=>{var g,h,b;u.isAuthenticated&&u.user?(d.innerHTML=`
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
        `,(g=d.querySelector("#btn-quick-switch-grade"))==null||g.addEventListener("click",()=>{ye.toggleGradeProfile()}),(h=d.querySelector("#btn-user-profile"))==null||h.addEventListener("click",a.onOpenAuth)):(d.innerHTML=`
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${L("nav.connectGoogle")}</span>
          </button>
        `,(b=d.querySelector("#btn-connect-google"))==null||b.addEventListener("click",a.onOpenAuth))}),Ve.getSettings().then(u=>{const g=f.querySelector("#ai-model-label");g&&(g.textContent=u.provider==="local"?`${u.modelName} (${L("nav.local")})`:`${u.modelName} (${L("nav.cloud")})`)})}function zs(f,a,o){f.innerHTML=`
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div class="flex items-center justify-between border-b border-slate-200">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Agenda -->
          <button data-tab="agenda" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="agenda"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📅</span>
            <span>${L("tabs.agenda")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="agenda"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">3</span>
          </button>

          <!-- Tab 2: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="study"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">💡</span>
            <span>${L("tabs.study")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              ${L("tabs.tutorBadge")}
            </span>
          </button>

          <!-- Tab 3: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${a==="tasks"?"border-brand-600 text-brand-600 font-semibold":"border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"}">
            <span class="text-base sm:text-lg">📝</span>
            <span>${L("tabs.tasks")}</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${a==="tasks"?"bg-brand-100 text-brand-700":"bg-slate-100 text-slate-600"}">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>${L("app.criticalThinking")}</span>
        </div>
      </div>
    </nav>
  `,f.querySelectorAll(".tab-btn").forEach(l=>{l.addEventListener("click",()=>{const d=l.dataset.tab;o.onTabChange(d)})})}function Ns(f,a){Ve.getSettings().then(o=>{var u,g;f.innerHTML=`
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 transition-all">
          
          <!-- Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="font-display font-bold text-lg text-slate-900">${L("aiModal.title")}</h3>
                <p class="text-xs text-slate-500">${L("aiModal.subtitle")}</p>
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">${L("aiModal.inferenceType")}</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${o.provider==="local"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="local" class="text-brand-600 focus:ring-brand-500" ${o.provider==="local"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${L("aiModal.localTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${L("aiModal.localDesc")}</span>
                  </div>
                </label>

                <label class="flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${o.provider==="cloud"?"border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20":"border-slate-200 hover:bg-slate-50"}">
                  <input type="radio" name="provider" value="cloud" class="text-brand-600 focus:ring-brand-500" ${o.provider==="cloud"?"checked":""} />
                  <div>
                    <span class="block text-xs font-bold text-slate-800">${L("aiModal.cloudTitle")}</span>
                    <span class="block text-[11px] text-slate-500">${L("aiModal.cloudDesc")}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Endpoint URL -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${L("aiModal.endpointUrl")}</label>
              <input 
                type="url" 
                id="input-endpoint" 
                value="${o.endpointUrl}" 
                placeholder="http://localhost:11434/v1"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
                required 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${L("aiModal.endpointHint")}</span>
            </div>

            <!-- Model Name -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${L("aiModal.modelName")}</label>
              <input 
                type="text" 
                id="input-model" 
                value="${o.modelName}" 
                placeholder="llama3:latest, gemma2, gpt-4o-mini"
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>

            <!-- API Key (Optional) -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${L("aiModal.apiKey")}</label>
              <input 
                type="password" 
                id="input-apikey" 
                value="${o.apiKey||""}" 
                placeholder="sk-..."
                class="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-xs" 
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${L("aiModal.apiKeyHint")}</span>
            </div>

            <!-- Socratic Strictness -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${L("aiModal.socraticMode")}</label>
              <select id="select-strictness" class="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none">
                <option value="high" ${o.socraticStrictness==="high"?"selected":""}>${L("aiModal.strictHigh")}</option>
                <option value="balanced" ${o.socraticStrictness==="balanced"?"selected":""}>${L("aiModal.strictBalanced")}</option>
                <option value="exploratory" ${o.socraticStrictness==="exploratory"?"selected":""}>${L("aiModal.strictExploratory")}</option>
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
                <span>${L("aiModal.testConnection")}</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  id="btn-cancel" 
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  ${L("aiModal.cancel")}
                </button>
                <button 
                  type="submit" 
                  class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all"
                >
                  ${L("aiModal.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,(u=f.querySelector("#btn-close-modal"))==null||u.addEventListener("click",a.onClose),(g=f.querySelector("#btn-cancel"))==null||g.addEventListener("click",a.onClose);const s=f.querySelector("#btn-test-connection"),l=f.querySelector("#test-result-box");s==null||s.addEventListener("click",async()=>{const h=f.querySelector("#input-endpoint").value,b=f.querySelector("#input-model").value,k=f.querySelector("#input-apikey").value.trim(),P=f.querySelector('input[name="provider"]:checked');s&&(s.innerHTML=`<span>⏳</span><span>${L("aiModal.testing")}</span>`);const $=await Ve.testConnection({provider:(P==null?void 0:P.value)||"local",endpointUrl:h.trim(),modelName:b.trim(),apiKey:k,temperature:.7,socraticStrictness:"high",updatedAt:new Date().toISOString()});s&&(s.innerHTML=`<span>⚡</span><span>${L("aiModal.testConnection")}</span>`),l&&(l.classList.remove("hidden","bg-emerald-50","text-emerald-700","bg-amber-50","text-amber-700"),$.success?(l.classList.add("bg-emerald-50","text-emerald-700"),l.textContent=`✅ ${$.message}`):(l.classList.add("bg-amber-50","text-amber-700"),l.textContent=`ℹ️ ${$.message}`))});const d=f.querySelector("#ai-settings-form");d==null||d.addEventListener("submit",async h=>{h.preventDefault();const b=f.querySelector("#input-endpoint").value.trim(),k=f.querySelector("#input-model").value.trim(),P=f.querySelector("#input-apikey").value.trim(),$=f.querySelector('input[name="provider"]:checked'),O=f.querySelector("#select-strictness").value;await Ve.updateSettings({provider:($==null?void 0:$.value)||"local",endpointUrl:b,modelName:k,apiKey:P,socraticStrictness:O}),a.onSaved()})})}function yn(f,a){var d,u,g,h,b,k,P,$,O;const o=ye.getState();f.innerHTML=`
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
              <h3 class="font-display font-bold text-lg text-slate-900">${L("authModal.title")}</h3>
              <p class="text-xs text-slate-500">${L("authModal.subtitle")}</p>
            </div>
          </div>
          <button id="btn-close-auth" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-6 space-y-5">
          ${o.isAuthenticated&&o.user?`
              <!-- User Profile Card -->
              <div class="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3.5 overflow-hidden">
                  <img src="${o.user.avatarUrl}" alt="${o.user.name}" class="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  <div class="truncate">
                    <h4 class="font-bold text-sm text-slate-900 truncate">${o.user.name}</h4>
                    <p class="text-xs text-slate-500 font-mono truncate">${o.user.email}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                      ${o.user.gradeLevel}
                    </span>
                  </div>
                </div>

                <!-- Mode Badge -->
                <div class="flex-shrink-0">
                  ${o.mode==="real"?`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          ${L("authModal.realBadge")}
                        </span>`:`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${L("authModal.demoBadge")}
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
                    ${o.user.stageName||"Piaget"}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button id="btn-modal-set-1eso" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${o.user.gradeKey==="1eso"?"bg-emerald-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟢 1º ESO (12 años)
                  </button>
                  <button id="btn-modal-set-2batx" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${o.user.gradeKey==="2batx"?"bg-purple-600 text-white shadow-sm":"bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"}">
                    🟣 2º Bachillerato (17-18)
                  </button>
                </div>
                <p class="text-[11px] text-slate-500 leading-tight">
                  ${o.user.gradeKey==="1eso"?"• 1º de ESO: Operaciones Concretas. El complemento verbal se identifica en bloque sin exigir tipos.":"• 2º de Bachillerato: Operaciones Formales. Obligatorio indicar el tipo de complemento verbal (CPred vs CCL) y justificar con pruebas."}
                </p>
              </div>

              <!-- Connected Services Status -->
              <div class="space-y-2">
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${L("authModal.authorizedResources")}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${L("authModal.calendarTitle")}</p>
                      <p class="text-[11px] text-slate-500">${L("authModal.calendarDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${o.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${o.mode==="real"?L("authModal.statusReal"):L("authModal.statusDemo")}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${L("authModal.driveTitle")}</p>
                      <p class="text-[11px] text-slate-500">${L("authModal.driveDesc")}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${o.mode==="real"?"text-emerald-700 bg-emerald-50 border border-emerald-200":"text-amber-700 bg-amber-50 border border-amber-200"} px-2.5 py-0.5 rounded-md">
                    ${o.mode==="real"?L("authModal.statusReal"):L("authModal.statusDemo")}
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
                ${o.mode==="demo"?`
                    <button id="btn-show-real-connect" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
                      <span>🔐</span>
                      <span>${L("authModal.realOptionTitle")}</span>
                    </button>
                  `:`
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${L("authModal.demoButton")}</span>
                    </button>
                  `}

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${L("authModal.disconnect")}
                </button>
              </div>
            `:""}

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${o.isAuthenticated?"hidden":"block"} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${L("authModal.realOptionTitle")}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${L("authModal.realOptionDesc")}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${L("authModal.clientIdLabel")}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${o.clientId||""}" 
                placeholder="${L("authModal.clientIdPlaceholder")}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${L("authModal.clientIdHelp")}</span>
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
              <span>${L("authModal.realButton")}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${L("authModal.demoButton")}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `,(d=f.querySelector("#btn-close-auth"))==null||d.addEventListener("click",a.onClose),(u=f.querySelector("#btn-show-real-connect"))==null||u.addEventListener("click",()=>{var I;(I=f.querySelector("#real-connect-box"))==null||I.classList.remove("hidden")}),(g=f.querySelector("#btn-modal-set-1eso"))==null||g.addEventListener("click",()=>{ye.setGradeProfile("1eso"),a.onStateChanged(),yn(f,a)}),(h=f.querySelector("#btn-modal-set-2batx"))==null||h.addEventListener("click",()=>{ye.setGradeProfile("2batx"),a.onStateChanged(),yn(f,a)}),(b=f.querySelector("#btn-manual-check-update"))==null||b.addEventListener("click",async()=>{await bn.checkForUpdates(!0)}),(k=f.querySelector("#btn-force-hard-reset"))==null||k.addEventListener("click",async()=>{confirm("¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.")&&await bn.forceHardReset()}),(P=f.querySelector("#btn-switch-to-demo"))==null||P.addEventListener("click",async()=>{await ye.connectDemo(),a.onStateChanged(),a.onClose()}),($=f.querySelector("#btn-activate-demo"))==null||$.addEventListener("click",async()=>{await ye.connectDemo(),a.onStateChanged(),a.onClose()}),(O=f.querySelector("#btn-disconnect-google"))==null||O.addEventListener("click",()=>{ye.disconnect(),a.onStateChanged(),a.onClose()});const s=f.querySelector("#btn-do-connect-real"),l=f.querySelector("#auth-error-box");s==null||s.addEventListener("click",async()=>{const I=f.querySelector("#input-client-id"),V=I==null?void 0:I.value.trim();if(!V){l&&(l.classList.remove("hidden"),l.textContent="Por favor, introduce tu Google OAuth Client ID.");return}s&&(s.innerHTML="<span>⏳ Conectando con Google...</span>");try{await ye.connectRealGoogle(V),a.onStateChanged(),a.onClose()}catch(G){s&&(s.innerHTML=`<span>${L("authModal.realButton")}</span>`),l&&(l.classList.remove("hidden"),l.textContent=G.message||"Error al conectar con Google OAuth 2.0.")}})}class Ks{async syncBlockToCalendar(a){var k;const o=ye.getState();if(!o.isAuthenticated||!o.scopes.calendar)throw new Error("Debes conectar tu cuenta de Google con permisos de Google Calendar");if(o.mode==="demo"){await new Promise($=>setTimeout($,500));const P=`gcal_demo_${Date.now()}`;return a.id&&await ce.studyBlocks.update(a.id,{syncedWithGoogle:!0,googleEventId:P}),!0}const s=ye.getAccessToken();if(!s)throw new Error("El token de sesión de Google ha caducado. Vuelve a conectar tu cuenta.");const l=`${a.date}T${a.startTime}:00`,d=new Date(l),u=new Date(d.getTime()+a.durationMinutes*60*1e3),g={summary:`[Anaxagoras AI] ${a.title}`,description:`Asignatura: ${a.subject}
Notas: ${a.notes||"Sesión de aprendizaje autónomo"}

Creado con Anaxagoras AI Sistema de Tutoría Inteligente`,start:{dateTime:d.toISOString(),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone},end:{dateTime:u.toISOString(),timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone},reminders:{useDefault:!1,overrides:[{method:"popup",minutes:15},{method:"popup",minutes:60}]}},h=await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(g)});if(!h.ok){const P=await h.json().catch(()=>({}));throw new Error(`Error de Google Calendar API (${h.status}): ${((k=P.error)==null?void 0:k.message)||h.statusText}`)}const b=await h.json();return a.id&&await ce.studyBlocks.update(a.id,{syncedWithGoogle:!0,googleEventId:b.id}),!0}async syncAllPendingBlocks(){const a=await ce.studyBlocks.filter(o=>!o.syncedWithGoogle).toArray();for(const o of a)await this.syncBlockToCalendar(o);return a.length}async fetchRealUpcomingEvents(){if(ye.getState().mode!=="real")return[];const o=ye.getAccessToken();if(!o)return[];const s=new Date().toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(s)}&maxResults=10&singleEvents=true&orderBy=startTime`,d=await fetch(l,{headers:{Authorization:`Bearer ${o}`}});return d.ok?(await d.json()).items||[]:[]}}const Fs=new Ks;function bt(f,a,o,s){var g,h;const l=s,d=!!(l.institution||l.sourceApi),u=o.replace(/^# (.*$)/gim,'<h2 class="text-xl font-bold text-slate-900 mt-4 mb-2">$1</h2>').replace(/^## (.*$)/gim,'<h3 class="text-base font-bold text-slate-800 mt-3 mb-1.5">$1</h3>').replace(/^### (.*$)/gim,'<h4 class="text-sm font-bold text-slate-800 mt-2 mb-1">$1</h4>').replace(/\*\*(.*?)\*\*/gim,'<strong class="font-bold text-slate-900">$1</strong>').replace(/\*(.*?)\*/gim,'<em class="italic text-slate-700">$1</em>').replace(/```json([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/```([\s\S]*?)```/gim,'<pre class="p-3 my-2 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">$1</pre>').replace(/^\- (.*$)/gim,'<li class="ml-4 list-disc text-xs text-slate-700 mb-1">$1</li>').replace(/^\d+\. (.*$)/gim,'<li class="ml-4 list-decimal text-xs text-slate-700 mb-1">$1</li>').replace(/\n\n/gim,"<br/><br/>");f.innerHTML=`
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-100 max-h-[85vh] flex flex-col transition-all">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl ${d?"bg-purple-50 text-purple-600":"bg-brand-50 text-brand-600"} flex items-center justify-center text-xl">
              ${d?"🏛️":"📄"}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-display font-bold text-lg text-slate-900">${a}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d?"bg-purple-100 text-purple-800 border border-purple-200":"bg-brand-100 text-brand-800 border border-brand-200"}">
                  ${d?"API Educativa (Mock)":"Prompt Sección"}
                </span>
              </div>
              <p class="text-xs text-slate-500">${l.subtitle||(d?"Directriz Curricular Departamental":"Prompt Transversal de Sección")}</p>
            </div>
          </div>
          <button id="btn-close-prompt-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        ${d?`
          <!-- Educational API Banner -->
          <div class="mt-4 p-3 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1 flex-shrink-0">
            <div class="flex items-center justify-between">
              <span class="font-bold flex items-center gap-1.5">
                <span>🏛️</span>
                <span>${l.institution||"Departament d'Educació de la Generalitat de Catalunya (Esfer@)"}</span>
              </span>
              ${l.gradeLevel?`<span class="px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 font-bold text-[10px]">${l.gradeLevel}</span>`:""}
            </div>
            ${l.sourceApi?`<div class="text-[11px] font-mono text-purple-700 truncate">
                    <span class="font-semibold">Endpoint:</span> ${l.sourceApi}
                  </div>`:""}
          </div>
        `:""}

        <!-- Scrollable Content -->
        <div class="mt-4 flex-1 overflow-y-auto pr-2 space-y-3 leading-relaxed text-xs text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
          ${u}
        </div>

        <!-- Footer -->
        <div class="pt-4 border-t border-slate-100 flex justify-between items-center flex-shrink-0">
          <span class="text-[11px] text-slate-400">
            ${d?"Directriz curricular inyectada según el grado del alumno":"Auditoría pedagógica metodológica garantizada"}
          </span>
          <button id="btn-close-prompt-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  `,(g=f.querySelector("#btn-close-prompt-modal"))==null||g.addEventListener("click",l.onClose),(h=f.querySelector("#btn-close-prompt-btn"))==null||h.addEventListener("click",l.onClose)}async function Gs(f,a){const s=ye.getState().user,l=(s==null?void 0:s.gradeKey)||"1eso",d=(s==null?void 0:s.name)||"Estudiante",u=(s==null?void 0:s.gradeLevel)||"1º de ESO",h=(await ce.studyBlocks.toArray()).filter(Q=>Q.gradeKey===l||Q.gradeKey==="both"||!Q.gradeKey);let b=Ve.calculateAgendaStats(h),k=[],P=[],$=!0;function O(){var fe,H;f.innerHTML=`
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
                  ${d} • ${u} • Organización personal privada
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
                  ${b.urgentPriorities.length>0?`
                      <span class="text-xs font-bold text-slate-900 block truncate" title="${b.urgentPriorities[0].title}">
                        ${b.urgentPriorities[0].subject}
                      </span>
                      <p class="text-[11px] text-amber-800 font-semibold mt-0.5">
                        ${b.urgentPriorities[0].daysLeft===0?"¡Vence hoy!":b.urgentPriorities[0].daysLeft===1?"Mañana":`En ${b.urgentPriorities[0].daysLeft} días`}
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
                    <span class="text-lg font-extrabold font-display text-brand-900">${b.afternoonDistribution.freeTimeHours} h</span>
                    <span class="text-[10px] text-brand-700 font-medium">libres protegidas</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-0.5">
                    Estudio: <strong class="text-slate-800">${b.afternoonDistribution.todayStudyMinutes} min</strong> (tras las 15:00)
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
                  ${b.subjectBreakdown.length>0?`
                      <span class="text-xs font-bold text-slate-900 block truncate">
                        ${b.subjectBreakdown[0].subject} (${b.subjectBreakdown[0].percentage}%)
                      </span>
                      <p class="text-[10px] text-purple-700 mt-0.5">
                        ${b.subjectBreakdown.length} asignaturas con bloques
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
                    <span class="text-lg font-extrabold font-display text-cyan-900">${b.homeworkProgress.completed}/${b.homeworkProgress.total}</span>
                    <span class="text-[10px] text-cyan-700 font-medium">completados</span>
                  </div>
                  <div class="w-full bg-cyan-200/50 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div class="bg-cyan-600 h-1.5 rounded-full transition-all" style="width: ${b.homeworkProgress.percentage}%"></div>
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
                ${$?`
                    <div class="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                      <span class="animate-spin text-base">⏳</span>
                      <span>Analizando tu agenda, horario escolar y balance de prioridades...</span>
                    </div>
                  `:k.map(W=>`
                    <div class="flex gap-3 ${W.role==="assistant"?"items-start":"items-start flex-row-reverse"}">
                      <div class="w-7 h-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${W.role==="assistant"?"bg-brand-500 text-white":"bg-slate-800 text-white"}">
                        ${W.role==="assistant"?"🤖":"👤"}
                      </div>
                      <div class="max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${W.role==="assistant"?"bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm shadow-sm":"bg-brand-600 text-white rounded-tr-sm"}">
                        ${G(W.content)}
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
                  ${P.length} sesiones planificadas
                </span>
              </div>

              <div class="space-y-2.5" id="suggested-blocks-list">
                ${P.length===0?`
                    <div class="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
                      No hay nuevos bloques recomendados por ahora.
                    </div>
                  `:P.map((W,le)=>`
                    <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-brand-300 transition-all">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-bold text-xs text-slate-900">${W.title}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                            ${W.subject}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500">${W.notes||""}</p>
                      </div>

                      <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div class="text-left sm:text-right pr-2">
                          <span class="block text-xs font-bold text-slate-800">${W.date} • ${W.startTime}</span>
                          <span class="text-[10px] text-slate-400">${W.durationMinutes} min</span>
                        </div>

                        <!-- Botón directo: Posponer / Retrasar +1 día -->
                        <button 
                          type="button" 
                          data-block-idx="${le}" 
                          class="btn-postpone-suggested px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1"
                          title="Retrasar tarea 1 día (porque el profe lo ha indicado)"
                        >
                          <span>📅 +1d Retrasar</span>
                        </button>

                        <!-- Botón directo: Alternar Duración -->
                        <button 
                          type="button" 
                          data-block-idx="${le}" 
                          class="btn-toggle-duration px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                          title="Alternar duración (30 min / 45 min / 60 min)"
                        >
                          <span>⏱️ ${W.durationMinutes}m</span>
                        </button>

                        <!-- Botón directo: Descartar bloque -->
                        <button 
                          type="button" 
                          data-block-idx="${le}" 
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
    `,(fe=f.querySelector("#btn-close-plan-modal"))==null||fe.addEventListener("click",a.onClose),(H=f.querySelector("#btn-cancel-plan-modal"))==null||H.addEventListener("click",a.onClose);const Q=f.querySelector("#plan-dialog-form");Q==null||Q.addEventListener("submit",async W=>{W.preventDefault();const le=f.querySelector("#plan-dialog-input");if(le&&le.value.trim()){const ve=le.value.trim();le.value="",await V(ve)}}),f.querySelectorAll(".plan-chip").forEach(W=>{W.addEventListener("click",async()=>{const le=W.dataset.prompt;le&&await V(le)})}),f.querySelectorAll(".btn-postpone-suggested").forEach(W=>{W.addEventListener("click",()=>{const le=Number(W.dataset.blockIdx);if(P[le]){const ve=new Date(P[le].date);ve.setDate(ve.getDate()+1),P[le].date=ve.toISOString().split("T")[0],P[le].notes=`${P[le].notes||""} (Poscurrido 1 día por indicación del profesor)`.trim(),O()}})}),f.querySelectorAll(".btn-toggle-duration").forEach(W=>{W.addEventListener("click",()=>{const le=Number(W.dataset.blockIdx);if(P[le]){const ve=P[le].durationMinutes;P[le].durationMinutes=ve===30?45:ve===45?60:30,O()}})}),f.querySelectorAll(".btn-remove-suggested").forEach(W=>{W.addEventListener("click",()=>{const le=Number(W.dataset.blockIdx);P.splice(le,1),O()})});const X=f.querySelector("#btn-apply-plan-modal");X==null||X.addEventListener("click",async()=>{X&&(X.innerHTML="<span>⏳ Guardando en IndexedDB...</span>");try{for(const W of P)await ce.studyBlocks.add({...W,gradeKey:l,origin:W.origin||"student",syncedWithGoogle:!1});a.onApplied()}catch(W){alert(W.message||"Error al persistir en IndexedDB")}});const te=f.querySelector("#plan-dialog-history");te&&(te.scrollTop=te.scrollHeight)}async function I(){$=!0,O();const Q=await Ve.generatePlanificationDialogue(h);k.push({id:`msg_plan_${Date.now()}`,role:"assistant",content:Q.message,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),P=Q.suggestedBlocks,$=!1,O()}async function V(Q){k.push({id:`msg_u_${Date.now()}`,role:"student",content:Q,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),$=!0,O();const oe=await Ve.generatePlanificationDialogue(h,Q,k);k.push({id:`msg_a_${Date.now()}`,role:"assistant",content:oe.message,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),oe.suggestedBlocks&&oe.suggestedBlocks.length>0&&(P=oe.suggestedBlocks),$=!1,O()}function G(Q){return Q.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>")}I()}function Hs(f){let a=null;async function o(){var h;await Sr();const l=await ce.studyBlocks.toArray(),u=((h=ye.getState().user)==null?void 0:h.gradeKey)||"1eso",g=l.filter(b=>b.gradeKey===u||b.gradeKey==="both"||!b.gradeKey);s(g)}function s(l){var F,z,X,te,fe;const u=ye.getState().user,g=(u==null?void 0:u.gradeKey)||"1eso",h=l.length,b=l.filter(H=>H.syncedWithGoogle).length,k=Ve.calculateAgendaStats(l),P=k.urgentPriorities[0],$=g==="2batx"?["Lengua Castellana","Historia de España","Matemáticas II","Filosofía","Química","Inglés"]:["Lengua Castellana","Matemáticas","Ciencias Naturales","Ciencias Sociales","Inglés"];f.innerHTML=`
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
              ${P?`
                  <span class="text-2xl font-display font-extrabold text-slate-900 block truncate" title="${P.title}">
                    ${P.subject}
                  </span>
                  <p class="text-xs text-amber-800 font-semibold mt-1">
                    ${P.type==="exam"?"📝 Examen":"📦 Entrega"} • ${P.daysLeft===0?"¡Hoy mismo!":P.daysLeft===1?"Mañana":`En ${P.daysLeft} días`}
                  </p>
                `:`
                  <span class="text-xl font-display font-extrabold text-emerald-700">Sin urgencias</span>
                  <p class="text-xs text-slate-500 mt-1">Ritmo constante y espaciado</p>
                `}
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 border-t border-slate-100 pt-2">
              <span>${P?P.title:"Organización autónoma al día"}</span>
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
                <span class="text-2xl font-display font-extrabold text-slate-900">${k.afternoonDistribution.freeTimeHours} h</span>
                <span class="text-xs text-brand-700 font-bold">tiempo libre</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                Salida a las 15:00 • <strong>${k.afternoonDistribution.todayStudyMinutes} min</strong> estudio hoy
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
                <span class="text-2xl font-display font-extrabold text-slate-900">${k.homeworkProgress.completed} / ${k.homeworkProgress.total}</span>
                <span class="text-xs text-slate-500 font-medium">entregas listas</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div class="bg-cyan-500 h-2 rounded-full transition-all duration-500" style="width: ${k.homeworkProgress.percentage}%"></div>
              </div>
            </div>
            <div class="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
              <span>Tasa de entrega</span>
              <span class="font-bold text-slate-700">${k.homeworkProgress.percentage}%</span>
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
                <span class="text-2xl font-display font-extrabold text-slate-900">${b} / ${h}</span>
                <span class="text-xs text-slate-500">sincronizados</span>
              </div>
              <p class="text-[11px] text-emerald-700 font-semibold mt-1">100% guardado en tu navegador</p>
            </div>
            <div class="mt-3 border-t border-slate-100 pt-2">
              <button id="btn-sync-calendar" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5">
                <span>${L("agenda.syncAll")}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Barra Visual de Balance de Repaso por Asignatura -->
        ${k.subjectBreakdown.length>0?`
            <div class="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-base">📊</span>
                <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Dedicación por Asignatura:</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap flex-1 sm:justify-end">
                ${k.subjectBreakdown.map((H,W)=>`
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold border ${W===0?"bg-brand-50 text-brand-700 border-brand-200":W===1?"bg-purple-50 text-purple-700 border-purple-200":"bg-slate-100 text-slate-700 border-slate-200"}">
                    <span>${H.subject}:</span>
                    <strong class="font-bold">${H.minutes} min</strong>
                    <span class="text-[10px] text-slate-400">(${H.percentage}%)</span>
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
                ${L("agenda.title")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${g==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(u==null?void 0:u.name)||"Estudiante"} • ${(u==null?void 0:u.gradeLevel)||"1º de ESO"}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${L("agenda.subtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button id="btn-view-agenda-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Prompt de Sección: Planificador de Agenda">
              <span>📄</span>
              <span>Prompt Agenda</span>
            </button>
            <button id="btn-view-agenda-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Directriz Curricular Departamental provista por la API educativa">
              <span>🏛️</span>
              <span>Directriz API Educativa</span>
            </button>
            <button id="btn-ai-plan" class="px-3.5 py-2 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold transition-all flex items-center gap-1.5">
              <span>🤖</span>
              <span>Planificar con IA</span>
            </button>
            <button id="btn-new-block" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${L("agenda.addBlock")}</span>
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
          ${l.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📅</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${L("agenda.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${L("agenda.emptyDesc")}</p>
              </div>
            `:l.map(H=>`
              <div class="glass-panel p-4 sm:p-5 rounded-2xl glow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 ${H.type==="exam"?"border-l-accent-amber":H.type==="assignment_due"?"border-l-accent-cyan":"border-l-brand-500"} ${H.completed?"opacity-60 bg-slate-50/50":""}">
                
                <!-- Left Details -->
                <div class="flex items-start gap-3.5">
                  <input 
                    type="checkbox" 
                    data-id="${H.id}" 
                    class="block-checkbox mt-1 w-5 h-5 rounded-lg text-brand-600 focus:ring-brand-500 cursor-pointer border-slate-300"
                    ${H.completed?"checked":""} 
                  />
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-bold text-sm text-slate-900 ${H.completed?"line-through text-slate-500":""}">${H.title}</span>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${H.type==="exam"?"bg-amber-50 text-amber-700 border border-amber-200":H.type==="assignment_due"?"bg-cyan-50 text-cyan-700 border border-cyan-200":"bg-brand-50 text-brand-700 border border-brand-200"}">
                        ${H.subject}
                      </span>
                      ${H.origin==="student"?`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md" title="Tarea planificada autónomamente por el alumno">
                              <span>👤</span> Personal
                            </span>`:`<span class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md" title="Comunicado por el centro educativo (Esfer@ / Departament d'Educació)">
                              <span>🏛️</span> Entidad Educativa
                            </span>`}
                      ${H.syncedWithGoogle?`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <span>✓</span> ${L("agenda.synced")}
                            </span>`:`<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              ${L("agenda.pendingSync")}
                            </span>`}
                    </div>
                    <p class="text-xs text-slate-500 mt-1">${H.notes||""}</p>
                    ${H.teacherNotes?`
                        <div class="mt-1.5 p-2 rounded-xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-1.5 text-[11px] text-purple-900">
                          <span class="text-xs flex-shrink-0">📢</span>
                          <span><strong>Profesor:</strong> ${H.teacherNotes}</span>
                        </div>
                      `:""}
                  </div>
                </div>

                <!-- Right Timing & Actions -->
                <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div class="text-left sm:text-right pr-1">
                    <span class="block text-xs font-bold text-slate-800">${H.date} • ${H.startTime}</span>
                    <span class="text-[11px] text-slate-400">${H.durationMinutes} ${L("agenda.minRecommended")}</span>
                  </div>

                  <!-- Acción directa: Posponer +1 día -->
                  <button 
                    data-postpone-id="${H.id}" 
                    class="btn-postpone-block px-2.5 py-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1" 
                    title="Posponer / Retrasar 1 día en IndexedDB (si el profesor ha dado más margen)"
                  >
                    <span>📅 +1d</span>
                  </button>

                  <button data-delete-id="${H.id}" class="btn-delete-block p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors" title="Eliminar">
                    🗑️
                  </button>
                </div>

              </div>
            `).join("")}
        </div>

        <!-- Add Block Modal Container -->
        <div id="new-block-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${L("agenda.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${L("agenda.modalSubtitle")}</p>

            <form id="new-block-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldActivity")}</label>
                <input type="text" id="nb-title" placeholder="Ej. Repaso de vocabulario" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldSubject")}</label>
                  <select id="nb-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    ${$.map(H=>`<option value="${H}">${H}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldType")}</label>
                  <select id="nb-type" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="study_session">${L("agenda.types.study_session")}</option>
                    <option value="exam">${L("agenda.types.exam")}</option>
                    <option value="assignment_due">${L("agenda.types.assignment_due")}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldDate")}</label>
                  <input type="date" id="nb-date" value="${new Date().toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldTime")}</label>
                  <input type="time" id="nb-time" value="17:00" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${L("agenda.fieldNotes")}</label>
                <input type="text" id="nb-notes" placeholder="Ej. Resolver 3 ejercicios de examen" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nb" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${L("agenda.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${L("agenda.save")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,(F=f.querySelector("#btn-dismiss-inst-alert"))==null||F.addEventListener("click",()=>{a=null,o()}),f.querySelectorAll(".block-checkbox").forEach(H=>{H.addEventListener("change",async()=>{const W=Number(H.dataset.id),le=H.checked;if(await ce.studyBlocks.update(W,{completed:le}),le){const ve=await ce.studyBlocks.get(W);if(ve){const me=await Wt.checkAndTriggerCollaborativeProgression(ve);me&&(a={message:me.notificationMessage,title:me.block.title,subject:me.sourceSubject})}}o()})}),f.querySelectorAll(".btn-delete-block").forEach(H=>{H.addEventListener("click",async()=>{const W=Number(H.dataset.deleteId);await ce.studyBlocks.delete(W),o()})}),f.querySelectorAll(".btn-postpone-block").forEach(H=>{H.addEventListener("click",async()=>{const W=Number(H.dataset.postponeId),le=await ce.studyBlocks.get(W);if(le){const ve=new Date(le.date);ve.setDate(ve.getDate()+1);const me=ve.toISOString().split("T")[0];await ce.studyBlocks.update(W,{date:me,rescheduledCount:(le.rescheduledCount||0)+1,notes:`${le.notes?le.notes+" • ":""}📅 Pospuesto +1d`.trim()}),o()}})});const G=f.querySelector("#btn-sync-calendar");G==null||G.addEventListener("click",async()=>{G&&(G.innerHTML=`<span>${L("agenda.syncing")}</span>`);try{await Fs.syncAllPendingBlocks(),await o()}catch(H){alert(H.message||"Error al sincronizar con Google Calendar")}}),(z=f.querySelector("#btn-view-agenda-prompt"))==null||z.addEventListener("click",()=>{const H=document.getElementById("modal-root")||document.body;bt(H,"Prompt Estático: Planificador de Agenda (agenda_planner.md)",ht.agenda,{subtitle:"Prompt Transversal de Sección (Metodología Spaced Repetition)",onClose:()=>{H.innerHTML=""}})}),(X=f.querySelector("#btn-view-agenda-curricular"))==null||X.addEventListener("click",async()=>{const H=document.getElementById("modal-root")||document.body,W=await Wt.getDepartmentalPrompt("Lengua Castellana y Literatura",g);bt(H,W.subject,W.promptMarkdown,{subtitle:`Directriz Curricular Departamental para ${W.gradeLevel}`,institution:W.institution,sourceApi:W.sourceApi,gradeLevel:W.gradeLevel,onClose:()=>{H.innerHTML=""}})});const Q=f.querySelector("#btn-ai-plan");Q==null||Q.addEventListener("click",()=>{const H=document.getElementById("modal-root")||document.body;Gs(H,{onApplied:()=>{H.innerHTML="",o()},onClose:()=>{H.innerHTML=""}})});const oe=f.querySelector("#new-block-modal");(te=f.querySelector("#btn-new-block"))==null||te.addEventListener("click",()=>{oe==null||oe.classList.remove("hidden")}),(fe=f.querySelector("#btn-cancel-nb"))==null||fe.addEventListener("click",()=>{oe==null||oe.classList.add("hidden")});const ge=f.querySelector("#new-block-form");ge==null||ge.addEventListener("submit",async H=>{H.preventDefault();const W=f.querySelector("#nb-title").value,le=f.querySelector("#nb-subject").value,ve=f.querySelector("#nb-type").value,me=f.querySelector("#nb-date").value,je=f.querySelector("#nb-time").value,Xe=f.querySelector("#nb-notes").value;await ce.studyBlocks.add({title:W,subject:le,type:ve,date:me,startTime:je,durationMinutes:45,completed:!1,gradeKey:g,origin:"student",notes:Xe,syncedWithGoogle:!0,googleEventId:`gcal_${Date.now()}`}),oe==null||oe.classList.add("hidden"),o()})}o()}const Vs=[{id:"t_lengua_1eso",subject:"Lengua Castellana",name:"Análisis de Oraciones: Sujeto y Complemento Verbal",level:"1º de ESO (12 años)",keyConcepts:["Sujeto y Predicado","Verbo","Complemento Verbal (en bloque)"]},{id:"t_lengua_2batx",subject:"Lengua Castellana",name:"Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)",level:"2º de Bachillerato (17-18 años)",keyConcepts:["CPredicativo (concordancia)","CRV vs CC","Pruebas sintácticas PAU"]},{id:"t_math",subject:"Matemáticas",name:"Ecuaciones y Funciones Cuadráticas",level:"4º ESO",keyConcepts:["Fórmula general","Vértice de la parábola","Discriminante"]},{id:"t_bio",subject:"Biología",name:"Metabolismo Celular y Fotosíntesis",level:"4º ESO / Bachillerato",keyConcepts:["ATP y Energía","Fase luminosa","Ciclo de Calvin"]},{id:"t_hist",subject:"Historia",name:"Revolución Industrial y Cambios Sociales",level:"4º ESO",keyConcepts:["Máquina de vapor","Movimiento obrero","Causas económicas"]}];function Us(f){var P;const o=((P=ye.getState().user)==null?void 0:P.gradeKey)||"1eso",s=Vs.filter($=>$.id==="t_lengua_1eso"?o==="1eso":$.id==="t_lengua_2batx"?o==="2batx":!0);let l=o==="2batx"?s.find($=>$.id==="t_lengua_2batx")||s[0]:s.find($=>$.id==="t_lengua_1eso")||s[0];function d($){const O=$.subject.includes("Lengua"),I=$.id==="t_lengua_2batx";let V=`¡Hola! Soy tu tutor socrático en **${$.subject}** (${$.name}).

Recuerda: aquí no te daré las respuestas masticadas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.

¿Qué ejercicio o concepto estás abordando ahora mismo?`,G=["No sé cómo empezar el ejercicio","Tengo dudas con el primer paso","Quiero repasar la teoría básica"];return O&&!I?(V=`¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨

En 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con nombres difíciles ni clasificaciones complejas.

Por ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`,G=['El sujeto es "El tren" y el verbo "llegó"',"¿Qué palabras forman el complemento verbal?","¿Cómo distingo el sujeto del predicado?"]):O&&I&&(V=`¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚

En este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal (CD, CI, CRV, CC, CPred, CAg) y demostrarlo con pruebas sintácticas formales.

Considera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica formal demuestra que es un **Complemento Predicativo (CPred)**?`,G=['"Puntual" concuerda con el sujeto en género y número','¿Y qué función sintáctica tiene "a la estación"?',"¿Cómo distingo un CPred de un Atributo?"]),{id:`msg_welcome_${Date.now()}`,role:"tutor",content:V,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),isSocraticQuestion:!0,suggestedPrompts:G}}let u=[d(l)];function g(){var G,Q,oe,ge,F;f.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Pedagogical Guarantee Banner -->
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan text-white shadow-lg shadow-brand-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h3 class="font-display font-bold text-base sm:text-lg">${L("study.bannerTitle")}</h3>
              <p class="text-xs text-white/90">${L("study.bannerDesc")}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-semibold self-stretch md:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>${L("study.bannerBadge")}</span>
          </div>
        </div>

        <!-- Main Layout: Socratic Chat (Left) + Active Recall / Socratic Tools (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Socratic Chat Interface (8 cols) -->
          <div class="lg:col-span-8 flex flex-col glass-panel rounded-3xl border border-slate-200 overflow-hidden h-[620px]">
            
            <!-- Chat Topbar -->
            <div class="p-4 border-b border-slate-200 bg-white/50 flex items-center justify-between gap-3 flex-wrap">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🧠</span>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">${l.name}</h4>
                  <span class="text-xs text-brand-600 font-semibold">${l.subject} • ${l.level}</span>
                </div>
              </div>

              <!-- Topic Selector & Prompt Inspector -->
              <div class="flex items-center gap-2 flex-wrap">
                <button id="btn-view-socratic-prompt" class="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all" title="Ver Prompt de Sección: Tutor Socrático">
                  <span>📄</span>
                  <span>Prompt Socrático</span>
                </button>
                <button id="btn-view-socratic-curricular" class="px-2.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1 transition-all" title="Ver Directriz Curricular Departamental provista por la API educativa">
                  <span>🏛️</span>
                  <span>Directriz API Educativa</span>
                </button>
                <select id="select-topic" class="text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                  ${s.map(z=>`<option value="${z.id}" ${z.id===l.id?"selected":""}>${z.subject}: ${z.name}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Messages Stream -->
            <div id="chat-stream" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              ${u.map(z=>h(z)).join("")}
            </div>

            <!-- Quick Socratic Prompts (Chips) -->
            <div id="quick-prompts-container" class="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex gap-2 overflow-x-auto text-xs">
              <button data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${L("study.chip1")}
              </button>
              <button data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${L("study.chip2")}
              </button>
              <button data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${L("study.chip3")}
              </button>
            </div>

            <!-- Chat Input Area -->
            <div class="p-4 bg-white border-t border-slate-200">
              <form id="chat-form" class="flex items-center gap-2">
                <input 
                  type="text" 
                  id="chat-input" 
                  placeholder="${L("study.inputPlaceholder")}" 
                  required
                  class="flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
                <button 
                  type="submit" 
                  id="btn-send-message"
                  class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>${L("study.send")}</span>
                  <span>➤</span>
                </button>
              </form>
              <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                <span>${L("study.safeMode")}</span>
                <span>${L("study.openaiCompatible")}</span>
              </div>
            </div>

          </div>

          <!-- Active Recall & Concept Cards (4 cols) -->
          <div class="lg:col-span-4 space-y-4">
            
            <!-- Card 1: Desafío de Memoria Activa (Active Recall) -->
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${L("study.activeRecall")}</span>
                <button id="btn-view-recall-prompt" class="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                  <span>📄</span>
                  <span>Prompt Recall</span>
                </button>
              </div>

              <div>
                <h4 class="font-bold text-sm text-slate-900">${L("study.flashcardTitle")}</h4>
                <p class="text-xs text-slate-500 mt-1">${L("study.flashcardSubtitle")}</p>
              </div>

              <div id="flashcard-box" class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                <span id="flashcard-concept" class="text-xs font-bold text-brand-700 block">¿Cuál es el significado del discriminante (b² - 4ac) en una ecuación de segundo grado?</span>
                
                <div id="flashcard-answer" class="hidden text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                  <p id="flashcard-explanation"><strong>Explicación:</strong> Indica cuántas soluciones reales existen:</p>
                  <p>• Si > 0: 2 soluciones reales distintas.</p>
                  <p>• Si = 0: 1 solución real (doble).</p>
                  <p>• Si < 0: No existen soluciones reales.</p>
                </div>

                <button id="btn-toggle-answer" class="w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors">
                  ${L("study.toggleHint")}
                </button>
              </div>

              <!-- AI Challenge Generator Button -->
              <button id="btn-generate-card-ai" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5">
                <span>⚡ Generar Nuevo Desafío con IA</span>
              </button>

              <div class="flex items-center justify-between gap-2 pt-1">
                <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                  ${L("study.reviewLater")}
                </button>
                <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                  ${L("study.mastered")}
                </button>
              </div>
            </div>

            <!-- Card 2: Conceptos Clave del Tema -->
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${L("study.conceptsTitle")}</span>
              <ul class="space-y-2 text-xs">
                ${l.keyConcepts.map((z,X)=>`
                  <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="font-medium text-slate-800">${z}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${X===0?"bg-emerald-100 text-emerald-800":"bg-slate-200 text-slate-600"}">
                      ${L(X===0?"study.consolidated":"study.toStrengthen")}
                    </span>
                  </li>
                `).join("")}
              </ul>
            </div>

          </div>

        </div>

      </div>
    `;const $=f.querySelector("#chat-stream");$==null||$.scrollTo({top:$.scrollHeight,behavior:"smooth"}),(G=f.querySelector("#select-topic"))==null||G.addEventListener("change",z=>{const X=z.target.value,te=s.find(fe=>fe.id===X);te&&(l=te,u=[d(te)],g())}),(Q=f.querySelector("#btn-toggle-answer"))==null||Q.addEventListener("click",()=>{const z=f.querySelector("#flashcard-answer");z==null||z.classList.toggle("hidden")}),(oe=f.querySelector("#btn-view-socratic-prompt"))==null||oe.addEventListener("click",()=>{const z=document.getElementById("modal-root")||document.body;bt(z,"Prompt Estático: Tutor Socrático (socratic_tutor.md)",ht.socratic,{subtitle:"Prompt Transversal de Sección (Metodología Socrática y Guardrails Transversales)",onClose:()=>{z.innerHTML=""}})}),(ge=f.querySelector("#btn-view-socratic-curricular"))==null||ge.addEventListener("click",async()=>{const z=document.getElementById("modal-root")||document.body,X=await Wt.getDepartmentalPrompt(l.subject,o);bt(z,X.subject,X.promptMarkdown,{subtitle:`Directriz Curricular Departamental para ${X.gradeLevel}`,institution:X.institution,sourceApi:X.sourceApi,gradeLevel:X.gradeLevel,onClose:()=>{z.innerHTML=""}})}),(F=f.querySelector("#btn-view-recall-prompt"))==null||F.addEventListener("click",()=>{const z=document.getElementById("modal-root")||document.body;bt(z,"Prompt Estático: Generador de Active Recall (active_recall_generator.md)",ht.recall,{subtitle:"Prompt Transversal de Sección (Generación de Flashcards Conceptuales)",onClose:()=>{z.innerHTML=""}})});const O=f.querySelector("#btn-generate-card-ai");O==null||O.addEventListener("click",async()=>{O&&(O.innerHTML="<span>⏳ Generando desafío...</span>");try{const z=await Ve.generateActiveRecallCard(l.subject,l.name),X=f.querySelector("#flashcard-concept"),te=f.querySelector("#flashcard-explanation"),fe=f.querySelector("#flashcard-answer");X&&(X.textContent=z.concept),te&&(te.textContent=z.explanation),fe==null||fe.classList.add("hidden")}catch(z){alert(z.message||"Error al generar tarjeta con IA")}finally{O&&(O.innerHTML="<span>⚡ Generar Nuevo Desafío con IA</span>")}}),f.querySelectorAll(".chip-btn").forEach(z=>{z.addEventListener("click",()=>{const X=z.dataset.prompt;X&&k(X)})});const V=f.querySelector("#chat-form");V==null||V.addEventListener("submit",z=>{z.preventDefault();const X=f.querySelector("#chat-input");if(X&&X.value.trim()){const te=X.value.trim();X.value="",k(te)}})}function h($){const O=$.role==="tutor";return`
      <div class="flex gap-3 ${O?"items-start":"items-start flex-row-reverse"}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${O?"bg-brand-500 text-white shadow-md shadow-brand-500/25":"bg-slate-800 text-white"}">
          ${O?"🧠":"👤"}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${O?"bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60":"bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10"}">
            <div class="prose prose-sm max-w-none">
              ${b($.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${O?"pl-1":"justify-end pr-1"}">
            <span>${L(O?"study.tutorRole":"study.userRole")}</span>
            <span>•</span>
            <span>${$.timestamp}</span>
          </div>
        </div>
      </div>
    `}function b($){return $.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>")}async function k($){const O={id:`msg_u_${Date.now()}`,role:"student",content:$,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};u.push(O),g();const I=f.querySelector("#btn-send-message");I&&(I.innerHTML="<span>⏳</span>");const V=await Ve.generateSocraticResponse($,l.subject,l.name,u);u.push(V),g()}g()}class Ws{async getAvailableFiles(){var b;const a=ye.getState();if(!a.isAuthenticated||!a.scopes.drive)throw new Error("Debes conectar tu cuenta de Google con acceso a Google Drive");if(a.mode==="demo")return[{fileId:"drv_demo_01",name:"Ensayo_Energia_Sostenible_Borrador.gdoc",mimeType:"application/vnd.google-apps.document",webViewLink:"https://docs.google.com/document",lastModified:"Hoy, 10:30"},{fileId:"drv_demo_02",name:"Presentacion_Historia_Siglo_XX.gslides",mimeType:"application/vnd.google-apps.presentation",webViewLink:"https://docs.google.com/presentation",lastModified:"Ayer"},{fileId:"drv_demo_03",name:"Apuntes_Biologia_Genetica.pdf",mimeType:"application/pdf",webViewLink:"https://drive.google.com",lastModified:"Hace 3 días"},{fileId:"drv_demo_04",name:"Datos_Graficos_Matematicas.gsheet",mimeType:"application/vnd.google-apps.spreadsheet",webViewLink:"https://docs.google.com/spreadsheets",lastModified:"Hace 1 semana"}];const o=ye.getAccessToken();if(!o)throw new Error("El token de sesión de Google ha caducado. Vuelve a iniciar sesión.");const s=encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')"),l=encodeURIComponent("files(id,name,mimeType,webViewLink,iconLink,modifiedTime)"),d=`https://www.googleapis.com/drive/v3/files?pageSize=25&q=${s}&fields=${l}&orderBy=modifiedTime desc`,u=await fetch(d,{headers:{Authorization:`Bearer ${o}`}});if(!u.ok){const k=await u.json().catch(()=>({}));throw new Error(`Error de Google Drive API (${u.status}): ${((b=k.error)==null?void 0:b.message)||u.statusText}`)}return((await u.json()).files||[]).map(k=>({fileId:k.id,name:k.name,mimeType:k.mimeType,iconUrl:k.iconLink,webViewLink:k.webViewLink||`https://drive.google.com/open?id=${k.id}`,lastModified:k.modifiedTime?new Date(k.modifiedTime).toLocaleDateString():"Drive Sync"}))}}const Qs=new Ws;function Ys(f){async function a(){await Ts();const u=await ce.projectTasks.toArray();o(u)}function o(u){var G,Q,oe,ge;const h=ye.getState().user,b=(h==null?void 0:h.gradeKey)||"1eso",k=u.filter(F=>!F.gradeKey||F.gradeKey===b||F.gradeKey==="both");f.innerHTML=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${L("tasks.title")}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${b==="1eso"?"bg-emerald-100 text-emerald-800 border border-emerald-300":"bg-purple-100 text-purple-800 border border-purple-300"} font-bold">
                ${(h==null?void 0:h.name)||"Estudiante"} • ${(h==null?void 0:h.gradeLevel)||"1º de ESO"}
              </span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${L("tasks.driveIntegration")}</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${L("tasks.subtitle")}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button id="btn-view-project-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Prompt de Sección: Mentor de Trabajos">
              <span>📄</span>
              <span>Prompt Trabajos</span>
            </button>
            <button id="btn-view-project-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Directriz Curricular Departamental provista por la API educativa">
              <span>🏛️</span>
              <span>Directriz API Educativa</span>
            </button>
            <button id="btn-new-task" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${L("tasks.newTask")}</span>
            </button>
          </div>
        </div>

        <!-- Task Deliverables List -->
        <div class="space-y-6">
          ${k.length===0?`
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${L("tasks.emptyTitle")}</p>
                <p class="text-xs text-slate-400">${L("tasks.emptyDesc")}</p>
              </div>
            `:k.map(F=>`
              <div class="glass-panel p-6 rounded-3xl border ${F.gradeKey==="1eso"?"border-emerald-200/80 bg-emerald-50/15":F.gradeKey==="2batx"?"border-purple-200/80 bg-purple-50/15":"border-slate-200"} glow-card space-y-5">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${F.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${F.subject}
                      </span>
                      ${F.gradeKey==="1eso"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              🟢 1º de ESO • Operaciones Concretas
                            </span>`:F.gradeKey==="2batx"?`<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                              🟣 2º de Bachillerato • Operaciones Formales (PAU)
                            </span>`:""}
                    </div>
                    <p class="text-xs text-slate-600 mt-1">${F.notes}</p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">${L("tasks.dueDate")}: ${F.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">${L("tasks.autonomy")}: ${s(F)}%</span>
                    </div>
                  </div>
                </div>

                ${F.pedagogicalNote?`
                  <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
                  <div class="p-3.5 rounded-2xl ${F.gradeKey==="1eso"?"bg-emerald-50 border border-emerald-200 text-emerald-900":"bg-purple-50 border border-purple-200 text-purple-900"} text-xs flex items-start gap-2.5">
                    <span class="text-base flex-shrink-0">🧠</span>
                    <div>
                      <span class="font-bold block">Fundamento Pedagógico (Piaget & Guardrails):</span>
                      <span class="leading-relaxed">${F.pedagogicalNote}</span>
                    </div>
                  </div>
                `:""}

                <!-- 4-Phases Progression Stepper -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${L("tasks.phasesTitle")}</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${l(F.id,"planning",L("tasks.phases.planning"),F.currentPhase)}
                    ${l(F.id,"research",L("tasks.phases.research"),F.currentPhase)}
                    ${l(F.id,"writing",L("tasks.phases.writing"),F.currentPhase)}
                    ${l(F.id,"review",L("tasks.phases.review"),F.currentPhase)}
                  </div>
                </div>

                <!-- Google Drive Resources & Autonomy Checklist Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                  
                  <!-- Left: Google Drive Attached Files -->
                  <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">📁</span>
                        <h4 class="font-bold text-xs text-slate-800">${L("tasks.driveDocs")}</h4>
                      </div>
                      <button data-task-drive="${F.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>${L("tasks.attachDrive")}</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      ${F.driveFiles.length===0?`<p class="text-xs text-slate-400 py-2">${L("tasks.noDriveFiles")}</p>`:F.driveFiles.map(z=>`
                          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                            <div class="flex items-center gap-2 overflow-hidden">
                              <span class="text-base flex-shrink-0">${d(z.mimeType)}</span>
                              <div class="truncate">
                                <a href="${z.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${z.name}</a>
                                <span class="text-[10px] text-slate-400 font-mono">${z.lastModified||"Sincronizado"}</span>
                              </div>
                            </div>
                            <a href="${z.webViewLink||"#"}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                              ${L("tasks.driveSync")} ↗
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
                        <h4 class="font-bold text-xs text-brand-900">${L("tasks.autonomyMeter")}</h4>
                      </div>
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                        ${s(F)}% ${L("tasks.ownEffort")}
                      </span>
                    </div>

                    <div class="space-y-2">
                      ${F.criteria.map(z=>`
                        <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                          <input 
                            type="checkbox" 
                            data-task-id="${F.id}" 
                            data-crit-id="${z.id}" 
                            class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                            ${z.checked?"checked":""} 
                          />
                          <div>
                            <span class="font-semibold text-slate-800 block ${z.checked?"line-through text-slate-400":""}">${z.label}</span>
                            <span class="text-[11px] text-slate-500">${z.explanation}</span>
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
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${L("tasks.modalTitle")}</h3>
            <p class="text-xs text-slate-500 mb-4">${L("tasks.modalSubtitle")}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${L("tasks.fieldTitle")}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("tasks.fieldSubject")}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${L("tasks.fieldDue")}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now()+864e5*10).toISOString().split("T")[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${L("tasks.fieldNotes")}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${L("tasks.cancel")}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${L("tasks.create")}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `,f.querySelectorAll(".crit-checkbox").forEach(F=>{F.addEventListener("change",async()=>{const z=Number(F.dataset.taskId),X=F.dataset.critId,te=u.find(fe=>fe.id===z);if(te){const fe=te.criteria.find(H=>H.id===X);fe&&(fe.checked=F.checked,te.autonomyScore=s(te),await ce.projectTasks.update(z,{criteria:te.criteria,autonomyScore:te.autonomyScore}),a())}})}),f.querySelectorAll(".phase-badge-btn").forEach(F=>{F.addEventListener("click",async()=>{const z=Number(F.dataset.taskId),X=F.dataset.phase;await ce.projectTasks.update(z,{currentPhase:X}),a()})}),f.querySelectorAll(".btn-attach-drive").forEach(F=>{F.addEventListener("click",async()=>{const z=Number(F.dataset.taskDrive);try{const X=await Qs.getAvailableFiles(),te=u.find(fe=>fe.id===z);if(te&&X.length>0){const fe=X.find(W=>!te.driveFiles.some(le=>le.fileId===W.fileId))||X[0],H=[...te.driveFiles,fe];await ce.projectTasks.update(z,{driveFiles:H}),a()}}catch(X){alert(X.message||"Error al conectar con Google Drive")}})});const I=f.querySelector("#new-task-modal");(G=f.querySelector("#btn-new-task"))==null||G.addEventListener("click",()=>{I==null||I.classList.remove("hidden")}),(Q=f.querySelector("#btn-cancel-nt"))==null||Q.addEventListener("click",()=>{I==null||I.classList.add("hidden")}),(oe=f.querySelector("#btn-view-project-prompt"))==null||oe.addEventListener("click",()=>{const F=document.getElementById("modal-root")||document.body;bt(F,"Prompt Estático: Mentor de Trabajos y Proyectos (project_guide.md)",ht.project,{subtitle:"Prompt Transversal de Sección (Metodología de 4 Fases y Auditoría de Autoría)",onClose:()=>{F.innerHTML=""}})}),(ge=f.querySelector("#btn-view-project-curricular"))==null||ge.addEventListener("click",async()=>{const F=document.getElementById("modal-root")||document.body,z=await Wt.getDepartmentalPrompt("Lengua Castellana y Literatura",b);bt(F,z.subject,z.promptMarkdown,{subtitle:`Directriz Curricular Departamental para ${z.gradeLevel}`,institution:z.institution,sourceApi:z.sourceApi,gradeLevel:z.gradeLevel,onClose:()=>{F.innerHTML=""}})});const V=f.querySelector("#new-task-form");V==null||V.addEventListener("submit",async F=>{F.preventDefault();const z=f.querySelector("#nt-title").value,X=f.querySelector("#nt-subject").value,te=f.querySelector("#nt-due").value,fe=f.querySelector("#nt-notes").value;await ce.projectTasks.add({title:z,subject:X,gradeKey:b,dueDate:te,currentPhase:"planning",autonomyScore:25,notes:fe,driveFiles:[{fileId:`drive_${Date.now()}`,name:`${z.replace(/\s+/g,"_")}_Borrador.gdoc`,mimeType:"application/vnd.google-apps.document",lastModified:"Recién creado"}],criteria:[{id:"c1",label:"Formulación y alcance del proyecto con mis palabras",checked:!0,explanation:"Definido el objetivo inicial de manera autónoma."},{id:"c2",label:"Búsqueda activa y contraste de fuentes fiables",checked:!1,explanation:"Seleccionar fuentes antes de escribir."},{id:"c3",label:"Redacción propia evitando generación automática por IA",checked:!1,explanation:"El texto debe ser fruto de la reflexión del estudiante."},{id:"c4",label:"Revisión crítica de estructura y conclusiones",checked:!1,explanation:"Validar que las conclusiones responden a la hipótesis."}]}),I==null||I.classList.add("hidden"),a()})}function s(u){if(!u.criteria||u.criteria.length===0)return 100;const g=u.criteria.filter(h=>h.checked).length;return Math.round(g/u.criteria.length*100)}function l(u,g,h,b){return`
      <button 
        data-task-id="${u}" 
        data-phase="${g}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${b===g?"bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20":"bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}"
      >
        ${h}
      </button>
    `}function d(u){return u.includes("document")?"📄":u.includes("presentation")||u.includes("slides")?"📊":u.includes("spreadsheet")||u.includes("sheet")?"📈":"📑"}a()}class Js{constructor(){ke(this,"activeTab","agenda");ke(this,"navbarRoot");ke(this,"tabsRoot");ke(this,"viewContainer");ke(this,"modalRoot");ke(this,"isReady",!1);this.navbarRoot=document.getElementById("navbar-root"),this.tabsRoot=document.getElementById("tabs-root"),this.viewContainer=document.getElementById("app-view-container"),this.modalRoot=document.getElementById("modal-root")}async start(){await Ut.init(),await Ps(),await bn.register(),Ut.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),ye.subscribe(()=>{this.isReady&&(this.renderHeaderAndTabs(),this.switchView(this.activeTab))}),this.renderHeaderAndTabs(),this.switchView(this.activeTab),this.isReady=!0}renderHeaderAndTabs(){qs(this.navbarRoot,{onOpenAISettings:()=>this.openAISettingsModal(),onOpenAuth:()=>this.openAuthModal(),onLanguageChange:()=>{}}),zs(this.tabsRoot,this.activeTab,{onTabChange:a=>{this.activeTab=a,this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}switchView(a){switch(this.viewContainer.innerHTML="",a){case"agenda":Hs(this.viewContainer);break;case"study":Us(this.viewContainer);break;case"tasks":Ys(this.viewContainer);break}}openAISettingsModal(){Ns(this.modalRoot,{onSaved:()=>{this.modalRoot.innerHTML="",this.renderHeaderAndTabs()},onClose:()=>{this.modalRoot.innerHTML=""}})}openAuthModal(){yn(this.modalRoot,{onClose:()=>{this.modalRoot.innerHTML=""},onStateChanged:()=>{this.renderHeaderAndTabs(),this.switchView(this.activeTab)}})}}document.addEventListener("DOMContentLoaded",()=>{new Js().start().catch(a=>{console.error("[Anaxagoras AI] Error al inicializar la aplicación:",a)})});
//# sourceMappingURL=index-CfaOej5m.js.map
