import React, { useState } from 'react';

export default function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Books Management
  const [newBook, setNewBook] = useState({
    bookId: '',
    title: '',
    author: '',
    totalCopies: '',
    isbn: '',
    category: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [studentId, setStudentId] = useState('');
  const [issueBookId, setIssueBookId] = useState('');
  const [daysAllowed, setDaysAllowed] = useState(14);
  const [returnIssueId, setReturnIssueId] = useState('');
  const [bookHistory, setBookHistory] = useState(null);
  const [eligibilityStatus, setEligibilityStatus] = useState(null);

  // Fetch all books
  async function fetchBooks() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:8080/api/books');
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setBooks(Array.isArray(body) ? body : []);
      setMessage({ ok: true, msg: 'Books fetched successfully' });
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Add new book
  async function addBook() {
    if (!newBook.bookId || !newBook.title) {
      setMessage({ ok: false, msg: 'Book ID and Title are required' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        ...newBook,
        totalCopies: parseInt(newBook.totalCopies) || 0,
      };
      const res = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setMessage({ ok: true, msg: 'Book added successfully' });
      setNewBook({ bookId: '', title: '', author: '', totalCopies: '', isbn: '', category: '' });
      await fetchBooks();
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Search books
  async function searchBooks() {
    if (!searchQuery) {
      setMessage({ ok: false, msg: 'Enter search query' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:8080/api/books/search?query=${encodeURIComponent(searchQuery)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setBooks(Array.isArray(body) ? body : []);
      setMessage({ ok: true, msg: `Found ${body.length || 0} books` });
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Delete book
  async function deleteBook(bookId) {
    if (!window.confirm(`Delete book ${bookId}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/books/${encodeURIComponent(bookId)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setMessage({ ok: true, msg: 'Book deleted successfully' });
      await fetchBooks();
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Issue book
  async function issueBook() {
    if (!studentId || !issueBookId) {
      setMessage({ ok: false, msg: 'Student ID and Book ID are required' });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        studentId,
        bookId: issueBookId,
        daysAllowed: parseInt(daysAllowed) || 14,
      };
      const res = await fetch('http://localhost:8080/api/books/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setMessage({ ok: true, msg: `Book issued successfully. Issue ID: ${body.issueId || body.id}` });
      setStudentId('');
      setIssueBookId('');
      setDaysAllowed(14);
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Return book
  async function returnBook() {
    if (!returnIssueId) {
      setMessage({ ok: false, msg: 'Issue ID is required' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/books/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueId: parseInt(returnIssueId) }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setMessage({ ok: true, msg: 'Book returned successfully' });
      setReturnIssueId('');
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Check eligibility
  async function checkEligibility() {
    if (!studentId) {
      setMessage({ ok: false, msg: 'Enter Student ID' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/books/eligible/${encodeURIComponent(studentId)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setEligibilityStatus(body);
      setMessage({ ok: true, msg: 'Eligibility checked' });
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Get student book history
  async function getStudentHistory() {
    if (!studentId) {
      setMessage({ ok: false, msg: 'Enter Student ID' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/books/history/${encodeURIComponent(studentId)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(body));
      setBookHistory(body);
      setMessage({ ok: true, msg: 'History fetched' });
    } catch (err) {
      setMessage({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Library Management System</h1>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
        {['books', 'add', 'issue', 'return', 'history', 'eligibility'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: activeTab === tab ? '#1976d2' : '#f0f0f0',
              color: activeTab === tab ? 'white' : '#333',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Message Display */}
      {message && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            borderRadius: 4,
            background: message.ok ? '#d4edda' : '#f8d7da',
            color: message.ok ? '#155724' : '#721c24',
            border: `1px solid ${message.ok ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {message.msg}
        </div>
      )}

      {/* Books List Tab */}
      {activeTab === 'books' && (
        <div>
          <h2>Available Books</h2>
          <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <button onClick={searchBooks} disabled={loading} className="btn" style={{ background: '#1976d2' }}>
              Search
            </button>
            <button onClick={fetchBooks} disabled={loading} className="btn" style={{ background: '#28a745' }}>
              All Books
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {books.length > 0 ? (
              books.map(book => (
                <div key={book.bookId} style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, background: '#fff' }}>
                  <h3>{book.title}</h3>
                  <p><strong>ID:</strong> {book.bookId}</p>
                  <p><strong>Author:</strong> {book.author || 'N/A'}</p>
                  <p><strong>Category:</strong> {book.category || 'N/A'}</p>
                  <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
                  <p><strong>Total Copies:</strong> {book.totalCopies || 0}</p>
                  <p><strong>Available:</strong> {book.availableCopies || 0}</p>
                  <button onClick={() => deleteBook(book.bookId)} disabled={loading} style={{ background: '#dc3545', color: 'white', padding: '8px 12px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
        </div>
      )}

      {/* Add Book Tab */}
      {activeTab === 'add' && (
        <div>
          <h2>Add New Book</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, maxWidth: 700 }}>
            {[
              { key: 'bookId', label: 'Book ID', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'author', label: 'Author', type: 'text' },
              { key: 'isbn', label: 'ISBN', type: 'text' },
              { key: 'category', label: 'Category', type: 'text' },
              { key: 'totalCopies', label: 'Total Copies', type: 'number' },
            ].map(field => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.label}
                value={newBook[field.key]}
                onChange={e => setNewBook({ ...newBook, [field.key]: e.target.value })}
                style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
              />
            ))}
          </div>
          <button onClick={addBook} disabled={loading} className="btn" style={{ marginTop: 16, background: '#28a745', color: 'white', padding: '10px 20px' }}>
            Add Book
          </button>
        </div>
      )}

      {/* Issue Book Tab */}
      {activeTab === 'issue' && (
        <div>
          <h2>Issue Book to Student</h2>
          <div style={{ maxWidth: 500, display: 'grid', gap: 12 }}>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <input
              type="text"
              placeholder="Book ID"
              value={issueBookId}
              onChange={e => setIssueBookId(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <input
              type="number"
              placeholder="Days Allowed"
              value={daysAllowed}
              onChange={e => setDaysAllowed(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <button onClick={issueBook} disabled={loading} className="btn" style={{ background: '#007bff', color: 'white', padding: '10px 20px' }}>
              Issue Book
            </button>
          </div>
        </div>
      )}

      {/* Return Book Tab */}
      {activeTab === 'return' && (
        <div>
          <h2>Return Book</h2>
          <div style={{ maxWidth: 500, display: 'grid', gap: 12 }}>
            <input
              type="number"
              placeholder="Issue ID"
              value={returnIssueId}
              onChange={e => setReturnIssueId(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <button onClick={returnBook} disabled={loading} className="btn" style={{ background: '#6f42c1', color: 'white', padding: '10px 20px' }}>
              Return Book
            </button>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div>
          <h2>Student Book History</h2>
          <div style={{ maxWidth: 500, display: 'grid', gap: 12, marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <button onClick={getStudentHistory} disabled={loading} className="btn" style={{ background: '#17a2b8', color: 'white', padding: '10px 20px' }}>
              Get History
            </button>
          </div>
          {bookHistory && (
            <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, background: '#f9f9f9' }}>
              <h3>Book Issues & Returns</h3>
              {bookHistory.issues && bookHistory.issues.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: 8, textAlign: 'left' }}>Issue ID</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Book</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Issued Date</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Due Date</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Returned</th>
                      <th style={{ padding: 8, textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookHistory.issues.map(issue => (
                      <tr key={issue.issueId} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: 8 }}>{issue.issueId}</td>
                        <td style={{ padding: 8 }}>{issue.bookId}</td>
                        <td style={{ padding: 8 }}>{issue.issuedDate || 'N/A'}</td>
                        <td style={{ padding: 8 }}>{issue.dueDate || 'N/A'}</td>
                        <td style={{ padding: 8 }}>{issue.returnedDate || '-'}</td>
                        <td style={{ padding: 8, color: issue.isOverdue ? '#dc3545' : '#28a745' }}>
                          {issue.isOverdue ? 'Overdue' : 'Active'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No book issues found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Eligibility Tab */}
      {activeTab === 'eligibility' && (
        <div>
          <h2>Check Student Eligibility</h2>
          <div style={{ maxWidth: 500, display: 'grid', gap: 12, marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4 }}
            />
            <button onClick={checkEligibility} disabled={loading} className="btn" style={{ background: '#ffc107', color: '#333', padding: '10px 20px' }}>
              Check Eligibility
            </button>
          </div>
          {eligibilityStatus && (
            <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, background: '#f9f9f9', maxWidth: 500 }}>
              <h3>Eligibility Status</h3>
              <p><strong>Eligible:</strong> {eligibilityStatus.eligible ? 'Yes' : 'No'}</p>
              <p><strong>Books Borrowed:</strong> {eligibilityStatus.borrowedCount || 0}</p>
              <p><strong>Max Allowed:</strong> 3</p>
              <p><strong>Overdue Books:</strong> {eligibilityStatus.overdueCount || 0}</p>
              {eligibilityStatus.reason && <p><strong>Reason:</strong> {eligibilityStatus.reason}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
