module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  rules: {
    // @sentor831 确认下面的规则应该怎么处理比较妥当
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
