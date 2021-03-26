import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import AddRelation from '../components/AddRelation.component'
import FindRelation from '../components/FindRelation.component'

export default function Home() {
  const [addRel, setAddRel] = useState(true);
  const [findRel, setFindRel] = useState(false);

  const relationList = [
    { "friend": "friend" },
    { "sister": "brother" },
    { "brother": "sister" },
    { "father": "son" },
    { "son": "father" },
    { "mother": "son" },
    { "son": "mother" },
  ]

  return (
    <div>

      <div className={styles.title}>
        <h1>RaftLabs</h1>
      </div>
      <div className={styles.navTab}>
        <button className={styles.add} onClick={() => { setAddRel(true); setFindRel(false) }} >Add Relation</button>
        <button className={styles.find} onClick={() => { setAddRel(false); setFindRel(true) }} >Find Relation</button>
      </div>
      <hr />
      <div className={styles.container}>
        {addRel ? (
          <AddRelation />
        ) : null}
        {findRel ? (
          <FindRelation />
        ) : null}
      </div>
    </div>
  )
}
