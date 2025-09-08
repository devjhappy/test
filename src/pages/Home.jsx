import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src="img/banner.png" className="banner-image"></img>
      <p>똑똑👀</p>
      <button onClick={() => navigate('/test/about')}>1.🎁</button>
      <button onClick={() => navigate('/test/present')}>2. 🎈</button>
      <button onClick={() => navigate('/test/letter')}>3. 💌</button>
    </div>
  );
}

export default Home;