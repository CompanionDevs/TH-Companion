import {find, runtime} from "webextension-polyfill";
let removedq = runtime.getURL("resources/Compositions/Ladies@Brainly.svg");
function add_log(log){
  for(let i = 0; i < log.data.length; i++){
    let user = log.users_data.find(({id}) => id === log.data[i].user_id).nick;
  document.querySelector(".log").insertAdjacentHTML("beforeend",/*html*/`
    <div class="log-item">
      <div class = "user">${user}</div><div class = "content">${log.data[i].text.replace('%1$s',"")}</div>
    </div>
  `
  );}
}
function add_deletion(del_rsn, elem, tid, type:string){
  for(let i = 0; i < del_rsn.length; i++){
    elem.querySelector(".primary-items").insertAdjacentHTML("beforeend",/*html*/`
      <label class="sg-radio sg-radio--xxs" for="${del_rsn[i].id}">
        <input type="radio" class="sg-radio__element" name="group1" id="${del_rsn[i].id}" index = "${i}">
        <span class="sg-radio__ghost" aria-hidden="true"></span>
        <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${del_rsn[i].text}</span>
      </label>`
    )
  }
  elem.querySelector(".delete").addEventListener("click", () => {
    elem.querySelector(".delmenu").classList.toggle("show");
  })
  elem.querySelector(".primary-items").addEventListener("change", async function(){
    elem.querySelector(".delmenu").classList.add("secondary");
    let selected_index = elem.querySelector(".primary-items input:checked").getAttribute("index");
    let selected_subcats = del_rsn[selected_index].subcategories;
    console.log(selected_subcats);
    elem.querySelector(".secondary-items").innerHTML = '';
    for(let i = 0; i < selected_subcats.length; i++){
      elem.querySelector(".secondary-items").insertAdjacentHTML("beforeend",/*html*/`
        <label class="sg-radio sg-radio--xxs" for="${selected_subcats[i].id}${tid}">
          <input type="radio" class="sg-radio__element" name="group2" id="${selected_subcats[i].id}${tid}" index = "${i}">
          <span class="sg-radio__ghost" aria-hidden="true"></span>
          <span class="sg-text sg-text--small sg-text--bold sg-radio__label">${selected_subcats[i].title}</span>
        </label>`
      )
    }
    elem.querySelector(".secondary-items").addEventListener("change", function(){
      let selected_reason = selected_subcats[elem.querySelector(".secondary-items input:checked").getAttribute("index")]
      console.log(selected_reason);
      (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value = selected_reason.text;
    });
    elem.querySelector(".confirmdel button").addEventListener("click", function(){
      let warnuser = false;
      let takepts = false;
      if((<HTMLInputElement>elem.querySelector("input[id ^= 'warn']")).value === "on"){
        warnuser = true;
      }
      if((<HTMLInputElement>elem.querySelector("input[id ^= 'pts']")).value === "on"){
        takepts = true;
      }
      delete_content(type, tid, (<HTMLInputElement>elem.querySelector("textarea.deletion-reason")).value, warnuser, takepts);
      elem.querySelector(".delmenu").classList.remove("show");
      if(type === "response"){
        elem.classList.add("deleted");
      }
      if(type === "task"){
        document.querySelector(".question").classList.add("deleted");
        setTimeout(async () => {
          document.querySelector(".modal_back").remove()
          await fetch(`https://brainly.com/api/28/moderate_tickets/expire`,{method: "POST", body:`{"model_id":${tid},"model_type_id":1,"schema":"moderation.ticket.expire"}`})
        }, 1000);
      }
    });
  });
}
async function delete_content(type:string, id:string, reason:string, warn:boolean, take_point:boolean){
  let model_type_id = 0;
  if(type === "task") {model_type_id = 1;}
  if(type === "response") {model_type_id = 2;}
  await fetch(`https://brainly.com/api/28/moderation_new/delete_${type}_content`, {
      method: "POST",
      body:JSON.stringify({
        "reason_id":2,
        "reason":reason,
        "give_warning":warn,
        "take_points": take_point,
        "schema":`moderation.${type}.delete`,
        "model_type_id":model_type_id,
        "model_id":id,
      })
    })
}
function add_report(data, item, elem){
  if(item.report){
    let report_elem = elem.querySelector(".report")
    let reporter = data.users_data.find(({id}) => id === item.report.user.id)
    report_elem.querySelector(".report-info div").innerHTML = item.report?.abuse.name; 
    elem.classList.add("reported");

    report_elem.querySelector(".username").innerHTML = reporter.nick;
    report_elem.querySelector(".rank").innerHTML = reporter.ranks.names[0];
    report_elem.querySelector(".rank").setAttribute("style", `color: ${reporter.ranks.color}`)
  }
}
function add_attachments(item, elem){
  if(item.attachments.length !== 0){
    let rotation = 0;
    elem.querySelector(".rotate").addEventListener("click", function(){
      elem.querySelector(".attachments > img").setAttribute("style", `transform: rotate(${rotation+90}deg)`)
      rotation += 90;
    });
    elem.querySelector(".newtab").addEventListener("click", function(){
      window.open(elem.querySelector(".attachments > img").getAttribute("src"),"_blank");
    });
    
    if(item.attachments[0].extension === "png" || item.attachments[0].extension === "jpg" || item.attachments[0].extension === "jpeg"){
      elem.querySelector(".attachments").classList.add("show");
    elem.querySelector(".attachments").insertAdjacentHTML("beforeend",/*html*/`
    <img src=${JSON.stringify(item.attachments[0].full)}>
    `)
    if(item.attachments.length > 1){
      for(let i = 0; i < item.attachments.length; i++){
        elem.querySelector(".attach-list").insertAdjacentHTML("beforeend",/*html*/`
          <img src=${JSON.stringify(item.attachments[i].thumbnail)} id = "img${i}" onclick = 'document.querySelector(".attachments > img").setAttribute("src", "${item.attachments[i].full}")'>
        `)
      }
    }
  }
  }
}
function user_content_data(user, elem, item){
  if(user.avatar !== null){
    elem.querySelector(".pfp").innerHTML = /*html*/`
      <img src=${user.avatar[64]} alt="">
      `
  }

  elem.querySelector(".text-user .username").innerHTML = user.nick;
  elem.querySelector(".text-user .rank").innerHTML = user.ranks.names[0];
  elem.querySelector(".text-user .rank").setAttribute("style", `color: ${user.ranks.color}`)
  elem.querySelector(".content").innerHTML = item.content;
}
function add_answer(ans,res,a){
  let answerer = res.users_data.find(({id}) => id === ans.user.id);
  let answer_elem = /*html*/`
  <div class = "content-item answer${a}">
    <div class = "report">
      <div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-report_flag"></use></svg></div>
      <div class="text-rep">
        <div class="user-info">
          <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">LoremIpsum</div>
          <div class="rank sg-text sg-text--small">Helping Hand</div>
        </div>
        <div class="report-info">
          <div class="sg-text">Reason</div>
        </div>
      </div>
    </div>
    <div class="adata">
      <div class="user-info">
        <div class="pfp"><div class="sg-avatar"><div class="sg-avatar__image sg-avatar__image--icon"><div class="sg-icon sg-icon--gray-light sg-icon--x32 sg-avatar__icon"><svg class="sg-icon__svg"><use xlink:href="#icon-profile"></use></svg></div></div></div></div>
        <div class="adata-info-txt">
          <div class="text-user">
            <div class="username sg-text sg-text--gray sg-text--bold sg-text--small rightdot">username</div>
            <div class="rank sg-text sg-text--small">Ambitious</div>
          </div>
          <div class="text-subj">
            <div class = "sg-text sg-text--xsmall rightdot">Subject</div>
            <div class = "sg-text sg-text--xsmall">Middle School</div>
          </div>
        </div>
      </div>
      <div class="content sg-text">
        Content
      </div>
      <div class="attachments">
        <div class="attachment-tools">
          <button class="newtab"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-open_in_new_tab"></use></svg></div></button>
          <button class="rotate"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-rotate"></use></svg></div></button>
        </div>
      </div>
      <div class="attach-list"></div>
      <div class="actions">
        <button class="adel one">1</button>
        <button class="adel two">2</button>
        <button class="adel three">3</button>
        <div class="delete"><div class="sg-icon sg-icon--dark sg-icon--x32"><svg class="sg-icon__svg"><use xlink:href="#icon-trash"></use></svg></div></div>
      </div>
      <div class="delmenu">
              <div class="primary-items"></div>
              <div class="secondary-items"></div>
              <textarea placeholder="Reason" class=" deletion-reason sg-textarea sg-textarea--tall"></textarea>
              <div class="sg-space-x-m del-options">
                <div class="warnpts">
                  <label class="sg-checkbox" for="warn${a}">
                    <input type="checkbox" class="sg-checkbox__element" id="warn${a}">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">warn user</span>
                  </label>

                  <label class="sg-checkbox" for="pts${a}">
                    <input type="checkbox" class="sg-checkbox__element" id="pts${a}">
                    <div class="sg-checkbox__ghost" aria-hidden="true">
                      <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg"><use xlink:href="#icon-check"></use></svg></div>
                    </div>
                    <span class="sg-text sg-text--small sg-text--bold sg-checkbox__label">take points</span>
                  </label>
                </div>
                <div class="confirmdel">
                <button class="sg-button sg-button--m sg-button--outline"><span class="sg-button__text">confirm</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  `
  document.querySelector(".answers").insertAdjacentHTML("beforeend",answer_elem);
  let this_ans = document.querySelector(`.answer${a}`);
  let a_del_rsn = res.data.delete_reasons.response;
  let answer_id = res.data.responses[a].id

  user_content_data(answerer, this_ans, ans);
  add_attachments(ans, this_ans);
  add_report(res,ans,this_ans)
  add_deletion(a_del_rsn, this_ans, answer_id, "response")
}
function add_question_data(res, d_reference){
  let q_data = res.data.task;
  let q_elem = document.querySelector(".qdata");
  console.log(res);
  document.querySelector(".text-subj > div:nth-child(2)").innerHTML = d_reference.data.grades.find(({id}) => id === q_data.grade_id).name;
  document.querySelector(".text-subj > div:nth-child(1)").innerHTML = d_reference.data.subjects.find(({id}) => id === q_data.subject_id).name;
  let asker = res.users_data.find(({id}) => id === q_data.user.id);
  add_report(res, q_data, q_elem);
  user_content_data(asker, q_elem, q_data);
  add_attachments(q_data, q_elem);

  let q_del_rsn = res.data.delete_reasons.task;
  let q_id = res.data.task.id;
  add_deletion(q_del_rsn, q_elem, q_id, "task");
  
}
export async function insertdata_ticket(id){
  let basic_data = await fetch(`https://brainly.com/api/28/api_tasks/main_view/${id}`, {method: "GET"}).then(data => data.json());
  if(basic_data.data.task.settings.is_deleted){
    document.querySelector(".preview-content").innerHTML = /*html*/`
    <div class="removedq">
      <img src="${removedq}" alt="">
    </div>
    `
  }else{
    let res = await fetch(`https://brainly.com/api/28/moderation_new/get_content`, { method: "POST",body: (`{"model_type_id":1,"model_id":${id},"schema":"moderation.content.get"}`)}).then(data => data.json())
    let d_reference = await fetch('https://brainly.com/api/28/api_config/desktop_view', {method: "GET"}).then(data => data.json());
    let log = await fetch(`https://brainly.com/api/28/api_task_lines/big/${id}`, {method: "GET"}).then(data => data.json());
    
    document.querySelector(".sg-spinner-container").classList.add("remove");

    add_question_data(res,d_reference);
    if(res.data.responses.length !== 0){
      document.querySelector(".answers").innerHTML = '';
    }
    for(let a = 0; a < res.data.responses.length; a++){
      add_answer(res.data.responses[a],res, a);
    }
    add_log(log);
  }
}