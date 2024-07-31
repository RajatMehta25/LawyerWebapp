import styled from "styled-components/macro"

export const MainNote = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    /* margin-top: 2rem; */
`
export const MainBox = styled.div`
    width: ${({ widSize }) => (widSize ? '35%' : '100%')};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    padding: 1rem;
`
export const RowBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`
export const RowLabel = styled.label`
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.5rem;
`
export const RowInput = styled.input`
    width: 100%;
    outline: none;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.5rem;
`
export const RowDesc = styled.textarea`
    outline: none;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.5rem;
`
export const RowButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SubmitButton = styled.button`
    border: none;
    outline: none;
    padding: 0.5rem 1.2rem;
    color: white;
    background-color: #0294b3;
    font-size: 1rem;
    border-radius: 5px;
`
export const SelectBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const RadioLabel = styled.label`
    font-size: 1rem;
`
export const OverLayBox = styled.div`
    height: 100%;
    width: 65%;
    /* overflow: scroll; */
    /* background-color: aqua; */
    display: flex;
    /* position: absolute; */
`
export const BoxOne = styled.div`
    width: 50%;
    height: 100%;
`
export const BoxTwo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: pink; */
    padding: 1rem;
`
export const CommonRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.6rem;
`