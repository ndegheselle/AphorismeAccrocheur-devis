<script>
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "../app.css";

    import Navigation from "./navigation.svelte";
    import Footer from "./footer.svelte";
</script>

<Navigation />

<slot />

<Footer />