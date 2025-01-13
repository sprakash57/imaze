import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getCuratedPhotos, { CuratedPhoto } from "./utils/api";

const Container = styled.div`
  max-width: 85%;
  margin: 20px auto;
`;

const ImageContainer = styled.div`
  columns: 3 250px;
  gap: 15px;

  img {
    margin-bottom: 10px;
    border-radius: 5px;
    width: 100%;
  }
`;

const App: React.FC = () => {
  const [photos, setPhotos] = useState<CuratedPhoto[]>([]);

  const loadPhotos = async () => {
    const data = await getCuratedPhotos();
    setPhotos((photos) => [...photos, ...data.photos]);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <Container>
      <ImageContainer>
        {photos.map(({ src, id }, index) => (
          <img key={id} src={src.medium} data-index={index} />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default App;
