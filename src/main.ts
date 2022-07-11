import { createApp } from 'vue'
import App from './App.vue'
import  { initRouter } from './router'
import { initStore } from './store'
import * as Elicons from "@element-plus/icons-vue";

const app=createApp(App)
// createApp(App).use(router).mount("#app");
initStore(app)
initRouter(app)

app.mount('#app')
for (const name in Elicons) {
	app.component(name, (Elicons as any)[name]);
}


