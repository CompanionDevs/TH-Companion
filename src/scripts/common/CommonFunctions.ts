
import Extension from "../../locales/en/localization.json"

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function get_time_diff( dt ){
    var input = new Date( dt )
    let datetime = new Date(input.toLocaleString('en-US')).getTime()
  
    let now = new Date().getTime();
    let timediff = Math.abs(now - datetime)
    let datediff = Math.ceil(timediff / (1000 * 3600 * 24));
    let secdiff = Math.abs(timediff/(1000));
    let minutediff = timediff/(60*1000);
  
    let str = ''
    if(minutediff < 1){
      return `${secdiff} ${Extension.times.seconds} ${Extension.times.ago}`
    }
    else if(minutediff < 60){
      if(Math.floor(minutediff) > 1){str = 's'}
      return `${Math.floor(minutediff)} ${Extension.times.minute}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 60 && minutediff < 1440){
      if(Math.floor(minutediff/60) > 1){str = 's'}
      return `${Math.floor(minutediff/60)} ${Extension.times.hour}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 1440 && minutediff < 43829){
      if(Math.floor(minutediff/1440) > 1){str = 's'}
      return `${Math.floor(minutediff/1440)} ${Extension.times.day}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 43829 && minutediff < 2592000){
      if(Math.floor(minutediff/43829) > 1){str = 's'}
      return `${Math.floor(minutediff/43829)} ${Extension.times.month}${str} ${Extension.times.ago}`
    }
    else if(minutediff >= 2592000 && minutediff < 31104000){
      if(Math.floor(minutediff/2592000) > 1){str = 's'}
      return `${Math.floor(minutediff/2592000)} ${Extension.times.year}${str} ${Extension.times.ago}`
    }
  }
