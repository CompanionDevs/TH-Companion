import {insert_ticket} from "../../common/mod_functions"

let modbutton = /*html*/`
        <div class="modticket">
            <div class="sg-spinner-container__overlay">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
            </div>
            <button class="mod-button sg-button--outline">
            <div class="sg-icon sg-icon--dark sg-icon--x32">
                <svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg>
            </div>
            </button>
        </div>
        `
export function ModObserver(){
    const observer = new MutationObserver(HomeMod);
    function addFunctionifFeed(){
        let target = document.querySelector(".sg-layout__content");
        if(!target){ return setTimeout(addFunctionifFeed, 100); }
        
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
        HomeMod()
    }
    addFunctionifFeed()
}
export function AnsObserver(){
    const observer = new MutationObserver(HomeAns);
    function addFunctionifFeed(){
        let target = document.querySelector(".sg-layout__content");
        if(!target){ return setTimeout(addFunctionifFeed, 100); }
        
        observer.observe(target, { attributes: true, childList: true, subtree: true, characterData:true });
        HomeAns()
    }
    addFunctionifFeed()
}
async function HomeAns(){
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
        let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if(actionlist.id === "altered") continue;
        if(actionlist.querySelector("a") && actionlist.id !== "altered"){
            actionlist.id = "altered"
            actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
        }

        //check if the question has been reported + add the report flag
        let bdata = await fetch("https://brainly.com/api/28/api_tasks/main_view/"+qid, {method: "GET"}).then(data => data.json());
        if(bdata.data.task.settings.is_marked_abuse === true){
            questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",`<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>`)
        }
    }
}
export async function HomeMod() {
    const questions = document.querySelectorAll(".brn-feed-items > div[data-testid = 'feed-item']");
    for (let questionBox of Array.from(questions)) {
      let qid = questionBox.querySelector("a[data-test = 'feed-item-link']").getAttribute("href").replace("/question/","").split("?")[0];
      
      //check if the answer button is available
      let modbutton = /*html*/`
        <div class="modticket">
          <div class="sg-spinner-container__overlay">
            <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
          </div>
          <button class="mod-button sg-button--outline">
            <div class="sg-icon sg-icon--dark sg-icon--x32">
              <svg class="sg-icon__svg"><use xlink:href="#icon-shield"></use></svg>
            </div>
          </button>
        </div>
        `
      try{
        let actionlist = questionBox.querySelector(".sg-actions-list__hole.sg-actions-list__hole--to-right");
        if (questionBox.querySelector(".mod-button")) continue;
        actionlist.insertAdjacentHTML("afterend", modbutton);
        actionlist.querySelector("a").classList.add("newansbut")
        actionlist.querySelector("a").innerHTML = '<div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-plus"></use></svg></div>'
      }catch(err){
        if(questionBox.id !== "noanswer"){
          questionBox.id = 'noanswer'
          questionBox.querySelector(".brn-feed-item__footer .sg-actions-list").insertAdjacentHTML("afterend", `<div class = "sg-actions-list__hole sg-actions-list__hole--to-right">${modbutton}</div>`);
        }
      }
  
      //check if the question has been reported + add the report flag
      let bdata = await fetch("https://brainly.com/api/28/api_tasks/main_view/"+qid, {method: "GET"}).then(data => data.json());
      if(bdata.data.task.settings.is_marked_abuse === true){
        questionBox.querySelector(".brn-feed-item__points .brn-points-on-feed").insertAdjacentHTML("afterbegin",`<div class = "repflag"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div></div>`)
      }
  
      //mod ticket event listeners
      questionBox.querySelector(".mod-button").addEventListener("click", async function(){
        insert_ticket(qid, questionBox.querySelector(".modticket > .sg-spinner-container__overlay"))
      });
  
      //livemod setup
      //questionBox.querySelector(".brn-feed-item").setAttribute("id", qid);
    }
    //subscribe()
  }
  export function permissionChecks(){
    return(/*html*/`
   
    <label class="sg-checkbox permission" for="" >
    <input type="checkbox" class="sg-checkbox__element perm0" id="0">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Confirm Selected</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm1" id="1">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Verify Selected</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm2" id="2">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Fetch Reported</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm3" id="3">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Unverify Selected</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm4" id="4">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Delete User</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm5" id="5">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Homepage Tickets</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm6" id="6">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Cont. Pg Tickets</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm7" id="7">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Delete Selected</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm8" id="8">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Warnings Prev.</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm9" id="9">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Confirm Button</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm10" id="10">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Mass-Message Users</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm11" id="11">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Mass-Delete Users</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm12" id="12">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Select All Links</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm13" id="13">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">Request Verification</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm14" id="14">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">View Verify Queue</span>
    </label>

    <label class="sg-checkbox permission"  >
    <input type="checkbox" class="sg-checkbox__element perm100" id="100">
    <div class="sg-checkbox__ghost" aria-hidden="true">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
    </div>
    <span style="font-size:13px !important;" class="sg-text sg-text--small sg-text--bold sg-checkbox__label">User Management</span>
    </label>
    <button class="sg-button sg-button--m sg-button--solid-light sg-button--solid-light-toggle-blue submit-permissions">
      <div class="spinner-container">
          <div class="sg-spinner sg-spinner--gray-900 sg-spinner--xsmall"></div>
      </div>
      <span class="sg-button__text">Update</span>
    </button>
    `)
}

