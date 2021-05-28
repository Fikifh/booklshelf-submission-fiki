const { nanoid } = require('nanoid');
const book = require('./books');

function doResponse(h, statusValue, messageValue, httpCode) {
  const response = h.response({ status: statusValue, message: messageValue });
  response.code(httpCode);
  return response;
}

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (typeof name === 'undefined') {
    return doResponse(
      h,
      'fail',
      'Gagal menambahkan buku. Mohon isi nama buku',
      400,
    );
  }

  if (readPage > pageCount) {
    return doResponse(
      h,
      'fail',
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      400,
    );
  }

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
  };

  book.push(newBook);

  const isSuccess = book.filter((item) => item.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = doResponse(h, 'error', 'Buku gagal ditambahkan');
  response.code(500);
  return response;
};

const getAllbookHandle = (request, h) => {
  const dataBook = [];
  const { reading } = request.params;
  book.filter((item) => {
    if (typeof item.id !== 'function') {
      if (reading === 1) {
        if (item.finished === 1) {
          dataBook.push(item);
        } else {
          dataBook.push(item);
        }
      } else {
        dataBook.push(item);
      }
    }
    return item;
  });
  const response = h.response({
    status: 'success',
    data: {
      books: dataBook.map((item) => ({
        id: item.id,
        name: item.name,
        publisher: item.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getbookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const dataBook = book.filter((n) => n.id === bookId)[0];

  if (dataBook !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book: {
          id: dataBook.id,
          name: dataBook.name,
          year: dataBook.year,
          author: dataBook.author,
          summary: dataBook.summary,
          publisher: dataBook.publisher,
          pageCount: dataBook.pageCount,
          readPage: dataBook.readPage,
          finished: dataBook.readPage === dataBook.pageCount,
          reading: dataBook.reading,
          insertedAt: dataBook.insertedAt,
          updatedAt: dataBook.updatedAt,
        },
      },
    });
  }
  return doResponse(h, 'fail', 'Buku tidak ditemukan', 404);
};

const editbookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (typeof name === 'undefined') {
    return doResponse(
      h,
      'fail',
      'Gagal memperbarui buku. Mohon isi nama buku',
      400,
    );
  }

  if (readPage > pageCount) {
    return doResponse(
      h,
      'fail',
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      400,
    );
  }

  const updatedAt = new Date().toISOString();

  const index = book.findIndex((item) => item.id === bookId);

  console.log(index);
  if (index !== -1) {
    book[index] = {
      ...book[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        book: {
          id: book[index].id,
          name: book[index].name,
          year: book[index].year,
          author: book[index].author,
          summary: book[index].summary,
          publisher: book[index].publisher,
          pageCount: book[index].pageCount,
          readPage: book[index].readPage,
          finished: book[index].readPage === book[index].pageCount,
          reading: book[index].reading,
          insertedAt: book[index].insertedAt,
          updatedAt: book[index].updatedAt,
        },
      },
    });
    response.code(200);
    return response;
  }
  return doResponse(h, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan', 404);
};

const deletebookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = book.findIndex((item) => item.id === bookId);

  if (index !== -1) {
    book.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllbookHandle,
  getbookByIdHandler,
  editbookByIdHandler,
  deletebookByIdHandler,
};
