import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { gallery } from '../data.js';

function AboutUs() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCardClick = (index) => {
    setSelectedIdx(index);
  };

  const handleClose = () => setSelectedIdx(null);

  const handlePrev = () => {
    if (selectedIdx > 0) setSelectedIdx(selectedIdx - 1);
  };

  const handleNext = () => {
    if (selectedIdx < gallery.length - 1) setSelectedIdx(selectedIdx + 1);
  };

  return (
    <Container fluid className="aboutus-container bg-white rounded shadow-sm">
      <div className="d-flex justify-content-end mb-4">
        <Button variant="secondary">🎁 선물 보러가기</Button>
      </div>

      <Row xs={4} sm={4} md={6} lg={6} xl={6} className="g-2">
        {gallery.map((item, idx) => (
          <Col key={idx}>
            <div className="flip-card" onClick={() => handleCardClick(idx)}>
              <Card className="border-0 bg-transparent p-0">
                <Card.Img variant="top" className="card-img-top" src={item.image} />
                <Card.Body>
                  <Card.Title className="fs-6 mb-1 text-start">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-0 text-end">{item.date}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* 📌 Modal */}
      <Modal
        show={selectedIdx !== null}
        onHide={handleClose}
        centered
        dialogClassName="gallery-dialog"
      >
        {selectedIdx !== null && (
          <Modal.Body className="custom-gallery-card position-relative">
            {/* X 닫기 버튼 */}
            <Button
              variant="light"
              onClick={handleClose}
              className="position-absolute top-0 end-0 m-2"
              style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0' }}
            >
              ✕
            </Button>

            <div className="card-header-row justify-content-between align-items-center mb-2">
              <h5 className="mb-0 fw-bold">{gallery[selectedIdx].title}</h5>
              <span className="text-muted small">{gallery[selectedIdx].date}</span>
            </div>

            <div className="card-image-wrapper text-center mb-3">
              <img
                src={gallery[selectedIdx].image}
                alt="gallery"
                className="dialog-image"
              />
            </div>

            <div className="card-letter">
              <p className="mb-0">{gallery[selectedIdx].letter}</p>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="light" onClick={handlePrev} disabled={selectedIdx === 0}>
                ◀ 이전
              </Button>
              <Button
                variant="light"
                onClick={handleNext}
                disabled={selectedIdx === gallery.length - 1}
              >
                다음 ▶
              </Button>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
}

export default AboutUs;
