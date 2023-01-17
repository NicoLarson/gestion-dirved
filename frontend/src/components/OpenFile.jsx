// create component who read a PDF file and display it
import { useParams, useNavigate } from 'react-router';


const fs = require('fs');

const OpenFile = () => {
  const params = useParams();
  // const navigate = useNavigate();
  console.log('OpenFile.jsx useParams => ', params.path);

  return (
    <div>
      <a href='http://localhost:1212/pdfs/test.pdf' target="_blank">Open PDF</a>
    </div>
  );
};

export default OpenFile;
