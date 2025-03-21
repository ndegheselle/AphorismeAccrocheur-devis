<script>
    import Navigation from "./navigation.svelte";
    import Footer from "./footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
    <Navigation />
    <slot />
    <Footer />
</div>

