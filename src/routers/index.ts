import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [  
  // {
  //   component: asyncComponent(() => import('../containers/address/addressinfo')),
  //   path: '/address/:address',
  // },
  {
    component: asyncComponent(() => import('../containers/myaccount/layout')),
    path: '/myaccount',
    children:[
      {
        component: asyncComponent(() => import('../containers/myaccount/setting')),
        path: '/myaccount/setting',
      },
      {
        component: asyncComponent(() => import('../containers/myaccount/bonus')),
        path: '/myaccount/bonus',
      },
      {
        component: asyncComponent(() => import('../containers/myaccount/bind')),
        path: '/myaccount/bind',
      },
      {
        component: asyncComponent(() => import('../containers/myaccount/mydomain')),
        path: '/myaccount/mydomain',
      },
      {
        component: asyncComponent(() => import('../containers/myaccount/balance')),
        path: '/myaccount/balance',
      },
    ]
  },
  {
    component: asyncComponent(() => import('../containers/askform/askbuytable')),
    path: '/askbuytable/:domain',
  },
  {
    component: asyncComponent(() => import('../containers/askform/selltable')),
    path: '/selltable',
  },
  {
    component: asyncComponent(() => import('../containers/domianinfo/askbuy')),
    path: '/askbuyinfo/:domain',
  },
  {
    component: asyncComponent(() => import('../containers/domianinfo/saleinfo')),
    path: '/saleinfo/:domain',
  },
  {
    component: asyncComponent(() => import('../containers/bourse/layout')),
    path: '/bourse',
    children:[
      {
        component: asyncComponent(() => import('../containers/bourse/mydeity')),
        path: '/bourse/mydeity',
      },
      {
        component: asyncComponent(() => import('../containers/bourse/txhistory')),
        path: '/bourse/txhistory',
      },
      {
        component: asyncComponent(() => import('../containers/bourse/askbuymarket')),
        path: '/bourse/askbuymarket',
      },
      {
        component: asyncComponent(() => import('../containers/bourse/salemarket')),
        path: '/bourse/salemarket',
      },
    ]
  },
  {
    component: asyncComponent(() => import('../containers/search/index')),
    path: '/search',
  },
  {
    component: asyncComponent(() => import('../containers/notfound')),
    path: '/:any',
  },
  {
    component: asyncComponent(() => import('../containers/home')),
    exact: true,
    path: '/',
  },
];

