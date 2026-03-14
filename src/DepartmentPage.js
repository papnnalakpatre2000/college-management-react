import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function DepartmentPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const selectedDept = location.state?.selectedDept || 'management';

  // Faculty detailed profiles
  const facultyDetailsData = {
    'Dr. Vijay Wagh': {
      name: 'Dr. Vijay Wagh',
      designation: 'Professor',
      dept: 'Management',
      email: 'vijay.wagh@itm.edu',
      phone: '+91-9876543210',
      specialization: 'Strategic Management, Business Policy',
      qualification: 'B.Com, M.Com, Ph.D (Management)',
      experience: '18 Years',
      publications: '25+ International Papers',
      bio: 'Dr. Vijay Wagh is an accomplished academic and researcher with expertise in strategic management. He has guided numerous doctoral students and actively participates in academic conferences.'
    },
    'Dr. M. S. Altamash': {
      name: 'Dr. M. S. Altamash',
      designation: 'Assistant Professor & Head',
      dept: 'Management',
      email: 'ms.altamash@itm.edu',
      phone: '+91-9876543211',
      specialization: 'Finance, Corporate Governance',
      qualification: 'B.Com, M.Com, Ph.D (Finance)',
      experience: '15 Years',
      publications: '20+ International Papers',
      bio: 'Dr. M. S. Altamash leads the Management Department with a focus on finance and corporate governance. He is a recognized expert in financial management and business ethics.'
    },
    'Dr. Rajesh Kumar': {
      name: 'Dr. Rajesh Kumar',
      designation: 'Associate Professor & Head',
      dept: 'Computer',
      email: 'rajesh.kumar@itm.edu',
      phone: '+91-9876543212',
      specialization: 'Data Science, Machine Learning',
      qualification: 'B.Tech, M.Tech, Ph.D (Computer Science)',
      experience: '14 Years',
      publications: '30+ International Papers',
      bio: 'Dr. Rajesh Kumar is a leading researcher in data science and machine learning with publications in top-tier conferences.'
    },
    'Dr. Arjun Singh': {
      name: 'Dr. Arjun Singh',
      designation: 'Professor & Head',
      dept: 'Hospitality',
      email: 'arjun.singh@itm.edu',
      phone: '+91-9876543213',
      specialization: 'Hotel Management, Tourism Development',
      qualification: 'B.A., M.H.M, Ph.D (Tourism)',
      experience: '20 Years',
      publications: '18+ International Papers',
      bio: 'Dr. Arjun Singh is an industry veteran with extensive experience in hotel management and tourism development. He maintains strong industry connections.'
    },
    'Dr. Priya Sharma': {
      name: 'Dr. Priya Sharma',
      designation: 'Assistant Professor',
      dept: 'Computer',
      email: 'priya.sharma@itm.edu',
      phone: '+91-9876543214',
      specialization: 'Web Development, Cloud Computing',
      qualification: 'B.Tech, M.Tech, Ph.D (Computer Science)',
      experience: '10 Years',
      publications: '12+ International Papers',
      bio: 'Dr. Priya Sharma specializes in web technologies and cloud computing with hands-on experience in modern development practices.'
    },
    'Dr. N. D. Shinde': {
      name: 'Dr. N. D. Shinde',
      designation: 'Assistant Professor',
      dept: 'Management',
      email: 'nd.shinde@itm.edu',
      phone: '+91-9876543215',
      specialization: 'Human Resource Management',
      qualification: 'B.Com, M.Com, Ph.D (Management)',
      experience: '12 Years',
      publications: '15+ International Papers',
      bio: 'Dr. N. D. Shinde is an expert in Human Resource Management with specialization in organizational behavior and employee relations.'
    }
  };

  const departmentsData = {
    management: {
      name: 'Management Department',
      hod: 'DR. P R. Lakpatre',
      hodDesignation: 'Assistant Prof. and Head',
      hodPhone: '+917972779491',
      aboutDept: 'The Management Department was established in the year 2002. It is headed by Dr M. S. Altamash. The department offers two courses: Bachelor of Business Administration (BBA) and Master of Business Administration (MBA) in fields like marketing, finance, or human resources. These programs provide students with a solid foundation in management principles, theories, and practical applications.\n\nThe department implements a curriculum that covers core management courses along with elective options. Core courses may include operations management, managerial communication, disaster management, E-commerce, rural development, E-Business, Quality Management, and Management Information Systems.\n\nThe management department comprises experienced and knowledgeable faculty members who have expertise in different areas of management. They are responsible for teaching, conducting research, and publishing scholarly articles in academic journals.',
      vision: 'In order to maintain the department\'s competitiveness, we must ensure that teaching and research are relevant, that facilities and support are of the highest calibre, and that opportunities for education and employment are available.',
      mission: 'To provide professional training and education in the area of entrepreneurship and management. Organising seminars, workshops, and short-term courses to spread knowledge and information and foster professionalism.',
      facultyProfile: [
        { srNo: '01', name: 'Dr. Vijay Wagh', designation: 'Professor', profile: 'View' },
        { srNo: '02', name: 'Dr. M. S. Altamash', designation: 'Asst.Prof & HEAD', profile: 'View' },
        { srNo: '03', name: 'Dr. N. D. Shinde', designation: 'Asst.Prof', profile: 'View' },
        { srNo: '04', name: 'Dr. P. H. Tamgadge', designation: 'Associate Prof', profile: 'View' },
        { srNo: '05', name: 'Mr. S. B. Deshpande', designation: 'Assist. Prof', profile: 'View' },
        { srNo: '06', name: 'Mr. A.S. Gunjkar', designation: 'Assist. Prof', profile: 'View' },
        { srNo: '07', name: 'Dr. P.P. Kawale', designation: 'Assist. Prof.', profile: 'View' },
        { srNo: '08', name: 'Dr. Ahmed Abdul Razzak Mohammed', designation: 'Assist. Prof.', profile: 'View' },
        { srNo: '09', name: 'Mr. M.D. Rajurkar', designation: 'Assist. Prof.', profile: 'View' },
        { srNo: '10', name: 'Dr. Nasreen Fatema', designation: 'Assist. Prof.', profile: 'View' },
        { srNo: '11', name: 'Md. Ruknuddin Siddhiqui', designation: 'Assist. Prof.', profile: 'View' },
      ],
      programs: [
        { srNo: '01', course: 'B.B.A.', duration: '03 Years', intake: '240', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: 'Download' } },
        { srNo: '02', course: 'M.B.A.', duration: '02 Years', intake: '60', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: '--' } },
      ],
    },
    computer: {
      name: 'Computer Department',
      hod: 'DR. Rajesh Kumar',
      hodDesignation: 'Associate Prof. and Head',
      hodPhone: '+917972779492',
      aboutDept: 'The Computer Department was established in the year 2005. It is headed by Dr Rajesh Kumar. The department offers three courses: Bachelor of Science in Computer Science (B.Sc CS), Bachelor of Computer Applications (BCA) and Master of Computer Applications (MCA) with specializations in software development, web development, and data science. These programs provide students with a strong foundation in programming, algorithms, and software engineering principles.\n\nThe department implements a curriculum that covers advanced programming languages, data structures, database management, web technologies, cloud computing, artificial intelligence, and cybersecurity. Core courses include object-oriented programming, computer networks, operating systems, software engineering, and machine learning.\n\nThe computer department comprises highly qualified faculty members with expertise in various domains of computer science. They are responsible for teaching, conducting research, and publishing scholarly articles in renowned national and international journals.',
      vision: 'To be a premier center of excellence in computer science education and research, fostering innovation and producing skilled professionals who contribute to technological advancement.',
      mission: 'To provide quality education in computer science and applications with emphasis on practical skills, research, and professional ethics to prepare students for successful careers in the IT industry.',
      facultyProfile: [
        { srNo: '01', name: 'Dr. Rajesh Kumar', designation: 'Associate Prof & HEAD', profile: 'View' },
        { srNo: '02', name: 'Dr. Priya Sharma', designation: 'Assistant Prof', profile: 'View' },
        { srNo: '03', name: 'Dr. Amit Verma', designation: 'Assistant Prof', profile: 'View' },
        { srNo: '04', name: 'Mr. Rohit Patel', designation: 'Assistant Prof', profile: 'View' },
        { srNo: '05', name: 'Dr. Sneha Singh', designation: 'Assistant Prof', profile: 'View' },
      ],
      programs: [
        { srNo: '01', course: 'B.Sc CS', duration: '03 Years', intake: '60', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: 'Download' } },
        { srNo: '02', course: 'B.C.A.', duration: '03 Years', intake: '120', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: 'Download' } },
        { srNo: '03', course: 'M.C.A.', duration: '02 Years', intake: '60', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: '--' } },
      ],
    },
    hospitality: {
      name: 'Hospitality Study Department',
      hod: 'DR. Arjun Singh',
      hodDesignation: 'Professor and Head',
      hodPhone: '+917972779493',
      aboutDept: 'The Hospitality Study Department was established in the year 2008. It is headed by Dr Arjun Singh. The department offers comprehensive courses in hospitality management, hotel administration, and tourism management including Bachelor of Hotel Management (BHM) and Master of Hotel Management (MHM). These programs prepare students for rewarding careers in hotels, restaurants, travel agencies, and event management.\n\nThe department implements a curriculum that covers hotel operations, food and beverage management, housekeeping, front office management, hospitality law, customer service excellence, and sustainable tourism. Practical training includes industry internships and live projects in hotels and restaurants.\n\nThe hospitality department comprises experienced faculty members with extensive industry background. They are responsible for imparting practical knowledge, conducting research, and maintaining strong industry connections for student placements.',
      vision: 'To emerge as a leading institution in hospitality education and research, producing globally competent hospitality professionals with strong values and customer-centric approach.',
      mission: 'To provide industry-relevant education in hospitality and tourism management with emphasis on practical training, ethical practices, and sustainable development to create competent hospitality leaders.',
      facultyProfile: [
        { srNo: '01', name: 'Dr. Arjun Singh', designation: 'Professor & HEAD', profile: 'View' },
        { srNo: '02', name: 'Ms. Anjali Gupta', designation: 'Assistant Prof', profile: 'View' },
        { srNo: '03', name: 'Mr. Vikram Joshi', designation: 'Assistant Prof', profile: 'View' },
        { srNo: '04', name: 'Dr. Deepa Mishra', designation: 'Assistant Prof', profile: 'View' },
      ],
      programs: [
        { srNo: '01', course: 'B.H.M.', duration: '03 Years', intake: '100', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: 'Download' } },
        { srNo: '02', course: 'M.H.M.', duration: '02 Years', intake: '40', syllabus: { iYear: 'Download', iiYear: 'Download', iiiYear: '--' } },
      ],
    },
  };

  const managementData = departmentsData[selectedDept] || departmentsData.management;

  // Handle faculty profile view
  const handleViewFaculty = (facultyName) => {
    const details = facultyDetailsData[facultyName] || {
      name: facultyName,
      designation: 'Faculty Member',
      email: 'faculty@itm.edu',
      phone: '+91-98765432XX',
      specialization: 'Not Available',
      qualification: 'Not Available',
      experience: 'Not Available',
      publications: 'Not Available',
      bio: 'is an industry veteran with extensive experience in hotel management and tourism development. He maintains strong industry connections.'
    };
    setSelectedFaculty(details);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedFaculty(null);
  };

  // Generate and download syllabus PDF
  const generateSyllabusPDF = (course, year) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    doc.setFontSize(16);
    doc.setTextColor(25, 118, 210);
    doc.text('ITM College', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Course Syllabus', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Course details
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Course: ${course}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Year: ${year}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Department: ${managementData.name}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Academic Year: 2025-2026`, 20, yPosition);
    yPosition += 12;

    // Course objectives
    doc.setFontSize(11);
    doc.setTextColor(25, 118, 210);
    doc.text('Course Objectives:', 20, yPosition);
    yPosition += 7;
    
    const objectives = [
      '• Provide comprehensive knowledge in core subjects',
      '• Develop practical and analytical skills',
      '• Foster critical thinking and problem-solving abilities',
      '• Prepare students for professional careers',
      '• Encourage research and innovation'
    ];
    
    doc.setFontSize(9);
    doc.setTextColor(0);
    objectives.forEach(obj => {
      doc.text(obj, 20, yPosition);
      yPosition += 6;
    });
    
    yPosition += 5;

    // Syllabus content
    doc.setFontSize(11);
    doc.setTextColor(25, 118, 210);
    doc.text('Syllabus Content:', 20, yPosition);
    yPosition += 7;

    const syllabusContent = [
      'Unit 1: Fundamentals and Core Concepts',
      'Unit 2: Advanced Topics and Applications',
      'Unit 3: Case Studies and Real-world Scenarios',
      'Unit 4: Project Work and Field Studies',
      'Unit 5: Assessment and Evaluation Methods'
    ];

    doc.setFontSize(9);
    doc.setTextColor(0);
    syllabusContent.forEach((item, idx) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${idx + 1}. ${item}`, 25, yPosition);
      yPosition += 6;
    });

    yPosition += 10;

    // Learning outcomes
    doc.setFontSize(11);
    doc.setTextColor(25, 118, 210);
    doc.text('Learning Outcomes:', 20, yPosition);
    yPosition += 7;

    const outcomes = [
      '• Students will gain in-depth knowledge of subject matter',
      '• Ability to apply concepts in practical scenarios',
      '• Enhanced communication and presentation skills',
      '• Development of leadership qualities',
      '• Industry-ready competencies'
    ];

    doc.setFontSize(9);
    doc.setTextColor(0);
    outcomes.forEach(outcome => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(outcome, 25, yPosition);
      yPosition += 6;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

    doc.save(`${course}_${year}_Syllabus.pdf`);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#FFA500', marginBottom: 30 }}>{managementData.name}</h1>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 30, borderBottom: '2px solid #ddd', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('about')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'about' ? '#FFA500' : '#f0f0f0',
            color: activeTab === 'about' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: activeTab === 'about' ? 'bold' : 'normal',
            fontSize: '14px',
          }}
        >
          About Department
        </button>
        <button
          onClick={() => setActiveTab('vision-mission')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'vision-mission' ? '#FFA500' : '#f0f0f0',
            color: activeTab === 'vision-mission' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: activeTab === 'vision-mission' ? 'bold' : 'normal',
            fontSize: '14px',
          }}
        >
          Vision and Mission
        </button>
        <button
          onClick={() => setActiveTab('faculty')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'faculty' ? '#FFA500' : '#f0f0f0',
            color: activeTab === 'faculty' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: activeTab === 'faculty' ? 'bold' : 'normal',
            fontSize: '14px',
          }}
        >
          Faculty Profile
        </button>
        <button
          onClick={() => setActiveTab('programs')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'programs' ? '#FFA500' : '#f0f0f0',
            color: activeTab === 'programs' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: activeTab === 'programs' ? 'bold' : 'normal',
            fontSize: '14px',
          }}
        >
          Programs
        </button>
      </div>

      {/* About Department Tab */}
      {activeTab === 'about' && (
        <div style={{ marginBottom: 30 }}>
          {/* HOD Section */}
          <div style={{ backgroundColor: '#f9f9f9', padding: 24, borderRadius: 8, marginBottom: 20, textAlign: 'center', borderLeft: '4px solid #FFA500' }}>
            <h3 style={{ color: '#1976d2', marginTop: 0, marginBottom: 10 }}>HOD - Management Department</h3>
            <h2 style={{ color: '#333', margin: '8px 0' }}>{managementData.hod}</h2>
            <p style={{ color: '#666', margin: '6px 0', fontSize: '14px' }}>{managementData.hodDesignation}</p>
            <p style={{ color: '#FFA500', margin: '6px 0', fontSize: '14px', fontWeight: 'bold' }}>M: {managementData.hodPhone}</p>
          </div>

          {/* Department Description */}
          <div style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, lineHeight: 1.8 }}>
            {managementData.aboutDept.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ color: '#555', textAlign: 'justify', marginBottom: 16, fontSize: '14px' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'vision-mission' && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ marginBottom: 20, backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8 }}>
            <h3 style={{ color: '#1976d2', marginTop: 0 }}>Vision</h3>
            <p style={{ lineHeight: 1.6, color: '#555', textAlign: 'justify' }}>
              {managementData.vision}
            </p>
          </div>

          <div style={{ backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8 }}>
            <h3 style={{ color: '#1976d2', marginTop: 0 }}>Mission</h3>
            <p style={{ lineHeight: 1.6, color: '#555', textAlign: 'justify' }}>
              {managementData.mission}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'faculty' && (
        <div style={{ marginBottom: 30 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFA500' }}>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'left' }}>Sr.No</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'left' }}>Designation</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'left' }}>Profile</th>
              </tr>
            </thead>
            <tbody>
              {managementData.facultyProfile.map((faculty, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ border: '1px solid #ddd', padding: 12 }}>{faculty.srNo}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12 }}>{faculty.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12 }}>{faculty.designation}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12 }}>
                    <button 
                      onClick={() => handleViewFaculty(faculty.name)}
                      style={{ 
                        color: '#1976d2', 
                        textDecoration: 'none', 
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: 0
                      }}
                    >
                      {faculty.profile}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'programs' && (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <thead>
              <tr style={{ backgroundColor: '#FFA500' }}>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Sr.No</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Course</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Duration</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Intake</th>
                <th colSpan="3" style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>Syllabus</th>
              </tr>
              <tr style={{ backgroundColor: '#FFA500' }}>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>I Year</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>II Year</th>
                <th style={{ border: '1px solid #ddd', padding: 12, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>III Year</th>
              </tr>
            </thead>
            <tbody>
              {managementData.programs.map((prog, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f0f0f0' : '#fff' }}>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>{prog.srNo}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>{prog.course}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>{prog.duration}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>{prog.intake}</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                    <button 
                      onClick={() => generateSyllabusPDF(prog.course, 'I Year')}
                      style={{ 
                        color: '#1976d2', 
                        textDecoration: 'none', 
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: 0
                      }}
                    >
                      {prog.syllabus.iYear}
                    </button>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                    <button 
                      onClick={() => generateSyllabusPDF(prog.course, 'II Year')}
                      style={{ 
                        color: '#1976d2', 
                        textDecoration: 'none', 
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        padding: 0
                      }}
                    >
                      {prog.syllabus.iiYear}
                    </button>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                    {prog.syllabus.iiiYear === '--' ? '--' : 
                      <button 
                        onClick={() => generateSyllabusPDF(prog.course, 'III Year')}
                        style={{ 
                          color: '#1976d2', 
                          textDecoration: 'none', 
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          padding: 0
                        }}
                      >
                        {prog.syllabus.iiiYear}
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Faculty Modal */}
      {showModal && selectedFaculty && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 30,
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0, color: '#1976d2', fontSize: 24 }}>Faculty Profile</h2>
            <button 
              onClick={closeModal}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#999'
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ borderTop: '2px solid #FFA500', paddingTop: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Name</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.name}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Designation</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.designation}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Department</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.dept}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Specialization</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.specialization}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Qualification</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.qualification}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Experience</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.experience}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Publications</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.publications}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Email</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#1976d2' }}>{selectedFaculty.email}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase' }}>Phone</label>
              <p style={{ margin: '4px 0', fontSize: 16, color: '#333' }}>{selectedFaculty.phone}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 'bold', color: '#666', fontSize: 12, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Bio</label>
              <p style={{ margin: 0, fontSize: 14, color: '#555', lineHeight: 1.6 }}>{selectedFaculty.bio}</p>
            </div>

            <button 
              onClick={closeModal}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
