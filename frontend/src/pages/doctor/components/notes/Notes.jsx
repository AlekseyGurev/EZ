import { Divider, Typography, Button } from 'antd';
import styles from './Notes.module.css';
import { Note } from '../note/Note';
import { useState } from 'react';
import { NoteForm } from '../noteForm/NoteForm';
import { useSelector } from 'react-redux';
import { selectDoctor, selectUser } from '../../../../selectors';
import { useCheckAdmin } from '../../../../useHooks/useCheckAdmin';

export const Notes = () => {
  const [isShowNoteFrom, setIsShowNoteFrom] = useState(false);
  const { doctor } = useSelector(selectDoctor);
  const user = useSelector(selectUser);
  const isAdmin = useCheckAdmin(user);

  const toggleForm = () => {
    setIsShowNoteFrom(!isShowNoteFrom);
  };

  return (
    <div>
      {isAdmin && (
        <>
          <Divider />
          <Button
            wrap
            style={{
              width: '200px',
            }}
            type="primary"
            onClick={toggleForm}
          >
            {isShowNoteFrom ? 'Скрыть форму' : 'Добавить заметку'}
          </Button>
          {isShowNoteFrom ? <NoteForm toggleForm={toggleForm} /> : null}
          <Divider />
        </>
      )}
      {isShowNoteFrom || doctor?.notes.length <= 0 ? (
        <Typography.Title level={4}>Заметки еще не добавлены.</Typography.Title>
      ) : (
        <ul className={styles.container}>
          {doctor?.notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
};
