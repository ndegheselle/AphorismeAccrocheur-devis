export default /*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .item {
      border-bottom: 1px solid #eee;
      padding: 10px 0;
    }
    footer {
      margin-top: 30px;
      color: #777;
    }
  </style>
</head>
<body>
  <header>
    <h1>{{heading}}</h1>
    <p>{{description}}</p>
  </header>
  
  <main>
    <h2>Items List</h2>
    {{#if items.length}}
      <ul>
        {{#each items}}
          <li class="item">
            <strong>{{this.name}}</strong> - {{this.price}}
          </li>
        {{/each}}
      </ul>
    {{else}}
      <p>No items to display</p>
    {{/if}}
  </main>
  
  <footer>
    {{footer}}
  </footer>
</body>
</html>
`;