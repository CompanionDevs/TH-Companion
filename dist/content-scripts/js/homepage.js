(()=>{var e={344:function(e,s,t){"use strict";var n=this&&this.__awaiter||function(e,s,t,n){return new(t||(t=Promise))((function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function o(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var s;e.done?r(e.value):(s=e.value,s instanceof t?s:new t((function(e){e(s)}))).then(a,o)}l((n=n.apply(e,s||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});const i=r(t(150));s.default={get:e=>n(void 0,void 0,void 0,(function*(){let s=yield i.default.storage.local.get(e);return null==s?void 0:s[e]})),set:(e,s)=>n(void 0,void 0,void 0,(function*(){return yield i.default.storage.local.set({[e]:s})}))}},343:function(e,s,t){"use strict";var n=this&&this.__awaiter||function(e,s,t,n){return new(t||(t=Promise))((function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function o(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var s;e.done?r(e.value):(s=e.value,s instanceof t?s:new t((function(e){e(s)}))).then(a,o)}l((n=n.apply(e,s||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});const i=r(t(344));new class{constructor(){this.Init()}Init(){return n(this,void 0,void 0,(function*(){yield this.CheckIfAuthed()}))}CheckIfAuthed(){return n(this,void 0,void 0,(function*(){yield i.default.get("authToken")}))}}},297:function(e,s,t){"use strict";var n=this&&this.__awaiter||function(e,s,t,n){return new(t||(t=Promise))((function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function o(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var s;e.done?r(e.value):(s=e.value,s instanceof t?s:new t((function(e){e(s)}))).then(a,o)}l((n=n.apply(e,s||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});const i=t(595),a=t(296),o=r(t(150));function l(){return n(this,void 0,void 0,(function*(){const e=document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");!function(){let e=JSON.parse(document.querySelector("head meta[name='user_data']").getAttribute("content"));o.default.storage.local.set({user:{id:e.id,nick:e.nick,auth:{hash:e.cometAuthHash,avatar_url:e.avatar},gender:e.gender}})}();for(let s of Array.from(e)){let e=s.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];try{let e=s.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");if(s.querySelector(".mod-button"))continue;e.insertAdjacentHTML("afterend",'<button class="mod-button sg-button--outline"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg></div></button>'),e.querySelector("a").innerHTML='<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'}catch(e){"noanswer"!==s.id&&(s.id="noanswer",s.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentHTML("afterend",'<div class = "sg-actions-list__hole sg-actions-list__hole--to-right"><button class="mod-button sg-button--outline"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg></div></button></div>'))}!0===(yield fetch("https://brainly.com/api/28/api_tasks/main_view/"+e,{method:"GET"}).then((e=>e.json()))).data.task.settings.is_marked_abuse&&s.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",'<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>'),s.querySelector(" .mod-button").addEventListener("click",(function(){return n(this,void 0,void 0,(function*(){document.body.insertAdjacentHTML("beforeend",(0,a.ticket)()),(0,i.insertdata_ticket)(e),document.querySelector(".modal_close").addEventListener("click",(function(){return n(this,void 0,void 0,(function*(){document.querySelector(".modal_back").remove(),yield fetch("https://brainly.com/api/28/moderate_tickets/expire",{method:"POST",body:`{"model_id":${e},"model_type_id":1,"schema":"moderation.ticket.expire"}`})}))}))}))}))}}))}const g=new MutationObserver(l),c=()=>{let e=document.querySelector(".sg-layout__content");if(!e)return setTimeout(c,500);g.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),l()};c()},296:(e,s,t)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.ticket=void 0,t(150).runtime.getURL("resources/Compositions/Brainly_Plus_Jump.svg"),s.ticket=function(){return'\n    <div class = "modal_back"><div class = "modal">\n    <h1 class="sg-text-bit--gray-secondary sg-headline sg-headline--xlarge sg-headline--extra-bold" style = "color:#323c45; margin-bottom:8px;">Question Content</h1>\n      <div class = "modal_close"><div class="sg-toplayer__close" role="button" tabindex="0"><div class="sg-icon sg-icon--icon-gray-50 sg-icon--x24"><svg class="sg-icon__svg" role="img" aria-labelledby="title-close-zvtc08" focusable="false"><title id="title-close-zvtc08">close</title><use xlink:href="#icon-close" aria-hidden="true"></use></svg></div></div></div>\n    \n      <div class = "preview-content">\n    \n        <div class="sg-spinner-container">\n          <div class="sg-spinner-container__overlay">\n            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--small"></div>\n          </div>\n        </div>\n        <div class = "content-item question">\n          <div class = "report">\n          <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div>\n          <div class="text-rep">\n            <div class="user-info">\n              <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">LoremIpsum</div>\n              <div class="rank sg-text sg-text--small">Helping Hand</div>\n            </div>\n            <div class="report-info">\n              <div class="sg-text">Reason</div>\n            </div>\n          </div>\n          </div>\n          <div class="qdata">\n            <div class="user-info">\n              <div class="pfp"><div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div></div>\n              <div class="qdata-info-txt">\n                <div class="text-user">\n                  <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">JohnDoe</div>\n                  <div class="rank sg-text sg-text--small">Ambitious</div>\n                </div>\n                <div class="text-subj">\n                  <div class = "sg-text sg-text--xsmall rightdot">Subject</div>\n                  <div class = "sg-text sg-text--xsmall">Middle School</div>\n                </div>\n              </div>\n            </div>\n            <div class="content sg-text">\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n            </div>\n            <div class="attachments">\n              <div class="attachment-tools">\n                <button class="newtab"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-open_in_new_tab"></use></svg></div></button>\n                <button class="rotate"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-rotate"></use></svg></div></button>\n              </div>\n            </div>\n            <div class="attach-list"></div>\n            <div class="actions">\n              <button class="qdel one">1</button>\n              <button class="qdel two">2</button>\n              <button class="qdel three">3</button>\n              <div class="delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>\n            </div>\n            <div class="delmenu">\n              <div class="primary-items"></div>\n              <div class="secondary-items"></div>\n              <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>\n            </div>\n          </div>\n        </div>\n    \n        <div class = "answers">\n        </div>\n        <div class="log"></div>\n      </div>\n    '}},595:function(e,s,t){"use strict";var n=this&&this.__awaiter||function(e,s,t,n){return new(t||(t=Promise))((function(r,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function o(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var s;e.done?r(e.value):(s=e.value,s instanceof t?s:new t((function(e){e(s)}))).then(a,o)}l((n=n.apply(e,s||[])).next())}))};Object.defineProperty(s,"__esModule",{value:!0}),s.insertdata_ticket=void 0;let r=t(150).runtime.getURL("resources/Compositions/Ladies@Brainly.svg");function i(e,s,t){var n;if(s.report){let r=t.querySelector(".report"),i=e.users_data.find((({id:e})=>e===s.report.user.id));r.querySelector(".report-info div").innerHTML=null===(n=s.report)||void 0===n?void 0:n.abuse.name,t.classList.add("reported"),r.querySelector(".username").innerHTML=i.nick,r.querySelector(".rank").innerHTML=i.ranks.names[0],r.querySelector(".rank").setAttribute("style",`color: ${i.ranks.color}`)}}function a(e,s){if(0!==e.attachments.length){let t=0;if(s.querySelector(".rotate").addEventListener("click",(function(){s.querySelector(".attachments > img").setAttribute("style",`transform: rotate(${t+90}deg)`),t+=90})),s.querySelector(".newtab").addEventListener("click",(function(){window.open(s.querySelector(".attachments > img").getAttribute("src"),"_blank")})),("png"===e.attachments[0].extension||"jpg"===e.attachments[0].extension||"jpeg"===e.attachments[0].extension)&&(s.querySelector(".attachments").classList.add("show"),s.querySelector(".attachments").insertAdjacentHTML("beforeend",`\n    <img src=${JSON.stringify(e.attachments[0].full)}>\n    `),e.attachments.length>1))for(let t=0;t<e.attachments.length;t++)s.querySelector(".attach-list").insertAdjacentHTML("beforeend",`\n          <img src=${JSON.stringify(e.attachments[t].thumbnail)} id = "img${t}" onclick = 'document.querySelector(".attachments > img").setAttribute("src", "${e.attachments[t].full}")'>\n        `)}}function o(e,s,t){null!==e.avatar&&(s.querySelector(".pfp").innerHTML=`\n      <img src=${e.avatar[64]} alt="">\n      `),s.querySelector(".text-user .username").innerHTML=e.nick,s.querySelector(".text-user .rank").innerHTML=e.ranks.names[0],s.querySelector(".text-user .rank").setAttribute("style",`color: ${e.ranks.color}`),s.querySelector(".content").innerHTML=t.content}function l(e,s,t){let n=s.users_data.find((({id:s})=>s===e.user.id)),r=`\n  <div class = "content-item answer${t}">\n    <div class = "report">\n      <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div>\n      <div class="text-rep">\n        <div class="user-info">\n          <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">LoremIpsum</div>\n          <div class="rank sg-text sg-text--small">Helping Hand</div>\n        </div>\n        <div class="report-info">\n          <div class="sg-text">Reason</div>\n        </div>\n      </div>\n    </div>\n    <div class="adata">\n      <div class="user-info">\n        <div class="pfp"><div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div></div>\n        <div class="adata-info-txt">\n          <div class="text-user">\n            <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">username</div>\n            <div class="rank sg-text sg-text--small">Ambitious</div>\n          </div>\n          <div class="text-subj">\n            <div class = "sg-text sg-text--xsmall rightdot">Subject</div>\n            <div class = "sg-text sg-text--xsmall">Middle School</div>\n          </div>\n        </div>\n      </div>\n      <div class="content sg-text">\n        Content\n      </div>\n      <div class="attachments">\n        <div class="attachment-tools">\n          <button class="newtab"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-open_in_new_tab"></use></svg></div></button>\n          <button class="rotate"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-rotate"></use></svg></div></button>\n        </div>\n      </div>\n      <div class="attach-list"></div>\n      <div class="actions">\n        <button class="adel one">1</button>\n        <button class="adel two">2</button>\n        <button class="adel three">3</button>\n        <div class="delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>\n      </div>\n      <div class="delmenu">\n        <div class="primary-items"></div>\n        <div class="secondary-items"></div>\n      </div>\n    </div>\n  </div>\n  `;document.querySelector(".answers").insertAdjacentHTML("beforeend",r);let l=document.querySelector(`.answer${t}`);o(n,l,e),a(e,l),i(s,e,l)}s.insertdata_ticket=function(e){return n(this,void 0,void 0,(function*(){if((yield fetch(`https://brainly.com/api/28/api_tasks/main_view/${e}`,{method:"GET"}).then((e=>e.json()))).data.task.settings.is_deleted)document.querySelector(".preview-content").innerHTML=`\n    <div class="removedq">\n      <img src="${r}" alt="">\n    </div>\n    `;else{let s=yield fetch("https://brainly.com/api/28/moderation_new/get_content",{method:"POST",body:`{"model_type_id":1,"model_id":${e},"schema":"moderation.content.get"}`}).then((e=>e.json())),t=yield fetch("https://brainly.com/api/28/api_config/desktop_view",{method:"GET"}).then((e=>e.json())),r=yield fetch(`https://brainly.com/api/28/api_task_lines/big/${e}`,{method:"GET"}).then((e=>e.json()));document.querySelector(".sg-spinner-container").classList.add("remove"),function(e,s){let t=e.data.task,r=document.querySelector(".qdata");console.log(e),document.querySelector(".text-subj > div:nth-child(2)").innerHTML=s.data.grades.find((({id:e})=>e===t.grade_id)).name,document.querySelector(".text-subj > div:nth-child(1)").innerHTML=s.data.subjects.find((({id:e})=>e===t.subject_id)).name;let l=e.users_data.find((({id:e})=>e===t.user.id));i(e,t,r),o(l,r,t),a(t,r);let g=e.data.delete_reasons.task;for(let e=0;e<g.length;e++)r.querySelector(".primary-items").insertAdjacentHTML("beforeend",`\n      <label class="sg-radio sg-radio--xxs" for="${g[e].id}">\n        <input type="radio" class="sg-radio__element" name="group1" id="${g[e].id}" index = "${e}">\n        <span class="sg-radio__ghost" aria-hidden="true"></span>\n        <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${g[e].text}</span>\n      </label>`);r.querySelector(".delete").addEventListener("click",(()=>{r.querySelector(".delmenu").classList.toggle("show")})),r.querySelector(".primary-items").addEventListener("change",(function(){return n(this,void 0,void 0,(function*(){r.querySelector(".delmenu").classList.add("secondary");let e=r.querySelector(".primary-items input:checked").getAttribute("index"),s=g[e].subcategories;console.log(s),r.querySelector(".secondary-items").innerHTML="";for(let e=0;e<s.length;e++)r.querySelector(".secondary-items").insertAdjacentHTML("beforeend",`\n        <label class="sg-radio sg-radio--xxs" for="${s[e].id}">\n          <input type="radio" class="sg-radio__element" name="group2" id="${s[e].id}" index = "${e}">\n          <span class="sg-radio__ghost" aria-hidden="true"></span>\n          <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${s[e].title}</span>\n        </label>`);r.querySelector(".secondary-items").addEventListener("change",(function(){let e=s[r.querySelector(".secondary-items input:checked").getAttribute("index")];console.log(e),r.querySelector("textarea.deletion-reason").value=e.text}))}))}))}(s,t),0!==s.data.responses.length&&(document.querySelector(".answers").innerHTML="");for(let e=0;e<s.data.responses.length;e++)l(s.data.responses[e],s,e);!function(e){for(let s=0;s<e.data.length;s++){let t=e.users_data.find((({id:t})=>t===e.data[s].user_id)).nick;document.querySelector(".log").insertAdjacentHTML("beforeend",`\n    <div class="log-item">\n      <div class = "user">${t}</div><div class = "content">${e.data[s].text.replace("%1$s","")}</div>\n    </div>\n  `)}}(r)}}))}},150:function(e,s){var t,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,t=function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const s="The message port closed before a response was received.",t="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",n=e=>{const n={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(n).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class r extends WeakMap{constructor(e,s){super(s),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const i=(s,t)=>(...n)=>{e.runtime.lastError?s.reject(new Error(e.runtime.lastError.message)):t.singleCallbackArg||n.length<=1&&!1!==t.singleCallbackArg?s.resolve(n[0]):s.resolve(n)},a=e=>1==e?"argument":"arguments",o=(e,s,t)=>new Proxy(s,{apply:(s,n,r)=>t.call(n,e,...r)});let l=Function.call.bind(Object.prototype.hasOwnProperty);const g=(e,s={},t={})=>{let n=Object.create(null),r={has:(s,t)=>t in e||t in n,get(r,c,d){if(c in n)return n[c];if(!(c in e))return;let m=e[c];if("function"==typeof m)if("function"==typeof s[c])m=o(e,e[c],s[c]);else if(l(t,c)){let s=((e,s)=>function(t,...n){if(n.length<s.minArgs)throw new Error(`Expected at least ${s.minArgs} ${a(s.minArgs)} for ${e}(), got ${n.length}`);if(n.length>s.maxArgs)throw new Error(`Expected at most ${s.maxArgs} ${a(s.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((r,a)=>{if(s.fallbackToNoCallback)try{t[e](...n,i({resolve:r,reject:a},s))}catch(i){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,i),t[e](...n),s.fallbackToNoCallback=!1,s.noCallback=!0,r()}else s.noCallback?(t[e](...n),r()):t[e](...n,i({resolve:r,reject:a},s))}))})(c,t[c]);m=o(e,e[c],s)}else m=m.bind(e);else if("object"==typeof m&&null!==m&&(l(s,c)||l(t,c)))m=g(m,s[c],t[c]);else{if(!l(t,"*"))return Object.defineProperty(n,c,{configurable:!0,enumerable:!0,get:()=>e[c],set(s){e[c]=s}}),m;m=g(m,s[c],t["*"])}return n[c]=m,m},set:(s,t,r,i)=>(t in n?n[t]=r:e[t]=r,!0),defineProperty:(e,s,t)=>Reflect.defineProperty(n,s,t),deleteProperty:(e,s)=>Reflect.deleteProperty(n,s)},c=Object.create(e);return new Proxy(c,r)},c=e=>({addListener(s,t,...n){s.addListener(e.get(t),...n)},hasListener:(s,t)=>s.hasListener(e.get(t)),removeListener(s,t){s.removeListener(e.get(t))}}),d=new r((e=>"function"!=typeof e?e:function(s){const t=g(s,{},{getContent:{minArgs:0,maxArgs:0}});e(t)}));let m=!1;const u=new r((e=>"function"!=typeof e?e:function(s,n,r){let i,a,o=!1,l=new Promise((e=>{i=function(s){m||(console.warn(t,(new Error).stack),m=!0),o=!0,e(s)}}));try{a=e(s,n,i)}catch(e){a=Promise.reject(e)}const g=!0!==a&&((c=a)&&"object"==typeof c&&"function"==typeof c.then);var c;if(!0!==a&&!g&&!o)return!1;return(g?a:l).then((e=>{r(e)}),(e=>{let s;s=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",r({__mozWebExtensionPolyfillReject__:!0,message:s})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)})),!0})),A=({reject:t,resolve:n},r)=>{e.runtime.lastError?e.runtime.lastError.message===s?n():t(new Error(e.runtime.lastError.message)):r&&r.__mozWebExtensionPolyfillReject__?t(new Error(r.message)):n(r)},v=(e,s,t,...n)=>{if(n.length<s.minArgs)throw new Error(`Expected at least ${s.minArgs} ${a(s.minArgs)} for ${e}(), got ${n.length}`);if(n.length>s.maxArgs)throw new Error(`Expected at most ${s.maxArgs} ${a(s.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((e,s)=>{const r=A.bind(null,{resolve:e,reject:s});n.push(r),t.sendMessage(...n)}))},x={devtools:{network:{onRequestFinished:c(d)}},runtime:{onMessage:c(u),onMessageExternal:c(u),sendMessage:v.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:v.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},f={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return n.privacy={network:{"*":f},services:{"*":f},websites:{"*":f}},g(e,x,n)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");e.exports=n(chrome)}else e.exports=browser},void 0===(n=t.apply(s,[e]))||(e.exports=n)}},s={};function t(n){var r=s[n];if(void 0!==r)return r.exports;var i=s[n]={exports:{}};return e[n].call(i.exports,i,i.exports,t),i.exports}t(297),t(343)})();