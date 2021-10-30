import axios from 'axios';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import { Link } from 'react-router-dom';

const url = '/note/notes/user';
export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useUser();
  const options = { headers: { authorization: 'Bearer ' + user.token } };
  const history = useHistory();
  const [hasNotes, setHasNotes] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url, options);
      setLoading(false);
      if (data.userNotes.length > 0) {
        setNotes(data.userNotes);
        setHasNotes(false);
      } else {
        setLoading(false);
        setHasNotes(true);
        setNotes([]);
      }
    } catch (error) {
      if (error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error getUserNOtes', error.message);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getUserNotes();
    // eslint-disable-next-line
  }, []);
  const deleteNote = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete('/note/' + id, options);
      setLoading(false);
      getUserNotes();
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setLoading(false);
      if (error.response.data.ok) {
        return Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log('Error deleteNote', error.message);
    }
  };

  const showMesCreateNote = function () {
    Swal.fire({
      title: 'No notes available',
      showCancelButton: true,
      confirmButtonText: 'Create one',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        history.push('/actions');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : hasNotes ? (
        <>
          {showMesCreateNote()}
          {/* <div className='container mt-5 d-grid justify-content-center align-content-center vh-100'>
            <Link to='/actions' className='btn btn-primary'>
              Do you want to create one?
            </Link>
          </div> */}
        </>
      ) : (
        <div className='container mt-5'>
          <div className='row'>
            {notes?.map((note) => (
              <div className='col-md-6 col-lg-5 mx-auto' key={note._id}>
                <div className='card text-black m-2'>
                  <div className='card-header'>
                    <strong>{note.title}</strong>
                  </div>
                  <div className='card-body'>
                    <strong>Description</strong>
                    <p className='lead'>{note.description}</p>
                    <strong>Priority</strong>
                    <p className='lead'>{note.priority}</p>
                    <strong>Priority</strong>
                    <p className='lead'>{moment(note.date, 'YYYYMMDD').fromNow()}</p>
                    <p className='lead'>{moment(note.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  </div>
                  <div className='card-footer d-flex justify-content-around'>
                    <i
                      className='btn btn-danger fa fa-trash'
                      onClick={() => deleteNote(note._id)}
                    ></i>
                    <i
                      className='btn btn-warning fa fa-edit'
                      onClick={() => history.push('/actions/' + note._id)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
