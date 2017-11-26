import {
  param2Obj
} from '@/utils'
const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  regionalManager: {
    role: ['regionalManager'],
    token: 'regionalManager',
    introduction: '我是大区经理',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'regional manager'
  },
  districtManager: {
    role: ['districtManager'],
    token: 'districtManager',
    introduction: '我是小区经理',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'district manager'
  },
  group: {
    role: ['group'],
    token: 'group',
    introduction: '集团',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'group'
  },
  dealer: {
    role: ['dealer'],
    token: 'dealer',
    introduction: '经销商',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'dealer'
  }
}

export default {
  loginByUsername: config => {
    const {
      username
    } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const {
      token
    } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
