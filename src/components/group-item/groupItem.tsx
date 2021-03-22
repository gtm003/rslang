import React from 'react';

interface GroupProps {
    id: number,
    title: string,
    name: string
}

const GroupItem: React.FC<GroupProps> = ({id, title, name}) => {
    const classGroup = `group__${id}`;
    return <div className={classGroup} >
        <h2 className="group__title">{title}</h2 >
        <p className="group__description">{name}</p >
    </div >
};

export default GroupItem;