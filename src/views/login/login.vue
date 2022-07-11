<template>
	<div class="demo-ruleForm">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			status-icon
			:rules="rules"
			class="ruleForm"
		>
			<el-form-item>
				<h2>我的商品管理系统</h2>
			</el-form-item>

			<el-form-item prop="username">
				<el-input
					v-model="ruleForm.username"
					type="text"
					autocomplete="off"
					placeholder="请输入用户名"
					:prefix-icon="Avatar"
				/>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="ruleForm.password"
					type="password"
					autocomplete="off"
					placeholder="请输入密码"
					:prefix-icon="Lock"
				/>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm()">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
	import type { FormInstance } from "element-plus";
	import { Lock, Avatar } from "@element-plus/icons-vue";

	import Cookies from "js-cookie";
	import { adminLoginApi, getAdminInfoApi } from "@/request/api";
	import { useRouter } from "vue-router";
	import { useStore } from "vuex";

	const ruleForm = reactive<AdminLoginItf>({
		username: "admin",
		password: "123456",
	});
	let ruleFormRef = ref<FormInstance>();
	const router = useRouter();
	const store = useStore();
	const submitForm = () => {
		ruleFormRef.value?.validate().then(() => {
			adminLoginApi(ruleForm).then((res) => {
				console.log("login", res);
				if (res.code === 200) {
					Cookies.set("token", res.data.tokenHead + res.data.token, {
						expires: 7,
					});
					store.dispatch('getAdminInfo').then(res=>router.push({ name: "home", params: ruleForm }))					
				}
			});
		});
	};
	const validatePassword = (
		rule: any,
		value: any,
		cb: (msg?: string) => void
	) => {
		if (!value) {
			cb("密码不能为空");
		} else {
			cb();
		}
	};
	const rules = reactive({
		username: [
			{
				required: true,
				message: "请输入用户名",
				trigger: "blur",
			},
			{
				min: 3,
				max: 10,
				message: "用户名长度必须为3到10位",
				trigger: "blur",
			},
		],
		password: [{ validator: validatePassword, trigger: "blur" }],
	});
</script>

<style lang="less" scoped>
	.demo-ruleForm {
		background-color: #2d3a4b;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.ruleForm {
			width: 420px;
			height: 250px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.el-input {
			--el-input-bg-color: #283443;
			width: 400px;
			height: 50px;
		}
		.el-button {
			width: 400px;
			height: 40px;
		}
		h2 {
			width: 300px;
			text-align: center;
			font-size: xx-large;
			color: #ffffff;
		}
	}
</style>
