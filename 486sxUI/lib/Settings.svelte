<script lang="ts">
    import { mdilContentSave, mdilPlus } from "@mdi/light-js";
    import { Container, Field, Input, Checkbox, Button } from "svelte-chota";
    import { settings, id, deferredPrompt } from "../stores/Stores.svelte";

    let localID = $id;

    const idChange = () => {
        if (localID.length < 4 || localID.length > 13) {
            alert(
                `Z-modem ID wrong length (now is ${localID.length}, but must be from 4 to 13)`
            );
            localID = $id;
        }
        id.set(localID.toUpperCase());
    };

    const saveClick = () => {
        window.localStorage.setItem(
            "settings",
            JSON.stringify({
                ctrls: $settings.ctrls,
                cors: $settings.cors,
                corsServer: $settings.corsServer,
                nModem: $settings.nModem,
                nMServer: $settings.nMServer,
            })
        );
        alert("Your settings are saved");
    };

    let btnAddVisible = "display:block";

    const addClick = () => {
        // hide our user interface that shows our A2HS button
        btnAddVisible = "display:none";
        // Show the prompt
        let defPr = $deferredPrompt;
        defPr.prompt();
        // Wait for the user to respond to the prompt
        defPr.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            $deferredPrompt = null;
        });
    };
</script>

<Container>
    <br />
    <Button outline icon={mdilContentSave} on:click={saveClick}
        >Save settings</Button
    >
    {#if $deferredPrompt}
        <Button
            outline
            icon={mdilPlus}
            on:click={addClick}
            style="${btnAddVisible}">Install local</Button
        >
    {/if}
    <br />
    <br />
    <Checkbox bind:checked={$settings.ctrls}>Use on-screen controls</Checkbox
    ><br />
    <Checkbox bind:checked={$settings.cors}>Use CORS proxy</Checkbox><br />
    {#if $settings.cors}
        <br />
        <Field label="CORS proxy preffix URL">
            <Input
                bind:value={$settings.corsServer}
                placeholder="CORS server for the backend"
            />
        </Field>
        <br />
    {/if}
    <Checkbox bind:checked={$settings.nModem}>Use null modem cable</Checkbox>
    {#if $settings.nModem}
        <br />
        <br />
        <Field label="Null modem server address">
            <Input
                bind:value={$settings.nMServer}
                placeholder="Null modem server"
            />
        </Field>
        <Field label="Network ID">
            <Input
                bind:value={localID}
                style="text-transform: uppercase;"
                placeholder="Network ID"
                on:change={idChange}
            />
        </Field>
    {/if}
</Container>
