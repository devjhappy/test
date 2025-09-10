import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { gallery } from '../data.js';

function AboutUs() {
  const scrollRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCardClick = (index) => {
    setSelectedIdx(index);
  };

  const handleClose = () => setSelectedIdx(null);

  useEffect(() => {
    if (selectedIdx !== null) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          const parent = scrollRef.current.closest('.custom-gallery-card');
          if (parent) {
            const elementTop = scrollRef.current.offsetTop;
            const elementHeight = scrollRef.current.offsetHeight;
            const containerHeight = parent.offsetHeight;

            // 중앙 정렬: 요소 상단 위치 - (컨테이너 높이 - 요소 높이) / 2
            const scrollTop = elementTop - (containerHeight - elementHeight) / 2;

            parent.scrollTop = scrollTop;
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [selectedIdx]);

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
                <Card.Img variant="top" className="card-img-top" src={item.thumbnail} />
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
          <Modal.Body
            className="custom-gallery-card position-relative"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: '1rem',
            }}
          >
            {/* ✕ 닫기 버튼 */}
            <div className="d-flex justify-content-end sticky-top z-3" style={{ background: 'none' }}>
              <Button
                variant="light"
                onClick={handleClose}
                style={{
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  padding: 0,
                }}
              >
                ✕
              </Button>
            </div>

            {/* 전체 리스트 렌더링 */}
            {gallery.map((item, idx) => (
              <div
                key={idx}
                ref={idx === selectedIdx ? scrollRef : null}
                className="mb-4 pb-4"
                style={{
                  scrollMarginTop: '12px',
                  borderBottom: 'none',
                  position: 'relative',
                }}
              >
                {/* 점선 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundImage:
                      'repeating-linear-gradient(to right, #ccc 0px, #ccc 5px, transparent 5px, transparent 10px)',
                  }}
                />
                {/* 👤 상단: 프로필 + 제목 + 날짜 */}
                <div className="d-flex align-items-center mb-3">
                  {/* 프로필 이미지 or 기본 원형 */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#ddd',
                      backgroundImage: item.profile ? `url(${item.profile})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                    }}
                  />
                  <div className="ms-3">
                    <div className="fw-bold">{item.title}</div>
                    <div className="text-muted small">{item.date}</div>
                  </div>
                </div>

                {/* 🖼 이미지들 (Row + Col 구성) */}
                {item.images && item.images.length > 0 && (
                  <div className="image-grid mb-3">
                    <Row xs={3} sm={4} md={5} className="g-2">
                      {item.images.map((imgSrc, i) => (
                        <Col key={i}>
                          <img
                            src={imgSrc}
                            alt={`img-${i}`}
                            className="img-fluid rounded"
                            style={{
                              objectFit: 'cover',
                              height: '100px',
                              width: '100%',
                            }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}

                {/* 📝 편지 내용 */}
                <p className="text-body" style={{ whiteSpace: 'pre-line' }}>
                  {item.letter}
                </p>
              </div>
            ))}
          </Modal.Body>
        )}
        </Modal>
    </Container>
  );
}

export default AboutUs;
