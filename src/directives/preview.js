import _ from 'lodash';

let retrImage = _.throttle((u) => {
  return fetch(u, {headers: {accept: 'image/png'}}).then(r => {
    return r.ok ? r.blob():Promise.reject(r.statusText)
  }).then(b => {
    return URL.createObjectURL(b)
  })
}, 100, {leading: true})

export default {
  bind(el, binding, vn) {
    retrImage(binding.value).then(u => el.src = u);
  },
}
