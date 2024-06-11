<script>
	import { enhance } from '$app/forms';

    let projectName;
    let projectDescription;

    function submitForm({ formData }) {
        formData.set('projectName', projectName);
        formData.set('projectDescription', projectDescription);
    }

</script>

<div
    class="h-screen w-full bg-surface flex flex-col items-center justify-center"
>
    <form action="?/createNewTeam" method="post" class="h-fit w-full" use:enhance={(event) => {
        submitForm(event);
    }}>
        <div class="h-fit w-full flex flex-col items-start justify-center px-8">
            <p class="primary-font text-4xl tracking-wide text-on-surface">
                CREATE A NEW TEAM
            </p>
            <p class="regular-font text-sm tracking-wide text-on-surface/70">
                Please fill out the below required details
            </p>
            <div class="form__group field w-full">
                <input
                    type="input"
                    class="form__field regular-font"
                    placeholder="Name"
                    required=""
                    bind:value={projectName}
                />
                <label for="name" class="form__label regular-font text-xl"
                    >Project Name</label
                >
            </div>
            <div class="form__group field w-full">
                <input
                    type="input"
                    class="form__field regular-font"
                    placeholder="Name"
                    required=""
                    bind:value={projectDescription}
                />
                <label for="name" class="form__label regular-font text-xl"
                    >Description</label
                >
            </div>
            <button
                class=" bg-primary-container text-on-primary-container primary-font rounded-xl px-4 py-2 mt-4 text-lg w-full"
                type="submit"
            >
                SUBMIT
            </button>
        </div>
    </form>
</div>

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
