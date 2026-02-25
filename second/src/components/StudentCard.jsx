import React from 'react';
import './StudentCard.css';
import Badge from './Badge'; // 1. Import the reusable Badge component

const StudentCard = ({ student, onToggle, onDelete }) => {
  return (
    <div className={`student-item ${student.isPresent ? 'status-present' : 'status-absent'}`}>
      <div className="card-info">
        <h2 style={{ marginBottom: '5px' }}>{student.name}</h2>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Grade:</strong> {student.grade}%</p>
        
        
        {student.grade >= 90 && (
          <Badge type="warning" text="⭐ Top Performer" />
        )}
        
       
        <div className="status-container" style={{ marginTop: '10px' }}>
          <Badge 
            type={student.isPresent ? "success" : "danger"} 
            text={student.isPresent ? "● Present" : "○ Absent"} 
          />
        </div>
      </div>

      <div className="card-actions">
        
        <button className="btn-card" onClick={() => onToggle(student.id)}>
          {student.isPresent ? "Mark Absent" : "Mark Present"}
        </button>
        <button className="btn-card btn-delete" onClick={() => onDelete(student.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default StudentCard;