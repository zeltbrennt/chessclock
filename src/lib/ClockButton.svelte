<script lang="ts">
    import type { ClockButtonProps } from "./interfaces";
    let {
        time,
        active,
        onClick,
        countdownRunning,
        rotated = false,
    }: ClockButtonProps = $props();
    let seconds = $derived(time % 60);
    let minutes = $derived(Math.floor(time / 60));
</script>

<button
    onclick={() => {
        if (time > 0) onClick();
    }}
    class="btn w-full flex-1 my-5 text-9xl"
    class:rotate-180={rotated}
    class:btn-primary={active && time >= 10}
    class:btn-warning={active && time < 10 && time > 0}
    class:btn-error={time <= 0}
    disabled={!active && countdownRunning}
    >{time <= 0 ? "0" : minutes}:{time < 10
        ? time <= 0
            ? "0"
            : seconds.toFixed(1)
        : seconds.toFixed(0)}</button
>
