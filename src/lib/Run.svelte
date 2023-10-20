<script lang="ts">
    import { mdilPlay } from "@mdi/light-js";
    import { Container, Details, Field, Button, Input } from "svelte-chota";
    import { isImgLoaded } from "../loaders/imgLoader";
    import PC from "./PC.svelte";

    let imgID = "";
    let isOpen = false;
    const imgClick = (e) => {
        imgID = e.currentTarget.id;
        isOpen = true;
    };
</script>

<Container>
    {#await isImgLoaded}
        <p>Wait for loading images list...</p>
    {:then list}
        <p>
            This is a list of HDD images sorting by operation system
            (programs/games for testing are included)
        </p>
        {#each list as el}
            <Details>
                <span slot="summary">{el.os}</span>
                {#each el.img as img}
                    <Field gapless>
                        <Button
                            on:click={imgClick}
                            id={img.id}
                            icon={mdilPlay}
                            outline>Run</Button
                        >
                        <Input value={img.programs} inert readonly />
                    </Field>
                {/each}
            </Details>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</Container>

<PC bind:isOpen {imgID} />
