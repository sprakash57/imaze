import { useParams, useNavigate } from 'react-router';

const PhotoDetail = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleBackNavigation}>Back</button>
      <h1>Photo Detail: {params.id}</h1>
    </div>
  );
};

export default PhotoDetail;
