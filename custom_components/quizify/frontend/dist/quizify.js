(()=>{var Fd=Object.create;var Ta=Object.defineProperty;var Ad=Object.getOwnPropertyDescriptor;var Ud=Object.getOwnPropertyNames;var Bd=Object.getPrototypeOf,Vd=Object.prototype.hasOwnProperty;var nt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var $d=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Ud(t))!Vd.call(e,l)&&l!==n&&Ta(e,l,{get:()=>t[l],enumerable:!(r=Ad(t,l))||r.enumerable});return e};var j=(e,t,n)=>(n=e!=null?Fd(Bd(e)):{},$d(t||!e||!e.__esModule?Ta(n,"default",{value:e,enumerable:!0}):n,e));var Va=nt(T=>{"use strict";var Rn=Symbol.for("react.element"),Wd=Symbol.for("react.portal"),Hd=Symbol.for("react.fragment"),Qd=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),Gd=Symbol.for("react.provider"),Kd=Symbol.for("react.context"),Xd=Symbol.for("react.forward_ref"),Zd=Symbol.for("react.suspense"),Jd=Symbol.for("react.memo"),bd=Symbol.for("react.lazy"),La=Symbol.iterator;function ef(e){return e===null||typeof e!="object"?null:(e=La&&e[La]||e["@@iterator"],typeof e=="function"?e:null)}var Ia={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ma=Object.assign,Da={};function en(e,t,n){this.props=e,this.context=t,this.refs=Da,this.updater=n||Ia}en.prototype.isReactComponent={};en.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};en.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ja(){}ja.prototype=en.prototype;function bl(e,t,n){this.props=e,this.context=t,this.refs=Da,this.updater=n||Ia}var eo=bl.prototype=new ja;eo.constructor=bl;Ma(eo,en.prototype);eo.isPureReactComponent=!0;var Ra=Array.isArray,Fa=Object.prototype.hasOwnProperty,to={current:null},Aa={key:!0,ref:!0,__self:!0,__source:!0};function Ua(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Fa.call(t,r)&&!Aa.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var u=Array(a),c=0;c<a;c++)u[c]=arguments[c+2];l.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:Rn,type:e,key:o,ref:i,props:l,_owner:to.current}}function tf(e,t){return{$$typeof:Rn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function no(e){return typeof e=="object"&&e!==null&&e.$$typeof===Rn}function nf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Oa=/\/+/g;function Jl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?nf(""+e.key):t.toString(36)}function _r(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Rn:case Wd:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Jl(i,0):r,Ra(l)?(n="",e!=null&&(n=e.replace(Oa,"$&/")+"/"),_r(l,t,n,"",function(c){return c})):l!=null&&(no(l)&&(l=tf(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Oa,"$&/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",Ra(e))for(var a=0;a<e.length;a++){o=e[a];var u=r+Jl(o,a);i+=_r(o,t,n,u,l)}else if(u=ef(e),typeof u=="function")for(e=u.call(e),a=0;!(o=e.next()).done;)o=o.value,u=r+Jl(o,a++),i+=_r(o,t,n,u,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Sr(e,t,n){if(e==null)return e;var r=[],l=0;return _r(e,r,"","",function(o){return t.call(n,o,l++)}),r}function rf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},Er={transition:null},lf={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:Er,ReactCurrentOwner:to};function Ba(){throw Error("act(...) is not supported in production builds of React.")}T.Children={map:Sr,forEach:function(e,t,n){Sr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sr(e,function(){t++}),t},toArray:function(e){return Sr(e,function(t){return t})||[]},only:function(e){if(!no(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};T.Component=en;T.Fragment=Hd;T.Profiler=Yd;T.PureComponent=bl;T.StrictMode=Qd;T.Suspense=Zd;T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lf;T.act=Ba;T.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ma({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=to.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in t)Fa.call(t,u)&&!Aa.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&a!==void 0?a[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){a=Array(u);for(var c=0;c<u;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Rn,type:e.type,key:l,ref:o,props:r,_owner:i}};T.createContext=function(e){return e={$$typeof:Kd,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Gd,_context:e},e.Consumer=e};T.createElement=Ua;T.createFactory=function(e){var t=Ua.bind(null,e);return t.type=e,t};T.createRef=function(){return{current:null}};T.forwardRef=function(e){return{$$typeof:Xd,render:e}};T.isValidElement=no;T.lazy=function(e){return{$$typeof:bd,_payload:{_status:-1,_result:e},_init:rf}};T.memo=function(e,t){return{$$typeof:Jd,type:e,compare:t===void 0?null:t}};T.startTransition=function(e){var t=Er.transition;Er.transition={};try{e()}finally{Er.transition=t}};T.unstable_act=Ba;T.useCallback=function(e,t){return fe.current.useCallback(e,t)};T.useContext=function(e){return fe.current.useContext(e)};T.useDebugValue=function(){};T.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};T.useEffect=function(e,t){return fe.current.useEffect(e,t)};T.useId=function(){return fe.current.useId()};T.useImperativeHandle=function(e,t,n){return fe.current.useImperativeHandle(e,t,n)};T.useInsertionEffect=function(e,t){return fe.current.useInsertionEffect(e,t)};T.useLayoutEffect=function(e,t){return fe.current.useLayoutEffect(e,t)};T.useMemo=function(e,t){return fe.current.useMemo(e,t)};T.useReducer=function(e,t,n){return fe.current.useReducer(e,t,n)};T.useRef=function(e){return fe.current.useRef(e)};T.useState=function(e){return fe.current.useState(e)};T.useSyncExternalStore=function(e,t,n){return fe.current.useSyncExternalStore(e,t,n)};T.useTransition=function(){return fe.current.useTransition()};T.version="18.3.1"});var Te=nt((Em,$a)=>{"use strict";$a.exports=Va()});var ba=nt(F=>{"use strict";function io(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<Nr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function Be(e){return e.length===0?null:e[0]}function Pr(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,a=e[i],u=i+1,c=e[u];if(0>Nr(a,n))u<l&&0>Nr(c,a)?(e[r]=c,e[u]=n,r=u):(e[r]=a,e[i]=n,r=i);else if(u<l&&0>Nr(c,n))e[r]=c,e[u]=n,r=u;else break e}}return t}function Nr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Wa=performance,F.unstable_now=function(){return Wa.now()}):(ro=Date,Ha=ro.now(),F.unstable_now=function(){return ro.now()-Ha});var Wa,ro,Ha,Ke=[],mt=[],of=1,Le=null,ae=3,Tr=!1,jt=!1,In=!1,Ga=typeof setTimeout=="function"?setTimeout:null,Ka=typeof clearTimeout=="function"?clearTimeout:null,Qa=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ao(e){for(var t=Be(mt);t!==null;){if(t.callback===null)Pr(mt);else if(t.startTime<=e)Pr(mt),t.sortIndex=t.expirationTime,io(Ke,t);else break;t=Be(mt)}}function uo(e){if(In=!1,ao(e),!jt)if(Be(Ke)!==null)jt=!0,co(so);else{var t=Be(mt);t!==null&&fo(uo,t.startTime-e)}}function so(e,t){jt=!1,In&&(In=!1,Ka(Mn),Mn=-1),Tr=!0;var n=ae;try{for(ao(t),Le=Be(Ke);Le!==null&&(!(Le.expirationTime>t)||e&&!Ja());){var r=Le.callback;if(typeof r=="function"){Le.callback=null,ae=Le.priorityLevel;var l=r(Le.expirationTime<=t);t=F.unstable_now(),typeof l=="function"?Le.callback=l:Le===Be(Ke)&&Pr(Ke),ao(t)}else Pr(Ke);Le=Be(Ke)}if(Le!==null)var o=!0;else{var i=Be(mt);i!==null&&fo(uo,i.startTime-t),o=!1}return o}finally{Le=null,ae=n,Tr=!1}}var Lr=!1,Cr=null,Mn=-1,Xa=5,Za=-1;function Ja(){return!(F.unstable_now()-Za<Xa)}function lo(){if(Cr!==null){var e=F.unstable_now();Za=e;var t=!0;try{t=Cr(!0,e)}finally{t?On():(Lr=!1,Cr=null)}}else Lr=!1}var On;typeof Qa=="function"?On=function(){Qa(lo)}:typeof MessageChannel<"u"?(oo=new MessageChannel,Ya=oo.port2,oo.port1.onmessage=lo,On=function(){Ya.postMessage(null)}):On=function(){Ga(lo,0)};var oo,Ya;function co(e){Cr=e,Lr||(Lr=!0,On())}function fo(e,t){Mn=Ga(function(){e(F.unstable_now())},t)}F.unstable_IdlePriority=5;F.unstable_ImmediatePriority=1;F.unstable_LowPriority=4;F.unstable_NormalPriority=3;F.unstable_Profiling=null;F.unstable_UserBlockingPriority=2;F.unstable_cancelCallback=function(e){e.callback=null};F.unstable_continueExecution=function(){jt||Tr||(jt=!0,co(so))};F.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Xa=0<e?Math.floor(1e3/e):5};F.unstable_getCurrentPriorityLevel=function(){return ae};F.unstable_getFirstCallbackNode=function(){return Be(Ke)};F.unstable_next=function(e){switch(ae){case 1:case 2:case 3:var t=3;break;default:t=ae}var n=ae;ae=t;try{return e()}finally{ae=n}};F.unstable_pauseExecution=function(){};F.unstable_requestPaint=function(){};F.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ae;ae=e;try{return t()}finally{ae=n}};F.unstable_scheduleCallback=function(e,t,n){var r=F.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:of++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,io(mt,e),Be(Ke)===null&&e===Be(mt)&&(In?(Ka(Mn),Mn=-1):In=!0,fo(uo,n-r))):(e.sortIndex=l,io(Ke,e),jt||Tr||(jt=!0,co(so))),e};F.unstable_shouldYield=Ja;F.unstable_wrapCallback=function(e){var t=ae;return function(){var n=ae;ae=t;try{return e.apply(this,arguments)}finally{ae=n}}}});var tu=nt((Cm,eu)=>{"use strict";eu.exports=ba()});var od=nt(Ce=>{"use strict";var af=Te(),Ee=tu();function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var us=new Set,rr={};function Xt(e,t){xn(e,t),xn(e+"Capture",t)}function xn(e,t){for(rr[e]=t,e=0;e<t.length;e++)us.add(t[e])}var ut=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mo=Object.prototype.hasOwnProperty,uf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nu={},ru={};function sf(e){return Mo.call(ru,e)?!0:Mo.call(nu,e)?!1:uf.test(e)?ru[e]=!0:(nu[e]=!0,!1)}function cf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function df(e,t,n,r){if(t===null||typeof t>"u"||cf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ve(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ie[e]=new ve(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ie[t]=new ve(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ie[e]=new ve(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ie[e]=new ve(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ie[e]=new ve(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ie[e]=new ve(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ie[e]=new ve(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ie[e]=new ve(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ie[e]=new ve(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ni=/[\-:]([a-z])/g;function Ci(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ni,Ci);ie[t]=new ve(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ni,Ci);ie[t]=new ve(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ni,Ci);ie[t]=new ve(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ie[e]=new ve(e,1,!1,e.toLowerCase(),null,!1,!1)});ie.xlinkHref=new ve("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ie[e]=new ve(e,1,!1,e.toLowerCase(),null,!0,!0)});function Pi(e,t,n,r){var l=ie.hasOwnProperty(t)?ie[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(df(t,n,l,r)&&(n=null),r||l===null?sf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ft=af.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Rr=Symbol.for("react.element"),rn=Symbol.for("react.portal"),ln=Symbol.for("react.fragment"),Ti=Symbol.for("react.strict_mode"),Do=Symbol.for("react.profiler"),ss=Symbol.for("react.provider"),cs=Symbol.for("react.context"),Li=Symbol.for("react.forward_ref"),jo=Symbol.for("react.suspense"),Fo=Symbol.for("react.suspense_list"),Ri=Symbol.for("react.memo"),gt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var ds=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var lu=Symbol.iterator;function Dn(e){return e===null||typeof e!="object"?null:(e=lu&&e[lu]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,po;function Wn(e){if(po===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);po=t&&t[1]||""}return`
`+po+e}var mo=!1;function vo(e,t){if(!e||mo)return"";mo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,a=o.length-1;1<=i&&0<=a&&l[i]!==o[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==o[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==o[a]){var u=`
`+l[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=a);break}}}finally{mo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Wn(e):""}function ff(e){switch(e.tag){case 5:return Wn(e.type);case 16:return Wn("Lazy");case 13:return Wn("Suspense");case 19:return Wn("SuspenseList");case 0:case 2:case 15:return e=vo(e.type,!1),e;case 11:return e=vo(e.type.render,!1),e;case 1:return e=vo(e.type,!0),e;default:return""}}function Ao(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ln:return"Fragment";case rn:return"Portal";case Do:return"Profiler";case Ti:return"StrictMode";case jo:return"Suspense";case Fo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case cs:return(e.displayName||"Context")+".Consumer";case ss:return(e._context.displayName||"Context")+".Provider";case Li:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ri:return t=e.displayName||null,t!==null?t:Ao(e.type)||"Memo";case gt:t=e._payload,e=e._init;try{return Ao(e(t))}catch{}}return null}function pf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ao(t);case 8:return t===Ti?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Tt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function fs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function mf(e){var t=fs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Or(e){e._valueTracker||(e._valueTracker=mf(e))}function ps(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=fs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function al(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Uo(e,t){var n=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ou(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Tt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ms(e,t){t=t.checked,t!=null&&Pi(e,"checked",t,!1)}function Bo(e,t){ms(e,t);var n=Tt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Vo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Vo(e,t.type,Tt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function iu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Vo(e,t,n){(t!=="number"||al(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Hn=Array.isArray;function gn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Tt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function $o(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(h(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function au(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(h(92));if(Hn(n)){if(1<n.length)throw Error(h(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Tt(n)}}function vs(e,t){var n=Tt(t.value),r=Tt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function uu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ir,hs=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ir=Ir||document.createElement("div"),Ir.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ir.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function lr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Gn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vf=["Webkit","ms","Moz","O"];Object.keys(Gn).forEach(function(e){vf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Gn[t]=Gn[e]})});function ys(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Gn.hasOwnProperty(e)&&Gn[e]?(""+t).trim():t+"px"}function zs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ys(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var gf=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ho(e,t){if(t){if(gf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(h(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(h(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(h(61))}if(t.style!=null&&typeof t.style!="object")throw Error(h(62))}}function Qo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yo=null;function Oi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Go=null,hn=null,yn=null;function su(e){if(e=xr(e)){if(typeof Go!="function")throw Error(h(280));var t=e.stateNode;t&&(t=Ml(t),Go(e.stateNode,e.type,t))}}function ws(e){hn?yn?yn.push(e):yn=[e]:hn=e}function ks(){if(hn){var e=hn,t=yn;if(yn=hn=null,su(e),t)for(e=0;e<t.length;e++)su(t[e])}}function xs(e,t){return e(t)}function qs(){}var go=!1;function Ss(e,t,n){if(go)return e(t,n);go=!0;try{return xs(e,t,n)}finally{go=!1,(hn!==null||yn!==null)&&(qs(),ks())}}function or(e,t){var n=e.stateNode;if(n===null)return null;var r=Ml(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(h(231,t,typeof n));return n}var Ko=!1;if(ut)try{tn={},Object.defineProperty(tn,"passive",{get:function(){Ko=!0}}),window.addEventListener("test",tn,tn),window.removeEventListener("test",tn,tn)}catch{Ko=!1}var tn;function hf(e,t,n,r,l,o,i,a,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(p){this.onError(p)}}var Kn=!1,ul=null,sl=!1,Xo=null,yf={onError:function(e){Kn=!0,ul=e}};function zf(e,t,n,r,l,o,i,a,u){Kn=!1,ul=null,hf.apply(yf,arguments)}function wf(e,t,n,r,l,o,i,a,u){if(zf.apply(this,arguments),Kn){if(Kn){var c=ul;Kn=!1,ul=null}else throw Error(h(198));sl||(sl=!0,Xo=c)}}function Zt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function _s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cu(e){if(Zt(e)!==e)throw Error(h(188))}function kf(e){var t=e.alternate;if(!t){if(t=Zt(e),t===null)throw Error(h(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return cu(l),e;if(o===r)return cu(l),t;o=o.sibling}throw Error(h(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,a=l.child;a;){if(a===n){i=!0,n=l,r=o;break}if(a===r){i=!0,r=l,n=o;break}a=a.sibling}if(!i){for(a=o.child;a;){if(a===n){i=!0,n=o,r=l;break}if(a===r){i=!0,r=o,n=l;break}a=a.sibling}if(!i)throw Error(h(189))}}if(n.alternate!==r)throw Error(h(190))}if(n.tag!==3)throw Error(h(188));return n.stateNode.current===n?e:t}function Es(e){return e=kf(e),e!==null?Ns(e):null}function Ns(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ns(e);if(t!==null)return t;e=e.sibling}return null}var Cs=Ee.unstable_scheduleCallback,du=Ee.unstable_cancelCallback,xf=Ee.unstable_shouldYield,qf=Ee.unstable_requestPaint,K=Ee.unstable_now,Sf=Ee.unstable_getCurrentPriorityLevel,Ii=Ee.unstable_ImmediatePriority,Ps=Ee.unstable_UserBlockingPriority,cl=Ee.unstable_NormalPriority,_f=Ee.unstable_LowPriority,Ts=Ee.unstable_IdlePriority,Ll=null,be=null;function Ef(e){if(be&&typeof be.onCommitFiberRoot=="function")try{be.onCommitFiberRoot(Ll,e,void 0,(e.current.flags&128)===128)}catch{}}var Qe=Math.clz32?Math.clz32:Pf,Nf=Math.log,Cf=Math.LN2;function Pf(e){return e>>>=0,e===0?32:31-(Nf(e)/Cf|0)|0}var Mr=64,Dr=4194304;function Qn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function dl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var a=i&~l;a!==0?r=Qn(a):(o&=i,o!==0&&(r=Qn(o)))}else i=n&~l,i!==0?r=Qn(i):o!==0&&(r=Qn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qe(t),l=1<<n,r|=e[n],t&=~l;return r}function Tf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Lf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Qe(o),a=1<<i,u=l[i];u===-1?(!(a&n)||a&r)&&(l[i]=Tf(a,t)):u<=t&&(e.expiredLanes|=a),o&=~a}}function Zo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ls(){var e=Mr;return Mr<<=1,!(Mr&4194240)&&(Mr=64),e}function ho(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qe(t),e[t]=n}function Rf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Qe(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Mi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var D=0;function Rs(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Os,Di,Is,Ms,Ds,Jo=!1,jr=[],xt=null,qt=null,St=null,ir=new Map,ar=new Map,yt=[],Of="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fu(e,t){switch(e){case"focusin":case"focusout":xt=null;break;case"dragenter":case"dragleave":qt=null;break;case"mouseover":case"mouseout":St=null;break;case"pointerover":case"pointerout":ir.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ar.delete(t.pointerId)}}function jn(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=xr(t),t!==null&&Di(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function If(e,t,n,r,l){switch(t){case"focusin":return xt=jn(xt,e,t,n,r,l),!0;case"dragenter":return qt=jn(qt,e,t,n,r,l),!0;case"mouseover":return St=jn(St,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return ir.set(o,jn(ir.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,ar.set(o,jn(ar.get(o)||null,e,t,n,r,l)),!0}return!1}function js(e){var t=Ut(e.target);if(t!==null){var n=Zt(t);if(n!==null){if(t=n.tag,t===13){if(t=_s(n),t!==null){e.blockedOn=t,Ds(e.priority,function(){Is(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Zr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yo=r,n.target.dispatchEvent(r),Yo=null}else return t=xr(n),t!==null&&Di(t),e.blockedOn=n,!1;t.shift()}return!0}function pu(e,t,n){Zr(e)&&n.delete(t)}function Mf(){Jo=!1,xt!==null&&Zr(xt)&&(xt=null),qt!==null&&Zr(qt)&&(qt=null),St!==null&&Zr(St)&&(St=null),ir.forEach(pu),ar.forEach(pu)}function Fn(e,t){e.blockedOn===t&&(e.blockedOn=null,Jo||(Jo=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,Mf)))}function ur(e){function t(l){return Fn(l,e)}if(0<jr.length){Fn(jr[0],e);for(var n=1;n<jr.length;n++){var r=jr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(xt!==null&&Fn(xt,e),qt!==null&&Fn(qt,e),St!==null&&Fn(St,e),ir.forEach(t),ar.forEach(t),n=0;n<yt.length;n++)r=yt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<yt.length&&(n=yt[0],n.blockedOn===null);)js(n),n.blockedOn===null&&yt.shift()}var zn=ft.ReactCurrentBatchConfig,fl=!0;function Df(e,t,n,r){var l=D,o=zn.transition;zn.transition=null;try{D=1,ji(e,t,n,r)}finally{D=l,zn.transition=o}}function jf(e,t,n,r){var l=D,o=zn.transition;zn.transition=null;try{D=4,ji(e,t,n,r)}finally{D=l,zn.transition=o}}function ji(e,t,n,r){if(fl){var l=bo(e,t,n,r);if(l===null)So(e,t,r,pl,n),fu(e,r);else if(If(l,e,t,n,r))r.stopPropagation();else if(fu(e,r),t&4&&-1<Of.indexOf(e)){for(;l!==null;){var o=xr(l);if(o!==null&&Os(o),o=bo(e,t,n,r),o===null&&So(e,t,r,pl,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else So(e,t,r,null,n)}}var pl=null;function bo(e,t,n,r){if(pl=null,e=Oi(r),e=Ut(e),e!==null)if(t=Zt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=_s(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return pl=e,null}function Fs(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Sf()){case Ii:return 1;case Ps:return 4;case cl:case _f:return 16;case Ts:return 536870912;default:return 16}default:return 16}}var wt=null,Fi=null,Jr=null;function As(){if(Jr)return Jr;var e,t=Fi,n=t.length,r,l="value"in wt?wt.value:wt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Jr=l.slice(e,1<r?1-r:void 0)}function br(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Fr(){return!0}function mu(){return!1}function Ne(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Fr:mu,this.isPropagationStopped=mu,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Fr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Fr)},persist:function(){},isPersistent:Fr}),t}var Pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ai=Ne(Pn),kr=Y({},Pn,{view:0,detail:0}),Ff=Ne(kr),yo,zo,An,Rl=Y({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ui,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==An&&(An&&e.type==="mousemove"?(yo=e.screenX-An.screenX,zo=e.screenY-An.screenY):zo=yo=0,An=e),yo)},movementY:function(e){return"movementY"in e?e.movementY:zo}}),vu=Ne(Rl),Af=Y({},Rl,{dataTransfer:0}),Uf=Ne(Af),Bf=Y({},kr,{relatedTarget:0}),wo=Ne(Bf),Vf=Y({},Pn,{animationName:0,elapsedTime:0,pseudoElement:0}),$f=Ne(Vf),Wf=Y({},Pn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hf=Ne(Wf),Qf=Y({},Pn,{data:0}),gu=Ne(Qf),Yf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Kf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Kf[e])?!!t[e]:!1}function Ui(){return Xf}var Zf=Y({},kr,{key:function(e){if(e.key){var t=Yf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=br(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ui,charCode:function(e){return e.type==="keypress"?br(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?br(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jf=Ne(Zf),bf=Y({},Rl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hu=Ne(bf),ep=Y({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ui}),tp=Ne(ep),np=Y({},Pn,{propertyName:0,elapsedTime:0,pseudoElement:0}),rp=Ne(np),lp=Y({},Rl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),op=Ne(lp),ip=[9,13,27,32],Bi=ut&&"CompositionEvent"in window,Xn=null;ut&&"documentMode"in document&&(Xn=document.documentMode);var ap=ut&&"TextEvent"in window&&!Xn,Us=ut&&(!Bi||Xn&&8<Xn&&11>=Xn),yu=" ",zu=!1;function Bs(e,t){switch(e){case"keyup":return ip.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vs(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var on=!1;function up(e,t){switch(e){case"compositionend":return Vs(t);case"keypress":return t.which!==32?null:(zu=!0,yu);case"textInput":return e=t.data,e===yu&&zu?null:e;default:return null}}function sp(e,t){if(on)return e==="compositionend"||!Bi&&Bs(e,t)?(e=As(),Jr=Fi=wt=null,on=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Us&&t.locale!=="ko"?null:t.data;default:return null}}var cp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!cp[e.type]:t==="textarea"}function $s(e,t,n,r){ws(r),t=ml(t,"onChange"),0<t.length&&(n=new Ai("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Zn=null,sr=null;function dp(e){ec(e,0)}function Ol(e){var t=sn(e);if(ps(t))return e}function fp(e,t){if(e==="change")return t}var Ws=!1;ut&&(ut?(Ur="oninput"in document,Ur||(ko=document.createElement("div"),ko.setAttribute("oninput","return;"),Ur=typeof ko.oninput=="function"),Ar=Ur):Ar=!1,Ws=Ar&&(!document.documentMode||9<document.documentMode));var Ar,Ur,ko;function ku(){Zn&&(Zn.detachEvent("onpropertychange",Hs),sr=Zn=null)}function Hs(e){if(e.propertyName==="value"&&Ol(sr)){var t=[];$s(t,sr,e,Oi(e)),Ss(dp,t)}}function pp(e,t,n){e==="focusin"?(ku(),Zn=t,sr=n,Zn.attachEvent("onpropertychange",Hs)):e==="focusout"&&ku()}function mp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ol(sr)}function vp(e,t){if(e==="click")return Ol(t)}function gp(e,t){if(e==="input"||e==="change")return Ol(t)}function hp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ge=typeof Object.is=="function"?Object.is:hp;function cr(e,t){if(Ge(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Mo.call(t,l)||!Ge(e[l],t[l]))return!1}return!0}function xu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qu(e,t){var n=xu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xu(n)}}function Qs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ys(){for(var e=window,t=al();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=al(e.document)}return t}function Vi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function yp(e){var t=Ys(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Qs(n.ownerDocument.documentElement,n)){if(r!==null&&Vi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=qu(n,o);var i=qu(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zp=ut&&"documentMode"in document&&11>=document.documentMode,an=null,ei=null,Jn=null,ti=!1;function Su(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ti||an==null||an!==al(r)||(r=an,"selectionStart"in r&&Vi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jn&&cr(Jn,r)||(Jn=r,r=ml(ei,"onSelect"),0<r.length&&(t=new Ai("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=an)))}function Br(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var un={animationend:Br("Animation","AnimationEnd"),animationiteration:Br("Animation","AnimationIteration"),animationstart:Br("Animation","AnimationStart"),transitionend:Br("Transition","TransitionEnd")},xo={},Gs={};ut&&(Gs=document.createElement("div").style,"AnimationEvent"in window||(delete un.animationend.animation,delete un.animationiteration.animation,delete un.animationstart.animation),"TransitionEvent"in window||delete un.transitionend.transition);function Il(e){if(xo[e])return xo[e];if(!un[e])return e;var t=un[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gs)return xo[e]=t[n];return e}var Ks=Il("animationend"),Xs=Il("animationiteration"),Zs=Il("animationstart"),Js=Il("transitionend"),bs=new Map,_u="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){bs.set(e,t),Xt(t,[e])}for(Vr=0;Vr<_u.length;Vr++)$r=_u[Vr],Eu=$r.toLowerCase(),Nu=$r[0].toUpperCase()+$r.slice(1),Rt(Eu,"on"+Nu);var $r,Eu,Nu,Vr;Rt(Ks,"onAnimationEnd");Rt(Xs,"onAnimationIteration");Rt(Zs,"onAnimationStart");Rt("dblclick","onDoubleClick");Rt("focusin","onFocus");Rt("focusout","onBlur");Rt(Js,"onTransitionEnd");xn("onMouseEnter",["mouseout","mouseover"]);xn("onMouseLeave",["mouseout","mouseover"]);xn("onPointerEnter",["pointerout","pointerover"]);xn("onPointerLeave",["pointerout","pointerover"]);Xt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yn));function Cu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,wf(r,t,void 0,e),e.currentTarget=null}function ec(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var a=r[i],u=a.instance,c=a.currentTarget;if(a=a.listener,u!==o&&l.isPropagationStopped())break e;Cu(l,a,c),o=u}else for(i=0;i<r.length;i++){if(a=r[i],u=a.instance,c=a.currentTarget,a=a.listener,u!==o&&l.isPropagationStopped())break e;Cu(l,a,c),o=u}}}if(sl)throw e=Xo,sl=!1,Xo=null,e}function U(e,t){var n=t[ii];n===void 0&&(n=t[ii]=new Set);var r=e+"__bubble";n.has(r)||(tc(t,e,2,!1),n.add(r))}function qo(e,t,n){var r=0;t&&(r|=4),tc(n,e,r,t)}var Wr="_reactListening"+Math.random().toString(36).slice(2);function dr(e){if(!e[Wr]){e[Wr]=!0,us.forEach(function(n){n!=="selectionchange"&&(wp.has(n)||qo(n,!1,e),qo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Wr]||(t[Wr]=!0,qo("selectionchange",!1,t))}}function tc(e,t,n,r){switch(Fs(t)){case 1:var l=Df;break;case 4:l=jf;break;default:l=ji}n=l.bind(null,t,n,e),l=void 0,!Ko||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function So(e,t,n,r,l){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;i=i.return}for(;a!==null;){if(i=Ut(a),i===null)return;if(u=i.tag,u===5||u===6){r=o=i;continue e}a=a.parentNode}}r=r.return}Ss(function(){var c=o,p=Oi(n),m=[];e:{var v=bs.get(e);if(v!==void 0){var z=Ai,k=e;switch(e){case"keypress":if(br(n)===0)break e;case"keydown":case"keyup":z=Jf;break;case"focusin":k="focus",z=wo;break;case"focusout":k="blur",z=wo;break;case"beforeblur":case"afterblur":z=wo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":z=vu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":z=Uf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":z=tp;break;case Ks:case Xs:case Zs:z=$f;break;case Js:z=rp;break;case"scroll":z=Ff;break;case"wheel":z=op;break;case"copy":case"cut":case"paste":z=Hf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":z=hu}var y=(t&4)!==0,I=!y&&e==="scroll",d=y?v!==null?v+"Capture":null:v;y=[];for(var s=c,f;s!==null;){f=s;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=or(s,d),g!=null&&y.push(fr(s,g,f)))),I)break;s=s.return}0<y.length&&(v=new z(v,k,null,n,p),m.push({event:v,listeners:y}))}}if(!(t&7)){e:{if(v=e==="mouseover"||e==="pointerover",z=e==="mouseout"||e==="pointerout",v&&n!==Yo&&(k=n.relatedTarget||n.fromElement)&&(Ut(k)||k[st]))break e;if((z||v)&&(v=p.window===p?p:(v=p.ownerDocument)?v.defaultView||v.parentWindow:window,z?(k=n.relatedTarget||n.toElement,z=c,k=k?Ut(k):null,k!==null&&(I=Zt(k),k!==I||k.tag!==5&&k.tag!==6)&&(k=null)):(z=null,k=c),z!==k)){if(y=vu,g="onMouseLeave",d="onMouseEnter",s="mouse",(e==="pointerout"||e==="pointerover")&&(y=hu,g="onPointerLeave",d="onPointerEnter",s="pointer"),I=z==null?v:sn(z),f=k==null?v:sn(k),v=new y(g,s+"leave",z,n,p),v.target=I,v.relatedTarget=f,g=null,Ut(p)===c&&(y=new y(d,s+"enter",k,n,p),y.target=f,y.relatedTarget=I,g=y),I=g,z&&k)t:{for(y=z,d=k,s=0,f=y;f;f=nn(f))s++;for(f=0,g=d;g;g=nn(g))f++;for(;0<s-f;)y=nn(y),s--;for(;0<f-s;)d=nn(d),f--;for(;s--;){if(y===d||d!==null&&y===d.alternate)break t;y=nn(y),d=nn(d)}y=null}else y=null;z!==null&&Pu(m,v,z,y,!1),k!==null&&I!==null&&Pu(m,I,k,y,!0)}}e:{if(v=c?sn(c):window,z=v.nodeName&&v.nodeName.toLowerCase(),z==="select"||z==="input"&&v.type==="file")var x=fp;else if(wu(v))if(Ws)x=gp;else{x=mp;var S=pp}else(z=v.nodeName)&&z.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(x=vp);if(x&&(x=x(e,c))){$s(m,x,n,p);break e}S&&S(e,v,c),e==="focusout"&&(S=v._wrapperState)&&S.controlled&&v.type==="number"&&Vo(v,"number",v.value)}switch(S=c?sn(c):window,e){case"focusin":(wu(S)||S.contentEditable==="true")&&(an=S,ei=c,Jn=null);break;case"focusout":Jn=ei=an=null;break;case"mousedown":ti=!0;break;case"contextmenu":case"mouseup":case"dragend":ti=!1,Su(m,n,p);break;case"selectionchange":if(zp)break;case"keydown":case"keyup":Su(m,n,p)}var q;if(Bi)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else on?Bs(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Us&&n.locale!=="ko"&&(on||N!=="onCompositionStart"?N==="onCompositionEnd"&&on&&(q=As()):(wt=p,Fi="value"in wt?wt.value:wt.textContent,on=!0)),S=ml(c,N),0<S.length&&(N=new gu(N,e,null,n,p),m.push({event:N,listeners:S}),q?N.data=q:(q=Vs(n),q!==null&&(N.data=q)))),(q=ap?up(e,n):sp(e,n))&&(c=ml(c,"onBeforeInput"),0<c.length&&(p=new gu("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:c}),p.data=q))}ec(m,t)})}function fr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ml(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=or(e,n),o!=null&&r.unshift(fr(e,o,l)),o=or(e,t),o!=null&&r.push(fr(e,o,l))),e=e.return}return r}function nn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pu(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var a=n,u=a.alternate,c=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&c!==null&&(a=c,l?(u=or(n,o),u!=null&&i.unshift(fr(n,u,a))):l||(u=or(n,o),u!=null&&i.push(fr(n,u,a)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var kp=/\r\n?/g,xp=/\u0000|\uFFFD/g;function Tu(e){return(typeof e=="string"?e:""+e).replace(kp,`
`).replace(xp,"")}function Hr(e,t,n){if(t=Tu(t),Tu(e)!==t&&n)throw Error(h(425))}function vl(){}var ni=null,ri=null;function li(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var oi=typeof setTimeout=="function"?setTimeout:void 0,qp=typeof clearTimeout=="function"?clearTimeout:void 0,Lu=typeof Promise=="function"?Promise:void 0,Sp=typeof queueMicrotask=="function"?queueMicrotask:typeof Lu<"u"?function(e){return Lu.resolve(null).then(e).catch(_p)}:oi;function _p(e){setTimeout(function(){throw e})}function _o(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),ur(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);ur(t)}function _t(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ru(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Tn=Math.random().toString(36).slice(2),Je="__reactFiber$"+Tn,pr="__reactProps$"+Tn,st="__reactContainer$"+Tn,ii="__reactEvents$"+Tn,Ep="__reactListeners$"+Tn,Np="__reactHandles$"+Tn;function Ut(e){var t=e[Je];if(t)return t;for(var n=e.parentNode;n;){if(t=n[st]||n[Je]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ru(e);e!==null;){if(n=e[Je])return n;e=Ru(e)}return t}e=n,n=e.parentNode}return null}function xr(e){return e=e[Je]||e[st],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function sn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(h(33))}function Ml(e){return e[pr]||null}var ai=[],cn=-1;function Ot(e){return{current:e}}function B(e){0>cn||(e.current=ai[cn],ai[cn]=null,cn--)}function A(e,t){cn++,ai[cn]=e.current,e.current=t}var Lt={},de=Ot(Lt),ze=Ot(!1),Ht=Lt;function qn(e,t){var n=e.type.contextTypes;if(!n)return Lt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function we(e){return e=e.childContextTypes,e!=null}function gl(){B(ze),B(de)}function Ou(e,t,n){if(de.current!==Lt)throw Error(h(168));A(de,t),A(ze,n)}function nc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(h(108,pf(e)||"Unknown",l));return Y({},n,r)}function hl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Lt,Ht=de.current,A(de,e),A(ze,ze.current),!0}function Iu(e,t,n){var r=e.stateNode;if(!r)throw Error(h(169));n?(e=nc(e,t,Ht),r.__reactInternalMemoizedMergedChildContext=e,B(ze),B(de),A(de,e)):B(ze),A(ze,n)}var lt=null,Dl=!1,Eo=!1;function rc(e){lt===null?lt=[e]:lt.push(e)}function Cp(e){Dl=!0,rc(e)}function It(){if(!Eo&&lt!==null){Eo=!0;var e=0,t=D;try{var n=lt;for(D=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}lt=null,Dl=!1}catch(l){throw lt!==null&&(lt=lt.slice(e+1)),Cs(Ii,It),l}finally{D=t,Eo=!1}}return null}var dn=[],fn=0,yl=null,zl=0,Re=[],Oe=0,Qt=null,ot=1,it="";function Ft(e,t){dn[fn++]=zl,dn[fn++]=yl,yl=e,zl=t}function lc(e,t,n){Re[Oe++]=ot,Re[Oe++]=it,Re[Oe++]=Qt,Qt=e;var r=ot;e=it;var l=32-Qe(r)-1;r&=~(1<<l),n+=1;var o=32-Qe(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,ot=1<<32-Qe(t)+l|n<<l|r,it=o+e}else ot=1<<o|n<<l|r,it=e}function $i(e){e.return!==null&&(Ft(e,1),lc(e,1,0))}function Wi(e){for(;e===yl;)yl=dn[--fn],dn[fn]=null,zl=dn[--fn],dn[fn]=null;for(;e===Qt;)Qt=Re[--Oe],Re[Oe]=null,it=Re[--Oe],Re[Oe]=null,ot=Re[--Oe],Re[Oe]=null}var _e=null,Se=null,$=!1,He=null;function oc(e,t){var n=Ie(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Mu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,_e=e,Se=_t(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,_e=e,Se=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Qt!==null?{id:ot,overflow:it}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ie(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,_e=e,Se=null,!0):!1;default:return!1}}function ui(e){return(e.mode&1)!==0&&(e.flags&128)===0}function si(e){if($){var t=Se;if(t){var n=t;if(!Mu(e,t)){if(ui(e))throw Error(h(418));t=_t(n.nextSibling);var r=_e;t&&Mu(e,t)?oc(r,n):(e.flags=e.flags&-4097|2,$=!1,_e=e)}}else{if(ui(e))throw Error(h(418));e.flags=e.flags&-4097|2,$=!1,_e=e}}}function Du(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;_e=e}function Qr(e){if(e!==_e)return!1;if(!$)return Du(e),$=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!li(e.type,e.memoizedProps)),t&&(t=Se)){if(ui(e))throw ic(),Error(h(418));for(;t;)oc(e,t),t=_t(t.nextSibling)}if(Du(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Se=_t(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Se=null}}else Se=_e?_t(e.stateNode.nextSibling):null;return!0}function ic(){for(var e=Se;e;)e=_t(e.nextSibling)}function Sn(){Se=_e=null,$=!1}function Hi(e){He===null?He=[e]:He.push(e)}var Pp=ft.ReactCurrentBatchConfig;function Un(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(h(309));var r=n.stateNode}if(!r)throw Error(h(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var a=l.refs;i===null?delete a[o]:a[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(h(284));if(!n._owner)throw Error(h(290,e))}return e}function Yr(e,t){throw e=Object.prototype.toString.call(t),Error(h(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ju(e){var t=e._init;return t(e._payload)}function ac(e){function t(d,s){if(e){var f=d.deletions;f===null?(d.deletions=[s],d.flags|=16):f.push(s)}}function n(d,s){if(!e)return null;for(;s!==null;)t(d,s),s=s.sibling;return null}function r(d,s){for(d=new Map;s!==null;)s.key!==null?d.set(s.key,s):d.set(s.index,s),s=s.sibling;return d}function l(d,s){return d=Pt(d,s),d.index=0,d.sibling=null,d}function o(d,s,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<s?(d.flags|=2,s):f):(d.flags|=2,s)):(d.flags|=1048576,s)}function i(d){return e&&d.alternate===null&&(d.flags|=2),d}function a(d,s,f,g){return s===null||s.tag!==6?(s=Oo(f,d.mode,g),s.return=d,s):(s=l(s,f),s.return=d,s)}function u(d,s,f,g){var x=f.type;return x===ln?p(d,s,f.props.children,g,f.key):s!==null&&(s.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===gt&&ju(x)===s.type)?(g=l(s,f.props),g.ref=Un(d,s,f),g.return=d,g):(g=il(f.type,f.key,f.props,null,d.mode,g),g.ref=Un(d,s,f),g.return=d,g)}function c(d,s,f,g){return s===null||s.tag!==4||s.stateNode.containerInfo!==f.containerInfo||s.stateNode.implementation!==f.implementation?(s=Io(f,d.mode,g),s.return=d,s):(s=l(s,f.children||[]),s.return=d,s)}function p(d,s,f,g,x){return s===null||s.tag!==7?(s=Wt(f,d.mode,g,x),s.return=d,s):(s=l(s,f),s.return=d,s)}function m(d,s,f){if(typeof s=="string"&&s!==""||typeof s=="number")return s=Oo(""+s,d.mode,f),s.return=d,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case Rr:return f=il(s.type,s.key,s.props,null,d.mode,f),f.ref=Un(d,null,s),f.return=d,f;case rn:return s=Io(s,d.mode,f),s.return=d,s;case gt:var g=s._init;return m(d,g(s._payload),f)}if(Hn(s)||Dn(s))return s=Wt(s,d.mode,f,null),s.return=d,s;Yr(d,s)}return null}function v(d,s,f,g){var x=s!==null?s.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return x!==null?null:a(d,s,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Rr:return f.key===x?u(d,s,f,g):null;case rn:return f.key===x?c(d,s,f,g):null;case gt:return x=f._init,v(d,s,x(f._payload),g)}if(Hn(f)||Dn(f))return x!==null?null:p(d,s,f,g,null);Yr(d,f)}return null}function z(d,s,f,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,a(s,d,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Rr:return d=d.get(g.key===null?f:g.key)||null,u(s,d,g,x);case rn:return d=d.get(g.key===null?f:g.key)||null,c(s,d,g,x);case gt:var S=g._init;return z(d,s,f,S(g._payload),x)}if(Hn(g)||Dn(g))return d=d.get(f)||null,p(s,d,g,x,null);Yr(s,g)}return null}function k(d,s,f,g){for(var x=null,S=null,q=s,N=s=0,E=null;q!==null&&N<f.length;N++){q.index>N?(E=q,q=null):E=q.sibling;var w=v(d,q,f[N],g);if(w===null){q===null&&(q=E);break}e&&q&&w.alternate===null&&t(d,q),s=o(w,s,N),S===null?x=w:S.sibling=w,S=w,q=E}if(N===f.length)return n(d,q),$&&Ft(d,N),x;if(q===null){for(;N<f.length;N++)q=m(d,f[N],g),q!==null&&(s=o(q,s,N),S===null?x=q:S.sibling=q,S=q);return $&&Ft(d,N),x}for(q=r(d,q);N<f.length;N++)E=z(q,d,N,f[N],g),E!==null&&(e&&E.alternate!==null&&q.delete(E.key===null?N:E.key),s=o(E,s,N),S===null?x=E:S.sibling=E,S=E);return e&&q.forEach(function(Fe){return t(d,Fe)}),$&&Ft(d,N),x}function y(d,s,f,g){var x=Dn(f);if(typeof x!="function")throw Error(h(150));if(f=x.call(f),f==null)throw Error(h(151));for(var S=x=null,q=s,N=s=0,E=null,w=f.next();q!==null&&!w.done;N++,w=f.next()){q.index>N?(E=q,q=null):E=q.sibling;var Fe=v(d,q,w.value,g);if(Fe===null){q===null&&(q=E);break}e&&q&&Fe.alternate===null&&t(d,q),s=o(Fe,s,N),S===null?x=Fe:S.sibling=Fe,S=Fe,q=E}if(w.done)return n(d,q),$&&Ft(d,N),x;if(q===null){for(;!w.done;N++,w=f.next())w=m(d,w.value,g),w!==null&&(s=o(w,s,N),S===null?x=w:S.sibling=w,S=w);return $&&Ft(d,N),x}for(q=r(d,q);!w.done;N++,w=f.next())w=z(q,d,N,w.value,g),w!==null&&(e&&w.alternate!==null&&q.delete(w.key===null?N:w.key),s=o(w,s,N),S===null?x=w:S.sibling=w,S=w);return e&&q.forEach(function(Zl){return t(d,Zl)}),$&&Ft(d,N),x}function I(d,s,f,g){if(typeof f=="object"&&f!==null&&f.type===ln&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Rr:e:{for(var x=f.key,S=s;S!==null;){if(S.key===x){if(x=f.type,x===ln){if(S.tag===7){n(d,S.sibling),s=l(S,f.props.children),s.return=d,d=s;break e}}else if(S.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===gt&&ju(x)===S.type){n(d,S.sibling),s=l(S,f.props),s.ref=Un(d,S,f),s.return=d,d=s;break e}n(d,S);break}else t(d,S);S=S.sibling}f.type===ln?(s=Wt(f.props.children,d.mode,g,f.key),s.return=d,d=s):(g=il(f.type,f.key,f.props,null,d.mode,g),g.ref=Un(d,s,f),g.return=d,d=g)}return i(d);case rn:e:{for(S=f.key;s!==null;){if(s.key===S)if(s.tag===4&&s.stateNode.containerInfo===f.containerInfo&&s.stateNode.implementation===f.implementation){n(d,s.sibling),s=l(s,f.children||[]),s.return=d,d=s;break e}else{n(d,s);break}else t(d,s);s=s.sibling}s=Io(f,d.mode,g),s.return=d,d=s}return i(d);case gt:return S=f._init,I(d,s,S(f._payload),g)}if(Hn(f))return k(d,s,f,g);if(Dn(f))return y(d,s,f,g);Yr(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,s!==null&&s.tag===6?(n(d,s.sibling),s=l(s,f),s.return=d,d=s):(n(d,s),s=Oo(f,d.mode,g),s.return=d,d=s),i(d)):n(d,s)}return I}var _n=ac(!0),uc=ac(!1),wl=Ot(null),kl=null,pn=null,Qi=null;function Yi(){Qi=pn=kl=null}function Gi(e){var t=wl.current;B(wl),e._currentValue=t}function ci(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function wn(e,t){kl=e,Qi=pn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ye=!0),e.firstContext=null)}function De(e){var t=e._currentValue;if(Qi!==e)if(e={context:e,memoizedValue:t,next:null},pn===null){if(kl===null)throw Error(h(308));pn=e,kl.dependencies={lanes:0,firstContext:e}}else pn=pn.next=e;return t}var Bt=null;function Ki(e){Bt===null?Bt=[e]:Bt.push(e)}function sc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Ki(t)):(n.next=l.next,l.next=n),t.interleaved=n,ct(e,r)}function ct(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ht=!1;function Xi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function cc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function at(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Et(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,R&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,ct(e,n)}return l=r.interleaved,l===null?(t.next=t,Ki(r)):(t.next=l.next,l.next=t),r.interleaved=t,ct(e,n)}function el(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Mi(e,n)}}function Fu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xl(e,t,n,r){var l=e.updateQueue;ht=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var u=a,c=u.next;u.next=null,i===null?o=c:i.next=c,i=u;var p=e.alternate;p!==null&&(p=p.updateQueue,a=p.lastBaseUpdate,a!==i&&(a===null?p.firstBaseUpdate=c:a.next=c,p.lastBaseUpdate=u))}if(o!==null){var m=l.baseState;i=0,p=c=u=null,a=o;do{var v=a.lane,z=a.eventTime;if((r&v)===v){p!==null&&(p=p.next={eventTime:z,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var k=e,y=a;switch(v=t,z=n,y.tag){case 1:if(k=y.payload,typeof k=="function"){m=k.call(z,m,v);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=y.payload,v=typeof k=="function"?k.call(z,m,v):k,v==null)break e;m=Y({},m,v);break e;case 2:ht=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,v=l.effects,v===null?l.effects=[a]:v.push(a))}else z={eventTime:z,lane:v,tag:a.tag,payload:a.payload,callback:a.callback,next:null},p===null?(c=p=z,u=m):p=p.next=z,i|=v;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;v=a,a=v.next,v.next=null,l.lastBaseUpdate=v,l.shared.pending=null}}while(!0);if(p===null&&(u=m),l.baseState=u,l.firstBaseUpdate=c,l.lastBaseUpdate=p,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);Gt|=i,e.lanes=i,e.memoizedState=m}}function Au(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(h(191,l));l.call(r)}}}var qr={},et=Ot(qr),mr=Ot(qr),vr=Ot(qr);function Vt(e){if(e===qr)throw Error(h(174));return e}function Zi(e,t){switch(A(vr,t),A(mr,e),A(et,qr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Wo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Wo(t,e)}B(et),A(et,t)}function En(){B(et),B(mr),B(vr)}function dc(e){Vt(vr.current);var t=Vt(et.current),n=Wo(t,e.type);t!==n&&(A(mr,e),A(et,n))}function Ji(e){mr.current===e&&(B(et),B(mr))}var H=Ot(0);function ql(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var No=[];function bi(){for(var e=0;e<No.length;e++)No[e]._workInProgressVersionPrimary=null;No.length=0}var tl=ft.ReactCurrentDispatcher,Co=ft.ReactCurrentBatchConfig,Yt=0,Q=null,b=null,ne=null,Sl=!1,bn=!1,gr=0,Tp=0;function ue(){throw Error(h(321))}function ea(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ge(e[n],t[n]))return!1;return!0}function ta(e,t,n,r,l,o){if(Yt=o,Q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,tl.current=e===null||e.memoizedState===null?Ip:Mp,e=n(r,l),bn){o=0;do{if(bn=!1,gr=0,25<=o)throw Error(h(301));o+=1,ne=b=null,t.updateQueue=null,tl.current=Dp,e=n(r,l)}while(bn)}if(tl.current=_l,t=b!==null&&b.next!==null,Yt=0,ne=b=Q=null,Sl=!1,t)throw Error(h(300));return e}function na(){var e=gr!==0;return gr=0,e}function Ze(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ne===null?Q.memoizedState=ne=e:ne=ne.next=e,ne}function je(){if(b===null){var e=Q.alternate;e=e!==null?e.memoizedState:null}else e=b.next;var t=ne===null?Q.memoizedState:ne.next;if(t!==null)ne=t,b=e;else{if(e===null)throw Error(h(310));b=e,e={memoizedState:b.memoizedState,baseState:b.baseState,baseQueue:b.baseQueue,queue:b.queue,next:null},ne===null?Q.memoizedState=ne=e:ne=ne.next=e}return ne}function hr(e,t){return typeof t=="function"?t(e):t}function Po(e){var t=je(),n=t.queue;if(n===null)throw Error(h(311));n.lastRenderedReducer=e;var r=b,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var a=i=null,u=null,c=o;do{var p=c.lane;if((Yt&p)===p)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var m={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(a=u=m,i=r):u=u.next=m,Q.lanes|=p,Gt|=p}c=c.next}while(c!==null&&c!==o);u===null?i=r:u.next=a,Ge(r,t.memoizedState)||(ye=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,Q.lanes|=o,Gt|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function To(e){var t=je(),n=t.queue;if(n===null)throw Error(h(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Ge(o,t.memoizedState)||(ye=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function fc(){}function pc(e,t){var n=Q,r=je(),l=t(),o=!Ge(r.memoizedState,l);if(o&&(r.memoizedState=l,ye=!0),r=r.queue,ra(gc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ne!==null&&ne.memoizedState.tag&1){if(n.flags|=2048,yr(9,vc.bind(null,n,r,l,t),void 0,null),re===null)throw Error(h(349));Yt&30||mc(n,t,l)}return l}function mc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vc(e,t,n,r){t.value=n,t.getSnapshot=r,hc(t)&&yc(e)}function gc(e,t,n){return n(function(){hc(t)&&yc(e)})}function hc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ge(e,n)}catch{return!0}}function yc(e){var t=ct(e,1);t!==null&&Ye(t,e,1,-1)}function Uu(e){var t=Ze();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hr,lastRenderedState:e},t.queue=e,e=e.dispatch=Op.bind(null,Q,e),[t.memoizedState,e]}function yr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function zc(){return je().memoizedState}function nl(e,t,n,r){var l=Ze();Q.flags|=e,l.memoizedState=yr(1|t,n,void 0,r===void 0?null:r)}function jl(e,t,n,r){var l=je();r=r===void 0?null:r;var o=void 0;if(b!==null){var i=b.memoizedState;if(o=i.destroy,r!==null&&ea(r,i.deps)){l.memoizedState=yr(t,n,o,r);return}}Q.flags|=e,l.memoizedState=yr(1|t,n,o,r)}function Bu(e,t){return nl(8390656,8,e,t)}function ra(e,t){return jl(2048,8,e,t)}function wc(e,t){return jl(4,2,e,t)}function kc(e,t){return jl(4,4,e,t)}function xc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function qc(e,t,n){return n=n!=null?n.concat([e]):null,jl(4,4,xc.bind(null,t,e),n)}function la(){}function Sc(e,t){var n=je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ea(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _c(e,t){var n=je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&ea(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ec(e,t,n){return Yt&21?(Ge(n,t)||(n=Ls(),Q.lanes|=n,Gt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ye=!0),e.memoizedState=n)}function Lp(e,t){var n=D;D=n!==0&&4>n?n:4,e(!0);var r=Co.transition;Co.transition={};try{e(!1),t()}finally{D=n,Co.transition=r}}function Nc(){return je().memoizedState}function Rp(e,t,n){var r=Ct(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Cc(e))Pc(t,n);else if(n=sc(e,t,n,r),n!==null){var l=me();Ye(n,e,r,l),Tc(n,t,r)}}function Op(e,t,n){var r=Ct(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cc(e))Pc(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,a=o(i,n);if(l.hasEagerState=!0,l.eagerState=a,Ge(a,i)){var u=t.interleaved;u===null?(l.next=l,Ki(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=sc(e,t,l,r),n!==null&&(l=me(),Ye(n,e,r,l),Tc(n,t,r))}}function Cc(e){var t=e.alternate;return e===Q||t!==null&&t===Q}function Pc(e,t){bn=Sl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Tc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Mi(e,n)}}var _l={readContext:De,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useInsertionEffect:ue,useLayoutEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useMutableSource:ue,useSyncExternalStore:ue,useId:ue,unstable_isNewReconciler:!1},Ip={readContext:De,useCallback:function(e,t){return Ze().memoizedState=[e,t===void 0?null:t],e},useContext:De,useEffect:Bu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,nl(4194308,4,xc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return nl(4194308,4,e,t)},useInsertionEffect:function(e,t){return nl(4,2,e,t)},useMemo:function(e,t){var n=Ze();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ze();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Rp.bind(null,Q,e),[r.memoizedState,e]},useRef:function(e){var t=Ze();return e={current:e},t.memoizedState=e},useState:Uu,useDebugValue:la,useDeferredValue:function(e){return Ze().memoizedState=e},useTransition:function(){var e=Uu(!1),t=e[0];return e=Lp.bind(null,e[1]),Ze().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Q,l=Ze();if($){if(n===void 0)throw Error(h(407));n=n()}else{if(n=t(),re===null)throw Error(h(349));Yt&30||mc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Bu(gc.bind(null,r,o,e),[e]),r.flags|=2048,yr(9,vc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ze(),t=re.identifierPrefix;if($){var n=it,r=ot;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=gr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Tp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Mp={readContext:De,useCallback:Sc,useContext:De,useEffect:ra,useImperativeHandle:qc,useInsertionEffect:wc,useLayoutEffect:kc,useMemo:_c,useReducer:Po,useRef:zc,useState:function(){return Po(hr)},useDebugValue:la,useDeferredValue:function(e){var t=je();return Ec(t,b.memoizedState,e)},useTransition:function(){var e=Po(hr)[0],t=je().memoizedState;return[e,t]},useMutableSource:fc,useSyncExternalStore:pc,useId:Nc,unstable_isNewReconciler:!1},Dp={readContext:De,useCallback:Sc,useContext:De,useEffect:ra,useImperativeHandle:qc,useInsertionEffect:wc,useLayoutEffect:kc,useMemo:_c,useReducer:To,useRef:zc,useState:function(){return To(hr)},useDebugValue:la,useDeferredValue:function(e){var t=je();return b===null?t.memoizedState=e:Ec(t,b.memoizedState,e)},useTransition:function(){var e=To(hr)[0],t=je().memoizedState;return[e,t]},useMutableSource:fc,useSyncExternalStore:pc,useId:Nc,unstable_isNewReconciler:!1};function $e(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function di(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Y({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Fl={isMounted:function(e){return(e=e._reactInternals)?Zt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=me(),l=Ct(e),o=at(r,l);o.payload=t,n!=null&&(o.callback=n),t=Et(e,o,l),t!==null&&(Ye(t,e,l,r),el(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=me(),l=Ct(e),o=at(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Et(e,o,l),t!==null&&(Ye(t,e,l,r),el(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=me(),r=Ct(e),l=at(n,r);l.tag=2,t!=null&&(l.callback=t),t=Et(e,l,r),t!==null&&(Ye(t,e,r,n),el(t,e,r))}};function Vu(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!cr(n,r)||!cr(l,o):!0}function Lc(e,t,n){var r=!1,l=Lt,o=t.contextType;return typeof o=="object"&&o!==null?o=De(o):(l=we(t)?Ht:de.current,r=t.contextTypes,o=(r=r!=null)?qn(e,l):Lt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Fl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function $u(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Fl.enqueueReplaceState(t,t.state,null)}function fi(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Xi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=De(o):(o=we(t)?Ht:de.current,l.context=qn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(di(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Fl.enqueueReplaceState(l,l.state,null),xl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Nn(e,t){try{var n="",r=t;do n+=ff(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function Lo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function pi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var jp=typeof WeakMap=="function"?WeakMap:Map;function Rc(e,t,n){n=at(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Nl||(Nl=!0,qi=r),pi(e,t)},n}function Oc(e,t,n){n=at(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){pi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){pi(e,t),typeof r!="function"&&(Nt===null?Nt=new Set([this]):Nt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new jp;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Zp.bind(null,e,t,n),t.then(e,e))}function Hu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qu(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=at(-1,1),t.tag=2,Et(n,t,1))),n.lanes|=1),e)}var Fp=ft.ReactCurrentOwner,ye=!1;function pe(e,t,n,r){t.child=e===null?uc(t,null,n,r):_n(t,e.child,n,r)}function Yu(e,t,n,r,l){n=n.render;var o=t.ref;return wn(t,l),r=ta(e,t,n,r,o,l),n=na(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,dt(e,t,l)):($&&n&&$i(t),t.flags|=1,pe(e,t,r,l),t.child)}function Gu(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!fa(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Ic(e,t,o,r,l)):(e=il(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&l)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:cr,n(i,r)&&e.ref===t.ref)return dt(e,t,l)}return t.flags|=1,e=Pt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Ic(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(cr(o,r)&&e.ref===t.ref)if(ye=!1,t.pendingProps=r=o,(e.lanes&l)!==0)e.flags&131072&&(ye=!0);else return t.lanes=e.lanes,dt(e,t,l)}return mi(e,t,n,r,l)}function Mc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},A(vn,qe),qe|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,A(vn,qe),qe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,A(vn,qe),qe|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,A(vn,qe),qe|=r;return pe(e,t,l,n),t.child}function Dc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function mi(e,t,n,r,l){var o=we(n)?Ht:de.current;return o=qn(t,o),wn(t,l),n=ta(e,t,n,r,o,l),r=na(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,dt(e,t,l)):($&&r&&$i(t),t.flags|=1,pe(e,t,n,l),t.child)}function Ku(e,t,n,r,l){if(we(n)){var o=!0;hl(t)}else o=!1;if(wn(t,l),t.stateNode===null)rl(e,t),Lc(t,n,r),fi(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,a=t.memoizedProps;i.props=a;var u=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=De(c):(c=we(n)?Ht:de.current,c=qn(t,c));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==r||u!==c)&&$u(t,i,r,c),ht=!1;var v=t.memoizedState;i.state=v,xl(t,r,i,l),u=t.memoizedState,a!==r||v!==u||ze.current||ht?(typeof p=="function"&&(di(t,n,p,r),u=t.memoizedState),(a=ht||Vu(t,n,a,r,v,u,c))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=c,r=a):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,cc(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:$e(t.type,a),i.props=c,m=t.pendingProps,v=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=De(u):(u=we(n)?Ht:de.current,u=qn(t,u));var z=n.getDerivedStateFromProps;(p=typeof z=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==m||v!==u)&&$u(t,i,r,u),ht=!1,v=t.memoizedState,i.state=v,xl(t,r,i,l);var k=t.memoizedState;a!==m||v!==k||ze.current||ht?(typeof z=="function"&&(di(t,n,z,r),k=t.memoizedState),(c=ht||Vu(t,n,c,r,v,k,u)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,k,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,k,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),i.props=r,i.state=k,i.context=u,r=c):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return vi(e,t,n,r,o,l)}function vi(e,t,n,r,l,o){Dc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Iu(t,n,!1),dt(e,t,o);r=t.stateNode,Fp.current=t;var a=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=_n(t,e.child,null,o),t.child=_n(t,null,a,o)):pe(e,t,a,o),t.memoizedState=r.state,l&&Iu(t,n,!0),t.child}function jc(e){var t=e.stateNode;t.pendingContext?Ou(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ou(e,t.context,!1),Zi(e,t.containerInfo)}function Xu(e,t,n,r,l){return Sn(),Hi(l),t.flags|=256,pe(e,t,n,r),t.child}var gi={dehydrated:null,treeContext:null,retryLane:0};function hi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Fc(e,t,n){var r=t.pendingProps,l=H.current,o=!1,i=(t.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),A(H,l&1),e===null)return si(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Bl(i,r,0,null),e=Wt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=hi(n),t.memoizedState=gi,e):oa(t,i));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return Ap(e,t,i,r,a,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,a=l.sibling;var u={mode:"hidden",children:r.children};return!(i&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Pt(l,u),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?o=Pt(a,o):(o=Wt(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?hi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=gi,r}return o=e.child,e=o.sibling,r=Pt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function oa(e,t){return t=Bl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Gr(e,t,n,r){return r!==null&&Hi(r),_n(t,e.child,null,n),e=oa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ap(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=Lo(Error(h(422))),Gr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Bl({mode:"visible",children:r.children},l,0,null),o=Wt(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&_n(t,e.child,null,i),t.child.memoizedState=hi(i),t.memoizedState=gi,o);if(!(t.mode&1))return Gr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,o=Error(h(419)),r=Lo(o,r,void 0),Gr(e,t,i,r)}if(a=(i&e.childLanes)!==0,ye||a){if(r=re,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|i)?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,ct(e,l),Ye(r,e,l,-1))}return da(),r=Lo(Error(h(421))),Gr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Jp.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,Se=_t(l.nextSibling),_e=t,$=!0,He=null,e!==null&&(Re[Oe++]=ot,Re[Oe++]=it,Re[Oe++]=Qt,ot=e.id,it=e.overflow,Qt=t),t=oa(t,r.children),t.flags|=4096,t)}function Zu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ci(e.return,t,n)}function Ro(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Ac(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(pe(e,t,r.children,n),r=H.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zu(e,n,t);else if(e.tag===19)Zu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(A(H,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&ql(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Ro(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&ql(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Ro(t,!0,n,null,o);break;case"together":Ro(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function rl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function dt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(h(153));if(t.child!==null){for(e=t.child,n=Pt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Pt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Up(e,t,n){switch(t.tag){case 3:jc(t),Sn();break;case 5:dc(t);break;case 1:we(t.type)&&hl(t);break;case 4:Zi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;A(wl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(A(H,H.current&1),t.flags|=128,null):n&t.child.childLanes?Fc(e,t,n):(A(H,H.current&1),e=dt(e,t,n),e!==null?e.sibling:null);A(H,H.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Ac(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),A(H,H.current),r)break;return null;case 22:case 23:return t.lanes=0,Mc(e,t,n)}return dt(e,t,n)}var Uc,yi,Bc,Vc;Uc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};yi=function(){};Bc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Vt(et.current);var o=null;switch(n){case"input":l=Uo(e,l),r=Uo(e,r),o=[];break;case"select":l=Y({},l,{value:void 0}),r=Y({},r,{value:void 0}),o=[];break;case"textarea":l=$o(e,l),r=$o(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=vl)}Ho(n,r);var i;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var a=l[c];for(i in a)a.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(rr.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var u=r[c];if(a=l?.[c],r.hasOwnProperty(c)&&u!==a&&(u!=null||a!=null))if(c==="style")if(a){for(i in a)!a.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&a[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(o||(o=[]),o.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(o=o||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(o=o||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(rr.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&U("scroll",e),o||a===u||(o=[])):(o=o||[]).push(c,u))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};Vc=function(e,t,n,r){n!==r&&(t.flags|=4)};function Bn(e,t){if(!$)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Bp(e,t,n){var r=t.pendingProps;switch(Wi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return we(t.type)&&gl(),se(t),null;case 3:return r=t.stateNode,En(),B(ze),B(de),bi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Qr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,He!==null&&(Ei(He),He=null))),yi(e,t),se(t),null;case 5:Ji(t);var l=Vt(vr.current);if(n=t.type,e!==null&&t.stateNode!=null)Bc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(h(166));return se(t),null}if(e=Vt(et.current),Qr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Je]=t,r[pr]=o,e=(t.mode&1)!==0,n){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(l=0;l<Yn.length;l++)U(Yn[l],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":ou(r,o),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},U("invalid",r);break;case"textarea":au(r,o),U("invalid",r)}Ho(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var a=o[i];i==="children"?typeof a=="string"?r.textContent!==a&&(o.suppressHydrationWarning!==!0&&Hr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&Hr(r.textContent,a,e),l=["children",""+a]):rr.hasOwnProperty(i)&&a!=null&&i==="onScroll"&&U("scroll",r)}switch(n){case"input":Or(r),iu(r,o,!0);break;case"textarea":Or(r),uu(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=vl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Je]=t,e[pr]=r,Uc(e,t,!1,!1),t.stateNode=e;e:{switch(i=Qo(n,r),n){case"dialog":U("cancel",e),U("close",e),l=r;break;case"iframe":case"object":case"embed":U("load",e),l=r;break;case"video":case"audio":for(l=0;l<Yn.length;l++)U(Yn[l],e);l=r;break;case"source":U("error",e),l=r;break;case"img":case"image":case"link":U("error",e),U("load",e),l=r;break;case"details":U("toggle",e),l=r;break;case"input":ou(e,r),l=Uo(e,r),U("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Y({},r,{value:void 0}),U("invalid",e);break;case"textarea":au(e,r),l=$o(e,r),U("invalid",e);break;default:l=r}Ho(n,l),a=l;for(o in a)if(a.hasOwnProperty(o)){var u=a[o];o==="style"?zs(e,u):o==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&hs(e,u)):o==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&lr(e,u):typeof u=="number"&&lr(e,""+u):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(rr.hasOwnProperty(o)?u!=null&&o==="onScroll"&&U("scroll",e):u!=null&&Pi(e,o,u,i))}switch(n){case"input":Or(e),iu(e,r,!1);break;case"textarea":Or(e),uu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Tt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?gn(e,!!r.multiple,o,!1):r.defaultValue!=null&&gn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=vl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)Vc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(h(166));if(n=Vt(vr.current),Vt(et.current),Qr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Je]=t,(o=r.nodeValue!==n)&&(e=_e,e!==null))switch(e.tag){case 3:Hr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Hr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Je]=t,t.stateNode=r}return se(t),null;case 13:if(B(H),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($&&Se!==null&&t.mode&1&&!(t.flags&128))ic(),Sn(),t.flags|=98560,o=!1;else if(o=Qr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(h(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(h(317));o[Je]=t}else Sn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),o=!1}else He!==null&&(Ei(He),He=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||H.current&1?ee===0&&(ee=3):da())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return En(),yi(e,t),e===null&&dr(t.stateNode.containerInfo),se(t),null;case 10:return Gi(t.type._context),se(t),null;case 17:return we(t.type)&&gl(),se(t),null;case 19:if(B(H),o=t.memoizedState,o===null)return se(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)Bn(o,!1);else{if(ee!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ql(e),i!==null){for(t.flags|=128,Bn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return A(H,H.current&1|2),t.child}e=e.sibling}o.tail!==null&&K()>Cn&&(t.flags|=128,r=!0,Bn(o,!1),t.lanes=4194304)}else{if(!r)if(e=ql(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Bn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!$)return se(t),null}else 2*K()-o.renderingStartTime>Cn&&n!==1073741824&&(t.flags|=128,r=!0,Bn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=K(),t.sibling=null,n=H.current,A(H,r?n&1|2:n&1),t):(se(t),null);case 22:case 23:return ca(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?qe&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(h(156,t.tag))}function Vp(e,t){switch(Wi(t),t.tag){case 1:return we(t.type)&&gl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return En(),B(ze),B(de),bi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ji(t),null;case 13:if(B(H),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(h(340));Sn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(H),null;case 4:return En(),null;case 10:return Gi(t.type._context),null;case 22:case 23:return ca(),null;case 24:return null;default:return null}}var Kr=!1,ce=!1,$p=typeof WeakSet=="function"?WeakSet:Set,_=null;function mn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){G(e,t,r)}else n.current=null}function zi(e,t,n){try{n()}catch(r){G(e,t,r)}}var Ju=!1;function Wp(e,t){if(ni=fl,e=Ys(),Vi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,a=-1,u=-1,c=0,p=0,m=e,v=null;t:for(;;){for(var z;m!==n||l!==0&&m.nodeType!==3||(a=i+l),m!==o||r!==0&&m.nodeType!==3||(u=i+r),m.nodeType===3&&(i+=m.nodeValue.length),(z=m.firstChild)!==null;)v=m,m=z;for(;;){if(m===e)break t;if(v===n&&++c===l&&(a=i),v===o&&++p===r&&(u=i),(z=m.nextSibling)!==null)break;m=v,v=m.parentNode}m=z}n=a===-1||u===-1?null:{start:a,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(ri={focusedElem:e,selectionRange:n},fl=!1,_=t;_!==null;)if(t=_,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,_=e;else for(;_!==null;){t=_;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var y=k.memoizedProps,I=k.memoizedState,d=t.stateNode,s=d.getSnapshotBeforeUpdate(t.elementType===t.type?y:$e(t.type,y),I);d.__reactInternalSnapshotBeforeUpdate=s}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(h(163))}}catch(g){G(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,_=e;break}_=t.return}return k=Ju,Ju=!1,k}function er(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&zi(t,n,o)}l=l.next}while(l!==r)}}function Al(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function wi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function $c(e){var t=e.alternate;t!==null&&(e.alternate=null,$c(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Je],delete t[pr],delete t[ii],delete t[Ep],delete t[Np])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wc(e){return e.tag===5||e.tag===3||e.tag===4}function bu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ki(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=vl));else if(r!==4&&(e=e.child,e!==null))for(ki(e,t,n),e=e.sibling;e!==null;)ki(e,t,n),e=e.sibling}function xi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(xi(e,t,n),e=e.sibling;e!==null;)xi(e,t,n),e=e.sibling}var le=null,We=!1;function vt(e,t,n){for(n=n.child;n!==null;)Hc(e,t,n),n=n.sibling}function Hc(e,t,n){if(be&&typeof be.onCommitFiberUnmount=="function")try{be.onCommitFiberUnmount(Ll,n)}catch{}switch(n.tag){case 5:ce||mn(n,t);case 6:var r=le,l=We;le=null,vt(e,t,n),le=r,We=l,le!==null&&(We?(e=le,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):le.removeChild(n.stateNode));break;case 18:le!==null&&(We?(e=le,n=n.stateNode,e.nodeType===8?_o(e.parentNode,n):e.nodeType===1&&_o(e,n),ur(e)):_o(le,n.stateNode));break;case 4:r=le,l=We,le=n.stateNode.containerInfo,We=!0,vt(e,t,n),le=r,We=l;break;case 0:case 11:case 14:case 15:if(!ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&zi(n,t,i),l=l.next}while(l!==r)}vt(e,t,n);break;case 1:if(!ce&&(mn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){G(n,t,a)}vt(e,t,n);break;case 21:vt(e,t,n);break;case 22:n.mode&1?(ce=(r=ce)||n.memoizedState!==null,vt(e,t,n),ce=r):vt(e,t,n);break;default:vt(e,t,n)}}function es(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $p),t.forEach(function(r){var l=bp.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,a=i;e:for(;a!==null;){switch(a.tag){case 5:le=a.stateNode,We=!1;break e;case 3:le=a.stateNode.containerInfo,We=!0;break e;case 4:le=a.stateNode.containerInfo,We=!0;break e}a=a.return}if(le===null)throw Error(h(160));Hc(o,i,l),le=null,We=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(c){G(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qc(t,e),t=t.sibling}function Qc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),Xe(e),r&4){try{er(3,e,e.return),Al(3,e)}catch(y){G(e,e.return,y)}try{er(5,e,e.return)}catch(y){G(e,e.return,y)}}break;case 1:Ve(t,e),Xe(e),r&512&&n!==null&&mn(n,n.return);break;case 5:if(Ve(t,e),Xe(e),r&512&&n!==null&&mn(n,n.return),e.flags&32){var l=e.stateNode;try{lr(l,"")}catch(y){G(e,e.return,y)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&ms(l,o),Qo(a,i);var c=Qo(a,o);for(i=0;i<u.length;i+=2){var p=u[i],m=u[i+1];p==="style"?zs(l,m):p==="dangerouslySetInnerHTML"?hs(l,m):p==="children"?lr(l,m):Pi(l,p,m,c)}switch(a){case"input":Bo(l,o);break;case"textarea":vs(l,o);break;case"select":var v=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var z=o.value;z!=null?gn(l,!!o.multiple,z,!1):v!==!!o.multiple&&(o.defaultValue!=null?gn(l,!!o.multiple,o.defaultValue,!0):gn(l,!!o.multiple,o.multiple?[]:"",!1))}l[pr]=o}catch(y){G(e,e.return,y)}}break;case 6:if(Ve(t,e),Xe(e),r&4){if(e.stateNode===null)throw Error(h(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(y){G(e,e.return,y)}}break;case 3:if(Ve(t,e),Xe(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ur(t.containerInfo)}catch(y){G(e,e.return,y)}break;case 4:Ve(t,e),Xe(e);break;case 13:Ve(t,e),Xe(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ua=K())),r&4&&es(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(ce=(c=ce)||p,Ve(t,e),ce=c):Ve(t,e),Xe(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(_=e,p=e.child;p!==null;){for(m=_=p;_!==null;){switch(v=_,z=v.child,v.tag){case 0:case 11:case 14:case 15:er(4,v,v.return);break;case 1:mn(v,v.return);var k=v.stateNode;if(typeof k.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(y){G(r,n,y)}}break;case 5:mn(v,v.return);break;case 22:if(v.memoizedState!==null){ns(m);continue}}z!==null?(z.return=v,_=z):ns(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{l=m.stateNode,c?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=m.stateNode,u=m.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=ys("display",i))}catch(y){G(e,e.return,y)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(y){G(e,e.return,y)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ve(t,e),Xe(e),r&4&&es(e);break;case 21:break;default:Ve(t,e),Xe(e)}}function Xe(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wc(n)){var r=n;break e}n=n.return}throw Error(h(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(lr(l,""),r.flags&=-33);var o=bu(e);xi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,a=bu(e);ki(e,a,i);break;default:throw Error(h(161))}}catch(u){G(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Hp(e,t,n){_=e,Yc(e,t,n)}function Yc(e,t,n){for(var r=(e.mode&1)!==0;_!==null;){var l=_,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Kr;if(!i){var a=l.alternate,u=a!==null&&a.memoizedState!==null||ce;a=Kr;var c=ce;if(Kr=i,(ce=u)&&!c)for(_=l;_!==null;)i=_,u=i.child,i.tag===22&&i.memoizedState!==null?rs(l):u!==null?(u.return=i,_=u):rs(l);for(;o!==null;)_=o,Yc(o,t,n),o=o.sibling;_=l,Kr=a,ce=c}ts(e,t,n)}else l.subtreeFlags&8772&&o!==null?(o.return=l,_=o):ts(e,t,n)}}function ts(e){for(;_!==null;){var t=_;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ce||Al(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ce)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:$e(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Au(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Au(t,i,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&ur(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(h(163))}ce||t.flags&512&&wi(t)}catch(v){G(t,t.return,v)}}if(t===e){_=null;break}if(n=t.sibling,n!==null){n.return=t.return,_=n;break}_=t.return}}function ns(e){for(;_!==null;){var t=_;if(t===e){_=null;break}var n=t.sibling;if(n!==null){n.return=t.return,_=n;break}_=t.return}}function rs(e){for(;_!==null;){var t=_;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Al(4,t)}catch(u){G(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(u){G(t,l,u)}}var o=t.return;try{wi(t)}catch(u){G(t,o,u)}break;case 5:var i=t.return;try{wi(t)}catch(u){G(t,i,u)}}}catch(u){G(t,t.return,u)}if(t===e){_=null;break}var a=t.sibling;if(a!==null){a.return=t.return,_=a;break}_=t.return}}var Qp=Math.ceil,El=ft.ReactCurrentDispatcher,ia=ft.ReactCurrentOwner,Me=ft.ReactCurrentBatchConfig,R=0,re=null,Z=null,oe=0,qe=0,vn=Ot(0),ee=0,zr=null,Gt=0,Ul=0,aa=0,tr=null,he=null,ua=0,Cn=1/0,rt=null,Nl=!1,qi=null,Nt=null,Xr=!1,kt=null,Cl=0,nr=0,Si=null,ll=-1,ol=0;function me(){return R&6?K():ll!==-1?ll:ll=K()}function Ct(e){return e.mode&1?R&2&&oe!==0?oe&-oe:Pp.transition!==null?(ol===0&&(ol=Ls()),ol):(e=D,e!==0||(e=window.event,e=e===void 0?16:Fs(e.type)),e):1}function Ye(e,t,n,r){if(50<nr)throw nr=0,Si=null,Error(h(185));wr(e,n,r),(!(R&2)||e!==re)&&(e===re&&(!(R&2)&&(Ul|=n),ee===4&&zt(e,oe)),ke(e,r),n===1&&R===0&&!(t.mode&1)&&(Cn=K()+500,Dl&&It()))}function ke(e,t){var n=e.callbackNode;Lf(e,t);var r=dl(e,e===re?oe:0);if(r===0)n!==null&&du(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&du(n),t===1)e.tag===0?Cp(ls.bind(null,e)):rc(ls.bind(null,e)),Sp(function(){!(R&6)&&It()}),n=null;else{switch(Rs(r)){case 1:n=Ii;break;case 4:n=Ps;break;case 16:n=cl;break;case 536870912:n=Ts;break;default:n=cl}n=td(n,Gc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Gc(e,t){if(ll=-1,ol=0,R&6)throw Error(h(327));var n=e.callbackNode;if(kn()&&e.callbackNode!==n)return null;var r=dl(e,e===re?oe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Pl(e,r);else{t=r;var l=R;R|=2;var o=Xc();(re!==e||oe!==t)&&(rt=null,Cn=K()+500,$t(e,t));do try{Kp();break}catch(a){Kc(e,a)}while(!0);Yi(),El.current=o,R=l,Z!==null?t=0:(re=null,oe=0,t=ee)}if(t!==0){if(t===2&&(l=Zo(e),l!==0&&(r=l,t=_i(e,l))),t===1)throw n=zr,$t(e,0),zt(e,r),ke(e,K()),n;if(t===6)zt(e,r);else{if(l=e.current.alternate,!(r&30)&&!Yp(l)&&(t=Pl(e,r),t===2&&(o=Zo(e),o!==0&&(r=o,t=_i(e,o))),t===1))throw n=zr,$t(e,0),zt(e,r),ke(e,K()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(h(345));case 2:At(e,he,rt);break;case 3:if(zt(e,r),(r&130023424)===r&&(t=ua+500-K(),10<t)){if(dl(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){me(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=oi(At.bind(null,e,he,rt),t);break}At(e,he,rt);break;case 4:if(zt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-Qe(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=K()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Qp(r/1960))-r,10<r){e.timeoutHandle=oi(At.bind(null,e,he,rt),r);break}At(e,he,rt);break;case 5:At(e,he,rt);break;default:throw Error(h(329))}}}return ke(e,K()),e.callbackNode===n?Gc.bind(null,e):null}function _i(e,t){var n=tr;return e.current.memoizedState.isDehydrated&&($t(e,t).flags|=256),e=Pl(e,t),e!==2&&(t=he,he=n,t!==null&&Ei(t)),e}function Ei(e){he===null?he=e:he.push.apply(he,e)}function Yp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Ge(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function zt(e,t){for(t&=~aa,t&=~Ul,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qe(t),r=1<<n;e[n]=-1,t&=~r}}function ls(e){if(R&6)throw Error(h(327));kn();var t=dl(e,0);if(!(t&1))return ke(e,K()),null;var n=Pl(e,t);if(e.tag!==0&&n===2){var r=Zo(e);r!==0&&(t=r,n=_i(e,r))}if(n===1)throw n=zr,$t(e,0),zt(e,t),ke(e,K()),n;if(n===6)throw Error(h(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,At(e,he,rt),ke(e,K()),null}function sa(e,t){var n=R;R|=1;try{return e(t)}finally{R=n,R===0&&(Cn=K()+500,Dl&&It())}}function Kt(e){kt!==null&&kt.tag===0&&!(R&6)&&kn();var t=R;R|=1;var n=Me.transition,r=D;try{if(Me.transition=null,D=1,e)return e()}finally{D=r,Me.transition=n,R=t,!(R&6)&&It()}}function ca(){qe=vn.current,B(vn)}function $t(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qp(n)),Z!==null)for(n=Z.return;n!==null;){var r=n;switch(Wi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&gl();break;case 3:En(),B(ze),B(de),bi();break;case 5:Ji(r);break;case 4:En();break;case 13:B(H);break;case 19:B(H);break;case 10:Gi(r.type._context);break;case 22:case 23:ca()}n=n.return}if(re=e,Z=e=Pt(e.current,null),oe=qe=t,ee=0,zr=null,aa=Ul=Gt=0,he=tr=null,Bt!==null){for(t=0;t<Bt.length;t++)if(n=Bt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}Bt=null}return e}function Kc(e,t){do{var n=Z;try{if(Yi(),tl.current=_l,Sl){for(var r=Q.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}Sl=!1}if(Yt=0,ne=b=Q=null,bn=!1,gr=0,ia.current=null,n===null||n.return===null){ee=1,zr=t,Z=null;break}e:{var o=e,i=n.return,a=n,u=t;if(t=oe,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,p=a,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var v=p.alternate;v?(p.updateQueue=v.updateQueue,p.memoizedState=v.memoizedState,p.lanes=v.lanes):(p.updateQueue=null,p.memoizedState=null)}var z=Hu(i);if(z!==null){z.flags&=-257,Qu(z,i,a,o,t),z.mode&1&&Wu(o,c,t),t=z,u=c;var k=t.updateQueue;if(k===null){var y=new Set;y.add(u),t.updateQueue=y}else k.add(u);break e}else{if(!(t&1)){Wu(o,c,t),da();break e}u=Error(h(426))}}else if($&&a.mode&1){var I=Hu(i);if(I!==null){!(I.flags&65536)&&(I.flags|=256),Qu(I,i,a,o,t),Hi(Nn(u,a));break e}}o=u=Nn(u,a),ee!==4&&(ee=2),tr===null?tr=[o]:tr.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Rc(o,u,t);Fu(o,d);break e;case 1:a=u;var s=o.type,f=o.stateNode;if(!(o.flags&128)&&(typeof s.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Nt===null||!Nt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var g=Oc(o,a,t);Fu(o,g);break e}}o=o.return}while(o!==null)}Jc(n)}catch(x){t=x,Z===n&&n!==null&&(Z=n=n.return);continue}break}while(!0)}function Xc(){var e=El.current;return El.current=_l,e===null?_l:e}function da(){(ee===0||ee===3||ee===2)&&(ee=4),re===null||!(Gt&268435455)&&!(Ul&268435455)||zt(re,oe)}function Pl(e,t){var n=R;R|=2;var r=Xc();(re!==e||oe!==t)&&(rt=null,$t(e,t));do try{Gp();break}catch(l){Kc(e,l)}while(!0);if(Yi(),R=n,El.current=r,Z!==null)throw Error(h(261));return re=null,oe=0,ee}function Gp(){for(;Z!==null;)Zc(Z)}function Kp(){for(;Z!==null&&!xf();)Zc(Z)}function Zc(e){var t=ed(e.alternate,e,qe);e.memoizedProps=e.pendingProps,t===null?Jc(e):Z=t,ia.current=null}function Jc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Vp(n,t),n!==null){n.flags&=32767,Z=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ee=6,Z=null;return}}else if(n=Bp(n,t,qe),n!==null){Z=n;return}if(t=t.sibling,t!==null){Z=t;return}Z=t=e}while(t!==null);ee===0&&(ee=5)}function At(e,t,n){var r=D,l=Me.transition;try{Me.transition=null,D=1,Xp(e,t,n,r)}finally{Me.transition=l,D=r}return null}function Xp(e,t,n,r){do kn();while(kt!==null);if(R&6)throw Error(h(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(h(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Rf(e,o),e===re&&(Z=re=null,oe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Xr||(Xr=!0,td(cl,function(){return kn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Me.transition,Me.transition=null;var i=D;D=1;var a=R;R|=4,ia.current=null,Wp(e,n),Qc(n,e),yp(ri),fl=!!ni,ri=ni=null,e.current=n,Hp(n,e,l),qf(),R=a,D=i,Me.transition=o}else e.current=n;if(Xr&&(Xr=!1,kt=e,Cl=l),o=e.pendingLanes,o===0&&(Nt=null),Ef(n.stateNode,r),ke(e,K()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(Nl)throw Nl=!1,e=qi,qi=null,e;return Cl&1&&e.tag!==0&&kn(),o=e.pendingLanes,o&1?e===Si?nr++:(nr=0,Si=e):nr=0,It(),null}function kn(){if(kt!==null){var e=Rs(Cl),t=Me.transition,n=D;try{if(Me.transition=null,D=16>e?16:e,kt===null)var r=!1;else{if(e=kt,kt=null,Cl=0,R&6)throw Error(h(331));var l=R;for(R|=4,_=e.current;_!==null;){var o=_,i=o.child;if(_.flags&16){var a=o.deletions;if(a!==null){for(var u=0;u<a.length;u++){var c=a[u];for(_=c;_!==null;){var p=_;switch(p.tag){case 0:case 11:case 15:er(8,p,o)}var m=p.child;if(m!==null)m.return=p,_=m;else for(;_!==null;){p=_;var v=p.sibling,z=p.return;if($c(p),p===c){_=null;break}if(v!==null){v.return=z,_=v;break}_=z}}}var k=o.alternate;if(k!==null){var y=k.child;if(y!==null){k.child=null;do{var I=y.sibling;y.sibling=null,y=I}while(y!==null)}}_=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,_=i;else e:for(;_!==null;){if(o=_,o.flags&2048)switch(o.tag){case 0:case 11:case 15:er(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,_=d;break e}_=o.return}}var s=e.current;for(_=s;_!==null;){i=_;var f=i.child;if(i.subtreeFlags&2064&&f!==null)f.return=i,_=f;else e:for(i=s;_!==null;){if(a=_,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Al(9,a)}}catch(x){G(a,a.return,x)}if(a===i){_=null;break e}var g=a.sibling;if(g!==null){g.return=a.return,_=g;break e}_=a.return}}if(R=l,It(),be&&typeof be.onPostCommitFiberRoot=="function")try{be.onPostCommitFiberRoot(Ll,e)}catch{}r=!0}return r}finally{D=n,Me.transition=t}}return!1}function os(e,t,n){t=Nn(n,t),t=Rc(e,t,1),e=Et(e,t,1),t=me(),e!==null&&(wr(e,1,t),ke(e,t))}function G(e,t,n){if(e.tag===3)os(e,e,n);else for(;t!==null;){if(t.tag===3){os(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Nt===null||!Nt.has(r))){e=Nn(n,e),e=Oc(t,e,1),t=Et(t,e,1),e=me(),t!==null&&(wr(t,1,e),ke(t,e));break}}t=t.return}}function Zp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=me(),e.pingedLanes|=e.suspendedLanes&n,re===e&&(oe&n)===n&&(ee===4||ee===3&&(oe&130023424)===oe&&500>K()-ua?$t(e,0):aa|=n),ke(e,t)}function bc(e,t){t===0&&(e.mode&1?(t=Dr,Dr<<=1,!(Dr&130023424)&&(Dr=4194304)):t=1);var n=me();e=ct(e,t),e!==null&&(wr(e,t,n),ke(e,n))}function Jp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),bc(e,n)}function bp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(h(314))}r!==null&&r.delete(t),bc(e,n)}var ed;ed=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ze.current)ye=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ye=!1,Up(e,t,n);ye=!!(e.flags&131072)}else ye=!1,$&&t.flags&1048576&&lc(t,zl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;rl(e,t),e=t.pendingProps;var l=qn(t,de.current);wn(t,n),l=ta(null,t,r,e,l,n);var o=na();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,we(r)?(o=!0,hl(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Xi(t),l.updater=Fl,t.stateNode=l,l._reactInternals=t,fi(t,r,e,n),t=vi(null,t,r,!0,o,n)):(t.tag=0,$&&o&&$i(t),pe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(rl(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=tm(r),e=$e(r,e),l){case 0:t=mi(null,t,r,e,n);break e;case 1:t=Ku(null,t,r,e,n);break e;case 11:t=Yu(null,t,r,e,n);break e;case 14:t=Gu(null,t,r,$e(r.type,e),n);break e}throw Error(h(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:$e(r,l),mi(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:$e(r,l),Ku(e,t,r,l,n);case 3:e:{if(jc(t),e===null)throw Error(h(387));r=t.pendingProps,o=t.memoizedState,l=o.element,cc(e,t),xl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=Nn(Error(h(423)),t),t=Xu(e,t,r,n,l);break e}else if(r!==l){l=Nn(Error(h(424)),t),t=Xu(e,t,r,n,l);break e}else for(Se=_t(t.stateNode.containerInfo.firstChild),_e=t,$=!0,He=null,n=uc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Sn(),r===l){t=dt(e,t,n);break e}pe(e,t,r,n)}t=t.child}return t;case 5:return dc(t),e===null&&si(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,li(r,l)?i=null:o!==null&&li(r,o)&&(t.flags|=32),Dc(e,t),pe(e,t,i,n),t.child;case 6:return e===null&&si(t),null;case 13:return Fc(e,t,n);case 4:return Zi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=_n(t,null,r,n):pe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:$e(r,l),Yu(e,t,r,l,n);case 7:return pe(e,t,t.pendingProps,n),t.child;case 8:return pe(e,t,t.pendingProps.children,n),t.child;case 12:return pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,A(wl,r._currentValue),r._currentValue=i,o!==null)if(Ge(o.value,i)){if(o.children===l.children&&!ze.current){t=dt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){i=o.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(o.tag===1){u=at(-1,n&-n),u.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?u.next=u:(u.next=p.next,p.next=u),c.pending=u}}o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),ci(o.return,n,t),a.lanes|=n;break}u=u.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(h(341));i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),ci(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}pe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,wn(t,n),l=De(l),r=r(l),t.flags|=1,pe(e,t,r,n),t.child;case 14:return r=t.type,l=$e(r,t.pendingProps),l=$e(r.type,l),Gu(e,t,r,l,n);case 15:return Ic(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:$e(r,l),rl(e,t),t.tag=1,we(r)?(e=!0,hl(t)):e=!1,wn(t,n),Lc(t,r,l),fi(t,r,l,n),vi(null,t,r,!0,e,n);case 19:return Ac(e,t,n);case 22:return Mc(e,t,n)}throw Error(h(156,t.tag))};function td(e,t){return Cs(e,t)}function em(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,t,n,r){return new em(e,t,n,r)}function fa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function tm(e){if(typeof e=="function")return fa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Li)return 11;if(e===Ri)return 14}return 2}function Pt(e,t){var n=e.alternate;return n===null?(n=Ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function il(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")fa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case ln:return Wt(n.children,l,o,t);case Ti:i=8,l|=8;break;case Do:return e=Ie(12,n,t,l|2),e.elementType=Do,e.lanes=o,e;case jo:return e=Ie(13,n,t,l),e.elementType=jo,e.lanes=o,e;case Fo:return e=Ie(19,n,t,l),e.elementType=Fo,e.lanes=o,e;case ds:return Bl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ss:i=10;break e;case cs:i=9;break e;case Li:i=11;break e;case Ri:i=14;break e;case gt:i=16,r=null;break e}throw Error(h(130,e==null?e:typeof e,""))}return t=Ie(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function Wt(e,t,n,r){return e=Ie(7,e,r,t),e.lanes=n,e}function Bl(e,t,n,r){return e=Ie(22,e,r,t),e.elementType=ds,e.lanes=n,e.stateNode={isHidden:!1},e}function Oo(e,t,n){return e=Ie(6,e,null,t),e.lanes=n,e}function Io(e,t,n){return t=Ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function nm(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ho(0),this.expirationTimes=ho(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ho(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function pa(e,t,n,r,l,o,i,a,u){return e=new nm(e,t,n,a,u),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ie(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Xi(o),e}function rm(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function nd(e){if(!e)return Lt;e=e._reactInternals;e:{if(Zt(e)!==e||e.tag!==1)throw Error(h(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(we(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(h(171))}if(e.tag===1){var n=e.type;if(we(n))return nc(e,n,t)}return t}function rd(e,t,n,r,l,o,i,a,u){return e=pa(n,r,!0,e,l,o,i,a,u),e.context=nd(null),n=e.current,r=me(),l=Ct(n),o=at(r,l),o.callback=t??null,Et(n,o,l),e.current.lanes=l,wr(e,l,r),ke(e,r),e}function Vl(e,t,n,r){var l=t.current,o=me(),i=Ct(l);return n=nd(n),t.context===null?t.context=n:t.pendingContext=n,t=at(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Et(l,t,i),e!==null&&(Ye(e,l,i,o),el(e,l,i)),i}function Tl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function is(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ma(e,t){is(e,t),(e=e.alternate)&&is(e,t)}function lm(){return null}var ld=typeof reportError=="function"?reportError:function(e){console.error(e)};function va(e){this._internalRoot=e}$l.prototype.render=va.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(h(409));Vl(e,t,null,null)};$l.prototype.unmount=va.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kt(function(){Vl(null,e,null,null)}),t[st]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ms();e={blockedOn:null,target:e,priority:t};for(var n=0;n<yt.length&&t!==0&&t<yt[n].priority;n++);yt.splice(n,0,e),n===0&&js(e)}};function ga(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function as(){}function om(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var c=Tl(i);o.call(c)}}var i=rd(t,r,e,0,null,!1,!1,"",as);return e._reactRootContainer=i,e[st]=i.current,dr(e.nodeType===8?e.parentNode:e),Kt(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var c=Tl(u);a.call(c)}}var u=pa(e,0,!1,null,null,!1,!1,"",as);return e._reactRootContainer=u,e[st]=u.current,dr(e.nodeType===8?e.parentNode:e),Kt(function(){Vl(t,u,n,r)}),u}function Hl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var a=l;l=function(){var u=Tl(i);a.call(u)}}Vl(t,i,e,l)}else i=om(n,t,e,l,r);return Tl(i)}Os=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Qn(t.pendingLanes);n!==0&&(Mi(t,n|1),ke(t,K()),!(R&6)&&(Cn=K()+500,It()))}break;case 13:Kt(function(){var r=ct(e,1);if(r!==null){var l=me();Ye(r,e,1,l)}}),ma(e,1)}};Di=function(e){if(e.tag===13){var t=ct(e,134217728);if(t!==null){var n=me();Ye(t,e,134217728,n)}ma(e,134217728)}};Is=function(e){if(e.tag===13){var t=Ct(e),n=ct(e,t);if(n!==null){var r=me();Ye(n,e,t,r)}ma(e,t)}};Ms=function(){return D};Ds=function(e,t){var n=D;try{return D=e,t()}finally{D=n}};Go=function(e,t,n){switch(t){case"input":if(Bo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Ml(r);if(!l)throw Error(h(90));ps(r),Bo(r,l)}}}break;case"textarea":vs(e,n);break;case"select":t=n.value,t!=null&&gn(e,!!n.multiple,t,!1)}};xs=sa;qs=Kt;var im={usingClientEntryPoint:!1,Events:[xr,sn,Ml,ws,ks,sa]},Vn={findFiberByHostInstance:Ut,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},am={bundleType:Vn.bundleType,version:Vn.version,rendererPackageName:Vn.rendererPackageName,rendererConfig:Vn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ft.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Es(e),e===null?null:e.stateNode},findFiberByHostInstance:Vn.findFiberByHostInstance||lm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&($n=__REACT_DEVTOOLS_GLOBAL_HOOK__,!$n.isDisabled&&$n.supportsFiber))try{Ll=$n.inject(am),be=$n}catch{}var $n;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=im;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ga(t))throw Error(h(200));return rm(e,t,null,n)};Ce.createRoot=function(e,t){if(!ga(e))throw Error(h(299));var n=!1,r="",l=ld;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=pa(e,1,!1,null,null,n,!1,r,l),e[st]=t.current,dr(e.nodeType===8?e.parentNode:e),new va(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(h(188)):(e=Object.keys(e).join(","),Error(h(268,e)));return e=Es(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return Kt(e)};Ce.hydrate=function(e,t,n){if(!Wl(t))throw Error(h(200));return Hl(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!ga(e))throw Error(h(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=ld;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=rd(t,null,e,1,n??null,l,!1,o,i),e[st]=t.current,dr(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new $l(t)};Ce.render=function(e,t,n){if(!Wl(t))throw Error(h(200));return Hl(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Wl(e))throw Error(h(40));return e._reactRootContainer?(Kt(function(){Hl(null,null,e,!1,function(){e._reactRootContainer=null,e[st]=null})}),!0):!1};Ce.unstable_batchedUpdates=sa;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Wl(n))throw Error(h(200));if(e==null||e._reactInternals===void 0)throw Error(h(38));return Hl(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var ud=nt((Tm,ad)=>{"use strict";function id(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(id)}catch(e){console.error(e)}}id(),ad.exports=od()});var cd=nt(ha=>{"use strict";var sd=ud();ha.createRoot=sd.createRoot,ha.hydrateRoot=sd.hydrateRoot;var Lm});var pd=nt(Yl=>{"use strict";var cm=Te(),dm=Symbol.for("react.element"),fm=Symbol.for("react.fragment"),pm=Object.prototype.hasOwnProperty,mm=cm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vm={key:!0,ref:!0,__self:!0,__source:!0};function fd(e,t,n){var r,l={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)pm.call(t,r)&&!vm.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:dm,type:e,key:o,ref:i,props:l,_owner:mm.current}}Yl.Fragment=fm;Yl.jsx=fd;Yl.jsxs=fd});var te=nt((Mm,md)=>{"use strict";md.exports=pd()});var xv=j(Te(),1),Ea=j(cd(),1);var V=j(Te(),1);function Jt(e,t){return e?e.callWS(t):Promise.reject(new Error("Not connected to Home Assistant"))}function dd(e,t,n){return e?e.connection.subscribeMessage(n,t):Promise.reject(new Error("Not connected to Home Assistant"))}var um="/api/quizify/player_ws";function sm(){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${um}`}var Ql=class{constructor({onEvent:t,onStatus:n}){this._onEvent=t||(()=>{}),this._onStatus=n||(()=>{}),this._ws=null,this._closedByUser=!1,this._backoff=500,this._maxBackoff=1e4,this._pingTimer=null,this._reconnectTimer=null,this._resume=null}setResume(t){this._resume=t}connect(){this._closedByUser=!1,this._open()}_open(){this._onStatus("connecting");let t;try{t=new WebSocket(sm())}catch{this._scheduleReconnect();return}this._ws=t,t.addEventListener("open",()=>{this._backoff=500,this._onStatus("open"),this._resume&&this._send({type:"resume",...this._resume}),this._startPing()}),t.addEventListener("message",n=>{let r;try{r=JSON.parse(n.data)}catch{return}r?.event!=="pong"&&this._onEvent(r)}),t.addEventListener("close",()=>{this._stopPing(),this._ws=null,this._onStatus("closed"),this._closedByUser||this._scheduleReconnect()}),t.addEventListener("error",()=>{})}_scheduleReconnect(){this._closedByUser||(clearTimeout(this._reconnectTimer),this._reconnectTimer=setTimeout(()=>this._open(),this._backoff),this._backoff=Math.min(this._maxBackoff,this._backoff*2))}_startPing(){this._stopPing(),this._pingTimer=setInterval(()=>{this._send({type:"ping"})},25e3)}_stopPing(){this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null)}send(t){return this._send(t)}_send(t){let n=this._ws;if(!n||n.readyState!==WebSocket.OPEN)return!1;try{return n.send(JSON.stringify(t)),!0}catch{return!1}}close(){if(this._closedByUser=!0,clearTimeout(this._reconnectTimer),this._stopPing(),this._ws){try{this._ws.close()}catch{}this._ws=null}}};var Dm=j(Te(),1),Mt=j(te(),1);function xe({connected:e,subtitle:t}){return(0,Mt.jsxs)("div",{className:"qz-header",children:[(0,Mt.jsxs)("div",{children:[(0,Mt.jsx)("div",{className:"qz-brand",children:"Quizify"}),t&&(0,Mt.jsx)("div",{className:"qz-label",style:{marginTop:4},children:t})]}),(0,Mt.jsxs)("div",{className:"qz-header-status",children:[(0,Mt.jsx)("span",{className:`qz-status-dot ${e?"":"qz-status-off"}`}),e?"Connected":"Offline"]})]})}var Um=j(Te(),1);var vd=["A","B","C","D","E","F"],ya={adults:"Adults",kids:"Kids"},gd={adults:"Trickier questions, broader topics",kids:"Age-appropriate, simpler wording"},za={general_knowledge:"General Knowledge",science:"Science",geography:"Geography",history:"History",sport:"Sport",food_and_drink:"Food & Drink",literature:"Literature",language:"Language & Words",art:"Art & Architecture",technology:"Technology & Inventions",mythology:"Mythology & Religion",animals:"Animals & Nature",random:"Random Mix"},hd={general_knowledge:"\u{1F9E0}",science:"\u{1F52C}",geography:"\u{1F30D}",history:"\u{1F3DB}\uFE0F",sport:"\u26BD",food_and_drink:"\u{1F377}",literature:"\u{1F4DA}",language:"\u{1F4AC}",art:"\u{1F3A8}",technology:"\u{1F4BB}",mythology:"\u26A1",animals:"\u{1F981}",random:"\u{1F3B2}"},wa={easy:"Easy",medium:"Medium",hard:"Hard",mixed:"Mixed"};function yd(e){return(e||"?").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0].toUpperCase()).join("")}function zd(e){return`${window.location.origin}/quizify/play?code=${encodeURIComponent(e)}`}function wd(e){return`/api/quizify/qr?data=${encodeURIComponent(e)}`}function Gl(){return Date.now()/1e3}var O=j(te(),1);function kd({value:e,onChange:t}){return(0,O.jsxs)("div",{className:"qz-stack",children:[(0,O.jsx)("div",{className:"qz-label",children:"Mode"}),(0,O.jsx)("div",{className:"qz-mode-tiles",children:Object.keys(ya).map(n=>(0,O.jsxs)("button",{type:"button",className:`qz-mode-tile ${e===n?"qz-active":""}`,onClick:()=>t(n),children:[(0,O.jsx)("div",{className:"qz-mode-tile-emoji",children:n==="adults"?"\u{1F9E0}":"\u{1F388}"}),(0,O.jsx)("div",{className:"qz-mode-tile-title",children:ya[n]}),(0,O.jsx)("div",{className:"qz-mode-tile-desc",children:gd[n]})]},n))})]})}function xd({value:e,onChange:t,available:n}){let r=[{id:"random",count:n.reduce((l,o)=>l+o.count,0)},...n];return(0,O.jsxs)("div",{className:"qz-stack",children:[(0,O.jsx)("div",{className:"qz-label",children:"Category"}),(0,O.jsx)("div",{className:"qz-category-grid",children:r.map(l=>(0,O.jsxs)("button",{type:"button",className:`qz-category-tile ${e===l.id?"qz-active":""}`,onClick:()=>t(l.id),disabled:l.count===0,title:za[l.id]||l.id,children:[(0,O.jsx)("div",{className:"qz-category-tile-emoji",children:hd[l.id]||"\u2753"}),(0,O.jsx)("div",{className:"qz-category-tile-title",children:za[l.id]||l.id}),(0,O.jsxs)("div",{className:"qz-category-tile-count",children:[l.count," Qs"]})]},l.id))})]})}function qd({value:e,onChange:t}){return(0,O.jsxs)("div",{className:"qz-stack",children:[(0,O.jsx)("div",{className:"qz-label",children:"Difficulty"}),(0,O.jsx)("div",{className:"qz-pill-row",children:Object.keys(wa).map(n=>(0,O.jsx)("button",{type:"button",className:`qz-pill ${e===n?"qz-active":""}`,onClick:()=>t(n),children:wa[n]},n))})]})}function ka({label:e,value:t,onChange:n,options:r}){return(0,O.jsxs)("div",{className:"qz-stack",children:[(0,O.jsx)("div",{className:"qz-label",children:e}),(0,O.jsx)("div",{className:"qz-pill-row",children:r.map(l=>(0,O.jsx)("button",{type:"button",className:`qz-pill ${t===l?"qz-active":""}`,onClick:()=>n(l),children:l},l))})]})}function Sd({speakers:e,value:t,onChange:n}){return(0,O.jsxs)("div",{className:"qz-stack",children:[(0,O.jsx)("div",{className:"qz-label",children:"Background music (optional)"}),(0,O.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,O.jsx)("option",{value:"",children:"No music"}),e.map(r=>(0,O.jsxs)("option",{value:r.entity_id,children:[r.name," ",r.supports_mass?"\xB7 Music Assistant":""]},r.entity_id))]})]})}function _d({speakers:e,value:t,onChange:n}){return(0,O.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,O.jsx)("option",{value:"",children:"No TTS announcements"}),e.map(r=>(0,O.jsxs)("option",{value:r.entity_id,children:[r.name," ",r.supports_mass?"\xB7 Music Assistant":""]},r.entity_id))]})}var Wm=j(Te(),1);var Dt=j(te(),1);function Ed({joinCode:e}){let t=zd(e);return(0,Dt.jsxs)("div",{className:"qz-qr-card",children:[(0,Dt.jsx)("div",{className:"qz-label",children:"Scan to join"}),(0,Dt.jsx)("div",{className:"qz-qr-frame",children:(0,Dt.jsx)("img",{src:wd(t),alt:`QR code for ${t}`})}),(0,Dt.jsx)("div",{className:"qz-join-code",children:e}),(0,Dt.jsx)("div",{className:"qz-join-url",children:t})]})}var Gm=j(Te(),1);var ge=j(te(),1);function Nd({players:e,highlightId:t}){return!e||e.length===0?(0,ge.jsx)("div",{className:"qz-empty",children:"Waiting for players to join\u2026"}):(0,ge.jsx)("div",{className:"qz-player-list",children:e.map(n=>{let r=`qz-player-row${n.player_id===t?" qz-highlight":""}`;return(0,ge.jsxs)("div",{className:r,children:[(0,ge.jsx)("div",{className:"qz-player-avatar",children:yd(n.name)}),(0,ge.jsx)("div",{className:"qz-player-name",children:n.name}),(0,ge.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}function Ln({players:e,highlightId:t}){return!e||e.length===0?null:(0,ge.jsx)("div",{className:"qz-scoreboard-list",children:e.map((n,r)=>{let l=["qz-scoreboard-row"];return r<3&&l.push("qz-top"),n.player_id===t&&l.push("qz-highlight"),(0,ge.jsxs)("div",{className:l.join(" "),children:[(0,ge.jsx)("div",{className:`qz-rank qz-rank-${r+1}`,children:r+1}),(0,ge.jsxs)("div",{children:[(0,ge.jsx)("strong",{children:n.name}),n.streak>=3&&(0,ge.jsxs)("span",{className:"qz-streak-badge",children:["\u{1F525} ",n.streak]})]}),(0,ge.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}var pt=j(Te(),1);var X=j(te(),1),xa=null;function Cd(){if(!xa)try{xa=new(window.AudioContext||window.webkitAudioContext)}catch{return null}return xa}function gm(e=880,t=.08,n=.18){let r=Cd();if(r)try{r.state==="suspended"&&r.resume();let l=r.createOscillator(),o=r.createGain();l.connect(o),o.connect(r.destination),l.frequency.value=e,l.type="sine",o.gain.setValueAtTime(n,r.currentTime),o.gain.exponentialRampToValueAtTime(.001,r.currentTime+t),l.start(r.currentTime),l.stop(r.currentTime+t)}catch{}}function Kl({question:e,index:t,total:n,deadline:r,selected:l,correct:o,onAnswer:i,reveal:a,lifelines:u,onLifeline:c}){let[p,m]=(0,pt.useState)(()=>Math.max(0,(r||0)-Gl())),v=(0,pt.useRef)(-1),z=(0,pt.useRef)(!1);(0,pt.useEffect)(()=>{let d=()=>{z.current=!0,Cd(),document.removeEventListener("click",d),document.removeEventListener("touchstart",d)};return document.addEventListener("click",d),document.addEventListener("touchstart",d),()=>{document.removeEventListener("click",d),document.removeEventListener("touchstart",d)}},[]),(0,pt.useEffect)(()=>{v.current=-1},[t]),(0,pt.useEffect)(()=>{if(!r)return;let d=()=>{let f=Math.max(0,r-Gl());if(m(f),!a&&f>0&&f<=5){let g=Math.ceil(f);if(g!==v.current){v.current=g;let x=g<=2?1200:g<=3?1e3:880,S=g<=2?.28:g<=3?.22:.16;gm(x,.1,S)}}};d();let s=setInterval(d,100);return()=>clearInterval(s)},[r,a]);let k=Math.max(1,(r||0)-(e?.startedAt||Gl())),y=r?Math.max(0,Math.min(100,p/k*100)):100,I=p<5&&!a;return(0,X.jsxs)("div",{className:"qz-question-stage",children:[(0,X.jsxs)("div",{className:"qz-progress",children:[(0,X.jsxs)("div",{className:"qz-label",children:["Q",t+1," / ",n]}),(0,X.jsx)("div",{className:"qz-progress-bar",children:(0,X.jsx)("div",{className:`qz-progress-fill${I?" qz-progress-fill-low":""}`,style:{width:`${y}%`}})}),(0,X.jsxs)("div",{className:`qz-timer ${I?"qz-timer-low":""}`,children:[Math.ceil(p),"s"]})]}),(0,X.jsx)("div",{className:"qz-question-text",children:e.question}),!a&&c&&(0,X.jsxs)("div",{className:"qz-lifelines",children:[(0,X.jsxs)("button",{type:"button",className:`qz-lifeline-btn${u?.doublePoints?" qz-lifeline-used":""}${u?.doublePointsActive?" qz-lifeline-active":""}`,onClick:()=>c("doublePoints"),disabled:u?.doublePoints||l!==null,title:"Double points \u2014 or lose 1000 if you're wrong!",children:[(0,X.jsx)("span",{className:"qz-lifeline-icon",children:"\u26A1"}),(0,X.jsx)("span",{className:"qz-lifeline-label",children:u?.doublePointsActive?"2\xD7 ON!":"2\xD7 or \u22121000"})]}),(0,X.jsxs)("button",{type:"button",className:`qz-lifeline-btn${u?.revealAnswer?" qz-lifeline-used":""}`,onClick:()=>c("revealAnswer"),disabled:u?.revealAnswer||l!==null,title:"Peek at the correct answer \u2014 once per game!",children:[(0,X.jsx)("span",{className:"qz-lifeline-icon",children:"\u{1F441}\uFE0F"}),(0,X.jsx)("span",{className:"qz-lifeline-label",children:u?.revealAnswer?"Used":"Reveal"})]})]}),(0,X.jsx)("div",{className:"qz-answers",children:e.answers.map((d,s)=>{let f=l===s,g=o!==null&&o===s,x=f&&o!==null&&o!==s,S=u?.revealedIndex===s&&l===null&&!a,q="qz-answer";return S&&(q+=" qz-peeked"),f&&!a&&o===null&&(q+=" qz-selected"),(a||o!==null)&&(g&&(q+=" qz-correct"),x&&(q+=" qz-wrong"),f&&g&&(q+=" qz-selected-correct")),(0,X.jsxs)("button",{type:"button",className:q,onClick:()=>!a&&i&&i(s),disabled:a||l!==null||!i,"aria-pressed":f,children:[(0,X.jsx)("div",{className:"qz-answer-letter","aria-hidden":"true",children:vd[s]}),(0,X.jsx)("div",{children:d}),S&&(0,X.jsx)("span",{className:"qz-peeked-badge",children:"\u2713 correct"})]},s)})})]})}var tv=j(Te(),1);var Pe=j(te(),1);function Xl({players:e,onRematch:t,onEnd:n,highlightId:r}){let l=e?.[0];return(0,Pe.jsxs)("div",{children:[(0,Pe.jsxs)("div",{className:"qz-finale",children:[(0,Pe.jsx)("div",{className:"qz-trophy",children:"\u{1F3C6}"}),(0,Pe.jsx)("h1",{className:"qz-winner-name",children:l?.name||"\u2014"}),(0,Pe.jsxs)("div",{className:"qz-winner-score",children:[(l?.score||0).toLocaleString()," points"]}),(0,Pe.jsxs)("div",{className:"qz-row-wrap",style:{justifyContent:"center"},children:[t&&(0,Pe.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:t,children:"Rematch"}),n&&(0,Pe.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:n,children:"End Game"})]})]}),(0,Pe.jsxs)("div",{className:"qz-card",children:[(0,Pe.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Final standings"}),(0,Pe.jsx)(Ln,{players:e,highlightId:r})]})]})}var C=j(te(),1),hm={mode:"adults",category:"random",difficulty:"mixed",questions_per_round:10,question_time:20,music_player:null,music_uri:"",tts_entity:null};function Pd({hass:e}){let[t,n]=(0,V.useState)(!1),[r,l]=(0,V.useState)(null),[o,i]=(0,V.useState)([]),[a,u]=(0,V.useState)(hm),[c,p]=(0,V.useState)(null),[m,v]=(0,V.useState)(null),[z,k]=(0,V.useState)(null),y=(0,V.useRef)(null),I=(0,V.useRef)(!1);(0,V.useEffect)(()=>{n(!!e?.connected)},[e?.connected]),(0,V.useEffect)(()=>{if(!e)return;let E=!1;return(async()=>{try{let w=await Jt(e,{type:"quizify/categories/list"});E||l(w||{adults:[],kids:[]})}catch(w){E||(k(w?.message||"Could not load categories"),l({adults:[],kids:[]}))}try{let w=await Jt(e,{type:"quizify/speakers/list"});E||i(w?.speakers||[])}catch{E||i([])}})(),()=>{E=!0}},[e]);let d=(0,V.useMemo)(()=>r?r[a.mode]||[]:[],[r,a.mode]);(0,V.useEffect)(()=>{if(!d.length||a.category==="random")return;let E=d.find(w=>w.id===a.category);(!E||E.count===0)&&u(w=>({...w,category:"random"}))},[d,a.category]);let s=(0,V.useCallback)(E=>{v(E),setTimeout(()=>v(w=>w===E?null:w),2200)},[]),f=(0,V.useCallback)(async E=>{if(e&&!I.current){I.current=!0;try{if(y.current){try{y.current()}catch{}y.current=null}y.current=await dd(e,{type:"quizify/admin/subscribe",session_id:E},w=>{w?.game&&p(w.game)})}catch(w){s(w?.message||"Could not subscribe")}finally{I.current=!1}}},[e,s]),g=(0,V.useCallback)(async()=>{if(e)try{let E=await Jt(e,{type:"quizify/game/create",mode:a.mode,category:a.category,difficulty:a.difficulty,questions_per_round:a.questions_per_round,question_time:a.question_time,music_player:a.music_player||null,music_uri:a.music_uri||null,tts_entity:a.tts_entity||null});p(E.game),await f(E.session_id)}catch(E){s(E?.message||"Could not create game")}},[e,a,s,f]),x=(0,V.useCallback)(async()=>{if(!(!e||!c))try{await Jt(e,{type:"quizify/game/start",session_id:c.session_id})}catch(E){s(E?.message||"Could not start game")}},[e,c,s]),S=(0,V.useCallback)(async()=>{if(!(!e||!c)){try{await Jt(e,{type:"quizify/game/end",session_id:c.session_id})}catch{}if(y.current){try{y.current()}catch{}y.current=null}p(null)}},[e,c]),q=(0,V.useCallback)(async()=>{if(!(!e||!c))try{let E=await Jt(e,{type:"quizify/game/rematch",session_id:c.session_id});p(E.game),await f(E.session_id)}catch(E){s(E?.message||"Rematch failed")}},[e,c,s,f]);if((0,V.useEffect)(()=>()=>{if(y.current){try{y.current()}catch{}y.current=null}},[]),!e)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:!1,subtitle:"Admin"}),(0,C.jsx)("div",{className:"qz-card",children:(0,C.jsx)("div",{className:"qz-empty",children:"Loading\u2026"})})]});if(z&&!r)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin"}),(0,C.jsxs)("div",{className:"qz-card",children:[(0,C.jsx)("h2",{className:"qz-display",style:{fontSize:24,marginTop:0},children:"Couldn't load Quizify"}),(0,C.jsx)("div",{className:"qz-mono",style:{marginTop:12},children:z})]})]});if(!c)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Setup"}),(0,C.jsx)("div",{className:"qz-card",children:(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsx)(kd,{value:a.mode,onChange:E=>u(w=>({...w,mode:E,category:"random"}))}),r&&(0,C.jsx)(xd,{value:a.category,available:d,onChange:E=>u(w=>({...w,category:E}))}),(0,C.jsx)(qd,{value:a.difficulty,onChange:E=>u(w=>({...w,difficulty:E}))}),(0,C.jsxs)("div",{className:"qz-setup-grid",children:[(0,C.jsx)(ka,{label:"Questions",value:a.questions_per_round,onChange:E=>u(w=>({...w,questions_per_round:E})),options:[5,10,15,20]}),(0,C.jsx)(ka,{label:"Seconds per question",value:a.question_time,onChange:E=>u(w=>({...w,question_time:E})),options:[15,20,30,45]})]}),(0,C.jsxs)("div",{className:"qz-setup-grid",children:[(0,C.jsx)(Sd,{speakers:o,value:a.music_player,onChange:E=>u(w=>({...w,music_player:E}))}),(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsx)("div",{className:"qz-label",children:"Playlist URI (optional)"}),(0,C.jsx)("input",{type:"text",className:"qz-input",placeholder:"e.g. spotify:playlist:...",value:a.music_uri,onChange:E=>u(w=>({...w,music_uri:E.target.value}))})]})]}),(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsx)("div",{className:"qz-label",children:"TTS Announcer entity (optional)"}),(0,C.jsx)(_d,{speakers:o,value:a.tts_entity,onChange:E=>u(w=>({...w,tts_entity:E}))}),(0,C.jsx)("div",{className:"qz-muted",style:{fontSize:12},children:"If set, funny TTS announcements will play before the game starts and when a winner is declared. Use the same speaker as background music for best results."})]}),(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:g,disabled:!r||!t,style:{alignSelf:"flex-start",marginTop:8},children:"Create Game \u2192"})]})}),m&&(0,C.jsx)("div",{className:"qz-toast",children:m})]});if(c.state==="ended")return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Game Over"}),(0,C.jsx)(Xl,{players:c.players,onRematch:q,onEnd:S}),m&&(0,C.jsx)("div",{className:"qz-toast",children:m})]});if(c.state==="lobby")return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Lobby"}),(0,C.jsxs)("div",{className:"qz-lobby",children:[(0,C.jsx)(Ed,{joinCode:c.join_code}),(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsxs)("div",{className:"qz-card",children:[(0,C.jsxs)("div",{className:"qz-display qz-lobby-heading",children:["Players (",c.players.length,")"]}),(0,C.jsx)(Nd,{players:c.players})]}),(0,C.jsxs)("div",{className:"qz-row-wrap",children:[(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:x,disabled:c.players.length===0,children:"Start Game"}),(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:S,children:"Cancel"})]})]})]}),m&&(0,C.jsx)("div",{className:"qz-toast",children:m})]});let N=c.current_question;return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:`Admin \xB7 ${c.state==="reveal"?"Reveal":"Question"}`}),N&&(0,C.jsx)(Kl,{question:{question:N.question,answers:N.answers,startedAt:N.deadline-(c.settings?.question_time||20)},index:N.index,total:N.total,deadline:N.deadline,selected:null,correct:N.correct!==void 0?N.correct:null,reveal:c.state==="reveal"}),c.state==="reveal"&&N?.explanation&&(0,C.jsxs)("div",{className:"qz-reveal-banner",children:[(0,C.jsx)("div",{className:"qz-label",children:"Why"}),(0,C.jsx)("div",{className:"qz-reveal-explanation",children:N.explanation})]}),(0,C.jsxs)("div",{className:"qz-card",style:{marginTop:20},children:[(0,C.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Live Scoreboard"}),(0,C.jsx)(Ln,{players:c.players})]}),(0,C.jsx)("div",{className:"qz-row-wrap",style:{marginTop:16},children:(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:S,children:"End Game"})}),m&&(0,C.jsx)("div",{className:"qz-toast",children:m})]})}var W=j(Te(),1);var P=j(te(),1),qa="quizify_player_v3";function ym(){try{let e=window.localStorage.getItem(qa);return e?JSON.parse(e):null}catch{return null}}function zm(e){try{window.localStorage.setItem(qa,JSON.stringify(e))}catch{}}function Td(){try{window.localStorage.removeItem(qa)}catch{}}var Ld={doublePoints:!1,doublePointsActive:!1,revealAnswer:!1,revealedIndex:null};function Rd({initialJoinCode:e}){let[t,n]=(0,W.useState)("connecting"),[r,l]=(0,W.useState)(null),[o,i]=(0,W.useState)(null),[a,u]=(0,W.useState)(null),[c,p]=(0,W.useState)(e||""),[m,v]=(0,W.useState)(""),[z,k]=(0,W.useState)(null),[y,I]=(0,W.useState)(null),[d,s]=(0,W.useState)(!1),[f,g]=(0,W.useState)(null),[x,S]=(0,W.useState)({...Ld}),q=(0,W.useRef)(null),[N,E]=(0,W.useState)(null),w=(0,W.useCallback)(M=>{I(M),setTimeout(()=>I(J=>J===M?null:J),2200)},[]);(0,W.useEffect)(()=>{let M=ym();M?.join_code===(e||"").toUpperCase()?l(M):M&&!e&&(l(M),p(M.join_code||""));let J=new Ql({onStatus:n,onEvent:L=>{if(L?.event==="error"){if(L.code==="invalid_token"||L.code==="not_found"){Td(),l(null),i(null),u(null),w(L.message||"Session ended");return}w(L.message||L.code||"Server error");return}if(L?.event==="peek_result"){L.correct!==null&&L.correct!==void 0&&S(Ue=>({...Ue,revealedIndex:L.correct}));return}if(L?.event==="joined"||L?.event==="resumed"){let Ue={player_id:L.player_id,session_id:L.session_id,player_token:L.player_token,name:L.name,join_code:L.game?.join_code||c.toUpperCase()};l(Ue),zm(Ue),J.setResume({session_id:Ue.session_id,player_token:Ue.player_token}),L.game&&i(L.game),L.you&&u(L.you),L.event==="joined"&&s(!1);return}L?.game&&i(L.game),L?.you&&u(L.you),L?.event==="question"&&(k(null),E(null),S(Ue=>({...Ue,doublePointsActive:!1,revealedIndex:null})))}});return M?.session_id&&M?.player_token&&J.setResume({session_id:M.session_id,player_token:M.player_token}),q.current=J,J.connect(),()=>{J.close(),q.current=null}},[]);let Fe=(0,W.useCallback)(()=>{let M=q.current;if(!M||t!=="open")return;let J=c.trim().toUpperCase(),L=m.trim();!J||L.length===0||(s(!0),g(null),M.send({type:"join",join_code:J,name:L}),setTimeout(()=>s(!1),4e3))},[c,m,t]),Zl=(0,W.useCallback)(M=>{let J=q.current;if(!J||!r||z!==null)return;k(M),J.send({type:"answer",answer:M})||(k(null),w("Disconnected \u2014 try again"))},[r,z,w]),Md=(0,W.useCallback)(M=>{if(M==="doublePoints"){if(x.doublePoints)return;S(J=>({...J,doublePoints:!0,doublePointsActive:!0})),w("\u26A1 Double or nothing \u2014 you brave soul!")}else if(M==="revealAnswer"){if(x.revealAnswer)return;let J=o?.current_question;if(!J)return;let L=J.correct;if(L!=null){w("Already revealed!");return}let Ue=q.current;Ue&&Ue.send({type:"peek_answer"}),S(jd=>({...jd,revealAnswer:!0})),w("\u{1F441}\uFE0F The answer has been revealed \u2014 don't tell anyone!")}},[x,o,w]);(0,W.useEffect)(()=>{},[]);let Ca=(0,W.useCallback)(()=>{let M=q.current;if(M){try{M.send({type:"leave"})}catch{}M.setResume(null)}Td(),l(null),i(null),u(null),k(null),S({...Ld})},[]),tt=t==="open";if(!r)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt}),(0,P.jsxs)("div",{className:"qz-join-screen",children:[(0,P.jsxs)("div",{className:"qz-join-hero",children:[(0,P.jsx)("h1",{children:"Quizify"}),(0,P.jsx)("p",{children:"Get in. Get smart. Win."})]}),(0,P.jsx)("div",{className:"qz-card",children:(0,P.jsxs)("div",{className:"qz-stack",children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Join code"}),(0,P.jsx)("input",{type:"text",className:"qz-input qz-mono qz-input-code",inputMode:"text",placeholder:"6 letters",value:c,maxLength:6,onChange:M=>p(M.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")),autoCapitalize:"characters",autoComplete:"off",spellCheck:!1})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Your name"}),(0,P.jsx)("input",{type:"text",className:"qz-input",placeholder:"Enter a name",value:m,maxLength:20,onChange:M=>v(M.target.value),onKeyDown:M=>{M.key==="Enter"&&Fe()},autoComplete:"off"})]}),(0,P.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:Fe,disabled:d||!tt||c.length<4||!m.trim(),children:d?"Joining\u2026":tt?"Join Game":"Connecting\u2026"}),f&&(0,P.jsx)("div",{className:"qz-error-text",children:f})]})})]}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});if(!o)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt,subtitle:r.name}),(0,P.jsx)("div",{className:"qz-empty",children:tt?"Loading game\u2026":"Reconnecting\u2026"})]});if(o.state==="ended")return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt,subtitle:r.name}),(0,P.jsx)(Xl,{players:o.players,highlightId:r.player_id}),(0,P.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,P.jsx)("button",{type:"button",className:"qz-btn",onClick:Ca,children:"Leave"})}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});if(o.state==="lobby")return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt,subtitle:r.name}),(0,P.jsxs)("div",{className:"qz-card qz-center-card",children:[(0,P.jsx)("div",{className:"qz-trophy",style:{fontSize:64},children:"\u{1F44B}"}),(0,P.jsx)("h2",{className:"qz-display qz-lobby-title",children:"You're in"}),(0,P.jsx)("p",{className:"qz-muted",children:"Waiting for the host to start the game\u2026"}),(0,P.jsx)("div",{style:{marginTop:24},children:(0,P.jsxs)("div",{className:"qz-label",children:["Players (",o.players.length,")"]})}),(0,P.jsx)(Ln,{players:o.players,highlightId:r.player_id})]}),(0,P.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,P.jsx)("button",{type:"button",className:"qz-btn",onClick:Ca,children:"Leave"})}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});let Ae=o.current_question;if(!Ae)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt,subtitle:r.name}),(0,P.jsx)("div",{className:"qz-empty",children:"Waiting for next question\u2026"})]});let bt=o.state==="reveal",Dd=a?.score??0,Pa=a?.streak??0,qm=bt?Ae.correct:(x.revealedIndex!==null,null);return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:tt,subtitle:r.name}),(0,P.jsx)(Kl,{question:{question:Ae.question,answers:Ae.answers,startedAt:Ae.deadline-(o.settings?.question_time||20)},index:Ae.index,total:Ae.total,deadline:Ae.deadline,selected:z,correct:bt?Ae.correct:null,onAnswer:Zl,reveal:bt,lifelines:x,onLifeline:!bt&&z===null?Md:null}),bt&&Ae.explanation&&(0,P.jsxs)("div",{className:"qz-reveal-banner",children:[(0,P.jsx)("div",{className:"qz-label",children:"Why"}),(0,P.jsx)("div",{className:"qz-reveal-explanation",children:Ae.explanation})]}),z!==null&&!bt&&(0,P.jsx)("div",{className:"qz-card qz-answer-feedback-card",children:(0,P.jsxs)("div",{className:"qz-feedback-waiting",children:[(0,P.jsx)("span",{className:"qz-feedback-spinner",children:"\u23F3"}),(0,P.jsx)("span",{children:"Answer locked in! Waiting for reveal\u2026"}),x.doublePointsActive&&(0,P.jsx)("div",{className:"qz-feedback-lifeline-note",children:"\u26A1 Double points gamble active!"})]})}),a&&(0,P.jsxs)("div",{className:"qz-card qz-score-card",children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Your score"}),(0,P.jsxs)("div",{className:"qz-display qz-score-value",children:[Dd.toLocaleString(),Pa>=3&&(0,P.jsxs)("span",{className:"qz-streak-badge qz-streak-inline",children:["\u{1F525} ",Pa," streak"]})]})]}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]})}var Sa=`/* ============================================================
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

.qz-answer.qz-selected {
  border-color: var(--qz-accent);
  background: rgba(92, 240, 212, 0.1);
}

.qz-answer.qz-selected .qz-answer-letter {
  background: var(--qz-accent);
  color: #08152a;
  border-color: var(--qz-accent);
}

.qz-answer.qz-correct {
  border-color: var(--qz-correct);
  background: rgba(92, 240, 164, 0.18);
  animation: qz-correct-pop 0.45s var(--qz-ease);
}

.qz-answer.qz-correct .qz-answer-letter {
  background: var(--qz-correct);
  color: #08152a;
  border-color: var(--qz-correct);
}

/* Player selected the correct answer \u2014 stronger green glow */
.qz-answer.qz-selected-correct {
  border-color: var(--qz-correct);
  background: rgba(92, 240, 164, 0.3);
  box-shadow: 0 0 0 3px rgba(92, 240, 164, 0.4), 0 8px 24px -8px rgba(92, 240, 164, 0.5);
  animation: qz-correct-pop 0.45s var(--qz-ease);
}

.qz-answer.qz-wrong {
  border-color: var(--qz-wrong);
  background: rgba(255, 92, 124, 0.15);
}

.qz-answer.qz-wrong .qz-answer-letter {
  background: var(--qz-wrong);
  color: #fff;
  border-color: var(--qz-wrong);
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

/* Progress bar turns red in last 5s */
.qz-progress-fill-low {
  background: linear-gradient(90deg, var(--qz-wrong), #ff8c7c) !important;
}

@keyframes qz-correct-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.04); }
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
`;var Na=j(te(),1),Od=!1;function km(){if(Od)return;Od=!0;let e=document.createElement("style");e.setAttribute("data-quizify",""),e.textContent=Sa,document.head.appendChild(e)}var _a=class extends HTMLElement{constructor(){super(),this._hass=null,this._narrow=!1,this._root=null,this._mountPoint=null}set hass(t){this._hass=t,this._render()}get hass(){return this._hass}set narrow(t){this._narrow=t,this._render()}set route(t){}set panel(t){}connectedCallback(){if(!this.shadowRoot){let t=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=Sa,t.appendChild(n);let r=document.createElement("div");r.className="qz-shadow-host",t.appendChild(r),this._mountPoint=r,this._root=(0,Ea.createRoot)(r)}this._render()}disconnectedCallback(){this._root&&queueMicrotask(()=>{try{this._root.unmount()}catch{}this._root=null})}_render(){this._root&&this._root.render((0,Na.jsx)(Pd,{hass:this._hass,narrow:this._narrow}))}};customElements.get("quizify-panel")||customElements.define("quizify-panel",_a);function xm(){try{let n=(new URLSearchParams(window.location.search).get("code")||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);if(n)return n}catch{}return""}function Id(){let e=document.getElementById("quizify-root");if(!e||(e.dataset.view||"")!=="player")return;let n=xm()||e.dataset.joinCode||"";km(),(0,Ea.createRoot)(e).render((0,Na.jsx)(Rd,{initialJoinCode:n}))}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Id):Id());})();
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
