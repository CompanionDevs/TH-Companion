<<<<<<< HEAD:src/scripts/views/verification_queue/verification_queue_functions.ts
import {showMessage} from "../../common/common_functions"
import {Answer} from "../../common/content"
=======
import { extension_server_url } from "configs/config";
import {showMessage} from ".././common/common_functions"
import {Answer} from ".././common/content"
>>>>>>> c967d3c80b4c1bf5dbeaddeef082f86729be2c2f:src/scripts/verification_queue/verification_queue_functions.ts
export async function removeAnswer(id, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch(`${extension_server_url()}/answers/`+id,{method: "DELETE"})
  .then(response => response.json())

  if (!resp.statusCode){
    let item = button.parentElement.parentElement.parentElement
    button.classList.remove("show");
    item.style.opacity = '0.5'
    item.style.pointerEvents = 'none'
    
  } else {
    showMessage(resp.message,"error")
  }
    
}

export async function approveAnswer(id, answerId, button){
  
  button.classList.add("show");
  console.log(button)
  let resp = await fetch(`${extension_server_url()}/answers/`+id,{method: "DELETE"})
  .then(response => response.json())

  if (!resp.statusCode){
    let answer = new Answer()
    answer.Approve(answerId)
    let item = button.parentElement.parentElement.parentElement
    button.classList.remove("show");
    item.style.border = '2px solid #9CE8C2'
    item.style.pointerEvents = 'none'
    
  } else {
    showMessage(resp.message,"error")
  }
  
}

export async function loadNextPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
  //@ts-expect-error
    let currentPageDisplay = parseInt(document.querySelector(".pagenum").innerText)
    if (currentPageDisplay >= 0){
        let nextData = await fetch(`${extension_server_url()}/get_next_page/`+String(currentPageDisplay))
        .then(response => response.json())
        //@ts-ignore
       
        if (!nextData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) + 1
          //@ts-ignore
          
        } 
         //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return nextData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
}

export async function loadPrevPage(){
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "0.5"
    //@ts-expect-error
    let currentPageDisplay = document.querySelector(".pagenum").innerText
    if (parseInt(currentPageDisplay) > 1){
        let prevData = await fetch(`${extension_server_url()}/get_prev_page/`+currentPageDisplay)
        .then(response => response.json())
        if (!prevData.end){
          //@ts-ignore
          document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) + 1
          //@ts-ignore
          
        } 
        //@ts-ignore
        document.querySelector(".pagenum").innerText = parseInt(currentPageDisplay) - 1
        //@ts-ignore
        document.querySelector(".pagination").style.opacity = "1"
        return prevData
    }
    //@ts-expect-error
    document.querySelector(".pagination").style.opacity = "1"
    
    
}