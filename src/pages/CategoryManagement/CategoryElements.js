import styled from "styled-components";
export const CategoryBox = styled.div`
    width: ${({ selected }) => (selected ? '500px' : '400px')};;
    /* width: 400px; */
    display: flex;
    flex-direction: column;
    /* background-color: aqua; */
`
export const CatRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
export const CatBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
export const CatLabel = styled.div`
    width: 100%;
`
export const CatPlusButton = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0294b3;
`
export const CatTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 1rem;
`
export const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`
export const CatButton = styled.button`
    border: none;
    outline: none;
    font-size: 1rem;
    background-color: #0294b3;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 5px;
`
export const OptionBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 4px;
`
export const OptionText = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem 0.9rem;
    border-radius: 22px;
    font-size: 0.8rem;
    background-color: #dff2f5;
`
export const OptionsContainer = styled.div`
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 7px;
    /* overflow: scroll; */
    padding: 0.6rem;
`