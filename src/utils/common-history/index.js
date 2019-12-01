/**
 * 路由跳转方法
 * @param comp 传入调用该方法时所在组件的this
 * @param path 路由配置的路径
 * @param param 跳转传到另一个组件的参数
 */
export const href = (comp, path, param) => {
  if (!comp) {
    throw new Error("comp should not be empty");
  }
  if (!path || typeof path !== 'string') {
    throw new Error("path parameters should be not empty and type is String!");
    return;
  }
  const parameters = param || {};
  comp.props.history.push({
    pathname: path,
    state: parameters
  });
};

/**
 * 组件中获取通过路由跳转传过来的参数
 * @param comp 传入调用该方法时所在组件的this
 * @returns {*}
 */
export const getParam = (comp) => {
  if (!comp) {
    throw new Error("comp should not be empty");
  }
  return comp.props.location.state;
};

/**
 * 通用的返回上一级页面的方法，不传参数，默认认为返回上一级页面，-2，代表返回上上级页面，以此类推...
 * @param num -1、-2、-3...
 */
export const back = (num) => {
  if (!num) {
    history.back();
  } else {
    history.go(num);
  }
};