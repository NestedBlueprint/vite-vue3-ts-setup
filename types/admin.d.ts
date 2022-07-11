type role="商品管理员"|"订单管理员"|"超级管理员"
interface menu {
[x: string]: any;
	id: number;
	parentId: number;
	createTime: string;
	title: string;
	level: number;
	sort: number;
	name: string;
	icon: string;
	hidden: number;
}
interface AdminInfoRes {
	icon: string;
	menus: menu[];
	roles: role[];
	username: string;
}

interface NewMenu extends menu {
	children?: NewMenu[];
}
interface NewMenusItf  {
	[key: number]: NewMenu;
}