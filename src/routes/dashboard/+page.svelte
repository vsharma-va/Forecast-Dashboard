<script>
    import {enhance} from "$app/forms";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import ProjectCard from "../../lib/components/dashboard/ProjectCard.svelte";

    export let data;
    export let form;
    let numberOfFormComplete = 0;
    let totalNumberOfForms = 2;
    let userDisplayName;
    let joinCode;
    let errors = {userDisplayNameError: "", joinCodeError: ""};

    onMount(() => {
        if (data?.foundUser && !data?.projectsFound) {
            numberOfFormComplete = 1;
        }
        if (data?.foundUser && data?.projectsFound) {
            numberOfFormComplete = 100;
            console.log($page.data.session.user.email);
        }
    });

    function submitFirstTimeForm({formData}) {
        formData.set("userDisplayName", userDisplayName);
        if (joinCode !== undefined && joinCode?.length == 6) {
            console.log(userDisplayName);
            formData.set("joinCode", joinCode);
        }
        if (!joinCode || joinCode.length < 6) {
            errors.joinCodeError = "Please enter a valid join code";
        }
    }

    $: reactivePercentage = (numberOfFormComplete / totalNumberOfForms) * 100;
</script>

{#if numberOfFormComplete !== 100}
    <div class="h-screen w-full bg-surface flex items-center justify-center">
        {#if !data.foundUser || !data.projectsFound}
            <div
                    class="h-fit w-full flex flex-col items-start justify-center px-8"
            >
                <div class="h-[4px] rounded-xl w-full bg-primary/40 mb-2">
                    <div
                            class="h-full rounded-xl bg-primary transition-width ease-in-out duration-300"
                            style="width: {reactivePercentage}%"
                    ></div>
                </div>
                <p class="primary-font text-4xl tracking-wide text-on-surface">
                    LOOKS LIKE ITS YOUR FIRST TIME!
                </p>
                <p
                        class="regular-font text-sm tracking-wide text-on-surface/70"
                >
                    Please fill out the below required details
                </p>
                {#if numberOfFormComplete == 0}
                    <div class="form__group field w-full">
                        <input
                                type="input"
                                class="form__field regular-font"
                                placeholder="Name"
                                required=""
                                on:input={() => {
                                errors.userDisplayNameError = "";
                            }}
                                bind:value={userDisplayName}
                        />
                        {#if errors.userDisplayNameError}
                            <p
                                    class="text-sm text-error regular-font capitalize"
                            >
                                {errors.userDisplayNameError}
                            </p>
                        {/if}
                        <label
                                for="name"
                                class="form__label regular-font text-xl"
                        >Display Name</label
                        >
                    </div>
                    <div class="w-full h-fit flex items-center justify-center">
                        <button
                                class=" bg-primary-container text-on-primary-container primary-font rounded-xl px-4 py-2 mt-4 text-lg w-full"
                                on:click={() => {
                                if (!userDisplayName) {
                                    errors.userDisplayNameError =
                                        "Please enter a valid display name ):";
                                }
                                if (!errors.userDisplayNameError) {
                                    numberOfFormComplete++;
                                }
                                console.log(reactivePercentage);
                            }}
                        >
                            NEXT
                        </button>
                    </div>
                {:else if numberOfFormComplete == 1}
                    <div
                            class="h-fit w-full flex flex-col items-center justify-center"
                    >
                        <div class="form__group field w-full">
                            <input
                                    type="input"
                                    class="form__field regular-font"
                                    placeholder="Name"
                                    required=""
                                    bind:value={joinCode}
                                    on:input={() => {
                                    errors.joinCodeError = "";
                                    form.errorDetails = "";
                                }}
                            />
                            {#if errors.joinCodeError}
                                <p
                                        class="text-sm text-error regular-font capitalize"
                                >
                                    {errors.joinCodeError}
                                </p>
                            {/if}
                            {#if form?.error}
                                <p
                                        class="text-sm text-error regular-font capitalize"
                                >
                                    {form.errorDetails}
                                </p>
                            {/if}
                            <label
                                    for="name"
                                    class="form__label regular-font text-xl"
                            >Join Code</label
                            >
                        </div>
                        <div
                                class="w-full h-fit flex items-center justify-center"
                        >
                            <form
                                    action="?/registerWithJoinTeam"
                                    method="post"
                                    class="flex flex-col items-start justify-center w-full"
                                    use:enhance={(event) => {
                                    submitFirstTimeForm(event);
                                }}
                            >
                                <button
                                        class=" bg-primary-container text-on-primary-container primary-font rounded-xl px-4 py-2 mt-4 text-lg w-full"
                                        type="submit"
                                >
                                    JOIN!
                                </button>
                            </form>
                        </div>
                        <p
                                class="primary-font text-on-surface text-xl mt-2 mb-2"
                        >
                            OR
                        </p>
                        <div
                                class="flex flex-col items-start justify-center w-full"
                        >
                            <button
                                    class="bg-primary-container text-on-primary-container primary-font rounded-xl px-4 py-2 text-lg w-full"
                                    on:click={() => {
                                    goto("/dashboard/create-new-team");
                                }}
                            >
                                CREATE A NEW TEAM
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{:else}
    <div class="h-full min-h-screen w-[100vw] bg-surface flex flex-col items-center justify-center pt-3">
        <div
                class="flex flex-col items-center justify-start w-[75%] gap-3"
        >
            {#each data.projectInfo as information}
                <ProjectCard projectName="{information.name}"
                             isOwner="{information.owner === $page.data.session.user.email}"
                             gotoLink="{information.join_code}"/>
            {/each}
        </div>
        <div class="mb-20"></div>
    </div>
{/if}

<style>
    .form__group {
        position: relative;
        padding: 20px 0 0;
        width: 100%;
        /* max-width: 180px; */
    }

    .form__field {
        font-family: "Poppins";
        width: 100%;
        border: none;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 14px;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
    }

    .form__field::placeholder {
        color: transparent;
    }

    .form__field:placeholder-shown ~ .form__label {
        font-size: 14px;
        cursor: text;
        top: 20px;
    }

    .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 14px;
        color: #9b9b9b;
        pointer-events: none;
    }

    .form__field:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #afffd3, #00df98);
        border-image-slice: 1;
    }

    .form__field:focus ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 14px;
        color: #dbe5dc;
        font-weight: 700;
    }

    /* reset input */
    .form__field:required,
    .form__field:invalid {
        box-shadow: none;
    }
</style>
