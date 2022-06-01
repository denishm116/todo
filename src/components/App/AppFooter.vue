<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__copyright">&copy; {{ new Date().getFullYear() }}</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'AppHeader',
}
</script>

<style lang="scss">
.footer {
	height: 6rem;

	.container {
		height: 100%;
		display: flex;
		align-items: center;
	}

	&__copyright {
		flex-grow: 1;
		font-size: 1.2rem;
		color: rgba(white, 50%);
		text-align: center;
	}
}
</style>
