/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const organizationRouter = {
  path: '/organizationManage',
  component: Layout,
  name: 'organizationManage',
  meta: {
    title: 'organizationManage',
    icon: 'chart'
  },
  children: [
    {
      path: 'organizationStructure',
      component: () => import('@/views/components-organization/organization_manage'),
      name: 'organizationStructure',
      meta: { title: 'organizationStructure' }
    },
    {
      path: 'position',
      component: () => import('@/views/components-organization/organization_position'),
      name: 'position',
      meta: { title: 'position' }
    }
  ]
}

export default organizationRouter
