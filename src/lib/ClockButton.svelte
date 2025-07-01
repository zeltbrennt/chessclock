<script lang="ts">
    import type { ClockButtonProps } from "./interfaces";
    let {
        time,
        active,
        onClick,
        countdownRunning,
        rotated = false,
    }: ClockButtonProps = $props();
    let seconds = $derived(Math.floor(time % 60));
    let minutes = $derived(Math.floor(time / 60));
    let tenths = $derived((time % 60).toFixed(1).padStart(4, "0"));
</script>

<button
    onclick={() => {
        if (time > 0) onClick();
    }}
    class="btn w-full flex-1 my-5 text-7xl font-mono"
    class:rotate-180={rotated}
    class:btn-primary={active && time >= 10}
    class:btn-warning={active && time < 10 && time > 0}
    class:btn-error={time <= 0}
    disabled={!active && countdownRunning}
>
    {#if time <= 0}
        0:00
    {:else if time < 10}
        0:{tenths}
    {:else}
        {minutes}:{seconds.toString().padStart(2, "0")}
    {/if}</button
>
