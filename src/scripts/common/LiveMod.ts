
import Browser, { browserAction, storage} from "webextension-polyfill";

class LiveMod {
    taskIds: number[];
    socket: WebSocket;
    authorized: boolean;
    meUserId: number;
    async subscribe(taskIds) {
      this.taskIds = taskIds;
      await this.connect();
    }
    async connect() {
      let socketToken = await this.getToken();
      if(!socketToken) return console.debug('Error getting token [WebSocket]');
      socketToken = socketToken.replace(/:.*/, '');
  
      let socket = new WebSocket(`wss://us-comet.z-dn.net:7879/socket.io/1/websocket/${socketToken}`);
      this.socket = socket;
      this.authorized = false;
  
      this.socket.onmessage = async(message) => await this.handleMessage(message);
      this.socket.onclose = (closeEvent) => console.debug("Websocket connection closed\n" + JSON.stringify(closeEvent));
    }
    async handleMessage(msg) {
      if(!msg?.data || !msg.data.includes(":::")) return;
      if(msg.data.charAt(0) === '1' && this.authorized === false) {
        await this.authenticateUser();
      } else if(msg.data.charAt(0) === '5') {
        let json = JSON.parse(msg.data.replace(/\d:{3}/, ""));
        if(json.name == "auth" && json.args[0]?.result == "authorized") {
          this.authorized = true;
          await this.subscribeToModEvents();
        } else if (json.name === "pubsub.news" && json.args[0].event == "moderation.begin") {
          let taskId = json.args[0].channel.replace('moderation.task.', '');
          let item = document.querySelector(`[id = "${taskId}"]`);
          if(!item) return;
          
          if(!item.classList.contains('ticket_reserved')) item.classList.add('ticket_reserved');
          if(item.querySelector(".ticket_reserved_mod_box")){
            item.querySelector(".ticket_reserved_mod_box").remove();
          }
  
          item.insertAdjacentHTML("beforeend", `<div title="${json.args[0].payload.user_data.nick}" class="ticket_reserved_mod_box">
            ${this.meUserId !== +json.args[0].payload.user_data.id?`<img class="sg-avatar sg-avatar--l" src="${json.args[0].payload.user_data.avatar ?? '/img/avatars/100-ON.png'}">`:""}
          </div>`);
        }
      }
    }
    async authenticateUser() {
      const user = await storage.local.get("user");
      await this.sendData({
        name: 'auth',
        args: [{
          uid: user.user.id,
          nick: user.user.nick,
          gender: user.user.gender,
          avatar: user.user.avatar,
          version: "2.1",
          client: navigator.userAgent.match(/android|phone/i) ? "mobile" : "desktop",
          auth_hash: user.user.auth_hash
        }]
      })
    }
    async subscribeToModEvents() {
      this.sendData({
        name: "pubsub.subscribe",
        args: [{
          "notify.task": [],
          "presence.task": [],
          "moderation.task": this.taskIds
        }]
      })
    }
    async sendData(data) {
      this.socket.send(`5:::${JSON.stringify(data)}`);
    }
    async getToken() {
      return await fetch(
        `https://us-comet.z-dn.net:7879/socket.io/1/?t=${encodeURIComponent(Date.now())}`
      ).then( resp => resp.text() );
    }
  }
export async function setAuth(){
  let medata = await fetch(`https://brainly.com/api/28/api_users/me`).then(data => data.json());
  storage.local.set({
    user: {
      id: medata.data.user.id,
      nick: medata.data.user.nick,
      avatar: medata.data.auth.comet.avatar_url,
      auth_hash: medata.data.auth.comet.auth_hash,
      gender: medata.data.user.gender
    }
  });
}
export const subscribe = function() {
  let modItems = document.querySelectorAll('.brn-feed-items .brn-feed-item');
  let taskIds = [];
  for (let k = 0; k < modItems.length; k++){
    let taskId = parseInt(modItems[k].id);
    taskIds.push(taskId);
  }
  console.log(taskIds)
  new LiveMod().subscribe(taskIds);
}
export const queue_subscribe = function() {
  let modItems = document.querySelectorAll('.content .moderation-item');
  let taskIds = [];
  for (let k = 0; k < modItems.length; k++){
    let taskId = parseInt(modItems[k].id);
    taskIds.push(taskId);
  }
  new LiveMod().subscribe(taskIds);
}