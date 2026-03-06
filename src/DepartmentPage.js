import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DepartmentPage() {
  const [activeTab, setActiveTab] = useState('about');
  const location = useLocation();
  const selectedDept = location.state?.selectedDept || 'management';

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
                    <a href="#" style={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer' }}>{faculty.profile}</a>
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
                    <a href="#" style={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer' }}>{prog.syllabus.iYear}</a>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                    <a href="#" style={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer' }}>{prog.syllabus.iiYear}</a>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'center' }}>
                    {prog.syllabus.iiiYear === '--' ? '--' : <a href="#" style={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer' }}>{prog.syllabus.iiiYear}</a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
