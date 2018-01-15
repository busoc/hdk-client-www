const path = require('path');

import moment from 'moment';

function strftime(v, p) {
  if ( !p ) {
    p = 'YYYY-MM-DD'
  }
  return moment(v).utc().format(p);
}

function ref(p, h) {
  let m = moment(p.timestamp).utc();
  let ts = m.subtract(m.minute()%5, 'm').format("YYYY/DDDD/HH/mm");
  return h + path.join(instanceName(p.instance), typeName(p.channel), modeName(p.realtime), p.origin, ts, p.reference);
}

function instanceName(i) {
  switch (i) {
  case 255:
    return "OPS"
  case 1:
  case 2:
    return "SIM"+i
  case 0:
    return "TEST"
  default:
    return ""
  }
}

function typeName(c) {
  switch (c) {
  case 3:
    return "sciences"
  case 1:
  case 2:
    return "images"
  }
}

function modeName(r) {
  return r ? "realtime" : "playback"
}

export {strftime, ref, modeName, instanceName};
