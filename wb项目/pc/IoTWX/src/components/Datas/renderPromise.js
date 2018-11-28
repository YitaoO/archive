/**
 * 按钮权限数据
 */
export default function renderTreeData(globalVue, parent) {
  return new Promise(function(resolve) {
    globalVue.$customAxios.get('module/selectButton', {
        params: {
          roleId: globalVue.$cookies.getJSON('userInfo').roleId,
          parent: parent,
          isAdmin: globalVue.$cookies.getJSON('userInfo').isAdmin

        }
      })
      .then(resq => {
        resolve(resq)
      }).catch(error => {});

  })
}