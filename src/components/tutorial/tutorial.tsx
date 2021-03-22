import React from 'react';
import Group from "../group";
import {levelsEnglish} from '../../data';

const Tutorial = () => {
	return <div className="tutorial__groups" >
		{levelsEnglish.map(({id, title, name}) => {
			const key = `group${id}`;
			return <Group
				key={key}
				id={id}
				title={title}
				name={name} >
			</Group >
		})}
	</div >
};

export default Tutorial;