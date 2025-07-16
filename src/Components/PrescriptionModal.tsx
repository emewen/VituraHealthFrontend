import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { PrescriptionService, type CreatePrescriptionPayload } from '../api/prescriptionService'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

interface PrescriptionModalProps {
    patientId: number;
    patientName: string;
    show: boolean;
    onHide: any;
    onNotifyParent: any;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ patientId, patientName, onHide, show, onNotifyParent }) => {
    const [formData, setFormData] = useState<CreatePrescriptionPayload>({
        patientId: patientId,
        drugName: '',
        dosage: '',
        datePrescribed: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent default browser submission behavior
        console.log('Form submitted:', formData);
        try {
            const data = await PrescriptionService.createPrescription(formData);
            console.log(data);
            onNotifyParent();
        } catch (err) {
            alert('Failed to fetch prescriptions for patientId: ' + patientId + '.');
            console.error(err);
        } finally {
            onHide();
        }
        // reset the form
        setFormData({ patientId: patientId, drugName: '', dosage: '', datePrescribed: '' });
    };

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" data-bs-theme="dark">
            <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add prescription for {patientName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Container>
                <Row variant="dark">
                    <Col xs={4} md={4}>
                        <label htmlFor="drugName">Drug Name:</label>
                    </Col>
                    <Col xs={8} md={8}>
                        <input
                            type="text"
                            id="drugName"
                            name="drugName"
                            value={formData.drugName}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
                <Row variant="dark">
                    <Col xs={4} md={4}>
                        <label htmlFor="dosage">Dosage:</label>
                    </Col>
                    <Col xs={8} md={8}>
                        <input
                            type="text"
                            id="dosage"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>
                <Row variant="dark">
                    <Col xs={4} md={4}>
                        <label htmlFor="datePrescribed">Date Prescribed:</label>
                    </Col>
                    <Col xs={8} md={8}>
                        <input
                            type="date"
                            id="datePrescribed"
                            name="datePrescribed"
                            value={formData.datePrescribed}
                            onChange={handleChange}
                            required
                        />
                    </Col>
                </Row>    
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
          </form>
        </Modal>
      );
}