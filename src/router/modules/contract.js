/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const contractRouter = {
  path: '/contract',
  component: Layout,
  name: 'contract',
  meta: {
    title: 'contract',
    icon: 'chart'
  },
  children: [
    {
      path: 'contractHome',
      component: () => import('@/views/components-contract/contract'),
      name: 'contractHome',
      meta: { title: 'contractHome' }
    },
    {
      path: 'money',
      component: () => import('@/views/components-contract/money'),
      name: 'money',
      meta: { title: 'money' }
    },
    {
      path: 'check',
      component: () => import('@/views/components-contract/check'),
      name: 'check',
      meta: { title: 'check' }
    }
  ]
}

export default contractRouter
