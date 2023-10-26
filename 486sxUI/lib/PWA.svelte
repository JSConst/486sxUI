<script lang="ts">
    import { useRegisterSW } from "virtual:pwa-register/svelte";

    /* const {
        offlineReady, needRefresh, updateServiceWorker
    } = */ useRegisterSW({
        onRegistered(swr) {
            console.log(`SW registered: ${swr}`);
        },
        onRegisterError(error) {
            console.log("SW registration error", error);
        },
    });

    /*function close() {
        offlineReady.set(false);
        needRefresh.set(false);
    }

    $: toast = $offlineReady || $needRefresh;*/

    window.addEventListener("resize", function (e) {
        let width = e.target.outerWidth;
        let height = e.target.outerHeight;

        width < 1024 && (width = 1024);
        height < 900 && (height = 900);
        window.resizeTo(width, height);
    });
</script>

<!-->
{#if toast}
      {#if $offlineReady}
        {console.log("App ready to work offline")}
      {:else}
        {console.log("New content available, click on reload button to update.")}
      {/if}
    {#if $needRefresh}
        {console.log("Need to refresh.")}
    {/if}
{/if}
<-->
