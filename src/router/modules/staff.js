/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const staffRouter = {
  path: '/staff',
  component: Layout,
  name: 'staff',
  meta: {
    title: 'staff',
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
      path: 'staffHome',
      component: () => import('@/views/components-staff/staff_index'),
      name: 'staffHome',
      meta: { title: 'staffHome' }
    },
    {
      path: 'newStaffInsert',
      component: () => import('@/views/components-staff/staff_insert'),
      name: 'newStaffInsert',
      meta: { title: 'newStaffInsert' }
    }
  ]
}

export default staffRouter
