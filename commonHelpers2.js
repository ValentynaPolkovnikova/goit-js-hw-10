import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const l=document.querySelector(".form"),r=document.querySelector(".delay-text");function a(e){const t=parseInt(r.value),s=document.querySelector('input[name="state"]:checked');if(!s)return;e.preventDefault(),new Promise((o,i)=>{setTimeout(()=>{s.value==="fulfilled"?o(t):i(t)},t)}).then(c).catch(u),r.value="",document.querySelectorAll('input[name="state"]').forEach(o=>{o.checked=!1})}l.addEventListener("submit",a);function c(e){n.show({titleColor:"#fff",messageColor:"#fff",message:`✅ Fulfilled promise in ${e}ms`,closeOnEscape:!0,position:"topRight",backgroundColor:"#59a10d"})}function u(e){n.show({titleColor:"#fff",messageColor:"#fff",message:`❌ Rejected promise in ${e}ms`,closeOnEscape:!0,position:"topRight",backgroundColor:"#ef4040"})}
//# sourceMappingURL=commonHelpers2.js.map
