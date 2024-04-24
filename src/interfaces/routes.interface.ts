import { Router } from 'express';
export interface Routes {
  path?: string;
  // apiVersions?: ApiVersions;
  router: Router;
}
