import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load saved data from localStorage
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('companies');
    return saved ? JSON.parse(saved) : [];
  });

  const [companyName, setCompanyName] = useState('');
  const [status, setStatus] = useState('Applied');

  // Save whenever companies change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  function addCompany() {
    if (!companyName.trim()) return;

    const newCompany = {
      id: Date.now(),
      name: companyName,
      status: status
    };

    setCompanies([...companies, newCompany]);

    setCompanyName('');
    setStatus('Applied');
  }

  function deleteCompany(id) {
    setCompanies(companies.filter(c => c.id !== id));
  }

  const selectedCount = companies.filter(
    c => c.status === 'Selected'
  ).length;

  return (
    <div className="container">
      <h1>🎓 Placement Analytics Portal</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{companies.length}</p>
        </div>

        <div className="stat-card">
          <h3>Selected</h3>
          <p>{selectedCount}</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>OA</option>
          <option>Technical</option>
          <option>HR</option>
          <option>Selected</option>
        </select>

        <button onClick={addCompany}>Add Company</button>
      </div>

      <ul className="company-list">
        {companies.map(company => (
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
    </div>
  );
}

export default App;