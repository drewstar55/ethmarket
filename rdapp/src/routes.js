import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>;
}

const Admin = Loadable({
  loader: () => import('./views/Admin'),
  loading: Loading,
});

const Stores = Loadable({
  loader: () => import('./views/Stores'),
  loading: Loading,
});

const StoreOwners = Loadable({
  loader: () => import('./views/StoreOwners'),
  loading: Loading,
});

const MyStores = Loadable({
  loader: () => import('./views/MyStores'),
  loading: Loading,
});

const routes = [
  { path: '/admin', name: 'Admin', component: Admin },
  {path: '/stores' , exact: true , name: 'Stores' , component: Stores },
  {path: '/storeowners', exact: true, name: 'Store Owners', component: StoreOwners},
  {path: '/mystores' , exact: true , name: 'My Stores' , component: MyStores }
];

export default routes;
