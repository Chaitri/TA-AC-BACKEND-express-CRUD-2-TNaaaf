writeCode

Q. write express generator command with varying options to generate express app with following features:

- using ejs as template engine

```js
express --view=ejs sample
```

- no views for express application

```js
express --no-view sample
```

- express app with gitignore

```js
express --git sample
```

- express app with sass support for styling.

```js
express --css=sass sample
```

- ejs as template engine and sass for styling

```js
express --css=sass --view=ejs sample
```

- pug as template engine and gitignore together

```js
express --view=pug --git sample
```
