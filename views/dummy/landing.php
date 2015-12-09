<header class="container-fluid">
    <div class="">
        <h1><?= $appInfo['title'] ?> <small><em><?= $appInfo['version'] ?></em></small></h1>
        <p><?=  $appInfo['description'] ?></p>
    </div>
</header>

<div class="container-fluid">
    <!--div class="page-header">
        <h2><?= $assets['title'] ?></h2>
    </div-->
    <nav>
        <ul class="nav nav-tabs">
            <li><a href="#">default</a></li>
            <li><a href="#page1">page 1</a></li>
            <li><a href="#page2">page 2</a></li>
            <li><a href="#none">error page</a></li>
        </ul>
    </nav>
    <div id="the_page" class="page well-lg">...</div>
</div>

<footer>
    <div class="container-fluid">&copy; <?= date("Y") ?> Copyright</div>
</footer>

<!-- Templates -->
<script id='pageTemplate' type='text/template'>
    <div>
        <h3><%= name %></h3>
        <p><%= body %></p>
    </div>
</script>
<script id='pageTemplateMustache' type='text/template'>
    <div>
        <h3>{{name}}</h3>
        <p>{{body}}</p>
    </div>
</script>
