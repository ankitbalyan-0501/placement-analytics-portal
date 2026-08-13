import { useState } from 'react';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState('');

  function addCompany() {
    if (companyName.trim() === '') return;

    const newCompany = {
      id: Date.now(),
      name: companyName,
      status: 'Applied'
    };

    setCompanies([...companies, newCompany]);
    setCompanyName('');
  }

  function deleteCompany(id) {
    setCompanies(companies.filter(company => company.id !== id));
  }

  return (
    <div className="container">
      <h1>🎓 Placement Analytics Portal</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <button onClick={addCompany}>Add Company</button>
      </div>

      <h2>Applied Companies ({companies.length})</h2>

      {companies.length === 0 ? (
        <p>No companies added yet.</p>
      ) : (
        <ul className="company-list">
          {companies.map((company) => (
            <li key={company.id}>
              <span>
                {company.name} - <strong>{company.status}</strong>
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteCompany(company.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;