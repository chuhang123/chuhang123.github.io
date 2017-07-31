
### hexo-tag-table-bootstrap, description and uses ###
hexo-tag-table-bootstrap is a [hexo tag-plugin](https://hexo.io/docs/tag-plugins.html) for adding the class attribute to the table tag. The values of the class are based on bootstrap. You can customize the tables of your posts with the bootstrap style sheets.
This tag-plugin works for hexo themes based on bootstrap, for example the [freewill theme](https://github.com/yieme/hexo-theme-freewill), for this theme, the tables are rendered without the class attribute showing without style.
```
<table>
</table>
```
You need to install [hexo-tag-table-bootstrap](https://github.com/jorgeabad/hexo-tag-table-bootstrap) first. In your blog root folder, execute the following command:
```
$ npm install hexo-tag-table-bootstrap --save
```
Then you can use this tag plugins in your blog, as easily as you normally do using hexo tag plugins.

### Syntax ###
```
{% table [class] %}
  table md
{% endtable %}
```
The class attribute is optional:
- table-striped
- table-bordered
- table-hover
- table-condensed

### Example ###
```
{% table %}

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

{% endtable %}

```
### Result ###
```
<table class="table">
```
![table!](https://raw.githubusercontent.com/jorgeabad/hexo-tag-table-bootstrap/master/img/table1.png)


### Example ###
```
{% table table-striped %}

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

{% endtable %}

```
### Result ###
```
<table class="table table-striped">
```
![table table-striped!](https://raw.githubusercontent.com/jorgeabad/hexo-tag-table-bootstrap/master/img/table.png)
