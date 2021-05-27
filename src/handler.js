const { nanoid } = require("nanoid");
const book = require("./books");


const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(name == ''){
        const response = doResponse(h, "fail", "Gagal menambahkan buku. Mohon isi nama buku");
        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = doResponse(h, "fail", "Gagal menambahkan buku. readPage tidak boleh lebih dari pageCount");
        response.code(400);
        return response;
    }

    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, insertedAt, updatedAt
    };

    book.push(newBook);

    const isSuccess = book.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const data = book.filter((book) => {
            if (book.id === id) {
                return {
                    id: id,
                    name: book.name,
                    year: book.year,
                    author: book.author,
                    summary: book.summary,
                    publisher: book.publisher,
                    pageCount: book.pageCount,
                    readPage: book.readPage,
                    reading: book.reading,
                    insertedAt: book.insertedAt,
                    updatedAt: book.updatedAt
                }
            }
        });
        const response = h.response({
            id: id,
            name: data[0].name,
            year: data[0].year,
            author: data[0].author,
            summary: data[0].summary,
            publisher: data[0].publisher,
            pageCount: data[0].pageCount,
            readPage: data[0].readPage,
            reading: data[0].reading,
            finished: data[0].pageCount === data[0].readPage ? true : false,
            insertedAt: data[0].insertedAt,
            updatedAt: data[0].updatedAt
        });
        response.code(201);
        return response;
    }

    const response = doResponse(h, "error", "Buku gagal ditambahkan");
    response.code(500);
    return response;
};

function doResponse(h, status, message) {
    h.response({status: status, message:message})
}

// const getAllbookHandle = () => ({
//     status: 'success',
//     data: {
//         book,
//     }
// });

// const getbookByIdHandler = (request, h) => {
//     const { id } = request.params;
//     const book = book.filter((n) => n.id === id)[0];

//     if (book !== undefined) {
//         return {
//             status: 'success',
//             data: {
//                 book
//             }
//         };
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Catatan tidak ditemukan'
//     });
//     response.code(400);
//     return response;
// }

// const editbookByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const { title, tags, body } = request.payload;
//     const updatedAt = new Date().toISOString();

//     const index = book.findIndex((book) => book.id === id);

//     if (index !== -1) {
//         book[index] = {
//             ...book[index],
//             title,
//             tags,
//             body,
//             updatedAt
//         };
//         const response = h.response({
//             status: 'success',
//             message: 'Catatan berhasil diperbaharui',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbaharui catatan, id tidak ditemukan'
//     });
//     response.code(404);
//     return response;
// }

// const deletebookByIdHandler = (request, h) => {
//     const { id } = request.params;
//     const index = book.findIndex((book) => book.id === id);

//     if (index !== -1) {
//         book.splice(index, 1);
//         const response = h.response({
//             status: 'success',
//             message: 'Catatan berhasil dihapus'
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Catatan gagal dihapus. Id tidak ditemukan'
//     });
//     response.code(404);
//     return response;
// }

module.exports = { addBookHandler };//, getAllbookHandle, getbookByIdHandler, editbookByIdHandler, deletebookByIdHandler };