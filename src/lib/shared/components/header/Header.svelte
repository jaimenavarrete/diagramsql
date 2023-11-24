<script>
    import Logo from './../../../../assets/images/logo.svg';

    export let title;
    export let description;
</script>

<header>
    <section class="left-content">
        <a href="/" class="logo-wrapper">
            <figure><img src={Logo} alt="DiagramSQL Logo" /></figure>
            <h1>Diagram<span>SQL</span></h1>
        </a>
        <div class="diagram-info">
            <input
                type="text"
                bind:value={title}
                size="35"
                class="title"
                placeholder="No title"
            />
            <input
                type="text"
                bind:value={description}
                size="37"
                class="description"
                placeholder="No description"
            />
        </div>
    </section>
</header>

<style>
    header {
        border-bottom: 1px solid #e4e4e4;
        height: 65px;
    }

    .left-content {
        height: 100%;

        display: flex;
    }

    .logo-wrapper {
        background-color: #5865f2;
        margin-right: 15px;
        max-width: 300px;
        padding: 0 20px;
        text-decoration: none;

        display: flex;
        align-items: center;
    }

    figure {
        margin-right: 10px;
        max-width: 50px;
    }

    img {
        display: block;
        width: 100%;
    }

    h1 {
        color: #fff;
        font-weight: normal;
        font-size: 1.5em;
    }

    h1 span {
        font-weight: bold;
        margin-left: 3px;
    }

    .diagram-info {
        padding-top: 8px;
    }

    .title,
    .description {
        border: none;
        border-bottom: 1px dashed transparent;
        display: block;
        padding-bottom: 1px;
        transition: all 0.1s ease-out;
    }

    .title {
        color: #5865f2;
        font-family: 'Comfortaa', sans-serif, Arial, Helvetica;
        font-size: 1.2em;
        font-weight: bold;
        margin: 0;
        margin-bottom: 5px;
        text-transform: none;
    }

    .description {
        color: #4e4e4e;
        font-size: 0.83em;
    }

    .title:focus,
    .title:hover,
    .description:focus,
    .description:hover {
        border-color: #5865f2;
        outline: none;
    }

    .description:focus {
        border-color: #4e4e4e;
    }

    .title::placeholder {
        color: #5865f260;
    }

    .description::placeholder {
        color: #b3b3b3;
    }
</style>
