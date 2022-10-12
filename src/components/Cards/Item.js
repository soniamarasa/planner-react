import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

export const Item = ({ item }) => {
  const status = (item) => {
    let style = '';

    if (item.finished) style = 'finished';
    else if (item.started) style = 'started';
    else if (item.canceled) style = 'canceled';
    else if (item.important) style = 'important';

    return style;
  };

  return (
    <>
      <li className={status(item)} key={item._id}>
        <span>
          {' '}
          {item.type === 'appointment' && item.finished && <EventIcon />}
          {item.type === 'event' && <CircleIcon />}
          {item.type === 'note' && <RemoveIcon />}
          {item.type === 'task' && !item.finished && (
            <CheckBoxOutlineBlankIcon />
          )}
          {item.type === 'task' && item.finished && <CheckBoxIcon />}
          {item.type === 'tv' && <LiveTvIcon />}
          {item.description}{' '}
        </span>
        {item.obs && (
          <small>
            <SubdirectoryArrowRightIcon /> {item.obs}{' '}
          </small>
        )}
      </li>
    </>
  );
};