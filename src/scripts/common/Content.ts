import BrainlyAPI from "./BrainlyAPI"
import {getCookie} from "./CommonFunctions"

export class Answer{
    Confirm(id:number){
            var myHeaders = new Headers();
            myHeaders.append("authority", "brainly.com");
            myHeaders.append("accept", "*/*");
            myHeaders.append("accept-language", "en-US,en;q=0.9");
            myHeaders.append("content-type", "application/json");
            myHeaders.append("x-b-token-long", getCookie('Zadanepl_cookie[Token][Long]'));

        var raw = JSON.stringify({
        "operationName": "AcceptModerationReportContent",
        "variables": {
            "input": {
            "contentType": "Answer",
            "contentId": id
            }
        },
        "query": "mutation AcceptModerationReportContent($input: AcceptModerationReportContentInput!) {\n  acceptModerationReportContent(input: $input) {\n    validationErrors {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        
        };

        fetch("https://brainly.com/graphql/us", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    Approve(id:string){
          BrainlyAPI.Legacy(`POST`, "api_content_quality/confirm", {
            "model_type": 2,
            "model_id": id
          });
    }

    async Delete(id:string, reason:string, warn:boolean, take_point:boolean){
        BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_response_content', {
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.response.delete`,
            "model_type_id":2,
            "model_id":id,
          })
        }
}

export class Question{
    Confirm(id:number) {
        BrainlyAPI.Legacy(`POST`, "api_content_quality/confirm", {
            "model_type_id":1,
            "model_id":id,
            "schema":"moderation.content.ok"
        })
    }

    async Delete(id:string, reason:string, warn:boolean, take_point:boolean){
        await BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_task_content', {
            "reason_id":2,
            "reason":reason,
            "give_warning":warn,
            "take_points": take_point,
            "schema":`moderation.task.delete`,
            "model_type_id":1,
            "model_id":id,
          })
    }
    async Get(id:string){
        let data = await BrainlyAPI.Legacy(`POST`, 'moderation_new/get_content', {
            "model_id":id,
            "model_type_id":1,
            "schema": "moderation.content.get",
        })
        await BrainlyAPI.Legacy(`POST`, 'moderate_tickets/expire', {
            "model_id":id,
            "model_type_id":1,
            "schema": "moderation.ticket.expire",
        })
        return data
    }
}

export class CommentHandler{
    async Delete(id:string, reason:string, warn:boolean){
        await BrainlyAPI.Legacy(`POST`, 'moderation_new/delete_comment_content', {
            "reason_id":34,
            "reason":reason,
            "give_warning":warn,
            "model_type_id":45,
            "model_id":id,
          })
    }
}
