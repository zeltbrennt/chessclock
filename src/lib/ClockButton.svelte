<script lang="ts">
    import type { ClockButtonProps } from "./interfaces";
    let {
        time,
        active,
        onClick,
        countdownRunning,
        rotated = false,
        mode,
    }: ClockButtonProps = $props();
    let seconds = $derived(Math.floor(time % 60));
    let minutes = $derived(Math.floor(time / 60));
    let tenths = $derived(Math.floor(((time % 60) * 10) % 10));

    const timeWarning = 45;
</script>

<button
    onclick={() => {
        if (time > 0) onClick();
    }}
    class="btn w-full flex-1 my-5 text-7xl font-mono countdown rounded-2xl"
    class:rotate-180={rotated}
    class:btn-primary={active && time >= timeWarning && mode == "Rapid"}
    class:btn-accent={active && time >= timeWarning && mode == "Blitz"}
    class:btn-secondary={active && time >= timeWarning && mode == "Bullet"}
    class:btn-warning={active && time < timeWarning && time > 0}
    class:btn-error={time <= 0}
    disabled={!active && countdownRunning}
>
    {#if time <= 0}
        X
    {:else}
        {minutes}:<span style="--value:{seconds}">{seconds}</span>
        {#if time < timeWarning}
            .{tenths}
        {/if}
    {/if}</button
>
