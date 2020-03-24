/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/member',
  component: Layout,
  name: 'member',
  meta: {
    title: 'member',
    icon: 'chart'
  },
  // children: [
  //   {
  //     path: 'memberList',
  //     component: () => import('@/component/memberComponent/showMemberList'),
  //     name: 'memberList',
  //     meta: { title: 'memberList'}
  //   }
  // ]
  children: [
    {
      path: 'memberList',
      component: () => import('@/views/components-member/showMemberList'),
      name: 'memberList',
      meta: { title: 'memberList' }
    },
    {
      path: 'memberLevel',
      component: () => import('@/views/components-member/memberLevel'),
      name: 'memberLevel',
      meta: { title: 'memberLevel' }
    },
    {
      path: 'memberPrivilege',
      component: () => import('@/views/components-member/memberPrivilege'),
      name: 'memberPrivilege',
      meta: { title: 'memberPrivilege' }
    },
    {
      path: 'onlyMemberList',
      component: () => import('@/views/components-member/onlyMemberList'),
      name: 'onlyMemberList',
      show: {show: 'noshow'},
      meta: { title: 'onlyMemberList' }
    },
    {
      path: 'memberCards',
      component: () => import('@/views/components-member/memberCards'),
      name: 'memberCards',
      meta: { title: 'memberCards' }
    }
  ]
}

export default chartsRouter
