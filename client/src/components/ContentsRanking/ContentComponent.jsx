import React from 'react';
import { useHistory } from 'react-router-dom';
import * as CC from './ContentComponents';

export default function ContentComponent({
    id,
    title_kr,
    img_path,
    word_difficulty_level,
    words_per_second,
    content_level
}) {
    const history = useHistory();
    
    const handleClick = () => {
        history.push(`/contentsranking`)
    };

    return (
        <CC.Container onClick={handleClick}>
            <CC.Image src={img_path} />
            <h4>{title_kr}</h4>
            <p>단어 레벨 : {word_difficulty_level}</p>
            <p>말하기 속도(WPS) : {words_per_second}</p>
            <p>종합 레벨 : {content_level}</p>
        </CC.Container>
    );
}