<script>
    import Logo from '../../../assets/images/logo.svg';
</script>

<header>
    <a href="/" class="logo-wrapper">
        <figure><img src={Logo} alt="DiagramSQL Logo" /></figure>
        <h1>Diagram<span>SQL</span></h1>
    </a>
</header>

<style>
    header {
        background-color: #5865f2;
        border-bottom: 1px solid #e4e4e4;
        height: 65px;

        display: flex;
    }

    .logo-wrapper {
        padding: 7px 20px;
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
</style>
