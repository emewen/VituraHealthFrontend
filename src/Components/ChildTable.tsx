import React, { useState, useEffect } from 'react';
import { PrescriptionService, type Prescription } from '../api/prescriptionService'; 
import { PrescriptionModal } from './PrescriptionModal'; 
import { Col, Container, Row } from 'react-bootstrap';

interface ChildTableProps {
  patientId: number;
  patientName: string;
}

//const sleep = ms => new Promise(r => setTimeout(r, ms));

export const ChildTable: React.FC<ChildTableProps> = ({ patientId, patientName }) => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPrescriptions = async () => {
        try {
            //fake some latency for loading
            //await sleep(500)
            const data = await PrescriptionService.getPrescriptions(patientId);
            setPrescriptions(data);
        } catch (err) {
            setError('Failed to fetch prescriptions for patientId: ' + patientId + '.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { // only run this on first load        
        fetchPrescriptions();
    }, []);
        
    
    if (loading) return <table><tbody><tr><td>Loading prescriptions...</td></tr></tbody></table>;
    if (error) return <table><tbody><tr><td>Error: {error}</td></tr></tbody></table>;

  return (
    <Container style={{width:580}}>
        {prescriptions.map(prescription => (      
                <Row key={prescription.id+'_pre'} className='vh-custom-row-pre rounded' style={{cursor: 'pointer', border:'1px solid black', margin: '5px', marginLeft:'20px', padding: '20px', backgroundColor: '#c6d15f'}}>
                    <Col xs={4} md={4}>{prescription.drugName}</Col>
                    <Col xs={4} md={4}>{prescription.dosage}</Col>
                    <Col xs={4} md={4}>{prescription.datePrescribed}</Col>
                </Row>
        ))}
        <Row onClick={() => setModalShow(true)} className='vh-custom-row-green rounded' style={{cursor: 'pointer', border:'1px solid black', margin: '5px', marginLeft:'20px', padding: '20px', color:'#FFFFFF', backgroundColor: '#2b632e'}}>
            <Col xs={12} md={12}>
                + Add Prescription for {patientName}
            </Col>
            <Col xs={12} md={12}>
                <PrescriptionModal 
                    key={patientId+'_mod'}
                    show={modalShow} 
                    onHide={() => setModalShow(false)}
                    onNotifyParent={fetchPrescriptions}
                    patientName={patientName} 
                    patientId={patientId} />
            </Col>
        </Row>
    </Container>    
  );
};
