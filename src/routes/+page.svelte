<script lang="ts">
    import ClockButton from "$lib/ClockButton.svelte";

    let minutes = $state(10);
    let increment = $state(0);
    let timeA = $derived(minutes * 60);
    let timeB = $derived(minutes * 60);
    let activeA = $state(false);
    let activeB = $state(false);
    let countdownRunning = $state(false);
    let interval: number | undefined;

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
</script>

<div class="flex flex-col p-10 h-screen items-center justify-center">
    <ClockButton
        rotated={true}
        time={timeA}
        active={activeA}
        onClick={() => handleClick("A")}
        {countdownRunning}
    />
    <div class="flex flex-row">
        <input
            type="number"
            min="0"
            disabled={countdownRunning}
            class="input"
            bind:value={minutes}
        />
        <input
            type="number"
            min="0"
            disabled={countdownRunning}
            class="input mx-2"
            bind:value={increment}
        />
        <button
            class="btn btn-soft btn-accent"
            onclick={() => (countdownRunning ? pause() : reset())}
            >{countdownRunning ? "pause" : "reset"}</button
        >
    </div>
    <ClockButton
        time={timeB}
        active={activeB}
        onClick={() => handleClick("B")}
        {countdownRunning}
    />
</div>
