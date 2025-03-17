<script>
	import "../app.css";
	import { ToastContainer, FlatToast } from "svelte-toasts";

	let { children } = $props();
</script>

<div class="app">
	<ToastContainer placement="top-center" let:data>
		<FlatToast {data} />
	</ToastContainer>
	<main>
		{@render children()}
	</main>
</div>
