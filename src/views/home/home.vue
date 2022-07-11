<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<h3>
					我的商品管理系统 <el-icon id="menuicon"><Menu /></el-icon>
					<el-icon><component :is="i"></component></el-icon>
				</h3>

				<el-dropdown>
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>首页</el-dropdown-item>
							<el-dropdown-item>退出</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						active-text-color="#ffd04b"
						background-color="#545c64"
						class="el-menu-vertical-demo"
						default-active="1"
						text-color="#fff"
						:router="true"
					>
						<el-sub-menu
							:index="index"
							v-for="(item, index) in newMenus"
							:key="index"
						>
							<template #title>
								<el-icon><component is="goods"></component></el-icon>
								<span>{{ item.title }}</span>
							</template>
							<template v-for="subMenu in item.children">
								<el-menu-item
									v-if="!subMenu.hidden"
									:key="subMenu.id"
									@click="menuClicked(item, subMenu)"
									:index="'/' + item.name + '/' + subMenu.name"
								>
									<el-icon><component is="apple"></component></el-icon>
									{{ subMenu.title }}</el-menu-item
								>
							</template>
						</el-sub-menu>
					</el-menu>
				</el-aside>
				<el-main>
					<div>
						<router-link @click="goHome" to="/home">首页</router-link>
						<template v-if="!hideMenu">
							/
							<router-link @click="goMainMenu" :to="menuLink">{{
								menuTitle
							}}</router-link>
							/
							<router-link :to="subMenuLink">{{ subMenuTitle }}</router-link>
						</template>
					</div>
					<router-view></router-view
				></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
	// import { Menu, ArrowDown ,Goods} from "@element-plus/icons-vue";
	import { computed, reactive, toRefs } from "vue";
	import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter()
	const route = useRoute();
	// const route=router.currentRoute.value
	let i = "Goods";
	
	let username = route.params.username ?? "admin";
	
	let newMenus = computed<NewMenusItf>(() => store.getters.getNewMenus);
	console.log("NEW:", route.matched);
	let activeMenu = reactive({
		hideMenu: false,
		menuLink: route.matched[0].path??'',
		subMenuLink:route.fullPath,
			//route.matched[1] ? route.matched[1].path : '',
		menuTitle: route.matched[0].meta.title,
		subMenuTitle: route.meta.title,
	});
	
const menuClicked = (menu: menu, subMenu: menu) => {
	console.log('menuClick:',menu.children[0]);
	
	subMenuObj = menu.children[0]
		console.log(subMenuObj);
		
		activeMenu.hideMenu = false;
		activeMenu.menuLink = "/" + menu.name;
		activeMenu.subMenuLink = "/" + menu.name + "/" + subMenu.name;
		activeMenu.menuTitle = menu.title;
		activeMenu.subMenuTitle = subMenu.title;
};
	let subMenuObj:any={}
	const goHome = () => {
		activeMenu.hideMenu = true;
	};
	const goMainMenu = () => {
		// activeMenu.menuLink = route.matched[0].path;
		// activeMenu.subMenuLink = route.matched[1].path;
		// activeMenu.menuTitle = route.matched[0].meta.title;
		console.log('goMain:',subMenuObj);
		
		if (subMenuObj.title) activeMenu.subMenuTitle = subMenuObj.title;
		else {
			activeMenu.subMenuTitle =route.meta.title
		}
		// router.push('/pms')
	};

	const { hideMenu, menuLink, subMenuLink, menuTitle, subMenuTitle } =
		toRefs(activeMenu);
</script>

<style lang="less" scoped>
	.el-header {
		background-color: #409eff;
		height: 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #ffffff;
		#menuicon {
			top: 4px;
		}
	}
	.el-aside {
		background-color: #304156;
		position: absolute;
		top: 48px;
		bottom: 0;
		left: 0;
		width: 170px;
	}
	.el-dropdown {
		color: #ffffff;
	}
	.el-main {
		position: absolute;
		left: 170px;
		top: 48px;
		bottom: 0;
		right: 0;
		color: #409eff;
	}
</style>
