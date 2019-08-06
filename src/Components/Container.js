import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
  max-width: 700px;
  margin: 80px auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
`;

export default Container;
