<template>
	<header class="header">
		<div class="container">
			<nav class="header__nav">
				<a class="header__nav__logo" href="/">TODO APP</a>
				<a class="header__nav__github-link" href="https://github.com/denishm116" target="_blank">
					<span class="mdi mdi-24px mdi-github"></span>
				</a>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
}
</script>

<style lang="scss">
.header {
	height: 6rem;

	.container {
		height: 100%;
		display: flex;
		align-items: center;
	}

	&__nav {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;

		a {
			text-decoration: none;
			transition: color 100ms ease-out;

			&:active,
			&:visited {
				text-decoration: none;
			}
		}

		&__logo {
			font-size: 2.4rem;
			font-weight: 700;
			text-decoration: none;
			color: white;
		}

		&__github-link {
			color: rgba(white, 50%);

			&:hover {
				color: rgba(white, 90%);
			}
		}
	}
}
</style>
