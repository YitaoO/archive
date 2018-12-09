import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import md5 from "md5";
import { View, Input, Button } from "@tarojs/components";
import Dialog from "../../components/dialog";
import "./index.scss";

@connect(({ userInfo }) => ({
  openId: userInfo.openId
}))
class Registration extends Component {
  config = {
    navigationBarTitleText: "注册"
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: ""
    };
    this.handleRes = this.handleRes.bind(this);
    this.inputPhoneChange = this.inputPhoneChange.bind(this);
    this.inputPassChange = this.inputPassChange.bind(this);
  }
  // 输入框变化
  inputPhoneChange = e => {
    this.setState({
      userId: e.detail.value
    });
  };
  inputPassChange = e => {
    this.setState({
      password: e.detail.value
    });
  };

  handleRes = e => {
    let weixinUserInfo = e.detail.userInfo;
    let userId = this.state.userId;
    let password = this.state.password;

    if (this.state.userId == "" || this.state.password == "") return;

    this.props.dispatch({
      type: "userInfo/saveUserInfo",
      response: {
        weixinUserInfo: weixinUserInfo
      }
    });
    Dialog.showLoading("提交中...");

    this.props.dispatch({
      type: "userInfo/weixinAdd",
      payload: {
        password: md5(password),
        userId: userId,
        openId: this.props.openId,
        clientType: 1,
        nickName: weixinUserInfo.nickName
      }
    });
  };

  render() {
    return (
      <View className="res-wrap">
        <View className="wrap-center">
          <View className="item grid-list">
            <View className="icon-wrap grid-list-item">
              <View className="icon id" />
            </View>
            <View className="grid-list-item input-wrap">
              <Input
                className="input"
                placeholder-style="color:#999"
                placeholder="请输入用户ID"
                type="number"
                maxLength="8"
                onInput={this.inputPhoneChange}
                value={this.state.userId}
              />
            </View>
          </View>
          <View className="item grid-list">
            <View className="icon-wrap grid-list-item">
              <View className="icon phone" />
            </View>
            <View className="grid-list-item input-wrap">
              <Input
                className="input"
                placeholder-style="color:#999"
                placeholder="请输入密码"
                type="password"
                onInput={this.inputPassChange}
                value={this.state.password}
              />
            </View>
          </View>
        </View>
        <View className="btn-wrap">
          <Button
            type="primary"
            size="default"
            open-type="getUserInfo"
            lang="zh_CN"
            onGetuserinfo={this.handleRes}
          >
            注册
          </Button>
        </View>
      </View>
    );
  }
}

export default Registration;
