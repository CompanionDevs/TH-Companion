function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export class answer{
    confirm(id:number){
        let res = fetch("https://brainly.com/graphql/us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-b-token-long": getCookie("Zadanepl_cookie[Token][Long]")
            },
            body: JSON.stringify({
                "operationName": "AcceptModerationReportContent",
                "variables": {
                "input": {
                    "contentType": "Answer",
                    "contentId": id
                }
                },
                "query": "mutation AcceptModerationReportContent($input: AcceptModerationReportContentInput!) {\n  acceptModerationReportContent(input: $input) {\n    validationErrors {\n      error\n      __typename\n    }\n    __typename\n  }\n}\n"
            })
        })
    }
    approve(id:string){
        var raw = JSON.stringify({
            "model_type": 2,
            "model_id": id
          });
          
          fetch("https://brainly.com/api/28/api_content_quality/confirm", { method: "POST",body: raw}).then(data => data.json());
    }
    async delete(id:string, reason:string, warn:boolean, take_point:boolean){
        await fetch(`https://brainly.com/api/28/moderation_new/delete_response_content`, {
            method: "POST",
            body:JSON.stringify({
              "reason_id":2,
              "reason":reason,
              "give_warning":warn,
              "take_points": take_point,
              "schema":`moderation.response.delete`,
              "model_type_id":2,
              "model_id":id,
            })
          })
    }
}

export class question{
    confirm(id:number){
        fetch("https://brainly.com/api/28/moderation_new/accept", {
          "referrer": "https://brainly.com/tasks/archive_mod",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": `{\"model_type_id\":1,\"model_id\":${id},\"schema\":\"moderation.content.ok\"}`,
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
    }
    async delete(id:string, reason:string, warn:boolean, take_point:boolean){
        await fetch(`https://brainly.com/api/28/moderation_new/delete_task_content`, {
            method: "POST",
            body:JSON.stringify({
              "reason_id":2,
              "reason":reason,
              "give_warning":warn,
              "take_points": take_point,
              "schema":`moderation.tasm.delete`,
              "model_type_id":1,
              "model_id":id,
            })
          })
    }
}