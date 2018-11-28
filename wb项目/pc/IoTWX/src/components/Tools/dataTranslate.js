import Vue from 'vue'

function baseAreaSetTabletree (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.areaList && record.areaList.length > 0) {
      let data = baseAreaSetTabletree(record.areaList, record, _level, expandedAll)
      tmp = tmp.concat(data)
    }
  })
  return tmp
}
function baseDeviceSetTabletree (data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.devices && record.devices.length > 0) {
      let data = baseDeviceSetTabletree(record.devices, record, _level, expandedAll)
      tmp = tmp.concat(data)
    }
  })
  return tmp
}

export {baseAreaSetTabletree, baseDeviceSetTabletree}
