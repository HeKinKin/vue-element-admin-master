/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const staffUpdateRouter = {
  path: '/staffUpdate',
  component: Layout,
  name: 'staffUpdate',
  meta: {
    title: 'staffUpdate',
    icon: 'chart'
  },
  children: [
    {
      path: 'staffUpdateMessafe',
      component: () => import('@/views/components-staff/staff_update'),
      name: 'staffUpdateMessafe',
      meta: { title: 'staffUpdateMessafe' }
    }
  ]
}

export default staffUpdateRouter
