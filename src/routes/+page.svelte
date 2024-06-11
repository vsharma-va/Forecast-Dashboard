<script>
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import { gsap } from "gsap/dist/gsap";
    import { onMount } from "svelte";

    let currentTime;
    onMount(() => {
        setInterval(updateCurrentTime, 1000);
    })
    function updateCurrentTime() {
        let d = new Date();
        currentTime = d.toLocaleTimeString();
    }

    $: reactiveTime = currentTime;

</script>

<div
    class="h-screen w-full flex flex-col items-center justify-center bg-surface gap-2 relative"
>
    <div class="absolute top-3 left-3 primary-font text-2xl text-on-surface tracking-wide">
        {reactiveTime}
    </div>
    <div class="absolute top-3 right-3 primary-font text-2xl text-on-surface tracking-wide">
        Welcome!
    </div>
    <div
        class="h-fit w-full flex flex-row items-center justify-center text-primary primary-font text-[6rem] leading-[1] tracking-wider font-extrabold"
    >
        <p class="">DASHBOARD</p>
    </div>
    <div class="flex flex-row h-fit w-full justify-center items-center brand-font text-3xl text-on-surface">
        Nihilent Ltd.
    </div>
</div>
