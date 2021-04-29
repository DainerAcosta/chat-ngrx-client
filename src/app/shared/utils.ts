import { RouterStateSerializer } from "@ngrx/router-store";
import { Params, RouterStateSnapshot } from "@angular/router";

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params
}

export class CustomRouterStateSerializer
    implements RouterStateSerializer<RouterStateUrl> {
        serialize(routerState: RouterStateSnapshot): RouterStateUrl {
            throw new Error("Method not implemented.");
        }
        serealize(routerState: RouterStateSnapshot): RouterStateUrl {
            let route = routerState.root;

            while(route.firstChild) {
                route = route.firstChild;
            }

            const {url, root: {queryParams}} = routerState;
            const { params } = route;

            return { url, params, queryParams };
        }
    }