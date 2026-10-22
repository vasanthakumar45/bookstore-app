const express = require('express');

const app = express();
app.use(express.json());

// In-memory data (a real project would use a database like AWS RDS/DynamoDB)
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 450 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', price: 520 },
  { id: 3, title: 'Docker Deep Dive', author: 'Nigel Poulton', price: 399 },
];

// Home page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Online Bookstore</h1><p>Try <a href="/books">/books</a></p>');
});

// Health check - used by Kubernetes readinessProbe
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get one book by id
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id, 10));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  if (!title || !author || price === undefined) {
    return res.status(400).json({ error: 'title, author and price are required' });
  }
  const newBook = {
    id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1,
    title,
    author,
    price,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exists = books.some((b) => b.id === id);
  if (!exists) return res.status(404).json({ error: 'Book not found' });
  books = books.filter((b) => b.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

// Start the server only when run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => console.log(`Bookstore running on port ${PORT}`));
}

module.exports = app;
