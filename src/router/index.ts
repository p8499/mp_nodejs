import Vue from 'vue'
import VueRouter, {Route} from 'vue-router'
import {stringToFilterItemsModel, stringToNumber, stringToSortModel} from "@/components/lib/pac-common";
import {USER_SPEC} from "@/components/gen/spec/UserSpec";
import {uuid} from "uuidv4";
import {INSPECTIONTYPE_SPEC} from "@/components/gen/spec/InspectionTypeSpec";
import {ROLE_SPEC} from "@/components/gen/spec/RoleSpec";
import {PRIVILEGE_SPEC} from "@/components/gen/spec/PrivilegeSpec";
import {MAINTENANCETYPE_SPEC} from "@/components/gen/spec/MaintenanceTypeSpec";
import {ENUMTYPE_SPEC} from "@/components/gen/spec/EnumTypeSpec";
import {TEMPLATE_SPEC} from "@/components/gen/spec/TemplateSpec";

Vue.use(VueRouter);

const routes = [{
    name: 'account',
    path: '/account',
    component: () => import('@/views/account.vue')
}, {
    name: 'inspection-type-list',
    path: '/inspection-type-list',
    component: () => import('@/views/inspection-type-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(INSPECTIONTYPE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'inspection-type-update',
    path: '/inspection-type-update/:itid',
    component: () => import('@/views/inspection-type-update.vue'),
    props: (route: Route) => Object({
        initItid: route.params['itid']
    })
}, {
    name: 'inspection-type-add',
    path: '/inspection-type-add',
    component: () => import('@/views/inspection-type-add.vue')
}, {
    name: 'maintenance-type-list',
    path: '/maintenance-type-list',
    component: () => import('@/views/maintenance-type-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(MAINTENANCETYPE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'maintenance-type-update',
    path: '/maintenance-type-update/:mtid',
    component: () => import('@/views/maintenance-type-update.vue'),
    props: (route: Route) => Object({
        initMtid: route.params['mtid']
    })
}, {
    name: 'maintenance-type-add',
    path: '/maintenance-type-add',
    component: () => import('@/views/maintenance-type-add.vue')
}, {
    name: 'enum-type-list',
    path: '/enum-type-list',
    component: () => import('@/views/enum-type-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(ENUMTYPE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'enum-type-update',
    path: '/enum-type-update/:etid',
    component: () => import('@/views/enum-type-update.vue'),
    props: (route: Route) => Object({
        initEtid: route.params['etid']
    })
}, {
    name: 'enum-type-add',
    path: '/enum-type-add',
    component: () => import('@/views/enum-type-add.vue')
}, {
    name: 'template-list',
    path: '/template-list',
    component: () => import('@/views/template-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(TEMPLATE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'template-update',
    path: '/template-update/:ttid',
    component: () => import('@/views/template-update.vue'),
    props: (route: Route) => Object({
        initTtid: stringToNumber(route.params['ttid'] as string)
    })
}, {
    name: 'template-add',
    path: '/template-add',
    component: () => import('@/views/template-add.vue')
}, {
    name: 'template-procedure-update',
    path: '/template-procedure-update/:tpid',
    component: () => import('@/views/template-procedure-update.vue'),
    props: (route: Route) => Object({
        initTpid: stringToNumber(route.params['tpid'] as string)
    })
}, {
    name: 'user-list',
    path: '/user-list',
    component: () => import('@/views/user-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(USER_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'user-update',
    path: '/user-update/:usid',
    component: () => import('@/views/user-update.vue'),
    props: (route: Route) => Object({
        initUsid: stringToNumber(route.params['usid'] as string)
    })
}, {
    name: 'user-add',
    path: '/user-add',
    component: () => import('@/views/user-add.vue')
}, {
    name: 'role-list',
    path: '/role-list',
    component: () => import('@/views/role-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(ROLE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'role-update',
    path: '/role-update/:roid',
    component: () => import('@/views/role-update.vue'),
    props: (route: Route) => Object({
        initRoid: route.params['roid']
    })
}, {
    name: 'role-add',
    path: '/role-add',
    component: () => import('@/views/role-add.vue')
}, {
    name: 'privilege-list',
    path: '/privilege-list',
    component: () => import('@/views/privilege-list.vue'),
    props: (route: Route) => Object({
        initFilterItemsModel: stringToFilterItemsModel(PRIVILEGE_SPEC, route.query['filter'] as string),
        initSortModel: stringToSortModel(route.query['sort'] as string),
        initPageSize: stringToNumber(route.query['page-size'] as string),
        initPageNumber: stringToNumber(route.query['page-number'] as string)
    })
}, {
    name: 'privilege-update',
    path: '/privilege-update/:prid',
    component: () => import('@/views/privilege-update.vue'),
    props: (route: Route) => Object({
        initPrid: route.params['prid']
    })
}, {
    name: 'privilege-add',
    path: '/privilege-add',
    component: () => import('@/views/privilege-add.vue')
}];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.query['uuid'] === undefined) {
        to.query['uuid'] = uuid();
        next({path: to.path, query: to.query, params: to.params});
    } else
        next();
});

export default router
