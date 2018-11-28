/**
 * 获取树形结构数据
 */
export function renderTreeData(globalVue, modId) {
  return new Promise(function(resolve) {
    globalVue.$customAxios.get('area/getAllAreaTree', {
        params: {
          roleId: globalVue.$cookies.getJSON('userInfo').roleId,
        }
      })
      .then(resq => {
        resolve(resq)
      }).catch(error => {});

  })
}