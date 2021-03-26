import React, { useState } from 'react'
import { getRelationServer } from '../functions/dataFetch.function';
import styles from '../styles/FindRelation.module.css';

const FindRelation = () => {
    const [person1, setPerson1] = useState()
    const [person2, setPerson2] = useState()
    const [relList, setRelList] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const searchFor = { person1, person2 }
        let relationList = await getRelationServer(searchFor)
        setRelList(relationList);
    }

    return (
        <div className={styles.main}>
            <p>Enter Names Of People you want to search</p>
            <form onSubmit={onSubmit}>
                <div className={styles.personInput1}>
                    <input name="person1" type="text" placeholder="Enter Person Name" value={person1} onChange={e => setPerson1(e.target.value)} />

                    <input name="person2" type="text" placeholder="Enter person name" value={person2} onChange={e => setPerson2(e.target.value)} />

                </div>
                <input type="submit" value="Find" />
            </form>

            <div className={styles.relationList}>
                {relList.map((item, i) => (
                    <span> {item} {(i < relList.length - 1) ? "=>" : ''} </span>
                ))}
            </div>
        </div>
    )
}

export default FindRelation
