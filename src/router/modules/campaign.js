/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/campaign',
  component: Layout,
  name: 'campaign',
  meta: {
    title: 'campaign',
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
      path: 'campaignHome',
      component: () => import('@/views/components-campaign/Campaign'),
      name: 'campaignHome',
      meta: { title: 'campaignHome' }
    },
    {
      path: 'addCampaign',
      component: () => import('@/views/components-campaign/addCampaign'),
      name: 'addCampaign',
      show: {show: 'noshow'},
      meta: { title: 'addCampaign'}
    },
    {
      path: 'addUpgradeCampaign',
      component: () => import('@/views/components-campaign/addUpgradeCampaign'),
      name: 'addUpgradeCampaign',
      show: {show: 'noshow'},
      meta: { title: 'addUpgradeCampaign'}
    },
    {
      path: 'couponTemplate',
      component: () => import('@/views/components-campaign/couponTemplate'),
      name: 'couponTemplate',
      meta: { title: 'couponTemplate'}
    },
    {
      path: 'cancelCouponDetails',
      component: () => import('@/views/components-campaign/CancelCouponDetails'),
      name: 'cancelCouponDetails',
      meta: { title: 'cancelCouponDetails'}
    },
    {
      path: 'cancelCouponMore',
      component: () => import('@/views/components-campaign/CancelCouponMore'),
      name: 'cancelCouponMore',
      show: {show: 'noshow'},
      meta: { title: 'cancelCouponMore'}
    },
    {
      path: 'insertCouponTemplate',
      component: () => import('@/views/components-campaign/insertCouponTemplate'),
      name: 'insertCouponTemplate',
      show: {show: 'noshow'},
      meta: { title: 'insertCouponTemplate'}
    },
    {
      path: 'editCouponTemplate',
      component: () => import('@/views/components-campaign/editCouponTemplate'),
      name: 'editCouponTemplate',
      show: {show: 'noshow'},
      meta: { title: 'editCouponTemplate'}
    },
    {
      path: 'onlyCampaignList',
      component: () => import('@/views/components-campaign/onlyCampaignList'),
      name: 'onlyCampaignList',
      show: {show: 'noshow'},
      meta: { title: 'onlyCampaignList'}
    },
    {
      path: 'editUpgrade',
      component: () => import('@/views/components-campaign/editUpgrade'),
      name: 'editUpgrade',
      show: {show: 'noshow'},
      meta: { title: 'editUpgrade'}
    },
    {
      path: 'campaignDetails',
      component: () => import('@/views/components-campaign/CampaignDetails'),
      name: 'campaignDetails',
      show: {show: 'noshow'},
      meta: { title: 'campaignDetails'}
    },
    {
      path: 'couponList',
      component: () => import('@/views/components-campaign/couponList'),
      name: 'couponList',
      meta: { title: 'couponList'}
    }
  ]
}

export default chartsRouter
