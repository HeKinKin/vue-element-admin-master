/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/rule',
  component: Layout,
  name: 'rule',
  meta: {
    title: 'rule',
    icon: 'chart'
  },
  children: [
    {
      path: 'growthRule',
      component: () => import('@/views/components-growthValue/growthRule'),
      name: 'growthRule',
      meta: { title: 'growthRule' }
    },
    {
      path: 'editGrowthRule',
      component: () => import('@/views/components-growthValue/editGrowthRule'),
      name: 'editGrowthRule',
      show: {show: 'noshow'},
      meta: { title: 'editGrowthRule'}
    },
    {
      path: 'newGrowthRule',
      component: () => import('@/views/components-growthValue/newGrowthRule'),
      name: 'newGrowthRule',
      show: {show: 'noshow'},
      meta: { title: 'newGrowthRule'}
    }
  ]
}

export default chartsRouter
