(()=>{var Hd=Object.create;var Ma=Object.defineProperty;var Vd=Object.getOwnPropertyDescriptor;var Wd=Object.getOwnPropertyNames;var Qd=Object.getPrototypeOf,Gd=Object.prototype.hasOwnProperty;var st=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Yd=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wd(t))!Gd.call(e,o)&&o!==n&&Ma(e,o,{get:()=>t[o],enumerable:!(r=Vd(t,o))||r.enumerable});return e};var A=(e,t,n)=>(n=e!=null?Hd(Qd(e)):{},Yd(t||!e||!e.__esModule?Ma(n,"default",{value:e,enumerable:!0}):n,e));var Ga=st(j=>{"use strict";var Dn=Symbol.for("react.element"),Kd=Symbol.for("react.portal"),Xd=Symbol.for("react.fragment"),Zd=Symbol.for("react.strict_mode"),Jd=Symbol.for("react.profiler"),ef=Symbol.for("react.provider"),tf=Symbol.for("react.context"),nf=Symbol.for("react.forward_ref"),rf=Symbol.for("react.suspense"),of=Symbol.for("react.memo"),lf=Symbol.for("react.lazy"),Ia=Symbol.iterator;function af(e){return e===null||typeof e!="object"?null:(e=Ia&&e[Ia]||e["@@iterator"],typeof e=="function"?e:null)}var Fa={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ua=Object.assign,$a={};function ln(e,t,n){this.props=e,this.context=t,this.refs=$a,this.updater=n||Fa}ln.prototype.isReactComponent={};ln.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ln.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ba(){}Ba.prototype=ln.prototype;function al(e,t,n){this.props=e,this.context=t,this.refs=$a,this.updater=n||Fa}var sl=al.prototype=new Ba;sl.constructor=al;Ua(sl,ln.prototype);sl.isPureReactComponent=!0;var Da=Array.isArray,Ha=Object.prototype.hasOwnProperty,ul={current:null},Va={key:!0,ref:!0,__self:!0,__source:!0};function Wa(e,t,n){var r,o={},l=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(l=""+t.key),t)Ha.call(t,r)&&!Va.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:Dn,type:e,key:l,ref:i,props:o,_owner:ul.current}}function sf(e,t){return{$$typeof:Dn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function cl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Dn}function uf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Aa=/\/+/g;function il(e,t){return typeof e=="object"&&e!==null&&e.key!=null?uf(""+e.key):t.toString(36)}function Rr(e,t,n,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Dn:case Kd:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+il(i,0):r,Da(o)?(n="",e!=null&&(n=e.replace(Aa,"$&/")+"/"),Rr(o,t,n,"",function(u){return u})):o!=null&&(cl(o)&&(o=sf(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(Aa,"$&/")+"/")+e)),t.push(o)),1;if(i=0,r=r===""?".":r+":",Da(e))for(var a=0;a<e.length;a++){l=e[a];var s=r+il(l,a);i+=Rr(l,t,n,s,o)}else if(s=af(e),typeof s=="function")for(e=s.call(e),a=0;!(l=e.next()).done;)l=l.value,s=r+il(l,a++),i+=Rr(l,t,n,s,o);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Lr(e,t,n){if(e==null)return e;var r=[],o=0;return Rr(e,r,"","",function(l){return t.call(n,l,o++)}),r}function cf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var he={current:null},br={transition:null},df={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:br,ReactCurrentOwner:ul};function Qa(){throw Error("act(...) is not supported in production builds of React.")}j.Children={map:Lr,forEach:function(e,t,n){Lr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Lr(e,function(){t++}),t},toArray:function(e){return Lr(e,function(t){return t})||[]},only:function(e){if(!cl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};j.Component=ln;j.Fragment=Xd;j.Profiler=Jd;j.PureComponent=al;j.StrictMode=Zd;j.Suspense=rf;j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=df;j.act=Qa;j.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ua({},e.props),o=e.key,l=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,i=ul.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Ha.call(t,s)&&!Va.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var u=0;u<s;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:Dn,type:e.type,key:o,ref:l,props:r,_owner:i}};j.createContext=function(e){return e={$$typeof:tf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ef,_context:e},e.Consumer=e};j.createElement=Wa;j.createFactory=function(e){var t=Wa.bind(null,e);return t.type=e,t};j.createRef=function(){return{current:null}};j.forwardRef=function(e){return{$$typeof:nf,render:e}};j.isValidElement=cl;j.lazy=function(e){return{$$typeof:lf,_payload:{_status:-1,_result:e},_init:cf}};j.memo=function(e,t){return{$$typeof:of,type:e,compare:t===void 0?null:t}};j.startTransition=function(e){var t=br.transition;br.transition={};try{e()}finally{br.transition=t}};j.unstable_act=Qa;j.useCallback=function(e,t){return he.current.useCallback(e,t)};j.useContext=function(e){return he.current.useContext(e)};j.useDebugValue=function(){};j.useDeferredValue=function(e){return he.current.useDeferredValue(e)};j.useEffect=function(e,t){return he.current.useEffect(e,t)};j.useId=function(){return he.current.useId()};j.useImperativeHandle=function(e,t,n){return he.current.useImperativeHandle(e,t,n)};j.useInsertionEffect=function(e,t){return he.current.useInsertionEffect(e,t)};j.useLayoutEffect=function(e,t){return he.current.useLayoutEffect(e,t)};j.useMemo=function(e,t){return he.current.useMemo(e,t)};j.useReducer=function(e,t,n){return he.current.useReducer(e,t,n)};j.useRef=function(e){return he.current.useRef(e)};j.useState=function(e){return he.current.useState(e)};j.useSyncExternalStore=function(e,t,n){return he.current.useSyncExternalStore(e,t,n)};j.useTransition=function(){return he.current.useTransition()};j.version="18.3.1"});var Oe=st((Im,Ya)=>{"use strict";Ya.exports=Ga()});var ls=st(U=>{"use strict";function ml(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<jr(o,t))e[r]=t,e[n]=o,n=r;else break e}}function He(e){return e.length===0?null:e[0]}function Mr(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,l=o>>>1;r<l;){var i=2*(r+1)-1,a=e[i],s=i+1,u=e[s];if(0>jr(a,n))s<o&&0>jr(u,a)?(e[r]=u,e[s]=n,r=s):(e[r]=a,e[i]=n,r=i);else if(s<o&&0>jr(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function jr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Ka=performance,U.unstable_now=function(){return Ka.now()}):(dl=Date,Xa=dl.now(),U.unstable_now=function(){return dl.now()-Xa});var Ka,dl,Xa,et=[],wt=[],ff=1,Me=null,de=3,Ir=!1,Ht=!1,Fn=!1,es=typeof setTimeout=="function"?setTimeout:null,ts=typeof clearTimeout=="function"?clearTimeout:null,Za=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function vl(e){for(var t=He(wt);t!==null;){if(t.callback===null)Mr(wt);else if(t.startTime<=e)Mr(wt),t.sortIndex=t.expirationTime,ml(et,t);else break;t=He(wt)}}function gl(e){if(Fn=!1,vl(e),!Ht)if(He(et)!==null)Ht=!0,yl(hl);else{var t=He(wt);t!==null&&zl(gl,t.startTime-e)}}function hl(e,t){Ht=!1,Fn&&(Fn=!1,ts(Un),Un=-1),Ir=!0;var n=de;try{for(vl(t),Me=He(et);Me!==null&&(!(Me.expirationTime>t)||e&&!os());){var r=Me.callback;if(typeof r=="function"){Me.callback=null,de=Me.priorityLevel;var o=r(Me.expirationTime<=t);t=U.unstable_now(),typeof o=="function"?Me.callback=o:Me===He(et)&&Mr(et),vl(t)}else Mr(et);Me=He(et)}if(Me!==null)var l=!0;else{var i=He(wt);i!==null&&zl(gl,i.startTime-t),l=!1}return l}finally{Me=null,de=n,Ir=!1}}var Dr=!1,Or=null,Un=-1,ns=5,rs=-1;function os(){return!(U.unstable_now()-rs<ns)}function fl(){if(Or!==null){var e=U.unstable_now();rs=e;var t=!0;try{t=Or(!0,e)}finally{t?An():(Dr=!1,Or=null)}}else Dr=!1}var An;typeof Za=="function"?An=function(){Za(fl)}:typeof MessageChannel<"u"?(pl=new MessageChannel,Ja=pl.port2,pl.port1.onmessage=fl,An=function(){Ja.postMessage(null)}):An=function(){es(fl,0)};var pl,Ja;function yl(e){Or=e,Dr||(Dr=!0,An())}function zl(e,t){Un=es(function(){e(U.unstable_now())},t)}U.unstable_IdlePriority=5;U.unstable_ImmediatePriority=1;U.unstable_LowPriority=4;U.unstable_NormalPriority=3;U.unstable_Profiling=null;U.unstable_UserBlockingPriority=2;U.unstable_cancelCallback=function(e){e.callback=null};U.unstable_continueExecution=function(){Ht||Ir||(Ht=!0,yl(hl))};U.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ns=0<e?Math.floor(1e3/e):5};U.unstable_getCurrentPriorityLevel=function(){return de};U.unstable_getFirstCallbackNode=function(){return He(et)};U.unstable_next=function(e){switch(de){case 1:case 2:case 3:var t=3;break;default:t=de}var n=de;de=t;try{return e()}finally{de=n}};U.unstable_pauseExecution=function(){};U.unstable_requestPaint=function(){};U.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=de;de=e;try{return t()}finally{de=n}};U.unstable_scheduleCallback=function(e,t,n){var r=U.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:ff++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,ml(wt,e),He(et)===null&&e===He(wt)&&(Fn?(ts(Un),Un=-1):Fn=!0,zl(gl,n-r))):(e.sortIndex=o,ml(et,e),Ht||Ir||(Ht=!0,yl(hl))),e};U.unstable_shouldYield=os;U.unstable_wrapCallback=function(e){var t=de;return function(){var n=de;de=t;try{return e.apply(this,arguments)}finally{de=n}}}});var as=st((Am,is)=>{"use strict";is.exports=ls()});var dd=st(be=>{"use strict";var pf=Oe(),Le=as();function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mu=new Set,ur={};function rn(e,t){En(e,t),En(e+"Capture",t)}function En(e,t){for(ur[e]=t,e=0;e<t.length;e++)mu.add(t[e])}var mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$l=Object.prototype.hasOwnProperty,mf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ss={},us={};function vf(e){return $l.call(us,e)?!0:$l.call(ss,e)?!1:mf.test(e)?us[e]=!0:(ss[e]=!0,!1)}function gf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function hf(e,t,n,r){if(t===null||typeof t>"u"||gf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function we(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var ce={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ce[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ce[t]=new we(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ce[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ce[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ce[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ce[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ce[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ce[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ce[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var ji=/[\-:]([a-z])/g;function Oi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ji,Oi);ce[t]=new we(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ji,Oi);ce[t]=new we(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ji,Oi);ce[t]=new we(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ce[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});ce.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ce[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function Mi(e,t,n,r){var o=ce.hasOwnProperty(t)?ce[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(hf(t,n,o,r)&&(n=null),r||o===null?vf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var yt=pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ar=Symbol.for("react.element"),un=Symbol.for("react.portal"),cn=Symbol.for("react.fragment"),Ii=Symbol.for("react.strict_mode"),Bl=Symbol.for("react.profiler"),vu=Symbol.for("react.provider"),gu=Symbol.for("react.context"),Di=Symbol.for("react.forward_ref"),Hl=Symbol.for("react.suspense"),Vl=Symbol.for("react.suspense_list"),Ai=Symbol.for("react.memo"),xt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var hu=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var cs=Symbol.iterator;function $n(e){return e===null||typeof e!="object"?null:(e=cs&&e[cs]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,wl;function Kn(e){if(wl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);wl=t&&t[1]||""}return`
`+wl+e}var ql=!1;function xl(e,t){if(!e||ql)return"";ql=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,a=l.length-1;1<=i&&0<=a&&o[i]!==l[a];)a--;for(;1<=i&&0<=a;i--,a--)if(o[i]!==l[a]){if(i!==1||a!==1)do if(i--,a--,0>a||o[i]!==l[a]){var s=`
`+o[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{ql=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Kn(e):""}function yf(e){switch(e.tag){case 5:return Kn(e.type);case 16:return Kn("Lazy");case 13:return Kn("Suspense");case 19:return Kn("SuspenseList");case 0:case 2:case 15:return e=xl(e.type,!1),e;case 11:return e=xl(e.type.render,!1),e;case 1:return e=xl(e.type,!0),e;default:return""}}function Wl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case cn:return"Fragment";case un:return"Portal";case Bl:return"Profiler";case Ii:return"StrictMode";case Hl:return"Suspense";case Vl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case gu:return(e.displayName||"Context")+".Consumer";case vu:return(e._context.displayName||"Context")+".Provider";case Di:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ai:return t=e.displayName||null,t!==null?t:Wl(e.type)||"Memo";case xt:t=e._payload,e=e._init;try{return Wl(e(t))}catch{}}return null}function zf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Wl(t);case 8:return t===Ii?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Mt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function wf(e){var t=yu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Fr(e){e._valueTracker||(e._valueTracker=wf(e))}function zu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=yu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function vo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ql(e,t){var n=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ds(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Mt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function wu(e,t){t=t.checked,t!=null&&Mi(e,"checked",t,!1)}function Gl(e,t){wu(e,t);var n=Mt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Yl(e,t.type,n):t.hasOwnProperty("defaultValue")&&Yl(e,t.type,Mt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function fs(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Yl(e,t,n){(t!=="number"||vo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Xn=Array.isArray;function qn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Mt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Kl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(y(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ps(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(y(92));if(Xn(n)){if(1<n.length)throw Error(y(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Mt(n)}}function qu(e,t){var n=Mt(t.value),r=Mt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ms(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function xu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?xu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ur,ku=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ur=Ur||document.createElement("div"),Ur.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ur.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function cr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var er={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qf=["Webkit","ms","Moz","O"];Object.keys(er).forEach(function(e){qf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),er[t]=er[e]})});function Su(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||er.hasOwnProperty(e)&&er[e]?(""+t).trim():t+"px"}function _u(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Su(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var xf=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Zl(e,t){if(t){if(xf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(y(62))}}function Jl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ei=null;function Fi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ti=null,xn=null,kn=null;function vs(e){if(e=Cr(e)){if(typeof ti!="function")throw Error(y(280));var t=e.stateNode;t&&(t=Bo(t),ti(e.stateNode,e.type,t))}}function Nu(e){xn?kn?kn.push(e):kn=[e]:xn=e}function Eu(){if(xn){var e=xn,t=kn;if(kn=xn=null,vs(e),t)for(e=0;e<t.length;e++)vs(t[e])}}function Cu(e,t){return e(t)}function Pu(){}var kl=!1;function Tu(e,t,n){if(kl)return e(t,n);kl=!0;try{return Cu(e,t,n)}finally{kl=!1,(xn!==null||kn!==null)&&(Pu(),Eu())}}function dr(e,t){var n=e.stateNode;if(n===null)return null;var r=Bo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(y(231,t,typeof n));return n}var ni=!1;if(mt)try{an={},Object.defineProperty(an,"passive",{get:function(){ni=!0}}),window.addEventListener("test",an,an),window.removeEventListener("test",an,an)}catch{ni=!1}var an;function kf(e,t,n,r,o,l,i,a,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var tr=!1,go=null,ho=!1,ri=null,Sf={onError:function(e){tr=!0,go=e}};function _f(e,t,n,r,o,l,i,a,s){tr=!1,go=null,kf.apply(Sf,arguments)}function Nf(e,t,n,r,o,l,i,a,s){if(_f.apply(this,arguments),tr){if(tr){var u=go;tr=!1,go=null}else throw Error(y(198));ho||(ho=!0,ri=u)}}function on(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Lu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function gs(e){if(on(e)!==e)throw Error(y(188))}function Ef(e){var t=e.alternate;if(!t){if(t=on(e),t===null)throw Error(y(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return gs(o),e;if(l===r)return gs(o),t;l=l.sibling}throw Error(y(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,a=o.child;a;){if(a===n){i=!0,n=o,r=l;break}if(a===r){i=!0,r=o,n=l;break}a=a.sibling}if(!i){for(a=l.child;a;){if(a===n){i=!0,n=l,r=o;break}if(a===r){i=!0,r=l,n=o;break}a=a.sibling}if(!i)throw Error(y(189))}}if(n.alternate!==r)throw Error(y(190))}if(n.tag!==3)throw Error(y(188));return n.stateNode.current===n?e:t}function Ru(e){return e=Ef(e),e!==null?bu(e):null}function bu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=bu(e);if(t!==null)return t;e=e.sibling}return null}var ju=Le.unstable_scheduleCallback,hs=Le.unstable_cancelCallback,Cf=Le.unstable_shouldYield,Pf=Le.unstable_requestPaint,J=Le.unstable_now,Tf=Le.unstable_getCurrentPriorityLevel,Ui=Le.unstable_ImmediatePriority,Ou=Le.unstable_UserBlockingPriority,yo=Le.unstable_NormalPriority,Lf=Le.unstable_LowPriority,Mu=Le.unstable_IdlePriority,Ao=null,ot=null;function Rf(e){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Ao,e,void 0,(e.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:Of,bf=Math.log,jf=Math.LN2;function Of(e){return e>>>=0,e===0?32:31-(bf(e)/jf|0)|0}var $r=64,Br=4194304;function Zn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function zo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var a=i&~o;a!==0?r=Zn(a):(l&=i,l!==0&&(r=Zn(l)))}else i=n&~o,i!==0?r=Zn(i):l!==0&&(r=Zn(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ye(t),o=1<<n,r|=e[n],t&=~o;return r}function Mf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function If(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-Ye(l),a=1<<i,s=o[i];s===-1?(!(a&n)||a&r)&&(o[i]=Mf(a,t)):s<=t&&(e.expiredLanes|=a),l&=~a}}function oi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Iu(){var e=$r;return $r<<=1,!($r&4194240)&&($r=64),e}function Sl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Nr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ye(t),e[t]=n}function Df(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Ye(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function $i(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ye(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var I=0;function Du(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Au,Bi,Fu,Uu,$u,li=!1,Hr=[],Ct=null,Pt=null,Tt=null,fr=new Map,pr=new Map,St=[],Af="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ys(e,t){switch(e){case"focusin":case"focusout":Ct=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":Tt=null;break;case"pointerover":case"pointerout":fr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pr.delete(t.pointerId)}}function Bn(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=Cr(t),t!==null&&Bi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Ff(e,t,n,r,o){switch(t){case"focusin":return Ct=Bn(Ct,e,t,n,r,o),!0;case"dragenter":return Pt=Bn(Pt,e,t,n,r,o),!0;case"mouseover":return Tt=Bn(Tt,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return fr.set(l,Bn(fr.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,pr.set(l,Bn(pr.get(l)||null,e,t,n,r,o)),!0}return!1}function Bu(e){var t=Qt(e.target);if(t!==null){var n=on(t);if(n!==null){if(t=n.tag,t===13){if(t=Lu(n),t!==null){e.blockedOn=t,$u(e.priority,function(){Fu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function oo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ii(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ei=r,n.target.dispatchEvent(r),ei=null}else return t=Cr(n),t!==null&&Bi(t),e.blockedOn=n,!1;t.shift()}return!0}function zs(e,t,n){oo(e)&&n.delete(t)}function Uf(){li=!1,Ct!==null&&oo(Ct)&&(Ct=null),Pt!==null&&oo(Pt)&&(Pt=null),Tt!==null&&oo(Tt)&&(Tt=null),fr.forEach(zs),pr.forEach(zs)}function Hn(e,t){e.blockedOn===t&&(e.blockedOn=null,li||(li=!0,Le.unstable_scheduleCallback(Le.unstable_NormalPriority,Uf)))}function mr(e){function t(o){return Hn(o,e)}if(0<Hr.length){Hn(Hr[0],e);for(var n=1;n<Hr.length;n++){var r=Hr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ct!==null&&Hn(Ct,e),Pt!==null&&Hn(Pt,e),Tt!==null&&Hn(Tt,e),fr.forEach(t),pr.forEach(t),n=0;n<St.length;n++)r=St[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<St.length&&(n=St[0],n.blockedOn===null);)Bu(n),n.blockedOn===null&&St.shift()}var Sn=yt.ReactCurrentBatchConfig,wo=!0;function $f(e,t,n,r){var o=I,l=Sn.transition;Sn.transition=null;try{I=1,Hi(e,t,n,r)}finally{I=o,Sn.transition=l}}function Bf(e,t,n,r){var o=I,l=Sn.transition;Sn.transition=null;try{I=4,Hi(e,t,n,r)}finally{I=o,Sn.transition=l}}function Hi(e,t,n,r){if(wo){var o=ii(e,t,n,r);if(o===null)Ll(e,t,r,qo,n),ys(e,r);else if(Ff(o,e,t,n,r))r.stopPropagation();else if(ys(e,r),t&4&&-1<Af.indexOf(e)){for(;o!==null;){var l=Cr(o);if(l!==null&&Au(l),l=ii(e,t,n,r),l===null&&Ll(e,t,r,qo,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else Ll(e,t,r,null,n)}}var qo=null;function ii(e,t,n,r){if(qo=null,e=Fi(r),e=Qt(e),e!==null)if(t=on(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Lu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return qo=e,null}function Hu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Tf()){case Ui:return 1;case Ou:return 4;case yo:case Lf:return 16;case Mu:return 536870912;default:return 16}default:return 16}}var Nt=null,Vi=null,lo=null;function Vu(){if(lo)return lo;var e,t=Vi,n=t.length,r,o="value"in Nt?Nt.value:Nt.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return lo=o.slice(e,1<r?1-r:void 0)}function io(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vr(){return!0}function ws(){return!1}function Re(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Vr:ws,this.isPropagationStopped=ws,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vr)},persist:function(){},isPersistent:Vr}),t}var jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wi=Re(jn),Er=K({},jn,{view:0,detail:0}),Hf=Re(Er),_l,Nl,Vn,Fo=K({},Er,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Vn&&(Vn&&e.type==="mousemove"?(_l=e.screenX-Vn.screenX,Nl=e.screenY-Vn.screenY):Nl=_l=0,Vn=e),_l)},movementY:function(e){return"movementY"in e?e.movementY:Nl}}),qs=Re(Fo),Vf=K({},Fo,{dataTransfer:0}),Wf=Re(Vf),Qf=K({},Er,{relatedTarget:0}),El=Re(Qf),Gf=K({},jn,{animationName:0,elapsedTime:0,pseudoElement:0}),Yf=Re(Gf),Kf=K({},jn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xf=Re(Kf),Zf=K({},jn,{data:0}),xs=Re(Zf),Jf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ep={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function np(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tp[e])?!!t[e]:!1}function Qi(){return np}var rp=K({},Er,{key:function(e){if(e.key){var t=Jf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=io(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ep[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qi,charCode:function(e){return e.type==="keypress"?io(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?io(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),op=Re(rp),lp=K({},Fo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ks=Re(lp),ip=K({},Er,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qi}),ap=Re(ip),sp=K({},jn,{propertyName:0,elapsedTime:0,pseudoElement:0}),up=Re(sp),cp=K({},Fo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),dp=Re(cp),fp=[9,13,27,32],Gi=mt&&"CompositionEvent"in window,nr=null;mt&&"documentMode"in document&&(nr=document.documentMode);var pp=mt&&"TextEvent"in window&&!nr,Wu=mt&&(!Gi||nr&&8<nr&&11>=nr),Ss=" ",_s=!1;function Qu(e,t){switch(e){case"keyup":return fp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var dn=!1;function mp(e,t){switch(e){case"compositionend":return Gu(t);case"keypress":return t.which!==32?null:(_s=!0,Ss);case"textInput":return e=t.data,e===Ss&&_s?null:e;default:return null}}function vp(e,t){if(dn)return e==="compositionend"||!Gi&&Qu(e,t)?(e=Vu(),lo=Vi=Nt=null,dn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Wu&&t.locale!=="ko"?null:t.data;default:return null}}var gp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ns(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gp[e.type]:t==="textarea"}function Yu(e,t,n,r){Nu(r),t=xo(t,"onChange"),0<t.length&&(n=new Wi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var rr=null,vr=null;function hp(e){ic(e,0)}function Uo(e){var t=mn(e);if(zu(t))return e}function yp(e,t){if(e==="change")return t}var Ku=!1;mt&&(mt?(Qr="oninput"in document,Qr||(Cl=document.createElement("div"),Cl.setAttribute("oninput","return;"),Qr=typeof Cl.oninput=="function"),Wr=Qr):Wr=!1,Ku=Wr&&(!document.documentMode||9<document.documentMode));var Wr,Qr,Cl;function Es(){rr&&(rr.detachEvent("onpropertychange",Xu),vr=rr=null)}function Xu(e){if(e.propertyName==="value"&&Uo(vr)){var t=[];Yu(t,vr,e,Fi(e)),Tu(hp,t)}}function zp(e,t,n){e==="focusin"?(Es(),rr=t,vr=n,rr.attachEvent("onpropertychange",Xu)):e==="focusout"&&Es()}function wp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Uo(vr)}function qp(e,t){if(e==="click")return Uo(t)}function xp(e,t){if(e==="input"||e==="change")return Uo(t)}function kp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xe=typeof Object.is=="function"?Object.is:kp;function gr(e,t){if(Xe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!$l.call(t,o)||!Xe(e[o],t[o]))return!1}return!0}function Cs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ps(e,t){var n=Cs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Cs(n)}}function Zu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Zu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ju(){for(var e=window,t=vo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=vo(e.document)}return t}function Yi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Sp(e){var t=Ju(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Zu(n.ownerDocument.documentElement,n)){if(r!==null&&Yi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Ps(n,l);var i=Ps(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var _p=mt&&"documentMode"in document&&11>=document.documentMode,fn=null,ai=null,or=null,si=!1;function Ts(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;si||fn==null||fn!==vo(r)||(r=fn,"selectionStart"in r&&Yi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),or&&gr(or,r)||(or=r,r=xo(ai,"onSelect"),0<r.length&&(t=new Wi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=fn)))}function Gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pn={animationend:Gr("Animation","AnimationEnd"),animationiteration:Gr("Animation","AnimationIteration"),animationstart:Gr("Animation","AnimationStart"),transitionend:Gr("Transition","TransitionEnd")},Pl={},ec={};mt&&(ec=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);function $o(e){if(Pl[e])return Pl[e];if(!pn[e])return e;var t=pn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ec)return Pl[e]=t[n];return e}var tc=$o("animationend"),nc=$o("animationiteration"),rc=$o("animationstart"),oc=$o("transitionend"),lc=new Map,Ls="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dt(e,t){lc.set(e,t),rn(t,[e])}for(Yr=0;Yr<Ls.length;Yr++)Kr=Ls[Yr],Rs=Kr.toLowerCase(),bs=Kr[0].toUpperCase()+Kr.slice(1),Dt(Rs,"on"+bs);var Kr,Rs,bs,Yr;Dt(tc,"onAnimationEnd");Dt(nc,"onAnimationIteration");Dt(rc,"onAnimationStart");Dt("dblclick","onDoubleClick");Dt("focusin","onFocus");Dt("focusout","onBlur");Dt(oc,"onTransitionEnd");En("onMouseEnter",["mouseout","mouseover"]);En("onMouseLeave",["mouseout","mouseover"]);En("onPointerEnter",["pointerout","pointerover"]);En("onPointerLeave",["pointerout","pointerover"]);rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));rn("onBeforeInput",["compositionend","keypress","textInput","paste"]);rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Np=new Set("cancel close invalid load scroll toggle".split(" ").concat(Jn));function js(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Nf(r,t,void 0,e),e.currentTarget=null}function ic(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,u=a.currentTarget;if(a=a.listener,s!==l&&o.isPropagationStopped())break e;js(o,a,u),l=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,u=a.currentTarget,a=a.listener,s!==l&&o.isPropagationStopped())break e;js(o,a,u),l=s}}}if(ho)throw e=ri,ho=!1,ri=null,e}function B(e,t){var n=t[pi];n===void 0&&(n=t[pi]=new Set);var r=e+"__bubble";n.has(r)||(ac(t,e,2,!1),n.add(r))}function Tl(e,t,n){var r=0;t&&(r|=4),ac(n,e,r,t)}var Xr="_reactListening"+Math.random().toString(36).slice(2);function hr(e){if(!e[Xr]){e[Xr]=!0,mu.forEach(function(n){n!=="selectionchange"&&(Np.has(n)||Tl(n,!1,e),Tl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Xr]||(t[Xr]=!0,Tl("selectionchange",!1,t))}}function ac(e,t,n,r){switch(Hu(t)){case 1:var o=$f;break;case 4:o=Bf;break;default:o=Hi}n=o.bind(null,t,n,e),o=void 0,!ni||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Ll(e,t,n,r,o){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;i=i.return}for(;a!==null;){if(i=Qt(a),i===null)return;if(s=i.tag,s===5||s===6){r=l=i;continue e}a=a.parentNode}}r=r.return}Tu(function(){var u=l,m=Fi(n),p=[];e:{var g=lc.get(e);if(g!==void 0){var h=Wi,x=e;switch(e){case"keypress":if(io(n)===0)break e;case"keydown":case"keyup":h=op;break;case"focusin":x="focus",h=El;break;case"focusout":x="blur",h=El;break;case"beforeblur":case"afterblur":h=El;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=qs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Wf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=ap;break;case tc:case nc:case rc:h=Yf;break;case oc:h=up;break;case"scroll":h=Hf;break;case"wheel":h=dp;break;case"copy":case"cut":case"paste":h=Xf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=ks}var k=(t&4)!==0,D=!k&&e==="scroll",d=k?g!==null?g+"Capture":null:g;k=[];for(var c=u,f;c!==null;){f=c;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,d!==null&&(v=dr(c,d),v!=null&&k.push(yr(c,v,f)))),D)break;c=c.return}0<k.length&&(g=new h(g,x,null,n,m),p.push({event:g,listeners:k}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",g&&n!==ei&&(x=n.relatedTarget||n.fromElement)&&(Qt(x)||x[vt]))break e;if((h||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,h?(x=n.relatedTarget||n.toElement,h=u,x=x?Qt(x):null,x!==null&&(D=on(x),x!==D||x.tag!==5&&x.tag!==6)&&(x=null)):(h=null,x=u),h!==x)){if(k=qs,v="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(k=ks,v="onPointerLeave",d="onPointerEnter",c="pointer"),D=h==null?g:mn(h),f=x==null?g:mn(x),g=new k(v,c+"leave",h,n,m),g.target=D,g.relatedTarget=f,v=null,Qt(m)===u&&(k=new k(d,c+"enter",x,n,m),k.target=f,k.relatedTarget=D,v=k),D=v,h&&x)t:{for(k=h,d=x,c=0,f=k;f;f=sn(f))c++;for(f=0,v=d;v;v=sn(v))f++;for(;0<c-f;)k=sn(k),c--;for(;0<f-c;)d=sn(d),f--;for(;c--;){if(k===d||d!==null&&k===d.alternate)break t;k=sn(k),d=sn(d)}k=null}else k=null;h!==null&&Os(p,g,h,k,!1),x!==null&&D!==null&&Os(p,D,x,k,!0)}}e:{if(g=u?mn(u):window,h=g.nodeName&&g.nodeName.toLowerCase(),h==="select"||h==="input"&&g.type==="file")var w=yp;else if(Ns(g))if(Ku)w=xp;else{w=wp;var S=zp}else(h=g.nodeName)&&h.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(w=qp);if(w&&(w=w(e,u))){Yu(p,w,n,m);break e}S&&S(e,g,u),e==="focusout"&&(S=g._wrapperState)&&S.controlled&&g.type==="number"&&Yl(g,"number",g.value)}switch(S=u?mn(u):window,e){case"focusin":(Ns(S)||S.contentEditable==="true")&&(fn=S,ai=u,or=null);break;case"focusout":or=ai=fn=null;break;case"mousedown":si=!0;break;case"contextmenu":case"mouseup":case"dragend":si=!1,Ts(p,n,m);break;case"selectionchange":if(_p)break;case"keydown":case"keyup":Ts(p,n,m)}var N;if(Gi)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else dn?Qu(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(Wu&&n.locale!=="ko"&&(dn||E!=="onCompositionStart"?E==="onCompositionEnd"&&dn&&(N=Vu()):(Nt=m,Vi="value"in Nt?Nt.value:Nt.textContent,dn=!0)),S=xo(u,E),0<S.length&&(E=new xs(E,e,null,n,m),p.push({event:E,listeners:S}),N?E.data=N:(N=Gu(n),N!==null&&(E.data=N)))),(N=pp?mp(e,n):vp(e,n))&&(u=xo(u,"onBeforeInput"),0<u.length&&(m=new xs("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:u}),m.data=N))}ic(p,t)})}function yr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function xo(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=dr(e,n),l!=null&&r.unshift(yr(e,l,o)),l=dr(e,t),l!=null&&r.push(yr(e,l,o))),e=e.return}return r}function sn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Os(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var a=n,s=a.alternate,u=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&u!==null&&(a=u,o?(s=dr(n,l),s!=null&&i.unshift(yr(n,s,a))):o||(s=dr(n,l),s!=null&&i.push(yr(n,s,a)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var Ep=/\r\n?/g,Cp=/\u0000|\uFFFD/g;function Ms(e){return(typeof e=="string"?e:""+e).replace(Ep,`
`).replace(Cp,"")}function Zr(e,t,n){if(t=Ms(t),Ms(e)!==t&&n)throw Error(y(425))}function ko(){}var ui=null,ci=null;function di(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fi=typeof setTimeout=="function"?setTimeout:void 0,Pp=typeof clearTimeout=="function"?clearTimeout:void 0,Is=typeof Promise=="function"?Promise:void 0,Tp=typeof queueMicrotask=="function"?queueMicrotask:typeof Is<"u"?function(e){return Is.resolve(null).then(e).catch(Lp)}:fi;function Lp(e){setTimeout(function(){throw e})}function Rl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),mr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);mr(t)}function Lt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ds(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var On=Math.random().toString(36).slice(2),rt="__reactFiber$"+On,zr="__reactProps$"+On,vt="__reactContainer$"+On,pi="__reactEvents$"+On,Rp="__reactListeners$"+On,bp="__reactHandles$"+On;function Qt(e){var t=e[rt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[rt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ds(e);e!==null;){if(n=e[rt])return n;e=Ds(e)}return t}e=n,n=e.parentNode}return null}function Cr(e){return e=e[rt]||e[vt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function mn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function Bo(e){return e[zr]||null}var mi=[],vn=-1;function At(e){return{current:e}}function H(e){0>vn||(e.current=mi[vn],mi[vn]=null,vn--)}function $(e,t){vn++,mi[vn]=e.current,e.current=t}var It={},ve=At(It),Se=At(!1),Zt=It;function Cn(e,t){var n=e.type.contextTypes;if(!n)return It;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function _e(e){return e=e.childContextTypes,e!=null}function So(){H(Se),H(ve)}function As(e,t,n){if(ve.current!==It)throw Error(y(168));$(ve,t),$(Se,n)}function sc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(y(108,zf(e)||"Unknown",o));return K({},n,r)}function _o(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||It,Zt=ve.current,$(ve,e),$(Se,Se.current),!0}function Fs(e,t,n){var r=e.stateNode;if(!r)throw Error(y(169));n?(e=sc(e,t,Zt),r.__reactInternalMemoizedMergedChildContext=e,H(Se),H(ve),$(ve,e)):H(Se),$(Se,n)}var ct=null,Ho=!1,bl=!1;function uc(e){ct===null?ct=[e]:ct.push(e)}function jp(e){Ho=!0,uc(e)}function Ft(){if(!bl&&ct!==null){bl=!0;var e=0,t=I;try{var n=ct;for(I=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ct=null,Ho=!1}catch(o){throw ct!==null&&(ct=ct.slice(e+1)),ju(Ui,Ft),o}finally{I=t,bl=!1}}return null}var gn=[],hn=0,No=null,Eo=0,Ie=[],De=0,Jt=null,dt=1,ft="";function Vt(e,t){gn[hn++]=Eo,gn[hn++]=No,No=e,Eo=t}function cc(e,t,n){Ie[De++]=dt,Ie[De++]=ft,Ie[De++]=Jt,Jt=e;var r=dt;e=ft;var o=32-Ye(r)-1;r&=~(1<<o),n+=1;var l=32-Ye(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,dt=1<<32-Ye(t)+o|n<<o|r,ft=l+e}else dt=1<<l|n<<o|r,ft=e}function Ki(e){e.return!==null&&(Vt(e,1),cc(e,1,0))}function Xi(e){for(;e===No;)No=gn[--hn],gn[hn]=null,Eo=gn[--hn],gn[hn]=null;for(;e===Jt;)Jt=Ie[--De],Ie[De]=null,ft=Ie[--De],Ie[De]=null,dt=Ie[--De],Ie[De]=null}var Te=null,Pe=null,V=!1,Ge=null;function dc(e,t){var n=Ae(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Us(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,Pe=Lt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,Pe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:dt,overflow:ft}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ae(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Te=e,Pe=null,!0):!1;default:return!1}}function vi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function gi(e){if(V){var t=Pe;if(t){var n=t;if(!Us(e,t)){if(vi(e))throw Error(y(418));t=Lt(n.nextSibling);var r=Te;t&&Us(e,t)?dc(r,n):(e.flags=e.flags&-4097|2,V=!1,Te=e)}}else{if(vi(e))throw Error(y(418));e.flags=e.flags&-4097|2,V=!1,Te=e}}}function $s(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function Jr(e){if(e!==Te)return!1;if(!V)return $s(e),V=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!di(e.type,e.memoizedProps)),t&&(t=Pe)){if(vi(e))throw fc(),Error(y(418));for(;t;)dc(e,t),t=Lt(t.nextSibling)}if($s(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Pe=Lt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Pe=null}}else Pe=Te?Lt(e.stateNode.nextSibling):null;return!0}function fc(){for(var e=Pe;e;)e=Lt(e.nextSibling)}function Pn(){Pe=Te=null,V=!1}function Zi(e){Ge===null?Ge=[e]:Ge.push(e)}var Op=yt.ReactCurrentBatchConfig;function Wn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(y(309));var r=n.stateNode}if(!r)throw Error(y(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var a=o.refs;i===null?delete a[l]:a[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(y(284));if(!n._owner)throw Error(y(290,e))}return e}function eo(e,t){throw e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Bs(e){var t=e._init;return t(e._payload)}function pc(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function o(d,c){return d=Ot(d,c),d.index=0,d.sibling=null,d}function l(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function i(d){return e&&d.alternate===null&&(d.flags|=2),d}function a(d,c,f,v){return c===null||c.tag!==6?(c=Fl(f,d.mode,v),c.return=d,c):(c=o(c,f),c.return=d,c)}function s(d,c,f,v){var w=f.type;return w===cn?m(d,c,f.props.children,v,f.key):c!==null&&(c.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===xt&&Bs(w)===c.type)?(v=o(c,f.props),v.ref=Wn(d,c,f),v.return=d,v):(v=mo(f.type,f.key,f.props,null,d.mode,v),v.ref=Wn(d,c,f),v.return=d,v)}function u(d,c,f,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Ul(f,d.mode,v),c.return=d,c):(c=o(c,f.children||[]),c.return=d,c)}function m(d,c,f,v,w){return c===null||c.tag!==7?(c=Xt(f,d.mode,v,w),c.return=d,c):(c=o(c,f),c.return=d,c)}function p(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Fl(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Ar:return f=mo(c.type,c.key,c.props,null,d.mode,f),f.ref=Wn(d,null,c),f.return=d,f;case un:return c=Ul(c,d.mode,f),c.return=d,c;case xt:var v=c._init;return p(d,v(c._payload),f)}if(Xn(c)||$n(c))return c=Xt(c,d.mode,f,null),c.return=d,c;eo(d,c)}return null}function g(d,c,f,v){var w=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return w!==null?null:a(d,c,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ar:return f.key===w?s(d,c,f,v):null;case un:return f.key===w?u(d,c,f,v):null;case xt:return w=f._init,g(d,c,w(f._payload),v)}if(Xn(f)||$n(f))return w!==null?null:m(d,c,f,v,null);eo(d,f)}return null}function h(d,c,f,v,w){if(typeof v=="string"&&v!==""||typeof v=="number")return d=d.get(f)||null,a(c,d,""+v,w);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ar:return d=d.get(v.key===null?f:v.key)||null,s(c,d,v,w);case un:return d=d.get(v.key===null?f:v.key)||null,u(c,d,v,w);case xt:var S=v._init;return h(d,c,f,S(v._payload),w)}if(Xn(v)||$n(v))return d=d.get(f)||null,m(c,d,v,w,null);eo(c,v)}return null}function x(d,c,f,v){for(var w=null,S=null,N=c,E=c=0,X=null;N!==null&&E<f.length;E++){N.index>E?(X=N,N=null):X=N.sibling;var P=g(d,N,f[E],v);if(P===null){N===null&&(N=X);break}e&&N&&P.alternate===null&&t(d,N),c=l(P,c,E),S===null?w=P:S.sibling=P,S=P,N=X}if(E===f.length)return n(d,N),V&&Vt(d,E),w;if(N===null){for(;E<f.length;E++)N=p(d,f[E],v),N!==null&&(c=l(N,c,E),S===null?w=N:S.sibling=N,S=N);return V&&Vt(d,E),w}for(N=r(d,N);E<f.length;E++)X=h(N,d,E,f[E],v),X!==null&&(e&&X.alternate!==null&&N.delete(X.key===null?E:X.key),c=l(X,c,E),S===null?w=X:S.sibling=X,S=X);return e&&N.forEach(function(Q){return t(d,Q)}),V&&Vt(d,E),w}function k(d,c,f,v){var w=$n(f);if(typeof w!="function")throw Error(y(150));if(f=w.call(f),f==null)throw Error(y(151));for(var S=w=null,N=c,E=c=0,X=null,P=f.next();N!==null&&!P.done;E++,P=f.next()){N.index>E?(X=N,N=null):X=N.sibling;var Q=g(d,N,P.value,v);if(Q===null){N===null&&(N=X);break}e&&N&&Q.alternate===null&&t(d,N),c=l(Q,c,E),S===null?w=Q:S.sibling=Q,S=Q,N=X}if(P.done)return n(d,N),V&&Vt(d,E),w;if(N===null){for(;!P.done;E++,P=f.next())P=p(d,P.value,v),P!==null&&(c=l(P,c,E),S===null?w=P:S.sibling=P,S=P);return V&&Vt(d,E),w}for(N=r(d,N);!P.done;E++,P=f.next())P=h(N,d,E,P.value,v),P!==null&&(e&&P.alternate!==null&&N.delete(P.key===null?E:P.key),c=l(P,c,E),S===null?w=P:S.sibling=P,S=P);return e&&N.forEach(function(Ze){return t(d,Ze)}),V&&Vt(d,E),w}function D(d,c,f,v){if(typeof f=="object"&&f!==null&&f.type===cn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Ar:e:{for(var w=f.key,S=c;S!==null;){if(S.key===w){if(w=f.type,w===cn){if(S.tag===7){n(d,S.sibling),c=o(S,f.props.children),c.return=d,d=c;break e}}else if(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===xt&&Bs(w)===S.type){n(d,S.sibling),c=o(S,f.props),c.ref=Wn(d,S,f),c.return=d,d=c;break e}n(d,S);break}else t(d,S);S=S.sibling}f.type===cn?(c=Xt(f.props.children,d.mode,v,f.key),c.return=d,d=c):(v=mo(f.type,f.key,f.props,null,d.mode,v),v.ref=Wn(d,c,f),v.return=d,d=v)}return i(d);case un:e:{for(S=f.key;c!==null;){if(c.key===S)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=o(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=Ul(f,d.mode,v),c.return=d,d=c}return i(d);case xt:return S=f._init,D(d,c,S(f._payload),v)}if(Xn(f))return x(d,c,f,v);if($n(f))return k(d,c,f,v);eo(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=o(c,f),c.return=d,d=c):(n(d,c),c=Fl(f,d.mode,v),c.return=d,d=c),i(d)):n(d,c)}return D}var Tn=pc(!0),mc=pc(!1),Co=At(null),Po=null,yn=null,Ji=null;function ea(){Ji=yn=Po=null}function ta(e){var t=Co.current;H(Co),e._currentValue=t}function hi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function _n(e,t){Po=e,Ji=yn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ke=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(Ji!==e)if(e={context:e,memoizedValue:t,next:null},yn===null){if(Po===null)throw Error(y(308));yn=e,Po.dependencies={lanes:0,firstContext:e}}else yn=yn.next=e;return t}var Gt=null;function na(e){Gt===null?Gt=[e]:Gt.push(e)}function vc(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,na(t)):(n.next=o.next,o.next=n),t.interleaved=n,gt(e,r)}function gt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var kt=!1;function ra(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function gc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Rt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,M&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,gt(e,n)}return o=r.interleaved,o===null?(t.next=t,na(r)):(t.next=o.next,o.next=t),r.interleaved=t,gt(e,n)}function ao(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$i(e,n)}}function Hs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function To(e,t,n,r){var o=e.updateQueue;kt=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var s=a,u=s.next;s.next=null,i===null?l=u:i.next=u,i=s;var m=e.alternate;m!==null&&(m=m.updateQueue,a=m.lastBaseUpdate,a!==i&&(a===null?m.firstBaseUpdate=u:a.next=u,m.lastBaseUpdate=s))}if(l!==null){var p=o.baseState;i=0,m=u=s=null,a=l;do{var g=a.lane,h=a.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:h,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=e,k=a;switch(g=t,h=n,k.tag){case 1:if(x=k.payload,typeof x=="function"){p=x.call(h,p,g);break e}p=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=k.payload,g=typeof x=="function"?x.call(h,p,g):x,g==null)break e;p=K({},p,g);break e;case 2:kt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[a]:g.push(a))}else h={eventTime:h,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},m===null?(u=m=h,s=p):m=m.next=h,i|=g;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;g=a,a=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(m===null&&(s=p),o.baseState=s,o.firstBaseUpdate=u,o.lastBaseUpdate=m,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);tn|=i,e.lanes=i,e.memoizedState=p}}function Vs(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(y(191,o));o.call(r)}}}var Pr={},lt=At(Pr),wr=At(Pr),qr=At(Pr);function Yt(e){if(e===Pr)throw Error(y(174));return e}function oa(e,t){switch($(qr,t),$(wr,e),$(lt,Pr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Xl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Xl(t,e)}H(lt),$(lt,t)}function Ln(){H(lt),H(wr),H(qr)}function hc(e){Yt(qr.current);var t=Yt(lt.current),n=Xl(t,e.type);t!==n&&($(wr,e),$(lt,n))}function la(e){wr.current===e&&(H(lt),H(wr))}var G=At(0);function Lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var jl=[];function ia(){for(var e=0;e<jl.length;e++)jl[e]._workInProgressVersionPrimary=null;jl.length=0}var so=yt.ReactCurrentDispatcher,Ol=yt.ReactCurrentBatchConfig,en=0,Y=null,re=null,ie=null,Ro=!1,lr=!1,xr=0,Mp=0;function fe(){throw Error(y(321))}function aa(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xe(e[n],t[n]))return!1;return!0}function sa(e,t,n,r,o,l){if(en=l,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,so.current=e===null||e.memoizedState===null?Fp:Up,e=n(r,o),lr){l=0;do{if(lr=!1,xr=0,25<=l)throw Error(y(301));l+=1,ie=re=null,t.updateQueue=null,so.current=$p,e=n(r,o)}while(lr)}if(so.current=bo,t=re!==null&&re.next!==null,en=0,ie=re=Y=null,Ro=!1,t)throw Error(y(300));return e}function ua(){var e=xr!==0;return xr=0,e}function nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ie===null?Y.memoizedState=ie=e:ie=ie.next=e,ie}function $e(){if(re===null){var e=Y.alternate;e=e!==null?e.memoizedState:null}else e=re.next;var t=ie===null?Y.memoizedState:ie.next;if(t!==null)ie=t,re=e;else{if(e===null)throw Error(y(310));re=e,e={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},ie===null?Y.memoizedState=ie=e:ie=ie.next=e}return ie}function kr(e,t){return typeof t=="function"?t(e):t}function Ml(e){var t=$e(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=re,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var a=i=null,s=null,u=l;do{var m=u.lane;if((en&m)===m)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var p={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(a=s=p,i=r):s=s.next=p,Y.lanes|=m,tn|=m}u=u.next}while(u!==null&&u!==l);s===null?i=r:s.next=a,Xe(r,t.memoizedState)||(ke=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,Y.lanes|=l,tn|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Il(e){var t=$e(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);Xe(l,t.memoizedState)||(ke=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function yc(){}function zc(e,t){var n=Y,r=$e(),o=t(),l=!Xe(r.memoizedState,o);if(l&&(r.memoizedState=o,ke=!0),r=r.queue,ca(xc.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||ie!==null&&ie.memoizedState.tag&1){if(n.flags|=2048,Sr(9,qc.bind(null,n,r,o,t),void 0,null),ae===null)throw Error(y(349));en&30||wc(n,t,o)}return o}function wc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Y.updateQueue,t===null?(t={lastEffect:null,stores:null},Y.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function qc(e,t,n,r){t.value=n,t.getSnapshot=r,kc(t)&&Sc(e)}function xc(e,t,n){return n(function(){kc(t)&&Sc(e)})}function kc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xe(e,n)}catch{return!0}}function Sc(e){var t=gt(e,1);t!==null&&Ke(t,e,1,-1)}function Ws(e){var t=nt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:kr,lastRenderedState:e},t.queue=e,e=e.dispatch=Ap.bind(null,Y,e),[t.memoizedState,e]}function Sr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Y.updateQueue,t===null?(t={lastEffect:null,stores:null},Y.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function _c(){return $e().memoizedState}function uo(e,t,n,r){var o=nt();Y.flags|=e,o.memoizedState=Sr(1|t,n,void 0,r===void 0?null:r)}function Vo(e,t,n,r){var o=$e();r=r===void 0?null:r;var l=void 0;if(re!==null){var i=re.memoizedState;if(l=i.destroy,r!==null&&aa(r,i.deps)){o.memoizedState=Sr(t,n,l,r);return}}Y.flags|=e,o.memoizedState=Sr(1|t,n,l,r)}function Qs(e,t){return uo(8390656,8,e,t)}function ca(e,t){return Vo(2048,8,e,t)}function Nc(e,t){return Vo(4,2,e,t)}function Ec(e,t){return Vo(4,4,e,t)}function Cc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Pc(e,t,n){return n=n!=null?n.concat([e]):null,Vo(4,4,Cc.bind(null,t,e),n)}function da(){}function Tc(e,t){var n=$e();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&aa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Lc(e,t){var n=$e();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&aa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Rc(e,t,n){return en&21?(Xe(n,t)||(n=Iu(),Y.lanes|=n,tn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ke=!0),e.memoizedState=n)}function Ip(e,t){var n=I;I=n!==0&&4>n?n:4,e(!0);var r=Ol.transition;Ol.transition={};try{e(!1),t()}finally{I=n,Ol.transition=r}}function bc(){return $e().memoizedState}function Dp(e,t,n){var r=jt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},jc(e))Oc(t,n);else if(n=vc(e,t,n,r),n!==null){var o=ze();Ke(n,e,r,o),Mc(n,t,r)}}function Ap(e,t,n){var r=jt(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(jc(e))Oc(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,a=l(i,n);if(o.hasEagerState=!0,o.eagerState=a,Xe(a,i)){var s=t.interleaved;s===null?(o.next=o,na(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=vc(e,t,o,r),n!==null&&(o=ze(),Ke(n,e,r,o),Mc(n,t,r))}}function jc(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function Oc(e,t){lr=Ro=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Mc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$i(e,n)}}var bo={readContext:Ue,useCallback:fe,useContext:fe,useEffect:fe,useImperativeHandle:fe,useInsertionEffect:fe,useLayoutEffect:fe,useMemo:fe,useReducer:fe,useRef:fe,useState:fe,useDebugValue:fe,useDeferredValue:fe,useTransition:fe,useMutableSource:fe,useSyncExternalStore:fe,useId:fe,unstable_isNewReconciler:!1},Fp={readContext:Ue,useCallback:function(e,t){return nt().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:Qs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,uo(4194308,4,Cc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return uo(4194308,4,e,t)},useInsertionEffect:function(e,t){return uo(4,2,e,t)},useMemo:function(e,t){var n=nt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=nt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Dp.bind(null,Y,e),[r.memoizedState,e]},useRef:function(e){var t=nt();return e={current:e},t.memoizedState=e},useState:Ws,useDebugValue:da,useDeferredValue:function(e){return nt().memoizedState=e},useTransition:function(){var e=Ws(!1),t=e[0];return e=Ip.bind(null,e[1]),nt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Y,o=nt();if(V){if(n===void 0)throw Error(y(407));n=n()}else{if(n=t(),ae===null)throw Error(y(349));en&30||wc(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,Qs(xc.bind(null,r,l,e),[e]),r.flags|=2048,Sr(9,qc.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=nt(),t=ae.identifierPrefix;if(V){var n=ft,r=dt;n=(r&~(1<<32-Ye(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=xr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Mp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Up={readContext:Ue,useCallback:Tc,useContext:Ue,useEffect:ca,useImperativeHandle:Pc,useInsertionEffect:Nc,useLayoutEffect:Ec,useMemo:Lc,useReducer:Ml,useRef:_c,useState:function(){return Ml(kr)},useDebugValue:da,useDeferredValue:function(e){var t=$e();return Rc(t,re.memoizedState,e)},useTransition:function(){var e=Ml(kr)[0],t=$e().memoizedState;return[e,t]},useMutableSource:yc,useSyncExternalStore:zc,useId:bc,unstable_isNewReconciler:!1},$p={readContext:Ue,useCallback:Tc,useContext:Ue,useEffect:ca,useImperativeHandle:Pc,useInsertionEffect:Nc,useLayoutEffect:Ec,useMemo:Lc,useReducer:Il,useRef:_c,useState:function(){return Il(kr)},useDebugValue:da,useDeferredValue:function(e){var t=$e();return re===null?t.memoizedState=e:Rc(t,re.memoizedState,e)},useTransition:function(){var e=Il(kr)[0],t=$e().memoizedState;return[e,t]},useMutableSource:yc,useSyncExternalStore:zc,useId:bc,unstable_isNewReconciler:!1};function We(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function yi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:K({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Wo={isMounted:function(e){return(e=e._reactInternals)?on(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ze(),o=jt(e),l=pt(r,o);l.payload=t,n!=null&&(l.callback=n),t=Rt(e,l,o),t!==null&&(Ke(t,e,o,r),ao(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ze(),o=jt(e),l=pt(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Rt(e,l,o),t!==null&&(Ke(t,e,o,r),ao(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ze(),r=jt(e),o=pt(n,r);o.tag=2,t!=null&&(o.callback=t),t=Rt(e,o,r),t!==null&&(Ke(t,e,r,n),ao(t,e,r))}};function Gs(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!gr(n,r)||!gr(o,l):!0}function Ic(e,t,n){var r=!1,o=It,l=t.contextType;return typeof l=="object"&&l!==null?l=Ue(l):(o=_e(t)?Zt:ve.current,r=t.contextTypes,l=(r=r!=null)?Cn(e,o):It),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Wo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Ys(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Wo.enqueueReplaceState(t,t.state,null)}function zi(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},ra(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Ue(l):(l=_e(t)?Zt:ve.current,o.context=Cn(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(yi(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Wo.enqueueReplaceState(o,o.state,null),To(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Rn(e,t){try{var n="",r=t;do n+=yf(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Dl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function wi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Bp=typeof WeakMap=="function"?WeakMap:Map;function Dc(e,t,n){n=pt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Oo||(Oo=!0,Ti=r),wi(e,t)},n}function Ac(e,t,n){n=pt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){wi(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){wi(e,t),typeof r!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ks(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Bp;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=rm.bind(null,e,t,n),t.then(e,e))}function Xs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Zs(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=pt(-1,1),t.tag=2,Rt(n,t,1))),n.lanes|=1),e)}var Hp=yt.ReactCurrentOwner,ke=!1;function ye(e,t,n,r){t.child=e===null?mc(t,null,n,r):Tn(t,e.child,n,r)}function Js(e,t,n,r,o){n=n.render;var l=t.ref;return _n(t,o),r=sa(e,t,n,r,l,o),n=ua(),e!==null&&!ke?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ht(e,t,o)):(V&&n&&Ki(t),t.flags|=1,ye(e,t,r,o),t.child)}function eu(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!za(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Fc(e,t,l,r,o)):(e=mo(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&o)){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:gr,n(i,r)&&e.ref===t.ref)return ht(e,t,o)}return t.flags|=1,e=Ot(l,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(gr(l,r)&&e.ref===t.ref)if(ke=!1,t.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(ke=!0);else return t.lanes=e.lanes,ht(e,t,o)}return qi(e,t,n,r,o)}function Uc(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(wn,Ce),Ce|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,$(wn,Ce),Ce|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,$(wn,Ce),Ce|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,$(wn,Ce),Ce|=r;return ye(e,t,o,n),t.child}function $c(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function qi(e,t,n,r,o){var l=_e(n)?Zt:ve.current;return l=Cn(t,l),_n(t,o),n=sa(e,t,n,r,l,o),r=ua(),e!==null&&!ke?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ht(e,t,o)):(V&&r&&Ki(t),t.flags|=1,ye(e,t,n,o),t.child)}function tu(e,t,n,r,o){if(_e(n)){var l=!0;_o(t)}else l=!1;if(_n(t,o),t.stateNode===null)co(e,t),Ic(t,n,r),zi(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var s=i.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ue(u):(u=_e(n)?Zt:ve.current,u=Cn(t,u));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==u)&&Ys(t,i,r,u),kt=!1;var g=t.memoizedState;i.state=g,To(t,r,i,o),s=t.memoizedState,a!==r||g!==s||Se.current||kt?(typeof m=="function"&&(yi(t,n,m,r),s=t.memoizedState),(a=kt||Gs(t,n,a,r,g,s,u))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=u,r=a):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,gc(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:We(t.type,a),i.props=u,p=t.pendingProps,g=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Ue(s):(s=_e(n)?Zt:ve.current,s=Cn(t,s));var h=n.getDerivedStateFromProps;(m=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==p||g!==s)&&Ys(t,i,r,s),kt=!1,g=t.memoizedState,i.state=g,To(t,r,i,o);var x=t.memoizedState;a!==p||g!==x||Se.current||kt?(typeof h=="function"&&(yi(t,n,h,r),x=t.memoizedState),(u=kt||Gs(t,n,u,r,g,x,s)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,x,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,x,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),i.props=r,i.state=x,i.context=s,r=u):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return xi(e,t,n,r,l,o)}function xi(e,t,n,r,o,l){$c(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&Fs(t,n,!1),ht(e,t,l);r=t.stateNode,Hp.current=t;var a=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Tn(t,e.child,null,l),t.child=Tn(t,null,a,l)):ye(e,t,a,l),t.memoizedState=r.state,o&&Fs(t,n,!0),t.child}function Bc(e){var t=e.stateNode;t.pendingContext?As(e,t.pendingContext,t.pendingContext!==t.context):t.context&&As(e,t.context,!1),oa(e,t.containerInfo)}function nu(e,t,n,r,o){return Pn(),Zi(o),t.flags|=256,ye(e,t,n,r),t.child}var ki={dehydrated:null,treeContext:null,retryLane:0};function Si(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hc(e,t,n){var r=t.pendingProps,o=G.current,l=!1,i=(t.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),$(G,o&1),e===null)return gi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=i):l=Yo(i,r,0,null),e=Xt(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Si(n),t.memoizedState=ki,e):fa(t,i));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return Vp(e,t,i,r,a,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,a=o.sibling;var s={mode:"hidden",children:r.children};return!(i&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Ot(o,s),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?l=Ot(a,l):(l=Xt(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?Si(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=ki,r}return l=e.child,e=l.sibling,r=Ot(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function fa(e,t){return t=Yo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function to(e,t,n,r){return r!==null&&Zi(r),Tn(t,e.child,null,n),e=fa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vp(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Dl(Error(y(422))),to(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=Yo({mode:"visible",children:r.children},o,0,null),l=Xt(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Tn(t,e.child,null,i),t.child.memoizedState=Si(i),t.memoizedState=ki,l);if(!(t.mode&1))return to(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(y(419)),r=Dl(l,r,void 0),to(e,t,i,r)}if(a=(i&e.childLanes)!==0,ke||a){if(r=ae,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,gt(e,o),Ke(r,e,o,-1))}return ya(),r=Dl(Error(y(421))),to(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=om.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,Pe=Lt(o.nextSibling),Te=t,V=!0,Ge=null,e!==null&&(Ie[De++]=dt,Ie[De++]=ft,Ie[De++]=Jt,dt=e.id,ft=e.overflow,Jt=t),t=fa(t,r.children),t.flags|=4096,t)}function ru(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),hi(e.return,t,n)}function Al(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function Vc(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(ye(e,t,r.children,n),r=G.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ru(e,n,t);else if(e.tag===19)ru(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if($(G,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Lo(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Al(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Lo(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Al(t,!0,n,null,l);break;case"together":Al(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function co(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ht(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),tn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,n=Ot(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ot(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wp(e,t,n){switch(t.tag){case 3:Bc(t),Pn();break;case 5:hc(t);break;case 1:_e(t.type)&&_o(t);break;case 4:oa(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;$(Co,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?($(G,G.current&1),t.flags|=128,null):n&t.child.childLanes?Hc(e,t,n):($(G,G.current&1),e=ht(e,t,n),e!==null?e.sibling:null);$(G,G.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Vc(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),$(G,G.current),r)break;return null;case 22:case 23:return t.lanes=0,Uc(e,t,n)}return ht(e,t,n)}var Wc,_i,Qc,Gc;Wc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};_i=function(){};Qc=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Yt(lt.current);var l=null;switch(n){case"input":o=Ql(e,o),r=Ql(e,r),l=[];break;case"select":o=K({},o,{value:void 0}),r=K({},r,{value:void 0}),l=[];break;case"textarea":o=Kl(e,o),r=Kl(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ko)}Zl(n,r);var i;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var a=o[u];for(i in a)a.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ur.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(a=o?.[u],r.hasOwnProperty(u)&&s!==a&&(s!=null||a!=null))if(u==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(l||(l=[]),l.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ur.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&B("scroll",e),l||a===s||(l=[])):(l=l||[]).push(u,s))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Gc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Qn(e,t){if(!V)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Qp(e,t,n){var r=t.pendingProps;switch(Xi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return pe(t),null;case 1:return _e(t.type)&&So(),pe(t),null;case 3:return r=t.stateNode,Ln(),H(Se),H(ve),ia(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Jr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(bi(Ge),Ge=null))),_i(e,t),pe(t),null;case 5:la(t);var o=Yt(qr.current);if(n=t.type,e!==null&&t.stateNode!=null)Qc(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(y(166));return pe(t),null}if(e=Yt(lt.current),Jr(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[rt]=t,r[zr]=l,e=(t.mode&1)!==0,n){case"dialog":B("cancel",r),B("close",r);break;case"iframe":case"object":case"embed":B("load",r);break;case"video":case"audio":for(o=0;o<Jn.length;o++)B(Jn[o],r);break;case"source":B("error",r);break;case"img":case"image":case"link":B("error",r),B("load",r);break;case"details":B("toggle",r);break;case"input":ds(r,l),B("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},B("invalid",r);break;case"textarea":ps(r,l),B("invalid",r)}Zl(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var a=l[i];i==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&Zr(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&Zr(r.textContent,a,e),o=["children",""+a]):ur.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&B("scroll",r)}switch(n){case"input":Fr(r),fs(r,l,!0);break;case"textarea":Fr(r),ms(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=ko)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=xu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[rt]=t,e[zr]=r,Wc(e,t,!1,!1),t.stateNode=e;e:{switch(i=Jl(n,r),n){case"dialog":B("cancel",e),B("close",e),o=r;break;case"iframe":case"object":case"embed":B("load",e),o=r;break;case"video":case"audio":for(o=0;o<Jn.length;o++)B(Jn[o],e);o=r;break;case"source":B("error",e),o=r;break;case"img":case"image":case"link":B("error",e),B("load",e),o=r;break;case"details":B("toggle",e),o=r;break;case"input":ds(e,r),o=Ql(e,r),B("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=K({},r,{value:void 0}),B("invalid",e);break;case"textarea":ps(e,r),o=Kl(e,r),B("invalid",e);break;default:o=r}Zl(n,o),a=o;for(l in a)if(a.hasOwnProperty(l)){var s=a[l];l==="style"?_u(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ku(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&cr(e,s):typeof s=="number"&&cr(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(ur.hasOwnProperty(l)?s!=null&&l==="onScroll"&&B("scroll",e):s!=null&&Mi(e,l,s,i))}switch(n){case"input":Fr(e),fs(e,r,!1);break;case"textarea":Fr(e),ms(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Mt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?qn(e,!!r.multiple,l,!1):r.defaultValue!=null&&qn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=ko)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return pe(t),null;case 6:if(e&&t.stateNode!=null)Gc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(y(166));if(n=Yt(qr.current),Yt(lt.current),Jr(t)){if(r=t.stateNode,n=t.memoizedProps,r[rt]=t,(l=r.nodeValue!==n)&&(e=Te,e!==null))switch(e.tag){case 3:Zr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Zr(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[rt]=t,t.stateNode=r}return pe(t),null;case 13:if(H(G),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&Pe!==null&&t.mode&1&&!(t.flags&128))fc(),Pn(),t.flags|=98560,l=!1;else if(l=Jr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(y(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(y(317));l[rt]=t}else Pn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;pe(t),l=!1}else Ge!==null&&(bi(Ge),Ge=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||G.current&1?oe===0&&(oe=3):ya())),t.updateQueue!==null&&(t.flags|=4),pe(t),null);case 4:return Ln(),_i(e,t),e===null&&hr(t.stateNode.containerInfo),pe(t),null;case 10:return ta(t.type._context),pe(t),null;case 17:return _e(t.type)&&So(),pe(t),null;case 19:if(H(G),l=t.memoizedState,l===null)return pe(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)Qn(l,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Lo(e),i!==null){for(t.flags|=128,Qn(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return $(G,G.current&1|2),t.child}e=e.sibling}l.tail!==null&&J()>bn&&(t.flags|=128,r=!0,Qn(l,!1),t.lanes=4194304)}else{if(!r)if(e=Lo(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Qn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!V)return pe(t),null}else 2*J()-l.renderingStartTime>bn&&n!==1073741824&&(t.flags|=128,r=!0,Qn(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=J(),t.sibling=null,n=G.current,$(G,r?n&1|2:n&1),t):(pe(t),null);case 22:case 23:return ha(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ce&1073741824&&(pe(t),t.subtreeFlags&6&&(t.flags|=8192)):pe(t),null;case 24:return null;case 25:return null}throw Error(y(156,t.tag))}function Gp(e,t){switch(Xi(t),t.tag){case 1:return _e(t.type)&&So(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ln(),H(Se),H(ve),ia(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return la(t),null;case 13:if(H(G),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));Pn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(G),null;case 4:return Ln(),null;case 10:return ta(t.type._context),null;case 22:case 23:return ha(),null;case 24:return null;default:return null}}var no=!1,me=!1,Yp=typeof WeakSet=="function"?WeakSet:Set,_=null;function zn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Z(e,t,r)}else n.current=null}function Ni(e,t,n){try{n()}catch(r){Z(e,t,r)}}var ou=!1;function Kp(e,t){if(ui=wo,e=Ju(),Yi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,a=-1,s=-1,u=0,m=0,p=e,g=null;t:for(;;){for(var h;p!==n||o!==0&&p.nodeType!==3||(a=i+o),p!==l||r!==0&&p.nodeType!==3||(s=i+r),p.nodeType===3&&(i+=p.nodeValue.length),(h=p.firstChild)!==null;)g=p,p=h;for(;;){if(p===e)break t;if(g===n&&++u===o&&(a=i),g===l&&++m===r&&(s=i),(h=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=h}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ci={focusedElem:e,selectionRange:n},wo=!1,_=t;_!==null;)if(t=_,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,_=e;else for(;_!==null;){t=_;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var k=x.memoizedProps,D=x.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?k:We(t.type,k),D);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(v){Z(t,t.return,v)}if(e=t.sibling,e!==null){e.return=t.return,_=e;break}_=t.return}return x=ou,ou=!1,x}function ir(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&Ni(t,n,l)}o=o.next}while(o!==r)}}function Qo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ei(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Yc(e){var t=e.alternate;t!==null&&(e.alternate=null,Yc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[rt],delete t[zr],delete t[pi],delete t[Rp],delete t[bp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Kc(e){return e.tag===5||e.tag===3||e.tag===4}function lu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Kc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ci(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ko));else if(r!==4&&(e=e.child,e!==null))for(Ci(e,t,n),e=e.sibling;e!==null;)Ci(e,t,n),e=e.sibling}function Pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Pi(e,t,n),e=e.sibling;e!==null;)Pi(e,t,n),e=e.sibling}var se=null,Qe=!1;function qt(e,t,n){for(n=n.child;n!==null;)Xc(e,t,n),n=n.sibling}function Xc(e,t,n){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Ao,n)}catch{}switch(n.tag){case 5:me||zn(n,t);case 6:var r=se,o=Qe;se=null,qt(e,t,n),se=r,Qe=o,se!==null&&(Qe?(e=se,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):se.removeChild(n.stateNode));break;case 18:se!==null&&(Qe?(e=se,n=n.stateNode,e.nodeType===8?Rl(e.parentNode,n):e.nodeType===1&&Rl(e,n),mr(e)):Rl(se,n.stateNode));break;case 4:r=se,o=Qe,se=n.stateNode.containerInfo,Qe=!0,qt(e,t,n),se=r,Qe=o;break;case 0:case 11:case 14:case 15:if(!me&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&(l&2||l&4)&&Ni(n,t,i),o=o.next}while(o!==r)}qt(e,t,n);break;case 1:if(!me&&(zn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Z(n,t,a)}qt(e,t,n);break;case 21:qt(e,t,n);break;case 22:n.mode&1?(me=(r=me)||n.memoizedState!==null,qt(e,t,n),me=r):qt(e,t,n);break;default:qt(e,t,n)}}function iu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Yp),t.forEach(function(r){var o=lm.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,a=i;e:for(;a!==null;){switch(a.tag){case 5:se=a.stateNode,Qe=!1;break e;case 3:se=a.stateNode.containerInfo,Qe=!0;break e;case 4:se=a.stateNode.containerInfo,Qe=!0;break e}a=a.return}if(se===null)throw Error(y(160));Xc(l,i,o),se=null,Qe=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(u){Z(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Zc(t,e),t=t.sibling}function Zc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),tt(e),r&4){try{ir(3,e,e.return),Qo(3,e)}catch(k){Z(e,e.return,k)}try{ir(5,e,e.return)}catch(k){Z(e,e.return,k)}}break;case 1:Ve(t,e),tt(e),r&512&&n!==null&&zn(n,n.return);break;case 5:if(Ve(t,e),tt(e),r&512&&n!==null&&zn(n,n.return),e.flags&32){var o=e.stateNode;try{cr(o,"")}catch(k){Z(e,e.return,k)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&wu(o,l),Jl(a,i);var u=Jl(a,l);for(i=0;i<s.length;i+=2){var m=s[i],p=s[i+1];m==="style"?_u(o,p):m==="dangerouslySetInnerHTML"?ku(o,p):m==="children"?cr(o,p):Mi(o,m,p,u)}switch(a){case"input":Gl(o,l);break;case"textarea":qu(o,l);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var h=l.value;h!=null?qn(o,!!l.multiple,h,!1):g!==!!l.multiple&&(l.defaultValue!=null?qn(o,!!l.multiple,l.defaultValue,!0):qn(o,!!l.multiple,l.multiple?[]:"",!1))}o[zr]=l}catch(k){Z(e,e.return,k)}}break;case 6:if(Ve(t,e),tt(e),r&4){if(e.stateNode===null)throw Error(y(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(k){Z(e,e.return,k)}}break;case 3:if(Ve(t,e),tt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{mr(t.containerInfo)}catch(k){Z(e,e.return,k)}break;case 4:Ve(t,e),tt(e);break;case 13:Ve(t,e),tt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(va=J())),r&4&&iu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(me=(u=me)||m,Ve(t,e),me=u):Ve(t,e),tt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&e.mode&1)for(_=e,m=e.child;m!==null;){for(p=_=m;_!==null;){switch(g=_,h=g.child,g.tag){case 0:case 11:case 14:case 15:ir(4,g,g.return);break;case 1:zn(g,g.return);var x=g.stateNode;if(typeof x.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(k){Z(r,n,k)}}break;case 5:zn(g,g.return);break;case 22:if(g.memoizedState!==null){su(p);continue}}h!==null?(h.return=g,_=h):su(p)}m=m.sibling}e:for(m=null,p=e;;){if(p.tag===5){if(m===null){m=p;try{o=p.stateNode,u?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=p.stateNode,s=p.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=Su("display",i))}catch(k){Z(e,e.return,k)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(k){Z(e,e.return,k)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Ve(t,e),tt(e),r&4&&iu(e);break;case 21:break;default:Ve(t,e),tt(e)}}function tt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Kc(n)){var r=n;break e}n=n.return}throw Error(y(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(cr(o,""),r.flags&=-33);var l=lu(e);Pi(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,a=lu(e);Ci(e,a,i);break;default:throw Error(y(161))}}catch(s){Z(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xp(e,t,n){_=e,Jc(e,t,n)}function Jc(e,t,n){for(var r=(e.mode&1)!==0;_!==null;){var o=_,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||no;if(!i){var a=o.alternate,s=a!==null&&a.memoizedState!==null||me;a=no;var u=me;if(no=i,(me=s)&&!u)for(_=o;_!==null;)i=_,s=i.child,i.tag===22&&i.memoizedState!==null?uu(o):s!==null?(s.return=i,_=s):uu(o);for(;l!==null;)_=l,Jc(l,t,n),l=l.sibling;_=o,no=a,me=u}au(e,t,n)}else o.subtreeFlags&8772&&l!==null?(l.return=o,_=l):au(e,t,n)}}function au(e){for(;_!==null;){var t=_;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:me||Qo(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!me)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:We(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Vs(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Vs(t,i,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&mr(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}me||t.flags&512&&Ei(t)}catch(g){Z(t,t.return,g)}}if(t===e){_=null;break}if(n=t.sibling,n!==null){n.return=t.return,_=n;break}_=t.return}}function su(e){for(;_!==null;){var t=_;if(t===e){_=null;break}var n=t.sibling;if(n!==null){n.return=t.return,_=n;break}_=t.return}}function uu(e){for(;_!==null;){var t=_;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Qo(4,t)}catch(s){Z(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){Z(t,o,s)}}var l=t.return;try{Ei(t)}catch(s){Z(t,l,s)}break;case 5:var i=t.return;try{Ei(t)}catch(s){Z(t,i,s)}}}catch(s){Z(t,t.return,s)}if(t===e){_=null;break}var a=t.sibling;if(a!==null){a.return=t.return,_=a;break}_=t.return}}var Zp=Math.ceil,jo=yt.ReactCurrentDispatcher,pa=yt.ReactCurrentOwner,Fe=yt.ReactCurrentBatchConfig,M=0,ae=null,ne=null,ue=0,Ce=0,wn=At(0),oe=0,_r=null,tn=0,Go=0,ma=0,ar=null,xe=null,va=0,bn=1/0,ut=null,Oo=!1,Ti=null,bt=null,ro=!1,Et=null,Mo=0,sr=0,Li=null,fo=-1,po=0;function ze(){return M&6?J():fo!==-1?fo:fo=J()}function jt(e){return e.mode&1?M&2&&ue!==0?ue&-ue:Op.transition!==null?(po===0&&(po=Iu()),po):(e=I,e!==0||(e=window.event,e=e===void 0?16:Hu(e.type)),e):1}function Ke(e,t,n,r){if(50<sr)throw sr=0,Li=null,Error(y(185));Nr(e,n,r),(!(M&2)||e!==ae)&&(e===ae&&(!(M&2)&&(Go|=n),oe===4&&_t(e,ue)),Ne(e,r),n===1&&M===0&&!(t.mode&1)&&(bn=J()+500,Ho&&Ft()))}function Ne(e,t){var n=e.callbackNode;If(e,t);var r=zo(e,e===ae?ue:0);if(r===0)n!==null&&hs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&hs(n),t===1)e.tag===0?jp(cu.bind(null,e)):uc(cu.bind(null,e)),Tp(function(){!(M&6)&&Ft()}),n=null;else{switch(Du(r)){case 1:n=Ui;break;case 4:n=Ou;break;case 16:n=yo;break;case 536870912:n=Mu;break;default:n=yo}n=ad(n,ed.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ed(e,t){if(fo=-1,po=0,M&6)throw Error(y(327));var n=e.callbackNode;if(Nn()&&e.callbackNode!==n)return null;var r=zo(e,e===ae?ue:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Io(e,r);else{t=r;var o=M;M|=2;var l=nd();(ae!==e||ue!==t)&&(ut=null,bn=J()+500,Kt(e,t));do try{tm();break}catch(a){td(e,a)}while(!0);ea(),jo.current=l,M=o,ne!==null?t=0:(ae=null,ue=0,t=oe)}if(t!==0){if(t===2&&(o=oi(e),o!==0&&(r=o,t=Ri(e,o))),t===1)throw n=_r,Kt(e,0),_t(e,r),Ne(e,J()),n;if(t===6)_t(e,r);else{if(o=e.current.alternate,!(r&30)&&!Jp(o)&&(t=Io(e,r),t===2&&(l=oi(e),l!==0&&(r=l,t=Ri(e,l))),t===1))throw n=_r,Kt(e,0),_t(e,r),Ne(e,J()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(y(345));case 2:Wt(e,xe,ut);break;case 3:if(_t(e,r),(r&130023424)===r&&(t=va+500-J(),10<t)){if(zo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ze(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=fi(Wt.bind(null,e,xe,ut),t);break}Wt(e,xe,ut);break;case 4:if(_t(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-Ye(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=J()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Zp(r/1960))-r,10<r){e.timeoutHandle=fi(Wt.bind(null,e,xe,ut),r);break}Wt(e,xe,ut);break;case 5:Wt(e,xe,ut);break;default:throw Error(y(329))}}}return Ne(e,J()),e.callbackNode===n?ed.bind(null,e):null}function Ri(e,t){var n=ar;return e.current.memoizedState.isDehydrated&&(Kt(e,t).flags|=256),e=Io(e,t),e!==2&&(t=xe,xe=n,t!==null&&bi(t)),e}function bi(e){xe===null?xe=e:xe.push.apply(xe,e)}function Jp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!Xe(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _t(e,t){for(t&=~ma,t&=~Go,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ye(t),r=1<<n;e[n]=-1,t&=~r}}function cu(e){if(M&6)throw Error(y(327));Nn();var t=zo(e,0);if(!(t&1))return Ne(e,J()),null;var n=Io(e,t);if(e.tag!==0&&n===2){var r=oi(e);r!==0&&(t=r,n=Ri(e,r))}if(n===1)throw n=_r,Kt(e,0),_t(e,t),Ne(e,J()),n;if(n===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Wt(e,xe,ut),Ne(e,J()),null}function ga(e,t){var n=M;M|=1;try{return e(t)}finally{M=n,M===0&&(bn=J()+500,Ho&&Ft())}}function nn(e){Et!==null&&Et.tag===0&&!(M&6)&&Nn();var t=M;M|=1;var n=Fe.transition,r=I;try{if(Fe.transition=null,I=1,e)return e()}finally{I=r,Fe.transition=n,M=t,!(M&6)&&Ft()}}function ha(){Ce=wn.current,H(wn)}function Kt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Pp(n)),ne!==null)for(n=ne.return;n!==null;){var r=n;switch(Xi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&So();break;case 3:Ln(),H(Se),H(ve),ia();break;case 5:la(r);break;case 4:Ln();break;case 13:H(G);break;case 19:H(G);break;case 10:ta(r.type._context);break;case 22:case 23:ha()}n=n.return}if(ae=e,ne=e=Ot(e.current,null),ue=Ce=t,oe=0,_r=null,ma=Go=tn=0,xe=ar=null,Gt!==null){for(t=0;t<Gt.length;t++)if(n=Gt[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}Gt=null}return e}function td(e,t){do{var n=ne;try{if(ea(),so.current=bo,Ro){for(var r=Y.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Ro=!1}if(en=0,ie=re=Y=null,lr=!1,xr=0,pa.current=null,n===null||n.return===null){oe=1,_r=t,ne=null;break}e:{var l=e,i=n.return,a=n,s=t;if(t=ue,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,m=a,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var h=Xs(i);if(h!==null){h.flags&=-257,Zs(h,i,a,l,t),h.mode&1&&Ks(l,u,t),t=h,s=u;var x=t.updateQueue;if(x===null){var k=new Set;k.add(s),t.updateQueue=k}else x.add(s);break e}else{if(!(t&1)){Ks(l,u,t),ya();break e}s=Error(y(426))}}else if(V&&a.mode&1){var D=Xs(i);if(D!==null){!(D.flags&65536)&&(D.flags|=256),Zs(D,i,a,l,t),Zi(Rn(s,a));break e}}l=s=Rn(s,a),oe!==4&&(oe=2),ar===null?ar=[l]:ar.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var d=Dc(l,s,t);Hs(l,d);break e;case 1:a=s;var c=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(bt===null||!bt.has(f)))){l.flags|=65536,t&=-t,l.lanes|=t;var v=Ac(l,a,t);Hs(l,v);break e}}l=l.return}while(l!==null)}od(n)}catch(w){t=w,ne===n&&n!==null&&(ne=n=n.return);continue}break}while(!0)}function nd(){var e=jo.current;return jo.current=bo,e===null?bo:e}function ya(){(oe===0||oe===3||oe===2)&&(oe=4),ae===null||!(tn&268435455)&&!(Go&268435455)||_t(ae,ue)}function Io(e,t){var n=M;M|=2;var r=nd();(ae!==e||ue!==t)&&(ut=null,Kt(e,t));do try{em();break}catch(o){td(e,o)}while(!0);if(ea(),M=n,jo.current=r,ne!==null)throw Error(y(261));return ae=null,ue=0,oe}function em(){for(;ne!==null;)rd(ne)}function tm(){for(;ne!==null&&!Cf();)rd(ne)}function rd(e){var t=id(e.alternate,e,Ce);e.memoizedProps=e.pendingProps,t===null?od(e):ne=t,pa.current=null}function od(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Gp(n,t),n!==null){n.flags&=32767,ne=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,ne=null;return}}else if(n=Qp(n,t,Ce),n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);oe===0&&(oe=5)}function Wt(e,t,n){var r=I,o=Fe.transition;try{Fe.transition=null,I=1,nm(e,t,n,r)}finally{Fe.transition=o,I=r}return null}function nm(e,t,n,r){do Nn();while(Et!==null);if(M&6)throw Error(y(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(Df(e,l),e===ae&&(ne=ae=null,ue=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ro||(ro=!0,ad(yo,function(){return Nn(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Fe.transition,Fe.transition=null;var i=I;I=1;var a=M;M|=4,pa.current=null,Kp(e,n),Zc(n,e),Sp(ci),wo=!!ui,ci=ui=null,e.current=n,Xp(n,e,o),Pf(),M=a,I=i,Fe.transition=l}else e.current=n;if(ro&&(ro=!1,Et=e,Mo=o),l=e.pendingLanes,l===0&&(bt=null),Rf(n.stateNode,r),Ne(e,J()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Oo)throw Oo=!1,e=Ti,Ti=null,e;return Mo&1&&e.tag!==0&&Nn(),l=e.pendingLanes,l&1?e===Li?sr++:(sr=0,Li=e):sr=0,Ft(),null}function Nn(){if(Et!==null){var e=Du(Mo),t=Fe.transition,n=I;try{if(Fe.transition=null,I=16>e?16:e,Et===null)var r=!1;else{if(e=Et,Et=null,Mo=0,M&6)throw Error(y(331));var o=M;for(M|=4,_=e.current;_!==null;){var l=_,i=l.child;if(_.flags&16){var a=l.deletions;if(a!==null){for(var s=0;s<a.length;s++){var u=a[s];for(_=u;_!==null;){var m=_;switch(m.tag){case 0:case 11:case 15:ir(8,m,l)}var p=m.child;if(p!==null)p.return=m,_=p;else for(;_!==null;){m=_;var g=m.sibling,h=m.return;if(Yc(m),m===u){_=null;break}if(g!==null){g.return=h,_=g;break}_=h}}}var x=l.alternate;if(x!==null){var k=x.child;if(k!==null){x.child=null;do{var D=k.sibling;k.sibling=null,k=D}while(k!==null)}}_=l}}if(l.subtreeFlags&2064&&i!==null)i.return=l,_=i;else e:for(;_!==null;){if(l=_,l.flags&2048)switch(l.tag){case 0:case 11:case 15:ir(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,_=d;break e}_=l.return}}var c=e.current;for(_=c;_!==null;){i=_;var f=i.child;if(i.subtreeFlags&2064&&f!==null)f.return=i,_=f;else e:for(i=c;_!==null;){if(a=_,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Qo(9,a)}}catch(w){Z(a,a.return,w)}if(a===i){_=null;break e}var v=a.sibling;if(v!==null){v.return=a.return,_=v;break e}_=a.return}}if(M=o,Ft(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Ao,e)}catch{}r=!0}return r}finally{I=n,Fe.transition=t}}return!1}function du(e,t,n){t=Rn(n,t),t=Dc(e,t,1),e=Rt(e,t,1),t=ze(),e!==null&&(Nr(e,1,t),Ne(e,t))}function Z(e,t,n){if(e.tag===3)du(e,e,n);else for(;t!==null;){if(t.tag===3){du(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(bt===null||!bt.has(r))){e=Rn(n,e),e=Ac(t,e,1),t=Rt(t,e,1),e=ze(),t!==null&&(Nr(t,1,e),Ne(t,e));break}}t=t.return}}function rm(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ze(),e.pingedLanes|=e.suspendedLanes&n,ae===e&&(ue&n)===n&&(oe===4||oe===3&&(ue&130023424)===ue&&500>J()-va?Kt(e,0):ma|=n),Ne(e,t)}function ld(e,t){t===0&&(e.mode&1?(t=Br,Br<<=1,!(Br&130023424)&&(Br=4194304)):t=1);var n=ze();e=gt(e,t),e!==null&&(Nr(e,t,n),Ne(e,n))}function om(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ld(e,n)}function lm(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(t),ld(e,n)}var id;id=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Se.current)ke=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ke=!1,Wp(e,t,n);ke=!!(e.flags&131072)}else ke=!1,V&&t.flags&1048576&&cc(t,Eo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;co(e,t),e=t.pendingProps;var o=Cn(t,ve.current);_n(t,n),o=sa(null,t,r,e,o,n);var l=ua();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,_e(r)?(l=!0,_o(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,ra(t),o.updater=Wo,t.stateNode=o,o._reactInternals=t,zi(t,r,e,n),t=xi(null,t,r,!0,l,n)):(t.tag=0,V&&l&&Ki(t),ye(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(co(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=am(r),e=We(r,e),o){case 0:t=qi(null,t,r,e,n);break e;case 1:t=tu(null,t,r,e,n);break e;case 11:t=Js(null,t,r,e,n);break e;case 14:t=eu(null,t,r,We(r.type,e),n);break e}throw Error(y(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),qi(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),tu(e,t,r,o,n);case 3:e:{if(Bc(t),e===null)throw Error(y(387));r=t.pendingProps,l=t.memoizedState,o=l.element,gc(e,t),To(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=Rn(Error(y(423)),t),t=nu(e,t,r,n,o);break e}else if(r!==o){o=Rn(Error(y(424)),t),t=nu(e,t,r,n,o);break e}else for(Pe=Lt(t.stateNode.containerInfo.firstChild),Te=t,V=!0,Ge=null,n=mc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Pn(),r===o){t=ht(e,t,n);break e}ye(e,t,r,n)}t=t.child}return t;case 5:return hc(t),e===null&&gi(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,di(r,o)?i=null:l!==null&&di(r,l)&&(t.flags|=32),$c(e,t),ye(e,t,i,n),t.child;case 6:return e===null&&gi(t),null;case 13:return Hc(e,t,n);case 4:return oa(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Tn(t,null,r,n):ye(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),Js(e,t,r,o,n);case 7:return ye(e,t,t.pendingProps,n),t.child;case 8:return ye(e,t,t.pendingProps.children,n),t.child;case 12:return ye(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,$(Co,r._currentValue),r._currentValue=i,l!==null)if(Xe(l.value,i)){if(l.children===o.children&&!Se.current){t=ht(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var a=l.dependencies;if(a!==null){i=l.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=pt(-1,n&-n),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?s.next=s:(s.next=m.next,m.next=s),u.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),hi(l.return,n,t),a.lanes|=n;break}s=s.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(y(341));i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),hi(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}ye(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,_n(t,n),o=Ue(o),r=r(o),t.flags|=1,ye(e,t,r,n),t.child;case 14:return r=t.type,o=We(r,t.pendingProps),o=We(r.type,o),eu(e,t,r,o,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),co(e,t),t.tag=1,_e(r)?(e=!0,_o(t)):e=!1,_n(t,n),Ic(t,r,o),zi(t,r,o,n),xi(null,t,r,!0,e,n);case 19:return Vc(e,t,n);case 22:return Uc(e,t,n)}throw Error(y(156,t.tag))};function ad(e,t){return ju(e,t)}function im(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ae(e,t,n,r){return new im(e,t,n,r)}function za(e){return e=e.prototype,!(!e||!e.isReactComponent)}function am(e){if(typeof e=="function")return za(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Di)return 11;if(e===Ai)return 14}return 2}function Ot(e,t){var n=e.alternate;return n===null?(n=Ae(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function mo(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")za(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case cn:return Xt(n.children,o,l,t);case Ii:i=8,o|=8;break;case Bl:return e=Ae(12,n,t,o|2),e.elementType=Bl,e.lanes=l,e;case Hl:return e=Ae(13,n,t,o),e.elementType=Hl,e.lanes=l,e;case Vl:return e=Ae(19,n,t,o),e.elementType=Vl,e.lanes=l,e;case hu:return Yo(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case vu:i=10;break e;case gu:i=9;break e;case Di:i=11;break e;case Ai:i=14;break e;case xt:i=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return t=Ae(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function Xt(e,t,n,r){return e=Ae(7,e,r,t),e.lanes=n,e}function Yo(e,t,n,r){return e=Ae(22,e,r,t),e.elementType=hu,e.lanes=n,e.stateNode={isHidden:!1},e}function Fl(e,t,n){return e=Ae(6,e,null,t),e.lanes=n,e}function Ul(e,t,n){return t=Ae(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function sm(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sl(0),this.expirationTimes=Sl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sl(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function wa(e,t,n,r,o,l,i,a,s){return e=new sm(e,t,n,a,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Ae(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ra(l),e}function um(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:un,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function sd(e){if(!e)return It;e=e._reactInternals;e:{if(on(e)!==e||e.tag!==1)throw Error(y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(_e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(y(171))}if(e.tag===1){var n=e.type;if(_e(n))return sc(e,n,t)}return t}function ud(e,t,n,r,o,l,i,a,s){return e=wa(n,r,!0,e,o,l,i,a,s),e.context=sd(null),n=e.current,r=ze(),o=jt(n),l=pt(r,o),l.callback=t??null,Rt(n,l,o),e.current.lanes=o,Nr(e,o,r),Ne(e,r),e}function Ko(e,t,n,r){var o=t.current,l=ze(),i=jt(o);return n=sd(n),t.context===null?t.context=n:t.pendingContext=n,t=pt(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Rt(o,t,i),e!==null&&(Ke(e,o,i,l),ao(e,o,i)),i}function Do(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function fu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function qa(e,t){fu(e,t),(e=e.alternate)&&fu(e,t)}function cm(){return null}var cd=typeof reportError=="function"?reportError:function(e){console.error(e)};function xa(e){this._internalRoot=e}Xo.prototype.render=xa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));Ko(e,t,null,null)};Xo.prototype.unmount=xa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;nn(function(){Ko(null,e,null,null)}),t[vt]=null}};function Xo(e){this._internalRoot=e}Xo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Uu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<St.length&&t!==0&&t<St[n].priority;n++);St.splice(n,0,e),n===0&&Bu(e)}};function ka(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Zo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function pu(){}function dm(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var u=Do(i);l.call(u)}}var i=ud(t,r,e,0,null,!1,!1,"",pu);return e._reactRootContainer=i,e[vt]=i.current,hr(e.nodeType===8?e.parentNode:e),nn(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var u=Do(s);a.call(u)}}var s=wa(e,0,!1,null,null,!1,!1,"",pu);return e._reactRootContainer=s,e[vt]=s.current,hr(e.nodeType===8?e.parentNode:e),nn(function(){Ko(t,s,n,r)}),s}function Jo(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var a=o;o=function(){var s=Do(i);a.call(s)}}Ko(t,i,e,o)}else i=dm(n,t,e,o,r);return Do(i)}Au=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Zn(t.pendingLanes);n!==0&&($i(t,n|1),Ne(t,J()),!(M&6)&&(bn=J()+500,Ft()))}break;case 13:nn(function(){var r=gt(e,1);if(r!==null){var o=ze();Ke(r,e,1,o)}}),qa(e,1)}};Bi=function(e){if(e.tag===13){var t=gt(e,134217728);if(t!==null){var n=ze();Ke(t,e,134217728,n)}qa(e,134217728)}};Fu=function(e){if(e.tag===13){var t=jt(e),n=gt(e,t);if(n!==null){var r=ze();Ke(n,e,t,r)}qa(e,t)}};Uu=function(){return I};$u=function(e,t){var n=I;try{return I=e,t()}finally{I=n}};ti=function(e,t,n){switch(t){case"input":if(Gl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Bo(r);if(!o)throw Error(y(90));zu(r),Gl(r,o)}}}break;case"textarea":qu(e,n);break;case"select":t=n.value,t!=null&&qn(e,!!n.multiple,t,!1)}};Cu=ga;Pu=nn;var fm={usingClientEntryPoint:!1,Events:[Cr,mn,Bo,Nu,Eu,ga]},Gn={findFiberByHostInstance:Qt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pm={bundleType:Gn.bundleType,version:Gn.version,rendererPackageName:Gn.rendererPackageName,rendererConfig:Gn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ru(e),e===null?null:e.stateNode},findFiberByHostInstance:Gn.findFiberByHostInstance||cm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Yn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Yn.isDisabled&&Yn.supportsFiber))try{Ao=Yn.inject(pm),ot=Yn}catch{}var Yn;be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fm;be.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ka(t))throw Error(y(200));return um(e,t,null,n)};be.createRoot=function(e,t){if(!ka(e))throw Error(y(299));var n=!1,r="",o=cd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=wa(e,1,!1,null,null,n,!1,r,o),e[vt]=t.current,hr(e.nodeType===8?e.parentNode:e),new xa(t)};be.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=Ru(t),e=e===null?null:e.stateNode,e};be.flushSync=function(e){return nn(e)};be.hydrate=function(e,t,n){if(!Zo(t))throw Error(y(200));return Jo(null,e,t,!0,n)};be.hydrateRoot=function(e,t,n){if(!ka(e))throw Error(y(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=cd;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=ud(t,null,e,1,n??null,o,!1,l,i),e[vt]=t.current,hr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Xo(t)};be.render=function(e,t,n){if(!Zo(t))throw Error(y(200));return Jo(null,e,t,!1,n)};be.unmountComponentAtNode=function(e){if(!Zo(e))throw Error(y(40));return e._reactRootContainer?(nn(function(){Jo(null,null,e,!1,function(){e._reactRootContainer=null,e[vt]=null})}),!0):!1};be.unstable_batchedUpdates=ga;be.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Zo(n))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return Jo(e,t,n,!1,r)};be.version="18.3.1-next-f1338f8080-20240426"});var md=st((Um,pd)=>{"use strict";function fd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fd)}catch(e){console.error(e)}}fd(),pd.exports=dd()});var gd=st(Sa=>{"use strict";var vd=md();Sa.createRoot=vd.createRoot,Sa.hydrateRoot=vd.hydrateRoot;var $m});var zd=st(tl=>{"use strict";var gm=Oe(),hm=Symbol.for("react.element"),ym=Symbol.for("react.fragment"),zm=Object.prototype.hasOwnProperty,wm=gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,qm={key:!0,ref:!0,__self:!0,__source:!0};function yd(e,t,n){var r,o={},l=null,i=null;n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)zm.call(t,r)&&!qm.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:hm,type:e,key:l,ref:i,props:o,_owner:wm.current}}tl.Fragment=ym;tl.jsx=yd;tl.jsxs=yd});var le=st((Wm,wd)=>{"use strict";wd.exports=zd()});var Rv=A(Oe(),1),ba=A(gd(),1);var F=A(Oe(),1);function zt(e,t){return e?e.callWS(t):Promise.reject(new Error("Not connected to Home Assistant"))}function hd(e,t,n){return e?e.connection.subscribeMessage(n,t):Promise.reject(new Error("Not connected to Home Assistant"))}var mm="/api/quizify/player_ws";function vm(){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${mm}`}var el=class{constructor({onEvent:t,onStatus:n}){this._onEvent=t||(()=>{}),this._onStatus=n||(()=>{}),this._ws=null,this._closedByUser=!1,this._backoff=500,this._maxBackoff=1e4,this._pingTimer=null,this._reconnectTimer=null,this._resume=null}setResume(t){this._resume=t}connect(){this._closedByUser=!1,this._open()}_open(){this._onStatus("connecting");let t;try{t=new WebSocket(vm())}catch{this._scheduleReconnect();return}this._ws=t,t.addEventListener("open",()=>{this._backoff=500,this._onStatus("open"),this._resume&&this._send({type:"resume",...this._resume}),this._startPing()}),t.addEventListener("message",n=>{let r;try{r=JSON.parse(n.data)}catch{return}r?.event!=="pong"&&this._onEvent(r)}),t.addEventListener("close",()=>{this._stopPing(),this._ws=null,this._onStatus("closed"),this._closedByUser||this._scheduleReconnect()}),t.addEventListener("error",()=>{})}_scheduleReconnect(){this._closedByUser||(clearTimeout(this._reconnectTimer),this._reconnectTimer=setTimeout(()=>this._open(),this._backoff),this._backoff=Math.min(this._maxBackoff,this._backoff*2))}_startPing(){this._stopPing(),this._pingTimer=setInterval(()=>{this._send({type:"ping"})},25e3)}_stopPing(){this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null)}send(t){return this._send(t)}_send(t){let n=this._ws;if(!n||n.readyState!==WebSocket.OPEN)return!1;try{return n.send(JSON.stringify(t)),!0}catch{return!1}}close(){if(this._closedByUser=!0,clearTimeout(this._reconnectTimer),this._stopPing(),this._ws){try{this._ws.close()}catch{}this._ws=null}}};var Qm=A(Oe(),1),Ut=A(le(),1);function ge({connected:e,subtitle:t}){return(0,Ut.jsxs)("div",{className:"qz-header",children:[(0,Ut.jsxs)("div",{children:[(0,Ut.jsx)("div",{className:"qz-brand",children:"Quizify"}),t&&(0,Ut.jsx)("div",{className:"qz-label",style:{marginTop:4},children:t})]}),(0,Ut.jsxs)("div",{className:"qz-header-status",children:[(0,Ut.jsx)("span",{className:`qz-status-dot ${e?"":"qz-status-off"}`}),e?"Connected":"Offline"]})]})}var Xm=A(Oe(),1);var qd=["A","B","C","D","E","F"],_a={adults:"Adults",kids:"Kids"},xd={adults:"Trickier questions, broader topics",kids:"Age-appropriate, simpler wording"},Na={general_knowledge:"General Knowledge",science:"Science",geography:"Geography",history:"History",sport:"Sport",food_and_drink:"Food & Drink",literature:"Literature",language:"Language & Words",art:"Art & Architecture",technology:"Technology & Inventions",mythology:"Mythology & Religion",animals:"Animals & Nature",random:"Random Mix"},kd={general_knowledge:"\u{1F9E0}",science:"\u{1F52C}",geography:"\u{1F30D}",history:"\u{1F3DB}\uFE0F",sport:"\u26BD",food_and_drink:"\u{1F377}",literature:"\u{1F4DA}",language:"\u{1F4AC}",art:"\u{1F3A8}",technology:"\u{1F4BB}",mythology:"\u26A1",animals:"\u{1F981}",random:"\u{1F3B2}"},Ea={easy:"Easy",medium:"Medium",hard:"Hard",mixed:"Mixed"};function Sd(e){return(e||"?").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0].toUpperCase()).join("")}function _d(e){return`${window.location.origin}/quizify/play?code=${encodeURIComponent(e)}`}function Nd(e){return`/api/quizify/qr?data=${encodeURIComponent(e)}`}function Tr(){return Date.now()/1e3}var R=A(le(),1);function Ed({value:e,onChange:t}){return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:"Mode"}),(0,R.jsx)("div",{className:"qz-mode-tiles",children:Object.keys(_a).map(n=>(0,R.jsxs)("button",{type:"button",className:`qz-mode-tile ${e===n?"qz-active":""}`,onClick:()=>t(n),children:[(0,R.jsx)("div",{className:"qz-mode-tile-emoji",children:n==="adults"?"\u{1F9E0}":"\u{1F388}"}),(0,R.jsx)("div",{className:"qz-mode-tile-title",children:_a[n]}),(0,R.jsx)("div",{className:"qz-mode-tile-desc",children:xd[n]})]},n))})]})}function Cd({value:e,onChange:t,available:n}){let r=[{id:"random",count:n.reduce((o,l)=>o+l.count,0)},...n];return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:"Category"}),(0,R.jsx)("div",{className:"qz-category-grid",children:r.map(o=>(0,R.jsxs)("button",{type:"button",className:`qz-category-tile ${e===o.id?"qz-active":""}`,onClick:()=>t(o.id),disabled:o.count===0,title:Na[o.id]||o.id,children:[(0,R.jsx)("div",{className:"qz-category-tile-emoji",children:kd[o.id]||"\u2753"}),(0,R.jsx)("div",{className:"qz-category-tile-title",children:Na[o.id]||o.id}),(0,R.jsxs)("div",{className:"qz-category-tile-count",children:[o.count," Qs"]})]},o.id))})]})}function Pd({value:e,onChange:t}){return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:"Difficulty"}),(0,R.jsx)("div",{className:"qz-pill-row",children:Object.keys(Ea).map(n=>(0,R.jsx)("button",{type:"button",className:`qz-pill ${e===n?"qz-active":""}`,onClick:()=>t(n),children:Ea[n]},n))})]})}function Ca({label:e,value:t,onChange:n,options:r}){return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:e}),(0,R.jsx)("div",{className:"qz-pill-row",children:r.map(o=>(0,R.jsx)("button",{type:"button",className:`qz-pill ${t===o?"qz-active":""}`,onClick:()=>n(o),children:o},o))})]})}function Td({speakers:e,value:t,onChange:n}){return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:"Background music (optional)"}),(0,R.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,R.jsx)("option",{value:"",children:"No music"}),e.map(r=>(0,R.jsxs)("option",{value:r.entity_id,children:[r.name," ",r.supports_mass?"\xB7 Music Assistant":""]},r.entity_id))]})]})}var xm=[{id:"hype",label:"\u{1F3A4} Hype Master",desc:"Pure energy, maximum excitement"},{id:"drill",label:"\u{1FA96} Drill Sergeant",desc:"No mercy, no excuses, MOVE IT"},{id:"soap",label:"\u{1F3AD} Soap Opera Host",desc:"Dramatic pauses and swelling music"},{id:"conspiracy",label:"\u{1F50D} Conspiracy Theorist",desc:"They don't want you to know the answers"},{id:"parent",label:"\u{1F624} Disappointed Parent",desc:"I'm not angry, just... disappointed"},{id:"sports",label:"\u{1F4FA} Sports Commentator",desc:"WHAT a performance, folks!"}];function Ld({value:e,onChange:t}){return(0,R.jsxs)("div",{className:"qz-stack",children:[(0,R.jsx)("div",{className:"qz-label",children:"Announcer Personality"}),(0,R.jsx)("div",{className:"qz-personality-grid",children:xm.map(n=>(0,R.jsxs)("button",{type:"button",className:`qz-personality-tile${e===n.id?" qz-active":""}`,onClick:()=>t(n.id),children:[(0,R.jsx)("div",{className:"qz-personality-label",children:n.label}),(0,R.jsx)("div",{className:"qz-personality-desc",children:n.desc})]},n.id))})]})}function Rd({ttsEntities:e,value:t,onChange:n}){return(0,R.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,R.jsx)("option",{value:"",children:"No TTS announcements"}),e.length===0&&(0,R.jsx)("option",{disabled:!0,value:"_none",children:"No tts.* entities found in HA"}),e.map(r=>(0,R.jsx)("option",{value:r.entity_id,children:r.name},r.entity_id))]})}var nl=A(Oe(),1);var $t=A(le(),1);function bd({joinCode:e}){let t=_d(e),[n,r]=(0,nl.useState)(null),o=(0,nl.useCallback)(async(l,i)=>{try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(l);else{let a=document.createElement("textarea");a.value=l,a.setAttribute("readonly",""),a.style.position="absolute",a.style.left="-9999px",document.body.appendChild(a),a.select();try{document.execCommand("copy")}catch{}document.body.removeChild(a)}r(i),setTimeout(()=>r(a=>a===i?null:a),1500)}catch{}},[]);return(0,$t.jsxs)("div",{className:"qz-qr-card",children:[(0,$t.jsx)("div",{className:"qz-label",children:"Scan to join"}),(0,$t.jsx)("div",{className:"qz-qr-frame",children:(0,$t.jsx)("img",{src:Nd(t),alt:`QR code for ${t}`})}),(0,$t.jsx)("button",{type:"button",className:"qz-join-code qz-join-code-copy",onClick:()=>o(e,"code"),title:"Click to copy the join code",children:n==="code"?"\u2713 Copied!":e}),(0,$t.jsx)("button",{type:"button",className:"qz-join-url qz-join-url-copy",onClick:()=>o(t,"url"),title:"Click to copy the join link",children:n==="url"?"\u2713 Link copied!":t})]})}var ov=A(Oe(),1);var qe=A(le(),1);function jd({players:e,highlightId:t}){return!e||e.length===0?(0,qe.jsx)("div",{className:"qz-empty",children:"Waiting for players to join\u2026"}):(0,qe.jsx)("div",{className:"qz-player-list",children:e.map(n=>{let r=`qz-player-row${n.player_id===t?" qz-highlight":""}`;return(0,qe.jsxs)("div",{className:r,children:[(0,qe.jsx)("div",{className:"qz-player-avatar",children:Sd(n.name)}),(0,qe.jsx)("div",{className:"qz-player-name",children:n.name}),(0,qe.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}function Mn({players:e,highlightId:t}){return!e||e.length===0?null:(0,qe.jsx)("div",{className:"qz-scoreboard-list",children:e.map((n,r)=>{let o=["qz-scoreboard-row"];return r<3&&o.push("qz-top"),n.player_id===t&&o.push("qz-highlight"),(0,qe.jsxs)("div",{className:o.join(" "),children:[(0,qe.jsx)("div",{className:`qz-rank qz-rank-${r+1}`,children:r+1}),(0,qe.jsxs)("div",{children:[(0,qe.jsx)("strong",{children:n.name}),n.streak>=3&&(0,qe.jsxs)("span",{className:"qz-streak-badge",children:["\u{1F525} ",n.streak]})]}),(0,qe.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}var it=A(Oe(),1);var ee=A(le(),1),Pa=null;function Od(){if(!Pa)try{Pa=new(window.AudioContext||window.webkitAudioContext)}catch{return null}return Pa}function km(e=880,t=.08,n=.18){let r=Od();if(r)try{r.state==="suspended"&&r.resume();let o=r.createOscillator(),l=r.createGain();o.connect(l),l.connect(r.destination),o.frequency.value=e,o.type="sine",l.gain.setValueAtTime(n,r.currentTime),l.gain.exponentialRampToValueAtTime(.001,r.currentTime+t),o.start(r.currentTime),o.stop(r.currentTime+t)}catch{}}function rl({question:e,index:t,total:n,deadline:r,selected:o,correct:l,onAnswer:i,reveal:a,paused:s,lifelines:u,onLifeline:m}){let[p,g]=(0,it.useState)(()=>Math.max(0,(r||0)-Tr())),h=(0,it.useRef)(-1),x=(0,it.useRef)(null);(0,it.useEffect)(()=>{let f=()=>{Od()};return document.addEventListener("click",f,{once:!0}),document.addEventListener("touchstart",f,{once:!0}),()=>{document.removeEventListener("click",f),document.removeEventListener("touchstart",f)}},[]),(0,it.useEffect)(()=>{h.current=-1,x.current=null},[t]),(0,it.useEffect)(()=>{s&&x.current===null&&(x.current=Math.max(0,(r||0)-Tr())),s||(x.current=null)},[s,r]),(0,it.useEffect)(()=>{if(!r)return;let f=()=>{if(s){x.current!==null&&g(x.current);return}let w=Math.max(0,r-Tr());if(g(w),!a&&o===null&&w>0&&w<=5){let S=Math.ceil(w);if(S!==h.current){h.current=S;let N=S<=2?1200:S<=3?1e3:880,E=S<=2?.28:S<=3?.22:.16;km(N,.1,E)}}};f();let v=setInterval(f,100);return()=>clearInterval(v)},[r,a,o,s]);let k=Math.max(1,(r||0)-(e?.startedAt||Tr())),D=r?Math.max(0,Math.min(100,p/k*100)):100,d=p<5&&!a&&!s&&o===null;function c(f){let v=o===f;return a?f===l?v?"qz-answer qz-correct qz-correct-mine":"qz-answer qz-correct":v?"qz-answer qz-wrong":"qz-answer qz-neutral":u?.revealedIndex===f&&o===null?"qz-answer qz-peeked":v?"qz-answer qz-selected":"qz-answer"}return(0,ee.jsxs)("div",{className:`qz-question-stage${s?" qz-paused":""}`,children:[(0,ee.jsxs)("div",{className:"qz-progress",children:[(0,ee.jsxs)("div",{className:"qz-label",children:["Q",t+1," / ",n]}),(0,ee.jsx)("div",{className:"qz-progress-bar",children:(0,ee.jsx)("div",{className:`qz-progress-fill${d?" qz-progress-fill-low":""}${s?" qz-progress-fill-paused":""}`,style:{width:`${D}%`}})}),(0,ee.jsx)("div",{className:`qz-timer ${d?"qz-timer-low":""}${s?" qz-timer-paused":""}`,children:s?"\u23F8":`${Math.ceil(p)}s`})]}),(0,ee.jsx)("div",{className:"qz-question-text",children:e.question}),!a&&!s&&m&&(0,ee.jsxs)("div",{className:"qz-lifelines",children:[(0,ee.jsxs)("button",{type:"button",className:`qz-lifeline-btn${u?.doublePointsActive?" qz-lifeline-active":""}${u?.doublePointsRequested?" qz-lifeline-pending":""}`,onClick:()=>m("doublePoints"),disabled:u?.doublePointsActive||u?.doublePointsRequested||o!==null,title:"Double points \u2014 or lose 1000 if you're wrong!",children:[(0,ee.jsx)("span",{className:"qz-lifeline-icon",children:"\u26A1"}),(0,ee.jsx)("span",{className:"qz-lifeline-label",children:u?.doublePointsActive?"2\xD7 ON!":u?.doublePointsRequested?"Arming\u2026":"2\xD7 or \u22121000"})]}),(0,ee.jsxs)("button",{type:"button",className:`qz-lifeline-btn${u?.revealAnswer?" qz-lifeline-used":""}`,onClick:()=>m("revealAnswer"),disabled:u?.revealAnswer||o!==null,title:"Peek at the correct answer \u2014 once per game!",children:[(0,ee.jsx)("span",{className:"qz-lifeline-icon",children:"\u{1F441}\uFE0F"}),(0,ee.jsx)("span",{className:"qz-lifeline-label",children:u?.revealAnswer?"Used":"Reveal"})]})]}),(0,ee.jsx)("div",{className:"qz-answers",children:e.answers.map((f,v)=>{let w=!a&&u?.revealedIndex===v&&o===null;return(0,ee.jsxs)("button",{type:"button",className:c(v),onClick:()=>!a&&!s&&o===null&&i&&i(v),disabled:a||s||o!==null||!i,"aria-pressed":o===v,children:[(0,ee.jsx)("div",{className:"qz-answer-letter","aria-hidden":"true",children:qd[v]}),(0,ee.jsx)("div",{className:"qz-answer-text",children:f}),w&&(0,ee.jsx)("span",{className:"qz-peeked-badge",children:"\u2713 correct"})]},v)})})]})}var dv=A(Oe(),1);var b=A(le(),1),Sm=[{key:"winner",emoji:"\u{1F3C6}",title:"Champion",blurb:"Highest score"},{key:"speedster",emoji:"\u{1F680}",title:"Speedster",blurb:"Fastest average answer"},{key:"sharpshooter",emoji:"\u{1F3AF}",title:"Sharpshooter",blurb:"Highest accuracy"},{key:"on_fire",emoji:"\u{1F525}",title:"On Fire",blurb:"Longest streak"},{key:"lightning",emoji:"\u26A1",title:"Lightning",blurb:"Fastest single answer"},{key:"high_roller",emoji:"\u{1F3B0}",title:"High Roller",blurb:"Most double-or-nothing wins"},{key:"brave_soul",emoji:"\u{1F480}",title:"Brave Soul",blurb:"Most risky bets gone wrong"}];function _m({def:e,entry:t,highlightId:n}){if(!t)return null;let r=n&&t.player_id===n;return(0,b.jsxs)("div",{className:`qz-badge${r?" qz-badge-mine":""}`,children:[(0,b.jsx)("div",{className:"qz-badge-emoji",children:e.emoji}),(0,b.jsxs)("div",{className:"qz-badge-body",children:[(0,b.jsx)("div",{className:"qz-badge-title",children:e.title}),(0,b.jsx)("div",{className:"qz-badge-name",children:t.name}),(0,b.jsx)("div",{className:"qz-badge-value",children:t.value}),(0,b.jsx)("div",{className:"qz-badge-blurb",children:e.blurb})]})]})}function Bt({label:e,value:t}){return t==null?null:(0,b.jsxs)("div",{className:"qz-stat-row",children:[(0,b.jsx)("span",{className:"qz-stat-label",children:e}),(0,b.jsx)("span",{className:"qz-stat-value",children:t})]})}function Nm({player:e}){return e?(0,b.jsxs)("div",{className:"qz-card qz-my-stats-card",children:[(0,b.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Your stats"}),(0,b.jsxs)("div",{className:"qz-stats-grid",children:[(0,b.jsx)(Bt,{label:"Score",value:e.score?.toLocaleString?.()??e.score}),(0,b.jsx)(Bt,{label:"Correct",value:`${e.correct_count??0} / ${e.answered_count??0}`}),(0,b.jsx)(Bt,{label:"Accuracy",value:e.accuracy!=null?`${e.accuracy}%`:null}),(0,b.jsx)(Bt,{label:"Avg time",value:e.avg_response_time!=null?`${e.avg_response_time}s`:null}),(0,b.jsx)(Bt,{label:"Fastest answer",value:e.fastest_answer!=null?`${e.fastest_answer}s`:null}),(0,b.jsx)(Bt,{label:"Best streak",value:e.best_streak??0}),(0,b.jsx)(Bt,{label:"Risky bets won",value:e.double_points_wins??0}),(0,b.jsx)(Bt,{label:"Risky bets lost",value:e.double_points_losses??0})]})]}):null}function ol({players:e,highlights:t,onRematch:n,onEnd:r,highlightId:o}){let l=e?.[0],i=Sm.map(s=>({def:s,entry:t?.[s.key]})).filter(s=>!!s.entry),a=o?e?.find(s=>s.player_id===o):null;return(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"qz-finale",children:[(0,b.jsx)("div",{className:"qz-trophy",children:"\u{1F3C6}"}),(0,b.jsx)("h1",{className:"qz-winner-name",children:l?.name||"\u2014"}),(0,b.jsxs)("div",{className:"qz-winner-score",children:[(l?.score||0).toLocaleString()," points"]}),(0,b.jsxs)("div",{className:"qz-row-wrap",style:{justifyContent:"center"},children:[n&&(0,b.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:n,children:"Rematch"}),r&&(0,b.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:r,children:"End Game"})]})]}),i.length>0&&(0,b.jsxs)("div",{className:"qz-card",children:[(0,b.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Game highlights"}),(0,b.jsx)("div",{className:"qz-badges-grid",children:i.map(({def:s,entry:u})=>(0,b.jsx)(_m,{def:s,entry:u,highlightId:o},s.key))})]}),a&&(0,b.jsx)(Nm,{player:a}),(0,b.jsxs)("div",{className:"qz-card",children:[(0,b.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Final standings"}),(0,b.jsx)(Mn,{players:e,highlightId:o})]})]})}var q=A(le(),1),Em={mode:"adults",category:"random",difficulty:"mixed",questions_per_round:10,question_time:20,music_player:null,music_uri:"",tts_entity:null,tts_personality:"hype"};function Md({hass:e}){let[t,n]=(0,F.useState)(!1),[r,o]=(0,F.useState)(null),[l,i]=(0,F.useState)([]),[a,s]=(0,F.useState)([]),[u,m]=(0,F.useState)(Em),[p,g]=(0,F.useState)(null),[h,x]=(0,F.useState)(null),[k,D]=(0,F.useState)(null),d=(0,F.useRef)(null),c=(0,F.useRef)(!1);(0,F.useEffect)(()=>{n(!!e?.connected)},[e?.connected]),(0,F.useEffect)(()=>{if(!e)return;let C=!1;return(async()=>{try{let L=await zt(e,{type:"quizify/categories/list"});C||o(L||{adults:[],kids:[]})}catch(L){C||(D(L?.message||"Could not load categories"),o({adults:[],kids:[]}))}try{let L=await zt(e,{type:"quizify/speakers/list"});C||i(L?.speakers||[])}catch{C||i([])}try{let L=await zt(e,{type:"quizify/tts/list"});C||s(L?.tts_entities||[])}catch{C||s([])}})(),()=>{C=!0}},[e]);let f=(0,F.useMemo)(()=>r?r[u.mode]||[]:[],[r,u.mode]);(0,F.useEffect)(()=>{if(!f.length||u.category==="random")return;let C=f.find(L=>L.id===u.category);(!C||C.count===0)&&m(L=>({...L,category:"random"}))},[f,u.category]);let v=(0,F.useCallback)(C=>{x(C),setTimeout(()=>x(L=>L===C?null:L),2200)},[]),w=(0,F.useCallback)(async C=>{if(e&&!c.current){c.current=!0;try{if(d.current){try{d.current()}catch{}d.current=null}d.current=await hd(e,{type:"quizify/admin/subscribe",session_id:C},L=>{L?.game&&g(L.game)})}catch(L){v(L?.message||"Could not subscribe")}finally{c.current=!1}}},[e,v]),S=(0,F.useCallback)(async()=>{if(e)try{let C=await zt(e,{type:"quizify/game/create",mode:u.mode,category:u.category,difficulty:u.difficulty,questions_per_round:u.questions_per_round,question_time:u.question_time,music_player:u.music_player||null,music_uri:u.music_uri||null,tts_entity:u.tts_entity||null,tts_personality:u.tts_personality||"hype"});g(C.game),await w(C.session_id)}catch(C){v(C?.message||"Could not create game")}},[e,u,v,w]),N=(0,F.useCallback)(async()=>{if(!(!e||!p))try{await zt(e,{type:"quizify/game/start",session_id:p.session_id})}catch(C){v(C?.message||"Could not start game")}},[e,p,v]),E=(0,F.useCallback)(async()=>{if(!(!e||!p)){try{await zt(e,{type:"quizify/game/end",session_id:p.session_id})}catch{}if(d.current){try{d.current()}catch{}d.current=null}g(null)}},[e,p]),X=(0,F.useCallback)(async()=>{if(!(!e||!p))try{let C=await zt(e,{type:"quizify/game/rematch",session_id:p.session_id});g(C.game),await w(C.session_id)}catch(C){v(C?.message||"Rematch failed")}},[e,p,v,w]),P=(0,F.useCallback)(async()=>{if(!e||!p)return;let C=p.is_paused?"quizify/game/resume":"quizify/game/pause";try{await zt(e,{type:C,session_id:p.session_id})}catch(L){v(L?.message||"Could not change pause state")}},[e,p,v]);if((0,F.useEffect)(()=>()=>{if(d.current){try{d.current()}catch{}d.current=null}},[]),!e)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:!1,subtitle:"Admin"}),(0,q.jsx)("div",{className:"qz-card",children:(0,q.jsx)("div",{className:"qz-empty",children:"Loading\u2026"})})]});if(k&&!r)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:"Admin"}),(0,q.jsxs)("div",{className:"qz-card",children:[(0,q.jsx)("h2",{className:"qz-display",style:{fontSize:24,marginTop:0},children:"Couldn't load Quizify"}),(0,q.jsx)("div",{className:"qz-mono",style:{marginTop:12},children:k})]})]});if(!p)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:"Admin \xB7 Setup"}),(0,q.jsx)("div",{className:"qz-card",children:(0,q.jsxs)("div",{className:"qz-stack",children:[(0,q.jsx)(Ed,{value:u.mode,onChange:C=>m(L=>({...L,mode:C,category:"random"}))}),r&&(0,q.jsx)(Cd,{value:u.category,available:f,onChange:C=>m(L=>({...L,category:C}))}),(0,q.jsx)(Pd,{value:u.difficulty,onChange:C=>m(L=>({...L,difficulty:C}))}),(0,q.jsxs)("div",{className:"qz-setup-grid",children:[(0,q.jsx)(Ca,{label:"Questions",value:u.questions_per_round,onChange:C=>m(L=>({...L,questions_per_round:C})),options:[5,10,15,20]}),(0,q.jsx)(Ca,{label:"Seconds per question",value:u.question_time,onChange:C=>m(L=>({...L,question_time:C})),options:[15,20,30,45]})]}),(0,q.jsxs)("div",{className:"qz-setup-grid",children:[(0,q.jsx)(Td,{speakers:l,value:u.music_player,onChange:C=>m(L=>({...L,music_player:C}))}),(0,q.jsxs)("div",{className:"qz-stack",children:[(0,q.jsx)("div",{className:"qz-label",children:"Playlist URI (optional)"}),(0,q.jsx)("input",{type:"text",className:"qz-input",placeholder:"e.g. spotify:playlist:...",value:u.music_uri,onChange:C=>m(L=>({...L,music_uri:C.target.value}))})]})]}),(0,q.jsxs)("div",{className:"qz-stack",children:[(0,q.jsx)("div",{className:"qz-label",children:"TTS Announcer entity (optional)"}),(0,q.jsx)(Rd,{ttsEntities:a,value:u.tts_entity,onChange:C=>m(L=>({...L,tts_entity:C}))}),(0,q.jsx)("div",{className:"qz-muted",style:{fontSize:12},children:"If set, funny TTS announcements play before the game and for the winner. Pick your TTS engine (e.g. Google Translate, Nabu Casa Cloud TTS). The background music speaker above is used as the output."})]}),u.tts_entity&&(0,q.jsx)(Ld,{value:u.tts_personality,onChange:C=>m(L=>({...L,tts_personality:C}))}),(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:S,disabled:!r||!t,style:{alignSelf:"flex-start",marginTop:8},children:"Create Game \u2192"})]})}),h&&(0,q.jsx)("div",{className:"qz-toast",children:h})]});if(p.state==="ended")return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:"Admin \xB7 Game Over"}),(0,q.jsx)(ol,{players:p.players,highlights:p.highlights,onRematch:X,onEnd:E}),h&&(0,q.jsx)("div",{className:"qz-toast",children:h})]});if(p.state==="lobby")return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:"Admin \xB7 Lobby"}),(0,q.jsxs)("div",{className:"qz-lobby",children:[(0,q.jsx)(bd,{joinCode:p.join_code}),(0,q.jsxs)("div",{className:"qz-stack",children:[(0,q.jsxs)("div",{className:"qz-card",children:[(0,q.jsxs)("div",{className:"qz-display qz-lobby-heading",children:["Players (",p.players.length,")"]}),(0,q.jsx)(jd,{players:p.players})]}),(0,q.jsxs)("div",{className:"qz-row-wrap",children:[(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:N,disabled:p.players.length===0,children:"Start Game"}),(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:E,children:"Cancel"})]})]})]}),h&&(0,q.jsx)("div",{className:"qz-toast",children:h})]});if(p.state==="announcing")return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:"Admin \xB7 Get ready\u2026"}),(0,q.jsxs)("div",{className:"qz-card qz-center-card qz-announcing",children:[(0,q.jsx)("div",{className:"qz-announcing-emoji",children:"\u{1F399}\uFE0F"}),(0,q.jsx)("h2",{className:"qz-display qz-lobby-title",children:"Announcing the game\u2026"}),(0,q.jsx)("p",{className:"qz-muted",children:'Players see a "Get ready" screen until the announcement finishes.'}),(0,q.jsxs)("div",{className:"qz-announcing-dots",children:[(0,q.jsx)("span",{}),(0,q.jsx)("span",{}),(0,q.jsx)("span",{})]})]}),(0,q.jsx)("div",{className:"qz-row-wrap",style:{marginTop:16},children:(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:E,children:"End Game"})}),h&&(0,q.jsx)("div",{className:"qz-toast",children:h})]});let Q=p.current_question,Ze=!!p.is_paused,In=p.effective_state||p.state;return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(ge,{connected:t,subtitle:`Admin \xB7 ${Ze?"Paused":In==="reveal"?"Reveal":"Question"}`}),Q&&(0,q.jsx)(rl,{question:{question:Q.question,answers:Q.answers,startedAt:Q.deadline-(p.settings?.question_time||20)},index:Q.index,total:Q.total,deadline:Q.deadline,selected:null,correct:Q.correct!==void 0?Q.correct:null,reveal:In==="reveal",paused:Ze}),Ze&&(0,q.jsxs)("div",{className:"qz-pause-banner",children:[(0,q.jsx)("div",{className:"qz-pause-icon",children:"\u23F8"}),(0,q.jsxs)("div",{className:"qz-pause-text",children:[(0,q.jsx)("div",{className:"qz-pause-title",children:"Game Paused"}),(0,q.jsx)("div",{className:"qz-pause-sub",children:p.paused_by_name?`Paused by ${p.paused_by_name}`:"Tap Resume to continue."})]})]}),In==="reveal"&&!Ze&&Q?.explanation&&(0,q.jsxs)("div",{className:"qz-reveal-banner",children:[(0,q.jsx)("div",{className:"qz-label",children:"Why"}),(0,q.jsx)("div",{className:"qz-reveal-explanation",children:Q.explanation})]}),(0,q.jsxs)("div",{className:"qz-card",style:{marginTop:20},children:[(0,q.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Live Scoreboard"}),(0,q.jsx)(Mn,{players:p.players})]}),(0,q.jsxs)("div",{className:"qz-row-wrap",style:{marginTop:16},children:[(0,q.jsx)("button",{type:"button",className:`qz-btn qz-btn-pause${Ze?" qz-btn-pause-resume":""}`,onClick:P,children:Ze?"\u25B6 Resume":"\u23F8 Pause"}),(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:E,children:"End Game"})]}),h&&(0,q.jsx)("div",{className:"qz-toast",children:h})]})}var W=A(Oe(),1);var z=A(le(),1),Ta="quizify_player_v3";function Cm(){try{let e=window.localStorage.getItem(Ta);return e?JSON.parse(e):null}catch{return null}}function Pm(e){try{window.localStorage.setItem(Ta,JSON.stringify(e))}catch{}}function Id(){try{window.localStorage.removeItem(Ta)}catch{}}var Dd={doublePointsActive:!1,doublePointsRequested:!1,revealAnswer:!1,revealedIndex:null};function Ad({initialJoinCode:e}){let[t,n]=(0,W.useState)("connecting"),[r,o]=(0,W.useState)(null),[l,i]=(0,W.useState)(null),[a,s]=(0,W.useState)(null),[u,m]=(0,W.useState)(e||""),[p,g]=(0,W.useState)(""),[h,x]=(0,W.useState)(null),[k,D]=(0,W.useState)(null),[d,c]=(0,W.useState)(!1),[f,v]=(0,W.useState)(null),[w,S]=(0,W.useState)({...Dd}),N=(0,W.useRef)(null),[E,X]=(0,W.useState)(null),P=(0,W.useCallback)(O=>{D(O),setTimeout(()=>D(te=>te===O?null:te),2200)},[]);(0,W.useEffect)(()=>{let O=Cm();O?.join_code===(e||"").toUpperCase()?o(O):O&&!e&&(o(O),m(O.join_code||""));let te=new el({onStatus:n,onEvent:T=>{if(T?.event==="error"){if(T.code==="invalid_token"||T.code==="not_found"){Id(),o(null),i(null),s(null),P(T.message||"Session ended");return}P(T.message||T.code||"Server error");return}if(T?.event==="peek_result"){T.correct!==null&&T.correct!==void 0&&S(Ee=>({...Ee,revealedIndex:T.correct}));return}if(T?.event==="lifeline_result"){T.lifeline==="double_points"&&(S(Ee=>({...Ee,doublePointsActive:!!T.armed,doublePointsRequested:!1})),T.armed?P("\u26A1 Double or nothing \u2014 you brave soul!"):P("Couldn't arm that \u2014 too late?"));return}if(T?.event==="paused"){let Ee=T.paused_by_name;P(Ee?`\u23F8 Paused by ${Ee}`:"\u23F8 Game paused")}if(T?.event==="resumed"&&P("\u25B6 Resumed"),T?.event==="joined"||T?.event==="resumed"){let Ee={player_id:T.player_id,session_id:T.session_id,player_token:T.player_token,name:T.name,join_code:T.game?.join_code||u.toUpperCase()};o(Ee),Pm(Ee),te.setResume({session_id:Ee.session_id,player_token:Ee.player_token}),T.game&&i(T.game),T.you&&s(T.you),T.you?.peek_answer_used&&S(Bd=>({...Bd,revealAnswer:!0})),T.event==="joined"&&c(!1);return}T?.game&&i(T.game),T?.you&&s(T.you),T?.event==="question"&&(x(null),X(null),S(Ee=>({doublePointsActive:!1,doublePointsRequested:!1,revealAnswer:Ee.revealAnswer,revealedIndex:null})))}});return O?.session_id&&O?.player_token&&te.setResume({session_id:O.session_id,player_token:O.player_token}),N.current=te,te.connect(),()=>{te.close(),N.current=null}},[]);let Q=(0,W.useCallback)(()=>{let O=N.current;if(!O||t!=="open")return;let te=u.trim().toUpperCase(),T=p.trim();!te||T.length===0||(c(!0),v(null),O.send({type:"join",join_code:te,name:T}),setTimeout(()=>c(!1),4e3))},[u,p,t]),Ze=(0,W.useCallback)(O=>{let te=N.current;if(!te||!r||h!==null)return;x(O),te.send({type:"answer",answer:O})||(x(null),P("Disconnected \u2014 try again"))},[r,h,P]),In=(0,W.useCallback)(O=>{if(O==="doublePoints"){if(w.doublePointsActive||w.doublePointsRequested)return;let te=N.current;if(!te)return;S(T=>({...T,doublePointsRequested:!0})),te.send({type:"lifeline",lifeline:"double_points"})}else if(O==="revealAnswer"){if(w.revealAnswer)return;let te=N.current;te&&te.send({type:"peek_answer"}),S(T=>({...T,revealAnswer:!0})),P("\u{1F441}\uFE0F The answer has been revealed \u2014 don't tell anyone!")}},[w,P]),C=(0,W.useCallback)(()=>{let O=N.current;!O||!l||(l.is_paused?O.send({type:"resume_game"}):O.send({type:"pause"}))},[l]),L=(0,W.useCallback)(()=>{let O=N.current;if(O){try{O.send({type:"leave"})}catch{}O.setResume(null)}Id(),o(null),i(null),s(null),x(null),S({...Dd})},[]),Je=t==="open";if(!r)return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je}),(0,z.jsxs)("div",{className:"qz-join-screen",children:[(0,z.jsxs)("div",{className:"qz-join-hero",children:[(0,z.jsx)("h1",{children:"Quizify"}),(0,z.jsx)("p",{children:"Get in. Get smart. Win."})]}),(0,z.jsx)("div",{className:"qz-card",children:(0,z.jsxs)("div",{className:"qz-stack",children:[(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Join code"}),(0,z.jsx)("input",{type:"text",className:"qz-input qz-mono qz-input-code",inputMode:"text",placeholder:"6 letters",value:u,maxLength:6,onChange:O=>m(O.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")),autoCapitalize:"characters",autoComplete:"off",spellCheck:!1})]}),(0,z.jsxs)("div",{children:[(0,z.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Your name"}),(0,z.jsx)("input",{type:"text",className:"qz-input",placeholder:"Enter a name",value:p,maxLength:20,onChange:O=>g(O.target.value),onKeyDown:O=>{O.key==="Enter"&&Q()},autoComplete:"off"})]}),(0,z.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:Q,disabled:d||!Je||u.length<4||!p.trim(),children:d?"Joining\u2026":Je?"Join Game":"Connecting\u2026"}),f&&(0,z.jsx)("div",{className:"qz-error-text",children:f})]})})]}),k&&(0,z.jsx)("div",{className:"qz-toast",children:k})]});if(!l)return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsx)("div",{className:"qz-empty",children:Je?"Loading game\u2026":"Reconnecting\u2026"})]});if(l.state==="ended")return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsx)(ol,{players:l.players,highlights:l.highlights,highlightId:r.player_id}),(0,z.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,z.jsx)("button",{type:"button",className:"qz-btn",onClick:L,children:"Leave"})}),k&&(0,z.jsx)("div",{className:"qz-toast",children:k})]});if(l.state==="lobby")return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsxs)("div",{className:"qz-card qz-center-card",children:[(0,z.jsx)("div",{className:"qz-trophy",style:{fontSize:64},children:"\u{1F44B}"}),(0,z.jsx)("h2",{className:"qz-display qz-lobby-title",children:"You're in"}),(0,z.jsx)("p",{className:"qz-muted",children:"Waiting for the host to start the game\u2026"}),(0,z.jsx)("div",{style:{marginTop:24},children:(0,z.jsxs)("div",{className:"qz-label",children:["Players (",l.players.length,")"]})}),(0,z.jsx)(Mn,{players:l.players,highlightId:r.player_id})]}),(0,z.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,z.jsx)("button",{type:"button",className:"qz-btn",onClick:L,children:"Leave"})}),k&&(0,z.jsx)("div",{className:"qz-toast",children:k})]});if(l.state==="announcing")return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsxs)("div",{className:"qz-card qz-center-card qz-announcing",children:[(0,z.jsx)("div",{className:"qz-announcing-emoji",children:"\u{1F399}\uFE0F"}),(0,z.jsx)("h2",{className:"qz-display qz-lobby-title",children:"Get ready\u2026"}),(0,z.jsx)("p",{className:"qz-muted",children:"Your host is announcing the game. Sit tight!"}),(0,z.jsxs)("div",{className:"qz-announcing-dots",children:[(0,z.jsx)("span",{}),(0,z.jsx)("span",{}),(0,z.jsx)("span",{})]})]}),k&&(0,z.jsx)("div",{className:"qz-toast",children:k})]});let je=l.current_question;if(!je)return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsx)("div",{className:"qz-empty",children:"Waiting for next question\u2026"})]});let Be=!!l.is_paused,at=(l.effective_state||l.state)==="reveal",$d=a?.score??0,Oa=a?.streak??0,ll=at&&h!==null&&h===je.correct,jm=at&&h!==null&&h!==je.correct;return(0,z.jsxs)("div",{className:"qz-app",children:[(0,z.jsx)(ge,{connected:Je,subtitle:r.name}),(0,z.jsx)(rl,{question:{question:je.question,answers:je.answers,startedAt:je.deadline-(l.settings?.question_time||20)},index:je.index,total:je.total,deadline:je.deadline,selected:h,correct:at?je.correct:null,onAnswer:Be?null:Ze,reveal:at,paused:Be,lifelines:w,onLifeline:!at&&!Be&&h===null?In:null}),(0,z.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:12},children:(0,z.jsx)("button",{type:"button",className:`qz-btn qz-btn-pause${Be?" qz-btn-pause-resume":""}`,onClick:C,title:Be?"Resume the game for everyone":"Pause the game for everyone",children:Be?"\u25B6 Resume":"\u23F8 Pause"})}),Be&&(0,z.jsxs)("div",{className:"qz-pause-banner",children:[(0,z.jsx)("div",{className:"qz-pause-icon",children:"\u23F8"}),(0,z.jsxs)("div",{className:"qz-pause-text",children:[(0,z.jsx)("div",{className:"qz-pause-title",children:"Game Paused"}),(0,z.jsx)("div",{className:"qz-pause-sub",children:l.paused_by_name?`Paused by ${l.paused_by_name}`:"Anyone can resume from their phone."})]})]}),at&&!Be&&h!==null&&(0,z.jsxs)("div",{className:`qz-result-banner ${ll?"qz-result-correct":"qz-result-wrong"}`,children:[(0,z.jsx)("span",{className:"qz-result-icon",children:ll?"\u{1F389}":"\u{1F480}"}),(0,z.jsx)("span",{className:"qz-result-text",children:ll?w.doublePointsActive?"Correct! Double points!":"Correct!":w.doublePointsActive?"Wrong\u2026 \u22121000 points!":"Wrong!"})]}),at&&!Be&&h===null&&(0,z.jsxs)("div",{className:"qz-result-banner qz-result-timeout",children:[(0,z.jsx)("span",{className:"qz-result-icon",children:"\u23F0"}),(0,z.jsx)("span",{className:"qz-result-text",children:"Time's up!"})]}),at&&!Be&&je.explanation&&(0,z.jsxs)("div",{className:"qz-reveal-banner",children:[(0,z.jsx)("div",{className:"qz-label",children:"\u{1F4A1} Did you know?"}),(0,z.jsx)("div",{className:"qz-reveal-explanation",children:je.explanation})]}),h!==null&&!at&&!Be&&(0,z.jsx)("div",{className:"qz-card qz-answer-feedback-card",children:(0,z.jsxs)("div",{className:"qz-feedback-waiting",children:[(0,z.jsx)("span",{className:"qz-feedback-spinner",children:"\u23F3"}),(0,z.jsx)("span",{children:"Answer locked in! Waiting for reveal\u2026"}),w.doublePointsActive&&(0,z.jsx)("div",{className:"qz-feedback-lifeline-note",children:"\u26A1 Double points gamble active!"})]})}),a&&(0,z.jsxs)("div",{className:"qz-card qz-score-card",children:[(0,z.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Your score"}),(0,z.jsxs)("div",{className:"qz-display qz-score-value",children:[$d.toLocaleString(),Oa>=3&&(0,z.jsxs)("span",{className:"qz-streak-badge qz-streak-inline",children:["\u{1F525} ",Oa," streak"]})]})]}),k&&(0,z.jsx)("div",{className:"qz-toast",children:k})]})}var La=`/* ============================================================
   Quizify \u2014 modern dark UI
   - No web-font dependency: uses system font stacks only, so
     nothing leaves the network and there's no FOUC.
   - Scoped under .qz-app / shadow root so it cannot leak into
     Home Assistant's main UI when rendered as a panel.
   ============================================================ */

.qz-app,
:host,
.qz-shadow-host {
  /* Palette */
  --qz-bg: #0b1020;
  --qz-bg-2: #11172e;
  --qz-card: #161d3a;
  --qz-card-2: #1c2447;
  --qz-card-3: #232c54;
  --qz-border: rgba(148, 163, 255, 0.14);
  --qz-border-strong: rgba(148, 163, 255, 0.28);
  --qz-text: #e8ecff;
  --qz-text-dim: rgba(232, 236, 255, 0.7);
  --qz-text-faint: rgba(232, 236, 255, 0.45);

  --qz-accent: #5cf0d4;        /* teal */
  --qz-accent-2: #ff5cf0;      /* magenta */
  --qz-accent-3: #ffd45c;      /* gold */
  --qz-accent-cool: #5c9dff;   /* blue */
  --qz-correct: #5cf0a4;
  --qz-wrong: #ff5c7c;

  /* Geometry */
  --qz-radius: 16px;
  --qz-radius-lg: 24px;
  --qz-radius-sm: 10px;
  --qz-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.55);
  --qz-shadow-soft: 0 8px 24px -16px rgba(0, 0, 0, 0.4);
  --qz-glow-accent: 0 0 0 1px rgba(92, 240, 212, 0.4),
                    0 12px 36px -16px rgba(92, 240, 212, 0.45);

  /* Typography \u2014 fully local system stacks */
  --qz-font-body:
    ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";
  --qz-font-display:
    ui-rounded, "SF Pro Rounded", "Hiragino Maru Gothic ProN",
    Quicksand, Comfortaa, system-ui, -apple-system, sans-serif;
  --qz-font-mono:
    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
    "Liberation Mono", "Roboto Mono", monospace;

  /* Motion */
  --qz-ease: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Global reset that's scoped to our subtree to avoid clobbering HA */
.qz-app *,
.qz-app *::before,
.qz-app *::after,
:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}

/* When we're loaded on the public player page, paint a full-bleed bg */
body:has(#quizify-root[data-view="player"]) {
  margin: 0;
  background:
    radial-gradient(ellipse at top right, rgba(255, 92, 240, 0.10), transparent 55%),
    radial-gradient(ellipse at bottom left, rgba(92, 240, 212, 0.10), transparent 55%),
    #0b1020;
  background-attachment: fixed;
  color: #e8ecff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

/* When rendered inside the HA panel (shadow DOM), provide the same backdrop */
:host {
  display: block;
  min-height: 100%;
  background:
    radial-gradient(ellipse at top right, rgba(255, 92, 240, 0.08), transparent 55%),
    radial-gradient(ellipse at bottom left, rgba(92, 240, 212, 0.08), transparent 55%),
    var(--qz-bg);
  color: var(--qz-text);
  font-family: var(--qz-font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.qz-shadow-host {
  display: block;
  min-height: 100%;
}

#quizify-root[data-view="player"] {
  min-height: 100vh;
  color: var(--qz-text);
  font-family: var(--qz-font-body);
}

.qz-app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--qz-font-body);
  color: var(--qz-text);
}

@media (max-width: 640px) {
  .qz-app { padding: 16px; }
}

/* ---------------- typography ---------------- */

.qz-brand {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 26px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--qz-accent) 0%, var(--qz-accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.qz-display {
  font-family: var(--qz-font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.qz-mono {
  font-family: var(--qz-font-mono);
  letter-spacing: 0;
}

.qz-label {
  font-family: var(--qz-font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--qz-text-dim);
}

.qz-muted { color: var(--qz-text-dim); margin: 0; }
.qz-center { justify-content: center; }
.qz-error-text { color: var(--qz-wrong); font-size: 13px; }

/* ---------------- cards, layout primitives ---------------- */

.qz-card {
  background: var(--qz-card);
  border: 1px solid var(--qz-border);
  border-radius: var(--qz-radius);
  padding: 24px;
  box-shadow: var(--qz-shadow);
}

.qz-stack { display: flex; flex-direction: column; gap: 16px; }
.qz-row { display: flex; gap: 16px; }
.qz-row-wrap { display: flex; gap: 12px; flex-wrap: wrap; }

.qz-center-card { text-align: center; }
.qz-lobby-title { font-size: 28px; margin: 0; }
.qz-lobby-heading { font-size: 20px; margin-bottom: 16px; }
.qz-score-card { margin-top: 20px; }
.qz-score-value { font-size: 36px; color: var(--qz-accent); }
.qz-streak-inline { margin-left: 12px; }

/* ---------------- buttons ---------------- */

.qz-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--qz-border);
  background: var(--qz-card-2);
  color: var(--qz-text);
  padding: 13px 22px;
  border-radius: 12px;
  font-family: var(--qz-font-mono);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.18s var(--qz-ease),
    border-color 0.18s var(--qz-ease),
    transform 0.12s var(--qz-ease),
    box-shadow 0.18s var(--qz-ease);
}

.qz-btn:hover:not(:disabled) {
  background: var(--qz-card-3);
  border-color: var(--qz-border-strong);
  transform: translateY(-1px);
}

.qz-btn:active:not(:disabled) { transform: translateY(0); }

.qz-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.4);
}

.qz-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qz-btn-primary {
  background: linear-gradient(135deg, var(--qz-accent) 0%, #4dd9c0 100%);
  color: #08152a;
  border-color: transparent;
  box-shadow: 0 8px 28px -10px rgba(92, 240, 212, 0.55);
}

.qz-btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #6ff8de 0%, var(--qz-accent) 100%);
  box-shadow: 0 12px 36px -10px rgba(92, 240, 212, 0.7);
}

.qz-btn-danger {
  background: transparent;
  border-color: rgba(255, 92, 124, 0.4);
  color: var(--qz-wrong);
}

.qz-btn-danger:hover:not(:disabled) {
  background: rgba(255, 92, 124, 0.1);
  border-color: var(--qz-wrong);
}

/* ---------------- inputs ---------------- */

.qz-input, .qz-select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  background: var(--qz-bg-2);
  border: 1px solid var(--qz-border);
  border-radius: 12px;
  padding: 14px 16px;
  color: var(--qz-text);
  font-family: var(--qz-font-body);
  font-size: 15px;
  transition: border-color 0.18s var(--qz-ease), box-shadow 0.18s var(--qz-ease);
}

.qz-input:focus, .qz-select:focus {
  outline: none;
  border-color: var(--qz-accent);
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.18);
}

.qz-input::placeholder { color: var(--qz-text-faint); }

.qz-input-code {
  letter-spacing: 0.22em;
  font-size: 22px;
  text-align: center;
  font-weight: 700;
}

.qz-select {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23e8ecff' d='M6 8L0 0h12z' opacity='0.6'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

/* ---------------- header ---------------- */

.qz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.qz-header-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--qz-font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--qz-text-dim);
  padding: 6px 12px;
  background: var(--qz-card);
  border: 1px solid var(--qz-border);
  border-radius: 999px;
}

.qz-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--qz-correct);
  box-shadow: 0 0 12px var(--qz-correct);
  animation: qz-pulse 2.2s ease-in-out infinite;
}

.qz-status-dot.qz-status-off {
  background: var(--qz-wrong);
  box-shadow: none;
  animation: none;
}

@keyframes qz-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ---------------- mode tiles ---------------- */

.qz-setup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .qz-setup-grid { grid-template-columns: 1fr; }
}

.qz-mode-tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.qz-mode-tile {
  appearance: none;
  background: var(--qz-card-2);
  border: 2px solid var(--qz-border);
  border-radius: var(--qz-radius);
  padding: 20px;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.18s var(--qz-ease),
    background 0.18s var(--qz-ease),
    transform 0.12s var(--qz-ease),
    box-shadow 0.18s var(--qz-ease);
  color: var(--qz-text);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: inherit;
}

.qz-mode-tile:hover {
  border-color: var(--qz-border-strong);
  transform: translateY(-1px);
}

.qz-mode-tile:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.4);
}

.qz-mode-tile.qz-active {
  border-color: var(--qz-accent);
  background: linear-gradient(135deg, rgba(92, 240, 212, 0.12), rgba(255, 92, 240, 0.06));
  box-shadow: var(--qz-glow-accent);
}

.qz-mode-tile-emoji { font-size: 32px; margin-bottom: 6px; line-height: 1; }
.qz-mode-tile-title {
  font-family: var(--qz-font-display);
  font-weight: 700;
  font-size: 19px;
  letter-spacing: -0.01em;
}
.qz-mode-tile-desc { font-size: 13px; color: var(--qz-text-dim); }

/* ---------------- pills ---------------- */

.qz-pill-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.qz-pill {
  appearance: none;
  background: var(--qz-bg-2);
  border: 1px solid var(--qz-border);
  border-radius: 999px;
  padding: 10px 18px;
  color: var(--qz-text);
  font-family: var(--qz-font-mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.18s var(--qz-ease),
    border-color 0.18s var(--qz-ease),
    color 0.18s var(--qz-ease);
}

.qz-pill:hover { border-color: var(--qz-border-strong); }
.qz-pill:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.4);
}

.qz-pill.qz-active {
  background: var(--qz-accent);
  border-color: var(--qz-accent);
  color: #08152a;
}

/* ---------------- category grid ---------------- */

.qz-category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}

.qz-category-tile {
  appearance: none;
  background: var(--qz-card-2);
  border: 2px solid var(--qz-border);
  border-radius: var(--qz-radius);
  padding: 14px 10px;
  color: var(--qz-text);
  cursor: pointer;
  transition:
    border-color 0.18s var(--qz-ease),
    background 0.18s var(--qz-ease),
    transform 0.12s var(--qz-ease),
    box-shadow 0.18s var(--qz-ease);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  font-family: inherit;
  min-height: 112px;
}

.qz-category-tile:hover:not(:disabled) {
  border-color: var(--qz-border-strong);
  transform: translateY(-1px);
}

.qz-category-tile:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.4);
}

.qz-category-tile.qz-active {
  border-color: var(--qz-accent);
  background: linear-gradient(135deg, rgba(92, 240, 212, 0.14), rgba(255, 92, 240, 0.07));
  box-shadow: var(--qz-glow-accent);
}

.qz-category-tile:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qz-category-tile-emoji { font-size: 28px; line-height: 1; }
.qz-category-tile-title {
  font-family: var(--qz-font-display);
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
}
.qz-category-tile-count {
  font-family: var(--qz-font-mono);
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--qz-text-dim);
}

/* ---------------- lobby (QR + players) ---------------- */

.qz-lobby {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1fr;
  gap: 32px;
  align-items: start;
}

@media (max-width: 900px) {
  .qz-lobby { grid-template-columns: 1fr; }
}

.qz-qr-card {
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, var(--qz-card) 0%, var(--qz-card-2) 100%);
  border-radius: var(--qz-radius-lg);
  border: 1px solid var(--qz-border);
  box-shadow: var(--qz-shadow);
}

.qz-qr-frame {
  background: white;
  padding: 20px;
  border-radius: var(--qz-radius);
  display: inline-block;
  margin: 16px 0;
  box-shadow: var(--qz-shadow-soft);
}

.qz-qr-frame img {
  display: block;
  width: 260px;
  height: 260px;
  /* Disable lazy-load CLS */
  aspect-ratio: 1 / 1;
}

.qz-join-code {
  font-family: var(--qz-font-mono);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--qz-accent);
  margin: 8px 0;
}

.qz-join-url {
  font-family: var(--qz-font-mono);
  font-size: 12px;
  color: var(--qz-text-dim);
  word-break: break-all;
}

/* Both clickable variants are <button> elements; strip the browser
   chrome (background, border, padding, focus ring) while keeping them
   keyboard-focusable. Hover/active states hint that they're copyable. */
.qz-join-code-copy,
.qz-join-url-copy {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 4px 8px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  transition: background 120ms ease, color 120ms ease;
}

.qz-join-code-copy:hover,
.qz-join-code-copy:focus-visible,
.qz-join-url-copy:hover,
.qz-join-url-copy:focus-visible {
  background: rgba(255, 255, 255, 0.06);
  outline: none;
}

.qz-join-code-copy:active,
.qz-join-url-copy:active {
  background: rgba(255, 255, 255, 0.12);
}

.qz-player-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.qz-player-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--qz-card-2);
  border: 1px solid transparent;
  border-radius: 12px;
  animation: qz-slide-in 0.3s var(--qz-ease);
}

.qz-player-row.qz-highlight {
  border-color: var(--qz-accent);
}

@keyframes qz-slide-in {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

.qz-player-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--qz-accent), var(--qz-accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 15px;
  color: #08152a;
  flex-shrink: 0;
}

.qz-player-name { flex: 1; font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; }

.qz-player-score {
  font-family: var(--qz-font-mono);
  font-weight: 700;
  font-size: 14px;
  color: var(--qz-accent);
  font-variant-numeric: tabular-nums;
}

/* ---------------- question screen ---------------- */

.qz-question-stage {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 70vh;
  justify-content: center;
}

.qz-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.qz-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--qz-card-2);
  border-radius: 999px;
  overflow: hidden;
}

.qz-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--qz-accent), var(--qz-accent-2));
  transition: width 0.25s linear;
}

.qz-timer {
  font-family: var(--qz-font-mono);
  font-size: 22px;
  font-weight: 700;
  color: var(--qz-accent);
  min-width: 60px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.qz-timer.qz-timer-low {
  color: var(--qz-wrong);
  animation: qz-pulse 0.8s ease-in-out infinite;
}

.qz-question-text {
  font-family: var(--qz-font-display);
  font-weight: 700;
  font-size: clamp(26px, 4.6vw, 44px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
  padding: 28px 16px;
}

.qz-answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 640px) {
  .qz-answers { grid-template-columns: 1fr; }
}

.qz-answer {
  appearance: none;
  background: var(--qz-card);
  border: 2px solid var(--qz-border);
  border-radius: var(--qz-radius);
  padding: 22px;
  color: var(--qz-text);
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s var(--qz-ease),
    background 0.18s var(--qz-ease),
    transform 0.12s var(--qz-ease),
    opacity 0.18s var(--qz-ease);
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 84px;
  font-family: inherit;
}

.qz-answer:hover:not(:disabled) {
  border-color: var(--qz-border-strong);
  transform: translateY(-2px);
  background: var(--qz-card-2);
}

.qz-answer:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(92, 240, 212, 0.4);
}

.qz-answer:disabled { cursor: not-allowed; }

.qz-answer-letter {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--qz-bg-2);
  border: 1px solid var(--qz-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
  transition:
    background 0.18s var(--qz-ease),
    color 0.18s var(--qz-ease),
    border-color 0.18s var(--qz-ease);
}

/* ---------- answer states ---------- */

/* Player's selection before reveal \u2014 teal highlight */
.qz-answer.qz-selected {
  border-color: var(--qz-accent);
  background: rgba(92, 240, 212, 0.12);
}
.qz-answer.qz-selected .qz-answer-letter {
  background: var(--qz-accent);
  color: #08152a;
  border-color: var(--qz-accent);
}

/* Correct answer revealed \u2014 green. Applies whether or not the player picked it. */
.qz-answer.qz-correct {
  border-color: var(--qz-correct) !important;
  background: rgba(92, 240, 164, 0.18) !important;
  opacity: 1 !important;
  animation: qz-correct-pop 0.4s var(--qz-ease);
}
.qz-answer.qz-correct .qz-answer-letter {
  background: var(--qz-correct) !important;
  color: #08152a !important;
  border-color: var(--qz-correct) !important;
}

/* Player picked this AND it's correct \u2014 extra glow on top of .qz-correct */
.qz-answer.qz-correct-mine {
  box-shadow: 0 0 0 3px rgba(92, 240, 164, 0.45), 0 8px 28px -8px rgba(92, 240, 164, 0.55) !important;
  background: rgba(92, 240, 164, 0.28) !important;
}

/* Player's wrong pick \u2014 red */
.qz-answer.qz-wrong {
  border-color: var(--qz-wrong) !important;
  background: rgba(255, 92, 124, 0.15) !important;
  opacity: 1 !important;
}
.qz-answer.qz-wrong .qz-answer-letter {
  background: var(--qz-wrong) !important;
  color: #fff !important;
  border-color: var(--qz-wrong) !important;
}

/* Non-selected, non-correct answers during reveal \u2014 faded, clearly out of the running */
.qz-answer.qz-neutral {
  opacity: 0.35 !important;
}

/* Progress bar turns red in last 5s */
.qz-progress-fill-low {
  background: linear-gradient(90deg, var(--qz-wrong), #ff8c7c) !important;
}

/* Peeked answer (lifeline reveal) */
.qz-answer.qz-peeked {
  border-color: #f0c040;
  background: rgba(240, 192, 64, 0.12);
  box-shadow: 0 0 0 2px rgba(240, 192, 64, 0.35);
}
.qz-answer.qz-peeked .qz-answer-letter {
  background: #f0c040;
  color: #08152a;
  border-color: #f0c040;
}

.qz-peeked-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  color: #f0c040;
  background: rgba(240, 192, 64, 0.15);
  padding: 2px 8px;
  border-radius: 99px;
  border: 1px solid rgba(240, 192, 64, 0.4);
  flex-shrink: 0;
}

@keyframes qz-correct-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.04); }
  100% { transform: scale(1); }
}

/* ---------------- lifelines ---------------- */
.qz-lifelines {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.qz-lifeline-btn {
  appearance: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--qz-card);
  border: 2px solid var(--qz-border);
  border-radius: 99px;
  color: var(--qz-text);
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition:
    border-color 0.18s var(--qz-ease),
    background 0.18s var(--qz-ease),
    transform 0.12s var(--qz-ease),
    opacity 0.18s var(--qz-ease);
}

.qz-lifeline-btn:hover:not(:disabled) {
  border-color: var(--qz-accent);
  background: rgba(92, 240, 212, 0.08);
  transform: translateY(-1px);
}

.qz-lifeline-btn:disabled {
  cursor: not-allowed;
}

.qz-lifeline-btn.qz-lifeline-used {
  opacity: 0.4;
  border-style: dashed;
}

.qz-lifeline-btn.qz-lifeline-active {
  border-color: #f0c040;
  background: rgba(240, 192, 64, 0.12);
  color: #f0c040;
  animation: qz-lifeline-glow 1.2s ease-in-out infinite alternate;
}

@keyframes qz-lifeline-glow {
  0% { box-shadow: 0 0 6px rgba(240, 192, 64, 0.3); }
  100% { box-shadow: 0 0 18px rgba(240, 192, 64, 0.6); }
}

.qz-lifeline-icon { font-size: 16px; }
.qz-lifeline-label { white-space: nowrap; }

/* ---------------- answer feedback waiting card ---------------- */
.qz-answer-feedback-card {
  margin-top: 12px;
  text-align: center;
  padding: 16px 22px;
}

.qz-feedback-waiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--qz-text-dim);
  font-size: 14px;
}

.qz-feedback-spinner {
  font-size: 20px;
  animation: qz-spin-slow 2s linear infinite;
}

@keyframes qz-spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.qz-feedback-lifeline-note {
  color: #f0c040;
  font-weight: 700;
  font-size: 13px;
  margin-top: 4px;
}

/* ---------------- reveal / scoreboard ---------------- */

.qz-result-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding: 18px 22px;
  border-radius: var(--qz-radius);
  border: 2px solid;
  font-weight: 700;
  font-size: 18px;
  animation: qz-correct-pop 0.35s var(--qz-ease);
}

.qz-result-correct {
  border-color: var(--qz-correct);
  background: rgba(92, 240, 164, 0.15);
  color: var(--qz-correct);
}

.qz-result-wrong {
  border-color: var(--qz-wrong);
  background: rgba(255, 92, 124, 0.12);
  color: var(--qz-wrong);
}

.qz-result-timeout {
  border-color: var(--qz-text-dim);
  background: rgba(255,255,255,0.04);
  color: var(--qz-text-dim);
}

.qz-result-icon { font-size: 28px; flex-shrink: 0; }
.qz-result-text { flex: 1; }

.qz-reveal-banner {
  margin-top: 12px;
  text-align: center;
  padding: 22px;
  background: var(--qz-card);
  border-radius: var(--qz-radius);
  border: 1px solid var(--qz-border);
}

.qz-reveal-explanation {
  margin-top: 10px;
  color: var(--qz-text-dim);
  font-size: 14px;
  line-height: 1.55;
}

.qz-scoreboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qz-scoreboard-row {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--qz-card-2);
  border: 1px solid transparent;
  border-radius: 12px;
  transition: background 0.3s var(--qz-ease), border-color 0.3s var(--qz-ease);
}

.qz-scoreboard-row.qz-top {
  background: linear-gradient(135deg, rgba(92, 240, 212, 0.14), rgba(255, 92, 240, 0.08));
  border-color: rgba(92, 240, 212, 0.28);
}

.qz-scoreboard-row.qz-highlight {
  border-color: var(--qz-accent);
}

.qz-rank {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 22px;
  color: var(--qz-text-dim);
  font-variant-numeric: tabular-nums;
}

.qz-rank.qz-rank-1 { color: var(--qz-accent-3); }
.qz-rank.qz-rank-2 { color: #c0c0d0; }
.qz-rank.qz-rank-3 { color: #cd9a72; }

.qz-streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding: 2px 8px;
  background: rgba(255, 212, 92, 0.15);
  border-radius: 999px;
  font-family: var(--qz-font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--qz-accent-3);
}

/* ---------------- player join ---------------- */

.qz-join-screen {
  max-width: 440px;
  margin: 0 auto;
  padding-top: 6vh;
}

.qz-join-hero {
  text-align: center;
  margin-bottom: 28px;
}

.qz-join-hero h1 {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: clamp(44px, 9vw, 64px);
  margin: 0 0 8px;
  background: linear-gradient(135deg, var(--qz-accent) 0%, var(--qz-accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.03em;
}

.qz-join-hero p {
  color: var(--qz-text-dim);
  margin: 0;
}

/* ---------------- toast ---------------- */

.qz-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--qz-card);
  border: 1px solid var(--qz-border);
  padding: 12px 22px;
  border-radius: 999px;
  box-shadow: var(--qz-shadow);
  font-family: var(--qz-font-mono);
  font-size: 13px;
  animation: qz-toast-in 0.3s var(--qz-ease);
  z-index: 1000;
  max-width: calc(100vw - 32px);
  text-align: center;
}

@keyframes qz-toast-in {
  from { opacity: 0; transform: translate(-50%, 16px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* ---------------- finale ---------------- */

.qz-finale {
  text-align: center;
  padding: 40px 24px;
}

.qz-trophy {
  font-size: 88px;
  margin-bottom: 8px;
  line-height: 1;
  animation: qz-trophy-float 4s ease-in-out infinite;
}

@keyframes qz-trophy-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.qz-winner-name {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: clamp(40px, 8vw, 60px);
  letter-spacing: -0.03em;
  margin: 0 0 10px;
  background: linear-gradient(135deg, var(--qz-accent-3) 0%, var(--qz-accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.qz-winner-score {
  font-family: var(--qz-font-mono);
  font-size: 18px;
  color: var(--qz-text-dim);
  margin-bottom: 28px;
}

/* ---------------- empty / loading ---------------- */

.qz-empty {
  text-align: center;
  padding: 48px 24px;
  color: var(--qz-text-dim);
}

/* ---------------- reduced motion ---------------- */

@media (prefers-reduced-motion: reduce) {
  .qz-app *,
  :host * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* ---------------- personality picker ---------------- */

.qz-personality-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@media (max-width: 640px) {
  .qz-personality-grid { grid-template-columns: 1fr; }
}

.qz-personality-tile {
  appearance: none;
  background: var(--qz-card);
  border: 2px solid var(--qz-border);
  border-radius: var(--qz-radius-sm);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  color: var(--qz-text);
  transition: border-color 0.18s var(--qz-ease), background 0.18s var(--qz-ease);
}

.qz-personality-tile:hover {
  border-color: var(--qz-border-strong);
  background: var(--qz-card-2);
}

.qz-personality-tile.qz-active {
  border-color: var(--qz-accent);
  background: rgba(92, 240, 212, 0.08);
}

.qz-personality-label {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 3px;
}

.qz-personality-desc {
  font-size: 12px;
  color: var(--qz-text-dim);
}

/* ---------------- announcing screen (pre-roll TTS) ---------------- */

.qz-announcing {
  text-align: center;
  padding: 36px 24px;
}

.qz-announcing-emoji {
  font-size: 72px;
  margin-bottom: 6px;
  line-height: 1;
  animation: qz-announcing-bob 1.6s ease-in-out infinite;
}

@keyframes qz-announcing-bob {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50%      { transform: translateY(-4px) rotate(3deg); }
}

.qz-announcing-dots {
  display: inline-flex;
  gap: 6px;
  margin-top: 20px;
}

.qz-announcing-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--qz-accent);
  display: inline-block;
  animation: qz-dot-pulse 1.2s ease-in-out infinite;
}

.qz-announcing-dots span:nth-child(2) { animation-delay: 0.15s; }
.qz-announcing-dots span:nth-child(3) { animation-delay: 0.30s; }

@keyframes qz-dot-pulse {
  0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
  40%           { opacity: 1;    transform: scale(1.1); }
}

/* ---------------- pause overlay / button / states ---------------- */

.qz-pause-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: var(--qz-radius);
  background: linear-gradient(
    135deg,
    rgba(92, 157, 255, 0.18) 0%,
    rgba(255, 92, 240, 0.10) 100%
  );
  border: 1px solid rgba(92, 157, 255, 0.35);
  animation: qz-pause-pulse 2.4s ease-in-out infinite;
}

@keyframes qz-pause-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(92, 157, 255, 0.0); }
  50%      { box-shadow: 0 0 0 8px rgba(92, 157, 255, 0.10); }
}

.qz-pause-icon {
  font-size: 36px;
  line-height: 1;
}

.qz-pause-title {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 20px;
  color: var(--qz-text);
}

.qz-pause-sub {
  font-size: 13px;
  color: var(--qz-text-dim);
  margin-top: 2px;
}

.qz-btn-pause {
  background: rgba(92, 157, 255, 0.18);
  border: 1px solid rgba(92, 157, 255, 0.4);
  color: var(--qz-text);
}

.qz-btn-pause:hover {
  background: rgba(92, 157, 255, 0.28);
}

.qz-btn-pause-resume {
  background: rgba(92, 240, 164, 0.18);
  border-color: rgba(92, 240, 164, 0.4);
}

.qz-btn-pause-resume:hover {
  background: rgba(92, 240, 164, 0.28);
}

/* Visual hint that the question stage is paused */
.qz-question-stage.qz-paused .qz-answer,
.qz-question-stage.qz-paused .qz-lifelines {
  opacity: 0.45;
  filter: saturate(0.6);
  pointer-events: none;
}

.qz-progress-fill-paused {
  filter: saturate(0.6) brightness(0.85);
}

.qz-timer-paused {
  color: var(--qz-accent-cool);
}

/* Lifeline pending state (server hasn't acked yet) */
.qz-lifeline-pending {
  opacity: 0.7;
  animation: qz-pending-pulse 0.9s ease-in-out infinite;
}

@keyframes qz-pending-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(0.97); }
}

/* ---------------- badges grid (finale) ---------------- */

.qz-badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.qz-badge {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border-radius: var(--qz-radius-sm);
  background: var(--qz-card-2);
  border: 1px solid var(--qz-border);
  transition: transform 0.18s var(--qz-ease), border-color 0.18s var(--qz-ease);
}

.qz-badge:hover {
  transform: translateY(-2px);
  border-color: var(--qz-border-strong);
}

.qz-badge-mine {
  border-color: var(--qz-accent);
  background: linear-gradient(
    135deg,
    rgba(92, 240, 212, 0.10) 0%,
    rgba(255, 212, 92, 0.06) 100%
  );
  box-shadow: var(--qz-glow-accent);
}

.qz-badge-emoji {
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
}

.qz-badge-body {
  min-width: 0;
  flex: 1;
}

.qz-badge-title {
  font-family: var(--qz-font-display);
  font-weight: 800;
  font-size: 14px;
  color: var(--qz-text);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.qz-badge-name {
  font-weight: 700;
  font-size: 16px;
  color: var(--qz-text);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qz-badge-value {
  font-family: var(--qz-font-mono);
  font-size: 13px;
  color: var(--qz-accent);
  margin-top: 2px;
}

.qz-badge-blurb {
  font-size: 11px;
  color: var(--qz-text-faint);
  margin-top: 4px;
}

/* ---------------- my-stats card (finale, players only) ---------------- */

.qz-my-stats-card {
  margin-top: 16px;
}

.qz-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px 16px;
}

.qz-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--qz-border);
}

.qz-stat-label {
  font-size: 12px;
  color: var(--qz-text-dim);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.qz-stat-value {
  font-family: var(--qz-font-mono);
  font-weight: 700;
  font-size: 14px;
  color: var(--qz-text);
}
`;var ja=A(le(),1),Fd=!1;function Lm(){if(Fd)return;Fd=!0;let e=document.createElement("style");e.setAttribute("data-quizify",""),e.textContent=La,document.head.appendChild(e)}var Ra=class extends HTMLElement{constructor(){super(),this._hass=null,this._narrow=!1,this._root=null,this._mountPoint=null}set hass(t){this._hass=t,this._render()}get hass(){return this._hass}set narrow(t){this._narrow=t,this._render()}set route(t){}set panel(t){}connectedCallback(){if(!this.shadowRoot){let t=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=La,t.appendChild(n);let r=document.createElement("div");r.className="qz-shadow-host",t.appendChild(r),this._mountPoint=r,this._root=(0,ba.createRoot)(r)}this._render()}disconnectedCallback(){this._root&&queueMicrotask(()=>{try{this._root.unmount()}catch{}this._root=null})}_render(){this._root&&this._root.render((0,ja.jsx)(Md,{hass:this._hass,narrow:this._narrow}))}};customElements.get("quizify-panel")||customElements.define("quizify-panel",Ra);function Rm(){try{let n=(new URLSearchParams(window.location.search).get("code")||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);if(n)return n}catch{}return""}function Ud(){let e=document.getElementById("quizify-root");if(!e||(e.dataset.view||"")!=="player")return;let n=Rm()||e.dataset.joinCode||"";Lm(),(0,ba.createRoot)(e).render((0,ja.jsx)(Ad,{initialJoinCode:n}))}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ud):Ud());})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
