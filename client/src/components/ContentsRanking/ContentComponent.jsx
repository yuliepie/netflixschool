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
            <CC.H4>{title_kr}</CC.H4>
            <CC.Ptag>단어 레벨 : {word_difficulty_level}</CC.Ptag>
            <CC.Ptag>말하기 속도(WPS) : {words_per_second}</CC.Ptag>
            <CC.Ptag>NEI 지수 : {content_level}</CC.Ptag>
        </CC.Container>
    );
}