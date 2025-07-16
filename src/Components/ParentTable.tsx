import React, { useState, useEffect } from 'react';
import { ChildTable } from './ChildTable';
import { PatientService, type Patient } from '../api/patientService'; 
import { Col, Container, Row } from 'react-bootstrap';

interface ParentTableProps {
  data: [];
}

export const ParentTable: React.FC<ParentTableProps> = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const toggleExpand = (parentId: number) => {
    setExpandedRows(prev =>
      prev.includes(parentId)
        ? prev.filter(id => id !== parentId)
        : [...prev, parentId]
    );
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await PatientService.getPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch patients.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div>Loading patients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
        <Container style={{width:600}}>
        {patients.map(patient => (
            <React.Fragment key={patient.id}>
                <Row onClick={() => toggleExpand(patient.id)} className='vh-custom-row rounded' style={{cursor: 'pointer', border:'1px solid black', margin: '5px', padding: '20px', backgroundColor: '#CCCCCC'}}> 
                    <Col xs={6} md={6} >
                    {patient.fullName}
                    </Col>
                    <Col xs={6} md={6}>
                    {patient.dateOfBirth}
                    </Col>
                </Row>
                {expandedRows.includes(patient.id) && (
                    <Row>
                        <Col xs={12} md={8}>
                            <ChildTable patientId={patient.id} patientName={patient.fullName} />
                        </Col>
                    </Row>
                )}
            </React.Fragment>
            ))}

        </Container>

  );
};
