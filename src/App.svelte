<script lang="ts">
    import "chota";
    import Router from "svelte-app-router";
    import Home from "./lib/Home.svelte";
    import Run from "./lib/Run.svelte";
    import Settings from "./lib/Settings.svelte";
    import Api from "./lib/Api.svelte";
    import Page_404 from "./lib/Page_404.svelte";
    import { isSettingsLoaded } from "./stores/stores";
    import { Container } from "svelte-chota";

    export let routes = {
        "/": [Home],
        "/run": [Run],
        "/settings": [Settings],
        "/api": [Api],
    };

    export let navBar = [
        { url: "#/", link: "Home", size: "2", class: "nav-left", style: "" },
        { url: "#/run", link: "Run", size: "1", class: "nav-left", style: "" },
        { url: "#/api", link: "API", size: "1", class: "nav-left", style: "" },
        {
            url: "#/settings",
            link: "Settings",
            size: "2",
            class: "nav-right",
            style: "float:right",
        },
    ];
</script>

<Container>
    {#await isSettingsLoaded}
        <p>Wait for loading settings...</p>
    {:then}
        <div
            style="background:black; position:fixed; top:0; right:50%; transform:translate(50%); z-index:10; min-width:840px; width:100vw"
        >
            {#each navBar as el}
                <a style={el.style} class={el.class} href={el.url}>{el.link}</a>
            {/each}
        </div>
        <div style="margin-top:8rem;">
            <Router {routes}>
                <Page_404 />
            </Router>
        </div>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</Container>

<style>
    a {
        font-family: "Led Screen Gtamblog";
        font-size: 2rem;
        font-weight: bold;
        color: lightgray;
        margin: 2rem;
        float: left;
    }

    a:hover {
        animation: 3s infinite change;
    }

    @keyframes change {
        0% {
            color: lightgray;
        }

        50% {
            color: gray;
        }

        100% {
            color: lightgray;
        }
    }
</style>
