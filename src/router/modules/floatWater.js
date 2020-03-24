/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/FloatWater',
  component: Layout,
  name: 'FloatWater',
  meta: {
    title: 'FloatWater',
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
      path: 'floatWater',
      component: () => import('@/views/components-floatWater/FloatWater'),
      name: 'floatWater',
      meta: { title: 'floatWater' }
    },
    {
      path: 'editGrowthRule',
      component: () => import('@/views/components-growthValue/editGrowthRule'),
      name: 'editGrowthRule',
      show: {show: 'noshow'},
      meta: { title: 'editGrowthRule'}
    }
  ]
}

export default chartsRouter
