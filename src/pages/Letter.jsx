import LetterBox from '../components/LetterBox.jsx';

function Letter() {
  const content = `
  hello
  happy friday
  `;

  return (
    <div className="letter-page">
      <h2>💌</h2>
      <LetterBox content={content} />
    </div>
  );
}

export default Letter;
