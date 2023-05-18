# ch2 prj

<details>
  <summary>ch2</summary>
  
  ### my blog

1. init app w bootstrap, routing & scss
<!-- 1. Foo
1. Bar
   - Baz
   - Qux -->

```js
ng new my-blog --routing --style=scss --directory ./

npm i bootstrap
// npm i bootstrap-icons

`styles.scss`
@import "~bootstrap/dist/css/bootstrap.min.css";
// @import "~bootstrap-icons/font/bootstrap-icons.css";
// @import "~bootstrap/scss/bootstrap.scss";
```

2. add repo

```js
echo "# book-prj" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:viktishchenko/book-prj.git
git push -u origin master
```

![Alt text](src/readmeAssets/init-ch2.png)

</details>

<details>
  <summary>ch2.1</summary>

1. basic layout

- only once comp

```js
ng generate module core --dry-run

ng generate component header --path=src/app/core --module=core --export --dry-run
```

- more than once comp

```js
ng g m shared --dry-run

ng g c footer --path=src/app/shared --module=shared --export --dry-run
```

![Alt text](src/readmeAssets/basic-app-comp.png)

</details>
