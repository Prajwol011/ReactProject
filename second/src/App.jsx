import React, { useState } from 'react';
import './index.css';
import StudentCard from './components/StudentCard';
import Button from './components/Button'; // Reusable Component #2

const App = () => {
  // --- 1. STATE MANAGEMENT ---
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');

  // UI Controls State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // New: Sort logic

  // --- 2. EVENT HANDLERS ---
  const handleAddStudent = (e) => {
    e.preventDefault(); // Prevents page refresh
    if (!name || !course || !grade) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      course,
      grade: Number(grade),
      isPresent: true
    };

    setStudents([...students, newStudent]);
    // Clear form
    setName(''); setCourse(''); setGrade('');
  };

  const deleteStudent = (id) => setStudents(students.filter(s => s.id !== id));

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, isPresent: !s.isPresent } : s
    ));
  };

  // --- 3. FILTER & SORT LOGIC ---
  const processedStudents = students
    .filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' 
        ? true 
        : filterStatus === 'present' ? s.isPresent : !s.isPresent;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'grade') return b.grade - a.grade; // High to Low
      return 0;
    });

  return (
    <div className="container">
      <header className='student-header'>
        <h1>Student Directory</h1>
        <h4>Manage and Track your class.</h4>
      </header>

      {/* --- TOOLBAR SECTION (Requirement: Search/Filter/Sort) --- */}
      <section className="toolbar">
        <input 
          className="search-input" 
          placeholder="🔍 Search name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort: A-Z</option>
          <option value="grade">Sort: Grade</option>
        </select>
      </section>

      {/* --- ADD STUDENT FORM --- */}
      <section className='form-card'>
        <h1>Add Student</h1>
        <form onSubmit={handleAddStudent}>
          <div className='input-group'>
            <h3>Name</h3>
            <input className='student-input' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name' />
          </div>
          <div className='input-group'>
            <h3>Course</h3>
            <input className='student-input' type='text' value={course} onChange={(e) => setCourse(e.target.value)} placeholder='Course' />
          </div>
          <div className='input-group'>
            <h3>Grade</h3>
            <input className='student-input' type='number' value={grade} onChange={(e) => setGrade(e.target.value)} placeholder='0-100' />
          </div>
          {/* Using Reusable Button Component */}
          <Button variant="primary">Add to Directory</Button>
        </form>
      </section>

      {/* --- STUDENT LIST SECTION --- */}
      <main className="list-container">
        {/* CASE 1: Empty State (Requirement: Conditional Rendering) */}
        {students.length === 0 ? (
          <p className="empty-msg">No students in directory. Add one above!</p>
        ) : processedStudents.length === 0 ? (
          <p className="empty-msg">No results found matching your filters.</p>
        ) : (
          <div className="student-grid">
            {processedStudents.map((student) => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onToggle={toggleStatus} 
                onDelete={deleteStudent} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;