export function get (path, callback) {
  function done (err, result) {
    if (callback) callback(err, result)
    callback = null
  }

  function listener () {
    done(null, this.responseText)
  }

  function error (evt) {
    let err = new Error('An error occurred while transferring the file.')
    err.event = event
    err.path = path
    done(err)
  }

  function cancelled () {
    let err = new Error('The transfer has been cancelled by the user.')
    err.event = event
    err.path = path
    done(err)
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', listener)
  req.addEventListener('error', error)
  req.addEventListener('abort', cancelled)
  req.open('GET', path)
  req.send()
}

export function post (path, data, callback) {
  function done (err, result) {
    if (callback) callback(err, result)
    callback = null
  }

  function listener () {
    done(null, this.responseText)
  }

  function error (evt) {
    let err = new Error('An error occurred while transferring the file.')
    err.event = event
    err.path = path
    done(err)
  }

  function cancelled () {
    let err = new Error('The transfer has been cancelled by the user.')
    err.event = event
    err.path = path
    done(err)
  }

  var req = new XMLHttpRequest()
  req.addEventListener('load', listener)
  req.addEventListener('error', error)
  req.addEventListener('abort', cancelled)
  req.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
  req.open('POST', path)
  req.send(JSON.stringify(data))
}

export function file (path, callback) {
  if (process && process.release && process.release.name === 'node') {
    let fs = global['require']('fs')
    fs.readFile(path, 'utf8', callback)
  } else {
    get(path, callback)
  }
}
