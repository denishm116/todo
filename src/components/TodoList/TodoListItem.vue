<template>
	<div class="todo-list-item" :class="{ 'todo-list-item--completed': $props.completed }">
		<div class="todo-list-item__status">
			<label class="todo-list-item__status__checkbox">
				<input type="checkbox" @change="toggleCompletion" />
				<span v-if="$props.completed" class="mdi mdi-18px mdi-checkbox-marked"></span>
				<span v-else class="mdi mdi-18px mdi-checkbox-blank-outline"></span>
			</label>
		</div>
		<div class="todo-list-item__name" :class="{ 'todo-list-item__name--editable': $props.editable }">
			<input
				v-if="$props.editable"
				ref="taskNameInput"
				placeholder="Название задачи"
				:value="$props.name"
				type="text"
				@input="onInput"
				@keypress.enter="onEnterKeypress"
				@blur="onBlur"
			/>
			<span v-else>{{ $props.name }}</span>
		</div>
		<div class="todo-list-item__actions">
			<button
				v-show="!$props.editable"
				class="todo-list-item__actions__btn todo-list-item__actions__btn--edit"
				type="button"
				@click="setEditable(true)"
			>
				<span class="mdi mdi-pencil"></span>
			</button>

			<button class="todo-list-item__actions__btn todo-list-item__actions__btn--delete" type="button" @click="remove">
				<span class="mdi mdi-delete"></span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TodoListItem',
	props: {
		id: { type: [Number], default: () => 1 },
		name: { type: [String], default: () => '' },
		completed: { type: [Boolean], default: () => false },
		editable: { type: [Boolean], default: () => true },
	},
	mounted() {
		if (this.$props.editable) {
			this.$refs.taskNameInput.focus()
		}
	},
	methods: {
		onInput() {
			this.$emit('update:name', this.$refs.taskNameInput.value)
		},
		onBlur() {
			this.setEditable(false)
			this.$emit('update:name', this.$refs.taskNameInput.value)
		},
		onEnterKeypress() {
			this.setEditable(false)
			this.$emit('update:name', this.$refs.taskNameInput.value)
		},
		toggleCompletion() {
			this.$emit('update:completed', !this.$props.completed)
		},
		setEditable(value) {
			this.$emit('update:editable', value)

			if (value) {
				this.$nextTick(() => {
					this.$refs.taskNameInput.focus()
				})
			}
		},
		remove() {
			this.$emit('remove', this.$props.id)
		},
	},
}
</script>

<style lang="scss">
.todo-list-item {
	display: flex;
	align-items: center;
	cursor: grab;
	height: 4rem;

	&:active {
		cursor: grabbing;
	}

	&:not(:last-child) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	&:hover {
		background-color: rgba(white, 5%);
	}

	&--completed {
		background-color: rgba(white, 10%) !important;
		opacity: 0.5 !important;
	}

	&__status {
		width: 4rem;
		height: 100%;

		&__checkbox {
			width: 100%;
			height: 100%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;

			input {
				display: none;
			}
		}
	}

	&__name {
		display: inline-flex;
		align-items: center;
		flex-grow: 1;
		height: 100%;
		font-weight: 700;
		line-height: 4rem;

		&--editable {
			input {
				text-decoration: underline;
			}
		}

		input {
			display: inline-block;
			flex-grow: 1;
			background-color: transparent;
			border: 0;
			color: inherit;
			font-size: inherit;
			font-weight: inherit;
			line-height: inherit;
			margin: 0;
			padding: 0;
			outline: none;

			&::-webkit-input-placeholder {
				color: inherit;
			}
			&::-moz-placeholder {
				color: inherit;
			}
			&:-ms-input-placeholder {
				color: inherit;
			}
			&:-moz-placeholder {
				color: inherit;
			}
		}

		span {
			line-height: inherit;
		}
	}

	&__actions {
		display: inline-flex;
		align-items: center;
		height: 100%;
		margin-left: auto;

		&__btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 4rem;
			height: 100%;
			opacity: 0.6;
			padding: 0;
			transition: opacity 100ms ease-out;

			&:hover {
				opacity: 1;
			}
		}
	}
}
</style>
