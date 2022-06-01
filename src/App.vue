<template>
	<div id="app">
		<AppHeader />
		<main>
			<div class="container">
				<TodoList />
			</div>
		</main>
		<AppFooter />
	</div>
</template>

<script>
import '../node_modules/@mdi/font/scss/materialdesignicons.scss'

import AppHeader from './components/App/AppHeader.vue'
import AppFooter from './components/App/AppFooter.vue'
import TodoList from './components/TodoList/TodoList.vue'

export default {
	name: 'App',
	components: { AppHeader, AppFooter, TodoList },
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';

main {
	display: flex;
	flex-direction: column;

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		width: 100%;
	}
}
</style>
