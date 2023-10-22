<script lang="ts">
    import {
        mdilPower,
        mdilRefresh,
        mdilChevronUp,
        mdilChevronLeft,
        mdilChevronDown,
        mdilChevronRight,
    } from "@mdi/light-js";
    import {
        mdiSubdirectoryArrowLeft,
        mdiArrowLeftThin,
        mdiMouse,
    } from "@mdi/js";
    import { Card, Field, Button, Input, Modal, Row, Col } from "svelte-chota";
    import { settings, id } from "../stores/stores";
    import { afterUpdate } from "svelte";

    import { api } from "https://185.117.153.193.nip.io/proxy/?url=http%3A%2F%2F486.sx%2Fscript%2Findex.js";

    export let isOpen;
    export let imgID;

    let stopPC;
    let isWorking = false;

    let btnCAD = null;
    let mPAD = null;

    let ctrlActions = {
        cadPress: null,
        escPress: null,
        tabPress: null,
        spacePress: null,
        bsPress: null,
        enterPress: null,
        leftPress: null,
        upPress: null,
        downPress: null,
        rightPress: null,
        delPress: null,
        keyPress: null,
    };

    let touchActions = {
        touchmove: null,
        lb: {
            touchstart: null,
            touchend: null,
            touchcancel: null,
        },
        rb: {
            touchstart: null,
            touchend: null,
            touchcancel: null,
        },
    };

    let nModemStop;

    const keyPress = (e) => {
        ctrlActions.keyPress(e.keyCode);
        e.currentTarget.value = "";
    };

    const pLock = () => {
        mPAD.dispatchEvent(new MouseEvent("mouseup", { button: 1 }));
    };

    const lockChange = () => {
        !document.pointerLockElement &&
            document.activeElement === document.querySelector("canvas") &&
            mPAD.dispatchEvent(new MouseEvent("mouseup", { button: 1 })) &&
            ctrlActions.escPress &&
            ctrlActions.escPress();
    };

    let netID = "Null modem cable do not plugged in";

    afterUpdate(() => {
        if (isOpen && !isWorking) {
            let urls = $settings.cors
                ? {
                      getRomURL:
                          $settings.corsServer +
                          encodeURIComponent("http://486.sx/"),
                      workerURL:
                          $settings.corsServer +
                          encodeURIComponent(
                              "http://486.sx/script/hddLoader.js"
                          ),
                      getImgURL:
                          $settings.corsServer +
                          encodeURIComponent("http://486.sx/"),
                      workletURL:
                          $settings.corsServer +
                          encodeURIComponent(
                              "http://486.sx/worklet/soundProcessor.js"
                          ),
                  }
                : {
                      getRomURL: "https://486.sx/",
                      workerURL: "script/hddLoader.js",
                      getImgURL: "https://486.sx/",
                      workletURL: "../worklet/soundProcessor.js",
                  };

            new Promise((resolve) => {
                netID = "Null modem cable do not plugged in";

                if ($settings.nModem && $settings.nMServer && $id) {
                    let rslt = true;
                    let stopTimeout = setTimeout(resolve, 1000, null);
                    let nMServer = $settings.nMServer.match(/:\/\//)
                        ? $settings.nMServer.split("://")[1]
                        : $settings.nMServer;
                    let url = `wss://${nMServer}:9001/` + btoa($id);
                    let ws = new WebSocket(url);
                    ws.onmessage = async (event) => {
                        ws.close();
                        clearTimeout(stopTimeout);

                        let data = event.data;

                        if (data === "0") {
                            alert(
                                "This null modem connection ID is locked now by another users"
                            );
                            rslt = false;
                            netID = "ID is locked";
                        } else
                            data === "1" &&
                                (rslt = confirm(
                                    "Confirm to connect by your null modem to another virtual machine?"
                                ));

                        if (rslt) {
                            netID = $id + "@" + nMServer;
                            resolve({ srv: nMServer, id: btoa($id) });
                        } else {
                            resolve(null);
                        }
                    };
                } else {
                    resolve(null);
                }
            }).then((nModemParams) => {
                let vm = api(imgID, nModemParams, mPAD, urls);

                ctrlActions = vm.ctrls.screenKeyCtrls;
                touchActions = vm.ctrls.screenMouseCtrls;
                nModemStop = vm.ctrls.nModemStop;

                for (let key in vm.ctrls.screenCtrls) {
                    mPAD.addEventListener(key, vm.ctrls.screenCtrls[key]);
                }
                mPAD.addEventListener("touchmove", touchActions.touchmove);
                document.addEventListener("pointerlockchange", lockChange);

                stopPC = vm.pc();
                vm.svga();
            });

            isWorking = true;
        }
    });
</script>

<Modal bind:open={isOpen}>
    <Card style="min-width:820px">
        <div slot="header">
            <Field gapless>
                <Button
                    success
                    on:click={ctrlActions.cadPress}
                    icon={mdilRefresh}
                    bind:this={btnCAD}
                />
                <Input value={netID} readonly />
                <Button
                    error
                    on:click={() =>
                        clearInterval(stopPC) ||
                        (isOpen = false) ||
                        (isWorking = false) ||
                        nModemStop()}
                    icon={mdilPower}
                />
            </Field>
        </div>

        <canvas
            style="border:10px solid black;background:black;image-rendering:pixelated"
            bind:this={mPAD}
            width="800"
            height="600"
            oncontextmenu="return false"
        ></canvas>

        <div slot="footer">
            {#if $settings.ctrls}
                <Row>
                    <Col
                        ><Button
                            dark
                            style="font-size:14px;width:75px"
                            icon={mdiMouse}
                            on:touchstart={touchActions.lb.touchstart}
                            on:touchend={touchActions.lb.touchend}
                            on:touchcancel={touchActions.lb.touchcancel}
                            >L</Button
                        ></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.delPress}
                            secondary
                            style="font-size:14px">Del</Button
                        ></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.escPress}
                            secondary
                            style="font-size:14px">Esc</Button
                        ></Col
                    >
                    <Col size="3"
                        ><Button
                            on:click={pLock}
                            primary
                            style="font-size:14px;width:185px;height:35px"
                            >Take control</Button
                        ></Col
                    >
                    <Col size="2"
                        ><Button
                            on:click={ctrlActions.bsPress}
                            secondary
                            style="width:122px"
                            icon={mdiArrowLeftThin}
                        /></Col
                    >
                    <Col></Col>
                    <Col
                        ><Button
                            on:click={ctrlActions.upPress}
                            dark
                            icon={mdilChevronUp}
                        /></Col
                    >
                    <Col></Col>
                </Row>
                <Row>
                    <Col
                        ><Button
                            dark
                            style="font-size:14px;width:75px"
                            icon={mdiMouse}
                            on:touchstart={touchActions.rb.touchstart}
                            on:touchend={touchActions.rb.touchend}
                            on:touchcancel={touchActions.rb.touchcancel}
                            >R</Button
                        ></Col
                    >
                    <Col
                        ><Input
                            on:keyup={keyPress}
                            style="width:72px"
                            value=""
                        /></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.tabPress}
                            secondary
                            style="font-size:14px">Tab</Button
                        ></Col
                    >
                    <Col size="3"
                        ><Button
                            on:click={ctrlActions.spacePress}
                            secondary
                            style="width:185px;height:35px"
                        /></Col
                    >
                    <Col size="2"
                        ><Button
                            on:click={ctrlActions.enterPress}
                            secondary
                            style="font-size:14px"
                            icon={mdiSubdirectoryArrowLeft}>Enter</Button
                        ></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.leftPress}
                            dark
                            icon={mdilChevronLeft}
                        /></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.downPress}
                            dark
                            icon={mdilChevronDown}
                        /></Col
                    >
                    <Col
                        ><Button
                            on:click={ctrlActions.rightPress}
                            dark
                            icon={mdilChevronRight}
                        /></Col
                    >
                </Row>
            {/if}
        </div>
    </Card>
</Modal>
