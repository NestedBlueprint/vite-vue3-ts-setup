import { createStore } from "vuex";
import { App } from "vue"; //导入的事App类型
import { getAdminInfoApi } from "@/request/api";
import { resolve } from "path";
import { rejects } from "assert";

const store = createStore({
	state() {
		let adminInfo:AdminInfoRes
		return {
			adminInfo: {
				icon: "",
				menus: [
					{
						id: 0,
						parentId: 0,
						createTime: "",
						title: "",
						level: 0,
						sort: 0,
						name: "",
						icon: "",
						hidden: 0,
					},
				],
				roles: [""],
				username: "",
			},
			
		};
	},
	getters: {
		getNewMenus(state):NewMenusItf {
            const newMenus: NewMenusItf = {}; //需要保存id 和菜单名称，对象比数组更合适
			state.adminInfo.menus.sort((a, b) => {
				return a.parentId - b.parentId;
            }).forEach(m => {
                if (m.parentId === 0) {
                    newMenus[m.id] = {...m,children:[]}//一级菜单
                } else {
                    newMenus[m.parentId].children?.push(m)//二级菜单
                }
            })        
            return newMenus
		},
	},
	mutations: {
		updateMenus(state, adminInfo: AdminInfoRes) {
			state.adminInfo = adminInfo;
		},
	},
	actions: {
		getAdminInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getAdminInfoApi().then((res) => {
					if (res.code === 200) {
						commit("updateMenus", res.data);
						resolve(res.data);
					} else {
						reject(res);
					}
				});
			}
			)
		},
	},
});


export const initStore = (app: App<Element>) => app.use(store);

export default store
