import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import MarksList from './components/MarksList';


export default function App() {
  const [view, setView] = useState('students');

  return (
    <div>
      <Navbar setView={setView} />
      <div className="container mt-4">
        {view === 'students' && <StudentList />}
        {view === 'teachers' && <TeacherList />}
        {view === 'marks' && <MarksList />}
      </div>
    </div>
  );
}
