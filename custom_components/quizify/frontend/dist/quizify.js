(()=>{var Cd=Object.create;var _u=Object.defineProperty;var Pd=Object.getOwnPropertyDescriptor;var Td=Object.getOwnPropertyNames;var Ld=Object.getPrototypeOf,Rd=Object.prototype.hasOwnProperty;var be=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Od=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Td(t))!Rd.call(e,l)&&l!==n&&_u(e,l,{get:()=>t[l],enumerable:!(r=Pd(t,l))||r.enumerable});return e};var D=(e,t,n)=>(n=e!=null?Cd(Ld(e)):{},Od(t||!e||!e.__esModule?_u(n,"default",{value:e,enumerable:!0}):n,e));var ju=be(T=>{"use strict";var Cn=Symbol.for("react.element"),Md=Symbol.for("react.portal"),Id=Symbol.for("react.fragment"),Dd=Symbol.for("react.strict_mode"),jd=Symbol.for("react.profiler"),Fd=Symbol.for("react.provider"),Ud=Symbol.for("react.context"),Ad=Symbol.for("react.forward_ref"),Bd=Symbol.for("react.suspense"),Vd=Symbol.for("react.memo"),Wd=Symbol.for("react.lazy"),Eu=Symbol.iterator;function $d(e){return e===null||typeof e!="object"?null:(e=Eu&&e[Eu]||e["@@iterator"],typeof e=="function"?e:null)}var Pu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Tu=Object.assign,Lu={};function Kt(e,t,n){this.props=e,this.context=t,this.refs=Lu,this.updater=n||Pu}Kt.prototype.isReactComponent={};Kt.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Kt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ru(){}Ru.prototype=Kt.prototype;function Xl(e,t,n){this.props=e,this.context=t,this.refs=Lu,this.updater=n||Pu}var Zl=Xl.prototype=new Ru;Zl.constructor=Xl;Tu(Zl,Kt.prototype);Zl.isPureReactComponent=!0;var Nu=Array.isArray,Ou=Object.prototype.hasOwnProperty,Jl={current:null},Mu={key:!0,ref:!0,__self:!0,__source:!0};function Iu(e,t,n){var r,l={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Ou.call(t,r)&&!Mu.hasOwnProperty(r)&&(l[r]=t[r]);var u=arguments.length-2;if(u===1)l.children=n;else if(1<u){for(var a=Array(u),c=0;c<u;c++)a[c]=arguments[c+2];l.children=a}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)l[r]===void 0&&(l[r]=u[r]);return{$$typeof:Cn,type:e,key:o,ref:i,props:l,_owner:Jl.current}}function Hd(e,t){return{$$typeof:Cn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function bl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Cn}function Qd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Cu=/\/+/g;function Kl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Qd(""+e.key):t.toString(36)}function xr(e,t,n,r,l){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Cn:case Md:i=!0}}if(i)return i=e,l=l(i),e=r===""?"."+Kl(i,0):r,Nu(l)?(n="",e!=null&&(n=e.replace(Cu,"$&/")+"/"),xr(l,t,n,"",function(c){return c})):l!=null&&(bl(l)&&(l=Hd(l,n+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(Cu,"$&/")+"/")+e)),t.push(l)),1;if(i=0,r=r===""?".":r+":",Nu(e))for(var u=0;u<e.length;u++){o=e[u];var a=r+Kl(o,u);i+=xr(o,t,n,a,l)}else if(a=$d(e),typeof a=="function")for(e=a.call(e),u=0;!(o=e.next()).done;)o=o.value,a=r+Kl(o,u++),i+=xr(o,t,n,a,l);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function kr(e,t,n){if(e==null)return e;var r=[],l=0;return xr(e,r,"","",function(o){return t.call(n,o,l++)}),r}function Yd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var de={current:null},Sr={transition:null},Gd={ReactCurrentDispatcher:de,ReactCurrentBatchConfig:Sr,ReactCurrentOwner:Jl};function Du(){throw Error("act(...) is not supported in production builds of React.")}T.Children={map:kr,forEach:function(e,t,n){kr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return kr(e,function(){t++}),t},toArray:function(e){return kr(e,function(t){return t})||[]},only:function(e){if(!bl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};T.Component=Kt;T.Fragment=Id;T.Profiler=jd;T.PureComponent=Xl;T.StrictMode=Dd;T.Suspense=Bd;T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gd;T.act=Du;T.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Tu({},e.props),l=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Jl.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(a in t)Ou.call(t,a)&&!Mu.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&u!==void 0?u[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){u=Array(a);for(var c=0;c<a;c++)u[c]=arguments[c+2];r.children=u}return{$$typeof:Cn,type:e.type,key:l,ref:o,props:r,_owner:i}};T.createContext=function(e){return e={$$typeof:Ud,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Fd,_context:e},e.Consumer=e};T.createElement=Iu;T.createFactory=function(e){var t=Iu.bind(null,e);return t.type=e,t};T.createRef=function(){return{current:null}};T.forwardRef=function(e){return{$$typeof:Ad,render:e}};T.isValidElement=bl;T.lazy=function(e){return{$$typeof:Wd,_payload:{_status:-1,_result:e},_init:Yd}};T.memo=function(e,t){return{$$typeof:Vd,type:e,compare:t===void 0?null:t}};T.startTransition=function(e){var t=Sr.transition;Sr.transition={};try{e()}finally{Sr.transition=t}};T.unstable_act=Du;T.useCallback=function(e,t){return de.current.useCallback(e,t)};T.useContext=function(e){return de.current.useContext(e)};T.useDebugValue=function(){};T.useDeferredValue=function(e){return de.current.useDeferredValue(e)};T.useEffect=function(e,t){return de.current.useEffect(e,t)};T.useId=function(){return de.current.useId()};T.useImperativeHandle=function(e,t,n){return de.current.useImperativeHandle(e,t,n)};T.useInsertionEffect=function(e,t){return de.current.useInsertionEffect(e,t)};T.useLayoutEffect=function(e,t){return de.current.useLayoutEffect(e,t)};T.useMemo=function(e,t){return de.current.useMemo(e,t)};T.useReducer=function(e,t,n){return de.current.useReducer(e,t,n)};T.useRef=function(e){return de.current.useRef(e)};T.useState=function(e){return de.current.useState(e)};T.useSyncExternalStore=function(e,t,n){return de.current.useSyncExternalStore(e,t,n)};T.useTransition=function(){return de.current.useTransition()};T.version="18.3.1"});var Le=be((pm,Fu)=>{"use strict";Fu.exports=ju()});var Gu=be(F=>{"use strict";function ro(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,l=e[r];if(0<qr(l,t))e[r]=t,e[n]=l,n=r;else break e}}function Ue(e){return e.length===0?null:e[0]}function Er(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,l=e.length,o=l>>>1;r<o;){var i=2*(r+1)-1,u=e[i],a=i+1,c=e[a];if(0>qr(u,n))a<l&&0>qr(c,u)?(e[r]=c,e[a]=n,r=a):(e[r]=u,e[i]=n,r=i);else if(a<l&&0>qr(c,n))e[r]=c,e[a]=n,r=a;else break e}}return t}function qr(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Uu=performance,F.unstable_now=function(){return Uu.now()}):(eo=Date,Au=eo.now(),F.unstable_now=function(){return eo.now()-Au});var Uu,eo,Au,Ye=[],ct=[],Kd=1,Re=null,ie=3,Nr=!1,Ot=!1,Tn=!1,Wu=typeof setTimeout=="function"?setTimeout:null,$u=typeof clearTimeout=="function"?clearTimeout:null,Bu=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function lo(e){for(var t=Ue(ct);t!==null;){if(t.callback===null)Er(ct);else if(t.startTime<=e)Er(ct),t.sortIndex=t.expirationTime,ro(Ye,t);else break;t=Ue(ct)}}function oo(e){if(Tn=!1,lo(e),!Ot)if(Ue(Ye)!==null)Ot=!0,uo(io);else{var t=Ue(ct);t!==null&&ao(oo,t.startTime-e)}}function io(e,t){Ot=!1,Tn&&(Tn=!1,$u(Ln),Ln=-1),Nr=!0;var n=ie;try{for(lo(t),Re=Ue(Ye);Re!==null&&(!(Re.expirationTime>t)||e&&!Yu());){var r=Re.callback;if(typeof r=="function"){Re.callback=null,ie=Re.priorityLevel;var l=r(Re.expirationTime<=t);t=F.unstable_now(),typeof l=="function"?Re.callback=l:Re===Ue(Ye)&&Er(Ye),lo(t)}else Er(Ye);Re=Ue(Ye)}if(Re!==null)var o=!0;else{var i=Ue(ct);i!==null&&ao(oo,i.startTime-t),o=!1}return o}finally{Re=null,ie=n,Nr=!1}}var Cr=!1,_r=null,Ln=-1,Hu=5,Qu=-1;function Yu(){return!(F.unstable_now()-Qu<Hu)}function to(){if(_r!==null){var e=F.unstable_now();Qu=e;var t=!0;try{t=_r(!0,e)}finally{t?Pn():(Cr=!1,_r=null)}}else Cr=!1}var Pn;typeof Bu=="function"?Pn=function(){Bu(to)}:typeof MessageChannel<"u"?(no=new MessageChannel,Vu=no.port2,no.port1.onmessage=to,Pn=function(){Vu.postMessage(null)}):Pn=function(){Wu(to,0)};var no,Vu;function uo(e){_r=e,Cr||(Cr=!0,Pn())}function ao(e,t){Ln=Wu(function(){e(F.unstable_now())},t)}F.unstable_IdlePriority=5;F.unstable_ImmediatePriority=1;F.unstable_LowPriority=4;F.unstable_NormalPriority=3;F.unstable_Profiling=null;F.unstable_UserBlockingPriority=2;F.unstable_cancelCallback=function(e){e.callback=null};F.unstable_continueExecution=function(){Ot||Nr||(Ot=!0,uo(io))};F.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Hu=0<e?Math.floor(1e3/e):5};F.unstable_getCurrentPriorityLevel=function(){return ie};F.unstable_getFirstCallbackNode=function(){return Ue(Ye)};F.unstable_next=function(e){switch(ie){case 1:case 2:case 3:var t=3;break;default:t=ie}var n=ie;ie=t;try{return e()}finally{ie=n}};F.unstable_pauseExecution=function(){};F.unstable_requestPaint=function(){};F.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ie;ie=e;try{return t()}finally{ie=n}};F.unstable_scheduleCallback=function(e,t,n){var r=F.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return l=n+l,e={id:Kd++,callback:t,priorityLevel:e,startTime:n,expirationTime:l,sortIndex:-1},n>r?(e.sortIndex=n,ro(ct,e),Ue(Ye)===null&&e===Ue(ct)&&(Tn?($u(Ln),Ln=-1):Tn=!0,ao(oo,n-r))):(e.sortIndex=l,ro(Ye,e),Ot||Nr||(Ot=!0,uo(io))),e};F.unstable_shouldYield=Yu;F.unstable_wrapCallback=function(e){var t=ie;return function(){var n=ie;ie=t;try{return e.apply(this,arguments)}finally{ie=n}}}});var Xu=be((vm,Ku)=>{"use strict";Ku.exports=Gu()});var ed=be(Ce=>{"use strict";var Xd=Le(),Ee=Xu();function h(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var rs=new Set,bn={};function Qt(e,t){hn(e,t),hn(e+"Capture",t)}function hn(e,t){for(bn[e]=t,e=0;e<t.length;e++)rs.add(t[e])}var ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ro=Object.prototype.hasOwnProperty,Zd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Zu={},Ju={};function Jd(e){return Ro.call(Ju,e)?!0:Ro.call(Zu,e)?!1:Zd.test(e)?Ju[e]=!0:(Zu[e]=!0,!1)}function bd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ef(e,t,n,r){if(t===null||typeof t>"u"||bd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function me(e,t,n,r,l,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){oe[e]=new me(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];oe[t]=new me(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){oe[e]=new me(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){oe[e]=new me(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){oe[e]=new me(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){oe[e]=new me(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){oe[e]=new me(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){oe[e]=new me(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){oe[e]=new me(e,5,!1,e.toLowerCase(),null,!1,!1)});var qi=/[\-:]([a-z])/g;function _i(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(qi,_i);oe[t]=new me(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(qi,_i);oe[t]=new me(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(qi,_i);oe[t]=new me(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){oe[e]=new me(e,1,!1,e.toLowerCase(),null,!1,!1)});oe.xlinkHref=new me("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){oe[e]=new me(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ei(e,t,n,r){var l=oe.hasOwnProperty(t)?oe[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ef(t,n,l,r)&&(n=null),r||l===null?Jd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var st=Xd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Pr=Symbol.for("react.element"),Jt=Symbol.for("react.portal"),bt=Symbol.for("react.fragment"),Ni=Symbol.for("react.strict_mode"),Oo=Symbol.for("react.profiler"),ls=Symbol.for("react.provider"),os=Symbol.for("react.context"),Ci=Symbol.for("react.forward_ref"),Mo=Symbol.for("react.suspense"),Io=Symbol.for("react.suspense_list"),Pi=Symbol.for("react.memo"),ft=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var is=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var bu=Symbol.iterator;function Rn(e){return e===null||typeof e!="object"?null:(e=bu&&e[bu]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,so;function An(e){if(so===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);so=t&&t[1]||""}return`
`+so+e}var co=!1;function fo(e,t){if(!e||co)return"";co=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var l=c.stack.split(`
`),o=r.stack.split(`
`),i=l.length-1,u=o.length-1;1<=i&&0<=u&&l[i]!==o[u];)u--;for(;1<=i&&0<=u;i--,u--)if(l[i]!==o[u]){if(i!==1||u!==1)do if(i--,u--,0>u||l[i]!==o[u]){var a=`
`+l[i].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=i&&0<=u);break}}}finally{co=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?An(e):""}function tf(e){switch(e.tag){case 5:return An(e.type);case 16:return An("Lazy");case 13:return An("Suspense");case 19:return An("SuspenseList");case 0:case 2:case 15:return e=fo(e.type,!1),e;case 11:return e=fo(e.type.render,!1),e;case 1:return e=fo(e.type,!0),e;default:return""}}function Do(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bt:return"Fragment";case Jt:return"Portal";case Oo:return"Profiler";case Ni:return"StrictMode";case Mo:return"Suspense";case Io:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case os:return(e.displayName||"Context")+".Consumer";case ls:return(e._context.displayName||"Context")+".Provider";case Ci:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pi:return t=e.displayName||null,t!==null?t:Do(e.type)||"Memo";case ft:t=e._payload,e=e._init;try{return Do(e(t))}catch{}}return null}function nf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Do(t);case 8:return t===Ni?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Et(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function us(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function rf(e){var t=us(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Tr(e){e._valueTracker||(e._valueTracker=rf(e))}function as(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=us(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ll(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function jo(e,t){var n=t.checked;return Q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ea(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Et(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ss(e,t){t=t.checked,t!=null&&Ei(e,"checked",t,!1)}function Fo(e,t){ss(e,t);var n=Et(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Uo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Uo(e,t.type,Et(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ta(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Uo(e,t,n){(t!=="number"||ll(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Bn=Array.isArray;function dn(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Et(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Ao(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(h(91));return Q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function na(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(h(92));if(Bn(n)){if(1<n.length)throw Error(h(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Et(n)}}function cs(e,t){var n=Et(t.value),r=Et(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ra(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ds(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ds(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Lr,fs=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Lr=Lr||document.createElement("div"),Lr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Lr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function er(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $n={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lf=["Webkit","ms","Moz","O"];Object.keys($n).forEach(function(e){lf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$n[t]=$n[e]})});function ps(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||$n.hasOwnProperty(e)&&$n[e]?(""+t).trim():t+"px"}function ms(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=ps(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var of=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Vo(e,t){if(t){if(of[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(h(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(h(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(h(61))}if(t.style!=null&&typeof t.style!="object")throw Error(h(62))}}function Wo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $o=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ho=null,fn=null,pn=null;function la(e){if(e=yr(e)){if(typeof Ho!="function")throw Error(h(280));var t=e.stateNode;t&&(t=Rl(t),Ho(e.stateNode,e.type,t))}}function vs(e){fn?pn?pn.push(e):pn=[e]:fn=e}function gs(){if(fn){var e=fn,t=pn;if(pn=fn=null,la(e),t)for(e=0;e<t.length;e++)la(t[e])}}function hs(e,t){return e(t)}function ys(){}var po=!1;function zs(e,t,n){if(po)return e(t,n);po=!0;try{return hs(e,t,n)}finally{po=!1,(fn!==null||pn!==null)&&(ys(),gs())}}function tr(e,t){var n=e.stateNode;if(n===null)return null;var r=Rl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(h(231,t,typeof n));return n}var Qo=!1;if(ot)try{Xt={},Object.defineProperty(Xt,"passive",{get:function(){Qo=!0}}),window.addEventListener("test",Xt,Xt),window.removeEventListener("test",Xt,Xt)}catch{Qo=!1}var Xt;function uf(e,t,n,r,l,o,i,u,a){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Hn=!1,ol=null,il=!1,Yo=null,af={onError:function(e){Hn=!0,ol=e}};function sf(e,t,n,r,l,o,i,u,a){Hn=!1,ol=null,uf.apply(af,arguments)}function cf(e,t,n,r,l,o,i,u,a){if(sf.apply(this,arguments),Hn){if(Hn){var c=ol;Hn=!1,ol=null}else throw Error(h(198));il||(il=!0,Yo=c)}}function Yt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ws(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function oa(e){if(Yt(e)!==e)throw Error(h(188))}function df(e){var t=e.alternate;if(!t){if(t=Yt(e),t===null)throw Error(h(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var o=l.alternate;if(o===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===o.child){for(o=l.child;o;){if(o===n)return oa(l),e;if(o===r)return oa(l),t;o=o.sibling}throw Error(h(188))}if(n.return!==r.return)n=l,r=o;else{for(var i=!1,u=l.child;u;){if(u===n){i=!0,n=l,r=o;break}if(u===r){i=!0,r=l,n=o;break}u=u.sibling}if(!i){for(u=o.child;u;){if(u===n){i=!0,n=o,r=l;break}if(u===r){i=!0,r=o,n=l;break}u=u.sibling}if(!i)throw Error(h(189))}}if(n.alternate!==r)throw Error(h(190))}if(n.tag!==3)throw Error(h(188));return n.stateNode.current===n?e:t}function ks(e){return e=df(e),e!==null?xs(e):null}function xs(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=xs(e);if(t!==null)return t;e=e.sibling}return null}var Ss=Ee.unstable_scheduleCallback,ia=Ee.unstable_cancelCallback,ff=Ee.unstable_shouldYield,pf=Ee.unstable_requestPaint,G=Ee.unstable_now,mf=Ee.unstable_getCurrentPriorityLevel,Li=Ee.unstable_ImmediatePriority,qs=Ee.unstable_UserBlockingPriority,ul=Ee.unstable_NormalPriority,vf=Ee.unstable_LowPriority,_s=Ee.unstable_IdlePriority,Cl=null,Ze=null;function gf(e){if(Ze&&typeof Ze.onCommitFiberRoot=="function")try{Ze.onCommitFiberRoot(Cl,e,void 0,(e.current.flags&128)===128)}catch{}}var $e=Math.clz32?Math.clz32:zf,hf=Math.log,yf=Math.LN2;function zf(e){return e>>>=0,e===0?32:31-(hf(e)/yf|0)|0}var Rr=64,Or=4194304;function Vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function al(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~l;u!==0?r=Vn(u):(o&=i,o!==0&&(r=Vn(o)))}else i=n&~l,i!==0?r=Vn(i):o!==0&&(r=Vn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,o=t&-t,l>=o||l===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-$e(t),l=1<<n,r|=e[n],t&=~l;return r}function wf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-$e(o),u=1<<i,a=l[i];a===-1?(!(u&n)||u&r)&&(l[i]=wf(u,t)):a<=t&&(e.expiredLanes|=u),o&=~u}}function Go(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Es(){var e=Rr;return Rr<<=1,!(Rr&4194240)&&(Rr=64),e}function mo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function gr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-$e(t),e[t]=n}function xf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-$e(n),o=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~o}}function Ri(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-$e(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var O=0;function Ns(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Cs,Oi,Ps,Ts,Ls,Ko=!1,Mr=[],yt=null,zt=null,wt=null,nr=new Map,rr=new Map,mt=[],Sf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ua(e,t){switch(e){case"focusin":case"focusout":yt=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":wt=null;break;case"pointerover":case"pointerout":nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":rr.delete(t.pointerId)}}function On(e,t,n,r,l,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[l]},t!==null&&(t=yr(t),t!==null&&Oi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function qf(e,t,n,r,l){switch(t){case"focusin":return yt=On(yt,e,t,n,r,l),!0;case"dragenter":return zt=On(zt,e,t,n,r,l),!0;case"mouseover":return wt=On(wt,e,t,n,r,l),!0;case"pointerover":var o=l.pointerId;return nr.set(o,On(nr.get(o)||null,e,t,n,r,l)),!0;case"gotpointercapture":return o=l.pointerId,rr.set(o,On(rr.get(o)||null,e,t,n,r,l)),!0}return!1}function Rs(e){var t=Dt(e.target);if(t!==null){var n=Yt(t);if(n!==null){if(t=n.tag,t===13){if(t=ws(n),t!==null){e.blockedOn=t,Ls(e.priority,function(){Ps(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Gr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Xo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);$o=r,n.target.dispatchEvent(r),$o=null}else return t=yr(n),t!==null&&Oi(t),e.blockedOn=n,!1;t.shift()}return!0}function aa(e,t,n){Gr(e)&&n.delete(t)}function _f(){Ko=!1,yt!==null&&Gr(yt)&&(yt=null),zt!==null&&Gr(zt)&&(zt=null),wt!==null&&Gr(wt)&&(wt=null),nr.forEach(aa),rr.forEach(aa)}function Mn(e,t){e.blockedOn===t&&(e.blockedOn=null,Ko||(Ko=!0,Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority,_f)))}function lr(e){function t(l){return Mn(l,e)}if(0<Mr.length){Mn(Mr[0],e);for(var n=1;n<Mr.length;n++){var r=Mr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(yt!==null&&Mn(yt,e),zt!==null&&Mn(zt,e),wt!==null&&Mn(wt,e),nr.forEach(t),rr.forEach(t),n=0;n<mt.length;n++)r=mt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<mt.length&&(n=mt[0],n.blockedOn===null);)Rs(n),n.blockedOn===null&&mt.shift()}var mn=st.ReactCurrentBatchConfig,sl=!0;function Ef(e,t,n,r){var l=O,o=mn.transition;mn.transition=null;try{O=1,Mi(e,t,n,r)}finally{O=l,mn.transition=o}}function Nf(e,t,n,r){var l=O,o=mn.transition;mn.transition=null;try{O=4,Mi(e,t,n,r)}finally{O=l,mn.transition=o}}function Mi(e,t,n,r){if(sl){var l=Xo(e,t,n,r);if(l===null)ko(e,t,r,cl,n),ua(e,r);else if(qf(l,e,t,n,r))r.stopPropagation();else if(ua(e,r),t&4&&-1<Sf.indexOf(e)){for(;l!==null;){var o=yr(l);if(o!==null&&Cs(o),o=Xo(e,t,n,r),o===null&&ko(e,t,r,cl,n),o===l)break;l=o}l!==null&&r.stopPropagation()}else ko(e,t,r,null,n)}}var cl=null;function Xo(e,t,n,r){if(cl=null,e=Ti(r),e=Dt(e),e!==null)if(t=Yt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ws(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return cl=e,null}function Os(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(mf()){case Li:return 1;case qs:return 4;case ul:case vf:return 16;case _s:return 536870912;default:return 16}default:return 16}}var gt=null,Ii=null,Kr=null;function Ms(){if(Kr)return Kr;var e,t=Ii,n=t.length,r,l="value"in gt?gt.value:gt.textContent,o=l.length;for(e=0;e<n&&t[e]===l[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===l[o-r];r++);return Kr=l.slice(e,1<r?1-r:void 0)}function Xr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ir(){return!0}function sa(){return!1}function Ne(e){function t(n,r,l,o,i){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(o):o[u]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ir:sa,this.isPropagationStopped=sa,this}return Q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ir)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ir)},persist:function(){},isPersistent:Ir}),t}var qn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Di=Ne(qn),hr=Q({},qn,{view:0,detail:0}),Cf=Ne(hr),vo,go,In,Pl=Q({},hr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ji,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==In&&(In&&e.type==="mousemove"?(vo=e.screenX-In.screenX,go=e.screenY-In.screenY):go=vo=0,In=e),vo)},movementY:function(e){return"movementY"in e?e.movementY:go}}),ca=Ne(Pl),Pf=Q({},Pl,{dataTransfer:0}),Tf=Ne(Pf),Lf=Q({},hr,{relatedTarget:0}),ho=Ne(Lf),Rf=Q({},qn,{animationName:0,elapsedTime:0,pseudoElement:0}),Of=Ne(Rf),Mf=Q({},qn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),If=Ne(Mf),Df=Q({},qn,{data:0}),da=Ne(Df),jf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ff={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Uf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Af(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Uf[e])?!!t[e]:!1}function ji(){return Af}var Bf=Q({},hr,{key:function(e){if(e.key){var t=jf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Xr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ff[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ji,charCode:function(e){return e.type==="keypress"?Xr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Vf=Ne(Bf),Wf=Q({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fa=Ne(Wf),$f=Q({},hr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ji}),Hf=Ne($f),Qf=Q({},qn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Yf=Ne(Qf),Gf=Q({},Pl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Kf=Ne(Gf),Xf=[9,13,27,32],Fi=ot&&"CompositionEvent"in window,Qn=null;ot&&"documentMode"in document&&(Qn=document.documentMode);var Zf=ot&&"TextEvent"in window&&!Qn,Is=ot&&(!Fi||Qn&&8<Qn&&11>=Qn),pa=" ",ma=!1;function Ds(e,t){switch(e){case"keyup":return Xf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function js(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var en=!1;function Jf(e,t){switch(e){case"compositionend":return js(t);case"keypress":return t.which!==32?null:(ma=!0,pa);case"textInput":return e=t.data,e===pa&&ma?null:e;default:return null}}function bf(e,t){if(en)return e==="compositionend"||!Fi&&Ds(e,t)?(e=Ms(),Kr=Ii=gt=null,en=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Is&&t.locale!=="ko"?null:t.data;default:return null}}var ep={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function va(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ep[e.type]:t==="textarea"}function Fs(e,t,n,r){vs(r),t=dl(t,"onChange"),0<t.length&&(n=new Di("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Yn=null,or=null;function tp(e){Ks(e,0)}function Tl(e){var t=rn(e);if(as(t))return e}function np(e,t){if(e==="change")return t}var Us=!1;ot&&(ot?(jr="oninput"in document,jr||(yo=document.createElement("div"),yo.setAttribute("oninput","return;"),jr=typeof yo.oninput=="function"),Dr=jr):Dr=!1,Us=Dr&&(!document.documentMode||9<document.documentMode));var Dr,jr,yo;function ga(){Yn&&(Yn.detachEvent("onpropertychange",As),or=Yn=null)}function As(e){if(e.propertyName==="value"&&Tl(or)){var t=[];Fs(t,or,e,Ti(e)),zs(tp,t)}}function rp(e,t,n){e==="focusin"?(ga(),Yn=t,or=n,Yn.attachEvent("onpropertychange",As)):e==="focusout"&&ga()}function lp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Tl(or)}function op(e,t){if(e==="click")return Tl(t)}function ip(e,t){if(e==="input"||e==="change")return Tl(t)}function up(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Qe=typeof Object.is=="function"?Object.is:up;function ir(e,t){if(Qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Ro.call(t,l)||!Qe(e[l],t[l]))return!1}return!0}function ha(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ya(e,t){var n=ha(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ha(n)}}function Bs(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Bs(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Vs(){for(var e=window,t=ll();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ll(e.document)}return t}function Ui(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ap(e){var t=Vs(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Bs(n.ownerDocument.documentElement,n)){if(r!==null&&Ui(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,o=Math.min(r.start,l);r=r.end===void 0?o:Math.min(r.end,l),!e.extend&&o>r&&(l=r,r=o,o=l),l=ya(n,o);var i=ya(n,r);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var sp=ot&&"documentMode"in document&&11>=document.documentMode,tn=null,Zo=null,Gn=null,Jo=!1;function za(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Jo||tn==null||tn!==ll(r)||(r=tn,"selectionStart"in r&&Ui(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Gn&&ir(Gn,r)||(Gn=r,r=dl(Zo,"onSelect"),0<r.length&&(t=new Di("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=tn)))}function Fr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var nn={animationend:Fr("Animation","AnimationEnd"),animationiteration:Fr("Animation","AnimationIteration"),animationstart:Fr("Animation","AnimationStart"),transitionend:Fr("Transition","TransitionEnd")},zo={},Ws={};ot&&(Ws=document.createElement("div").style,"AnimationEvent"in window||(delete nn.animationend.animation,delete nn.animationiteration.animation,delete nn.animationstart.animation),"TransitionEvent"in window||delete nn.transitionend.transition);function Ll(e){if(zo[e])return zo[e];if(!nn[e])return e;var t=nn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ws)return zo[e]=t[n];return e}var $s=Ll("animationend"),Hs=Ll("animationiteration"),Qs=Ll("animationstart"),Ys=Ll("transitionend"),Gs=new Map,wa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ct(e,t){Gs.set(e,t),Qt(t,[e])}for(Ur=0;Ur<wa.length;Ur++)Ar=wa[Ur],ka=Ar.toLowerCase(),xa=Ar[0].toUpperCase()+Ar.slice(1),Ct(ka,"on"+xa);var Ar,ka,xa,Ur;Ct($s,"onAnimationEnd");Ct(Hs,"onAnimationIteration");Ct(Qs,"onAnimationStart");Ct("dblclick","onDoubleClick");Ct("focusin","onFocus");Ct("focusout","onBlur");Ct(Ys,"onTransitionEnd");hn("onMouseEnter",["mouseout","mouseover"]);hn("onMouseLeave",["mouseout","mouseover"]);hn("onPointerEnter",["pointerout","pointerover"]);hn("onPointerLeave",["pointerout","pointerover"]);Qt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wn));function Sa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,cf(r,t,void 0,e),e.currentTarget=null}function Ks(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],a=u.instance,c=u.currentTarget;if(u=u.listener,a!==o&&l.isPropagationStopped())break e;Sa(l,u,c),o=a}else for(i=0;i<r.length;i++){if(u=r[i],a=u.instance,c=u.currentTarget,u=u.listener,a!==o&&l.isPropagationStopped())break e;Sa(l,u,c),o=a}}}if(il)throw e=Yo,il=!1,Yo=null,e}function A(e,t){var n=t[ri];n===void 0&&(n=t[ri]=new Set);var r=e+"__bubble";n.has(r)||(Xs(t,e,2,!1),n.add(r))}function wo(e,t,n){var r=0;t&&(r|=4),Xs(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function ur(e){if(!e[Br]){e[Br]=!0,rs.forEach(function(n){n!=="selectionchange"&&(cp.has(n)||wo(n,!1,e),wo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Br]||(t[Br]=!0,wo("selectionchange",!1,t))}}function Xs(e,t,n,r){switch(Os(t)){case 1:var l=Ef;break;case 4:l=Nf;break;default:l=Mi}n=l.bind(null,t,n,e),l=void 0,!Qo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function ko(e,t,n,r,l){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===l||u.nodeType===8&&u.parentNode===l)break;if(i===4)for(i=r.return;i!==null;){var a=i.tag;if((a===3||a===4)&&(a=i.stateNode.containerInfo,a===l||a.nodeType===8&&a.parentNode===l))return;i=i.return}for(;u!==null;){if(i=Dt(u),i===null)return;if(a=i.tag,a===5||a===6){r=o=i;continue e}u=u.parentNode}}r=r.return}zs(function(){var c=o,m=Ti(n),p=[];e:{var v=Gs.get(e);if(v!==void 0){var z=Di,w=e;switch(e){case"keypress":if(Xr(n)===0)break e;case"keydown":case"keyup":z=Vf;break;case"focusin":w="focus",z=ho;break;case"focusout":w="blur",z=ho;break;case"beforeblur":case"afterblur":z=ho;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":z=ca;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":z=Tf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":z=Hf;break;case $s:case Hs:case Qs:z=Of;break;case Ys:z=Yf;break;case"scroll":z=Cf;break;case"wheel":z=Kf;break;case"copy":case"cut":case"paste":z=If;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":z=fa}var y=(t&4)!==0,R=!y&&e==="scroll",d=y?v!==null?v+"Capture":null:v;y=[];for(var s=c,f;s!==null;){f=s;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=tr(s,d),g!=null&&y.push(ar(s,g,f)))),R)break;s=s.return}0<y.length&&(v=new z(v,w,null,n,m),p.push({event:v,listeners:y}))}}if(!(t&7)){e:{if(v=e==="mouseover"||e==="pointerover",z=e==="mouseout"||e==="pointerout",v&&n!==$o&&(w=n.relatedTarget||n.fromElement)&&(Dt(w)||w[it]))break e;if((z||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,z?(w=n.relatedTarget||n.toElement,z=c,w=w?Dt(w):null,w!==null&&(R=Yt(w),w!==R||w.tag!==5&&w.tag!==6)&&(w=null)):(z=null,w=c),z!==w)){if(y=ca,g="onMouseLeave",d="onMouseEnter",s="mouse",(e==="pointerout"||e==="pointerover")&&(y=fa,g="onPointerLeave",d="onPointerEnter",s="pointer"),R=z==null?v:rn(z),f=w==null?v:rn(w),v=new y(g,s+"leave",z,n,m),v.target=R,v.relatedTarget=f,g=null,Dt(m)===c&&(y=new y(d,s+"enter",w,n,m),y.target=f,y.relatedTarget=R,g=y),R=g,z&&w)t:{for(y=z,d=w,s=0,f=y;f;f=Zt(f))s++;for(f=0,g=d;g;g=Zt(g))f++;for(;0<s-f;)y=Zt(y),s--;for(;0<f-s;)d=Zt(d),f--;for(;s--;){if(y===d||d!==null&&y===d.alternate)break t;y=Zt(y),d=Zt(d)}y=null}else y=null;z!==null&&qa(p,v,z,y,!1),w!==null&&R!==null&&qa(p,R,w,y,!0)}}e:{if(v=c?rn(c):window,z=v.nodeName&&v.nodeName.toLowerCase(),z==="select"||z==="input"&&v.type==="file")var x=np;else if(va(v))if(Us)x=ip;else{x=lp;var q=rp}else(z=v.nodeName)&&z.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(x=op);if(x&&(x=x(e,c))){Fs(p,x,n,m);break e}q&&q(e,v,c),e==="focusout"&&(q=v._wrapperState)&&q.controlled&&v.type==="number"&&Uo(v,"number",v.value)}switch(q=c?rn(c):window,e){case"focusin":(va(q)||q.contentEditable==="true")&&(tn=q,Zo=c,Gn=null);break;case"focusout":Gn=Zo=tn=null;break;case"mousedown":Jo=!0;break;case"contextmenu":case"mouseup":case"dragend":Jo=!1,za(p,n,m);break;case"selectionchange":if(sp)break;case"keydown":case"keyup":za(p,n,m)}var N;if(Fi)e:{switch(e){case"compositionstart":var _="onCompositionStart";break e;case"compositionend":_="onCompositionEnd";break e;case"compositionupdate":_="onCompositionUpdate";break e}_=void 0}else en?Ds(e,n)&&(_="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(_="onCompositionStart");_&&(Is&&n.locale!=="ko"&&(en||_!=="onCompositionStart"?_==="onCompositionEnd"&&en&&(N=Ms()):(gt=m,Ii="value"in gt?gt.value:gt.textContent,en=!0)),q=dl(c,_),0<q.length&&(_=new da(_,e,null,n,m),p.push({event:_,listeners:q}),N?_.data=N:(N=js(n),N!==null&&(_.data=N)))),(N=Zf?Jf(e,n):bf(e,n))&&(c=dl(c,"onBeforeInput"),0<c.length&&(m=new da("onBeforeInput","beforeinput",null,n,m),p.push({event:m,listeners:c}),m.data=N))}Ks(p,t)})}function ar(e,t,n){return{instance:e,listener:t,currentTarget:n}}function dl(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,o=l.stateNode;l.tag===5&&o!==null&&(l=o,o=tr(e,n),o!=null&&r.unshift(ar(e,o,l)),o=tr(e,t),o!=null&&r.push(ar(e,o,l))),e=e.return}return r}function Zt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function qa(e,t,n,r,l){for(var o=t._reactName,i=[];n!==null&&n!==r;){var u=n,a=u.alternate,c=u.stateNode;if(a!==null&&a===r)break;u.tag===5&&c!==null&&(u=c,l?(a=tr(n,o),a!=null&&i.unshift(ar(n,a,u))):l||(a=tr(n,o),a!=null&&i.push(ar(n,a,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var dp=/\r\n?/g,fp=/\u0000|\uFFFD/g;function _a(e){return(typeof e=="string"?e:""+e).replace(dp,`
`).replace(fp,"")}function Vr(e,t,n){if(t=_a(t),_a(e)!==t&&n)throw Error(h(425))}function fl(){}var bo=null,ei=null;function ti(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ni=typeof setTimeout=="function"?setTimeout:void 0,pp=typeof clearTimeout=="function"?clearTimeout:void 0,Ea=typeof Promise=="function"?Promise:void 0,mp=typeof queueMicrotask=="function"?queueMicrotask:typeof Ea<"u"?function(e){return Ea.resolve(null).then(e).catch(vp)}:ni;function vp(e){setTimeout(function(){throw e})}function xo(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),lr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);lr(t)}function kt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Na(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _n=Math.random().toString(36).slice(2),Xe="__reactFiber$"+_n,sr="__reactProps$"+_n,it="__reactContainer$"+_n,ri="__reactEvents$"+_n,gp="__reactListeners$"+_n,hp="__reactHandles$"+_n;function Dt(e){var t=e[Xe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[it]||n[Xe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Na(e);e!==null;){if(n=e[Xe])return n;e=Na(e)}return t}e=n,n=e.parentNode}return null}function yr(e){return e=e[Xe]||e[it],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function rn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(h(33))}function Rl(e){return e[sr]||null}var li=[],ln=-1;function Pt(e){return{current:e}}function B(e){0>ln||(e.current=li[ln],li[ln]=null,ln--)}function U(e,t){ln++,li[ln]=e.current,e.current=t}var Nt={},ce=Pt(Nt),ze=Pt(!1),Bt=Nt;function yn(e,t){var n=e.type.contextTypes;if(!n)return Nt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},o;for(o in n)l[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function we(e){return e=e.childContextTypes,e!=null}function pl(){B(ze),B(ce)}function Ca(e,t,n){if(ce.current!==Nt)throw Error(h(168));U(ce,t),U(ze,n)}function Zs(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(h(108,nf(e)||"Unknown",l));return Q({},n,r)}function ml(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Nt,Bt=ce.current,U(ce,e),U(ze,ze.current),!0}function Pa(e,t,n){var r=e.stateNode;if(!r)throw Error(h(169));n?(e=Zs(e,t,Bt),r.__reactInternalMemoizedMergedChildContext=e,B(ze),B(ce),U(ce,e)):B(ze),U(ze,n)}var tt=null,Ol=!1,So=!1;function Js(e){tt===null?tt=[e]:tt.push(e)}function yp(e){Ol=!0,Js(e)}function Tt(){if(!So&&tt!==null){So=!0;var e=0,t=O;try{var n=tt;for(O=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}tt=null,Ol=!1}catch(l){throw tt!==null&&(tt=tt.slice(e+1)),Ss(Li,Tt),l}finally{O=t,So=!1}}return null}var on=[],un=0,vl=null,gl=0,Oe=[],Me=0,Vt=null,nt=1,rt="";function Mt(e,t){on[un++]=gl,on[un++]=vl,vl=e,gl=t}function bs(e,t,n){Oe[Me++]=nt,Oe[Me++]=rt,Oe[Me++]=Vt,Vt=e;var r=nt;e=rt;var l=32-$e(r)-1;r&=~(1<<l),n+=1;var o=32-$e(t)+l;if(30<o){var i=l-l%5;o=(r&(1<<i)-1).toString(32),r>>=i,l-=i,nt=1<<32-$e(t)+l|n<<l|r,rt=o+e}else nt=1<<o|n<<l|r,rt=e}function Ai(e){e.return!==null&&(Mt(e,1),bs(e,1,0))}function Bi(e){for(;e===vl;)vl=on[--un],on[un]=null,gl=on[--un],on[un]=null;for(;e===Vt;)Vt=Oe[--Me],Oe[Me]=null,rt=Oe[--Me],Oe[Me]=null,nt=Oe[--Me],Oe[Me]=null}var _e=null,qe=null,W=!1,We=null;function ec(e,t){var n=Ie(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ta(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,_e=e,qe=kt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,_e=e,qe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Vt!==null?{id:nt,overflow:rt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ie(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,_e=e,qe=null,!0):!1;default:return!1}}function oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ii(e){if(W){var t=qe;if(t){var n=t;if(!Ta(e,t)){if(oi(e))throw Error(h(418));t=kt(n.nextSibling);var r=_e;t&&Ta(e,t)?ec(r,n):(e.flags=e.flags&-4097|2,W=!1,_e=e)}}else{if(oi(e))throw Error(h(418));e.flags=e.flags&-4097|2,W=!1,_e=e}}}function La(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;_e=e}function Wr(e){if(e!==_e)return!1;if(!W)return La(e),W=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ti(e.type,e.memoizedProps)),t&&(t=qe)){if(oi(e))throw tc(),Error(h(418));for(;t;)ec(e,t),t=kt(t.nextSibling)}if(La(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){qe=kt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}qe=null}}else qe=_e?kt(e.stateNode.nextSibling):null;return!0}function tc(){for(var e=qe;e;)e=kt(e.nextSibling)}function zn(){qe=_e=null,W=!1}function Vi(e){We===null?We=[e]:We.push(e)}var zp=st.ReactCurrentBatchConfig;function Dn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(h(309));var r=n.stateNode}if(!r)throw Error(h(147,e));var l=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var u=l.refs;i===null?delete u[o]:u[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(h(284));if(!n._owner)throw Error(h(290,e))}return e}function $r(e,t){throw e=Object.prototype.toString.call(t),Error(h(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ra(e){var t=e._init;return t(e._payload)}function nc(e){function t(d,s){if(e){var f=d.deletions;f===null?(d.deletions=[s],d.flags|=16):f.push(s)}}function n(d,s){if(!e)return null;for(;s!==null;)t(d,s),s=s.sibling;return null}function r(d,s){for(d=new Map;s!==null;)s.key!==null?d.set(s.key,s):d.set(s.index,s),s=s.sibling;return d}function l(d,s){return d=_t(d,s),d.index=0,d.sibling=null,d}function o(d,s,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<s?(d.flags|=2,s):f):(d.flags|=2,s)):(d.flags|=1048576,s)}function i(d){return e&&d.alternate===null&&(d.flags|=2),d}function u(d,s,f,g){return s===null||s.tag!==6?(s=To(f,d.mode,g),s.return=d,s):(s=l(s,f),s.return=d,s)}function a(d,s,f,g){var x=f.type;return x===bt?m(d,s,f.props.children,g,f.key):s!==null&&(s.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===ft&&Ra(x)===s.type)?(g=l(s,f.props),g.ref=Dn(d,s,f),g.return=d,g):(g=rl(f.type,f.key,f.props,null,d.mode,g),g.ref=Dn(d,s,f),g.return=d,g)}function c(d,s,f,g){return s===null||s.tag!==4||s.stateNode.containerInfo!==f.containerInfo||s.stateNode.implementation!==f.implementation?(s=Lo(f,d.mode,g),s.return=d,s):(s=l(s,f.children||[]),s.return=d,s)}function m(d,s,f,g,x){return s===null||s.tag!==7?(s=At(f,d.mode,g,x),s.return=d,s):(s=l(s,f),s.return=d,s)}function p(d,s,f){if(typeof s=="string"&&s!==""||typeof s=="number")return s=To(""+s,d.mode,f),s.return=d,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case Pr:return f=rl(s.type,s.key,s.props,null,d.mode,f),f.ref=Dn(d,null,s),f.return=d,f;case Jt:return s=Lo(s,d.mode,f),s.return=d,s;case ft:var g=s._init;return p(d,g(s._payload),f)}if(Bn(s)||Rn(s))return s=At(s,d.mode,f,null),s.return=d,s;$r(d,s)}return null}function v(d,s,f,g){var x=s!==null?s.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return x!==null?null:u(d,s,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Pr:return f.key===x?a(d,s,f,g):null;case Jt:return f.key===x?c(d,s,f,g):null;case ft:return x=f._init,v(d,s,x(f._payload),g)}if(Bn(f)||Rn(f))return x!==null?null:m(d,s,f,g,null);$r(d,f)}return null}function z(d,s,f,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,u(s,d,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Pr:return d=d.get(g.key===null?f:g.key)||null,a(s,d,g,x);case Jt:return d=d.get(g.key===null?f:g.key)||null,c(s,d,g,x);case ft:var q=g._init;return z(d,s,f,q(g._payload),x)}if(Bn(g)||Rn(g))return d=d.get(f)||null,m(s,d,g,x,null);$r(s,g)}return null}function w(d,s,f,g){for(var x=null,q=null,N=s,_=s=0,E=null;N!==null&&_<f.length;_++){N.index>_?(E=N,N=null):E=N.sibling;var k=v(d,N,f[_],g);if(k===null){N===null&&(N=E);break}e&&N&&k.alternate===null&&t(d,N),s=o(k,s,_),q===null?x=k:q.sibling=k,q=k,N=E}if(_===f.length)return n(d,N),W&&Mt(d,_),x;if(N===null){for(;_<f.length;_++)N=p(d,f[_],g),N!==null&&(s=o(N,s,_),q===null?x=N:q.sibling=N,q=N);return W&&Mt(d,_),x}for(N=r(d,N);_<f.length;_++)E=z(N,d,_,f[_],g),E!==null&&(e&&E.alternate!==null&&N.delete(E.key===null?_:E.key),s=o(E,s,_),q===null?x=E:q.sibling=E,q=E);return e&&N.forEach(function(Z){return t(d,Z)}),W&&Mt(d,_),x}function y(d,s,f,g){var x=Rn(f);if(typeof x!="function")throw Error(h(150));if(f=x.call(f),f==null)throw Error(h(151));for(var q=x=null,N=s,_=s=0,E=null,k=f.next();N!==null&&!k.done;_++,k=f.next()){N.index>_?(E=N,N=null):E=N.sibling;var Z=v(d,N,k.value,g);if(Z===null){N===null&&(N=E);break}e&&N&&Z.alternate===null&&t(d,N),s=o(Z,s,_),q===null?x=Z:q.sibling=Z,q=Z,N=E}if(k.done)return n(d,N),W&&Mt(d,_),x;if(N===null){for(;!k.done;_++,k=f.next())k=p(d,k.value,g),k!==null&&(s=o(k,s,_),q===null?x=k:q.sibling=k,q=k);return W&&Mt(d,_),x}for(N=r(d,N);!k.done;_++,k=f.next())k=z(N,d,_,k.value,g),k!==null&&(e&&k.alternate!==null&&N.delete(k.key===null?_:k.key),s=o(k,s,_),q===null?x=k:q.sibling=k,q=k);return e&&N.forEach(function(Nn){return t(d,Nn)}),W&&Mt(d,_),x}function R(d,s,f,g){if(typeof f=="object"&&f!==null&&f.type===bt&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Pr:e:{for(var x=f.key,q=s;q!==null;){if(q.key===x){if(x=f.type,x===bt){if(q.tag===7){n(d,q.sibling),s=l(q,f.props.children),s.return=d,d=s;break e}}else if(q.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===ft&&Ra(x)===q.type){n(d,q.sibling),s=l(q,f.props),s.ref=Dn(d,q,f),s.return=d,d=s;break e}n(d,q);break}else t(d,q);q=q.sibling}f.type===bt?(s=At(f.props.children,d.mode,g,f.key),s.return=d,d=s):(g=rl(f.type,f.key,f.props,null,d.mode,g),g.ref=Dn(d,s,f),g.return=d,d=g)}return i(d);case Jt:e:{for(q=f.key;s!==null;){if(s.key===q)if(s.tag===4&&s.stateNode.containerInfo===f.containerInfo&&s.stateNode.implementation===f.implementation){n(d,s.sibling),s=l(s,f.children||[]),s.return=d,d=s;break e}else{n(d,s);break}else t(d,s);s=s.sibling}s=Lo(f,d.mode,g),s.return=d,d=s}return i(d);case ft:return q=f._init,R(d,s,q(f._payload),g)}if(Bn(f))return w(d,s,f,g);if(Rn(f))return y(d,s,f,g);$r(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,s!==null&&s.tag===6?(n(d,s.sibling),s=l(s,f),s.return=d,d=s):(n(d,s),s=To(f,d.mode,g),s.return=d,d=s),i(d)):n(d,s)}return R}var wn=nc(!0),rc=nc(!1),hl=Pt(null),yl=null,an=null,Wi=null;function $i(){Wi=an=yl=null}function Hi(e){var t=hl.current;B(hl),e._currentValue=t}function ui(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function vn(e,t){yl=e,Wi=an=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ye=!0),e.firstContext=null)}function je(e){var t=e._currentValue;if(Wi!==e)if(e={context:e,memoizedValue:t,next:null},an===null){if(yl===null)throw Error(h(308));an=e,yl.dependencies={lanes:0,firstContext:e}}else an=an.next=e;return t}var jt=null;function Qi(e){jt===null?jt=[e]:jt.push(e)}function lc(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,Qi(t)):(n.next=l.next,l.next=n),t.interleaved=n,ut(e,r)}function ut(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var pt=!1;function Yi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function oc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function lt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function xt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,L&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,ut(e,n)}return l=r.interleaved,l===null?(t.next=t,Qi(r)):(t.next=l.next,l.next=t),r.interleaved=t,ut(e,n)}function Zr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ri(e,n)}}function Oa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?l=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?l=o=t:o=o.next=t}else l=o=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function zl(e,t,n,r){var l=e.updateQueue;pt=!1;var o=l.firstBaseUpdate,i=l.lastBaseUpdate,u=l.shared.pending;if(u!==null){l.shared.pending=null;var a=u,c=a.next;a.next=null,i===null?o=c:i.next=c,i=a;var m=e.alternate;m!==null&&(m=m.updateQueue,u=m.lastBaseUpdate,u!==i&&(u===null?m.firstBaseUpdate=c:u.next=c,m.lastBaseUpdate=a))}if(o!==null){var p=l.baseState;i=0,m=c=a=null,u=o;do{var v=u.lane,z=u.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:z,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var w=e,y=u;switch(v=t,z=n,y.tag){case 1:if(w=y.payload,typeof w=="function"){p=w.call(z,p,v);break e}p=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=y.payload,v=typeof w=="function"?w.call(z,p,v):w,v==null)break e;p=Q({},p,v);break e;case 2:pt=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,v=l.effects,v===null?l.effects=[u]:v.push(u))}else z={eventTime:z,lane:v,tag:u.tag,payload:u.payload,callback:u.callback,next:null},m===null?(c=m=z,a=p):m=m.next=z,i|=v;if(u=u.next,u===null){if(u=l.shared.pending,u===null)break;v=u,u=v.next,v.next=null,l.lastBaseUpdate=v,l.shared.pending=null}}while(!0);if(m===null&&(a=p),l.baseState=a,l.firstBaseUpdate=c,l.lastBaseUpdate=m,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else o===null&&(l.shared.lanes=0);$t|=i,e.lanes=i,e.memoizedState=p}}function Ma(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(h(191,l));l.call(r)}}}var zr={},Je=Pt(zr),cr=Pt(zr),dr=Pt(zr);function Ft(e){if(e===zr)throw Error(h(174));return e}function Gi(e,t){switch(U(dr,t),U(cr,e),U(Je,zr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bo(t,e)}B(Je),U(Je,t)}function kn(){B(Je),B(cr),B(dr)}function ic(e){Ft(dr.current);var t=Ft(Je.current),n=Bo(t,e.type);t!==n&&(U(cr,e),U(Je,n))}function Ki(e){cr.current===e&&(B(Je),B(cr))}var $=Pt(0);function wl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qo=[];function Xi(){for(var e=0;e<qo.length;e++)qo[e]._workInProgressVersionPrimary=null;qo.length=0}var Jr=st.ReactCurrentDispatcher,_o=st.ReactCurrentBatchConfig,Wt=0,H=null,J=null,te=null,kl=!1,Kn=!1,fr=0,wp=0;function ue(){throw Error(h(321))}function Zi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qe(e[n],t[n]))return!1;return!0}function Ji(e,t,n,r,l,o){if(Wt=o,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Jr.current=e===null||e.memoizedState===null?qp:_p,e=n(r,l),Kn){o=0;do{if(Kn=!1,fr=0,25<=o)throw Error(h(301));o+=1,te=J=null,t.updateQueue=null,Jr.current=Ep,e=n(r,l)}while(Kn)}if(Jr.current=xl,t=J!==null&&J.next!==null,Wt=0,te=J=H=null,kl=!1,t)throw Error(h(300));return e}function bi(){var e=fr!==0;return fr=0,e}function Ke(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return te===null?H.memoizedState=te=e:te=te.next=e,te}function Fe(){if(J===null){var e=H.alternate;e=e!==null?e.memoizedState:null}else e=J.next;var t=te===null?H.memoizedState:te.next;if(t!==null)te=t,J=e;else{if(e===null)throw Error(h(310));J=e,e={memoizedState:J.memoizedState,baseState:J.baseState,baseQueue:J.baseQueue,queue:J.queue,next:null},te===null?H.memoizedState=te=e:te=te.next=e}return te}function pr(e,t){return typeof t=="function"?t(e):t}function Eo(e){var t=Fe(),n=t.queue;if(n===null)throw Error(h(311));n.lastRenderedReducer=e;var r=J,l=r.baseQueue,o=n.pending;if(o!==null){if(l!==null){var i=l.next;l.next=o.next,o.next=i}r.baseQueue=l=o,n.pending=null}if(l!==null){o=l.next,r=r.baseState;var u=i=null,a=null,c=o;do{var m=c.lane;if((Wt&m)===m)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var p={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(u=a=p,i=r):a=a.next=p,H.lanes|=m,$t|=m}c=c.next}while(c!==null&&c!==o);a===null?i=r:a.next=u,Qe(r,t.memoizedState)||(ye=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do o=l.lane,H.lanes|=o,$t|=o,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function No(e){var t=Fe(),n=t.queue;if(n===null)throw Error(h(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,o=t.memoizedState;if(l!==null){n.pending=null;var i=l=l.next;do o=e(o,i.action),i=i.next;while(i!==l);Qe(o,t.memoizedState)||(ye=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function uc(){}function ac(e,t){var n=H,r=Fe(),l=t(),o=!Qe(r.memoizedState,l);if(o&&(r.memoizedState=l,ye=!0),r=r.queue,eu(dc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||te!==null&&te.memoizedState.tag&1){if(n.flags|=2048,mr(9,cc.bind(null,n,r,l,t),void 0,null),ne===null)throw Error(h(349));Wt&30||sc(n,t,l)}return l}function sc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function cc(e,t,n,r){t.value=n,t.getSnapshot=r,fc(t)&&pc(e)}function dc(e,t,n){return n(function(){fc(t)&&pc(e)})}function fc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qe(e,n)}catch{return!0}}function pc(e){var t=ut(e,1);t!==null&&He(t,e,1,-1)}function Ia(e){var t=Ke();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},t.queue=e,e=e.dispatch=Sp.bind(null,H,e),[t.memoizedState,e]}function mr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function mc(){return Fe().memoizedState}function br(e,t,n,r){var l=Ke();H.flags|=e,l.memoizedState=mr(1|t,n,void 0,r===void 0?null:r)}function Ml(e,t,n,r){var l=Fe();r=r===void 0?null:r;var o=void 0;if(J!==null){var i=J.memoizedState;if(o=i.destroy,r!==null&&Zi(r,i.deps)){l.memoizedState=mr(t,n,o,r);return}}H.flags|=e,l.memoizedState=mr(1|t,n,o,r)}function Da(e,t){return br(8390656,8,e,t)}function eu(e,t){return Ml(2048,8,e,t)}function vc(e,t){return Ml(4,2,e,t)}function gc(e,t){return Ml(4,4,e,t)}function hc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function yc(e,t,n){return n=n!=null?n.concat([e]):null,Ml(4,4,hc.bind(null,t,e),n)}function tu(){}function zc(e,t){var n=Fe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Zi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function wc(e,t){var n=Fe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Zi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function kc(e,t,n){return Wt&21?(Qe(n,t)||(n=Es(),H.lanes|=n,$t|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ye=!0),e.memoizedState=n)}function kp(e,t){var n=O;O=n!==0&&4>n?n:4,e(!0);var r=_o.transition;_o.transition={};try{e(!1),t()}finally{O=n,_o.transition=r}}function xc(){return Fe().memoizedState}function xp(e,t,n){var r=qt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Sc(e))qc(t,n);else if(n=lc(e,t,n,r),n!==null){var l=pe();He(n,e,r,l),_c(n,t,r)}}function Sp(e,t,n){var r=qt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sc(e))qc(t,l);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,u=o(i,n);if(l.hasEagerState=!0,l.eagerState=u,Qe(u,i)){var a=t.interleaved;a===null?(l.next=l,Qi(t)):(l.next=a.next,a.next=l),t.interleaved=l;return}}catch{}finally{}n=lc(e,t,l,r),n!==null&&(l=pe(),He(n,e,r,l),_c(n,t,r))}}function Sc(e){var t=e.alternate;return e===H||t!==null&&t===H}function qc(e,t){Kn=kl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _c(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ri(e,n)}}var xl={readContext:je,useCallback:ue,useContext:ue,useEffect:ue,useImperativeHandle:ue,useInsertionEffect:ue,useLayoutEffect:ue,useMemo:ue,useReducer:ue,useRef:ue,useState:ue,useDebugValue:ue,useDeferredValue:ue,useTransition:ue,useMutableSource:ue,useSyncExternalStore:ue,useId:ue,unstable_isNewReconciler:!1},qp={readContext:je,useCallback:function(e,t){return Ke().memoizedState=[e,t===void 0?null:t],e},useContext:je,useEffect:Da,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,br(4194308,4,hc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return br(4194308,4,e,t)},useInsertionEffect:function(e,t){return br(4,2,e,t)},useMemo:function(e,t){var n=Ke();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ke();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=xp.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=Ke();return e={current:e},t.memoizedState=e},useState:Ia,useDebugValue:tu,useDeferredValue:function(e){return Ke().memoizedState=e},useTransition:function(){var e=Ia(!1),t=e[0];return e=kp.bind(null,e[1]),Ke().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=H,l=Ke();if(W){if(n===void 0)throw Error(h(407));n=n()}else{if(n=t(),ne===null)throw Error(h(349));Wt&30||sc(r,t,n)}l.memoizedState=n;var o={value:n,getSnapshot:t};return l.queue=o,Da(dc.bind(null,r,o,e),[e]),r.flags|=2048,mr(9,cc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ke(),t=ne.identifierPrefix;if(W){var n=rt,r=nt;n=(r&~(1<<32-$e(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=fr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=wp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_p={readContext:je,useCallback:zc,useContext:je,useEffect:eu,useImperativeHandle:yc,useInsertionEffect:vc,useLayoutEffect:gc,useMemo:wc,useReducer:Eo,useRef:mc,useState:function(){return Eo(pr)},useDebugValue:tu,useDeferredValue:function(e){var t=Fe();return kc(t,J.memoizedState,e)},useTransition:function(){var e=Eo(pr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:uc,useSyncExternalStore:ac,useId:xc,unstable_isNewReconciler:!1},Ep={readContext:je,useCallback:zc,useContext:je,useEffect:eu,useImperativeHandle:yc,useInsertionEffect:vc,useLayoutEffect:gc,useMemo:wc,useReducer:No,useRef:mc,useState:function(){return No(pr)},useDebugValue:tu,useDeferredValue:function(e){var t=Fe();return J===null?t.memoizedState=e:kc(t,J.memoizedState,e)},useTransition:function(){var e=No(pr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:uc,useSyncExternalStore:ac,useId:xc,unstable_isNewReconciler:!1};function Be(e,t){if(e&&e.defaultProps){t=Q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ai(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Il={isMounted:function(e){return(e=e._reactInternals)?Yt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pe(),l=qt(e),o=lt(r,l);o.payload=t,n!=null&&(o.callback=n),t=xt(e,o,l),t!==null&&(He(t,e,l,r),Zr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pe(),l=qt(e),o=lt(r,l);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=xt(e,o,l),t!==null&&(He(t,e,l,r),Zr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pe(),r=qt(e),l=lt(n,r);l.tag=2,t!=null&&(l.callback=t),t=xt(e,l,r),t!==null&&(He(t,e,r,n),Zr(t,e,r))}};function ja(e,t,n,r,l,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!ir(n,r)||!ir(l,o):!0}function Ec(e,t,n){var r=!1,l=Nt,o=t.contextType;return typeof o=="object"&&o!==null?o=je(o):(l=we(t)?Bt:ce.current,r=t.contextTypes,o=(r=r!=null)?yn(e,l):Nt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Il,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=o),t}function Fa(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Il.enqueueReplaceState(t,t.state,null)}function si(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},Yi(e);var o=t.contextType;typeof o=="object"&&o!==null?l.context=je(o):(o=we(t)?Bt:ce.current,l.context=yn(e,o)),l.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ai(e,t,o,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Il.enqueueReplaceState(l,l.state,null),zl(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function xn(e,t){try{var n="",r=t;do n+=tf(r),r=r.return;while(r);var l=n}catch(o){l=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:l,digest:null}}function Co(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ci(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Np=typeof WeakMap=="function"?WeakMap:Map;function Nc(e,t,n){n=lt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ql||(ql=!0,wi=r),ci(e,t)},n}function Cc(e,t,n){n=lt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){ci(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ci(e,t),typeof r!="function"&&(St===null?St=new Set([this]):St.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Ua(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Np;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=Bp.bind(null,e,t,n),t.then(e,e))}function Aa(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ba(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=lt(-1,1),t.tag=2,xt(n,t,1))),n.lanes|=1),e)}var Cp=st.ReactCurrentOwner,ye=!1;function fe(e,t,n,r){t.child=e===null?rc(t,null,n,r):wn(t,e.child,n,r)}function Va(e,t,n,r,l){n=n.render;var o=t.ref;return vn(t,l),r=Ji(e,t,n,r,o,l),n=bi(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,at(e,t,l)):(W&&n&&Ai(t),t.flags|=1,fe(e,t,r,l),t.child)}function Wa(e,t,n,r,l){if(e===null){var o=n.type;return typeof o=="function"&&!su(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Pc(e,t,o,r,l)):(e=rl(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&l)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:ir,n(i,r)&&e.ref===t.ref)return at(e,t,l)}return t.flags|=1,e=_t(o,r),e.ref=t.ref,e.return=t,t.child=e}function Pc(e,t,n,r,l){if(e!==null){var o=e.memoizedProps;if(ir(o,r)&&e.ref===t.ref)if(ye=!1,t.pendingProps=r=o,(e.lanes&l)!==0)e.flags&131072&&(ye=!0);else return t.lanes=e.lanes,at(e,t,l)}return di(e,t,n,r,l)}function Tc(e,t,n){var r=t.pendingProps,l=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(cn,Se),Se|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,U(cn,Se),Se|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,U(cn,Se),Se|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,U(cn,Se),Se|=r;return fe(e,t,l,n),t.child}function Lc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function di(e,t,n,r,l){var o=we(n)?Bt:ce.current;return o=yn(t,o),vn(t,l),n=Ji(e,t,n,r,o,l),r=bi(),e!==null&&!ye?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,at(e,t,l)):(W&&r&&Ai(t),t.flags|=1,fe(e,t,n,l),t.child)}function $a(e,t,n,r,l){if(we(n)){var o=!0;ml(t)}else o=!1;if(vn(t,l),t.stateNode===null)el(e,t),Ec(t,n,r),si(t,n,r,l),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var a=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=je(c):(c=we(n)?Bt:ce.current,c=yn(t,c));var m=n.getDerivedStateFromProps,p=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||a!==c)&&Fa(t,i,r,c),pt=!1;var v=t.memoizedState;i.state=v,zl(t,r,i,l),a=t.memoizedState,u!==r||v!==a||ze.current||pt?(typeof m=="function"&&(ai(t,n,m,r),a=t.memoizedState),(u=pt||ja(t,n,u,r,v,a,c))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),i.props=r,i.state=a,i.context=c,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,oc(e,t),u=t.memoizedProps,c=t.type===t.elementType?u:Be(t.type,u),i.props=c,p=t.pendingProps,v=i.context,a=n.contextType,typeof a=="object"&&a!==null?a=je(a):(a=we(n)?Bt:ce.current,a=yn(t,a));var z=n.getDerivedStateFromProps;(m=typeof z=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==p||v!==a)&&Fa(t,i,r,a),pt=!1,v=t.memoizedState,i.state=v,zl(t,r,i,l);var w=t.memoizedState;u!==p||v!==w||ze.current||pt?(typeof z=="function"&&(ai(t,n,z,r),w=t.memoizedState),(c=pt||ja(t,n,c,r,v,w,a)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,w,a),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,w,a)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),i.props=r,i.state=w,i.context=a,r=c):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return fi(e,t,n,r,o,l)}function fi(e,t,n,r,l,o){Lc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return l&&Pa(t,n,!1),at(e,t,o);r=t.stateNode,Cp.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=wn(t,e.child,null,o),t.child=wn(t,null,u,o)):fe(e,t,u,o),t.memoizedState=r.state,l&&Pa(t,n,!0),t.child}function Rc(e){var t=e.stateNode;t.pendingContext?Ca(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ca(e,t.context,!1),Gi(e,t.containerInfo)}function Ha(e,t,n,r,l){return zn(),Vi(l),t.flags|=256,fe(e,t,n,r),t.child}var pi={dehydrated:null,treeContext:null,retryLane:0};function mi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Oc(e,t,n){var r=t.pendingProps,l=$.current,o=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(l&2)!==0),u?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),U($,l&1),e===null)return ii(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Fl(i,r,0,null),e=At(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=mi(n),t.memoizedState=pi,e):nu(t,i));if(l=e.memoizedState,l!==null&&(u=l.dehydrated,u!==null))return Pp(e,t,i,r,u,l,n);if(o){o=r.fallback,i=t.mode,l=e.child,u=l.sibling;var a={mode:"hidden",children:r.children};return!(i&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=_t(l,a),r.subtreeFlags=l.subtreeFlags&14680064),u!==null?o=_t(u,o):(o=At(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?mi(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=pi,r}return o=e.child,e=o.sibling,r=_t(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function nu(e,t){return t=Fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Hr(e,t,n,r){return r!==null&&Vi(r),wn(t,e.child,null,n),e=nu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pp(e,t,n,r,l,o,i){if(n)return t.flags&256?(t.flags&=-257,r=Co(Error(h(422))),Hr(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,l=t.mode,r=Fl({mode:"visible",children:r.children},l,0,null),o=At(o,l,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&wn(t,e.child,null,i),t.child.memoizedState=mi(i),t.memoizedState=pi,o);if(!(t.mode&1))return Hr(e,t,i,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var u=r.dgst;return r=u,o=Error(h(419)),r=Co(o,r,void 0),Hr(e,t,i,r)}if(u=(i&e.childLanes)!==0,ye||u){if(r=ne,r!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|i)?0:l,l!==0&&l!==o.retryLane&&(o.retryLane=l,ut(e,l),He(r,e,l,-1))}return au(),r=Co(Error(h(421))),Hr(e,t,i,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Vp.bind(null,e),l._reactRetry=t,null):(e=o.treeContext,qe=kt(l.nextSibling),_e=t,W=!0,We=null,e!==null&&(Oe[Me++]=nt,Oe[Me++]=rt,Oe[Me++]=Vt,nt=e.id,rt=e.overflow,Vt=t),t=nu(t,r.children),t.flags|=4096,t)}function Qa(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ui(e.return,t,n)}function Po(e,t,n,r,l){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=l)}function Mc(e,t,n){var r=t.pendingProps,l=r.revealOrder,o=r.tail;if(fe(e,t,r.children,n),r=$.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qa(e,n,t);else if(e.tag===19)Qa(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(U($,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&wl(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Po(t,!1,l,n,o);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&wl(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Po(t,!0,n,null,o);break;case"together":Po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function el(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function at(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$t|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(h(153));if(t.child!==null){for(e=t.child,n=_t(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=_t(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tp(e,t,n){switch(t.tag){case 3:Rc(t),zn();break;case 5:ic(t);break;case 1:we(t.type)&&ml(t);break;case 4:Gi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;U(hl,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(U($,$.current&1),t.flags|=128,null):n&t.child.childLanes?Oc(e,t,n):(U($,$.current&1),e=at(e,t,n),e!==null?e.sibling:null);U($,$.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Mc(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),U($,$.current),r)break;return null;case 22:case 23:return t.lanes=0,Tc(e,t,n)}return at(e,t,n)}var Ic,vi,Dc,jc;Ic=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vi=function(){};Dc=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Ft(Je.current);var o=null;switch(n){case"input":l=jo(e,l),r=jo(e,r),o=[];break;case"select":l=Q({},l,{value:void 0}),r=Q({},r,{value:void 0}),o=[];break;case"textarea":l=Ao(e,l),r=Ao(e,r),o=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fl)}Vo(n,r);var i;n=null;for(c in l)if(!r.hasOwnProperty(c)&&l.hasOwnProperty(c)&&l[c]!=null)if(c==="style"){var u=l[c];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(bn.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var a=r[c];if(u=l?.[c],r.hasOwnProperty(c)&&a!==u&&(a!=null||u!=null))if(c==="style")if(u){for(i in u)!u.hasOwnProperty(i)||a&&a.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in a)a.hasOwnProperty(i)&&u[i]!==a[i]&&(n||(n={}),n[i]=a[i])}else n||(o||(o=[]),o.push(c,n)),n=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,u=u?u.__html:void 0,a!=null&&u!==a&&(o=o||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(bn.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&A("scroll",e),o||u===a||(o=[])):(o=o||[]).push(c,a))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};jc=function(e,t,n,r){n!==r&&(t.flags|=4)};function jn(e,t){if(!W)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ae(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lp(e,t,n){var r=t.pendingProps;switch(Bi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ae(t),null;case 1:return we(t.type)&&pl(),ae(t),null;case 3:return r=t.stateNode,kn(),B(ze),B(ce),Xi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Wr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,We!==null&&(Si(We),We=null))),vi(e,t),ae(t),null;case 5:Ki(t);var l=Ft(dr.current);if(n=t.type,e!==null&&t.stateNode!=null)Dc(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(h(166));return ae(t),null}if(e=Ft(Je.current),Wr(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Xe]=t,r[sr]=o,e=(t.mode&1)!==0,n){case"dialog":A("cancel",r),A("close",r);break;case"iframe":case"object":case"embed":A("load",r);break;case"video":case"audio":for(l=0;l<Wn.length;l++)A(Wn[l],r);break;case"source":A("error",r);break;case"img":case"image":case"link":A("error",r),A("load",r);break;case"details":A("toggle",r);break;case"input":ea(r,o),A("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},A("invalid",r);break;case"textarea":na(r,o),A("invalid",r)}Vo(n,o),l=null;for(var i in o)if(o.hasOwnProperty(i)){var u=o[i];i==="children"?typeof u=="string"?r.textContent!==u&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,u,e),l=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(o.suppressHydrationWarning!==!0&&Vr(r.textContent,u,e),l=["children",""+u]):bn.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&A("scroll",r)}switch(n){case"input":Tr(r),ta(r,o,!0);break;case"textarea":Tr(r),ra(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=fl)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ds(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Xe]=t,e[sr]=r,Ic(e,t,!1,!1),t.stateNode=e;e:{switch(i=Wo(n,r),n){case"dialog":A("cancel",e),A("close",e),l=r;break;case"iframe":case"object":case"embed":A("load",e),l=r;break;case"video":case"audio":for(l=0;l<Wn.length;l++)A(Wn[l],e);l=r;break;case"source":A("error",e),l=r;break;case"img":case"image":case"link":A("error",e),A("load",e),l=r;break;case"details":A("toggle",e),l=r;break;case"input":ea(e,r),l=jo(e,r),A("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=Q({},r,{value:void 0}),A("invalid",e);break;case"textarea":na(e,r),l=Ao(e,r),A("invalid",e);break;default:l=r}Vo(n,l),u=l;for(o in u)if(u.hasOwnProperty(o)){var a=u[o];o==="style"?ms(e,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&fs(e,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&er(e,a):typeof a=="number"&&er(e,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(bn.hasOwnProperty(o)?a!=null&&o==="onScroll"&&A("scroll",e):a!=null&&Ei(e,o,a,i))}switch(n){case"input":Tr(e),ta(e,r,!1);break;case"textarea":Tr(e),ra(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Et(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?dn(e,!!r.multiple,o,!1):r.defaultValue!=null&&dn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=fl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ae(t),null;case 6:if(e&&t.stateNode!=null)jc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(h(166));if(n=Ft(dr.current),Ft(Je.current),Wr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Xe]=t,(o=r.nodeValue!==n)&&(e=_e,e!==null))switch(e.tag){case 3:Vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Vr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Xe]=t,t.stateNode=r}return ae(t),null;case 13:if(B($),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&qe!==null&&t.mode&1&&!(t.flags&128))tc(),zn(),t.flags|=98560,o=!1;else if(o=Wr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(h(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(h(317));o[Xe]=t}else zn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ae(t),o=!1}else We!==null&&(Si(We),We=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||$.current&1?b===0&&(b=3):au())),t.updateQueue!==null&&(t.flags|=4),ae(t),null);case 4:return kn(),vi(e,t),e===null&&ur(t.stateNode.containerInfo),ae(t),null;case 10:return Hi(t.type._context),ae(t),null;case 17:return we(t.type)&&pl(),ae(t),null;case 19:if(B($),o=t.memoizedState,o===null)return ae(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)jn(o,!1);else{if(b!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=wl(e),i!==null){for(t.flags|=128,jn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return U($,$.current&1|2),t.child}e=e.sibling}o.tail!==null&&G()>Sn&&(t.flags|=128,r=!0,jn(o,!1),t.lanes=4194304)}else{if(!r)if(e=wl(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),jn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!W)return ae(t),null}else 2*G()-o.renderingStartTime>Sn&&n!==1073741824&&(t.flags|=128,r=!0,jn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=G(),t.sibling=null,n=$.current,U($,r?n&1|2:n&1),t):(ae(t),null);case 22:case 23:return uu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Se&1073741824&&(ae(t),t.subtreeFlags&6&&(t.flags|=8192)):ae(t),null;case 24:return null;case 25:return null}throw Error(h(156,t.tag))}function Rp(e,t){switch(Bi(t),t.tag){case 1:return we(t.type)&&pl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return kn(),B(ze),B(ce),Xi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ki(t),null;case 13:if(B($),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(h(340));zn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B($),null;case 4:return kn(),null;case 10:return Hi(t.type._context),null;case 22:case 23:return uu(),null;case 24:return null;default:return null}}var Qr=!1,se=!1,Op=typeof WeakSet=="function"?WeakSet:Set,S=null;function sn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Y(e,t,r)}else n.current=null}function gi(e,t,n){try{n()}catch(r){Y(e,t,r)}}var Ya=!1;function Mp(e,t){if(bo=sl,e=Vs(),Ui(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,u=-1,a=-1,c=0,m=0,p=e,v=null;t:for(;;){for(var z;p!==n||l!==0&&p.nodeType!==3||(u=i+l),p!==o||r!==0&&p.nodeType!==3||(a=i+r),p.nodeType===3&&(i+=p.nodeValue.length),(z=p.firstChild)!==null;)v=p,p=z;for(;;){if(p===e)break t;if(v===n&&++c===l&&(u=i),v===o&&++m===r&&(a=i),(z=p.nextSibling)!==null)break;p=v,v=p.parentNode}p=z}n=u===-1||a===-1?null:{start:u,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(ei={focusedElem:e,selectionRange:n},sl=!1,S=t;S!==null;)if(t=S,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,S=e;else for(;S!==null;){t=S;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var y=w.memoizedProps,R=w.memoizedState,d=t.stateNode,s=d.getSnapshotBeforeUpdate(t.elementType===t.type?y:Be(t.type,y),R);d.__reactInternalSnapshotBeforeUpdate=s}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(h(163))}}catch(g){Y(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,S=e;break}S=t.return}return w=Ya,Ya=!1,w}function Xn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var o=l.destroy;l.destroy=void 0,o!==void 0&&gi(t,n,o)}l=l.next}while(l!==r)}}function Dl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function hi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Fc(e){var t=e.alternate;t!==null&&(e.alternate=null,Fc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Xe],delete t[sr],delete t[ri],delete t[gp],delete t[hp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Uc(e){return e.tag===5||e.tag===3||e.tag===4}function Ga(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Uc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function yi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fl));else if(r!==4&&(e=e.child,e!==null))for(yi(e,t,n),e=e.sibling;e!==null;)yi(e,t,n),e=e.sibling}function zi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(zi(e,t,n),e=e.sibling;e!==null;)zi(e,t,n),e=e.sibling}var re=null,Ve=!1;function dt(e,t,n){for(n=n.child;n!==null;)Ac(e,t,n),n=n.sibling}function Ac(e,t,n){if(Ze&&typeof Ze.onCommitFiberUnmount=="function")try{Ze.onCommitFiberUnmount(Cl,n)}catch{}switch(n.tag){case 5:se||sn(n,t);case 6:var r=re,l=Ve;re=null,dt(e,t,n),re=r,Ve=l,re!==null&&(Ve?(e=re,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):re.removeChild(n.stateNode));break;case 18:re!==null&&(Ve?(e=re,n=n.stateNode,e.nodeType===8?xo(e.parentNode,n):e.nodeType===1&&xo(e,n),lr(e)):xo(re,n.stateNode));break;case 4:r=re,l=Ve,re=n.stateNode.containerInfo,Ve=!0,dt(e,t,n),re=r,Ve=l;break;case 0:case 11:case 14:case 15:if(!se&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var o=l,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&gi(n,t,i),l=l.next}while(l!==r)}dt(e,t,n);break;case 1:if(!se&&(sn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){Y(n,t,u)}dt(e,t,n);break;case 21:dt(e,t,n);break;case 22:n.mode&1?(se=(r=se)||n.memoizedState!==null,dt(e,t,n),se=r):dt(e,t,n);break;default:dt(e,t,n)}}function Ka(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Op),t.forEach(function(r){var l=Wp.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Ae(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var o=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:re=u.stateNode,Ve=!1;break e;case 3:re=u.stateNode.containerInfo,Ve=!0;break e;case 4:re=u.stateNode.containerInfo,Ve=!0;break e}u=u.return}if(re===null)throw Error(h(160));Ac(o,i,l),re=null,Ve=!1;var a=l.alternate;a!==null&&(a.return=null),l.return=null}catch(c){Y(l,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Bc(t,e),t=t.sibling}function Bc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ae(t,e),Ge(e),r&4){try{Xn(3,e,e.return),Dl(3,e)}catch(y){Y(e,e.return,y)}try{Xn(5,e,e.return)}catch(y){Y(e,e.return,y)}}break;case 1:Ae(t,e),Ge(e),r&512&&n!==null&&sn(n,n.return);break;case 5:if(Ae(t,e),Ge(e),r&512&&n!==null&&sn(n,n.return),e.flags&32){var l=e.stateNode;try{er(l,"")}catch(y){Y(e,e.return,y)}}if(r&4&&(l=e.stateNode,l!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,u=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{u==="input"&&o.type==="radio"&&o.name!=null&&ss(l,o),Wo(u,i);var c=Wo(u,o);for(i=0;i<a.length;i+=2){var m=a[i],p=a[i+1];m==="style"?ms(l,p):m==="dangerouslySetInnerHTML"?fs(l,p):m==="children"?er(l,p):Ei(l,m,p,c)}switch(u){case"input":Fo(l,o);break;case"textarea":cs(l,o);break;case"select":var v=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!o.multiple;var z=o.value;z!=null?dn(l,!!o.multiple,z,!1):v!==!!o.multiple&&(o.defaultValue!=null?dn(l,!!o.multiple,o.defaultValue,!0):dn(l,!!o.multiple,o.multiple?[]:"",!1))}l[sr]=o}catch(y){Y(e,e.return,y)}}break;case 6:if(Ae(t,e),Ge(e),r&4){if(e.stateNode===null)throw Error(h(162));l=e.stateNode,o=e.memoizedProps;try{l.nodeValue=o}catch(y){Y(e,e.return,y)}}break;case 3:if(Ae(t,e),Ge(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{lr(t.containerInfo)}catch(y){Y(e,e.return,y)}break;case 4:Ae(t,e),Ge(e);break;case 13:Ae(t,e),Ge(e),l=e.child,l.flags&8192&&(o=l.memoizedState!==null,l.stateNode.isHidden=o,!o||l.alternate!==null&&l.alternate.memoizedState!==null||(ou=G())),r&4&&Ka(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(se=(c=se)||m,Ae(t,e),se=c):Ae(t,e),Ge(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for(S=e,m=e.child;m!==null;){for(p=S=m;S!==null;){switch(v=S,z=v.child,v.tag){case 0:case 11:case 14:case 15:Xn(4,v,v.return);break;case 1:sn(v,v.return);var w=v.stateNode;if(typeof w.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(y){Y(r,n,y)}}break;case 5:sn(v,v.return);break;case 22:if(v.memoizedState!==null){Za(p);continue}}z!==null?(z.return=v,S=z):Za(p)}m=m.sibling}e:for(m=null,p=e;;){if(p.tag===5){if(m===null){m=p;try{l=p.stateNode,c?(o=l.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(u=p.stateNode,a=p.memoizedProps.style,i=a!=null&&a.hasOwnProperty("display")?a.display:null,u.style.display=ps("display",i))}catch(y){Y(e,e.return,y)}}}else if(p.tag===6){if(m===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(y){Y(e,e.return,y)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;m===p&&(m=null),p=p.return}m===p&&(m=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Ae(t,e),Ge(e),r&4&&Ka(e);break;case 21:break;default:Ae(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Uc(n)){var r=n;break e}n=n.return}throw Error(h(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(er(l,""),r.flags&=-33);var o=Ga(e);zi(e,o,l);break;case 3:case 4:var i=r.stateNode.containerInfo,u=Ga(e);yi(e,u,i);break;default:throw Error(h(161))}}catch(a){Y(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ip(e,t,n){S=e,Vc(e,t,n)}function Vc(e,t,n){for(var r=(e.mode&1)!==0;S!==null;){var l=S,o=l.child;if(l.tag===22&&r){var i=l.memoizedState!==null||Qr;if(!i){var u=l.alternate,a=u!==null&&u.memoizedState!==null||se;u=Qr;var c=se;if(Qr=i,(se=a)&&!c)for(S=l;S!==null;)i=S,a=i.child,i.tag===22&&i.memoizedState!==null?Ja(l):a!==null?(a.return=i,S=a):Ja(l);for(;o!==null;)S=o,Vc(o,t,n),o=o.sibling;S=l,Qr=u,se=c}Xa(e,t,n)}else l.subtreeFlags&8772&&o!==null?(o.return=l,S=o):Xa(e,t,n)}}function Xa(e){for(;S!==null;){var t=S;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:se||Dl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!se)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Be(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ma(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ma(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var p=m.dehydrated;p!==null&&lr(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(h(163))}se||t.flags&512&&hi(t)}catch(v){Y(t,t.return,v)}}if(t===e){S=null;break}if(n=t.sibling,n!==null){n.return=t.return,S=n;break}S=t.return}}function Za(e){for(;S!==null;){var t=S;if(t===e){S=null;break}var n=t.sibling;if(n!==null){n.return=t.return,S=n;break}S=t.return}}function Ja(e){for(;S!==null;){var t=S;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Dl(4,t)}catch(a){Y(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(a){Y(t,l,a)}}var o=t.return;try{hi(t)}catch(a){Y(t,o,a)}break;case 5:var i=t.return;try{hi(t)}catch(a){Y(t,i,a)}}}catch(a){Y(t,t.return,a)}if(t===e){S=null;break}var u=t.sibling;if(u!==null){u.return=t.return,S=u;break}S=t.return}}var Dp=Math.ceil,Sl=st.ReactCurrentDispatcher,ru=st.ReactCurrentOwner,De=st.ReactCurrentBatchConfig,L=0,ne=null,K=null,le=0,Se=0,cn=Pt(0),b=0,vr=null,$t=0,jl=0,lu=0,Zn=null,he=null,ou=0,Sn=1/0,et=null,ql=!1,wi=null,St=null,Yr=!1,ht=null,_l=0,Jn=0,ki=null,tl=-1,nl=0;function pe(){return L&6?G():tl!==-1?tl:tl=G()}function qt(e){return e.mode&1?L&2&&le!==0?le&-le:zp.transition!==null?(nl===0&&(nl=Es()),nl):(e=O,e!==0||(e=window.event,e=e===void 0?16:Os(e.type)),e):1}function He(e,t,n,r){if(50<Jn)throw Jn=0,ki=null,Error(h(185));gr(e,n,r),(!(L&2)||e!==ne)&&(e===ne&&(!(L&2)&&(jl|=n),b===4&&vt(e,le)),ke(e,r),n===1&&L===0&&!(t.mode&1)&&(Sn=G()+500,Ol&&Tt()))}function ke(e,t){var n=e.callbackNode;kf(e,t);var r=al(e,e===ne?le:0);if(r===0)n!==null&&ia(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ia(n),t===1)e.tag===0?yp(ba.bind(null,e)):Js(ba.bind(null,e)),mp(function(){!(L&6)&&Tt()}),n=null;else{switch(Ns(r)){case 1:n=Li;break;case 4:n=qs;break;case 16:n=ul;break;case 536870912:n=_s;break;default:n=ul}n=Xc(n,Wc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Wc(e,t){if(tl=-1,nl=0,L&6)throw Error(h(327));var n=e.callbackNode;if(gn()&&e.callbackNode!==n)return null;var r=al(e,e===ne?le:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=El(e,r);else{t=r;var l=L;L|=2;var o=Hc();(ne!==e||le!==t)&&(et=null,Sn=G()+500,Ut(e,t));do try{Up();break}catch(u){$c(e,u)}while(!0);$i(),Sl.current=o,L=l,K!==null?t=0:(ne=null,le=0,t=b)}if(t!==0){if(t===2&&(l=Go(e),l!==0&&(r=l,t=xi(e,l))),t===1)throw n=vr,Ut(e,0),vt(e,r),ke(e,G()),n;if(t===6)vt(e,r);else{if(l=e.current.alternate,!(r&30)&&!jp(l)&&(t=El(e,r),t===2&&(o=Go(e),o!==0&&(r=o,t=xi(e,o))),t===1))throw n=vr,Ut(e,0),vt(e,r),ke(e,G()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(h(345));case 2:It(e,he,et);break;case 3:if(vt(e,r),(r&130023424)===r&&(t=ou+500-G(),10<t)){if(al(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){pe(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=ni(It.bind(null,e,he,et),t);break}It(e,he,et);break;case 4:if(vt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var i=31-$e(r);o=1<<i,i=t[i],i>l&&(l=i),r&=~o}if(r=l,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dp(r/1960))-r,10<r){e.timeoutHandle=ni(It.bind(null,e,he,et),r);break}It(e,he,et);break;case 5:It(e,he,et);break;default:throw Error(h(329))}}}return ke(e,G()),e.callbackNode===n?Wc.bind(null,e):null}function xi(e,t){var n=Zn;return e.current.memoizedState.isDehydrated&&(Ut(e,t).flags|=256),e=El(e,t),e!==2&&(t=he,he=n,t!==null&&Si(t)),e}function Si(e){he===null?he=e:he.push.apply(he,e)}function jp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],o=l.getSnapshot;l=l.value;try{if(!Qe(o(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vt(e,t){for(t&=~lu,t&=~jl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-$e(t),r=1<<n;e[n]=-1,t&=~r}}function ba(e){if(L&6)throw Error(h(327));gn();var t=al(e,0);if(!(t&1))return ke(e,G()),null;var n=El(e,t);if(e.tag!==0&&n===2){var r=Go(e);r!==0&&(t=r,n=xi(e,r))}if(n===1)throw n=vr,Ut(e,0),vt(e,t),ke(e,G()),n;if(n===6)throw Error(h(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,It(e,he,et),ke(e,G()),null}function iu(e,t){var n=L;L|=1;try{return e(t)}finally{L=n,L===0&&(Sn=G()+500,Ol&&Tt())}}function Ht(e){ht!==null&&ht.tag===0&&!(L&6)&&gn();var t=L;L|=1;var n=De.transition,r=O;try{if(De.transition=null,O=1,e)return e()}finally{O=r,De.transition=n,L=t,!(L&6)&&Tt()}}function uu(){Se=cn.current,B(cn)}function Ut(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,pp(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Bi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pl();break;case 3:kn(),B(ze),B(ce),Xi();break;case 5:Ki(r);break;case 4:kn();break;case 13:B($);break;case 19:B($);break;case 10:Hi(r.type._context);break;case 22:case 23:uu()}n=n.return}if(ne=e,K=e=_t(e.current,null),le=Se=t,b=0,vr=null,lu=jl=$t=0,he=Zn=null,jt!==null){for(t=0;t<jt.length;t++)if(n=jt[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=l,r.next=i}n.pending=r}jt=null}return e}function $c(e,t){do{var n=K;try{if($i(),Jr.current=xl,kl){for(var r=H.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}kl=!1}if(Wt=0,te=J=H=null,Kn=!1,fr=0,ru.current=null,n===null||n.return===null){b=1,vr=t,K=null;break}e:{var o=e,i=n.return,u=n,a=t;if(t=le,u.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,m=u,p=m.tag;if(!(m.mode&1)&&(p===0||p===11||p===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var z=Aa(i);if(z!==null){z.flags&=-257,Ba(z,i,u,o,t),z.mode&1&&Ua(o,c,t),t=z,a=c;var w=t.updateQueue;if(w===null){var y=new Set;y.add(a),t.updateQueue=y}else w.add(a);break e}else{if(!(t&1)){Ua(o,c,t),au();break e}a=Error(h(426))}}else if(W&&u.mode&1){var R=Aa(i);if(R!==null){!(R.flags&65536)&&(R.flags|=256),Ba(R,i,u,o,t),Vi(xn(a,u));break e}}o=a=xn(a,u),b!==4&&(b=2),Zn===null?Zn=[o]:Zn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Nc(o,a,t);Oa(o,d);break e;case 1:u=a;var s=o.type,f=o.stateNode;if(!(o.flags&128)&&(typeof s.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(St===null||!St.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var g=Cc(o,u,t);Oa(o,g);break e}}o=o.return}while(o!==null)}Yc(n)}catch(x){t=x,K===n&&n!==null&&(K=n=n.return);continue}break}while(!0)}function Hc(){var e=Sl.current;return Sl.current=xl,e===null?xl:e}function au(){(b===0||b===3||b===2)&&(b=4),ne===null||!($t&268435455)&&!(jl&268435455)||vt(ne,le)}function El(e,t){var n=L;L|=2;var r=Hc();(ne!==e||le!==t)&&(et=null,Ut(e,t));do try{Fp();break}catch(l){$c(e,l)}while(!0);if($i(),L=n,Sl.current=r,K!==null)throw Error(h(261));return ne=null,le=0,b}function Fp(){for(;K!==null;)Qc(K)}function Up(){for(;K!==null&&!ff();)Qc(K)}function Qc(e){var t=Kc(e.alternate,e,Se);e.memoizedProps=e.pendingProps,t===null?Yc(e):K=t,ru.current=null}function Yc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Rp(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{b=6,K=null;return}}else if(n=Lp(n,t,Se),n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);b===0&&(b=5)}function It(e,t,n){var r=O,l=De.transition;try{De.transition=null,O=1,Ap(e,t,n,r)}finally{De.transition=l,O=r}return null}function Ap(e,t,n,r){do gn();while(ht!==null);if(L&6)throw Error(h(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(h(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(xf(e,o),e===ne&&(K=ne=null,le=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Yr||(Yr=!0,Xc(ul,function(){return gn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=De.transition,De.transition=null;var i=O;O=1;var u=L;L|=4,ru.current=null,Mp(e,n),Bc(n,e),ap(ei),sl=!!bo,ei=bo=null,e.current=n,Ip(n,e,l),pf(),L=u,O=i,De.transition=o}else e.current=n;if(Yr&&(Yr=!1,ht=e,_l=l),o=e.pendingLanes,o===0&&(St=null),gf(n.stateNode,r),ke(e,G()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(ql)throw ql=!1,e=wi,wi=null,e;return _l&1&&e.tag!==0&&gn(),o=e.pendingLanes,o&1?e===ki?Jn++:(Jn=0,ki=e):Jn=0,Tt(),null}function gn(){if(ht!==null){var e=Ns(_l),t=De.transition,n=O;try{if(De.transition=null,O=16>e?16:e,ht===null)var r=!1;else{if(e=ht,ht=null,_l=0,L&6)throw Error(h(331));var l=L;for(L|=4,S=e.current;S!==null;){var o=S,i=o.child;if(S.flags&16){var u=o.deletions;if(u!==null){for(var a=0;a<u.length;a++){var c=u[a];for(S=c;S!==null;){var m=S;switch(m.tag){case 0:case 11:case 15:Xn(8,m,o)}var p=m.child;if(p!==null)p.return=m,S=p;else for(;S!==null;){m=S;var v=m.sibling,z=m.return;if(Fc(m),m===c){S=null;break}if(v!==null){v.return=z,S=v;break}S=z}}}var w=o.alternate;if(w!==null){var y=w.child;if(y!==null){w.child=null;do{var R=y.sibling;y.sibling=null,y=R}while(y!==null)}}S=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,S=i;else e:for(;S!==null;){if(o=S,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Xn(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,S=d;break e}S=o.return}}var s=e.current;for(S=s;S!==null;){i=S;var f=i.child;if(i.subtreeFlags&2064&&f!==null)f.return=i,S=f;else e:for(i=s;S!==null;){if(u=S,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Dl(9,u)}}catch(x){Y(u,u.return,x)}if(u===i){S=null;break e}var g=u.sibling;if(g!==null){g.return=u.return,S=g;break e}S=u.return}}if(L=l,Tt(),Ze&&typeof Ze.onPostCommitFiberRoot=="function")try{Ze.onPostCommitFiberRoot(Cl,e)}catch{}r=!0}return r}finally{O=n,De.transition=t}}return!1}function es(e,t,n){t=xn(n,t),t=Nc(e,t,1),e=xt(e,t,1),t=pe(),e!==null&&(gr(e,1,t),ke(e,t))}function Y(e,t,n){if(e.tag===3)es(e,e,n);else for(;t!==null;){if(t.tag===3){es(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(St===null||!St.has(r))){e=xn(n,e),e=Cc(t,e,1),t=xt(t,e,1),e=pe(),t!==null&&(gr(t,1,e),ke(t,e));break}}t=t.return}}function Bp(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=pe(),e.pingedLanes|=e.suspendedLanes&n,ne===e&&(le&n)===n&&(b===4||b===3&&(le&130023424)===le&&500>G()-ou?Ut(e,0):lu|=n),ke(e,t)}function Gc(e,t){t===0&&(e.mode&1?(t=Or,Or<<=1,!(Or&130023424)&&(Or=4194304)):t=1);var n=pe();e=ut(e,t),e!==null&&(gr(e,t,n),ke(e,n))}function Vp(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Gc(e,n)}function Wp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(h(314))}r!==null&&r.delete(t),Gc(e,n)}var Kc;Kc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ze.current)ye=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ye=!1,Tp(e,t,n);ye=!!(e.flags&131072)}else ye=!1,W&&t.flags&1048576&&bs(t,gl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;el(e,t),e=t.pendingProps;var l=yn(t,ce.current);vn(t,n),l=Ji(null,t,r,e,l,n);var o=bi();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,we(r)?(o=!0,ml(t)):o=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Yi(t),l.updater=Il,t.stateNode=l,l._reactInternals=t,si(t,r,e,n),t=fi(null,t,r,!0,o,n)):(t.tag=0,W&&o&&Ai(t),fe(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(el(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Hp(r),e=Be(r,e),l){case 0:t=di(null,t,r,e,n);break e;case 1:t=$a(null,t,r,e,n);break e;case 11:t=Va(null,t,r,e,n);break e;case 14:t=Wa(null,t,r,Be(r.type,e),n);break e}throw Error(h(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),di(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),$a(e,t,r,l,n);case 3:e:{if(Rc(t),e===null)throw Error(h(387));r=t.pendingProps,o=t.memoizedState,l=o.element,oc(e,t),zl(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){l=xn(Error(h(423)),t),t=Ha(e,t,r,n,l);break e}else if(r!==l){l=xn(Error(h(424)),t),t=Ha(e,t,r,n,l);break e}else for(qe=kt(t.stateNode.containerInfo.firstChild),_e=t,W=!0,We=null,n=rc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zn(),r===l){t=at(e,t,n);break e}fe(e,t,r,n)}t=t.child}return t;case 5:return ic(t),e===null&&ii(t),r=t.type,l=t.pendingProps,o=e!==null?e.memoizedProps:null,i=l.children,ti(r,l)?i=null:o!==null&&ti(r,o)&&(t.flags|=32),Lc(e,t),fe(e,t,i,n),t.child;case 6:return e===null&&ii(t),null;case 13:return Oc(e,t,n);case 4:return Gi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=wn(t,null,r,n):fe(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),Va(e,t,r,l,n);case 7:return fe(e,t,t.pendingProps,n),t.child;case 8:return fe(e,t,t.pendingProps.children,n),t.child;case 12:return fe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,o=t.memoizedProps,i=l.value,U(hl,r._currentValue),r._currentValue=i,o!==null)if(Qe(o.value,i)){if(o.children===l.children&&!ze.current){t=at(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var u=o.dependencies;if(u!==null){i=o.child;for(var a=u.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=lt(-1,n&-n),a.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?a.next=a:(a.next=m.next,m.next=a),c.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),ui(o.return,n,t),u.lanes|=n;break}a=a.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(h(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),ui(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}fe(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,vn(t,n),l=je(l),r=r(l),t.flags|=1,fe(e,t,r,n),t.child;case 14:return r=t.type,l=Be(r,t.pendingProps),l=Be(r.type,l),Wa(e,t,r,l,n);case 15:return Pc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Be(r,l),el(e,t),t.tag=1,we(r)?(e=!0,ml(t)):e=!1,vn(t,n),Ec(t,r,l),si(t,r,l,n),fi(null,t,r,!0,e,n);case 19:return Mc(e,t,n);case 22:return Tc(e,t,n)}throw Error(h(156,t.tag))};function Xc(e,t){return Ss(e,t)}function $p(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ie(e,t,n,r){return new $p(e,t,n,r)}function su(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hp(e){if(typeof e=="function")return su(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ci)return 11;if(e===Pi)return 14}return 2}function _t(e,t){var n=e.alternate;return n===null?(n=Ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function rl(e,t,n,r,l,o){var i=2;if(r=e,typeof e=="function")su(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case bt:return At(n.children,l,o,t);case Ni:i=8,l|=8;break;case Oo:return e=Ie(12,n,t,l|2),e.elementType=Oo,e.lanes=o,e;case Mo:return e=Ie(13,n,t,l),e.elementType=Mo,e.lanes=o,e;case Io:return e=Ie(19,n,t,l),e.elementType=Io,e.lanes=o,e;case is:return Fl(n,l,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ls:i=10;break e;case os:i=9;break e;case Ci:i=11;break e;case Pi:i=14;break e;case ft:i=16,r=null;break e}throw Error(h(130,e==null?e:typeof e,""))}return t=Ie(i,n,t,l),t.elementType=e,t.type=r,t.lanes=o,t}function At(e,t,n,r){return e=Ie(7,e,r,t),e.lanes=n,e}function Fl(e,t,n,r){return e=Ie(22,e,r,t),e.elementType=is,e.lanes=n,e.stateNode={isHidden:!1},e}function To(e,t,n){return e=Ie(6,e,null,t),e.lanes=n,e}function Lo(e,t,n){return t=Ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Qp(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mo(0),this.expirationTimes=mo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mo(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function cu(e,t,n,r,l,o,i,u,a){return e=new Qp(e,t,n,u,a),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ie(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yi(o),e}function Yp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Zc(e){if(!e)return Nt;e=e._reactInternals;e:{if(Yt(e)!==e||e.tag!==1)throw Error(h(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(we(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(h(171))}if(e.tag===1){var n=e.type;if(we(n))return Zs(e,n,t)}return t}function Jc(e,t,n,r,l,o,i,u,a){return e=cu(n,r,!0,e,l,o,i,u,a),e.context=Zc(null),n=e.current,r=pe(),l=qt(n),o=lt(r,l),o.callback=t??null,xt(n,o,l),e.current.lanes=l,gr(e,l,r),ke(e,r),e}function Ul(e,t,n,r){var l=t.current,o=pe(),i=qt(l);return n=Zc(n),t.context===null?t.context=n:t.pendingContext=n,t=lt(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=xt(l,t,i),e!==null&&(He(e,l,i,o),Zr(e,l,i)),i}function Nl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ts(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function du(e,t){ts(e,t),(e=e.alternate)&&ts(e,t)}function Gp(){return null}var bc=typeof reportError=="function"?reportError:function(e){console.error(e)};function fu(e){this._internalRoot=e}Al.prototype.render=fu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(h(409));Ul(e,t,null,null)};Al.prototype.unmount=fu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Ul(null,e,null,null)}),t[it]=null}};function Al(e){this._internalRoot=e}Al.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ts();e={blockedOn:null,target:e,priority:t};for(var n=0;n<mt.length&&t!==0&&t<mt[n].priority;n++);mt.splice(n,0,e),n===0&&Rs(e)}};function pu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ns(){}function Kp(e,t,n,r,l){if(l){if(typeof r=="function"){var o=r;r=function(){var c=Nl(i);o.call(c)}}var i=Jc(t,r,e,0,null,!1,!1,"",ns);return e._reactRootContainer=i,e[it]=i.current,ur(e.nodeType===8?e.parentNode:e),Ht(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var u=r;r=function(){var c=Nl(a);u.call(c)}}var a=cu(e,0,!1,null,null,!1,!1,"",ns);return e._reactRootContainer=a,e[it]=a.current,ur(e.nodeType===8?e.parentNode:e),Ht(function(){Ul(t,a,n,r)}),a}function Vl(e,t,n,r,l){var o=n._reactRootContainer;if(o){var i=o;if(typeof l=="function"){var u=l;l=function(){var a=Nl(i);u.call(a)}}Ul(t,i,e,l)}else i=Kp(n,t,e,l,r);return Nl(i)}Cs=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vn(t.pendingLanes);n!==0&&(Ri(t,n|1),ke(t,G()),!(L&6)&&(Sn=G()+500,Tt()))}break;case 13:Ht(function(){var r=ut(e,1);if(r!==null){var l=pe();He(r,e,1,l)}}),du(e,1)}};Oi=function(e){if(e.tag===13){var t=ut(e,134217728);if(t!==null){var n=pe();He(t,e,134217728,n)}du(e,134217728)}};Ps=function(e){if(e.tag===13){var t=qt(e),n=ut(e,t);if(n!==null){var r=pe();He(n,e,t,r)}du(e,t)}};Ts=function(){return O};Ls=function(e,t){var n=O;try{return O=e,t()}finally{O=n}};Ho=function(e,t,n){switch(t){case"input":if(Fo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=Rl(r);if(!l)throw Error(h(90));as(r),Fo(r,l)}}}break;case"textarea":cs(e,n);break;case"select":t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}};hs=iu;ys=Ht;var Xp={usingClientEntryPoint:!1,Events:[yr,rn,Rl,vs,gs,iu]},Fn={findFiberByHostInstance:Dt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zp={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:st.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ks(e),e===null?null:e.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||Gp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Un=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Un.isDisabled&&Un.supportsFiber))try{Cl=Un.inject(Zp),Ze=Un}catch{}var Un;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xp;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!pu(t))throw Error(h(200));return Yp(e,t,null,n)};Ce.createRoot=function(e,t){if(!pu(e))throw Error(h(299));var n=!1,r="",l=bc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=cu(e,1,!1,null,null,n,!1,r,l),e[it]=t.current,ur(e.nodeType===8?e.parentNode:e),new fu(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(h(188)):(e=Object.keys(e).join(","),Error(h(268,e)));return e=ks(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return Ht(e)};Ce.hydrate=function(e,t,n){if(!Bl(t))throw Error(h(200));return Vl(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!pu(e))throw Error(h(405));var r=n!=null&&n.hydratedSources||null,l=!1,o="",i=bc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Jc(t,null,e,1,n??null,l,!1,o,i),e[it]=t.current,ur(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new Al(t)};Ce.render=function(e,t,n){if(!Bl(t))throw Error(h(200));return Vl(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Bl(e))throw Error(h(40));return e._reactRootContainer?(Ht(function(){Vl(null,null,e,!1,function(){e._reactRootContainer=null,e[it]=null})}),!0):!1};Ce.unstable_batchedUpdates=iu;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Bl(n))throw Error(h(200));if(e==null||e._reactInternals===void 0)throw Error(h(38));return Vl(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426"});var rd=be((hm,nd)=>{"use strict";function td(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(td)}catch(e){console.error(e)}}td(),nd.exports=ed()});var od=be(mu=>{"use strict";var ld=rd();mu.createRoot=ld.createRoot,mu.hydrateRoot=ld.hydrateRoot;var ym});var ad=be($l=>{"use strict";var em=Le(),tm=Symbol.for("react.element"),nm=Symbol.for("react.fragment"),rm=Object.prototype.hasOwnProperty,lm=em.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,om={key:!0,ref:!0,__self:!0,__source:!0};function ud(e,t,n){var r,l={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)rm.call(t,r)&&!om.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:tm,type:e,key:o,ref:i,props:l,_owner:lm.current}}$l.Fragment=nm;$l.jsx=ud;$l.jsxs=ud});var ee=be((xm,sd)=>{"use strict";sd.exports=ad()});var sv=D(Le(),1),xu=D(od(),1);var V=D(Le(),1);function Gt(e,t){return e?e.callWS(t):Promise.reject(new Error("Not connected to Home Assistant"))}function id(e,t,n){return e?e.connection.subscribeMessage(n,t):Promise.reject(new Error("Not connected to Home Assistant"))}var Jp="/api/quizify/player_ws";function bp(){return`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}${Jp}`}var Wl=class{constructor({onEvent:t,onStatus:n}){this._onEvent=t||(()=>{}),this._onStatus=n||(()=>{}),this._ws=null,this._closedByUser=!1,this._backoff=500,this._maxBackoff=1e4,this._pingTimer=null,this._reconnectTimer=null,this._resume=null}setResume(t){this._resume=t}connect(){this._closedByUser=!1,this._open()}_open(){this._onStatus("connecting");let t;try{t=new WebSocket(bp())}catch{this._scheduleReconnect();return}this._ws=t,t.addEventListener("open",()=>{this._backoff=500,this._onStatus("open"),this._resume&&this._send({type:"resume",...this._resume}),this._startPing()}),t.addEventListener("message",n=>{let r;try{r=JSON.parse(n.data)}catch{return}r?.event!=="pong"&&this._onEvent(r)}),t.addEventListener("close",()=>{this._stopPing(),this._ws=null,this._onStatus("closed"),this._closedByUser||this._scheduleReconnect()}),t.addEventListener("error",()=>{})}_scheduleReconnect(){this._closedByUser||(clearTimeout(this._reconnectTimer),this._reconnectTimer=setTimeout(()=>this._open(),this._backoff),this._backoff=Math.min(this._maxBackoff,this._backoff*2))}_startPing(){this._stopPing(),this._pingTimer=setInterval(()=>{this._send({type:"ping"})},25e3)}_stopPing(){this._pingTimer&&(clearInterval(this._pingTimer),this._pingTimer=null)}send(t){return this._send(t)}_send(t){let n=this._ws;if(!n||n.readyState!==WebSocket.OPEN)return!1;try{return n.send(JSON.stringify(t)),!0}catch{return!1}}close(){if(this._closedByUser=!0,clearTimeout(this._reconnectTimer),this._stopPing(),this._ws){try{this._ws.close()}catch{}this._ws=null}}};var Sm=D(Le(),1),Lt=D(ee(),1);function xe({connected:e,subtitle:t}){return(0,Lt.jsxs)("div",{className:"qz-header",children:[(0,Lt.jsxs)("div",{children:[(0,Lt.jsx)("div",{className:"qz-brand",children:"Quizify"}),t&&(0,Lt.jsx)("div",{className:"qz-label",style:{marginTop:4},children:t})]}),(0,Lt.jsxs)("div",{className:"qz-header-status",children:[(0,Lt.jsx)("span",{className:`qz-status-dot ${e?"":"qz-status-off"}`}),e?"Connected":"Offline"]})]})}var Nm=D(Le(),1);var cd=["A","B","C","D","E","F"],vu={adults:"Adults",kids:"Kids"},dd={adults:"Trickier questions, broader topics",kids:"Age-appropriate, simpler wording"},gu={general_knowledge:"General Knowledge",science:"Science",geography:"Geography",history:"History",sport:"Sport",food_and_drink:"Food & Drink",literature:"Literature",language:"Language & Words",art:"Art & Architecture",technology:"Technology & Inventions",mythology:"Mythology & Religion",animals:"Animals & Nature",random:"Random Mix"},fd={general_knowledge:"\u{1F9E0}",science:"\u{1F52C}",geography:"\u{1F30D}",history:"\u{1F3DB}\uFE0F",sport:"\u26BD",food_and_drink:"\u{1F377}",literature:"\u{1F4DA}",language:"\u{1F4AC}",art:"\u{1F3A8}",technology:"\u{1F4BB}",mythology:"\u26A1",animals:"\u{1F981}",random:"\u{1F3B2}"},hu={easy:"Easy",medium:"Medium",hard:"Hard",mixed:"Mixed"};function pd(e){return(e||"?").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0].toUpperCase()).join("")}function md(e){return`${window.location.origin}/quizify/join/${e}`}function vd(e){return`/api/quizify/qr?data=${encodeURIComponent(e)}`}function Hl(){return Date.now()/1e3}var M=D(ee(),1);function gd({value:e,onChange:t}){return(0,M.jsxs)("div",{className:"qz-stack",children:[(0,M.jsx)("div",{className:"qz-label",children:"Mode"}),(0,M.jsx)("div",{className:"qz-mode-tiles",children:Object.keys(vu).map(n=>(0,M.jsxs)("button",{type:"button",className:`qz-mode-tile ${e===n?"qz-active":""}`,onClick:()=>t(n),children:[(0,M.jsx)("div",{className:"qz-mode-tile-emoji",children:n==="adults"?"\u{1F9E0}":"\u{1F388}"}),(0,M.jsx)("div",{className:"qz-mode-tile-title",children:vu[n]}),(0,M.jsx)("div",{className:"qz-mode-tile-desc",children:dd[n]})]},n))})]})}function hd({value:e,onChange:t,available:n}){let r=[{id:"random",count:n.reduce((l,o)=>l+o.count,0)},...n];return(0,M.jsxs)("div",{className:"qz-stack",children:[(0,M.jsx)("div",{className:"qz-label",children:"Category"}),(0,M.jsx)("div",{className:"qz-category-grid",children:r.map(l=>(0,M.jsxs)("button",{type:"button",className:`qz-category-tile ${e===l.id?"qz-active":""}`,onClick:()=>t(l.id),disabled:l.count===0,title:gu[l.id]||l.id,children:[(0,M.jsx)("div",{className:"qz-category-tile-emoji",children:fd[l.id]||"\u2753"}),(0,M.jsx)("div",{className:"qz-category-tile-title",children:gu[l.id]||l.id}),(0,M.jsxs)("div",{className:"qz-category-tile-count",children:[l.count," Qs"]})]},l.id))})]})}function yd({value:e,onChange:t}){return(0,M.jsxs)("div",{className:"qz-stack",children:[(0,M.jsx)("div",{className:"qz-label",children:"Difficulty"}),(0,M.jsx)("div",{className:"qz-pill-row",children:Object.keys(hu).map(n=>(0,M.jsx)("button",{type:"button",className:`qz-pill ${e===n?"qz-active":""}`,onClick:()=>t(n),children:hu[n]},n))})]})}function yu({label:e,value:t,onChange:n,options:r}){return(0,M.jsxs)("div",{className:"qz-stack",children:[(0,M.jsx)("div",{className:"qz-label",children:e}),(0,M.jsx)("div",{className:"qz-pill-row",children:r.map(l=>(0,M.jsx)("button",{type:"button",className:`qz-pill ${t===l?"qz-active":""}`,onClick:()=>n(l),children:l},l))})]})}function zd({speakers:e,value:t,onChange:n}){return(0,M.jsxs)("div",{className:"qz-stack",children:[(0,M.jsx)("div",{className:"qz-label",children:"Background music (optional)"}),(0,M.jsxs)("select",{className:"qz-select",value:t||"",onChange:r=>n(r.target.value||null),children:[(0,M.jsx)("option",{value:"",children:"No music"}),e.map(r=>(0,M.jsxs)("option",{value:r.entity_id,children:[r.name," ",r.supports_mass?"\xB7 Music Assistant":""]},r.entity_id))]})]})}var Lm=D(Le(),1);var Rt=D(ee(),1);function wd({joinCode:e}){let t=md(e);return(0,Rt.jsxs)("div",{className:"qz-qr-card",children:[(0,Rt.jsx)("div",{className:"qz-label",children:"Scan to join"}),(0,Rt.jsx)("div",{className:"qz-qr-frame",children:(0,Rt.jsx)("img",{src:vd(t),alt:`QR code for ${t}`})}),(0,Rt.jsx)("div",{className:"qz-join-code",children:e}),(0,Rt.jsx)("div",{className:"qz-join-url",children:t})]})}var Im=D(Le(),1);var ve=D(ee(),1);function kd({players:e,highlightId:t}){return!e||e.length===0?(0,ve.jsx)("div",{className:"qz-empty",children:"Waiting for players to join\u2026"}):(0,ve.jsx)("div",{className:"qz-player-list",children:e.map(n=>{let r=`qz-player-row${n.player_id===t?" qz-highlight":""}`;return(0,ve.jsxs)("div",{className:r,children:[(0,ve.jsx)("div",{className:"qz-player-avatar",children:pd(n.name)}),(0,ve.jsx)("div",{className:"qz-player-name",children:n.name}),(0,ve.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}function En({players:e,highlightId:t}){return!e||e.length===0?null:(0,ve.jsx)("div",{className:"qz-scoreboard-list",children:e.map((n,r)=>{let l=["qz-scoreboard-row"];return r<3&&l.push("qz-top"),n.player_id===t&&l.push("qz-highlight"),(0,ve.jsxs)("div",{className:l.join(" "),children:[(0,ve.jsx)("div",{className:`qz-rank qz-rank-${r+1}`,children:r+1}),(0,ve.jsxs)("div",{children:[(0,ve.jsx)("strong",{children:n.name}),n.streak>=3&&(0,ve.jsxs)("span",{className:"qz-streak-badge",children:["\u{1F525} ",n.streak]})]}),(0,ve.jsx)("div",{className:"qz-player-score",children:n.score.toLocaleString()})]},n.player_id)})})}var Ql=D(Le(),1);var Pe=D(ee(),1);function Yl({question:e,index:t,total:n,deadline:r,selected:l,correct:o,onAnswer:i,reveal:u}){let[a,c]=(0,Ql.useState)(()=>Math.max(0,(r||0)-Hl()));(0,Ql.useEffect)(()=>{if(!r)return;let z=()=>{c(Math.max(0,r-Hl()))};z();let w=setInterval(z,250);return()=>clearInterval(w)},[r]);let m=Math.max(1,(r||0)-(e?.startedAt||Hl())),p=r?Math.max(0,Math.min(100,a/m*100)):100,v=a<5&&!u;return(0,Pe.jsxs)("div",{className:"qz-question-stage",children:[(0,Pe.jsxs)("div",{className:"qz-progress",children:[(0,Pe.jsxs)("div",{className:"qz-label",children:["Q",t+1," / ",n]}),(0,Pe.jsx)("div",{className:"qz-progress-bar",children:(0,Pe.jsx)("div",{className:"qz-progress-fill",style:{width:`${p}%`}})}),(0,Pe.jsxs)("div",{className:`qz-timer ${v?"qz-timer-low":""}`,children:[Math.ceil(a),"s"]})]}),(0,Pe.jsx)("div",{className:"qz-question-text",children:e.question}),(0,Pe.jsx)("div",{className:"qz-answers",children:e.answers.map((z,w)=>{let y=l===w,R=u&&o===w,d=u&&y&&o!==w,s="qz-answer";return y&&!u&&(s+=" qz-selected"),R&&(s+=" qz-correct"),d&&(s+=" qz-wrong"),(0,Pe.jsxs)("button",{type:"button",className:s,onClick:()=>!u&&i&&i(w),disabled:u||l!==null||!i,"aria-pressed":y,children:[(0,Pe.jsx)("div",{className:"qz-answer-letter","aria-hidden":"true",children:cd[w]}),(0,Pe.jsx)("div",{children:z})]},w)})})]})}var Vm=D(Le(),1);var Te=D(ee(),1);function Gl({players:e,onRematch:t,onEnd:n,highlightId:r}){let l=e?.[0];return(0,Te.jsxs)("div",{children:[(0,Te.jsxs)("div",{className:"qz-finale",children:[(0,Te.jsx)("div",{className:"qz-trophy",children:"\u{1F3C6}"}),(0,Te.jsx)("h1",{className:"qz-winner-name",children:l?.name||"\u2014"}),(0,Te.jsxs)("div",{className:"qz-winner-score",children:[(l?.score||0).toLocaleString()," points"]}),(0,Te.jsxs)("div",{className:"qz-row-wrap",style:{justifyContent:"center"},children:[t&&(0,Te.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:t,children:"Rematch"}),n&&(0,Te.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:n,children:"End Game"})]})]}),(0,Te.jsxs)("div",{className:"qz-card",children:[(0,Te.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Final standings"}),(0,Te.jsx)(En,{players:e,highlightId:r})]})]})}var C=D(ee(),1),im={mode:"adults",category:"random",difficulty:"mixed",questions_per_round:10,question_time:20,music_player:null,music_uri:""};function xd({hass:e}){let[t,n]=(0,V.useState)(!1),[r,l]=(0,V.useState)(null),[o,i]=(0,V.useState)([]),[u,a]=(0,V.useState)(im),[c,m]=(0,V.useState)(null),[p,v]=(0,V.useState)(null),[z,w]=(0,V.useState)(null),y=(0,V.useRef)(null),R=(0,V.useRef)(!1);(0,V.useEffect)(()=>{n(!!e?.connected)},[e?.connected]),(0,V.useEffect)(()=>{if(!e)return;let E=!1;return(async()=>{try{let k=await Gt(e,{type:"quizify/categories/list"});E||l(k||{adults:[],kids:[]})}catch(k){E||(w(k?.message||"Could not load categories"),l({adults:[],kids:[]}))}try{let k=await Gt(e,{type:"quizify/speakers/list"});E||i(k?.speakers||[])}catch{E||i([])}})(),()=>{E=!0}},[e]);let d=(0,V.useMemo)(()=>r?r[u.mode]||[]:[],[r,u.mode]);(0,V.useEffect)(()=>{if(!d.length||u.category==="random")return;let E=d.find(k=>k.id===u.category);(!E||E.count===0)&&a(k=>({...k,category:"random"}))},[d,u.category]);let s=(0,V.useCallback)(E=>{v(E),setTimeout(()=>v(k=>k===E?null:k),2200)},[]),f=(0,V.useCallback)(async E=>{if(e&&!R.current){R.current=!0;try{if(y.current){try{y.current()}catch{}y.current=null}y.current=await id(e,{type:"quizify/admin/subscribe",session_id:E},k=>{k?.game&&m(k.game)})}catch(k){s(k?.message||"Could not subscribe")}finally{R.current=!1}}},[e,s]),g=(0,V.useCallback)(async()=>{if(e)try{let E=await Gt(e,{type:"quizify/game/create",mode:u.mode,category:u.category,difficulty:u.difficulty,questions_per_round:u.questions_per_round,question_time:u.question_time,music_player:u.music_player||null,music_uri:u.music_uri||null});m(E.game),await f(E.session_id)}catch(E){s(E?.message||"Could not create game")}},[e,u,s,f]),x=(0,V.useCallback)(async()=>{if(!(!e||!c))try{await Gt(e,{type:"quizify/game/start",session_id:c.session_id})}catch(E){s(E?.message||"Could not start game")}},[e,c,s]),q=(0,V.useCallback)(async()=>{if(!(!e||!c)){try{await Gt(e,{type:"quizify/game/end",session_id:c.session_id})}catch{}if(y.current){try{y.current()}catch{}y.current=null}m(null)}},[e,c]),N=(0,V.useCallback)(async()=>{if(!(!e||!c))try{let E=await Gt(e,{type:"quizify/game/rematch",session_id:c.session_id});m(E.game),await f(E.session_id)}catch(E){s(E?.message||"Rematch failed")}},[e,c,s,f]);if((0,V.useEffect)(()=>()=>{if(y.current){try{y.current()}catch{}y.current=null}},[]),!e)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:!1,subtitle:"Admin"}),(0,C.jsx)("div",{className:"qz-card",children:(0,C.jsx)("div",{className:"qz-empty",children:"Loading\u2026"})})]});if(z&&!r)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin"}),(0,C.jsxs)("div",{className:"qz-card",children:[(0,C.jsx)("h2",{className:"qz-display",style:{fontSize:24,marginTop:0},children:"Couldn't load Quizify"}),(0,C.jsx)("div",{className:"qz-mono",style:{marginTop:12},children:z})]})]});if(!c)return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Setup"}),(0,C.jsx)("div",{className:"qz-card",children:(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsx)(gd,{value:u.mode,onChange:E=>a(k=>({...k,mode:E,category:"random"}))}),r&&(0,C.jsx)(hd,{value:u.category,available:d,onChange:E=>a(k=>({...k,category:E}))}),(0,C.jsx)(yd,{value:u.difficulty,onChange:E=>a(k=>({...k,difficulty:E}))}),(0,C.jsxs)("div",{className:"qz-setup-grid",children:[(0,C.jsx)(yu,{label:"Questions",value:u.questions_per_round,onChange:E=>a(k=>({...k,questions_per_round:E})),options:[5,10,15,20]}),(0,C.jsx)(yu,{label:"Seconds per question",value:u.question_time,onChange:E=>a(k=>({...k,question_time:E})),options:[15,20,30,45]})]}),(0,C.jsxs)("div",{className:"qz-setup-grid",children:[(0,C.jsx)(zd,{speakers:o,value:u.music_player,onChange:E=>a(k=>({...k,music_player:E}))}),(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsx)("div",{className:"qz-label",children:"Playlist URI (optional)"}),(0,C.jsx)("input",{type:"text",className:"qz-input",placeholder:"e.g. spotify:playlist:...",value:u.music_uri,onChange:E=>a(k=>({...k,music_uri:E.target.value}))})]})]}),(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:g,disabled:!r||!t,style:{alignSelf:"flex-start",marginTop:8},children:"Create Game \u2192"})]})}),p&&(0,C.jsx)("div",{className:"qz-toast",children:p})]});if(c.state==="ended")return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Game Over"}),(0,C.jsx)(Gl,{players:c.players,onRematch:N,onEnd:q}),p&&(0,C.jsx)("div",{className:"qz-toast",children:p})]});if(c.state==="lobby")return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:"Admin \xB7 Lobby"}),(0,C.jsxs)("div",{className:"qz-lobby",children:[(0,C.jsx)(wd,{joinCode:c.join_code}),(0,C.jsxs)("div",{className:"qz-stack",children:[(0,C.jsxs)("div",{className:"qz-card",children:[(0,C.jsxs)("div",{className:"qz-display qz-lobby-heading",children:["Players (",c.players.length,")"]}),(0,C.jsx)(kd,{players:c.players})]}),(0,C.jsxs)("div",{className:"qz-row-wrap",children:[(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:x,disabled:c.players.length===0,children:"Start Game"}),(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:q,children:"Cancel"})]})]})]}),p&&(0,C.jsx)("div",{className:"qz-toast",children:p})]});let _=c.current_question;return(0,C.jsxs)("div",{className:"qz-app",children:[(0,C.jsx)(xe,{connected:t,subtitle:`Admin \xB7 ${c.state==="reveal"?"Reveal":"Question"}`}),_&&(0,C.jsx)(Yl,{question:{question:_.question,answers:_.answers,startedAt:_.deadline-(c.settings?.question_time||20)},index:_.index,total:_.total,deadline:_.deadline,selected:null,correct:_.correct!==void 0?_.correct:null,reveal:c.state==="reveal"}),c.state==="reveal"&&_?.explanation&&(0,C.jsxs)("div",{className:"qz-reveal-banner",children:[(0,C.jsx)("div",{className:"qz-label",children:"Why"}),(0,C.jsx)("div",{className:"qz-reveal-explanation",children:_.explanation})]}),(0,C.jsxs)("div",{className:"qz-card",style:{marginTop:20},children:[(0,C.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Live Scoreboard"}),(0,C.jsx)(En,{players:c.players})]}),(0,C.jsx)("div",{className:"qz-row-wrap",style:{marginTop:16},children:(0,C.jsx)("button",{type:"button",className:"qz-btn qz-btn-danger",onClick:q,children:"End Game"})}),p&&(0,C.jsx)("div",{className:"qz-toast",children:p})]})}var X=D(Le(),1);var P=D(ee(),1),zu="quizify_player_v3";function um(){try{let e=window.localStorage.getItem(zu);return e?JSON.parse(e):null}catch{return null}}function am(e){try{window.localStorage.setItem(zu,JSON.stringify(e))}catch{}}function Sd(){try{window.localStorage.removeItem(zu)}catch{}}function qd({initialJoinCode:e}){let[t,n]=(0,X.useState)("connecting"),[r,l]=(0,X.useState)(null),[o,i]=(0,X.useState)(null),[u,a]=(0,X.useState)(null),[c,m]=(0,X.useState)(e||""),[p,v]=(0,X.useState)(""),[z,w]=(0,X.useState)(null),[y,R]=(0,X.useState)(null),[d,s]=(0,X.useState)(!1),[f,g]=(0,X.useState)(null),x=(0,X.useRef)(null),q=(0,X.useCallback)(I=>{R(I),setTimeout(()=>R(ge=>ge===I?null:ge),2200)},[]);(0,X.useEffect)(()=>{let I=um();I?.join_code===(e||"").toUpperCase()?l(I):I&&!e&&(l(I),m(I.join_code||""));let ge=new Wl({onStatus:n,onEvent:j=>{if(j?.event==="error"){if(j.code==="invalid_token"||j.code==="not_found"){Sd(),l(null),i(null),a(null),q(j.message||"Session ended");return}q(j.message||j.code||"Server error");return}if(j?.event==="joined"||j?.event==="resumed"){let wr={player_id:j.player_id,session_id:j.session_id,player_token:j.player_token,name:j.name,join_code:j.game?.join_code||c.toUpperCase()};l(wr),am(wr),ge.setResume({session_id:wr.session_id,player_token:wr.player_token}),j.game&&i(j.game),j.you&&a(j.you),j.event==="joined"&&s(!1);return}j?.game&&i(j.game),j?.you&&a(j.you),j?.event==="question"&&w(null)}});return I?.session_id&&I?.player_token&&ge.setResume({session_id:I.session_id,player_token:I.player_token}),x.current=ge,ge.connect(),()=>{ge.close(),x.current=null}},[]);let N=(0,X.useCallback)(()=>{let I=x.current;if(!I||t!=="open")return;let ge=c.trim().toUpperCase(),j=p.trim();!ge||j.length===0||(s(!0),g(null),I.send({type:"join",join_code:ge,name:j}),setTimeout(()=>s(!1),4e3))},[c,p,t]),_=(0,X.useCallback)(I=>{let ge=x.current;if(!ge||!r||z!==null)return;w(I),ge.send({type:"answer",answer:I})||(w(null),q("Disconnected \u2014 try again"))},[r,z,q]),E=(0,X.useCallback)(()=>{let I=x.current;if(I){try{I.send({type:"leave"})}catch{}I.setResume(null)}Sd(),l(null),i(null),a(null),w(null)},[]),k=t==="open";if(!r)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k}),(0,P.jsxs)("div",{className:"qz-join-screen",children:[(0,P.jsxs)("div",{className:"qz-join-hero",children:[(0,P.jsx)("h1",{children:"Quizify"}),(0,P.jsx)("p",{children:"Get in. Get smart. Win."})]}),(0,P.jsx)("div",{className:"qz-card",children:(0,P.jsxs)("div",{className:"qz-stack",children:[(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Join code"}),(0,P.jsx)("input",{type:"text",className:"qz-input qz-mono qz-input-code",inputMode:"text",placeholder:"6 letters",value:c,maxLength:6,onChange:I=>m(I.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")),autoCapitalize:"characters",autoComplete:"off",spellCheck:!1})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:8},children:"Your name"}),(0,P.jsx)("input",{type:"text",className:"qz-input",placeholder:"Enter a name",value:p,maxLength:20,onChange:I=>v(I.target.value),onKeyDown:I=>{I.key==="Enter"&&N()},autoComplete:"off"})]}),(0,P.jsx)("button",{type:"button",className:"qz-btn qz-btn-primary",onClick:N,disabled:d||!k||c.length<4||!p.trim(),children:d?"Joining\u2026":k?"Join Game":"Connecting\u2026"}),f&&(0,P.jsx)("div",{className:"qz-error-text",children:f})]})})]}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});if(!o)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k,subtitle:r.name}),(0,P.jsx)("div",{className:"qz-empty",children:k?"Loading game\u2026":"Reconnecting\u2026"})]});if(o.state==="ended")return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k,subtitle:r.name}),(0,P.jsx)(Gl,{players:o.players,highlightId:r.player_id}),(0,P.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,P.jsx)("button",{type:"button",className:"qz-btn",onClick:E,children:"Leave"})}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});if(o.state==="lobby")return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k,subtitle:r.name}),(0,P.jsxs)("div",{className:"qz-card qz-center-card",children:[(0,P.jsx)("div",{className:"qz-trophy",style:{fontSize:64},children:"\u{1F44B}"}),(0,P.jsx)("h2",{className:"qz-display qz-lobby-title",children:"You're in"}),(0,P.jsx)("p",{className:"qz-muted",children:"Waiting for the host to start the game\u2026"}),(0,P.jsx)("div",{style:{marginTop:24},children:(0,P.jsxs)("div",{className:"qz-label",children:["Players (",o.players.length,")"]})}),(0,P.jsx)(En,{players:o.players,highlightId:r.player_id})]}),(0,P.jsx)("div",{className:"qz-row-wrap qz-center",style:{marginTop:16},children:(0,P.jsx)("button",{type:"button",className:"qz-btn",onClick:E,children:"Leave"})}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]});let Z=o.current_question;if(!Z)return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k,subtitle:r.name}),(0,P.jsx)("div",{className:"qz-empty",children:"Waiting for next question\u2026"})]});let Nn=o.state==="reveal",Nd=u?.score??0,qu=u?.streak??0;return(0,P.jsxs)("div",{className:"qz-app",children:[(0,P.jsx)(xe,{connected:k,subtitle:r.name}),(0,P.jsx)(Yl,{question:{question:Z.question,answers:Z.answers,startedAt:Z.deadline-(o.settings?.question_time||20)},index:Z.index,total:Z.total,deadline:Z.deadline,selected:z,correct:Nn?Z.correct:null,onAnswer:_,reveal:Nn}),Nn&&Z.explanation&&(0,P.jsxs)("div",{className:"qz-reveal-banner",children:[(0,P.jsx)("div",{className:"qz-label",children:"Why"}),(0,P.jsx)("div",{className:"qz-reveal-explanation",children:Z.explanation})]}),u&&(0,P.jsxs)("div",{className:"qz-card qz-score-card",children:[(0,P.jsx)("div",{className:"qz-label",style:{marginBottom:12},children:"Your score"}),(0,P.jsxs)("div",{className:"qz-display qz-score-value",children:[Nd.toLocaleString(),qu>=3&&(0,P.jsxs)("span",{className:"qz-streak-badge qz-streak-inline",children:["\u{1F525} ",qu," streak"]})]})]}),y&&(0,P.jsx)("div",{className:"qz-toast",children:y})]})}var wu=`/* ============================================================
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
  background: rgba(92, 240, 164, 0.15);
  animation: qz-correct-pop 0.45s var(--qz-ease);
}

.qz-answer.qz-correct .qz-answer-letter {
  background: var(--qz-correct);
  color: #08152a;
  border-color: var(--qz-correct);
}

.qz-answer.qz-wrong {
  border-color: var(--qz-wrong);
  background: rgba(255, 92, 124, 0.1);
  opacity: 0.7;
}

@keyframes qz-correct-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.025); }
  100% { transform: scale(1); }
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
`;var Su=D(ee(),1),_d=!1;function cm(){if(_d)return;_d=!0;let e=document.createElement("style");e.setAttribute("data-quizify",""),e.textContent=wu,document.head.appendChild(e)}var ku=class extends HTMLElement{constructor(){super(),this._hass=null,this._narrow=!1,this._root=null,this._mountPoint=null}set hass(t){this._hass=t,this._render()}get hass(){return this._hass}set narrow(t){this._narrow=t,this._render()}set route(t){}set panel(t){}connectedCallback(){if(!this.shadowRoot){let t=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=wu,t.appendChild(n);let r=document.createElement("div");r.className="qz-shadow-host",t.appendChild(r),this._mountPoint=r,this._root=(0,xu.createRoot)(r)}this._render()}disconnectedCallback(){this._root&&queueMicrotask(()=>{try{this._root.unmount()}catch{}this._root=null})}_render(){this._root&&this._root.render((0,Su.jsx)(xd,{hass:this._hass,narrow:this._narrow}))}};customElements.get("quizify-panel")||customElements.define("quizify-panel",ku);function Ed(){let e=document.getElementById("quizify-root");if(!e||(e.dataset.view||"")!=="player")return;let n=e.dataset.joinCode||"";cm(),(0,xu.createRoot)(e).render((0,Su.jsx)(qd,{initialJoinCode:n}))}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ed):Ed());})();
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
