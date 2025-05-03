<script>
    import Alerts from "$lib/components/popups/alerts.svelte";
    import Confirm from "$lib/components/popups/confirm.svelte";
    import Navigation from "./navigation.svelte";
    import Footer from "./footer.svelte";
    import '../app.css';
</script>

<div class="min-h-screen h-full flex flex-col">
    <Alerts />
    <Navigation />
    <slot />
    <Footer />
    <Confirm />
</div>
