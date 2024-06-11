<script>
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { gsap } from "gsap/dist/gsap";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let navOpen = false;
    let openNavTimeline;
    let closeNavTimeline;

    function controlNav() {
        if (navOpen) {
            closeNav();
        } else {
            openNav();
        }
        navOpen = !navOpen;
    }

    function openNav() {
        openNavTimeline = gsap.timeline();
        openNavTimeline.to(".navbar-container-width-controller", {
            width: "100%",
            ease: "power4.inOut",
            duration: 0.75,
        });
        openNavTimeline.to(
            ".navbar-container-height-controller",
            {
                height: "50%",
                ease: "power4.inOut",
                duration: 0.75,
            },
            "<0.2",
        );
        openNavTimeline.to(
            ".navbar-container-hidden-links",
            {
                opacity: 1,
                display: "flex",
                ease: "power4.inOut",
                duration: 0.35,
            },
            "<",
        );
    }

    function closeNav() {
        closeNavTimeline = gsap.timeline();
        closeNavTimeline.to(".navbar-container-height-controller", {
            height: "auto",
            ease: "power4.inOut",
            duration: 0.75,
        });
        closeNavTimeline.to(
            ".navbar-container-width-controller",
            {
                width: "90%",
                ease: "power4.inOut",
                duration: 0.75,
            },
            "<0.2",
        );
        closeNavTimeline.to(
            ".navbar-container-hidden-links",
            {
                opacity: 0,
                display: "hidden",
                ease: "power4.inOut",
                duration: 0.35,
            },
            "<",
        );
    }
</script>

<div class="h-fit w-full flex items-center justify-center">
    <div
        class="h-fit w-[85%] flex items-center justify-center fixed bottom-3 z-[2] navbar-container-height-controller"
    >
        <div
            class="absolute h-full w-[90%] flex-col flex items-center justify-center bg-primary-container rounded-xl py-3 px-4 navbar-container-width-controller gap-2"
        >
            <div class="h-fit w-fit text-on-primary-container hover:bg-surface hover:text-on-surface rounded-xl p-2 duration-300 transition-all">
                <a
                    class="text-3xl tracking-wide primary-font opacity-0 hidden navbar-container-hidden-links"
                    href="/dashboard"
                >
                    DASHBOARD
                </a>
            </div>
            <button
                class="text-on-primary-container text-3xl tracking-wide primary-font opacity-0 hidden navbar-container-hidden-links p-2 hover:bg-surface hover:text-on-surface rounded-xl transition-all duration-300"
                on:click={async () => {
                    await signOut({ callbackUrl: "/?signedOut" });
                }}
            >
                SIGNOUT
            </button>
        </div>
        <div
            class="h-fit w-[90%] flex flex-row self-end items-center justify-between bg-primary-container rounded-xl py-3 px-4 navbar-container-width-controller z-[2]"
        >
            <p class="primary-font text-3xl text-on-primary-container">
                {#if !$page.data.session?.user}
                    SIGN IN TO CONTINUE
                {:else}
                    HI {$page.data.session.user.name.toUpperCase()} !
                {/if}
            </p>
            <button
                class="p-2 px-4 rounded-xl bg-on-primary-container text-primary-container"
                on:click={async () => {
                    if (!$page.data.session?.user) {
                        await signIn("google", {
                            callbackUrl: `${$page.url.pathname}?signedIn`,
                        });
                    } else {
                        controlNav();
                        console.log("Implement open nav logic");
                    }
                }}
            >
                +
            </button>
        </div>
    </div>
</div>
