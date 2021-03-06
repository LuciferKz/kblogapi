const MESSAGE = {
  SUCCESS_REQUEST: '请求成功!',
  SUCCESS_REGISTER: '注册成功!',
  SUCCESS_LOGIN: '登录成功!',
  SUCCESS_AUTHENTICATE: '用户认证成功!',
  SUCCESS_REMOVE_USER: '用户已删除!',
  SUCCESS_UPDATE_USER: '用户已更新!',
  SUCCESS_GET_ARTICLE: '成功获取文章!',
  SUCCESS_INSERT_ARTICLE: '新建文章成功!',
  SUCCESS_UPDATE_ARTICLE: '成功更新文章!',
  SUCCESS_REMOVE_ARTICLE: '成功删除文章!',
  SUCCESS_INSERT_CATEGORY: '新建文章类别成功!',
  SUCCESS_UPDATE_CATEGORY: '成功修改文章分类!',
  SUCCESS_REMOVE_CATEGORY: '成功删除文章分类!',
  SUCCESS_INSERT_ROLE: '成功新建角色',
  SUCCESS_UPDATE_ROLE: '成功修改角色',
  SUCCESS_REMOVE_ROLE: '成功删除角色',
  ERROR_USER_NOT_EXSIT: '用户不存在!',
  ERROR_WRONG_PASS: '密码错误!',
  ERROR_USER_NOT_LOGIN: '用户未登录!',
  ERROR_USER_EXPIRED: '登录超时!',
  ERROR_USER_EXSIT: '用户名已注册!',
  ERROR_CATEGORY_EXSIT: '文章类别已存在!',
  ERROR_ROLE_EXSIT: '角色已存在!',
  ERROR_USER_ID: '用户ID不正确',
  SUCCESS_GET_PERMISSIONS: '成功获取权限列表!',
  SUCCESS_INSERT_PERMISSION: '成功新建权限!',
  SUCCESS_UPDATE_PERMISSION: '成功修改权限!',
  SUCCESS_REMOVE_PERMISSION: '成功删除权限!',
  ERROR_PERMISSION_EXSIT: '权限已存在!',
}

const STATUS = {
  SUCCESS: 20000,
  FAIL_TO_GET_PARAM: 10000,
  FAIL_TO_QUERY: 10001,
  FAIL_TO_OPERATE_DATA: 10002,
  ERROR_RESULT: 10004
}

module.exports = {
  MESSAGE,
  STATUS
};
