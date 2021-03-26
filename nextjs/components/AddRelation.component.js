import React, { useState } from 'react';
import { AddRelationServer } from '../functions/dataFetch.function';
import styles from '../styles/AddRelation.module.css'

const AddRelation = () => {
    const [person1, setPerson1] = useState();
    const [person2, setPerson2] = useState();
    const [relation1, setRelation1] = useState();
    const [relation2, setRelation2] = useState();
    const [result, setResult] = useState()

    const onSubmit = async (e) => {
        e.preventDefault()
        const newRelation = {
            person1,
            person2,
            relation1,
            relation2
        }
        let resRelation = await AddRelationServer(newRelation);
        setResult(resRelation)
    }

    return (
        <div className={styles.container}>
            <p>e.g. X is Son of Y</p>
            <p>e.g. Y is Father of X</p>
            <form onSubmit={onSubmit} className="form">
                <div className={styles.personInput1}>
                    <div>
                        {/* <label htmlFor="person1">Enter First Person</label><br /> */}
                        <input name="person1" type="text" placeholder="Enter Person Name" value={person1} onChange={e => { setPerson1(e.target.value) }} />
                    </div>
                    <p>is</p>
                    <div>
                        {/* <label htmlFor="relation1">Enter Relation</label> */}
                        <input name="relation1" type="text" placeholder="Enter Relation" value={relation1} onChange={e => { setRelation1(e.target.value) }} />
                    </div>
                    <p>of</p>
                    <div>
                        {/* <label htmlFor="person2">Enter second Person</label> */}
                        <input name="person2" type="text" placeholder="Enter Person Name" value={person2} onChange={e => { setPerson2(e.target.value) }} />
                    </div>
                    {/* <input name="relation2" type="text" placeholder="Enter Relation" /> */}
                </div>
                <hr />
                <div className={styles.personInput1}>
                    <div>
                        {/* <label disabled htmlFor="person1"></label> */}
                        <input name="person1" type="text" placeholder="Enter Person Name" disabled value={person2} />
                    </div>
                    <p>is</p>
                    <div>
                        {/* <label htmlFor="relation2">Enter Relation</label> */}
                        <input name="relation2" type="text" placeholder="Enter Relation" value={relation2} onChange={e => { setRelation2(e.target.value) }} />
                    </div>
                    <p>of</p>
                    <div>
                        {/* <label htmlFor="person2"></label> */}
                        <input name="person2" type="text" placeholder="Enter Person Name" disabled value={person1} />
                    </div>
                    {/* <input name="relation2" type="text" placeholder="Enter Relation" /> */}
                </div>
                <div className={styles.submit}>
                    <input type="submit" value="Add Relation" />
                </div>
            </form>
            <div className={styles.result}>
                {result ? result.person1 : null}
                <br />
                {result ? result.person2 : null}

            </div>
        </div>
    )
}

export default AddRelation
