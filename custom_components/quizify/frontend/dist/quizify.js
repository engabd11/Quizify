(()=>{var Fd=Object.create;var La=Object.defineProperty;var Ud=Object.getOwnPropertyDescriptor;var Bd=Object.getOwnPropertyNames;var Vd=Object.getPrototypeOf,$d=Object.prototype.hasOwnProperty;var rt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Hd=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Bd(t))!$d.call(e,o)&&o!==n&&La(e,o,{get:()=>t[o],enumerable:!(r=Ud(t,o))||r.enumerable});return e};var A=(e,t,n)=>(n=e!=null?Fd(Vd(e)):{},Hd(t||!e||!e.__esModule?La(n,"default",{value:e,enumerable:!0}):n,e));var $a=rt(R=>{"use strict";var On=Symbol.for("react.element"),Wd=Symbol.for("react.portal"),Qd=Symbol.for("react.fragment"),bd=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),Gd=Symbol.for("react.provider"),Kd=Symbol.for("react.context"),Xd=Symbol.for("react.forward_ref"),Zd=Symbol.for("react.suspense"),Jd=Symbol.for("react.memo"),ef=Symbol.for("react.lazy"),Ra=Symbol.iterator;function tf(e){return e===null||typeof e!="object"?null:(e=Ra&&e[Ra]||e["@@iterator"],typeof e=="function"?e:null)}var Ma={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Da=Object.assign,ja={};function tn(e,t,n){this.props=e,this.context=t,this.refs=ja,this.updater=n||Ma}tn.prototype.isReactComponent={};tn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};tn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Aa(){}Aa.prototype=tn.prototype;function tl(e,t,n){this.props=e,this.context=t,this.refs=ja,this.updater=n||Ma}var nl=tl.prototype=new Aa;nl.constructor=tl;Da(nl,tn.prototype);nl.isPureReactComponent=!0;var Oa=Array.isArray,Fa=Object.prototype.hasOwnProperty,rl={current:null},Ua={key:!0,ref:!0,__self:!0,__source:!0};function Ba(e,t,n){var r,o={},l=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(l=""+t.key),t)Fa.call(t,r)&&!Ua.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var s=Array(a),c=0;c<a;c++)s[c]=arguments[c+2];o.children=s}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:On,type:e,key:l,ref:i,props:o,_owner:rl.current}}function nf(e,t){return{$$typeof:On,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ol(e){return typeof e=="object"&&e!==null&&e.$$typeof===On}function rf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ia=/\/+/g;function el(e,t){return typeof e=="object"&&e!==null&&e.key!=null?rf(""+e.key):t.toString(36)}function Nr(e,t,n,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case On:case Wd:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+el(i,0):r,Oa(o)?(n="",e!=null&&(n=e.replace(Ia,"$&/")+"/"),Nr(o,t,n,"",function(c){return c})):o!=null&&(ol(o)&&(o=nf(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(Ia,"$&/")+"/")+e)),t.push(o)),1;if(i=0,r=r===""?".":r+":",Oa(e))for(var a=0;a<e.length;a++){l=e[a];var s=r+el(l,a);i+=Nr(l,t,n,s,o)}else if(s=tf(e),typeof s=="function")for(e=s.call(e),a=0;!(l=e.next()).done;)l=l.value,s=r+el(l,a++),i+=Nr(l,t,n,s,o);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function _r(e,t,n){if(e==null)return e;var r=[],o=0;return Nr(e,r,"","",function(l){return t.call(n,l,o++)}),r}function of(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var me={current:null},Er={transition:null},lf={ReactCurrentDispatcher:me,ReactCurrentBatchConfig:Er,ReactCurrentOwner:rl};function Va(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:_r,forEach:function(e,t,n){_r(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return _r(e,function(){t++}),t},toArray:function(e){return _r(e,function(t){return t})||[]},only:function(e){if(!ol(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=tn;R.Fragment=Qd;R.Profiler=Yd;R.PureComponent=tl;R.StrictMode=bd;R.Suspense=Zd;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lf;R.act=Va;R.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Da({},e.props),o=e.key,l=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,i=rl.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)Fa.call(t,s)&&!Ua.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){a=Array(s);for(var c=0;c<s;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:On,type:e.type,key:o,ref:l,props:r,_owner:i}};R.createContext=function(e){return e={$$typeof:Kd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Gd,_context:e},e.Consumer=e};R.createElement=Ba;R.createFactory=function(e){var t=Ba.bind(null,e);return t.type=e,t};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:Xd,render:e}};R.isValidElement=ol;R.lazy=function(e){return{$$typeof:ef,_payload:{_status:-1,_result:e},_init:of}};R.memo=function(e,t){return{$$typeof:Jd,type:e,compare:t===void 0?null:t}};R.startTransition=function(e){var t=Er.transition;Er.transition={};try{e()}finally{Er.transition=t}};R.unstable_act=Va;R.useCallback=function(e,t){return me.current.useCallback(e,t)};R.useContext=function(e){return me.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return me.current.useDeferredValue(e)};R.useEffect=function(e,t){return me.current.useEffect(e,t)};R.useId=function(){return me.current.useId()};R.useImperativeHandle=function(e,t,n){return me.current.useImperativeHandle(e,t,n)};R.useInsertionEffect=function(e,t){return me.current.useInsertionEffect(e,t)};R.useLayoutEffect=function(e,t){return me.current.useLayoutEffect(e,t)};R.useMemo=function(e,t){return me.current.useMemo(e,t)};R.useReducer=function(e,t,n){return me.current.useReducer(e,t,n)};R.useRef=function(e){return me.current.useRef(e)};R.useState=function(e){return me.current.useState(e)};R.useSyncExternalStore=function(e,t,n){return me.current.useSyncExternalStore(e,t,n)};R.useTransition=function(){return me.current.useTransition()};R.version="18.3.1"});var Oe=rt((Cm,Ha)=>{"use strict";Ha.exports=$a()});var es=rt(F=>{"use strict";function sl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<Cr(o,t))e[r]=t,e[n]=o,n=r;else break e}}function Be(e){return e.length===0?null:e[0]}function Tr(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,l=o>>>1;r<l;){var i=2*(r+1)-1,a=e[i],s=i+1,c=e[s];if(0>Cr(a,n))s<o&&0>Cr(c,a)?(e[r]=c,e[s]=n,r=s):(e[r]=a,e[i]=n,r=i);else if(s<o&&0>Cr(c,n))e[r]=c,e[s]=n,r=s;else break e}}return t}function Cr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Wa=performance,F.unstable_now=function(){return Wa.now()}):(ll=Date,Qa=ll.now(),F.unstable_now=function(){return ll.now()-Qa});var Wa,ll,Qa,Ge=[],mt=[],af=1,Ie=null,ue=3,Lr=!1,Ft=!1,Mn=!1,Ga=typeof setTimeout=="function"?setTimeout:null,Ka=typeof clearTimeout=="function"?clearTimeout:null,ba=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ul(e){for(var t=Be(mt);t!==null;){if(t.callback===null)Tr(mt);else if(t.startTime<=e)Tr(mt),t.sortIndex=t.expirationTime,sl(Ge,t);else break;t=Be(mt)}}function cl(e){if(Mn=!1,ul(e),!Ft)if(Be(Ge)!==null)Ft=!0,fl(dl);else{var t=Be(mt);t!==null&&pl(cl,t.startTime-e)}}function dl(e,t){Ft=!1,Mn&&(Mn=!1,Ka(Dn),Dn=-1),Lr=!0;var n=ue;try{for(ul(t),Ie=Be(Ge);Ie!==null&&(!(Ie.expirationTime>t)||e&&!Ja());){var r=Ie.callback;if(typeof r=="function"){Ie.callback=null,ue=Ie.priorityLevel;var o=r(Ie.expirationTime<=t);t=F.unstable_now(),typeof o=="function"?Ie.callback=o:Ie===Be(Ge)&&Tr(Ge),ul(t)}else Tr(Ge);Ie=Be(Ge)}if(Ie!==null)var l=!0;else{var i=Be(mt);i!==null&&pl(cl,i.startTime-t),l=!1}return l}finally{Ie=null,ue=n,Lr=!1}}var Rr=!1,Pr=null,Dn=-1,Xa=5,Za=-1;function Ja(){return!(F.unstable_now()-Za<Xa)}function il(){if(Pr!==null){var e=F.unstable_now();Za=e;var t=!0;try{t=Pr(!0,e)}finally{t?In():(Rr=!1,Pr=null)}}else Rr=!1}var In;typeof ba=="function"?In=function(){ba(il)}:typeof MessageChannel<"u"?(al=new MessageChannel,Ya=al.port2,al.port1.onmessage=il,In=function(){Ya.postMessage(null)}):In=function(){Ga(il,0)};var al,Ya;function fl(e){Pr=e,Rr||(Rr=!0,In())}function pl(e,t){Dn=Ga(function(){e(F.unstable_now())},t)}F.unstable_IdlePriority=5;F.unstable_ImmediatePriority=1;F.unstable_LowPriority=4;F.unstable_NormalPriority=3;F.unstable_Profiling=null;F.unstable_UserBlockingPriority=2;F.unstable_cancelCallback=function(e){e.callback=null};F.unstable_continueExecution=function(){Ft||Lr||(Ft=!0,fl(dl))};F.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Xa=0<e?Math.floor(1e3/e):5};F.unstable_getCurrentPriorityLevel=function(){return ue};F.unstable_getFirstCallbackNode=function(){return Be(Ge)};F.unstable_next=function(e){switch(ue){case 1:case 2:case 3:var t=3;break;default:t=ue}var n=ue;ue=t;try{return e()}finally{ue=n}};F.unstable_pauseExecution=function(){};F.unstable_requestPaint=function(){};F.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ue;ue=e;try{return t()}finally{ue=n}};F.unstable_scheduleCallback=function(e,t,n){var r=F.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:af++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,sl(mt,e),Be(Ge)===null&&e===Be(mt)&&(Mn?(Ka(Dn),Dn=-1):Mn=!0,pl(cl,n-r))):(e.sortIndex=o,sl(Ge,e),Ft||Lr||(Ft=!0,fl(dl))),e};F.unstable_shouldYield=Ja;F.unstable_wrapCallback=function(e){var t=ue;return function(){var n=ue;ue=t;try{return e.apply(this,arguments)}finally{ue=n}}}});var ns=rt((Tm,ts)=>{"use strict";ts.exports=es()});var id=rt(Te=>{"use strict";var sf=Oe(),Ce=ns();function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var uu=new Set,or={};function Zt(e,t){qn(e,t),qn(e+"Capture",t)}function qn(e,t){for(or[e]=t,e=0;e<t.length;e++)uu.add(t[e])}var ut=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Dl=Object.prototype.hasOwnProperty,uf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,rs={},os={};function cf(e){return Dl.call(os,e)?!0:Dl.call(rs,e)?!1:uf.test(e)?os[e]=!0:(rs[e]=!0,!1)}function df(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ff(e,t,n,r){if(t===null||typeof t>"u"||df(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function he(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var se={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){se[e]=new he(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];se[t]=new he(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){se[e]=new he(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){se[e]=new he(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){se[e]=new he(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){se[e]=new he(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){se[e]=new he(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){se[e]=new he(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){se[e]=new he(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ci=/[\-:]([a-z])/g;function Pi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ci,Pi);se[t]=new he(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ci,Pi);se[t]=new he(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ci,Pi);se[t]=new he(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){se[e]=new he(e,1,!1,e.toLowerCase(),null,!1,!1)});se.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){se[e]=new he(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ti(e,t,n,r){var o=se.hasOwnProperty(t)?se[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ff(t,n,o,r)&&(n=null),r||o===null?cf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var pt=sf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Or=Symbol.for("react.element"),on=Symbol.for("react.portal"),ln=Symbol.for("react.fragment"),Li=Symbol.for("react.strict_mode"),jl=Symbol.for("react.profiler"),cu=Symbol.for("react.provider"),du=Symbol.for("react.context"),Ri=Symbol.for("react.forward_ref"),Al=Symbol.for("react.suspense"),Fl=Symbol.for("react.suspense_list"),Oi=Symbol.for("react.memo"),gt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var fu=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var ls=Symbol.iterator;function jn(e){return e===null||typeof e!="object"?null:(e=ls&&e[ls]||e["@@iterator"],typeof e=="function"?e:null)}var b=Object.assign,ml;function Wn(e){if(ml===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ml=t&&t[1]||""}return`
`+ml+e}var vl=!1;function gl(e,t){if(!e||vl)return"";vl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,a=l.length-1;1<=i&&0<=a&&o[i]!==l[a];)a--;for(;1<=i&&0<=a;i--,a--)if(o[i]!==l[a]){if(i!==1||a!==1)do if(i--,a--,0>a||o[i]!==l[a]){var s=`
`+o[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=i&&0<=a);break}}}finally{vl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Wn(e):""}function pf(e){switch(e.tag){case 5:return Wn(e.type);case 16:return Wn("Lazy");case 13:return Wn("Suspense");case 19:return Wn("SuspenseList");case 0:case 2:case 15:return e=gl(e.type,!1),e;case 11:return e=gl(e.type.render,!1),e;case 1:return e=gl(e.type,!0),e;default:return""}}function Ul(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ln:return"Fragment";case on:return"Portal";case jl:return"Profiler";case Li:return"StrictMode";case Al:return"Suspense";case Fl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case du:return(e.displayName||"Context")+".Consumer";case cu:return(e._context.displayName||"Context")+".Provider";case Ri:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Oi:return t=e.displayName||null,t!==null?t:Ul(e.type)||"Memo";case gt:t=e._payload,e=e._init;try{return Ul(e(t))}catch{}}return null}function mf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ul(t);case 8:return t===Li?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Tt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function pu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function vf(e){var t=pu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ir(e){e._valueTracker||(e._valueTracker=vf(e))}function mu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=pu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function so(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bl(e,t){var n=t.checked;return b({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function is(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Tt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function vu(e,t){t=t.checked,t!=null&&Ti(e,"checked",t,!1)}function Vl(e,t){vu(e,t);var n=Tt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?$l(e,t.type,n):t.hasOwnProperty("defaultValue")&&$l(e,t.type,Tt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function as(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function $l(e,t,n){(t!=="number"||so(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Qn=Array.isArray;function hn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Tt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Hl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(y(91));return b({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ss(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(y(92));if(Qn(n)){if(1<n.length)throw Error(y(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Tt(n)}}function gu(e,t){var n=Tt(t.value),r=Tt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function us(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function hu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?hu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mr,yu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Mr=Mr||document.createElement("div"),Mr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Mr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function lr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Gn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gf=["Webkit","ms","Moz","O"];Object.keys(Gn).forEach(function(e){gf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Gn[t]=Gn[e]})});function zu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Gn.hasOwnProperty(e)&&Gn[e]?(""+t).trim():t+"px"}function wu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=zu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var hf=b({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ql(e,t){if(t){if(hf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(y(62))}}function bl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yl=null;function Ii(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Gl=null,yn=null,zn=null;function cs(e){if(e=qr(e)){if(typeof Gl!="function")throw Error(y(280));var t=e.stateNode;t&&(t=jo(t),Gl(e.stateNode,e.type,t))}}function xu(e){yn?zn?zn.push(e):zn=[e]:yn=e}function ku(){if(yn){var e=yn,t=zn;if(zn=yn=null,cs(e),t)for(e=0;e<t.length;e++)cs(t[e])}}function qu(e,t){return e(t)}function Su(){}var hl=!1;function _u(e,t,n){if(hl)return e(t,n);hl=!0;try{return qu(e,t,n)}finally{hl=!1,(yn!==null||zn!==null)&&(Su(),ku())}}function ir(e,t){var n=e.stateNode;if(n===null)return null;var r=jo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(y(231,t,typeof n));return n}var Kl=!1;if(ut)try{nn={},Object.defineProperty(nn,"passive",{get:function(){Kl=!0}}),window.addEventListener("test",nn,nn),window.removeEventListener("test",nn,nn)}catch{Kl=!1}var nn;function yf(e,t,n,r,o,l,i,a,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Kn=!1,uo=null,co=!1,Xl=null,zf={onError:function(e){Kn=!0,uo=e}};function wf(e,t,n,r,o,l,i,a,s){Kn=!1,uo=null,yf.apply(zf,arguments)}function xf(e,t,n,r,o,l,i,a,s){if(wf.apply(this,arguments),Kn){if(Kn){var c=uo;Kn=!1,uo=null}else throw Error(y(198));co||(co=!0,Xl=c)}}function Jt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Nu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ds(e){if(Jt(e)!==e)throw Error(y(188))}function kf(e){var t=e.alternate;if(!t){if(t=Jt(e),t===null)throw Error(y(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return ds(o),e;if(l===r)return ds(o),t;l=l.sibling}throw Error(y(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,a=o.child;a;){if(a===n){i=!0,n=o,r=l;break}if(a===r){i=!0,r=o,n=l;break}a=a.sibling}if(!i){for(a=l.child;a;){if(a===n){i=!0,n=l,r=o;break}if(a===r){i=!0,r=l,n=o;break}a=a.sibling}if(!i)throw Error(y(189))}}if(n.alternate!==r)throw Error(y(190))}if(n.tag!==3)throw Error(y(188));return n.stateNode.current===n?e:t}function Eu(e){return e=kf(e),e!==null?Cu(e):null}function Cu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Cu(e);if(t!==null)return t;e=e.sibling}return null}var Pu=Ce.unstable_scheduleCallback,fs=Ce.unstable_cancelCallback,qf=Ce.unstable_shouldYield,Sf=Ce.unstable_requestPaint,X=Ce.unstable_now,_f=Ce.unstable_getCurrentPriorityLevel,Mi=Ce.unstable_ImmediatePriority,Tu=Ce.unstable_UserBlockingPriority,fo=Ce.unstable_NormalPriority,Nf=Ce.unstable_LowPriority,Lu=Ce.unstable_IdlePriority,Oo=null,Je=null;function Ef(e){if(Je&&typeof Je.onCommitFiberRoot=="function")try{Je.onCommitFiberRoot(Oo,e,void 0,(e.current.flags&128)===128)}catch{}}var Qe=Math.clz32?Math.clz32:Tf,Cf=Math.log,Pf=Math.LN2;function Tf(e){return e>>>=0,e===0?32:31-(Cf(e)/Pf|0)|0}var Dr=64,jr=4194304;function bn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function po(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var a=i&~o;a!==0?r=bn(a):(l&=i,l!==0&&(r=bn(l)))}else i=n&~o,i!==0?r=bn(i):l!==0&&(r=bn(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qe(t),o=1<<n,r|=e[n],t&=~o;return r}function Lf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-Qe(l),a=1<<i,s=o[i];s===-1?(!(a&n)||a&r)&&(o[i]=Lf(a,t)):s<=t&&(e.expiredLanes|=a),l&=~a}}function Zl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ru(){var e=Dr;return Dr<<=1,!(Dr&4194240)&&(Dr=64),e}function yl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function xr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qe(t),e[t]=n}function Of(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Qe(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function Di(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var D=0;function Ou(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Iu,ji,Mu,Du,ju,Jl=!1,Ar=[],kt=null,qt=null,St=null,ar=new Map,sr=new Map,yt=[],If="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ps(e,t){switch(e){case"focusin":case"focusout":kt=null;break;case"dragenter":case"dragleave":qt=null;break;case"mouseover":case"mouseout":St=null;break;case"pointerover":case"pointerout":ar.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":sr.delete(t.pointerId)}}function An(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=qr(t),t!==null&&ji(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Mf(e,t,n,r,o){switch(t){case"focusin":return kt=An(kt,e,t,n,r,o),!0;case"dragenter":return qt=An(qt,e,t,n,r,o),!0;case"mouseover":return St=An(St,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return ar.set(l,An(ar.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,sr.set(l,An(sr.get(l)||null,e,t,n,r,o)),!0}return!1}function Au(e){var t=Vt(e.target);if(t!==null){var n=Jt(t);if(n!==null){if(t=n.tag,t===13){if(t=Nu(n),t!==null){e.blockedOn=t,ju(e.priority,function(){Mu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Zr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ei(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yl=r,n.target.dispatchEvent(r),Yl=null}else return t=qr(n),t!==null&&ji(t),e.blockedOn=n,!1;t.shift()}return!0}function ms(e,t,n){Zr(e)&&n.delete(t)}function Df(){Jl=!1,kt!==null&&Zr(kt)&&(kt=null),qt!==null&&Zr(qt)&&(qt=null),St!==null&&Zr(St)&&(St=null),ar.forEach(ms),sr.forEach(ms)}function Fn(e,t){e.blockedOn===t&&(e.blockedOn=null,Jl||(Jl=!0,Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority,Df)))}function ur(e){function t(o){return Fn(o,e)}if(0<Ar.length){Fn(Ar[0],e);for(var n=1;n<Ar.length;n++){var r=Ar[n];r.blockedOn===e&&(r.blockedOn=null)}}for(kt!==null&&Fn(kt,e),qt!==null&&Fn(qt,e),St!==null&&Fn(St,e),ar.forEach(t),sr.forEach(t),n=0;n<yt.length;n++)r=yt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<yt.length&&(n=yt[0],n.blockedOn===null);)Au(n),n.blockedOn===null&&yt.shift()}var wn=pt.ReactCurrentBatchConfig,mo=!0;function jf(e,t,n,r){var o=D,l=wn.transition;wn.transition=null;try{D=1,Ai(e,t,n,r)}finally{D=o,wn.transition=l}}function Af(e,t,n,r){var o=D,l=wn.transition;wn.transition=null;try{D=4,Ai(e,t,n,r)}finally{D=o,wn.transition=l}}function Ai(e,t,n,r){if(mo){var o=ei(e,t,n,r);if(o===null)_l(e,t,r,vo,n),ps(e,r);else if(Mf(o,e,t,n,r))r.stopPropagation();else if(ps(e,r),t&4&&-1<If.indexOf(e)){for(;o!==null;){var l=qr(o);if(l!==null&&Iu(l),l=ei(e,t,n,r),l===null&&_l(e,t,r,vo,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else _l(e,t,r,null,n)}}var vo=null;function ei(e,t,n,r){if(vo=null,e=Ii(r),e=Vt(e),e!==null)if(t=Jt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Nu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return vo=e,null}function Fu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_f()){case Mi:return 1;case Tu:return 4;case fo:case Nf:return 16;case Lu:return 536870912;default:return 16}default:return 16}}var wt=null,Fi=null,Jr=null;function Uu(){if(Jr)return Jr;var e,t=Fi,n=t.length,r,o="value"in wt?wt.value:wt.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return Jr=o.slice(e,1<r?1-r:void 0)}function eo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fr(){return!0}function vs(){return!1}function Pe(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Fr:vs,this.isPropagationStopped=vs,this}return b(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Fr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Fr)},persist:function(){},isPersistent:Fr}),t}var Tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ui=Pe(Tn),kr=b({},Tn,{view:0,detail:0}),Ff=Pe(kr),zl,wl,Un,Io=b({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Un&&(Un&&e.type==="mousemove"?(zl=e.screenX-Un.screenX,wl=e.screenY-Un.screenY):wl=zl=0,Un=e),zl)},movementY:function(e){return"movementY"in e?e.movementY:wl}}),gs=Pe(Io),Uf=b({},Io,{dataTransfer:0}),Bf=Pe(Uf),Vf=b({},kr,{relatedTarget:0}),xl=Pe(Vf),$f=b({},Tn,{animationName:0,elapsedTime:0,pseudoElement:0}),Hf=Pe($f),Wf=b({},Tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qf=Pe(Wf),bf=b({},Tn,{data:0}),hs=Pe(bf),Yf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kf[e])?!!t[e]:!1}function Bi(){return Xf}var Zf=b({},kr,{key:function(e){if(e.key){var t=Yf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=eo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bi,charCode:function(e){return e.type==="keypress"?eo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?eo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jf=Pe(Zf),ep=b({},Io,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ys=Pe(ep),tp=b({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bi}),np=Pe(tp),rp=b({},Tn,{propertyName:0,elapsedTime:0,pseudoElement:0}),op=Pe(rp),lp=b({},Io,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ip=Pe(lp),ap=[9,13,27,32],Vi=ut&&"CompositionEvent"in window,Xn=null;ut&&"documentMode"in document&&(Xn=document.documentMode);var sp=ut&&"TextEvent"in window&&!Xn,Bu=ut&&(!Vi||Xn&&8<Xn&&11>=Xn),zs=" ",ws=!1;function Vu(e,t){switch(e){case"keyup":return ap.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $u(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var an=!1;function up(e,t){switch(e){case"compositionend":return $u(t);case"keypress":return t.which!==32?null:(ws=!0,zs);case"textInput":return e=t.data,e===zs&&ws?null:e;default:return null}}function cp(e,t){if(an)return e==="compositionend"||!Vi&&Vu(e,t)?(e=Uu(),Jr=Fi=wt=null,an=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Bu&&t.locale!=="ko"?null:t.data;default:return null}}var dp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dp[e.type]:t==="textarea"}function Hu(e,t,n,r){xu(r),t=go(t,"onChange"),0<t.length&&(n=new Ui("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Zn=null,cr=null;function fp(e){tc(e,0)}function Mo(e){var t=cn(e);if(mu(t))return e}function pp(e,t){if(e==="change")return t}var Wu=!1;ut&&(ut?(Br="oninput"in document,Br||(kl=document.createElement("div"),kl.setAttribute("oninput","return;"),Br=typeof kl.oninput=="function"),Ur=Br):Ur=!1,Wu=Ur&&(!document.documentMode||9<document.documentMode));var Ur,Br,kl;function ks(){Zn&&(Zn.detachEvent("onpropertychange",Qu),cr=Zn=null)}function Qu(e){if(e.propertyName==="value"&&Mo(cr)){var t=[];Hu(t,cr,e,Ii(e)),_u(fp,t)}}function mp(e,t,n){e==="focusin"?(ks(),Zn=t,cr=n,Zn.attachEvent("onpropertychange",Qu)):e==="focusout"&&ks()}function vp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Mo(cr)}function gp(e,t){if(e==="click")return Mo(t)}function hp(e,t){if(e==="input"||e==="change")return Mo(t)}function yp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ye=typeof Object.is=="function"?Object.is:yp;function dr(e,t){if(Ye(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!Dl.call(t,o)||!Ye(e[o],t[o]))return!1}return!0}function qs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ss(e,t){var n=qs(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=qs(n)}}function bu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?bu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yu(){for(var e=window,t=so();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=so(e.document)}return t}function $i(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function zp(e){var t=Yu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&bu(n.ownerDocument.documentElement,n)){if(r!==null&&$i(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Ss(n,l);var i=Ss(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var wp=ut&&"documentMode"in document&&11>=document.documentMode,sn=null,ti=null,Jn=null,ni=!1;function _s(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ni||sn==null||sn!==so(r)||(r=sn,"selectionStart"in r&&$i(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jn&&dr(Jn,r)||(Jn=r,r=go(ti,"onSelect"),0<r.length&&(t=new Ui("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=sn)))}function Vr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var un={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionend:Vr("Transition","TransitionEnd")},ql={},Gu={};ut&&(Gu=document.createElement("div").style,"AnimationEvent"in window||(delete un.animationend.animation,delete un.animationiteration.animation,delete un.animationstart.animation),"TransitionEvent"in window||delete un.transitionend.transition);function Do(e){if(ql[e])return ql[e];if(!un[e])return e;var t=un[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gu)return ql[e]=t[n];return e}var Ku=Do("animationend"),Xu=Do("animationiteration"),Zu=Do("animationstart"),Ju=Do("transitionend"),ec=new Map,Ns="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){ec.set(e,t),Zt(t,[e])}for($r=0;$r<Ns.length;$r++)Hr=Ns[$r],Es=Hr.toLowerCase(),Cs=Hr[0].toUpperCase()+Hr.slice(1),Rt(Es,"on"+Cs);var Hr,Es,Cs,$r;Rt(Ku,"onAnimationEnd");Rt(Xu,"onAnimationIteration");Rt(Zu,"onAnimationStart");Rt("dblclick","onDoubleClick");Rt("focusin","onFocus");Rt("focusout","onBlur");Rt(Ju,"onTransitionEnd");qn("onMouseEnter",["mouseout","mouseover"]);qn("onMouseLeave",["mouseout","mouseover"]);qn("onPointerEnter",["pointerout","pointerover"]);qn("onPointerLeave",["pointerout","pointerover"]);Zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Zt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yn));function Ps(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,xf(r,t,void 0,e),e.currentTarget=null}function tc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var a=r[i],s=a.instance,c=a.currentTarget;if(a=a.listener,s!==l&&o.isPropagationStopped())break e;Ps(o,a,c),l=s}else for(i=0;i<r.length;i++){if(a=r[i],s=a.instance,c=a.currentTarget,a=a.listener,s!==l&&o.isPropagationStopped())break e;Ps(o,a,c),l=s}}}if(co)throw e=Xl,co=!1,Xl=null,e}function V(e,t){var n=t[ai];n===void 0&&(n=t[ai]=new Set);var r=e+"__bubble";n.has(r)||(nc(t,e,2,!1),n.add(r))}function Sl(e,t,n){var r=0;t&&(r|=4),nc(n,e,r,t)}var Wr="_reactListening"+Math.random().toString(36).slice(2);function fr(e){if(!e[Wr]){e[Wr]=!0,uu.forEach(function(n){n!=="selectionchange"&&(xp.has(n)||Sl(n,!1,e),Sl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Wr]||(t[Wr]=!0,Sl("selectionchange",!1,t))}}function nc(e,t,n,r){switch(Fu(t)){case 1:var o=jf;break;case 4:o=Af;break;default:o=Ai}n=o.bind(null,t,n,e),o=void 0,!Kl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function _l(e,t,n,r,o){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var s=i.tag;if((s===3||s===4)&&(s=i.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;i=i.return}for(;a!==null;){if(i=Vt(a),i===null)return;if(s=i.tag,s===5||s===6){r=l=i;continue e}a=a.parentNode}}r=r.return}_u(function(){var c=l,m=Ii(n),p=[];e:{var v=ec.get(e);if(v!==void 0){var h=Ui,x=e;switch(e){case"keypress":if(eo(n)===0)break e;case"keydown":case"keyup":h=Jf;break;case"focusin":x="focus",h=xl;break;case"focusout":x="blur",h=xl;break;case"beforeblur":case"afterblur":h=xl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=gs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Bf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=np;break;case Ku:case Xu:case Zu:h=Hf;break;case Ju:h=op;break;case"scroll":h=Ff;break;case"wheel":h=ip;break;case"copy":case"cut":case"paste":h=Qf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=ys}var z=(t&4)!==0,j=!z&&e==="scroll",d=z?v!==null?v+"Capture":null:v;z=[];for(var u=c,f;u!==null;){f=u;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=ir(u,d),g!=null&&z.push(pr(u,g,f)))),j)break;u=u.return}0<z.length&&(v=new h(v,x,null,n,m),p.push({event:v,listeners:z}))}}if(!(t&7)){e:{if(v=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",v&&n!==Yl&&(x=n.relatedTarget||n.fromElement)&&(Vt(x)||x[ct]))break e;if((h||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,h?(x=n.relatedTarget||n.toElement,h=c,x=x?Vt(x):null,x!==null&&(j=Jt(x),x!==j||x.tag!==5&&x.tag!==6)&&(x=null)):(h=null,x=c),h!==x)){if(z=gs,g="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(z=ys,g="onPointerLeave",d="onPointerEnter",u="pointer"),j=h==null?v:cn(h),f=x==null?v:cn(x),v=new z(g,u+"leave",h,n,m),v.target=j,v.relatedTarget=f,g=null,Vt(m)===c&&(z=new z(d,u+"enter",x,n,m),z.target=f,z.relatedTarget=j,g=z),j=g,h&&x)t:{for(z=h,d=x,u=0,f=z;f;f=rn(f))u++;for(f=0,g=d;g;g=rn(g))f++;for(;0<u-f;)z=rn(z),u--;for(;0<f-u;)d=rn(d),f--;for(;u--;){if(z===d||d!==null&&z===d.alternate)break t;z=rn(z),d=rn(d)}z=null}else z=null;h!==null&&Ts(p,v,h,z,!1),x!==null&&j!==null&&Ts(p,j,x,z,!0)}}e:{if(v=c?cn(c):window,h=v.nodeName&&v.nodeName.toLowerCase(),h==="select"||h==="input"&&v.type==="file")var w=pp;else if(xs(v))if(Wu)w=hp;else{w=vp;var S=mp}else(h=v.nodeName)&&h.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(w=gp);if(w&&(w=w(e,c))){Hu(p,w,n,m);break e}S&&S(e,v,c),e==="focusout"&&(S=v._wrapperState)&&S.controlled&&v.type==="number"&&$l(v,"number",v.value)}switch(S=c?cn(c):window,e){case"focusin":(xs(S)||S.contentEditable==="true")&&(sn=S,ti=c,Jn=null);break;case"focusout":Jn=ti=sn=null;break;case"mousedown":ni=!0;break;case"contextmenu":case"mouseup":case"dragend":ni=!1,_s(p,n,m);break;case"selectionchange":if(wp)break;case"keydown":case"keyup":_s(p,n,m)}var _;if(Vi)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else an?Vu(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(Bu&&n.locale!=="ko"&&(an||C!=="onCompositionStart"?C==="onCompositionEnd"&&an&&(_=Uu()):(wt=m,Fi="value"in wt?wt.value:wt.textContent,an=!0)),S=go(c,C),0<S.length&&(C=new hs(C,e,null,n,m),p.push({event:C,listeners:S}),_?C.data=_:(_=$u(n),_!==null&&(C.data=_)))),(_=sp?up(e,n):cp(e,n))&&(c=go(c,"onBeforeInput"),0<c.length&&(m=new hs("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:c}),m.data=_))}tc(p,t)})}function pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function go(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=ir(e,n),l!=null&&r.unshift(pr(e,l,o)),l=ir(e,t),l!=null&&r.push(pr(e,l,o))),e=e.return}return r}function rn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ts(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var a=n,s=a.alternate,c=a.stateNode;if(s!==null&&s===r)break;a.tag===5&&c!==null&&(a=c,o?(s=ir(n,l),s!=null&&i.unshift(pr(n,s,a))):o||(s=ir(n,l),s!=null&&i.push(pr(n,s,a)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var kp=/\r\n?/g,qp=/\u0000|\uFFFD/g;function Ls(e){return(typeof e=="string"?e:""+e).replace(kp,`
`).replace(qp,"")}function Qr(e,t,n){if(t=Ls(t),Ls(e)!==t&&n)throw Error(y(425))}function ho(){}var ri=null,oi=null;function li(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ii=typeof setTimeout=="function"?setTimeout:void 0,Sp=typeof clearTimeout=="function"?clearTimeout:void 0,Rs=typeof Promise=="function"?Promise:void 0,_p=typeof queueMicrotask=="function"?queueMicrotask:typeof Rs<"u"?function(e){return Rs.resolve(null).then(e).catch(Np)}:ii;function Np(e){setTimeout(function(){throw e})}function Nl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),ur(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);ur(t)}function _t(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Os(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ln=Math.random().toString(36).slice(2),Ze="__reactFiber$"+Ln,mr="__reactProps$"+Ln,ct="__reactContainer$"+Ln,ai="__reactEvents$"+Ln,Ep="__reactListeners$"+Ln,Cp="__reactHandles$"+Ln;function Vt(e){var t=e[Ze];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ct]||n[Ze]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Os(e);e!==null;){if(n=e[Ze])return n;e=Os(e)}return t}e=n,n=e.parentNode}return null}function qr(e){return e=e[Ze]||e[ct],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function cn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function jo(e){return e[mr]||null}var si=[],dn=-1;function Ot(e){return{current:e}}function $(e){0>dn||(e.current=si[dn],si[dn]=null,dn--)}function U(e,t){dn++,si[dn]=e.current,e.current=t}var Lt={},pe=Ot(Lt),xe=Ot(!1),bt=Lt;function Sn(e,t){var n=e.type.contextTypes;if(!n)return Lt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function ke(e){return e=e.childContextTypes,e!=null}function yo(){$(xe),$(pe)}function Is(e,t,n){if(pe.current!==Lt)throw Error(y(168));U(pe,t),U(xe,n)}function rc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(y(108,mf(e)||"Unknown",o));return b({},n,r)}function zo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Lt,bt=pe.current,U(pe,e),U(xe,xe.current),!0}function Ms(e,t,n){var r=e.stateNode;if(!r)throw Error(y(169));n?(e=rc(e,t,bt),r.__reactInternalMemoizedMergedChildContext=e,$(xe),$(pe),U(pe,e)):$(xe),U(xe,n)}var lt=null,Ao=!1,El=!1;function oc(e){lt===null?lt=[e]:lt.push(e)}function Pp(e){Ao=!0,oc(e)}function It(){if(!El&&lt!==null){El=!0;var e=0,t=D;try{var n=lt;for(D=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}lt=null,Ao=!1}catch(o){throw lt!==null&&(lt=lt.slice(e+1)),Pu(Mi,It),o}finally{D=t,El=!1}}return null}var fn=[],pn=0,wo=null,xo=0,Me=[],De=0,Yt=null,it=1,at="";function Ut(e,t){fn[pn++]=xo,fn[pn++]=wo,wo=e,xo=t}function lc(e,t,n){Me[De++]=it,Me[De++]=at,Me[De++]=Yt,Yt=e;var r=it;e=at;var o=32-Qe(r)-1;r&=~(1<<o),n+=1;var l=32-Qe(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,it=1<<32-Qe(t)+o|n<<o|r,at=l+e}else it=1<<l|n<<o|r,at=e}function Hi(e){e.return!==null&&(Ut(e,1),lc(e,1,0))}function Wi(e){for(;e===wo;)wo=fn[--pn],fn[pn]=null,xo=fn[--pn],fn[pn]=null;for(;e===Yt;)Yt=Me[--De],Me[De]=null,at=Me[--De],Me[De]=null,it=Me[--De],Me[De]=null}var Ee=null,Ne=null,H=!1,We=null;function ic(e,t){var n=je(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ds(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ee=e,Ne=_t(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ee=e,Ne=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Yt!==null?{id:it,overflow:at}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=je(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ee=e,Ne=null,!0):!1;default:return!1}}function ui(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ci(e){if(H){var t=Ne;if(t){var n=t;if(!Ds(e,t)){if(ui(e))throw Error(y(418));t=_t(n.nextSibling);var r=Ee;t&&Ds(e,t)?ic(r,n):(e.flags=e.flags&-4097|2,H=!1,Ee=e)}}else{if(ui(e))throw Error(y(418));e.flags=e.flags&-4097|2,H=!1,Ee=e}}}function js(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function br(e){if(e!==Ee)return!1;if(!H)return js(e),H=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!li(e.type,e.memoizedProps)),t&&(t=Ne)){if(ui(e))throw ac(),Error(y(418));for(;t;)ic(e,t),t=_t(t.nextSibling)}if(js(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ne=_t(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ne=null}}else Ne=Ee?_t(e.stateNode.nextSibling):null;return!0}function ac(){for(var e=Ne;e;)e=_t(e.nextSibling)}function _n(){Ne=Ee=null,H=!1}function Qi(e){We===null?We=[e]:We.push(e)}var Tp=pt.ReactCurrentBatchConfig;function Bn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(y(309));var r=n.stateNode}if(!r)throw Error(y(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var a=o.refs;i===null?delete a[l]:a[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(y(284));if(!n._owner)throw Error(y(290,e))}return e}function Yr(e,t){throw e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function As(e){var t=e._init;return t(e._payload)}function sc(e){function t(d,u){if(e){var f=d.deletions;f===null?(d.deletions=[u],d.flags|=16):f.push(u)}}function n(d,u){if(!e)return null;for(;u!==null;)t(d,u),u=u.sibling;return null}function r(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function o(d,u){return d=Pt(d,u),d.index=0,d.sibling=null,d}function l(d,u,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<u?(d.flags|=2,u):f):(d.flags|=2,u)):(d.flags|=1048576,u)}function i(d){return e&&d.alternate===null&&(d.flags|=2),d}function a(d,u,f,g){return u===null||u.tag!==6?(u=Il(f,d.mode,g),u.return=d,u):(u=o(u,f),u.return=d,u)}function s(d,u,f,g){var w=f.type;return w===ln?m(d,u,f.props.children,g,f.key):u!==null&&(u.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===gt&&As(w)===u.type)?(g=o(u,f.props),g.ref=Bn(d,u,f),g.return=d,g):(g=ao(f.type,f.key,f.props,null,d.mode,g),g.ref=Bn(d,u,f),g.return=d,g)}function c(d,u,f,g){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=Ml(f,d.mode,g),u.return=d,u):(u=o(u,f.children||[]),u.return=d,u)}function m(d,u,f,g,w){return u===null||u.tag!==7?(u=Qt(f,d.mode,g,w),u.return=d,u):(u=o(u,f),u.return=d,u)}function p(d,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Il(""+u,d.mode,f),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Or:return f=ao(u.type,u.key,u.props,null,d.mode,f),f.ref=Bn(d,null,u),f.return=d,f;case on:return u=Ml(u,d.mode,f),u.return=d,u;case gt:var g=u._init;return p(d,g(u._payload),f)}if(Qn(u)||jn(u))return u=Qt(u,d.mode,f,null),u.return=d,u;Yr(d,u)}return null}function v(d,u,f,g){var w=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return w!==null?null:a(d,u,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Or:return f.key===w?s(d,u,f,g):null;case on:return f.key===w?c(d,u,f,g):null;case gt:return w=f._init,v(d,u,w(f._payload),g)}if(Qn(f)||jn(f))return w!==null?null:m(d,u,f,g,null);Yr(d,f)}return null}function h(d,u,f,g,w){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,a(u,d,""+g,w);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Or:return d=d.get(g.key===null?f:g.key)||null,s(u,d,g,w);case on:return d=d.get(g.key===null?f:g.key)||null,c(u,d,g,w);case gt:var S=g._init;return h(d,u,f,S(g._payload),w)}if(Qn(g)||jn(g))return d=d.get(f)||null,m(u,d,g,w,null);Yr(u,g)}return null}function x(d,u,f,g){for(var w=null,S=null,_=u,C=u=0,G=null;_!==null&&C<f.length;C++){_.index>C?(G=_,_=null):G=_.sibling;var P=v(d,_,f[C],g);if(P===null){_===null&&(_=G);break}e&&_&&P.alternate===null&&t(d,_),u=l(P,u,C),S===null?w=P:S.sibling=P,S=P,_=G}if(C===f.length)return n(d,_),H&&Ut(d,C),w;if(_===null){for(;C<f.length;C++)_=p(d,f[C],g),_!==null&&(u=l(_,u,C),S===null?w=_:S.sibling=_,S=_);return H&&Ut(d,C),w}for(_=r(d,_);C<f.length;C++)G=h(_,d,C,f[C],g),G!==null&&(e&&G.alternate!==null&&_.delete(G.key===null?C:G.key),u=l(G,u,C),S===null?w=G:S.sibling=G,S=G);return e&&_.forEach(function(E){return t(d,E)}),H&&Ut(d,C),w}function z(d,u,f,g){var w=jn(f);if(typeof w!="function")throw Error(y(150));if(f=w.call(f),f==null)throw Error(y(151));for(var S=w=null,_=u,C=u=0,G=null,P=f.next();_!==null&&!P.done;C++,P=f.next()){_.index>C?(G=_,_=null):G=_.sibling;var E=v(d,_,P.value,g);if(E===null){_===null&&(_=G);break}e&&_&&E.alternate===null&&t(d,_),u=l(E,u,C),S===null?w=E:S.sibling=E,S=E,_=G}if(P.done)return n(d,_),H&&Ut(d,C),w;if(_===null){for(;!P.done;C++,P=f.next())P=p(d,P.value,g),P!==null&&(u=l(P,u,C),S===null?w=P:S.sibling=P,S=P);return H&&Ut(d,C),w}for(_=r(d,_);!P.done;C++,P=f.next())P=h(_,d,C,P.value,g),P!==null&&(e&&P.alternate!==null&&_.delete(P.key===null?C:P.key),u=l(P,u,C),S===null?w=P:S.sibling=P,S=P);return e&&_.forEach(function(T){return t(d,T)}),H&&Ut(d,C),w}function j(d,u,f,g){if(typeof f=="object"&&f!==null&&f.type===ln&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Or:e:{for(var w=f.key,S=u;S!==null;){if(S.key===w){if(w=f.type,w===ln){if(S.tag===7){n(d,S.sibling),u=o(S,f.props.children),u.return=d,d=u;break e}}else if(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===gt&&As(w)===S.type){n(d,S.sibling),u=o(S,f.props),u.ref=Bn(d,S,f),u.return=d,d=u;break e}n(d,S);break}else t(d,S);S=S.sibling}f.type===ln?(u=Qt(f.props.children,d.mode,g,f.key),u.return=d,d=u):(g=ao(f.type,f.key,f.props,null,d.mode,g),g.ref=Bn(d,u,f),g.return=d,d=g)}return i(d);case on:e:{for(S=f.key;u!==null;){if(u.key===S)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){n(d,u.sibling),u=o(u,f.children||[]),u.return=d,d=u;break e}else{n(d,u);break}else t(d,u);u=u.sibling}u=Ml(f,d.mode,g),u.return=d,d=u}return i(d);case gt:return S=f._init,j(d,u,S(f._payload),g)}if(Qn(f))return x(d,u,f,g);if(jn(f))return z(d,u,f,g);Yr(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(n(d,u.sibling),u=o(u,f),u.return=d,d=u):(n(d,u),u=Il(f,d.mode,g),u.return=d,d=u),i(d)):n(d,u)}return j}var Nn=sc(!0),uc=sc(!1),ko=Ot(null),qo=null,mn=null,bi=null;function Yi(){bi=mn=qo=null}function Gi(e){var t=ko.current;$(ko),e._currentValue=t}function di(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function xn(e,t){qo=e,bi=mn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function Fe(e){var t=e._currentValue;if(bi!==e)if(e={context:e,memoizedValue:t,next:null},mn===null){if(qo===null)throw Error(y(308));mn=e,qo.dependencies={lanes:0,firstContext:e}}else mn=mn.next=e;return t}var $t=null;function Ki(e){$t===null?$t=[e]:$t.push(e)}function cc(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Ki(t)):(n.next=o.next,o.next=n),t.interleaved=n,dt(e,r)}function dt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ht=!1;function Xi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function dc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function st(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Nt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,I&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,dt(e,n)}return o=r.interleaved,o===null?(t.next=t,Ki(r)):(t.next=o.next,o.next=t),r.interleaved=t,dt(e,n)}function to(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Di(e,n)}}function Fs(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function So(e,t,n,r){var o=e.updateQueue;ht=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var s=a,c=s.next;s.next=null,i===null?l=c:i.next=c,i=s;var m=e.alternate;m!==null&&(m=m.updateQueue,a=m.lastBaseUpdate,a!==i&&(a===null?m.firstBaseUpdate=c:a.next=c,m.lastBaseUpdate=s))}if(l!==null){var p=o.baseState;i=0,m=c=s=null,a=l;do{var v=a.lane,h=a.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:h,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=e,z=a;switch(v=t,h=n,z.tag){case 1:if(x=z.payload,typeof x=="function"){p=x.call(h,p,v);break e}p=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=z.payload,v=typeof x=="function"?x.call(h,p,v):x,v==null)break e;p=b({},p,v);break e;case 2:ht=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,v=o.effects,v===null?o.effects=[a]:v.push(a))}else h={eventTime:h,lane:v,tag:a.tag,payload:a.payload,callback:a.callback,next:null},m===null?(c=m=h,s=p):m=m.next=h,i|=v;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;v=a,a=v.next,v.next=null,o.lastBaseUpdate=v,o.shared.pending=null}}while(!0);if(m===null&&(s=p),o.baseState=s,o.firstBaseUpdate=c,o.lastBaseUpdate=m,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);Kt|=i,e.lanes=i,e.memoizedState=p}}function Us(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(y(191,o));o.call(r)}}}var Sr={},et=Ot(Sr),vr=Ot(Sr),gr=Ot(Sr);function Ht(e){if(e===Sr)throw Error(y(174));return e}function Zi(e,t){switch(U(gr,t),U(vr,e),U(et,Sr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Wl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Wl(t,e)}$(et),U(et,t)}function En(){$(et),$(vr),$(gr)}function fc(e){Ht(gr.current);var t=Ht(et.current),n=Wl(t,e.type);t!==n&&(U(vr,e),U(et,n))}function Ji(e){vr.current===e&&($(et),$(vr))}var W=Ot(0);function _o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Cl=[];function ea(){for(var e=0;e<Cl.length;e++)Cl[e]._workInProgressVersionPrimary=null;Cl.length=0}var no=pt.ReactCurrentDispatcher,Pl=pt.ReactCurrentBatchConfig,Gt=0,Q=null,te=null,oe=null,No=!1,er=!1,hr=0,Lp=0;function ce(){throw Error(y(321))}function ta(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ye(e[n],t[n]))return!1;return!0}function na(e,t,n,r,o,l){if(Gt=l,Q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,no.current=e===null||e.memoizedState===null?Mp:Dp,e=n(r,o),er){l=0;do{if(er=!1,hr=0,25<=l)throw Error(y(301));l+=1,oe=te=null,t.updateQueue=null,no.current=jp,e=n(r,o)}while(er)}if(no.current=Eo,t=te!==null&&te.next!==null,Gt=0,oe=te=Q=null,No=!1,t)throw Error(y(300));return e}function ra(){var e=hr!==0;return hr=0,e}function Xe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oe===null?Q.memoizedState=oe=e:oe=oe.next=e,oe}function Ue(){if(te===null){var e=Q.alternate;e=e!==null?e.memoizedState:null}else e=te.next;var t=oe===null?Q.memoizedState:oe.next;if(t!==null)oe=t,te=e;else{if(e===null)throw Error(y(310));te=e,e={memoizedState:te.memoizedState,baseState:te.baseState,baseQueue:te.baseQueue,queue:te.queue,next:null},oe===null?Q.memoizedState=oe=e:oe=oe.next=e}return oe}function yr(e,t){return typeof t=="function"?t(e):t}function Tl(e){var t=Ue(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=te,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var a=i=null,s=null,c=l;do{var m=c.lane;if((Gt&m)===m)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var p={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(a=s=p,i=r):s=s.next=p,Q.lanes|=m,Kt|=m}c=c.next}while(c!==null&&c!==l);s===null?i=r:s.next=a,Ye(r,t.memoizedState)||(we=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,Q.lanes|=l,Kt|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ll(e){var t=Ue(),n=t.queue;if(n===null)throw Error(y(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);Ye(l,t.memoizedState)||(we=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function pc(){}function mc(e,t){var n=Q,r=Ue(),o=t(),l=!Ye(r.memoizedState,o);if(l&&(r.memoizedState=o,we=!0),r=r.queue,oa(hc.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||oe!==null&&oe.memoizedState.tag&1){if(n.flags|=2048,zr(9,gc.bind(null,n,r,o,t),void 0,null),le===null)throw Error(y(349));Gt&30||vc(n,t,o)}return o}function vc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gc(e,t,n,r){t.value=n,t.getSnapshot=r,yc(t)&&zc(e)}function hc(e,t,n){return n(function(){yc(t)&&zc(e)})}function yc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ye(e,n)}catch{return!0}}function zc(e){var t=dt(e,1);t!==null&&be(t,e,1,-1)}function Bs(e){var t=Xe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:yr,lastRenderedState:e},t.queue=e,e=e.dispatch=Ip.bind(null,Q,e),[t.memoizedState,e]}function zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function wc(){return Ue().memoizedState}function ro(e,t,n,r){var o=Xe();Q.flags|=e,o.memoizedState=zr(1|t,n,void 0,r===void 0?null:r)}function Fo(e,t,n,r){var o=Ue();r=r===void 0?null:r;var l=void 0;if(te!==null){var i=te.memoizedState;if(l=i.destroy,r!==null&&ta(r,i.deps)){o.memoizedState=zr(t,n,l,r);return}}Q.flags|=e,o.memoizedState=zr(1|t,n,l,r)}function Vs(e,t){return ro(8390656,8,e,t)}function oa(e,t){return Fo(2048,8,e,t)}function xc(e,t){return Fo(4,2,e,t)}function kc(e,t){return Fo(4,4,e,t)}function qc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Sc(e,t,n){return n=n!=null?n.concat([e]):null,Fo(4,4,qc.bind(null,t,e),n)}function la(){}function _c(e,t){var n=Ue();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ta(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Nc(e,t){var n=Ue();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ta(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ec(e,t,n){return Gt&21?(Ye(n,t)||(n=Ru(),Q.lanes|=n,Kt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}function Rp(e,t){var n=D;D=n!==0&&4>n?n:4,e(!0);var r=Pl.transition;Pl.transition={};try{e(!1),t()}finally{D=n,Pl.transition=r}}function Cc(){return Ue().memoizedState}function Op(e,t,n){var r=Ct(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Pc(e))Tc(t,n);else if(n=cc(e,t,n,r),n!==null){var o=ge();be(n,e,r,o),Lc(n,t,r)}}function Ip(e,t,n){var r=Ct(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Pc(e))Tc(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,a=l(i,n);if(o.hasEagerState=!0,o.eagerState=a,Ye(a,i)){var s=t.interleaved;s===null?(o.next=o,Ki(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}n=cc(e,t,o,r),n!==null&&(o=ge(),be(n,e,r,o),Lc(n,t,r))}}function Pc(e){var t=e.alternate;return e===Q||t!==null&&t===Q}function Tc(e,t){er=No=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Lc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Di(e,n)}}var Eo={readContext:Fe,useCallback:ce,useContext:ce,useEffect:ce,useImperativeHandle:ce,useInsertionEffect:ce,useLayoutEffect:ce,useMemo:ce,useReducer:ce,useRef:ce,useState:ce,useDebugValue:ce,useDeferredValue:ce,useTransition:ce,useMutableSource:ce,useSyncExternalStore:ce,useId:ce,unstable_isNewReconciler:!1},Mp={readContext:Fe,useCallback:function(e,t){return Xe().memoizedState=[e,t===void 0?null:t],e},useContext:Fe,useEffect:Vs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ro(4194308,4,qc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ro(4194308,4,e,t)},useInsertionEffect:function(e,t){return ro(4,2,e,t)},useMemo:function(e,t){var n=Xe();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Xe();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Op.bind(null,Q,e),[r.memoizedState,e]},useRef:function(e){var t=Xe();return e={current:e},t.memoizedState=e},useState:Bs,useDebugValue:la,useDeferredValue:function(e){return Xe().memoizedState=e},useTransition:function(){var e=Bs(!1),t=e[0];return e=Rp.bind(null,e[1]),Xe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Q,o=Xe();if(H){if(n===void 0)throw Error(y(407));n=n()}else{if(n=t(),le===null)throw Error(y(349));Gt&30||vc(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,Vs(hc.bind(null,r,l,e),[e]),r.flags|=2048,zr(9,gc.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=Xe(),t=le.identifierPrefix;if(H){var n=at,r=it;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=hr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Lp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Dp={readContext:Fe,useCallback:_c,useContext:Fe,useEffect:oa,useImperativeHandle:Sc,useInsertionEffect:xc,useLayoutEffect:kc,useMemo:Nc,useReducer:Tl,useRef:wc,useState:function(){return Tl(yr)},useDebugValue:la,useDeferredValue:function(e){var t=Ue();return Ec(t,te.memoizedState,e)},useTransition:function(){var e=Tl(yr)[0],t=Ue().memoizedState;return[e,t]},useMutableSource:pc,useSyncExternalStore:mc,useId:Cc,unstable_isNewReconciler:!1},jp={readContext:Fe,useCallback:_c,useContext:Fe,useEffect:oa,useImperativeHandle:Sc,useInsertionEffect:xc,useLayoutEffect:kc,useMemo:Nc,useReducer:Ll,useRef:wc,useState:function(){return Ll(yr)},useDebugValue:la,useDeferredValue:function(e){var t=Ue();return te===null?t.memoizedState=e:Ec(t,te.memoizedState,e)},useTransition:function(){var e=Ll(yr)[0],t=Ue().memoizedState;return[e,t]},useMutableSource:pc,useSyncExternalStore:mc,useId:Cc,unstable_isNewReconciler:!1};function $e(e,t){if(e&&e.defaultProps){t=b({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function fi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:b({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Uo={isMounted:function(e){return(e=e._reactInternals)?Jt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ge(),o=Ct(e),l=st(r,o);l.payload=t,n!=null&&(l.callback=n),t=Nt(e,l,o),t!==null&&(be(t,e,o,r),to(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ge(),o=Ct(e),l=st(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Nt(e,l,o),t!==null&&(be(t,e,o,r),to(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ge(),r=Ct(e),o=st(n,r);o.tag=2,t!=null&&(o.callback=t),t=Nt(e,o,r),t!==null&&(be(t,e,r,n),to(t,e,r))}};function $s(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!dr(n,r)||!dr(o,l):!0}function Rc(e,t,n){var r=!1,o=Lt,l=t.contextType;return typeof l=="object"&&l!==null?l=Fe(l):(o=ke(t)?bt:pe.current,r=t.contextTypes,l=(r=r!=null)?Sn(e,o):Lt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Uo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Hs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Uo.enqueueReplaceState(t,t.state,null)}function pi(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Xi(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Fe(l):(l=ke(t)?bt:pe.current,o.context=Sn(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(fi(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Uo.enqueueReplaceState(o,o.state,null),So(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Cn(e,t){try{var n="",r=t;do n+=pf(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Rl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function mi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ap=typeof WeakMap=="function"?WeakMap:Map;function Oc(e,t,n){n=st(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Po||(Po=!0,Si=r),mi(e,t)},n}function Ic(e,t,n){n=st(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){mi(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){mi(e,t),typeof r!="function"&&(Et===null?Et=new Set([this]):Et.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ws(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ap;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Zp.bind(null,e,t,n),t.then(e,e))}function Qs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function bs(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=st(-1,1),t.tag=2,Nt(n,t,1))),n.lanes|=1),e)}var Fp=pt.ReactCurrentOwner,we=!1;function ve(e,t,n,r){t.child=e===null?uc(t,null,n,r):Nn(t,e.child,n,r)}function Ys(e,t,n,r,o){n=n.render;var l=t.ref;return xn(t,o),r=na(e,t,n,r,l,o),n=ra(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ft(e,t,o)):(H&&n&&Hi(t),t.flags|=1,ve(e,t,r,o),t.child)}function Gs(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!pa(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Mc(e,t,l,r,o)):(e=ao(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&o)){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:dr,n(i,r)&&e.ref===t.ref)return ft(e,t,o)}return t.flags|=1,e=Pt(l,r),e.ref=t.ref,e.return=t,t.child=e}function Mc(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(dr(l,r)&&e.ref===t.ref)if(we=!1,t.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,ft(e,t,o)}return vi(e,t,n,r,o)}function Dc(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(gn,_e),_e|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,U(gn,_e),_e|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,U(gn,_e),_e|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,U(gn,_e),_e|=r;return ve(e,t,o,n),t.child}function jc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function vi(e,t,n,r,o){var l=ke(n)?bt:pe.current;return l=Sn(t,l),xn(t,o),n=na(e,t,n,r,l,o),r=ra(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ft(e,t,o)):(H&&r&&Hi(t),t.flags|=1,ve(e,t,n,o),t.child)}function Ks(e,t,n,r,o){if(ke(n)){var l=!0;zo(t)}else l=!1;if(xn(t,o),t.stateNode===null)oo(e,t),Rc(t,n,r),pi(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var s=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=Fe(c):(c=ke(n)?bt:pe.current,c=Sn(t,c));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||s!==c)&&Hs(t,i,r,c),ht=!1;var v=t.memoizedState;i.state=v,So(t,r,i,o),s=t.memoizedState,a!==r||v!==s||xe.current||ht?(typeof m=="function"&&(fi(t,n,m,r),s=t.memoizedState),(a=ht||$s(t,n,a,r,v,s,c))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=c,r=a):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,dc(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:$e(t.type,a),i.props=c,p=t.pendingProps,v=i.context,s=n.contextType,typeof s=="object"&&s!==null?s=Fe(s):(s=ke(n)?bt:pe.current,s=Sn(t,s));var h=n.getDerivedStateFromProps;(m=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==p||v!==s)&&Hs(t,i,r,s),ht=!1,v=t.memoizedState,i.state=v,So(t,r,i,o);var x=t.memoizedState;a!==p||v!==x||xe.current||ht?(typeof h=="function"&&(fi(t,n,h,r),x=t.memoizedState),(c=ht||$s(t,n,c,r,v,x,s)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,x,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,x,s)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),i.props=r,i.state=x,i.context=s,r=c):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return gi(e,t,n,r,l,o)}function gi(e,t,n,r,o,l){jc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&Ms(t,n,!1),ft(e,t,l);r=t.stateNode,Fp.current=t;var a=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Nn(t,e.child,null,l),t.child=Nn(t,null,a,l)):ve(e,t,a,l),t.memoizedState=r.state,o&&Ms(t,n,!0),t.child}function Ac(e){var t=e.stateNode;t.pendingContext?Is(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Is(e,t.context,!1),Zi(e,t.containerInfo)}function Xs(e,t,n,r,o){return _n(),Qi(o),t.flags|=256,ve(e,t,n,r),t.child}var hi={dehydrated:null,treeContext:null,retryLane:0};function yi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Fc(e,t,n){var r=t.pendingProps,o=W.current,l=!1,i=(t.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),U(W,o&1),e===null)return ci(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=i):l=$o(i,r,0,null),e=Qt(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=yi(n),t.memoizedState=hi,e):ia(t,i));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return Up(e,t,i,r,a,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,a=o.sibling;var s={mode:"hidden",children:r.children};return!(i&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Pt(o,s),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?l=Pt(a,l):(l=Qt(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?yi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=hi,r}return l=e.child,e=l.sibling,r=Pt(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ia(e,t){return t=$o({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gr(e,t,n,r){return r!==null&&Qi(r),Nn(t,e.child,null,n),e=ia(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Up(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Rl(Error(y(422))),Gr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=$o({mode:"visible",children:r.children},o,0,null),l=Qt(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Nn(t,e.child,null,i),t.child.memoizedState=yi(i),t.memoizedState=hi,l);if(!(t.mode&1))return Gr(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(y(419)),r=Rl(l,r,void 0),Gr(e,t,i,r)}if(a=(i&e.childLanes)!==0,we||a){if(r=le,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,dt(e,o),be(r,e,o,-1))}return fa(),r=Rl(Error(y(421))),Gr(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Jp.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,Ne=_t(o.nextSibling),Ee=t,H=!0,We=null,e!==null&&(Me[De++]=it,Me[De++]=at,Me[De++]=Yt,it=e.id,at=e.overflow,Yt=t),t=ia(t,r.children),t.flags|=4096,t)}function Zs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),di(e.return,t,n)}function Ol(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function Uc(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(ve(e,t,r.children,n),r=W.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zs(e,n,t);else if(e.tag===19)Zs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(U(W,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&_o(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Ol(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&_o(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Ol(t,!0,n,null,l);break;case"together":Ol(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function oo(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Kt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,n=Pt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Pt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Bp(e,t,n){switch(t.tag){case 3:Ac(t),_n();break;case 5:fc(t);break;case 1:ke(t.type)&&zo(t);break;case 4:Zi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;U(ko,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(U(W,W.current&1),t.flags|=128,null):n&t.child.childLanes?Fc(e,t,n):(U(W,W.current&1),e=ft(e,t,n),e!==null?e.sibling:null);U(W,W.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Uc(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),U(W,W.current),r)break;return null;case 22:case 23:return t.lanes=0,Dc(e,t,n)}return ft(e,t,n)}var Bc,zi,Vc,$c;Bc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};zi=function(){};Vc=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Ht(et.current);var l=null;switch(n){case"input":o=Bl(e,o),r=Bl(e,r),l=[];break;case"select":o=b({},o,{value:void 0}),r=b({},r,{value:void 0}),l=[];break;case"textarea":o=Hl(e,o),r=Hl(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ho)}Ql(n,r);var i;n=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var a=o[c];for(i in a)a.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(or.hasOwnProperty(c)?l||(l=[]):(l=l||[]).push(c,null));for(c in r){var s=r[c];if(a=o?.[c],r.hasOwnProperty(c)&&s!==a&&(s!=null||a!=null))if(c==="style")if(a){for(i in a)!a.hasOwnProperty(i)||s&&s.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in s)s.hasOwnProperty(i)&&a[i]!==s[i]&&(n||(n={}),n[i]=s[i])}else n||(l||(l=[]),l.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,a=a?a.__html:void 0,s!=null&&a!==s&&(l=l||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(or.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&V("scroll",e),l||a===s||(l=[])):(l=l||[]).push(c,s))}n&&(l=l||[]).push("style",n);var c=l;(t.updateQueue=c)&&(t.flags|=4)}};$c=function(e,t,n,r){n!==r&&(t.flags|=4)};function Vn(e,t){if(!H)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function de(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vp(e,t,n){var r=t.pendingProps;switch(Wi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return de(t),null;case 1:return ke(t.type)&&yo(),de(t),null;case 3:return r=t.stateNode,En(),$(xe),$(pe),ea(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(br(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,We!==null&&(Ei(We),We=null))),zi(e,t),de(t),null;case 5:Ji(t);var o=Ht(gr.current);if(n=t.type,e!==null&&t.stateNode!=null)Vc(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(y(166));return de(t),null}if(e=Ht(et.current),br(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[Ze]=t,r[mr]=l,e=(t.mode&1)!==0,n){case"dialog":V("cancel",r),V("close",r);break;case"iframe":case"object":case"embed":V("load",r);break;case"video":case"audio":for(o=0;o<Yn.length;o++)V(Yn[o],r);break;case"source":V("error",r);break;case"img":case"image":case"link":V("error",r),V("load",r);break;case"details":V("toggle",r);break;case"input":is(r,l),V("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},V("invalid",r);break;case"textarea":ss(r,l),V("invalid",r)}Ql(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var a=l[i];i==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&Qr(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&Qr(r.textContent,a,e),o=["children",""+a]):or.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&V("scroll",r)}switch(n){case"input":Ir(r),as(r,l,!0);break;case"textarea":Ir(r),us(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=ho)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=hu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Ze]=t,e[mr]=r,Bc(e,t,!1,!1),t.stateNode=e;e:{switch(i=bl(n,r),n){case"dialog":V("cancel",e),V("close",e),o=r;break;case"iframe":case"object":case"embed":V("load",e),o=r;break;case"video":case"audio":for(o=0;o<Yn.length;o++)V(Yn[o],e);o=r;break;case"source":V("error",e),o=r;break;case"img":case"image":case"link":V("error",e),V("load",e),o=r;break;case"details":V("toggle",e),o=r;break;case"input":is(e,r),o=Bl(e,r),V("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=b({},r,{value:void 0}),V("invalid",e);break;case"textarea":ss(e,r),o=Hl(e,r),V("invalid",e);break;default:o=r}Ql(n,o),a=o;for(l in a)if(a.hasOwnProperty(l)){var s=a[l];l==="style"?wu(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&yu(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&lr(e,s):typeof s=="number"&&lr(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(or.hasOwnProperty(l)?s!=null&&l==="onScroll"&&V("scroll",e):s!=null&&Ti(e,l,s,i))}switch(n){case"input":Ir(e),as(e,r,!1);break;case"textarea":Ir(e),us(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Tt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?hn(e,!!r.multiple,l,!1):r.defaultValue!=null&&hn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=ho)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return de(t),null;case 6:if(e&&t.stateNode!=null)$c(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(y(166));if(n=Ht(gr.current),Ht(et.current),br(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ze]=t,(l=r.nodeValue!==n)&&(e=Ee,e!==null))switch(e.tag){case 3:Qr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Qr(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ze]=t,t.stateNode=r}return de(t),null;case 13:if($(W),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(H&&Ne!==null&&t.mode&1&&!(t.flags&128))ac(),_n(),t.flags|=98560,l=!1;else if(l=br(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(y(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(y(317));l[Ze]=t}else _n(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),l=!1}else We!==null&&(Ei(We),We=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?ne===0&&(ne=3):fa())),t.updateQueue!==null&&(t.flags|=4),de(t),null);case 4:return En(),zi(e,t),e===null&&fr(t.stateNode.containerInfo),de(t),null;case 10:return Gi(t.type._context),de(t),null;case 17:return ke(t.type)&&yo(),de(t),null;case 19:if($(W),l=t.memoizedState,l===null)return de(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)Vn(l,!1);else{if(ne!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=_o(e),i!==null){for(t.flags|=128,Vn(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return U(W,W.current&1|2),t.child}e=e.sibling}l.tail!==null&&X()>Pn&&(t.flags|=128,r=!0,Vn(l,!1),t.lanes=4194304)}else{if(!r)if(e=_o(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Vn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!H)return de(t),null}else 2*X()-l.renderingStartTime>Pn&&n!==1073741824&&(t.flags|=128,r=!0,Vn(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=X(),t.sibling=null,n=W.current,U(W,r?n&1|2:n&1),t):(de(t),null);case 22:case 23:return da(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?_e&1073741824&&(de(t),t.subtreeFlags&6&&(t.flags|=8192)):de(t),null;case 24:return null;case 25:return null}throw Error(y(156,t.tag))}function $p(e,t){switch(Wi(t),t.tag){case 1:return ke(t.type)&&yo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return En(),$(xe),$(pe),ea(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ji(t),null;case 13:if($(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));_n()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $(W),null;case 4:return En(),null;case 10:return Gi(t.type._context),null;case 22:case 23:return da(),null;case 24:return null;default:return null}}var Kr=!1,fe=!1,Hp=typeof WeakSet=="function"?WeakSet:Set,k=null;function vn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){K(e,t,r)}else n.current=null}function wi(e,t,n){try{n()}catch(r){K(e,t,r)}}var Js=!1;function Wp(e,t){if(ri=mo,e=Yu(),$i(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,a=-1,s=-1,c=0,m=0,p=e,v=null;t:for(;;){for(var h;p!==n||o!==0&&p.nodeType!==3||(a=i+o),p!==l||r!==0&&p.nodeType!==3||(s=i+r),p.nodeType===3&&(i+=p.nodeValue.length),(h=p.firstChild)!==null;)v=p,p=h;for(;;){if(p===e)break t;if(v===n&&++c===o&&(a=i),v===l&&++m===r&&(s=i),(h=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=h}n=a===-1||s===-1?null:{start:a,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(oi={focusedElem:e,selectionRange:n},mo=!1,k=t;k!==null;)if(t=k,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,k=e;else for(;k!==null;){t=k;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var z=x.memoizedProps,j=x.memoizedState,d=t.stateNode,u=d.getSnapshotBeforeUpdate(t.elementType===t.type?z:$e(t.type,z),j);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(g){K(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,k=e;break}k=t.return}return x=Js,Js=!1,x}function tr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&wi(t,n,l)}o=o.next}while(o!==r)}}function Bo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function xi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Hc(e){var t=e.alternate;t!==null&&(e.alternate=null,Hc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ze],delete t[mr],delete t[ai],delete t[Ep],delete t[Cp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wc(e){return e.tag===5||e.tag===3||e.tag===4}function eu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ki(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ho));else if(r!==4&&(e=e.child,e!==null))for(ki(e,t,n),e=e.sibling;e!==null;)ki(e,t,n),e=e.sibling}function qi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qi(e,t,n),e=e.sibling;e!==null;)qi(e,t,n),e=e.sibling}var ie=null,He=!1;function vt(e,t,n){for(n=n.child;n!==null;)Qc(e,t,n),n=n.sibling}function Qc(e,t,n){if(Je&&typeof Je.onCommitFiberUnmount=="function")try{Je.onCommitFiberUnmount(Oo,n)}catch{}switch(n.tag){case 5:fe||vn(n,t);case 6:var r=ie,o=He;ie=null,vt(e,t,n),ie=r,He=o,ie!==null&&(He?(e=ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ie.removeChild(n.stateNode));break;case 18:ie!==null&&(He?(e=ie,n=n.stateNode,e.nodeType===8?Nl(e.parentNode,n):e.nodeType===1&&Nl(e,n),ur(e)):Nl(ie,n.stateNode));break;case 4:r=ie,o=He,ie=n.stateNode.containerInfo,He=!0,vt(e,t,n),ie=r,He=o;break;case 0:case 11:case 14:case 15:if(!fe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&(l&2||l&4)&&wi(n,t,i),o=o.next}while(o!==r)}vt(e,t,n);break;case 1:if(!fe&&(vn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){K(n,t,a)}vt(e,t,n);break;case 21:vt(e,t,n);break;case 22:n.mode&1?(fe=(r=fe)||n.memoizedState!==null,vt(e,t,n),fe=r):vt(e,t,n);break;default:vt(e,t,n)}}function tu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Hp),t.forEach(function(r){var o=em.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,a=i;e:for(;a!==null;){switch(a.tag){case 5:ie=a.stateNode,He=!1;break e;case 3:ie=a.stateNode.containerInfo,He=!0;break e;case 4:ie=a.stateNode.containerInfo,He=!0;break e}a=a.return}if(ie===null)throw Error(y(160));Qc(l,i,o),ie=null,He=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(c){K(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bc(t,e),t=t.sibling}function bc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),Ke(e),r&4){try{tr(3,e,e.return),Bo(3,e)}catch(z){K(e,e.return,z)}try{tr(5,e,e.return)}catch(z){K(e,e.return,z)}}break;case 1:Ve(t,e),Ke(e),r&512&&n!==null&&vn(n,n.return);break;case 5:if(Ve(t,e),Ke(e),r&512&&n!==null&&vn(n,n.return),e.flags&32){var o=e.stateNode;try{lr(o,"")}catch(z){K(e,e.return,z)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,a=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&vu(o,l),bl(a,i);var c=bl(a,l);for(i=0;i<s.length;i+=2){var m=s[i],p=s[i+1];m==="style"?wu(o,p):m==="dangerouslySetInnerHTML"?yu(o,p):m==="children"?lr(o,p):Ti(o,m,p,c)}switch(a){case"input":Vl(o,l);break;case"textarea":gu(o,l);break;case"select":var v=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var h=l.value;h!=null?hn(o,!!l.multiple,h,!1):v!==!!l.multiple&&(l.defaultValue!=null?hn(o,!!l.multiple,l.defaultValue,!0):hn(o,!!l.multiple,l.multiple?[]:"",!1))}o[mr]=l}catch(z){K(e,e.return,z)}}break;case 6:if(Ve(t,e),Ke(e),r&4){if(e.stateNode===null)throw Error(y(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(z){K(e,e.return,z)}}break;case 3:if(Ve(t,e),Ke(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ur(t.containerInfo)}catch(z){K(e,e.return,z)}break;case 4:Ve(t,e),Ke(e);break;case 13:Ve(t,e),Ke(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(ua=X())),r&4&&tu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(fe=(c=fe)||m,Ve(t,e),fe=c):Ve(t,e),Ke(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for(k=e,m=e.child;m!==null;){for(p=k=m;k!==null;){switch(v=k,h=v.child,v.tag){case 0:case 11:case 14:case 15:tr(4,v,v.return);break;case 1:vn(v,v.return);var x=v.stateNode;if(typeof x.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(z){K(r,n,z)}}break;case 5:vn(v,v.return);break;case 22:if(v.memoizedState!==null){ru(p);continue}}h!==null?(h.return=v,k=h):ru(p)}m=m.sibling}e:for(m=null,p=e;;){if(p.tag===5){if(m===null){m=p;try{o=p.stateNode,c?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=p.stateNode,s=p.memoizedProps.style,i=s!=null&&s.hasOwnProperty("display")?s.display:null,a.style.display=zu("display",i))}catch(z){K(e,e.return,z)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(z){K(e,e.return,z)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Ve(t,e),Ke(e),r&4&&tu(e);break;case 21:break;default:Ve(t,e),Ke(e)}}function Ke(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wc(n)){var r=n;break e}n=n.return}throw Error(y(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(lr(o,""),r.flags&=-33);var l=eu(e);qi(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,a=eu(e);ki(e,a,i);break;default:throw Error(y(161))}}catch(s){K(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Qp(e,t,n){k=e,Yc(e,t,n)}function Yc(e,t,n){for(var r=(e.mode&1)!==0;k!==null;){var o=k,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||Kr;if(!i){var a=o.alternate,s=a!==null&&a.memoizedState!==null||fe;a=Kr;var c=fe;if(Kr=i,(fe=s)&&!c)for(k=o;k!==null;)i=k,s=i.child,i.tag===22&&i.memoizedState!==null?ou(o):s!==null?(s.return=i,k=s):ou(o);for(;l!==null;)k=l,Yc(l,t,n),l=l.sibling;k=o,Kr=a,fe=c}nu(e,t,n)}else o.subtreeFlags&8772&&l!==null?(l.return=o,k=l):nu(e,t,n)}}function nu(e){for(;k!==null;){var t=k;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:fe||Bo(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!fe)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:$e(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Us(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Us(t,i,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&ur(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}fe||t.flags&512&&xi(t)}catch(v){K(t,t.return,v)}}if(t===e){k=null;break}if(n=t.sibling,n!==null){n.return=t.return,k=n;break}k=t.return}}function ru(e){for(;k!==null;){var t=k;if(t===e){k=null;break}var n=t.sibling;if(n!==null){n.return=t.return,k=n;break}k=t.return}}function ou(e){for(;k!==null;){var t=k;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Bo(4,t)}catch(s){K(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(s){K(t,o,s)}}var l=t.return;try{xi(t)}catch(s){K(t,l,s)}break;case 5:var i=t.return;try{xi(t)}catch(s){K(t,i,s)}}}catch(s){K(t,t.return,s)}if(t===e){k=null;break}var a=t.sibling;if(a!==null){a.return=t.return,k=a;break}k=t.return}}var bp=Math.ceil,Co=pt.ReactCurrentDispatcher,aa=pt.ReactCurrentOwner,Ae=pt.ReactCurrentBatchConfig,I=0,le=null,J=null,ae=0,_e=0,gn=Ot(0),ne=0,wr=null,Kt=0,Vo=0,sa=0,nr=null,ze=null,ua=0,Pn=1/0,ot=null,Po=!1,Si=null,Et=null,Xr=!1,xt=null,To=0,rr=0,_i=null,lo=-1,io=0;function ge(){return I&6?X():lo!==-1?lo:lo=X()}function Ct(e){return e.mode&1?I&2&&ae!==0?ae&-ae:Tp.transition!==null?(io===0&&(io=Ru()),io):(e=D,e!==0||(e=window.event,e=e===void 0?16:Fu(e.type)),e):1}function be(e,t,n,r){if(50<rr)throw rr=0,_i=null,Error(y(185));xr(e,n,r),(!(I&2)||e!==le)&&(e===le&&(!(I&2)&&(Vo|=n),ne===4&&zt(e,ae)),qe(e,r),n===1&&I===0&&!(t.mode&1)&&(Pn=X()+500,Ao&&It()))}function qe(e,t){var n=e.callbackNode;Rf(e,t);var r=po(e,e===le?ae:0);if(r===0)n!==null&&fs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&fs(n),t===1)e.tag===0?Pp(lu.bind(null,e)):oc(lu.bind(null,e)),_p(function(){!(I&6)&&It()}),n=null;else{switch(Ou(r)){case 1:n=Mi;break;case 4:n=Tu;break;case 16:n=fo;break;case 536870912:n=Lu;break;default:n=fo}n=nd(n,Gc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Gc(e,t){if(lo=-1,io=0,I&6)throw Error(y(327));var n=e.callbackNode;if(kn()&&e.callbackNode!==n)return null;var r=po(e,e===le?ae:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Lo(e,r);else{t=r;var o=I;I|=2;var l=Xc();(le!==e||ae!==t)&&(ot=null,Pn=X()+500,Wt(e,t));do try{Kp();break}catch(a){Kc(e,a)}while(!0);Yi(),Co.current=l,I=o,J!==null?t=0:(le=null,ae=0,t=ne)}if(t!==0){if(t===2&&(o=Zl(e),o!==0&&(r=o,t=Ni(e,o))),t===1)throw n=wr,Wt(e,0),zt(e,r),qe(e,X()),n;if(t===6)zt(e,r);else{if(o=e.current.alternate,!(r&30)&&!Yp(o)&&(t=Lo(e,r),t===2&&(l=Zl(e),l!==0&&(r=l,t=Ni(e,l))),t===1))throw n=wr,Wt(e,0),zt(e,r),qe(e,X()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(y(345));case 2:Bt(e,ze,ot);break;case 3:if(zt(e,r),(r&130023424)===r&&(t=ua+500-X(),10<t)){if(po(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ge(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=ii(Bt.bind(null,e,ze,ot),t);break}Bt(e,ze,ot);break;case 4:if(zt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-Qe(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=X()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*bp(r/1960))-r,10<r){e.timeoutHandle=ii(Bt.bind(null,e,ze,ot),r);break}Bt(e,ze,ot);break;case 5:Bt(e,ze,ot);break;default:throw Error(y(329))}}}return qe(e,X()),e.callbackNode===n?Gc.bind(null,e):null}function Ni(e,t){var n=nr;return e.current.memoizedState.isDehydrated&&(Wt(e,t).flags|=256),e=Lo(e,t),e!==2&&(t=ze,ze=n,t!==null&&Ei(t)),e}function Ei(e){ze===null?ze=e:ze.push.apply(ze,e)}function Yp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!Ye(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function zt(e,t){for(t&=~sa,t&=~Vo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qe(t),r=1<<n;e[n]=-1,t&=~r}}function lu(e){if(I&6)throw Error(y(327));kn();var t=po(e,0);if(!(t&1))return qe(e,X()),null;var n=Lo(e,t);if(e.tag!==0&&n===2){var r=Zl(e);r!==0&&(t=r,n=Ni(e,r))}if(n===1)throw n=wr,Wt(e,0),zt(e,t),qe(e,X()),n;if(n===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Bt(e,ze,ot),qe(e,X()),null}function ca(e,t){var n=I;I|=1;try{return e(t)}finally{I=n,I===0&&(Pn=X()+500,Ao&&It())}}function Xt(e){xt!==null&&xt.tag===0&&!(I&6)&&kn();var t=I;I|=1;var n=Ae.transition,r=D;try{if(Ae.transition=null,D=1,e)return e()}finally{D=r,Ae.transition=n,I=t,!(I&6)&&It()}}function da(){_e=gn.current,$(gn)}function Wt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Sp(n)),J!==null)for(n=J.return;n!==null;){var r=n;switch(Wi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&yo();break;case 3:En(),$(xe),$(pe),ea();break;case 5:Ji(r);break;case 4:En();break;case 13:$(W);break;case 19:$(W);break;case 10:Gi(r.type._context);break;case 22:case 23:da()}n=n.return}if(le=e,J=e=Pt(e.current,null),ae=_e=t,ne=0,wr=null,sa=Vo=Kt=0,ze=nr=null,$t!==null){for(t=0;t<$t.length;t++)if(n=$t[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}$t=null}return e}function Kc(e,t){do{var n=J;try{if(Yi(),no.current=Eo,No){for(var r=Q.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}No=!1}if(Gt=0,oe=te=Q=null,er=!1,hr=0,aa.current=null,n===null||n.return===null){ne=1,wr=t,J=null;break}e:{var l=e,i=n.return,a=n,s=t;if(t=ae,a.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,m=a,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var h=Qs(i);if(h!==null){h.flags&=-257,bs(h,i,a,l,t),h.mode&1&&Ws(l,c,t),t=h,s=c;var x=t.updateQueue;if(x===null){var z=new Set;z.add(s),t.updateQueue=z}else x.add(s);break e}else{if(!(t&1)){Ws(l,c,t),fa();break e}s=Error(y(426))}}else if(H&&a.mode&1){var j=Qs(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),bs(j,i,a,l,t),Qi(Cn(s,a));break e}}l=s=Cn(s,a),ne!==4&&(ne=2),nr===null?nr=[l]:nr.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var d=Oc(l,s,t);Fs(l,d);break e;case 1:a=s;var u=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Et===null||!Et.has(f)))){l.flags|=65536,t&=-t,l.lanes|=t;var g=Ic(l,a,t);Fs(l,g);break e}}l=l.return}while(l!==null)}Jc(n)}catch(w){t=w,J===n&&n!==null&&(J=n=n.return);continue}break}while(!0)}function Xc(){var e=Co.current;return Co.current=Eo,e===null?Eo:e}function fa(){(ne===0||ne===3||ne===2)&&(ne=4),le===null||!(Kt&268435455)&&!(Vo&268435455)||zt(le,ae)}function Lo(e,t){var n=I;I|=2;var r=Xc();(le!==e||ae!==t)&&(ot=null,Wt(e,t));do try{Gp();break}catch(o){Kc(e,o)}while(!0);if(Yi(),I=n,Co.current=r,J!==null)throw Error(y(261));return le=null,ae=0,ne}function Gp(){for(;J!==null;)Zc(J)}function Kp(){for(;J!==null&&!qf();)Zc(J)}function Zc(e){var t=td(e.alternate,e,_e);e.memoizedProps=e.pendingProps,t===null?Jc(e):J=t,aa.current=null}function Jc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=$p(n,t),n!==null){n.flags&=32767,J=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ne=6,J=null;return}}else if(n=Vp(n,t,_e),n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);ne===0&&(ne=5)}function Bt(e,t,n){var r=D,o=Ae.transition;try{Ae.transition=null,D=1,Xp(e,t,n,r)}finally{Ae.transition=o,D=r}return null}function Xp(e,t,n,r){do kn();while(xt!==null);if(I&6)throw Error(y(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(Of(e,l),e===le&&(J=le=null,ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Xr||(Xr=!0,nd(fo,function(){return kn(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Ae.transition,Ae.transition=null;var i=D;D=1;var a=I;I|=4,aa.current=null,Wp(e,n),bc(n,e),zp(oi),mo=!!ri,oi=ri=null,e.current=n,Qp(n,e,o),Sf(),I=a,D=i,Ae.transition=l}else e.current=n;if(Xr&&(Xr=!1,xt=e,To=o),l=e.pendingLanes,l===0&&(Et=null),Ef(n.stateNode,r),qe(e,X()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Po)throw Po=!1,e=Si,Si=null,e;return To&1&&e.tag!==0&&kn(),l=e.pendingLanes,l&1?e===_i?rr++:(rr=0,_i=e):rr=0,It(),null}function kn(){if(xt!==null){var e=Ou(To),t=Ae.transition,n=D;try{if(Ae.transition=null,D=16>e?16:e,xt===null)var r=!1;else{if(e=xt,xt=null,To=0,I&6)throw Error(y(331));var o=I;for(I|=4,k=e.current;k!==null;){var l=k,i=l.child;if(k.flags&16){var a=l.deletions;if(a!==null){for(var s=0;s<a.length;s++){var c=a[s];for(k=c;k!==null;){var m=k;switch(m.tag){case 0:case 11:case 15:tr(8,m,l)}var p=m.child;if(p!==null)p.return=m,k=p;else for(;k!==null;){m=k;var v=m.sibling,h=m.return;if(Hc(m),m===c){k=null;break}if(v!==null){v.return=h,k=v;break}k=h}}}var x=l.alternate;if(x!==null){var z=x.child;if(z!==null){x.child=null;do{var j=z.sibling;z.sibling=null,z=j}while(z!==null)}}k=l}}if(l.subtreeFlags&2064&&i!==null)i.return=l,k=i;else e:for(;k!==null;){if(l=k,l.flags&2048)switch(l.tag){case 0:case 11:case 15:tr(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,k=d;break e}k=l.return}}var u=e.current;for(k=u;k!==null;){i=k;var f=i.child;if(i.subtreeFlags&2064&&f!==null)f.return=i,k=f;else e:for(i=u;k!==null;){if(a=k,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Bo(9,a)}}catch(w){K(a,a.return,w)}if(a===i){k=null;break e}var g=a.sibling;if(g!==null){g.return=a.return,k=g;break e}k=a.return}}if(I=o,It(),Je&&typeof Je.onPostCommitFiberRoot=="function")try{Je.onPostCommitFiberRoot(Oo,e)}catch{}r=!0}return r}finally{D=n,Ae.transition=t}}return!1}function iu(e,t,n){t=Cn(n,t),t=Oc(e,t,1),e=Nt(e,t,1),t=ge(),e!==null&&(xr(e,1,t),qe(e,t))}function K(e,t,n){if(e.tag===3)iu(e,e,n);else for(;t!==null;){if(t.tag===3){iu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Et===null||!Et.has(r))){e=Cn(n,e),e=Ic(t,e,1),t=Nt(t,e,1),e=ge(),t!==null&&(xr(t,1,e),qe(t,e));break}}t=t.return}}function Zp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&n,le===e&&(ae&n)===n&&(ne===4||ne===3&&(ae&130023424)===ae&&500>X()-ua?Wt(e,0):sa|=n),qe(e,t)}function ed(e,t){t===0&&(e.mode&1?(t=jr,jr<<=1,!(jr&130023424)&&(jr=4194304)):t=1);var n=ge();e=dt(e,t),e!==null&&(xr(e,t,n),qe(e,n))}function Jp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ed(e,n)}function em(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(t),ed(e,n)}var td;td=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||xe.current)we=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return we=!1,Bp(e,t,n);we=!!(e.flags&131072)}else we=!1,H&&t.flags&1048576&&lc(t,xo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;oo(e,t),e=t.pendingProps;var o=Sn(t,pe.current);xn(t,n),o=na(null,t,r,e,o,n);var l=ra();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ke(r)?(l=!0,zo(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Xi(t),o.updater=Uo,t.stateNode=o,o._reactInternals=t,pi(t,r,e,n),t=gi(null,t,r,!0,l,n)):(t.tag=0,H&&l&&Hi(t),ve(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(oo(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=nm(r),e=$e(r,e),o){case 0:t=vi(null,t,r,e,n);break e;case 1:t=Ks(null,t,r,e,n);break e;case 11:t=Ys(null,t,r,e,n);break e;case 14:t=Gs(null,t,r,$e(r.type,e),n);break e}throw Error(y(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:$e(r,o),vi(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:$e(r,o),Ks(e,t,r,o,n);case 3:e:{if(Ac(t),e===null)throw Error(y(387));r=t.pendingProps,l=t.memoizedState,o=l.element,dc(e,t),So(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=Cn(Error(y(423)),t),t=Xs(e,t,r,n,o);break e}else if(r!==o){o=Cn(Error(y(424)),t),t=Xs(e,t,r,n,o);break e}else for(Ne=_t(t.stateNode.containerInfo.firstChild),Ee=t,H=!0,We=null,n=uc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(_n(),r===o){t=ft(e,t,n);break e}ve(e,t,r,n)}t=t.child}return t;case 5:return fc(t),e===null&&ci(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,li(r,o)?i=null:l!==null&&li(r,l)&&(t.flags|=32),jc(e,t),ve(e,t,i,n),t.child;case 6:return e===null&&ci(t),null;case 13:return Fc(e,t,n);case 4:return Zi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Nn(t,null,r,n):ve(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:$e(r,o),Ys(e,t,r,o,n);case 7:return ve(e,t,t.pendingProps,n),t.child;case 8:return ve(e,t,t.pendingProps.children,n),t.child;case 12:return ve(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,U(ko,r._currentValue),r._currentValue=i,l!==null)if(Ye(l.value,i)){if(l.children===o.children&&!xe.current){t=ft(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var a=l.dependencies;if(a!==null){i=l.child;for(var s=a.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=st(-1,n&-n),s.tag=2;var c=l.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?s.next=s:(s.next=m.next,m.next=s),c.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),di(l.return,n,t),a.lanes|=n;break}s=s.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(y(341));i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),di(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}ve(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,xn(t,n),o=Fe(o),r=r(o),t.flags|=1,ve(e,t,r,n),t.child;case 14:return r=t.type,o=$e(r,t.pendingProps),o=$e(r.type,o),Gs(e,t,r,o,n);case 15:return Mc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:$e(r,o),oo(e,t),t.tag=1,ke(r)?(e=!0,zo(t)):e=!1,xn(t,n),Rc(t,r,o),pi(t,r,o,n),gi(null,t,r,!0,e,n);case 19:return Uc(e,t,n);case 22:return Dc(e,t,n)}throw Error(y(156,t.tag))};function nd(e,t){return Pu(e,t)}function tm(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function je(e,t,n,r){return new tm(e,t,n,r)}function pa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function nm(e){if(typeof e=="function")return pa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ri)return 11;if(e===Oi)return 14}return 2}function Pt(e,t){var n=e.alternate;return n===null?(n=je(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ao(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")pa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case ln:return Qt(n.children,o,l,t);case Li:i=8,o|=8;break;case jl:return e=je(12,n,t,o|2),e.elementType=jl,e.lanes=l,e;case Al:return e=je(13,n,t,o),e.elementType=Al,e.lanes=l,e;case Fl:return e=je(19,n,t,o),e.elementType=Fl,e.lanes=l,e;case fu:return $o(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cu:i=10;break e;case du:i=9;break e;case Ri:i=11;break e;case Oi:i=14;break e;case gt:i=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return t=je(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function Qt(e,t,n,r){return e=je(7,e,r,t),e.lanes=n,e}function $o(e,t,n,r){return e=je(22,e,r,t),e.elementType=fu,e.lanes=n,e.stateNode={isHidden:!1},e}function Il(e,t,n){return e=je(6,e,null,t),e.lanes=n,e}function Ml(e,t,n){return t=je(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function rm(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=yl(0),this.expirationTimes=yl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yl(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function ma(e,t,n,r,o,l,i,a,s){return e=new rm(e,t,n,a,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=je(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Xi(l),e}function om(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:on,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function rd(e){if(!e)return Lt;e=e._reactInternals;e:{if(Jt(e)!==e||e.tag!==1)throw Error(y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(y(171))}if(e.tag===1){var n=e.type;if(ke(n))return rc(e,n,t)}return t}function od(e,t,n,r,o,l,i,a,s){return e=ma(n,r,!0,e,o,l,i,a,s),e.context=rd(null),n=e.current,r=ge(),o=Ct(n),l=st(r,o),l.callback=t??null,Nt(n,l,o),e.current.lanes=o,xr(e,o,r),qe(e,r),e}function Ho(e,t,n,r){var o=t.current,l=ge(),i=Ct(o);return n=rd(n),t.context===null?t.context=n:t.pendingContext=n,t=st(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Nt(o,t,i),e!==null&&(be(e,o,i,l),to(e,o,i)),i}function Ro(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function au(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function va(e,t){au(e,t),(e=e.alternate)&&au(e,t)}function lm(){return null}var ld=typeof reportError=="function"?reportError:function(e){console.error(e)};function ga(e){this._internalRoot=e}Wo.prototype.render=ga.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));Ho(e,t,null,null)};Wo.prototype.unmount=ga.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Xt(function(){Ho(null,e,null,null)}),t[ct]=null}};function Wo(e){this._internalRoot=e}Wo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Du();e={blockedOn:null,target:e,priority:t};for(var n=0;n<yt.length&&t!==0&&t<yt[n].priority;n++);yt.splice(n,0,e),n===0&&Au(e)}};function ha(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Qo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function su(){}function im(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var c=Ro(i);l.call(c)}}var i=od(t,r,e,0,null,!1,!1,"",su);return e._reactRootContainer=i,e[ct]=i.current,fr(e.nodeType===8?e.parentNode:e),Xt(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var c=Ro(s);a.call(c)}}var s=ma(e,0,!1,null,null,!1,!1,"",su);return e._reactRootContainer=s,e[ct]=s.current,fr(e.nodeType===8?e.parentNode:e),Xt(function(){Ho(t,s,n,r)}),s}function bo(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var a=o;o=function(){var s=Ro(i);a.call(s)}}Ho(t,i,e,o)}else i=im(n,t,e,o,r);return Ro(i)}Iu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=bn(t.pendingLanes);n!==0&&(Di(t,n|1),qe(t,X()),!(I&6)&&(Pn=X()+500,It()))}break;case 13:Xt(function(){var r=dt(e,1);if(r!==null){var o=ge();be(r,e,1,o)}}),va(e,1)}};ji=function(e){if(e.tag===13){var t=dt(e,134217728);if(t!==null){var n=ge();be(t,e,134217728,n)}va(e,134217728)}};Mu=function(e){if(e.tag===13){var t=Ct(e),n=dt(e,t);if(n!==null){var r=ge();be(n,e,t,r)}va(e,t)}};Du=function(){return D};ju=function(e,t){var n=D;try{return D=e,t()}finally{D=n}};Gl=function(e,t,n){switch(t){case"input":if(Vl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=jo(r);if(!o)throw Error(y(90));mu(r),Vl(r,o)}}}break;case"textarea":gu(e,n);break;case"select":t=n.value,t!=null&&hn(e,!!n.multiple,t,!1)}};qu=ca;Su=Xt;var am={usingClientEntryPoint:!1,Events:[qr,cn,jo,xu,ku,ca]},$n={findFiberByHostInstance:Vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sm={bundleType:$n.bundleType,version:$n.version,rendererPackageName:$n.rendererPackageName,rendererConfig:$n.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:pt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Eu(e),e===null?null:e.stateNode},findFiberByHostInstance:$n.findFiberByHostInstance||lm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Hn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Hn.isDisabled&&Hn.supportsFiber))try{Oo=Hn.inject(sm),Je=Hn}catch{}var Hn;Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=am;Te.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ha(t))throw Error(y(200));return om(e,t,null,n)};Te.createRoot=function(e,t){if(!ha(e))throw Error(y(299));var n=!1,r="",o=ld;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ma(e,1,!1,null,null,n,!1,r,o),e[ct]=t.current,fr(e.nodeType===8?e.parentNode:e),new ga(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=Eu(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Xt(e)};Te.hydrate=function(e,t,n){if(!Qo(t))throw Error(y(200));return bo(null,e,t,!0,n)};Te.hydrateRoot=function(e,t,n){if(!ha(e))throw Error(y(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=ld;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=od(t,null,e,1,n??null,o,!1,l,i),e[ct]=t.current,fr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Wo(t)};Te.render=function(e,t,n){if(!Qo(t))throw Error(y(200));return bo(null,e,t,!1,n)};Te.unmountComponentAtNode=function(e){if(!Qo(e))throw Error(y(40));return e._reactRootContainer?(Xt(function(){bo(null,null,e,!1,function(){e._reactRootContainer=null,e[ct]=null})}),!0):!1};Te.unstable_batchedUpdates=ca;Te.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Qo(n))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return bo(e,t,n,!1,r)};Te.version="18.3.1-next-f1338f8080-20240426"});var ud=rt((Rm,sd)=>{"use strict";function ad(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ad)}catch(e){console.error(e)}}ad(),sd.exports=id()});var dd=rt(ya=>{"use strict";var cd=ud();ya.createRoot=cd.createRoot,ya.hydrateRoot=cd.hydrateRoot;var Om});var md=rt(Go=>{"use strict";var dm=Oe(),fm=Symbol.for("react.element"),pm=Symbol.for("react.fragment"),mm=Object.prototype.hasOwnProperty,vm=dm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,gm={key:!0,ref:!0,__self:!0,__source:!0};function pd(e,t,n){var r,o={},l=null,i=null;n!==void 0&&(l=""+n),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)mm.call(t,r)&&!gm.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:fm,type:e,key:l,ref:i,props:o,_owner:vm.current}}Go.Fragment=pm;Go.jsx=pd;Go.jsxs=pd});var re=rt((jm,vd)=>{"use strict";vd.exports=md()});var Sv=A(Oe(),1),Ea=A(dd(),1);var B=A(Oe(),1);function Mt(e,t){return e?e.callWS(t):Promise.reject(new Error("Not connected to Home Assistant"))}function fd(e,t,n){return e?e.connection.subscribeMessage(n,t):Promise.reject(new Error("Not connected to Home Assistant"))}var um="/api/quizify/player_ws";function cm(){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${um}`}var Yo=class{constructor({onEvent:t,onStatus:n}){this._onEvent=t||(()=>{}),this._onStatus=n||(()=>{}),this._ws=null,this._closedByUser=!1,this._backoff=500,this._maxBackoff=1e4,this._pingTimer=null,this._reconnectTimer=null,this._resume=null}setResume(t){this._resume=t}connect(){this._closedByUser=!1,this._open()}_open(){this._onStatus("connecting");let t;try{t=new WebSocket(cm())}catch{this._scheduleReconnect();return}this._ws=t,t.addEventListener("open",()=>{this._backoff=500,this._onStatus("open"),this._resume&&this._send({type:"resume",...this._resume}),this._startPing()}),t.addEventListener("message",n=>{let r;try{r=JSON.parse(n.data)}catch{return}r?.event!=="pong"&&this._onEvent(r)}),t.addEventListener("close",()=>{this._stopPing(),this._ws=null,this._onStatus("closed"),this._closedByUser||this._scheduleReconnect()}),t.addEventListener("error",()=>{})}_scheduleReconnect(){this._closedByUser||(clearTimeout(this._reconnectTimer),this._reconnectTimer=setTimeout(()=>this._open(),this._backoff),this._backoff=Math.min(this._maxBackoff,this._backoff*2))}_startPing(){this._stopPing(),this._pingTimer=setInterval(()=>{this._send({type:"ping"})},25e3)}_stopPing(){this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null)}send(t){return this._send(t)}_send(t){let n=this._ws;if(!n||n.readyState!==WebSocket.OPEN)return!1;try{return n.send(JSON.stringify(t)),!0}catch{return!1}}close(){if(this._closedByUser=!0,clearTimeout(this._reconnectTimer),this._stopPing(),this._ws){try{this._ws.close()}catch{}this._ws=null}}};var Am=A(Oe(),1),Dt=A(re(),1);function Se({connected:e,subtitle:t}){return(0,Dt.jsxs)("div",{className:"qz-header",children:[(0,Dt.jsxs)("div",{children:[(0,Dt.jsx)("div",{className:"qz-brand",children:"Quizify"}),t&&(0,Dt.jsx)("div",{className:"qz-label",style:{marginTop:4},children:t})]}),(0,Dt.jsxs)("div",{className:"qz-header-status",children:[(0,Dt.jsx)("span",{className:`qz-status-dot ${e?"":"qz-status-off"}`}),e?"Connected":"Offline"]})]})}var Vm=A(Oe(),1);var gd=["A","B","C","D","E","F"],za={adults:"Adults",kids:"Kids"},hd={adults:"Trickier questions, broader topics",kids:"Age-appropriate, simpler wording"},wa={general_knowledge:"General Knowledge",science:"Science",geography:"Geography",history:"History",sport:"Sport",food_and_drink:"Food & Drink",literature:"Literature",language:"Language & Words",art:"Art & Architecture",technology:"Technology & Inventions",mythology:"Mythology & Religion",animals:"Animals & Nature",random:"Random Mix"},yd={general_knowledge:"\u{1F9E0}",science:"\u{1F52C}",geography:"\u{1F30D}",history:"\u{1F3DB}\uFE0F",sport:"\u26BD",food_and_drink:"\u{1F377}",literature:"\u{1F4DA}",language:"\u{1F4AC}",art:"\u{1F3A8}",technology:"\u{1F4BB}",mythology:"\u26A1",animals:"\u{1F981}",random:"\u{1F3B2}"},xa={easy:"Easy",medium:"Medium",hard:"Hard",mixed:"Mixed"};function zd(e){return(e||"?").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0].toUpperCase()).join("")}function wd(e){return`${window.location.origin}/quizify/play?code=${encodeURIComponent(e)}`}function xd(e){return`/api/quizify/qr?data=${encodeURIComponent(e)}`}function Ko(){return Date.now()/1e3}var L=A(re(),1);function kd({value:e,onChange:t}){return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:"Mode"}),(0,L.jsx)("div",{className:"qz-mode-tiles",children:Object.keys(za).map(n=>(0,L.jsxs)("button",{type:"button",className:`qz-mode-tile ${e===n?"qz-active":""}`,onClick:()=>t(n),children:[(0,L.jsx)("div",{className:"qz-mode-tile-emoji",children:n==="adults"?"\u{1F9E0}":"\u{1F388}"}),(0,L.jsx)("div",{className:"qz-mode-tile-title",children:za[n]}),(0,L.jsx)("div",{className:"qz-mode-tile-desc",children:hd[n]})]},n))})]})}function qd({value:e,onChange:t,available:n}){let r=[{id:"random",count:n.reduce((o,l)=>o+l.count,0)},...n];return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:"Category"}),(0,L.jsx)("div",{className:"qz-category-grid",children:r.map(o=>(0,L.jsxs)("button",{type:"button",className:`qz-category-tile ${e===o.id?"qz-active":""}`,onClick:()=>t(o.id),disabled:o.count===0,title:wa[o.id]||o.id,children:[(0,L.jsx)("div",{className:"qz-category-tile-emoji",children:yd[o.id]||"\u2753"}),(0,L.jsx)("div",{className:"qz-category-tile-title",children:wa[o.id]||o.id}),(0,L.jsxs)("div",{className:"qz-category-tile-count",children:[o.count," Qs"]})]},o.id))})]})}function Sd({value:e,onChange:t}){return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:"Difficulty"}),(0,L.jsx)("div",{className:"qz-pill-row",children:Object.keys(xa).map(n=>(0,L.jsx)("button",{type:"button",className:`qz-pill ${e===n?"qz-active":""}`,onClick:()=>t(n),children:xa[n]},n))})]})}function ka({label:e,value:t,onChange:n,options:r}){return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:e}),(0,L.jsx)("div",{className:"qz-pill-row",children:r.map(o=>(0,L.jsx)("button",{type:"button",className:`qz-pill ${t===o?"qz-active":""}`,onClick:()=>n(o),children:o},o))})]})}function _d({speakers:e,value:t,onChange:n}){return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:"Background music (optional)"}),(0,L.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,L.jsx)("option",{value:"",children:"No music"}),e.map(r=>(0,L.jsxs)("option",{value:r.entity_id,children:[r.name," ",r.supports_mass?"\xB7 Music Assistant":""]},r.entity_id))]})]})}var hm=[{id:"hype",label:"\u{1F3A4} Hype Master",desc:"Pure energy, maximum excitement"},{id:"drill",label:"\u{1FA96} Drill Sergeant",desc:"No mercy, no excuses, MOVE IT"},{id:"soap",label:"\u{1F3AD} Soap Opera Host",desc:"Dramatic pauses and swelling music"},{id:"conspiracy",label:"\u{1F50D} Conspiracy Theorist",desc:"They don't want you to know the answers"},{id:"parent",label:"\u{1F624} Disappointed Parent",desc:"I'm not angry, just... disappointed"},{id:"sports",label:"\u{1F4FA} Sports Commentator",desc:"WHAT a performance, folks!"}];function Nd({value:e,onChange:t}){return(0,L.jsxs)("div",{className:"qz-stack",children:[(0,L.jsx)("div",{className:"qz-label",children:"Announcer Personality"}),(0,L.jsx)("div",{className:"qz-personality-grid",children:hm.map(n=>(0,L.jsxs)("button",{type:"button",className:`qz-personality-tile${e===n.id?" qz-active":""}`,onClick:()=>t(n.id),children:[(0,L.jsx)("div",{className:"qz-personality-label",children:n.label}),(0,L.jsx)("div",{className:"qz-personality-desc",children:n.desc})]},n.id))})]})}function Ed({ttsEntities:e,value:t,onChange:n}){return(0,L.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,L.jsx)("option",{value:"",children:"No TTS announcements"}),e.length===0&&(0,L.jsx)("option",{disabled:!0,value:"_none",children:"No tts.* entities found in HA"}),e.map(r=>(0,L.jsx)("option",{value:r.entity_id,children:r.name},r.entity_id))]})}var Qm=A(Oe(),1);var jt=A(re(),1);function Cd({joinCode:e}){let t=wd(e);return(0,jt.jsxs)("div",{className:"qz-qr-card",children:[(0,jt.jsx)("div",{className:"qz-label",children:"Scan to join"}),(0,jt.jsx)("div",{className:"qz-qr-frame",children:(0,jt.jsx)("img",{src:xd(t),alt:`QR code for ${t}`})}),(0,jt.jsx)("div",{className:"qz-join-code",children:e}),(0,jt.jsx)("div",{className:"qz-join-url",children:t})]})}var Km=A(Oe(),1);var ye=A(re(),1);function Pd({players:e,highlightId:t}){return!e||e.length===0?(0,ye.jsx)("div",{className:"qz-empty",children:"Waiting for players to join\u2026"}):(0,ye.jsx)("div",{className:"qz-player-list",children:e.map(n=>{let r=`qz-player-row${n.player_id===t?" qz-highlight":""}`;return(0,ye.jsxs)("div",{className:r,children:[(0,ye.jsx)("div",{className:"qz-player-avatar",children:zd(n.name)}),(0,ye.jsx)("div",{className:"qz-player-name",children:n.name}),(0,ye.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}function Rn({players:e,highlightId:t}){return!e||e.length===0?null:(0,ye.jsx)("div",{className:"qz-scoreboard-list",children:e.map((n,r)=>{let o=["qz-scoreboard-row"];return r<3&&o.push("qz-top"),n.player_id===t&&o.push("qz-highlight"),(0,ye.jsxs)("div",{className:o.join(" "),children:[(0,ye.jsx)("div",{className:`qz-rank qz-rank-${r+1}`,children:r+1}),(0,ye.jsxs)("div",{children:[(0,ye.jsx)("strong",{children:n.name}),n.streak>=3&&(0,ye.jsxs)("span",{className:"qz-streak-badge",children:["\u{1F525} ",n.streak]})]}),(0,ye.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}var At=A(Oe(),1);var Z=A(re(),1),qa=null;function Td(){if(!qa)try{qa=new(window.AudioContext||window.webkitAudioContext)}catch{return null}return qa}function ym(e=880,t=.08,n=.18){let r=Td();if(r)try{r.state==="suspended"&&r.resume();let o=r.createOscillator(),l=r.createGain();o.connect(l),l.connect(r.destination),o.frequency.value=e,o.type="sine",l.gain.setValueAtTime(n,r.currentTime),l.gain.exponentialRampToValueAtTime(.001,r.currentTime+t),o.start(r.currentTime),o.stop(r.currentTime+t)}catch{}}function Xo({question:e,index:t,total:n,deadline:r,selected:o,correct:l,onAnswer:i,reveal:a,lifelines:s,onLifeline:c}){let[m,p]=(0,At.useState)(()=>Math.max(0,(r||0)-Ko())),v=(0,At.useRef)(-1);(0,At.useEffect)(()=>{let d=()=>{Td()};return document.addEventListener("click",d,{once:!0}),document.addEventListener("touchstart",d,{once:!0}),()=>{document.removeEventListener("click",d),document.removeEventListener("touchstart",d)}},[]),(0,At.useEffect)(()=>{v.current=-1},[t]),(0,At.useEffect)(()=>{if(!r)return;let d=()=>{let f=Math.max(0,r-Ko());if(p(f),!a&&o===null&&f>0&&f<=5){let g=Math.ceil(f);if(g!==v.current){v.current=g;let w=g<=2?1200:g<=3?1e3:880,S=g<=2?.28:g<=3?.22:.16;ym(w,.1,S)}}};d();let u=setInterval(d,100);return()=>clearInterval(u)},[r,a,o]);let h=Math.max(1,(r||0)-(e?.startedAt||Ko())),x=r?Math.max(0,Math.min(100,m/h*100)):100,z=m<5&&!a&&o===null;function j(d){let u=o===d;return a?d===l?u?"qz-answer qz-correct qz-correct-mine":"qz-answer qz-correct":u?"qz-answer qz-wrong":"qz-answer qz-neutral":s?.revealedIndex===d&&o===null?"qz-answer qz-peeked":u?"qz-answer qz-selected":"qz-answer"}return(0,Z.jsxs)("div",{className:"qz-question-stage",children:[(0,Z.jsxs)("div",{className:"qz-progress",children:[(0,Z.jsxs)("div",{className:"qz-label",children:["Q",t+1," / ",n]}),(0,Z.jsx)("div",{className:"qz-progress-bar",children:(0,Z.jsx)("div",{className:`qz-progress-fill${z?" qz-progress-fill-low":""}`,style:{width:`${x}%`}})}),(0,Z.jsxs)("div",{className:`qz-timer ${z?"qz-timer-low":""}`,children:[Math.ceil(m),"s"]})]}),(0,Z.jsx)("div",{className:"qz-question-text",children:e.question}),!a&&c&&(0,Z.jsxs)("div",{className:"qz-lifelines",children:[(0,Z.jsxs)("button",{type:"button",className:`qz-lifeline-btn${s?.doublePointsActive?" qz-lifeline-active":""}`,onClick:()=>c("doublePoints"),disabled:s?.doublePointsActive||o!==null,title:"Double points \u2014 or lose 1000 if you're wrong!",children:[(0,Z.jsx)("span",{className:"qz-lifeline-icon",children:"\u26A1"}),(0,Z.jsx)("span",{className:"qz-lifeline-label",children:s?.doublePointsActive?"2\xD7 ON!":"2\xD7 or \u22121000"})]}),(0,Z.jsxs)("button",{type:"button",className:`qz-lifeline-btn${s?.revealAnswer?" qz-lifeline-used":""}`,onClick:()=>c("revealAnswer"),disabled:s?.revealAnswer||o!==null,title:"Peek at the correct answer \u2014 once per game!",children:[(0,Z.jsx)("span",{className:"qz-lifeline-icon",children:"\u{1F441}\uFE0F"}),(0,Z.jsx)("span",{className:"qz-lifeline-label",children:s?.revealAnswer?"Used":"Reveal"})]})]}),(0,Z.jsx)("div",{className:"qz-answers",children:e.answers.map((d,u)=>{let f=!a&&s?.revealedIndex===u&&o===null;return(0,Z.jsxs)("button",{type:"button",className:j(u),onClick:()=>!a&&o===null&&i&&i(u),disabled:a||o!==null||!i,"aria-pressed":o===u,children:[(0,Z.jsx)("div",{className:"qz-answer-letter","aria-hidden":"true",children:gd[u]}),(0,Z.jsx)("div",{className:"qz-answer-text",children:d}),f&&(0,Z.jsx)("span",{className:"qz-peeked-badge",children:"\u2713 correct"})]},u)})})]})}var rv=A(Oe(),1);var Le=A(re(),1);function Zo({players:e,onRematch:t,onEnd:n,highlightId:r}){let o=e?.[0];return(0,Le.jsxs)("div",{children:[(0,Le.jsxs)("div",{className:"qz-finale",children:[(0,Le.jsx)("div",{className:"qz-trophy",children:"\u{1F3C6}"}),(0,Le.jsx)("h1",{className:"qz-winner-name",children:o?.name||"\u2014"}),(0,Le.jsxs)("div",{className:"qz-winner-score",children:[(o?.score||0).toLocaleString()," points"]}),(0,Le.jsxs)("div",{className:"qz-row-wrap",style:{justifyContent:"center"},children:[t&&(0,Le.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:t,children:"Rematch"}),n&&(0,Le.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:n,children:"End Game"})]})]}),(0,Le.jsxs)("div",{className:"qz-card",children:[(0,Le.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Final standings"}),(0,Le.jsx)(Rn,{players:e,highlightId:r})]})]})}var N=A(re(),1),zm={mode:"adults",category:"random",difficulty:"mixed",questions_per_round:10,question_time:20,music_player:null,music_uri:"",tts_entity:null,tts_personality:"hype"};function Ld({hass:e}){let[t,n]=(0,B.useState)(!1),[r,o]=(0,B.useState)(null),[l,i]=(0,B.useState)([]),[a,s]=(0,B.useState)([]),[c,m]=(0,B.useState)(zm),[p,v]=(0,B.useState)(null),[h,x]=(0,B.useState)(null),[z,j]=(0,B.useState)(null),d=(0,B.useRef)(null),u=(0,B.useRef)(!1);(0,B.useEffect)(()=>{n(!!e?.connected)},[e?.connected]),(0,B.useEffect)(()=>{if(!e)return;let E=!1;return(async()=>{try{let T=await Mt(e,{type:"quizify/categories/list"});E||o(T||{adults:[],kids:[]})}catch(T){E||(j(T?.message||"Could not load categories"),o({adults:[],kids:[]}))}try{let T=await Mt(e,{type:"quizify/speakers/list"});E||i(T?.speakers||[])}catch{E||i([])}try{let T=await Mt(e,{type:"quizify/tts/list"});E||s(T?.tts_entities||[])}catch{E||s([])}})(),()=>{E=!0}},[e]);let f=(0,B.useMemo)(()=>r?r[c.mode]||[]:[],[r,c.mode]);(0,B.useEffect)(()=>{if(!f.length||c.category==="random")return;let E=f.find(T=>T.id===c.category);(!E||E.count===0)&&m(T=>({...T,category:"random"}))},[f,c.category]);let g=(0,B.useCallback)(E=>{x(E),setTimeout(()=>x(T=>T===E?null:T),2200)},[]),w=(0,B.useCallback)(async E=>{if(e&&!u.current){u.current=!0;try{if(d.current){try{d.current()}catch{}d.current=null}d.current=await fd(e,{type:"quizify/admin/subscribe",session_id:E},T=>{T?.game&&v(T.game)})}catch(T){g(T?.message||"Could not subscribe")}finally{u.current=!1}}},[e,g]),S=(0,B.useCallback)(async()=>{if(e)try{let E=await Mt(e,{type:"quizify/game/create",mode:c.mode,category:c.category,difficulty:c.difficulty,questions_per_round:c.questions_per_round,question_time:c.question_time,music_player:c.music_player||null,music_uri:c.music_uri||null,tts_entity:c.tts_entity||null,tts_personality:c.tts_personality||"hype"});v(E.game),await w(E.session_id)}catch(E){g(E?.message||"Could not create game")}},[e,c,g,w]),_=(0,B.useCallback)(async()=>{if(!(!e||!p))try{await Mt(e,{type:"quizify/game/start",session_id:p.session_id})}catch(E){g(E?.message||"Could not start game")}},[e,p,g]),C=(0,B.useCallback)(async()=>{if(!(!e||!p)){try{await Mt(e,{type:"quizify/game/end",session_id:p.session_id})}catch{}if(d.current){try{d.current()}catch{}d.current=null}v(null)}},[e,p]),G=(0,B.useCallback)(async()=>{if(!(!e||!p))try{let E=await Mt(e,{type:"quizify/game/rematch",session_id:p.session_id});v(E.game),await w(E.session_id)}catch(E){g(E?.message||"Rematch failed")}},[e,p,g,w]);if((0,B.useEffect)(()=>()=>{if(d.current){try{d.current()}catch{}d.current=null}},[]),!e)return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:!1,subtitle:"Admin"}),(0,N.jsx)("div",{className:"qz-card",children:(0,N.jsx)("div",{className:"qz-empty",children:"Loading\u2026"})})]});if(z&&!r)return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:t,subtitle:"Admin"}),(0,N.jsxs)("div",{className:"qz-card",children:[(0,N.jsx)("h2",{className:"qz-display",style:{fontSize:24,marginTop:0},children:"Couldn't load Quizify"}),(0,N.jsx)("div",{className:"qz-mono",style:{marginTop:12},children:z})]})]});if(!p)return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:t,subtitle:"Admin \xB7 Setup"}),(0,N.jsx)("div",{className:"qz-card",children:(0,N.jsxs)("div",{className:"qz-stack",children:[(0,N.jsx)(kd,{value:c.mode,onChange:E=>m(T=>({...T,mode:E,category:"random"}))}),r&&(0,N.jsx)(qd,{value:c.category,available:f,onChange:E=>m(T=>({...T,category:E}))}),(0,N.jsx)(Sd,{value:c.difficulty,onChange:E=>m(T=>({...T,difficulty:E}))}),(0,N.jsxs)("div",{className:"qz-setup-grid",children:[(0,N.jsx)(ka,{label:"Questions",value:c.questions_per_round,onChange:E=>m(T=>({...T,questions_per_round:E})),options:[5,10,15,20]}),(0,N.jsx)(ka,{label:"Seconds per question",value:c.question_time,onChange:E=>m(T=>({...T,question_time:E})),options:[15,20,30,45]})]}),(0,N.jsxs)("div",{className:"qz-setup-grid",children:[(0,N.jsx)(_d,{speakers:l,value:c.music_player,onChange:E=>m(T=>({...T,music_player:E}))}),(0,N.jsxs)("div",{className:"qz-stack",children:[(0,N.jsx)("div",{className:"qz-label",children:"Playlist URI (optional)"}),(0,N.jsx)("input",{type:"text",className:"qz-input",placeholder:"e.g. spotify:playlist:...",value:c.music_uri,onChange:E=>m(T=>({...T,music_uri:E.target.value}))})]})]}),(0,N.jsxs)("div",{className:"qz-stack",children:[(0,N.jsx)("div",{className:"qz-label",children:"TTS Announcer entity (optional)"}),(0,N.jsx)(Ed,{ttsEntities:a,value:c.tts_entity,onChange:E=>m(T=>({...T,tts_entity:E}))}),(0,N.jsx)("div",{className:"qz-muted",style:{fontSize:12},children:"If set, funny TTS announcements play before the game and for the winner. Pick your TTS engine (e.g. Google Translate, Nabu Casa Cloud TTS). The background music speaker above is used as the output."})]}),c.tts_entity&&(0,N.jsx)(Nd,{value:c.tts_personality,onChange:E=>m(T=>({...T,tts_personality:E}))}),(0,N.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:S,disabled:!r||!t,style:{alignSelf:"flex-start",marginTop:8},children:"Create Game \u2192"})]})}),h&&(0,N.jsx)("div",{className:"qz-toast",children:h})]});if(p.state==="ended")return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:t,subtitle:"Admin \xB7 Game Over"}),(0,N.jsx)(Zo,{players:p.players,onRematch:G,onEnd:C}),h&&(0,N.jsx)("div",{className:"qz-toast",children:h})]});if(p.state==="lobby")return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:t,subtitle:"Admin \xB7 Lobby"}),(0,N.jsxs)("div",{className:"qz-lobby",children:[(0,N.jsx)(Cd,{joinCode:p.join_code}),(0,N.jsxs)("div",{className:"qz-stack",children:[(0,N.jsxs)("div",{className:"qz-card",children:[(0,N.jsxs)("div",{className:"qz-display qz-lobby-heading",children:["Players (",p.players.length,")"]}),(0,N.jsx)(Pd,{players:p.players})]}),(0,N.jsxs)("div",{className:"qz-row-wrap",children:[(0,N.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:_,disabled:p.players.length===0,children:"Start Game"}),(0,N.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:C,children:"Cancel"})]})]})]}),h&&(0,N.jsx)("div",{className:"qz-toast",children:h})]});let P=p.current_question;return(0,N.jsxs)("div",{className:"qz-app",children:[(0,N.jsx)(Se,{connected:t,subtitle:`Admin \xB7 ${p.state==="reveal"?"Reveal":"Question"}`}),P&&(0,N.jsx)(Xo,{question:{question:P.question,answers:P.answers,startedAt:P.deadline-(p.settings?.question_time||20)},index:P.index,total:P.total,deadline:P.deadline,selected:null,correct:P.correct!==void 0?P.correct:null,reveal:p.state==="reveal"}),p.state==="reveal"&&P?.explanation&&(0,N.jsxs)("div",{className:"qz-reveal-banner",children:[(0,N.jsx)("div",{className:"qz-label",children:"Why"}),(0,N.jsx)("div",{className:"qz-reveal-explanation",children:P.explanation})]}),(0,N.jsxs)("div",{className:"qz-card",style:{marginTop:20},children:[(0,N.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Live Scoreboard"}),(0,N.jsx)(Rn,{players:p.players})]}),(0,N.jsx)("div",{className:"qz-row-wrap",style:{marginTop:16},children:(0,N.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:C,children:"End Game"})}),h&&(0,N.jsx)("div",{className:"qz-toast",children:h})]})}var Y=A(Oe(),1);var q=A(re(),1),Sa="quizify_player_v3";function wm(){try{let e=window.localStorage.getItem(Sa);return e?JSON.parse(e):null}catch{return null}}function xm(e){try{window.localStorage.setItem(Sa,JSON.stringify(e))}catch{}}function Rd(){try{window.localStorage.removeItem(Sa)}catch{}}var Od={doublePointsActive:!1,revealAnswer:!1,revealedIndex:null};function Id({initialJoinCode:e}){let[t,n]=(0,Y.useState)("connecting"),[r,o]=(0,Y.useState)(null),[l,i]=(0,Y.useState)(null),[a,s]=(0,Y.useState)(null),[c,m]=(0,Y.useState)(e||""),[p,v]=(0,Y.useState)(""),[h,x]=(0,Y.useState)(null),[z,j]=(0,Y.useState)(null),[d,u]=(0,Y.useState)(!1),[f,g]=(0,Y.useState)(null),[w,S]=(0,Y.useState)({...Od}),_=(0,Y.useRef)(null),[C,G]=(0,Y.useState)(null),P=(0,Y.useCallback)(M=>{j(M),setTimeout(()=>j(ee=>ee===M?null:ee),2200)},[]);(0,Y.useEffect)(()=>{let M=wm();M?.join_code===(e||"").toUpperCase()?o(M):M&&!e&&(o(M),m(M.join_code||""));let ee=new Yo({onStatus:n,onEvent:O=>{if(O?.event==="error"){if(O.code==="invalid_token"||O.code==="not_found"){Rd(),o(null),i(null),s(null),P(O.message||"Session ended");return}P(O.message||O.code||"Server error");return}if(O?.event==="peek_result"){O.correct!==null&&O.correct!==void 0&&S(en=>({...en,revealedIndex:O.correct}));return}if(O?.event==="joined"||O?.event==="resumed"){let en={player_id:O.player_id,session_id:O.session_id,player_token:O.player_token,name:O.name,join_code:O.game?.join_code||c.toUpperCase()};o(en),xm(en),ee.setResume({session_id:en.session_id,player_token:en.player_token}),O.game&&i(O.game),O.you&&s(O.you),O.event==="joined"&&u(!1);return}O?.game&&i(O.game),O?.you&&s(O.you),O?.event==="question"&&(x(null),G(null),S({doublePointsActive:!1,revealAnswer:!1,revealedIndex:null}))}});return M?.session_id&&M?.player_token&&ee.setResume({session_id:M.session_id,player_token:M.player_token}),_.current=ee,ee.connect(),()=>{ee.close(),_.current=null}},[]);let E=(0,Y.useCallback)(()=>{let M=_.current;if(!M||t!=="open")return;let ee=c.trim().toUpperCase(),O=p.trim();!ee||O.length===0||(u(!0),g(null),M.send({type:"join",join_code:ee,name:O}),setTimeout(()=>u(!1),4e3))},[c,p,t]),T=(0,Y.useCallback)(M=>{let ee=_.current;if(!ee||!r||h!==null)return;x(M),ee.send({type:"answer",answer:M})||(x(null),P("Disconnected \u2014 try again"))},[r,h,P]),jd=(0,Y.useCallback)(M=>{if(M==="doublePoints"){if(w.doublePointsActive)return;S(ee=>({...ee,doublePointsActive:!0})),P("\u26A1 Double or nothing \u2014 you brave soul!")}else if(M==="revealAnswer"){if(w.revealAnswer)return;let ee=_.current;ee&&ee.send({type:"peek_answer"}),S(O=>({...O,revealAnswer:!0})),P("\u{1F441}\uFE0F The answer has been revealed \u2014 don't tell anyone!")}},[w,P]),Pa=(0,Y.useCallback)(()=>{let M=_.current;if(M){try{M.send({type:"leave"})}catch{}M.setResume(null)}Rd(),o(null),i(null),s(null),x(null),S({...Od})},[]),tt=t==="open";if(!r)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt}),(0,q.jsxs)("div",{className:"qz-join-screen",children:[(0,q.jsxs)("div",{className:"qz-join-hero",children:[(0,q.jsx)("h1",{children:"Quizify"}),(0,q.jsx)("p",{children:"Get in. Get smart. Win."})]}),(0,q.jsx)("div",{className:"qz-card",children:(0,q.jsxs)("div",{className:"qz-stack",children:[(0,q.jsxs)("div",{children:[(0,q.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Join code"}),(0,q.jsx)("input",{type:"text",className:"qz-input qz-mono qz-input-code",inputMode:"text",placeholder:"6 letters",value:c,maxLength:6,onChange:M=>m(M.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")),autoCapitalize:"characters",autoComplete:"off",spellCheck:!1})]}),(0,q.jsxs)("div",{children:[(0,q.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Your name"}),(0,q.jsx)("input",{type:"text",className:"qz-input",placeholder:"Enter a name",value:p,maxLength:20,onChange:M=>v(M.target.value),onKeyDown:M=>{M.key==="Enter"&&E()},autoComplete:"off"})]}),(0,q.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:E,disabled:d||!tt||c.length<4||!p.trim(),children:d?"Joining\u2026":tt?"Join Game":"Connecting\u2026"}),f&&(0,q.jsx)("div",{className:"qz-error-text",children:f})]})})]}),z&&(0,q.jsx)("div",{className:"qz-toast",children:z})]});if(!l)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt,subtitle:r.name}),(0,q.jsx)("div",{className:"qz-empty",children:tt?"Loading game\u2026":"Reconnecting\u2026"})]});if(l.state==="ended")return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt,subtitle:r.name}),(0,q.jsx)(Zo,{players:l.players,highlightId:r.player_id}),(0,q.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,q.jsx)("button",{type:"button",className:"qz-btn",onClick:Pa,children:"Leave"})}),z&&(0,q.jsx)("div",{className:"qz-toast",children:z})]});if(l.state==="lobby")return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt,subtitle:r.name}),(0,q.jsxs)("div",{className:"qz-card qz-center-card",children:[(0,q.jsx)("div",{className:"qz-trophy",style:{fontSize:64},children:"\u{1F44B}"}),(0,q.jsx)("h2",{className:"qz-display qz-lobby-title",children:"You're in"}),(0,q.jsx)("p",{className:"qz-muted",children:"Waiting for the host to start the game\u2026"}),(0,q.jsx)("div",{style:{marginTop:24},children:(0,q.jsxs)("div",{className:"qz-label",children:["Players (",l.players.length,")"]})}),(0,q.jsx)(Rn,{players:l.players,highlightId:r.player_id})]}),(0,q.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,q.jsx)("button",{type:"button",className:"qz-btn",onClick:Pa,children:"Leave"})}),z&&(0,q.jsx)("div",{className:"qz-toast",children:z})]});let Re=l.current_question;if(!Re)return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt,subtitle:r.name}),(0,q.jsx)("div",{className:"qz-empty",children:"Waiting for next question\u2026"})]});let nt=l.state==="reveal",Ad=a?.score??0,Ta=a?.streak??0,Jo=nt&&h!==null&&h===Re.correct,_m=nt&&h!==null&&h!==Re.correct;return(0,q.jsxs)("div",{className:"qz-app",children:[(0,q.jsx)(Se,{connected:tt,subtitle:r.name}),(0,q.jsx)(Xo,{question:{question:Re.question,answers:Re.answers,startedAt:Re.deadline-(l.settings?.question_time||20)},index:Re.index,total:Re.total,deadline:Re.deadline,selected:h,correct:nt?Re.correct:null,onAnswer:T,reveal:nt,lifelines:w,onLifeline:!nt&&h===null?jd:null}),nt&&h!==null&&(0,q.jsxs)("div",{className:`qz-result-banner ${Jo?"qz-result-correct":"qz-result-wrong"}`,children:[(0,q.jsx)("span",{className:"qz-result-icon",children:Jo?"\u{1F389}":"\u{1F480}"}),(0,q.jsx)("span",{className:"qz-result-text",children:Jo?w.doublePointsActive?"Correct! Double points!":"Correct!":w.doublePointsActive?"Wrong\u2026 \u22121000 points!":"Wrong!"})]}),nt&&h===null&&(0,q.jsxs)("div",{className:"qz-result-banner qz-result-timeout",children:[(0,q.jsx)("span",{className:"qz-result-icon",children:"\u23F0"}),(0,q.jsx)("span",{className:"qz-result-text",children:"Time's up!"})]}),nt&&Re.explanation&&(0,q.jsxs)("div",{className:"qz-reveal-banner",children:[(0,q.jsx)("div",{className:"qz-label",children:"\u{1F4A1} Did you know?"}),(0,q.jsx)("div",{className:"qz-reveal-explanation",children:Re.explanation})]}),h!==null&&!nt&&(0,q.jsx)("div",{className:"qz-card qz-answer-feedback-card",children:(0,q.jsxs)("div",{className:"qz-feedback-waiting",children:[(0,q.jsx)("span",{className:"qz-feedback-spinner",children:"\u23F3"}),(0,q.jsx)("span",{children:"Answer locked in! Waiting for reveal\u2026"}),w.doublePointsActive&&(0,q.jsx)("div",{className:"qz-feedback-lifeline-note",children:"\u26A1 Double points gamble active!"})]})}),a&&(0,q.jsxs)("div",{className:"qz-card qz-score-card",children:[(0,q.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Your score"}),(0,q.jsxs)("div",{className:"qz-display qz-score-value",children:[Ad.toLocaleString(),Ta>=3&&(0,q.jsxs)("span",{className:"qz-streak-badge qz-streak-inline",children:["\u{1F525} ",Ta," streak"]})]})]}),z&&(0,q.jsx)("div",{className:"qz-toast",children:z})]})}var _a=`/* ============================================================
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
`;var Ca=A(re(),1),Md=!1;function qm(){if(Md)return;Md=!0;let e=document.createElement("style");e.setAttribute("data-quizify",""),e.textContent=_a,document.head.appendChild(e)}var Na=class extends HTMLElement{constructor(){super(),this._hass=null,this._narrow=!1,this._root=null,this._mountPoint=null}set hass(t){this._hass=t,this._render()}get hass(){return this._hass}set narrow(t){this._narrow=t,this._render()}set route(t){}set panel(t){}connectedCallback(){if(!this.shadowRoot){let t=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=_a,t.appendChild(n);let r=document.createElement("div");r.className="qz-shadow-host",t.appendChild(r),this._mountPoint=r,this._root=(0,Ea.createRoot)(r)}this._render()}disconnectedCallback(){this._root&&queueMicrotask(()=>{try{this._root.unmount()}catch{}this._root=null})}_render(){this._root&&this._root.render((0,Ca.jsx)(Ld,{hass:this._hass,narrow:this._narrow}))}};customElements.get("quizify-panel")||customElements.define("quizify-panel",Na);function Sm(){try{let n=(new URLSearchParams(window.location.search).get("code")||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);if(n)return n}catch{}return""}function Dd(){let e=document.getElementById("quizify-root");if(!e||(e.dataset.view||"")!=="player")return;let n=Sm()||e.dataset.joinCode||"";qm(),(0,Ea.createRoot)(e).render((0,Ca.jsx)(Id,{initialJoinCode:n}))}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Dd):Dd());})();
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
