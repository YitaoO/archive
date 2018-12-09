import Taro, { Component } from "@tarojs/taro";
import { OpenData, CoverView, CoverImage } from "@tarojs/components";
import "./index.scss";
import { connect } from "@tarojs/redux";
import Dialog from "../../components/dialog";

@connect(({ userInfo, menu, treeList, car }) => ({
  userInfo,
  menu,
  treeList,
  car
}))
export default class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }
  handleMenuTab = item => {
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        choiceCar: null,
        choiceFatherId: [], //父集合
        choiceCarsId: [], //选中车辆id集合
        isMultiSelect: item.id == 1 || item.id == 6 ? false : true
      }
    });
    this.props.dispatch({
      type: "menu/saveState",
      response: {
        menuChoice: {
          index: item.id,
          title: item.title
        }
      }
    });

    if (item.id == 6) {
      Taro.navigateTo({
        url: `/pages/stateIndex/index`
      });
    } else {
      Taro.navigateTo({
        url: `/pages/searchList/index`
      });
    }
  };
  handleMenu = () => {
    const { isShow } = this.props.menu;

    this.props.dispatch({
      type: "menu/saveState",
      response: {
        isShow: !isShow
      }
    });
  };
  handleOut = () => {
    const { carUserInfo, openId } = this.props.userInfo;
    Dialog.modelDialog("是否确定解绑小程序？", () => {
      Dialog.showLoading("提交中...");
      this.props.dispatch({
        type: "menu/saveState",
        response: {
          isShow: false
        }
      });
      //清空车联树
      this.props.dispatch({
        type: "treeList/saveState",
        response: {
          listTree: [],
          isMultiSelect: true,
          choiceCar: null,
          choiceFatherId: [],
          choiceCarsId: []
        }
      });
      this.props.dispatch({
        type: "userInfo/outAdd",
        payload: {
          userKid: carUserInfo.UserKid,
          openId: openId,
          clientType: 1
        }
      });
    });
  };
  render() {
    //TODO:这里调了4次，记得优化
    const { isShow, menuData } = this.props.menu;
    let { carUserInfo, weixinUserInfo } = this.props.userInfo;
    return (
      <CoverView
        class={!!isShow ? "menu-wrap open-trans" : "menu-wrap transformHide"}
      >
        <CoverView class="menu-left">
          <CoverView class="menu-header">
            {!!weixinUserInfo.avatarUrl && (
              <CoverView class="icon-wrap">
                {/* <OpenData type="userAvatarUrl" class="icon" /> */}
                <CoverImage src={weixinUserInfo.avatarUrl} class="icon" />
              </CoverView>
            )}

            <CoverView class="right">
              <CoverView class="name">{carUserInfo.Name}</CoverView>
              <CoverView class="desp ">
                {carUserInfo.OrgName}
                {carUserInfo.DepartName ? `/${carUserInfo.DepartName}` : ""}
              </CoverView>
            </CoverView>
            <CoverView class="btn-loginout" onClick={this.handleOut}>
              解绑
            </CoverView>
          </CoverView>
          <CoverView class="nav-list">
            {menuData.map((item, index) => {
              return (
                <CoverView
                  class={`item ${!!item.isShow ? "" : "hide"}`}
                  key={item.id}
                  onClick={this.handleMenuTab.bind(this, item)}
                >
                  <CoverImage src={item.iconPath} class="image" />
                  <CoverView class="title">{item.title}</CoverView>
                </CoverView>
              );
            })}
          </CoverView>
        </CoverView>
        <CoverView class="mask" onTap={this.handleMenu} />
      </CoverView>
    );
  }
}
