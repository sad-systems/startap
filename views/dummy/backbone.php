<div class="container-fluid">
    <div class="page-header">
        <h1><?= $assets['title'] ?></h1>
    </div>
    <ul class="nav nav-tabs">
        <li><a href="#">none</a></li>
        <li><a href="#main">main page</a></li>
        <li><a href="#test">test page</a></li>
    </ul>
    
    <div id="the_page" class="page well">...</div>
</div>

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