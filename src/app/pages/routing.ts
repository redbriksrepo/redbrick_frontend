import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'new-proposal',
  //   loadChildren: () =>
  //     import('./new-proposal/new-proposal.module').then((m) => m.NewProposalModule),
  // },
  {
    path: 'new-proposal',
    loadChildren: () =>
      import('./new-proposal/new-proposal.module').then((m) => m.NewProposalModule),
  },
  {
    path: 'old-proposal',
    loadChildren: () =>
      import('./old-proposal/old-proposal.module').then((m) => m.OldProposalModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/user.module').then((m) => m.UserModule)
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule)
  },
  {
    path: 'location-details/:location',
    loadChildren: () =>
      import('./location-preview/location-preview.module').then((m) => m.LocationPreviewModule)
  },
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch: 'full'
  }
]

export { Routing }