import store from "@/store";
import { definePropType } from "element-plus/es/utils";
import Cookies from "js-cookie";
import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/login.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/home/home.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// const store = useStore()

const createRoute = () => {
	const menus = store.getters.getNewMenus;
	// console.log(menus);
	for (let key in menus) {
		const newRoute: RouteRecordRaw = {
			path: "/" + menus[key].name,
			name: menus[key].name,
			component: () => import("@/views/home/home.vue"),
			redirect: "/" + menus[key].name + "/" + menus[key].children[0].name,
			children: [],
			meta: { title: menus[key].title },
		};
		for (let i = 0; i < menus[key].children.length; i++) {
			newRoute.children?.push({
				path: menus[key].children[i].name,
				name: menus[key].children[i].name,
				component: () =>
					import(
						`../views/${menus[key].name}/${menus[key].children[i].name}.vue`
					),
				meta: { title:  menus[key].children[i].title },
			});
		}
		router.addRoute(newRoute);
	}
	// 动态添加首页
	// router.addRoute({
	// 	path: "/",
	// 	name: "home",
	// 	component: () => import("../views/home/home.vue"),
	// 	redirect: "/index",
	// 	children: [
	// 		{
	// 			path: "index",
	// 			name: "index",
	// 			component: () => import("../views/index/index.vue"),
	// 		},
	// 	],
	// });
};
//前置导航守卫
router.beforeEach((to, from, next) => {
	const token = Cookies.get("token");
	// console.log("beforeEach:", from.path, to.path);
	if (token && store.state.adminInfo.menus.length <= 1) {
		//菜单为空
		console.log("菜单为空");
		store.dispatch("getAdminInfo").then(() => {
			console.log("生成路由");
			createRoute(); //生成路由对象
			next(to);
		});
	} else if (
		token &&
		store.state.adminInfo.menus.length > 1 &&
		from.path === "/login" &&
		to.path === "/home"
	) {
		console.log("有token,有菜单，login跳home");
		createRoute();
		next();
	} else if (!token && to.path !== "/login") {
		console.log("无token,跳转login");
		next("/login");
	}
	else if (token && to.path === "/login") {
		console.log("有token,进入login,跳转");
		next();
	} else {
		console.log("其余跳转", from.path, to.path);
		next();
	}
});

// export default router
export const initRouter = (app: App<Element>) => app.use(router);
