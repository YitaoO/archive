/**
 * 获取头部菜单数据
 * this : 当前vue对象
 * modId : 区域id
 */
let noMenu = [
  {
    modId: 0,
    name: "设置",
    moduleList: [],
    checked: false
  }
];
export function renderMenuData(globalVue, modId) {
  let userInfo = globalVue.$cookies.getJSON("userInfo");
  return new Promise(function(resolve) {
    if (userInfo != null && userInfo.compId == null && !!userInfo.isAdmin) {
      resolve(noMenu);
    }
    globalVue.$customAxios
      .get("module/selectModule", {
        params: {
          roleId: userInfo.roleId,
          parent: modId,
          isAdmin: userInfo.isAdmin
        }
      })
      .then(resq => {
        resolve(resq);
      })
      .catch(error => {});
  });
}

/**
 * 获取子菜单数据
 * this : 当前vue对象
 * modId : 区域id
 */
export function renderNavData(globalVue, modId) {
  return new Promise(function(resolve) {
    globalVue.$customAxios
      .get("module/selectModuleTreeByParent", {
        params: {
          roleId: globalVue.$cookies.getJSON("userInfo").roleId,
          parent: modId,
          isAdmin: globalVue.$cookies.getJSON("userInfo").isAdmin
        }
      })
      .then(resq => {
        resolve(resq);
      })
      .catch(error => {});
  });
}
