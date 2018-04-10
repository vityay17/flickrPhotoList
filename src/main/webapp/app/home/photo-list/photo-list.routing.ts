import { Routes, RouterModule } from '@angular/router';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const routes: Routes = [
    {
        path: 'photos/:userid',
        component: PersonDetailComponent,
        data: {
            pageTitle: 'Person'
        }
    }
];

export const PhotoListRoutes = RouterModule.forChild(routes);
