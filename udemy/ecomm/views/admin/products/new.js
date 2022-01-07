const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `
  });
};

//Default method for form is GET. Makes the request to server in the url. POST method includes the information inside the post request. Method property communicates how to send information to the backend server.

//The other option we can provide is enctype. how to encode the information. Default is "application/x-www-form-urlencoded". take form information and make it into a query string that can be transmitted inside a url. A file cannot be translated into a url format. We can't transmit a file in the url encoding scheme.

//multipart/form-data. send each part of the form as a separate part.