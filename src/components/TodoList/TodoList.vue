<template>
	<div class="todo-list">
		<div class="todo-list-controls">
			<button class="todo-list-controls__btn-add" type="button" @click="add">
				<span class="mdi mdi-18px mdi-plus"></span>
				Добавить
			</button>
		</div>
		<transition name="fade-100" mode="out-in">
			<div class="todo-list__placeholder" v-if="!tasks.length" key="todoPlaceholder">
				<div class="todo-list__placeholder__icon">
					<span class="mdi mdi-48px mdi-checkbox-marked-circle-outline"></span>
				</div>
				<div class="todo-list__placeholder__text">На сегодня задач нет</div>
			</div>
			<div class="todo-list-items" v-else key="todoList">
				<draggable v-model="tempTasks">
					<transition-group name="fade-200">
						<TodoListItem
							v-for="task in sortedTasks"
							ref="todoListItem"
							:key="task.id"
							:id="task.id"
							:name.sync="task.name"
							:completed.sync="task.isCompleted"
							:editable.sync="task.editable"
							@remove="remove"
						/>
					</transition-group>
				</draggable>
			</div>
		</transition>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
import TodoListItem from '@/components/TodoList/TodoListItem.vue'

export default {
	name: 'TodoList',
	components: { draggable, TodoListItem },
	data: () => ({
		tasks: [],
		tempTasks: [],
	}),
	computed: {
		sortedTasks() {
			return [...this.tasks].sort((a, b) => a.order - b.order)
		},
	},
	mounted() {
		this.tasks = this.tempTasks = JSON.parse(localStorage.getItem('tasks')) || []
	},
	methods: {
		add() {
			this.tasks.push({
				id: this.tasks.length ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1,
				name: '',
				completed: false,
				editable: true,
				order: this.tasks.length ? this.tasks[this.tasks.length - 1].order + 1 : 0,
			})
		},
		remove(id) {
			this.tasks = this.tasks.filter((t) => t.id !== id)
			this.tempTasks = this.tempTasks.filter((t) => t.id !== id)
		},
	},
	watch: {
		tasks: {
			deep: true,
			handler(value) {
				localStorage.setItem('tasks', JSON.stringify(value))
			},
		},
		tempTasks: {
			deep: true,
			handler(tempTasks) {
				tempTasks.forEach((tempTask, index) => {
					this.tasks.find((task) => task.id === tempTask.id).order = index
				})
			},
		},
	},
}
</script>

<style lang="scss">
.todo-list {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	background-color: rgba(white, 5%);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 0.8rem;
	width: 100%;
	max-height: calc(100vh - 12rem);
	min-width: 30rem;
	max-width: 60rem;

	&-controls {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		height: 7.5rem;
		padding: 1.6rem;

		&__btn-add {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			background-color: rgba(white, 25%);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 0.8rem;
			color: white;
			font-size: 1.6rem;
			font-weight: 700;
			padding: 1rem;
			transition: background-color 100ms ease-out;

			&:hover {
				background-color: rgba(white, 40%);
			}

			span.mdi {
				margin-right: 0.8rem;
			}
		}
	}

	&-items {
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.8rem;
		margin: 1.6rem;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3px;
		}

		&::-webkit-scrollbar-track {
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: rgba(white, 50%);
			border-radius: 3px;
		}
	}

	&__placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		opacity: 0.5;
		padding: 1.6rem;
		text-align: center;

		&__icon {
			margin-bottom: 1.6rem;
		}

		&__text {
			color: white;
			font-size: 2rem;
		}
	}
}
</style>
