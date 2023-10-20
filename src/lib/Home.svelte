<script lang="ts">
    import { Container, Tag } from "svelte-chota";
</script>

<Container>
    <h3>Why is all this</h3>
    <p>
        Everyone has memories. Someone who was first introduced to personal
        computers in the 90s probably remember their impressions. For me it was
        like teleportation to another world. And this world was constantly
        changing, never letting me get bored. Now everyone has a computer in
        their pocket, but the feeling is not the same. For those who want to
        delve deeper into those memories, I created this virtual machine. I
        didn’t expect how many pleasant emotions it brought me as a user. I hope
        you will too. Welcome to the world without bots, total surveillance and
        neural networks!
    </p>
    <img alt="main pic" src="/src/assets/pic/table.jpg" />
    <h3>Something about virtual characteristics (typical for that time)</h3>
    <div style="text-align:center">
        <Tag style="color: var(--color-grey)">CPU: Intel 80487SX</Tag>
        <Tag style="color: var(--color-grey)">RAM: 32Mb</Tag>
        <Tag style="color: var(--color-grey)">SVGA: 2Mb</Tag>
        <Tag style="color: var(--color-grey)">HDD: ATA 203Mb</Tag>
        <Tag style="color: var(--color-grey)">AT keyboard</Tag>
        <Tag style="color: var(--color-grey)">serial mouse</Tag>
        <Tag style="color: var(--color-grey)">PC-speaker</Tag>
        <Tag style="color: var(--color-grey)">Null modem</Tag>
    </div>
    <h3>A little disclaimer</h3>
    <p>
        <a href="https://486.sx">486.sx</a> is not a fork of any other project, so
        it may contain bugs. But I constantly try to clean them out as time allows.
    </p>
    <p>
        You need to understand that although an old slow system is emulated, its
        performance directly depends on your PC. The frequency of the emulated
        computer is set to 66 MHz, but its real performance may be lower on
        weaker hardware.
    </p>
    <p>
        The virtual hard drive controller loads data as the emulated system
        requests it and then caches it. Therefore, the slower the Internet, the
        slower the initial operation of the hard drive will be.
    </p>
    <p>
        A null modem connection also requires fast internet and requires
        additional performance from your hardware. In general, the higher your
        desired connection speed, the more powerful your system should be.
    </p>
    <p>
        Playing display and sound for the emulator requires browser support for
        HTML5.
    </p>
    <h3>QnA</h3>
    <p><b>- How it works?</b></p>
    <p>
        - It is based on an emulator implemented on the <a href="https://486.sx"
            >486.sx</a
        > website. It executes processor commands and displays the results of the
        work on a virtual screen.
    </p>
    <p>
        <b
            >- Are my computer or browser aware of what is happening inside the
            virtual machine?</b
        >
    </p>
    <p>
        - No, they don’t even understand that the emulator is running in the
        browser. Nobody knows, including me.
    </p>
    <p>
        <b
            >- When working over a null modem cable, are there any security keys
            that 486.sx exchanges with the server?</b
        >
    </p>
    <p>
        - No, there are no keys except those used in emulated systems. A null
        modem server is simply a tunnel that switches incoming data without
        additional payload.
    </p>
    <p><b>- Is it possible to use without a CORS proxy?</b></p>
    <p>
        - Unfortunately, not yet. The 486.sx site currently does not provide
        CORS headers, so you have to use a proxy.
    </p>
    <p><b>- Can I put such a window into the past on my website?</b></p>
    <p>
        - Yes, you can. It's a little tricky right now, but it's possible and
        I'm working on simplifying this procedure. It is described in detail how
        to do this <a href="#/api">here</a>.
    </p>
    <p><b>- Why 486SX?</b></p>
    <p>- It was just the first computer I had the good fortune to play on.</p>
    <p>
        <b
            >- Why is the 80487SX processor listed in the specifications instead
            of the 80486SX?</b
        >
    </p>
    <p>
        - There is no error here, this is really an overclocked 487SX (more
        details at <a href="https://www.wikidata.org/wiki/Q2534896">here</a>,
        <a href="https://ru.wikipedia.org/wiki/Intel487SX">and here</a>).
    </p>
</Container>

<style>
    h3 {
        text-align: center;
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>
