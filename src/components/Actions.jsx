import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import DateTimePicker from 'react-datetime-picker';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import 'react-datetime-picker/dist/DateTimePicker.css';

const now = moment().hour(12).minute(0).second(0);
// const now = new Date();

export const Actions = () => {
  const { user } = useUser();
  const options = { headers: { authorization: 'Bearer ' + user.token } };
  const { idnote } = useParams();
  const initialState = {
    title: '',
    description: '',
    priority: 'low',
    date: now.toDate(),
    user: user.id,
  };
  const [noteState, setNoteState] = useState(initialState);
  const optionsPriority = ['Low', 'Medium', 'High'];
  const history = useHistory();
  useEffect(() => {
    const getNoteById = async () => {
      try {
        const { data } = await axios.get('/note/' + idnote, options);
        setNoteState({ ...data.note, date: new Date(data.note.date) });
      } catch (error) {
        if (error.response.data.ok) {
          return Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log('Error getNoteById', error.message);
      }
    };
    idnote ? getNoteById() : setNoteState(initialState);
  }, [idnote]);
  // toca correr lo habia cerrado

  const actions = (e) => {
    e.preventDefault();
    // const newNote = {
    //   ...noteState,
    // };
    idnote ? updateNote(noteState) : saveNote(noteState);
  };

  const saveNote = async (newNote) => {
    try {
      const { data } = await axios.post('/note/', newNote, options);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      history.push('/notes');
    } catch (error) {
      if (error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error saveNote', error.message);
    }
  };

  const updateNote = async (newNote) => {
    try {
      const { data } = await axios.put('/note/' + idnote, newNote, options);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      history.push('/notes');
    } catch (error) {
      if (error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error updateNote', error.message);
    }
  };

  const onChangeDate = (date) => {
    setNoteState({ ...noteState, date: date });
  };
  return (
    <div className='container text-black'>
      <div className='row vh-100'>
        <div className='col-md-8 col-lg-6 mx-auto d-grid align-content-center  '>
          <div className='card bg-gradient shadow-lg'>
            {idnote ? (
              <div className='card-header bg-gradient'>
                <h4 className='card-title text-sm-center'>Edit note</h4>
              </div>
            ) : (
              <div className='card-header'>
                <h4 className='card-title text-sm-center fw-bold fs-2 '>Save note</h4>
              </div>
            )}
            <div className='card-body'>
              <form onSubmit={actions}>
                <div className='mb-3'>
                  <input
                    type='text'
                    name='title'
                    placeholder='Título'
                    required
                    autoFocus
                    className='form-control'
                    onChange={(e) => setNoteState({ ...noteState, title: e.target.value })}
                    value={noteState.title}
                  />
                </div>
                <div className='mb-3'>
                  <textarea
                    name='description'
                    id='description'
                    className='form-control'
                    placeholder='Description'
                    value={noteState.description}
                    onChange={(e) => setNoteState({ ...noteState, description: e.target.value })}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <select
                    name='priorityOpts'
                    id='priorityOpts'
                    value={noteState.priority}
                    onChange={(e) => setNoteState({ ...noteState, priority: e.target.value })}
                  >
                    {optionsPriority?.map((option, i) => (
                      <option value={option} key={i}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-3 '>
                  {/* <DatePicker
                    className='form-control'
                    selected={noteState.date}
                    onChange={onChangeDate}
                  /> */}
                  <DateTimePicker
                    value={noteState.date}
                    selected={noteState.date}
                    onChange={onChangeDate}
                  />
                </div>
                {idnote ? (
                  <div className='mb-3'>
                    <button type='submit' className='form-control btn btn-warning'>
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className='mb-3'>
                    <button type='submit' className='form-control btn btn-primary'>
                      Save
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
