import styled from "styled-components";

const NotFound = () => {
    return (
            <div>
                <Notbox>
                    <h1>NOT<br/> FOUND</h1>
                </Notbox>
            </div>
    )
}

export default NotFound;

const Notbox = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    color: #AB4043;
    margin-top: 20%;
    font-size: 30px;
    z-index: 1;
`;
