<script>
    import Alerts from "./alerts.svelte";
    import Navigation from "./navigation.svelte";
    import Footer from "./footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
    <Alerts />
    <Navigation />
    <slot />
    <Footer />
</div>

