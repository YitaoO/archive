import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Image } from "@tarojs/components";
import ArrowUpIcon from "../../images/choiceCar_up_icon.png";
import ArrowDownIcon from "../../images/choiceCar_down_icon.png";
import CheckALLIcon from "../../images/chiceCar_check_box_all_con.png";
import CheckNoIcon from "../../images/chiceCar_check_box_no_con.png";
import CheckOnIcon from "../../images/chiceCar_check_box_on_con.png";

import "./index.scss";
@connect(({ userInfo, treeList, projectType, menu }) => ({
  userInfo,
  treeList,
  projectType,
  menu
}))
class ChoiceCar extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { menuChoice } = this.props.menu;
    Taro.setNavigationBarTitle({
      title: menuChoice.index == 6 ? "项目选择" : "车辆选择"
    });
  }

  // 点击箭头
  handleArrow = item => {
    const { carListTree, projectList } = this.props.treeList;
    const { menuChoice } = this.props.menu;
    let dvaList = menuChoice.index == 6 ? projectList : carListTree;
    let choiceName =
      menuChoice.index == 6 ? "choiceProjectItem" : "choiceCarItem";
    let lists = Array.from(dvaList);
    lists.forEach(listItem => {
      if (listItem.id == item.id) {
        listItem.isShow = !listItem.isShow;
      }

      listItem.children.forEach(childItem => {
        if (childItem.patherId == item.id) {
          childItem.isShow = !childItem.isShow;
        }
      });
    });
    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        [`${choiceName}`]: lists
      }
    });
  };

  // 点击父亲
  handlePathter = item => {
    const { menuChoice } = this.props.menu;

    const {
      isMultiSelect,
      carListTree,
      projectList,
      choiceFatherId
    } = this.props.treeList;
    let orgList = menuChoice.index == 6 ? projectList : carListTree;

    if (!isMultiSelect) {
      if (menuChoice.index != 6) return;
      this.renderSingle(item);
    } else {
      this.renderMultiSelect(choiceFatherId, "choiceFatherId", item.id).then(
        lists => {
          let saveList = [];
          Array.from(orgList).forEach(listItem => {
            listItem.children.forEach(childItem => {
              if (lists.includes(String(childItem.patherId))) {
                saveList.push(childItem.id);
              }
            });
          });
          this.props.dispatch({
            type: "treeList/saveState",
            response: {
              choiceChildId: saveList
            }
          });
        }
      );
    }
  };
  renderMultiSelect = (parantList, name, id) => {
    return new Promise(resolve => {
      let project = Array.from(parantList);
      if (!!project.includes(String(id))) {
        project.splice(
          project.findIndex((value, index, arr) => {
            return value === id;
          }),
          1
        );
      } else {
        project.push(String(id));
      }

      if (parantList.length == 0) {
        this.props.dispatch({
          type: "treeList/saveState",
          response: {
            choiceChildId: []
          }
        });
      }

      this.props.dispatch({
        type: "treeList/saveState",
        response: {
          [`${name}`]: project
        }
      });
      resolve(project);
    });
  };
  // 点击儿子
  handleChildren = item => {
    const { isMultiSelect, choiceChildId } = this.props.treeList;

    if (!isMultiSelect) {
      this.renderSingle(item);
    } else {
      this.renderMultiSelect(choiceChildId, "choiceChildId", item.id);
    }
  };
  //单选
  renderSingle = item => {
    const { menuChoice } = this.props.menu;
    let saveName =
      menuChoice.index == 6 ? "choiceProjectItem" : "choiceCarItem";

    this.props.dispatch({
      type: "treeList/saveState",
      response: {
        [`${saveName}`]: {
          text: item.text,
          id: item.id,
          isFather: item.isFather,
          attributes: item.attributes
        }
      }
    });
    //项目无车辆滞空
    if (menuChoice.index == 6) {
      const { choiceProjectItem } = this.props.treeList;
      const { projectTypeList } = this.props.projectType;
      let arr = [];

      if (!!projectTypeList) {
        Object.keys(projectTypeList).forEach(key => {
          if (key == choiceProjectItem.attributes.departId) {
            let lists = projectTypeList[key];
            Object.keys(lists).forEach(childKey => {
              arr.push({
                typeName: lists[childKey].typeName,
                typeId: lists[childKey].typeId
              });
            });
          }
        });
      }
      this.props.dispatch({
        type: "projectType/saveState",
        response: {
          typeArr: arr,
          choiceProjectType: {
            typeName: "全部",
            typeId: -1
          }
        }
      });
    }

    Taro.navigateBack({
      delta: 1
    });
  };
  render() {
    const {
      isMultiSelect,
      projectList,
      carListTree,
      choiceFatherId,
      choiceChildId
    } = this.props.treeList;
    const { menuChoice } = this.props.menu;
    let orgList = menuChoice.index == 6 ? projectList : carListTree;
    return (
      <View className="choiceCar-wrap">
        {orgList.map(item => {
          return (
            <View className="item" key={item.id}>
              <View key={item.id} className="father-wrap">
                <View
                  className="arrow-wrap"
                  onClick={this.handleArrow.bind(this, item)}
                >
                  <Image
                    className="image-arrow"
                    src={!!item.isShow ? ArrowUpIcon : ArrowDownIcon}
                  />
                </View>
                {!!isMultiSelect && (
                  <View className="check-wrap">
                    <Image
                      className="check-icon"
                      onClick={this.handlePathter.bind(this, item)}
                      src={
                        choiceFatherId.includes(String(item.id))
                          ? CheckALLIcon
                          : CheckNoIcon
                      }
                    />
                  </View>
                )}

                <View
                  className={`wrap-name ${!isMultiSelect ? "isMul" : ""}`}
                  onClick={this.handlePathter.bind(this, item)}
                >
                  {item.text}
                </View>
              </View>
              <View className="child-wrap">
                {item.children.map(childItem => {
                  return (
                    <View key={childItem.id}>
                      {childItem.isShow && (
                        <View className="wrap">
                          <View
                            key={childItem.id}
                            className="child-item"
                            onClick={this.handleChildren.bind(this, childItem)}
                          >
                            {!!isMultiSelect && (
                              <View className="check-wrap">
                                <Image
                                  className="check-icon"
                                  src={
                                    choiceChildId == childItem.id ||
                                    choiceChildId.includes(String(childItem.id))
                                      ? CheckALLIcon
                                      : CheckNoIcon
                                  }
                                />
                              </View>
                            )}

                            <View className="wrap-name">
                              {" "}
                              <Text>{childItem.text}</Text>
                              {"   "}
                              <Text>{childItem.desText}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default ChoiceCar;
