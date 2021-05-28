const {
  addBookHandler, getAllbookHandle, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllbookHandle,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getbookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editbookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deletebookByIdHandler,
  },
];

module.exports = routes;
