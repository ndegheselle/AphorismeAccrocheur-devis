<script>
    import Navigation from "./navigation.svelte";
    import Footer from "./footer.svelte";
</script>

<div class="flex flex-col h-screen justify-between">
    <Navigation />
    <slot class="mb-auto"/>
    <Footer />
</div>

