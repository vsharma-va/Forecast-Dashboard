<script>
    import {goto} from "$app/navigation";

    export let projectName;
    export let isOwner;
    export let gotoLink;
</script>

<div class="h-[195px] w-full flex flex-col justify-between bg-tertiary-container text-on-primary-container border-2 border-on-primary-container rounded-xl px-4 py-2">
    <div class="flex flex-row items-center justify-between h-fit w-full">
        <p class="primary-font text-4xl text-on-tertiary-container text-left text-wrap">
            {projectName}
        </p>
        <p class="primary-font text-2xl text-on-tertiary-container">
            {#if isOwner}
                Owner
            {:else}
                Member
            {/if}
        </p>
    </div>
    <div class="flex flex-row items-center justify-end h-fit w-full">
        <button class="px-3 py-2 rounded-xl text-xl bg-on-tertiary-container w-fit h-fit text-tertiary-container primary-font"
                on:click={goto(`/dashboard/project/${gotoLink}`)}>
            SELECT
        </button>
    </div>
</div>