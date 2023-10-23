<script lang="ts">
    import { Container } from "svelte-chota";

    import { prettify } from "../3rd-party/run_prettify.js";
    prettify();
</script>

<Container>
    <p>
        486.sx provides a simple API for using the emulator on third-party
        resources. The easiest way to explain this process is with code blocks
        and some comments. To insert the screen and controls of a virtual
        machine onto the site, you need to perform the following steps:
    </p>
    <ul>
        <li>
            Import the <b>api</b> function from the
            <a href="https://486.sx">486.sx</a>
            site. Calling this function returns an <b>emulator object</b>.
        </li>
        <li>
            Connect the necessary handlers for communication between the
            emulator and external elements.
        </li>
        <li>
            Launch the emulator and start the rendering process on the virtual
            screen.
        </li>
    </ul>
    <p>The following parameters are passed to <b>api</b> function:</p>
    <ul>
        <li>Hard disk image number [ <b>string value</b> ]</li>
        <li>Null modem parameters [ <b>special object</b> | <b>null</b> ]</li>
        <li>Canvas for use as a screen [ <b>HTMLCanvasElement</b> ]</li>
        <li>
            List of URLs for downloading HDD and BIOS images and playing audio [ <b
                >special object</b
            > ]
        </li>
    </ul>
    <p>
        In general this happens as shown below (the structure of special objects
        will be presented separately):
    </p>

    <pre class="prettyprint">
{`
    import { api } from "https://486.sx/script/index.js";

    // hard disk image number
    const img = "1";
    // null modem parameters (null - w/o null modem cable)
    const nmp = null;
    // virtual screen for emulator
    const scr = document.querySelector("canvas");
    // list of required URLs
    const url = {   							    
        getRomURL : "https://486.sx/",                          // URL for BIOS image downloader
        workerURL : "https://486.sx/script/hddLoader.js",       // URL for WebWorker that loads HDD data
        getImgURL : "https://486.sx/https://486.sx/",           // URL for HDD image downloader
        workletURL : "https://486.sx/worklet/soundProcessor.js" // URL for AudioWorklet that plays audio
    }
    // got the emulator object
    const emu = api(img, npm, scr, url);

`}
</pre>
    <p>The <b>emulator object</b> contains methods that allow you to:</p>
    <ul>
        <li>Launch the emulator [ <b>.run()</b> method ]</li>
        <li>Display an image on a virtual screen [ <b>.show()</b> method ]</li>
        <li>Terminate the emulator [ <b>.stop()</b> method ]</li>
        <li>Add on-screen control [ using the <b>.ctrls</b> property ]</li>
    </ul>
    <p>The process of starting the emulator looks like this:</p>
    <pre class="prettyprint">
{`
    // add basic keyboard and mouse handlers to the emulator
    for (let key in emu.ctrls.screenCtrls) {
        scr.addEventListener(key, emu.ctrls.screenCtrls[key]);
    }
    // start the emulator
    emu.run();
    // start displaying on the virtual screen
    emu.show();
    // define a stop button for the emulator
    document.getElementById("btnStop").addEventListener("click", emu.stop);

`}
</pre>
    <p>
        In addition to the controls that are used inside the emulator, you can
        use elements of your site to create a limited on-screen keyboard. For
        example, for touch screens. See below how to use the <b>.ctrls</b> for these
        purposes (we use the scr and emu objects obtained earlier):
    </p>
    <pre class="prettyprint">
{`
    // define an external button "CTRL-ALT-DEL" for the emulator
    document.getElementById("btnCAD").addEventListener("click", emu.ctrls.screenKeyCtrls.cadPress);
    // define an external button "ESC" for the emulator
    document.getElementById("btnESC").addEventListener("click", emu.ctrls.screenKeyCtrls.escPress);
    // define an input field of any character for the emulator
    document.querySelector("input").addEventListener("keyup", emu.ctrls.screenKeyCtrls.keyPress);
    // define a mouse movement handler for touch screens
    scr.addEventListener("touchmove", emu.ctrls.screenMouseCtrls.touchmove);

    // etc.

`}
</pre>
    <p>
        The <b>.ctrls</b> object contains handlers for various virtual machine events,
        which are grouped as follows:
    </p>
    <ul>
        <li>
            On-screen keyboard button handlers [ <b>.screenKeyCtrls</b> property
            ]
        </li>
        <li>
            Mouse handlers for touch screens [ <b>.screenMouseCtrls</b> property
            ]
        </li>
        <li>
            Emulator keyboard and mouse handlers[ <b>.screenCtrls</b> property ]
        </li>
        <li>
            Method for stopping a null modem [ <b>.nModemStop()</b> method ]
        </li>
    </ul>
    <p>
        All possible handlers are listed below (use the emu object obtained
        earlier):
    </p>
    <pre class="prettyprint">
{`
    // for on-screen keyboard
    emu.ctrls.screenKeyCtrls.cadPress();            // pressing three keys "CTRL-ALT-DEL"
    emu.ctrls.screenKeyCtrls.escPress();            // pressing "ESC" key 
    emu.ctrls.screenKeyCtrls.tabPress();            // pressing "TAB" key
    emu.ctrls.screenKeyCtrls.spacePress();          // pressing "SPACE" key
    emu.ctrls.screenKeyCtrls.bsPress();             // pressing "BACKSPACE" key
    emu.ctrls.screenKeyCtrls.enterPress();          // pressing "ENTER" key
    emu.ctrls.screenKeyCtrls.leftPress();           // pressing "LEFT" key
    emu.ctrls.screenKeyCtrls.upPress();             // pressing "UP" key 
    emu.ctrls.screenKeyCtrls.downPress();           // pressing "DOWN" key
    emu.ctrls.screenKeyCtrls.rightPress();          // pressing "RIGHT" key
    emu.ctrls.screenKeyCtrls.delPress();            // pressing "DEL" key
    emu.ctrls.screenKeyCtrls.keyPress(evt);         // pressing an arbitrary key (will use evt.keyCode inside)

    // handlers for touch screens must be installed on the corresponding handlers for control elements
    emu.ctrls.screenMouseCtrls.touchmove(evt);       // handler for mouse movement on touchpad
    emu.ctrls.screenMouseCtrls.lb.touchstart(evt);   // left mouse button click handlers 
    emu.ctrls.screenMouseCtrls.lb.touchend(evt);
    emu.ctrls.screenMouseCtrls.lb.touchcancel(evt);
    emu.ctrls.screenMouseCtrls.rb.touchstart(evt);   // right mouse button click handlers  
    emu.ctrls.screenMouseCtrls.rb.touchend(evt);
    emu.ctrls.screenMouseCtrls.rb.touchcancel(evt);

    // handlers for the mouse and keyboard must be set to the corresponding handlers for the screen element
    emu.ctrls.screenCtrls.keyup(evt);
    emu.ctrls.screenCtrls.keydown(evt);
    emu.ctrls.screenCtrls.mousemove(evt);
    emu.ctrls.screenCtrls.mouseup(evt);
    emu.ctrls.screenCtrls.mousedown(evt);
    emu.ctrls.screenCtrls.mouseclick(evt); 
    emu.ctrls.screenCtrls.pointerlockchange(evt);

    // null modem stop method, called when the emulator is turned off
    emu.ctrls.nModemStop(); 

`}
</pre>
    <p>
        A few words should be said about the null modem connection. If you plan
        to use a connection between two virtual machines through an intermediate
        server, then during initialization you should pass the null modem
        parameters to the <b>api</b> function through a special object. An example
        of such an object is shown below:
    </p>
    <pre class="prettyprint">
{`
    // null modem parameters
    const nmp = {
        srv : "server.io",               // null modem backend server
        id : btoa("qwerty")              // "qwerty" is the session ID
    };

`}
</pre>
    <p>
        Two emulators initialized with the same ID will be connected to each
        other.
    </p>
    <p>
        Something needs to be said about using a CORS proxy server. <a
            href="https://486.sx">486.sx</a
        >
        does not currently generate CORS headers, so in order to use the emulator
        on your website you must to use a CORS proxy. Therefore, importing the
        <b>api</b>
        function and null modem parameters and/or the set of URLs passed to the
        <b>api</b>
        function through special objects will be slightly different from what was
        shown in the example above. Below explains how to do the same through a CORS
        proxy server. For example, we use the RAW mode of online CORS proxy server
        <a href="https://allorigins.win/">https://allorigins.win</a>:
    </p>
    <pre class="prettyprint">
{`
    import { api } from "https://api.allorigins.win/raw?url=https://486.sx/script/index.js";

    // null modem parameters
    const nmp = {
        srv : "https://api.allorigins.win/raw?url=https://server.io",
        id : btoa("qwerty")
    };

    // CORS proxy server destination URL preffix
    let corsPref = "https://api.allorigins.win/raw?url=";

    // list of required URLs
    const url = {											    
        getRomURL : \`\${corsPref}\${encodeURIComponent("https://486.sx/")}\`,
        workerURL : \`\${corsPref}\${encodeURIComponent("https://486.sx/script/hddLoader.js")}\`,
        getImgURL : \`\${corsPref}\${encodeURIComponent("https://486.sx/")}\`,
        workletURL : \`\${corsPref}\${encodeURIComponent(https://486.sx/worklet/soundProcessor.js)}\`"
    }

`}
</pre>
</Container>
