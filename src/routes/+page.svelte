<script lang="ts">
    import ClockButton from "$lib/ClockButton.svelte";
    import { TimeControl } from "$lib/interfaces";

    let currentTimeControl: TimeControl = $state(new TimeControl("0+0"));

    let minutes = $derived(currentTimeControl.minutes);
    let increment = $derived(currentTimeControl.increment);
    let timeA = $derived(minutes * 60);
    let timeB = $derived(minutes * 60);
    let activeA = $state(false);
    let activeB = $state(false);
    let countdownRunning = $state(false);
    let interval: number | undefined;

    const timeControls: TimeControl[] = [
        new TimeControl("1+0"),
        new TimeControl("2+1"),
        new TimeControl("3+0"),
        new TimeControl("3+2"),
        new TimeControl("5+0"),
        new TimeControl("5+3"),
        new TimeControl("10+0"),
        new TimeControl("10+5"),
        new TimeControl("15+10"),
        new TimeControl("30+0"),
        new TimeControl("45+0"),
    ];

    $effect(() => {
        if (timeA <= 0 || timeB <= 0) {
            countdownRunning = false;
        }
    });

    function startCountdown(which: "A" | "B") {
        countdownRunning = true;
        stopCountdown();
        if (which === "A") {
            activeA = true;
            activeB = false;
            timeA += increment;
        } else {
            activeA = false;
            activeB = true;
            timeB += increment;
        }
        interval = setInterval(() => {
            if (activeA && timeA > 0) {
                timeA -= 0.1;
                if (timeA <= 0) stopCountdown();
            } else if (activeB && timeB > 0) {
                timeB -= 0.1;
                if (timeB <= 0) stopCountdown();
            }
        }, 100);
    }

    function stopCountdown() {
        activeA = false;
        activeB = false;
        if (interval) {
            clearInterval(interval);
            interval = undefined;
        }
    }

    function handleClick(which: "A" | "B") {
        if (which === "A") {
            startCountdown("B");
        } else if (which === "B") {
            startCountdown("A");
        }
    }

    function reset() {
        countdownRunning = false;
        timeA = minutes * 60;
        timeB = minutes * 60;
        stopCountdown();
    }

    function pause() {
        countdownRunning = !countdownRunning;
        if (interval) {
            clearInterval(interval);
            interval = undefined;
        }
    }

    function showModal() {
        (
            document.getElementById("timeControlModal") as HTMLDialogElement
        )?.showModal();
    }
</script>

<div class="flex flex-col p-5 h-screen items-center justify-center">
    <ClockButton
        rotated={true}
        time={timeA}
        active={activeA}
        onClick={() => handleClick("A")}
        {countdownRunning}
        mode={currentTimeControl.mode}
    />
    <div class="flex flex-row justify-between">
        <button
            hidden={currentTimeControl.name !== "0+0"}
            class="btn mx-3"
            onclick={showModal}
            >{currentTimeControl.name === "0+0"
                ? "Choose Time Control"
                : currentTimeControl.name}</button
        >
        <dialog id="timeControlModal" class="modal">
            <div class="modal-box">
                <form method="dialog">
                    {#each timeControls as t}
                        <button
                            class="btn btn-soft w-full my-1"
                            class:btn-secondary={t.mode == "Bullet"}
                            class:btn-accent={t.mode == "Blitz"}
                            class:btn-primary={t.mode == "Rapid"}
                            onclick={() => {
                                currentTimeControl = t;
                                reset();
                            }}>{t.name}</button
                        >
                    {/each}
                </form>
            </div>
        </dialog>

        <button
            hidden={currentTimeControl.name === "0+0"}
            disabled={countdownRunning}
            onclick={showModal}
            class:btn-secondary={currentTimeControl.mode == "Bullet"}
            class:btn-accent={currentTimeControl.mode == "Blitz"}
            class:btn-primary={currentTimeControl.mode == "Rapid"}
            class="btn btn-ghost mr-5"
            >{currentTimeControl.mode}: {currentTimeControl.name}</button
        >
        <button
            class="btn btn-soft btn-accent"
            class:btn-error={!countdownRunning}
            hidden={currentTimeControl.name === "0+0"}
            onclick={() => (countdownRunning ? pause() : reset())}
            >{countdownRunning ? "pause" : "reset"}</button
        >
    </div>
    <ClockButton
        time={timeB}
        active={activeB}
        onClick={() => handleClick("B")}
        {countdownRunning}
        mode={currentTimeControl.mode}
    />
</div>
