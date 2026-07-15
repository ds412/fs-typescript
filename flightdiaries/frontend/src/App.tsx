import { useState, useEffect } from 'react';
import axios from 'axios';
import { type NonSensitiveDiaryEntry, type NewDiaryEntry, Weather, Visibility } from './types';
import diaryService from './diaryService';

const App = () => {
    const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>('sunny');
    const [visibility, setVisibility] = useState<Visibility>('great');
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        diaryService.getAll().then(initialEntries => {
            setEntries(initialEntries)
        })
    }, [])

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setErrorMessage('');
        const newEntry: NewDiaryEntry = { date, weather, visibility, comment: comment || undefined };

        diaryService.create(newEntry)
            .then(returnedEntry => {
                setEntries(entries.concat(returnedEntry));
                setErrorMessage('');
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.log(error.status);
                    console.log(error.response?.data);
                    const backendError = error.response?.data?.error;
                    if (Array.isArray(backendError)) {
                        setErrorMessage(
                            backendError.map(issue => issue.message).join(', ')
                        );
                    } else {
                        setErrorMessage('Unknown error');
                    }
                } else {
                    setErrorMessage('Unknown error');
                }
            });

        setDate('');
        setWeather('sunny');
        setVisibility('great');
        setComment('');
    };

    return (
        <div>
            <h3>Add new entry</h3>
            {errorMessage &&
                (<div style={{color:'red'}}><strong>Error: </strong>
                    {typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}
                </div>)
            }
            <br></br>
            <form onSubmit={entryCreation}>
                <label>Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Visibility:
                    {Object.values(Visibility).map(value => (
                        <label key={value}>
                            <input type="radio" name="visibility" value={value} checked={visibility === value}
                                onChange={(e) => setVisibility(e.target.value as Visibility)} />
                            {value}
                        </label>
                    ))}
                </label>
                <br></br>
                <label>
                    Weather:
                    {Object.values(Weather).map(value => (
                        <label key={value}>
                            <input type="radio" name="weather" value={value} checked={weather === value}
                                onChange={(e) => setWeather(e.target.value as Weather)} />
                            {value}
                        </label>
                    ))}
                </label>
                <br></br>
                <label>Comment:
                    <input
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </label>
                <br></br>
                <button type='submit'>add</button>
            </form>
            <h3>Diary Entries</h3>
            <ul>
                {entries.map(entry =>
                    <li key={entry.id}>
                        date: <b>{entry.date}</b> <br></br>
                        visibility: {entry.visibility} <br></br>
                        weather: {entry.weather} <br></br>
                        <br></br>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default App
