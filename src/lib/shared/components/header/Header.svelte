<script>
    import Logo from './../../../../assets/images/logo-dark.png';
</script>

<header>
    <section class="left-content">
        <a href="/" class="logo-wrapper">
            <figure><img src={Logo} alt="DiagramSQL Logo" /></figure>
            <h1>Diagram<span>SQL</span></h1>
        </a>
        <div class="diagram-info">
            <h2>Untitled diagram</h2>
            <p>[No description]</p>
        </div>
    </section>
</header>

<style>
    header {
        border-bottom: 1px solid #e4e4e4;
        height: 5vh;
    }

    .left-content {
        height: 100%;

        display: flex;
    }

    .logo-wrapper {
        background-color: #5865f2;
        margin-right: 15px;
        max-width: 300px;
        padding: 15px;
        text-decoration: none;

        display: flex;
        align-items: center;
    }

    figure {
        margin-right: 10px;
        max-width: 60px;
    }

    img {
        display: block;
        width: 100%;
    }

    h1 {
        color: #fff;
        font-weight: normal;
        font-size: 1.75em;
    }

    h1 span {
        font-weight: bold;
        margin-left: 3px;
    }

    .diagram-info {
        margin: 7px;
    }

    h2 {
        font-size: 1.25em;
        margin: 0;
        margin-bottom: 3px;
        text-transform: none;
    }

    p {
        color: #4e4e4e;
        font-size: 0.9em;
    }
</style>
