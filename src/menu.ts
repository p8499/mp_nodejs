import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

export default [
    new PacMenuItemModel('巡视维保').append(
        new PacMenuItemModel('系统设置', 'user-list').append(
            new PacMenuItemModel('巡视类型', 'inspection-type-list'),
            new PacMenuItemModel('维保类型', 'maintenance-type-list'),
            new PacMenuItemModel('枚举类型', 'enum-type-list'),
        )
    ),
    new PacMenuItemModel('权限管理').append(
        new PacMenuItemModel('用户', 'user-list'),
        new PacMenuItemModel('角色', 'role-list'),
        new PacMenuItemModel('权限', 'privilege-list'),
    ),
];